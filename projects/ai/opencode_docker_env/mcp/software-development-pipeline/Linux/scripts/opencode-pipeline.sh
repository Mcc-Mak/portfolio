#!/usr/bin/env bash
# ================================================================
# CMMI Level 4 OpenCode DevSecOps Pipeline - Linux Final
# ALL SECURITY GATES IMPLEMENTED HERE
#
# Executable / dependency split (R14):
#   - GlobalDir  = global opencode config dir (~/.config/opencode)
#                   holding the pipeline executable, skills, tools and
#                   the toolchain (node_modules, .eslintrc.js, metrics
#                   scripts). Inferred from this script's location.
#   - ProjectDir = the project the pipeline operates on (defaults to
#                   the calling working directory). All Class 1/3/4/5
#                   resources (docs/00_Planning_Requirements/, src/, __tests__/,
#                   metrics/) are produced here and the project's own
#                   AGENTS.md is ingested by the child `opencode run`
#                   processes because they run in this directory.
# ================================================================

ProjectDir="$PWD"
SkipDocgen=false
SkipGates=false
GenSops=false

# First positional argument (optional) = ProjectDir
if [ $# -gt 0 ] && [[ "$1" != -* ]]; then
    ProjectDir="$1"
    shift
fi

while [ $# -gt 0 ]; do
    case "$1" in
        -ProjectDir) ProjectDir="$2"; shift 2 ;;
        -ProjectDir=*) ProjectDir="${1#*=}"; shift ;;
        --no-docgen) SkipDocgen=true; shift ;;
        --no-gates) SkipGates=true; shift ;;
        --sops) GenSops=true; shift ;;
        # Deprecated aliases (backward compat — print hint on stderr, still work)
        -SkipDocs) SkipDocgen=true; printf '[warn] -SkipDocs is deprecated, use --no-docgen\n' >&2; shift ;;
        -SkipSecurity) SkipGates=true; printf '[warn] -SkipSecurity is deprecated, use --no-gates\n' >&2; shift ;;
        -GenSOP) GenSops=true; printf '[warn] -GenSOP is deprecated, use --sops\n' >&2; shift ;;
        -h|--help|-?) cat <<'EOF'
CMMI Level 4 OpenCode DevSecOps Pipeline
Usage: bash scripts/opencode-pipeline.sh [options]

Options:
  <path>               Project directory to operate on (default: current dir)
  -ProjectDir <path>   Same as the positional <path> argument
  --no-docgen          Skip Phase 4 (documentation generation matrix)
  --no-gates           Skip Phase 3 (all 10 DevSecOps gates)
  --sops               Generate Standard Operating Procedures only
                       (docs/04_Operations_Maintenance/SOP/sop-*.md).
                       Skips all phases. Use via /pipeline sops.

  Deprecated aliases (still work, print a warning):
    -SkipDocs = --no-docgen | -SkipSecurity = --no-gates | -GenSOP = --sops

Phases:
  1. Requirement Commitment   -> docs/00_Planning_Requirements/ + docs/01_Design_Architecture/ (PRD, SRS, User-Stories, Technical-Design)
  2. AI Coding                -> src/, __tests__/ (OWASP-compliant + Jest tests)
  3. DevSecOps Verification   -> metrics/, logs/ (10 gates: R7-R9, R16-R19, C4-2/3/4)
  4. Documentation Generation -> docs/, README.md, root templates
  5. Requirements Traceability -> docs/00_Planning_Requirements/rtm.md (R20, always runs, R10 blocking)

Project Specification (SSOT):
  opencode.project.md  SINGLE SOURCE OF TRUTH for requirements. When present
                       in the project directory, its full content is injected
                       verbatim into Phases 1/2/4 so specs, code and docs match
                       it exactly. When absent, the pipeline runs generically.
                       When the SSOT is present, src/ is the ROOT DIRECTORY of
                       the codebase and its Repository Layout (SSOT §4) is
                       followed exactly. Create/update it interactively with
                       `/pipeline spec` (asks one question at a time; imports
                       SSOT.md if present).

Recommended workflow (LAMP prototype first):
  1. Build a web app prototype (LAMP) first; keep a Single Source of Truth as
     SSOT.md.
  2. Put SSOT.md inside the OpenCode-managed repository, then run `/pipeline
     spec` to rewrite opencode.project.md (SSOT.md is imported to pre-fill the
     interview answers).
  3. Run `/pipeline run` to create the project with documentation.

Diagrams:
  All generated markdown embeds Mermaid/PlantUML/Graphviz diagrams per the
  skill Diagram Policy. Mermaid syntax follows the CURRENT release used by
  https://mermaid.live (Mermaid v11.16.x). Both canonical and -beta keyword
  forms are accepted. All diagrams are validated by validate-mermaid.js (R10 gate).

Examples:
  bash scripts/opencode-pipeline.sh
  bash scripts/opencode-pipeline.sh -ProjectDir /path/to/project --no-docgen
EOF
            exit 0
            ;;
        *) shift ;;
    esac
done

set -u

# Executable location: <GlobalDir>/scripts/opencode-pipeline.sh
GlobalDir="$(cd "$(dirname "$(readlink -f "${BASH_SOURCE[0]}" 2>/dev/null || echo "${BASH_SOURCE[0]}")")/.." && pwd)"
ProjectDir="$(cd "$ProjectDir" 2>/dev/null && pwd || echo "$ProjectDir")"

# ANSI color codes
RED=$'\e[31m'
GREEN=$'\e[32m'
YELLOW=$'\e[33m'
CYAN=$'\e[36m'
GRAY=$'\e[90m'
RESET=$'\e[0m'

say() { printf '%s%s%s\n' "$1" "$2" "$RESET"; }
fail() { say "$RED" "[FAIL] $1"; }
ok()   { say "$GREEN" "[OK] $1"; }

# Operate on the project directory (ingest its AGENTS.md etc.)
cd "$ProjectDir" || { fail "Cannot enter project dir: $ProjectDir"; exit 1; }

# Adaptive project specification (opencode.project.md): if present, inject its
# content into Phases 1/2/4 so the pipeline matches the project's domain.
# When present, src/ is the ROOT DIRECTORY of the codebase it describes and its
# Repository Layout section is followed exactly by the coding phase.
# If absent, the pipeline runs generically (unchanged behavior).
projSpec=""
projSpecPath="$ProjectDir/opencode.project.md"
if [ -f "$projSpecPath" ]; then
    projSpec="$(cat "$projSpecPath")"
    printf '[spec] Project specification loaded: opencode.project.md\n'
fi

# Create project directories (Class 1/3/4/5 scaffolding)
for dir in specs src __tests__ docs metrics logs; do
    if [ ! -d "$dir" ]; then
        mkdir -p "$dir"
        say "$GRAY" "[dir] Created: $dir"
    fi
done

# R7 prerequisite: every project needs a .gitignore that excludes .env.
# Scaffold one if missing so the runtime-protection gate can pass.
if [ ! -f ".gitignore" ]; then
    cat > ".gitignore" <<'EOF'
# R7: Secrets must never be committed
.env
.env.*
*.pem
*.key

# Dependencies
node_modules/

# Class 4 build artifacts (regenerated each run)
metrics/*.db
logs/
coverage/

# OS / editor
.DS_Store
Thumbs.db
*.swp
EOF
    say "$GRAY" "[dir] Created: .gitignore (R7 scaffold)"
fi

# R11: Audit log helper (project logs/audit.log)
write_audit() {
    local entry
    entry="$(date +'%Y-%m-%d %H:%M:%S') | $1 | $2"
    echo "$entry" >> "logs/audit.log"
    printf '   [audit] %s\n' "$entry"
}

# R18: Notification helper (non-blocking). Token/Chat come from env only (R7).
send_notify() {
    if [ -z "${TELEGRAM_BOT_TOKEN:-}" ] || [ -z "${TELEGRAM_CHAT_ID:-}" ]; then
        say "$GRAY" "[notify] SKIP: TELEGRAM_BOT_TOKEN / TELEGRAM_CHAT_ID not set (R18)"
        return 0
    fi
    node "$GlobalDir/scripts/notify.js" --title "CMMI Pipeline: $1" --body "$2"$'\n'"$3"
    if [ $? -ne 0 ]; then
        say "$YELLOW" "[notify] WARN: notification failed (non-blocking)"
    else
        say "$GRAY" "[notify] Sent: $1"
    fi
}

echo ""
say "$CYAN" "================================================================"
say "$CYAN" "  CMMI LEVEL 4 OPENCODE DEVSECOPS PIPELINE"
say "$CYAN" "  Linux Final Edition - All Gates in Pipeline"
say "$CYAN" "================================================================"
say "$GRAY" "  Executable : $GlobalDir"
say "$GRAY" "  Project    : $ProjectDir"
say "$GRAY" "  Recommended workflow:"
say "$GRAY" "    1. Build a web app prototype (LAMP) first; keep the Single Source"
say "$GRAY" "       of Truth as SSOT.md in this repository."
say "$GRAY" "    2. Run '/pipeline spec' to rewrite opencode.project.md from SSOT.md."
say "$GRAY" "    3. Run '/pipeline run' to create the project with documentation."
echo ""

# ================================================================
# ON-DEMAND: SOP GENERATION (--sops)
# Generates Standard Operating Procedures into
# docs/04_Operations_Maintenance/SOP/sop-*.md and exits.
# Does NOT run Phases 1-5.
# ================================================================
if [ "$GenSops" = "true" ]; then
    say "$YELLOW" "[SOPS] Standard Operating Procedures -> docs/04_Operations_Maintenance/SOP/"
    say "$GRAY" "   Generating SOP documents on demand..."

    sop_dir="docs/04_Operations_Maintenance/SOP"
    mkdir -p "$sop_dir"

    sop_prompt="Use the doc-generation skill. Generate Standard Operating Procedures (SOPs) for this project as individual markdown files in docs/04_Operations_Maintenance/SOP/. Each file MUST be named sop-<topic>.md (e.g. sop-deployment.md, sop-backup-restore.md, sop-incident-response.md, sop-monitoring.md, sop-security-audit.md, sop-release.md, sop-config-change.md, sop-disaster-recovery.md)."
    if [ -n "$projSpec" ]; then
        sop_prompt="$sop_prompt

The project has a specification in opencode.project.md in this directory. Read it and tailor every SOP to the project's actual stack, architecture, deployment, and operations. In this specification src/ is the ROOT DIRECTORY of the codebase.

Project specification follows:
$projSpec"
    fi
    sop_prompt="$sop_prompt

For each SOP file, include: (1) Purpose, (2) Scope, (3) Prerequisites, (4) Step-by-step procedure with numbered steps, (5) Verification, (6) Rollback/contingency, (7) References to related docs. Embed Mermaid flowchart diagrams where a visual procedure aids understanding. Mermaid syntax MUST follow the CURRENT release used by https://mermaid.live (Mermaid v11.16.x). Both canonical and -beta keyword forms are accepted. All diagrams are validated by validate-mermaid.js (R10 gate).

Analyze the existing src/, specs/, docs/04_Operations_Maintenance/ (runbook.md, maint-guide.md, deployment-guide.md, backup-recovery.md, etc.) and generate SOPs that cover the real operational procedures this project needs. Do NOT duplicate content from existing docs — SOPs are focused, step-by-step procedural checklists that an on-call engineer can follow under pressure.

Also update docs/toctree.md to add an '### SOP (On-Demand)' subsection under '### 04 — Operations & Maintenance' listing every sop-*.md file generated as clickable markdown hyperlinks, and add the new SOP nodes to both Mermaid diagrams (Document Hierarchy as children of S04, Reading Sequence after the existing 04 docs) with a click nodeId href \"04_Operations_Maintenance/SOP/sop-<topic>.md\" line for each so every node stays clickable.

Do not print tool-call JSON and do not summarize - actually write the files."

    opencode run "$sop_prompt"
    rc=$?
    if [ $rc -ne 0 ]; then
        fail "SOPS FAILED"
        write_audit "SOPs" "FAILED"
        exit $rc
    fi

    sop_count=$(find "$sop_dir" -name 'sop-*.md' -type f 2>/dev/null | wc -l)
    if [ "$sop_count" -eq 0 ]; then
        fail "SOPS: no sop-*.md files generated - BLOCKED"
        write_audit "SOPs" "BLOCKED (no output)"
        exit 1
    fi

    write_audit "SOPs" "PASSED ($sop_count SOPs)"
    ok "SOPs completed ($sop_count SOP files in $sop_dir)"
    send_notify "SOPs SUCCESS" "SOP generation complete" "$sop_count SOP files generated in docs/04_Operations_Maintenance/SOP/"
    exit 0
fi

# ================================================================
# PHASE 1: REQUIREMENT COMMITMENT (R1, Class 1 Files)
# ================================================================
say "$YELLOW" "[PHASE 1] Requirement Commitment -> docs/00_Planning_Requirements/, docs/01_Design_Architecture/"
say "$GRAY" "   Producing Class 1 (Business/Requirements) files..."

if [ -n "$projSpec" ]; then
    phase1_prompt="$(cat <<EOP1
The project has a specification in opencode.project.md in this directory. Read it and build every Class 1 artifact to match it exactly (product, data sources, Primary/Other classification, framework, UI layout, forms). Remember: in this specification src/ is the ROOT DIRECTORY of the codebase (see its Repository Layout section) and all paths in the spec are relative to src/.

Project specification follows:
$projSpec

Now use the requirement-gathering skill. Create these four files NOW with the write tool: docs/00_Planning_Requirements/prd.md, docs/00_Planning_Requirements/srs.md, docs/00_Planning_Requirements/stories.md, docs/01_Design_Architecture/tech-design.md. Write the full content of each file to disk. Do not print tool-call JSON and do not summarize - actually create the files. Follow the skill's Diagram Policy: embed Mermaid diagrams (flowchart/sequence/ER/state) by default, and PlantUML or Graphviz where the diagram type requires it. Mermaid syntax MUST follow the CURRENT release used by https://mermaid.live (Mermaid v11.16.x). Both canonical and -beta keyword forms are accepted. All diagrams are validated by validate-mermaid.js (R10 gate). docs/01_Design_Architecture/tech-design.md MUST include a component diagram and a sequence diagram of the primary flow.
EOP1
)"
else
    phase1_prompt="Use the requirement-gathering skill. Create these four files NOW with the write tool: docs/00_Planning_Requirements/prd.md, docs/00_Planning_Requirements/srs.md, docs/00_Planning_Requirements/stories.md, docs/01_Design_Architecture/tech-design.md. Write the full content of each file to disk. Do not print tool-call JSON and do not summarize - actually create the files. Follow the skill's Diagram Policy: embed Mermaid diagrams (flowchart/sequence/ER/state) by default, and PlantUML or Graphviz where the diagram type requires it. Mermaid syntax MUST follow the CURRENT release used by https://mermaid.live (Mermaid v11.16.x). Both canonical and -beta keyword forms are accepted. All diagrams are validated by validate-mermaid.js (R10 gate). docs/01_Design_Architecture/tech-design.md MUST include a component diagram and a sequence diagram of the primary flow."
fi

opencode run "$phase1_prompt"
rc=$?
if [ $rc -ne 0 ]; then
    fail "PHASE 1 FAILED"
    write_audit "Phase 1 (Requirements)" "FAILED"
    exit $rc
fi

# R10: verify Class 1 deliverables actually exist
class1_count=$(find docs/00_Planning_Requirements -maxdepth 1 -name '*.md' -type f 2>/dev/null | wc -l)
class1_count=$((class1_count + $(find docs/01_Design_Architecture -maxdepth 1 -name 'tech-design.md' -type f 2>/dev/null | wc -l)))
if [ "$class1_count" -eq 0 ]; then
    fail "PHASE 1: no docs/00_Planning_Requirements/*.md or docs/01_Design_Architecture/tech-design.md produced - BLOCKED (R10)"
    write_audit "Phase 1 (Requirements)" "BLOCKED (R10)"
    exit 1
fi
write_audit "Phase 1 (Requirements)" "PASSED"
ok "Phase 1 completed ($class1_count requirements files)"
echo ""

# ================================================================
# PHASE 2: AI CODING (R2, R8, Class 3 Files)
# ================================================================
say "$YELLOW" "[PHASE 2] AI Coding -> src/, __tests__/"
say "$GRAY" "   Producing Class 3 (Source/Test) files..."

if [ -n "$projSpec" ]; then
    phase2_prompt="$(cat <<EOP2
The project has a specification in opencode.project.md in this directory. Read it and build the codebase to match it exactly (stack, data sources, Primary/Other classification, UI layout, forms).

CRITICAL: In this specification src/ is the ROOT DIRECTORY of the codebase. Follow the Repository Layout section of the specification exactly: create the source tree under src/ with that exact structure (e.g. src/server.js, src/database/, src/frontend/, src/data/), NOT a flat src/*.js dump. Any source paths in the spec are relative to src/ as the code root.

Project specification follows:
$projSpec

Now use the secure-coding skill. Create OWASP-compliant Node.js source files under src/ and their Jest unit tests under __tests__/ NOW with the write tool. If you introduce new dependencies, run \`npm install\` in this directory so the tests can resolve them. Do not print tool-call JSON and do not summarize - actually create the files on disk.
EOP2
)"
else
    phase2_prompt="Use the secure-coding skill. Create OWASP-compliant Node.js source files under src/ and their Jest unit tests under __tests__/ NOW with the write tool. Treat src/ as the ROOT DIRECTORY of the codebase (subdirectories are fine). Do not print tool-call JSON and do not summarize - actually create the files on disk."
fi

opencode run "$phase2_prompt"
rc=$?
if [ $rc -ne 0 ]; then
    fail "PHASE 2 FAILED"
    write_audit "Phase 2 (Coding)" "FAILED"
    exit $rc
fi

# R10: verify Class 3 deliverables actually exist
class3src=$(find src -name '*.js' -type f 2>/dev/null | wc -l)
class3test=$(find __tests__ -name '*.js' -type f 2>/dev/null | wc -l)
if [ "$class3src" -eq 0 ] || [ "$class3test" -eq 0 ]; then
    fail "PHASE 2: no src/*.js or __tests__/*.js produced - BLOCKED (R10)"
    write_audit "Phase 2 (Coding)" "BLOCKED (R10)"
    exit 1
fi
write_audit "Phase 2 (Coding)" "PASSED"
ok "Phase 2 completed ($class3src src files, $class3test test files)"
echo ""

# ================================================================
# PHASE 3: DEVSECOPS VERIFICATION (R8-R11, R16-R18, C4-2, C4-3, C4-4)
# Gates run against the PROJECT files using the GLOBAL toolchain
# (eslint/jest/npm resolved from GlobalDir; metrics scripts read the
# organizational metrics.db also under GlobalDir).
# ================================================================
if [ "$SkipGates" = "false" ]; then
    say "$YELLOW" "[PHASE 3] DevSecOps Verification -> metrics/, logs/"
    say "$GRAY" "   Running mandatory security and quality gates..."

    # R7: Runtime Protection - automated checks (project tree)
    say "$GRAY" "   [1/10] Runtime protection (R7)..."
    r7_fail=false
    if [ -f ".env" ]; then
        fail ".env found in working tree - secrets at risk"
        r7_fail=true
    fi
    if [ ! -f ".gitignore" ]; then
        fail ".gitignore missing - secrets could be committed"
        r7_fail=true
    elif ! grep -q '.env' .gitignore 2>/dev/null; then
        fail ".gitignore does not exclude .env"
        r7_fail=true
    fi
    secret_hits=$(grep -rEn --include='*.js' --include='*.sh' \
        '(api[_-]?key|password|passwd|secret|token)[[:space:]]*[=:][[:space:]]*"' \
        src scripts tools 2>/dev/null || true)
    if [ -n "$secret_hits" ]; then
        fail "Potential hardcoded secrets:"
        printf '%s\n' "$secret_hits" | head -n 10 | sed 's/^/   /'
        r7_fail=true
    fi
    if [ "$r7_fail" = "true" ]; then
        fail "Runtime protection FAILED - BLOCKED (R10)"
        write_audit "Phase 3 (Runtime Protection)" "BLOCKED (R10)"
        exit 1
    fi
    write_audit "Phase 3 (Runtime Protection)" "PASSED"

    # R9: SCA - npm audit of the GLOBAL toolchain dependencies
    say "$GRAY" "   [2/10] npm audit (SCA)..."
    mkdir -p "$GlobalDir/metrics"
    audit_result="$(cd "$GlobalDir" && npm audit --audit-level=high --json 2>/dev/null)"
    audit_exit=$?
    printf '%s\n' "$audit_result" > "$GlobalDir/metrics/security-scan.json"
    if [ "$audit_exit" -ne 0 ]; then
        fail "npm audit found vulnerabilities - BLOCKED (R10)"
        write_audit "Phase 3 (SCA)" "BLOCKED (R10)"
        exit 1
    fi
    write_audit "Phase 3 (SCA)" "PASSED"

    # R8: SAST - ESLint (global config + plugins, project files)
    # --no-eslintrc forces the GLOBAL config so a project-level .eslintrc.js
    # can never shadow it or fail plugin resolution from the project directory.
    say "$GRAY" "   [3/10] ESLint (SAST)..."
    (cd "$GlobalDir" && npx eslint --no-eslintrc --config .eslintrc.js "$ProjectDir" --ext .js --max-warnings 0)
    lint_exit=$?
    if [ "$lint_exit" -ne 0 ]; then
        fail "ESLint FAILED - BLOCKED (R10)"
        write_audit "Phase 3 (SAST)" "BLOCKED (R10)"
        exit 1
    fi
    write_audit "Phase 3 (SAST)" "PASSED"

    # R19: DAST - on-prem OWASP ZAP preferred; WARNS+BLOCKS if no free engine
    say "$GRAY" "   [4/10] DAST (R19)..."
    node "$GlobalDir/scripts/dast-scan.js" --project "$ProjectDir"
    dast_exit=$?
    if [ "$dast_exit" -ne 0 ]; then
        fail "DAST GATE FAILED - BLOCKED (R10/R19)"
        write_audit "Phase 3 (DAST)" "BLOCKED (R10/R19)"
        send_notify "BLOCKED (R19)" "Phase 3 - DAST gate" "DAST failed or no free on-prem engine found. See metrics/dast-report.md for engine recommendations (Burp Suite Enterprise / Invicti On-Premises)"
        exit $dast_exit
    fi
    write_audit "Phase 3 (DAST)" "PASSED"

    # Unit Tests (global jest binary, project root + coverage dir)
    say "$GRAY" "   [5/10] Jest tests..."
    (cd "$GlobalDir" && npx jest --coverage --rootDir "$ProjectDir")
    jest_exit=$?
    if [ "$jest_exit" -ne 0 ]; then
        fail "Tests FAILED - BLOCKED (R10)"
        write_audit "Phase 3 (Tests)" "BLOCKED (R10)"
        exit 1
    fi
    write_audit "Phase 3 (Tests)" "PASSED"

    # C4-2: Metrics Collection (git diff runs in the project)
    say "$GRAY" "   [6/10] Collect metrics (C4-2)..."
    node "$GlobalDir/scripts/collect-metrics.js"
    rc=$?
    if [ $rc -ne 0 ]; then
        fail "Metrics collection FAILED - BLOCKED (R10)"
        write_audit "Phase 3 (Metrics)" "BLOCKED (R10)"
        exit $rc
    fi
    write_audit "Phase 3 (Metrics)" "PASSED"

    # C4-3: SPC Control (reads organizational metrics.db)
    say "$GRAY" "   [7/10] SPC control (C4-3)..."
    node "$GlobalDir/scripts/spc-control.js"
    rc=$?
    if [ $rc -ne 0 ]; then
        fail "SPC FAILED - BLOCKED (R10)"
        write_audit "Phase 3 (SPC)" "BLOCKED (R10)"
        exit $rc
    fi
    write_audit "Phase 3 (SPC)" "PASSED"

    # C4-4: Readiness Prediction
    say "$GRAY" "   [8/10] Readiness prediction (C4-4)..."
    node "$GlobalDir/scripts/predict-readiness.js"
    rc=$?
    if [ $rc -ne 0 ]; then
        fail "Prediction FAILED - BLOCKED (R10)"
        write_audit "Phase 3 (Prediction)" "BLOCKED (R10)"
        exit $rc
    fi
    write_audit "Phase 3 (Prediction)" "PASSED"

    # R16: Compliance check (GDPR / HIPAA / PCI DSS / SOX evidence gates)
    say "$GRAY" "   [9/10] Compliance check (R16)..."
    node "$GlobalDir/scripts/compliance-check.js" --project "$ProjectDir"
    rc=$?
    if [ $rc -ne 0 ]; then
        fail "COMPLIANCE GATE FAILED - BLOCKED (R10/R16)"
        write_audit "Phase 3 (Compliance)" "BLOCKED (R10/R16)"
        send_notify "BLOCKED (R16)" "Phase 3 - Compliance gate" "Check metrics/compliance-report.md for framework gaps (GDPR/HIPAA/PCI DSS/SOX)"
        exit $rc
    fi
    write_audit "Phase 3 (Compliance)" "PASSED"

    # R17: Threat modeling (CVE/CVSS via npm audit + OSV.dev)
    say "$GRAY" "   [10/10] Threat model (R17)..."
    node "$GlobalDir/scripts/threat-model.js"
    rc=$?
    if [ $rc -ne 0 ]; then
        fail "THREAT MODEL GATE FAILED - BLOCKED (R10/R17)"
        write_audit "Phase 3 (Threat Model)" "BLOCKED (R10/R17)"
        send_notify "BLOCKED (R17)" "Phase 3 - Threat model gate" "High/critical vulnerabilities found. Check metrics/threat-model.md for CVE/CVSS details"
        exit $rc
    fi
    write_audit "Phase 3 (Threat Model)" "PASSED"

    send_notify "PASSED" "Phase 3 - DevSecOps gates" "All 10 gates passed: R7/R8/R9 runtime+SAST+SCA, R19 DAST, JEST, C4-2/3/4 metrics, R16 compliance, R17 threat model"

    ok "Phase 3 completed"
    echo ""
fi

# ================================================================
# PHASE 4: DOCUMENTATION GENERATION (R3, Class 2 + Class 5)
# Produces the full document matrix: 5 scripted root templates +
# 35 docs across 7 numbered subfolders + toctree.md, across 4 focused opencode passes.
# ================================================================
if [ "$SkipDocgen" = "false" ]; then
    say "$YELLOW" "[PHASE 4] Documentation Generation -> docs/, README.md, root templates"
    say "$GRAY" "   Producing Class 2 & Class 5 files..."

    # ---- 4.0: Scripted root templates (deterministic, create-if-missing) ----
    template_src="$GlobalDir/scripts/templates"
    templated=0
    if [ -d "$template_src" ]; then
        for tpl in LICENSE CONTRIBUTING.md CODE_OF_CONDUCT.md SECURITY.md CHANGELOG.md; do
            src_file="$template_src/$tpl"
            dst_file="$ProjectDir/$tpl"
            if [ -f "$src_file" ] && [ ! -f "$dst_file" ]; then
                cp -f "$src_file" "$dst_file"
                say "$GRAY" "   [tpl] Created: $tpl (template)"
                templated=$((templated + 1))
            fi
        done
        if [ "$templated" -gt 0 ]; then
            write_audit "Phase 4 (Templates)" "PASSED ($templated created)"
        else
            say "$GRAY" "   [tpl] All root templates already present (create-if-missing)"
        fi
    else
        say "$YELLOW" "   [tpl] WARN: template dir not found at $template_src"
    fi

    # Shared prompt builder for a doc pass (project-spec aware).
    # Root templates are scripted by the pipeline - the skill must not touch them.
    new_doc_prompt() {
        local files="$1"
        local toctree_hint=""
        if echo "$files" | grep -q 'toctree'; then
            toctree_hint=$'\n\nFor docs/toctree.md specifically: order all documents for good sequential reading — three top-level sections in order (Policy & Standards, Implementation Guides, Project Metadata), subfolders 00→07 in order, documents within each subfolder in natural reading order (foundational → reference → specialized). Include TWO Mermaid diagrams at the top (after the intro paragraph, before the first section): (1) a flowchart TD showing the parent-child hierarchy (root → section → subfolder → document leaf nodes), and (2) a flowchart LR showing the reading sequence as a linear --> chain with one subgraph per section, documents chained in reading order within each subgraph, and the last document of each section connecting to the first of the next. Every document must appear in both diagrams. EVERY document reference must be a clickable hyperlink that opens the file (never plain text or a bare path), with all paths relative to docs/toctree.md: use markdown link syntax [filename](relative/path) in the description tables, AND add a `click <nodeId> href "<relative-path>"` line for every document leaf node in both Mermaid diagrams (group them under a `%% Clickable hyperlinks` comment; omit non-file container nodes), e.g. `click PRD href "00_Planning_Requirements/prd.md"` and `click AGENTS href "../AGENTS.md"`.'
        fi
        if [ -n "$projSpec" ]; then
            cat <<EOPDOC
The project has a specification in opencode.project.md in this directory. Read it and match every document to it (product, data sources, Primary/Other classification, stack, UI layout, forms). In this specification src/ is the ROOT DIRECTORY of the codebase; document the code with src/ as the code root and the Repository Layout section as the structure reference.

Project specification follows:
$projSpec

Use the doc-generation skill. Create NOW with the write tool the files for THIS pass only: $files

Do not print tool-call JSON and do not summarize - actually write the files. Follow the skill's Diagram Policy: embed Mermaid diagrams (flowchart/sequence/ER/state) by default, and PlantUML or Graphviz where the diagram type requires it. Mermaid syntax MUST follow the CURRENT release used by https://mermaid.live (Mermaid v11.16.x). Both canonical and -beta keyword forms are accepted. All diagrams are validated by validate-mermaid.js (R10 gate). The core pass (architecture) MUST include a high-level flow diagram and a component diagram of the src/ layer. Do NOT create or overwrite LICENSE, CONTRIBUTING.md, CODE_OF_CONDUCT.md, SECURITY.md, or CHANGELOG.md - those are scripted by the pipeline.${toctree_hint}
EOPDOC
        else
            printf 'Use the doc-generation skill. Create NOW with the write tool the files for THIS pass only: %s\nDo not print tool-call JSON and do not summarize - actually write the files. Follow the skill'"'"'s Diagram Policy: embed Mermaid diagrams (flowchart/sequence/ER/state) by default, and PlantUML or Graphviz where the diagram type requires it. Mermaid syntax MUST follow the CURRENT release used by https://mermaid.live (Mermaid v11.16.x). Both canonical and -beta keyword forms are accepted. All diagrams are validated by validate-mermaid.js (R10 gate). The core pass (architecture) MUST include a high-level flow diagram and a component diagram of the src/ layer. Do NOT create or overwrite LICENSE, CONTRIBUTING.md, CODE_OF_CONDUCT.md, SECURITY.md, or CHANGELOG.md - those are scripted by the pipeline.%s\n' "$files" "$toctree_hint"
        fi
    }

    pass_index=0
    while IFS='|' read -r pass_name pass_files; do
        pass_index=$((pass_index + 1))
        say "$GRAY" "   [4.$pass_index] Docs pass: $pass_name"
        pass_prompt="$(new_doc_prompt "$pass_files")"
        opencode run "$pass_prompt"
        rc=$?
        if [ $rc -ne 0 ]; then
            fail "PHASE 4 FAILED ($pass_name)"
            write_audit "Phase 4 (Docs $pass_index)" "FAILED"
            exit $rc
        fi
    done <<'PASSES'
Core (architecture/API/database/setup/docker)|docs/01_Design_Architecture/arch.md, docs/01_Design_Architecture/api-ref.md, docs/01_Design_Architecture/database-schema.md, docs/02_Setup_Configuration/setup-guide.md, docs/02_Setup_Configuration/docker-image-guide.md
User + Admin + Security|docs/06_User_Reference/user-guide.md, docs/04_Operations_Maintenance/tshoot-guide.md, docs/06_User_Reference/faq.md, docs/06_User_Reference/glossary.md, docs/02_Setup_Configuration/admin-guide.md, docs/02_Setup_Configuration/config-guide.md, docs/05_Security_Compliance/sec-hardening.md, docs/05_Security_Compliance/compliance.md, docs/04_Operations_Maintenance/mon-alert-guide.md
Developer + Operator + Maintainer|docs/03_Development_Testing/dev-guide.md, docs/03_Development_Testing/test-guide.md, docs/03_Development_Testing/pipeline-guide.md, docs/03_Development_Testing/contributing.md, docs/03_Development_Testing/error-codes.md, docs/04_Operations_Maintenance/runbook.md, docs/04_Operations_Maintenance/maint-guide.md, docs/04_Operations_Maintenance/deployment-guide.md, docs/04_Operations_Maintenance/backup-recovery.md, docs/04_Operations_Maintenance/migration-guide.md, docs/04_Operations_Maintenance/incident-postmortem-template.md
Architect + Owner + Reference + Additional|docs/01_Design_Architecture/adr.md, docs/00_Planning_Requirements/roadmap.md, docs/06_User_Reference/changelog.md, docs/06_User_Reference/service-level-objectives.md, docs/06_User_Reference/onboarding-guide.md, docs/07_Additional_Resources/localization-guide.md, docs/toctree.md, and update README.md (documentation table listing every doc in docs/)
PASSES

    # R10: verify ALL Class 2/5 deliverables actually exist
    check_docs=(
        "docs/00_Planning_Requirements/prd.md"
        "docs/00_Planning_Requirements/srs.md"
        "docs/00_Planning_Requirements/stories.md"
        "docs/00_Planning_Requirements/roadmap.md"
        "docs/01_Design_Architecture/arch.md"
        "docs/01_Design_Architecture/tech-design.md"
        "docs/01_Design_Architecture/adr.md"
        "docs/01_Design_Architecture/api-ref.md"
        "docs/01_Design_Architecture/database-schema.md"
        "docs/02_Setup_Configuration/setup-guide.md"
        "docs/02_Setup_Configuration/config-guide.md"
        "docs/02_Setup_Configuration/admin-guide.md"
        "docs/02_Setup_Configuration/docker-image-guide.md"
        "docs/03_Development_Testing/dev-guide.md"
        "docs/03_Development_Testing/test-guide.md"
        "docs/03_Development_Testing/pipeline-guide.md"
        "docs/03_Development_Testing/contributing.md"
        "docs/03_Development_Testing/error-codes.md"
        "docs/04_Operations_Maintenance/runbook.md"
        "docs/04_Operations_Maintenance/maint-guide.md"
        "docs/04_Operations_Maintenance/mon-alert-guide.md"
        "docs/04_Operations_Maintenance/tshoot-guide.md"
        "docs/04_Operations_Maintenance/backup-recovery.md"
        "docs/04_Operations_Maintenance/deployment-guide.md"
        "docs/04_Operations_Maintenance/incident-postmortem-template.md"
        "docs/04_Operations_Maintenance/migration-guide.md"
        "docs/05_Security_Compliance/sec-hardening.md"
        "docs/05_Security_Compliance/compliance.md"
        "docs/06_User_Reference/user-guide.md"
        "docs/06_User_Reference/glossary.md"
        "docs/06_User_Reference/faq.md"
        "docs/06_User_Reference/changelog.md"
        "docs/06_User_Reference/service-level-objectives.md"
        "docs/06_User_Reference/onboarding-guide.md"
        "docs/07_Additional_Resources/localization-guide.md"
        "docs/toctree.md"
        "README.md"
        "LICENSE"
        "CONTRIBUTING.md"
        "CODE_OF_CONDUCT.md"
        "SECURITY.md"
        "CHANGELOG.md"
    )
    missing=()
    for doc in "${check_docs[@]}"; do
        if [ ! -f "$ProjectDir/$doc" ]; then
            missing+=("$doc")
        fi
    done
    if [ "${#missing[@]}" -gt 0 ]; then
        fail "PHASE 4: missing required docs - BLOCKED (R10)"
        for m in "${missing[@]}"; do
            fail "   MISSING: $m"
        done
        write_audit "Phase 4 (Docs)" "BLOCKED (R10)"
        exit 1
    fi
    # R10: validate all Mermaid diagrams render without error (mmdc gate)
    say "$CYAN" "[PHASE 4] Validating Mermaid diagrams (R10 gate)..."
    node "$GlobalDir/scripts/validate-mermaid.js" --quiet "$ProjectDir"
    rc=$?
    if [ $rc -ne 0 ]; then
        fail "MERMAID VALIDATION FAILED - BLOCKED (R10)"
        write_audit "Phase 4 (Mermaid)" "BLOCKED (R10)"
        exit $rc
    fi
    write_audit "Phase 4 (Mermaid)" "PASSED"
    ok "Mermaid validation passed"
    write_audit "Phase 4 (Docs)" "PASSED"
    ok "Phase 4 completed (${#check_docs[@]} docs files)"
    echo ""
fi

# ================================================================
# PHASE 5: REQUIREMENTS TRACEABILITY MATRIX (R20)
# Always runs - verifies all declared artifacts exist on disk and
# maps source R-IDs to audit.log gate results. Blocking (R10/R20)
# on broken artifact links. Skipped phases shown as SKIPPED.
# ================================================================
say "$YELLOW" "[PHASE 5] Requirements Traceability Matrix (R20) -> docs/00_Planning_Requirements/rtm.md"
say "$GRAY" "   Verifying traceability across all requirements..."

rtm_args=""
if [ "$SkipDocgen" = "true" ]; then
    rtm_args="$rtm_args --skip-docgen"
fi
if [ "$SkipGates" = "true" ]; then
    rtm_args="$rtm_args --skip-gates"
fi

node "$GlobalDir/scripts/generate-rtm.js" --project "$ProjectDir" $rtm_args
rc=$?
if [ $rc -ne 0 ]; then
    fail "RTM GATE FAILED - BLOCKED (R10/R20)"
    write_audit "Phase 5 (RTM)" "BLOCKED (R10/R20)"
    send_notify "BLOCKED (R20)" "Phase 5 - RTM gate" "Broken traceability links detected. Check docs/00_Planning_Requirements/rtm.md for details"
    exit $rc
fi
write_audit "Phase 5 (RTM)" "PASSED"
ok "Phase 5 completed (docs/00_Planning_Requirements/rtm.md generated)"
echo ""

# ================================================================
# PIPELINE SUCCESS
# ================================================================
write_audit "Pipeline" "SUCCESS"
say "$GREEN" "================================================================"
say "$GREEN" "[OK] PIPELINE SUCCESSFUL"
say "$GREEN" "   All R*, W*, and CMMI Level 4 requirements satisfied."
send_notify "SUCCESS" "Pipeline complete" "All phases (1-5) and all Phase-3 DevSecOps gates passed."
echo ""
say "$GREEN" "   Document Classification Summary:"
say "$GRAY" "   - Class 1 (Business/Requirements): docs/00_Planning_Requirements/ (rtm.md), specs/ (mirror)"
say "$GRAY" "   - Class 2 (Technical Design): docs/01_Design_Architecture/"
say "$GRAY" "   - Class 3 (Source/Test): src/, __tests__/"
say "$GRAY" "   - Class 4 (Security/Compliance): metrics/, logs/"
say "$GRAY" "   - Class 5 (Ops/User): docs/02-07_*/, README.md"
say "$GREEN" "================================================================"
#!/usr/bin/env bash
# ================================================================
# deploy-global.sh - R14 Global Deployment (Linux)
# Syncs project pipeline resources to ~/.config/opencode/ so that
# /pipeline, skills/**, scripts, tools and opencode.jsonc work from
# ANY directory with zero dependency on this project directory.
#
# Single source of truth: THIS project. The global config is GENERATED
# (never hand-edited) from project templates:
#   - opencode.global.jsonc        -> ~/.config/opencode/opencode.jsonc
#   - package.json (+ plugin dep)  -> ~/.config/opencode/package.json
#
# Copying is deterministic and scoped to the R14 resource list below;
# global package-lock.json / node_modules are NOT overwritten (npm
# reconciles them), and nothing outside the resource list is touched.
#
# Usage:
#   bash scripts/deploy-global.sh [--project-root <path>] [--skip-npm-install]
#   npm run deploy
# ================================================================

RED=$'\e[31m'
GREEN=$'\e[32m'
YELLOW=$'\e[33m'
GRAY=$'\e[90m'
CYAN=$'\e[36m'
RESET=$'\e[0m'

say() { printf '%s%s%s\n' "$1" "$2" "$RESET"; }

ProjectRoot=""
SkipNpmInstall=false

while [ $# -gt 0 ]; do
    case "$1" in
        --project-root) ProjectRoot="$2"; shift 2 ;;
        --project-root=*) ProjectRoot="${1#*=}"; shift ;;
        --skip-npm-install) SkipNpmInstall=true; shift ;;
        *) shift ;;
    esac
done

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"

# ---------------------------------------------------------------
# Resolve the project root (single source of truth)
# ---------------------------------------------------------------
resolve_project_root() {
    if [ -n "$ProjectRoot" ] && [ -f "$ProjectRoot/opencode.jsonc" ]; then
        (cd "$ProjectRoot" && pwd)
        return 0
    fi
    local candidate
    candidate="$(cd "$SCRIPT_DIR/.." && pwd)"
    if [ -f "$candidate/opencode.jsonc" ]; then
        echo "$candidate"
        return 0
    fi
    local known
    known="/workplace/mcp/software-development-pipeline/Linux"
    if [ -f "$known/opencode.jsonc" ]; then
        echo "$known"
        return 0
    fi
    echo "Could not resolve the project root. Pass --project-root <path>." >&2
    exit 1
}

projectRoot="$(resolve_project_root)"
globalDir="${HOME}/.config/opencode"
auditLog="$projectRoot/logs/audit.log"

echo ""
say "$CYAN" "================================================================"
say "$CYAN" "  R14 GLOBAL DEPLOYMENT SYNC"
say "$CYAN" "  Source : $projectRoot"
say "$CYAN" "  Target : $globalDir"
say "$CYAN" "================================================================"

# ---------------------------------------------------------------
# R16/R17/R18/R19/R20 gate: verify DevSecOps scripts + config exist in the
# source of truth before deploy (missing mirror = BLOCKING defect, R14).
# ---------------------------------------------------------------
required_scripts=(
    "scripts/compliance-check.js"
    "scripts/compliance.config.json"
    "scripts/threat-model.js"
    "scripts/dast-scan.js"
    "scripts/dast.config.json"
    "scripts/notify.js"
    "scripts/generate-rtm.js"
    "scripts/validate-mermaid.js"
    "tools/reqmind.js"
)
missing_resource=()
for rel in "${required_scripts[@]}"; do
    if [ ! -f "$projectRoot/$rel" ]; then
        missing_resource+=("$rel")
    fi
done
if [ "${#missing_resource[@]}" -gt 0 ]; then
    say "$RED" "   [FAIL] Missing required pipeline resources: ${missing_resource[*]}"
    say "$RED" "   R14 requires every resource mirrored. Refusing to deploy (R10 BLOCKING defect)."
    exit 1
fi
say "$GREEN" "   [gate] R16/R17/R18/R19/R20 scripts + config present (R14)"

# ---------------------------------------------------------------
# R14 resource sync map: project-relative source -> global-relative dest
# ---------------------------------------------------------------
sync_map=(
    "AGENTS.md=AGENTS.md"
    "opencode.project.md=opencode.project.md"
    ".eslintrc.js=.eslintrc.js"
    ".gitignore=.gitignore"
    ".opencode/commands/pipeline.md=commands/pipeline.md"
    ".opencode/rules/operational-hard-rules.md=rules/operational-hard-rules.md"
    ".opencode/skills=skills"
    "scripts=scripts"
    "tools=tools"
    "specs=specs"
    "src=src"
    "__tests__=__tests__"
    "docs=docs"
    "metrics=metrics"
)

# ---------------------------------------------------------------
# R10 gate: tools/*.js MUST be import-safe (C4-6).
# opencode auto-imports every .js in ~/.config/opencode/tools/ as a custom
# tool module IN-PROCESS. A plain CLI whose top-level code runs on import
# (usage print + process.exit) crashes opencode. The CLI entry must be
# guarded with `require.main === module` OR the file must export a tool()
# definition from @opencode-ai/plugin.
# ---------------------------------------------------------------
assert_tools_import_safe() {
    local tools_path="$1"
    local unsafe=()
    local file
    while IFS= read -r -d '' file; do
        if ! grep -q 'require\.main\s*===\+\s*module' "$file" \
            && ! grep -q '@opencode-ai/plugin' "$file"; then
            unsafe+=("$(basename "$file")")
        fi
    done < <(find "$tools_path" -maxdepth 1 -name '*.js' -type f -print0 2>/dev/null)
    if [ "${#unsafe[@]}" -gt 0 ]; then
        say "$RED" "   [FAIL] Unsafe tool(s) in $tools_path : ${unsafe[*]}"
        say "$RED" "   Every tools/*.js is auto-imported by opencode in-process. Guard the CLI"
        say "$RED" "   with \`if (require.main === module)\` or export a tool() definition from"
        say "$RED" "   @opencode-ai/plugin. Refusing to deploy (R10 BLOCKING defect)."
        exit 1
    fi
    echo "   [gate] tools/*.js import-safe (C4-6)"
}

synced=0
# copy_force: cp -f first, fall back to truncate-write (works for busy/bind-
# mounted global config files where unlink/rename would fail with EBUSY).
copy_force() {
    local src="$1" dst="$2"
    if ! cp -f "$src" "$dst" 2>/dev/null; then
        cat "$src" > "$dst" || { say "$RED" "   [FAIL] cannot write $dst"; exit 1; }
    fi
}
for item in "${sync_map[@]}"; do
    src_rel="${item%%=*}"
    dst_rel="${item#*=}"
    src_path="$projectRoot/$src_rel"
    dst_path="$globalDir/$dst_rel"
    if [ ! -e "$src_path" ]; then
        say "$YELLOW" "   [skip] source missing: $src_rel"
        continue
    fi
    if [ "$src_rel" = "tools" ] && [ -d "$src_path" ]; then
        assert_tools_import_safe "$src_path"
    fi
    mkdir -p "$(dirname "$dst_path")"

    # Idempotent copy: a directory source is synced by copying its CONTENTS
    # into the destination directory (never nested under dest/src).
    if [ -d "$src_path" ]; then
        mkdir -p "$dst_path"
        cp -rf "$src_path/." "$dst_path/"
        say "$GRAY" "   [sync] $src_rel/* -> $dst_rel/"
    else
        copy_force "$src_path" "$dst_path"
        say "$GRAY" "   [sync] $src_rel -> $dst_rel"
    fi
    synced=$((synced + 1))
done

# ---------------------------------------------------------------
# Global config: generate from opencode.global.jsonc (never project
# opencode.jsonc - its skills.paths/instructions are project-relative)
# ---------------------------------------------------------------
global_config_src="$projectRoot/opencode.global.jsonc"
global_config_dst="$globalDir/opencode.jsonc"
if [ -f "$global_config_src" ]; then
    copy_force "$global_config_src" "$global_config_dst"
    say "$GRAY" "   [sync] opencode.global.jsonc -> opencode.jsonc"
    synced=$((synced + 1))
else
    say "$RED" "   [FAIL] Missing global config template: opencode.global.jsonc"
    exit 1
fi

# ---------------------------------------------------------------
# Global package.json: project package.json + @opencode-ai/plugin dep
# (preserves any already-installed plugin version)
# ---------------------------------------------------------------
project_pkg_path="$projectRoot/package.json"
global_pkg_path="$globalDir/package.json"
if [ -f "$project_pkg_path" ]; then
    node - "$project_pkg_path" "$global_pkg_path" <<'NODE'
const fs = require('fs');
const [sp, gp] = process.argv.slice(2);
const pkg = JSON.parse(fs.readFileSync(sp, 'utf8'));
let pluginVersion = '1.18.15';
if (fs.existsSync(gp)) {
  const existing = JSON.parse(fs.readFileSync(gp, 'utf8'));
  if (existing.dependencies && existing.dependencies['@opencode-ai/plugin']) {
    pluginVersion = existing.dependencies['@opencode-ai/plugin'];
  }
}
pkg.dependencies = Object.assign({}, pkg.dependencies, { '@opencode-ai/plugin': pluginVersion });
pkg.description = 'CMMI Level 4 OpenCode DevSecOps Pipeline - Global Deployment (R14)';
fs.writeFileSync(gp, JSON.stringify(pkg, null, 2) + '\n', 'utf8');
console.log('   [gen]  package.json (+ @opencode-ai/plugin@' + pluginVersion + ')');
NODE
fi

# Ensure logs dir exists globally (audit log location for /pipeline runs)
mkdir -p "$globalDir/logs"

# ---------------------------------------------------------------
# R11: record the sync in the project audit log
# ---------------------------------------------------------------
entry="$(date +'%Y-%m-%d %H:%M:%S') | Deploy (Global) | SUCCESS ($synced resources -> $globalDir)"
if [ -d "$(dirname "$auditLog")" ]; then
    mkdir -p "$(dirname "$auditLog")"
    echo "$entry" >> "$auditLog"
fi
say "$GRAY" "   [audit] $entry"

# ---------------------------------------------------------------
# Install global dependencies (devDeps for gates + plugin)
# ---------------------------------------------------------------
if [ "$SkipNpmInstall" = "false" ]; then
    say "$YELLOW" "   [npm]  npm install in $globalDir ..."
    (cd "$globalDir" && npm install --no-fund --no-audit)
    rc=$?
    if [ $rc -ne 0 ]; then
        say "$RED" "   [FAIL] npm install failed (exit $rc)"
        exit $rc
    fi
fi

echo ""
say "$GREEN" "================================================================"
say "$GREEN" "[OK] R14 GLOBAL DEPLOYMENT SUCCESSFUL ($synced resources)"
say "$GREEN" "   Restart opencode to load the new global config."
say "$GREEN" "================================================================"
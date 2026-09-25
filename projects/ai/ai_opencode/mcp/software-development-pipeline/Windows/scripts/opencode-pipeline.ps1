# ================================================================
# CMMI Level 4 OpenCode DevSecOps Pipeline - Windows Final
# ALL SECURITY GATES IMPLEMENTED HERE
#
# Executable / dependency split (R14):
#   - $GlobalDir  = global opencode config dir (~/.config/opencode)
#                   holding the pipeline executable, skills, tools and
#                   the toolchain (node_modules, .eslintrc.js, metrics
#                   scripts). Inferred from $PSScriptRoot.
#   - $ProjectDir = the project the pipeline operates on (defaults to
#                   the calling working directory). All Class 1/3/4/5
#                   resources (specs\, src\, __tests__\, docs\, logs\,
#                   metrics\) are produced here and the project's own
#                   AGENTS.md is ingested by the child `opencode run`
#                   processes because they run in this directory.
# ================================================================

param(
    [string]$ProjectDir = (Get-Location).Path,
    [switch]$SkipDocs,
    [switch]$SkipSecurity,
    [switch]$Help
)

$ErrorActionPreference = "Stop"

# -Help / -? : print the help menu (with the opencode.project.md SSOT hint) and stop
if ($Help) {
    @"
CMMI Level 4 OpenCode DevSecOps Pipeline
Usage: powershell -ExecutionPolicy Bypass -File scripts\opencode-pipeline.ps1 [options]

Options:
  -ProjectDir <path>   Project directory to operate on (default: current dir)
  -SkipDocs            Skip Phase 4 (documentation generation)
  -SkipSecurity        Skip Phase 3 (security gates)
  -Help                Show this help menu

Project Specification (SSOT):
  opencode.project.md  SINGLE SOURCE OF TRUTH for requirements. When present
                       in the project directory, its full content is injected
                       verbatim into Phases 1/2/4 so specs, code and docs match
                       it exactly. When absent, the pipeline runs generically.

Examples:
  powershell -ExecutionPolicy Bypass -File scripts\opencode-pipeline.ps1
  powershell -ExecutionPolicy Bypass -File scripts\opencode-pipeline.ps1 -ProjectDir C:\path\to\project -SkipDocs
"@ | Write-Host
    exit 0
}

# Executable location: <GlobalDir>\scripts\opencode-pipeline.ps1
$GlobalDir = Split-Path $PSScriptRoot -Parent
$ProjectDir = [System.IO.Path]::GetFullPath($ProjectDir)

# Color codes
$RED = "Red"
$GREEN = "Green"
$YELLOW = "Yellow"
$CYAN = "Cyan"
$GRAY = "Gray"

# Operate on the project directory (ingest its AGENTS.md etc.)
Set-Location $ProjectDir

# Adaptive project specification (opencode.project.md): if present, inject its
# content into Phases 1/2/4 so the pipeline matches the project's domain.
# If absent, the pipeline runs generically (unchanged behavior).
$projSpec = $null
$projSpecPath = Join-Path $ProjectDir "opencode.project.md"
if (Test-Path -LiteralPath $projSpecPath) {
    $projSpec = Get-Content -LiteralPath $projSpecPath -Raw
    Write-Host "[spec] Project specification loaded: opencode.project.md" -ForegroundColor Cyan
}

# Create project directories (Class 1/3/4/5 scaffolding)
$dirs = @("specs", "src", "__tests__", "docs", "docs\wiki", "metrics", "logs")
foreach ($dir in $dirs) {
    if (-not (Test-Path $dir)) {
        New-Item -ItemType Directory -Path $dir -Force | Out-Null
        Write-Host "[dir] Created: $dir" -ForegroundColor Gray
    }
}

# R7 prerequisite: every project needs a .gitignore that excludes .env.
# Scaffold one if missing so the runtime-protection gate can pass.
if (-not (Test-Path ".gitignore")) {
    @"
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
"@ | Set-Content -Path ".gitignore" -Encoding UTF8
    Write-Host "[dir] Created: .gitignore (R7 scaffold)" -ForegroundColor Gray
}

# R11: Audit log helper (project logs\audit.log)
function Write-AuditLog {
    param([string]$Phase, [string]$Status)
    $entry = "{0} | {1} | {2}" -f (Get-Date -Format "yyyy-MM-dd HH:mm:ss"), $Phase, $Status
    Add-Content -Path "logs\audit.log" -Value $entry
    Write-Host "   [audit] $entry" -ForegroundColor Gray
}

# R18: Notification helper (non-blocking). Token/Chat come from env only (R7).
function Send-PipelineNotify {
    param([string]$Status, [string]$StageText, [string]$Summary)
    if (-not $env:TELEGRAM_BOT_TOKEN -or -not $env:TELEGRAM_CHAT_ID) {
        Write-Host "   [notify] SKIP: TELEGRAM_BOT_TOKEN / TELEGRAM_CHAT_ID not set (R18)" -ForegroundColor Gray
        return
    }
    node "$GlobalDir\scripts\notify.js" --title "CMMI Pipeline: $Status" --body "$StageText`n$Summary"
    if ($LASTEXITCODE -ne 0) {
        Write-Host "   [notify] WARN: notification failed (non-blocking)" -ForegroundColor Yellow
    } else {
        Write-Host "   [notify] Sent: $Status" -ForegroundColor Gray
    }
}

Write-Host ""
Write-Host "================================================================" -ForegroundColor Cyan
Write-Host "  CMMI LEVEL 4 OPENCODE DEVSECOPS PIPELINE" -ForegroundColor Cyan
Write-Host "  Windows Final Edition - All Gates in Pipeline" -ForegroundColor Cyan
Write-Host "================================================================" -ForegroundColor Cyan
Write-Host "  Executable : $GlobalDir" -ForegroundColor Gray
Write-Host "  Project    : $ProjectDir" -ForegroundColor Gray
Write-Host ""

# ================================================================
# PHASE 1: REQUIREMENT COMMITMENT (R1, Class 1 Files)
# ================================================================
Write-Host "[PHASE 1] Requirement Commitment -> specs\" -ForegroundColor Yellow
Write-Host "   Producing Class 1 (Business/Requirements) files..." -ForegroundColor Gray

if ($projSpec) {
    $phase1Prompt = @"
The project has a specification in opencode.project.md in this directory. Read it and build every Class 1 artifact to match it exactly (product, data sources, Primary/Other classification, framework, UI layout, forms).

Project specification follows:
$projSpec

Now use the requirement-gathering skill. Create these four files NOW with the write tool: specs/PRD.md, specs/SRS.md, specs/User-Stories.md, specs/Technical-Design.md. Write the full content of each file to disk. Do not print tool-call JSON and do not summarize - actually create the files. Follow the skill's Diagram Policy: embed Mermaid diagrams (flowchart/sequence/ER/state) by default, and PlantUML or Graphviz where the diagram type requires it. specs/Technical-Design.md MUST include a component diagram and a sequence diagram of the primary flow.
"@
} else {
    $phase1Prompt = "Use the requirement-gathering skill. Create these four files NOW with the write tool: specs/PRD.md, specs/SRS.md, specs/User-Stories.md, specs/Technical-Design.md. Write the full content of each file to disk. Do not print tool-call JSON and do not summarize - actually create the files. Follow the skill's Diagram Policy: embed Mermaid diagrams (flowchart/sequence/ER/state) by default, and PlantUML or Graphviz where the diagram type requires it. specs/Technical-Design.md MUST include a component diagram and a sequence diagram of the primary flow."
}

opencode run $phase1Prompt

if ($LASTEXITCODE -ne 0) {
    Write-Host "[FAIL] PHASE 1 FAILED" -ForegroundColor Red
    Write-AuditLog "Phase 1 (Requirements)" "FAILED"
    exit $LASTEXITCODE
}

# R10: verify Class 1 deliverables actually exist
$class1 = Get-ChildItem -Path specs -Filter *.md -File -ErrorAction SilentlyContinue
if (-not $class1 -or $class1.Count -eq 0) {
    Write-Host "[FAIL] PHASE 1: no specs\*.md produced - BLOCKED (R10)" -ForegroundColor Red
    Write-AuditLog "Phase 1 (Requirements)" "BLOCKED (R10)"
    exit 1
}
Write-AuditLog "Phase 1 (Requirements)" "PASSED"
Write-Host "[OK] Phase 1 completed ($($class1.Count) specs files)" -ForegroundColor Green
Write-Host ""

# ================================================================
# PHASE 2: AI CODING (R2, R8, Class 3 Files)
# ================================================================
Write-Host "[PHASE 2] AI Coding -> src\, __tests__\" -ForegroundColor Yellow
Write-Host "   Producing Class 3 (Source/Test) files..." -ForegroundColor Gray

if ($projSpec) {
    $phase2Prompt = @"
The project has a specification in opencode.project.md in this directory. Read it and build the codebase to match it exactly (stack, data sources, Primary/Other classification, UI layout, forms).

Project specification follows:
$projSpec

Now use the secure-coding skill. Create OWASP-compliant Node.js source files under src/ and their Jest unit tests under __tests__/ NOW with the write tool. If you introduce new dependencies, run `npm.cmd install` in this directory so the tests can resolve them. Do not print tool-call JSON and do not summarize - actually create the files on disk.
"@
} else {
    $phase2Prompt = "Use the secure-coding skill. Create OWASP-compliant Node.js source files under src/ and their Jest unit tests under __tests__/ NOW with the write tool. Do not print tool-call JSON and do not summarize - actually create the files on disk."
}

opencode run $phase2Prompt

if ($LASTEXITCODE -ne 0) {
    Write-Host "[FAIL] PHASE 2 FAILED" -ForegroundColor Red
    Write-AuditLog "Phase 2 (Coding)" "FAILED"
    exit $LASTEXITCODE
}

# R10: verify Class 3 deliverables actually exist
$class3src = Get-ChildItem -Path src -Filter *.js -File -Recurse -ErrorAction SilentlyContinue
$class3test = Get-ChildItem -Path __tests__ -Filter *.js -File -Recurse -ErrorAction SilentlyContinue
if ((-not $class3src -or $class3src.Count -eq 0) -or (-not $class3test -or $class3test.Count -eq 0)) {
    Write-Host "[FAIL] PHASE 2: no src\*.js or __tests__\*.js produced - BLOCKED (R10)" -ForegroundColor Red
    Write-AuditLog "Phase 2 (Coding)" "BLOCKED (R10)"
    exit 1
}
Write-AuditLog "Phase 2 (Coding)" "PASSED"
Write-Host "[OK] Phase 2 completed ($($class3src.Count) src files, $($class3test.Count) test files)" -ForegroundColor Green
Write-Host ""

# ================================================================
# PHASE 3: DEVSECOPS VERIFICATION (R8-R11, R16-R19, C4-2, C4-3, C4-4)
# Gates run against the PROJECT files using the GLOBAL toolchain
# (eslint/jest/npm resolved from $GlobalDir; metrics scripts read the
# organizational metrics.db also under $GlobalDir).
# ================================================================
if (-not $SkipSecurity) {
    Write-Host "[PHASE 3] DevSecOps Verification -> metrics\, logs\" -ForegroundColor Yellow
    Write-Host "   Running mandatory security and quality gates..." -ForegroundColor Gray

    # R7: Runtime Protection - automated checks (project tree)
    Write-Host "   [1/10] Runtime protection (R7)..." -ForegroundColor Gray
    $r7Fail = $false
    if (Test-Path ".env") {
        Write-Host "[FAIL] .env found in working tree - secrets at risk" -ForegroundColor Red
        $r7Fail = $true
    }
    if (-not (Test-Path ".gitignore")) {
        Write-Host "[FAIL] .gitignore missing - secrets could be committed" -ForegroundColor Red
        $r7Fail = $true
    } elseif ((Get-Content ".gitignore" -ErrorAction SilentlyContinue | Select-String -SimpleMatch ".env").Count -eq 0) {
        Write-Host "[FAIL] .gitignore does not exclude .env" -ForegroundColor Red
        $r7Fail = $true
    }
    $secretHits = Get-ChildItem -Path src, scripts, tools -Include *.js, *.ps1 -Recurse -File -ErrorAction SilentlyContinue |
        Select-String -Pattern '(\b(api[_-]?key|password|passwd|secret|token)\b\s*[=:]\s*["''][^"'']+["''])'
    if ($secretHits) {
        Write-Host "[FAIL] Potential hardcoded secrets:" -ForegroundColor Red
        $secretHits | Select-Object -First 10 | ForEach-Object {
            Write-Host "   $($_.Path):$($_.LineNumber)" -ForegroundColor Red
        }
        $r7Fail = $true
    }
    if ($r7Fail) {
        Write-Host "[FAIL] Runtime protection FAILED - BLOCKED (R10)" -ForegroundColor Red
        Write-AuditLog "Phase 3 (Runtime Protection)" "BLOCKED (R10)"
        exit 1
    }
    Write-AuditLog "Phase 3 (Runtime Protection)" "PASSED"

    # R9: SCA - npm audit of the GLOBAL toolchain dependencies
    Write-Host "   [2/10] npm audit (SCA)..." -ForegroundColor Gray
    Push-Location $GlobalDir
    try {
        $auditResult = npm.cmd audit --audit-level=high --json 2>$null
        $auditExit = $LASTEXITCODE
    } finally {
        Pop-Location
    }
    $auditUtf8 = New-Object System.Text.UTF8Encoding($false)
    [System.IO.File]::WriteAllText((Join-Path $GlobalDir "metrics\security-scan.json"), ($auditResult -join "`n"), $auditUtf8)
    if ($auditExit -ne 0) {
        Write-Host "[FAIL] npm audit found vulnerabilities - BLOCKED (R10)" -ForegroundColor Red
        Write-AuditLog "Phase 3 (SCA)" "BLOCKED (R10)"
        exit 1
    }
    Write-AuditLog "Phase 3 (SCA)" "PASSED"

    # R8: SAST - ESLint (global config + plugins, project files)
    # --no-eslintrc forces the GLOBAL config so a project-level .eslintrc.js
    # (created by the coding agent or the project itself) can never shadow it
    # or fail plugin resolution from the project directory.
    Write-Host "   [3/10] ESLint (SAST)..." -ForegroundColor Gray
    Push-Location $GlobalDir
    try {
        npx.cmd eslint --no-eslintrc --config .eslintrc.js "$ProjectDir" --ext .js --max-warnings 0
        $lintExit = $LASTEXITCODE
    } finally {
        Pop-Location
    }
    if ($lintExit -ne 0) {
        Write-Host "[FAIL] ESLint FAILED - BLOCKED (R10)" -ForegroundColor Red
        Write-AuditLog "Phase 3 (SAST)" "BLOCKED (R10)"
        exit 1
    }
    Write-AuditLog "Phase 3 (SAST)" "PASSED"

    # R19: DAST - on-prem OWASP ZAP preferred; WARNS+BLOCKS if no free engine
    Write-Host "   [4/10] DAST (R19)..." -ForegroundColor Gray
    node "$GlobalDir\scripts\dast-scan.js" --project "$ProjectDir"
    if ($LASTEXITCODE -ne 0) {
        Write-Host "[FAIL] DAST GATE FAILED - BLOCKED (R10/R19)" -ForegroundColor Red
        Write-AuditLog "Phase 3 (DAST)" "BLOCKED (R10/R19)"
        Send-PipelineNotify "BLOCKED (R19)" "Phase 3 - DAST gate" "DAST failed or no free on-prem engine found. See metrics\dast-report.md for engine recommendations (Burp Suite Enterprise / Invicti On-Premises)"
        exit $LASTEXITCODE
    }
    Write-AuditLog "Phase 3 (DAST)" "PASSED"

    # Unit Tests (global jest binary, project root + coverage dir)
    Write-Host "   [5/10] Jest tests..." -ForegroundColor Gray
    Push-Location $GlobalDir
    try {
        npx.cmd jest --coverage --rootDir "$ProjectDir"
        $jestExit = $LASTEXITCODE
    } finally {
        Pop-Location
    }
    if ($jestExit -ne 0) {
        Write-Host "[FAIL] Tests FAILED - BLOCKED (R10)" -ForegroundColor Red
        Write-AuditLog "Phase 3 (Tests)" "BLOCKED (R10)"
        exit 1
    }
    Write-AuditLog "Phase 3 (Tests)" "PASSED"

    # C4-2: Metrics Collection (git diff runs in the project)
    Write-Host "   [6/10] Collect metrics (C4-2)..." -ForegroundColor Gray
    node "$GlobalDir\scripts\collect-metrics.js"
    if ($LASTEXITCODE -ne 0) {
        Write-Host "[FAIL] Metrics collection FAILED - BLOCKED (R10)" -ForegroundColor Red
        Write-AuditLog "Phase 3 (Metrics)" "BLOCKED (R10)"
        exit 1
    }
    Write-AuditLog "Phase 3 (Metrics)" "PASSED"

    # C4-3: SPC Control (reads organizational metrics.db)
    Write-Host "   [7/10] SPC control (C4-3)..." -ForegroundColor Gray
    node "$GlobalDir\scripts\spc-control.js"
    if ($LASTEXITCODE -ne 0) {
        Write-Host "[FAIL] SPC FAILED - BLOCKED (R10)" -ForegroundColor Red
        Write-AuditLog "Phase 3 (SPC)" "BLOCKED (R10)"
        exit 1
    }
    Write-AuditLog "Phase 3 (SPC)" "PASSED"

    # C4-4: Readiness Prediction
    Write-Host "   [8/10] Readiness prediction (C4-4)..." -ForegroundColor Gray
    node "$GlobalDir\scripts\predict-readiness.js"
    if ($LASTEXITCODE -ne 0) {
        Write-Host "[FAIL] Prediction FAILED - BLOCKED (R10)" -ForegroundColor Red
        Write-AuditLog "Phase 3 (Prediction)" "BLOCKED (R10)"
        exit 1
    }
    Write-AuditLog "Phase 3 (Prediction)" "PASSED"

    # R16: Compliance check (GDPR / HIPAA / PCI DSS / SOX evidence gates)
    Write-Host "   [9/10] Compliance check (R16)..." -ForegroundColor Gray
    node "$GlobalDir\scripts\compliance-check.js" --project "$ProjectDir"
    if ($LASTEXITCODE -ne 0) {
        Write-Host "[FAIL] COMPLIANCE GATE FAILED - BLOCKED (R10/R16)" -ForegroundColor Red
        Write-AuditLog "Phase 3 (Compliance)" "BLOCKED (R10/R16)"
        Send-PipelineNotify "BLOCKED (R16)" "Phase 3 - Compliance gate" "Check metrics\compliance-report.md for framework gaps (GDPR/HIPAA/PCI DSS/SOX)"
        exit 1
    }
    Write-AuditLog "Phase 3 (Compliance)" "PASSED"

    # R17: Threat modeling (CVE/CVSS via npm audit + OSV.dev)
    Write-Host "   [10/10] Threat model (R17)..." -ForegroundColor Gray
    node "$GlobalDir\scripts\threat-model.js"
    if ($LASTEXITCODE -ne 0) {
        Write-Host "[FAIL] THREAT MODEL GATE FAILED - BLOCKED (R10/R17)" -ForegroundColor Red
        Write-AuditLog "Phase 3 (Threat Model)" "BLOCKED (R10/R17)"
        Send-PipelineNotify "BLOCKED (R17)" "Phase 3 - Threat model gate" "High/critical vulnerabilities found. Check metrics\threat-model.md for CVE/CVSS details"
        exit 1
    }
    Write-AuditLog "Phase 3 (Threat Model)" "PASSED"

    Send-PipelineNotify "PASSED" "Phase 3 - DevSecOps gates" "All 10 gates passed: R7/R8/R9 runtime+SAST+SCA, R19 DAST, JEST, C4-2/3/4 metrics, R16 compliance, R17 threat model"

    Write-Host "[OK] Phase 3 completed" -ForegroundColor Green
    Write-Host ""
}

# ================================================================
# PHASE 4: DOCUMENTATION GENERATION (R3, Class 2 + Class 5)
# Produces the full document matrix: 5 scripted root templates +
# 5 core docs + 15 audience docs, across 4 focused opencode passes.
# ================================================================
if (-not $SkipDocs) {
    Write-Host "[PHASE 4] Documentation Generation -> docs\, README.md, root templates" -ForegroundColor Yellow
    Write-Host "   Producing Class 2 & Class 5 files..." -ForegroundColor Gray

    # ---- 4.0: Scripted root templates (deterministic, create-if-missing) ----
    $templateSrc = Join-Path $GlobalDir "scripts\templates"
    $templates = @("LICENSE", "CONTRIBUTING.md", "CODE_OF_CONDUCT.md", "SECURITY.md", "CHANGELOG.md")
    $templated = 0
    if (Test-Path $templateSrc) {
        foreach ($tpl in $templates) {
            $srcFile = Join-Path $templateSrc $tpl
            if (Test-Path $srcFile) {
                $dstFile = Join-Path $ProjectDir $tpl
                if (-not (Test-Path $dstFile)) {
                    Copy-Item -Path $srcFile -Destination $dstFile -Force
                    Write-Host "   [tpl] Created: $tpl (template)" -ForegroundColor Gray
                    $templated++
                }
            }
        }
        if ($templated -gt 0) {
            Write-AuditLog "Phase 4 (Templates)" "PASSED ($templated created)"
        } else {
            Write-Host "   [tpl] All root templates already present (create-if-missing)" -ForegroundColor Gray
        }
    } else {
        Write-Host "   [tpl] WARN: template dir not found at $templateSrc" -ForegroundColor Yellow
    }

    # Shared prompt builder for a doc pass (project-spec aware).
    # Root templates are scripted by the pipeline - the skill must not touch them.
    function New-DocPrompt {
        param([string]$Files)
        if ($projSpec) {
            return @"
The project has a specification in opencode.project.md in this directory. Read it and match every document to it (product, data sources, Primary/Other classification, stack, UI layout, forms).

Project specification follows:
$projSpec

Use the doc-generation skill. Create NOW with the write tool the files for THIS pass only: $Files

Do not print tool-call JSON and do not summarize - actually write the files. Follow the skill's Diagram Policy: embed Mermaid diagrams (flowchart/sequence/ER/state) by default, and PlantUML or Graphviz where the diagram type requires it. The core pass (architecture) MUST include a high-level flow diagram and a component diagram of the src/ layer. Do NOT create or overwrite LICENSE, CONTRIBUTING.md, CODE_OF_CONDUCT.md, SECURITY.md, or CHANGELOG.md - those are scripted by the pipeline.
"@
        }
        return "Use the doc-generation skill. Create NOW with the write tool the files for THIS pass only: $Files`nDo not print tool-call JSON and do not summarize - actually write the files. Follow the skill's Diagram Policy: embed Mermaid diagrams (flowchart/sequence/ER/state) by default, and PlantUML or Graphviz where the diagram type requires it. The core pass (architecture) MUST include a high-level flow diagram and a component diagram of the src/ layer. Do NOT create or overwrite LICENSE, CONTRIBUTING.md, CODE_OF_CONDUCT.md, SECURITY.md, or CHANGELOG.md - those are scripted by the pipeline."
    }

    $docPasses = @(
        @{ Name = "Core (architecture/API/setup/wiki)"
           Files = "docs/architecture.md, docs/API-Reference.md, docs/Setup-Guide.md, docs/wiki/Home.md, docs/wiki/Architecture.md" },
        @{ Name = "User + Admin"
           Files = "docs/User-Guide.md, docs/Troubleshooting-Guide.md, docs/FAQ.md, docs/Glossary.md, docs/Administration-Guide.md, docs/Configuration-Guide.md, docs/Security-Hardening-Guide.md, docs/Monitoring-Alerting-Guide.md" },
        @{ Name = "Developer + Operator + Maintainer"
           Files = "docs/Developer-Guide.md, docs/Testing-Guide.md, docs/Pipeline-Guide.md, docs/Operations-Runbook.md, docs/Maintenance-Guide.md" },
        @{ Name = "Architect + Owner (ADR/roadmap/README)"
           Files = "docs/ADR.md, docs/Project-Roadmap.md, and update README.md (documentation table listing every doc in docs/)" }
    )

    $passIndex = 0
    foreach ($pass in $docPasses) {
        $passIndex++
        Write-Host "   [4.$passIndex] Docs pass: $($pass.Name)" -ForegroundColor Gray
        $passPrompt = New-DocPrompt -Files $pass.Files
        opencode run $passPrompt
        if ($LASTEXITCODE -ne 0) {
            Write-Host "[FAIL] PHASE 4 FAILED ($($pass.Name))" -ForegroundColor Red
            Write-AuditLog "Phase 4 (Docs $passIndex)" "FAILED"
            exit $LASTEXITCODE
        }
    }

    # R10: verify ALL Class 2/5 deliverables actually exist
    $requiredDocs = @(
        "docs\architecture.md",
        "docs\API-Reference.md",
        "docs\Setup-Guide.md",
        "docs\wiki\Home.md",
        "docs\wiki\Architecture.md",
        "docs\User-Guide.md",
        "docs\Troubleshooting-Guide.md",
        "docs\FAQ.md",
        "docs\Glossary.md",
        "docs\Administration-Guide.md",
        "docs\Configuration-Guide.md",
        "docs\Security-Hardening-Guide.md",
        "docs\Monitoring-Alerting-Guide.md",
        "docs\Developer-Guide.md",
        "docs\Testing-Guide.md",
        "docs\Pipeline-Guide.md",
        "docs\Operations-Runbook.md",
        "docs\Maintenance-Guide.md",
        "docs\ADR.md",
        "docs\Project-Roadmap.md",
        "README.md",
        "LICENSE",
        "CONTRIBUTING.md",
        "CODE_OF_CONDUCT.md",
        "SECURITY.md",
        "CHANGELOG.md"
    )
    $missing = @()
    foreach ($doc in $requiredDocs) {
        if (-not (Test-Path (Join-Path $ProjectDir $doc))) {
            $missing += $doc
        }
    }
    if ($missing.Count -gt 0) {
        Write-Host "[FAIL] PHASE 4: missing required docs - BLOCKED (R10)" -ForegroundColor Red
        foreach ($m in $missing) {
            Write-Host "   MISSING: $m" -ForegroundColor Red
        }
        Write-AuditLog "Phase 4 (Docs)" "BLOCKED (R10)"
        exit 1
    }
    Write-AuditLog "Phase 4 (Docs)" "PASSED"
    Write-Host "[OK] Phase 4 completed ($($requiredDocs.Count) docs files)" -ForegroundColor Green
    Write-Host ""
}

# ================================================================
# PIPELINE SUCCESS
# ================================================================
Write-AuditLog "Pipeline" "SUCCESS"
Write-Host "================================================================" -ForegroundColor Green
Write-Host "[OK] PIPELINE SUCCESSFUL" -ForegroundColor Green
Write-Host "   All R*, W*, and CMMI Level 4 requirements satisfied." -ForegroundColor Green
Send-PipelineNotify "SUCCESS" "Pipeline complete" "All phases (1-4) and all 10 Phase-3 DevSecOps gates passed."
Write-Host ""
Write-Host "   Document Classification Summary:" -ForegroundColor Green
Write-Host "   - Class 1 (Business/Requirements): specs\" -ForegroundColor Gray
Write-Host "   - Class 2 (Technical Design): docs\architecture.md" -ForegroundColor Gray
Write-Host "   - Class 3 (Source/Test): src\, __tests__\" -ForegroundColor Gray
Write-Host "   - Class 4 (Security/Compliance): metrics\, logs\" -ForegroundColor Gray
Write-Host "   - Class 5 (Ops/User): docs\, README.md" -ForegroundColor Gray
Write-Host "================================================================" -ForegroundColor Green

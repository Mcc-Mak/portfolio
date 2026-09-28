# ================================================================
# deploy-global.ps1 - R14 Global Deployment (Windows)
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
#   powershell -ExecutionPolicy Bypass -File scripts\deploy-global.ps1 [-SkipNpmInstall]
#   npm run deploy
# ================================================================

param(
    [string]$ProjectRoot = "",
    [switch]$SkipNpmInstall
)

$ErrorActionPreference = "Stop"

$RED   = "Red"
$GREEN = "Green"
$YELLOW = "Yellow"
$GRAY  = "Gray"
$CYAN  = "Cyan"

# ---------------------------------------------------------------
# Resolve the project root (single source of truth)
# ---------------------------------------------------------------
function Resolve-ProjectRoot {
    param([string]$Hint)
    if ($Hint -and (Test-Path (Join-Path $Hint "opencode.jsonc"))) {
        return (Resolve-Path $Hint).Path
    }
    $candidate = Join-Path $PSScriptRoot ".."
    if (Test-Path (Join-Path $candidate "opencode.jsonc")) {
        return (Resolve-Path $candidate).Path
    }
    $known = "C:\OpenCode\software-development-pipeline\Windows"
    if (Test-Path (Join-Path $known "opencode.jsonc")) {
        return $known
    }
    throw "Could not resolve the project root. Pass -ProjectRoot <path>."
}

$projectRoot = Resolve-ProjectRoot -Hint $ProjectRoot
$globalDir   = Join-Path $env:USERPROFILE ".config\opencode"
$auditLog    = Join-Path $projectRoot "logs\audit.log"

Write-Host ""
Write-Host "================================================================" -ForegroundColor $CYAN
Write-Host "  R14 GLOBAL DEPLOYMENT SYNC" -ForegroundColor $CYAN
Write-Host "  Source : $projectRoot" -ForegroundColor $CYAN
Write-Host "  Target : $globalDir" -ForegroundColor $CYAN
Write-Host "================================================================" -ForegroundColor $CYAN

# ---------------------------------------------------------------
# R16/R17/R18/R19 gate: verify DevSecOps scripts + config exist in the
# source of truth before deploy (missing mirror = BLOCKING defect, R14).
# ---------------------------------------------------------------
$requiredScripts = @(
    "scripts\compliance-check.js",
    "scripts\compliance.config.json",
    "scripts\threat-model.js",
    "scripts\dast-scan.js",
    "scripts\dast.config.json",
    "scripts\notify.js",
    "tools\reqmind.js"
)
$missingResource = @()
foreach ($rel in $requiredScripts) {
    if (-not (Test-Path (Join-Path $projectRoot $rel))) {
        $missingResource += $rel
    }
}
if ($missingResource.Count -gt 0) {
    Write-Host "   [FAIL] Missing required pipeline resources: $($missingResource -join ', ')" -ForegroundColor $RED
    Write-Host "   R14 requires every resource mirrored. Refusing to deploy (R10 BLOCKING defect)." -ForegroundColor $RED
    exit 1
}
Write-Host "   [gate] R16/R17/R18/R19 scripts + config present (R14)" -ForegroundColor $GREEN

# ---------------------------------------------------------------
# R14 resource sync map: project-relative source -> global-relative dest
# ---------------------------------------------------------------
$syncMap = @(
    @{ Src = "AGENTS.md";                                     Dst = "AGENTS.md" }
    @{ Src = ".eslintrc.js";                                  Dst = ".eslintrc.js" }
    @{ Src = ".gitignore";                                    Dst = ".gitignore" }
    @{ Src = ".opencode\commands\pipeline.md";                Dst = "commands\pipeline.md" }
    @{ Src = ".opencode\rules\operational-hard-rules.md";     Dst = "rules\operational-hard-rules.md" }
    @{ Src = ".opencode\skills";                              Dst = "skills" }
    @{ Src = "scripts";                                       Dst = "scripts" }
    @{ Src = "tools";                                         Dst = "tools" }
    @{ Src = "specs";                                         Dst = "specs" }
    @{ Src = "src";                                           Dst = "src" }
    @{ Src = "__tests__";                                     Dst = "__tests__" }
    @{ Src = "docs";                                          Dst = "docs" }
    @{ Src = "metrics";                                       Dst = "metrics" }
)

# ---------------------------------------------------------------
# R10 gate: tools/*.js MUST be import-safe (C4-6).
# opencode auto-imports every .js in ~/.config/opencode/tools/ as a custom
# tool module IN-PROCESS. A plain CLI whose top-level code runs on import
# (usage print + process.exit) crashes opencode. The CLI entry must be
# guarded with `require.main === module` OR the file must export a tool()
# definition from @opencode-ai/plugin.
# ---------------------------------------------------------------
function Assert-ToolsImportSafe {
    param([string]$ToolsPath)
    $unsafe = @()
    foreach ($file in Get-ChildItem -Path $ToolsPath -Filter *.js -File) {
        $content = Get-Content -Path $file.FullName -Raw
        $guarded = $content -match 'require\.main\s*===+\s*module'
        $toolExport = $content -match '@opencode-ai/plugin'
        if (-not ($guarded -or $toolExport)) {
            $unsafe += $file.Name
        }
    }
    if ($unsafe.Count -gt 0) {
        Write-Host "   [FAIL] Unsafe tool(s) in $ToolsPath : $($unsafe -join ', ')" -ForegroundColor $RED
        Write-Host "   Every tools/*.js is auto-imported by opencode in-process. Guard the CLI" -ForegroundColor $RED
        Write-Host "   with `if (require.main === module)` or export a tool() definition from" -ForegroundColor $RED
        Write-Host "   @opencode-ai/plugin. Refusing to deploy (R10 BLOCKING defect)." -ForegroundColor $RED
        exit 1
    }
    return $true
}

$synced = 0
$created = @()
foreach ($item in $syncMap) {
    $srcPath = Join-Path $projectRoot $item.Src
    $dstPath = Join-Path $globalDir $item.Dst
    if (-not (Test-Path $srcPath)) {
        Write-Host "   [skip] source missing: $($item.Src)" -ForegroundColor $YELLOW
        continue
    }
    if ($item.Src -eq "tools" -and (Get-Item $srcPath).PSIsContainer) {
        Assert-ToolsImportSafe -ToolsPath $srcPath | Out-Null
        Write-Host "   [gate] tools/*.js import-safe (C4-6)" -ForegroundColor $GREEN
    }
    $dstParent = Split-Path $dstPath -Parent
    if (-not (Test-Path $dstParent)) {
        New-Item -ItemType Directory -Path $dstParent -Force | Out-Null
        $created += $dstParent
    }

    # Idempotent copy: a directory source is synced by copying its CONTENTS
    # into the destination directory (never nested under dest\src).
    if ((Get-Item $srcPath).PSIsContainer) {
        if (-not (Test-Path $dstPath)) {
            New-Item -ItemType Directory -Path $dstPath -Force | Out-Null
            $created += $dstPath
        }
        Get-ChildItem -Path $srcPath -Force | Copy-Item -Destination $dstPath -Recurse -Force
        Write-Host "   [sync] $($item.Src)\* -> $($item.Dst)\" -ForegroundColor $GRAY
    } else {
        Copy-Item -Path $srcPath -Destination $dstPath -Force
        Write-Host "   [sync] $($item.Src) -> $($item.Dst)" -ForegroundColor $GRAY
    }
    $synced++
}

# ---------------------------------------------------------------
# Global config: generate from opencode.global.jsonc (never project
# opencode.jsonc - its skills.paths/instructions are project-relative)
# ---------------------------------------------------------------
$globalConfigSrc = Join-Path $projectRoot "opencode.global.jsonc"
$globalConfigDst = Join-Path $globalDir "opencode.jsonc"
if (Test-Path $globalConfigSrc) {
    Copy-Item -Path $globalConfigSrc -Destination $globalConfigDst -Force
    Write-Host "   [sync] opencode.global.jsonc -> opencode.jsonc" -ForegroundColor $GRAY
    $synced++
} else {
    throw "Missing global config template: opencode.global.jsonc"
}

# ---------------------------------------------------------------
# Global package.json: project package.json + @opencode-ai/plugin dep
# (preserves any already-installed plugin version)
# ---------------------------------------------------------------
$projectPkgPath = Join-Path $projectRoot "package.json"
$globalPkgPath  = Join-Path $globalDir "package.json"
if (Test-Path $projectPkgPath) {
    $pkg = Get-Content $projectPkgPath -Raw | ConvertFrom-Json

    $pluginVersion = "1.18.15"
    if (Test-Path $globalPkgPath) {
        $existing = Get-Content $globalPkgPath -Raw | ConvertFrom-Json
        if ($existing.dependencies."@opencode-ai/plugin") {
            $pluginVersion = $existing.dependencies."@opencode-ai/plugin"
        }
    }

    $pkg | Add-Member -NotePropertyName "dependencies" -NotePropertyValue (
        @{ "@opencode-ai/plugin" = $pluginVersion }
    ) -Force
    $pkg.description = "CMMI Level 4 OpenCode DevSecOps Pipeline - Global Deployment (R14)"

    $json = $pkg | ConvertTo-Json -Depth 10
    # PS 5.1 ConvertTo-Json escapes >, <, & and ' - restore for clean package.json
    $json = $json.Replace('\u003e', '>').Replace('\u003c', '<').Replace('\u0026', '&').Replace('\u0027', "'")
    $utf8NoBom = New-Object System.Text.UTF8Encoding($false)
    [System.IO.File]::WriteAllText($globalPkgPath, $json, $utf8NoBom)
    Write-Host "   [gen]  package.json (+ @opencode-ai/plugin@$pluginVersion)" -ForegroundColor $GRAY
}

# Ensure logs dir exists globally (audit log location for /pipeline runs)
$globalLogs = Join-Path $globalDir "logs"
if (-not (Test-Path $globalLogs)) {
    New-Item -ItemType Directory -Path $globalLogs -Force | Out-Null
}

# ---------------------------------------------------------------
# R11: record the sync in the project audit log
# ---------------------------------------------------------------
$entry = "{0} | {1} | {2}" -f (Get-Date -Format "yyyy-MM-dd HH:mm:ss"), "Deploy (Global)", "SUCCESS ($synced resources -> $globalDir)"
if (Test-Path (Split-Path $auditLog)) {
    Add-Content -Path $auditLog -Value $entry
}
Write-Host "   [audit] $entry" -ForegroundColor $GRAY

# ---------------------------------------------------------------
# Install global dependencies (devDeps for gates + plugin)
# ---------------------------------------------------------------
if (-not $SkipNpmInstall) {
    Write-Host "   [npm]  npm install in $globalDir ..." -ForegroundColor $YELLOW
    Push-Location $globalDir
    try {
        & npm.cmd install --no-fund --no-audit
        if ($LASTEXITCODE -ne 0) { throw "npm install failed (exit $LASTEXITCODE)" }
    } finally {
        Pop-Location
    }
}

Write-Host ""
Write-Host "================================================================" -ForegroundColor $GREEN
Write-Host "[OK] R14 GLOBAL DEPLOYMENT SUCCESSFUL ($synced resources)" -ForegroundColor $GREEN
Write-Host "   Restart opencode to load the new global config." -ForegroundColor $GREEN
Write-Host "================================================================" -ForegroundColor $GREEN

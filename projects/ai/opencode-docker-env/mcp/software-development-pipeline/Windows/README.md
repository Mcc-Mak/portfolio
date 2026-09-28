# CMMI Level 4 OpenCode DevSecOps Pipeline

## Overview

This project implements a **CMMI Maturity Level 4 (Quantitatively Managed)** software development pipeline using **OpenCode** as the single entry point, with **DevSecOps** security gates and **quantitative process control**.

## Requirements Satisfied (20 items)

| Category | Count | Description |
| :--- | :--- | :--- |
| R1-R14 | 14 | Core workflow, toolchain, security, knowledge management, global deployment |
| W1 | 1 | Strict sequential order |
| C4-1 to C4-5 | 5 | CMMI Level 4 quantitative management |

## Quick Start

### 1. Install Dependencies

```powershell
# Install OpenCode globally
npm install -g opencode-ai

# Install project dependencies (project dir)
npm install

# Install global pipeline dependencies (mirrored global config)
npm install --prefix $env:USERPROFILE\.config\opencode
```

### 2. Configure OpenCode

OpenCode auto-loads the project config (`opencode.jsonc`) and the skills under `.opencode/skills/`. For a global install, deploy every resource to `%USERPROFILE%\.config\opencode\` (R14):

```powershell
# Deterministic, non-destructive global deployment (scripted, not copy/paste)
npm run deploy
```

The deploy script syncs `AGENTS.md`, `skills/`, `commands/pipeline.md`,
`rules/`, `scripts/`, `tools/`, `.eslintrc.js`, `.gitignore`, the canonical
artifacts, and generates `opencode.jsonc` + `package.json` for the global
directory. It never overwrites `node_modules` / `package-lock.json` (npm
reconciles them) and records the sync in `logs/audit.log`.

**Restart opencode after any deploy** so the new global config/skills/commands
are loaded (config loads at startup).

### 3. Run Pipeline

```powershell
# Full pipeline (from project dir)
npm run pipeline

# Skip documentation
npm run pipeline:skipdocs

# Skip security (for testing)
npm run pipeline:skipsecurity
```

### 4. Run Pipeline from Anywhere (`/pipeline`)

R14 syncs every resource to `~/.config/opencode/` via `npm run deploy`. From
ANY directory use the OpenCode command:

```
/pipeline                 # equivalent to npm run pipeline
/pipeline skipdocs        # equivalent to npm run pipeline:skipdocs
/pipeline skipsecurity    # equivalent to npm run pipeline:skipsecurity
```

The command (`~/.config/opencode/commands/pipeline.md`) runs the matching npm
script in the global config directory with zero dependency on this project
directory.

## Pipeline I/O Reference

Entry point: `scripts/opencode-pipeline.ps1`
Full command: `powershell -ExecutionPolicy Bypass -File scripts\opencode-pipeline.ps1`

Workflow order (W1): **Requirements -> Coding -> DevSecOps -> Documentation**.
A phase or gate that fails exits non-zero and is blocked (R10).

### Invocation Variants

| Command | Behavior |
| :--- | :--- |
| `npm run pipeline` | Phases 1-4, all gates |
| `npm run pipeline:skipdocs` | Phases 1-3 only (`-SkipDocs`) |
| `npm run pipeline:skipsecurity` | Phases 1, 2, 4 only (`-SkipSecurity`) |

### Inputs -> Outputs by Phase

#### Phase 1 — Requirements (R1) -> `specs/`
| Input | Output |
| :--- | :--- |
| `.opencode/skills/requirement-gathering/SKILL.md` | `specs/PRD.md` |
| `AGENTS.md` (charter) | `specs/SRS.md` |
| Existing `specs/` (regenerated) | `specs/User-Stories.md` |
| | `specs/Technical-Design.md` |

Gate: fails (R10) if no `specs/*.md` exists after the phase.

#### Phase 2 — AI Coding (R2) -> `src/`, `__tests__/`
| Input | Output |
| :--- | :--- |
| `.opencode/skills/secure-coding/SKILL.md` | `src/**/*.js` |
| `specs/Technical-Design.md`, `specs/tasks.md` | `__tests__/**/*.spec.js` |

Gate: fails (R10) if no `src/*.js` or no `__tests__/*.js` exists after the phase.

#### Phase 3 — DevSecOps Verification (R7-R11, C4-2..4) -> `metrics/`, `logs/`
| # | Step | Input | Output |
| :--- | :--- | :--- | :--- |
| 1 | R7 Runtime protection | `.env`, `.gitignore`, secret scan of `src/`, `scripts/`, `tools/` | none (fail/block on violation) |
| 2 | R9 SCA `npm audit --audit-level=high` | `package.json`, `package-lock.json` | `metrics/security-scan.json` |
| 3 | R8 SAST `npx eslint . --ext .js --max-warnings 0` | all `.js` sources | none (fail/block on warnings/errors) |
| 4 | Unit tests `npx jest --coverage` | `src/`, `__tests__/` | `coverage/` (lcov/html) |
| 5 | C4-2 Metrics `collect-metrics.js` | `metrics/security-scan.json`, git diff (LOC) | `metrics/metrics.db` (SQLite `builds` row) |
| 6 | C4-3 SPC `spc-control.js` | `metrics/metrics.db` | `metrics/spc-report.md` (control chart, UCL/LCL) |
| 7 | C4-4 Prediction `predict-readiness.js` | `metrics/metrics.db` | `metrics/readiness-prediction.md` (+ auto-remediation via `opencode run` if over goal) |

#### Phase 4 — Documentation (R3) -> `docs/`, `README.md`, root templates
| Input | Output |
| :--- | :--- |
| `.opencode/skills/doc-generation/SKILL.md` | `docs/architecture.md` |
| `src/`, `specs/`, existing `docs/` | `docs/API-Reference.md` |
| `$GlobalDir\scripts\templates\` (scripted, create-if-missing) | `docs/Setup-Guide.md`, `docs/wiki/*` |
| | 15 audience docs: `docs/User-Guide.md`, `Troubleshooting-Guide.md`, `FAQ.md`, `Glossary.md`, `Administration-Guide.md`, `Configuration-Guide.md`, `Security-Hardening-Guide.md`, `Monitoring-Alerting-Guide.md`, `Developer-Guide.md`, `Testing-Guide.md`, `Pipeline-Guide.md`, `Operations-Runbook.md`, `Maintenance-Guide.md`, `ADR.md`, `Project-Roadmap.md` |
| | Root templates: `LICENSE`, `CONTRIBUTING.md`, `CODE_OF_CONDUCT.md`, `SECURITY.md`, `CHANGELOG.md` |
| | `README.md` |

Gate: fails (R10) if any of the required docs (20 docs + README + 5 templates) is missing after the phase.

### Cross-Cutting Outputs

| Artifact | Purpose |
| :--- | :--- |
| `logs/audit.log` | R11 timestamped audit trail (one line per phase/gate) |
| `metrics/metrics.db` | SQLite build history for SPC + prediction |
| `coverage/` | Jest coverage report (gitignored) |

### Complete I/O Checklist — ALL Inputs

#### Config / Skills (used by all phases)
- [ ] `opencode.jsonc` — model + provider config
- [ ] `AGENTS.md` — project charter (R12, instructions)
- [ ] `.opencode/skills/requirement-gathering/SKILL.md` (R1)
- [ ] `.opencode/skills/secure-coding/SKILL.md` (R2)
- [ ] `.opencode/skills/doc-generation/SKILL.md` (R3)

#### Phase 1 Inputs
- [ ] Existing `specs/*.md` (regenerated)
- [ ] `tools/reqmind.js` (requirements CLI)

#### Phase 2 Inputs
- [ ] `specs/Technical-Design.md`
- [ ] `specs/tasks.md`
- [ ] `src/` (existing, regenerated)
- [ ] `__tests__/` (existing, regenerated)

#### Phase 3 Inputs
- [ ] Working tree files `.env` (checked, must be absent), `.gitignore` (checked for `.env`)
- [ ] `src/`, `scripts/`, `tools/` (R7 hardcoded-secret scan)
- [ ] `package.json` + `package-lock.json` (R9 SCA)
- [ ] All `.js` sources (R8 SAST)
- [ ] `src/`, `__tests__/` (jest)
- [ ] `metrics/security-scan.json` (C4-2)
- [ ] git diff vs HEAD for LOC (C4-2)
- [ ] `metrics/metrics.db` (C4-3, C4-4)

#### Phase 4 Inputs
- [ ] `src/`, `specs/`, existing `docs/`, `README.md`
- [ ] `.opencode/skills/doc-generation/SKILL.md`

### Complete I/O Checklist — ALL Outputs

#### Phase 1 Outputs -> `specs/`
- [ ] `specs/PRD.md`
- [ ] `specs/SRS.md`
- [ ] `specs/User-Stories.md`
- [ ] `specs/Technical-Design.md`

#### Phase 2 Outputs -> `src/`, `__tests__/`
- [ ] `src/**/*.js`
- [ ] `__tests__/**/*.spec.js`

#### Phase 3 Outputs -> `metrics/`, `coverage/`
- [ ] `metrics/security-scan.json` (R9)
- [ ] `coverage/` — lcov/html jest report (R8/tests)
- [ ] `metrics/metrics.db` — SQLite `builds` table (C4-2)
- [ ] `metrics/spc-report.md` — control chart, mean/UCL/LCL (C4-3)
- [ ] `metrics/readiness-prediction.md` — regression report (C4-4)
- [ ] auto-triggered remediation via `opencode run` when prediction over goal (C4-5)

#### Phase 4 Outputs -> `docs/`, root
- [ ] `docs/architecture.md`
- [ ] `docs/API-Reference.md`
- [ ] `docs/Setup-Guide.md`
- [ ] `docs/wiki/Home.md`
- [ ] `docs/wiki/Architecture.md`
- [ ] `docs/User-Guide.md`, `docs/Troubleshooting-Guide.md`, `docs/FAQ.md`, `docs/Glossary.md`
- [ ] `docs/Administration-Guide.md`, `docs/Configuration-Guide.md`, `docs/Security-Hardening-Guide.md`, `docs/Monitoring-Alerting-Guide.md`
- [ ] `docs/Developer-Guide.md`, `docs/Testing-Guide.md`, `docs/Pipeline-Guide.md`, `docs/Operations-Runbook.md`, `docs/Maintenance-Guide.md`
- [ ] `docs/ADR.md`, `docs/Project-Roadmap.md`
- [ ] `LICENSE`, `CONTRIBUTING.md`, `CODE_OF_CONDUCT.md`, `SECURITY.md`, `CHANGELOG.md` (scripted, create-if-missing)
- [ ] `README.md` (updated)

#### Cross-Cutting Outputs
- [ ] `logs/audit.log` — R11 audit trail (appended per phase/gate)
- [ ] Console output — phase/gate status lines, `[OK] PIPELINE SUCCESSFUL` on exit 0

### Notes

- All AI generation phases run `opencode run` with the model configured in
  `opencode.jsonc` (default `opencode/deepseek-v4-flash-free`).
- `metrics/*.db`, `logs/`, and `coverage/` are gitignored; everything else is a
  tracked deliverable.
- Phase 3 is skipped with `-SkipSecurity`; Phase 4 with `-SkipDocs`.

## Documentation

Phase 4 generates the full document matrix: 5 scripted root templates, 5 core
docs, and 15 persona/audience docs. See [`docs/wiki/Home.md`](docs/wiki/Home.md)
for the wiki index.

| Document | Path | Audience |
| :--- | :--- | :--- |
| API Reference | [`docs/API-Reference.md`](docs/API-Reference.md) | Developer |
| Setup Guide | [`docs/Setup-Guide.md`](docs/Setup-Guide.md) | User/Admin |
| Architecture (Mermaid) | [`docs/architecture.md`](docs/architecture.md) | Architect |
| Wiki Home | [`docs/wiki/Home.md`](docs/wiki/Home.md) | All |
| Wiki Architecture | [`docs/wiki/Architecture.md`](docs/wiki/Architecture.md) | Architect |
| User Guide | [`docs/User-Guide.md`](docs/User-Guide.md) | End user |
| Troubleshooting Guide | [`docs/Troubleshooting-Guide.md`](docs/Troubleshooting-Guide.md) | User/Admin |
| FAQ | [`docs/FAQ.md`](docs/FAQ.md) | All |
| Glossary | [`docs/Glossary.md`](docs/Glossary.md) | All |
| Administration Guide | [`docs/Administration-Guide.md`](docs/Administration-Guide.md) | Administrator |
| Configuration Guide | [`docs/Configuration-Guide.md`](docs/Configuration-Guide.md) | Administrator |
| Security Hardening Guide | [`docs/Security-Hardening-Guide.md`](docs/Security-Hardening-Guide.md) | Admin/Security |
| Monitoring & Alerting Guide | [`docs/Monitoring-Alerting-Guide.md`](docs/Monitoring-Alerting-Guide.md) | Admin/Operator |
| Developer Guide | [`docs/Developer-Guide.md`](docs/Developer-Guide.md) | Developer |
| Testing Guide | [`docs/Testing-Guide.md`](docs/Testing-Guide.md) | Developer |
| Pipeline Guide | [`docs/Pipeline-Guide.md`](docs/Pipeline-Guide.md) | Dev/Operator |
| Operations Runbook | [`docs/Operations-Runbook.md`](docs/Operations-Runbook.md) | Operator |
| Maintenance Guide | [`docs/Maintenance-Guide.md`](docs/Maintenance-Guide.md) | Maintainer |
| ADR Log | [`docs/ADR.md`](docs/ADR.md) | Architect |
| Project Roadmap | [`docs/Project-Roadmap.md`](docs/Project-Roadmap.md) | Owner/Architect |
| License | [`LICENSE`](LICENSE) | All |
| Contributing | [`CONTRIBUTING.md`](CONTRIBUTING.md) | Developer |
| Code of Conduct | [`CODE_OF_CONDUCT.md`](CODE_OF_CONDUCT.md) | All |
| Security Policy | [`SECURITY.md`](SECURITY.md) | Admin/Security |
| Changelog | [`CHANGELOG.md`](CHANGELOG.md) | All |
| Technical Design | [`specs/Technical-Design.md`](specs/Technical-Design.md) | Architect |
| Product Requirements | [`specs/PRD.md`](specs/PRD.md) | Owner |
| Software Requirements | [`specs/SRS.md`](specs/SRS.md) | Owner |

## Secure Primitives (`src/`)

Phase 2 (secure-coding skill) produces OWASP-aligned helpers in `src/`,
covered by Jest tests in `__tests__/`:

| Module | Highlights |
| :--- | :--- |
| `src/auth.js` | PBKDF2 (210k iterations) hashing + constant-time verify |
| `src/secrets.js` | Secret scanning and redaction |
| `src/validate.js` | Input sanitization, email, safe-path checks |
| `src/http.js` | Security headers, safe JSON parsing |
| `src/audit.js` | Audit log line formatting (R11) |
| `src/metrics.js` | Defect density computation (C4-1) |
| `src/spc.js` | Mean, stdev, UCL/LCL control limits (C4-3) |

See [`docs/API-Reference.md`](docs/API-Reference.md) section 3 for signatures.

## Document Classification

| Class | Directory | Purpose |
| :--- | :--- | :--- |
| Class 1 | `specs/` | Business/Requirements |
| Class 2 | `specs/`, `docs/` | Technical Design |
| Class 3 | `src/`, `__tests__/` | Source/Test |
| Class 4 | `metrics/`, `logs/` | Security/Compliance |
| Class 5 | `docs/`, Root | Operations/User |

## R14 Global Deployment (HARD RULE)

Every pipeline resource is synced to `~/.config/opencode/` (single source of
truth) so `npm run pipeline`, `/pipeline`, and the skills work from any
directory. Deployment is scripted and non-destructive via
`scripts/deploy-global.ps1` (`npm run deploy`).

| Resource | Global Location |
| :--- | :--- |
| opencode.jsonc (generated from `opencode.global.jsonc`) | `~/.config/opencode/opencode.jsonc` |
| package.json (generated, incl. `@opencode-ai/plugin`) | `~/.config/opencode/package.json` |
| AGENTS.md | `~/.config/opencode/AGENTS.md` |
| Skills (requirement-gathering, secure-coding, doc-generation, cmmi-analytics) | `~/.config/opencode/skills/*/SKILL.md` |
| Hard rules | `~/.config/opencode/rules/operational-hard-rules.md` |
| Pipeline scripts (opencode-pipeline.ps1, collect-metrics.js, spc-control.js, predict-readiness.js, deploy-global.ps1) | `~/.config/opencode/scripts/` |
| Root doc templates (LICENSE, CONTRIBUTING.md, CODE_OF_CONDUCT.md, SECURITY.md, CHANGELOG.md) | `~/.config/opencode/scripts/templates/` |
| Tools (reqmind.js) | `~/.config/opencode/tools/` |
| ESLint config | `~/.config/opencode/.eslintrc.js` |
| .gitignore | `~/.config/opencode/.gitignore` |
| Canonical artifacts (specs/, src/, __tests__/, docs/, metrics/) | `~/.config/opencode/` |
| Command `/pipeline` | `~/.config/opencode/commands/pipeline.md` |
| Global dependencies | `~/.config/opencode/node_modules/` |

**Enforcement:**
1. NEVER modify a global resource directly - edit the project source and
   re-run `npm run deploy`. A hand-edited global resource is a BLOCKING defect.
2. NEVER run the pipeline against a stale global copy - deploy the latest
   scripts/skills/specs first (R5/R11: audit log must record the sync).
3. `npm run pipeline` MUST be executable from `~/.config/opencode/` with zero
   dependency on the project directory.
4. Any new resource (skill, script, tool, doc, artifact, config key) MUST be
   deployed globally within the same change - a missing mirror is a BLOCKING
   defect.
5. **`tools/*.js` MUST be import-safe (C4-6).** opencode auto-imports every
   `.js` in `~/.config/opencode/tools/` as a custom tool module, in-process,
   at startup. A plain CLI that runs on import (prints usage, calls
   `process.exit`) crashes opencode. Guard the CLI entry with
   `if (require.main === module) { ... }` or export a `tool()` definition
   from `@opencode-ai/plugin`. `npm run deploy` refuses unsafe tools.

## CMMI Level 4 Quantitative Goals

| Metric | Target |
| :--- | :--- |
| Defect Density (Critical+High/KLOC) | ≤ 0.5 |
| Build Stability (rolling 10 builds) | ≥ 98% |
| Cycle Time Stability | < 2 min std dev |

## Gates

| Gate | Tool | Purpose |
| :--- | :--- | :--- |
| SAST | ESLint | Static code analysis |
| SCA | npm audit | Dependency vulnerability scan |
| SPC | spc-control.js | UCL/LCL 3-sigma control |
| Prediction | predict-readiness.js | Regression forecasting |

## Project Structure

```
Windows\
├── .opencode\
│   ├── skills\
│   │   ├── requirement-gathering\SKILL.md
│   │   ├── secure-coding\SKILL.md
│   │   ├── doc-generation\SKILL.md
│   │   └── cmmi-analytics\SKILL.md
│   ├── commands\
│   │   └── pipeline.md        # /pipeline (synced globally)
│   └── rules\
│       └── operational-hard-rules.md  # R14/R15 HARD RULES (synced globally)
├── scripts\
│   ├── opencode-pipeline.ps1
│   ├── deploy-global.ps1      # R14 global deployment (npm run deploy)
│   ├── collect-metrics.js
│   ├── spc-control.js
│   ├── predict-readiness.js
│   └── templates\             # Phase 4 scripted root templates (R14)
│       ├── LICENSE
│       ├── CONTRIBUTING.md
│       ├── CODE_OF_CONDUCT.md
│       ├── SECURITY.md
│       └── CHANGELOG.md
├── tools\
│   └── reqmind.js           # requirements CLI (global bin, import-safe C4-6)
├── specs\              # Class 1
├── src\                # Class 3
├── __tests__\          # Class 3
├── docs\               # Class 2 & 5
├── metrics\            # Class 4
├── logs\               # Class 4
├── AGENTS.md
├── opencode.jsonc
├── opencode.global.jsonc   # global config template (R14)
├── package.json
└── README.md
```

Global deployment (R14): run `npm run deploy` to sync this structure to
`~/.config/opencode/` so the pipeline and skills run from anywhere.

## Troubleshooting

### PowerShell Execution Policy

```powershell
Set-ExecutionPolicy -ExecutionPolicy RemoteSigned -Scope CurrentUser
```

### Check OpenCode Installation

```powershell
opencode --version
```

### View Metrics Database

```powershell
sqlite3 metrics\metrics.db "SELECT * FROM builds ORDER BY id DESC LIMIT 10;"
```

## License

MIT

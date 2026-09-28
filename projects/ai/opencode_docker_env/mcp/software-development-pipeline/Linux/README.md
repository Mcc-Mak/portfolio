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

```bash
# Install OpenCode globally
npm install -g opencode-ai

# Install project dependencies (project dir)
npm install

# Install global pipeline dependencies (mirrored global config)
npm install --prefix "$HOME/.config/opencode"
```

### 2. Configure OpenCode

OpenCode auto-loads the project config (`opencode.jsonc`) and the skills under `.opencode/skills/`. For a global install, deploy every resource to `~/.config/opencode/` (R14):

```bash
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

```bash
# Full pipeline (from project dir)
npm run pipeline

# Skip documentation generation
npm run pipeline:no-docgen

# Skip security gates (for local testing — never for merge)
npm run pipeline:no-gates
```

### 4. Run Pipeline from Anywhere (`/pipeline`)

R14 syncs every resource to `~/.config/opencode/` via `npm run deploy`. From
ANY directory use the OpenCode command:

```
/pipeline                 # guided mode — asks what to do, one question at a time
/pipeline run             # FULL pipeline: Phases 1-5, all gates (≡ npm run pipeline)
/pipeline run no-docgen   # skip Phase 4 documentation (Phases 1-3 + 5)
/pipeline run no-gates    # skip Phase 3 security gates (Phases 1, 2, 4, 5)
/pipeline spec            # create/update opencode.project.md (SSOT) via TUI interview
/pipeline sops            # generate SOPs (docs/04_Operations_Maintenance/SOP/sop-*.md)
```

> **Note:** bare `/pipeline` (no argument) launches **guided mode** — it asks
> you what to do, then asks whether to include documentation and whether to
> include security gates, one question at a time, then executes. You never
> need to memorize subcommands. The shortcuts above (`run`, `spec`, `sops`)
> are for power users who want to skip the interview.

### `/pipeline run` workflow

`/pipeline run` is the canonical **full production run**. It executes all
five phases in strict W1 order with every gate mandatory (R10 blocks on
failure):

| Phase | Stage | Produces | Gate |
| :---- | :---- | :------- | :--- |
| 1 | Requirements (R1) | `docs/00_Planning_Requirements/{prd,srs,stories}.md`, `docs/01_Design_Architecture/tech-design.md` | fail if no requirements/design docs |
| 2 | AI Coding (R2) | `src/**/*.js`, `__tests__/**/*.spec.js` | fail if no src/tests |
| 3 | DevSecOps (R7-R11, C4-2..4) | `metrics/`, `logs/` | 10 gates: R7 runtime, R8 SAST, R9 SCA, R19 DAST, Jest, C4-2 metrics, C4-3 SPC, C4-4 prediction, R16 compliance, R17 threat model |
| 4 | Documentation (R3) | 35 docs + toctree + README + 5 root templates | fail if any required doc missing |
| 5 | Traceability (R20) | `docs/00_Planning_Requirements/rtm.md` (canonical) + `specs/rtm.md` (mirror) | fail on broken artifact links |

If `opencode.project.md` (SSOT) is present, its content is injected verbatim
into Phases 1/2/4 and `src/` is treated as the ROOT DIRECTORY of the codebase
following the SSOT Repository Layout (§4) exactly. If absent, the pipeline
runs generically.

Use `run` when you want the complete, merge-ready deliverable set. For
iterating on code+gates without regenerating the 35-doc matrix, use
`/pipeline run no-docgen`; for local experimentation without gates, use
`/pipeline run no-gates` (never for merge).

The command (`~/.config/opencode/commands/pipeline.md`) runs the matching npm
script in the global config directory with zero dependency on this project
directory. `/pipeline spec` does not run the pipeline — it asks for the project
information ONE question at a time and writes `opencode.project.md`, the SINGLE
SOURCE OF TRUTH that Phases 1/2/4 inject verbatim (when present, `src/` is the
ROOT DIRECTORY of the codebase and its Repository Layout is followed exactly).

## Pipeline I/O Reference

Entry point: `scripts/opencode-pipeline.sh`
Full command: `bash scripts/opencode-pipeline.sh`

Workflow order (W1): **Requirements -> Coding -> DevSecOps -> Documentation**.
A phase or gate that fails exits non-zero and is blocked (R10).

### Invocation Variants

| Command | Behavior |
| :--- | :--- |
| `npm run pipeline` | Phases 1-5, all gates (full run) |
| `/pipeline run` | Same as `npm run pipeline` (TUI full run) |
| `/pipeline` | Guided mode — TUI asks what to do, one question at a time |
| `npm run pipeline:no-docgen` | Phases 1-3 + 5 (`--no-docgen`) |
| `npm run pipeline:no-gates` | Phases 1, 2, 4, 5 (`--no-gates`) |
| `npm run pipeline:sops` | Generate SOPs only (`--sops`), no pipeline phases |
| `/pipeline sops` (TUI) | Same as `npm run pipeline:sops` |
| `/pipeline spec` (TUI) | Write/update `opencode.project.md` (SSOT); no pipeline run |

### Inputs -> Outputs by Phase

#### Phase 1 — Requirements (R1) -> `docs/00_Planning_Requirements/`, `docs/01_Design_Architecture/`
| Input | Output |
| :--- | :--- |
| `.opencode/skills/requirement-gathering/SKILL.md` | `docs/00_Planning_Requirements/prd.md` |
| `AGENTS.md` (charter) | `docs/00_Planning_Requirements/srs.md` |
| Existing docs (regenerated) | `docs/00_Planning_Requirements/stories.md` |
| | `docs/01_Design_Architecture/tech-design.md` |

Gate: fails (R10) if no `docs/00_Planning_Requirements/*.md` or `docs/01_Design_Architecture/tech-design.md` exists after the phase.

#### Phase 2 — AI Coding (R2) -> `src/`, `__tests__/`
| Input | Output |
| :--- | :--- |
| `.opencode/skills/secure-coding/SKILL.md` | `src/**/*.js` |
| `docs/01_Design_Architecture/tech-design.md` | `__tests__/**/*.spec.js` |

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
| `.opencode/skills/doc-generation/SKILL.md` | `docs/01_Design_Architecture/arch.md`, `api-ref.md`, `database-schema.md` |
| `src/`, `docs/00_Planning_Requirements/`, existing `docs/` | `docs/02_Setup_Configuration/setup-guide.md`, `docker-image-guide.md`, `admin-guide.md`, `config-guide.md` |
| `$GlobalDir/scripts/templates/` (scripted, create-if-missing) | `docs/03_Development_Testing/dev-guide.md`, `test-guide.md`, `pipeline-guide.md`, `contributing.md`, `error-codes.md` |
| | `docs/04_Operations_Maintenance/runbook.md`, `maint-guide.md`, `mon-alert-guide.md`, `tshoot-guide.md`, `backup-recovery.md`, `deployment-guide.md`, `incident-postmortem-template.md`, `migration-guide.md` |
| | `docs/05_Security_Compliance/sec-hardening.md`, `compliance.md` |
| | `docs/06_User_Reference/user-guide.md`, `faq.md`, `glossary.md`, `changelog.md`, `service-level-objectives.md`, `onboarding-guide.md` |
| | `docs/07_Additional_Resources/localization-guide.md` |
| | `docs/00_Planning_Requirements/roadmap.md`, `docs/01_Design_Architecture/adr.md`, `docs/toctree.md` |
| | Root templates: `LICENSE`, `CONTRIBUTING.md`, `CODE_OF_CONDUCT.md`, `SECURITY.md`, `CHANGELOG.md` |
| | `README.md` |

Gate: fails (R10) if any of the required docs (35 docs + toctree + README + 5 templates) is missing after the phase.

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
- [ ] Existing `docs/00_Planning_Requirements/*.md` (regenerated)
- [ ] `tools/reqmind.js` (requirements CLI)

#### Phase 2 Inputs
- [ ] `docs/01_Design_Architecture/tech-design.md`
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
- [ ] `src/`, `docs/00_Planning_Requirements/`, existing `docs/`, `README.md`
- [ ] `.opencode/skills/doc-generation/SKILL.md`

### Complete I/O Checklist — ALL Outputs

#### Phase 1 Outputs -> `docs/00_Planning_Requirements/`, `docs/01_Design_Architecture/`
- [ ] `docs/00_Planning_Requirements/prd.md`
- [ ] `docs/00_Planning_Requirements/srs.md`
- [ ] `docs/00_Planning_Requirements/stories.md`
- [ ] `docs/01_Design_Architecture/tech-design.md`

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
- [ ] `docs/00_Planning_Requirements/roadmap.md`
- [ ] `docs/01_Design_Architecture/arch.md`, `api-ref.md`, `database-schema.md`, `adr.md`
- [ ] `docs/02_Setup_Configuration/setup-guide.md`, `docker-image-guide.md`, `admin-guide.md`, `config-guide.md`
- [ ] `docs/03_Development_Testing/dev-guide.md`, `test-guide.md`, `pipeline-guide.md`, `contributing.md`, `error-codes.md`
- [ ] `docs/04_Operations_Maintenance/runbook.md`, `maint-guide.md`, `mon-alert-guide.md`, `tshoot-guide.md`, `backup-recovery.md`, `deployment-guide.md`, `incident-postmortem-template.md`, `migration-guide.md`
- [ ] `docs/05_Security_Compliance/sec-hardening.md`, `compliance.md`
- [ ] `docs/06_User_Reference/user-guide.md`, `faq.md`, `glossary.md`, `changelog.md`, `service-level-objectives.md`, `onboarding-guide.md`
- [ ] `docs/07_Additional_Resources/localization-guide.md`
- [ ] `docs/toctree.md`
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
- Phase 3 is skipped with `--no-gates`; Phase 4 with `--no-docgen`. Phase 5
  (RTM, R20) always runs. Bare `/pipeline` launches guided mode (TUI asks
  what to do); use `/pipeline run` for the full run.

## Documentation

Phase 4 generates the full document matrix: 5 scripted root templates, 35
docs across 7 numbered subfolders under `docs/`, a toctree.md navigation
hub. See [`docs/toctree.md`](docs/toctree.md) for the full
document index.

| Document | Path | Audience |
| :--- | :--- | :--- |
| Product Requirements | [`docs/00_Planning_Requirements/prd.md`](docs/00_Planning_Requirements/prd.md) | Owner |
| Software Requirements | [`docs/00_Planning_Requirements/srs.md`](docs/00_Planning_Requirements/srs.md) | Owner |
| User Stories | [`docs/00_Planning_Requirements/stories.md`](docs/00_Planning_Requirements/stories.md) | Dev/Owner |
| Project Roadmap | [`docs/00_Planning_Requirements/roadmap.md`](docs/00_Planning_Requirements/roadmap.md) | Owner/Architect |
| Technical Design | [`docs/01_Design_Architecture/tech-design.md`](docs/01_Design_Architecture/tech-design.md) | Architect |
| Architecture (Mermaid) | [`docs/01_Design_Architecture/arch.md`](docs/01_Design_Architecture/arch.md) | Architect |
| API Reference | [`docs/01_Design_Architecture/api-ref.md`](docs/01_Design_Architecture/api-ref.md) | Developer |
| Database Schema | [`docs/01_Design_Architecture/database-schema.md`](docs/01_Design_Architecture/database-schema.md) | Developer/DBA |
| ADR Log | [`docs/01_Design_Architecture/adr.md`](docs/01_Design_Architecture/adr.md) | Architect |
| Setup Guide | [`docs/02_Setup_Configuration/setup-guide.md`](docs/02_Setup_Configuration/setup-guide.md) | User/Admin |
| Docker Image Guide | [`docs/02_Setup_Configuration/docker-image-guide.md`](docs/02_Setup_Configuration/docker-image-guide.md) | DevOps/Admin |
| Administration Guide | [`docs/02_Setup_Configuration/admin-guide.md`](docs/02_Setup_Configuration/admin-guide.md) | Administrator |
| Configuration Guide | [`docs/02_Setup_Configuration/config-guide.md`](docs/02_Setup_Configuration/config-guide.md) | Administrator |
| Developer Guide | [`docs/03_Development_Testing/dev-guide.md`](docs/03_Development_Testing/dev-guide.md) | Developer |
| Testing Guide | [`docs/03_Development_Testing/test-guide.md`](docs/03_Development_Testing/test-guide.md) | Developer |
| Pipeline Guide | [`docs/03_Development_Testing/pipeline-guide.md`](docs/03_Development_Testing/pipeline-guide.md) | Dev/Operator |
| Contributing Guide | [`docs/03_Development_Testing/contributing.md`](docs/03_Development_Testing/contributing.md) | Developer |
| Error Codes | [`docs/03_Development_Testing/error-codes.md`](docs/03_Development_Testing/error-codes.md) | Dev/Operator |
| Operations Runbook | [`docs/04_Operations_Maintenance/runbook.md`](docs/04_Operations_Maintenance/runbook.md) | Operator |
| Maintenance Guide | [`docs/04_Operations_Maintenance/maint-guide.md`](docs/04_Operations_Maintenance/maint-guide.md) | Maintainer |
| Monitoring & Alerting | [`docs/04_Operations_Maintenance/mon-alert-guide.md`](docs/04_Operations_Maintenance/mon-alert-guide.md) | Admin/Operator |
| Troubleshooting Guide | [`docs/04_Operations_Maintenance/tshoot-guide.md`](docs/04_Operations_Maintenance/tshoot-guide.md) | User/Admin |
| Backup & Recovery | [`docs/04_Operations_Maintenance/backup-recovery.md`](docs/04_Operations_Maintenance/backup-recovery.md) | Operator/Maintainer |
| Deployment Guide | [`docs/04_Operations_Maintenance/deployment-guide.md`](docs/04_Operations_Maintenance/deployment-guide.md) | Operator/DevOps |
| Incident Postmortem Template | [`docs/04_Operations_Maintenance/incident-postmortem-template.md`](docs/04_Operations_Maintenance/incident-postmortem-template.md) | Operator/Maintainer |
| Migration Guide | [`docs/04_Operations_Maintenance/migration-guide.md`](docs/04_Operations_Maintenance/migration-guide.md) | Operator/Maintainer |
| Security Hardening Guide | [`docs/05_Security_Compliance/sec-hardening.md`](docs/05_Security_Compliance/sec-hardening.md) | Admin/Security |
| Compliance Guide | [`docs/05_Security_Compliance/compliance.md`](docs/05_Security_Compliance/compliance.md) | Admin/Security/Compliance |
| User Guide | [`docs/06_User_Reference/user-guide.md`](docs/06_User_Reference/user-guide.md) | End user |
| FAQ | [`docs/06_User_Reference/faq.md`](docs/06_User_Reference/faq.md) | All |
| Glossary | [`docs/06_User_Reference/glossary.md`](docs/06_User_Reference/glossary.md) | All |
| Changelog | [`docs/06_User_Reference/changelog.md`](docs/06_User_Reference/changelog.md) | All |
| Service Level Objectives | [`docs/06_User_Reference/service-level-objectives.md`](docs/06_User_Reference/service-level-objectives.md) | Owner/Operator |
| Onboarding Guide | [`docs/06_User_Reference/onboarding-guide.md`](docs/06_User_Reference/onboarding-guide.md) | New team members |
| Localization Guide | [`docs/07_Additional_Resources/localization-guide.md`](docs/07_Additional_Resources/localization-guide.md) | Developer/Translator |
| Table of Contents | [`docs/toctree.md`](docs/toctree.md) | All |
| License | [`LICENSE`](LICENSE) | All |
| Contributing | [`CONTRIBUTING.md`](CONTRIBUTING.md) | Developer |
| Code of Conduct | [`CODE_OF_CONDUCT.md`](CODE_OF_CONDUCT.md) | All |
| Security Policy | [`SECURITY.md`](SECURITY.md) | Admin/Security |
| Changelog (root) | [`CHANGELOG.md`](CHANGELOG.md) | All |

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

See [`docs/01_Design_Architecture/api-ref.md`](docs/01_Design_Architecture/api-ref.md) for signatures.

## Document Classification

| Class | Directory | Purpose |
| :--- | :--- | :--- |
| Class 1 | `docs/00_Planning_Requirements/`, `docs/01_Design_Architecture/` | Business/Requirements |
| Class 2 | `docs/01_Design_Architecture/`, `docs/` | Technical Design |
| Class 3 | `src/`, `__tests__/` | Source/Test |
| Class 4 | `metrics/`, `logs/` | Security/Compliance |
| Class 5 | `docs/02-07_*/`, Root | Operations/User |

## R14 Global Deployment (HARD RULE)

Every pipeline resource is synced to `~/.config/opencode/` (single source of
truth) so `npm run pipeline`, `/pipeline`, and the skills work from any
directory. Deployment is scripted and non-destructive via
`scripts/deploy-global.sh` (`npm run deploy`).

| Resource | Global Location |
| :--- | :--- |
| opencode.jsonc (generated from `opencode.global.jsonc`) | `~/.config/opencode/opencode.jsonc` |
| package.json (generated, incl. `@opencode-ai/plugin`) | `~/.config/opencode/package.json` |
| AGENTS.md | `~/.config/opencode/AGENTS.md` |
| Skills (requirement-gathering, secure-coding, doc-generation, cmmi-analytics) | `~/.config/opencode/skills/*/SKILL.md` |
| Hard rules | `~/.config/opencode/rules/operational-hard-rules.md` |
| Pipeline scripts (opencode-pipeline.sh, collect-metrics.js, spc-control.js, predict-readiness.js, deploy-global.sh) | `~/.config/opencode/scripts/` |
| Root doc templates (LICENSE, CONTRIBUTING.md, CODE_OF_CONDUCT.md, SECURITY.md, CHANGELOG.md) | `~/.config/opencode/scripts/templates/` |
| Tools (reqmind.js) | `~/.config/opencode/tools/` |
| ESLint config | `~/.config/opencode/.eslintrc.js` |
| .gitignore | `~/.config/opencode/.gitignore` |
| Canonical artifacts (docs/, src/, __tests__/, specs/RTM.md, metrics/) | `~/.config/opencode/` |
| Command `/pipeline` | `~/.config/opencode/commands/pipeline.md` |
| SSOT format reference (`opencode.project.md`, used by `/pipeline spec`) | `~/.config/opencode/opencode.project.md` |
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
Linux/
├── .opencode/
│   ├── skills/
│   │   ├── requirement-gathering/SKILL.md
│   │   ├── secure-coding/SKILL.md
│   │   ├── doc-generation/SKILL.md
│   │   └── cmmi-analytics/SKILL.md
│   ├── commands/
│   │   └── pipeline.md        # /pipeline (synced globally)
│   └── rules/
│       └── operational-hard-rules.md  # R14/R15 HARD RULES (synced globally)
├── scripts/
│   ├── opencode-pipeline.sh
│   ├── deploy-global.sh      # R14 global deployment (npm run deploy)
│   ├── collect-metrics.js
│   ├── spc-control.js
│   ├── predict-readiness.js
│   └── templates/             # Phase 4 scripted root templates (R14)
│       ├── LICENSE
│       ├── CONTRIBUTING.md
│       ├── CODE_OF_CONDUCT.md
│       ├── SECURITY.md
│       └── CHANGELOG.md
├── tools/
│   └── reqmind.js           # requirements CLI (global bin, import-safe C4-6)
├── specs/              # Class 1 (rtm.md mirror, idea.md only)
├── src/                # Class 3
├── __tests__/          # Class 3
├── docs/               # Class 2 & 5
│   ├── 00_Planning_Requirements/   # Class 1 (rtm.md canonical)
│   ├── 01_Design_Architecture/
│   ├── 02_Setup_Configuration/
│   ├── 03_Development_Testing/
│   ├── 04_Operations_Maintenance/
│   │   └── SOP/             # on-demand (/pipeline sops)
│   ├── 05_Security_Compliance/
│   ├── 06_User_Reference/
│   ├── 07_Additional_Resources/
│   └── toctree.md
├── metrics/            # Class 4
├── logs/               # Class 4
├── AGENTS.md
├── opencode.jsonc
├── opencode.global.jsonc   # global config template (R14)
├── package.json
└── README.md
```

Global deployment (R14): run `npm run deploy` to sync this structure to
`~/.config/opencode/` so the pipeline and skills run from anywhere.

## Troubleshooting

### Run the Pipeline Script

```bash
# Verify the shell script runs (bash 4+ required)
bash scripts/opencode-pipeline.sh --help

# Make the scripts executable (optional; bash scripts/... works regardless)
chmod +x scripts/*.sh
```

### Check OpenCode Installation

```bash
opencode --version
```

### View Metrics Database

```bash
sqlite3 metrics/metrics.db "SELECT * FROM builds ORDER BY id DESC LIMIT 10;"
```

## License

MIT

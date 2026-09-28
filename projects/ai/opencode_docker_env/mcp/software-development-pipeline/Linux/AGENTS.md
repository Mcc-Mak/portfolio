# CMMI Level 4 Project Charter - Linux Edition

## ============================================================
## PROJECT IDENTITY
## ============================================================

- **Tech Stack**: Node.js (LTS)
- **Workflow Order (W1)**: Requirements → Coding → DevSecOps → Documentation
- **Security Policy**: All gates mandatory (R7-R11, R16-R19)
- **Deployment**: Global `~/.config/opencode/` (single source of truth)

## ============================================================
## C4-1: CMMI LEVEL 4 QUANTITATIVE GOALS
## ============================================================

| Metric | Target | Measurement Method |
| :--- | :--- | :--- |
| Defect Density (Critical+High/KLOC) | ≤ 0.5 | npm audit + ESLint + DAST findings / LOC |
| Build Stability (rolling 10 builds) | ≥ 98% | metrics.db |
| Cycle Time Stability (std dev) | < 2 minutes | metrics.db timestamps |

## ============================================================
## C4-3: STATISTICAL PROCESS CONTROL RULES
## ============================================================

- **UCL (Upper Control Limit)** = Mean + 3σ
- **LCL (Lower Control Limit)** = Max(0, Mean - 3σ)
- **Action**: If current defect density > UCL → BLOCK MERGE (R10)
- **Warning**: If 2 consecutive builds trend upward → auto-generate remediation (C4-5)

## ============================================================
## R4: DOCUMENT CLASSIFICATION (TOOL → PATH → FILE)
## ============================================================

| Class | Directory | Tools/Skills | Output Files |
| :--- | :--- | :--- | :--- |
| **Class 1 (Business/Requirements)** | `docs/00_Planning_Requirements/`, `docs/01_Design_Architecture/`, `specs/` | requirement-gathering SKILL, generate-rtm.js (R20) | prd.md, srs.md, stories.md, tech-design.md, rtm.md (docs/00_Planning_Requirements/rtm.md canonical) |
| **Class 2 (Technical Design)** | `docs/01_Design_Architecture/`, `docs/` | /speckit.plan | tech-design.md, arch.md, adr.md, api-ref.md, database-schema.md |
| **Class 3 (Source/Test)** | `src/`, `__tests__/` | secure-coding SKILL | *.js, *.spec.js |
| **Class 4 (Security/Compliance)** | `metrics/`, `logs/` | Pipeline scripts | metrics.db, audit.log, spc-report.md, compliance-report.md, threat-model.md, dast-report.md |
| **Class 5 (Ops/User)** | `docs/02-07_*/`, Root | doc-generation SKILL | README.md, setup-guide.md, user-guide.md, runbook.md |

## ============================================================
## ALL REQUIREMENTS SUMMARY
## ============================================================

| ID | Description | Implementation |
| :--- | :--- | :--- |
| R1 | Requirement Clarification | requirement-gathering SKILL → docs/00_Planning_Requirements/, docs/01_Design_Architecture/ |
| R2 | AI Coding | secure-coding SKILL → src/, __tests__/ |
| R3 | Documentation Generation | doc-generation SKILL → docs/, README.md |
| R4 | Separation of Concerns | Three independent skills + AGENTS.md |
| R5 | Single Entry Point | All via `opencode run` |
| R6 | Free/Local-First | Ollama + open-source |
| R7 | Runtime Protection | Manual checks in pipeline |
| R8 | SAST | ESLint in pipeline |
| R9 | SCA | npm audit in pipeline |
| R10 | Mandatory Gate | fail on error in pipeline |
| R11 | Auditable Traceability | logs/audit.log |
| R12 | AGENTS.md | This file |
| R13 | SKILL.md | .opencode/skills/*/SKILL.md |
| R14 | Global Deployment (HARD RULE) | ALL resources mirrored to ~/.config/opencode/ |
| R15 | Git Commit Reminder (HARD RULE) | Prompt user to commit via TUI when done |
| R16 | Compliance Check | compliance-check.js (GDPR/HIPAA/PCI DSS/SOX evidence gates) → metrics/compliance-report.md |
| R17 | Threat Modeling | threat-model.js (npm audit + OSV.dev CVE/CVSS, OWASP mapping) → metrics/threat-model.md |
| R18 | Notification | notify.js (Telegram env-only; Slack/Discord planned) on gate results |
| R19 | DAST | dast-scan.js (on-prem OWASP ZAP preferred - running instance via JSON API at http://zap:8080, else Docker/CLI; warn+block if no free engine; recommends 2 best paid on-prem engines) → metrics/dast-report.md |
| R20 | Requirements Traceability Matrix | generate-rtm.js (parses SRS §6 traceability + FR/NFR tables, cross-refs User-Stories.md, verifies src/__tests__/docs/ artifacts on disk, maps R-IDs to audit.log gates) → docs/00_Planning_Requirements/rtm.md (canonical) + specs/rtm.md (mirror), R10 blocking on broken links |
| W1 | Strict Order | Pipeline script enforces order |
| C4-1 | Quantitative Goals | Above metrics table |
| C4-2 | Measurement Data | collect-metrics.js → metrics/metrics.db |
| C4-3 | SPC | spc-control.js (UCL/LCL 3-sigma) |
| C4-4 | Prediction | predict-readiness.js (regression) |
| C4-5 | Proactive Action | Auto-remediation in predict-readiness.js |

## ============================================================
## C4-6: OPENCODE CUSTOM-TOOL IMPORT-SAFETY (KNOWN CONSTRAINT)
## ============================================================

opencode auto-imports EVERY `.js` file under the global
`~/.config/opencode/tools/` as a custom tool module, **in-process**, at
startup. A plain CLI `.js` whose top-level code runs on import (e.g. prints
a usage message and calls `process.exit(1)`) will **CRASH opencode**: the
desktop sidecar exits with code 1, headless `opencode run` exits 1 with the
CLI usage string on stderr, and the renderer reports
`TypeError: Failed to fetch`.

Every `.js` deployed to `tools/` MUST be **import-safe**:

- Side-effect-free on import, with the CLI entry guarded by
  `if (require.main === module) { ... }` (see `tools/reqmind.js`), OR
- A proper custom tool module exporting a `tool()` definition from
  `@opencode-ai/plugin` (see https://opencode.ai/docs/custom-tools/).

`scripts/deploy-global.sh` refuses to deploy a `tools/*.js` that is not
import-safe (R10 BLOCKING defect). Never copy a CLI `.js` into
`tools/` without the guard.

> **R14 and R15 are operational HARD RULES.** They are defined in
> `.opencode/rules/operational-hard-rules.md` (loaded via `opencode.jsonc`
> `instructions`), not in this charter. See that file for the full text.
>
> Deploy globally with `npm run deploy` (runs `scripts/deploy-global.sh`).

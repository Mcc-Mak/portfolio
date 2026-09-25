---
description: Operational HARD RULES - global deployment + git commit reminders
---

# Operational Hard Rules

These are HARD RULES that govern how work is performed. They are loaded as
instructions alongside `AGENTS.md` (the project charter).

## ============================================================
## R14: GLOBAL DEPLOYMENT - HARD RULE
## ============================================================

**HARD RULE: Deploy ALL relevant resources as global config.**

Every pipeline resource MUST be synced to `~/.config/opencode/` so that
`npm run pipeline` and the `/pipeline` command work from ANY directory.
Deployment is NON-destructive and scripted (never blind copy/paste) via the
single source of truth `/workplace/mcp/software-development-pipeline/Linux`:

| Resource | Project Source | Global Location |
| :--- | :--- | :--- |
| Global config (generated) | `opencode.global.jsonc` | `~/.config/opencode/opencode.jsonc` |
| package.json (generated) | `package.json` (+ `@opencode-ai/plugin`) | `~/.config/opencode/package.json` |
| AGENTS.md | `AGENTS.md` | `~/.config/opencode/AGENTS.md` |
| Hard rules | `.opencode/rules/operational-hard-rules.md` | `~/.config/opencode/rules/operational-hard-rules.md` |
| Skills (requirement-gathering, secure-coding, doc-generation, cmmi-analytics) | `.opencode/skills/*/SKILL.md` | `~/.config/opencode/skills/*/SKILL.md` |
| Command `/pipeline` | `.opencode/commands/pipeline.md` | `~/.config/opencode/commands/pipeline.md` |
| SSOT format reference (`opencode.project.md`, used by `/pipeline ssot`) | `opencode.project.md` | `~/.config/opencode/opencode.project.md` |
| Pipeline scripts (opencode-pipeline.sh, collect-metrics.js, spc-control.js, predict-readiness.js, generate-rtm.js, validate-mermaid.js, deploy-global.sh) | `scripts/` | `~/.config/opencode/scripts/` |
| DevSecOps scripts (compliance-check.js, compliance.config.json, threat-model.js, dast-scan.js, dast.config.json, notify.js) | `scripts/` | `~/.config/opencode/scripts/` |
| Root doc templates (LICENSE, CONTRIBUTING.md, CODE_OF_CONDUCT.md, SECURITY.md, CHANGELOG.md) | `scripts/templates/` | `~/.config/opencode/scripts/templates/` |
| Tools (reqmind.js) | `tools/` | `~/.config/opencode/tools/` |
| ESLint config | `.eslintrc.js` | `~/.config/opencode/.eslintrc.js` |
| .gitignore | `.gitignore` | `~/.config/opencode/.gitignore` |
| Canonical artifacts (specs/, src/, __tests__/, docs/, metrics/) | project dirs | `~/.config/opencode/` |
| Global dependencies | package.json devDependencies | `~/.config/opencode/node_modules/` (via `npm install`) |

**Enforcement:**
1. NEVER modify a global resource directly - edit the project source and
   re-run the deploy script. A hand-edited global resource is a BLOCKING defect.
2. Run `bash scripts/deploy-global.sh` (or `npm run deploy`) after EVERY
   change to any of the resources above.
   The sync MUST be recorded in `logs/audit.log` (R5/R11).
3. NEVER run the pipeline against a stale global copy - deploy the latest
   scripts/skills/specs first.
4. `npm run pipeline` MUST be executable from `~/.config/opencode/` with zero
   dependency on the project directory.
5. Any new resource (skill, script, tool, doc, artifact, config key) MUST be
   added to the resource table above and the deploy script within the same
   change - a missing mirror is a BLOCKING defect.
6. The global `opencode.jsonc` and `package.json` are GENERATED from project
   templates by the deploy script. Do not edit them by hand; the global config
   deliberately omits `skills.paths` (global skills auto-discover from
   `~/.config/opencode/skills/`) and uses global-relative `instructions` paths.
7. After any deploy, restart opencode so the new global config/skills/commands
   are loaded (config loads at startup).
8. **`tools/*.js` MUST be import-safe.** opencode auto-imports every `.js` in
   `~/.config/opencode/tools/` as a custom tool module, in-process, at startup.
   A plain CLI whose top-level code runs on import (prints usage, calls
   `process.exit`) CRASHES opencode (desktop sidecar exits 1; headless
   `opencode run` exits 1 with the CLI usage on stderr). Every `.js` deployed
   to `tools/` must either guard its CLI entry with
   `if (require.main === module) { ... }` or export a `tool()` definition from
   `@opencode-ai/plugin`. `scripts/deploy-global.sh` refuses to deploy a
   `tools/*.js` that is not import-safe (R10 BLOCKING defect).

## ============================================================
## R15: GIT COMMIT REMINDER - HARD RULE
## ============================================================

**HARD RULE: Ask the user to commit to local git whenever all changes are done.**

- After completing a unit of work (any batch of changes that leaves the tree
  in a consistent, working state), ask the user to commit to local git via the
  TUI.
- Do NOT commit automatically - always prompt the user first.
- Ask BEFORE starting new work that would mix unrelated changes into the same
  commit, and at natural milestones (feature complete, bug fixed, docs
  updated, deployment synced).
- Suggested prompt: "All changes are complete. Would you like me to commit
  them to local git now?"
- If the user says yes, run `git status`, review the diff, stage only intended
  files (never secrets), and create a concise commit in the repo style.

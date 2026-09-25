---
description: Run the CMMI Level 4 DevSecOps pipeline (Requirements -> Coding -> Gates -> Docs -> Traceability). Bare /pipeline opens a TUI guided menu; shortcuts: run, run no-docgen, run no-gates, spec, sops.
agent: build
---

Run the CMMI Level 4 OpenCode DevSecOps pipeline against the CURRENT working
directory (the project). The pipeline "executable" and its dependencies live
in the global opencode config directory:
`$HOME/.config/opencode` (i.e. `~/.config/opencode`). The project-wise
resources — the project's `AGENTS.md`, plus `opencode.project.md` (SSOT),
`docs/00_Planning_Requirements/`, `docs/01_Design_Architecture/`, `docs/00_Planning_Requirements/rtm.md`,
`src/`, `__tests__/`, `docs/`, `logs/`, `metrics/` — are ingested
and produced in the current working directory by that executable.

## Argument dispatch (from $ARGUMENTS)

| $ARGUMENTS | Action |
| :--- | :--- |
| *(empty)* | **TUI guided mode** — ask the user what to do, one question at a time (see below). Do NOT run anything until the user has answered. |
| `run` | Full pipeline — Phases 1-5, all gates (≡ `npm run pipeline`) |
| `run no-docgen` | Skip Phase 4 documentation matrix (Phases 1-3 + 5, gates still run) |
| `run no-gates` | Skip Phase 3 security gates (Phases 1, 2, 4, 5 — local testing only, never for merge) |
| `spec` | Create or update `opencode.project.md` (SSOT) via one-by-one TUI interview (see "Project Specification" section). Does NOT run the pipeline. |
| `sops` | Generate Standard Operating Procedures (`docs/04_Operations_Maintenance/SOP/sop-*.md`) on demand. Does NOT run the full pipeline. |
| `help` | Print the help menu (see end of this file). |

## TUI guided mode (bare `/pipeline`, no arguments)

When $ARGUMENTS is empty, guide the user interactively. Ask ONE question at a
time using the question tool. Do NOT batch questions. Do NOT run anything
until the user has made all choices.

### Step 1 — Ask what the user wants to do

Use the question tool with this question:

> "What would you like to do?"

Options (in this order):

1. **Run the pipeline** — Execute the CMMI Level 4 DevSecOps pipeline (Requirements → Coding → Gates → Docs → Traceability)
2. **Create / update project specification** — Write or update `opencode.project.md` (the Single Source of Truth) via an interactive interview
3. **Generate Standard Operating Procedures** — Create SOP documents (`docs/04_Operations_Maintenance/SOP/sop-*.md`) on demand
4. **Show help** — Print the full command reference

If the user picks option 4, print the help menu at the end of this file and stop.

If the user picks option 2, proceed to the "Project Specification (SSOT)
creation" section below.

If the user picks option 3, run:
`bash "$HOME/.config/opencode/scripts/opencode-pipeline.sh" "$PWD" --sops`
Wait for completion and verify the audit.log entry. Then stop.

If the user picks option 1 (Run the pipeline), continue to Step 2.

### Step 2 — Ask about documentation generation

Use the question tool:

> "Include documentation generation (Phase 4 — 35-doc matrix + README + root templates)?"

Options:

1. **Yes, include documentation** (Recommended) — Full pipeline with all deliverables
2. **No, skip documentation** — Run code + security gates + traceability only (faster; use when iterating on code)

### Step 3 — Ask about security gates

Use the question tool:

> "Include security gates (Phase 3 — SAST, SCA, DAST, compliance, threat model, tests, SPC)?"

Options:

1. **Yes, include security gates** (Recommended) — All 10 DevSecOps gates enforced (merge-ready)
2. **No, skip gates** — Local testing only; NEVER use for merge (gates are bypassed)

### Step 4 — Execute

Based on the two answers, run the appropriate command (DO NOT simulate — run it):

| Docs answer | Gates answer | Command |
| :--- | :--- | :--- |
| Yes | Yes | `bash "$HOME/.config/opencode/scripts/opencode-pipeline.sh" "$PWD"` |
| No | Yes | `bash "$HOME/.config/opencode/scripts/opencode-pipeline.sh" "$PWD" --no-docgen` |
| Yes | No | `bash "$HOME/.config/opencode/scripts/opencode-pipeline.sh" "$PWD" --no-gates` |
| No | No | `bash "$HOME/.config/opencode/scripts/opencode-pipeline.sh" "$PWD" --no-docgen --no-gates` |

Wait for completion. Then verify the final success marker: the console prints
`[OK] PIPELINE SUCCESSFUL` or the last line of `logs/audit.log` ends with
`SUCCESS`. If any gate reports FAIL/BLOCKED, report the failing phase and the
`logs/audit.log` tail.

## Power-user shortcuts (typed directly, bypass TUI)

If $ARGUMENTS is non-empty, dispatch directly (no TUI questions):

1. `run` → `bash "$HOME/.config/opencode/scripts/opencode-pipeline.sh" "$PWD"`
2. `run no-docgen` → same command plus `--no-docgen`
3. `run no-gates` → same command plus `--no-gates`
4. `run no-docgen no-gates` (or `run no-gates no-docgen`) → both flags
5. `spec` → run the SSOT interview (see "Project Specification" section)
6. `sops` → `bash "$HOME/.config/opencode/scripts/opencode-pipeline.sh" "$PWD" --sops`
7. `help` → print the help menu below

## Execution rules

1. Generated markdown MUST embed diagrams (Mermaid by default, PlantUML or
   Graphviz where the diagram type demands it) per the Diagram Policy in the
   skills, and the Mermaid syntax MUST follow the CURRENT release used by
   https://mermaid.live (Mermaid v11.16.x). Both canonical and `-beta` keyword
   forms are accepted. Allowed types: `flowchart`/`graph`, `sequenceDiagram`,
   `classDiagram`, `stateDiagram-v2`, `erDiagram`, `architecture-beta`, `block`,
   `C4Context`/`C4Container`/`C4Component`/`C4Dynamic`/`C4Deployment`,
   `eventmodeling`, `ishikawa`, `kanban`, `pie`, `quadrantChart`, `timeline`,
   `requirementDiagram`, `sankey`, `xychart`. Disallowed: `gantt`, `journey`,
   `gitGraph`, `cynefin-beta`, `mindmap`, `venn`, `packet`, `radar`, `treemap`,
   `wardley`. All diagrams are validated by `scripts/validate-mermaid.js` (R10 gate).
   specs/ flowcharts + sequence diagrams, docs/01_Design_Architecture/arch.md flow +
   component diagrams, metrics/spc-report.md xychart control chart.
2. When `opencode.project.md` is present, `src/` is the ROOT DIRECTORY of the
   codebase described by the SSOT. Phases 1/2/4 build the codebase, specs, and
   docs with `src/` as the code root, following the Repository Layout (SSOT §4)
   exactly (e.g. `src/server.js`, `src/database/`, `src/frontend/`).
3. Wait for completion and verify the final success marker in the project's
   `logs/audit.log` (last line must end with `SUCCESS` or the console prints
   `[OK] PIPELINE SUCCESSFUL` or `[OK] SOPs completed`).
4. If any gate reports FAIL/BLOCKED, report the failing phase and the
   `logs/audit.log` tail instead of stopping silently.

## Project Specification (SSOT) creation (`/pipeline spec`)

Do NOT run the pipeline. Create or update `opencode.project.md` in the current
working directory. It is the SINGLE SOURCE OF TRUTH: when present, its full
content is injected into Phases 1/2/4 so specs, code and docs match it exactly.

Workflow:
1. Tell the user the interview has started and that questions are asked ONE at
   a time for their convenience.
2. If `SSOT.md` exists in the current working directory (the prototype's Single
   Source of Truth), read it and use its content to PRE-FILL the interview
   answers; only ask about missing or conflicting fields. Tell the user whether
   `SSOT.md` was imported.
3. Ask the questions below ONE at a time in the order given, using the TUI
   question tool when available; otherwise ask a plain chat prompt and wait for
   the answer before asking the next one. Never batch multiple questions into a
   single prompt. Keep follow-up prompts to a minimum.
4. Capture each answer; where an answer is unknown, ask one short clarifying
   follow-up, otherwise record "TBD (to be defined)" so the SSOT stays complete.
5. After the last answer, write/update `opencode.project.md` following the
   canonical SSOT format (the reference format at
   `~/.config/opencode/opencode.project.md`): a titled header with a "canonical"
   disclaimer, a Table of Contents, and the numbered sections 1-20 from that
   template. Fill every section from the answers; keep sections that were not
   answered minimal but present (e.g. "TBD (to be defined)").
6. If `opencode.project.md` already exists, merge: preserve any section the user
   did not re-answer and only rewrite sections the user changed. Do not destroy
   existing content silently — confirm destructive edits with the user.
7. `src/` is ALWAYS the ROOT DIRECTORY of the codebase in the Repository Layout
   (SSOT §4); build the tree as `src/<layer>/...` and backend modules directly
   under `src/`.
8. Report the path written and summarize which sections were created or updated.

Interview questions (ask one by one, in this order):
1. Project code name and full name (e.g. "CASIS (AI-Developed)" / "Computer Aided Seismic Information System").
2. One-to-two sentence description and primary purpose.
3. Architecture type / layer decomposition (e.g. "MERN 3-layer: database/backend/frontend").
4. Tech stack per layer: database, backend (framework + language), frontend (framework + build tool), and key libraries.
5. License (e.g. MIT).
6. Core capabilities (comma-separated feature list).
7. Codebase root: confirm `src/` is the ROOT DIRECTORY of the codebase (default: yes).
8. Repository layout under `src/` (folders and key files) — free text or "generate a sensible MERN layout".
9. Configuration: environment variables and their defaults.
10. Data sources and routing (inputs and how they are selected).
11. API reference: main endpoints (method + path + purpose).
12. Workflow / user-facing stages (e.g. a 3-stage processing flow).
13. Hard rules and coding conventions.
14. Deployment and operations (commands, ports, services).
15. Security considerations (top items).
16. Troubleshooting (common issues) and log locations.
17. Glossary terms to include.

## Help menu

```
CMMI Level 4 OpenCode DevSecOps Pipeline
Usage: /pipeline [subcommand]

  /pipeline               Guided mode — asks what to do, one question at a time
  /pipeline run           Full pipeline (Phases 1-5, all gates)
  /pipeline run no-docgen Skip Phase 4 documentation (Phases 1-3 + 5)
  /pipeline run no-gates  Skip Phase 3 gates (Phases 1, 2, 4, 5 — local only)
  /pipeline spec          Create/update opencode.project.md (SSOT) via TUI interview
  /pipeline sops          Generate SOPs (docs/04_Operations_Maintenance/SOP/sop-*.md)
  /pipeline help          Show this help menu

Project Specification (SSOT):
  Put your requirements in opencode.project.md (the SINGLE SOURCE OF TRUTH).
  Create or update it interactively with `/pipeline spec` (asks one question at
  a time; imports SSOT.md if present). When present, its full content is
  injected into Phases 1/2/4 so specs, code and docs match it exactly; when
  absent the pipeline runs generically. When the SSOT is present, src/ is the
  ROOT DIRECTORY of the codebase and its Repository Layout (SSOT §4) is
  followed exactly.

Recommended workflow (LAMP prototype first):
  1. Build a web app prototype (LAMP) first; keep a Single Source of Truth as
     SSOT.md.
  2. Put SSOT.md inside the OpenCode-managed repository, then run
     `/pipeline spec` to rewrite opencode.project.md (SSOT.md is imported to
     pre-fill the interview answers).
  3. Run `/pipeline run` to create the project with documentation.
  4. Or just type `/pipeline` and let the TUI guide you.

Diagrams:
  All generated markdown embeds Mermaid/PlantUML/Graphviz diagrams where
  needed (flowcharts, sequence/ER/state diagrams, component graphs, SPC charts).
  Mermaid syntax follows the CURRENT release used by https://mermaid.live
  (Mermaid v11.16.x). Both canonical and `-beta` keyword forms are accepted.
  All diagrams are validated by `scripts/validate-mermaid.js` (R10 gate).
```

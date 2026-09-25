---
name: doc-generation
description: Use when generating Class 2 technical-design and Class 5 ops/user documentation for the CMMI Level 4 pipeline (R3). Produces the full 25-document matrix: 5 scripted root templates, 5 core docs (docs/architecture.md, docs/API-Reference.md, docs/Setup-Guide.md, docs/wiki/*), 15 persona/audience docs in docs/, and updates README.md.
---

# doc-generation Skill

## Purpose

Produce the complete documentation matrix (R3) for the CMMI Level 4 pipeline:
Class 2 (Technical Design) and Class 5 (Ops/User) documents covering every
persona (end user, administrator, developer, operator, maintainer, architect,
project owner). Templates (LICENSE, CONTRIBUTING, CODE_OF_CONDUCT, SECURITY,
CHANGELOG) are scripted by the pipeline, not generated here.

## Inputs

- Source of truth: `specs/`, `src/`, `AGENTS.md`, existing `docs/`

## Document Matrix

### Core docs (regenerate every run)

| File | Content |
| :--- | :--- |
| `docs/architecture.md` | Component/flow diagrams, design decisions. MUST include a high-level flow diagram and a component diagram of the `src/` layer. |
| `docs/API-Reference.md` | Exported functions/classes with signatures and examples (match actual `src/` exports). |
| `docs/Setup-Guide.md` | Install/run instructions from scratch. |
| `docs/wiki/Home.md` | Wiki index linking all docs. |
| `docs/wiki/Architecture.md` | Wiki architecture page. |

### Audience docs (regenerate every run, one concern per doc - no duplication)

| File | Persona | Content |
| :--- | :--- | :--- |
| `docs/User-Guide.md` | End user | Run `/pipeline`, interpret output, quick reference. |
| `docs/Troubleshooting-Guide.md` | User + Admin | Common CLI/pipeline errors and their fixes. |
| `docs/FAQ.md` | All | Frequent questions and answers. |
| `docs/Glossary.md` | All | CMMI/SPC/UCL/LCL/DevSecOps terminology. |
| `docs/Administration-Guide.md` | Administrator | Global deploy, opencode config, access control, audit log reading, backups. |
| `docs/Configuration-Guide.md` | Administrator | `opencode.jsonc`, models, providers, profiles. |
| `docs/Security-Hardening-Guide.md` | Admin/Security | How R7-R11 gates work + hardening steps. |
| `docs/Monitoring-Alerting-Guide.md` | Admin/Operator | Read `metrics.db`, SPC reports, audit.log cadence. |
| `docs/Developer-Guide.md` | Developer | Coding standards, git workflow, local setup, debugging. |
| `docs/Testing-Guide.md` | Developer | Jest structure, coverage, when tests block (R10). |
| `docs/Pipeline-Guide.md` | Dev/Operator | Phase I/O, gates, W1 order, skip variants. |
| `docs/Operations-Runbook.md` | Operator | Day-2 ops, run variants, backup/restore, incident response. |
| `docs/Maintenance-Guide.md` | Maintainer | Upgrades, deprecation, patches, health checks. |
| `docs/ADR.md` | Architect | Architectural decision record log (R10, R14, C4-3...). |
| `docs/Project-Roadmap.md` | Owner/Architect | Milestones, backlog, C4-1 KPI targets. |

### Root templates (scripted by the pipeline, NOT generated here)

`LICENSE`, `CONTRIBUTING.md`, `CODE_OF_CONDUCT.md`, `SECURITY.md`,
`CHANGELOG.md` are copied from `scripts/templates/` by the pipeline
(create-if-missing). The skill must not create or overwrite them.

## Workflow

1. Write `docs/architecture.md` - component/flow diagrams and design decisions.
2. Write `docs/API-Reference.md` - exported functions/classes with signatures and examples.
3. Write `docs/Setup-Guide.md` - install/run instructions.
4. Write `docs/wiki/Home.md` (and any needed wiki pages).
5. Write the audience docs for the current pass (each scoped to its concern).
6. Update root `README.md` - badges, quick start, structure, requirements table, and the Documentation table listing every doc.

## Diagram Policy (Mermaid / PlantUML / Graphviz)

Embed diagrams in every generated doc wherever a picture beats prose. Choose the
engine by diagram purpose so the markdown renders on GitHub/GitLab/VSCode previews:

| Purpose | Engine | Example block |
| :--- | :--- | :--- |
| Flowcharts / process flows | **Mermaid** (default) | ` ```mermaid\nflowchart TD\n...\n``` ` |
| Sequence / interaction | **Mermaid** `sequenceDiagram` | ` ```mermaid\nsequenceDiagram\n...\n``` ` |
| Class / object model | **Mermaid** `classDiagram` | ` ```mermaid\nclassDiagram\nclass X {}\n``` ` |
| State machines | **Mermaid** `stateDiagram-v2` | ` ```mermaid\nstateDiagram-v2\n...\n``` ` |
| Entity-relationship / data model | **Mermaid** `erDiagram` | ` ```mermaid\nerDiagram\n...\n``` ` |
| Architecture / C4 (system, container, component) | **Mermaid** `architecture-beta` or `C4Context` | ` ```mermaid\narchitecture-beta\n...\n``` ` |
| Block / system-boundary composition | **Mermaid** `block-beta` | ` ```mermaid\nblock-beta\n...\n``` ` |
| Kanban / work pipeline | **Mermaid** `kanban` | ` ```mermaid\nkanban\n...\n``` ` |
| Root-cause analysis (fishbone) | **Mermaid** `ishikawa` | ` ```mermaid\nishikawa\n...\n``` ` |
| Event modeling (event-driven systems) | **Mermaid** `eventmodeling` | ` ```mermaid\neventmodeling\n...\n``` ` |
| Decision / complexity framework | **Mermaid** `cynefin-beta` | ` ```mermaid\ncynefin-beta\n...\n``` ` |
| User journey / gantt / timeline / git history | **Mermaid** `journey`/`gantt`/`timeline`/`gitGraph` | ` ```mermaid\ngantt\n...\n``` ` |
| Rich UML (class/component/use-case beyond Mermaid) | **PlantUML** `@startuml` | ` ```plantuml\n@startuml\nclass X {}\n@enduml\n``` ` |
| Complex dependency / layout graphs | **Graphviz** `digraph` | ` ```dot\ndigraph G { A -> B }\n``` ` |
| Numeric time-series / charts | **Mermaid** `xychart-beta` | ` ```mermaid\nxychart-beta\n...\n``` ` |

Rules:
1. Use Mermaid by default (prefer the type that matches the content); fall back to
   PlantUML (`plantuml` fence) or Graphviz (`dot` fence) only when the diagram type
   is not expressible in Mermaid.
2. Always caption the diagram with a short line above it (e.g. `Figure 1 - ...`).
3. Keep each diagram focused (<= ~15 nodes); split large models into multiple diagrams.
4. Verify the fence language matches the engine (`mermaid`, `plantuml`, or `dot`).
5. `docs/architecture.md` MUST contain at least a high-level flow diagram and a
   component diagram of the `src/` layer.

## Outputs

- `docs/architecture.md`
- `docs/API-Reference.md`
- `docs/Setup-Guide.md`
- `docs/wiki/*`
- Audience docs under `docs/` (User-Guide, Troubleshooting-Guide, FAQ, Glossary,
  Administration-Guide, Configuration-Guide, Security-Hardening-Guide,
  Monitoring-Alerting-Guide, Developer-Guide, Testing-Guide, Pipeline-Guide,
  Operations-Runbook, Maintenance-Guide, ADR, Project-Roadmap)
- `README.md` (updated)
- Root templates (`LICENSE`, `CONTRIBUTING.md`, `CODE_OF_CONDUCT.md`,
  `SECURITY.md`, `CHANGELOG.md`) are scripted by the pipeline, not this skill.

## Acceptance Criteria

- Files written to disk via the write tool.
- Content matches actual `src/` exports.
- Every audience doc is scoped to its concern (no duplicated content).
- No tool-call JSON printed; no summary-only output.

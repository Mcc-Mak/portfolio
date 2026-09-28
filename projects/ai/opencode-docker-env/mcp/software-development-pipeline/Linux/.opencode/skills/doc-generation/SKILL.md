---
name: doc-generation
description: Use when generating Class 2 technical-design and Class 5 ops/user documentation for the CMMI Level 4 pipeline (R3). Produces the full 35-document matrix across 7 numbered subfolders under docs/ plus toctree.md: 5 scripted root templates, core docs, audience docs, and updates README.md.
---

# doc-generation Skill

## Purpose

Produce the complete documentation matrix (R3) for the CMMI Level 4 pipeline:
Class 2 (Technical Design) and Class 5 (Ops/User) documents covering every
persona (end user, administrator, developer, operator, maintainer, architect,
project owner). Templates (LICENSE, CONTRIBUTING, CODE_OF_CONDUCT, SECURITY,
CHANGELOG) are scripted by the pipeline, not generated here.

## Inputs

- Source of truth: `docs/00_Planning_Requirements/`, `src/`, `AGENTS.md`, existing `docs/`
- `opencode.project.md` (SSOT) when present — its full content is injected; when
  present, `src/` is the ROOT DIRECTORY of the codebase it describes and the
  `docs/01_Design_Architecture/arch.md` component diagram documents the `src/` layer per the
  SSOT Repository Layout

## Document Matrix

Documents are organized into numbered subfolders under `docs/`. Cross-folder
references use relative paths (e.g. `../01_Design_Architecture/arch.md`).
Same-folder references use just the filename.

### Core docs (regenerate every run)

| File | Content |
| :--- | :--- |
| `docs/01_Design_Architecture/arch.md` | Component/flow diagrams, design decisions. MUST include a high-level flow diagram and a component diagram of the `src/` layer. |
| `docs/01_Design_Architecture/api-ref.md` | Exported functions/classes with signatures and examples (match actual `src/` exports). |
| `docs/01_Design_Architecture/database-schema.md` | Data model, ER diagrams, table/index definitions, migration strategy. |
| `docs/02_Setup_Configuration/setup-guide.md` | Install/run instructions from scratch. |
| `docs/02_Setup_Configuration/docker-image-guide.md` | Docker image build, tagging, registry, multi-stage builds, security hardening. |

### Audience docs (regenerate every run, one concern per doc - no duplication)

| File | Persona | Content |
| :--- | :--- | :--- |
| `docs/00_Planning_Requirements/roadmap.md` | Owner/Architect | Milestones, backlog, C4-1 KPI targets. |
| `docs/01_Design_Architecture/adr.md` | Architect | Architectural decision record log (R10, R14, C4-3...). |
| `docs/02_Setup_Configuration/config-guide.md` | Administrator | `opencode.jsonc`, models, providers, profiles. |
| `docs/02_Setup_Configuration/admin-guide.md` | Administrator | Global deploy, opencode config, access control, audit log reading, backups. |
| `docs/03_Development_Testing/dev-guide.md` | Developer | Coding standards, git workflow, local setup, debugging. |
| `docs/03_Development_Testing/test-guide.md` | Developer | Jest structure, coverage, when tests block (R10). |
| `docs/03_Development_Testing/pipeline-guide.md` | Dev/Operator | Phase I/O, gates, W1 order, skip variants. |
| `docs/03_Development_Testing/contributing.md` | Developer | Contribution workflow, PR process, code review, commit conventions. |
| `docs/03_Development_Testing/error-codes.md` | Developer/Operator | Catalog of error codes, meanings, root causes, and remediation steps. |
| `docs/04_Operations_Maintenance/runbook.md` | Operator | Day-2 ops, run variants, backup/restore, incident response. |
| `docs/04_Operations_Maintenance/maint-guide.md` | Maintainer | Upgrades, deprecation, patches, health checks. |
| `docs/04_Operations_Maintenance/mon-alert-guide.md` | Admin/Operator | Read `metrics.db`, SPC reports, audit.log cadence. |
| `docs/04_Operations_Maintenance/tshoot-guide.md` | User + Admin | Common CLI/pipeline errors and their fixes. |
| `docs/04_Operations_Maintenance/backup-recovery.md` | Operator/Maintainer | Backup procedures, recovery point/time objectives, restore drills. |
| `docs/04_Operations_Maintenance/deployment-guide.md` | Operator/DevOps | Deployment strategies, blue-green, canary, rollback procedures. |
| `docs/04_Operations_Maintenance/incident-postmortem-template.md` | Operator/Maintainer | Template for post-incident reviews, root cause analysis, action items. |
| `docs/04_Operations_Maintenance/migration-guide.md` | Operator/Maintainer | Version-to-version migration steps, breaking changes, data migrations. |
| `docs/05_Security_Compliance/sec-hardening.md` | Admin/Security | How R7-R11 gates work + hardening steps. |
| `docs/05_Security_Compliance/compliance.md` | Admin/Security/Compliance | GDPR/HIPAA/PCI DSS/SOX evidence gates, audit trail, data handling. |
| `docs/06_User_Reference/user-guide.md` | End user | Run `/pipeline`, interpret output, quick reference. |
| `docs/06_User_Reference/faq.md` | All | Frequent questions and answers. |
| `docs/06_User_Reference/glossary.md` | All | CMMI/SPC/UCL/LCL/DevSecOps terminology. |
| `docs/06_User_Reference/changelog.md` | All | Versioned changelog with features, fixes, breaking changes. |
| `docs/06_User_Reference/service-level-objectives.md` | Owner/Operator | SLOs, SLIs, error budgets, C4-1 quantitative targets. |
| `docs/06_User_Reference/onboarding-guide.md` | New team members | Step-by-step onboarding for new developers, operators, and admins. |
| `docs/07_Additional_Resources/localization-guide.md` | Developer/Translator | i18n/l10n strategy, locale management, translation workflow. |
| `docs/toctree.md` | All | Table of Contents — navigation hub listing every document in the project as a clickable hyperlink (markdown links in tables + `click href` on every Mermaid node), with descriptions. Generated last so it reflects all other docs. |

### Root templates (scripted by the pipeline, NOT generated here)

`LICENSE`, `CONTRIBUTING.md`, `CODE_OF_CONDUCT.md`, `SECURITY.md`,
`CHANGELOG.md` are copied from `scripts/templates/` by the pipeline
(create-if-missing). The skill must not create or overwrite them.

## Workflow

1. Write `docs/01_Design_Architecture/arch.md` - component/flow diagrams and design decisions.
2. Write `docs/01_Design_Architecture/api-ref.md` - exported functions/classes with signatures and examples.
3. Write `docs/01_Design_Architecture/database-schema.md` - data model and schema documentation.
4. Write `docs/02_Setup_Configuration/setup-guide.md` - install/run instructions.
5. Write `docs/02_Setup_Configuration/docker-image-guide.md` - Docker image build and usage.
6. Write the audience docs for the current pass (each scoped to its concern).
7. Write `docs/toctree.md` — the documentation navigation hub listing every
   markdown document in the project. This file is the equivalent of a Sphinx
   `toctree`: it connects all documents into a navigable tree. Generate it
   in the LAST pass so all other docs already exist on disk.
   **Ordering rules** (for good sequential reading):
   - Three top-level sections in this order: **Policy & Standards**,
     **Implementation Guides**, **Project Metadata**.
- Under Policy & Standards: AGENTS.md, operational-hard-rules.md,
      specs/idea.md, CONTRIBUTING.md, CODE_OF_CONDUCT.md,
      SECURITY.md.
   - Under Implementation Guides: the 7 numbered subfolders in order
     (00 → 07). Within each subfolder list documents in their natural
     reading order (foundational → reference → specialized).
   - Under Project Metadata: README.md, LICENSE, CHANGELOG.md.
   **Mermaid diagrams** (mandatory): include TWO diagrams at the top (after
   the intro paragraph, before the first section):
   1. **Document Hierarchy** — a `flowchart TD` showing the parent-child
      relationship: root → section → subfolder → individual documents as
      leaf nodes. Every document must appear.
   2. **Reading Sequence** — a `flowchart LR` showing the recommended
      reading order as a linear `-->` chain. Use one subgraph per section;
      chain documents within each subgraph in reading order, then connect
      the last document of each section to the first document of the next.
   **Hyperlinks (mandatory)**: EVERY document reference in `toctree.md` must
   be a clickable hyperlink that opens the file — never plain text, never a
   bare path. All paths are relative to `docs/toctree.md`.
   - **Description tables**: use markdown link syntax —
     `[filename](relative/path/to/file.md)`.
   - **Mermaid diagram nodes**: add a `click <nodeId> href "<relative-path>"`
     line for every document leaf node (omit section/subfolder container
     nodes that are not files). Group them under a
     `%% Clickable hyperlinks` comment at the end of each diagram. Example:
     `click PRD href "00_Planning_Requirements/prd.md"` and
     `click AGENTS href "../AGENTS.md"`.
   - Caption each diagram noting its nodes are clickable.
8. Update root `README.md` - badges, quick start, structure, requirements table, and the Documentation table listing every doc.

## On-Demand: Standard Operating Procedures (SOP)

Triggered by `/pipeline sops` (pipeline flag `--sops`). This does NOT run
the full pipeline — it generates SOPs only.

### SOP Generation Workflow

1. Create `docs/04_Operations_Maintenance/SOP/` if it does not exist.
2. Analyze the project's existing `src/`, `specs/`, and
   `docs/04_Operations_Maintenance/` (runbook.md, maint-guide.md,
   deployment-guide.md, backup-recovery.md, etc.) to identify the real
   operational procedures this project needs.
3. Generate one `sop-<topic>.md` file per procedure. Typical SOPs:
   - `sop-deployment.md` — deploy a new release
   - `sop-backup-restore.md` — backup and restore data
   - `sop-incident-response.md` — respond to a production incident
   - `sop-monitoring.md` — set up / interpret monitoring and alerts
   - `sop-security-audit.md` — run security audit gates
   - `sop-release.md` — cut and publish a release
   - `sop-config-change.md` — change configuration safely
   - `sop-disaster-recovery.md` — recover from a disaster
4. Each SOP file MUST include these sections:
   1. **Purpose** — what this SOP covers and why
   2. **Scope** — what systems/services/teams are involved
   3. **Prerequisites** — access, tools, env vars, approvals needed
   4. **Procedure** — numbered step-by-step instructions (the core)
   5. **Verification** — how to confirm the procedure succeeded
   6. **Rollback / Contingency** — what to do if something goes wrong
   7. **References** — links to related docs (runbook, arch, etc.)
5. Embed Mermaid `flowchart` diagrams where a visual procedure aids
   understanding.
6. Do NOT duplicate content from existing docs — SOPs are focused,
   step-by-step procedural checklists that an on-call engineer can follow
   under pressure.
7. Update `docs/toctree.md`:
   - Add an **SOP (On-Demand)** subsection under **04 — Operations &
     Maintenance** listing every `sop-*.md` file generated, each as a
     clickable markdown hyperlink `[sop-<topic>.md](04_Operations_Maintenance/SOP/sop-<topic>.md)`.
   - Add the new SOP nodes to **both** Mermaid diagrams:
     - Document Hierarchy: SOP files as children of `S04`
     - Reading Sequence: SOP files chained after the existing 04 docs
   - Add a `click <sopNodeId> href "04_Operations_Maintenance/SOP/sop-<topic>.md"`
     line for every new SOP node in both diagrams so they stay clickable.

## Diagram Policy (Mermaid / PlantUML / Graphviz)

Embed diagrams in every generated doc wherever a picture beats prose. Choose the
engine by diagram purpose so the markdown renders on GitHub/GitLab/VSCode previews.
Mermaid syntax MUST follow the CURRENT release used by https://mermaid.live
(Mermaid v11.16.x). Both canonical and `-beta` keyword forms are accepted
(`xychart` / `xychart-beta`, `block` / `block-beta`, etc.). All diagrams are
validated by `scripts/validate-mermaid.js` (R10 gate). Disallowed types:
`gantt`, `journey`, `gitGraph`, `cynefin-beta`, `mindmap`, `venn`, `packet`,
`radar`, `treemap`, `wardley` (use `timeline` or `flowchart` instead).

| Purpose | Engine | Example block |
| :--- | :--- | :--- |
| Flowcharts / process flows | **Mermaid** (default) | ` ```mermaid\nflowchart TD\n...\n``` ` |
| Sequence / interaction | **Mermaid** `sequenceDiagram` | ` ```mermaid\nsequenceDiagram\n...\n``` ` |
| Class / object model | **Mermaid** `classDiagram` | ` ```mermaid\nclassDiagram\nclass X {}\n``` ` |
| State machines | **Mermaid** `stateDiagram-v2` | ` ```mermaid\nstateDiagram-v2\n...\n``` ` |
| Entity-relationship / data model | **Mermaid** `erDiagram` | ` ```mermaid\nerDiagram\n...\n``` ` |
| Architecture / C4 (system, container, component) | **Mermaid** `architecture-beta` or `C4Context` | ` ```mermaid\narchitecture-beta\n...\n``` ` |
| Block / system-boundary composition | **Mermaid** `block` | ` ```mermaid\nblock\n...\n``` ` |
| Kanban / work pipeline | **Mermaid** `kanban` | ` ```mermaid\nkanban\n...\n``` ` |
| Root-cause analysis (fishbone) | **Mermaid** `ishikawa` | ` ```mermaid\nishikawa\n...\n``` ` |
| Event modeling (event-driven systems) | **Mermaid** `eventmodeling` | ` ```mermaid\neventmodeling\n...\n``` ` |
| Timelines / milestones | **Mermaid** `timeline` | ` ```mermaid\ntimeline\n...\n``` ` |
| Flow / proportion charts | **Mermaid** `pie` / `quadrantChart` / `sankey` | ` ```mermaid\npie\n...\n``` ` |
| Requirements traceability | **Mermaid** `requirementDiagram` | ` ```mermaid\nrequirementDiagram\n...\n``` ` |
| Rich UML (class/component/use-case beyond Mermaid) | **PlantUML** `@startuml` | ` ```plantuml\n@startuml\nclass X {}\n@enduml\n``` ` |
| Complex dependency / layout graphs | **Graphviz** `digraph` | ` ```dot\ndigraph G { A -> B }\n``` ` |
| Numeric time-series / charts | **Mermaid** `xychart` | ` ```mermaid\nxychart\n...\n``` ` |

Rules:
1. Use Mermaid by default (prefer the type that matches the content); fall back to
   PlantUML (`plantuml` fence) or Graphviz (`dot` fence) only when the diagram type
   is not expressible in Mermaid.
2. Always caption the diagram with a short line above it (e.g. `Figure 1 - ...`).
3. Keep each diagram focused (<= ~15 nodes); split large models into multiple diagrams.
4. Verify the fence language matches the engine (`mermaid`, `plantuml`, or `dot`).
5. `docs/01_Design_Architecture/arch.md` MUST contain at least a high-level flow diagram and a
   component diagram of the `src/` layer.

## Outputs

- `docs/01_Design_Architecture/arch.md`, `api-ref.md`, `database-schema.md`
- `docs/02_Setup_Configuration/setup-guide.md`, `docker-image-guide.md`, `admin-guide.md`, `config-guide.md`
- `docs/03_Development_Testing/dev-guide.md`, `test-guide.md`, `pipeline-guide.md`, `contributing.md`, `error-codes.md`
- `docs/04_Operations_Maintenance/runbook.md`, `maint-guide.md`, `mon-alert-guide.md`, `tshoot-guide.md`, `backup-recovery.md`, `deployment-guide.md`, `incident-postmortem-template.md`, `migration-guide.md`
- `docs/05_Security_Compliance/sec-hardening.md`, `compliance.md`
- `docs/06_User_Reference/user-guide.md`, `faq.md`, `glossary.md`, `changelog.md`, `service-level-objectives.md`, `onboarding-guide.md`
- `docs/07_Additional_Resources/localization-guide.md`
- `docs/toctree.md`
- `docs/00_Planning_Requirements/roadmap.md`
- `docs/01_Design_Architecture/adr.md`
- `README.md` (updated)
- Root templates (`LICENSE`, `CONTRIBUTING.md`, `CODE_OF_CONDUCT.md`,
  `SECURITY.md`, `CHANGELOG.md`) are scripted by the pipeline, not this skill.

## Acceptance Criteria

- Files written to disk via the write tool.
- Content matches actual `src/` exports.
- Every audience doc is scoped to its concern (no duplicated content).
- No tool-call JSON printed; no summary-only output.

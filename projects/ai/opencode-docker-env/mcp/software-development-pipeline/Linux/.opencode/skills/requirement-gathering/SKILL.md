---
name: requirement-gathering
description: Use when gathering and clarifying software requirements for the CMMI Level 4 pipeline. Produces Class 1 artifacts: docs/00_Planning_Requirements/prd.md, docs/00_Planning_Requirements/srs.md, docs/00_Planning_Requirements/stories.md, and docs/01_Design_Architecture/tech-design.md.
---

# requirement-gathering Skill

## Purpose
Produce Class 1 (Business/Requirements) artifacts for the CMMI Level 4 pipeline: `docs/00_Planning_Requirements/prd.md`, `docs/00_Planning_Requirements/srs.md`, `docs/00_Planning_Requirements/stories.md`, `docs/01_Design_Architecture/tech-design.md`.

## Inputs
- User need or feature request
- `AGENTS.md` requirements (R1-R13, C4-1..C4-5)
- `opencode.project.md` (SSOT) when present — its full content is injected; when
  present, `src/` is the ROOT DIRECTORY of the codebase it describes

## Workflow
1. Clarify the requirement with the stakeholder (R1).
2. Write `docs/00_Planning_Requirements/prd.md` - product vision, goals, feature requirements.
3. Write `docs/00_Planning_Requirements/srs.md` - functional/non-functional requirements with traceability IDs (FR-xxx, Rxx).
   Include a §6 Traceability table with columns: `| Requirement ID | Source ID | Artifact | Status |`
   where Artifact is a file path, glob (e.g. `docs/00_Planning_Requirements/*.md`), directory ref (e.g. `src/, __tests__/`),
   comma/`+`-separated list, or conceptual phrase (e.g. `security gates`). This table is parsed
   automatically by `scripts/generate-rtm.js` (R20) to verify all declared artifacts exist on disk.
4. Write `docs/00_Planning_Requirements/stories.md` - user stories mapped to FRs.
5. Write `docs/01_Design_Architecture/tech-design.md` - architecture and component design. When an SSOT
   is present, mirror its Repository Layout exactly and treat `src/` as the ROOT
   DIRECTORY of the codebase in every path reference.

## Diagram Policy (Mermaid / PlantUML / Graphviz)
Embed diagrams in every generated spec wherever a picture beats prose. Choose the
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
| Numeric time-series / charts | **Mermaid** `xychart` | ` ```mermaid\nxychart\n...\n``` ` |
| Rich UML (class/component/use-case beyond Mermaid) | **PlantUML** `@startuml` | ` ```plantuml\n@startuml\nclass X {}\n@enduml\n``` ` |
| Complex dependency / layout graphs | **Graphviz** `digraph` | ` ```dot\ndigraph G { A -> B }\n``` ` |

Rules:
1. Use Mermaid by default (prefer the type that matches the content); fall back to
   PlantUML (`plantuml` fence) or Graphviz (`dot` fence) only when the diagram type
   is not expressible in Mermaid.
2. Always caption the diagram with a short line above it (e.g. `Figure 1 - ...`).
3. Keep each diagram focused (<= ~15 nodes); split large models into multiple diagrams.
4. Verify the fence language matches the engine (`mermaid`, `plantuml`, or `dot`).
5. `docs/01_Design_Architecture/tech-design.md` MUST contain at least a component diagram and a sequence
   diagram of the primary flow.

## Outputs
- `docs/00_Planning_Requirements/prd.md`
- `docs/00_Planning_Requirements/srs.md`
- `docs/00_Planning_Requirements/stories.md`
- `docs/01_Design_Architecture/tech-design.md`

## Acceptance Criteria
- All four files written to disk via the write tool.
- Each file references the relevant requirement IDs (R1-R13).
- No tool-call JSON printed; no summary-only output.

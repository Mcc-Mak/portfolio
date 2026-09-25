---
name: requirement-gathering
description: Use when gathering and clarifying software requirements for the CMMI Level 4 pipeline. Produces Class 1 artifacts: specs/PRD.md, specs/SRS.md, specs/User-Stories.md, and specs/Technical-Design.md.
---

# requirement-gathering Skill

## Purpose
Produce Class 1 (Business/Requirements) artifacts for the CMMI Level 4 pipeline: `specs/PRD.md`, `specs/SRS.md`, `specs/User-Stories.md`, `specs/Technical-Design.md`.

## Inputs
- User need or feature request
- `AGENTS.md` requirements (R1-R13, C4-1..C4-5)

## Workflow
1. Clarify the requirement with the stakeholder (R1).
2. Write `specs/PRD.md` - product vision, goals, feature requirements.
3. Write `specs/SRS.md` - functional/non-functional requirements with traceability IDs (FR-xxx, Rxx).
4. Write `specs/User-Stories.md` - user stories mapped to FRs.
5. Write `specs/Technical-Design.md` - architecture and component design.

## Diagram Policy (Mermaid / PlantUML / Graphviz)
Embed diagrams in every generated spec wherever a picture beats prose. Choose the
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

Rules:
1. Use Mermaid by default (prefer the type that matches the content); fall back to
   PlantUML (`plantuml` fence) or Graphviz (`dot` fence) only when the diagram type
   is not expressible in Mermaid.
2. Always caption the diagram with a short line above it (e.g. `Figure 1 - ...`).
3. Keep each diagram focused (<= ~15 nodes); split large models into multiple diagrams.
4. Verify the fence language matches the engine (`mermaid`, `plantuml`, or `dot`).
5. `Technical-Design.md` MUST contain at least a component diagram and a sequence
   diagram of the primary flow.

## Outputs
- `specs/PRD.md`
- `specs/SRS.md`
- `specs/User-Stories.md`
- `specs/Technical-Design.md`

## Acceptance Criteria
- All four files written to disk via the write tool.
- Each file references the relevant requirement IDs (R1-R13).
- No tool-call JSON printed; no summary-only output.

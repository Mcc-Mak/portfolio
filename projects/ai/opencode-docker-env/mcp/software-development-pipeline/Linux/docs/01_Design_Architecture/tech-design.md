# Technical Design Document (tech-design.md)

**Product:** CMMI Level 4 OpenCode DevSecOps Pipeline (Linux Edition)
**Version:** 1.0.0
**Status:** Draft
**Skill:** requirement-gathering (R1) / speckit.plan · **Classifier:** Class 2 (Technical Design)
**Parent:** `docs/00_Planning_Requirements/srs.md`

> This document contains the mandatory **component diagram** and **sequence
> diagram of the primary flow** (skill Diagram Policy §5). All diagrams use
> Mermaid v11.16.x syntax (validated by `scripts/validate-mermaid.js`, R10).
> Mermaid is used by default; PlantUML / Graphviz are used only where a diagram
> type is not expressible in Mermaid.

---

## 1. Overview

The pipeline is a layered Node.js system orchestrated by OpenCode. A single
shell orchestrator enforces workflow order (W1), invokes skills for Class 1–5
artifact production, runs DevSecOps gates (R7–R11, R16–R19), and records
quantitative metrics (C4-2–C4-5). Everything is deployed globally to
`~/.config/opencode/` (R14).

## 2. Architecture Principles

1. **Single Entry Point (R5)** — all flows start at `npm run pipeline`.
2. **Strict Order (W1)** — Requirements → Coding → DevSecOps → Documentation.
3. **Mandatory Gates (R10)** — any gate error fails the build.
4. **Free/Local-First (R6)** — Node.js LTS, ESLint, Jest, sqlite3, mathjs,
   regression, Ollama, OWASP ZAP.
5. **Import-Safety (C4-6)** — every `tools/*.js` is side-effect-free on import.
6. **Single Source of Truth (R14)** — global `~/.config/opencode/` mirrors the
   project tree.

## 3. Repository Layout (mirrored globally)

| Path | Purpose |
| :--- | :--- |
| `AGENTS.md` | Project charter (R12) |
| `.opencode/skills/*/SKILL.md` | Skills (R13) |
| `.opencode/rules/operational-hard-rules.md` | R14/R15 hard rules |
| `.opencode/commands/pipeline.md` | `/pipeline` command |
| `scripts/` | Pipeline + DevSecOps + analytics scripts |
| `tools/reqmind.js` | Requirements-mind CLI (import-safe) |
| `src/`, `__tests__/` | Source and Jest tests (R2) |
| `docs/`, `specs/` | Class 1–5 documentation |
| `metrics/`, `logs/` | Metrics DB, audit log, gate reports |

## 4. Component Design

### 4.1 Component Diagram (mandatory)

Figure 1 - Component diagram of the pipeline.

```mermaid
architecture-beta
    group user[User Layer]
    service ua[Developer / Analyst / QM] in user
    group cli[Entry Layer]
    service oc[OpenCode CLI] in cli
    service sh[opencode-pipeline.sh\norchestrator] in cli

    group skills[Skills Layer]
    service rq[requirement-gathering] in skills
    service sc[secure-coding] in skills
    service dg[doc-generation] in skills
    service cm[cmmi-analytics] in skills

    group gates[DevSecOps Gate Layer]
    service sast[ESLint SAST R8] in gates
    service sca[npm audit SCA R9] in gates
    service dast[OWASP ZAP DAST R19] in gates
    service cmp[compliance-check R16] in gates
    service thr[threat-model R17] in gates
    service ntf[notify R18] in gates

    group ana[Analytics Layer]
    service met[collect-metrics C4-2] in ana
    service spc[spc-control C4-3] in ana
    service prd[predict-readiness C4-4/5] in ana

    group trace[Traceability Layer]
    service rtm[generate-rtm R20] in trace
    service log[logs/audit.log R11] in trace

    database DB[(metrics/metrics.db)]

    ua:B --> oc:T
    oc:B --> sh:T
    sh:B --> rq:T
    sh:B --> sc:T
    sh:B --> dg:T
    sh:B --> cm:T
    sh:B --> sast:T
    sh:B --> sca:T
    sh:B --> dast:T
    sh:B --> cmp:T
    sh:B --> thr:T
    sh:B --> ntf:T
    sh:B --> met:T
    sh:B --> spc:T
    sh:B --> prd:T
    sh:B --> rtm:T
    sh:B --> log:T
    met:R --> DB:L
    spc:R --> DB:L
    prd:R --> DB:L
    cm:R --> DB:L
```

### 4.2 Component Responsibilities

| Component | Responsibility | Requirement |
| :--- | :--- | :--- |
| `opencode-pipeline.sh` | Enforce W1 order, invoke skills/gates, fail on error | W1, R5, R10 |
| `requirement-gathering` | Produce PRD, SRS, stories | R1 |
| `secure-coding` | OWASP-compliant `src/` + tests | R2, R8 |
| `doc-generation` | Produce Class 2/5 docs | R3 |
| `cmmi-analytics` | Drive C4-2–C4-5 scripts | C4-2–C4-5 |
| ESLint gate | SAST | R8 |
| npm audit gate | SCA | R9 |
| compliance-check.js | GDPR/HIPAA/PCI DSS/SOX evidence | R16 |
| threat-model.js | npm audit + OSV.dev CVSS, OWASP | R17 |
| dast-scan.js | OWASP ZAP DAST; warn+block if none | R19 |
| notify.js | Telegram notifications (env-only) | R18 |
| collect-metrics.js | Seed `metrics/metrics.db` | C4-2 |
| spc-control.js | 3-sigma UCL/LCL; block on UCL breach | C4-3 |
| predict-readiness.js | Regression prediction + auto-remediation | C4-4, C4-5 |
| generate-rtm.js | `docs/00_Planning_Requirements/rtm.md`; block on broken links | R20 |
| deploy-global.sh | Mirror to `~/.config/opencode/`; guard import-safe tools | R14, C4-6 |

## 5. Sequence Diagram — Primary Flow (mandatory)

Figure 2 - Sequence diagram of the primary pipeline flow.

```mermaid
sequenceDiagram
    autonumber
    actor U as Developer / Analyst
    participant OC as OpenCode CLI
    participant SH as opencode-pipeline.sh
    participant SK as Skills (req / secure-coding / doc)
    participant G as DevSecOps Gates
    participant A as Analytics (metrics / spc / predict)
    participant DB as metrics/metrics.db
    participant LOG as logs/audit.log
    participant RTM as generate-rtm

    U->>OC: npm run pipeline
    OC->>SH: execute orchestrator (R5)
    SH->>SH: enforce W1 order (Requirements → Coding → DevSecOps → Documentation)
    SH->>SK: run requirement-gathering
    SK-->>SH: prd.md, srs.md, stories.md, tech-design.md
    SH->>SK: run secure-coding
    SK-->>SH: src/, __tests__/
    SH->>G: SAST (ESLint) R8
    G-->>SH: PASS / FAIL
    SH->>G: SCA (npm audit) R9
    G-->>SH: PASS / FAIL
    SH->>G: compliance / threat-model / DAST (R16, R17, R19)
    G-->>SH: PASS / FAIL (R10 blocks on error)
    SH->>A: collect-metrics (C4-2)
    A->>DB: write build metrics
    SH->>A: spc-control (C4-3)
    A-->>SH: UCL/LCL verdict (block merge if UCL breached)
    SH->>A: predict-readiness (C4-4/5)
    A-->>SH: readiness + auto-remediation
    SH->>RTM: generate-rtm (R20)
    RTM-->>SH: docs/00_Planning_Requirements/rtm.md (block on broken links)
    SH->>LOG: append gate results (R11)
    SH-->>OC: aggregate status
    OC-->>U: PASS (or BLOCKED with reasons)
```

## 6. Data Model

### 6.1 Entity-Relationship Model

Figure 3 - Entity-relationship diagram of `metrics/metrics.db`.

```mermaid
erDiagram
    BUILD ||--o{ METRIC : "records"
    BUILD ||--o{ GATE_RESULT : "reports"
    BUILD {
        integer build_id PK
        timestamp started_at
        timestamp finished_at
        integer cycle_time_s
        string status
    }
    METRIC {
        integer metric_id PK
        integer build_id FK
        string name
        real value
        integer loc
        integer defect_count
    }
    GATE_RESULT {
        integer result_id PK
        integer build_id FK
        string gate
        string outcome
        timestamp ran_at
    }
```

### 6.2 Build Class Model

Figure 4 - Class diagram of the build/analytics domain.

```mermaid
classDiagram
    class Build {
        +int build_id
        +date started_at
        +date finished_at
        +int cycle_time_s
        +string status
        +addMetric(name, value) void
        +recordGate(gate, outcome) void
    }
    class Metric {
        +int metric_id
        +string name
        +real value
        +int loc
        +int defect_count
    }
    class GateResult {
        +int result_id
        +string gate
        +string outcome
        +date ran_at
    }
    class SpcControl {
        +real mean
        +real sigma
        +real ucl
        +real lcl
        +isInControl() bool
    }
    class Readiness {
        +real score
        +string recommendation
        +remediate() string
    }
    Build "1" --> "0..*" Metric
    Build "1" --> "0..*" GateResult
    SpcControl ..> Metric : reads defect density
    Readiness ..> Build : predicts trend
```

## 7. State Machine — Pipeline Run

Figure 5 - State diagram of a pipeline run.

```mermaid
stateDiagram-v2
    [*] --> Requirements
    Requirements --> Coding: W1 order enforced
    Coding --> DevSecOps
    DevSecOps --> Documentation: all gates PASS (R10)
    DevSecOps --> Failed: any gate FAIL (R10)
    Documentation --> Measured: collect-metrics (C4-2)
    Measured --> [*]: spc/predict complete
    Failed --> [*]
```

## 8. Deployment

Figure 6 - Deployment of resources to the global config (R14).

```mermaid
flowchart LR
    SRC[/project source/] --> DEP[scripts/deploy-global.sh]
    DEP -->|mirror| GLB[~/.config/opencode/]
    DEP -->|guard import-safe| TOOL[tools/reqmind.js]
    DEP -->|record| LOG[logs/audit.log]
    GLB --> OC2[opencode restart loads global config]
```

- Run `npm run deploy` after every resource change (R14).
- Never hand-edit global files (R14 enforcement #1).

## 9. Security & Import-Safety Considerations

- **C4-6:** every `.js` in `tools/` must be import-safe (guard CLI with
  `if (require.main === module)` or export `tool()` from `@opencode-ai/plugin`);
  `deploy-global.sh` refuses non-safe files (R10).
- **R2:** no hardcoded secrets, no `eval`, input validation in `src/`.
- **R18:** notifications read secrets from environment variables only.

Figure 7 - Import-safety decision flow for `tools/*.js` (C4-6).

```mermaid
flowchart TD
    JS["tools/*.js"] --> SAFE{"Import-safe?<br/>require.main guard or<br/>tool() export"}
    SAFE -->|yes| DEP2["deploy-global.sh mirrors to global"]
    SAFE -->|no| BLOCK["BLOCKED - R10 defensive failure"]
    BLOCK --> FIX["Fix: add require.main guard<br/>or export tool()"]
    FIX --> SAFE
```

## 10. Validation / Diagram Verification

All Mermaid diagrams in this document are validated by
`scripts/validate-mermaid.js` (R10 gate). The current release target is the
Mermaid version embedded in https://mermaid.live (v11.16.x); both canonical and
`-beta` keyword forms are accepted by the validator. Diagram types used here and
their status:

| Diagram | Type | Line | Validated |
| :--- | :--- | :--- | :--- |
| Figure 1 | `architecture-beta` | `tech-design.md:56` | ✓ |
| Figure 2 | `sequenceDiagram` | `tech-design.md:137` | ✓ |
| Figure 3 | `erDiagram` | `tech-design.md:182` | ✓ |
| Figure 4 | `classDiagram` | `tech-design.md:214` | ✓ |
| Figure 5 | `stateDiagram-v2` | `tech-design.md:260` | ✓ |
| Figure 6 | `flowchart` | `tech-design.md:276` | ✓ |
| Figure 7 | `flowchart` | `tech-design.md:298` | ✓ |

## 11. Acceptance Criteria

- [x] Component diagram present (Figure 1).
- [x] Sequence diagram of primary flow present (Figure 2).
- [x] All Mermaid diagrams validate under `scripts/validate-mermaid.js` (R10).
- [x] PlantUML / Graphviz used only where Mermaid cannot express the diagram.
- [x] Artifacts referenced in SRS §6 exist on disk (verified by `generate-rtm.js`, R20).

---

_Generated by the `requirement-gathering` skill. References: R1–R20, W1, C4-1–C4-6._
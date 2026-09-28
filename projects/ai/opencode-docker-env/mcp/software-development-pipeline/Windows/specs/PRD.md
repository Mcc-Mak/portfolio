# Product Requirements Document - CMMI Level 4 OpenCode DevSecOps Pipeline

**Status**: Approved
**Date**: 2026-08-09
**Author**: ProductTeam Plugin + Requirement Clarification (R1)

## 1. Executive Summary

A quantitatively managed software development pipeline using OpenCode as the
single entry point (R5). It enforces the strict workflow order (W1):
Requirements -> Coding -> DevSecOps -> Documentation, with mandatory SAST/SCA
security gates (R8, R9), fail-on-error blocking (R10), statistical process
control with 3-sigma UCL/LCL (C4-3), readiness prediction with
auto-remediation (C4-4, C4-5), and full timestamped audit traceability (R11).

Figure 1 - Pipeline workflow overview (W1)

```mermaid
flowchart TD
    A[User invokes `opencode run` / npm run pipeline] --> B[Phase 1: Requirements<br/>requirement-gathering skill]
    B --> C[Phase 2: Coding<br/>secure-coding skill]
    C --> D[Phase 3: DevSecOps<br/>SAST R8 / SCA R9 / fail-on-error R10]
    D -->|gates pass| E[Phase 4: Documentation<br/>doc-generation skill]
    D -->|gate fails| F[BLOCK merge + audit.log entry]
    E --> G[C4-2 collect-metrics.js]
    G --> H[C4-3 spc-control.js]
    H --> I[C4-4/5 predict-readiness.js]
    I --> J[spc-report.md + readiness + remediation plan]
```

## 2. Problem Statement

- Teams produce requirements, code, security verification, and documentation in
  ad-hoc order with no enforced workflow (W1 violation).
- Security checks are optional, so critical and high-severity defects ship
  without a blocking gate (R7-R10 not enforced).
- No quantitative measurement of process stability means teams cannot demonstrate
  CMMI Level 4 (Quantitatively Managed) maturity (C4-1 not measurable).
- Process trends degrade silently; there is no early-warning or proactive
  remediation mechanism (C4-5 missing).

## 3. Goals & Non-Goals

### Goals

- G1: Provide a single entry point (`opencode run`) for all pipeline activity (R5).
- G2: Enforce the four-phase workflow order and block out-of-order execution (W1).
- G3: Make security gates R7-R10 mandatory and fail the build on any violation.
- G4: Collect per-build metrics and apply 3-sigma statistical process control (C4-1..3).
- G5: Predict release readiness and auto-generate remediation plans (C4-4, C4-5).
- G6: Keep full, timestamped audit traceability (R11).
- G7: Use only free, local-first, open-source tooling (R6).
- G8: Maintain separation of concerns across three independent skills plus `AGENTS.md` (R4).
- G9: Keep requirements, design, source, and documentation artifacts in their
  own classes with documented tool-to-path-to-file mappings (R4/R12/R13).

### Non-Goals

- No cloud-hosted CI/CD integration or remote model APIs.
- No GUI dashboard (SPC reports are Markdown/text artifacts).
- No deployment to production environments; pipeline targets local builds.
- No support for non-Windows hosts in this release.

## 4. User Stories

See `specs/User-Stories.md` for the full story set mapped to functional
requirements.

Figure 2 - Persona-to-phase ownership

```mermaid
flowchart LR
    PO[Product Owner] -->|authors idea / validates| P1[Phase 1 Requirements]
    DEV[Developer] -->|writes OWASP-compliant code + tests| P2[Phase 2 Coding]
    SEC[Security Engineer] -->|reviews gates| P3[Phase 3 DevSecOps]
    PM[Project Manager] -->|reviews SPC + readiness| P4[Analytics C4-2..4-5]
```

## 5. Functional Requirements

| ID | Requirement | Source |
| :--- | :--- | :--- |
| FR-001 | Single entry point via `opencode run` | R5 |
| FR-002 | Strict workflow order enforcement | W1 |
| FR-003 | Separation of concerns: three skills + AGENTS.md | R4 |
| FR-004 | Requirement clarification producing four Class 1 documents | R1 |
| FR-005 | AI coding with OWASP-compliant output and tests | R2 |
| FR-006 | Documentation generation after security gates pass | R3 |
| FR-007 | Runtime protection checks in the pipeline | R7 |
| FR-008 | ESLint SAST gate | R8 |
| FR-009 | `npm audit` SCA gate | R9 |
| FR-010 | Mandatory fail-on-error gate | R10 |
| FR-011 | Audit log traceability | R11 |
| FR-012 | `AGENTS.md` process control rules artifact | R12 |
| FR-013 | `SKILL.md` per skill artifact | R13 |
| FR-014..017 | Metrics collection, SPC, prediction, auto-remediation | C4-2..C4-5 |
| FR-018 | Pipeline blocks merge when defect density exceeds the UCL | C4-3/R10 |

Full detail and traceability: `specs/SRS.md`.

Figure 3 - FR-to-source traceability

```mermaid
flowchart LR
    subgraph Sources
        R5[R5 Entry] & W1[W1 Order] & R4[R4 SoC] & R1[R1 Clarify]
        R2[R2 AI Coding] & R3[R3 Docs] & R7[R7 Runtime] & R8[R8 SAST]
        R9[R9 SCA] & R10[R10 Gate] & R11[R11 Audit] & R12[R12 AGENTS.md]
        R13[R13 SKILL.md] & C42[C4-2..4-5 Metrics]
    end
    R5 --> FR001[FR-001]
    W1 --> FR002[FR-002]
    R4 --> FR003[FR-003]
    R1 --> FR004[FR-004]
    R2 --> FR005[FR-005]
    R3 --> FR006[FR-006]
    R7 --> FR007[FR-007]
    R8 --> FR008[FR-008]
    R9 --> FR009[FR-009]
    R10 --> FR010[FR-010]
    R11 --> FR011[FR-011]
    R12 --> FR012[FR-012]
    R13 --> FR013[FR-013]
    C42 --> FR014[FR-014..017]
    R10 --> FR018[FR-018]
```

## 6. Success Metrics

| Metric | Target | Source |
| :--- | :--- | :--- |
| Defect Density (Critical+High/KLOC) | <= 0.5 | C4-1 |
| Build Stability (rolling 10 builds) | >= 98% | C4-1 |
| Cycle Time Stability (std dev) | < 2 minutes | C4-1 |
| Mandatory gates enforced (R7-R11) | 100% | R7-R11 |

Figure 4 - Statistical process control decision (C4-3/R10)

```mermaid
stateDiagram-v2
    [*] --> Collecting: collect-metrics.js
    Collecting --> Computing: spc-control.js
    Computing --> InControl: density <= UCL
    Computing --> OutOfControl: density > UCL
    InControl --> [*]: merge allowed
    OutOfControl --> Blocked: R10 gate
    Blocked --> [*]: BLOCK MERGE + remediation
```

## 7. Open Questions

- Which severity levels (low/informational) should be non-blocking in audit?
- Should metrics use a rolling window for prediction beyond defect density?
- Model selection: `qwen2.5-coder:7b` confirmed; alternative local models to test?

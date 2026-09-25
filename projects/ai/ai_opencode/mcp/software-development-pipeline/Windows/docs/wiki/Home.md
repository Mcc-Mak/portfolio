# CMMI Level 4 OpenCode DevSecOps Pipeline — Wiki Home

Welcome to the project wiki for the CMMI Level 4 (Quantitatively Managed)
OpenCode DevSecOps pipeline.

## Getting started

- [Architecture](Architecture)
- [Setup Guide](../Setup-Guide)
- [API Reference](../API-Reference)
- [README](../../README)

## What is this project?

A Windows-native software delivery pipeline that:

- Uses OpenCode (`opencode run`) as the single entry point (R5).
- Enforces the strict order Requirements -> Coding -> DevSecOps ->
  Documentation (W1).
- Runs mandatory SAST/SCA gates with fail-on-error blocking (R7-R10).
- Collects per-build metrics and applies 3-sigma statistical process control
  (C4-1..3).
- Predicts readiness and auto-generates remediation plans (C4-4/5).
- Keeps full audit traceability (R11).
- Uses only free, local-first, open-source tooling (R6).

## Quantitative goals (C4-1)

| Metric | Target |
| :--- | :--- |
| Defect Density (Critical+High/KLOC) | <= 0.5 |
| Build Stability (rolling 10 builds) | >= 98% |
| Cycle Time Stability (std dev) | < 2 minutes |

## How a build flows

1. **Phase 1 (Requirements)** — `requirement-gathering` skill writes Class 1
   files into `specs/`.
2. **Phase 2 (Coding)** — `secure-coding` skill writes `src/` and `__tests__/`.
3. **Phase 3 (DevSecOps)** — R7 runtime checks, R8 ESLint, R9 npm audit,
   Jest, then C4-2/C4-3/C4-4 analytics. Any failure blocks the merge (R10).
4. **Phase 4 (Docs)** — `doc-generation` skill writes this wiki and the docs.

## Artifacts by class

| Class | Directory | Artifacts |
| :--- | :--- | :--- |
| Class 1 | `specs/` | PRD, SRS, User-Stories, Technical-Design |
| Class 2 | `specs/`, `docs/` | Technical-Design, architecture |
| Class 3 | `src/`, `__tests__/` | Source, tests |
| Class 4 | `metrics/`, `logs/` | metrics.db, audit.log, spc-report.md |
| Class 5 | `docs/`, root | README, API-Reference, Setup-Guide, wiki |

## Security gates

| Gate | Tool | Outcome on failure |
| :--- | :--- | :--- |
| R7 Runtime protection | Pipeline checks | BLOCKED (R10), exit 1 |
| R8 SAST | ESLint | BLOCKED (R10), exit 1 |
| R9 SCA | npm audit | BLOCKED (R10), exit 1 |
| R10 Gate | Fail-on-error | Blocks merge |

## Statistical process control

Defect density = `(critical + high) / (loc / 1000)`.

`UCL = mean + 3*stdev`, `LCL = max(0, mean - 3*stdev)`. Density above UCL
blocks the build; a predicted density above the goal triggers an
auto-generated remediation plan (C4-5).

## Related

- [API Reference](../API-Reference) — function signatures and data model
- [Setup Guide](../Setup-Guide) — install and run instructions

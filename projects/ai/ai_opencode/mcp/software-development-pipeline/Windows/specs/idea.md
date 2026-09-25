# CMMI Level 4 OpenCode DevSecOps Pipeline

A quantitatively managed software development pipeline using OpenCode as the
single entry point, with mandatory DevSecOps security gates and statistical
process control.

## Problem Statement

Development teams struggle to demonstrate quantitative process maturity.
Requirements, code, security verification, and documentation are produced in
ad-hoc order with no enforced workflow, no mandatory security gates, and no
measurement of process stability. Teams cannot prove they meet CMMI Level 4
(Quantitatively Managed) objectives.

## Proposed Solution

A Windows-friendly pipeline that:

- Uses OpenCode (`opencode run`) as the single entry point (R5).
- Enforces a strict workflow order (W1): Requirements -> Coding -> DevSecOps ->
  Documentation.
- Runs mandatory security gates: SAST (ESLint), SCA (npm audit), and fail-on-error
  blocking (R8-R10).
- Collects quantitative metrics into `metrics/metrics.db` (C4-2) and applies
  statistical process control with 3-sigma UCL/LCL (C4-3).
- Predicts readiness via linear regression and auto-generates remediation
  plans when trends degrade (C4-4, C4-5).
- Keeps full traceability via `logs/audit.log` (R11).
- Uses only free, local-first, open-source tooling (R6): Node.js LTS, Ollama,
  ESLint, Jest, sqlite3, mathjs, regression.

## Success Metrics

| Metric | Target |
| :--- | :--- |
| Defect Density (Critical+High/KLOC) | <= 0.5 |
| Build Stability (rolling 10 builds) | >= 98% |
| Cycle Time Stability (std dev) | < 2 minutes |
| Mandatory gates (R7-R11) | 100% enforced |

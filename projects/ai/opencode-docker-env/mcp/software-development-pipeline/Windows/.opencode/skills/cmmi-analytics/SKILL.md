---
name: cmmi-analytics
description: Use when running the CMMI Level 4 quantitative analytics gates (C4-2 to C4-5): scripts/collect-metrics.js, scripts/spc-control.js, and scripts/predict-readiness.js. Reads metrics/metrics.db build history and produces SPC and readiness reports.
---

# cmmi-analytics Skill

## Purpose
Run the CMMI Level 4 quantitative analytics gates: `scripts/collect-metrics.js` (C4-2), `scripts/spc-control.js` (C4-3), `scripts/predict-readiness.js` (C4-4/C4-5).

## Inputs
- Source files under `src/`
- `metrics/metrics.db` build history

## Workflow
1. Run `node scripts/collect-metrics.js` to record metrics.
2. Run `node scripts/spc-control.js` to check UCL/LCL control limits.
3. Run `node scripts/predict-readiness.js` to predict release readiness and auto-generate remediation (C4-5).

## Outputs
- `metrics/metrics.db`
- `metrics/spc-report.md`
- Readiness prediction + remediation report

## Diagram Policy (Mermaid)
The generated reports (`metrics/spc-report.md`, readiness prediction) MUST embed a
Mermaid chart so the quantitative data renders visually on GitHub/GitLab/VSCode:

| Purpose | Engine | Example block |
| :--- | :--- | :--- |
| Control chart (density vs UCL/LCL) | **Mermaid** `xychart-beta` | ` ```mermaid\nxychart-beta\n    title "SPC Chart"\n    x-axis "Build"\n    y-axis "Defect Density"\n    line [...] "Density"\n    line [...] "UCL"\n``` ` |
| Prediction / trend line | **Mermaid** `xychart-beta` | line of actual + predicted values |
| Root-cause of out-of-control process | **Mermaid** `ishikawa` | ` ```mermaid\nishikawa\n    title "Defect Density Root Causes"\n    Root Cause Group-->Cause\n``` ` |
| Build cadence | **Mermaid** `gantt` | optional, when a timeline helps |

Rules:
1. Prefer `xychart-beta` for numeric time-series; `gantt` only when a schedule matters.
2. Caption each chart above the fence.
3. If a script cannot emit the chart (e.g. baseline mode), state it in the report.
4. Never put raw metric values in code fences that Mermaid cannot parse (numbers only,
   comma-separated).
5. When an out-of-control remediation is generated (C4-5), embed an `ishikawa`
   root-cause diagram in the remediation report.

## Acceptance Criteria
- Each script exits 0.
- SPC report written; deviations flagged.
- `metrics/spc-report.md` embeds a Mermaid `xychart-beta` control chart.

---
description: Run the CMMI Level 4 DevSecOps pipeline. Usage: /pipeline [noskip|skipdocs|skipsecurity]. Generated markdown (specs/, docs/, metrics/) embeds Mermaid/PlantUML/Graphviz diagrams per the Diagram Policy in each skill. Phase 3 runs 10 DevSecOps gates (R7 runtime, R8 SAST, R9 SCA, R19 DAST, JEST, C4-2/3/4 metrics, R16 compliance, R17 threat model); Phase 4 produces the full document matrix: 5 scripted root templates + 5 core docs + 15 persona/audience docs across 4 focused passes. R18 notification (Telegram) is sent when TELEGRAM_BOT_TOKEN/TELEGRAM_CHAT_ID env vars are set.
agent: build
---

Run the CMMI Level 4 OpenCode DevSecOps pipeline against the CURRENT working
directory (the project). The pipeline "executable" and its dependencies live
in the global opencode config directory: Windows
`%USERPROFILE%\.config\opencode` (e.g. `C:\Users\<user>\.config\opencode`),
i.e. `~/.config/opencode`. The project-wise resources — the project's
`AGENTS.md`, plus `specs\`, `src\`, `__tests__\`, `docs\`, `logs\`, `metrics\`
— are ingested and produced in the current working directory by that
executable.

Subcommand mapping (from $ARGUMENTS):

| Argument | Action |
| :--- | :--- |
| *(none)* | Show this help menu, do NOT run the pipeline |
| `noskip` | Full pipeline (Phases 1-4, all gates) |
| `skipdocs` | Skip Phase 4 (`-SkipDocs`, Phases 1-3) |
| `skipsecurity` | Skip Phase 3 (`-SkipSecurity`, Phases 1, 2, 4) |

Behavior:

1. If $ARGUMENTS is empty, print the help menu below and stop.
2. Otherwise run the globally deployed executable against the current
   working directory (DO NOT simulate - run it).
3. Generated markdown MUST embed diagrams (Mermaid by default, PlantUML or
   Graphviz where the diagram type demands it) per the Diagram Policy in the
   skills: specs/ flowcharts + sequence diagrams, docs/architecture.md flow +
   component diagrams, metrics/spc-report.md xychart control chart.
   - `noskip` →
     `powershell -ExecutionPolicy Bypass -File "$env:USERPROFILE\.config\opencode\scripts\opencode-pipeline.ps1" -ProjectDir (Get-Location)`
   - `skipdocs` → same command plus `-SkipDocs`
   - `skipsecurity` → same command plus `-SkipSecurity`
3. Wait for completion and verify the final success marker in the project's
   `logs\audit.log` (last line must end with `SUCCESS` or the console prints
   `[OK] PIPELINE SUCCESSFUL`).
4. If any gate reports FAIL/BLOCKED, report the failing phase and the
   `logs\audit.log` tail instead of stopping silently.

Help menu:

```
CMMI Level 4 OpenCode DevSecOps Pipeline
Usage: /pipeline <subcommand>

  /pipeline               Show this help menu
  /pipeline noskip        Run the full pipeline (Phases 1-4, all gates)
  /pipeline skipdocs      Run without documentation phase (Phases 1-3)
  /pipeline skipsecurity  Run without security gates (Phases 1, 2, 4)

Project Specification (SSOT):
  Put your requirements in opencode.project.md (the SINGLE SOURCE OF TRUTH).
  When present, its full content is injected into Phases 1/2/4 so specs, code
  and docs match it exactly; when absent the pipeline runs generically.

All generated markdown embeds Mermaid/PlantUML/Graphviz diagrams where
needed (flowcharts, sequence/ER/state diagrams, component graphs, SPC charts).
```

Note: `npm run` on this Windows shell must be invoked as `npm.cmd run ...`
because PowerShell blocks `npm.ps1` under the current execution policy.

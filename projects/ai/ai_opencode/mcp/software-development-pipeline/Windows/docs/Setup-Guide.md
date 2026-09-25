# Setup Guide

**Class**: 5 (Ops/User) | **Target**: Windows 10/11, PowerShell 5.1+

## Prerequisites

| Requirement | Version | Notes |
| :--- | :--- | :--- |
| Node.js | LTS (>= 18) | Install via winget: `winget install OpenJS.NodeJS.LTS` |
| npm | Bundled with Node.js | |
| PowerShell | 5.1+ | Built into Windows |
| opencode CLI | latest | `npm install -g opencode-ai` |
| Ollama | latest | Optional local LLM runtime (R6) |
| LLM model (Ollama) | `qwen2.5-coder:7b` (or `:14b`) | `ollama pull qwen2.5-coder:7b` |
| Execution policy | `RemoteSigned` | `Set-ExecutionPolicy RemoteSigned -Scope CurrentUser -Force` |

The default model is configured in `opencode.jsonc`
(`opencode/deepseek-v4-flash-free`). The Ollama provider is registered with
`qwen2.5-coder:7b` and `qwen2.5-coder:14b` for a local-first fallback.

## 1. Install dependencies

```powershell
npm install
```

Expected result: `found 0 vulnerabilities`.

## 2. Install the toolchain

```powershell
# opencode CLI (single entry point, R5)
npm install -g opencode-ai

# reqmind (local requirements tool, pre-linked as global bin)
npm link
```

## 3. Configure OpenCode

OpenCode auto-loads the project config (`opencode.jsonc`), skills, and
instructions from this repository:

- `opencode.jsonc` — model config, Ollama provider, skills path, instructions
- `.opencode/skills/` — SKILL.md workflows (R13):
  `requirement-gathering`, `secure-coding`, `doc-generation`, `cmmi-analytics`
- `AGENTS.md` — project charter (R12)

For a global install, copy `opencode.jsonc` to `%USERPROFILE%\.config\opencode\`.

**Restart opencode after any change** to `.opencode/` or `opencode.jsonc`
(config loads at startup).

## 4. Verify the environment

```powershell
node --version
opencode --version
ollama list                # optional; expect qwen2.5-coder:7b if using Ollama
reqmind generate -h        # exit 0
```

## 5. Run the pipeline

```powershell
npm run pipeline            # full 4-phase run, all gates
npm run pipeline:skipdocs   # skip Phase 4 (documentation)
npm run pipeline:skipsecurity  # skip Phase 3 (security gates)
```

The pipeline creates `specs/`, `src/`, `__tests__/`, `docs/`, `metrics/`, and
`logs/` automatically. Each phase is enforced in order (W1) and audited to
`logs/audit.log` (R11). Any failing gate blocks the build with exit code 1 (R10).

## 6. Standalone analytics

```powershell
npm run collect-metrics   # record one build (C4-2)
npm run spc               # 3-sigma control report (C4-3)
npm run predict           # readiness forecast + remediation (C4-4/5)
npm run lint              # SAST gate (R8)
npm run test              # Jest coverage
npm run audit             # SCA gate (R9)
```

Note: `spc-control.js` needs at least 5 builds and `predict-readiness.js` at
least 10 builds before producing a full report.

## 7. Using the secure primitives

Phase 2 produces OWASP-aligned helpers under `src/` (auth, access, validate,
sql, url, command, http, cookie, rate, secrets, audit, metrics, spc). See the
[API Reference](API-Reference.md) for signatures and usage.

## Troubleshooting

| Symptom | Fix |
| :--- | :--- |
| `opencode: command not found` | `npm install -g opencode-ai`; ensure `%APPDATA%\npm` is on PATH |
| Scripts blocked by execution policy | `Set-ExecutionPolicy RemoteSigned -Scope CurrentUser -Force` |
| Ollama model missing | `ollama pull qwen2.5-coder:7b` (only if using the Ollama provider) |
| Metrics DB errors | Delete `metrics/metrics.db` and re-run `npm run collect-metrics` |
| Incomplete `security-scan.json` | Ensure `npm audit --json` output is UTF-8 without BOM |
| SAST gate fails | Run `npm run lint` and fix reported warnings/errors |
| `.env` blocks Phase 3 (R7) | Remove `.env` from the working tree and confirm `.gitignore` excludes it |
| opencode crashes at startup | A `tools/*.js` is not import-safe (C4-6); guard CLI entry with `require.main === module` |

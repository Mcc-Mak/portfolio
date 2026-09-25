# Setup Guide

**Class**: 5 (Ops/User) | **Target**: Linux (bash 4+, Node.js LTS)

## Prerequisites

| Requirement | Version | Notes |
| :--- | :--- | :--- |
| Node.js | LTS (>= 18) | Install via nvm: `nvm install --lts` (or your distro's Node package) |
| npm | Bundled with Node.js | |
| bash | 4+ | Built into the Linux shell |
| opencode CLI | latest | `npm install -g opencode-ai` |
| Ollama | latest | Optional local LLM runtime (R6) |
| LLM model (Ollama) | `qwen2.5-coder:7b` (or `:14b`) | `ollama pull qwen2.5-coder:7b` |
| Executable scripts | shell scripts | `chmod +x scripts/*.sh` |

The default model is configured in `opencode.jsonc`
(`opencode/deepseek-v4-flash-free`). The Ollama provider is registered with
`qwen2.5-coder:7b` and `qwen2.5-coder:14b` for a local-first fallback.

## 1. Install dependencies

```bash
npm install
```

Expected result: `found 0 vulnerabilities`.

## 2. Install the toolchain

```bash
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

For a global install, run `npm run deploy` to mirror all resources to
`~/.config/opencode/` (R14). The deploy script copies the generated
`opencode.global.jsonc`, skills, commands, scripts, and templates — never hand
-edit the global copy.

**Restart opencode after any change** to `.opencode/` or `opencode.jsonc`
(config loads at startup).

## 4. Verify the environment

```bash
node --version
opencode --version
ollama list                # optional; expect qwen2.5-coder:7b if using Ollama
reqmind generate -h        # exit 0
```

## 5. Run the pipeline

```bash
npm run pipeline                 # full 5-phase run, all gates
npm run pipeline:no-docgen       # skip Phase 4 (documentation)
npm run pipeline:no-gates        # skip Phase 3 (all 10 security gates)
npm run pipeline:sops            # generate SOPs only (docs/04_Operations_Maintenance/SOP/)
```

The pipeline creates `specs/`, `src/`, `__tests__/`, `docs/`, `metrics/`, and
`logs/` automatically. Phases run in order (W1): Requirements -> Coding ->
DevSecOps -> Documentation -> Traceability (R20). Each phase and gate is
audited to `logs/audit.log` (R11). Any failing gate blocks the build with exit
code 1 (R10).

## 6. Standalone analytics

```bash
npm run collect-metrics   # record one build (C4-2)
npm run dast              # R19 DAST scan (OWASP ZAP)
npm run spc               # 3-sigma control report (C4-3)
npm run predict           # readiness forecast + remediation (C4-4/5)
npm run rtm               # R20 traceability matrix -> docs/00_Planning_Requirements/rtm.md
npm run lint              # SAST gate (R8)
npm run test              # Jest coverage
npm run audit             # SCA gate (R9)
```

Note: `spc-control.js` needs at least 5 builds and `predict-readiness.js` at
least 10 builds before producing a full report.

## 7. Running the demo application server

The demo backend (`src/backend/server.js`) wires the `src/` secure primitives
to a real HTTP server. Start it on port 8080 (override with `BACKEND_PORT`):

```bash
node src/backend/server.js
curl -s http://localhost:8080/health            # {"status":"ok"}
curl -s http://localhost:8080/api/csrf          # {"token":"..."}
curl -s -X POST http://localhost:8080/api/session
```

Endpoints: `/` (index), `/health`, `/api/validate`, `/api/csrf`,
`/api/session`, `/api/encrypt`, `/api/upload`, `/api/auth`. Generic responses
are JSON; invalid bodies return `400`, rate overflow returns `429`, unknown
routes return `404`. It imports only whitelisted, tested primitives — see the
[API Reference](../01_Design_Architecture/api-ref.md).

## 8. Using the secure primitives

Phase 2 produces OWASP-aligned helpers under `src/` (auth, access, session,
token, totp, password, csrf, jwt, validate, sql, url, command, xml, upload,
mime, path, http, cookie, rate, host, redirect, xss, deflate, csp, cors, cache,
secrets, audit, log, metrics, spc, encrypt, prototype, compliance, threat,
dast, notify, rtm). See the [API Reference](../01_Design_Architecture/api-ref.md)
for signatures and usage.

## Troubleshooting

| Symptom | Fix |
| :--- | :--- |
| `opencode: command not found` | `npm install -g opencode-ai`; ensure npm's global bin (e.g. `${HOME}/.npm-global/bin` or `${HOME}/.local/bin`) is on PATH |
| `scripts/*.sh` not executable | `chmod +x scripts/*.sh` |
| Ollama model missing | `ollama pull qwen2.5-coder:7b` (only if using the Ollama provider) |
| Metrics DB errors | Delete `metrics/metrics.db` and re-run `npm run collect-metrics` |
| Incomplete `security-scan.json` | Ensure `npm audit --json` output is UTF-8 without BOM |
| SAST gate fails | Run `npm run lint` and fix reported warnings/errors |
| `.env` blocks Phase 3 (R7) | Remove `.env` from the working tree and confirm `.gitignore` excludes it |
| opencode crashes at startup | A `tools/*.js` is not import-safe (C4-6); guard CLI entry with `require.main === module` |
| `npm run deploy` refuses a `tools/*.js` | That script is not import-safe (R10 BLOCKING); add the `require.main === module` guard |
| Server healthcheck on 8080 fails | Confirm `BACKEND_PORT` matches your `curl` target; see `src/backend/server.js` |
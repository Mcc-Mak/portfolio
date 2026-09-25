# AGENTS.md

Guidance for OpenCode sessions here. Read `Prompt.md` (spec) and
`README.md` `## Quick Start` (build recipe) before starting work.

## Repo status

- Spec-driven project, now built: the MCP-CrewAI server lives in
  `src/mcp_crew_ai/` (FastMCP-era name `fastmcp` is gone — mcp 2.x uses
  `MCPServer`). Keep it in sync with the two source-of-truth docs below.
- `Prompt.md` = authoritative spec; `README.md` Quick Start = the recipe it was
  built from; `MCP Workflow.png` = design diagram (text: Prompt.md § "Workflow
  Execution").
- Git: on branch `dev-001`, remote `origin` configured (see git-control).

## Environment (Windows)

- PowerShell 5.1: no `&&` (use `;` / `if ($?)`); backslash paths.
- `uv` **installed** (0.12.x) — dev/test via `uv run pytest`; on a fresh machine
  reinstall with `winget install astral-sh.uv`. Python 3.12.10 (spec needs 3.10+).

## Build essentials

- Stack: Python 3.10+, `mcp[cli]` (≥2.0), `crewai`, `PyYAML`, uv. Package
  `mcp-crew-ai` with console script `mcp-crew-ai`
  → `uvx mcp-crew-ai --agents agents.yml --tasks tasks.yml` works.
- Tools: `run_workflow(topic, process="sequential")`, `get_status(job_id)`,
  `list_crews()`, `list_agents(crew_name)`, `list_tasks(crew_name)`.
- Config CLI: `--agents`, `--tasks`, `--topic`, `--process`.

## Rules that are easy to get wrong

- **Never write to stdout under stdio** — JSON-RPC owns stdout; log to stderr only.
- CrewAI `.kickoff()` **blocks** → return `job_id` immediately; build the crew
  *and* run it in a background thread (agent construction needs an LLM key, so
  build failures become a `failed` job, not a tool error); `get_status` polls
  an in-memory dict (`pending | running | completed | failed`).
- Register tools via `@server.tool()` on an `MCPServer`
  (`mcp.server.mcpserver`) — mcp 2.x renamed `FastMCP`.
- crewai 1.6.1 quirks: `Process` is lowercase (`Process("sequential")`, not
  `Process.SEQUENTIAL`); `Crew` has **no `inputs` field** — pass
  `{"topic": ...}` to `crew.kickoff(inputs=...)`.
- LLM routing: agents default to OpenAI (`OPENAI_API_KEY`); when it's missing,
  `build_crew` gives every agent a fallback `LLM` pointing at the OpenCode Zen
  gateway (`https://opencode.ai/zen/v1`) with the key from `opencode auth login`
  (`auth.json` `opencode` entry or `OPENCODE_API_KEY`), model per
  `OPENCODE_FALLBACK_MODEL` (default `big-pickle`, e.g. `deepseek-v4.1-flash`).
  `llm.py` holds the pure resolution logic; the crewai `LLM` is built lazily so
  tests stay LLM-free. With neither credential, construction fails inside the
  background thread → job `failed` with an informative error.
- Observability: all progress/logs → `/tmp/crew-ai-orchestrator.log` via a
  rotating handler (max 7 rotated files named `...log.yyyymmddhhmmss`),
  mirroring stderr (never stdout). Create the log dir if missing (Windows
  resolves `/tmp` to `C:\tmp`).
- CrewAI↔MCP: agent-level `mcps=[...]` field or `MCPServerAdapter`
  (`crewai-tools[mcp]`).
- Validate YAML at startup; informative errors for unknown job IDs; catch
  CrewAI exceptions per-job → mark `failed`.
- Tests: mock/inject the crew runner so tests never hit a real LLM.

## Git / CI conventions (git-control)

Two levels, applied to **every change**: **Baseline is mandatory** (breaking
one is a violation); **Guidance (best practice) is better but not necessary** —
follow it by default, skip only with a reason.

### Baseline (mandatory)

- Ship each change via dev-001: `git add -A` → commit → `git push origin dev-001`.
  No change lands without a commit; no commit ships without a versioned
  CHANGELOG entry.
- Never push to `dev`/`main` (auto-merge `dev-001 → dev → main` spans them);
  never touch the `GIT_PUSH_TOKEN` secret.
- Every change bumps `CHANGELOG.md`: new top entry `## [X.X.X] - YYYY-MM-DD`
  (`X.X.X`; MAJOR breaking / MINOR feature / PATCH fix-chore), and the bumped
  version goes into the commit message (`feat(v1.2.0): …` prefix or a
  `Version: 1.2.0` body line).
- Commit subject: ≤ 50 chars (hard 72), imperative, capitalized, no trailing
  period, conventional type prefix (`feat: fix: docs: chore: refactor: test:
  build: style: ci:`).
- `.gitignore`/`.gitkeep` discipline: never `git add -f`; keep `.venv/`,
  `__pycache__/`, `*.log`, `.env*`, build caches ignored; track empty dirs that
  must exist (`outputs/`) via `.gitkeep`.

### Guidance (best practice)

- Verify (tests/lints pass) before committing so the pushed branch stays green.
- Commit body: blank line after subject, wrap 72, *what* and *why* (not the
  mechanical *how*); reference files/branches/issues.
- One logical change per commit — split if the subject needs an "and".
- Commit/stash in-progress edits before starting new work; keep the tree clean.
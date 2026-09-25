---
name: build-crew-ai-mcp
description: Use when building or scaffolding the CrewAI MCP orchestration server in this repo — e.g. "build the MCP server", "implement the crew MCP", "make run_workflow work", "scaffold the project". Produces the Python package described by Prompt.md and README "## Quick Start".
---

# Build the CrewAI MCP Server

Recipe a build session must follow. Read `Prompt.md` (full spec) and
`README.md` `## Quick Start` first, then proceed top to bottom. The server is
**already built** (`src/mcp_crew_ai/`) — use this recipe for changes or a
from-scratch rebuild.

## Step 1 — Project scaffold (uv)

- `pyproject.toml`: name `mcp-crew-ai`, `requires-python = ">=3.10"`, plus a
  console script so `uvx mcp-crew-ai` resolves:
  `[project.scripts] mcp-crew-ai = "mcp_crew_ai.server:main"`.
- Runtime deps: `mcp[cli]` (MCP SDK >= 2.0), `crewai`, `PyYAML`.
  Dev dep: `pytest`.
- Environment: `uv` is installed for dev/test (`uv run pytest`); on a fresh
  machine reinstall with `winget install astral-sh.uv`. Shell is Windows
  PowerShell 5.1 (no `&&`, use `;` / `if ($?) { ... }`).

## Step 2 — MCP server core

- `from mcp.server.mcpserver import MCPServer` (mcp 2.x renamed `FastMCP`);
  register tools with `@server.tool()`.
- Tools and signatures: `run_workflow(topic: str, process: str = "sequential")
  -> job_id`, `get_status(job_id)`, `list_crews()`, `list_agents(crew_name)`,
  `list_tasks(crew_name)`. Give each a clear description + JSON Schema inputs.
- CLI args: `--agents`, `--tasks`, `--topic`, `--process`; transports are
  `stdio | sse | streamable-http` (default `stdio`).
- Never write to stdout — JSON-RPC owns it; log via the `logging` module only.

## Step 3 — Crew manager (YAML)

- `agents.yml`: agents with `role`, `goal`, `backstory`, optionally `tools`
  and `mcps` (CrewAI agent-level MCP server refs).
- `tasks.yml`: tasks with `description`, `expected_output`, `agent`.
- Validate both files at startup; fail with informative errors on bad config.

## Step 4 — Job state and execution

- In-memory dict mapping `job_id` -> status: `pending | running | completed |
  failed`. Store outputs/logs alongside.
- CrewAI `.kickoff()` **blocks** and building an `Agent` needs an LLM key.
  Return `job_id` immediately and run **build + kickoff together** in a
  background thread; `get_status` polls the dict. Pass `{"topic": ...}` to
  `crew.kickoff(inputs=...)` (CrewAI 1.6.1 has no `Crew(inputs=...)` field) and
  use lowercase process enums: `Process("sequential")` / `Process("hierarchical")`.
- Catch per-job CrewAI exceptions (including construction failures) and mark
  that job `failed` (never let a crash take down the server).

## Step 5 — Verify

- `uv run pytest`: unit-test tool handlers with the crew runner injected/mocked
  so no real LLM is hit. Cover invalid job IDs and malformed YAML.
- stdio smoke test with a real MCP client (Claude Desktop, Cursor).

## Step 6 — Ship changes

- Before committing: bump the version and update `CHANGELOG.md` (top entry
  `## [X.X.X] - YYYY-MM-DD`; MAJOR breaking / MINOR feature / PATCH fix/chore).
  Include the bumped version in every commit message — e.g.
  `feat(v1.2.0): <subject>` or a `Version: 1.2.0` body line.
- Commit format: `type: subject` line (imperative, capitalized, ≤ 50 chars),
  blank line, body explaining *what* and *why* (wrap 72). Types: `feat:`,
  `fix:`, `docs:`, `chore:`, `refactor:`, `test:`, `build:`, `style:`, `ci:`.
  Respect `.gitignore` / `.gitkeep` (never `git add -f`). Full standard:
  `AGENTS.md` "Git / CI conventions (git-control)".
- Push to `dev-001` — the default work branch; CI auto-merges
  `dev-001 -> dev -> main` (requires `GIT_PUSH_TOKEN` secret). Never push to
  `dev`/`main` directly. (Repo is already initialized on `dev-001` with
  `origin` set.)

## Logging and observability

- Target: all server progress and logs go to `/tmp/crew-ai-orchestrator.log`
  via `logging.FileHandler` on the root logger.
- Rotation: at most **7 rotated files**; on rotation rename the log to
  `/tmp/crew-ai-orchestrator.log.yyyymmddhhmmss` (UTC) and delete the oldest
  beyond 7. `RotatingFileHandler(maxBytes=…, backupCount=7)` with a custom
  `namer` that returns the timestamped name works (its `getFilesToDelete`
  honors `namer`); or a small custom `BaseRotatingHandler`.
- Log job lifecycle at INFO (accepted/started/completed/failed) and errors at
  ERROR. The file handler **mirrors** the stderr handler — it never replaces
  it, and nothing is ever written to stdout (stdio JSON-RPC owns stdout; never
  `print()`). HTTP/SSE transport is fine with normal logging.
- Make sure the parent dir of the log path exists before opening the handler
  (on Windows, native Python resolves `/tmp` to `C:\tmp` and will not create
  it).

## CrewAI ↔ MCP integration

- Simple DSL: `Agent(..., mcps=["https://mcp.exa.ai/mcp?api_key=KEY"])`.
- Advanced: `MCPServerAdapter` from `crewai-tools[mcp]`.
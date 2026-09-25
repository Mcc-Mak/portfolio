# MCP - Crew AI (Orchestrator)

Model Context Protocol (MCP) server that orchestrates CrewAI multi-agent
workflows. Full product spec: [`Prompt.md`](Prompt.md).

## Tech Stack

| Category | Technologies |
|:---------|:-------------|
| Language | `Python` 3.10+ |
| Frameworks | `MCP` SDK 2.x (`MCPServer`), `CrewAI` |
| Package Manager | `uv` |
| Config | `PyYAML` (`agents.yml`, `tasks.yml`) |
| Testing | `pytest` |

## Features

- **Five MCP tools** exposed over stdio:
  - `run_workflow(topic, process)` — kicks off a CrewAI crew in a background thread
  - `get_status(job_id)` — polls in-memory job state (`pending | running | completed | failed`)
  - `list_crews()` — lists available crew configurations
  - `list_agents(crew_name)` — lists agents in a crew
  - `list_tasks(crew_name)` — lists tasks in a crew
- **Asynchronous job execution** — `run_workflow` returns a `job_id` immediately;
  CrewAI `.kickoff()` blocks in a background thread
- **Dual LLM backend** — agents default to OpenAI (`OPENAI_API_KEY`); falls back
  to OpenCode Zen gateway (`opencode.ai/zen/v1`) when no OpenAI key is present
- **Rotating log** — all progress/events logged to
  `/tmp/crew-ai-orchestrator.log` (max 7 rotated files), mirroring stderr only
  (never stdout — JSON-RPC owns stdout under stdio)
- **YAML-driven configuration** — define crews, agents, and tasks in
  `agents.yml` / `tasks.yml`; validated at startup

## Project Structure

```
crew_ai_orchestrator_mcp/
├── src/mcp_crew_ai/
│   ├── server.py            # MCPServer instance + tool registration
│   ├── llm.py               # LLM resolution logic (OpenAI → Zen fallback)
│   └── ...                  # Crew manager, state manager
├── agents.yml               # Sample crew: Researcher, Writer, Reviewer
├── tasks.yml                # Sample tasks for the research crew
├── tests/                   # pytest suite (config, crews, llm, logging, server, state)
├── Prompt.md                # Authoritative product spec
├── AGENTS.md                # Development constraints (read before editing)
├── pyproject.toml           # Package definition + console script
└── uv.lock
```

## Quick Start

The server is built and lives in `src/mcp_crew_ai/`. This section is the recipe
it was built from — keep it in sync as the server evolves:

1. Scaffold the Python package (uv).
   - `pyproject.toml`: name `mcp-crew-ai`, `requires-python = ">=3.10"`, and a
     console script so `uvx mcp-crew-ai` resolves:
     `[project.scripts] mcp-crew-ai = "mcp_crew_ai.server:main"`.
   - Dependencies: `mcp[cli]` (MCP SDK >= 2.0), `crewai`, `PyYAML`; dev: `pytest`.
2. Implement the server (see `Prompt.md` "Core Components").
   - `src/mcp_crew_ai/server.py` — `MCPServer` instance (mcp 2.x renamed
     `FastMCP`) + five tools:
     `run_workflow(topic, process="sequential")`, `get_status(job_id)`,
     `list_crews()`, `list_agents(crew_name)`, `list_tasks(crew_name)`.
   - Crew manager: loads `agents.yml` / `tasks.yml`, builds CrewAI `Crew`.
   - State manager: in-memory `job_id` -> status map; crews run in a
     background thread (kickoff blocks).
   - Observability: log all progress/events to `/tmp/crew-ai-orchestrator.log`;
     rotate keeping max 7 files, named `...log.yyyymmddhhmmss`.
3. Add sample `agents.yml` / `tasks.yml` (research crew: Researcher, Writer,
   Reviewer).
4. Test: `uv run pytest` (tool handlers, invalid job IDs, malformed YAML).
5. Smoke test over stdio with an MCP client (Claude Desktop, Cursor).

### Run

Running a real workflow needs an LLM. Agents use OpenAI by default
(`OPENAI_API_KEY`); set it in the environment first:

```
$env:OPENAI_API_KEY = "sk-..."
uvx mcp-crew-ai --agents agents.yml --tasks tasks.yml --topic "..." --process sequential
```

Without `OPENAI_API_KEY`, the server falls back to the **OpenCode Zen**
gateway (`https://opencode.ai/zen/v1`) using the key that `opencode auth login`
stores under the `opencode` entry of `~/.local/share/opencode/auth.json` (or
`OPENCODE_API_KEY`), and runs the crew on an OpenCode default model —
`big-pickle` (free) by default, override with `OPENCODE_FALLBACK_MODEL`, e.g.
`deepseek-v4.1-flash`. The chosen backend is logged at startup.

If neither an OpenAI key nor an OpenCode Zen key is present, `run_workflow`
still returns a `job_id` and the job is marked `failed` in the background with
an informative error.

## Git workflow

- Work on branch `dev-001`: after every change, bump the version and add a
  `CHANGELOG.md` entry (format `X.X.X`, newest at top), commit with the version
  in the message, and push to `dev-001`. CI auto-merges `dev-001 -> dev ->
  main`; never push to `dev`/`main` directly.
- Full rules: commit standard, versioning, and `.gitignore` / `.gitkeep`
  discipline — see `AGENTS.md` "Git / CI conventions (git-control)".
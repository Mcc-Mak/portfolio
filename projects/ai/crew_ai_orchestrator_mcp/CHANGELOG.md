# Changelog

All notable changes to this project are documented here, newest first.

Version format: `X.X.X`. Every change bumps the version and must be reflected
in the commit message (see `AGENTS.md` "Git / CI conventions (git-control)").

## [0.3.0] - 2026-09-24

### Added

- LLM fallback: when `OPENAI_API_KEY` is missing, agents run on the OpenCode
  Zen gateway (`https://opencode.ai/zen/v1`) using a default OpenCode model —
  `big-pickle` by default, override with `OPENCODE_FALLBACK_MODEL` (e.g.
  `deepseek-v4.1-flash`) — keyed by the OpenCode auth login
  (`~/.local/share/opencode/auth.json` `opencode` entry) or `OPENCODE_API_KEY`.
- `src/mcp_crew_ai/llm.py`: pure, testable key/model resolution
  (`resolve_llm_spec`, `llm_backend_summary`); `crews.build_crew` lazily
  attaches the fallback `crewai.LLM` to every agent so crews build without an
  OpenAI key. The selected backend is logged at startup (`main`).
- Tests: `tests/test_llm.py` (13 unit tests on key detection, auth-file
  parsing, model selection, and the no-credentials error path) plus llm
  injection cases for `agent_kwargs`.

## [0.2.0] - 2026-09-23

### Added

- `mcp-crew-ai` server package under `src/mcp_crew_ai/` (version `0.2.0`,
  console script `mcp-crew-ai`): `MCPServer` (mcp 2.x) with five tools —
  `run_workflow(topic, process="sequential")`, `get_status(job_id)`,
  `list_crews()`, `list_agents(crew_name)`, `list_tasks(crew_name)`.
- Crew manager loads + validates `agents.yml` / `tasks.yml` at startup;
  `run_workflow` returns a `job_id` immediately and builds + kicks off the
  CrewAI `Crew` in a background thread (agent construction needs an LLM key,
  so build failures are recorded as `failed` jobs, never tool errors).
- In-memory `JobStore` (`pending | running | completed | failed`) shared
  across tool calls; `get_status` returns the full job record.
- Observability: all progress/logs to `/tmp/crew-ai-orchestrator.log` via a
  timestamped rotating handler (max 7 files, `...log.yyyymmddhhmmss` mirroring
  stderr; never stdout) with auto-created parent dir.
- Sample research crew (`research`): Research Analyst, Content Writer,
  Reviewer; CLI `--agents/--tasks/--topic/--process`; transports
  `stdio | sse | streamable-http`.
- Test suite (36 tests): config validation, JobStore lifecycle, tool handlers
  with the crew runner injected, logging + rotation, and pure crew-building /
  runner error-path units (no real CrewAI objects — they need an LLM key).
- `uv.lock` for reproducible installs.

### Changed

- Docs synced to mcp 2.x API: `FastMCP` -> `MCPServer`
  (`mcp.server.mcpserver`); README Quick Start now records the built recipe.

## [0.1.0] - 2026-09-23

### Added

- Repo scaffold: `Prompt.md` spec, `README.md` (Quick Start + Git workflow),
  `AGENTS.md` (build rules + git-control baseline/guidance), `SKILLS.md` and
  `build-crew-ai-mcp` skill, observability (rotating log file), `CHANGELOG.md`,
  `.gitignore`, `outputs/.gitkeep`.
### Prompt for OpenCode

```
Build a Model Context Protocol (MCP) server in Python that orchestrates Crew AI workflows.

## Project Overview
Create an MCP server that allows MCP clients (Claude Desktop, Cursor, etc.) to run, monitor, and manage CrewAI multi-agent workflows. The server should expose MCP tools for triggering crews, checking status, and listing available agents and tasks.

## Tech Stack
- Python 3.10+
- MCP Python SDK (version 2.0.0 or higher) 
- CrewAI (crewai)
- PyYAML for configuration
- uv for dependency management

## Architecture
The server follows the MCP client-host-server architecture . It acts as a bridge between MCP clients and the CrewAI runtime.

### Core Components
1. **MCP Server**: Handles JSON-RPC communication over stdio (local) and/or HTTP/SSE (remote).
2. **Tool Manager**: Registers and exposes MCP tools:
   - `run_workflow(topic: str, process: str = "sequential") -> job_id`
   - `get_status(job_id: str) -> status_report`
   - `list_crews() -> list_of_crews`
   - `list_agents(crew_name: str) -> list_of_agents`
   - `list_tasks(crew_name: str) -> list_of_tasks`
3. **Crew Manager**: Loads agent and task definitions from YAML files and instantiates CrewAI Crew objects.
4. **State Manager**: Tracks running/completed workflows with job IDs.

### Configuration
- `agents.yml`: Define agents with `role`, `goal`, `backstory`, and optionally `tools` (MCP server references).
- `tasks.yml`: Define tasks with `description`, `expected_output`, and `agent` assignment.
- Command-line args: `--agents` (path to agents.yml), `--tasks` (path to tasks.yml), `--topic` (default topic), `--process` (sequential/hierarchical).
- LLM routing: agents default to OpenAI (`OPENAI_API_KEY`). When that key is
  missing, the server falls back to the OpenCode default gateway models (e.g.
  `big-pickle`, `deepseek-v4.1-flash`) via OpenCode Zen
  (`https://opencode.ai/zen/v1`) using the key from `opencode auth login`
  (`~/.local/share/opencode/auth.json` or `OPENCODE_API_KEY`); pick the model
  with `OPENCODE_FALLBACK_MODEL` (default `big-pickle`). Log the chosen backend
  at startup; if neither credential exists, mark the job `failed` with an
  informative error (never fail the tool call).

### CrewAI Integration
Use the simple DSL approach: agents can reference MCP servers via the `mcps` field . For example:
```python
from crewai import Agent
agent = Agent(
    role="Research Analyst",
    goal="Research topics",
    mcps=["https://mcp.exa.ai/mcp?api_key=KEY"]
)
```
Alternatively, use `MCPServerAdapter` from `crewai-tools[mcp]` for advanced connection management.

### Workflow Execution
1. Client calls `run_workflow` with a topic.
2. Server loads agents/tasks from YAML.
3. Server creates a CrewAI Crew and runs it (sequential or hierarchical).
4. Server returns a `job_id` and streams progress/status.
5. Client polls `get_status(job_id)` for completion.

## Implementation Requirements

### Server Setup
- Use `mcp[cli]` package.
- For stdio transport: never write to stdout (use `logging` to stderr) .
- For HTTP/SSE: standard logging is fine.

### Observability (Logging)
- Redirect all server progress and logs to `/tmp/crew-ai-orchestrator.log`
  (single rotating file handler on the root logger).
- Rotation: keep **at most 7 rotated files**; on rotation rename the current
  log to `/tmp/crew-ai-orchestrator.log.yyyymmddhhmmss` (UTC, e.g.
  `...log.20260923120000`), deleting the oldest beyond 7.
- Progress events (job accepted/started/completed/failed) must be written to
  the log file at INFO level; errors at ERROR level.
- stdio transport still applies: nothing is ever written to stdout; the file
  handler does not replace the stderr handler, it mirrors it.

### Tool Definitions
Each MCP tool must have a clear name, description, and input schema (JSON Schema). Example:
```python
@server.tool()
def run_workflow(topic: str, process: str = "sequential") -> str:
    """Run a CrewAI workflow with the given topic."""
    job_id = str(uuid.uuid4())
    # start crew in background thread
    return job_id
```

### Error Handling
- Validate configuration files on startup.
- Return informative errors for invalid job IDs or missing configs.
- Handle CrewAI execution exceptions gracefully.

### State Management
- In-memory dict mapping `job_id` to status (`pending`, `running`, `completed`, `failed`).
- Store output files and logs.

### Testing
- Include a sample `agents.yml` and `tasks.yml` (e.g., a research crew with a Researcher, Writer, and Reviewer).
- Write unit tests for tool handlers.
- Test with an MCP client (e.g., Claude Desktop) via stdio.

### Deployment
- Provide a `pyproject.toml` with dependencies.
- Support `uvx mcp-crew-ai --agents agents.yml --tasks tasks.yml` for quick runs.
- Optionally package as a Docker container.

## Deliverables
1. Complete Python source code for the MCP server.
2. Sample `agents.yml` and `tasks.yml`.
3. `pyproject.toml` with dependencies.
4. README with setup and usage instructions.
5. Basic test suite.

## Reference
- MCP Architecture: https://modelcontextprotocol.io/specification/2026-07-28/architecture/index.md
- CrewAI MCP Integration: https://docs.crewai.com/v1.15.22/en/mcp/overview
- MCP Server Build Guide: https://modelcontextprotocol.org/docs/draft/develop/build-server
- Existing MCP CrewAI Server: https://www.mcpworld.com/en/detail/33753b52a6bc4e9d9543563d6d5d6fd9
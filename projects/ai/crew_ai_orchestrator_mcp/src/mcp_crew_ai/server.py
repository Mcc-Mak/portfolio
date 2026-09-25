"""MCP server exposing CrewAI workflow orchestration tools.

Run over stdio (default) so MCP clients such as Claude Desktop and Cursor can
call the tools. Under stdio nothing is ever written to stdout — JSON-RPC owns
it; all logging goes to stderr and the rotated log file.
"""

from __future__ import annotations

import argparse
import logging
import threading
import uuid
from typing import Any

from mcp.server.mcpserver import MCPServer

from . import config as config_mod
from . import crews as crews_mod
from . import llm as llm_mod
from .config import CrewConfig, CrewConfigError
from .logging_setup import LOG_FILE_DEFAULT, setup_logging
from .state import JobStore

logger = logging.getLogger("mcp_crew_ai")

server = MCPServer("crew-ai-orchestrator")


class AppContext:
    """Runtime state shared by the tools: job store + loaded crew config."""

    def __init__(self) -> None:
        self.store = JobStore()
        self.crew: CrewConfig | None = None
        self.default_topic = ""
        self.default_process = "sequential"
        self._lock = threading.Lock()

    def configure(self, crew: CrewConfig, default_topic: str = "", default_process: str = "sequential") -> None:
        with self._lock:
            self.crew = crew
            self.default_topic = default_topic
            self.default_process = default_process


app = AppContext()

JSON_FIELDS = ("job_id", "topic", "process", "status", "created_at", "completed_at", "result", "error")


def _require_crew(crew_name: str) -> CrewConfig:
    if app.crew is None:
        raise RuntimeError("server has no configured crew (start with --agents and --tasks)")
    if crew_name != app.crew.name:
        names = sorted({app.crew.name})
        raise ValueError(f"unknown crew '{crew_name}'; available crews: {names}")
    return app.crew


@server.tool()
def run_workflow(topic: str, process: str = "sequential") -> str:
    """Run a CrewAI workflow for the given topic.

    Returns a ``job_id`` immediately; poll it with ``get_status``. ``process``
    is ``sequential`` or ``hierarchical``.
    """
    if process not in crews_mod.ALLOWED_PROCESSES:
        raise ValueError(f"process must be one of {list(crews_mod.ALLOWED_PROCESSES)}, got '{process}'")
    topic = topic.strip()
    if not topic:
        raise ValueError("'topic' must not be empty")
    if app.crew is None:
        raise RuntimeError("server has no configured crew (start with --agents and --tasks)")
    job_id = str(uuid.uuid4())
    job = app.store.create(job_id, topic, process)
    crews_mod.run_crew_async(
        job_id,
        lambda: crews_mod.build_crew(app.crew, topic, process),  # type: ignore[arg-type, return-value]
        app.store,
        inputs={"topic": topic},
    )
    logger.info("job %s: queued topic=%r process=%s", job_id, topic, process)
    return job_id


@server.tool()
def get_status(job_id: str) -> dict[str, Any]:
    """Return the status report for a job previously created by ``run_workflow``.

    Status is one of: ``pending``, ``running``, ``completed``, ``failed``.
    """
    job = app.store.get(job_id.strip())
    if job is None:
        raise ValueError(f"unknown job id '{job_id.strip()}'")
    return {field: getattr(job, field) for field in JSON_FIELDS}


@server.tool()
def list_crews() -> list[str]:
    """List configured crews (the agent/task sets loaded from ``--agents``/``--tasks``)."""
    return [] if app.crew is None else [app.crew.name]


@server.tool()
def list_agents(crew_name: str) -> list[dict[str, Any]]:
    """List the agents defined for a crew."""
    crew = _require_crew(crew_name)
    return [
        {
            "role": agent_def.role,
            "goal": agent_def.goal,
            "tools": agent_def.tools,
            "mcps": agent_def.mcps,
        }
        for agent_def in crew.agents
    ]


@server.tool()
def list_tasks(crew_name: str) -> list[dict[str, Any]]:
    """List the tasks defined for a crew."""
    crew = _require_crew(crew_name)
    return [
        {
            "description": task_def.description,
            "expected_output": task_def.expected_output,
            "agent": task_def.agent,
        }
        for task_def in crew.tasks
    ]


def main(argv: list[str] | None = None) -> None:
    parser = argparse.ArgumentParser(
        prog="mcp-crew-ai",
        description="MCP server that orchestrates CrewAI workflows.",
    )
    parser.add_argument("--agents", default="agents.yml", help="path to agents YAML (default: %(default)s)")
    parser.add_argument("--tasks", default="tasks.yml", help="path to tasks YAML (default: %(default)s)")
    parser.add_argument("--topic", default="MCP server orchestration", help="default workflow topic")
    parser.add_argument("--process", default="sequential", choices=list(crews_mod.ALLOWED_PROCESSES))
    parser.add_argument("--log-file", default=LOG_FILE_DEFAULT, help="rotated log file (default: %(default)s)")
    parser.add_argument("--log-level", default="INFO", choices=["DEBUG", "INFO", "WARNING", "ERROR"])
    parser.add_argument("--transport", default="stdio", choices=["stdio", "sse", "streamable-http"])
    args = parser.parse_args(argv)

    setup_logging(args.log_file, args.log_level)
    logger.info(
        "mcp-crew-ai starting: agents=%s tasks=%s topic=%r process=%s transport=%s log_file=%s",
        args.agents,
        args.tasks,
        args.topic,
        args.process,
        args.transport,
        args.log_file,
    )
    try:
        merged = config_mod.validate_crew(config_mod.load_agents(args.agents), config_mod.load_tasks(args.tasks))
    except CrewConfigError as exc:
        logger.error("configuration error: %s", exc)
        raise SystemExit(f"configuration error: {exc}") from exc
    app.configure(merged, args.topic, args.process)
    logger.info("crew '%s' loaded: %d agents, %d tasks", merged.name, len(merged.agents), len(merged.tasks))
    logger.info("llm backend: %s", llm_mod.llm_backend_summary())
    server.run(transport=args.transport)


if __name__ == "__main__":
    main()
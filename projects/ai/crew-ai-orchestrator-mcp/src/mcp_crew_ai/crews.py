"""Build CrewAI Crew objects from YAML definitions and run them in the background."""

from __future__ import annotations

import datetime
import logging
import threading
from collections.abc import Callable
from typing import Any

from .config import AgentDef, CrewConfig, TaskDef

ALLOWED_PROCESSES = ("sequential", "hierarchical")

logger = logging.getLogger("mcp_crew_ai.crews")


def _now_utc() -> str:
    return datetime.datetime.now(datetime.timezone.utc).isoformat(timespec="seconds")


def agent_kwargs(agent_def: AgentDef, llm: Any = None) -> dict[str, Any]:
    """Map a validated agent definition to CrewAI ``Agent`` kwargs (pure).

    ``llm`` is a prebuilt fallback ``crewai.LLM``; when given it is attached to
    every agent so crews can run without an OpenAI key.
    """
    kwargs: dict[str, Any] = {
        "role": agent_def.role,
        "goal": agent_def.goal,
        "backstory": agent_def.backstory,
        "allow_delegation": agent_def.allow_delegation,
        "verbose": agent_def.verbose,
    }
    if llm is not None:
        kwargs["llm"] = llm
    if agent_def.tools:
        kwargs["tools"] = agent_def.tools
    if agent_def.mcps:
        kwargs["mcps"] = agent_def.mcps
    return kwargs


def build_crew(crew: CrewConfig, topic: str, process: str) -> Any:
    """Instantiate a CrewAI ``Crew`` from validated definitions.

    The heavy ``crewai`` import is deferred so tool handlers and tests that
    never run a workflow do not pay for it. When ``OPENAI_API_KEY`` is missing
    the agents get a fallback ``LLM`` pointing at the OpenCode Zen gateway
    instead of failing on construction.
    """
    from crewai import Agent, Crew, LLM, Process, Task  # lazy: heavy dependency

    from . import llm as llm_mod

    process_enum = Process(process)
    llm = None
    llm_spec = llm_mod.resolve_llm_spec()
    if llm_spec:
        llm = LLM(**llm_spec)
        logger.info("llm backend: opencode zen fallback model=%s", llm_spec["model"])
    agents_by_role: dict[str, Agent] = {}
    for agent_def in crew.agents:
        agents_by_role[agent_def.role] = Agent(**agent_kwargs(agent_def, llm))

    crew_tasks = [
        Task(
            description=task_def.description,
            expected_output=task_def.expected_output,
            agent=agents_by_role[task_def.agent],
        )
        for task_def in crew.tasks
    ]
    return Crew(
        agents=list(agents_by_role.values()),
        tasks=crew_tasks,
        process=process_enum,
        verbose=True,
    )


def run_crew_async(
    job_id: str,
    crew_builder: Callable[[], Any],
    store: Any,
    inputs: dict[str, Any] | None = None,
) -> None:
    """Build + run the (blocking) crew in a daemon thread; update the store.

    Crew construction is deferred into the thread so ``run_workflow`` always
    returns a ``job_id`` immediately and any CrewAI failure (missing LLM key,
    network, model errors) is recorded on the job as ``failed`` instead of
    erroring the tool call.
    """

    def _run() -> None:
        store.update(job_id, status="running")
        logger.info("job %s: kickoff started", job_id)
        try:
            crew = crew_builder()
            result = crew.kickoff(inputs=inputs or {})
            store.update(
                job_id,
                status="completed",
                result=str(result),
                completed_at=_now_utc(),
            )
            logger.info("job %s: completed", job_id)
        except Exception as exc:  # noqa: BLE001 - never take the server down
            store.update(
                job_id,
                status="failed",
                error=f"{type(exc).__name__}: {exc}",
                completed_at=_now_utc(),
            )
            logger.exception("job %s: failed", job_id)

    threading.Thread(target=_run, name=f"crew-{job_id}", daemon=True).start()
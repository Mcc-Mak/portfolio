"""Load and validate agent/task definitions from YAML files."""

from __future__ import annotations

from dataclasses import dataclass, field
from typing import Any

import yaml


class CrewConfigError(ValueError):
    """Raised when YAML configuration is missing or malformed."""


@dataclass
class AgentDef:
    role: str
    goal: str
    backstory: str = ""
    tools: list[Any] = field(default_factory=list)
    mcps: list[Any] = field(default_factory=list)
    allow_delegation: bool = False
    verbose: bool = False


@dataclass
class TaskDef:
    description: str
    expected_output: str
    agent: str


@dataclass
class CrewConfig:
    name: str
    agents: list[AgentDef] = field(default_factory=list)
    tasks: list[TaskDef] = field(default_factory=list)


def _load_yaml(path: str) -> dict[str, Any]:
    try:
        with open(path, encoding="utf-8") as fh:
            data = yaml.safe_load(fh)
    except OSError as exc:
        raise CrewConfigError(f"cannot read '{path}': {exc}") from exc
    except yaml.YAMLError as exc:
        raise CrewConfigError(f"'{path}' is not valid YAML: {exc}") from exc
    if not isinstance(data, dict):
        raise CrewConfigError(f"'{path}' must contain a mapping at the top level")
    return data


def _require_list(data: dict[str, Any], key: str, path: str) -> list[Any]:
    value = data.get(key)
    if not isinstance(value, list) or not value:
        raise CrewConfigError(f"'{path}': '{key}' must be a non-empty list")
    return value


def _require_str(data: dict[str, Any], key: str, path: str) -> str:
    value = data.get(key)
    if not isinstance(value, str) or not value.strip():
        raise CrewConfigError(f"'{path}': '{key}' must be a non-empty string")
    return value.strip()


def load_agents(path: str) -> CrewConfig:
    data = _load_yaml(path)
    crew = CrewConfig(name=str(data.get("crew") or "default"))
    for i, entry in enumerate(_require_list(data, "agents", path)):
        if not isinstance(entry, dict):
            raise CrewConfigError(f"'{path}': agents[{i}] must be a mapping")
        role = _require_str(entry, "role", f"{path}:agents[{i}]")
        crew.agents.append(
            AgentDef(
                role=role,
                goal=_require_str(entry, "goal", f"{path}:agents[{i}]"),
                backstory=str(entry.get("backstory") or ""),
                tools=list(entry.get("tools") or []),
                mcps=list(entry.get("mcps") or []),
                allow_delegation=bool(entry.get("allow_delegation", False)),
                verbose=bool(entry.get("verbose", False)),
            )
        )
    return crew


def load_tasks(path: str) -> CrewConfig:
    data = _load_yaml(path)
    crew = CrewConfig(name=str(data.get("crew") or "default"))
    for i, entry in enumerate(_require_list(data, "tasks", path)):
        if not isinstance(entry, dict):
            raise CrewConfigError(f"'{path}': tasks[{i}] must be a mapping")
        crew.tasks.append(
            TaskDef(
                description=_require_str(entry, "description", f"{path}:tasks[{i}]"),
                expected_output=_require_str(entry, "expected_output", f"{path}:tasks[{i}]"),
                agent=_require_str(entry, "agent", f"{path}:tasks[{i}]"),
            )
        )
    return crew


def validate_crew(agents_cfg: CrewConfig, tasks_cfg: CrewConfig) -> CrewConfig:
    """Cross-check agents/tasks configs and return a merged CrewConfig."""
    if agents_cfg.name != tasks_cfg.name:
        raise CrewConfigError(
            f"crew name mismatch: agents.yml says '{agents_cfg.name}' but tasks.yml says '{tasks_cfg.name}'"
        )
    roles = {a.role for a in agents_cfg.agents}
    for task in tasks_cfg.tasks:
        if task.agent not in roles:
            raise CrewConfigError(
                f"task '{task.description[:40]}' references unknown agent '{task.agent}' "
                f"(known agents: {sorted(roles)})"
            )
    return CrewConfig(name=agents_cfg.name, agents=agents_cfg.agents, tasks=tasks_cfg.tasks)
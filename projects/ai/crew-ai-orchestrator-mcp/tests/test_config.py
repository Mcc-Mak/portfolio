"""Unit tests for YAML configuration loading and validation."""

import textwrap

import pytest

from mcp_crew_ai.config import (
    CrewConfigError,
    load_agents,
    load_tasks,
    validate_crew,
)

AGENTS_YAML = textwrap.dedent(
    """
    crew: research
    agents:
      - role: Researcher
        goal: Research thoroughly.
        backstory: A keen researcher.
    """
).strip()

TASKS_YAML = textwrap.dedent(
    """
    crew: research
    tasks:
      - description: Research "{topic}".
        expected_output: Findings.
        agent: Researcher
    """
).strip()


def _write(tmp_path, name, content):
    path = tmp_path / name
    path.write_text(content, encoding="utf-8")
    return str(path)


def test_load_agents_ok(tmp_path):
    cfg = load_agents(_write(tmp_path, "agents.yml", AGENTS_YAML))
    assert cfg.name == "research"
    assert [a.role for a in cfg.agents] == ["Researcher"]
    assert cfg.agents[0].mcps == []


def test_load_tasks_ok(tmp_path):
    cfg = load_tasks(_write(tmp_path, "tasks.yml", TASKS_YAML))
    assert cfg.name == "research"
    assert cfg.tasks[0].agent == "Researcher"


def test_load_missing_file_raises(tmp_path):
    with pytest.raises(CrewConfigError, match="cannot read"):
        load_agents(str(tmp_path / "nope.yml"))


def test_load_malformed_yaml_raises(tmp_path):
    with pytest.raises(CrewConfigError, match="not valid YAML"):
        load_agents(_write(tmp_path, "agents.yml", "agents: [unclosed"))


def test_load_empty_agents_raises(tmp_path):
    with pytest.raises(CrewConfigError, match="non-empty list"):
        load_agents(_write(tmp_path, "agents.yml", "crew: research\nagents: []"))


def test_load_missing_role_raises(tmp_path):
    with pytest.raises(CrewConfigError, match="'role' must be a non-empty string"):
        load_agents(_write(tmp_path, "agents.yml", "agents:\n  - goal: x"))


def test_validate_crew_name_mismatch(tmp_path):
    agents = load_agents(_write(tmp_path, "agents.yml", AGENTS_YAML.replace("research", "a")))
    tasks = load_tasks(_write(tmp_path, "tasks.yml", TASKS_YAML.replace("research", "b")))
    with pytest.raises(CrewConfigError, match="crew name mismatch"):
        validate_crew(agents, tasks)


def test_validate_crew_unknown_agent(tmp_path):
    agents = load_agents(_write(tmp_path, "agents.yml", AGENTS_YAML))
    other = TASKS_YAML.replace("Researcher", "Ghost")
    tasks = load_tasks(_write(tmp_path, "tasks.yml", other))
    with pytest.raises(CrewConfigError, match="unknown agent 'Ghost'"):
        validate_crew(agents, tasks)


def test_validate_crew_returns_merged(tmp_path):
    merged = validate_crew(
        load_agents(_write(tmp_path, "agents.yml", AGENTS_YAML)),
        load_tasks(_write(tmp_path, "tasks.yml", TASKS_YAML)),
    )
    assert merged.name == "research"
    assert len(merged.agents) == 1
    assert len(merged.tasks) == 1
"""Unit tests for the MCP tool handlers. The crew runner is mocked/injected so
no real LLM (or CrewAI) is ever hit."""

import textwrap

import pytest

from mcp_crew_ai import crews as crews_mod
from mcp_crew_ai import server as server_mod
from mcp_crew_ai.config import CrewConfig

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


@pytest.fixture
def configured_app(tmp_path, monkeypatch):
    from mcp_crew_ai import config as config_mod

    agents_path = tmp_path / "agents.yml"
    tasks_path = tmp_path / "tasks.yml"
    agents_path.write_text(AGENTS_YAML, encoding="utf-8")
    tasks_path.write_text(TASKS_YAML, encoding="utf-8")
    merged = config_mod.validate_crew(config_mod.load_agents(str(agents_path)), config_mod.load_tasks(str(tasks_path)))

    recording = {}

    def fake_build_crew(crew, topic, process):
        recording["build"] = (crew, topic, process)
        return object()

    def fake_run_crew_async(job_id, crew_builder, store, inputs=None):
        recording["run"] = (job_id, crew_builder, store, inputs)

    monkeypatch.setattr(crews_mod, "build_crew", fake_build_crew)
    monkeypatch.setattr(crews_mod, "run_crew_async", fake_run_crew_async)

    store = server_mod.app.store
    store._jobs.clear()
    server_mod.app.configure(merged, default_topic="default topic", default_process="sequential")
    yield server_mod.app, recording
    server_mod.app.crew = None


def test_run_workflow_returns_job_id(configured_app):
    app, recording = configured_app
    job_id = server_mod.run_workflow("hello world")
    assert isinstance(job_id, str) and job_id
    job = app.store.get(job_id)
    assert job.status.value == "pending"
    assert job.topic == "hello world"
    builder, inputs = recording["run"][1], recording["run"][3]
    assert callable(builder)
    assert inputs == {"topic": "hello world"}
    builder()
    assert recording["build"][1:] == ("hello world", "sequential")


def test_run_workflow_default_process(configured_app):
    _, recording = configured_app
    server_mod.run_workflow("x")
    recording["run"][1]()
    assert recording["build"][2] == "sequential"


def test_run_workflow_hierarchical(configured_app):
    _, recording = configured_app
    server_mod.run_workflow("x", process="hierarchical")
    recording["run"][1]()
    assert recording["build"][2] == "hierarchical"


def test_run_workflow_invalid_process(configured_app):
    with pytest.raises(ValueError, match="process must be one of"):
        server_mod.run_workflow("x", process="parallel")


def test_run_workflow_empty_topic(configured_app):
    with pytest.raises(ValueError, match="must not be empty"):
        server_mod.run_workflow("   ")


def test_get_status_unknown_job(configured_app):
    with pytest.raises(ValueError, match="unknown job id"):
        server_mod.get_status("nope")


def test_get_status_report(configured_app):
    app, _ = configured_app
    job = app.store.create("j1", "topic", "sequential")
    app.store.update("j1", status="completed", result="done")
    report = server_mod.get_status("j1")
    assert report["job_id"] == "j1"
    assert report["status"] == "completed"
    assert report["result"] == "done"
    assert report["topic"] == job.topic


def test_list_crews(configured_app):
    assert server_mod.list_crews() == ["research"]


def test_list_agents(configured_app):
    agents = server_mod.list_agents("research")
    assert [a["role"] for a in agents] == ["Researcher"]


def test_list_tasks(configured_app):
    tasks = server_mod.list_tasks("research")
    assert tasks[0]["agent"] == "Researcher"


def test_list_agents_unknown_crew(configured_app):
    with pytest.raises(ValueError, match="unknown crew 'ghost'"):
        server_mod.list_agents("ghost")


def test_listing_without_crew():
    assert server_mod.app.crew is None
    assert server_mod.list_crews() == []
    with pytest.raises(RuntimeError, match="no configured crew"):
        server_mod.list_agents("research")


def test_unconfigured_run_workflow():
    with pytest.raises(RuntimeError, match="no configured crew"):
        server_mod.run_workflow("x")
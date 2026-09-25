"""Unit tests for crew building + the background runner. Never construct a real
CrewAI object (that requires an LLM key); use the pure helpers and fakes."""

import pytest

from mcp_crew_ai.config import AgentDef, TaskDef
from mcp_crew_ai.crews import agent_kwargs, run_crew_async


def _agent(**overrides):
    defaults = dict(
        role="Researcher",
        goal="Research.",
        backstory="Researches.",
        tools=[],
        mcps=[],
        allow_delegation=False,
        verbose=False,
    )
    defaults.update(overrides)
    return AgentDef(**defaults)


class _FakeStore:
    def __init__(self):
        self.updates = []
        self.jobs = {}

    def update(self, job_id, **fields):
        self.updates.append((job_id, fields))
        self.jobs.setdefault(job_id, {}).update(fields)
        return job_id


class _FakeCrew:
    def __init__(self, result="done", error=None):
        self._result = result
        self._error = error
        self.called_with = None

    def kickoff(self, inputs=None):
        self.called_with = inputs
        if self._error:
            raise self._error
        return self._result


def test_agent_kwargs_includes_mcps_and_tools():
    kwargs = agent_kwargs(_agent(mcps=["https://mcp.example.com"], tools=["t1"]))
    assert kwargs["mcps"] == ["https://mcp.example.com"]
    assert kwargs["tools"] == ["t1"]
    assert kwargs["allow_delegation"] is False


def test_agent_kwargs_omits_empty_tools_and_mcps():
    kwargs = agent_kwargs(_agent())
    assert "tools" not in kwargs
    assert "mcps" not in kwargs


def test_agent_kwargs_injects_llm_when_given():
    kwargs = agent_kwargs(_agent(), llm="fake-llm")
    assert kwargs["llm"] == "fake-llm"


def test_agent_kwargs_omits_llm_when_none():
    kwargs = agent_kwargs(_agent())
    assert "llm" not in kwargs


def test_runner_completes(monkeypatch):
    store = _FakeStore()
    crew = _FakeCrew(result="great report")
    run_crew_async("j1", lambda: crew, store, inputs={"topic": "x"})
    _join_threads()
    assert store.jobs["j1"]["status"] == "completed"
    assert store.jobs["j1"]["result"] == "great report"
    assert crew.called_with == {"topic": "x"}


def test_runner_marks_failed_on_build_error(monkeypatch):
    store = _FakeStore()

    def boom():
        raise RuntimeError("OPENAI_API_KEY is required")

    run_crew_async("j2", boom, store, inputs={})
    _join_threads()
    assert store.jobs["j2"]["status"] == "failed"
    assert "OPENAI_API_KEY" in store.jobs["j2"]["error"]


def test_runner_marks_failed_on_kickoff_error(monkeypatch):
    store = _FakeStore()
    crew = _FakeCrew(error=ValueError("model timeout"))
    run_crew_async("j3", lambda: crew, store, inputs={})
    _join_threads()
    assert store.jobs["j3"]["status"] == "failed"
    assert "model timeout" in store.jobs["j3"]["error"]


def _join_threads():
    import threading

    for thread in list(threading.enumerate()):
        if thread.name.startswith("crew-") and thread is not threading.current_thread():
            thread.join(timeout=5)


def test_process_enum_rejects_invalid():
    from crewai import Process

    with pytest.raises(ValueError):
        Process("parallel")
    assert Process("sequential") != Process("hierarchical")
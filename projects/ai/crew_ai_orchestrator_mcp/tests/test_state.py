"""Unit tests for the in-memory job store."""

from mcp_crew_ai.state import JobStatus, JobStore


def test_create_get_roundtrip():
    store = JobStore()
    job = store.create("abc", "topic", "sequential")
    assert store.get("abc") is job
    assert job.status is JobStatus.PENDING
    assert job.completed_at is None


def test_get_missing_returns_none():
    assert JobStore().get("nope") is None


def test_update_fields():
    store = JobStore()
    store.create("abc", "topic", "sequential")
    store.update("abc", status="running", result="ok")
    job = store.get("abc")
    assert job.status is JobStatus.RUNNING
    assert job.result == "ok"


def test_update_invalid_status_raises():
    import pytest

    store = JobStore()
    store.create("abc", "topic", "sequential")
    with pytest.raises(ValueError):
        store.update("abc", status="bogus")


def test_update_missing_returns_none():
    assert JobStore().update("nope", status="running") is None
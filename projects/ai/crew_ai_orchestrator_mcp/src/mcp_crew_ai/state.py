"""In-memory job state shared between tools and background crew runners."""

from __future__ import annotations

import datetime
import threading
from dataclasses import dataclass, field
from enum import Enum


class JobStatus(str, Enum):
    PENDING = "pending"
    RUNNING = "running"
    COMPLETED = "completed"
    FAILED = "failed"


def _now_utc() -> str:
    return datetime.datetime.now(datetime.timezone.utc).isoformat(timespec="seconds")


@dataclass
class Job:
    job_id: str
    topic: str
    process: str
    status: JobStatus = JobStatus.PENDING
    created_at: str = field(default_factory=_now_utc)
    completed_at: str | None = None
    result: str | None = None
    error: str | None = None


class JobStore:
    """Thread-safe mapping of ``job_id`` -> :class:`Job`."""

    def __init__(self) -> None:
        self._jobs: dict[str, Job] = {}
        self._lock = threading.Lock()

    def create(self, job_id: str, topic: str, process: str) -> Job:
        job = Job(job_id=job_id, topic=topic, process=process)
        with self._lock:
            self._jobs[job_id] = job
        return job

    def get(self, job_id: str) -> Job | None:
        with self._lock:
            return self._jobs.get(job_id)

    def update(self, job_id: str, **fields: object) -> Job | None:
        with self._lock:
            job = self._jobs.get(job_id)
            if job is None:
                return None
            for key, value in fields.items():
                if value is None:
                    continue
                if key == "status" and not isinstance(value, JobStatus):
                    value = JobStatus(value)
                setattr(job, key, value)
            return job
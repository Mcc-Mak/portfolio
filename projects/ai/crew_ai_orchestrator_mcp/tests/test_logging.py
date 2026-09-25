"""Unit tests for the rotated file logging handler."""

import logging
import re

from mcp_crew_ai.logging_setup import TimestampedRotatingFileHandler, setup_logging

_TS = re.compile(r"\.\d{14}$")


def _rotated_names(tmp_path):
    return sorted(p.name for p in tmp_path.iterdir() if p.suffix and _TS.search(p.name) and p.name.startswith("app.log"))


def test_rotates_to_timestamped_names(tmp_path):
    log_path = tmp_path / "app.log"
    handler = TimestampedRotatingFileHandler(str(log_path), max_bytes=100, backup_count=5)
    logger = logging.getLogger("test_rotator")
    logger.addHandler(handler)
    logger.setLevel(logging.INFO)
    for _ in range(40):
        logger.info("x" * 40)
    handler.close()
    logger.removeHandler(handler)

    backups = _rotated_names(tmp_path)
    assert backups, "expected at least one rotated backup"
    assert all(_TS.search(name) for name in backups)
    assert len(backups) <= 5


def test_prunes_to_backup_count(tmp_path):
    log_path = tmp_path / "app.log"
    handler = TimestampedRotatingFileHandler(str(log_path), max_bytes=50, backup_count=2)
    logger = logging.getLogger("test_prune")
    logger.addHandler(handler)
    logger.setLevel(logging.INFO)
    for _ in range(100):
        logger.info("y" * 30)
    handler.close()
    logger.removeHandler(handler)
    assert len(_rotated_names(tmp_path)) <= 2


def test_setup_logging_writes_to_file(tmp_path):
    log_file = tmp_path / "server.log"
    setup_logging(str(log_file), level="INFO")
    logging.getLogger("test_setup").info("hello from setup")
    assert (tmp_path / "server.log").exists()
    assert "hello from setup" in (tmp_path / "server.log").read_text(encoding="utf-8")
"""Rotating file logging for the orchestrator.

All server progress and logs are written to a single log file
(``/tmp/crew-ai-orchestrator.log`` by default). On rotation the live file is
renamed to ``<file>.yyyymmddhhmmss`` (UTC) and at most ``backup_count`` rotated
files are kept. The file handler mirrors the stderr handler — never stdout,
which belongs to the MCP JSON-RPC transport under stdio.
"""

from __future__ import annotations

import datetime
import glob
import logging
import os
import re
from typing import Any

LOG_FILE_DEFAULT = "/tmp/crew-ai-orchestrator.log"
BACKUP_COUNT_DEFAULT = 7
MAX_BYTES_DEFAULT = 5 * 1024 * 1024
_TIMESTAMP_RE = re.compile(r"\.\d{14}$")


def _utc_stamp() -> str:
    return datetime.datetime.now(datetime.timezone.utc).strftime("%Y%m%d%H%M%S")


class TimestampedRotatingFileHandler(logging.FileHandler):
    """File handler that rotates to ``<file>.<yyyymmddhhmmss>`` backups.

    Functions like :class:`logging.handlers.RotatingFileHandler` (roll after
    ``max_bytes``) but renames rotated files to a UTC timestamp suffix and
    prunes to at most ``backup_count`` rotated files.
    """

    def __init__(
        self,
        filename: str,
        mode: str = "a",
        encoding: str | None = "utf-8",
        delay: bool = False,
        *,
        max_bytes: int = MAX_BYTES_DEFAULT,
        backup_count: int = BACKUP_COUNT_DEFAULT,
    ) -> None:
        if max_bytes < 1:
            raise ValueError("max_bytes must be >= 1")
        if backup_count < 1:
            raise ValueError("backup_count must be >= 1")
        self.max_bytes = max_bytes
        self.backup_count = backup_count
        super().__init__(filename, mode=mode, encoding=encoding, delay=delay)

    def emit(self, record: logging.LogRecord) -> None:
        try:
            if self.max_bytes > 0:
                size = os.path.getsize(self.baseFilename) if os.path.exists(self.baseFilename) else 0
                if size + len(self.format(record)) + 1 >= self.max_bytes:
                    self.doRollover()
        except Exception:
            self.handleError(record)
            return
        super().emit(record)

    def doRollover(self) -> None:
        if self.stream:
            self.stream.close()
            self.stream = None
        try:
            if os.path.exists(self.baseFilename):
                os.rename(self.baseFilename, f"{self.baseFilename}.{_utc_stamp()}")
        except OSError:
            pass
        self._prune()
        if not self.delay:
            self.stream = self._open()

    def _prune(self) -> None:
        dirname = os.path.dirname(self.baseFilename) or "."
        base = os.path.basename(self.baseFilename)
        rotated = sorted(p for p in glob.glob(os.path.join(dirname, f"{base}.*")) if _TIMESTAMP_RE.search(p))
        for stale in rotated[: len(rotated) - self.backup_count]:
            try:
                os.remove(stale)
            except OSError:
                pass


def setup_logging(log_file: str = LOG_FILE_DEFAULT, level: str = "INFO") -> logging.Logger:
    """Configure the root logger with a rotated file handler + stderr mirror."""
    root = logging.getLogger()
    root.handlers.clear()
    root.setLevel(getattr(logging, level.upper(), logging.INFO))
    fmt = logging.Formatter("%(asctime)s %(levelname)s %(name)s: %(message)s")
    os.makedirs(os.path.dirname(log_file) or ".", exist_ok=True)
    file_handler = TimestampedRotatingFileHandler(log_file)
    file_handler.setFormatter(fmt)
    root.addHandler(file_handler)
    stream_handler = logging.StreamHandler()
    stream_handler.setFormatter(fmt)
    root.addHandler(stream_handler)
    return root
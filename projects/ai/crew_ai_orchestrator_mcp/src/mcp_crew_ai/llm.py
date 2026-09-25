"""LLM selection for crew agents: OpenAI by default, OpenCode Zen fallback.

CrewAI agents default to an OpenAI model driven by ``OPENAI_API_KEY``. When
that variable is missing the server falls back to OpenCode's default gateway
models (e.g. ``big-pickle`` — free for a limited time — or
``deepseek-v4.1-flash``) served by OpenCode Zen at
``https://opencode.ai/zen/v1``. The Zen key is read from ``OPENCODE_API_KEY``
else from the ``opencode`` entry of ``~/.local/share/opencode/auth.json``
(the file written by ``opencode auth login``).

The pure helpers here are unit-testable without importing CrewAI; the actual
``crewai.LLM`` object is constructed lazily in ``crews.build_crew``.
"""

from __future__ import annotations

import json
import os
from collections.abc import Mapping
from pathlib import Path
from typing import Any

OPENAI_KEY_ENV = "OPENAI_API_KEY"
OPENCODE_KEY_ENV = "OPENCODE_API_KEY"
OPENCODE_AUTH_FILE_ENV = "OPENCODE_AUTH_FILE"
OPENCODE_FALLBACK_MODEL_ENV = "OPENCODE_FALLBACK_MODEL"
OPENCODE_ZEN_BASE_URL = "https://opencode.ai/zen/v1"
OPENCODE_FALLBACK_MODELS = ("big-pickle", "deepseek-v4.1-flash")
OPENCODE_AUTH_FILE_DEFAULT = "~/.local/share/opencode/auth.json"
OPENCODE_AUTH_KEY = "opencode"


class LLMConfigError(RuntimeError):
    """Raised when no usable LLM credentials are available for a crew."""


def _environ(environ: Mapping[str, str] | None) -> Mapping[str, str]:
    return os.environ if environ is None else environ


def _get_env(environ: Mapping[str, str] | None, key: str) -> str:
    return (_environ(environ).get(key) or "").strip()


def has_openai_key(environ: Mapping[str, str] | None = None) -> bool:
    """True when ``OPENAI_API_KEY`` is set, so CrewAI's default applies."""
    return bool(_get_env(environ, OPENAI_KEY_ENV))


def zen_api_key(environ: Mapping[str, str] | None = None) -> str | None:
    """Return the OpenCode Zen API key, if any.

    Checked in order: ``OPENCODE_API_KEY`` env, then the ``opencode`` entry of
    the OpenCode auth file (``~/.local/share/opencode/auth.json`` by default,
    override the path with ``OPENCODE_AUTH_FILE``).
    """
    env = _environ(environ)
    key = _get_env(env, OPENCODE_KEY_ENV)
    if key:
        return key
    path = Path(env.get(OPENCODE_AUTH_FILE_ENV) or OPENCODE_AUTH_FILE_DEFAULT).expanduser()
    try:
        data = json.loads(path.read_text(encoding="utf-8"))
    except (OSError, ValueError):
        return None
    value = data.get(OPENCODE_AUTH_KEY)
    if isinstance(value, dict):
        value = value.get("key")
    return value if isinstance(value, str) and value.strip() else None


def fallback_model(environ: Mapping[str, str] | None = None) -> str:
    """Pick the OpenCode Zen model to use for the fallback.

    ``OPENCODE_FALLBACK_MODEL`` wins when set; otherwise the first entry of
    :data:`OPENCODE_FALLBACK_MODELS` (``big-pickle``).
    """
    return _get_env(environ, OPENCODE_FALLBACK_MODEL_ENV) or OPENCODE_FALLBACK_MODELS[0]


def resolve_llm_spec(environ: Mapping[str, str] | None = None) -> dict[str, Any] | None:
    """Return the kwargs for a fallback ``crewai.LLM``, or ``None`` to keep
    CrewAI's default (OpenAI) LLM.

    Raises :class:`LLMConfigError` when neither an OpenAI key nor an OpenCode
    Zen key is configured, so the caller can record an informative failure.
    """
    if has_openai_key(environ):
        return None
    key = zen_api_key(environ)
    if not key:
        raise LLMConfigError(
            "no LLM credentials: set OPENAI_API_KEY, or run 'opencode auth "
            "login' and use the OpenCode Zen fallback "
            f"({OPENCODE_ZEN_BASE_URL})"
        )
    return {
        "model": fallback_model(environ),
        "base_url": OPENCODE_ZEN_BASE_URL,
        "api_key": key,
    }


def llm_backend_summary(environ: Mapping[str, str] | None = None) -> str:
    """Human-readable description of which LLM backend will serve crews."""
    if has_openai_key(environ):
        return f"openai ({OPENAI_KEY_ENV} set)"
    if zen_api_key(environ):
        return f"opencode zen fallback: {fallback_model(environ)}"
    return "none (no credentials; workflows will fail per job)"
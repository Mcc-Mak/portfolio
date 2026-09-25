"""Unit tests for LLM selection: OpenAI default vs OpenCode Zen fallback."""

import json
import os

import pytest

from mcp_crew_ai import llm as llm_mod
from mcp_crew_ai.llm import LLMConfigError


def _env(**overrides):
    env = {k: v for k, v in os.environ.items()}
    env.update(overrides)
    return env


def test_has_openai_key_true():
    assert llm_mod.has_openai_key(_env(OPENAI_API_KEY="sk-123"))


def test_has_openai_key_false():
    assert not llm_mod.has_openai_key(_env(OPENAI_API_KEY=""))


def test_zen_api_key_prefers_env():
    key = llm_mod.zen_api_key(_env(OPENCODE_API_KEY="env-key"))
    assert key == "env-key"


def test_zen_api_key_from_auth_file(tmp_path):
    auth = tmp_path / "auth.json"
    auth.write_text(json.dumps({"opencode": "file-key"}), encoding="utf-8")
    env = _env(OPENCODE_AUTH_FILE=str(auth))
    assert llm_mod.zen_api_key(env) == "file-key"


def test_zen_api_key_auth_file_entry_is_dict(tmp_path):
    auth = tmp_path / "auth.json"
    auth.write_text(json.dumps({"opencode": {"type": "api", "key": "dict-key"}}), encoding="utf-8")
    env = _env(OPENCODE_AUTH_FILE=str(auth))
    assert llm_mod.zen_api_key(env) == "dict-key"


def test_zen_api_key_missing_env_and_file(tmp_path):
    env = _env(OPENCODE_AUTH_FILE=str(tmp_path / "nope.json"))
    assert llm_mod.zen_api_key(env) is None


def test_zen_api_key_invalid_auth_file(tmp_path):
    auth = tmp_path / "auth.json"
    auth.write_text("not json", encoding="utf-8")
    env = _env(OPENCODE_AUTH_FILE=str(auth))
    assert llm_mod.zen_api_key(env) is None


def test_fallback_model_defaults_to_big_pickle():
    assert llm_mod.fallback_model(_env()) == "big-pickle"


def test_fallback_model_env_override():
    env = _env(OPENCODE_FALLBACK_MODEL="deepseek-v4.1-flash")
    assert llm_mod.fallback_model(env) == "deepseek-v4.1-flash"


def test_resolve_spec_none_with_openai_key():
    env = _env(OPENAI_API_KEY="sk-123", OPENCODE_API_KEY="other")
    assert llm_mod.resolve_llm_spec(env) is None


def test_resolve_spec_uses_zen_key(tmp_path):
    auth = tmp_path / "auth.json"
    auth.write_text(json.dumps({"opencode": "zen-key"}), encoding="utf-8")
    env = _env(OPENCODE_AUTH_FILE=str(auth))
    spec = llm_mod.resolve_llm_spec(env)
    assert spec == {
        "model": "big-pickle",
        "base_url": llm_mod.OPENCODE_ZEN_BASE_URL,
        "api_key": "zen-key",
    }


def test_resolve_spec_raises_without_credentials(tmp_path):
    env = _env(OPENCODE_AUTH_FILE=str(tmp_path / "nope.json"))
    with pytest.raises(LLMConfigError, match="no LLM credentials"):
        llm_mod.resolve_llm_spec(env)


def test_llm_backend_summary_variants(tmp_path):
    assert llm_mod.llm_backend_summary(_env(OPENAI_API_KEY="sk-123")).startswith("openai")
    auth = tmp_path / "auth.json"
    auth.write_text(json.dumps({"opencode": "k"}), encoding="utf-8")
    summary = llm_mod.llm_backend_summary(_env(OPENCODE_AUTH_FILE=str(auth)))
    assert "opencode zen fallback: big-pickle" in summary
    none_env = _env(OPENCODE_AUTH_FILE=str(tmp_path / "nope.json"))
    assert "none" in llm_mod.llm_backend_summary(none_env)
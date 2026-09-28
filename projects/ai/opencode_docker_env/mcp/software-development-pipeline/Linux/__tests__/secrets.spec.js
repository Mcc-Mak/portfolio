'use strict';

const { scanForSecrets, redact, REDACTED } = require('../src/secrets');

describe('scanForSecrets', () => {
  it('finds hardcoded passwords', () => {
    const hits = scanForSecrets('const password = "hunter2";');
    expect(hits.length).toBeGreaterThan(0);
    expect(hits[0].key.toLowerCase()).toBe('password');
  });

  it('finds api keys and tokens', () => {
    expect(scanForSecrets('token: "abc123"').length).toBeGreaterThan(0);
  });

  it('returns no hits for clean text', () => {
    expect(scanForSecrets('const x = 1;')).toHaveLength(0);
  });

  it('rejects non-strings', () => {
    expect(() => scanForSecrets(123)).toThrow(TypeError);
  });
});

describe('redact', () => {
  it('replaces secret values', () => {
    const out = redact('api_key = "supersecret"');
    expect(out).not.toContain('supersecret');
    expect(out).toContain(REDACTED);
  });

  it('returns clean text unchanged', () => {
    expect(redact('no secrets here')).toBe('no secrets here');
  });
});

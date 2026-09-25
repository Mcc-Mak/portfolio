'use strict';

const { MAX_ORIGIN_LENGTH, normalizeOrigin, isAllowedOrigin, buildCorsHeaders } = require('../src/cors');

describe('normalizeOrigin', () => {
  it('normalizes an origin to scheme://host', () => {
    expect(normalizeOrigin('https://example.com:8443')).toBe('https://example.com:8443');
    expect(normalizeOrigin('http://example.com')).toBe('http://example.com');
  });

  it('rejects non-http schemes', () => {
    expect(() => normalizeOrigin('file:///etc/passwd')).toThrow(RangeError);
    expect(() => normalizeOrigin('javascript:alert(1)')).toThrow(RangeError);
  });

  it('rejects credentials, paths, queries, and fragments', () => {
    expect(() => normalizeOrigin('https://user:pass@example.com')).toThrow(RangeError);
    expect(() => normalizeOrigin('https://example.com/path')).toThrow(RangeError);
    expect(() => normalizeOrigin('https://example.com?x=1')).toThrow(RangeError);
    expect(() => normalizeOrigin('https://example.com#frag')).toThrow(RangeError);
  });

  it('rejects malformed and over-long origins', () => {
    expect(() => normalizeOrigin('not a url')).toThrow(RangeError);
    expect(() => normalizeOrigin('')).toThrow(TypeError);
    expect(() => normalizeOrigin('h'.repeat(MAX_ORIGIN_LENGTH + 1))).toThrow(TypeError);
  });
});

describe('isAllowedOrigin', () => {
  it('matches an exact origin in the allowlist', () => {
    expect(isAllowedOrigin('https://app.example.com', ['https://app.example.com'])).toBe(true);
    expect(isAllowedOrigin('https://evil.example.com', ['https://app.example.com'])).toBe(false);
  });

  it('supports a wildcard allowlist entry', () => {
    expect(isAllowedOrigin('https://anything.example.com', ['*'])).toBe(true);
  });

  it('compares normalized forms', () => {
    expect(isAllowedOrigin('https://example.com/', ['https://example.com'])).toBe(true);
  });

  it('rejects a non-array allowlist', () => {
    expect(() => isAllowedOrigin('https://example.com', 'https://example.com')).toThrow(TypeError);
  });
});

describe('buildCorsHeaders', () => {
  it('returns null for a disallowed origin', () => {
    expect(buildCorsHeaders('https://evil.example.com', ['https://app.example.com'])).toBeNull();
  });

  it('echoes the allowed origin with a Vary header', () => {
    const headers = buildCorsHeaders('https://app.example.com', ['https://app.example.com']);
    expect(headers['Access-Control-Allow-Origin']).toBe('https://app.example.com');
    expect(headers.Vary).toBe('Origin');
  });

  it('uses a wildcard only when credentials are disabled', () => {
    expect(buildCorsHeaders('https://a.example.com', ['*'], { credentials: false })['Access-Control-Allow-Origin']).toBe('*');
    const cred = buildCorsHeaders('https://a.example.com', ['*'], { credentials: true });
    expect(cred['Access-Control-Allow-Origin']).toBe('https://a.example.com');
    expect(cred['Access-Control-Allow-Credentials']).toBe('true');
  });

  it('renders allowed methods and exposed headers', () => {
    const headers = buildCorsHeaders('https://app.example.com', ['https://app.example.com'], {
      methods: ['GET', 'POST'],
      exposedHeaders: ['X-Request-Id']
    });
    expect(headers['Access-Control-Allow-Methods']).toBe('GET, POST');
    expect(headers['Access-Control-Expose-Headers']).toBe('X-Request-Id');
  });
});

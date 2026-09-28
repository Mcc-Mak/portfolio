'use strict';

const { isAllowedHost, assertHostHeader, LOCALHOST_NAMES } = require('../src/host');

const ALLOWED = new Set(['api.example.com', '*.internal.example', 'legacy.example']);

describe('isAllowedHost', () => {
  it('accepts exact matches', () => {
    expect(isAllowedHost('api.example.com', ALLOWED)).toBe(true);
  });

  it('accepts wildcard matches', () => {
    expect(isAllowedHost('svc.internal.example', ALLOWED)).toBe(true);
    expect(isAllowedHost('a.b.internal.example', ALLOWED)).toBe(true);
  });

  it('rejects hostnames outside the allowlist', () => {
    expect(isAllowedHost('evil.example.com', ALLOWED)).toBe(false);
  });

  it('rejects IP addresses and localhost', () => {
    expect(isAllowedHost('127.0.0.1', ALLOWED)).toBe(false);
    expect(isAllowedHost('10.0.0.5', ALLOWED)).toBe(false);
    for (const host of LOCALHOST_NAMES) {
      expect(isAllowedHost(host, ALLOWED)).toBe(false);
    }
  });

  it('rejects invalid hostname characters', () => {
    expect(isAllowedHost('api.example.com/path', ALLOWED)).toBe(false);
    expect(isAllowedHost('api.example.com:8080', ALLOWED)).toBe(false);
  });

  it('rejects non-string and oversized hosts', () => {
    expect(isAllowedHost(42, ALLOWED)).toBe(false);
    expect(isAllowedHost('a'.repeat(300), ALLOWED)).toBe(false);
  });

  it('throws on non-Set allowlists', () => {
    expect(() => isAllowedHost('api.example.com', ['api.example.com'])).toThrow(TypeError);
    expect(() => isAllowedHost('api.example.com', new Set())).toThrow(TypeError);
  });
});

describe('assertHostHeader', () => {
  it('accepts an allowed host with port', () => {
    expect(assertHostHeader('api.example.com:443', ALLOWED)).toBe('api.example.com');
  });

  it('accepts an allowed host without port', () => {
    expect(assertHostHeader('legacy.example', ALLOWED)).toBe('legacy.example');
  });

  it('parses IPv6-style host brackets', () => {
    expect(assertHostHeader('[api.example.com]:8080', ALLOWED)).toBe('api.example.com');
  });

  it('rejects hosts outside the allowlist', () => {
    expect(() => assertHostHeader('evil.example.com', ALLOWED)).toThrow(RangeError);
  });

  it('rejects empty and oversized headers', () => {
    expect(() => assertHostHeader('', ALLOWED)).toThrow(TypeError);
    expect(() => assertHostHeader('a'.repeat(300), ALLOWED)).toThrow(RangeError);
  });

  it('rejects IP-based host headers', () => {
    expect(() => assertHostHeader('127.0.0.1', ALLOWED)).toThrow(RangeError);
  });
});
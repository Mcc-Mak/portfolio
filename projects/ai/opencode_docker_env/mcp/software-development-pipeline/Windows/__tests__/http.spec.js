'use strict';

const {
  DEFAULT_SECURITY_HEADERS,
  MAX_HEADER_VALUE_LENGTH,
  sanitizeHeaderValue,
  buildSecurityHeaders,
  safeJsonParse
} = require('../src/http');

describe('sanitizeHeaderValue', () => {
  it('strips CRLF and null bytes to block header injection', () => {
    expect(sanitizeHeaderValue("value\r\nX-Evil: 1")).toBe('value X-Evil: 1');
    expect(sanitizeHeaderValue('a\u0000b')).toBe('a b');
  });

  it('trims surrounding whitespace', () => {
    expect(sanitizeHeaderValue('  padded  ')).toBe('padded');
  });

  it('truncates over-long values', () => {
    expect(sanitizeHeaderValue('x'.repeat(MAX_HEADER_VALUE_LENGTH + 100)).length).toBe(
      MAX_HEADER_VALUE_LENGTH
    );
  });

  it('rejects non-strings', () => {
    expect(() => sanitizeHeaderValue(42)).toThrow(TypeError);
  });
});

describe('buildSecurityHeaders', () => {
  it('returns defaults when no extras are given', () => {
    const headers = buildSecurityHeaders();
    expect(headers['X-Content-Type-Options']).toBe('nosniff');
    expect(headers['X-Frame-Options']).toBe('DENY');
  });

  it('does not mutate the frozen defaults', () => {
    buildSecurityHeaders({ 'X-Content-Type-Options': 'sniff' });
    expect(DEFAULT_SECURITY_HEADERS['X-Content-Type-Options']).toBe('nosniff');
  });

  it('overrides and adds custom headers', () => {
    const headers = buildSecurityHeaders({ 'X-Custom': 'ok', 'X-Frame-Options': 'SAMEORIGIN' });
    expect(headers['X-Custom']).toBe('ok');
    expect(headers['X-Frame-Options']).toBe('SAMEORIGIN');
  });

  it('sanitizes injected header values', () => {
    const headers = buildSecurityHeaders({ 'X-Evil': 'a\r\nInjected: b' });
    expect(headers['X-Evil']).toBe('a Injected: b');
  });

  it('rejects non-object extras', () => {
    expect(() => buildSecurityHeaders(['x'])).toThrow(TypeError);
    expect(() => buildSecurityHeaders('x')).toThrow(TypeError);
  });
});

describe('safeJsonParse', () => {
  it('parses valid JSON', () => {
    expect(safeJsonParse('{"a":1,"b":[2,3]}')).toEqual({ a: 1, b: [2, 3] });
  });

  it('rejects prototype-pollution keys', () => {
    expect(() => safeJsonParse('{"__proto__":{"polluted":true}}')).toThrow(Error);
    expect(() => safeJsonParse('{"constructor":{"x":1}}')).toThrow(Error);
  });

  it('rejects over-deep nesting', () => {
    const deep = '{"a":'.repeat(20) + '1' + '}'.repeat(20);
    expect(() => safeJsonParse(deep)).toThrow(RangeError);
  });

  it('rejects empty input', () => {
    expect(() => safeJsonParse('')).toThrow(RangeError);
  });

  it('rejects malformed JSON with a SyntaxError', () => {
    expect(() => safeJsonParse('{not json')).toThrow(SyntaxError);
  });

  it('rejects non-strings', () => {
    expect(() => safeJsonParse(42)).toThrow(TypeError);
  });
});

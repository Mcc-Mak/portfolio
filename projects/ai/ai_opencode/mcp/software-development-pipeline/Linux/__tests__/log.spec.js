'use strict';

const { sanitizeLogValue, redactSensitive, safeLogLine } = require('../src/log');

describe('sanitizeLogValue', () => {
  it('strips control characters', () => {
    expect(sanitizeLogValue('ab\x00c')).toBe('abc');
    expect(sanitizeLogValue('a\x1bb')).toBe('ab');
  });

  it('flattens newlines and CRLF', () => {
    expect(sanitizeLogValue('a\r\nb')).toBe('a b');
  });

  it('trims and caps length', () => {
    expect(sanitizeLogValue('  x  ')).toBe('x');
    expect(sanitizeLogValue('a'.repeat(5000)).length).toBeLessThanOrEqual(2048);
  });

  it('rejects non-strings', () => {
    expect(() => sanitizeLogValue(42)).toThrow(TypeError);
  });
});

describe('redactSensitive', () => {
  it('redacts quoted password-like assignments', () => {
    expect(redactSensitive('password="supersecret"')).toContain('[REDACTED]');
    expect(redactSensitive('password="supersecret"')).not.toContain('supersecret');
  });

  it('redacts quoted api key and token assignments', () => {
    expect(redactSensitive('api_key="abcd1234"')).not.toContain('abcd1234');
    expect(redactSensitive('token="xyz789"')).not.toContain('xyz789');
  });
});

describe('safeLogLine', () => {
  it('formats a plain line', () => {
    expect(safeLogLine('info', 'request handled')).toBe('INFO request handled');
  });

  it('appends sanitized fields', () => {
    const line = safeLogLine('warn', 'auth failed', { user: 'alice' });
    expect(line).toBe('WARN auth failed user=alice');
  });

  it('redacts sensitive field values', () => {
    const line = safeLogLine('error', 'error', { password: 'hunter2' });
    expect(line).not.toContain('hunter2');
    expect(line).toContain('[REDACTED]');
  });

  it('rejects invalid levels and messages', () => {
    expect(() => safeLogLine('verbose', 'x')).toThrow(RangeError);
    expect(() => safeLogLine('info', 42)).toThrow(TypeError);
    expect(() => safeLogLine('info', 'x', 'not-an-object')).toThrow(TypeError);
  });

  it('ignores empty field keys', () => {
    expect(safeLogLine('info', 'msg', { '': 'value' })).toBe('INFO msg');
  });

  it('prevents log injection through field values', () => {
    const line = safeLogLine('info', 'msg', { input: 'x\r\nFAKE error' });
    expect(line).not.toContain('\r');
    expect(line).not.toContain('\n');
  });
});
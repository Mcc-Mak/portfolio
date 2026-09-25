'use strict';

const { sanitizeCookieValue, buildSetCookie } = require('../src/cookie');

describe('sanitizeCookieValue', () => {
  it('accepts plain cookie values', () => {
    expect(sanitizeCookieValue('abc123')).toBe('abc123');
    expect(sanitizeCookieValue('a-b_c')).toBe('a-b_c');
  });

  it('rejects disallowed characters (injection guard)', () => {
    expect(() => sanitizeCookieValue('a; b')).toThrow(RangeError);
    expect(() => sanitizeCookieValue('a b')).toThrow(RangeError);
    expect(() => sanitizeCookieValue('a"b')).toThrow(RangeError);
    expect(() => sanitizeCookieValue('a\\b')).toThrow(RangeError);
  });

  it('rejects empty and over-long values', () => {
    expect(() => sanitizeCookieValue('')).toThrow(RangeError);
    expect(() => sanitizeCookieValue('x'.repeat(4097))).toThrow(RangeError);
  });

  it('rejects non-strings', () => {
    expect(() => sanitizeCookieValue(42)).toThrow(TypeError);
  });
});

describe('buildSetCookie', () => {
  it('emits a minimal Set-Cookie line', () => {
    expect(buildSetCookie('sid', 'abc')).toBe('sid=abc');
  });

  it('adds security attributes', () => {
    const line = buildSetCookie('sid', 'abc', {
      httpOnly: true,
      secure: true,
      sameSite: 'Strict',
      path: '/',
      maxAge: 3600
    });
    expect(line).toContain('HttpOnly');
    expect(line).toContain('Secure');
    expect(line).toContain('SameSite=Strict');
    expect(line).toContain('Path=/');
    expect(line).toContain('Max-Age=3600');
  });

  it('validates the cookie name', () => {
    expect(() => buildSetCookie('', 'x')).toThrow(RangeError);
    expect(() => buildSetCookie('bad name', 'x')).toThrow(RangeError);
    expect(() => buildSetCookie('x'.repeat(65), 'x')).toThrow(RangeError);
  });

  it('validates sameSite', () => {
    expect(() => buildSetCookie('sid', 'x', { sameSite: 'Bogus' })).toThrow(RangeError);
  });

  it('validates path and maxAge', () => {
    expect(() => buildSetCookie('sid', 'x', { path: 'no-slash' })).toThrow(RangeError);
    expect(() => buildSetCookie('sid', 'x', { maxAge: -1 })).toThrow(RangeError);
    expect(() => buildSetCookie('sid', 'x', { maxAge: 1.5 })).toThrow(RangeError);
  });
});

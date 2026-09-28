'use strict';

const { generateCsrfToken, verifyCsrfToken, SECRET_MIN_BYTES } = require('../src/csrf');

const SECRET = 'x'.repeat(SECRET_MIN_BYTES);

describe('generateCsrfToken', () => {
  it('produces a dot-separated token with three parts', () => {
    const token = generateCsrfToken(SECRET, 1000);
    expect(token.split('.')).toHaveLength(3);
  });

  it('produces a unique token per call', () => {
    expect(generateCsrfToken(SECRET, 1000)).not.toBe(generateCsrfToken(SECRET, 1000));
  });

  it('rejects weak secrets', () => {
    expect(() => generateCsrfToken('short', 1000)).toThrow(TypeError);
  });

  it('rejects invalid timestamps', () => {
    expect(() => generateCsrfToken(SECRET, -5)).toThrow(RangeError);
  });
});

describe('verifyCsrfToken', () => {
  it('accepts a freshly generated token', () => {
    const token = generateCsrfToken(SECRET, 1000);
    expect(verifyCsrfToken(token, SECRET, 60000, 2000)).toBe(true);
  });

  it('rejects a token signed with a different secret', () => {
    const token = generateCsrfToken(SECRET, 1000);
    expect(verifyCsrfToken(token, 'y'.repeat(SECRET_MIN_BYTES), 60000, 2000)).toBe(false);
  });

  it('rejects an expired token', () => {
    const token = generateCsrfToken(SECRET, 1000);
    expect(verifyCsrfToken(token, SECRET, 100, 5000)).toBe(false);
  });

  it('rejects tampered and malformed tokens', () => {
    const token = generateCsrfToken(SECRET, 1000);
    const parts = token.split('.');
    parts[1] = '0'.repeat(parts[1].length);
    expect(verifyCsrfToken(parts.join('.'), SECRET, 60000, 2000)).toBe(false);
    expect(verifyCsrfToken('malformed', SECRET, 60000, 2000)).toBe(false);
    expect(verifyCsrfToken('', SECRET, 60000, 2000)).toBe(false);
    expect(verifyCsrfToken('a:b:c', SECRET, 60000, 2000)).toBe(false);
  });

  it('rejects non-string tokens', () => {
    expect(verifyCsrfToken(123, SECRET, 60000, 2000)).toBe(false);
  });
});
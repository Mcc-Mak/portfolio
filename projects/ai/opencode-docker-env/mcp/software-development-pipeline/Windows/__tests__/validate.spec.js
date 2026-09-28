'use strict';

const {
  MAX_INPUT_LENGTH,
  sanitizeString,
  isValidEmail,
  isSafeRelativePath
} = require('../src/validate');

describe('sanitizeString', () => {
  it('trims surrounding whitespace', () => {
    expect(sanitizeString('  hello  ')).toBe('hello');
  });

  it('removes control characters', () => {
    expect(sanitizeString('a\u0000b\u0001c\u007f')).toBe('abc');
  });

  it('truncates over-long input', () => {
    expect(sanitizeString('x'.repeat(2000)).length).toBe(MAX_INPUT_LENGTH);
  });

  it('rejects non-strings', () => {
    expect(() => sanitizeString(42)).toThrow(TypeError);
  });
});

describe('isValidEmail', () => {
  it('accepts valid emails', () => {
    expect(isValidEmail('a@b.co')).toBe(true);
  });

  it('rejects invalid emails', () => {
    expect(isValidEmail('not-an-email')).toBe(false);
    expect(isValidEmail('a@b')).toBe(false);
  });

  it('rejects non-strings', () => {
    expect(isValidEmail(42)).toBe(false);
  });
});

describe('isSafeRelativePath', () => {
  it('accepts simple relative paths', () => {
    expect(isSafeRelativePath('src/index.js')).toBe(true);
  });

  it('rejects path traversal', () => {
    expect(isSafeRelativePath('../secret')).toBe(false);
    expect(isSafeRelativePath('a/../../b')).toBe(false);
  });

  it('rejects absolute paths and null bytes', () => {
    expect(isSafeRelativePath('/etc/passwd')).toBe(false);
    expect(isSafeRelativePath('C:\\Windows')).toBe(false);
    expect(isSafeRelativePath('a\u0000b')).toBe(false);
  });
});

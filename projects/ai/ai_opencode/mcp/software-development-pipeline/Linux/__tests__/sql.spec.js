'use strict';

const {
  MAX_PLACEHOLDERS,
  validateIdentifier,
  buildPlaceholders,
  validateParams,
  escapeLike
} = require('../src/sql');

describe('validateIdentifier', () => {
  it('accepts plain identifiers', () => {
    expect(validateIdentifier('users')).toBe('users');
    expect(validateIdentifier('user_id')).toBe('user_id');
  });

  it('rejects identifiers with metacharacters (injection guard)', () => {
    expect(() => validateIdentifier('users; DROP TABLE users')).toThrow(RangeError);
    expect(() => validateIdentifier('a-b')).toThrow(RangeError);
    expect(() => validateIdentifier('1users')).toThrow(RangeError);
  });

  it('rejects empty and non-string input', () => {
    expect(() => validateIdentifier('')).toThrow(TypeError);
    expect(() => validateIdentifier(42)).toThrow(TypeError);
  });
});

describe('buildPlaceholders', () => {
  it('produces one ? per parameter', () => {
    expect(buildPlaceholders(0)).toBe('');
    expect(buildPlaceholders(3)).toBe('?, ?, ?');
  });

  it('rejects negative, non-integer, and over-large counts', () => {
    expect(() => buildPlaceholders(-1)).toThrow(RangeError);
    expect(() => buildPlaceholders(1.5)).toThrow(RangeError);
    expect(() => buildPlaceholders(MAX_PLACEHOLDERS + 1)).toThrow(RangeError);
  });
});

describe('validateParams', () => {
  it('accepts an array matching the placeholder count', () => {
    expect(validateParams([1, 'x', null], 3)).toEqual([1, 'x', null]);
  });

  it('rejects length mismatch', () => {
    expect(() => validateParams([1], 2)).toThrow(RangeError);
  });

  it('rejects non-arrays', () => {
    expect(() => validateParams('x', 1)).toThrow(TypeError);
  });
});

describe('escapeLike', () => {
  it('escapes LIKE wildcards for parameterized queries', () => {
    expect(escapeLike('100% done')).toBe('100\\% done');
    expect(escapeLike('a_b')).toBe('a\\_b');
    expect(escapeLike('a\\b')).toBe('a\\\\b');
  });

  it('leaves plain text unchanged', () => {
    expect(escapeLike('plain')).toBe('plain');
  });

  it('rejects non-strings', () => {
    expect(() => escapeLike(42)).toThrow(TypeError);
  });
});

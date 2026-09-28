'use strict';

const {
  TOKEN_LENGTH,
  MAX_SESSION_AGE_MS,
  generateSessionToken,
  hashSessionToken,
  isValidSessionToken,
  compareSessionTokens,
  isSessionExpired
} = require('../src/session');

describe('generateSessionToken', () => {
  it('produces a random hex token of expected length', () => {
    const token = generateSessionToken();
    expect(typeof token).toBe('string');
    expect(token.length).toBe(TOKEN_LENGTH);
    expect(token).toMatch(/^[0-9a-f]+$/);
  });

  it('produces unique tokens', () => {
    expect(generateSessionToken()).not.toBe(generateSessionToken());
  });
});

describe('hashSessionToken', () => {
  it('derives a stable sha256 hash for storage', () => {
    const token = generateSessionToken();
    expect(hashSessionToken(token).length).toBe(64);
    expect(hashSessionToken(token)).toBe(hashSessionToken(token));
  });

  it('rejects malformed tokens', () => {
    expect(() => hashSessionToken('not-hex')).toThrow(TypeError);
    expect(() => hashSessionToken(''.padEnd(TOKEN_LENGTH, 'g'))).toThrow(TypeError);
  });
});

describe('isValidSessionToken', () => {
  it('accepts a generated token', () => {
    expect(isValidSessionToken(generateSessionToken())).toBe(true);
  });

  it('rejects invalid tokens', () => {
    expect(isValidSessionToken('')).toBe(false);
    expect(isValidSessionToken('short')).toBe(false);
    expect(isValidSessionToken('g'.repeat(TOKEN_LENGTH))).toBe(false);
    expect(isValidSessionToken(42)).toBe(false);
  });
});

describe('compareSessionTokens', () => {
  it('compares equal tokens', () => {
    const token = generateSessionToken();
    expect(compareSessionTokens(token, token)).toBe(true);
  });

  it('rejects differing tokens', () => {
    expect(compareSessionTokens(generateSessionToken(), generateSessionToken())).toBe(false);
  });

  it('rejects lengths mismatch', () => {
    expect(compareSessionTokens('a', 'bb')).toBe(false);
  });

  it('rejects non-strings', () => {
    expect(() => compareSessionTokens(1, 'a')).toThrow(TypeError);
  });
});

describe('isSessionExpired', () => {
  it('returns false within the lifetime', () => {
    expect(isSessionExpired(1000, MAX_SESSION_AGE_MS, 2000)).toBe(false);
  });

  it('returns true beyond the lifetime', () => {
    expect(isSessionExpired(1000, 500, 5000)).toBe(true);
  });

  it('rejects invalid inputs', () => {
    expect(() => isSessionExpired(0, 1000, 2000)).toThrow(RangeError);
    expect(() => isSessionExpired(-1, 1000, 2000)).toThrow(RangeError);
    expect(() => isSessionExpired(1000, 0, 2000)).toThrow(RangeError);
    expect(() => isSessionExpired(1000, 1000, 0)).toThrow(RangeError);
  });
});
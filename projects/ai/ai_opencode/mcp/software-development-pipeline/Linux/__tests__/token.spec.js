'use strict';

const { generateToken, isValidToken, safeEqual, DEFAULT_BYTES, MIN_BYTES, MAX_BYTES } = require('../src/token');

describe('generateToken', () => {
  it('produces a hex token of the expected length', () => {
    const token = generateToken();
    expect(typeof token).toBe('string');
    expect(token).toMatch(/^[0-9a-f]+$/);
    expect(token).toHaveLength(DEFAULT_BYTES * 2);
  });

  it('honours an explicit byte length', () => {
    expect(generateToken(16)).toHaveLength(32);
  });

  it('produces a unique token per call', () => {
    expect(generateToken()).not.toBe(generateToken());
  });

  it('rejects byte counts outside the allowed range', () => {
    expect(() => generateToken(MIN_BYTES - 1)).toThrow(RangeError);
    expect(() => generateToken(MAX_BYTES + 1)).toThrow(RangeError);
    expect(() => generateToken(1.5)).toThrow(RangeError);
    expect(() => generateToken('32')).toThrow(RangeError);
  });
});

describe('isValidToken', () => {
  it('accepts a valid token', () => {
    expect(isValidToken(generateToken())).toBe(true);
  });

  it('rejects wrong lengths and non-hex characters', () => {
    expect(isValidToken(generateToken().slice(0, -1), DEFAULT_BYTES)).toBe(false);
    expect(isValidToken('z'.repeat(DEFAULT_BYTES * 2))).toBe(false);
    expect(isValidToken('A'.repeat(DEFAULT_BYTES * 2))).toBe(false);
  });

  it('rejects non-string and malformed byte arguments', () => {
    expect(isValidToken(123)).toBe(false);
    expect(isValidToken('deadbeef', 3)).toBe(false);
  });
});

describe('safeEqual', () => {
  it('returns true for identical strings', () => {
    expect(safeEqual('foo', 'foo')).toBe(true);
  });

  it('returns false for equal-length mismatches', () => {
    expect(safeEqual('foo', 'for')).toBe(false);
  });

  it('returns false when lengths differ', () => {
    expect(safeEqual('foo', 'fooo')).toBe(false);
  });

  it('rejects non-string arguments', () => {
    expect(() => safeEqual(1, '1')).toThrow(TypeError);
    expect(() => safeEqual('1', null)).toThrow(TypeError);
  });
});
'use strict';

const {
  MIN_SAFE,
  MAX_SAFE,
  isSafeIntegerValue,
  assertInteger,
  assertRange,
  assertNonNegative,
  withinRange,
  safeAdd,
  safeMultiply
} = require('../src/integer');

describe('isSafeIntegerValue', () => {
  it('accepts safe integers', () => {
    expect(isSafeIntegerValue(0)).toBe(true);
    expect(isSafeIntegerValue(-42)).toBe(true);
    expect(isSafeIntegerValue(MAX_SAFE)).toBe(true);
    expect(isSafeIntegerValue(MIN_SAFE)).toBe(true);
  });

  it('rejects non-integers and non-numbers', () => {
    expect(isSafeIntegerValue(1.5)).toBe(false);
    expect(isSafeIntegerValue(MAX_SAFE + 1)).toBe(false);
    expect(isSafeIntegerValue('7')).toBe(false);
    expect(isSafeIntegerValue(null)).toBe(false);
    expect(isSafeIntegerValue(undefined)).toBe(false);
    expect(isSafeIntegerValue(NaN)).toBe(false);
    expect(isSafeIntegerValue(Infinity)).toBe(false);
  });
});

describe('assertInteger', () => {
  it('returns the validated value', () => {
    expect(assertInteger(7)).toBe(7);
  });

  it('throws for non-safe-integer input', () => {
    expect(() => assertInteger(7.5)).toThrow(TypeError);
    expect(() => assertInteger(10 ** 20)).toThrow(TypeError);
    expect(() => assertInteger('7')).toThrow(TypeError);
  });
});

describe('assertRange', () => {
  it('accepts values on the inclusive bounds', () => {
    expect(assertRange(1, 1, 10)).toBe(1);
    expect(assertRange(10, 1, 10)).toBe(10);
  });

  it('throws when out of range', () => {
    expect(() => assertRange(0, 1, 10)).toThrow(RangeError);
    expect(() => assertRange(11, 1, 10)).toThrow(RangeError);
  });

  it('rejects inverted bounds', () => {
    expect(() => assertRange(5, 10, 1)).toThrow(RangeError);
  });

  it('rejects malformed bounds and values', () => {
    expect(() => assertRange('5', 1, 10)).toThrow(TypeError);
    expect(() => assertRange(5, 1.5, 10)).toThrow(TypeError);
    expect(() => assertRange(5, 1, '10')).toThrow(TypeError);
  });
});

describe('assertNonNegative', () => {
  it('accepts zero and positive integers', () => {
    expect(assertNonNegative(0)).toBe(0);
    expect(assertNonNegative(1)).toBe(1);
  });

  it('rejects negative integers', () => {
    expect(() => assertNonNegative(-1)).toThrow(RangeError);
  });
});

describe('withinRange', () => {
  it('returns a boolean without throwing', () => {
    expect(withinRange(5, 0, 10)).toBe(true);
    expect(withinRange(-1, 0, 10)).toBe(false);
    expect(withinRange('5', 0, 10)).toBe(false);
    expect(withinRange(5, '0', 10)).toBe(false);
    expect(withinRange(5, 10, 0)).toBe(false);
  });
});

describe('safeAdd', () => {
  it('adds within safe bounds', () => {
    expect(safeAdd(2, 3)).toBe(5);
    expect(safeAdd(-5, 10)).toBe(5);
  });

  it('throws on overflow', () => {
    expect(() => safeAdd(MAX_SAFE, 1)).toThrow(RangeError);
    expect(() => safeAdd(MIN_SAFE, -1)).toThrow(RangeError);
  });

  it('rejects non-integer operands', () => {
    expect(() => safeAdd(1.5, 1)).toThrow(TypeError);
    expect(() => safeAdd(1, '2')).toThrow(TypeError);
  });
});

describe('safeMultiply', () => {
  it('multiplies within safe bounds', () => {
    expect(safeMultiply(6, 7)).toBe(42);
    expect(safeMultiply(-3, 4)).toBe(-12);
  });

  it('throws on overflow', () => {
    expect(() => safeMultiply(MAX_SAFE, 2)).toThrow(RangeError);
    expect(() => safeMultiply(10 ** 10, 10 ** 10)).toThrow(RangeError);
  });

  it('rejects non-integer operands', () => {
    expect(() => safeMultiply(1.5, 2)).toThrow(TypeError);
    expect(() => safeMultiply(2, Math.PI)).toThrow(TypeError);
  });
});
'use strict';

const { MAX_PATTERN_LENGTH, analyzeRegex, assertSafeRegex } = require('../src/regex');

describe('analyzeRegex', () => {
  it('flags nested quantifiers', () => {
    const result = analyzeRegex('(a+)+');
    expect(result.risk).toBe(true);
    expect(result.reasons).toContain('nested_quantifier');
  });

  it('flags quantified unbounded repetition groups', () => {
    expect(analyzeRegex('^(\\d+)*x$').risk).toBe(true);
    expect(analyzeRegex('(ab{2,})+').risk).toBe(true);
  });

  it('flags quantified backreferences', () => {
    const result = analyzeRegex('(\\w+) \\1+');
    expect(result.risk).toBe(true);
    expect(result.reasons).toContain('quantified_backreference');
  });

  it('flags alternation groups with overlapping first characters', () => {
    const result = analyzeRegex('(a|aa)+$');
    expect(result.risk).toBe(true);
    expect(result.reasons).toContain('ambiguous_alternation');
  });

  it('does not flag disjoint alternations', () => {
    const result = analyzeRegex('(cat|dog)+');
    expect(result.risk).toBe(false);
  });

  it('does not flag simple patterns', () => {
    expect(analyzeRegex('^[a-z]+$').risk).toBe(false);
    expect(analyzeRegex('\\d{2,4}').risk).toBe(false);
    expect(analyzeRegex('(a+)?b').risk).toBe(false);
  });

  it('does not flag escaped literal metacharacters', () => {
    expect(analyzeRegex('\\(a\\+\\)\\+').risk).toBe(false);
  });

  it('respects the maximum reason count', () => {
    const result = analyzeRegex('(a+)+ (b+)+ (c+)+');
    expect(result.reasons.length).toBeLessThanOrEqual(3);
  });

  it('rejects invalid pattern input', () => {
    expect(() => analyzeRegex('')).toThrow(TypeError);
    expect(() => analyzeRegex(null)).toThrow(TypeError);
    expect(() => analyzeRegex('x'.repeat(MAX_PATTERN_LENGTH + 1))).toThrow(RangeError);
    expect(() => analyzeRegex('x\u0000y')).toThrow(RangeError);
  });
});

describe('assertSafeRegex', () => {
  it('compiles and returns a RegExp for a safe pattern', () => {
    const re = assertSafeRegex('^[A-Z]\\d{2}$');
    expect(re).toBeInstanceOf(RegExp);
    expect(re.test('A12')).toBe(true);
  });

  it('throws for a ReDoS-vulnerable pattern', () => {
    expect(() => assertSafeRegex('(a+)+')).toThrow(RangeError);
    expect(() => assertSafeRegex('(x|xx)*y')).toThrow(RangeError);
    expect(() => assertSafeRegex('(a)\\1+')).toThrow(RangeError);
  });

  it('throws for an invalid pattern source', () => {
    expect(() => assertSafeRegex('(')).toThrow(RangeError);
  });
});
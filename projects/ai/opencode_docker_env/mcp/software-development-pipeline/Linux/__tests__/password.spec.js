'use strict';

const {
  MAX_LENGTH,
  MIN_ENTROPY,
  COMMON_PASSWORDS,
  estimateEntropy,
  assessPassword,
  assertStrongPassword
} = require('../src/password');

describe('estimateEntropy', () => {
  it('returns 0 for an empty password', () => {
    expect(estimateEntropy('')).toBe(0);
  });

  it('rejects non-string input', () => {
    expect(() => estimateEntropy(123)).toThrow(TypeError);
  });

  it('scales with length and character classes', () => {
    const lower = estimateEntropy('abcdef');
    const mixed = estimateEntropy('abcDEF123!@');
    expect(mixed).toBeGreaterThan(lower);
  });

  it('reports entropy below the policy minimum for weak passwords', () => {
    expect(estimateEntropy('password')).toBeLessThan(MIN_ENTROPY);
  });
});

describe('assessPassword', () => {
  it('passes a strong password', () => {
    const result = assessPassword('Str0ng-Passphrase-2026!');
    expect(result.meetsPolicy).toBe(true);
    expect(result.reasons).toEqual([]);
  });

  it('flags passwords that are too short', () => {
    const result = assessPassword('Ab1!xy');
    expect(result.meetsPolicy).toBe(false);
    expect(result.reasons).toContain('too_short');
  });

  it('flags passwords that are too long', () => {
    const result = assessPassword('Ab1!' + 'x'.repeat(MAX_LENGTH));
    expect(result.reasons).toContain('too_long');
  });

  it('flags common passwords case-insensitively', () => {
    for (const common of COMMON_PASSWORDS) {
      const result = assessPassword('X' + common.toUpperCase() + '1aA!');
      expect(result.reasons).not.toContain('common_password');
    }
    expect(assessPassword('PASSWORD1!Aa').reasons).not.toContain('common_password');
    expect(assessPassword('abc123').reasons).toContain('low_entropy');
  });

  it('flags missing character classes', () => {
    const result = assessPassword('alllowercase-2026');
    expect(result.reasons).toContain('missing_character_class');
  });

  it('rejects non-string input', () => {
    expect(() => assessPassword(null)).toThrow(TypeError);
  });
});

describe('assertStrongPassword', () => {
  it('returns the password when it meets policy', () => {
    const pwd = 'Str0ng-Passphrase-2026!';
    expect(assertStrongPassword(pwd)).toBe(pwd);
  });

  it('throws for a policy-violating password', () => {
    expect(() => assertStrongPassword('password')).toThrow(RangeError);
    expect(() => assertStrongPassword('short')).toThrow(RangeError);
  });
});

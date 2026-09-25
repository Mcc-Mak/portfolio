'use strict';

const {
  ALGORITHM,
  DEFAULT_COST,
  COST_MAX,
  MAX_PASSWORD_LENGTH,
  hash,
  verify,
  parse
} = require('../src/passwordhash');

describe('hash', () => {
  it('produces a parseable scrypt hash', () => {
    const stored = hash('correct horse battery staple');
    expect(stored.startsWith('scrypt$' + DEFAULT_COST + '$')).toBe(true);
    const parsed = parse(stored);
    expect(parsed.algorithm).toBe(ALGORITHM);
    expect(parsed.cost).toBe(DEFAULT_COST);
    expect(parsed.salt.length).toBeGreaterThan(0);
    expect(parsed.derived.length).toBeGreaterThan(0);
  });

  it('is unique per salt', () => {
    const a = hash('same password');
    const b = hash('same password');
    expect(a).not.toBe(b);
  });

  it('rejects weak passwords', () => {
    expect(() => hash('short')).toThrow(RangeError);
    expect(() => hash('')).toThrow(RangeError);
    expect(() => hash('x'.repeat(MAX_PASSWORD_LENGTH + 1))).toThrow(RangeError);
  });

  it('rejects non-string passwords', () => {
    expect(() => hash(12345)).toThrow(TypeError);
    expect(() => hash(null)).toThrow(TypeError);
  });

  it('validates cost parameter', () => {
    expect(() => hash('a very long password', 1000)).toThrow(RangeError);
    expect(() => hash('a very long password', 0)).toThrow(RangeError);
    expect(() => hash('a very long password', COST_MAX * 2)).toThrow(RangeError);
  });
});

describe('verify', () => {
  it('accepts the correct password', () => {
    const stored = hash('S3cure!Password');
    expect(verify('S3cure!Password', stored)).toBe(true);
  });

  it('rejects incorrect passwords', () => {
    const stored = hash('S3cure!Password');
    expect(verify('wrong password', stored)).toBe(false);
  });

  it('rejects malformed stored hashes', () => {
    expect(verify('pw', 'garbage')).toBe(false);
    expect(verify('pw', '')).toBe(false);
    expect(verify('pw', null)).toBe(false);
  });

  it('rejects unsupported algorithms', () => {
    expect(verify('pw', 'bcrypt$12$abc$def')).toBe(false);
  });

  it('rejects tampered payload', () => {
    const stored = hash('S3cure!Password');
    const prefix = stored.slice(0, -4);
    const tampered = prefix + (prefix.endsWith('AAAA') ? 'BBBB' : 'AAAA');
    expect(verify('S3cure!Password', tampered)).toBe(false);
  });

  it('returns false for short passwords instead of throwing', () => {
    const stored = hash('S3cure!Password');
    expect(verify('short', stored)).toBe(false);
  });
});

describe('parse', () => {
  it('throws on malformed input', () => {
    expect(() => parse('')).toThrow(TypeError);
    expect(() => parse(42)).toThrow(TypeError);
    expect(() => parse('scrypt')).toThrow(RangeError);
    expect(() => parse('scrypt$notanumber$ab$cd')).toThrow(RangeError);
  });
});
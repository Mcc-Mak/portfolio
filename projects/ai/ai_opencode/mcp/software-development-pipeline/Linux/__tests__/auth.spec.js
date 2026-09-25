'use strict';

const { hashPassword, verifyPassword, PBKDF2_ITERATIONS, MAX_PASSWORD_LENGTH } = require('../src/auth');

describe('hashPassword', () => {
  it('produces a PBKDF2 formatted hash', () => {
    const hash = hashPassword('correct horse battery staple');
    expect(typeof hash).toBe('string');
    const parts = hash.split(':');
    expect(parts).toHaveLength(3);
    expect(Number(parts[0])).toBe(PBKDF2_ITERATIONS);
  });

  it('uses a random salt per call', () => {
    expect(hashPassword('same-password')).not.toBe(hashPassword('same-password'));
  });

  it('rejects non-strings', () => {
    expect(() => hashPassword(123)).toThrow(TypeError);
  });

  it('rejects empty passwords', () => {
    expect(() => hashPassword('')).toThrow(TypeError);
  });

  it('rejects over-long passwords', () => {
    expect(() => hashPassword('x'.repeat(MAX_PASSWORD_LENGTH + 1))).toThrow(RangeError);
  });
});

describe('verifyPassword', () => {
  it('accepts the correct password', () => {
    const hash = hashPassword('s3cr3t!');
    expect(verifyPassword('s3cr3t!', hash)).toBe(true);
  });

  it('rejects a wrong password', () => {
    const hash = hashPassword('s3cr3t!');
    expect(verifyPassword('wrong', hash)).toBe(false);
  });

  it('rejects malformed stored values', () => {
    expect(verifyPassword('x', 'not-a-hash')).toBe(false);
    expect(verifyPassword('x', '10:zz:zz')).toBe(false);
    expect(verifyPassword('x', '0:abc:def')).toBe(false);
    expect(verifyPassword('x', '210000:00:00')).toBe(false);
  });

  it('rejects over-long iteration counts (DoS guard)', () => {
    const bad = `${PBKDF2_ITERATIONS * 10}:aa:bb`;
    expect(verifyPassword('x', bad)).toBe(false);
  });

  it('rejects non-string arguments', () => {
    expect(() => verifyPassword(42, 'x')).toThrow(TypeError);
    expect(() => verifyPassword('x', null)).toThrow(TypeError);
  });
});

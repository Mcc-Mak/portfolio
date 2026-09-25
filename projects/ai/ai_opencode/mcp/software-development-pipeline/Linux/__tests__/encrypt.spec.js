'use strict';

const { encrypt, decrypt, IV_BYTES } = require('../src/encrypt');

const SECRET = 'a'.repeat(40);
const ORIGINAL_ENV = process.env.APP_ENC_KEY;

afterEach(() => {
  if (ORIGINAL_ENV === undefined) {
    delete process.env.APP_ENC_KEY;
  } else {
    process.env.APP_ENC_KEY = ORIGINAL_ENV;
  }
});

describe('encrypt', () => {
  it('produces a base64 payload that decrypts back to plaintext', () => {
    const payload = encrypt('top secret', SECRET);
    expect(typeof payload).toBe('string');
    expect(decrypt(payload, SECRET)).toBe('top secret');
  });

  it('produces a random IV per call', () => {
    expect(encrypt('msg', SECRET)).not.toBe(encrypt('msg', SECRET));
  });

  it('uses the IV_BYTES-length prefix', () => {
    const payload = encrypt('msg', SECRET);
    const raw = Buffer.from(payload, 'base64');
    expect(raw.length).toBeGreaterThan(IV_BYTES);
  });

  it('rejects weak secrets', () => {
    expect(() => encrypt('x', 'short')).toThrow(TypeError);
  });

  it('rejects non-string plaintext', () => {
    expect(() => encrypt(42, SECRET)).toThrow(TypeError);
  });

  it('reads the key from the environment when no secret is given', () => {
    process.env.APP_ENC_KEY = 'b'.repeat(40);
    const payload = encrypt('env-key');
    expect(decrypt(payload)).toBe('env-key');
  });

  it('throws when the environment key is absent', () => {
    delete process.env.APP_ENC_KEY;
    expect(() => encrypt('x')).toThrow();
  });
});

describe('decrypt', () => {
  it('rejects a wrong key', () => {
    const payload = encrypt('secret', SECRET);
    expect(() => decrypt(payload, 'c'.repeat(40))).toThrow(RangeError);
  });

  it('rejects tampered payloads', () => {
    const payload = encrypt('secret', SECRET);
    const raw = Buffer.from(payload, 'base64');
    raw[raw.length - 1] ^= 0xff;
    expect(() => decrypt(raw.toString('base64'), SECRET)).toThrow(RangeError);
  });

  it('rejects empty and malformed payloads', () => {
    expect(() => decrypt('', SECRET)).toThrow(TypeError);
    expect(() => decrypt('@@', SECRET)).toThrow(RangeError);
    expect(() => decrypt('YWJj', SECRET)).toThrow(RangeError);
  });
});
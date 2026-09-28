'use strict';

const {
  DEFAULT_DIGITS,
  generateSecret,
  generateCode,
  generateCodeAt,
  generateWindow,
  verifyCode,
  validateSecret,
  base32Decode,
  MAX_SECRET_LENGTH
} = require('../src/totp');

const RFC_SECRET = 'GEZDGNBVGY3TQOJQGEZDGNBVGY3TQOJQ';

describe('validateSecret', () => {
  it('accepts a valid base32 secret', () => {
    expect(validateSecret(RFC_SECRET)).toBe(RFC_SECRET);
  });

  it('accepts lower-case base32 input', () => {
    expect(validateSecret(RFC_SECRET.toLowerCase())).toBe(RFC_SECRET.toLowerCase());
  });

  it('rejects non-base32 characters', () => {
    expect(() => validateSecret('GEZDGNB-VGY3TQOJQ')).toThrow(TypeError);
  });

  it('rejects secrets that decode to fewer than 80 bits', () => {
    expect(() => validateSecret('GEZDGNBV')).toThrow(RangeError);
  });

  it('rejects empty, non-string and over-long secrets', () => {
    expect(() => validateSecret('')).toThrow(TypeError);
    expect(() => validateSecret(42)).toThrow(TypeError);
    expect(() => validateSecret('A'.repeat(MAX_SECRET_LENGTH + 1))).toThrow(TypeError);
  });
});

describe('base32Decode', () => {
  it('decodes the RFC 6238 test secret to ASCII 12345678901234567890', () => {
    expect(base32Decode(RFC_SECRET).toString('utf8')).toBe('12345678901234567890');
  });
});

describe('RFC 6238 SHA-1 test vectors (8 digits)', () => {
  const vectors = [
    [59, 1, '94287082'],
    [1111111109, 37037036, '07081804'],
    [1111111111, 37037037, '14050471'],
    [1234567890, 41152263, '89005924'],
    [2000000000, 66666666, '69279037'],
    [20000000000, 666666666, '65353130']
  ];

  it.each(vectors)('matches the vector for T=%i', (seconds, counter, expected) => {
    expect(generateCodeAt(RFC_SECRET, counter, 8)).toBe(expected);
    expect(generateCode(RFC_SECRET, seconds * 1000, 8)).toBe(expected);
  });
});

describe('generateCode', () => {
  it('produces a deterministic six-digit code for a fixed time', () => {
    const first = generateCode(RFC_SECRET, 1000000);
    expect(first).toMatch(/^[0-9]{6}$/);
    expect(generateCode(RFC_SECRET, 1000000)).toBe(first);
  });

  it('changes the code across time windows', () => {
    expect(generateCode(RFC_SECRET, 1000000)).not.toBe(generateCode(RFC_SECRET, 1030001));
  });

  it('rejects invalid digits and time', () => {
    expect(() => generateCode(RFC_SECRET, 1000, 5)).toThrow(RangeError);
    expect(() => generateCode(RFC_SECRET, 1000, 11)).toThrow(RangeError);
    expect(() => generateCode(RFC_SECRET, 'now')).toThrow(TypeError);
    expect(() => generateCode(RFC_SECRET, -5)).toThrow(TypeError);
  });
});

describe('generateCodeAt', () => {
  it('rejects non-safe-integer or negative counters', () => {
    expect(() => generateCodeAt(RFC_SECRET, -1)).toThrow(TypeError);
    expect(() => generateCodeAt(RFC_SECRET, 1.5)).toThrow(TypeError);
  });
});

describe('verifyCode', () => {
  it('accepts the current code', () => {
    const time = 1000000;
    const code = generateCode(RFC_SECRET, time);
    expect(verifyCode(RFC_SECRET, code, time)).toBe(true);
  });

  it('accepts a code within the default skew window', () => {
    const time = 1000000;
    const code = generateCode(RFC_SECRET, time + 31000);
    expect(verifyCode(RFC_SECRET, code, time)).toBe(true);
  });

  it('rejects a code outside the skew window', () => {
    const time = 1000000;
    const code = generateCode(RFC_SECRET, time + 31000);
    expect(verifyCode(RFC_SECRET, code, time, DEFAULT_DIGITS, 0)).toBe(false);
  });

  it('rejects a wrong code', () => {
    expect(verifyCode(RFC_SECRET, '000000', 1000000)).toBe(false);
  });

  it('rejects malformed codes', () => {
    expect(verifyCode(RFC_SECRET, 'abc123', 1000000)).toBe(false);
    expect(verifyCode(RFC_SECRET, '123', 1000000)).toBe(false);
  });

  it('rejects invalid skew values', () => {
    expect(() => verifyCode(RFC_SECRET, '123456', 1000, 6, 4)).toThrow(RangeError);
    expect(() => verifyCode(RFC_SECRET, '123456', 1000, 6, -1)).toThrow(RangeError);
  });
});

describe('generateWindow', () => {
  it('returns codes keyed by counter within the window', () => {
    const window = generateWindow(RFC_SECRET, 1000000, 6, 1);
    expect(Object.keys(window)).toHaveLength(3);
    expect(Object.values(window).every((c) => /^[0-9]{6}$/.test(c))).toBe(true);
  });
});

describe('generateSecret', () => {
  it('generates valid base32 secrets of the requested size', () => {
    for (const bytes of [16, 20, 32]) {
      const secret = generateSecret(bytes);
      expect(() => validateSecret(secret)).not.toThrow();
      expect(secret).toMatch(/^[A-Z2-7]+$/);
    }
  });

  it('rejects invalid sizes', () => {
    expect(() => generateSecret(8)).toThrow(RangeError);
    expect(() => generateSecret(200)).toThrow(RangeError);
  });
});

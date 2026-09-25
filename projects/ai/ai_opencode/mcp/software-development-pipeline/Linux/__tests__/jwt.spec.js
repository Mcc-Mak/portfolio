'use strict';

const { createToken, verifyToken, hasExpired, b64urlDecode, b64urlEncode } = require('../src/jwt');

const SECRET = 'a'.repeat(32);

describe('createToken', () => {
  it('creates a three-part token with iat claim', () => {
    const token = createToken({ role: 'viewer' }, SECRET);
    const parts = token.split('.');
    expect(parts).toHaveLength(3);
    const payload = JSON.parse(b64urlDecode(parts[1]).toString('utf8'));
    expect(payload.role).toBe('viewer');
    expect(Number.isInteger(payload.iat)).toBe(true);
  });

  it('rejects non-object claims', () => {
    expect(() => createToken('viewer', SECRET)).toThrow(TypeError);
  });

  it('rejects short secrets', () => {
    expect(() => createToken({ role: 'viewer' }, 'short')).toThrow(RangeError);
  });

  it('rejects oversized claims', () => {
    expect(() => createToken({ data: 'x'.repeat(5000) }, SECRET)).toThrow(RangeError);
  });
});

describe('verifyToken', () => {
  it('verifies a token signed with the same secret', () => {
    const token = createToken({ role: 'admin' }, SECRET);
    const payload = verifyToken(token, SECRET);
    expect(payload.role).toBe('admin');
  });

  it('rejects a token signed with a different secret', () => {
    const token = createToken({ role: 'admin' }, SECRET);
    expect(() => verifyToken(token, 'b'.repeat(32))).toThrow(RangeError);
  });

  it('rejects the alg=none attack', () => {
    const header = b64urlEncode(Buffer.from(JSON.stringify({ alg: 'none', typ: 'JWT' })));
    const payload = b64urlEncode(Buffer.from(JSON.stringify({ role: 'admin' })));
    const forged = header + '.' + payload + '.';
    expect(() => verifyToken(forged, SECRET)).toThrow(RangeError);
  });

  it('rejects unsupported algorithms', () => {
    const header = b64urlEncode(Buffer.from(JSON.stringify({ alg: 'RS256', typ: 'JWT' })));
    const payload = b64urlEncode(Buffer.from(JSON.stringify({ role: 'admin' })));
    const forged = header + '.' + payload + '.';
    expect(() => verifyToken(forged, SECRET)).toThrow(RangeError);
  });

  it('rejects malformed tokens', () => {
    expect(() => verifyToken('not-a-token', SECRET)).toThrow(RangeError);
    expect(() => verifyToken('', SECRET)).toThrow(TypeError);
    expect(() => verifyToken('a.b', SECRET)).toThrow(RangeError);
  });

  it('rejects tampered payloads', () => {
    const token = createToken({ role: 'admin' }, SECRET);
    const parts = token.split('.');
    const tamperedPayload = b64urlEncode(Buffer.from(JSON.stringify({ role: 'root' })));
    const attacked = parts[0] + '.' + tamperedPayload + '.' + parts[2];
    expect(() => verifyToken(attacked, SECRET)).toThrow(RangeError);
  });
});

describe('hasExpired', () => {
  it('treats tokens without exp as not expired', () => {
    expect(hasExpired({ role: 'viewer' })).toBe(false);
  });

  it('detects expiry using epoch seconds', () => {
    expect(hasExpired({ exp: 1000 }, 999)).toBe(false);
    expect(hasExpired({ exp: 1000 }, 1000)).toBe(true);
  });

  it('rejects invalid exp and now values', () => {
    expect(() => hasExpired({ exp: 'soon' })).toThrow(RangeError);
    expect(() => hasExpired({ exp: 0 }, 1000)).toThrow(RangeError);
    expect(() => hasExpired({ exp: 1000 }, 0)).toThrow(RangeError);
    expect(() => hasExpired(null)).toThrow(TypeError);
  });
});
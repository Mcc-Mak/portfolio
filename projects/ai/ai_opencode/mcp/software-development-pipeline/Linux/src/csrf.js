'use strict';

const crypto = require('crypto');

const TOKEN_BYTES = 32;
const SECRET_MIN_BYTES = 32;
const MAX_TOKEN_LENGTH = 512;

function validateSecret(secret) {
  if (typeof secret !== 'string' || secret.length < SECRET_MIN_BYTES) {
    throw new TypeError('secret must be a string of at least ' + SECRET_MIN_BYTES + ' characters');
  }
  return secret;
}

function generateCsrfToken(secret, now = Date.now()) {
  validateSecret(secret);
  const ts = Number(now);
  if (!Number.isInteger(ts) || ts <= 0) {
    throw new RangeError('now must be a positive integer');
  }
  const random = crypto.randomBytes(TOKEN_BYTES).toString('hex');
  const payload = ts + '.' + random;
  const mac = crypto.createHmac('sha256', secret).update(payload, 'utf8').digest('hex');
  return payload + '.' + mac;
}

function parseToken(token) {
  if (typeof token !== 'string' || token.length === 0 || token.length > MAX_TOKEN_LENGTH) {
    return null;
  }
  const parts = token.split('.');
  if (parts.length !== 3) {
    return null;
  }
  const [tsStr, random, mac] = parts;
  const ts = Number(tsStr);
  if (!Number.isInteger(ts) || ts <= 0) {
    return null;
  }
  if (!/^[0-9a-f]+$/.test(random) || !/^[0-9a-f]+$/.test(mac)) {
    return null;
  }
  return { ts, random, mac, payload: tsStr + '.' + random };
}

function verifyCsrfToken(token, secret, maxAgeMs = 0, now = Date.now()) {
  validateSecret(secret);
  const parsed = parseToken(token);
  if (parsed === null) {
    return false;
  }
  const n = Number(now);
  if (!Number.isInteger(n) || n <= 0) {
    throw new RangeError('now must be a positive integer');
  }
  const ageLimit = Number(maxAgeMs);
  if (!Number.isInteger(ageLimit) || ageLimit < 0) {
    throw new RangeError('maxAgeMs must be a non-negative integer');
  }
  if (ageLimit > 0 && n - parsed.ts > ageLimit) {
    return false;
  }
  const expected = crypto.createHmac('sha256', secret).update(parsed.payload, 'utf8').digest();
  const actual = Buffer.from(parsed.mac, 'hex');
  if (actual.length !== expected.length) {
    return false;
  }
  return crypto.timingSafeEqual(actual, expected);
}

module.exports = { TOKEN_BYTES, SECRET_MIN_BYTES, generateCsrfToken, verifyCsrfToken };

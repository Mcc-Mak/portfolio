'use strict';

const crypto = require('crypto');

const SUPPORTED_ALGORITHMS = new Set(['HS256', 'HS384', 'HS512']);
const DEFAULT_ALGORITHM = 'HS256';
const MAX_TOKEN_LENGTH = 8192;
const MAX_CLAIMS_LENGTH = 4096;
const MAX_CLAIMS_DEPTH = 16;
const ALGORITHM_HASHES = new Map([
  ['HS256', 'sha256'],
  ['HS384', 'sha384'],
  ['HS512', 'sha512']
]);

function hashForAlgorithm(algorithm) {
  return ALGORITHM_HASHES.get(algorithm);
}

function b64urlEncode(input) {
  return Buffer.from(input).toString('base64').replace(/\+/g, '-').replace(/\//g, '_').replace(/=+$/, '');
}

function b64urlDecode(input) {
  if (typeof input !== 'string' || !/^[A-Za-z0-9_-]+$/.test(input)) {
    throw new RangeError('invalid base64url payload');
  }
  let b64 = input.replace(/-/g, '+').replace(/_/g, '/');
  while (b64.length % 4 !== 0) {
    b64 += '=';
  }
  return Buffer.from(b64, 'base64');
}

function safeJsonParse(text) {
  let parsed;
  try {
    parsed = JSON.parse(text);
  } catch (err) {
    throw new SyntaxError('invalid JSON');
  }
  return parsed;
}

function validateClaims(value, depth = 0) {
  if (value === null || typeof value !== 'object') {
    return;
  }
  if (depth > MAX_CLAIMS_DEPTH) {
    throw new RangeError('claims nesting too deep');
  }
  const entries = Array.isArray(value)
    ? value
    : Object.entries(value);
  if (entries.length > MAX_CLAIMS_LENGTH) {
    throw new RangeError('claims exceed maximum size');
  }
  for (const entry of entries) {
    const item = Array.isArray(entry) ? entry.at(1) : entry;
    if (item !== null && typeof item === 'object') {
      validateClaims(item, depth + 1);
    }
  }
}

function assertSerializedLength(payload) {
  let json;
  try {
    json = JSON.stringify(payload);
  } catch (err) {
    throw new TypeError('claims are not JSON-serializable');
  }
  if (json.length > MAX_CLAIMS_LENGTH) {
    throw new RangeError('claims exceed maximum serialized length');
  }
  return json;
}

function signToken(header, payload, secret) {
  const hashName = hashForAlgorithm(header.alg);
  if (hashName === undefined) {
    throw new RangeError('algorithm not allowed');
  }
  const headerPart = b64urlEncode(JSON.stringify(header));
  const payloadPart = b64urlEncode(JSON.stringify(payload));
  const signingInput = headerPart + '.' + payloadPart;
  const signature = crypto.createHmac(hashName, secret).update(signingInput).digest('base64');
  return signingInput + '.' + b64urlEncode(Buffer.from(signature, 'base64'));
}

function createToken(claims, secret) {
  if (claims === null || typeof claims !== 'object' || Array.isArray(claims)) {
    throw new TypeError('claims must be an object');
  }
  if (typeof secret !== 'string' || secret.length < 16) {
    throw new RangeError('secret must be a string of at least 16 characters');
  }
  validateClaims(claims);
  assertSerializedLength(claims);
  const header = { alg: DEFAULT_ALGORITHM, typ: 'JWT' };
  const payload = JSON.parse(JSON.stringify(claims));
  const issuedAt = Math.floor(Date.now() / 1000);
  payload.iat = issuedAt;
  return signToken(header, payload, secret);
}

function verifyToken(token, secret) {
  if (typeof token !== 'string' || token.length === 0 || token.length > MAX_TOKEN_LENGTH) {
    throw new TypeError('token must be a non-empty string');
  }
  if (typeof secret !== 'string' || secret.length < 16) {
    throw new RangeError('secret must be a string of at least 16 characters');
  }
  const parts = token.split('.');
  if (parts.length !== 3) {
    throw new RangeError('malformed token');
  }
  const [headerPart, payloadPart, signaturePart] = parts;
  if (headerPart.length === 0 || payloadPart.length === 0 || signaturePart.length === 0) {
    throw new RangeError('malformed token');
  }
  let header;
  let payload;
  try {
    header = safeJsonParse(b64urlDecode(headerPart).toString('utf8'));
    payload = safeJsonParse(b64urlDecode(payloadPart).toString('utf8'));
  } catch (err) {
    throw new RangeError('malformed token');
  }
  if (header === null || typeof header !== 'object' || header.alg === undefined) {
    throw new RangeError('token header must declare an algorithm');
  }
  if (!SUPPORTED_ALGORITHMS.has(header.alg)) {
    throw new RangeError('algorithm not allowed');
  }
  validateClaims(payload);
  assertSerializedLength(payload);
  const expected = signToken(header, payload, secret);
  const actualBuf = b64urlDecode(signaturePart);
  const expectedBuf = b64urlDecode(expected.split('.')[2]);
  if (!crypto.timingSafeEqual(actualBuf, expectedBuf)) {
    throw new RangeError('signature verification failed');
  }
  return payload;
}

function hasExpired(payload, now = Math.floor(Date.now() / 1000)) {
  if (payload === null || typeof payload !== 'object') {
    throw new TypeError('payload must be an object');
  }
  if (payload.exp === undefined) {
    return false;
  }
  const exp = Number(payload.exp);
  const current = Number(now);
  if (!Number.isInteger(exp) || exp <= 0) {
    throw new RangeError('exp must be a positive integer');
  }
  if (!Number.isInteger(current) || current <= 0) {
    throw new RangeError('now must be a positive integer');
  }
  return current >= exp;
}

module.exports = {
  SUPPORTED_ALGORITHMS,
  DEFAULT_ALGORITHM,
  MAX_TOKEN_LENGTH,
  b64urlEncode,
  b64urlDecode,
  createToken,
  verifyToken,
  hasExpired
};

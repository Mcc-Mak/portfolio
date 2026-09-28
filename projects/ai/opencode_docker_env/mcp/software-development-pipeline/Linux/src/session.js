'use strict';

const crypto = require('crypto');

const TOKEN_BYTES = 32;
const TOKEN_LENGTH = TOKEN_BYTES * 2;
const MAX_SESSION_AGE_MS = 24 * 60 * 60 * 1000;

function generateSessionToken() {
  return crypto.randomBytes(TOKEN_BYTES).toString('hex');
}

function hashSessionToken(token) {
  if (typeof token !== 'string' || token.length !== TOKEN_LENGTH || !/^[0-9a-f]+$/.test(token)) {
    throw new TypeError('token must be a hexadecimal session token');
  }
  return crypto.createHash('sha256').update(token, 'utf8').digest('hex');
}

function isValidSessionToken(token) {
  if (typeof token !== 'string') {
    return false;
  }
  return token.length === TOKEN_LENGTH && /^[0-9a-f]+$/.test(token);
}

function compareSessionTokens(a, b) {
  if (typeof a !== 'string' || typeof b !== 'string') {
    throw new TypeError('tokens must be strings');
  }
  const left = Buffer.from(a, 'utf8');
  const right = Buffer.from(b, 'utf8');
  if (left.length !== right.length) {
    return false;
  }
  return crypto.timingSafeEqual(left, right);
}

function isSessionExpired(issuedAt, maxAgeMs = MAX_SESSION_AGE_MS, now = Date.now()) {
  const issued = Number(issuedAt);
  if (!Number.isInteger(issued) || issued <= 0) {
    throw new RangeError('issuedAt must be a positive integer');
  }
  const maxAge = Number(maxAgeMs);
  if (!Number.isInteger(maxAge) || maxAge <= 0) {
    throw new RangeError('maxAgeMs must be a positive integer');
  }
  const current = Number(now);
  if (!Number.isInteger(current) || current <= 0) {
    throw new RangeError('now must be a positive integer');
  }
  return current - issued > maxAge;
}

module.exports = {
  TOKEN_BYTES,
  TOKEN_LENGTH,
  MAX_SESSION_AGE_MS,
  generateSessionToken,
  hashSessionToken,
  isValidSessionToken,
  compareSessionTokens,
  isSessionExpired
};
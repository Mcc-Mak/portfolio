'use strict';

const crypto = require('crypto');

const DEFAULT_BYTES = 32;
const MIN_BYTES = 16;
const MAX_BYTES = 1024;

function generateToken(bytes = DEFAULT_BYTES) {
  if (typeof bytes !== 'number') {
    throw new RangeError('bytes must be an integer between ' + MIN_BYTES + ' and ' + MAX_BYTES);
  }
  const n = bytes;
  if (!Number.isInteger(n) || n < MIN_BYTES || n > MAX_BYTES) {
    throw new RangeError('bytes must be an integer between ' + MIN_BYTES + ' and ' + MAX_BYTES);
  }
  return crypto.randomBytes(n).toString('hex');
}

function isValidToken(token, bytes = DEFAULT_BYTES) {
  const n = Number(bytes);
  if (!Number.isInteger(n) || n < MIN_BYTES || n > MAX_BYTES) {
    return false;
  }
  if (typeof token !== 'string' || token.length !== n * 2) {
    return false;
  }
  return /^[0-9a-f]+$/.test(token);
}

function safeEqual(actual, expected) {
  if (typeof actual !== 'string' || typeof expected !== 'string') {
    throw new TypeError('expected and actual must be strings');
  }
  const a = Buffer.from(actual, 'utf8');
  const b = Buffer.from(expected, 'utf8');
  if (a.length !== b.length) {
    return false;
  }
  return crypto.timingSafeEqual(a, b);
}

module.exports = { DEFAULT_BYTES, MIN_BYTES, MAX_BYTES, generateToken, isValidToken, safeEqual };
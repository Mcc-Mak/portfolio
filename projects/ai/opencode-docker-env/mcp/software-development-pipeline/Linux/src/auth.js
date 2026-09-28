'use strict';

const crypto = require('crypto');

const PBKDF2_ITERATIONS = 210000;
const SALT_BYTES = 16;
const KEY_LENGTH = 64;
const DIGEST = 'sha512';
const MAX_PASSWORD_LENGTH = 1024;
const MAX_ITERATIONS = 1000000;

function hashPassword(password) {
  if (typeof password !== 'string' || password.length === 0) {
    throw new TypeError('password must be a non-empty string');
  }
  if (password.length > MAX_PASSWORD_LENGTH) {
    throw new RangeError('password exceeds maximum length');
  }
  const salt = crypto.randomBytes(SALT_BYTES);
  const derived = crypto.pbkdf2Sync(password, salt, PBKDF2_ITERATIONS, KEY_LENGTH, DIGEST);
  const parts = [String(PBKDF2_ITERATIONS), salt.toString('hex'), derived.toString('hex')];
  return parts.join(':');
}

function verifyPassword(password, stored) {
  if (typeof password !== 'string' || password.length === 0) {
    throw new TypeError('password must be a non-empty string');
  }
  if (typeof stored !== 'string' || stored.length === 0) {
    throw new TypeError('stored must be a non-empty string');
  }
  const parts = stored.split(':');
  if (parts.length !== 3) {
    return false;
  }
  const [iterationsStr, saltHex, hashHex] = parts;
  const iterations = Number(iterationsStr);
  if (!Number.isInteger(iterations) || iterations <= 0 || iterations > MAX_ITERATIONS) {
    return false;
  }
  const salt = Buffer.from(saltHex, 'hex');
  const expected = Buffer.from(hashHex, 'hex');
  if (salt.length === 0 || expected.length === 0) {
    return false;
  }
  const derived = crypto.pbkdf2Sync(password, salt, iterations, expected.length, DIGEST);
  if (derived.length !== expected.length) {
    return false;
  }
  return crypto.timingSafeEqual(derived, expected);
}

module.exports = {
  PBKDF2_ITERATIONS,
  MAX_PASSWORD_LENGTH,
  hashPassword,
  verifyPassword
};

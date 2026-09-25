'use strict';

const crypto = require('crypto');

const ALGORITHM = 'aes-256-gcm';
const IV_BYTES = 12;
const AUTH_TAG_BYTES = 16;
const MAX_PLAINTEXT_BYTES = 1024 * 1024;
const KEY_ENV = 'APP_ENC_KEY';

function deriveKey(secret) {
  if (typeof secret !== 'string' || secret.length < 32) {
    throw new TypeError('secret must be a string of at least 32 characters');
  }
  return crypto.createHash('sha256').update(secret, 'utf8').digest();
}

function getKey() {
  const secret = process.env.APP_ENC_KEY;
  if (typeof secret !== 'string' || secret.length < 32) {
    throw new Error('missing required ' + KEY_ENV + ' environment variable');
  }
  return deriveKey(secret);
}

function encrypt(plaintext, secret) {
  if (typeof plaintext !== 'string') {
    throw new TypeError('plaintext must be a string');
  }
  if (Buffer.byteLength(plaintext, 'utf8') > MAX_PLAINTEXT_BYTES) {
    throw new RangeError('plaintext exceeds maximum size');
  }
  const key = secret === undefined ? getKey() : deriveKey(secret);
  const iv = crypto.randomBytes(IV_BYTES);
  const cipher = crypto.createCipheriv(ALGORITHM, key, iv);
  const encrypted = Buffer.concat([cipher.update(plaintext, 'utf8'), cipher.final()]);
  const tag = cipher.getAuthTag();
  const payload = Buffer.concat([iv, tag, encrypted]);
  return payload.toString('base64');
}

function decrypt(payload, secret) {
  if (typeof payload !== 'string' || payload.length === 0) {
    throw new TypeError('payload must be a non-empty string');
  }
  if (payload.length > (IV_BYTES + AUTH_TAG_BYTES + MAX_PLAINTEXT_BYTES) * 2) {
    throw new RangeError('payload exceeds maximum size');
  }
  let raw;
  try {
    raw = Buffer.from(payload, 'base64');
  } catch (err) {
    throw new RangeError('payload is not valid base64');
  }
  if (raw.length < IV_BYTES + AUTH_TAG_BYTES) {
    throw new RangeError('payload is too short');
  }
  const key = secret === undefined ? getKey() : deriveKey(secret);
  const iv = raw.slice(0, IV_BYTES);
  const tag = raw.slice(IV_BYTES, IV_BYTES + AUTH_TAG_BYTES);
  const data = raw.slice(IV_BYTES + AUTH_TAG_BYTES);
  const decipher = crypto.createDecipheriv(ALGORITHM, key, iv);
  decipher.setAuthTag(tag);
  let decrypted;
  try {
    decrypted = Buffer.concat([decipher.update(data), decipher.final()]);
  } catch (err) {
    throw new RangeError('decryption failed: authentication tag mismatch');
  }
  return decrypted.toString('utf8');
}

module.exports = { ALGORITHM, IV_BYTES, KEY_ENV, encrypt, decrypt };
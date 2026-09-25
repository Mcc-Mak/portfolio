'use strict';

const crypto = require('crypto');

const DEFAULT_PERIOD = 30;
const DEFAULT_DIGITS = 6;
const MAX_DIGITS = 10;
const DEFAULT_SKEW = 1;
const MAX_SECRET_LENGTH = 512;

const BASE32_ALPHABET = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ234567';

function validateSecret(secret) {
  if (typeof secret !== 'string' || secret.length === 0 || secret.length > MAX_SECRET_LENGTH) {
    throw new TypeError('secret must be a non-empty base32 string of at most ' + MAX_SECRET_LENGTH + ' characters');
  }
  const trimmed = secret.replace(/=+$/, '');
  for (const ch of trimmed) {
    if (!BASE32_ALPHABET.includes(ch.toUpperCase())) {
      throw new TypeError('secret contains non-base32 characters');
    }
  }
  if (trimmed.length < 16) {
    throw new RangeError('secret must decode to at least 80 bits');
  }
  return trimmed;
}

function base32Decode(input) {
  let bits = 0;
  let value = 0;
  const output = [];
  for (const ch of input) {
    const index = BASE32_ALPHABET.indexOf(ch.toUpperCase());
    if (index === -1) {
      throw new TypeError('secret contains non-base32 characters');
    }
    value = (value << 5) | index;
    bits += 5;
    if (bits >= 8) {
      bits -= 8;
      output.push((value >> bits) & 0xff);
    }
  }
  return Buffer.from(output);
}

function validateTime(time) {
  if (typeof time !== 'number' || !Number.isFinite(time) || time < 0) {
    throw new TypeError('time must be a non-negative finite number of milliseconds');
  }
  return Math.floor(time);
}

function validateDigits(digits) {
  if (!Number.isInteger(digits) || digits < 6 || digits > MAX_DIGITS) {
    throw new RangeError('digits must be an integer between 6 and ' + MAX_DIGITS);
  }
}

function generateWindow(secret, time, digits = DEFAULT_DIGITS, skew = DEFAULT_SKEW) {
  const key = base32Decode(validateSecret(secret));
  const counter = Math.floor(validateTime(time) / 1000 / DEFAULT_PERIOD);
  if (!Number.isInteger(skew) || skew < 0 || skew > 3) {
    throw new RangeError('skew must be an integer between 0 and 3');
  }
  const entries = [];
  for (let offset = -skew; offset <= skew; offset += 1) {
    entries.push([String(counter + offset), hotp(key, counter + offset, digits)]);
  }
  return Object.fromEntries(entries);
}

function hotp(key, counter, digits) {
  const buf = Buffer.alloc(8);
  buf.writeBigUInt64BE(BigInt(counter));
  const hmac = crypto.createHmac('sha1', key).update(buf).digest();
  const offset = hmac[hmac.length - 1] & 0x0f;
  const binary = hmac.readUInt32BE(offset) & 0x7fffffff;
  const code = String(binary % Math.pow(10, digits));
  return code.padStart(digits, '0');
}

function generateCode(secret, time = Date.now(), digits = DEFAULT_DIGITS) {
  validateDigits(digits);
  const key = base32Decode(validateSecret(secret));
  const counter = Math.floor(validateTime(time) / 1000 / DEFAULT_PERIOD);
  return hotp(key, counter, digits);
}

function generateCodeAt(secret, counter, digits = DEFAULT_DIGITS) {
  const key = base32Decode(validateSecret(secret));
  if (!Number.isSafeInteger(counter) || counter < 0) {
    throw new TypeError('counter must be a non-negative safe integer');
  }
  validateDigits(digits);
  return hotp(key, counter, digits);
}

function verifyCode(secret, code, time = Date.now(), digits = DEFAULT_DIGITS, skew = DEFAULT_SKEW) {
  validateDigits(digits);
  if (!Number.isInteger(skew) || skew < 0 || skew > 3) {
    throw new RangeError('skew must be an integer between 0 and 3');
  }
  const key = base32Decode(validateSecret(secret));
  if (typeof code !== 'string' || !/^[0-9]+$/.test(code) || code.length !== digits) {
    return false;
  }
  const counter = Math.floor(validateTime(time) / 1000 / DEFAULT_PERIOD);
  for (let offset = -skew; offset <= skew; offset += 1) {
    const expected = hotp(key, counter + offset, digits);
    const a = Buffer.from(code);
    const b = Buffer.from(expected);
    if (a.length === b.length && crypto.timingSafeEqual(a, b)) {
      return true;
    }
  }
  return false;
}

function generateSecret(bytes = 20) {
  if (!Number.isInteger(bytes) || bytes < 16 || bytes > 128) {
    throw new RangeError('bytes must be an integer between 16 and 128');
  }
  const raw = crypto.randomBytes(bytes);
  let bits = 0;
  let value = 0;
  let out = '';
  for (const byte of raw) {
    value = (value << 8) | byte;
    bits += 8;
    while (bits >= 5) {
      bits -= 5;
      out += BASE32_ALPHABET[(value >> bits) & 0x1f];
    }
  }
  if (bits > 0) {
    out += BASE32_ALPHABET[(value << (5 - bits)) & 0x1f];
  }
  return out;
}

module.exports = {
  DEFAULT_PERIOD,
  DEFAULT_DIGITS,
  MAX_DIGITS,
  DEFAULT_SKEW,
  MAX_SECRET_LENGTH,
  BASE32_ALPHABET,
  validateSecret,
  base32Decode,
  generateCode,
  generateCodeAt,
  generateWindow,
  verifyCode,
  generateSecret
};
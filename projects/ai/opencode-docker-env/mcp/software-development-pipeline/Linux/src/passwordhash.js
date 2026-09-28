'use strict';

const crypto = require('crypto');
const integer = require('./integer');

const ALGORITHM = 'scrypt';
const KEY_LENGTH = 64;
const SALT_BYTES = 16;
const DEFAULT_COST = 16384;
const DEFAULT_BLOCK_SIZE = 8;
const DEFAULT_PARALLELIZATION = 1;
const MIN_PASSWORD_LENGTH = 8;
const MAX_PASSWORD_LENGTH = 1024;
const COST_MAX = 1 << 20;

function paramsFromCost(cost) {
  return {
    N: cost,
    r: DEFAULT_BLOCK_SIZE,
    p: DEFAULT_PARALLELIZATION,
    maxmem: 256 * 1024 * 1024
  };
}

function isPowerOfTwo(value) {
  return integer.isSafeIntegerValue(value) && value > 0 && (value & (value - 1)) === 0;
}

function assertPassword(value) {
  if (typeof value !== 'string') {
    throw new TypeError('password must be a string');
  }
  if (value.length < MIN_PASSWORD_LENGTH) {
    throw new RangeError('password must be at least ' + MIN_PASSWORD_LENGTH + ' characters');
  }
  if (value.length > MAX_PASSWORD_LENGTH) {
    throw new RangeError('password must not exceed ' + MAX_PASSWORD_LENGTH + ' characters');
  }
  return value;
}

function hash(password, cost = DEFAULT_COST) {
  assertPassword(password);
  integer.assertRange(cost, 2, COST_MAX, 'cost');
  if (!isPowerOfTwo(cost)) {
    throw new RangeError('cost must be a power of two');
  }
  const salt = crypto.randomBytes(SALT_BYTES);
  const derived = crypto.scryptSync(password, salt, KEY_LENGTH, paramsFromCost(cost));
  return [ALGORITHM, cost, salt.toString('base64'), derived.toString('base64')].join('$');
}

function parse(stored) {
  if (typeof stored !== 'string' || stored.length === 0) {
    throw new TypeError('stored hash must be a non-empty string');
  }
  const parts = stored.split('$');
  if (parts.length !== 4) {
    throw new RangeError('malformed stored hash');
  }
  const [algorithm, costText, saltText, derivedText] = parts;
  if (algorithm !== ALGORITHM) {
    throw new RangeError('unsupported hash algorithm');
  }
  const cost = Number(costText);
  if (!integer.isSafeIntegerValue(cost) || !isPowerOfTwo(cost) || cost < 2 || cost > COST_MAX) {
    throw new RangeError('malformed cost parameter');
  }
  let salt;
  let derived;
  try {
    salt = Buffer.from(saltText, 'base64');
    derived = Buffer.from(derivedText, 'base64');
  } catch (err) {
    throw new RangeError('malformed hash payload');
  }
  if (salt.length === 0 || derived.length === 0) {
    throw new RangeError('malformed hash payload');
  }
  return { algorithm, cost, salt, derived };
}

function verify(password, stored) {
  if (typeof password !== 'string') {
    return false;
  }
  if (typeof stored !== 'string' || stored.length === 0) {
    return false;
  }
  try {
    assertPassword(password);
  } catch (err) {
    return false;
  }
  let parsed;
  try {
    parsed = parse(stored);
  } catch (err) {
    return false;
  }
  const candidate = crypto.scryptSync(password, parsed.salt, parsed.derived.length, paramsFromCost(parsed.cost));
  if (candidate.length !== parsed.derived.length) {
    return false;
  }
  return crypto.timingSafeEqual(candidate, parsed.derived);
}

module.exports = {
  ALGORITHM,
  KEY_LENGTH,
  SALT_BYTES,
  DEFAULT_COST,
  COST_MAX,
  MIN_PASSWORD_LENGTH,
  MAX_PASSWORD_LENGTH,
  hash,
  verify,
  parse
};
'use strict';

const MAX_PLACEHOLDERS = 999;
const IDENTIFIER_RE = /^[a-zA-Z_][a-zA-Z0-9_]*$/;

function validateIdentifier(identifier) {
  if (typeof identifier !== 'string' || identifier.length === 0) {
    throw new TypeError('identifier must be a non-empty string');
  }
  if (!IDENTIFIER_RE.test(identifier)) {
    throw new RangeError('identifier contains disallowed characters');
  }
  return identifier;
}

function buildPlaceholders(count) {
  const n = Number(count);
  if (!Number.isInteger(n) || n < 0 || n > MAX_PLACEHOLDERS) {
    throw new RangeError('count must be an integer between 0 and ' + MAX_PLACEHOLDERS);
  }
  return Array.from({ length: n }, () => '?').join(', ');
}

function validateParams(params, expectedCount) {
  if (!Array.isArray(params)) {
    throw new TypeError('params must be an array');
  }
  if (params.length !== expectedCount) {
    throw new RangeError('params length must match placeholder count');
  }
  return params;
}

function escapeLike(input) {
  if (typeof input !== 'string') {
    throw new TypeError('input must be a string');
  }
  return input.replace(/[\\%_]/g, (m) => '\\' + m);
}

module.exports = {
  MAX_PLACEHOLDERS,
  validateIdentifier,
  buildPlaceholders,
  validateParams,
  escapeLike
};

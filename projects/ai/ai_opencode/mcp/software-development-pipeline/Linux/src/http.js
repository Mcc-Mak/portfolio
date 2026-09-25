'use strict';

const MAX_HEADER_VALUE_LENGTH = 512;
const MAX_JSON_LENGTH = 1024 * 1024;
const MAX_JSON_DEPTH = 16;
const DISALLOWED_KEYS = new Set(['__proto__', 'constructor', 'prototype']);

const DEFAULT_SECURITY_HEADERS = Object.freeze({
  'X-Content-Type-Options': 'nosniff',
  'X-Frame-Options': 'DENY',
  'Content-Security-Policy': "default-src 'self'",
  'Referrer-Policy': 'no-referrer',
  'Strict-Transport-Security': 'max-age=31536000; includeSubDomains'
});

function sanitizeHeaderValue(value) {
  if (typeof value !== 'string') {
    throw new TypeError('header value must be a string');
  }
  let cleaned = value.replace(/[\r\n]+/g, ' ').split('\u0000').join(' ').trim();
  if (cleaned.length > MAX_HEADER_VALUE_LENGTH) {
    cleaned = cleaned.slice(0, MAX_HEADER_VALUE_LENGTH);
  }
  return cleaned;
}

function buildSecurityHeaders(extra) {
  if (extra === undefined) {
    return Object.assign({}, DEFAULT_SECURITY_HEADERS);
  }
  if (typeof extra !== 'object' || Array.isArray(extra)) {
    throw new TypeError('extra headers must be an object');
  }
  const headers = Object.assign({}, DEFAULT_SECURITY_HEADERS);
  for (const [key, value] of Object.entries(extra)) {
    const cleanKey = sanitizeHeaderValue(key);
    const cleanValue = sanitizeHeaderValue(String(value));
    if (cleanKey.length > 0) {
      Object.defineProperty(headers, cleanKey, {
        value: cleanValue,
        enumerable: true,
        writable: true,
        configurable: true
      });
    }
  }
  return headers;
}

function validateValue(value, depth) {
  if (value === null || typeof value !== 'object') {
    return;
  }
  if (depth > MAX_JSON_DEPTH) {
    throw new RangeError('JSON nesting too deep');
  }
  if (Array.isArray(value)) {
    for (const item of value) {
      validateValue(item, depth + 1);
    }
    return;
  }
  for (const [key, entry] of Object.entries(value)) {
    if (DISALLOWED_KEYS.has(key)) {
      throw new Error('disallowed object key');
    }
    validateValue(entry, depth + 1);
  }
}

function safeJsonParse(text) {
  if (typeof text !== 'string') {
    throw new TypeError('text must be a string');
  }
  if (text.length === 0) {
    throw new RangeError('text must not be empty');
  }
  if (text.length > MAX_JSON_LENGTH) {
    throw new RangeError('text exceeds maximum length');
  }
  let parsed;
  try {
    parsed = JSON.parse(text);
  } catch (err) {
    throw new SyntaxError('invalid JSON');
  }
  validateValue(parsed, 0);
  return parsed;
}

module.exports = {
  DEFAULT_SECURITY_HEADERS,
  MAX_HEADER_VALUE_LENGTH,
  sanitizeHeaderValue,
  buildSecurityHeaders,
  safeJsonParse
};

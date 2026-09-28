'use strict';

const MAX_HSTS_AGE = 2147483647;
const ALLOWED_FRAME_OPTIONS = new Set(['DENY', 'SAMEORIGIN']);
const ALLOWED_REFERRER_POLICIES = new Set([
  'no-referrer',
  'no-referrer-when-downgrade',
  'origin',
  'origin-when-cross-origin',
  'same-origin',
  'strict-origin',
  'strict-origin-when-cross-origin',
  'unsafe-url'
]);
const ALLOWED_COOP = new Set(['same-origin', 'same-origin-allow-popups', 'unsafe-none']);

function requireNonEmptyString(value, name) {
  if (typeof value !== 'string' || value.length === 0) {
    throw new TypeError(name + ' must be a non-empty string');
  }
  return value;
}

function buildHsts(maxAge, opts = {}) {
  if (typeof maxAge !== 'number' || !Number.isInteger(maxAge) || maxAge < 0) {
    throw new RangeError('maxAge must be a non-negative integer');
  }
  if (maxAge > MAX_HSTS_AGE) {
    throw new RangeError('maxAge exceeds the maximum allowed value');
  }
  if (opts === null || typeof opts !== 'object' || Array.isArray(opts)) {
    throw new TypeError('options must be an object');
  }
  let value = 'max-age=' + maxAge;
  if (opts.includeSubDomains === true) {
    value += '; includeSubDomains';
  }
  if (opts.preload === true) {
    value += '; preload';
  }
  return value;
}

function assertFrameOption(value) {
  requireNonEmptyString(value, 'frame option');
  const upper = value.toUpperCase();
  if (ALLOWED_FRAME_OPTIONS.has(upper)) {
    return upper;
  }
  if (upper.startsWith('ALLOW-FROM ')) {
    const uri = value.slice(10).trim();
    if (uri.length === 0 || /\s/.test(uri)) {
      throw new RangeError('ALLOW-FROM must specify a single origin');
    }
    if (!/^https?:/i.test(uri)) {
      throw new RangeError('ALLOW-FROM must use an http(s) scheme');
    }
    return value;
  }
  throw new RangeError('invalid X-Frame-Options value');
}

function assertReferrerPolicy(value) {
  requireNonEmptyString(value, 'referrer policy');
  const normalized = value.toLowerCase().trim();
  if (!ALLOWED_REFERRER_POLICIES.has(normalized)) {
    throw new RangeError('invalid referrer policy');
  }
  return normalized;
}

function assertCoop(value) {
  requireNonEmptyString(value, 'cross-origin opener policy');
  const normalized = value.toLowerCase().trim();
  if (!ALLOWED_COOP.has(normalized)) {
    throw new RangeError('invalid cross-origin opener policy');
  }
  return normalized;
}

function buildSecureHeaderSet(opts) {
  if (opts === null || typeof opts !== 'object' || Array.isArray(opts)) {
    throw new TypeError('options must be an object');
  }
  const headers = {};
  if (opts.hsts !== undefined) {
    if (typeof opts.hsts === 'number') {
      headers['Strict-Transport-Security'] = buildHsts(opts.hsts);
    } else {
      const hstsOpts = opts.hsts;
      if (hstsOpts === null || typeof hstsOpts !== 'object' || Array.isArray(hstsOpts)) {
        throw new TypeError('hsts must be a number or an object');
      }
      if (!Number.isInteger(hstsOpts.maxAge)) {
        throw new RangeError('hsts.maxAge must be an integer');
      }
      headers['Strict-Transport-Security'] = buildHsts(
        hstsOpts.maxAge,
        hstsOpts
      );
    }
  }
  if (opts.frameOption !== undefined) {
    headers['X-Frame-Options'] = assertFrameOption(opts.frameOption);
  }
  if (opts.nosniff !== false) {
    headers['X-Content-Type-Options'] = 'nosniff';
  }
  if (opts.referrerPolicy !== undefined) {
    headers['Referrer-Policy'] = assertReferrerPolicy(opts.referrerPolicy);
  }
  if (opts.coop !== undefined) {
    headers['Cross-Origin-Opener-Policy'] = assertCoop(opts.coop);
  }
  return headers;
}

module.exports = {
  MAX_HSTS_AGE,
  ALLOWED_FRAME_OPTIONS,
  ALLOWED_REFERRER_POLICIES,
  ALLOWED_COOP,
  buildHsts,
  assertFrameOption,
  assertReferrerPolicy,
  assertCoop,
  buildSecureHeaderSet
};
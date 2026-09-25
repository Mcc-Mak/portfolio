'use strict';

const url = require('./url');

const MAX_REDIRECT_LENGTH = 2048;

function isSafeRedirectTarget(raw) {
  if (typeof raw !== 'string' || raw.length === 0 || raw.length > MAX_REDIRECT_LENGTH) {
    return false;
  }
  if (raw.includes('\u0000')) {
    return false;
  }
  if (raw.includes('\r') || raw.includes('\n')) {
    return false;
  }
  if (raw.startsWith('//')) {
    return false;
  }
  if (raw.startsWith('/') && !raw.startsWith('//')) {
    return true;
  }
  try {
    const parsed = url.parseSafeUrl(raw);
    return url.isSafeUrl(raw) && parsed.pathname.startsWith('/');
  } catch (err) {
    return false;
  }
}

function assertSafeRedirect(raw) {
  if (!isSafeRedirectTarget(raw)) {
    throw new RangeError('unsafe redirect target');
  }
  return raw;
}

function buildLocationHeader(raw) {
  const target = assertSafeRedirect(raw);
  let value = target.replace(/[\r\n]+/g, ' ');
  if (value.length > MAX_REDIRECT_LENGTH) {
    value = value.slice(0, MAX_REDIRECT_LENGTH);
  }
  return value;
}

module.exports = {
  MAX_REDIRECT_LENGTH,
  isSafeRedirectTarget,
  assertSafeRedirect,
  buildLocationHeader
};

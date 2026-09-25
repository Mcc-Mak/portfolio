'use strict';

const MAX_COOKIE_VALUE_LENGTH = 4096;
const MAX_NAME_LENGTH = 64;
const COOKIE_NAME_RE = /^[!#$%&'*+\-.^_`|~0-9A-Za-z]+$/;
const DISALLOWED_VALUE_CODES = new Set([34, 40, 41, 44, 59, 60, 61, 62, 63, 64, 91, 92, 93, 123, 125]);

function isCookieOctet(code) {
  if (code < 33 || code === 127) {
    return false;
  }
  return !DISALLOWED_VALUE_CODES.has(code);
}

function sanitizeCookieValue(value) {
  if (typeof value !== 'string') {
    throw new TypeError('cookie value must be a string');
  }
  if (value.length === 0 || value.length > MAX_COOKIE_VALUE_LENGTH) {
    throw new RangeError('cookie value length must be between 1 and ' + MAX_COOKIE_VALUE_LENGTH);
  }
  for (const ch of value) {
    if (!isCookieOctet(ch.charCodeAt(0))) {
      throw new RangeError('cookie value contains disallowed characters');
    }
  }
  return value;
}

function buildSetCookie(name, value, options = {}) {
  if (typeof name !== 'string' || name.length === 0 || name.length > MAX_NAME_LENGTH) {
    throw new RangeError('cookie name must be 1-' + MAX_NAME_LENGTH + ' characters');
  }
  if (!COOKIE_NAME_RE.test(name)) {
    throw new RangeError('cookie name contains disallowed characters');
  }
  const safeValue = sanitizeCookieValue(value);
  const parts = [name + '=' + safeValue];
  if (options.httpOnly) {
    parts.push('HttpOnly');
  }
  if (options.secure) {
    parts.push('Secure');
  }
  if (options.sameSite !== undefined) {
    if (options.sameSite !== 'Strict' && options.sameSite !== 'Lax' && options.sameSite !== 'None') {
      throw new RangeError('sameSite must be Strict, Lax, or None');
    }
    parts.push('SameSite=' + options.sameSite);
  }
  if (options.path !== undefined) {
    if (typeof options.path !== 'string' || options.path.length === 0 || !options.path.startsWith('/')) {
      throw new RangeError('path must be a non-empty string starting with /');
    }
    parts.push('Path=' + options.path);
  }
  if (options.maxAge !== undefined) {
    const maxAge = Number(options.maxAge);
    if (!Number.isInteger(maxAge) || maxAge < 0) {
      throw new RangeError('maxAge must be a non-negative integer');
    }
    parts.push('Max-Age=' + maxAge);
  }
  return parts.join('; ');
}

module.exports = { sanitizeCookieValue, buildSetCookie };

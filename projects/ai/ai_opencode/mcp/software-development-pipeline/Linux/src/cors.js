'use strict';

const MAX_ORIGIN_LENGTH = 2048;

function normalizeOrigin(raw) {
  if (typeof raw !== 'string' || raw.length === 0 || raw.length > MAX_ORIGIN_LENGTH) {
    throw new TypeError('origin must be a non-empty string');
  }
  let parsed;
  try {
    parsed = new URL(raw);
  } catch (err) {
    throw new RangeError('origin is not parseable');
  }
  if (parsed.protocol !== 'http:' && parsed.protocol !== 'https:') {
    throw new RangeError('origin must use http or https');
  }
  if (parsed.username !== '' || parsed.password !== '') {
    throw new RangeError('origin must not contain credentials');
  }
  if (parsed.pathname !== '/' && parsed.pathname !== '') {
    throw new RangeError('origin must not contain a path');
  }
  if (parsed.search !== '' || parsed.hash !== '') {
    throw new RangeError('origin must not contain query or fragment');
  }
  return parsed.protocol + '//' + parsed.host;
}

function isAllowedOrigin(origin, allowed) {
  const normalized = normalizeOrigin(origin);
  if (!Array.isArray(allowed)) {
    throw new TypeError('allowed must be an array of origins');
  }
  if (allowed.includes('*')) {
    return true;
  }
  for (const entry of allowed) {
    if (normalizeOrigin(entry) === normalized) {
      return true;
    }
  }
  return false;
}

function buildCorsHeaders(origin, allowed, options = {}) {
  const normalized = normalizeOrigin(origin);
  if (!isAllowedOrigin(origin, allowed)) {
    return null;
  }
  const credentials = Boolean(options.credentials);
  const allowOrigin = allowed.includes('*') && !credentials ? '*' : normalized;
  const headers = {
    'Access-Control-Allow-Origin': allowOrigin,
    Vary: 'Origin'
  };
  if (credentials) {
    headers['Access-Control-Allow-Credentials'] = 'true';
  }
  if (Array.isArray(options.methods) && options.methods.length > 0) {
    headers['Access-Control-Allow-Methods'] = options.methods.join(', ');
  }
  if (Array.isArray(options.exposedHeaders) && options.exposedHeaders.length > 0) {
    headers['Access-Control-Expose-Headers'] = options.exposedHeaders.join(', ');
  }
  return headers;
}

module.exports = {
  MAX_ORIGIN_LENGTH,
  normalizeOrigin,
  isAllowedOrigin,
  buildCorsHeaders
};

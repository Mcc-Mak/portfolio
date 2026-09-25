'use strict';

const SENSITIVE_CACHE_CONTROL = 'no-store, no-cache, must-revalidate';
const PUBLIC_CACHE_CONTROL = 'public, max-age=60';
const MAX_AGE_LIMIT = 31536000;
const ALLOWED_PRIVATE_DIRECTIVES = new Set([
  'no-store',
  'no-cache',
  'must-revalidate',
  'no-transform',
  'private'
]);
const ALLOWED_PUBLIC_DIRECTIVES = new Set([
  'public',
  'no-transform',
  'must-revalidate'
]);

function validateDirective(directive) {
  if (typeof directive !== 'string' || directive.length === 0 || directive.length > 64) {
    throw new RangeError('directive must be a non-empty string of at most 64 characters');
  }
  for (let i = 0; i < directive.length; i += 1) {
    const code = directive.charCodeAt(i);
    if (code === 0 || code === 10 || code === 13) {
      throw new RangeError('directive contains disallowed characters');
    }
  }
  return directive;
}

function validateMaxAge(maxAge) {
  const value = Number(maxAge);
  if (!Number.isInteger(value) || value < 0 || value > MAX_AGE_LIMIT) {
    throw new RangeError('maxAge must be an integer between 0 and ' + MAX_AGE_LIMIT);
  }
  return value;
}

function buildCacheControl(options = {}) {
  if (options === null || typeof options !== 'object' || Array.isArray(options)) {
    throw new TypeError('options must be an object');
  }
  const directives = [];
  if (options.noStore === true) {
    directives.push('no-store');
  }
  if (options.noCache === true) {
    directives.push('no-cache');
  }
  if (options.mustRevalidate === true) {
    directives.push('must-revalidate');
  }
  if (options.private === true) {
    directives.push('private');
  }
  if (options.public === true) {
    directives.push('public');
  }
  if (options.maxAge !== undefined) {
    directives.push('max-age=' + validateMaxAge(options.maxAge));
  }
  if (directives.length === 0) {
    throw new RangeError('at least one cache directive is required');
  }
  if (directives.includes('no-store')) {
    return SENSITIVE_CACHE_CONTROL;
  }
  return directives.join(', ');
}

function sensitiveResponseHeader() {
  return SENSITIVE_CACHE_CONTROL;
}

function validateCacheDirectiveList(directives) {
  if (!Array.isArray(directives)) {
    throw new TypeError('directives must be an array');
  }
  for (const directive of directives) {
    validateDirective(directive);
    if (!ALLOWED_PRIVATE_DIRECTIVES.has(directive) && !ALLOWED_PUBLIC_DIRECTIVES.has(directive)) {
      throw new RangeError('unsupported cache directive: ' + directive);
    }
  }
  return directives.map((directive) => validateDirective(directive));
}

module.exports = {
  SENSITIVE_CACHE_CONTROL,
  PUBLIC_CACHE_CONTROL,
  MAX_AGE_LIMIT,
  buildCacheControl,
  sensitiveResponseHeader,
  validateCacheDirectiveList
};
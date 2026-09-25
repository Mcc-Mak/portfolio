'use strict';

const MAX_POLICY_LENGTH = 8192;
const MAX_SOURCES_PER_DIRECTIVE = 64;
const KEYWORDS = new Set([
  'self',
  'none',
  'unsafe-inline',
  'unsafe-eval',
  'strict-dynamic',
  'report-sample',
  'wasm-unsafe-eval'
]);
const ALLOWED_DIRECTIVES = new Set([
  'default-src',
  'script-src',
  'style-src',
  'img-src',
  'font-src',
  'connect-src',
  'object-src',
  'frame-src',
  'media-src',
  'manifest-src',
  'worker-src',
  'base-uri',
  'form-action',
  'frame-ancestors',
  'upgrade-insecure-requests',
  'report-uri',
  'report-to',
  'sandbox'
]);

function isValidSource(source) {
  if (typeof source !== 'string' || source.length === 0 || source.length > 256) {
    return false;
  }
  if (/\s/.test(source) || /[;,'"<>]/.test(source)) {
    return false;
  }
  if (KEYWORDS.has(source) || source === '*') {
    return true;
  }
  if (/^nonce-[A-Za-z0-9+/_-]+$/.test(source)) {
    return true;
  }
  if (/^sha(?:256|384|512)-[A-Za-z0-9+/_-]+$/.test(source)) {
    return true;
  }
  if (/^[a-zA-Z][a-zA-Z0-9+.-]*:/.test(source)) {
    return true;
  }
  return isValidHostSource(source);
}

function isValidHostSource(source) {
  if (source.length > 253) {
    return false;
  }
  let host = source;
  const slashIndex = host.indexOf('/');
  if (slashIndex !== -1) {
    const pathPart = host.slice(slashIndex + 1);
    if (pathPart.length > 255 || !/^[\S]+$/.test(pathPart)) {
      return false;
    }
    host = host.slice(0, slashIndex);
  }
  const colonIndex = host.lastIndexOf(':');
  if (colonIndex !== -1) {
    const portPart = host.slice(colonIndex + 1);
    if (!/^[0-9]{1,5}$/.test(portPart)) {
      return false;
    }
    const port = Number(portPart);
    if (port < 1 || port > 65535) {
      return false;
    }
    host = host.slice(0, colonIndex);
  }
  if (host.startsWith('*.')) {
    host = host.slice(2);
  }
  const labels = host.split('.');
  for (const label of labels) {
    if (label.length === 0 || label.length > 63) {
      return false;
    }
    if (!isValidLabel(label)) {
      return false;
    }
  }
  return true;
}

function isValidLabel(label) {
  const first = label.charCodeAt(0);
  if (!isAlphaNumeric(first)) {
    return false;
  }
  const last = label.charCodeAt(label.length - 1);
  if (!isAlphaNumeric(last)) {
    return false;
  }
  for (let i = 0; i < label.length; i += 1) {
    const code = label.charCodeAt(i);
    if (!isAlphaNumeric(code) && code !== 45) {
      return false;
    }
  }
  return true;
}

function isAlphaNumeric(code) {
  return (code >= 48 && code <= 57) ||
    (code >= 65 && code <= 90) ||
    (code >= 97 && code <= 122);
}

function buildCsp(policy) {
  if (policy === null || typeof policy !== 'object' || Array.isArray(policy)) {
    throw new TypeError('policy must be an object');
  }
  const entries = Object.entries(policy);
  if (entries.length === 0) {
    throw new RangeError('policy must not be empty');
  }
  const directiveNames = new Set(entries.map((entry) => entry[0]));
  if (!directiveNames.has('default-src')) {
    throw new RangeError('policy must include a default-src directive');
  }
  const parts = [];
  for (const [directive, sources] of entries) {
    if (!ALLOWED_DIRECTIVES.has(directive)) {
      throw new RangeError('unknown CSP directive: ' + directive);
    }
    let list;
    if (typeof sources === 'string') {
      list = [sources];
    } else if (Array.isArray(sources)) {
      list = sources;
    } else {
      throw new TypeError('sources must be a string or an array of strings');
    }
    if (list.length === 0) {
      throw new RangeError('directive ' + directive + ' must have at least one source');
    }
    if (list.length > MAX_SOURCES_PER_DIRECTIVE) {
      throw new RangeError('directive ' + directive + ' has too many sources');
    }
    for (const source of list) {
      if (!isValidSource(source)) {
        throw new RangeError('invalid CSP source: ' + String(source));
      }
    }
    parts.push(directive + ' ' + list.join(' '));
  }
  const policyString = parts.join('; ');
  if (policyString.length > MAX_POLICY_LENGTH) {
    throw new RangeError('policy exceeds maximum length');
  }
  return policyString;
}

function addNonce(policy, directive, nonce) {
  if (typeof nonce !== 'string' || !/^[A-Za-z0-9+/_-]{8,}$/.test(nonce)) {
    throw new TypeError('nonce must be a base64 token of at least 8 characters');
  }
  if (!ALLOWED_DIRECTIVES.has(directive)) {
    throw new RangeError('unknown CSP directive: ' + directive);
  }
  if (policy === null || typeof policy !== 'object' || Array.isArray(policy)) {
    throw new TypeError('policy must be an object');
  }
  if (!Object.prototype.hasOwnProperty.call(policy, directive)) {
    throw new RangeError('directive not present in policy: ' + directive);
  }
  let current;
  for (const [key, value] of Object.entries(policy)) {
    if (key === directive) {
      current = value;
      break;
    }
  }
  const list = Array.isArray(current) ? current.slice() : [current];
  return Object.assign({}, policy, { [directive]: list.concat(['nonce-' + nonce]) });
}

module.exports = {
  MAX_POLICY_LENGTH,
  MAX_SOURCES_PER_DIRECTIVE,
  KEYWORDS,
  ALLOWED_DIRECTIVES,
  isValidSource,
  buildCsp,
  addNonce
};

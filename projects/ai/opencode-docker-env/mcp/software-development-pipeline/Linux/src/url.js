'use strict';

const ALLOWED_PROTOCOLS = new Set(['http:', 'https:']);

function normalizeHostname(hostname) {
  if (hostname.startsWith('[') && hostname.endsWith(']')) {
    return hostname.slice(1, -1);
  }
  return hostname;
}

function parseIpv4(hostname) {
  const parts = hostname.split('.');
  if (parts.length !== 4) {
    return null;
  }
  const nums = [];
  for (const part of parts) {
    if (part.length === 0 || part.length > 3) {
      return null;
    }
    const n = Number(part);
    if (!Number.isInteger(n) || n < 0 || n > 255) {
      return null;
    }
    nums.push(n);
  }
  return nums;
}

function isLoopbackHostname(hostname) {
  return hostname === 'localhost' || hostname === '::1' || hostname === '::' || hostname === '0.0.0.0';
}

function isPrivateIp(hostname) {
  const host = normalizeHostname(hostname);
  if (host === '::1' || host === '::') {
    return true;
  }
  if (host.startsWith('fe80:')) {
    return true;
  }
  const parts = parseIpv4(host);
  if (parts === null) {
    return false;
  }
  const [a, b] = parts;
  if (a === 0 || a === 10 || a === 127) {
    return true;
  }
  if (a === 169 && b === 254) {
    return true;
  }
  if (a === 172 && b >= 16 && b <= 31) {
    return true;
  }
  if (a === 192 && b === 168) {
    return true;
  }
  return false;
}

function parseSafeUrl(raw) {
  if (typeof raw !== 'string' || raw.length === 0) {
    throw new TypeError('url must be a non-empty string');
  }
  let parsed;
  try {
    parsed = new URL(raw);
  } catch (err) {
    throw new RangeError('url is not parseable');
  }
  if (!ALLOWED_PROTOCOLS.has(parsed.protocol)) {
    throw new RangeError('url protocol must be http or https');
  }
  if (parsed.username !== '' || parsed.password !== '') {
    throw new RangeError('url must not contain credentials');
  }
  return parsed;
}

function isSafeUrl(raw) {
  let parsed;
  try {
    parsed = parseSafeUrl(raw);
  } catch (err) {
    return false;
  }
  const host = normalizeHostname(parsed.hostname).toLowerCase();
  if (isLoopbackHostname(host) || isPrivateIp(host)) {
    return false;
  }
  return true;
}

function assertSafeUrl(raw) {
  if (!isSafeUrl(raw)) {
    throw new RangeError('url targets a private or restricted host');
  }
  return raw;
}

module.exports = { ALLOWED_PROTOCOLS, parseSafeUrl, isSafeUrl, assertSafeUrl };

'use strict';

const MAX_HOST_LENGTH = 255;
const HOSTNAME_CHARS = 'abcdefghijklmnopqrstuvwxyz0123456789.-';
const LOCALHOST_NAMES = new Set(['localhost', 'localhost.localdomain']);

function hasOnlyHostnameChars(hostname) {
  if (hostname.length === 0) {
    return false;
  }
  for (const ch of hostname) {
    if (!HOSTNAME_CHARS.includes(ch)) {
      return false;
    }
  }
  return true;
}

function isIpv4Hostname(hostname) {
  const parts = hostname.split('.');
  if (parts.length !== 4) {
    return false;
  }
  for (const part of parts) {
    if (part.length === 0 || part.length > 3) {
      return false;
    }
    if (!/^\d+$/.test(part)) {
      return false;
    }
    const n = Number(part);
    if (!Number.isInteger(n) || n < 0 || n > 255) {
      return false;
    }
  }
  return true;
}

function isAllowedHost(hostname, allowed) {
  if (typeof hostname !== 'string' || hostname.length === 0 || hostname.length > MAX_HOST_LENGTH) {
    return false;
  }
  const host = hostname.toLowerCase();
  if (!hasOnlyHostnameChars(host)) {
    return false;
  }
  if (isIpv4Hostname(host)) {
    return false;
  }
  if (LOCALHOST_NAMES.has(host)) {
    return false;
  }
  if (!(allowed instanceof Set) || allowed.size === 0) {
    throw new TypeError('allowed must be a non-empty Set of hostnames');
  }
  const normalized = new Set();
  for (const entry of allowed) {
    if (typeof entry !== 'string') {
      throw new TypeError('allowed hostnames must be strings');
    }
    normalized.add(entry.toLowerCase().replace(/\.$/, ''));
  }
  if (normalized.has(host)) {
    return true;
  }
  for (const entry of normalized) {
    if (entry.startsWith('*.') && host.endsWith(entry.slice(1))) {
      return true;
    }
  }
  return false;
}

function assertHostHeader(hostHeader, allowed) {
  if (typeof hostHeader !== 'string' || hostHeader.length === 0) {
    throw new TypeError('host header must be a non-empty string');
  }
  if (hostHeader.length > MAX_HOST_LENGTH) {
    throw new RangeError('host header exceeds maximum length');
  }
  const withPort = hostHeader;
  const hostname = withPort.startsWith('[') ? withPort.slice(1, withPort.indexOf(']')) : withPort.split(':')[0];
  if (!isAllowedHost(hostname, allowed)) {
    throw new RangeError('host header is not allowed');
  }
  return hostname;
}

module.exports = {
  MAX_HOST_LENGTH,
  LOCALHOST_NAMES,
  isAllowedHost,
  assertHostHeader
};

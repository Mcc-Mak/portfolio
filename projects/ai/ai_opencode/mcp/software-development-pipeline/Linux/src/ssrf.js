'use strict';

const net = require('net');
const dns = require('dns');

const ALLOWED_PROTOCOLS = new Set(['http:', 'https:']);
const MAX_HOSTNAME_LENGTH = 253;
const MAX_URL_LENGTH = 2048;

function ipv4ToInt(ip) {
  if (typeof ip !== 'string' || !net.isIPv4(ip)) {
    return null;
  }
  const parts = ip.split('.').map(Number);
  return ((parts[0] * 256 + parts[1]) * 256 + parts[2]) * 256 + parts[3];
}

function ipv4Octets(ip) {
  if (typeof ip !== 'string' || !net.isIPv4(ip)) {
    return null;
  }
  return ip.split('.').map(Number);
}

function isPrivateIpv4(ip) {
  const octets = ipv4Octets(ip);
  if (octets === null) {
    return false;
  }
  const [a, b] = octets;
  if (a === 0) return true;
  if (a === 10) return true;
  if (a === 100 && b >= 64 && b <= 127) return true;
  if (a === 127) return true;
  if (a === 169 && b === 254) return true;
  if (a === 172 && b >= 16 && b <= 31) return true;
  if (a === 192) {
    if (b === 0 && octets[2] === 0) return true;
    if (b === 0 && octets[2] === 2) return true;
    if (b === 168) return true;
  }
  if (a === 198) {
    if (b === 18 || b === 19) return true;
    if (b === 51 && octets[2] === 100) return true;
  }
  if (a === 203 && b === 0 && octets[2] === 113) return true;
  if (a >= 224 && a <= 255) return true;
  return false;
}

function isPrivateIpv6(ip) {
  if (typeof ip !== 'string' || !net.isIPv6(ip)) {
    return false;
  }
  const normalized = ip.toLowerCase();
  if (normalized === '::' || normalized === '::1') {
    return true;
  }
  const mapped = normalized.match(/^::ffff:(\d+\.\d+\.\d+\.\d+)$/);
  if (mapped) {
    return isPrivateIpv4(mapped[1]);
  }
  if (normalized.startsWith('::ffff:') || normalized.startsWith('::')) {
    return true;
  }
  const hextet = normalized.split(':')[0];
  if (hextet === 'ff' || hextet.startsWith('fc') || hextet.startsWith('fd') || hextet.startsWith('fe')) {
    return true;
  }
  return false;
}

function isPublicIpAddress(ip) {
  if (typeof ip !== 'string' || ip.length === 0) {
    return false;
  }
  if (net.isIPv4(ip)) {
    return !isPrivateIpv4(ip);
  }
  if (net.isIPv6(ip)) {
    return !isPrivateIpv6(ip);
  }
  return false;
}

function assertSafeHostname(hostname) {
  if (typeof hostname !== 'string' || hostname.length === 0) {
    throw new RangeError('hostname must be a non-empty string');
  }
  if (hostname.length > MAX_HOSTNAME_LENGTH) {
    throw new RangeError('hostname exceeds maximum length');
  }
  if (hostname.includes('\u0000')) {
    throw new RangeError('hostname must not contain null bytes');
  }
  return hostname;
}

async function resolveAddresses(hostname) {
  assertSafeHostname(hostname);
  if (net.isIP(hostname) !== 0) {
    return [hostname];
  }
  const records = await dns.promises.lookup(hostname, { all: true, family: 0 });
  return records.map((record) => record.address);
}

async function assertSafeUrl(urlString) {
  if (typeof urlString !== 'string' || urlString.length === 0) {
    throw new RangeError('url must be a non-empty string');
  }
  if (urlString.length > MAX_URL_LENGTH) {
    throw new RangeError('url exceeds maximum length');
  }
  let parsed;
  try {
    parsed = new URL(urlString);
  } catch (err) {
    throw new RangeError('url is not parseable');
  }
  if (!ALLOWED_PROTOCOLS.has(parsed.protocol)) {
    throw new RangeError('protocol not allowed');
  }
  const hostname = parsed.hostname.toLowerCase();
  assertSafeHostname(hostname);
  const addresses = await resolveAddresses(hostname);
  for (const address of addresses) {
    if (!isPublicIpAddress(address)) {
      throw new RangeError('url resolves to a non-public address');
    }
  }
  return parsed;
}

module.exports = {
  ALLOWED_PROTOCOLS,
  MAX_HOSTNAME_LENGTH,
  MAX_URL_LENGTH,
  ipv4ToInt,
  isPrivateIpv4,
  isPrivateIpv6,
  isPublicIpAddress,
  assertSafeHostname,
  resolveAddresses,
  assertSafeUrl
};

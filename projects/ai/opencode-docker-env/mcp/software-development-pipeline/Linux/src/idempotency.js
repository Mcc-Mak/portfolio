'use strict';

const crypto = require('crypto');
const integer = require('./integer');

const DEFAULT_TTL_MS = 5 * 60 * 1000;
const DEFAULT_MAX_ENTRIES = 1000;
const MIN_KEY_LENGTH = 8;
const MAX_KEY_LENGTH = 256;
const SAFE_KEY_RE = /^[A-Za-z0-9_.:~=+-]+$/;
const HEX_KEY_RE = /^[0-9a-f]+$/;

function generateIdempotencyKey() {
  return crypto.randomBytes(32).toString('hex');
}

function isValidIdempotencyKey(key) {
  if (typeof key !== 'string') {
    return false;
  }
  if (key.length < MIN_KEY_LENGTH || key.length > MAX_KEY_LENGTH) {
    return false;
  }
  if (!SAFE_KEY_RE.test(key)) {
    return false;
  }
  if (HEX_KEY_RE.test(key) && key.length === 64) {
    return true;
  }
  return true;
}

function createIdempotencyStore(options) {
  const ttlMs = options && options.ttlMs !== undefined
    ? integer.assertRange(options.ttlMs, 1, Number.MAX_SAFE_INTEGER, 'ttlMs')
    : DEFAULT_TTL_MS;
  const maxEntries = options && options.maxEntries !== undefined
    ? integer.assertRange(options.maxEntries, 1, Number.MAX_SAFE_INTEGER, 'maxEntries')
    : DEFAULT_MAX_ENTRIES;
  const entries = new Map();

  function pruneExpired(now) {
    for (const [key, entry] of entries.entries()) {
      if (entry.expiresAt <= now) {
        entries.delete(key);
      }
    }
  }

  function evictOldest() {
    const oldest = entries.keys().next().value;
    if (oldest !== undefined) {
      entries.delete(oldest);
    }
  }

  function record(key, fingerprint, now) {
    const existing = entries.get(key);
    if (existing !== undefined) {
      if (existing.expiresAt > now) {
        if (existing.fingerprint !== null && fingerprint !== existing.fingerprint) {
          throw new RangeError('idempotency key reused with a different fingerprint');
        }
        return { key, replay: true, createdAt: existing.createdAt };
      }
      entries.delete(key);
    }
    if (entries.size >= maxEntries) {
      pruneExpired(now);
    }
    if (entries.size >= maxEntries) {
      evictOldest();
    }
    const createdAt = now;
    entries.set(key, { fingerprint, createdAt, expiresAt: now + ttlMs });
    return { key, replay: false, createdAt };
  }

  function acquire(key, fingerprint) {
    if (typeof key !== 'string') {
      throw new TypeError('idempotency key must be a string');
    }
    if (!isValidIdempotencyKey(key)) {
      throw new RangeError('invalid idempotency key');
    }
    let normalizedFingerprint = null;
    if (fingerprint !== undefined && fingerprint !== null) {
      if (typeof fingerprint !== 'string') {
        throw new TypeError('fingerprint must be a string');
      }
      normalizedFingerprint = fingerprint;
    }
    return record(key, normalizedFingerprint, Date.now());
  }

  function has(key) {
    if (typeof key !== 'string' || !isValidIdempotencyKey(key)) {
      return false;
    }
    const entry = entries.get(key);
    if (entry === undefined) {
      return false;
    }
    if (entry.expiresAt <= Date.now()) {
      entries.delete(key);
      return false;
    }
    return true;
  }

  function size() {
    pruneExpired(Date.now());
    return entries.size;
  }

  function clear() {
    entries.clear();
  }

  return { acquire, has, size, clear };
}

module.exports = {
  DEFAULT_TTL_MS,
  DEFAULT_MAX_ENTRIES,
  MIN_KEY_LENGTH,
  MAX_KEY_LENGTH,
  generateIdempotencyKey,
  isValidIdempotencyKey,
  createIdempotencyStore
};

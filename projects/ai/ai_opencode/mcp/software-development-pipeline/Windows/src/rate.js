'use strict';

function createRateLimiter(options = {}) {
  const windowMs = Number(options.windowMs !== undefined ? options.windowMs : 60000);
  const max = Number(options.max !== undefined ? options.max : 100);
  if (!Number.isInteger(windowMs) || windowMs <= 0) {
    throw new RangeError('windowMs must be a positive integer');
  }
  if (!Number.isInteger(max) || max <= 0) {
    throw new RangeError('max must be a positive integer');
  }
  const buckets = new Map();

  function check(key, now = Date.now()) {
    if (typeof key !== 'string' || key.length === 0) {
      throw new TypeError('key must be a non-empty string');
    }
    const n = Number(now);
    if (!Number.isInteger(n) || n <= 0) {
      throw new RangeError('now must be a positive integer');
    }
    const windowStart = Math.floor(n / windowMs) * windowMs;
    const bucket = buckets.get(key);
    if (bucket === undefined || bucket.windowStart !== windowStart) {
      buckets.set(key, { windowStart, count: 1 });
      return { allowed: 1 <= max, remaining: max - 1, resetAt: windowStart + windowMs };
    }
    bucket.count += 1;
    const remaining = Math.max(0, max - bucket.count);
    return { allowed: bucket.count <= max, remaining, resetAt: windowStart + windowMs };
  }

  function reset(key) {
    if (typeof key !== 'string' || key.length === 0) {
      throw new TypeError('key must be a non-empty string');
    }
    return buckets.delete(key);
  }

  function prune(now = Date.now()) {
    const n = Number(now);
    let removed = 0;
    for (const [key, bucket] of buckets) {
      if (bucket.windowStart + windowMs < n) {
        buckets.delete(key);
        removed += 1;
      }
    }
    return removed;
  }

  return { check, reset, prune };
}

module.exports = { createRateLimiter };

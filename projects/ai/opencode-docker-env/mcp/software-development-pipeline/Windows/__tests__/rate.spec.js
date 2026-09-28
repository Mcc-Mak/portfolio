'use strict';

const { createRateLimiter } = require('../src/rate');

describe('createRateLimiter', () => {
  it('allows requests up to max within a window', () => {
    const limiter = createRateLimiter({ windowMs: 1000, max: 2 });
    expect(limiter.check('a', 1000).allowed).toBe(true);
    expect(limiter.check('a', 1100).allowed).toBe(true);
  });

  it('blocks requests beyond max', () => {
    const limiter = createRateLimiter({ windowMs: 1000, max: 2 });
    limiter.check('a', 1000);
    limiter.check('a', 1001);
    const third = limiter.check('a', 1002);
    expect(third.allowed).toBe(false);
    expect(third.remaining).toBe(0);
  });

  it('resets the budget in a new window', () => {
    const limiter = createRateLimiter({ windowMs: 1000, max: 1 });
    limiter.check('a', 1000);
    expect(limiter.check('a', 2000).allowed).toBe(true);
  });

  it('returns resetAt at the end of the current window', () => {
    const limiter = createRateLimiter({ windowMs: 1000, max: 1 });
    const result = limiter.check('a', 1000);
    expect(result.resetAt).toBe(2000);
  });

  it('tracks keys independently', () => {
    const limiter = createRateLimiter({ windowMs: 1000, max: 1 });
    limiter.check('a', 1000);
    expect(limiter.check('b', 1000).allowed).toBe(true);
  });

  it('rejects invalid options', () => {
    expect(() => createRateLimiter({ windowMs: 0 })).toThrow(RangeError);
    expect(() => createRateLimiter({ max: 0 })).toThrow(RangeError);
    expect(() => createRateLimiter({ windowMs: 1.5 })).toThrow(RangeError);
  });

  it('rejects invalid keys and timestamps', () => {
    const limiter = createRateLimiter({});
    expect(() => limiter.check('')).toThrow(TypeError);
    expect(() => limiter.check('a', -5)).toThrow(RangeError);
  });
});

describe('reset and prune', () => {
  it('reset removes a bucket', () => {
    const limiter = createRateLimiter({ windowMs: 1000, max: 1 });
    limiter.check('a', 1000);
    expect(limiter.reset('a')).toBe(true);
    expect(limiter.reset('a')).toBe(false);
    expect(limiter.check('a', 1000).allowed).toBe(true);
  });

  it('reset rejects non-string keys', () => {
    const limiter = createRateLimiter({});
    expect(() => limiter.reset(3)).toThrow(TypeError);
  });

  it('prune removes expired buckets only', () => {
    const limiter = createRateLimiter({ windowMs: 1000, max: 5 });
    limiter.check('expired', 1000);
    limiter.check('fresh', 2000);
    expect(limiter.prune(2001)).toBe(1);
  });
});

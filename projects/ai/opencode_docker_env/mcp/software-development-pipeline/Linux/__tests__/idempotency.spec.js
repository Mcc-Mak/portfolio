'use strict';

const {
  MIN_KEY_LENGTH,
  MAX_KEY_LENGTH,
  generateIdempotencyKey,
  isValidIdempotencyKey,
  createIdempotencyStore
} = require('../src/idempotency');

describe('generateIdempotencyKey', () => {
  it('produces unique valid keys', () => {
    const a = generateIdempotencyKey();
    const b = generateIdempotencyKey();
    expect(isValidIdempotencyKey(a)).toBe(true);
    expect(a).not.toBe(b);
  });
});

describe('isValidIdempotencyKey', () => {
  it('accepts generated keys and safe strings', () => {
    expect(isValidIdempotencyKey(generateIdempotencyKey())).toBe(true);
    expect(isValidIdempotencyKey('order-12345')).toBe(true);
    expect(isValidIdempotencyKey('A'.repeat(MIN_KEY_LENGTH))).toBe(true);
  });

  it('rejects weak keys', () => {
    expect(isValidIdempotencyKey('')).toBe(false);
    expect(isValidIdempotencyKey('short')).toBe(false);
    expect(isValidIdempotencyKey('x'.repeat(MAX_KEY_LENGTH + 1))).toBe(false);
    expect(isValidIdempotencyKey('bad key with space')).toBe(false);
    expect(isValidIdempotencyKey('bad\u0000key')).toBe(false);
    expect(isValidIdempotencyKey(42)).toBe(false);
  });
});

describe('createIdempotencyStore', () => {
  it('returns replay=true on second acquire', () => {
    const store = createIdempotencyStore();
    const key = generateIdempotencyKey();
    expect(store.acquire(key).replay).toBe(false);
    expect(store.acquire(key).replay).toBe(true);
    expect(store.has(key)).toBe(true);
  });

  it('tracks replay across distinct keys', () => {
    const store = createIdempotencyStore();
    const a = store.acquire('req-one-0001');
    const b = store.acquire('req-two-0002');
    expect(a.replay).toBe(false);
    expect(b.replay).toBe(false);
  });

  it('enforces fingerprint consistency', () => {
    const store = createIdempotencyStore();
    const key = 'pay-0001-key';
    store.acquire(key, 'fprint-a');
    expect(() => store.acquire(key, 'fprint-b')).toThrow(RangeError);
  });

  it('expires entries after ttl', () => {
    jest.useFakeTimers();
    const store = createIdempotencyStore({ ttlMs: 1000 });
    store.acquire('exp-key-0001');
    expect(store.has('exp-key-0001')).toBe(true);
    jest.advanceTimersByTime(1001);
    expect(store.has('exp-key-0001')).toBe(false);
    expect(store.acquire('exp-key-0001').replay).toBe(false);
    jest.useRealTimers();
  });

  it('evicts oldest entry at max capacity', () => {
    const store = createIdempotencyStore({ maxEntries: 2 });
    store.acquire('first-key-01');
    store.acquire('second-key-1');
    store.acquire('third-key-01');
    expect(store.has('first-key-01')).toBe(false);
    expect(store.has('second-key-1')).toBe(true);
    expect(store.has('third-key-01')).toBe(true);
  });

  it('rejects invalid keys on acquire', () => {
    const store = createIdempotencyStore();
    expect(() => store.acquire('bad key')).toThrow(RangeError);
    expect(() => store.acquire(42)).toThrow(TypeError);
  });

  it('validates store options', () => {
    expect(() => createIdempotencyStore({ ttlMs: 0 })).toThrow(RangeError);
    expect(() => createIdempotencyStore({ maxEntries: -1 })).toThrow(RangeError);
  });

  it('clears all entries', () => {
    const store = createIdempotencyStore();
    store.acquire('clear-key-01');
    store.clear();
    expect(store.has('clear-key-01')).toBe(false);
  });
});
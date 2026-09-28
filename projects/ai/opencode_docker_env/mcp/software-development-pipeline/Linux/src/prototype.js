'use strict';

const DISALLOWED_KEYS = new Set(['__proto__', 'prototype', 'constructor']);
const MAX_DEPTH = 64;
const MAX_NODES = 10000;

function isPlainObject(value) {
  if (value === null || typeof value !== 'object') {
    return false;
  }
  if (Array.isArray(value)) {
    return false;
  }
  const proto = Object.getPrototypeOf(value);
  return proto === Object.prototype || proto === null;
}

function assertSafeKey(key) {
  if (typeof key !== 'string') {
    throw new TypeError('object key must be a string');
  }
  if (DISALLOWED_KEYS.has(key)) {
    throw new Error('unsafe object key: ' + key);
  }
  return key;
}

function safeClone(value, depth = 0, budget = { nodes: 0 }) {
  if (depth > MAX_DEPTH) {
    throw new RangeError('object nesting exceeds maximum depth');
  }
  if (value === null || typeof value !== 'object') {
    return value;
  }
  budget.nodes += 1;
  if (budget.nodes > MAX_NODES) {
    throw new RangeError('object graph exceeds maximum size');
  }
  if (Array.isArray(value)) {
    const out = new Array(value.length);
    for (let i = 0; i < value.length; i += 1) {
      Object.defineProperty(out, i, {
        value: safeClone(value.at(i), depth + 1, budget),
        enumerable: true,
        writable: true,
        configurable: true
      });
    }
    return out;
  }
  if (isPlainObject(value)) {
    const out = {};
    for (const [key, entry] of Object.entries(value)) {
      assertSafeKey(key);
      Object.defineProperty(out, key, {
        value: safeClone(entry, depth + 1, budget),
        enumerable: true,
        writable: true,
        configurable: true
      });
    }
    return out;
  }
  return value;
}

function assignOwn(target, key, value) {
  assertSafeKey(key);
  Object.defineProperty(target, key, {
    value,
    enumerable: true,
    writable: true,
    configurable: true
  });
  return target;
}

function deepMerge(target, source, depth = 0, budget = { nodes: 0 }) {
  if (depth > MAX_DEPTH) {
    throw new RangeError('object nesting exceeds maximum depth');
  }
  if (target === null || typeof target !== 'object' || Array.isArray(target)) {
    throw new TypeError('target must be a plain object');
  }
  if (source === null || typeof source !== 'object') {
    return target;
  }
  if (Array.isArray(source)) {
    throw new TypeError('source must not be an array');
  }
  budget.nodes += 1;
  if (budget.nodes > MAX_NODES) {
    throw new RangeError('object graph exceeds maximum size');
  }
  for (const [key, value] of Object.entries(source)) {
    assertSafeKey(key);
    if (isPlainObject(value)) {
      const existing = Object.prototype.hasOwnProperty.call(target, key)
        ? Object.getOwnPropertyDescriptor(target, key).value
        : null;
      if (isPlainObject(existing)) {
        deepMerge(existing, value, depth + 1, budget);
      } else {
        assignOwn(target, key, safeClone(value, depth + 1, budget));
      }
    } else {
      assignOwn(target, key, safeClone(value, depth + 1, budget));
    }
  }
  return target;
}

function freezeDeep(value, depth = 0) {
  if (value === null || typeof value !== 'object') {
    return value;
  }
  if (depth > MAX_DEPTH) {
    throw new RangeError('object nesting exceeds maximum depth');
  }
  if (Array.isArray(value)) {
    for (const item of value) {
      freezeDeep(item, depth + 1);
    }
    Object.freeze(value);
    return value;
  }
  for (const entry of Object.values(value)) {
    freezeDeep(entry, depth + 1);
  }
  Object.freeze(value);
  return value;
}

module.exports = {
  DISALLOWED_KEYS,
  MAX_DEPTH,
  MAX_NODES,
  assertSafeKey,
  safeClone,
  deepMerge,
  freezeDeep
};

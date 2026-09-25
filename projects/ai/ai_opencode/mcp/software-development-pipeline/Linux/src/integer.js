'use strict';

const MIN_SAFE = Number.MIN_SAFE_INTEGER;
const MAX_SAFE = Number.MAX_SAFE_INTEGER;

function isSafeIntegerValue(value) {
  return typeof value === 'number' && Number.isSafeInteger(value);
}

function assertInteger(value, name = 'value') {
  if (!isSafeIntegerValue(value)) {
    throw new TypeError(name + ' must be a safe integer');
  }
  return value;
}

function assertRange(value, min, max, name = 'value') {
  assertInteger(value, name);
  if (!isSafeIntegerValue(min)) {
    throw new TypeError('min must be a safe integer');
  }
  if (!isSafeIntegerValue(max)) {
    throw new TypeError('max must be a safe integer');
  }
  if (min > max) {
    throw new RangeError('min must not exceed max');
  }
  if (value < min || value > max) {
    throw new RangeError(name + ' must be between ' + min + ' and ' + max);
  }
  return value;
}

function assertNonNegative(value, name = 'value') {
  return assertRange(value, 0, MAX_SAFE, name);
}

function withinRange(value, min, max) {
  if (!isSafeIntegerValue(value)) {
    return false;
  }
  if (!isSafeIntegerValue(min) || !isSafeIntegerValue(max)) {
    return false;
  }
  if (min > max) {
    return false;
  }
  return value >= min && value <= max;
}

function safeAdd(a, b) {
  assertInteger(a, 'a');
  assertInteger(b, 'b');
  const result = a + b;
  if (!Number.isSafeInteger(result)) {
    throw new RangeError('integer overflow in addition');
  }
  return result;
}

function safeMultiply(a, b) {
  assertInteger(a, 'a');
  assertInteger(b, 'b');
  const result = a * b;
  if (!Number.isSafeInteger(result)) {
    throw new RangeError('integer overflow in multiplication');
  }
  return result;
}

module.exports = {
  MIN_SAFE,
  MAX_SAFE,
  isSafeIntegerValue,
  assertInteger,
  assertRange,
  assertNonNegative,
  withinRange,
  safeAdd,
  safeMultiply
};
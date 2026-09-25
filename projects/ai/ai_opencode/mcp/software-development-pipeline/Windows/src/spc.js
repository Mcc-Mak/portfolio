'use strict';

function mean(values) {
  if (!Array.isArray(values) || values.length === 0) {
    throw new RangeError('values must be a non-empty array');
  }
  let sum = 0;
  for (const v of values) {
    const n = Number(v);
    if (!Number.isFinite(n)) {
      throw new RangeError('values must contain only finite numbers');
    }
    sum += n;
  }
  return sum / values.length;
}

function sampleStandardDeviation(values) {
  if (!Array.isArray(values) || values.length < 2) {
    throw new RangeError('need at least 2 values');
  }
  const m = mean(values);
  let sum = 0;
  for (const v of values) {
    const d = Number(v) - m;
    sum += d * d;
  }
  return Math.sqrt(sum / (values.length - 1));
}

function controlLimits(values, sigma = 3) {
  const m = mean(values);
  const s = sampleStandardDeviation(values);
  const ucl = m + sigma * s;
  const lcl = Math.max(0, m - sigma * s);
  return { mean: m, stdev: s, ucl, lcl };
}

function isOutOfControl(value, limits) {
  const v = Number(value);
  if (!Number.isFinite(v)) {
    throw new RangeError('value must be a finite number');
  }
  return v > limits.ucl;
}

module.exports = { mean, sampleStandardDeviation, controlLimits, isOutOfControl };

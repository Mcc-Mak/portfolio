'use strict';

const DENSITY_GOAL = 0.5;

function parseCount(value) {
  const n = Number(value);
  if (!Number.isInteger(n) || n < 0) {
    throw new RangeError('count must be a non-negative integer');
  }
  return n;
}

function parsePositiveNumber(value) {
  const n = Number(value);
  if (!Number.isFinite(n) || n <= 0) {
    throw new RangeError('value must be a positive finite number');
  }
  return n;
}

function defectDensity(critical, high, loc) {
  const c = parseCount(critical);
  const h = parseCount(high);
  const lines = parsePositiveNumber(loc);
  return (c + h) / (lines / 1000);
}

function meetsDefectDensityGoal(density) {
  const d = Number(density);
  if (!Number.isFinite(d) || d < 0) {
    throw new RangeError('density must be a non-negative finite number');
  }
  return d <= DENSITY_GOAL;
}

module.exports = { DENSITY_GOAL, defectDensity, meetsDefectDensityGoal };

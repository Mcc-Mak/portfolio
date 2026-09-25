'use strict';

const { defectDensity, meetsDefectDensityGoal, DENSITY_GOAL } = require('../src/metrics');

describe('defectDensity', () => {
  it('computes (critical + high) / (loc / 1000)', () => {
    expect(defectDensity(1, 4, 1000)).toBe(5);
  });

  it('returns 0 when there are no vulnerabilities', () => {
    expect(defectDensity(0, 0, 1000)).toBe(0);
  });

  it('rejects negative counts', () => {
    expect(() => defectDensity(-1, 0, 1000)).toThrow(RangeError);
  });

  it('rejects non-integer counts', () => {
    expect(() => defectDensity(1.5, 0, 1000)).toThrow(RangeError);
  });

  it('rejects non-positive LOC', () => {
    expect(() => defectDensity(0, 0, 0)).toThrow(RangeError);
  });
});

describe('meetsDefectDensityGoal', () => {
  it('accepts densities at or below the goal', () => {
    expect(meetsDefectDensityGoal(DENSITY_GOAL)).toBe(true);
    expect(meetsDefectDensityGoal(0)).toBe(true);
  });

  it('rejects densities above the goal', () => {
    expect(meetsDefectDensityGoal(DENSITY_GOAL + 0.001)).toBe(false);
  });

  it('rejects non-numeric densities', () => {
    expect(() => meetsDefectDensityGoal('nope')).toThrow(RangeError);
  });
});

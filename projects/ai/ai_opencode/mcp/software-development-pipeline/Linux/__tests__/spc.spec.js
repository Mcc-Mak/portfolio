'use strict';

const {
  mean,
  sampleStandardDeviation,
  controlLimits,
  isOutOfControl
} = require('../src/spc');

describe('mean', () => {
  it('averages the values', () => {
    expect(mean([1, 2, 3, 4])).toBe(2.5);
  });

  it('rejects an empty array', () => {
    expect(() => mean([])).toThrow(RangeError);
  });

  it('rejects non-finite values', () => {
    expect(() => mean([1, NaN])).toThrow(RangeError);
  });
});

describe('sampleStandardDeviation', () => {
  it('computes the sample standard deviation', () => {
    expect(sampleStandardDeviation([2, 4, 4, 4, 5, 5, 7, 9])).toBeCloseTo(2.138, 3);
  });

  it('rejects fewer than 2 values', () => {
    expect(() => sampleStandardDeviation([1])).toThrow(RangeError);
  });
});

describe('controlLimits', () => {
  it('sets UCL = mean + sigma * sd', () => {
    const values = [1, 2, 3, 4, 5];
    const limits = controlLimits(values);
    expect(limits.mean).toBeCloseTo(mean(values), 10);
    expect(limits.ucl).toBeCloseTo(mean(values) + 3 * sampleStandardDeviation(values), 10);
  });

  it('clamps LCL at zero', () => {
    const limits = controlLimits([0, 0, 0, 0.1, 0.1]);
    expect(limits.lcl).toBe(0);
  });
});

describe('isOutOfControl', () => {
  it('flags values above the UCL', () => {
    const limits = controlLimits([1, 2, 3, 4, 5]);
    expect(isOutOfControl(limits.ucl + 0.01, limits)).toBe(true);
  });

  it('allows values at or below the UCL', () => {
    const limits = controlLimits([1, 2, 3, 4, 5]);
    expect(isOutOfControl(limits.ucl, limits)).toBe(false);
  });

  it('rejects non-finite values', () => {
    const limits = controlLimits([1, 2, 3, 4, 5]);
    expect(() => isOutOfControl('bad', limits)).toThrow(RangeError);
  });
});

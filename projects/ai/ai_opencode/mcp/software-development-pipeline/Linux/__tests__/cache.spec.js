'use strict';

const {
  SENSITIVE_CACHE_CONTROL,
  PUBLIC_CACHE_CONTROL,
  MAX_AGE_LIMIT,
  buildCacheControl,
  sensitiveResponseHeader,
  validateCacheDirectiveList
} = require('../src/cache');

describe('buildCacheControl', () => {
  it('builds a public cache header with max-age', () => {
    expect(buildCacheControl({ public: true, maxAge: 60 })).toBe('public, max-age=60');
  });

  it('forces no-store for sensitive responses', () => {
    expect(buildCacheControl({ noStore: true, maxAge: 60 })).toBe(SENSITIVE_CACHE_CONTROL);
    expect(buildCacheControl({ noStore: true })).toBe('no-store, no-cache, must-revalidate');
  });

  it('combines private and revalidation directives', () => {
    expect(buildCacheControl({ private: true, noCache: true, mustRevalidate: true })).toBe(
      'no-cache, must-revalidate, private'
    );
  });

  it('rejects options with no directives', () => {
    expect(() => buildCacheControl({})).toThrow(RangeError);
  });

  it('rejects invalid maxAge values', () => {
    expect(() => buildCacheControl({ public: true, maxAge: -1 })).toThrow(RangeError);
    expect(() => buildCacheControl({ public: true, maxAge: MAX_AGE_LIMIT + 1 })).toThrow(RangeError);
    expect(() => buildCacheControl({ public: true, maxAge: 'soon' })).toThrow(RangeError);
  });

  it('rejects non-object options', () => {
    expect(() => buildCacheControl('public')).toThrow(TypeError);
    expect(() => buildCacheControl(['public'])).toThrow(TypeError);
  });
});

describe('sensitiveResponseHeader', () => {
  it('returns a constant no-store policy', () => {
    expect(sensitiveResponseHeader()).toBe('no-store, no-cache, must-revalidate');
  });
});

describe('validateCacheDirectiveList', () => {
  it('accepts known directives', () => {
    expect(validateCacheDirectiveList(['no-store', 'private'])).toEqual(['no-store', 'private']);
    expect(validateCacheDirectiveList(['public', 'no-transform'])).toEqual(['public', 'no-transform']);
  });

  it('rejects unknown directives and header injection', () => {
    expect(() => validateCacheDirectiveList(['cache-buster'])).toThrow(RangeError);
    expect(() => validateCacheDirectiveList(['no-store\r\nX-Evil: 1'])).toThrow(RangeError);
  });

  it('rejects non-array input', () => {
    expect(() => validateCacheDirectiveList('no-store')).toThrow(TypeError);
  });

  it('rejects over-long directives', () => {
    expect(() => validateCacheDirectiveList(['x'.repeat(65)])).toThrow(RangeError);
  });
});

describe('PUBLIC_CACHE_CONTROL', () => {
  it('matches buildCacheControl public default', () => {
    expect(PUBLIC_CACHE_CONTROL).toBe('public, max-age=60');
  });
});

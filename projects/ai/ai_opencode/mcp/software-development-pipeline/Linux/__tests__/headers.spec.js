'use strict';

const {
  MAX_HSTS_AGE,
  buildHsts,
  assertFrameOption,
  assertReferrerPolicy,
  assertCoop,
  buildSecureHeaderSet
} = require('../src/headers');

describe('buildHsts', () => {
  it('produces a max-age directive', () => {
    expect(buildHsts(31536000)).toBe('max-age=31536000');
  });

  it('appends optional directives', () => {
    expect(buildHsts(31536000, { includeSubDomains: true })).toBe(
      'max-age=31536000; includeSubDomains'
    );
    expect(buildHsts(31536000, { preload: true })).toBe('max-age=31536000; preload');
    expect(buildHsts(31536000, { includeSubDomains: true, preload: true })).toBe(
      'max-age=31536000; includeSubDomains; preload'
    );
  });

  it('rejects negative or non-integer maxAge', () => {
    expect(() => buildHsts(-1)).toThrow(RangeError);
    expect(() => buildHsts(1.5)).toThrow(RangeError);
    expect(() => buildHsts('31536000')).toThrow(RangeError);
  });

  it('rejects overflow beyond the max allowed age', () => {
    expect(() => buildHsts(MAX_HSTS_AGE + 1)).toThrow(RangeError);
    expect(() => buildHsts(2 ** 31)).toThrow(RangeError);
  });

  it('rejects a non-object options argument', () => {
    expect(() => buildHsts(100, 'yes')).toThrow(TypeError);
    expect(() => buildHsts(100, [])).toThrow(TypeError);
  });
});

describe('assertFrameOption', () => {
  it('accepts DENY and SAMEORIGIN', () => {
    expect(assertFrameOption('DENY')).toBe('DENY');
    expect(assertFrameOption('sameorigin')).toBe('SAMEORIGIN');
  });

  it('accepts a single ALLOW-FROM origin', () => {
    const header = assertFrameOption('ALLOW-FROM https://example.com');
    expect(header).toBe('ALLOW-FROM https://example.com');
  });

  it('rejects ALLOW-FROM with multiple or non-http origins', () => {
    expect(() => assertFrameOption('ALLOW-FROM https://a.example https://b.example')).toThrow(RangeError);
    expect(() => assertFrameOption('ALLOW-FROM about:blank')).toThrow(RangeError);
  });

  it('rejects unknown values and empty strings', () => {
    expect(() => assertFrameOption('ALLOWALL')).toThrow(RangeError);
    expect(() => assertFrameOption('')).toThrow(TypeError);
  });

  it('rejects non-string input', () => {
    expect(() => assertFrameOption(null)).toThrow(TypeError);
  });
});

describe('assertReferrerPolicy', () => {
  it('accepts OWASP-recommended values', () => {
    expect(assertReferrerPolicy('strict-origin-when-cross-origin')).toBe(
      'strict-origin-when-cross-origin'
    );
    expect(assertReferrerPolicy('NO-REFERRER')).toBe('no-referrer');
    expect(assertReferrerPolicy(' same-origin ')).toBe('same-origin');
  });

  it('rejects unsupported policies', () => {
    expect(() => assertReferrerPolicy('unsafe-everywhere')).toThrow(RangeError);
    expect(() => assertReferrerPolicy('javascript:void(0)')).toThrow(RangeError);
  });
});

describe('assertCoop', () => {
  it('accepts all allowed values', () => {
    expect(assertCoop('same-origin')).toBe('same-origin');
    expect(assertCoop('same-origin-allow-popups')).toBe('same-origin-allow-popups');
    expect(assertCoop('unsafe-none')).toBe('unsafe-none');
  });

  it('rejects unknown values', () => {
    expect(() => assertCoop('same-site')).toThrow(RangeError);
    expect(() => assertCoop('')).toThrow(TypeError);
  });
});

describe('buildSecureHeaderSet', () => {
  it('rejects a non-object options argument', () => {
    expect(() => buildSecureHeaderSet('strict')).toThrow(TypeError);
    expect(() => buildSecureHeaderSet([])).toThrow(TypeError);
  });

  it('emits nosniff by default', () => {
    const headers = buildSecureHeaderSet({});
    expect(headers['X-Content-Type-Options']).toBe('nosniff');
  });

  it('omits nosniff when explicitly disabled', () => {
    const headers = buildSecureHeaderSet({ nosniff: false });
    expect(headers['X-Content-Type-Options']).toBeUndefined();
  });

  it('builds a full hardened header set', () => {
    const headers = buildSecureHeaderSet({
      hsts: { maxAge: 31536000, includeSubDomains: true, preload: true },
      frameOption: 'DENY',
      referrerPolicy: 'strict-origin-when-cross-origin',
      coop: 'same-origin'
    });
    expect(headers['Strict-Transport-Security']).toBe(
      'max-age=31536000; includeSubDomains; preload'
    );
    expect(headers['X-Frame-Options']).toBe('DENY');
    expect(headers['X-Content-Type-Options']).toBe('nosniff');
    expect(headers['Referrer-Policy']).toBe('strict-origin-when-cross-origin');
    expect(headers['Cross-Origin-Opener-Policy']).toBe('same-origin');
  });

  it('accepts a numeric hsts shorthand', () => {
    const headers = buildSecureHeaderSet({ hsts: 600 });
    expect(headers['Strict-Transport-Security']).toBe('max-age=600');
  });

  it('rejects invalid option values', () => {
    expect(() => buildSecureHeaderSet({ hsts: { maxAge: 1.5 } })).toThrow(RangeError);
    expect(() => buildSecureHeaderSet({ hsts: { maxAge: '10' } })).toThrow(RangeError);
    expect(() => buildSecureHeaderSet({ frameOption: 'MAYBE' })).toThrow(RangeError);
    expect(() => buildSecureHeaderSet({ referrerPolicy: 'ferpa' })).toThrow(RangeError);
    expect(() => buildSecureHeaderSet({ coop: 'opaque' })).toThrow(RangeError);
    expect(() => buildSecureHeaderSet({ hsts: 'forever' })).toThrow(TypeError);
  });
});
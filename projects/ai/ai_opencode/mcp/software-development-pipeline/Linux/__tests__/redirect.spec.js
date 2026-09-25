'use strict';

const { isSafeRedirectTarget, assertSafeRedirect, buildLocationHeader } = require('../src/redirect');

describe('isSafeRedirectTarget', () => {
  it('accepts same-origin absolute paths', () => {
    expect(isSafeRedirectTarget('/dashboard')).toBe(true);
    expect(isSafeRedirectTarget('/a/b?c=1')).toBe(true);
  });

  it('accepts safe http/https URLs', () => {
    expect(isSafeRedirectTarget('https://example.com/login')).toBe(true);
  });

  it('rejects protocol-relative URLs', () => {
    expect(isSafeRedirectTarget('//evil.example.com')).toBe(false);
  });

  it('rejects credentials in URLs', () => {
    expect(isSafeRedirectTarget('https://user:pass@example.com/')).toBe(false);
  });

  it('rejects javascript and other protocols', () => {
    expect(isSafeRedirectTarget('javascript:alert(1)')).toBe(false);
    expect(isSafeRedirectTarget('file:///etc/passwd')).toBe(false);
  });

  it('rejects private and loopback hosts', () => {
    expect(isSafeRedirectTarget('http://127.0.0.1/admin')).toBe(false);
    expect(isSafeRedirectTarget('http://localhost:8080/')).toBe(false);
  });

  it('rejects control characters and empty values', () => {
    expect(isSafeRedirectTarget('/path\r\nLocation: /evil')).toBe(false);
    expect(isSafeRedirectTarget('')).toBe(false);
    expect(isSafeRedirectTarget(123)).toBe(false);
  });

  it('rejects oversized targets', () => {
    expect(isSafeRedirectTarget('/' + 'a'.repeat(4096))).toBe(false);
  });
});

describe('assertSafeRedirect', () => {
  it('returns the target when safe', () => {
    expect(assertSafeRedirect('/home')).toBe('/home');
  });

  it('throws on unsafe targets', () => {
    expect(() => assertSafeRedirect('//evil.example.com')).toThrow(RangeError);
    expect(() => assertSafeRedirect('https://10.0.0.5/')).toThrow(RangeError);
  });
});

describe('buildLocationHeader', () => {
  it('rejects header injection sequences outright', () => {
    expect(() => buildLocationHeader('/next\r\nSet-Cookie: evil=1')).toThrow(RangeError);
  });

  it('rejects unsafe redirects outright', () => {
    expect(() => buildLocationHeader('//evil.example.com')).toThrow(RangeError);
  });

  it('caps the length', () => {
    expect(() => buildLocationHeader('/' + 'a'.repeat(5000))).toThrow(RangeError);
  });

  it('returns a safe absolute path unchanged', () => {
    expect(buildLocationHeader('/dashboard')).toBe('/dashboard');
  });
});

'use strict';

const { parseSafeUrl, isSafeUrl, assertSafeUrl } = require('../src/url');

describe('parseSafeUrl', () => {
  it('parses http and https URLs', () => {
    expect(parseSafeUrl('https://example.com/a').protocol).toBe('https:');
    expect(parseSafeUrl('http://example.com/a').protocol).toBe('http:');
  });

  it('rejects non-http protocols', () => {
    expect(() => parseSafeUrl('ftp://example.com')).toThrow(RangeError);
    expect(() => parseSafeUrl('file:///etc/passwd')).toThrow(RangeError);
    expect(() => parseSafeUrl('javascript:alert(1)')).toThrow(RangeError);
  });

  it('rejects embedded credentials', () => {
    expect(() => parseSafeUrl('https://user:pass@example.com')).toThrow(RangeError);
  });

  it('rejects unparseable and non-string input', () => {
    expect(() => parseSafeUrl('not a url')).toThrow(RangeError);
    expect(() => parseSafeUrl('')).toThrow(TypeError);
    expect(() => parseSafeUrl(42)).toThrow(TypeError);
  });
});

describe('isSafeUrl', () => {
  it('accepts public hosts', () => {
    expect(isSafeUrl('https://example.com/path')).toBe(true);
    expect(isSafeUrl('https://sub.example.org')).toBe(true);
  });

  it('rejects loopback hosts (SSRF guard)', () => {
    expect(isSafeUrl('http://localhost:8080/x')).toBe(false);
    expect(isSafeUrl('http://127.0.0.1/x')).toBe(false);
    expect(isSafeUrl('http://[::1]/x')).toBe(false);
  });

  it('rejects private and link-local ranges', () => {
    expect(isSafeUrl('http://10.0.0.5/x')).toBe(false);
    expect(isSafeUrl('http://172.16.1.1/x')).toBe(false);
    expect(isSafeUrl('http://192.168.0.1/x')).toBe(false);
    expect(isSafeUrl('http://169.254.169.254/x')).toBe(false);
  });

  it('rejects unsafe protocols via parse failure', () => {
    expect(isSafeUrl('file:///etc/passwd')).toBe(false);
    expect(isSafeUrl('garbage')).toBe(false);
  });
});

describe('assertSafeUrl', () => {
  it('returns the URL when safe', () => {
    expect(assertSafeUrl('https://example.com/x')).toBe('https://example.com/x');
  });

  it('throws for private hosts', () => {
    expect(() => assertSafeUrl('http://127.0.0.1/x')).toThrow(RangeError);
  });
});

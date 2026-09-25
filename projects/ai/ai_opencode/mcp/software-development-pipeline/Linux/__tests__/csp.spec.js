'use strict';

const { MAX_POLICY_LENGTH, isValidSource, buildCsp, addNonce } = require('../src/csp');

describe('isValidSource', () => {
  it('accepts CSP keywords', () => {
    expect(isValidSource('self')).toBe(true);
    expect(isValidSource('none')).toBe(true);
    expect(isValidSource('unsafe-inline')).toBe(true);
  });

  it('accepts nonce and hash sources', () => {
    expect(isValidSource('nonce-aBcD1234')).toBe(true);
    expect(isValidSource('sha256-AbC/+123xYz=')).toBe(true);
  });

  it('accepts schemes, wildcards, and host sources', () => {
    expect(isValidSource('https:')).toBe(true);
    expect(isValidSource('*.example.com')).toBe(true);
    expect(isValidSource('example.com')).toBe(true);
    expect(isValidSource('https://cdn.example.com/static')).toBe(true);
  });

  it('rejects injection and malformed sources', () => {
    expect(isValidSource('example.com; script-src none')).toBe(false);
    expect(isValidSource('"self"')).toBe(false);
    expect(isValidSource('a b')).toBe(false);
    expect(isValidSource('')).toBe(false);
    expect(isValidSource(42)).toBe(false);
  });
});

describe('buildCsp', () => {
  it('renders a policy from a directive map', () => {
    const policy = buildCsp({
      'default-src': 'none',
      'script-src': ['self', 'nonce-aBcD1234'],
      'img-src': 'https:'
    });
    expect(policy).toBe("default-src none; script-src self nonce-aBcD1234; img-src https:");
  });

  it('requires a default-src directive', () => {
    expect(() => buildCsp({ 'script-src': 'self' })).toThrow(RangeError);
  });

  it('rejects unknown directives', () => {
    expect(() => buildCsp({ 'default-src': 'self', 'evil-src': 'none' })).toThrow(RangeError);
  });

  it('rejects empty directives and over-long policies', () => {
    expect(() => buildCsp({ 'default-src': [] })).toThrow(RangeError);
    expect(() =>
      buildCsp({ 'default-src': 'self', 'img-src': 'x'.repeat(MAX_POLICY_LENGTH) })
    ).toThrow(RangeError);
  });

  it('rejects non-object policies', () => {
    expect(() => buildCsp(['default-src', 'self'])).toThrow(TypeError);
    expect(() => buildCsp(null)).toThrow(TypeError);
  });
});

describe('addNonce', () => {
  it('appends a nonce to the requested directive', () => {
    const policy = addNonce({ 'default-src': 'self', 'script-src': 'self' }, 'script-src', 'abcDEF0123');
    expect(policy['script-src']).toEqual(['self', 'nonce-abcDEF0123']);
    expect(policy['default-src']).toBe('self');
  });

  it('rejects missing directives and weak nonces', () => {
    expect(() => addNonce({ 'default-src': 'self' }, 'script-src', 'abcDEF0123')).toThrow(RangeError);
    expect(() => addNonce({ 'default-src': 'self' }, 'default-src', 'short')).toThrow(TypeError);
    expect(() => addNonce({ 'default-src': 'self' }, 'evil-src', 'abcDEF0123')).toThrow(RangeError);
  });
});

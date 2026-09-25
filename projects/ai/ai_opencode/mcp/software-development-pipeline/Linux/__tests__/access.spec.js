'use strict';

const { validateRoles, hasRole, assertRole, isOwner } = require('../src/access');

describe('validateRoles', () => {
  it('accepts arrays of known roles', () => {
    expect(validateRoles(['admin', 'viewer'])).toEqual(['admin', 'viewer']);
  });

  it('rejects unknown roles', () => {
    expect(() => validateRoles(['root'])).toThrow(RangeError);
    expect(() => validateRoles([123])).toThrow(RangeError);
  });

  it('rejects non-arrays', () => {
    expect(() => validateRoles('admin')).toThrow(TypeError);
  });
});

describe('hasRole', () => {
  it('returns true when the role is present', () => {
    expect(hasRole(['developer'], 'developer')).toBe(true);
  });

  it('returns false when the role is absent', () => {
    expect(hasRole(['viewer'], 'admin')).toBe(false);
  });

  it('rejects unknown required roles', () => {
    expect(() => hasRole(['viewer'], 'root')).toThrow(RangeError);
  });
});

describe('assertRole', () => {
  it('passes when the role is present', () => {
    expect(assertRole(['admin'], 'admin')).toBe(true);
  });

  it('throws when the role is missing (A01 broken access control)', () => {
    expect(() => assertRole(['viewer'], 'admin')).toThrow(/access denied/);
  });
});

describe('isOwner', () => {
  it('compares ownership by id', () => {
    expect(isOwner('u1', 'u1')).toBe(true);
    expect(isOwner('u1', 'u2')).toBe(false);
  });

  it('rejects empty and non-string ids', () => {
    expect(() => isOwner('', 'u1')).toThrow(TypeError);
    expect(() => isOwner('u1', 2)).toThrow(TypeError);
  });
});

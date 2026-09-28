'use strict';

const path = require('path');
const { MAX_PATH_LENGTH, isInside, resolveInside, sanitizeRelativePath } = require('../src/path');

describe('isInside', () => {
  it('accepts a direct child', () => {
    expect(isInside('/var/data', '/var/data/file.txt')).toBe(true);
  });

  it('accepts a nested descendant', () => {
    expect(isInside('/var/data', '/var/data/sub/dir/file.txt')).toBe(true);
  });

  it('accepts the base directory itself', () => {
    expect(isInside('/var/data', '/var/data')).toBe(true);
  });

  it('rejects a sibling directory', () => {
    expect(isInside('/var/data', '/var/data2/file.txt')).toBe(false);
  });

  it('rejects a parent traversal', () => {
    expect(isInside('/var/data', '/var/other/file.txt')).toBe(false);
  });

  it('rejects a traversal that escapes via ..', () => {
    expect(isInside('/var/data', '/var/data/../etc/passwd')).toBe(false);
  });

  it('rejects non-string inputs', () => {
    expect(() => isInside(null, '/var')).toThrow(TypeError);
    expect(() => isInside('/var', 42)).toThrow(TypeError);
  });
});

describe('resolveInside', () => {
  it('returns the absolute resolved path for a safe child', () => {
    const resolved = resolveInside('/var/data', 'sub/file.txt');
    expect(resolved).toBe(path.resolve('/var/data/sub/file.txt'));
  });

  it('normalises dot segments without escaping', () => {
    const resolved = resolveInside('/var/data', './sub/../sub/file.txt');
    expect(resolved).toBe(path.resolve('/var/data/sub/file.txt'));
  });

  it('throws when the child escapes the base', () => {
    expect(() => resolveInside('/var/data', '../../etc/passwd')).toThrow(RangeError);
  });

  it('throws for absolute child paths', () => {
    expect(() => resolveInside('/var/data', '/etc/passwd')).toThrow(RangeError);
  });

  it('throws for null bytes', () => {
    expect(() => resolveInside('/var/data', 'file\u0000.txt')).toThrow(RangeError);
    expect(() => resolveInside('/var\u0000data', 'file.txt')).toThrow(RangeError);
  });

  it('rejects empty or non-string baseDir', () => {
    expect(() => resolveInside('', 'file.txt')).toThrow(TypeError);
    expect(() => resolveInside(123, 'file.txt')).toThrow(TypeError);
  });

  it('rejects empty or non-string childPath', () => {
    expect(() => resolveInside('/var/data', '')).toThrow(TypeError);
    expect(() => resolveInside('/var/data', null)).toThrow(TypeError);
  });

  it('enforces the maximum path length', () => {
    expect(() => resolveInside('/var/data', 'x'.repeat(MAX_PATH_LENGTH + 1))).toThrow(RangeError);
  });
});

describe('sanitizeRelativePath', () => {
  it('normalises backslashes and duplicate slashes', () => {
    expect(sanitizeRelativePath('sub//dir\\file.txt')).toBe('sub/dir/file.txt');
  });

  it('rejects absolute or parent-traversing input', () => {
    expect(() => sanitizeRelativePath('/etc/passwd')).toThrow(RangeError);
    expect(() => sanitizeRelativePath('../x')).toThrow(RangeError);
  });
});

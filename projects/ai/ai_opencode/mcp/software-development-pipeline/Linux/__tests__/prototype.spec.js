'use strict';

const { assertSafeKey, safeClone, deepMerge, freezeDeep, DISALLOWED_KEYS } = require('../src/prototype');

describe('assertSafeKey', () => {
  it('accepts ordinary keys', () => {
    expect(assertSafeKey('name')).toBe('name');
  });

  it('rejects prototype-polluting keys', () => {
    for (const key of DISALLOWED_KEYS) {
      expect(() => assertSafeKey(key)).toThrow(Error);
    }
  });

  it('rejects non-string keys', () => {
    expect(() => assertSafeKey(42)).toThrow(TypeError);
  });
});

describe('safeClone', () => {
  it('clones a plain object without aliasing', () => {
    const source = { a: 1, b: { c: [1, 2] } };
    const copy = safeClone(source);
    expect(copy).toEqual(source);
    expect(copy).not.toBe(source);
    expect(copy.b).not.toBe(source.b);
    copy.b.c.push(3);
    expect(source.b.c).toHaveLength(2);
  });

  it('clones arrays', () => {
    const copy = safeClone([1, [2, 3]]);
    expect(copy).toEqual([1, [2, 3]]);
    expect(copy).not.toBe([1, [2, 3]]);
  });

  it('returns primitives as-is', () => {
    expect(safeClone('x')).toBe('x');
    expect(safeClone(null)).toBeNull();
    expect(safeClone(undefined)).toBeUndefined();
  });

  it('throws on deep nesting', () => {
    let nested = {};
    let cursor = nested;
    for (let i = 0; i < 200; i += 1) {
      cursor.child = {};
      cursor = cursor.child;
    }
    expect(() => safeClone(nested)).toThrow(RangeError);
  });

  it('throws when encountering a polluting key', () => {
    expect(() => safeClone(JSON.parse('{"__proto__": {"polluted": true}}'))).toThrow(Error);
    expect({}.polluted).toBeUndefined();
  });
});

describe('deepMerge', () => {
  it('merges nested objects without mutation of source', () => {
    const target = { a: { b: 1 }, c: 2 };
    const source = { a: { d: 3 }, e: 4 };
    const result = deepMerge(target, source);
    expect(result).toEqual({ a: { b: 1, d: 3 }, c: 2, e: 4 });
    expect(source.a).toEqual({ d: 3 });
  });

  it('blocks prototype pollution via merge keys', () => {
    const target = {};
    expect(() => deepMerge(target, JSON.parse('{"__proto__": {"polluted": true}}'))).toThrow(Error);
    expect({}.polluted).toBeUndefined();
    expect(() => deepMerge(target, JSON.parse('{"constructor": {"prototype": {}}}'))).toThrow(Error);
  });

  it('rejects non-plain-object targets', () => {
    expect(() => deepMerge([], {})).toThrow(TypeError);
    expect(() => deepMerge('x', {})).toThrow(TypeError);
  });

  it('rejects arrays as sources', () => {
    expect(() => deepMerge({}, [])).toThrow(TypeError);
  });
});

describe('freezeDeep', () => {
  it('freezes nested objects and arrays', () => {
    const value = { a: { b: 1 }, list: [1, 2] };
    freezeDeep(value);
    expect(Object.isFrozen(value)).toBe(true);
    expect(Object.isFrozen(value.a)).toBe(true);
    expect(Object.isFrozen(value.list)).toBe(true);
  });

  it('returns primitives as-is', () => {
    expect(freezeDeep(5)).toBe(5);
  });
});

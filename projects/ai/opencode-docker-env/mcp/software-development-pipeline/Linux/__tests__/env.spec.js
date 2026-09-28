'use strict';

const {
  MAX_VALUE_LENGTH,
  DEFAULT_SECRET_SUFFIXES,
  assertEnvName,
  isSecretName,
  readVar,
  requireSecret,
  get
} = require('../src/env');

const SOURCE = {};

beforeEach(() => {
  delete SOURCE.DATABASE_PASSWORD;
  delete SOURCE.API_KEY;
  delete SOURCE.PLAIN_VAR;
});

describe('assertEnvName', () => {
  it('accepts conventional env names', () => {
    expect(assertEnvName('DATABASE_PASSWORD')).toBe('DATABASE_PASSWORD');
    expect(assertEnvName('A1_B')).toBe('A1_B');
  });

  it('rejects invalid names', () => {
    expect(() => assertEnvName('')).toThrow(TypeError);
    expect(() => assertEnvName('bad-name')).toThrow(RangeError);
    expect(() => assertEnvName('1ABC')).toThrow(RangeError);
    expect(() => assertEnvName(42)).toThrow(TypeError);
  });
});

describe('isSecretName', () => {
  it('detects secret suffixes', () => {
    expect(isSecretName('DATABASE_PASSWORD')).toBe(true);
    expect(isSecretName('API_KEY')).toBe(true);
    expect(isSecretName('AUTH_TOKEN')).toBe(true);
    expect(isSecretName('TLS_SECRET')).toBe(true);
    expect(isSecretName('PLAIN_VAR')).toBe(false);
  });

  it('recognizes every default suffix', () => {
    for (const suffix of DEFAULT_SECRET_SUFFIXES) {
      expect(isSecretName('X' + suffix)).toBe(true);
    }
  });
});

describe('readVar', () => {
  it('returns the raw value', () => {
    SOURCE.PLAIN_VAR = 'hello';
    expect(readVar('PLAIN_VAR', SOURCE)).toBe('hello');
  });

  it('returns null when unset', () => {
    expect(readVar('PLAIN_VAR', SOURCE)).toBeNull();
  });

  it('rejects non-string values and oversized values', () => {
    SOURCE.PLAIN_VAR = 42;
    expect(() => readVar('PLAIN_VAR', SOURCE)).toThrow(TypeError);
    SOURCE.PLAIN_VAR = 'x'.repeat(MAX_VALUE_LENGTH + 1);
    expect(() => readVar('PLAIN_VAR', SOURCE)).toThrow(RangeError);
  });
});

describe('requireSecret', () => {
  it('requires non-empty secrets of minimum length', () => {
    SOURCE.API_KEY = 'supersecretkey123';
    expect(requireSecret('API_KEY', SOURCE)).toBe('supersecretkey123');
  });

  it('rejects unset, empty and too-short secrets', () => {
    expect(() => requireSecret('API_KEY', SOURCE)).toThrow(Error);
    SOURCE.API_KEY = '   ';
    expect(() => requireSecret('API_KEY', SOURCE)).toThrow(Error);
    SOURCE.API_KEY = 'short';
    expect(() => requireSecret('API_KEY', SOURCE)).toThrow(RangeError);
  });

  it('rejects placeholder-looking secrets', () => {
    SOURCE.API_KEY = 'changeme';
    expect(() => requireSecret('API_KEY', SOURCE)).toThrow(Error);
  });

  it('rejects non-secret variable names', () => {
    expect(() => requireSecret('PLAIN_VAR', SOURCE)).toThrow(RangeError);
  });
});

describe('get', () => {
  it('reads a single required secret by name', () => {
    SOURCE.DATABASE_PASSWORD = 'DbPassword123!';
    expect(get('DATABASE_PASSWORD', SOURCE)).toBe('DbPassword123!');
  });

  it('reads an object map', () => {
    SOURCE.DATABASE_PASSWORD = 'DbPassword123!';
    SOURCE.PLAIN_VAR = 'visible';
    const result = get({ DATABASE_PASSWORD: true, PLAIN_VAR: false }, SOURCE);
    expect(result.DATABASE_PASSWORD).toBe('DbPassword123!');
    expect(result.PLAIN_VAR).toBe('visible');
  });

  it('returns null for optional unset vars', () => {
    SOURCE.PLAIN_VAR = undefined;
    expect(get({ PLAIN_VAR: false }, SOURCE).PLAIN_VAR).toBeNull();
  });

  it('rejects invalid maps', () => {
    expect(() => get({ PLAIN_VAR: 'weird' }, SOURCE)).toThrow(RangeError);
    expect(() => get(42, SOURCE)).toThrow(TypeError);
  });

  it('requires secret names declared by suffix', () => {
    expect(() => get('PLAIN_VAR', SOURCE)).toThrow(RangeError);
  });

  it('uses process.env by default', () => {
    expect(() => get('THIS_VAR_DOES_NOT_EXIST_9')).toThrow(Error);
  });

  it('rejects secrets shorter than the minimum', () => {
    expect(requireSecret.bind(null, 'API_KEY', SOURCE)).toBeDefined();
    SOURCE.API_KEY = 'short';
    expect(() => get('API_KEY', SOURCE)).toThrow(RangeError);
  });
});
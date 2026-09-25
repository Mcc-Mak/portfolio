'use strict';

const MAX_VALUE_LENGTH = 4096;
const MIN_SECRET_LENGTH = 8;
const ENV_NAME_RE = /^[A-Z][A-Z0-9_]*$/;
const DEFAULT_SECRET_SUFFIXES = ['_KEY', '_SECRET', '_TOKEN', '_PASSWORD'];

function assertEnvName(name) {
  if (typeof name !== 'string' || name.length === 0) {
    throw new TypeError('environment variable name must be a non-empty string');
  }
  if (name.length > 128) {
    throw new RangeError('environment variable name exceeds maximum length');
  }
  if (!ENV_NAME_RE.test(name)) {
    throw new RangeError('environment variable name must match ' + ENV_NAME_RE.toString());
  }
  return name;
}

function isSecretName(name) {
  return DEFAULT_SECRET_SUFFIXES.some((suffix) => name.endsWith(suffix));
}

function readVar(name, source) {
  assertEnvName(name);
  const lookup = source || process.env;
  if (lookup === null || typeof lookup !== 'object') {
    throw new TypeError('source must be an object');
  }
  // eslint-disable-next-line security/detect-object-injection -- name is validated by assertEnvName()
  const value = lookup[name];
  if (value === undefined) {
    return null;
  }
  if (typeof value !== 'string') {
    throw new TypeError('environment variable ' + name + ' must be a string');
  }
  if (value.length > MAX_VALUE_LENGTH) {
    throw new RangeError('environment variable ' + name + ' exceeds maximum length');
  }
  return value;
}

function requireSecret(name, source) {
  assertEnvName(name);
  if (!isSecretName(name)) {
    throw new RangeError('environment variable ' + name + ' is not a recognized secret name');
  }
  const value = readVar(name, source);
  if (value === null || value.trim().length === 0) {
    throw new Error('environment variable ' + name + ' is not set');
  }
  const trimmed = value.trim();
  if (trimmed.length < MIN_SECRET_LENGTH) {
    throw new RangeError('environment variable ' + name + ' must be at least ' + MIN_SECRET_LENGTH + ' characters');
  }
  const lower = trimmed.toLowerCase();
  const placeholderRe = /^(changeme|change-me|please-change-me|replaceme|your-secret|example|foobar|secret|password)([^a-z0-9]|$)/;
  if (placeholderRe.test(lower)) {
    throw new Error('environment variable ' + name + ' appears to contain a placeholder value');
  }
  return trimmed;
}

function get(named, source) {
  if (typeof named === 'string') {
    return requireSecret(named, source);
  }
  if (named !== null && typeof named === 'object' && !Array.isArray(named)) {
    const output = {};
    for (const [key, value] of Object.entries(named)) {
      if (typeof key !== 'string') {
        throw new TypeError('entry names must be strings');
      }
      const flag = value === true || value === 'required';
      if (flag || value === false || value === 'optional') {
        // eslint-disable-next-line security/detect-object-injection -- keys come from the caller's literal map
        output[key] = flag ? requireSecret(key, source) : readVar(key, source);
        continue;
      }
      throw new RangeError('value for ' + key + ' must be true/false/required/optional');
    }
    return output;
  }
  throw new TypeError('argument must be a name or an object map');
}

module.exports = {
  MAX_VALUE_LENGTH,
  MIN_SECRET_LENGTH,
  DEFAULT_SECRET_SUFFIXES,
  assertEnvName,
  isSecretName,
  readVar,
  requireSecret,
  get
};
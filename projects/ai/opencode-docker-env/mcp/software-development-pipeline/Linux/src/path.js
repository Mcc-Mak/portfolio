'use strict';

const path = require('path');

const MAX_PATH_LENGTH = 4096;

function assertSafeBaseDir(baseDir) {
  if (typeof baseDir !== 'string' || baseDir.length === 0) {
    throw new TypeError('baseDir must be a non-empty string');
  }
  if (baseDir.length > MAX_PATH_LENGTH) {
    throw new RangeError('baseDir exceeds maximum length');
  }
  if (baseDir.includes('\u0000')) {
    throw new RangeError('baseDir contains a null byte');
  }
  return path.resolve(baseDir);
}

function assertRelativeChild(childPath) {
  if (typeof childPath !== 'string' || childPath.length === 0) {
    throw new TypeError('childPath must be a non-empty string');
  }
  if (childPath.length > MAX_PATH_LENGTH) {
    throw new RangeError('childPath exceeds maximum length');
  }
  if (childPath.includes('\u0000')) {
    throw new RangeError('childPath contains a null byte');
  }
  if (path.isAbsolute(childPath)) {
    throw new RangeError('childPath must be a relative path');
  }
}

function isInside(baseDir, candidate) {
  if (typeof baseDir !== 'string' || typeof candidate !== 'string') {
    throw new TypeError('baseDir and candidate must be strings');
  }
  const base = path.resolve(baseDir);
  const resolved = path.resolve(candidate);
  const rel = path.relative(base, resolved);
  return rel === '' ||
    (rel !== '..' && !rel.startsWith('..') && !path.isAbsolute(rel));
}

function resolveInside(baseDir, childPath) {
  const base = assertSafeBaseDir(baseDir);
  assertRelativeChild(childPath);
  const candidate = path.resolve(base, childPath);
  if (!isInside(base, candidate)) {
    throw new RangeError('childPath resolves outside baseDir');
  }
  return candidate;
}

function sanitizeRelativePath(input) {
  assertRelativeChild(input);
  const cleaned = input.replace(/\\/g, '/').replace(/\/{2,}/g, '/');
  if (/\.\./.test(cleaned)) {
    throw new RangeError('childPath must not contain parent traversal');
  }
  return cleaned;
}

module.exports = { MAX_PATH_LENGTH, assertSafeBaseDir, assertRelativeChild, isInside, resolveInside, sanitizeRelativePath };
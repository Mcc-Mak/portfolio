'use strict';

const MAX_INPUT_LENGTH = 1024;

function sanitizeString(input) {
  if (typeof input !== 'string') {
    throw new TypeError('input must be a string');
  }
  let out = '';
  for (const ch of input) {
    const code = ch.charCodeAt(0);
    if (code >= 32 && code !== 127) {
      out += ch;
    }
  }
  let value = out.trim();
  if (value.length > MAX_INPUT_LENGTH) {
    value = value.slice(0, MAX_INPUT_LENGTH);
  }
  return value;
}

function isValidEmail(input) {
  if (typeof input !== 'string' || input.length > MAX_INPUT_LENGTH) {
    return false;
  }
  const value = input.trim();
  return /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(value);
}

function isSafeRelativePath(input) {
  if (typeof input !== 'string' || input.length === 0 || input.length > 4096) {
    return false;
  }
  if (input.includes('\u0000')) {
    return false;
  }
  if (input.includes('..')) {
    return false;
  }
  if (input.startsWith('/') || input.startsWith('\\')) {
    return false;
  }
  if (/^[a-zA-Z]:/.test(input)) {
    return false;
  }
  return true;
}

module.exports = { MAX_INPUT_LENGTH, sanitizeString, isValidEmail, isSafeRelativePath };

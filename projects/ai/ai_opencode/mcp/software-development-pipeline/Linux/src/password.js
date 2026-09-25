'use strict';

const MIN_LENGTH = 12;
const MAX_LENGTH = 128;
const MIN_ENTROPY = 45;

const COMMON_PASSWORDS = new Set([
  'password',
  'password1',
  '123456',
  '123456789',
  'qwerty',
  'abc123',
  'letmein',
  'admin',
  'welcome',
  'monkey',
  'dragon',
  'football',
  'baseball',
  'iloveyou',
  'trustno1',
  'sunshine',
  'princess',
  'master',
  '1234567890',
  'shadow'
]);

function estimateEntropy(password) {
  if (typeof password !== 'string') {
    throw new TypeError('password must be a string');
  }
  let charsetSize = 0;
  if (/[a-z]/.test(password)) charsetSize += 26;
  if (/[A-Z]/.test(password)) charsetSize += 26;
  if (/[0-9]/.test(password)) charsetSize += 10;
  if (/[^a-zA-Z0-9]/.test(password)) charsetSize += 33;
  if (charsetSize === 0) {
    return 0;
  }
  return password.length * Math.log2(charsetSize);
}

function assessPassword(password) {
  if (typeof password !== 'string') {
    throw new TypeError('password must be a string');
  }
  const reasons = [];
  if (password.length < MIN_LENGTH) {
    reasons.push('too_short');
  }
  if (password.length > MAX_LENGTH) {
    reasons.push('too_long');
  }
  if (COMMON_PASSWORDS.has(password.toLowerCase())) {
    reasons.push('common_password');
  }
  if (!/[a-z]/.test(password) || !/[A-Z]/.test(password) || !/[0-9]/.test(password)) {
    reasons.push('missing_character_class');
  }
  const entropy = estimateEntropy(password);
  if (entropy < MIN_ENTROPY) {
    reasons.push('low_entropy');
  }
  return { reasons, entropy, meetsPolicy: reasons.length === 0 };
}

function assertStrongPassword(password) {
  const result = assessPassword(password);
  if (!result.meetsPolicy) {
    throw new RangeError('password does not meet policy: ' + result.reasons.join(', '));
  }
  return password;
}

module.exports = {
  MIN_LENGTH,
  MAX_LENGTH,
  MIN_ENTROPY,
  COMMON_PASSWORDS,
  estimateEntropy,
  assessPassword,
  assertStrongPassword
};
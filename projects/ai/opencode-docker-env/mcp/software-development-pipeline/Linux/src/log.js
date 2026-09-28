'use strict';

const secrets = require('./secrets');

const MAX_LOG_FIELD_LENGTH = 2048;

function sanitizeLogValue(input) {
  if (typeof input !== 'string') {
    throw new TypeError('input must be a string');
  }
  let out = '';
  for (const ch of input) {
    if (ch === '\r' || ch === '\n') {
      out += ' ';
    } else {
      const code = ch.charCodeAt(0);
      if (code >= 32 && code !== 127) {
        out += ch;
      }
    }
  }
  let value = out.replace(/ {2,}/g, ' ');
  value = value.trim();
  if (value.length > MAX_LOG_FIELD_LENGTH) {
    value = value.slice(0, MAX_LOG_FIELD_LENGTH);
  }
  return value;
}

function redactSensitive(input) {
  if (typeof input !== 'string') {
    throw new TypeError('input must be a string');
  }
  return secrets.redact(input);
}

function safeLogLine(level, message, fields = {}) {
  if (level !== 'info' && level !== 'warn' && level !== 'error' && level !== 'debug') {
    throw new RangeError('level must be one of info, warn, error, debug');
  }
  if (typeof message !== 'string') {
    throw new TypeError('message must be a string');
  }
  if (fields === undefined || fields === null) {
    throw new TypeError('fields must be an object');
  }
  if (typeof fields !== 'object' || Array.isArray(fields)) {
    throw new TypeError('fields must be a plain object');
  }
  const parts = [];
  for (const [key, value] of Object.entries(fields)) {
    const safeKey = sanitizeLogValue(key);
    if (safeKey.length === 0) {
      continue;
    }
    let raw = String(value);
    if (/key|secret|token|password|authorization|credential/i.test(safeKey)) {
      raw = secrets.REDACTED;
    } else {
      raw = redactSensitive(raw);
    }
    parts.push(safeKey + '=' + sanitizeLogValue(raw));
  }
  const detail = parts.length > 0 ? ' ' + parts.join(' ') : '';
  return level.toUpperCase() + ' ' + sanitizeLogValue(redactSensitive(message)) + detail;
}

module.exports = { MAX_LOG_FIELD_LENGTH, sanitizeLogValue, redactSensitive, safeLogLine };

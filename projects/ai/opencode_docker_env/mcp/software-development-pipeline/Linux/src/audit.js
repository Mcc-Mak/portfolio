'use strict';

const { redact } = require('./secrets');

function serializeMeta(meta) {
  if (meta === undefined || meta === null) {
    return undefined;
  }
  let raw;
  try {
    raw = JSON.stringify(meta);
  } catch (err) {
    return '[unserializable]';
  }
  return redact(raw);
}

function formatAuditLine(phase, status, message, meta) {
  if (typeof phase !== 'string' || phase.length === 0) {
    throw new TypeError('phase must be a non-empty string');
  }
  if (typeof status !== 'string' || status.length === 0) {
    throw new TypeError('status must be a non-empty string');
  }
  if (typeof message !== 'string') {
    throw new TypeError('message must be a string');
  }
  const record = {
    ts: new Date().toISOString(),
    phase,
    status,
    message: redact(message),
    meta: serializeMeta(meta)
  };
  return JSON.stringify(record) + '\n';
}

module.exports = { formatAuditLine };

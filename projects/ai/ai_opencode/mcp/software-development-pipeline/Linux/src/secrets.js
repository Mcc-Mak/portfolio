'use strict';

const REDACTED = '[REDACTED]';

const SECRET_PATTERNS = [
  /["']?(password|passwd|pwd)["']?\s*[:=]\s*["'][^"']+["']/gi,
  /["']?(api[_-]?key|token|secret)["']?\s*[:=]\s*["'][^"']+["']/gi
];

function scanForSecrets(text) {
  if (typeof text !== 'string') {
    throw new TypeError('text must be a string');
  }
  const hits = [];
  for (const pattern of SECRET_PATTERNS) {
    for (const match of text.matchAll(pattern)) {
      hits.push({ key: match[1], matched: match[0], index: match.index });
    }
  }
  return hits;
}

function redact(text) {
  if (typeof text !== 'string') {
    throw new TypeError('text must be a string');
  }
  let value = text;
  for (const hit of scanForSecrets(text)) {
    value = value.replace(hit.matched, REDACTED);
  }
  return value;
}

module.exports = { REDACTED, scanForSecrets, redact };

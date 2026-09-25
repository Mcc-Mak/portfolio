'use strict';

function htmlEntityFor(ch) {
  switch (ch) {
    case '&':
      return '&amp;';
    case '<':
      return '&lt;';
    case '>':
      return '&gt;';
    case '"':
      return '&quot;';
    case "'":
      return '&#x27;';
    default:
      return ch;
  }
}

function escapeHtml(input) {
  if (typeof input !== 'string') {
    throw new TypeError('input must be a string');
  }
  return input.replace(/[&<>"']/g, htmlEntityFor);
}

function escapeAttribute(input) {
  if (typeof input !== 'string') {
    throw new TypeError('input must be a string');
  }
  return input.replace(/[&<>"'`]/g, (ch) => (ch === '`' ? '&#x60;' : htmlEntityFor(ch)));
}

function escapeJsString(input) {
  if (typeof input !== 'string') {
    throw new TypeError('input must be a string');
  }
  let out = '';
  for (const ch of input) {
    const code = ch.charCodeAt(0);
    if (code < 32 || code === 127) {
      out += '\\u' + code.toString(16).padStart(4, '0');
    } else if (ch === '\\') {
      out += '\\\\';
    } else if (ch === "'") {
      out += "\\'";
    } else if (ch === '"') {
      out += '\\"';
    } else {
      out += ch;
    }
  }
  return out;
}

function stripControlChars(input) {
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
  return out;
}

function containsHtmlMarkup(input) {
  if (typeof input !== 'string') {
    throw new TypeError('input must be a string');
  }
  return /<[a-z/!]|&(?:lt|gt|amp|quot|#x27|#x60);/i.test(input);
}

module.exports = {
  escapeHtml,
  escapeAttribute,
  escapeJsString,
  stripControlChars,
  containsHtmlMarkup
};
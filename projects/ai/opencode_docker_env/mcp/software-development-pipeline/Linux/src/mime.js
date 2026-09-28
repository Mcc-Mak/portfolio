'use strict';

const upload = require('./upload');

const MAGIC_SIGNATURES = Object.freeze({
  pdf: [{ offset: 0, bytes: [0x25, 0x50, 0x44, 0x46] }],
  png: [{ offset: 0, bytes: [0x89, 0x50, 0x4e, 0x47] }],
  jpeg: [
    { offset: 0, bytes: [0xff, 0xd8, 0xff] },
    { offset: 0, bytes: [0xff, 0xd8, 0xff, 0xe0] }
  ],
  gif: [
    { offset: 0, bytes: [0x47, 0x49, 0x46, 0x38, 0x37, 0x61] },
    { offset: 0, bytes: [0x47, 0x49, 0x46, 0x38, 0x39, 0x61] }
  ],
  bmp: [{ offset: 0, bytes: [0x42, 0x4d] }],
  txt: []
});

const EXTENSION_TO_MIME = new Map([
  ['pdf', 'application/pdf'],
  ['png', 'image/png'],
  ['jpg', 'image/jpeg'],
  ['jpeg', 'image/jpeg'],
  ['gif', 'image/gif'],
  ['bmp', 'image/bmp'],
  ['txt', 'text/plain']
]);

function matchesSignature(buffer, signature) {
  if (buffer.length < signature.offset + signature.bytes.length) {
    return false;
  }
  for (let i = 0; i < signature.bytes.length; i += 1) {
    if (buffer.at(signature.offset + i) !== signature.bytes.at(i)) {
      return false;
    }
  }
  return true;
}

function sniffFormat(buffer) {
  if (!(buffer instanceof Buffer)) {
    throw new TypeError('buffer must be a Buffer');
  }
  for (const [format, signatures] of Object.entries(MAGIC_SIGNATURES)) {
    if (format === 'txt') {
      continue;
    }
    for (const signature of signatures) {
      if (matchesSignature(buffer, signature)) {
        return format;
      }
    }
  }
  return null;
}

function isTextLike(buffer) {
  if (!(buffer instanceof Buffer)) {
    throw new TypeError('buffer must be a Buffer');
  }
  if (buffer.length === 0) {
    return false;
  }
  for (let i = 0; i < buffer.length; i += 1) {
    const byte = buffer.at(i);
    if (byte === 0) {
      return false;
    }
    if (byte === 9 || byte === 10 || byte === 13) {
      continue;
    }
    if (byte < 32 || byte > 126) {
      return false;
    }
  }
  return true;
}

function detectMimeType(buffer) {
  const format = sniffFormat(buffer);
  if (format !== null && EXTENSION_TO_MIME.has(format)) {
    return EXTENSION_TO_MIME.get(format);
  }
  if (isTextLike(buffer)) {
    return EXTENSION_TO_MIME.get('txt');
  }
  return 'application/octet-stream';
}

function assertExtensionMatchesContent(filename, buffer) {
  const ext = upload.extensionOf(filename);
  if (ext === '') {
    throw new RangeError('filename must have an extension');
  }
  const detected = detectMimeType(buffer);
  const mimeKey = ext.slice(1);
  if (!EXTENSION_TO_MIME.has(mimeKey)) {
    throw new RangeError('extension has no known mime type');
  }
  const expected = EXTENSION_TO_MIME.get(mimeKey);
  if (ext.slice(1) === 'jpg') {
    if (detected !== 'image/jpeg' && detected !== 'image/gif' && detected !== 'application/octet-stream') {
      throw new RangeError('file content does not match its extension');
    }
    return true;
  }
  if (detected !== expected && detected !== 'application/octet-stream') {
    throw new RangeError('file content does not match its extension');
  }
  return true;
}

module.exports = {
  MAGIC_SIGNATURES,
  EXTENSION_TO_MIME,
  sniffFormat,
  isTextLike,
  detectMimeType,
  assertExtensionMatchesContent
};

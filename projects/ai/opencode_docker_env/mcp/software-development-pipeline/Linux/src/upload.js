'use strict';

const ALLOWED_EXTENSIONS = new Set(['.txt', '.pdf', '.png', '.jpg', '.jpeg']);
const MAX_FILE_BYTES = 5 * 1024 * 1024;
const MAX_FILENAME_LENGTH = 255;
const DANGEROUS_EXTENSIONS = new Set(['.exe', '.sh', '.bat', '.cmd', '.ps1', '.js', '.html', '.php']);

function sanitizeFilename(filename) {
  if (typeof filename !== 'string' || filename.length === 0) {
    throw new TypeError('filename must be a non-empty string');
  }
  if (filename.length > MAX_FILENAME_LENGTH) {
    throw new RangeError('filename exceeds maximum length');
  }
  if (filename.includes('\u0000')) {
    throw new RangeError('filename must not contain null bytes');
  }
  let base = filename.split(/[\\/]+/).pop();
  base = base.replace(/\.+$/, '');
  return base;
}

function extensionOf(filename) {
  const base = sanitizeFilename(filename);
  const dot = base.lastIndexOf('.');
  if (dot === -1 || dot === 0) {
    return '';
  }
  return base.slice(dot).toLowerCase();
}

function isAllowedExtension(filename, allowed = ALLOWED_EXTENSIONS) {
  const ext = extensionOf(filename);
  if (ext === '') {
    return false;
  }
  if (!(allowed instanceof Set)) {
    throw new TypeError('allowed must be a Set of extensions');
  }
  return allowed.has(ext);
}

function isDangerousExtension(filename) {
  return DANGEROUS_EXTENSIONS.has(extensionOf(filename));
}

function assertAllowedUpload(filename, bytes, allowed = ALLOWED_EXTENSIONS) {
  if (!isAllowedExtension(filename, allowed)) {
    throw new RangeError('file extension is not allowed');
  }
  const size = Number(bytes);
  if (!Number.isInteger(size) || size < 0) {
    throw new TypeError('bytes must be a non-negative integer');
  }
  if (size > MAX_FILE_BYTES) {
    throw new RangeError('file exceeds maximum allowed size');
  }
  return true;
}

function validateFileBytes(buffer) {
  if (!(buffer instanceof Buffer)) {
    throw new TypeError('buffer must be a Buffer');
  }
  if (buffer.length === 0) {
    throw new RangeError('buffer must not be empty');
  }
  if (buffer.length > MAX_FILE_BYTES) {
    throw new RangeError('buffer exceeds maximum allowed size');
  }
  return buffer.length;
}

module.exports = {
  ALLOWED_EXTENSIONS,
  MAX_FILE_BYTES,
  MAX_FILENAME_LENGTH,
  DANGEROUS_EXTENSIONS,
  sanitizeFilename,
  extensionOf,
  isAllowedExtension,
  isDangerousExtension,
  assertAllowedUpload,
  validateFileBytes
};
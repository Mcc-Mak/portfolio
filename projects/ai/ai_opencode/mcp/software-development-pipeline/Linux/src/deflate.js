'use strict';

const zlib = require('zlib');

const DEFAULT_MAX_OUTPUT = 10 * 1024 * 1024;
const MAX_INPUT = 64 * 1024 * 1024;
const MAX_RATIO = 100;

function safeInflate(input, maxOutputBytes = DEFAULT_MAX_OUTPUT) {
  if (!Buffer.isBuffer(input)) {
    throw new TypeError('input must be a Buffer');
  }
  if (input.length === 0) {
    throw new RangeError('input must not be empty');
  }
  if (input.length > MAX_INPUT) {
    throw new RangeError('input exceeds maximum compressed size');
  }
  if (typeof maxOutputBytes !== 'number') {
    throw new RangeError('maxOutputBytes must be a positive integer');
  }
  const limit = maxOutputBytes;
  if (!Number.isInteger(limit) || limit <= 0) {
    throw new RangeError('maxOutputBytes must be a positive integer');
  }
  let output;
  try {
    output = zlib.inflateSync(input, { maxOutputLength: limit });
  } catch (err) {
    if (err.code === 'ERR_BUFFER_TOO_LARGE') {
      throw new RangeError('inflated output exceeds maximum size');
    }
    throw new RangeError('input is not valid deflate data');
  }
  return output;
}

function decompressJson(input, maxOutputBytes = DEFAULT_MAX_OUTPUT) {
  const bytes = safeInflate(input, maxOutputBytes);
  const ratio = bytes.length / Math.max(input.length, 1);
  if (ratio > MAX_RATIO) {
    throw new RangeError('decompression ratio exceeds safety limit');
  }
  const text = bytes.toString('utf8');
  try {
    return JSON.parse(text);
  } catch (err) {
    throw new SyntaxError('inflated payload is not valid JSON');
  }
}

module.exports = { DEFAULT_MAX_OUTPUT, MAX_INPUT, MAX_RATIO, safeInflate, decompressJson };
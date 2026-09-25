'use strict';

const zlib = require('zlib');
const { DEFAULT_MAX_OUTPUT, MAX_INPUT, safeInflate, decompressJson } = require('../src/deflate');

describe('safeInflate', () => {
  it('inflates a small payload', () => {
    const original = Buffer.from('hello world');
    const compressed = zlib.deflateSync(original);
    expect(safeInflate(compressed).toString()).toBe('hello world');
  });

  it('respects an output limit', () => {
    const compressed = zlib.deflateSync(Buffer.alloc(2048, 0x61));
    expect(() => safeInflate(compressed, 100)).toThrow(RangeError);
  });

  it('rejects empty input', () => {
    expect(() => safeInflate(Buffer.alloc(0))).toThrow(RangeError);
  });

  it('rejects non-Buffer input', () => {
    expect(() => safeInflate('not-a-buffer')).toThrow(TypeError);
  });

  it('rejects corrupt deflate data', () => {
    expect(() => safeInflate(Buffer.from('garbage' , 'utf8'))).toThrow(RangeError);
  });

  it('rejects oversized compressed input', () => {
    const big = Buffer.alloc(MAX_INPUT + 1);
    expect(() => safeInflate(big)).toThrow(RangeError);
  });

  it('rejects invalid maxOutputBytes arguments', () => {
    const compressed = zlib.deflateSync(Buffer.from('x'));
    expect(() => safeInflate(compressed, 0)).toThrow(RangeError);
    expect(() => safeInflate(compressed, '1024')).toThrow(RangeError);
  });
});

describe('decompressJson', () => {
  it('round-trips a JSON object', () => {
    const payload = { ok: true, items: [1, 2, 3] };
    const compressed = zlib.deflateSync(Buffer.from(JSON.stringify(payload), 'utf8'));
    expect(decompressJson(compressed)).toEqual(payload);
  });

  it('rejects payloads exceeding the decompression ratio', () => {
    const original = Buffer.alloc(DEFAULT_MAX_OUTPUT + 1, 'a');
    const compressed = zlib.deflateSync(original);
    expect(() => decompressJson(compressed)).toThrow(RangeError);
  });

  it('rejects non-JSON inflated payloads', () => {
    const compressed = zlib.deflateSync(Buffer.from('<html></html>', 'utf8'));
    expect(() => decompressJson(compressed)).toThrow(SyntaxError);
  });
});
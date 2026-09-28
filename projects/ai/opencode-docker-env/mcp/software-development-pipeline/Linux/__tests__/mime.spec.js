'use strict';

const { sniffFormat, isTextLike, detectMimeType, assertExtensionMatchesContent } = require('../src/mime');

describe('sniffFormat', () => {
  it('detects PNG magic bytes', () => {
    expect(sniffFormat(Buffer.from([0x89, 0x50, 0x4e, 0x47, 0x0d]))).toBe('png');
  });

  it('detects JPEG magic bytes', () => {
    expect(sniffFormat(Buffer.from([0xff, 0xd8, 0xff, 0xe0]))).toBe('jpeg');
  });

  it('detects PDF magic bytes', () => {
    expect(sniffFormat(Buffer.from([0x25, 0x50, 0x44, 0x46, 0x2d]))).toBe('pdf');
  });

  it('detects GIF magic bytes', () => {
    expect(sniffFormat(Buffer.from([0x47, 0x49, 0x46, 0x38, 0x39, 0x61]))).toBe('gif');
  });

  it('returns null for unknown bytes', () => {
    expect(sniffFormat(Buffer.from([0x00, 0x11, 0x22]))).toBeNull();
  });

  it('returns null for short buffers', () => {
    expect(sniffFormat(Buffer.from([0xff, 0xd8]))).toBeNull();
  });

  it('rejects non-Buffer input', () => {
    expect(() => sniffFormat([1, 2, 3])).toThrow(TypeError);
  });
});

describe('isTextLike', () => {
  it('accepts printable text', () => {
    expect(isTextLike(Buffer.from('hello world\n'))).toBe(true);
  });

  it('rejects binary data', () => {
    expect(isTextLike(Buffer.from([0x00, 0x01]))).toBe(false);
    expect(isTextLike(Buffer.from([0x89, 0x50, 0x4e, 0x47]))).toBe(false);
  });

  it('rejects empty buffers', () => {
    expect(isTextLike(Buffer.alloc(0))).toBe(false);
  });
});

describe('detectMimeType', () => {
  it('maps sniffed formats to mime types', () => {
    expect(detectMimeType(Buffer.from([0x25, 0x50, 0x44, 0x46]))).toBe('application/pdf');
    expect(detectMimeType(Buffer.from([0x89, 0x50, 0x4e, 0x47]))).toBe('image/png');
    expect(detectMimeType(Buffer.from([0xff, 0xd8, 0xff, 0xe0]))).toBe('image/jpeg');
  });

  it('treats text-like content as text/plain', () => {
    expect(detectMimeType(Buffer.from('just text'))).toBe('text/plain');
  });

  it('falls back to octet-stream', () => {
    expect(detectMimeType(Buffer.from([0x01, 0x02, 0x03, 0x04]))).toBe('application/octet-stream');
  });
});

describe('assertExtensionMatchesContent', () => {
  it('accepts matching extension and content', () => {
    expect(assertExtensionMatchesContent('photo.png', Buffer.from([0x89, 0x50, 0x4e, 0x47]))).toBe(true);
    expect(assertExtensionMatchesContent('doc.pdf', Buffer.from([0x25, 0x50, 0x44, 0x46, 0x2d]))).toBe(true);
  });

  it('accepts .jpg for jpeg/octet-stream content', () => {
    expect(assertExtensionMatchesContent('photo.jpg', Buffer.from([0xff, 0xd8, 0xff, 0xe0]))).toBe(true);
  });

  it('rejects mismatched extension and content', () => {
    expect(() => assertExtensionMatchesContent('photo.png', Buffer.from([0x25, 0x50, 0x44, 0x46]))).toThrow(RangeError);
  });

  it('rejects extensionless filenames', () => {
    expect(() => assertExtensionMatchesContent('noext', Buffer.from('x'))).toThrow(RangeError);
  });

  it('rejects unknown extensions', () => {
    expect(() => assertExtensionMatchesContent('file.exe', Buffer.from('x'))).toThrow(RangeError);
  });
});
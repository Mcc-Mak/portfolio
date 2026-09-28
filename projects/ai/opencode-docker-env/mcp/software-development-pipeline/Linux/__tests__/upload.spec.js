'use strict';

const {
  MAX_FILE_BYTES,
  MAX_FILENAME_LENGTH,
  DANGEROUS_EXTENSIONS,
  sanitizeFilename,
  extensionOf,
  isAllowedExtension,
  isDangerousExtension,
  assertAllowedUpload,
  validateFileBytes
} = require('../src/upload');

describe('sanitizeFilename', () => {
  it('strips directory traversal components', () => {
    expect(sanitizeFilename('../../etc/passwd')).toBe('passwd');
    expect(sanitizeFilename('a\\b\\c.txt')).toBe('c.txt');
  });

  it('trims trailing dots', () => {
    expect(sanitizeFilename('report.txt...')).toBe('report.txt');
  });

  it('rejects null bytes', () => {
    expect(() => sanitizeFilename('a\u0000b')).toThrow(RangeError);
  });

  it('rejects over-long names', () => {
    expect(() => sanitizeFilename('x'.repeat(MAX_FILENAME_LENGTH + 1))).toThrow(RangeError);
  });

  it('rejects non-strings', () => {
    expect(() => sanitizeFilename(123)).toThrow(TypeError);
  });
});

describe('extensionOf', () => {
  it('extracts a lowercase extension with dot', () => {
    expect(extensionOf('photo.PNG')).toBe('.png');
  });

  it('returns empty for names without an extension', () => {
    expect(extensionOf('README')).toBe('');
    expect(extensionOf('.hidden')).toBe('');
  });
});

describe('isAllowedExtension', () => {
  it('accepts whitelisted extensions', () => {
    expect(isAllowedExtension('a.txt')).toBe(true);
    expect(isAllowedExtension('b.PDF')).toBe(true);
  });

  it('rejects other extensions', () => {
    expect(isAllowedExtension('c.exe')).toBe(false);
    expect(isAllowedExtension('noext')).toBe(false);
  });

  it('rejects a non-Set allowed argument', () => {
    expect(() => isAllowedExtension('a.txt', ['.txt'])).toThrow(TypeError);
  });
});

describe('isDangerousExtension', () => {
  it('flags executable and script extensions', () => {
    for (const ext of DANGEROUS_EXTENSIONS) {
      expect(isDangerousExtension('payload' + ext)).toBe(true);
    }
  });

  it('passes safe extensions', () => {
    expect(isDangerousExtension('a.txt')).toBe(false);
  });
});

describe('assertAllowedUpload', () => {
  it('accepts in-limit whitelisted files', () => {
    expect(assertAllowedUpload('a.txt', 1024)).toBe(true);
  });

  it('rejects disallowed extensions', () => {
    expect(() => assertAllowedUpload('a.exe', 1024)).toThrow(RangeError);
  });

  it('rejects oversized files', () => {
    expect(() => assertAllowedUpload('a.txt', MAX_FILE_BYTES + 1)).toThrow(RangeError);
  });

  it('rejects invalid sizes', () => {
    expect(() => assertAllowedUpload('a.txt', -1)).toThrow(TypeError);
    expect(() => assertAllowedUpload('a.txt', 1.5)).toThrow(TypeError);
  });
});

describe('validateFileBytes', () => {
  it('returns the byte count for a valid buffer', () => {
    expect(validateFileBytes(Buffer.from('hello'))).toBe(5);
  });

  it('rejects non-buffers and empty buffers', () => {
    expect(() => validateFileBytes('nope')).toThrow(TypeError);
    expect(() => validateFileBytes(Buffer.alloc(0))).toThrow(RangeError);
  });

  it('rejects oversized buffers', () => {
    expect(() => validateFileBytes(Buffer.alloc(MAX_FILE_BYTES + 1))).toThrow(RangeError);
  });
});
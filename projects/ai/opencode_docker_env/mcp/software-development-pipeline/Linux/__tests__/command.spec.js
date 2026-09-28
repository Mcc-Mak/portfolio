'use strict';

const {
  MAX_ARG_LENGTH,
  assertSafeCommand,
  assertSafeArg,
  assertSafeShellArg,
  buildSpawnArgs
} = require('../src/command');

describe('assertSafeCommand', () => {
  it('accepts a plain binary name', () => {
    expect(assertSafeCommand('git')).toBe('git');
    expect(assertSafeCommand('npm')).toBe('npm');
  });

  it('rejects commands with arguments or metacharacters', () => {
    expect(() => assertSafeCommand('git log')).toThrow(RangeError);
    expect(() => assertSafeCommand('rm -rf /')).toThrow(RangeError);
    expect(() => assertSafeCommand('sh; cat /etc/passwd')).toThrow(RangeError);
  });

  it('rejects empty and non-string commands', () => {
    expect(() => assertSafeCommand('')).toThrow(TypeError);
    expect(() => assertSafeCommand(7)).toThrow(TypeError);
  });
});

describe('assertSafeArg', () => {
  it('accepts normal arguments including spaces (spawn-safe)', () => {
    expect(assertSafeArg('--file')).toBe('--file');
    expect(assertSafeArg('a b')).toBe('a b');
  });

  it('rejects null bytes', () => {
    expect(() => assertSafeArg('a\u0000b')).toThrow(RangeError);
  });

  it('rejects over-long arguments', () => {
    expect(() => assertSafeArg('x'.repeat(MAX_ARG_LENGTH + 1))).toThrow(RangeError);
  });

  it('rejects non-strings', () => {
    expect(() => assertSafeArg(3)).toThrow(TypeError);
  });
});

describe('assertSafeShellArg', () => {
  it('accepts metacharacter-free arguments', () => {
    expect(assertSafeShellArg('value')).toBe('value');
  });

  it('rejects shell metacharacters', () => {
    expect(() => assertSafeShellArg('$(rm -rf)')).toThrow(RangeError);
    expect(() => assertSafeShellArg('a;b')).toThrow(RangeError);
    expect(() => assertSafeShellArg('a b')).toThrow(RangeError);
  });
});

describe('buildSpawnArgs', () => {
  it('returns [command, safeArgs]', () => {
    const [cmd, args] = buildSpawnArgs('git', ['status', '--short']);
    expect(cmd).toBe('git');
    expect(args).toEqual(['status', '--short']);
  });

  it('validates the command', () => {
    expect(() => buildSpawnArgs('git; rm', [])).toThrow(RangeError);
  });

  it('validates each argument', () => {
    expect(() => buildSpawnArgs('git', ['a\u0000b'])).toThrow(RangeError);
  });

  it('rejects non-array args', () => {
    expect(() => buildSpawnArgs('git', 'status')).toThrow(TypeError);
  });
});

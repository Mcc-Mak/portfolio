'use strict';

const MAX_ARG_LENGTH = 1024;
const COMMAND_RE = /^[a-zA-Z0-9_.-]+$/;
const NUL_BYTE = '\u0000';
const SHELL_METACHARACTERS = /[;&|`$()<>*?{}[\]!'"\\\s\r\n]/;

function assertSafeCommand(command) {
  if (typeof command !== 'string' || command.length === 0) {
    throw new TypeError('command must be a non-empty string');
  }
  if (!COMMAND_RE.test(command)) {
    throw new RangeError('command must be a single binary name without arguments');
  }
  return command;
}

function assertSafeArg(arg) {
  if (typeof arg !== 'string') {
    throw new TypeError('arg must be a string');
  }
  if (arg.length === 0) {
    return arg;
  }
  if (arg.length > MAX_ARG_LENGTH) {
    throw new RangeError('arg exceeds maximum length');
  }
  if (arg.includes(NUL_BYTE)) {
    throw new RangeError('arg must not contain null bytes');
  }
  return arg;
}

function assertSafeShellArg(arg) {
  assertSafeArg(arg);
  if (SHELL_METACHARACTERS.test(arg)) {
    throw new RangeError('arg contains shell metacharacters');
  }
  return arg;
}

function buildSpawnArgs(command, args) {
  assertSafeCommand(command);
  if (!Array.isArray(args)) {
    throw new TypeError('args must be an array');
  }
  return [command, args.map(assertSafeArg)];
}

module.exports = {
  MAX_ARG_LENGTH,
  assertSafeCommand,
  assertSafeArg,
  assertSafeShellArg,
  buildSpawnArgs
};

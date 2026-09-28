'use strict';

const { formatAuditLine } = require('../src/audit');
const { REDACTED } = require('../src/secrets');

describe('formatAuditLine', () => {
  it('emits a single-line JSON record with ts, phase, status, message', () => {
    const line = formatAuditLine('coding', 'pass', 'wrote src/auth.js');
    expect(line.endsWith('\n')).toBe(true);
    const record = JSON.parse(line);
    expect(record.phase).toBe('coding');
    expect(record.status).toBe('pass');
    expect(record.message).toBe('wrote src/auth.js');
    expect(Date.parse(record.ts)).not.toBeNaN();
  });

  it('redacts secrets from the message', () => {
    const line = formatAuditLine('devsecops', 'fail', 'found api_key = "supersecret"');
    expect(line).not.toContain('supersecret');
    expect(line).toContain(REDACTED);
  });

  it('redacts secrets nested in meta', () => {
    const line = formatAuditLine('devsecops', 'fail', 'sca', { token: 'tok123', count: 2 });
    expect(line).not.toContain('tok123');
    expect(line).toContain(REDACTED);
  });

  it('omits meta when absent', () => {
    const record = JSON.parse(formatAuditLine('docs', 'pass', 'done'));
    expect(record.meta).toBeUndefined();
  });

  it('rejects invalid phase and status', () => {
    expect(() => formatAuditLine('', 'pass', 'x')).toThrow(TypeError);
    expect(() => formatAuditLine('coding', '', 'x')).toThrow(TypeError);
  });

  it('rejects non-string messages', () => {
    expect(() => formatAuditLine('coding', 'pass', 42)).toThrow(TypeError);
  });
});

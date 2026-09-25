'use strict';

const {
  normalizeConfig,
  detectEngine,
  resolveTarget,
  severityFromRisk,
  parseZapJson,
  isDastBlocked,
  countSeverities,
  buildDastReport,
  PAID_RECOMMENDATIONS,
  DEFAULT_CONFIG
} = require('../src/dast');

describe('normalizeConfig', () => {
  it('applies safe defaults for an empty config', () => {
    const c = normalizeConfig({});
    expect(c.engine).toBe('auto');
    expect(c.port).toBe(3000);
    expect(c.failThreshold).toBe('high');
    expect(c.stage.enabled).toBe(false);
    expect(c.zap.image).toBe('ghcr.io/zaproxy/zaproxy');
  });

  it('normalizes failThreshold to a known severity', () => {
    expect(normalizeConfig({ failThreshold: 'Critical' }).failThreshold).toBe('critical');
    expect(normalizeConfig({ failThreshold: 'bogus' }).failThreshold).toBe('high');
  });

  it('rejects an out-of-range port', () => {
    expect(() => normalizeConfig({ port: 0 })).toThrow(RangeError);
    expect(() => normalizeConfig({ port: 70000 })).toThrow(RangeError);
  });

  it('preserves staging and zap overrides', () => {
    const c = normalizeConfig({
      stage: { enabled: true, command: 'node src/index.js' },
      zap: { image: 'custom/zap' }
    });
    expect(c.stage.command).toBe('node src/index.js');
    expect(c.zap.image).toBe('custom/zap');
    expect(DEFAULT_CONFIG.zap.baselineScript).toBe('zap-baseline.py');
  });
});

describe('detectEngine', () => {
  it('prefers the ZAP CLI over Docker when both exist', () => {
    const engine = detectEngine({ dockerAvailable: true, zapImagePresent: true, zapCliAvailable: true });
    expect(engine.available).toBe(true);
    expect(engine.mode).toBe('cli');
    expect(engine.kind).toBe('free');
    expect(engine.onPrem).toBe(true);
  });

  it('falls back to the Docker ZAP image', () => {
    const engine = detectEngine({ dockerAvailable: true, zapImagePresent: true, zapCliAvailable: false });
    expect(engine.available).toBe(true);
    expect(engine.mode).toBe('docker');
  });

  it('reports unavailable when no free engine is present', () => {
    const engine = detectEngine({ dockerAvailable: false, zapImagePresent: false, zapCliAvailable: false });
    expect(engine.available).toBe(false);
    expect(engine.engine).toBeNull();
  });

  it('treats a missing ZAP image as unavailable', () => {
    const engine = detectEngine({ dockerAvailable: true, zapImagePresent: false, zapCliAvailable: false });
    expect(engine.available).toBe(false);
  });
});

describe('resolveTarget', () => {
  it('uses the configured target when present', () => {
    expect(resolveTarget({ target: 'https://app.example.com' }, null))
      .toBe('https://app.example.com');
  });

  it('prefers an explicit fallback over the default port', () => {
    expect(resolveTarget({}, 'http://10.0.0.5:8080')).toBe('http://10.0.0.5:8080');
  });

  it('falls back to localhost:port', () => {
    expect(resolveTarget({}, '')).toBe('http://localhost:3000');
    expect(resolveTarget({ port: 9000 }, null)).toBe('http://localhost:9000');
  });

  it('ignores non-URL fallbacks', () => {
    expect(resolveTarget({}, 'not-a-url')).toBe('http://localhost:3000');
  });
});

describe('severityFromRisk', () => {
  it('maps ZAP risk codes to severities', () => {
    expect(severityFromRisk('3')).toBe('high');
    expect(severityFromRisk('2')).toBe('medium');
    expect(severityFromRisk('1')).toBe('low');
    expect(severityFromRisk('0')).toBe('info');
    expect(severityFromRisk('4')).toBe('critical');
  });

  it('parses riskdesc first-word severities', () => {
    expect(severityFromRisk('High (Medium)')).toBe('high');
    expect(severityFromRisk('Informational')).toBe('info');
  });

  it('defaults to info for unknown values', () => {
    expect(severityFromRisk('')).toBe('info');
    expect(severityFromRisk('weird')).toBe('info');
  });
});

describe('parseZapJson', () => {
  const sample = JSON.stringify({
    site: [
      {
        '@name': 'http://localhost:3000',
        alerts: [
          { pluginid: '40018', alert: 'SQL Injection', riskdesc: 'High (Medium)', confidence: '2', cweid: '89', uri: 'http://localhost:3000/login', evidence: 'x' },
          { pluginid: '10021', alert: 'X-Content-Type-Options', riskdesc: 'Low (Medium)', cweid: '693', uri: 'http://localhost:3000/' }
        ]
      }
    ]
  });

  it('extracts findings with severity, CWE and OWASP mapping', () => {
    const findings = parseZapJson(sample);
    expect(findings).toHaveLength(2);
    const sql = findings[0];
    expect(sql.id).toBe('40018');
    expect(sql.severity).toBe('high');
    expect(sql.cwe).toBe('CWE-89');
    expect(sql.owasp).toContain('Injection');
    expect(sql.uri).toContain('/login');
  });

  it('rejects non-string input', () => {
    expect(() => parseZapJson(42)).toThrow(TypeError);
  });

  it('rejects invalid JSON', () => {
    expect(() => parseZapJson('{not json')).toThrow(TypeError);
  });

  it('returns empty findings for a clean report', () => {
    expect(parseZapJson('{"site": []}')).toHaveLength(0);
  });
});

describe('isDastBlocked / countSeverities', () => {
  const findings = [
    { severity: 'high', name: 'SQL Injection' },
    { severity: 'low', name: 'Headers' }
  ];

  it('blocks at the high threshold', () => {
    expect(isDastBlocked(findings, 'high')).toBe(true);
  });

  it('does not block below the threshold', () => {
    expect(isDastBlocked(findings, 'critical')).toBe(false);
    expect(isDastBlocked([{ severity: 'low' }], 'high')).toBe(false);
  });

  it('counts severities including zeros', () => {
    const counts = countSeverities(findings);
    expect(counts.find((r) => r.severity === 'high').count).toBe(1);
    expect(counts.find((r) => r.severity === 'critical').count).toBe(0);
    expect(counts.find((r) => r.severity === 'info').count).toBe(0);
  });
});

describe('buildDastReport', () => {
  it('recommends the two best paid engines when none is available', () => {
    const report = buildDastReport([], { target: 'http://localhost:3000', available: false });
    expect(report).toContain('BLOCKED (R10/R19)');
    expect(report).toContain(PAID_RECOMMENDATIONS[0].name);
    expect(report).toContain(PAID_RECOMMENDATIONS[1].name);
    expect(PAID_RECOMMENDATIONS).toHaveLength(2);
    expect(PAID_RECOMMENDATIONS.every((r) => r.onPrem)).toBe(true);
  });

  it('reports a clean pass with no findings', () => {
    const report = buildDastReport([], { target: 'http://localhost:3000', available: true, scanExited: true });
    expect(report).toContain('No findings');
  });

  it('embeds findings and a blocked status', () => {
    const report = buildDastReport(
      [{ id: '40018', name: 'SQL Injection', severity: 'high', owasp: 'A03:2021 Injection (SQL)', cwe: 'CWE-89', uri: 'http://localhost:3000/login' }],
      { target: 'http://localhost:3000', available: true, scanExited: true, threshold: 'high' }
    );
    expect(report).toContain('Severity Distribution');
    expect(report).toContain('40018');
    expect(report).toContain('BLOCKED (R10/R19)');
  });

  it('flags an aborted scan', () => {
    const report = buildDastReport([], { available: true, scanExited: false });
    expect(report).toContain('COULD NOT COMPLETE');
  });
});

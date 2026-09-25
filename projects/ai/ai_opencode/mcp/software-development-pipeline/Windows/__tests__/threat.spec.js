'use strict';

const {
  normalizeSeverity,
  severityFromCvss,
  cweToOwasp,
  extractCwe,
  parseAudit,
  enrichWithOsv,
  isThreatBlocked,
  countSeverities,
  buildThreatReport
} = require('../src/threat');

describe('normalizeSeverity', () => {
  it('maps moderate to medium', () => {
    expect(normalizeSeverity('moderate')).toBe('medium');
  });

  it('passes known severities through', () => {
    expect(normalizeSeverity('high')).toBe('high');
    expect(normalizeSeverity('critical')).toBe('critical');
  });

  it('falls back to info for unknown values', () => {
    expect(normalizeSeverity('cosmic')).toBe('info');
  });
});

describe('severityFromCvss', () => {
  it('classifies scores into fixed bands', () => {
    expect(severityFromCvss(9.8)).toBe('critical');
    expect(severityFromCvss(7.5)).toBe('high');
    expect(severityFromCvss(5.0)).toBe('medium');
    expect(severityFromCvss(2.0)).toBe('low');
  });

  it('returns null for non-numeric input', () => {
    expect(severityFromCvss('n/a')).toBeNull();
  });
});

describe('cweToOwasp', () => {
  it('maps CWE-89 to SQL injection category', () => {
    expect(cweToOwasp('CWE-89')).toContain('Injection');
  });

  it('defaults to A06 for unmapped CWE ids', () => {
    expect(cweToOwasp('CWE-000')).toContain('A06');
  });
});

describe('extractCwe', () => {
  it('normalizes lowercase cwe- prefixes', () => {
    expect(extractCwe({ cwe: 'cwe-79' })).toBe('CWE-79');
  });

  it('handles array form', () => {
    expect(extractCwe({ cwe: ['CWE-94', 'CWE-95'] })).toBe('CWE-94');
  });
});

describe('parseAudit', () => {
  const sample = {
    metadata: { vulnerabilities: { total: 1 } },
    vulnerabilities: {
      'lodash': [
        {
          range: '>=4.0.0 <4.17.20',
          severity: 'high',
          isDirect: true,
          cvss: { score: 7.2 },
          via: [
            { title: 'Command Injection', cwe: 'CWE-78', cvss: { score: 7.2 }, url: 'https://example/advisory' }
          ]
        }
      ]
    }
  };

  it('extracts findings with CVSS, CWE and OWASP mapping', () => {
    const findings = parseAudit(sample);
    expect(findings).toHaveLength(1);
    const f = findings[0];
    expect(f.name).toBe('lodash');
    expect(f.severity).toBe('high');
    expect(f.cvss).toBeCloseTo(7.2, 5);
    expect(f.cwe).toBe('CWE-78');
    expect(f.owasp).toContain('Injection');
    expect(f.direct).toBe(true);
  });

  it('rejects non-object audit input', () => {
    expect(() => parseAudit('nope')).toThrow(TypeError);
  });

  it('returns empty findings for a clean audit', () => {
    expect(parseAudit({ metadata: {}, vulnerabilities: {} })).toHaveLength(0);
  });
});

describe('enrichWithOsv', () => {
  it('appends CVE aliases and CVSS from the OSV map', () => {
    const findings = parseAudit({
      vulnerabilities: { 'axios': [{ range: '1.2.3', severity: 'moderate', via: [{ title: 'x' }] }] }
    });
    const enriched = enrichWithOsv(findings, new Map([
      ['axios@1.2.3', { aliases: ['CVE-2021-1234'], maxCvss: 9.8, source: 'OSV.dev' }]
    ]));
    expect(enriched[0].cves).toEqual(['CVE-2021-1234']);
    expect(enriched[0].severity).toBe('critical');
  });

  it('rejects a non-Map osv arg', () => {
    const findings = parseAudit({ vulnerabilities: {} });
    expect(() => enrichWithOsv(findings, { 'a@1': {} })).toThrow(TypeError);
  });
});

describe('isThreatBlocked / countSeverities', () => {
  const blocked = [
    { severity: 'high', name: 'a' },
    { severity: 'low', name: 'b' }
  ];

  it('blocks when any high/critical finding exists', () => {
    expect(isThreatBlocked(blocked)).toBe(true);
  });

  it('does not block on low/info only', () => {
    expect(isThreatBlocked([{ severity: 'low' }])).toBe(false);
  });

  it('counts findings per severity', () => {
    const counts = countSeverities(blocked);
    const bySeverity = (s) => {
      const row = counts.find((r) => r.severity === s);
      return row ? row.count : 0;
    };
    expect(bySeverity('high')).toBe(1);
    expect(bySeverity('low')).toBe(1);
    expect(bySeverity('critical')).toBe(0);
  });
});

describe('buildThreatReport', () => {
  it('reports a clean dependency set', () => {
    const report = buildThreatReport([], {});
    expect(report).toContain('No known vulnerabilities');
  });

  it('embeds a mermaid chart and blocked status for findings', () => {
    const findings = parseAudit({
      vulnerabilities: {
        'lodash': [
          { range: '>=4 <4.17.20', severity: 'critical', isDirect: true, cvss: { score: 9.8 }, via: [{ cwe: 'CWE-79' }] }
        ]
      }
    });
    const report = buildThreatReport(findings, { source: 'npm audit + OSV.dev' });
    expect(report).toContain('mermaid');
    expect(report).toContain('BLOCKED');
    expect(report).toContain('lodash');
  });
});
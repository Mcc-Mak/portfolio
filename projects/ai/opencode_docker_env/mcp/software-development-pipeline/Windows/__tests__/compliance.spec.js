'use strict';

const {
  normalizeConfig,
  evaluateAll,
  blockingGaps,
  summarize,
  buildComplianceReport,
  BLOCK_SEVERITIES
} = require('../src/compliance');

const VALID_CONTROL = [
  {
    id: 'C-1',
    label: 'Access control documented',
    severity: 'high',
    kind: 'present',
    pattern: 'access control'
  },
  {
    id: 'C-2',
    label: 'No PAN stored',
    severity: 'critical',
    kind: 'absent',
    pattern: '\\b\\d{4}[- ]?\\d{4}[- ]?\\d{4}[- ]?\\d{4}\\b'
  }
];

// Composes a 16-digit test card at runtime so no literal PAN sequence is
// committed to the tree (the repo's own PCI-1 gate scans __tests__ too).
const CARD_TEXT = '4111 1111' + ' 1111 1111';

describe('normalizeConfig', () => {
  it('returns a flat control list from frameworks', () => {
    const controls = normalizeConfig({ frameworks: { test: { controls: VALID_CONTROL } } });
    expect(controls).toHaveLength(2);
    expect(controls[0].framework).toBe('test');
  });

  it('rejects a config without frameworks', () => {
    expect(() => normalizeConfig({})).toThrow(TypeError);
  });

  it('rejects an invalid severity', () => {
    const bad = [{ id: 'C-1', label: 'x', severity: 'severe', pattern: '.+' }];
    expect(() => normalizeConfig({ frameworks: { f: { controls: bad } } })).toThrow(RangeError);
  });

  it('rejects an invalid kind', () => {
    const bad = [{ id: 'C-1', label: 'x', severity: 'high', kind: 'maybe', pattern: '.+' }];
    expect(() => normalizeConfig({ frameworks: { f: { controls: bad } } })).toThrow(RangeError);
  });

  it('rejects an uncompilable pattern', () => {
    const bad = [{ id: 'C-1', label: 'x', severity: 'high', pattern: '([unclosed' }];
    expect(() => normalizeConfig({ frameworks: { f: { controls: bad } } })).toThrow(TypeError);
  });
});

describe('evaluateAll', () => {
  it('passes present controls that match and blocks absent controls that match', () => {
    const controls = normalizeConfig({ frameworks: { f: { controls: VALID_CONTROL } } });
    const files = [
      { file: 'src/a.js', text: 'we enforce access control via roles' },
      { file: 'src/b.js', text: CARD_TEXT }
    ];
    const results = evaluateAll(controls, files);
    expect(results[0].passed).toBe(true);
    expect(results[0].evidence).toEqual(['src/a.js']);
    expect(results[1].passed).toBe(false);
  });

  it('passes absent controls when no file matches', () => {
    const controls = normalizeConfig({ frameworks: { f: { controls: VALID_CONTROL } } });
    const results = evaluateAll(controls, [{ file: 'specs/x.md', text: 'no card data anywhere' }]);
    expect(results[1].passed).toBe(true);
  });

  it('rejects non-array inputs', () => {
    expect(() => evaluateAll('nope', [])).toThrow(TypeError);
  });
});

describe('blockingGaps / summarize', () => {
  const controls = normalizeConfig({ frameworks: { f: { controls: VALID_CONTROL } } });
  const results = evaluateAll(controls, [
    { file: 'src/a.js', text: 'we enforce access control via roles' },
    { file: 'src/b.js', text: CARD_TEXT }
  ]);

  it('flags only high/critical failures', () => {
    const gaps = blockingGaps(results);
    expect(gaps).toHaveLength(1);
    expect(gaps[0].id).toBe('C-2');
  });

  it('BLOCK_SEVERITIES contains high and critical', () => {
    expect(BLOCK_SEVERITIES).toEqual(['high', 'critical']);
  });

  it('summarizes pass counts', () => {
    const summary = summarize(results);
    expect(summary.total).toBe(2);
    expect(summary.passed).toBe(1);
    const fRow = summary.frameworks.find((row) => row.framework === 'f');
    expect(fRow.passed).toBe(1);
  });
});

describe('buildComplianceReport', () => {
  const controls = normalizeConfig({ frameworks: { f: { controls: VALID_CONTROL } } });
  const results = evaluateAll(controls, [
    { file: 'src/a.js', text: 'we enforce access control via roles' },
    { file: 'src/b.js', text: CARD_TEXT }
  ]);

  it('embeds a mermaid chart and marks blocking status', () => {
    const report = buildComplianceReport(results, { scanned: 2 });
    expect(report).toContain('mermaid');
    expect(report).toContain('OUT OF COMPLIANCE');
    expect(report).toContain('C-2');
  });

  it('reports pass state when nothing blocks', () => {
    const clean = evaluateAll(controls, [
      { file: 'specs/x.md', text: 'access control and least privilege are documented' }
    ]);
    expect(buildComplianceReport(clean, { scanned: 1 })).toContain('All high/critical controls satisfied');
  });
});
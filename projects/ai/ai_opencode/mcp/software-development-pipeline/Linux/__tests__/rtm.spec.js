'use strict';

const {
  parseSrsTables,
  parseUserStoryMaps,
  parseAuditLog,
  verifyArtifact,
  buildMatrix,
  rtmGate,
  buildCoverageSummary,
  buildRtmReport
} = require('../src/rtm');

const SAMPLE_SRS = `# SRS

## 3. Functional Requirements

| ID | Requirement | Source |
| :--- | :--- | :--- |
| FR-001 | Single entry point via opencode run | R5 |
| FR-002 | Strict workflow order enforcement | W1 |
| FR-008 | ESLint SAST gate | R8 |
| FR-011 | Audit log traceability | R11 |

## 4. Non-Functional Requirements

| ID | Category | Requirement | Source |
| :--- | :--- | :--- | :--- |
| NFR-001 | Security | OWASP-compliant coding | R2/R8/R9 |
| NFR-004 | Quality | Defect density <= 0.5 | C4-1 |

## 6. Traceability

| Requirement ID | Source ID | Artifact | Status |
| :--- | :--- | :--- | :--- |
| FR-001 | R5 | scripts/opencode-pipeline.sh | Specified |
| FR-002 | W1 | scripts/opencode-pipeline.sh | Specified |
| FR-008 | R8 | .eslintrc.js + pipeline | Specified |
| FR-011 | R11 | logs/audit.log | Specified |
| NFR-001 | R2/R8/R9 | security gates | Specified |
| NFR-004 | C4-1 | metrics.db builds | Specified |
`;

const SAMPLE_STORIES = `# User Stories

## Story 1: Run the full pipeline

**As a** developer,
**I want** to run the pipeline,
**so that** it works.

**Maps to**: FR-001, FR-002

## Story 2: Security gate blocks

**Maps to**: FR-008
`;

const SAMPLE_AUDIT = `2026-08-09 12:00:00 | Phase 1 (Requirements) | PASSED
2026-08-09 12:01:00 | Phase 2 (Coding) | PASSED
2026-08-09 12:02:00 | Phase 3 (SAST) | PASSED
2026-08-09 12:03:00 | Pipeline | SUCCESS
`;

const FILE_LIST = [
  'scripts/opencode-pipeline.sh',
  '.eslintrc.js',
  'logs/audit.log',
  'docs/00_Planning_Requirements/srs.md',
  'docs/01_Design_Architecture/tech-design.md',
  'src/server.js',
  '__tests__/server.spec.js',
  'docs/03_Development_Testing/pipeline-guide.md',
  'docs/05_Security_Compliance/sec-hardening.md',
  'docs/02_Setup_Configuration/setup-guide.md',
  'docs/06_User_Reference/user-guide.md',
  'docs/03_Development_Testing/dev-guide.md',
  'docs/03_Development_Testing/test-guide.md',
  'docs/02_Setup_Configuration/admin-guide.md',
  'docs/04_Operations_Maintenance/mon-alert-guide.md',
  '.opencode/skills/secure-coding/SKILL.md',
  '.opencode/skills/requirement-gathering/SKILL.md',
  'README.md'
];

describe('parseSrsTables', () => {
  const parsed = parseSrsTables(SAMPLE_SRS);

  it('parses functional requirements', () => {
    expect(parsed.functional).toHaveLength(4);
    expect(parsed.functional[0].id).toBe('FR-001');
    expect(parsed.functional[0].source).toBe('R5');
  });

  it('parses non-functional requirements', () => {
    expect(parsed.nonFunctional).toHaveLength(2);
    expect(parsed.nonFunctional[0].id).toBe('NFR-001');
    expect(parsed.nonFunctional[0].source).toBe('R2/R8/R9');
  });

  it('parses the traceability table', () => {
    expect(parsed.traceability).toHaveLength(6);
    expect(parsed.traceability[0].reqId).toBe('FR-001');
    expect(parsed.traceability[0].artifact).toBe('scripts/opencode-pipeline.sh');
  });

  it('returns empty arrays for empty text', () => {
    const empty = parseSrsTables('# No tables here');
    expect(empty.functional).toEqual([]);
    expect(empty.nonFunctional).toEqual([]);
    expect(empty.traceability).toEqual([]);
  });
});

describe('parseUserStoryMaps', () => {
  const stories = parseUserStoryMaps(SAMPLE_STORIES);

  it('parses story headers and titles', () => {
    expect(stories).toHaveLength(2);
    expect(stories[0].storyId).toBe('Story 1');
    expect(stories[0].title).toContain('Run the full pipeline');
  });

  it('parses maps-to FR references', () => {
    expect(stories[0].mapsTo).toEqual(['FR-001', 'FR-002']);
    expect(stories[1].mapsTo).toEqual(['FR-008']);
  });

  it('returns empty array for no stories', () => {
    expect(parseUserStoryMaps('# No stories')).toEqual([]);
  });
});

describe('parseAuditLog', () => {
  const results = parseAuditLog(SAMPLE_AUDIT);

  it('parses phase results', () => {
    expect(results.get('Phase 1 (Requirements)')).toBe('PASSED');
    expect(results.get('Phase 3 (SAST)')).toBe('PASSED');
  });

  it('parses pipeline success', () => {
    expect(results.get('Pipeline')).toBe('SUCCESS');
  });

  it('returns empty Map for empty log', () => {
    expect(parseAuditLog('')).toBeInstanceOf(Map);
    expect(parseAuditLog('').size).toBe(0);
  });
});

describe('verifyArtifact', () => {
  it('verifies a file path that exists', () => {
    const result = verifyArtifact('scripts/opencode-pipeline.sh', FILE_LIST);
    expect(result.verified).toBe(true);
  });

  it('flags a file path that is missing', () => {
    const result = verifyArtifact('scripts/missing.js', FILE_LIST);
    expect(result.verified).toBe(false);
    expect(result.detail).toContain('MISSING');
  });

  it('handles conceptual artifacts as verified', () => {
    const result = verifyArtifact('security gates', FILE_LIST);
    expect(result.verified).toBe(true);
    expect(result.detail).toBe('conceptual');
  });

  it('handles compound artifacts with + separator', () => {
    const result = verifyArtifact('.eslintrc.js + pipeline', FILE_LIST);
    expect(result.verified).toBe(true);
  });

  it('flags compound artifacts when one part is missing', () => {
    const result = verifyArtifact('.eslintrc.js + scripts/missing.js', FILE_LIST);
    expect(result.verified).toBe(false);
  });

  it('handles comma-separated artifacts', () => {
    const result = verifyArtifact('src/, __tests__/', FILE_LIST);
    expect(result.verified).toBe(true);
  });

  it('handles glob patterns with *', () => {
    const result = verifyArtifact('docs/00_Planning_Requirements/*.md', FILE_LIST);
    expect(result.verified).toBe(true);
  });

  it('handles mid-path globs like .opencode/skills/*/SKILL.md', () => {
    const result = verifyArtifact('.opencode/skills/*/SKILL.md', FILE_LIST);
    expect(result.verified).toBe(true);
  });

  it('handles bare filenames by basename match', () => {
    const result = verifyArtifact('server.js', FILE_LIST);
    expect(result.verified).toBe(true);
  });

  it('handles conceptual npm audit phrase', () => {
    const result = verifyArtifact('npm audit in pipeline', FILE_LIST);
    expect(result.verified).toBe(true);
    expect(result.detail).toBe('conceptual');
  });
});

describe('buildMatrix', () => {
  const parsed = parseSrsTables(SAMPLE_SRS);
  const stories = parseUserStoryMaps(SAMPLE_STORIES);
  const audit = parseAuditLog(SAMPLE_AUDIT);
  const matrix = buildMatrix(parsed, stories, FILE_LIST, audit, {
    skipDocgen: false,
    skipGates: false,
    testFiles: ['__tests__/server.spec.js'],
    docFiles: ['docs/03_Development_Testing/pipeline-guide.md', 'docs/05_Security_Compliance/sec-hardening.md']
  });

  it('produces one row per requirement', () => {
    expect(matrix).toHaveLength(6);
  });

  it('cross-references user stories', () => {
    const fr001 = matrix.find((r) => r.reqId === 'FR-001');
    expect(fr001.userStory).toBe('Story 1');
  });

  it('marks requirements without a story with a dash', () => {
    const nfr004 = matrix.find((r) => r.reqId === 'NFR-004');
    expect(nfr004.userStory).toBe('\u2014');
  });

  it('verifies declared artifacts against the file list', () => {
    const fr001 = matrix.find((r) => r.reqId === 'FR-001');
    expect(fr001.artifactVerified).toBe(true);
  });

  it('blocks when a declared artifact is missing', () => {
    const badMatrix = buildMatrix(parsed, stories, [], audit, {
      skipDocgen: false,
      skipGates: false,
      testFiles: [],
      docFiles: []
    });
    const fr001 = badMatrix.find((r) => r.reqId === 'FR-001');
    expect(fr001.status).toBe('BLOCK');
  });

  it('marks verification as SKIPPED for security gates when skipGates is true', () => {
    const skipMatrix = buildMatrix(parsed, stories, FILE_LIST, audit, {
      skipDocgen: false,
      skipGates: true,
      testFiles: ['__tests__/server.spec.js'],
      docFiles: ['docs/05_Security_Compliance/sec-hardening.md']
    });
    const fr008 = skipMatrix.find((r) => r.reqId === 'FR-008');
    expect(fr008.verificationResult).toBe('SKIPPED');
  });

  it('marks verification as SKIPPED for docs gates when skipDocgen is true', () => {
    const skipMatrix = buildMatrix(parsed, stories, FILE_LIST, audit, {
      skipDocgen: true,
      skipGates: false,
      testFiles: ['__tests__/server.spec.js'],
      docFiles: ['docs/03_Development_Testing/pipeline-guide.md']
    });
    const fr006 = skipMatrix.find((r) => r.reqId === 'NFR-001');
    expect(fr006.status).not.toBe('BLOCK');
  });
});

describe('rtmGate', () => {
  it('passes when all rows are PASS or WARN', () => {
    const matrix = [
      { status: 'PASS', reqId: 'FR-001', issues: [], artifactDetail: 'ok' },
      { status: 'WARN', reqId: 'FR-002', issues: ['no user story'], artifactDetail: 'ok' }
    ];
    const gate = rtmGate(matrix);
    expect(gate.passed).toBe(true);
    expect(gate.blocking).toEqual([]);
    expect(gate.warnings).toHaveLength(1);
  });

  it('blocks when any row is BLOCK', () => {
    const matrix = [
      { status: 'PASS', reqId: 'FR-001', issues: [], artifactDetail: 'ok' },
      { status: 'BLOCK', reqId: 'FR-002', issues: ['broken artifact link'], artifactDetail: 'MISSING: x.js' }
    ];
    const gate = rtmGate(matrix);
    expect(gate.passed).toBe(false);
    expect(gate.blocking).toHaveLength(1);
  });
});

describe('buildCoverageSummary', () => {
  it('counts statuses and computes coverage', () => {
    const matrix = [
      { status: 'PASS' },
      { status: 'PASS' },
      { status: 'WARN' },
      { status: 'BLOCK' }
    ];
    const summary = buildCoverageSummary(matrix);
    expect(summary.total).toBe(4);
    expect(summary.passed).toBe(2);
    expect(summary.warnings).toBe(1);
    expect(summary.blocking).toBe(1);
    expect(summary.coverage).toBe(50);
  });

  it('handles empty matrix', () => {
    const summary = buildCoverageSummary([]);
    expect(summary.total).toBe(0);
    expect(summary.coverage).toBe(0);
  });
});

describe('buildRtmReport', () => {
  const parsed = parseSrsTables(SAMPLE_SRS);
  const stories = parseUserStoryMaps(SAMPLE_STORIES);
  const audit = parseAuditLog(SAMPLE_AUDIT);
  const matrix = buildMatrix(parsed, stories, FILE_LIST, audit, {
    skipDocgen: false,
    skipGates: false,
    testFiles: ['__tests__/server.spec.js'],
    docFiles: ['docs/03_Development_Testing/pipeline-guide.md', 'docs/05_Security_Compliance/sec-hardening.md']
  });
  const report = buildRtmReport(matrix, { generatedAt: '2026-08-12T00:00:00Z', ssotPresent: true });

  it('contains the title and meta table', () => {
    expect(report).toContain('Requirements Traceability Matrix');
    expect(report).toContain('| Generated | 2026-08-12T00:00:00Z |');
    expect(report).toContain('| SSOT Present | Yes (opencode.project.md) |');
  });

  it('embeds a Mermaid flowchart', () => {
    expect(report).toContain('```mermaid');
    expect(report).toContain('flowchart LR');
  });

  it('contains the traceability matrix table with all requirements', () => {
    expect(report).toContain('FR-001');
    expect(report).toContain('FR-008');
    expect(report).toContain('NFR-001');
    expect(report).toContain('NFR-004');
  });

  it('contains the coverage summary table', () => {
    expect(report).toContain('## Coverage Summary');
    expect(report).toContain('| :white_check_mark: PASS |');
  });

  it('contains the gate verdict', () => {
    expect(report).toContain('## Gate Verdict');
  });

  it('marks the gate as PASSED when no blocks', () => {
    expect(report).toContain('RTM GATE PASSED');
  });

  it('marks the gate as BLOCKED when blocks exist', () => {
    const badMatrix = buildMatrix(parsed, stories, [], audit, {
      skipDocgen: false,
      skipGates: false,
      testFiles: [],
      docFiles: []
    });
    const badReport = buildRtmReport(badMatrix, {});
    expect(badReport).toContain('RTM GATE BLOCKED');
  });
});

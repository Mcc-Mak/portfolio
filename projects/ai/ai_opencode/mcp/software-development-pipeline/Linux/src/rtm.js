'use strict';

const SOURCE_GATE_MAP = {
  R1: 'Phase 1 (Requirements)',
  R2: 'Phase 2 (Coding)',
  R3: 'Phase 4 (Docs)',
  R4: 'Phase 1 (Requirements)',
  R5: 'Phase 1 (Requirements)',
  R6: 'Pipeline',
  R7: 'Phase 3 (Runtime Protection)',
  R8: 'Phase 3 (SAST)',
  R9: 'Phase 3 (SCA)',
  R10: 'Pipeline',
  R11: 'Pipeline',
  R12: 'Phase 1 (Requirements)',
  R13: 'Phase 1 (Requirements)',
  R16: 'Phase 3 (Compliance)',
  R17: 'Phase 3 (Threat Model)',
  R19: 'Phase 3 (DAST)',
  W1: 'Pipeline',
  'C4-1': 'Pipeline',
  'C4-2': 'Phase 3 (Metrics)',
  'C4-3': 'Phase 3 (SPC)',
  'C4-4': 'Phase 3 (Prediction)',
  'C4-5': 'Phase 3 (Prediction)'
};

const SOURCE_GATE_ENTRIES = Object.entries(SOURCE_GATE_MAP).map((entry) => ({ key: entry[0], gate: entry[1] }));

const CONCEPTUAL_ARTIFACTS = [
  'pipeline', 'pipeline phase', 'pipeline phase 3', 'pipeline gate logic',
  'security gates', 'gate logic', 'toolchain config',
  'metrics.db timestamps', 'metrics.db builds',
  'npm audit', 'npm audit in pipeline', 'eslint / loc'
];

function splitCell(cell) {
  return String(cell).split(/[+,]/).map((s) => s.trim()).filter((s) => s.length > 0);
}

function isConceptualArtifact(artifact) {
  const lower = String(artifact).toLowerCase().trim();
  return CONCEPTUAL_ARTIFACTS.indexOf(lower) !== -1;
}

function normalizePathRef(ref) {
  let p = ref.replace(/^\.\//, '').replace(/^`|`$/g, '');
  if (p.endsWith('/')) p = p.slice(0, -1);
  return p;
}

function pathMatches(fileList, ref) {
  const normalized = normalizePathRef(ref);

  if (fileList.indexOf(normalized) !== -1) return true;

  for (const f of fileList) {
    if (f.indexOf(normalized + '/') === 0) return true;
  }

  if (normalized.indexOf('*') !== -1) {
    const regexStr = normalized.replace(/[.+^${}()|[\]\\]/g, '\\$&').replace(/\*/g, '.*');
    const regex = new RegExp('^' + regexStr + '$');
    for (const f of fileList) {
      if (regex.test(f)) return true;
    }
  }

  if (normalized.indexOf('/') === -1) {
    for (const f of fileList) {
      const base = f.split('/').pop();
      if (base === normalized) return true;
    }
  }

  return false;
}

function verifyArtifact(artifactField, fileList) {
  const parts = splitCell(artifactField);
  const verifiedPaths = [];
  const missing = [];
  let allConceptual = true;

  for (const part of parts) {
    if (isConceptualArtifact(part)) continue;
    allConceptual = false;
    if (pathMatches(fileList, part)) {
      verifiedPaths.push(normalizePathRef(part));
    } else {
      missing.push(part);
    }
  }

  if (allConceptual) {
    return { verified: true, detail: 'conceptual', paths: [] };
  }
  return {
    verified: missing.length === 0,
    detail: missing.length === 0
      ? verifiedPaths.join(', ')
      : 'MISSING: ' + missing.join(', '),
    paths: verifiedPaths
  };
}

function splitCells(line) {
  return line.trim().split('|').map((c) => c.trim()).filter((c) => c.length > 0);
}

function isSeparatorLine(line) {
  const trimmed = line.trim();
  return trimmed.indexOf('|') !== -1 && /^[-:\s|]+$/.test(trimmed);
}

function parseMarkdownTables(text) {
  const lines = text.split('\n');
  const tables = [];
  let current = null;
  let expectingSep = false;

  for (const line of lines) {
    const hasPipe = line.indexOf('|') !== -1;

    if (!hasPipe) {
      if (current !== null && !expectingSep) tables.push(current);
      current = null;
      expectingSep = false;
      continue;
    }

    if (expectingSep) {
      if (isSeparatorLine(line)) {
        expectingSep = false;
      } else {
        current = null;
        expectingSep = false;
        const cells = splitCells(line);
        if (cells.length > 0) {
          current = { header: cells, rows: [] };
          expectingSep = true;
        }
      }
      continue;
    }

    if (current === null) {
      const cells = splitCells(line);
      if (cells.length > 0 && !isSeparatorLine(line)) {
        current = { header: cells, rows: [] };
        expectingSep = true;
      }
      continue;
    }

    if (isSeparatorLine(line)) continue;

    const cells = splitCells(line);
    if (cells.length === 0) {
      tables.push(current);
      current = null;
      continue;
    }
    current.rows.push(cells);
  }

  if (current !== null && !expectingSep) tables.push(current);
  return tables;
}

function headerMatches(header, expected) {
  if (header.length < expected.length) return false;
  return expected.every((exp, idx) => {
    const h = header.slice(idx, idx + 1).join('');
    return h.toLowerCase().indexOf(exp.toLowerCase()) !== -1;
  });
}

function parseSrsTables(srsText) {
  const result = { functional: [], nonFunctional: [], traceability: [] };
  const tables = parseMarkdownTables(srsText);

  for (const t of tables) {
    var firstId = t.rows.length > 0 ? (t.rows[0][0] || '') : '';
    var isTraceability = t.header.length >= 4
      && headerMatches(t.header, ['requirement', 'source', 'artifact', 'status']);

    if (!isTraceability && /^FR-/.test(firstId)) {
      for (const row of t.rows) {
        if (/^FR-/.test(row[0])) {
          result.functional.push({ id: row[0], requirement: row[1] || '', source: row[2] || '' });
        }
      }
    }

    if (!isTraceability && /^NFR-/.test(firstId)) {
      var nfrHasCategory = t.header.length >= 4
        && headerMatches(t.header, ['id', 'category', 'requirement', 'source']);
      for (const row of t.rows) {
        if (/^NFR-/.test(row[0])) {
          if (nfrHasCategory) {
            result.nonFunctional.push({ id: row[0], category: row[1] || '', requirement: row[2] || '', source: row[3] || '' });
          } else {
            result.nonFunctional.push({ id: row[0], category: '', requirement: row[1] || '', source: row[2] || '' });
          }
        }
      }
    }

    if (isTraceability) {
      for (const row of t.rows) {
        if (/^(FR|NFR)-/.test(row[0])) {
          result.traceability.push({ reqId: row[0], sourceId: row[1] || '', artifact: row[2] || '', status: row[3] || '' });
        }
      }
    }
  }

  return result;
}

function parseUserStoryMaps(storiesText) {
  const stories = [];
  const lines = storiesText.split('\n');
  let currentId = null;
  let currentTitle = null;

  for (const line of lines) {
    const headerMatch = line.match(/^##\s+(Story\s+\d+)\s*[:-]\s*(.*)$/i);
    if (headerMatch) {
      if (currentId) {
        stories.push({ storyId: currentId, title: currentTitle || '', mapsTo: [] });
      }
      currentId = headerMatch[1].replace(/\s+/g, ' ').trim();
      currentTitle = headerMatch[2].trim();
      continue;
    }
    if (currentId) {
      const mapsMatch = line.match(/\*\*Maps?\s+to\*\*\s*[:：]\s*(.+)/i);
      if (mapsMatch) {
        const ids = mapsMatch[1].split(/[,;]/).map((s) => s.trim().replace(/\.$/, '')).filter((s) => /^(FR|NFR)-/.test(s));
        const existing = stories.find((s) => s.storyId === currentId);
        if (existing) {
          existing.mapsTo = existing.mapsTo.concat(ids);
        } else {
          stories.push({ storyId: currentId, title: currentTitle || '', mapsTo: ids });
        }
        currentId = null;
        currentTitle = null;
      }
    }
  }
  if (currentId) {
    stories.push({ storyId: currentId, title: currentTitle || '', mapsTo: [] });
  }
  return stories;
}

function parseAuditLog(auditText) {
  const results = new Map();
  const lines = auditText.split('\n');
  for (const line of lines) {
    const parts = line.split('|').map((s) => s.trim());
    if (parts.length >= 3) {
      const phase = parts[1];
      const result = parts[2];
      if (phase && result && /^(PASSED|FAILED|BLOCKED|SUCCESS|SKIPPED)/i.test(result)) {
        results.set(phase, result.toUpperCase().split(/\s/)[0]);
      }
    }
  }
  return results;
}

function findStoryForReq(storyMaps, reqId) {
  for (const story of storyMaps) {
    if (story.mapsTo.indexOf(reqId) !== -1) {
      return story.storyId;
    }
  }
  return null;
}

function findTestForCode(codePaths, testFiles) {
  for (const codePath of codePaths) {
    const base = codePath.replace(/^src\//, '').replace(/\.js$/, '');
    const baseName = base.split('/').pop();
    for (const testFile of testFiles) {
      const testBase = testFile.replace(/^__tests__\//, '').replace(/\.spec\.js$/, '');
      if (testBase === baseName || testBase === base) {
        return testFile;
      }
    }
  }
  return null;
}

const DOC_KEYWORD_ENTRIES = [
  { reqId: 'fr-001', keys: ['pipeline-guide', 'setup-guide'] },
  { reqId: 'fr-002', keys: ['pipeline-guide'] },
  { reqId: 'fr-003', keys: ['dev-guide', 'arch'] },
  { reqId: 'fr-004', keys: ['dev-guide'] },
  { reqId: 'fr-005', keys: ['dev-guide', 'test-guide'] },
  { reqId: 'fr-006', keys: ['user-guide', 'setup-guide'] },
  { reqId: 'fr-007', keys: ['sec-hardening'] },
  { reqId: 'fr-008', keys: ['sec-hardening', 'test-guide'] },
  { reqId: 'fr-009', keys: ['sec-hardening'] },
  { reqId: 'fr-010', keys: ['pipeline-guide', 'sec-hardening'] },
  { reqId: 'fr-011', keys: ['admin-guide', 'mon-alert'] },
  { reqId: 'fr-012', keys: ['dev-guide'] },
  { reqId: 'fr-013', keys: ['dev-guide'] },
  { reqId: 'fr-014', keys: ['mon-alert'] },
  { reqId: 'fr-015', keys: ['mon-alert'] },
  { reqId: 'fr-016', keys: ['mon-alert'] },
  { reqId: 'fr-017', keys: ['mon-alert'] },
  { reqId: 'fr-018', keys: ['sec-hardening', 'pipeline-guide'] }
];

function findDocForReq(req, docFiles) {
  const reqLower = req.id.toLowerCase();
  const entry = DOC_KEYWORD_ENTRIES.find((e) => e.reqId === reqLower);
  if (!entry) return null;
  for (const key of entry.keys) {
    for (const doc of docFiles) {
      if (doc.toLowerCase().indexOf(key) !== -1) return doc;
    }
  }
  return null;
}

function resolveGateName(source) {
  const entry = SOURCE_GATE_ENTRIES.find((e) => e.key === source);
  return entry ? entry.gate : null;
}

function resolveVerification(source, auditResults, options) {
  const gateName = resolveGateName(source);
  if (!gateName) return { gate: source, result: 'UNKNOWN', text: 'No gate mapping' };

  if (gateName === 'Phase 4 (Docs)' && options.skipDocgen) {
    return { gate: gateName, result: 'SKIPPED', text: gateName + ': SKIPPED (--no-docgen)' };
  }
  if (gateName.indexOf('Phase 3') === 0 && options.skipGates) {
    return { gate: gateName, result: 'SKIPPED', text: gateName + ': SKIPPED (--no-gates)' };
  }

  const result = auditResults.get(gateName);
  if (result) {
    return { gate: gateName, result, text: gateName + ': ' + result };
  }
  if (gateName === 'Pipeline') {
    const pipelineResult = auditResults.get('Pipeline');
    if (pipelineResult) {
      return { gate: gateName, result: pipelineResult, text: gateName + ': ' + pipelineResult };
    }
  }
  return { gate: gateName, result: 'NOT RUN', text: gateName + ': NOT RUN' };
}

function buildMatrix(parsed, storyMaps, fileList, auditResults, options) {
  const opts = options || {};
  const rows = [];

  const allReqs = parsed.functional.concat(parsed.nonFunctional);
  for (const req of allReqs) {
    const trace = parsed.traceability.find((t) => t.reqId === req.id)
      || { reqId: req.id, sourceId: req.source, artifact: '', status: 'Not traced' };
    const source = trace.sourceId || req.source;
    const artifactCheck = trace.artifact ? verifyArtifact(trace.artifact, fileList) : { verified: false, detail: 'no artifact declared', paths: [] };
    const story = findStoryForReq(storyMaps, req.id);
    const testFile = findTestForCode(artifactCheck.paths, opts.testFiles || []);
    const docFile = findDocForReq(req, opts.docFiles || []);
    const verification = resolveVerification(source, auditResults, opts);

    let status = 'PASS';
    const issues = [];

    if (!artifactCheck.verified && trace.artifact && !isConceptualArtifact(trace.artifact)) {
      status = 'BLOCK';
      issues.push('broken artifact link');
    }
    if (verification.result === 'FAILED' || verification.result === 'BLOCKED') {
      status = 'BLOCK';
      issues.push('gate failed');
    }
    if (status !== 'BLOCK') {
      if (!story) {
        status = 'WARN';
        issues.push('no user story');
      }
      if (artifactCheck.paths.length > 0 && !testFile && opts.testFiles && opts.testFiles.length > 0) {
        if (status !== 'WARN') status = 'WARN';
        issues.push('no matching test');
      }
    }

    rows.push({
      reqId: req.id,
      source: source,
      description: req.requirement || req.category + ' ' + req.requirement,
      userStory: story || '\u2014',
      design: 'docs/01_Design_Architecture/tech-design.md',
      artifact: trace.artifact || '\u2014',
      artifactVerified: artifactCheck.verified,
      artifactDetail: artifactCheck.detail,
      test: testFile || '\u2014',
      doc: docFile || '\u2014',
      verification: verification.text,
      verificationResult: verification.result,
      status: status,
      issues: issues
    });
  }

  return rows;
}

function rtmGate(matrix) {
  const blocking = [];
  const warnings = [];
  for (const row of matrix) {
    if (row.status === 'BLOCK') {
      blocking.push(row.reqId + ': ' + row.issues.join(', ') + ' (' + row.artifactDetail + ')');
    } else if (row.status === 'WARN') {
      warnings.push(row.reqId + ': ' + row.issues.join(', '));
    }
  }
  return {
    passed: blocking.length === 0,
    blocking,
    warnings
  };
}

function buildCoverageSummary(matrix) {
  const total = matrix.length;
  let pass = 0, warn = 0, block = 0;
  for (const row of matrix) {
    if (row.status === 'PASS') pass++;
    else if (row.status === 'WARN') warn++;
    else if (row.status === 'BLOCK') block++;
  }
  return { total, passed: pass, warnings: warn, blocking: block, coverage: total > 0 ? Math.round((pass / total) * 100) : 0 };
}

function buildRtmReport(matrix, meta) {
  const summary = buildCoverageSummary(matrix);
  const gate = rtmGate(matrix);
  const date = meta && meta.generatedAt ? meta.generatedAt : new Date().toISOString();
  const ssotNote = meta && meta.ssotPresent ? 'Yes (opencode.project.md)' : 'No (generic mode)';

  const flow = '```mermaid\nflowchart LR\n' +
    '    SRC[Source R-ID] --> FR[FR / NFR]\n' +
    '    FR --> US[User Story]\n' +
    '    FR --> DES[Design docs/01_Design_Architecture/]\n' +
    '    FR --> CODE[Code src/]\n' +
    '    CODE --> TEST[Test __tests__/]\n' +
    '    FR --> DOC[Doc docs/]\n' +
    '    FR --> GATE[Verification Gate]\n' +
    '    GATE --> STATUS{Status}\n' +
    '    STATUS -->|PASS| OK[Traced]\n' +
    '    STATUS -->|WARN| WGN[Coverage Gap]\n' +
    '    STATUS -->|BLOCK| BLK[BLOCK Merge]\n' +
    '```';

  const rows = matrix.map((r) => {
    const statusIcon = r.status === 'PASS' ? ':white_check_mark:' : r.status === 'WARN' ? ':warning:' : ':red_circle:';
    const esc = (s) => String(s).replace(/\|/g, '\\|');
    return '| ' + r.reqId + ' | ' + esc(r.source) + ' | ' + esc(r.description.slice(0, 60)) +
      ' | ' + esc(r.userStory) + ' | ' + esc(r.artifactDetail) + ' | ' + esc(r.test) +
      ' | ' + esc(r.doc) + ' | ' + esc(r.verification) + ' | ' + statusIcon + ' ' + r.status + ' |';
  }).join('\n');

  const gateVerdict = gate.passed
    ? ':white_check_mark: RTM GATE PASSED - all declared artifacts verified, no broken traceability links'
    : ':red_circle: RTM GATE BLOCKED (R10/R20) - broken traceability links detected';

  const warningSection = gate.warnings.length > 0
    ? '\n\n## Coverage Warnings (non-blocking)\n\n' +
      gate.warnings.map((w) => '- ' + w).join('\n')
    : '';

  const blockingSection = gate.blocking.length > 0
    ? '\n\n## Blocking Issues\n\n' +
      gate.blocking.map((b) => '- ' + b).join('\n')
    : '';

  return '# Requirements Traceability Matrix - CMMI Level 4\n\n' +
    '## Meta\n\n' +
    '| Field | Value |\n' +
    '| :--- | :--- |\n' +
    '| Generated | ' + date + ' |\n' +
    '| SSOT Present | ' + ssotNote + ' |\n' +
    '| Requirements Traced | ' + summary.total + ' |\n' +
    '| Coverage (PASS) | ' + summary.coverage + '% |\n\n' +
    '## Traceability Flow\n\n' +
    'Figure 1 - Requirements traceability lifecycle (R20)\n\n' +
    flow + '\n\n' +
    '## Traceability Matrix\n\n' +
    '| Req ID | Source | Description | User Story | Artifact (verified) | Test | Doc | Verification | Status |\n' +
    '| :--- | :--- | :--- | :--- | :--- | :--- | :--- | :--- | :--- |\n' +
    rows + '\n\n' +
    '## Coverage Summary\n\n' +
    '| Status | Count |\n' +
    '| :--- | :--- |\n' +
    '| :white_check_mark: PASS | ' + summary.passed + ' |\n' +
    '| :warning: WARN | ' + summary.warnings + ' |\n' +
    '| :red_circle: BLOCK | ' + summary.blocking + ' |\n' +
    '| **Total** | **' + summary.total + '** |\n\n' +
    '## Gate Verdict\n\n' +
    '**' + gateVerdict + '**' +
    blockingSection +
    warningSection +
    '\n\n---\nGenerated by scripts/generate-rtm.js (R20). Parses docs/00_Planning_Requirements/srs.md traceability tables,\n' +
    'cross-references docs/00_Planning_Requirements/stories.md, verifies src/ __tests__/ docs/ artifacts on disk,\n' +
    'and maps source R-IDs to logs/audit.log gate results.\n';
}

module.exports = {
  SOURCE_GATE_MAP,
  parseSrsTables,
  parseUserStoryMaps,
  parseAuditLog,
  verifyArtifact,
  buildMatrix,
  rtmGate,
  buildCoverageSummary,
  buildRtmReport
};

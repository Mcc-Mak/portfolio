// ================================================================
// R20: Requirements Traceability Matrix (RTM) Generator + Gate
// Parses docs/00_Planning_Requirements/srs.md (FR/NFR + §6 traceability
// tables), cross-references docs/00_Planning_Requirements/stories.md
// (story->FR maps), verifies that declared artifacts exist on disk
// (src/, __tests__/, docs/, specs/), maps source R-IDs to
// logs/audit.log gate results, and writes the canonical report to
// docs/00_Planning_Requirements/rtm.md (Class 1) with a mirror copy
// at specs/rtm.md for backwards compatibility.
// Blocking (R10) on broken artifact links.
// ================================================================

// Walking an arbitrary project tree requires runtime-computed fs paths
// (dir/root names from the filesystem). Paths are controlled and the
// read set is whitelisted + size-capped.
/* eslint-disable security/detect-non-literal-fs-filename */

'use strict';

const fs = require('fs');
const path = require('path');

const {
  parseSrsTables,
  parseUserStoryMaps,
  parseAuditLog,
  buildMatrix,
  rtmGate,
  buildRtmReport
} = require('../src/rtm');

const REPORT_PATH = 'docs/00_Planning_Requirements/rtm.md';
const REPORT_MIRROR_PATH = 'specs/rtm.md';
const EXCLUDED_DIRS = new Set(['node_modules', '.git', 'logs', 'metrics', 'coverage', 'wiki']);
const TEXT_EXTS = new Set(['.md', '.js', '.json', '.jsonc', '.sh', '.ts', '.tsx', '.css', '.txt', '.asc', '.sql', '.yml', '.yaml', '.dockerfile']);

function walkDir(relDir, absDir, fileList) {
  let names;
  try {
    names = fs.readdirSync(absDir);
  } catch (_) {
    return;
  }
  for (const name of names) {
    const absPath = path.join(absDir, name);
    const relPath = relDir ? relDir + '/' + name : name;
    let stat;
    try {
      stat = fs.statSync(absPath);
    } catch (_) {
      continue;
    }
    if (stat.isDirectory()) {
      if (EXCLUDED_DIRS.has(name)) continue;
      walkDir(relPath, absPath, fileList);
      continue;
    }
    if (TEXT_EXTS.has(path.extname(name).toLowerCase())) {
      fileList.push(relPath);
    }
  }
}

function collectFiles(projectDir) {
  const fileList = [];
  const roots = ['.opencode', 'specs', 'src', '__tests__', 'docs', 'scripts', 'tools', 'docker'];
  for (const root of roots) {
    const abs = path.join(projectDir, root);
    if (fs.existsSync(abs)) {
      walkDir(root, abs, fileList);
    }
  }
  const homeDir = process.env.HOME || process.env.USERPROFILE || '';
  if (homeDir) {
    const globalDir = path.join(homeDir, '.config', 'opencode');
    if (fs.existsSync(globalDir)) {
      walkDir('~/.config/opencode', globalDir, fileList);
    }
  }
  const rootDocs = [
    'README.md', 'LICENSE', 'CONTRIBUTING.md', 'CODE_OF_CONDUCT.md', 'SECURITY.md',
    'CHANGELOG.md', 'AGENTS.md', '.eslintrc.js', '.gitignore', 'package.json',
    'opencode.project.md', 'opencode.jsonc', 'opencode.global.jsonc',
    'docker-compose.yml', '.env.example'
  ];
  for (const doc of rootDocs) {
    const abs = path.join(projectDir, doc);
    if (fs.existsSync(abs)) {
      fileList.push(doc);
    }
  }
  const generatedFiles = [
    'logs/audit.log',
    'metrics/metrics.db',
    'metrics/spc-report.md',
    'metrics/compliance-report.md',
    'metrics/threat-model.md',
    'metrics/dast-report.md',
    'metrics/readiness-prediction.md'
  ];
  for (const gf of generatedFiles) {
    const abs = path.join(projectDir, gf);
    if (fs.existsSync(abs)) {
      fileList.push(gf);
    }
  }
  return fileList;
}

function collectTestFiles(projectDir) {
  const testDir = path.join(projectDir, '__tests__');
  const tests = [];
  let names;
  try {
    names = fs.readdirSync(testDir);
  } catch (_) {
    return tests;
  }
  for (const name of names) {
    if (name.endsWith('.spec.js')) {
      tests.push('__tests__/' + name);
    }
  }
  return tests;
}

function collectDocFiles(projectDir) {
  const docDir = path.join(projectDir, 'docs');
  const docs = [];
  walkDocSubdirs(docDir, 'docs', docs);
  return docs;
}

function walkDocSubdirs(absDir, relDir, docs) {
  let names;
  try {
    names = fs.readdirSync(absDir);
  } catch (_) {
    return;
  }
  for (const name of names) {
    const absPath = path.join(absDir, name);
    const relPath = relDir + '/' + name;
    let stat;
    try {
      stat = fs.statSync(absPath);
    } catch (_) {
      continue;
    }
    if (stat.isDirectory()) {
      walkDocSubdirs(absPath, relPath, docs);
      continue;
    }
    if (name.endsWith('.md')) {
      docs.push(relPath);
    }
  }
}

function readText(filePath) {
  try {
    return fs.readFileSync(filePath, 'utf8').replace(/^\uFEFF/, '');
  } catch (_) {
    return '';
  }
}

function main() {
  const projectArg = process.argv.indexOf('--project');
  const projectDir = projectArg !== -1 && process.argv[projectArg + 1]
    ? path.resolve(process.argv[projectArg + 1])
    : process.cwd();
  const skipDocgen = process.argv.indexOf('--skip-docgen') !== -1
    || process.argv.indexOf('--skip-docs') !== -1;
  const skipGates = process.argv.indexOf('--skip-gates') !== -1
    || process.argv.indexOf('--skip-security') !== -1;

  const srsPath = path.join(projectDir, 'docs', '00_Planning_Requirements', 'srs.md');
  if (!fs.existsSync(srsPath)) {
    console.error('[FAIL] docs/00_Planning_Requirements/srs.md not found at ' + srsPath);
    console.error('[FAIL] RTM cannot be generated without an SRS (R20/R10)');
    process.exit(1);
  }

  const srsText = readText(srsPath);
  const parsed = parseSrsTables(srsText);
  if (parsed.functional.length === 0 && parsed.nonFunctional.length === 0) {
    console.error('[FAIL] No FR/NFR requirements parsed from docs/00_Planning_Requirements/srs.md');
    console.error('[FAIL] RTM cannot be generated (R20/R10)');
    process.exit(1);
  }

  const storiesText = readText(path.join(projectDir, 'docs', '00_Planning_Requirements', 'stories.md'));
  const storyMaps = parseUserStoryMaps(storiesText);

  const auditText = readText(path.join(projectDir, 'logs', 'audit.log'));
  const auditResults = parseAuditLog(auditText);

  const fileList = collectFiles(projectDir);
  const testFiles = collectTestFiles(projectDir);
  const docFiles = collectDocFiles(projectDir);

  const ssotPath = path.join(projectDir, 'opencode.project.md');
  const ssotPresent = fs.existsSync(ssotPath);

  const matrix = buildMatrix(parsed, storyMaps, fileList, auditResults, {
    skipDocgen,
    skipGates,
    testFiles,
    docFiles
  });

  const gate = rtmGate(matrix);
  const report = buildRtmReport(matrix, {
    generatedAt: new Date().toISOString(),
    ssotPresent
  });

  fs.mkdirSync(path.join(projectDir, 'docs', '00_Planning_Requirements'), { recursive: true });
  fs.writeFileSync(path.join(projectDir, REPORT_PATH), report);
  fs.mkdirSync(path.join(projectDir, 'specs'), { recursive: true });
  fs.writeFileSync(path.join(projectDir, REPORT_MIRROR_PATH), report);

  console.log('[REPORT] ' + path.join(projectDir, REPORT_PATH));
  console.log('[MIRROR] ' + path.join(projectDir, REPORT_MIRROR_PATH));
  const summary = matrix.length + ' requirements traced, ' +
    matrix.filter((r) => r.status === 'PASS').length + ' PASS, ' +
    matrix.filter((r) => r.status === 'WARN').length + ' WARN, ' +
    matrix.filter((r) => r.status === 'BLOCK').length + ' BLOCK';
  console.log('[CHECK] ' + summary);

  if (!gate.passed) {
    console.error('[FAIL] RTM GATE BLOCKED (R10/R20):');
    for (const b of gate.blocking) {
      console.error('[FAIL]   ' + b);
    }
    process.exit(1);
  }

  if (gate.warnings.length > 0) {
    console.log('[WARN] Coverage warnings (non-blocking):');
    for (const w of gate.warnings) {
      console.log('[WARN]   ' + w);
    }
  }

  console.log('[OK] RTM gate passed: all declared artifacts verified');
  process.exit(0);
}

if (require.main === module) {
  main();
}

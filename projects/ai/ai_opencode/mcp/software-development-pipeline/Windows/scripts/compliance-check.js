// ================================================================
// R16: Compliance Check Gate (GDPR / HIPAA / PCI DSS / SOX)
// Scans the project's Class 1/3/5 text artifacts for evidence of each
// control in compliance.config.json. Blocking on high/critical gaps.
// ================================================================

// Walking an arbitrary project tree requires runtime-computed fs paths
// (dir/root names from the filesystem). Paths are controlled and the
// read set is whitelisted + size-capped; detect-unsafe-regex stays on.
/* eslint-disable security/detect-non-literal-fs-filename */

'use strict';

const fs = require('fs');
const path = require('path');

const {
  normalizeConfig,
  evaluateAll,
  blockingGaps,
  buildComplianceReport
} = require('../src/compliance');

const CONFIG_PATH = path.join(__dirname, 'compliance.config.json');
const REPORT_PATH = path.join(__dirname, '..', 'metrics', 'compliance-report.md');
const EXCLUDED_DIRS = new Set(['node_modules', '.git', 'logs', 'metrics', 'coverage']);
const TEXT_EXTS = new Set(['.md', '.js', '.json', '.ps1', '.txt', '.yaml', '.yml', '.html', '.xml']);
const SCAN_ROOTS = ['specs', 'src', '__tests__', 'docs'];
const MAX_FILE_BYTES = 262144;
const MAX_FILES = 500;

function scanTextFiles(projectDir) {
  const entries = [];
  const roots = [];
  for (const root of SCAN_ROOTS) {
    const absolute = path.join(projectDir, root);
    if (fs.existsSync(absolute)) roots.push({ relative: root, absolute });
  }
  for (const doc of ['README.md', 'SECURITY.md']) {
    const absolute = path.join(projectDir, doc);
    if (fs.existsSync(absolute)) roots.push({ relative: doc, absolute });
  }

  for (const root of roots) {
    walk(root.relative, root.absolute, entries);
    if (entries.length >= MAX_FILES) break;
  }
  return entries.slice(0, MAX_FILES);
}

function walk(relDir, absDir, entries) {
  let names;
  try {
    names = fs.readdirSync(absDir);
  } catch (_) {
    return;
  }
  for (const name of names) {
    if (entries.length >= MAX_FILES) return;
    const absPath = path.join(absDir, name);
    const relPath = path.join(relDir, name);
    let stat;
    try {
      stat = fs.statSync(absPath);
    } catch (_) {
      continue;
    }
    if (stat.isDirectory()) {
      if (EXCLUDED_DIRS.has(name)) continue;
      walk(relPath, absPath, entries);
      continue;
    }
    if (TEXT_EXTS.has(path.extname(name).toLowerCase())) {
      if (stat.size > MAX_FILE_BYTES) continue;
      try {
        const text = fs.readFileSync(absPath, 'utf8').replace(/^\uFEFF/, '');
        entries.push({ file: relPath, text });
      } catch (_) {
        continue;
      }
    }
  }
}

function main() {
  const projectArg = process.argv.indexOf('--project');
  const projectDir = projectArg !== -1 && process.argv[projectArg + 1]
    ? path.resolve(process.argv[projectArg + 1])
    : process.cwd();

  let controls;
  try {
    const config = JSON.parse(fs.readFileSync(CONFIG_PATH, 'utf8'));
    controls = normalizeConfig(config);
  } catch (err) {
    console.error('[FAIL] Compliance config error:', err.message);
    process.exit(1);
  }

  const fileTexts = scanTextFiles(projectDir);
  const results = evaluateAll(controls, fileTexts);
  const gaps = blockingGaps(results);

  fs.mkdirSync(path.dirname(REPORT_PATH), { recursive: true });
  fs.writeFileSync(REPORT_PATH, buildComplianceReport(results, { scanned: fileTexts.length }));

  console.log('[REPORT] ' + REPORT_PATH);
  console.log('[CHECK] Controls evaluated: ' + results.length + ', files scanned: ' + fileTexts.length + ', high/critical gaps: ' + gaps.length);

  if (gaps.length > 0) {
    console.error('[FAIL] COMPLIANCE GATE BLOCKED (R10/R16):');
    for (const gap of gaps) {
      console.error('[FAIL]   ' + gap.id + ' (' + gap.framework + ', ' + gap.severity + '): ' + gap.label);
    }
    process.exit(1);
  }

  console.log('[OK] Compliance gate passed: no high/critical gaps in required frameworks');
  process.exit(0);
}

if (require.main === module) {
  main();
}
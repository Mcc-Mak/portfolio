#!/usr/bin/env node
// ================================================================
// Mermaid Diagram Validator — R10 gate (C4-6 import-safe: CLI script)
// ================================================================
// Validates every ```mermaid block in the project's markdown by
// rendering it with @mermaid-js/mermaid-cli (mmdc). A block PASSES only
// if mmdc produces a valid SVG (parse + render without error). mmdc's
// exit code is unreliable (0 on parse errors), so the gate signal is
// "SVG produced and well-formed".
//
// Also enforces the project diagram-type whitelist: any block whose
// declared type is not whitelisted FAILS without rendering.
//
// Usage:
//   node scripts/validate-mermaid.js [--json] [--quiet] [path...]
//     --json     Emit machine-readable JSON to stdout (human report to stderr).
//     --quiet    Suppress per-block PASS lines (show failures + summary only).
//     path...    Files/dirs to scan (default: docs/ metrics/ specs/ *.md).
//
// Exit code: 1 if any block fails, 0 otherwise (R10 blocking gate).
// ================================================================

// detect-non-literal-fs-filename is purely syntactic: it fires on ANY
// non-literal argument to fs methods, including path.join()/path.resolve()
// of constants. A filesystem-walking validator fundamentally requires
// dynamic paths (CLI args + directory traversal + temp files); satisfying
// the rule would require hardcoded literals, making the tool useless. This
// rule targets web apps passing user-uploaded filenames (path traversal);
// here the "user" is the developer scanning their own local files. Scope
// the disable to this single rule, not the whole security profile.
/* eslint-disable security/detect-non-literal-fs-filename */

const fs = require('fs');
const path = require('path');
const os = require('os');
const crypto = require('crypto');
const { execFile } = require('child_process');

// ----------------------------------------------------------------
// Diagram-type whitelist (both canonical and -beta forms accepted).
// `graph` is Mermaid's documented alias for `flowchart`.
// xychart is grandfathered for SPC control charts (C4-1/C4-3).
// ----------------------------------------------------------------
const WHITELIST = new Set([
  'flowchart', 'graph',
  'classDiagram',
  'sequenceDiagram',
  'erDiagram',
  'stateDiagram', 'stateDiagram-v2',
  'architecture-beta',
  'block', 'block-beta',
  'C4Context', 'C4Container', 'C4Component', 'C4Dynamic', 'C4Deployment',
  'eventmodeling',
  'ishikawa', 'ishikawa-beta',
  'kanban',
  'pie',
  'quadrantChart',
  'requirementDiagram',
  'sankey', 'sankey-beta',
  'timeline',
  'xychart', 'xychart-beta',
  'railroad-abnf-beta', 'railroad-ebnf-beta', 'railroad-beta', 'railroad-peg-beta',
]);

// Resolve the mmdc entry point by reading its package.json via fs
// (bypasses the package "exports" restriction on require.resolve).
function resolveMmdc() {
  const candidates = [
    path.join(__dirname, '..', 'node_modules', '@mermaid-js', 'mermaid-cli'),
    path.join(__dirname, '..', '..', 'node_modules', '@mermaid-js', 'mermaid-cli'),
  ];
  for (const dir of candidates) {
    const pjPath = path.join(dir, 'package.json');
    if (fs.existsSync(pjPath)) {
      try {
        const pj = JSON.parse(fs.readFileSync(pjPath, 'utf8'));
        const bin = pj.bin && (pj.bin.mmdc || pj.bin);
        if (bin) return path.join(dir, bin);
      } catch (_) { /* try next */ }
    }
  }
  return null;
}

const MMDC_ENTRY = resolveMmdc();

// Detect a system Chromium (musl-native on Alpine) so puppeteer can run
// where the bundled glibc Chrome cannot load. Falls back to bundled Chrome.
function detectChromium() {
  const sys = ['/usr/bin/chromium-browser', '/usr/bin/chromium', '/usr/bin/google-chrome', '/usr/bin/google-chrome-stable'];
  for (const p of sys) {
    try { if (fs.statSync(p).isFile()) return p; } catch (_) { /* next */ }
  }
  return null; // let puppeteer use its bundled browser
}

// ----------------------------------------------------------------
// Argument parsing
// ----------------------------------------------------------------
const argv = process.argv.slice(2);
const OPT = { json: false, quiet: false };
const targets = [];
for (const a of argv) {
  if (a === '--json') OPT.json = true;
  else if (a === '--quiet' || a === '-q') OPT.quiet = true;
  else if (a === '--help' || a === '-h') {
    process.stdout.write('Usage: validate-mermaid.js [--json] [--quiet] [path...]\n');
    process.exit(0);
  } else if (a.startsWith('--')) {
    process.stderr.write(`Unknown option: ${a}\n`);
    process.exit(2);
  } else {
    targets.push(a);
  }
}

// Default scan targets (project-relative via __dirname -> project root).
const ROOT = path.join(__dirname, '..');
function defaultTargets() {
  const out = [];
  for (const d of ['docs', 'metrics', 'specs']) {
    const p = path.join(ROOT, d);
    if (fs.existsSync(p)) out.push(p);
  }
  // root-level *.md
  for (const f of fs.readdirSync(ROOT)) {
    if (f.endsWith('.md')) out.push(path.join(ROOT, f));
  }
  return out;
}

// ----------------------------------------------------------------
// Markdown file discovery (excludes node_modules)
// ----------------------------------------------------------------
function walk(p, acc) {
  let st;
  try { st = fs.statSync(p); } catch (_) { return; }
  if (st.isDirectory()) {
    const name = path.basename(p);
    if (name === 'node_modules' || name === '.git') return;
    for (const e of fs.readdirSync(p)) walk(path.join(p, e), acc);
  } else if (st.isFile() && p.endsWith('.md')) {
    acc.push(p);
  }
}

function discoverFiles() {
  const roots = targets.length ? targets : defaultTargets();
  const files = [];
  for (const r of roots) walk(r, files);
  return [...new Set(files)];
}

// ----------------------------------------------------------------
// Block extraction
// ----------------------------------------------------------------
const FENCE = /```mermaid[ \t]*\r?\n([\s\S]*?)```/g;

function blockType(code) {
  for (const raw of code.split(/\r?\n/)) {
    const line = raw.trim();
    if (!line) continue;
    if (line.startsWith('%%')) continue;       // comment
    if (line.startsWith('---')) continue;      // directive / frontmatter block
    const m = line.match(/^([A-Za-z][\w-]*)/);
    return m ? m[1] : '(none)';
  }
  return '(empty)';
}

function lineOf(text, offset) {
  let n = 1;
  for (let i = 0; i < offset && i < text.length; i++) if (text.charAt(i) === '\n') n++;
  return n;
}

function extractBlocks(files) {
  const blocks = [];
  for (const file of files) {
    let text;
    try { text = fs.readFileSync(file, 'utf8'); } catch (_) { continue; }
    let m;
    FENCE.lastIndex = 0;
    let idx = 0;
    while ((m = FENCE.exec(text)) !== null) {
      const code = m[1];
      blocks.push({
        id: crypto.createHash('md5').update(file + idx).digest('hex').slice(0, 12),
        file,
        index: idx++,
        startLine: lineOf(text, m.index),
        code,
        type: blockType(code),
      });
    }
  }
  return blocks;
}

// ----------------------------------------------------------------
// mmdc rendering (concurrent pool)
// ----------------------------------------------------------------
const CHROMIUM = detectChromium();
const PUPPET_CFG = {
  args: ['--no-sandbox', '--disable-setuid-sandbox', '--disable-gpu', '--disable-dev-shm-usage'],
};
if (CHROMIUM) PUPPET_CFG.executablePath = CHROMIUM;

function renderOne(block, tmpDir) {
  return new Promise((resolve) => {
    if (!MMDC_ENTRY) {
      resolve({ ok: false, error: 'mmdc not found (install @mermaid-js/mermaid-cli)' });
      return;
    }
    const mmdPath = path.join(tmpDir, `${block.id}.mmd`);
    const svgPath = path.join(tmpDir, `${block.id}.svg`);
    const cfgPath = path.join(tmpDir, 'puppet.json');
    try { fs.writeFileSync(mmdPath, block.code); } catch (e) {
      resolve({ ok: false, error: 'write temp: ' + e.message }); return;
    }
    try { fs.writeFileSync(cfgPath, JSON.stringify(PUPPET_CFG)); } catch (_) { /* ignore */ }
    const args = ['-i', mmdPath, '-o', svgPath, '-p', cfgPath];
    execFile(process.execPath, [MMDC_ENTRY, ...args], { timeout: 45000, maxBuffer: 1 << 20 }, (err, stdout, stderr) => {
      let svg = null;
      try { svg = fs.readFileSync(svgPath, 'utf8'); } catch (_) { svg = null; }
      if (svg && svg.length > 50 && svg.includes('<svg')) {
        resolve({ ok: true });
        return;
      }
      // No valid SVG -> failure. Extract a concise error message.
      const errText = (stderr || '') + (err ? '\n' + (err.message || '') : '');
      let msg = 'render produced no SVG';
      const em = errText.match(/(Parser\.parseError|ParseError|Unknown diagram type|Syntax error|Error:[^\n]*)/i);
      if (em) msg = em[0].replace(/\s+/g, ' ').slice(0, 220);
      else {
        const first = errText.split(/\r?\n/).find((l) => l.trim() && !l.includes('puppeteer') && !l.includes('at '));
        if (first) msg = first.trim().slice(0, 220);
      }
      resolve({ ok: false, error: msg });
    });
  });
}

async function runPool(blocks, tmpDir, concurrency) {
  // Map<index, result> avoids dynamic bracket assignment (security/detect-
  // object-injection); converted to an ordered array before returning.
  const results = new Map();
  let next = 0;
  async function worker() {
    while (next < blocks.length) {
      const i = next++;
      if (i >= blocks.length) return;
      const b = blocks.at(i);
      let res;
      if (!WHITELIST.has(b.type)) {
        res = { ok: false, error: `disallowed diagram type '${b.type}' (not in whitelist; convert to flowchart/timeline)` };
      } else {
        res = await renderOne(b, tmpDir);
      }
      results.set(i, { ...b, ...res });
    }
  }
  const n = Math.min(concurrency, blocks.length || 1);
  await Promise.all(Array.from({ length: n }, worker));
  return Array.from({ length: blocks.length }, (_, idx) => results.get(idx));
}

// ----------------------------------------------------------------
// Main
// ----------------------------------------------------------------
(async function main() {
  if (!MMDC_ENTRY) {
    process.stderr.write('[FAIL] @mermaid-js/mermaid-cli not installed. Run: npm install -D @mermaid-js/mermaid-cli\n');
    process.exit(2);
  }
  const tmpDir = fs.mkdtempSync(path.join(os.tmpdir(), 'mermaid-val-'));
  const files = discoverFiles();
  const blocks = extractBlocks(files);

  const concurrency = Math.max(2, Math.min(8, Math.floor((os.cpus().length || 4) / 2)));
  const results = await runPool(blocks, tmpDir, concurrency);

  // cleanup
  try { fs.rmSync(tmpDir, { recursive: true, force: true }); } catch (_) { /* ignore */ }

  const passed = results.filter((r) => r.ok);
  const failed = results.filter((r) => !r.ok);

  // JSON output
  if (OPT.json) {
    const payload = {
      total: results.length,
      passed: passed.length,
      failed: failed.length,
      chromium: CHROMIUM || 'bundled',
      results: results.map((r) => ({
        status: r.ok ? 'pass' : 'fail',
        file: path.relative(ROOT, r.file),
        line: r.startLine,
        index: r.index,
        type: r.type,
        error: r.ok ? null : r.error,
      })),
    };
    process.stdout.write(JSON.stringify(payload, null, 2) + '\n');
  }

  // Human report (stderr so --json stdout stays clean)
  const log = (s) => process.stderr.write(s + '\n');
  if (!OPT.json) {
    for (const r of results) {
      const loc = `${path.relative(ROOT, r.file)}:${r.startLine}`;
      const tag = r.ok ? 'PASS' : 'FAIL';
      if (r.ok && OPT.quiet) continue;
      if (r.ok) {
        log(`  ${tag}  ${loc}  [${r.type}]`);
      } else {
        log(`  ${tag}  ${loc}  [${r.type}]  ${r.error}`);
      }
    }
  }
  log('');
  log(`Mermaid validation: ${passed.length}/${results.length} passed, ${failed.length} failed` +
    (results.length === 0 ? ' (no mermaid blocks found)' : ''));
  if (CHROMIUM) log(`  renderer: system chromium (${CHROMIUM})`);
  else log('  renderer: puppeteer bundled chrome');

  if (failed.length > 0) {
    log('  FAILED blocks:');
    for (const r of failed) {
      log(`    - ${path.relative(ROOT, r.file)}:${r.startLine} [${r.type}] — ${r.error}`);
    }
    process.exit(1);
  }
  process.exit(0);
})();

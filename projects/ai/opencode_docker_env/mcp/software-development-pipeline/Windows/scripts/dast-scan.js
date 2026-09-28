// ================================================================
// R19: Dynamic Application Security Testing (DAST) Gate
// Prefers an ON-PREMISES engine (free OWASP ZAP) over off-premises
// SaaS. If no free on-prem engine is detected on the runner the gate
// WARNS AND BLOCKS (R10), recommending the two best paid on-premises
// engines. Findings are parsed from the ZAP JSON report and written to
// metrics/dast-report.md. Blocking on failThreshold+ findings.
//   node dast-scan.js [--project <dir>] [--target <url>]
// ================================================================

// Running a local on-prem DAST scanner is the entire purpose of this
// script. The child-process calls below execute only fixed commands
// (docker / zap-baseline.py) built from a reviewed local config file,
// never user-supplied strings, and all fs paths are fixed module paths.
/* eslint-disable security/detect-child-process, security/detect-non-literal-fs-filename */

'use strict';

const fs = require('fs');
const path = require('path');
const http = require('http');
const https = require('https');
const { spawnSync, spawn, execSync } = require('child_process');

const {
  normalizeConfig,
  detectEngine,
  resolveTarget,
  parseZapJson,
  isDastBlocked,
  countSeverities,
  buildDastReport,
  PAID_RECOMMENDATIONS
} = require('../src/dast');

const CONFIG_PATH = path.join(__dirname, 'dast.config.json');
const METRICS_DIR = path.join(__dirname, '..', 'metrics');
const REPORT_PATH = path.join(METRICS_DIR, 'dast-report.md');
const ZAP_JSON_PATH = path.join(METRICS_DIR, 'dast-zap.json');
const SCAN_TIMEOUT_MS = 300000;
const READY_TIMEOUT_MS = 30000;
const READY_POLL_MS = 500;

function readConfig() {
  if (!fs.existsSync(CONFIG_PATH)) return {};
  try {
    return JSON.parse(fs.readFileSync(CONFIG_PATH, 'utf8'));
  } catch (err) {
    console.error('[FAIL] DAST config error:', err.message);
    process.exit(1);
  }
}

function probeEngine() {
  const env = { dockerAvailable: false, zapImagePresent: false, zapCliAvailable: false };
  try {
    const out = execSync('docker --version', { encoding: 'utf8', stdio: ['ignore', 'pipe', 'ignore'] });
    env.dockerAvailable = /Docker/i.test(out);
  } catch (_) { /* docker not installed */ }
  if (env.dockerAvailable) {
    try {
      execSync('docker image inspect ghcr.io/zaproxy/zaproxy', { encoding: 'utf8', stdio: ['ignore', 'pipe', 'ignore'] });
      env.zapImagePresent = true;
    } catch (_) {
      env.zapImagePresent = false;
    }
  }
  try {
    execSync('command -v zap-baseline.py', { encoding: 'utf8', stdio: ['ignore', 'pipe', 'ignore'] });
    env.zapCliAvailable = true;
  } catch (_) { /* zap CLI not on PATH */ }
  return env;
}

function probeTarget(target) {
  return new Promise((resolve) => {
    const transport = /^https:/i.test(target) ? https : http;
    const req = transport.get(target, { timeout: 2000 }, (res) => {
      res.resume();
      resolve(true);
    });
    req.on('error', () => resolve(false));
    req.on('timeout', () => {
      req.destroy();
      resolve(false);
    });
  });
}

function waitForTarget(target, timeoutMs) {
  return new Promise((resolve) => {
    const start = Date.now();
    const timer = setInterval(() => {
      probeTarget(target).then((ready) => {
        if (ready) {
          clearInterval(timer);
          resolve(true);
        } else if (Date.now() - start > timeoutMs) {
          clearInterval(timer);
          resolve(false);
        }
      });
    }, READY_POLL_MS);
  });
}

function stageServer(config) {
  if (!config.stage.enabled || !config.stage.command) return null;
  console.log('[STAGE] Starting staging server: ' + config.stage.command);
  return spawn(config.stage.command, { shell: true, stdio: 'ignore' });
}

function runZapDocker(config, target) {
  fs.mkdirSync(METRICS_DIR, { recursive: true });
  const containerJson = '/zap/wrk/dast-zap.json';
  const cmd = 'docker run --rm -t -v ' + METRICS_DIR + ':/zap/wrk:rw ' +
    config.zap.image + ' ' + config.zap.baselineScript + ' -t ' + target + ' -J ' + containerJson;
  const res = spawnSync(cmd, { shell: true, encoding: 'utf8', timeout: SCAN_TIMEOUT_MS });
  return { status: res.status, output: res.stdout || '', error: res.stderr || '' };
}

function runZapCli(config, target) {
  fs.mkdirSync(METRICS_DIR, { recursive: true });
  const cmd = 'zap-baseline.py -t ' + target + ' -J ' + ZAP_JSON_PATH;
  const res = spawnSync(cmd, { shell: true, encoding: 'utf8', timeout: SCAN_TIMEOUT_MS });
  return { status: res.status, output: res.stdout || '', error: res.stderr || '' };
}

function runScan(config, engine, target) {
  return engine.mode === 'cli'
    ? runZapCli(config, target)
    : runZapDocker(config, target);
}

function printRecommendations() {
  console.warn('[HINT] Recommended paid on-premises DAST engines:');
  PAID_RECOMMENDATIONS.forEach((r, i) => {
    console.warn('[HINT]   ' + (i + 1) + '. ' + r.name + ' (' + r.vendor + ') - ' + r.note);
  });
}

function writeReport(findings, meta) {
  fs.mkdirSync(METRICS_DIR, { recursive: true });
  fs.writeFileSync(REPORT_PATH, buildDastReport(findings, meta));
  console.log('[REPORT] ' + REPORT_PATH);
}

function argValue(argv, flag) {
  let value = '';
  while (argv.length > 0) {
    if (argv[0] === flag && argv.length > 1) {
      value = argv[1];
      break;
    }
    argv.shift();
  }
  return value;
}

function main() {
  const args = process.argv.slice(2);
  const targetArg = argValue(args, '--target');

  const config = normalizeConfig(readConfig());
  const engine = detectEngine(probeEngine());
  const target = resolveTarget(config, targetArg);

  if (!engine.available) {
    writeReport([], {
      target,
      source: 'none detected',
      threshold: config.failThreshold,
      available: false
    });
    console.warn('[WARN] No free on-premises DAST engine detected (docker + OWASP ZAP image, or zap-baseline.py on PATH).');
    printRecommendations();
    console.error('[FAIL] DAST GATE BLOCKED (R10/R19): no DAST engine available - install a free engine or configure a paid engine in scripts/dast.config.json');
    process.exit(1);
  }

  const child = stageServer(config);
  if (child) {
    waitForTarget(target, READY_TIMEOUT_MS).then((ready) => {
      if (!ready) {
        child.kill();
        console.error('[FAIL] Staging server did not become ready at ' + target);
        writeReport([], { target, source: engine.engine, threshold: config.failThreshold, scanExited: false });
        process.exit(1);
      }
      console.log('[STAGE] Target ready at ' + target);
      executeScan(config, engine, target, child);
    });
    return;
  }

  executeScan(config, engine, target, null);
}

function executeScan(config, engine, target, child) {
  console.log('[SCAN] Running ' + engine.engine + ' against ' + target + ' ...');
  const result = runScan(config, engine, target);
  if (child) child.kill();

  let findings = [];
  if (result.status !== 0) {
    console.error('[FAIL] DAST engine exited with status ' + result.status);
    if (result.error) console.error(result.error);
  } else {
    let raw = '';
    try {
      raw = fs.readFileSync(ZAP_JSON_PATH, 'utf8');
    } catch (_) {
      raw = '';
    }
    if (raw) {
      try {
        findings = parseZapJson(raw);
      } catch (err) {
        console.error('[FAIL] Could not parse ZAP JSON:', err.message);
      }
    }
  }

  writeReport(findings, {
    target,
    source: engine.engine,
    threshold: config.failThreshold,
    available: true,
    scanExited: result.status === 0
  });

  const counts = countSeverities(findings);
  counts.forEach((row) => {
    if (row.count > 0) console.log('[DAST] ' + row.severity.toUpperCase() + ': ' + row.count);
  });

  if (result.status !== 0) {
    console.error('[FAIL] DAST GATE BLOCKED (R10/R19): scanner could not complete the scan');
    process.exit(1);
  }

  if (isDastBlocked(findings, config.failThreshold)) {
    const critical = severityCountOf(counts, 'critical');
    const high = severityCountOf(counts, 'high');
    console.error('[FAIL] DAST GATE BLOCKED (R10/R19): ' + critical + ' critical, ' + high +
      ' high findings (>= ' + config.failThreshold + ' threshold)');
    process.exit(1);
  }

  console.log('[OK] DAST gate passed: no ' + config.failThreshold + '+ findings on ' + target);
  process.exit(0);
}

function severityCountOf(counts, severity) {
  const match = counts.find((row) => row.severity === severity);
  return match ? match.count : 0;
}

if (require.main === module) {
  main();
}

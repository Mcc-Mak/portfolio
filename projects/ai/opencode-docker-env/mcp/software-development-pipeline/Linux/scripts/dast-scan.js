// ================================================================
// R19: Dynamic Application Security Testing (DAST) Gate
// Prefers an ON-PREMISES engine (free OWASP ZAP) over off-premises
// SaaS. Engine discovery order:
//   1. A running OWASP ZAP JSON API instance (default http://zap:8080)
//   2. OWASP ZAP CLI (zap-baseline.py) on PATH
//   3. OWASP ZAP Docker image (ghcr.io/zaproxy/zaproxy)
// If no free on-prem engine is detected the gate WARNS AND BLOCKS (R10),
// recommending the two best paid on-premises engines. Findings are parsed
// from the ZAP JSON report and written to metrics/dast-report.md. Blocking
// on failThreshold+ findings.
//   node dast-scan.js [--project <dir>] [--target <url>]
// ================================================================

// Running a local on-prem DAST scanner is the entire purpose of this
// script. The child-process calls below execute only fixed commands
// (docker / zap-baseline.py) built from a reviewed local config file,
// never user-supplied strings, and all fs paths are fixed module paths.
/* eslint-disable security/detect-child-process, security/detect-non-literal-fs-filename */

'use strict';

const fs = require('fs');
const os = require('os');
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
const API_TIMEOUT_MS = 45000;
const READY_TIMEOUT_MS = 30000;
const READY_POLL_MS = 500;
const STATUS_POLL_MS = 2000;

function readConfig() {
  if (!fs.existsSync(CONFIG_PATH)) return {};
  try {
    return JSON.parse(fs.readFileSync(CONFIG_PATH, 'utf8'));
  } catch (err) {
    console.error('[FAIL] DAST config error:', err.message);
    process.exit(1);
  }
}

function apiUrl(baseUrl, apiPath, params) {
  const query = Object.entries(params).map((entry) =>
    encodeURIComponent(entry[0]) + '=' + encodeURIComponent(entry[1])
  ).join('&');
  return baseUrl.replace(/\/+$/, '') + apiPath + '?' + query;
}

function apiGet(baseUrl, apiPath, params, apiKey) {
  const merged = Object.assign({}, params);
  if (apiKey) merged.apikey = apiKey;
  const url = apiUrl(baseUrl, apiPath, merged);
  const transport = /^https:/i.test(url) ? https : http;
  return new Promise((resolve, reject) => {
    const req = transport.get(url, { timeout: API_TIMEOUT_MS }, (res) => {
      let data = '';
      res.on('data', (chunk) => { data += chunk; });
      res.on('end', () => {
        try {
          resolve(JSON.parse(data));
        } catch (_) {
          reject(new Error('Invalid JSON from ' + apiPath + ': ' + data.slice(0, 200)));
        }
      });
    });
    req.on('error', reject);
    req.on('timeout', () => {
      req.destroy();
      reject(new Error('Timeout calling ' + apiPath));
    });
  });
}

function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

async function pollZapStatus(baseUrl, viewPath, scanId, apiKey, label, timeoutMs) {
  const start = Date.now();
  let status = '0';
  for (;;) {
    const res = await apiGet(baseUrl, viewPath, { scanId }, apiKey);
    status = String(res.status || '0');
    if (status === '100') return status;
    if (Date.now() - start > timeoutMs) {
      throw new Error(label + ' did not complete within ' + timeoutMs + 'ms (status ' + status + ')');
    }
    await sleep(STATUS_POLL_MS);
  }
}

// Runs a scan against an already-running ZAP instance via its JSON API and
// persists the classic jsonreport to metrics/dast-zap.json for parsing and
// C4-2 metrics collection.
async function runZapApi(config, target) {
  const baseUrl = config.zap.api.baseUrl;
  const apiKey = config.zap.api.apiKey || '';
  await apiGet(baseUrl, '/JSON/core/action/newSession/', { name: '', overwrite: '' }, apiKey);
  try {
    await apiGet(baseUrl, '/JSON/ascan/action/setOptionThreadPerHost/', { Integer: '4' }, apiKey);
    console.log('[DAST] Active-scan threads set to 4 (memory-safe default).');
  } catch (err) {
    console.warn('[WARN] Could not set active-scan thread count: ' + err.message);
  }
  try {
    const spider = await apiGet(baseUrl, '/JSON/spider/action/scan/', { url: target }, apiKey);
    if (spider.scan !== undefined) {
      await pollZapStatus(baseUrl, '/JSON/spider/view/status/', spider.scan, apiKey, 'spider', config.scanTimeoutMs);
    }
  } catch (err) {
    console.warn('[WARN] Spider step skipped: ' + err.message);
  }
  const ascan = await apiGet(baseUrl, '/JSON/ascan/action/scan/', {
    url: target,
    recurse: 'true',
    inScopeOnly: 'false'
  }, apiKey);
  if (ascan.scan === undefined) {
    throw new Error('ZAP did not start an active scan for ' + target);
  }
  await pollZapStatus(baseUrl, '/JSON/ascan/view/status/', ascan.scan, apiKey, 'active scan', config.scanTimeoutMs);
  const report = await apiGet(baseUrl, '/OTHER/core/other/jsonreport/', {}, apiKey);
  fs.mkdirSync(METRICS_DIR, { recursive: true });
  fs.writeFileSync(ZAP_JSON_PATH, JSON.stringify(report, null, 2));
}

function probeApi(baseUrl, apiKey) {
  return apiGet(baseUrl, '/JSON/core/view/version/', {}, apiKey)
    .then((res) => Boolean(res && res.version))
    .catch(() => false);
}

async function probeEngine(config) {
  const env = {
    apiAvailable: false,
    dockerAvailable: false,
    zapImagePresent: false,
    zapCliAvailable: false
  };
  const api = config.zap.api;
  if (api && api.baseUrl) {
    env.apiAvailable = await probeApi(api.baseUrl, api.apiKey || '');
  }
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

function stageServer(config, projectDir) {
  if (!config.stage.enabled || !config.stage.command) return null;
  console.log('[STAGE] Starting staging server: ' + config.stage.command);
  const env = Object.assign({}, process.env);
  if (projectDir) env.PROJECT_DIR = projectDir;
  return spawn(config.stage.command, { shell: true, stdio: 'ignore', env });
}

function runZapDocker(config, target) {
  fs.mkdirSync(METRICS_DIR, { recursive: true });
  const containerJson = '/zap/wrk/dast-zap.json';
  const cmd = 'docker run --rm -t -v ' + METRICS_DIR + ':/zap/wrk:rw ' +
    config.zap.image + ' ' + config.zap.baselineScript + ' -t ' + target + ' -J ' + containerJson;
  const res = spawnSync(cmd, { shell: true, encoding: 'utf8', timeout: config.scanTimeoutMs });
  return { status: res.status, output: res.stdout || '', error: res.stderr || '' };
}

function runZapCli(config, target) {
  fs.mkdirSync(METRICS_DIR, { recursive: true });
  const cmd = 'zap-baseline.py -t ' + target + ' -J ' + ZAP_JSON_PATH;
  const res = spawnSync(cmd, { shell: true, encoding: 'utf8', timeout: config.scanTimeoutMs });
  return { status: res.status, output: res.stdout || '', error: res.stderr || '' };
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

function severityCountOf(counts, severity) {
  const match = counts.find((row) => row.severity === severity);
  return match ? match.count : 0;
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

function detectHostIp() {
  const interfaces = os.networkInterfaces();
  for (const ifaces of Object.values(interfaces)) {
    for (const iface of ifaces || []) {
      if (iface.family === 'IPv4' && !iface.internal) {
        return iface.address;
      }
    }
  }
  return null;
}

function isZapRemote(zapBaseUrl) {
  try {
    const parsed = new URL(zapBaseUrl);
    return parsed.hostname !== 'localhost' && parsed.hostname !== '127.0.0.1';
  } catch (_) {
    return false;
  }
}

function rewriteLocalhost(target, zapBaseUrl) {
  if (!isZapRemote(zapBaseUrl)) return target;
  if (!/http:\/\/localhost/i.test(target)) return target;
  const hostIp = detectHostIp();
  if (!hostIp) return target;
  return target.replace(/localhost/i, hostIp);
}

async function executeScan(config, engine, target, child) {
  console.log('[SCAN] Running ' + engine.engine + ' against ' + target + ' ...');
  let findings = [];
  let scanOk = false;
  let scanError = '';
  try {
    if (engine.mode === 'api') {
      await runZapApi(config, target);
      scanOk = true;
    } else {
      const result = engine.mode === 'cli'
        ? runZapCli(config, target)
        : runZapDocker(config, target);
      scanOk = result.status === 0;
      scanError = result.error || '';
    }
  } catch (err) {
    scanError = err.message;
  }
  if (child) child.kill();

  if (scanOk) {
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
    scanExited: scanOk
  });

  const counts = countSeverities(findings);
  counts.forEach((row) => {
    if (row.count > 0) console.log('[DAST] ' + row.severity.toUpperCase() + ': ' + row.count);
  });

  if (!scanOk) {
    console.error('[FAIL] DAST GATE BLOCKED (R10/R19): scanner could not complete the scan' +
      (scanError ? ' - ' + scanError : ''));
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

async function main() {
  const args = process.argv.slice(2);
  const targetArg = argValue(args, '--target');
  const projectArg = argValue(args, '--project');

  const config = normalizeConfig(readConfig());
  const env = await probeEngine(config);
  const engine = detectEngine(env);
  let target = resolveTarget(config, targetArg);

  if (engine.mode === 'api' && config.zap && config.zap.api && config.zap.api.baseUrl) {
    const rewritten = rewriteLocalhost(target, config.zap.api.baseUrl);
    if (rewritten !== target) {
      console.log('[DAST] ZAP is on a remote host; rewrote target ' + target + ' -> ' + rewritten);
      target = rewritten;
    }
  }

  if (!engine.available) {
    writeReport([], {
      target,
      source: 'none detected',
      threshold: config.failThreshold,
      available: false
    });
    console.warn('[WARN] No free on-premises DAST engine detected ' +
      '(ZAP JSON API at ' + config.zap.api.baseUrl + ', docker + OWASP ZAP image, or zap-baseline.py on PATH).');
    printRecommendations();
    console.error('[FAIL] DAST GATE BLOCKED (R10/R19): no DAST engine available - start a ZAP instance (default http://zap:8080) or configure scripts/dast.config.json');
    process.exit(1);
  }

  let child = null;
  if (config.stage.enabled && config.stage.command) {
    child = stageServer(config, projectArg);
    const ready = await waitForTarget(target, READY_TIMEOUT_MS);
    if (!ready) {
      child.kill();
      console.error('[FAIL] Staging server did not become ready at ' + target);
      writeReport([], { target, source: engine.engine, threshold: config.failThreshold, scanExited: false });
      process.exit(1);
    }
    console.log('[STAGE] Target ready at ' + target);
  }

  await executeScan(config, engine, target, child);
}

if (require.main === module) {
  main().catch((err) => {
    console.error('[FAIL] DAST gate error:', err.message);
    process.exit(1);
  });
}

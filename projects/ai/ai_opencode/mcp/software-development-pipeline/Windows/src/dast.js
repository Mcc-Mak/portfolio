'use strict';

const { cweToOwasp } = require('./threat');

const BLOCK_SEVERITIES = ['high', 'critical'];
const SEVERITY_ORDER = ['critical', 'high', 'medium', 'low', 'info'];
const SEVERITY_RANK = new Map([
  ['critical', 4],
  ['high', 3],
  ['medium', 2],
  ['low', 1],
  ['info', 0]
]);
const RISK_CODE_PAIRS = [
  ['4', 'critical'],
  ['3', 'high'],
  ['2', 'medium'],
  ['1', 'low'],
  ['0', 'info']
];
const NAMED_SEVERITIES = ['critical', 'high', 'medium', 'low'];

// Best 2 paid on-premises DAST engines, always recommended when no free
// on-prem engine is available on the runner (R19).
const PAID_RECOMMENDATIONS = [
  {
    name: 'Burp Suite Enterprise Edition',
    vendor: 'PortSwigger',
    onPrem: true,
    note: 'On-premises DAST engine with Docker-based CI integration and full OWASP Top 10 coverage.'
  },
  {
    name: 'Invicti On-Premises',
    vendor: 'Invicti (formerly Acunetix)',
    onPrem: true,
    note: 'On-premises web scanner with low false positives and a CI-native REST API.'
  }
];

const DEFAULT_CONFIG = {
  engine: 'auto',
  target: '',
  port: 3000,
  failThreshold: 'high',
  stage: { enabled: false, command: '' },
  zap: {
    image: 'ghcr.io/zaproxy/zaproxy',
    baselineScript: 'zap-baseline.py'
  }
};

function normalizeThreshold(threshold) {
  const value = String(threshold || 'high').toLowerCase();
  if (NAMED_SEVERITIES.indexOf(value) !== -1) return value;
  return 'high';
}

function normalizeConfig(config) {
  const raw = config && typeof config === 'object' ? config : {};
  const port = Number(raw.port === undefined ? DEFAULT_CONFIG.port : raw.port);
  if (!Number.isInteger(port) || port < 1 || port > 65535) {
    throw new RangeError('port must be an integer between 1 and 65535');
  }
  const stageRaw = raw.stage && typeof raw.stage === 'object' ? raw.stage : {};
  return {
    engine: String(raw.engine || DEFAULT_CONFIG.engine).toLowerCase(),
    target: typeof raw.target === 'string' ? raw.target : '',
    port,
    failThreshold: normalizeThreshold(raw.failThreshold),
    stage: {
      enabled: Boolean(stageRaw.enabled),
      command: typeof stageRaw.command === 'string' ? stageRaw.command : ''
    },
    zap: {
      image: (raw.zap && raw.zap.image) || DEFAULT_CONFIG.zap.image,
      baselineScript: (raw.zap && raw.zap.baselineScript) || DEFAULT_CONFIG.zap.baselineScript
    }
  };
}

function detectEngine(env) {
  const e = env || {};
  if (e.zapCliAvailable) {
    return { available: true, engine: 'OWASP ZAP (CLI)', kind: 'free', onPrem: true, mode: 'cli' };
  }
  if (e.dockerAvailable && e.zapImagePresent) {
    return { available: true, engine: 'OWASP ZAP (Docker)', kind: 'free', onPrem: true, mode: 'docker' };
  }
  return { available: false, engine: null, kind: null, onPrem: null, mode: null };
}

function resolveTarget(config, fallback) {
  const prefer = function (candidate) {
    return typeof candidate === 'string' && /^https?:\/\//i.test(candidate) ? candidate : null;
  };
  const configured = prefer(config && config.target);
  if (configured) return configured;
  const fromFallback = prefer(fallback);
  if (fromFallback) return fromFallback;
  const port = (config && config.port) || DEFAULT_CONFIG.port;
  return 'http://localhost:' + port;
}

function severityFromRisk(risk) {
  const value = String(risk || '').toLowerCase();
  const byCode = RISK_CODE_PAIRS.find((pair) => pair[0] === value);
  if (byCode) return byCode[1];
  if (NAMED_SEVERITIES.indexOf(value) !== -1) return value;
  if (value === 'informational' || value === 'info') return 'info';
  const first = value.split(/[ (]/)[0];
  const byName = NAMED_SEVERITIES.indexOf(first);
  return byName !== -1 ? first : 'info';
}

function parseZapJson(raw) {
  if (typeof raw !== 'string') throw new TypeError('raw must be a string');
  let report;
  try {
    report = JSON.parse(raw.replace(/^\uFEFF/, ''));
  } catch (_) {
    throw new TypeError('raw is not valid JSON');
  }
  if (!report || typeof report !== 'object') throw new TypeError('raw JSON must be an object');
  const findings = [];
  const sites = Array.isArray(report.site) ? report.site : [];
  for (const site of sites) {
    if (!site || typeof site !== 'object') continue;
    const alerts = Array.isArray(site.alerts) ? site.alerts : [];
    for (const alert of alerts) {
      if (!alert || typeof alert !== 'object') continue;
      const severity = severityFromRisk(alert.riskdesc || alert.riskcode);
      const cwe = alert.cweid ? 'CWE-' + String(alert.cweid) : null;
      findings.push({
        id: String(alert.pluginid || ''),
        name: alert.alert || alert.name || 'unlabelled alert',
        severity,
        risk: String(alert.riskdesc || alert.riskcode || ''),
        confidence: String(alert.confidence || ''),
        cwe,
        owasp: cwe ? cweToOwasp(cwe) : 'N/A',
        uri: alert.uri || (typeof site['@name'] === 'string' ? site['@name'] : ''),
        evidence: typeof alert.evidence === 'string' ? alert.evidence.slice(0, 200) : '',
        description: typeof alert.desc === 'string' ? alert.desc.slice(0, 400) : ''
      });
    }
  }
  return findings;
}

function isDastBlocked(findings, threshold) {
  const t = normalizeThreshold(threshold);
  const baseline = SEVERITY_RANK.get(t);
  return findings.some((f) => (SEVERITY_RANK.get(f.severity) || 0) >= baseline);
}

function countSeverities(findings) {
  return SEVERITY_ORDER.map((severity) => ({
    severity,
    count: findings.filter((f) => f.severity === severity).length
  }));
}

function severityCountOf(counts, severity) {
  const match = counts.find((row) => row.severity === severity);
  return match ? match.count : 0;
}

function escapePipe(value) {
  return String(value).replace(/\|/g, '\\|');
}

function buildDastReport(findings, meta) {
  const m = meta || {};
  const target = m.target || 'N/A';
  const source = m.source || 'OWASP ZAP';
  const threshold = normalizeThreshold(m.threshold);

  let body = '# DAST Report - CMMI Level 4\n\n' +
    '**Target**: ' + target + '\n\n' +
    '**Engine**: ' + source + '\n\n' +
    '**Threshold**: fail on ' + threshold + '+ findings\n\n';

  if (m.available === false) {
    body += '**:warning: NO FREE ON-PREM DAST ENGINE DETECTED - Gate BLOCKED (R10/R19)**\n\n' +
      'A free on-premises DAST engine (OWASP ZAP via Docker) could not be detected on the runner.\n\n' +
      '## Recommended Commercial Engines (On-Premises Preferred)\n\n' +
      '| Rank | Product | Vendor | Deployment | Rationale |\n' +
      '| :--- | :--- | :--- | :--- | :--- |\n' +
      PAID_RECOMMENDATIONS.map((r, i) => '| ' + (i + 1) + ' | **' + escapePipe(r.name) + '** | ' +
        escapePipe(r.vendor) + ' | ' + (r.onPrem ? 'On-premises' : 'SaaS') + ' | ' + escapePipe(r.note) + ' |').join('\n') +
      '\n\nTo unblock, install Docker with the OWASP ZAP image (`ghcr.io/zaproxy/zaproxy`), or configure a ' +
      'commercial engine in `scripts/dast.config.json`.\n\n';
    return body + 'Generated by scripts/dast-scan.js (R19).\n';
  }

  if (m.scanExited === false) {
    body += '**:red_circle: DAST SCAN COULD NOT COMPLETE - Gate BLOCKED (R10/R19)**\n\n' +
      'The engine exited non-zero; no findings were parsed. Inspect the runner logs and retry.\n\n';
    return body + 'Generated by scripts/dast-scan.js (R19).\n';
  }

  if (findings.length === 0) {
    body += ':white_check_mark: No findings on target ' + target + '.\n\n';
    return body + 'Generated by scripts/dast-scan.js (R19).\n';
  }

  const counts = countSeverities(findings);
  body += '## Severity Distribution\n\n' +
    '| Severity | Count |\n| :--- | :--- |\n' +
    SEVERITY_ORDER.map((s) => '| ' + s.charAt(0).toUpperCase() + s.slice(1) + ' | ' + severityCountOf(counts, s) + ' |').join('\n') +
    '\n\n';

  const rows = findings
    .slice()
    .sort((a, b) => (SEVERITY_RANK.get(b.severity) || 0) - (SEVERITY_RANK.get(a.severity) || 0))
    .map((f) => '| ' + f.id + ' | ' + escapePipe(f.name) + ' | ' + f.severity + ' | ' +
      escapePipe(f.owasp) + (f.cwe ? ' (' + f.cwe + ')' : '') + ' | ' + escapePipe(f.uri || '-') + ' |')
    .join('\n');

  body += '## Findings\n\n' +
    '| ID | Alert | Severity | OWASP (CWE) | URI |\n' +
    '| :--- | :--- | :--- | :--- | :--- |\n' +
    rows + '\n\n' +
    '## Status\n\n' +
    (isDastBlocked(findings, threshold)
      ? '**:red_circle: HIGH/CRITICAL FINDINGS PRESENT - Merge BLOCKED (R10/R19)**'
      : ':white_check_mark: No ' + threshold + '+ findings on target.') + '\n\n' +
    'Generated by scripts/dast-scan.js (R19).\n';
  return body;
}

module.exports = {
  BLOCK_SEVERITIES,
  SEVERITY_ORDER,
  PAID_RECOMMENDATIONS,
  DEFAULT_CONFIG,
  normalizeThreshold,
  normalizeConfig,
  detectEngine,
  resolveTarget,
  severityFromRisk,
  parseZapJson,
  isDastBlocked,
  countSeverities,
  buildDastReport
};

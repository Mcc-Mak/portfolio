'use strict';

const BLOCK_SEVERITIES = ['high', 'critical'];
const DEFAULT_OWASP = 'A06:2021 Vulnerable and Outdated Components';

const OWASP_MAP = [
  ['CWE-78', 'A03:2021 Injection (OS Command)'],
  ['CWE-79', 'A03:2021 Injection (Cross-site Scripting)'],
  ['CWE-89', 'A03:2021 Injection (SQL)'],
  ['CWE-94', 'A03:2021 Injection (Code)'],
  ['CWE-95', 'A03:2021 Injection (Code)'],
  ['CWE-1236', 'A03:2021 Injection (CSV)'],
  ['CWE-1333', 'A03:2021 Injection (ReDoS)'],
  ['CWE-352', 'A01:2021 Broken Access Control (CSRF)'],
  ['CWE-285', 'A01:2021 Broken Access Control'],
  ['CWE-862', 'A01:2021 Broken Access Control (Missing Authorization)'],
  ['CWE-863', 'A01:2021 Broken Access Control (Incorrect Authorization)'],
  ['CWE-611', 'A05:2021 Security Misconfiguration (XXE)'],
  ['CWE-209', 'A05:2021 Security Misconfiguration (Info Exposure)'],
  ['CWE-532', 'A05:2021 Security Misconfiguration (Log Exposure)'],
  ['CWE-200', 'A05:2021 Security Misconfiguration (Sensitive Info Exposure)']
];

const CVSS_ORDER = ['critical', 'high', 'medium', 'low'];

function normalizeSeverity(severity) {
  const value = String(severity || 'unknown').toLowerCase();
  if (value === 'moderate' || value === 'medium') return 'medium';
  if (value === 'critical' || value === 'high' || value === 'low' || value === 'info') return value;
  return 'info';
}

function severityFromCvss(cvss) {
  const score = Number(cvss);
  if (!Number.isFinite(score)) return null;
  if (score >= 9.0) return 'critical';
  if (score >= 7.0) return 'high';
  if (score >= 4.0) return 'medium';
  return 'low';
}

function cweToOwasp(cweId) {
  if (typeof cweId !== 'string') return DEFAULT_OWASP;
  const id = cweId.trim().toUpperCase();
  const key = id.indexOf('CWE-') === 0 ? id : 'CWE-' + id;
  const match = OWASP_MAP.find((pair) => pair[0] === key);
  return match ? match[1] : DEFAULT_OWASP;
}

function extractCwe(entry) {
  const raw = entry && (entry.cwe || entry.cweWeakness);
  if (!raw) return null;
  const first = Array.isArray(raw) ? raw[0] : raw;
  return typeof first === 'string' && first ? first.replace(/^cwe-/i, 'CWE-') : null;
}

function parseAudit(audit) {
  if (!audit || typeof audit !== 'object') {
    throw new TypeError('audit must be an object');
  }
  const vulns = audit.vulnerabilities && typeof audit.vulnerabilities === 'object'
    ? audit.vulnerabilities
    : {};
  const findings = [];
  for (const item of Object.entries(vulns)) {
    const name = item[0];
    const advisories = Array.isArray(item[1]) ? item[1] : [item[1]];
    for (const adv of advisories) {
      if (!adv || typeof adv !== 'object') continue;
      const via = Array.isArray(adv.via) ? adv.via : [];
      let title = adv.title || '';
      let cvss = adv.cvss && adv.cvss.score ? Number(adv.cvss.score) : null;
      let cwe = extractCwe(adv);
      let url = adv.url || '';
      for (const entry of via) {
        if (!entry || typeof entry !== 'object') continue;
        if (!title && entry.title) title = entry.title;
        if (cwe === null) cwe = extractCwe(entry);
        if (cvss === null && entry.cvss && Number.isFinite(Number(entry.cvss.score))) {
          cvss = Number(entry.cvss.score);
        }
        if (!url && entry.url) url = entry.url;
      }
      const severity = severityFromCvss(cvss) || normalizeSeverity(adv.severity);
      findings.push({
        name,
        version: adv.range || adv.version || '',
        severity,
        cvss,
        cwe,
        title: title || adv.version || adv.range || 'unknown advisory',
        url,
        owasp: cweToOwasp(cwe),
        direct: Boolean(adv.isDirect),
        cves: []
      });
    }
  }
  return findings;
}

function enrichWithOsv(findings, osvMap) {
  if (!Array.isArray(findings)) throw new TypeError('findings must be an array');
  if (!(osvMap instanceof Map)) throw new TypeError('osvMap must be a Map');
  for (const f of findings) {
    const key = f.name + '@' + f.version;
    const entry = osvMap.get(key);
    if (!entry) continue;
    for (const alias of entry.aliases || []) {
      if (f.cves.indexOf(alias) === -1) f.cves.push(alias);
    }
    if (f.cvss === null && Number.isFinite(Number(entry.maxCvss))) f.cvss = Number(entry.maxCvss);
    if (entry.maxCvss) {
      const derived = severityFromCvss(entry.maxCvss);
      if (derived) f.severity = derived;
    }
    if (f.url) f.url = (entry.source || '') + (entry.source ? ' | ' : '') + f.url;
  }
  return findings;
}

function isThreatBlocked(findings) {
  return findings.some((f) => BLOCK_SEVERITIES.indexOf(f.severity) !== -1);
}

function countSeverities(findings) {
  return CVSS_ORDER.concat(['info']).map((severity) => ({
    severity,
    count: findings.filter((f) => f.severity === severity).length
  }));
}

function severityCountOf(counts, severity) {
  const match = counts.find((row) => row.severity === severity);
  return match ? match.count : 0;
}

function buildThreatReport(findings, meta) {
  const counts = countSeverities(findings);
  const source = meta && meta.source ? meta.source : 'npm audit + OSV.dev (CVE/CVSS)';
  const footer = meta && meta.enriched ? '\n\n**OSV.dev enrichment**: ' + meta.enriched + ' packages cross-referenced for CVE/CVSS metadata. Generated by scripts/threat-model.js (R17).' : '';

  if (findings.length === 0) {
    return '# Threat Model Report - CMMI Level 4\n\n' +
      '**Source**: ' + source + '\n\n' +
      ':white_check_mark: No known vulnerabilities in the dependency set.\n' +
      'Generated by scripts/threat-model.js (R17).';
  }

  const rows = findings
    .sort((a, b) => CVSS_ORDER.indexOf(a.severity) - CVSS_ORDER.indexOf(b.severity))
    .map((f) => {
      const cve = f.cves.length > 0 ? f.cves.slice(0, 3).join(', ') : (f.url || '-');
      return '| ' + f.name + ' | ' + (f.version || '-') + ' | ' + f.severity + ' | ' +
        (f.cvss !== null ? f.cvss.toFixed(1) : '-') + ' | ' +
        (f.cwe ? f.cwe + ' ' : '') + f.owasp + ' | ' + cve.replace(/\|/g, '\\|') + ' | ' +
        (f.direct ? ':white_check_mark:' : 'no') + ' |';
    })
    .join('\n');

  const pieLines = ['critical', 'high', 'medium', 'low']
    .filter((s) => severityCountOf(counts, s) > 0)
    .map((s) => '    "' + s.charAt(0).toUpperCase() + s.slice(1) + '" : ' + severityCountOf(counts, s))
    .join('\n');
  const pie = '```mermaid\npie showData title "Findings by Severity"\n' + pieLines + '\n```';

  return '# Threat Model Report - CMMI Level 4\n\n' +
    '**Source**: ' + source + '\n\n' +
    '## Severity Distribution\n\n' +
    '| Severity | Count |\n| :--- | :--- |\n' +
    CVSS_ORDER.map((s) => '| ' + s.charAt(0).toUpperCase() + s.slice(1) + ' | ' + severityCountOf(counts, s) + ' |').join('\n') +
    '\n\n' + pie + '\n\n' +
    '## Findings\n\n' +
    '| Package | Version | Severity | CVSS | OWASP (CWE) | CVE / Advisory | Direct |\n' +
    '| :--- | :--- | :--- | :--- | :--- | :--- | :--- |\n' +
    rows + '\n\n' +
    '## Status\n\n' +
    (isThreatBlocked(findings)
      ? '**:red_circle: HIGH/CRITICAL VULNERABILITIES PRESENT - Merge BLOCKED (R10/R17)**'
      : ':white_check_mark: No high/critical vulnerabilities in the dependency set.') +
    footer + '\n';
}

module.exports = {
  BLOCK_SEVERITIES,
  normalizeSeverity,
  severityFromCvss,
  cweToOwasp,
  extractCwe,
  parseAudit,
  enrichWithOsv,
  isThreatBlocked,
  countSeverities,
  buildThreatReport
};
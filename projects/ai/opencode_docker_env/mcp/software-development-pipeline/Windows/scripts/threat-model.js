// ================================================================
// R17: Threat Model Gate (CVE/CVSS via npm audit + OSV.dev)
// Parses the Phase-3 npm audit JSON, cross-references each affected
// package with the OSV.dev vulnerability database for CVE IDs and
// CVSS scores, maps CWEs to OWASP Top 10, and writes
// metrics/threat-model.md. Blocking on high/critical findings.
// ================================================================

'use strict';

const fs = require('fs');
const path = require('path');
const https = require('https');

const {
  parseAudit,
  enrichWithOsv,
  isThreatBlocked,
  buildThreatReport
} = require('../src/threat');

const AUDIT_PATH = path.join(__dirname, '..', 'metrics', 'security-scan.json');
const REPORT_PATH = path.join(__dirname, '..', 'metrics', 'threat-model.md');
const OSV_HOST = 'api.osv.dev';
const OSV_PATH = '/v1/query';
const MAX_ENRICH = 12;
const OSV_TIMEOUT = 8000;

function queryOsv(name, version) {
  return new Promise((resolve) => {
    const payload = JSON.stringify({ package: { name, ecosystem: 'npm', version } });
    const req = https.request({
      hostname: OSV_HOST,
      path: OSV_PATH,
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Content-Length': Buffer.byteLength(payload)
      },
      timeout: OSV_TIMEOUT
    }, (res) => {
      let data = '';
      res.on('data', (chunk) => { data += chunk; });
      res.on('end', () => {
        try {
          const json = JSON.parse(data);
          resolve(Array.isArray(json.vulns) ? json.vulns : []);
        } catch (_) {
          resolve(null);
        }
      });
    });
    req.on('timeout', () => { req.destroy(); resolve(null); });
    req.on('error', () => resolve(null));
    req.write(payload);
    req.end();
  });
}

function collectOsvMetadata(findings) {
  const keys = [];
  for (const f of findings) {
    if (!f.version) continue;
    const key = f.name + '@' + f.version;
    if (keys.indexOf(key) === -1) keys.push(key);
  }
  return keys.slice(0, MAX_ENRICH);
}

async function enrichWithOsvApi(findings) {
  const keys = collectOsvMetadata(findings);
  const osvMap = new Map();
  let crossRef = 0;
  for (const key of keys) {
    const parts = key.split('@');
    const name = parts.slice(0, parts.length - 1).join('@');
    const version = parts[parts.length - 1];
    const vulns = await queryOsv(name, version);
    if (!vulns) continue;
    crossRef += 1;
    const aliases = [];
    const cvsses = [];
    for (const v of vulns) {
      for (const alias of v.aliases || []) {
        if (/^CVE-/i.test(alias)) aliases.push(alias.toUpperCase());
      }
      for (const s of v.severity || []) {
        if (s.type && /CVSS/i.test(s.type) && Number.isFinite(Number(s.score))) {
          cvsses.push(Number(s.score));
        }
      }
    }
    osvMap.set(key, {
      aliases,
      maxCvss: cvsses.length > 0 ? Math.max.apply(Math, cvsses) : null,
      source: 'OSV.dev'
    });
  }
  const enriched = enrichWithOsv(findings, osvMap);
  return { enriched, crossReferenced: crossRef };
}

async function main() {
  if (!fs.existsSync(AUDIT_PATH)) {
    fs.mkdirSync(path.dirname(REPORT_PATH), { recursive: true });
    fs.writeFileSync(REPORT_PATH, buildThreatReport([], {}));
    console.log('[CHECK] No npm audit JSON at ' + AUDIT_PATH + ' (R9 gate guards it) - threat model empty');
    process.exit(0);
  }

  let audit;
  try {
    const raw = fs.readFileSync(AUDIT_PATH, 'utf8').replace(/^\uFEFF/, '');
    audit = JSON.parse(raw);
  } catch (err) {
    console.error('[FAIL] Could not parse ' + AUDIT_PATH + ':', err.message);
    process.exit(1);
  }

  const findings = parseAudit(audit, {});
  const meta = {};

  if (findings.length > 0) {
    const osvResult = await enrichWithOsvApi(findings);
    meta.source = 'npm audit + OSV.dev (CVE/CVSS), ' + osvResult.crossReferenced + '/' + collectOsvMetadata(findings).length + ' packages cross-referenced';
    meta.enriched = osvResult.crossReferenced;
  }

  fs.mkdirSync(path.dirname(REPORT_PATH), { recursive: true });
  fs.writeFileSync(REPORT_PATH, buildThreatReport(findings, meta));

  console.log('[REPORT] ' + REPORT_PATH);
  const counts = { critical: 0, high: 0 };
  let shown = 0;
  for (const f of findings) {
    if (f.severity === 'critical' || f.severity === 'high') {
      counts[f.severity] += 1;
      if (shown < 5) {
        console.log('[THREAT] ' + f.severity.toUpperCase() + ' ' + f.name + '@' + (f.version || 'any') +
          (f.cves.length > 0 ? ' ' + f.cves.join(', ') : '') + ' (' + f.owasp + ')');
        shown += 1;
      }
    }
  }

  if (isThreatBlocked(findings)) {
    console.error('[FAIL] THREAT MODEL BLOCKED (R10/R17): ' +
      counts.critical + ' critical, ' + counts.high + ' high severity advisories');
    process.exit(1);
  }

  console.log('[OK] Threat model gate passed: no high/critical advisories (' + findings.length + ' total findings)');
  process.exit(0);
}

if (require.main === module) {
  main().catch((err) => {
    console.error('[FAIL] Threat model error:', err.message);
    process.exit(1);
  });
}
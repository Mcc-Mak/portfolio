#!/usr/bin/env node
import { mkdir, readFile, writeFile } from "node:fs/promises";
import path from "node:path";
import process from "node:process";
import { fileURLToPath } from "node:url";

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");

function parseArgs(argv) {
  const opts = { dryRun: false, strict: false, out: null, help: false };
  for (let i = 0; i < argv.length; i++) {
    const a = argv[i];
    if (a === "--dry-run") opts.dryRun = true;
    else if (a === "--strict") opts.strict = true;
    else if (a === "--out") opts.out = argv[++i] ?? null;
    else if (a === "-h" || a === "--help") opts.help = true;
  }
  return opts;
}

const TARGETS = {
  checklist: "docs/05_security_compliance/compliance-checklist.md",
  gdpr: "docs/05_security_compliance/gdpr-compliance.md",
  soc2: "docs/05_security_compliance/soc2-compliance.md",
  ssot: "docs/00_requirements/ssot_raw_answers.json",
};

const GDPR_TOPICS = [
  { id: "gdpr.lawfulBasis", label: "Lawful basis", re: /lawful basis|legal basis|article\s*6/i },
  { id: "gdpr.dataSubjectRights", label: "Data subject rights", re: /data subject rights|right of access|erasure|rectification|portability|objection/i },
  { id: "gdpr.retention", label: "Retention & storage limitation", re: /retention|storage limitation/i },
  { id: "gdpr.breachNotification", label: "Breach notification", re: /breach notification|72\s*hours|data breach/i },
  { id: "gdpr.processors", label: "Processors & DPAs", re: /processor|\bDPA\b|sub-?processor|data processing agreement/i },
  { id: "gdpr.internationalTransfers", label: "International transfers", re: /international transfer|SCC|standard contractual clauses|adequacy/i },
  { id: "gdpr.privacyByDesign", label: "Privacy by design / DPIA", re: /\bDPIA\b|privacy by design|data protection impact/i },
];

const SOC2_TOPICS = [
  { id: "soc2.security", label: "Security (common criteria)", re: /\bsecurity\b|CC[0-9]/i },
  { id: "soc2.availability", label: "Availability", re: /availability/i },
  { id: "soc2.processingIntegrity", label: "Processing integrity", re: /processing integrity|integrity of processing/i },
  { id: "soc2.confidentiality", label: "Confidentiality", re: /confidentiality/i },
  { id: "soc2.privacy", label: "Privacy", re: /\bprivacy\b/i },
];

const PLACEHOLDER_RE = /\b(TODO|TBD|PLACEHOLDER|LOREM IPSUM)\b/i;
const MIN_CONTENT_LENGTH = 400;

async function readText(rel) {
  try {
    return await readFile(path.resolve(ROOT, rel), "utf8");
  } catch {
    return null;
  }
}

function checkFileExists(rel, content) {
  if (content === null) return { status: "pending", details: `missing file ${rel} (generated in Phase 2/5)` };
  return null;
}

function checkNotPlaceholder(content) {
  if (content.trim().length < MIN_CONTENT_LENGTH) return { status: "fail", details: `content too short (${content.trim().length} < ${MIN_CONTENT_LENGTH})` };
  const m = content.match(PLACEHOLDER_RE);
  if (m) return { status: "fail", details: `placeholder marker found: ${m[0]}` };
  return null;
}

function topicChecks(docId, rel, content, topics) {
  const checks = [];
  for (const t of topics) {
    if (content === null) {
      checks.push({ id: `${docId}.${t.id}`, name: t.label, target: rel, status: "pending", details: "document not present yet" });
      continue;
    }
    const found = t.re.test(content);
    checks.push({
      id: t.id,
      name: t.label,
      target: rel,
      status: found ? "pass" : "warn",
      details: found ? "topic covered" : "topic not mentioned",
    });
  }
  return checks;
}

function collectSsotStrings(value, acc = []) {
  if (typeof value === "string") acc.push(value.toLowerCase());
  else if (Array.isArray(value)) for (const v of value) collectSsotStrings(v, acc);
  else if (value && typeof value === "object") for (const v of Object.values(value)) collectSsotStrings(v, acc);
  return acc;
}

async function main() {
  const opts = parseArgs(process.argv.slice(2));
  if (opts.help) {
    console.log(
      [
        "Usage: node tools/compliance-check.mjs [--dry-run] [--strict] [--out <file>]",
        "",
        "Validates GDPR/SOC2/compliance documentation completeness and SSOT linkage.",
        "Missing documents report 'pending' (pre-Phase-5 state); --strict fails on pending/fail.",
      ].join("\n"),
    );
    process.exit(0);
  }

  if (opts.dryRun) {
    console.log(
      JSON.stringify({ tool: "compliance-check", dryRun: true, plan: ["validate compliance/gdpr/soc2 docs", "check placeholders and required topics", "verify SSOT linkage", opts.out ? `write ${opts.out}` : "stdout only"] }, null, 2),
    );
    process.exit(0);
  }

  const contents = {};
  for (const [key, rel] of Object.entries(TARGETS)) contents[key] = await readText(rel);

  const checks = [];
  let ssotStrings = [];

  for (const key of ["checklist", "gdpr", "soc2"]) {
    const rel = TARGETS[key];
    const content = contents[key];
    const pending = checkFileExists(rel, content);
    if (pending) {
      checks.push({ id: `${key}.exists`, name: `Document exists`, target: rel, ...pending });
      continue;
    }
    checks.push({ id: `${key}.exists`, name: `Document exists`, target: rel, status: "pass", details: "present" });
    const placeholderResult = checkNotPlaceholder(content);
    checks.push(
      placeholderResult
        ? { id: `${key}.content`, name: "Meaningful content", target: rel, ...placeholderResult }
        : { id: `${key}.content`, name: "Meaningful content", target: rel, status: "pass", details: "no placeholder markers" },
    );
  }

  checks.push(...topicChecks("gdpr", TARGETS.gdpr, contents.gdpr, GDPR_TOPICS));
  checks.push(...topicChecks("soc2", TARGETS.soc2, contents.soc2, SOC2_TOPICS));

  if (contents.ssot !== null) {
    try {
      ssotStrings = collectSsotStrings(JSON.parse(contents.ssot));
      checks.push({ id: "ssot.exists", name: "SSOT present", target: TARGETS.ssot, status: "pass", details: `${ssotStrings.length} string fragments indexed` });
    } catch (e) {
      checks.push({ id: "ssot.validJson", name: "SSOT valid JSON", target: TARGETS.ssot, status: "fail", details: e.message });
    }
  } else {
    checks.push({ id: "ssot.exists", name: "SSOT present", target: TARGETS.ssot, status: "pending", details: "not captured yet (Phase 1)" });
  }

  if (contents.gdpr && ssotStrings.length > 0) {
    const gdprLower = contents.gdpr.toLowerCase();
    const personalDataTerms = new Set();
    for (const s of ssotStrings) {
      for (const term of ["personal data", "pii", "gdpr", "user data", "data subject", "consent", "tracking", "cookies"]) {
        if (s.includes(term)) personalDataTerms.add(term);
      }
    }
    if (personalDataTerms.size > 0) {
      const missing = [...personalDataTerms].filter((t) => !gdprLower.includes(t));
      checks.push({
        id: "linkage.ssotToGdpr",
        name: "SSOT personal-data answers reflected in GDPR doc",
        target: TARGETS.gdpr,
        status: missing.length === 0 ? "pass" : "warn",
        details: missing.length === 0 ? `all terms covered (${[...personalDataTerms].join(", ")})` : `terms not addressed: ${missing.join(", ")}`,
      });
    }
  }

  const summary = {
    pass: checks.filter((c) => c.status === "pass").length,
    warn: checks.filter((c) => c.status === "warn").length,
    fail: checks.filter((c) => c.status === "fail").length,
    pending: checks.filter((c) => c.status === "pending").length,
    total: checks.length,
  };
  const passed = summary.fail === 0;

  const report = {
    tool: "compliance-check",
    generatedAt: new Date().toISOString(),
    engine: "stdlib document validator",
    summary,
    passed,
    checks,
  };

  if (opts.out) await writeFileSafe(opts.out, JSON.stringify(report, null, 2));
  console.log(JSON.stringify(report, null, 2));

  if (summary.fail > 0) process.exit(1);
  if (opts.strict && (summary.pending > 0 || summary.warn > 0)) process.exit(1);
}

async function writeFileSafe(out, json) {
  await mkdir(path.dirname(path.resolve(out)), { recursive: true });
  await writeFile(out, json, "utf8");
}

main().catch((e) => {
  console.error(e);
  process.exit(2);
});

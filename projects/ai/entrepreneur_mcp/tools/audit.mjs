#!/usr/bin/env node
import { spawnSync } from "node:child_process";
import { mkdir, writeFile } from "node:fs/promises";
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
    else if (a === "--json") {} else if (a === "--out") opts.out = argv[++i] ?? null;
    else if (a === "-h" || a === "--help") opts.help = true;
    else if (!a.startsWith("-")) opts.out = opts.out ?? a;
  }
  return opts;
}

function pnpmCommand() {
  return process.platform === "win32" ? "pnpm.cmd" : "pnpm";
}

function runPnpmAudit() {
  const res =
    process.platform === "win32"
      ? spawnSync("cmd.exe", ["/d", "/s", "/c", "pnpm audit --json"], { cwd: ROOT, encoding: "utf8", maxBuffer: 64 * 1024 * 1024 })
      : spawnSync(pnpmCommand(), ["audit", "--json"], { cwd: ROOT, encoding: "utf8", maxBuffer: 64 * 1024 * 1024 });
  return { status: res.status, stdout: res.stdout ?? "", stderr: res.stderr ?? "" };
}

const SEVERITIES = ["critical", "high", "moderate", "low", "info"];

function normalizePnpmShape(data) {
  const advisories = data?.advisories ?? {};
  const findings = Object.values(advisories).map((adv) => ({
    id: String(adv.id ?? ""),
    package: adv.module_name ?? adv.name ?? "unknown",
    severity: String(adv.severity ?? "unknown").toLowerCase(),
    title: adv.title ?? "",
    url: adv.url ?? "",
    vulnerableVersions: adv.vulnerable_versions ?? "",
    patchedVersions: adv.patched_versions ?? "",
    paths: Array.isArray(adv.findings)
      ? adv.findings.flatMap((f) => (Array.isArray(f?.paths) ? f.paths : []))
      : [],
  }));
  return findings;
}

function normalizeNpm7Shape(data) {
  const vulns = data?.vulnerabilities ?? {};
  const findings = Object.entries(vulns).map(([name, v]) => ({
    id: Array.isArray(v?.via)
      ? v.via
          .filter((x) => typeof x === "object")
          .map((x) => String(x.source ?? ""))
          .join(",")
      : "",
    package: name,
    severity: String(v?.severity ?? "unknown").toLowerCase(),
    title: Array.isArray(v?.via)
      ? v.via
          .filter((x) => typeof x === "object")
          .map((x) => x.title ?? "")
          .join("; ")
      : "",
    url: Array.isArray(v?.via)
      ? (v.via.find((x) => typeof x === "object" && x.url)?.url ?? "")
      : "",
    vulnerableVersions: v?.range ?? "",
    patchedVersions: Array.isArray(v?.fixAvailable)
      ? ""
      : v?.fixAvailable?.version ?? "",
    paths: [],
  }));
  return findings;
}

function countBySeverity(findings) {
  const counts = Object.fromEntries(SEVERITIES.map((s) => [s, 0]));
  counts.unknown = 0;
  for (const f of findings) counts[f.severity] = (counts[f.severity] ?? 0) + 1;
  counts.total = findings.length;
  return counts;
}

async function main() {
  const opts = parseArgs(process.argv.slice(2));
  if (opts.help) {
    console.log(
      [
        "Usage: node tools/audit.mjs [--dry-run] [--strict] [--out <file>]",
        "",
        "Runs `pnpm audit --json` and emits normalized dependency-vulnerability findings.",
        "  --dry-run  print planned actions without executing",
        "  --strict   exit code 1 when critical/high findings exist",
        "  --out      also write the JSON report to this file",
      ].join("\n"),
    );
    process.exit(0);
  }

  if (opts.dryRun) {
    console.log(
      JSON.stringify({ tool: "audit", dryRun: true, plan: ["pnpm audit --json", "normalize advisories", opts.out ? `write ${opts.out}` : "stdout only"] }, null, 2),
    );
    process.exit(0);
  }

  const { stdout, stderr } = runPnpmAudit();
  let data = null;
  let parseError = null;
  try {
    data = JSON.parse(stdout);
  } catch {
    parseError = "pnpm audit did not return valid JSON";
  }

  if (!data || parseError) {
    console.error(JSON.stringify({ tool: "audit", error: parseError ?? "empty audit output", stderr: stderr.slice(-2000) }));
    process.exit(2);
  }

  const findings = data.advisories
    ? normalizePnpmShape(data)
    : data.vulnerabilities
      ? normalizeNpm7Shape(data)
      : [];
  const summary = countBySeverity(findings);
  const report = {
    tool: "audit",
    generatedAt: new Date().toISOString(),
    packageManager: "pnpm",
    summary,
    findings,
  };

  const json = JSON.stringify(report, null, 2);
  if (opts.out) {
    await mkdir(path.dirname(path.resolve(opts.out)), { recursive: true });
    await writeFile(opts.out, json, "utf8");
  }
  console.log(json);
  if (opts.strict && (summary.critical + summary.high) > 0) process.exit(1);
}

main().catch((e) => {
  console.error(e);
  process.exit(2);
});

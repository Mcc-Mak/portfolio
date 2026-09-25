#!/usr/bin/env node
import { mkdir, writeFile } from "node:fs/promises";
import { createRequire } from "node:module";
import path from "node:path";
import process from "node:process";
import { fileURLToPath } from "node:url";

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const require = createRequire(import.meta.url);

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

const ALLOWED = new Set([
  "MIT",
  "MIT*",
  "ISC",
  "Apache-2.0",
  "Apache License, Version 2.0",
  "BSD-2-Clause",
  "BSD-3-Clause",
  "0BSD",
  "Unlicense",
  "CC0-1.0",
  "BlueOak-1.0.0",
  "Python-2.0",
]);

function classify(licenseString) {
  const s = String(licenseString ?? "").trim();
  if (!s || s === "Unknown" || s.includes("UNLICENSED")) return "unknown";
  const parts = s.split(/\s*(?:,|AND|OR|\(|\)|\/)\s*/i).filter(Boolean);
  const normalized = parts.length > 0 ? parts : [s];
  for (const p of normalized) {
    const up = p.trim();
    if (/^(L?)GPL|AGPL|SSPL|EUPL/i.test(up)) return "copyleft-risk";
    if (!ALLOWED.has(up)) return "review-required";
  }
  return "allowed";
}

async function main() {
  const opts = parseArgs(process.argv.slice(2));
  if (opts.help) {
    console.log(
      [
        "Usage: node tools/license-check.mjs [--dry-run] [--strict] [--out <file>]",
        "",
        "License risk check over installed dependencies using license-checker.",
      ].join("\n"),
    );
    process.exit(0);
  }

  if (opts.dryRun) {
    console.log(
      JSON.stringify({ tool: "license-check", dryRun: true, plan: ["license-checker scan", `start ${ROOT}`, opts.out ? `write ${opts.out}` : "stdout only"] }, null, 2),
    );
    process.exit(0);
  }

  const checker = require("license-checker");
  const packages = await new Promise((resolve, reject) => {
    checker.init({ start: ROOT, production: false, development: true, unknown: true }, (err, json) => {
      if (err) reject(err);
      else resolve(json);
    });
  });

  const entries = Object.entries(packages ?? {}).map(([key, info]) => ({
    key,
    name: info.name ?? key.split(/@(?!.*@)/)[0] ?? key,
    version: info.version ?? "",
    licenses: info.licenses ?? "",
    classification: classify(info.licenses),
    repository: info.repository ?? "",
  }));

  const byLicense = {};
  for (const e of entries) byLicense[e.licenses] = (byLicense[e.licenses] ?? 0) + 1;

  const flagged = entries.filter((e) => e.classification !== "allowed");
  const summary = {
    total: entries.length,
    allowed: entries.filter((e) => e.classification === "allowed").length,
    reviewRequired: entries.filter((e) => e.classification === "review-required").length,
    copyleftRisk: entries.filter((e) => e.classification === "copyleft-risk").length,
    unknown: entries.filter((e) => e.classification === "unknown").length,
    byLicense,
  };
  const report = {
    tool: "license-check",
    generatedAt: new Date().toISOString(),
    engine: "license-checker",
    summary,
    findings: flagged,
    allPackages: entries.map((e) => ({
      name: e.name,
      version: e.version,
      licenses: e.licenses,
      classification: e.classification,
      repository: e.repository,
    })),
  };

  const json = JSON.stringify(report, null, 2);
  if (opts.out) {
    await mkdir(path.dirname(path.resolve(opts.out)), { recursive: true });
    await writeFile(opts.out, json, "utf8");
  }
  console.log(json);
  if (opts.strict && summary.copyleftRisk + summary.unknown > 0) process.exit(1);
}

main().catch((e) => {
  console.error(e);
  process.exit(2);
});

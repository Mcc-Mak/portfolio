#!/usr/bin/env node
import { mkdir, writeFile } from "node:fs/promises";
import { existsSync, readdirSync } from "node:fs";
import path from "node:path";
import process from "node:process";
import { fileURLToPath } from "node:url";

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");

function parseArgs(argv) {
  const opts = { dryRun: false, strict: false, out: null, help: false, patterns: [] };
  for (let i = 0; i < argv.length; i++) {
    const a = argv[i];
    if (a === "--dry-run") opts.dryRun = true;
    else if (a === "--strict") opts.strict = true;
    else if (a === "--out") opts.out = argv[++i] ?? null;
    else if (a === "-h" || a === "--help") opts.help = true;
    else if (!a.startsWith("-")) opts.patterns.push(a);
  }
  return opts;
}

const DEFAULT_PATTERNS = ["tools/**/*.mjs", "src/**/*.mjs", "tests/**/*.mjs", "*.mjs", "*.js"];

function dirHasMatchingFile(dirAbs, ext) {
  try {
    return readdirSync(dirAbs, { recursive: true }).some((e) => e.endsWith(ext));
  } catch {
    return false;
  }
}

function patternHasMatches(pattern, cwd) {
  if (!pattern.includes("/")) {
    const ext = path.extname(pattern);
    try {
      return readdirSync(cwd).some((f) => f.endsWith(ext));
    } catch {
      return false;
    }
  }
  const base = pattern.split("/")[0];
  const target = path.join(cwd, base);
  if (!existsSync(target)) return false;
  return dirHasMatchingFile(target, path.extname(pattern));
}

function filterPatterns(patterns, cwd) {
  return patterns.filter((p) => (p.includes("*") ? patternHasMatches(p, cwd) : existsSync(path.join(cwd, p))));
}

function severityLabel(eslintSeverity) {
  if (eslintSeverity === 2) return "high";
  if (eslintSeverity === 1) return "moderate";
  return "low";
}

async function main() {
  const opts = parseArgs(process.argv.slice(2));
  if (opts.help) {
    console.log(
      [
        "Usage: node tools/security-scan.mjs [--dry-run] [--strict] [--out <file>] [patterns...]",
        "",
        "Static application security scanning over JS sources using eslint-plugin-security.",
        "Defaults to scanning tools/, src/, tests/ and root-level .js/.mjs files.",
      ].join("\n"),
    );
    process.exit(0);
  }

  const patterns = opts.patterns.length > 0 ? opts.patterns : DEFAULT_PATTERNS;
  const configFile = path.join(ROOT, "eslint.config.js");

  if (opts.dryRun) {
    console.log(
      JSON.stringify({ tool: "security-scan", dryRun: true, plan: ["eslint flat-config scan", `config ${configFile}`, `patterns ${patterns.join(", ")}`, opts.out ? `write ${opts.out}` : "stdout only"] }, null, 2),
    );
    process.exit(0);
  }

  const { loadESLint } = await import("eslint");
  const ESLint = await loadESLint({ useFlatConfig: true });
  const eslint = new ESLint({ cwd: ROOT, overrideConfigFile: configFile });
  const effectivePatterns = filterPatterns(patterns, ROOT);
  if (effectivePatterns.length === 0) {
    console.log(JSON.stringify({ tool: "security-scan", generatedAt: new Date().toISOString(), engine: "eslint + eslint-plugin-security", summary: { errors: 0, warnings: 0, info: 0, filesScanned: 0, total: 0 }, findings: [], note: "no matching files" }, null, 2));
    process.exit(0);
  }
  const results = await eslint.lintFiles(effectivePatterns);

  const findings = [];
  for (const r of results) {
    for (const m of r.messages ?? []) {
      findings.push({
        file: path.relative(ROOT, r.filePath),
        line: m.line ?? 0,
        column: m.column ?? 0,
        ruleId: m.ruleId ?? "",
        severity: severityLabel(m.severity),
        message: m.message,
      });
    }
  }

  const summary = {
    errors: findings.filter((f) => f.severity === "high").length,
    warnings: findings.filter((f) => f.severity === "moderate").length,
    info: findings.filter((f) => f.severity === "low").length,
    filesScanned: results.length,
    total: findings.length,
  };
  const report = {
    tool: "security-scan",
    generatedAt: new Date().toISOString(),
    engine: "eslint + eslint-plugin-security",
    summary,
    findings,
  };

  const json = JSON.stringify(report, null, 2);
  if (opts.out) {
    await mkdir(path.dirname(path.resolve(opts.out)), { recursive: true });
    await writeFile(opts.out, json, "utf8");
  }
  console.log(json);
  if (opts.strict && summary.errors > 0) process.exit(1);
}

main().catch((e) => {
  console.error(e);
  process.exit(2);
});

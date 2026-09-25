#!/usr/bin/env node
import { spawnSync } from "node:child_process";
import { mkdir, writeFile } from "node:fs/promises";
import path from "node:path";
import process from "node:process";
import { fileURLToPath } from "node:url";

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");

function parseArgs(argv) {
  const opts = { dryRun: false, strict: false, out: null, help: false, targets: [] };
  for (let i = 0; i < argv.length; i++) {
    const a = argv[i];
    if (a === "--dry-run") opts.dryRun = true;
    else if (a === "--strict") opts.strict = true;
    else if (a === "--out") opts.out = argv[++i] ?? null;
    else if (a === "-h" || a === "--help") opts.help = true;
    else if (!a.startsWith("-")) opts.targets.push(a);
  }
  return opts;
}

const DEFAULT_TARGETS = ["**/*", "!node_modules/**", "!.git/**", "!docs/**"];

function secretlintCommand() {
  return process.platform === "win32"
    ? path.join(ROOT, "node_modules", ".bin", "secretlint.cmd")
    : path.join(ROOT, "node_modules", ".bin", "secretlint");
}

function runSecretlint(targets) {
  const args = ["--secretlintrc", path.join(ROOT, ".secretlintrc.json"), "--format", "json", ...targets];
  const res =
    process.platform === "win32"
      ? spawnSync("cmd.exe", ["/d", "/s", "/c", [secretlintCommand(), ...args].map((a) => (/\s/.test(a) ? `"${a}"` : a)).join(" ")], { cwd: ROOT, encoding: "utf8", maxBuffer: 64 * 1024 * 1024 })
      : spawnSync(secretlintCommand(), args, { cwd: ROOT, encoding: "utf8", maxBuffer: 64 * 1024 * 1024 });
  return { status: res.status, stdout: res.stdout ?? "", stderr: res.stderr ?? "" };
}

async function main() {
  const opts = parseArgs(process.argv.slice(2));
  if (opts.help) {
    console.log(
      [
        "Usage: node tools/secret-scan.mjs [--dry-run] [--strict] [--out <file>] [targets...]",
        "",
        "Secret detection using secretlint with the recommended preset.",
      ].join("\n"),
    );
    process.exit(0);
  }

  const targets = opts.targets.length > 0 ? opts.targets : DEFAULT_TARGETS;

  if (opts.dryRun) {
    console.log(
      JSON.stringify({ tool: "secret-scan", dryRun: true, plan: ["secretlint scan", `config .secretlintrc.json`, `targets ${targets.join(" ")}`, opts.out ? `write ${opts.out}` : "stdout only"] }, null, 2),
    );
    process.exit(0);
  }

  const { status, stdout, stderr } = runSecretlint(targets);
  let parsed = null;
  try {
    parsed = JSON.parse(stdout);
  } catch {
    console.error(JSON.stringify({ tool: "secret-scan", error: "secretlint did not return JSON", stderr: stderr.slice(-2000), stdout: stdout.slice(-2000) }));
    process.exit(2);
  }

  const findings = [];
  for (const result of parsed ?? []) {
    for (const m of result?.messages ?? []) {
      findings.push({
        file: path.relative(ROOT, result?.filePath ?? ""),
        line: m.range?.[0]?.line ?? m.line ?? 0,
        column: m.range?.[0]?.column ?? m.column ?? 0,
        ruleId: m.ruleId ?? "",
        severity: "high",
        message: typeof m.message === "object" ? JSON.stringify(m.message) : String(m.message ?? ""),
      });
    }
  }

  const summary = { filesScanned: Array.isArray(parsed) ? parsed.length : 0, total: findings.length };
  const report = {
    tool: "secret-scan",
    generatedAt: new Date().toISOString(),
    engine: "secretlint + preset-recommend",
    summary,
    findings,
  };

  const json = JSON.stringify(report, null, 2);
  if (opts.out) {
    await mkdir(path.dirname(path.resolve(opts.out)), { recursive: true });
    await writeFile(opts.out, json, "utf8");
  }
  console.log(json);
  const hadError = status !== 0 && findings.length === 0;
  if (hadError) {
    console.error(JSON.stringify({ tool: "secret-scan", error: "secretlint exited non-zero without findings", status, stderr: stderr.slice(-2000) }));
    process.exit(2);
  }
  if (opts.strict && findings.length > 0) process.exit(1);
}

main().catch((e) => {
  console.error(e);
  process.exit(2);
});

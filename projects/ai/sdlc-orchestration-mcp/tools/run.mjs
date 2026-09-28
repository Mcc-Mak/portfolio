#!/usr/bin/env node
import { spawnSync } from "node:child_process";
import path from "node:path";
import process from "node:process";
import { fileURLToPath } from "node:url";

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const COMMAND_NAME = "entrepreneur-mcp";

const ADAPTERS = [
  "tools/audit.mjs",
  "tools/security-scan.mjs",
  "tools/secret-scan.mjs",
  "tools/license-check.mjs",
  "tools/compliance-check.mjs",
  "tools/sbom.mjs",
];

function parseArgs(argv) {
  const opts = { reportOnly: false, exec: false, goal: null, help: false };
  for (let i = 0; i < argv.length; i++) {
    const a = argv[i];
    if (a === "--report-only") opts.reportOnly = true;
    else if (a === "--exec") opts.exec = true;
    else if (a === "--goal") opts.goal = argv[++i] ?? null;
    else if (a === "-h" || a === "--help") opts.help = true;
  }
  return opts;
}

function spawnCmd(command, args) {
  if (process.platform === "win32") {
    return spawnSync("cmd.exe", ["/d", "/s", "/c", [command, ...args].join(" ")], { cwd: ROOT, encoding: "utf8" });
  }
  return spawnSync(command, args, { cwd: ROOT, encoding: "utf8" });
}

function pnpmVersion() {
  const res = spawnCmd("pnpm", ["--version"]);
  return res.status === 0 ? res.stdout.trim() : null;
}

function nodeVersionOk() {
  const major = Number(process.versions.node.split(".")[0]);
  return major >= 20;
}

function adapterDryRun(adapter) {
  const res = spawnSync(process.execPath, [path.join(ROOT, adapter), "--dry-run"], {
    cwd: ROOT,
    encoding: "utf8",
    timeout: 30000,
  });
  return res.status === 0;
}

async function main() {
  const opts = parseArgs(process.argv.slice(2));
  if (opts.help) {
    console.log(
      [
        "Usage: pnpm entrepreneur:run [--goal \"<project goal>\"] [--exec]",
        "       pnpm entrepreneur:report",
        "",
        "Verifies local tooling (Phase 0 step 4) and launches the MCP via OpenCode.",
        "  --exec         actually spawn `opencode run` with the MCP command",
        "  --goal         project goal passed as argument to the orchestrator",
        "  --report-only  request Phase 7 report generation from existing state",
      ].join("\n"),
    );
    process.exit(0);
  }

  const checks = [];
  const nv = process.versions.node;
  checks.push({
    id: "node>=20",
    status: nodeVersionOk() ? "pass" : "fail",
    details: `node ${nv}`,
  });

  const pv = pnpmVersion();
  checks.push({ id: "pnpm", status: pv ? "pass" : "fail", details: pv ? `pnpm ${pv}` : "pnpm not found on PATH" });

  for (const adapter of ADAPTERS) {
    checks.push({
      id: `adapter:${adapter}`,
      status: adapterDryRun(adapter) ? "pass" : "fail",
      details: "dry-run",
    });
  }

  const failed = checks.filter((c) => c.status === "fail");
  console.log(JSON.stringify({ tool: "run", mode: opts.reportOnly ? "report-only" : "full", checks, ok: failed.length === 0 }, null, 2));

  if (failed.length > 0) process.exit(1);

  const invocation = opts.reportOnly
    ? `${COMMAND_NAME} --report-only`
    : `${COMMAND_NAME}${opts.goal ? ` "${opts.goal}"` : ""}`;

  if (opts.exec) {
    const res =
      process.platform === "win32"
        ? spawnSync("cmd.exe", ["/d", "/s", "/c", `opencode run ${invocation}`], { cwd: ROOT, stdio: "inherit" })
        : spawnSync("opencode", ["run", invocation], { cwd: ROOT, stdio: "inherit" });
    process.exit(res.status ?? 1);
  }

  console.log(
    [
      "",
      "Toolchain verified. Run the MCP from an interactive OpenCode session:",
      "",
      `    ${invocation}`,
      "",
      "Or re-check later with: pnpm entrepreneur:run",
    ].join("\n"),
  );
}

main().catch((e) => {
  console.error(e);
  process.exit(2);
});

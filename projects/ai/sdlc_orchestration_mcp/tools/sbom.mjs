#!/usr/bin/env node
import { spawnSync } from "node:child_process";
import { statSync } from "node:fs";
import { mkdir, readFile, writeFile } from "node:fs/promises";
import path from "node:path";
import process from "node:process";
import { fileURLToPath } from "node:url";

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const SBOM_DIR = "docs/05_security_compliance/sbom";
const XML_REL = `${SBOM_DIR}/bom.xml`;
const MD_REL = `${SBOM_DIR}/sbom.md`;
const CYCLONEDX_PKG = "node_modules/@cyclonedx/cyclonedx-npm/package.json";

function parseArgs(argv) {
  const opts = { dryRun: false, strict: false, out: null, help: false, mdOnly: false };
  for (let i = 0; i < argv.length; i++) {
    const a = argv[i];
    if (a === "--dry-run") opts.dryRun = true;
    else if (a === "--strict") opts.strict = true;
    else if (a === "--out") opts.out = argv[++i] ?? null;
    else if (a === "--md-only") opts.mdOnly = true;
    else if (a === "-h" || a === "--help") opts.help = true;
  }
  return opts;
}

async function cyclonedxCli() {
  const { readFile: rf } = await import("node:fs/promises");
  const pkgPath = path.resolve(ROOT, CYCLONEDX_PKG);
  const pkg = JSON.parse(await rf(pkgPath, "utf8"));
  const binRel = typeof pkg.bin === "string" ? pkg.bin : pkg.bin?.["cyclonedx-npm"];
  if (!binRel) throw new Error("cyclonedx-npm bin not found in its package.json");
  return { cli: path.resolve(ROOT, "node_modules/@cyclonedx/cyclonedx-npm", binRel), version: pkg.version };
}

function componentRegex() {
  return /<component[^>]*type="([^"]+)"[^>]*>([\s\S]*?)<\/component>/g;
}

function pickTag(block, tag) {
  const m = block.match(new RegExp(`<${tag}>([\\s\\S]*?)</${tag}>`));
  return m ? m[1].trim() : "";
}

async function generateMarkdown(xmlAbs) {
  const xml = await readFile(xmlAbs, "utf8");
  const specVersionMatch = xml.match(/xmlns="http:\/\/cyclonedx\.org\/schema\/bom\/([\d.]+)"/);
  const serialMatch = xml.match(/serialNumber="([^"]+)"/);
  const timestampMatch = xml.match(/<timestamp>([^<]+)<\/timestamp>/);

  const components = [];
  let m;
  const re = componentRegex();
  while ((m = re.exec(xml)) !== null) {
    components.push({
      type: m[1],
      name: pickTag(m[2], "name"),
      version: pickTag(m[2], "version"),
      purl: pickTag(m[2], "purl"),
    });
  }
  components.sort((a, b) => a.name.localeCompare(b.name));

  const lines = [
    "# SBOM Summary (CycloneDX)",
    "",
    `- **Spec**: CycloneDX ${specVersionMatch ? specVersionMatch[1] : "unknown"}`,
    `- **Serial**: \`${serialMatch ? serialMatch[1] : "n/a"}\``,
    `- **Generated**: ${timestampMatch ? timestampMatch[1] : new Date().toISOString()}`,
    `- **Components**: ${components.length}`,
    `- **Machine-readable BOM**: [bom.xml](./bom.xml)`,
    "",
    "| Type | Name | Version |",
    "|------|------|---------|",
  ];
  for (const c of components) {
    lines.push(`| ${c.type} | ${c.name} | ${c.version} |`);
  }
  return lines.join("\n") + "\n";
}

async function main() {
  const opts = parseArgs(process.argv.slice(2));
  if (opts.help) {
    console.log(
      [
        "Usage: node tools/sbom.mjs [--dry-run] [--strict] [--md-only] [--out <file>]",
        "",
        "Generates a CycloneDX XML SBOM via @cyclonedx/cyclonedx-npm and a Markdown summary.",
        "  --md-only  regenerate sbom.md from an existing bom.xml without re-scanning",
      ].join("\n"),
    );
    process.exit(0);
  }

  const xmlAbs = opts.out ? path.resolve(opts.out) : path.resolve(ROOT, XML_REL);
  const mdAbs = path.resolve(ROOT, MD_REL);

  if (opts.dryRun) {
    console.log(
      JSON.stringify({ tool: "sbom", dryRun: true, plan: ["resolve @cyclonedx/cyclonedx-npm cli", `write ${path.relative(ROOT, xmlAbs)}`, `write ${path.relative(ROOT, mdAbs)}`, "npm-ls noise tolerated via --ignore-npm-errors"] }, null, 2),
    );
    process.exit(0);
  }

  await mkdir(path.dirname(xmlAbs), { recursive: true });

  let engineVersion = null;
  if (!opts.mdOnly) {
    const { cli, version } = await cyclonedxCli();
    engineVersion = version;
    const env = {};
    for (const [k, v] of Object.entries(process.env)) {
      if (/^npm_config_/i.test(k)) continue;
      if (/^npm_(execpath|node_execpath|command)$/i.test(k)) continue;
      if (/^PNPM_/i.test(k) || k === "INIT_CWD") continue;
      env[k] = v;
    }
    const res = spawnSync(process.execPath, [cli, "--ignore-npm-errors", "--output-format", "XML", "--output-file", xmlAbs], {
      cwd: ROOT,
      encoding: "utf8",
      maxBuffer: 64 * 1024 * 1024,
      env,
    });
    if (res.status !== 0 || !xmlExistsSafe(xmlAbs)) {
      console.error(JSON.stringify({ tool: "sbom", error: "cyclonedx-npm failed", status: res.status, stderr: (res.stderr ?? "").slice(-2000) }));
      process.exit(2);
    }
  }

  const md = await generateMarkdown(xmlAbs);
  await mkdir(path.dirname(mdAbs), { recursive: true });
  await writeFile(mdAbs, md, "utf8");

  const report = {
    tool: "sbom",
    generatedAt: new Date().toISOString(),
    engine: "@cyclonedx/cyclonedx-npm",
    engineVersion,
    outputs: {
      xml: path.relative(ROOT, xmlAbs),
      markdown: path.relative(ROOT, mdAbs),
    },
    summary: { components: Number((md.match(/\*\*Components\*\*: (\d+)/) ?? [])[1] ?? 0) },
  };
  console.log(JSON.stringify(report, null, 2));
  if (opts.strict && report.summary.components === 0) process.exit(1);
}

function xmlExistsSafe(p) {
  try {
    return statSync(p).size > 0;
  } catch {
    return false;
  }
}

main().catch((e) => {
  console.error(e);
  process.exit(2);
});

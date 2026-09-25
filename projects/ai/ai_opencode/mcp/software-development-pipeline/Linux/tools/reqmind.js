#!/usr/bin/env node
/* eslint-disable security/detect-object-injection, security/detect-non-literal-fs-filename -- CLI arg parsing and user-supplied paths are inherently dynamic; inputs are validated before use */
// ================================================================
// reqmind - Requirements Mind CLI (local implementation)
// Produces an srs.md skeleton from an idea/feature input file.
//   reqmind generate -i ./specs/idea.md -o ./specs/srs.md
// ================================================================

const fs = require("fs");
const path = require("path");

function parseFlags(argv) {
  const flags = { input: null, output: null };
  for (let i = 0; i < argv.length; i++) {
    if (argv[i] === "-i" || argv[i] === "--input") flags.input = argv[++i];
    else if (argv[i] === "-o" || argv[i] === "--output") flags.output = argv[++i];
  }
  return flags;
}

function buildSRS(feature, rawIdea) {
  const d = new Date().toISOString().slice(0, 10);
  return `# Software Requirements Specification - ${feature}

**Status**: Draft
**Date**: ${d}
**Tool**: reqmind (Requirements Mind CLI)

## 1. Introduction
### 1.1 Purpose
This document defines the software requirements for ${feature}.

### 1.2 Scope
Derived from: \`specs/idea.md\`.

### 1.3 Source Idea
${rawIdea}

## 2. Overall Description
- **Users**: (to be detailed)
- **Environment**: (to be detailed)

## 3. Functional Requirements
- FR-001: (to be detailed)

## 4. Non-Functional Requirements
- NFR-001: Security - OWASP-compliant (R8/R9)
- NFR-002: Performance - (to be detailed)

## 5. Constraints
- (to be detailed)

## 6. Traceability
| Requirement ID | Source Idea | Status |
| :--- | :--- | :--- |
| FR-001 | (idea) | TBD |
`;
}

module.exports = { buildSRS };

// CLI entry point - only runs when executed directly (node tools/reqmind.js).
// NOTE: opencode auto-imports every .js file in the global ~/.config/opencode/tools/
// directory as a custom tool module. Running CLI logic at import time would execute
// process.exit() inside the opencode process and crash it. Guarding with
// require.main === module keeps the import side-effect-free while preserving the CLI.
if (require.main === module) {
  const args = process.argv.slice(2);
  const command = args[0];
  if (command === "generate") {
    const flags = parseFlags(args.slice(1));
    if (!flags.input || !flags.output) {
      console.error("Usage: reqmind generate -i <input.md> -o <output.md>");
      process.exit(1);
    }
    if (!fs.existsSync(flags.input)) {
      console.error(`[FAIL] Input not found: ${flags.input}`);
      process.exit(1);
    }
    const raw = fs.readFileSync(flags.input, "utf8");
    const firstLine = raw.split("\n").map((l) => l.trim()).find((l) => l && !l.startsWith("#")) || "Idea";
    const feature = (firstLine || "Untitled Feature").slice(0, 80);
    fs.mkdirSync(path.dirname(path.resolve(flags.output)), { recursive: true });
    fs.writeFileSync(flags.output, buildSRS(feature, raw), "utf8");
    console.log(`[OK] SRS generated: ${flags.output}`);
    process.exit(0);
  }
  if (command === "--version" || command === "-v") {
    console.log("reqmind 1.0.0 (local Requirements Mind CLI)");
    process.exit(0);
  }
  console.error("Usage: reqmind generate -i <input.md> -o <output.md>");
  process.exit(1);
}

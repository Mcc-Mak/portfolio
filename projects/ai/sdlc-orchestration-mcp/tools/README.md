# tools/ — Local security & compliance tool adapters

All adapters are ESM (`node ≥ 20`), stdlib-first, free and local-first. Every adapter supports:

- `--dry-run` — print planned actions without executing
- `--strict` — non-zero exit when gate-relevant findings exist
- `--out <file>` — additionally write the JSON report to a file

| Adapter | Purpose | Engine |
|---------|---------|--------|
| `audit.mjs` | Dependency vulnerability audit | `pnpm audit --json` + in-repo normalizer |
| `security-scan.mjs` | Static application security scanning | ESLint flat config + `eslint-plugin-security` |
| `secret-scan.mjs` | Secret detection | `secretlint` + preset-recommend |
| `license-check.mjs` | License risk classification | `license-checker` |
| `compliance-check.mjs` | GDPR/SOC2 doc completeness + SSOT linkage | stdlib document validator |
| `sbom.mjs` | CycloneDX SBOM (XML + Markdown summary) | `@cyclonedx/cyclonedx-npm` CLI |

Supporting configs live at the repo root: `eslint.config.js`, `.secretlintrc.json`.

`run.mjs` backs the mandated scripts `pnpm entrepreneur:run` / `pnpm entrepreneur:report`
and performs Phase 0 step-4 tooling verification (pnpm presence + every adapter dry-run).
It is an addition to the six mandated adapters, required to make those scripts executable.

## Deviations from PROMPT-V100.2.0.md (justified)

1. **`npm-audit-json`** — named by the spec for `audit.mjs`, but **not published on the npm
   registry** (404 verified against registry.npmjs.org). Replaced by an in-repo normalizer
   that parses `pnpm audit --json` output directly (stdlib only). Rationale: keeps the
   dependency audit local, free and JS-native; no equivalent parser package exists.
2. **No non-JS CLI tools are used** (e.g., `gitleaks` was rejected in favor of `secretlint`,
   which the spec lists as an acceptable JS-native option), so no further CLI justification
   is required under the hard constraints.
3. **`@cyclonedx/cyclonedx-npm` is invoked through its stable CLI** (it exposes no public
   programmatic API in v6) with `--ignore-npm-errors`, because `npm ls` reports spurious
   errors on pnpm's virtual-store layout. The generated CycloneDX XML is valid and complete;
   `sbom.mjs` renders `sbom.md` from it.

## Exit codes

- `0` — success (or clean dry-run)
- `1` — findings violated a `--strict` threshold
- `2` — execution/parse failure of the underlying engine

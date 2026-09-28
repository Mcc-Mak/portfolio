# TUI Modules — question bank (generated Phase 0)

Five mandatory modules, ≥10 questions each. The Orchestrator asks these verbatim during
Phase 1 (adaptations must be justified and recorded). Raw Q&A is captured to
`docs/00_requirements/ssot_raw_answers.json`.

## Module 1 — Requirements & Business (facilitator: pm-001)

1. What is the primary job-to-be-done when you reach for this tool?
2. Who is the target user (self, team, npm public)?
3. Which Markdown table dialects must be supported (GFM pipes, aligned columns, escaped pipes, inline code containing pipes)?
4. Must conversion be lossless for cells containing commas, quotes, or newlines?
5. Is stdin→stdout streaming required, or file arguments only, or both?
6. What output dialects are needed (RFC 4180 CRLF vs LF, semicolon-separated)?
7. Should multiple tables in one document be converted (all? first only? selectable)?
8. Are HTML tables inside Markdown in scope for v1?
9. What is the acceptance criterion for "correct" conversion on your own real documents?
10. Any hard deadline or scope cut that defines the MVP boundary?
11. What would make you delete this tool from your workflow (top failure mode)?

## Module 2 — Error/Validation (facilitator: pm-001; consumer: qa-001)

1. What should happen when a Markdown file contains no tables at all?
2. What is the desired behaviour for malformed tables (ragged row lengths)?
3. How should escaped pipes (`\|`) inside cells be handled and validated?
4. What exit codes do you expect: success / no-tables / parse-error / usage-error?
5. Should errors go to stderr with the line number of the offending table?
6. What happens with empty header rows — reject, synthesise names, or allow?
7. How should BOM-prefixed input be treated?
8. What is the rule for very wide/long tables — any limits we must enforce or document?
9. Do you need a `--strict` mode where any anomaly aborts with non-zero exit?
10. What validation error message wording helps you fix input fastest?
11. Which of these behaviours map to automated test fixtures you consider mandatory?

## Module 3 — Infrastructure & SLO (facilitator: ops-001)

1. Which Node.js versions must be supported (floor and ceiling)?
2. Is cross-platform parity required (Windows/macOS/Linux) from day one?
3. Maximum acceptable startup+conversion time for a 10 MB table file?
4. Memory ceiling expectations — stream or load-whole-file?
5. Distribution channel: pnpm/npx execution only, or also standalone binaries?
6. What SLO defines "usable release" (install success rate? zero-crash conversions?)
7. Any CI constraints — fully local scripts acceptable, or must a hosted runner be assumed later?
8. Logging/verbosity preferences (`--verbose`, `--quiet`, silent by default)?
9. Telemetry: confirm none (local-first) — is that a hard requirement?
10. Update/distribution policy — pinned versions, latest, or lockfile-driven?
11. Uninstall/clean-exit requirements worth documenting?

## Module 4 — Security (owner: sec-001)

1. Confirm the tool performs no network I/O ever — hard requirement?
2. Input is untrusted by definition: what ReDoS/DoS protections must the parser have?
3. Path handling: which rules prevent writing outside the user-intended output path?
4. Should `--out` refuse to overwrite existing files unless flagged?
5. Are shell-invocation surfaces (spawn/exec) permitted anywhere in the codebase?
6. Dependency policy: zero runtime deps — acceptable and enforceable via license/audit gates?
7. What secret-scanning findings class is an automatic block vs reviewable?
8. Supply-chain: are pnpm lockfile diffs reviewed before every dependency change?
9. Which severity levels require a written risk assessment before gate G4 passes?
10. Is running arbitrary "plugins/filters" in scope (if yes, sandboxing rules needed)?

## Module 5 — GDPR/SOC2 (owner: sec-001)

1. Does the tool ever process personal data in your intended use cases?
2. If yes incidentally (user files may contain PII): what retention/logging rules apply to converted output?
3. Any SOC2 trust-services criteria you must honour because this runs inside a controlled environment?
4. Availability expectations for a local CLI — does SOC2 availability even apply here?
5. Confidentiality: any contractual bar on converting confidential documents through this tool?
6. Processing integrity: what evidence would satisfy you that conversions are deterministic?
7. Privacy by design: should the tool avoid writing temp files containing raw input where feasible?
8. Audit trail needs: is stdout-only logging sufficient for your compliance posture?
9. Data residency: any jurisdictional constraint worth documenting (local processing = trivially satisfied)?
10. What compliance documentation would make this tool acceptable in your most regulated client context?

# API Reference

**Version**: 1.0.0 | **Class**: 5 (Ops/User) | **Generated**: doc-generation skill (R3)

This reference documents the public interfaces of the CMMI Level 4 OpenCode
DevSecOps Pipeline: the pipeline CLI, analytics scripts, the `src/` secure
primitives, and the data model. Content matches the actual exports in `src/`,
`scripts/`, and `package.json`.

## 1. Pipeline CLI (npm scripts)

| Script | Command | Behavior |
| :--- | :--- | :--- |
| `pipeline` | `npm run pipeline` | Full 4-phase run with all gates |
| `pipeline:skipdocs` | `npm run pipeline:skipdocs` | Phases 1-3 (skip documentation) |
| `pipeline:skipsecurity` | `npm run pipeline:skipsecurity` | Phases 1, 2, 4 (skip gates) |
| `collect-metrics` | `npm run collect-metrics` | C4-2: insert one build record |
| `spc` | `npm run spc` | C4-3: generate SPC report |
| `predict` | `npm run predict` | C4-4/5: readiness forecast + remediation |
| `lint` | `npm run lint` | SAST gate (ESLint) |
| `test` | `npm run test` | Jest unit tests with coverage |
| `audit` | `npm run audit` | SCA gate (`npm audit --audit-level=high`) |
| `reqmind` | `npm run reqmind -- generate -i <in> -o <out>` | Requirements SRS generator |

### PowerShell flags (`scripts/opencode-pipeline.ps1`)

| Flag | Type | Effect |
| :--- | :--- | :--- |
| `-SkipDocs` | switch | Skip Phase 4 (Documentation) |
| `-SkipSecurity` | switch | Skip Phase 3 gates (R7-R10) |

The orchestrator enforces Phase 1 -> Phase 2 -> Phase 3 -> Phase 4 order (W1).
Every phase and gate writes an audit entry to `logs/audit.log` (R11) and a gate
failure exits non-zero and blocks the build (R10).

## 2. reqmind CLI (`tools/reqmind.js`)

Global bin: `reqmind` (via `bin` field in `package.json`)

**Import-safety (C4-6):** this file is deployed to
`~/.config/opencode/tools/`, where opencode auto-imports every `.js` as a
custom tool module in-process. The CLI logic is therefore guarded by
`require.main === module` so that importing the module is side-effect-free
and cannot crash opencode. Keep this guard whenever editing the file.

```text
reqmind generate -i <input.md> -o <output.md>
```

| Argument | Required | Description |
| :--- | :--- | :--- |
| `-i, --input` | yes | Source idea/context markdown |
| `-o, --output` | yes | Destination for the generated SRS skeleton |

Exit code `0` on success; `1` on invalid arguments.

## 3. `src/` secure primitives

All modules are CommonJS and throw typed errors (`TypeError`, `RangeError`,
`SyntaxError`) on invalid input. They are covered by Jest tests in
`__tests__/`.

### `src/metrics.js` (C4-1)

| Export | Signature | Description |
| :--- | :--- | :--- |
| `DENSITY_GOAL` | `number` | Target defect density = `0.5` |
| `defectDensity` | `(critical: number, high: number, loc: number) => number` | `(critical + high) / (loc / 1000)`; throws `RangeError` on invalid input |
| `meetsDefectDensityGoal` | `(density: number) => boolean` | `density <= DENSITY_GOAL`; throws `RangeError` on negative/non-finite |

### `src/spc.js` (C4-3)

| Export | Signature | Description |
| :--- | :--- | :--- |
| `mean` | `(values: number[]) => number` | Arithmetic mean; throws `RangeError` for empty/non-finite arrays |
| `sampleStandardDeviation` | `(values: number[]) => number` | Sample std dev (n-1); needs >= 2 values |
| `controlLimits` | `(values: number[], sigma?: number = 3) => {mean, stdev, ucl, lcl}` | `ucl = mean + sigma*stdev`, `lcl = max(0, mean - sigma*stdev)` |
| `isOutOfControl` | `(value: number, limits: {ucl: number}) => boolean` | `value > limits.ucl` |

### `src/auth.js`

| Export | Signature | Description |
| :--- | :--- | :--- |
| `PBKDF2_ITERATIONS` | `number` | `210000` default iteration count |
| `MAX_PASSWORD_LENGTH` | `number` | `1024` |
| `hashPassword` | `(password: string) => string` | Returns `<iterations>:<saltHex>:<hashHex>` |
| `verifyPassword` | `(password: string, stored: string) => boolean` | Constant-time verification via `timingSafeEqual` |

### `src/access.js`

| Export | Signature | Description |
| :--- | :--- | :--- |
| `VALID_ROLES` | `Set<string>` | `admin`, `developer`, `viewer` |
| `validateRoles` | `(roles: string[]) => string[]` | Throws `TypeError`/`RangeError` on unknown roles |
| `hasRole` | `(roles: string[], required: string) => boolean` | True when `required` is present in `roles` |
| `assertRole` | `(roles: string[], required: string) => true` | Throws `Error` when the role is missing |
| `isOwner` | `(userId: string, ownerId: string) => boolean` | String equality check |

### `src/validate.js`

| Export | Signature | Description |
| :--- | :--- | :--- |
| `MAX_INPUT_LENGTH` | `number` | `1024` |
| `sanitizeString` | `(input: string) => string` | Strips control chars, trims, truncates |
| `isValidEmail` | `(input: string) => boolean` | Basic email pattern check |
| `isSafeRelativePath` | `(input: string) => boolean` | Rejects `..`, absolute paths, null bytes, drive letters |

### `src/sql.js`

| Export | Signature | Description |
| :--- | :--- | :--- |
| `MAX_PLACEHOLDERS` | `number` | `999` |
| `validateIdentifier` | `(identifier: string) => string` | Allows only `[A-Za-z_][A-Za-z0-9_]*` |
| `buildPlaceholders` | `(count: number) => string` | Comma-joined `?` placeholders |
| `validateParams` | `(params: any[], expectedCount: number) => any[]` | Enforces parameter count match |
| `escapeLike` | `(input: string) => string` | Escapes `\`, `%`, `_` for LIKE patterns |

### `src/url.js`

| Export | Signature | Description |
| :--- | :--- | :--- |
| `ALLOWED_PROTOCOLS` | `Set<string>` | `http:`, `https:` |
| `parseSafeUrl` | `(raw: string) => URL` | Requires http/https, no embedded credentials |
| `isSafeUrl` | `(raw: string) => boolean` | False for loopback/private/IPv4-private hosts |
| `assertSafeUrl` | `(raw: string) => string` | Throws `RangeError` for private/restricted hosts |

### `src/command.js`

| Export | Signature | Description |
| :--- | :--- | :--- |
| `MAX_ARG_LENGTH` | `number` | `1024` |
| `assertSafeCommand` | `(command: string) => string` | Single binary name only (`[A-Za-z0-9_.-]+`) |
| `assertSafeArg` | `(arg: string) => string` | Length + null-byte checks |
| `assertSafeShellArg` | `(arg: string) => string` | Rejects shell metacharacters |
| `buildSpawnArgs` | `(command: string, args: string[]) => [string, string[]]` | Safe `spawn` arg construction |

### `src/http.js`

| Export | Signature | Description |
| :--- | :--- | :--- |
| `DEFAULT_SECURITY_HEADERS` | `Readonly<object>` | nosniff, DENY, CSP, Referrer-Policy, HSTS |
| `MAX_HEADER_VALUE_LENGTH` | `number` | `512` |
| `sanitizeHeaderValue` | `(value: string) => string` | Strips CR/LF/NUL, truncates |
| `buildSecurityHeaders` | `(extra?: object) => object` | Merges extra headers over defaults |
| `safeJsonParse` | `(text: string) => any` | Limits size (1 MiB)/depth (16), blocks `__proto__`/`constructor`/`prototype` |

### `src/cookie.js`

| Export | Signature | Description |
| :--- | :--- | :--- |
| `sanitizeCookieValue` | `(value: string) => string` | Rejects non-cookie-octet chars; length 1..4096 |
| `buildSetCookie` | `(name: string, value: string, options?: {httpOnly?, secure?, sameSite?, path?, maxAge?}) => string` | RFC-6265 `Set-Cookie` string |

### `src/rate.js`

| Export | Signature | Description |
| :--- | :--- | :--- |
| `createRateLimiter` | `(options?: {windowMs?: number = 60000, max?: number = 100}) => {check, reset, prune}` | Fixed-window limiter |

`check(key, now?)` returns `{allowed, remaining, resetAt}`. `reset(key)`
clears a bucket; `prune(now?)` removes expired buckets and returns the count
removed.

### `src/secrets.js`

| Export | Signature | Description |
| :--- | :--- | :--- |
| `REDACTED` | `string` | `[REDACTED]` |
| `scanForSecrets` | `(text: string) => Array<{key, matched, index}>` | Finds password/api-key/token/secret assignments |
| `redact` | `(text: string) => string` | Replaces secret matches with `REDACTED` |

### `src/audit.js` (R11)

| Export | Signature | Description |
| :--- | :--- | :--- |
| `formatAuditLine` | `(phase: string, status: string, message: string, meta?: any) => string` | JSON line with ISO timestamp; redacts secrets |

Example:

```js
const { formatAuditLine } = require('../src/audit');
console.log(formatAuditLine('Phase 3', 'PASSED', 'SAST gate', { files: 7 }));
// {"ts":"2026-08-08T00:00:00.000Z","phase":"Phase 3","status":"PASSED","message":"SAST gate","meta":"{\"files\":7}"}
```

## 4. Analytics scripts

### `scripts/collect-metrics.js` (C4-2)
- **Input**: `metrics/security-scan.json` (npm audit JSON)
- **Output**: inserts a row into `metrics/metrics.db` (`builds` table)
- **Exit**: `0` success, `1` failure

### `scripts/spc-control.js` (C4-3)
- **Input**: `metrics/metrics.db`
- **Output**: `metrics/spc-report.md`; exit `1` + BLOCK when defect density > UCL
- Requires at least 5 builds to compute control limits (baseline otherwise)

### `scripts/predict-readiness.js` (C4-4/5)
- **Input**: `metrics/metrics.db`
- **Output**: readiness forecast; auto-generates remediation plan when prediction
  exceeds the goal (C4-5). Requires at least 10 builds for reliable prediction

## 5. Skills (R4/R13)

| Skill | Artifacts |
| :--- | :--- |
| `requirement-gathering` | `specs/PRD.md`, `specs/SRS.md`, `specs/User-Stories.md`, `specs/Technical-Design.md` |
| `secure-coding` | `src/*.js`, `__tests__/*.spec.js` |
| `doc-generation` | `docs/architecture.md`, `docs/API-Reference.md`, `docs/Setup-Guide.md`, `docs/wiki/*`, `README.md` |
| `cmmi-analytics` | `metrics/metrics.db`, `metrics/spc-report.md`, `logs/audit.log` |

## 6. Data model

### `metrics/metrics.db` — table `builds`

| Column | Type | Description |
| :--- | :--- | :--- |
| `id` | INTEGER PK AUTOINCREMENT | Build id |
| `timestamp` | TEXT | Completion time (ISO 8601) |
| `loc` | INTEGER | Lines changed (git diff; defaults to 100) |
| `critical_vulns` | INTEGER | Critical vulnerabilities (npm audit) |
| `high_vulns` | INTEGER | High vulnerabilities (npm audit) |
| `defect_density` | REAL | `(critical + high) / (loc / 1000)` |

### `logs/audit.log` (R11)

The orchestrator appends `timestamp | phase | status` per phase/gate;
`src/audit.js` emits structured JSON lines.

### `metrics/security-scan.json`

UTF-8 (no BOM) npm audit JSON, written by the Phase 3 SCA gate.

## 7. Exit codes

| Code | Meaning |
| :--- | :--- |
| `0` | Success |
| `1` | Gate failure, blocked merge (R10), or script error |

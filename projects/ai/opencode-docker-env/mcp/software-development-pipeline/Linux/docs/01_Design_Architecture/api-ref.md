# API Reference

**Version**: 1.0.0 | **Class**: 2 (Technical Design) | **Generated**: doc-generation skill (R3)

This reference documents the public interfaces of the CMMI Level 4 OpenCode
DevSecOps Pipeline: the pipeline CLI, analytics scripts, the `src/` secure
primitives, and the data model. Content matches the actual exports in `src/`,
`scripts/`, and `package.json`.

## 1. Pipeline CLI (npm scripts)

| Script | Command | Behavior |
| :--- | :--- | :--- |
| `pipeline` | `npm run pipeline` | Full 5-phase run with all gates |
| `pipeline:no-docgen` | `npm run pipeline:no-docgen` | Skip Phase 4 (documentation) |
| `pipeline:no-gates` | `npm run pipeline:no-gates` | Skip Phase 3 (all 10 gates) |
| `pipeline:sops` | `npm run pipeline:sops` | Generate SOPs only (no phases) |
| `collect-metrics` | `npm run collect-metrics` | C4-2: insert one build record |
| `dast` | `npm run dast` | R19: run DAST scan (OWASP ZAP) |
| `spc` | `npm run spc` | C4-3: generate SPC report |
| `predict` | `npm run predict` | C4-4/5: readiness forecast + remediation |
| `rtm` | `npm run rtm` | R20: generate docs/00_Planning_Requirements/rtm.md |
| `lint` | `npm run lint` | SAST gate (ESLint) |
| `test` | `npm run test` | Jest unit tests with coverage |
| `audit` | `npm run audit` | SCA gate (`npm audit --audit-level=high`) |
| `reqmind` | `npm run reqmind -- generate -i <in> -o <out>` | Requirements SRS generator |
| `deploy` | `npm run deploy` | R14: sync resources to `~/.config/opencode/` |

### Bash flags (`scripts/opencode-pipeline.sh`)

| Flag | Type | Effect |
| :--- | :--- | :--- |
| `<path>` | positional | Project directory to operate on (default: current dir) |
| `-ProjectDir <path>` | arg | Same as positional `<path>` |
| `--no-docgen` | switch | Skip Phase 4 (Documentation matrix) |
| `--no-gates` | switch | Skip Phase 3 (all DevSecOps gates) |
| `--sops` | switch | Generate SOPs only (`docs/04_Operations_Maintenance/SOP/`) |

Deprecated aliases (still work, print a warning):
`-SkipDocs` = `--no-docgen`, `-SkipSecurity` = `--no-gates`,
`-GenSOP` = `--sops`.

The orchestrator enforces Phase 1 -> Phase 2 -> Phase 3 -> Phase 4 -> Phase 5
order (W1). Every phase and gate writes an audit entry to `logs/audit.log`
(R11); a gate failure exits non-zero and blocks the build (R10).

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

### `src/session.js`

| Export | Signature | Description |
| :--- | :--- | :--- |
| `TOKEN_BYTES` | `number` | Random bytes per session token |
| `TOKEN_LENGTH` | `number` | Hex token length |
| `MAX_SESSION_AGE_MS` | `number` | Default TTL (ms) |
| `generateSessionToken` | `() => string` | Opaque random hex token |
| `hashSessionToken` | `(token: string) => string` | SHA-256 digest for storage |
| `isValidSessionToken` | `(token: string) => boolean` | Hex-shape + length check |
| `compareSessionTokens` | `(a: string, b: string) => boolean` | Constant-time compare |
| `isSessionExpired` | `(createdAt: number, ageMs: number) => boolean` | TTL evaluation |

### `src/token.js`

| Export | Signature | Description |
| :--- | :--- | :--- |
| `DEFAULT_BYTES` | `number` | Default random-token size (32) |
| `MIN_BYTES` | `number` | `16` |
| `MAX_BYTES` | `number` | `1024` |
| `generateToken` | `(bytes?: number = 32) => string` | Crypto-random hex token |
| `isValidToken` | `(token: string, bytes?: number) => boolean` | Length/shape check |
| `safeEqual` | `(a: string, b: string) => boolean` | Constant-time comparison |

### `src/totp.js`

| Export | Signature | Description |
| :--- | :--- | :--- |
| `DEFAULT_PERIOD` | `number` | `30` seconds |
| `DEFAULT_DIGITS` | `number` | `6` |
| `MAX_DIGITS` | `number` | `8` |
| `DEFAULT_SKEW` | `number` | Allowed time-step skew |
| `MAX_SECRET_LENGTH` | `number` | Base32 secret limit |
| `BASE32_ALPHABET` | `string` | RFC-4648 base32 alphabet |
| `validateSecret` | `(secret: string) => string` | Base32 alphabet validation |
| `base32Decode` | `(secret: string) => Buffer` | RFC-4648 decode |
| `generateCode` | `(secret: string, when?: Date) => string` | Current TOTP code |
| `generateCodeAt` | `(secret: string, at: number) => string` | Code at a given epoch |
| `generateWindow` | `(secret: string, when?: Date, skew?: number) => string[]` | Codes for skew window |
| `verifyCode` | `(secret: string, code: string, when?: Date, skew?: number) => boolean` | Constant-time verify across window |
| `generateSecret` | `(bytes?: number) => string` | Random base32 secret |

### `src/password.js`

| Export | Signature | Description |
| :--- | :--- | :--- |
| `MIN_LENGTH` | `number` | Minimum password length |
| `MAX_LENGTH` | `number` | Maximum password length |
| `MIN_ENTROPY` | `number` | Minimum acceptable entropy (bits) |
| `COMMON_PASSWORDS` | `Set<string>` | Known-weak password list |
| `estimateEntropy` | `(password: string) => number` | Shannon entropy approximation |
| `assessPassword` | `(password: string) => {score, entropy, reasons}` | Policy assessment |
| `assertStrongPassword` | `(password: string) => string` | Throws `RangeError` if weak |

### `src/csrf.js`

| Export | Signature | Description |
| :--- | :--- | :--- |
| `TOKEN_BYTES` | `number` | CSRF token size (32) |
| `SECRET_MIN_BYTES` | `number` | Minimum HMAC secret size |
| `generateCsrfToken` | `(secret: string) => string` | HMAC-signed random token |
| `verifyCsrfToken` | `(secret: string, token: string) => boolean` | Constant-time HMAC verify |

### `src/jwt.js`

| Export | Signature | Description |
| :--- | :--- | :--- |
| `SUPPORTED_ALGORITHMS` | `Set<string>` | `HS256`, `HS384`, `HS512` |
| `DEFAULT_ALGORITHM` | `string` | `HS256` |
| `MAX_TOKEN_LENGTH` | `number` | `8192` |
| `MAX_CLAIMS_LENGTH` | `number` | `4096` |
| `MAX_CLAIMS_DEPTH` | `number` | `16` |
| `b64urlEncode` | `(input: string) => string` | Base64url (RFC 4648 §5) encode |
| `b64urlDecode` | `(input: string) => Buffer` | Base64url decode; throws `RangeError` on bad shape |
| `createToken` | `(claims: object, secret: string) => string` | Sign a JWT; adds `iat`; secret >= 16 chars |
| `verifyToken` | `(token: string, secret: string) => object` | Verifies signature + algorithm; returns payload |
| `hasExpired` | `(payload: object, now?: number) => boolean` | `current >= exp` when `exp` present |

Example:

```js
const { createToken, verifyToken, hasExpired } = require('../src/jwt');
const token = createToken({ sub: 'user-1', role: 'admin' }, 'a-secret-that-is-16+');
const payload = verifyToken(token, 'a-secret-that-is-16+');
// payload = { sub: 'user-1', role: 'admin', iat: <unix-seconds> }
```

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

### `src/xml.js`

| Export | Signature | Description |
| :--- | :--- | :--- |
| `MAX_XML_LENGTH` | `number` | Max accepted XML document size |
| `hasUnsafeXmlConstructs` | `(input: string) => boolean` | Detects `<!DOCTYPE>`, `<!ENTITY>`, external entities (XXE) |
| `assertSafeXml` | `(input: string) => string` | Throws `SyntaxError` when unsafe constructs present |

### `src/upload.js`

| Export | Signature | Description |
| :--- | :--- | :--- |
| `ALLOWED_EXTENSIONS` | `Set<string>` | Whitelisted file extensions |
| `MAX_FILE_BYTES` | `number` | Maximum upload size |
| `MAX_FILENAME_LENGTH` | `number` | Filename limit |
| `DANGEROUS_EXTENSIONS` | `Set<string>` | Executable/script extensions |
| `sanitizeFilename` | `(name: string) => string` | Basename only, control chars stripped |
| `extensionOf` | `(name: string) => string` | Lowercased extension |
| `isAllowedExtension` | `(ext: string) => boolean` | Whitelist membership |
| `isDangerousExtension` | `(ext: string) => boolean` | Blacklist membership |
| `assertAllowedUpload` | `(name: string, size: number) => true` | Throws `RangeError` on any violation |
| `validateFileBytes` | `(buf: Buffer, ext: string) => boolean` | Magic-byte verification |

### `src/mime.js`

| Export | Signature | Description |
| :--- | :--- | :--- |
| `MAGIC_SIGNATURES` | `Array<{ext, mime, bytes}>` | Magic-byte signatures table |
| `EXTENSION_TO_MIME` | `Map<string,string>` | Extension -> MIME map |
| `sniffFormat` | `(buf: Buffer) => string` | Detected extension from magic bytes |
| `isTextLike` | `(buf: Buffer) => boolean` | Heuristic text detection |
| `detectMimeType` | `(buf: Buffer) => string` | MIME from magic bytes |
| `assertExtensionMatchesContent` | `(buf: Buffer, ext: string) => boolean` | Extension/content consistency |

### `src/path.js`

| Export | Signature | Description |
| :--- | :--- | :--- |
| `MAX_PATH_LENGTH` | `number` | Path length limit |
| `assertSafeBaseDir` | `(baseDir: string) => string` | Must be absolute, no null bytes |
| `assertRelativeChild` | `(baseDir: string, candidate: string) => string` | Throws `RangeError` on traversal |
| `isInside` | `(baseDir: string, candidate: string) => boolean` | Path containment check |
| `resolveInside` | `(baseDir: string, candidate: string) => string` | Resolves and re-checks containment |
| `sanitizeRelativePath` | `(candidate: string) => string` | Rejects `..`, absolute paths, null bytes |

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

### `src/host.js`

| Export | Signature | Description |
| :--- | :--- | :--- |
| `MAX_HOST_LENGTH` | `number` | Host header length limit |
| `LOCALHOST_NAMES` | `Set<string>` | `localhost`, loopback names |
| `isAllowedHost` | `(host: string, allowed: Iterable<string>) => boolean` | Exact + case-insensitive match |
| `assertHostHeader` | `(host: string, allowed: Iterable<string>) => string` | Throws `RangeError` on missing/invalid host |

### `src/redirect.js`

| Export | Signature | Description |
| :--- | :--- | :--- |
| `MAX_REDIRECT_LENGTH` | `number` | Redirect target length limit |
| `isSafeRedirectTarget` | `(target: string) => boolean` | Relative path or same-origin only |
| `assertSafeRedirect` | `(target: string) => string` | Throws `RangeError` for unsafe targets |
| `buildLocationHeader` | `(target: string) => string` | Validates + returns `Location` value |

### `src/xss.js`

| Export | Signature | Description |
| :--- | :--- | :--- |
| `escapeHtml` | `(input: string) => string` | Escapes `& < > " '` |
| `escapeAttribute` | `(input: string) => string` | Attribute-context escaping |
| `escapeJsString` | `(input: string) => string` | JS string-literal escaping |
| `stripControlChars` | `(input: string) => string` | Removes control characters |
| `containsHtmlMarkup` | `(input: string) => boolean` | Detects `<tag ...>` patterns |

### `src/deflate.js`

| Export | Signature | Description |
| :--- | :--- | :--- |
| `DEFAULT_MAX_OUTPUT` | `number` | Max decompressed output size |
| `MAX_INPUT` | `number` | Max compressed input size |
| `MAX_RATIO` | `number` | Max decompression ratio (zip-bomb guard) |
| `safeInflate` | `(buffer: Buffer) => Buffer` | Inflate with size/ratio limits |
| `decompressJson` | `(buffer: Buffer) => any` | Inflate + `safeJsonParse` |

### `src/csp.js`

| Export | Signature | Description |
| :--- | :--- | :--- |
| `MAX_POLICY_LENGTH` | `number` | `8192` |
| `MAX_SOURCES_PER_DIRECTIVE` | `number` | `64` |
| `KEYWORDS` | `Set<string>` | `self`, `none`, `unsafe-inline`, `unsafe-eval`, `strict-dynamic`, ... |
| `ALLOWED_DIRECTIVES` | `Set<string>` | `default-src`, `script-src`, `style-src`, `frame-ancestors`, `sandbox`, ... |
| `isValidSource` | `(source: string) => boolean` | Keyword/nonce/hash/scheme/host-source check |
| `buildCsp` | `(policy: object) => string` | Renders validated CSP header; requires `default-src` |
| `addNonce` | `(policy: object, directive: string, nonce: string) => object` | Returns a copy with `nonce-<nonce>` added to a directive |

Example:

```js
const { buildCsp, addNonce } = require('../src/csp');
const policy = buildCsp({
  'default-src': "'self'",
  'script-src': ["'self'", "'strict-dynamic'"],
  'frame-ancestors': "'none'"
});
const withNonce = addNonce(policy, 'script-src', 'R0px...');
```

### `src/cors.js`

| Export | Signature | Description |
| :--- | :--- | :--- |
| `MAX_ORIGIN_LENGTH` | `number` | `2048` |
| `normalizeOrigin` | `(raw: string) => string` | Returns `scheme://host`; throws on credentials/path/query |
| `isAllowedOrigin` | `(origin: string, allowed: string[]) => boolean` | `*` or exact normalized match |
| `buildCorsHeaders` | `(origin: string, allowed: string[], options?: {credentials?, methods?, exposedHeaders?}) => object \| null` | CORS headers or `null` when disallowed |

### `src/cache.js`

| Export | Signature | Description |
| :--- | :--- | :--- |
| `SENSITIVE_CACHE_CONTROL` | `string` | `no-store, no-cache, must-revalidate` |
| `PUBLIC_CACHE_CONTROL` | `string` | `public, max-age=60` |
| `MAX_AGE_LIMIT` | `number` | `31536000` (1 year) |
| `buildCacheControl` | `(options?: {noStore?, noCache?, mustRevalidate?, private?, public?, maxAge?}) => string` | Builds a `Cache-Control` value; `no-store` wins |
| `sensitiveResponseHeader` | `() => string` | Returns the sensitive default header |
| `validateCacheDirectiveList` | `(directives: string[]) => string[]` | Validates each directive against the allowed sets |

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

### `src/log.js`

| Export | Signature | Description |
| :--- | :--- | :--- |
| `MAX_LOG_FIELD_LENGTH` | `number` | Per-field truncation limit |
| `sanitizeLogValue` | `(value: any) => string` | Stringifies + strips control chars |
| `redactSensitive` | `(text: string) => string` | Delegates to `secrets.redact` |
| `safeLogLine` | `(level: string, message: string, meta?: object) => string` | Redacted, structured single-line log |

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

### `src/encrypt.js`

| Export | Signature | Description |
| :--- | :--- | :--- |
| `ALGORITHM` | `string` | `aes-256-gcm` |
| `IV_BYTES` | `number` | `12` |
| `KEY_ENV` | `string` | Env var holding the hex key (never hardcoded) |
| `encrypt` | `(plaintext: string, key?: Buffer) => {iv, tag, data}` | AES-GCM encrypt |
| `decrypt` | `(payload: {iv, tag, data}, key?: Buffer) => string` | AES-GCM decrypt; throws on tamper |

### `src/prototype.js`

| Export | Signature | Description |
| :--- | :--- | :--- |
| `DISALLOWED_KEYS` | `Set<string>` | `__proto__`, `prototype`, `constructor` |
| `MAX_DEPTH` | `number` | Deep-operation recursion limit |
| `MAX_NODES` | `number` | Node-count guard against DoS |
| `assertSafeKey` | `(key: string) => string` | Throws `TypeError` on prototype keys |
| `safeClone` | `(input: any) => any` | Deep clone skipping `__proto__` |
| `deepMerge` | `(target: object, source: object) => object` | Safe recursive merge |
| `freezeDeep` | `(input: any) => any` | `Object.freeze` recursively |

### `src/compliance.js` (R16)

| Export | Signature | Description |
| :--- | :--- | :--- |
| `SEVERITY_ORDER` | `string[]` | Ascending severity rank |
| `BLOCK_SEVERITIES` | `Set<string>` | Severities that block the gate |
| `normalizeConfig` | `(raw: any) => object` | Validates `compliance.config.json` shape |
| `evaluateControl` | `(id: string, evidence: any, config: any) => {status}` | Single control evaluation |
| `evaluateAll` | `(evidence: any, config: any) => object` | Runs every control |
| `blockingGaps` | `(results: object) => string[]` | Missing required evidence IDs |
| `summarize` | `(results: object) => object` | Pass/fail counts per framework |
| `buildComplianceReport` | `(results: object, opts?: object) => string` | Markdown report body |

### `src/threat.js` (R17)

| Export | Signature | Description |
| :--- | :--- | :--- |
| `BLOCK_SEVERITIES` | `Set<string>` | High/Critical block |
| `normalizeSeverity` | `(s: string) => string` | Maps to `info/low/medium/high/critical` |
| `severityFromCvss` | `(score: number) => string` | CVSS -> severity |
| `cweToOwasp` | `(cweId: string) => string` | CWE -> OWASP Top 10 mapping |
| `extractCwe` | `(advisory: any) => string[]` | Pulls CWE ids from advisories |
| `parseAudit` | `(audit: any) => Array<{severity, cwe}>` | Normalizes npm audit JSON |
| `enrichWithOsv` | `(audit: any, osvRows: any[]) => any` | Merges OSV.dev rows |
| `isThreatBlocked` | `(rows: any[], config?: any) => boolean` | True when high/critical present |
| `countSeverities` | `(rows: any[]) => object` | Severity histogram |
| `buildThreatReport` | `(rows: any[], config?: any) => string` | Markdown threat report body |

### `src/dast.js` (R19)

| Export | Signature | Description |
| :--- | :--- | :--- |
| `BLOCK_SEVERITIES` | `Set<string>` | High/Critical block |
| `SEVERITY_ORDER` | `string[]` | Ascending severity rank |
| `PAID_RECOMMENDATIONS` | `string[]` | Two recommended paid on-prem engines |
| `DEFAULT_CONFIG` | `object` | `dast.config.json` defaults |
| `normalizeThreshold` | `(raw: any) => object` | Validates severity threshold config |
| `normalizeConfig` | `(raw: any) => object` | Validates full DAST config |
| `detectEngine` | `(config: any) => string` | `zap-json` / `zap-cli` / `docker` / `none` |
| `resolveTarget` | `(config: any, base: string) => string` | Target URL resolution |
| `severityFromRisk` | `(risk: string, code: string) => string` | ZAP risk -> severity |
| `parseZapJson` | `(payload: any) => Array<{risk, alert, url}>` | Normalizes ZAP JSON API output |
| `isDastBlocked` | `(findings: any[], config?: any) => boolean` | True when threshold exceeded |
| `countSeverities` | `(findings: any[]) => object` | Severity histogram |
| `buildDastReport` | `(findings: any[], config?: any) => string` | Markdown DAST report body |

### `src/notify.js` (R18)

| Export | Signature | Description |
| :--- | :--- | :--- |
| `IMPLEMENTED_CHANNELS` | `Set<string>` | `telegram` |
| `PLANNED_CHANNELS` | `Set<string>` | `slack`, `discord` |
| `validateChannel` | `(channel: string) => string` | Throws `RangeError` on unknown channel |
| `validateConfig` | `(config: any, channel: string) => object` | Env-only config validation |
| `escapeHtml` | `(text: string) => string` | Telegram Markdown escaping |
| `buildTelegramMessage` | `(text: string, opts?: object) => string` | Formatted message body |
| `sendTelegram` | `(config: any, text: string) => Promise` | POST to Telegram Bot API |

### `src/rtm.js` (R20)

| Export | Signature | Description |
| :--- | :--- | :--- |
| `SOURCE_GATE_MAP` | `Map<string,string>` | R-ID -> audit.log gate mapping |
| `parseSrsTables` | `(srsText: string) => Array<{id, description}>` | Parses SRS §6 + FR/NFR tables |
| `parseUserStoryMaps` | `(text: string) => Array<{id, story}>` | Parses `User-Stories.md` maps |
| `parseAuditLog` | `(text: string) => Array<{id, gate, status}>` | Maps R-IDs to audit.log gates |
| `verifyArtifact` | `(relPath: string) => boolean` | Checks artifact exists on disk |
| `buildMatrix` | `(rows: any[]) => Array<object>` | Joins SRS + stories + artifacts |
| `rtmGate` | `(rows: any[]) => boolean` | R10 blocking: all links resolve |
| `buildCoverageSummary` | `(rows: any[]) => object` | Coverage percentages |
| `buildRtmReport` | `(rows: any[], opts?: object) => string` | Markdown RTM report body |

### `src/backend/server.js` (demo application server)

The demo backend wires `src/` primitives to a real HTTP server. It listens on
`0.0.0.0:8080` (override with `BACKEND_PORT`), reads a bounded JSON body (64 KiB),
and applies rate limiting, XSS escaping, CSRF, session, encryption, upload, and
RBAC primitives. Exports:

| Export | Signature | Description |
| :--- | :--- | :--- |
| `HOST` | `string` | `0.0.0.0` |
| `PORT` | `number` | `Number(process.env.BACKEND_PORT) || 8080` |
| `startServer` | `(port?: number) => http.Server` | Starts the HTTP listener |
| `requestHandler` | `(req, res) => void` | Request router |
| `routeValidate` | `(req, res) => Promise<void>` | POST `/api/validate` |
| `routeCsrf` | `(req, res) => void` | GET `/api/csrf` |
| `routeSession` | `(req, res) => void` | POST `/api/session` |
| `routeEncrypt` | `(req, res) => Promise<void>` | POST `/api/encrypt` |
| `routeUpload` | `(req, res) => Promise<void>` | POST `/api/upload` |
| `routeAuth` | `(req, res) => void` | POST `/api/auth` |
| `routeIndex` | `(res) => void` | GET `/` |

Endpoints: `/` (index), `/health`, `/api/validate`, `/api/csrf`,
`/api/session`, `/api/encrypt`, `/api/upload`, `/api/auth`.

## 4. Analytics scripts

### `scripts/collect-metrics.js` (C4-2)
- **Input**: `metrics/security-scan.json` (npm audit JSON) + `metrics/dast-zap.json` (R19)
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

### `scripts/compliance-check.js` (R16)
- **Input**: `metrics/compliance-evidence.json` + `scripts/compliance.config.json`
- **Output**: `metrics/compliance-report.md`; exit `1` on missing evidence

### `scripts/threat-model.js` (R17)
- **Input**: `metrics/security-scan.json` + OSV.dev lookup
- **Output**: `metrics/threat-model.md`; exit `1` on high/critical CVE

### `scripts/dast-scan.js` (R19)
- **Input**: `scripts/dast.config.json`, target from config
- **Output**: `metrics/dast-report.md` (+ `metrics/dast-zap.json`); warn+block if no free engine

### `scripts/generate-rtm.js` (R20)
- **Input**: `docs/00_Planning_Requirements/srs.md`, `stories.md`, `logs/audit.log`, artifacts on disk
- **Output**: `docs/00_Planning_Requirements/rtm.md` (canonical) + `specs/rtm.md` (mirror); exit `1` (R10) on broken links

## 5. Skills (R4/R13)

| Skill | Artifacts |
| :--- | :--- |
| `requirement-gathering` | `docs/00_Planning_Requirements/prd.md`, `srs.md`, `stories.md`, `docs/01_Design_Architecture/tech-design.md` |
| `secure-coding` | `src/*.js`, `__tests__/*.spec.js` |
| `doc-generation` | `docs/`, `docs/toctree.md`, `README.md` |
| `cmmi-analytics` | `metrics/metrics.db`, `metrics/spc-report.md`, `logs/audit.log` |

## 6. Data model

### `metrics/metrics.db` — table `builds`

| Column | Type | Description |
| :--- | :--- | :--- |
| `id` | INTEGER PK AUTOINCREMENT | Build id |
| `timestamp` | TEXT | Completion time (ISO 8601) |
| `loc` | INTEGER | Lines changed (git diff; defaults to 100) |
| `critical_vulns` | INTEGER | Critical vulnerabilities (npm audit + DAST) |
| `high_vulns` | INTEGER | High vulnerabilities (npm audit + DAST) |
| `defect_density` | REAL | `(critical + high) / (loc / 1000)` |

### `logs/audit.log` (R11)

The orchestrator appends `timestamp | phase | status` per phase/gate;
`src/audit.js` emits structured JSON lines.

### `metrics/security-scan.json`

UTF-8 (no BOM) npm audit JSON, written by the Phase 3 SCA gate.

### `metrics/dast-zap.json`

OWASP ZAP results (JSON API `alerts[]` or classic `site[].alerts[]`), folded
into `defect_density` by `collect-metrics.js` (R19).

## 7. Exit codes

| Code | Meaning |
| :--- | :--- |
| `0` | Success |
| `1` | Gate failure, blocked merge (R10/R20), or script error |

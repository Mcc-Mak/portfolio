# Error Codes Reference

**Class**: 5 (Ops/User) | **Persona**: Developer + Operator

This reference catalogs every error code the CMMI Level 4 pipeline and its
`src/` secure-coding layer can emit. Use it to interpret API responses,
`logs/audit.log` lines (R11), and gate failures. For step-by-step diagnosis of
a failing run, see the
[Troubleshooting Guide](../04_Operations_Maintenance/tshoot-guide.md).

## Table of Contents

1. [Error Handling Philosophy](#1-error-handling-philosophy)
2. [Error Code Format](#2-error-code-format)
3. [Error Code Reference Table](#3-error-code-reference-table)
4. [Error Response Format](#4-error-response-format)
5. [Handling Best Practices](#5-handling-best-practices)
6. [Mapping to Audit Log Lines](#6-mapping-to-audit-log-lines)

---

## 1. Error Handling Philosophy

The `src/` layer follows three rules, aligned with OWASP and the secure-coding
skill (R2/R8):

1. **Fail fast, fail typed.** Invalid input throws a standard JavaScript typed
   error (`TypeError`, `RangeError`, `SyntaxError`) at the trust boundary —
   never deep inside business logic.
2. **Never leak internals.** Error messages returned to callers reveal only the
   `code`, `message`, and `category`. Stack traces and internal paths stay in
   `logs/audit.log` (R11) and are redacted of secrets by `src/secrets.js` (R7).
3. **Stable, enumerable codes.** Every user-facing failure maps to a 4-digit
   code so that operators, the RTM (R20), and monitoring can reference it
   deterministically.

> Codes are **stable contracts**: once a code is released, its meaning and HTTP
> status do not change. New conditions get a new code rather than overloading an
> existing one.

---

## 2. Error Code Format

Codes are 4-digit integers grouped by severity, mirroring HTTP semantics:

| Range | Class | Meaning |
| :--- | :--- | :--- |
| `1xxx` | Informational | Operation accepted/queued; no failure (rarely surfaced to users) |
| `4xxx` | Client error | The caller did something wrong (validation, auth, not found, rate limit) |
| `5xxx` | Server error | The service failed (internal, database, external dependency, timeout, config) |

Each code maps to exactly one HTTP status. The general envelope is described in
[section 4](#4-error-response-format).

```text
EERX  where E=4/5 and RX is the routed sub-category
1004  -> 1xxx informational, sub 004
4001  -> 4xxx client validation error
5010  -> 5xxx server database error
```

---

## 3. Error Code Reference Table

| Code | HTTP | Category | Message | Description | Possible Causes | Recommended Resolution |
| :--- | :--- | :--- | :--- | :--- | :--- | :--- |
| `1001` | 100 | Informational | `pipeline_queued` | Build accepted and queued for execution. | Normal `npm run pipeline` start. | No action; monitor `logs/audit.log`. |
| `1002` | 100 | Informational | `phase_started` | A W1 phase began (Requirements/Coding/DevSecOps/Documentation). | Orchestrator advancing phases. | No action. |
| `1004` | 200 | Informational | `metrics_recorded` | Build metrics written to `metrics/metrics.db` (C4-2). | End of `collect-metrics.js`. | Verify row count in `metrics.db`. |
| `1008` | 200 | Informational | `spc_within_limits` | Defect density within UCL/LCL (C4-3). | SPC controller passed. | No action. |
| `4001` | 400 | Validation | `invalid_input` | Request failed input validation at a trust boundary. | Missing/empty field, wrong type, unsafe path (`src/validate.js`). | Validate payload against schema; see [Dev Guide](dev-guide.md). |
| `4002` | 400 | Validation | `invalid_email` | Email failed `isValidEmail`. | Malformed address, control chars. | Correct the email format. |
| `4003` | 400 | Validation | `unsafe_path` | Path failed `isSafeRelativePath`. | Absolute path, `..` traversal, NUL byte. | Use a relative, contained path. |
| `4004` | 400 | Validation | `invalid_identifier` | SQL identifier failed `validateIdentifier` (`src/sql.js`). | Non-alphanumeric column/table name. | Use `[A-Za-z_][A-Za-z0-9_]*`. |
| `4010` | 401 | Authentication | `unauthenticated` | No valid credentials supplied. | Missing/expired token, bad session cookie. | Re-authenticate; refresh token. |
| `4011` | 401 | Authentication | `invalid_credentials` | Password verification failed (`src/auth.js` PBKDF2). | Wrong password, wrong user. | Use correct credentials; do **not** reveal which. |
| `4012` | 401 | Authentication | `token_expired` | Auth token TTL exceeded. | Token aged past configured expiry. | Refresh the token. |
| `4020` | 403 | Authorization | `forbidden` | Caller authenticated but lacks role (`src/access.js`). | Missing required role; not owner. | Grant role or request access. |
| `4021` | 403 | Authorization | `not_owner` | `isOwner` check failed for a resource. | Acting on another user's resource. | Use the owning account. |
| `4030` | 404 | Not Found | `resource_not_found` | Requested resource does not exist. | Wrong ID, deleted record, typo. | Verify the identifier; see [tshoot guide](../04_Operations_Maintenance/tshoot-guide.md). |
| `4031` | 404 | Not Found | `route_not_found` | No handler matched the path/method. | Wrong base URL, stale client. | Check [API Reference](../01_Design_Architecture/api-ref.md). |
| `4040` | 429 | Rate Limit | `rate_limited` | Fixed-window limiter tripped (`src/rate.js`). | Too many requests in the window. | Back off using `Retry-After` header. |
| `5001` | 500 | Internal | `internal_error` | Unhandled server error. | Bug in `src/`, uncaught exception. | Inspect `logs/audit.log`; file a bug (see [Contributing](contributing.md)). |
| `5002` | 500 | Internal | `secret_detected` | R7 runtime check found a secret in tree/logs. | `.env` present, hardcoded secret, leaked token. | Remove `.env`, redact secret, confirm `.gitignore`. |
| `5010` | 500 | Database | `database_error` | SQLite/DB operation failed. | Locked `metrics.db`, corrupt file, disk full. | See [Database Schema](../01_Design_Architecture/database-schema.md) §migration. |
| `5020` | 502 | External | `external_service_error` | Upstream service returned an error. | ZAP (DAST), OSV.dev, Ollama down. | Check upstream health; retry with backoff. |
| `5030` | 504 | Timeout | `gateway_timeout` | Upstream or gate did not respond in time. | Slow LLM, ZAP scan overrun. | Increase timeout or reduce scan scope. |
| `5040` | 500 | Configuration | `config_error` | Required configuration missing or invalid. | Missing env var, bad `opencode.jsonc`. | See [Config Guide](../02_Setup_Configuration/config-guide.md). |

> Need a deeper diagnosis flow? Jump to the
> [Troubleshooting Guide](../04_Operations_Maintenance/tshoot-guide.md) section
> on gate failures.

---

## 4. Error Response Format

All HTTP error responses share one JSON envelope. Never add stack traces,
internal paths, or secret material to the body — `src/secrets.js` redaction
covers `logs/audit.log`, but the response body is your responsibility.

```json
{
  "error": {
    "code": 4001,
    "category": "validation",
    "message": "invalid_input",
    "detail": "field 'email' must be a valid email address",
    "requestId": "[request-id]",
    "timestamp": "2026-08-13T14:22:09.412Z"
  }
}
```

| Field | Type | Description |
| :--- | :--- | :--- |
| `code` | integer | 4-digit code from [section 3](#3-error-code-reference-table) |
| `category` | string | `informational` / `validation` / `authentication` / `authorization` / `not_found` / `rate_limit` / `internal` / `database` / `external` / `timeout` / `configuration` |
| `message` | string | Stable machine-readable slug |
| `detail` | string | Optional human-readable hint; **no secrets**, no stack trace |
| `requestId` | string | Correlates to an `audit.log` line (R11) |
| `timestamp` | string | ISO-8601 UTC |

### 4.1 Express-style handler example

```javascript
// src/error-handler.js — minimal envelope emitter
function emitError(res, code, status, category, message, detail, requestId) {
  res.status(status).json({
    error: { code, category, message, detail, requestId,
             timestamp: new Date().toISOString() }
  });
}

// usage inside a route
router.post('/login', (req, res) => {
  try {
    if (!isValidEmail(req.body.email)) {
      return emitError(res, 4002, 400, 'validation', 'invalid_email',
        "field 'email' must be a valid email address", req.id);
    }
    // ...
  } catch (err) {
    return emitError(res, 5001, 500, 'internal', 'internal_error',
      'an unexpected error occurred', req.id);
  }
});
```

---

## 5. Handling Best Practices

### 5.1 For callers (clients)

- **Key off `code`, not `message`.** Messages may be reworded; codes are stable.
- **Retry only idempotent `5xxx` and `429`.** Use exponential backoff with the
  `Retry-After` header for `4040`.
- **Never retry `4001–4021`.** Retrying a validation or auth error wastes a
  request and can trip the rate limiter (`4040`).
- **Correlate with `requestId`.** Paste it into the bug report so maintainers
  can find the matching `audit.log` line.

### 5.2 For authors (server code)

- **Throw typed errors at trust boundaries.** Map them to codes in a single
  error-middleware layer.

  ```javascript
  // map typed errors to codes centrally
  function mapError(err) {
    if (err instanceof TypeError)   return { code: 4001, status: 400 };
    if (err instanceof RangeError)  return { code: 4001, status: 400 };
    if (err.name === 'AuthError')   return { code: 4011, status: 401 };
    return { code: 5001, status: 500 };
  }
  ```

- **Redact before logging.** Pass any error through `src/secrets.js#redact`
  before appending to `logs/audit.log` (R7/R11).
- **Don't swallow errors silently.** An empty `catch` is an R8/R10 smell.
- **Add a test per new code.** Every emitted code needs a `*.spec.js` asserting
  status, code, and envelope shape (see [Contributing](contributing.md) §8).

### 5.3 Retry/backoff matrix

| Code(s) | Retry? | Strategy |
| :--- | :--- | :--- |
| `1xxx` | N/A | Informational; no retry |
| `4xxx` (except `4040`) | No | Fix the request |
| `4040` | Yes | Honor `Retry-After`, then exponential backoff |
| `5xxx` (except `5040`) | Yes (idempotent only) | Exponential backoff, max 3 |
| `5020` / `5030` | Yes | Backoff + circuit breaker on the upstream |

---

## 6. Mapping to Audit Log Lines

Every emitted code is also written to `logs/audit.log` (R11) as a tab- or
pipe-delimited line, giving full traceability into the RTM (R20).

```text
2026-08-13T14:22:09.412Z | devsecops | FAIL | code=4002 | requestId=[request-id] | field=email
2026-08-13T14:23:01.118Z | devsecops | FAIL | code=5002 | secret_detected | path=.env
```

| Audit field | Source | Notes |
| :--- | :--- | :--- |
| timestamp | ISO-8601 UTC | Drives cycle-time stability metric (C4-1) |
| phase | W1 phase name | `requirements` / `coding` / `devsecops` / `documentation` |
| status | `PASS` / `FAIL` / `INFO` | `FAIL` triggers R10 |
| code | This reference | Stable contract |
| requestId | Caller-supplied | Correlates client and server logs |
| detail | Redacted hint | `src/secrets.js#redact` applied (R7) |

### 6.1 Finding a code in the log

```bash
# all occurrences of a code in the last 24h
grep "code=5002" logs/audit.log | tail -n 50

# count failures by code this week
grep -oE "code=[0-9]{4}" logs/audit.log | sort | uniq -c
```

For environment-level diagnosis of these failures (e.g. why `5002` keeps
firing), follow the gate-failure section of the
[Troubleshooting Guide](../04_Operations_Maintenance/tshoot-guide.md), and
cross-reference term definitions in the
[Glossary](../06_User_Reference/glossary.md).

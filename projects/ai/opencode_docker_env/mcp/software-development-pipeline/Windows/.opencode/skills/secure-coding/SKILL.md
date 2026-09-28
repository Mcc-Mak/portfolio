---
name: secure-coding
description: Use when writing OWASP-compliant Node.js source files under src/ and matching Jest unit tests under __tests__/ for the CMMI Level 4 pipeline (R2/R8). Enforces input validation, no hardcoded secrets, no eval, and passing eslint + jest gates.
---

# secure-coding Skill

## Purpose
Produce OWASP-compliant Node.js source files under `src/` and matching Jest unit tests under `__tests__/` (Class 3 artifacts, R2/R8).

## Inputs
- Requirements from `specs/`
- Security baseline: no secrets in code, validate inputs, no eval, no unsafe requires

## Workflow
1. Map each requirement to a module under `src/`.
2. Write source files with:
   - No hardcoded secrets (R7)
   - Input validation and sanitization
   - Error handling without leaking internals
   - No `eval`, no non-literal `require`
3. Write Jest unit tests under `__tests__/*.spec.js` covering normal and edge cases.
4. Ensure tests pass: `npx jest`.

## Outputs
- `src/*.js`
- `__tests__/*.spec.js`

## Acceptance Criteria
- Files written to disk via the write tool.
- `npx eslint . --ext .js --max-warnings 0` passes (R8).
- `npx jest --coverage` passes with high coverage.
- No tool-call JSON printed; no summary-only output.

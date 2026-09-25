# Security Policy

## Supported Versions

| Version | Supported |
| :--- | :--- |
| latest release | Yes |
| previous release | Best-effort |
| older releases | No |

## Reporting a Vulnerability

Please report suspected vulnerabilities privately. Do **not** open a public
issue for security defects.

1. Contact the maintainers via a private channel (email or direct message) with
   a description of the vulnerability and, if possible, a minimal reproduction.
2. Include the affected module, the version, and any suggested fix.
3. The maintainers will acknowledge receipt within 3 business days and will
   coordinate a fix and disclosure timeline.

## Security Gates (R7-R11)

Every pipeline run enforces mandatory DevSecOps gates. A failed gate blocks the
run (R10):

| Gate | Requirement | Tool |
| :--- | :--- | :--- |
| Runtime protection | R7 | `.env` / hardcoded-secret scan |
| SAST | R8 | ESLint (`npm run lint`) |
| SCA | R9 | `npm audit --audit-level=high` |
| DAST | R19 | `npm run dast` (on-prem OWASP ZAP preferred; warn+block if no free engine, recommends 2 best paid on-prem engines) |
| Mandatory gate | R10 | fail on any gate error |
| Audit trail | R11 | `logs/audit.log` |

For hardening guidance see [Security Hardening Guide](docs/Security-Hardening-Guide.md).

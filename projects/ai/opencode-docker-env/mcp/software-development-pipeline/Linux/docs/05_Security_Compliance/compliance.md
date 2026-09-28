# Compliance Framework Documentation

## Table of Contents

- [Introduction](#introduction)
- [Compliance Standards](#compliance-standards)
- [Pipeline Enforcement](#pipeline-enforcement)
- [Evidence Gates](#evidence-gates)
  - [GDPR Evidence Gates](#gdpr-evidence-gates)
  - [HIPAA Evidence Gates](#hipaa-evidence-gates)
  - [PCI DSS Evidence Gates](#pci-dss-evidence-gates)
  - [SOX Evidence Gates](#sox-evidence-gates)
- [Compliance Check Execution](#compliance-check-execution)
- [Compliance Report Structure](#compliance-report-structure)
- [Audit Trail](#audit-trail)
- [Remediation Workflow](#remediation-workflow)
- [Data Retention Policy](#data-retention-policy)
- [Cross-References](#cross-references)

---

## Introduction

The CMMI Level 4 DevSecOps pipeline enforces regulatory compliance as a
mandatory, non-negotiable gate (R16). Compliance is not a manual afterthought;
it is automated, evidenced, and auditable. The pipeline integrates
`compliance-check.js`, which evaluates the project against four major
regulatory frameworks and produces machine-readable evidence in
`metrics/compliance-report.md`.

This document describes the compliance posture, how each standard is enforced,
how to execute compliance checks, how to interpret the resulting report, and
how to remediate failures. All compliance activity is recorded in the
audit trail (R11) at `logs/audit.log`, satisfying the evidentiary
requirements of every standard covered here.

Compliance scope applies to the pipeline itself, the artifacts it produces
(`src/`, `__tests__/`, `docs/`, `specs/`), and the operational data it
generates (`metrics/`, `logs/`). When the project is deployed globally to
`~/.config/opencode/` (R14), the same compliance posture travels with it.

---

## Compliance Standards

The pipeline evaluates evidence against the following four standards. Each
standard has its own applicability criteria; a project may be in scope for one,
several, or all of them depending on the data it processes and the
jurisdictions in which it operates.

| Standard | Description | Applicability | Key Requirements |
| :--- | :--- | :--- | :--- |
| **GDPR** | General Data Protection Regulation (EU 2016/679) | Any processing of personal data belonging to EU data subjects | Lawful basis, data minimization, consent management, right to erasure, breach notification within 72 hours, DPIA for high-risk processing |
| **HIPAA** | Health Insurance Portability and Accountability Act (US, 1996) + HITECH | Any handling of Protected Health Information (PHI) | Administrative, physical, and technical safeguards; access controls; audit logs; encryption at rest and in transit; Business Associate Agreements (BAAs) |
| **PCI DSS** | Payment Card Industry Data Security Standard (v4.0) | Any system that stores, processes, or transmits cardholder data | Network segmentation, cardholder data protection, vulnerability scanning, encryption, access control, quarterly ASV scans |
| **SOX** | Sarbanes-Oxley Act (US, 2002) — Section 302 & 404 | Systems supporting financial reporting for publicly traded companies | Change management, access controls, audit trail, segregation of duties, IT general controls (ITGCs) |

A project that processes payment cards, EU personal data, health records,
**and** supports financial reporting is in scope for all four standards
simultaneously. The pipeline does not assume a reduced scope; it evaluates
every applicable control and lets the report's applicability flags indicate
which standards are active.

---

## Pipeline Enforcement

Compliance is enforced by the `compliance-check.js` script, which implements
requirement R16. The script is invoked as a mandatory gate (R10) during the
DevSecOps phase of the pipeline, after SAST (R8) and SCA (R9) have run but
before the build is considered releasable.

```
Pipeline Phase Order (W1)
─────────────────────────
Requirements → Coding → DevSecOps → Documentation
                          │
                          ├─ SAST  (R8, ESLint)
                          ├─ SCA   (R9, npm audit)
                          ├─ Compliance (R16)  ◄── THIS GATE
                          ├─ Threat Model (R17)
                          ├─ DAST  (R19)
                          └─ RTM   (R20)
```

**Gate behavior:**

1. The script reads `scripts/compliance.config.json` to determine which
   standards are in scope and which evidence gates are active.
2. For each active gate, the script verifies the presence and validity of the
   required evidence artifacts on disk.
3. Any missing or invalid evidence causes the gate to **fail** (R10), which
   blocks the pipeline. The failure is recorded in `logs/audit.log` (R11).
4. On success, a fresh `metrics/compliance-report.md` is generated and the
   pipeline proceeds to the next gate.
5. The notification script (`notify.js`, R18) fires a message indicating the
   gate result to the configured channel.

Evidence is **never** asserted without a verifiable artifact. The gate does
not accept "we have a policy" as evidence; it requires the policy document, the
implementing control, and the audit log entry that proves the control ran.

---

## Evidence Gates

Each standard decomposes into discrete evidence gates. A gate is a single,
verifiable assertion backed by an artifact on disk. Below is the full catalog
of gates the pipeline evaluates.

### GDPR Evidence Gates

| Gate ID | Requirement | Evidence Artifact | Pass Criterion |
| :--- | :--- | :--- | :--- |
| GDPR-01 | Data minimization | `specs/srs.md` §3 (data model) + `src/` schema review | No field collected without a documented purpose |
| GDPR-02 | Consent management | `src/consent.js` (or equivalent) + `__tests__/consent.spec.js` | Consent module exists, tested, and defaults to opt-out |
| GDPR-03 | Right to erasure | `src/erasure.js` (or equivalent) + `__tests__/erasure.spec.js` | Erasure endpoint/test exists and removes PII within [SLA] |
| GDPR-04 | Breach notification | `docs/incident-response.md` + `logs/audit.log` 72h window check | IR doc defines ≤72h notification procedure |
| GDPR-05 | DPIA for high-risk processing | `specs/dpia.md` (when triggered) | DPIA present if SRS flags high-risk processing |

Example evidence gate assertion in `compliance.config.json`:

```json
{
  "gdpr": {
    "enabled": true,
    "gates": {
      "GDPR-01": {
        "evidence": ["specs/srs.md", "src/"],
        "validator": "checkDataMinimization"
      },
      "GDPR-02": {
        "evidence": ["src/consent.js", "__tests__/consent.spec.js"],
        "validator": "checkConsentModule"
      },
      "GDPR-03": {
        "evidence": ["src/erasure.js", "__tests__/erasure.spec.js"],
        "validator": "checkErasureEndpoint"
      },
      "GDPR-04": {
        "evidence": ["docs/incident-response.md"],
        "validator": "checkBreachNotificationPolicy"
      }
    }
  }
}
```

### HIPAA Evidence Gates

| Gate ID | Requirement | Evidence Artifact | Pass Criterion |
| :--- | :--- | :--- | :--- |
| HIPAA-01 | Access controls | `src/auth.js` + RBAC config in `src/config/` | Role-based access enforced; least-privilege verified |
| HIPAA-02 | Audit logs | `logs/audit.log` + `src/audit.js` | All PHI access events logged with actor, target, timestamp |
| HIPAA-03 | Encryption at rest | `src/config/crypto.js` + key management config | AES-256 (or equivalent) configured; keys not in source |
| HIPAA-04 | Encryption in transit | `src/config/tls.js` + TLS config | TLS 1.2+ enforced; HSTS enabled |
| HIPAA-05 | Business Associate Agreement | `docs/legal/baa.md` | BAA on file for every third-party processor of PHI |

#### HIPAA-1: Risk Analysis & Security Management Process (164.308(a)(1))

The HIPAA Security Rule's administrative safeguard **164.308(a)(1)** mandates a
documented **risk analysis** and ongoing **security management process**. This
pipeline satisfies that requirement through the following controls:

- **Risk analysis (periodic).** A recurring risk assessment is performed by the
  DevSecOps pipeline itself. Every pipeline run executes the threat-modeling
  gate (`threat-model.js`, R17), which enumerates vulnerabilities from `npm
  audit` and OSV.dev CVE/CVSS data, maps each to an OWASP category, and scores
  severity. The output `metrics/threat-model.md` is the project's living risk
  register and constitutes the risk analysis artifact.
- **Security management process (continuous).** The security management process
  is the set of mandatory gates enforced on every build (R7-R11, R16-R19):
  runtime secret scanning, SAST (ESLint), SCA (npm audit), DAST (OWASP ZAP),
  compliance checking, and the traceability matrix. These gates are the
  implementable, auditable form of the security management process; a failed
  gate blocks the merge (R10) and is recorded in `logs/audit.log` (R11).
- **Risk treatment.** Findings from the risk assessment are triaged against the
  CMMI Level 4 quantitative goals (defect density ≤ 0.5/KLOC, SPC control
  limits). Critical and high findings must be remediated before merge; medium
  and low findings are tracked in `metrics/threat-model.md` with an owner and
  target resolution date.
- **Review cadence.** The risk analysis is refreshed automatically on every
  pipeline run. A full manual risk assessment review is performed at least
  annually, or whenever a major architecture change is introduced, and the
  review is recorded in `logs/audit.log`.

Evidence artifacts for this control: `metrics/threat-model.md` (risk register),
`metrics/compliance-report.md` (this gate), `logs/audit.log` (gate history),
and `docs/05_Security_Compliance/sec-hardening.md` (implemented technical
controls).

### PCI DSS Evidence Gates

| Gate ID | Requirement | Evidence Artifact | Pass Criterion |
| :--- | :--- | :--- | :--- |
| PCI-01 | Network segmentation | `docs/arch/network-segmentation.md` | Cardholder data environment (CDE) isolated; scoping doc present |
| PCI-02 | Cardholder data protection | `src/` (no PAN in source) + tokenization config | PAN never stored in clear; tokenization or encryption mandatory |
| PCI-03 | Vulnerability scanning | `metrics/dast-report.md` + `npm audit` output | No Critical/High vulnerabilities in CDE; ASV-equivalent scan current |
| PCI-04 | Encryption of transmitted cardholder data | `src/config/tls.js` | TLS 1.2+ with strong ciphers for all CDE traffic |
| PCI-05 | Access control to CDE | `src/auth.js` + `src/config/rbac.js` | MFA for CDE access; unique IDs per user |

### SOX Evidence Gates

| Gate ID | Requirement | Evidence Artifact | Pass Criterion |
| :--- | :--- | :--- | :--- |
| SOX-01 | Change management | `logs/audit.log` + git history + `CHANGELOG.md` | Every production change has approved ticket + review record |
| SOX-02 | Access controls | `src/auth.js` + access review report | Periodic access review; least-privilege enforced |
| SOX-03 | Audit trail | `logs/audit.log` | Tamper-evident log; retained per policy; complete coverage |
| SOX-04 | Segregation of duties | `docs/processes/sod-matrix.md` | Developer cannot push to production; deployer cannot author code |
| SOX-05 | IT general controls | `metrics/` + `logs/` | Backups, change logs, job schedules evidenced |

---

## Compliance Check Execution

The compliance gate is executed automatically by the pipeline, but can also be
run manually for pre-verification or audits.

### Automated (Pipeline)

The pipeline invokes compliance checking during the DevSecOps phase. No manual
action is required; the gate runs as part of `npm run pipeline`.

### Manual Execution

```bash
# Run the compliance gate directly
npm run compliance

# Equivalent explicit invocation
node scripts/compliance-check.js

# Run with verbose output for audit evidence collection
node scripts/compliance-check.js --verbose

# Run a single standard for targeted verification
node scripts/compliance-check.js --standard gdpr
node scripts/compliance-check.js --standard hipaa
node scripts/compliance-check.js --standard pci-dss
node scripts/compliance-check.js --standard sox
```

**Exit codes:**

| Code | Meaning |
| :--- | :--- |
| `0` | All active gates passed; report generated |
| `1` | One or more gates failed (R10 BLOCK) |
| `2` | Configuration error (invalid `compliance.config.json`) |

**Example output (passing):**

```
$ npm run compliance

> compliance
> node scripts/compliance-check.js

[compliance-check] Loading config: scripts/compliance.config.json
[compliance-check] Active standards: GDPR, HIPAA, PCI DSS, SOX
[compliance-check] GDPR   ✓ 5/5 gates passed
[compliance-check] HIPAA  ✓ 5/5 gates passed
[compliance-check] PCI    ✓ 5/5 gates passed
[compliance-check] SOX    ✓ 5/5 gates passed
[compliance-check] Report written: metrics/compliance-report.md
[compliance-check] Audit entry appended: logs/audit.log
[compliance-check] RESULT: PASS — all gates satisfied
```

**Example output (failing):**

```
$ npm run compliance

[compliance-check] GDPR   ✓ 5/5 gates passed
[compliance-check] HIPAA  ✗ 4/5 gates passed
[compliance-check]   FAIL HIPAA-03: Encryption at rest — no crypto config found
[compliance-check] PCI    ✓ 5/5 gates passed
[compliance-check] SOX    ✓ 5/5 gates passed
[compliance-check] Report written: metrics/compliance-report.md
[compliance-check] Audit entry appended: logs/audit.log
[compliance-check] RESULT: FAIL — 1 gate failed (R10 BLOCK)
[compliance-check] Exiting with code 1
```

---

## Compliance Report Structure

A successful (or failed) compliance run produces
`metrics/compliance-report.md`. This file is the primary evidence artifact for
auditors and must be preserved per the data retention policy below.

The report has the following structure:

```markdown
# Compliance Report

- **Generated:** [ISO-8601 timestamp]
- **Run ID:** [unique run identifier]
- **Pipeline Phase:** DevSecOps (R16)
- **Overall Result:** [PASS | FAIL]

## Summary

| Standard | Gates Passed | Gates Failed | Status |
| :--- | :--- | :--- | :--- |
| GDPR | [n]/[total] | [n] | [PASS/FAIL] |
| HIPAA | [n]/[total] | [n] | [PASS/FAIL] |
| PCI DSS | [n]/[total] | [n] | [PASS/FAIL] |
| SOX | [n]/[total] | [n] | [PASS/FAIL] |

## Detailed Results

### GDPR

#### GDPR-01: Data minimization — PASS
- **Evidence:** specs/srs.md, src/
- **Validator:** checkDataMinimization
- **Detail:** [human-readable finding]

#### GDPR-02: Consent management — PASS
- **Evidence:** src/consent.js, __tests__/consent.spec.js
- **Validator:** checkConsentModule
- **Detail:** [human-readable finding]

...

## Failed Gates

[List of failed gates with remediation guidance, or "None"]

## Audit Trail Reference

- **Audit log:** logs/audit.log
- **Entry ID:** [correlating ID]
- **Timestamp:** [ISO-8601]

## Attestation

This report was generated automatically by compliance-check.js (R16).
No manual edits are permitted. Tampering with this report is a BLOCKING
defect (R10).
```

The report is regenerated on every compliance run; historical reports are
archived under `metrics/archive/compliance-report-[run-id].md` per the retention
policy.

---

## Audit Trail

Every compliance action — pass, fail, manual run, config change — is appended
to `logs/audit.log` (R11). The audit log is the single source of truth for
regulatory evidence and is itself an evidence artifact for HIPAA-02, SOX-03,
and GDPR accountability.

**Audit log entry format (JSON Lines):**

```json
{"timestamp":"[ISO-8601]","runId":"[id]","event":"compliance.check","standard":"all","result":"PASS","gatesTotal":20,"gatesPassed":20,"gatesFailed":0,"actor":"pipeline","detail":"R16 compliance gate passed"}
```

```json
{"timestamp":"[ISO-8601]","runId":"[id]","event":"compliance.check","standard":"hipaa","result":"FAIL","gatesTotal":5,"gatesPassed":4,"gatesFailed":1,"failedGates":["HIPAA-03"],"actor":"[user]","detail":"Manual run; encryption-at-rest config missing"}
```

**Audit log properties:**

- **Append-only:** The log is never truncated or rewritten. Rotation archives
  old entries; it does not delete them.
- **Tamper-evident:** Each entry includes a hash chain field so that
  after-the-fact modification is detectable.
- **Retained:** Per the data retention policy below.
- **Queryable:** `node scripts/audit-query.js --event compliance.check --since [date]`

---

## Remediation Workflow

When a compliance gate fails, the pipeline blocks (R10) and a structured
remediation workflow begins. No merge proceeds until the failing gate passes.

```
1. GATE FAILS
   │  compliance-check.js exits 1
   │  metrics/compliance-report.md updated with failed gates
   │  logs/audit.log records the failure
   │  notify.js (R18) alerts the team
   ▼
2. TRIAGE
   │  On-call engineer reads the failed gate in the report
   │  Determines root cause (missing artifact, broken control, scope change)
   │  If the control is genuinely N/A, updates compliance.config.json
   │     with justification + reviewer sign-off (never silently disable)
   ▼
3. REMEDIATE
   │  Author the missing evidence (e.g., add src/consent.js + tests)
   │  OR fix the broken control
   │  OR correct the scope in the config with documented justification
   ▼
4. RE-VERIFY
   │  Run: node scripts/compliance-check.js --standard [standard]
   │  Confirm the specific gate now passes
   │  Run full: npm run compliance (all standards)
   ▼
5. REVIEW & MERGE
   │  Reviewer confirms remediation addresses root cause, not just symptom
   │  Audit log entry added for the remediation
   │  Merge proceeds; report regenerates green
   ▼
6. POST-INCIDENT (if applicable)
   │  If failure indicated a real compliance gap, file an incident
   │  See ../04_Operations_Maintenance/incident-postmortem-template.md
   │  Update controls to prevent recurrence
```

**Important:** Disabling a gate to force a merge is a BLOCKING defect and an
audit finding. If a gate is truly not applicable, the scope must be formally
revised in `compliance.config.json` with a documented justification and
reviewer approval, and the revision itself is logged.

---

## Data Retention Policy

Compliance evidence must be retained to satisfy the longest-standing
regulatory requirement across all in-scope standards.

| Artifact | Location | Retention | Driven By |
| :--- | :--- | :--- | :--- |
| Compliance reports (current) | `metrics/compliance-report.md` | Overwritten each run | — |
| Compliance reports (archived) | `metrics/archive/compliance-report-[run-id].md` | [6] years | SOX, GDPR accountability |
| Audit log | `logs/audit.log` | [6] years (rotated, never deleted) | HIPAA-02, SOX-03, GDPR |
| SAST/SCA/DAST reports | `metrics/` | [3] years | PCI DSS |
| Source artifacts (tagged releases) | git history | Indefinite | SOX change management |
| Incident records | `docs/incidents/` | [6] years | GDPR, HIPAA, SOX |

**Retention enforcement:**

- A scheduled job verifies retention compliance monthly and logs the check.
- Deletion before the retention period expires is a BLOCKING defect and an
  audit finding.
- After retention expiry, deletion is logged in `logs/audit.log` with the
  artifact, date, and authorizing approver.

For backup and recovery of compliance artifacts, see
`../04_Operations_Maintenance/backup-recovery.md`.

---

## Cross-References

- **Security hardening** (same folder): `sec-hardening.md` — technical
  controls that satisfy several evidence gates above.
- **Backup & recovery**: `../04_Operations_Maintenance/backup-recovery.md` —
  retention and restoration of compliance artifacts.
- **Glossary**: `../06_User_Reference/glossary.md` — definitions of GDPR,
  HIPAA, PCI DSS, SOX, PHI, PAN, CDE, DPIA, BAA, and other terms used in this
  document.
- **Project charter**: `../../AGENTS.md` — R16, R10, R11 definitions.

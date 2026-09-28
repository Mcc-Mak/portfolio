# Changelog

## Table of Contents

- [Introduction](#introduction)
- [Changelog Format](#changelog-format)
- [Categories](#categories)
- [Unreleased](#unreleased)
- [Version History](#version-history)
  - [v1.2.0](#v120)
  - [v1.1.0](#v110)
  - [v1.0.0](#v100)
- [Migration & Breaking Changes](#migration--breaking-changes)
- [Cross-References](#cross-references)

---

## Introduction

This document records all notable changes to the CMMI Level 4 DevSecOps
pipeline project. It is maintained in the [Keep a Changelog](https://keepachangelog.com/)
format and adheres to [Semantic Versioning](https://semver.org/). Every
released version is documented here; unreleased work-in-progress appears in the
[Unreleased](#unreleased) section below.

For upgrade procedures, including breaking-change migrations and rollback
steps, see `../04_Operations_Maintenance/migration-guide.md`.

The changelog is generated and maintained as part of the Documentation phase of
the pipeline workflow (W1: Requirements → Coding → DevSecOps → Documentation).
Every merged change that is user-facing or operationally significant MUST
receive a corresponding entry here before release.

---

## Changelog Format

This changelog follows the [Keep a Changelog](https://keepachangelog.com/en/1.1.0/)
specification (version 1.1.0) and [Semantic Versioning](https://semver.org/)
(SemVer 2.0.0).

**Semantic Versioning summary:**

```
MAJOR.MINOR.PATCH
  │     │     │
  │     │     └─ Backward-compatible bug fixes
  │     └─────── Backward-compatible new functionality
  └─────────────── Incompatible / breaking changes
```

- **MAJOR** increments when a change breaks backward compatibility. Review the
  migration guide before upgrading.
- **MINOR** increments when functionality is added in a backward-compatible
  manner.
- **PATCH** increments when backward-compatible bug fixes are made.
- Pre-release versions use a hyphen suffix: `v1.2.0-rc.1`, `v1.2.0-beta.2`.
- Build metadata uses a plus suffix: `v1.2.0+build.4`.

**Entry conventions:**

- Each version has a heading: `## [vX.Y.Z] - YYYY-MM-DD`.
- Entries are grouped by category (see below).
- Each bullet is a single, self-contained, user-relevant change.
- Reference the ticket/issue ID at the end: `([R16], [#123])`.
- Security-relevant changes always appear under **Security**, even if they
  could also fit another category.

---

## Categories

Every change is classified into exactly one of the following categories, as
defined by Keep a Changelog:

| Category | Use For |
| :--- | :--- |
| **Added** | New features, new capabilities, newly documented options |
| **Changed** | Changes to existing functionality that are not breaking |
| **Deprecated** | Soon-to-be-removed features; gives users time to migrate |
| **Removed** | Features removed in this version (usually deprecated previously) |
| **Fixed** | Bug fixes, defect corrections |
| **Security** | Vulnerability fixes, hardening, compliance control changes |

---

## Unreleased

Changes that have been merged to the default branch but not yet released. This
section is reset at each release.

### Added
- [Placeholder: describe new feature] ([#000])

### Changed
- [Placeholder: describe change to existing functionality] ([#000])

### Deprecated
- [Placeholder: describe deprecated feature and migration path] ([#000])

### Removed
- [Placeholder: describe removed feature] ([#000])

### Fixed
- [Placeholder: describe bug fix] ([#000])

### Security
- [Placeholder: describe security fix or control change] ([#000])

---

## Version History

The table below summarizes each released version. Detail follows in the
per-version sections.

| Version | Date | Summary |
| :--- | :--- | :--- |
| [v1.2.0] | [YYYY-MM-DD] | [Release summary — e.g., added DAST gate (R19) and OSV.dev enrichment] |
| [v1.1.0] | [YYYY-MM-DD] | [Release summary — e.g., added SPC control charts (C4-3) and prediction (C4-4)] |
| [v1.0.0] | [YYYY-MM-DD] | [Release summary — initial GA of CMMI Level 4 pipeline] |

---

### v1.2.0

**Released:** [YYYY-MM-DD]
**Summary:** [One-line summary of the release]

#### Added
- [Placeholder: DAST scanning gate (R19) with OWASP ZAP integration] ([#123])
- [Placeholder: Requirements Traceability Matrix generation (R20)] ([#124])
- [Placeholder: Threat modeling script (R17) with OSV.dev CVE/CVSS enrichment] ([#125])
- [Placeholder: Notification script (R18) for gate results] ([#126])

#### Changed
- [Placeholder: Compliance report now includes per-gate evidence paths] ([#127])
- [Placeholder: Pipeline logs use ISO-8601 timestamps throughout] ([#128])

#### Deprecated
- [Placeholder: Legacy `npm run scan` alias; use `npm run pipeline`] ([#129])

#### Removed
- [Placeholder: Removed unsupported Node.js 14 compatibility shims] ([#130])

#### Fixed
- [Placeholder: Fixed false-positive in GDPR-02 gate when consent module uses
  dynamic import] ([#131])
- [Placeholder: Fixed audit log hash-chain break on rotated entries] ([#132])

#### Security
- [Placeholder: Patched transitive dependency with CVE-[XXXX] (npm audit)] ([#133])
- [Placeholder: Hardened TLS config to reject TLS 1.0/1.1 (PCI-04, HIPAA-04)] ([#134])

**Migration notes:** [Placeholder: describe any required actions on upgrade.
For full migration steps, see `../04_Operations_Maintenance/migration-guide.md`.]

---

### v1.1.0

**Released:** [YYYY-MM-DD]
**Summary:** [One-line summary of the release]

#### Added
- [Placeholder: Statistical Process Control charts (C4-3) in spc-control.js] ([#100])
- [Placeholder: Predictive readiness regression model (C4-4)] ([#101])
- [Placeholder: Auto-remediation on SPC trend warning (C4-5)] ([#102])
- [Placeholder: Metrics collection (C4-2) writing to metrics/metrics.db] ([#103])
- [Placeholder: Compliance check (R16) for GDPR, HIPAA, PCI DSS, SOX] ([#104])

#### Changed
- [Placeholder: Pipeline now enforces W1 strict order with explicit phase
  transitions] ([#105])
- [Placeholder: Audit log entries now include runId for correlation] ([#106])

#### Deprecated
- [Placeholder: Old `metrics.json` format superseded by metrics.db] ([#107])

#### Removed
- [Placeholder: Removed ad-hoc lint script; SAST now exclusively via ESLint
  gate (R8)] ([#108])

#### Fixed
- [Placeholder: Fixed race condition in parallel gate execution] ([#109])
- [Placeholder: Fixed missing audit entry when SCA gate skipped due to config] ([#110])

#### Security
- [Placeholder: Enforced no-hardcoded-secrets rule in ESLint (R8)] ([#111])
- [Placeholder: Updated dependencies to resolve [N] npm audit advisories] ([#112])

**Migration notes:** [Placeholder: metrics.json users must run the migration
script. See `../04_Operations_Maintenance/migration-guide.md`.]

---

### v1.0.0

**Released:** [YYYY-MM-DD]
**Summary:** [Initial general availability of the CMMI Level 4 DevSecOps
pipeline.]

#### Added
- [Placeholder: Core pipeline script (opencode-pipeline.sh) enforcing W1
  order] ([#1])
- [Placeholder: SAST gate via ESLint (R8)] ([#2])
- [Placeholder: SCA gate via npm audit (R9)] ([#3])
- [Placeholder: Mandatory fail-on-error gate (R10)] ([#4])
- [Placeholder: Audit logging to logs/audit.log (R11)] ([#5])
- [Placeholder: Global deployment script (R14) to ~/.config/opencode/] ([#6])
- [Placeholder: Three opencode skills: requirement-gathering, secure-coding,
  doc-generation (R1, R2, R3, R4)] ([#7])
- [Placeholder: AGENTS.md charter (R12) and SKILL.md files (R13)] ([#8])

#### Security
- [Placeholder: Baseline security posture: input validation, no eval, no
  hardcoded secrets enforced by secure-coding SKILL] ([#9])

**Migration notes:** This is the initial release. No migration required.

---

## Migration & Breaking Changes

Breaking changes (MAJOR version bumps) require a migration. Each MAJOR release
section above links to the specific steps. The canonical, always-current
migration procedure lives in:

```
../04_Operations_Maintenance/migration-guide.md
```

**Breaking-change policy:**

1. A breaking change increments the MAJOR version.
2. The deprecated path is supported for one full MINOR cycle (deprecated in
   `vN.x.0`, removed in `v(N+1).0.0`) whenever feasible.
3. The migration guide is updated in the same change that introduces the break.
4. The changelog **Deprecated** entry names the replacement and the removal
   version.

**Rollback:** Each release tag is revertible. See the migration guide for
rollback procedures per version.

---

## Cross-References

- **Migration guide**: `../04_Operations_Maintenance/migration-guide.md` —
  upgrade procedures, breaking-change migrations, and rollback steps.
- **Roadmap**: `../00_Planning_Requirements/roadmap.md` — future plans and
  planned breaking changes.
- **Glossary**: `../06_User_Reference/glossary.md` — definitions of terms used
  in this changelog.
- **Project charter**: `../../AGENTS.md` — requirement IDs (R1–R20, C4-1–C4-5)
  referenced in entries.

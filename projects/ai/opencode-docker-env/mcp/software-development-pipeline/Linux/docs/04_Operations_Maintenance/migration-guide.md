# Migration Guide

**Class**: 5 (Ops/User) | **Persona**: Maintainer / Release Engineer

## Table of Contents

1. [Overview](#overview)
2. [Migration Philosophy](#migration-philosophy)
3. [Semantic Versioning](#semantic-versioning)
4. [Breaking vs. Non-Breaking Changes](#breaking-vs-non-breaking-changes)
5. [Database Migration](#database-migration)
6. [Configuration Migration](#configuration-migration)
7. [Data Migration](#data-migration)
8. [Step-by-Step Upgrade Paths](#step-by-step-upgrade-paths)
9. [Rollback Strategy](#rollback-strategy)
10. [Compatibility Matrix](#compatibility-matrix)
11. [Deprecation Policy](#deprecation-policy)
12. [Testing the Migration](#testing-the-migration)
13. [Related Documentation](#related-documentation)

---

## Overview

This guide governs version upgrades of the CMMI Level 4 DevSecOps pipeline.
Migrations touch three layers — the measurement database (`metrics.db`), the
generated configuration (`opencode.jsonc`, `package.json`, `.eslintrc.js`),
and the deployed code/skills/tools mirrored to `~/.config/opencode/` (R14).
A migration that skips a layer leaves the system in an inconsistent state,
which is a BLOCKING defect (R10).

Migrations are change-managed events, not routine deploys. Every migration
is planned, tested in staging, executed against a verified backup, and
verified post-migration. See `deployment-guide.md` for the deploy mechanics
this guide references.

> **Golden rule**: Never migrate without a verified backup and a tested
> rollback. See `../04_Operations_Maintenance/backup-recovery.md`.

---

## Migration Philosophy

1. **Reversible first.** If you cannot describe the rollback before you
   start, you are not ready to migrate.
2. **One layer at a time.** Migrate the database, then config, then code —
   never in a single unobservable step.
3. **Measure, don't assume.** Run the full pipeline and SPC check after
   each layer; a regression past the UCL (C4-3) blocks promotion.
4. **Backward compatibility window.** Breaking changes ship behind a
   coexistence period (see [Deprecation Policy](#deprecation-policy)) so
   callers can adapt.
5. **Audit everything.** Every migration step is recorded in
   `logs/audit.log` (R11), including the from/to versions and the rollback
   tag.

---

## Semantic Versioning

The pipeline follows Semantic Versioning (`MAJOR.MINOR.PATCH`):

| Component | Bump | Meaning | Migration Required? |
| :--- | :--- | :--- | :--- |
| **PATCH** | `x.y.Z` | Backward-compatible bug fix | No — drop-in deploy |
| **MINOR** | `x.Y.0` | Backward-compatible feature | Config check; no breaking migration |
| **MAJOR** | `X.0.0` | Breaking change | Full migration + rollback plan |

```text
v2.3.1
 │ │ └─ PATCH: fix SPC sigma calc off-by-one   (drop-in)
 │ └─── MINOR: add DAST report parser          (config check)
 └───── MAJOR: rename metrics.db schema        (full migration)
```

- A PATCH release MUST pass `npm run pipeline` unchanged.
- A MINOR release MAY add config keys but MUST default to prior behavior.
- A MAJOR release MUST ship a migration script and a rollback script.

---

## Breaking vs. Non-Breaking Changes

| Change Type | Example | Version Bump | Migration Script | Coexistence | Rollback |
| :--- | :--- | :--- | :--- | :--- | :--- |
| Bug fix (no API change) | SPC rounding fix | PATCH | No | No | Re-deploy previous tag |
| Additive feature | New `metrics/` report file | MINOR | No | No | Re-deploy previous tag |
| New config key (with default) | New `.eslintrc.js` rule, default off | MINOR | Optional | Yes (1 cycle) | Re-deploy previous tag |
| Renamed config key | `auditLevel` → `audit-level` | MAJOR | Yes | Yes (1 cycle) | Migration rollback script |
| DB schema change | Add column to `metrics.db` | MINOR | Yes (forward-only) | Yes | Restore backup |
| DB schema breaking | Drop/rename column | MAJOR | Yes | Yes (1 cycle) | Restore backup |
| Removed skill/tool | Drop `tools/reqmind.js` | MAJOR | Yes (deprecation) | Yes (1 cycle) | Re-deploy previous tag |
| Node.js LTS floor raised | Require Node 22 | MAJOR | No | Yes (1 cycle) | Reinstall prior LTS |

> When in doubt, treat the change as breaking. The cost of an unplanned
> MAJOR is far higher than an over-cautious MINOR.

---

## Database Migration

The measurement database (`metrics.db`) is a single SQLite file holding the
SPC/prediction baseline (C4-2/C4-3/C4-4). Schema changes are high-risk: a
broken migration can erase months of build history.

### Versioned migration scripts

Migrations live in `scripts/migrations/` and are named
`NNN_description.sql` (e.g. `003_add_cycle_time_column.sql`). A
`schema_version` table tracks applied migrations:

```sql
CREATE TABLE IF NOT EXISTS schema_version (
  version    INTEGER PRIMARY KEY,
  name       TEXT    NOT NULL,
  applied_at TEXT    NOT NULL DEFAULT (datetime('now'))
);
```

### Migration tool

```bash
# Apply all pending migrations (idempotent; skips already-applied)
npm run migrate:up

# Roll back the most recent migration (where reversible)
npm run migrate:down

# Show current schema version and pending migrations
npm run migrate:status
```

### Applying a migration

```bash
DST="$HOME/.config/opencode"

# 1. Stop the pipeline / opencode
# 2. Back up the DB (REQUIRED — see backup-recovery.md)
cp -v "$DST/metrics/metrics.db" "$DST/metrics/metrics.db.pre-migration.$(date +%s)"

# 3. Verify the backup
sqlite3 "$DST/metrics/metrics.db.pre-migration.$(date +%s)" "PRAGMA integrity_check;"

# 4. Apply pending migrations
npm run migrate:up

# 5. Verify
sqlite3 "$DST/metrics/metrics.db" "SELECT version, name FROM schema_version;"
npm run spc       # confirm SPC reads migrated history
npm run predict   # confirm prediction runs

# 6. Record
echo "$(date -Iseconds) | Migration | DB schema NNN applied" >> "$DST/logs/audit.log"
```

> Forward-only migrations (add column) are safe. Destructive migrations
> (drop/rename) MUST be split: ship the additive change in N, deprecate
> the old column for one cycle, drop it in N+1.

---

## Configuration Migration

The global config is **generated** by `scripts/deploy-global.sh` from
project templates (R14). Never edit globals directly. Config migration is
therefore a source-level change followed by a re-deploy.

| File | Source | Generated To | Migration Concern |
| :--- | :--- | :--- | :--- |
| `opencode.jsonc` | `opencode.global.jsonc` | `~/.config/opencode/opencode.jsonc` | New keys, renamed keys, removed keys |
| `package.json` | `package.json` | `~/.config/opencode/package.json` | devDependency bumps, script changes |
| `.eslintrc.js` | `.eslintrc.js` | `~/.config/opencode/.eslintrc.js` | New rules, parser options |

### Config migration procedure

```bash
# 1. Edit the project source templates (never the global copies)
#    - opencode.global.jsonc : add/rename/deprecate keys
#    - package.json          : bump devDependencies
#    - .eslintrc.js          : add rules (default new rules to 'warn' first)

# 2. Validate the generated config renders correctly
npm run deploy -- --dry-run   # if supported; else inspect deploy output

# 3. Run the gates against the new config
npm run lint    # R8 — confirms eslint config is valid
npm run audit   # R9 — confirms dependency bumps are clean
npm run test    # confirms behavior

# 4. Deploy
npm run deploy

# 5. Restart opencode and verify config loaded
#    (check startup logs for the new keys)
```

> For renamed config keys, keep the old key as a deprecated alias for one
> release cycle and emit a warning when it is used. Remove the alias in the
> next MAJOR.

---

## Data Migration

Data migration applies when an upgrade transforms existing *content*, not
just schema — e.g., re-keying records, normalizing units, or back-filling a
new column from `audit.log`.

| Scenario | Source of Truth | Tool | Reversible? |
| :--- | :--- | :--- | :--- |
| Back-fill column from `audit.log` | `logs/audit.log` | Custom `scripts/migrate-data.js` | Yes (restore backup) |
| Normalize defect-density units | `metrics.db` | Custom script + `spc-control.js` re-baseline | No (re-baseline required) |
| Re-key build records | `metrics.db` | Custom script | Yes (restore backup) |

```bash
# Example: back-fill cycle_time from audit.log into metrics.db
npm run migrate:data -- --from=audit.log --target=cycle_time

# Always verify SPC after a data migration (the baseline may shift)
npm run spc
npm run predict
```

> A data migration that shifts the SPC mean is expected to trigger a
> re-baseline. Document the re-baseline in `logs/audit.log` and confirm the
> new UCL/LCL before the next production build.

---

## Step-by-Step Upgrade Paths

Each upgrade path below is a template. Replace `[placeholder]` values with
the concrete versions and dates for your migration.

### v1.x → v2.x (MAJOR)

```bash
# Pre-migration (see Testing the Migration for detail)
# - Confirm compatibility matrix (Node, npm, opencode) for v2.x
# - Take a verified backup (backup-recovery.md)
# - Confirm the rollback tag v1.x is checkoutable

# 1. Stage the upgrade in dev, then staging
git checkout v[2.0.0]
npm install                    # resolve new devDependencies
npm run migrate:status         # confirm pending DB migrations
npm run migrate:up             # apply DB migrations
npm run deploy                 # regenerate + mirror globals (R14)
# restart opencode

# 2. Verify (full gate suite + SPC)
npm run lint && npm run test && npm run audit && npm run pipeline
npm run spc && npm run predict

# 3. Promote to production (deployment-guide.md promotion workflow)
#    - same artifact (v2.0.0)
#    - re-apply DB migration on the production host
#    - confirm SPC density <= UCL (C4-3)

# 4. Record
echo "$(date -Iseconds) | Migration | v1.x -> v[2.0.0] SUCCESS" >> logs/audit.log
```

### v2.x → v3.x (MAJOR)

```bash
# Pre-migration
# - Confirm v3.x drops the deprecated aliases introduced in v2.x
# - Take a verified backup
# - Confirm rollback tag v2.x is checkoutable

# 1. Stage in dev, then staging
git checkout v[3.0.0]
npm install
npm run migrate:status
npm run migrate:up
npm run deploy
# restart opencode

# 2. Verify
npm run lint && npm run test && npm run audit && npm run pipeline
npm run spc && npm run predict

# 3. If deprecated config keys were in use, confirm the warnings are gone
#    (coexistence window has closed)

# 4. Promote to production; record
echo "$(date -Iseconds) | Migration | v2.x -> v[3.0.0] SUCCESS" >> logs/audit.log
```

> For PATCH/MINOR upgrades, skip the migration scripts and follow the
> standard deploy in `deployment-guide.md`. Always run the gate suite and
> SPC check regardless of bump size.

---

## Rollback Strategy

| Layer | Rollback Method | Data Loss? |
| :--- | :--- | :--- |
| Code/skills/tools | `git checkout v[previous] && npm run deploy` | None |
| Generated config | Re-deploy from previous tag (config is generated) | None |
| DB schema (additive) | Restore `metrics.db` from pre-migration backup | Builds after backup |
| DB schema (destructive) | Restore `metrics.db` from pre-migration backup (no down-migration) | Builds after backup |
| Data migration | Restore `metrics.db` from pre-migration backup | Builds after backup |

### Rollback procedure

```bash
DST="$HOME/.config/opencode"

# 1. Stop the pipeline / opencode
# 2. Restore code/config from the previous tag
cd /workplace/mcp/software-development-pipeline/Linux
git checkout v[previous-version]
npm run deploy

# 3. Restore the DB from the pre-migration backup (if a DB migration ran)
cp -v "$DST/metrics/metrics.db.pre-migration.$(TIMESTAMP)" "$DST/metrics/metrics.db"
sqlite3 "$DST/metrics/metrics.db" "PRAGMA integrity_check;"
npm run spc && npm run predict

# 4. Restart opencode; smoke test
cd /tmp && npm --prefix "$DST" run pipeline

# 5. Record
echo "$(date -Iseconds) | Migration | ROLLBACK to v[previous-version]" >> "$DST/logs/audit.log"
```

> A rollback after a destructive DB migration is only possible from the
> pre-migration backup. This is why the backup is mandatory and must be
> verified before migration begins.

---

## Compatibility Matrix

Before any migration, confirm the target version is compatible with the
runtime. Update this matrix per release.

| Pipeline Version | Node.js | npm | opencode | SQLite | Notes |
| :--- | :--- | :--- | :--- | :--- | :--- |
| v1.x | 18 LTS | 9+ | `[opencode v1.x]` | 3.35+ | Initial release |
| v2.x | 20 LTS | 10+ | `[opencode v2.x]` | 3.35+ | Raised Node floor; C4-6 added |
| v3.x | 22 LTS | 10+ | `[opencode v3.x]` | 3.40+ | Dropped v1.x deprecated aliases |
| `[next]` | `[LTS]` | `[npm]` | `[opencode]` | `[sqlite]` | `[placeholder]` |

```bash
# Compatibility self-check before migration
node --version        # must match the matrix row for the target version
npm --version
sqlite3 --version
opencode --version    # if available as a CLI
```

> A migration onto an incompatible runtime is a BLOCKING defect. Resolve
> the runtime first, then migrate the pipeline.

---

## Deprecation Policy

The pipeline supports an **N-1 policy**: the current MAJOR and the previous
MAJOR are both supported. Older versions receive security fixes only.

| Status | Meaning | Support Level |
| :--- | :--- | :--- |
| **Current** | Latest MAJOR release | Full support (features + security + fixes) |
| **Supported (N-1)** | Previous MAJOR release | Security fixes only; no new features |
| **Deprecated** | Announced for removal | Security fixes only; coexistence window open |
| **End-of-life** | Two MAJORS behind | No support; migrate immediately |

### Deprecation lifecycle

1. **Announce** in `../06_User_Reference/changelog.md` and an ADR. Mark the
   resource deprecated in its source.
2. **Coexist** for one MINOR cycle: keep the old resource, emit a warning
   when it is used, document the replacement.
3. **Remove** in the next MAJOR: delete the resource, update every artifact
   that referenced it (docs, specs, deploy script, R14 resource table) in
   the same change.
4. **Re-deploy** and restart opencode.

> A removed resource that still has a caller is a BLOCKING defect (R10).
> The coexistence window exists to prevent this — use it.

---

## Testing the Migration

### Pre-migration checks

- [ ] Compatibility matrix confirmed for the target version
- [ ] Verified backup taken and integrity-checked (`backup-recovery.md`)
- [ ] Rollback tag identified and checkoutable
- [ ] Migration scripts reviewed; `migrate:status` shows expected pending set
- [ ] Staging environment mirrors production data shape

### Migration dry-run (staging)

```bash
# Clone the production backup into staging and run the migration there
cp production.metrics.db staging.metrics.db
OPCODE_METRICS_DB=staging.metrics.db npm run migrate:up
OPCODE_METRICS_DB=staging.metrics.db npm run spc
OPCODE_METRICS_DB=staging.metrics.db npm run predict
# Compare SPC output to production; investigate any baseline shift
```

### Post-migration verification

- [ ] `npm run lint` green (R8)
- [ ] `npm run test` green (behavior)
- [ ] `npm run audit` green (R9)
- [ ] `npm run pipeline` exits 0; `Pipeline | SUCCESS` in audit.log
- [ ] `npm run spc` — density ≤ UCL (C4-3); no unexplained baseline shift
- [ ] `npm run predict` — forecast ≤ 0.5 goal (C4-1)
- [ ] `schema_version` table shows all expected migrations applied
- [ ] Deprecated warnings (if any) are expected and documented
- [ ] Migration recorded in `logs/audit.log` (R11)

> If any post-migration check fails, execute the rollback procedure
> immediately. Do not attempt to "fix forward" a failed migration in
> production.

---

## Related Documentation

- `deployment-guide.md` — deployment and rollback mechanics referenced throughout
- `maint-guide.md` — dependency upgrades, deprecation lifecycle, and health checks
- `../06_User_Reference/changelog.md` — version history and deprecation announcements
- `../06_User_Reference/glossary.md` — terminology (MAJOR/MINOR/PATCH, R10, R14, SPC, UCL, etc.)

# Backup and Recovery Guide

**Class**: 5 (Ops/User) | **Persona**: Operator / Administrator

## Table of Contents

1. [Overview](#overview)
2. [Backup Strategy](#backup-strategy)
3. [What Is Backed Up](#what-is-backed-up)
4. [Backup Schedule](#backup-schedule)
5. [Retention Policy](#retention-policy)
6. [Backup Storage](#backup-storage)
7. [Backup Verification](#backup-verification)
8. [Recovery Procedures](#recovery-procedures)
9. [RTO and RPO](#rto-and-rpo)
10. [Disaster Recovery Scenarios](#disaster-recovery-scenarios)
11. [Testing the Backup Process](#testing-the-backup-process)
12. [Contact Escalation](#contact-escalation)
13. [Related Documentation](#related-documentation)

---

## Overview

This guide defines the backup and recovery procedures for the CMMI Level 4
DevSecOps pipeline. The pipeline's value is concentrated in two assets: the
**measurement database** (`metrics/metrics.db`), which holds the SPC and
prediction baseline (C4-2/C4-3/C4-4), and the **global install**
(`~/.config/opencode/`), which is the running system (R14). Losing either
without a recoverable backup is a BLOCKING defect.

Recovery procedures here complement — but do not replace — the deployment
procedures in `deployment-guide.md`. Where a deployment rollback restores a
known-good version, a recovery restores known-good *data and state*.

> **Principle**: Every backup must be verifiable. An unverified backup is
> not a backup — it is a hope. See [Backup Verification](#backup-verification).

---

## Backup Strategy

The strategy is **3-2-1**: at least 3 copies of the data, on 2 different
media, with 1 copy off-site (or off-host). For this pipeline:

- **Copy 1 (primary)**: the live data at `~/.config/opencode/`.
- **Copy 2 (local backup)**: a timestamped snapshot on the same host or a
  local NAS, suitable for fast restore.
- **Copy 3 (off-host backup)**: a copy at `[Backup Storage URL]` (cloud or
  off-prem), suitable for disaster recovery.

Backups are taken while no pipeline run is writing (see
[Backup Schedule](#backup-schedule)). The measurement database is a single
SQLite file; a hot copy may capture a mid-transaction state. Always quiesce
the writer or use SQLite's backup API.

---

## What Is Backed Up

| Asset | Path | Why It Matters | Backup Method |
| :--- | :--- | :--- | :--- |
| Measurement DB | `~/.config/opencode/metrics/metrics.db` | SPC/prediction baseline (C4-2/3/4) | SQLite backup API or cold file copy |
| Audit log | `~/.config/opencode/logs/audit.log` | R11 compliance trail | File copy (append-only) |
| Generated configs | `~/.config/opencode/opencode.jsonc`, `package.json`, `.eslintrc.js` | Running system config (R14, generated) | File copy (regenerable from source) |
| Global scripts/skills/tools | `~/.config/opencode/{scripts,skills,commands,tools}/` | Running system code (R14 mirror) | `tar` archive (regenerable from source) |
| Project specs | `docs/00_Planning_Requirements/rtm.md` (canonical), `specs/` (mirror, idea) | Requirements baseline (Class 1) | git + archive |
| Source & tests | `src/`, `__tests__/` | Application code (Class 3) | git (primary) |
| Docs | `docs/` | User/ops documentation (Class 5) | git + archive |
| Security/compliance reports | `metrics/{spc-report,compliance-report,threat-model,dast-report}.md` | R16-R19 evidence | File copy + git |

> Source code, specs, and docs are **primarily** backed up via git (the
> project source of truth). The file-archive backups below are a second
> line of defense and the only line for the runtime-generated globals and
> the metrics database.

---

## Backup Schedule

| Type | Frequency | Scope | Trigger |
| :--- | :--- | :--- | :--- |
| **Full** | Weekly (Sunday 02:00 UTC) | All assets above | Cron / scheduler |
| **Incremental** | Daily (02:00 UTC) | `metrics.db`, `audit.log`, reports changed since last full | Cron / scheduler |
| **Pre-deploy snapshot** | Before every deployment | Full global install + metrics.db | `deployment-guide.md` pre-deploy step |
| **On-demand** | As needed | Operator-specified | Manual |

Backups run during the maintenance window to avoid mid-write captures:

```bash
# Weekly full backup (example cron entry)
# 0 2 * * 0  /usr/local/bin/backup-opencode.sh full

# Daily incremental
# 0 2 * * 1-6 /usr/local/bin/backup-opencode.sh incremental
```

> Ensure no `npm run pipeline` is scheduled during the 02:00 UTC backup
> window. The scheduler should acquire a lock or check for a running
> pipeline before copying `metrics.db`.

---

## Retention Policy

| Tier | Frequency | Retention | Purpose |
| :--- | :--- | :--- | :--- |
| Daily incremental | Daily | 14 days | Fast recovery of recent state |
| Weekly full | Weekly | 8 weeks | Recovery within the last two months |
| Monthly full | 1st of month | 12 months | Long-term audit/compliance (R11) |
| Yearly full | 1 Jan | 7 years | Regulatory retention (if applicable) |
| Pre-deploy snapshot | Per deploy | 90 days | Deployment rollback source |

Retention is enforced by the backup script, which prunes expired snapshots
after a successful new backup. Never prune before verifying the new backup
(see [Backup Verification](#backup-verification)).

```bash
# Prune example (run AFTER a verified backup)
find "$BACKUP_DIR" -name "metrics.db.*" -mtime +14 -delete   # daily > 14d
find "$BACKUP_DIR" -name "full-*.tar" -mtime +56 -delete      # weekly > 8w
```

---

## Backup Storage

| Tier | Location | Media | Notes |
| :--- | :--- | :--- | :--- |
| Local backup | `[Backup Storage URL]` (local path / NAS) | Disk | Fast restore; same physical site |
| Off-host backup | `[Backup Storage URL]` (cloud / off-prem) | Object storage | DR copy; encrypted at rest |
| Pre-deploy snapshot | `[Backup Storage URL]/pre-deploy/` | Disk | Tied to a release tag |

- Backups containing `audit.log` or production `metrics.db` are
  **confidential** (Class 4). Encrypt at rest and restrict access to the
  operator/administrator role (see `../05_Security_Compliance/sec-hardening.md`).
- Store the backup index (manifest of tags, dates, sizes, checksums) at the
  backup root so restore can locate the correct snapshot without scanning.
- Never store credentials in the backup index. Resolve secrets via the
  secrets manager at restore time.

---

## Backup Verification

A backup is not valid until verified. Two verification levels:

### 1. Integrity check (every backup)

```bash
# Verify the SQLite backup is openable and not mid-transaction
sqlite3 "$BACKUP_DIR/metrics.db.$(date +%Y%m%d)" "PRAGMA integrity_check;"
# Expect: ok

# Verify the audit log copy is non-empty and ends with a valid line
tail -n 1 "$BACKUP_DIR/audit.log.$(date +%Y%m%d)"

# Verify the full-archive checksum matches the manifest
sha256sum -c "$BACKUP_DIR/full-$(date +%Y%m%d).sha256"
```

### 2. Restore test (monthly)

Quarterly at minimum, restore the weekly full backup into an isolated
environment and run `npm run spc` and `npm run predict` to confirm the
restored `metrics.db` produces valid SPC/prediction output. Record the
result in `logs/audit.log`.

```bash
# Isolated restore test
TEST_DIR="/tmp/restore-test-$(date +%s)"
mkdir -p "$TEST_DIR/metrics"
cp "$BACKUP_DIR/metrics.db.$(VERIFIED_DATE)" "$TEST_DIR/metrics/metrics.db"
# Point the analytics scripts at the test DB and run
OPCODE_METRICS_DB="$TEST_DIR/metrics/metrics.db" npm run spc
OPCODE_METRICS_DB="$TEST_DIR/metrics/metrics.db" npm run predict
```

> If integrity_check fails or the restore test errors, the backup is
> INVALID. Do not prune the prior valid backup. Open an incident per
> `runbook.md`.

---

## Recovery Procedures

Before any recovery: **stop the running pipeline and opencode** to avoid
writes during restore. Record the recovery start in `logs/audit.log`.

### Database recovery (SQLite metrics.db restore)

Use this when the live `metrics.db` is corrupted, lost, or contaminated.

```bash
DST="$HOME/.config/opencode"
BACKUP_DIR="[Backup Storage URL]"

# 1. Stop the pipeline / opencode
# 2. Verify the candidate backup
sqlite3 "$BACKUP_DIR/metrics.db.$(RESTORE_DATE)" "PRAGMA integrity_check;"

# 3. Save the corrupted DB for forensics
mv "$DST/metrics/metrics.db" "$DST/metrics/metrics.db.corrupt.$(date +%s)"

# 4. Restore
cp -v "$BACKUP_DIR/metrics.db.$(RESTORE_DATE)" "$DST/metrics/metrics.db"

# 5. Verify the restored DB
sqlite3 "$DST/metrics/metrics.db" "PRAGMA integrity_check;"
npm run spc      # confirm SPC reads restored history
npm run predict  # confirm prediction runs

# 6. Record
echo "$(date -Iseconds) | Recovery | DB restored from $RESTORE_DATE" >> "$DST/logs/audit.log"
```

> Restoring `metrics.db` rewinds SPC history to the backup point. Builds
> after the backup date are absent; the next `npm run collect-metrics`
> re-adds only the current build. Accept this loss or re-import from
> `audit.log` if a re-import tool is available.

### File system recovery (configs / specs / docs restore)

Use this when global configs, specs, or docs are lost or hand-edited (R14
violation). Prefer regeneration from the project source via
`npm run deploy`; use file restore only when the source is also unavailable.

```bash
DST="$HOME/.config/opencode"
BACKUP_DIR="[Backup Storage URL]"

# 1. Stop the pipeline / opencode
# 2. Restore the generated configs
cp -v "$BACKUP_DIR/opencode.jsonc.$(RESTORE_DATE)" "$DST/opencode.jsonc"
cp -v "$BACKUP_DIR/package.json.$(RESTORE_DATE)"   "$DST/package.json"
cp -v "$BACKUP_DIR/.eslintrc.js.$(RESTORE_DATE)"   "$DST/.eslintrc.js"

# 3. Restore scripts/skills/commands/tools from the full archive
tar -xf "$BACKUP_DIR/full-$(RESTORE_DATE).tar" -C "$DST"

# 4. Reinstall dependencies
npm --prefix "$DST" install

# 5. Verify import-safety of tools (C4-6)
for f in "$DST"/tools/*.js; do
  grep -qE 'require\.main === module|tool\(\)' "$f" || { echo "UNSAFE: $f"; exit 1; }
done

# 6. Record
echo "$(date -Iseconds) | Recovery | FS restored from $RESTORE_DATE" >> "$DST/logs/audit.log"
```

### Full system recovery (global re-deploy)

Use this when the entire `~/.config/opencode/` is lost (host failure,
accidental deletion). The cleanest path is a fresh deploy from the project
source; the backup is the fallback when the source is also gone.

```bash
# Preferred: re-deploy from project source of truth
cd /workplace/mcp/software-development-pipeline/Linux
git checkout v[known-good-version]
npm run deploy
# Then restore metrics.db + audit.log from backup (see database recovery)

# Fallback: restore the entire global tree from backup
DST="$HOME/.config/opencode"
BACKUP_DIR="[Backup Storage URL]"
mkdir -p "$DST"
tar -xf "$BACKUP_DIR/full-$(RESTORE_DATE).tar" -C "$DST"
npm --prefix "$DST" install
# Restore the measurement DB separately (it changes more often than fulls)
cp "$BACKUP_DIR/metrics.db.$(RESTORE_DATE)" "$DST/metrics/metrics.db"
sqlite3 "$DST/metrics/metrics.db" "PRAGMA integrity_check;"
# Restart opencode; smoke test
cd /tmp && npm --prefix "$DST" run pipeline
```

> After any full recovery, run the post-deployment verification checklist
> in `deployment-guide.md` before declaring the system healthy.

---

## RTO and RPO

| Asset | RPO (max data loss) | RTO (max downtime) | Basis |
| :--- | :--- | :--- | :--- |
| `metrics.db` | 24 hours (daily incremental) | 1 hour | SPC baseline tolerance |
| `audit.log` | 24 hours | 1 hour | R11 compliance trail |
| Global configs | 0 (regenerable from source) | 30 minutes | `npm run deploy` |
| Global scripts/skills/tools | 0 (regenerable from source) | 30 minutes | `npm run deploy` |
| Project source/specs/docs | 0 (git) | 15 minutes | `git clone` |
| Full system (host loss) | 24 hours | 4 hours | Fresh host + deploy + DB restore |

- **RPO** for `metrics.db` is bounded by the daily incremental. To tighten
  it, increase incremental frequency or take a pre-build snapshot.
- **RTO** assumes the operator is available and the backup is verified. An
  unverified backup extends RTO indefinitely; verify regularly.

---

## Disaster Recovery Scenarios

| Scenario | Trigger | Primary Response | Fallback |
| :--- | :--- | :--- | :--- |
| `metrics.db` corruption | SQL errors on analytics | DB recovery (above) | Restore from prior valid backup |
| Accidental `metrics.db` deletion | File missing | Restore from daily incremental | Re-baseline SPC from `audit.log` history |
| Hand-edited global (R14 violation) | Globals diverge from source | `npm run deploy` to overwrite | File-system recovery from backup |
| Host failure (disk loss) | Host unreachable | Provision new host; re-deploy from source | Full system recovery from off-host backup |
| Site failure (local + NAS lost) | Site unreachable | Provision at DR site; restore off-host backup | Declared disaster; invoke DR plan |
| Ransomware / compromise | Suspicious encrypt/modify | Isolate; rebuild from clean backup; rotate secrets | Forensics; see `../05_Security_Compliance/sec-hardening.md` |
| Deploy script corruption | `npm run deploy` fails | Manual fallback (`deployment-guide.md`) | Restore script from backup; re-deploy |

### DR failover (warm standby)

The DR environment at `[DR Environment URL]` is a warm standby. Quarterly:

1. Replicate the latest off-host backup to the DR site.
2. Perform a full system recovery on the DR host.
3. Run the post-deployment verification checklist.
4. Run `npm run pipeline` end-to-end on DR.
5. Record the failover test result in `logs/audit.log`.

A failed DR test is a BLOCKING defect — fix before the next quarter.

---

## Testing the Backup Process

| Test | Frequency | Steps | Pass Criterion |
| :--- | :--- | :--- | :--- |
| Integrity check | Every backup | `PRAGMA integrity_check`; checksum verify | `ok`; checksums match |
| Restore test (DB) | Monthly | Restore `metrics.db` to isolated env; run spc + predict | Both exit 0; output sensible |
| Restore test (full) | Quarterly | Full system recovery to an isolated host; run pipeline | `Pipeline \| SUCCESS` in audit.log |
| DR failover | Quarterly | Recover at DR site; run verification | All checks green |
| Restore time drill | Annually | Time a full recovery against the RTO | Within RTO (4 hours) |

> Every test result is recorded in `logs/audit.log` (R11). A test that
> fails is treated as an incident — see `runbook.md` section 5.

---

## Contact Escalation

| Severity | Role | Contact | Response Expectation |
| :--- | :--- | :--- | :--- |
| P1 — data loss / DR | Administrator on-call | `[on-call contact]` | Immediate (24x7) |
| P2 — backup failure | Operator on-call | `[on-call contact]` | < 1 hour |
| P3 — verification failure | Operator (business hours) | `[operator contact]` | < 4 hours |
| P4 — retention/prune issue | Operator (business hours) | `[operator contact]` | Next business day |
| Security dimension | Security lead | `[security contact]` | Per `../05_Security_Compliance/sec-hardening.md` |

Escalate up one level if the response expectation is missed. All
escalations are logged in `logs/audit.log`.

---

## Related Documentation

- `deployment-guide.md` — deployment and rollback procedures (recovery's complement)
- `runbook.md` — incident response and day-2 operations
- `../05_Security_Compliance/sec-hardening.md` — encryption, access control, and secrets handling for backups
- `../06_User_Reference/glossary.md` — terminology (R10, R11, R14, SPC, RPO, RTO, etc.)

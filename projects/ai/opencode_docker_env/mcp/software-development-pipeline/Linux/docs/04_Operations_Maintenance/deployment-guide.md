# Deployment Guide

**Class**: 5 (Ops/User) | **Persona**: Operator / Release Engineer

## Table of Contents

1. [Overview](#overview)
2. [Environments](#environments)
3. [Prerequisites](#prerequisites)
4. [Deployment Strategies](#deployment-strategies)
5. [Deployment Procedures](#deployment-procedures)
6. [Rollback Procedures](#rollback-procedures)
7. [Environment Promotion Workflow](#environment-promotion-workflow)
8. [Post-Deployment Verification](#post-deployment-verification)
9. [Troubleshooting](#troubleshooting)
10. [Deployment Checklist](#deployment-checklist)
11. [Deployment Calendar Template](#deployment-calendar-template)
12. [Related Documentation](#related-documentation)

---

## Overview

This guide defines the deployment procedures for the CMMI Level 4 DevSecOps
pipeline (Node.js LTS). Deployment is the controlled promotion of the pipeline
from the project source of truth (`/workplace/mcp/software-development-pipeline/Linux`)
to the global install at `~/.config/opencode/` and, where applicable, to
containerized or orchestrated runtime targets.

The pipeline enforces mandatory security gates (R7-R11, R16-R19) and
Statistical Process Control (C4-3). A deployment is only considered complete
when all gates are green and the post-deployment verification checklist
passes. See `../02_Setup_Configuration/setup-guide.md` for the initial
environment setup this guide builds upon.

> **R14 HARD RULE**: All resources are mirrored to `~/.config/opencode/` via
> the scripted deploy. Never hand-edit a global resource — a hand-edited
> global is a BLOCKING defect (R10).

---

## Environments

The pipeline is promoted across four environments. Each environment has an
isolated configuration, its own `metrics/metrics.db`, and its own
`logs/audit.log`.

| Environment | Purpose | URL | Gate Enforcement | Data Sensitivity |
| :--- | :--- | :--- | :--- | :--- |
| **dev** | Developer integration; first full pipeline run | `[Dev Environment URL]` | All gates, non-blocking warnings allowed | Synthetic data only |
| **staging** | Pre-production mirror; release candidate validation | `[Staging Environment URL]` | All gates mandatory (R10 blocking) | Anonymized production-like |
| **production** | Live organizational system of record | `[Production Environment URL]` | All gates mandatory (R10 blocking) + SPC excursion check | Production data |
| **DR** | Disaster recovery warm standby | `[DR Environment URL]` | All gates on failover | Replicated production data |

> Environment URLs, credentials, and access tokens MUST be supplied via
> environment variables or a secrets manager — never committed to the tree
> (R7). Use `[Environment URL]` placeholders in shared docs and resolve them
> in the environment-specific runbook.

Each environment maintains its own `metrics.db` so SPC baselines (C4-3) are
not cross-contaminated. Promotion copies artifacts, not measurement history.

---

## Prerequisites

Before executing any deployment, confirm the following.

### Access

- Commit access to the project source of truth repository.
- Write access to `~/.config/opencode/` on the target host.
- Credentials for `[Backup Storage URL]` (see `backup-recovery.md`).
- Notification channel credentials (Telegram bot token for R18, if enabled).
- For orchestrated targets: cluster admin role (`kubectl`/`docker`).

### Tools

| Tool | Minimum Version | Verification Command |
| :--- | :--- | :--- |
| Node.js | LTS (v20+) | `node --version` |
| npm | v10+ | `npm --version` |
| docker | v24+ (containerized targets only) | `docker --version` |
| kubectl | v1.28+ (orchestrated targets only) | `kubectl version --client` |
| git | v2.30+ | `git --version` |
| sqlite3 | v3.35+ | `sqlite3 --version` |

```bash
# One-shot prerequisite check
node --version && npm --version && git --version && sqlite3 --version
# Optional, only for containerized/orchestrated deployments:
docker --version && kubectl version --client
```

### Source state

The project source must be on a tagged release commit with a clean tree:

```bash
git status --porcelain         # must be empty
git describe --tags            # must resolve to a release tag, e.g. v2.3.1
```

---

## Deployment Strategies

Three strategies are supported. The choice is recorded in the release plan
and must be approved for production by the release engineer.

| Strategy | Description | Best For | Downtime |
| :--- | :--- | :--- | :--- |
| **Rolling update** | Incrementally replace instances with the new version | Stateless services, backward-compatible changes | None |
| **Blue/green** | Stand up new (green) alongside current (blue); switch traffic | Risky changes requiring instant rollback | None (switch) |
| **Canary** | Route a small % of traffic to new version; expand on health | High-risk changes needing real-world validation | None |

### Pros and cons

| Strategy | Pros | Cons |
| :--- | :--- | :--- |
| Rolling update | Simple; no extra capacity; gradual rollout | Slow rollback; mixed versions briefly coexist |
| Blue/green | Instant switch/rollback; full pre-switch testing | Requires 2x capacity; stateful data migration is hard |
| Canary | Limits blast radius; real traffic validation | Complex routing; longer total deployment time |

> For the global pipeline install (`~/.config/opencode/`), the effective
> strategy is **blue/green by directory**: deploy into a staging copy,
> verify gates, then atomically swap. The scripted path below implements
> this.

---

## Deployment Procedures

### Automated deployment (preferred)

The scripted path runs `scripts/deploy-global.sh` via `npm run deploy`. It is
non-destructive, refuses unsafe `tools/*.js` (C4-6), and records the deploy
in `logs/audit.log` (R11).

```bash
# 1. From the project source of truth, on a tagged release commit
git checkout v[version]
git status --porcelain                 # clean tree required

# 2. Run the full gate suite BEFORE deploying (R8/R9/R10)
npm run audit                          # R9 SCA gate
npm run lint                           # R8 SAST gate
npm run test                           # behavior gate

# 3. Deploy to the global install (R14)
npm run deploy

# 4. Restart opencode so new config/skills/commands load
#    (platform-specific; see ../02_Setup_Configuration/setup-guide.md)

# 5. Smoke test the global install from ANY directory
cd /tmp && npm --prefix "$HOME/.config/opencode" run pipeline
```

The deploy script performs, in order:

1. Validates every `tools/*.js` is import-safe (`require.main === module`
   guard or `tool()` export) — refuses on violation (C4-6, R10 BLOCKING).
2. Generates `opencode.jsonc` and `package.json` from project templates.
3. Mirrors scripts, skills, commands, tools, configs, and templates to
   `~/.config/opencode/`.
4. Runs `npm install` for global dependencies.
5. Appends a `Deploy | SUCCESS` line to `logs/audit.log`.

### Manual fallback

If the scripted deploy is unavailable (script corruption, restricted shell),
perform the manual fallback. This is exceptional and must be logged.

```bash
# Define source and target
SRC="/workplace/mcp/software-development-pipeline/Linux"
DST="$HOME/.config/opencode"

# 1. Verify import-safety of every tools/*.js manually (C4-6)
for f in "$SRC"/tools/*.js; do
  grep -qE 'require\.main === module|tool\(\)' "$f" \
    || { echo "UNSAFE tool: $f"; exit 1; }
done

# 2. Mirror resources (non-destructive; do not delete unknown files)
mkdir -p "$DST"/{scripts,skills,commands,tools,metrics,logs,rules,templates}
cp -v "$SRC"/scripts/*.{sh,js,json} "$DST/scripts/" 2>/dev/null || true
cp -v "$SRC"/.opencode/skills/*/SKILL.md "$DST/skills/" 2>/dev/null || true
cp -v "$SRC"/.opencode/commands/*.md "$DST/commands/" 2>/dev/null || true
cp -v "$SRC"/tools/*.js "$DST/tools/" 2>/dev/null || true
cp -v "$SRC"/.eslintrc.js "$DST/" 2>/dev/null || true
cp -v "$SRC"/AGENTS.md "$DST/" 2>/dev/null || true

# 3. Install global dependencies
npm --prefix "$DST" install

# 4. Record the manual deploy (R11)
echo "$(date -Iseconds) | Manual-Deploy | SUCCESS" >> "$DST/logs/audit.log"
```

> A manual deploy skips config generation. Prefer the scripted path; if a
> manual deploy was necessary, file a follow-up to repair the deploy script
> and re-run `npm run deploy` at the next opportunity.

---

## Rollback Procedures

### Automated rollback

Because the global install is a generated mirror of the project source,
rollback is a source-level operation: check out the previous tag and re-deploy.

```bash
# 1. Identify the last known-good tag
git tag --sort=-creatordate | head -5

# 2. Check out the previous good release
git checkout v[previous-version]

# 3. Re-deploy
npm run deploy

# 4. Restart opencode and smoke test
cd /tmp && npm --prefix "$HOME/.config/opencode" run pipeline
```

### Manual rollback

If re-deploy itself is the failure (e.g., a broken deploy script), restore
the global install from the most recent backup (see `backup-recovery.md`):

```bash
DST="$HOME/.config/opencode"
BACKUP_DIR="[Backup Storage URL]/opencode/$(date +%Y%m%d)"

# 1. Stop any running pipeline / opencode
# 2. Restore the global tree
cp -av "$BACKUP_DIR/." "$DST/"

# 3. Verify import-safety of tools (C4-6)
for f in "$DST"/tools/*.js; do
  grep -qE 'require\.main === module|tool\(\)' "$f" \
    || { echo "UNSAFE tool: $f"; exit 1; }
done

# 4. Record the rollback (R11)
echo "$(date -Iseconds) | Rollback | SUCCESS from $BACKUP_DIR" >> "$DST/logs/audit.log"
```

> Rollback of `metrics.db` is a destructive action that erases post-rollback
> build history. Only restore the database if it was corrupted; otherwise
> preserve the current SPC baseline. See `backup-recovery.md` for the
> database-only restore path.

---

## Environment Promotion Workflow

Promotion flows strictly dev → staging → production. DR is a replication
target, not a promotion step.

```
[project source, tagged release]
        |
        v
   dev (full pipeline, gates warn-only on first run)
        |  release candidate signed off
        v
   staging (all gates mandatory R10; SPC baseline re-confirmed)
        |  release engineer approval
        v
   production (all gates + SPC excursion check + stakeholder notification)
        |  async replication
        v
   DR (warm standby; verified by periodic failover test)
```

### Promotion steps

1. **dev → staging**: Tag the dev-validated commit as `v[version]-rc.N`.
   Run `npm run deploy` against the staging host. Confirm all gates green.
2. **staging → production**: Promote the exact same artifact (same tag).
   Re-run the full pipeline on the production host. Confirm SPC density
   ≤ UCL (C4-3). Send stakeholder notification (R18).
3. **production → DR**: Verified by a scheduled failover test (quarterly),
   not by every promotion. See `backup-recovery.md` for DR scenarios.

> Never promote a build that exited non-zero or that shows a `BLOCKED (R10)`
> line in `logs/audit.log`. A promotion across this boundary is a BLOCKING
> defect.

---

## Post-Deployment Verification

Run this checklist after every deployment, in every environment.

| # | Check | Command / Location | Pass Criterion |
| :--- | :--- | :--- | :--- |
| 1 | Lint gate (R8) | `npm run lint` | Exit 0, 0 warnings |
| 2 | Test gate | `npm run test` | Exit 0, coverage ≥ baseline |
| 3 | SCA gate (R9) | `npm run audit` | Exit 0, 0 high/critical |
| 4 | Full pipeline | `npm run pipeline` | Exit 0 |
| 5 | Audit trail | `logs/audit.log` | Ends with `Pipeline \| SUCCESS` |
| 6 | No blocking flags | `logs/audit.log` | No `BLOCKED (R10)` entries |
| 7 | SPC in control | `metrics/spc-report.md` | density ≤ UCL (C4-3) |
| 8 | Readiness forecast | `npm run predict` | forecast ≤ 0.5 goal |
| 9 | Import-safety | `tools/*.js` | All guarded (C4-6) |
| 10 | No hand-edited globals | `~/.config/opencode/` | Diff vs deploy output empty |

```bash
# Combined verification one-liner
npm run lint && npm run test && npm run audit && npm run pipeline \
  && tail -n 5 "$HOME/.config/opencode/logs/audit.log"
```

If any check fails, do not declare the deployment complete. Open an incident
per `runbook.md` section 5 and consider rollback.

---

## Troubleshooting

| Symptom | Likely Cause | Resolution |
| :--- | :--- | :--- |
| Deploy refuses with `UNSAFE tool` | A `tools/*.js` lacks the `require.main === module` guard (C4-6) | Add the guard or a `tool()` export; re-run `npm run deploy` |
| `npm run deploy` exits 1, no audit line | Deploy script corrupted or missing dependency | Use manual fallback; repair script; re-deploy |
| opencode crashes on startup (`Failed to fetch`) | Non-import-safe tool imported in-process | Remove/fix the offending `tools/*.js`; re-deploy; restart |
| Pipeline exits 1, `BLOCKED (R10)` in audit.log | A mandatory gate failed (lint/test/audit/SPC) | Read the `[FAIL]` line; fix root cause; re-run pipeline |
| SPC excursion after deploy (`density > UCL`) | New defects introduced by the release | Do not promote; investigate; apply remediation (C4-5) |
| `metrics.db` SQL errors | DB corruption or mid-write copy | Restore from backup (`backup-recovery.md`); re-run `npm run spc` |
| Notification (R18) silent | Telegram token missing/invalid | Verify env var; test `scripts/notify.js` manually |
| Globals diverge from source | A global file was hand-edited (R14 violation) | Re-run `npm run deploy`; review git history for the edit |

For alert-driven triage of post-deploy anomalies, see `mon-alert-guide.md`.

---

## Deployment Checklist

### Pre-deploy

- [ ] Source on a tagged release commit; `git status` clean
- [ ] Prerequisites verified (node, npm, sqlite3; docker/kubectl if needed)
- [ ] `npm run audit`, `npm run lint`, `npm run test` all green
- [ ] Release plan approved; strategy (rolling/blue-green/canary) recorded
- [ ] Backup of current global install taken (`backup-recovery.md`)
- [ ] Stakeholders notified of deployment window (R18)
- [ ] Rollback tag identified and verified checkoutable

### Deploy

- [ ] `npm run deploy` completed; exit 0
- [ ] `Deploy | SUCCESS` line present in `logs/audit.log`
- [ ] opencode restarted; new config/skills/commands loaded
- [ ] (Manual fallback only) import-safety re-checked; audit line appended

### Post-deploy

- [ ] Full verification checklist (section above) all green
- [ ] SPC in control; readiness forecast ≤ goal
- [ ] No `BLOCKED (R10)` entries in audit.log
- [ ] Smoke test from a neutral directory (`/tmp`) passed
- [ ] Stakeholders notified of completion (R18)
- [ ] Deploy recorded against the release tag in the deployment calendar

---

## Deployment Calendar Template

Maintain one row per deployment. This is the auditable history of what was
promoted where, and when (supports R11).

| Date (UTC) | Tag | Environment | Strategy | Engineer | Gates | Result | Rollback? | Notes |
| :--- | :--- | :--- | :--- | :--- | :--- | :--- | :--- | :--- |
| `[YYYY-MM-DD HH:MM]` | `v[x.y.z]` | dev | rolling | `[name]` | all green | SUCCESS | no | first run on new host |
| `[YYYY-MM-DD HH:MM]` | `v[x.y.z]-rc.1` | staging | blue/green | `[name]` | all green | SUCCESS | no | RC validated |
| `[YYYY-MM-DD HH:MM]` | `v[x.y.z]` | production | canary | `[name]` | all green | SUCCESS | no | canary 10%→100% |
| `[YYYY-MM-DD HH:MM]` | `v[x.y.z]` | DR | n/a (failover test) | `[name]` | n/a | SUCCESS | no | quarterly DR test |
| `[YYYY-MM-DD HH:MM]` | `v[x.y.z]` | production | n/a | `[name]` | SPC excursion | ROLLBACK | yes | density > UCL |

---

## Related Documentation

- `backup-recovery.md` — backup schedule and recovery procedures (rollback data source)
- `mon-alert-guide.md` — alerting configuration and triage for post-deploy anomalies
- `runbook.md` — day-2 operations and incident response
- `../02_Setup_Configuration/setup-guide.md` — initial environment setup (prerequisite)
- `../06_User_Reference/glossary.md` — terminology (R10, R14, SPC, UCL, etc.)

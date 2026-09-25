# Incident Postmortem Template

**Class**: 5 (Ops/User) | **Persona**: Operator / Maintainer

> **How to use this template**: Copy this file to
> `docs/04_Operations_Maintenance/incidents/INC-[YYYYMMDD]-[slug].md`,
> replace every `[Fill in]` placeholder, and remove this note before
> publishing. This is a **blameless** postmortem: focus on systems and
> processes, not individuals. See `mon-alert-guide.md` for the alert
> thresholds that should have fired and `runbook.md` for the response
> procedures.

## Table of Contents

1. [Frontmatter](#frontmatter)
2. [Executive Summary](#1-executive-summary)
3. [Timeline](#2-timeline)
4. [Root Cause Analysis](#3-root-cause-analysis)
5. [Resolution Steps](#4-resolution-steps)
6. [Contributing Factors](#5-contributing-factors)
7. [Detection & Monitoring Gaps](#6-detection--monitoring-gaps)
8. [Action Items](#7-action-items)
9. [Lessons Learned](#8-lessons-learned)
10. [Follow-Up Reviews](#9-follow-up-reviews)
11. [Severity Definitions](#severity-definitions)
12. [Incident Classification](#incident-classification)
13. [Stakeholder Communication Templates](#stakeholder-communication-templates)
14. [Related Documentation](#related-documentation)

---

## Frontmatter

| Field | Value |
| :--- | :--- |
| **Incident ID** | `[Fill in]` (e.g. INC-20260813-001) |
| **Date/Time (UTC)** | Started `[Fill in]` — Ended `[Fill in]` |
| **Severity** | `[Fill in]` (P1 / P2 / P3 / P4 — see [Severity Definitions](#severity-definitions)) |
| **Duration** | `[Fill in]` (e.g. 2h 14m) |
| **Impact** | `[Fill in]` — describe affected environments, users, data, and gates |
| **Detectability** | `[Fill in]` — how detected (alert / user report / routine check); could it have been detected sooner? |
| **Incident Lead** | `[Fill in]` |
| **Communications Lead** | `[Fill in]` |
| **Affected Environments** | `[Fill in]` (dev / staging / production / DR) |
| **Classification** | `[Fill in]` (see [Incident Classification](#incident-classification)) |
| **Status** | `[Fill in]` (Draft / In Review / Closed) |

---

## 1. Executive Summary

`[Fill in: 2-4 sentences. What happened, when, the impact, the root cause
at a high level, and the resolution. Write this last so it accurately
reflects the rest of the document. Keep it free of jargon that a
non-engineering stakeholder would not understand.]`

**Impact summary**:

- Environments affected: `[Fill in]`
- Users/teams impacted: `[Fill in]`
- Data impact: `[Fill in]` (none / partial / loss — quantify)
- Gate impact: `[Fill in]` (e.g. R10 blocks, SPC excursion, missed R11 trail)
- Duration of impact: `[Fill in]`

---

## 2. Timeline

Chronological record of the incident. All times in UTC. Include detection,
response, mitigation, resolution, and communication milestones. Be precise —
this timeline feeds the R11 audit trail in `logs/audit.log`.

| Time (UTC) | Event | Actor |
| :--- | :--- | :--- |
| `[Fill in]` | `[Fill in: e.g. Alert fired — density > UCL in spc-report.md]` | `[Fill in: system / role]` |
| `[Fill in]` | `[Fill in: e.g. First responder acknowledged alert]` | `[Fill in: role]` |
| `[Fill in]` | `[Fill in: e.g. Investigation began; audit.log reviewed]` | `[Fill in: role]` |
| `[Fill in]` | `[Fill in: e.g. Root cause identified]` | `[Fill in: role]` |
| `[Fill in]` | `[Fill in: e.g. Mitigation applied — rollback to v[previous]]` | `[Fill in: role]` |
| `[Fill in]` | `[Fill in: e.g. Stakeholders notified (initial)]` | `[Fill in: role]` |
| `[Fill in]` | `[Fill in: e.g. Verification passed — pipeline SUCCESS]` | `[Fill in: role]` |
| `[Fill in]` | `[Fill in: e.g. Incident declared resolved]` | `[Fill in: role]` |
| `[Fill in]` | `[Fill in: e.g. Status update sent]` | `[Fill in: role]` |
| `[Fill in]` | `[Fill in: e.g. Resolution notification sent]` | `[Fill in: role]` |

> Attach relevant excerpts from `logs/audit.log` as an appendix. Do not
> paraphrase the audit trail — quote the exact lines with timestamps.

---

## 3. Root Cause Analysis

Use the **5 Whys** or a fishbone diagram. The goal is the systemic cause,
not a person to blame.

### 5 Whys

1. **Why did the incident occur?** `[Fill in]`
2. **Why did that happen?** `[Fill in]`
3. **Why did that happen?** `[Fill in]`
4. **Why did that happen?** `[Fill in]`
5. **Why did that happen (root cause)?** `[Fill in]`

### Root cause statement

`[Fill in: One or two sentences stating the systemic root cause. e.g.
"The deploy script did not validate import-safety of tools/*.js before
mirroring, so an unsafe tool was promoted and crashed opencode on startup
(C4-6)."]`

### Causal chain

```
[Trigger] -> [Intermediate cause] -> [Intermediate cause] -> [Impact]
`[Fill in]` -> `[Fill in]` -> `[Fill in]` -> `[Fill in]`
```

> If multiple root causes contributed, document each. Resist the urge to
> pick a single cause when the failure was a chain.

---

## 4. Resolution Steps

Ordered list of the actions that restored service. Each step should map to
a timeline entry and, where applicable, an `audit.log` line.

1. `[Fill in: e.g. Stopped the running pipeline and opencode.]`
2. `[Fill in: e.g. Identified the failing gate from the [FAIL] line in audit.log.]`
3. `[Fill in: e.g. Checked out rollback tag v[previous-version] per deployment-guide.md.]`
4. `[Fill in: e.g. Ran npm run deploy to regenerate and mirror globals (R14).]`
5. `[Fill in: e.g. Restored metrics.db from pre-deploy backup per backup-recovery.md.]`
6. `[Fill in: e.g. Ran full verification — lint, test, audit, pipeline all green.]`
7. `[Fill in: e.g. Confirmed SPC density <= UCL and restart opencode.]`
8. `[Fill in: e.g. Recorded resolution in logs/audit.log (R11).]`

```bash
# Key commands used in the resolution (paste the actual commands run)
[FILL IN: command 1]
[FILL IN: command 2]
[FILL IN: command 3]
```

> Note any commands that did NOT work as expected and why. Future responders
> need to know the dead ends, not just the path that worked.

---

## 5. Contributing Factors

Factors that did not cause the incident directly but made it worse, harder
to detect, or slower to resolve.

| Factor | How It Contributed | Severity |
| :--- | :--- | :--- |
| `[Fill in: e.g. No alert on tools/*.js import-safety]` | `[Fill in: incident detected only at opencode startup crash]` | `[Fill in]` |
| `[Fill in: e.g. Stale backup (26h old)]` | `[Fill in: lost one day of build history on DB restore]` | `[Fill in]` |
| `[Fill in: e.g. Runbook lacked this scenario]` | `[Fill in: responder improvised; added 30m to resolution]` | `[Fill in]` |
| `[Fill in]` | `[Fill in]` | `[Fill in]` |

> Contributing factors are systemic. Do not list individual actions here;
> those belong in the timeline. This section answers "why was the impact
> bigger or the response slower than it should have been?"

---

## 6. Detection & Monitoring Gaps

| Gap | Current Detection | Expected Detection | Fix |
| :--- | :--- | :--- | :--- |
| `[Fill in]` | `[Fill in: e.g. manual review only]` | `[Fill in: e.g. automated alert]` | `[Fill in: action ref]` |
| `[Fill in]` | `[Fill in]` | `[Fill in]` | `[Fill in]` |
| `[Fill in]` | `[Fill in]` | `[Fill in]` | `[Fill in]` |

Cross-reference `mon-alert-guide.md` for the alerting configuration that
should be added or tuned. Cross-reference `runbook.md` for the response
procedure that should be added or clarified.

> If the incident was detected by a user report rather than an alert, this
> section is the most important part of the postmortem.

---

## 7. Action Items

Every action item has an owner, a priority, and a deadline. An action item
without an owner is a wish, not a commitment.

| ID | Action | Owner | Priority | Deadline | Status |
| :--- | :--- | :--- | :--- | :--- | :--- |
| AI-1 | `[Fill in: e.g. Add import-safety pre-check to deploy script]` | `[Fill in]` | P1 | `[Fill in: date]` | Open |
| AI-2 | `[Fill in: e.g. Add alert for tools/*.js guard regression]` | `[Fill in]` | P1 | `[Fill in: date]` | Open |
| AI-3 | `[Fill in: e.g. Increase backup frequency to hourly incremental]` | `[Fill in]` | P2 | `[Fill in: date]` | Open |
| AI-4 | `[Fill in: e.g. Add this scenario to runbook.md section 5]` | `[Fill in]` | P2 | `[Fill in: date]` | Open |
| AI-5 | `[Fill in]` | `[Fill in]` | `[Fill in]` | `[Fill in]` | Open |

**Priority guide**: P1 = prevent recurrence (do first); P2 = reduce impact
/ detection time; P3 = improve hygiene.

> Action items are tracked to closure in the [Follow-Up Reviews](#9-follow-up-reviews)
> section. An incident is not Closed until all P1 items are Done.

---

## 8. Lessons Learned

### What went well

- `[Fill in: e.g. The audit.log (R11) made timeline reconstruction trivial.]`
- `[Fill in]`
- `[Fill in]`

### What went poorly

- `[Fill in: e.g. Detection relied on a user report; no alert fired.]`
- `[Fill in]`
- `[Fill in]`

### Where we got lucky

- `[Fill in: e.g. The rollback tag was still checkoutable; no force-push had cleaned it.]`
- `[Fill in]`

> "Where we got lucky" is the most valuable section for preventing the next
> incident — luck is not a control. Each lucky break should become an
> action item that removes the dependence on luck.

---

## 9. Follow-Up Reviews

| Review | Date | Scope | Owner | Outcome |
| :--- | :--- | :--- | :--- | :--- |
| 1-week review | `[Fill in: date]` | Confirm AI-1..AI-3 in progress | `[Fill in]` | `[Fill in]` |
| 1-month review | `[Fill in: date]` | Confirm all P1 items Done; SPC stable | `[Fill in]` | `[Fill in]` |
| 3-month review | `[Fill in: date]` | Confirm no recurrence; all items Done | `[Fill in]` | `[Fill in]` |

**Closure criteria**:

- [ ] All P1 action items are Done and verified
- [ ] No recurrence in the 3-month window
- [ ] SPC density within UCL (C4-3) for the full window
- [ ] `logs/audit.log` shows no related `BLOCKED (R10)` entries
- [ ] Detection gap fixes confirmed live in `mon-alert-guide.md`
- [ ] Runbook updates confirmed live in `runbook.md`

> The incident Status moves to Closed only when the closure criteria are
> met and signed off by the Incident Lead.

---

## Severity Definitions

| Severity | Description | Response Time | Escalation |
| :--- | :--- | :--- | :--- |
| **P1** | Critical — production down, data loss, or security breach. Full outage of a production environment; SPC baseline corrupted; secrets leaked. | Immediate (24x7) | Incident Lead → Administrator on-call → `[escalation contact]` |
| **P2** | High — major function degraded; a mandatory gate (R10) is blocking all builds; SPC excursion (density > UCL). | < 1 hour | Incident Lead → Operator on-call |
| **P3** | Medium — minor function degraded; a single gate failing non-blockingly; degraded but recovering. | < 4 hours (business hours) | Operator |
| **P4** | Low — cosmetic or non-urgent; documentation gap; warning-level SPC trend (C4-5) with no excursion. | Next business day | Operator (ticket) |

> Severity can change during an incident. Record every severity change in
> the timeline with the reason. The final severity drives the follow-up
> review cadence.

---

## Incident Classification

Select exactly one primary classification (and any secondary).

| Type | Description | Typical Severity | Related Doc |
| :--- | :--- | :--- | :--- |
| **Service outage** | opencode or the pipeline is unavailable; `opencode run` exits 1; `Failed to fetch` | P1/P2 | `runbook.md` |
| **Data loss** | `metrics.db` corrupted, deleted, or partially lost; SPC/prediction baseline affected | P1 | `backup-recovery.md` |
| **Security breach** | Secrets in tree, `.env` leaked, unauthorized access, R7/R16-R19 failure | P1 | `../05_Security_Compliance/sec-hardening.md` |
| **Performance degradation** | Pipeline runs but cycle-time SPC trends up beyond 2σ; builds slow | P3 | `mon-alert-guide.md` |
| **Deployment failure** | `npm run deploy` fails or promotes a broken version; rollback required | P1/P2 | `deployment-guide.md` |

**Primary classification**: `[Fill in]`
**Secondary classification(s)**: `[Fill in]`

---

## Stakeholder Communication Templates

Use these templates for incident communications. Replace `[Fill in]` and
send via the configured notification channel (R18). Keep stakeholders
informed at detection, during prolonged impact, and at resolution.

### Initial notification

```text
Subject: [INC-[ID]] [P1/P2/P3/P4] [brief description] — investigation underway

An incident has been detected affecting [environments impacted].

- Incident ID: [Fill in]
- Severity: [Fill in]
- Start time (UTC): [Fill in]
- Impact: [Fill in — what is broken / who is affected]
- Current status: Investigating
- Incident Lead: [Fill in]
- Next update: [Fill in — time, e.g. +30 min]

We are investigating and will share an update by [time]. For questions,
contact [Communications Lead]. This message was sent per R18.
```

### Status update

```text
Subject: [INC-[ID]] UPDATE [N] — [current status]

Update on incident INC-[ID] (severity [P1/P2/P3/P4]).

- Current status: [Investigating / Mitigating / Monitoring / Resolved]
- Time since start: [Fill in]
- What we know: [Fill in — brief, factual]
- What we are doing: [Fill in]
- Impact now: [Fill in — unchanged / reduced / escalated]
- Next update: [Fill in — time]

This message was sent per R18.
```

### Resolution notification

```text
Subject: [INC-[ID]] RESOLVED — [brief description]

Incident INC-[ID] has been resolved.

- Severity: [Fill in]
- Duration: [Fill in]
- Impact: [Fill in — final summary of what was affected]
- Root cause: [Fill in — one sentence]
- Resolution: [Fill in — one sentence]
- Verification: [Fill in — e.g. full pipeline green, SPC in control]
- Follow-up: A blameless postmortem is published at
  docs/04_Operations_Maintenance/incidents/INC-[YYYYMMDD]-[slug].md.
  Action items are tracked to closure.

No further updates will be sent for this incident. This message was sent
per R18.
```

> Communications are logged in `logs/audit.log` alongside the technical
> response (R11). A stakeholder notification without a matching audit
> entry is an incomplete record.

---

## Related Documentation

- `mon-alert-guide.md` — alert thresholds, detection gaps, and alert tuning
- `runbook.md` — incident response procedures and day-2 operations
- `backup-recovery.md` — backup and recovery procedures for data-loss incidents
- `../05_Security_Compliance/sec-hardening.md` — security incident handling and secrets rotation
- `../06_User_Reference/glossary.md` — terminology (P1-P4, R7-R11, R14, R18, SPC, UCL, etc.)

# Service Level Objectives (SLOs)

## Table of Contents

- [Introduction](#introduction)
- [Service Level Indicators (SLIs)](#service-level-indicators-slis)
- [Service Level Objectives (SLOs)](#service-level-objectives-slos)
- [Error Budgets](#error-budgets)
- [SLO Violation Response Plan](#slo-violation-response-plan)
- [Monitoring and Alerting](#monitoring-and-alerting)
- [SLO Review Cadence](#slo-review-cadence)
- [Historical SLO Performance](#historical-slo-performance)
- [SLO Improvement Plan](#slo-improvement-plan)
- [Cross-References](#cross-references)

---

## Introduction

This document defines the Service Level Objectives (SLOs) for the CMMI Level 4
DevSecOps pipeline and its runtime artifacts. SLOs are quantitative,
user-facing reliability targets. They are distinct from internal performance
budgets and from any contractual Service Level Agreements (SLAs) that may
exist with consumers.

**Definitions:**

- **SLI (Service Level Indicator):** A quantitative measure of a service
  behavior (e.g., the ratio of successful requests to total requests).
- **SLO (Service Level Objective):** A target value or range for an SLI,
  measured over a compliance window (e.g., 99.9% availability over 30 days).
- **SLA (Service Level Agreement):** A contractual agreement with a consumer
  that may include consequences (credits, penalties) for breach. SLA targets
  are always looser than SLO targets to preserve margin.
- **Error Budget:** The allowable amount of unreliability implied by an SLO.
  See [Error Budgets](#error-budgets).

SLOs here align with the CMMI Level 4 quantitative goals (C4-1). Where a C4-1
metric (e.g., build stability ≥ 98%) overlaps an SLO, the stricter target
governs.

---

## Service Level Indicators (SLIs)

The pipeline tracks four core SLIs. Each SLI has a definition (the measurement
method) and a source (where the measurement is recorded).

| SLI | Definition | Source | Compliance Window |
| :--- | :--- | :--- | :--- |
| **Availability** | `1 − (failed_requests / total_requests)` as a percentage | `metrics/metrics.db` (request counters) | Rolling 30 days |
| **Latency (p50)** | 50th-percentile request duration | `metrics/metrics.db` (latency histogram) | Rolling 7 days |
| **Latency (p95)** | 95th-percentile request duration | `metrics/metrics.db` (latency histogram) | Rolling 7 days |
| **Latency (p99)** | 99th-percentile request duration | `metrics/metrics.db` (latency histogram) | Rolling 7 days |
| **Error rate** | `failed_requests / total_requests` | `metrics/metrics.db` | Rolling 30 days |
| **Throughput** | `total_requests / measurement_window_seconds` | `metrics/metrics.db` | Rolling 24 hours |

**Measurement notes:**

- A "request" is a single invocation of a pipeline phase or an API call to a
  runtime service, depending on the surface. The scope is stated per SLO below.
- "Failed" means the request returned a non-2xx HTTP status, exited non-zero,
  or violated an internal correctness assertion.
- Latency is measured wall-clock from request receipt to final response byte.
- Percentiles are computed over the full population when tractable; for very
  high volumes, a t-digest sketch is used.

**SLI computation example (Node.js):**

```javascript
function computeAvailability(samples) {
  const total = samples.length;
  const failed = samples.filter(s => s.status >= 500).length;
  return 1 - (failed / total); // 0.999 = 99.9%
}

function percentile(sortedValues, p) {
  const idx = Math.ceil((p / 100) * sortedValues.length) - 1;
  return sortedValues[Math.max(0, idx)];
}
```

---

## Service Level Objectives (SLOs)

Each SLI has a corresponding SLO. Targets use `[X%]` placeholders to be set
per deployment; the values below are the project defaults.

| SLO | SLI | Target | Compliance Window | Implication if Breached |
| :--- | :--- | :--- | :--- | :--- |
| **SLO-AVAIL** | Availability | [99.9%] | Rolling 30 days | User-visible outages; error budget exhausted |
| **SLO-LAT-P50** | Latency p50 | [< 100ms] | Rolling 7 days | Most users experience slowness |
| **SLO-LAT-P95** | Latency p95 | [< 200ms] | Rolling 7 days | Tail users experience slowness |
| **SLO-LAT-P99** | Latency p99 | [< 500ms] | Rolling 7 days | Worst-case tail degrades |
| **SLO-ERR** | Error rate | [< 0.1%] | Rolling 30 days | Reliability gap; budget burn |
| **SLO-THROUGH** | Throughput | [1000 req/s] sustained | Rolling 24 hours | Saturation; queueing |

### SLO-AVAIL: Availability

- **SLI:** `1 − (failed_requests / total_requests)`
- **Target:** [99.9%] availability over a rolling 30-day window.
- **Allowable downtime (error budget):** 43.2 minutes / 30 days.
- **Scope:** All pipeline phase invocations and runtime API requests.

### SLO-LAT-P95: Latency (p95)

- **SLI:** 95th-percentile request duration.
- **Target:** p95 latency < [200ms] over a rolling 7-day window.
- **Scope:** Synchronous API requests. Long-running pipeline phases are
  measured separately and are not subject to this SLO.

### SLO-ERR: Error rate

- **SLI:** `failed_requests / total_requests`
- **Target:** Error rate < [0.1%] over a rolling 30-day window.
- **Scope:** All user-facing requests. Internal retries are excluded.

### SLO-THROUGH: Throughput

- **SLI:** `total_requests / window_seconds`
- **Target:** Sustained [1000 req/s] over a rolling 24-hour window.
- **Scope:** Steady-state load. Burst capacity above this is allowed but not
  guaranteed by the SLO.

---

## Error Budgets

An error budget is the allowable amount of unreliability implied by an SLO. It
converts a percentage target into a concrete quantity of "bad events" the
service may experience before the SLO is breached.

### Calculation

For an availability SLO over a compliance window:

```
error_budget = (1 − SLO_target) × window_duration
```

**Worked example (SLO-AVAIL, 30-day window):**

```
SLO target         = 99.9%  → 0.999
window_duration    = 30 days = 43,200 minutes
error_budget       = (1 − 0.999) × 43,200
                   = 0.001 × 43,200
                   = 43.2 minutes
```

The service may be unavailable for up to 43.2 minutes in any rolling 30-day
window before SLO-AVAIL is breached.

**Error budget by SLO (30-day window, default targets):**

| SLO | Target | Error Budget |
| :--- | :--- | :--- |
| SLO-AVAIL | [99.9%] | 43.2 min downtime |
| SLO-ERR | [< 0.1%] | [0.1%] of total requests may fail |

### Error Budget Policy

The error budget is a resource to be spent deliberately, not a buffer to be
accidentally consumed. The policy governs how it is spent and what happens when
it is exhausted.

| Budget State | Action |
| :--- | :--- |
| **> 50% remaining** | Normal operations. Feature releases proceed. |
| **25%–50% remaining** | Caution. Releases proceed but with enhanced monitoring. Notify team. |
| **< 25% remaining** | Freeze non-essential feature releases. Focus on reliability work. |
| **Exhausted (0%)** | SLO breached. All feature releases frozen until budget recovers. Only reliability fixes and critical security patches may ship. Mandatory incident review. |
| **Trending to exhaustion (burn rate > 2×)** | Early warning even if budget remains. Page on-call; investigate root cause. |

**Burn rate** measures how fast the budget is being consumed:

```
burn_rate = (errors_in_recent_window / expected_errors_for_window)
```

A burn rate of 1 means budget is being consumed at the expected pace. A burn
rate > 2 over a 1-hour window triggers a fast-burn alert; a burn rate > 2 over
a 6-hour window triggers a slow-burn alert.

---

## SLO Violation Response Plan

When an SLO is breached (error budget exhausted), the following response plan
activates. The goal is to restore the SLO, understand the root cause, and
prevent recurrence — without assigning blame.

```
1. DETECT
   │  Monitoring detects budget exhaustion or SLO breach
   │  Alert fires to on-call (see Monitoring and Alerting)
   ▼
2. DECLARE
   │  On-call acknowledges within [15 minutes]
   │  Creates an incident (severity per impact)
   │  Notifies stakeholders via [Channel Name]
   ▼
3. MITIGATE
   │  Apply immediate mitigation (rollback, scale, shed load)
   │  Primary goal: stop the bleeding, not root-cause yet
   │  Log all actions in the incident timeline
   ▼
4. RESOLVE
   │  Confirm SLO metrics recovering
   │  Remove mitigation if safe (or leave in place pending fix)
   ▼
5. POSTMORTEM
   │  Within [5 business days], complete a blameless postmortem
   │  Template: ../04_Operations_Maintenance/incident-postmortem-template.md
   │  Identify root cause, contributing factors, action items
   ▼
6. ACT
   │  Implement action items with owners and due dates
   │  Update SLOs, alerts, or runbooks as needed
   │  Review at next SLO review cadence (see below)
```

**Severity guidance:**

| Severity | Criteria | Response |
| :--- | :--- | :--- |
| **SEV-1** | SLO-AVAIL breached; user-facing outage | Page on-call immediately; war room |
| **SEV-2** | SLO-LAT-P95 or SLO-ERR breached; significant degradation | Page on-call; coordinate during business hours |
| **SEV-3** | Budget trending to exhaustion; no breach yet | Slack/Teams notification; investigate next business day |

---

## Monitoring and Alerting

SLOs are only useful if they are measured continuously and breaches are
detected promptly. The pipeline collects SLI data into `metrics/metrics.db`
(C4-2) and evaluates SLO compliance on a fixed schedule.

**Collection:**

- `collect-metrics.js` (C4-2) writes request counters and latency samples to
  `metrics/metrics.db` continuously.
- SPC control charts (`spc-control.js`, C4-3) overlay UCL/LCL bands on SLI
  trends to detect statistical drift before an SLO is breached.

**Alerting rules (default):**

| Alert | Condition | Window | Action |
| :--- | :--- | :--- | :--- |
| `slo.availability.fast_burn` | Burn rate > 2× | 1 hour | Page on-call |
| `slo.availability.slow_burn` | Burn rate > 2× | 6 hours | Page on-call |
| `slo.availability.breached` | Budget exhausted | Rolling 30 days | Page on-call; SEV-1 |
| `slo.latency.p95.breached` | p95 > [200ms] sustained | 15 minutes | Notify on-call |
| `slo.error_rate.breached` | Error rate > [0.1%] sustained | 15 minutes | Notify on-call |
| `slo.throughput.breached` | Throughput < [1000 req/s] sustained | 30 minutes | Notify on-call |
| `spc.drift_warning` | 2 consecutive builds trend upward (C4-3) | Per build | Auto-remediation (C4-5) |

For the full monitoring and alerting runbook, including alert routing,
acknowledgment expectations, and silencing windows, see
`../04_Operations_Maintenance/mon-alert-guide.md`.

**Example alert rule (pseudo-configuration):**

```yaml
alert: slo_availability_fast_burn
expr: |
  (
    sum(rate(request_failed_total[1h]))
    /
    sum(rate(request_total[1h]))
  ) > (2 * (1 - 0.999))
for: 2m
labels:
  severity: page
  slo: SLO-AVAIL
annotations:
  summary: "Availability error budget burning 2x fast (1h window)"
  runbook: "../04_Operations_Maintenance/mon-alert-guide.md#slo-availability-fast-burn"
```

---

## SLO Review Cadence

SLOs are not set-and-forget. They are reviewed on a fixed cadence and adjusted
based on observed performance, user expectations, and business needs.

| Cadence | Activity | Owner | Output |
| :--- | :--- | :--- | :--- |
| **Weekly** | Review error budget burn rate; flag trends | On-call | Burn report in standup |
| **Monthly** | Formal SLO review: did we meet each SLO? | [Team Lead] | Monthly SLO report |
| **Quarterly** | SLO adjustment: are targets still right? | [Team Lead] + stakeholders | Updated SLOs (this doc) |
| **Annually** | Full SLO/SLA alignment review | [Team Lead] + [Product Owner] | SLA renegotiation if needed |

**Monthly review checklist:**

1. Pull SLI data from `metrics/metrics.db` for the past 30 days.
2. For each SLO, compute the achieved value and compare to the target.
3. Record results in the [Historical SLO Performance](#historical-slo-performance)
   table.
4. If an SLO was breached, confirm the postmortem action items are complete.
5. If an SLO is consistently over-met (e.g., 99.99% against a 99.9% target),
   consider tightening it to unlock faster feature velocity.
6. If an SLO is consistently missed, either invest in reliability or loosen
   the target with documented justification.

**Quarterly adjustment policy:**

- SLO targets may be tightened at any quarterly review.
- SLO targets may be loosened only with documented business justification and
  [Team Lead] approval. Loosening is a signal of a reliability investment gap.
- Any change to an SLO target updates this document and is recorded in the
  changelog.

---

## Historical SLO Performance

The table below records achieved SLO values per month. It is updated during the
monthly review. Placeholder values are shown for structure.

| Month | SLO-AVAIL (target [99.9%]) | SLO-LAT-P95 (target [<200ms]) | SLO-ERR (target [<0.1%]) | SLO-THROUGH (target [1000 req/s]) | Breaches |
| :--- | :--- | :--- | :--- | :--- | :--- |
| [YYYY-MM] | [99.95%] | [142ms] | [0.04%] | [1180 req/s] | None |
| [YYYY-MM] | [99.92%] | [178ms] | [0.08%] | [1040 req/s] | None |
| [YYYY-MM] | [99.87%] | [245ms] | [0.15%] | [860 req/s] | SLO-LAT-P95, SLO-ERR |
| [YYYY-MM] | [99.91%] | [188ms] | [0.09%] | [1010 req/s] | None |
| [YYYY-MM] | [99.96%] | [130ms] | [0.03%] | [1220 req/s] | None |

**Trend notes:**

- [Placeholder: commentary on the trend, e.g., "The [YYYY-MM] breach was
  caused by a database connection pool exhaustion; see postmortem
  [incident-id]. The fix reduced p95 latency by 24% the following month."]

---

## SLO Improvement Plan

Continuous improvement is a CMMI Level 4 expectation (C4-5: proactive
action). The plan below tracks initiatives to improve SLO performance and
reliability.

| Initiative | SLO Impacted | Owner | Status | Target Date | Expected Benefit |
| :--- | :--- | :--- | :--- | :--- | :--- |
| [Initiative: connection pooling] | SLO-LAT-P95 | [Engineer] | In progress | [YYYY-MM-DD] | Reduce p95 by [40ms] |
| [Initiative: caching layer] | SLO-LAT-P50, SLO-THROUGH | [Engineer] | Planned | [YYYY-MM-DD] | Reduce p50 by [30ms]; increase throughput [25%] |
| [Initiative: retry/circuit-breaker] | SLO-ERR | [Engineer] | In progress | [YYYY-MM-DD] | Reduce error rate by [50%] |
| [Initiative: multi-region failover] | SLO-AVAIL | [Engineer] | Planned | [YYYY-MM-DD] | Raise availability to [99.95%] |
| [Initiative: predictive autoscaling] | SLO-THROUGH | [Engineer] | Research | [YYYY-MM-DD] | Sustain [1500 req/s] |

**Improvement process:**

1. Each initiative has a clear owner, target SLO, and measurable expected
   benefit.
2. Progress is reviewed at the monthly SLO review.
3. On completion, the actual benefit is measured against the expected benefit
   and recorded. If the gap is large, a follow-up is filed.
4. C4-5 auto-remediation may open improvement initiatives automatically when
   SPC detects a sustained negative trend.

---

## Cross-References

- **Monitoring & alerting guide**: `../04_Operations_Maintenance/mon-alert-guide.md`
  — full alert runbook, routing, and silencing procedures.
- **Incident postmortem template**:
  `../04_Operations_Maintenance/incident-postmortem-template.md` — blameless
  postmortem format used when an SLO is breached.
- **Glossary**: `../06_User_Reference/glossary.md` — definitions of SLI, SLO,
  SLA, error budget, burn rate, and related terms.
- **Project charter**: `../../AGENTS.md` — C4-1 quantitative goals, C4-2
  measurement data, C4-3 SPC, C4-5 proactive action.

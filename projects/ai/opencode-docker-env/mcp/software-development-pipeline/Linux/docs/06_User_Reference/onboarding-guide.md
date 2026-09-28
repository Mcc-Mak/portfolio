# Team Onboarding Guide

## Table of Contents

- [Welcome](#welcome)
- [First Day Checklist](#first-day-checklist)
- [Access Requests](#access-requests)
- [Tool Installation and Setup](#tool-installation-and-setup)
- [Development Environment Setup](#development-environment-setup)
- [Team Structure and Contacts](#team-structure-and-contacts)
- [Communication Channels](#communication-channels)
- [Important Meetings and Schedules](#important-meetings-and-schedules)
- [Documentation Overview](#documentation-overview)
- [Training Resources](#training-resources)
- [First Week Milestones](#first-week-milestones)
- [Culture and Values](#culture-and-values)
- [Cross-References](#cross-references)

---

## Welcome

Welcome to the team! We're glad you're here.

This guide walks you through your first week: getting access, setting up your
machine, understanding how we work, and making your first contribution. We work
on a CMMI Level 4 DevSecOps pipeline built on Node.js LTS, using opencode for
AI-assisted development with mandatory security gates. It's a rigorous
environment, but a supportive one — you will not be expected to know everything
on day one, and you should never hesitate to ask questions.

Our north star is simple: **quality is non-negotiable, and people come first.**
The pipeline enforces quality automatically (the R10 gate blocks bad merges),
so you can focus on building great things with the confidence that the system
has your back. When things do break — and they will — we do blameless
postmortems, because the goal is a better system, not a scapegoat.

If anything in this guide is unclear or outdated, that's a bug. Fix it and open
a PR; your first contribution might just be improving this document.

---

## First Day Checklist

Your first day is about access, environment, and introductions — not shipping
code. Work through this list with your buddy.

- [ ] **HR check-in complete** (badge, paperwork, payroll)
- [ ] **Hardware received** (laptop, monitor, peripherals) and confirmed working
- [ ] **OS account created** (local admin per policy, MFA enrolled)
- [ ] **Email account active** ([your-name]@[company-domain])
- [ ] **VPN configured and tested** (see [Access Requests](#access-requests))
- [ ] **Source control access granted** (GitHub org invite accepted)
- [ ] **opencode installed and configured** (see [Tool Installation](#tool-installation-and-setup))
- [ ] **Repo cloned and `npm install` succeeds** (see [Dev Environment](#development-environment-setup))
- [ ] **Lint and test gates pass locally** (`npm run lint && npm test`)
- [ ] **Introduced to the team** (standup, Slack/Teams channels)
- [ ] **Onboarding buddy assigned** ([Buddy Name])
- [ ] **This guide read end-to-end**

If any item is blocked, ping your buddy or [Team Lead] — do not spin on access
issues alone.

---

## Access Requests

The table below lists every system you will likely need. File access requests
through [IT Portal URL] unless noted. Your buddy can sponsor requests that need
a manager or lead approval.

| System | Purpose | How to Request | Approver | Notes |
| :--- | :--- | :--- | :--- | :--- |
| **GitHub** ([Org Name]) | Source code, PRs, reviews | Accept org invite emailed to you | [Team Lead] | Enable 2FA; add SSH key |
| **[Cloud Provider 1]** (e.g., AWS) | Infrastructure, logs, metrics | [IT Portal URL] | [DevOps Engineer] | Least-privilege role; no root |
| **[Cloud Provider 2]** (e.g., GCP) | Secondary infra, artifacts | [IT Portal URL] | [DevOps Engineer] | If applicable to your work |
| **Database** ([DB Name]) | Dev/staging data access | [DB Access Form] | [Senior Dev] | Production requires separate request |
| **VPN** | Network access to internal resources | [IT Portal URL] | IT | Install client; test connectivity |
| **opencode config** | AI-assisted development | Global at `~/.config/opencode/` | Self-service | See [Training Resources](#training-resources) |
| **CI/CD** ([CI System]) | Pipeline runs, deploy logs | Added to [Org Name] team | [DevOps Engineer] | View access first; deploy access later |
| **Monitoring** ([Tool Name]) | Dashboards, alerts | [IT Portal URL] | [DevOps Engineer] | Add to on-call rotation after ramp-up |
| **Secrets Manager** | API keys, certs | [IT Portal URL] | [DevOps Engineer] | Never commit secrets to git |
| **Documentation Wiki** | Internal docs | Auto-provisioned | — | Request edit access if missing |

**Access principles:**

- **Least privilege.** You get the minimum access needed for your role. More
  access is one request away.
- **No shared accounts.** Every action is attributable to a person (SOX-04,
  HIPAA-02).
- **Secrets never in source.** Use the secrets manager; never paste a key into
  code, a commit message, or a chat. The SAST gate (R8) will catch it, and
  that's an awkward first week.

---

## Tool Installation and Setup

Install these tools in order. Versions noted are minimums; newer LTS is fine.

### 1. Node.js LTS

Install the current Node.js LTS via your preferred version manager.

```bash
# Using nvm (recommended)
curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.7/install.sh | bash
nvm install --lts
nvm use --lts
node --version   # expect v20.x or newer LTS
npm --version
```

### 2. Git

```bash
git --version    # expect 2.30+
git config --global user.name "[Your Name]"
git config --global user.email "[your-name]@[company-domain]"
git config --global init.defaultBranch main
git config --global pull.rebase false
```

Add an SSH key to GitHub:

```bash
ssh-keygen -t ed25519 -C "[your-name]@[company-domain]"
# Copy the public key and add it in GitHub → Settings → SSH and GPG keys
cat ~/.ssh/id_ed25519.pub
```

### 3. opencode

opencode is our AI-assisted development entry point. All pipeline work flows
through `opencode run` and the `/pipeline` command.

```bash
# Install opencode (follow the official install instructions)
# Then deploy the global config so /pipeline works from any directory
npm run deploy    # runs scripts/deploy-global.sh (R14)
```

After install, verify the global config is in place:

```bash
ls ~/.config/opencode/
# Expect: AGENTS.md, opencode.jsonc, package.json, scripts/, skills/, tools/
```

### 4. ESLint and Jest

These are project dependencies and install via `npm install`, but verify they
run:

```bash
npm run lint      # ESLint (R8 SAST gate)
npm test          # Jest unit tests
```

### 5. Docker (for DAST and containerized runs)

```bash
docker --version  # expect 24.x+
docker run hello-world
```

Docker is required for the DAST gate (R19, OWASP ZAP) and for reproducible
local pipeline runs.

### 6. Optional but recommended

| Tool | Use |
| :--- | :--- |
| **[Editor]** (VS Code) | Editor with Node.js/ESLint extensions |
| **[REST Client]** (Postman/Insomnia) | API testing |
| **[Terminal]** (Windows Terminal/iTerm2) | Better terminal experience |
| **[DB Client]** (DBeaver/TablePlus) | Database inspection |

---

## Development Environment Setup

With tools installed, set up the project.

```bash
# 1. Clone the repository
git clone git@github.com:[Org Name]/[repo].git
cd [repo]

# 2. Install dependencies (this also sets up hooks)
npm install

# 3. Verify the quality gates pass locally
npm run lint       # SAST gate (R8) — must pass
npm test           # Jest unit tests — must pass
npm audit          # SCA gate (R9) — must report no Critical/High

# 4. Verify the full pipeline runs locally (smoke test)
npm run pipeline   # Runs all gates in W1 order; see pipeline-guide.md

# 5. Deploy global opencode config so /pipeline works anywhere
npm run deploy
```

**Expected result:** all gates green, `metrics/` and `logs/` populated with a
fresh run, and `~/.config/opencode/` updated.

**If `npm install` fails:**

- Confirm Node.js LTS (`node --version`).
- Clear cache: `npm cache clean --force`, then retry.
- Check for corporate proxy / VPN requirements.

**If `npm run lint` fails:**

- ESLint errors are R8 BLOCKING defects. Do not disable the rule; fix the code.
- If you believe the rule is wrong, discuss with [Senior Dev] before changing
  `.eslintrc.js`.

**If `npm test` fails:**

- Tests are part of the R10 gate. A failing test blocks the merge.
- Run the specific failing test with verbose output:
  `npx jest path/to/test.spec.js --verbose`.

**If `npm run pipeline` fails:**

- Read the failure output; it names the gate that blocked.
- See `../03_Development_Testing/pipeline-guide.md` for gate-by-gate
  troubleshooting.

---

## Team Structure and Contacts

| Role | Name | Responsibility | Contact |
| :--- | :--- | :--- | :--- |
| **Team Lead** | [Team Lead] | Priorities, unblocking, SLO ownership | @[slack-handle] / [email] |
| **Senior Developer** | [Senior Dev] | Code review, architecture, mentorship | @[slack-handle] / [email] |
| **DevOps Engineer** | [DevOps Engineer] | Pipeline, infrastructure, deployments | @[slack-handle] / [email] |
| **Security Champion** | [Security Champion] | Threat modeling, compliance, gates | @[slack-handle] / [email] |
| **Product Owner** | [Product Owner] | Requirements, prioritization | @[slack-handle] / [email] |
| **Onboarding Buddy** | [Buddy Name] | Your day-to-day guide for week 1+ | @[slack-handle] / [email] |

**How to reach people:**

- **Quick question:** DM your buddy first; if they don't know, they'll point
  you to who does.
- **Code question:** Open a draft PR and request early review; don't wait for
  "done."
- **Blocking issue:** Post in [Channel Name] and tag [Team Lead].
- **After hours:** Only for SEV-1 incidents via the on-call rotation.

---

## Communication Channels

| Channel | Platform | Purpose | When to Use |
| :--- | :--- | :--- | :--- |
| **[team-general]** | [Slack/Teams] | Day-to-day team chat | Default for most communication |
| **[team-dev]** | [Slack/Teams] | Code, PRs, technical discussion | Engineering questions |
| **[team-incidents]** | [Slack/Teams] | Incident response, alerts | SEV-1/SEV-2 only |
| **[team-announcements]** | [Slack/Teams] | Leadership announcements | Read-only; important updates |
| **Email** | [email] | External, formal, archival | Cross-team, vendor, compliance |
| **Standup** | In-person/[Video] | Daily sync | See [Meetings](#important-meetings-and-schedules) |
| **Wiki** | [Wiki URL] | Persistent docs, decisions | Anything worth keeping |

**Communication norms:**

- **Default to open.** Post in channels, not DMs, so others can learn and
  chime in. Use DMs only for sensitive or personal topics.
- **Write it down.** If a decision is made in chat, summarize it in the wiki or
  the relevant doc. Decisions that aren't written down didn't happen.
- **Be kind.** Text lacks tone. Assume good intent, and re-read before sending
  when tensions are high.
- **Time zones.** We work across [time zones]. Core overlap hours are
  [HH:MM–HH:MM TZ]. Schedule synchronous meetings within that window.

---

## Important Meetings and Schedules

| Meeting | Cadence | Day/Time | Duration | Attendees | Purpose |
| :--- | :--- | :--- | :--- | :--- | :--- |
| **Daily Standup** | Daily | [HH:MM TZ] | 15 min | Full team | Yesterday / today / blockers |
| **Sprint Planning** | Bi-weekly | [Day, HH:MM TZ] | 60 min | Full team + PO | Plan the sprint |
| **Backlog Refinement** | Weekly | [Day, HH:MM TZ] | 45 min | Devs + PO | Groom upcoming work |
| **Sprint Review** | Bi-weekly | [Day, HH:MM TZ] | 60 min | Full team + stakeholders | Demo done work |
| **Retrospective** | Bi-weekly | [Day, HH:MM TZ] | 45 min | Full team | Improve how we work |
| **SLO Review** | Monthly | [Day, HH:MM TZ] | 30 min | Lead + on-call | Reliability review |
| **1:1 with Lead** | Weekly | [Day, HH:MM TZ] | 30 min | You + [Team Lead] | Your growth, feedback |

**Meeting norms:**

- **Standup is for blockers, not status.** If you're unblocked and on track,
  say so in one sentence. Status updates go in the ticket.
- **Be on time.** Lateness wastes everyone's minutes.
- **No laptops in retro** (unless remote). Be present.
- **Agendas required.** Every recurring meeting has an agenda in the invite.
  If yours doesn't, ask for one or decline.

---

## Documentation Overview

The docs are organized in numbered subfolders. Here are the ones you'll touch
most often in your first weeks.

| Doc | Path | When You'll Need It |
| :--- | :--- | :--- |
| **Setup Guide** | `../02_Setup_Configuration/setup-guide.md` | Day 1 environment setup |
| **Development Guide** | `../03_Development_Testing/dev-guide.md` | Writing your first code |
| **Pipeline Guide** | `../03_Development_Testing/pipeline-guide.md` | Understanding the gates |
| **Glossary** | `glossary.md` (this folder) | Decoding acronyms |
| **FAQ** | `faq.md` (this folder) | Common questions |
| **AGENTS.md** (charter) | `../../AGENTS.md` | Project rules and requirements |
| **Compliance** | `../05_Security_Compliance/compliance.md` | When touching regulated data |
| **Changelog** | `changelog.md` (this folder) | What changed when |
| **SLOs** | `service-level-objectives.md` (this folder) | Reliability targets |
| **Migration Guide** | `../04_Operations_Maintenance/migration-guide.md` | Upgrading versions |

**Where to start:** Read this guide, then `../02_Setup_Configuration/setup-guide.md`,
then `../03_Development_Testing/dev-guide.md`. Skim the glossary. Everything
else is reference material for when you need it.

---

## Training Resources

### Project Charter and Rules

- **`AGENTS.md`** (`../../AGENTS.md`): the project charter. It defines every
  requirement (R1–R20), the CMMI Level 4 quantitative goals (C4-1), and the
  SPC rules (C4-3). Read it once carefully; refer back often.
- **Operational hard rules** (`.opencode/rules/operational-hard-rules.md`):
  R14 (global deployment) and R15 (git commit reminder). These are HARD RULES.

### Skills

The project ships opencode skills (R1, R2, R3, R4), each with a `SKILL.md`:

| Skill | Location | Use When |
| :--- | :--- | :--- |
| **requirement-gathering** | `.opencode/skills/requirement-gathering/SKILL.md` | Writing specs (prd, srs, stories) |
| **secure-coding** | `.opencode/skills/secure-coding/SKILL.md` | Writing OWASP-compliant Node.js in `src/` with tests in `__tests__/` |
| **doc-generation** | `.opencode/skills/doc-generation/SKILL.md` | Generating user/ops docs |

### The Pipeline Command

The `/pipeline` command (or `npm run pipeline`) is the single entry point for
all gated work. It enforces W1 order (Requirements → Coding → DevSecOps →
Documentation) and runs every security gate (R7–R11, R16–R19).

```bash
# Run the full pipeline
npm run pipeline

# Run a specific phase
opencode run /pipeline requirements
opencode run /pipeline devsecops
```

Read `../03_Development_Testing/pipeline-guide.md` for the full command
reference and gate-by-gate explanation.

---

## First Week Milestones

A structured first week sets you up for success. Adjust timing with your buddy
as needed.

### Day 1 — Access and Environment

- Complete the [First Day Checklist](#first-day-checklist).
- Clone the repo, run `npm install`, pass `npm run lint && npm test`.
- Read `AGENTS.md` and this guide.
- Attend standup; introduce yourself.

### Day 2 — Understand the Pipeline

- Run `npm run pipeline` locally and read every gate's output.
- Read `../03_Development_Testing/pipeline-guide.md`.
- Understand W1 order and which gate is which (R8 SAST, R9 SCA, R10 gate,
  R16 compliance, R17 threat model, R19 DAST, R20 RTM).
- Pick a "good first issue" ticket with your buddy.

### Day 3 — First Contribution

- Branch from main: `git checkout -b [ticket-id]-[description]`.
- Make a small change (fix a typo, improve a doc, add a test).
- Run `npm run lint && npm test` locally.
- Open a PR. Request review from [Senior Dev] or your buddy.
- Experience the pipeline gates running on your PR.

### Day 4 — Deeper Dive

- Pair with [DevOps Engineer] on how deploys work.
- Read `../05_Security_Compliance/compliance.md` to understand the regulatory
  posture (GDPR, HIPAA, PCI DSS, SOX).
- Skim `service-level-objectives.md` to understand reliability targets.
- Address review feedback on your PR; get it merged.

### Day 5 — Reflect and Plan

- Merge your first PR (if not already).
- 1:1 with [Team Lead]: what went well, what's confusing, what's next.
- Read the glossary (`glossary.md`) and FAQ (`faq.md`).
- Pick up your first real feature ticket for the next sprint.

**By end of week 1, you should be able to:**

- Run the pipeline locally and interpret every gate.
- Open a PR that passes all gates and gets merged.
- Navigate the docs to find answers without help.
- Know who to ask for what.

---

## Culture and Values

### Quality is non-negotiable (R10)

The R10 gate means every merge is verified. We don't merge broken code, and we
don't disable gates to hit a deadline. If a gate is blocking, that's the system
working as designed — fix the problem, don't bypass the gate. This is how we
hit our CMMI Level 4 quantitative goals (C4-1).

### Workflow order matters (W1)

We follow W1 strict order: Requirements → Coding → DevSecOps → Documentation.
This isn't bureaucracy; it's how we avoid rework and catch defects early.
Writing code before the requirements are clear, or skipping DevSecOps, costs
more later — always.

### Blameless postmortems

When something breaks, we fix the system, not the person. Postmortems focus on
root cause and process, not blame. If you broke something, you're in good
company — everyone has. The template is at
`../04_Operations_Maintenance/incident-postmortem-template.md`.

### Security is everyone's job

The gates (R8 SAST, R9 SCA, R16 compliance, R17 threat model, R19 DAST) are
automated, but security awareness is human. If you see something suspicious —
a hardcoded secret, an unsafe dependency, a missing control — say something.
Ping [Security Champion] or open an issue.

### Write it down

If it isn't documented, it didn't happen. Decisions go in the wiki or ADRs
(Architecture Decision Records). Changes go in the changelog. Runbooks go in
`docs/`. This is how we satisfy SOX-01 (change management) and how we keep
each other unblocked.

### Ask questions

There are no dumb questions, especially in your first month. Asking early
saves everyone time. Your buddy, your lead, and the team channels are all
available. We'd rather answer ten questions than have you stuck for a day.

---

## Cross-References

- **Setup Guide**: `../02_Setup_Configuration/setup-guide.md` — detailed
  environment setup beyond the quickstart here.
- **Development Guide**: `../03_Development_Testing/dev-guide.md` — coding
  standards, conventions, and the secure-coding skill.
- **Pipeline Guide**: `../03_Development_Testing/pipeline-guide.md` — every
  gate explained, with troubleshooting.
- **Glossary**: `glossary.md` (this folder) — definitions of every acronym
  and term (CMMI, SAST, SCA, DAST, RTM, SPC, SLI, SLO, and more).
- **FAQ**: `faq.md` (this folder) — common questions from new team members.
- **Project charter**: `../../AGENTS.md` — the source of truth for all
  requirements (R1–R20) and CMMI Level 4 goals (C4-1 through C4-5).

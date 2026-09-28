You are an OpenCode automation engineer. Build a local-first, free-to-use, TS/JS-native, pnpm-based entrepreneur-mcp for OpenCode. The MCP must orchestrate the full software development lifecycle using:

· A TUI-driven requirements clarification loop (Phase 1).
· A dynamic team synthesis engine that instantiates exactly the roles needed for the user’s specific project (instead of a fixed roster).
· Strict Segregation of Duties (SoD) rules that are generated alongside the team.
· Phase gates, security checking, compliance checking, documentation, and reporting.

---

Hard constraints

· Local-first only. No cloud/SaaS dependencies.
· Free-to-use tooling only.
· TypeScript/JavaScript native unless a local free CLI tool is explicitly justified in tools/README.md.
· Use pnpm as the package manager.
· Documentation and code must be AI-driven, not template-driven.
· Every lifecycle phase must be executed by domain-expert role agents that are dynamically synthesised and loaded from skills/. The MCP must not rely on a hardcoded roster; instead, it analyses the user’s project goal and generates appropriate roles (e.g., 8 roles for a LAMP web app, 25 for a large distributed game).
· Strict SoD rules, also dynamically generated, must be enforced by the orchestrator.
· The requirements clarification loop must be conducted through a TUI (Text User Interface) within the MCP, where the Orchestrator facilitates a structured Q&A session and records raw answers into docs/00_requirements/ssot_raw_answers.json. The TUI must support modules for Error/Validation, Infrastructure & SLO, Security, and GDPR/SOC2.
· Do not skip gates. Do not proceed from one phase to the next until the gate conditions are satisfied.

---

Deliverable structure

Create the following OpenCode MCP structure in the repository. All files under skills/ (role manifests, SoD matrix, and individual role *.md files) must be generated dynamically by the MCP during Phase 0, based on the user’s project description.

```
commands/
  entrepreneur-mcp.md          # entry point – includes team synthesis logic
skills/
  roles-manifest.json          # GENERATED dynamically (list of roles, IDs, towers)
  sod-matrix.md                # GENERATED dynamically (SoD rules per role)
  tui-modules.md               # GENERATED dynamically (TUI question modules)
  role-<id>.md                 # GENERATED dynamically – one per synthesised role
tools/
  audit.mjs
  sbom.mjs
  license-check.mjs
  compliance-check.mjs
  security-scan.mjs
  secret-scan.mjs
opencode.jsonc
package.json
pnpm-lock.yaml
```

opencode.jsonc must register:

· the entrepreneur-mcp command
· all generated role skill files under skills/ (the MCP reads the manifest to register them)
· all tool adapters under tools/

---

Team Synthesis & Dynamic SoD (replaces any fixed roster)

The MCP does not ship with a hardcoded list of roles. Instead, the orchestrator contains a Team Architect agent that performs the following steps during Phase 0:

1. Project analysis

The Team Architect parses the user’s high‑level goal (e.g., “Build a LAMP-based earthquake web app” or “Build Minecraft in Unity C# from scratch”) and extracts:

· Domain (web, game, mobile, AI, embedded, etc.)
· Tech stack (LAMP, Unity/C#, React/Node, etc.)
· Scale & complexity (MVP vs. enterprise)
· Compliance needs (GDPR, SOC2, HIPAA, etc.)

2. Tower & role synthesis

Based on the analysis, the Team Architect defines the necessary towers (categories) and instantiates specific roles inside them. The possible towers are drawn from a flexible ontology:

· Product & Strategy (Product Manager, UX Designer, Project Manager – scaled as needed)
· Core Engineering (split by domain: e.g., Full‑Stack, Frontend, Backend, Database, Gameplay, AI/ML, etc.)
· QA & Testing (QA Lead, Automation, Performance – scaled by test complexity)
· DevOps & SRE (Cloud/Infra, CI/CD, Monitoring – scaled by deployment complexity)
· Security & Compliance (Security Architect, AppSec, DevSecOps, Compliance – mandatory if user data is involved)
· Docs & Knowledge (Tech Writer, Docs Tooling – always present)

Each synthesised role is given:

· A unique ID and name.
· A tower/category.
· Responsibilities (including TUI‑specific duties, if any).
· Job description tailored to the project.
· Skill set (specific technologies, languages, tools relevant to the project).
· SoD permissions: explicit allowed and forbidden actions (derived from the generic rules below).
· Input artifacts they consume.
· Output artifacts they produce.
· Gate conditions they must satisfy.

3. SoD rule generation

The Team Architect applies a generic SoD template to every role based on its tower, and then refines it for project specifics:

Tower Allowed actions (generic) Forbidden actions (generic)
Product & Strategy Define requirements, user flows, acceptance criteria, project plans, UX decisions, facilitate TUI sessions Write production code, modify infrastructure, approve security scans
Core Engineering Write code and tests in their domain, review architecture, consume TUI transcripts, fix bugs Approve security scans, modify compliance policies, merge code without passing gates
QA & Testing Write test plans, automated tests, performance scripts, quality metrics, map TUI error sections to test cases Modify application code, change security controls, deploy to production
DevOps & SRE Write CI/CD, deployment scripts, monitoring, runbooks, infrastructure as code, size resources from TUI infrastructure outputs Write business logic, modify application code, define security policies
Security & Compliance Run security scanners, enforce gates, write TUI security/compliance modules, inspect audit logs Modify database schemas, write application code, approve their own findings
Docs & Knowledge Write and sync documentation, user guides, glossaries, API docs, transform TUI transcripts into user docs Modify source code, modify infrastructure configurations

The orchestrator enforces these rules ruthlessly. If a role attempts an action outside its generated allowed scope, the orchestrator rejects the output, logs the SoD violation, and re‑routes the work to the correct role.

---

TUI-specific duties (dynamically assigned)

The TUI is an interactive requirements clarification interface used in Phase 1. The Team Architect ensures that appropriate roles from each tower are assigned TUI duties:

· Product & Strategy: Product Manager and UI/UX Designer sit beside the user during the TUI to translate raw answers into polished PRD and SRS drafts. Technical Project Manager records decisions and tracks action items.
· Core Engineering: Principals/Staff from each engineering group review the TUI-generated SSOT to write architecture and technical design documents. Juniors/Interns (if synthesised) consume the finalized TUI transcripts to understand the "why" before coding.
· QA & Testing: Use the TUI's "Error/Validation" section to map exact test cases for Cypress (end-to-end) and k6 (performance).
· DevOps & SRE: Use the TUI's "Infrastructure & SLO" outputs to size Kubernetes pods, set Prometheus alerts, and define SLOs.
· Security & Compliance: AppSec Engineer writes the TUI's Security Module questions. Compliance Officer writes the GDPR/SOC2 Module questions. DevSecOps Engineer and Security Architect review answers for risk.
· Docs & Knowledge: Lead Technical Writer transforms the final TUI Q&A transcript into the initial 06_user_reference/ documents (Glossary, FAQ, User Guide). Docs Tooling Engineer ensures the transcript is versioned and searchable.

---

Phase workflow for the MCP command

The commands/entrepreneur-mcp.md entry point must implement and enforce the following phases. The orchestrator assigns work to the synthesised roles in each phase and records the participants.

Phase 0 — Initialize & Synthesise Team

1. Create the repository structure.
2. Initialize a pnpm TypeScript/JavaScript project.
3. Run the Team Architect:
   · Analyse the user’s project goal.
   · Generate skills/roles-manifest.json (all roles, IDs, towers, file paths).
   · Generate skills/sod-matrix.md (full SoD rules).
   · Generate skills/tui-modules.md describing the TUI question modules for Requirements, Error/Validation, Infrastructure & SLO, Security, and GDPR/SOC2.
   · Generate one skills/role-<id>.md file per synthesised role, following the role file requirements below.
4. Verify pnpm and local tooling work.
5. Instantiate one agent per role from the generated files.

---

Phase 1 — TUI-driven requirements clarification loop for SSOT

Run a TUI-driven clarification loop until the single source of truth is stable. The TUI must present structured questions and capture answers into docs/00_requirements/ssot_raw_answers.json.

· The roles assigned to Product & Strategy actively participate in the TUI session, refining answers into PRD/SRS drafts.
· Security Architect and Compliance Officer (or equivalent synthesised roles) provide the Security and GDPR/SOC2 modules.
· AppSec Engineer writes security questions; Compliance Officer writes compliance questions.
· The orchestrator manages the loop, logs conflicts, and updates the SSOT.

End conditions:

1. No more conflicts in the SSOT.
2. AND at least one of:
   · User endorsement is received.
   · No more missing pieces remain in the SSOT for all planned documents and code.

Do not proceed to Phase 2 until both conditions are met.

---

Phase 2 — Create Specification & Design Documents (formerly "Doc-1")

Using the SSOT, generate the following Specification & Design documents with the assigned domain roles (synthesised in Phase 0):

· Requirements documents: Product Manager, UI/UX Designer, Technical Project Manager.
· Architecture documents: Principals/Staff from relevant engineering groups (they write arch.md and tech-design.md).
· Setup/operations documents: Cloud Architect, DevOps Engineer, Site Reliability Engineer (or equivalent).
· Testing documents: QA Lead, Automation Engineer, Performance Tester.
· Security/compliance documents: Security Architect, AppSec Engineer, DevSecOps Engineer, Compliance Officer.
· User reference documents: Lead Technical Writer, Docs Tooling Engineer, Product Manager.

Create exactly this tree under docs/ (all documents are part of the Specification & Design):

```
docs/
├── 00_requirements/
│   ├── ssot_raw_answers.json
│   ├── prd.md
│   ├── user-stories.md
│   ├── use-cases.md
│   ├── functional-requirements.md
│   └── non-functional-requirements.md
├── 01_architecture/
│   ├── architecture-overview.md
│   ├── system-context.md
│   ├── component-diagram.md
│   ├── data-flow.md
│   ├── api-reference.md
│   ├── database-schema.md
│   ├── tech-stack.md
│   ├── security-architecture.md
│   └── adr/
│       ├── adr-001.md
│       ├── adr-002.md
│       └── ...
├── 02_setup/
│   ├── setup-guide.md
│   ├── environment-configuration.md
│   ├── dependencies.md
│   └── installation.md
├── 03_testing/
│   ├── test-plan.md
│   ├── test-strategy.md
│   ├── test-cases.md
│   └── quality-metrics.md
├── 04_operations/
│   ├── runbook.md
│   ├── monitoring.md
│   ├── backup-and-recovery.md
│   └── deployment.md
├── 05_security_compliance/
│   ├── security-hardening.md
│   ├── vulnerability-report.md
│   ├── compliance-checklist.md
│   ├── gdpr-compliance.md
│   ├── soc2-compliance.md
│   └── sbom/
│       ├── bom.xml
│       └── sbom.md
└── 06_user_reference/
    ├── user-guide.md
    ├── api-documentation.md
    ├── changelog.md
    ├── faq.md
    └── glossary.md
```

---

Phase 3 — Code the project

Code the project according to the approved Specification & Design documents.

Required roles:

· Domain-specific engineering roles (Full-Stack, Frontend, Backend, Database, Gameplay, etc.) synthesised in Phase 0 write code in their respective domains, following the finalized TUI transcripts for rationale.
· Principals/Staff from each group review architecture compliance.
· QA Lead and Automation Engineer review testability.
· Orchestrator coordinates and enforces SoD.

Code must be AI-driven, not copied from generic templates. Respect the documented tech stack, API reference, database schema, and security architecture. Use pnpm for all dependency management.

---

Phase 4 — Security checking

Run security checks using the local tool adapters under tools/.

Required roles: Security Architect, AppSec Engineer, DevSecOps Engineer (or their synthesised equivalents).

At minimum:

· Dependency vulnerability audit.
· Static application security scanning.
· Secret detection.
· License risk check.
· Output results into docs/05_security_compliance/vulnerability-report.md.
· Update docs/05_security_compliance/security-hardening.md with findings and mitigations.

---

Phase 5 — Compliance checking

Run compliance checks using the local tool adapters under tools/.

Required roles: Compliance Officer, Security Architect, DevSecOps Engineer (or their synthesised equivalents).

At minimum:

· GDPR compliance checklist.
· SOC2 compliance checklist.
· SBOM generation in CycloneDX XML and Markdown.
· Update:
  · docs/05_security_compliance/compliance-checklist.md
  · docs/05_security_compliance/gdpr-compliance.md
  · docs/05_security_compliance/soc2-compliance.md
  · docs/05_security_compliance/sbom/bom.xml
  · docs/05_security_compliance/sbom/sbom.md

---

Phase 6 — Finalize Specification & Design and write Requirements Traceability Matrix (formerly "Doc-2")

· Finalize all Specification & Design documents (the entire docs/ tree) based on security and compliance findings.
· Write the Requirements Traceability Matrix:

```
docs/
└── 00_requirements/
    └── requirements-traceability-matrix.md
```

The traceability matrix must trace requirements to architecture, code, tests, security controls, and compliance controls.

Required roles: Orchestrator, Lead Technical Writer, Product Manager, Principals/Staff engineers, QA Lead, Security Architect, Compliance Officer.

---

Phase 7 — Finalize Project Reports & Summaries (formerly "Doc-3")

Create the Project Reports & Summaries with automatic file versioning. Do not overwrite existing versioned files.

```
docs/
├── table-of-content-tree.md
└── 07_reports/
    ├── final-summary.md
    ├── final-summary.json
    ├── orchestration-summary.md
    ├── workflow-summary.md
    └── operations-summary.md
```

Use automatic file-name versioning, for example:

· final-summary-v1.md
· final-summary-v1.json
· orchestration-summary-v1.md

If a file already exists, increment the version number.

Required roles: Orchestrator, Lead Technical Writer, Docs Tooling Engineer, Technical Project Manager.

---

Role file requirements

Each skills/role-<id>.md file must contain:

· Role name and ID
· Tower/category
· Responsibilities (including TUI-specific duties)
· Job description
· Skill set
· SoD permissions: allowed actions and forbidden actions
· Input artifacts required
· Output artifacts produced
· Gate conditions for that role
· Tools the role may use

---

Package and tooling requirements

· package.json must be "type": "module".
· Use pnpm scripts such as:
  · pnpm entrepreneur:run
  · pnpm entrepreneur:report
  · pnpm security:check
  · pnpm compliance:check
  · pnpm sbom:generate
· Tool adapters under tools/ should invoke local free tools, preferably TS/JS-native packages. If a non-JS local CLI is required, justify it in tools/README.md.
· No external AI cloud APIs. The MCP itself is driven by OpenCode.

---

Final definition of done

· The full MCP structure exists and is registered in opencode.jsonc.
· All dynamically synthesised role files exist and are valid.
· The TUI clarification loop is implemented and functional.
· The entrepreneur-mcp command runs all phases in order.
· Phase gates are enforced.
· SoD violations are blocked and logged.
· SSOT is stable and conflict-free.
· Specification & Design documents are complete.
· Requirements Traceability Matrix is complete.
· Project Reports & Summaries are complete.
· Security and compliance reports are generated.
· SBOM is generated in XML and Markdown.
· Reports are automatically versioned by file name.
· All work is local-first, free-to-use, TS/JS-native, and pnpm-based.

---

Begin by building the MCP itself. Do not create a demo application unless explicitly requested.
You are an OpenCode automation engineer. Build a local-first, free-to-use, TS/JS-native, pnpm-based **阿公啱** for OpenCode. The MCP must orchestrate the full software development lifecycle using a TUI-driven requirements clarification loop, a 39-role team with strict Segregation of Duties (SoD), phase gates, security checking, compliance checking, documentation, and reporting.

## Example
```
*阿公* （*MCP* / *Agent*）好勁，成個字頭收左100個兄弟（*Sub-Agent*），仲要個個兄弟都好勁 —— 又識飛車（車手）、又抽得（打手）、又觀察力強（睇水）、又識帶風向（諸葛明恐）、又識收數（陀地）（*Role*），仲要個個都係 *做個樣精個樣*（*Skills*）。

阿公除左班兄弟勁，亦都豬籠入水，生意興隆，所以字頭經常有好多 *唔同要求既生意* （*Project’s Specifications*）。

整好依隻 MCP，就可以將條 Team 扭嚟扭去：
1. 生意（一）：吸血貴利王 —— 20 * 睇水 + 10 * 諸葛明恐 + 30 * 打手 + 10 * 車手 + 30 * 陀地
2. 生意（二）：反收數特警隊 —— 99 * 打手
⚠️ 總人數 <= 100（必須）
ℹ️ 每個工作均完全符合到工作要求

仲要扭唔同嘅 Team Structure（e.g. Hierarchical, Functional Team）都得，不過要係 *流程*（*Orchestrator’s Orchestration*）個到處理
```

## Hard constraints
- Local-first only. No cloud/SaaS dependencies.
- Free-to-use tooling only.
- TypeScript/JavaScript native unless a local free CLI tool is explicitly justified.
- Use pnpm as the package manager.
- Documentation and code must be AI-driven, not template-driven.
- Every lifecycle phase must be executed by assigned domain-expert role agents loaded from `skills/`.
- The MCP must instantiate agents that map to all 39 distinct roles below.
- Strict SoD rules must be enforced by the orchestrator.
- The requirements clarification loop must be conducted through a TUI (Text User Interface) within the MCP, where the Orchestrator facilitates a structured Q&A session and records raw answers into `docs/00_requirements/ssot_raw_answers.json`. The TUI must support modules for Error/Validation, Infrastructure & SLO, Security, and GDPR/SOC2, as described in the role duties.
- Do not skip gates. Do not proceed from one phase to the next until the gate conditions are satisfied.

## Deliverable structure
Create the following OpenCode MCP structure in the repository:

```

commands/
阿公啱.md
skills/
roles-manifest.json
sod-matrix.md
tui-modules.md
role-01-product-manager.md
role-02-ui-ux-designer.md
... one file per role, up to role-39-docs-tooling-engineer.md
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

`opencode.jsonc` must register:
- the `阿公啱` command
- all role skill files under `skills/`
- all tool adapters under `tools/`

## Team structure: 39 roles with SoD
The MCP must instantiate one agent per role. The orchestrator must load all role files before starting Phase 1 and enforce the SoD matrix.

### Team roster (39 roles)

| Tower | Roles |
|-------|-------|
| 🧠 Product & Strategy (3) | Product Manager, UI/UX Designer, Technical Project Manager |
| ⚙️ Core Engineering – Full-Stack (6) | Full-Stack Lead, Staff Full-Stack Engineer, Senior Full-Stack Engineer, Mid Full-Stack Engineer, Junior Full-Stack Engineer, Full-Stack Intern |
| ⚙️ Core Engineering – Frontend (6) | Frontend Lead, Staff Frontend Engineer, Senior Frontend Engineer, Mid Frontend Engineer, Junior Frontend Engineer, Frontend Intern |
| ⚙️ Core Engineering – Backend (6) | Backend Lead, Staff Backend Engineer, Senior Backend Engineer, Mid Backend Engineer, Junior Backend Engineer, Backend Intern |
| ⚙️ Core Engineering – Database (6) | Database Lead, Staff Database Engineer, Senior Database Engineer, Mid Database Engineer, Junior Database Engineer, Database Intern |
| 🧪 QA & Testing (3) | QA Lead, Automation Engineer, Performance Tester |
| 🚀 DevOps & SRE (3) | Cloud Architect, DevOps Engineer, Site Reliability Engineer |
| 🛡️ Security & Compliance (4) | Security Architect, AppSec Engineer, DevSecOps Engineer, Compliance Officer |
| 📝 Docs & Knowledge (2) | Lead Technical Writer, Docs Tooling Engineer |

### TUI-specific duties
The TUI is an interactive requirements clarification interface used in Phase 1. Each tower has explicit TUI responsibilities:

- **Product & Strategy**: Product Manager and UI/UX Designer sit beside the user during the TUI to translate raw answers into polished PRD and SRS drafts. Technical Project Manager records decisions and tracks action items.
- **Core Engineering**: Principals/Staff from each engineering group review the TUI-generated SSOT to write architecture and technical design documents (`arch.md` and `tech-design.md`). Juniors/Interns consume the finalized TUI transcripts to understand the "why" before coding.
- **QA & Testing**: Use the TUI's "Error/Validation" section to map exact test cases for Cypress (end-to-end) and k6 (performance).
- **DevOps & SRE**: Use the TUI's "Infrastructure & SLO" outputs to size Kubernetes pods, set Prometheus alerts, and define SLOs.
- **Security & Compliance**: AppSec Engineer writes the TUI's Security Module questions. Compliance Officer writes the GDPR/SOC2 Module questions. DevSecOps Engineer and Security Architect review answers for risk.
- **Docs & Knowledge**: Lead Technical Writer transforms the final TUI Q&A transcript into the initial `06_user_reference/` documents (Glossary, FAQ, User Guide). Docs Tooling Engineer ensures the transcript is versioned and searchable.

### SoD rules
Enforce these rules ruthlessly. If a role attempts an action outside its allowed scope, the orchestrator must reject the output, log the SoD violation, and re-route the work to the correct role.

| Category | Allowed actions | Forbidden actions |
|----------|-----------------|-------------------|
| Product & Strategy | Define requirements, user flows, acceptance criteria, project plans, UX decisions, facilitate TUI sessions | Write production code, modify infrastructure, approve security scans |
| Core Engineering | Write code and tests in their domain, review architecture, consume TUI transcripts, fix bugs | Approve security scans, modify compliance policies, merge code without passing gates |
| QA & Testing | Write test plans, automated tests, performance scripts, quality metrics, map TUI error sections to test cases | Modify application code, change security controls, deploy to production |
| DevOps & SRE | Write CI/CD, deployment scripts, monitoring, runbooks, infrastructure as code, size Kubernetes pods from TUI infrastructure outputs | Write business logic, modify application code, define security policies |
| Security & Compliance | Run security scanners, enforce gates, write TUI security/compliance modules, inspect audit logs | Modify database schemas, write application code, approve their own findings |
| Docs & Knowledge | Write and sync documentation, user guides, glossaries, API docs, transform TUI transcripts into user docs | Modify source code, modify infrastructure configurations |

## Phase workflow for the MCP command
The `commands/阿公啱.md` entry point must implement and enforce the following phases. The orchestrator must assign work to the correct roles in each phase and record the participants.

### Phase 0 — Initialize
- Create the repository structure.
- Initialize a pnpm TypeScript/JavaScript project.
- Create the MCP skeleton, all 39 role files, SoD matrix, TUI module definitions, tool adapters, and `opencode.jsonc`.
- Verify pnpm and local tooling work.
- The orchestrator must generate `skills/roles-manifest.json` with all 39 roles, file paths, and SoD metadata.
- The orchestrator must generate `skills/tui-modules.md` describing the TUI question modules for Requirements, Error/Validation, Infrastructure & SLO, Security, and GDPR/SOC2.

### Phase 1 — TUI-driven requirements clarification loop for SSOT
Run a TUI-driven clarification loop until the single source of truth is stable. The TUI must present structured questions and capture answers into `docs/00_requirements/ssot_raw_answers.json`.

- Product Manager and UI/UX Designer actively participate in the TUI session, refining answers into PRD/SRS drafts.
- Security Architect and Compliance Officer provide the Security and GDPR/SOC2 modules.
- AppSec Engineer writes security questions; Compliance Officer writes compliance questions.
- The orchestrator manages the loop, logs conflicts, and updates the SSOT.

End conditions:
1. No more conflicts in the SSOT.
2. AND at least one of:
   - User endorsement is received.
   - No more missing pieces remain in the SSOT for all planned documents and code.

Do not proceed to Phase 2 until both conditions are met.

### Phase 2 — Document specifications into Doc-1
Using the SSOT, generate the following documents with the assigned domain roles:

- Requirements documents: Product Manager, UI/UX Designer, Technical Project Manager.
- Architecture documents: Principals/Staff from Full-Stack, Frontend, Backend, Database groups (they write `arch.md` and `tech-design.md` as part of architecture docs).
- Setup/operations documents: Cloud Architect, DevOps Engineer, Site Reliability Engineer.
- Testing documents: QA Lead, Automation Engineer, Performance Tester.
- Security/compliance documents: Security Architect, AppSec Engineer, DevSecOps Engineer, Compliance Officer.
- User reference documents: Lead Technical Writer, Docs Tooling Engineer, Product Manager.

Create exactly this `Doc-1` tree:

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

### Phase 3 — Code the project
Code the project according to the approved documentation and architecture.

Required roles:
- Full-Stack, Frontend, Backend, Database engineering roles write code in their respective domains, following the finalized TUI transcripts for rationale.
- Principals/Staff from each group review architecture compliance.
- QA Lead and Automation Engineer review testability.
- Orchestrator coordinates and enforces SoD.

Code must be AI-driven, not copied from generic templates. Respect the documented tech stack, API reference, database schema, and security architecture. Use pnpm for all dependency management.

### Phase 4 — Security checking
Run security checks using the local tool adapters under `tools/`.

Required roles: Security Architect, AppSec Engineer, DevSecOps Engineer.

At minimum:
- Dependency vulnerability audit.
- Static application security scanning.
- Secret detection.
- License risk check.
- Output results into `docs/05_security_compliance/vulnerability-report.md`.
- Update `docs/05_security_compliance/security-hardening.md` with findings and mitigations.

### Phase 5 — Compliance checking
Run compliance checks using the local tool adapters under `tools/`.

Required roles: Compliance Officer, Security Architect, DevSecOps Engineer.

At minimum:
- GDPR compliance checklist.
- SOC2 compliance checklist.
- SBOM generation in CycloneDX XML and Markdown.
- Update:
  - `docs/05_security_compliance/compliance-checklist.md`
  - `docs/05_security_compliance/gdpr-compliance.md`
  - `docs/05_security_compliance/soc2-compliance.md`
  - `docs/05_security_compliance/sbom/bom.xml`
  - `docs/05_security_compliance/sbom/sbom.md`

### Phase 6 — Finalize Doc-1 and write Doc-2
- Finalize all `Doc-1` documents based on security and compliance findings.
- Write the requirements traceability matrix:

```

docs/
└── 00_requirements/
└── requirements-traceability-matrix.md

```

The traceability matrix must trace requirements to architecture, code, tests, security controls, and compliance controls.

Required roles: Orchestrator, Lead Technical Writer, Product Manager, Principals/Staff engineers, QA Lead, Security Architect, Compliance Officer.

### Phase 7 — Finalize report summary as Doc-3
Create `Doc-3` with automatic file versioning. Do not overwrite existing versioned files.

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
- `final-summary-v1.md`
- `final-summary-v1.json`
- `orchestration-summary-v1.md`

If a file already exists, increment the version number.

Required roles: Orchestrator, Lead Technical Writer, Docs Tooling Engineer, Technical Project Manager.

## Role file requirements
Each `skills/<role>.md` file must contain:
- Role name and ID
- Tower/category
- Responsibilities (including TUI-specific duties)
- Job description
- Skill set
- SoD permissions: allowed actions and forbidden actions
- Input artifacts required
- Output artifacts produced
- Gate conditions for that role
- Tools the role may use

## Package and tooling requirements
- `package.json` must be `"type": "module"`.
- Use pnpm scripts such as:
  - `pnpm 阿公啱:run`
  - `pnpm 阿公啱:report`
  - `pnpm security:check`
  - `pnpm compliance:check`
  - `pnpm sbom:generate`
- Tool adapters under `tools/` should invoke local free tools, preferably TS/JS-native packages. If a non-JS local CLI is required, justify it in `tools/README.md`.
- No external AI cloud APIs. The MCP itself is driven by OpenCode.

## Final definition of done
- The full MCP structure exists and is registered in `opencode.jsonc`.
- All 39 role files exist and are valid.
- The TUI clarification loop is implemented and functional.
- The `阿公啱` command runs all phases in order.
- Phase gates are enforced.
- SoD violations are blocked and logged.
- SSOT is stable and conflict-free.
- `Doc-1`, `Doc-2`, and `Doc-3` are complete.
- Security and compliance reports are generated.
- SBOM is generated in XML and Markdown.
- Requirements traceability matrix is complete.
- Reports are automatically versioned by file name.
- All work is local-first, free-to-use, TS/JS-native, and pnpm-based.

Begin by building the MCP itself. Do not create a demo application unless explicitly requested.
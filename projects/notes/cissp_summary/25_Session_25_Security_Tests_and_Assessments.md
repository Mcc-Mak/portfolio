# Session 25: Security Tests and Assessments (CISSP Objectives 6.1, 6.3, 6.5)

**Videos:** V180 – V186  
**Core Focus:** Security test and assessment planning, performance and risk indicators (KPIs/KRIs), collecting security process data (administrative, technical), account management data, verifying training and awareness, and disaster recovery/business continuity data.

---

## Video V180 (Outline): Security Tests and Assessments (Section Intro)

**Objective:** To introduce the key topics in security tests and assessments for the CISSP exam.

### Topics Covered in this Session
1.  Security Test and Assessment Planning (scope, strategy, audits)
2.  Performance and Risk Indicators (KPIs, KRIs)
3.  Collecting Security Process Data (administrative, technical)
4.  Account Management Data (lifecycle: creation, modification, auditing, deletion)
5.  Verifying Training and Awareness (records, compliance, remediation)
6.  Disaster Recovery and Business Continuity Data (BCP/DRP tests, backup data)

---

## Video V181: Security Test and Assessment Planning

**Objective:** To explain security test vs. assessment, strategy, and audit types.

### I. Core Concepts & Purpose
- **Goal:** Verify security controls provide the proper level of protection
- **Key Distinction:** Terms (test, assessment, audit) are often used interchangeably, but have different purposes

### II. Security Test vs. Security Assessment

| Aspect | Security Test | Security Assessment |
| :--- | :--- | :--- |
| **Focus** | Specific function of a control | Overall risk of a system/component/application |
| **What it verifies** | Performance & effectiveness of a control | Security posture against organizational policy |
| **Depth** | Narrow, specific | Broad, in-depth |
| **Output** | Identifies flaws in one function | Report for senior managers/stakeholders on risk decisions |

### III. Test & Assessment Strategy
- **Scope:** What is included? (e.g., new server vs. compliance requirement)
- **Impact of failure:** Critical business function/asset?
- **Resources & personnel:** Administrators, engineers, developers, tools, licenses
- **Test criteria:** Define success/failure, best execution method
- **Approval:** Document plan to gain senior manager buy-in

### IV. Security Audits (a type of assessment)
- **Key feature:** Independent body → impartial view
- **Purpose:** Compliance with governance/regulations
- **Critical aspect:** Configuration management & change control

### V. Types of Audits

| Type | Who performs | Reports to | Key characteristic |
| :--- | :--- | :--- | :--- |
| **Internal** | Internal personnel (no reporting line to security managers) | Executive officer (CEO, CIO, CISO) | Self-audit before external audit |
| **External** | Outside organization | Executive officer (may recruit internal help) | Eliminates conflict of interest |
| **Third-party** | Outside team (on behalf of another organization) | Outside organization (accrediting body) | For compliance, contracts, or acquisitions; neutral |

### VI. Exam Takeaways
- Know the **difference** between a security test and a security assessment
- Understand the **purpose** of a security audit
- Know the **types of audits** (internal, external, third-party)

---

## Video V182: Performance and Risk Indicators

**Objective:** To explain Key Performance Indicators (KPIs) and Key Risk Indicators (KRIs).

### I. Purpose of Indicators
- Used during security assessments/tests to identify potential **failure** or **success**
- Two main types:
  - **Key Performance Indicators (KPIs)** – Measure *security performance*
  - **Key Risk Indicators (KRIs)** – Measure *known security risks*

### II. Measurement Examples
- Risk assessment/analysis results (quantitative or qualitative)
- Vulnerability assessment results (number & severity of vulnerabilities)
- Security assessment test procedure results
- Security incident occurrences (response time, recovery, evidence handling)
- Patch level compliance

### III. Interplay Between KPIs & KRIs
- Example: Low patching frequency → **KPI** shows poor performance → increases vulnerabilities → **KRI** shows elevated risk

### IV. Real-Time Monitoring
- Via **SIEM** (e.g., Splunk, AlienVault)
- Dashboards can track account status, logins, threats, vulnerabilities, SLA compliance

### V. Reference Guides
- **NIST SP 800-55** – Performance Measurement Guide for Information Security
- **ISO 27004** – Monitoring, measurement, analysis, evaluation
- **ITIL** – Security management (IT Infrastructure Library)

### VI. Exam Takeaways
- Understand **purpose** of KPIs and KRIs
- Know **metric measurement options** (what can be measured and how)

---

## Video V183: Collecting Security Process Data

**Objective:** To explain the types of data to collect for security tests and assessments.

### I. Purpose of Collecting Security Data
- Support security tests, assessments, or audits
- Provide evidence for management approval
- Quality depends on proper inputs

### II. Quality Determinants (Triple Constraint)
Quality is affected by three factors:
- **Scope** – what is being tested
- **Time** – duration available for testing
- **Cost** – resources/funding required

### III. Types of Data to Collect

| Data Type | Examples |
| :--- | :--- |
| **Administrative Data** | Policies, processes, procedures, records, logs, archive data, data from other departments (Finance, HR) |
| **Technical Data** | System logs, software code, configuration files, change management records, system diagrams, data flow diagrams |

### IV. Role of Management
- **Resource allocation** – administrators, engineers, architects
- **Understanding** – clear communication of purpose and scope
- **Formal approval** – documented in policy, procedure, or change control

### V. Documentation Requirements
- Expected outcomes
- Schedule (start/end dates and times)
- Risk exceptions
- Out-of-scope items

### VI. Exam Takeaways
- Understand the **purpose** of collecting process data
- Collect **administrative** and **technical** data
- Obtain **management support and formal approval** for success

---

## Video V184: Account Management Data

**Objective:** To explain the account management lifecycle for security tests and assessments.

### I. Core Concept
- Accounts (identities + authenticators) are critical components of security assessments
- Goal: Ensure authorized subjects maintain proper privilege levels and avoid privilege creep

### II. Key Focus: Account Management Lifecycle

| Stage | Description |
| :--- | :--- |
| **Creation** | Obtain list of system accounts (centralized: AD, LDAP, RADIUS, TACACS; local auth). Review for authorized/unauthorized accounts. Examine logs for creation details (possible insider threat). |
| **Modification** | Review logs to verify account actions are captured correctly. Check that provisioning (adding privileges) and de-provisioning (removing privileges) are logged. |
| **Auditing** | Regularly (annually or per policy/regulation) review accounts for proper privilege levels. Identify non-compliant accounts (inactive but not disabled → recommend disable; long-disabled → archive or delete). |
| **Deletion / Revocation** | Recommend access revocation, de-provisioning, or deletion based on audit findings. Follow governance/regulatory retention periods (e.g., 3, 5, 7 years). |

### III. Exam Takeaways
- Understand each step of the account management lifecycle as it applies to security testing and assessments

---

## Video V185: Verifying Training and Awareness

**Objective:** To explain the importance of auditing security training and awareness programs.

### I. Purpose & Context
- Part of **Security Assessment / Security Test** data collection
- Focuses on **Administrative Controls** (Training & Awareness)

### II. Key Definitions
- **Awareness:** Raising attention to foundational security requirements and employee responsibilities
- **Training:** Teaching personnel how to perform duties *securely*

### III. Data Collection Focus: Training Records
- Map training records to specific **training objectives** (e.g., anti-phishing)
- Review **Key Risk Indicators (KRIs)** & **Key Performance Indicators (KPIs)**
- Understand **compliance requirements** per objective
- **Handle sensitive data carefully** (e.g., remove employee IDs)

### IV. Assessment Goals
- Determine if security is being met via current training
- Identify **emerging threats, new vulnerabilities, or missing risks** (due diligence)
- Check attendance and completion rates

### V. Handling Non-Compliance
- Identify **non-compliant personnel** and **frequent offenders**
- Apply **remedial training** (makeup sessions, on-demand)
- Consider **revoking privileges/access** until training is complete

### VI. Exam Takeaways
- Auditing training & awareness provides **situational awareness** of program effectiveness
- Reflects **due care** (creating training) and **due diligence** (updating training)

---

## Video V186: Disaster Recovery and Business Continuity Data

**Objective:** To explain BC/DR testing, backup methods, and assessment of recovery data.

### I. Core Concepts
- **Business Continuity (BC):** Assessing and minimizing risks to *critical business processes* during major disruptions
- **Disaster Recovery (DR):** Processes/procedures to *recover* those critical processes after a disruption
- **Simple distinction:** BC = business functions; DR = information technology

### II. Key Documents & Artifacts to Review
- **BCP & DR Plan:** Obtain copies (if they exist)
- **Latest test results:** Identify age (e.g., 2-year-old results indicate remediation needed)

### III. Types of DR Tests

| Test Type | Description | Assessment Focus |
| :--- | :--- | :--- |
| **Checklist / Read-through** | Individual review of plan | Gaps in review/comments |
| **Structured walkthrough / Tabletop** | Team reviews together | Issues in controls, redundancy, high availability |
| **Simulation test** | Scenario-based (natural/manmade disaster) | Remedial steps identified & fixed |
| **Parallel test** | Execute procedures without impacting operations | Most attention needed; tests recovery site, no disruption |
| **Full interruption test** | Impact operations; move to recovery/cloud site | Verify controls, missing procedures, logical/technical controls |

### IV. Backup Data Assessment
- **Gather:** tapes, discs, drives
- **Test for:** proper retention requirements, archiving best practices (encryption at rest), recovery from potential data loss
- **Review backup logs:** frequency, policy compliance, encryption at rest

### V. Backup Methods

| Method | Description |
| :--- | :--- |
| **Full backup** | Complete copy of all data (objects + user data) |
| **Differential backup** | Data changed since last *full* backup |
| **Incremental backup** | Data changed since last *full* or *incremental* backup |

### VI. Key Validation Questions
- Can we recover from the full backup?
- Are differential/incremental backups correctly capturing modified data?
- Is rotation properly overwriting oldest data first, retaining most current?

### VII. Exam Takeaways
- Understand the **purpose** of BC & DR testing
- Know the **different DR tests**
- Understand the **purpose of testing data backups**
- Know the **different data backup methods**

---

## Session 25 Summary

Session 25 covers the **complete security tests and assessments landscape** for the CISSP exam (Objectives 6.1, 6.3, 6.5). Key takeaways include:

1. **Security Test and Assessment Planning (V181):** Tests = narrow, specific (control performance). Assessments = broad, in-depth (risk posture). Audits = independent, compliance-focused. Types: internal, external, third-party.

2. **Performance and Risk Indicators (V182):** KPIs measure security performance. KRIs measure known security risks. Examples: risk assessment results, vulnerability scan results, incident occurrences, patch compliance. Reference: NIST SP 800-55, ISO 27004.

3. **Collecting Security Process Data (V183):** Triple constraint (scope, time, cost) affects quality. Administrative data (policies, procedures, logs) + Technical data (system logs, code, config files, diagrams). Requires management support and formal approval.

4. **Account Management Data (V184):** Lifecycle: Creation (review authorized/unauthorized accounts) → Modification (log provisioning/deprovisioning) → Auditing (regular reviews, identify non-compliant accounts) → Deletion/Revocation (follow retention periods, disable not delete).

5. **Verifying Training and Awareness (V185):** Training records map to objectives. KPIs/KRIs for training effectiveness. Identify non-compliant personnel. Remedial training and possible privilege revocation.

6. **Disaster Recovery and Business Continuity Data (V186):** DR tests: checklist, structured walkthrough/tabletop, simulation, parallel (no ops impact), full interruption (impacts ops). Backup methods: full, differential, incremental. Validate recovery, retention, encryption.

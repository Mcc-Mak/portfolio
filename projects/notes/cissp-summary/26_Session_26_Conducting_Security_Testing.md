# Session 26: Conducting Security Testing (CISSP Objectives 6.2, 6.4)

**Videos:** V187 – V199  
**Core Focus:** Vulnerability assessments, vulnerability scanning (credentialed, non-credentialed, discovery scans), penetration testing (concepts, phases, teams, breach attack simulation), log reviews, software testing methods (white/black/gray box, unit, integration, regression, fuzzing), software code reviews (Fagan inspection), misuse testing, interface testing, compliance testing (SOC reports, PCI DSS, CSA STAR), test coverage analysis, and analyzing test results.

---

## Video V187 (Outline): Conducting Security Testing (Section Intro)

**Objective:** To introduce the key topics in conducting security testing for the CISSP exam.

### Topics Covered in this Session
1.  Vulnerability Assessments (SCAP, CVSS, CVE, CPE)
2.  Vulnerability Scanning (credentialed, non-credentialed, discovery scans)
3.  Penetration Testing (concepts, white/black/gray box, red/blue/purple teams, breach attack simulation)
4.  Penetration Testing Phases (discovery → scanning → exploitation → post-exploitation → reporting)
5.  Log Reviews (syslog, NTP, audit trails)
6.  Software Testing Methods (white/black/gray box, unit, integration, regression, fuzzing)
7.  Software Code Reviews (static, dynamic, Fagan inspection)
8.  Misuse Testing (abuse case testing, UML)
9.  Interface Testing (API, user interface, physical interfaces)
10. Compliance Testing (SOC 1/2/3, PCI DSS merchant levels, CSA STAR)
11. Test Coverage Analysis (branch, condition, functional, loop, statement coverage)
12. Analyzing Test Results (executive summary, remediation, exceptions)

---

## Video V188: Vulnerability Assessments

**Objective:** To explain vulnerability assessment purpose, SCAP components, and scoring systems.

### I. Purpose of Vulnerability Assessment
- **Goal:** Identify and categorize security flaws/weaknesses
- **Benefits:** Understand security risks; prioritize response to vulnerabilities

### II. Prerequisite: Accurate System Inventory
- Track hardware, software, firmware types; manufacturer, product name, version

### III. Vulnerability Management Process (High-Level Steps)
1.  **Detect** potential vulnerabilities
2.  **Validate** if the vulnerability actually impacts your systems (using inventory)
3.  **Remediate** (fix/reduce) the vulnerability

### IV. Sources for Vulnerability Information
- NIST National Vulnerability Database (NVD)
- Mitre CVE (Common Vulnerabilities and Exposures)
- US-CERT
- Major vendors (Microsoft, Cisco, Amazon, Google, VMware)

### V. Security Content Automation Protocol (SCAP)
- **Developer:** NIST (see SP 800-126)
- **Purpose:** Standardized framework for reporting vulnerabilities and system configuration

**SCAP Languages:**

| Language | Full Name | Purpose |
| :--- | :--- | :--- |
| **XCCDF** | Extensible Configuration Checklist Description Format | Security checklist/benchmark results (most common) |
| **OVAL** | Open Vulnerability and Assessment Language | Configuration info, machine states, assessment results |
| **OCIL** | Open Checklist Interactive Language | Info from people or existing data stores (less common) |

**SCAP Identification Schemes:**

| Scheme | Defines |
| :--- | :--- |
| **CPE** (Common Platform Enumeration) | Hardware, OS, applications |
| **SWID** (Software Identification) | Software identifier + metadata |
| **CCE** (Common Configuration Enumeration) | Dictionary of software security configurations |
| **CVE** (Common Vulnerabilities and Exposures) | Security-related software flaws |

**SCAP Scoring Systems:**

| System | Purpose |
| :--- | :--- |
| **CVSS** (Common Vulnerability Scoring System) | Severity score for a flaw (most commonly used) |
| **CCSS** (Common Configuration Scoring System) | Severity for a configuration issue |

### VI. SCAP-Compatible Tools
- OpenSCAP (Unix/Linux only), Tripwire, Nessus, InsightVM (Rapid7)

### VII. Exam Takeaways
- Understand the **purpose** of a vulnerability assessment
- Know **SCAP** and its **different components** (languages, schemes, scoring systems)

---

## Video V189: Vulnerability Scanning

**Objective:** To explain vulnerability scanning types, discovery scans, and best practices.

### I. Definition & Purpose
- **Vulnerability scanning** = using automated tools to identify and categorize vulnerabilities
- Common tools: Nessus, InsightVM, OpenVAS, Nmap, Qualys, Nikto, Tripwire

### II. Types of Scans (by Access Level)

| Scan Type | Description | Outcome |
| :--- | :--- | :--- |
| **Non-credentialed** | Read-only, general user access | Fast but limited results |
| **Credentialed (Authenticated)** | Logs in with privileged credentials | Thorough scan: patching levels, configs, etc. |

### III. Discovery Scans (e.g., with Nmap)
- **Goal:** Find active hosts on an IP range/subnet (not vulnerabilities)
- **Method:** SYN scan ("half-open" TCP handshake) – sends SYN, waits for SYN/ACK
- **Port statuses:** Open, Closed, Unknown/Filtered (blocked by firewall/security)

### IV. Other Scan Techniques
- **ACK scan:** Sends ACK packet to test for firewalls and filtered ports
- **Xmas scan:** Sends PSH, URG, FIN flags (all except SYN/ACK)
- **UDP scan:** Checks UDP services (no handshake, connectionless)

### V. Vulnerability Scanning Itself
- Compares target host against a **signature database**
- **Scope:** Networks, applications, databases, OSes
- **Post-scan actions:** Analyze & prioritize findings, rule out false positives, create assessment report

### VI. Important Operational Rules
- **Do NOT fix anything without approval** – can impact production, change control
- Follow organizational processes methodically

### VII. Best Practices for Scanning
- Communicate clearly: what, when, how long
- Run during off-hours / low activity
- Keep scanners updated with latest vendor signatures
- Scan small host groups (e.g., /24 networks)
- Test scanner configs/profiles in dev/test/sandbox first
- Avoid tools that auto-apply remediations

### VIII. Exam Takeaways
- Purpose of a vulnerability scan
- Meaning of credentialed/authenticated scans
- Different scan types (SYN, ACK, Xmas, UDP, connect)
- Scanning best practices

---

## Video V190: Penetration Testing

**Objective:** To explain penetration testing concepts, test types (white/black/gray box), teams (red/blue/purple), and breach attack simulation.

### I. Core Concept of Penetration Testing
- **Definition:** Simulates a system attack by attempting to exploit known or discovered vulnerabilities
- **Scope:** Physical (locks, doors, guards) or logical (software, networks)
- **Perspective:** Tests security from an attacker's point of view

### II. Rules of Engagement (ROE)
- An agreement defining how and why the test is conducted
- **Key elements:** Scope, test objectives, permitted techniques, reporting requirements
- **Purpose:** Provides legal protection for both testers and the organization

### III. Types of Penetration Tests

| Type | Also Known As | Knowledge Level | Cost |
| :--- | :--- | :--- | :--- |
| **White box** | Full-knowledge | All details known to testers | Cheapest |
| **Black box** | No/zero knowledge | No test details shared | Most expensive |
| **Gray box** | Partial knowledge | Some information provided, some withheld | Middle ground |

### IV. Penetration Testing Teams
- **Red Team:** Simulates the attacker
- **Blue Team:** Defends against the attack (SOC, security analysts)
- **Purple Team:** Collaboration between red and blue teams to strengthen security posture

### V. Breach and Attack Simulation (BAS)
- **Definition:** Automated testing to determine if security controls can detect and respond to threats
- **Method:** Uses synthetic transactions and attack simulations (SYN scans, brute force)
- **Purpose:** Identify security risks for remediation
- **Deployment:** Agent-based or agent-less
- **Example provider:** FireEye (Mandiant product)

### VI. Popular Penetration Testing Distributions/Tools
- Kali Linux (Debian-based, most popular), Parrot OS, BlackArch, Core Impact, BAC BOX

### VII. Exam Takeaways
- Understand purpose of pen testing and rules of engagement
- Know the three test types (white, black, gray box)
- Know the team roles (red, blue, purple)
- Understand the purpose of breach and attack simulations

---

## Video V191: Penetration Testing Phases

**Objective:** To explain the five phases of penetration testing.

### I. Overview & Context
- **Purpose:** Simulate a system attack from an attacker's perspective
- **Five core phases:** Discovery, Scanning, Exploitation, Post-Exploitation, Reporting

### II. Phase Details

| Phase | Type | Methods | Goal |
| :--- | :--- | :--- | :--- |
| **1. Discovery / Reconnaissance** | Passive (undetected) | OSINT, footprinting | Collect info without interacting with system |
| **2. Scanning** | Active (detectable) | Ping sweeps, port scans, banner grabs, vulnerability scans, enumeration | Find vulnerabilities/weaknesses |
| **3. Exploitation** | Active | Manual or automated tools (Metasploit) | Bypass security controls, avoid IoCs |
| **4. Post-Exploitation** | Active | Pivot laterally, maintain access, cover tracks | Maintain access, erase evidence |
| **5. Reporting** | Documentation | Executive summary, technical report | Document findings and recommended remediations |

### III. Post-Test Cleanup (Not an official phase but recommended)
- Recover crashed/disrupted hosts
- Remove tools, scripts, outputs to prevent unauthorized access
- Leave the system in the same condition as found

### IV. Exam Takeaways
- Clearly understand each phase and what happens during it

---

## Video V192: Log Reviews

**Objective:** To explain system logs, syslog, NTP, and log security best practices.

### I. Definition & Purpose of Logs
- A log is a **record** of system-related changes and events in **chronological order**
- Also called **audit logs** or **audit trails** (used to audit system events)

### II. Syslog Standard
- **Syslog** = standardized format for consistent log data collection and transfer
- **Components:** Facility codes (e.g., 4 = auth/authorization), Severity levels (0 = most info, 7 = least info)
- **Weakness:** No built-in authentication → weak security

### III. Clock Synchronization (NTP)
- Critical for creating accurate **chronological audit trails**
- **NTP (Network Time Protocol)** – port 123, UDP, connectionless
- **Stratum clocks:** Stratum 0 (most accurate: GPS, atomic clocks), Stratum 1 (network appliance), Stratum 2 (individual computers)
- **For logging, use Stratum 0 or 1** (not Stratum 2)

### IV. Log Protection & Best Practices
- Send logs to a **remote log server/repository** → prevents local tampering
- Set **proper file/directory privileges** (read access allowed, no modification/deletion)
- Use **hashing** to ensure data integrity
- Periodically **test and assess** log capabilities for compliance

### V. Exam Takeaways
- Understand system logs and their purpose
- Know **syslog** (standardized format, facility codes, severity levels)
- Know **clock synchronization (NTP, stratum levels)**
- Know **log review security best practices**

---

## Video V193: Software Testing Methods

**Objective:** To explain software testing methods, box tests, and fuzzing.

### I. Purpose of Software Testing
- Verify functionality & configuration
- Find flaws, defects, vulnerabilities, security risks

### II. Three Main Testing Methods (Knowledge-based)

| Method | Knowledge Level | Typical Context |
| :--- | :--- | :--- |
| **White Box** | Full working knowledge (source code known) | Internal testing team |
| **Black Box** | No working knowledge (user perspective) | External auditors / assessments |
| **Gray Box** | Combination (some knowledge, some unknown) | Mixed internal/external testing |

### III. Specific Test Types (Outcome-focused)

| Test Type | Focus |
| :--- | :--- |
| **System / Acceptance** | Verifies functional & security requirements; customer needs |
| **Unit** | Specific component (script, module) |
| **Integration** | How ≥2 technologies work together |
| **Regression** | Ensures new changes don't break existing functionality |
| **Sanity** | Quick check if a feature works as expected (early R&D) |
| **Smoke** | Quick assessment of basic functionality after build |
| **Fuzz (Fuzzing)** | Dynamic test with invalid inputs to find crashes, overflows, flaws |

### IV. Fuzz Testing Details
- **Goal:** Discover vulnerabilities by testing limits
- **Mutation Fuzzing (dumb fuzzing):** Modifies valid operational data (seed data) to create invalid inputs
- **Generational Fuzzing (smart/intelligent fuzzing):** Creates data from an input model to generate invalid inputs

### V. Exam Takeaways
- Know the different software testing methods
- Understand fuzz testing

---

## Video V194: Software Code Reviews

**Objective:** To explain static/dynamic code reviews and the Fagan inspection process.

### I. Definition & Purpose
- A code review = reviewing developed software code to find flaws, defects, vulnerabilities, and security risks
- Goal: discover and resolve flaws before software goes into production/operations

### II. Two Types of Code Reviews

| Type | Description |
| :--- | :--- |
| **Static** | Analyzing code without executing it (SAST) |
| **Dynamic** | Analyzing code while it runs in a production/operational environment (DAST) |

### III. Key Process: Fagan Inspection

| Step | Description |
| :--- | :--- |
| **Planning** | Organize and prepare for the review |
| **Overview** | Determine scope of the review |
| **Preparation** | Define roles, responsibilities, and expected outcomes |
| **Inspection** | Analyze code to identify actual flaws |
| **Rework** | Determine remediation for confirmed flaws |
| **Follow-up** | Verify that the flaw remediation has been applied |

### IV. Exam Takeaways
- Understand static vs. dynamic code reviews
- Know the Fagan inspection process

---

## Video V195: Misuse Testing

**Objective:** To explain misuse (abuse) case testing and its steps.

### I. Definition & Purpose
- **Also known as:** Abuse case testing
- **Concept:** Simulating system misuse from an attacker's or user's perspective
- **Goal:** Determine how a user/attacker could misuse or abuse the system

### II. Typical Steps
1.  **Identify critical assets** (business functions, apps, services)
2.  **Categorize & prioritize** what to test
3.  **Define security goals** (expected outcomes & what aspects need protection)
4.  **Identify threats** that pose a risk to critical assets
5.  **Analyze risks** (from threat modeling/risk analysis)
6.  **Define security requirements** (prioritize what to defend)

### III. Visual Representation (UML)
- Uses **Unified Modeling Language (UML)** diagrams
- Maps interactions of legitimate users vs. attackers

### IV. Exam Takeaways
- Understand the **purpose** of a misuse test
- Clearly understand the **steps to planning** a misuse test

---

## Video V196: Interface Testing

**Objective:** To explain interface testing for APIs, user interfaces, and physical interfaces.

### I. Definition
- **Interface testing** = testing system interconnections used to exchange data

### II. Types of Interfaces
- **Application Programming Interface (API)** – how software apps talk to servers/other apps
- **User Interface** – how users interact with systems (web apps, SIEM, vulnerability scanner)
- **Physical Interfaces** – cables, wireless connections to switches, routers, firewalls

### III. Testing Approach (Unified)
- Understand **how data is exchanged** across the interface
- Validate **security controls** and **secure information flow**

### IV. Test Focus Areas
- Can target **confidentiality, integrity, or availability** (one or all three)
- Examines system response to valid inputs, invalid inputs, errors, failures

### V. When Performed
- During **system development**, **security assessments**, **security audits**

### VI. Exam Takeaways
- Understand **both ends** of an interface
- Must be tested **methodically**
- Know the **purpose** of interface testing and the **different interface types**

---

## Video V197: Compliance Testing

**Objective:** To explain compliance testing, SOC reports, PCI DSS merchant levels, and CSA STAR.

### I. Definition & Purpose
- **Compliance testing:** Ensuring an organization adheres to established security standards, practices, or regulations
- **Purpose:** Identify vulnerabilities, demonstrate commitment to data protection, and show due diligence

### II. SOC Reports (from SSAE 18)

| Report | Focus | Distribution |
| :--- | :--- | :--- |
| **SOC 1** | Internal Control over Financial Reporting (ICFR); used for SOX compliance | Restricted to management/auditors |
| **SOC 2** | Security, availability, integrity, confidentiality, privacy (Trust Service Criteria) | Highly restricted (NDA required) |
| **SOC 3** | General use, public summary of SOC 2 Type II | Freely distributable |

**Types for SOC 1 & 2:**
- **Type I:** Point-in-time evaluation (snapshot) – suitability of control design
- **Type II:** Over a period of time (e.g., 4-6 months) – operating effectiveness

### III. PCI DSS Merchant Levels

| Level | Annual Transactions | Requirement |
| :--- | :--- | :--- |
| 1 | > 6 million | Report on Compliance (ROC) by Qualified Security Assessor (QSA) |
| 2 | 1–6 million | Self-Assessment Questionnaire (SAQ) |
| 3 | 20,000 – 1 million | SAQ |
| 4 | < 20,000 | SAQ |

### IV. CSA STAR Assurance Levels

| Level | Description |
| :--- | :--- |
| **Level 1** | Self-assessment – suitable for low-risk deployments, no regulated data |
| **Level 2** | Third-party audit – required for medium/high-risk deployments or regulated data |

### V. Exam Takeaways
- Understand SSAE 18 and SOC report types (1, 2, 3 and I/II)
- Know PCI DSS merchant level thresholds (especially Level 1 vs. others)
- Differentiate CSA STAR Level 1 (self) vs. Level 2 (third-party)

---

## Video V198: Test Coverage Analysis

**Objective:** To explain test coverage analysis and coverage criteria.

### I. Definition & Purpose
- **Test coverage analysis** = estimating the level of testing performed on a product
- It's a **calculation:** `(test cases executed) / (total possible test cases)`
- Gives a **level of confidence** in the product's correctness and safety

### II. Coverage Criteria (types of testing coverage)

| Criteria | What it ensures |
| :--- | :--- |
| **Branch coverage** | Every decision branch (parallel code versions) has been tested |
| **Condition coverage** | All logical conditions in routines/subroutines have been tested |
| **Functional coverage** | Every program function has been tested |
| **Loop coverage** | All loop statements have been tested (prevents infinite loops & DoS) |
| **Statement coverage** | Every code statement has been tested |

### III. Coverage Levels
- Determined by **criticality of the application** and **sensitivity of data** processed
- **Priority:** Personal safety > security > data/system protection

### IV. Exam Takeaways
- Know the **purpose** of test coverage analysis
- Understand the **different coverage criteria**

---

## Video V199: Analyzing Test Results

**Objective:** To explain how to process test output, create reports, handle remediation and exceptions.

### I. Purpose & Context
- After a security assessment/test, output/report is generated
- Goal: Analyze tool outputs, test procedures, errors, and lessons learned

### II. Key Elements of a Good Report
- **Clear definition** of actions taken, expected outcomes, and a high-level summary
- **Target audience consideration** – different information for senior management (business impact) vs. admins (technical details)
- **Balance** – too much detail = ineffective; too little = poor decisions

### III. Types of Reports
- **Assessment report** – approach & findings (control tests, privacy impact assessments)
- **Audit report** – compliance-related tests (self-assessments, third-party audits)
- Both serve **ethical disclosure** (responsibility to report vulnerabilities)

### IV. Core Report Contents
- **Executive summary** – for senior management: business impacts, critical findings, recommendations
- **Threats & vulnerabilities** – include all findings, reference CVEs, NVD, vendor patches
- **Criticality/importance** – severity (critical/high) + likelihood of occurrence
- **Exposure factor / potential impact** – percentage of asset loss if exploited
- **Remediations / fix actions** – specific recommendations (patching, config changes)
- **Exceptions** – known non-compliant items excluded from testing

### V. Remediation Guidelines
- Recommend how to correct or apply compensating controls
- **Never fix without authorization** – violates change control
- Present recommendations to owners/management, then execute per organizational policy

### VI. Exception Handling
- Exclusions for known findings that won't be fixed within required timeframe
- Reduces time, energy, and cost in analysis

### VII. Exam Takeaways
- Process test output information correctly
- Follow **ethical disclosure** – report findings
- Include essential report components (exec summary, threats, criticality, impact, remediations, exceptions)
- Understand remediation process & exception handling

---

## Session 26 Summary

Session 26 covers the **complete conducting security testing landscape** for the CISSP exam (Objectives 6.2, 6.4). Key takeaways include:

1. **Vulnerability Assessments (V188):** SCAP framework (XCCDF, OVAL, OCIL), identification schemes (CPE, SWID, CCE, CVE), scoring (CVSS, CCSS).

2. **Vulnerability Scanning (V189):** Credentialed (thorough) vs. non-credentialed (fast). Discovery scans (SYN, ACK, Xmas, UDP). Best practices: off-hours, small groups, test first, no auto-remediation.

3. **Penetration Testing (V190):** White box (full knowledge, cheapest), black box (no knowledge, most expensive), gray box (partial). Teams: red (attack), blue (defend), purple (collaborate). BAS automates attack simulation.

4. **Penetration Testing Phases (V191):** Discovery (passive) → Scanning (active) → Exploitation → Post-Exploitation (pivot, maintain access, cover tracks) → Reporting (executive summary, technical report).

5. **Log Reviews (V192):** Syslog (facility codes, severity levels). NTP for time sync (Stratum 0/1). Log protection: remote server, hashing, access controls.

6. **Software Testing Methods (V193):** White/black/gray box. Unit, integration, regression, sanity, smoke, fuzzing (mutation/generational).

7. **Software Code Reviews (V194):** Static (SAST, code not running) vs. Dynamic (DAST, code running). Fagan inspection: Planning → Overview → Preparation → Inspection → Rework → Follow-up.

8. **Misuse Testing (V195):** Abuse case testing. Steps: identify assets → define goals → identify threats → analyze risks → define requirements.

9. **Interface Testing (V196):** API, user interface, physical interfaces. Validate data exchange and security controls.

10. **Compliance Testing (V197):** SOC 1 (financial, SOX), SOC 2 (security, CIA, privacy), SOC 3 (public). PCI DSS: Level 1 (ROC + QSA), Levels 2-4 (SAQ). CSA STAR: Level 1 (self), Level 2 (third-party).

11. **Test Coverage Analysis (V198):** Branch, condition, functional, loop, statement coverage. Determined by criticality and data sensitivity.

12. **Analyzing Test Results (V199):** Executive summary for management, technical details for admins. Ethical disclosure. Remediation requires authorization. Exception handling for known non-compliant items.

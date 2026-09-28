# Session 28: Logging and Monitoring (CISSP Objective 7.2)

**Videos:** V208 – V215  
**Core Focus:** Logging and monitoring fundamentals, Security Information and Event Management (SIEM), threat intelligence, MITRE ATT&CK framework, Cyber Kill Chain, Security Orchestration Automation and Response (SOAR), and User/Entity Behavior Analytics (UEBA).

---

## Video V208 (Outline): Logging and Monitoring (Section Intro)

**Objective:** To introduce the key topics in logging and monitoring for the CISSP exam.

### Topics Covered in this Session
1.  Logging and Monitoring Fundamentals (centralized/decentralized logs, audit trails, clipping levels)
2.  Security Information and Event Management (SIEM) (collection, correlation, alerting, reporting)
3.  Threat Intelligence (threat feeds, threat hunting, situational awareness)
4.  MITRE ATT&CK Framework (tactics, techniques, procedures – TTPs)
5.  Cyber Kill Chain (reconnaissance → weaponization → delivery → exploitation → installation → C2 → actions on objective)
6.  Security Orchestration Automation and Response (SOAR) (playbooks, runbooks, automated incident response)
7.  User/Entity Behavior Analytics (UEBA) (anomaly detection, baselining, advanced threat detection)

---

## Video V209: Logging and Monitoring

**Objective:** To explain logging fundamentals, centralized/decentralized logging, audit trails, clipping levels, and log security.

### I. Core Concepts
- **Logging (Digital):** A system-generated record/journal of system-related events
- **Audit Logging:** The examination of log files to investigate events and assess organizational compliance (auditing is the *process*, logging is the *capture*)
- **Events:** System or network-related activities that can be recorded (most computer/network/application actions can be logged)

### II. Key Events to Log (Typical Requirements)
- Successful & unsuccessful logon attempts
- Successful & unsuccessful access attempts to objects (files, directories, code execution)
- Start/end date & time of user sessions
- Account creation, modification, or revocation
- Privilege-level system access (sudo, root, admin)
- Program/application initiations and terminations

### III. Log Deployment Models
- **Centralized:** All logs sent to one central log server (e.g., for SIEM, backups). *Best practice: real-time central collection + local copies to protect integrity.*
- **Decentralized:** Each device (firewall, switch, server) maintains its own logs

### IV. Critical Log Attributes (The "Who, What, When, Where, Result")
- **Who:** User or system account
- **What:** Action taken
- **When:** Date/time (must be synced to **stratum 0/1 time source or NTP**)
- **Where:** Hostname, IP address
- **Result:** Success or failure

### V. Audit Trail & Time Importance
- Created by **aggregating** logs and **correlating** events (by date/time, hostname, username) across multiple files
- Essential for proving an event occurred and for traceability, troubleshooting, and legal admissibility

### VI. Monitoring Types
- **Ingress (North-South, inbound):** Communications from external to internal networks. Provides early threat/attack/intrusion detection.
- **Egress (Southbound, outbound):** Communications from internal to external networks. Protects against sensitive data exfiltration (using DLP).

### VII. Clipping Levels (Thresholds)
- Avoid collecting excessive log data by setting a **threshold**
- Example: Don't log a single failed login; log only after **3 consecutive failures**
- Policy/industry driven

### VIII. Log Security & Protection
- **Limit access** to logs
- **Encrypt** logs at rest/in archive
- **Retain** logs per regulations (1, 3, 5+ years depending on industry)
- **Protect integrity in transit:** secure protocols, network segmentation/isolation
- **Secure log-generating components** to ensure authenticity (critical for legal admissibility)

### IX. Relevant Standards (for exams)
- **ISO 27001:** Information security management, log management controls
- **NIST SP 800-53:** Log collection controls
- **NIST SP 800-92:** Guide to computer security log management (in-depth how-to)

### X. Exam Takeaways
- Understand purpose of logging
- Know centralized vs. decentralized logging
- Know system monitoring techniques (ingress/egress)
- Understand log security principles

---

## Video V210: Security Information and Event Management (SIEM)

**Objective:** To explain SIEM purpose, components, deployment, and capabilities.

### I. Definition & Core Purpose
- **SIEM** stands for **Security Information and Event Management**
- **Primary Use:** Real-time analysis of security-related events for advanced threat detection
- **Key Function:** Collects log data from multiple system components into a central point, then analyzes and formats it for detection

### II. Historical Evolution
- **SIM** (Security Information Manager): Gathered logs into a central repository/log server
- **SEM** (Security Event Manager): Correlated and analyzed logs for security events
- **Current State:** SIM and SEM are now merged into a single SIEM product

### III. Deployment Context
- Commonly found in **Security Operations Centers (SOCs)** and large enterprise networks
- Uses **machine learning (ML)** and **artificial intelligence (AI)** to filter noise and present relevant data for real-time decisions

### IV. Lack of Standardization
- SIEM is an **industry product** with **no standard** implementation or configuration
- Configuration depends on industry regulations and organizational preferences

### V. Deployment Methods
- **Agentless:** Receives log data from hosts without additional software
- **Agent-based:** Requires specialized software on each host to transmit logs

### VI. Core Capabilities of a SIEM System
- **Collection & Aggregation** (inherited from SIM)
- **Correlation Engine** (inherited from SEM) – creates audit trails
- **Alerting & Reporting** – email/console alerts; generates daily reports for management
- **Retention & Archive** – stores logs per industry standards/regulations
- **Data Stockpiling** – large volumes of logs enable ML/AI to search and surface relevant data

### VII. Dashboard Customization
- Users can filter what data appears (logon attempts, specific OS vulnerabilities) based on organizational needs
- Allows analysts to view real-time alerts and act

### VIII. Exam Takeaways
- Know the **purpose** of SIEM
- Understand **how SIEM works** (collection, correlation, alerting, retention, dashboard customization)

---

## Video V211: Threat Intelligence

**Objective:** To explain threat intelligence, threat feeds, and threat hunting.

### I. Core Definition & Purpose
- **Threat Intelligence:** Analyzed information used to make threat-based decisions (conclusions drawn from raw data)
- **Threat:** Potential for unwanted harm to personnel or assets
- **Vulnerability:** Flaw or weakness a threat acts against
- **Attack Surface:** All possible entry points (people, technology, physical access, etc.) for compromise

### II. Key Concepts & Relationships
- **Threat Information** → **Threat Intelligence** = situational awareness
- Uses risk indicators, performance indicators, etc., to understand security posture
- **TTPs (Tactics, Techniques, Procedures):** Proven methods for better defense

### III. Threat Feeds (Data Sources)
- Collections of data from known threats/attacks, shared with the security community
- Contents include: suspicious/known IPs, ports/protocols, domain names, signatures
- Format: Often raw XML
- **Tools to ingest/interpret:** Yeti, AlienVault

### IV. Threat Hunting (Proactive Search)
- Definition: Searching for *previously undetected* threats or attacks (goes beyond known alerts)
- **Process:**
  1. Detect a known threat (e.g., from a threat feed)
  2. Proactively search systems for impact
  3. Identify presence → take remedial action
- **Value:** Enables proactive defense, not just reactive alerts

### V. Exam Takeaways
- Understand **why** we gather threat intelligence
- Know **threat feeds** and **threat hunting** as they relate to threat intelligence

---

## Video V212: MITRE ATT&CK Framework

**Objective:** To explain the MITRE ATT&CK Framework and its application to threat modeling.

### I. Overview & Purpose
- **Context:** Part of threat intelligence
- **What it is:** An open knowledge base of real-world attacker **TTPs** (Tactics, Techniques, Procedures)
- **Key characteristics:** Large, fluid, frequently updated by MITRE based on new attacks
- **Exam expectation:** Understand its *purpose* and how it helps **threat modeling**, not memorize all details

### II. The 14 ATT&CK Categories (Tactics)

| Phase | Tactic | Description |
| :--- | :--- | :--- |
| 1 | **Reconnaissance** | Passive scanning, OSINT, phishing to gather info |
| 2 | **Resource Development** | Discovering attack vectors and assets to exploit |
| 3 | **Initial Access** | First entry into the system (compromised account, etc.) |
| 4 | **Execution** | Running malware, scripts, or code |
| 5 | **Persistence** | Maintaining access (manipulating accounts/processes) |
| 6 | **Privilege Escalation** | Gaining higher privileges (e.g., admin/root) |
| 7 | **Defense Evasion** | Avoiding detection (IDS, endpoint security) |
| 8 | **Credential Access** | Stealing account info/passwords |
| 9 | **Discovery** | Searching for more assets to exploit (leads to lateral movement) |
| 10 | **Collection** | Gathering target data |
| 11 | **Command & Control** | Controlling compromised machines to expand attack |
| 12 | **Exfiltration** | Stealing the target data |
| 13 | **Impact** | Disrupting confidentiality, integrity, or availability |

> **Note:** Persistence and Command & Control are sometimes used interchangeably but serve distinct roles.

### III. How to Apply the Framework to Threat Modeling

| ATT&CK Tactic | Practical Threat Modeling Question |
| :--- | :--- |
| Reconnaissance | What info about the org/execs is publicly available? |
| Resource Development | What are the attack vectors? (browser → web app, SQL query → database) |
| Initial Access | Where will access be gained? (web app layer) |
| Execution | Where could malware be installed/executed? (web server, database server) |
| Persistence | How many accounts exist on those servers? |
| Privilege Escalation | Are there privileged accounts? How are passwords managed? |
| Defense Evasion | What endpoint security/firewalls are in place? |
| Credential Access | Account management, access control, password policies |
| Discovery / Lateral Movement | Can the attacker move from web server to database server? |
| Collection | Is data encrypted at rest? World-readable? |
| Exfiltration / Impact | How is data protected during theft or disruption? |

### IV. Exam Takeaways
- Understand the **purpose** of the MITRE ATT&CK Framework
- That it provides a reference of real-world TTPs
- How it helps **trigger memory and inspire threat modeling**

---

## Video V213: Cyber Kill Chain

**Objective:** To explain the Cyber Kill Chain framework for proactive threat detection.

### I. Context & Relevance
- **Purpose:** Proactively detect persistent threats (often called *advanced persistent threats*, APTs)
- **Developed by:** Lockheed Martin
- **Part of:** Intelligence Driven Defense (IDD) model

### II. Goal & Core Idea
- **Goal:** Identify/prevent cyber intrusions; stop adversaries at any stage of the chain
- **Core idea:** Understand attacker actions → break one link in the chain → defend against/minimize attack impact

### III. Definition of APT

| Term | Meaning |
| :--- | :--- |
| **Advanced** | Sophisticated skill/expertise (not script kiddies) |
| **Persistent** | Continues attacking target over time |
| **Threat** | Potential for unwanted harm to personnel/assets |

### IV. The 7 Stages of the Cyber Kill Chain

| Stage | Description |
| :--- | :--- |
| 1. **Reconnaissance** | Passive info gathering (names, emails, OSINT) |
| 2. **Weaponization** | Creating exploit based on gathered intel |
| 3. **Delivery** | Deploying exploit (phishing, malicious website, USB drop) |
| 4. **Exploitation** | Activating exploit to take advantage of vulnerability |
| 5. **Installation** | Installing malware (backdoors, viruses, worms) |
| 6. **Command & Control (C2)** | Maintaining access to owned system |
| 7. **Actions on Objective** | Achieving attacker's final goal |

### V. Proactive Defense Strategy
- Use threat intelligence and threat hunting to detect attacker's **current stage**
- **Think ahead:** If detection happens at delivery → focus on stopping installation or exploitation
- If malware already deployed → break link #6 (C2) to prevent objective achievement
- If caught during weaponization → block deployment

### VI. Exam Takeaways
- Understand APT behavior
- Understand the Cyber Kill Chain as a **proactive framework** for breaking attack sequences

---

## Video V214: Security Orchestration, Automation and Response (SOAR)

**Objective:** To explain SOAR purpose, playbooks, runbooks, and automated incident response.

### I. Definition & Purpose of SOAR
- **SOAR** = Security Orchestration, Automation, Response
- Automated incident response using a collection of technologies
- **Goal:** Reduce **manual incident response workload**, human error, analyst/engineer burden, and improve response times

### II. How SOAR Works (Step-by-Step)

| Step | Description |
| :--- | :--- |
| **1. Collect** | Gather security data across the entire enterprise (users, devices, apps, infrastructure, on-prem, cloud) using a SIEM |
| **2. Detect** | Minimize **false positives** using threat intelligence & analytics; correlate alerts/incidents |
| **3. Analyze** | Use **AI / machine learning** to determine best course of action |
| **4. Respond** | Execute **playbook steps** automatically to respond and prevent incidents |

- SOAR also enables **proactive threat hunting** across data sources

### III. Key Concepts: Playbook & Runbook

| Concept | Description |
| :--- | :--- |
| **Playbook** | Set of actions automating investigation & response (e.g., email phishing playbook with conditional steps) |
| **Runbook** | Executes the playbook within the software; like a script that calls one or more playbooks |

**Analogy:** Chef automation software – Cookbook = Runbook, Recipes = Playbooks

### IV. Exam Takeaways
- Know **purpose of SOAR**
- Understand **purpose of playbook and runbook**

---

## Video V215: User/Entity Behavior Analytics (UEBA)

**Objective:** To explain behavior analytics, anomaly detection, and benefits.

### I. Definition & Purpose
- **Behavior analytics** = analysis of subject activity to detect potential threats
- Focuses on how subjects behave on systems, device usage, and security-related events from that activity

### II. Terminology
- Also called: **UBA** (User Behavior Analytics), **UEBA** (User and Entity Behavior Analytics)
- Related but distinct: **Network behavior analytics**

### III. Core Mechanism
- Compare current user/device behavior to **past behavior**
- Detect **anomalies** (e.g., a workstation running a vulnerability scan)

### IV. What It Helps Detect
- Privileged account abuse
- Privilege escalation abuse
- Data exfiltration (including misses by DLP)

### V. How It Works in Practice
- Logs from endpoints, servers, IoT, mobile devices → sent to a **SIEM**
- SIEM performs behavior analytics
- Example SIEM tools: Elastic Stack, AlienVault, RSA, **Splunk** (uses machine learning for unknown threats)

### VI. Key Benefits
- Best defense against **unknown/stealth attacks**
- Catches what IDS/IPS/DLP/endpoint security might miss
- Enables advanced threat detection by correlating multiple anomalies into a threat profile
- Accelerates threat hunting via deep investigation

### VII. Exam Takeaway (Vendor Neutral)
- **Understand the purpose and benefits** of behavior analytics
- Focus on concepts: anomaly detection, behavior comparison, log analysis across multiple sources

---

## Session 28 Summary

Session 28 covers the **complete logging and monitoring landscape** for the CISSP exam (Objective 7.2). Key takeaways include:

1. **Logging and Monitoring (V209):** Centralized vs. decentralized logs. Critical attributes: who, what, when (NTP/Stratum), where, result. Clipping levels (thresholds). Ingress (inbound) and egress (outbound) monitoring. Log protection: access control, encryption, retention, integrity in transit.

2. **SIEM (V210):** Collects, aggregates, correlates, alerts, and reports. Agent-based vs. agentless. SIM (collection) + SEM (correlation) = SIEM. Uses ML/AI to filter noise. Dashboard customization.

3. **Threat Intelligence (V211):** Analyzed information for threat-based decisions. Threat feeds (IPs, domains, signatures in XML). Threat hunting (proactive search for undetected threats). Tools: Yeti, AlienVault.

4. **MITRE ATT&CK Framework (V212):** 14 tactics (Reconnaissance → Resource Development → Initial Access → Execution → Persistence → Privilege Escalation → Defense Evasion → Credential Access → Discovery → Collection → Command & Control → Exfiltration → Impact). Open knowledge base of real-world TTPs for threat modeling.

5. **Cyber Kill Chain (V213):** 7 stages: Reconnaissance → Weaponization → Delivery → Exploitation → Installation → Command & Control → Actions on Objective. Proactive framework to break any link. Developed by Lockheed Martin for APT defense.

6. **SOAR (V214):** Security Orchestration, Automation, Response. Collect → Detect → Analyze → Respond. Playbook (actions) vs. Runbook (executes playbook). Reduces manual incident response workload.

7. **UEBA (V215):** User and Entity Behavior Analytics. Compares current behavior to baseline to detect anomalies. Best defense against unknown/stealth attacks. SIEM + ML for behavior analysis.

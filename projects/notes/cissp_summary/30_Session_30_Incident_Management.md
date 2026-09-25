# Session 30: Incident Management (CISSP Objectives 1.5, 7.1, 7.6)

**Videos:** V222 – V228  
**Core Focus:** Incident management lifecycle (detection → response → mitigation → reporting → recovery → remediation → lessons learned), security investigations (burden of proof, types of investigations, modus operandi), cyber-related investigations (plaintiff vs. defendant, criminal vs. civil vs. administrative), evidence collection and handling (types of evidence, chain of custody, best evidence rule, parol evidence rule), digital forensics (eDiscovery Reference Model, forensic process: collection → examination → analysis → reporting), and Digital Forensic Incident Response (DFIR) (NIST SP 800-86 process).

---

## Video V222 (Outline): Incident Management (Section Intro)

**Objective:** To introduce the key topics in incident management for the CISSP exam.

### Topics Covered in this Session
1.  Incident Management Process (detection → response → mitigation → reporting → recovery → remediation → lessons learned)
2.  Security Investigations (burden of proof, interviews/interrogations, surveillance, digital forensics)
3.  Cyber-Related Investigations (criminal vs. civil vs. administrative vs. regulatory; plaintiff vs. defendant)
4.  Evidence Collection and Handling (real, documentary, testimonial, direct, hearsay, opinion, circumstantial, corroborative; chain of custody)
5.  Digital Forensics (eDiscovery Reference Model: identify → preserve → collect → process → review → analyze → produce → present)
6.  Digital Forensic Incident Response (DFIR) (collection → examination → analysis → reporting; NIST SP 800-86)

---

## Video V223: Incident Management

**Objective:** To explain the incident management lifecycle from detection through lessons learned.

### I. Core Definition
- **Incident:** An event (intentional or unintentional) that violates security policy
- **Goal:** Manage, respond to, and recover from events that negatively impact the system

### II. Key Frameworks (for reference)
- **Primary (Exam Focus):** NIST SP 800-61 (Rev 2) – *Computer Security Incident Handling Guide*
- **Secondary:** ISO 27035, ISACA guides

### III. The Incident Response Lifecycle (CISSP CBK Order)

| Step | Description |
| :--- | :--- |
| **1. Detection** | Sources: system logs, IDS/IPS, endpoint security, **personnel reports**. Analyze events to verify if they constitute a security incident. **Triage** determines severity and prioritizes treatment. |
| **2. Response** | Based on severity level defined in the Incident Response Plan. Activate CIRT (Computer Incident Response Team) or CSIRT. Identify, collect, and handle evidence. Thoroughly document everything. |
| **3. Mitigation** | Quickly contain the incident to prevent further organizational impact. Example: shutting down a port, isolating a network segment, blacklisting an IP. Determine if DR/BC procedures are needed. |
| **4. Reporting** | After containment (not before). Internal: senior management (status, impact, recovery timeline). External: required by regulations (e.g., GDPR 72-hour breach notification). Exclude sensitive details from public reports. |
| **5. Recovery** | Temporary restoration to an operational state. Examples: re-enabling a network connection, restoring a system account. If recovery exceeds MTD, activate BCP/DRP. |
| **6. Remediation** | Permanent restoration to full operational status. Address system damage, legal matters, financial impacts. |
| **7. Lessons Learned** | Post-incident analysis: What happened? Why? What could have prevented it? What can stakeholders do differently? Update plans, controls, and monitor changes for effectiveness. |

### IV. Foundational Preparations (Pre-Detection)
- **Policy:** Define objectives, scope, what constitutes an incident, priorities, KPIs/KRIs, and reporting requirements
- **Resources:** Deploy tools (DLP, firewalls, storage), establish recovery sites
- **Team:** Form a cohesive CIRT with appropriate skills (sysadmins, network, security, management)
- **Procedures:** Create step-by-step responses for possible scenarios; get buy-in from system owners and senior management

### V. Exam Takeaways
- Know the incident response steps in order
- Human life is always the top priority
- Recovery = bringing systems back to normal (possibly at alternate site); Restoration = returning to original state at primary location

---

## Video V224: Security Investigations

**Objective:** To explain investigative techniques, types of investigations, and burden of proof.

### I. Core Purpose of an Investigation
- **Goal:** Collect and analyze facts about an event to reach a conclusion (determine if something did or did not happen)
- **Your Role:** Primarily a *support role* (collecting evidence, maintaining chain of custody, possibly testifying in court)

### II. Key Concepts & Terminology
- **Burden of Proof:** The obligation to prove the event took place (or didn't)
  - *Criminal proceeding:* Proof **beyond a reasonable doubt** (to a jury of peers)
  - *Civil proceeding:* **Preponderance of evidence** (majority/more likely than not)
- **Parties involved:**
  - *Criminal:* Plaintiff (accuser) vs. Defendant
  - *Civil:* Claimant vs. Respondent
- **Chain of Custody:** Must protect evidence and maintain an accurate record of who handled it and how

### III. Investigative Techniques
- **Interviewing:** Talking to personnel (admins, engineers, etc.) to gather information
- **Interrogation:** A specific, more focused interview to determine if a subject committed a violation
- **Surveillance:** Monitoring a subject (e.g., via real-time logs, CCTV) to gather more evidence
- **Digital Forensics:** Identifying, collecting, analyzing, and preserving electronic data

### IV. Types of Investigations (for the exam)

| Type | Focus |
| :--- | :--- |
| **Administrative** | Violation of *organizational policy* |
| **Regulatory (Compliance)** | Violation of a *law or regulation* |
| **Criminal** | Violation of *laws* (country/state level) |
| **Civil** | Private or non-criminal matters (e.g., breach of contract, SLA) |

### V. Investigative Mindset: *Modus Operandi* (Mode of Operations)
Focus on finding the root cause by examining three factors:
1.  **Motive:** Why did they do it?
2.  **Opportunity:** When and where could they do it?
3.  **Means:** Did they have the capability, tools, and techniques?

### VI. Exam Takeaways
- The **accuser** (plaintiff/claimant) always has the burden of proof
- Understand the different types of investigations at a high level

---

## Video V225: Cyber-Related Investigations

**Objective:** To explain criminal, civil, administrative, and regulatory investigations, and security responsibilities as plaintiff vs. defendant.

### I. Purpose of Cyber Investigations
- Systematically examine, study, or inquire into a security violation
- Determine the nature of the violation: **criminal**, **civil**, **administrative**, or **regulatory**

### II. Key Legal Parties
| Term | Definition |
| :--- | :--- |
| **Plaintiff** | Party initiating legal action (accuser) |
| **Defendant** | Party disputing the accusation (accused) |

### III. Burden of Proof
| Standard | Application |
| :--- | :--- |
| **Beyond a reasonable doubt** | Criminal cases (high standard) |
| **Preponderance of evidence** | Civil cases (lower standard – prove fault/liability) |

### IV. Types of Investigations

| Type | Focus |
| :--- | :--- |
| **Administrative** | Internal policy violations (e.g., acceptable use policy) – no law enforcement needed |
| **Criminal** | Data theft, security breaches – involves law enforcement, federal jurisdiction (e.g., FBI in the U.S.) |
| **Civil** | Violations of private matters (contracts, SLAs, support agreements) |
| **Regulatory** | Compliance with industry regulations – may lead to civil or criminal outcomes |

### V. Security Professional's Role
- **Support evidence collection and preservation**
- **Maintain chain of custody** (proof evidence wasn't tampered with)

### When Organization Is:
- **Plaintiff** (accusing someone else) → Collect evidence to prove the accusation
- **Defendant** (accused of violation) → Collect evidence to defend organization's innocence

### VI. Exam Takeaways
- Understand **burden of proof** (beyond reasonable doubt vs. preponderance of evidence)
- Understand **types of investigations**
- Understand **security responsibilities as plaintiff vs. defendant**

---

## Video V226: Evidence Collection and Handling

**Objective:** To explain types of evidence, chain of custody, best evidence rule, and parol evidence rule.

### I. Purpose of Evidence
- **Definition:** Facts/data proving an incident occurred
- **Goal:** Demonstrate a security incident occurred; prove/disprove root cause
- **Admissibility:** Evidence must be directly relevant to the incident; judge decides admissibility based on laws/regulations

### II. Types of Evidence

| Type | Description | Examples |
| :--- | :--- | :--- |
| **Real** | Tangible objects | Fingerprints on keyboard, video recording, screen scrape |
| **Documentary** | Written proof of facts/statements | Audit logs, entry/exit logs (must be authenticated) |
| **Testimonial** | Written/verbal witness statements | Witness describing what they saw |
| **Direct** | Witness directly observed the offense | Saw attacker typing commands |
| **Hearsay** | Secondhand knowledge ("someone told me") | "John told me he saw the attacker" |
| **Opinion** | Expert statement | Forensic analyst explaining attack method |
| **Circumstantial** | Facts combined to infer offense | Multiple indirect clues pointing to guilt |
| **Corroborative** | Supports/validates a claim | Video + logs matching hearsay statement |

### III. Key Legal Rules
- **Best Evidence Rule:** Use **original** documentation whenever possible; copies are **secondary evidence** (less admissible, harder to authenticate)
- **Parol Evidence Rule:** Verbal agreements about evidence must be put **in writing** to become documentary evidence

### IV. Chain of Custody (Critical)
- **Definition:** Proper handling, marking, tracking of each piece of evidence
- **Why vital:** Breaks in chain introduce doubt → evidence may be thrown out
- **Document** for every transfer:
  - What was transferred (hard drive, logs, etc.)
  - Who transferred to whom
  - When (date/time to seconds)
  - How (physical, digital, envelope, etc.)
  - Signatures of **both parties** for custody change

### V. Collection Best Practices
- Get a **second opinion** / second person present during witness interviews
- Avoid **investigator bias** (don't try to prove a preconceived narrative)
- **Document everything:** IP addresses, nodes, rooms, buildings—nothing is overkill

### VI. Exam Takeaways
- Know the **different types of evidence**
- Understand the **purpose and mechanics of chain of custody**
- Apply **best evidence rule** and **parol evidence rule** appropriately

---

## Video V227: Digital Forensics

**Objective:** To explain digital forensics, eDiscovery Reference Model, and forensic standards.

### I. Definition & Purpose of Digital Forensics
- **Core Definition:** Collection and analysis of digital evidence (from computers, etc.)
- **Other Terms:** eDiscovery, electronic data discovery, data forensics
- **Applications:** Investigations, security assessments, regulatory/organizational compliance
- **Goals:** Determine *who, what, when, where, how* of an electronic violation; identify *modus operandi, motive, opportunity, method*

### II. eDiscovery Reference Model (Key for Exam)

| Step | Description |
| :--- | :--- |
| **Information Governance** | Starting point – ensures information is well-organized, aligns policies/processes with governance, regulations, and compliance |
| **1. Identify** | Locate all potential sources of evidence |
| **2. Preserve** | Protect information from alteration, deletion, or changes (ensures data integrity) |
| **3. Collect** | Gather all required information for the forensic process |
| **4. Process** | Screen collected information for relevance |
| **5. Review** | Ensure information is relevant to the investigation |
| **6. Analyze** | Determine if information meets real/best evidence guidelines |
| **7. Produce** | Package information into a consumable format (for investigators, managers, courtroom) |
| **8. Presentation** | Use information in court or by investigative parties |

### III. Forensic Standards (Organizations/Publications)
- **NIST SP 800-86:** Guide to integrating forensic techniques into incident response
- **ISO 27043:** Incident investigation principles and processes
- **ISO 27037:** Guidelines for identification, collection, acquisition, preservation of digital evidence
- **NIST SP 800-101:** Mobile device forensics
- **IOCE:** International Organization on Computer Evidence
- **SWGDE:** Scientific Working Group on Digital Evidence

### IV. High-Level Forensic Process
- **Collection → Examination → Analysis → Reporting**

### V. Exam Takeaways
- Understand the **purpose** of digital forensics
- Know the **eDiscovery Reference Model steps**

---

## Video V228: Digital Forensic Incident Response (DFIR)

**Objective:** To explain the NIST SP 800-86 forensic process: collection, examination, analysis, and reporting.

### I. Core Context
- **Focus:** Deep dive into digital forensics for exam preparation
- **Guiding Framework:** NIST Special Publication 800-86

### II. The Four-Phase Forensic Process

| Phase | Key Activities | Critical Points |
| :--- | :--- | :--- |
| **1. Collection** | Identify data sources (storage, external media, remote, personnel statements). Set collection priorities. Preserve data quickly due to volatility. | **Written authorization is mandatory** (from management or via IR plan). Create **exact copies** (full backup/bit-level); never work on original evidence. Treat as a digital crime scene. Collect logs, system files, accounts, code, hardware, media. |
| **2. Examination** | Review & process collected data. Search for relevant, admissible, best evidence. Handle encryption, compression, technical issues. | Tools: EnCase, Forensic Toolkit, MacQuisition, The Sleuth Kit. |
| **3. Analysis** | Formulate investigative conclusion. Identify persons, places, devices, events (audit trail). Ensure conclusion is supported by evidence (beyond reasonable doubt / preponderance of evidence). | If conclusion lacks support → return to Examination or revise conclusion. |
| **4. Reporting** | Document all forensic data and conclusion. Explain *how* conclusion was reached. | Key attributes: **Accuracy & authenticity**. Purpose: Prove beyond reasonable doubt / preponderance of evidence. |

### III. Key Considerations & Best Practices
- **Competence of Investigators:** Requires a special mindset + skillset, not just running tools
- **Consistency:** Use a consistent policy, process, and procedure (admissible in court)
- **Chain of Custody:** Anyone collecting, accessing, storing, or transferring evidence is responsible for compliance
- **Proactive vs. Reactive:** Approach should be proactive

### IV. Exam Takeaways
- Understand each phase of the digital forensic process (Collection → Examination → Analysis → Reporting)

---

## Session 30 Summary

Session 30 covers the **complete incident management landscape** for the CISSP exam (Objectives 1.5, 7.1, 7.6). Key takeaways include:

1. **Incident Management (V223):** 7-step lifecycle: Detection → Response → Mitigation → Reporting → Recovery → Remediation → Lessons Learned. Human life is top priority. Recovery (back to normal) vs. Restoration (back to original state). NIST SP 800-61.

2. **Security Investigations (V224):** Burden of proof: criminal (beyond reasonable doubt) vs. civil (preponderance of evidence). Investigation types: administrative, regulatory, criminal, civil. Modus operandi: Motive, Opportunity, Means.

3. **Cyber-Related Investigations (V225):** Plaintiff (accuser) vs. Defendant (accused). Security role: support evidence collection and chain of custody. Organization as plaintiff (prove accusation) vs. defendant (defend innocence).

4. **Evidence Collection and Handling (V226):** Types: real, documentary, testimonial, direct, hearsay, opinion, circumstantial, corroborative. Chain of custody (who, what, when, how, signatures). Best evidence rule (use originals). Parol evidence rule (verbal agreements must be in writing).

5. **Digital Forensics (V227):** eDiscovery Reference Model: Information Governance → Identify → Preserve → Collect → Process → Review → Analyze → Produce → Presentation. Standards: NIST SP 800-86, ISO 27043, ISO 27037.

6. **Digital Forensic Incident Response (V228):** NIST SP 800-86 four phases: Collection (exact copies, written authorization) → Examination (review, search for relevant evidence) → Analysis (formulate conclusion, audit trail) → Reporting (accuracy, authenticity, prove burden of proof).

# Session 27: Detective and Preventative Measures (CISSP Objectives 7.2, 7.4, 7.7)

**Videos:** V200 – V207  
**Core Focus:** Security operation concepts (need-to-know, least privilege, separation of duties, privileged account management, job rotation, SLAs), detective vs. preventative measures (whitelisting, blacklisting, sandboxing, third-party services), IDS/IPS systems (knowledge-based, behavior-based, network/host-based), honeypots and honeynets, malicious software (malware types, viruses, propagation methods), anti-malware (signature-based, heuristic-based, quarantine), and artificial intelligence tools (AI levels, machine learning types, neural networks, risks).

---

## Video V200 (Outline): Detective and Preventative Measures (Section Intro)

**Objective:** To introduce the key topics in detective and preventative measures for the CISSP exam.

### Topics Covered in this Session
1.  Security Operation Concepts (need-to-know, least privilege, separation of duties, privileged account management, job rotation, SLAs)
2.  Detective and Preventative Concepts (whitelisting, blacklisting, sandboxing, third-party services)
3.  IDS/IPS Systems (knowledge/signature-based, behavior/anomaly-based, network/host-based)
4.  Honeypots and Honeynets (padded cells)
5.  Malicious Software (malware types: worms, logic bombs, Trojans, ransomware, keyloggers, spyware, adware, bots, viruses)
6.  Anti-Malware (signature-based, heuristic-based, on-access/on-demand scanning, quarantine)
7.  Artificial Intelligence Tools (narrow/general/super AI, supervised/unsupervised/reinforcement learning, neural networks)

---

## Video V201: Security Operation Concepts

**Objective:** To explain foundational security operation concepts.

### I. Core Definition of Security Operations
- **Purpose:** Operating and maintaining secure system operations
- **Key Activities:** Allow systems to function, maintain a secure baseline, ensure controls remain effective throughout the system lifecycle

### II. Key Security Concepts

| Concept | Focus / Definition | Implementation / Characteristics |
| :--- | :--- | :--- |
| **Need-to-Know** | Access to **information/data** needed for a job | Data owner discretion (DAC); groups, RBAC, clearance levels (MAC) |
| **Least Privilege** | Access to **functions/privileges** (not data) needed for a job | Enforces need-to-know & separation of duties; often via RBAC |
| **Separation/Segregation of Duties** | Requires **multiple individuals** to perform a sensitive task | Prevents excessive power; requires **collusion** to subvert security |
| **Privileged Account Management** | Control over **elevated accounts** (admin, root, domain, security accounts) | Provides access to sensitive functions/configs/logs; critical for integrity |
| **Job Rotation** | Rotating individuals through roles to prevent **excessive control** | Functions as **preventative, detective, and deterrent** control |
| **Service-Level Agreements (SLAs)** | Formal agreement with an **external provider** defining service terms | Must be **measurable** (e.g., 99% uptime); includes consequences for violations |

### III. Relationship Between Key Concepts
- **Least Privilege** is the broader principle (privileges for job)
- **Need-to-Know** is a subset/focus within least privilege (data access for job)
- **Separation of Duties** is enforced by least privilege
- **Job Rotation** complements separation of duties

### IV. Exam Takeaways
- Know the **distinction** between need-to-know (data) and least privilege (functions)
- Understand that SLAs require **measurable metrics** to be enforceable
- Remember that privileged accounts are critical for **integrity** and **credentialed scans**

---

## Video V202: Detective and Preventative Concepts

**Objective:** To explain detective vs. preventative measures, whitelisting/blacklisting, sandboxing, and third-party services.

### I. Core Focus
- **Topic:** Detective vs. Preventative measures in security operations
- **Scope:** Technical/logical controls (not physical)
- **Goal:** Discover or prevent violations of a security policy *before* they become incidents

### II. Detective Measures (Passive)
- **Function:** Monitor, discover current/previous violations, and notify
- **Methods:** Log analysis, network monitoring, vulnerability scanning
- **Alert Aggregation:** SIEM – displays alerts on a dashboard for real-time monitoring

### III. Preventative Measures (Active)

| Measure | Logic | Security Level |
| :--- | :--- | :--- |
| **Whitelisting** | Permit by exception, deny by default | More stringent & secure |
| **Blacklisting** | Deny specific actions, allow everything else by default | Less secure, looser control |
| **Access Control Lists (ACLs)** | Can act as either whitelist or blacklist | Depends on configuration |
| **Sandboxing** | Confined test environment with logical boundary (confinement) | Isolates failures from production |
| **Third-Party Security Services** | Leasing services due to lack of internal tools/skills | Requires vetting, SLA, NDA |

### IV. Sandboxing Details
- **Use Cases:** Testing applications, analyzing malware, testing config changes
- **Analogy:** Type 2 virtualization (VirtualBox, VMware Workstation Player) – VMs isolated from host network/internet

### V. Third-Party Security Services – Precautions
- Thoroughly vet the provider (supply chain, competence)
- Contracts needed: **SLA** (Service Level Agreement), **NDA** (Non-Disclosure Agreement)
- Include third parties in the incident response plan

### VI. Exam Takeaways
- Understand the difference between detective and preventative measures
- Know the purpose of **whitelists** and **blacklists**
- Know the purpose of a **sandbox**
- Understand the use of **third-party security services**

---

## Video V203: IDS/IPS Systems

**Objective:** To explain IDS vs. IPS, detection methods, and deployment types.

### I. Core Definitions
- **Intrusion:** Unauthorized access attempt circumventing security/privacy controls
- **IDS (Intrusion Detection System)** – *Passive*: Listens, monitors, reports only
- **IPS (Intrusion Prevention System)** – *Active* (aka active IDS): Listens, detects, *and* responds

### II. Key Deployment Difference
- **IDS:** Can be deployed anywhere; traffic can bypass it
- **IPS:** Must be **in-line** (traffic goes through it) to truly prevent attacks

### III. Important Standards (for CISSP)
- **NIST SP 800-94** – Guide to IDPS
- **ISO/IEC 27039** – Selection, deployment, operations of IDPS

### IV. Detection Methods

| Method | Description | Limitation |
| :--- | :--- | :--- |
| **Knowledge-Based (Signature-Based)** | Compares events to known attack signatures | Requires up-to-date signatures; cannot detect emerging threats |
| **Behavior-Based (Anomaly-Based / Heuristic)** | Compares current activity to a normal behavior profile | Prone to false positives |
| **Stateful Protocol Analysis** | Compares monitored events to expected protocol states | Uses vendor-developed profiles |

### V. Deployment Types

| Type | Scope | Key Feature |
| :--- | :--- | :--- |
| **NIDS / NIPS** | Network-wide | Monitors all network traffic |
| **HIDS / HIPS** | Single host | Host-specific only (cannot see network) |
| **WIDS / WIPS** | Wireless network | Monitors unusual protocol activity |
| **NBA (Network Behavior Analysis)** | Network traffic | Detects unusual communications |

- **Best practice:** Deploy both network-based and host-based (defense in depth)

### VI. Drawbacks & Considerations
- **Inline IPS** → Throughput/latency risk (bad for availability-focused environments)
- **HIDS/HIPS** → Cannot detect misconfigurations, missing patches (requires host firewall as minimum)
- **Network IDS** → Attack traffic still reaches network (detection only, no prevention)

### VII. Exam Takeaways
- Know **IDS vs. IPS** (passive vs. active)
- Know **detection methods** (signature, behavior, stateful protocol analysis)
- Know **deployment methods** (network, host, wireless, NBA)

---

## Video V204: Honeypots and Honeynets

**Objective:** To explain honeypots, honeynets, and padded cells.

### I. Honeypot
- **Definition:** An intentionally vulnerable computer (physical or virtual)
- **Characteristics:** Contains no tangible/valuable data; intentionally misconfigured; uses *pseudo flaws* to lure attackers
- **Effectiveness:** Can trigger intrusion detection alerts; should be believable (informed by threat modeling, e.g., MITRE ATT&CK)

### II. Honeynet
- **Definition:** Multiple honeypots creating a simulated or pseudo network
- **Advantages:** More believable than a single honeypot; encourages more attacker interaction; contains attackers within the pseudo network
- **Enhancement Techniques:** Use unused IP space to make honeypots discoverable during footprinting

### III. Padded Cell
- **Definition:** Similar to a honeypot but automatically moves attackers to an isolated area
- **Features:** Built with more realistic data; keeps attackers busy in a pseudo-flawed network
- **Deployment:** Rare in smaller systems (resource-intensive, expensive); occasionally in enterprise systems, monitored by a SOC

### IV. Exam Takeaways
- Purpose of **honeypot**
- Purpose of **honeynet**
- Purpose of **padded cell**

---

## Video V205: Malicious Software

**Objective:** To explain malware types, virus propagation methods, and specific virus variants.

### I. Introduction to Malware
- **Definition:** Software purposely designed to harm a computer system
- **Goals:** Cause damage, steal/exfiltrate data, or extort money
- **Nature:** Typically a passive attack; good malware avoids detection until activated or propagated

### II. Key Types of Malware (for CISSP Exam)

| Malware Type | Description |
| :--- | :--- |
| **Worms** | Self-contained, spread/modify without human interaction |
| **Logic Bombs** | Activated by a trigger (timer, system action, specific criteria) |
| **Trojan Horses** | Disguised as harmless/trusted software; RAT creates backdoor |
| **Ransomware** | Encrypts victim's data and holds decryption key for ransom |
| **Keyloggers** | Records every keystroke (usernames, passwords, credit card numbers) |
| **Zero-day Malware** | Targets unknown/unpatched vulnerabilities (indefensible) |
| **Spyware** | Collects info (usernames, passwords) via keylogging, screen scraping |
| **Adware** | Collects info on consumer interests (less nefarious but can be exploited) |
| **Bots (Zombies)** | Infected computers remotely controlled by a bot master via C&C server; botnet = network of bots (used in DDoS) |

### III. Viruses (Most Prominent Type)
- **Definition:** Small malicious code attached to legitimate programs/applications
- **Goal:** Infect and spread to as many system areas as possible

**Four Main Propagation Methods:**

| Method | Description |
| :--- | :--- |
| **Master Boot Record (MBR)** | Infects first boot sector of storage media (processed early, may defeat anti-malware) |
| **File Infector** | Deployed with files; activates when file is executed (common in phishing) |
| **Macro Virus** | Spreads via VBA code in MS Office products (Word, Excel, PowerPoint) |
| **Service Injection Virus** | Infects trusted system processes/services to avoid detection |

**Specific Virus Types:**

| Virus Type | Description |
| :--- | :--- |
| **Polymorphic Virus** | Copies and changes itself to alter signature (evades detection) |
| **Encrypted Virus** | Uses encryption to hide; requires decryption before scanning |
| **Multipartite Virus** | Uses multiple infection methods simultaneously (spreads quickly) |
| **Stealth Virus** | Modifies OS processes, changes signatures, encrypts data, erases evidence |

### IV. Exam Takeaways
- Know the definition of malware
- Know the different types of malware
- Know the different types of viruses and how they infect systems

---

## Video V206: Anti-Malware

**Objective:** To explain anti-malware functions, detection methods, and defenses.

### I. Risks of Malware
- **Any software** can be vulnerable, especially if unpatched, unprotected, or with unknown vulnerabilities (zero-day)
- **Encrypted data** (files, emails) makes malware detection difficult

### II. Defense Mechanisms (Layered / Defense-in-Depth)
- Next-gen firewalls / UTM – inspect data at firewall level
- Network IDS/IPS – detects known signatures
- Server anti-malware – inline protection
- Endpoint security / EDR – detects and responds (quarantine/eradicate)

### III. Anti-Malware Software Functions
- **Scanning types:**
  - *On-access* – scans files when downloaded/executed (recommended for untrusted sources)
  - *On-demand* – manually activated scans (for trusted sources)
- **Actions:** scan, detect, isolate (quarantine), remove/disinfect

### IV. Detection Methods

| Method | Description |
| :--- | :--- |
| **Signature-Based** (knowledge-based/pattern-matching) | Compares file to known malware signatures from vendor; requires up-to-date signatures |
| **Heuristic-Based** | Static (analyzes without execution) or Dynamic (executes in sandbox to observe behavior); best for zero-day malware |

### V. Quarantine & Disinfection
- **Quarantine** – isolate malware in a sandbox for further analysis
- **Disinfect** – remove malware from infected file
- **Note:** Some malware cannot be disinfected → must delete or sanitize system

### VI. Most Important Control: Security Awareness Training
- People are the weakest link
- Train users to detect and prevent social engineering/phishing
- Goal: change user behavior toward safer practices

### VII. Exam Takeaways
- Purpose of anti-malware software
- Difference between signature-based vs. heuristic analysis
- Malware defense mechanisms

---

## Video V207: Artificial Intelligence Tools

**Objective:** To explain AI levels, machine learning types, neural networks, and AI risks.

### I. Introduction to AI
- **Definition:** Software capability to analyze environment and make independent decisions
- **Goal:** Reduce human workload and minimize errors (stress, fatigue)

### II. Three Levels of AI

| Level | Name | Description | Example |
| :--- | :--- | :--- | :--- |
| **Narrow (Weak) AI** | Artificial Narrow Intelligence | Single task, no transfer learning | Siri, Alexa, help bots |
| **General AI** | Artificial General Intelligence (AGI) | Mimics human behavior, complex tasks | Equal to human intelligence |
| **Super AI** | Artificial Super Intelligence (ASI) | Surpasses human intelligence | Future goal |

### III. AI in Cybersecurity
- Mostly **Narrow AI** used today
- Applications: Expert systems, Natural Language Processing (NLP), virtual assistants, chatbots, email spam protection

### IV. Machine Learning (ML) – Key Focus

| Type | Data Used | How It Works | Example |
| :--- | :--- | :--- | :--- |
| **Supervised** | Labeled data | Train with labels + feedback | Google/YouTube recommendations |
| **Unsupervised** | Unlabeled data | Finds hidden patterns via clustering | Big data, APT detection |
| **Semi-supervised** | Mixed | Combines both approaches | Sensitive data = supervised; rest = unsupervised |
| **Reinforcement** | Positive/negative feedback | Agents reward/punish themselves | Tesla self-driving cars |

### V. Artificial Neural Networks (ANN / SNN)
- Use **deep learning** to make independent decisions
- **Process:** Multiple inputs → hidden layers → limited outputs → informed decision
- **Examples:** Spam detection, NLP, business intelligence
- **Key limitation:** Cannot make human-based ethical decisions

### VI. Risks of AI
- **Misconfiguration / poor implementation** → high errors
- **Inconsistent outputs** (AI changes rapidly with new inputs)
- **High investment** (time, money, infrastructure)
- **No regard for ethics, privacy, sensitivity** → human oversight required

### VII. Exam Takeaways
- Understand **purpose & benefits** of AI tools
- Know **types of ML** (supervised, unsupervised, reinforcement)
- Be aware of **risks** (misconfiguration, bias, lack of ethics)

---

## Session 27 Summary

Session 27 covers the **complete detective and preventative measures landscape** for the CISSP exam (Objectives 7.2, 7.4, 7.7). Key takeaways include:

1. **Security Operation Concepts (V201):** Need-to-know (data access) vs. Least privilege (function access). Separation of duties (requires collusion). Privileged account management, job rotation (preventative/detective/deterrent), SLAs (measurable metrics).

2. **Detective & Preventative Concepts (V202):** Detective (passive: monitor, notify) vs. Preventative (active: stop). Whitelisting (permit by exception, more secure) vs. Blacklisting (deny specific, less secure). Sandboxing (isolated test environment). Third-party services (SLA, NDA, vetting).

3. **IDS/IPS Systems (V203):** IDS (passive, monitor only) vs. IPS (active, in-line). Detection methods: knowledge/signature-based (requires updates), behavior/anomaly-based (prone to false positives), stateful protocol analysis. Deployment: network-based (NIDS/NIPS), host-based (HIDS/HIPS), wireless (WIDS/WIPS), NBA.

4. **Honeypots and Honeynets (V204):** Honeypot (single vulnerable computer), Honeynet (multiple honeypots, simulated network), Padded cell (isolates attacker automatically).

5. **Malicious Software (V205):** Worms (self-spreading), logic bombs (trigger-based), Trojans/RATs (disguised), ransomware (encryption extortion), keyloggers, zero-day, spyware, adware, bots/botnets (DDoS). Viruses: MBR, file infector, macro, service injection. Polymorphic, encrypted, multipartite, stealth.

6. **Anti-Malware (V206):** Signature-based (known malware, needs updates) vs. Heuristic-based (behavior analysis, best for zero-day). On-access (real-time) vs. On-demand (manual). Quarantine (isolate) vs. Disinfect (remove). Most important control: security awareness training.

7. **Artificial Intelligence Tools (V207):** Narrow AI (single task), General AI (human-like), Super AI (surpasses humans). Machine learning: supervised (labeled data), unsupervised (unlabeled, clustering), semi-supervised, reinforcement (reward/punish). Neural networks (deep learning). Risks: misconfiguration, inconsistency, high cost, no ethics.

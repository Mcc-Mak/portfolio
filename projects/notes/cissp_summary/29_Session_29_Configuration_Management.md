# Session 29: Configuration Management (CISSP Objectives 7.3, 7.5, 7.8, 7.9, 8.1, 8.2)

**Videos:** V216 – V221  
**Core Focus:** Configuration management (CM) fundamentals (configuration items, baselines, provisioning), system patch management (patch process, agent-based vs. agentless), change control (request → review → build/test → approve → implement → verify → close out), software configuration management (branches, change sets, version control), and media management (marking/labeling, sanitization, removable media).

---

## Video V216 (Outline): Configuration Management (Section Intro)

**Objective:** To introduce the key topics in configuration management for the CISSP exam.

### Topics Covered in this Session
1.  Configuration Management (CM) – configuration items, baselines, provisioning, NIST SP 800-128 four phases
2.  System Patch Management – patch process, agent-based vs. agentless, evaluation → test → approve → deploy → verify
3.  Change Control – request, review, build/test, approve/reject, implement, verify, close out; CCB
4.  Software Configuration Management – branches, change sets, version control, request/change/release control
5.  Media Management – marking/labeling, sanitization, removable media, escrow arrangements

---

## Video V217: Configuration Management

**Objective:** To explain CM fundamentals, configuration items, baselines, provisioning, and the NIST SP 800-128 four-phase process.

### I. Core Definition & Purpose
- **Configuration Management (CM):** Activities ensuring system components maintain a *known* configuration state
- **Primary Goal:** Prevent unauthorized changes to systems
- **Configuration:** Specifications/settings of an asset (server, firewall, etc.), including architecture design

### II. Key Terminology
- **Configuration Item (CI):** The asset that requires configuration control
- **CM Plan:** Defines *how* the organization manages/configures changes to assets
- **CM Policy vs. Plan:** Policy = intention; Plan = execution (purpose, scope, roles, processes)

### III. NIST SP 800-128 Framework (4 Phases)

| Phase | Key Activities |
| :--- | :--- |
| **1. Planning** | Identify CIs (scope) → Create CM policy/processes → Establish a **Change Control Board (CCB)** (review/approve changes). CCB ensures separation of duties. |
| **2. Identifying & Implementing** | Define **secure baseline configuration** (specifications/version). Use versions for consistent deployment. **Provisioning** = create/manage/destroy CIs (can be automated via DevOps tools like Chef, Puppet, Ansible). |
| **3. Controlling** | Maintain secure baseline → Conduct security impact assessments for changes → Update CM plan & baseline documentation. |
| **4. Monitoring** | Analyze compliance with approved baselines (using integrity tools: AIDE, Tripwire, discovery/vulnerability scans). Identify unauthorized changes & improve CM processes. |

### IV. Important Concepts
- **Not everything is a CI** – only assets requiring control
- **CCB composition:** Designated members + guest SMEs (e.g., network engineer for network changes)
- **Baseline versions** enable recovery, consistent deployment, and risk awareness
- **Automation** (DevOps/DevSecOps) allows approved baselines to be provisioned without repeated security analysis

### V. Exam Takeaways
- Understand the **purpose of CM**, key terms (CI, baseline, provision), and the **4-phase CM process** (Plan → Identify/Implement → Control → Monitor)

---

## Video V218: System Patch Management

**Objective:** To explain patch management process, architectures, and the 5-step patch lifecycle.

### I. Definition & Purpose
- **Patch:** Fix for a known functionality problem in software/firmware (bug fixes, new features, security updates)
- **Patch Management:** Consistent process to identify and install patches while avoiding operational impact
- **Link to Vulnerability Management:** Patches often fix vulnerabilities

### II. Key Policy & Process Elements
- **Patch management policy** must outline: identification, acquisition, installation, responsibilities, avoiding production/operations impact
- **Key challenges:** timeliness, priority setting, testing before deployment

### III. When Patching Is Not Possible
- Options if a system/application cannot be patched:
  - Reconfigure (disable vulnerable service)
  - Remove the application
  - Apply **compensating controls** (e.g., whitelisting, TLS encryption)

### IV. Patch Management Architectures

| Approach | Description |
| :--- | :--- |
| **Agent-based (centralized)** | Agents on hosts communicate with internal patch server → most common & effective |
| **Agentless** | Server scans systems to detect missing patches |
| **Passive network monitoring** | Monitors local network traffic to identify patching needs (limited to protocol-level visibility) |
| **Decentralized** | Hosts manage own patches → not recommended (loss of configuration control & baseline) |

- **NIST SP 800-40r3** comparison highlights: agent-based needs admin privileges, supports remote hosts, most effective overall

### V. General Steps of Patch Management

| Step | Description |
| :--- | :--- |
| **1. Evaluate** | Identify relevant patches from trusted sources (NIST, vendors); determine risk to system |
| **2. Test** | Assess for negative impacts in sandbox/dev environment |
| **3. Approve** | Submit to change control board (part of change/config management) |
| **4. Deploy** | Install in production as soon as possible to reduce risk exposure |
| **5. Verify** | Confirm effectiveness and no operational issues (security tests, audits); perform regression testing |

### VI. Exam Takeaways
- Understand **purpose & challenges** of patch management
- Know **architectures** (agent-based vs. agentless vs. passive monitoring)
- Memorize the **5 general steps** (Evaluate → Test → Approve → Deploy → Verify)

---

## Video V219: Change Control

**Objective:** To explain change control (change management) process, CCB, and security impact analysis.

### I. Terminology & Relationship to Configuration Management
- **Change Management** and **Change Control** are interchangeable terms
- **Configuration Management (CM)** is the overarching 4-phase process. Change control lives in Phase 3 (Controlling configuration changes)
- Change control applies to any **Configuration Item (CI)**

### II. The Change Control Process (7 Steps)

| Step | Action |
| :--- | :--- |
| **1. Request** | Formally request & record proposed change (ticket/form required for documentation) |
| **2. Review** | Change Control Board (CCB) reviews impact |
| **3. Build & Test** | Done in a development environment; identify security/functional impacts |
| **4. Approve/Reject** | CCB decides based on test results (approve, approve with modifications, or reject) |
| **5. Implement** | Deploy approved change without impacting **Ops** (government/federal) or **Prod** (commercial) |
| **6. Verify** | Confirm correct implementation; document new CI configuration |
| **7. Close Out** | Update baseline, CM plan, all documentation → roll to new baseline version |

### III. Flow of Roles
- **Requester** → documents change request
- **CCB** → reviews, then approves/rejects after testing
- **Engineers / Admins / Security Engineers** → build, test, implement
- **CCB** → final verification & close-out

### IV. Security Impact Analysis (Key Activities within Change Control)
- **Release control** – part of implementation step
- **Security impact analysis** includes:
  - Identify potential security risks/impacts
  - Discover vulnerabilities in software/hardware/assets affected by the change
  - Assess risks from threats/vulnerabilities
  - Assess impact on existing security/privacy controls and overall security posture
  - Perform **regression testing** (ensure change doesn't break other system parts)
- **Plan safeguards & countermeasures** – reduce risk to acceptable level (proactive + reactive)
- **Follow change control process** to update the security baseline (build security in early)

### V. Exam Takeaways
- Know the **purpose** of change management/control
- Understand the **process** (request → review → build/test → approve → implement → verify → close out)
- Understand the **security impact analysis process**

---

## Video V220: Software Configuration Management

**Objective:** To explain software CM concepts: configuration items, baselines, versions, change sets, branches, and request/change/release control.

### I. Core Definition & Purpose
- **Software CM** ensures software maintains a *known* configuration
- Critical for large and enterprise-level environments
- Focuses on the software side (vs. general CM)

### II. Key Components of Software CM

| Component | Description |
| :--- | :--- |
| **Configuration Items (CIs)** | System/software assets requiring control (e.g., OS, hypervisor). Identified in the CM plan. |
| **Baselines** | Pre-configured CIs used as a consistent starting point. Tested, verified, then versioned (e.g., 1.1.2 → 1.1.3). |
| **Versions** | Uniquely identify functionality or baseline configuration. |
| **Change Sets** | Collective changes made to a baseline as part of a change request. |
| **Branches** | Configurations built alongside the baseline (a "build in progress"). Checking out a baseline creates a branch; checking it back in (after CCB approval) creates a new official baseline. |

### III. The Change Management Process (3 Sub-processes)

| Sub-process | Function |
| :--- | :--- |
| **Request Control** | Procedures for *requesting* a change. |
| **Change Control** | Procedures for *identifying* the appropriate change (what's in the change set, which branch). |
| **Release Control** | Procedures for *deploying* the change to production/operations (pushing/rolling out). |

### IV. Step-by-Step Change Workflow
1.  **Request** – Submit change to CCB (Request Control)
2.  **Review** – Assess relevance, risk, impact (Request Control)
3.  **Build & Test** – Create proof of concept (Change Control)
4.  **Approve/Reject** – CCB decides based on test results (Change Control)
5.  **Implement** – Push/roll out to production/ops (Release Control)
6.  **Verify** – Check for negative impacts (Release Control)
7.  **Close Out** – Roll new baseline/version (Release Control)

### V. Key Benefits & Takeaways
- **Traceability & Accountability** – Multiple personnel involved at each step
- **Governance** – If something fails, documentation allows rollback to previous baseline
- **Bottom Line** – Understand the purpose of software CM and clearly understand the change management process

### VI. Exam Takeaways
- Understand the purpose of software CM
- Clearly understand the change management process (request/change/release control)

---

## Video V221: Media Management

**Objective:** To explain media management, marking/labeling, sanitization, and escrow arrangements.

### I. Definition of Media
- Any medium capable of storing data (HDD, SSD, tape, CD, DVD, mobile device, thumb drive, etc.)

### II. Core Security Goal
- Maintain **confidentiality, integrity, availability (CIA)** of data on media at all times

### III. Media Lifecycle & Availability
- Media has a **finite lifespan** (mean time to failure)
- Aging media can slow data retrieval → impacts **availability**
- Need **good inventory & asset tracking** to replace media before failure

### IV. Relationship to Data Lifecycle
- Media management focuses on the **storage phase** of the data lifecycle
- Data is created → labeled → stored on media → accessed → transferred to other media

### V. Marking & Labeling Assets (Critical)
- **Physical marking** (e.g., "Secret" sticker on a hard drive) → identifies sensitivity/classification of data the media may contain
- **Digital labeling** (metadata, hard-coded) → ensures proper handling across systems

### VI. Removable Media & Physical Controls
- Use stickers, tags, markers
- **Encrypt** wherever possible
- Backup tapes → store in safes, lockable containers, vaults
- Media leaving facility → apply security controls for **transit/transport** protection

### VII. Sanitization
- When media is no longer needed → **properly sanitize** to prevent data remnant recovery
- Critical before reusing media at a lower classification level

### VIII. Proactive Replacement
- Replace media before mean time to failure is realized
- Part of **continuous monitoring** and **asset security** to avoid availability loss or single points of failure

### IX. Escrow Arrangements
- **Key/certificate escrow:** Third-party agent stores crypto keys; recovery agent accesses
- **Software escrow:** Stores source code, licenses, documentation – protects if vendor fails

### X. Exam Takeaways
- Understand the **purpose of media management**: protecting media throughout its lifecycle to uphold CIA
- Know marking/labeling, sanitization, removable media controls, and escrow arrangements

---

## Session 29 Summary

Session 29 covers the **complete configuration management landscape** for the CISSP exam (Objectives 7.3, 7.5, 7.8, 7.9, 8.1, 8.2). Key takeaways include:

1. **Configuration Management (V217):** NIST SP 800-128 four phases: Planning → Identifying & Implementing → Controlling → Monitoring. Key terms: Configuration Item (CI), baseline, provisioning. CCB (Change Control Board) ensures separation of duties.

2. **System Patch Management (V218):** 5-step process: Evaluate → Test → Approve → Deploy → Verify. Architectures: agent-based (most effective), agentless, passive network monitoring. When patching not possible: reconfigure, remove, or apply compensating controls.

3. **Change Control (V219):** 7-step process: Request → Review → Build & Test → Approve/Reject → Implement → Verify → Close Out. Security impact analysis includes regression testing. CCB reviews and approves changes.

4. **Software Configuration Management (V220):** Baselines (versioned), change sets (collective changes), branches (builds in progress). Three sub-processes: Request Control, Change Control, Release Control. Traceability and accountability through multiple personnel involvement.

5. **Media Management (V221):** Physical marking (stickers) and digital labeling (metadata). Removable media: encrypt, store in safes/vaults, protect in transit. Sanitization before disposal/reuse. Escrow arrangements for keys/certificates and software source code.

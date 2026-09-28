# Session 7: Asset Security

## Overview
This session covers the identification, classification, handling, and lifecycle management of data and information system assets. It consists of 8 videos (V42–V49).

---

## Video V42 (Outline): Asset Security (Section Intro)

**Objective:** To introduce the key topics in asset security for the CISSP exam.

### Topics Covered in this Session
1.  Classifying Data and Assets
2.  Information and Asset Handling Requirements
3.  Managing System Assets (Provisioning)
4.  Roles and Responsibilities (Data Owner, Custodian, Steward)
5.  Managing the Data Lifecycle
6.  The Information System Lifecycle (Part 1 & 2)

---

## Video V43: Classifying Data and Assets (Sensitivity Levels)

**Objective:** To explain how to identify and classify data and assets.

### I. Core Objective
- Identify, track, and manage organizational assets (both data and physical resources) throughout their lifecycle.
- **Foundation:** Know your inventory.

### II. Types of Sensitive Data (For the Exam)

| Type | Description |
| :--- | :--- |
| **PII (Personally Identifiable Information)** | Data that uniquely identifies an individual |
| **PHI (Protected Health Information)** | Health-related information (regulated by HIPAA) |
| **Proprietary Data** | Provides a competitive advantage |

### III. Classification Levels

**National Security/Military:**

| Level | Impact if Disclosed |
| :--- | :--- |
| **Top Secret** | Grave/Severe damage |
| **Secret** | Serious damage |
| **Confidential** | Moderate damage |
| **Unclassified** | No damage |

**Civilian/Business:**

| Level | Impact if Disclosed |
| :--- | :--- |
| **Proprietary/Confidential** | Grave damage (e.g., acquisitions, vuln reports) |
| **Private** | Serious damage (e.g., PII, financial data) |
| **Sensitive** | Minimal damage (e.g., employee reviews) |
| **Public** | No damage (e.g., marketing) |

### IV. Asset Classification (Tier System)

| Tier | Assets |
| :--- | :--- |
| **Tier 0 (Essential)** | Servers, databases, enterprise network devices |
| **Tier 1 (Important)** | Development environments, backups, local network devices |
| **Tier 2 (Non-Essential)** | Workstations, mobile devices, printers |
| **Significant Systems** | Assets required to be compliant with regulations (FISMA, HIPAA, GDPR, PCI DSS) |

---

## Video V44: Information and Asset Handling Requirements (Marking & Labeling)

**Objective:** To explain how to mark, label, and handle data in different states.

### I. Marking vs. Labeling

| Concept | Type | Description |
| :--- | :--- | :--- |
| **Marking** | Physical | Physical identification of an asset with its sensitivity level (e.g., cover sheet with "SECRET") |
| **Labeling** | Logical/Digital | Digital identification via metadata or watermarks (e.g., "Confidential" watermark on a PDF) |

### II. The Three Data States

| State | Description | Protection Examples |
| :--- | :--- | :--- |
| **Data in Use** | Being accessed or processed | Strong authentication, access controls |
| **Data in Transit** | Moving across a network | Encryption (VPN, TLS), secure protocols |
| **Data at Rest** | Stored on media | Encryption (full disk), secure storage location |

---

## Video V45: Managing System Assets (Secure Provisioning)

**Objective:** To explain how to provision and track IT assets.

### I. Definition
- **Secure Provisioning:** The process of creating, managing, and destroying assets throughout their lifecycle.

### II. Asset Inventory Tracking

| Category | Information to Track |
| :--- | :--- |
| **Supply Chain** | Manufacturer, model, serial number, version, vendor reputation |
| **Operational** | Purchase date, install date, license info, location, IP address, dependencies |
| **Maintenance** | Patches installed, warranty, spare assets |
| **Performance** | CPU, memory, uptime/downtime, baseline numbers |

### III. Management Methods
- **Storage:** Spreadsheets, databases, or specialized software applications.
- **Discovery:** Automated tools (Nessus, Nmap) for host discovery and banner grabbing.
- **Process:** All updates to inventory must follow **Change Control** or **Configuration Management** processes.

---

## Video V46: Data Roles and Responsibilities (Owner, Custodian, Steward)

**Objective:** To explain the key data roles for the CISSP exam.

### I. Primary Data Roles

| Role | Analogy | Responsibility |
| :--- | :--- | :--- |
| **Data Owner** | The Manager | Ultimate accountability; defines value and protection levels |
| **Data Custodian** | The Implementer | Implements physical, administrative, and logical controls on behalf of the owner |
| **Data Steward** | The Specialist | Subject matter expert (SME); helps categorize and classify data |

### II. Regulatory Roles (GDPR Context)

| Role | Description |
| :--- | :--- |
| **Data Controller** | Determines the purpose and means of processing personal data (the "Data Owner" in GDPR) |
| **Data Processor** | Collects and processes data on behalf of the controller |

### III. Access Roles
- **Subject:** Any entity (human, software, API) that accesses an object.
- **User:** A specific type of subject (a human) who is identified and authenticated.
- **Object:** The resource being accessed (file, service, function).

---

## Video V47: Managing the Data Lifecycle (Create to Destroy)

**Objective:** To explain the conceptual phases of the data lifecycle.

### I. The Six Conceptual Phases

| Phase | Description |
| :--- | :--- |
| **1. Create/Collect** | Data is generated or gathered in accordance with policy |
| **2. Classify** | Data is categorized based on sensitivity and value |
| **3. Store** | Data is saved to a medium (on-prem, cloud, backup site) |
| **4. Use/Process** | Data is accessed, modified, or processed |
| **5. Archive** | Data is moved to long-term storage for compliance or historical purposes |
| **6. Destroy** | Data is permanently deleted or media is sanitized |

### II. Key Principles
- **Protect from "cradle to grave"** (creation to destruction).
- **Data value is dynamic** and can change over time, triggering reclassification.
- External factors (**emerging threats, compliance updates**) impact protection needs.

---

## Video V48: The Information System Lifecycle (Part 1) - Initiation to Acquisition

**Objective:** To explain the initial phases of the information system lifecycle (NIST SP 800-64).

### I. Core Principle
- Security must be accounted for at **every phase** of the system lifecycle.

### II. The Five Phases (Overview)

| Phase | Description |
| :--- | :--- |
| **1. Initiation** | Define stakeholder needs and requirements |
| **2. Development & Acquisition** | Build vs. buy decision; risk assessment; control selection |
| **3. Implementation & Assessment** | Deploy, test, and authorize the system |
| **4. Operations & Maintenance** | Run and continuously improve the system |
| **5. Disposal** | Decommission and securely dispose of components |

### III. Phase 1: Initiation (Stakeholder Requirements)

| Requirement Type | Description |
| :--- | :--- |
| **Business Requirements** | High-level objectives (e.g., "Process sales") |
| **Functional Requirements** | Specific tasks the system must perform (e.g., "Authenticate users") |
| **Non-Functional Requirements** | Qualities of the system (e.g., performance, usability) |

### IV. Phase 2: Development & Acquisition (Build vs. Buy)

| Decision | Security Implications |
| :--- | :--- |
| **Build** | Requires more security attention (secure coding, testing) |
| **Buy/Acquire** | Saves time but requires integration into existing architecture |

**Key Activities:**
- Risk Assessment → Security Control Selection → Architectural Design → Engineering & Development → Integration

---

## Video V49: The Information System Lifecycle (Part 2) - Implementation to Disposal

**Objective:** To explain the later phases of the information system lifecycle.

### I. Phase 3: Implementation & Assessment

| Step | Description |
| :--- | :--- |
| **Verification & Validation** | Test the system against requirements |
| **Security Assessment Report (SAR)** | Document findings |
| **Plan of Action & Milestones (POA&M)** | Address deficiencies |
| **Authorization** | Authorizing Official issues Authorization to Operate (ATO) |

### II. Phase 4: Operations & Maintenance

| Activity | Description |
| :--- | :--- |
| **Configuration Management** | Strictly control changes to prevent instability |
| **Continuous Monitoring** | Periodically assess controls for ongoing effectiveness |
| **Incident Response** | Respond to security incidents |
| **Patch Management** | Keep systems updated |

### III. Phase 5: Disposal / Retirement

| Step | Description |
| :--- | :--- |
| **Decommissioning** | Create a transition plan to remove the system |
| **Data Preservation** | Retain data required for legal/regulatory compliance |
| **Media Sanitization** | Securely erase or destroy data (degaussing, overwriting) |
| **Hardware/Software Disposal** | Physically destroy or remove assets |

---

## Session Summary
Session 7 covers the **complete asset security lifecycle** for the CISSP exam. Key takeaways include:
1.  **Data Classification:** PII, PHI, Proprietary data; National Security (Top Secret → Unclassified) and Civilian (Proprietary → Public) levels.
2.  **Asset Classification:** Tier system (Tier 0–2) and Significant Systems.
3.  **Marking (physical) vs. Labeling (logical)** for data handling across three states (in use, in transit, at rest).
4.  **Secure Provisioning:** Asset inventory tracking and management.
5.  **Data Roles:** Owner (manager), Custodian (implementer), Steward (SME); plus GDPR Controller/Processor.
6.  **Data Lifecycle:** Create → Classify → Store → Use → Archive → Destroy.
7.  **Information System Lifecycle (NIST SP 800-64):** Initiation → Development/Acquisition → Implementation/Assessment → Operations/Maintenance → Disposal.
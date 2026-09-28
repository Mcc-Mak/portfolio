# Session 8: Data Security Controls

## Overview
This session covers the selection and implementation of data security controls, including data states, control frameworks, protection methods, data retention, and data remanence. It consists of 8 videos (V50–V57).

---

## Video V50 (Outline): Data Security Controls (Section Intro)

**Objective:** To introduce the key topics in data security controls for the CISSP exam.

### Topics Covered in this Session
1.  Understanding Data States (At Rest, In Transit, In Use)
2.  Security Control Frameworks (COBIT, ISO 27002, NIST 800-53)
3.  Determining Security Controls (Baselines)
4.  Selecting Security Controls (Scoping & Tailoring)
5.  Data Protection Methods (DRM, DLP, CASB)
6.  Data Retention Requirements (EOL/EOS)
7.  Managing Data Remnants (Sanitization)

---

## Video V51: Data States (At Rest, In Transit, In Use)

**Objective:** To explain the three states of data and their security implications.

### I. The Three Data States

| State | Definition | Key Risk | Security Focus |
| :--- | :--- | :--- | :--- |
| **Data in Use** | Active in memory (RAM); being processed | Most volatile; integrity at risk | Strong AAA (Authentication, Authorization, Accounting) |
| **Data in Transit** | Moving across a network (source to destination) | Most at risk; CIA can be impacted | Encryption (TLS/SSL), mutual authentication |
| **Data at Rest** | Stored on media (inactive) | Static target; vulnerable to APTs | Full disk encryption, TPM |

### II. Key Exam Takeaways
- **Data in Use:** Most **Volatile**
- **Data in Transit:** Most **at Risk**
- **Data at Rest:** Creates a **Static Target**

---

## Video V52: Security Control Frameworks (COBIT, ISO 27002, NIST 800-53)

**Objective:** To explain the major security control frameworks for the CISSP exam.

### I. COBIT (Control Objectives for Information and Related Technologies)
- **Focus:** IT Governance
- **Purpose:** Improve IT efficiency and effectiveness; align IT with business needs
- **Managed by:** ISACA
- **Derived from:** COSO (used for SOX 404 compliance)
- **Five Principles:** Meeting stakeholder needs, Covering enterprise end-to-end, Single integrated framework, Holistic approach, Separating governance from management

### II. ISO/IEC 27002
- **Focus:** International standard for security controls
- **Structure:** Broken into **control objectives** (policies, HR security, cryptography, etc.)
- **Origin:** Evolved from British Standard 7799 → formally adopted in 2005

### III. NIST SP 800-53
- **Focus:** Security and privacy controls for information systems and organizations
- **Adoption:** Most widely used in **US Federal Government** (required by FISMA)
- **Structure:** Broken into **control families** (Access Control, Awareness & Training, Audit & Accountability, etc.)

---

## Video V53: Determining Security Controls (Baselines)

**Objective:** To explain how to select and baseline security controls.

### I. Key Principle
- **Never make up your own controls.** Always reference trusted sources (industry standards or regulations).

### II. The "High Watermark" Principle
- Data sensitivity drives protection needs. Protect the system at the **highest** level of data sensitivity present.

### III. The Process
1.  **Identify Data Types:** Inventory what data exists (PII, PHI, financial, classified).
2.  **Document:** Track data types in a spreadsheet or GRC tool.
3.  **Select Controls:** Choose controls from a catalog (NIST 800-53, ISO 27002).

### IV. Control Baseline
- **Definition:** A list of all the controls an organization will use to meet security needs (the minimum starting point).
- **Source Example:** NIST 800-53B provides a general control baseline.

---

## Video V54: Selecting Security Controls (Scoping & Tailoring)

**Objective:** To explain how to scope and tailor controls to fit the organization.

### I. Scoping vs. Tailoring

| Concept | Description |
| :--- | :--- |
| **Scoping** | Determining which controls from the baseline apply to the organization's environment |
| **Tailoring** | Modifying the control baseline by adding (tailor in) or removing (tailor out) controls |

### II. The PDCA (Deming Cycle) for Controls

| Phase | Description |
| :--- | :--- |
| **Plan** | Define security objectives and identify needed controls |
| **Do** | Implement the controls |
| **Check** | Assess effectiveness against objectives |
| **Act** | Address gaps and improve |

### III. Critical Distinction (For the Exam)
- **Controls are RECOMMENDATIONS, NOT Requirements.**
- It is the system owner's decision to turn controls into specific requirements.

---

## Video V55: Data Protection Methods (DRM, DLP, CASB)

**Objective:** To explain digital rights management, data loss prevention, and cloud access security brokers.

### I. Digital Rights Management (DRM)
- **Purpose:** Uses encryption to enforce copyright protection for digital media.
- **Key Technologies:** HDCP (displays), AACS (Blu-ray), ADEPT (eBooks/PDFs).

### II. Data Loss Prevention (DLP)
- **Purpose:** Blocks unauthorized data exfiltration (egress monitoring).

| Type | Description |
| :--- | :--- |
| **Network DLP** | Scans all outgoing traffic (inline proxy for active blocking; SPAN port for passive monitoring with remediation) |
| **Endpoint DLP** | Installed on local servers; scans local file system |

### III. Cloud Access Security Broker (CASB)
- **Purpose:** Enforces security controls between users and cloud-based assets.
- **How it works:** Functions as a **proxy** (intermediary) between user and cloud service.
- **Key Functions:** Data security, threat protection, real-time risk analysis, compliance enforcement.

---

## Video V56: Data Retention Requirements (EOL/EOS)

**Objective:** To explain data retention policies and asset lifecycle management.

### I. The Golden Rule of Retention
- **Never keep data longer than it is absolutely needed** (by regulation or organization).
- If a regulation mandates 1 year (365 days), destroy on **day 366** to avoid liability.

### II. Key Drivers
- **Organizational Policy:** Internal rulebook aligned with laws.
- **Laws & Regulations:** HIPAA, PCI DSS, GDPR, SOX, GLBA.

### III. Asset Lifecycle Concepts

| Concept | Definition |
| :--- | :--- |
| **End-of-Life (EOL)** | Product is no longer usable (expired license, hardware failure, no replacement parts) |
| **End-of-Service (EOS)** | Vendor will no longer provide maintenance, patches, or support |

### IV. Exception
- **Legal Holds:** Data involved in legal proceedings or security incidents must be retained until the case is concluded (supersedes policy).

---

## Video V57: Managing Data Remnants (Sanitization)

**Objective:** To explain data remanence and sanitization methods.

### I. Core Concept
- **Data Remanence:** Residual data that remains after ineffective deletion or destruction.
- Standard deletion merely relocates data (e.g., to Recycle Bin) rather than removing it physically.

### II. Declassification Methods (Data Desensitization)

| Method | Description |
| :--- | :--- |
| **De-identification** | Removing PII to anonymize data |
| **Pseudonymization** | Replacing identifiers with aliases |
| **Tokenization** | Substituting data with non-sensitive tokens (zero value) |
| **Obfuscation** | Concealing data (e.g., black boxes, masking) |

### III. Destruction Methods

| Method | Effectiveness |
| :--- | :--- |
| **Erasing** | Low (removes file system pointers only) |
| **Clearing** | High (overwrites data completely) |
| **Purging** | Very High (repeated clearing processes) |
| **Sanitization** | Maximum (complete removal to factory-like state) |

### IV. Sanitization Techniques
- **Degaussing:** Uses strong magnetic fields (primarily for tapes).
- **Zeroing:** Overwrites all data with zeros.
- **Overwriting:** Uses random patterns of ones and zeros (more complex than zeroing).

### V. Regulatory Guidance
- **NIST SP 800-88:** Guidelines for Media Sanitization.
- **ISO/IEC 27040:** Storage security standards.

---

## Session Summary
Session 8 covers the **complete data security controls landscape** for the CISSP exam. Key takeaways include:
1.  **Data States:** In Use (most volatile), In Transit (most at risk), At Rest (static target).
2.  **Control Frameworks:** COBIT (IT governance), ISO 27002 (international control objectives), NIST 800-53 (US federal control families).
3.  **Baselines & Scoping/Tailoring:** Controls are recommendations; modify baselines based on organizational needs.
4.  **Data Protection Methods:** DRM (copyright), DLP (exfiltration prevention), CASB (cloud proxy).
5.  **Data Retention:** Never keep data longer than needed; understand EOL vs. EOS.
6.  **Data Remanence:** Proper sanitization (clearing, purging, degaussing, overwriting) to prevent data recovery.
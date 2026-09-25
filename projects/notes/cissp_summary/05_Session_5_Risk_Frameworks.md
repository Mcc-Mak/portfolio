# Session 5: Risk Frameworks

## Overview
This session covers the major risk management frameworks, including NIST RMF, NIST CSF, ISO 27001, PCI DSS, and SABSA. It consists of 6 videos (V28–V33).

---

## Video V28 (Outline): Risk Frameworks (Section Intro)

**Objective:** To introduce the key risk frameworks for the CISSP exam.

### Topics Covered in this Session
1.  Risk Frameworks (NIST RMF)
2.  NIST Cybersecurity Framework (CSF)
3.  ISO/IEC 27001
4.  PCI DSS
5.  SABSA

---

## Video V29: Risk Frameworks (NIST RMF, ISO 31000, COSO)

**Objective:** To explain the NIST Risk Management Framework (RMF) and other key frameworks.

### I. NIST Risk Management Framework (RMF) - SP 800-37

**The 7-Step RMF Process:**

| Step | Description |
| :--- | :--- |
| **1. Prepare** | Identify roles, business strategy, and inherited controls |
| **2. Categorize** | Classify assets and data types (PII, Top Secret, etc.) to determine control baseline |
| **3. Select** | Choose appropriate security controls based on categorization |
| **4. Implement** | Deploy controls and document deployment |
| **5. Assess** | Test controls to verify effectiveness |
| **6. Authorize** | Senior management reviews risk; issues Authorization to Operate (ATO) |
| **7. Monitor** | Continuously evaluate controls; cycle back to Select if changes occur |

### II. ISO 31000 (General Risk Management)

**Key Principles (8 total):** Integrated, Structured & Comprehensive, Customized, Inclusive, Dynamic, Best Available Information, Human & Cultural Factors, Continual Improvement.

### III. COSO (Enterprise Risk Management for Corporate Governance)

**Core Components:**
| Component | Description |
| :--- | :--- |
| **Governance & Culture** | Sets organizational tone and core values |
| **Strategy & Objective-Setting** | Integrates risk with strategic planning |
| **Performance** | Identifies risks impacting strategy and objectives |
| **Review & Revision** | Monitors performance and effectiveness |
| **Information, Communication & Reporting** | Ensures risk information flows throughout the organization |

- **Key Connection:** COSO is the driving framework for **Sarbanes-Oxley (SOX) 404** compliance.

---

## Video V30: NIST Cybersecurity Framework (CSF)

**Objective:** To explain the NIST CSF, its components, and tiers.

### I. Overview
- **Nature:** A **voluntary** framework for risk management and reduction (not mandated by FISMA, HIPAA, etc.).
- **Purpose:** To encourage communication about cybersecurity risk between internal and external stakeholders.

### II. The Three Main Components

| Component | Description |
| :--- | :--- |
| **The Core** | Activities, implementations, and functions to achieve desired cybersecurity outcomes |
| **The Tiers** | Characterizes how far along the organization is in implementing the framework (1-4) |
| **The Profiles** | Aligns requirements, objectives, and risk tolerance with desired outcomes (Current vs. Target) |

### III. The Four Tiers
| Tier | Description |
| :--- | :--- |
| **1: Partial** | Reactive; no formal risk management process |
| **2: Risk-Informed** | Aware of risks but not consistently implemented |
| **3: Repeatable** | Formal, repeatable processes in place |
| **4: Adaptive** | Continuous improvement; actively shares threat intelligence |

### IV. The Five Core Functions

| Function | Purpose |
| :--- | :--- |
| **Identify** | Understand cybersecurity risk to systems, assets, and data |
| **Protect** | Implement safeguards to ensure delivery of critical services |
| **Detect** | Identify cybersecurity events |
| **Respond** | Take action regarding detected incidents |
| **Recover** | Restore capabilities after a disruption |

---

## Video V31: ISO/IEC 27001 Framework (ISMS)

**Objective:** To explain the ISO/IEC 27001 standard for Information Security Management Systems (ISMS).

### I. Overview
- **Definition:** An internationally recognized standard for **Information Security Management Systems (ISMS)** .
- **Applicability:** Any organization of any size and sector.
- **Guiding Principles:** Based on the **CIA Triad** (Confidentiality, Integrity, Availability).

### II. The Clauses (Required for Certification)

| Clause | Concept | Description |
| :--- | :--- | :--- |
| **Clause 4: Context** | Scope & Objectives | Understand internal/external factors, stakeholders |
| **Clause 5: Leadership** | Stakeholders | Management commitment; define policy and roles |
| **Clause 6: Planning** | Set objectives | Risk assessments; develop Risk Treatment Plan |
| **Clause 7: Support** | Allocate resources | Budget, personnel, documentation, training |
| **Clause 8: Operation** | Implement | Deploy and manage security controls |
| **Clause 9: Performance Evaluation** | Audit & Analysis | Internal/external audits; identify gaps |
| **Clause 10: Improvement** | Continuous improvement | Corrective actions; learn from incidents |

### III. Related Standard: ISO/IEC 27002
- **Function:** The **control catalog** for ISO 27001 (provides specific controls to implement).

---

## Video V32: PCI DSS (Payment Card Industry Data Security Standard)

**Objective:** To explain the PCI DSS requirements and data types.

### I. Overview
- **Status:** A **standard**, not a law, but treated like a regulation in the payment card industry.
- **Scope:** The **Cardholder Data Environment (CDE)** – any person, process, or technology that touches card data.

### II. Data Types to Protect

| Data Type | Includes |
| :--- | :--- |
| **Cardholder Data** | Account number (PAN), cardholder name, expiration date, service code |
| **Sensitive Authentication Data (SAD)** | Full track data, CVV, PIN |

### III. The 12 High-Level Requirements

| # | Requirement |
| :--- | :--- |
| 1 | Install and maintain network security controls |
| 2 | Apply secure configurations |
| 3 | Protect stored account data |
| 4 | Use strong cryptography in transit |
| 5 | Protect from malware |
| 6 | Develop secure systems |
| 7 | Restrict access by need-to-know |
| 8 | Identify and authenticate users |
| 9 | Restrict physical access |
| 10 | Log and monitor access |
| 11 | Test security regularly |
| 12 | Support with organizational policies |

---

## Video V33: SABSA Framework (Business-Driven Security)

**Objective:** To explain the SABSA framework for security architecture.

### I. Core Purpose
- **Definition:** A methodology for developing **business-driven, risk-focused security architectures** that align with business objectives.
- **Key Principle:** It is an overarching framework that sits on top of other standards (NIST, ISO 27001, COBIT) to provide traceability back to business goals.

### II. The Six Architecture Layers (Viewpoints)

| Layer | Viewpoint | Key Focus |
| :--- | :--- | :--- |
| **1. Contextual** | Business Manager | Scope, objectives, stakeholder needs |
| **2. Conceptual** | Architect | High-level security objectives and relationships |
| **3. Logical** | Designer | Security services, policies, data flows |
| **4. Physical** | Builder | Physical infrastructure, network, systems |
| **5. Component** | Tradesman/Implementer | Specific security components (firewalls, DLP, IDS) |
| **6. Service Management** | Operations Manager | Day-to-day operations, incident response, patch management |

### III. The SABSA Matrix
- Based on six fundamental questions: **What, Why, How, Who, Where, When**.
- Applied across all six architecture layers for comprehensive traceability.

---

## Session Summary
Session 5 covers the **major risk and security frameworks** for the CISSP exam. Key takeaways include:
1.  **NIST RMF** 7-step process: Prepare → Categorize → Select → Implement → Assess → Authorize → Monitor.
2.  **NIST CSF** 5 core functions: Identify, Protect, Detect, Respond, Recover, plus 4 tiers (Partial to Adaptive).
3.  **ISO 27001** ISMS clauses (Context → Leadership → Planning → Support → Operation → Evaluation → Improvement).
4.  **PCI DSS** 12 high-level requirements, Cardholder Data vs. SAD, and the CDE scope.
5.  **SABSA** 6 architecture layers (Contextual to Service Management) for business-driven security.
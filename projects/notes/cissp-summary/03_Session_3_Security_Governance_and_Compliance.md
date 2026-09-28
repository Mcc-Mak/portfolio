# Session 3: Security Governance and Compliance

## Overview
This session covers the critical aspects of security governance, including due care/diligence, key laws and regulations, intellectual property, export/import controls, cyber crimes, and compliance artifacts. It consists of 8 videos (V14–V21).

---

## Video V14 (Outline): Security Governance and Compliance (Section Intro)

**Objective:** To introduce the key topics in security governance and compliance.

### Topics Covered in this Session
1.  Due Care and Due Diligence
2.  Important Laws and Regulations (GDPR, HIPAA, PCI DSS)
3.  Licensing and Property Rights (Intellectual Property)
4.  Export and Import Controls (EXIM / Wassenaar Arrangement)
5.  Cybercrime and Data Breaches
6.  Security Policy, Standards, Procedures, and Guidelines

---

## Video V15: Due Care and Due Diligence

**Objective:** To clarify the legal distinctions between due care and due diligence.

### I. Core Definitions (Legal Standards, Not Security Standards)

| Concept | Definition | Mnemonic |
| :--- | :--- | :--- |
| **Due Care** | Reasonable effort to prevent harm to individuals or assets. The "prudent person rule." | **Do / Protect** |
| **Due Diligence** | Activities used to ensure compliance with due care; ongoing assessment and evaluation. | **Do / Maintain** |

### II. The Workflow (How They Interact)
1.  **Requirement:** A need arises (e.g., protect patient data).
2.  **Due Diligence (Research):** Investigate the requirement and potential solutions.
3.  **Due Care (Implementation):** Implement the solution to meet the requirement.
4.  **Due Diligence (Maintenance):** Continuously maintain and assess the implementation.

### III. Legal Implications
- These are the **legal and ethical standards** used to determine liability in a court of law after a data breach.

---

## Video V16: Key Laws and Regulations (GDPR, HIPAA, PCI DSS)

**Objective:** To cover the major laws and regulations for the CISSP exam.

### I. Major US Laws
| Law | Focus |
| :--- | :--- |
| **FTC Act** | Protects consumers from unfair practices; includes PII protection |
| **GLBA** | Safeguards financial data; no sharing without consent |
| **Electronic Communications Privacy Act** | Defines collection of electronic comms; limits US government access |
| **HIPAA** | Federal requirements for health info (patient records) |
| **HITECH** | Mandates PHI protection; enforces HIPAA rules |
| **GINA** | Protects genetic information |
| **SOX** | Prevents accounting fraud; financial transparency for investors |

### II. Industry Standard: PCI DSS
- **Status:** Not a law, but a contractual agreement treated like a regulation in court.
- **12 High-Level Requirements:** Firewall, change defaults, protect stored data, encrypt transmissions, anti-malware, secure systems, restrict access by need-to-know, strong authentication, restrict physical access, track/monitor access, test security, maintain policy.

### III. EU Regulation: GDPR
- **Key Roles:**
    - **Controller:** Determines purpose and means of processing personal data.
    - **Processor:** Does the work on behalf of the controller.
- **Subject Rights:** Access, Rectification, Erasure (Right to be Forgotten), Restriction, Data Portability, Object.

---

## Video V17: Licensing and Property Rights (Intellectual Property)

**Objective:** To explain the different types of intellectual property protection.

### I. Types of IP Protection
| Type | Definition | Examples |
| :--- | :--- | :--- |
| **Patent** | Exclusive right to an invention | Unique software code, hardware components |
| **Trademark** | Identifies unique brand | Company names, logos, slogans |
| **Copyright** | Rights for artistic work | Books, music, videos, photos (Life + 70 years in US) |
| **Trade Secret** | Secret method for competitive advantage | Formulas, processes, initial designs |
| **Licensing** | Legal terms of use agreement | Perpetual license, EULA, Creative Commons |

### II. Threats & International Protection
- **Corporate Espionage:** Secretly acquiring protected information.
- **International Protection:** WIPO (technical assistance) and WTO (legal processes).

---

## Video V18: Export and Import Controls (EXIM / Wassenaar Arrangement)

**Objective:** To explain export/import controls and transborder data flow.

### I. Purpose
- To prevent trade secrets, controlled technologies, and sensitive data from reaching unauthorized countries.

### II. The Wassenaar Arrangement
- **Focus:** Export controls for conventional arms and **dual-use goods and technologies**.
- **Key for CISSP:** **Category 5** (Telecommunications and Information Security), focusing on **cryptography and cyber weapons**.
- **Participants:** 42 participating states.

### III. Transborder Data Flow
- **Data Localization:** Data must be processed and stored within a specific country's borders.
- **Data Trading:** Buying and selling data creates compliance responsibilities.

---

## Video V19: Cyber Crimes and Data Breaches

**Objective:** To explain cyber crimes, threat actors, and attack types.

### I. Core Concepts
| Concept | Definition |
| :--- | :--- |
| **Cyber Crime** | Criminal act carried out using a computing device |
| **Data Breach** | Information accessed without authorization (can be local) |

### II. Threat Actors
| Actor | Description |
| :--- | :--- |
| **Attacker** | General term for anyone trying to disrupt or gain unauthorized access |
| **Hacker** | Uses computing devices to carry out attacks |
| **Script Kiddies** | Unskilled hackers using pre-configured tools |
| **Insider Threat** | Organizational personnel with internal access |
| **State Actors** | Attackers acting on behalf of a government (cyber warfare) |

### III. Types of Cyber Crimes
| Crime Type | Focus | Examples |
| :--- | :--- | :--- |
| **Disruption Crimes** | Target availability | DoS/DDoS, DNS poisoning |
| **Destruction Crimes** | Destroy assets | Terrorism, sanitization (erasing data) |
| **Hacktivism** | Ideological/political motives | Website defacement, doxxing |

---

## Video V20: Determining Compliance Requirements

**Objective:** To explain why compliance matters for security professionals.

### I. Core Responsibility
- Determine compliance requirements related to contracts, legal matters, industry standards, and regulatory mandates.

### II. Consequences of Failure
- **Civil Penalties:** Monetary fines, costs, lawsuits.
- **Criminal Penalties:** Imprisonment and other legal actions.

### III. Key Takeaway
- Laws and regulations apply to **every industry**.
- Security professionals must understand the **requirements** and the **reasons** for being compliant.

---

## Video V21: Security Policies, Standards, Procedures, and Guidelines

**Objective:** To explain the hierarchy of security compliance artifacts.

### I. The Documentation Hierarchy (Correct Order of Creation)

| Artifact | The "..." | Description |
| :--- | :--- | :--- |
| **Policy** | The "Why" | High-level mandate; originates from laws/regulations |
| **Standard** | The "What" | Consistent set of requirements to comply with the policy |
| **Guideline** | The "Recommendation" | Best practice advice for undefined situations (optional) |
| **Procedure** | The "How" | Step-by-step instructions to implement the standard |
| **Baseline** | The "Minimum" | Result of implementation; uniform template for future builds |

### II. Types of Policies (CISSP Focus)
| Policy Type | Description |
| :--- | :--- |
| **Organizational Policy** | Defines goals, objectives, and roles/responsibilities |
| **Issue-Specific Policy** | Direction on specific issues (e.g., incident response) |
| **System-Specific Policy** | Specific to devices or components (e.g., BYOD, IoT) |

### III. Document Management
- Use consistent templates and trusted industry resources.
- Review regularly (due diligence); policies change rarely, standards/procedures change often.
- Formal process for waivers/exceptions; risk must be reviewed by stakeholders.

---

## Session Summary
Session 3 covers the **legal, regulatory, and governance framework** for information security. Key takeaways include:
1.  **Due Care** (protect) vs. **Due Diligence** (maintain) as legal standards.
2.  Key laws: **GDPR, HIPAA, PCI DSS, SOX, GLBA**.
3.  **Intellectual Property** protections: Patents, Trademarks, Copyrights, Trade Secrets.
4.  **Wassenaar Arrangement** Category 5 (cryptography and cyber weapons).
5.  **Cyber crimes**: Disruption, destruction, and hacktivism.
6.  The documentation hierarchy: **Policy → Standard → Guideline → Procedure → Baseline**.
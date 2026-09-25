# Session 9: Secure Design Principles

## Overview
This session covers the foundational concepts of secure system design, including design principles, zero trust architecture, privacy by design, system security capabilities, and security models. It consists of 9 videos (V58–V66).

---

## Video V58 (Outline): Secure Design Principles (Section Intro)

**Objective:** To introduce the key topics in secure design principles for the CISSP exam.

### Topics Covered in this Session
1.  Understanding Secure Design (Subjects, Objects)
2.  Secure Design Principles (Saltzer & Schroeder)
3.  Zero Trust Architecture (NIST SP 800-207)
4.  Privacy by Design (7 Foundational Principles)
5.  System Security Capabilities (TPM, HSM)
6.  Security Models (Concepts: Lattice, State Machine)
7.  Security Models (Bell-LaPadula, Biba, Take-Grant)
8.  Security Models (Clark-Wilson, Brewer-Nash, etc.)

---

## Video V59: Understanding Secure Design (Subjects, Objects)

**Objective:** To explain the core concepts of secure design.

### I. Core Purpose
- Select and build security controls into a system to reduce security risk to an acceptable level.

### II. Foundational Terms

| Term | Definition | Examples |
| :--- | :--- | :--- |
| **Subject** | Active entity (user or system process) | User, application, script |
| **Object** | Passive system resource | File, folder, service, CPU, storage |

### III. System Design Types

| Type | Characteristics | Pros / Cons |
| :--- | :--- | :--- |
| **Closed System** | Single vendor (lock-in), proprietary products, security through obscurity | Easier to manage; harder to integrate, harder to assess vulnerabilities |
| **Open System** | Industry standards, multiple vendors, open-source software | More flexible integration; slower patches |

### IV. Trust Concepts

| Concept | Description |
| :--- | :--- |
| **Transitive Trust** | Trust inherited without verification (dangerous outside internal networks) |
| **Trusted System** | All controls work together to create a secure environment |
| **Assurance** | Confidence that controls will work (validation via testing/audit) |

### V. Isolation Concepts
- **Confinement (Sandboxing):** Restrict software to isolated environment.
- **Bounds:** Limit resources (memory, CPU) a process can access.
- **Isolation:** Complete separation from the OS (e.g., virtual machines).

---

## Video V60: Secure Design Principles (Saltzer & Schroeder)

**Objective:** To explain Saltzer and Schroeder's 10 design principles.

### I. The Eight Core Principles

| # | Principle | Description |
| :--- | :--- | :--- |
| 1 | **Economy of Mechanism** | Keep the system design simple and small |
| 2 | **Fail-Safe Defaults** | Fail closed (deny by default, permit by exception) |
| 3 | **Complete Mediation** | Authorize every access, every single time |
| 4 | **Open Design** | No security through obscurity; keep keys secret, not design |
| 5 | **Separation of Privilege** | Require two or more conditions/subjects for sensitive access |
| 6 | **Least Privilege** | Grant only the minimum permissions necessary |
| 7 | **Least Common Mechanism** | Limit shared components to avoid transitive trust |
| 8 | **Psychological Acceptability** | Security should be easy to use (good UX) |

### II. Two Suggested Principles

| # | Principle | Description |
| :--- | :--- | :--- |
| 9 | **Work Factor** | Compare cost to defeat a control vs. value of the asset |
| 10 | **Compromise Recording** | Use detection mechanisms (audit logs, IDS, honeypots) |

---

## Video V61: Zero Trust Architecture (NIST SP 800-207)

**Objective:** To explain zero trust principles and components.

### I. Core Philosophy
- **"Never trust, always verify."** No implicit trust, even inside the network.

### II. Trust but Verify vs. Zero Trust

| Concept | Description |
| :--- | :--- |
| **Trust but Verify** | Inherits initial trust; verifies after access is partially granted |
| **Zero Trust** | No assumption of trust; per-request authentication and authorization |

### III. Key Principles (NIST SP 800-207)

**System-Focused (7 principles):**
- All data sources are resources
- Secure all communication (even inside the network)
- Per-session access
- Dynamic policies (behavioral/environmental attributes)
- Monitor integrity and security posture
- Strict enforcement before access
- Collect as much data as possible

**Network-Focused (6 principles):**
- No private network trust (IPs can be spoofed)
- Devices may not be owned by the enterprise (BYOD)
- No resource is inherently trusted
- Not all resources are enterprise-owned (cloud)
- Remote subjects cannot trust local network connection
- Consistent security policy across on-prem and cloud

### IV. Core Components

| Component | Function |
| :--- | :--- |
| **Policy Engine (PE)** | Makes logical decisions (approve/deny) |
| **Policy Administrator (PA)** | Handles authentication and authorization; creates tokens |
| **Policy Enforcement Point (PEP)** | Brokers the connection between subject and resource |

### V. Shared Responsibility
- Reducing organizational responsibility by **inheriting or sharing controls** (most common in cloud deployments).

---

## Video V62: Privacy by Design (7 Foundational Principles)

**Objective:** To explain the 7 principles of Privacy by Design.

### I. The Seven Principles

| # | Principle | Description |
| :--- | :--- | :--- |
| 1 | **Proactive, Not Reactive** | Anticipate and prevent privacy-invasive events before they happen |
| 2 | **Privacy as the Default Setting** | Personal data is automatically protected; collect only what is needed |
| 3 | **Privacy Embedded into Design** | Privacy is a core component of the system, not an add-on |
| 4 | **Full Functionality (Positive-Sum)** | Privacy measures should not impede the organization's mission |
| 5 | **End-to-End Security** | Protect data throughout its entire lifecycle (creation to destruction) |
| 6 | **Visibility and Transparency** | Keep system operations visible and transparent to build trust |
| 7 | **Respect for User Privacy** | Keep the system user-centric; obtain explicit consent |

---

## Video V63: System Security Capabilities (TPM, HSM)

**Objective:** To explain built-in system security capabilities.

### I. Memory Protection
- Prevents active processes in memory from interacting with each other (process isolation).

### II. Virtualization
- Emulating software-based versions of physical devices (servers, networks).
- **Capabilities:** Isolated environments, centralized control, scalability, faster recovery.

### III. Restricted/Constrained Interfaces
- User interfaces that limit access based on privilege levels (implements least privilege).

### IV. Trusted Platform Module (TPM)
- **Definition:** Specialized cryptographic chip on a motherboard (ISO 11889).
- **Key Components:**
    - **Endorsement Key (EK):** Persistent, burned in by manufacturer
    - **Storage Root Key (SRK):** Secures keys in TPM memory
    - **Platform Configuration Registers (PCR):** Tracks software state
    - **Attestation Identity Key (AIK):** Authenticates the TPM

### V. Hardware Security Module (HSM)
- **Definition:** Standalone cryptographic appliance (hardware-based).
- **Purpose:** Provides encryption and decryption services over an interface.
- **Includes:** Smart cards (for MFA, financial transactions).

---

## Video V64: Security Models (Concepts: Lattice, State Machine)

**Objective:** To explain the fundamental concepts of security models.

### I. What is a Security Model?
- A **conceptual idea** (not a specific implementation) for enforcing security policy.
- Provides a framework to map security requirements to system architecture.

### II. Key Foundational Concepts (from TCSEC/"Orange Book")

| Concept | Description |
| :--- | :--- |
| **Trusted Computing Base (TCB)** | All components that enforce security policy |
| **Security Perimeter** | Boundary between trusted (TCB) and untrusted |
| **Reference Monitor** | Mediates all access requests between subjects and objects |
| **Security Kernel** | TCB + Reference Monitor (the implementation) |
| **Trusted Path** | Communication channel that cannot be compromised |
| **Finite State Machine** | System checks if a state transition is authorized before allowing it |
| **Lattice Model** | Fixed security levels; subject must have clearance ≥ object label |

---

## Video V65: Security Models (Bell-LaPadula, Biba, Take-Grant)

**Objective:** To explain the first set of specific security models.

### I. Bell-LaPadula Model
- **Focus:** **Confidentiality** (prevent unauthorized reading)
- **Core Rule:** "No read up, no write down"

| Property | Rule |
| :--- | :--- |
| **Simple Security Property** | No read up (subject cannot read data at a higher level) |
| **Star Property (* Property)** | No write down (subject cannot write data to a lower level) |

### II. Biba Model
- **Focus:** **Integrity** (prevent unauthorized modification)
- **Core Rule:** "No read down, no write up"

| Axiom | Rule |
| :--- | :--- |
| **Simple Integrity Axiom** | No read down (subject cannot read data at a lower integrity level) |
| **Star Integrity Axiom** | No write up (subject cannot write data to a higher integrity level) |

### III. Take-Grant Model
- **Focus:** How rights/permissions are passed between subjects and objects (transitive trust).
- **Rules:** Take, Grant, Create, Remove.

---

## Video V66: Security Models (Clark-Wilson, Brewer-Nash, etc.)

**Objective:** To explain the second set of specific security models.

### I. Clark-Wilson Model
- **Focus:** **Data Integrity** (financial, medical, accounting sectors)
- **Key Components:**
    - **CDI (Constrained Data Item):** Data requiring protection
    - **UDI (Unconstrained Data Item):** Data not requiring protection
    - **TP (Transformation Procedure):** Permitted process to modify a CDI
    - **IVP (Integrity Verification Procedure):** Rules that validate integrity
- **Mechanisms:** Access triple (subject → program → object), well-formed transactions, separation of duties.

### II. Brewer and Nash Model (Chinese Wall / Ethical Wall)
- **Focus:** Prevents **conflict of interest** information flow.
- **Example:** An auditor cannot access data from two competing companies.

### III. Graham-Denning Model
- **Focus:** Secure interaction between subjects and objects using an **access control matrix**.
- **Eight Protection Rules:** Creation, deletion, and secure transfer of access rights (read, delete, grant, transfer).

### IV. Sutherland Model (Nondeducibility Model)
- **Focus:** Integrity and prevention of **covert channels**.
- **Nature:** Information flow model + state machine model; based on defining system states (initial and transition) between high-level and low-level objects.

---

## Session Summary
Session 9 covers the **complete secure design landscape** for the CISSP exam. Key takeaways include:
1.  **Saltzer & Schroeder's 10 principles:** Economy of mechanism, fail-safe defaults, complete mediation, open design, separation of privilege, least privilege, least common mechanism, psychological acceptability, work factor, compromise recording.
2.  **Zero Trust Architecture:** "Never trust, always verify"; Policy Engine, Administrator, and Enforcement Point (PEP).
3.  **Privacy by Design:** 7 principles (proactive, default, embedded, full functionality, end-to-end, transparency, user-centric).
4.  **System Security Capabilities:** Memory protection, virtualization, TPM, HSM.
5.  **Security Models:**
    - **Bell-LaPadula:** Confidentiality ("no read up, no write down")
    - **Biba:** Integrity ("no read down, no write up")
    - **Clark-Wilson:** Data integrity (CDI, UDI, TP, IVP)
    - **Brewer-Nash:** Conflict of interest prevention
    - **Take-Grant, Graham-Denning, Sutherland**
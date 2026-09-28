# Session 24: Access and Authorization (CISSP Objectives 5.1, 5.2, 5.4)

**Videos:** V174 – V179  
**Core Focus:** Accountability, access authorization (permissions, rights, privileges, implicit deny, access control matrix, capability table), controlling logical access (subjects, objects), session management (timeouts, session hijacking, fixation), and password attacks (brute force, dictionary, spraying, credential stuffing, birthday attacks).

---

## Video V174 (Outline): Access and Authorization (Section Intro)

**Objective:** To introduce the key topics in access and authorization for the CISSP exam.

### Topics Covered in this Session
1.  Accountability (logging, auditing, non-repudiation)
2.  Access Authorization (permissions, rights, privileges, implicit deny, access control matrix, capability table)
3.  Controlling Logical Access (subjects, objects, CIA triad)
4.  Session Management (timeouts, screensavers, session hijacking, fixation)
5.  Password Attacks (brute force, dictionary, spraying, credential stuffing, birthday attacks)

---

## Video V175: Accountability

**Objective:** To explain accountability, its relationship to non-repudiation, and implementation methods.

### I. Definition
- **Accountability:** Ensuring subjects are held responsible for their actions on a system
- Involves knowing *what*, *when*, *why*, *how*, and *where* a subject acted, and being able to **prove it**

### II. Relationship to Non-Repudiation
- Proper accountability supports **non-repudiation**
- Strong authentication (e.g., multi-factor) proves a subject committed an action so they **cannot deny it**

### III. Examples of Accountability Scenarios
- Accessing/reading sensitive files (checks if access was authorized)
- Modifying directory/folder permissions (can violate availability)
- Destroying sensitive data (another availability violation)
- Creating system accounts (e.g., rogue admin violating policy)

### IV. How to Implement Accountability

| Method | Description |
| :--- | :--- |
| **Enable system logging** | Audit all subject actions across platforms |
| **Protect log data** | Prevent tampering or destruction (use least privilege) |
| **Use strong access controls & authentication** | Prevent unauthorized access to protected objects |

### V. Exam Takeaways
- Understand the concept of accountability: tracking, proving, and enforcing responsibility for actions
- Accountability helps uncover design errors and enforce security policies

---

## Video V176: Access Authorization

**Objective:** To explain authorization concepts, key terms, and core principles.

### I. Definition of Authorization
- **Authorization** = granting an *authorized subject* access to an *object*
- The system decides if a subject is allowed to access a resource (file, VM, network interface, etc.)

### II. Key Terms

| Term | Definition |
| :--- | :--- |
| **Permissions** | Subject's ability to access an object (read/write), applies to objects |
| **Rights** | Subject's ability to conduct authorized actions (modify user account, change config) |
| **Privileges** | Combination of rights + permissions |

### III. Core Concepts in Authorization

| Concept | Description |
| :--- | :--- |
| **Implicit Deny** | Deny by default; access only if explicitly authorized |
| **Access Control Matrix** | Lists subjects, objects, and access privileges; focused on the **object** |
| **Capability Table** | Lists subject, objects, and privileges; focused on the **subject's capabilities** |
| **Constrained Interface** | Restricts actions based on privilege level (e.g., non-admin users see fewer options) |
| **Content-Dependent Controls** | Limit access based on the **type/content** of the object |
| **Context-Dependent Controls** | Require a **preceding action** before granting access |

### IV. Security Perspective: Object vs. Subject Focus
- **Sensitive data** → focus on **object** (use Access Control Matrix)
- **Public/non-sensitive data** → focus on **subject** (use Capability Table)

### V. Three Key Principles Enforced by Authorization

| Principle | Description |
| :--- | :--- |
| **Separation of Duties** | Divide critical tasks among multiple people to prevent excessive power |
| **Least Privilege** | Give only the privileges necessary to perform a job |
| **Need to Know** | Grant access only to information required for duties (data owner decides; related to DAC) |

### VI. Exam Takeaways
- Know the **definition** and **key terms** of authorization
- Understand the **concepts** (implicit deny, access matrix, capability table, constrained interface, content/context controls)
- Link back to **separation of duties, least privilege, and need to know**

---

## Video V177: Controlling Logical Access

**Objective:** To explain logical access, subjects, objects, and the CIA triad.

### I. Definition of Access
- Privileges to open, modify, execute, or interact with data/resources
- Tied directly to the **CIA triad** (Confidentiality, Integrity, Availability)

### II. Key Assets to Protect

| Asset Type | Examples |
| :--- | :--- |
| **Information** | Documents, files |
| **Systems** | Hardware/software performing functions |
| **Devices** | Servers, IoT, mobiles, printers |
| **Facilities** | Data centers, equipment rooms, offices |
| **Applications** | Programs for specific functions |

### III. Foundational Concepts: Subjects & Objects

| Term | Description |
| :--- | :--- |
| **Subject** | Active entity that accesses something (user, program, script, process, service) |
| **Object** | Passive entity that provides information/resources (data, website, file) |

> **Critical note:** Roles are interchangeable (e.g., a website can be a subject when requesting from a server, then an object when serving a user)

### IV. Purpose of Controlling Access
- Prevent unauthorized:
  - Disclosure (breaks confidentiality)
  - Alteration (breaks integrity)
  - Deletion (breaks availability)

### V. Exam Takeaways
- Know definitions of *access*, *subject*, and *object*
- Understand *why* access control is implemented

---

## Video V178: Session Management

**Objective:** To explain session management, timeouts, session attacks (hijacking, fixation), and defenses.

### I. Definition of a Session
- A connection and exchange between two entities (e.g., user–computer, computer–application)
- Sessions have **IDs** that bind a user's credentials to the active session

### II. Session Management Scope
- **Initiation**, **management**, and **proper termination** of sessions
- Risk: closing a browser or stepping away does **not** always terminate a session → possible **session hijacking**

### III. Key Security Control: Session Timeouts
- Closes a session after a set period of **inactivity**
- Requires **re-authentication** to resume
- Typical timeout: **5–15 minutes** (depends on org policy or industry regs)
- Applied to endpoints and network devices

### IV. Screensavers as a Session Protection Tool
- Activates after inactivity (e.g., 5 min)
- Hides on-screen sensitive data
- Requires **authentication to dismiss** and resume session

### V. Session Attacks

| Attack | Description |
| :--- | :--- |
| **Session Hijacking (Sidejacking)** | Attacker steals session token/cookie (e.g., over unsecured wireless) → man-in-the-middle attack |
| **Session Fixation** | Attacker plants an unsecure token on victim's browser → later uses it for a **replay attack** |

### VI. Defenses Against Session Attacks

| Defense | Description |
| :--- | :--- |
| **Encrypt session traffic** | Prevent sniffing/eavesdropping |
| **Configure timeouts** | For all access types (console, remote, web) |
| **Include logout features** | Visible and easy to use → invalidates tokens/credentials |
| **Enforce account lockouts** | After 3–5 failed attempts → blocks brute force |
| **Limit simultaneous/concurrent sessions** | Typically 1–3 → prevents replay and DoS/DDoS |

### VII. Exam Takeaways
- Know **how to manage sessions** (initiation, active control, termination)
- Recognize **session attacks** (hijacking, fixation, replay)
- Apply **security considerations** (timeouts, encryption, lockouts, concurrency limits)

---

## Video V179: Password Attacks

**Objective:** To explain password attack types, tools, and defenses.

### I. Introduction & Context
- Password = secret credential (something you know) used to authenticate an identity (username)
- **Cognitive password:** answers to security questions (pet's name, birthplace) used in self-service password reset

### II. Password Attack Types

| Attack | Description |
| :--- | :--- |
| **Brute-force attack** | Attempt every possible character combination (umbrella category) |
| **Dictionary attack** | Uses a file of common words, known passwords, or decrypted passwords |
| **Password spraying** | Single password tried against many different usernames (avoids account lockout) |
| **Credential stuffing** | Automated injection of stolen username/password pairs into login forms |
| **Birthday attack** | Exploits hash collisions (birthday paradox) to find matching hashes from different inputs |
| **Social engineering** | Tricking user into revealing password (e.g., impersonating admin/manager) |

### III. Password Cracking Tools

| Tool | Focus |
| :--- | :--- |
| Cain & Abel | Windows credentials |
| John the Ripper | Windows, Unix, Linux |
| Mimikatz | Windows |
| Hashcat | Multi-platform |
| Aircrack | Wireless (WEP/WPA) |
| Hydra | Network services (HTTP, HTTPS, FTP, etc.) |
| RainbowCrack / L0phtCrack / OphCrack | Windows credentials |

### IV. Defenses Against Password Attacks

| Defense | Description |
| :--- | :--- |
| **Strong, complex passwords** | Minimum: 1 uppercase, 1 lowercase, 1 number, 1 special character; longer = harder to crack |
| **Minimum & maximum password age** | Prevents reuse, forces regular changes |
| **Password history** | Prevents reuse of old/compromised passwords |
| **Account lockouts** | After failed attempts (e.g., 3-5) |
| **Regulatory awareness** | FISMA, HIPAA, PCI DSS requirements |

### V. Exam Takeaways
- Know each attack type
- Understand password management techniques

---

## Session 24 Summary

Session 24 covers the **complete access and authorization landscape** for the CISSP exam (Objectives 5.1, 5.2, 5.4). Key takeaways include:

1. **Accountability (V175):** Ensures subjects are held responsible for actions; supports non-repudiation. Implementation: logging, protecting log data, strong access controls.

2. **Access Authorization (V176):** Permissions (object access), rights (authorized actions), privileges (combination). Core concepts: implicit deny, access control matrix (object-focused), capability table (subject-focused), constrained interface. Three principles: separation of duties, least privilege, need to know.

3. **Controlling Logical Access (V177):** Subject (active entity) vs. Object (passive entity). Purpose: prevent unauthorized disclosure, alteration, deletion (CIA triad).

4. **Session Management (V178):** Timeouts (5-15 min inactivity), screensavers. Attacks: session hijacking (MITM, steal token), session fixation (plant token, replay). Defenses: encryption, timeouts, logout features, account lockouts, limit concurrent sessions.

5. **Password Attacks (V179):** Brute force (all combinations), dictionary (common words), spraying (same password, many usernames), credential stuffing (stolen credentials), birthday attack (hash collisions), social engineering. Defenses: strong complex passwords, password age/history, account lockouts.

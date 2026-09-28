# Session 23: Authentication Mechanisms (CISSP Objectives 5.2, 5.4, 5.6)

**Videos:** V163 – V173  
**Core Focus:** Authentication systems (LDAP, RADIUS, TACACS+, Diameter), authentication factors (SFA, 2FA, MFA), biometrics (types, errors, CER), Single Sign-On (SSO), OAuth/OIDC, Kerberos, credential management systems, just-in-time (JIT) access, and access control models (DAC, MAC, RBAC, ABAC, rule-based, risk-based).

---

## Video V163 (Outline): Authentication Mechanisms (Section Intro)

**Objective:** To introduce the key topics in authentication mechanisms for the CISSP exam.

### Topics Covered in this Session
1.  Authentication Systems (LDAP, RADIUS, TACACS+, Diameter)
2.  Authentication Factors (SFA, 2FA, MFA, Type 1/2/3)
3.  Biometric Authentication (physiological, behavioral, errors, CER)
4.  Single Sign-On (SSO, Kerberos, SAML, OpenID)
5.  OAuth and OpenID Connect (OIDC)
6.  Kerberos (ticket-based, KDC, TGT, silver ticket)
7.  Credential Management Systems (password managers)
8.  Just-In-Time (JIT) Access (ephemeral accounts, temporary elevation)
9.  Access Control Models – Part 1 (DAC, MAC, rule-based)
10. Access Control Models – Part 2 (RBAC, ABAC, risk-based)

---

## Video V164: Authentication Systems

**Objective:** To explain directory services, LDAP, and AAA protocols (RADIUS, TACACS+, Diameter).

### I. Definition & Purpose
- **Authentication system:** Stores subject identity + authentication credentials
- Two deployment models:
  - **Centralized** (single point, e.g., LDAP, Active Directory)
  - **Decentralized** (local, multiple points)

### II. Directory Services
- Database managing identification, authentication, authorization, access control
- **X.500** – standard directory service (1988, ITU), parent-child tree structure
- **DAP** (Directory Access Protocol, X.511) – predecessor to LDAP

### III. Key Protocols for Exam

| Protocol | Description | Ports | Security |
| :--- | :--- | :--- | :--- |
| **LDAP** | Open standard, vendor neutral, IP-based | 389 (unsecure), 636 (secure, LDAPS) | Port 389 sends credentials in cleartext |
| **DNS** | Domain Name System – also a directory service | 53 | N/A |
| **NIS** | Network Information Service – older, rarely used | N/A | Legacy |

### IV. LDAP Data Formats (LDIF)

| Field | Description |
| :--- | :--- |
| **DN (Distinguished Name)** | Unique identifier for the subject |
| **CN (Common Name)** | Subject name (username or full name) |
| **DC (Domain Component)** | Domain name (e.g., diontraining) |
| **OU (Organizational Unit)** | Groups/departments (e.g., Security) |

### V. AAA (Authentication, Authorization, Accounting)

**Five elements:** Identification, Authentication, Authorization, Auditing, Accounting

### VI. AAA Protocols

| Protocol | Port(s) | Encryption | Best for |
| :--- | :--- | :--- | :--- |
| **RADIUS** | 1812/UDP (auth), 1813/UDP (acct) | Password only (session unencrypted) | Simple user/password auth |
| **TACACS+** | 49/TCP | Entire session encrypted | Complex auth + authorization |
| **Diameter** | 3868/TCP or SCTP | None natively (use IPsec/SSL/TLS) | Modern communications, flexible |

> **Diameter name origin:** IT joke – radius = half circle, diameter = full circle

### VII. Exam Takeaways
- Understand directory service purpose
- Know LDAP + LDIF fields
- Know RADIUS, TACACS+, Diameter differences

---

## Video V165: Authentication Factors

**Objective:** To explain single-factor, two-factor, and multi-factor authentication, and the three factor types.

### I. Core Definition
- **Authentication:** Validation of a claimed identity (e.g., username = identity, password = authentication)

### II. Primary Authentication Types (by number of factors)

| Type | Description | Also Called |
| :--- | :--- | :--- |
| **Single-Factor (SFA)** | Uses one factor (e.g., just password) | 1-to-1 authentication |
| **Two-Factor (2FA)** | Uses two different factors | Subset of MFA |
| **Multi-Factor (MFA)** | Uses multiple (2 or 3) factors | Often interchangeable with 2FA |

> **Exam Tip:** If both "two-factor" and "multi-factor" are answers, choose the **more specific** (2FA). If 2FA isn't an option, choose MFA.

### III. Three Main Factor Types

| Type | Category | Basis | Examples |
| :--- | :--- | :--- | :--- |
| **Type 1** | Something you know | Knowledge-based | Password, passphrase, PIN |
| **Type 2** | Something you have | Ownership-based | Smart card, token, ID badge, OTP device |
| **Type 3** | Something you are | Biometric-based | Iris/retina scan, fingerprint, palm scan |

### IV. Context-Based Authentication
- **Something you do** (behavioral biometrics): speech patterns, signature dynamics, keystroke dynamics
- **Somewhere you are** (geolocation via IP address)
- **Device/network in use** (MAC address, IP address)
- Can **replace** password-based authentication in some cases

### V. Exam Takeaways
- Understand the difference between single, two, and multi-factor
- Know examples of each factor type
- Recognize that context-aware authentication can be used instead of passwords

---

## Video V166: Biometric Authentication

**Objective:** To explain biometric authentication types, errors, and the Crossover Error Rate (CER).

### I. Definition & Purpose
- Validates a claimed identity using **genetic or behavioral data**
- Commonly used in **multi-factor authentication** (alongside Type 1 or Type 2)

### II. Two Main Categories of Biometrics

| Category | Examples |
| :--- | :--- |
| **Physiological (Physical)** | Fingerprint scans, palm scans, retina scans (most accurate), iris scans, hand geometry, facial recognition |
| **Behavioral** | Signature dynamics, keystroke dynamics, voice pattern recognition, heart rate pattern |

### III. Biometric System Errors

| Error | Name | Description |
| :--- | :--- | :--- |
| **Type I Error** | False Rejection Rate (FRR) | Authorized user rejected → **failure** |
| **Type II Error** | False Acceptance Rate (FAR) | Unauthorized user accepted → **violation** |

### IV. Crossover Error Rate (CER)
- Also called **Equal Error Rate (EER)**
- Point where **FRR = FAR**
- Lower CER = more accurate system
- High-security systems may accept more Type I errors to reduce Type II errors

### V. Enrollment Process
- Collect biometric data → store as **hash values**
- Enrollment should take **≤ 2 minutes** for user acceptance
- Privacy concerns: biometric data may be **Protected Health Information (PHI)** → needs security controls

### VI. Exam Takeaways
- Purpose of biometrics
- Physiological vs. behavioral attributes
- Type I (FRR) vs. Type II (FAR) errors
- Crossover/Equal Error Rate (CER/EER)
- Privacy concerns with biometric data

---

## Video V167: Single Sign-On (SSO)

**Objective:** To explain SSO concepts, drawbacks, and methods (Kerberos, SAML, OpenID, OIDC).

### I. Definition & Core Purpose
- **Concept:** A single set of credentials used to identify and authenticate a subject across multiple systems
- **Mechanism:** User authenticates once to an SSO service, which generates a token passed to other apps
- **Key Benefit:** Reduces password fatigue and the security risk of users writing down multiple passwords

### II. How SSO Works (Process Flow)
1.  Subject authenticates to the **SSO service**
2.  SSO service creates an **authentication token**
3.  Token is passed to each target app (represents user's identity/credentials)
4.  App grants access based on token

### III. Drawbacks & Risks

| Risk | Description |
| :--- | :--- |
| **Single Point of Failure (Security)** | Compromised credentials/token gives attacker access to all SSO-enabled systems |
| **Technology Compatibility** | Different technologies may not integrate well (e.g., Kerberos primarily for Windows) |
| **Cost** | Can be expensive for large organizations |
| **High-Value Target** | All credentials/tokens stored in one location (SSO server) |

### IV. Key SSO Methods & Technologies

| Technology | Description | Primary Use Case |
| :--- | :--- | :--- |
| **Kerberos** | Ticket-based authentication service | Windows domain authentication |
| **SAML** | Open standard for exchanging authn/authz info | Web-based SSO (browsers) |
| **OpenID** | Use existing account to sign into multiple websites | Consumer web SSO |
| **OpenID Connect (OIDC)** | Allows clients to receive info about authenticated sessions/users | Modern authentication layer on OAuth 2.0 |

### V. Exam Takeaways
- Understand the **purpose** (convenience, reduced password risk)
- Know the **drawbacks** (central target, lateral movement risk, cost, compatibility)
- Be able to **distinguish the different methods**

---

## Video V168: OAuth and OpenID Connect (OIDC)

**Objective:** To explain OAuth (authorization), OpenID (authentication), and OpenID Connect.

### I. OAuth (Open Standard for Authorization)
- **Purpose:** Delegates **authorization** to a third party without sharing authentication credentials
- **Key mechanism:** Uses **access tokens**
- **Specification:** RFC 6749 (OAuth 2.0); not backward compatible with OAuth 1.0
- **Core components:**
  - **Resource owner** (pre-defines who can access resources)
  - **Authorization server** (issues tokens after authorization is granted)
  - **Resource server** (provides protected resource after token is presented)

### II. OpenID (Open Standard for Authentication)
- **Purpose:** Provides **authentication** using a single set of credentials across multiple websites (SSO)
- **Mechanism:** Credentials maintained by a third-party OpenID provider
- **Example:** Using existing Google, Facebook, or LinkedIn credentials to log into another website

### III. OpenID Connect
- **Definition:** Identity layer built on top of **OAuth 2.0**
- **Technologies used:** REST, JSON, JSON Web Tokens (JWTs)
- **Big picture:** Directory service (LDAP, Active Directory) + OAuth 2.0 = OpenID Connect

### IV. Comparison

| Protocol | Purpose |
| :--- | :--- |
| **OAuth** | Authorization (delegated access) |
| **OpenID** | Authentication (SSO across websites) |
| **OpenID Connect** | Authentication + OAuth 2.0 |

### V. Exam Takeaways
- Know the difference: OAuth = Authorization, OpenID = Authentication, OpenID Connect = Authentication + OAuth 2.0
- No need for deep protocol details; focus on high-level roles and flow

---

## Video V169: Kerberos

**Objective:** To explain Kerberos components, ticket types, authentication flow, and Kerberoasting attack.

### I. Overview
- **Kerberos:** Ticket-based, single sign-on (SSO) system
- Developed by **MIT** (Project Athena, 1983–1991)
- **Version 5** is current
- Widely used, especially with **Windows / Active Directory**

### II. Core Components

| Component | Role |
| :--- | :--- |
| **KDC (Key Distribution Center)** | Trusted 3rd party; issues & stores secret session keys |
| **Authentication Server (AS)** | Authenticates subject's account; issues **TGT** |
| **Ticket Granting Service (TGS)** | Verifies TGT; issues **service tickets** & session keys |
| **Directory Service** (e.g., Active Directory) | Maintains account info (Kerberos references it) |

### III. Ticket Types

| Ticket | Also Called | Description |
| :--- | :--- | :--- |
| **TGT** | Golden Ticket | Evidence of authentication with KDC |
| **Service Ticket** | Silver Ticket | Encrypted evidence of authorization to an object |

### IV. How It Works (Authorization Flow)
1.  User authenticates to **AS** → AS verifies identity against directory service
2.  AS issues **TGT (Golden Ticket)**
3.  Client presents TGT to **TGS** → TGS issues **service ticket (Silver Ticket)** + session keys
4.  Client presents service ticket to **Kerberos-enabled service**
5.  Service checks with KDC → if valid, **session opens** (SSO achieved)

### V. Security & Encryption
- Uses **AES** for message encryption
- Requires **synchronized time source** (timestamps critical in KDC)

### VI. Risks / Vulnerabilities
- **Dictionary / brute force attacks** on passwords
- **KDC compromise** → system fails secure (all access denied)
- **Kerberoasting** – extracting password hashes from Active Directory to crack passwords and spoof identity

### VII. Exam Takeaways
- Concepts, risks, components, and authorization flow
- Know **Kerberoasting** attack

---

## Video V170: Credential Management Systems

**Objective:** To explain password managers (CMS) and their security considerations.

### I. Definition & Core Purpose
- **Synonym:** Password managers
- **Primary Function:** Store a subject's authentication credentials (usernames, passwords, account numbers, IDs, tokens, certificates, biometric info)

### II. Types & Examples
- **Standalone applications:** KeePass
- **Browser plugins:** LastPass, RoboForm
- **Endpoint security software:** Norton, Symantec, Kaspersky, Bitdefender
- **Risk management software (RMM):** Used for credentialed scans (Nessus, OpenVAS)
- **Built into operating systems:** Windows, Google

### III. Technical Mechanism
- Credentials stored in a **"vault"** – an encrypted area
- Encryption protects stored data

### IV. Security Considerations

| Consideration | Description |
| :--- | :--- |
| **Cryptography** | Use modern, compliant algorithms (e.g., AES, RSA) |
| **Acceptable Use Policy (AUP)** | Identify and list approved CMS applications; require user acknowledgment |
| **Master password** | Define strong, complex password requirements for accessing the vault |
| **Password scope** | Specify which passwords can and cannot be stored (e.g., admin/root/privileged accounts) |
| **Protection of related data** | Define security needs for CMS recovery keys, credential vault backups |

### V. Exam Takeaways
- Understand the **purpose** of CMS
- Know the **security considerations** associated with CMS

---

## Video V171: Just-In-Time (JIT) Access

**Objective:** To explain JIT access, ephemeral accounts, temporary elevation, and best practices.

### I. Purpose of JIT Access
- Reduce the **attack surface** (possible entry points for attackers)
- Main target of attackers: **privileged accounts** (root, admin, etc.)

### II. What JIT Access Does
- Provides **on-demand privileged access** for a **specific task**
- Typically requires **Privileged Access Management (PAM)**
- Eliminates **static privileged accounts** → reduces attack surface
- Enforces **least privilege**

### III. How JIT Works (Two Mechanisms)

| Mechanism | Description |
| :--- | :--- |
| **Ephemeral accounts** | Used once, then removed after use |
| **Temporary elevation** | Grants privileges temporarily (e.g., `sudo` in Linux), removed after time/session ends |

- Access often based on **role-based access control (RBAC)**

### IV. Best Practices for JIT

| Practice | Description |
| :--- | :--- |
| **Fine-grained access policies** | Define exactly which subjects access which objects and how |
| **Prefer temporary elevation** | Best for specific privileged commands |
| **Audit all privileged activity** | Monitor effectiveness, adjust policies, detect violations |

### V. Exam Takeaways
- Understand what JIT means
- Know the best practices

---

## Video V172: Access Control Models – Part 1

**Objective:** To explain Discretionary Access Control (DAC), Mandatory Access Control (MAC), and rule-based access control.

### I. Core Concept
- **Access control** = controlling how a *subject* interacts with an *object* (file, service, function)

### II. Two Main Approaches
- **Discretionary (DAC)** – Object owner decides access
- **Non-discretionary** – Predefined rules determine access

### III. Discretionary Access Control (DAC)
- **Basis:** Identity of the subject
- **Mechanism:** Access Control List (ACL) tracks subject privileges
- **Characteristics:** Wide flexibility, minimal overhead, owner has complete authority
- **Pros/Cons:** Easy, dynamic but weaker security (not fine-grained)

### IV. Mandatory Access Control (MAC) – Non-discretionary
- **Rule:** Owners do NOT set access; rules are predefined and centrally managed
- **Enforcement:** Security policies + labels (object sensitivity + subject clearance)
- **Labels:** Classification (e.g., Secret, Top Secret) + category (role/function)
- **Where used:** Highly sensitive environments (PII, PHI, national security)
- **Example:** Subject with "Secret" clearance → access to "Secret" object

### V. Rule-Based Access Control
- **Definition:** Controls interaction based on a set of rules/restrictions
- **Common deployments:** Firewalls, IPS, MAC systems
- **Example:** Firewall checks source, destination, protocol → grant or deny

### VI. Exam Takeaways
- Understand **DAC**, **MAC**, and **rule-based** access control models

---

## Video V173: Access Control Models – Part 2

**Objective:** To explain Role-Based Access Control (RBAC), Attribute-Based Access Control (ABAC), and risk-based access control.

### I. Role-Based Access Control (RBAC)
- **Definition:** Controls subject-object interaction based on **group membership/role**
- **Mechanism:** Subjects grouped by function (e.g., admin, engineer). Privileges assigned to the group/role
- **Benefits:** Enforces need-to-know and least privilege; reduces privilege creep; simplifies administration
- **Key Rule:** If label/category not defined → deny by default (fail safe/secure)

### II. Attribute-Based Access Control (ABAC)
- **Definition:** Controls access based on **attributes** (clearance, department, location, etc.)
- **Also Known As:** Policy-Based Access Control (PBAC)
- **Key Distinction from RBAC:** RBAC = focused on **subject** (roles/groups); ABAC = focused on **object attributes** (more flexible)
- **Standard:** eXtensible Access Control Markup Language (XACML)

**Example Attributes:**
- **Subject:** Role, clearance, organization
- **Action:** Read, write, execute
- **Object:** Sensitivity, owner, type
- **Environment:** Date, time, IP address, MAC address

### III. Risk-Based Access Control
- **Definition:** Controls access based on a **dynamic risk decision**
- **Risk Factors:** Device, network, geolocation, object sensitivity, behavior analytics, authentication method
- **Also Known As:** Risk-Adaptable Access Control
- **Example Logic:**
  - High risk → require multi-factor authentication (MFA)
  - Medium risk + single-factor + privileged access → deny
  - Untrusted IP/subnet → deny

### IV. Comparison Table

| Model | Focus | Basis |
| :--- | :--- | :--- |
| **DAC** | Object owner | Identity (ACL) |
| **MAC** | Labels/clearance | Security policy (non-discretionary) |
| **RBAC** | Subject (role/group) | Group membership |
| **ABAC** | Object attributes | Attributes (XACML) |
| **Rule-Based** | Rules/restrictions | Firewall rules, IPS |
| **Risk-Based** | Dynamic risk decision | Device, location, behavior |

### V. Exam Takeaways
- Understand RBAC, ABAC, and risk-based access control models

---

## Session 23 Summary

Session 23 covers the **complete authentication mechanisms landscape** for the CISSP exam (Objectives 5.2, 5.4, 5.6). Key takeaways include:

1. **Authentication Systems (V164):** LDAP (ports 389/636, LDIF fields: DN, CN, DC, OU); AAA protocols: RADIUS (UDP, password only), TACACS+ (TCP, full session encryption), Diameter (TCP/SCTP, flexible).

2. **Authentication Factors (V165):** SFA (Type 1: something you know), 2FA/MFA (add Type 2: something you have, Type 3: something you are). Context-based: location, device, behavior.

3. **Biometric Authentication (V166):** Physiological (fingerprint, retina, iris) vs. Behavioral (signature, keystroke, voice). Type I error (FRR – failure), Type II error (FAR – violation). CER/EER = point where FRR = FAR.

4. **Single Sign-On (V167):** SSO benefits (reduced password fatigue) and risks (central target). Methods: Kerberos (Windows, ticket-based), SAML (web-based), OpenID, OIDC.

5. **OAuth & OIDC (V168):** OAuth = authorization (delegated access with tokens). OpenID = authentication (SSO across websites). OIDC = authentication layer on OAuth 2.0.

6. **Kerberos (V169):** KDC (AS + TGS). Golden Ticket (TGT – evidence of authentication), Silver Ticket (service ticket – evidence of authorization). Attack: Kerberoasting (extract password hashes from AD).

7. **Credential Management Systems (V170):** Password managers (KeePass, LastPass). Security: modern crypto, strong master password, AUP, protect recovery keys.

8. **Just-In-Time Access (V171):** Ephemeral accounts (use once, remove) or temporary elevation (sudo). Reduces attack surface, enforces least privilege.

9. **Access Control Models – Part 1 (V172):** DAC (owner decides, ACL), MAC (labels/clearance, non-discretionary), rule-based (firewalls, IPS).

10. **Access Control Models – Part 2 (V173):** RBAC (group membership), ABAC (attributes, XACML), risk-based (dynamic risk decision – device, location, behavior).

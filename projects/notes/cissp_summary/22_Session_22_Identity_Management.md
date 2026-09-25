# Session 22: Identity Management (CISSP Objectives 5.2, 5.3, 5.5)

**Videos:** V157 – V162  
**Core Focus:** Establishing identity (registration, proofing, assurance levels), identity management (provisioning, deprovisioning, centralized vs. decentralized), federated identity management (SAML, SPML, XACML), delegated identity management (IDaaS), and the identity and access lifecycle (provisioning → review → revocation).

---

## Video V157 (Outline): Identity Management (Section Intro)

**Objective:** To introduce the key topics in identity management for the CISSP exam.

### Topics Covered in this Session
1.  Establishing Identity (registration, proofing, assurance levels)
2.  Identity Management (provisioning, centralized vs. decentralized)
3.  Federated Identity Management (FIM, SAML, SPML, XACML)
4.  Delegated Identity Management (IDaaS, on-prem/off-prem/hybrid)
5.  Identity and Access Lifecycle (provisioning → review → revocation)

---

## Video V158: Establishing Identity

**Objective:** To explain identity registration, proofing, and identity assurance levels (IAL).

### I. Core Concept: Identity
- **Identity:** A subject (person, computer, app, server) claiming to be who or what they are
- **Examples:** Hostnames, IP addresses, MAC addresses

### II. Key Components & Processes
- **Registration:** Creating an applicant's identity and adding it to an identification & authentication management system
- **Credential Service Provider (CSP):** Performs identity proofing (not to be confused with cloud service provider)
- **Identity Proofing:** Collects applicant's information & evidence → CSP confirms claimed identity based on an assurance level

### III. Identity Assurance Levels (IAL)

| Level | Description | Method | Example |
| :--- | :--- | :--- | :--- |
| **Level 1** | Self-asserted attributes (no verification) | Remote | Account on a training website |
| **Level 2** | Evidence required for real-world existence | Remote (preferred in person) | Guest user account (online form) |
| **Level 3** | Physical presence required | In person | System administrator account (may include background check) |

**Selection principle:** Balance time, money, effort with organizational policy. Higher privilege = higher level.

### IV. Identity Proofing Steps (Resolution → Validation → Verification)

| Step | Description |
| :--- | :--- |
| **Resolution** | Collect all attributes & supporting evidence; determine uniqueness |
| **Validation** | Authenticate, validate accuracy of evidence (e.g., via government IDs, authoritative sources) |
| **Verification** | Link claimed identity to real-life subject (e.g., match photo ID to person) |

**Post-verification:** Applicant becomes a subscriber/user, receives credentials, confirms enrollment.

### V. Key Considerations
- **Data Protection:** PII must be protected via security policies
- **Usability:** Each enrollment step must be clear, easy, and explain what data is collected, why, how it's protected, and who accesses it

### VI. Exam Takeaways
- All subjects must be registered for access
- Understand the identity proofing process
- Know the three identity assurance levels
- Protect PII data

---

## Video V159: Identity Management

**Objective:** To explain identity management concepts (provisioning, deprovisioning) and access control models (centralized vs. decentralized).

### I. Core Concepts

| Term | Definition |
| :--- | :--- |
| **Identity** | A subject's claim of who or what they are (applies to users, computers, hosts) |
| **Authentication** | Verification/confirmation of an identity's correctness |
| **Authorization** | Determination of whether a subject is permitted access to an object |
| **Access Controls** | Management of subject privileges to access objects |
| **Provisioning** | Creation of identity + authentication credentials for a subject |
| **Deprovisioning** | Removal or expiration of credentials/identity |

### II. Identity Management Methods

| Method | Description | Examples |
| :--- | :--- | :--- |
| **Centralized Access Control** | Single entity handles identification, authentication, and authorization | Active Directory, LDAP, RADIUS |
| **Decentralized Access Control** | Multiple entities perform identification, authentication, authorization; each host has local identity management | Local authentication |
| **Distributed Access Control (Hybrid)** | Primary: centralized authentication; backup: decentralized (local) for high-level accounts (admin/root) | Normal users → central; root/admin → local |

### III. Example Walkthrough (Website Access)
- **Identity:** Username (e.g., BSpencer)
- **Authentication:** Password (only known to user)
- **Access Control:** Group-based privileges (e.g., limited interaction, no modification rights)

### IV. Exam Takeaways
- Know definitions of identity, provisioning, deprovisioning, authentication, authorization, access controls
- Understand centralized vs. decentralized access control

---

## Video V160: Federated Identity Management (FIM)

**Objective:** To explain federated identity management and related protocols (SAML, SPML, XACML).

### I. Federated Identity Management (FIM) – Core Concept
- **Definition:** Enables multiple different technologies to use the same Single Sign-On (SSO) credentials
- **Key difference from SSO:**
  - SSO = same credentials across multiple apps/systems
  - FIM = same credentials across multiple technologies (including those with different dedicated methods)
- **How it works:** Digital identities created with attributes defining the subject, access, and authorization; digital identity can be used outside a single organization (e.g., across partner companies)

### II. Key Methods for FIM (Exam Focus)

| Protocol | Full Name | Purpose |
| :--- | :--- | :--- |
| **SAML** | Security Assertion Markup Language | Web-based SSO; exchanges authentication/authorization data; uses XML + SOAP |
| **SPML** | Service Provisioning Markup Language | Exchanges user, resource, and service provisioning information; automates identity creation |
| **XACML** | Extensible Access Control Markup Language | Enforces access control based on attributes of subject, resource, and action |

### III. SAML Components & Roles

| Component | Function |
| :--- | :--- |
| **Identity Provider (IdP)** | Authenticates the subject → provides identity info |
| **Service Provider (SP)** | Provides service/resource based on IdP's assurance |
| **Subject/Principal** | Requests access to service/resource |
| **Assertion** | IdP makes authentication, attribute, and authorization statements about the subject |
| **Bindings** | How SAML works with other protocols (SOAP, HTTP) |
| **Profile** | Assertions + protocols + bindings together |

### IV. Simple SAML Workflow
1.  Subject authenticates to **Service Provider**
2.  Service Provider verifies subject's identity with **Identity Provider**
3.  Identity Provider confirms identity
4.  Subject granted access
5.  First authentication = only time credentials needed → token passed for session

### V. Exam Takeaways
- **FIM** – understand the concept and cross-organizational identity sharing
- **SAML** – major focus: roles (IdP, SP, subject), assertions, bindings, protocols, profiles, and basic workflow
- **SPML & XACML** – know their basic purposes as listed above

---

## Video V161: Delegated Identity Management

**Objective:** To explain delegated identity management (IDaaS), implementation models, and security considerations.

### I. Definition & Context
- **Delegated Identity Management:** Outsourcing or transferring identity management responsibilities (authentication services) to a third party
- **Part of Federated Identity Management**
- **Also Known As:** Identity as a Service (IDaaS)

### II. Key Benefits & Use Cases
- **Lack of infrastructure:** Useful when organization lacks Active Directory, LDAP, or skilled admins
- **Cost & time savings:** Reduces overhead, maintenance, and infrastructure costs
- **Consistency:** Provides a dependable process for identification/authentication
- **Business continuity/DR:** Users keep same credentials when switching from primary to recovery sites
- **Real-world example:** Logging into a training platform using LinkedIn, Facebook, or Google credentials

### III. Implementation Models

| Model | Description |
| :--- | :--- |
| **On-Premise** | Local ID/Auth mechanisms installed in the facility |
| **Off-Premise (Cloud-based)** | ID/Auth mechanisms hosted offsite (most common with third parties) |
| **Hybrid** | Combination of on-prem and off-prem solutions (e.g., syncing local directory with cloud identity provider for redundancy) |

### IV. Security & Operational Considerations
- **High Availability / SLA:** Ensure provider has high availability to avoid single point of failure; sign an SLA for uptime guarantees
- **Credential Protection:** Provider's protection must meet/exceed organizational policies, industry standards, and legal/regulatory requirements (responsibility remains with the organization)
- **Planning Account Requirements:** Properly plan roles, privileges, and changes in advance to avoid delays when working with a third party's schedule

### V. Exam Takeaways
- Understand the **benefits** of delegated identity management / IDaaS
- Know the **three implementations**: on-prem, off-prem, and hybrid
- Understand the **security considerations** involved

---

## Video V162: Identity and Access Lifecycle

**Objective:** To explain the identity and access provisioning lifecycle: provisioning, review, and revocation.

### I. Core Definition
- **Lifecycle:** Creation, management, and revocation of an identity
- **Key Terms:**
  - **Provisioning:** Creating identity + authentication credentials for a subject
  - **Deprovisioning:** Removing those credentials

### II. Three Main Phases (Exam Focus)
1.  **Provisioning**
2.  **Review**
3.  **Revocation**

### III. Provisioning (Creation)
- Starts with **enrollment/registration** (establish need & requirements)
- **Controlled process** with justification (who, what, when, why, how)
- **Required evidence** per policy (photo ID, passport, background check, references)
- Complete security awareness training before access
- **Standardized, unique username** (no duplicates)
- Create authentication credentials (passwords, keys, biometrics)
- **Start with zero access**, then allocate based on approved roles/groups
- **Principle:** Permit by exception, deny by default (enforce least privilege & need-to-know)

### IV. Review (Ongoing Management)
- Accounts reviewed **periodically** per policy (law, regulation, or requirement)
- Can be part of audits, assessments, or personnel changes
- **Adjust privileges** based on current needs (add/remove groups or individual rights)
- Prevents **privilege/authorization creep**
- Identify and correct incorrect privilege levels

### V. Revocation (Deprovisioning)
- Disabling account when no longer needed or privileges change
- **Triggers:** Termination, job change, stale account, security policy violation
- **Goal:** Minimize risk and attack surface (stale accounts = attack vectors)
- **Important:** Do **not** delete accounts – just disable them
- **Reasons to keep accounts:** Decrypt data later, investigations, possible return of user
- Keep accounts as long as organizational policy requires

### VI. Exam Takeaways
- Understand **provisioning & deprovisioning** in the context of **identity management**
- Know the three lifecycle steps: **Provisioning → Review → Revocation**

---

## Session 22 Summary

Session 22 covers the **complete identity management landscape** for the CISSP exam (Objectives 5.2, 5.3, 5.5). Key takeaways include:

1. **Establishing Identity (V158):** Identity proofing process (Resolution → Validation → Verification). Three Identity Assurance Levels (IAL): Level 1 (self-asserted), Level 2 (evidence required), Level 3 (physical presence required). Protect PII.

2. **Identity Management (V159):** Provisioning (creation) vs. Deprovisioning (removal). Centralized (single entity: AD, LDAP, RADIUS) vs. Decentralized (local authentication) vs. Distributed (hybrid: central for users, local for admin/root).

3. **Federated Identity Management (V160):** FIM enables same credentials across multiple technologies. Key protocols: SAML (web-based SSO, IdP + SP), SPML (provisioning automation), XACML (attribute-based access control).

4. **Delegated Identity Management (V161):** IDaaS (Identity as a Service). Implementation: on-prem, off-prem (cloud), or hybrid. Security considerations: SLA, credential protection, planning.

5. **Identity and Access Lifecycle (V162):** Three phases: Provisioning (creation with zero access, permit by exception) → Review (periodic audits, prevent privilege creep) → Revocation (disable, not delete, accounts).

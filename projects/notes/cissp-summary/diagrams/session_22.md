### Video V158: Establishing Identity

```mermaid
graph TD
    subgraph Core Concept
        Identity[Identity<br/>A subject claiming who or what they are<br/>Examples: Hostnames, IP addresses, MAC addresses]
    end

    subgraph Key Components
        Registration[Registration<br/>Creating applicant's identity<br/>Adding to I&A management system]
        CSP[CSP - Credential Service Provider<br/>Performs identity proofing<br/>NOT cloud service provider]
        Proofing[Identity Proofing<br/>Collects applicant's info + evidence<br/>CSP confirms claimed identity<br/>Based on assurance level]
    end

    subgraph Identity Assurance Levels - IAL
        L1[Level 1 - Self-asserted attributes<br/>No verification<br/>Example: Account on training website]
        L2[Level 2 - Evidence required<br/>Real-world existence<br/>Remote preferred in person<br/>Example: Guest user account]
        L3[Level 3 - Physical presence required<br/>In person<br/>Example: System administrator<br/>May include background check]
    end

    subgraph Identity Proofing Steps
        Resolution[Resolution<br/>Collect all attributes + evidence<br/>Determine uniqueness]
        Validation[Validation<br/>Authenticate, validate accuracy<br/>Via government IDs, authoritative sources]
        Verification[Verification<br/>Link claimed identity to real-life subject<br/>Match photo ID to person]
    end

    subgraph Post-Verification
        Post[Applicant becomes subscriber/user<br/>Receives credentials<br/>Confirms enrollment]
        Protect[Data Protection: PII via security policies]
        Usability[Usability: Clear, easy steps<br/>Explain: what, why, how protected, who accesses]
    end

    Identity --> Registration --> CSP --> Proofing
    Proofing --> L1 --> L2 --> L3
    L3 --> Resolution --> Validation --> Verification
    Verification --> Post --> Protect --> Usability

    Principle[Selection: Balance time, money, effort with policy<br/>Higher privilege = higher level]
```

---

### Video V159: Identity Management

```mermaid
graph TD
    subgraph Core Definitions
        Identity[Identity: Subject's claim of who/what they are<br/>Users, computers, hosts]
        Auth[Authentication: Verification of identity's correctness]
        Authz[Authorization: Permission to access an object]
        Access[Access Controls: Management of subject privileges<br/>to access objects]
        Provisioning[Provisioning: Creation of identity + credentials]
        Deprovisioning[Deprovisioning: Removal or expiration of credentials/identity]
    end

    subgraph Identity Management Methods
        Centralized[Centralized Access Control<br/>Single entity handles I&A + authorization<br/>Examples: Active Directory, LDAP, RADIUS]
        
        Decentralized[Decentralized Access Control<br/>Multiple entities perform I&A + authorization<br/>Each host has local identity management<br/>Local authentication]
        
        Distributed[Distributed Access Control - Hybrid<br/>Primary: centralized authentication<br/>Backup: decentralized local for high-level accounts<br/>Normal users → central, root/admin → local]
    end

    subgraph Example - Website Access
        ExIdentity[Identity: Username - BSpencer]
        ExAuth[Authentication: Password - only known to user]
        ExAccess[Access Control: Group-based privileges<br/>Limited interaction, no modification rights]
    end

    Identity --> Auth --> Authz --> Access
    Access --> Provisioning
    Provisioning --> Deprovisioning
    Deprovisioning --> Centralized
    Centralized --> Decentralized
    Decentralized --> Distributed
    Distributed --> ExIdentity --> ExAuth --> ExAccess
```

---

### Video V160: Federated Identity Management (FIM)

```mermaid
graph TD
    subgraph Core Concept
        FIM[FIM - Federated Identity Management<br/>Enables multiple different technologies<br/>to use SAME Single Sign-On credentials<br/>SSO = same creds across apps/systems<br/>FIM = same creds across different technologies<br/>Digital identity used outside single org<br/>Across partner companies]
    end

    subgraph Key Protocols
        SAML[SAML - Security Assertion Markup Language<br/>Web-based SSO<br/>Exchanges authentication/authorization data<br/>Uses XML + SOAP]
        SPML[SPML - Service Provisioning Markup Language<br/>Exchanges user, resource, service provisioning info<br/>Automates identity creation]
        XACML[XACML - Extensible Access Control Markup Language<br/>Enforces access control based on attributes<br/>Subject, resource, action]
    end

    subgraph SAML Components
        IdP[Identity Provider - IdP<br/>Authenticates the subject<br/>Provides identity info]
        SP[Service Provider - SP<br/>Provides service/resource<br/>Based on IdP's assurance]
        Subject[Subject/Principal<br/>Requests access to service/resource]
        Assertion[Assertion<br/>IdP makes authentication/attribute/authorization statements]
        Bindings[Bindings<br/>How SAML works with other protocols: SOAP, HTTP]
        Profile[Profile<br/>Assertions + protocols + bindings together]
    end

    subgraph SAML Workflow
        W1[1. Subject authenticates to Service Provider]
        W2[2. SP verifies identity with Identity Provider]
        W3[3. IdP confirms identity]
        W4[4. Subject granted access]
        W5[5. First auth = only time credentials needed<br/>Token passed for session]
    end

    FIM --> SAML
    FIM --> SPML
    FIM --> XACML
    SAML --> IdP
    SAML --> SP
    SAML --> Subject
    SAML --> Assertion
    SAML --> Bindings
    SAML --> Profile
    W1 --> W2 --> W3 --> W4 --> W5
```

---

### Video V161: Delegated Identity Management (IDaaS)

```mermaid
graph TD
    subgraph Definition
        Delegated[Delegated Identity Management<br/>Outsourcing identity management responsibilities<br/>Authentication services to third party<br/>Part of Federated Identity Management<br/>Also known as: IDaaS - Identity as a Service]
    end

    subgraph Benefits & Use Cases
        B1[Lack of infrastructure<br/>No Active Directory, LDAP, or skilled admins]
        B2[Cost & time savings<br/>Reduces overhead, maintenance, infrastructure costs]
        B3[Consistency<br/>Dependable I&A process]
        B4[Business continuity/DR<br/>Same credentials for primary/recovery sites]
        B5[Real-world example<br/>Login to training platform using<br/>LinkedIn, Facebook, Google credentials]
    end

    subgraph Implementation Models
        OnPrem[On-Premise<br/>Local I&A mechanisms installed in facility]
        OffPrem[Off-Premise - Cloud-based<br/>I&A mechanisms hosted offsite<br/>Most common with third parties]
        Hybrid[Hybrid<br/>Combination of on-prem + off-prem<br/>Syncing local directory with cloud IdP for redundancy]
    end

    subgraph Security & Operational Considerations
        HA[SLA - High Availability<br/>Avoid single point of failure<br/>Uptime guarantees]
        Cred[Credential Protection<br/>Provider protection ≥ org policies<br/>Responsibility remains with organization]
        Planning[Planning Account Requirements<br/>Roles, privileges, changes in advance<br/>Avoid delays with third party schedule]
    end

    Delegated --> B1 --> B2 --> B3 --> B4 --> B5
    B5 --> OnPrem --> OffPrem --> Hybrid
    Hybrid --> HA --> Cred --> Planning
```

---

### Video V162: Identity and Access Lifecycle

```mermaid
graph TD
    subgraph Core Definition
        Lifecycle[Lifecycle: Creation, management, revocation of identity<br/>Provisioning: Creating identity + credentials<br/>Deprovisioning: Removing credentials]
    end

    subgraph Phase 1 - Provisioning Creation
        P1[Enrollment/registration<br/>Establish need & requirements]
        P2[Controlled process with justification<br/>Who, what, when, why, how]
        P3[Required evidence per policy<br/>Photo ID, passport, background check, references]
        P4[Complete security awareness training<br/>BEFORE access]
        P5[Standardized, unique username - no duplicates]
        P6[Create authentication credentials<br/>Passwords, keys, biometrics]
        P7[Start with ZERO access<br/>Allocate based on approved roles/groups]
        P8[Permit by exception, deny by default<br/>Least privilege & need-to-know]
    end

    subgraph Phase 2 - Review Ongoing Management
        R1[Accounts reviewed PERIODICALLY<br/>Per law, regulation, or requirement]
        R2[Part of audits, assessments, or personnel changes]
        R3[Adjust privileges based on current needs<br/>Add/remove groups or individual rights]
        R4[Prevents privilege/authorization creep]
        R5[Identify and correct incorrect privilege levels]
    end

    subgraph Phase 3 - Revocation Deprovisioning
        V1[Disabling account when no longer needed<br/>or privileges change]
        V2[Triggers: Termination, job change<br/>Stale account, security policy violation]
        V3[Goal: Minimize risk and attack surface<br/>Stale accounts = attack vectors]
        V4[IMPORTANT: Do NOT delete accounts<br/>Just disable them]
        V5[Reasons to keep: Decrypt data later<br/>Investigations, possible return of user]
        V6[Keep accounts as long as policy requires]
    end

    Lifecycle --> P1 --> P2 --> P3 --> P4 --> P5 --> P6 --> P7 --> P8
    P8 --> R1 --> R2 --> R3 --> R4 --> R5
    R5 --> V1 --> V2 --> V3 --> V4 --> V5 --> V6
```

---

### Bonus: Session 22 Complete Concept Map

```mermaid
mindmap
  root((Identity Management<br/>CISSP 5.2, 5.3, 5.5))
    Establishing Identity
      Registration, CSP, Identity Proofing
      IAL 1: Self-asserted
      IAL 2: Evidence required
      IAL 3: Physical presence required
      Steps: Resolution → Validation → Verification
      Protect PII, usability
    Identity Management
      Provisioning: creation + credentials
      Deprovisioning: removal/expiration
      Centralized: AD, LDAP, RADIUS
      Decentralized: local authentication
      Distributed: hybrid central + local
    Federated Identity Management - FIM
      Same credentials across technologies
      SAML: web SSO, XML/SOAP, IdP + SP
      SPML: provisioning automation
      XACML: attribute-based access control
    Delegated Identity Management - IDaaS
      Outsourcing I&A to third party
      On-prem, off-prem cloud, hybrid
      Considerations: SLA, credential protection, planning
    Identity & Access Lifecycle
      Phase 1: Provisioning (zero access, permit by exception)
      Phase 2: Review (periodic, prevent privilege creep)
      Phase 3: Revocation (disable, not delete)
```
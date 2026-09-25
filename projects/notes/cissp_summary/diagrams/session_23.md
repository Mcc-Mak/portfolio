### Video V164: Authentication Systems (LDAP, RADIUS, TACACS+, Diameter)

```mermaid
graph TD
    subgraph Authentication System
        AuthSys[Stores subject identity + credentials<br/>Centralized: LDAP, AD<br/>Decentralized: local, multiple points]
    end

    subgraph Directory Services
        X500[X.500 - Standard directory service 1988 ITU<br/>Parent-child tree structure]
        DAP[DAP - Directory Access Protocol X.511<br/>Predecessor to LDAP]
        LDAP[LDAP - Lightweight Directory Access Protocol<br/>Port 389 unsecure - credentials cleartext<br/>Port 636 secure - LDAPS]
        DNS[DNS - Domain Name System - also directory service]
        NIS[NIS - Network Information Service - older, legacy]
    end

    subgraph LDIF Fields
        DN[DN - Distinguished Name<br/>Unique identifier for subject]
        CN[CN - Common Name<br/>Username or full name]
        DC[DC - Domain Component<br/>Domain name - diontraining]
        OU[OU - Organizational Unit<br/>Groups/departments - Security]
    end

    subgraph AAA Protocols
        RADIUS[RADIUS - UDP ports 1812/1813<br/>Encrypts password only<br/>Session unencrypted<br/>Use: simple user/password auth]
        TACACS[TACACS+ - TCP port 49<br/>Encrypts entire session<br/>Use: complex auth + authorization]
        Diameter[Diameter - TCP/SCTP port 3868<br/>No native encryption - use IPsec/SSL/TLS<br/>Use: modern, flexible communications]
    end

    subgraph AAA Five Elements
        AAA[Identification, Authentication, Authorization<br/>Auditing, Accounting]
    end

    AuthSys --> X500 --> DAP --> LDAP
    LDAP --> DNS
    DNS --> NIS
    LDAP --> DN --> CN --> DC --> OU
    OU --> RADIUS --> TACACS --> Diameter
    Diameter --> AAA
```

---

### Video V165: Authentication Factors (SFA, 2FA, MFA)

```mermaid
graph TD
    subgraph Core Definition
        Auth[Authentication: Validation of claimed identity<br/>Username = identity, Password = authentication]
    end

    subgraph Primary Types
        SFA[SFA - Single-Factor Authentication<br/>Uses ONE factor - just password<br/>1-to-1 authentication]
        TwoFA[2FA - Two-Factor Authentication<br/>Uses TWO different factors<br/>Subset of MFA]
        MFA[MFA - Multi-Factor Authentication<br/>Uses multiple 2 or 3 factors<br/>Often interchangeable with 2FA]
    end

    subgraph Three Main Factor Types
        Type1[Type 1 - Something you know<br/>Knowledge-based<br/>Password, passphrase, PIN]
        Type2[Type 2 - Something you have<br/>Ownership-based<br/>Smart card, token, ID badge, OTP device]
        Type3[Type 3 - Something you are<br/>Biometric-based<br/>Iris/retina scan, fingerprint, palm scan]
    end

    subgraph Context-Based Authentication
        Context[Something you do: speech, signature, keystroke<br/>Somewhere you are: geolocation via IP<br/>Device/network in use: MAC address, IP address<br/>Can REPLACE password-based auth]
    end

    Auth --> SFA
    SFA --> TwoFA
    TwoFA --> MFA
    MFA --> Type1
    Type1 --> Type2
    Type2 --> Type3
    Type3 --> Context
```

---

### Video V166: Biometric Authentication

```mermaid
graph TD
    subgraph Definition
        Bio[Biometric Authentication<br/>Validates claimed identity using<br/>genetic or behavioral data<br/>Used in MFA with Type 1 or Type 2]
    end

    subgraph Categories
        Physio[Physiological - Physical<br/>Fingerprint scans, palm scans<br/>Retina scans most accurate<br/>Iris scans, hand geometry, facial recognition]
        Behavior[Behavioral<br/>Signature dynamics, keystroke dynamics<br/>Voice pattern recognition, heart rate pattern]
    end

    subgraph Errors
        Type1[Type I Error - FRR False Rejection Rate<br/>Authorized user rejected → FAILURE]
        Type2[Type II Error - FAR False Acceptance Rate<br/>Unauthorized user accepted → VIOLATION]
    end

    subgraph CER - Crossover Error Rate
        CER[CER - Crossover Error Rate / EER Equal Error Rate<br/>Point where FRR = FAR<br/>Lower CER = more accurate system<br/>High-security: accept more Type I to reduce Type II]
    end

    subgraph Enrollment
        Enroll[Collect biometric data → store as HASH values<br/>Enrollment ≤ 2 minutes for user acceptance<br/>Privacy: biometric data may be PHI<br/>Needs security controls]
    end

    Bio --> Physio
    Bio --> Behavior
    Physio --> Type1
    Behavior --> Type2
    Type1 --> CER
    Type2 --> CER
    CER --> Enroll
```

---

### Video V167: Single Sign-On (SSO)

```mermaid
graph TD
    subgraph Definition
        SSO[SSO - Single Sign-On<br/>Single set of credentials across multiple systems<br/>Authenticate once to SSO service → generates token<br/>Benefit: Reduces password fatigue + writing down risk]
    end

    subgraph How SSO Works
        W1[1. Subject authenticates to SSO service]
        W2[2. SSO service creates authentication token]
        W3[3. Token passed to each target app]
        W4[4. App grants access based on token]
    end

    subgraph Drawbacks & Risks
        R1[Single Point of Failure - Security<br/>Compromised credentials/token = attacker gets ALL]
        R2[Technology Compatibility<br/>Kerberos primarily for Windows]
        R3[Cost - Expensive for large organizations]
        R4[High-Value Target<br/>All credentials/tokens in SSO server]
    end

    subgraph Key SSO Methods
        Kerberos[Kerberos - Ticket-based<br/>Windows domain authentication]
        SAML[SAML - Open standard<br/>Web-based SSO browsers]
        OpenID[OpenID - Existing account to sign into multiple sites<br/>Consumer web SSO]
        OIDC[OpenID Connect - OIDC<br/>Authentication layer on OAuth 2.0<br/>Modern authentication]
    end

    SSO --> W1 --> W2 --> W3 --> W4
    W4 --> R1 --> R2 --> R3 --> R4
    R4 --> Kerberos --> SAML --> OpenID --> OIDC
```

---

### Video V168: OAuth and OpenID Connect (OIDC)

```mermaid
graph TD
    subgraph OAuth - Authorization
        OAuth[OAuth - Open standard for AUTHORIZATION<br/>Delegates authorization to third party<br/>Without sharing authentication credentials<br/>Uses access tokens - RFC 6749 OAuth 2.0]
        OAuth_Components[Resource owner: pre-defines who can access<br/>Authorization server: issues tokens<br/>Resource server: provides protected resource]
    end

    subgraph OpenID - Authentication
        OpenID[OpenID - Open standard for AUTHENTICATION<br/>Single set of credentials across multiple websites SSO<br/>Credentials maintained by third-party OpenID provider<br/>Example: Google, Facebook, LinkedIn login]
    end

    subgraph OpenID Connect
        OIDC[OpenID Connect - OIDC<br/>Identity layer built on OAuth 2.0<br/>Technologies: REST, JSON, JSON Web Tokens JWTs<br/>Directory service + OAuth 2.0 = OIDC]
    end

    subgraph Comparison
        Comp1[OAuth = Authorization - delegated access]
        Comp2[OpenID = Authentication - SSO across websites]
        Comp3[OIDC = Authentication + OAuth 2.0]
    end

    OAuth --> OAuth_Components
    OAuth_Components --> OpenID
    OpenID --> OIDC
    OIDC --> Comp1 --> Comp2 --> Comp3
```

---

### Video V169: Kerberos

```mermaid
graph TD
    subgraph Overview
        Kerb[Kerberos - Ticket-based SSO system<br/>Developed by MIT Project Athena 1983-1991<br/>Version 5 current<br/>Widely used with Windows / Active Directory]
    end

    subgraph Core Components
        KDC[KDC - Key Distribution Center<br/>Trusted 3rd party - issues & stores secret session keys]
        AS[AS - Authentication Server<br/>Authenticates subject's account - issues TGT]
        TGS[TGS - Ticket Granting Service<br/>Verifies TGT - issues service tickets & session keys]
        DS[Directory Service - Active Directory<br/>Maintains account info - Kerberos references it]
    end

    subgraph Ticket Types
        TGT[TGT - Golden Ticket<br/>Evidence of authentication with KDC]
        ServiceTicket[Service Ticket - Silver Ticket<br/>Encrypted evidence of authorization to object]
    end

    subgraph Authorization Flow
        F1[1. User authenticates to AS]
        F2[2. AS verifies identity against directory service]
        F3[3. AS issues TGT Golden Ticket]
        F4[4. Client presents TGT to TGS]
        F5[5. TGS issues service ticket Silver Ticket + session keys]
        F6[6. Client presents service ticket to Kerberos-enabled service]
        F7[7. Service checks with KDC → if valid, session opens - SSO achieved]
    end

    subgraph Risks
        Risk1[Dictionary/brute force on passwords]
        Risk2[KDC compromise → system fails secure - all access denied]
        Risk3[Kerberoasting - extracting password hashes from AD<br/>Crack passwords and spoof identity]
    end

    subgraph Security
        Sec[Uses AES for encryption<br/>Requires synchronized time source - timestamps critical]
    end

    Kerb --> KDC
    KDC --> AS
    AS --> TGS
    TGS --> DS
    DS --> TGT
    TGT --> ServiceTicket
    ServiceTicket --> F1 --> F2 --> F3 --> F4 --> F5 --> F6 --> F7
    F7 --> Risk1 --> Risk2 --> Risk3
    Risk3 --> Sec
```

---

### Video V170: Credential Management Systems

```mermaid
graph TD
    subgraph Definition
        CMS[Credential Management System - Password Manager<br/>Stores subject's authentication credentials<br/>Usernames, passwords, account numbers, IDs, tokens, certificates, biometric info]
    end

    subgraph Types & Examples
        Standalone[Standalone apps: KeePass]
        Browser[Browser plugins: LastPass, RoboForm]
        Endpoint[Endpoint security: Norton, Symantec, Kaspersky, Bitdefender]
        RMM[RMM - Risk management software: Nessus, OpenVAS for credentialed scans]
        Builtin[Built into OS: Windows, Google]
    end

    subgraph Technical Mechanism
        Vault[Credentials stored in VAULT - encrypted area<br/>Encryption protects stored data]
    end

    subgraph Security Considerations
        Crypto[Cryptography: Use modern compliant algorithms - AES, RSA]
        AUP[AUP - Acceptable Use Policy<br/>Identify approved CMS, require user acknowledgment]
        Master[Master password: Define strong, complex requirements for vault access]
        Scope[Password scope: Specify which passwords can/cannot be stored<br/>Admin/root/privileged accounts]
        Recovery[Protection of related data: CMS recovery keys, credential vault backups]
    end

    CMS --> Standalone --> Browser --> Endpoint --> RMM --> Builtin
    Builtin --> Vault
    Vault --> Crypto --> AUP --> Master --> Scope --> Recovery
```

---

### Video V171: Just-In-Time (JIT) Access

```mermaid
graph TD
    subgraph Purpose
        JIT[JIT - Just-In-Time Access<br/>Reduce attack surface - possible entry points<br/>Main target: privileged accounts - root, admin]
    end

    subgraph What JIT Does
        Does[Provides on-demand privileged access for specific task<br/>Requires PAM - Privileged Access Management<br/>Eliminates static privileged accounts<br/>Enforces LEAST PRIVILEGE]
    end

    subgraph Two Mechanisms
        Ephemeral[Ephemeral accounts<br/>Used once, then removed after use]
        TempElev[Temporary elevation<br/>Grants privileges temporarily - sudo in Linux<br/>Removed after time/session ends]
    end

    subgraph Best Practices
        BP1[Fine-grained access policies<br/>Define exactly which subjects access which objects and how]
        BP2[Prefer temporary elevation<br/>Best for specific privileged commands]
        BP3[Audit all privileged activity<br/>Monitor effectiveness, adjust policies, detect violations]
    end

    JIT --> Does
    Does --> Ephemeral
    Does --> TempElev
    Ephemeral --> BP1
    TempElev --> BP2
    BP1 --> BP3
    BP2 --> BP3
```

---

### Video V172: Access Control Models – Part 1 (DAC, MAC, Rule-Based)

```mermaid
graph TD
    subgraph Core Concept
        AC[Access Control: Controlling how subject interacts with object<br/>File, service, function]
    end

    subgraph Discretionary Access Control - DAC
        DAC[DAC - Discretionary Access Control<br/>Basis: Identity of subject<br/>Mechanism: ACL Access Control List<br/>Owner has complete authority<br/>Wide flexibility, minimal overhead<br/>Weaker security - not fine-grained]
    end

    subgraph Mandatory Access Control - MAC
        MAC[MAC - Mandatory Access Control - Non-discretionary<br/>Owners do NOT set access<br/>Rules are predefined, centrally managed<br/>Enforcement: Security policies + labels<br/>Labels: Classification Secret/Top Secret + category role/function<br/>Use: Highly sensitive - PII, PHI, national security<br/>Example: Subject Secret clearance → access Secret object]
    end

    subgraph Rule-Based Access Control
        Rule[Rule-Based Access Control<br/>Controls interaction based on rules/restrictions<br/>Deployments: Firewalls, IPS, MAC systems<br/>Example: Firewall checks source, destination, protocol → grant/deny]
    end

    AC --> DAC
    DAC --> MAC
    MAC --> Rule
```

---

### Video V173: Access Control Models – Part 2 (RBAC, ABAC, Risk-Based)

```mermaid
graph TD
    subgraph Role-Based Access Control - RBAC
        RBAC[RBAC - Role-Based Access Control<br/>Controls subject-object interaction based on group membership/role<br/>Subjects grouped by function: admin, engineer<br/>Privileges assigned to group/role<br/>Benefits: Enforces need-to-know + least privilege, reduces privilege creep<br/>Key Rule: If label/category not defined → deny by default - fail safe/secure]
    end

    subgraph Attribute-Based Access Control - ABAC
        ABAC[ABAC - Attribute-Based Access Control / PBAC Policy-Based<br/>Controls access based on attributes<br/>Focus: Object attributes - more flexible than RBAC<br/>Standard: XACML eXtensible Access Control Markup Language]
        ABAC_Attrs[Attributes:<br/>Subject: Role, clearance, organization<br/>Action: Read, write, execute<br/>Object: Sensitivity, owner, type<br/>Environment: Date, time, IP, MAC]
    end

    subgraph Risk-Based Access Control
        Risk[Risk-Based Access Control / Risk-Adaptable<br/>Controls access based on dynamic risk decision]
        Risk_Factors[Risk Factors:<br/>Device, network, geolocation, object sensitivity<br/>Behavior analytics, authentication method]
        Risk_Logic[Logic Example:<br/>High risk → require MFA<br/>Medium risk + single-factor + privileged → deny<br/>Untrusted IP/subnet → deny]
    end

    subgraph Comparison Table
        Comp1[DAC: Identity ACL - Object owner]
        Comp2[MAC: Labels/clearance - Security policy]
        Comp3[RBAC: Group membership - Subject focus]
        Comp4[ABAC: Attributes - Object focus, XACML]
        Comp5[Rule-Based: Rules/restrictions - Firewalls, IPS]
        Comp6[Risk-Based: Dynamic risk - Device, location, behavior]
    end

    RBAC --> ABAC
    ABAC --> ABAC_Attrs
    ABAC_Attrs --> Risk
    Risk --> Risk_Factors --> Risk_Logic
    Risk_Logic --> Comp1 --> Comp2 --> Comp3 --> Comp4 --> Comp5 --> Comp6
```

---

### Bonus: Session 23 Complete Concept Map

```mermaid
mindmap
  root((Authentication Mechanisms<br/>CISSP 5.2, 5.4, 5.6))
    Authentication Systems
      Directory Services: X.500, LDAP port 389/636
      LDIF: DN, CN, DC, OU
      AAA: RADIUS UDP pw only, TACACS+ TCP full encrypt, Diameter TCP/SCTP
    Authentication Factors
      SFA: Type 1 something you know
      2FA/MFA: Type 2 something you have, Type 3 something you are
      Context: location, device, behavior
    Biometric Authentication
      Physiological: fingerprint, retina, iris
      Behavioral: signature, keystroke, voice
      Type I FRR failure, Type II FAR violation
      CER/EER: FRR = FAR, lower CER = more accurate
    Single Sign-On - SSO
      Benefits: reduce password fatigue
      Risks: central target, cost, compatibility
      Methods: Kerberos, SAML, OpenID, OIDC
    OAuth & OIDC
      OAuth: Authorization, delegated access with tokens
      OpenID: Authentication, SSO across websites
      OIDC: Authentication + OAuth 2.0
    Kerberos
      KDC: AS + TGS
      Golden Ticket TGT, Silver Ticket service ticket
      Attack: Kerberoasting - extract AD password hashes
    Credential Management Systems
      Password managers: KeePass, LastPass
      Security: modern crypto, strong master password, AUP, protect recovery keys
    Just-In-Time Access - JIT
      Ephemeral accounts: use once, remove
      Temporary elevation: sudo
      Reduces attack surface, least privilege
    Access Control Models - Part 1
      DAC: owner decides, ACL
      MAC: labels/clearance, non-discretionary
      Rule-Based: firewalls, IPS
    Access Control Models - Part 2
      RBAC: group membership, subject focus
      ABAC: attributes, object focus, XACML
      Risk-Based: dynamic risk - device, location, behavior
```
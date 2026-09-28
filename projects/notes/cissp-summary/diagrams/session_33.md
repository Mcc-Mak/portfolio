### Video V249: Programming Languages

```mermaid
graph TD
    subgraph Core Concept
        PL[Programming Languages<br/>Instructions to computer in structured format<br/>Computers only understand BINARY/MACHINE language - 0s and 1s]
    end

    subgraph Low-Level vs High-Level
        Low[Low-level - Directly interfaces with hardware CPU<br/>Harder to code]
        High[High-level - Abstracts hardware constraints<br/>Easier for humans - needs interpretation/compilation]
    end

    subgraph Compiled vs Interpreted
        Compiled[Compiled - C#, Java, Swift<br/>Converted to low-level machine instructions via COMPILER]
        Interpreted[Interpreted - Python, JavaScript, Ruby<br/>Executed without prior compilation - translation at runtime]
    end

    subgraph Language Generations
        G1[1GL - Machine code binary]
        G2[2GL - Assembly language mnemonics]
        G3[3GL - High-level compiled - Java, C#, C++ - MOST COMMON]
        G4[4GL - Domain-specific - SQL]
        G5[5GL - Problem-solving / AI - creates logic from constraints - GROWING]
    end

    subgraph Code Libraries
        Libs[Reusable, pre-written code - DLLs, JRE<br/>Benefits: efficiency, consistency, SECURITY - if change/config controls enforced]
    end

    subgraph Runtime Environment - Exam Focus
        RTE[Runtime Environment - Hardware + software resources to execute program<br/>Server, OS, compilers, interpreters, storage, network<br/>Requires: Resource allocation + Security controls - hardening, testing, config management]
    end

    subgraph SDK & IDE
        SDK[SDK - Software Development Kit<br/>Collection of tools to create, compile, test, debug<br/>Platform-dependent - Windows, Linux, mobile]
        IDE[IDE - Integrated Development Environment<br/>Provides GUI for SDK<br/>Integrates tools, debugging, version control<br/>Examples: Visual Studio, NetBeans, Eclipse]
    end

    PL --> Low
    PL --> High
    Low --> Compiled
    High --> Interpreted
    Compiled --> G1 --> G2 --> G3 --> G4 --> G5
    G5 --> Libs --> RTE
    RTE --> SDK
    SDK --> IDE
```

---

### Video V250: Application Security Testing

```mermaid
graph TD
    subgraph Core Focus
        AST[Application Security Testing<br/>Discover BUGS, FLAWS, or VULNERABILITIES<br/>In-house or acquired - COTS]
    end

    subgraph Two Main Testing Types - Key for Exam
        SAST[SAST - Static Application Security Testing<br/>Analyzes code WITHOUT running it - static<br/>In-house developed software - WHITE BOX]
        DAST[DAST - Dynamic Application Security Testing<br/>Analyzes RUNNING application in production<br/>COTS, open source, acquired - BLACK BOX]
    end

    subgraph Other Software Testing Types
        System[System test - Verify functional & security requirements]
        Unit[Unit test - Test individual component/script]
        Integration[Integration test - Ensure two technologies work without new risks]
        Regression[Regression test - Ensure changes don't break existing functionality]
        Sanity[Sanity test - Informal check if feature will work - feasibility]
        Smoke[Smoke test - Quick check of basic functionality]
        Fuzz[Fuzz testing - Inject invalid inputs dynamically to discover flaws]
    end

    subgraph Fuzz Testing Details
        Mutation[Mutation Fuzzing - dumb<br/>Mutate valid seed data into invalid inputs]
        Generation[Generation Fuzzing - smart/intelligent<br/>Create invalid data from data model]
        FuzzTypes[Fuzzers can execute BLACK, WHITE, or GRAY box tests]
    end

    subgraph Advanced Testing Methods
        IAST[IAST - Interactive Application Security Testing<br/>Analyzes real-time software functionality<br/>Runtime behavior, communications - APIs, frameworks]
        RASP[RASP - Runtime Application Self-Protection<br/>Runs on server, intercepts calls to/from app<br/>Validates data requests]
    end

    AST --> SAST
    AST --> DAST
    SAST --> System --> Unit --> Integration --> Regression --> Sanity --> Smoke --> Fuzz
    Fuzz --> Mutation
    Fuzz --> Generation
    Fuzz --> FuzzTypes
    FuzzTypes --> IAST
    IAST --> RASP
```

---

### Video V251: Software Assurance

```mermaid
graph TD
    subgraph Core Concept
        SWA[Software Assurance<br/>Level of confidence that software is secure<br/>Will function as designed<br/>Purpose: Assess effectiveness of software security]
    end

    subgraph Key Framework - OWASP ASVS
        ASVS[OWASP ASVS - Application Security Verification Standard<br/>Community-driven framework of security requirements and controls<br/>Helps organizations develop/maintain secure applications<br/>Based on desired assurance levels]
    end

    subgraph Three ASVS Assurance Levels
        L1[Level 1 - Low assurance - bare minimum<br/>Protection against: Low-effort threats, script kiddies<br/>Use case: First step in multi-phase effort]
        
        L2[Level 2 - Moderate assurance<br/>Protection against: Skilled & motivated hackers<br/>Most penetration testing<br/>Use case: Most applications needing robust defenses]
        
        L3[Level 3 - High assurance<br/>Protection against: Advanced threats - APT<br/>Use case: Applications whose compromise severely impacts operations]
    end

    subgraph Evaluation Criteria
        C1[SDLC - Effective built-in security process]
        C2[Risk Analysis - All risks known and accepted]
        C3[Change Control - Tightly controlled, authorized by CCB]
        C4[Continuous Monitoring - Ensuring controls remain effective & compliant]
        C5[Data Protection - Compliance with regulations - GDPR, SOX, HIPAA]
        C6[Logging - Transactions and changes on software]
    end

    SWA --> ASVS
    ASVS --> L1
    L1 --> L2
    L2 --> L3
    L3 --> C1 --> C2 --> C3 --> C4 --> C5 --> C6
```

---

### Video V252: Acquired Software Security

```mermaid
graph TD
    subgraph Definition
        Acquired[Acquired Software<br/>Purchased or leased from third party<br/>Organization has NO security control over development]
    end

    subgraph Types of Acquired Software
        COTS[COTS - Commercial Off-the-Shelf<br/>Purchased/leased, org manages installation, patching]
        OSS[OSS / FOSS - Open Source / Free Open Source<br/>No purchase, but acquired - GitHub, SourceForge]
        GOTS[GOTS - Government Off-the-Shelf<br/>From federal government, government-only license]
        NDI[NDI - Non-Developmental Items<br/>Third-party libraries/modules included in COTS/GOTS/OSS<br/>Introduces SUPPLY CHAIN RISK]
    end

    subgraph Leased Software in Cloud
        SaaS[SaaS - Software as a Service<br/>Provider owns OS & supporting apps<br/>Org controls only DATA & ACCESS CONTROLS]
        PaaS[PaaS - Platform as a Service<br/>Provider owns OS<br/>Org may own application - possibly no source code access]
    end

    subgraph Acquisition Policy - NIST SP 800-160 / 800-64
        A1[1. Preparation - define security requirements in request]
        A2[2. Advertise & select supplier - choose based on security criteria]
        A3[3. Establish security aspects of agreement - SLA/contract]
        A4[4. Monitor agreement - assess execution against SLA]
        A5[5. Accept product/service - confirm compliance before purchase]
    end

    subgraph Operational Best Practices
        OP1[Implement access controls to prevent unauthorized app installation]
        OP2[Follow vendor/industry hardening guides]
        OP3[TEST all acquired products for vulnerabilities BEFORE production]
        OP4[Monitor acquired apps for NEW threats and vulnerabilities]
    end

    Acquired --> COTS
    COTS --> OSS
    OSS --> GOTS
    GOTS --> NDI
    NDI --> SaaS
    SaaS --> PaaS
    PaaS --> A1 --> A2 --> A3 --> A4 --> A5
    A5 --> OP1 --> OP2 --> OP3 --> OP4
```

---

### Video V253: Application Attacks

```mermaid
graph TD
    subgraph Scope
        Attacks[Application Attacks<br/>Target: Source-level code flaws<br/>Entry Point: Typically through user interface]
    end

    subgraph Types of Application Attacks
        Injection[INJECTION ATTACKS<br/>Submitting unauthorized queries/code to backend<br/>Examples: SQL, LDAP, XML, DLL injection]
        
        Hijack[HIJACKING ATTACKS<br/>Assuming authorized user's active session<br/>Examples: Session hijack, domain hijack]
        
        Backdoor[BACKDOOR ATTACKS<br/>Bypassing normal authentication<br/>Examples: Developer backdoors, hardcoded credentials]
        
        Rootkit[ROOTKITS<br/>Malware providing root/administrator-level access<br/>Privilege escalation - Detected by HIDS]
        
        PrivEsc[PRIVILEGE ESCALATION<br/>Moving from low to high privileges<br/>Horizontal - same level across systems<br/>Vertical - user to admin]
        
        TOCTOU[TOCTOU - Time-of-Check, Time-of-Use<br/>Exploits race conditions<br/>Intercepting transaction after check but before use]
    end

    subgraph Defenses
        D1[Constrained interfaces, access control, input validation]
        D2[Source code analysis before deployment]
        D3[HIDS for rootkits]
        D4[Lock and force integrity for transactions - TOCTOU]
    end

    Attacks --> Injection
    Injection --> Hijack
    Hijack --> Backdoor
    Backdoor --> Rootkit
    Rootkit --> PrivEsc
    PrivEsc --> TOCTOU
    TOCTOU --> D1 --> D2 --> D3 --> D4
```

---

### Video V254: OWASP Top 10 – Part 1 (2017, Risks 1–5)

```mermaid
graph TD
    subgraph Introduction
        OWASP[OWASP Top 10<br/>Focus: Source code-level vulnerabilities<br/>Open Web Application Security Project<br/>Ranking Basis: Industry feedback + mapping to MITRE CWE]
    end

    subgraph Risks 1-5 - 2017
        R1[1. INJECTION ATTACKS<br/>Sending untrusted data to command interpreter<br/>SQL, LDAP, XML, DLL<br/>Mitigation: Escape sequences; stored procedures/whitelisted statements]
        
        R2[2. BROKEN AUTHENTICATION<br/>Poorly managed user accounts, credentials, session tokens<br/>Mitigation: Proper identity, access, and session management]
        
        R3[3. SENSITIVE DATA EXPOSURE<br/>Failure to protect data in use, transit, or rest<br/>Mitigation: Identify, classify, encrypt, discard unneeded data]
        
        R4[4. XML EXTERNAL ENTITIES - XXE<br/>Vulnerabilities in XML parsers<br/>External entities manipulate XML processing<br/>Mitigation: Update XML libraries; block external entities & DTDs; use WAF]
        
        R5[5. BROKEN ACCESS CONTROL<br/>Privilege creep leading to unauthorized data exposure<br/>Mitigation: Deny by default, permit by exception; regularly assess privileges]
    end

    OWASP --> R1 --> R2 --> R3 --> R4 --> R5
```

---

### Video V255: OWASP Top 10 – Part 2 (2017, Risks 6–10)

```mermaid
graph TD
    subgraph Risks 6-10 - 2017
        R6[6. SECURITY MISCONFIGURATION<br/>Unpatched software, default accounts, lack of hardening<br/>Mitigation: Disable unnecessary services; regular testing; follow best practices]
        
        R7[7. CROSS-SITE SCRIPTING - XSS<br/>Unauthorized script injected into webpage<br/>Executed in victim's browser<br/>Mitigation: Escape sequences; Content Security Policy - CSP]
        
        R8[8. INSECURE DESERIALIZATION<br/>Lack of control during conversion to/from objects<br/>Mitigation: Digital certificates; sandbox/isolate code; restrict connectivity]
        
        R9[9. COMPONENTS WITH KNOWN VULNERABILITIES<br/>Using libraries/OS with known vulnerabilities<br/>Mitigation: Research CVEs; continuous monitoring; compensating controls]
        
        R10[10. INSUFFICIENT LOGGING & MONITORING<br/>Prevents discovery of threats and attacks<br/>Mitigation: Log all changes to critical services, privileges, accounts, communications]
    end

    subgraph XSS Types - Exam Focus
        Stored[Stored XSS - Malicious script stored on target server]
        Reflected[Reflected XSS - Malicious script comes from victim's HTTP request]
        DOM[DOM-based XSS - Modifies DOM environment to execute injected code]
    end

    R6 --> R7 --> R8 --> R9 --> R10
    R7 --> Stored --> Reflected --> DOM
```

---

### Video V256: OWASP Top 10 – Part 3 (2021 Updates)

```mermaid
graph TD
    subgraph New Risks in 2021
        A04[A04 - INSECURE DESIGN<br/>Ineffective security/privacy controls in design phase<br/>Mitigation: Regular risk analysis; threat modeling; secure system design]
        
        A08[A08 - SOFTWARE AND DATA INTEGRITY FAILURES<br/>Lack of integrity protection in software code<br/>Mitigation: Restrict automated updates; use trusted vendors<br/>Digital signatures; follow CM process]
        
        A10[A10 - SERVER-SIDE REQUEST FORGERY - SSRF<br/>Server accesses remote resources without validating URL<br/>Mitigation: Validate client input; whitelist web addresses and ports; permit by exception]
    end

    subgraph Related Concept - CSRF
        CSRF[CSRF - Cross-Site Request Forgery<br/>Victim executes unwanted actions on authenticated web app<br/>Exploits pre-authenticated session between client and server]
    end

    subgraph SSRF Defenses
        D1[Validate client-provided input]
        D2[Whitelist allowed web addresses and ports<br/>Only HTTPS on port 443]
        D3[Permit traffic by exception<br/>Deny everything else by default]
    end

    A04 --> A08 --> A10
    A10 --> CSRF
    CSRF --> D1 --> D2 --> D3
```

---

### Video V257: Software API Security

```mermaid
graph TD
    subgraph Definition
        API[API - Application Programming Interface<br/>Connects software applications and services directly<br/>Improves integration and user experience<br/>SSO, payment gateways, social media]
    end

    subgraph Common API Commands
        GET[GET - retrieve a resource]
        POST[POST - create a new resource]
        PUT[PUT - edit/update a resource]
        DELETE[DELETE - remove a resource]
    end

    subgraph Types of APIs
        Public[Public/Open - Anyone can connect via HTTP<br/>Security: HIGH RISK - open access]
        Private[Private/Internal - Internal use only behind firewall<br/>Security: LOWER RISK - controlled]
        Partner[Partner - Available only to selected entities<br/>Security: Requires authorization]
        Composite[Composite - Combines multiple requests into one call<br/>Security: Efficiency but complexity]
    end

    subgraph API Protocols
        SOAP[SOAP - older, XML only]
        REST[REST - common since 2000s]
        Other[JSON-RPC, gRPC, Protocol Buffers]
        Focus[Exam focus: SOAP and REST]
    end

    subgraph API Security Key Concepts
        S1[API keys - long, complex passwords for auth/authz]
        S2[Mutual authentication - can use SSH/TLS]
        S3[Protect data types - know sensitive data exchanged]
        S4[Testing - include APIs in software tests]
        S5[Least privilege - limit size/number of accessible resources]
        S6[Input validation - reject invalid inputs/requests]
        S7[Logging & monitoring - detect misuse or threats]
    end

    API --> GET --> POST --> PUT --> DELETE
    DELETE --> Public
    Public --> Private
    Private --> Partner
    Partner --> Composite
    Composite --> SOAP
    SOAP --> REST
    REST --> Other
    Other --> Focus
    Focus --> S1 --> S2 --> S3 --> S4 --> S5 --> S6 --> S7
```

---

### Video V258: Secure Coding Practices

```mermaid
graph TD
    subgraph Context
        SCP[Secure Coding Practices<br/>Reduces security risks in developed software<br/>Focus: IN-HOUSE / organization-developed software - not acquired<br/>Key Reference: OWASP Secure Coding Practices Quick Reference Guide]
    end

    subgraph General Secure Coding Practices
        CodeCtrl[CODE CONTROL & INTEGRITY<br/>Prevent unmanaged/unapproved code; use change control<br/>Restrict unauthorized code creation/altered<br/>Verify integrity of acquired code/libraries with hashes/checksums]
        
        Crypto[CRYPTOGRAPHY<br/>Use modern, unbroken cryptographic ciphers<br/>For encrypted communications]
        
        ErrorMgmt[ERROR & MEMORY MANAGEMENT<br/>Proper error handling for inputs/outputs<br/>Prevents injection, buffer overflows, DoS<br/>Manage memory properly - prevents memory leaks and DoS]
        
        CredPriv[CREDENTIALS & PRIVILEGES<br/>Avoid hardcoded credentials - passwords, tokens<br/>Restrict privileged escalation - root/admin<br/>Unless absolutely necessary]
    end

    SCP --> CodeCtrl
    CodeCtrl --> Crypto
    Crypto --> ErrorMgmt
    ErrorMgmt --> CredPriv
```

---

### Video V259: Software-Defined Security

```mermaid
graph TD
    subgraph Definition
        SDS[Software-Defined Security<br/>Security functions included as part of developed software - code<br/>Started with virtualizing security functions<br/>Firewalls, IDS/IPS, appliances]
    end

    subgraph Related Concepts
        SDN[SDN - Software-Defined Networking<br/>Virtualized network resources]
        IaC[Infrastructure as Code<br/>Software-defined infrastructure, provisioning, automation]
        SDDC[Software-Defined Data Center<br/>Virtualizes all infrastructure resources]
    end

    subgraph Security as Code - DevSecOps
        SecAsCode[Security as Code<br/>Building security processes into DevOps or other workflows<br/>Typically part of DevOps / CI/CD → called DEVSECOPS]
        
        ConfigAsCode[Configuration as Code<br/>Standardize and apply approved configurations<br/>Create GOLD IMAGE - hardened, compliant, immutable]
        
        PolicyAsCode[Policy as Code<br/>Combines infrastructure as code + configuration as code<br/>+ access controls/policies → ensures immutability<br/>Changes require proper change control and CM]
    end

    subgraph Best Practices
        BP1[Identify which security controls can be implemented as code - not all can]
        BP2[Insert GATES - security checks/tests at vulnerable points in pipeline]
        BP3[Gates do NOT slow the pipeline<br/>Identify and report issues for human review]
        BP4[Regularly test security-as-code products as part of SDLC/DevOps]
        BP5[Perform compliance assessments as part of continuous delivery]
    end

    SDS --> SDN
    SDN --> IaC
    IaC --> SDDC
    SDDC --> SecAsCode
    SecAsCode --> ConfigAsCode
    ConfigAsCode --> PolicyAsCode
    PolicyAsCode --> BP1 --> BP2 --> BP3 --> BP4 --> BP5
```

---

### Bonus: Session 33 Complete Concept Map

```mermaid
mindmap
  root((Application Security<br/>CISSP 8.2, 8.3, 8.4, 8.5))
    Programming Languages
      Low-level vs High-level
      Compiled vs Interpreted
      1GL-5GL: machine, assembly, high-level, domain-specific SQL, AI
      Runtime environment: hardware + software, security controls
      SDK: creation tools, IDE: GUI for SDK
    Application Security Testing
      SAST: static, white box, code not running
      DAST: dynamic, black box, running app
      IAST: real-time, RASP: runtime self-protection
      Fuzzing: mutation dumb vs generation smart
    Software Assurance - OWASP ASVS
      Level 1: low, script kiddies
      Level 2: moderate, skilled hackers
      Level 3: high, APT
      Criteria: SDLC, risk analysis, change control, monitoring, data protection, logging
    Acquired Software Security
      COTS, OSS/FOSS, GOTS, NDI - supply chain risk
      SaaS: provider owns OS/apps, PaaS: provider owns OS
      Acquisition policy: prepare, select, SLA, monitor, accept
      Test before production
    Application Attacks
      Injection: SQL, LDAP, XML, DLL
      Hijacking: session, domain
      Backdoors: hardcoded credentials
      Rootkits: detected by HIDS
      Privilege Escalation: horizontal vs vertical
      TOCTOU: race conditions
    OWASP Top 10 2017
      1 Injection, 2 Broken Auth, 3 Sensitive Data, 4 XXE, 5 Broken Access
      6 Misconfig, 7 XSS stored/reflected/DOM, 8 Insecure Deserialization, 9 Known Vulns, 10 Insufficient Logging
    OWASP Top 10 2021
      A04 Insecure Design, A08 Integrity Failures, A10 SSRF
      CSRF related
    Software API Security
      Public high risk, Private lower, Partner auth, Composite
      SOAP, REST
      API keys, mutual auth, least privilege, input validation, logging
    Secure Coding Practices
      Code control/integrity, change control, hashes
      Modern crypto
      Error/memory management
      No hardcoded credentials, restrict privilege escalation
    Software-Defined Security
      Security as Code: DevSecOps, CI/CD
      Configuration as Code: gold image, immutable
      Policy as Code
      Gates: security checks at vulnerable points
```
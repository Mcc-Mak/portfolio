# Session 33: Application Security (CISSP Objectives 8.2, 8.3, 8.4, 8.5)

**Videos:** V248 – V259  
**Core Focus:** Programming languages (low-level vs. high-level, compiled vs. interpreted, language generations, runtime environment, SDK, IDE); Application Security Testing (SAST vs. DAST, IAST, RASP, fuzzing); Software Assurance (OWASP ASVS levels 1, 2, 3); Acquired Software Security (COTS, OSS, GOTS, NDI, SaaS, PaaS); Application Attacks (injection, hijacking, backdoors, rootkits, privilege escalation, TOCTOU); OWASP Top 10 (2017 and 2021); Software API Security (API types, API keys, security concepts); Secure Coding Practices (input validation, error handling, no hardcoded credentials, least privilege); Software-Defined Security (security as code, configuration as code, policy as code, DevSecOps).

---

## Video V248 (Outline): Application Security (Section Intro)

**Objective:** To introduce the key topics in application security for the CISSP exam.

### Topics Covered in this Session
1.  Programming Languages (low-level vs. high-level, compiled vs. interpreted, generations, runtime, SDK, IDE)
2.  Application Security Testing (SAST, DAST, IAST, RASP, fuzzing)
3.  Software Assurance (OWASP ASVS levels 1, 2, 3)
4.  Acquired Software Security (COTS, OSS, GOTS, NDI, SaaS, PaaS)
5.  Application Attacks (injection, hijacking, backdoors, rootkits, privilege escalation, TOCTOU)
6.  OWASP Top 10 (2017 and 2021)
7.  Software API Security (API types, API keys, security concepts)
8.  Secure Coding Practices (input validation, error handling, no hardcoded credentials)
9.  Software-Defined Security (security as code, configuration as code, policy as code)

---

## Video V249: Programming Languages

**Objective:** To explain programming language types, generations, runtime environment, SDK, and IDE.

### I. Programming Language Basics
- **Definition:** Instructions to a computer in a structured format
- Computers only understand **binary/machine language** (0s and 1s)

### II. Low-Level vs. High-Level Languages

| Type | Description |
| :--- | :--- |
| **Low-level** | Directly interfaces with hardware (CPU). Harder to code. |
| **High-level** | Abstracts hardware constraints; easier for humans. Needs interpretation/compilation. |

### III. Compiled vs. Interpreted Languages
- **Compiled** (e.g., C#, Java, Swift): Converted to low-level machine instructions via a **compiler**
- **Interpreted** (e.g., Python, JavaScript, Ruby): Executed without prior compilation — translation at runtime

### IV. Language Generations (1st to 5th)

| Generation | Description | Example |
| :--- | :--- | :--- |
| 1GL | Machine code (binary) | – |
| 2GL | Assembly language (mnemonics) | – |
| 3GL | High-level, compiled | Java, C#, C++ |
| 4GL | Domain-specific | SQL |
| 5GL | Problem-solving / AI | Creates logic from constraints |

> Most common today: **3GL and 4GL**; AI (5GL) growing.

### V. Code Libraries
- Reusable, pre-written code (e.g., DLLs, JRE)
- Benefits: efficiency, consistency, **security** (if change/config controls are enforced)

### VI. Runtime Environment (Exam Focus)
- **Definition:** Hardware + software resources needed to execute a program
- Includes: server, OS, compilers, interpreters, storage, network
- Requires **resource allocation** and **security controls** (hardening, testing, config management)

### VII. Software Development Kit (SDK)
- Collection of tools to **create, compile, test, debug** applications
- Typically **platform-dependent** (Windows, Linux, mobile)

### VIII. Integrated Development Environment (IDE)
- Provides a **GUI** for the SDK
- Integrates tools, debugging, version control
- Examples: Visual Studio, NetBeans, Eclipse

### IX. Exam Takeaways
- Know programming language types and libraries
- Understand runtime environment and its security impacts
- Know purpose of SDK and IDE

---

## Video V250: Application Security Testing

**Objective:** To explain SAST, DAST, IAST, RASP, and other software testing methods.

### I. Core Focus
- Discover **bugs, flaws, or vulnerabilities** in developed applications (in-house or acquired like COTS)

### II. Two Main Testing Types (Key for Exam)

| Type | Acronym | Execution | Typical Use |
| :--- | :--- | :--- | :--- |
| **Static Application Security Testing** | SAST | Analyzes **code without running** it (static) | In-house developed software (white box) |
| **Dynamic Application Security Testing** | DAST | Analyzes **running application** in production | COTS, open source, acquired products (black box) |

**Link to box testing:**
- White box → Static (SAST) – internal testers, full code access
- Black box → Dynamic (DAST) – external testers, no code access

### III. Other Software Testing Types

| Test Type | Purpose |
| :--- | :--- |
| **System test** | Verify functional & security requirements |
| **Unit test** | Test individual component/script |
| **Integration test** | Ensure two technologies work together without new risks |
| **Regression test** | Ensure changes don't break existing functionality |
| **Sanity test** | Informal check if a feature will work (feasibility) |
| **Smoke test** | Quick check of basic functionality |
| **Fuzz testing** | Inject invalid inputs dynamically to discover flaws |

### IV. Fuzz Testing Details (Dynamic)
- **Mutational fuzzing** ("dumb"): Mutate valid seed data into invalid inputs
- **Generation fuzzing** ("smart/intelligent"): Create invalid data from a data model
- Fuzzers can execute **black, white, or gray box** tests

### V. Advanced Testing Methods
- **IAST (Interactive Application Security Testing):** Analyzes real-time software functionality, runtime behavior, communications (APIs, frameworks)
- **RASP (Runtime Application Self-Protection):** Runs on server, intercepts calls to/from app, validates data requests

### VI. Exam Takeaways
- Understand **SAST vs. DAST**
- Understand **IAST** and **RASP** tools

---

## Video V251: Software Assurance

**Objective:** To explain the OWASP ASVS (Application Security Verification Standard) levels.

### I. Core Concept: Software Assurance
- **Definition:** The level of confidence that software is secure and will function as designed
- **Purpose (CISSP context):** Assess the effectiveness of software security

### II. Key Framework: OWASP ASVS
- **Nature:** Community-driven framework of security requirements and controls
- **Utility:** Helps organizations develop/maintain secure applications based on desired assurance levels

### III. The Three ASVS Assurance Levels

| Level | Name / Focus | Protection Against | Use Case |
| :--- | :--- | :--- | :--- |
| **Level 1** | Low assurance (bare minimum) | Low-effort threats, script kiddies | First step in multi-phase effort |
| **Level 2** | Moderate assurance | Skilled & motivated hackers, most penetration testing | Most applications needing robust defenses |
| **Level 3** | High assurance | Advanced threats (e.g., APT) | Applications whose compromise would severely impact operations |

### IV. Criteria for Determining Assurance Levels
- **Software Development Lifecycle (SDLC):** Effective built-in security process
- **Risk Analysis:** All risks must be known and accepted
- **Change Control:** Tightly controlled, authorized by a CCB
- **Continuous Monitoring:** Ensuring controls remain effective & compliant
- **Data Protection:** Compliance with regulations (GDPR, SOX, HIPAA, etc.)
- **Logging:** Transactions and changes on the software

### V. Exam Takeaways
- Know the different **ASVS levels** (1, 2, 3)
- Understand the **evaluation criteria** of controls for each level

---

## Video V252: Acquired Software Security

**Objective:** To explain acquired software types (COTS, OSS, GOTS, NDI), cloud service models (SaaS, PaaS), and acquisition strategy.

### I. Definition of Acquired Software
- Purchased or leased from a third party → organization has **no security control** over development

### II. Types of Acquired Software

| Type | Description |
| :--- | :--- |
| **COTS** (Commercial Off-the-Shelf) | Purchased/leased, organization manages installation, patching |
| **OSS / FOSS** (Open Source / Free Open Source) | No purchase, but acquired (e.g., GitHub, SourceForge) |
| **GOTS** (Government Off-the-Shelf) | From federal government, government-only license |
| **NDI** (Non-Developmental Items) | Third-party libraries/modules included in COTS/GOTS/OSS → introduces **supply chain risk** |

### III. Leased Software in the Cloud
- **SaaS** (Software as a Service) – provider owns OS & supporting apps; organization controls only **data & access controls**
- **PaaS** (Platform as a Service) – provider owns OS; organization may own the application (but possibly no source code access)

### IV. Key Security Strategy for Acquired Software
- Define an **acquisition policy/process** to minimize security risk
- Understand threats/vulnerabilities specific to the acquired application
- Communicate compliance needs (GDPR, SOX, HIPAA, FISMA) to the vendor

### V. Supply Chain Risk Management
- Investigate trusted vendors/suppliers/providers
- Define **security responsibilities & SLAs** for cloud-based apps
- For SaaS: understand how data is collected, used, transmitted, stored

### VI. Acquisition Controls (per NIST SP 800-160 / 800-64)
1.  **Preparation** – define security requirements in product/service request
2.  **Advertise & select supplier** – choose based on security criteria
3.  **Establish security aspects of agreement** – SLA/contract
4.  **Monitor agreement** – assess execution against SLA
5.  **Accept product/service** – confirm compliance before purchase

### VII. Operational Best Practices
- Implement access controls to prevent unauthorized app installation
- Follow vendor/industry hardening guides
- **Test all acquired products** for vulnerabilities before production
- Monitor acquired apps for **new threats and vulnerabilities**

### VIII. Exam Takeaways
- Understand risks of acquired applications
- Define and follow a good acquisition policy/procedure

---

## Video V253: Application Attacks

**Objective:** To explain injection attacks, hijacking, backdoors, rootkits, privilege escalation, and TOCTOU.

### I. Definition & General Scope
- **Target:** Source-level code flaws
- **Entry Point:** Typically through the user interface of the application

### II. Types of Application Attacks

| Attack Category | Description | Examples |
| :--- | :--- | :--- |
| **Injection Attacks** | Submitting unauthorized queries/code to a backend system | SQL, LDAP, XML, DLL injection |
| **Hijacking Attacks** | Assuming an authorized user's active session | Session hijack, domain hijack |
| **Backdoor Attacks** | Bypassing normal authentication | Developer backdoors, hardcoded credentials |
| **Rootkits** | Malware providing root/administrator-level access | Privilege escalation; detected by HIDS |
| **Privilege Escalation** | Moving from low to high privileges | Horizontal (same level across systems) vs. Vertical (user to admin) |
| **TOCTOU (Time-of-Check, Time-of-Use)** | Exploits race conditions | Intercepting a transaction after check but before use |

### III. Defenses
- Constrained interfaces, access control, input validation
- Source code analysis before deployment
- Host-based intrusion detection (HIDS) for rootkits
- Lock and force integrity for transactions (TOCTOU)

### IV. Exam Takeaways
- Understand each application attack type
- Know how they exploit trust, bypass authentication, escalate privileges, or exploit race conditions

---

## Video V254: OWASP Top 10 – Part 1 (2017, Risks 1–5)

**Objective:** To explain the first five OWASP Top 10 risks (2017 version).

### I. Introduction to OWASP Top 10
- **Focus:** Source code-level vulnerabilities
- **Organization:** Open Web Application Security Project (OWASP)
- **Ranking Basis:** Industry feedback + mapping to MITRE CWE

### II. First 5 Risks (2017)

| Rank | Risk Name | Description | Mitigation |
| :--- | :--- | :--- | :--- |
| **1** | **Injection Attacks** | Sending untrusted data to a command interpreter (SQL, LDAP, XML, DLL) | Escape sequences; stored procedures / whitelisted statements |
| **2** | **Broken Authentication** | Poorly managed user accounts, credentials, or session tokens | Proper identity, access, and session management |
| **3** | **Sensitive Data Exposure** | Failure to protect data in use, transit, or rest | Identify, classify, encrypt, and discard unneeded data |
| **4** | **XML External Entities (XXE)** | Vulnerabilities in XML parsers; external entities manipulate XML processing | Update XML libraries; block external entities & DTDs; use WAF |
| **5** | **Broken Access Control** | Privilege creep leading to unauthorized data exposure | Deny by default, permit by exception; regularly assess privileges |

### III. Exam Takeaways
- Understand these 5 security risks and their necessary mitigations

---

## Video V255: OWASP Top 10 – Part 2 (2017, Risks 6–10)

**Objective:** To explain risks 6–10 of the OWASP Top 10 (2017 version).

### I. Risks 6–10 (2017)

| Rank | Risk Name | Description | Mitigation |
| :--- | :--- | :--- | :--- |
| **6** | **Security Misconfiguration** | Unpatched software, default accounts, lack of hardening | Disable unnecessary services; regular testing; follow best practices |
| **7** | **Cross-Site Scripting (XSS)** | Unauthorized script injected into webpage, executed in victim's browser | Escape sequences; Content Security Policy (CSP) |
| **8** | **Insecure Deserialization** | Lack of control during conversion to/from objects | Digital certificates; sandbox/isolate code; restrict connectivity |
| **9** | **Components with Known Vulnerabilities** | Using libraries/OS with known vulnerabilities | Research CVEs; continuous monitoring; compensating controls |
| **10** | **Insufficient Logging & Monitoring** | Prevents discovery of threats and attacks | Log all changes to critical services, privileges, accounts, communications |

### II. XSS Types (Exam Focus)
- **Stored XSS:** Malicious script stored on target server
- **Reflected XSS:** Malicious script comes from victim's HTTP request
- **DOM-based XSS:** Modifies DOM environment to execute injected code

### III. Exam Takeaways
- Understand each risk and its mitigation strategies

---

## Video V256: OWASP Top 10 – Part 3 (2021 Updates)

**Objective:** To explain the new risks in the 2021 OWASP Top 10.

### I. New Risks in 2021 (A04, A08, A10)

| Rank | Risk Name | Description | Mitigation |
| :--- | :--- | :--- | :--- |
| **A04** | **Insecure Design** | Ineffective security/privacy controls in design phase | Regular risk analysis; threat modeling; secure system design |
| **A08** | **Software and Data Integrity Failures** | Lack of integrity protection in software code | Restrict automated updates; use trusted vendors; digital signatures; follow CM process |
| **A10** | **Server-Side Request Forgery (SSRF)** | Server accesses remote resources without validating URL | Validate client input; whitelist web addresses and ports; permit by exception |

### II. Related Concept: CSRF (Cross-Site Request Forgery)
- Victim executes unwanted actions on an authenticated web app
- Exploits pre-authenticated session between client and server

### III. Defenses Against SSRF
- Validate client-provided input
- Whitelist allowed web addresses and ports (e.g., only HTTPS on port 443)
- Permit traffic by exception; deny everything else by default

### IV. Exam Takeaways
- Understand the new 2021 risks (A04, A08, A10)
- Know mitigations for each

---

## Video V257: Software API Security

**Objective:** To explain API types, protocols, and security concepts.

### I. Definition & Purpose of APIs
- **API** = Application Programming Interface – connects software applications and services directly
- Improves integration and user experience (SSO, payment gateways, social media)

### II. Common API Commands
- **GET** – retrieve a resource
- **POST** – create a new resource
- **PUT** – edit/update a resource
- **DELETE** – remove a resource

### III. Types of APIs

| Type | Description | Security Implication |
| :--- | :--- | :--- |
| **Public/Open** | Anyone can connect via HTTP | High risk (open access) |
| **Private/Internal** | Internal use only (behind firewall) | Lower risk, controlled |
| **Partner** | Available only to selected entities | Requires authorization |
| **Composite** | Combines multiple requests into one call | Efficiency but complexity |

### IV. API Protocols (for awareness)
- **SOAP** – older, XML only
- **REST** – common since 2000s
- JSON-RPC, gRPC, Protocol Buffers

> Exam focus: SOAP and REST

### V. API Security Key Concepts
- **API keys** – long, complex passwords for authentication/authorization
- **Mutual authentication** – can use SSH/TLS
- **Protect data types** – know what sensitive data is exchanged
- **Testing** – include APIs in software tests
- **Least privilege** – limit size/number of accessible resources
- **Input validation** – reject invalid inputs/requests
- **Logging & monitoring** – detect misuse or threats

### VI. Exam Takeaways
- Understand the **purpose** of an API
- Know basic API security concepts

---

## Video V258: Secure Coding Practices

**Objective:** To explain general secure coding practices.

### I. Context & Scope
- Secure coding reduces security risks in developed software
- Focus: **in-house / organization-developed software** (not acquired products)
- Key reference: **OWASP Secure Coding Practices Quick Reference Guide**

### II. General Secure Coding Practices

| Practice | Description |
| :--- | :--- |
| **Code Control & Integrity** | Prevent unmanaged/unapproved code; use change control; restrict unauthorized code creation/altered; verify integrity of acquired code/libraries with hashes/checksums |
| **Cryptography** | Use modern, unbroken cryptographic ciphers for encrypted communications |
| **Error & Memory Management** | Proper error handling for inputs/outputs (prevents injection, buffer overflows, DoS); manage memory properly (prevents memory leaks and DoS) |
| **Credentials & Privileges** | Avoid hardcoded credentials (passwords, tokens); restrict privileged escalation (root/admin) unless absolutely necessary |

### III. Exam Takeaways
- Understand and apply these **general secure coding practices**

---

## Video V259: Software-Defined Security

**Objective:** To explain security as code, configuration as code, policy as code, and DevSecOps integration.

### I. Definition
- **Software-defined security** = security functions included as part of developed software (code)
- Started with virtualizing security functions (firewalls, IDS/IPS, appliances)

### II. Related Software-Defined Concepts
- **Software-Defined Networking (SDN)** – virtualized network resources
- **Infrastructure as Code** – software-defined infrastructure, provisioning, automation
- **Software-Defined Data Center** – virtualizes all infrastructure resources

### III. Implementing Security as Code
- **Security as Code** = building security processes into DevOps or other development workflows
- Typically part of **DevOps / CI/CD** → called **DevSecOps**

### IV. Key Techniques
- **Configuration as Code** – standardize and apply approved configurations → create a **gold image** (hardened, compliant, immutable)
- **Policy as Code** – combines infrastructure as code + configuration as code + access controls/policies → ensures immutability
- Changes require proper change control and configuration management

### V. Best Practices & Considerations
- Identify which security controls can be implemented as code (not all can)
- Insert **gates** (security checks/tests) at vulnerable points in the pipeline
- Gates do **not** slow the pipeline; they identify and report issues for human review
- Regularly test security-as-code products as part of SDLC/DevOps
- Perform compliance assessments as part of continuous delivery

### VI. Exam Takeaways
- Understand the purpose of software-defined security
- Follow security-as-code best practices

---

## Session 33 Summary

Session 33 covers the **complete application security landscape** for the CISSP exam (Objectives 8.2, 8.3, 8.4, 8.5). Key takeaways include:

1. **Programming Languages (V249):** Low-level (hardware) vs. High-level (abstracted). Compiled (C#, Java) vs. Interpreted (Python, JS). Generations: 1GL (machine), 2GL (assembly), 3GL (high-level), 4GL (domain-specific, SQL), 5GL (AI). Runtime environment (hardware + software). SDK (tools) vs. IDE (GUI for SDK).

2. **Application Security Testing (V250):** SAST (static, white box, code not running) vs. DAST (dynamic, black box, running app). IAST (real-time), RASP (runtime self-protection). Fuzzing: mutation (dumb) vs. generation (smart).

3. **Software Assurance (V251):** OWASP ASVS levels: Level 1 (low, script kiddies), Level 2 (moderate, skilled hackers), Level 3 (high, APT). Evaluation criteria: SDLC, risk analysis, change control, continuous monitoring, data protection, logging.

4. **Acquired Software Security (V252):** COTS (commercial), OSS/FOSS (open source), GOTS (government), NDI (third-party libraries – supply chain risk). SaaS (provider owns OS/apps), PaaS (provider owns OS). Acquisition policy, SLA, vendor vetting, testing before production.

5. **Application Attacks (V253):** Injection (SQL, LDAP, XML, DLL), Hijacking (session, domain), Backdoors (hardcoded credentials), Rootkits (detected by HIDS), Privilege Escalation (horizontal vs. vertical), TOCTOU (race conditions).

6. **OWASP Top 10 – Part 1 (2017, V254):** Injection, Broken Authentication, Sensitive Data Exposure, XXE, Broken Access Control.

7. **OWASP Top 10 – Part 2 (2017, V255):** Security Misconfiguration, XSS (stored/reflected/DOM), Insecure Deserialization, Components with Known Vulnerabilities, Insufficient Logging & Monitoring.

8. **OWASP Top 10 – Part 3 (2021, V256):** A04 Insecure Design, A08 Software and Data Integrity Failures, A10 SSRF (Server-Side Request Forgery). CSRF related.

9. **Software API Security (V257):** API types: Public (high risk), Private (lower risk), Partner (authorization required), Composite. Protocols: SOAP, REST. Security: API keys, mutual authentication, least privilege, input validation, logging.

10. **Secure Coding Practices (V258):** Code control/integrity (change control, hashes), modern crypto, error/memory management, no hardcoded credentials, restrict privilege escalation.

11. **Software-Defined Security (V259):** Security as Code (DevSecOps, CI/CD). Configuration as Code (gold image, immutable). Policy as Code. Gates (security checks) at vulnerable points. Regular testing and compliance assessments.

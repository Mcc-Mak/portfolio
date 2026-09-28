### Video V188: Vulnerability Assessments (SCAP, CVSS, CVE, CPE)

```mermaid
graph TD
    subgraph Purpose
        VA[Vulnerability Assessment<br/>Goal: Identify and categorize security flaws/weaknesses<br/>Benefits: Understand risks, prioritize response]
    end

    subgraph Prerequisite
        Inventory[Accurate System Inventory<br/>Hardware, software, firmware<br/>Manufacturer, product name, version]
    end

    subgraph Vulnerability Management Process
        V1[1. DETECT potential vulnerabilities]
        V2[2. VALIDATE impact using inventory]
        V3[3. REMEDIATE fix/reduce vulnerability]
    end

    subgraph SCAP - Security Content Automation Protocol
        SCAP_Dev[Developer: NIST - SP 800-126<br/>Purpose: Standardized reporting for vulnerabilities & config]
        
        subgraph Languages
            XCCDF[XCCDF - Extensible Configuration Checklist Description Format<br/>Security checklist/benchmark results - MOST COMMON]
            OVAL[OVAL - Open Vulnerability and Assessment Language<br/>Configuration info, machine states, assessment results]
            OCIL[OCIL - Open Checklist Interactive Language<br/>Info from people or existing data stores - less common]
        end
        
        subgraph Identification Schemes
            CPE[CPE - Common Platform Enumeration<br/>Defines: Hardware, OS, applications]
            SWID[SWID - Software Identification<br/>Defines: Software identifier + metadata]
            CCE[CCE - Common Configuration Enumeration<br/>Defines: Dictionary of software security configs]
            CVE[CVE - Common Vulnerabilities and Exposures<br/>Defines: Security-related software flaws]
        end
        
        subgraph Scoring Systems
            CVSS[CVSS - Common Vulnerability Scoring System<br/>Severity score for a flaw - MOST COMMON]
            CCSS[CCSS - Common Configuration Scoring System<br/>Severity for a configuration issue]
        end
    end

    subgraph Sources
        Sources[NIST NVD, Mitre CVE, US-CERT, Vendor bulletins]
    end

    subgraph Tools
        Tools[OpenSCAP Unix/Linux, Tripwire, Nessus, InsightVM]
    end

    VA --> Inventory --> V1 --> V2 --> V3
    V3 --> SCAP_Dev
    SCAP_Dev --> XCCDF --> OVAL --> OCIL
    OCIL --> CPE --> SWID --> CCE --> CVE
    CVE --> CVSS --> CCSS
    CCSS --> Sources --> Tools
```

---

### Video V189: Vulnerability Scanning

```mermaid
graph TD
    subgraph Definition
        VS[Vulnerability Scanning<br/>Using automated tools to identify & categorize vulnerabilities<br/>Tools: Nessus, InsightVM, OpenVAS, Nmap, Qualys, Nikto, Tripwire]
    end

    subgraph Scan Types by Access Level
        NonCred[Non-credentialed<br/>Read-only, general user access<br/>Fast but limited results]
        Cred[Credentialed - Authenticated<br/>Logs in with privileged credentials<br/>Thorough: patching levels, configs]
    end

    subgraph Discovery Scans - Nmap
        Disc[Goal: Find active hosts on IP range/subnet<br/>NOT vulnerabilities]
        SYN[SYN scan - half-open TCP handshake<br/>Sends SYN, waits for SYN/ACK]
        PortStatus[Port statuses: Open, Closed, Unknown/Filtered - blocked by firewall]
    end

    subgraph Other Scan Techniques
        ACK[ACK scan - Sends ACK packet<br/>Tests for firewalls and filtered ports]
        Xmas[Xmas scan - Sends PSH, URG, FIN flags<br/>All except SYN/ACK]
        UDP[UDP scan - Checks UDP services<br/>No handshake, connectionless]
    end

    subgraph Best Practices
        BP1[Communicate clearly: what, when, how long]
        BP2[Run during off-hours / low activity]
        BP3[Keep scanners updated with latest vendor signatures]
        BP4[Scan small host groups - /24 networks]
        BP5[Test scanner configs in dev/test/sandbox first]
        BP6[Avoid tools that auto-apply remediations]
    end

    subgraph Important Rule
        Rule[Do NOT fix anything without approval<br/>Can impact production, change control]
    end

    VS --> NonCred
    VS --> Cred
    Cred --> Disc
    Disc --> SYN --> PortStatus
    PortStatus --> ACK --> Xmas --> UDP
    UDP --> BP1 --> BP2 --> BP3 --> BP4 --> BP5 --> BP6
    BP6 --> Rule
```

---

### Video V190: Penetration Testing (Concepts, Teams, BAS)

```mermaid
graph TD
    subgraph Definition
        PT[Penetration Testing<br/>Simulates system attack by exploiting vulnerabilities<br/>Scope: Physical locks/doors/guards OR logical software/network<br/>Perspective: Attacker's point of view]
    end

    subgraph Rules of Engagement - ROE
        ROE[Agreement defining how and why test is conducted<br/>Elements: Scope, test objectives, permitted techniques<br/>Reporting requirements<br/>Purpose: Legal protection for testers and organization]
    end

    subgraph Types of Penetration Tests
        White[White box - Full-knowledge<br/>All details known to testers<br/>Cheapest]
        Black[Black box - No/zero knowledge<br/>No test details shared<br/>Most expensive]
        Gray[Gray box - Partial knowledge<br/>Some info provided, some withheld<br/>Middle ground]
    end

    subgraph Teams
        Red[Red Team - Simulates the attacker]
        Blue[Blue Team - Defends against attack<br/>SOC, security analysts]
        Purple[Purple Team - Collaboration between red and blue<br/>Strengthen security posture]
    end

    subgraph BAS - Breach and Attack Simulation
        BAS[Automated testing to determine if<br/>security controls can detect and respond to threats<br/>Method: Synthetic transactions, attack simulations<br/>SYN scans, brute force<br/>Deployment: Agent-based or agent-less<br/>Example: FireEye Mandiant]
    end

    subgraph Popular Distributions
        Distros[Kali Linux - most popular<br/>Parrot OS, BlackArch, Core Impact, BAC BOX]
    end

    PT --> ROE
    ROE --> White
    White --> Black
    Black --> Gray
    Gray --> Red
    Red --> Blue
    Blue --> Purple
    Purple --> BAS
    BAS --> Distros
```

---

### Video V191: Penetration Testing Phases

```mermaid
flowchart LR
    subgraph Phase 1 - Discovery
        P1[Discovery / Reconnaissance<br/>PASSIVE - undetected<br/>OSINT, footprinting<br/>Goal: Collect info without interacting with system]
    end

    subgraph Phase 2 - Scanning
        P2[Scanning<br/>ACTIVE - detectable<br/>Ping sweeps, port scans, banner grabs<br/>Vulnerability scans, enumeration<br/>Goal: Find vulnerabilities/weaknesses]
    end

    subgraph Phase 3 - Exploitation
        P3[Exploitation<br/>ACTIVE<br/>Manual or automated tools - Metasploit<br/>Goal: Bypass security controls, avoid IoCs]
    end

    subgraph Phase 4 - Post-Exploitation
        P4[Post-Exploitation<br/>ACTIVE<br/>Pivot laterally, maintain access, cover tracks<br/>Goal: Maintain access, erase evidence]
    end

    subgraph Phase 5 - Reporting
        P5[Reporting<br/>DOCUMENTATION<br/>Executive summary, technical report<br/>Goal: Document findings and remediations]
    end

    subgraph Post-Test Cleanup
        Cleanup[Recover crashed/disrupted hosts<br/>Remove tools, scripts, outputs<br/>Leave system in same condition as found]
    end

    P1 --> P2 --> P3 --> P4 --> P5 --> Cleanup
```

---

### Video V192: Log Reviews

```mermaid
graph TD
    subgraph Definition
        Log[Log - record of system-related changes and events<br/>Chronological order<br/>Audit log / audit trail - used to audit system events]
    end

    subgraph Syslog Standard
        Syslog[Syslog - standardized format for consistent log data<br/>Facility codes: 4 = auth/authorization<br/>Severity levels: 0 = most info, 7 = least info<br/>Weakness: No built-in authentication → weak security]
    end

    subgraph Clock Synchronization - NTP
        NTP[NTP - Network Time Protocol<br/>Port 123, UDP, connectionless<br/>Critical for accurate chronological audit trails]
        Stratum[Stratum 0: GPS, atomic clocks - most accurate<br/>Stratum 1: network appliance<br/>Stratum 2: individual computers<br/>For logging: use Stratum 0 or 1, NOT Stratum 2]
    end

    subgraph Log Protection & Best Practices
        BP1[Send logs to remote log server/repository<br/>Prevents local tampering]
        BP2[Set proper file/directory privileges<br/>Read access allowed, no modification/deletion]
        BP3[Use hashing to ensure data integrity]
        BP4[Periodically test and assess log capabilities for compliance]
    end

    Log --> Syslog
    Syslog --> NTP --> Stratum
    Stratum --> BP1 --> BP2 --> BP3 --> BP4
```

---

### Video V193: Software Testing Methods

```mermaid
graph TD
    subgraph Purpose
        Purpose[Software Testing<br/>Verify functionality & configuration<br/>Find flaws, defects, vulnerabilities, security risks]
    end

    subgraph Three Main Testing Methods - Knowledge Based
        White[White Box<br/>Full working knowledge - source code known<br/>Context: Internal testing team]
        Black[Black Box<br/>No working knowledge - user perspective<br/>Context: External auditors / assessments]
        Gray[Gray Box<br/>Combination - some known, some unknown<br/>Context: Mixed internal/external testing]
    end

    subgraph Specific Test Types - Outcome Focused
        System[System / Acceptance<br/>Verifies functional & security requirements, customer needs]
        Unit[Unit<br/>Specific component - script, module]
        Integration[Integration<br/>How ≥2 technologies work together]
        Regression[Regression<br/>Ensures new changes don't break existing functionality]
        Sanity[Sanity<br/>Quick check if feature works as expected - early R&D]
        Smoke[Smoke<br/>Quick assessment of basic functionality after build]
        Fuzz[Fuzz - Fuzzing<br/>Dynamic test with invalid inputs to find crashes, overflows, flaws]
    end

    subgraph Fuzz Testing Details
        Mutation[Mutation Fuzzing - dumb fuzzing<br/>Modifies valid operational data - seed data<br/>Creates invalid inputs]
        Generational[Generational Fuzzing - smart/intelligent<br/>Creates data from an input model<br/>Generates invalid inputs]
    end

    Purpose --> White
    White --> Black
    Black --> Gray
    Gray --> System --> Unit --> Integration --> Regression --> Sanity --> Smoke --> Fuzz
    Fuzz --> Mutation
    Fuzz --> Generational
```

---

### Video V194: Software Code Reviews (Static, Dynamic, Fagan)

```mermaid
graph TD
    subgraph Definition
        CR[Code Review<br/>Reviewing developed software code to find flaws, defects<br/>Vulnerabilities, security risks<br/>Goal: Discover and resolve flaws before production/operations]
    end

    subgraph Two Types of Code Reviews
        Static[Static Code Review - SAST<br/>Analyzing code WITHOUT executing it]
        Dynamic[Dynamic Code Review - DAST<br/>Analyzing code WHILE it runs<br/>Production/operational environment]
    end

    subgraph Fagan Inspection Process
        F1[1. PLANNING<br/>Organize and prepare for review]
        F2[2. OVERVIEW<br/>Determine scope of review]
        F3[3. PREPARATION<br/>Define roles, responsibilities, expected outcomes]
        F4[4. INSPECTION<br/>Analyze code to identify actual flaws]
        F5[5. REWORK<br/>Determine remediation for confirmed flaws]
        F6[6. FOLLOW-UP<br/>Verify flaw remediation has been applied]
    end

    CR --> Static
    CR --> Dynamic
    Static --> F1 --> F2 --> F3 --> F4 --> F5 --> F6
    Dynamic --> F1
```

---

### Video V195: Misuse Testing (Abuse Case Testing)

```mermaid
graph TD
    subgraph Definition
        Misuse[Misuse Testing - Abuse Case Testing<br/>Simulating system misuse from attacker/user perspective<br/>Goal: Determine how user/attacker could misuse/abuse system]
    end

    subgraph Steps
        S1[1. IDENTIFY critical assets<br/>Business functions, apps, services]
        S2[2. CATEGORIZE & PRIORITIZE what to test]
        S3[3. DEFINE security goals<br/>Expected outcomes, what needs protection]
        S4[4. IDENTIFY threats that pose risk to critical assets]
        S5[5. ANALYZE risks from threat modeling/risk analysis]
        S6[6. DEFINE security requirements<br/>Prioritize what to defend]
    end

    subgraph UML
        UML[Unified Modeling Language diagrams<br/>Maps interactions of legitimate users vs attackers]
    end

    Misuse --> S1 --> S2 --> S3 --> S4 --> S5 --> S6
    S6 --> UML
```

---

### Video V196: Interface Testing (API, UI, Physical)

```mermaid
graph TD
    subgraph Definition
        IT[Interface Testing<br/>Testing system interconnections used to exchange data]
    end

    subgraph Types of Interfaces
        API[API - Application Programming Interface<br/>How software apps talk to servers/other apps]
        UI[User Interface<br/>How users interact with systems<br/>Web apps, SIEM, vulnerability scanner]
        Physical[Physical Interfaces<br/>Cables, wireless connections<br/>Switches, routers, firewalls]
    end

    subgraph Testing Approach
        Approach[Understand HOW data is exchanged across interface<br/>Validate security controls and secure information flow]
    end

    subgraph Test Focus Areas
        Focus[Can target Confidentiality, Integrity, or Availability<br/>One or all three<br/>Examines response to valid inputs, invalid inputs, errors, failures]
    end

    subgraph When Performed
        When[During system development, security assessments, security audits]
    end

    IT --> API
    IT --> UI
    IT --> Physical
    API --> Approach
    UI --> Approach
    Physical --> Approach
    Approach --> Focus --> When
```

---

### Video V197: Compliance Testing (SOC, PCI DSS, CSA STAR)

```mermaid
graph TD
    subgraph Definition
        CT[Compliance Testing<br/>Ensuring organization adheres to security standards, practices, regulations<br/>Purpose: Identify vulnerabilities, demonstrate data protection commitment, due diligence]
    end

    subgraph SOC Reports - SSAE 18
        SOC1[SOC 1 - Internal Control over Financial Reporting - ICFR<br/>Used for SOX compliance<br/>Distribution: Restricted to management/auditors]
        SOC2[SOC 2 - Security, availability, integrity, confidentiality, privacy<br/>Trust Service Criteria<br/>Distribution: Highly restricted - NDA required]
        SOC3[SOC 3 - General use, public summary of SOC 2 Type II<br/>Distribution: Freely distributable]
        
        subgraph Types - SOC 1 & 2
            TypeI[Type I - Point-in-time evaluation snapshot<br/>Suitability of control design]
            TypeII[Type II - Over period of time 4-6 months<br/>Operating effectiveness]
        end
    end

    subgraph PCI DSS Merchant Levels
        L1[Level 1: >6M transactions/year<br/>ROC by QSA - Qualified Security Assessor]
        L2[Level 2: 1-6M transactions/year<br/>SAQ - Self-Assessment Questionnaire]
        L3[Level 3: 20,000 - 1M transactions/year<br/>SAQ]
        L4[Level 4: <20,000 transactions/year<br/>SAQ]
    end

    subgraph CSA STAR Assurance Levels
        CSA1[Level 1 - Self-assessment<br/>Low-risk deployments, no regulated data]
        CSA2[Level 2 - Third-party audit<br/>Medium/high-risk deployments or regulated data]
    end

    CT --> SOC1
    CT --> SOC2
    CT --> SOC3
    SOC1 --> TypeI
    SOC1 --> TypeII
    SOC2 --> TypeI
    SOC2 --> TypeII
    TypeII --> L1 --> L2 --> L3 --> L4
    L4 --> CSA1 --> CSA2
```

---

### Video V198: Test Coverage Analysis

```mermaid
graph TD
    subgraph Definition
        TCA[Test Coverage Analysis<br/>Estimating level of testing performed on a product<br/>Calculation: test cases executed / total possible test cases<br/>Gives level of confidence in product correctness and safety]
    end

    subgraph Coverage Criteria
        Branch[Branch coverage<br/>Ensures every decision branch has been tested<br/>Parallel code versions]
        Condition[Condition coverage<br/>All logical conditions in routines/subroutines tested]
        Functional[Functional coverage<br/>Every program function has been tested]
        Loop[Loop coverage<br/>All loop statements tested<br/>Prevents infinite loops & DoS]
        Statement[Statement coverage<br/>Every code statement has been tested]
    end

    subgraph Coverage Levels
        Levels[Determined by criticality of application<br/>and sensitivity of data processed<br/>Priority: Personal safety > security > data/system protection]
    end

    TCA --> Branch
    Branch --> Condition
    Condition --> Functional
    Functional --> Loop
    Loop --> Statement
    Statement --> Levels
```

---

### Video V199: Analyzing Test Results

```mermaid
graph TD
    subgraph Purpose
        Analyze[Analyzing Test Results<br/>After security assessment/test, output/report generated<br/>Goal: Analyze tool outputs, test procedures, errors, lessons learned]
    end

    subgraph Types of Reports
        AR[Assessment report - approach & findings<br/>Control tests, privacy impact assessments]
        AuditR[Audit report - compliance-related tests<br/>Self-assessments, third-party audits]
        Both serve ETHICAL DISCLOSURE - responsibility to report vulnerabilities]
    end

    subgraph Core Report Contents
        ExecSum[Executive summary - for senior management<br/>Business impacts, critical findings, recommendations]
        Threats[Threats & vulnerabilities - all findings<br/>Reference CVEs, NVD, vendor patches]
        Criticality[Criticality/importance - severity critical/high<br/>+ likelihood of occurrence]
        Impact[Exposure factor / potential impact<br/>Percentage of asset loss if exploited]
        Remediation[Remediations / fix actions - specific recommendations<br/>Patching, config changes]
        Exceptions[Exceptions - known non-compliant items<br/>Excluded from testing]
    end

    subgraph Remediation Guidelines
        RG1[Recommend how to correct or apply compensating controls]
        RG2[NEVER fix without authorization - violates change control]
        RG3[Present recommendations to owners/management<br/>Then execute per organizational policy]
    end

    subgraph Exception Handling
        EH[Exclusions for known findings that won't be fixed<br/>Within required timeframe<br/>Reduces time, energy, cost in analysis]
    end

    Analyze --> AR
    Analyze --> AuditR
    AR --> ExecSum --> Threats --> Criticality --> Impact --> Remediation --> Exceptions
    AuditR --> ExecSum
    Remediation --> RG1 --> RG2 --> RG3
    Exceptions --> EH
```

---

### Bonus: Session 26 Complete Concept Map

```mermaid
mindmap
  root((Conducting Security Testing<br/>CISSP 6.2, 6.4))
    Vulnerability Assessments
      SCAP: XCCDF, OVAL, OCIL
      Schemes: CPE, SWID, CCE, CVE
      Scoring: CVSS, CCSS
    Vulnerability Scanning
      Credentialed vs Non-credentialed
      Discovery: SYN, ACK, Xmas, UDP
      Best practices: off-hours, small groups, no auto-remediation
    Penetration Testing
      White/Black/Gray box
      Teams: Red, Blue, Purple
      BAS - Breach Attack Simulation
    Pen Testing Phases
      Discovery → Scanning → Exploitation → Post-Exploitation → Reporting
      Post-test cleanup
    Log Reviews
      Syslog: facility codes, severity levels
      NTP: Stratum 0/1 for logging
      Protection: remote server, hashing, access controls
    Software Testing
      White/Black/Gray box
      Unit, Integration, Regression, Sanity, Smoke
      Fuzzing: Mutation, Generational
    Code Reviews
      Static SAST vs Dynamic DAST
      Fagan: Planning → Overview → Preparation → Inspection → Rework → Follow-up
    Misuse Testing
      Abuse case testing
      UML diagrams
    Interface Testing
      API, User Interface, Physical
      Validate data exchange and security controls
    Compliance Testing
      SOC 1/2/3, Type I/II
      PCI DSS: Level 1 ROC+QSA, Levels 2-4 SAQ
      CSA STAR: Level 1 self, Level 2 third-party
    Test Coverage Analysis
      Branch, Condition, Functional, Loop, Statement coverage
    Analyzing Test Results
      Executive summary, technical details
      Ethical disclosure, remediation authorization, exceptions
```
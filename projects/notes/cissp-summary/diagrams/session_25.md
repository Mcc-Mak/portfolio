### Video V181: Security Test and Assessment Planning

```mermaid
graph TD
    subgraph Core Concepts
        Goal[Goal: Verify security controls provide proper protection level]
        Distinction[Terms: test, assessment, audit - often used interchangeably<br/>But have different purposes]
    end

    subgraph Security Test vs Security Assessment
        Test[SECURITY TEST<br/>Focus: Specific function of a control<br/>What it verifies: Performance & effectiveness<br/>Depth: Narrow, specific<br/>Output: Identifies flaws in one function]
        
        Assessment[SECURITY ASSESSMENT<br/>Focus: Overall risk of system/component/app<br/>What it verifies: Security posture against policy<br/>Depth: Broad, in-depth<br/>Output: Report for senior managers/stakeholders]
    end

    subgraph Test & Assessment Strategy
        S1[Scope: What is included?<br/>New server vs compliance requirement]
        S2[Impact of failure: Critical business function/asset?]
        S3[Resources: Admins, engineers, developers, tools, licenses]
        S4[Test criteria: Define success/failure, best execution method]
        S5[Approval: Document plan to gain senior manager buy-in]
    end

    subgraph Security Audits
        Audit[Security Audit - a type of assessment<br/>Key feature: Independent body → impartial view<br/>Purpose: Compliance with governance/regulations<br/>Critical: Configuration management & change control]
        
        subgraph Types of Audits
            Internal[INTERNAL<br/>Internal personnel - no reporting to security managers<br/>Reports to: Executive officer CEO, CIO, CISO<br/>Use: Self-audit before external audit]
            
            External[EXTERNAL<br/>Outside organization<br/>Reports to: Executive officer - may recruit internal help<br/>Use: Eliminates conflict of interest]
            
            Third[THIRD-PARTY<br/>Outside team on behalf of another org<br/>Reports to: Outside organization accrediting body<br/>Use: Compliance, contracts, acquisitions - neutral]
        end
    end

    Goal --> Distinction
    Distinction --> Test
    Distinction --> Assessment
    Test --> S1 --> S2 --> S3 --> S4 --> S5
    Assessment --> S1
    S5 --> Audit
    Audit --> Internal --> External --> Third
```

---

### Video V182: Performance and Risk Indicators (KPIs, KRIs)

```mermaid
graph TD
    subgraph Purpose
        Indicators[Indicators used during security assessments/tests<br/>Identify potential FAILURE or SUCCESS]
    end

    subgraph Two Main Types
        KPI[KPI - Key Performance Indicator<br/>Measures SECURITY PERFORMANCE]
        KRI[KRI - Key Risk Indicator<br/>Measures KNOWN SECURITY RISKS]
    end

    subgraph Measurement Examples
        M1[Risk assessment/analysis results<br/>Quantitative or qualitative]
        M2[Vulnerability assessment results<br/>Number & severity of vulnerabilities]
        M3[Security assessment test procedure results]
        M4[Security incident occurrences<br/>Response time, recovery, evidence handling]
        M5[Patch level compliance]
    end

    subgraph Interplay KPIs & KRIs
        Interplay[Example: Low patching frequency<br/>KPI shows poor performance<br/>→ Increases vulnerabilities<br/>KRI shows elevated risk]
    end

    subgraph Real-Time Monitoring
        SIEM[SIEM - Splunk, AlienVault<br/>Dashboards track: account status, logins<br/>Threats, vulnerabilities, SLA compliance]
    end

    subgraph Reference Guides
        NIST[NIST SP 800-55 - Performance Measurement Guide]
        ISO[ISO 27004 - Monitoring, measurement, analysis, evaluation]
        ITIL[ITIL - Security management]
    end

    Indicators --> KPI
    Indicators --> KRI
    KPI --> M1 --> M2 --> M3 --> M4 --> M5
    KRI --> M1
    M5 --> Interplay
    Interplay --> SIEM
    SIEM --> NIST --> ISO --> ITIL
```

---

### Video V183: Collecting Security Process Data

```mermaid
graph TD
    subgraph Purpose
        Purpose[Support security tests, assessments, or audits<br/>Provide evidence for management approval<br/>Quality depends on proper inputs]
    end

    subgraph Triple Constraint - Quality Determinants
        Scope[Scope - what is being tested]
        Time[Time - duration available for testing]
        Cost[Cost - resources/funding required]
    end

    subgraph Types of Data to Collect
        Admin[ADMINISTRATIVE DATA<br/>Policies, processes, procedures, records<br/>Logs, archive data<br/>Data from other departments: Finance, HR]
        
        Tech[TECHNICAL DATA<br/>System logs, software code<br/>Configuration files<br/>Change management records<br/>System diagrams, data flow diagrams]
    end

    subgraph Role of Management
        Mgmt1[Resource allocation<br/>Admins, engineers, architects]
        Mgmt2[Understanding<br/>Clear communication of purpose and scope]
        Mgmt3[Formal approval<br/>Documented in policy, procedure, or change control]
    end

    subgraph Documentation Requirements
        Docs[Expected outcomes<br/>Schedule start/end dates and times<br/>Risk exceptions<br/>Out-of-scope items]
    end

    Purpose --> Scope
    Scope --> Time
    Time --> Cost
    Cost --> Admin
    Admin --> Tech
    Tech --> Mgmt1 --> Mgmt2 --> Mgmt3
    Mgmt3 --> Docs
```

---

### Video V184: Account Management Data

```mermaid
flowchart LR
    subgraph Core Concept
        Concept[Accounts = identities + authenticators<br/>Critical components of security assessments<br/>Goal: Ensure authorized subjects maintain proper privilege levels<br/>Avoid privilege creep]
    end

    subgraph Account Management Lifecycle
        Creation[CREATION<br/>Obtain list of system accounts<br/>Centralized: AD, LDAP, RADIUS, TACACS<br/>Local auth<br/>Review authorized/unauthorized accounts<br/>Examine logs for creation details<br/>Possible insider threat]
        
        Modification[MODIFICATION<br/>Review logs to verify account actions captured correctly<br/>Check that provisioning adding privileges<br/>and de-provisioning removing privileges are logged]
        
        Auditing[AUDITING<br/>Regularly - annually or per policy/regulation<br/>Review accounts for proper privilege levels<br/>Identify non-compliant accounts<br/>Inactive but not disabled → recommend disable<br/>Long-disabled → archive or delete]
        
        Deletion[DELETION / REVOCATION<br/>Recommend access revocation<br/>De-provisioning or deletion based on audit findings<br/>Follow governance/regulatory retention periods<br/>3, 5, 7 years]
    end

    Concept --> Creation --> Modification --> Auditing --> Deletion
```

---

### Video V185: Verifying Training and Awareness

```mermaid
graph TD
    subgraph Purpose & Context
        Context[Part of Security Assessment / Security Test data collection<br/>Focuses on ADMINISTRATIVE CONTROLS<br/>Training & Awareness]
    end

    subgraph Key Definitions
        Awareness[Awareness: Raising attention to foundational security<br/>Employee responsibilities]
        Training[Training: Teaching personnel how to perform duties SECURELY]
    end

    subgraph Data Collection Focus - Training Records
        DR1[Map training records to specific training objectives<br/>Anti-phishing]
        DR2[Review KPIs & KRIs for training]
        DR3[Understand compliance requirements per objective]
        DR4[Handle sensitive data carefully - remove employee IDs]
    end

    subgraph Assessment Goals
        G1[Determine if security is being met via current training]
        G2[Identify emerging threats, new vulnerabilities, missing risks<br/>Due diligence]
        G3[Check attendance and completion rates]
    end

    subgraph Handling Non-Compliance
        NC1[Identify non-compliant personnel and frequent offenders]
        NC2[Apply remedial training - makeup sessions, on-demand]
        NC3[Consider revoking privileges/access until training complete]
    end

    subgraph Exam Takeaways
        TA[Auditing training & awareness provides situational awareness<br/>of program effectiveness<br/>Reflects DUE CARE creating training<br/>and DUE DILIGENCE updating training]
    end

    Context --> Awareness
    Awareness --> Training
    Training --> DR1 --> DR2 --> DR3 --> DR4
    DR4 --> G1 --> G2 --> G3
    G3 --> NC1 --> NC2 --> NC3
    NC3 --> TA
```

---

### Video V186: Disaster Recovery and Business Continuity Data

```mermaid
graph TD
    subgraph Core Concepts
        BC[BC - Business Continuity<br/>Assessing and minimizing risks to<br/>critical business processes during major disruptions]
        DR[DR - Disaster Recovery<br/>Processes/procedures to RECOVER<br/>those critical processes after disruption]
        Simple[BC = business functions<br/>DR = information technology]
    end

    subgraph Key Documents & Artifacts
        Docs[BCP & DR Plan - obtain copies if they exist<br/>Latest test results - identify age<br/>2-year-old results → remediation needed]
    end

    subgraph Types of DR Tests
        Checklist[Checklist / Read-through<br/>Individual review of plan<br/>Focus: Gaps in review/comments]
        
        Tabletop[Structured walkthrough / Tabletop<br/>Team reviews together<br/>Focus: Issues in controls, redundancy, HA]
        
        Simulation[Simulation test<br/>Scenario-based natural/manmade disaster<br/>Focus: Remedial steps identified & fixed]
        
        Parallel[Parallel test<br/>Execute procedures without impacting operations<br/>Focus: Most attention needed - tests recovery site]
        
        Full[Full interruption test<br/>Impact operations - move to recovery/cloud site<br/>Focus: Verify controls, missing procedures, logical/tech controls]
    end

    subgraph Backup Data Assessment
        Gather[Gather: tapes, discs, drives]
        TestFor[Test for: proper retention requirements<br/>Archiving best practices - encryption at rest<br/>Recovery from potential data loss]
        Logs[Review backup logs: frequency, policy compliance<br/>Encryption at rest]
    end

    subgraph Backup Methods
        Full[Full backup<br/>Complete copy of all data - objects + user data]
        Diff[Differential backup<br/>Data changed since last FULL backup]
        Inc[Incremental backup<br/>Data changed since last FULL or INCREMENTAL backup]
    end

    subgraph Validation Questions
        Q1[Can we recover from the full backup?]
        Q2[Are differential/incremental backups<br/>correctly capturing modified data?]
        Q3[Is rotation properly overwriting oldest data first,<br/>retaining most current?]
    end

    BC --> DR --> Simple
    Simple --> Docs
    Docs --> Checklist --> Tabletop --> Simulation --> Parallel --> Full
    Full --> Gather --> TestFor --> Logs
    Logs --> Full --> Diff --> Inc
    Diff --> Q1
    Inc --> Q2
    Q1 --> Q3
    Q2 --> Q3
```

---

### Bonus: Session 25 Complete Concept Map

```mermaid
mindmap
  root((Security Tests & Assessments<br/>CISSP 6.1, 6.3, 6.5))
    Test & Assessment Planning
      Test: narrow, specific, control performance
      Assessment: broad, in-depth, risk posture
      Strategy: scope, impact failure, resources, criteria, approval
      Audits: independent, compliance-focused
      Types: Internal, External, Third-party
    Performance & Risk Indicators
      KPI: measures security performance
      KRI: measures known security risks
      Examples: risk assessment, vuln scan, incidents, patch compliance
      References: NIST 800-55, ISO 27004
    Security Process Data
      Triple constraint: scope, time, cost
      Administrative: policies, procedures, logs
      Technical: system logs, code, config, diagrams
      Requires management support & formal approval
    Account Management Data
      Lifecycle: Creation → Modification → Auditing → Deletion
      Creation: authorized/unauthorized accounts, logs
      Modification: provisioning/deprovisioning logged
      Auditing: regular reviews, identify non-compliant
      Deletion: follow retention periods, disable not delete
    Training & Awareness Verification
      Awareness: raise attention, responsibilities
      Training: teach secure duties
      Training records mapped to objectives
      KPIs/KRIs for training effectiveness
      Non-compliance: remedial training, privilege revocation
    BC/DR Data
      BC: business functions, DR: IT recovery
      DR tests: checklist, tabletop, simulation, parallel, full interruption
      Backup methods: full, differential, incremental
      Validate recovery, retention, encryption
```
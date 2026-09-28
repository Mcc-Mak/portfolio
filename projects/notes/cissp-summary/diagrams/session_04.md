### Video V23: Risk Management Concepts (Threats, Vulnerabilities & NIST RMF)

```mermaid
flowchart TD
    subgraph Core Formula
        T[Threat<br/>Potential for unwanted harm]
        V[Vulnerability<br/>Weakness or flaw]
        R[RISK<br/>= Threats × Vulnerabilities<br/>Only exists when BOTH are present]
    end

    T --> R
    V --> R

    R --> NIST[NIST Risk Management Framework]

    subgraph NIST 4-Step RMF
        Step1[Step 1: FRAME<br/>Understand organizational risk reaction]
        Step2[Step 2: ASSESS<br/>Research assets, discover risks, determine tolerance]
        Step3[Step 3: RESPOND<br/>Decide best course of action]
        Step4[Step 4: MONITOR<br/>Verify effectiveness & compliance<br/>Continuous Loop]
    end

    Step1 --> Step2 --> Step3 --> Step4
    Step4 -.-> Step1
```

---

### Video V24: Five Risk Response Strategies + Monitoring

```mermaid
graph TD
    subgraph Five Risk Responses
        M[Mitigation<br/>Reduce risk to acceptable level<br/>e.g., Firewall]
        A[Assignment / Transfer<br/>Transfer responsibility<br/>e.g., Insurance, MSP]
        D[Deterrence<br/>Implement deterrent controls<br/>e.g., Warning signs, guards]
        AV[Avoidance<br/>Eliminate risky activity<br/>e.g., Don't install web server]
        AC[Acceptance<br/>Acknowledge residual risk<br/>e.g., Do nothing, accept remaining]
    end

    subgraph Monitoring & Continuous Improvement
        V1[Verify Effectiveness]
        V2[Maintain Compliance<br/>Due Care / Due Diligence]
        V3[Update Responses<br/>New software, threats]
        V4[Follow-on Analysis<br/>Check logs, occurrence rates]
    end

    subgraph Risk Heat Map
        Red[🔴 RED / ORANGE<br/>High Risk - Immediate Action]
        Green[🟢 GREEN / YELLOW<br/>Within Risk Tolerance]
    end

    M --> V1
    A --> V2
    D --> V3
    AV --> V4
    AC --> Red
```

---

### Video V25: Controls and Countermeasures (Defense in Depth)

```mermaid
graph TD
    subgraph Three Control Categories
        Admin[Administrative<br/>Policies, Procedures<br/>Audit review, security policies]
        Tech[Technical / Logical<br/>Technology-based<br/>IAM, firewalls, encryption, MFA]
        Phys[Physical<br/>Tangible barriers<br/>Fences, locks, guards, signs]
    end

    subgraph Seven Control Types by Intent
        Deter[Deterrent<br/>Discourage violations<br/>Warning banners]
        Prevent[Preventative<br/>Stop unauthorized actions<br/>Authentication]
        Detect[Detective<br/>Discover violations<br/>Alarms, audit logs]
        Correct[Corrective<br/>Fix an issue<br/>Security guard, reprimand]
        Compensate[Compensating<br/>Alternative when primary weak<br/>Multi-Factor Authentication]
        Directive[Directive<br/>Guide compliance<br/>Security policy rules]
        Recovery[Recovery<br/>Restore after event<br/>Backups, DR plans]
    end

    Admin --> Deter
    Admin --> Directive
    Tech --> Prevent
    Tech --> Detect
    Tech --> Compensate
    Phys --> Correct
    Phys --> Recovery

    Key[KEY PRINCIPLE<br/>Cost of Control < Value of Asset]
```

---

### Video V26: Continuous Monitoring (NIST SP 800-137)

```mermaid
flowchart LR
    subgraph ISCM Definition
        CM[Continuous Monitoring<br/>Regularly evaluating security controls<br/>NOT system/SIEM monitoring]
    end

    subgraph Four Key Components
        Q1[Scope<br/>What is evaluated?<br/>Assets, personnel, controls]
        Q2[Method<br/>How evaluated?<br/>Manual vs automated, scans]
        Q3[Frequency<br/>How often?<br/>Monthly, weekly, daily]
        Q4[Metric<br/>How is success tracked?]
    end

    CM --> Q1
    CM --> Q2
    CM --> Q3
    CM --> Q4

    subgraph Six-Step Process
        S1[1. DEFINE<br/>strategy based on risk tolerance]
        S2[2. ESTABLISH<br/>data collection methods]
        S3[3. ANALYZE<br/>collected data]
        S4[4. REPORT<br/>findings to senior management]
        S5[5. RESPOND<br/>to identified risks]
        S6[6. REVIEW & UPDATE<br/>monitoring program]
    end

    S1 --> S2 --> S3 --> S4 --> S5 --> S6
    S6 -.-> S1
```

---

### Video V27: Supply Chain Risk Management (SCRM)

```mermaid
flowchart TD
    subgraph The Supply Chain
        RM[Raw Material] --> Sup[Supplier]
        Sup --> Man[Manufacturing]
        Man --> Dist[Distribution]
        Dist --> Org[Organization]
        Org --> Cust[Customer]
    end

    subgraph Key Frameworks
        F1[NIST IR 7622<br/>Federal Systems SCRM]
        F2[CNSSD 505<br/>Supply Chain Risk Management]
        F3[ISO 28000<br/>Security Management Systems]
    end

    subgraph Four Types of Supply Chain Risks
        UR[Unintentional Risks<br/>Poor security, no screening]
        SR[Service Risks<br/>Cloud exposes data/IP]
        HR[Hardware Risks<br/>Counterfeit, spyware]
        SWR[Software Risks<br/>Vulnerabilities, malware]
    end

    subgraph Three Assessment Types
        A1[Onsite Assessment<br/>Visit supplier, observe practices]
        A2[Documentation Review<br/>Processes, certifications, reports]
        A3[Third-Party Audit<br/>Independent external review]
    end

    Org --> UR
    Org --> SR
    Org --> HR
    Org --> SWR

    UR --> A1
    SR --> A2
    HR --> A3
    SWR --> A3

    Warning[⚠️ Any broken link introduces security risk]
```

---

### Bonus: Session 4 Complete Concept Map

```mermaid
mindmap
  root((Risk Management))
    Core Concepts
      Threat
      Vulnerability
      Risk = Threat × Vulnerability
    NIST RMF 4-Step
      Frame
      Assess
      Respond
      Monitor
    Risk Responses
      Mitigation
      Assignment/Transfer
      Deterrence
      Avoidance
      Acceptance
    Controls
      Categories: Admin, Technical, Physical
      Types: Deterrent, Preventative, Detective, Corrective, Compensating, Directive, Recovery
      Cost Effectiveness
    Continuous Monitoring
      NIST SP 800-137
      Scope, Method, Frequency, Metric
      6-Step Process
    Supply Chain SCRM
      NIST IR 7622, CNSSD 505, ISO 28000
      Unintentional, Service, Hardware, Software Risks
      Onsite, Documentation, Third-Party Assessments
```

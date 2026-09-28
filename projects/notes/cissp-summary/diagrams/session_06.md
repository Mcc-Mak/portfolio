### Video V35: Understanding Risk Assessments (NIST 800-30)

```mermaid
flowchart TD
    subgraph Risk Equation
        T[Threat] --> R[RISK<br/>Exists ONLY when BOTH present]
        V[Vulnerability] --> R
        Missing[Missing element<br/>could appear in future]
    end

    subgraph Four-Step Process NIST 800-30
        S1[Step 1: PREPARATION<br/>Define purpose, scope, unique approach]
        S2[Step 2: CONDUCT ASSESSMENT<br/>Create list of identified risks]
        S3[Step 3: REPORT RESULTS<br/>Business language to senior management]
        S4[Step 4: MAINTAIN ASSESSMENT<br/>Monitor over time]
    end

    S1 --> S2 --> S3 --> S4
    S4 -.-> S2

    subgraph Goals
        G1[Identify risk factors]
        G2[Analyze validity]
        G3[Evaluate impacts]
    end
```

---

### Video V36: Quantitative vs. Qualitative Risk Analysis

```mermaid
graph TD
    subgraph Quantitative - Numbers & Money
        AV[Asset Value<br/>Total worth]
        EF[Exposure Factor<br/>% lost if attacked]
        SLE[SLE = AV × EF<br/>Single Loss Expectancy]

        ARO[Annualized Rate of Occurrence<br/>Times per year]
        ALE[ALE = SLE × ARO<br/>Annualized Loss Expectancy]

        ACS[Annual Cost of Safeguard]
        NB[Net Benefit =<br/>(ALE before - ALE after) - ACS]

        AV --> SLE
        EF --> SLE
        SLE --> ALE
        ARO --> ALE
        ALE --> NB
        ACS --> NB

        Golden[GOLDEN RULE<br/>Never spend more on safeguard<br/>than value of asset]
    end

    subgraph Qualitative - Judgment & Rankings
        Delphi[Delphi Technique<br/>Anonymous survey of SMEs]
        HeatMap[Heat Map / Risk Matrix<br/>Probability vs. Impact]
        Rankings[High / Medium / Low Rankings]
    end

    subgraph Hybrid Approach
        H1[Quantitative → Hardware]
        H2[Qualitative → Data]
        H3[Start Qualitative → Quick results<br/>Then Quantitative → Hotspots]
    end

    Quantitative --> Hybrid
    Qualitative --> Hybrid
```

---

### Video V37: Control Assessments (Security & Privacy)

```mermaid
graph TD
    subgraph Two Main Types
        SCA[Security Control Assessment<br/>Evaluates controls for security objectives<br/>Built into SDLC]
        PIA[Privacy Impact Assessment<br/>Evaluates controls for data privacy laws<br/>GDPR, HIPAA, CCPA]
    end

    subgraph Assessment Plan Components
        C1[Purpose & Scope<br/>Why? What in focus?]
        C2[Test Criteria<br/>What is success/failure?<br/>Crucial for due diligence]
        C3[Procedures<br/>Step-by-step for repeatability]
        C4[Dependencies<br/>Tools, licenses, SMEs]
        C5[Reference Material<br/>Policies, laws, standards]
    end

    subgraph Assessment Procedures
        P1[Examination<br/>Non-intrusive review<br/>Logs, policies]
        P2[Interview<br/>Discuss with personnel<br/>Admins, SMEs]
        P3[Test<br/>Active engagement<br/>Expected vs. actual]
    end

    SCA --> C1
    PIA --> C1
    C1 --> C2 --> C3 --> C4 --> C5
    C5 --> P1
    C5 --> P2
    C5 --> P3
```

---

### Video V38: Privacy Control Assessments (PTA → PIA → PCA)

```mermaid
flowchart LR
    subgraph Pre-Assessment
        PTA[PTA<br/>Privacy Threshold Analysis<br/>Is PII present?]
        PTA -->|Yes| PIA[PIA<br/>Privacy Impact Assessment<br/>How bad is the risk?<br/>What, Why, Who, How]
    end

    subgraph PCA - Four-Step Process PDCA
        Step1[1. PREPARE<br/>Define scope, objective, stakeholders]
        Step2[2. DEVELOP<br/>Create assessment plan<br/>Document controls, get approval]
        Step3[3. CONDUCT<br/>Execute test procedures<br/>Identify gaps]
        Step4[4. ANALYZE<br/>Review findings<br/>Create POAM, prioritize severity]
    end

    PIA --> Step1
    Step1 --> Step2 --> Step3 --> Step4

    subgraph Mnemonic
        M1[P = Privacy]
        M2[D = Drives]
        M3[C = Continuous]
        M4[A = Assessment]
    end

    Step1 -.-> M1
    Step2 -.-> M2
    Step3 -.-> M3
    Step4 -.-> M4

    subgraph Key Regulations
        R[GDPR / HIPAA /<br/>Privacy Act 1988 / CCPA]
    end
    R --> PTA
```

---

### Video V39: PCI DSS Assessments (ROC, SAQ, Merchant Levels)

```mermaid
graph TD
    subgraph ARRM Assessment Process
        A[ASSESS<br/>Identify all locations of cardholder data<br/>Data inventory, CDE]
        R1[REMEDIATE<br/>Fix vulnerabilities<br/>Mitigate or adjudicate]
        R2[REPORT<br/>Document assessment & remediation]
        M[MONITOR & MAINTAIN<br/>Continuously verify effectiveness]
    end

    A --> R1 --> R2 --> M
    M -.-> A

    subgraph Three Assessment Methods
        Examine[Examine<br/>Passive: configs, logs, docs]
        Observe[Observe<br/>Active: pen testing, SAST, DAST]
        Interview[Interview<br/>Talk to personnel]
    end

    subgraph Reporting Mechanisms
        ROC[ROC - Report on Compliance<br/>Conducted by QSA<br/>Level 1 Merchants]
        SAQ[SAQ - Self-Assessment Questionnaire<br/>Completed internally<br/>Levels 2, 3, 4]
    end

    subgraph Merchant Levels
        L1["Level 1: >6M transactions/year → ROC"]
        L2["Level 2: 1-6M transactions/year → SAQ"]
        L3["Level 3: 20K-1M transactions/year → SAQ"]
        L4["Level 4: <20K transactions/year → SAQ"]
    end

    A --> Examine
    A --> Observe
    A --> Interview
    Examine --> ROC
    Examine --> SAQ
    ROC --> L1
    SAQ --> L2
    SAQ --> L3
    SAQ --> L4
```

---

### Video V40: Threat Modeling Concepts

```mermaid
graph TD
    subgraph Core Definition
        TM[Threat Modeling<br/>Analyzes potential threats<br/>Attacker + Defender perspectives]
    end

    subgraph Key Terminology
        Threat[Threat<br/>Potential for unwanted harm]
        AS[Attack Surface<br/>People, technology, physical<br/>Where attacker could compromise]
        TI[Threat Intelligence<br/>Analyzed information<br/>TTPs, KPIs, KRIs]
    end

    subgraph Two Approaches
        Pro[PROACTIVE<br/>Before deployment<br/>Predict & design security in]
        Rea[REACTIVE<br/>System operational<br/>Discover threats & add controls]
    end

    subgraph Four Core Questions
        Q1["1. What are we working on?"]
        Q2["2. What can go wrong?"]
        Q3["3. What are we going to do about it?"]
        Q4["4. Did we do a good enough job?"]
    end

    subgraph Points of View
        Att[Attacker-Focused<br/>Attack vectors]
        Asset[Asset-Focused<br/>What happens to critical assets?]
        Sys[System-Focused<br/>Threats against entire system]
    end

    TM --> Q1
    Q1 --> Q2 --> Q3 --> Q4
    TM --> Pro
    TM --> Rea
    TM --> Att
    TM --> Asset
    TM --> Sys
```

---

### Video V41: Threat Modeling Methodologies

```mermaid
graph TD
    subgraph STRIDE - Microsoft
        S[Spoofing<br/>Fake credentials]
        T[Tampering<br/>Unauthorized modification]
        R[Repudiation<br/>Deny action, no proof]
        I[Info Disclosure<br/>Expose without permission]
        D[DoS<br/>Disrupt access]
        E[Elevation of Privilege<br/>User → Admin/root]
    end

    subgraph PASTA - 7 Stages
        PA1[1. Business Objectives]
        PA2[2. Technical Scope]
        PA3[3. Application Decompose]
        PA4[4. Threat Analysis]
        PA5[5. Vulnerability Analysis]
        PA6[6. Attack Modeling]
        PA7[7. Risk Analysis]
    end
    PA1 --> PA2 --> PA3 --> PA4 --> PA5 --> PA6 --> PA7

    subgraph OCTAVE Allegro - 4 Steps
        O1[1. Establish drivers<br/>Risk objectives]
        O2[2. Create profiles<br/>Profile asset types]
        O3[3. Identify threats<br/>Document attack surface]
        O4[4. Identify & mitigate<br/>Analyze & address risks]
    end
    O1 --> O2 --> O3 --> O4

    subgraph NIST SP 800-154 - Data-Centric
        N1[1. Identify & Characterize<br/>Data flow, usage, storage]
        N2[2. Identify Attack Vectors<br/>Attacker pathways]
        N3[3. Characterize & Mitigate<br/>Apply controls]
        N4[4. Analyze Threat Model<br/>Continuous improvement]
    end
    N1 --> N2 --> N3 --> N4
    N4 -.-> N1

    subgraph Other Methodologies
        Other1[TRIKE<br/>Open-source, risk-management]
        Other2[VAST<br/>Visual, Agile, Simple Threat<br/>For Agile development]
    end
```

---

### Bonus: Session 6 Complete Concept Map

```mermaid
mindmap
  root((Risk Assessments<br/>& Threat Modeling))
    Risk Assessments NIST 800-30
      Preparation
      Conduct Assessment
      Report Results
      Maintain Assessment
    Quantitative Analysis
      SLE = AV × EF
      ALE = SLE × ARO
      Net Benefit
      Golden Rule
    Qualitative Analysis
      Delphi Technique
      Heat Map / Risk Matrix
      High/Medium/Low
    Control Assessments
      Security Control Assessment
      Privacy Impact Assessment
      PCA: PDCA Process
    PCI DSS Assessments
      ARRM: Assess, Remediate, Report, Monitor
      ROC vs SAQ
      4 Merchant Levels
    Threat Modeling Concepts
      Proactive vs Reactive
      4 Core Questions
      Attacker/Asset/System Views
    Methodologies
      STRIDE: Spoof, Tamper, Repudiate, Info, DoS, Elevate
      PASTA: 7-Stage Attack Simulation
      OCTAVE: 4-Step Allegro
      TRIKE / VAST
```

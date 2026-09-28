# CISSP Topics (Consolidated)

```mermaid
graph TD
    %% ==================== SESSION 02 ====================
    subgraph V6 ["V6: ISC2 Code of Ethics"]
        Code[ISC2 Code of Ethics] --> Canon1[Canon 1: Protect Society]
        Code --> Canon2[Canon 2: Act Honorably]
        Code --> Canon3[Canon 3: Provide Diligent Service]
        Code --> Canon4[Canon 4: Advance the Profession]
        
        Canon1 --> B1[Safeguard infrastructure]
        Canon1 --> B2[Consider common good]
        Canon2 --> C1[Be transparent]
        Canon2 --> C2[Lead by example]
        Canon3 --> D1[Stay current]
        Canon3 --> D2[Avoid conflicts]
        Canon4 --> E1[Share knowledge]
        Canon4 --> E2[Mentor others]
        
        Violations[Violations] --> Peer[Peer review]
        Peer --> Revoke[Possible revocation]
    end

    subgraph V7 ["V7: CIA Triad + Authenticity & Non-Repudiation"]
        C[Confidentiality] --> C1[Encryption]
        C --> C2[Access Controls]
        I[Integrity] --> I1[Hashing]
        I --> I2[Change Management]
        A[Availability] --> A1[Redundancy]
        A --> A2[DoS Protection]
        
        Auth[Authenticity] --> Auth1[Login Credentials]
        Auth --> Auth2[Source Verification]
        NR[Non-Repudiation] --> NR1[Digital Signatures]
        NR --> NR2[Audit Logs]
        
        C -.-> |Enables| Auth
        I -.-> |Enables| NR
    end

    subgraph V8 ["V8: Top-Down Governance"]
        SM[Senior Management<br/>Defines Policies] --> MM[Middle Management<br/>Procedures & Standards]
        MM --> SP[Security Professionals<br/>Implement Policies]
        
        Strategic[Strategic Plan 3-5 Yrs] -.-> |Created by| SM
        Tactical[Tactical Plan ~1 Yr] -.-> |Created by| MM
        Operational[Operational Plan 1-3 Mos] -.-> |Created by| SP
        
        SP --> Goal[Goal: Enable Business]
    end

    subgraph V9 ["V9: Organizational Roles"]
        EX[Executive: CEO, CISO] --> DO[Data Owner]
        SE[Security: Manager, Analyst] --> DC[Data Custodian]
        DA[Data: Owner, Custodian, Steward] --> DS[Data Steward]
        SY[System: Admin, Auditor]
        
        DO --> |Accountable for| DC
        DC --> |Implements for| DS
        DS --> |Advises| DO
    end

    subgraph V10 ["V10: Security Awareness, Training & Education"]
        AW[Awareness: WHAT<br/>Posters, Emails] --> G1[Security Champions]
        TR[Training: HOW<br/>Remote Access, IR] --> G2[Gamification]
        ED[Education: WHY<br/>Certifications] --> M1[Participation Rates]
        
        G2 --> M2[Phishing Success Rate - down]
        M2 --> |Feedback| TR
    end

    subgraph V11 ["V11: Social Engineering"]
        SE[Social Engineering] --> Digital[Digital Attacks]
        SE --> Physical[Physical Attacks]
        
        Digital --> Phish[Phishing] --> Spear[Spear Phishing]
        Phish --> Whaling[Whaling]
        Phish --> Vishing[Vishing]
        Phish --> Smishing[Smishing]
        Digital --> Pretext[Pretexting]
        Digital --> QPQ[Quid Pro Quo]
        
        Physical --> Tailgate[Tailgating]
        Physical --> Piggyback[Piggybacking]
        Physical --> Shoulder[Shoulder Surfing]
        Physical --> Dumpster[Dumpster Diving]
        
        SE --> Defense[Defenses: Training, Badges, Verification]
    end

    subgraph V12 ["V12: Personnel Security Lifecycle"]
        P1[Candidate Screening] --> P2[Hiring & Agreements]
        P2 --> P3[Onboarding]
        P3 --> P4[Offboarding]
        
        SoD[Separation of Duties] -.-> P1
        Least[Least Privilege] -.-> P3
        Need[Need to Know] -.-> P4
    end

    subgraph V13 ["V13: Personnel Safety"]
        PS[Personnel Safety] --> Travel[Travel: VPN, Tracking]
        PS --> Duress[Duress: Code Words, Silent Alarms]
        PS --> Emergency[Emergency: Evacuation, Contacts]
        PS --> SafetyTraining[Training: Fire, Recall]
    end

    %% SESSION 02 Inter‑video relations
    V6 -.-> |Ethics require| V10
    V8 -.-> |Governance assigns| V9
    V9 -.-> |Data classification| V7
    V7 -.-> |Confidentiality protects| V11
    V10 -.-> |Training mitigates| V11
    V11 -.-> |Exploits gaps in| V12
    V12 -.-> |Offboarding enforces| V7_Integrity
    V13 -.-> |Overrides| V7_Availability

    V7_Integrity[V7 Integrity Focus] --> I
    V7_Availability[V7 Availability Focus] --> A

    %% ==================== SESSION 03 ====================
    subgraph V15 ["V15: Due Care vs Due Diligence"]
        Req[Requirement] --> DD1[Due Diligence: Research]
        DD1 --> DCare[Due Care: Implement]
        DCare --> DD2[Due Diligence: Maintain]
        DD2 --> Legal[Legal Liability in Court]
    end

    subgraph V16 ["V16: Laws & Regulations"]
        HIPAA[HIPAA/HITECH: Health Records]
        GDPR[GDPR: Data Protection] --> Controller[Controller]
        GDPR --> Processor[Processor]
        GLBA[GLBA: Financial Data]
        SOX[SOX: Accounting Fraud]
        PCI[PCI DSS: Card Data] --> R12[12 Requirements]
    end

    subgraph V17 ["V17: Intellectual Property"]
        IP[Intellectual Property] --> Patent[Patent]
        IP --> Trademark[Trademark]
        IP --> Copyright[Copyright]
        IP --> TradeSecret[Trade Secret]
        IP --> Licensing[Licensing]
        Threats[Threats: Corporate Espionage]
    end

    subgraph V18 ["V18: Export Controls"]
        Wassenaar[Wassenaar Arrangement] --> Category5[Category 5: Crypto & Cyber Weapons]
        TDF[Transborder Data Flow] --> Localization[Data Localization]
        TDF --> Trading[Data Trading Compliance]
    end

    subgraph V19 ["V19: Cyber Crimes"]
        TA[Threat Actors] --> Hacker[Hacker] --> SK[Script Kiddies]
        TA --> Insider[Insider Threat]
        TA --> State[State Actors]
        
        Disruption[Disruption: DoS/DNS] --> Avail[Target Availability]
        Destruction[Destruction: Terrorism/Sanitization] --> Assets[Destroy Assets]
        Hacktivism[Hacktivism: Deface/Doxxing] --> Ideology[Ideological Motives]
    end

    subgraph V20 ["V20: Compliance Requirements"]
        Sources[Contracts, Laws, Standards] --> Core[Security Pro: Determine Compliance]
        Core --> Consequences[Civil: Fines, Criminal: Prison]
        Core --> Key[Key: Laws apply to all industries]
    end

    subgraph V21 ["V21: Security Documentation"]
        Policy[Policy: WHY] --> Standard[Standard: WHAT]
        Standard --> Guideline[Guideline: Recommendation]
        Guideline --> Procedure[Procedure: HOW]
        Procedure --> Baseline[Baseline: MINIMUM]
    end

    %% SESSION 03 Inter‑video relations
    V15 -.-> |Due Diligence supports| V21_DM[V21: Document Management]
    V16 -.-> |GDPR/HIPAA inform| V21_Policy[V21: Policy creation]
    V20 -.-> |Compliance driven by| V16
    V19 -.-> |Cyber crimes violation of| V16

    %% ==================== SESSION 04 ====================
    subgraph V23 ["V23: Risk Management Concepts"]
        Threat[Threat] --> Risk[Risk<br/>Threat x Vulnerability]
        Vuln[Vulnerability] --> Risk
        
        Frame[Frame] --> Assess[Assess]
        Assess --> Respond[Respond]
        Respond --> Monitor[Monitor]
        Monitor -.-> Frame
    end

    subgraph V24 ["V24: Risk Responses"]
        Mitigate[Mitigation: Firewall] --> Verify[Verify Effectiveness]
        Transfer[Transfer: Insurance] --> Compl[Maintain Compliance]
        Deter[Deterrence: Guards] --> Update[Update Responses]
        Avoid[Avoidance: Remove risky activity] --> FollowUp[Follow-on Analysis]
        Accept[Acceptance: Residual risk] --> HeatMap[Heat Map: Red/Yellow/Green]
    end

    subgraph V25 ["V25: Controls"]
        Admin[Administrative] --> Deterrent[Deterrent]
        Admin --> Directive[Directive]
        Tech[Technical] --> Preventive[Preventative]
        Tech --> Detective[Detective]
        Tech --> Compensating[Compensating]
        Phys[Physical] --> Corrective[Corrective]
        Phys --> Recovery[Recovery]
        
        Cost[Cost < Asset Value] --> KeyPrinciple[Key Principle]
    end

    subgraph V26 ["V26: Continuous Monitoring"]
        ISCM[ISCM] --> Scope[Scope]
        ISCM --> Method[Method]
        ISCM --> Frequency[Frequency]
        ISCM --> Metric[Metric]
        
        Define[Define] --> Establish[Establish]
        Establish --> Analyze[Analyze]
        Analyze --> Report[Report]
        Report --> Respond[Respond]
        Respond --> Review[Review & Update]
        Review -.-> Define
    end

    subgraph V27 ["V27: Supply Chain Risk"]
        RM[Raw Material] --> Sup[Supplier]
        Sup --> Man[Manufacturing]
        Man --> Dist[Distribution]
        Dist --> Org[Organization]
        
        Org --> UR[Unintentional Risks]
        Org --> HR[Hardware Risks]
        Org --> SR[Service Risks]
        Org --> SWR[Software Risks]
        
        UR --> Onsite[Onsite Assessment]
        SR --> DocReview[Documentation Review]
        HR --> ThirdParty[Third-Party Audit]
        SWR --> ThirdParty
    end

    %% SESSION 04 Inter‑video relations
    V23 -.-> |Risk assessment feeds| V24
    V24 -.-> |Risk responses implemented via| V25
    V26 -.-> |Continuous monitoring of| V25
    V27 -.-> |SCRM extends| V23
    V27 -.-> |Supply chain risk part of| V16

    %% ==================== SESSION 05 ====================
    subgraph V29 ["V29: NIST RMF, ISO 31000, COSO"]
        Prepare[Prepare] --> Categorize[Categorize]
        Categorize --> Select[Select]
        Select --> Implement[Implement]
        Implement --> Assess[Assess]
        Assess --> Authorize[Authorize]
        Authorize --> Monitor[Monitor]
        Monitor -.-> Select
        
        COSO[COSO ERM] --> SOX404[SOX 404 compliance]
    end

    subgraph V30 ["V30: NIST CSF"]
        Core[Core Functions] --> Identify[Identify] --> Protect[Protect] --> Detect[Detect] --> Respond[Respond] --> Recover[Recover]
        Tiers[Tiers 1-4: Partial→Adaptive]
        Profiles[Profiles: Current vs Target]
        
        NoteCSF[Voluntary, not mandated]
    end

    subgraph V31 ["V31: ISO 27001"]
        Context[Clause 4: Context] --> Leadership[Clause 5: Leadership]
        Leadership --> Planning[Clause 6: Planning]
        Planning --> Support[Clause 7: Support]
        Support --> Operation[Clause 8: Operation]
        Operation --> Evaluation[Clause 9: Performance Evaluation]
        Evaluation --> Improvement[Clause 10: Improvement]
        Improvement -.-> Context
        
        ISO27002[ISO 27002: Control Catalog] -.-> Operation
    end

    subgraph V32 ["V32: PCI DSS"]
        CDE[Cardholder Data Environment] --> CHD[Cardholder Data: PAN, Name, Exp]
        CDE --> SAD[SAD: Track, CVV, PIN]
        CDE --> Req12[12 Requirements]
    end

    subgraph V33 ["V33: SABSA"]
        L1[Contextual: Business] --> L2[Conceptual: Architect]
        L2 --> L3[Logical: Designer]
        L3 --> L4[Physical: Builder]
        L4 --> L5[Component: Tradesman]
        L5 --> L6[Service Mgmt: Operations]
        
        Q1[WHAT] -.-> L1
        Q2[WHY] -.-> L2
        Q3[HOW] -.-> L3
        Q4[WHO] -.-> L4
        Q5[WHERE] -.-> L5
        Q6[WHEN] -.-> L6
    end

    %% SESSION 05 Inter‑video relations
    V29 -.-> |RMF aligns with| V23
    V30 -.-> |CSF core functions map to| V25
    V31 -.-> |ISO 27001 certification requires| V21
    V32 -.-> |PCI DSS enforced by| V16
    V33 -.-> |SABSA overlays| V29
    V33 -.-> |SABSA overlays| V30
    V33 -.-> |SABSA overlays| V31

    %% ==================== SESSION 06 ====================
    subgraph V35 ["V35: Risk Assessment NIST 800-30"]
        RA[Risk Assessment] --> PrepareRA[Preparation]
        PrepareRA --> Conduct[Conduct Assessment]
        Conduct --> ReportRA[Report Results]
        ReportRA --> Maintain[Maintain Assessment]
        Maintain -.-> Conduct
        
        ThreatRA[Threat] --> RiskRA[Risk exists when both present]
        VulnRA[Vulnerability] --> RiskRA
    end

    subgraph V36 ["V36: Quantitative vs Qualitative"]
        AV[Asset Value] --> SLE[SLE = AV x EF]
        EF[Exposure Factor] --> SLE
        SLE --> ALE[ALE = SLE x ARO]
        ARO[ARO] --> ALE
        ALE --> NB[Net Benefit]
        ACS[ACS] --> NB
        
        Delphi[Delphi Technique] --> Qual[Qualitative]
        HeatMap[Heat Map] --> Qual
        Hybrid[Hybrid: Quantitative for hardware, Qualitative for data]
    end

    subgraph V37 ["V37: Control Assessments"]
        SCA[Security Control Assessment] --> Plan[Assessment Plan]
        PIA[Privacy Impact Assessment] --> Plan
        Plan --> Purpose[Purpose & Scope] --> TestCriteria[Test Criteria]
        TestCriteria --> Procedures[Procedures] --> Dependencies[Dependencies] --> Reference[Reference Material]
        Reference --> Exam[Examination]
        Reference --> Interview[Interview]
        Reference --> ActiveTest[Test]
    end

    subgraph V38 ["V38: Privacy Control Assessments"]
        PTA[PTA: Is PII present] --> PIA_PCA[PIA: How bad is risk]
        PIA_PCA --> PreparePCA[Prepare] --> Develop[Develop] --> ConductPCA[Conduct] --> AnalyzePCA[Analyze]
        PreparePCA -.-> P[Privacy]
        Develop -.-> D[Drives]
        ConductPCA -.-> C[Continuous]
        AnalyzePCA -.-> A[Assessment]
    end

    subgraph V39 ["V39: PCI DSS Assessments"]
        ARRM[ARRM] --> AssessPCI[Assess CDE]
        AssessPCI --> Remediate[Remediate]
        Remediate --> ReportPCI[Report]
        ReportPCI --> MonitorPCI[Monitor & Maintain]
        
        AssessPCI --> Examine[Examine]
        AssessPCI --> Observe[Observe]
        AssessPCI --> InterviewPCI[Interview]
        Examine --> ROC[ROC for Level 1]
        Examine --> SAQ[SAQ for Levels 2-4]
    end

    subgraph V40 ["V40: Threat Modeling"]
        TM[Threat Modeling] --> Q1_TM[What are we working on]
        Q1_TM --> Q2_TM[What can go wrong]
        Q2_TM --> Q3_TM[What to do about it]
        Q3_TM --> Q4_TM[Did we do enough]
        
        TM --> Proactive[Proactive: before deployment]
        TM --> Reactive[Reactive: after deployment]
        TM --> AttackerView[Attacker-focused]
        TM --> AssetView[Asset-focused]
        TM --> SystemView[System-focused]
    end

    subgraph V41 ["V41: Threat Modeling Methodologies"]
        STRIDE[STRIDE: Spoof, Tamper, Repudiate, Info Disclosure, DoS, Elevate]
        PASTA[PASTA 7 stages: Business→Risk Analysis]
        OCTAVE[OCTAVE Allegro: Drivers→Profiles→Threats→Mitigate]
        NIST154[NIST 800-154: Identify→Attack Vectors→Mitigate→Analyze]
        TRIKE[TRIKE: open-source, risk-management]
        VAST[VAST: Agile development]
    end

    %% SESSION 06 Inter‑video relations
    V35 -.-> |Risk assessment outputs feed| V36
    V36 -.-> |Net benefit guides| V25
    V37 -.-> |Control assessments verify| V25
    V38 -.-> |PCA follows| V37
    V39 -.-> |PCI assessment uses| V37
    V40 -.-> |Threat modeling informs| V41
    V41 -.-> |STRIDE used in| V40

    %% ==================== SESSION 07 ====================
    subgraph V43 ["V43: Data Classification"]
        PII_Data[PII] --> Sensitive[Sensitive Data]
        PHI[PHI] --> Sensitive
        PropData[Proprietary] --> Sensitive
        Military[Military: TS, S, C, U] --> ClassMil
        Business[Business: Proprietary, Private, Sensitive, Public] --> ClassBus
        Tier[Tier 0-2 + Significant Systems] --> AssetClass
    end

    subgraph V44 ["V44: Marking, Labeling, Data States"]
        Marking[Physical: cover sheets] --> InUse[Data in Use]
        Labeling[Digital: watermarks] --> AtRest[Data at Rest]
        Marking --> InTransit[Data in Transit]
        Labeling --> InTransit
        
        InUse --> ProtectAuth[Authentication, Access Controls]
        InTransit --> ProtectTLS[Encryption, VPN, TLS]
        AtRest --> ProtectFDE[Full Disk Encryption, TPM]
    end

    subgraph V45 ["V45: Secure Provisioning"]
        SP[Secure Provisioning] --> Supply[Supply Chain tracking]
        SP --> Operational[Operational tracking]
        SP --> Maintenance[Maintenance tracking]
        SP --> Performance[Performance tracking]
        
        Supply --> Storage[Spreadsheets/DBs]
        Operational --> Discovery[Nessus, Nmap]
        Maintenance --> ChangeControl[Change Control / CM]
        Performance --> ChangeControl
    end

    subgraph V46 ["V46: Data Roles"]
        Owner[Data Owner: Manager, accountable] --> Custodian[Data Custodian: Implementer]
        Custodian --> Steward[Data Steward: SME]
        
        Controller[GDPR Controller] -.-> Owner
        Processor[GDPR Processor] -.-> Custodian
        
        Subject[Subject] --> User[User: authenticated human] --> Object[Object: file/service]
    end

    subgraph V47 ["V47: Data Lifecycle"]
        Create[Create] --> Classify[Classify]
        Classify --> Store[Store]
        Store --> Use[Use/Process]
        Use --> Archive[Archive]
        Archive --> Destroy[Destroy]
        
        Create -.-> KP1[Protect cradle to grave]
        Classify -.-> KP2[Value changes → reclassify]
        Archive -.-> KP3[External factors matter]
    end

    subgraph V48 ["V48: Info System Lifecycle Part 1"]
        Initiation[Initiation: requirements] --> DevAcq[Development & Acquisition]
        DevAcq --> Build[Build vs Buy]
        Build --> RiskAssess[Risk Assessment] --> ControlSelect[Control Selection] --> Architecture[Architecture] --> Development[Development] --> Integration[Integration]
    end

    subgraph V49 ["V49: Info System Lifecycle Part 2"]
        Impl[Implementation] --> VV[Verification & Validation] --> SAR[SAR] --> POAM[POA&M] --> Auth_ATO[ATO]
        Auth_ATO --> Ops[Operations] --> CM_OPS[CM] --> ContMon[Continuous Monitoring] --> IR[Incident Response] --> PatchMgmt[Patch Management]
        PatchMgmt --> Disposal[Disposal] --> Decom[Decommission] --> DataPres[Data Preservation] --> Sanitize[Sanitization] --> HWDisposal[Hardware Disposal]
        
        Sanitize --> Degauss[Degaussing]
        Sanitize --> Overwrite[Overwriting]
        Sanitize --> PhysicalDestroy[Physical Destruction]
    end

    %% SESSION 07 Inter‑video relations
    V43 -.-> |Classification determines| V44
    V44 -.-> |Data states guide| V45
    V45 -.-> |Provisioning requires| V21
    V46 -.-> |Data roles enforce| V7
    V47 -.-> |Data lifecycle aligns with| V49
    V48 -.-> |SDLC phases incorporate| V25
    V49 -.-> |O&M phase includes| V26
```

---

## Summary of Inter‑Video Relationships Captured

| From | To | Relationship |
|:---|:---|:---|
| **Session 02** | | |
| V6 (Ethics) | V10 (Training) | Ethics require training & mentoring |
| V8 (Governance) | V9 (Roles) | Governance assigns roles |
| V9 (Roles) | V7 (CIA) | Data classification protects CIA |
| V7 (CIA) | V11 (Social Eng) | Confidentiality threatened by social engineering |
| V10 (Training) | V11 (Social Eng) | Training mitigates social engineering |
| V11 (Social Eng) | V12 (Lifecycle) | Exploits gaps in personnel lifecycle |
| V12 (Lifecycle) | V7 (Integrity) | Offboarding enforces integrity |
| V13 (Safety) | V7 (Availability) | Human life overrides availability |
| **Session 03** | | |
| V15 (Due Care/Diligence) | V21 (Documentation) | Due diligence requires document reviews |
| V16 (Laws) | V21 (Policy) | Laws drive policy creation |
| V20 (Compliance) | V16 (Laws) | Compliance is driven by laws |
| V19 (Cyber Crimes) | V16 (Laws) | Cyber crimes violate laws |
| **Session 04** | | |
| V23 (Risk Concepts) | V24 (Responses) | Risk assessment feeds response selection |
| V24 (Responses) | V25 (Controls) | Risk responses implemented via controls |
| V26 (Monitoring) | V25 (Controls) | Continuous monitoring verifies controls |
| V27 (SCRM) | V23 (Risk) | Supply chain risk extends risk concept |
| V27 (SCRM) | V16 (PCI DSS) | Vendor management part of compliance |
| **Session 05** | | |
| V29 (RMF) | V23 (NIST) | RMF aligns with risk management |
| V30 (CSF) | V25 (Controls) | CSF functions map to control categories |
| V31 (ISO 27001) | V21 (Policy) | Certification requires documented policy |
| V33 (SABSA) | V29, V30, V31 | SABSA overlays other frameworks |
| **Session 06** | | |
| V35 (Risk Assessment) | V36 (Quant Analysis) | Risk outputs feed into quantitative analysis |
| V36 (Quant) | V25 (Cost) | Net benefit guides cost‑effectiveness |
| V37 (Control Assessments) | V25 (Controls) | Control assessments verify controls |
| V38 (PCA) | V37 (PIA) | PCA follows PIA process |
| V39 (PCI Assessment) | V37 (Procedures) | Uses same examination procedures |
| V40 (Threat Modeling) | V41 (Methodologies) | Threat modeling informs methodology choice |
| V41 (STRIDE) | V40 (Threat Modeling) | STRIDE is a threat modeling method |
| **Session 07** | | |
| V43 (Classification) | V44 (Marking) | Classification determines marking |
| V44 (Data States) | V45 (Protection) | Data states guide protection mechanisms |
| V45 (Provisioning) | V21 (CM) | Provisioning requires change control |
| V46 (Roles) | V7 (CIA) | Data roles enforce CIA |
| V47 (Data Lifecycle) | V49 (Disposal) | Data lifecycle aligns with system disposal |
| V48 (SDLC) | V25 (Controls) | SDLC phases incorporate security controls |
| V49 (O&M) | V26 (CM) | O&M phase includes continuous monitoring |

This consolidated diagram preserves the logical flow and dependencies across all six sessions while remaining a single, navigable Mermaid visual.
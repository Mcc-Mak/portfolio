Here are the **Mermaid diagrams** explaining the key concepts for each video in Session 5.

---

### Video V29: NIST RMF (SP 800-37) + ISO 31000 + COSO

```mermaid
flowchart TD
    subgraph NIST RMF 7-Step Process
        P1[1. PREPARE<br/>Identify roles, strategy, inherited controls]
        P2[2. CATEGORIZE<br/>Classify assets & data types]
        P3[3. SELECT<br/>Choose appropriate security controls]
        P4[4. IMPLEMENT<br/>Deploy controls & document]
        P5[5. ASSESS<br/>Test control effectiveness]
        P6[6. AUTHORIZE<br/>Senior management issues ATO]
        P7[7. MONITOR<br/>Evaluate continuously; loop to Select]
    end

    P1 --> P2 --> P3 --> P4 --> P5 --> P6 --> P7
    P7 -.-> P3

    subgraph ISO 31000 Principles
        I1[Integrated]
        I2[Structured]
        I3[Customized]
        I4[Inclusive]
        I5[Dynamic]
    end

    subgraph COSO ERM Components
        C1[Governance & Culture<br/>Tone & values]
        C2[Strategy & Objective-Setting<br/>Integrate risk with planning]
        C3[Performance<br/>Identify impacting risks]
        C4[Review & Revision<br/>Monitor effectiveness]
        C5[Info, Comm & Reporting<br/>Risk information flow]
    end

    C4 --> SOX[Driving framework for<br/>SOX 404 Compliance]
```

---

### Video V30: NIST Cybersecurity Framework (CSF)

```mermaid
graph TD
    subgraph Three Main Components
        Core[The CORE<br/>Activities & functions for outcomes]
        Tiers[The TIERS<br/>Implementation maturity 1-4]
        Profiles[The PROFILES<br/>Current vs. Target alignment]
    end

    subgraph Four Tiers
        T1[Tier 1: PARTIAL<br/>Reactive, no formal process]
        T2[Tier 2: RISK-INFORMED<br/>Aware but inconsistent]
        T3[Tier 3: REPEATABLE<br/>Formal repeatable processes]
        T4[Tier 4: ADAPTIVE<br/>Continuous improvement, threat intel]
    end

    subgraph Five Core Functions
        F1[IDENTIFY<br/>Understand risk to assets/data]
        F2[PROTECT<br/>Safeguards for critical services]
        F3[DETECT<br/>Identify cybersecurity events]
        F4[RESPOND<br/>Act on detected incidents]
        F5[RECOVER<br/>Restore capabilities]
    end

    F1 --> F2 --> F3 --> F4 --> F5

    Core --> F1
    Tiers --> T1
    Tiers --> T2
    Tiers --> T3
    Tiers --> T4

    Note[VOLUNTARY Framework<br/>Not mandated by FISMA/HIPAA]
```

---

### Video V31: ISO/IEC 27001 (ISMS Clauses)

```mermaid
flowchart LR
    subgraph ISO 27001 Clauses - Certification Path
        C4[Clause 4: CONTEXT<br/>Scope, objectives, stakeholders]
        C5[Clause 5: LEADERSHIP<br/>Management commitment, policy, roles]
        C6[Clause 6: PLANNING<br/>Risk assessment, Risk Treatment Plan]
        C7[Clause 7: SUPPORT<br/>Budget, personnel, training]
        C8[Clause 8: OPERATION<br/>Implement & manage controls]
        C9[Clause 9: PERFORMANCE EVALUATION<br/>Audits, gap analysis]
        C10[Clause 10: IMPROVEMENT<br/>Corrective actions, lessons learned]
    end

    C4 --> C5 --> C6 --> C7 --> C8 --> C9 --> C10
    C10 -.-> C4

    subgraph Related Standard
        ISO27002[ISO/IEC 27002<br/>Control Catalog for 27001<br/>Provides specific controls]
    end

    C8 -.-> ISO27002

    subgraph Guiding Principle
        CIA[CIA Triad<br/>Confidentiality, Integrity, Availability]
    end

    C4 --> CIA
```

---

### Video V32: PCI DSS - Cardholder Data Environment

```mermaid
graph TD
    subgraph Scope
        CDE[Cardholder Data Environment<br/>Any person, process, technology<br/>that touches card data]
    end

    subgraph Data Types to Protect
        CHD[Cardholder Data]
        CHD --> PAN[Account Number - PAN]
        CHD --> Name[Cardholder Name]
        CHD --> Exp[Expiration Date]
        CHD --> SC[Service Code]

        SAD[Sensitive Authentication Data]
        SAD --> Track[Full Track Data]
        SAD --> CVV[CVV/CVC/CVV2]
        SAD --> PIN[PIN / PIN Block]
    end

    subgraph 12 High-Level Requirements
        R1[1. Network Security Controls]
        R2[2. Secure Configurations]
        R3[3. Protect Stored Account Data]
        R4[4. Strong Cryptography in Transit]
        R5[5. Protect from Malware]
        R6[6. Develop Secure Systems]
        R7[7. Need-to-Know Access]
        R8[8. Identify & Authenticate Users]
        R9[9. Restrict Physical Access]
        R10[10. Log & Monitor Access]
        R11[11. Test Security Regularly]
        R12[12. Organizational Policies]
    end

    CDE --> CHD
    CDE --> SAD
    CDE --> R1
```

---

### Video V33: SABSA Framework (6 Architecture Layers)

```mermaid
graph TD
    subgraph Core Principle
        Principle[Business-Driven, Risk-Focused<br/>Overarching framework on top of<br/>NIST, ISO 27001, COBIT<br/>Provides traceability to business goals]
    end

    subgraph Six Architecture Layers
        L1[Layer 1: CONTEXTUAL<br/>Business Manager View<br/>Scope, objectives, stakeholders]
        L2[Layer 2: CONCEPTUAL<br/>Architect View<br/>High-level objectives & relationships]
        L3[Layer 3: LOGICAL<br/>Designer View<br/>Security services, policies, data flows]
        L4[Layer 4: PHYSICAL<br/>Builder View<br/>Infrastructure, network, systems]
        L5[Layer 5: COMPONENT<br/>Tradesman/Implementer View<br/>Firewalls, DLP, IDS]
        L6[Layer 6: SERVICE MANAGEMENT<br/>Operations Manager View<br/>Daily ops, incident response, patching]
    end

    L1 --> L2 --> L3 --> L4 --> L5 --> L6

    subgraph SABSA Matrix
        Q1[WHAT?]
        Q2[WHY?]
        Q3[HOW?]
        Q4[WHO?]
        Q5[WHERE?]
        Q6[WHEN?]
    end

    Principle --> L1
    L1 -.-> Q1
    L2 -.-> Q2
    L3 -.-> Q3
    L4 -.-> Q4
    L5 -.-> Q5
    L6 -.-> Q6
```

---

### Bonus: Session 5 Framework Comparison Matrix

```mermaid
graph LR
    subgraph NIST RMF
        N1[7-Step Process<br/>Prepare→Monitor]
        N2[SP 800-37<br/>US Government Focus]
    end

    subgraph NIST CSF
        C1[5 Functions<br/>Identify→Recover]
        C2[4 Tiers<br/>Voluntary]
    end

    subgraph ISO 27001
        I1[7 Clauses<br/>Context→Improvement]
        I2[ISMS Certification<br/>International]
    end

    subgraph PCI DSS
        P1[12 Requirements<br/>CDE Scope]
        P2[Payment Card Industry<br/>Not a law, enforced]
    end

    subgraph SABSA
        S1[6 Layers<br/>Business-Driven]
        S2[Overarching Framework<br/>Traceability]
    end

    S1 --> C1
    S1 --> I1
    S1 --> P1
    S1 --> N1
```

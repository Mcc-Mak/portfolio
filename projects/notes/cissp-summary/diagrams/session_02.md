### Video V6: ISC2 Code of Ethics (The Four Canons)

```mermaid
graph TD
    A[ISC2 Code of Ethics] --> B[Canon 1: Protect Society]
    A --> C[Canon 2: Act Honorably]
    A --> D[Canon 3: Provide Diligent Service]
    A --> E[Canon 4: Advance the Profession]

    B --> B1[Safeguard infrastructure]
    B --> B2[Consider common good]

    C --> C1[Be transparent]
    C --> C2[Lead by example]

    D --> D1[Stay current]
    D --> D2[Avoid conflicts of interest]

    E --> E1[Share knowledge]
    E --> E2[Mentor others]

    F[Violations] --> G[Peer review]
    G --> H[Possible revocation]
```

---

### Video V7: The CIA Triad + Authenticity & Non-Repudiation

```mermaid
graph LR
    subgraph Core Concepts
        C[Confidentiality] --> C1[Encryption]
        C --> C2[Access Controls]

        I[Integrity] --> I1[Hashing]
        I --> I2[Change Management]

        A[Availability] --> A1[Redundancy]
        A --> A2[DoS Protection]
    end

    subgraph Extended Concepts
        Auth[Authenticity] --> Auth1[Login Credentials]
        Auth --> Auth2[Source Verification]

        NR[Non-Repudiation] --> NR1[Digital Signatures]
        NR --> NR2[Audit Logs]
    end

    style C fill:#bbdef5
    style I fill:#bbdef5
    style A fill:#bbdef5
    style Auth fill:#fff3e0
    style NR fill:#fff3e0
```

---

### Video V8: Aligning Security and the Organization (Top-Down Governance)

```mermaid
flowchart TD
    SM[Senior Management<br/>Defines Policies<br/>Ultimate Accountability] --> MM[Middle Management<br/>Creates Procedures & Standards]
    MM --> SP[Security Professionals<br/>Implement Policies]

    subgraph Three Types of Plans
        P1[Strategic Plan<br/>3-5 Years<br/>Long-term Vision]
        P2[Tactical Plan<br/>~1 Year<br/>Specific Projects]
        P3[Operational Plan<br/>1-3 Months<br/>Short-term Tasks]
    end

    SM -.-> P1
    MM -.-> P2
    SP -.-> P3

    SP --> GOAL[Goal: Enable Business, Not Hinder It]
```

---

### Video V9: Organizational Roles and Responsibilities (Focus on Data Roles)

```mermaid
graph TD
    subgraph Four Role Categories
        EX[Executive<br/>CEO, CISO, CIO]
        SE[Security<br/>Manager, Analyst]
        DA[Data<br/>Owner, Custodian, Steward]
        SY[System<br/>Admin, Auditor]
    end

    subgraph Critical Data Roles
        DO[Data Owner<br/>Classifies Data<br/>Accountable for Protection]
        DC[Data Custodian<br/>Implements Protection<br/>Keyboard-Level Execution]
        DS[Data Steward<br/>Subject Matter Expert<br/>PII, GDPR Knowledge]
    end

    EX --> DO
    DO --> DC
    DC --> DS
```

---

### Video V10: Security Awareness, Training & Education

```mermaid
graph LR
    subgraph Three Pillars
        AW[Awareness<br/>The 'WHAT'<br/>Posters, Emails]
        TR[Training<br/>The 'HOW'<br/>Remote Access, IR]
        ED[Education<br/>The 'WHY'<br/>Certifications]
    end

    subgraph Engagement Strategies
        G1[Security Champions<br/>Cheerleaders]
        G2[Gamification<br/>Points, Badges, Levels]
    end

    subgraph Measurement
        M1[Participation Rates]
        M2[Phishing Success Rate ↓]
    end

    AW --> G1
    TR --> G2
    ED --> M1
    G2 --> M2
```

---

### Video V11: Social Engineering Attack Tree

```mermaid
graph TD
    SE[Social Engineering] --> Digital[Digital Attacks]
    SE --> Physical[Physical Attacks]

    Digital --> Phishing[Phishing]
    Phishing --> SP[Spear Phishing<br/>Specific Individual]
    Phishing --> WH[Whaling<br/>C-Suite]
    Phishing --> VI[Vishing<br/>Voice Calls]
    Phishing --> SM[Smishing<br/>SMS Texts]
    Phishing --> IM[SPIM<br/>Instant Messaging]

    Digital --> Pretext[Pretexting<br/>Fictitious Story]
    Digital --> QPQ[Quid Pro Quo<br/>Something for Something]

    Physical --> SS[Shoulder Surfing]
    Physical --> DD[Dumpster Diving]
    Physical --> TG[Tailgating<br/>Unauthorized Following]
    Physical --> PB[Piggybacking<br/>Tricked Authorization]

    SE --> Defense[Defenses]
    Defense --> D1[Awareness Training]
    Defense --> D2[ID Badges Required]
    Defense --> D3[Vendor Verification]
```

---

### Video V12: Personnel Security Lifecycle

```mermaid
flowchart LR
    subgraph Principles
        Prin1[Separation of Duties]
        Prin2[Least Privilege]
        Prin3[Need to Know]
    end

    subgraph Lifecycle Phases
        P1[Candidate Screening<br/>Background Checks]
        P2[Hiring & Agreements<br/>NDA, AUP, Non-Compete]
        P3[Onboarding<br/>Training & Authorization]
        P4[Offboarding<br/>Revoke Access, Change Passwords]
    end

    P1 --> P2 --> P3 --> P4

    Prin1 -.-> P1
    Prin2 -.-> P3
    Prin3 -.-> P4
```

---

### Video V13: Personnel Safety and Security

```mermaid
graph TD
    PS[Personnel Safety] --> Travel[Travel Security]
    Travel --> T1[Endpoint Protection<br/>Firewall, VPN]
    Travel --> T2[Accountability Tracking]

    PS --> Duress[Duress Situations]
    Duress --> D1[Duress Code Words<br/>Pre-agreed, Discreet]
    Duress --> D2[Duress PINs/Alarm Codes<br/>Silent Alert]

    PS --> Emergency[Emergency Management]
    Emergency --> E1[Ingress/Egress Procedures]
    Emergency --> E2[Evacuation Areas]
    Emergency --> E3[Organization Contact Protocols]

    PS --> Training[Specialized Training]
    Training --> T3[Fire Alarms]
    Training --> T4[Recall Procedures]
```

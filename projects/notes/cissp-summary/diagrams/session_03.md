### Video V15: Due Care vs. Due Diligence (Workflow)

```mermaid
flowchart TD
    Start[Requirement Arises<br/>e.g., Protect Patient Data] --> DD1[Due Diligence: RESEARCH<br/>Investigate requirement & solutions]

    DD1 --> DC[Due Care: IMPLEMENT<br/>Implement solution to meet requirement]

    DC --> DD2[Due Diligence: MAINTAIN<br/>Continuously assess & maintain]

    DD2 --> Legal[Legal Implication]
    Legal --> Court[Determines Liability in Court<br/>After a Data Breach]

    subgraph Mnemonic
        M1["Due Care = DO / Protect"]
        M2["Due Diligence = DO / Maintain"]
    end
```

---

### Video V16: Key Laws and Regulations (Jurisdiction Map)

```mermaid
graph TD
    subgraph United States Laws
        FTC[FTC Act<br/>Consumer PII Protection]
        GLBA[GLBA<br/>Financial Data Safeguards]
        ECPA[ECPA<br/>Electronic Communications]
        HIPAA[HIPAA + HITECH<br/>Health Records / PHI]
        GINA[GINA<br/>Genetic Information]
        SOX[SOX<br/>Accounting Fraud Prevention]
    end

    subgraph EU Regulation
        GDPR[GDPR<br/>General Data Protection]
        GDPR --> Controller[Controller<br/>Determines Purpose & Means]
        GDPR --> Processor[Processor<br/>Does the Work]
        GDPR --> Rights[Subject Rights<br/>Access, Erasure, Portability]
    end

    subgraph Industry Standard
        PCI[PCI DSS<br/>Contractual, Treated as Regulation]
        PCI --> R12[12 High-Level Requirements]
        R12 --> FW[Firewall]
        R12 --> SC[Secure Config]
        R12 --> Encrypt[Encrypt Transmissions]
        R12 --> Monitor[Track/Audit Access]
    end
```

---

### Video V17: Intellectual Property Protection Types

```mermaid
graph LR
    IP[Intellectual Property] --> Patent[Patent<br/>Exclusive right to invention<br/>Unique code, hardware]

    IP --> Trademark[Trademark<br/>Identifies unique brand<br/>Logos, slogans]

    IP --> Copyright[Copyright<br/>Artistic work rights<br/>Life + 70 years]

    IP --> TradeSecret[Trade Secret<br/>Secret method for advantage<br/>Formulas, processes]

    IP --> Licensing[Licensing<br/>Legal terms of use<br/>EULA, Creative Commons]

    Threats[Threats] --> Espionage[Corporate Espionage]
    Protection[International Protection] --> WIPO[WIPO<br/>Technical Assistance]
    Protection --> WTO[WTO<br/>Legal Processes]
```

---

### Video V18: Export Controls & Wassenaar Arrangement

```mermaid
flowchart TD
    Purpose[Purpose: Prevent trade secrets &<br/>controlled tech from reaching<br/>unauthorized countries]

    Purpose --> WA[Wassenaar Arrangement<br/>42 Participating States]

    WA --> Category[Category 5: Telecommunications<br/>& Information Security]

    Category --> Crypto[Cryptography]
    Category --> CyberWeapons[Cyber Weapons]

    Purpose --> TDF[Transborder Data Flow]

    TDF --> Localization[Data Localization<br/>Process/store within country borders]

    TDF --> Trading[Data Trading<br/>Buying/selling data creates<br/>compliance responsibilities]
```

---

### Video V19: Cyber Crimes and Threat Actors

```mermaid
graph TD
    subgraph Key Concepts
        CC[Cyber Crime<br/>Criminal act using computing device]
        DB[Data Breach<br/>Unauthorized access to info]
    end

    subgraph Threat Actors
        TA[Attacker<br/>Any disruptor]
        TA --> Hacker[Hacker<br/>Uses computing devices]
        Hacker --> SK[Script Kiddies<br/>Unskilled, pre-configured tools]
        TA --> Insider[Insider Threat<br/>Internal personnel]
        TA --> State[State Actors<br/>Government-backed cyber warfare]
    end

    subgraph Types of Cyber Crimes
        Disruption[Disruption Crimes<br/>Target Availability]
        Disruption --> DoS[DoS/DDoS]
        Disruption --> DNS[DNS Poisoning]

        Destruction[Destruction Crimes<br/>Destroy Assets]
        Destruction --> Terror[Terrorism]
        Destruction --> Sanitization[Sanitization / Erasure]

        Hacktivism[Hacktivism<br/>Ideological/Political Motives]
        Hacktivism --> Deface[Website Defacement]
        Hacktivism --> Doxxing[Doxxing]
    end
```

---

### Video V20: Determining Compliance Requirements

```mermaid
flowchart LR
    subgraph Sources of Requirements
        C1[Contracts]
        C2[Legal Matters]
        C3[Industry Standards]
        C4[Regulatory Mandates]
    end

    Sources --> Core[Security Professional's Core Responsibility<br/>Determine Compliance Requirements]

    Core --> Consequences[Consequences of Failure]

    Consequences --> Civil[Civil Penalties<br/>Fines, Costs, Lawsuits]

    Consequences --> Criminal[Criminal Penalties<br/>Imprisonment]

    Core --> Key[Key Takeaway]
    Key --> K1[Laws apply to EVERY industry]
    Key --> K2[Understand requirements AND reasons]
```

---

### Video V21: Security Documentation Hierarchy

```mermaid
flowchart TD
    subgraph Hierarchy Order of Creation
        P[POLICY<br/>The 'WHY'<br/>High-level mandate] --> S[STANDARD<br/>The 'WHAT'<br/>Consistent requirements]

        S --> G[GUIDELINE<br/>The 'RECOMMENDATION'<br/>Best practices, optional]

        G --> Proc[PROCEDURE<br/>The 'HOW'<br/>Step-by-step instructions]

        Proc --> B[BASELINE<br/>The 'MINIMUM'<br/>Uniform template for future builds]
    end

    subgraph Types of Policies
        OP[Organizational Policy<br/>Goals, objectives, roles]
        ISP[Issue-Specific Policy<br/>e.g., Incident Response]
        SSP[System-Specific Policy<br/>BYOD, IoT]
    end

    subgraph Document Management
        DM1[Regular Review<br/>Due Diligence]
        DM2[Waiver Process<br/>Risk reviewed by stakeholders]
        DM3[Policies = Rarely change<br/>Standards/Procedures = Often change]
    end
```

---

### Bonus: Session 3 Complete Concept Map

```mermaid
mindmap
  root((Security Governance<br/>& Compliance))
    Due Care & Diligence
      Due Care = Protect/Implement
      Due Diligence = Research/Maintain
      Legal Liability Standard
    Laws & Regulations
      HIPAA / HITECH
      GDPR
      PCI DSS
      SOX / GLBA / FTC
    Intellectual Property
      Patents
      Trademarks
      Copyrights
      Trade Secrets
    Export Controls
      Wassenaar Arrangement
      Category 5 Cryptography
      Data Localization
    Cyber Crimes
      Threat Actors
      Disruption Crimes
      Destruction Crimes
      Hacktivism
    Documentation Hierarchy
      Policy Why
      Standard What
      Guideline Recommendation
      Procedure How
      Baseline Minimum
```

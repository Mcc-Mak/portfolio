### Video V51: The Three Data States (At Rest, In Transit, In Use)

```mermaid
graph TD
    subgraph Three Data States
        InUse[Data in Use<br/>Active in Memory/RAM<br/>Being processed]
        InTransit[Data in Transit<br/>Moving across network<br/>Source to destination]
        AtRest[Data at Rest<br/>Stored on media<br/>Inactive]
    end

    subgraph Key Characteristics
        V[Most VOLATILE<br/>Integrity at risk]
        R[Most at RISK<br/>CIA can be impacted]
        S[STATIC TARGET<br/>Vulnerable to APTs]
    end

    subgraph Security Focus
        F1[Strong AAA<br/>Authentication, Authorization, Accounting]
        F2[Encryption TLS/SSL<br/>Mutual authentication]
        F3[Full disk encryption<br/>TPM]
    end

    InUse --> V --> F1
    InTransit --> R --> F2
    AtRest --> S --> F3
```

---

### Video V52: Security Control Frameworks (COBIT, ISO 27002, NIST 800-53)

```mermaid
graph TD
    subgraph COBIT - ISACA
        C1[Focus: IT Governance]
        C2[Purpose: Align IT with business needs<br/>Improve efficiency & effectiveness]
        C3[Derived from: COSO<br/>Used for SOX 404 compliance]
        C4[5 Principles:<br/>Stakeholder needs, Enterprise end-to-end<br/>Single framework, Holistic, Governance vs Management]
    end

    subgraph ISO/IEC 27002
        I1[Focus: International Security Controls]
        I2[Structure: Control Objectives<br/>Policies, HR security, cryptography]
        I3[Evolved from: British Standard 7799<br/>Formally adopted 2005]
    end

    subgraph NIST SP 800-53
        N1[Focus: Security & Privacy Controls]
        N2[Adoption: US Federal Government<br/>Required by FISMA]
        N3[Structure: Control Families<br/>Access Control, Awareness & Training<br/>Audit & Accountability]
    end

    COBIT --> ISO27002
    ISO27002 --> NIST80053
```

---

### Video V53: Determining Security Controls (Baselines)

```mermaid
flowchart TD
    subgraph Key Principle
        KP[NEVER make up your own controls<br/>Always reference trusted sources]
    end

    subgraph High Watermark Principle
        HW[Protect system at the HIGHEST<br/>level of data sensitivity present]
    end

    subgraph The Process
        Step1[1. IDENTIFY Data Types<br/>PII, PHI, financial, classified]
        Step2[2. DOCUMENT<br/>Spreadsheet or GRC tool]
        Step3[3. SELECT CONTROLS<br/>From catalog: NIST 800-53, ISO 27002]
    end

    subgraph Control Baseline
        BL[Control Baseline<br/>List of ALL controls organization will use<br/>The MINIMUM starting point]
        Src[Source Example: NIST 800-53B<br/>Provides general control baseline]
    end

    KP --> HW
    HW --> Step1
    Step1 --> Step2 --> Step3
    Step3 --> BL
    BL --> Src
```

---

### Video V54: Selecting Security Controls (Scoping & Tailoring + PDCA)

```mermaid
graph TD
    subgraph Scoping vs Tailoring
        Scoping[SCOPING<br/>Determining which controls<br/>from baseline APPLY to environment]
        Tailoring[TAILORING<br/>Modifying the control baseline<br/>Tailor IN or Tailor OUT]
    end

    subgraph PDCA Deming Cycle for Controls
        Plan[PLAN<br/>Define security objectives<br/>Identify needed controls]
        Do[DO<br/>Implement the controls]
        Check[CHECK<br/>Assess effectiveness against objectives]
        Act[ACT<br/>Address gaps and improve]
    end

    Plan --> Do --> Check --> Act
    Act -.-> Plan

    subgraph Critical Distinction
        CD[Controls are RECOMMENDATIONS<br/>NOT Requirements<br/>System owner turns controls into requirements]
    end

    Scoping --> Plan
    Tailoring --> Plan
    Plan --> CD
```

---

### Video V55: Data Protection Methods (DRM, DLP, CASB)

```mermaid
graph TD
    subgraph DRM - Digital Rights Management
        DRM[Purpose: Enforce copyright protection<br/>Uses encryption for digital media]
        DRM --> Tech[Key Technologies:<br/>HDCP - Displays<br/>AACS - Blu-ray<br/>ADEPT - eBooks/PDFs]
    end

    subgraph DLP - Data Loss Prevention
        DLP[Purpose: Block unauthorized<br/>data exfiltration<br/>Egress monitoring]
        DLP --> Network[Network DLP<br/>Scans outgoing traffic<br/>Inline proxy = active blocking<br/>SPAN port = passive + remediation]
        DLP --> Endpoint[Endpoint DLP<br/>Installed on local servers<br/>Scans local file system]
    end

    subgraph CASB - Cloud Access Security Broker
        CASB[Purpose: Enforce security controls<br/>Between users and cloud assets]
        CASB --> Proxy[Functions as a PROXY<br/>Intermediary user ↔ cloud]
        CASB --> Functions[Key Functions:<br/>Data security, threat protection<br/>Real-time risk analysis, compliance]
    end

    DRM --> DLP
    DLP --> CASB
```

---

### Video V56: Data Retention Requirements (EOL/EOS)

```mermaid
graph TD
    subgraph Golden Rule
        GR[NEVER keep data longer than absolutely needed<br/>If regulation mandates 1 year = 365 days<br/>Destroy on day 366 to avoid liability]
    end

    subgraph Key Drivers
        Policy[Organizational Policy<br/>Internal rulebook aligned with laws]
        Laws[Laws & Regulations<br/>HIPAA, PCI DSS, GDPR, SOX, GLBA]
    end

    subgraph Asset Lifecycle Concepts
        EOL[End-of-Life - EOL<br/>Product no longer usable<br/>Expired license, hardware failure<br/>No replacement parts]
        EOS[End-of-Service - EOS<br/>Vendor will NOT provide<br/>Maintenance, patches, or support]
    end

    subgraph Exception
        Hold[Legal Holds<br/>Data involved in legal proceedings<br/>or security incidents<br/>Retain until case concludes<br/>Supersedes policy]
    end

    GR --> Policy
    Policy --> Laws
    Laws --> EOL
    Laws --> EOS
    EOL --> Hold
    EOS --> Hold
```

---

### Video V57: Managing Data Remnants (Sanitization)

```mermaid
graph TD
    subgraph Core Concept
        Remanence[Data Remanence<br/>Residual data after ineffective deletion<br/>Standard deletion = relocates data<br/>Not physically removed]
    end

    subgraph Declassification - Data Desensitization
        DeID[De-identification<br/>Remove PII to anonymize]
        Pseud[Pseudonymization<br/>Replace identifiers with aliases]
        Token[Tokenization<br/>Substitute with non-sensitive tokens<br/>Zero value]
        Obfusc[Obfuscation<br/>Conceal data<br/>Black boxes, masking]
    end

    subgraph Destruction Methods - Effectiveness Scale
        Erase[Erasing - LOW<br/>Removes file system pointers only]
        Clear[Clearing - HIGH<br/>Overwrites data completely]
        Purge[Purging - VERY HIGH<br/>Repeated clearing processes]
        Sanitize[Sanitization - MAXIMUM<br/>Complete removal, factory-like state]
    end

    subgraph Sanitization Techniques
        Degauss[Degaussing<br/>Strong magnetic fields<br/>Primarily for tapes]
        Zero[Zeroing<br/>Overwrites all data with zeros]
        Overwrite[Overwriting<br/>Random patterns of 1s and 0s<br/>More complex than zeroing]
    end

    subgraph Regulatory Guidance
        NIST[NIST SP 800-88<br/>Guidelines for Media Sanitization]
        ISO[ISO/IEC 27040<br/>Storage security standards]
    end

    Remanence --> DeID
    Remanence --> Pseud
    Remanence --> Token
    Remanence --> Obfusc

    Remanence --> Erase
    Erase --> Clear --> Purge --> Sanitize

    Sanitize --> Degauss
    Sanitize --> Zero
    Sanitize --> Overwrite

    Degauss --> NIST
    Overwrite --> ISO
```

---

### Bonus: Session 8 Complete Concept Map

```mermaid
mindmap
  root((Data Security Controls))
    Data States
      In Use: Most volatile, Strong AAA
      In Transit: Most at risk, TLS/SSL
      At Rest: Static target, Full disk encryption
    Control Frameworks
      COBIT: IT Governance, ISACA, SOX 404
      ISO 27002: International, Control Objectives
      NIST 800-53: US Federal, Control Families
    Baselines
      High Watermark Principle
      Never make up your own controls
    Scoping & Tailoring
      Scoping: Which apply?
      Tailoring: Modify baseline
      PDCA: Plan, Do, Check, Act
      Controls = Recommendations
    Protection Methods
      DRM: Copyright, encryption
      DLP: Network, Endpoint
      CASB: Cloud proxy
    Data Retention
      Golden Rule: Destroy day 366
      EOL vs EOS
      Legal Holds supersede
    Data Remanence
      De-identification, Pseudonymization
      Tokenization, Obfuscation
      Erase → Clear → Purge → Sanitize
      Degaussing, Zeroing, Overwriting
      NIST 800-88, ISO 27040
```

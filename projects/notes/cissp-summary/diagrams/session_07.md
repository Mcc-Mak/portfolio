### Video V43: Classifying Data and Assets (Sensitivity Levels)

```mermaid
graph TD
    subgraph Sensitive Data Types
        PII[PII - Personally Identifiable Information<br/>Uniquely identifies an individual]
        PHI[PHI - Protected Health Information<br/>Regulated by HIPAA]
        Proprietary[Proprietary Data<br/>Provides competitive advantage]
    end

    subgraph Classification - National Security / Military
        TS[Top Secret<br/>Grave/Severe damage]
        S[Secret<br/>Serious damage]
        C[Confidential<br/>Moderate damage]
        U[Unclassified<br/>No damage]
    end

    subgraph Classification - Civilian / Business
        Prop[Proprietary/Confidential<br/>Grave damage - acquisitions, vuln reports]
        Priv[Private<br/>Serious damage - PII, financial data]
        Sens[Sensitive<br/>Minimal damage - employee reviews]
        Pub[Public<br/>No damage - marketing]
    end

    subgraph Asset Classification - Tier System
        T0[Tier 0 - Essential<br/>Servers, databases, enterprise network]
        T1[Tier 1 - Important<br/>Dev environments, backups, local network]
        T2[Tier 2 - Non-Essential<br/>Workstations, mobile devices, printers]
        Sig[Significant Systems<br/>Required for compliance: FISMA, HIPAA, GDPR, PCI DSS]
    end
```

---

### Video V44: Information and Asset Handling (Marking, Labeling & Data States)

```mermaid
graph LR
    subgraph Marking vs Labeling
        Marking[Marking - PHYSICAL<br/>Physical identification<br/>Cover sheet with SECRET]
        Labeling[Labeling - LOGICAL/DIGITAL<br/>Metadata or watermarks<br/>Confidential watermark on PDF]
    end

    subgraph Three Data States
        InUse[Data in Use<br/>Being accessed/processed<br/>Protection: Authentication, Access Controls]
        InTransit[Data in Transit<br/>Moving across network<br/>Protection: VPN, TLS, Encryption]
        AtRest[Data at Rest<br/>Stored on media<br/>Protection: Full Disk Encryption]
    end

    Marking --> InUse
    Labeling --> AtRest
    Marking --> InTransit
    Labeling --> InUse
```

---

### Video V45: Managing System Assets (Secure Provisioning)

```mermaid
graph TD
    subgraph Secure Provisioning
        SP[Secure Provisioning<br/>Creating, managing, destroying assets<br/>throughout lifecycle]
    end

    subgraph Asset Inventory Tracking
        SC[Supply Chain<br/>Manufacturer, model, serial, version, vendor rep]
        OP[Operational<br/>Purchase date, install date, license, location, IP, dependencies]
        Maint[Maintenance<br/>Patches installed, warranty, spare assets]
        Perf[Performance<br/>CPU, memory, uptime/downtime, baseline]
    end

    subgraph Management Methods
        Storage[Storage<br/>Spreadsheets, databases, specialized software]
        Discovery[Discovery<br/>Nessus, Nmap - host discovery, banner grabbing]
        Process[Process<br/>Change Control or Configuration Management]
    end

    SP --> SC
    SP --> OP
    SP --> Maint
    SP --> Perf

    SC --> Storage
    OP --> Discovery
    Maint --> Process
    Perf --> Process
```

---

### Video V46: Data Roles and Responsibilities

```mermaid
graph TD
    subgraph Primary Data Roles
        Owner[Data Owner - The Manager<br/>Ultimate accountability<br/>Defines value & protection levels]
        Custodian[Data Custodian - The Implementer<br/>Implements physical, admin, logical controls<br/>On behalf of owner]
        Steward[Data Steward - The Specialist<br/>Subject matter expert (SME)<br/>Helps categorize & classify]
    end

    Owner --> Custodian
    Custodian --> Steward

    subgraph GDPR Regulatory Roles
        Controller[Data Controller<br/>Determines purpose & means<br/>The Data Owner in GDPR]
        Processor[Data Processor<br/>Collects & processes data<br/>On behalf of controller]
    end

    subgraph Access Roles
        Subject[Subject<br/>Any entity accessing an object<br/>Human, software, API]
        User[User<br/>Specific type of subject<br/>Identified & authenticated human]
        Object[Object<br/>Resource being accessed<br/>File, service, function]
    end

    Subject --> User
    User --> Object
```

---

### Video V47: Managing the Data Lifecycle (Create to Destroy)

```mermaid
flowchart LR
    subgraph Six Conceptual Phases
        P1[1. CREATE/COLLECT<br/>Data generated or gathered<br/>In accordance with policy]
        P2[2. CLASSIFY<br/>Data categorized<br/>Based on sensitivity & value]
        P3[3. STORE<br/>Data saved to medium<br/>On-prem, cloud, backup site]
        P4[4. USE/PROCESS<br/>Data accessed or modified]
        P5[5. ARCHIVE<br/>Moved to long-term storage<br/>Compliance or historical]
        P6[6. DESTROY<br/>Permanently deleted<br/>Media sanitized]
    end

    P1 --> P2 --> P3 --> P4 --> P5 --> P6

    subgraph Key Principles
        KP1[Protect from cradle to grave]
        KP2[Data value is dynamic<br/>May trigger reclassification]
        KP3[External factors matter<br/>Emerging threats, compliance updates]
    end

    P1 -.-> KP1
    P2 -.-> KP2
    P5 -.-> KP3
```

---

### Video V48: Information System Lifecycle (Part 1) - Initiation to Acquisition

```mermaid
graph TD
    subgraph NIST SP 800-64 - Five Phases
        P1[Phase 1: INITIATION<br/>Define stakeholder needs & requirements]
        P2[Phase 2: DEVELOPMENT & ACQUISITION<br/>Build vs. buy decision]
        P3[Phase 3: IMPLEMENTATION & ASSESSMENT<br/>Deploy, test, authorize]
        P4[Phase 4: OPERATIONS & MAINTENANCE<br/>Run & continuously improve]
        P5[Phase 5: DISPOSAL<br/>Decommission & dispose]
    end

    P1 --> P2 --> P3 --> P4 --> P5

    subgraph Phase 1 - Requirement Types
        BR[Business Requirements<br/>High-level objectives<br/>Process sales]
        FR[Functional Requirements<br/>Specific tasks<br/>Authenticate users]
        NFR[Non-Functional Requirements<br/>Qualities<br/>Performance, usability]
    end

    subgraph Phase 2 - Build vs Buy
        Build[BUILD<br/>More security attention<br/>Secure coding, testing]
        Buy[BUY/ACQUIRE<br/>Saves time<br/>Integration into architecture]
    end

    Build --> RA[Risk Assessment]
    Buy --> RA
    RA --> ControlSelect[Security Control Selection]
    ControlSelect --> Arch[Architectural Design]
    Arch --> Dev[Engineering & Development]
    Dev --> Integration[Integration]
```

---

### Video V49: Information System Lifecycle (Part 2) - Implementation to Disposal

```mermaid
graph TD
    subgraph Phase 3 - Implementation & Assessment
        VV[Verification & Validation<br/>Test system against requirements]
        VV --> SAR[Security Assessment Report<br/>Document findings]
        SAR --> POAM[POA&M - Plan of Action & Milestones<br/>Address deficiencies]
        POAM --> Auth[Authorization<br/>Authorizing Official issues ATO]
    end

    subgraph Phase 4 - Operations & Maintenance
        CM[Configuration Management<br/>Strictly control changes]
        CM --> ContMon[Continuous Monitoring<br/>Periodically assess controls]
        ContMon --> IR[Incident Response]
        IR --> Patch[Patch Management<br/>Keep systems updated]
    end

    subgraph Phase 5 - Disposal / Retirement
        Decom[Decommissioning<br/>Create transition plan]
        Decom --> DataPres[Data Preservation<br/>Retain for legal/regulatory compliance]
        DataPres --> MediaSan[Media Sanitization<br/>Degaussing, overwriting]
        MediaSan --> HWDisposal[Hardware/Software Disposal<br/>Physically destroy or remove]
    end

    Auth --> CM
    Patch --> Decom

    subgraph Sanitization Methods
        Degauss[Degaussing<br/>Magnetic field destruction]
        Overwrite[Overwriting<br/>Write patterns over data]
        Physical[Physical Destruction<br/>Shredding, crushing]
    end

    MediaSan --> Degauss
    MediaSan --> Overwrite
    MediaSan --> Physical
```

---

### Bonus: Session 7 Complete Concept Map

```mermaid
mindmap
  root((Asset Security))
    Data Classification
      Sensitive Types: PII, PHI, Proprietary
      Military: Top Secret, Secret, Confidential, Unclassified
      Business: Proprietary, Private, Sensitive, Public
    Asset Classification
      Tier 0: Essential
      Tier 1: Important
      Tier 2: Non-Essential
      Significant Systems
    Handling Requirements
      Marking: Physical
      Labeling: Logical/Digital
      Data in Use
      Data in Transit
      Data at Rest
    Secure Provisioning
      Inventory Tracking
      Discovery Tools
      Change Control
    Data Roles
      Owner: Manager, accountable
      Custodian: Implementer
      Steward: SME
      GDPR: Controller, Processor
    Data Lifecycle
      Create → Classify → Store → Use → Archive → Destroy
    Information System Lifecycle
      Initiation
      Development & Acquisition
      Implementation & Assessment
      Operations & Maintenance
      Disposal
```

### Video V68: System Architectures (Distributed, Client-Based)

```mermaid
graph TD
    subgraph Distributed Systems
        DS[Systems connected by network<br/>Share resources for integrated system]
        DSRisks[Key Risks:<br/>Endpoints - vulnerable if unpatched<br/>Network communications - unsecured<br/>Poor security awareness]
    end

    subgraph Client-Based Systems
        CB[Requires agent on endpoint<br/>to connect to server<br/>Key Concern: Data flow security]
        
        subgraph Client Types
            Thick[Thick Client<br/>Self-contained<br/>Outlook, Thunderbird]
            Thin[Thin Client<br/>Relies on remote server<br/>Web browser]
            Zero[Zero Client<br/>Server does all processing<br/>VDI]
        end
    end

    subgraph Security Best Practices
        BP1[Maintain security patches]
        BP2[Deny by default, permit by exception]
        BP3[Enable monitoring and logging]
        BP4[Disable unnecessary accounts<br/>Change default passwords]
    end

    DS --> DSRisks
    CB --> Thick
    CB --> Thin
    CB --> Zero
    DSRisks --> BP1
    CB --> BP1
```

---

### Video V69: Database Systems (Aggregation, Inference, ACID)

```mermaid
graph TD
    subgraph Database Architecture
        Tables[Tables: rows/tuples, columns/attributes]
        PK[Primary Key: unique identifier]
        FK[Foreign Key: references another table]
        Schema[Schema: defines database structure]
    end

    subgraph Security Concepts
        Agg[Aggregation<br/>Combining data from multiple tables]
        AggAttack[Aggregation Attack<br/>Query multiple tables to gather scattered data]
        Inf[Inference Attack<br/>Use aggregated data to deduce hidden info]
        Poly[Polyinstantiation<br/>Multiple entries with same primary key<br/>Different sensitivity levels]
    end

    subgraph ACID Framework
        A[Atomicity<br/>All or nothing<br/>Prevents dirty reads]
        C[Consistency<br/>Data must comply with rules<br/>Prevents lost updates]
        I[Isolation<br/>Transactions kept separate<br/>Enforces concurrency]
        D[Durability<br/>Completed transactions persist<br/>After system failure]
    end

    Tables --> PK
    Tables --> FK
    PK --> Schema
    Agg --> AggAttack
    AggAttack --> Inf
    Inf --> Poly
    
    A --> C --> I --> D
```

---

### Video V70: Common Criteria (EAL Levels)

```mermaid
graph TD
    subgraph Common Criteria - ISO/IEC 15408
        CC[Internationally recognized standard<br/>for IT security evaluation]
        Parts[Three Parts:<br/>Part 1: Introduction<br/>Part 2: Security Functional Requirements<br/>Part 3: Security Assurance Requirements]
    end

    subgraph Key Components
        TOE[TOE - Target of Evaluation<br/>Software, firmware, hardware]
        PP[PP - Protection Profile<br/>Template defining desired security needs<br/>Reusable]
        ST[ST - Security Target<br/>High-level definition for specific TOE]
    end

    subgraph EAL Levels 1-7
        EAL1[EAL 1: Functionally tested<br/>Basic operations]
        EAL2[EAL 2: Structurally tested<br/>Design info available]
        EAL3[EAL 3: Methodically tested/checked<br/>First independent review]
        EAL4[EAL 4: Methodically designed/tested<br/>Operating systems: Windows, Linux]
        EAL5[EAL 5: Semi-formally designed<br/>Smart cards, authentication]
        EAL6[EAL 6: Semi-formally verified<br/>Government/military assets]
        EAL7[EAL 7: Formally verified<br/>Life-critical systems]
    end

    subgraph Drawbacks
        D1[Manufacturers choose what gets evaluated<br/>Can hide shortcomings]
        D2[Focuses strictly on product<br/>Not personnel, physical security, or BCP/DR]
    end

    CC --> Parts
    Parts --> TOE
    TOE --> PP
    PP --> ST
    ST --> EAL1 --> EAL2 --> EAL3 --> EAL4 --> EAL5 --> EAL6 --> EAL7
    EAL7 --> D1
    D1 --> D2
```

---

### Video V71: Industrial Control Systems (ICS/SCADA)

```mermaid
graph TD
    subgraph Core Components
        PLC[PLC - Programmable Logic Controller<br/>Programmable digital computer<br/>Regulates speed, temperature, valves, sensors]
        DCS[DCS - Distributed Control System<br/>Contained within same facility<br/>Distributes automation across environment]
        SCADA[SCADA - Supervisory Control<br/>and Data Acquisition<br/>Centrally acquires data<br/>Controls distributed assets over network]
    end

    subgraph SCADA Subcomponents
        RTU[RTU - Remote Terminal Unit<br/>Connects to sensors via radio frequency]
        HMI[HMI - Human Machine Interface<br/>How humans interact with controller]
        DNP[DNP - Distributed Network Protocol<br/>Open standard for electric, water, transportation]
    end

    subgraph Vulnerabilities
        V1[Old and outdated systems]
        V2[Built before security was priority]
        V3[Low-complexity attacks effective<br/>DoS, command injection]
        V4[Potential impact: destruction of food/water<br/>Release of hazardous chemicals]
    end

    SCADA --> RTU
    SCADA --> HMI
    SCADA --> DNP
    PLC --> V1
    DCS --> V2
    SCADA --> V3
    V1 --> V2 --> V3 --> V4
```

---

### Video V72: SASE (Secure Access Service Edge)

```mermaid
graph LR
    subgraph SASE Definition
        SASE[Cloud-native framework<br/>Unifies SD-WAN + Security<br/>Single cloud-delivered service]
    end

    subgraph Core Components
        FWaaS[FWaaS<br/>Firewall as a Service<br/>Cloud-based firewall]
        SWG[SWG<br/>Secure Web Gateway<br/>Web filtering, malware, DLP]
        CASB[CASB<br/>Cloud Access Security Broker<br/>Visibility & control over cloud apps]
        ZTNA[ZTNA<br/>Zero Trust Network Access<br/>Identity-centric security]
    end

    subgraph Architecture Flow
        Users[Users] --> SSE[Secure Service Edge]
        SSE --> SDWAN[SD-WAN / Internet]
        SDWAN --> Dest[Destinations<br/>HQ, Cloud, SaaS]
    end

    SASE --> FWaaS
    SASE --> SWG
    SASE --> CASB
    SASE --> ZTNA

    FWaaS --> SSE
    SWG --> SSE
    CASB --> SSE
    ZTNA --> SSE
```

---

### Video V73: Internet of Things (IoT)

```mermaid
graph TD
    subgraph Definition
        IoT[Any device that can communicate over internet<br/>Refrigerators, cameras, sensors<br/>Medical devices, cars]
    end

    subgraph Security Challenges
        C1[Cannot be managed like traditional IT<br/>No SSH, VPN, antivirus]
        C2[Limited security capabilities]
        C3[Often built without security in mind]
    end

    subgraph Security Best Practices
        BP1[Threat modeling for IoT devices]
        BP2[Follow industry standards<br/>NIST, OWASP]
        BP3[Change default accounts and passwords]
        BP4[Isolate/segment IoT traffic<br/>from core networks]
        BP5[Monitor IoT communications<br/>for unusual patterns]
    end

    IoT --> C1
    C1 --> C2 --> C3
    C3 --> BP1
    BP1 --> BP2 --> BP3 --> BP4 --> BP5
```

---

### Video V74: Microservices & API Gateways

```mermaid
graph TD
    subgraph Microservices
        MS[Mini applications/services<br/>Work together to form system<br/>Fine-grained control]
    end

    subgraph Key Components
        APIG[API Gateway<br/>Entry point to backend microservices<br/>Routes requests, protocol translation, logging]
        SM[Service Mesh<br/>Dedicated infrastructure<br/>Service-to-service communications<br/>Resiliency and security]
    end

    subgraph Security Measures
        S1[API Keys<br/>For non-sensitive communications]
        S2[Authentication Tokens - JWT<br/>For sensitive functions<br/>SAML, OpenID, OAuth]
        S3[Access Control<br/>Enable default policies<br/>Prevent privilege escalation]
        S4[Network Segmentation<br/>Control and filter traffic<br/>For sensitive applications]
    end

    MS --> APIG
    MS --> SM
    APIG --> S1
    APIG --> S2
    SM --> S3
    SM --> S4
```

---

### Video V75: Embedded Systems

```mermaid
graph TD
    subgraph Definition
        ES[Dedicated computing component<br/>Microprocessor/microcontroller<br/>Embedded within larger device<br/>Pacemakers, ICS, automotive, medical]
    end

    subgraph Attack Vectors
        UI[User Interface<br/>Brute force inputs to unlock privileged features]
        Phys[Physical<br/>Steal device, deny service, manipulate buttons]
        Sensor[Sensor Attacks<br/>Trick input sensors<br/>Vending machines, keyless entry]
        Output[Output Attacks<br/>Manipulate actuators<br/>Electronic door locks]
        FW[Processor/Firmware Attacks<br/>Target memory/processor<br/>Install rogue firmware]
    end

    subgraph Protection Strategies
        P1[Threat modeling]
        P2[Network segmentation - isolate traffic]
        P3[Application firewall]
        P4[Wrapping/encapsulation<br/>Add security features not natively supported]
        P5[Manual updates with digital signatures]
        P6[Redundancy; limit diversity]
    end

    ES --> UI
    ES --> Phys
    ES --> Sensor
    ES --> Output
    ES --> FW
    UI --> P1
    Phys --> P2
    Sensor --> P3
    Output --> P4
    FW --> P5
    P5 --> P6
```

---

### Video V76: High-Performance Computing (HPC)

```mermaid
graph TD
    subgraph Definition
        HPC[Supercomputers running in parallel<br/>Solve complex mathematical problems<br/>Millions of simultaneous tasks]
    end

    subgraph Applications
        App1[Research: atmospheric, nuclear, bioscience]
        App2[Industry: healthcare, life sciences, energy]
        App3[Technology: big data, crypto, medical imaging]
    end

    subgraph Key Challenges
        CH1[Massive space: up to 10M CPU cores]
        CH2[High energy: generators, UPS]
        CH3[Complex data separation & access control]
        CH4[Geographically dispersed users]
        CH5[Unreviewed R&D code - potential damage]
    end

    subgraph Security Measures
        M1[Threat modeling]
        M2[Data isolation and segmentation]
        M3[Hardware security: trusted execution]
        M4[Multi-factor authentication]
        M5[Identity management - reduce insider threats]
        M6[Compliance: NIST, OWASP]
    end

    HPC --> App1
    HPC --> App2
    HPC --> App3
    App1 --> CH1 --> CH2 --> CH3 --> CH4 --> CH5
    CH5 --> M1 --> M2 --> M3 --> M4 --> M5 --> M6
```

---

### Video V77: Edge Computing Systems (Fog Computing)

```mermaid
graph TD
    subgraph Definition
        Edge[Edge Computing / Fog Computing<br/>Computing resources near data source<br/>Moves processing from centralized data centers<br/>to network edge]
    end

    subgraph Benefits
        B1[Increased data availability]
        B2[Better network performance<br/>Reduced bandwidth demands]
        B3[Improved data protection<br/>Minimizes data shared over internet]
    end

    subgraph Risks & Challenges
        R1[Physical tampering of sensors/IoT devices]
        R2[Poor security on edge devices]
        R3[Difficult management - no remote access]
        R4[Limited security capabilities<br/>Hard to implement antivirus, endpoint security]
        R5[Potential attack vectors into protected areas]
    end

    subgraph Security Approaches
        S1[Follow industry standards: NIST, OWASP]
        S2[Change default accounts, passwords, certificates]
        S3[Update firmware frequently; apply patches]
        S4[Remove unnecessary protocols and services]
        S5[Network segmentation: isolate edge traffic<br/>in own VLAN]
    end

    Edge --> B1 --> B2 --> B3
    B3 --> R1 --> R2 --> R3 --> R4 --> R5
    R5 --> S1 --> S2 --> S3 --> S4 --> S5
```

---

### Bonus: Session 10 Complete Concept Map

```mermaid
mindmap
  root((Secure Architecture Design))
    System Architectures
      Distributed: endpoint & network risks
      Client-Based: thick, thin, zero clients
      Best practices: patches, deny default, monitor
    Database Systems
      Aggregation & Inference attacks
      Polyinstantiation
      ACID: Atomicity, Consistency, Isolation, Durability
    Common Criteria
      ISO/IEC 15408
      TOE, PP, ST
      EAL 1-7: EAL4 for OS, EAL5+ for specialized
      Drawbacks: manufacturer choice, product only
    ICS/SCADA
      PLC, DCS, SCADA
      RTU, HMI, DNP
      Vulnerabilities: outdated, insecure-by-design
    SASE
      FWaaS, SWG, CASB, ZTNA
      Cloud-native, unified framework
    IoT
      Challenges: non-traditional management
      Best practices: isolation, segmentation, monitoring
    Microservices
      API Gateway, Service Mesh
      JWT tokens, access control, segmentation
    Embedded Systems
      Attack vectors: UI, physical, sensor, output, firmware
      Protections: wrapping, segmentation, signatures
    HPC
      Challenges: massive scale, energy, global users
      Measures: MFA, hardware security, isolation
    Edge Computing
      Benefits: availability, performance, protection
      Risks: tampering, poor security, limited capabilities
      Approaches: segmentation, updates, standards
```

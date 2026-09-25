## Session 18: Secure Network Design

### 1. Architecture Planes (V129)

```mermaid
flowchart TB
    subgraph Management["Management Plane"]
        M1[SNMP]
        M2[ICMP]
        M3[Orchestration]
        M4[Automation]
    end

    subgraph Control["Control Plane"]
        C1[Routing Tables]
        C2[OSPF / BGP]
        C3[Best Path Decision]
    end

    subgraph Data["Data Plane (Forwarding Plane)"]
        D1[Packet Forwarding]
        D2[Uses Existing Rules]
        D3[No Routing Decisions]
    end

    Management --> Control
    Control --> Data
    Data --> D4[(Network Traffic)]
```

### 2. Network Topologies Comparison

```mermaid
flowchart LR
    subgraph Point-to-Point
        direction LR
        A1[Device A] --- A2[Device B]
    end

    subgraph Bus
        direction TB
        B1[Device] --- B3[Backbone Cable]
        B2[Device] --- B3
        B4[Device] --- B3
    end

    subgraph Star
        direction TB
        S1[Device] --- S3[Hub/Switch]
        S2[Device] --- S3
        S4[Device] --- S3
    end

    subgraph Ring
        direction LR
        R1[Device] --- R2[Device] --- R3[Device] --- R4[Device] --- R1
    end

    subgraph Mesh
        direction TB
        M1[Device] --- M2[Device]
        M1 --- M3[Device]
        M1 --- M4[Device]
        M2 --- M3
        M2 --- M4
        M3 --- M4
    end
```

### 3. Physical vs. Logical Segmentation

```mermaid
flowchart TB
    subgraph Physical["Physical Segmentation"]
        direction LR
        P1[Physical Port 1] --> P_Server1[Server A]
        P2[Physical Port 2] --> P_Server2[Server B]
        P3[Physical Port 3] --> P_Server3[Server C]
    end

    subgraph Logical["Logical Segmentation (VLAN)"]
        direction LR
        L1[Floor 1 - Accounting] --> L_VLAN1[VLAN 10 - Accounting]
        L2[Floor 2 - Accounting] --> L_VLAN1
        L3[Floor 3 - Marketing] --> L_VLAN2[VLAN 20 - Marketing]
        L4[Floor 1 - Marketing] --> L_VLAN2
    end
```

### 4. North-South vs. East-West Traffic (V131)

```mermaid
flowchart TB
    Internet((Internet))
    
    subgraph Network["Corporate Network"]
        direction TB
        FW[Firewall]
        
        subgraph Internal["Internal Network"]
            direction LR
            Web[Web Server]
            App[App Server]
            DB[(Database)]
        end
    end

    Internet -->|Northbound / Ingress| FW
    FW -->|Southbound / Egress| Internet
    
    Web <-->|East-West / Lateral| App
    App <-->|East-West / Lateral| DB
    
    style Internet fill:#f9f,stroke:#333,stroke-width:2px
    style FW fill:#ff9,stroke:#333,stroke-width:2px
    style Internal fill:#9f9,stroke:#333,stroke-width:2px
```

---

## Session 19: Firewall Architectures (V139)

### 1. Four Firewall Architectures Comparison

```mermaid
flowchart TB
    subgraph Multihomed["1. Multihomed Firewall"]
        direction LR
        M_Internet((Internet)) --> M_FW[Firewall]
        M_FW --> M_Trusted[Trusted LAN]
        M_FW --> M_Semi[Guest Wi-Fi]
    end

    subgraph Bastion["2. Bastion Host"]
        direction LR
        B_Internet((Internet)) --> B_Bastion[Bastion Host\n(Hardened Server)]
        B_Bastion --> B_Private[Private Cloud]
    end

    subgraph ScreenedHost["3. Screened Host"]
        direction TB
        SH_Internet((Internet)) --> SH_FW[Firewall]
        SH_FW --> SH_Trusted[Trusted Network]
        SH_Trusted --> SH_Host[Screened Host\n(Inspects Inbound)]
        SH_Host --> SH_Server[Internal Server]
    end

    subgraph ScreenedSubnet["4. Screened Subnet (DMZ)"]
        direction LR
        SS_Internet((Internet)) --> SS_FW1[External Firewall]
        SS_FW1 --> SS_DMZ[DMZ\n(Semi-Trusted)]
        SS_DMZ --> SS_FW2[Internal Firewall]
        SS_FW2 --> SS_LAN[Trusted LAN]
    end
```

### 2. Screened Subnet (DMZ) Detailed

```mermaid
flowchart TB
    Internet((Internet))
    
    subgraph DMZ_Architecture["DMZ Architecture"]
        FW_Ext[External Firewall]
        
        subgraph DMZ["DMZ (Semi-Trusted)"]
            Web[Web Server]
            Mail[Mail Server]
            DNS[DNS Server]
        end
        
        FW_Int[Internal Firewall]
        
        subgraph Trusted["Trusted LAN"]
            DB[(Database)]
            Internal[Internal Apps]
        end
    end

    Internet -->|Untrusted| FW_Ext
    FW_Ext -->|Allowed: HTTP/HTTPS/SMTP| DMZ
    DMZ -->|Specific Queries Only| FW_Int
    FW_Int -->|Trusted Traffic| Trusted
    
    style Internet fill:#f99,stroke:#333,stroke-width:2px
    style DMZ fill:#ff9,stroke:#333,stroke-width:2px
    style Trusted fill:#9f9,stroke:#333,stroke-width:2px
```

---

## Session 21: Wireless Security (V155)

### 1. Wireless Encryption Standards Evolution

```mermaid
timeline
    title Wireless Security Evolution
    1997 : 802.11 WEP
         : 64/128-bit RC4
         : ❌ Broken
    2003 : WPA
         : TKIP + RC4
         : ❌ Broken
    2004 : WPA2
         : CCMP + AES
         : ✅ Current Standard
    2018 : WPA3
         : 192-bit AES + SAE
         : ✅ Most Secure
```

### 2. Wireless Attack Types

```mermaid
flowchart TB
    subgraph Attacks["Wireless Network Attacks"]
        direction TB
        
        subgraph Rogue["Rogue Access Point"]
            R1[Attacker] -->|Installs| R2[Fake AP]
            R2 -->|Connected to| R3[Network Switch]
        end
        
        subgraph EvilTwin["Evil Twin"]
            E1[Attacker] -->|Creates| E2[Clone of Legitimate AP]
            E2 -->|Captures| E3[Credentials via Captive Portal]
        end
        
        subgraph KRACK["KRACK Attack"]
            K1[Attacker] -->|Compromises| K2[WPA2 4-Way Handshake]
            K2 -->|Reuses| K3[Encryption Keys]
        end
    end
```

---

## Session 22: Identity and Access Lifecycle (V162)

```mermaid
flowchart LR
    subgraph Lifecycle["Identity and Access Lifecycle"]
        direction LR
        
        Provisioning["1. Provisioning\n(Creation)"]
        Review["2. Review\n(Management)"]
        Revocation["3. Revocation\n(Deprovisioning)"]
        
        Provisioning -->|"Regular Audits"| Review
        Review -->|"Role Changes / Termination"| Revocation
        Revocation -.->|"Keep Account (Disabled)"| Archive[Account Archive]
        Revocation -.->|"Delete (After Retention)"| Delete[Account Deletion]
    end
    
    style Provisioning fill:#9f9,stroke:#333,stroke-width:2px
    style Review fill:#ff9,stroke:#333,stroke-width:2px
    style Revocation fill:#f99,stroke:#333,stroke-width:2px
```

---

## Session 23: Access Control Models (V172, V173)

```mermaid
flowchart TB
    subgraph DAC["DAC - Discretionary Access Control"]
        Owner[Object Owner] -->|Decides| ACL[Access Control List]
        ACL -->|"Read/Write/Execute"| Subject[Subject]
    end

    subgraph MAC["MAC - Mandatory Access Control"]
        Policy[Security Policy] -->|Labels| Object[Object: Secret]
        Policy -->|Clearance| Subject2[Subject: Secret Clearance]
        Object <-->|"Access Granted (Secret = Secret)"| Subject2
    end

    subgraph RBAC["RBAC - Role-Based Access Control"]
        Roles[Roles: Admin, Engineer, Analyst] -->|Assigned to| Subject3[Subject]
        Roles -->|Permissions| Resources[Resources]
    end

    subgraph ABAC["ABAC - Attribute-Based Access Control"]
        Attributes[Attributes: Role, Clearance, Location, Time] -->|Policy| Decision{Access Decision}
        Subject4[Subject] --> Attributes
        Object2[Object] --> Attributes
        Decision -->|Permit/Deny| Access
    end
```

---

## Session 24: Session Management (V178)

### Session Hijacking Attack Flow

```mermaid
sequenceDiagram
    participant User as User (Victim)
    participant Browser as Web Browser
    participant Attacker as Attacker (MITM)
    participant Server as Web Server

    User->>Browser: Login with Credentials
    Browser->>Server: Authentication Request
    Server-->>Browser: Session Token (Cookie)
    
    Note over Attacker: Attacker Sniffs Traffic
    
    Attacker->>Attacker: Captures Session Token
    
    Attacker->>Server: Replays Session Token
    Server-->>Attacker: Access Granted (Impersonates User)
    
    Note over User,Server: User continues unaware
```

---

## Session 25: Security Test vs. Assessment (V181)

```mermaid
flowchart LR
    subgraph Test["Security Test"]
        T1[Specific Control] --> T2[Test Performance] --> T3[Identify Flaws]
    end

    subgraph Assessment["Security Assessment"]
        A1[Full System] --> A2[Analyze Risk] --> A3[Report to Management]
    end

    subgraph Audit["Security Audit"]
        AU1[Independent Body] --> AU2[Compliance Check] --> AU3[Compliant / Non-Compliant]
    end
    
    style Test fill:#9f9,stroke:#333,stroke-width:2px
    style Assessment fill:#ff9,stroke:#333,stroke-width:2px
    style Audit fill:#f9f,stroke:#333,stroke-width:2px
```

---

## Session 26: Penetration Testing Phases (V191)

```mermaid
flowchart LR
    subgraph Phases["Penetration Testing Phases"]
        direction LR
        P1["1. Discovery\n(Passive Recon)\nOSINT, Footprinting"]
        P2["2. Scanning\n(Active Recon)\nPing Sweeps, Port Scans"]
        P3["3. Exploitation\nBypass Controls\nMetasploit"]
        P4["4. Post-Exploitation\nPivot, Maintain Access\nCover Tracks"]
        P5["5. Reporting\nExecutive Summary\nTechnical Report"]
    end
    
    P1 --> P2 --> P3 --> P4 --> P5
    
    style P1 fill:#9f9,stroke:#333,stroke-width:2px
    style P2 fill:#9f9,stroke:#333,stroke-width:2px
    style P3 fill:#ff9,stroke:#333,stroke-width:2px
    style P4 fill:#f99,stroke:#333,stroke-width:2px
    style P5 fill:#f9f,stroke:#333,stroke-width:2px
```

---

## Session 27: IDS/IPS Deployment (V203)

```mermaid
flowchart TB
    Internet((Internet))
    
    subgraph Network["Network Infrastructure"]
        FW[Firewall]
        
        subgraph Inline["Inline (IPS)"]
            IPS[IPS - Active]
        end
        
        subgraph Passive["Passive (IDS)"]
            IDS[IDS - Monitor Only]
            SPAN[SPAN / Mirror Port]
        end
        
        Switch[Network Switch]
        Servers[Servers / Hosts]
        
        subgraph Host["Host-Based"]
            HIDS[HIDS/HIPS on each host]
        end
    end

    Internet --> FW --> IPS --> Switch --> Servers
    SPAN -->|Copy of Traffic| IDS
    FW -->|Bypass| SPAN
    Servers --> HIDS
    
    style IPS fill:#ff9,stroke:#333,stroke-width:2px
    style IDS fill:#9f9,stroke:#333,stroke-width:2px
    style HIDS fill:#f9f,stroke:#333,stroke-width:2px
```

---

## Session 28: MITRE ATT&CK Framework (V212)

```mermaid
flowchart LR
    subgraph ATTACK["MITRE ATT&CK Framework"]
        direction LR
        R[Reconnaissance] --> RD[Resource Development] --> IA[Initial Access] --> EX[Execution] --> P[Persistence] --> PE[Privilege Escalation] --> DE[Defense Evasion] --> CA[Credential Access] --> D[Discovery] --> C[Collection] --> C2[Command & Control] --> E[Exfiltration] --> I[Impact]
    end
    
    style R fill:#9f9,stroke:#333,stroke-width:2px
    style IA fill:#ff9,stroke:#333,stroke-width:2px
    style PE fill:#f99,stroke:#333,stroke-width:2px
    style C2 fill:#f9f,stroke:#333,stroke-width:2px
```

---

## Session 29: Configuration Management Process (V217)

```mermaid
flowchart TB
    subgraph CM["NIST SP 800-128 Four Phases"]
        direction LR
        
        P1["1. Planning\n- Identify CIs\n- Create CM Policy\n- Establish CCB"]
        P2["2. Identifying & Implementing\n- Define Baseline\n- Provisioning\n- Version Control"]
        P3["3. Controlling\n- Security Impact Assessment\n- Update Documentation"]
        P4["4. Monitoring\n- Analyze Compliance\n- Integrity Tools (Tripwire/AIDE)\n- Vulnerability Scans"]
    end
    
    P1 --> P2 --> P3 --> P4
    P4 -.->|Continuous Improvement| P1
    
    style P1 fill:#9f9,stroke:#333,stroke-width:2px
    style P2 fill:#9f9,stroke:#333,stroke-width:2px
    style P3 fill:#ff9,stroke:#333,stroke-width:2px
    style P4 fill:#f9f,stroke:#333,stroke-width:2px
```

---

## Session 30: Incident Response Lifecycle (V223)

```mermaid
flowchart LR
    subgraph IR["Incident Response Lifecycle (NIST 800-61)"]
        direction LR
        Prep["Preparation\nPolicy, Team, Tools"]
        Detect["Detection & Analysis\nTriage"]
        Contain["Containment\nMitigation"]
        Erad["Eradication\nRemediation"]
        Rec["Recovery\nRestore Operations"]
        Lessons["Lessons Learned\nPost-Mortem"]
    end
    
    Prep --> Detect --> Contain --> Erad --> Rec --> Lessons
    Lessons -.->|Update| Prep
    
    style Prep fill:#9f9,stroke:#333,stroke-width:2px
    style Detect fill:#ff9,stroke:#333,stroke-width:2px
    style Contain fill:#f99,stroke:#333,stroke-width:2px
    style Lessons fill:#f9f,stroke:#333,stroke-width:2px
```

---

## Session 31: BIA Metrics (MTD, RTO, RPO, WRT) (V231)

```mermaid
flowchart LR
    subgraph Timeline["Disaster Recovery Timeline"]
        direction LR
        T0[Incident Occurs\nTime = 0]
        T1[RTO Target\nSystems Restored]
        T2[WRT Completed\nBusiness Resumes]
        T3[MTD Deadline\nIrreversible Damage]
    end
    
    T0 -->|"IT Recovery Goal"| T1
    T1 -->|"Work Recovery Time"| T2
    T0 -->|"Maximum Tolerable Downtime"| T3
    
    subgraph Formula["Formula"]
        F1["RTO + WRT ≤ MTD"]
    end
    
    style T0 fill:#f99,stroke:#333,stroke-width:2px
    style T1 fill:#ff9,stroke:#333,stroke-width:2px
    style T2 fill:#9f9,stroke:#333,stroke-width:2px
    style T3 fill:#f9f,stroke:#333,stroke-width:2px
```

### Recovery Site Types Comparison

```mermaid
flowchart TB
    subgraph Sites["Disaster Recovery Sites"]
        direction LR
        
        subgraph Cold["Cold Site"]
            C1[Empty Building]
            C2[No Equipment]
            C3[No Data]
            C4[Cost: Lowest]
            C5[Activation: Days to Weeks]
        end
        
        subgraph Warm["Warm Site"]
            W1[Pre-configured Equipment]
            W2[Basic Infrastructure]
            W3[No Operational Data]
            W4[Cost: Moderate]
            W5[Activation: ~12 Hours]
        end
        
        subgraph Hot["Hot Site"]
            H1[Full Suite Equipment]
            H2[Full Infrastructure]
            H3[Near Real-Time Data]
            H4[Cost: Highest]
            H5[Activation: Minutes to Hours]
        end
    end
    
    Cold -->|More Cost, Faster Recovery| Warm -->|More Cost, Faster Recovery| Hot
    
    style Cold fill:#9f9,stroke:#333,stroke-width:2px
    style Warm fill:#ff9,stroke:#333,stroke-width:2px
    style Hot fill:#f99,stroke:#333,stroke-width:2px
```

---

## Session 32: SDLC Phases (V239)

```mermaid
flowchart LR
    subgraph SDLC["NIST SP 800-64 SDLC"]
        direction LR
        I[Initiation\n- Define Need\n- Privacy Impact Assessment\n- Build vs. Buy]
        DA[Development & Acquisition\n- Risk Assessment\n- Security Controls\n- Architecture Design]
        IMP[Implementation\n- Deploy to Production\n- Security Assessment]
        OM[Operations & Maintenance\n- Configuration Management\n- Continuous Monitoring]
        D[Disposal\n- Sanitize Data\n- Remove from Operations]
    end
    
    I --> DA --> IMP --> OM --> D
    
    style I fill:#9f9,stroke:#333,stroke-width:2px
    style DA fill:#9f9,stroke:#333,stroke-width:2px
    style IMP fill:#ff9,stroke:#333,stroke-width:2px
    style OM fill:#f9f,stroke:#333,stroke-width:2px
    style D fill:#f99,stroke:#333,stroke-width:2px
```

### DevOps / DevSecOps CI/CD Pipeline (V243)

```mermaid
flowchart LR
    subgraph Pipeline["CI/CD Pipeline"]
        direction LR
        Code[Code Commit] --> Build[Build]
        Build --> Unit[Unit Test]
        Unit --> SAST[SAST Scan]
        SAST --> DeployTest[Deploy to Test]
        DeployTest --> DAST[DAST Scan]
        DAST --> Approve{Approval Gate}
        Approve -->|Approved| DeployProd[Deploy to Production]
        DeployProd --> Monitor[Continuous Monitoring]
    end
    
    style SAST fill:#9f9,stroke:#333,stroke-width:2px
    style DAST fill:#ff9,stroke:#333,stroke-width:2px
    style Approve fill:#f99,stroke:#333,stroke-width:2px
    style Monitor fill:#f9f,stroke:#333,stroke-width:2px
```

---

## Session 33: SAST vs. DAST (V250)

```mermaid
flowchart TB
    subgraph SAST["SAST - Static Application Security Testing"]
        direction TB
        S_Code[Source Code] --> S_Analysis[Analyze Without Execution]
        S_Analysis --> S_Findings[Find: Bugs, Flaws, Vulnerabilities]
        S_When[When: Early in SDLC]
        S_Type[White Box - Internal Testers]
    end

    subgraph DAST["DAST - Dynamic Application Security Testing"]
        direction TB
        D_App[Running Application] --> D_Analysis[Test in Production/Test Environment]
        D_Analysis --> D_Findings[Find: Runtime Issues, Injection Flaws]
        D_When[When: Late in SDLC / Production]
        D_Type[Black Box - External Testers]
    end

    style SAST fill:#9f9,stroke:#333,stroke-width:2px
    style DAST fill:#ff9,stroke:#333,stroke-width:2px
```

### OWASP Top 10 2017 vs. 2021 (V254–V256)

```mermaid
flowchart LR
    subgraph OWASP2017["OWASP Top 10 (2017)"]
        direction TB
        A1_2017["A1: Injection"]
        A2_2017["A2: Broken Authentication"]
        A3_2017["A3: Sensitive Data Exposure"]
        A4_2017["A4: XXE"]
        A5_2017["A5: Broken Access Control"]
        A6_2017["A6: Security Misconfiguration"]
        A7_2017["A7: XSS"]
        A8_2017["A8: Insecure Deserialization"]
        A9_2017["A9: Components with Known Vulns"]
        A10_2017["A10: Insufficient Logging"]
    end

    subgraph OWASP2021["OWASP Top 10 (2021)"]
        direction TB
        A1_2021["A1: Broken Access Control"]
        A2_2021["A2: Cryptographic Failures"]
        A3_2021["A3: Injection"]
        A4_2021["A4: Insecure Design"]
        A5_2021["A5: Security Misconfiguration"]
        A6_2021["A6: Vulnerable Components"]
        A7_2021["A7: Identification Failures"]
        A8_2021["A8: Software/Data Integrity Failures"]
        A9_2021["A9: Security Logging Failures"]
        A10_2021["A10: SSRF"]
    end

    OWASP2017 -->|"New/Updated"| OWASP2021
    
    style A4_2021 fill:#f99,stroke:#333,stroke-width:2px
    style A8_2021 fill:#f99,stroke:#333,stroke-width:2px
    style A10_2021 fill:#f99,stroke:#333,stroke-width:2px
```

---

## Session 34: CISSP Exam Domain Weights

```mermaid
pie title CISSP Exam Domain Weights
    "Domain 1: Security and Risk Management (16%)" : 16
    "Domain 2: Asset Security (10%)" : 10
    "Domain 3: Security Architecture (13%)" : 13
    "Domain 4: Network Security (13%)" : 13
    "Domain 5: IAM (13%)" : 13
    "Domain 6: Assessment/Testing (12%)" : 12
    "Domain 7: Security Operations (13%)" : 13
    "Domain 8: Software Security (10%)" : 10
```
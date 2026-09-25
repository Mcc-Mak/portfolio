### Video V129: Transport Architecture

```mermaid
graph TD
    subgraph Core Definition
        TA[Transport Architecture<br/>Design and structure for data transmission<br/>Enables endpoint-to-endpoint communication<br/>Goals: Security, Performance, Scalability, Manageability]
    end

    subgraph Architecture Planes
        DataPlane[Data Plane - Forwarding Plane<br/>Handles user data transmission<br/>Forwards packets using existing rules<br/>Does NOT make routing decisions]
        ControlPlane[Control Plane<br/>Makes decisions on data delivery<br/>Manages routing tables: OSPF, BGP<br/>Determines best path]
        MgmtPlane[Management Plane<br/>Handles administration, config, monitoring<br/>Protocols: SNMP, ICMP<br/>Orchestration and automation]
    end

    subgraph Network Topologies - Two Categories
        P2P[Point-to-Point<br/>Direct connection between two devices<br/>AirDrop example<br/>Simple but not scalable]
        MultiPoint[Multi-Point<br/>Multiple devices connected<br/>Common in enterprise/cloud]
    end

    subgraph Specific Topology Types
        Bus[Bus - Single backbone cable<br/>Pros: Easy install, cost-effective<br/>Cons: Poor performance, SPOF]
        Star[Star - Central hub/switch<br/>Pros: Easy install, centralized<br/>Cons: SPOF central hub]
        Ring[Ring - Each device connects to two others<br/>Token passing<br/>Pros: Simple, fault tolerant<br/>Cons: Complex scaling, increased latency]
        Mesh[Mesh - Every device interconnected<br/>Pros: Highly scalable, reliable<br/>Cons: Complex, expensive<br/>MOST COMMON in enterprise ✓]
    end

    subgraph Selection Considerations
        Security[Security Controls<br/>Encryption + access controls]
        Resiliency[Network Resiliency<br/>HA dictates mesh topology]
        Scalability[Scalability<br/>Plan for 5 years growth]
        Bandwidth[Bandwidth Optimization<br/>Prevent latency and degradation]
    end

    TA --> DataPlane
    TA --> ControlPlane
    TA --> MgmtPlane
    
    DataPlane --> P2P
    ControlPlane --> MultiPoint
    MgmtPlane --> P2P
    
    P2P --> Bus
    MultiPoint --> Star
    Bus --> Ring
    Star --> Mesh
    
    Mesh --> Security
    Security --> Resiliency
    Resiliency --> Scalability
    Scalability --> Bandwidth
```

---

### Video V130: Performance Metrics

```mermaid
graph TD
    subgraph Purpose of Metrics
        Purpose[Establish baseline of normal behavior<br/>Detect Indicators of Compromise - IOCs<br/>Support User Entity Behavior Analytics - UEBA<br/>Ensure network availability]
    end

    subgraph Key Performance Metrics
        Throughput[Throughput<br/>Actual data transmitted/received over time<br/>Measured in bps<br/>Affected by bandwidth, latency, packet loss]
        
        Bandwidth[Bandwidth<br/>Maximum capacity of data transmission<br/>Measured in Mbps/Gbps<br/>Capacity vs actual usage]
        
        Latency[Latency<br/>Time delay between transmission and arrival<br/>Measured in milliseconds ms<br/>Low latency crucial for real-time apps]
        
        Jitter[Jitter<br/>Variation in packet delay - variable latency<br/>Caused by congestion or route changes<br/>Severely affects VoIP and video streaming]
        
        SNR[Signal-to-Noise Ratio - SNR<br/>Strength of desired signal vs background noise<br/>Measured in decibels dB<br/>Relevant to wireless networking<br/>Higher dB is better]
    end

    subgraph Monitoring Tools
        SolarWinds[SolarWinds<br/>Network monitoring, SNMP<br/>Packet captures pcaps, diagnostics]
        Nagios[Nagios<br/>IT infrastructure monitoring<br/>Dashboard and capacity planning]
    end

    subgraph Security Impact
        Impact[Insufficient throughput prevents<br/>Security tools SIEM from receiving data<br/>Baseline metrics identify anomalies<br/>Ensure availability]
    end

    Purpose --> Throughput
    Throughput --> Bandwidth
    Bandwidth --> Latency
    Latency --> Jitter
    Jitter --> SNR
    
    SNR --> SolarWinds
    SolarWinds --> Nagios
    Nagios --> Impact
```

---

### Video V131: Network Traffic Flows

```mermaid
graph TD
    subgraph Core Definitions
        NS[North-South<br/>Ingress/Egress<br/>Communication between external internet<br/>and internal networks]
        EW[East-West<br/>Lateral<br/>Communication within internal network<br/>Server to server, PC to PC]
    end

    subgraph Direction Details - CISSP Standard
        North[North = Leaving the network<br/>EGRESS]
        South[South = Entering the network<br/>INGRESS]
    end

    subgraph Practical Use
        IR[Incident Response<br/>Find malicious flows<br/>Trace data origins]
        Controls[Security Controls<br/>Firewall rules<br/>Traffic filtering]
        Environment[Common Environment<br/>Data centers]
    end

    subgraph Exam Question Style
        Style[Scenario-based questions<br/>Not simple definition recall<br/>Identify flow type: North-South or East-West<br/>Spot malicious traffic patterns]
    end

    NS --> North
    NS --> South
    EW --> North
    EW --> South
    
    North --> IR
    South --> Controls
    IR --> Environment
    Controls --> Environment
    Environment --> Style
```

---

### Video V132: Physical Network Segmentation

```mermaid
graph TD
    subgraph Definition & Purpose
        Physical[Physical Network Segmentation<br/>Physically separating network using<br/>distinct physical ports and hardware<br/>Purpose: Control traffic, isolate sensitive data<br/>Limit impact of security incidents]
    end

    subgraph Three Types
        InBand[In-Band Networks<br/>Same infrastructure for management + data<br/>Security: LOWEST<br/>Use: Small networks, limited budgets]
        
        OutOfBand[Out-of-Band Networks - OOBM<br/>Separate dedicated infrastructure for management<br/>Security: MODERATE<br/>Use: Server management iLO, remote site recovery POTS]
        
        AirGap[Air-Gapped Networks<br/>Completely isolated, no external connections<br/>Security: HIGHEST most secure<br/>Use: Highly sensitive environments<br/>Malware analysis, isolated patching]
    end

    subgraph Comparison
        SecurityRank[Security Ranking High → Low<br/>Air-Gapped > Out-of-Band > In-Band]
        Cost[Cost: Inversely related to security<br/>Higher security = more hardware + cost]
    end

    subgraph Exam Takeaways
        Takeaway[Air-Gapped requires<br/>physical transfer of data]
    end

    Physical --> InBand
    Physical --> OutOfBand
    Physical --> AirGap
    
    InBand --> SecurityRank
    OutOfBand --> SecurityRank
    AirGap --> SecurityRank
    
    SecurityRank --> Cost
    Cost --> Takeaway
```

---

### Video V133: Logical Network Segmentation

```mermaid
graph TD
    subgraph Definition & Purpose
        Logical[Logical Network Segmentation<br/>Technically separating network using software<br/>Purpose: Improve security, performance, management<br/>Limit incident impact]
    end

    subgraph Key Technologies
        VLAN[VLANs - Virtual Local Area Networks<br/>Groups devices logically - same wire concept<br/>Limited to 4,096 IDs]
        
        VXLAN[VXLANs - Virtual Extensible LAN<br/>Next-gen VLAN<br/>Encapsulates Layer 2 over Layer 4 UDP<br/>Supports 16 million unique IDs<br/>Components: VNID 24-bit, VTEP tunnels]
        
        VPN[VPNs - Virtual Private Networks<br/>Secure connection over untrusted network<br/>IPSec encryption + L2TP tunneling]
        
        VRF[VRFs - Virtual Routing and Forwarding<br/>Multiple routing tables on one router<br/>Isolated forwarding decisions]
        
        VDOM[VDOMs - Virtual Domains<br/>Multiple logical devices on one physical device<br/>Independent security policies, configs, routing]
    end

    subgraph Exam Tips
        Tip1[Know high-level capabilities<br/>No deep config nuances]
        Tip2[VLAN vs VXLAN: Scale difference<br/>VRF vs VDOM: Scope difference]
    end

    Logical --> VLAN
    Logical --> VXLAN
    Logical --> VPN
    Logical --> VRF
    Logical --> VDOM
    
    VLAN --> Tip1
    VXLAN --> Tip1
    VPN --> Tip2
    VRF --> Tip2
    VDOM --> Tip2
```

---

### Video V134: Micro-segmentation

```mermaid
graph TD
    subgraph Core Concept
        Micro[Micro-segmentation<br/>Dividing virtualized network communications<br/>Based on specific workloads, apps, or functions<br/>Isolates traffic into individual secure zones<br/>Like individual DMZs in data centers/cloud<br/>Enables ZERO TRUST security]
    end

    subgraph Key Benefits
        Granular[Granular security controls<br/>Deeper traffic inspection]
        Surface[Reduces attack surface<br/>Attackers target specific traffic types]
        Lateral[Limits lateral movement<br/>East-West traffic blocked]
    end

    subgraph Traffic Directions
        EastWest[East-West - Lateral<br/>Between servers same layer<br/>Blocked by virtual switches ✓]
        NorthSouth[North-South - Ingress/Egress<br/>North traffic entering, South traffic leaving<br/>Prevents data exfiltration ✓]
    end

    subgraph Enabling Technologies
        VXLAN_Micro[VXLAN<br/>Tunnels Layer 2 over Layer 3<br/>VNID 24-bit segment ID<br/>VTEP creates/terminates tunnels]
        
        SDN[SDN - Software Defined Networking<br/>Centralized control, vendor-neutral<br/>3 layers: Infrastructure, Control, Application]
        
        SDWAN[SD-WAN<br/>Optimizes wide area networks<br/>Improves cloud app performance<br/>Supports MPLS/broadband<br/>Zero-Touch Provisioning]
    end

    Micro --> Granular --> Surface --> Lateral
    Lateral --> EastWest
    Lateral --> NorthSouth
    
    EastWest --> VXLAN_Micro
    NorthSouth --> SDN
    VXLAN_Micro --> SDWAN
```

---

### Video V135: Edge Networks

```mermaid
graph TD
    subgraph Core Concept
        Edge[Edge Networks<br/>Boundary network close to users/devices<br/>Infrastructure supporting Edge Computing<br/>Primary goal: Decentralize to offload cloud servers<br/>Faster transmission, less latency, real-time insights]
    end

    subgraph Problems with Traditional Networks
        P1[High latency from distant data centers]
        P2[Hop count - each router/switch adds delay]
        P3[Bandwidth strain from growing data]
    end

    subgraph Edge Architecture
        Location[Location: Between end devices IoT/mobile<br/>and central cloud]
        Components[Components: Edge nodes, servers<br/>Local LAN/WAN]
        Tradeoff[Trade-off: Needs stronger security<br/>Due to fewer layers]
    end

    subgraph Traffic Flow Terminology
        Ingress[Ingress - Southbound<br/>Communications entering network]
        Egress[Egress - Northbound<br/>Communications leaving network]
        Lateral[East-West - Lateral<br/>Traffic moving laterally within same network]
    end

    subgraph Network Peering
        Definition[Direct connection between networks at edge<br/>Point-to-point]
        Mechanism[Bypasses third parties<br/>ISPs, cloud service providers]
        Benefits[No single point of failure<br/>No bandwidth bottleneck]
        Vendors[Azure Virtual Network Peering<br/>AWS VPC Peering<br/>Cisco Intelligent Peering]
    end

    Edge --> P1 --> P2 --> P3
    P3 --> Location --> Components --> Tradeoff
    
    Tradeoff --> Ingress
    Tradeoff --> Egress
    Tradeoff --> Lateral
    
    Lateral --> Definition --> Mechanism --> Benefits --> Vendors
```

---

### Bonus: Session 18 Complete Concept Map

```mermaid
mindmap
  root((Secure Network Design<br/>CISSP Objective 4.1))
    Transport Architecture
      3 Planes: Data, Control, Management
      Topologies: Bus, Star, Ring, Mesh
      Mesh most common in enterprise
      Selection: Security, Resiliency, Scalability, Bandwidth
    Performance Metrics
      Throughput: actual data bps
      Bandwidth: maximum capacity Mbps/Gbps
      Latency: time delay ms
      Jitter: variable latency, affects VoIP
      SNR: signal vs noise dB
      Tools: SolarWinds, Nagios
    Network Traffic Flows
      North-South: ingress/egress
      East-West: lateral movement
      Use: IR, firewall rules, data centers
    Physical Segmentation
      In-Band: lowest security
      Out-of-Band: moderate, OOBM
      Air-Gapped: highest, requires physical transfer
    Logical Segmentation
      VLANs: 4,096 IDs
      VXLANs: 16M IDs, VNID, VTEP
      VPNs: IPSec + L2TP
      VRFs: multiple routing tables
      VDOMs: multiple logical devices
    Micro-segmentation
      Enables Zero Trust
      Limits East-West lateral movement
      Technologies: VXLAN, SDN, SD-WAN
    Edge Networks
      Boundary near users, reduces latency
      Ingress southbound, Egress northbound
      Network Peering: direct connection, bypasses ISPs
```
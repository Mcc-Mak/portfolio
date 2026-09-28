### Video V109: Hardware Operations (Routers, Switches, Gateways, etc.)

```mermaid
graph TD
    subgraph Core Hardware Components by OSI Layer
        Repeater[Repeater - Layer 1<br/>Re-energizes signals to extend distance]
        Hub[Hub - Layer 1<br/>Multi-port repeater<br/>Floods traffic to all ports]
        Bridge[Bridge - Layer 2<br/>Connects two network segments<br/>Same protocol - store and forward]
        Switch[Switch - Layer 2<br/>Intelligent hub<br/>Forwards traffic by MAC address]
        Router[Router - Layer 3<br/>Manages between networks<br/>IP addresses, route tables]
        Gateway[Gateway - Layers 6-7<br/>Protocol translator<br/>Connects different protocols]
        Proxy[Proxy - Mediates requests<br/>Verifies and forwards without translation<br/>NAT]
        WAP[WAP - Layer 2/3<br/>Connects devices to wireless network]
        Endpoint[Endpoint<br/>Originates or terminates communications<br/>Computers, servers, printers, IoT]
    end

    subgraph Legacy Devices - Exam Focus
        BRouter[BRouter - Bridge + Router<br/>Attempts routing first, then bridging]
        LANExt[LAN Extender<br/>Connects remote segments over WAN]
        Mux[Multiplexer - Mux<br/>Combines signals for transmission<br/>Over single medium]
    end

    subgraph Hardware Security Considerations
        Support[Support Contracts<br/>Priority support, engineering expertise<br/>Fast parts replacement]
        Redundant[Redundant Power<br/>UPS short-term, Generator long-term]
        EOL[End-of-Life - EOL<br/>Product no longer licensed/functional]
        EOS[End-of-Service - EOS<br/>No updates, patches, or vendor support]
    end

    Repeater --> Hub
    Hub --> Bridge
    Bridge --> Switch
    Switch --> Router
    Router --> Gateway
    Gateway --> Proxy
    Proxy --> WAP
    WAP --> Endpoint
    
    Endpoint --> BRouter
    BRouter --> LANExt
    LANExt --> Mux
    Mux --> Support --> Redundant --> EOL --> EOS
```

---

### Video V110: Network Infrastructure Operations (Redundant Power, Warranty, EOL/EOS)

```mermaid
graph TD
    subgraph Redundant Power Solutions
        UPS[UPS - Uninterruptible Power Supply<br/>Short-term, Battery-based backup]
        Gen[Generator<br/>Long-term, Motor/fuel-based backup<br/>Requires maintenance and fuel]
    end

    subgraph UPS Types - Exam Focus
        Offline[Offline/Standby<br/>Most common, cost-effective<br/>Basic power failure protection]
        LineInt[Line-Interactive<br/>AVR - Automatic Voltage Regulation<br/>Corrects fluctuations]
        Online[Online/Double-Conversion<br/>Cleanest power, always online<br/>Best for sensitive equipment]
    end

    subgraph Vendor Warranty & Support
        Warranty[Warranty<br/>Covers repairs/replacements<br/>Burn-in period to detect faults]
        Support[Support Services<br/>Technical assistance, software updates<br/>Bug fixes, knowledge base access]
    end

    subgraph Product Lifecycle Risks
        EOS[End-of-Service - EOS<br/>Support contract ends<br/>No more updates or tech support<br/>Risk: Unpatched vulnerabilities]
        EOL[End-of-Life - EOL<br/>Product discontinued<br/>No patches for critical CVEs<br/>Risk: Run at own risk - requires replacement]
    end

    UPS --> Offline
    UPS --> LineInt
    UPS --> Online
    UPS --> Gen
    
    Offline --> Warranty
    LineInt --> Support
    Online --> Warranty
    Gen --> Support
    
    Support --> EOS
    Warranty --> EOL
    EOS --> EOL
```

---

### Video V111: Transmission Media Part I (Topologies, Network Types)

```mermaid
graph TD
    subgraph Network Topologies
        Ring[Ring Topology - Outdated<br/>Only one host communicates at a time<br/>Token passing]
        Bus[Bus Topology - Legacy<br/>Single backbone cable<br/>All devices share - early Ethernet]
        Star[Star Topology - Current<br/>Central network device - switch/hub<br/>Common in homes/businesses]
        Mesh[Mesh Topology - Current<br/>High availability<br/>Multiple interfaces required]
    end

    subgraph Network Types - Geographical Scope
        PAN[PAN - Personal Area Network<br/>Individual immediate area<br/>Bluetooth, Zigbee, mobile hotspot]
        LAN[LAN - Local Area Network<br/>Home or office<br/>On-premises network]
        CAN[CAN - Campus Area Network<br/>University or large corporate campus<br/>Multiple buildings]
        MAN[MAN - Metropolitan Area Network<br/>City-sized area<br/>Local government]
        WAN[WAN - Wide Area Network<br/>State to country<br/>The Internet]
    end

    subgraph Ethernet Networking - IEEE 802.3
        Eth[OSI Layer 2 - Uses frames<br/>Components: DTE endpoints, DCE switches]
        Speeds[Data Rates:<br/>Fast Ethernet: 100 Mbps<br/>Gigabit Ethernet: 1000 Mbps<br/>10 Gigabit Ethernet: 10 Gbps]
    end

    subgraph Key Selection Factors
        SF1[Network Topology - Physical layout]
        SF2[Location - Proximity to wired vs wireless]
        SF3[Throughput - Speed requirements]
        SF4[Cost & Equipment - Compatibility]
    end

    Star --> PAN
    Mesh --> LAN
    PAN --> CAN
    LAN --> MAN
    CAN --> WAN
    WAN --> Eth
    Eth --> Speeds
    Speeds --> SF1 --> SF2 --> SF3 --> SF4
```

---

### Video V112: Transmission Media Part II (Cabling: Coax, Twisted Pair, Fiber)

```mermaid
graph TD
    subgraph Coaxial Cable
        Coax[Copper wire with shielding<br/>Prevents EMI<br/>Uses: DSL, CCTV cameras]
    end

    subgraph Twisted Pair Cable
        UTP[UTP - Unshielded<br/>No shielding<br/>Common in data centers<br/>Standard networking]
        STP[STP - Shielded<br/>Ground wire and shielding<br/>High EMI areas, cable chases]
        
        subgraph Category Standards
            Cat5[Cat5: 100 Mbps - 100 meters]
            Cat6[Cat6: 1 Gbps - 100 meters<br/>MOST COMMON]
            Cat7[Cat7: 10 Gbps - 55 meters]
        end
        
        Plenum[Plenum Rated<br/>Non-toxic jacket for air ducts/ceilings<br/>Prevents toxic fumes in fire]
    end

    subgraph Fiber Optic Cable
        Fiber[Glass core - uses light/lasers<br/>vs copper electrical signals]
        
        subgraph Modes
            MM[Multi-mode<br/>Core: 50 or 62.5 microns<br/>Distance: ~2 km<br/>Jacket: ORANGE]
            SM[Single-mode<br/>Core: 8.3 microns<br/>Distance: Very long - service provider<br/>Jacket: YELLOW/GRAY]
        end
    end

    subgraph Wireless Media
        Wireless[Radio frequency - no physical cable]
        Disadvantages[Disadvantages:<br/>Range and coverage limitations<br/>Susceptible to interference<br/>Heavy machinery, microwaves, electrical devices]
    end

    Coax --> UTP
    UTP --> STP
    STP --> Cat5
    Cat5 --> Cat6
    Cat6 --> Cat7
    Cat7 --> Plenum
    Plenum --> Fiber
    Fiber --> MM
    Fiber --> SM
    SM --> Wireless
    Wireless --> Disadvantages
```

---

### Video V113: Network Monitoring (SNMP, ICMP, QoS)

```mermaid
graph TD
    subgraph Core Protocols - Exam Focus
        SNMP[SNMP - Simple Network Management Protocol<br/>Health/status monitoring<br/>Switches, printers, computers]
        ICMP[ICMP - Internet Control Message Protocol<br/>Sends operational info and error messages<br/>Ping, traceroute]
    end

    subgraph Monitoring Workflow
        Collect[1. COLLECT<br/>SNMP traps, ICMP, agents/logs]
        Monitor[2. MONITOR<br/>Visualize and analyze data]
        Act[3. ACT<br/>Incident response or analysis]
        Analyze[4. ANALYZE<br/>Determine false positives vs real threats]
    end

    subgraph Key Concepts
        Obs[Observability<br/>Gain insight via traffic, logs, metrics]
        Flow[Traffic Flow<br/>Direction and pattern of data movement]
        Shaping[Traffic Shaping / QoS<br/>Optimize flow and prioritize data]
        Capacity[Capacity Management<br/>Ensure resources for current/future demands]
        Fault[Fault Detection<br/>Identify and diagnose failures/abnormalities]
    end

    subgraph Traffic Directions
        North[Northbound - Egress<br/>Traffic leaving the system]
        South[Southbound - Ingress<br/>Traffic coming from internet]
        EastWest[East-West - Lateral movement<br/>Within the network]
    end

    subgraph Monitoring Tools - Examples
        Nagios[Nagios - IT infrastructure<br/>Visual spikes vs baselines]
        Datadog[Datadog - Network performance<br/>End-to-end visibility]
        CloudWatch[AWS CloudWatch - Cloud resource monitoring]
    end

    SNMP --> Collect
    ICMP --> Collect
    Collect --> Monitor --> Act --> Analyze
    
    Analyze --> Obs
    Obs --> Flow
    Flow --> Shaping
    Shaping --> Capacity
    Capacity --> Fault
    
    Fault --> North
    North --> South
    South --> EastWest
    
    EastWest --> Nagios
    Nagios --> Datadog
    Datadog --> CloudWatch
```

---

### Bonus: Session 15 Complete Concept Map

```mermaid
mindmap
  root((Network Components<br/>& Transmission Media))
    Hardware Operations
      Repeater, Hub, Bridge, Switch, Router
      Gateway, Proxy, WAP, Endpoint
      Legacy: BRouter, LAN Extender, Mux
      Security: Support contracts, Redundant power, EOL/EOS
    Infrastructure Operations
      UPS: Offline, Line-Interactive, Online
      Generators: Long-term backup
      Warranty & Support Services
      EOS: No updates → unpatched vulnerabilities
      EOL: Discontinued → proactive replacement
    Network Topologies
      Ring: Outdated, token passing
      Bus: Legacy, single backbone
      Star: Current, central device
      Mesh: Current, high availability
    Network Types
      PAN, LAN, CAN, MAN, WAN
    Cabling Media
      Coaxial: DSL, CCTV
      Twisted Pair: UTP, STP, Cat5/6/7, Plenum
      Fiber: Multi-mode orange, Single-mode yellow/gray
    Wireless Media
      Radio frequency, no cable
      Limitations: range, coverage, interference
    Network Monitoring
      SNMP: Health/status
      ICMP: Ping, traceroute
      Workflow: Collect → Monitor → Act → Analyze
      Concepts: Observability, Traffic flow, QoS, Capacity, Fault detection
      Directions: Northbound, Southbound, East-West
      Tools: Nagios, Datadog, CloudWatch
```
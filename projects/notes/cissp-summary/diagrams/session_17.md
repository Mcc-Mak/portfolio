### Video V124: Content Distribution Networks (CDNs)

```mermaid
graph TD
    subgraph Definition & Purpose
        CDN[CDN - Content Distribution/Delivery Network<br/>Multiple distributed resources - data centers<br/>Deployed globally<br/>High availability + Low latency<br/>Supports: AVAILABILITY]
    end

    subgraph Architecture
        ClientServer[Client-Server<br/>Web browser accessing YouTube<br/>PREDOMINANT]
        P2P[Peer-to-Peer - P2P<br/>BitTorrent<br/>ALTERNATIVE]
    end

    subgraph Use Cases
        Web[Web content delivery<br/>Videos, music, documents]
        Licensing[Software licensing, patching<br/>Signature files - antivirus, IDS updates]
    end

    subgraph Security & Management
        Access[Access Control<br/>Securing hosted content = PRIMARY CONCERN]
        Encryption[Encryption<br/>Protect client-server communications<br/>Mutual authentication]
        SLA[SLA - Service Level Agreements<br/>Critical for cloud computing<br/>Guarantee performance - 99.9% uptime]
    end

    CDN --> ClientServer
    CDN --> P2P
    ClientServer --> Web
    P2P --> Licensing
    Web --> Access --> Encryption --> SLA
```

---

### Video V125: Software Defined Networks (SDN, SD-WAN)

```mermaid
graph TD
    subgraph Core Concept
        SDN[SDN - Software Defined Networking<br/>Separates control plane from data plane<br/>Dynamic, programmable network configuration]
    end

    subgraph Three Planes - Layers
        AppPlane[Application Plane<br/>Features: load balancing, IDS/IPS<br/>Packet captures, orchestration<br/>Facilitates automation and policies]
        ControlPlane[Control Plane<br/>Central intelligence - The CONTROLLER<br/>Manages and enforces policies]
        DataPlane[Data Plane - Infrastructure Layer<br/>Network elements: routers, switches, APs<br/>Receives instructions from controller]
    end

    subgraph Key Interfaces
        Northbound[Northbound API - NBI / A-CPI<br/>Application → Controller<br/>Allows controller to communicate with apps]
        Southbound[Southbound API - SBI / D-CPI<br/>Controller → Data Plane<br/>Passes instructions to network elements]
    end

    subgraph SD-WAN
        SDWAN[SD-WAN<br/>SDN concepts applied to WAN<br/>Abstracts infrastructure to manage WAN complexity<br/>Same layered architecture]
    end

    subgraph Security Concerns & Best Practices
        SPOF[Single Point of Failure<br/>Controller is prime target<br/>→ Segment and isolate SDN architecture]
        AttackSurface[Expanded Attack Surface<br/>APIs increase vectors<br/>→ MFA, real-time monitoring SIEM<br/>→ Regular auditing and assessments]
    end

    subgraph Open Source Example
        ONOS[ONOS - Open Source SDN Controller<br/>Vendor-neutral<br/>May appear on exam]
    end

    SDN --> AppPlane
    AppPlane --> Northbound
    Northbound --> ControlPlane
    ControlPlane --> Southbound
    Southbound --> DataPlane
    DataPlane --> SDWAN
    SDWAN --> SPOF
    SPOF --> AttackSurface
    AttackSurface --> ONOS
```

---

### Video V126: Application Programming Interfaces (APIs)

```mermaid
graph TD
    subgraph Definition
        API[API - Application Programming Interface<br/>Rules and protocols for software communication<br/>Data sharing, integration, third-party development]
    end

    subgraph API Types - Protocols/Architectures
        SOAP[SOAP - Simple Object Access Protocol<br/>Older technology<br/>XML for structured information exchange]
        RPC[RPC - Remote Procedure Call<br/>Execute code on remote server as if local]
        WebSocket[WebSocket - Web API<br/>Uses HTTP/HTTPS<br/>Transmits JSON or XML]
        REST[REST - Representational State Transfer<br/>MOST PREVALENT today<br/>HTTP methods: GET, POST, PUT, DELETE<br/>Stateless]
        GraphQL[GraphQL<br/>Query language for APIs<br/>Client requests specific data<br/>Defines response structure]
    end

    subgraph API Deployment Types
        Private[Private - Internal users only<br/>Lower risk]
        Public[Public - External users<br/>Increases attack surface]
        Partner[Partner - Shared<br/>Specific business partners<br/>Controlled risk]
        Composite[Composite - Hybrid<br/>Combines two or more APIs<br/>Example: public gateway + private backend]
    end

    subgraph API Gateway
        Gateway[API Gateway<br/>Single interface - gatekeeper<br/>Ensures security policy compliance<br/>Before requests reach backend services<br/>Reduces exposure of internal systems]
    end

    subgraph Exam Focus
        Focus[Know differences: SOAP, REST, WebSocket, RPC, GraphQL<br/>Know 4 deployment types: Private, Public, Partner, Composite<br/>Choose API with LEAST risk to system]
    end

    API --> SOAP
    API --> RPC
    API --> WebSocket
    API --> REST
    API --> GraphQL
    
    SOAP --> Private
    RPC --> Public
    WebSocket --> Partner
    REST --> Composite
    GraphQL --> Private
    
    Private --> Gateway
    Public --> Gateway
    Partner --> Gateway
    Composite --> Gateway
    
    Gateway --> Focus
```

---

### Video V127: Network Functions Virtualization (NFV)

```mermaid
graph TD
    subgraph Definition
        NFV[NFV - Network Functions Virtualization<br/>Replaces dedicated hardware appliances<br/>Routers, firewalls, switches<br/>Software running on VMs on standard servers<br/>Part of SDN]
    end

    subgraph Key Benefits
        Cost[Cost Savings<br/>Commodity servers cheaper than proprietary hardware]
        Scale[Scalability & Flexibility<br/>VMs powered on/off, scaled, automated]
        Ops[Operational Simplification<br/>Single pane of glass management]
    end

    subgraph NFV Architecture Blocks
        VNFs[VNFs - Virtualized Network Functions<br/>Software instances of network functions<br/>Firewalls, routers, load balancers, proxies, gateways]
        NFVI[NFVI - NFV Infrastructure<br/>Physical + virtual resources: compute, storage, network<br/>Includes virtualization layer hypervisors + VIM]
        VIM[VIM - Virtualized Infrastructure Manager<br/>Manages virtualized resources<br/>OpenStack, vCenter]
        MANO[MANO - Management and Orchestration<br/>Orchestrates deployment, scaling, lifecycle<br/>Works with VIM]
        OSSBSS[OSS/BSS - Operations/Business Support Systems<br/>Rely on NFV]
    end

    subgraph Security Risks
        PhysSec[Physical Security<br/>Underlying hardware must be secured]
        Malware[Malware Spread<br/>Difficult to contain in virtual environments<br/>Needs EDR/XDR]
        Transparency[Less Traffic Transparency<br/>East-west traffic on hypervisors harder to monitor]
        Complexity[Complexity<br/>Many moving parts increase security difficulty]
    end

    subgraph Security Best Practices
        Isolate[Isolate & Segment<br/>Separate hypervisors, VLANs, VXLANs<br/>Limit lateral movement]
        Access[Strict Access Controls<br/>Least privilege to hypervisors, management, VNFs]
        Patch[Patch Management<br/>Regularly update VNFs, hypervisors, hardware]
        Encrypt[Encrypt Traffic<br/>Especially between VNFs, virtualization, external nets]
        Monitor[Logging & Monitoring<br/>Centralize logs SIEM<br/>Monitor for unusual behavior]
    end

    subgraph Industry Standards
        ETSI[ETSI - European Telecommunications Standards Institute<br/>Leads NFV specifications]
        Vendors[Key Vendors: VMware, Cisco, Juniper]
    end

    NFV --> Cost --> Scale --> Ops
    Ops --> VNFs
    VNFs --> NFVI
    NFVI --> VIM
    VIM --> MANO
    MANO --> OSSBSS
    
    OSSBSS --> PhysSec
    PhysSec --> Malware
    Malware --> Transparency
    Transparency --> Complexity
    
    Complexity --> Isolate
    Isolate --> Access
    Access --> Patch
    Patch --> Encrypt
    Encrypt --> Monitor
    
    Monitor --> ETSI
    ETSI --> Vendors
```

---

### Bonus: Session 17 Complete Concept Map

```mermaid
mindmap
  root((Network Architectures & APIs))
    CDNs
      Distributed resources for HA + low latency
      Client-server predominant, P2P alternative
      Use: web content, licensing, signatures
      Security: Access control, encryption, SLAs
    SDN
      Separates control plane from data plane
      Three planes: Application, Control, Infrastructure
      Northbound API: App → Controller
      Southbound API: Controller → Data
      SD-WAN: SDN applied to WAN
      Risks: SPOF, expanded attack surface
      Best practices: isolation, MFA, monitoring, auditing
      ONOS: open source controller
    APIs
      SOAP: XML, older
      RPC: remote code execution
      WebSocket: HTTP/HTTPS, JSON/XML
      REST: HTTP methods, stateless, most prevalent
      GraphQL: query language, specific data requests
      Deployment: Private, Public, Partner, Composite
      API Gateway: gatekeeper, reduces exposure
    NFV
      Replaces hardware appliances with VMs
      Benefits: cost, scalability, operational simplicity
      Blocks: VNFs, NFVI, VIM, MANO, OSS/BSS
      Risks: physical security, malware spread, less transparency, complexity
      Best practices: isolation, access controls, patching, encryption, monitoring
      Standards: ETSI, VMware, Cisco, Juniper
```
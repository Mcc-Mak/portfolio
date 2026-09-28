# Session 18: Secure Network Design (CISSP Objective 4.1)

**Videos:** V128 – V135  
**Core Focus:** Building and maintaining secure network infrastructures, applying secure design principles, and understanding transport architecture, segmentation, and edge networks.

---

## Video V128 (Outline): Secure Network Design (Section Intro)

**Objective:** To introduce the key topics in secure network design for the CISSP exam.

### Topics Covered in this Session
1.  Transport Architecture
2.  Performance Metrics
3.  Network Traffic Flows
4.  Physical Network Segmentation
5.  Logical Network Segmentation
6.  Micro-segmentation
7.  Edge Networks

---

## Video V129: Transport Architecture

**Objective:** To explain transport architecture, architecture planes, and network topologies.

### I. Core Definition
- **Transport Architecture:** The design and structure of networks that facilitate data transmission between endpoints.
- **Purpose:** Enables endpoint-to-endpoint communication (servers, clients, APIs).
- **Goals:** Improve security, network performance, scalability, and manageability.

### II. Architecture Planes (Conceptual Framework)

| Plane | Function | Key Characteristics |
| :--- | :--- | :--- |
| **Data Plane (Forwarding Plane)** | Handles user data transmission | Forwards packets using existing rules; does NOT make routing decisions |
| **Control Plane** | Makes decisions on how data reaches its destination | Manages routing tables and protocols (OSPF, BGP); determines best path |
| **Management Plane** | Handles administration, configuration, and monitoring | Uses protocols like SNMP and ICMP; includes orchestration and automation |

### III. Network Topologies

**Two Main Categories:**
- **Point-to-Point:** Direct connection between two devices (e.g., AirDrop) – simple but not scalable
- **Multi-Point:** Multiple devices connected – common in enterprise/cloud

**Specific Topology Types:**

| Topology | Structure | Advantages | Disadvantages |
| :--- | :--- | :--- | :--- |
| **Bus** | Single backbone cable connecting all devices | Easy to install, cost-effective | Poor performance (shared bandwidth), single point of failure |
| **Star** | All devices connect to a central hub/switch | Easy to install/manage, centralized control | Single point of failure (central hub), scalability limited by ports |
| **Ring** | Each device connects to exactly two others; uses token passing | Simple design, high fault tolerance (alternative paths) | Susceptible to link failure, complex to scale, increased latency |
| **Mesh** | Every device interconnected with multiple paths | Highly scalable and reliable (multiple pathways) | Very complex and expensive to implement |

> **Modern Context:** Mesh topology is most common in current enterprise networks.

### IV. Selection Considerations
- **Security Controls:** Ability to implement encryption and access controls
- **Network Resiliency:** High availability requirements often dictate mesh topology
- **Scalability:** Plan for 5 years of growth
- **Bandwidth Optimization:** Ensure sufficient bandwidth to prevent latency and degradation

### V. Exam Takeaways
- Know the 3 planes: **Data, Control, Management**
- Understand pros and cons of each topology
- **Mesh** is most current and popular
- **Point-to-point** is still used daily (e.g., AirDrop)

---

## Video V130: Performance Metrics

**Objective:** To explain key performance indicators (KPIs) used to measure and evaluate network performance.

### I. Purpose of Metrics
- Establish a baseline of normal behavior
- Detect Indicators of Compromise (IOCs)
- Support User Entity Behavior Analytics (UEBA)
- Ensure network availability

### II. Key Performance Metrics

| Metric | Definition | Key Points |
| :--- | :--- | :--- |
| **Throughput** | Actual amount of data transmitted/received over a given time | Measured in **bps**; reflects effective transfer rate; affected by bandwidth, latency, packet loss |
| **Bandwidth** | Maximum capacity of data that can be transmitted | Measured in **Mbps/Gbps**; the "pipe" size; capacity vs. actual usage |
| **Latency** | Time delay between transmission and arrival of a packet | Measured in **milliseconds (ms)** ; low latency crucial for real-time apps (Zoom, gaming) |
| **Jitter** | Variation in packet delay (variable latency) | Caused by congestion or route changes; severely affects **VoIP** and video streaming |
| **Signal-to-Noise Ratio (SNR)** | Strength of desired signal compared to background noise | Measured in **decibels (dB)** ; relevant to **wireless networking**; higher dB is better |

### III. Monitoring Tools
- **SolarWinds:** Network monitoring, SNMP, packet captures (pcaps), diagnostics
- **Nagios:** IT infrastructure monitoring, dashboard & capacity planning

### IV. Security Impact
- Insufficient throughput prevents security tools (SIEM) from receiving data
- Baseline metrics help identify anomalies and ensure availability

### V. Exam Takeaways
- Know how each metric affects network communications
- Focus on impact to **network availability**

---

## Video V131: Network Traffic Flows

**Objective:** To explain North-South vs. East-West traffic flows.

### I. Core Definitions

| Flow | Direction | Description |
| :--- | :--- | :--- |
| **North-South** | Ingress/Egress | Communication between external (internet) and internal networks |
| **East-West** | Lateral | Communication within internal network (server to server, PC to PC) |

### II. Direction Details (CISSP Standard)

| Direction | Meaning |
| :--- | :--- |
| **North** | Leaving the network (Egress) |
| **South** | Entering the network (Ingress) |

> **Note:** No official industry standard exists. The presenter's personal mnemonic ("birds fly south" = egress) is opposite to the CISSP exam convention. Follow the CISSP standard above.

### III. Practical Use
- **Incident Response:** Find malicious flows, trace data origins
- **Security Controls:** Firewall rules, traffic filtering
- **Common Environment:** Data centers

### IV. Exam Question Style
- Expect scenario-based questions (not simple definition recall)
- Identify whether a specific data flow is North-South or East-West
- Spot malicious traffic patterns

---

## Video V132: Physical Network Segmentation

**Objective:** To explain physical network segmentation techniques: In-Band, Out-of-Band, and Air-Gapped networks.

### I. Definition & Purpose
- **Physical Network Segmentation:** Physically separating a network into isolated networks using distinct physical ports and hardware
- **Purpose:** Control traffic flow, isolate sensitive data, limit impact of security incidents

### II. Three Types of Physical Segmentation

| Type | Description | Security Level | Use Case |
| :--- | :--- | :--- | :--- |
| **In-Band Networks** | Uses same infrastructure for management and data traffic | Lowest | Small networks, limited budgets |
| **Out-of-Band Networks (OOBM)** | Uses separate dedicated infrastructure for management | Moderate | Server management (iLO, HP Integrated Lights Out), remote site recovery (POTS) |
| **Air-Gapped Networks** | Completely isolated with no external connections | Highest (most secure) | Highly sensitive environments, malware analysis, isolated patching |

### III. Comparison
- **Security Ranking (High to Low):** Air-Gapped > Out-of-Band > In-Band
- **Cost:** Inversely related to security (higher security requires more hardware and cost)

### IV. Exam Takeaways
- Understand the differences between the three physical segmentation techniques
- Know that Air-Gapped requires physical transfer of data

---

## Video V133: Logical Network Segmentation

**Objective:** To explain logical network segmentation techniques: VLANs, VXLANs, VPNs, VRFs, and VDOMs.

### I. Definition & Purpose
- **Logical Network Segmentation:** Technically separating a network into isolated networks using software
- **Purpose:** Improve security, performance, and management; limit incident impact

### II. Key Technologies

| Technology | Purpose | Key Feature |
| :--- | :--- | :--- |
| **VLANs (Virtual Local Area Networks)** | Groups devices logically; "same wire" concept | Limited to 4,096 IDs |
| **VXLANs (Virtual Extensible LAN)** | Next-gen VLAN; encapsulates Layer 2 over Layer 4 UDP | Supports **16 million unique IDs** |
| **VPNs (Virtual Private Networks)** | Secure connection over untrusted network | Uses IPSec encryption + L2TP tunneling |
| **VRFs (Virtual Routing and Forwarding)** | Multiple routing tables on one router | Isolated forwarding decisions |
| **VDOMs (Virtual Domains)** | Multiple logical devices on one physical device | Independent security policies, configurations, routing services |

### III. VXLAN Components
- **VNID (VXLAN Network Identifier):** 24-bit segment ID
- **VTEP (VXLAN Tunnel Endpoints):** Creates and terminates tunnels

### IV. Exam Tips
- Know high-level capabilities (not deep config nuances)
- Understand differences: **VLAN vs. VXLAN scale**, **VRF vs. VDOM scope**

---

## Video V134: Micro-segmentation

**Objective:** To explain micro-segmentation, its benefits, and enabling technologies.

### I. Core Concept
- **Micro-segmentation:** Dividing virtualized network communications based on specific workloads, applications, or functions
- **Mechanism:** Isolates traffic into individual secure zones (like individual DMZs) within data centers or cloud environments
- **Enables Zero Trust security**

### II. Key Benefits
- Granular security controls (deeper traffic inspection)
- Reduces attack surface (attackers must target specific traffic types)
- Limits lateral movement (East-West traffic)

### III. Traffic Directions
- **East-West (Lateral):** Between servers same layer – blocked by virtual switches
- **North-South (Ingress/Egress):** North = traffic entering, South = traffic leaving – prevents data exfiltration

### IV. Enabling Technologies

| Technology | Description |
| :--- | :--- |
| **VXLAN** | Tunnels Layer 2 over Layer 3; VNID (24-bit segment ID); VTEP (creates/terminates tunnels) |
| **SDN (Software Defined Networking)** | Centralized control, vendor-neutral; 3 layers: Infrastructure (routers/switches), Control (SDN controller policies), Application (apps/services) |
| **SD-WAN** | Optimizes wide area networks; improves cloud app performance; supports MPLS/broadband; Zero-Touch Provisioning |

### V. Exam Takeaways
- Understand purpose of micro-segmentation
- Core for Zero Trust networks
- Focus on blocking **East-West** movement

---

## Video V135: Edge Networks

**Objective:** To explain edge networks, traffic flow, and network peering.

### I. Core Concept
- **Edge Networks:** Boundary network close to users or devices; the infrastructure supporting Edge Computing
- **Primary Goal:** Decentralize to offload cloud servers, enabling faster transmission, less latency, and real-time insights

### II. Problems with Traditional Networks
- High latency from distant data centers
- Hop count (each router or switch adds delay)
- Bandwidth strain from growing data

### III. Edge Network Architecture
- **Location:** Between end devices (IoT, mobile) and central cloud
- **Components:** Edge nodes, servers, local LAN/WAN
- **Trade-off:** Needs stronger security due to fewer layers

### IV. Traffic Flow Terminology

| Term | Direction | Description |
| :--- | :--- | :--- |
| **Ingress** | Southbound | Communications entering a network |
| **Egress** | Northbound | Communications leaving a network |
| **East-West** | Lateral | Traffic moving laterally within the same network |

### V. Network Peering
- **Definition:** Direct connection between networks at the edge (point-to-point)
- **Mechanism:** Bypasses third parties (ISPs, cloud service providers)
- **Benefits:** No single point of failure, no bandwidth bottleneck
- **Vendor Examples:** Azure Virtual Network Peering, AWS VPC Peering, Cisco Intelligent Peering

### VI. Exam Takeaways
- **Purpose:** Reduce hops, improve performance
- **Traffic:** Know ingress vs. egress vs. lateral
- **Peering:** Direct connection, not a gateway or VPN

---

## Session 18 Summary

Session 18 covers the **complete secure network design landscape** for the CISSP exam (Objective 4.1). Key takeaways include:

1. **Transport Architecture (V129):** Know the 3 architecture planes (Data, Control, Management); understand network topologies (Bus, Star, Ring, Mesh); Mesh is most common.

2. **Performance Metrics (V130):** Understand Throughput, Bandwidth, Latency, Jitter, and SNR; metrics establish baselines and detect IOCs.

3. **Network Traffic Flows (V131):** Distinguish North-South (ingress/egress) from East-West (lateral movement).

4. **Physical Network Segmentation (V132):** Compare In-Band (lowest), Out-of-Band (moderate), and Air-Gapped (highest security).

5. **Logical Network Segmentation (V133):** Know VLANs (4K IDs), VXLANs (16M IDs), VPNs, VRFs, and VDOMs.

6. **Micro-segmentation (V134):** Granular isolation of workloads; enables Zero Trust; limits East-West movement; uses VXLAN, SDN, SD-WAN.

7. **Edge Networks (V135):** Boundary networks close to users; reduces latency; network peering provides direct connections.
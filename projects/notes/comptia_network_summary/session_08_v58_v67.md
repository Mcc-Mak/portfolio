# Session 8: Ethernet Switching

## V58 - Section Outline
- **Focus**: Layer 2 of the OSI model (where Ethernet switching occurs in a LAN).
- **Relevant Domains & Objectives**:
  - Domain 1 (Networking Concepts) – Objective 1.2 (Compare/contrast networking appliances).
  - Domain 2 (Network Implementation) – Objective 2.2 (Configure switching technologies) – **major focus**.
  - Domain 4 (Network Security) – Objective 4.3 (Apply security features) – focus on NAC.
- **Topics Covered**:
  1. Ethernet fundamentals (popularity, CSMA/CD).
  2. Network devices (hubs → bridges → switches).
  3. VLANs (Virtual Local Area Networks).
  4. VLAN configuration options.
  5. Spanning Tree Protocol (STP) – prevents switching loops.
  6. Network Access Control (NAC).
  7. MTU (Maximum Transmission Unit).

## V59 - Ethernet Fundamentals
- **Ethernet** is the dominant Layer 2 protocol for modern LANs.
- **Core Design Question**: Deterministic (Token Ring) vs. Contention-Based (Ethernet). Ethernet chose contention-based for efficiency (lower overhead, uses full bandwidth).
- **CSMA/CD (Carrier Sense Multiple Access with Collision Detection)**:
  - Listen before speaking (Carrier Sense).
  - If collision detected, stop, wait random backoff timer, then retransmit.
- **Collision Domains**:
  - **Hub**: All devices share one collision domain (half-duplex).
  - **Switch**: Each port is its own collision domain (full-duplex capable).
- **Why switches are better**: No collisions on a port with a single device, full-duplex → higher effective bandwidth.

## V60 - Network Infrastructure Devices (Hubs, Bridges, Switches, Routers)
- **Hubs (Layer 1)**: Multi-port repeaters. Do NOT break up collision domains; one large collision domain. Obsolete.
- **Bridges (Layer 2)**: Breaks collision domain into two parts. Switch = multi-port bridge.
- **Switches (Layer 2 – primary exam definition)**: Each port = own collision domain; one broadcast domain for entire switch. Learns MAC addresses.
- **Routers (Layer 3)**: Forward based on IP addresses. Each port = own collision & broadcast domain (breaks up broadcast domains).
- **Layer 3 Switches (Multi-layer switches)**: Performs routing (Layer 3) + switching (Layer 2). For the exam, treat as a router only if explicitly called "multi-layer switch" or "layer 3 switch".

## V61 - Identifying Network Devices (Hands-on)
- Shows an all-in-one SOHO device (router + switch + WAP + media converter).
- Shows individual components: media converter (HDMI over Cat5), unmanaged switch, dedicated wireless access point.

## V62 - Virtual Local Area Networks (VLANs)
- **Definition**: Logical subdivision of a network into separate broadcast domains (operates at Layer 2).
- **Benefits**:
  - **Enhanced Security**: Isolates sensitive data; inter-VLAN traffic must pass through router/L3 switch where ACLs can be applied.
  - **Improved Performance**: Reduces broadcast domain size → less unnecessary traffic.
  - **Increased Management**: Easier policy changes and troubleshooting per VLAN.
  - **Improved Cost Efficiency**: Fewer physical switches needed.
- **How it works**: Switch tags each frame with a VLAN ID. Trunking = carrying multiple VLANs over a single physical cable.
- **Components**: VLAN Database (stores VLAN config), Switch Virtual Interface (SVI) for routing between VLANs without a separate router.

## V63 - VLAN Configurations
- **802.1Q Tagging (VLAN Tagging)**: Inserts a VLAN tag containing a VLAN Identifier (VID) into Ethernet frames. Enables trunking.
- **Native VLAN (Default VLAN)**: The one VLAN on a trunk port that does **not** get tagged. Assigns untagged frames. Default is VLAN 1 (security risk → change it).
- **Voice VLAN**: Dedicated VLAN for VoIP traffic to ensure quality and reliability (enables QoS policies).
- **Link Aggregation (Port Channeling/Bonding)**: Combining multiple physical links into one logical link. Enhances bandwidth, provides redundancy.
- **Speed and Duplex Configurations**:
  - **Speed**: Data transfer rate (Mbps or Gbps).
  - **Half-duplex**: Send OR receive, not both simultaneously.
  - **Full-duplex**: Send AND receive simultaneously (doubles effective capacity).

## V64 - Configuring VLANs (GUI Demonstration)
- Demonstrates creating VLANs (e.g., Instructors VLAN 100, Student Support VLAN 200) on a SOHO router/switch.
- Shows assigning ports to specific VLANs (native VLAN) and blocking others.
- **Takeaway**: VLANs create logical, isolated networks on a single physical switch.

## V65 - Spanning Tree Protocol (STP - 802.1d)
- **Purpose**: Enables redundant links between switches while preventing network loops (broadcast storms).
- **How it works**:
  - Elects a **Root Bridge** (lowest Bridge ID = priority + MAC address).
  - Other switches are **Non-Root Bridges**.
  - **Root Port**: Port on a non-root bridge closest to the root bridge (lowest path cost).
  - **Designated Port**: Port on a network segment closest to the root bridge.
  - **Non-Designated Port (Blocked)**: Prevents loops.
- **Port States**: Blocking → Listening → Learning → Forwarding.
- **Link Cost**: Inverse to speed (faster = lower cost).

## V66 - Network Access Control (NAC)
- **Definition**: Inspects devices as they try to connect to determine if they're secure enough to be granted access.
- **Key Mechanisms**:
  - **Port Security**: Limits which or how many devices (e.g., via MAC addresses) can connect.
  - **MAC Filtering**: Allowlisting (only approved MACs) vs. Blocklisting (blocks specified MACs).
  - **802.1X Authentication**: Framework with three components: Supplicant (device), Authenticator (switch/AP), Authentication Server (RADIUS).
- **Access Control Types**: Time-based, Location-based, Role-based (RBAC), Rule-based.

## V67 - Maximum Transmission Unit (MTU)
- **Definition**: Largest size (in bytes) of a frame that can be sent over a network.
- **Default MTU (Wired Ethernet)**: 1500 bytes.
- **Jumbo Frames**: Any frame > 1500 bytes (typical 9000 bytes). Benefits: reduces overhead for large transfers (SANs). Risks: fragmentation if smaller MTU encountered, harder troubleshooting.
- **Recommended MTU for Wireless/VPN**: 1400–1450 bytes.
# Session 2: Network Fundamentals

## V4 - Course Section Outline (Distribution Systems)
- **Definition**: A structured layout and organization of network media within a building to ensure efficient and reliable data communication.
- **Components**: Cables, wall jacks, patch panels, main distribution frames (MDF), intermediate distribution frames (IDF).
- **Course Alignment (Domains & Objectives)**:
  - Primary Focus: Domain 2 (Network Implementation) → Objective 2.4 (Explain important factors of physical installations).
  - Secondary Focus: Domain 5 (Network Troubleshooting) → Objective 5.5 (Use the appropriate tool/protocol to solve networking issues).
- **Lesson Sequence (7 Steps)**:
  1. Overview of component parts of cable distribution systems.
  2. Wiring Demonstration (running cables, connecting to patch panels and wall jacks).
  3. Testing using a toner probe (fox and hound) to find breaks or faults.
  4. Power Distribution (power distribution centers, UPS, line conditioners, generators).
  5. HVAC (maintaining temperature and humidity in data centers).
  6. Fire Suppression systems in data centers and networking closets.
  7. Assessment (Short quiz with answer review).

## V5 - Network Components
- **Core Objective**: Transfer data (voice, video, files) between machines/devices.
- **Main Categories of Network Components**:
  - **End Devices**: Clients (user devices) & Servers (provide resources).
  - **Connecting & Forwarding Devices**: Hubs (obsolete), Switches (smarter than hubs), Wireless Access Points (WAPs/APs), Routers (connect different networks).
  - **Security & Traffic Management Devices**: Firewalls, Load Balancers, Proxy Servers, IDS/IPS.
  - **Management & Specialized Storage**: Controllers (for SDN), NAS, SAN.
  - **Transmission Medium & Long-Distance Links**: Media (copper, fiber, wireless), WAN Links.

## V6 - Network Resources (Client-Server vs. Peer-to-Peer)
- **Two Main Network Resource Models**: Client-Server Model & Peer-to-Peer Model.
- **Client-Server Model**: Uses a dedicated server. Benefits: Centralized administration, easier management, better scalability. Drawbacks: Higher cost, requires specialized skillset.
- **Peer-to-Peer Model**: Peers share resources directly. Benefits: Low cost, no specialized OS required. Drawbacks: Difficult administration, decentralized management, poor scalability.
- **Key Relationship**: Client-server benefits = Peer-to-peer drawbacks, and vice versa.

## V7 - Network Geography (PAN, LAN, CAN, MAN, WAN)
- **Personal Area Network (PAN)**: ~10 feet. Examples: Bluetooth, USB.
- **Local Area Network (LAN)**: Up to 100 meters. Standards: Ethernet (IEEE 802.3) or Wi-Fi (IEEE 802.11).
- **Campus Area Network (CAN)**: Several miles across multiple buildings.
- **Metropolitan Area Network (MAN)**: Up to ~25 miles (city-wide).
- **Wide Area Network (WAN)**: Geographic – state, country, or worldwide. The internet is the largest public WAN.
- **Memory Aid**: PAN → LAN → CAN → MAN → WAN (smallest to largest).

## V8 - Real-World Example (Networks in a Car)
- **PAN**: Bluetooth connection between cell phone and car stereo.
- **LAN**: Car connects to home network via Wi-Fi when in the garage for updates.
- **WAN**: Car uses built-in cellular modem to connect to the internet for traffic updates and streaming media.

## V9 - Wired Network Topologies
- **Physical Topology**: Shows how devices are physically cabled.
- **Logical Topology**: Shows how traffic flows through the network.
- **Six Wired Network Topologies**:
  1. **Point‑to‑Point**: Direct connection between two devices. Simple, but not scalable.
  2. **Ring**: Each device connects to two others. Prevents collisions, but single node failure can disrupt the network.
  3. **Bus**: All devices share a single central cable. Easy to install, but backbone failure disables network.
  4. **Star**: Each node connects to a central switch. Robust to link failures, but central switch is a single point of failure.
  5. **Hub‑and‑Spoke**: Central “hub” connects to multiple “spokes”. Consolidates traffic, cost-effective for long distances.
  6. **Mesh**: Every node connects to every other node (full-mesh) or only critical nodes (partial-mesh). Maximum redundancy but very expensive.

## V10 - Wireless Network Topologies
- **Infrastructure Mode**: Most common. Uses a centrally managed wireless access point (like a physical star topology). Supports security controls.
- **Ad Hoc Mode**: Decentralized, peer‑to‑peer. No routers or access points. Users can join/leave freely.
- **Wireless Mesh Topology**: Interconnects diverse nodes/devices/radios using multiple frequencies (Wi-Fi, Bluetooth, microwave, cellular, satellite). Provides redundant and reliable connections, especially in harsh environments.

## V11 - Datacenter Topologies
- **Three‑Tiered Hierarchy**:
  - **Core layer**: Biggest/fastest routers; backbone of the network; redundant configuration.
  - **Distribution (aggregation) layer**: Implements access lists, filters, policies; uses Layer 3 switches.
  - **Access (edge) layer**: Connects endpoint devices; uses regular switches.
- **Collapsed Core (Two‑Tiered)**: Core + distribution layers merged. Use case: Small/medium datacenters.
- **Spine & Leaf Architecture**: Focuses on internal datacenter communication (especially server farms).
  - **Leaf layer**: Access switches aggregating traffic from servers.
  - **Spine layer**: Switches interconnecting all leaf switches (full mesh).
- **Traffic Flows**:
  - **North-South traffic**: Enters (Southbound) or leaves (Northbound) the datacenter.
  - **East-West traffic**: Data flow *within* the datacenter (e.g., between servers).
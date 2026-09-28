# Session 15: Network Components and Transmission Media

## Overview
This session covers network hardware components, infrastructure operations, transmission media (cabling and wireless), and network monitoring. It consists of 6 videos (V108–V113).

---

## Video V108 (Outline): Network Components (Section Intro)

**Objective:** To introduce the key topics in network components for the CISSP exam.

### Topics Covered in this Session
1.  Hardware Operations (Routers, Switches, Gateways, etc.)
2.  Network Infrastructure Operations (Redundant Power, Warranty, EOL/EOS)
3.  Transmission Media Part I (Topologies, Network Types)
4.  Transmission Media Part II (Cabling: Coax, Twisted Pair, Fiber)
5.  Network Monitoring (SNMP, ICMP, QoS)

---

## Video V109: Hardware Operations (Routers, Switches, Gateways, etc.)

**Objective:** To explain the function of common networking hardware devices.

### I. Core Hardware Components

| Device | Layer | Function |
| :--- | :--- | :--- |
| **Repeater** | Layer 1 | Re-energizes signals to extend transmission distance |
| **Modem** | - | Modulates/demodulates analog carrier signals (e.g., DSL) |
| **Hub** | Layer 1 | Multi-port repeater; floods traffic to all ports |
| **Bridge** | Layer 2 | Connects two network segments using same protocol (store and forward) |
| **Switch** | Layer 2 | Intelligent hub; forwards traffic based on MAC address |
| **Router** | Layer 3 | Manages communications between networks using IP addresses; route tables |
| **Gateway** | Layers 6-7 | Protocol translator; connects segments using different protocols |
| **Proxy** | - | Mediates requests; verifies and forwards without translation (e.g., NAT) |
| **Wireless Access Point (WAP)** | Layer 2/3 | Connects devices to a wireless network |
| **Endpoint** | - | Originates or terminates communications (computers, servers, printers, IoT) |

### II. Legacy/Obsolete Devices (Know for Exam)
- **BRouter:** Hybrid device (bridge + router); attempts routing first, then bridging
- **LAN Extender:** Connects remote network segments over WAN links
- **Multiplexer (Mux):** Combines analog/digital signals for transmission over a single medium

### III. Hardware Security Considerations
- **Support Contracts:** Priority support, engineering expertise, fast parts replacement
- **Redundant Power:** UPS (short-term), generators (long-term)
- **End-of-Life (EOL):** Product no longer licensed/functional
- **End-of-Service (EOS):** No updates, patches, or vendor support

---

## Video V110: Network Infrastructure Operations (Redundant Power, Warranty, EOL/EOS)

**Objective:** To explain operational considerations for network infrastructure.

### I. Redundant Power

| Solution | Duration | Description |
| :--- | :--- | :--- |
| **UPS (Uninterruptible Power Supply)** | Short-term | Battery-based backup |
| **Generator** | Long-term | Motor/fuel-based backup (requires maintenance and fuel) |

**UPS Types (Exam Focus):**

| Type | Description |
| :--- | :--- |
| **Offline/Standby** | Most common, cost-effective; basic power failure protection |
| **Line-Interactive** | Includes Automatic Voltage Regulation (AVR); corrects fluctuations |
| **Online/Double-Conversion** | Cleanest power; always online; best for sensitive equipment |

### II. Vendor Warranty & Support
- **Warranty:** Covers repairs/replacements; "burn-in" period to detect faults
- **Support Services:** Technical assistance, software updates, bug fixes, knowledge base access

### III. Product Lifecycle Risks

| Term | Definition | Risk |
| :--- | :--- | :--- |
| **End-of-Service (EOS)** | Support contract ends; no more updates or tech support | Unpatched vulnerabilities |
| **End-of-Life (EOL)** | Product discontinued; no patches for critical CVEs | Run at own risk; requires proactive replacement planning |

---

## Video V111: Transmission Media Part I (Topologies, Network Types)

**Objective:** To explain network topologies and types for transmission media selection.

### I. Network Topologies

| Topology | Description | Status |
| :--- | :--- | :--- |
| **Ring** | Only one host communicates at a time; token passing | Outdated |
| **Bus** | Single backbone cable; all devices share (early Ethernet) | Legacy |
| **Star** | Central network device (switch/hub); common in homes/businesses | Current |
| **Mesh** | High availability; multiple interfaces required | Current |

### II. Network Types (Geographical Scope)

| Type | Scope | Example |
| :--- | :--- | :--- |
| **PAN** | Individual immediate area | Bluetooth, Zigbee, mobile hotspot |
| **LAN** | Home or office | On-premises network |
| **CAN** | University or large corporate campus | Multiple buildings |
| **MAN** | City-sized area | Local government |
| **WAN** | State to country | The Internet |

### III. Ethernet Networking (IEEE 802.3)
- **Layer:** OSI Layer 2 (uses frames)
- **Components:** DTE (endpoints), DCE (switches)
- **Data Rates:** Fast Ethernet (100 Mbps), Gigabit Ethernet (1000 Mbps), 10 Gigabit Ethernet (10 Gbps)

### IV. Key Selection Factors for Transmission Media
1.  **Network Topology:** Physical layout
2.  **Location:** Proximity to wired infrastructure vs. need for wireless
3.  **Data Transfer Rate (Throughput):** Speed requirements
4.  **Cost & Equipment:** Compatibility with existing hardware

---

## Video V112: Transmission Media Part II (Cabling: Coax, Twisted Pair, Fiber)

**Objective:** To explain the characteristics of physical transmission media.

### I. Coaxial Cable
- **Structure:** Copper wire with shielding (prevents EMI)
- **Uses:** DSL, CCTV cameras

### II. Twisted Pair Cable

| Type | Description | Use Case |
| :--- | :--- | :--- |
| **UTP (Unshielded)** | No shielding; common in data centers | Standard networking |
| **STP (Shielded)** | Has ground wire and shielding | High EMI areas, cable chases |

**Category Standards:**

| Category | Speed | Max Distance |
| :--- | :--- | :--- |
| **Cat5** | 100 Mbps | 100 meters |
| **Cat6** | 1 Gbps (most common) | 100 meters |
| **Cat7** | 10 Gbps | 55 meters |

- **Plenum Rated:** Non-toxic jacket for air ducts/ceilings (prevents toxic fumes in fire)

### III. Fiber Optic Cable
- **Structure:** Glass core (vs. copper); uses light/lasers
- **Modes:**

| Mode | Core Size | Distance | Jacket Color |
| :--- | :--- | :--- | :--- |
| **Multi-mode** | 50 or 62.5 microns | ~2 km | Orange |
| **Single-mode** | 8.3 microns | Very long (service provider) | Yellow/Gray |

### IV. Wireless Media
- **Mechanism:** Radio frequency (no physical cable)
- **Disadvantages:** Range and coverage limitations; susceptible to interference (heavy machinery, microwaves, electrical devices)

---

## Video V113: Network Monitoring (SNMP, ICMP, QoS)

**Objective:** To explain network monitoring protocols and concepts.

### I. Core Protocols (Exam Focus)

| Protocol | Function |
| :--- | :--- |
| **SNMP (Simple Network Management Protocol)** | Health/status monitoring of devices (switches, printers, computers) |
| **ICMP (Internet Control Message Protocol)** | Sends operational info and error messages (ping, traceroute) |

### II. The Monitoring Workflow
1.  **Collect:** SNMP traps, ICMP, agents/logs
2.  **Monitor:** Visualize and analyze data
3.  **Act:** Incident response or analysis
4.  **Analyze:** Determine false positives vs. real threats

### III. Key Concepts

| Concept | Description |
| :--- | :--- |
| **Observability** | Gain insight into behavior and performance via traffic, logs, metrics |
| **Traffic Flow** | Direction and pattern of data movement (source to destination) |
| **Traffic Shaping** | Optimize flow and prioritize data (QoS - Quality of Service) |
| **Capacity Management** | Ensure adequate resources for current and future demands |
| **Fault Detection** | Identify and diagnose network failures/abnormalities |

### IV. Traffic Directions
- **Northbound:** Traffic leaving the system (egress)
- **Southbound:** Traffic coming from the internet (ingress)
- **East-West:** Lateral movement within the network

### V. Monitoring Tools (Examples)
- **Nagios:** IT infrastructure monitoring (visual spikes vs. baselines)
- **Datadog:** Network performance monitoring (end-to-end visibility)
- **AWS CloudWatch:** Cloud resource monitoring

---

## Session Summary
Session 15 covers the **complete network components and transmission media landscape** for the CISSP exam. Key takeaways include:

1.  **Hardware Operations:** Repeater, hub, bridge, switch, router, gateway, proxy, WAP, endpoints.

2.  **Infrastructure Operations:** UPS types (offline, line-interactive, online), generators, warranty, support, EOL vs. EOS.

3.  **Network Topologies:** Ring, bus, star, mesh.

4.  **Network Types:** PAN, LAN, CAN, MAN, WAN.

5.  **Cabling Media:** Coaxial, twisted pair (UTP/STP, Cat5/6/7, plenum), fiber optic (multi-mode vs. single-mode).

6.  **Wireless Media:** Radio frequency; range and coverage limitations.

7.  **Network Monitoring:** SNMP (health/status), ICMP (ping/traceroute), observability, traffic shaping (QoS), capacity management, fault detection.
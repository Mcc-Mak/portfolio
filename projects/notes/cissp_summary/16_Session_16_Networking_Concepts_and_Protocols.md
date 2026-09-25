# Session 16: Networking Concepts and Protocols

## Overview
This session covers the OSI and TCP/IP models, IP networking, LAN communications, communication protocols, multilayer protocols, converged protocols, data communications security, and virtualized networks. It consists of 9 videos (V114–V122).

---

## Video V114 (Outline): Networking Concepts (Section Intro)

**Objective:** To introduce the key topics in networking concepts for the CISSP exam.

### Topics Covered in this Session
1.  TCP/IP & OSI Models
2.  IP Networking (IPv4, IPv6, NAT, PAT)
3.  LAN Communications (Domains, Routing Protocols)
4.  Communication Protocols (Ports, Secure vs. Unsecure)
5.  Multilayer Protocols (DNP3, Covert Channels)
6.  Converged Protocols (FCoE, iSCSI, VoIP, MPLS)
7.  Data Communications (EMSEC/TEMPEST, Link/End-to-End Encryption)
8.  Virtualized Networks (VLANs, VLAN Hopping, SDN)

---

## Video V115: TCP/IP & OSI Models

**Objective:** To explain the OSI and TCP/IP models and their layers.

### I. The OSI Model (7 Layers)

| Layer | Name | PDU | Key Protocols | Function |
| :--- | :--- | :--- | :--- | :--- |
| 7 | Application | Data | HTTP, FTP, SMTP, SNMP | Human interface with applications |
| 6 | Presentation | Data | MPEG, JPEG, PNG | Data formatting and translation |
| 5 | Session | Data | SQL, NFS, RPC | Session management |
| 4 | Transport | Segments | TCP, UDP, TLS/SSL | Logical connection |
| 3 | Network | Packets | IP, IPSec, OSPF | Routing and addressing |
| 2 | Data Link | Frames | Ethernet, ARP, Wi-Fi | Hardware addressing (MAC) |
| 1 | Physical | Bits | RS-232, SONET | Bits transmission over physical medium |

### II. TCP/IP Model (4 Layers)

| Layer | OSI Mapping | Function |
| :--- | :--- | :--- |
| **Application** | Layers 5, 6, 7 | Application services |
| **Transport** | Layer 4 | Data transmission (TCP/UDP) |
| **Internet** | Layer 3 | Routing and addressing (IP) |
| **Link** | Layers 1, 2 | Physical and data link |

### III. TCP 3-Way Handshake
1.  **SYN:** Sender requests communication
2.  **SYN-ACK:** Receiver acknowledges
3.  **ACK:** Sender confirms, session established

**Other Flags:** URG (priority), RST (reset), FIN (terminate)

### IV. Encapsulation
- Sender adds headers (segments → packets → frames → bits)
- Receiver de-encapsulates (removes headers to reveal data)

### V. Mnemonics
- **Layer 7 to 1:** All People Seem To Need Data Processing
- **Layer 1 to 7:** Please Do Not Throw Sausage Pizza Away

---

## Video V116: IP Networking (IPv4, IPv6, NAT, PAT)

**Objective:** To explain IP addressing, versions, and translation.

### I. Addressing Types

| Type | Layer | Characteristics |
| :--- | :--- | :--- |
| **MAC Address** | Layer 2 | Physical address; burned into NIC (permanent) |
| **IP Address** | Layer 3 | Logical address; dynamic |
| **Domain Name** | - | Human-readable version of IP |

### II. IPv4 vs. IPv6

| Feature | IPv4 | IPv6 |
| :--- | :--- | :--- |
| **Address Size** | 32-bit decimal | 128-bit hexadecimal |
| **Address Space** | 4.3 billion | 340 trillion |
| **Auto-Configuration** | No (needs DHCP) | Yes (built-in) |
| **NAT** | Required for private addresses | Not needed |
| **QoS** | Requires configuration | Native |

### III. IPv4 Address Classes

| Class | Range | Default CIDR | Private Range |
| :--- | :--- | :--- | :--- |
| **A** | 1-126 | /8 | 10.0.0.0/8 |
| **B** | 128-191 | /16 | 172.16.0.0/12 |
| **C** | 192-223 | /24 | 192.168.0.0/16 |
| **D** | 224-239 | - | Multicasting |
| **E** | 240-255 | - | Research/Private |

*Note:* 127.x.x.x is reserved for loopback (127.0.0.1)

### IV. Communication Methods

| Method | Description |
| :--- | :--- |
| **Simplex** | One direction only |
| **Half-Duplex** | Send or receive, not both simultaneously |
| **Full-Duplex** | Bidirectional simultaneous (current standard) |

### V. Network Address Translation (NAT)
- **Purpose:** Converts private IPs to public IPs for internet routing
- **Dynamic NAT:** Maps pool of private IPs to smaller pool of public IPs
- **PAT (Port Address Translation):** Maps multiple private IPs to a single public IP using unique port numbers (supports 65,000+ connections)

---

## Video V117: LAN Communications (Domains, Routing Protocols)

**Objective:** To explain LAN domains and routing protocols.

### I. Network Domains

| Domain | Layer | Managed By | Description |
| :--- | :--- | :--- | :--- |
| **Broadcast Domain** | Layer 3 | Routers | All devices receive broadcasts |
| **Collision Domain** | Layer 2 | Switches | Collisions isolated here |

### II. Collision Management

| Protocol | Network Type | Mechanism |
| :--- | :--- | :--- |
| **CSMA/CD** | Wired (Ethernet) | Waits random time after collision, then retransmits |
| **CSMA/CA** | Wireless | Grants permission to one device at a time (collision avoidance) |

### III. Routing Protocols

| Protocol | Type | Description |
| :--- | :--- | :--- |
| **RIP** | Distance-Vector | Hop count (max 15); RIPv2 supports CIDR |
| **OSPF** | Link-State | Dijkstra algorithm; uses areas; fastest/most reliable path |
| **IS-IS** | Link-State | Similar to OSPF; full network map |
| **BGP** | Exterior Gateway | Selects best path by least number of autonomous systems (AS) |
| **IGRP** | Distance-Vector | Cisco proprietary (legacy) |
| **EIGRP** | Advanced Distance-Vector | Open standard; supports VLSM |

### IV. Autonomous System (AS)
- Collection of networks under a single routing policy
- Identified by unique **AS Number (ASN)**

---

## Video V118: Communication Protocols (Ports, Secure vs. Unsecure)

**Objective:** To explain common communication protocols and their ports.

### I. Application Layer (Layer 7) Protocols

| Protocol | Port | Secure? | Purpose |
| :--- | :--- | :--- | :--- |
| HTTP | 80 | No | Unsecure web |
| HTTPS | 443 | Yes | Secure web (HTTP + TLS/SSL) |
| FTP | 20,21 | No | File transfer (20=data, 21=control) |
| SSH | 22 | Yes | Secure remote access |
| Telnet | 23 | No | Unsecure remote access |
| SMTP | 25 | No | Email routing |
| DNS | 53 | - | Hostname to IP translation |
| DHCP | 67,68 | - | Dynamic IP assignment |
| POP3 | 110 | No | Receive email (secure on 1109) |
| IMAP | 143 | No | Manage email (secure on 993) |
| SNMP | 161,162 | No | Device health/status (secure on 10161/10162) |
| NTP | 123 | - | System clock sync |
| ICMP | - | - | Ping, traceroute (no port) |

### II. Presentation Layer (Layer 6) Protocols
- **ASCII:** Character encoding
- **JPEG/PNG:** Image file formats
- **MPEG:** Audio/video format

### III. Session Layer (Layer 5) Protocols
- **NFS (2049):** File sharing
- **SQL:** Relational database management
- **RPC (111):** Remote procedure calls

### IV. Transport Layer (Layer 4) Protocols
- **TCP:** Connection-oriented (handshake)
- **UDP:** Connectionless ("fire and forget")
- **TLS/SSL:** Network security (TLS replaced SSL in 2015)

### V. Network Layer (Layer 3) Protocols
- **IP:** Routing (connectionless)
- **ICMP:** Error and info messages
- **OSPF:** Link-state routing
- **IPSec:** Secure VPN (public key crypto)
- **NAT:** Private to public IP translation

### VI. Data Link Layer (Layer 2) Protocols
- **ARP:** IP to MAC address
- **RARP:** MAC to IP address
- **L2TP:** VPN tunneling (no encryption; paired with IPSec)
- **PPTP:** Older VPN for PPP

### VII. Physical Layer (Layer 1) Protocols
- **SONET:** Fiber optic digital communications
- **RS-232/RS-449:** Serial standards
- **HSSI:** Serial WAN communications

---

## Video V119: Multilayer Protocols (DNP3, Covert Channels)

**Objective:** To explain protocols that span multiple OSI layers.

### I. Definition
- **Multilayer Protocol:** Operates across multiple layers of the TCP/IP/OSI stack (e.g., Layer 2 & 3, Layer 3 & 4).

### II. Benefits
- Works at higher OSI layers
- Efficient processing by network/security components
- Encryption possible at different layers

### III. Risks & Challenges

| Risk | Description |
| :--- | :--- |
| **Encapsulation Issues** | Cannot add data if already encrypted; may bypass security controls |
| **Network Segmentation** | Hard to identify and isolate traffic |
| **Covert Channels** | Hide traffic inside encapsulation; evade security mechanisms (storage and timing channels) |

### IV. Key Example: DNP3 (Distributed Network Protocol)
- **Use:** Industrial control systems (electric, water, transportation, oil/gas)
- **Function:** Connects remote terminal units (RTUs) to SCADA master control stations

---

## Video V120: Converged Protocols (FCoE, iSCSI, VoIP, MPLS)

**Objective:** To explain protocols that merge specialty and standard protocols.

### I. Definition
- **Converged Protocol:** Merges a specialized protocol with a standard protocol to provide functions that traditional protocols lack.

### II. Key Examples

| Protocol | Function | Benefit |
| :--- | :--- | :--- |
| **FCoE (Fibre Channel over Ethernet)** | Fibre Channel over standard Ethernet | Access SAN without fibre switches |
| **iSCSI** | SCSI commands over IP networks | Storage access anywhere on network/internet |
| **MPLS** | High-speed data using predetermined paths; uses labels | Works with ATM, SONET, DSL; not limited to TCP/IP |
| **VoIP** | Voice/multimedia over IP networks | Replaces POTS/PBX; uses existing network infrastructure |
| **SDN (Software-Defined Networking)** | Virtualized network resources | Removes vendor/platform dependencies |

### III. Security Implications
- **Dual Risk:** Secure both specialty and standard protocol
- **Immaturity:** Newer protocols lack established security standards
- **Tunneling:** Can obscure traffic from security tools (IDS, sniffing, endpoint security)
- **Recommendation:** Test security mechanisms before production

---

## Video V121: Data Communications (EMSEC/TEMPEST, Link/End-to-End Encryption)

**Objective:** To explain secure data communications and circuit encryption.

### I. Communication Controls

| Control | Description |
| :--- | :--- |
| **Transparency** | Security runs in background; users not impacted |
| **Integrity** | Hashes and checksums to verify authenticity |
| **Logging & Error Correction** | Accountability; supports high availability and redundancy |

### II. Emanation Security (EMSEC/TEMPEST)
- **Problem:** Electrical signals from copper media emit emanations that can be captured and reconstructed
- **Countermeasures:**
    - **Faraday Cage:** Enclosed area (copper/metal mesh) blocks electromagnetic signals
    - **White Noise/Pink Noise:** Broadcast alternate emanations to mask sensitive signals
    - **Control Zones:** Specific areas protected by Faraday cage or white noise
- **Mitigation:** Use shielded cables or fiber optics

### III. Port Security
- **MAC Filtering:** Whitelist specific MAC addresses to restrict device access

### IV. Circuit Encryption

| Type | Description | Risk |
| :--- | :--- | :--- |
| **Link Encryption (Tunnel Mode)** | Encrypts entire channel (headers + data) | Traffic may be cleartext after gateway |
| **End-to-End Encryption (Transport Mode)** | Encrypts payload only; IP headers remain clear for routing | Headers exposed for routing |

### V. VPN Summary
- Creates secure tunnel over untrusted network (internet)
- Uses concentrator/gateway
- **L2TP:** Layer 2 (frames) protection
- **IPSec:** Layer 3 (packets) protection

---

## Video V122: Virtualized Networks (VLANs, VLAN Hopping, SDN)

**Objective:** To explain virtualized networks and their security implications.

### I. Virtual LANs (VLANs)
- **Definition:** Software-created LAN segments for segmentation and isolation
- **Mechanism:** 802.1q tagging (Q-tagging) on Ethernet frames

### II. VLAN Hopping (Attack & Mitigation)

| Attack Method | Mitigation |
| :--- | :--- |
| **Double Encapsulation:** Attacker adds two tags; first switch strips outer tag, exposing inner tag | 1. Set endpoint ports to **Access Mode** |
| Traffic jumps from authorized VLAN to target VLAN | 2. Change **Native VLAN** from default (VLAN 1) to non-default (e.g., 999) |
| | 3. Enforce Native VLANs on trunk ports |

### III. Types of VLANs
- **Private VLAN (PVLAN):** Port isolation (hotels, shared offices); Layer 2 technology
- **VXLAN (Virtual Extensible LAN):** Tunnels Layer 2 frames over Layer 3 (cloud networks)

### IV. Software-Defined Networking (SDN)

| Layer | Function |
| :--- | :--- |
| **Application Layer** | Provides services and applications; handles requests |
| **Control Layer** | Determines data flow between app and infrastructure; coordinates resources |
| **Infrastructure Layer** | Physical devices (routers, switches, storage); handles data forwarding |

### V. Software-Defined Everything (SDX)
- **Concept:** Virtualizing components to replace hardware (virtualization, containerization, IaaS, etc.)
- **Examples:**
    - **VDI (Virtual Desktop Infrastructure):** Centrally hosted VMs (e.g., VMware Horizon)
    - **VMI (Virtual Mobile Infrastructure):** Centrally hosted mobile OS for BYOD (e.g., Parallels RAS)

---

## Session Summary
Session 16 covers the **complete networking concepts and protocols landscape** for the CISSP exam. Key takeaways include:

1.  **OSI Model (7 layers):** Application → Presentation → Session → Transport → Network → Data Link → Physical (mnemonics provided).

2.  **TCP/IP Model (4 layers):** Application, Transport, Internet, Link.

3.  **IP Networking:** IPv4 vs. IPv6; address classes (A, B, C, private ranges); NAT/PAT.

4.  **LAN Domains:** Broadcast domain (routers), collision domain (switches); CSMA/CD (wired) vs. CSMA/CA (wireless).

5.  **Routing Protocols:** RIP (distance-vector), OSPF (link-state), BGP (exterior gateway), EIGRP.

6.  **Communication Protocols:** Port numbers for HTTP (80), HTTPS (443), SSH (22), FTP (20/21), DNS (53), etc.; secure vs. unsecure.

7.  **Multilayer Protocols:** DNP3 (ICS); risks include covert channels and encapsulation issues.

8.  **Converged Protocols:** FCoE, iSCSI, MPLS, VoIP, SDN; dual risk (secure both specialty and standard protocols).

9.  **Secure Communications:** EMSEC/TEMPEST (Faraday cage, white noise); link encryption vs. end-to-end encryption.

10. **Virtualized Networks:** VLANs (802.1q), VLAN hopping (double encapsulation), SDN (application, control, infrastructure layers), SDX (VDI, VMI).
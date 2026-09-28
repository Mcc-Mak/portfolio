# Session 19: Network Security and Attacks

**Videos:** V136 – V145  
**Core Focus:** Firewalls (concepts, types, architecture), IPsec, endpoint security, Network Access Control (NAC), reconnaissance attacks, spoofing/poisoning attacks, and Denial of Service (DoS) attacks.

---

## Video V136 (Outline): Network Security and Attacks (Section Intro)

**Objective:** To introduce the key topics in network security and attacks for the CISSP exam.

### Topics Covered in this Session
1.  Firewall Concepts
2.  Types of Firewalls
3.  Firewall Architecture
4.  IP Security (IPsec)
5.  Endpoint Security
6.  Network Access Control (NAC)
7.  Reconnaissance Attacks
8.  Spoofing and Poisoning Attacks
9.  Denial of Service (DoS) Attacks

---

## Video V137: Firewall Concepts

**Objective:** To explain the purpose, function, and deployment types of firewalls.

### I. Core Definition
- **Firewall:** Software (not just an appliance) that prevents unauthorized communications between networks.
- **Analogy:** Named after physical barriers that prevent/slow fire spread.

### II. Primary Functions
- Creates a security boundary to filter/control inbound and outbound traffic
- Performs packet inspections
- Compares traffic to Access Control Lists (ACLs)
- Can permit or deny by source, destination, protocol, port, or packet contents

### III. What Firewalls Can & Cannot Do

| Can Do | Cannot Do |
| :--- | :--- |
| Filter by source/destination IP, protocol, port | Prevent data sharing |
| Perform packet inspections | Stop viruses/worms (needs additional software) |

### IV. Access Control Lists (ACLs)
- Primary method for implementing firewall policies
- **Implicit Deny:** At the end of every ACL, all unlisted traffic is automatically denied
- Whitelisting vs. Blacklisting implications

### V. Firewall Deployment Types

| Type | Description | Examples |
| :--- | :--- | :--- |
| **Hardware/Appliance** | Software on dedicated hardware | Cisco Firepower/ASA, Palo Alto, Juniper SRX, Fortinet |
| **Virtual** | Software on VM (cloud or on-prem) | Same vendors + pfSense |
| **Host-based** | Installed directly on individual computers/servers | iptables, firewalld, host.allow/deny, Windows hosts file |
| **Web Application Firewall (WAF)** | Protects web-based systems | Cloudflare, Nginx, Azure, AWS, Barracuda |

### VI. Key Comparison
- **Network-based firewalls:** Monitor **all** traffic on the network
- **Host-based firewalls & WAFs:** Monitor traffic **to/from a specific host only**

### VII. Exam Takeaways
- Purpose of a firewall
- How a firewall works
- Purpose of different firewall deployments

---

## Video V138: Types of Firewalls

**Objective:** To explain the different generations and types of firewalls.

### I. Static Packet Filtering Firewall (1st Generation)
- **Also called:** Screening router, stateless inspection firewall
- **Layer:** Layer 3
- **Filters by:** Source address, destination address, protocol, port number
- **Pros:** Very fast, low overhead
- **Cons:** No state tracking

### II. Proxy Firewall (2nd Generation)
- **Acts as go-between;** trusted and untrusted systems never directly communicate
- **Two types:**
  - **Circuit-level gateway (Layer 5):** Manages TCP handshake and session creation
  - **Application-level gateway (Layer 7):** Manages user interaction and protocols
- **Proxy Directions:**
  - **Forward proxy:** Internal to external
  - **Reverse proxy:** External to internal
- **Cons:** Copies all data, increases latency, slower speed

### III. Stateful Inspection Firewall (3rd Generation)
- **Layers:** 3 and 4
- **Tracks state and behavior of data**
- **Dynamic features:**
  - Negotiates high ports (1024+)
  - Automatic return paths
  - No ACLs on both ends
- Uses state table

### IV. Next-Generation Firewall (NGFW)
- **Also called:** UTM (Unified Threat Management), multifunctional device
- **Filters internal and external threats**
- **Features:**
  - Deep packet inspection
  - URL filtering
  - SSL/TLS inspection
  - Intrusion detection and prevention
  - Malware scanning

### V. Summary Table

| Type | Generation | Layers | Primary Filtering Basis |
| :--- | :--- | :--- | :--- |
| Static Packet Filtering | 1st | L3 | Src/dest IP, protocol, port |
| Proxy (Circuit/App Gateway) | 2nd | L5 & L7 | Application, session, service |
| Stateful Inspection | 3rd | L3 & L4 | State & behavior of data |
| Next-Gen (NGFW) | Advanced | Multi-layer | Integrated threat detection |

---

## Video V139: Firewall Architecture

**Objective:** To explain firewall deployment architectures: Multihomed, Bastion Host, Screened Host, and Screened Subnet (DMZ).

### I. Multihomed Firewall
- **Definition:** Firewall with multiple network interfaces
- **Basic setup:** Outside (external/untrusted) + Inside (internal/trusted) interfaces
- **Advanced setup:** One external + multiple internal interfaces

### II. Bastion Host
- **Definition:** Hardened server logically placed between internal and external networks
- **Characteristics:**
  - Minimal attack surface
  - Only necessary services (SSH, NTP, authentication)
  - No unnecessary services (FTP, Telnet)
- **Common use:** Cloud environments (public cloud gateway to private cloud)

### III. Screened Host
- **Placement:** Behind firewall, inside security boundary (connected to internal interface)
- **Function:** Screens traffic before it enters the network core
- **Traffic handling:** Inbound/northbound inspected; outbound/southbound often not screened
- **Also called:** Single-tiered configuration

### IV. Screened Subnet (DMZ)
- **Structure:** Two firewalls (external + internal) with a semi-trusted network (DMZ) between them
- **DMZ characteristics:** Semi-trusted; hosts web servers, file servers, guest zones
- **Traffic flow:** External firewall → DMZ → Internal firewall → Trusted LAN

### V. Comparison Table

| Architecture | # of Firewalls | Placement | Trust Level |
| :--- | :--- | :--- | :--- |
| Multihomed | 1 | Between external and internal | Untrusted → Trusted |
| Bastion Host | 1 (hardened server) | Between internal and external (often cloud) | Gateway |
| Screened Host | 1 | Behind firewall inside trusted network | Trusted (with inspection) |
| Screened Subnet (DMZ) | 2 | External FW → DMZ → Internal FW | Untrusted → Semi-trusted → Trusted |

### VI. Exam Focus
- Most important: **Screened subnet (DMZ)** and **Bastion host**

---

## Video V140: IP Security (IPsec)

**Objective:** To explain IPsec purpose, modes, components, and VPN tunnels.

### I. Purpose of IPsec
- Creates a secure tunnel over an untrusted network
- Encapsulates unsecured protocols (HTTP, FTP, etc.)
- Uses symmetric or asymmetric cryptography
- Works for hosts or network devices

### II. Common Use: VPN
- Private connection over internet
- Needs VPN concentrator or gateway
- Often paired with L2TP (L2TP tunnels Layer 2 frames; IPsec encrypts Layer 3)

### III. What IPsec Provides
- ✅ Confidentiality (encryption)
- ✅ Integrity (hashing)
- ✅ Endpoint authentication
- ❌ Does NOT guarantee availability

### IV. Two Modes of IPsec

| Mode | Encryption Scope | Visibility | Use Case |
| :--- | :--- | :--- | :--- |
| **Transport Mode** | Payload only | Header visible (source, dest, port, protocol) | More efficient, allows SIEM inspection |
| **Tunnel Mode** | Entire packet | Everything encrypted | Most secure, typical VPN tunnel |

### V. Security Association (SA)
- Defines algorithms, ciphers, keys for IPsec
- Managed by **ISAKMP** (negotiates, establishes, modifies, deletes SAs)

### VI. Components of IPsec

| Component | Function |
| :--- | :--- |
| **Authentication Header (AH)** | Integrity, authentication, non-repudiation, replay attack protection |
| **Encapsulating Security Payload (ESP)** | Confidentiality + integrity of data packet |

- **Transport mode:** Usually ESP only (header exposed, no AH)
- **Tunnel mode:** Both AH + ESP (full protection)

### VII. IPsec Alone vs. L2TP/IPsec

| | IPsec Alone | L2TP Alone | L2TP + IPsec |
| :--- | :--- | :--- | :--- |
| Encrypts data | ✅ | ❌ | ✅ |
| Tunnels Layer 2 | ❌ | ✅ | ✅ |
| User authentication | Weak | ✅ (via PPP) | ✅ |
| Works over internet | ✅ | ❌ | ✅ |

### VIII. Exam Takeaways
- Understand purpose
- Know transport vs. tunnel mode
- Know Security Association (SA) role
- Know AH and ESP components
- Know VPN tunnel creation

---

## Video V141: Endpoint Security

**Objective:** To explain endpoint security mechanisms and defense-in-depth.

### I. Definition & Core Concept
- **Endpoints:** Source and destination of communication (computers, servers, mobile devices)
- **Goal:** Remove the single point of failure found in traditional network-based defenses

### II. Problem with Network-Only Defenses
- NIDS/NIPS installed on network
- Fail if endpoints talk directly without traversing the network device
- Routing all traffic through them causes high latency

### III. Solution: Defense in Depth with Endpoint Security
- Install HIDS/HIPS on every endpoint → always protected even if network defense fails
- Limits spread of infection
- Prevents lateral movement of attackers

### IV. Key Endpoint Security Mechanisms

| Mechanism | Function | Active/Passive |
| :--- | :--- | :--- |
| **Host-based Firewall** | Minimum baseline; prevents unauthorized communication | Active |
| **Antivirus/Anti-malware** | Detects and removes viruses; prevents spread | Active |
| **HIDS** | Passive: detects violations; sends alerts only | Passive |
| **HIPS** | Active: detects and responds; can reconfigure system | Active |
| **Data Loss Prevention (DLP)** | Blocks unauthorized data transfers based on labeling | Active |
| **VPN Client** | Secure connection over public networks | Active |
| **Patching** | Keep endpoints up to date | Proactive |
| **Hardening** | Minimize attack surface | Proactive |

### V. Layered Defense Example
1.  Layer 1: Host-based firewall
2.  Layer 2: HIDS and HIPS
3.  Layer 3: Antivirus and anti-malware
4.  Layer 4: Hardened configuration

### VI. Exam Takeaways
- Know the approaches to endpoint security
- Know the recommended mechanisms (firewall, AV, HIDS/HIPS, DLP, VPN, patching, hardening)

---

## Video V142: Network Access Control (NAC)

**Objective:** To explain NAC, IEEE 802.1X, admission types, deployment architectures, and remediation.

### I. Definition & Goal
- **NAC:** Combination of technologies controlling access to a private network
- **Goal:** Enforce strict network policies via Authorization, Authentication, Accounting (AAA)
- Identify and authenticate subjects + devices (not just IP addresses)
- Block/isolate non-compliant hosts

### II. Key Protocol: IEEE 802.1X
- Also called **Port-Based Network Access Control (PNAC)**
- Implemented at network interface; requires **mutual authentication** (device ↔ network)
- Use cases: BYOD, IoT, guest network access

### III. Admission Types

| Type | Description | Typical Use |
| :--- | :--- | :--- |
| **Pre-admission** | Endpoint must be compliant before gaining access | Employees |
| **Post-admission** | Access granted first, then behavior monitored for violations | Guest networks |

### IV. Implementation Methods
- **Agent-based:** Software on endpoint monitors activity
- **Agentless:** Remote scanning/monitoring via network connection

### V. Deployment Architectures

| Architecture | Behavior |
| :--- | :--- |
| **Out-of-band** | NAC components don't interfere with network infrastructure; scanning/monitoring without operational impact |
| **In-line** | NAC sits between device and network; real-time traffic inspection and decisions |

### VI. Remediation for Non-Compliant Endpoints
- **Quarantine** – Isolate from network
- **Captive portal** – Limited access (login screen) until compliant
- **Remedial network** – Contains patch server, vulnerability scanner, captive portal server

### VII. Exam Takeaways
- Understand goals of NAC
- Know different types (pre/post, agent/agentless, in-line/out-of-band)
- Understand remediation & captive portal concepts

---

## Video V143: Reconnaissance Attacks

**Objective:** To explain passive and active reconnaissance attacks.

### I. Definition & Two Main Types
- **Reconnaissance (Discovery):** Preliminary analysis to gather information about a target
- **Passive (OSINT):** Collect information without being detected (web mining, searching)
- **Active:** Collect information with expectation of being detected

### II. Active Reconnaissance Techniques

| Attack | Description | Tools / Examples | Mitigation |
| :--- | :--- | :--- | :--- |
| **Ping Sweep (Discovery Scan)** | Pings network IPs to find live hosts | Nmap, Angry IP Scanner, Nessus | Deny ICMP where possible |
| **Port Scan** | Discovers open communication ports | Nessus, OpenVAS | Endpoint security may detect |
| **Banner Grabbing** | Identifies service type/version (OS, web server, software) | (Often part of port scan) | Helps attacker find vulnerabilities |
| **SYN Scan (Half-open)** | Sends only SYN packet; no final ACK; can cause DoS | TCP handshake exploitation | Use proper session timeouts |
| **NULL, FIN, Xmas Scans** | Various TCP flag combinations | Nmap | Proper firewall rules |
| **Eavesdropping (Sniffing)** | Intercept traffic (man-in-the-middle) | Wireshark, tcpdump, Splunk Stream | Use encryption and network segmentation |

### III. Attack Chain Example (Internal Access)
1.  **Ping sweep** → Find live IPs
2.  **Port scan** → Find open ports
3.  **Banner grab** → Identify software versions
4.  **Exploit** → Target vulnerabilities

### IV. Exam Takeaways
- Understand each technique
- SYN scan most important
- Distinguish passive (OSINT) vs. active reconnaissance

---

## Video V144: Spoofing and Poisoning Attacks

**Objective:** To explain spoofing (impersonation) and poisoning attacks, focusing on ARP and DNS.

### I. Core Concepts
- **Spoofing (Impersonation/Masquerading):** Disguising malicious information/subjects as legitimate sources
- **Poisoning:** The process of using spoofed information
- **OSI Focus:** Layer 2 (Data Link) and Layer 3 (Network)

### II. Types of Spoofing
- IP Spoofing, MAC Spoofing, Route Spoofing, Hyperlink Spoofing, Email Spoofing, Phone Number Spoofing

### III. Key Exam Attacks

| Attack | Protocol | Target | Mechanism | Result |
| :--- | :--- | :--- | :--- | :--- |
| **ARP Spoofing (ARP Cache Poisoning)** | ARP (IP → MAC translation) | ARP cache | Unsolicited (gratuitous) ARP replies | Man-in-the-Middle (Layer 2) |
| **DNS Spoofing (DNS Cache Poisoning)** | DNS (domain → IP) | DNS cache or rogue DNS server | Inject false IP mappings | Victims sent to malicious sites |

### IV. Best Practices for Mitigation
- Use port security (PBAC)
- Use NIDS and HIDS
- Use MAC filtering (whitelist trusted MACs)
- Monitor DNS traffic for abuse
- Use Split DNS (separate internal and external servers)
- Use DNS Security (DNSSEC) with PKI and digital signatures
- Limit DHCP (restrict dynamic address pools)
- Encrypt and digitally sign emails

### V. Exam Takeaways
- Understand purpose of spoofing and poisoning
- Understand ARP spoofing (Layer 2)
- Understand DNS spoofing (Layer 3)

---

## Video V145: Denial of Service (DoS) Attacks

**Objective:** To explain DoS and DDoS attacks, attack types, and legacy attacks.

### I. Definition & Focus
- **Denial of Service (DoS):** Prevents authorized access to a resource/object
- **Primary Focus:** Denying **availability** (key security pillar)

### II. DDoS (Distributed Denial of Service)
- Uses multiple bots/zombies to attack a single target simultaneously
- **Botnet:** Network of bots controlled via Command & Control (C2) server
- **Bot Master:** Attacker controlling the botnet

### III. Common DoS/DDoS Attack Types

| Attack | Mechanism |
| :--- | :--- |
| **SYN Flood** | Overwhelming SYN packets (TCP handshake initiation) to a target |
| **Ping Flood** | Massive amount of ICMP ping requests forcing server responses |
| **Buffer Overflow** | Sending more input than the target's memory buffer can process → crash |
| **DRDoS (Distributed Reflective DoS)** | Tricking machine into replying to itself; Smurf (ICMP echo) & Fraggle (UDP echo) |

### IV. Legacy Attacks (Less effective today but good to know)

| Attack | Mechanism |
| :--- | :--- |
| **Ping of Death** | Oversized ping packet (65,536 bytes) exceeding MTU → crash |
| **Teardrop Attack** | Malformed packets that cannot be reassembled → dropped packets → DoS |
| **Land Attack** | SYN packet sent to victim's own IP → self-reply loop → crash |

### V. Defenses & Notes
- Modern OS (Windows, macOS, Linux) have built-in defenses against many attacks
- Security professionals must enforce policy compliance

### VI. Exam Takeaways
- Understand each DoS attack type
- Especially those exploiting the TCP handshake (SYN, SYN/ACK, ACK)

---

## Session 19 Summary

Session 19 covers the **complete network security and attacks landscape** for the CISSP exam. Key takeaways include:

1. **Firewall Concepts (V137):** Firewalls are software; understand ACLs (implicit deny), deployment types (hardware, virtual, host-based, WAF).

2. **Types of Firewalls (V138):** Static Packet Filtering (1st gen, Layer 3), Proxy (2nd gen, Layer 5/7), Stateful Inspection (3rd gen, Layers 3/4), NGFW (advanced, multi-layer).

3. **Firewall Architecture (V139):** Multihomed, Bastion Host, Screened Host, Screened Subnet (DMZ). Exam focus: DMZ and Bastion Host.

4. **IP Security (V140):** IPsec provides confidentiality, integrity, authentication (not availability). Transport mode (payload only) vs. Tunnel mode (entire packet). AH (integrity) vs. ESP (confidentiality + integrity).

5. **Endpoint Security (V141):** Defense in depth with HIDS/HIPS, host-based firewalls, antivirus, DLP, patching, hardening.

6. **Network Access Control (V142):** IEEE 802.1X (PNAC) for mutual authentication. Pre-admission (employees) vs. Post-admission (guests). In-line vs. Out-of-band deployment.

7. **Reconnaissance Attacks (V143):** Passive (OSINT) vs. Active (ping sweeps, port scans, banner grabs, SYN scans, sniffing).

8. **Spoofing & Poisoning Attacks (V144):** ARP spoofing (Layer 2, MITM) and DNS spoofing (Layer 3, cache poisoning). Mitigations: port security, DNSSEC, Split DNS.

9. **Denial of Service Attacks (V145):** DoS vs. DDoS. SYN flood, ping flood, buffer overflow, DRDoS (Smurf/Fraggle). Legacy: Ping of Death, Teardrop, Land attack.

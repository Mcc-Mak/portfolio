# Session 11: Network Services

## V90 - Section Outline
- **Network Services**: Functions provided by network infrastructure (IP assignment, domain name translation, time synchronization, QoS).
- **Course Objectives**: 1.2 (compare/contrast appliances), 3.4 (implement IPv4/IPv6 services).
- **Services Covered**:
  - DHCP (Dynamic Host Configuration Protocol).
  - SLAAC (Stateless Address Autoconfiguration) for IPv6.
  - DNS (Domain Name System) – records, security.
  - NTP (Network Time Protocol).
  - Quality of Service (QoS).

## V91 - DHCP (Dynamic Host Configuration Protocol)
- **Purpose**: Automatically assign IP addresses and network configuration to clients.
- **Scope**: List of valid IP addresses available for assignment.
- **DHCP Reservation**: Assigns the same IP each time based on MAC address.
- **DORA Process**: **D**iscover → **O**ffer → **R**equest → **A**cknowledge.
- **Information Provided**: IP address, subnet mask, default gateway, DNS server IP.
- **APIPA**: Fallback when DHCP fails (`169.254.x.x`).
- **DHCP Relay**: Forwards DHCP packets when client and server are on different subnets.

## V92 - DHCP Demonstration (Packet Tracer)
- Shows the DORA process step-by-step using broadcast messages (`255.255.255.255`).
- Demonstrates DHCP reservations and scope configuration on a SOHO router.

## V93 - SLAAC (Stateless Address Autoconfiguration) for IPv6
- **Purpose**: Allows IPv6 devices to configure their own IP addresses autonomously without a central server (like DHCP).
- **5-step process**:
  1. Device generates a temporary link-local address.
  2. Router solicitation (asks for routers).
  3. Router advertisement (router replies with network prefix).
  4. Address configuration (combines prefix + own hardware-derived ID → unique IPv6 address).
  5. Final check (neighbor solicitation to ensure no duplicate).

## V94 - DNS (Domain Name System)
- **Purpose**: Translates human-readable domain names into IP addresses.
- **DNS Hierarchy**: Root → Top Level Domain (TLD, e.g., .com) → Second Level Domain (e.g., diontraining) → Subdomain (e.g., www) → Host.
- **FQDN (Fully Qualified Domain Name)**: e.g., `www.diontraining.com`.
- **Hosts File**: Local flat file override for DNS. Checked before DNS query.

## V95 - DNS Record Types
- **A (Address)**: Hostname → IPv4 address.
- **AAAA (Quad A)**: Hostname → IPv6 address.
- **CNAME (Canonical Name)**: Domain → another domain/subdomain.
- **MX (Mail Exchange)**: Directs email to mail servers (uses priority values).
- **NS (Name Server)**: Indicates authoritative DNS server.
- **SOA (Start of Authority)**: Stores domain/zone metadata (critical for zone transfers).
- **PTR (Pointer)**: IP → domain name (reverse lookup).
- **TXT (Text)**: Stores text (used for domain verification, spam prevention).
- **TTL (Time to Live)**: Tells DNS resolver how long to cache a query.

## V96 - Securing DNS
- **DNSSEC (DNS Security Extensions)**: Digital signatures for tamper-proof data (integrity). Does **not** encrypt.
- **DoH (DNS over HTTPS)**: Sends DNS queries via HTTPS protocol (encryption + blends with web traffic).
- **DoT (DNS over TLS)**: Encapsulates DNS inside TLS tunnel (encryption).

## V97 - DNS Resolution Demonstration (Packet Tracer)
- Shows the complete iterative/recursive DNS resolution process from client to local DNS server to root DNS server to authoritative DNS server.

## V98 - NTP (Network Time Protocol)
- **Purpose**: Synchronizes clocks across computer systems (UDP port 123).
- **Stratum Hierarchy**:
  - Stratum 0: Reference clocks (atomic clocks, GPS).
  - Stratum 1: Primary time servers (synchronized to Stratum 0).
  - Stratum 2: Synchronized to Stratum 1, and so on (max 15).
- **Precision Time Protocol (PTP)** : Higher precision (sub-microsecond), for financial trading/industrial automation.
- **Network Time Security (NTS)** : Extension of NTP for cryptographic security (TLS + AEAD).

## V99 - Quality of Service (QoS) – Why & What
- **Why QoS?** Modern converged networks (voice, video, data share same wire). VoIP/video need low latency, low jitter, low drops.
- **Three QoS Categories**:
  - **Delay**: Time packet travels source → destination. Bad for real-time.
  - **Jitter**: Uneven packet arrival. Causes glitches in UDP-based VoIP/video.
  - **Drop**: Packets discarded during congestion.
- **Effective Bandwidth**: The slowest link in the path determines overall bandwidth.

## V100 - QoS Mechanisms & Categorization
- **Three QoS Mechanisms**:
  - **Best Effort**: No QoS; first-in, first-out.
  - **Integrated Services (IntServ / Hard QoS)**: Strict bandwidth reservations.
  - **Differentiated Services (DiffServ / Soft QoS)**: Suggestion-based percentages; dynamic allocation.
- **Implementation Tools**:
  - **Classification & Marking**: Altering bits in frame/packet (e.g., DSCP).
  - **Congestion Management (Queuing)**: Weighted Fair Queuing (WFQ), Low-Latency Queuing (LLQ), Weighted Round-Robin (WRR).
  - **Congestion Avoidance**: Random Early Detection (RED) – drops lowest-priority traffic first.
  - **Policing vs. Shaping**: Policing discards excess traffic; Shaping buffers excess traffic.
  - **Link Efficiency**: Compression (e.g., cRTP for VoIP), Link Fragmentation & Interleaving (LFI).

## V101 - QoS Categorization Details
- **Classification (Without Marking)**: Categorizes traffic by analyzing headers, ports, protocols. Does **not** alter bits.
- **Marking (Altering Bits)**: Explicitly marks frames/cells/packets (e.g., IP Precedence, DSCP).
- **Congestion Management (Queuing)**:
  - **WFQ**: Round‑robin from each queue.
  - **LLQ**: Empty higher‑priority queues first.
  - **WRR**: Hybrid (e.g., 3 from queue1, 2 from queue2, 1 from queue3).
- **Congestion Avoidance**: RED drops packets before queue overflows.
- **Policing vs. Shaping**:
  - **Policing**: Discard packets exceeding rate limit (best for high-speed interfaces).
  - **Shaping**: Buffer (delay) excess traffic (best for slower links).
- **Link Efficiency**: Compression (reduce payload/header size), LFI (fragment large packets, interleave small packets).
# Session 4: Ports, Protocols, and Services

## V22 - Section Outline
- **Port**: Virtual entry/exit point for software communication (e.g., Port 443 for secure web traffic).
- **Protocol**: Set of rules for data exchange (e.g., TCP for reliable connections, IP for addressing).
- **Course & Exam Context**: Domain 1 – Networking Concepts. Objective 1.4 – Explain common networking ports, protocols, services, and traffic types.
- **Topics Covered**:
  - Port Ranges: Well-known (0–1023), Registered (1024–49,151), Dynamic/Private (49,152–65,535).
  - Protocols: TCP, UDP, ICMP.
  - Web Ports/Protocols: HTTP (80), HTTPS (443).
  - Email Ports/Protocols: SMTP (25), SMTPS (587), POP3 (110), IMAP (143).
  - File Transfer: FTP (20/21), SFTP (22), TFTP (69).
  - Remote Access: SSH (22), Telnet (23), RDP (3389).
  - Network Services: DNS (53), DHCP (67/68), SQL (1433), SNMP (161/162), Syslog (514).
  - Other Services: NTP (123), SIP (5060/5061), LDAP (389), LDAPS (636).
  - Tool: Scanning with Nmap.

## V23 - Network Port Fundamentals
- **Problem Ports Solve**: IP addresses get data to the right **system**; Ports identify the specific **application/service** on that system.
- **Port Number Range**: 0 – 65,535 total ports.
- **Three Categories of Ports**:
  - **Well-known ports** (0 – 1,023): Common services (FTP:20/21, SMTP:25, HTTP:80, HTTPS:443).
  - **Registered ports** (1,024 – 49,151): Reserved via IANA for specific apps/games.
  - **Ephemeral ports** (dynamic/private) (49,152 – 65,535): Short-lived, temporary, randomly assigned.
- **Communication Flow**: Client (Source IP + random ephemeral port) → Server (Destination IP + well-known port). Server responds to client's ephemeral port.

## V24 - Transmission Control Protocol (TCP)
- **Definition**: A fundamental protocol in the internet suite governing data exchange over the internet.
- **Key Characteristic**: Widely used for its **reliability** (ensures packets reach destination in correct order, without corruption).
- **OSI Model Layer**: Operates at the **Transport Layer** (Layer 4).
- **Core Function: Packetization**: Breaks larger messages into smaller packets, transmits, and reassembles at the destination.
- **Connection Establishment: The Three-Way Handshake**:
  1. SYN (Synchronize): Client sends SYN packet to server to initiate a session.
  2. SYN-ACK (Synchronize-Acknowledge): Server responds, acknowledging receipt and confirming willingness/ability.
  3. ACK (Acknowledge): Client sends ACK back to confirm the connection.
- **Error Checking & Flow Control**: Uses sequence numbers, acknowledgement messages, retransmission, and windowing.

## V25 - User Datagram Protocol (UDP)
- **Definition**: A communication protocol for time-sensitive transmissions (e.g., video playback, DNS lookups). Prioritizes **speed** over perfect reliability.
- **Key Characteristics**: Low latency & low overhead, connectionless, stateless (“fire-and-forget”).
- **Header size**: 8 bytes (vs. TCP’s 20–60 bytes).
- **Use Cases**: Live broadcasts, online gaming, VoIP, simple request-response (e.g., DNS lookup).

## V26 - Internet Control Message Protocol (ICMP)
- **What it is**: A network diagnostic and error reporting tool, not a transport protocol.
- **Operates at**: Network layer (OSI model). Encapsulated within IP packets.
- **Common Functions**:
  - Reporting unreachable hosts/services.
  - Notifying when a packet’s TTL expires.
  - Indicating router buffer full.
  - **PING utility**: Sends ICMP Echo Request → receives Echo Reply; measures round-trip time (latency).
- **Message Structure**: Type, Code, Checksum.
- **Security Vulnerabilities**:
  - **ICMP Flood Attack (Ping flood)**: Overwhelms target with many Echo Requests → DoS/DDoS.
  - **Ping of Death**: Sends oversized ICMP Echo Request (>65,535 bytes) → buffer overflow on older systems.

## V27 - Web Ports and Protocols (HTTP/HTTPS)
- **Port 80 – HTTP (Hypertext Transfer Protocol)**:
  - Default for unsecure web browsing.
  - Sends plain text requests/responses. No encryption → vulnerable to eavesdropping.
- **Port 443 – HTTPS (HTTP Secure)**:
  - Encrypts data via SSL/TLS tunnel.
  - Visual indicators: `https://` in URL or green padlock icon.
- **Key Differences**:
  - **Security**: HTTP = unencrypted; HTTPS = encrypted.
  - **Default usage**: HTTP since 1991; HTTPS since 1994 (now >95% of web traffic).
  - **SEO & Trust**: HTTPS sites rank higher in search results.

## V28 - Email Ports and Protocols
- **SMTP (Simple Mail Transfer Protocol)** – Port 25: Used for sending emails. Insecure (plain text). Secure variant: SMTPS (ports 465/587).
- **POP3 (Post Office Protocol v3)** – Port 110: Used for retrieving emails (downloads and deletes from server by default). Insecure. Secure variant: POP3S (port 995).
- **IMAP (Internet Message Access Protocol)** – Port 143: Manages emails directly on the server; syncs across multiple devices. Insecure. Secure variant: IMAPS (port 993).
- **Security Recommendation**: Use secure variants (SMTPS, POP3S, IMAPS) whenever possible.

## V29 - File Transfer Ports and Protocols
- **FTP (File Transfer Protocol)**: Ports 20 (data), 21 (control). Oldest protocol; no encryption (plain text, insecure).
- **SFTP (SSH File Transfer Protocol)**: Port 22. Tunnels FTP through SSH; encrypted; addresses FTP's security flaws.
- **TFTP (Trivial File Transfer Protocol)**: Port 69. Simple, basic version; no authentication; used for diskless workstations, VoIP phones.
- **SMB (Server Message Block)**: Port 445. Network file sharing protocol (Windows native); primarily for **LAN** use (not for internet transfers).

## V30 - Remote Access Ports and Protocols
- **SSH (Secure Shell)** – Port 22: Secure, encrypted tunnel for text-based commands. Developed as a secure replacement for Telnet.
- **Telnet** – Port 23: Early remote login protocol. No encryption (plain text). Obsolete; avoid unless required by legacy equipment.
- **RDP (Remote Desktop Protocol)** – Port 3389: Graphical user interface (GUI) remote access to Windows systems. Supports encryption, smart card authentication.

## V31 - Network Service Ports and Protocols
- **DNS (Domain Name System)** – Port 53: Translates domain names → IP addresses. Uses UDP (small messages) & TCP (zone transfers).
- **DHCP (Dynamic Host Configuration Protocol)** – Ports 67 (server), 68 (client): Automates assignment of IP addresses, subnet masks, gateways, etc. Uses UDP.
- **SQL Services**: Microsoft SQL Server → 1433; MySQL → 3306.
- **SNMP (Simple Network Management Protocol)** – Ports 161 (polling), 162 (traps): Collects information from/configuring network devices.
- **Syslog (System Logging)** – Port 514: Sends event messages to a collector (syslog server). Uses UDP (default) or TCP.

## V32 - Other Network Service Ports and Protocols
- **NTP (Network Time Protocol)** – Port 123 (UDP): Synchronizes computer clocks over a network.
- **SIP (Session Initiation Protocol)** – Ports 5060 (unencrypted), 5061 (encrypted with TLS): Initiates, maintains, and terminates real-time sessions (VoIP).
- **LDAP (Lightweight Directory Access Protocol)** – Port 389 (TCP/UDP): Accesses and maintains distributed directory information. Insecure.
- **LDAPS (LDAP over SSL/TLS)** – Port 636 (TCP): Secure version of LDAP.

## V33 - Scanning with Nmap (Demonstration)
- **Nmap (Network Mapper)** is a command-line tool for network discovery, port scanning, and OS fingerprinting.
- **Zenmap** is the graphical user interface for Nmap.
- **Common flags**: `-sS` (SYN scan), `-O` (detect operating system).
- **Use case**: Identifying open ports and running services on a remote system for troubleshooting or security auditing.
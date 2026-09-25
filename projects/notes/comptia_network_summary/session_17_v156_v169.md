# Session 17: Network Segmentation

## V156 - Section Outline
- **Core Responsibility**: Network technicians (with cybersecurity teams) configure devices and implement security upgrades.
- **Course Objectives**: 1.2 (compare/contrast appliances), 1.8 (evolving use cases), 3.5 (compare access/management methods), 4.1 (basic security concepts), 4.3 (apply security features).
- **Topics Covered**:
  - Firewalls (packet-filtering, stateful, NGFW, UTM).
  - Access Control Lists (ACLs).
  - Segmentation zones (trusted, untrusted, screened subnet).
  - Jumpboxes.
  - Content filtering & proxy servers.
  - IoT (Internet of Things).
  - SCADA / ICS.
  - BYOD (Bring Your Own Device).
  - Zero Trust Architecture.
  - VPNs (site-to-site, client-to-site, clientless).
  - Remote access management (Telnet, SSH, RDP, VNC, VDI, APIs).

## V157 - Firewalls
- **Packet-Filtering Firewall**: Inspects packet headers (source/destination IP & port) based on ACL. Stateless.
- **Stateful Firewall**: Tracks sessions – allows replies to outbound requests, blocks unsolicited inbound traffic.
- **NGFW (Next-Generation Firewall)** : Deep Packet Inspection (DPI) – works at OSI layers 5–7. Understands packet contents.
- **UTM (Unified Threat Management)** : Combines firewall, router, IDS/IPS, malware protection, etc., into one device. Often called “next‑generation next‑gen firewall.”

## V158 - Access Control Lists (ACLs)
- **Definition**: List of permissions applied to routers, switches, or firewalls based on IP address, port, MAC address.
- **Processing order**: Top to bottom → most specific rules at the top, most generic at the bottom.
- **Implicit Deny**: Final default rule blocking anything not explicitly permitted.
- **What to block**: Incoming internal/private IPs (spoofing), protocols that should be local only (ICMP, DHCP, SMB), unsecured IPv6 traffic.
- **Role-Based Access**: Define privileges of administrative users based on job function.

## V159 - Segmentation Zones (Trusted, Untrusted, Screened Subnet)
- **Trusted Zone (Inside Zone)** : Local Area Network / Intranet.
- **Untrusted Zone (Outside Zone)** : Internet or external networks.
- **Screened Subnet (Semi-Trusted Zone)** : Between trusted and untrusted. Hosts public-facing servers (web, email). Not fully trusted by internal network.
- **Traffic Rules**:
  - Untrusted → Trusted: Blocked unless requested internally.
  - Trusted → Screened Subnet: Treated like internet; return traffic allowed if requested.
  - Screened Subnet → Untrusted: Allowed outbound.
  - Untrusted → Screened Subnet: Limited inbound allowed (e.g., ports 80,443,25,110,143).

## V160 - Screened Subnet & Jumpboxes
- **Internet-facing host**: Accepts inbound connections from the internet (e.g., web server, email server). Should be placed in screened subnet.
- **Bastion Host**: Host in screened subnet configured with no internal network services (only internet-facing services).
- **Jumpbox**: Hardened server providing access to other screened subnet hosts. Administrator connects to jumpbox → jumpbox connects to target host.

## V161 - Configuring Firewalls (Demonstration)
- Demonstrates configuring a SOHO hardware firewall (NETGEAR) to block services (Telnet, custom ports) and allow inbound via port forwarding.
- Demonstrates configuring Windows Defender Firewall with Advanced Security (inbound/outbound rules, monitoring).
- Demonstrates configuring macOS firewall (basic options, stealth mode).

## V162 - Content Filtering & Proxy Servers
- **Content Filtering Methods**:
  - **URL Filtering**: Blocks specific websites by URL.
  - **Keyword Filtering**: Scans pages for blocked keywords.
  - **Protocol/Port Filtering**: Blocks traffic based on protocol or port.
- **Proxy Servers**: Intermediary between user’s device and the internet.
  - **Web Proxy**: Retrieves webpages; can bypass content filters.
  - **Reverse Proxy**: Manages incoming traffic to business servers (load balancing, security).
  - **Transparent Proxy**: Intercepts traffic for monitoring/filtering.

## V163 - IoT (Internet of Things)
- **Examples**: Building automation, HVAC controllers, IP video systems, physical access control, scientific/industrial equipment.
- **Four IoT Categories**: Hub/control system (e.g., Amazon Echo), Smart devices (e.g., smart bulb), Wearables (e.g., smartwatch), Sensors.
- **Security Best Practices**:
  1. Understand endpoints (each device brings unique vulnerabilities).
  2. Track & manage (configuration management).
  3. Patch vulnerabilities (or accept residual risk).
  4. Test & evaluate (penetration testing before production).
  5. Change default credentials.
  6. Use encryption protocols.
  7. Segment IoT devices (separate VLAN/subnet).

## V164 - SCADA / ICS (Operational Technology)
- **IT (Information Technology)** : Standard computers, servers, networks.
- **OT (Operational Technology)** : Networks designed to control physical systems (valves, power generation, lights). Prioritizes **availability > integrity > confidentiality**.
- **ICS (Industrial Control System)** : Workflow & process automation via embedded devices (PLCs). Uses Fieldbus to link PLCs. HMI (Human-Machine Interface) for programming/monitoring.
- **SCADA (Supervisory Control and Data Acquisition)** : Type of ICS for large-scale, multi-site, geographically distributed systems (e.g., smart electric meters).

## V165 - BYOD (Bring Your Own Device)
- **BYOD**: Employees use personal devices on company network. Pros: cost saving. Cons: security risks, support challenges, data ownership issues.
- **Storage Segmentation**: Clear separation between personal and company data on a single device (technical or administrative).
- **MDM (Mobile Device Management)** : Centralized software for remote administration. Harder to enforce on BYOD.
- **CYOD (Choose Your Own Device)** : Company offers a few approved models, pays for device. Allows MDM, technical policy enforcement.

## V166 - Zero Trust Architecture
- **Core mantra**: “Trust nothing, verify everything.”
- **Deperimeterization**: Many devices and users operate outside the traditional network boundary (cloud, remote work, mobile).
- **Two Core Planes**:
  - **Control Plane**: Defines, manages, enforces policies (adaptive identity, threat scope reduction, policy-driven access control, secured zones).
  - **Data Plane**: Executes policies, enables data flow.
- **Four Key Components**:
  1. **Subject system**: Entity requesting access.
  2. **Policy engine**: Checks request against predefined policies.
  3. **Policy administrator**: Establishes and manages access policies.
  4. **Policy enforcement point**: Final gatekeeper; grants/denies access.

## V167 - VPNs (Virtual Private Networks)
- **Definition**: Extends a private network across a public network (e.g., internet).
- **Types**:
  - **Site-to-site VPN**: Connects two offices.
  - **Client-to-site VPN**: Connects a single remote user to corporate network.
  - **Clientless VPN**: Uses web browser (HTTPS) without additional software/hardware (SSL/TLS).
- **Traffic Modes**:
  - **Full tunnel**: All traffic routed and encrypted back to HQ (more secure).
  - **Split tunnel**: Traffic to HQ goes via VPN; internet traffic goes directly via local ISP (better performance, less secure).
- **Protocols**: IPSec (modern), L2TP, L2F, PPTP (older, less secure).

## V168 - VPN Connection Demonstration (Windows)
- Shows how to create a VPN connection in Windows (Network & Internet Settings → VPN).
- Demonstrates connecting to a server in the Netherlands to change apparent location.

## V169 - Remote Access Management
- **Telnet (Port 23)** : Text-based, unencrypted (plain text). Obsolete; never use for secure devices.
- **SSH (Port 22)** : Encrypted alternative to Telnet. Preferred for configuring network devices via CLI.
- **RDP (Port 3389)** : Microsoft proprietary, GUI-based. For Windows servers/clients. Not secure by itself; needs VPN or RDG.
- **RDG (Remote Desktop Gateway)** : Windows server role. Secures RDP with SSL/TLS.
- **VNC (Port 5900)** : Cross-platform (Windows, Linux, OS X). Originally for thin clients and VDI.
- **VDI (Virtual Desktop Infrastructure)** : Desktop as a Service (DaaS). Centralized virtual desktops.
- **In-Band Management**: Uses same network being configured (e.g., SSH over LAN).
- **Out-of-Band Management**: Separate management network or direct console connection (more secure).
- **APIs (Application Programming Interfaces)** : Protocols for software-to-software communication (REST, SOAP). Used for automated admin, cloud service integration.
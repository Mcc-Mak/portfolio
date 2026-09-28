# Session 15: Network Attacks

## V133 - Section Outline
- **Importance**: Security is critical to prevent data breaches.
- **Course Objective**: 4.2 – Summarize various types of attacks and their impact to the network.
- **Attack Types Covered**:
  - DoS/DDoS.
  - MAC flooding.
  - ARP spoofing & poisoning.
  - VLAN hopping.
  - DNS attacks (spoofing, poisoning, zone transfer).
  - On-path attacks.
  - Rogue devices & evil twins.
  - Social engineering (phishing, tailgating, etc.).
  - Malware (viruses, worms, Trojans, ransomware, spyware, rootkits).

## V134 - DoS & DDoS Attacks
- **DoS (Denial of Service)**: One machine floods a victim with requests.
  - **TCP SYN Flood**: Exploits TCP three-way handshake; sends SYNs but never completes → half-open connections → resource exhaustion.
  - **ICMP Flood (Smurf Attack)**: Sends ping to subnet broadcast address with spoofed source IP = victim’s IP → all devices on subnet reply to victim.
- **DDoS (Distributed Denial of Service)**: Multiple machines (100 to 100,000+) attack one server.
  - **Botnet**: Collection of compromised computers (zombies) under a C2 (Command & Control) server.

## V135 - MAC Flooding
- **Definition**: Overflows a switch’s MAC address table with fake MAC addresses. Switch enters fail-safe mode and behaves like a hub (broadcasts to all ports).
- **Attacker Motivations**: Data snooping (capture sensitive data), disruption of services (DoS), bypassing security measures (MAC filtering).
- **Prevention**: Port security (limit MACs per port), anomaly-based IDS, VLAN segmentation.

## V136 - ARP Attacks (Spoofing & Poisoning)
- **ARP Spoofing**: Attacker sends falsified ARP messages to link their MAC address with a legitimate IP address (targeted attack).
- **ARP Poisoning**: Corrupts the ARP cache by sending malicious ARP packets to the default gateway, associating attacker’s MAC with multiple IPs (large-scale).
- **Consequences**: Data interception, on-path attacks, network disruptions (DoS).
- **Prevention**: Static ARP entries (small networks), Dynamic ARP Inspection (DAI), network segmentation (VLANs), VPNs/encryption.

## V137 - VLAN Hopping
- **Definition**: Exploits misconfigurations to send traffic to a different VLAN without authorization.
- **Techniques**:
  - **Double Tagging**: Attacker sends frame with two 802.1Q tags (outer tag = native VLAN, inner tag = target VLAN). One-way attack.
  - **Switch Spoofing**: Attacker uses DTP to negotiate a trunk port → gains access to all VLANs.
  - **MAC Table Overflow**: Overload CAM table → switch fails open and acts like a hub.
- **Mitigations**: Change default native VLAN, disable DTP, limit MAC addresses per port.

## V138 - DNS Attacks
- **DNS Cache Poisoning (DNS Spoofing)** : Corrupts DNS resolver cache with false info. Mitigation: DNSSEC.
- **DNS Amplification Attack**: Exploits DNS resolution to overwhelm target with response traffic (DoS). Mitigation: rate-limit DNS responses.
- **DNS Tunneling**: Encapsulates non-DNS traffic over port 53 to bypass firewalls (data exfiltration). Mitigation: monitor DNS logs for unusual patterns.
- **Domain Hijacking (Domain Theft)** : Changes domain registration without permission. Mitigation: domain registry lock services.
- **DNS Zone Transfer Attack**: Attacker requests full DNS zone data (reconnaissance). Mitigation: restrict zone transfers to authorized systems.

## V139 - On-Path Attacks (Man-in-the-Middle)
- **Definition**: Attacker places themselves logically between two hosts to capture, modify, and relay communications.
- **Methods**: ARP poisoning, DNS poisoning, rogue WAP, rogue hub/switch.
- **Replay Attack**: Captures valid data and repeats it (e.g., authentication handshake).
- **Relay Attack**: Attacker becomes a proxy between two hosts, can read/modify communications.
- **Bypassing Encryption**: SSL stripping (downgrade HTTPS to HTTP), Downgrade attack (force lower security mode).

## V140 - Rogue Devices
- **Definition**: Any unauthorized device or service on a corporate/private network (e.g., rogue WAP, rogue DHCP server, personal laptop, unauthorized software, virtual machines, smart appliances).
- **Detection Methods**: Visual inspection, network mapping (Nmap), wireless monitoring, packet sniffing, NAC & intrusion detection.
- **Mitigation**: Digital certificates, port security, DHCP snooping.

## V141 - Social Engineering Attacks
- **Definition**: Manipulating users to reveal confidential info or perform harmful actions.
- **Types**:
  - **Phishing**: Broad, untargeted (mass email).
  - **Spear Phishing**: Targeted at specific individuals/groups.
  - **Whaling**: Targets executives (CEO, CFO, etc.).
  - **Tailgating**: Following an authorized person into a secure area without their knowledge/consent.
  - **Piggybacking**: Similar to tailgating, but with the employee’s knowledge/consent.
  - **Shoulder Surfing**: Direct visual observation to obtain authentication info.
  - **Eavesdropping**: Listening to conversations to obtain confidential information.
  - **Dumpster Diving**: Searching garbage/recycling for personal or confidential information.

## V142 - Phishing Campaign Demonstration (Phish Insight)
- Shows how to create a simulated phishing campaign using Trend Micro’s Phish Insight to test users.
- Demonstrates a realistic LinkedIn phishing email and how to train users to spot red flags (e.g., hover over link to see actual URL).

## V143 - Malware Types
- **Virus**: Malicious code that requires user action (e.g., opening an infected file) to replicate and spread.
- **Worm**: Self-replicates without any user interaction (e.g., Nimda, Conficker).
- **Trojan Horse**: Disguised as harmless software; performs malicious function in background (e.g., RAT – Remote Access Trojan).
- **Ransomware**: Restricts access to system/files until ransom is paid (e.g., Samsam).
- **Spyware**: Gathers user information without consent (e.g., key logger, adware).
- **Rootkit**: Gains administrator/root-level control without detection. Loads before OS. Common in firmware.

## V144 - Malware Demonstration (Virus Maker & ProRat)
- Demonstrates creating a simple nuisance virus (Crazy Mouse) using JPS Virus Maker.
- Demonstrates creating a Remote Access Trojan (RAT) using ProRat, binding it with a legitimate image, and gaining full remote control over a victim Windows 7 machine.
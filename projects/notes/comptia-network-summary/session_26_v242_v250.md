# Session 26: Troubleshooting Network Services

## V242 - Section Outline
- **Focus**: Troubleshoot common network service issues.
- **Course Objective**: 5.3 – Given a scenario, troubleshoot common issues with network services.
- **Topics Covered**:
  - Duplicate addresses (MAC, IP).
  - DHCP issues (rogue DHCP server, scope exhaustion).
  - Routing issues (multicast flooding, asymmetrical routing, missing routes).
  - Switching & routing loops (STP, split-horizon, route poisoning, hold-down timers).
  - Firewall issues (ACL misconfigurations, order).
  - IP configuration issues (incorrect subnet mask, gateway, DNS).
  - VLAN issues (improper routing, default VLAN).
  - DNS & NTP issues.

## V243 - Duplicate Addresses
- **Duplicate MAC Addresses**: Causes: manufacturing error, MAC spoofing (locally-administered address). Symptoms: intermittent connectivity, CAM table flapping. Detection: `show arp` command, Wireshark. Prevention: port security.
- **Duplicate IP Addresses (IP Address Conflict)** : Causes: static IP assignment errors, DHCP server misconfiguration, rogue DHCP server. Detection: `show arp` command. Resolution: change client to DHCP, or correct static assignment.

## V244 - DHCP Issues
- **Rogue DHCP Server**: DHCP server not under administrative control. Can cause duplicate IPs or redirect clients to attacker-controlled sites. Prevention: DHCP snooping, port security, IDS.
- **DHCP Scope Exhaustion**: DHCP server runs out of available IP addresses. Solutions: reduce lease time, increase scope size (e.g., /22 instead of /24), decrease devices using DHCP (port security, NAC).

## V245 - Routing Issues
- **Multicast Flooding**: Occurs when no specific host is associated with multicast MAC address in CAM table. Solution: configure switch to block unknown multicast packets.
- **Asymmetrical Routing**: Packets leave via one path and return via a different path. Problem for stateful firewalls (can’t see entire flow). Solution: place firewalls closer to protected systems.
- **Missing Routes**: Router cannot reach destination because route is absent. Causes: typos in static routes, dynamic routing protocols not establishing neighbor states. Troubleshooting: `show ip route` (router), `route print` (Windows). Resolution: statically add route or troubleshoot dynamic routing protocols.

## V246 - Switching & Routing Loops
- **Switching Loops**: Caused by multiple paths between switches → broadcast storms. Prevention: enable STP (Spanning Tree Protocol). `show spanning tree` to verify.
- **Routing Loops**: Caused by incorrect routing algorithm operation or misconfigurations. Prevention mechanisms: TTL, split-horizon, route poisoning, hold-down timers. Warning: static routes override dynamically learned routes; careless addition of static routes is a main cause.

## V247 - Firewall Issues (ACLs)
- **Firewall Types**: Host-based (software on individual device), Network-based (hardware/software inline near border).
- **ACL (Access Control List)** : Collection of permit/deny rules. Processed **top to bottom**.
- **Common Misconfigurations**: Typos, wrong protocol/port numbers, incorrect source/destination addresses, wrong rule order (generic before specific).
- **Example**: `deny ip any any` before `permit tcp any host 8.8.8.8 eq 80` → traffic blocked. Fix: move specific permits to top, generic denies to bottom.

## V248 - IP Configuration Issues
- **Four key pieces of IP information**: IP address, subnet mask, default gateway, DNS server IP.
- **Troubleshooting examples**:
  - Wrong default gateway: IP `192.168.1.200/24`, gateway `10.0.1.1` → gateway not in same subnet. Fix: change gateway or IP.
  - IP outside gateway’s subnet: IP `192.168.1.200/25`, gateway `192.168.1.1` → client in `192.168.1.128/25`, gateway in `192.168.1.0/25`. Fix: change IP or gateway.
- **DNS issues**: If can’t reach websites by domain name but can ping IPs, check DNS server IP. Use public DNS (8.8.8.8, 8.8.4.4) if no internal DNS.

## V249 - VLAN Issues
- **VLANs require routing** to communicate with each other. If devices in different VLANs can’t communicate, check routing between VLANs.
- **Default VLAN (VLAN 1)** : If all traffic in VLAN 1, large single broadcast domain → performance issues. Solution: move servers to dedicated server VLAN, separate from client VLANs.

## V250 - DNS & NTP Issues
- **DNS Troubleshooting**:
  - Single client: check TCP/IP settings, flush DNS cache, change DNS server.
  - Widespread: check A records (correct domain name & IP), CNAME records (correct spelling), TTL (too high causes stale caches). Use `nslookup` to verify.
- **NTP Troubleshooting**:
  - Packets not received: check physical connectivity, Layer 2 (MAC), Layer 3 (IP), DNS (if using domain name).
  - Packets received but not processed: verify NTP service is running.
  - Packet errors/loss: causes loss of synchronization. Ensure no network saturation.
# Session 23: Troubleshooting Tools

## V214 - Section Outline
- **Focus**: Use the appropriate tool or protocol to solve networking issues.
- **Course Objective**: 5.5 – Given a scenario, use the appropriate tool or protocol.
- **Tools Covered**:
  - Hardware tools (crimpers, strippers, toner probes, punch down tools, TDR, OTDR, etc.).
  - Software tools (packet capture, speed test, protocol analyzers).
  - Command-line tools (ipconfig/ifconfig/ip, ping/traceroute, nslookup/dig, arp, netstat, tcpdump, nmap).
  - Network device commands (show interface, show config, show route, show mac address-table, show arp, show vlan, show power).
  - Discovery protocols (LLDP, CDP).

## V215 - Hardware Tools
- **Snips / Cutters**: Cut cables from a spool.
- **Cable Strippers**: Remove outer jacket to expose inner wires.
- **Cable Crimpers**: Attach connectors (RJ45/RJ11 for twisted pair; RG6/RG59 for coax).
- **Cable Tester**: Verifies continuity of all 8 wires; checks for breaks and correct pinouts.
- **Wire Mapping Tool**: Diagnoses specific twisted pair faults (open pair, shorted pair, reverse pair, split pair, etc.).
- **Cable Certifier**: Determines cable category (Cat5/6/7/8), throughput, length, delay, resistance.
- **Multimeter**: Measures voltage, amperage, resistance; tests power outlets.
- **Punch Down Tool**: Terminates wires on 66/110 blocks or wall jacks.
- **Tone Generator (Toner Probe)** : Traces unlabeled cables in walls.
- **Loopback Adapter**: Connects transmit to receive pins for testing ports.
- **TDR (Time-Domain Reflectometer)** : Locates breaks in **copper** cables.
- **OTDR (Optical TDR)** : Same function for **fiber optic** cables.
- **Fiber Light Meter (Optical Power Meter)** : Measures attenuation (loss in dB).
- **Fusion Splicer**: Permanently joins two fiber ends (for long buried runs).
- **TAP**: Inline device that copies packets for analysis.
- **Spectrum Analyzer**: Measures signal amplitude vs. frequency.

## V216 - Software Tools
- **Wi-Fi Analyzers**: Conduct wireless surveys, avoid channel overlap, display SSID, signal strength.
- **Protocol Analyzers & Packet Capture** (e.g., Wireshark): Captures/analyzes signals and traffic.
- **Bandwidth Speed Test (Throughput Test)** : Measures real-world throughput (e.g., speedtest.net for internet, LAN Speed Test for local).
- **Port Scanners** (e.g., Nmap): Determines which ports are open/listening.
- **NetFlow Analyzers**: Monitors traffic flow data; identifies applications/types consuming bandwidth.
- **IP Scanners** (e.g., Nmap, Angry IP Scanner): Detects IP addresses and device info on a network.

## V217 - ipconfig, ifconfig, ip
- **ipconfig (Windows)** : Displays TCP/IP settings. `/all` for details. `/release` & `/renew` for DHCP.
- **ifconfig (Unix/Linux/macOS – deprecated)** : Displays interface configuration. `down`/`up` to disable/enable.
- **ip command (Unix/Linux/macOS – modern replacement)** : `ip a` (show addresses), `ip link set ... up/down` (enable/disable), `ip link set ... promisc on` (promiscuous mode).

## V218 - ping & traceroute
- **ping**: Checks connectivity. Windows default: 4 pings; Linux/macOS default: continuous.
- **traceroute (tracert on Windows)** : Displays path between source and destination (every hop). Uses TTL to map routers.
- **Troubleshooting with ping**: Step-by-step process (google.com → 8.8.8.8 → default gateway → local IP → 127.0.0.1).

## V219 - nslookup, dig, hostname
- **nslookup**: Query DNS for mapping between domain names and IP addresses. Interactive mode allows changing query type (e.g., `set q=mx` for mail records).
- **dig**: Similar to nslookup (non-interactive). Linux/macOS by default. `dig -t mx diontraining.com`.
- **hostname**: Displays the hostname portion of the system’s full computer name.

## V220 - arp
- **arp**: Display/modify ARP cache (IP → MAC mappings).
- **Commands**: `arp -a` (view cache), `arp -d <IP>` (delete mapping), `arp -s <IP> <MAC>` (static mapping).
- **Static ARP entries**: Useful for pre-configuring devices or preventing timeout.

## V221 - netstat
- **netstat**: Display network statistics (current sessions, source/destination IPs, ports).
- **Common options**: `-a` (all sockets), `-n` (IP numbers, no resolution), `-o` (adds PID), `-s` (statistics per protocol).
- **Use case**: Correlate PID with Tasklist to identify which application owns a connection.

## V222 - tcpdump
- **tcpdump**: Command-line packet analyzer. Default on Linux/macOS.
- **Basic usage**: `sudo tcpdump -i eth0` (capture live). `-w` (write to PCAP file). `-r` (read from PCAP file). `-x` (show packet contents in hex + ASCII).
- **Filtering**: `src`, `dst`, `port`, etc.

## V223 - nmap
- **nmap (Network Mapper)** : Discovers hosts and services. Features: host discovery, port scanning, OS detection, service fingerprinting.
- **Common scans**: `-sn` (ping scan), `-sS` (SYN scan), `-sV` (service version), `-O` (OS detection).

## V224 - Network Device Commands (show interface, show config, show route)
- **show interface**: Displays statistics for a network interface (up/down, errors, collisions, MTU, bandwidth).
- **show config**: Displays current system configuration.
- **show route (show ip route)** : Displays routing table (routes, metrics, next hops, administrative distance).

## V225 - More Network Device Commands (show mac address-table, show arp, show vlan, show power)
- **show mac address-table**: Displays MAC address table (mapping of MAC addresses to ports).
- **show arp**: Displays ARP table (IP to MAC mappings).
- **show vlan**: Displays VLAN settings (VLAN number, name, status, ports).
- **show power**: Displays PoE (Power over Ethernet) settings per port (power allocated, used, available).

## V226 - Discovery Protocols (LLDP, CDP)
- **LLDP (Link Layer Discovery Protocol)** : Open standard (IEEE 802.1ab). Allows multi-vendor devices to advertise and discover each other.
- **CDP (Cisco Discovery Protocol)** : Proprietary (Cisco). Provides more detailed information (model numbers, power consumption). Use in Cisco-only networks.
- **Security risk**: LLDP/CDP info on unsecured ports gives attackers a network roadmap. Implement with security in mind.
# Session 18: Network Monitoring

## V170 - Section Outline
- **Purpose**: Continuously observe and analyze real-time network performance. Detect bottlenecks, outages, unauthorized access.
- **Course Objectives**: 1.2 (compare/contrast appliances), 3.2 (use network monitoring technologies).
- **Topics Covered**:
  - IDS/IPS.
  - SNMP (Simple Network Management Protocol).
  - Network sensors.
  - Packet captures.
  - Network flow data.
  - Log aggregation.
  - SIEM (Security Information and Event Management).
  - Network performance metrics (latency, bandwidth, jitter).
  - Interface statistics.

## V171 - IDS & IPS
- **IDS (Intrusion Detection System)** : Passive. Monitors traffic, logs, alerts admin. Does **not** respond.
- **IPS (Intrusion Prevention System)** : Active. Operates in-line; can drop/block offending traffic.
- **Detection Methods**:
  - **Signature-based**: Matches known byte patterns (like antivirus).
  - **Policy-based**: Enforces security policy (e.g., block Telnet).
  - **Anomaly-based**: Builds baseline, flags deviations (statistical or non-statistical).
- **Host-based vs. Network-based**: Host-based protects one device; network-based protects the entire network.

## V172 - SNMP (Simple Network Management Protocol)
- **Purpose**: Collects/organizes info about managed devices (routers, switches, printers, servers).
- **Components**:
  - **SNMP Manager**: Centralized network management station (server).
  - **Agents**: Background services on devices that send data to the manager.
- **Message Types**: Set (change value), Get (retrieve value), Trap (asynchronous notification).
- **Versions**:
  - **v1 & v2**: Use plain-text community strings (`public` = read-only, `private` = read-write). High security risk.
  - **v3**: Adds integrity (hashing), authentication, confidentiality (encryption).

## V173 - Network Sensors (Temperature, CPU, Memory)
- **Temperature**: Monitors chassis temperature. Minor/major thresholds. Load shedding if major threshold exceeded.
- **CPU Usage**: Normal range 5–40%. High utilization indicates misconfiguration or attack.
- **Memory Utilization**: Normal baseline ~40%. Sustained >80% indicates need for upgrade or possible attack.

## V174 - Packet Captures (PCAPs)
- **Purpose**: Captures all data to/from a network device (via SPAN port or directly).
- **Attack Patterns in PCAPs**:
  - **Port Scan**: Single source → single destination; sequential destination ports (80,23,22,21,443…).
  - **SYN Flood (DoS)** : Single source → single destination; many SYNs, no acknowledgements.
  - **Distributed SYN Flood (DDoS)** : Multiple sources → same destination.

## V175 - NetFlow & Flow Analysis
- **NetFlow**: Cisco-developed; defines flows by shared packet characteristics (same src/dst IP, ports, protocol). Became IPFIX standard.
- **Flow Analysis**: Records metadata (source, destination, volume, path) instead of entire packets. Saves storage.
- **Tools**: NetFlow, Zeek (hybrid – logs full packets for “interesting” traffic), MRTG (graphs traffic flows via SNMP).

## V176 - Log Aggregation & Syslog
- **Syslog**: Protocol to send logs to a centralized server (UDP port 514).
- **Severity Levels** (0 = most severe, 7 = least severe):
  - 0 – Emergency
  - 1 – Alert
  - 2 – Critical
  - 3 – Error
  - 4 – Warning
  - 5 – Notice
  - 6 – Informational
  - 7 – Debugging
- **Windows Logs**: Application log (software events), Security log (login attempts), System log (OS events).

## V177 - SIEM (Security Information and Event Management)
- **Definition**: Security solution providing real-time analysis of security alerts from network hardware and applications.
- **Five Essential Functions**:
  1. **Log Collection** (via Syslog).
  2. **Normalization** (maps logs from different systems to a common data model).
  3. **Correlation** (links logs/events from different systems).
  4. **Aggregation** (reduces volume by consolidating duplicates).
  5. **Reporting** (dashboards, long-term summaries).

## V178 - SIEM Configuration (Security Onion Demo)
- Demonstrates setting up a SIEM (Security Onion), installing Beats agents on Windows hosts, configuring IIS logging, installing OSSEC (HIDS), and configuring syslog sources.

## V179 - Network Performance Metrics
- **Latency**: Time for data to reach destination (measured as round trip time in milliseconds).
- **Bandwidth vs. Throughput**:
  - **Bandwidth**: Theoretical maximum.
  - **Throughput**: Actual successful data transfer rate.
- **Jitter**: Variation in packet delay over time. Major problem for real-time applications (VoIP, video conferencing).

## V180 - Interface Statistics
- **Link State**: `up/up` = physical connection + protocol operational.
- **Key counters**:
  - **CRC errors**: Failed checksum → packet rejected.
  - **Runts**: Frames <64 bytes.
  - **Giants**: Frames >1518 bytes.
  - **Collisions**: Should be 0 for full duplex.
  - **Late collisions**: Occur after transmission starts.
- **Troubleshooting**: Half duplex → slowdown; high CRC errors → dirty fiber / EMI; collisions in full duplex → two devices on same switch port.
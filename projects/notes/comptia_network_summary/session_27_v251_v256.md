# Session 27: Troubleshooting Performance Issues

## V251 - Section Outline
- **Focus**: Troubleshoot common performance issues.
- **Course Objective**: 5.4 – Troubleshoot common performance issues.
- **Topics Covered**:
  - Collision & broadcast storms.
  - VoIP issues (latency, jitter).
  - Packet loss.
  - Network performance issues (high CPU/bandwidth utilization, poor physical connectivity, DNS problems).
  - Low optical link budgets.
  - Certificate issues.
  - License feature issues.
  - BYOD challenges.
  - Hardware failures.

## V252 - Collisions & Broadcast Storms
- **Collisions**: Detected via `show interface` counters (collision, deferred, late, excessive). Prevention: use switches (each port = own collision domain). If excessive collisions, turn off auto-negotiation, hardcode lower speed, change to half-duplex.
- **Broadcast Storms**: Caused by too large broadcast domain, high volume of DHCP requests, loops in switching environment. Identification: packet counters spike, packet loss rises, packet analyzer shows rapid repeated broadcast packets. Prevention: subnet + route, enable BPDUs, limit MAC addresses per port.

## V253 - VoIP Issues (Latency, Jitter)
- **Latency**: Time for signal to reach client. Good: <50–100 ms. High latency causes echoes, delays. Solutions: increase overall network performance, implement QoS to prioritize VoIP traffic.
- **Jitter**: Variation in packet arrival times. Impact begins ~30–50 ms. Causes robotic static, words/packets out of order. Solutions: same as latency – increase performance, implement QoS.

## V254 - Packet Loss
- **Definition**: Data packets fail to reach destination.
- **Causes**: Network congestion, faulty router configuration, bad cables, hardware failures.
- **Troubleshooting**: `ping` and `traceroute` to identify where packets are dropping. Network monitoring tools for comprehensive insights.
- **Mitigation**: Increase bandwidth, optimize network layout, improve QoS, replace faulty cables, update firmware, verify configuration settings.

## V255 - Network Performance Issues (CPU, Bandwidth, Physical, DNS)
- **High CPU Usage**: Upgrade devices or simplify processing load (e.g., reduce ACL rules).
- **High Bandwidth Usage**: Increase bandwidth or perform network flow analysis to identify traffic types (e.g., limit non-work traffic).
- **Poor Physical Connectivity**: Test cables (cable tester for twisted pair, light meter for fiber). Test from demarcation point to isolate ISP vs. internal issues.
- **Malfunctioning Network**: Use seven-step troubleshooting method to locate problematic device.
- **DNS Problems**: High DNS latency slows user experience. Diagnose and reduce DNS resolution time.

## V256 - Other Performance Issues
- **Low Optical Link Budget**: Calculate total loss (distance, connectors, splices). If receiver power is too low, increase transmitter power or improve splicing.
- **Certificate Issues**: Untrusted certificate (not signed by trusted CA, expired, no trusted root). Solution: purchase/renew/install valid certificate.
- **License Feature Issues**: “Feature not licensed” error. Determine which license is loaded; procure correct license if needed.
- **BYOD Challenges**: Supporting many device types increases OpEx. Security/access questions: wired or wireless? Pre-registration? Separate VLAN?
- **Hardware Failures**: Pinpoint device → pinpoint component. Field-replaceable components (power supplies, interface cards). For catastrophic failure, replace entire device, load backup config.
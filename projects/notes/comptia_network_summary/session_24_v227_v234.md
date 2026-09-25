# Session 24: Troubleshooting Physical Networks

## V227 - Section Outline
- **Focus**: Troubleshoot common cabling and physical interface issues.
- **Course Objective**: 5.2 – Given a scenario, troubleshoot common cabling and physical interface issues.
- **Topics Covered**:
  - Network cable limitations (length, type, quality).
  - Cable signal issues (attenuation, interference, decibel loss).
  - Copper cable issues (incorrect pinouts, bad ports, opens, shorts).
  - Fiber cable issues (incorrect transceivers, TX/RX reversed, dirty connectors).
  - Ethernet issues (duplex mismatch, LED status indicators).
  - Interface issues (CRC errors, runts, giants, drops, port statuses).
  - PoE issues (power budget exceeded, incorrect standard).

## V228 - Cable Specifications & Limitations (Review)
- **Twisted Pair Copper**:
  - CAT 5: 100 Mbps @ 100 m
  - CAT 5e: 1 Gbps @ 100 m
  - CAT 6: 1 Gbps @ 100 m or 10 Gbps @ 55 m
  - CAT 6a / CAT 7: 10 Gbps @ 100 m
  - CAT 8: 40 Gbps @ 30 m
- **Coaxial**: Up to 100 Mbps @ 500 m
- **Twinaxial**: Up to 10 Gbps @ 5 m (older); up to 100 Gbps @ 7 m (newer)
- **Fiber**:
  - 100BASE-FX (MM): 100 Mbps @ 2 km
  - 1000BASE-SX (MM): 1 Gbps @ 220–500+ m
  - 1000BASE-LX (SM): 1 Gbps @ 5 km
  - 10GBASE-SR (MM): 10 Gbps @ 400 m
  - 10GBASE-LR (SM): 10 Gbps @ 10 km
- **Plenum vs. Riser**: Plenum (fire-retardant, for air-handling spaces) can be used in plenum or riser; Riser (self-extinguishing) cannot be used in plenum spaces.
- **Cable Applications**: Rollover/console cable (out-of-band config), Crossover cable (direct device-to-device), PoE (power + data).

## V229 - Cable Signaling Issues
- **Attenuation**: Loss of signal strength over distance.
  - Copper: max distance ~100m (twisted pair), ~500m (coaxial). Solutions: use proper cable, shorten distance, use repeater.
  - Fiber: much longer distances, but dirty connectors cause attenuation. Clean/polish connectors.
- **Interference**: Occurs when multiple cables operate in same frequency band in close proximity. Prevention: higher category cables (more twists per inch), avoid running near high-power cables.
- **Decibel (dB) Loss**: Measurement of signal deterioration. Copper: voltage decrease; Fiber: light loss. Solutions: higher quality cable, clean/polish connectors.

## V230 - Copper Cable Issues
- **Incorrect Pinouts**: Check patch panel, wall jack (keystone), RJ45 connector. Use TIA-568-B standard. Test with cable tester / wire mapping tool.
- **Bad Ports**: Test with loopback plug. Replace NIC, move cable to another port, or replace interface card.
- **Opens & Shorts**: Open = break in wire. Short = two wires touching. Test with cable tester. Fix by rewiring RJ45 or replacing cable.

## V231 - Fiber Cable Issues
- **Incorrect Transceivers**: Using wrong SFP model (e.g., longwave SFP + shortwave fiber). Verify correct model.
- **TX/RX Reversed**: Swap the TX and RX cables. Check NIC LED – solid/blinking orange indicates link online.
- **Dirty Optical Cables & Connectors**: Clean with dry cleaning (dust) or wet cleaning (91%+ isopropanol alcohol for oils/fingerprints). Use fiber light meter to compare dB reading to baseline.

## V232 - Ethernet Issues (LED Indicators, Duplex Mismatch)
- **LED Status Indicators**:
  - Activity Light: Off (no link), Solid orange (link established), Blinking orange (data activity).
  - Link Speed Light: Green (1 Gbps), Orange (100 Mbps), Off (10 Mbps).
- **Duplex Mismatch**: One side thinks full duplex, the other half duplex. Symptoms: high packet loss without high jitter, high receive error rate, runts. Prevention: use auto-negotiation on both devices; if fails, manually configure both ends identically.

## V233 - Interface Issues
- **CRC Errors**: Checksum mismatch → data corruption. Indicates noise, interference, cable damage, hardware fault.
- **Runts**: Frames smaller than minimum size. Caused by collisions, NIC malfunction, oversized collision domain.
- **Giants**: Frames larger than maximum size. Caused by misconfiguration, device malfunction.
- **Drops**: Buffer full → incoming frames discarded. Caused by high traffic, device overload, bandwidth bottlenecks.
- **Port Statuses**:
  - **Error Disabled**: Switch port automatically shut down due to error/policy violation (e.g., BPDU guard violation). Requires manual intervention.
  - **Administratively Down**: Port intentionally disabled by admin. Use `no shutdown` command (Cisco) to re-enable.
  - **Suspended**: Port disabled due to protocol/policy violation (e.g., EtherChannel misconfiguration). Resolve underlying configuration issue.

## V234 - PoE Issues
- **PoE (802.3af)** : Up to 15.4 W DC (12.95 W guaranteed at device).
- **PoE+ (802.3at)** : Up to 30 W DC (25.5 W guaranteed at device).
- **Power Budget Exceeded**: Total power demand exceeds switch’s power budget. Symptoms: devices restart randomly, refuse to power on, behave erratically. Solutions: remove non-essential devices, upgrade PoE source (switch).
- **Incorrect Standard Error**: PoE+ device connected to PoE-only switch. Solutions: replace switch with PoE+ model, or use a PoE+ injector.
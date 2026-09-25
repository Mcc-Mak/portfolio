# Session 5: Media and Cabling

## V34 - Section Outline
- **Media** in networking = physical material for data transmission (copper, fiber, radio frequency).
- **Course Alignment**:
  - Primary: Domain 1 (Networking Concepts) – Objective 1.5 (Compare/contrast transmission media and transceivers).
  - Secondary: Domain 5 (Network Troubleshooting) – Objective 5.5 (Use appropriate tool/protocol to solve issues).
- **Topics Covered**:
  - Copper media (types, bandwidth, distance limitations).
  - Copper connectors (RJ45, RJ11, F-Type, BNC).
  - Creating a copper patch cable (tools: stripper, crimper, tester).
  - Fiber media (single-mode vs. multi-mode).
  - Fiber connectors (SC, ST, LC, MTRJ, MTP).
  - Transceivers (combine transmission & receiving; connect different media types).

## V35 - Copper Media Characteristics
- **IEEE 802.3 Standard**: Defines physical layer and MAC for wired Ethernet networks.
- **Main Copper Cable Types**:
  - **Twisted Pair** (UTP vs. STP): UTP is lightweight, flexible, cheap; STP has extra shielding for high-EMI environments.
  - **Coaxial** (RG-6, RG-59): Single copper core + insulating layer + conductive shield.
  - **Direct Attach Copper (DAC)**: Fixed assembly for intra-rack connections. Speeds up to 100 Gbps.
  - **Twinaxial**: Two insulated copper conductors in one shield. Used for SFP+/QSFP direct attach.
- **Category (CAT) Standards**:
  - CAT 5: 100 Mbps @ 100 m
  - CAT 5e: 1 Gbps @ 100 m
  - CAT 6: 1 Gbps @ 100 m or 10 Gbps @ 55 m
  - CAT 6a: 10 Gbps @ 100 m
  - CAT 7: 10 Gbps @ 100 m
  - CAT 8: 25–40 Gbps @ 30 m
- **Plenum vs. Non-Plenum**:
  - **Plenum**: Fire-retardant jacket, required in air-circulating spaces (HVAC plenums). More expensive.
  - **Non-Plenum**: Standard jacket, for non-air-return spaces (walls, conduit). Cheaper.

## V36 - Copper Network Connections (Connectors)
- **RJ-11** (6P2C): Standard for telephone wiring. Not suitable for high-speed data.
- **RJ-45** (8P8C): Standard for Ethernet data networks. Used with Cat 5 through Cat 8 cables.
- **F-Type Connector**: Screw-on connector for coaxial cables (RG-6, RG-59). Standard for cable TV, satellite, cable internet.
- **BNC Connector** (Bayonet Neill-Concealment): Push-and-twist locking mechanism. Used for professional video, radio frequency applications.

## V37 - Wiring & Pinouts (Straight-through vs. Crossover)
- **Straight-through (Patch cable)**: Same pinout on both ends (568B on both sides). Used for DTE ↔ DCE (e.g., computer to switch).
- **Crossover cable**: 568B on one end, 568A on the other (swaps pins 1,2,3,6). Used for DTE ↔ DTE or DCE ↔ DCE (e.g., switch to switch).
- **DTE (Data Terminal Equipment)**: Endpoint devices (laptops, desktops, servers, routers).
- **DCE (Data Communications Equipment)**: Switches, modems, hubs, bridges.
- **MDIX (Medium Dependent Interface Crossover)**: Auto-sensing in modern switches; allows straight-through cable for like devices. For the exam, assume **no MDIX** unless stated.
- **Tools**: Cable stripper, crimper, cable tester.

## V38 - Fiber Media
- **Advantages over Copper**: Immunity to EMI, much longer distances, higher speeds.
- **Drawbacks**: Higher cost, more complex to install and repair.
- **Two Main Types**:
  - **Single-Mode Fiber (SMF)**: Small core (8.3–10 microns). Light travels a single path → long distances (tens/hundreds of miles). Sheath color: Yellow.
  - **Multi-Mode Fiber (MMF)**: Larger core (50–100 microns). Light travels multiple paths → shorter distances (up to ~2000m). Sheath color: Aqua blue or orange.

## V39 - Fiber Network Connections (Connectors & Polishes)
- **Connectors**:
  - **SC (Subscriber Connector)**: Square, push-pull (“stick & click”). Common in FTTH.
  - **LC (Lucent Connector)**: Compact, push-pull, often paired (“love connector”). Used in high-density areas (data centers).
  - **ST (Straight Tip)**: Round, twist-lock (“stick & twist”). Common with multi-mode fiber.
  - **MTRJ (Mechanical Transfer Register Jack)**: Rectangular, houses both Tx/Rx, RJ-style latch.
  - **MPO (Multi-fiber Push On)**: 12+ fibers per connector. Used for data center backbone.
- **Polishing Styles (Back Reflection Control)**:
  - **PC (Physical Contact)**: Slight curvature; least reduction in back reflection.
  - **UPC (Ultra Physical Contact)**: Dome-shaped; better than PC.
  - **APC (Angled Physical Contact)**: 8° angle; lowest reduction (best for long-haul).

## V40 - Transceivers
- **Definition**: A device that can both transmit and receive data. Linguistic blend of *transmitter* and *receiver*.
- **Key Functions**: Protocol conversion (e.g., Ethernet ↔ Fiber Channel), Media conversion (e.g., copper ↔ fiber), bridging different network infrastructures. Layer 1 devices.
- **Common Form Factors** (hot-pluggable):
  - SFP (Small Form-factor Pluggable): up to 4.25 Gbps
  - SFP+: up to 16 Gbps
  - QSFP (Quad SFP): ~4 Gbps
  - QSFP+: ~40 Gbps
  - QSFP28: ~100 Gbps
  - QSFP56: ~200 Gbps
- **Exam Note**: QSFP modules are faster than SFP modules. Transceivers change physical signal format for distance or protocol conversion.
# Session 14: Physical Security

## Overview
This session covers the design and implementation of physical security controls, including site and facility design, infrastructure security, fire prevention/detection/suppression, and physical access controls. It consists of 7 videos (V101–V107).

---

## Video V101 (Outline): Physical Security (Section Intro)

**Objective:** To introduce the key topics in physical security for the CISSP exam.

### Topics Covered in this Session
1.  Site Design Principles (CPTED, Critical Path Analysis)
2.  Facility Design Principles (Deter, Deny, Detect, Delay)
3.  Facility Security Controls (Wiring Closets, Server Rooms, Data Centers)
4.  Facility Infrastructure Security (HVAC, Power, UPS Types)
5.  Fire Prevention, Detection, and Suppression (Classes, Extinguishers, Systems)
6.  Physical Security Controls (Intrusion Detection, Alarms, CCTV)

---

## Video V102: Site Design Principles (CPTED, Critical Path Analysis)

**Objective:** To explain site selection and design principles for physical security.

### I. Core Concept
- **Defense in Depth:** Administrative, technical, and physical controls for physical security.

### II. Critical Path Analysis
- Examine relationships between critical assets and supporting dependencies (electricity, environmental controls, water, waste).

### III. Site Selection Criteria

| Factor | Considerations |
| :--- | :--- |
| **Crime** | Proximity to high-crime areas |
| **Natural Disasters** | Earthquakes, floods, tornadoes, fires |
| **Emergency Services** | Response times for fire, medical, law enforcement |
| **Infrastructure** | Access to power, gas, water, telecommunications |

### IV. CPTED (Crime Prevention Through Environmental Design)
- **Principle:** Using the physical environment to influence human behavior and deter crime.
- **Implementation:**
    - **Natural Access Control:** Terrain, trees, single entry points
    - **Natural Surveillance:** Elevated positions, cleared sightlines, camera angles
    - **Perimeter Controls:** Patrol routes, open areas

---

## Video V103: Facility Design Principles (Deter, Deny, Detect, Delay)

**Objective:** To explain the five core functions of physical security controls.

### I. The Five Control Functions

| Function | Purpose | Examples |
| :--- | :--- | :--- |
| **Deter** | Discourage violations | Fencing (3-4 ft casual, 6-7 ft most, 8+ ft with barbed wire), lighting (2 foot candles), signs, guards, dogs |
| **Deny** | Prevent access | Turnstiles, mantraps, access control systems |
| **Detect** | Identify violations | Cameras (fixed, PTZ), sensors (infrared, wave pattern, heat, photoelectric, audio, capacitance, PIR) |
| **Delay** | Slow down violations | Barbed wire, locks, bollards (prevent vehicle ramming), guards |
| **Determine & Decide** | Analyze and respond | Physical Access Control System (PACS), PIV/CAC cards |

### II. Key Mechanisms
- **Turnstile:** One person at a time after authentication
- **Mantrap:** Two interlocking doors; prevents piggybacking (with knowledge) and tailgating (without knowledge)
- **Bollards:** Prevent vehicle ramming

### III. Access Control Software
- Aggregates monitor points (card readers, cameras, locks, sensors) into a GUI with audit trails.

---

## Video V104: Facility Security Controls (Wiring Closets, Server Rooms, Data Centers)

**Objective:** To explain security requirements for different facility areas.

### I. Wiring Closet
- **Contents:** Networking/telecom cabling, modems, routers, switches, patch panels
- **Risks:** Poor ventilation, overheating, reduced equipment lifespan
- **Security:** Locks, cameras, sensors, cooling, no flammable materials

### II. Server Room
- **Contents:** Critical IT infrastructure (routers, switches, firewalls, IDS)
- **Placement:** Middle of facility (avoid bottom floor - flood risk; avoid top floor - weather/intrusion risk)
- **Environment:** Dedicated HVAC/CRAC; temperature 60-75°F; humidity 40-60%
- **Security:** Limit human activity; one primary entry point for monitoring

### III. Data Center
- **Definition:** Enterprise-level server room (high performance, high availability, scalability)
- **Deployment:** On-prem (local) or off-prem (cloud service provider)

### IV. Storage Areas
- **Purpose:** Physical assets, backup components, evidence storage
- **Evidence Handling:** Strict chain of custody; strict access control policies
- **Monitoring:** Access logs, alarm sensors, CCTV

---

## Video V105: Facility Infrastructure Security (HVAC, Power, UPS Types)

**Objective:** To explain infrastructure security for facilities.

### I. Work Area Security
- Limit access based on least privilege and need-to-know
- Two-person integrity for restricted areas

### II. Environmental Controls

| System | Work Areas | Equipment Rooms (CRAC) |
| :--- | :--- | :--- |
| **Temperature** | 65-75°F (18-23°C) for personnel comfort | 60-75°F (15-23°C) for optimal operation |
| **Humidity** | Target 50% | Target 50% (prevents corrosion and static electricity) |

### III. Power Protection

**Common Power Issues:**
- **Fault/Blackout:** Complete loss of power
- **Sag/Brownout:** Low voltage (short/long period)
- **Spike/Surge:** High voltage (short/long period)
- **Noise/Transient:** Fluctuations caused by EMI/RFI

**Power Protection Solutions:**

| Solution | Duration | Description |
| :--- | :--- | :--- |
| **UPS (Uninterruptible Power Supply)** | Short-term | Battery-based backup |
| **Generator** | Long-term | Motor/fuel-based backup (requires maintenance and fuel) |

### IV. UPS Types (Exam Focus)

| Type | Description |
| :--- | :--- |
| **Offline/Standby** | Most common, cost-effective; basic power failure protection |
| **Line-Interactive** | Includes Automatic Voltage Regulation (AVR); corrects fluctuations |
| **Online/Double-Conversion** | Cleanest power; always online; best for sensitive equipment |

### V. Data Center Tiers (Uptime)

| Tier | Uptime | Description |
| :--- | :--- | :--- |
| **Tier 1** | 99.6% | No redundancy; single path |
| **Tier 2** | 99.7% | Partial redundancy |
| **Tier 3** | 99.9% | Multiple paths; concurrent maintainability |
| **Tier 4** | 99.995% | Fully redundant; fault tolerant |

---

## Video V106: Fire Prevention, Detection, and Suppression

**Objective:** To explain fire safety classes, detection, and suppression systems.

### I. Priorities
- **Primary:** Protect human life (health, safety, safe exit)
- **Secondary:** Protect system assets

### II. Fire Triangle
- To stop a fire, eliminate one of: **Oxygen, Heat, Fuel**

### III. Fire Classes

| Class | Fuel Type | Extinguishing Agent |
| :--- | :--- | :--- |
| **A** | Common combustibles (wood, paper, cloth) | Water, Soda Acid |
| **B** | Flammable liquids (gasoline, oil) | CO₂, Halon substitute, Soda Acid |
| **C** | Electrical fires (motors, appliances) | CO₂, Halon substitute (inert gas) |
| **D** | Combustible metals (magnesium, titanium) | Dry Powder (only option) |
| **K** | Commercial kitchens (fats, greases) | - |

### IV. Detection Methods

| Method | Description |
| :--- | :--- |
| **Ionization Smoke Detector** | Uses radioisotopes; detects disruption between charged plates |
| **Photoelectric Smoke Detector** | Uses light source; trips when smoke interferes (most common) |
| **Fixed Temperature Detector** | Activates at a specific temperature threshold |
| **Rate of Rise Detector** | Activates when temperature increases rapidly |

### V. Suppression Systems

**Water-Based Systems:**

| System | Description | Best For |
| :--- | :--- | :--- |
| **Wet Pipe** | Water always in pipes; immediate discharge | General use |
| **Dry Pipe** | Compressed air holds water back; fills upon activation | Areas prone to freezing |
| **Deluge** | Large water volume rapidly | Industrial/work areas (not electronics) |
| **Preaction** | Dry/wet hybrid; two triggers required | **Data centers, server rooms** |

**Gas-Based Systems:**
- **Halon:** Legacy; effective but banned (ozone depletion)
- **FM-200 (HFC-227ea):** Most common Halon replacement

### VI. Fire Prevention
- Use non-combustible, fire-resistant materials
- Solid-core, fire-rated doors
- Personnel training: evacuation routes, extinguisher locations, manual system activation

---

## Video V107: Physical Security Controls (Intrusion Detection, Alarms, CCTV)

**Objective:** To explain intrusion detection sensors, alarm systems, and CCTV.

### I. Detection Sensors

| Sensor Type | Detection Method |
| :--- | :--- |
| **Active Infrared** | Changes in infrared light patterns |
| **Passive Infrared (PIR)** | Changes in ambient temperature/heat (most common) |
| **Wave Pattern** | Ultrasonic (low) or microwave (high) wave changes |
| **Capacitance/Proximity** | Changes in electric or magnetic fields |
| **Photoelectric** | Changes in visible light |
| **Passive Audio** | Sound changes (e.g., glass break detectors) |

### II. Alarm Systems

| Type | Description |
| :--- | :--- |
| **Notification (Silent)** | Sends alert without notifying intruder (e.g., bank panic button) |
| **Repellent** | Activates loud sirens, bells, or lights |
| **Deterrent** | Activates barriers (gates, locks) to trap intruder |
| **Local** | Loud audible alarm heard only at the facility (~400 ft range) |
| **Central Station** | Remotely monitored; station contacts law enforcement/management |
| **Auxiliary** | Directly notifies emergency services/law enforcement |

### III. CCTV Systems
- **Fixed:** Constant view of a specific area
- **PTZ (Pan, Tilt, Zoom):** 360-degree view; allows operators to zoom in on specific targets

### IV. Verification Process
- **Single Verification:** Alert from a monitor point (sensor or failed badge)
- **Secondary Verification:** Using another mechanism (e.g., PTZ camera) to confirm the alert is a real violation (reduces false positives)

---

## Session Summary
Session 14 covers the **complete physical security landscape** for the CISSP exam. Key takeaways include:

1.  **Site Design:** CPTED (natural access control and surveillance); critical path analysis.

2.  **Five Control Functions:** Deter, Deny, Detect, Delay, Determine & Decide.

3.  **Facility Areas:** Wiring closets (ventilation risks), server rooms (middle of facility, dedicated HVAC), data centers (enterprise-level).

4.  **Infrastructure Security:** HVAC (50% humidity), power (UPS types: offline, line-interactive, online), data center tiers (1-4).

5.  **Fire Safety:** Classes A-D (extinguishing agents), detection (ionization, photoelectric, fixed temp, rate of rise), suppression (wet/dry pipe, preaction for data centers, FM-200).

6.  **Physical Security Controls:** Sensors (PIR, wave pattern, capacitance, audio), alarms (silent, repellent, deterrent, central station), CCTV (fixed, PTZ), and secondary verification.
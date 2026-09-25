### Video V102: Site Design Principles (CPTED, Critical Path Analysis)

```mermaid
graph TD
    subgraph Core Concept
        DiD[Defense in Depth<br/>Administrative + Technical + Physical controls]
    end

    subgraph Critical Path Analysis
        CPA[Examine relationships between<br/>Critical assets and dependencies<br/>Electricity, environmental controls, water, waste]
    end

    subgraph Site Selection Criteria
        Crime[Crime<br/>Proximity to high-crime areas]
        Disaster[Natural Disasters<br/>Earthquakes, floods, tornadoes, fires]
        Emerg[Emergency Services<br/>Response times: fire, medical, law enforcement]
        Infra[Infrastructure<br/>Access to power, gas, water, telecommunications]
    end

    subgraph CPTED - Crime Prevention Through Environmental Design
        Principle[Principle: Using physical environment<br/>to influence human behavior and deter crime]
        
        subgraph Implementation
            NAC[Natural Access Control<br/>Terrain, trees, single entry points]
            NS[Natural Surveillance<br/>Elevated positions, cleared sightlines, camera angles]
            PC[Perimeter Controls<br/>Patrol routes, open areas]
        end
    end

    DiD --> CPA
    CPA --> Crime --> Disaster --> Emerg --> Infra
    Infra --> Principle
    Principle --> NAC
    Principle --> NS
    Principle --> PC
```

---

### Video V103: Facility Design Principles (Deter, Deny, Detect, Delay)

```mermaid
graph TD
    subgraph Five Control Functions
        Deter[Deter - Discourage violations<br/>Fencing 3-4ft casual, 6-7ft most, 8+ft barbed wire<br/>Lighting 2 foot candles, signs, guards, dogs]
        
        Deny[Deny - Prevent access<br/>Turnstiles, mantraps, access control systems]
        
        Detect[Detect - Identify violations<br/>Cameras: fixed, PTZ<br/>Sensors: infrared, wave pattern, heat<br/>Photoelectric, audio, capacitance, PIR]
        
        Delay[Delay - Slow down violations<br/>Barbed wire, locks, bollards, guards]
        
        Determine[Determine & Decide - Analyze & respond<br/>PACS - Physical Access Control System<br/>PIV/CAC cards]
    end

    subgraph Key Mechanisms
        Turnstile[Turnstile<br/>One person at a time after authentication]
        Mantrap[Mantrap - Two interlocking doors<br/>Prevents piggybacking (with knowledge)<br/>Prevents tailgating (without knowledge)]
        Bollards[Bollards<br/>Prevent vehicle ramming]
    end

    subgraph Access Control Software
        ACS[Aggregates monitor points<br/>Card readers, cameras, locks, sensors<br/>GUI with audit trails]
    end

    Deter --> Deny --> Detect --> Delay --> Determine
    Deny --> Turnstile
    Deny --> Mantrap
    Delay --> Bollards
    Determine --> ACS
```

---

### Video V104: Facility Security Controls (Wiring Closets → Data Centers)

```mermaid
graph TD
    subgraph Wiring Closet
        WC_Contents[Networking/telecom cabling<br/>Modems, routers, switches, patch panels]
        WC_Risks[Poor ventilation, overheating<br/>Reduced equipment lifespan]
        WC_Security[Locks, cameras, sensors<br/>Cooling, no flammable materials]
    end

    subgraph Server Room
        SR_Contents[Critical IT infrastructure<br/>Routers, switches, firewalls, IDS]
        SR_Placement[Middle of facility<br/>Avoid bottom floor - flood risk<br/>Avoid top floor - weather/intrusion]
        SR_Environment[Dedicated HVAC/CRAC<br/>Temperature 60-75°F<br/>Humidity 40-60%]
        SR_Security[Limit human activity<br/>One primary entry point for monitoring]
    end

    subgraph Data Center
        DC_Definition[Enterprise-level server room<br/>High performance, availability, scalability]
        DC_Deployment[On-prem local<br/>Off-prem cloud service provider]
    end

    subgraph Storage Areas
        SA_Purpose[Physical assets, backup components<br/>Evidence storage]
        SA_Evidence[Strict chain of custody<br/>Strict access control policies]
        SA_Monitoring[Access logs, alarm sensors, CCTV]
    end

    WiringCloset --> ServerRoom
    ServerRoom --> DataCenter
    DataCenter --> StorageAreas
```

---

### Video V105: Facility Infrastructure Security (HVAC, Power, UPS Types)

```mermaid
graph TD
    subgraph Environmental Controls
        Temp_Work[Work Areas: 65-75°F - personnel comfort]
        Temp_Equip[Equipment Rooms CRAC: 60-75°F - optimal operation]
        Humidity[Target 50% humidity<br/>Prevents corrosion and static electricity]
    end

    subgraph Power Protection Issues
        Fault[Fault/Blackout - Complete loss]
        Sag[Sag/Brownout - Low voltage]
        Spike[Spike/Surge - High voltage]
        Noise[Noise/Transient - EMI/RFI fluctuations]
    end

    subgraph Power Solutions
        UPS[UPS - Uninterruptible Power Supply<br/>Short-term, battery-based]
        Gen[Generator<br/>Long-term, motor/fuel-based<br/>Requires maintenance and fuel]
    end

    subgraph UPS Types
        Offline[Offline/Standby<br/>Most common, cost-effective<br/>Basic power failure protection]
        LineInt[Line-Interactive<br/>Includes Automatic Voltage Regulation - AVR<br/>Corrects fluctuations]
        Online[Online/Double-Conversion<br/>Cleanest power, always online<br/>Best for sensitive equipment]
    end

    subgraph Data Center Tiers - Uptime
        T1[Tier 1: 99.6% - No redundancy, single path]
        T2[Tier 2: 99.7% - Partial redundancy]
        T3[Tier 3: 99.9% - Multiple paths, concurrent maintainability]
        T4[Tier 4: 99.995% - Fully redundant, fault tolerant]
    end

    Temp_Work --> Temp_Equip --> Humidity
    Fault --> Sag --> Spike --> Noise
    Noise --> UPS
    UPS --> Gen
    UPS --> Offline
    UPS --> LineInt
    UPS --> Online
    Gen --> T1 --> T2 --> T3 --> T4
```

---

### Video V106: Fire Prevention, Detection, and Suppression

```mermaid
graph TD
    subgraph Priorities
        P1[Primary: Protect HUMAN LIFE<br/>Health, safety, safe exit]
        P2[Secondary: Protect system assets]
    end

    subgraph Fire Triangle
        Triangle[To stop a fire, eliminate one of:<br/>OXYGEN 🔥 HEAT 🔥 FUEL]
    end

    subgraph Fire Classes
        A[Class A: Common combustibles<br/>Wood, paper, cloth<br/>Agent: Water, Soda Acid]
        B[Class B: Flammable liquids<br/>Gasoline, oil<br/>Agent: CO₂, Halon substitute]
        C[Class C: Electrical fires<br/>Motors, appliances<br/>Agent: CO₂, Halon substitute - inert gas]
        D[Class D: Combustible metals<br/>Magnesium, titanium<br/>Agent: Dry Powder - ONLY option]
        K[Class K: Commercial kitchens<br/>Fats, greases]
    end

    subgraph Detection Methods
        Ion[Ionization Smoke Detector<br/>Radioisotopes, charged plates disruption]
        Photo[Photoelectric Smoke Detector<br/>Light source, trips when smoke interferes<br/>MOST COMMON]
        Fixed[Fixed Temperature Detector<br/>Activates at specific temperature]
        Rate[Rate of Rise Detector<br/>Activates on rapid temperature increase]
    end

    subgraph Suppression Systems
        Wet[Wet Pipe - Water always in pipes<br/>Immediate discharge]
        Dry[Dry Pipe - Compressed air holds water back<br/>Fills upon activation - for freezing areas]
        Deluge[Deluge - Large water volume rapidly<br/>Industrial/work areas - NOT for electronics]
        Preaction[Preaction - Dry/wet hybrid<br/>Two triggers required<br/>BEST FOR Data centers, server rooms]
        
        Halon[Halon - Legacy, effective<br/>Banned - ozone depletion]
        FM200[FM-200 HFC-227ea<br/>Most common Halon replacement]
    end

    subgraph Prevention
        Prev[Non-combustible, fire-resistant materials<br/>Solid-core, fire-rated doors<br/>Personnel training: evacuation, extinguishers]
    end

    P1 --> P2 --> Triangle
    Triangle --> A --> B --> C --> D --> K
    K --> Ion --> Photo --> Fixed --> Rate
    Rate --> Wet
    Wet --> Dry
    Dry --> Deluge
    Deluge --> Preaction
    Preaction --> Halon
    Halon --> FM200
    FM200 --> Prev
```

---

### Video V107: Physical Security Controls (Intrusion Detection, Alarms, CCTV)

```mermaid
graph TD
    subgraph Detection Sensors
        ActiveIR[Active Infrared<br/>Changes in infrared light patterns]
        PIR[Passive Infrared - PIR<br/>Changes in ambient temperature/heat<br/>MOST COMMON]
        Wave[Wave Pattern<br/>Ultrasonic low or microwave high wave changes]
        Capacitance[Capacitance/Proximity<br/>Changes in electric or magnetic fields]
        PhotoElec[Photoelectric<br/>Changes in visible light]
        Audio[Passive Audio<br/>Sound changes - glass break detectors]
    end

    subgraph Alarm Systems
        Silent[Notification - Silent<br/>Sends alert without notifying intruder<br/>Bank panic button]
        Repellent[Repellent<br/>Activates loud sirens, bells, or lights]
        Deterrent[Deterrent<br/>Activates barriers - gates, locks<br/>Traps intruder]
        Local[Local Alarm<br/>Loud audible alarm at facility only<br/>~400 ft range]
        Central[Central Station<br/>Remotely monitored<br/>Station contacts law enforcement]
        Auxiliary[Auxiliary<br/>Directly notifies emergency services]
    end

    subgraph CCTV Systems
        Fixed[Fixed Camera<br/>Constant view of specific area]
        PTZ[PTZ - Pan, Tilt, Zoom<br/>360-degree view<br/>Zoom on specific targets]
    end

    subgraph Verification Process
        Single[Single Verification<br/>Alert from monitor point<br/>Sensor or failed badge]
        Secondary[Secondary Verification<br/>Use another mechanism - PTZ camera<br/>Confirm alert is real violation<br/>Reduces false positives]
    end

    PIR --> ActiveIR
    ActiveIR --> Wave
    Wave --> Capacitance
    Capacitance --> PhotoElec
    PhotoElec --> Audio
    Audio --> Silent
    Silent --> Repellent
    Repellent --> Deterrent
    Deterrent --> Local
    Local --> Central
    Central --> Auxiliary
    Auxiliary --> Fixed
    Fixed --> PTZ
    PTZ --> Single
    Single --> Secondary
```

---

### Bonus: Session 14 Complete Concept Map

```mermaid
mindmap
  root((Physical Security))
    Site Design
      Critical Path Analysis
      CPTED: Natural Access Control, Surveillance, Perimeter
      Site Selection: Crime, Disasters, Emergency Services
    Five Control Functions
      Deter: Fencing, lighting, signs, guards, dogs
      Deny: Turnstiles, mantraps, access control
      Detect: Cameras, sensors
      Delay: Locks, bollards, guards
      Determine: PACS, PIV/CAC
    Facility Areas
      Wiring Closets: ventilation, overheating
      Server Rooms: middle of facility, dedicated HVAC
      Data Centers: on-prem or off-prem
      Storage: chain of custody, access logs
    Infrastructure Security
      HVAC: 60-75°F, 50% humidity
      Power: UPS offline/line-interactive/online, generators
      Data Center Tiers: 99.6% → 99.995% uptime
    Fire Safety
      Classes A, B, C, D, K
      Detection: Ionization, Photoelectric, Fixed temp, Rate of rise
      Suppression: Wet/Dry pipe, Deluge, Preaction, FM-200
    Physical Security Controls
      Sensors: PIR, wave, capacitance, audio
      Alarms: Silent, repellent, deterrent, local, central, auxiliary
      CCTV: Fixed, PTZ
      Verification: Single → Secondary
```
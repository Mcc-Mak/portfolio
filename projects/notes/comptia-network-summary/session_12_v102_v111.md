# Session 12: Wide Area Networks (WANs)

## V102 - Section Outline
- **WANs**: Move beyond LANs using routers/switches; enable communication over longer distances.
- **Historical context**: Pareto Principle (80/20 rule) has flipped; today ~80% of traffic goes to WAN (cloud, streaming, VoIP).
- **Course Objective**: 1.5 – Compare & contrast transmission media and transceivers.
- **Topics Covered**:
  - Fiber optic connections (FTTH, FTTC, FTTN, FTTB).
  - Cable / DOCSIS connections.
  - DSL (ADSL, SDSL, VDSL).
  - Satellite connections (geosynchronous, LEO like Starlink).
  - Cellular connections (1G–5G, GSM vs. CDMA).
  - Microwave connections.
  - Leased lines.
  - MPLS (Multi-Protocol Label Switching).

## V103 - Fiber Optic Connections (FTTx)
- **FTTH (Fiber to the Home)**: Fiber directly into residence. Highest speed & reliability.
- **FTTC (Fiber to the Curb/Cabinet)**: Fiber to curb, then copper to home/office.
- **FTTN (Fiber to the Node/Neighborhood)**: Fiber to central point in neighborhood, then copper to many homes. Slower.
- **FTTB (Fiber to the Building/Basement)**: Fiber to building’s main coms room, then copper (e.g., Cat6a) to units.
- **Speed hierarchy**: FTTH > FTTB > FTTC > FTTN.

## V104 - Cable Connections (DOCSIS)
- **DOCSIS (Data Over Cable Service Interface Specification)** : Enables high-speed internet over coaxial cables (same as cable TV).
- **HFC (Hybrid Fiber-Coaxial)**: Fiber optic (long distance) + coaxial (last mile).
- **Asymmetric Speeds**: High download (50–860 MHz), low upload (5–42 MHz).
- **Advantage**: Uses existing cable TV infrastructure.

## V105 - DSL (Digital Subscriber Line)
- **ADSL (Asymmetric DSL)**: Different download/upload speeds (download faster). Max ~8 Mbps down, ~1.5 Mbps up.
- **SDSL (Symmetric DSL)**: Equal upload/download speeds (slower overall).
- **VDSL (Very High Bit Rate DSL)**: Very high speeds (50+ Mbps down), but limited distance (~4,000 feet from DSLAM).

## V106 - Satellite Connections
- **Traditional (Geosynchronous)**: 22,000 miles up. High latency (~500 ms). Expensive.
- **LEO (Low Earth Orbit) – e.g., Starlink**: ~340 miles up. Much lower latency (25–35 ms). Requires many satellites.
- **Use cases**: Remote/mobile environments (planes, ships, RVs).

## V107 - Cellular Connections
- **Generations (1G–5G)**: Higher G = newer standard = faster speeds.
- **5G Bands**:
  - Low band (600–850 MHz): Long range, 30–250 Mbps.
  - Mid band (2.5–3.7 GHz): Moderate range, 100–900 Mbps (most common).
  - High band (mmWave, 25–39 GHz): Very short range, several Gbps.
- **GSM vs. CDMA**: GSM uses SIM cards, more common worldwide. CDMA is carrier-locked. Modern 3G/4G/5G networks use elements of both.

## V108 - Microwave Connections
- **Definition**: Communication system using microwave frequencies (300 MHz – 300 GHz) for point-to-point links.
- **Requires line of sight**. Distance limited to ~40 miles.
- **Standard**: IEEE 802.16 (WiMAX).
- **Use cases**: Business parks, college campuses, connecting buildings where fiber is impractical.

## V109 - Leased Lines (Dedicated Lines)
- **Definition**: Continuous, private connection between two points (copper or fiber). Not shared with other users.
- **Key Characteristics**: Dedicated bandwidth, symmetric speeds (upload = download).
- **Reliability**: Service Level Agreements (SLAs) guarantee uptime (often >99.9%).
- **Cost**: More expensive than shared services (DSL, cable). Typically for organizations where connectivity is critical.

## V110 - MPLS (Multi-Protocol Label Switching)
- **Definition**: Technique used by service providers to elevate efficiency. Uses **label switching** instead of traditional IP routing.
- **How it works**:
  1. Ingress router assigns a label (short, fixed-length identifier).
  2. Core routers forward based only on the label.
  3. Egress router removes label.
- **Benefits**: Protocol agnostic, enables QoS (traffic engineering), reliability & redundancy.
- **Think of MPLS as *label routing***.

## V111 - Common WAN Devices (Hands-on)
- Shows examples of cable modem, fiber modem (e.g., Verizon Fios), satellite modem, and cellular hotspot.
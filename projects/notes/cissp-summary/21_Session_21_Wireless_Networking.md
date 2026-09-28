# Session 21: Wireless Networking (CISSP Objective 4.1)

**Videos:** V152 – V156  
**Core Focus:** Wireless network fundamentals, wireless network modes (infrastructure, ad-hoc), wireless network security (WEP, WPA, WPA2, WPA3), attacks (KRACK, evil twin, rogue AP, bluejacking, bluesnarfing), and Mobile Device Management (MDM).

---

## Video V152 (Outline): Wireless Networking (Section Intro)

**Objective:** To introduce the key topics in wireless networking for the CISSP exam.

### Topics Covered in this Session
1.  Wireless Networks (fundamentals, frequencies, spread spectrum)
2.  Wireless Network Modes (Infrastructure, Ad-hoc, SSIDs)
3.  Wireless Network Security (WEP, WPA, WPA2, WPA3, attacks)
4.  Mobile Device Management (MDM, BYOD, security practices)

---

## Video V153: Wireless Networks

**Objective:** To explain wireless network fundamentals, RF techniques, IEEE 802.11 standards, Li-Fi, and Zigbee.

### I. Core Concept
- **Wireless networks:** Enable communication without physical cable media using Radio Frequency (RF) signals
- **RF Spectrum:** Frequency range from 3 Hz to 300 GHz
- **Key exam frequencies:** 900 MHz, 2.4 GHz, 5 GHz (2.4 & 5 GHz are most common)

### II. Key RF Techniques

| Technique | Description |
| :--- | :--- |
| **Modulation** | Changing information on the RF signal by varying properties (amplitude, frequency, phase, pulse) |
| **Frequency Hopping Spread Spectrum (FHSS)** | Sender/receiver randomly change frequencies; minimizes interference; harder to track/monitor |
| **Direct Sequence Spread Spectrum (DSSS)** | Data divided and transmitted in parallel across multiple frequencies; faster than FHSS; uses chipping code |
| **OFDM (Orthogonal Frequency-Division Multiplexing)** | Divides data into sub-streams; transmits over separate frequency bands; reduces bandwidth while increasing throughput |

### III. IEEE 802.11 Standards (WLAN)

| Amendment | Speed | Frequency |
| :--- | :--- | :--- |
| 802.11 | 2 Mbps | 2.4 GHz |
| 802.11a | 54 Mbps | 5 GHz |
| 802.11b | 11 Mbps | 2.4 GHz |
| 802.11g | 54 Mbps | 2.4 GHz |
| 802.11n | >200 Mbps | 2.4 or 5 GHz |
| 802.11ac | 1 Gbps | 5 GHz |

### IV. Broadcast Channels
- **Function:** Divide RF signal into sub-frequencies
- **Public channels:** Shared, can overlap → interference, eavesdropping
- **Private channels:** Exclusive to an organization
- **Regional variation:** US (11 channels), Europe (~13), Japan (14–17)

### V. Other Wireless Technologies

| Technology | Description | Security |
| :--- | :--- | :--- |
| **Li-Fi (Light Fidelity)** | Optical wireless communications (visible, infrared, UV light); eliminates RF interference; higher data rates | Not specified |
| **Zigbee (IEEE 802.15.4)** | Low-power PAN for IoT, mobile devices, BYOD | Supports 128-bit AES encryption; vulnerable to physical attacks, key attacks, replay/injection |

### VI. Exam Takeaways
- Understand wireless network signals and spread spectrum methods (FHSS, DSSS)
- Know IEEE 802.11 standards and amendments (a, b, g, n, ac – speeds & frequencies)
- Understand Li-Fi and Zigbee wireless networking

---

## Video V154: Wireless Network Modes

**Objective:** To explain wireless network modes (ad-hoc vs. infrastructure), SSIDs, and Bluetooth/cellular basics.

### I. Core Wireless Modes

| Mode | Description | Use Case |
| :--- | :--- | :--- |
| **Ad Hoc Mode** | Decentralized, peer-to-peer; no wireless infrastructure required | Direct communication between two mobile devices |
| **Infrastructure Mode** | Centralized; requires a wireless access point (router, switch, extender) | Most common deployment (e.g., connecting to Wi-Fi router) |

### II. Infrastructure Sub-Modes

| Sub-Mode | Description |
| :--- | :--- |
| **Stand-Alone Mode** | Connects wireless devices but does NOT connect to a physical network |
| **Wired Extension Mode** | Connects wireless devices to a physical network (e.g., internet access) |
| **Enterprise Extended Mode** | Uses multiple access points sharing the same network identifier (ESSID) |
| **Bridge Mode** | Connects two separate physical networks using a wireless connection |

### III. Identifiers (SSIDs)

| Identifier | Used In | Description |
| :--- | :--- | :--- |
| **SSID (Service Set Identifier)** | Both | Unique string identifying a wireless network (logical part) |
| **BSSID (Basic SSID)** | Ad Hoc mode | Used for peer-to-peer connections |
| **ESSID (Extended SSID)** | Infrastructure mode | Used for networks with multiple access points |

### IV. Wireless Access & Placement
- **Cell:** The coverage area of an antenna
- **Best practices:**
  - Centralize antennas for even coverage
  - Avoid obstructions: walls, metal surfaces, electrical equipment
  - Position antennas vertically or toward coverage area, away from interference

### V. Other Wireless Technologies

| Technology | Description | Security |
| :--- | :--- | :--- |
| **Bluetooth (IEEE 802.15)** | Wireless Personal Area Network (WPAN) | Pairing uses 4-digit PIN (sent in cleartext → vulnerable) |
| **Cellular Networks** | Large geographical areas (cell towers/base stations); transmit voice, video, data | Controlled by service provider; limited organizational control |

### VI. Exam Takeaways
- Understand Ad Hoc vs. Infrastructure modes
- Know BSSID vs. ESSID
- Understand wireless access placement, interference, obstacles
- Know Bluetooth and cellular network basics

---

## Video V155: Wireless Network Security

**Objective:** To explain wireless encryption standards (WEP, WPA, WPA2, WPA3) and wireless attacks.

### I. Authentication & Setup Mechanisms
- **WPS (Wi-Fi Protected Setup):** Simplifies network access using two 4-digit PINs; should be **disabled** unless absolutely required

### II. Wireless Encryption Standards (in order of security strength)

| Standard | Key Features | Status |
| :--- | :--- | :--- |
| **WEP** | 64/128-bit encryption, RC4 cipher | **Broken** (RC4 has known weaknesses) |
| **WPA** | LEAP (Cisco proprietary), TKIP | **Broken** (TKIP still uses RC4) |
| **WPA2** | CCMP based on AES, 128-bit key | **Standard to know**; no known compromise of AES/CCMP |
| **WPA3** | 192-bit AES (Enterprise: AES-256 GCM; Personal: AES-128 CCM); SAE for secure key exchange | **Most secure** |

### III. Wireless Network Attacks

| Attack | Description |
| :--- | :--- |
| **KRACK (Key Reinstallation Attack)** | Compromises WPA2 4-way handshake to reuse encryption keys |
| **Signal Jamming** | DoS attack against an access point |
| **Rogue Access Points** | Unauthorized AP connected to open network port; mitigation: walkarounds, DHCP monitoring |
| **Evil Twin** | Fake wireless network (clone of legitimate AP) to steal credentials via captive portal |
| **Replay Attack** | Reuses previously authenticated communications |
| **Wardriving** | Searching for open wireless networks while moving (car/walking) |
| **Warchalking** | Chalk markings indicating wireless hotspots (historical) |

### IV. Bluetooth Attacks

| Attack | Description |
| :--- | :--- |
| **Bluejacking** | Sends unsolicited messages to collect data (MiTM/spam/phishing-like) |
| **Bluesnarfing** | Forces Bluetooth connection to access stored data (calls, messages) |
| **Bluebugging** | Executes device commands without user's knowledge |

### V. General Wi-Fi Security Measures
- Change default passwords and default SSIDs
- Decide whether to broadcast or hide SSID (hiding deters only casual users)
- Enable MAC address filtering
- Use **WPA2 or WPA3** encryption
- Manage physical access with **802.1X** (NAC)
- Apply **defense in depth** (multiple security mechanisms)

### VI. Exam Takeaways
- Know WPS and encryption techniques (WEP, WPA, WPA2, WPA3)
- Know wireless network attacks (KRACK, rogue AP, evil twin, jamming, replay, wardriving, warchalking)
- Know Bluetooth attacks (bluejacking, bluesnarfing, bluebugging)
- Know general Wi-Fi security steps

---

## Video V156: Mobile Device Management (MDM)

**Objective:** To explain mobile device risks, BYOD, MDM, and security practices.

### I. Definition & Core Concept
- **Mobile devices:** Portable/handheld network-capable computing devices (smartphones, tablets, wearables, laptops, IoT)
- **Key characteristic:** Mobility → complicates network tracking and auditing

### II. Bring Your Own Device (BYOD)
- **Policy:** Employees use personal devices to access organizational assets
- **Pros:** Saves organization money (user purchases/maintains device)
- **Cons:** Inconsistent configurations, unknown threats/vulnerabilities

### III. Mobile Device Vulnerabilities & Threats

| Threat | Description |
| :--- | :--- |
| **Network interfaces** | Wi-Fi, cellular (uncontrolled), Bluetooth (personal hotspots) |
| **SIM cards** | High-value targets due to stored data |
| **Misconfiguration** | Lack of hardening |
| **Untrusted applications** | No supply chain verification |
| **Poor password hygiene** | Weak, reused passwords |
| **Lost/stolen devices** | Data exposure risk |
| **Malware infections** | Viruses, worms |

### IV. Mobile Device Management (MDM)
- **Purpose:** Apply consistent configuration and policy to reduce risk
- **Enterprise Mobility Management (EMM):** MDM at enterprise scale
- **Key goal:** If device leaves organizational control → reduce risk of CIA compromise

### V. MDM Security Practices

| Practice | Description |
| :--- | :--- |
| **Enrollment & authentication** | For corporate/BYOD devices |
| **Compliance** | With regulations (GDPR, FISMA, PCI DSS) |
| **Include mobile devices** | In vulnerability/patch/change/configuration management |
| **Encrypt storage** | Protect data at rest |
| **Geofencing** | Grant access/privileges based on device location |
| **Endpoint protection** | Anti-virus, firewalls (where possible) |
| **Inactivity & session timeouts** | Lock after period of inactivity |
| **Remote sanitization** | Wipe data if lost/stolen |
| **Screen locks** | For inactive devices |
| **Security awareness training** | For BYOD users |

### VI. Exam Takeaways
- Understand threats to mobile devices
- Know what MDM is used for
- Understand mobile device security practices

---

## Session 21 Summary

Session 21 covers the **complete wireless networking and mobile device security landscape** for the CISSP exam (Objective 4.1). Key takeaways include:

1. **Wireless Networks (V153):** RF techniques (FHSS, DSSS, OFDM); IEEE 802.11 standards (a, b, g, n, ac); Li-Fi (optical wireless); Zigbee (low-power PAN with AES-128).

2. **Wireless Network Modes (V154):** Ad Hoc (peer-to-peer, no infrastructure) vs. Infrastructure (centralized, requires AP). SSIDs: BSSID (ad-hoc) vs. ESSID (infrastructure). Bluetooth (WPAN, 4-digit PIN vulnerable). Cellular networks.

3. **Wireless Network Security (V155):** WEP (broken), WPA (broken), WPA2 (standard, AES/CCMP), WPA3 (most secure, SAE). Attacks: KRACK, rogue AP, evil twin, jamming, replay, wardriving, warchalking. Bluetooth attacks: bluejacking, bluesnarfing, bluebugging. Mitigations: WPA2/WPA3, 802.1X, MAC filtering, defense in depth.

4. **Mobile Device Management (V156):** BYOD risks (inconsistent configs, unknown threats). MDM practices: encryption, geofencing, remote sanitization, session timeouts, endpoint protection, security awareness training.

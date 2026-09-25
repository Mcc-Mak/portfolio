# Session 7: Wireless Networks

## V48 - Section Outline
- **Importance**: Extend physical networks into wireless domain; enable user roaming.
- **Course Alignment**: Domain 1 & 2. Main focus: Objective 2.3 (Select/configure wireless devices and technologies).
- **Topics Covered**:
  - Network types (ad hoc, infrastructure, point-to-point, mesh).
  - Antennas (omnidirectional, unidirectional, Yagi).
  - Frequencies (2.4 GHz, 5 GHz, 6 GHz).
  - 802.11 standards (a, b, g, n, ac, ax).
  - Wireless security (WEP, WPA, WPA2, WPA3, WPS).
  - Captive portals.

## V49 - Wireless Network Types
- **Ad Hoc (IBSS)**: Devices connect directly (peer-to-peer). Quick, temporary, no infrastructure. No internet access typically.
- **Infrastructure Mode**: Devices connect via Wireless Access Point (WAP) to wired LAN. BSSID = WAP's MAC address; SSID = user-friendly network name.
- **Point-to-Point**: Fixed, static links between two locations using high-gain antennas. Dedicated bandwidth.
- **Mesh Networks**: Each node connects to multiple others → multiple possible data paths. Self-forming, self-healing.
- **Access Point Types**:
  - **Autonomous AP**: Standalone, independently configured. Best for small setups, home users.
  - **Lightweight AP**: Managed by centralized wireless controller. Best for large enterprise networks.

## V50 - Wireless Antennas
- **Omnidirectional**: Transmits/receives equally in all directions. Default for access points, mobile hotspots.
- **Unidirectional**: Focuses energy in a **single direction** for a concentrated beam. Best for point‑to‑point connections.
- **Yagi Antennas**: Subtype of unidirectional. High signal gain, narrow beam width. Best for long‑distance communication in a fixed direction.

## V51 - Antenna Identification (Hands-on)
- Shows examples of omnidirectional (cell phones, internal AP antennas), unidirectional, parabolic (satellite TV dishes), and Yagi antennas.

## V52 - Wireless Frequencies (2.4 GHz, 5 GHz, 6 GHz)
- **2.4 GHz**: Longer range, better penetration. Only 3 non-overlapping channels (1, 6, 11). More susceptible to interference.
- **5 GHz**: Faster speeds, shorter range. Up to 24 non-overlapping 20 MHz channels. Supports channel bonding (20→40→80→160 MHz).
- **6 GHz**: Fastest, shortest range. 1200 MHz allocated. Up to 59 channels (20 MHz width).
- **Band Steering**: Optimizes client distribution by steering capable devices to less congested bands (5/6 GHz).

## V53 - Wireless Standards (802.11 a/b/g/n/ac/ax)
- **Key Facts Table**:

| Standard | Aliases | Frequency | Max Speed | Notes |
| :--- | :--- | :--- | :--- | :--- |
| Wireless A | 802.11a | 5 GHz | 54 Mbps | Expensive; mostly business use. |
| Wireless B | 802.11b | 2.4 GHz | 11 Mbps | Cheaper, widespread adoption. |
| Wireless G | 802.11g | 2.4 GHz | 54 Mbps | Speed of A, cheap frequency of B. |
| Wireless N | 802.11n, Wi-Fi 4 | 2.4 & 5 GHz (Dual-band) | Up to 600 Mbps | Introduced **MIMO**. |
| Wireless AC | 802.11ac, Wi-Fi 5 | **5 GHz only** | Up to 6.9 Gbps | Introduced **MU-MIMO**. |
| Wireless AX | 802.11ax, Wi-Fi 6/6E | 2.4, 5, & 6 GHz | Up to 9.6 Gbps | Fully backward compatible. |

- **Critical Exam Rules**:
  - Support 2.4 GHz: B, G, N, AX
  - Support 5 GHz: A, N, AC, AX
  - Only Wireless N and Wireless AX are true dual-band standards per official spec.

## V54 - Wireless Security (WEP, WPA, WPA2, WPA3, WPS)
- **WEP (Wired Equivalent Privacy)**: Extremely insecure. Uses static keys and weak RC4 encryption. Vulnerable to IV attacks. **Never use**.
- **WPA (Wi-Fi Protected Access)**: Uses TKIP (replaces IV) and RC4. Still weak. **Never use**.
- **WPA2**: Uses CCMP (integrity) and AES (encryption). Personal mode (PSK) or Enterprise mode (802.1X/RADIUS). **Safe** for legacy devices.
- **WPA3**: Uses SAE (Simultaneous Authentication of Equals, resists offline attacks), AES-GCM, 192/256-bit keys, forward secrecy. **Best choice**.
- **WPS (Wi-Fi Protected Setup)**: Simplifies setup but has a significant PIN vulnerability (8-digit PIN split into two 4-digit halves → easily brute-forced). **Disable**.
- **Authentication Mechanisms**:
  - **Pre-Shared Key (PSK)**: Same password on AP and all clients (home model).
  - **Enterprise (802.1X)**: Individual credentials verified by a central server (e.g., RADIUS).

## V55 - Configuring a Wireless Router (Demonstration)
- **Steps shown**:
  1. Disable SSID broadcast (to make network less visible).
  2. Enable wireless isolation.
  3. Set a strong SSID.
  4. Select channel (auto or 1,6,11 for 2.4 GHz).
  5. Set security to **WPA2-PSK [AES]** with a long, complex passphrase.
  6. (Optional) Enable MAC filtering (per exam requirements, though less useful in reality).
  7. Disable WPS (if device allows).
  8. Disable remote management.

## V56 - WEP Cracking Demonstration (Aircrack-ng)
- Demonstrates how an attacker can crack a WEP key in minutes using tools like `airodump-ng` and `aircrack-ng` by capturing enough Initialization Vectors (IVs).
- **Key takeaway**: WEP can be cracked reliably and quickly. **Immediate migration to WPA2 (or better) is essential**.

## V57 - Captive Portals
- **Definition**: A webpage displayed to newly connected users **before** granting broader network access.
- **Common use cases**: Public networks (hotels, airports, coffee shops), business guest networks.
- **Key Functions**: User authentication, policy acceptance (ToS), data collection (e.g., email for marketing).
- **How it works**: Intercepts the user’s network connection and redirects them to a special webpage (the captive portal).
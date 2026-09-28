# Session 25: Troubleshooting Wireless Issues

## V235 - Section Outline
- **Wireless** refers specifically to **Wi-Fi (802.11 family)** .
- **Course Objective**: 5.4 – Troubleshoot common performance issues.
- **Topics Covered**:
  - Wireless coverage issues (RSSI, EIRP, site surveys).
  - Interference issues (overlapping channels, attenuation, multipath).
  - Client disassociation issues (idle timeout, session timeout, de-auth attacks).
  - Incorrect wireless configurations (wrong SSID, passphrase, encryption protocol mismatch).
  - Captive portal issues.
  - Antennas (placement, type, polarization).
  - Channel utilization (CSMA/CA, CCA).
  - AP association process (7 steps).

## V236 - Wireless Coverage
- **RSSI (Received Signal Strength Indicator)** : Measures signal received by client. Scale 0 to -100 dB (closer to 0 = stronger). -60 to -65 dB = strong.
- **EIRP (Effective Isotropic Radiated Power)** : Measures signal sent from AP (in dBi).
- **Solutions to extend coverage**: Increase power (limited by FCC), upgrade antenna (e.g., 9 dBi instead of 5 dBi), use wireless repeater, add second AP in ESS configuration, use wireless mesh system.

## V237 - Interference & Attenuation
- **2.4 GHz interference mitigation**: Use channels 1, 6, 11 only. Never place same channel numbers adjacent/overlapping.
- **5 GHz networks**: Use honeycomb pattern for AP placement. Do not repeat a channel until at least two zones away.
- **Attenuation**: Reduction of signal strength. Causes: distance, physical obstacles, signal interference, antenna cable quality, multipath reception (signals bounce off objects).
- **Multipath reception**: Signals reflect off walls/poles → reach receiver weakened. Leads to lower RSSI, lower throughput.

## V238 - Client Disassociation Issues
- **Legitimate causes**: Idle timeout (300 sec), session timeout (1800 sec), wireless network changes (e.g., changing passphrase), manual deletion, authentication timeout, AP radio reset.
- **De-authentication attack**: Attacker forces client disconnection, captures association/auth packets, attempts to crack passphrase. If client is repeatedly de-authenticated without legitimate reason → possible attack → investigate logs.

## V239 - Incorrect Wireless Configurations
- **Wrong SSID**: Typo in manual entry, or connecting to evil twin (similar fake SSID).
- **Incorrect Passphrase**: Double-check password. If correct but still error, reinstall wireless adapter drivers.
- **Encryption Protocol Mismatch**: WEP (RC4), WPA (TKIP), WPA2 (AES). “Network security key mismatch” may indicate wrong protocol. Solutions: manually change protocol, disable third-party antivirus, reinstall wireless drivers.

## V240 - Captive Portal Issues
- **Captive Portal**: Webpage displayed to newly connected users before granting broader access. Uses HTTP redirect, ICMP redirect, or DNS redirect.
- **Troubleshooting**:
  1. Open browser and go to any website (e.g., google.com) to trigger redirect.
  2. If that fails, find default gateway IP and enter `http://<gateway-IP>` in browser.
  3. Verify DNS configuration – ensure not manually set to a static DNS (e.g., 8.8.8.8). Set to automatic (DHCP).

## V241 - Wireless Considerations (Antennas, Channel Utilization, AP Association)
- **Antenna Types**: Omnidirectional (360°), Dipole (bi-directional), Yagi (unidirectional), Parabolic grid/dish (unidirectional, longer range).
- **Polarization**: Most Wi-Fi clients use vertical polarization. Poor RSSI despite proximity → possible polarization mismatch. Fix: flip AP antenna to vertical.
- **Channel Utilization**: Keep under ~30% for fast performance. High utilization → more waiting → slower throughput. Solutions: change to less busy channel or upgrade to 5 GHz.
- **CSMA/CA (Collision Avoidance)** : Devices perform Clear Channel Assessment (CCA) – listen before speaking. If channel busy → random backoff, then re-check.
- **AP Association Process (7 steps)** :
  1. Probe request (broadcast).
  2. Probe response (AP responds if data rates match).
  3. Authentication frame.
  4. Authentication response/ack.
  5. Association request.
  6. Association response (success).
  7. Data transfer.
- **Long association times**: Causes: scanning, finding AP, auth, association, DHCP (can take 30–60 sec). Mitigation: place clients in high signal strength (RSSI) areas.
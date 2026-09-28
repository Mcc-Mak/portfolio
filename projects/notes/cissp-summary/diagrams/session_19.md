### Video V137: Firewall Concepts

```mermaid
graph TD
    subgraph Core Definition
        FW[Firewall - Software preventing unauthorized<br/>communications between networks<br/>Named after physical fire barriers]
    end

    subgraph Primary Functions
        F1[Creates security boundary<br/>Filters/controls inbound/outbound traffic]
        F2[Performs packet inspections]
        F3[Compares traffic to Access Control Lists - ACLs]
        F4[Permit or deny by source/destination<br/>protocol, port, or packet contents]
    end

    subgraph What Firewalls Can & Cannot Do
        Can[✅ Filter by src/dest IP, protocol, port<br/>✅ Perform packet inspections]
        Cannot[❌ Prevent data sharing<br/>❌ Stop viruses/worms - needs additional software]
    end

    subgraph ACLs
        ACL[Access Control Lists<br/>Primary method for firewall policies]
        ImplicitDeny[IMPLICIT DENY<br/>At end of every ACL<br/>All unlisted traffic automatically denied]
    end

    subgraph Firewall Deployment Types
        Hardware[Hardware/Appliance<br/>Dedicated hardware<br/>Cisco, Palo Alto, Juniper, Fortinet]
        Virtual[Virtual<br/>Software on VM - cloud/on-prem<br/>Same vendors + pfSense]
        HostBased[Host-based<br/>Installed on individual computers<br/>iptables, firewalld, hosts file]
        WAF[WAF - Web Application Firewall<br/>Protects web-based systems<br/>Cloudflare, Nginx, Azure, AWS]
    end

    subgraph Key Comparison
        NB[Network-based firewalls<br/>Monitor ALL traffic on network]
        HB[Host-based & WAFs<br/>Monitor traffic to/from SPECIFIC host]
    end

    FW --> F1 --> F2 --> F3 --> F4
    F4 --> Can
    Can --> Cannot
    Cannot --> ACL --> ImplicitDeny
    ImplicitDeny --> Hardware
    Hardware --> Virtual
    Virtual --> HostBased
    HostBased --> WAF
    WAF --> NB
    NB --> HB
```

---

### Video V138: Types of Firewalls

```mermaid
graph TD
    subgraph Static Packet Filtering - 1st Gen
        SPF[Static Packet Filtering<br/>Screening router, stateless inspection]
        SPF_Layer[Layer 3]
        SPF_Filter[Filters: src/dest IP, protocol, port]
        SPF_Pro[✅ Very fast, low overhead]
        SPF_Con[❌ No state tracking]
    end

    subgraph Proxy Firewall - 2nd Gen
        Proxy[Proxy Firewall<br/>Acts as go-between; systems never directly communicate]
        Circuit[Circuit-level gateway - Layer 5<br/>Manages TCP handshake + session creation]
        App[Application-level gateway - Layer 7<br/>Manages user interaction + protocols]
        Forward[Forward proxy: Internal → External]
        Reverse[Reverse proxy: External → Internal]
        Proxy_Con[❌ Copies all data, increases latency, slower]
    end

    subgraph Stateful Inspection - 3rd Gen
        State[Stateful Inspection Firewall]
        State_Layer[Layers 3 and 4]
        State_Tracks[Tracks state and behavior of data]
        State_Features[Negotiates high ports 1024+<br/>Automatic return paths<br/>No ACLs on both ends<br/>Uses state table]
    end

    subgraph Next-Gen Firewall - NGFW
        NGFW[Next-Generation Firewall / UTM<br/>Unified Threat Management<br/>Multifunctional device]
        NGFW_Features[Deep packet inspection<br/>URL filtering<br/>SSL/TLS inspection<br/>Intrusion detection/prevention<br/>Malware scanning]
    end

    SPF --> SPF_Layer --> SPF_Filter --> SPF_Pro --> SPF_Con
    SPF_Con --> Proxy --> Circuit --> App --> Forward --> Reverse --> Proxy_Con
    Proxy_Con --> State --> State_Layer --> State_Tracks --> State_Features
    State_Features --> NGFW --> NGFW_Features

    subgraph Summary Table
        T1["Static: 1st Gen, L3, src/dest/protocol/port"]
        T2["Proxy: 2nd Gen, L5/L7, app/session/service"]
        T3["Stateful: 3rd Gen, L3/L4, state/behavior"]
        T4["NGFW: Advanced, Multi-layer, integrated threat"]
    end
```

---

### Video V139: Firewall Architecture

```mermaid
graph TD
    subgraph Multihomed Firewall
        Multi[Multihomed Firewall<br/>Multiple network interfaces]
        Multi_Basic[Outside external/untrusted<br/>+ Inside internal/trusted]
        Multi_Advanced[One external + multiple internal]
    end

    subgraph Bastion Host
        Bastion[Bastion Host<br/>Hardened server between internal/external]
        Bastion_Char[Minimal attack surface<br/>Only necessary services: SSH, NTP, auth<br/>No unnecessary: FTP, Telnet]
        Bastion_Use[Cloud environments<br/>Public cloud gateway to private cloud]
    end

    subgraph Screened Host
        Screened[Screened Host<br/>Behind firewall, inside security boundary]
        Screened_Function[Screens traffic before network core]
        Screened_Traffic[Inbound inspected<br/>Outbound often NOT screened]
        Screened_Also[Single-tiered configuration]
    end

    subgraph Screened Subnet - DMZ
        DMZ[Screened Subnet - DMZ<br/>Two firewalls with semi-trusted network between]
        DMZ_Hosts[Hosts: web servers, file servers, guest zones]
        DMZ_Flow[External FW → DMZ → Internal FW → Trusted LAN]
    end

    Multi --> Multi_Basic --> Multi_Advanced
    Multi_Advanced --> Bastion --> Bastion_Char --> Bastion_Use
    Bastion_Use --> Screened --> Screened_Function --> Screened_Traffic --> Screened_Also
    Screened_Also --> DMZ --> DMZ_Hosts --> DMZ_Flow

    subgraph Comparison Table
        Comp1["Multihomed: 1 FW, external↔internal"]
        Comp2["Bastion Host: 1 hardened server, cloud gateway"]
        Comp3["Screened Host: 1 FW, behind firewall"]
        Comp4["DMZ: 2 FWs, untrusted→semi→trusted"]
    end
```

---

### Video V140: IP Security (IPsec)

```mermaid
graph TD
    subgraph Purpose
        IPsec[IPsec - Creates secure tunnel over untrusted network<br/>Encapsulates unsecured protocols HTTP, FTP<br/>Symmetric or asymmetric cryptography<br/>Works for hosts or network devices]
    end

    subgraph What IPsec Provides
        Prov[✅ Confidentiality - encryption<br/>✅ Integrity - hashing<br/>✅ Endpoint authentication<br/>❌ Does NOT guarantee availability]
    end

    subgraph Two Modes
        Transport[Transport Mode<br/>Encrypts: PAYLOAD only<br/>Header visible: src/dest/port/protocol<br/>Use: More efficient, allows SIEM inspection]
        Tunnel[Tunnel Mode<br/>Encrypts: ENTIRE packet<br/>Everything encrypted<br/>Use: Most secure, typical VPN tunnel]
    end

    subgraph Security Association - SA
        SA[Security Association - SA<br/>Defines algorithms, ciphers, keys for IPsec<br/>Managed by ISAKMP<br/>Negotiates, establishes, modifies, deletes SAs]
    end

    subgraph Components
        AH[AH - Authentication Header<br/>Integrity, authentication<br/>Non-repudiation, replay protection]
        ESP[ESP - Encapsulating Security Payload<br/>Confidentiality + integrity of data packet]
    end

    subgraph L2TP + IPsec
        L2TP_Alone[L2TP Alone<br/>Encrypts: ❌, Tunnels L2: ✅, User auth: ✅, Works over internet: ❌]
        IPsec_Alone[IPsec Alone<br/>Encrypts: ✅, Tunnels L2: ❌, User auth: Weak, Works over internet: ✅]
        Both[L2TP + IPsec<br/>Encrypts: ✅, Tunnels L2: ✅, User auth: ✅, Works over internet: ✅]
    end

    IPsec --> Prov
    Prov --> Transport
    Transport --> Tunnel
    Tunnel --> SA
    SA --> AH
    AH --> ESP
    ESP --> IPsec_Alone
    IPsec_Alone --> Both
    L2TP_Alone --> Both
```

---

### Video V141: Endpoint Security

```mermaid
graph TD
    subgraph Definition
        Endpoint[Endpoints: Source and destination of communication<br/>Computers, servers, mobile devices<br/>Goal: Remove SPOF from network-based defenses]
    end

    subgraph Problem with Network-Only Defenses
        Problem[NIDS/NIPS on network<br/>Fail if endpoints talk directly without traversing device<br/>Routing all traffic through them = high latency]
    end

    subgraph Solution - Defense in Depth
        DiD[Install HIDS/HIPS on EVERY endpoint<br/>Always protected even if network defense fails<br/>Limits spread of infection<br/>Prevents lateral movement]
    end

    subgraph Key Endpoint Security Mechanisms
        FW_H[Host-based Firewall - Active<br/>Minimum baseline, prevents unauthorized comms]
        AV[Antivirus/Anti-malware - Active<br/>Detects/removes viruses, prevents spread]
        HIDS[HIDS - Passive<br/>Detects violations, sends alerts only]
        HIPS[HIPS - Active<br/>Detects and responds, can reconfigure system]
        DLP[DLP - Active<br/>Blocks unauthorized data transfers based on labeling]
        VPN[VPN Client - Active<br/>Secure connection over public networks]
        Patching[Patching - Proactive<br/>Keep endpoints up to date]
        Hardening[Hardening - Proactive<br/>Minimize attack surface]
    end

    subgraph Layered Defense Example
        L1[Layer 1: Host-based firewall]
        L2[Layer 2: HIDS and HIPS]
        L3[Layer 3: Antivirus and anti-malware]
        L4[Layer 4: Hardened configuration]
    end

    Endpoint --> Problem --> DiD
    DiD --> FW_H --> AV --> HIDS --> HIPS --> DLP --> VPN --> Patching --> Hardening
    Hardening --> L1 --> L2 --> L3 --> L4
```

---

### Video V142: Network Access Control (NAC)

```mermaid
graph TD
    subgraph Definition & Goal
        NAC[NAC - Network Access Control<br/>Combination of technologies controlling network access<br/>Goal: Enforce strict policies via AAA<br/>Identify subjects + devices not just IP<br/>Block/isolate non-compliant hosts]
    end

    subgraph Key Protocol - IEEE 802.1X
        Dot1X[IEEE 802.1X - Port-Based Network Access Control - PNAC<br/>Implemented at network interface<br/>Requires MUTUAL authentication device ↔ network<br/>Use cases: BYOD, IoT, guest network access]
    end

    subgraph Admission Types
        Pre[Pre-admission: Endpoint compliant BEFORE access<br/>Typical use: Employees]
        Post[Post-admission: Access granted first<br/>Then behavior monitored for violations<br/>Typical use: Guest networks]
    end

    subgraph Implementation Methods
        Agent[Agent-based: Software on endpoint monitors activity]
        Agentless[Agentless: Remote scanning via network connection]
    end

    subgraph Deployment Architectures
        OOB[Out-of-band: NAC components don't interfere<br/>Scanning without operational impact]
        Inline[In-line: NAC sits between device and network<br/>Real-time traffic inspection and decisions]
    end

    subgraph Remediation
        Quarantine[Quarantine - Isolate from network]
        Captive[Captive portal - Limited access login screen<br/>Until compliant]
        Remedial[Remedial network - Contains patch server<br/>Vulnerability scanner, captive portal server]
    end

    NAC --> Dot1X
    Dot1X --> Pre --> Post
    Post --> Agent --> Agentless
    Agentless --> OOB --> Inline
    Inline --> Quarantine --> Captive --> Remedial
```

---

### Video V143: Reconnaissance Attacks

```mermaid
graph TD
    subgraph Definition
        Recon[Reconnaissance - Discovery<br/>Preliminary analysis to gather target information]
        Passive[Passive - OSINT<br/>Collect without detection: web mining, searching]
        Active[Active - Expectation of being detected]
    end

    subgraph Active Reconnaissance Techniques
        Ping[Ping Sweep - Discovery Scan<br/>Pings network IPs to find live hosts<br/>Tools: Nmap, Angry IP Scanner, Nessus<br/>Mitigation: Deny ICMP where possible]
        
        Port[Port Scan<br/>Discovers open communication ports<br/>Tools: Nessus, OpenVAS<br/>Mitigation: Endpoint security may detect]
        
        Banner[Banner Grabbing<br/>Identifies service type/version<br/>OS, web server, software<br/>Helps attacker find vulnerabilities]
        
        SYN[SYN Scan - Half-open<br/>Sends only SYN packet; no final ACK<br/>Can cause DoS<br/>Mitigation: Proper session timeouts]
        
        Flags[NULL, FIN, Xmas Scans<br/>Various TCP flag combinations<br/>Mitigation: Proper firewall rules]
        
        Sniff[Eavesdropping - Sniffing<br/>Intercept traffic MITM<br/>Tools: Wireshark, tcpdump, Splunk Stream<br/>Mitigation: Encryption + network segmentation]
    end

    subgraph Attack Chain
        Chain1[1. Ping sweep → Find live IPs]
        Chain2[2. Port scan → Find open ports]
        Chain3[3. Banner grab → Identify software versions]
        Chain4[4. Exploit → Target vulnerabilities]
    end

    Recon --> Passive
    Recon --> Active
    Active --> Ping --> Port --> Banner --> SYN --> Flags --> Sniff
    Sniff --> Chain1 --> Chain2 --> Chain3 --> Chain4
```

---

### Video V144: Spoofing and Poisoning Attacks

```mermaid
graph TD
    subgraph Core Concepts
        Spoof[Spoofing - Impersonation/Masquerading<br/>Disguising malicious info/subjects as legitimate]
        Poison[Poisoning - Process of using spoofed information<br/>OSI Focus: Layer 2 Data Link + Layer 3 Network]
    end

    subgraph Types of Spoofing
        Types[IP Spoofing, MAC Spoofing, Route Spoofing<br/>Hyperlink Spoofing, Email Spoofing, Phone Number Spoofing]
    end

    subgraph Key Exam Attacks
        ARP[ARP Spoofing - ARP Cache Poisoning<br/>Protocol: ARP IP→MAC translation<br/>Target: ARP cache<br/>Mechanism: Unsolicited gratuitous ARP replies<br/>Result: Man-in-the-Middle Layer 2]
        
        DNS[DNS Spoofing - DNS Cache Poisoning<br/>Protocol: DNS domain→IP<br/>Target: DNS cache or rogue DNS server<br/>Mechanism: Inject false IP mappings<br/>Result: Victims sent to malicious sites]
    end

    subgraph Best Practices for Mitigation
        M1[Use port security - PBAC]
        M2[Use NIDS and HIDS]
        M3[Use MAC filtering - whitelist trusted MACs]
        M4[Monitor DNS traffic for abuse]
        M5[Split DNS - separate internal/external servers]
        M6[DNS Security - DNSSEC with PKI + digital signatures]
        M7[Limit DHCP - restrict dynamic address pools]
        M8[Encrypt and digitally sign emails]
    end

    Spoof --> Poison --> Types
    Types --> ARP
    Types --> DNS
    ARP --> M1
    DNS --> M2
    M1 --> M2 --> M3 --> M4 --> M5 --> M6 --> M7 --> M8
```

---

### Video V145: Denial of Service (DoS) Attacks

```mermaid
graph TD
    subgraph Definition
        DoS[DoS - Denial of Service<br/>Prevents authorized access to resource/object<br/>Primary Focus: Denying AVAILABILITY]
    end

    subgraph DDoS
        DDoS[DDoS - Distributed Denial of Service<br/>Multiple bots/zombies attack single target]
        Botnet[Botnet: Network of bots<br/>Controlled via C2 - Command & Control server]
        BotMaster[Bot Master: Attacker controlling botnet]
    end

    subgraph Common DoS/DDoS Attacks
        SYN[SYN Flood<br/>Overwhelming SYN packets<br/>TCP handshake initiation to target]
        Ping[Ping Flood<br/>Massive ICMP ping requests<br/>Forcing server responses]
        Buffer[Buffer Overflow<br/>Sending more input than<br/>memory buffer can process → crash]
        DRDoS[DRDoS - Distributed Reflective DoS<br/>Trick machine into replying to itself<br/>Smurf: ICMP echo, Fraggle: UDP echo]
    end

    subgraph Legacy Attacks - Less Effective Today
        Pinger[Ping of Death<br/>Oversized ping packet 65,536 bytes<br/>Exceeds MTU → crash]
        Teardrop[Teardrop Attack<br/>Malformed packets cannot be reassembled<br/>Dropped packets → DoS]
        Land[Land Attack<br/>SYN packet to victim's own IP<br/>Self-reply loop → crash]
    end

    subgraph Defenses
        Modern[Modern OS Windows, macOS, Linux<br/>Built-in defenses against many attacks]
        Policy[Security professionals must enforce policy compliance]
    end

    DoS --> DDoS
    DDoS --> Botnet --> BotMaster
    BotMaster --> SYN --> Ping --> Buffer --> DRDoS
    DRDoS --> Pinger --> Teardrop --> Land
    Land --> Modern --> Policy
```

---

### Bonus: Session 19 Complete Concept Map

```mermaid
mindmap
  root((Network Security & Attacks))
    Firewall Concepts
      Software, not just appliance
      ACLs with Implicit Deny
      Hardware, Virtual, Host-based, WAF
    Firewall Types
      1st Gen: Static Packet Filtering L3
      2nd Gen: Proxy L5/L7
      3rd Gen: Stateful Inspection L3/L4
      NGFW/UTM: Multi-layer
    Firewall Architecture
      Multihomed: multiple interfaces
      Bastion Host: hardened server
      Screened Host: behind firewall
      Screened Subnet: DMZ - 2 firewalls
    IPsec
      Provides: Confidentiality, Integrity, Auth
      Transport: payload only
      Tunnel: entire packet
      AH: integrity, ESP: confidentiality
      L2TP + IPsec for VPN
    Endpoint Security
      Defense in Depth
      HIDS/HIPS, AV, DLP, VPN, patching, hardening
    NAC - 802.1X
      Pre-admission vs Post-admission
      Agent vs Agentless
      In-line vs Out-of-band
      Remediation: quarantine, captive portal
    Reconnaissance Attacks
      Passive OSINT vs Active
      Ping sweep, port scan, banner grab
      SYN scan, NULL/FIN/Xmas scans
      Sniffing
    Spoofing & Poisoning
      ARP spoofing: Layer 2 MITM
      DNS spoofing: Layer 3 cache poisoning
      Mitigations: DNSSEC, Split DNS, port security
    DoS Attacks
      DoS vs DDoS, Botnet
      SYN flood, Ping flood, Buffer overflow, DRDoS
      Legacy: Ping of Death, Teardrop, Land
```
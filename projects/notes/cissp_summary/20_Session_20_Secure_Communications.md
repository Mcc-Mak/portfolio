# Session 20: Secure Communications (CISSP Objective 4.3)

**Videos:** V146 – V151  
**Core Focus:** Remote access security, multimedia collaboration, voice communications (VoIP/PSTN), email security, and backhaul networks.

---

## Video V146 (Outline): Secure Communications (Section Intro)

**Objective:** To introduce the key topics in secure communications for the CISSP exam.

### Topics Covered in this Session
1.  Remote Access Security
2.  Multimedia Collaboration
3.  Voice Communications
4.  Email Security
5.  Backhaul Networks

---

## Video V147: Remote Access Security

**Objective:** To explain remote access methods, authentication (AAA), and security controls.

### I. Definition & Context
- **Remote access:** Accessing organizational resources from outside the facility and outside the organization's control
- **Common scenarios:** Teleworkers, customers, contractors, remote maintenance by third parties

### II. Security Challenges
- No control over remote devices or the internet
- BYOD devices may be less secure or non-compliant
- Unprotected connections expose data and create attack vectors

### III. Remote Access Methods

| Method | Description |
| :--- | :--- |
| **Specific service (direct application)** | Access a single application (e.g., SaaS) |
| **Application portals** | Centralized interface for multiple apps (e.g., captive portal) |
| **Tunneling (VPN)** | Cryptography for confidentiality/integrity over untrusted networks |
| **Remote control** | Full control over a system (Remote Desktop, VDI); direct or via bastion/jump host |
| **Screen scraping** | Extracts displayed data and presents it remotely |
| **Screen sharing** | Remote viewing of a user's screen (e.g., meeting screen share) |

### IV. Remote Access Authentication (AAA)

| Protocol | Transport | Key Features |
| :--- | :--- | :--- |
| **RADIUS** | UDP | Most common, used by ISPs; encrypts password only |
| **Diameter** | TCP / SCTP | Centralized AAA, more reliable |
| **TACACS / TACACS+** | TCP | Supports two-factor authentication; encrypts entire session |

### V. Security Controls & Best Practices
- **Log and audit** all connections
- **Limit access locations** (IP/geolocation filtering)
- **Enforce BYOD policies** (harden devices, ensure compliance)
- **Strong authentication** (multi-factor wherever possible)
- **Encrypt storage** on remote devices
- **Encrypt remote sessions** (VPN)

### VI. Third-Party Considerations
- Signed agreements (MOA, MOU, SLA) before access
- **Least privilege** – minimize privileges, limit access to sensitive data
- **Dedicated interface** – separate network/VPN/captive portal for flow control, auditing, and security

### VII. Exam Takeaways
- Understand purpose of remote access
- Know the methods (direct app, portal, VPN, remote control, scraping, sharing)
- Apply security controls and special considerations for third-party access

---

## Video V148: Multimedia Collaboration

**Objective:** To explain risks and security measures for multimedia collaboration tools.

### I. Definition & Importance
- **Multimedia collaboration:** Enables remote teamwork using shared tools (email, instant messaging, virtual meetings, cloud documents)
- Increasingly prevalent in the modern workplace

### II. Key Tools & Associated Risks

| Tool | Function | Security Considerations |
| :--- | :--- | :--- |
| **Instant Messaging** | Real-time text + file/image/video exchange | Data egress/ingress, antivirus, anti-malware |
| **Remote Meetings** | Virtual meetings, presentations, webinars (e.g., Zoom) | Identification, authentication, authorization; confidentiality of content |

### III. Security Risks
- Unauthorized access to meetings or collaboration tools
- Social engineering attacks via collaboration platforms
- Data leakage from physical environments (e.g., whiteboards in background of video calls)
- Malware/malicious code transferred through shared files
- Improper data retention of archived chats or meeting recordings

### IV. Required Security Measures
- **Defense in depth** – administrative, technical/logical, and physical controls
- **Strong identification, authentication, and access controls**
- **Encryption** of communication channels
- **Scanning** of transferred data for viruses, malware, malicious code
- **Data protection and retention policies** for archived collaboration data
- **Policies** to prevent physical environment disclosure (e.g., clean background)

### V. Exam Takeaways
- Understand the risks of multimedia collaboration
- Implement necessary security measures for all collaboration tools

---

## Video V149: Voice Communications

**Objective:** To explain traditional (PBX/PSTN) and modern (VoIP) voice communications, protocols, attacks, and defenses.

### I. Core Goal
- Prevent unauthorized eavesdropping on human voice conversations

### II. Traditional Systems: PBX and PSTN

| System | Description | Security Risks |
| :--- | :--- | :--- |
| **PBX (Private Branch Exchange)** | Private phone system for local area; connects to PSTN | Eavesdropping via wiretapping |
| **PSTN (Public Switched Telephone Network)** | Infrastructure for public telephone communications; also called POTS | Phone freaking (blue box, red box, black box, white box), toll fraud, physical attacks |

### III. Modern System: VoIP (Voice over IP)

**Key Protocols:**

| Protocol | Description |
| :--- | :--- |
| **RTP (Real-time Transport Protocol)** | UDP-based, no handshake; uses RTCP for QoS |
| **SRTP (Secure RTP)** | Adds encryption, integrity, authentication |
| **ZRTP** | Combines Diffie-Hellman key exchange with SRTP |

**VoIP Attacks:**

| Attack | Description |
| :--- | :--- |
| **Vishing (Voice Phishing)** | Spoofed caller ID + social engineering to trick victims |
| **SPIT (Spam over Internet Telephony)** | Prerecorded robocalls (spam via phone) |
| **VoIP hopping** | Unauthorized access to voice VLAN (tool: VoIP Hopper) |
| **Man-in-the-Middle** | Exploits insecure call managers or devices |

### IV. Defenses for VoIP
- Encrypt communication channels
- Secure network infrastructure (call managers, switches)
- Implement authentication / port security for VoIP devices

### V. Exam Takeaways
- Know PBX/PSTN basics and legacy risks
- Understand VoIP protocols (RTP, SRTP, ZRTP)
- Identify VoIP attacks (Vishing, SPIT, hopping, MITM)
- Recall defenses (encryption, infrastructure security, authentication)

---

## Video V150: Email Security

**Objective:** To explain email protocols, attacks, security techniques, and best practices.

### I. Importance of Email Security
- Primary form of organizational communication
- Emails can serve as legal evidence (SLAs, contracts, civil/criminal trials)

### II. Email Protocols

| Protocol | Function | Security |
| :--- | :--- | :--- |
| **SMTP** | Sends/routes emails | Unsecure by nature (port 25); can use TLS |
| **POP3** | Retrieves emails from server | Unsecure; can use Kerberos |
| **IMAP** | Manages emails on server | Unsecure; can use TLS on port 993 |

### III. Common Email Attacks
- **Spamming** – unsolicited/unwanted messages
- **Masquerading** – attacker pretends to be someone else
- **Phishing** – fraudulent communication with malicious links
- Malware delivery (viruses, worms, logic bombs, ransomware)

### IV. Email Security Techniques & Standards

| Technique | Description |
| :--- | :--- |
| **MOSS** | Encrypts with MD2/MD5 (integrity) + DES/RSA (confidentiality) |
| **PEM** | RSA/DES + digital certificates; provides auth, integrity, confidentiality, non-repudiation; uses X.509 |
| **PGP** | Uses IDEA algorithm (originally RSA); encrypts emails/files |
| **DKIM** | DomainKeys Identified Mail – validates email via domain verification |
| **SPF** | Sender Policy Framework – verifies sender is authorized for SMTP domain |
| **S/MIME** | Encrypts/authenticates with PKCS #7 certificates (X.509 for identity) |

> **Note:** DKIM & SPF are stored as TXT records in DNS.

### V. Best Practices & Policies
- **Acceptable Use Policy (AUP)** – rules, goals, consequences for misuse
- **Strong access controls** on email inboxes
- **Digital signatures** – prevent masquerading, enforce non-repudiation
- **Email filtering** – reduce spam, unauthorized file formats
- **Endpoint security** – protect against code execution from attachments
- **Backup & retention** – comply with governance, regulations, laws

### VI. Exam Takeaways
- Know email security options (S/MIME, certificates, etc.)
- Know email attacks and security measures

---

## Video V151: Backhaul Networks

**Objective:** To explain backhaul links/networks, their purpose, and security best practices.

### I. Definition & Purpose
- **Backhaul network:** Backbone connecting access networks to core networks
- **Backhaul link:** Connects smaller access networks or devices to larger core network
- **Primary function:** Provide bandwidth and connectivity between remote locations and central infrastructure

### II. Architecture Example (Cisco Diagram)
- **Core network:** MPLS core, segment routing
- **Access layers:** Connected to core via backhaul links
- **Related terms (not exam critical):** CRAN (cloud radio access network), Ethernet VPN, fronthaul links (4G/5G)

### III. Security Best Practices

| Practice | Description |
| :--- | :--- |
| **Encryption** | Strong encryption for data in transit (IPsec, TLS) |
| **Access controls** | Strict restrictions for backhaul components and critical infrastructure |
| **Authentication** | Multi-factor where possible; strong single-factor where necessary |
| **Segmentation** | VLANs, secure zones to isolate traffic, limit breach impact, prevent lateral movement |
| **Identity & Access Management** | Authenticate identities before granting access to backhaul equipment |
| **Monitoring** | Logging and real-time monitoring to detect unusual behavior, unauthorized access, IOCs |
| **Intrusion Detection/Prevention (IDPS)** | Deeper threat analysis |

### IV. Exam Takeaways
- Understand the purpose of backhaul links and networks
- Know the network security best practices listed above
- Detailed telco or 5G concepts (CRAN, fronthaul) are **not required** for CISSP

---

## Session 20 Summary

Session 20 covers the **complete secure communications landscape** for the CISSP exam (Objective 4.3). Key takeaways include:

1. **Remote Access Security (V147):** Methods (VPN, remote desktop, portals), AAA protocols (RADIUS, Diameter, TACACS+), security controls (logging, MFA, encryption), third-party considerations (SLAs, least privilege, dedicated interfaces).

2. **Multimedia Collaboration (V148):** Risks (unauthorized access, data leakage, malware) and security measures (defense in depth, encryption, access controls, data retention).

3. **Voice Communications (V149):** Traditional (PBX/PSTN) risks (eavesdropping, phone freaking) vs. VoIP (RTP, SRTP, ZRTP). VoIP attacks: Vishing, SPIT, VoIP hopping, MITM. Defenses: encryption, secure infrastructure, authentication.

4. **Email Security (V150):** Protocols (SMTP, POP3, IMAP), attacks (spam, phishing, masquerading), security techniques (S/MIME, DKIM, SPF, PGP), best practices (AUP, filtering, backup, retention).

5. **Backhaul Networks (V151):** Purpose (connect access to core), security best practices (encryption, access controls, segmentation, monitoring, IDPS).

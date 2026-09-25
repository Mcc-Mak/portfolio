### Video V147: Remote Access Security

```mermaid
graph TD
    subgraph Definition & Context
        RA[Remote Access<br/>Accessing organizational resources<br/>Outside facility and organizational control<br/>Teleworkers, customers, contractors, third-party maintenance]
    end

    subgraph Security Challenges
        C1[No control over remote devices or internet]
        C2[BYOD devices may be less secure]
        C3[Unprotected connections expose data]
    end

    subgraph Remote Access Methods
        M1[Specific service - direct application<br/>Single app access - SaaS]
        M2[Application portals<br/>Centralized interface - captive portal]
        M3[Tunneling - VPN<br/>Cryptography for confidentiality/integrity]
        M4[Remote control<br/>Full system control: Remote Desktop, VDI<br/>Direct or via bastion/jump host]
        M5[Screen scraping<br/>Extracts displayed data, presents remotely]
        M6[Screen sharing<br/>Remote viewing of user's screen]
    end

    subgraph AAA Protocols
        RADIUS[RADIUS - UDP<br/>Most common, used by ISPs<br/>Encrypts password only]
        Diameter[Diameter - TCP/SCTP<br/>Centralized AAA, more reliable]
        TACACS[TACACS/TACACS+ - TCP<br/>Supports two-factor authentication<br/>Encrypts entire session]
    end

    subgraph Security Controls & Best Practices
        BC1[Log and audit all connections]
        BC2[Limit access locations - IP/geolocation filtering]
        BC3[Enforce BYOD policies - harden devices]
        BC4[Strong authentication - MFA]
        BC5[Encrypt storage on remote devices]
        BC6[Encrypt remote sessions - VPN]
    end

    subgraph Third-Party Considerations
        T1[Signed agreements: MOA, MOU, SLA before access]
        T2[Least privilege - minimize privileges]
        T3[Dedicated interface - separate network/VPN/captive portal<br/>Flow control, auditing, security]
    end

    RA --> C1 --> C2 --> C3
    C3 --> M1 --> M2 --> M3 --> M4 --> M5 --> M6
    M6 --> RADIUS --> Diameter --> TACACS
    TACACS --> BC1 --> BC2 --> BC3 --> BC4 --> BC5 --> BC6
    BC6 --> T1 --> T2 --> T3
```

---

### Video V148: Multimedia Collaboration

```mermaid
graph TD
    subgraph Definition
        MC[Multimedia Collaboration<br/>Enables remote teamwork using shared tools<br/>Email, instant messaging, virtual meetings, cloud documents]
    end

    subgraph Key Tools & Risks
        IM[Instant Messaging<br/>Real-time text + file/image/video exchange<br/>Risk: Data egress/ingress, antivirus, anti-malware]
        Meetings[Remote Meetings<br/>Virtual meetings, webinars - Zoom<br/>Risk: Identification, authentication, authorization<br/>Confidentiality of content]
    end

    subgraph Security Risks
        R1[Unauthorized access to meetings/tools]
        R2[Social engineering via collaboration platforms]
        R3[Data leakage from physical environments<br/>Whiteboards in video call backgrounds]
        R4[Malware/malicious code via shared files]
        R5[Improper data retention - archived chats/recordings]
    end

    subgraph Security Measures
        S1[Defense in depth<br/>Administrative + Technical + Physical]
        S2[Strong identification, authentication, access controls]
        S3[Encryption of communication channels]
        S4[Scanning of transferred data for viruses/malware]
        S5[Data protection and retention policies]
        S6[Policies to prevent physical environment disclosure<br/>Clean background requirements]
    end

    MC --> IM
    MC --> Meetings
    IM --> R1
    Meetings --> R2
    R1 --> R3 --> R4 --> R5
    R5 --> S1 --> S2 --> S3 --> S4 --> S5 --> S6
```

---

### Video V149: Voice Communications

```mermaid
graph TD
    subgraph Core Goal
        Goal[Prevent unauthorized eavesdropping<br/>on human voice conversations]
    end

    subgraph Traditional Systems
        PBX[PBX - Private Branch Exchange<br/>Private phone system for local area<br/>Connects to PSTN]
        PSTN[PSTN - Public Switched Telephone Network<br/>Public telephone infrastructure - POTS]
        
        subgraph Legacy Risks
            Eavesdrop[Eavesdropping via wiretapping]
            Phreaking[Phone freaking<br/>Blue box, red box, black box, white box]
            TollFraud[Toll fraud]
            Physical[Physical attacks]
        end
    end

    subgraph VoIP - Voice over IP
        Protocols[Key Protocols:<br/>RTP - UDP-based, no handshake, uses RTCP for QoS<br/>SRTP - Adds encryption, integrity, authentication<br/>ZRTP - Diffie-Hellman + SRTP]
        
        Attacks[VoIP Attacks:<br/>Vishing - Spoofed caller ID + social engineering<br/>SPIT - Spam over Internet Telephony, robocalls<br/>VoIP hopping - Unauthorized access to voice VLAN<br/>MITM - Exploits insecure call managers/devices]
        
        Defenses[Defenses:<br/>Encrypt communication channels<br/>Secure network infrastructure call managers, switches<br/>Authentication/port security for VoIP devices]
    end

    Goal --> PBX
    PBX --> PSTN
    PSTN --> Eavesdrop
    Eavesdrop --> Phreaking --> TollFraud --> Physical
    Physical --> Protocols --> Attacks --> Defenses
```

---

### Video V150: Email Security

```mermaid
graph TD
    subgraph Importance
        Email[Email is primary organizational communication<br/>Can serve as legal evidence<br/>SLAs, contracts, civil/criminal trials]
    end

    subgraph Protocols
        SMTP[SMTP - Sends/routes emails<br/>Unsecure by nature port 25<br/>Can use TLS]
        POP3[POP3 - Retrieves emails from server<br/>Unsecure, can use Kerberos]
        IMAP[IMAP - Manages emails on server<br/>Unsecure, can use TLS on port 993]
    end

    subgraph Common Attacks
        A1[Spamming - unsolicited/unwanted messages]
        A2[Masquerading - attacker pretends to be someone else]
        A3[Phishing - fraudulent communication with malicious links]
        A4[Malware delivery - viruses, worms, logic bombs, ransomware]
    end

    subgraph Security Techniques & Standards
        MOSS[MOSS - Encrypts with MD2/MD5 integrity<br/>+ DES/RSA confidentiality]
        PEM[PEM - RSA/DES + digital certificates<br/>Provides auth, integrity, confidentiality, non-repudiation<br/>Uses X.509]
        PGP[PGP - Uses IDEA algorithm originally RSA<br/>Encrypts emails/files]
        DKIM[DKIM - DomainKeys Identified Mail<br/>Validates email via domain verification]
        SPF[SPF - Sender Policy Framework<br/>Verifies sender authorized for SMTP domain]
        S_MIME[S/MIME - Encrypts/authenticates with PKCS #7<br/>X.509 for identity<br/>Stored as TXT records in DNS]
    end

    subgraph Best Practices
        BP1[AUP - Acceptable Use Policy<br/>Rules, goals, consequences]
        BP2[Strong access controls on email inboxes]
        BP3[Digital signatures - prevent masquerading, non-repudiation]
        BP4[Email filtering - reduce spam, unauthorized file formats]
        BP5[Endpoint security - protect from attachments]
        BP6[Backup & retention - governance, regulations, laws]
    end

    Email --> SMTP --> POP3 --> IMAP
    IMAP --> A1 --> A2 --> A3 --> A4
    A4 --> MOSS --> PEM --> PGP --> DKIM --> SPF --> S_MIME
    S_MIME --> BP1 --> BP2 --> BP3 --> BP4 --> BP5 --> BP6
```

---

### Video V151: Backhaul Networks

```mermaid
graph TD
    subgraph Definition & Purpose
        Backhaul[Backhaul Network<br/>Backbone connecting access networks to core networks<br/>Backhaul Link: Connects smaller access networks/devices<br/>to larger core network<br/>Primary: Bandwidth + connectivity between<br/>remote locations and central infrastructure]
    end

    subgraph Architecture Example
        Core[Core Network<br/>MPLS core, segment routing]
        Access[Access Layers<br/>Connected to core via backhaul links]
        Related[Related terms - not exam critical<br/>CRAN - cloud radio access network<br/>Ethernet VPN, fronthaul links 4G/5G]
    end

    subgraph Security Best Practices
        Encrypt[Encryption<br/>Strong encryption for data in transit<br/>IPsec, TLS]
        AccessCtrl[Access controls<br/>Strict restrictions for backhaul components<br/>and critical infrastructure]
        Auth[Authentication<br/>MFA where possible<br/>Strong single-factor where necessary]
        Segment[Segmentation<br/>VLANs, secure zones to isolate traffic<br/>Limit breach impact, prevent lateral movement]
        IAM[Identity & Access Management<br/>Authenticate identities before<br/>granting access to backhaul equipment]
        Monitor[Monitoring<br/>Logging and real-time monitoring<br/>Detect unusual behavior, unauthorized access, IOCs]
        IDPS[Intrusion Detection/Prevention - IDPS<br/>Deeper threat analysis]
    end

    subgraph For the Exam
        Focus[Understand purpose of backhaul links/networks<br/>Know security best practices<br/>Detailed telco/5G concepts NOT required]
    end

    Backhaul --> Core
    Core --> Access
    Access --> Related
    Related --> Encrypt
    Encrypt --> AccessCtrl --> Auth --> Segment --> IAM --> Monitor --> IDPS
    IDPS --> Focus
```

---

### Bonus: Session 20 Complete Concept Map

```mermaid
mindmap
  root((Secure Communications<br/>CISSP Objective 4.3))
    Remote Access Security
      Methods: Direct app, portals, VPN, remote control, scraping, sharing
      AAA: RADIUS UDP, Diameter TCP, TACACS+ TCP
      Controls: Logging, MFA, encryption, location filtering
      Third-party: MOA/MOU/SLA, least privilege, dedicated interface
    Multimedia Collaboration
      Tools: IM, remote meetings
      Risks: Unauthorized access, social engineering, data leakage, malware
      Measures: Defense in depth, encryption, access controls, scanning, retention
    Voice Communications
      Traditional: PBX, PSTN, phone freaking
      VoIP: RTP, SRTP, ZRTP
      Attacks: Vishing, SPIT, VoIP hopping, MITM
      Defenses: Encryption, secure infrastructure, authentication
    Email Security
      Protocols: SMTP, POP3, IMAP
      Attacks: Spam, masquerading, phishing, malware
      Standards: S/MIME, DKIM, SPF, PGP, PEM, MOSS
      Best Practices: AUP, access controls, digital signatures, filtering, backup
    Backhaul Networks
      Purpose: Connect access networks to core
      Best Practices: Encryption, access controls, authentication, segmentation, IAM, monitoring, IDPS
```
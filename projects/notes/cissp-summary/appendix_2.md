# Differences b/w pdf and videos
Mentioned in `ISC2+CISSP24+Study+Guide.pdf` but not in videos.

## Session 18 – Secure Network Design

### V129: Transport Architecture – Architecture Planes and Topologies (Pages 298-300)

**PDF Content:**

> **Transport Architecture**
> - **Data Plane:** Manages the actual data transmission between devices
> - **Control Plane:** Controls routing and switching, making decisions about data paths based on configured routes and logic
> - **Management Plane:** Handles network management, configuration, and monitoring
> - **Network Topologies:** Point-to-Point (direct connection), Bus (single central cable), Star (central hub), Ring (each device connects to two others), Mesh (every device connects to every other device)
> - **Security and Network Resilience:** Encryption and access controls for data in transit; fault tolerance strategies like redundant systems and automatic failover mechanisms

### V130: Performance Metrics – SNR (Pages 301-303)

**PDF Content:**

> **Performance Metrics – Signal-to-Noise Ratio (SNR)**
> - **Definition:** Compares the level of the desired signal to the level of background noise, expressed in decibels (dB)
> - **Higher SNR values** indicate a clearer signal with less interference
> - **Crucial for wireless networks** to minimize errors and improve reliability
> - **Throughput:** Actual data transmitted or received, influenced by bandwidth, latency, and packet loss
> - **Bandwidth:** Maximum data transmission capacity (Mbps/Gbps)
> - **Latency:** Time delay in data transmission (ms), critical for real-time applications
> - **Jitter:** Variation in time delay in packet delivery, affecting VoIP and video streaming

---

## Session 19 – Network Security and Attacks

### V138: Types of Firewalls – NGFW Deep Packet Inspection (Page 317)

**PDF Content:**

> **Next Generation Firewall (NGFW)**
> - Incorporates features of traditional and application-level firewalls
> - **Additional capabilities:** Intrusion prevention, deep packet inspection
> - **Application awareness:** Identifies applications regardless of port
> - **User identity-based controls:** Enforces policies based on user identity
> - **Full-stack visibility:** Comprehensive monitoring across all layers
> - **Threat intelligence:** Integrates real-time threat data for proactive defense

### V139: Firewall Architecture – In-line vs. Out-of-band (Pages 318-320)

**PDF Content:**

> **Firewall Deployment Architectures**
> - **In-line NAC/Firewall:** Positioned directly in the network traffic flow, actively monitoring and controlling all data passing through
> - **Out-of-band NAC/Firewall:** Operates alongside the network, monitoring access and applying policies without disrupting traffic flow
> - **Multi-Homed Firewalls:** Multiple network interfaces (external/untrusted and internal/trusted)
> - **Bastion Host:** Special-purpose computer configured to withstand attacks; placed in DMZ
> - **Screened Host:** Incorporates screening router with host behind firewall for additional inspection
> - **Screened Subnet (DMZ):** Two firewalls with DMZ positioned between them for external-facing services

### V140: IP Security – Transport vs. Tunnel Mode (Pages 322-323)

**PDF Content:**

> **IPsec Operational Modes**
> - **Transport Mode:** Encrypts only the payload of the IP packet, leaving the header unencrypted. Less secure but more efficient. Exposes metadata about the communication.
> - **Tunnel Mode:** Encrypts both the payload and the header of the IP packet, providing complete security at the cost of higher resource consumption.
> - **Security Associations (SAs):** Dictate the security protocols and algorithms used in an IPsec connection
> - **ISAKMP:** Handles creation, negotiation, modification, and deletion of Security Associations

### V145: Denial of Service Attacks – Reflection & Amplification (Page 333)

**PDF Content:**

> **Reflection and Amplification Attacks**
> - **Smurf Attack:** Spoofs the victim's IP address and broadcasts large numbers of ICMP packets to network devices, which reply to the victim (ICMP Echo)
> - **Fraggle Attack:** Similar to Smurf but uses UDP echo packets instead, causing a flood of responses to the victim (UDP Echo)
> - **SYN Flood:** Exploits TCP handshake by sending numerous SYN packets, exhausting server resources
> - **Ping Flood:** Inundates target with ICMP Echo Request packets to consume bandwidth
> - **Buffer Overflow:** Sends more data than a buffer can handle, leading to system crashes

### V144: Spoofing and Poisoning Attacks – Mitigation (Pages 331-332)

**PDF Content:**

> **Spoofing and Poisoning – Defensive Measures**
> - **Port Security and MAC Filtering:** Restricts network access to authorized devices only
> - **Network Segmentation:** Separates critical network segments to limit spread of spoofed packets
> - **DNS Security Enhancements (DNSSEC):** Provides authentication for DNS responses to prevent DNS spoofing
> - **Regular Monitoring and Updating:** Ensures security devices and software are up-to-date
> - **IP Spoofing:** Manipulates IP address in packet headers to appear as trusted source
> - **MAC Spoofing:** Changes media access control address to bypass access controls
> - **ARP Spoofing/Poisoning:** Misleads network devices about actual MAC address associated with IP
> - **DNS Spoofing/Poisoning:** Alters DNS records to redirect traffic to malicious sites

---

## Session 20 – Secure Communications

### V147: Remote Access Security – RADIUS vs. TACACS+ (Pages 335-336)

**PDF Content:**

> **Remote Access Authentication Protocols**
> - **RADIUS (Remote Authentication Dial-In User Service):** UDP-based, encrypts only the password; session data remains unencrypted; used by ISPs
> - **TACACS+ (Terminal Access Controller Access-Control System Plus):** TCP-based, encrypts the entire communication session; supports multi-factor authentication
> - **Diameter:** Enhanced version of RADIUS with greater flexibility; uses TCP or SCTP; does not natively encrypt (can use IPSec/SSL/TLS)

### V150: Email Security – MOSS, PEM, PGP, S/MIME (Pages 343-344)

**PDF Content:**

> **Email Encryption Standards**
> - **MOSS (MIME Object Security Services):** Uses cryptographic hash functions (MD5) and encryption algorithms like DES for securing email messages
> - **PEM (Privacy Enhanced Mail):** Implements encryption and digital certificates for comprehensive email security
> - **PGP (Pretty Good Privacy):** Secures emails by encrypting message contents; widely recognized for robustness
> - **S/MIME (Secure/Multipurpose Internet Mail Extensions):** Uses digital certificates to ensure email authenticity, confidentiality, and integrity
> - **DKIM (DomainKeys Identified Mail):** Helps verify the domain of the sender to prevent email spoofing
> - **SPF (Sender Policy Framework):** Validates email senders by verifying sender IP addresses against DNS records

---

## Session 21 – Wireless Networking

### V153: Wireless Networks – IEEE 802.11 Standards (Pages 347-348)

**PDF Content:**

> **IEEE 802.11 Standards (WLAN)**
> - **802.11a:** 54 Mbps @ 5 GHz
> - **802.11b:** 11 Mbps @ 2.4 GHz
> - **802.11g:** 54 Mbps @ 2.4 GHz
> - **802.11n:** >200 Mbps @ 2.4 or 5 GHz
> - **802.11ac:** 1 Gbps @ 5 GHz
> - **Modulation:** Technique of changing information on the radio frequency
> - **Spread Spectrum Types:** FHSS (randomly changes frequencies) and DSSS (divides data among multiple frequencies with chipping code)
> - **OFDM:** Divides data into multiple substreams transmitted over separate channels

### V155: Wireless Network Security – WPA3 SAE (Pages 351-352)

**PDF Content:**

> **WPA3 (Wi-Fi Protected Access III)**
> - Uses 192-bit AES encryption in enterprise mode
> - Uses 128-bit AES in personal mode
> - **SAE (Simultaneous Authentication of Equals):** Provides secure key exchange in WPA3-Personal mode
> - **WPA2:** Uses CCMP based on AES, 128-bit key (current standard)
> - **WPA:** Uses TKIP with RC4 (broken)
> - **WEP:** Uses RC4 cipher (broken, deprecated)

### V155: Wireless Network Security – Bluetooth Attacks (Page 353)

**PDF Content:**

> **Bluetooth Security Threats**
> - **Bluejacking:** Sending unsolicited messages to collect data from a device
> - **BlueSnarfing:** Forcing a Bluetooth connection to access stored data (calls, messages)
> - **BlueBugging:** Gaining control of a device to execute commands without the user's knowledge

---

## Session 22 – Identity Management

### V158: Establishing Identity – Identity Assurance Levels (IAL) (Pages 358-359)

**PDF Content:**

> **Identity Assurance Levels (IAL)**
> - **Level 1:** Self-asserted attributes without validation; suitable for low-security access; can be done remotely
> - **Level 2:** Requires evidence supporting the existence of the claimed identity; preferred to be done in person; example: guest user account
> - **Level 3:** Physical presence required; suitable for high-security roles such as system administrators; may include background checks
> - **Identity Proofing Steps:** Resolution (collection of attributes) → Validation (authenticate evidence) → Verification (link claimed identity to real-life existence)

### V160: Federated Identity Management – SAML Components (Pages 362-363)

**PDF Content:**

> **SAML (Security Assertion Markup Language) Components**
> - **Identity Provider (IdP):** Authenticates the identity of the subject
> - **Service Provider (SP):** Provides services or resources based on authentication from the Identity Provider
> - **Principal (Subject):** The entity requesting access to a service/resource
> - **Assertions:** Statements made by the Identity Provider about a subject's authentication, attributes, and authorization
> - **Protocol:** Defines how requests for identities are made and how information is exchanged
> - **Bindings:** Specifies how SAML protocol is transported within existing protocols like HTTP or SOAP

---

## Session 23 – Authentication Mechanisms

### V164: Authentication Systems – LDAP LDIF Fields (Pages 368-370)

**PDF Content:**

> **LDAP Data Formats (LDIF Fields)**
> - **DN (Distinguished Name):** Uniquely identifies a subject using multiple fields; collection of all LDIF fields
> - **CN (Common Name):** Represents the user's full name or an account name
> - **OU (Organizational Unit):** Represents user groups or departments
> - **DC (Domain Component):** Represents the domain (e.g., example.com)
> - **LDAP Ports:** 389 (unencrypted), 636 (encrypted/LDAPS)

### V166: Biometric Authentication – Type I vs. Type II Errors (Pages 378-379)

**PDF Content:**

> **Biometric System Errors**
> - **Type I Error (False Rejection Rate - FRR):** Occurs when an authorized subject is mistakenly rejected by the system (failure in system recognition)
> - **Type II Error (False Acceptance Rate - FAR):** Occurs when an unauthorized subject is mistakenly accepted by the system (security violation)
> - **Crossover Error Rate (CER):** The point where FRR and FAR are equal; also called Equal Error Rate (EER); used to tune biometric systems for balanced accuracy and security
> - **Biometric Enrollment:** Collect and store biometric data as hash values; enrollment should take two minutes or less

### V169: Kerberos – Golden Ticket vs. Silver Ticket (Pages 383-384)

**PDF Content:**

> **Kerberos Tickets**
> - **TGT (Ticket Granting Ticket) / Golden Ticket:** Verifies initial authentication to the KDC; essential for initiating single sign-on
> - **Service Ticket / Silver Ticket:** Provides encrypted evidence of the subject's authorization to access specific resources or services
> - **Key Distribution Center (KDC):** Trusted third-party server issuing and storing secret session keys
> - **Authentication Server (AS):** Authenticates a subject's account using the TGT
> - **Ticket Granting Service (TGS):** Verifies TGT, provides Service Tickets and session keys

### V172-V173: Access Control Models – Comparison Table (Pages 389-393)

**PDF Content:**

> **Access Control Models Comparison**
> - **DAC (Discretionary Access Control):** Access based on subject's identity; object owner determines access rights; uses ACL
> - **MAC (Mandatory Access Control):** Non-discretionary; uses security labels on subjects and objects; access based on clearance level
> - **RBAC (Role-Based Access Control):** Access based on group membership and privileges; common in organizations
> - **ABAC (Attribute-Based Access Control):** Controls access based on multiple attributes (clearance, department, location); uses XACML
> - **Rule-Based Access Control:** Access controlled based on predefined rules or restrictions; used in firewalls and IPS
> - **Risk-Based Access Control:** Dynamically grants or denies access based on calculated risk level (device, location, behavior)

---

## Session 25 – Security Tests and Assessments

### V188: Vulnerability Assessments – SCAP Components (Pages 418-419)

**PDF Content:**

> **SCAP (Security Content Automation Protocol) Components**
> - **XCCDF (Extensible Configuration Checklist Description Format):** Provides security checklists and benchmark results
> - **OVAL (Open Vulnerability and Assessment Language):** Configuration information, machine states, and assessment reporting
> - **OCIL (Open Checklist Interactive Language):** Information exchange format (less commonly used)
> - **CPE (Common Platform Enumeration):** Identifies hardware, OS, applications
> - **CVE (Common Vulnerabilities and Exposures):** Identifies software flaws
> - **CVSS (Common Vulnerability Scoring System):** Provides relative severity score based on Attack Vector, Complexity, Privileges, User Interaction, CIA impacts

### V197: Compliance Testing – SOC Reports (Page 434)

**PDF Content:**

> **SOC Report Types (SSAE 18)**
> - **SOC 1:** Internal Control over Financial Reporting (ICFR); used for SOX compliance; restricted to management/auditors
> - **SOC 2:** Security, availability, integrity, confidentiality, privacy (Trust Service Criteria); highly restricted (NDA required)
> - **SOC 3:** General use, public summary of SOC 2 Type II; freely distributable
> - **Type I:** Point-in-time evaluation (snapshot) – suitability of control design
> - **Type II:** Over a period of time (4-6 months) – operating effectiveness

### V197: Compliance Testing – PCI DSS Merchant Levels (Pages 434-435)

**PDF Content:**

> **PCI DSS Merchant Levels**
> - **Level 1:** More than 6 million transactions per year → Report on Compliance (ROC) by Qualified Security Assessor (QSA)
> - **Level 2:** 1 to 6 million transactions per year → Self-Assessment Questionnaire (SAQ)
> - **Level 3:** 20,000 to 1 million transactions per year → SAQ
> - **Level 4:** Less than 20,000 transactions per year → SAQ

### V197: Compliance Testing – CSA STAR Levels (Page 435)

**PDF Content:**

> **CSA STAR Assurance Levels**
> - **Level 1:** Self-assessment for low-risk data environments; cost-effective way to improve trust
> - **Level 2:** Third-party audit for regulated or higher-risk data environments; required for medium/high-risk deployments or regulated data (e.g., SOC, GDPR compliance)

---

## Session 26 – Conducting Security Testing

### V189: Vulnerability Scanning – CVSS Score Components (Page 419)

**PDF Content:**

> **CVSS (Common Vulnerability Scoring System) Metrics**
> - **Attack Vector:** How the vulnerability is exploited (network, adjacent, local, physical)
> - **Attack Complexity:** Conditions beyond attacker's control (low/high)
> - **Privileges Required:** Level of privileges needed to exploit
> - **User Interaction:** Whether another user must participate
> - **Confidentiality/Integrity/Availability Impacts:** Potential impact on CIA triad
> - Base score (e.g., 7.3) defines severity (critical, high, medium, low)

### V197: Compliance Testing – CSA STAR Levels (Page 435)

**PDF Content:**

> **CSA STAR (Cloud Security Alliance Security Trust Assurance and Risk)**
> - **Level 1:** Self-assessment for low-risk data environments; cost-effective transparency
> - **Level 2:** Third-party audit for regulated or higher-risk data environments; required for medium/high-risk deployments

---

## Session 27 – Detective and Preventative Measures

### V203: IDS/IPS Systems – Detection Types (Page 449)

**PDF Content:**

> **IDS/IPS Detection Types**
> - **Knowledge-Based Detection (Signature-Based):** Compares monitored events with known attack signatures; requires constant updates; also called pattern matching detection
> - **Behavior-Based Detection (Anomaly-Based):** Compares current activity against profiles of normal activity; requires learning period; prone to false positives; also called heuristic-based or statistical intrusion detection
> - **Stateful Protocol Analysis:** Analyzes events against current communication protocol states; uses vendor-provided signature profiles to detect protocol anomalies

### V203: IDS/IPS Systems – Deployment Types (Pages 449-450)

**PDF Content:**

> **IDS/IPS Deployment Types**
> - **NIDS/NIPS (Network-Based):** Monitors and analyzes network-wide activity; IPS must be in line with traffic
> - **HIDS/HIPS (Host-Based):** Monitors specific host activity; cannot analyze network-level threats or misconfigurations
> - **WIDS/WIPS (Wireless):** Monitors wireless network traffic for protocol-related anomalies
> - **NBA (Network Behavior Analysis):** Examines network traffic for unusual communication patterns

### V205: Malicious Software – Malware Types (Pages 453-454)

**PDF Content:**

> **Types of Malware**
> - **Worms:** Self-contained, replicate independently without human intervention
> - **Logic Bombs:** Activate under specific conditions (timer, file opening)
> - **Trojan Horses:** Disguised as legitimate applications; install malware upon execution
> - **Ransomware:** Encrypts data and demands ransom for decryption key
> - **Keyloggers:** Record keystrokes to capture sensitive information
> - **Spyware:** Monitors and collects data from remote computers
> - **Adware:** Collects user interest data; less nefarious but can expose personal information
> - **Bots:** Malware-infected computers controlled by attackers (botnet for DDoS)
> - **Viruses:** Attach to legitimate applications, designed to infect and spread widely

### V206: Anti-Malware – On-Access vs. On-Demand Scanning (Page 456)

**PDF Content:**

> **Anti-Malware Scanning Types**
> - **On-Access Scanning:** Scans files automatically upon download or execution (recommended for untrusted sources)
> - **On-Demand Scanning:** Scans files manually when requested by the user (for trusted sources)
> - **Quarantine:** Isolates suspicious files in a sandbox for further analysis
> - **Disinfect:** Attempts to remove malware from infected files (not always possible)
> - **Signature-Based Detection:** Compares files against known malware signatures from vendor database
> - **Heuristic-Based Detection:** Analyzes malware behavior (static or dynamic)

### V207: Artificial Intelligence Tools – AI Levels (Pages 457-458)

**PDF Content:**

> **Three Levels of AI**
> - **Narrow AI (Weak AI):** Focuses on a single task, no transfer of learning across tasks; examples: virtual assistants (Siri, Alexa), chatbots, automated processes
> - **Artificial General Intelligence (AGI):** Mimics human intelligence, handles complex tasks; seeks to equate computer and human intelligence for problem-solving
> - **Artificial Superintelligence (ASI):** Future goal where AI surpasses human intelligence levels

### V207: Artificial Intelligence Tools – Machine Learning Types (Pages 458-459)

**PDF Content:**

> **Machine Learning Types**
> - **Supervised Learning:** Uses labeled data to train algorithms; relies on human-provided data for pattern detection; risk of bias from labeled data
> - **Unsupervised Learning:** Analyzes unlabeled data, uses clustering to find hidden patterns; used for anomaly detection, APT detection
> - **Semi-Supervised Learning:** Combines labeled and unlabeled data; balances specificity and data exploration
> - **Reinforcement Learning:** Uses positive/negative feedback loops to refine decision-making; example: autonomous driving (Tesla)

---

## Session 28 – Logging and Monitoring

### V209: Logging and Monitoring – Syslog Facility Codes & Severity (Pages 426-427)

**PDF Content:**

> **Syslog Facility Codes and Severity Levels**
> - **Facility codes:** auth=4 (security/authorization), authpriv=10 (privileged auth messages)
> - **Severity levels:** 0=Emergency, 1=Alert, 2=Critical, 3=Error, 4=Warning, 5=Notice, 6=Info, 7=Debug
> - **Common configuration:** Level 5 (Notice) or Level 6 (Information) for regulatory standards
> - **Syslog weakness:** No built-in authentication mechanism

### V209: Logging and Monitoring – NTP Stratum Levels (Page 427)

**PDF Content:**

> **NTP Stratum Levels**
> - **Stratum 0:** Most accurate (GPS satellites, atomic clocks, radio signals) – reference clock
> - **Stratum 1:** Network appliance connected to Stratum 0
> - **Stratum 2:** Individual computers
> - **For logging, use Stratum 0 or 1** (not Stratum 2) for accurate chronological audit trails
> - **NTP port:** 123 (UDP), connectionless

### V210: SIEM – SIM vs. SEM (Pages 466-467)

**PDF Content:**

> **SIEM Components**
> - **SIM (Security Information Manager):** Collects and aggregates logs and messages from hosts to a central repository
> - **SEM (Security Event Manager):** Correlates, analyzes, and monitors logs for potential security events
> - **Combined:** Together they form SIEM, a unified tool capable of collection, aggregation, and correlation for threat detection
> - **Agent-based:** Specialized software on each host sends logs to SIEM
> - **Agentless:** Receives logs directly from systems without additional software

### V212: MITRE ATT&CK Framework – 14 Tactics (Pages 472-474)

**PDF Content:**

> **MITRE ATT&CK Framework – 14 Tactics**
> - **Reconnaissance:** Gathering information through passive means, OSINT, phishing
> - **Resource Development:** Identifying attack vectors and assets for potential exploitation
> - **Initial Access:** First entry point to the system
> - **Execution:** Running malicious code or scripts
> - **Persistence:** Maintaining access by manipulating accounts or processes
> - **Privilege Escalation:** Gaining higher access privileges
> - **Defense Evasion:** Avoiding detection by IDS or endpoint security
> - **Credential Access:** Acquiring credentials for further access
> - **Discovery:** Locating more resources or systems to exploit
> - **Collection:** Gathering target data
> - **Command & Control:** Taking control of compromised systems
> - **Exfiltration:** Transferring stolen data out of the organization
> - **Impact:** Affecting system operations or compromising CIA

### V213: Cyber Kill Chain – 7 Stages (Pages 477-479)

**PDF Content:**

> **Cyber Kill Chain – 7 Stages**
> - **Reconnaissance:** Gather information passively (OSINT)
> - **Weaponization:** Create exploit tailored to target vulnerabilities
> - **Delivery:** Deliver exploit via phishing emails, malicious websites, or USB drives
> - **Exploitation:** Activate exploit to gain access or control
> - **Installation:** Install malware or backdoors for persistent foothold
> - **Command & Control (C2):** Establish secure communication channel with compromised systems
> - **Actions on Objectives:** Execute primary goal (data exfiltration, destruction, disruption)

### V214: SOAR – Playbook vs. Runbook (Pages 482-483)

**PDF Content:**

> **SOAR (Security Orchestration, Automation, and Response)**
> - **Playbook:** A set of predefined actions to investigate and respond to incidents automatically; standardizes the response process (e.g., phishing, malware detection)
> - **Runbook:** A script that calls one or more playbooks and manages their execution; functions as a master sequence or "cookbook"
> - **Example:** A phishing alert triggers a runbook that calls playbooks for email analysis, IP reputation checks, and user notification
> - **Benefits:** Reduces manual workload, minimizes human error, faster response times

---

## Session 29 – Configuration Management

### V217: Configuration Management – NIST SP 800-128 Four Phases (Pages 489-491)

**PDF Content:**

> **NIST SP 800-128 Configuration Management Four Phases**
> - **Planning Phase:** Identify configuration items (CIs), create CM policy, establish Change Control Board (CCB)
> - **Identifying & Implementing Phase:** Define secure baseline configuration, use versioning, provisioning, automation (Chef, Puppet, Ansible)
> - **Controlling Phase:** Conduct security impact assessments for changes, update CM plan and baseline documentation
> - **Monitoring Phase:** Analyze compliance with approved baselines using integrity tools (AIDE, Tripwire), discovery/vulnerability scans

### V233: Disaster Recovery Strategies – RAID Levels (Pages 528-529)

**PDF Content:**

> **RAID (Redundant Array of Independent Disks) Levels**
> - **RAID 0 (Striping):** Data divided across multiple disks, no fault tolerance, performance only
> - **RAID 1 (Mirroring):** Identical data on two disks, high resilience and security, resource-intensive
> - **RAID 5 (Striping with Parity):** Requires three or more disks, data can be restored using parity information, slower if a disk fails
> - **RAID 10 (Stripe of Mirrors):** Combines striping and mirroring, uses four or more disks

### V233: Disaster Recovery Strategies – Power Protection (Pages 529-530)

**PDF Content:**

> **Power Protection Solutions**
> - **UPS (Uninterruptible Power Supply):** Short-term battery backup; provides uninterrupted power for a short duration; types: Standby (offline), Line Interactive, Online (Double Conversion)
> - **Generator:** Motor-operated machine for long-term power backup; requires fuel supply and regular maintenance
> - **Voltage Regulators:** Maintain consistent voltage levels
> - **Line Conditioners:** Improve electricity quality
> - **Surge Protectors:** Protect devices from power surges

### V233: Disaster Recovery Strategies – Failover Cluster vs. Load Balancing (Page 529)

**PDF Content:**

> **Server Protection Methods**
> - **Failover Cluster:** Two or more servers/nodes connected to maintain availability during a failure; if one fails, others take over the workload
> - **Load Balancing:** Distributes network traffic among multiple servers to increase response times and system resilience

---

## Session 30 – Incident Management

### V223: Incident Management – NIST SP 800-61 Steps (Pages 505-507)

**PDF Content:**

> **NIST SP 800-61 Incident Response Steps**
> - **Preparation:** Establish incident handling policy, define incidents, set priorities, form IRT, deploy tools
> - **Detection & Analysis:** Use system logs, IDS/IPS, endpoint security, personnel reports; triage to confirm security incidents
> - **Response:** Activate IRT based on severity; identify, collect, and handle evidence; document thoroughly
> - **Mitigation:** Contain incident to limit damage; block threat sources (IP, port)
> - **Reporting:** Generate detailed reports for internal (management) and external (regulatory) audiences
> - **Recovery:** Restore systems temporarily to operational state; activate BCP/DRP if needed
> - **Remediation:** Restore systems to full operational status; repair damage, address legal/financial impacts
> - **Lessons Learned:** Analyze incident handling, identify gaps, update response plans

### V226: Evidence Collection and Handling – Evidence Types (Pages 513-514)

**PDF Content:**

> **Types of Evidence**
> - **Real Evidence:** Tangible objects (fingerprints on keyboard, video recording, screen scrape)
> - **Documentary Evidence:** Written records (audit logs, entry/exit logs) – must be authenticated
> - **Testimonial Evidence:** Verbal or written witness statements
> - **Direct Evidence:** Witness directly observed the offense
> - **Hearsay Evidence:** Secondhand knowledge ("someone told me")
> - **Opinion Evidence:** Statements from subject matter experts
> - **Circumstantial Evidence:** Facts that, when combined, suggest an incident occurred
> - **Corroborative Evidence:** Supports or validates other evidence (video + logs)

### V226: Evidence Collection and Handling – Chain of Custody (Pages 514-515)

**PDF Content:**

> **Chain of Custody Documentation Requirements**
> - **What** was transferred (hard drive, logs, thumb drive)
> - **To whom** it was transferred
> - **When** (date/time to seconds)
> - **How** (physical, digital, envelope)
> - **Signatures** from both parties for each handoff
> - Essential for proving evidence remained untampered from collection to court

### V227: Digital Forensics – eDiscovery Reference Model (Pages 516-517)

**PDF Content:**

> **eDiscovery Reference Model Steps**
> - **Information Governance:** Ensures organized information for eDiscovery tasks; policies, processes, compliance
> - **Identify:** Locate potential sources of evidence
> - **Preserve:** Protect information from alteration, deletion, or changes (ensures data integrity)
> - **Collect:** Gather necessary information for forensic process
> - **Process:** Screen and process collected information for relevance
> - **Review:** Evaluate information for relevance to investigation
> - **Analyze:** Determine significance and implications of data
> - **Produce:** Format information for consumption (investigators, managers, court)
> - **Presentation:** Use information in court or by investigative parties

---

## Session 31 – Business Continuity and Disaster Recovery

### V230: Business Continuity Planning – NIST SP 800-34 Seven Steps (Pages 522-523)

**PDF Content:**

> **NIST SP 800-34 Business Continuity Planning Seven Steps**
> - **Step 1:** Develop Contingency Planning Policy Statement – formal policy, direction, roles, executive support
> - **Step 2:** Conduct Business Impact Analysis (BIA) – identify critical systems, RTO/RPO
> - **Step 3:** Identify Preventive Controls – reduce failure risk (fire suppression, UPS, patching)
> - **Step 4:** Develop Contingency Strategies – define recovery methods (hot site, cloud failover)
> - **Step 5:** Develop Information System Contingency Plan – actionable DRP/COOP with procedures
> - **Step 6:** Ensure Plan Testing, Training & Exercises – validate plan via drills, simulations
> - **Step 7:** Ensure Plan Maintenance – regular reviews/updates due to changes

### V231: Business Impact Analysis – MTD, RTO, RPO, WRT (Pages 523-525)

**PDF Content:**

> **BIA Metrics**
> - **MTD (Maximum Tolerable Downtime):** Absolute maximum time a critical asset/process can be down before impacting business
> - **RTO (Recovery Time Objective):** Planned time to restore critical asset/process (must be < MTD)
> - **RPO (Recovery Point Objective):** Point in time to recover operations, determined by backup availability; acceptable data loss
> - **WRT (Work Recovery Time):** Extra time for business to resume fully after IT restoration
> - **Formula:** RTO + WRT ≤ MTD

### V234: Disaster Recovery Sites – Comparison Table (Pages 531-532)

**PDF Content:**

> **Disaster Recovery Sites Comparison**
> - **Cold Site:** Empty room/warehouse, no computing equipment; lowest cost; activation: days to weeks
> - **Warm Site:** Pre-configured computing equipment, basic infrastructure; moderate cost; activation: ~12 hours
> - **Hot Site:** Full suite of equipment, near real-time data; highest cost; activation: minutes to hours
> - **Mobile Site:** Self-contained in trailer/container; typically configured as warm site; transportable
> - **Cloud Managed Recovery Site:** Hosted on AWS/Azure/Google Cloud; warm or hot; requires SLA
> - **Shared Site:** Shared with external organizations; Mutual Assistance Agreement (MAA); rare due to data sensitivity

### V235: Data Backup Strategies – Backup Types (Pages 533-534)

**PDF Content:**

> **Backup Types Comparison**
> - **Full Backup:** Complete copy of all system data; sets archive bit to 0; large, infrequent (e.g., Sundays)
> - **Differential Backup:** Backs up changes since last full backup; does NOT reset archive bit; medium size
> - **Incremental Backup:** Backs up changes since any last backup (full/diff/inc); resets archive bit to 0; small, frequent

### V235: Data Backup Strategies – 3-2-1 Backup Rule (Page 534)

**PDF Content:**

> **3-2-1 Backup Rule**
> - **3** copies of data
> - **2** copies stored on different storage media (on-premise)
> - **1** copy stored off-premise
> - **Electronic Vaulting:** Remote journaling (logs/metadata off-site) and remote mirroring (real-time streaming)

### V237: Disaster Recovery Testing – Test Types (Pages 538-540)

**PDF Content:**

> **Disaster Recovery Test Types**
> - **Read-through Test (Checklist Test):** DR team reviews DRP for roles, responsibilities, processes; no production impact
> - **Walkthrough Test (Tabletop):** Personnel gather to rehearse DRP procedures; discuss scenarios; no production impact
> - **Simulation Test (Preparedness Test):** Physically simulates disaster scenarios on-premise; drills (fire alarms, evacuation); no relocation; no production impact
> - **Parallel Test:** Activates recovery site using DRP while primary site maintains operations; live practice without impact; no production impact
> - **Full Interruption Test:** Simulates disaster by migrating primary operations to recovery site; impacts production; requires senior management authorization; conducted off-hours

---

## Session 32 – Software Development Security

### V239: Software Development Lifecycle – SDLC Phases (Pages 543-544)

**PDF Content:**

> **NIST SP 800-64 SDLC Five Phases**
> - **Initiation:** Define need, purpose, requirements; conduct Privacy Impact Assessment (PIA); decide build vs. buy
> - **Development & Acquisition:** Assess risks; determine security/privacy controls; update security documentation
> - **Implementation & Assessment:** Obtain stakeholder approval; securely deploy to production; conduct security assessment/audit
> - **Operations & Maintenance (O&M):** Apply configuration management and change control; continuously monitor security controls
> - **Disposal:** Decommission system; sanitize/declassify data; follow CM procedures; document for audit

### V240-V241: Software Development Methodologies – Comparison (Pages 549-550)

**PDF Content:**

> **Development Methodologies Comparison**
> - **Waterfall Model:** Sequential, repetitive; requires requirements upfront; suitable for critical/sensitive applications
> - **Spiral Model:** Revisits development phases multiple times; ideal for large, complex projects needing quick response to changes
> - **Incremental Build Model:** Builds software in smaller increments; faster than waterfall with flexibility for scope changes
> - **Cleanroom Model:** Strict engineering processes for defect prevention; formal, rigorous quality control
> - **JAD Model (Joint Application Development):** Continuous user-developer interaction; short development timeframes
> - **RAD Model (Rapid Application Development):** Fast development/deployment/feedback; best for R&D and proof-of-concept

### V242: Agile Development – 12 Principles (Pages 551-552)

**PDF Content:**

> **Agile Manifesto – 12 Principles**
> 1. Customer satisfaction as highest priority
> 2. Welcome requirement changes, even late in development
> 3. Deliver frequently (working software)
> 4. Business and developers team together
> 5. Build projects around motivated people
> 6. Face-to-face communication preferred
> 7. Working software defines progress
> 8. Sustainable development (constant pace)
> 9. Technical excellence and good design enhance agility
> 10. Simplicity (maximize work not done)
> 11. Self-organized teams
> 12. Regular reflection and adjustment

### V242: Agile Development – Scrum Roles (Pages 551-552)

**PDF Content:**

> **Scrum Roles**
> - **Product Owner:** Defines goals, objectives, and project scope
> - **Scrum Master:** Manages Agile process, removes impediments (roadblocks), supports team
> - **Development Team:** Self-managed, self-organized team creating product increments based on Definition of Done (DoD)
> - **Sprint:** Time-boxed iteration (1-4 weeks) for planning, development, and review
> - **Daily Scrum:** 5-15 minute daily meetings for completed work, upcoming work, and roadblocks

### V243: DevOps and DevSecOps – DevSecOps Manifesto (Page 555)

**PDF Content:**

> **DevSecOps Manifesto Principles**
> - **Lean In:** Security listens and collaborates rather than just rejecting ideas
> - **Data and Science over Fear, Uncertainty, and Doubt**
> - **Open Contribution and Collaboration** over strict security requirements
> - **Consumable Security Services with APIs** over mandated controls and paperwork
> - **Business-Driven Security Scores** over token approvals
> - **Red and Blue Team Testing** over sole reliance on scans
> - **24/7 Proactive Security Monitoring** over reactive incident response
> - **Shared Threat Intelligence** over isolated knowledge
> - **Compliance Operations** over mere checklists

### V243: DevOps and DevSecOps – CI/CD Pipeline Security (Page 556)

**PDF Content:**

> **Security in CI/CD Pipelines**
> - **Version control:** Be on change control board
> - **Build:** Build in controls and requirements
> - **Testing:** Compliance checks
> - **Test environment:** Security audits, compliance tests, vulnerability scans
> - **Production deployment:** Security regression testing
> - **Operations & maintenance:** Continuous monitoring (patches, threats, vulnerabilities)
> - **Benefits:** Faster consistent deliveries, immediate customer feedback, rapid response to vulnerabilities

### V244: Software Maturity Models – CMMI Levels (Pages 557-559)

**PDF Content:**

> **CMMI (Capability Maturity Model Integration) Levels**
> - **Level 1 – Initial:** Unpredictable, reactive processes; success depends on effort
> - **Level 2 – Managed:** Project-level management (planned, performed, measured, controlled)
> - **Level 3 – Defined:** Organization-wide standards guiding projects
> - **Level 4 – Measured & Controlled:** Data-driven, quantitatively controlled processes
> - **Level 5 – Optimizing:** Stable, flexible processes with continuous improvement

### V244: Software Maturity Models – OWASP SAMM (Pages 559-560)

**PDF Content:**

> **OWASP SAMM (Software Assurance Maturity Model) Levels**
> - **Level 0 – None:** No security practices; immature security posture
> - **Level 1 – Initial:** Ad hoc security practices
> - **Level 2 – Managed:** Effective security practices with some process management
> - **Level 3 – Mastered:** Comprehensive and mature security practices
> - **Focus areas:** Governance (administrative controls), Design, Implementation, Verification, Operations

---

## Session 33 – Application Security

### V249: Programming Languages – Compiled vs. Interpreted (Page 569)

**PDF Content:**

> **Compiled vs. Interpreted Languages**
> - **Compiled Languages:** High-level languages converted to low-level machine code using a compiler; examples: C, C++, C#, Rust, Visual Basic, Swift, Java
> - **Interpreted Languages:** Executed directly without compiling to machine instructions; examples: PHP, Perl, JavaScript, Python, VBScript, Ruby

### V249: Programming Languages – Generations (1GL–5GL) (Page 569)

**PDF Content:**

> **Programming Language Generations**
> - **1GL (First Generation):** Machine code, binary (0s and 1s)
> - **2GL (Second Generation):** Assembly language, uses English words that convert to machine code
> - **3GL (Third Generation):** High-level language converted to machine code via compiler; examples: Java, C++
> - **4GL (Fourth Generation):** Domain-specific, performing specialized functions; example: SQL
> - **5GL (Fifth Generation):** Problem-solving and AI-based languages that generate logic based on constraints

### V250: Application Security Testing – SAST vs. DAST (Pages 571-572)

**PDF Content:**

> **SAST vs. DAST Comparison**
> - **SAST (Static Application Security Testing):** Analyzes software code without running it; applied to in-house developed software; white box testing (internal testers with full code knowledge)
> - **DAST (Dynamic Application Security Testing):** Analyzes software in operational environment without source code; used for COTS, open-source, closed-source applications; black box testing (external testers with no code knowledge)

### V251: Software Assurance – OWASP ASVS Levels (Pages 573-574)

**PDF Content:**

> **OWASP ASVS (Application Security Verification Standard) Levels**
> - **Level 1 – Low Security Assurance:** Bare minimum requirements for all applications; protects against low-effort threats and script kiddies; first step in multi-phase security enhancement
> - **Level 2 – Moderate Security Assurance:** Sufficient to defend against most application security risks; protects against skilled and motivated hackers; includes controls for standard penetration testing
> - **Level 3 – High Security Assurance:** Necessary for applications critical to organizational operations; protects against advanced threats including APTs; highest level of security assurance

### V256: OWASP Top 10 – 2021 New Risks (Pages 585-586)

**PDF Content:**

> **OWASP Top 10 (2021) – New Risks**
> - **A4 – Insecure Design:** Risk from ineffective security or privacy controls built into software design; mitigation: conduct regular risk analysis, implement secure system designs and threat modeling
> - **A5 – Security Misconfiguration (Updated):** Unpatched software, default accounts, lack of system hardening; mitigation: follow best practices, disable unnecessary services, regular testing
> - **A8 – Software and Data Integrity Failures:** Risk from insufficient integrity protections in software (automated updates, libraries); mitigation: limit automated updates, use trusted sources, verify digital signatures
> - **A10 – Server-Side Request Forgery (SSRF):** Application accesses remote resources without validating URL; mitigation: validate client inputs, use whitelisting for URLs and ports, deny non-whitelisted requests by default

### V257: Software API Security – API Types (Page 587)

**PDF Content:**

> **API Types**
> - **Public (Open) API:** Allows anyone to connect using HTTP protocol; high exposure, poses security risks
> - **Private (Internal) API:** Used for internal applications and services; restricted access behind firewalls or in private cloud environments
> - **Partner API:** Accessible to selected entities; commonly used in controlled business applications (payment gateways)
> - **Composite API:** Combines multiple requests into a single API call; often used in dashboards and data gathering applications

### V257: Software API Security – API Security Measures (Page 588)

**PDF Content:**

> **API Security Measures**
> - **API keys:** Long, complex keys used for authentication and authorization; protect against unauthorized access
> - **Mutual authentication:** Use SSH/TLS for secure communication
> - **Data type security:** Understand data shared through APIs (e.g., health information) for regulatory compliance
> - **Testing:** Include APIs in software application testing (unit tests, assessment tests)
> - **Least privilege:** Limit API permissions to only those necessary; prevent excessive resource requests and DoS/DDoS
> - **Input validation:** Reject invalid or unauthorized commands to prevent injection attacks
> - **Logging and monitoring:** Track API activities for potential threats and misuse

### V258: Secure Coding Practices – Hard-coded Credentials (Pages 589-590)

**PDF Content:**

> **Secure Coding – Hard-coded Credentials Warning**
> - **Avoid hard-coded credentials:** Do not include hard-coded passwords, tokens, or other sensitive data in code
> - **Risk:** Hard-coded credentials can lead to exposure if uploaded to public repositories (GitHub, GitLab)
> - **Restrict privileged escalation:** Limit applications from requiring elevated privileges (root/admin) unless absolutely necessary
> - **High-privilege applications** are more vulnerable if compromised
> - **Use approved code only:** Prevent use of unmanaged or unapproved code; implement change control
> - **Verify code integrity:** Use hash functions (checksums) to confirm integrity of acquired code from trusted sources

### V259: Software-Defined Security – Config as Code, Policy as Code (Pages 590-591)

**PDF Content:**

> **Software-Defined Security – Configuration and Policy as Code**
> - **Configuration as Code:** Standardizes approved configurations to resources, enabling "gold images" (secure, hardened, and immutable configurations)
> - **Policy as Code:** Merges Infrastructure as Code and Configuration as Code, creating immutable resources and enforcing strict policy compliance
> - **Security as Code:** Integrates security processes into DevOps workflows, ensuring compliance throughout DevOps and CI/CD processes
> - **Implementation:** Use configuration management to authorize changes; add security gates/checks throughout pipeline; regular testing as part of SDLC/DevOps lifecycle

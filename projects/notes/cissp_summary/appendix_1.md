# Differences b/w pdf and videos
Mentioned in `ISC2+CISSP24+Study+Guide.pdf` but not in videos.

## Session 15 – Additional Network Components Topics

### Transmission Media – Selection Factors (Pages 256–257)

**PDF Content:**

> **Transmission Media**
> - Pathway for data to travel from one point to another
> - Can be physical (wired) or digital (wireless)

> **Key Factors in Choosing Transmission Media**
> - **Network Topology**: Arrangement of network elements impacts transmission media selection
> - **Location of Computing Services**: Determines if wired or wireless connectivity is needed
> - **Data Transfer Rates (Throughput)**: Speed requirement from point A to point B
> - **Cost and Equipment**: Equipment compatibility and budget influence media selection

> **Network Topologies**
> - **Ring Topology**: Only one host can communicate at a time. Data is passed using a token in a circular pattern.
> - **Bus Topology**: Central backbone cable connects all devices.
> - **Star Topology**: Devices connected through a central network device (common in small networks).
> - **Mesh Topology**: High availability setup, each device is connected to multiple others.

> **Network Types**
> - **Wide Area Network (WAN)**: Spans large geographical areas (e.g., the internet)
> - **Metropolitan Area Network (MAN)**: Covers a city or metropolitan area (e.g., city-wide Wi-Fi)
> - **Local Area Network (LAN)**: Small geographical area (e.g., office or home network)
> - **Personal Area Network (PAN)**: Limited to an individual's immediate area, e.g., mobile device hotspot or Bluetooth

---

### Ethernet Technology, Components, Data Rates (Page 258)

**PDF Content:**

> **Ethernet Technology**
> - Based on IEEE 802.3 standard
> - OSI Layer 2 protocol using frames for communication
> - Supports full duplex communication
> - Uses twisted pair cabling

> **Ethernet Components**
> - **Data Terminal Equipment (DTE)**: Endpoints in Ethernet technology (e.g., computers)
> - **Data Communication Equipment (DCE)**: Transfers Ethernet frames (e.g., Layer 2 switches)

> **Ethernet Data Rates**
> - **Fast Ethernet**: 100 Mbps
> - **Gigabit Ethernet**: 1,000 Mbps (1 Gbps)
> - **10 Gig Ethernet (10 Gig E)**: 10 Gbps

---

### Fiber Optic Modes (Single-mode vs. Multi-mode) (Pages 259–260)

**PDF Content:**

> **Fiber Optic Cabling**
> - Utilizes a glass core to transmit data using light and lasers
> - Types include
>   - **Single Mode**: For long-distance applications, uses a small core (8.3 microns)
>   - **Multi Mode**: Suitable for shorter distances (up to 2 kilometers), uses a larger core (50 or 62.5 microns)

> **Common Cable**
> - **Dielectric Insulation**: Insulates the copper core in coaxial cables from shielding

> **Plenum Rated Cable**
> - Non-toxic jacket material used for cables in airflow spaces to prevent toxic fumes in case of fire

> **TIA 568 Standard**
> - Standard for the color-coding and positioning of wires within twisted pair cables for connectivity
> - Common configurations: 568A, 568B (most prevalent)

---

## Session 16 – Missing Networking Concepts

### TCP/IP Ports and Protocols Table (Pages 264–267)

**PDF Content:**

> **Layer 7 - Application Layer Protocols**
> - **HTTP (Port 80)**: Unsecure web-based communication
> - **HTTPS (Port 443)**: Secure web-based communication with SSL/TLS encryption
> - **FTP (Ports 20, 21)**: Unsecure file transfer; Port 20 for data, Port 21 for control
> - **SMTP (Port 25)**: Unsecure email message routing
> - **SNMP (Ports 161, 162)**: Network device monitoring; Port 161 unsecure, Port 162 for TRAPS
> - **DNS (Port 53)**: Resolves domain names to IP addresses
> - **DHCP (Ports 67, 68)**: Assigns dynamic IP addresses to devices
> - **NTP (Port 123)**: Synchronizes system clocks
> - **ICMP**: Provides communication status, used for PING and Traceroute (no assigned port)
> - **Telnet (Port 23)**: Unsecure remote access
> - **SSH (Port 22)**: Secure remote access with encryption
> - **POP3 (Port 110)**: Retrieves emails; option for secure Kerberos (Port 1109)
> - **IMAP (Port 143)**: Manages emails with SSL/TLS security option (Port 993)

> **Layer 6 - Presentation Layer Protocols**
> - **ASCII**: Text encoding standard
> - **JPEG**: Digital image file format
> - **PNG**: Digital image file format
> - **MPEG**: Audio/video digital file format

> **Layer 5 - Session Layer Protocols**
> - **NFS (Port 2049)**: File sharing across networks
> - **SQL**: Relational database management
> - **RPC (Port 111)**: Calls routines and functions on remote systems

> **Layer 4 - Transport Layer Protocols**
> - **TCP**: Connection-oriented protocol with handshake
> - **UDP**: Connectionless, fast transmission without handshake
> - **SSL**: Original protocol for secure network communication (replaced by TLS)
> - **TLS**: Secure communications with better security than SSL

> **Layer 3 - Network Layer Protocols**
> - **IP**: Connectionless routing for network communication
> - **ICMP**: Communication status and error messages (e.g., PING, Traceroute)
> - **OSPF**: Dynamic routing protocol for path selection
> - **IPSec**: Secure VPN communications using encryption
> - **NAT**: Converts private IPs to public IPs for internet communication

> **Layer 2 - Data Link Layer Protocols**
> - **ARP**: Translates the IP address to a physical (MAC) address
> - **RARP**: Translates the physical (MAC) address to an IP address
> - **L2TP**: Layer 2 tunneling for VPN; requires IPSec for encryption
> - **PPTP**: Point-to-Point tunneling for secure PPP communication

> **Layer 1 - Physical Layer Protocols**
> - **SONNET**: Optical digital communications
> - **HISI**: High-speed serial communications over WAN
> - **RS-232, RS-449**: Standards for serial communications

---

### TCP 3-Way Handshake with Flags (Pages 266–267)

**PDF Content:**

> **TCP Three-Way Handshake**
> - **SYN**: Initiates connection with synchronization request
> - **SYN-ACK**: Acknowledges request and readiness to communicate
> - **ACK**: Confirms connection, initiating data transfer

> **Additional TCP Flags**
> - **URG**: Urgent, priority traffic
> - **RST**: Reset, used to restart a connection
> - **FIN**: Finalize, used to terminate connection

---

### TCP/IP Model Layers Mapping (Page 267)

**PDF Content:**

> **TCP/IP Model Layers**
> - **Link Layer**: Physical and Data Link layers (OSI layers 1 and 2)
> - **Internet Layer**: Network layer functions (OSI layer 3)
> - **Transport Layer**: Responsible for data transmission (OSI layer 4)
> - **Application Layer**: Merges OSI layers 5, 6, and 7

---

### IPv4 Private Address Ranges (RFC 1918) (Page 269)

**PDF Content:**

> **IPv4 Private Address Ranges (RFC 1918)**
> - **Class A**: 10.0.0.0 - 10.255.255.255
> - **Class B**: 172.16.0.0 - 172.31.255.255
> - **Class C**: 192.168.0.0 - 192.168.255.255

---

### CIDR Notation (Page 270)

**PDF Content:**

> **CIDR Notation for Subnet Masks**
> - Class A - /8 (255.0.0.0)
> - Class B - /16 (255.255.0.0)
> - Class C - /24 (255.255.255.0)

---

### Benefits of IPv6 (Page 270)

**PDF Content:**

> **Benefits of IPv6**
> - Eliminates need for NAT and DHCP through built-in configuration
> - Scoped addresses for efficient traffic grouping and filtering
> - Quality of Service (QoS) for traffic management based on priority

---

### CSMA/CD vs. CSMA/CA (Page 272)

**PDF Content:**

> **CSMA/CD (Carrier Sense Multiple Access with Collision Detection)**
> - Used in Ethernet and wired networks
> - Waits a short, random time after a collision before retransmitting

> **CSMA/CA (Carrier Sense Multiple Access with Collision Avoidance)**
> - Used in wireless networks to avoid collisions
> - Allows only one device to communicate at a time, preventing collisions

---

### Routing Protocol Details (Pages 272–274)

**PDF Content:**

> **Distance Vector Protocols**
> - **RIP (Routing Information Protocol)**: Uses hop count to determine best path (maximum of 15 hops; 16+ considered unreachable)
>   - **RIP Version 1**: No subnet support
>   - **RIP Version 2**: Supports subnetting with CIDR (Classless Inter-Domain Routing)

> **Exterior Gateway Protocols**
> - **BGP (Border Gateway Protocol)**: Exterior protocol, used on the internet to find shortest paths between autonomous systems

> **Interior Gateway Protocols**
> - **IGRP (Interior Gateway Routing Protocol)**: Cisco proprietary protocol for local AS communication
> - **EIGRP (Enhanced IGRP)**: An open protocol with added Variable Length Subnet Masks (VLSM) for more subnet control

> **Link State Protocols**
> - **OSPF (Open Shortest Path First)**: Commonly used in LANs, uses Dijkstra algorithm for shortest path calculation. Utilizes areas to divide networks within an AS, allowing efficient load balancing and alternative route selection.
> - **IS-IS (Intermediate System to Intermediate System)**: Primarily used in large service provider networks

---

### Autonomous System (AS) (Page 273)

**PDF Content:**

> **Autonomous System (AS)**
> - A collection of network devices managed under a single routing policy

---

### Converged Protocols (FCoE, iSCSI, MPLS, VoIP, SDN) (Pages 280–282)

**PDF Content:**

> **Fibre Channel over Ethernet (FCoE)**
> - Allows Fibre Channel communications (used in Storage Area Networks) over Ethernet
> - Reduces infrastructure costs by using Ethernet instead of specialized Fibre Channel hardware

> **Internet Small Computer System Interface (iSCSI)**
> - An internet-based standard that enables storage access over IP networks
> - Merges SCSI with IP networking to allow remote storage access

> **Multi-Protocol Label Switching (MPLS)**
> - Uses labels to transfer data quickly based on a predetermined path
> - Works with various protocols, including ATM, SONNET, and DSL, enabling flexibility beyond just TCP/IP

> **Voice over IP (VoIP)**
> - Encapsulates voice and multimedia communications over IP networks
> - Reduces costs by utilizing existing network infrastructure (e.g., Cat5/6 cabling) rather than dedicated PBX systems
> - Used in applications like Skype and Google Meet for voice communication over IP

> **Software-Defined Networking (SDN)**
> - Combines virtualized network resources to create a unified, converged network
> - Reduces dependence on specific platforms, vendors, or hardware, offering flexibility across network environments

> **Security Risks and Considerations**
> - **Protocol Security**: Must secure both the specialized and standard protocol components (e.g., VoIP requires security for both voice and IP protocols)
> - **New and Undefined Standards**: Some converged protocols lack established security standards, leading to potential vulnerabilities
> - **Tunneling Risks**: Tunneling can obscure or hide communication data, making it challenging for security tools to detect intrusions or sniff traffic
> - **Testing Requirements**: Important to test converged protocols against security mechanisms to ensure effective protection in production environments

---

### Multilayer Protocols (DNP3) (Pages 278–280)

**PDF Content:**

> **Multi-Layer Protocols**
> - Protocols that span multiple layers of the TCP/IP stack
> - Example: A protocol that operates at Layer 2 and Layer 3, or Layer 3 and Layer 4

> **Key Points for Multi-Layer Protocols**
> - **Protocol Layer Limits**: Not all protocols span multiple layers; some stop at specific layers. Example: IP packets stop at Layer 3 and do not continue beyond that layer.
> - **Benefits**: Multi-layer protocols support higher-level OSI model functions; efficient processing by network and security components; encryption can be applied at different layers for added security

> **Risks**
> - **Encapsulation Challenges**: If a packet is encrypted, additional information cannot be added; may bypass switches, routers, and endpoint security if not designed to detect multi-layer protocols
> - **Network Segmentation**: Difficult to identify multi-layer protocol traffic for segmentation at Layer 3 or Layer 2; secure protocols like SSH or HTTPS aid in segmentation, whereas non-segmentable protocols pose a risk
> - **Covert Channels**: Covert channels (storage and timing) can leverage encapsulation to disguise malicious traffic as legitimate; these covert channels may bypass detection in security mechanisms

> **Important Protocol to Know for the Exam**
> - **DNP3 (Distributed Network Protocol version 3)**: An open standard protocol commonly used in industrial control systems; applications include electric, water, wastewater, transportation, oil, and gas industries; primary function connects remote terminal units to SCADA master control stations

---

### Emanation Security (EMSEC/TEMPEST) (Pages 283–284)

**PDF Content:**

> **Emanation Security (EMSEC)**
> - Protects against signal leaks that could be intercepted by attackers
> - Common with copper, radio, and wireless transmissions

> **Countermeasures**
> - **Faraday Cage**: Blocks electromagnetic signals using a fully enclosed area with a metal mesh
> - **White Noise**: Generates alternate signals to mask sensitive emanations
> - **Control Zones**: Specific areas protected by Faraday cages or white noise for targeted security

---

### Circuit Encryption (Link vs. End-to-End) (Pages 284–285)

**PDF Content:**

> **Circuit Encryption**
> - **Link Encryption**: Protects the entire communication channel (all content in tunnel is encrypted)
> - **End-to-End Encryption**: Encrypts data only, leaving header information (e.g., IP addresses) unencrypted for routing

> **Virtual Private Network (VPN) Encryption Modes**
> - **Link Encryption (Tunnel Mode)**: Encrypts all data between two points in the communication path, such as between VPN concentrators. Risk: Data may be exposed after leaving the VPN concentrator.
> - **End-to-End Encryption (Transport Mode)**: Encrypts all data between two specific endpoints (e.g., computer-to-computer), with routing info unencrypted

> **VPN Components**
> - **VPN Concentrator/Gateway**: Creates a secure tunnel over public or untrusted networks (usually the internet)
> - Often paired with Layer 2 Tunneling Protocol (L2TP) for Layer 2 protection, complementing Layer 3 IPsec encryption

---

## Session 17 – Missing Network Architectures Topics

### Content Distribution Networks (CDNs) (Pages 289–290)

**PDF Content:**

> **Content Distribution Networks (CDN) Overview**
> - A CDN consists of multiple resources deployed in various locations accessible via the internet
> - Aims to provide high availability and efficient delivery of hosted content
> - Also referred to as a Content Delivery Network

> **Purpose of a CDN**
> - Ensures fast access to content for users globally (e.g., streaming services like Netflix, Amazon, Facebook)
> - Reduces latency and load times for users by using multiple data centers
> - Handles high traffic by distributing requests across various servers
> - Supports various types of content: voice, data, music, documents, software licensing, and updates

> **Architecture of CDNs**
> - Predominantly a client-server relationship
> - Can also be deployed as peer-to-peer networks (e.g., BitTorrent, LimeWire, Napster)
> - Example: A web browser (client) accessing content from a CDN server

> **Security Considerations for CDNs**
> - Importance of securing hosted content with proper controls and protections
> - Need for Service Level Agreements (SLA) to ensure performance and infrastructure provisioning
> - Particularly crucial for cloud computing resources
> - Defines performance metrics (e.g., 99.9% uptime)

> **Encryption and Authentication**
> - Use of encryption to protect client-server communications
> - Implementation of mutual authentication: Client authenticates to the server; server authenticates back to the client
> - Ensures confidentiality and integrity of the data transmitted over the CDN

---

### Software Defined Networks (SDN) – Detailed Components (Pages 290–293)

**PDF Content:**

> **Software Defined Networks (SDN) Overview**
> - SDN is an architectural approach that separates various network functions and planes for better management
> - Enables centralized control of the network, allowing for easier automation, orchestration, and policy enforcement

> **Key Components of SDN Architecture**
> - **Controller**: Central management element controlling network devices, automating tasks, and enforcing policies
> - **Application Plane**: Hosts applications for network automation, traffic optimization, and policy implementation
> - **Data Plane**: Comprises the network devices (routers, switches, access points) that execute the policies set by the controller
> - **Northbound API**: Interface that allows communication between the controller and applications
> - **Southbound API**: Interface that allows the controller to communicate with the data plane elements

> **SDN Features**
> - Enables real-time monitoring and traffic shaping
> - Supports various applications like load balancing, intrusion detection/prevention systems (IDS/IDPS), and network orchestration
> - Facilitates scalability and flexibility within network operations

> **SD-WAN (Software Defined Wide Area Network)**
> - Extends the principles of SDN to wide area networks, allowing for simplified management and optimization of WAN traffic
> - Operates using similar concepts, focusing on abstraction and centralized control at a broader scale

> **Security Considerations in SDN**
> - **Single Point of Failure**: The SDN controller represents a critical vulnerability; if compromised, it can disrupt the entire network
> - **API Vulnerabilities**: Increasing the number of APIs expands the attack surface, necessitating strong access controls and security assessments

> **Best Practices for Securing SDN**
> - Implement network segmentation and isolation to mitigate the impact of breaches and lateral movement
> - Use strong authentication mechanisms, including multi-factor authentication (MFA), for network access
> - Monitor and log activities in real-time to detect and respond to security incidents promptly
> - Conduct regular audits and assessments to identify vulnerabilities, misconfigurations, and compliance issues

---

### API Types (SOAP, REST, RPC, WebSocket, GraphQL) (Pages 293–295)

**PDF Content:**

> **Types of APIs**
> - **SOAP (Simple Object Access Protocol)**: Uses XML for data exchange; structured information exchange
> - **RPC (Remote Procedure Call)**: Executes code on a remote server as if local; simplifies distributed computing
> - **WebSocket API**: Enables interaction between web applications and services; uses HTTP/HTTPS protocols, transmits data types like JSON and XML
> - **REST (Representational State Transfer)**: Architectural style for network applications; emphasizes resource-based interactions using HTTP methods (GET, POST, PUT, DELETE); stateless communication (servers do not save client data)
> - **GraphQL**: Query language for APIs allowing clients to request specific data; offers flexible and efficient data retrieval

> **API Deployment Methods**
> - **Private APIs**: Reserved for internal users within an organization
> - **Public APIs**: Available to external users; increases attack surface
> - **Partner APIs**: Also known as shared APIs, for limited external access
> - **Composite APIs**: Hybrid approach combining two or more APIs for enhanced functionality

> **API Gateways**
> - Central interface for all API requests
> - Enforces security policies and facilitates access control

> **Security Considerations**
> - Implement mutual authentication for secure communication
> - Monitor API usage to detect anomalies
> - Ensure compliance with service level agreements (SLAs)

---

### Network Functions Virtualization (NFV) (Pages 295–297)

**PDF Content:**

> **Network Functions Virtualization (NFV)**
> - Technology that virtualizes network functions traditionally performed by dedicated hardware
> - Transforms traditional network management and configuration into a software-based approach
> - Increases scalability and flexibility, reduces costs, simplifies network operations

> **Components of NFV**
> - **VNF (Virtualized Network Functions)**: Software applications that run network functions like firewalls, routers, and load balancers
> - **NFVI (Network Functions Virtualization Infrastructure)**: Hardware and software components that support the execution of VNFs; includes compute, storage, and network resources
> - **MANO (Management and Orchestration)**: Framework that manages and orchestrates VNFs across NFVI; automates deployment, scaling, and lifecycle management of network services

> **Role in Software-Defined Networks (SDN)**
> - NFV often works in conjunction with SDN, although they are distinct technologies
> - NFV focuses on the management of network functions, while SDN concentrates on network flows and decision-making processes

> **Applications of NFV**
> - Running network functions as virtual machines, replacing traditional hardware like routers and switches with software solutions
> - Use Cases: Data centers, enterprise networks, and as part of cloud services to enhance resource allocation and operational efficiency

> **Security Considerations**
> - **Physical Security**: Ensures that the physical infrastructure supporting NFV is protected
> - **Cybersecurity Measures**: Includes malware protection, isolation of network services, and robust access controls
> - **Encryption**: Essential for protecting data flows within and outside the NFV environment

> **Challenges and Risks**
> - **Complexity**: Managing an NFV environment can be complex due to the integration of multiple functional blocks
> - **Visibility**: Network traffic in virtualized environments may be less transparent, complicating monitoring and management
> - **Segmentation**: Essential for isolating network functions to prevent the spread of malware and enhance performance

---

## Summary

The PDF content above has been **directly captured and mapped** to the missing topics identified in your comparison tables. Each entry includes:

1. **The missing topic name**
2. **The PDF page number(s)**
3. **The exact or summarized content from the PDF**

This content can now be used to **generate additional markdown files** or **supplement the existing session summaries** in your Git repository.

Would you like me to **generate markdown files** for any of these missing sections? If so, please specify which sessions or topics you want to prioritize.

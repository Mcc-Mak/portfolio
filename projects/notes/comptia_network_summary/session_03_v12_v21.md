# Session 3: The OSI Model

## V12 - OSI Model Overview
- **OSI** = Open Systems Interconnection (developed in 1977 by ISO).
- **Importance**: Foundational for Network+ exam; used to discuss network components and troubleshoot problems.
- **The Seven Layers (Bottom to Top)**:
  1. Physical
  2. Data Link
  3. Network
  4. Transport
  5. Session
  6. Presentation
  7. Application
- **Data Naming Across Layers**:
  - Layers 5,6,7: Data
  - Layer 4: Segment (TCP) or Datagram (UDP)
  - Layer 3: Packet
  - Layer 2: Frame
  - Layer 1: Bits
- **Encapsulation**: Wrapping data with protocol info as it moves **down** the layers.
- **Decapsulation**: Removing protocol info as it moves **up** the layers.

## V13 - Layer 1: Physical Layer
- **Core Function**: Transmits raw binary bits (1s and 0s) across a network.
- **Bit Representation by Medium**:
  - **Copper (Cat5/6)**: Voltage variation (Transition Modulation).
  - **Fiber Optic**: Light pulses (on = 1, off = 0).
- **Cabling & Connectors**: RJ45 connector; TIA/EIA-568A and TIA/EIA-568B wiring standards.
- **Synchronization**: Asynchronous (start/stop bits) vs. Synchronous (common clock).
- **Bandwidth Utilization**: Broadband (divides into channels) vs. Baseband (uses entire bandwidth).
- **Layer 1 Devices** (No intelligence – simple repeaters): Cables, Wireless (Bluetooth, Wi-Fi), Hubs, Access Points, Media Converters.

## V14 - Layer 2: Data Link Layer
- **Primary Functions**: Packages bits into frames, error detection/correction, identifies devices via MAC addresses, flow control.
- **MAC Addresses**: 48-bit, written as 12 hexadecimal digits. First 24 bits = Vendor identifier; last 24 bits = Unique device identifier.
- **Logical Link Control (LLC)**: Provides connection services, acknowledgments, basic flow & error control.
- **Synchronization Modes**: Isochronous (common clock + time slots), Synchronous (same clock + control characters), Asynchronous (own clock + start/stop bits).
- **Layer 2 Devices**: Network Interface Cards (NICs), Bridges, Switches.

## V15 - Layer 3: Network Layer
- **Primary Concern**: Routing (forwarding traffic using logical addresses like IPv4/IPv6).
- **Forwarding Methods**:
  - **Packet switching (routing)**: Data divided into packets, forwarded independently. (Most modern networks)
  - **Circuit switching**: Dedicated communication link established for the whole session.
  - **Message switching**: Messages stored and forwarded (store-and-forward capability).
- **ICMP (Internet Control Message Protocol)**: Used for operational messages and troubleshooting (e.g., ping, traceroute).
- **Layer 3 Devices**: Routers, Multilayer switches (Layer 3 switches).

## V16 - Layer 4: Transport Layer
- **Dividing line** between upper layers (Session, Presentation, Application) and lower layers (Physical, Data Link, Network).
- **Key Protocols**:
  - **TCP (Transmission Control Protocol)**: Connection-oriented, reliable. Uses a three-way handshake (SYN, SYN-ACK, ACK). Provides acknowledgements, retransmission, sequencing, flow control (windowing).
  - **UDP (User Datagram Protocol)**: Connectionless, unreliable, low overhead. Used for audio/video streaming, DNS lookups.
- **Reliability Mechanisms**:
  - **Windowing**: Dynamically adjusts the amount of data sent per segment.
  - **Buffering**: Devices temporarily store segments when bandwidth is unavailable.
- **Layer 4 Devices/Examples**: TCP, UDP, WAN accelerators, load balancers, firewalls.

## V17 - Layer 5: Session Layer
- **Core Concept**: A session is a conversation that must be kept separate from others to prevent data intermingling.
- **Three Main Functions**:
  1. **Setup (Establishing a session)**: Check credentials, assign session number, negotiate services.
  2. **Maintenance (Ongoing data transfer)**: Transfer data, handle breaks, acknowledge receipt.
  3. **Tear down (Ending a session)**: By mutual agreement or forced disconnect.
- **Key Protocols**: H.323 (voice/video connections), RTP (Real-time Transport Protocol), NetBIOS (file sharing).

## V18 - Layer 6: Presentation Layer
- **Primary Responsibilities**:
  1. **Data formatting** – ensuring compatibility between different devices (e.g., ASCII, Unicode, GIF, JPEG, MP4).
  2. **Encryption** – securing data in transit and at rest (e.g., TLS, SSL).
- **Keywords to remember**: Data formatting & encryption.

## V19 - Layer 7: Application Layer
- **Provides application-level services** (not user applications like Chrome, but lower-level protocols).
- **Key Functions**:
  - **Application Services**: Unites communicating components for multiple network applications (file transfer, email, remote access, etc.).
  - **Service Advertisement**: Applications send announcements to other devices about available services.
- **Examples of Layer 7 Protocols/Services**: HTTP/HTTPS (web), POP3/IMAP/SMTP (email), DNS, FTP/SFTP/TFTP, Telnet/SSH, SNMP.

## V20 - Encapsulation and Decapsulation
- **Encapsulation**: Adding headers (and sometimes trailers) to data as it moves **down** the OSI model (Layer 7 → Layer 1).
- **Decapsulation**: Removing headers as data moves **up** the OSI model (Layer 1 → Layer 7).
- **Protocol Data Units (PDUs)**:
  - Layer 1 → bits
  - Layer 2 → frames
  - Layer 3 → packets
  - Layer 4 → segments (TCP) or datagrams (UDP)
- **Key Headers**:
  - Layer 4 (TCP): Source/destination ports, sequence/ack numbers, control flags (SYN, ACK, FIN, RST, PSH, URG).
  - Layer 3 (IP): Source/destination IPs, TTL, protocol.
  - Layer 2 (Ethernet): Source/destination MACs, EtherType, optional VLAN tag. MTU default 1500 bytes.

## V21 - Wireshark Demonstration
- **Wireshark** is a packet analyzer used to inspect network traffic.
- Demonstrates how to view the different OSI layers (L2 MACs, L3 IPs, L4 TCP/UDP ports, L7 application data) in a packet capture.
- Useful for network troubleshooting and cybersecurity analysis.
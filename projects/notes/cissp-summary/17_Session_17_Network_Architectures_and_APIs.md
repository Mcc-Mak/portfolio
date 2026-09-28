# Session 17: Network Architectures and APIs

## Overview
This session covers content distribution networks, software-defined networks, application programming interfaces, and network functions virtualization. It consists of 4 videos (V123–V127).

---

## Video V123 (Outline): Network Architectures (Section Intro)

**Objective:** To introduce the key topics in network architectures for the CISSP exam.

### Topics Covered in this Session
1.  Content Distribution Networks (CDNs)
2.  Software Defined Networks (SDN, SD-WAN)
3.  Application Programming Interfaces (APIs)
4.  Network Functions Virtualization (NFV)

---

## Video V124: Content Distribution Networks (CDNs)

**Objective:** To explain CDNs and their security implications.

### I. Definition & Purpose
- **CDN (Content Distribution/Delivery Network):** Multiple distributed resources (data centers) deployed globally to provide high availability and low latency for hosted content.
- **Supports the security tenet of Availability.**

### II. Architecture
- **Predominant:** Client-server architecture (e.g., web browser accessing YouTube)
- **Alternative:** Peer-to-peer (P2P) networks (e.g., BitTorrent)

### III. Use Cases
- Web content delivery (videos, music, documents)
- Software licensing, patching, signature files (antivirus, IDS updates)

### IV. Security & Management Considerations
- **Access Control:** Securing hosted content is the primary concern
- **Encryption:** Protect client-server communications (mutual authentication)
- **Service Level Agreements (SLAs):** Critical for cloud computing to guarantee performance (e.g., 99.9% uptime)

---

## Video V125: Software Defined Networks (SDN, SD-WAN)

**Objective:** To explain SDN architecture, components, and security.

### I. Core Concept
- **SDN:** An architectural approach that separates the control plane from the data plane, allowing dynamic, programmable network configuration.

### II. The Three Planes (Layers)

| Layer | Function |
| :--- | :--- |
| **Application Plane** | Features: load balancing, IDS/IPS, packet captures, orchestration; facilitates automation and policies |
| **Control Plane** | Central intelligence (the **Controller**); manages and enforces policies across network devices |
| **Data Plane (Infrastructure Layer)** | Network elements (routers, switches, access points); receives instructions from the controller |

### III. Key Interfaces

| Interface | Direction | Function |
| :--- | :--- | :--- |
| **Northbound API (NBI / A-CPI)** | Application → Controller | Allows controller to communicate with applications |
| **Southbound API (SBI / D-CPI)** | Controller → Data Plane | Passes instructions to network elements |

### IV. SD-WAN
- **Definition:** SDN concepts applied to a Wide Area Network (WAN)
- Abstracts infrastructure to manage WAN complexity using the same layered architecture

### V. Security Concerns & Best Practices

| Concern | Best Practice |
| :--- | :--- |
| **Single Point of Failure** (Controller is prime target) | Segment and isolate the SDN architecture |
| **Expanded Attack Surface** (APIs increase vectors) | Strong/Multi-factor authentication (MFA) |
| | Real-time monitoring and logging (SIEM) |
| | Regular auditing and assessments |

### VI. Open Source Example
- **ONOS:** Open source SDN controller (vendor-neutral; may appear on the exam)

---

## Video V126: Application Programming Interfaces (APIs)

**Objective:** To explain API types, deployment methods, and security.

### I. Definition
- **API (Application Programming Interface):** A set of rules and protocols that allows different software applications to communicate and interact (data sharing, application integration, third-party development).

### II. API Types (Protocols/Architectures)

| Type | Description |
| :--- | :--- |
| **SOAP (Simple Object Access Protocol)** | Older technology; uses XML for structured information exchange |
| **RPC (Remote Procedure Call)** | Execute code on a remote server as if it were local |
| **WebSocket (Web API)** | Uses HTTP/HTTPS; transmits JSON or XML |
| **REST (Representational State Transfer)** | Most prevalent today; uses HTTP methods (GET, POST, PUT, DELETE); stateless |
| **GraphQL** | Query language for APIs; clients request specific data and define response structure |

### III. API Deployment Types

| Type | Access | Risk |
| :--- | :--- | :--- |
| **Private** | Internal users only | Lower risk |
| **Public** | External users | Increases attack surface |
| **Partner (Shared)** | Specific business partners | Controlled risk |
| **Composite** | Hybrid (combines two or more APIs) | Example: public gateway + private backend |

### IV. API Gateway
- Single interface that acts as a gatekeeper
- Ensures security policy compliance before requests reach backend services
- Reduces exposure of internal systems

### V. Exam Focus
- Know the differences between SOAP, REST, WebSocket, RPC, and GraphQL
- Know the four deployment types (Private, Public, Partner, Composite)
- Choose the API that presents the least risk to the system

---

## Video V127: Network Functions Virtualization (NFV)

**Objective:** To explain NFV architecture, components, risks, and best practices.

### I. Definition
- **NFV (Network Functions Virtualization):** Replaces dedicated hardware appliances (routers, firewalls, switches) with software running on VMs on standard servers. Part of SDN.

### II. Key Benefits
- **Cost Savings:** Commodity servers are cheaper than proprietary hardware
- **Scalability & Flexibility:** VMs can be powered on/off, scaled, and automated
- **Operational Simplification:** Management via a single pane of glass

### III. NFV Architecture Blocks

| Block | Description |
| :--- | :--- |
| **VNFs (Virtualized Network Functions)** | Software instances of network functions (firewalls, routers, load balancers, proxies, gateways) |
| **NFVI (NFV Infrastructure)** | Physical and virtual resources (compute, storage, network); includes virtualization layer (hypervisors) and VIM |
| **VIM (Virtualized Infrastructure Manager)** | Manages virtualized resources (e.g., OpenStack, vCenter) |
| **MANO (Management and Orchestration)** | Orchestrates deployment, scaling, and lifecycle management of VNFs; works with VIM |
| **OSS/BSS** | Operations Support Systems and Business Support Systems (rely on NFV) |

### IV. Security Risks

| Risk | Description |
| :--- | :--- |
| **Physical Security** | Underlying hardware must be physically secured |
| **Malware Spread** | Difficult to contain in virtual environments; needs EDR/XDR |
| **Less Traffic Transparency** | East-west traffic on hypervisors is harder to monitor |
| **Complexity** | Many moving parts (VNFs, MANO, NFVI) increase security management difficulty |

### V. Security Best Practices

| Practice | Description |
| :--- | :--- |
| **Isolate & Segment** | Separate hypervisors, VLANs, VXLANs to limit lateral movement |
| **Strict Access Controls** | Least privilege to hypervisors, management interfaces, and VNFs |
| **Patch Management** | Regularly update VNFs, hypervisors, and underlying hardware |
| **Encrypt Traffic** | Especially between VNFs, virtualization layers, and external networks |
| **Logging & Monitoring** | Centralize logs (SIEM) and monitor for unusual behavior |

### VI. Industry Standards
- **ETSI (European Telecommunications Standards Institute):** Leads NFV specifications
- Key vendors: VMware, Cisco, Juniper

---

## Session Summary
Session 17 covers the **complete network architectures and APIs landscape** for the CISSP exam. Key takeaways include:

1.  **Content Distribution Networks (CDNs):** Distributed resources for high availability and low latency; secure with encryption, authentication, and SLAs.

2.  **Software Defined Networks (SDN):** Separates control plane from data plane; three layers (Application, Control, Infrastructure); ONOS open source controller; security concerns (single point of failure, API attack surface).

3.  **SD-WAN:** SDN concepts applied to Wide Area Networks.

4.  **APIs:** Types (SOAP, RPC, WebSocket, REST, GraphQL); deployment (Private, Public, Partner, Composite); API gateway for security.

5.  **Network Functions Virtualization (NFV):** Replaces hardware appliances with VMs; three blocks (VNFs, NFVI, MANO); risks (physical security, malware spread, complexity); best practices (isolation, access controls, patching, encryption, monitoring).
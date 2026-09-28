# Session 10: Secure Architecture Design

## Overview
This session covers the design and security considerations for various system architectures, including distributed systems, databases, ICS, IoT, microservices, embedded systems, HPC, and edge computing. It consists of 10 videos (V67–V77).

---

## Video V67 (Outline): Secure Architecture Design (Section Intro)

**Objective:** To introduce the key topics in secure architecture design for the CISSP exam.

### Topics Covered in this Session
1.  System Architectures (Distributed, Client-Based)
2.  Database Systems (Aggregation, Inference, ACID)
3.  Common Criteria (EAL Levels)
4.  Industrial Control Systems (ICS/SCADA)
5.  Secure Access Service Edge (SASE)
6.  Internet of Things (IoT)
7.  Microservices & API Gateways
8.  Embedded Systems
9.  High-Performance Computing (HPC)
10. Edge Computing Systems

---

## Video V68: System Architectures (Distributed, Client-Based)

**Objective:** To explain distributed and client-based system architectures and their security implications.

### I. Distributed Systems
- **Definition:** Systems connected by a network that share resources to create an integrated system.
- **Key Risks:** Endpoints (vulnerable if unpatched), network communications (unsecured connections), poor security awareness.

### II. Client-Based Systems
- **Definition:** Require an agent (client) on the endpoint to connect to a server.
- **Key Concern:** Data flow security.
- **Client Types:**
    - **Thick Client:** Self-contained (e.g., Outlook, Thunderbird)
    - **Thin Client:** Relies on remote server (e.g., web browser)
    - **Zero Client:** Server does all processing (e.g., VDI)

### III. Security Best Practices
- Maintain security patches
- Deny by default, permit by exception
- Enable monitoring and logging
- Disable unnecessary accounts; change default passwords

---

## Video V69: Database Systems (Aggregation, Inference, ACID)

**Objective:** To explain database vulnerabilities and security concepts.

### I. Database Architecture Concepts
- **Tables:** Primary storage (rows/tuples, columns/attributes)
- **Keys:** Primary key (unique identifier), Foreign key (references another table)
- **Schema:** Defines database structure

### II. Security Concepts

| Concept | Description |
| :--- | :--- |
| **Aggregation** | Combining data from multiple tables |
| **Aggregation Attack** | Querying multiple tables to gather scattered data |
| **Inference Attack** | Using aggregated data to deduce hidden information |
| **Polyinstantiation** | Multiple entries with same primary key but different sensitivity levels |

### III. ACID Framework (Transactions)

| Letter | Concept | Description |
| :--- | :--- | :--- |
| **A** | Atomicity | All or nothing; prevents dirty reads |
| **C** | Consistency | Data must comply with defined rules; prevents lost updates |
| **I** | Isolation | Transactions kept separate; enforces concurrency |
| **D** | Durability | Completed transactions persist after system failure |

---

## Video V70: Common Criteria (EAL Levels)

**Objective:** To explain the Common Criteria framework and Evaluation Assurance Levels (EAL).

### I. Overview
- **Definition:** Internationally recognized standard (ISO/IEC 15408) for IT security evaluation.
- **Three Parts:** Introduction (Part 1), Security Functional Requirements (Part 2), Security Assurance Requirements (Part 3).

### II. Key Components

| Component | Description |
| :--- | :--- |
| **TOE (Target of Evaluation)** | The component being evaluated (software, firmware, hardware) |
| **Protection Profile (PP)** | Template defining desired security needs (reusable) |
| **Security Target (ST)** | High-level definition of actual security requirements for a specific TOE |

### III. Evaluation Assurance Levels (EAL 1–7)

| Level | Description | Typical Use |
| :--- | :--- | :--- |
| **EAL 1** | Functionally tested | Basic operations |
| **EAL 2** | Structurally tested | Design info available |
| **EAL 3** | Methodically tested/checked | First independent review |
| **EAL 4** | Methodically designed/tested | Operating systems (Windows, Linux) |
| **EAL 5** | Semi-formally designed | Smart cards, authentication |
| **EAL 6** | Semi-formally verified | Government/military assets |
| **EAL 7** | Formally verified | Life-critical systems |

### IV. Drawbacks
- Manufacturers choose what gets evaluated; can hide shortcomings.
- Focuses strictly on the product (not personnel, physical security, or BCP/DR).

---

## Video V71: Industrial Control Systems (ICS/SCADA)

**Objective:** To explain ICS components and vulnerabilities.

### I. Core Components

| Component | Description |
| :--- | :--- |
| **PLC (Programmable Logic Controller)** | Programmable digital computer for automation (regulates speed, temperature, valves, sensors) |
| **DCS (Distributed Control System)** | Contained within same facility; distributes automation across environment |
| **SCADA (Supervisory Control and Data Acquisition)** | Centrally acquires data and controls distributed assets over a network |

### II. SCADA Subcomponents
- **RTU (Remote Terminal Unit):** Connects to sensors via radio frequency
- **HMI (Human Machine Interface):** How humans interact with the controller
- **DNP (Distributed Network Protocol):** Open standard for electric, water, transportation sectors

### III. Vulnerabilities
- Old and outdated systems
- Built before security was a priority
- Low-complexity attacks (DoS, command injection) are effective
- Potential impact: destruction of food/water resources, release of hazardous chemicals

---

## Video V72: SASE (Secure Access Service Edge)

**Objective:** To explain the SASE framework and its components.

### I. Definition
- **SASE:** A cloud-native framework that unifies SD-WAN and security features (FWaaS, SWG, CASB, ZTNA) into a single cloud-delivered service.

### II. Core Components

| Component | Acronym | Function |
| :--- | :--- | :--- |
| **Firewall as a Service** | FWaaS | Cloud-based firewall functionality |
| **Secure Web Gateway** | SWG | Web filtering, malware protection, DLP |
| **Cloud Access Security Broker** | CASB | Visibility and control over cloud apps |
| **Zero Trust Network Access** | ZTNA | Identity-centric security model |

### III. Architecture
- Users → Secure Service Edge (FWaaS, SWG, CASB, ZTNA) → SD-WAN/Internet → Destinations (HQ, cloud, SaaS)

---

## Video V73: Internet of Things (IoT)

**Objective:** To explain IoT security challenges and best practices.

### I. Definition
- Any device that can communicate over the internet (refrigerators, cameras, sensors, medical devices, cars).

### II. Security Challenges
- Cannot be managed like traditional IT (no SSH, VPN, antivirus)
- Limited security capabilities
- Often built without security in mind

### III. Security Best Practices
- Threat modeling for IoT devices
- Follow industry standards (NIST, OWASP)
- Change default accounts and passwords
- Isolate/segment IoT traffic from core networks
- Monitor IoT communications for unusual patterns

---

## Video V74: Microservices & API Gateways

**Objective:** To explain microservices architecture and security considerations.

### I. Definition
- **Microservices:** Mini applications/services that work together to form a system (fine-grained control).

### II. Key Components

| Component | Function |
| :--- | :--- |
| **API Gateway** | Entry point to backend microservices; routes requests, protocol translation, security logging |
| **Service Mesh** | Dedicated infrastructure for service-to-service communications; adds resiliency and security |

### III. Security Measures
- **API Keys:** For non-sensitive communications
- **Authentication Tokens (JWT):** For sensitive functions (SAML, OpenID, OAuth)
- **Access Control:** Enable default policies; prevent privilege escalation
- **Network Segmentation:** Control and filter traffic for sensitive applications

---

## Video V75: Embedded Systems

**Objective:** To explain embedded systems security risks and protections.

### I. Definition
- Dedicated computing component (microprocessor/microcontroller) embedded within a larger device (pacemakers, ICS, automotive, medical devices).

### II. Attack Vectors

| Attack Type | Description |
| :--- | :--- |
| **User Interface** | Brute force inputs to unlock privileged features |
| **Physical** | Steal device, deny service, manipulate buttons |
| **Sensor Attacks** | Trick input sensors (vending machines, keyless entry) |
| **Output Attacks** | Manipulate actuators (electronic door locks) |
| **Processor/Firmware Attacks** | Target memory/processor; install rogue firmware |

### III. Protection Strategies
- Threat modeling
- Network segmentation (isolate traffic)
- Application firewall
- Wrapping/encapsulation (add security features not natively supported)
- Manual updates with digital signatures
- Redundancy; limit diversity

---

## Video V76: High-Performance Computing (HPC)

**Objective:** To explain HPC security challenges and protections.

### I. Definition
- **HPC:** Supercomputers that run in parallel to solve complex mathematical and scientific problems (millions of simultaneous tasks).

### II. Applications
- Research (atmospheric, nuclear, bioscience, seismology)
- Industry (healthcare, life sciences, energy, public sector)
- Technology (big data analytics, data mining, cryptocurrencies, medical imaging)

### III. Key Challenges
- Massive space requirements (up to 10 million CPU cores)
- High energy consumption (requires generators, UPS)
- Complex data separation and access control
- Geographically dispersed users (global access)
- Unreviewed R&D code (potential system damage)

### IV. Security Measures
- Threat modeling
- Data isolation and segmentation
- Hardware security features (trusted execution)
- Multi-factor authentication
- Identity management (reduce insider threats)
- Compliance with industry standards (NIST, OWASP)

---

## Video V77: Edge Computing Systems (Fog Computing)

**Objective:** To explain edge computing security challenges and protections.

### I. Definition
- **Edge Computing:** Computing resources near the data source (also called fog computing). Moves processing from centralized data centers to the network edge.

### II. Benefits
- Increased data availability
- Better network performance (reduced bandwidth demands)
- Improved data protection (minimizes data shared over the internet)

### III. Risks & Challenges
- Physical tampering of sensors/IoT devices
- Poor security on edge devices
- Difficult management (no remote access often)
- Limited security capabilities (hard to implement antivirus, endpoint security)
- Potential attack vectors into protected areas

### IV. Security Approaches
- Follow industry standards (NIST, OWASP)
- Change default accounts, passwords, certificates
- Update firmware frequently; apply vendor patches
- Remove unnecessary protocols and services
- Network segmentation (isolate edge traffic in own VLAN)

---

## Session Summary
Session 10 covers the **complete secure architecture design landscape** for the CISSP exam. Key takeaways include:
1.  **System Architectures:** Distributed (endpoint risks) and Client-Based (thick/thin/zero clients).
2.  **Database Security:** Aggregation, inference, polyinstantiation, and the ACID framework.
3.  **Common Criteria:** EAL levels 1–7 (EAL 4 for OS, EAL 5+ for specialized systems).
4.  **ICS/SCADA:** PLCs, DCS, SCADA; vulnerabilities from outdated, insecure-by-design systems.
5.  **SASE:** FWaaS, SWG, CASB, ZTNA as a unified cloud-delivered service.
6.  **IoT:** Isolation, default credential changes, and monitoring as key defenses.
7.  **Microservices:** API Gateway and Service Mesh with tokens, access controls, and segmentation.
8.  **Embedded Systems:** Physical, sensor, output, and firmware attacks; wrapping and segmentation for defense.
9.  **HPC:** Large footprint, global users, and need for MFA and hardware security.
10. **Edge Computing:** Local processing benefits with risks of physical tampering and limited security capabilities.
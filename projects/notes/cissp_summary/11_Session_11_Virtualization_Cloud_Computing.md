# Session 11: Virtualization and Cloud Computing

## Overview
This session covers virtualized systems, containerization, cloud deployment and service models, shared responsibility, virtual private clouds, and serverless computing. It consists of 8 videos (V78–V85).

---

## Video V78 (Outline): Virtualization and Cloud Computing (Section Intro)

**Objective:** To introduce the key topics in virtualization and cloud computing for the CISSP exam.

### Topics Covered in this Session
1.  Virtualized Systems (Type 1 vs. Type 2 Hypervisors)
2.  Containerization (Docker, Kubernetes)
3.  Cloud Deployment Models (Public, Private, Hybrid, Community)
4.  Cloud Service Models (IaaS, PaaS, SaaS)
5.  Shared Responsibility Model (SLA Types)
6.  Virtual Private Cloud (VPC)
7.  Serverless Computing (Function-as-a-Service)

---

## Video V79: Virtualized Systems (Type 1 vs. Type 2 Hypervisors)

**Objective:** To explain virtualization, hypervisors, and their security implications.

### I. Definition
- **Virtualization:** Creating a software-based representation of a physical component (server, storage, network).

### II. Key Features
- **Virtual Machine (VM):** Software-created computer
- **Elasticity:** Dynamic allocation/de-allocation of physical resources (CPU, memory, storage)
- **Hypervisor (VMM):** Connects virtual to physical world

### III. Hypervisor Types

| Feature | Type 1 (Bare Metal) | Type 2 (Hosted) |
| :--- | :--- | :--- |
| **Installation** | Directly on physical hardware (no underlying OS) | Runs as an application on top of an existing OS |
| **Use Case** | Data centers, enterprise servers (vSphere, ESXi, Xen) | Testing, sandboxing, malware analysis (VirtualBox, Workstation Player) |
| **Attack Surface** | Smaller (fewer layers) | Larger (multiple OS layers present) |

### IV. Security Risks
- **Hardware Vulnerabilities:** Physical defects impact all VMs
- **Hypervisor Vulnerabilities:** Unpatched hypervisors compromise all VMs
- **VM Escape:** Bypassing guest OS to interact with host OS (especially dangerous in Type 2)

### V. Protection Mechanisms
- Host critical assets on physical machines when possible
- Keep virtualization software patched
- Monitor for malicious activity

---

## Video V80: Containerization (Docker, Kubernetes)

**Objective:** To explain containerization and its security considerations.

### I. Definition
- **Containerization:** Operating system-level virtualization. Packages files, libraries, and dependencies for an application (nothing extra).

### II. Containers vs. Virtual Machines

| Feature | Containers | Virtual Machines |
| :--- | :--- | :--- |
| **Virtualization Layer** | Container engine (on host OS) | Hypervisor |
| **Resource Usage** | Lightweight; shares host OS kernel | Heavy; requires full OS per VM |
| **Isolation** | Process-level (shares host kernel) | Hardware-level (separate kernel) |
| **Risk Inheritance** | Inherits risks from host OS | Inherits risks from its own guest OS |

### III. Common Technologies
- **Docker:** Most popular container platform
- **Kubernetes (k8s):** Container orchestration
- **AWS ECS, GKE, LXC**

### IV. Security Risks
- Application vulnerabilities (malware, defects, untrusted images)
- Host OS attack surface
- Patching gaps (host OS, engine, apps inside)
- Configuration drift
- Container breakout (inter-container communication risks)

### V. Security Best Practices
- Group sensitive containers separately
- Use Trusted Platform Module (TPM) for hardware protections
- Minimize host OS attack surface
- Strong access controls for host OS and container software
- Encrypt registry keys, API connections, network communications
- Patch management (keep everything current)

---

## Video V81: Cloud Deployment Models (Public, Private, Hybrid, Community)

**Objective:** To explain the four cloud deployment models.

### I. Deployment Location Concepts

| Concept | Description |
| :--- | :--- |
| **On-Premise (On-Prem)** | Hosted locally; maintained by organization |
| **Off-Premise (Off-Prem)** | Hosted by third party (AWS, Azure, GCP); infrastructure maintained by vendor |

### II. The Four Deployment Models

| Model | Access | Risk Profile |
| :--- | :--- | :--- |
| **Public Cloud** | Available to general public (internet-facing) | Large attack surface; data exposed to internet |
| **Private Cloud** | Exclusive to a single organization | Contained risk; primary threats are internal |
| **Community Cloud** | Shared by two or more organizations | Mix of external and internal threats |
| **Hybrid Cloud** | Combination of models (typically public + private) | Multiple attack vectors |

### III. Security Considerations
- Data privacy (governance, regulations, compliance)
- Attack surface (public = internet threats, private = insider threats)
- Resources (patching, updates, external dependencies)
- Capabilities (business and security requirements drive the decision)

---

## Video V82: Cloud Service Models (IaaS, PaaS, SaaS)

**Objective:** To explain the three cloud service models and the shared responsibility progression.

### I. The Three Service Models

| Model | Customer Responsibility | Provider Responsibility | Example |
| :--- | :--- | :--- | :--- |
| **IaaS** | OS, apps, IAM, data | Hardware, hypervisor, networking | AWS EC2, Azure VMs |
| **PaaS** | Apps, IAM, data | Hardware, OS | Development platforms |
| **SaaS** | Access controls, data | Application down to bare metal | Training platform, Office 365 |

### II. Shared Responsibility Progression
- As you move from **IaaS → PaaS → SaaS**, provider responsibility increases and customer responsibility decreases.

### III. Cloud Access Security Broker (CASB)
- **Function:** Proxy between users and cloud assets; enforces security before access.
- **Capabilities:** Compliance checking, DLP, threat protection, data security, control enforcement.

---

## Video V83: Shared Responsibility Model (SLA Types)

**Objective:** To explain the shared responsibility model and service level agreements.

### I. Core Concept
- **CSP** is responsible for **security OF the cloud** (infrastructure)
- **Customer** is responsible for **security IN the cloud** (depends on services used)

### II. Service Model Responsibility Summary

| Model | Customer Controls | CSP Controls |
| :--- | :--- | :--- |
| **IaaS** | OS, apps, IAM, data, network traffic, firewalls | Physical infrastructure, compute, storage, networking backbone |
| **PaaS** | Apps, IAM, data | OS, network/firewalls, underlying platform |
| **SaaS** | Data, access to data | Everything else (platform, app, OS, networking, patching) |

### III. SLA Types

| Type | Description |
| :--- | :--- |
| **Service Level SLA** | Covers identical services offered to multiple customers (e.g., SaaS) |
| **Customer Level SLA** | Covers all services used by a single customer (customized services) |

---

## Video V84: Virtual Private Cloud (VPC)

**Objective:** To explain VPCs, their features, and security best practices.

### I. Definition
- **VPC:** A logically isolated virtual network within a public cloud environment (private cloud inside a public cloud).

### II. Key Benefits
- **Enhanced Security:** Isolate resources; control network access
- **Scalability and Flexibility:** Scale up or down; optimize cost
- **Custom Networking:** Subnets, security groups, firewalls, custom IP addresses

### III. Connection Types

| Type | Description |
| :--- | :--- |
| **Direct Connect** | Dedicated high-speed circuit (data center to VPC) |
| **Peering** | Connect two VPCs; share same credentials |
| **VPN Connection** | Secure tunnel over internet via VPN gateway |

### IV. Internal Networking Components

| Component | Function |
| :--- | :--- |
| **Subnets** | Logical isolation; group resources; acts like packet filter |
| **Security Groups** | Virtual firewalls; control instance-level traffic |
| **Network ACLs** | Subnet-level firewall (stateless filtering) |

### V. Best Practices
- Network segmentation
- Least privilege (restrict access by role)
- Encryption (data at rest and in transit)
- Monitoring and logging (CloudWatch, SIEM)

---

## Video V85: Serverless Computing (Function-as-a-Service)

**Objective:** To explain serverless computing risks and mitigations.

### I. Definition
- **Serverless Computing (FaaS):** On-demand computing resources; removes infrastructure management overhead. Responsibility shifts to Cloud Service Provider.

### II. Benefits
- Faster application development
- Cost-effective (pay per use)

### III. Risks & Drawbacks

| Risk | Description |
| :--- | :--- |
| **Increased Attack Surface** | Spans CSP infrastructure; larger than static deployments |
| **Control Gaps** | Traditional security tools may be ineffective |
| **Performance & Availability** | "Cold starts" and timeouts on infrequent use |

### IV. Mitigation Strategies
- Define security responsibilities in SLA
- Minimize code (smaller code baselines improve efficiency and control)
- Limit sensitive data (ensure confidentiality and integrity in architecture)

---

## Session Summary
Session 11 covers the **complete virtualization and cloud computing landscape** for the CISSP exam. Key takeaways include:
1.  **Virtualized Systems:** Type 1 (bare metal) vs. Type 2 (hosted) hypervisors; VM escape risk.
2.  **Containerization:** Lightweight OS-level virtualization; shares host kernel; inherits host OS risks.
3.  **Cloud Deployment Models:** Public, Private, Community, Hybrid (each with different risk profiles).
4.  **Cloud Service Models:** IaaS, PaaS, SaaS (responsibility shifts from customer to provider).
5.  **Shared Responsibility:** CSP secures the cloud; customer secures what's IN the cloud.
6.  **VPC:** Logically isolated virtual network with subnets, security groups, and NACLs.
7.  **Serverless Computing (FaaS):** On-demand, cost-effective, but increased attack surface and control gaps.
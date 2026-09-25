# Session 13: Cloud and Datacenter

## V112 - Section Outline
- **Topics**: Cloud computing, virtualization, and the data center.
- **Course Objectives**: 1.3 (summarize cloud concepts and connectivity options), 1.8 (summarize evolving use cases).
- **Topics Covered**:
  - Cloud characteristics (high availability, scalability, elasticity, metered utilization, shared resources, file synchronization).
  - Cloud service models (IaaS, PaaS, SaaS).
  - Cloud deployment models (public, private, community, hybrid).
  - Cloud connectivity (VPN, private-direct connection).
  - Cloud security (VPCs).
  - Network virtualization & SDN.
  - SD-WAN.
  - VXLAN.
  - SASE & SSE.

## V113 - Cloud Characteristics (Benefits)
- **High Availability**: Very little downtime (e.g., five nines = 99.999%).
- **Scalability**: Increase load at linear/sub-linear cost. Vertical (scale up) vs. Horizontal (scale out).
- **Rapid Elasticity**: Scale up/down quickly in real-time.
- **Metered Utilization**: Pay-per-use (pay exactly for what you use). Distinguish from measured service (pay upfront for fixed allowance).
- **Shared Resources**: Pooling hardware across multiple users (virtual machines on shared physical servers).
- **File Synchronization**: Placing a file in one cloud location automatically spreads/copies to other locations.

## V114 - Cloud Service Models (IaaS, PaaS, SaaS)
- **IaaS (Infrastructure as a Service)**: Provides hardware (servers, storage, networking, virtualization). Customer manages OS, middleware, runtime, apps. (e.g., AWS EC2).
- **PaaS (Platform as a Service)**: Provides hardware + OS + middleware + runtime + database. Customer manages app code and data. (e.g., AWS Elastic Beanstalk).
- **SaaS (Software as a Service)**: Provides complete solution (hardware, OS, middleware, runtime, app). Customer just uses the software. (e.g., Office 365, Google Workspace).

## V115 - Cloud Deployment Models
- **Public Cloud**: Provider makes resources available over the internet (e.g., AWS, Azure, Google Cloud).
- **Private Cloud**: Organization builds its own cloud for internal use (e.g., GovCloud). Higher security, more expensive.
- **Hybrid Cloud**: Mix of public and private cloud.
- **Community Cloud**: Shared resources among several organizations with common needs.
- **Multi-tenancy**: Same physical resources shared by multiple organizations (efficient but risky).
- **Single tenancy**: Dedicated resources for one organization (more secure, less efficient, more expensive).

## V116 - Creating a Cloud Server (AWS Lightsail Demo)
- Demonstrates creating a virtual Linux server (CentOS) in the cloud using Amazon Lightsail.
- Shows connecting via SSH, basic Linux commands (`pwd`, `ls`, `cd`, `touch`, `vi`, `cat`), and managing storage/snapshots.

## V117 - Cloud Connectivity (VPN vs. Private-Direct)
- **VPN (Virtual Private Network)**: Site-to-site IPSec VPN over public internet. Max speed (AWS example) up to 4 Gbps. Lower cost (~$0.09/GB).
- **Private-Direct Connection**: Dedicated leased line bypassing the internet (e.g., AWS Direct Connect, Azure ExpressRoute). Faster (up to 40 Gbps), more redundant, 2–3× higher cost.

## V118 - Cloud Security (Virtual Private Cloud - VPC)
- **VPC (Virtual Private Cloud)**: Logically isolated section of a cloud provider’s infrastructure.
- **Key Components**:
  - **Subnets**: Public (internet accessible) or Private.
  - **Route Tables**: Direct network traffic.
  - **Internet Gateways**: Connect VPC to internet.
  - **NAT Gateways**: Allow private subnets to connect to internet (but prevent inbound).
  - **Network ACLs**: Stateless firewall at subnet level.
  - **Security Groups**: Stateful firewall at instance level (preferred).
  - **VPC Peering**: Private connection between two VPCs.
  - **VPC Endpoints**: Private connectivity to cloud services.
  - **VPN Connections**: Connect VPC to remote network.

## V119 - Network Function Virtualization (NFV)
- **Definition**: Extracts network functions (routing, firewalling, load balancing) from dedicated hardware → runs as software applications (VNFs) on standard servers.
- **Three Main Components**:
  1. **NFV Infrastructure (NFVI)** : Hardware + virtual resources + virtualization layer.
  2. **Management and Network Orchestration (MANO)** : Manages VNF lifecycle.
  3. **Virtual Network Functions (VNFs)** : Software implementations of former hardware-bound functions.
- **Benefits**: Flexibility, rapid deployment, cost efficiency.
- **Challenges**: Security, complexity, need for skilled personnel.

## V120 - Software-Defined Networking (SDN)
- **Definition**: Uses software-based controllers to direct traffic; separates control plane, data plane, and management plane.
- **The Three Planes**:
  - **Control Plane**: Makes decisions (routing, security).
  - **Data Plane (Forwarding Plane)**: Carries actual user traffic.
  - **Management Plane**: Monitors and manages the network.
- **Types**: Open SDN (open source), Hybrid SDN, SDN Overlay (creates virtual network layers).
- **Benefits**: Vendor agnostic, speed/agility, critical for cloud automation.
- **Disadvantages**: Single point of failure (controller), security target.

## V121 - SD-WAN (Software-Defined Wide Area Network)
- **Definition**: Virtualized approach to managing and optimizing WAN connections. Extracts control from underlying hardware.
- **Can leverage any transport**: MPLS, cellular, microwave, broadband, etc.
- **Benefit**: More dynamic and efficient than traditional WAN (which backhauls all traffic to HQ).

## V122 - VXLAN (Virtual Extensible LAN)
- **Definition**: Network overlay that encapsulates Ethernet frames inside UDP packets. Extends Layer 2 networks over a Layer 3 infrastructure.
- **Problem solved**: VLANs limited to 4,096 identifiers; VXLAN uses 24-bit VNI → over 16 million identifiers.
- **Key Components**:
  - **VTEP (VXLAN Tunnel End Point)** : Performs encapsulation/de-encapsulation.
  - **VXLAN Segment**: Layer 2 network over Layer 3; identified by unique VNI.
- **Benefits**: Scalability, flexibility, improved utilization.
- **Challenges**: Complex configuration, latency/overhead, multicast requirement.

## V123 - SASE & SSE
- **SASE (Secure Access Secure Edge)** : Consolidates WAN and security functions into a single cloud-native service. Uses SDN to provide security/networking from the cloud.
- **SSE (Security Service Edge)** : Key subset of SASE focused exclusively on security services (SWG, CASB, ZTNA).
- **Core Technologies**:
  - **SWG (Secure Web Gateway)** : Inspects/filters web traffic.
  - **CASB (Cloud Access Security Broker)** : Monitors activity between cloud consumers and providers.
  - **ZTNA (Zero Trust Network Access)** : No user/device is trusted by default; access based on identity and context.
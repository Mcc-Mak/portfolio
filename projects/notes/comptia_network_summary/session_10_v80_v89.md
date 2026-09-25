# Session 10: Routing

## V80 - Section Outline
- **Router Function**: Forward traffic between different subnets/networks. Routers separate **broadcast domains** (Layer 3).
- **Course Objectives**: 1.4 (common ports/protocols), 2.1 (characteristics of routing technologies).
- **Topics Covered**:
  - Routing fundamentals & tables.
  - Routing protocols (RIP, OSPF, BGP, etc.).
  - Route selection (administrative distance, metrics).
  - Address translation (Static NAT, Dynamic NAT, PAT).
  - Routing redundancy protocols (HSRP, VRRP, GLBP).
  - Multicast routing (IGMP, PIM).
  - GRE (Generic Routing Encapsulation).

## V81 - Routing Fundamentals
- **Basic Routing Process**:
  1. PC sends ARP → switch forwards to default gateway (router).
  2. MAC addresses (Layer 2) → IP addresses (Layer 3) at router.
  3. Router repackages data frame → Layer 3 **packet** with IP header.
  4. Packet sent over WAN to next router.
  5. Next router strips IP header → back to Layer 2 data frame with destination MAC.
  6. Frame delivered via switch to destination PC.
- **Key transition**: Data frame (L2) → Packet (L3) → Data frame (L2).

## V82 - Routing Tables & Route Sources
- **Routing Table**: Contains destination network, next-hop router, outgoing port, cost.
- **Three Sources of Routing Information**:
  1. **Directly connected**: Learned via physical cabling.
  2. **Static routes**: Manually configured by admin. Default route `0.0.0.0/0`.
  3. **Dynamic routing**: Automatically learned via routing protocols.
- **Loop Prevention**: Split Horizon (don't advertise back out same interface) & Poison Reverse (advertise back with high cost).

## V83 - Routing Protocols
- **Interior Gateway Protocols (IGPs)** – Operate within an autonomous system:
  - **RIP (Routing Information Protocol)**: Distance vector, hop count (max 15), slow convergence.
  - **OSPF (Open Shortest Path First)**: Link state, uses cost (link speed), fast convergence, vendor-neutral.
  - **IS-IS**: Link state, similar to OSPF but less adopted.
  - **EIGRP**: Hybrid (advanced distance vector), Cisco proprietary, uses bandwidth + delay.
- **Exterior Gateway Protocol (EGP)** – Between autonomous systems:
  - **BGP (Border Gateway Protocol)**: Path vector, uses AS hops, backbone of the internet.

## V84 - Route Selection (Administrative Distance & Metrics)
- **Administrative Distance (AD)** : Lower AD = more believable.
  - Directly connected (0) > Static (1) > EIGRP > OSPF > RIP > External EIGRP > Unknown (255).
- **Metrics**: Lower metric = better. Examples: hop count, bandwidth, delay, reliability, cost.

## V85 - Address Translation (NAT & PAT)
- **NAT (Network Address Translation)**: Translates private IPs ↔ public IPs.
  - **Static NAT (SNAT)**: Manual one-to-one mapping (security).
  - **Dynamic NAT (DNAT)**: Automatic one-to-one mapping from a pool.
- **PAT (Port Address Translation)**: Many-to-one translation. Uses port numbers to distinguish sessions. Most common for home/small office networks.
- **Key Terminology**:
  - **Inside Local**: Private IP of an inside device.
  - **Inside Global**: Public IP of an inside device.
  - **Outside Local**: Private IP referencing an outside device.
  - **Outside Global**: Public IP referencing an outside device.

## V86 - Routing Redundancy Protocols (FHRP)
- **FHRP (First Hop Redundancy Protocol)**: Provides automatic failover to a backup router.
- **HSRP (Hot Standby Router Protocol)**: Cisco proprietary. Active/standby routers.
- **VRRP (Virtual Router Redundancy Protocol)**: Open standard. Primary/backup routers.
- **GLBP (Gateway Load Balancing Protocol)**: Cisco. Load balancing + redundancy; all routers can forward traffic simultaneously.

## V87 - Understanding Routers (Cisco Packet Tracer Demo)
- Demonstrates static routing configuration in a lab with multiple subnets (HR, IT, Support).
- Shows how packets are routed from a source PC to a destination web server using routing tables.

## V88 - Multicast Routing
- **IGMP (Internet Group Management Protocol)** : Used by clients/routers so routers know which interfaces have multicast receivers.
- **PIM (Protocol Independent Multicast)** : Routes multicast traffic between routers.
  - **PIM-DM (Dense Mode)**: Flood & prune. High initial traffic, rarely used.
  - **PIM-SM (Sparse Mode)**: Uses shared distribution tree initially, then switches to shortest path tree (SPT). Preferred in modern networks.

## V89 - Generic Routing Encapsulation (GRE)
- **Definition**: Tunneling protocol at Layer 3, configured on routers, encapsulates various network layer protocols.
- **Use case**: Creating private tunnels over public networks (e.g., connecting branch offices).
- **GRE vs. VPN**: GRE is lightweight (no built-in encryption); can be combined with VPN for encapsulation + encryption.
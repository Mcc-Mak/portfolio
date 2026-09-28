# Session 9: IP Addressing

## V68 - Section Outline
- **IP Address**: Numerical label assigned to devices for identification. Used at Layer 3 (Network layer) for routing between networks.
- **Course Objectives**: 1.4 (common ports/protocols), 1.7 (IPv4 addressing), 1.8 (evolving use cases).
- **Topics Covered**:
  - IPv4 basics (dotted decimal, binary representation).
  - IPv4 address types (Class A/B/C/D/E, public, private, loopback, APIPA).
  - IPv4 data flows (unicast, multicast, broadcast).
  - Binary/decimal conversions.
  - Subnetting (classful vs. classless, CIDR, VLSM).
  - IPv6 addressing (128-bit, hexadecimal, shorthand, address types).
  - IPv4/IPv6 compatibility (dual stack, tunneling, NAT64).

## V69 - IPv4 Addressing Basics
- **Format**: Dotted-decimal notation (e.g., `192.168.1.4`). Each decimal number is an **octet** (8 bits) → total 32 bits.
- **Subnet Mask**: Determines network portion (binary `1`s) vs. host portion (binary `0`s).
- **Address Classes** (based on first octet):
  - **Class A**: 1–127. Default mask `255.0.0.0` (/8). ~16.7 million hosts.
  - **Class B**: 128–191. Default mask `255.255.0.0` (/16). 65,536 hosts.
  - **Class C**: 192–223. Default mask `255.255.255.0` (/24). 256 hosts.
  - **Class D**: 224–239. Multicasting.
  - **Class E**: 240–255. Experimental (invalid in production).
- **Classful vs. Classless (CIDR)**:
  - **Classful**: Using the default mask for the class.
  - **Classless (CIDR)**: Any non-default mask. Notation: `192.168.1.4/24` (24 = number of network bits).

## V70 - IPv4 Address Types (Public, Private, Loopback, APIPA)
- **Public IPv4 Address**: Unique global identifier for internet communication. Must be leased/purchased from ISP. Managed by ICANN/RIRs.
- **Private IPv4 Address (RFC 1918)**: Non-internet routable, used within local networks. Uses NAT to map to public IPs.
  - Class A: `10.0.0.0 – 10.255.255.255`
  - Class B: `172.16.0.0 – 172.31.255.255`
  - Class C: `192.168.0.0 – 192.168.255.255`
- **Loopback/Localhost**: `127.0.0.1` (entire `127.0.0.0/8` reserved). Used for testing.
- **APIPA (Automatic Private IP Addressing)**: `169.254.0.0 – 169.254.255.255`. Fallback when DHCP fails.

## V71 - IPv4 Data Flows
- **Unicast**: One-to-one.
- **Multicast**: One-to-many (specific group).
- **Broadcast**: One-to-all (on the local network).

## V72 - Assigning IP Addresses (Static vs. Dynamic)
- **Static Assignment**: Manual entry of IP, subnet mask, gateway, DNS. Prone to error, impractical for large networks.
- **Dynamic Assignment (DHCP)**: Automatically assigns IP, subnet mask, gateway, DNS.
- **DHCP Process (DORA)** : Discover → Offer → Request → Acknowledge.
- **APIPA**: Self-assigned (`169.254.x.x`) when DHCP fails.
- **ZeroConf**: Newer, based on APIPA. Adds mDNS (name resolution without DNS) + service discovery (Bonjour, LLMNR).

## V73 - Binary to Decimal Conversion
- **Method**: Use a “power of 2” table (1,2,4,8,16,32,64,128).
- **Binary → Decimal**: Add table values where binary digit = 1.
- **Decimal → Binary**: Subtract largest possible table value, put 1 in that column, carry remainder.

## V74 - Subnetting (Concepts & Formulas)
- **Why subnet?** To split a large network into smaller, logical subnetworks (efficient IP usage, security, bandwidth control).
- **Formulas**:
  - Number of subnets = \( 2^s \) (s = borrowed host bits).
  - Usable hosts per subnet = \( 2^h - 2 \) (h = remaining host bits). Subtract 2 for network ID & broadcast address.
- **CIDR Notation**: `/n` where n = number of network bits (e.g., /24 = 255.255.255.0).
- **VLSM (Variable-Length Subnet Mask)**: Subnets of different sizes.
- **Exam Tip**: Memorize chart for /24 to /30 (CIDR, # of subnets, total IPs, usable IPs).

## V75 - Subnetting Practice Problems
- Example: Given a `/24` and department size requirements, calculate appropriate CIDR notations (e.g., /26 for 64 IPs, /29 for 8 IPs).
- Example: Calculate assignable IPs in a `/27` (32 total – 2 = 30 assignable).

## V76 - Subnetting by Hand (Shortcut)
- Uses a memorized power-of-2 shortcut (“subnetting gloves”).
- Right-to-left: number of subnets (/25=2, /26=4, /27=8…).
- Left-to-right: total IPs per subnet (/24=256, /25=128, /26=64…).
- Usable hosts = total IPs − 2.

## V77 - IPv6 Addressing
- **Address size**: 128 bits (vs IPv4’s 32 bits). Written in **hexadecimal**, groups of 4 hex digits separated by colons.
- **Shorthand rules**:
  1. Drop leading zeros in a segment.
  2. Replace consecutive all-zero segments with `::` (can only use **once** per address).
- **Address Types**:
  - **Unicast**: Single interface. Globally-routed starts `2000`–`3999`; Link-local starts `FE80`.
  - **Multicast**: Group of interfaces. Starts `FF`.
  - **Anycast**: Any one of a set of interfaces (allocated from unicast space).
- **SLAAC (Stateless Address Autoconfiguration)**: Host assigns itself a link-local address using EUI-64 (derived from MAC address).
- **NDP (Neighbor Discovery Protocol)**: Learns Layer 2 addresses and network topology.

## V78 - IPv6 Data Flows
- **Unicast**: Same as IPv4.
- **Multicast**: Same as IPv4.
- **Anycast** (new in IPv6): Allows one host to efficiently update routing tables for a group of hosts. Replaces broadcast.

## V79 - IPv4 & IPv6 Compatibility
- **Dual Stack**: Devices run both IPv4 and IPv6 simultaneously; prefer IPv6, fall back to IPv4.
- **Tunneling**: Encapsulate IPv6 packets inside IPv4 packets to traverse IPv4 networks (e.g., 6to4, Teredo, ISATAP).
- **NAT64**: Translates IPv6 addresses ↔ IPv4 addresses, allowing IPv6-only devices to communicate with IPv4 servers.
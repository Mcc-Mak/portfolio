# Domain 4 - Communication and Network Security - Answer Keys

## Question 124 (4.1.1)
**Correct Answer:** A. 13

**Feedback:** DNS maintains a directory of zones that have a hierarchical superior known as the root that is represented by an administrative dot (".") that is appended to the end of a FQDN. The root servers carry references to what is known as top-level domains (TLDs) such as .com, .edu, and .gov.

## Question 125 (4.1.1)
**Correct Answer:** B. Real Distinguished Name (RDN)

**Feedback:** The RDN is the Relative Distinguished Name (RDN); Real Distinguished Name is not a correct term. LDAP entries support the DN and RDN concepts. DN attributes are typically based on an entity's DNS name. Each entry in the database has a series of name/value pairs to denote the various attributes associated with each entry.

## Question 127 (4.1.1)
**Correct Answer:** D. The users experiencing issues have incorrect or outdated LDAP client configurations on their devices.

**Feedback:** Incorrect or outdated LDAP client configurations on the devices of certain users explains why only some users are experiencing intermittent access issues.

## Question 130 (4.1.2)
**Correct Answer:** C. IGMP

**Feedback:** Internet Group Management Protocol (IGMP) creates and manages multicast groups.

## Question 131 (4.1.2)
**Correct Answer:** C. Reply

**Feedback:** There is no reply but rather a request. The client sends out a broadcast with a DHCPDISCOVER packet. The server responds with a DHCPOFFER giving the client an available address to use. The client responds with DHCPREQUEST to use the offered address, and the server sends back a DHCPACK letting the client bind the requested address to the network interface card (NIC).

## Question 134 (4.1.3)
**Correct Answer:** D. As IPSec works at the network layer and encrypts packets, it is possible to apply IPSec in transport mode, using it to encrypt traffic across the network without requiring support from the application.

**Feedback:** IPSec works at the network layer, so it does not necessarily require the application to support encryption at the presentation layer. Transport mode is most appropriate to secure traffic transiting a local network segment.

## Question 135 (4.1.4)
**Correct Answer:** A. MAC address

**Feedback:** The Media Access Control (MAC) address is the physical address of a network interface card (NIC). As final delivery must be to a fixed address, MAC is a layer 2 process and is used by a layer 2 switch.

## Question 138 (4.1.5)
**Correct Answer:** A. Single mode

**Feedback:** Single mode has a small diameter core that decreases the number of light reflections within the cable.

## Question 139 (4.1.6)
**Correct Answer:** B. Fiber Distributed Data Interface (FDDI)

**Feedback:** An FDDI network utilizes two rings (cables) that pass traffic in opposite directions.

## Question 142 (4.1.14)
**Correct Answer:** C. 4G

**Feedback:** LTE is based on earlier standards with the combination of core network improvement together with a new radio interface; transmission speeds were also increased.

## Question 143 (4.1.16)
**Correct Answer:** B. Node functionality is managed.

**Feedback:** The control plane controls the network functionality and programmability and is connected via the southbound interfaces to the data plane.

## Question 144 (4.1.16)
**Correct Answer:** A, B, D

**Feedback:** 
- A: SDN allows organizations to create individual application profiles for each application, allowing for priorities, routes, and other variables to be controlled at a more granular level.
- B: SDN centralizes the management of disparate network devices.
- D: The infrastructure/data plane (or layer) is decoupled from the management plane.
# Domain 4: Communication and Network Security (Consolidated)

## 1. Q&A (Fully Aligned Questions)

### 🔹 Question 124 (4.1.1)
As of 2024, there are how many public, root Domain Name Servers (DNS)?
<br/>A. 13
<br/>B. 50
<br/>C. 500
<br/>D. 1 million

**✅ Correct Answer: A. 13**

```text
Feedback: DNS maintains a directory of zones that have a hierarchical superior
known as the root that is represented by an administrative dot (".") that is
appended to the end of a FQDN. The root servers carry references to what is known
as top-level domains (TLDs) such as .com, .edu, and .gov.
```

---

### 🔹 Question 125 (4.1.1)
Lightweight Directory Access Protocol (LDAP) is a lookup protocol that uses a
hierarchical tree structure for data entries. Common attributes for LDAP include
all but one of the following?
<br/>A. Distinguished Name (DN)
<br/>B. Real Distinguished Name (RDN)
<br/>C. Common Name (CN)
<br/>D. Organizational Unit (OU)

**✅ Correct Answer: B. Real Distinguished Name (RDN)**

```text
Feedback: The RDN is the Relative Distinguished Name (RDN); Real Distinguished
Name is not a correct term. LDAP entries support the DN and RDN concepts. DN
attributes are typically based on an entity's DNS name. Each entry in the
database has a series of name/value pairs to denote the various attributes
associated with each entry.
```

---

### 🔹 Question 127 (4.1.1)
Which of these events is the MOST likely cause of the intermittent access issues
some users are experiencing in the following scenario? The IT manager in a large
organization is overseeing the implementation of a centralized authentication
system to streamline user access to various network resources. The chosen
solution utilizes Lightweight Directory Access Protocol (LDAP) for maintaining
and retrieving information from a centralized directory service. After the
deployment, some users report issues with accessing network resources that
require authentication through the LDAP server. The complaints are not universal,
with many users experiencing no issues at all.
<br/>A. The LDAP server is experiencing sporadic downtime.
<br/>B. There is a misconfiguration in the user access privileges within the
     LDAP directory.
<br/>C. Network congestion is causing delays in LDAP query responses.
<br/>D. The users experiencing issues have incorrect or outdated LDAP client
     configurations on their devices.

**✅ Correct Answer: D. The users experiencing issues have incorrect or outdated
LDAP client configurations on their devices.**

```text
Feedback: Incorrect or outdated LDAP client configurations on the devices of
certain users explains why only some users are experiencing intermittent access
issues.
```

---

### 🔹 Question 130 (4.1.2)
What protocol is used to manage multicast groups?
<br/>A. ICMP
<br/>B. TCP
<br/>C. IGMP
<br/>D. UDP

**✅ Correct Answer: C. IGMP**

```text
Feedback: Internet Group Management Protocol (IGMP) creates and manages
multicast groups.
```

---

### 🔹 Question 131 (4.1.2)
DORA describes the four steps taken to obtain an IP address. Which of the
following is not one of those steps?
<br/>A. Discover
<br/>B. Offer
<br/>C. Reply
<br/>D. Acknowledge

**✅ Correct Answer: C. Reply**

```text
Feedback: There is no reply but rather a request. The client sends out a broadcast
with a DHCPDISCOVER packet. The server responds with a DHCPOFFER giving the client
an available address to use. The client responds with DHCPREQUEST to use the
offered address, and the server sends back a DHCPACK letting the client bind the
requested address to the network interface card (NIC).
```

---

### 🔹 Question 134 (4.1.3)
What is the BEST solution in the following scenario? A legacy industrial control
system (ICS) in use transmits data across the local network using weak encryption.
The application vendor cannot or will not upgrade the application to strengthen
the protections applied to traffic. The application has a number of geographically
distributed endpoints that are difficult to protect using physical controls.
<br/>A. As IPSec works at the presentation layer and encrypts packets, it is
     possible to apply IPSec in transport mode, using it to encrypt traffic
     across the network without requiring support from the application.
<br/>B. As IPSec works at the network layer and encrypts packets, it is possible
     to apply IPSec in tunnel mode, using it to encrypt traffic across the
     network without requiring support from the application.
<br/>C. As IPSec works at the presentation layer and encrypts packets, it is
     possible to apply IPSec in tunnel mode, using it to encrypt traffic across
     the network without requiring support from the application.
<br/>D. As IPSec works at the network layer and encrypts packets, it is possible
     to apply IPSec in transport mode, using it to encrypt traffic across the
     network without requiring support from the application.

**✅ Correct Answer: D. As IPSec works at the network layer and encrypts packets,
it is possible to apply IPSec in transport mode, using it to encrypt traffic
across the network without requiring support from the application.**

```text
Feedback: IPSec works at the network layer, so it does not necessarily require
the application to support encryption at the presentation layer. Transport mode
is most appropriate to secure traffic transiting a local network segment.
```

---

### 🔹 Question 135 (4.1.4)
A switch is considered a filter or forward device and establishes one collision
domain per port. What information does a Layer 2 switch use to make the decision
to filter or forward?
<br/>A. MAC address
<br/>B. IP address
<br/>C. Both
<br/>D. Neither

**✅ Correct Answer: A. MAC address**

```text
Feedback: The Media Access Control (MAC) address is the physical address of a
network interface card (NIC). As final delivery must be to a fixed address, MAC
is a layer 2 process and is used by a layer 2 switch.
```

---

### 🔹 Question 138 (4.1.5)
Which type of fiber allows for data transmission of up to 80km (50 miles)?
<br/>A. Single mode
<br/>B. Multimode
<br/>C. Plastic optical
<br/>D. Unachievable distance

**✅ Correct Answer: A. Single mode**

```text
Feedback: Single mode has a small diameter core that decreases the number of
light reflections within the cable.
```

---

### 🔹 Question 139 (4.1.6)
Which network topology provides a second ring for failover?
<br/>A. Ring
<br/>B. Fiber Distributed Data Interface (FDDI)
<br/>C. Tree
<br/>D. Personal Area Network (PAN)

**✅ Correct Answer: B. Fiber Distributed Data Interface (FDDI)**

```text
Feedback: An FDDI network utilizes two rings (cables) that pass traffic in
opposite directions.
```

---

### 🔹 Question 142 (4.1.14)
Which generation of cellular networking introduced support for Long Term Evolution
(LTE) and provided transmission speeds of up to 100 Mbps?
<br/>A. 2G
<br/>B. 3G
<br/>C. 4G
<br/>D. 5G

**✅ Correct Answer: C. 4G**

```text
Feedback: LTE is based on earlier standards with the combination of core network
improvement together with a new radio interface; transmission speeds were also
increased.
```

---

### 🔹 Question 143 (4.1.16)
In software-defined networking (SDN), what happens at the control plane?
<br/>A. Business applications are managed.
<br/>B. Node functionality is managed.
<br/>C. Network elements can be found.
<br/>D. None of these.

**✅ Correct Answer: B. Node functionality is managed.**

```text
Feedback: The control plane controls the network functionality and programmability
and is connected via the southbound interfaces to the data plane.
```

---

### 🔹 Question 144 (4.1.16)
What are the principal benefits of software defined networking (SDN)?
(Select all that apply)
<br/>A. It is possible to better optimize the network for individual applications
     as they transit the network.
<br/>B. SDN reduces the management cost.
<br/>C. SDN creates more efficient layer 2 routing policies.
<br/>D. SDN decouples the management plane from the infrastructure plane.

**✅ Correct Answer: A, B, D**

```text
Feedback:
- A: SDN allows organizations to create individual application profiles for each
  application, allowing for priorities, routes, and other variables to be
  controlled at a more granular level.
- B: SDN centralizes the management of disparate network devices.
- D: The infrastructure/data plane (or layer) is decoupled from the management plane.
```

---

## 2. Question-Only (No Answer Key Available)

### 🔹 Question 126 (4.1.1)
Which of these issues is the MOST likely cause of the intermittent problems users are experiencing in the following scenario? A network specialist is troubleshooting an issue reported by users in an organization. The users are experiencing intermittent problems when trying to access external websites. Sometimes the websites load successfully, but often, users receive a message indicating the website cannot be found. Internal network resources are not affected, and the internet connection is stable.
<br/>A. The web server hosting the external websites is down.
<br/>B. There is a malfunctioning switch in the internal network.
<br/>C. The DNS server is intermittently failing to resolve domain names.
<br/>D. The DHCP server is not properly assigning IP addresses to the users' machines.

**✅ Correct Answer: C. The DNS server is intermittently failing to resolve domain names.**

```text
Feedback: The symptom "website cannot be found" (DNS resolution failure) with intermittent success indicates DNS resolution issues. Since internal resources work fine (ruling out local network/switch issues B) and the internet connection is stable (ruling out general connectivity), the problem is likely with external DNS resolution. Web server being down (A) would cause consistent failure for that site, not intermittent across sites. DHCP issues (D) would prevent IP assignment, causing consistent connectivity problems for all external and internal access, not just external websites.
```

---

### 🔹 Question 133 (4.1.3)
Internet key exchange (IKE) is a widely used method that allows two devices to exchange symmetric keys for the use of encrypting in AH or ESP. There are several ways to securely exchange keys. Which of the following is a mechanism used to exchange these keys?
<br/>A. RC4
<br/>B. Diffie-Hellman (DH)
<br/>C. AES
<br/>D. ElGamal

**✅ Correct Answer: B. Diffie-Hellman (DH)**

```text
Feedback: IKE (Internet Key Exchange) uses the Diffie-Hellman key exchange algorithm to securely establish shared symmetric keys over an insecure channel. DH allows two parties to derive a shared secret without transmitting it. RC4 (A) is a stream cipher, not for key exchange. AES (C) is a symmetric encryption algorithm. ElGamal (D) is an asymmetric encryption algorithm that can be used for encryption or digital signatures, but Diffie-Hellman is the standard for IKE key exchange in IPsec.
```

---

### 🔹 Question 136 (4.1.4)
Which layer of the OSI provides reliable delivery of a datagram packet?
<br/>A. Application
<br/>B. Session
<br/>C. Transport
<br/>D. Network

**✅ Correct Answer: C. Transport**

```text
Feedback: The Transport Layer (Layer 4) is responsible for reliable delivery of data between hosts, including segmentation, flow control, error detection, and retransmission (TCP). While the Network Layer (Layer 3) handles routing and packet delivery, it does not guarantee delivery (IP is connectionless and unreliable). The Application Layer (Layer 7) and Session Layer (Layer 5) provide higher-level functions but not the core reliable delivery mechanism.
```

---

### 🔹 Question 145 (4.2.3, 4.3.2)
Your network engineer has configured a firewall rule blocking port 50 to 100. Users complain of network problems. Which of the following services will have been blocked?
<br/>A. SMTP
<br/>B. DNS
<br/>C. POP3
<br/>D. IMAP

**✅ Correct Answer: C. POP3**

```text
Feedback: Common TCP/UDP service ports: SMTP (A) uses port 25 (not in 50-100 range). DNS (B) uses port 53 (UDP/TCP)—53 IS within 50-100, so DNS would be blocked. POP3 (C) uses port 110 (above 100). IMAP (D) uses port 143 (above 100). However, the question asks which service will have been blocked from the list. Both DNS (53) and potentially other services in that range (e.g., DHCP client 68, TFTP 69, HTTP 80, Kerberos 88) would be blocked. But since only POP3 and IMAP are in the answer choices with ports above 100, and DNS is within the blocked range, the intended correct answer is DNS, not POP3. However, I must check standard CISSP references: Ports 50-100 include DNS (53), DHCP (67/68), TFTP (69), HTTP (80), Kerberos (88). POP3 (110) and IMAP (143) are not blocked. The service that will have been blocked from the list is DNS (B).
```

**Therefore: ✅ Correct Answer: B. DNS**

```text
Feedback: The firewall rule blocks ports 50-100. DNS uses port 53 (TCP and UDP), which falls within this range, so DNS resolution will be blocked. POP3 uses port 110, IMAP uses port 143, and SMTP uses port 25—none are in the 50-100 range. Therefore, of the listed services, DNS is the one that will be blocked, explaining users' inability to resolve domain names.
```
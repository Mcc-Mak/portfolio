# Domain 3: Security Architecture and Engineering (Consolidated)

## 1. Q&A (Fully Aligned Questions)

### 🔹 Question 85 (3.1.2)
Granting users only the permissions required to carry out a task(s) is known as what?
<br/>A. Need to know
<br/>B. Separation of duties
<br/>C. Defense in depth
<br/>D. Least privilege

**✅ Correct Answer: D. Least privilege**

```text
Feedback: Least privilege is the practice of granting a user the minimum
permissions necessary to perform their explicit job function. The principle of
need to know occurs by telling users only what they need for a specific task.
```

---

### 🔹 Question 86 (3.1.3)
The original defense-in-depth model defined all but which of the following as a
layer of defense?
<br/>A. Data
<br/>B. Software
<br/>C. Application
<br/>D. Host

**✅ Correct Answer: B. Software**

```text
Feedback: The other controls defined are internal network, perimeter, physical
and policies (including procedures and awareness) but not software which is
synonymous with application.
```

---

### 🔹 Question 89 (3.3)
Which security engineering technical process provides security-related system
data and information?
<br/>A. Business and mission analysis
<br/>B. System requirements and definition process
<br/>C. Design definition process
<br/>D. System analysis process

**✅ Correct Answer: C. Design definition process**

```text
Feedback: The design definition process provides security-related data and
information about the system and its elements. This enables implementation
consistent with security architectural entities and constraints as defined in
the models and views of the system architecture.
```

---

### 🔹 Question 90 (3.3)
Which security-engineering enabling process defines the security requirements
used to assess the qualifications, selection, and ongoing training of personnel?
<br/>A. Portfolio management
<br/>B. Human resource management (HRM)
<br/>C. Quality management
<br/>D. Knowledge management

**✅ Correct Answer: B. Human resource management (HRM)**

```text
Feedback: A combination of human resources management and IAM provisioning
management functions should work collaboratively to reflect these changes as
required in systems and resource privileges.
```

---

### 🔹 Question 93 (3.5.5)
Industrial Control Systems (ICS) are used to monitor and control machinery in
factories, refineries, transportation systems, and many other similar settings.
Which of the following components are ruggedized controllers that use specialized
components to provide real-time control?
<br/>A. Programmable Logic Controllers (PLC)
<br/>B. Supervisory Control and Data Acquisition (SCADA)
<br/>C. Distributed Control Systems (DCS)
<br/>D. None of these

**✅ Correct Answer: A. Programmable Logic Controllers (PLC)**

```text
Feedback: PLC use specialized hardware, firmware, and software to provide
real-time control and monitoring of their attached equipment.
```

---

### 🔹 Question 94 (3.5.5)
Which type of industrial control system component should the engineering team
select in the following scenario? An engineering team at a company specializing
in renewable energy is working on a new wind farm project. The team is considering
various industrial control system components to manage the turbines effectively.
They seek a solution that offers robust real-time control and can withstand the
environmental challenges present in wind turbines and wind farm settings.
<br/>A. Programmable Logic Controller (PLC)
<br/>B. Supervisory Control and Data Acquisition (SCADA)
<br/>C. Distributed Control System (DCS)
<br/>D. Remote Terminal Unit (RTU)

**✅ Correct Answer: A. Programmable Logic Controller (PLC)**

```text
Feedback: PLCs are ideal for controlling individual machines or processes like
wind turbines. They offer real-time performance and are ruggedized to operate
reliably in harsh environments, making them well-suited for the wind farm project.
```

---

### 🔹 Question 98 (3.6.2)
What encryption system, invented in 1882 by Frank Miller, is unbreakable?
<br/>A. The one-time pad
<br/>B. The Scytale Cipher
<br/>C. The ROT13 Cipher
<br/>D. The Vigenere Cipher

**✅ Correct Answer: A. The one-time pad**

```text
Feedback: The one-time pad is a cipher system that relies on a set of keys, one
per sheet of paper, bound up in a pad, with the sender and recipient being the
only people with matching pads of keys.
```

---

### 🔹 Question 99 (3.6.2)
Asymmetric algorithms are known as trapdoor functions. What is a trapdoor function?
<br/>A. A potential weakness
<br/>B. A calculation that is easy to perform in one direction but infeasible to
     perform in the reverse order
<br/>C. A calculation that is easy to perform in two directions
<br/>D. A calculation that provides a mechanism that allows a developer to gain
     access to the algorithm for maintenance

**✅ Correct Answer: B. A calculation that is easy to perform in one direction
but infeasible to perform in the reverse order**

```text
Feedback: If you were asked to multiply 9,000,000 by 6,157, the calculation would
be straightforward, but if you were presented with a number like
159,841,311,587,941 and asked what two numbers multiplied together produced that
result, the calculation would be much more difficult.
```

---

### 🔹 Question 103 (3.6.2)
What encryption technology should an online banking platform use to ensure secure
web-based transactions, maintaining confidentiality and integrity of the financial
data during transmission?
<br/>A. Symmetric key encryption
<br/>B. Digital signatures
<br/>C. Transport Layer Security (TLS) encryption
<br/>D. One-time pad encryption

**✅ Correct Answer: C. Transport Layer Security (TLS) encryption**

```text
Feedback: TLS is a cryptographic protocol designed to provide secure
communication over a computer network. Implementing TLS encryption is the
standard practice for securing web-based transactions.
```

---

### 🔹 Question 104 (3.6.2)
What kind of feature is the development team considering incorporating in the
following scenario? A cybersecurity software company is developing a new
encryption algorithm intended for highly confidential communication. The
development team is considering incorporating a feature that would allow
authorized individuals to decrypt messages without the usual decryption key
under specific, tightly controlled circumstances, such as a court order.
This feature should be undetectable to anyone analyzing the encryption algorithm
and should be accessible only under predefined conditions.
<br/>A. A symmetric key system
<br/>B. A trapdoor function
<br/>C. A hashing algorithm
<br/>D. A public-key infrastructure (PKI)

**✅ Correct Answer: B. A trapdoor function**

```text
Feedback: A trapdoor function in cryptography is a feature that makes it easy to
compute in one direction but difficult in the opposite direction without special
information such as a trapdoor key. This would allow authorized individuals to
decrypt messages under certain conditions without needing the standard decryption key.
```

---

### 🔹 Question 106 (3.6.2)
Which mathematical concept is the engineering team considering for the secure
key exchange mechanism in the following scenario? A software development firm is
designing a secure messaging platform for corporate clients. A primary feature
of this platform is the secure exchange of encryption keys for private
conversations. The engineering team is considering using a mathematical approach
that allows for easy computation of keys in one direction, but the inverse
computation, without specific knowledge, is computationally difficult.
<br/>A. Hash functions
<br/>B. Elliptic curve cryptography
<br/>C. Trapdoor functions
<br/>D. Symmetric encryption algorithms

**✅ Correct Answer: C. Trapdoor functions**

```text
Feedback: Trapdoor functions, especially those involving discrete logarithms,
are ideal for secure key exchanges in asymmetric cryptography. They allow for
easy computation in one direction, while the inverse computation is practically
infeasible without specific knowledge (like a private key), aligning perfectly
with the team's requirements for the messaging platform.
```

---

### 🔹 Question 107 (3.6.2)
Which of these cryptographic operations is typically the fastest for processing
plaintext input?
<br/>A. Asymmetric encryption using RSA with a 2048 bit key
<br/>B. Symmetric encryption with a 128 bit key
<br/>C. Hashing the message using SHA-3
<br/>D. Asymmetric encryption using ECC with a 512 bit key

**✅ Correct Answer: C. Hashing the message using SHA-3**

```text
Feedback: Hashing does not process a key and is a one way process; it is the
fastest of the responses listed.
```

---

### 🔹 Question 110 (3.6.3)
Which key should be used in a PKI operation when transmitting a message to ensure
proof of origin?
<br/>A. The sender's public key should be used.
<br/>B. The sender's private key should be used.
<br/>C. The recipient's public key should be used.
<br/>D. The recipient's private key should be used.

**✅ Correct Answer: B. The sender's private key should be used.**

```text
Feedback: While this would not provide message confidentiality, anyone with the
sender's public key would gain a level of assurance as to the origin of the message.
```

---

### 🔹 Question 111 (3.6.3)
What function does the Registration Authority (RA) serve in a Public Key
Infrastructure (PKI)?
<br/>A. It creates and signs a certificate.
<br/>B. It tracks certificate revocations.
<br/>C. It validates the identification information supplied by the requestor of
     a certificate.
<br/>D. It is used to collect the information for inclusion into the certificate.

**✅ Correct Answer: C. It validates the identification information supplied by
the requestor of a certificate.**

```text
Feedback: A PKI is based on the trust-but-verify principle. For a certificate to
be considered trustworthy, several steps need to be satisfied. This begins at
the time of creation. The CA signs the certificate owner's public key with its
private key. This only occurs after the RA verifies the requestor's information.
```

---

### 🔹 Question 112 (3.6.3, 3.6.5)
Which asymmetric cryptographic system provides confidentiality and nonrepudiation?
<br/>A. Rivest-Shamir-Adleman (RSA)
<br/>B. Diffie-Hellman
<br/>C. Blowfish
<br/>D. Advanced Encryption Standard (AES)

**✅ Correct Answer: A. Rivest-Shamir-Adleman (RSA)**

```text
Feedback: RSA offers integrity, confidentiality, and digital signing.
```

---

### 🔹 Question 115 (3.6.5)
Which of the following cryptographic methods is MOST effective for a cybersecurity
consultant who is tasked with advising a technology firm on the best cryptographic
method to ensure messages sent through an application maintain their integrity
from sender to receiver?
<br/>A. Employ symmetric encryption using Advanced Encryption Standard (AES) to
     encrypt all messages.
<br/>B. Utilize a Hash-based Message Authentication Code (HMAC) with a secure
     hashing algorithm like SHA-256.
<br/>C. Implement Transport Layer Security (TLS) for end-to-end encrypted message
     transmission.
<br/>D. Rely on Elliptic Curve Cryptography (ECC) for generating cryptographic
     keys for message encryption.

**✅ Correct Answer: B. Utilize a Hash-based Message Authentication Code (HMAC)
with a secure hashing algorithm like SHA-256.**

```text
Feedback: HMAC with a secure hashing algorithm like SHA-256 provides a way to
verify both the integrity and the authenticity of a message, which is crucial
for secure communication in a corporate environment.
```

---

### 🔹 Question 116 (3.7.5)
In which cryptanalytical technique does the attacker have access to the decryption
device or software and attempts to defeat the cryptographic protection by
decrypting pieces of ciphertext to see what the corresponding plaintext is to
discover the key?
<br/>A. A known ciphertext attack
<br/>B. A ciphertext-only attack
<br/>C. A chosen ciphertext attack
<br/>D. A known plaintext attack

**✅ Correct Answer: C. A chosen ciphertext attack**

```text
Feedback: Since the method or algorithm is always known, the goal of this type
of attack is to find the relationship between the two.
```

---

### 🔹 Question 119 (3.8)
The Uptime Institute is an industry organization that provides data center
operators with certification of their facilities. Their Tiered Classification
System consists of four tiers. Which tier requires a concurrently maintainable
site infrastructure?
<br/>A. Tier I
<br/>B. Tier II
<br/>C. Tier III
<br/>D. Tier IV

**✅ Correct Answer: C. Tier III**

```text
Feedback: Tier III requires a concurrently maintainable site infrastructure.
```

---

### 🔹 Question 120 (3.9.5, 1.9.4)
Which set of the following groups of controls would BEST meet the needs of a
client who has asked for help preventing as many threats to site security as
possible?
<br/>A. CCTV, RFID door access control systems, and VESA fire detection systems
<br/>B. Personnel screening, RFID door access control systems, and perimeter fencing
<br/>C. Glass-break sensors, CCTV around points of ingress/egress, and a monitored
     alarm service
<br/>D. Personnel screening, CCTV, and UPS protection for critical systems

**✅ Correct Answer: B. Personnel screening, RFID door access control systems,
and perimeter fencing**

```text
Feedback: All controls in this response are preventative in nature.
```

---

## 2. Question-Only (No Answer Key Available)

### 🔹 Question 91 (3.4)
Which security model focuses on the movement of information throughout a system?
<br/>A. State machine model
<br/>B. Information flow model
<br/>C. Noninterference model
<br/>D. Ring model

**✅ Correct Answer: B. Information flow model**

```text
Feedback: The Information Flow Model directly focuses on controlling the flow of information between subjects and objects, ensuring that information does not flow from higher security levels to lower levels in ways that violate policy (no read-up for discretionary access, no write-down for mandatory access). This model is fundamental to Bell-LaPadula and Biba models. State machine model (A) ensures the system remains in a secure state. Noninterference model (C) ensures higher-level actions don't interfere with lower-level observations. Ring model (D) relates to CPU privilege levels.
```

---

### 🔹 Question 92 (3.5.4, 3.6.2)
Kerckhoffs's Principal asserts that a cryptographic system will remain secure even if everything about it is public knowledge except which of the following?
<br/>A. The algorithm
<br/>B. The process
<br/>C. The key
<br/>D. If everything is known, then the system cannot be secure.

**✅ Correct Answer: C. The key**

```text
Feedback: Kerckhoffs's Principle states: "A cryptographic system should be secure even if everything about the system, except the key, is public knowledge." The algorithm should be publicly known and reviewed; only the key must remain secret. This principle opposes "security through obscurity" (keeping the algorithm secret). Option D is a misinterpretation—Kerckhoffs doesn't say systems cannot be secure; rather, they must remain secure even when the algorithm is known, with only the key secret.
```

---

### 🔹 Question 95 (3.5.7, 8.4.5)
The concepts of Platform as a Service (PaaS) and Infrastructure as a Service (IaaS) may be familiar, but they have been extended to include those in the following list of possible answer choices. All the following are defined in ISO/IEC 17788 except which?
<br/>A. Communication as a Service (CaaS)
<br/>B. Compute as a Service (CompaaS)
<br/>C. Network as a Service (NaaS)
<br/>D. Data Storage as a Service (DSaaS)

**✅ Correct Answer: B. Compute as a Service (CompaaS)**

```text
Feedback: ISO/IEC 17788 (Information technology — Cloud computing — Overview and vocabulary) defines several cloud service categories: Infrastructure as a Service (IaaS), Platform as a Service (PaaS), Software as a Service (SaaS), Communications as a Service (CaaS), Network as a Service (NaaS), and Data Storage as a Service (DSaaS). "Compute as a Service (CompaaS)" is not a standard category defined in ISO/IEC 17788; compute capabilities are typically encompassed within IaaS.
```

---

### 🔹 Question 105 (3.6.2)
Which technique is the BEST for the spy in the following scenario to use to communicate covertly without arousing suspicion? A spy works in a high-security environment where traditional digital communication methods are heavily monitored and encrypted messages are immediately flagged and decrypted by advanced cybersecurity measures. To communicate securely with headquarters without raising suspicion, the spy needs a method to hide messages in plain sight.
<br/>A. Public-key cryptography
<br/>B. Steganography
<br/>C. Virtual Private Network (VPN)
<br/>D. Advanced Encryption Standard (AES)

**✅ Correct Answer: B. Steganography**

```text
Feedback: Steganography is the practice of hiding messages within other non-suspicious carriers (e.g., images, audio, video, text) so that the existence of the message is concealed. Since the scenario states encrypted messages are "immediately flagged and decrypted," encryption alone (A, C, D) would still be detected. Steganography makes the communication appear as normal, innocuous traffic, allowing the spy to "hide in plain sight" without triggering monitoring systems.
```

---

### 🔹 Question 113 (3.6.5)
What is HAVAL?
<br/>A. A message integrity checker that produces a 128-bit output
<br/>B. A message integrity checker that produces a 160-bit output
<br/>C. A message integrity checker that produces a variable length output
<br/>D. A symmetrical encryption algorithm

**✅ Correct Answer: C. A message integrity checker that produces a variable length output**

```text
Feedback: HAVAL (Hash of Variable Length) is a cryptographic hash function designed in 1992. It produces hash outputs of variable lengths: 128, 160, 192, 224, or 256 bits. Unlike fixed-output hash functions like MD5 (128-bit) or SHA-1 (160-bit), HAVAL's key feature is variable output length. It is not a symmetric encryption algorithm (D). Options A and B are partially correct for specific output lengths but do not capture HAVAL's defining characteristic: variable length output (C).
```

---

### 🔹 Question 114 (3.6.5)
Which of the following BEST describes a digital signature?
<br/>A. A symmetric encrypted plaintext message further encrypted using the sender's private key
<br/>B. A symmetric encrypted plaintext message further encrypted using the recipient's public key
<br/>C. A hash digest of a plaintext message further encrypted using the recipient's public key
<br/>D. A hash digest of a plaintext message further encrypted using the sender's private key

**✅ Correct Answer: D. A hash digest of a plaintext message further encrypted using the sender's private key**

```text
Feedback: A digital signature is created by: (1) computing a cryptographic hash of the message, then (2) encrypting that hash with the sender's private key. The recipient verifies by decrypting the signature with the sender's public key and comparing it to their own hash of the message. Option A incorrectly describes symmetric encryption. Option B uses recipient's public key (encryption, not signing). Option C uses recipient's public key instead of sender's private key.
```

---

### 🔹 Question 117 (3.7.11)
Which of these statements MOST likely explains the attacker's method for exploiting the Kerberos system in the following scenario? An IT security team is investigating a recent breach in their organization's network that employs a Kerberos-based authentication system. Initial findings indicate the attacker did not directly compromise any user passwords or decrypt Kerberos tickets. However, the attacker was able to impersonate several users and gain unauthorized access to multiple services within the network.
<br/>A. The attacker used a 'Pass the Ticket' attack, forging Kerberos tickets to gain unauthorized access.
<br/>B. The attacker executed a 'Pass the Hash' attack, utilizing the hashed credentials of users to mimic authentication requests.
<br/>C. The attacker conducted a replay attack, reusing valid authentication responses to trick the system into granting access.
<br/>D. The attacker performed a man-in-the-middle attack, intercepting and altering Kerberos tickets in transit.

**✅ Correct Answer: A. The attacker used a 'Pass the Ticket' attack, forging Kerberos tickets to gain unauthorized access.**

```text
Feedback: A "Pass the Ticket" attack involves extracting a valid Kerberos ticket (TGT or service ticket) from a compromised system and reusing it to impersonate the user without needing the password. Since the scenario states passwords were not compromised and tickets were not decrypted, Pass the Ticket is the most likely—it leverages existing valid tickets. Pass the Hash (B) works with NTLM, not Kerberos. Replay attack (C) would require intercepted valid responses. MITM (D) would require altering tickets, which would break the integrity protected by Kerberos.
```
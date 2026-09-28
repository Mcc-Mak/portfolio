# Domain 3 - Security Architecture and Engineering - Practice Questions

## Question 91 (3.4)
Which security model focuses on the movement of information throughout a system?

A. State machine model
B. Information flow model
C. Noninterference model
D. Ring model

## Question 92 (3.5.4, 3.6.2)
Kerckhoffs's Principal asserts that a cryptographic system will remain secure even if everything about it is public knowledge except which of the following?

A. The algorithm
B. The process
C. The key
D. If everything is known, then the system cannot be secure.

## Question 93 (3.5.5)
Industrial Control Systems (ICS) are used to monitor and control machinery in factories, refineries, transportation systems, and many other similar settings. Which of the following components are ruggedized controllers that use specialized components to provide real-time control?

A. Programmable Logic Controllers (PLC)
B. Supervisory Control and Data Acquisition (SCADA)
C. Distributed Control Systems (DCS)
D. None of these

## Question 94 (3.5.5)
Which type of industrial control system component should the engineering team select in the following scenario? An engineering team at a company specializing in renewable energy is working on a new wind farm project. The team is considering various industrial control system components to manage the turbines effectively. They seek a solution that offers robust real-time control and can withstand the environmental challenges present in wind turbines and wind farm settings.

A. Programmable Logic Controller (PLC)
B. Supervisory Control and Data Acquisition (SCADA)
C. Distributed Control System (DCS)
D. Remote Terminal Unit (RTU)

## Question 95 (3.5.7, 8.4.5)
The concepts of Platform as a Service (PaaS) and Infrastructure as a Service (IaaS) may be familiar, but they have been extended to include those in the following list of possible answer choices. All the following are defined in ISO/IEC 17788 except which?

A. Communication as a Service (CaaS)
B. Compute as a Service (CompaaS)
C. Network as a Service (NaaS)
D. Data Storage as a Service (DSaaS)

## Question 103 (3.6.2)
What encryption technology should an online banking platform use to ensure secure web-based transactions, maintaining confidentiality and integrity of the financial data during transmission?

A. Symmetric key encryption
B. Digital signatures
C. Transport Layer Security (TLS) encryption
D. One-time pad encryption

## Question 104 (3.6.2)
What kind of feature is the development team considering incorporating in the following scenario? A cybersecurity software company is developing a new encryption algorithm intended for highly confidential communication. The development team is considering incorporating a feature that would allow authorized individuals to decrypt messages without the usual decryption key under specific, tightly controlled circumstances, such as a court order. This feature should be undetectable to anyone analyzing the encryption algorithm and should be accessible only under predefined conditions.

A. A symmetric key system
B. A trapdoor function
C. A hashing algorithm
D. A public-key infrastructure (PKI)

## Question 105 (3.6.2)
Which technique is the BEST for the spy in the following scenario to use to communicate covertly without arousing suspicion? A spy works in a high-security environment where traditional digital communication methods are heavily monitored and encrypted messages are immediately flagged and decrypted by advanced cybersecurity measures. To communicate securely with headquarters without raising suspicion, the spy needs a method to hide messages in plain sight.

A. Public-key cryptography
B. Steganography
C. Virtual Private Network (VPN)
D. Advanced Encryption Standard (AES)

## Question 106 (3.6.2)
Which mathematical concept is the engineering team considering for the secure key exchange mechanism in the following scenario? A software development firm is designing a secure messaging platform for corporate clients. A primary feature of this platform is the secure exchange of encryption keys for private conversations. The engineering team is considering using a mathematical approach that allows for easy computation of keys in one direction, but the inverse computation, without specific knowledge, is computationally difficult.

A. Hash functions
B. Elliptic curve cryptography
C. Trapdoor functions
D. Symmetric encryption algorithms

## Question 113 (3.6.5)
What is HAVAL?

A. A message integrity checker that produces a 128-bit output
B. A message integrity checker that produces a 160-bit output
C. A message integrity checker that produces a variable length output
D. A symmetrical encryption algorithm

## Question 114 (3.6.5)
Which of the following BEST describes a digital signature?

A. A symmetric encrypted plaintext message further encrypted using the sender's private key
B. A symmetric encrypted plaintext message further encrypted using the recipient's public key
C. A hash digest of a plaintext message further encrypted using the recipient's public key
D. A hash digest of a plaintext message further encrypted using the sender's private key

## Question 115 (3.6.5)
Which of the following cryptographic methods is MOST effective for a cybersecurity consultant who is tasked with advising a technology firm on the best cryptographic method to ensure messages sent through an application maintain their integrity from sender to receiver?

A. Employ symmetric encryption using Advanced Encryption Standard (AES) to encrypt all messages.
B. Utilize a Hash-based Message Authentication Code (HMAC) with a secure hashing algorithm like SHA-256.
C. Implement Transport Layer Security (TLS) for end-to-end encrypted message transmission.
D. Rely on Elliptic Curve Cryptography (ECC) for generating cryptographic keys for message encryption.

## Question 116 (3.7.5)
In which cryptanalytical technique does the attacker have access to the decryption device or software and attempts to defeat the cryptographic protection by decrypting pieces of ciphertext to see what the corresponding plaintext is to discover the key?

A. A known ciphertext attack
B. A ciphertext-only attack
C. A chosen ciphertext attack
D. A known plaintext attack

## Question 117 (3.7.11)
Which of these statements MOST likely explains the attacker's method for exploiting the Kerberos system in the following scenario? An IT security team is investigating a recent breach in their organization's network that employs a Kerberos-based authentication system. Initial findings indicate the attacker did not directly compromise any user passwords or decrypt Kerberos tickets. However, the attacker was able to impersonate several users and gain unauthorized access to multiple services within the network.

A. The attacker used a 'Pass the Ticket' attack, forging Kerberos tickets to gain unauthorized access.
B. The attacker executed a 'Pass the Hash' attack, utilizing the hashed credentials of users to mimic authentication requests.
C. The attacker conducted a replay attack, reusing valid authentication responses to trick the system into granting access.
D. The attacker performed a man-in-the-middle attack, intercepting and altering Kerberos tickets in transit.

## Question 119 (3.8)
The Uptime Institute is an industry organization that provides data center operators with certification of their facilities. Their Tiered Classification System consists of four tiers. Which tier requires a concurrently maintainable site infrastructure?

A. Tier I
B. Tier II
C. Tier III
D. Tier IV

## Question 120 (3.9.5, 1.9.4)
Which set of the following groups of controls would BEST meet the needs of a client who has asked for help preventing as many threats to site security as possible?

A. CCTV, RFID door access control systems, and VESA fire detection systems
B. Personnel screening, RFID door access control systems, and perimeter fencing
C. Glass-break sensors, CCTV around points of ingress/egress, and a monitored alarm service
D. Personnel screening, CCTV, and UPS protection for critical systems
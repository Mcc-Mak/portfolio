# Domain 3 - Security Architecture and Engineering - Answer Keys

## Question 85 (3.1.2)
**Correct Answer:** D. Least privilege

**Feedback:** Least privilege is the practice of granting a user the minimum permissions necessary to perform their explicit job function. The principle of need to know occurs by telling users only what they need for a specific task.

## Question 86 (3.1.3)
**Correct Answer:** B. Software

**Feedback:** The other controls defined are internal network, perimeter, physical and policies (including procedures and awareness) but not software which is synonymous with application.

## Question 89 (3.3)
**Correct Answer:** C. Design definition process

**Feedback:** The design definition process provides security-related data and information about the system and its elements. This enables implementation consistent with security architectural entities and constraints as defined in the models and views of the system architecture.

## Question 90 (3.3)
**Correct Answer:** B. Human resource management (HRM)

**Feedback:** A combination of human resources management and IAM provisioning management functions should work collaboratively to reflect these changes as required in systems and resource privileges.

## Question 93 (3.5.5)
**Correct Answer:** A. Programmable Logic Controllers (PLC)

**Feedback:** PLC use specialized hardware, firmware, and software to provide real-time control and monitoring of their attached equipment.

## Question 94 (3.5.5)
**Correct Answer:** A. Programmable Logic Controller (PLC)

**Feedback:** PLCs are ideal for controlling individual machines or processes like wind turbines. They offer real-time performance and are ruggedized to operate reliably in harsh environments, making them well-suited for the wind farm project.

## Question 98 (3.6.2)
**Correct Answer:** A. The one-time pad

**Feedback:** The one-time pad is a cipher system that relies on a set of keys, one per sheet of paper, bound up in a pad, with the sender and recipient being the only people with matching pads of keys.

## Question 99 (3.6.2)
**Correct Answer:** B. A calculation that is easy to perform in one direction but infeasible to perform in the reverse order

**Feedback:** If you were asked to multiply 9,000,000 by 6,157, the calculation would be straightforward, but if you were presented with a number like 159,841,311,587,941 and asked what two numbers multiplied together produced that result, the calculation would be much more difficult.

## Question 103 (3.6.2)
**Correct Answer:** C. Transport Layer Security (TLS) encryption

**Feedback:** TLS is a cryptographic protocol designed to provide secure communication over a computer network. Implementing TLS encryption is the standard practice for securing web-based transactions.

## Question 104 (3.6.2)
**Correct Answer:** B. A trapdoor function

**Feedback:** A trapdoor function in cryptography is a feature that makes it easy to compute in one direction but difficult in the opposite direction without special information such as a trapdoor key. This would allow authorized individuals to decrypt messages under certain conditions without needing the standard decryption key.

## Question 106 (3.6.2)
**Correct Answer:** C. Trapdoor functions

**Feedback:** Trapdoor functions, especially those involving discrete logarithms, are ideal for secure key exchanges in asymmetric cryptography. They allow for easy computation in one direction, while the inverse computation is practically infeasible without specific knowledge (like a private key), aligning perfectly with the team's requirements for the messaging platform.

## Question 107 (3.6.2)
**Correct Answer:** C. Hashing the message using SHA-3

**Feedback:** Hashing does not process a key and is a one way process; it is the fastest of the responses listed.

## Question 110 (3.6.3)
**Correct Answer:** B. The sender's private key should be used.

**Feedback:** While this would not provide message confidentiality, anyone with the sender's public key would gain a level of assurance as to the origin of the message.

## Question 111 (3.6.3)
**Correct Answer:** C. It validates the identification information supplied by the requestor of a certificate.

**Feedback:** A PKI is based on the trust-but-verify principle. For a certificate to be considered trustworthy, several steps need to be satisfied. This begins at the time of creation. The CA signs the certificate owner's public key with its private key. This only occurs after the RA verifies the requestor's information.

## Question 112 (3.6.3, 3.6.5)
**Correct Answer:** A. Rivest-Shamir-Adleman (RSA)

**Feedback:** RSA offers integrity, confidentiality, and digital signing.

## Question 115 (3.6.5)
**Correct Answer:** B. Utilize a Hash-based Message Authentication Code (HMAC) with a secure hashing algorithm like SHA-256.

**Feedback:** HMAC with a secure hashing algorithm like SHA-256 provides a way to verify both the integrity and the authenticity of a message, which is crucial for secure communication in a corporate environment.

## Question 116 (3.7.5)
**Correct Answer:** C. A chosen ciphertext attack

**Feedback:** Since the method or algorithm is always known, the goal of this type of attack is to find the relationship between the two.

## Question 119 (3.8)
**Correct Answer:** C. Tier III

**Feedback:** Tier III requires a concurrently maintainable site infrastructure.

## Question 120 (3.9.5, 1.9.4)
**Correct Answer:** B. Personnel screening, RFID door access control systems, and perimeter fencing

**Feedback:** All controls in this response are preventative in nature.
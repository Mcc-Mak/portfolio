# Session 12: Cryptographic Solutions

## Overview
This session covers the fundamentals of cryptography, including encryption methods, hashing, key management, digital signatures, certificates, and Public Key Infrastructure (PKI). It consists of 10 videos (V86–V95).

---

## Video V86 (Outline): Cryptographic Solutions (Section Intro)

**Objective:** To introduce the key topics in cryptographic solutions for the CISSP exam.

### Topics Covered in this Session
1.  Understanding Cryptography (Confusion, Diffusion)
2.  Cryptographic Methods (Encryption, Hashing, Signatures)
3.  Symmetric Encryption (AES, DES, 3DES)
4.  Asymmetric Encryption (RSA, ECC)
5.  Quantum Cryptography (QKD, Qubits)
6.  Hash Functions (SHA, MD5, RIPEMD)
7.  Cryptographic Key Management (Lifecycle)
8.  Digital Signatures and X.509 Certificates
9.  Public Key Infrastructure (PKI)

---

## Video V87: Understanding Cryptography (Confusion, Diffusion)

**Objective:** To explain the core concepts and goals of cryptography.

### I. Core Objectives of Cryptography

| Goal | Description |
| :--- | :--- |
| **Confidentiality** | Ensures data is not disclosed to unauthorized entities |
| **Integrity** | Ensures data has not been altered by unauthorized entities |
| **Authentication** | Verifies a subject's identity |
| **Non-Repudiation** | Provides undeniable proof that an action originated from a specific subject |

### II. Key Terminology

| Term | Definition |
| :--- | :--- |
| **Algorithm** | The mathematical calculations used to encrypt/decrypt |
| **Cipher** | The specific type/brand of algorithm (e.g., AES) |
| **Key** | Piece of information (passphrase, password) used to encrypt/decrypt |
| **Confusion** | Prevents deriving the key by analyzing plaintext and ciphertext |
| **Diffusion** | Changes in plaintext result in multiple changes in ciphertext |

### III. Cipher Types
- **Substitution:** Replaces one character with another
- **Transposition:** Rearranges characters or blocks into a different order

### IV. Concealment Ciphers
- **Steganography:** Hiding a message inside another file (e.g., image)
- **Digital Watermarking:** Embedding a visible or invisible mark into a file

### V. Security Principles
- **Moore's Law:** Computing power increases, eventually breaking ciphers and keys
- **Kerckhoffs's Principle:** System is secure if only the key is secret (no security through obscurity)

---

## Video V88: Cryptographic Methods (Encryption, Hashing, Signatures)

**Objective:** To explain the three main cryptographic methods.

### I. Encryption (Confidentiality)

| Type | Mechanism | Characteristics |
| :--- | :--- | :--- |
| **Symmetric** | Single key for encryption and decryption | Fast, efficient, but secure key distribution is challenging |
| **Asymmetric** | Key pair (public for encryption, private for decryption) | Stronger security, higher computational overhead |

### II. Hashing (Integrity)
- **Definition:** Creates a fixed-length, unique value from input data (not reversible)
- **Purpose:** Data integrity verification, password storage, digital signatures
- **Key Property:** Small change in input = drastically different hash

### III. Digital Signatures (Authentication & Non-Repudiation)
- **Definition:** Hash value encrypted with the sender's private key
- **Provides:** Authentication, integrity, and non-repudiation

---

## Video V89: Symmetric Encryption (AES, DES, 3DES)

**Objective:** To explain symmetric encryption algorithms and their characteristics.

### I. Core Concept
- **Symmetric Encryption:** One secret key for both encryption and decryption (like a locked box with one key).

### II. Common Algorithms

| Algorithm | Key Size | Status |
| :--- | :--- | :--- |
| **DES** | 56-bit | Weak; deprecated (brute-force vulnerable) |
| **Triple DES (3DES)** | 112/168-bit | Phased out |
| **AES (Advanced Encryption Standard)** | 128, 192, 256-bit | Current "gold standard" |

### III. Strengths vs. Weaknesses

| Strengths | Weaknesses |
| :--- | :--- |
| Fast and efficient | Key distribution is the biggest challenge |
| Low computational overhead | Complex management in large networks |
| Highly secure (AES-256) | Key compromise = data compromise |

---

## Video V90: Asymmetric Encryption (RSA, ECC)

**Objective:** To explain asymmetric encryption algorithms and their characteristics.

### I. Core Concept
- **Asymmetric Encryption:** Uses a key pair (public for encryption, private for decryption). Solves the key distribution problem.

### II. Common Algorithms

| Algorithm | Mechanism | Characteristics |
| :--- | :--- | :--- |
| **RSA** | Based on factoring large prime numbers | Widely used; requires long keys (2048/4096-bit) = slower |
| **ECC (Elliptic Curve Cryptography)** | Based on elliptic curve mathematics | Smaller keys (256-bit) = faster; ideal for mobile/embedded |

### III. Applications
- Secure web traffic (TLS)
- Digital signatures
- Key exchange (hybrid encryption with symmetric)

### IV. Key Management Standards
- **NIST SP 800-57:** Cryptographic key management guidance
- **FIPS 140-3:** Security requirements for cryptographic modules
- **ISO/IEC 27001:** Guidelines for cryptographic controls

---

## Video V91: Quantum Cryptography (QKD, Qubits)

**Objective:** To explain quantum cryptography and its impact.

### I. Core Concept
- **Quantum Cryptography:** Based on quantum mechanics (physics of atomic/subatomic particles).

### II. Quantum Computing Impact
- Quantum computers can break modern algorithms (RSA, ECC) due to excessive computing power.
- **Qubit (Quantum Bit):** Uses superposition (holds both 0 and 1 simultaneously) = holds more data than classical bit.

### III. Key Features (Exam Focus)

| Feature | Acronym | Function |
| :--- | :--- | :--- |
| **Key Distribution** | QKD | Shares secret keys (similar to symmetric crypto) |
| **Quantum Coin Flipping** | QCF | Creates trusted path between untrusted parties (similar to Diffie-Hellman) |

---

## Video V92: Hash Functions (SHA, MD5, RIPEMD)

**Objective:** To explain hash functions and common algorithms.

### I. Core Concept
- **Hash Function:** Creates a unique, fixed-size value (message digest) from any size of data.
- **Purpose:** Integrity verification (detect tampering); one-way function.

### II. Common Hash Algorithms

| Family | Algorithms | Digest Size | Block Size |
| :--- | :--- | :--- | :--- |
| **SHA (Secure Hash Algorithm)** | SHA-1, SHA-224, SHA-256, SHA-384, SHA-512 | 160-512 bits | 512/1024 bits |
| **MD (Message Digest)** | MD2, MD4, MD5 | 128 bits | 128/512 bits |
| **HAVAL** | Variable length | 128-256 bits | 1024 bits |
| **RIPEMD** | RIPEMD-128, RIPEMD-160 | 128/160 bits | - |

### III. Exam Focus
- **SHA-1, SHA-256, SHA-512** are most important
- **MD5** is more secure than MD4 (additional processing rounds)

---

## Video V93: Cryptographic Key Management (Lifecycle)

**Objective:** To explain the key management lifecycle.

### I. Policy & Governance
- **Crypto Policy:** Defines the entire lifecycle, approved by senior management
- **Crypto Period:** Validity period of keys (e.g., 30 days, 1 year, 2 years)

### II. Key Lifecycle Phases

| Phase | Description |
| :--- | :--- |
| **Creation** | Keys must be long enough; automate generation to prevent human error |
| **Distribution** | Symmetric keys distributed offline or via Diffie-Hellman |
| **Storage** | Protect keys at same level as data; use key escrow for BC/DR |
| **Rotation** | Replace keys periodically (NIST/PCI recommend at least annually) |
| **Revocation** | Defined process to invalidate keys (especially in emergencies) |
| **Destruction** | Keys must be destroyed following data destruction policies; maintain audit trail |

### III. Split Knowledge
- Dividing knowledge among multiple parties (separation of duties). Two parties hold separate "seed keys" that combine to create the operational key.

---

## Video V94: Digital Signatures and X.509 Certificates

**Objective:** To explain digital signatures and digital certificates.

### I. Digital Signatures
- **Definition:** Hash value encrypted with the sender's private key.
- **Provides:** Authentication, integrity, and non-repudiation.

### II. Digital Signature Algorithms

| Algorithm | Standard | Characteristics |
| :--- | :--- | :--- |
| **DSA** | FIPS 186-4 | Signatures only; slower |
| **RSA DSA** | ANSI X9.31 | Versatile (signatures, encryption, key distribution) |
| **ECDSA** | ANSI X9.62 | More efficient (160-bit key vs. 1024-bit for DSA) |

### III. HMAC (Partial Signature)
- **Definition:** Hash + shared secret key
- **Provides:** Integrity only (does NOT provide non-repudiation)

### IV. Digital Certificates (X.509)
- **Purpose:** Provide assurance of a claimed identity; binds identity to public key.
- **Standard:** X.509 (defined by ITU)
- **Key Attributes:** Issuer, serial number, validity period, subject name, subject public key, CA digital signature

### V. Vulnerabilities & Mitigations
- **Hash Collision:** Use modern SHA-2/SHA-3
- **Key Disclosure:** Protect private key; use it exclusively for signing
- **CA Compromise:** Use a trusted Certificate Authority

---

## Video V95: Public Key Infrastructure (PKI)

**Objective:** To explain PKI components and processes.

### I. Core Components

| Component | Function |
| :--- | :--- |
| **Certificate Authority (CA)** | Trusted third party; issues, revokes, and manages certificates |
| **Registration Authority (RA)** | Assists CA with identification and verification |
| **Certificate Revocation List (CRL)** | List of revoked certificates (downloaded from CA; kept offline) |
| **Online Certificate Status Protocol (OCSP)** | Real-time certificate verification |

### II. Certificate Lifecycle
1.  **Enrollment:** Subject provides documentation to prove identity
2.  **CSR (Certificate Signing Request):** Contains identity info and public key (signed with private key)
3.  **Issuance:** CA verifies identity and creates digital signature using CA's private key
4.  **Validation:** Certificate verified with CA using CRL (offline) or OCSP (real-time)
5.  **Revocation:** Certificate is invalidated (added to CRL)

---

## Session Summary
Session 12 covers the **complete cryptographic solutions landscape** for the CISSP exam. Key takeaways include:
1.  **Cryptography Goals:** Confidentiality, Integrity, Authentication, Non-Repudiation.
2.  **Symmetric Encryption (AES):** Fast, single key; key distribution is the main challenge.
3.  **Asymmetric Encryption (RSA, ECC):** Key pair (public/private); solves key distribution but slower.
4.  **Hash Functions (SHA, MD5):** One-way integrity verification.
5.  **Digital Signatures:** Hash + private key (authentication, integrity, non-repudiation).
6.  **X.509 Certificates:** Bind identity to public key; issued by CA.
7.  **PKI:** CA, RA, CRL, OCSP for certificate lifecycle management.
8.  **Key Management:** Creation, distribution, storage, rotation, revocation, destruction.
9.  **Quantum Cryptography:** QKD and QCF for post-quantum world.
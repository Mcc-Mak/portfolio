### Video V87: Understanding Cryptography (Confusion, Diffusion)

```mermaid
graph TD
    subgraph Core Objectives
        C[Confidentiality<br/>No disclosure to unauthorized]
        I[Integrity<br/>No unauthorized alteration]
        A[Authentication<br/>Verify subject's identity]
        NR[Non-Repudiation<br/>Undeniable proof of origin]
    end

    subgraph Key Terminology
        Alg[Algorithm<br/>Mathematical calculations]
        Cipher[Cipher<br/>Specific type/brand: AES]
        Key[Key<br/>Passphrase used to encrypt/decrypt]
        Confusion[Confusion<br/>Prevents deriving key from<br/>plaintext & ciphertext]
        Diffusion[Diffusion<br/>Plaintext change =<br/>multiple ciphertext changes]
    end

    subgraph Cipher Types
        Sub[Substitution<br/>Replace one character with another]
        Trans[Transposition<br/>Rearrange characters/blocks]
    end

    subgraph Concealment
        Steg[Steganography<br/>Hide message inside another file]
        WM[Digital Watermarking<br/>Embed visible/invisible mark]
    end

    subgraph Security Principles
        Moore[Moore's Law<br/>Computing power increases<br/>Eventually breaks ciphers/keys]
        Kerckhoffs[Kerckhoffs's Principle<br/>System secure if only key is secret<br/>No security through obscurity]
    end

    C --> I --> A --> NR
    Confusion --> Sub
    Diffusion --> Trans
    Steg --> Moore
    WM --> Kerckhoffs
```

---

### Video V88: Cryptographic Methods (Encryption, Hashing, Signatures)

```mermaid
graph LR
    subgraph Encryption - Confidentiality
        Sym[Symmetric<br/>Single key for encrypt/decrypt<br/>Fast, efficient<br/>Challenge: Key distribution]
        Asym[Asymmetric<br/>Key pair: public & private<br/>Stronger security<br/>Higher overhead]
    end

    subgraph Hashing - Integrity
        Hash[Creates fixed-length unique value<br/>Not reversible<br/>Used for: integrity verification<br/>password storage, signatures]
        Prop[Small change in input =<br/>Drastically different hash]
    end

    subgraph Digital Signatures - Auth & Non-Repudiation
        DS[Hash value encrypted with<br/>sender's private key<br/>Provides: Authentication<br/>Integrity, Non-Repudiation]
    end

    Sym --> Asym
    Asym --> Hash
    Hash --> Prop
    Prop --> DS
```

---

### Video V89: Symmetric Encryption (AES, DES, 3DES)

```mermaid
graph TD
    subgraph Core Concept
        Sym[One secret key for both<br/>encryption and decryption<br/>🔒 Locked box with one key]
    end

    subgraph Common Algorithms
        DES[DES - Data Encryption Standard<br/>56-bit key<br/>Status: WEAK - deprecated<br/>Brute-force vulnerable]
        TDES[Triple DES - 3DES<br/>112/168-bit key<br/>Status: Phased out]
        AES[AES - Advanced Encryption Standard<br/>128, 192, 256-bit key<br/>Status: Current Gold Standard ✅]
    end

    subgraph Strengths vs Weaknesses
        Strengths[Strengths:<br/>✓ Fast and efficient<br/>✓ Low computational overhead<br/>✓ Highly secure - AES-256]
        Weaknesses[Weaknesses:<br/>✗ Key distribution challenge<br/>✗ Complex management in large networks<br/>✗ Key compromise = data compromise]
    end

    Sym --> DES
    DES --> TDES
    TDES --> AES
    AES --> Strengths
    Strengths --> Weaknesses
```

---

### Video V90: Asymmetric Encryption (RSA, ECC)

```mermaid
graph TD
    subgraph Core Concept
        Asym[Key Pair<br/>Public = Encryption<br/>Private = Decryption<br/>Solves key distribution problem]
    end

    subgraph Common Algorithms
        RSA[RSA<br/>Based on factoring large primes<br/>Widely used<br/>2048/4096-bit = Slower]
        ECC[ECC - Elliptic Curve Cryptography<br/>Based on elliptic curve math<br/>256-bit = Smaller = Faster<br/>Ideal for mobile/embedded]
    end

    subgraph Applications
        Apps[Applications:<br/>✓ Secure web traffic - TLS<br/>✓ Digital signatures<br/>✓ Key exchange - hybrid encryption]
    end

    subgraph Key Management Standards
        NIST[NIST SP 800-57<br/>Key management guidance]
        FIPS[FIPS 140-3<br/>Cryptographic module requirements]
        ISO[ISO/IEC 27001<br/>Cryptographic controls]
    end

    Asym --> RSA
    Asym --> ECC
    RSA --> Apps
    ECC --> Apps
    Apps --> NIST
    NIST --> FIPS
    FIPS --> ISO
```

---

### Video V91: Quantum Cryptography (QKD, Qubits)

```mermaid
graph TD
    subgraph Core Concept
        QC[Quantum Cryptography<br/>Based on quantum mechanics<br/>Physics of atomic/subatomic particles]
    end

    subgraph Quantum Computing Impact
        Threat[Quantum computers can break<br/>RSA, ECC, modern algorithms<br/>Due to excessive computing power]
        Qubit[Qubit - Quantum Bit<br/>Uses superposition<br/>Holds 0 AND 1 simultaneously<br/>Holds more data than classical bit]
    end

    subgraph Key Features - Exam Focus
        QKD[QKD - Quantum Key Distribution<br/>Shares secret keys<br/>Similar to symmetric crypto]
        QCF[QCF - Quantum Coin Flipping<br/>Creates trusted path<br/>Between untrusted parties<br/>Similar to Diffie-Hellman]
    end

    QC --> Threat
    Threat --> Qubit
    Qubit --> QKD
    Qubit --> QCF
```

---

### Video V92: Hash Functions (SHA, MD5, RIPEMD)

```mermaid
graph TD
    subgraph Core Concept
        Hash[Hash Function<br/>Creates unique, fixed-size value<br/>Message Digest<br/>One-way function<br/>Purpose: Integrity verification]
    end

    subgraph Common Algorithms
        subgraph SHA[Secure Hash Algorithm]
            SHA1[SHA-1 - 160-bit]
            SHA224[SHA-224 - 224-bit]
            SHA256[SHA-256 - 256-bit]
            SHA384[SHA-384 - 384-bit]
            SHA512[SHA-512 - 512-bit]
        end
        
        MD[MD - Message Digest<br/>MD2, MD4, MD5<br/>128-bit output]
        
        HAVAL[HAVAL<br/>Variable length<br/>128-256-bit<br/>1024-bit block]
        
        RIPEMD[RIPEMD<br/>RIPEMD-128, RIPEMD-160<br/>128/160-bit output]
    end

    subgraph Exam Focus
        Important[Most Important:<br/>SHA-1, SHA-256, SHA-512]
        MD5Note[MD5 more secure than MD4<br/>Additional processing rounds]
    end

    Hash --> SHA
    Hash --> MD
    Hash --> HAVAL
    Hash --> RIPEMD
    SHA --> Important
    MD --> MD5Note
```

---

### Video V93: Cryptographic Key Management (Lifecycle)

```mermaid
flowchart TD
    subgraph Policy & Governance
        CP[Crypto Policy<br/>Defines entire lifecycle<br/>Approved by senior management]
        Period[Crypto Period<br/>Validity period of keys<br/>30 days, 1 year, 2 years]
    end

    subgraph Key Lifecycle Phases
        Create[CREATION<br/>Keys must be long enough<br/>Automate generation<br/>Prevent human error]
        
        Dist[DISTRIBUTION<br/>Symmetric: offline or Diffie-Hellman<br/>Asymmetric: public key freely shared]
        
        Store[STORAGE<br/>Protect at same level as data<br/>Key escrow for BC/DR]
        
        Rotate[ROTATION<br/>Replace keys periodically<br/>NIST/PCI: at least annually]
        
        Revoke[REVOCATION<br/>Defined process to invalidate<br/>Especially in emergencies]
        
        Destroy[DESTRUCTION<br/>Follow data destruction policies<br/>Maintain audit trail]
    end

    subgraph Split Knowledge
        SK[Split Knowledge<br/>Dividing knowledge among multiple parties<br/>Separation of duties<br/>Two parties hold separate seed keys<br/>Combine to create operational key]
    end

    CP --> Period
    Period --> Create
    Create --> Dist
    Dist --> Store
    Store --> Rotate
    Rotate --> Revoke
    Revoke --> Destroy
    Destroy --> SK
```

---

### Video V94: Digital Signatures and X.509 Certificates

```mermaid
graph TD
    subgraph Digital Signatures
        DS[Hash value encrypted with<br/>sender's PRIVATE key<br/>Provides: Authentication<br/>Integrity, Non-Repudiation]
    end

    subgraph Digital Signature Algorithms
        DSA[DSA - FIPS 186-4<br/>Signatures only - Slower]
        RSADSA[RSA DSA - ANSI X9.31<br/>Versatile: signatures, encryption<br/>key distribution]
        ECDSA[ECDSA - ANSI X9.62<br/>More efficient<br/>160-bit vs 1024-bit DSA]
    end

    subgraph HMAC
        HMAC[HMAC - Partial Signature<br/>Hash + shared secret key<br/>Provides: Integrity ONLY<br/>Does NOT provide non-repudiation]
    end

    subgraph X.509 Digital Certificates
        Cert[Purpose: Assurance of claimed identity<br/>Binds identity to public key<br/>Standard: X.509 - ITU]
        Attrs[Key Attributes:<br/>Issuer, serial number, validity period<br/>Subject name, subject public key<br/>CA digital signature]
    end

    subgraph Vulnerabilities & Mitigations
        V1[Hash Collision → Use SHA-2/SHA-3]
        V2[Key Disclosure → Protect private key<br/>Use exclusively for signing]
        V3[CA Compromise → Use trusted CA]
    end

    DS --> DSA
    DS --> RSADSA
    DS --> ECDSA
    DS --> HMAC
    HMAC --> Cert
    Cert --> Attrs
    Attrs --> V1
    V1 --> V2 --> V3
```

---

### Video V95: Public Key Infrastructure (PKI)

```mermaid
graph TD
    subgraph Core Components
        CA[CA - Certificate Authority<br/>Trusted third party<br/>Issues, revokes, manages certificates]
        RA[RA - Registration Authority<br/>Assists CA with<br/>Identification & verification]
        CRL[CRL - Certificate Revocation List<br/>List of revoked certificates<br/>Downloaded from CA<br/>Kept offline]
        OCSP[OCSP - Online Certificate<br/>Status Protocol<br/>Real-time certificate verification]
    end

    subgraph Certificate Lifecycle
        Enroll[1. ENROLLMENT<br/>Subject provides documentation<br/>Prove identity]
        CSR[2. CSR - Certificate Signing Request<br/>Identity info + public key<br/>Signed with private key]
        Issue[3. ISSUANCE<br/>CA verifies identity<br/>Creates digital signature<br/>Using CA's private key]
        Validate[4. VALIDATION<br/>Certificate verified with CA<br/>Using CRL offline or OCSP real-time]
        Revoke[5. REVOCATION<br/>Certificate invalidated<br/>Added to CRL]
    end

    CA --> RA
    RA --> CRL
    CRL --> OCSP
    OCSP --> Enroll
    Enroll --> CSR
    CSR --> Issue
    Issue --> Validate
    Validate --> Revoke
```

---

### Bonus: Session 12 Complete Concept Map

```mermaid
mindmap
  root((Cryptographic Solutions))
    Core Concepts
      Objectives: C, I, A, NR
      Confusion, Diffusion
      Kerckhoffs's Principle
      Moore's Law
    Encryption
      Symmetric: Single key, AES, DES, 3DES
      Asymmetric: Key pair, RSA, ECC
      Key distribution challenge
    Hashing
      One-way, fixed-size digest
      SHA-1, SHA-256, SHA-512
      MD5, RIPEMD, HAVAL
    Digital Signatures
      Hash + private key
      DSA, RSA DSA, ECDSA
      HMAC: Integrity only
    Certificates & PKI
      X.509: Binds identity to public key
      CA, RA, CRL, OCSP
      Lifecycle: Enroll → CSR → Issue → Validate → Revoke
    Key Management
      Lifecycle: Create → Distribute → Store → Rotate → Revoke → Destroy
      Split Knowledge
      NIST SP 800-57, FIPS 140-3
    Quantum Cryptography
      Qubit: superposition
      QKD: Key distribution
      QCF: Trusted path
```
### Video V59: Understanding Secure Design (Subjects, Objects, Trust)

```mermaid
graph TD
    subgraph Core Concepts
        Subject[SUBJECT<br/>Active entity<br/>User, application, script]
        Object[OBJECT<br/>Passive resource<br/>File, folder, service, CPU]
    end

    subgraph System Design Types
        Closed[CLOSED SYSTEM<br/>Single vendor, proprietary<br/>Security through obscurity<br/>Pro: Easier to manage<br/>Con: Harder to integrate]
        Open[OPEN SYSTEM<br/>Industry standards, multi-vendor<br/>Open source<br/>Pro: Flexible integration<br/>Con: Slower patches]
    end

    subgraph Trust Concepts
        TT[Transitive Trust<br/>Trust inherited without verification<br/>Dangerous outside internal networks]
        Trusted[Trusted System<br/>All controls work together]
        Assurance[Assurance<br/>Confidence controls will work<br/>Validation via testing/audit]
    end

    subgraph Isolation Concepts
        Sandbox[Confinement/Sandboxing<br/>Restrict software to isolated environment]
        Bounds[Bounds<br/>Limit resources: memory, CPU]
        Isolation[Isolation<br/>Complete separation from OS<br/>Virtual machines]
    end

    Subject --> Object
    Closed --> TT
    Open --> Trusted
    TT --> Assurance
    Assurance --> Sandbox
```

---

### Video V60: Saltzer & Schroeder Design Principles

```mermaid
graph TD
    subgraph Eight Core Principles
        P1[1. Economy of Mechanism<br/>Keep system design simple and small]
        P2[2. Fail-Safe Defaults<br/>Fail closed, deny by default<br/>Permit by exception]
        P3[3. Complete Mediation<br/>Authorize EVERY access, EVERY time]
        P4[4. Open Design<br/>No security through obscurity<br/>Keep keys secret, not design]
        P5[5. Separation of Privilege<br/>Require 2+ conditions/subjects]
        P6[6. Least Privilege<br/>Grant minimum permissions necessary]
        P7[7. Least Common Mechanism<br/>Limit shared components<br/>Avoid transitive trust]
        P8[8. Psychological Acceptability<br/>Security should be easy to use<br/>Good UX]
    end

    subgraph Two Suggested Principles
        P9[9. Work Factor<br/>Compare cost to defeat vs asset value]
        P10[10. Compromise Recording<br/>Detection mechanisms<br/>Audit logs, IDS, honeypots]
    end

    P1 --> P2 --> P3 --> P4 --> P5 --> P6 --> P7 --> P8
    P8 --> P9 --> P10
```

---

### Video V61: Zero Trust Architecture (NIST SP 800-207)

```mermaid
graph TD
    subgraph Core Philosophy
        ZT[NEVER TRUST, ALWAYS VERIFY<br/>No implicit trust, even inside network]
    end

    subgraph Trust but Verify vs Zero Trust
        TBV[Trust but Verify<br/>Inherits initial trust<br/>Verifies after access granted]
        ZTV[Zero Trust<br/>No assumption of trust<br/>Per-request authentication]
    end

    subgraph Core Components
        PE[Policy Engine - PE<br/>Makes logical decisions<br/>Approve/Deny]
        PA[Policy Administrator - PA<br/>Handles authentication/authorization<br/>Creates tokens]
        PEP[Policy Enforcement Point - PEP<br/>Brokers connection<br/>Subject ↔ Resource]
    end

    subgraph Key Principles
        Sys[System-Focused: 7 principles<br/>All resources, per-session, dynamic policies]
        Net[Network-Focused: 6 principles<br/>No private network trust<br/>BYOD, cloud, remote subjects]
    end

    ZT --> TBV
    ZT --> ZTV
    ZT --> PE
    PE --> PA
    PA --> PEP
    ZT --> Sys
    ZT --> Net

    SR[Shared Responsibility<br/>Inheriting or sharing controls<br/>Most common in cloud]
    ZT --> SR
```

---

### Video V62: Privacy by Design (7 Foundational Principles)

```mermaid
graph TD
    subgraph 7 Principles of Privacy by Design
        P1[1. PROACTIVE, NOT REACTIVE<br/>Anticipate and prevent<br/>before they happen]
        P2[2. PRIVACY AS DEFAULT SETTING<br/>Automatically protected<br/>Collect only what is needed]
        P3[3. PRIVACY EMBEDDED INTO DESIGN<br/>Core component, not add-on]
        P4[4. FULL FUNCTIONALITY<br/>Positive-Sum<br/>Privacy measures don't impede mission]
        P5[5. END-TO-END SECURITY<br/>Protect entire lifecycle<br/>Creation to destruction]
        P6[6. VISIBILITY AND TRANSPARENCY<br/>Build trust through openness]
        P7[7. RESPECT FOR USER PRIVACY<br/>User-centric<br/>Obtain explicit consent]
    end

    P1 --> P2 --> P3 --> P4 --> P5 --> P6 --> P7
```

---

### Video V63: System Security Capabilities (TPM, HSM)

```mermaid
graph TD
    subgraph Memory Protection
        MP[Prevents active processes in memory<br/>from interacting with each other<br/>Process isolation]
    end

    subgraph Virtualization
        VM[Emulating software-based versions<br/>of physical devices<br/>Servers, networks]
        VMCap[Capabilities:<br/>Isolated environments<br/>Centralized control<br/>Scalability, faster recovery]
    end

    subgraph Restricted Interfaces
        RI[User interfaces limit access<br/>Based on privilege levels<br/>Implements least privilege]
    end

    subgraph TPM - Trusted Platform Module
        TPM[Specialized cryptographic chip<br/>on motherboard - ISO 11889]
        EK[Endorsement Key - EK<br/>Persistent, burned by manufacturer]
        SRK[Storage Root Key - SRK<br/>Secures keys in TPM memory]
        PCR[Platform Configuration Registers - PCR<br/>Tracks software state]
        AIK[Attestation Identity Key - AIK<br/>Authenticates the TPM]
        TPM --> EK --> SRK --> PCR --> AIK
    end

    subgraph HSM - Hardware Security Module
        HSM[Standalone cryptographic appliance<br/>Hardware-based]
        HSM --> Purpose[Provides encryption/decryption<br/>services over an interface]
        Purpose --> SC[Smart cards for MFA<br/>Financial transactions]
    end

    MP --> VM --> VMCap --> RI
    RI --> TPM
    TPM --> HSM
```

---

### Video V64: Security Models (Lattice, State Machine)

```mermaid
graph TD
    subgraph Security Model Definition
        SM[A conceptual idea for enforcing security policy<br/>Maps requirements to system architecture<br/>NOT a specific implementation]
    end

    subgraph TCSEC / Orange Book Concepts
        TCB[Trusted Computing Base - TCB<br/>All components that enforce security policy]
        SP[Security Perimeter<br/>Boundary between trusted TCB & untrusted]
        RM[Reference Monitor<br/>Mediates ALL access requests<br/>Subject ↔ Object]
        SK[Security Kernel<br/>TCB + Reference Monitor<br/>The implementation]
        TP[Trusted Path<br/>Communication channel that<br/>cannot be compromised]
    end

    subgraph Foundational Models
        FSM[Finite State Machine<br/>System checks if state transition<br/>is authorized before allowing]
        Lattice[Lattice Model<br/>Fixed security levels<br/>Subject clearance ≥ Object label]
    end

    SM --> TCB
    TCB --> SP
    SP --> RM
    RM --> SK
    SK --> TP
    TP --> FSM
    FSM --> Lattice
```

---

### Video V65: Security Models (Bell-LaPadula, Biba, Take-Grant)

```mermaid
graph LR
    subgraph Bell-LaPadula - Confidentiality
        BLP[Focus: Prevent unauthorized READING]
        BLP_Simple[Simple Security Property<br/>NO READ UP<br/>Subject cannot read higher level]
        BLP_Star[Star Property * Property<br/>NO WRITE DOWN<br/>Subject cannot write to lower level]
        BLP --> BLP_Simple
        BLP --> BLP_Star
    end

    subgraph Biba - Integrity
        Biba[Focus: Prevent unauthorized MODIFICATION]
        Biba_Simple[Simple Integrity Axiom<br/>NO READ DOWN<br/>Subject cannot read lower integrity]
        Biba_Star[Star Integrity Axiom<br/>NO WRITE UP<br/>Subject cannot write to higher integrity]
        Biba --> Biba_Simple
        Biba --> Biba_Star
    end

    subgraph Take-Grant - Rights Propagation
        TG[Focus: How rights/permissions<br/>are passed between subjects & objects<br/>Transitive trust]
        TG_Rules[Rules:<br/>TAKE, GRANT, CREATE, REMOVE]
        TG --> TG_Rules
    end

    BLP_Star --> Biba_Simple
    Biba_Star --> TG
```

---

### Video V66: Security Models (Clark-Wilson, Brewer-Nash, Graham-Denning, Sutherland)

```mermaid
graph TD
    subgraph Clark-Wilson - Data Integrity
        CW[Focus: Data Integrity<br/>Financial, medical, accounting]
        CDI[CDI - Constrained Data Item<br/>Data requiring protection]
        UDI[UDI - Unconstrained Data Item<br/>Data NOT requiring protection]
        TP[TP - Transformation Procedure<br/>Permitted process to modify CDI]
        IVP[IVP - Integrity Verification Procedure<br/>Rules that validate integrity]
        CW_Mechanisms[Access Triple: Subject → Program → Object<br/>Well-formed transactions<br/>Separation of duties]
        CW --> CDI
        CW --> UDI
        CW --> TP
        CW --> IVP
        CW --> CW_Mechanisms
    end

    subgraph Brewer-Nash - Chinese Wall
        BN[Focus: Prevent CONFLICT OF INTEREST<br/>Ethical Wall]
        BN_Example[Example: Auditor cannot access<br/>data from two competing companies]
        BN --> BN_Example
    end

    subgraph Graham-Denning - Access Control Matrix
        GD[Focus: Secure interaction<br/>Subjects ↔ Objects]
        GD_Matrix[Access Control Matrix]
        GD_Rules[8 Protection Rules:<br/>Creation, deletion, secure transfer<br/>Read, delete, grant, transfer]
        GD --> GD_Matrix
        GD --> GD_Rules
    end

    subgraph Sutherland - Nondeducibility
        Sub[Focus: Integrity & prevention<br/>of COVERT CHANNELS]
        Sub_Model[Information flow + State machine<br/>Initial and transition states<br/>High-level ↔ Low-level objects]
        Sub --> Sub_Model
    end

    ClarkWilson --> BrewerNash
    BrewerNash --> GrahamDenning
    GrahamDenning --> Sutherland
```

---

### Bonus: Session 9 Complete Concept Map

```mermaid
mindmap
  root((Secure Design Principles))
    Subjects & Objects
      Subject: Active entity
      Object: Passive resource
      Closed vs Open Systems
      Trust: Transitive, Trusted System, Assurance
      Isolation: Sandboxing, Bounds, Isolation
    Saltzer & Schroeder
      Economy of Mechanism
      Fail-Safe Defaults
      Complete Mediation
      Open Design
      Separation of Privilege
      Least Privilege
      Least Common Mechanism
      Psychological Acceptability
      Work Factor
      Compromise Recording
    Zero Trust
      Never trust, always verify
      PE, PA, PEP components
      System & Network principles
      Shared Responsibility
    Privacy by Design
      7 Principles: Proactive, Default, Embedded, Full Functionality, End-to-End, Transparency, User Respect
    System Capabilities
      Memory Protection
      Virtualization
      Restricted Interfaces
      TPM: EK, SRK, PCR, AIK
      HSM: Cryptographic appliance
    Security Models
      Lattice, State Machine, TCB, Reference Monitor
      Bell-LaPadula: Confidentiality, No read up, No write down
      Biba: Integrity, No read down, No write up
      Take-Grant: Take, Grant, Create, Remove
      Clark-Wilson: CDI, UDI, TP, IVP
      Brewer-Nash: Conflict of interest
      Graham-Denning: Access control matrix
      Sutherland: Nondeducibility, covert channels
```

# Session 14: Network Security Fundamentals

## V124 - Section Outline
- **Focus**: Adding security to protect data while maintaining operational needs.
- **Course Objectives**: 4.1 (explain basic network security concepts), 4.3 (apply security features, defense techniques, device hardening).
- **Topics Covered**:
  - CIA Triad (Confidentiality, Integrity, Availability).
  - Threats & Vulnerabilities.
  - Risk Management.
  - Audits & Compliance (PCI DSS, GDPR).
  - Device Hardening (disable unused ports/services, change default passwords).
  - Physical Security.
  - Honeypots & Active Defense.

## V125 - CIA Triad (Confidentiality, Integrity, Availability)
- **Confidentiality (C)** : Keep data safe and private. Achieved via **encryption** (symmetric & asymmetric).
  - **Symmetric Encryption**: Same key for encryption/decryption (fast, but key management problem).
  - **Asymmetric Encryption**: Two keys (public & private). Solves key distribution, but slower.
  - **Hybrid (e-commerce)**: Use asymmetric to exchange a session key, then use symmetric for the session.
- **Integrity (I)** : Ensure data not modified. Achieved via **hashing** (creates a unique fingerprint).
- **Availability (A)** : Data accessible when needed. Improved by **redundancy** and high availability design.

## V126 - Threats & Vulnerabilities
- **Threat**: Person or event with potential to negatively impact a resource (e.g., hacker, hurricane).
- **Vulnerability**: Weakness that might allow a threat to be realized (e.g., unpatched system, no backup generator).
- **Risk** exists where a threat and a vulnerability intersect.
- **Internal Threats**: Originate from within the organization (intentional or accidental).
- **External Threats**: Originate from outside (hackers, hacktivists, environmental events).
- **Vulnerability Categories**: Environmental, Physical, Operational, Technical.
- **CVE (Common Vulnerabilities & Exposures)**: List of publicly disclosed security flaws.
- **Zero-day**: Unknown vulnerability at time of publication.
- **Exploit**: Software code that takes advantage of a vulnerability.

## V127 - Risk Management
- **Risk Assessment**: Process to identify hazards and analyze potential incidents.
- **Security Risk Assessments**:
  - **Threat Assessment**: Focuses on identifying threats (e.g., MITRE ATT&CK).
  - **Vulnerability Assessment**: Identifies, quantifies, prioritizes vulnerabilities (e.g., Nessus).
  - **Penetration Test**: Ethical hackers attempt to exploit vulnerabilities.
  - **Posture Assessment**: Assesses attack surface, misconfigurations, patching delays.
- **Business Risk Assessments**:
  - **Process Assessment**: Examines processes against criteria.
  - **Vendor Assessment**: Evaluates prospective vendors’ security controls.

## V128 - Audits & Compliance (PCI DSS, GDPR)
- **Data Locality**: Geographic location where data is stored/processed. Important for legal/regulatory requirements.
- **PCI DSS (Payment Card Industry Data Security Standard)** : Contractual requirement for companies handling credit card data. Focuses on secure environment, vulnerability management, access control, monitoring.
- **GDPR (General Data Protection Regulation)** : EU law for data protection/privacy. Applies to organizations outside EU that offer goods/services to EU individuals. Provides rights (access, rectification, erasure, etc.).

## V129 - Device Hardening
- **Definition**: Removing or disabling unnecessary applications, services, and ports to reduce attack surface.
- **Key Actions**:
  1. Disable unneeded network interfaces.
  2. Disable unused background services (e.g., CUPS, Bluetooth daemon).
  3. Close/block unneeded ports.
  4. Enable full-disk encryption.
  5. Disable/delete unused accounts.
- **EOL (End of Life)** : Date when manufacturer stops selling the product. No new licenses or mainstream support.
- **EOS (End of Support)** : Last date manufacturer provides support/patches.
- **Critical**: After EOL/EOS, no patches → permanent open attack surface.

## V130 - Disabling Services (Demonstration)
- Shows how to disable services in Windows (`services.msc`, `sc stop`, `net stop`), macOS (Activity Monitor), and Linux (`top`, `kill`).

## V131 - Physical Security
- **Detection Mechanisms (Detective Controls)** : Cameras (CCTV, PTZ, infrared), motion detectors, asset tags, tamper detection.
- **Prevention Mechanisms (Preventive Controls)** :
  - Access control hardware (badge readers, biometrics).
  - Access control vestibule (mantrap).
  - Smart lockers (for personal devices).
  - Locking racks & cabinets.
  - **Employee training** (highest ROI).

## V132 - Honeypots & Active Defense
- **Active Defense**: Responding to a threat by destroying or deceiving the threat actor’s capabilities.
- **Honeypot**: Single host/server set up as bait to lure attackers away from real assets.
- **Honeynet**: Entire fake network.
- **Attribution**: Identifying and publishing an attacker’s methods, techniques, and tactics.
- **Annoyance Strategies**: Obfuscation techniques to waste attacker's time (bogus DNS entries, decoy directories, port triggering/spoofing).
- **Hack Back**: Using offensive techniques to identify attackers and degrade their capabilities. **Legal & reputational risks** (often illegal). Best practice: **do not engage**.
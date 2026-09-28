# Session 16: Logical Security

## V145 - Section Outline
- **Logical Security**: Non-physical measures to protect digital data, restrict unauthorized access, ensure integrity & confidentiality.
- **Course Objectives**: 1.4 (common ports/protocols), 4.1 (basic security concepts), 4.3 (apply security features).
- **Topics Covered**:
  - IAM (Identity & Access Management).
  - MFA (Multifactor Authentication).
  - Authentication methods (local, LDAP, Kerberos, SSO, SAML, RADIUS, TACACS+, time-based).
  - Security principles (least privilege, access control models – DAC, MAC, RBAC).
  - Encryption (symmetric, asymmetric, data states).
  - IPSec (AH, ESP, transport vs. tunnel mode).
  - PKI (Public Key Infrastructure).
  - Digital certificates (types, lifecycle, key management).

## V146 - Identity and Access Management (IAM)
- **Definition**: Security process providing identification, authentication, and authorization for users, computers, and other entities.
- **Unique Subjects**: Personnel, Endpoints, Servers, Software, Roles.
- **IAM Tasks**: Creating/deprovisioning accounts, managing accounts, auditing accounts, evaluating identity-based threats, maintaining compliance.
- **Account Types & Risks**:
  - **User accounts**: Least risky (basic permissions).
  - **Privileged accounts (admin, root)**: More risky (high permissions).
  - **Shared accounts**: Very dangerous (loss of auditability).

## V147 - Multifactor Authentication (MFA)
- **Definition**: Proving identity using more than one method from different categories.
- **Five Authentication Factors**:
  1. **Something You Know (Knowledge Factor)** : Password, PIN. Weaknesses: default credentials, common passwords, weak/short passwords.
  2. **Something You Have (Possession Factor)** : Smart card, RSA key fob, RFID badge.
  3. **Something You Are (Inherence Factor)** : Fingerprints, retina scan, voice print. Intrusive; used in high-security environments.
  4. **Something You Do (Action Factor)** : Signature dynamics, screen pattern.
  5. **Somewhere You Are (Location Factor)** : Geotagging (GPS), geofencing.
- **Important**: Username + password = **single factor** (both are knowledge factors). True 2FA requires factors from **different categories**.

## V148 - Authentication Methods
- **Local Authentication**: Credentials stored locally.
- **LDAP (Lightweight Directory Access Protocol)** : Centralized database. Port 389 (plaintext), 636 (LDAPS). Microsoft’s implementation = Active Directory (AD).
- **Kerberos**: Authentication & authorization in Windows domain. Uses ticket system (TGT, service ticket). Port 88. Mutual authentication.
- **SSO (Single Sign-On)** : One set of credentials for multiple resources. Drawback: compromised credentials give access to all resources. Mitigation: MFA.
- **SAML (Security Assertion Markup Language)** : XML-based format for exchanging authentication info. Enables SSO or federated identity management.
- **RADIUS (Remote Authentication Dial-In User Service)** : Centralized administration for dial-up, VPN, wireless. Uses UDP ports 1812 (auth), 1813 (accounting). Cross-platform.
- **TACACS+** : Cisco proprietary. Uses TCP. Separates authentication, authorization, accounting. Requires all Cisco devices.
- **Time-Based Authentication (TOTP)** : Combines shared secret key + current timestamp (e.g., 30-second intervals). Resistant to replay attacks.

## V149 - Security Principles (Least Privilege, Access Control Models)
- **Least Privilege**: Users perform tasks with the lowest permission level necessary.
- **Access Control Models**:
  - **DAC (Discretionary Access Control)** : Resource owner controls access. Granular but risky.
  - **MAC (Mandatory Access Control)** : System controls access using data labels (e.g., military classifications). Very secure, complex.
  - **RBAC (Role-Based Access Control)** : System controls access using roles (groups). Industry best practice.

## V150 - Encryption (Data States, Symmetric vs. Asymmetric)
- **Data States**:
  - **Data at Rest**: Stored on hard drive, storage device. Protect via full-disk encryption, file/folder encryption.
  - **Data in Transit (in Motion)** : Moving between computers. Protect via TLS/SSL, IPSec, WPA2.
  - **Data in Use (in Processing)** : Active data in RAM, CPU caches. Protect via secure processing mechanisms.
- **Symmetric Encryption**: Same key for encryption/decryption. Fast, but key management problem.
- **Asymmetric Encryption**: Two keys (public & private). Solves key distribution, but slower.
- **Hybrid (e-commerce)**: Use asymmetric to exchange a session key, then use symmetric for the session.

## V151 - IPSec (Internet Protocol Security)
- **Definition**: Secure network protocol suite for authentication & encryption of IP packets. Primary use: VPNs.
- **IKE Phase One**: Authenticates peers, establishes secure channel. Uses Main Mode (3 exchanges, secure) or Aggressive Mode (faster, less secure).
- **IKE Phase Two**: Negotiates IPSec SAs for the tunnel (Quick Mode).
- **Diffie-Hellman Key Exchange**: Allows two unknown parties to securely share a secret key.
- **Transport Mode**: Uses original IP header. Used for client-to-site VPNs.
- **Tunneling Mode**: Encapsulates entire packet + new header. Used for site-to-site VPNs.
- **AH (Authentication Header)** : Provides integrity, authentication, anti-replay. Does **not** provide confidentiality (encryption).
- **ESP (Encapsulating Security Payload)** : Provides integrity, authentication, anti-replay, and confidentiality (encryption).

## V152 - PKI (Public Key Infrastructure)
- **Definition**: Entire system of hardware, software, policies, procedures, and people based on asymmetric encryption.
- **How HTTPS works**:
  1. Browser requests server’s public key from a Certificate Authority (CA).
  2. Browser generates a random shared secret key.
  3. Browser encrypts shared secret using server’s public key.
  4. Server decrypts using its private key.
  5. Both now share the same secret → switch to symmetric tunnel (TLS/SSL).
- **Key Escrow**: Secure third-party storage of cryptographic keys (in case of loss or legal investigation).

## V153 - Digital Certificates
- **Definition**: Digitally-signed electronic document that binds a public key with a user’s identity (X.509 standard).
- **Types**:
  - **Wildcard Certificate**: Allows all subdomains (e.g., `*.diontraining.com`).
  - **Single-sided Certificate**: Only server authenticates to client.
  - **Dual-sided Certificate**: Both server and user authenticate each other.
  - **Self-signed Certificate**: Signed by the entity itself (low trust; for testing).
  - **Third-party Certificate**: Issued and signed by a trusted CA (preferred for public-facing sites).
- **Components**:
  - **CA (Certificate Authority)** : Trusted third party that issues certificates.
  - **RA (Registration Authority)** : Collects user identity info and forwards requests to CA.
  - **CSR (Certificate Signing Request)** : Block of encoded text containing requester’s info and public key.
  - **CRL (Certificate Revocation List)** : List of revoked certificates maintained by a CA.
  - **Key Escrow Agent**: Holds a secure copy of a user’s private key.
  - **Key Recovery Agent**: Restores lost or corrupted keys.

## V154 - Digital Certificates Demonstration
- Shows how to view digital certificate details for Google (ECC, 256-bit) and Apple (RSA, 2048-bit) in Chrome.
- ECC favored for mobile/low-power devices; RSA favored for desktops.

## V155 - Key Management
- **Definition**: How an organization generates, exchanges, stores, and uses encryption keys.
- **Key Generation**: Often user-driven (master password). Weak password = weak key.
- **Key Exchange**: Use asymmetric encryption to securely transmit symmetric keys (e.g., Diffie-Hellman).
- **Key Storage**: Must be secure when not in use.
- **Key Rotation**: Keys should be changed periodically to reset the attack timeline.
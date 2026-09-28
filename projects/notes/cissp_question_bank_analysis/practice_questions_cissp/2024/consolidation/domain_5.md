# Domain 5: Identity and Access Management (IAM) (Consolidated)

## 1. Q&A (Fully Aligned Questions)

### 🔹 Question 146 (5.1.1)
Access control systems should mediate all access requests; they control all
access. To do so, the system must first be able to identify which of the following?
<br/>A. People and objects
<br/>B. Systems and data
<br/>C. Subjects and data
<br/>D. Subjects and objects

**✅ Correct Answer: D. Subjects and objects**

```text
Feedback: Subjects are any person, process, device, or other entity that wants
to access any of the objects in the system and the objects are the information
assets or systems resources. Note that subjects are also objects and attempts to
access them (or data about them) must also be controlled.
```

---

### 🔹 Question 147 (5.1.1)
Which type of access control system can authorize or deny an individual user's
ability to use IT systems, resources, or assets, and has the capability to assign
different access privileges to different users depending on their role in the
organization?
<br/>A. Logical
<br/>B. Physical
<br/>C. Mandatory
<br/>D. Discretionary

**✅ Correct Answer: A. Logical**

```text
Feedback: These are two of the characteristics defined in the U.S. government's
Federal Identity, Credential, and Access Management (FICAM) roadmap (among others)
that are components of a logical access control system.
```

---

### 🔹 Question 150 (5.2.2)
Within IAM, the term triple A (AAA) is often heard. Two of the As are
authentication and accounting. What is the third?
<br/>A. Access
<br/>B. Authorization
<br/>C. Acceptance
<br/>D. Acceptability

**✅ Correct Answer: B. Authorization**

```text
Feedback: IAM requires three steps: first is authentication of the entities
requesting access to the system (authentication). This can be defined as the
verification of a claim of identity of the entity (e.g., user, process, device).
Next, the system authorizes the request, providing access to the entity's
permitted resources. Finally, the system generates and maintains accounting data
on all accesses, both blocked and allowed, to support alarms, audits, analysis,
performance monitoring, and other functions.
```

---

### 🔹 Question 151 (5.2.2)
Multifactor authentication (MFA) is a mechanism used to verify the assertion of
an identity by using which of the following?
<br/>A. A password
<br/>B. A token
<br/>C. A physical characteristic
<br/>D. Two or more pieces of different types of evidence

**✅ Correct Answer: D. Two or more pieces of different types of evidence**

```text
Feedback: Using a password and biometrics would be an example of MFA.
```

---

### 🔹 Question 154 (5.2.2)
Which aspect of the AAA framework is MOST likely causing the user's access issue
in the following scenario? An IT Security Analyst in a large corporation receives
a report from a user experiencing difficulties accessing a critical business
application. The user, who recently had their role changed within the company,
reports that upon attempting to log in, they receive an error message stating,
"Access denied." The user confirms they are entering their credentials correctly.
Prior to their role change, they had regular access to this application.
<br/>A. Authentication, as the user is entering their credentials incorrectly
<br/>B. Authorization, as there is a potential mismatch between the user's new
     role and the access permissions set in the application
<br/>C. Accounting, as there might be issues with logging and monitoring of the
     user's access attempts
<br/>D. Authentication, as the application does not recognize the user's
     credentials after the role change.

**✅ Correct Answer: B. Authorization, as there is a potential mismatch between
the user's new role and the access permissions set in the application**

```text
Feedback: This is the most likely cause. The role change could have led to a
change in access permissions, and the "Access denied" message typically indicates
an authorization issue.
```

---

### 🔹 Question 155 (5.2.5)
When different organizations need to share common information, what solutions
might be sought?
<br/>A. Federated identity management (FIM)
<br/>B. Credential management
<br/>C. A cloud
<br/>D. Shared identity stores

**✅ Correct Answer: A. Federated identity management (FIM)**

```text
Feedback: FIM occurs when identity federation is applied to one or more systems
allowing users to log in based on authenticating against one of the systems
participating in the federation.
```

---

### 🔹 Question 158 (5.2.5, 5.3.1)
Which directory services are a cut-down version of the X.500 directory access
protocol?
<br/>A. Active Directory (AD)
<br/>B. Novell Directory Service (NDS)
<br/>C. Lightweight Directory Access Protocol (LDAP)
<br/>D. X.509

**✅ Correct Answer: C. Lightweight Directory Access Protocol (LDAP)**

```text
Feedback: LDAP is often compared to an old-fashioned telephone directory, where
an LDAP server contains information about users in a directory tree and clients
query it for details.
```

---

### 🔹 Question 159 (5.2.6)
What function does a credential management system perform?
<br/>A. It is a repository for user and computer accounts.
<br/>B. It is the binding between an authenticator and an identifier.
<br/>C. It is used to create user accounts.
<br/>D. It is used to create machine accounts.

**✅ Correct Answer: B. It is the binding between an authenticator and an identifier.**

```text
Feedback: Credentials are used to identify and verify a user, machine or other
entity identity claim. The credential management system (CMS) is an established
form of issuing and managing those credentials, based on software.
```

---

### 🔹 Question 162 (5.6)
What component, found in Kerberos, is responsible for creating and issuing access
tokens to authenticated users?
<br/>A. Ticket Granting Ticket (TGT)
<br/>B. Key Distribution Center (KDC)
<br/>C. TGS
<br/>D. Active Directory (AD)

**✅ Correct Answer: C. TGS**

```text
Feedback: TGS creates and issues service tickets (tokens) based on successfully
receiving a valid TGT.
```

---

### 🔹 Question 163 (5.6)
Which of the following is an example of an identity store?
<br/>A. Kerberos
<br/>B. LDAP
<br/>C. All the above
<br/>D. X.500

**✅ Correct Answer: C. All the above**

```text
Feedback: All answers are an identity store, which is essentially a database.
LDAP is a lightweight version of X.500.
```

---

### 🔹 Question 164 (5.6)
Which component in Security Assertion Markup Language (SAML) defines how
attributes, authentication, and authorization are exchanged?
<br/>A. Profiles
<br/>B. Protocols
<br/>C. Bindings
<br/>D. Assertions

**✅ Correct Answer: D. Assertions**

```text
Feedback: SAML Assertion contains the user authorization status. The three types
of assertions are authentication, attribute, and authorization.
```

---

### 🔹 Question 167 (5.6)
Which of these events BEST describes a plausible method by which an attacker
could have exploited the Kerberos system in the following scenario? An
international corporation has recently implemented a Kerberos-based authentication
system for enhancing the security of its internal networks and systems. Despite
rigorous security protocols, a breach was detected in their network. Upon
investigation, it was found that the breach was facilitated through an attack on
the Kerberos authentication mechanism.
<br/>A. The attacker executed a Cross-Site Scripting (XSS) attack on the company's
     internal web applications, hoping to steal a user's ticket-granting ticket
     (TGT) through malicious scripting.
<br/>B. The attacker exploited a weakness in the password policy, performing a
     brute-force attack to guess a user's password and subsequently obtain valid
     Kerberos tickets.
<br/>C. The attacker utilized a 'Golden Ticket' attack, creating a ticket-granting
     ticket (TGT) with elevated privileges to access multiple services.
<br/>D. The attacker conducted a Distributed Denial of Service (DDoS) attack on
     the Kerberos server, disrupting the authentication services and exploiting
     the fallback security mechanisms.

**✅ Correct Answer: C. The attacker utilized a 'Golden Ticket' attack, creating
a ticket-granting ticket (TGT) with elevated privileges to access multiple services.**

```text
Feedback: This option refers to a 'Golden Ticket' attack. This sophisticated
attack involves compromising a Key Distribution Center's (KDC) account and
creating a TGT with extensive privileges, providing broad access to the network.
```

---

## 2. Question-Only (No Answer Key Available)

### 🔹 Question 152 (5.2.2)
What is the Crossover Error Rate (CER)?
<br/>A. In biometric authentication, it is where there are more false acceptances than rejections.
<br/>B. In biometric authentication, it is where there are more rejections accepted than acceptances.
<br/>C. In biometric authentication, it is where the false acceptances and rejections are in balance.
<br/>D. In any authentication or authorization process, it is where the false acceptance rate and false rejection rate are equal.

**✅ Correct Answer: C. In biometric authentication, it is where the false acceptances and rejections are in balance.**

```text
Feedback: The Crossover Error Rate (CER), also known as the Equal Error Rate (EER), is the point in a biometric system where the False Acceptance Rate (FAR) equals the False Rejection Rate (FRR). A lower CER indicates better biometric system accuracy. Option A describes high FAR. Option B describes high FRR. Option D is incorrect because CER specifically applies to biometric authentication systems, not "any" authentication process.
```

---

### 🔹 Question 153 (5.2.2)
Which identity management approach should a company implement to provide a near real-time account creation and provisioning process, specifically suited for their requirement of timely and temporary access for external consultants and temporary employees?
<br/>A. Pre-staging
<br/>B. Just-in-time
<br/>C. Self-provisioning
<br/>D. Credential management

**✅ Correct Answer: B. Just-in-time**

```text
Feedback: Just-in-time (JIT) provisioning creates accounts and grants access at the moment they are needed, rather than in advance. This is ideal for temporary workers and consultants who need immediate access upon arrival and have limited-time engagements. Pre-staging (A) creates accounts in advance—not "just in time." Self-provisioning (C) allows users to create their own accounts but may lack the oversight needed for external consultants. Credential management (D) focuses on credential lifecycle, not provisioning timing.
```

---

### 🔹 Question 156 (5.2.5)
Federated identity management currently uses two standards to provide human and machine-readable processes for identification, authentication, and authorization. These standards are Security Assertion Markup Language (SAML) and which of the following?
<br/>A. Kerberos
<br/>B. OpenID Connect
<br/>C. OAuth
<br/>D. PAP

**✅ Correct Answer: B. OpenID Connect**

```text
Feedback: The two primary standards for federated identity management are SAML (human-readable, XML-based, widely used for enterprise SSO) and OpenID Connect (machine-readable, JSON/REST-based, built on OAuth 2.0, widely used for consumer and mobile identity federation). Kerberos (A) is a network authentication protocol but not a federated identity standard across organizational boundaries. OAuth (C) is an authorization framework, not an authentication standard (OpenID Connect adds authentication on top of OAuth). PAP (D) is Password Authentication Protocol, an outdated and insecure protocol.
```

---

### 🔹 Question 165 (5.6)
What does a user present to request a service ticket in Kerberos?
<br/>A. BGT
<br/>B. KGT
<br/>C. TGT
<br/>D. JWT

**✅ Correct Answer: C. TGT**

```text
Feedback: In Kerberos authentication, after initial authentication, the user receives a Ticket Granting Ticket (TGT). To request a service ticket for a specific service, the user presents the TGT to the Ticket Granting Service (TGS). The TGS validates the TGT and issues a service ticket. BGT is not a Kerberos term. KGT is not standard (Key Granting Ticket does not exist). JWT (JSON Web Token) is unrelated to Kerberos.
```

---

### 🔹 Question 166 (5.6)
Which protocols are associated with SAML? Select all that apply.
<br/>A. XML
<br/>B. JSON
<br/>C. HTTP
<br/>D. SOAP

**✅ Correct Answer: A, C, D (XML, HTTP, SOAP)**

```text
Feedback: SAML (Security Assertion Markup Language) is XML-based (A) for its assertions
and protocol messages. SAML uses SOAP (D) for request/response binding in many enterprise
deployments. SAML 2.0 Web Browser SSO Profile often uses HTTP POST/Redirect bindings (C).
JSON (B) is used by OpenID Connect and OAuth, not SAML (which is XML-native).
```
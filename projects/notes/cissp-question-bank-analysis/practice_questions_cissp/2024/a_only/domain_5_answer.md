# Domain 5 - Identity and Access Management (IAM) - Answer Keys

## Question 146 (5.1.1)
**Correct Answer:** D. Subjects and objects

**Feedback:** Subjects are any person, process, device, or other entity that wants to access any of the objects in the system and the objects are the information assets or systems resources. Note that subjects are also objects and attempts to access them (or data about them) must also be controlled.

## Question 147 (5.1.1)
**Correct Answer:** A. Logical

**Feedback:** These are two of the characteristics defined in the U.S. government's Federal Identity, Credential, and Access Management (FICAM) roadmap (among others) that are components of a logical access control system.

## Question 150 (5.2.2)
**Correct Answer:** B. Authorization

**Feedback:** IAM requires three steps: first is authentication of the entities requesting access to the system (authentication). This can be defined as the verification of a claim of identity of the entity (e.g., user, process, device). Next, the system authorizes the request, providing access to the entity's permitted resources. Finally, the system generates and maintains accounting data on all accesses, both blocked and allowed, to support alarms, audits, analysis, performance monitoring, and other functions.

## Question 151 (5.2.2)
**Correct Answer:** D. Two or more pieces of different types of evidence

**Feedback:** Using a password and biometrics would be an example of MFA.

## Question 154 (5.2.2)
**Correct Answer:** B. Authorization, as there is a potential mismatch between the user's new role and the access permissions set in the application

**Feedback:** This is the most likely cause. The role change could have led to a change in access permissions, and the "Access denied" message typically indicates an authorization issue.

## Question 155 (5.2.5)
**Correct Answer:** A. Federated identity management (FIM)

**Feedback:** FIM occurs when identity federation is applied to one or more systems allowing users to log in based on authenticating against one of the systems participating in the federation.

## Question 158 (5.2.5, 5.3.1)
**Correct Answer:** C. Lightweight Directory Access Protocol (LDAP)

**Feedback:** LDAP is often compared to an old-fashioned telephone directory, where an LDAP server contains information about users in a directory tree and clients query it for details.

## Question 159 (5.2.6)
**Correct Answer:** B. It is the binding between an authenticator and an identifier.

**Feedback:** Credentials are used to identify and verify a user, machine or other entity identity claim. The credential management system (CMS) is an established form of issuing and managing those credentials, based on software.

## Question 162 (5.6)
**Correct Answer:** C. TGS

**Feedback:** TGS creates and issues service tickets (tokens) based on successfully receiving a valid TGT.

## Question 163 (5.6)
**Correct Answer:** C. All the above

**Feedback:** All answers are an identity store, which is essentially a database. LDAP is a lightweight version of X.500.

## Question 164 (5.6)
**Correct Answer:** D. Assertions

**Feedback:** SAML Assertion contains the user authorization status. The three types of assertions are authentication, attribute, and authorization.

## Question 167 (5.6)
**Correct Answer:** C. The attacker utilized a 'Golden Ticket' attack, creating a ticket-granting ticket (TGT) with elevated privileges to access multiple services.

**Feedback:** This option refers to a 'Golden Ticket' attack. This sophisticated attack involves compromising a Key Distribution Center's (KDC) account and creating a TGT with extensive privileges, providing broad access to the network.
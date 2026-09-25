# Domain 8: Software Development Security (Consolidated)

## 1. Q&A (Fully Aligned Questions)

### 🔹 Question 224 (8.1.2)
The Software Engineering Institute's Software Capability Maturity Model Integration
(CMMI) focuses on which of the following?
<br/>A. Software development methodologies
<br/>B. Systems integration
<br/>C. Process management
<br/>D. Software testing and evaluation

**✅ Correct Answer: C. Process management**

```text
Feedback: SW-CMMI is a process improvement methodology to allow organizations to
mature to better levels in relation to process improvement.
```

---

### 🔹 Question 225 (8.1.2)
Which level in the Software Engineering Institute's Software Capability Maturity
Model (CMM) defines processes as controlled using quantitative techniques?
<br/>A. Repeatable
<br/>B. Defined
<br/>C. Managed
<br/>D. Optimizing

**✅ Correct Answer: C. Managed**

```text
Feedback: There are 5 levels CMMI, where level 4 is quantitatively managed.
```

---

### 🔹 Question 228 (8.5.1, 7.7.7)
When thinking about malware, is a hoax dangerous?
<br/>A. Yes, always
<br/>B. No, never
<br/>C. Sometimes
<br/>D. Both A and B

**✅ Correct Answer: C. Sometimes**

```text
Feedback: Hoaxes are usually warnings about new viruses that do not actually exist
and generally carry instructions to carry out certain actions, such as deleting a
file, and to forward the warning to all the user's contacts.
```

---

### 🔹 Question 229 (8.5.1)
First noticed in 2010, Stuxnet is an example of an advanced persistent threat (APT).
APT is another name for which of the following?
<br/>A. A class of trojans
<br/>B. A class of viruses
<br/>C. A class or worms
<br/>D. Multidimensional attacks

**✅ Correct Answer: D. Multidimensional attacks**

```text
Feedback: By combining viruses, trojans, worms and rootkits into one attack
(advanced), the chances increase of the actor succeeding in their objective.
Stuxnet was one such example.
```

---

### 🔹 Question 232 (8.5.1)
Databases are vulnerable to several types of attacks. Which of the following
attacks allows an authorized user to obtain more information from a database than
was originally intended?
<br/>A. Bypass
<br/>B. Inference
<br/>C. Aggregation
<br/>D. Aggregation and inference combined

**✅ Correct Answer: D. Aggregation and inference combined**

```text
Feedback: Combining pieces of information from disparate sources may produce
situational intelligence or inference that was otherwise unintended.
```

---

### 🔹 Question 233 (8.5.1)
When considering databases, what is a "deadly embrace"?
<br/>A. Data contamination
<br/>B. A deadlock
<br/>C. A DoS
<br/>D. None the above

**✅ Correct Answer: B. A deadlock**

```text
Feedback: A deadlock occurs when two more processes each hold open or have placed
an exclusive use lock on some elements of a set of resources that the other needs
to complete its own processing thus preventing either from completing the action.
```

---

### 🔹 Question 236 (8.5.2)
Which SQL language concept is used by database administrators to establish and
control access to data?
<br/>A. DCL
<br/>B. DML
<br/>C. DDL
<br/>D. DTL

**✅ Correct Answer: A. DCL**

```text
Feedback: The Data Control Language (DCL) is used by systems administrators and
database administrators to establish and control access to data.
```

---

### 🔹 Question 237 (8.5.3)
Procedural and object-oriented programming provide ways to handle the management
of complex sets of software. Which of the following is not one of them?
<br/>A. Code reuse
<br/>B. Reforming
<br/>C. Refactoring
<br/>D. Data modeling

**✅ Correct Answer: B. Reforming**

```text
Feedback: Reforming does not exist in this context.
```

---

### 🔹 Question 240 (8.5.3)
At a minimum, database models need to provide security controls, the ability to be
shared by multiple users, fault tolerance and recovery, and what else?
<br/>A. Transaction persistence
<br/>B. The ability to back up the data
<br/>C. Different user levels
<br/>D. The ability to survive a hardware failure

**✅ Correct Answer: A. Transaction persistence**

```text
Feedback: Transaction persistence requires that the state of the database is the
same as it was prior to the transaction after a transaction against the database
has occurred, except for those data elements specifically affected (created,
modified, or deleted) by the transaction itself.
```

---

## 2. Question-Only (No Answer Key Available)

### 🔹 Question 230 (8.5.1)
Which type of virus does not actually touch the target file but instead takes advantage of precedence within the system?
<br/>A. Multipartite
<br/>B. Boot sector infector
<br/>C. Companion
<br/>D. Script

**✅ Correct Answer: C. Companion**

```text
Feedback: A companion virus (also called "companion malware") does not modify the target executable file. Instead, it creates a separate file (e.g., with a different extension or in a different directory) that executes instead of the legitimate program due to path precedence or search order vulnerabilities (e.g., on DOS: creating .COM version of an .EXE file). Multipartite (A) infects multiple targets (boot sector + files). Boot sector infector (B) infects the boot sector. Script (D) infects script files. Only companion viruses leverage file execution precedence without modifying the target.
```

---

### 🔹 Question 231 (8.5.1)
Software design errors that induce an application to malfunction when an attacker provides unvalidated information are best described as what weakness?
<br/>A. Buffer overflow
<br/>B. Race condition
<br/>C. SQL
<br/>D. Malformed input

**✅ Correct Answer: D. Malformed input**

```text
Feedback: Malformed input vulnerabilities occur when an application accepts unvalidated or improperly validated input from an attacker, causing unexpected behavior (crashes, privilege escalation, code execution). This is the general category that includes buffer overflows (A—a specific type of input validation failure), SQL injection, command injection, format string attacks, etc. Race conditions (B) are concurrency issues, not input validation. "SQL" (C) is incomplete (SQL injection is one type). Malformed input (D) is the best broad description of this weakness class.
```

---

### 🔹 Question 239 (8.5.3)
Which of the following would not be classified as a nonfunctional requirement?
<br/>A. Performance
<br/>B. Scalability
<br/>C. Usability
<br/>D. They are all examples of nonfunctional requirements.

**✅ Correct Answer: D. They are all examples of nonfunctional requirements.**

```text
Feedback: Performance (response time, throughput), scalability (ability to handle growth), and usability (user experience, learnability, efficiency) are all classic examples of nonfunctional requirements (quality attributes or "ilities"). They describe "how" the system performs its functions rather than "what" the system does (functional requirements). Therefore, none of A, B, or C would be excluded; they are all nonfunctional requirements, making D the correct answer.
```
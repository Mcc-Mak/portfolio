# Domain 6: Security Assessment and Testing (Consolidated)

## 1. Q&A (Fully Aligned Questions)

### 🔹 Question 170 (6.1.1)
Which of the following activities is MOST critical for a company undergoing an
audit for SOC2 Type II compliance to demonstrate ongoing adherence to the SOC2
processing integrity principle?
<br/>A. Conducting frequent penetration tests to identify potential vulnerabilities
     in the system
<br/>B. Regularly reviewing and updating the data retention and disposal policies
<br/>C. Implementing and reviewing detailed logs of all system processing activities
<br/>D. Ensuring all employees attend annual data protection and privacy training

**✅ Correct Answer: C. Implementing and reviewing detailed logs of all system
processing activities**

```text
Feedback: The "Processing Integrity" principle in SOC2 focuses on the completeness,
validity, accuracy, timeliness, and authorization of system processing.
Implementing and regularly reviewing detailed logs of all system processing
activities is crucial for ensuring the processing is accurate, authorized, and
functioning as intended, thereby meeting the requirements of the processing
integrity principle.
```

---

### 🔹 Question 173 (6.1.1-3)
Your organization develops security-as-a-service software that is consumed via
your private cloud. You employ 50 developers that practice Agile discipline in
releasing tools to market. A potential client approaches your organization with
the intent to acquire your services. Before the potential client commits to a
contractual agreement, they have informed your organization that they need to be
provided with the highest degree of assurance possible that risks to your
operational effectiveness are well contained or mitigated, and they will receive
your services delivered in the same operable form they were created in without
being changed.

For the potential client to understand the probability that your department of
50 developers remain properly compensated and incentivized to continue to support
the security-as-a-service that they wish to consume, what report might they consider?
<br/>A. SOC 2 Type II
<br/>B. SOC 2 Type I
<br/>C. SOC 1 Type II
<br/>D. SOC 1 Type I

**✅ Correct Answer: C. SOC 1 Type II**

```text
Feedback: A SOC 1 Type II report would be appropriate since it would reflect the
effectiveness of the internal controls over financial reporting (ICFR). Special
attention could be associated with benefits management. SOC 1 is for reviewing
financial controls. SOC 1 Type II proves design effectiveness of financial control.
```

---

### 🔹 Question 174 (6.1.1, 6.5.1)
Which is NOT one of the four steps carried out during an internal assessment?
<br/>A. Chartering
<br/>B. Testing
<br/>C. Reporting
<br/>D. Correction

**✅ Correct Answer: D. Correction**

```text
Feedback: The results of the internal assessment may identify areas where
corrective action or improvement is warranted. Remediation (corrective) activities
should proceed as defined by the organization's practice.
```

---

### 🔹 Question 178 (6.1.3)
The SOC 2 (System and Organization Controls) defines five Trust Services Criteria.
Which of the following is NOT included?
<br/>A. Security
<br/>B. Authentication
<br/>C. Privacy
<br/>D. Process integrity

**✅ Correct Answer: B. Authentication**

```text
Feedback: The five criteria are Security, Availability, Confidentiality, Privacy,
and Process integrity. Authentication is not a part of the SOC 2 audit.
```

---

### 🔹 Question 179 (6.2.2)
Which of the following scenarios BEST illustrates the application of a penetration
testing approach, as opposed to a vulnerability assessment, for an organization
enhancing its cybersecurity measures and evaluating testing methodologies?
<br/>A. The cybersecurity team uses software to scan the network for known
     vulnerabilities in its systems and software.
<br/>B. A team of ethical hackers is hired to simulate an attack on the
     institution's network to identify and exploit potential security weaknesses.
<br/>C. The IT department regularly updates its systems and applies patches to
     address known security vulnerabilities.
<br/>D. An automated tool is deployed to continuously monitor the network for
     unusual activity that could indicate a security breach.

**✅ Correct Answer: B. A team of ethical hackers is hired to simulate an attack
on the institution's network to identify and exploit potential security weaknesses.**

```text
Feedback: Penetration testing, unlike a vulnerability assessment, involves
actively attempting to exploit vulnerabilities in a system to understand the
real-world effectiveness of existing security measures.
```

---

### 🔹 Question 182 (6.2.10)
Tests are generally categorized in one of two ways: either compliance tests or
______ tests.
<br/>A. Substantive
<br/>B. Substantial
<br/>C. Informative
<br/>D. General

**✅ Correct Answer: A. Substantive**

```text
Feedback: A substantive test evaluates the proper operation of the process
whereas compliance tests determine if, in the opinion of the controls assessor,
the control exists and is operating properly.
```

---

### 🔹 Question 183 (6.3.2)
Which publication, framework or guidance includes the following management review
activities?

Exemptions from normal activities
Information related to previous reviews
Ongoing metrics related to outcomes
Results of audits
When security objectives have been met
<br/>A. ISO/IEC 27001
<br/>B. NIST
<br/>C. ITIL
<br/>D. All the above

**✅ Correct Answer: D. All the above**

```text
Feedback: Periodic management reviews ensure that security process data is being
used as intended and that required controls are functioning as intended.
```

---

## 2. Question-Only (No Answer Key Available)

### 🔹 Question 175 (6.1.1, 6.1.2)
If an organization's security assessment and testing plans include both internal and external testing, in what order should the test be performed?
<br/>A. Internal testing should be performed first.
<br/>B. Always choose based on a cost/benefit analysis.
<br/>C. External testing should always be performed first.
<br/>D. Internal and external should be performed simultaneously.

**✅ Correct Answer: B. Always choose based on a cost/benefit analysis.**

```text
Feedback: There is no mandatory order for internal vs external testing. The appropriate sequence depends on the organization's specific goals, risk profile, threat model, and resource constraints. A cost/benefit analysis should determine which testing provides the most value based on the organization's unique circumstances. Options A and C incorrectly prescribe absolute ordering. Option D (simultaneous) may not be practical due to resource constraints and could interfere with identifying root causes.
```

---

### 🔹 Question 176 (6.1.1, 6.1.2)
Which type of testing would inform an organization of the vulnerabilities that could be exploited by a bad actor with little or no information about the organization's systems?
<br/>A. Internal
<br/>B. Horizontal
<br/>C. External
<br/>D. White box

**✅ Correct Answer: C. External**

```text
Feedback: External testing simulates an attacker from outside the organization with little to no inside knowledge (black-box or gray-box approach). This mirrors the perspective of external threat actors who have limited information about internal systems. Internal testing (A) assumes insider access/knowledge. Horizontal testing (B) is not a standard testing category in this context. White box testing (D) assumes full knowledge of internal systems, which does not match "little or no information."
```

---

### 🔹 Question 177 (6.1.2)
Which type of audit is an evaluation against compliance requirements and performed by individuals outside of the organization?
<br/>A. Formal
<br/>B. Informal
<br/>C. Semiformal
<br/>D. It can be either formal or informal.

**✅ Correct Answer: A. Formal**

```text
Feedback: An audit performed by individuals outside the organization (external auditors) against compliance requirements is a "formal audit." Formal audits follow structured methodologies, documented criteria (e.g., ISO, SOC, PCI-DSS), and produce formal reports. Informal audits are typically internal reviews, self-assessments, or walkthroughs. Semiformal is not a standard audit classification in this context.
```

---

### 🔹 Question 184 (6.3.3)
Which of the following can be likened to peering into the future?
<br/>A. KPIs
<br/>B. KRIs
<br/>C. Log files, as what has happened before is likely to happen again.
<br/>D. Assessment programs

**✅ Correct Answer: B. KRIs**

```text
Feedback: Key Risk Indicators (KRIs) are forward-looking metrics that provide early warning signals of increasing risk exposure before an adverse event occurs. They "peer into the future" by identifying potential risks ahead of time. KPIs (A) measure past/current performance. Log files (C) look at historical events. Assessment programs (D) evaluate current state. KRIs are specifically designed as predictive/forward-looking indicators.
```

---

### 🔹 Question 185 (6.5.1)
What is a POA&M?
<br/>A. Plan of Activities and Mediation
<br/>B. Process of Actions and Methods
<br/>C. Principle of Activities and Milestones
<br/>D. Plan of Action and Milestones

**✅ Correct Answer: D. Plan of Action and Milestones**

```text
Feedback: POA&M stands for "Plan of Action and Milestones." It is a management tool used in security assessment and remediation, particularly in U.S. federal government contexts (NIST RMF). It documents findings, remediation actions, responsible parties, resources, and completion milestones for addressing security weaknesses. Options A, B, and C are incorrect expansions of the acronym.
```

---

### 🔹 Question 186 (6.5.1)
Chartering is one of the steps carried out during an internal assessment. Which of the following activities is not part of the chartering process?
<br/>A. Management's commitment
<br/>B. Scoping the assessment
<br/>C. Tailoring the solutions
<br/>D. Risk assessment

**✅ Correct Answer: C. Tailoring the solutions**

```text
Feedback: Chartering in internal assessment typically includes: obtaining management commitment (A), defining the scope of the assessment (B), conducting an initial risk assessment to prioritize areas (D), defining objectives, establishing governance, and identifying resources. "Tailoring the solutions" (C) occurs in the remediation/corrective action phase after assessment findings are known, not during the chartering (planning/initiation) phase.
```

---

### 🔹 Question 187 (6.5.1)
What is the appropriate document the project manager should develop to guide the remediation process, given the United States (U.S.) government security standards, in the following scenario? A government contractor specializing in cybersecurity solutions is working on a project that involves securing a federal agency's information systems. During a recent security assessment, several weaknesses were identified in the agency's systems, necessitating immediate and structured action to remediate these vulnerabilities. The project manager decides to create a formal document that outlines the specific steps for addressing these weaknesses, along with timelines for completion and milestones for tackling progress.
<br/>A. Plan of Activities and Mediation
<br/>B. Process of Actions and Methods
<br/>C. Principle of Activities and Milestones
<br/>D. Plan of Action and Milestones

**✅ Correct Answer: D. Plan of Action and Milestones**

```text
Feedback: Under U.S. government security standards (NIST RMF, FedRAMP), the formal document used to track remediation of identified weaknesses is the POA&M (Plan of Action and Milestones). It includes specific remediation steps, timelines, milestones, responsible parties, and resource requirements. Options A, B, and C are incorrect expansions of the acronym. This directly matches answer D.
```
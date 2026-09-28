# Session 4: Risk Management

## Overview
This session covers the core concepts of risk management, including risk assessment, response strategies, controls, continuous monitoring, and supply chain risk management (SCRM). It consists of 6 videos (V22–V27).

---

## Video V22 (Outline): Risk Management (Section Intro)

**Objective:** To introduce the key topics in risk management for the CISSP exam.

### Topics Covered in this Session
1.  Risk Management Concepts (Threats, Vulnerabilities)
2.  Risk Response Strategies (Avoid, Transfer, Mitigate, Accept)
3.  Controls and Countermeasures (Preventative, Detective, Corrective)
4.  Continuous Monitoring (NIST SP 800-137)
5.  Supply Chain Risk Management (SCRM)

---

## Video V23: Risk Management Concepts (Threats, Vulnerabilities)

**Objective:** To define threats, vulnerabilities, and the risk management process.

### I. Core Definitions
| Concept | Definition |
| :--- | :--- |
| **Threat** | The potential for unwanted harm to personnel or an asset |
| **Vulnerability** | A weakness or flaw that could cause harm |
| **Risk** | Threats × Vulnerabilities (Risk exists only when both are present) |

### II. The Four-Step Risk Management Framework (NIST)

| Step | Description |
| :--- | :--- |
| **1. Frame** | Understand how the organization reacts to risk (unique to each organization) |
| **2. Assess** | Research assets to discover risks; determine risk tolerance (Senior Management) |
| **3. Respond** | Decide the best course of action to handle the risk |
| **4. Monitor** | Verify the response is effective and compliant (continuous loop) |

---

## Video V24: Risk Response and Monitoring (Strategies)

**Objective:** To explain the five risk response strategies and the monitoring process.

### I. The Five Risk Responses

| Response | Description | Example |
| :--- | :--- | :--- |
| **Mitigation** | Reduce risk to an acceptable level | Installing a firewall |
| **Assignment (Transfer)** | Transfer responsibility to a third party | Insurance, Managed Service Provider |
| **Deterrence** | Implement deterrent controls | Warning signs, guards |
| **Avoidance** | Eliminate the activity that introduces risk | Not installing a web server |
| **Acceptance** | Acknowledge residual risk (always present) | Doing nothing or accepting remaining risk |

### II. Monitoring & Continuous Improvement
- **Verify Effectiveness:** Are controls working as intended?
- **Maintain Compliance:** Trace responses back to policies (Due Care/Due Diligence).
- **Update Responses:** Adapt to changes (new software, new threats).
- **Follow-on Analysis:** Re-assess periodically (check logs, review occurrence rates).

### III. Tools: Risk Maturity Model / Heat Map
- **Red/Orange (Hot):** High risk; needs immediate action.
- **Green/Yellow (Cool):** Within risk tolerance.

---

## Video V25: Controls and Countermeasures (Defense in Depth)

**Objective:** To explain the categories and types of security controls.

### I. Three Control Categories (Defense in Depth)

| Category | Description | Examples |
| :--- | :--- | :--- |
| **Administrative** | Policies, procedures, processes | Audit log review, security policies |
| **Technical/Logical** | Technology-based protections | IAM, firewalls, encryption, MFA |
| **Physical** | Tangible barriers | Fences, locks, guards, signs |

### II. Seven Control Types (by Intent)

| Type | Purpose | Example |
| :--- | :--- | :--- |
| **Deterrent** | Discourage violations | Warning signs/banners |
| **Preventative** | Stop unauthorized actions | Authentication (IAM) |
| **Detective** | Discover violations | Alarms, audit logs |
| **Corrective** | Fix an issue | Security guard, employee reprimand |
| **Compensating** | Alternative control when primary is weak | Multi-Factor Authentication |
| **Directive** | Guide compliance | Security policy rules |
| **Recovery** | Restore after an event | Backups, DR plans |

### III. Key Principle
- **Cost Effectiveness:** The cost of a control must be less than the value of the asset it protects.

---

## Video V26: Continuous Monitoring (NIST SP 800-137)

**Objective:** To explain the purpose and process of continuous monitoring.

### I. Definition
- **Continuous Monitoring (ISCM):** Regularly evaluating security controls to ensure they remain effective against current threats (not the same as system/SIEM monitoring).

### II. Key Components of a Monitoring Strategy

| Component | Question |
| :--- | :--- |
| **Scope** | What is being evaluated? (Assets, personnel, specific controls) |
| **Method** | How will it be evaluated? (Manual vs. automated, scans, inspections) |
| **Frequency** | How often? (Monthly, weekly, daily, depending on control type) |
| **Metric** | How is success/failure tracked? |

### III. The Six-Step Continuous Monitoring Process
1.  **Define** strategy based on risk tolerance.
2.  **Establish** methods to collect monitoring data.
3.  **Analyze** the collected data.
4.  **Report** findings to senior management.
5.  **Respond** to identified risks.
6.  **Review and update** the monitoring program.

---

## Video V27: Supply Chain Risk Management (SCRM)

**Objective:** To explain the risks and assessments related to the supply chain.

### I. Core Concept
- The supply chain is the network between an organization and its suppliers. Since organizations cannot build everything themselves, they must acquire goods and services from third parties, introducing risks.

### II. Key Frameworks (For the Exam)
| Framework | Focus |
| :--- | :--- |
| **NIST IR 7622** | National Supply Chain Risk Management Practice for Federal Systems |
| **CNSSD 505** | Supply Chain Risk Management |
| **ISO 28000** | Security management systems for the supply chain |

### III. Types of Supply Chain Risks

| Risk Type | Description |
| :--- | :--- |
| **Unintentional Risks** | Poor security practices, lack of personnel screening, unreliable suppliers |
| **Service Risks** | Exposure of sensitive data or IP when using third-party services (e.g., cloud providers) |
| **Hardware Risks** | Counterfeit hardware, embedded spyware, lack of built-in security features |
| **Software Risks** | Vulnerabilities, malware, licensing issues |

### IV. Supply Chain Assessments

| Assessment Type | Description |
| :--- | :--- |
| **Onsite Assessment** | Visit the supplier to observe practices firsthand |
| **Documentation Review** | Review engineering processes, compliance certifications, security reports |
| **Third-Party Audit** | Employ an external entity to independently review the supply chain |

### V. The "Chain" Concept
- **Raw Material → Supplier → Manufacturing → Distribution → Organization → Customer**
- Any broken link introduces security risk.

---

## Session Summary
Session 4 covers the **essential risk management lifecycle** for the CISSP exam. Key takeaways include:
1.  **Risk = Threats × Vulnerabilities** (only exists when both are present).
2.  The **four-step NIST RMF** process: Frame, Assess, Respond, Monitor.
3.  **Five risk responses:** Mitigation, Assignment, Deterrence, Avoidance, Acceptance.
4.  **Three control categories:** Administrative, Technical, Physical.
5.  **Seven control types:** Deterrent, Preventative, Detective, Corrective, Compensating, Directive, Recovery.
6.  **Continuous monitoring** (NIST SP 800-137) for ongoing control effectiveness.
7.  **Supply Chain Risk Management (SCRM):** Risks from hardware, software, services, and assessments (onsite, documentation, third-party audit).
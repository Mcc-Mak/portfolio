# Session 6: Risk Assessments and Threat Modeling

## Overview
This session covers risk assessments, control assessments, privacy assessments, PCI DSS assessments, and threat modeling concepts and methodologies. It consists of 8 videos (V34–V41).

---

## Video V34 (Outline): Risk Assessments (Section Intro)

**Objective:** To introduce the key topics in risk assessments and threat modeling.

### Topics Covered in this Session
1.  Understanding Risk Assessments
2.  Conducting Risk Assessments (Quantitative vs. Qualitative)
3.  Control Assessments (Security & Privacy)
4.  PCI DSS Assessments
5.  Threat Modeling Concepts
6.  Threat Modeling Methodologies (STRIDE, PASTA, DREAD, etc.)

---

## Video V35: Understanding Risk Assessments

**Objective:** To explain the purpose and process of risk assessments (NIST 800-30).

### I. Definition & Purpose
- **Risk Assessment:** The research and analysis of organizational assets to discover possible risks.
- **Goals:** Identify risk factors, analyze validity, and evaluate organizational impacts.

### II. The Four-Step Risk Assessment Process (NIST 800-30)

| Step | Description |
| :--- | :--- |
| **1. Preparation** | Define purpose, scope, and unique approach |
| **2. Conduct Assessment** | Create a list of identified security risks |
| **3. Report Results** | Communicate findings to senior management in business language |
| **4. Maintain Assessment** | Monitor risks over time to ensure response effectiveness |

### III. The Risk Equation
- **Threats × Vulnerabilities = Risk**
- Risk does NOT exist if there is no threat OR no vulnerability (the missing element could appear in the future).

---

## Video V36: Conducting Risk Assessments (Quantitative vs. Qualitative)

**Objective:** To explain how to perform quantitative and qualitative risk analysis.

### I. Quantitative Risk Analysis (Numbers/Money)

**Key Formulas:**

| Term | Formula | Description |
| :--- | :--- | :--- |
| **SLE (Single Loss Expectancy)** | AV × EF | Cost of a single loss |
| **ALE (Annualized Loss Expectancy)** | SLE × ARO | Total cost of losses per year |
| **Net Benefit** | (ALE before - ALE after) - ACS | Savings from a safeguard |

**Key Terms:**
- **AV (Asset Value):** Total worth of the asset.
- **EF (Exposure Factor):** Percentage of asset lost if attacked.
- **ARO (Annualized Rate of Occurrence):** Times per year the risk occurs.
- **ACS (Annual Cost of Safeguard):** Cost of the countermeasure.

**Example (Web Server):**
- AV = $30,000, EF = 50%, SLE = $15,000
- ARO = 10 attacks/year → ALE before = $150,000
- Safeguard (WAF) costs $30,000/year, reduces ARO to 3 → ALE after = $45,000
- **Net Benefit = $75,000 saved**

**Golden Rule:** Never spend more on a safeguard than the value of the asset.

### II. Qualitative Risk Analysis (Judgment/Rankings)

| Technique | Description |
| :--- | :--- |
| **Delphi Technique** | Anonymous survey to get honest opinions from SMEs |
| **Heat Map / Risk Matrix** | Plot probability vs. impact (Red/Yellow/Green zones) |

- **Faster and simpler** than quantitative analysis.
- Uses subjective judgment (High/Medium/Low rankings).

### III. Hybrid Approach
- Combine quantitative (for hardware) and qualitative (for data) methods.
- Start with qualitative for quick results, then dive into quantitative for hotspots.

---

## Video V37: Control Assessments (Security & Privacy)

**Objective:** To explain how to evaluate security and privacy controls.

### I. Two Main Types of Assessments

| Type | Focus |
| :--- | :--- |
| **Security Control Assessment (SCA)** | Evaluates controls required to meet security objectives (built into SDLC) |
| **Privacy Impact Assessment (PIA)** | Evaluates controls required to meet applicable data privacy laws |

### II. The Assessment Plan (What & How)

| Component | Description |
| :--- | :--- |
| **Purpose & Scope** | Why are we testing? What is in focus? |
| **Test Criteria** | What constitutes success or failure? (Crucial for due diligence) |
| **Procedures** | Step-by-step processes for repeatability |
| **Dependencies** | Resources needed (tools, licenses, SMEs) |
| **Reference Material** | Policies, laws, or standards the assessment is based on |

### III. Types of Assessment Procedures

| Procedure | Description |
| :--- | :--- |
| **Examination** | Non-intrusive review (log files, policies) |
| **Interview** | Discuss controls with personnel (admins, SMEs) |
| **Test** | Active engagement; compare expected vs. actual behavior |

---

## Video V38: Privacy Control Assessments (PTA, PIA, PCA)

**Objective:** To explain the privacy control assessment process (NIST 800-53A).

### I. Key Regulations Driving Privacy
- **GDPR, HIPAA, Privacy Act 1988, CCPA**

### II. Pre-Assessment Workflow

| Step | Description |
| :--- | :--- |
| **PTA (Privacy Threshold Analysis)** | Initial evaluation: "Is PII present?" |
| **PIA (Privacy Impact Assessment)** | Deep dive: "How bad is the risk?" (What, Why, Who, How) |

### III. The Four-Step PCA Process (PDCA Mnemonic)

| Step | Mnemonic | Description |
| :--- | :--- | :--- |
| **1. Prepare** | **P**rivacy | Define scope, objective, stakeholders; setup collaboration tools |
| **2. Develop** | **D**rives | Create assessment plan; document in-scope controls; get approval |
| **3. Conduct** | **C**ontinuous | Execute test procedures; identify gaps; document findings |
| **4. Analyze** | **A**ssessment | Review findings; create remediation plan (POAM); prioritize by severity |

---

## Video V39: PCI DSS Assessments (ROC, SAQ)

**Objective:** To explain how to assess PCI DSS compliance.

### I. The Four-Step Assessment Process (ARRM)

| Step | Description |
| :--- | :--- |
| **A - Assess** | Identify all locations of cardholder data (data inventory, CDE) |
| **R - Remediate** | Fix vulnerabilities (mitigate or adjudicate) |
| **R - Report** | Document the assessment and remediation results |
| **M - Monitor & Maintain** | Continuously verify control effectiveness |

### II. Three Assessment Methods

| Method | Description |
| :--- | :--- |
| **Examine** | Passive review (configs, logs, documents) |
| **Observe** | Active interaction (pen testing, SAST, DAST) |
| **Interview** | Talk to personnel (admins, engineers) |

### III. Reporting Mechanisms

| Report | Description | Required For |
| :--- | :--- | :--- |
| **ROC (Report on Compliance)** | Conducted by a Qualified Security Assessor (QSA) | Level 1 Merchants (>6M transactions/year) |
| **SAQ (Self-Assessment Questionnaire)** | Completed internally by the organization | Levels 2, 3, 4 Merchants |

### IV. Merchant Levels (Cheat Sheet)

| Level | Transactions/Year | Reporting |
| :--- | :--- | :--- |
| **Level 1** | >6 million | ROC (QSA required) |
| **Level 2** | 1–6 million | SAQ |
| **Level 3** | 20,000–1 million | SAQ |
| **Level 4** | <20,000 | SAQ |

---

## Video V40: Threat Modeling Concepts

**Objective:** To explain the purpose and concepts of threat modeling.

### I. Core Concept
- **Threat Modeling:** A type of risk assessment that analyzes potential threats from both attacker and defender perspectives.

### II. Key Terminology

| Term | Definition |
| :--- | :--- |
| **Threat** | Potential for unwanted harm to personnel or an asset |
| **Attack Surface** | All possible areas (people, technology, physical) where an attacker could compromise an asset |
| **Threat Intelligence** | Analyzed information used to make security decisions (TTPs, KPIs, KRIs) |

### III. Approaches to Threat Modeling

| Approach | Timing | Description |
| :--- | :--- | :--- |
| **Proactive** | Before deployment | Predict threats and design security in from the start |
| **Reactive** | System is operational | Discover threats against a live system and add controls |

### IV. The Core Four Questions (threatmodelingmanifesto.org)
1.  What are we working on?
2.  What can go wrong?
3.  What are we going to do about it?
4.  Did we do a good enough job?

### V. Points of View for Identifying Threats

| View | Focus |
| :--- | :--- |
| **Attacker-Focused** | How can an attacker get in? (attack vectors) |
| **Asset-Focused** | What can happen to critical assets? |
| **System-Focused** | Threats against the entire system |

---

## Video V41: Threat Modeling Methodologies (STRIDE, PASTA, OCTAVE, etc.)

**Objective:** To explain the major threat modeling methodologies for the CISSP exam.

### I. STRIDE (Microsoft)

| Letter | Threat | Description |
| :--- | :--- | :--- |
| **S** | Spoofing | Using someone else's credentials to gain unauthorized access |
| **T** | Tampering | Unauthorized modification, insertion, or destruction of data |
| **R** | Repudiation | User denies performing an action with no way to prove otherwise |
| **I** | Information Disclosure | Exposing information to a user without permission (attacks confidentiality) |
| **D** | Denial of Service | Disrupting access to resources for valid users (attacks availability) |
| **E** | Elevation of Privilege | An unprivileged user gains higher-level access (admin/root) |

### II. NIST SP 800-154 (Data-Centric Threat Modeling)

| Step | Description |
| :--- | :--- |
| **1. Identify and Characterize** | Map data flow, usage, storage |
| **2. Identify Attack Vectors** | Find attacker pathways |
| **3. Characterize and Mitigate** | Apply controls to reduce risk |
| **4. Analyze the Threat Model** | Continuous improvement |

### III. PASTA (Process for Attack Simulation and Threat Analysis)

| Stage | Description |
| :--- | :--- |
| **1** | Define business objectives (BIA) |
| **2** | Define technical scope (infrastructure, assets) |
| **3** | Decompose application (data flows, threat agents) |
| **4** | Threat analysis (attack scenarios, threat intel) |
| **5** | Vulnerability analysis (flaws, attack surface) |
| **6** | Attack modeling (simulate attacks, pen test) |
| **7** | Risk analysis (quantify risk, mitigation) |

### IV. OCTAVE Allegro (4 Steps)

| Step | Description |
| :--- | :--- |
| **1** | Establish drivers (risk objectives) |
| **2** | Create profiles (profile asset types) |
| **3** | Identify threats (document attack surface) |
| **4** | Identify and mitigate (analyze and address risks) |

### V. Other Methodologies
- **TRIKE:** Open-source, risk-management-based methodology.
- **VAST (Visual, Agile, Simple Threat):** Designed for Agile development.

---

## Session Summary
Session 6 covers the **complete risk assessment and threat modeling landscape** for the CISSP exam. Key takeaways include:
1.  **Quantitative Risk Analysis:** Formulas (SLE, ALE) and the golden rule (control cost < asset value).
2.  **Qualitative Risk Analysis:** Delphi technique and heat maps for faster results.
3.  **Control Assessments:** Security (SCA) vs. Privacy (PIA/PCA) with the PDCA process.
4.  **PCI DSS Assessments:** ARRM process, ROC vs. SAQ, and the 4 merchant levels.
5.  **Threat Modeling:** Proactive vs. reactive, the four core questions, and methodologies (STRIDE, PASTA, OCTAVE).
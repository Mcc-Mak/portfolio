# Session 32: Software Development Security (CISSP Objectives 8.1, 8.2)

**Videos:** V238 – V247  
**Core Focus:** Software Development Lifecycle (SDLC) – NIST SP 800-64 five phases; Software Development Methodologies – Waterfall, Incremental Build, Spiral, Cleanroom, JAD, RAD; Agile Development – four core values, 12 principles, Scrum roles (Product Owner, Scrum Master, Development Team), sprints; DevOps and DevSecOps – CI/CD pipeline, infrastructure as code, security as code, separation of duties; Software Maturity Models – CMM (SW-CMM) five levels, IDEAL model, CMMI; Software Operations and Maintenance (O&M) – patch management, regression testing; Integrated Product Teams (IPTs) – cross-functional collaboration; Code Repositories – Git, access controls, API keys.

---

## Video V238 (Outline): Software Development Security (Section Intro)

**Objective:** To introduce the key topics in software development security for the CISSP exam.

### Topics Covered in this Session
1.  Software Development Lifecycle (SDLC) – NIST SP 800-64 five phases
2.  Software Development Methodologies – Waterfall, Incremental Build, Spiral, Cleanroom, JAD, RAD
3.  Agile Development – four core values, 12 principles, Scrum, sprints
4.  DevOps and DevSecOps – CI/CD pipeline, infrastructure as code, security as code
5.  Software Maturity Models – CMM (SW-CMM), IDEAL, CMMI
6.  Software Operations and Maintenance (O&M) – patch management, regression testing
7.  Integrated Product Teams (IPTs) – cross-functional collaboration
8.  Code Repositories – Git, access controls, API keys

---

## Video V239: Software Development Lifecycle (SDLC)

**Objective:** To explain the NIST SP 800-64 five-phase SDLC and the newer NIST SP 800-160.

### I. Core Concept
- **Definition:** A series of phases moving software from inception to retirement (creation to recreation)
- **Goal:** Increase software maturity through iterative phases
- **Exam Focus:** Based on **NIST SP 800-64** (System Development Lifecycle), though withdrawn in 2019
- **Newer Standard:** NIST SP 800-160 (System Security Engineering) – maps similarly to the old phases

### II. The Five Phases (NIST SP 800-64)

| Phase | Key Activities |
| :--- | :--- |
| **1. Initiation** | Define need, purpose, requirements, organizational objectives. Identify privacy/data protection needs. Decide build vs. buy. Conduct Privacy Impact Assessment (PIA) & business impact assessment. |
| **2. Development & Acquisition** | Assess risks (especially for third-party/COTS products). Determine initial security & privacy controls. Create/update security documentation & architecture design. Perform risk analysis. |
| **3. Implementation** | Obtain stakeholder approval. Securely deploy to operations/production. Conduct security assessment/audit for compliance. Integrate security into the environment. |
| **4. Operations & Maintenance (O&M)** | Provide designed functionality. Apply configuration management & change control (CCB). Continuously monitor security control effectiveness. Adapt controls to new threats/vulnerabilities. |
| **5. Disposal** | Remove from operations. Sanitize/declassify software and data. Apply CM and change control during removal. Preserve records for audit. Dispose of hardware/software. |

### III. Key Cross-Cutting Principles
- **Documentation:** Must be continuously updated as changes occur
- **Risk & Privacy:** Assessed from initiation through disposal
- **Change Control:** Critical from O&M phase onward, but also during disposal
- **Continuous Monitoring:** Applies especially in O&M and disposal phases

### IV. Exam Takeaways
- **Must know:** Each phase and its specific activities
- **Note:** Even though NIST SP 800-64 is withdrawn, exam questions will still refer to it

---

## Video V240: Software Development Methodologies – Part 1

**Objective:** To explain Waterfall, Incremental Build, and Spiral models.

### I. Waterfall Model
- **Origin:** Created by Winston Royce in 1970
- **Nature:** Sequential, repetitive (iterative), feedback loops allowed
- **Core phases** (exam-relevant):
  1. Requirements (system/software)
  2. Design (preliminary/detailed)
  3. Implementation (coding & debugging)
  4. Testing
  5. Operations & maintenance
- **Drawbacks:** All requirements must be known upfront; structured process limits flexibility; no disposal/retirement phase
- **Best for:** Sensitive, high-risk, or methodical applications

### II. Incremental Build Model
- **Concept:** Build software in smaller, achievable chunks (increments)
- **Process per increment:** Analysis → Design → Coding → Testing → Delivery
- **Key traits:** System engineering done upfront during analysis & design; each increment informs the next (lessons learned, adaptation); predates but resembles agile

### III. Spiral Model
- **Approach:** Product revisits development phases multiple times
- **Typical steps per loop:** Planning → Risk analysis (software development risk, not security risk) → Engineering → Evaluation
- **Visual concept:** Multiple prototypes moving through phases, allowing backward fixes and rework
- **Drawback:** Difficult to build security into the process due to parallel/iterative tracking

### IV. Exam Takeaways
- Know each step of the **waterfall model**
- Understand the **purpose** of the incremental build model
- Understand the **purpose** of the spiral model

---

## Video V241: Software Development Methodologies – Part 2

**Objective:** To explain Cleanroom, JAD, and RAD models, and provide a selection guide.

### I. Cleanroom Reference Model (CRM)
- **Focus:** Defect prevention via rigorous engineering & quality control
- **Origin:** Carnegie Mellon University / Software Engineering Institute
- **Four principle functions:** Software management, Specification, Development, Certification
- **Process:** 14 processes → 20 work products to prove software is defect-free

### II. Joint Application Development (JAD)
- **Focus:** Continuous interaction between user and developer
- **Goals:** Reduce timeframes, cost, and improve quality via direct feedback
- **Process (JAD sessions):** Define objectives → Session preparation → Session conduct → Documentation

### III. Rapid Application Development (RAD)
- **Origin:** Response to Waterfall's rigidity
- **Focus:** Working software over strict project management
- **Often combined with:** JAD + CASE tools
- **Best for:** Prototypes, R&D, proof of concept, minimum viable product
- **Steps:** Requirements → User design → Construction → Cutover (deliver to customer)

### IV. Quick Selection Guide

| Methodology | Best for |
| :--- | :--- |
| **Waterfall** | Methodical approach with known requirements, critical applications, sensitive data |
| **Spiral** | Responding quickly to changes/risks in large/complex projects |
| **Incremental Build** | Faster Waterfall with flexibility for scope changes & user feedback |
| **Cleanroom** | Formal, strict defect prevention |
| **JAD** | Constant user input & satisfaction, short timelines |
| **RAD** | Fast development/deployment/feedback, R&D, proof of concept |

### V. Key Takeaways
- **Well-defined requirements are essential** regardless of methodology
- Understand **preparation time, cost, and effort** before selecting a methodology

---

## Video V242: Agile Development

**Objective:** To explain Agile core values, 12 principles, Scrum methodology, and security integration.

### I. Definition & Core Mindset
- **Agile** = flexible, adaptive, collaborative approach to software development
- A **mindset** focused on problem-solving, not rigid processes

### II. Four Core Values (key for exams)
1.  **Individuals & interactions** over processes & tools
2.  **Working software** over comprehensive documentation
3.  **Customer collaboration** over contract negotiation
4.  **Responding to change** over following a plan (origin of the name "Agile")

### III. The 12 Principles (Agile Manifesto) – Summarized

| # | Principle |
| :--- | :--- |
| 1 | Customer satisfaction is highest priority |
| 2 | Welcome requirement changes, even late |
| 3 | Deliver frequently (incremental) |
| 4 | Business & developers team together |
| 5 | Build project around motivated people |
| 6 | Face-to-face conversations |
| 7 | Working software = primary progress measure |
| 8 | Sustainable development (constant pace) |
| 9 | Technical excellence & good design enhance agility |
| 10 | Simplicity (maximize work not done) |
| 11 | Self-organized teams |
| 12 | Regular team reflection & tuning |

### IV. Scrum Methodology (most popular, exam-focused)

**Three roles:**
- **Product Owner** – sets goals, objectives, scope
- **Scrum Master** – removes roadblocks, manages process (like a project manager)
- **Development Team** – self-organized, creates work based on "Definition of Done" (DoD)

**Scrum process (sprint-based):**
- **Sprint** = fixed timebox (1–4 weeks)
- Steps: Sprint Planning → Backlog → Kanban board → Development → Production → Review → Retrospective
- **Daily Scrum** – 5–15 min face-to-face meeting

### V. Other Agile Methodologies (mention only)
- Crystal, Kanban, Lean, RUP, Agile Unified Process, DSDM, Feature-Driven Development, Extreme Programming (XP), SAFe

### VI. Security in Agile
- Define security controls **upfront**
- Integrate **configuration management**
- Regular **security assessments & audits**
- Links to DevOps / DevSecOps

### VII. Exam Takeaways
- Understand purpose of Agile
- **Know the 4 core values** (very important)
- Understand purpose of the 12 principles (not memorize all)
- Know importance of integrating security into Agile

---

## Video V243: DevOps and DevSecOps

**Objective:** To explain DevOps, CI/CD pipeline, infrastructure as code, security as code, and DevSecOps.

### I. DevOps Basics
- **Definition:** Combines **development** and **operations** to rapidly develop and deliver software
- **Goal:** Enable agile development → frequent delivery of MVP, then iterative refinement
- **High-level cycle:** Plan → Develop → Deliver → Operate → (back to Plan)

### II. DevOps Workflow / Pipeline
- **Pipeline** = automated workflow for continuous integration & delivery (CI/CD)
- Includes: development, QA/QC, security testing, software testing
- **Challenge:** Maintaining **separation of duties** (hard due to integrated roles)

### III. Infrastructure as Code (IaC)
- Provision infrastructure (networks, VMs, load balancers) via code (XML, Python, tools like Chef, Ansible, Terraform)
- Increases speed, consistency; reduces risk & cost
- **Immutable architecture** = static, trusted, fully CM-controlled

### IV. Security & Role Management in DevOps
- **Key principles:** Separation of duties, **least privilege**
- Risk: **Privilege/authorization creep** – especially with automation tools (e.g., Jenkins)

### V. DevSecOps (Development + Security + Operations)
- **Also called:** Security as Code (built into pipeline)
- **Mindset shift** – proactive, solution-focused security, not rigid doctrine
- **DevSecOps Manifesto principles:** Lean in / solve problems; data & science over fear; open collaboration; 24/7 proactive monitoring; shared threat intel

### VI. CI/CD (Continuous Integration / Continuous Delivery)
- **Continuous Integration:** Automates integrating new code into existing codebase
- **Continuous Delivery:** Automates delivering the integrated codebase
- **Continuous Deployment:** Automated delivery to **end users** (final pipeline step)

### VII. Where Security Fits in the Pipeline (baked in, not bolted on)
- **Version control** → Be on change control board
- **Build** → Build in controls & requirements
- **Testing** → Compliance checks
- **Test environment** → Security audits, compliance tests, vulnerability scans
- **Production deployment** → Security regression testing
- **Operations & maintenance** → Continuous monitoring

### VIII. Benefits of CI/CD Pipelines
- Faster, **consistent deliveries** (with proper security as code)
- Faster customer feedback
- Rapid response to discovered vulnerabilities

### IX. Exam Takeaways
- Purpose & benefits of **DevOps** and **DevSecOps**
- Purpose of **Infrastructure as Code** & **Security as Code**
- Purpose & benefits of **CI/CD**

---

## Video V244: Software Maturity Models

**Objective:** To explain SW-CMM, IDEAL model, and CMMI.

### I. Core Concept: Maturity Model
- **Purpose:** Evaluates and improves the overall software development process (not just security controls)
- **Focus:** Assessing the *maturity* of the process itself

### II. SW-CMM (Capability Maturity Model for Software)
- **Origin:** SEI at Carnegie Mellon (1993) for the US DoD
- **Five Maturity Levels (1 = lowest, 5 = highest):**

| Level | Name | Description |
| :--- | :--- | :--- |
| 1 | **Initial** | Few, undefined processes; success depends on effort |
| 2 | **Repeatable** | Disciplined processes allow repeating past successes |
| 3 | **Defined** | Standard, consistent processes integrated across all activities |
| 4 | **Managed** | Predictable, quantitatively understood, and controlled processes |
| 5 | **Optimizing** | Fully optimized with continuous improvement |

### III. IDEAL Model
- **Purpose:** Strategic planning for Software Process Improvement (SPI)
- **Phases (spells IDEAL):**
  - **I** nitiating – Create infrastructure, define roles/resources
  - **D** iagnosing – Review objectives, vision, past lessons
  - **E** stablishing – Set measurable goals and outcomes
  - **A** cting – Test/evaluate new or improved processes
  - **L** everaging – Use lessons/metrics to improve the next cycle

### IV. CMMI (Capability Maturity Model Integration)
- **Purpose:** Improves business performance by measuring key capabilities
- **Use:** Allows organizations (and consumers) to compare current capability levels
- **Focus Areas:** Development (product development & engineering processes); Services (service management, best practices)

### V. Exam Takeaways
- Know the five SW-CMM levels
- Understand IDEAL model phases
- Know CMMI purpose

---

## Video V245: Software Operations and Maintenance (O&M)

**Objective:** To explain O&M, patch management process, regression testing, and CM integration.

### I. Definition & Purpose of O&M
- **What it is:** Ensuring a software application securely provides its intended function after deployment in production
- **Primary goal:** Keep the software operational while preventing compromises to CIA

### II. Core Activity: Patch Management
- **Why needed:** Software flaws/bugs will inevitably arise post-deployment
- **Key principle:** Follow a strict, consistent process (integrated into the configuration management plan)

### III. The 5-Step Patch Management Process
1.  **Evaluation:** Identify patches and assess risk to the system (critical vs. irrelevant)
2.  **Test:** Evaluate the patch in a test environment for negative impacts
3.  **Approval:** Present to the Change Control Board (CCB) as part of configuration management
4.  **Rollout/Deployment:** Install the patch on production hosts
5.  **Verification:** Confirm correct installation, proper functioning, and **no regressions**

### IV. Key Concept: Regression & Regression Testing
- **Regression:** Unwanted changes caused by a patch (new vulnerabilities, broken functionality)
- **Types of regression tests:**
  - **Unit test:** Individual functionality
  - **Functional test:** Operational requirements
  - **Integration test:** Interactions between technologies
  - **Security test:** Security requirements (most common)

### V. Recommended Implementation: DevOps / CI/CD Pipeline
- Integrate O&M into a **CI/CD pipeline**
- Automate testing (security scans, vulnerability scans) within the pipeline

### VI. Final Takeaways for CISSP Exam
- **O&M must be part of the Configuration Management (CM) Plan**
- Evaluate O&M performance as part of **continuous monitoring**
- Understand the purpose of O&M, regressions/regression testing, and the CM plan integration

---

## Video V246: Integrated Product Teams (IPTs)

**Objective:** To explain IPT purpose, benefits, and priorities.

### I. Definition
- **IPT** = cross-functional / multi-disciplinary team
- Goal: deliver a customer product (here, a software product)

### II. Key Characteristics
- Members from various roles: developers, IT, project managers, architects, security, engineers, QA/QC, auditors, senior management
- Works within an integrated approach (tools, teams, development process)

### III. Benefits of a Strong IPT
- Reduces **time and cost** to deliver an operational product
- Leverages **diverse skill sets**
- Reduces **operational security risk** upfront (via solid planning & engineering)
- Results in **better quality** + continuous improvement

### IV. Priorities & Best Practices

| Priority | Description |
| :--- | :--- |
| **Customer focus** | Top priority — drives project outcome, processes, schedule |
| **Proactive risk management** | For product & security; consider cost, schedule, technical impacts |
| **Seamless tools** | Tools that don't interfere with development process |
| **Concurrent development** | Develop products and processes together to improve lifecycle |
| **Early & continuous planning** | Identify risks/technical impacts early, be proactive |
| **Flexibility** | Use standardized, cost-effective approaches; optimize team efforts |
| **Empowerment** | Give team members authority + responsibility to improve lifecycle |

### V. Exam Takeaways
- Understand the **purpose** of an IPT
- Understand the **priorities** for working in an IPT

---

## Video V247: Code Repositories

**Objective:** To explain code repositories, Git, and security concepts.

### I. Definition and Purpose
- **Code repository (code repo)** = centralized storage location for software code
- Supports collaboration via: web hosting, notifications, wiki pages

### II. Key Features
- Secure storage, code review, version control, flaw/bug tracking

### III. Git Overview
- Most common language for tracking changes in code files
- Created by Linus Torvalds (2005)
- Popular repos using Git: GitHub, GitLab, SourceForge, Bitbucket, ProjectLocker, CodeCommit, Azure Repos

### IV. Basic Workflow Example
- `git init` – create a new local repo
- `git clone` – check out a repo to work with it
- `git push` – send changes back to the repo
- All done over an **API**

### V. Security Considerations (exam focus)
- **Do not store sensitive data** in publicly accessible repos
- Most repos are **public by default** → set to **private** if needed
- Use **access controls** for authorized access/modifications
- Use **API keys** for connections to private repos
- Securely store and protect API keys
- **Do not hardcode API keys** in software code stored in the repo

### VI. Exam Takeaways
- Understand **purpose** of code repos
- Know **code repository security concepts**

---

## Session 32 Summary

Session 32 covers the **complete software development security landscape** for the CISSP exam (Objectives 8.1, 8.2). Key takeaways include:

1. **Software Development Lifecycle (V239):** NIST SP 800-64 five phases: Initiation → Development & Acquisition → Implementation → Operations & Maintenance → Disposal. Documentation, risk/privacy, change control, continuous monitoring across all phases.

2. **Development Methodologies – Part 1 (V240):** Waterfall (sequential, all requirements upfront), Incremental Build (smaller chunks, each increment informs next), Spiral (multiple prototypes, revisits phases, difficult for security).

3. **Development Methodologies – Part 2 (V241):** Cleanroom (defect prevention, rigorous), JAD (continuous user-developer interaction), RAD (fast, working software, best for prototypes). Selection guide based on project needs.

4. **Agile Development (V242):** Four core values (individuals, working software, customer collaboration, responding to change). Scrum: Product Owner, Scrum Master, Development Team. Sprints (1-4 weeks), daily Scrum. Security must be built in upfront.

5. **DevOps and DevSecOps (V243):** CI/CD pipeline automates integration and delivery. Infrastructure as Code (IaC) – immutable. Security as Code (DevSecOps) bakes security into every pipeline step. Separation of duties and least privilege are critical.

6. **Software Maturity Models (V244):** SW-CMM levels: Initial (1) → Repeatable (2) → Defined (3) → Managed (4) → Optimizing (5). IDEAL: Initiating, Diagnosing, Establishing, Acting, Leveraging. CMMI for business performance comparison.

7. **Software Operations & Maintenance (V245):** 5-step patch management: Evaluate → Test → Approve → Deploy → Verify. Regression testing ensures patches don't break existing functionality. O&M must be part of CM plan.

8. **Integrated Product Teams (V246):** Cross-functional collaboration (developers, security, management, QA). Benefits: reduced time/cost, reduced risk, better quality. Priorities: customer focus, proactive risk management, empowerment.

9. **Code Repositories (V247):** Git (created by Linus Torvalds) for version control. Security: private repos for sensitive data, access controls, API keys (never hardcoded), secure storage.

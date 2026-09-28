# Session 31: Business Continuity and Disaster Recovery (CISSP Objectives 1.7, 7.10, 7.11, 7.12, 7.13)

**Videos:** V229 – V237  
**Core Focus:** Business Continuity Planning (BCP) – NIST SP 800-34 seven steps; Business Impact Analysis (BIA) – MTD, RTO, RPO, WRT; Disaster Recovery Planning (DRP) – natural vs. manmade disasters; Disaster Recovery Strategies – resilience, fault tolerance, high availability, RAID, failover clusters, power protection, QoS; Disaster Recovery Sites – hot/warm/cold sites, mobile sites, cloud recovery, shared sites; Data Backup Strategies – full/differential/incremental, 3-2-1 rule, electronic vaulting, escrow; Disaster Recovery Processes – human life priority, communication, recovery vs. restoration; Disaster Recovery Testing – read-through, walkthrough, simulation, parallel, full interruption.

---

## Video V229 (Outline): BCP and DRP (Section Intro)

**Objective:** To introduce the key topics in business continuity and disaster recovery for the CISSP exam.

### Topics Covered in this Session
1.  Business Continuity Planning (BCP) – NIST SP 800-34 seven steps
2.  Business Impact Analysis (BIA) – MTD, RTO, RPO, WRT
3.  Disaster Recovery Planning (DRP) – natural vs. manmade disasters
4.  Disaster Recovery Strategies – resilience, fault tolerance, high availability, RAID, failover clusters, power protection, QoS
5.  Disaster Recovery Sites – hot/warm/cold sites, mobile sites, cloud recovery, shared sites
6.  Data Backup Strategies – full/differential/incremental, 3-2-1 rule, electronic vaulting, escrow
7.  Disaster Recovery Processes – human life priority, communication, recovery vs. restoration
8.  Disaster Recovery Testing – read-through, walkthrough, simulation, parallel, full interruption

---

## Video V230: Business Continuity Planning (BCP)

**Objective:** To explain the NIST SP 800-34 seven-step BCP framework.

### I. Core Concept & Importance
- **Definition:** BCP ensures an organization can continue functioning during disruptions (cyber attacks, power outages, natural disasters)
- **Relevance:** Ties directly to risk management, disaster recovery, and security governance

### II. Key Frameworks Mentioned (CISSP Exam Context)
- **Primary (for exam):** NIST SP 800-34 (Contingency Planning Guide for Federal Information Systems)
- **Secondary (awareness):** ISO 22301, FFIEC Handbook, FINRA Rule 4370, COBIT

### III. The Seven Steps of NIST SP 800-34

| Step | Name | Key Activities & Purpose |
| :--- | :--- | :--- |
| 1 | Develop Contingency Planning Policy Statement | Formal policy: sets direction, roles, responsibilities, executive support, scope, compliance alignment |
| 2 | Conduct Business Impact Analysis (BIA) | Identify critical systems, assess disruption impact, determine RTO/RPO, dependencies |
| 3 | Identify Preventive Controls | Reduce failure risk (e.g., fire suppression, UPS, data replication, patching) |
| 4 | Develop Contingency Strategies | Define recovery methods (hot site, cloud failover, remote work) based on BIA findings |
| 5 | Develop Information System Contingency Plan | Document actionable plan (aka DRP or COOP): step-by-step procedures, roles, contacts, escalation |
| 6 | Ensure Plan Testing, Training & Exercises | Validate plan via tabletop drills, simulations; train personnel; expose gaps before real incidents |
| 7 | Ensure Plan Maintenance | Regular reviews/updates (quarterly/annually) due to technology, staffing, or business changes |

### IV. Exam-Ready Insights (CISSP)
- **Order of steps matters** – expect questions on sequence
- **Policy first** – without executive support, BCP fails
- **Testing before approval** – leadership should approve only after validation
- **Key distinctions tested:** policy vs. strategy vs. actual plan; purpose of testing; RTO/RPO definitions
- **Outdated plan = no plan** – maintenance step is critical

---

## Video V231: Business Impact Analysis (BIA)

**Objective:** To explain BIA purpose, process, and key metrics (MTD, RTO, RPO, WRT).

### I. Purpose & Definition of BIA
- Identifies critical business functions & mission-essential functions
- Assesses potential impact of downtime
- Sets recovery priorities
- Foundation for disaster recovery & resilience

### II. Key Frameworks (for CISSP exam)
- **NIST SP 800-34** (3 main steps)
- **ISO 22317** (more detailed, step-by-step)

### III. NIST SP 800-34 – 3 Main Steps
1.  **Determine mission/business processes & recovery criticality** – Identify core functions; define MTD, RTO, RPO
2.  **Identify resource requirements** – Personnel, IT, facilities, software, data; account for interdependencies
3.  **Identify recovery priorities for system resources**

### IV. ISO 22317 – Step-by-Step Approach
1.  Understand BIA objectives (fundamentals)
2.  Plan BIA (scope, stakeholders, expectations)
3.  Determine products/services priorities (with stakeholders)
4.  Determine prioritized activities (rank by impact)
5.  Identify resources & dependencies
6.  Analyze & consolidate BIA results
7.  Present findings for executive management approval

### V. Core Metrics Defined

| Metric | Meaning |
| :--- | :--- |
| **MTD (Maximum Tolerable Downtime)** | Absolute max downtime before irreversible damage |
| **RTO (Recovery Time Objective)** | Target time to restore function (must be < MTD) |
| **RPO (Recovery Point Objective)** | Acceptable data loss (measured in time, backups, baselines) |
| **WRT (Work Recovery Time)** | Extra time for business to resume fully (RTO + WRT ≤ MTD) |

### VI. Real-World Example (Hospital Patient Record System)
- **MTD** = 24 hours (beyond that → legal/compliance issues)
- **RTO** = 6 hours (IT restoration goal)
- **RPO** = 10 minutes (data loss tolerance due to patient safety)
- Resources: servers, DB access, IT staff, backup power, cloud providers
- Dependencies: billing, scheduling systems
- Final BIA report → leadership approval → integrated into BCP

### VII. CISSP Exam Focus Areas
- High-level BIA steps (not detailed step names)
- Determining critical functions
- Defining MTD, RTO, RPO
- Assessing financial, operational, reputational impact
- Importance of executive approval

### VIII. Key Takeaway
> BIA findings must be reviewed and approved by senior leadership before integration into the Business Continuity Plan (BCP)

---

## Video V232: Disaster Recovery Planning

**Objective:** To explain natural and manmade disasters and their impact on DR planning.

### I. Disaster Recovery (DR) in CISSP Context
- DR focuses on **technology & IT assets** to support business functions
- Contrast with **Business Continuity (BC)**: BC focuses on **operations & critical business functions**

### II. Definition of a Disaster
- Event causing major property damage, destruction, or loss of life

### III. Types of Disasters (Exam-relevant)
- **Natural disasters** – planetary events (hurricanes, tornadoes, earthquakes, floods, wildfires, volcanoes)
- **Manmade disasters** – human actions (fires, terrorist attacks, cyber attacks, sabotage)
- **Non-disaster** – device malfunction/failure (requires recovery but not a full disaster)

### IV. Natural Disasters – Key Examples & Planning
- **Earthquakes** – prevalent in certain regions (e.g., US West Coast)
- **Flooding** – measured by **floodplains**:
  - 100-year floodplain → 1% annual chance
  - 500-year floodplain → 0.2% annual chance
- **Other** – wildfires, volcanoes (rare but location-dependent)

### V. Manmade Disasters – Key Examples & Planning
- Sabotage, terrorism, vandalism, theft
- Can cause power, network, water, or utility outages
- Planning: assess crime rates, consult local law enforcement

### VI. Relationship Between BC and DR
- **BC** = keeping business operations running
- **DR** = keeping IT assets (servers, networks, databases) operational to support those operations

### VII. Exam Takeaways
- Understand impacts of natural and manmade disasters relative to your organization's facility location

---

## Video V233: Disaster Recovery Strategies

**Objective:** To explain recovery strategies: resilience, fault tolerance, high availability, RAID, failover clusters, power protection, QoS, and failure states.

### I. Core Concepts

| Strategy | Description |
| :--- | :--- |
| **System Resilience** | System's ability to recover from disruption; minimizes single points of failure |
| **Fault Tolerance** | System continues operating *during* a failure (built into system) |
| **High Availability** | Uses redundant systems (servers, apps) for quick recovery over long periods |

> Resilience is the umbrella term; fault tolerance & HA are sub-types.

### II. Data Protection: RAID Levels

| RAID Level | Name | Fault Tolerance | Description |
| :--- | :--- | :--- | :--- |
| RAID-0 | Striping | ❌ No | Data split across disks; performance only |
| RAID-1 | Mirroring | ✅ Yes | Identical copies on 2 disks; resource-intensive |
| RAID-5 | Striping with parity | ✅ Yes | 3+ disks, one for parity; slower if a disk fails |
| RAID-10 | Stripe of mirrors | ✅ Yes | 4+ disks; combines striping & mirroring |

### III. Server & Network Resilience
- **Failover Cluster:** Multiple servers/nodes share workload; if one fails, others take over
- **Load Balancing:** Distributes traffic/processes across servers

### IV. Power Protection

| Solution | Duration | Notes |
| :--- | :--- | :--- |
| **UPS (Uninterruptible Power Supply)** | Short period | Battery or flywheel; needs space inside data center |
| **Generator** | Long period | Motor-driven; needs fuel & maintenance |

**Additional:** Voltage regulators, line conditioners, surge protectors

### V. Network Communications: QoS
**Quality of Service (QoS)** prioritizes critical traffic on limited-capacity networks. Handles: throughput, bandwidth, latency, jitter, errors. Requires: traffic identification → classification → device configuration.

### VI. Failure States (Critical for Firewalls & Network Devices)

| State | Behavior |
| :--- | :--- |
| **Fail open** | Defaults to allowing all access during failure (insecure) |
| **Fail safe / fail secure** | Defaults to allowing nothing; system stays secure |

> Always design devices to **fail in a secure state** (closed)

### VII. Exam Takeaways
- Know recovery methods (resilience, fault tolerance, HA)
- Know protection methods (RAID, failover clusters, power protection)
- Understand QoS and failure states (fail safe vs. fail open)

---

## Video V234: Disaster Recovery Sites

**Objective:** To explain recovery site types: cold, warm, hot, mobile, cloud, and shared sites.

### I. Purpose of a Recovery Site (Alternate Processing Site)
- Used temporarily after a disaster or major disruption at the primary site
- Focuses on **IT assets** (networks, servers, databases, etc.) supporting business functions
- Not for permanent relocation; typical duration = days

### II. Selection Criteria
- Based on **Business Impact Analysis (BIA)** results, especially **Maximum Tolerable Downtime (MTD)**
- Also considers **Recovery Time Objective (RTO)** and budget

### III. Types of Recovery Sites

| Site Type | Infrastructure / Equipment | Data | Cost | Activation Time |
| :--- | :--- | :--- | :--- | :--- |
| **Cold Site** | Empty room/warehouse; no computing equipment | None | Lowest | Days to weeks |
| **Warm Site** | Pre-configured computing equipment, basic infrastructure (HVAC, electricity, patch/baseline servers) | No operational data (only system data) | Moderate | ~12 hours |
| **Hot Site** | Full suite: computers, networks, near-real-time data, full infrastructure | Near real-time (copied daily/hourly) | Very high | Minutes to a few hours |

### IV. Other Recovery Options

| Option | Description |
| :--- | :--- |
| **Mobile Site** | Self-contained, transportable (shipping container, tractor-trailer). Typically cold or warm. |
| **Cloud-Managed Recovery Site** | Hosted on AWS, Azure, GCP, etc. Usually warm or hot. Key: SLA defines roles, availability, performance, costs (metered by VM uptime). |
| **Shared Site** | Shared with external organizations. Governed by Mutual Assistance Agreement (MAA) or reciprocal agreement. Rare due to data sensitivity. |

### V. Critical Requirement
- **Geographic isolation** from the primary site (different city/region) to avoid the same disaster impacting both sites

### VI. Exam Takeaways
- Know **purpose** of recovery sites
- Understand **what is present** at cold, warm, hot, mobile, cloud, and shared sites
- Activation time and cost are inversely related to readiness

---

## Video V235: Data Backup Strategies

**Objective:** To explain backup types (full, differential, incremental), 3-2-1 rule, electronic vaulting, and escrow arrangements.

### I. Core Purpose of Backup
- Duplicate data to retrieve it later after data loss or system failure
- Critical for disaster recovery (DR)

### II. Key Concepts
- **Mirroring:** Identical copy on ≥2 storage media (e.g., RAID)
- **Archive bit (backup bit):** `0` = backed up (no change since last backup); `1` = needs backup (file changed)

### III. Backup Types

| Type | What it does | Archive bit after backup |
| :--- | :--- | :--- |
| **Full** | Complete copy of all data | Sets all to `0` |
| **Differential** | Changes since **last full backup** | Does not reset (leaves `1`) |
| **Incremental** | Changes since **any last backup** (full/diff/inc) | Resets to `0` |

- **Full:** large, infrequent (e.g., Sundays)
- **Differential:** medium, captures everything since last full
- **Incremental:** small, frequent (e.g., daily except full/diff days)

### IV. 3-2-1 Backup Rule
- **3** copies of data
- **2** different devices/media on-premise
- **1** copy off-premise

### V. Off-Premise Backup (Electronic Vaulting)
- **Remote journaling:** logs + metadata off-site (for audit/analysis)
- **Remote mirroring:** real-time streaming of changes off-site
- Recovery needs both **journal** + backup data

### VI. Storage Media
- Disks, tapes, external drives — no mandated method (org chooses)

### VII. Snapshots
- Virtual copies of files, dirs, volumes, VMs (e.g., via hypervisor)

### VIII. Escrow Arrangements
- **Key/certificate escrow:** third-party agent stores crypto keys; recovery agent accesses
- **Software escrow:** stores source code, licenses, docs — protects if vendor fails

### IX. Exam Takeaways
- Know backup types (full, diff, inc) + archive bit behavior
- Know electronic vaulting methods
- Know escrow arrangements (key/cert, software)

---

## Video V236: Disaster Recovery Processes

**Objective:** To explain DR processes: human life priority, communication, documentation, response, personnel, assessment, restoration, lessons learned.

### I. Core Focus & Definition
- **Goal:** Ensure critical business assets and processes (IT infrastructure) remain operational after a disruption
- **Reference Standard:** NIST SP 800-34

### II. Priority Hierarchy
1.  **Human Life (Top Priority):** Safety and security of personnel overrides all technology concerns
2.  **Communication:** Essential for assessing safety and coordinating response
3.  **Technology Recovery:** Only after human safety is addressed

### III. Key Processes within the DRP

| Process | Description |
| :--- | :--- |
| **Documentation** | Assign a scribe/spokesperson as single point of contact for clear, consistent communication |
| **Training & Awareness** | Ensure team members know roles, responsibilities, first aid, fire suppression, crisis management |
| **Response** | Define procedures based on disaster type. Activate BCP if RTO/RPO cannot be met. |
| **Personnel** | Define roles, responsibilities, response times, and **primary/alternate (backup)** personnel for each role |
| **Communications** | Use a single recognizable voice; maintain a contact information table |
| **Assessment** | Investigate disruption extent, impact on tolerance levels (RTO/RPO), sales, reputation, contracts, legal/regulatory compliance |
| **Restoration** | Move operations back to the **original primary location** (vs. recovery = bringing systems back to normal at any site). Restore **least critical functions first**. |
| **Lessons Learned** | Evaluate personnel performance, team speed, tolerance impacts, communication effectiveness. Identify corrective actions. |

### IV. Key Exam Takeaways
- **BCP vs. DRP:** BCP identifies critical business functions; DRP is a subset focused on **recovering the technology infrastructure**
- **Top Priority:** Always choose human life first in any exam question
- **Recovery vs. Restoration:**
  - *Recovery* = bringing systems back to normal condition (possibly at alternate site)
  - *Restoration* = returning systems to original state at primary location

---

## Video V237: Disaster Recovery Testing

**Objective:** To explain DR test types: read-through, walkthrough, simulation, parallel, and full interruption.

### I. Context & Key Definitions
- **Disaster Recovery (DR)** → Ensures critical *technological* assets/processes stay operational
- **Business Continuity (BC)** → Focuses on *critical business functions*
- **Key Reference:** NIST SP 800-84

### II. Disaster Recovery Tests (in order of increasing complexity/impact)

| Test | Description | Production Impact? |
| :--- | :--- | :--- |
| **Read-through test** (checklist test) | Review DRP, redline updates, agree on roles/responsibilities | ❌ No |
| **Walkthrough test** (tabletop) | Structured meeting, rehearse procedures, coordinate scenarios (fire, flood, cyber, etc.) | ❌ No |
| **Simulation test** (preparedness test) | Role-play realistic conditions on-prem (evacuation drills, system activation). No relocation. | ❌ No |
| **Parallel test** | Activate recovery site using DRP; primary site runs normal ops. Tests external services/SLAs. | ❌ No |
| **Full interruption test** | Simulate disaster, migrate primary operations to recovery site. Requires senior management approval. Conducted off-peak hours. | ✅ **Yes** |

### III. Post-Testing Actions
- Redline and update BCP/DRP
- Put through **Configuration Management (CM)** process
- Continuous monitoring: changes in processes, personnel, regulations → trigger plan review
- Ensure DRP supports BCP (target correct servers, apps, etc.)

### IV. Exam Key Takeaway
- Only the **full interruption test** impacts production/operations
- All other tests are designed to avoid disruption

---

## Session 31 Summary

Session 31 covers the **complete business continuity and disaster recovery landscape** for the CISSP exam (Objectives 1.7, 7.10, 7.11, 7.12, 7.13). Key takeaways include:

1. **Business Continuity Planning (V230):** NIST SP 800-34 seven steps: Policy → BIA → Preventive Controls → Contingency Strategies → Plan Documentation → Testing/Training → Maintenance. Policy first; testing before approval.

2. **Business Impact Analysis (V231):** MTD (max tolerable downtime), RTO (recovery time objective), RPO (recovery point objective), WRT (work recovery time). RTO + WRT ≤ MTD. Executive approval required.

3. **Disaster Recovery Planning (V232):** Natural disasters (earthquakes, floods – floodplain probabilities: 100-year = 1% annual chance) vs. manmade disasters (sabotage, terrorism). BC = business operations; DR = IT assets.

4. **Disaster Recovery Strategies (V233):** Resilience, fault tolerance, high availability. RAID levels (0,1,5,10). Failover clusters, load balancing. Power: UPS (short-term), generator (long-term). QoS for network prioritization. Fail safe/secure (deny all) vs. fail open (allow all).

5. **Disaster Recovery Sites (V234):** Cold (empty, days to weeks), Warm (pre-configured, ~12 hours), Hot (full suite, minutes to hours). Mobile, cloud-managed (SLA, metered costs), shared (MAA). Geographic isolation critical.

6. **Data Backup Strategies (V235):** Full (all data), Differential (changes since last full), Incremental (changes since any last backup). 3-2-1 rule: 3 copies, 2 media types, 1 off-site. Electronic vaulting (remote journaling, remote mirroring). Escrow for keys/certificates and software.

7. **Disaster Recovery Processes (V236):** Human life top priority. Scribe for communication. Recovery (back to normal at alternate site) vs. Restoration (back to original state at primary site). Restore least critical functions first.

8. **Disaster Recovery Testing (V237):** Read-through (review), Walkthrough/tabletop (rehearse), Simulation (on-prem role-play), Parallel (activate recovery site, no ops impact), Full interruption (migrate operations, impacts production). Only full interruption impacts production.

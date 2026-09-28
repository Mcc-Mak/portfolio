# Session 21: Disaster Recovery

## V200 - Section Outline
- **Disaster Recovery (DR)** : Strategic security planning model to recover access to software, data, or hardware after a disaster.
- **Goal**: Minimize downtime and data loss; maximize recovery speed.
- **Course Objective**: 3.3 – Explain disaster recovery concepts.
- **Topics Covered**:
  - High availability approaches (active-active, active-passive, load balancers, CDNs).
  - Redundant network design.
  - DR metrics (MTBF, MTTR, RPO, RTO).
  - Redundant site types (cold, warm, hot, mobile, virtual).
  - Training & exercises (tabletop, penetration testing, red/blue/white teams).

## V201 - High Availability Approaches
- **Active-Active**: Multiple systems run simultaneously, share load. If one fails, others continue (reduced throughput but seamless).
- **Active-Passive**: Standby system idle until primary fails → then takes over. Less resource-efficient but reliable fallback.
- **Load Balancers**: Distribute traffic across multiple servers; monitor health; reroute from failed nodes.
- **CDNs (Content Delivery Networks)** : Geographically distributed servers; cache content closer to users; reroute on failure/high traffic.

## V202 - Designing Redundant Networks
- **Where to add redundancy**: Module/parts (multiple power supplies, NICs, hard drives) vs. Chassis (entire extra routers, switches).
- **Software Redundancy**: Virtual switches/routers, software RAID, protocol choice (TCP resends packets → more redundancy than UDP).
- **Infrastructure & Environmental Redundancy**: Power (redundant PSUs, UPS, generators), Cooling (multiple AC units), Space.
- **Key Takeaway**: Design redundancy early. Retrofitting costs more time and money.

## V203 - Disaster Recovery Metrics
- **MTBF (Mean Time Between Failures)** : Average time between failures. **Higher** is better.
- **MTTR (Mean Time to Repair)** : Average time to repair a failed device. **Lower** is better.
- **MTD (Maximum Tolerable Downtime)** : Longest inoperable period without irrevocable business failure.
- **RTO (Recovery Time Objective)** : Time after an event to resume normal operations.
- **RPO (Recovery Point Objective)** : Longest tolerable period of lost/unrecoverable data (e.g., backup every 6 hours → 6 hours of potential data loss).

## V204 - Redundant Site Types
- **Hot Site**: Fully operational 24/7. Instant / near-zero downtime. Very high cost.
- **Warm Site**: Partially ready (building, power, phones, network; missing computers/phones). Recovery in few days. Lower cost.
- **Cold Site**: Minimal facilities (empty building). Recovery in 1–2 months. Cheapest.
- **Mobile Site**: Portable & configurable (trailers/tents). Recovery in hours to days.
- **Virtual Site (Cloud-based)** : Virtual hot/warm/cold sites. Advantages: scalability, cost-effectiveness, easy maintenance.
- **Platform Diversity**: Using different OS, network equipment, or cloud providers across primary and redundant sites to avoid single point of failure.

## V205 - Training & Exercises
- **Tabletop Exercises**: Simulated emergency/security event discussions. Simple to set up, but theoretical. Warning: “Magic Wand” problem (solving unrealistically fast).
- **Penetration Testing**: Active use of tools to simulate an attack. Must be properly scoped. Prefer third-party or separate internal red team (avoid system admins testing their own systems).
- **Red Team**: Hostile/attacking team.
- **Blue Team**: Defensive team (sysadmins, network defenders, cybersecurity analysts).
- **White Team**: Administers, evaluates, supervises; builds simulated networks; acts as referees.
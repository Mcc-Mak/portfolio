# Session 20: Documentation and Processes

## V191 - Section Outline
- **Policies**: Administrative controls, part of IT governance.
- **Documentation Hierarchy** (generic to specific): Policies → Standards → Baselines → Guidelines → Procedures.
- **Course Objective**: 3.1 – Explain the purpose of organizational processes and procedures.
- **Topics Covered**:
  - Common documentation (physical/logical diagrams, wiring diagrams, site survey reports, audit/assessment reports, baseline configurations).
  - Asset management (inventories, database systems, asset tags, procurement lifecycle, warranty/licensing).
  - IP address management (IPAM).
  - Common agreements (NDA, MOU, SLA).
  - Product lifecycle (EOL, EOS).
  - Change management.
  - Configuration management.
  - Patch management.

## V192 - Common Documentation
- **Physical Network Diagrams**: Show actual physical arrangement (floor plans, rack diagrams, MDF/IDF layouts).
- **Logical Network Diagrams**: Illustrate data flow (subnets, routing protocols, traffic flow, network segments). Use standard symbols (Cisco notation).
- **Wiring Diagrams**: Show which cable connects to which port.
- **Site Survey Reports**: Wireless/RF site survey (heatmaps), wired site survey (power, space, cooling).
- **Audit & Assessment Reports**: Executive summary, scope, methods, findings/recommendations.
- **Baseline Configurations**: Most stable, formally reviewed device configuration versions. Changes only through change control.

## V193 - Asset Management
- **Definition**: Systematic approach to governing and realizing value from assets over their entire lifecycle.
- **Asset Inventory & Tracking**: Database systems, asset tags (barcode or RFID), unique asset ID.
- **Procurement Lifecycle**: Change request → Procurement → Deployment → Maintenance (Operations) → Disposal.
- **Warranty & Licensing**: Track warranties and software licenses per asset.
- **Assigned Users**: Document which user is assigned to which asset (especially portable assets like laptops, tablets, phones).

## V194 - IP Address Management (IPAM)
- **Definition**: Methodology and suite of tools for planning, tracking, and managing IP address space.
- **Functions**: Conflict resolution (detects/resolves duplicate IPs), integration with DHCP/DNS, reporting.
- **Security Role**: Tracks which devices are allowed to connect; helps identify unauthorized devices.

## V195 - Common Agreements (NDA, MOU, SLA)
- **NDA (Non-Disclosure Agreement)** : Legally binding. Defines confidential data that cannot be shared.
- **MOU (Memorandum of Understanding)** : Non-binding agreement (“formalized handshake”). Outlines common actions or intentions.
- **SLA (Service-Level Agreement)** : Legally binding. Defines quality, availability, responsibilities, guarantees, warranties (e.g., uptime percentage).

## V196 - Product Lifecycle (EOL, EOS)
- **Mainstream Support**: Minimum 5 years for every Windows version.
- **Extended Support**: Additional 3–5+ years for some products.
- **End of Life (EOL)** : No mainstream or extended support → no more bug fixes or security patches → legacy OS.
- **End of Support (EOS)** : Last date manufacturer provides support/patches.

## V197 - Change Management
- **Definition**: Orchestrated strategy to transition organizations from current to desired future state.
- **Change Advisory Board (CAB)** : Evaluates viability, impacts, alignment with organizational objectives.
- **Change Owner**: Individual or team responsible for initiating change request.
- **Stakeholders**: Any person with a vested interest in the change (technical, business, end-users).
- **Impact Analysis**: Performed before implementation (what could go wrong? immediate/long-term effects?).

## V198 - Configuration Management
- **Goal**: Maintain up-to-date documentation of network configuration.
- **Supporting Procedures**: Asset management, baselining, cable management, network documentation.
- **Baselining**: Collect data under normal conditions → baseline. Compare “normal” vs “current” to identify issues.
- **Cable Management**: Document entire cable infrastructure (diagrams, labels, punch‑down blocks, sources/destinations). Use standard naming conventions.
- **Network Documentation**: Must be updated after every change. Includes diagrams, policies, vendor contacts, SOPs.

## V199 - Patch Management
- **Definition**: Planning, testing, implementing, and auditing of software patches.
- **Benefits**: Security (fixes known vulnerabilities), uptime, compliance, feature improvements.
- **Four Critical Steps**:
  1. **Planning**: Create policies, procedures, tracking systems.
  2. **Testing**: Test patches before full deployment (use patch rings – small groups progressively).
  3. **Implementation**: Deploy manually (small networks) or automatically via tools like SCCM.
  4. **Auditing**: Scan network to verify patch installation.
- **Firmware Management**: Update firmware on network devices (routers, switches, firewalls) to fix vulnerabilities.
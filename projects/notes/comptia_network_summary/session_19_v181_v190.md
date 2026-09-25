# Session 19: Orchestration and Automation

## V181 - Section Outline
- **Why Automation & Orchestration**: Increasing complexity and scale of networks. Reduce human error, speed up repetitive tasks.
- **Course Objective**: 1.8 – Summarize evolving use cases for modern network environments.
- **Topics Covered**:
  - Infrastructure as Code (IaC).
  - When to automate/orchestrate.
  - Benefits.
  - Playbooks.
  - Upgrades & compliance.
  - Network inventory automation.
  - Integrations & APIs.
  - Source control (Git).

## V182 - Infrastructure as Code (IaC)
- **Definition**: Managing and provisioning infrastructure via code, not manual processes.
- **Key Implementation Areas**: Scripting, security templates, policies.
- **Warning**: “Special Snowflake” systems – any system deviating from standard IaC configuration template. Adds risk, configuration problems, long-term supportability issues.

## V183 - When to Automate & Orchestrate
- **Considerations**: Complexity, cost, single points of failure, technical debt, ongoing supportability.
- **Good candidates**: Repeatable, stable processes.
- **Poor candidates**: One-off, highly variable, or frequently changing tasks.
- **Technical Debt**: Future cost/complexity from suboptimal or outdated automation code. Mitigate with regular reviews and refactoring.

## V184 - Benefits of Automation & Orchestration
1. **Increased Efficiency & Time Savings**: Reduces manual, repetitive tasks.
2. **Enforcement of Baselines**: Enforces security/compliance consistently.
3. **Standard Infrastructure Configurations**: Maintains consistent system setup.
4. **Secure Scaling**: Dynamically scales resources while maintaining security.
5. **Increased Employee Retention**: Automates mundane tasks → employees focus on strategic work.
6. **Faster Reaction Times**: Enables rapid incident response (systems never distracted/tired).
7. **Workforce Multiplier**: Smaller team can manage larger/complex infrastructure.

## V185 - Incident Response Playbooks & Runbooks
- **Playbook**: Checklist of actions to detect/respond to a specific incident type (e.g., DDoS, virus, worm, phishing, data exfiltration).
- **SOAR (Security Orchestration, Automation, and Response)** : Security tools that automate incident response, threat hunting, and data enrichment.
- **Runbook**: Automated version of a playbook (partial or full automation).
- **Common Playbook Types**:
  - **Ransomware**: Isolate networks (don’t power off – preserve RAM for encryption keys).
  - **Data Exfiltration**: Stop/mitigate exfiltration; forensic analysis; protect data stores first.
  - **Social Engineering (Phishing)** : Identify emails & affected users; reset passwords, re-image workstations; sandbox analysis for IOCs.

## V186 - Upgrades & Compliance via Automation
- **Role of Automation in Network Upgrades**: Streamlining, version control & consistency, automated testing & validation.
- **Role of Automation in Compliance**: Continuous monitoring, policy enforcement, audit evidence gathering.
- **Use Cases**: Automated patch management, continuous compliance monitoring (tools like Chef, Puppet, DNA Center).

## V187 - Automating Network Inventories
- **Dynamic Inventories**: Real-time, auto-updating repositories of network assets (devices, users, software, licenses).
- **Benefits**: Real-time updates, integration with management tools (Ansible, Chef, Puppet), reduces human error.
- **Tools**: Nmap (Network Mapping) for IP/port scans; visualization tools (Zenmap, SolarWinds Network Topology Mapper).
- **Security & Compliance**: Supports frameworks like PCI DSS; enables automated responses (e.g., quarantine unauthorized devices).

## V188 - Integrations & APIs
- **Integration**: Combining subsystems/components into one cohesive system.
- **API (Application Programming Interface)** : Rules/protocols for building and integrating software. Enables one product/service to communicate with another.
- **REST vs. SOAP**:
  - **REST**: Architectural style, uses HTTP, stateless, lightweight, typically uses JSON.
  - **SOAP**: Strict protocol, XML messages, more robust (higher security, transaction compliance).
- **Real-world examples**: Integrating Udemy Q&A with Freshdesk ticketing system via APIs; integrating third-party labs into learning platform.

## V189 - Git & Source Control
- **Git**: Most widely used modern version control system.
- **Key Commands**: `config`, `init`, `clone`, `add`, `commit`, `status`, `branch`, `merge`, `pull`, `push`, `log`, `checkout`.
- **Workflow**: Configure global settings → create directory → initialize Git repo → add files → commit with message.
- **Branching**: Create a branch to work on new features/fixes without affecting the master branch; merge back when done.
- **`.gitignore`**: Lists files to exclude from commits.

## V190 - Git Demonstration
- Demonstrates basic Git commands on a Linux/macOS system: `git config`, `git init`, `git add`, `git commit`, `git status`, `git log`.
- Shows how to track changes to a file (`test.txt`) and view commit history.
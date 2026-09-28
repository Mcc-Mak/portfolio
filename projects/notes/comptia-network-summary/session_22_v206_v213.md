# Session 22: Troubleshooting Methodology

## V206 - Section Outline
- **Focus**: What to do when things break – the official **CompTIA seven-step troubleshooting methodology**.
- **Course Objective**: 5.1 – Explain the troubleshooting methodology.
- **The Seven Steps**:
  1. Identify the problem.
  2. Establish a theory of probable cause.
  3. Test the theory to determine the cause.
  4. Establish a plan of action to resolve the problem and identify potential effects.
  5. Implement the solution or escalate as necessary.
  6. Verify full system functionality and (if applicable) implement preventative measures.
  7. Document findings, actions, outcomes, and lessons learned.

## V207 - Step 1: Identify the Problem
- **Key Activities**: Gather information from the user, identify user changes, perform backups before making changes, inquire about environmental/infrastructure changes.
- **Questioning the User**: What happened? Any error messages? Is anyone else having the same issue? How long has this been happening? Has anything changed? What have you already tried?

## V208 - Step 2: Establish a Theory of Probable Cause
- **Goal**: Guess the problem based on observed symptoms. Question the obvious first.
- **Approaches**:
  - **Top to Bottom (OSI model)** : Start at Layer 7, work down to Layer 1.
  - **Bottom Up**: Start at Layer 1, work up to Layer 7.
  - **Divide and Conquer**: Start at middle layer (e.g., ping 8.8.8.8 to test Layers 1-4).
- **Research**: External (Google, Downdetector), internal (system logs, diagnostic tools), physical inspection (listen, smell).

## V209 - Step 3: Test the Theory to Determine the Cause
- **If confirmed** → Determine next steps to resolve.
- **If not confirmed** → Re-establish a new theory or escalate.
- **Four Possible Outcomes**:
  1. Theory confirmed → fix.
  2. Theory not confirmed → new theory.
  3. Cause identified but cannot fix (lack of authority/skills, security issues) → escalate.
  4. Stuck (no theory works) → escalate to higher support tier.

## V210 - Steps 4 & 5: Plan of Action & Implementation
- **Three main approaches**: Repair, Replace, or Workaround.
- **Plan of Action**: Determine resources, time, cost, impact on other users/systems. Seek authorization if needed.
- **Implement the Solution**: Execute the plan exactly as outlined and approved. If the plan must change, re‑obtain authorization.

## V211 - Step 6: Verify Full System Functionality
- **Verification Actions**:
  - Check the specific fix (e.g., new power supply delivers correct voltages).
  - Inspect for collateral issues (accidentally disconnected cables).
  - Confirm disabled/uninstalled items stay off after reboot.
  - Review logs & diagnostic tools.
  - Check updates (software/drivers have latest security fixes).
- **Implement Preventative Measures**: Address root causes at policy or behavior level (e.g., require lidded cups to prevent spills on keyboards).

## V212 - Step 7: Document Findings, Actions, Outcomes
- **Documentation Tools**: Trouble ticketing system (e.g., Freshdesk, Jira), internal knowledge base, FAQ section.
- **Benefits**: Trend analysis, justifying resources, onboarding new technicians, continuous improvement.
- **Don’t wait until the end** – update throughout the process.

## V213 - Troubleshooting Example (Walkthrough)
- Walks through all 7 steps with a realistic scenario: intermittent network connectivity.
- Demonstrates iterating through theories (faulty router → overloaded bandwidth → IP conflict) until the cause is found (DHCP server misconfiguration).
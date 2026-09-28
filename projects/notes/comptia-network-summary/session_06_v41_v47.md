# Session 6: Distribution Systems

## V41 - Section Outline
- **Cable Distribution System**: A structured layout and organization of network media within a building to ensure efficient and reliable data communication.
- **Components**: Cables, wall jacks, patch panels, main distribution frames (MDF), intermediate distribution frames (IDF).
- **Course Alignment**: Domain 2 (Network Implementation) – Objective 2.4 (physical installations); Domain 5 (Network Troubleshooting) – Objective 5.5 (tools/protocols).
- **Lesson Sequence**:
  1. Overview of component parts.
  2. Wiring demonstration (running cables, connecting to patch panels and wall jacks).
  3. Testing with a toner probe (fox and hound).
  4. Power distribution (PDU, UPS, line conditioners, generators).
  5. HVAC (temperature and humidity management).
  6. Fire suppression systems.
  7. Quiz.

## V42 - Cable Distribution Systems Components
- **Demarcation point**: Where ISP responsibility ends and organization’s network begins.
- **Main Distribution Frame (MDF)**: Main starting point for interior cabling; contains main router & backbone switch.
- **Intermediate Distribution Frame (IDF)**: Smaller distribution points connected to MDF; serve nearby offices/workstations.
- **Racks**: 2-post (light equipment), 4-post (heavy equipment), wall-mounted (space saving), rack enclosure (secure cabinet).
- **Patch panel (copper)**: Uses 110 punchdown block; organizes connections; protects expensive switches.
- **Fiber distribution panel**: Uses fiber connectors (SC, LC, ST, MTRJ); can act as coupler or converter.
- **Cable trays**: Rigid structural system to support cables horizontally.
- **Vertical cross-connect**: For running trunk cables between floors.

## V43 - Wiring a Network (Demonstration)
- Demonstrates how to punch down cables onto a 110-block patch panel and a keystone wall jack using a punchdown tool.
- Shows the final product in a server rack: patch panel connected to switch via short patch cables.
- **Why use a patch panel?** Protects expensive switch ports (cheap to replace), provides flexibility for moves/adds/changes.

## V44 - Testing Cables (Toner Probe / Fox and Hound)
- **Toner probe (fox and hound)**: A tool used to trace cables.
- **How it works**: Connect the sender (fox) to a network jack. Use the probe (hound) to touch cables at the patch panel; it emits an audible tone when it finds the matching cable.
- **Use cases**: Identifying unlabeled cables, finding breaks in wires, documenting the network.

## V45 - Power Distribution Systems
- **Key Components**:
  - **UPS (Uninterruptible Power Supply)**: Provides emergency power during main power failure; offers line conditioning, surge/spike protection. Short duration (15–30 min).
  - **PDU (Power Distribution Unit)**: Distributes electric power to multiple devices; advanced power strip with monitoring/control.
  - **Generator**: Provides long-term power during regional outages. Slow startup (60–90 sec); must pair with UPS.
- **Power Load Management**: Calculate impact before adding new equipment; balance loads across racks.
- **Voltage Considerations**: 120V (US) vs. 230V (Europe). Dual-voltage devices are common.

## V46 - HVAC (Heating, Ventilation, and Air Conditioning)
- **Importance**: More critical for hardware than for humans. Prevents premature failure.
- **Three Key Considerations**:
  - **Temperature Control**: Recommended range 68–77°F (20–25°C).
  - **Humidity Levels**: Recommended range 40–60% relative humidity.
  - **Airflow Management**: Hot aisle / cold aisle configuration (port-side exhaust and intake). Maximizes cooling efficiency, prevents mixing of hot/cold air.
- **Best practices**: Raised-floor systems, ceiling plenums for hot air return.

## V47 - Fire Suppression Systems
- **Wet pipe systems**: Pipes always contain water. Risk of accidental leaks → water damage to equipment. Avoid in data centers.
- **Pre-action systems**: Requires both detector actuation AND sprinkler trip before water releases. Minimizes accidental release risk, but water is still not ideal.
- **Special suppression systems (Recommended)**: Uses a **clean agent** (halocarbon or inert gas) to displace oxygen. Requires alarm and supplemental oxygen for personnel safety. Prevents water damage.
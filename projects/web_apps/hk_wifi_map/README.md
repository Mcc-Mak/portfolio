# WiFi Distribution in HK

A web application that visualises Hong Kong Wi-Fi hotspot locations on an
interactive map and in filterable data tables. Displays both **fixed** (permanent)
and **non-fixed** (temporary/mobile) Wi-Fi access points across HK districts,
sourced from government open data.

## Tech Stack

| Category | Technologies |
|:---------|:-------------|
| Languages | `HTML`, `CSS`, `JavaScript` |
| Libraries | `jQuery`, `Bootstrap` 5, `Tabulator` (data tables), `Leaflet` (interactive maps), `Font Awesome` |
| Data | `JSON` datasets of HK Wi-Fi locations (fixed + non-fixed) |
| Architecture | Single-page static site (no build step) |

## Features

- **Interactive Leaflet map** — toggle show/hide, geolocates each Wi-Fi hotspot
- **Dual data tables** — separate views for fixed and non-fixed hotspots
- **Regex filtering** — filter fixed hotspot table by any column with regex patterns
- **Header dropdown filters** — multiselect filters for SSID, venue type, location name, area, and district
- **Bilingual support** — English and Traditional Chinese data fields
- **Auto-update mechanism** — `auto_upload.bat` script for automated deployment of refreshed data

## Project Structure

```
wifi/
├── index.html                        # Main page — map, tables, filter UI
├── index.css                         # Custom styling
├── index.js                          # Core application logic (349 lines)
├── fixed-wi-fi-hk-locations.json     # Fixed Wi-Fi hotspot data (~6 MB)
├── non-fixed-wi-fi-hk-locations.json # Non-fixed Wi-Fi hotspot data
├── auto_upload.bat                   # Automated upload/deployment script
├── modified_datetime.log            # Last data update timestamp
├── lib/                             # Vendored libraries
│   ├── jquery.js
│   ├── bootstrap/
│   ├── tabulator/
│   ├── leaflet/
│   └── font-awesome.min.css
└── statics/img/                      # UI assets (wifi icon)
```

## Getting Started

No build step required — open `index.html` in a browser:

```bash
# Clone
git clone https://github.com/Mcc-Mak/wifi.git
cd wifi

# Open in browser
open index.html        # macOS
xdg-open index.html    # Linux
start index.html       # Windows
```

> The application loads ~6 MB of JSON data; allow a few seconds for
> initialisation.

## Data Sources

The JSON datasets contain Hong Kong government Wi-Fi location data including:
- SSID, venue type, location name (EN/TC)
- Area and district (EN/TC)
- Geographic coordinates (latitude/longitude)
- Organisation code, location ID

## Repository

[GitHub: Mcc-Mak/wifi](https://github.com/Mcc-Mak/wifi)

---

## Coding Standards

### Naming Conventions

- **Files and directories:** `snake_case` ASCII (`[a-z0-9_.]` charset — no
  uppercase, hyphens, spaces, or parentheses).
- **JavaScript variables:** `camelCase` for locals; `UPPER_SNAKE_CASE` for
  constants (e.g. `MAX_NO_OF_WIFI_FIXED_SELECTION`).
- **Functions:** `camelCase` (e.g. `initialize`, `refreshHeaderFilter`).
- **CSS classes:** `kebab-case` (e.g. `btn-primary`, `input-group-text`).
- **JSON data field names:** PascalCase as sourced from government open data
  (e.g. `LocationNameEN`, `VenueTypeTC`) — preserved for compatibility.

### JavaScript

- Use `const` by default; `let` only when reassignment is required. Never use
  `var`.
- Terminate all statements with semicolons.
- Use `===` / `!==` for strict equality comparisons.
- Remove dead code: no commented-out blocks left in production files.
- Remove `console.log` statements from production code.
- Do not register event handlers for elements that do not exist in the DOM.

### Security

- Never embed GitHub tokens or other credentials in scripts. Use `git push
  origin <branch>` with a credential helper or `gh auth` instead.

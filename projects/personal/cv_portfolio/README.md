# Mak Chun Chi - CV & Professional Portfolio

[![GitHub Pages](https://img.shields.io/badge/GitHub%20Pages-Live-blue?logo=github)](https://mcc-mak.github.io/cv/)
[![PDF](https://img.shields.io/badge/Resume-PDF-red?logo=adobeacrobatreader)](https://mcc-mak.github.io/cv/cv.pdf)

Personal CV website and professional certifications portfolio hosted on GitHub Pages.

## Tech Stack

| Category | Technologies |
|:---------|:-------------|
| Languages | `HTML`, `CSS`, `JavaScript` |
| Hosting | `GitHub Pages` (served from `docs/` folder) |
| Assets | `PDF` resume, certificate PDFs, qualification PDFs |

## Features

- **Online CV** — professional experience, skills, education, and contact info
- **PDF resume** — downloadable CV in PDF format
- **Certificates gallery** — industry certifications (CompTIA Network+ CE, ISC2 CISSP)
- **Academic qualifications** — HKPU Bachelor's and Higher Diploma in Electrical Engineering
- **No build step** — static HTML/CSS served directly by GitHub Pages

## Project Structure

```
cv-public/
├── README.md                           # Project documentation
└── docs/                               # GitHub Pages root
    ├── index.html                      # Main CV webpage
    ├── cv.pdf                          # Resume (PDF format)
    ├── certificates/                   # Professional certifications
    │   ├── comptia_network_plus_ce_certificate.pdf
    │   ├── uc_59e84faa_8d3c_4222_8198_85ee7003e381.pdf
    │   └── uc_bc505936_ef73_4e40_8ed6_102235f1dce9.pdf
    └── qualifications/                 # Academic qualifications
        ├── hkpu_bachelor_electrical_engineering.pdf
        └── hkpu_higher_diploma_electrical_engineering.pdf
```

## Live Access

| Resource | Web Viewer | Direct Download |
|:---------|:-----------|:----------------|
| **CV / Resume** | [View Online](https://mcc-mak.github.io/cv/) | [Download PDF](https://mcc-mak.github.io/cv/cv.pdf) |

## GitHub Pages Configuration

This repository is configured to publish from the `docs/` folder at the root level:

| Path | Access URL |
|:-----|:------------|
| `docs/index.html` | https://mcc-mak.github.io/cv/ |
| `docs/cv.pdf` | https://mcc-mak.github.io/cv/cv.pdf |
| `docs/certificates/*.pdf` | https://mcc-mak.github.io/cv/certificates/*.pdf |
| `docs/qualifications/*.pdf` | https://mcc-mak.github.io/cv/qualifications/*.pdf |

## Content Overview

- **Main CV Page** - Professional experience, skills, and contact information
- **Certificates Gallery** - Industry certifications (CompTIA Network+ CE, etc.)
- **Qualifications** - Academic credentials from HKPU (Bachelor's & Higher Diploma in Electrical Engineering)

## Local Development

To preview locally:

```bash
# Clone the repository
git clone https://github.com/mcc-mak/cv.git

# Navigate to docs folder
cd cv/docs

# Start a local server (Python 3)
python -m http.server 8000

# Or with Python 2
python -m SimpleHTTPServer 8000

# Open in browser
open http://localhost:8000
```

## License

All content is © Mcc Mak. All rights reserved.

---

**Last Updated:** 2026

*Built with HTML/CSS • Hosted on GitHub Pages*

## Coding Standards

### File Naming

- Directories and files use `snake_case` ASCII (`[a-z0-9_.]` charset)
- No spaces, hyphens, uppercase letters, or special characters in path names
- Certificate PDFs: descriptive snake_case (e.g., `comptia_network_plus_ce_certificate.pdf`)
- Qualification PDFs: `institution_degree_field.pdf` (e.g., `hkpu_bachelor_electrical_engineering.pdf`)

### HTML/CSS

- 4-space indentation throughout (no tabs)
- HTML attributes use double quotes
- `href` links to local assets use relative paths (not absolute URLs)
- CSS classes use `kebab-case` (e.g., `resume-card`, `contact-info`)
- Inline styles avoided; styles defined in document `<head>`

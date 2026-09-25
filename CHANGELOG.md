# Changelog

All notable changes to this portfolio root repository are documented here.
Format follows [Keep a Changelog](https://keepachangelog.com/), versioning
follows [Semantic Versioning](https://semver.org/).

## [0.7.0] - 2026-09-25

### Changed
- `.gitignore`: un-ignored `projects/` — sub-projects are no longer nested
  git repos (`.git/` removed); all project source now tracked by root repo
- All 31 sub-projects added to root repo tracking (one commit per project)

## [0.6.0] - 2026-09-25

### Changed
- README toctree split: `Unit` column now shows plain name; new `Local · GitHub`
  column holds two separate links (`[local](path) · [GitHub](url)`) — replaces
  the previous single-cell `[\`name\`](link) · [repo](url)` format
- Merged Education + Certifications into a single table with headers
  `|Qualification|Institution|Period|Certificate|` (education rows show `—`
  for Certificate; cert rows parse institution from issuer)
- Backtick-quoted all technology names throughout README top sections (bio,
  core competencies, employment, key achievements) — not just tech stack tables
- Projects intro updated to explain new `Local` / `GitHub` link convention

### Added
- Legend section at end of README with two subsections:
  - Abbreviations table (BEng, CI/CD, CISSP, CompTIA, DevSecOps, HKO, ISC2,
    JSP, LAMP, MCP, MERN, MVC, PolyU, REST, SDLC, SMTP)
  - Toctree Tags tables explaining all Field, Industry, and Role hashtags

### Fixed
- Toctree links for 5 projects that now have README.md: `rpg`, `sudoku`,
  `booking_appointment_system`, `secure_web_template`, `springboot_mvc_template`
  — local links updated from dir path to `README.md` path

## [0.5.0] - 2026-09-25

### Changed
- README toctree reformatted: Stack column now uses hashtag format
  (`#html #css #javascript`), Field/Industry/Role tags use hashtag format with
  `<br/>` separators (`· Field: #game-dev<br/>· Industry: #—<br/>· Role: #developer`),
  Year column reads `in YYYY` (all projects have same creation/update year),
  Description column converted to imperative mood
- Renamed local directory `projects/games/anonymous_chessboard` →
  `projects/games/chessboard` (GitHub repo name unchanged)
- Fixed README filename casing across all projects: `Readme.md` → `README.md`
  (3 files), `Readme.txt`/`ReadMe.txt` → `README.md` (2 files)

### Updated
- 5 pilot READMEs: backtick-quoted all technology names in tech stack tables
- `projects/devops/application_proxy_server/README.md`: replaced ASCII
  architecture diagram with Mermaid `graph TB` block

## [0.4.0] - 2026-09-25

### Changed
- README toctree now uses dual links: project name → internal README path,
  `repo` → GitHub repository (some repos are private, so internal links ensure
  the portfolio is self-presentable)
- Updated "Projects" section intro to explain dual-link convention

### Added
- Pilot batch of 5 enhanced sub-project READMEs (template for remaining 26):
  - `projects/games/chessboard/README.md` — rewritten from HTML to
    Markdown with tech stack, features, project structure, getting started
  - `projects/web_apps/wifi/README.md` — created from scratch (was 1-line stub);
    renamed `Readme.md` → `README.md` for consistency
  - `projects/ai/crew_ai_orchestrator_mcp/README.md` — added tech stack, features,
    project structure sections (existing content preserved; AGENTS.md constraints
    respected)
  - `projects/devops/application_proxy_server/README.md` — added overview,
    architecture diagram, tech stack, features, project structure (existing
    CI/CD pipeline section preserved)
  - `projects/personal/cv/README.md` — added tech stack table and features section

## [0.3.0] - 2026-09-25

### Changed
- Moved all 31 projects from flat top-level dirs into `projects/<type>/<unit>/`
  umbrella structure (7 type groups: games, web_apps, templates, ai, devops,
  notes, personal)
- Simplified `.gitignore` to ignore `projects/` (covers all nested repos) and
  `blog/node_modules/` — removed stale individual top-level dir entries
- Updated `AGENTS.md` per-project paths to new `projects/<type>/<slug>/`
  locations; corrected outdated root-tracked-file list and task status

### Added
- `cv` project entry in README toctree (Personal section) — was previously
  omitted (count corrected from 30 to 31)

### Removed
- Premature `.github/workflows/` scaffold (gated — not yet greenlit by owner)

## [0.2.0] - 2026-09-25

### Added
- README restructured into a portfolio page absorbing CV content (professional
  summary, core competencies, education, certifications, employment history,
  key achievements, academic projects) plus a toctree indexing 30 projects
  grouped by 7 types (games, web_apps, templates, ai, devops, notes,
  personal) with field/industry/role tags and creation/latest-update years
- `.gitignore` for nested project repos and blog build artifacts
- `CHANGELOG.md`
- `AGENTS.md` (portfolio workspace guidance for OpenCode sessions)

### Changed
- Renamed all 30 project directories from mixed-case/hyphenated names to
  snake_case slugs compliant with the naming charset (GitHub repo names
  unchanged)

## [0.1.0] - 2026-09-25

### Added
- `README.md` and `LICENSE` (initial commit)

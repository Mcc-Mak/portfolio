# Changelog

All notable changes to this portfolio root repository are documented here.
Format follows [Keep a Changelog](https://keepachangelog.com/), versioning
follows [Semantic Versioning](https://semver.org/).

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

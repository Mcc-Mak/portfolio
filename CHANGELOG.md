# Changelog

All notable changes to this portfolio root repository are documented here.
Format follows [Keep a Changelog](https://keepachangelog.com/), versioning
follows [Semantic Versioning](https://semver.org/).

## [1.0.0] - 2026-09-28

### Changed — breaking: 18 directory renames + new `tools` type + two-axis taxonomy

- **18 project directories renamed** to descriptive `snake_case` identifiers
  (breaking: path changes). GitHub repo names are unchanged — renames are local
  only. Renamed units span all 8 categories:
  - `games`: `chess_blocks_traps`, `calculator`, `pixel_paint`, `digimon_rpg`,
    `grid_tracer` (5 renames)
  - `web_apps`: `booking_appointment_system`, `google_form_generator`,
    `hko_timesheet_leave`, `event_registration_form` (was `otc_application_form`)
    (4 renames)
  - `templates`: `docker_laravel`, `dockerized_mern`, `secure_web_template`,
    `springboot_mvc_template` (4 renames)
  - `ai`: `sdlc_orchestration_mcp` (was `entrepreneur_mcp`),
    `opencode_docker_env` (was `ai_opencode`) (2 renames)
  - `devops`: `apache_proxy_app_stack`, `ansible_automation`,
    `monitoring_alert_system`, `cicd_pipeline_config` (4 renames — all were
    `ass_*` / `assistance_*` / `application_*` names)
  - `notes`: `cissp_question_bank_analysis`, `cissp_mcq_platform` (2 renames)
  - `personal`→`tools`: `midi_music_generator` moved from `personal` to new
    `tools` category; `sudoku_solver` moved from `games` to `tools`
- **New `tools` type** (8th category): `sudoku_solver` + `midi_music_generator`.
  Portfolio now has 32 projects across 8 categories (games 5, web_apps 7,
  templates 4, ai 5, devops 4, tools 2, notes 4, personal 1).
- **Two-axis taxonomy:** every project now carries `domains[]` (cross-cutting
  knowledge areas) in addition to `type`. Six domains: `frontend` (14),
  `backend` (10), `devops` (8), `security` (7), `ai` (6), `creative` (6).
- **Field tag cleanup:** `calculator`, `pixel_paint`, `grid_tracer` retagged
  `#game-dev` (was `#productivity`); `google_form_generator`,
  `hko_timesheet_leave` retagged `#web-dev` (was `#productivity`).
  `sudoku_solver` keeps `#productivity` as the sole genuine productivity tool.

### Added
- `blog/src/types/index.ts`: `ProjectDomain` union type; `domains: ProjectDomain[]`
  on `Project` interface; `'tools'` added to `ProjectType`
- `blog/src/pages/Projects.tsx`: domain filter buttons (compose with type-grouped
  display, `useState`-driven)
- `blog/src/components/ProjectsOverview.tsx`: domain coverage section showing
  how each domain spans categories
- `blog/src/components/ProjectTable.tsx`: Domains row
- `blog/src/components/ProjectCard.tsx`: domain badges
- `blog/src/index.css`: `.domain-filters`, `.domain-btn`, `.domain-tag` styles
- `blog/src/data/projects.ts`: `domains[]` on all 32 entries; `domainLabels`
  export; `tools` in `categoryLabels`
- `README.md`: Tools toctree section; breadth & coverage matrix (6 domains ×
  categories + 36-tag stack breakdown); regenerated toctree from manifest
- `AGENTS.md`: eight types, two-axis taxonomy docs, path refs updated for all
  18 renames, manifest field list updated

### Renames — semantic identifiers preserved
- MySQL DB name `booking_appointment_system` unchanged
- Docker network `ai_opencode` in `.env.example` unchanged
- GitHub repo names unchanged (e.g. `entrepreneur-mcp`, `otc-application-form`,
  `qr-code-project`, `assistance-alert-system`)
- `vite.config.js` `base: '/otc-application-form/'` unchanged

## [0.9.0] - 2026-09-28

### Added
- `projects/web_apps/otc_application_form/` — event registration web app,
  migrated from a top-level `otc-application-form/` directory that was sitting
  outside the `projects/` umbrella and still carried its own `.git`
  - 32nd project; `Web Apps` category goes 6 → 7, portfolio total 31 → 32
  - Stack: React 19 + Vite 7 + Tailwind CSS v4 frontend, Google Apps Script
    backend appending rows to Google Sheets, deployed to GitHub Pages
  - Live site: <https://mcc-mak.github.io/otc-application-form/> (repo
    `Mcc-Mak/otc-application-form`, untouched by this move)
  - One event per folder, now named `me_time_2026_09_26/` (was
    `2026-09-26 - 📄 NEW PAGE - Me Time 充充電報名表/`)
  - Nested `.git` removed, so the source is tracked by this root repo like all
    31 other projects
  - Its own `CHANGELOG.md` bumped to `0.4.0` and its `AGENTS.md` extended with
    the dual-repo sync rule
- README toctree: new `otc_application_form` row under **Web Apps** (field
  `#web-dev`, industry `#—`, role `#developer`, year 2026, `live` link)
- README "Projects" intro rewritten: it still claimed "Each project is its own
  git repository. This root repo tracks only `README.md`, `LICENSE`, ..." —
  untrue since v0.7.0. Now states the 32 projects are tracked by this
  repository and lists what else the root repo tracks.
- `blog/src/data/projects.ts`: matching manifest entry — slug
  `otc_application_form`, so it resolves at
  `/projects/web_apps/otc_application_form`
- `AGENTS.md`: new "Projects that deploy from their own repo" section covering
  the push-upstream-then-mirror order, and a bullet for the new project's
  `AGENTS.md` in the per-project instruction list

### Changed
- Root `AGENTS.md` — **corrected a model that had been wrong since v0.7.0**:
  - "What this repo is": states that `projects/` is tracked by the root repo and
    that no project has a nested `.git`; adds the `find projects -maxdepth 3
    -name .git` verification
  - "How to work here": a project change is committed in the **root** repo via
    `git add projects/<type>/<unit>`; removed the false "only `README.md` and
    `LICENSE` belong to the root repo" rule
  - "Per-project dates": the `Year` column is historical — it was harvested
    before v0.7.0, and with per-project history gone, new projects must take
    their year from the owner's own repo rather than root timestamps
  - Root-tracked-files list and the "never `git add` anything under `projects/`"
    prohibition replaced with the mirror rule
  - Both owner gates ("README toctree", "blog + `.github/`") marked cleared;
    `.github/workflows/` section now documents the real `deploy_reactjs_page.yml`
    `working-directory` gap instead of a pre-approval instruction
  - "Rename scope": no longer claims `mv` carries each project's `.git`/`origin`
- `.gitignore`: dropped the commented-out `projects/` block (it is tracked here),
  documented why `projects/` must not be ignored, and added
  `projects/**/node_modules/` + `projects/**/dist/`
- `projects/web_apps/otc_application_form/` — activity folder renamed
  `2026-09-26 - 📄 NEW PAGE - Me Time 充充電報名表/` → `me_time_2026_09_26/`,
  with every dependent path, doc link, Mermaid label and `cd` command updated
  (`README.md`, `AGENTS.md`, `doc/README.md`, `doc/architecture.md`, and two
  stale workflow comments). `deploy_github_pages.yml` needed **no** path change
  — it locates the frontend with `find -maxdepth 4 -name package.json`, which
  still resolves; verified after the rename. `vite.config.js` `base` is
  unchanged, since it is tied to the GitHub repo name.

### Verified
- `blog`: `npm run build` (`tsc -b && vite build`) passes
- `projects/web_apps/otc_application_form/me_time_2026_09_26/web`: `npm ci` +
  `npm run build` passes; the deploy workflow's `Locate web app` step still
  resolves to `./me_time_2026_09_26/web`

## [0.8.0] - 2026-09-25

### Added
- `blog/` — Vite + ReactJS + TypeScript portfolio web app
  - Data manifest at `blog/src/data/projects.ts` (31 projects, 7 categories)
  - TypeScript types at `blog/src/types/index.ts`
  - Layout components: `Header`, `Footer`, `Layout`
  - Home page sections: `Hero`, `Competencies`, `Education`, `Employment`,
    `Achievements`, `ProjectsOverview`
  - Project components: `ProjectCard`, `CategorySection`, `ProjectTable`
  - Pages: `Home`, `Projects`, `CategoryPage`, `ProjectDetail`, `LegendPage`,
    `NotFound`
  - React Router routing: `/`, `/projects`, `/projects/:type`,
    `/projects/:type/:slug`, `/legend`
  - Dark theme CSS with responsive layout

### Changed
- `.gitignore`: added `blog/dist/` (build artifact)

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

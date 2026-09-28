# AGENTS.md

Guidance for OpenCode sessions in this **portfolio aggregator** workspace:
`/workplace/projects/portfolio`. Owner: Mak Chun Chi (Martin).

## What this repo is (read first)

- This is **not** a single application. It aggregates many independent,
  pre-existing projects under `projects/<type>/<unit>/`.
- The root git repo (`origin`: `github.com/Mcc-Mak/portfolio`, branch `dev-001`)
  tracks `README.md`, `LICENSE`, `AGENTS.md`, `.gitignore`, and `CHANGELOG.md`,
  plus `blog/`, `.github/workflows/`, and **`projects/`** — verify with
  `git ls-files` at root (~67k files).
- **Projects are tracked directly by the root repo; they are NOT nested git
  repos.** Since v0.7.0 every `projects/<type>/<unit>/` has had its `.git`
  removed and its source committed into this repo. There is no `.gitmodules`,
  and no project has a nested `.git` (verify: `find projects -maxdepth 3 -name .git`).
  Each project still has its **own GitHub repo** as the source of record for its
  live deployment — see "Projects that deploy from their own repo" below.

## How to work here

- **No root build/test/lint manifests.** No root `package.json`, `pom.xml`,
  `pyproject.toml`, or `Makefile`. Never run `npm`/`mvn`/`pip`/`uv` at root. `cd`
  into the specific project and use *its* tooling. The one root-level build
  artifact is `.github/workflows/*.yml` (GitHub Pages deploy — see below); it
  belongs to the **root** repo, not any subproject.
- **A project change is committed in the ROOT repo.** `git add projects/<type>/<unit>`
  then commit on the root repo's `dev-001`. There is no per-project `.git` to
  commit into. If a project is *also* a live site, mirror the change back to its
  own GitHub repo — see "Projects that deploy from their own repo".
- **Don't assume a tech stack.** Projects span static JS/HTML, Java/Maven
  (Spring Boot), Python (`uv` + CrewAI/MCP), Node/MERN, Docker Compose, Ansible,
  GitHub/GitLab CI configs, Google Apps Script, TS/JS MCP servers, and Markdown
  study notes (CISSP, CompTIA). Inspect the project's own manifest first.
- **Respect per-project instruction files** — they hold hard constraints that
  override anything generic. Read before editing that project:
  - `projects/ai/crew_ai_orchestrator_mcp/AGENTS.md` — Python/uv, mcp 2.x (`MCPServer`, not
    `FastMCP`), never write stdout under stdio, `dev-001` + per-commit
    CHANGELOG/version bump, never push `main`/`dev`.
  - `projects/ai/hk_guided_tour/AGENTS.md` — Python/uv, `crewai==1.15.22`, musllinux stubs in
    `_stubs/`, Traditional-Chinese output, needs `HKOAI_API_KEY` +
    `OPENCODE_API_KEY`, SSL-bypass + 180s LLM timeout.
  - `projects/ai/sdlc_orchestration_mcp/AGENTS.md` — **pnpm only** (never npm/yarn), ESM, spec is
    highest-numbered `PROMPT-V*.md`. (Product name is still `entrepreneur-mcp`;
    the GitHub repo remains `Mcc-Mak/entrepreneur-mcp`.)
  - `projects/ai/opencode_docker_env/mcp/software-development-pipeline/{Linux,Windows}/AGENTS.md`
  - `projects/web_apps/event_registration_form/AGENTS.md` — Traditional Chinese for all
    copy/docs/commits, `#registration` anchor + percent-encoded QR `data=`, GAS
    `Content-Type` must stay `text/plain` (CORS preflight kills `application/json`),
    form schema is the single source of truth for both UI order and Sheets columns,
    and the source is duplicated in a standalone repo that actually deploys Pages.
    (GitHub repo remains `Mcc-Mak/otc-application-form`; `vite.config.js` `base:
    '/otc-application-form/'` depends on the repo name staying put.)
  - Some projects also ship `opencode.jsonc` (e.g. `projects/ai/sdlc_orchestration_mcp/`,
    `projects/ai/opencode_docker_env/`) — honor it.

## Projects that deploy from their own repo

Several projects are live GitHub Pages sites, so their **own** GitHub repo is the
source of record for the live deployment, even though a copy of the source is
tracked in this portfolio repo. Editing such a project means editing in **both**
places, in this order:

1. Push the change to the project's own repo (its own branch rules and
   auto-merge pipeline — read that repo's `AGENTS.md`/`CHANGELOG.md`).
2. Let its Pages deploy succeed, then mirror the identical change into
   `projects/<type>/<unit>/` and commit here on `dev-001`.

Do **not** rename a GitHub repo that backs a Pages URL — GitHub does not redirect
old Pages paths. `web_apps/event_registration_form` is the current example: its
  `auto_merge.yml` + `deploy_github_pages.yml` under its own
`.github/workflows/` are **inert here** (GitHub Actions only reads workflows at a
repo's root), and its `vite.config.js` `base: '/otc-application-form/'` depends
on the repo name staying put.

## Per-project dates (for the README toctree)

- The `Year` column is **historical**: it was harvested from each project's own
  `.git` back when they were still nested repos, before v0.7.0. Since then the
  per-project history is gone and the root repo has a single 2026 date for
  everything, so **new projects take their creation year from the owner's own
  repo history** (ask, or check the project's own GitHub repo) — do not infer a
  year from root repo timestamps.
- To recover dates for a project that still has an upstream repo:
  - creation: `git log --diff-filter=A --follow --format='%ai' -- . | tail -1`
  - latest update: `git log -1 --format='%ai'`
- Git's dubious-ownership guard trips on repos owned by another user. If git
  refuses, run `git config --global --add safe.directory <abs path>`.

## Target directory structure (owner-approved)

- **Physical layout groups by `type`**; all subprojects live under one
  `projects/` umbrella. Root stays clean: `README.md`, `LICENSE`, `AGENTS.md`,
  `.gitignore`, `.github/workflows/`, `blog/`, `projects/`.
- Naming charset (every dir): **Chinese chars or `[a-z0-9_.]`** — no uppercase,
  no hyphens. Style: `snake_case` ASCII for dirs; Chinese preserved for
  natively-Chinese *content* files (e.g. `hk_guided_tour` keeps `建築/`, `矩陣/`).
- Eight types (owner-confirmed): `games`, `web_apps`, `templates`, `ai`,
  `devops`, `tools`, `notes`, `personal`.
- **Two-axis taxonomy:** every project has a `type` (primary navigation, 8
  categories) and `domains[]` (cross-cutting knowledge areas). Six domains:
  `frontend`, `backend`, `devops`, `security`, `ai`, `creative`. A project
  typically carries 1–3 domains. The blog's Projects page filters by domain
  (composing with type grouping); the README breadth matrix shows domain
  coverage across categories.
- `blog/` is the **Vite + ReactJS** app, tracked by the **root** repo; its source
  is the only thing the Pages workflow builds. Project source lives **outside**
  `blog/src/` (never in the Vite build graph); the blog consumes projects through
  a manifest at `blog/src/data/projects.ts` (slug, name, type, domains, stack,
  field, industry, role, year, repo, pagesUrl, localReadme, description).
  `projects/<type>/` maps to a React Router segment; `<unit>` dir name → route
  slug. Renames touch only the manifest + README.
- **README toctree groups by `type`, then tags each `{type}/{unit}`** with
  field/industry/role. Year (creation + latest update) is historical — see
  "Per-project dates".
- **Rename scope is local dirs only — do NOT rename the GitHub repos.** Several
  projects are live Pages sites (`mcc-mak.github.io/<repo>`); a GitHub repo
  rename would break those Pages URLs (no auto-redirect). Local moves are safe:
  `origin` lives in each project's own GitHub repo, which the portfolio copy
  does not carry. If a moved project contains its own `.github/workflows/`,
  they are inert in this repo but must be kept in sync in the upstream repo.
- A new root `.gitignore` must ignore `blog/node_modules/`, `blog/dist/`, and
  per-project `node_modules/` / `dist/` so `git status` at root stays clean.
  Do **not** ignore `projects/` — it is tracked here.

## Current task: README as toctree + two-axis taxonomy

- The root `README.md` has been restructured into a **table-of-contents tree**:
  top level = the eight `type` groups; under each, one entry per
  `{type}/{unit}` carrying **tags** (field/industry/role) and **year (creation +
  latest update)**. Projects are physically located at `projects/<type>/<unit>/`.
- A **breadth & coverage matrix** follows the toctree, showing how the six
  knowledge domains span categories, plus a 36-tag technology-stack breakdown.
- The blog's Projects page has **domain filter buttons** that compose with the
  type-grouped display, letting visitors filter by cross-cutting knowledge area.
- **Owner gate (cleared):** the README toctree was approved; `blog/` and
  `.github/workflows/` now exist and are tracked by the root repo.

## `.github/workflows/*.yml` (root-repo, gated)

- The root repo's only build/CI artifact is `.github/workflows/*.yml` — a
  GitHub Actions workflow deploying the `/blog/` (ReactJS + Vite) build to
  **GitHub Pages**. It is tracked by the **root** repo (like `README.md` /
  `LICENSE`), not any subproject.
- **Gate cleared:** `blog/` and `.github/workflows/` exist and are tracked.
- **Fixed in v1.0.0:** `deploy_reactjs_page.yml` now builds the blog (not the
  former holding page) — install/build run with `working-directory: blog`, the
  artifact path is `./blog/dist`, and `cache-dependency-path` points to
  `blog/package-lock.json`. Renamed workflow to "Deploy Blog to Pages".
- Only workflows at a repo's **root** run. The `.github/workflows/` directories
  inside some `projects/<type>/<unit>/` are inert here and are kept as
  reference copies of the upstream repos' workflows.

## Git workflow conventions (root repo, git-control)

- Every root-repo change ships via `dev-001` with a versioned CHANGELOG bump,
  then propagates `dev-001 → dev → main → deploy` (auto-merge pipeline).
  **Never push directly to `dev` or `main`** — push only `dev-001`.
- **CHANGELOG + version (mandatory for every root change):**
  - Bump `CHANGELOG.md` top entry to `## [X.X.X] - YYYY-MM-DD` using semver:
    MAJOR = breaking, MINOR = feature, PATCH = fix/chore/docs.
  - Put the bumped version in the commit subject (`feat(v1.2.0): …`) or as a
    `Version: 1.2.0` body line. Conventional-commit prefix
    (`feat: fix: docs: chore: refactor: test: build: style: ci:`), imperative,
    ≤50 chars subject, no trailing period.
  - Order: edit files → bump `CHANGELOG.md` → `git add` → commit →
    `git push origin dev-001`. The pipeline auto-merges to `dev`/`main` and
    deploys (Pages, once the workflow is fixed).
- Root-repo tracked files: `README.md`, `LICENSE`, `AGENTS.md`, `.gitignore`,
  `CHANGELOG.md`, `blog/`, `.github/workflows/`, and `projects/`. `projects/` is
  tracked **here** — add it here, then mirror into the project's own repo if it
  is a live site.
- Per-project CHANGELOG/version mandates apply where that project's `AGENTS.md`
  requires them (e.g. `web_apps/otc_application_form` bumps its own
  `CHANGELOG.md` with every change, in Traditional Chinese).
- Don't touch any `GIT_PUSH_TOKEN` or embedded remote credentials.

## Security note

- Some project remotes (in their own upstream repos) embed a GitHub PAT in the
  `origin` URL. Do not echo/print it. Recommend the owner rotate it and switch to
  a credential helper or `gh auth`.

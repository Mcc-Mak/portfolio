# AGENTS.md

Guidance for OpenCode sessions in this **portfolio aggregator** workspace:
`/workplace/projects/portfolio`. Owner: Mak Chun Chi (Martin).

## What this repo is (read first)

- This is **not** a single application. It aggregates many independent,
  pre-existing projects as top-level subdirectories.
- The root git repo (`origin`: `github.com/Mcc-Mak/portfolio`, branch `dev-001`)
  tracks **only `README.md` and `LICENSE`** — verify with `git ls-files` at root.
  It has a single "Initial commit" and no root `.gitignore`.
- **Every project subdirectory is its own independent git repo** (own `.git`,
  own `origin` under `github.com/Mcc-Mak/<project>`). They are **not** git
  submodules — there is no `.gitmodules`, and the root repo does **not** track
  their contents.

## How to work here

- **No root build/test/lint manifests.** No root `package.json`, `pom.xml`,
  `pyproject.toml`, or `Makefile`. Never run `npm`/`mvn`/`pip`/`uv` at root. `cd`
  into the specific project and use *its* tooling. The one root-level build
  artifact is `.github/workflows/*.yml` (GitHub Pages deploy — see below); it
  belongs to the **root** repo, not any subproject.
- **A project change is committed in that project's `.git`, not the root repo.**
  `cd <project>` → `git add` → commit → push there. `git add` at root will never
  capture subproject files.
- **Only `README.md` and `LICENSE` belong to the root repo.** Editing the
  portfolio README is a root-repo commit; everything else is per-project.
- **Don't assume a tech stack.** Projects span static JS/HTML, Java/Maven
  (Spring Boot), Python (`uv` + CrewAI/MCP), Node/MERN, Docker Compose, Ansible,
  GitHub/GitLab CI configs, Google Apps Script, TS/JS MCP servers, and Markdown
  study notes (CISSP, CompTIA). Inspect the project's own manifest first.
- **Respect per-project instruction files** — they hold hard constraints that
  override anything generic. Read before editing that project:
  - `crew-ai-orchestrator-mcp/AGENTS.md` — Python/uv, mcp 2.x (`MCPServer`, not
    `FastMCP`), never write stdout under stdio, `dev-001` + per-commit
    CHANGELOG/version bump, never push `main`/`dev`.
  - `hk-guided-tour/AGENTS.md` — Python/uv, `crewai==1.15.22`, musllinux stubs in
    `_stubs/`, Traditional-Chinese output, needs `HKOAI_API_KEY` +
    `OPENCODE_API_KEY`, SSL-bypass + 180s LLM timeout.
  - `entrepreneur-mcp/AGENTS.md` — **pnpm only** (never npm/yarn), ESM, spec is
    highest-numbered `PROMPT-V*.md`.
  - `ai-opencode/mcp/software-development-pipeline/{Linux,Windows}/AGENTS.md`
  - Some projects also ship `opencode.jsonc` (e.g. `entrepreneur-mcp/`,
    `ai-opencode/`) — honor it.

## Per-project dates (for the README toctree)

- "Year of commit" (creation + latest update) must be read from **each project's
  own `.git`**, never the root repo (root has one 2026 commit for everything).
  From inside the project:
  - creation: `git log --diff-filter=A --follow --format='%ai' -- . | tail -1`
  - latest update: `git log -1 --format='%ai'`
- Git's dubious-ownership guard trips on nested repos. If git refuses, run
  `git config --global --add safe.directory <abs path>` for that project
  (already done for the root).

## Target directory structure (owner-approved)

- **Physical layout groups by `type`**; all subprojects live under one
  `projects/` umbrella. Root stays clean: `README.md`, `LICENSE`, `AGENTS.md`,
  `.gitignore`, `.github/workflows/`, `blog/`, `projects/`.
- Naming charset (every dir): **Chinese chars or `[a-z0-9_.]`** — no uppercase,
  no hyphens. Style: `snake_case` ASCII for dirs; Chinese preserved for
  natively-Chinese *content* files (e.g. `hk_guided_tour` keeps `建築/`, `矩陣/`).
- Seven types (owner-confirmed): `games`, `web_apps`, `templates`, `ai`,
  `devops`, `notes`, `personal`.
- `blog/` is the **Vite + ReactJS** app, tracked by the **root** repo; its source
  is the only thing the Pages workflow builds. Project source lives **outside**
  `blog/src/` (never in the Vite build graph); the blog consumes projects through
  a manifest at `blog/src/data/projects.ts` (slug, name, type, stack, field,
  years, repo, pages_url). `projects/<type>/` maps to a React Router segment;
  `<unit>` dir name → route slug. Renames touch only the manifest + README.
- **README toctree groups by `type`, then tags each `{type}/{unit}`** with
  field/industry/role. Year (creation + latest update) still read per-project
  from each nested `.git` (see "Per-project dates").
- **Rename scope is local dirs only — do NOT rename the GitHub repos.** Several
  projects are live Pages sites (`mcc-mak.github.io/<repo>`); a GitHub repo
  rename would break those Pages URLs (no auto-redirect). Local moves are safe:
  each project is its own repo; `mv` carries its `.git`, `origin` is unchanged.
- A new root `.gitignore` must ignore `projects/` (nested repos) and
  `blog/node_modules/` so `git status` at root stays clean.

## Current task: README as toctree

- Reorganize the root `README.md` (currently just a title) into a
  **table-of-contents tree**: top level = the seven `type` groups; under each,
  one entry per `{type}/{unit}` carrying **tags** (field/industry/role) and
  **year (creation + latest update)**. Get it stable before any blog work — that
  is an owner gate.

## `.github/workflows/*.yml` (root-repo, gated)

- The root repo's only build/CI artifact will be `.github/workflows/*.yml` — a
  GitHub Actions workflow deploying the `/blog/` (ReactJS + Vite) build to
  **GitHub Pages**. It is tracked by the **root** repo (like `README.md` /
  `LICENSE`), not any subproject.
- **Gated:** do not create or scaffold `.github/`, the workflow, or `/blog/`
  until the owner explicitly confirms the README toctree is stable. The README is
  currently just a title — not yet stable.
- When greenlit: the workflow lives at `.github/workflows/<name>.yml`, builds the
  Vite app under `/blog/`, and deploys via `actions/configure-pages` +
  `actions/deploy-pages`. Commit it to the root repo on `dev-001` (same git
  workflow as README/LICENSE edits).

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
  - Order: edit files → bump `CHANGELOG.md` → `git add` (root files only) →
    commit → `git push origin dev-001`. The pipeline auto-merges to `dev`/`main`
    and deploys (Pages, once the workflow exists).
- Root-repo tracked files: `README.md`, `LICENSE`, `AGENTS.md`, `.gitignore`,
  `CHANGELOG.md`, and (when greenlit) `blog/` + `.github/workflows/`. Never
  `git add` anything under `projects/` — those are nested repos.
- Branches differ per nested project (many sit on `main`); check
  `git branch --show-current` in the project you're editing rather than
  assuming. Per-project CHANGELOG/version mandates apply only where that
  project's `AGENTS.md` requires them.
- Don't touch any `GIT_PUSH_TOKEN` or embedded remote credentials.

## Security note

- Several nested project remotes embed a GitHub PAT in their `origin` URL. Do not
  echo/print it. Recommend the owner rotate it and switch to a credential helper
  or `gh auth`.

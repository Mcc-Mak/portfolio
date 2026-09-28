# Contributing

Thank you for contributing to this project. Please read the full
[Developer Guide](docs/Developer-Guide.md) for coding standards, testing
conventions, and the git workflow before opening a pull request.

## Getting Started

1. Read `README.md` and `docs/Setup-Guide.md`.
2. Install dependencies with `npm install`.
3. Follow the workflow order (W1): Requirements -> Coding -> DevSecOps ->
   Documentation.
4. Run the pipeline with `npm run pipeline` and ensure it ends with
   `[OK] PIPELINE SUCCESSFUL`.

## Before You Submit

- Write or update Jest unit tests under `__tests__/` for every change under
  `src/`.
- Run `npm run lint` (ESLint, no warnings allowed) and `npm test`.
- Run `npm audit` and do not introduce high-severity vulnerabilities.
- Never commit secrets; the runtime-protection gate (R7) blocks `.env` and
  hardcoded credentials.
- Never edit the global deployment at `~/.config/opencode/` directly. Edit the
  project source and run `npm run deploy` (R14).

## Committing

The repository enforces an audit trail (R11). Commit in the style of recent
history with a concise message describing the change. You will be prompted to
commit via the TUI once a unit of work is complete (R15).

## Code of Conduct

By participating you agree to the [Code of Conduct](CODE_OF_CONDUCT.md).

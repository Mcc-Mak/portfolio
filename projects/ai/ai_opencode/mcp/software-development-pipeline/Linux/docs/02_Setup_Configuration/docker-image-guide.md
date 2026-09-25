# Docker Image Guide

**Class**: 5 (Ops/User) | **Persona**: Developer + Operator

This guide covers building, tagging, scanning, and running the CMMI Level 4
pipeline and its application images in Docker. It assumes you have already
completed the [Setup Guide](setup-guide.md) and reviewed the
[Config Guide](config-guide.md) for environment variables. The security gates
(R7–R11, R16–R19) apply inside the container exactly as they do on bare metal —
a container is not a way to bypass them.

## Table of Contents

1. [Docker Overview & Benefits](#1-docker-overview--benefits)
2. [Dockerfile (Multi-Stage Build)](#2-dockerfile-multi-stage-build)
3. [Image Tagging Strategy](#3-image-tagging-strategy)
4. [Building Images](#4-building-images)
5. [Pushing to a Registry](#5-pushing-to-a-registry)
6. [Image Security Scanning](#6-image-security-scanning)
7. [Environment-Specific Images](#7-environment-specific-images)
8. [Development Container (DevContainer)](#8-development-container-devcontainer)
9. [Docker Compose for Local Dev](#9-docker-compose-for-local-dev)
10. [Performance Optimization](#10-performance-optimization)
11. [Common Docker Commands](#11-common-docker-commands)
12. [Troubleshooting](#12-troubleshooting)

---

## 1. Docker Overview & Benefits

Docker packages the Node.js LTS runtime, the pipeline scripts, and the `src/`
secure-coding layer into a single reproducible artifact. For a CMMI Level 4
project, reproducibility is a first-class requirement: the same image that
passed gates R7–R11, R16–R19 in CI is the image that runs in production.

| Benefit | Why it matters here |
| :--- | :--- |
| Reproducible runtime | Pin Node.js LTS + deps; no "works on my machine" |
| Gate parity | R8 ESLint + R9 `npm audit` + R16–R19 run identically in CI and prod |
| Isolation | `[Project Database]` and app run as separate services |
| Immutable artifacts | Tagged images are traceable to a git commit (R11/R20) |
| Fast onboarding | `docker compose up` replaces manual env setup |

> Docker is **optional** for the pipeline itself — the bash orchestrator runs
> natively on Linux (R6). Docker is required only for containerized
> deployments of the application server (`src/backend/server.js`).

---

## 2. Dockerfile (Multi-Stage Build)

A multi-stage build keeps the final image small and free of dev-only tooling
(`devDependencies`, ESLint configs, test fixtures). Stage 1 installs everything
and runs the gates; stage 2 copies only production runtime files.

```dockerfile
# syntax=docker/dockerfile:1.7

# ---- Stage 1: build + gates -----------------------------------------------
FROM node:18-lts AS builder
WORKDIR /app

# Copy lockfile first for layer caching (see §10)
COPY package.json package-lock.json ./
RUN npm ci

# Copy source, tests, and config
COPY src/ __tests__/ scripts/ tools/ ./
COPY .eslintrc.js opencode.jsonc AGENTS.md ./

# Mandatory gates inside the image (R8/R9/R10) — fail the build on any error
RUN npm run lint   && \
    npm run audit  && \
    npm run test

# Prune devDependencies for the production stage
RUN npm prune --omit=dev

# ---- Stage 2: runtime ------------------------------------------------------
FROM node:18-lts AS runtime
WORKDIR /app
ENV NODE_ENV=production

# Create a non-root user (R7 runtime protection)
RUN useradd --create-home --uid 1001 appuser

COPY --from=builder /app /app
USER appuser

EXPOSE 8080
HEALTHCHECK --interval=30s --timeout=5s --start-period=10s --retries=3 \
    CMD node -e "fetch('http://localhost:8080/health').then(r=>process.exit(r.ok?0:1)).catch(()=>process.exit(1))"

CMD ["node", "src/backend/server.js"]
```

### 2.1 Stage-by-stage rationale

| Stage | Base image | Purpose | Leaves behind |
| :--- | :--- | :--- | :--- |
| `builder` | `node:18-lts` | Install all deps, run R8/R9/test gates | devDependencies, test fixtures |
| `runtime` | `node:18-lts` | Copy pruned `node_modules` + `src/` | Only production code + runtime deps |

> If any gate fails, `docker build` exits non-zero — exactly the R10 blocking
> behavior you get from `npm run pipeline` on bare metal.

---

## 3. Image Tagging Strategy

Tags are the link between a deployed artifact and its source commit (R11/R20).
We use three orthogonal tags per build.

| Tag format | Meaning | Example |
| :--- | :--- | :--- |
| `semver` | Released version | `1.4.2` |
| `latest` | Most recent stable release (production only) | `latest` |
| `git-<sha>` | Immutable pointer to a commit | `git-a1b2c3d` |
| `<env>-<sha>` | Environment-prefixed promotion candidate | `staging-a1b2c3d` |

```text
[registry-url]/cmmi-pipeline:1.4.2
[registry-url]/cmmi-pipeline:latest
[registry-url]/cmmi-pipeline:git-a1b2c3d
```

Rules:
- **Never move a `git-<sha>` tag.** It is the audit anchor (R11).
- **`latest` only tracks released, gate-green production builds.** Never point
  it at a staging or feature image.
- **Every prod deployment records its `git-<sha>` tag** in `logs/audit.log`.

---

## 4. Building Images

```bash
# Local build (defaults to the Dockerfile in the repo root)
docker build -t cmmi-pipeline:dev .

# Build with a full version tag + commit SHA for traceability
SHA=$(git rev-parse --short HEAD)
docker build \
    -t cmmi-pipeline:1.4.2 \
    -t cmmi-pipeline:git-${SHA} \
    .

# Build a specific stage only (useful for debugging the builder stage)
docker build --target builder -t cmmi-pipeline:builder .
```

Verify the gates ran (look for the `RUN npm run lint && npm run audit && npm
run test` layer succeeding) and inspect the final image size:

```bash
docker images cmmi-pipeline
docker history cmmi-pipeline:1.4.2 --no-trunc
```

---

## 5. Pushing to a Registry

The registry URL is environment-specific — substitute `[registry-url]` with
your Docker Hub, AWS ECR, Azure ACR, or GCR endpoint.

```bash
# Log in (one-time per host)
docker login [registry-url]

# Tag and push all variant tags
SHA=$(git rev-parse --short HEAD)
docker tag cmmi-pipeline:1.4.2      [registry-url]/cmmi-pipeline:1.4.2
docker tag cmmi-pipeline:git-${SHA} [registry-url]/cmmi-pipeline:git-${SHA}
docker tag cmmi-pipeline:1.4.2      [registry-url]/cmmi-pipeline:latest

docker push [registry-url]/cmmi-pipeline:1.4.2
docker push [registry-url]/cmmi-pipeline:git-${SHA}
docker push [registry-url]/cmmi-pipeline:latest
```

### 5.1 Registry-specific notes

| Registry | Login command | Image path shape |
| :--- | :--- | :--- |
| Docker Hub | `docker login` | `username/cmmi-pipeline:tag` |
| AWS ECR | `aws ecr get-login-password \| docker login --username AWS --password-stdin [aws-account].dkr.ecr.[region].amazonaws.com` | `[aws-account].dkr.ecr.[region].amazonaws.com/cmmi-pipeline:tag` |
| Azure ACR | `az acr login --name [acr-name]` | `[acr-name].azurecr.io/cmmi-pipeline:tag` |
| GCR / Artifact Registry | `gcloud auth configure-docker` | `[gcr-host]/[project]/cmmi-pipeline:tag` |

> Use short-lived registry credentials from your CI/secret store. Never bake a
> registry token into the image (R7).

---

## 6. Image Security Scanning

The Dockerfile already runs R8 (ESLint) and R9 (`npm audit`) as build gates.
In addition, scan the **built image** for OS-level CVEs and secrets before
pushing.

| Scan | Tool | Gate | When |
| :--- | :--- | :--- | :--- |
| SAST | ESLint (inside builder) | R8 | `docker build` |
| SCA (deps) | `npm audit` (inside builder) | R9 | `docker build` |
| SCA (OS packages) | `[trivy]` / `[grype]` | R9 (image layer) | post-build, pre-push |
| Secret scan | `src/secrets.js` + `[trivy] --scanners secret` | R7 | post-build, pre-push |
| Compliance evidence | `compliance-check.js` | R16 | post-build, pre-push |
| Threat model | `threat-model.js` (CVE/CVSS + OSV.dev) | R17 | post-build, pre-push |
| DAST (running app) | `scripts/dast-scan.js` (OWASP ZAP) | R19 | against a running staging container |

```bash
# Scan the built image for OS + library CVEs and secrets
[trivy] image --severity HIGH,CRITICAL --exit-code 1 cmmi-pipeline:1.4.2

# Secret-only scan (R7) — must find zero secrets
[trivy] image --scanners secret --exit-code 1 cmmi-pipeline:1.4.2
```

A HIGH/CRITICAL finding or any secret blocks the push (R10). Record the scan
result in `metrics/` and `logs/audit.log` (R11). For the DAST flow against the
running image, see the
[Security Hardening Guide](../05_Security_Compliance/sec-hardening.md).

---

## 7. Environment-Specific Images

We build **one image** and vary behavior by environment variable, rather than
maintaining dev/staging/prod Dockerfiles. The `NODE_ENV` and `APP_ENV`
variables select configuration (see [Config Guide](config-guide.md)).

| Environment | `NODE_ENV` | `APP_ENV` | Image tag | Notes |
| :--- | :--- | :--- | :--- | :--- |
| Development | `development` | `dev` | `cmmi-pipeline:dev-<sha>` | Verbose logs; source mounts |
| Staging | `production` | `staging` | `cmmi-pipeline:staging-<sha>` | Prod parity; DAST runs here (R19) |
| Production | `production` | `prod` | `cmmi-pipeline:<semver>` / `latest` | Immutable; gates green |

```bash
# Staging promotion: re-tag a gate-green staging image as semver + latest
docker tag cmmi-pipeline:staging-a1b2c3d cmmi-pipeline:1.4.2
docker tag cmmi-pipeline:1.4.2           cmmi-pipeline:latest
docker push [registry-url]/cmmi-pipeline:1.4.2
docker push [registry-url]/cmmi-pipeline:latest
```

---

## 8. Development Container (DevContainer)

A DevContainer gives contributors a fully configured VS Code environment
without local install friction. It mounts the repo so live edits propagate.

`.devcontainer/devcontainer.json`:

```json
{
  "name": "cmmi-pipeline-dev",
  "image": "node:18-lts",
  "features": {
    "ghcr.io/devcontainers/features/docker-outside-of-docker:1": {}
  },
  "mounts": [
    "source=${localWorkspaceFolder},target=/workspace,type=bind,consistency=cached"
  ],
  "workspaceFolder": "/workspace",
  "postCreateCommand": "npm ci && chmod +x scripts/*.sh",
  "forwardPorts": [8080],
  "customizations": {
    "vscode": {
      "extensions": [
        "dbaeumer.vscode-eslint",
        "ms-azuretools.vscode-docker"
      ],
      "settings": {
        "editor.formatOnSave": true,
        "eslint.workingDirectories": ["./"]
      }
    }
  },
  "remoteEnv": {
    "DATABASE_URL": "postgresql://[user]:[password]@[db-host]:5432/[dev-db]"
  }
}
```

Open the repo in VS Code and run **Reopen in Container**. Then:

```bash
npm run pipeline   # full W1 run with all gates (R10)
```

---

## 9. Docker Compose for Local Dev

`docker-compose.yml` wires the app to `[Project Database]` and the metrics
store so a contributor can run the whole stack with one command.

```yaml
# docker-compose.yml
version: "3.9"

services:
  app:
    build:
      context: .
      dockerfile: Dockerfile
      target: runtime
    image: cmmi-pipeline:dev
    environment:
      NODE_ENV: development
      APP_ENV: dev
      DATABASE_URL: postgresql://pipeline:pipeline@db:5432/pipeline
      METRICS_DB: /app/metrics/metrics.db
    ports:
      - "8080:8080"
    volumes:
      - ./metrics:/app/metrics      # persist metrics.db across restarts
      - ./logs:/app/logs            # persist audit.log (R11)
    depends_on:
      db:
        condition: service_healthy

  db:
    image: postgres:15-alpine
    environment:
      POSTGRES_USER: pipeline
      POSTGRES_PASSWORD: pipeline
      POSTGRES_DB: pipeline
    ports:
      - "5432:5432"
    volumes:
      - pgdata:/var/lib/postgresql/data
    healthcheck:
      test: ["CMD-SHELL", "pg_isready -U pipeline -d pipeline"]
      interval: 10s
      timeout: 5s
      retries: 5

volumes:
  pgdata:
```

```bash
docker compose up --build          # bring up app + [Project Database]
docker compose exec app npm run pipeline -- --no-docgen
docker compose exec app npm run audit
docker compose down                # stop (data persists in named volume)
```

> The compose file uses placeholder credentials for local dev only. Production
> credentials come from your secret manager, never from this file (R7).

---

## 10. Performance Optimization

### 10.1 Layer caching

Copy `package*.json` **before** the source (as the Dockerfile in §2 does). This
makes dependency install a cached layer that only invalidates when deps change —
the slowest step.

### 10.2 `.dockerignore`

A tight `.dockerignore` keeps the build context small and prevents leaking
secrets or local artifacts into the image.

```text
# .dockerignore
.git
.github
node_modules
coverage
metrics/*.db
logs/*.log
.env
.env.*
*.md
!AGENTS.md
.vscode
.idea
Dockerfile
docker-compose.yml
```

### 10.3 Multi-stage payoff

| Image | Size (typical) | Contents |
| :--- | :--- | :--- |
| `builder` | ~450 MB | Full deps + devDeps + tests |
| `runtime` | ~180 MB | Pruned production deps + `src/` only |

### 10.4 Other tips

- Pin base image digests in production: `FROM node:18-lts@sha256:[digest]`.
- Use BuildKit cache mounts for npm: `RUN --mount=type=cache,target=/root/.npm npm ci`.
- Set `NODE_ENV=production` early so npm skips optional/dev packages.
- Combine `RUN` commands to reduce layer count and image size.

---

## 11. Common Docker Commands

| Task | Command |
| :--- | :--- |
| Build | `docker build -t cmmi-pipeline:dev .` |
| Build multi-arch | `docker buildx build --platform linux/amd64,linux/arm64 -t cmmi-pipeline:dev .` |
| Run interactively | `docker run --rm -it cmmi-pipeline:dev sh` |
| Run with env file | `docker run --env-file .env.production cmmi-pipeline:1.4.2` |
| List images | `docker images cmmi-pipeline` |
| Inspect layers | `docker history cmmi-pipeline:1.4.2 --no-trunc` |
| Tail logs | `docker logs -f <container-id>` |
| Exec into container | `docker exec -it <container-id> sh` |
| Compose up | `docker compose up --build` |
| Compose down | `docker compose down -v` |
| Prune dangling images | `docker image prune -f` |
| Scan image | `[trivy] image --severity HIGH,CRITICAL cmmi-pipeline:1.4.2` |

---

## 12. Troubleshooting

| Symptom | Likely cause | Fix |
| :--- | :--- | :--- |
| `npm run lint` fails the build | An R8 violation in `src/` | Run `npx eslint . --ext .js` locally; fix the reported file:line |
| `npm run audit` fails the build | A high/critical CVE in deps (R9) | `npm audit fix` or pin a patched version; re-build |
| Build context too large / slow | Missing or loose `.dockerignore` | Add the entries in §10.2; check with `du -sh .` |
| Image runs as root | Missing `USER appuser` in runtime stage | Confirm the `USER appuser` line is after the `COPY` (R7) |
| Secret scan blocks push | A secret leaked into a layer (R7) | Remove from source; the secret is in history — rebuild from clean |
| `ECONNREFUSED` to `db` | Compose `depends_on` healthcheck not satisfied | Wait for `pg_isready`; check `docker compose logs db` |
| OOM during `npm ci` | Builder memory limit | Increase Docker memory (Settings → Resources) |
| Slow rebuilds | Dep layer cache invalidated every build | Ensure `package*.json` are copied before `COPY src/` |
| `Cannot connect to the Docker daemon` | Docker service not running | `sudo systemctl start docker` (Linux) |
| Gate passes locally but fails in image | Different Node version | Pin `FROM node:18-lts` and verify `node --version` matches |
| Healthcheck on 8080 fails | Server bound to 8080 (default) | Confirm `BACKEND_PORT` matches `EXPOSE`; see `src/backend/server.js` |

For gate-failure diagnosis beyond Docker (e.g. an SPC block or opencode startup
crash), see the
[Troubleshooting Guide](../04_Operations_Maintenance/tshoot-guide.md). For term
definitions (CMMI, SPC, SAST/SCA, R7–R11), see the
[Glossary](../06_User_Reference/glossary.md).

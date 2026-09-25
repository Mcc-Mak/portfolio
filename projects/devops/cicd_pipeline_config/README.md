# CI/CD Pipeline (Configuration)
## Configuration Files
### GitLab
- **GitLab:** [Auto-merge: `dev-001` to `dev` to `main`](gitlab/auto-merge-dev-001-to-dev-to-main/.gitlab-ci.yml)
```mermaid
sequenceDiagram
    autonumber
    actor Dev as Developer
    participant GL as GitLab
    participant Runner as GitLab Runner
    participant Job1 as Job1 dev-001 to dev
    participant Repo as Git Repository
    participant Job2 as Job2 dev to main

    Dev->>GL: push commit to dev-001
    GL->>Runner: create pipeline for dev-001 (only: dev-001)
    Runner->>Job1: execute stage auto_merge
    Job1->>Job1: apk add git, config ssl/user
    Job1->>Repo: set remote URL using GIT_PUSH_TOKEN
    Job1->>Repo: checkout dev
    Job1->>Repo: pull origin dev
    Job1->>Repo: merge origin/dev-001 --no-ff
    Job1->>Repo: push origin dev
    Repo-->>GL: dev branch updated

    GL->>Runner: create pipeline for dev (only: dev)
    Runner->>Job2: execute stage auto_merge
    Job2->>Job2: apk add git, config ssl/user
    Job2->>Repo: set remote URL using GIT_PUSH_TOKEN
    Job2->>Repo: checkout main
    Job2->>Repo: pull origin main
    Job2->>Repo: merge origin/dev --no-ff
    Job2->>Repo: push origin main
    Repo-->>GL: main branch updated

    Note over Job1,Job2: resource_group auto_merge serializes merge jobs
    Note over Job2,Repo: Project Access Token can push and may trigger further pipelines, no job listens on main here, so loop stops.
```
- **GitLab:** [Auto-merge: `dev-001` to `dev`](gitlab/auto-merge-dev-001-to-dev/.gitlab-ci.yml)
```mermaid
sequenceDiagram
    autonumber
    actor Dev as Developer
    participant GL as GitLab
    participant Runner as GitLab Runner
    participant Job1 as Job1 dev-001 to dev
    participant Repo as Git Repository
    participant Job2 as Job2 dev to main

    Dev->>GL: push commit to dev-001
    GL->>Runner: create pipeline for dev-001 (only dev-001)
    Runner->>Job1: execute stage auto_merge
    Job1->>Job1: apk add git, config ssl/user
    Job1->>Repo: set remote URL using CI_JOB_TOKEN
    Job1->>Repo: checkout dev
    Job1->>Repo: pull origin dev
    Job1->>Repo: merge origin/dev-001 --no-ff
    Job1->>Repo: push origin dev
    Repo-->>GL: dev branch updated

    opt CI_JOB_TOKEN push is allowed to trigger dev pipeline
        GL->>Runner: create pipeline for dev (only dev)
        Runner->>Job2: execute stage auto_merge
        Job2->>Job2: apk add git, config ssl/user
        Job2->>Repo: set remote URL using CI_JOB_TOKEN
        Job2->>Repo: checkout main
        Job2->>Repo: pull origin main
        Job2->>Repo: merge origin/dev --no-ff
        Job2->>Repo: push origin main
        Repo-->>GL: main branch updated
    end

    Note over Job1,Job2: resource_group auto_merge serializes merge jobs
    Note over Job2,Repo: CI_JOB_TOKEN needs the Allow Git push requests via CI job token setting, protected branches/permissions may block dev to main. This is the safe but disabled dev to main concern.
```
### GitHub
- **GitHub:** [Auto-merge: `dev-001` to `dev` to `main`](github/auto-merge-dev-001-to-dev-to-main/.github-ci.yml)
```mermaid
sequenceDiagram
    autonumber
    actor Dev as Developer
    participant GH as GitHub
    participant RunA as Workflow Run A<br/>push: dev-001
    participant JobA as Job auto_merge_dev_001_to_dev
    participant RunB as Workflow Run B<br/>push: dev
    participant JobB as Job auto_merge_dev_to_main

    Dev->>GH: git push origin dev-001
    GH->>RunA: Trigger "Auto merge branches"<br/>github.ref = refs/heads/dev-001
    Note over RunA: concurrency: group=auto-merge<br/>cancel-in-progress=false

    RunA->>JobA: if github.ref == refs/heads/dev-001 ✅
    RunA->>RunA: Job auto_merge_dev_to_main skipped<br/>ref != refs/heads/dev

    JobA->>GH: actions/checkout@v5<br/>ref=dev, fetch-depth=0<br/>token=secrets.GIT_PUSH_TOKEN
    GH-->>JobA: dev checked out
    JobA->>JobA: git config user.name/email
    JobA->>GH: git fetch origin dev dev-001
    JobA->>JobA: git checkout dev
    JobA->>JobA: git reset --hard origin/dev
    JobA->>JobA: git merge origin/dev-001 --no-ff -m "Auto-merge dev-001 into dev"

    alt dev-001 merge creates new commit(s)
        JobA->>GH: git push origin dev
        GH-->>JobA: push success
        GH->>RunB: Trigger Run B due to PAT push<br/>github.ref = refs/heads/dev
        Note over RunB: Same concurrency group auto-merge<br/>queued until Run A finishes

        RunA-->>GH: Workflow Run A complete
        GH->>RunB: Start queued Run B

        RunB->>RunB: Job auto_merge_dev_001_to_dev skipped<br/>ref != refs/heads/dev-001
        RunB->>JobB: if github.ref == refs/heads/dev ✅

        JobB->>GH: actions/checkout@v5<br/>ref=main, fetch-depth=0<br/>token=secrets.GIT_PUSH_TOKEN
        GH-->>JobB: main checked out
        JobB->>JobB: git config user.name/email
        JobB->>GH: git fetch origin main dev
        JobB->>JobB: git checkout main
        JobB->>JobB: git reset --hard origin/main
        JobB->>JobB: git merge origin/dev --no-ff -m "Auto-merge dev into main"
        JobB->>GH: git push origin main

        alt main branch protected
            GH-->>JobB: Check bypass permission
            Note over JobB,GH: PAT user/app must be in bypass list<br/>and "Do not allow bypassing" unchecked
            JobB->>GH: push accepted if allowed
        else main branch not protected
            GH-->>JobB: push accepted
        end

        JobB-->>RunB: Job complete
        RunB-->>GH: Workflow Run B complete
        GH-->>Dev: main updated
    else dev-001 merge already up-to-date
        JobA->>GH: git push origin dev
        GH-->>JobA: Everything up-to-date
        Note over GH,RunB: No push event → Run B is not triggered
        RunA-->>GH: Workflow Run A complete
    end

    Note over GH: GIT_PUSH_TOKEN = fine-grained PAT<br/>Contents: Read and write<br/>Metadata: Read-only
    Note over GH: GITHUB_TOKEN push would NOT trigger new workflow<br/>PAT is required to chain dev-001 → dev → main
```
- **GitHub:** [Auto-merge: `dev-001` to `dev`](github/auto-merge-dev-001-to-dev/.github-ci.yml)
```mermaid
sequenceDiagram
    autonumber
    actor Dev as Developer
    participant GH as GitHub
    participant RA as Run A<br/>(dev-001)
    participant RB as Run B<br/>(dev)
    participant M as main

    Dev->>GH: push dev-001
    GH->>RA: Trigger Run A<br/>github.ref = refs/heads/dev-001

    Note over RA: Job1: auto_merge_dev_001_to_dev
    RA->>RA: checkout dev (token = GITHUB_TOKEN)
    RA->>RA: git merge origin/dev-001
    RA->>GH: git push origin dev ✅ success

    Note over RA: Job2: auto_merge_dev_to_main
    RA--xRA: if github.ref == refs/heads/dev → false → SKIPPED

    GH--xRB: ❌ Does not trigger new run<br/>(GITHUB_TOKEN push does not trigger workflow)

    Note over M: main never receives merge

    RA->>Dev: Run A ends (Job1 green, Job2 skipped)
    RB->>Dev: Run B never exists
```

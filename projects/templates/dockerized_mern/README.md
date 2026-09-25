# dockerized_mern

A Dockerized MERN-stack (MongoDB, Express, React, Node.js) multi-choice
question (MCQ) application template.

## File Structure

```
.
├── .env                          # Generated from .env.MCQ (gitignored)
├── .env.MCQ                      # Docker image/network config template
├── .gitignore
├── docker-compose.MCQ.yml        # Compose config for db + app services
├── tasklist.MCQ.txt              # Install flags (IS_REMOVE_IMAGE, etc.)
├── README.md
└── MCQ/
    ├── install                   # Entry-point install script
    ├── _install.sh               # Core install logic (pull, build, seed)
    ├── access.app                # App container access helper
    ├── access.db                 # DB container access helper
    ├── Dockerfile/
    │   ├── Dockerfile.db         # MongoDB image (mongo_db:7.0)
    │   └── Dockerfile.app        # App image (ubuntu_app:22.04 + Node 18)
    ├── db/
    │   ├── entrypoint.d/
    │   │   └── startup.sh
    │   └── setup.init/
    │       ├── create_user.mc4it.js   # MongoDB user creation script
    │       └── insert_data.mc4it.js   # Seed data
    └── app/
        ├── entrypoint.d/
        │   ├── client/startup.sh
        │   └── server/startup.sh
        └── script/
            ├── client/               # React frontend
            │   ├── package.json
            │   ├── public/
            │   └── src/
            │       ├── App.js
            │       ├── index.js
            │       ├── components/navbar.js
            │       └── static/image/
            └── server/               # Express backend
                ├── package.json
                ├── server.js          # Express entry point
                ├── config.env.template # MongoDB URI template
                ├── conf/
                │   └── config.env     # Generated at runtime (gitignored)
                ├── db/
                │   └── conn.js        # MongoDB connection helper
                └── routes/
                    └── record.js      # API route definitions
```

## Prerequisites

- Docker
- Docker Compose

## Setup

```bash
cd MCQ && bash ./install
```

The install script (`_install.sh`) will:

1. Copy `.env.MCQ` → `.env` and `tasklist.MCQ.txt` → `tasklist.txt`
2. Remove existing containers/images (if `IS_REMOVE_IMAGE=true`)
3. Pull base images and tag them (if `IS_PULL_IMAGE=true`)
4. Build and start containers with `docker-compose` (if `IS_BUILD_CONTAINER=true`)
5. Start MongoDB, create the user, and seed data
6. Copy `config.env.template` → `conf/config.env` with the DB container hostname injected
7. Start the server and client

## Configuration

Before first run, edit the credential placeholders:

- `MCQ/db/setup.init/create_user.mc4it.js` — set `user` and `pwd`
- `MCQ/app/script/server/config.env.template` — set MongoDB URI credentials

The `conf/config.env` file is generated at runtime from the template and is
gitignored.

## Docker Commands

```bash
# Build and start
docker-compose -f docker-compose.MCQ.yml up -d

# View logs
docker-compose -f docker-compose.MCQ.yml logs -f

# Stop
docker-compose -f docker-compose.MCQ.yml down

# Access containers
bash MCQ/access.db
bash MCQ/access.app
```

## API Endpoints

| Method | Route                              | Description                          |
|--------|------------------------------------|--------------------------------------|
| GET    | `/:dbname/all`                     | Fetch all records from a database   |
| GET    | `/:dbname/record/:question_id`     | Fetch a specific record by ID       |
| GET    | `/getLocalStorage?name=`           | Read a localStorage value           |
| GET    | `/setLocalStorage?name=&value=`    | Write a localStorage value (base64) |

## Coding Standards

- **Naming:** `camelCase` for JavaScript variables and functions; `snake_case`
  for file and directory names.
- **Variable declarations:** Use `const` by default; `let` only when
  reassignment is required. Never use `var`.
- **Strict equality:** Always use `===` / `!==`, never `==` / `!=`.
- **Comments:** No commented-out dead code. Comments are reserved for
  documentation that cannot be expressed by the code itself.
- **Console:** Remove all `console.log` debug statements before committing.
- **Credentials:** Never hardcode credentials. Use environment variables or
  template files with placeholder values (`change_me`).
- **Dependencies:** `node_modules/` must never be committed to version control.

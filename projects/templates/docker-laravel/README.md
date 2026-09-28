# docker_laravel

A Dockerized Laravel 11 development template with PHP 8.2-FPM, MySQL 8.0, and
Nginx. Provides a ready-to-use multi-container environment for bootstrapping
new Laravel projects.

## Tech Stack

| Category | Technology |
|----------|-----------|
| Framework | Laravel 11 |
| Runtime | PHP 8.2-FPM |
| Database | MySQL 8.0 |
| Web Server | Nginx (Alpine) |
| Container | Docker Compose |
| Frontend | Vite, Bootstrap 5.3, jQuery, FontAwesome 6 |
| Package Mgmt | Composer (PHP), npm (JS) |

## File Structure

```
docker_laravel/
├── .env.docker-laravel                  # Template env (copied to .env by install)
├── .gitignore
├── docker-compose.docker-laravel.yml    # Compose: app + db + nginx
├── docker-laravel/
│   ├── .app.docker                      # Shell into app container
│   ├── .db.docker                       # Shell into db container
│   ├── .nginx.docker                    # Shell into nginx container
│   ├── install                          # Build & start all containers
│   ├── restart                          # Restart containers & artisan serve
│   ├── docker-compose/
│   │   ├── Dockerfile.app               # PHP-FPM image with extensions
│   │   └── nginx/
│   │       └── docker-laravel.conf      # Nginx site config
│   └── www/
│       └── docker-laravel/              # Laravel project root
│           ├── app/                     # Models, controllers, providers
│           ├── bootstrap/
│           ├── config/
│           ├── database/
│           ├── resources/views/         # Blade templates
│           ├── routes/
│           └── ...
└── README.md
```

## Setup

```bash
git clone https://github.com/Mcc-Mak/docker-laravel.git
cd docker-laravel

# Run at host machine
bash docker-laravel/install
bash docker-laravel/.app.docker

# Inside the app container
composer install
npm install
npm run build

# Back at host machine
bash docker-laravel/restart
```

The app will be available at `http://localhost:8000`.

## Configuration

### Environment

Copy `.env.docker-laravel` to `.env` and set real values for:
- `DB_USERNAME` — MySQL user (default: `change_me`)
- `DB_PASSWORD` — MySQL password (default: `change_me`)

The `install` script does this automatically.

### Inotify watches (Linux)

If file watching fails, increase the limit:

```bash
echo fs.inotify.max_user_watches=524288 | tee -a /etc/sysctl.conf && sysctl -p
```

## Common Commands

| Task | Location | Command |
|------|----------|---------|
| Web server | Container | `php artisan serve --host=0.0.0.0 --port=8080` |
| Web server | Host | `docker exec -u root -w /var/www/docker-laravel docker-laravel-app_1 bash -c "php artisan serve --host=0.0.0.0 --port=8080 > ../serv.log" &` |
| New project | Container | `composer create-project laravel/laravel $PROJECT_NAME` |
| Artisan | Container | `php artisan make:controller $CONTROLLER_NAME` |

## References

- [Laravel Docker Guide](https://phoenixnap.com/kb/laravel-docker)
- [Laravel 11 Blade Docs](https://laravel.com/docs/11.x/blade)

---

## Coding Standards

### Naming Conventions

- **Files and directories:** `snake_case` ASCII (`[a-z0-9_.]` charset — no
  uppercase, hyphens, spaces, or parentheses).
- **Shell variables:** `snake_case` (e.g. `project`, `prefix`).
- **Docker container names:** `docker-laravel-{service}_1` (historical
  convention preserved for compatibility).
- **Nginx config:** `kebab-case` filenames matching the project name.

### Shell Scripts

- Use `$((...))` for arithmetic instead of deprecated `expr` with backticks.
- Quote variable expansions to prevent word-splitting.
- Use `docker compose` (v2 plugin) over deprecated `docker-compose` (v1
  standalone) where available.

### Security

- Never commit `.env` files with real credentials. Track only `.env.example`
  or `.env.docker-laravel` templates with placeholder values.
- Never commit binary artifacts (`database.sqlite`, `serv.log`).
- Use `.gitignore` to exclude environment files, logs, and build outputs.

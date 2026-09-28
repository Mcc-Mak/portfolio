# qr_code

A QR code management web application with login authentication, QR code
generation, and a system administration dashboard (user, project, and access
right management) built with jQuery, Bootstrap 5, FontAwesome 6, SweetAlert2,
CryptoJS, and Tabulator.

## Tech Stack

| Category | Library |
|----------|---------|
| DOM / AJAX | jQuery 3.6.3 |
| UI Framework | Bootstrap 5.3.0 |
| Icons | FontAwesome 6.3.0 |
| Notifications | SweetAlert2 |
| Cryptography | CryptoJS (HmacSHA256, SHA256, Base64) |
| Data Tables | Tabulator (git submodule) |

## File Structure

```
qr_code/
├── index.html              # Login page (HmacSHA256-signed authentication)
├── css/
│   └── index.css           # Login page styles
├── html/
│   ├── index.html          # Dashboard (nav + iframe layout)
│   ├── generate_qr_code.html  # QR code generation view
│   └── iframe_table/
│       ├── table_records.html          # Records table (CRUD model display)
│       ├── .template/
│       │   ├── table_template.php      # Reusable table template
│       │   └── table_sample.php        # Sample table with demo data
│       └── system_administration/
│           ├── table_user_management.html
│           ├── table_project_management.html
│           └── table_access_management.html
├── statics/
│   ├── img/                # Login logo, QR code placeholder, textures
│   └── lib/                # Vendored JS/CSS libraries
│       └── tabulator/      # Git submodule
├── .gitmodules             # Tabulator submodule config
├── .gitignore
└── README.md
```

## Features

- **Login:** SHA256-hashed password + HmacSHA256-signed request to backend API
- **Dashboard:** Tabbed navigation with iframe-based content switching
- **Records:** CRUD-permission model display (C/R/U/D badges with color coding)
- **System Administration:**
  - User Management (username, project, role)
  - Project Management (company name)
  - Access Right Management (role-based CRUD permissions)
- All tables support: inline editing, pagination, column filtering, column
  reordering, history (undo/redo), and row add/delete actions.

## Setup

1. Clone with submodules:
   ```bash
   git clone --recurse-submodules <repo-url>
   ```
2. Serve via a web server with the root mapped to `/qr-code-project/` (e.g.
   nginx, Apache, or `python -m http.server`).
3. Configure the backend login API endpoint in `index.html`
   (`LOGIN_API_URL` constant).

## Security Notes

- Hardcoded default credentials have been removed from the login form.
- The `SECRET_KEY` constant in `index.html` should be set to a secure value
  before deployment.
- All paths use a `/qr-code-project/` base URL — adjust to match your server
  configuration.

---

## Coding Standards

### Naming Conventions

- **Files and directories:** `snake_case` ASCII (`[a-z0-9_.]` charset — no
  uppercase, hyphens, spaces, or parentheses).
- **JavaScript variables:** `camelCase` for locals; `UPPER_SNAKE_CASE` for
  constants (e.g. `SECRET_KEY`, `LOGIN_API_URL`).
- **Functions:** `camelCase` (e.g. `showNotification`, `signString`).
- **CSS classes:** `kebab-case` (e.g. `header-banner`, `btn-primary`).
- **HTML element IDs:** GrapesJS-generated short IDs preserved for
  compatibility; new IDs should use `camelCase`.

### JavaScript

- Use `const` by default; `let` only when reassignment is required. Never use
  `var`.
- Terminate all statements with semicolons.
- Use `===` / `!==` for strict equality comparisons.
- Remove dead code: no commented-out blocks left in production files.
- Declare all constants at the top of the script scope.
- Avoid unused variables in function bodies (e.g. `rowData` in formatters that
  only return static HTML).

### Bug Prevention

- `Array.prototype.includes()` returns a boolean — never use `+=` to add to an
  array; use `.push()`.
- `String.prototype.trim()` takes no arguments — use `.replace()` with a regex
  for targeted character removal.
- `initialSort` column names must match actual `field` values in the data.
- Cryptographic functions must return the encoded string (e.g. Base64), not the
  raw hash object.

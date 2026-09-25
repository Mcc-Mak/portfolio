# springboot_mvc_template

A Spring Boot MVC template demonstrating JSP view resolution, static resource
serving (Bootstrap 5, jQuery 3.6, Tabulator 5.1), and a sample booking
query page with an interactive data table.

## Tech Stack

| Layer    | Technology                          |
|----------|-------------------------------------|
| Backend  | Spring Boot 2.3.12 (Java 8)         |
| View     | JSP (`/WEB-INF/jsp/`)               |
| Frontend | Bootstrap 5, jQuery 3.6, Tabulator 5.1 |
| Build    | Maven (wrapper included)            |

## Project Structure

```
src/main/java/hk/martin/app/springbootmvc/
├── SpringbootMvcApplication.java       # Entry point
└── controller/
    ├── BookingController.java          # GET /api/booking/query
    └── IndexController.java            # GET /index

src/main/resources/
├── application.properties              # JSP prefix/suffix, logging
└── static/
    ├── css/
    │   ├── index.css
    │   └── booking/query.css
    ├── js/
    │   └── booking/query.js            # Tabulator table init
    ├── image/bootstrap-logo.svg
    └── lib/                            # Vendored Bootstrap, jQuery, Tabulator

src/main/webapp/WEB-INF/jsp/
├── index.jsp                           # Landing page
└── booking/query.jsp                   # Booking query with Tabulator table

src/test/java/
└── ApplicationContextTests.java        # Context load smoke test
```

## Getting Started

### Prerequisites

- Java 8+
- Maven 3.6+ (or use the included `mvnw` wrapper)

### Run

```bash
./mvnw spring-boot:run
```

The application starts on `http://localhost:8080`.

### Routes

| Route                | View             | Description              |
|----------------------|------------------|--------------------------|
| `GET /index`         | `index.jsp`      | Landing page             |
| `GET /api/booking/query` | `booking/query.jsp` | Tabulator data table |

### Test

```bash
./mvnw test
```

## Coding Standards

### Java
- **Controllers** use `@GetMapping` / `@PostMapping` instead of
  `@RequestMapping(method = ...)` for readability.
- **Class-level** `@RequestMapping` defines the route prefix; method-level
  annotations define the HTTP verb + path.
- **Lombok** is included for boilerplate reduction; excluded from the final
  jar via `spring-boot-maven-plugin` configuration.
- **Tests** use JUnit 5 (`org.junit.jupiter`); no `@RunWith` needed.
- Package root: `hk.martin.app.springbootmvc`.

### JSP / HTML
- All JSP pages begin with `<!DOCTYPE html>` and `<html lang="en">`.
- Static resource paths are **absolute** from the web root (`/css/...`,
  `/js/...`, `/lib/...`).
- jQuery is loaded from CDN (`cdnjs.cloudflare.com`); Bootstrap and Tabulator
  are served from vendored `/lib/` directories.
- Element IDs must be **unique** within a document (e.g.
  `navbarDropdownBooking`, not repeated `navbarDropdown`).
- No hardcoded credentials or usernames in templates.

### JavaScript
- `const` / `let` preferred over `var`.
- No commented-out dead code.
- Inline comments removed; code should be self-documenting.

### Maven
- Only stable-release repositories (Maven Central via Spring Boot parent).
- No snapshot/milestone repositories unless a pre-release dependency is
  required.
- Unused `dependencyManagement` entries are removed.

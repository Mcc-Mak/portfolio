# Booking Appointment System

A Spring Boot MVC web application for managing booking appointments with role-based
access control (admin/user), CSRF protection, and BCrypt password hashing.

## Tech Stack

| Layer    | Technology                                                      |
|----------|-----------------------------------------------------------------|
| Backend  | Spring Boot 2.3.12, Java 8, Spring Security, MyBatis, JDBC      |
| Database | MySQL 8.0                                                       |
| Frontend | Thymeleaf, Bootstrap 5, jQuery 3.6, Tabulator 5.1, SweetAlert2  |
| Build    | Maven                                                           |

## Prerequisites

- JDK 8
- Maven 3.6+
- MySQL 8.0

## Setup

1. Clone the repository.
2. Create a MySQL database and set the timezone:
   ```
   mysql -uroot -p -e "SET GLOBAL time_zone = '+8:00';"
   ```
3. Configure database credentials via environment variables (see `application.yml`):
   ```
   SPRING_DATASOURCE_URL=jdbc:mysql://localhost:3306/your_db
   SPRING_DATASOURCE_USERNAME=your_user
   SPRING_DATASOURCE_PASSWORD=your_password
   ```

## Build & Run

```
mvn spring-boot:run
```

The application starts on `http://localhost:8080`.

## Project Structure

```
src/main/java/hk/martin/app/springbootmvc/
├── controller/
│   ├── BookingController.java      # Booking query/add/drop endpoints
│   ├── ConfigController.java       # Configuration parameters endpoint
│   ├── IndexController.java        # Main page controller
│   ├── ReportController.java       # Audit log report endpoint
│   ├── UserController.java         # User registration/activate/delete
│   └── service/
│       ├── MysqlService.java       # MySQL connection service
│       ├── SecuredPasswordService.java  # BCrypt password hashing
│       ├── UserService.java        # User data service
│       └── mapper/model/
│           └── UserProfile.java    # User profile model
├── Application.java                # Spring Boot entry point
└── WebSecurityConfig.java          # Spring Security configuration

src/main/resources/
├── application.yml                 # DB config (env-var externalized)
├── static/
│   ├── css/                        # Per-page stylesheets
│   ├── image/                      # Static images
│   ├── js/                         # Per-page JavaScript
│   └── lib/                        # Vendored libraries (jQuery, Bootstrap, etc.)
└── templates/
    ├── _layout.html                # Thymeleaf layout template
    └── blocks/                     # Thymeleaf fragment templates per page
```

## Features

- **Booking management** — query, add, and drop appointments with time-slot validation
- **User management** — register, activate, and delete users (admin only)
- **Configuration** — manage system parameters (admin only)
- **Audit log** — track all operations with timestamps (admin only)
- **Security** — CSRF protection, BCrypt password hashing, role-based authorization
- **Data export** — CSV export for booking queries

## Coding Standards

### Java

- **Classes**: PascalCase (`BookingController`, `UserProfile`)
- **Methods / variables**: camelCase (`addBooking`, `dataListOrg`)
- **Constants**: UPPER_SNAKE_CASE (`FORMATTER_DATE_TIME`, `COLOR_CODE`)
- **Services**: annotated with `@Service`, dependencies injected via `@Autowired`
- **Configuration**: externalized to `application.yml` with env-var defaults
- **Imports**: no duplicates, no unused imports

### JavaScript

- **Variables**: camelCase (`dataListOrg`, `deltaData`)
- **Declaration**: `const` by default, `let` when reassignment is needed (no `var`)
- **Constants**: UPPER_SNAKE_CASE (`COLOR_CODE`)
- **Async**: `async`/`await` with `fetch` or `$.ajax`
- **SweetAlert2**: use `icon:` (not deprecated `type:`)

### HTML

- **DOCTYPE**: every document starts with `<!DOCTYPE html>`
- **Language**: `<html lang="en">`
- **Meta tags**: `<meta charset="UTF-8">` and viewport meta required
- **Asset paths**: absolute (`/js/...`, `/css/...`) not relative
- **Tags/attributes**: lowercase

### CSS

- **Class names**: kebab-case (`list-group-item`, `input-group-text`)

## References

- [Spring Boot](https://spring.io/projects/spring-boot)
- [Tabulator](http://tabulator.info/)
- [Bootstrap](https://getbootstrap.com/)
- [jQuery](https://jquery.com/)
- [SweetAlert2](https://sweetalert2.github.io/)

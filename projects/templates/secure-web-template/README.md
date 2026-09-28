# secure_web_template

A Spring Boot MVC template with Spring Security, MySQL, MyBatis, and FreeMarker/Thymeleaf view rendering. Built around a booking-appointment-system schema with stored procedures and functions.

## Tech Stack

- Java 8, Spring Boot 2.3.12, Spring Security
- MySQL 8.0 (stored procedures + functions)
- MyBatis + PageHelper
- Thymeleaf + FreeMarker templates
- Lombok
- Maven

## Prerequisites

- Ubuntu 20.04 (or equivalent Linux)
- MySQL 8.0
- OpenJDK 8

Run `sys/setup.sh` to install system dependencies and create the MySQL database/user.

## Setup

1. Install system prerequisites:
   ```bash
   bash sys/setup.sh
   ```

2. Initialize the database schema, seed data, functions, and stored procedures:
   ```bash
   cd mysql
   bash setup.sh
   ```

3. Configure database credentials in `src/main/resources/application.yml` (replace `change_me` placeholders).

4. Run the application:
   ```bash
   bash run.sh
   ```

   The app starts on `http://localhost:8080`.

## File Structure

```
secure_web_template/
  pom.xml                              Maven manifest
  run.sh                               Launch script (mvnw spring-boot:run)
  .gitignore
  src/
    main/
      java/com/example/securingweb/
        SecuringWebApplication.java     Entry point
        MvcConfig.java                  MVC view controller config
        WebSecurityConfig.java          Spring Security config (JDBC auth)
        UserController.java             Registration controller
        UserProfile.java                Registration form backing bean
        SecuredPasswordGenerator.java   BCrypt password hashing utility
      resources/
        application.yml                 App config (datasource, FreeMarker)
        templates/
          home.html                     Thymeleaf home page
          hello.html                    Thymeleaf greeting page
          login.html                    Thymeleaf login page
          register.html                 Thymeleaf registration page
          ftl/Index.ftl                 FreeMarker booking summary page
    test/
      java/com/example/securingweb/
        SecuringWebApplicationTests.java  Integration tests (MockMvc)
  mysql/
    .init.basics.sql                    Database + user creation (run once)
    setup.sh                            Schema/data/function/SP initializer
    resources/
      init/
        init.schema.sql                 Table definitions
        init.data.sql                   Seed data
        init.fct.sql                    SQL functions
        init.sp.sql                     Stored procedure (sp_ReserveTimeslot)
        init.calling.sql                SP invocation
      prd/
        setup_prd.sh                    PRD function deployment script
        .prd.test_fct.sql               PRD function test queries
        fct/
          count/prd.booking.sql         countOneBooking function
          count/prd.booking_2.sql       countManyBooking function
          update/prd.booking.sql        addBooking function
          update/prd.booking_2.sql      cancelBooking function
          insert/prd.users.sql          registerUser function
  sys/
    setup.sh                            System + MySQL bootstrap script
```

## API Endpoints

| Method | Path        | Auth Required | Description              |
|--------|-------------|---------------|--------------------------|
| GET    | `/`         | Yes           | Home page                |
| GET    | `/hello`    | Yes           | Greeting page            |
| GET    | `/login`    | No            | Login form               |
| GET    | `/register` | No            | Registration form        |
| POST   | `/register` | No            | Register new user (calls `registerUser` SP) |
| POST   | `/logout`   | Yes           | Logout                   |

## Testing

```bash
bash mvnw test
```

Tests use `@SpringBootTest` with `MockMvc` to verify authentication flow, secured/unsecured resource access, and login validation.

## Coding Standards

- **Access modifiers:** All classes and fields must have explicit access modifiers (`public`/`private`).
- **Logging:** Use SLF4J (`@Slf4j` Lombok annotation). Never use `System.out.println` for logging.
- **Dead code:** No commented-out code. Remove it.
- **Resource management:** Use try-with-resources for `Connection`, `CallableStatement`, and other AutoCloseable resources.
- **Dependency injection:** Use Spring's `@Autowired` for `DataSource` and other beans. Do not hardcode connection strings or credentials in Java source.
- **Credentials:** All usernames and passwords must be placeholders (`change_me`) in committed files. Real credentials are provided at deployment time via `application.yml` or environment variables.
- **Naming:** Directories and files use `snake_case` ASCII. Java classes use `PascalCase`.
- **HTML:** No commented-out HTML blocks. Remove dead markup.

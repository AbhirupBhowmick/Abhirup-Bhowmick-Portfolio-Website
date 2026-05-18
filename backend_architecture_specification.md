# NEURAL_SYNC Backend Specification

## Core Technology Stack
- **Framework:** Spring Boot 3.x
- **Language:** Java 17+
- **Build Tool:** Maven
- **Persistence:** PostgreSQL (Primary), Redis (Caching/Session)
- **Security:** Spring Security with JWT

## Project Structure
```text
src/main/java/com/neuralsync/api/
├── config/             # CORS, Security, Redis, JPA configurations
├── controllers/        # REST API Endpoints
├── services/           # Business Logic Layer
├── models/             # JPA Entities and DTOs
├── repositories/       # Data Access Layer
└── NeuralSyncApplication.java
```

## Dependencies (pom.xml)
- `spring-boot-starter-web`
- `spring-boot-starter-data-jpa`
- `spring-boot-starter-security`
- `spring-boot-starter-data-redis`
- `postgresql` (Driver)
- `lombok` (Boilerplate reduction)

## Configurations
- **Global CORS Filter:** Configured to permit requests from the Next.js frontend.
- **application.yml:** Pre-configured for PostgreSQL and Redis connection pooling.

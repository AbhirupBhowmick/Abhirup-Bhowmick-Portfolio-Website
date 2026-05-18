# NEURAL_SYNC Contact & Resume API Specification

## Endpoint: `POST /api/contact`
Handles inbound technical inquiries and system notifications.

### Request Body
```json
{
  "name": "String",
  "email": "String (Email Format)",
  "subject": "String",
  "message": "String"
}
```

### Spring Boot Implementation Details
- **Controller**: `ContactController` with `@PostMapping("/api/contact")`.
- **Validation**: JSR-303 `@Valid` annotations for non-null fields and email format.
- **Persistence**: `ContactMessage` entity stored in PostgreSQL via `ContactRepository`.
- **Notification**: `EmailService` utilizing `JavaMailSender` (Spring Boot Starter Mail) to forward messages to the operator.
- **Security**: Rate-limiting and CSRF protection enabled.

## Resume Hub Logic
- **Storage**: PDF asset located in `/src/main/resources/static/resume_v4.pdf` or Next.js `/public`.
- **Interaction**: Direct download link with `download` attribute for zero-friction access.

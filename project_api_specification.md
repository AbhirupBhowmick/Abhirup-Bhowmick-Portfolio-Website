# NEURAL_SYNC Project API Specification

## Endpoint: `GET /api/projects`
Returns a collection of engineering projects with deep technical metadata.

### Project Model
```json
{
  "id": "uuid",
  "title": "String",
  "description": "String (Markdown supported)",
  "techStack": ["String"],
  "links": {
    "github": "URL",
    "live": "URL"
  },
  "architecture": {
    "overview": "String",
    "diagramData": "JSON/SVG Reference",
    "keyDecisions": ["String"],
    "performanceMetrics": {
      "latency": "String",
      "throughput": "String"
    }
  }
}
```

## Spring Boot Implementation Details
- **Controller:** `ProjectController` with `@GetMapping("/api/projects")`.
- **Service:** `ProjectService` fetching from `ProjectRepository`.
- **Security:** Public read access, JWT-protected write/delete.
- **CORS:** Configured for the Next.js origin as per global config.
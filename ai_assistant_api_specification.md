# AI Assistant API Specification

## Endpoint: `POST /api/chat`
Facilitates real-time communication with the Gemini-powered personal agent.

### Request Body
```json
{
  "message": "String",
  "history": [
    {
      "role": "user | assistant",
      "content": "String"
    }
  ]
}
```

### System Prompt Configuration
The backend service (`GeminiChatService`) injects a comprehensive system context:
- **Role**: Technical Persona (OPERATOR_01).
- **Knowledge Base**: Full resume data, project architectures (Quantum Router, Data Vault), and the Skill Matrix (Spring Boot, Next.js, Three.js).
- **Tone**: Professional, technical, efficient, and futuristic.

### Spring Boot Implementation
- **Service**: `ChatService` utilizing Google AI Java SDK or REST templates for Gemini API.
- **Controller**: `ChatController` exposing `/api/chat`.
- **Security**: Rate-limited endpoint with JWT validation.

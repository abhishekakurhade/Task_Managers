# API Docs (optional backend)

## GET /health
Healthcheck endpoint.

### POST /send-reminders
Protected endpoint (implement auth) that would locate due tasks and send FCM notifications.
Payload: none
Response: { sent: number }

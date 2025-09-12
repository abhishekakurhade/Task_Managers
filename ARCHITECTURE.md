# Architecture

- Frontend: React (single-page app) using Firebase Authentication and Firestore for realtime data.
- Data model:
  - Collection: users/{uid}/tasks/{taskId}
  - Task fields: title, description, status, dueDate, createdAt, updatedAt
- Security: Firestore rules restrict reads/writes to authenticated users matching the uid.
- Optional backend: Node/Express hosted on Render (for cron jobs or FCM server-side operations).

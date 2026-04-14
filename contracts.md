# API Contracts — Mayank Arora Portfolio

## Architecture
- Backend seeds MongoDB with portfolio content on startup (if empty)
- Frontend fetches all sections via a single GET endpoint
- Contact form sends messages via POST endpoint

## Endpoints

### GET /api/portfolio
Returns all portfolio sections in one payload.
```json
{
  "personalInfo": { ... },
  "aboutContent": { ... },
  "skillsData": { ... },
  "projectsData": { ... },
  "labsData": { ... },
  "freelanceData": { ... },
  "dsaData": { ... },
  "timelineData": { ... },
  "hobbiesData": { ... },
  "contactData": { ... },
  "navLinks": [ ... ]
}
```
Shape matches mock.js exactly.

### POST /api/contact
```json
Request:  { "name": "string", "email": "string", "message": "string" }
Response: { "success": true, "id": "string" }
```

## MongoDB Collections
- `portfolio` — single document with all sections
- `messages` — contact form submissions

## Frontend Integration
- Replace mock.js imports with a React context/provider that fetches `/api/portfolio`
- Show loading skeleton while data loads
- Fallback to mock data if API fails
- Contact section gets a form that POSTs to `/api/contact`

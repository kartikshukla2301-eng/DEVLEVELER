# Job Agent Profile API

Exposes a scoped, read-only snapshot of a candidate's verified profile to the
separate "AI Job Application Agent" project, matching that project's locked
architecture (Section 5: `ProfileSource` / `DevLevelerProfileSource`).

## Endpoint

```
GET /api/v1/me/job-agent-profile
Authorization: Bearer <token>
```

Returns:

```json
{
  "schema_version": 1,
  "profile_version": 1763400000,
  "synced_at": "2026-11-17T12:00:00.000Z",
  "candidate": {
    "name": "...",
    "email": "...",
    "education": [],
    "experience": [],
    "skills": [],
    "projects": [],
    "links": { "github": null, "linkedin": null, "twitter": null }
  },
  "preferences": { "roles": [], "locations": [], "work_modes": [], "levels": [] }
}
```

`candidate.*` fields are read from your most recently updated `Resume` row
(`education`/`experience`/`skills`/`projects` — already structured JSON there
from resume parsing). `preferences` is always empty today: DevLeveler does not
yet model structured job-search preferences, and nothing here is guessed to
fill the gap — the Job Agent side treats missing preferences as unknown, not
as an invented default.

## Auth model

A dedicated `ApiToken` table (`prisma/schema.prisma`), separate from Auth.js
sessions:

- One row per issued token, scoped to `profile:read` (no write access exists
  through this endpoint — the route handler never accepts anything but `GET`).
- Only a SHA-256 hash of the token is stored; the raw value is shown exactly
  once, at creation time, and is not recoverable afterwards.
- A token keeps working until manually revoked (set `revokedAt`) — there is no
  UI for this yet; use Prisma Studio (`npx prisma studio`) or a direct SQL
  update if you ever need to revoke one.

## Issuing a token

```bash
npx tsx scripts/create-job-agent-token.ts you@example.com
```

Copy the printed value into the Job Agent project's `.env`:

```
DEVLEVELER_PROFILE_URL=https://devleveler.vercel.app/api/v1/me/job-agent-profile
DEVLEVELER_READ_TOKEN=<the printed token>
```

## Applying the schema change

This adds one new table (`ApiToken`) and one relation field on `User`
(`apiTokens`). No existing table, column, or data is modified. Apply it with:

```bash
npx prisma db push
```

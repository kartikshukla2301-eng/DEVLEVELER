<div align="center">

# DevLeveler

> AI-powered developer intelligence platform that turns GitHub, resumes, portfolios, projects, and skills into actionable career intelligence.

[![Live Demo](https://img.shields.io/badge/Live-devleveler.vercel.app-blue?logo=vercel)](https://devleveler.vercel.app/)
[![GitHub](https://img.shields.io/badge/GitHub-kartikshukla2301--eng-181717?logo=github)](https://github.com/kartikshukla2301-eng/DEVLEVELER)
[![LinkedIn](https://img.shields.io/badge/LinkedIn-kartik--shukla--cse-0A66C2?logo=linkedin)](https://www.linkedin.com/in/kartik-shukla-cse)

[![Next.js](https://img.shields.io/badge/Next.js-15.5-black?logo=next.js)](https://nextjs.org/)
[![React](https://img.shields.io/badge/React-19.1-61DAFB?logo=react)](https://react.dev/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5-3178C6?logo=typescript)](https://www.typescriptlang.org/)
[![PostgreSQL](https://img.shields.io/badge/PostgreSQL-Neon-336791?logo=postgresql)](https://neon.tech/)
[![Prisma](https://img.shields.io/badge/Prisma-6-2D3748?logo=prisma)](https://www.prisma.io/)
[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](LICENSE)

</div>

---

<div align="center">
  <img src="docs/screenshots/landing.png" width="920" alt="DevLeveler — AI-Powered Developer Intelligence" />
</div>

---

## What is DevLeveler?

Developers generate rich signals across GitHub activity, resumes, portfolio sites, and side projects — but those signals stay disconnected. There's no single place to understand where you actually stand, what's missing, or what to build next.

DevLeveler closes that gap. It ingests GitHub telemetry, parses resumes for ATS signals, audits portfolio websites, and performs architectural reviews on repositories — then synthesizes everything into a composite **Developer Score**, quantified **role readiness**, and a personalized **career roadmap**.

---

## Product Preview

<div align="center">
  <img src="docs/screenshots/features.png" width="920" alt="DevLeveler — Problems & Solutions" />
</div>

---

## Features

| | |
|---|---|
| **Developer Intelligence** | 5-vector composite score + strengths/gaps synthesis |
| **GitHub Intelligence** | Repo health, commit cadence, language breakdown, star/fork ratios |
| **Resume / ATS Analysis** | PDF parsing, keyword extraction, ATS scoring, improvement suggestions |
| **Portfolio Audit** | Performance, SEO, mobile, design, and accessibility scoring |
| **Project Analysis** | Architecture, documentation, maintainability, and scalability review |
| **Career Readiness** | Quantified indices: Entry-Level, Full-Stack, Frontend, Backend |
| **Skill Gap Analysis** | Maps current skills against target roles, surfaces missing requirements |
| **Personalized Roadmap** | Weekly/monthly sprint goals, toolchain recs, project ideas |
| **Interview Preparation** | Technical, HR, and project-based question generation |
| **AI Career Coach** | Conversational mentor for career transitions and technical guidance |
| **XP & Achievements** | Gamified progression with unlockable badges and level milestones |
| **Public Developer Profiles** | Shareable `/u/[username]` cards with verified scores and top repos |
| **Recruiter Portal** | Filter and discover developers by score, skills, and readiness |
| **Admin Portal** | System telemetry, user activity, and AI usage statistics |

---

## Tech Stack

| Layer | Technology |
|---|---|
| **Framework** | Next.js 15 (App Router, Server Actions, Turbopack) |
| **UI** | React 19, TypeScript 5, Tailwind CSS 4, Motion, Recharts |
| **Backend** | Next.js Server Actions, Route Handlers |
| **Database** | PostgreSQL via Neon (serverless) |
| **ORM** | Prisma 6 |
| **Auth** | Auth.js v5 — Google OAuth, GitHub OAuth, Credentials (bcrypt) |
| **AI** | Gemini, OpenAI, OpenRouter via unified provider facade |
| **Validation** | Zod 4 |

---

## Architecture

```
Browser
  ↓
Next.js App Router (Server + Client Components)
  ↓
Server Actions / Route Handlers
  ↓
Business Logic  (Zod validation · Rate Limiting)
  ├── AI Provider Layer  (Gemini / OpenAI / OpenRouter)
  │     ├── AICache  (in-memory + PostgreSQL, SHA-256 keys)
  │     └── AIUsageLog  (token + cost tracking per call)
  ├── Auth.js v5  (JWT sessions · Edge-safe middleware)
  └── Prisma ORM
        ↓
   Neon PostgreSQL
```

Auth config is split across `auth.config.ts` (Edge-safe, no Node deps) and `auth.ts` (Node runtime with Prisma adapter). Middleware imports only the Edge-safe config — keeping the Edge bundle lightweight and cold-starts fast.

---

## AI Engine

All AI calls route through a unified provider facade (`src/lib/ai`). Feature code calls `ai().generateContent()` — the registry resolves the active provider from `AI_PROVIDER` at runtime, making provider switching zero-touch.

Every call passes through `executeWithObservabilityAndCache()`:
- **Cache check**: SHA-256 deterministic key → in-memory → PostgreSQL `AICache`
- **Cache miss**: calls provider, writes response to both tiers
- **Always**: logs provider, model, input/output tokens, cost, latency, and cache hit to `AIUsageLog`

Feature TTLs: Roadmap/Resume → 7 days · Skill Gap/Portfolio → 3 days · Readiness/Interview → 24 hours.

---

## Security & Performance

- Auth.js JWT sessions with Edge middleware guarding `/dashboard/*`
- Server-side session check inside every Server Action before any DB access
- Zod schema validation on all inputs and environment variables at startup
- Sliding-window rate limiter: AI (5/hr), Analysis (3/hr), Auth (5/15 min), Settings (10/hr)
- `sanitizeForAI` strips system command prefixes and caps prompt input at 5,000 chars
- HTML/script tag stripping; `http(s):`-only URL enforcement via `sanitizeUrl`
- Duplicate submission cooldown; typed error returns (no internals exposed to client)
- Targeted Prisma `select` fields — no over-fetching
- GitHub OAuth sync runs async on login — user redirects immediately, no blocking

---

## Run Locally

```bash
git clone https://github.com/kartikshukla2301-eng/DEVLEVELER.git
cd DEVLEVELER
npm install
cp .env.example .env.local   # fill in credentials
npx prisma db push
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

**Environment variables:**

| Variable | Purpose |
|---|---|
| `DATABASE_URL` | Neon PostgreSQL connection URL |
| `AUTH_SECRET` | Auth.js session encryption secret |
| `AUTH_GOOGLE_ID` / `AUTH_GOOGLE_SECRET` | Google OAuth app credentials |
| `GEMINI_API_KEY` / `OPENAI_API_KEY` / `OPENROUTER_API_KEY` | At least one required |
| `NEXT_PUBLIC_APP_URL` | App base URL (`http://localhost:3000` for local) |
| `GITHUB_TOKEN` | Optional — raises GitHub API rate limit |

**OAuth production callbacks:**
```
https://devleveler.vercel.app/api/auth/callback/google
https://devleveler.vercel.app/api/auth/callback/github
```

---

## Pricing

| Tier | Price | Access |
|---|---|---|
| Free | $0 | GitHub analysis, resume audit, developer score, basic roadmap, XP & achievements |
| Pro | $3 / 6 months | Unlimited AI, Career Coach, Interview Prep, advanced intelligence, premium themes |
| Early Adopter | Free Pro | First 5 accounts receive Pro automatically |

---

## Contributing

```bash
git checkout -b feature/your-feature
npx tsc --noEmit && npm run lint
# open a PR against main
```

---

<div align="center">

**Kartik Shukla** · [GitHub](https://github.com/kartikshukla2301-eng) · [LinkedIn](https://www.linkedin.com/in/kartik-shukla-cse) · [Portfolio](https://kartik-portfolio-chi-eight.vercel.app) · [kartikshukla2301@gmail.com](mailto:kartikshukla2301@gmail.com)

MIT License · © 2026 Kartik Shukla

</div>

# DevLeveler

> AI-powered developer intelligence platform for understanding where you are, what you're missing, and what to build next.

[![Next.js](https://img.shields.io/badge/Next.js-15.5.19-black?logo=next.js)](https://nextjs.org/)
[![React](https://img.shields.io/badge/React-19.1.0-blue?logo=react)](https://react.dev/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.0-3178C6?logo=typescript)](https://www.typescriptlang.org/)
[![PostgreSQL](https://img.shields.io/badge/PostgreSQL-Neon-336791?logo=postgresql)](https://neon.tech/)
[![Prisma](https://img.shields.io/badge/Prisma-6.19.3-2D3748?logo=prisma)](https://www.prisma.io/)
[![Auth.js](https://img.shields.io/badge/Auth.js-v5.0.0--beta.31-purple?logo=nextdotjs)](https://authjs.dev/)
[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](LICENSE)

[Live Demo](https://devleveler.vercel.app/) • [GitHub Repository](https://github.com/kartik-shukla2301-eng/DevLeveler)

---

## 1. Why DevLeveler

Developers possess rich signals across GitHub repositories, resumes, portfolio websites, and project codebases. However, these signals remain fragmented. Hiring managers, recruiters, and developers themselves struggle to quantify true engineering capability, identify technical debt in personal projects, or determine exact skill gaps for targeted roles.

DevLeveler aggregates these isolated data points into a unified **Developer Intelligence Layer**, translating raw telemetry into quantified scoring, role readiness metrics, and tailored growth roadmaps.

```
  GitHub Activity
        +
   Resume Data
        +
 Portfolio Audits   ──►  Developer Intelligence  ──►  Developer Score + Skill Gaps
        +                       Engine                + Role Readiness + Roadmap
  Project Audits
        +
 Technical Skills
```

---

## 2. What It Does

| Feature | What It Does |
|---|---|
| **Developer Intelligence** | Synthesizes multi-source telemetry into a 5-vector evaluation score (0-100) and capability analysis. |
| **GitHub Intelligence** | Analyzes public repository health, commit velocity, star counts, fork ratios, and polyglot language breakdown. |
| **Resume / ATS Analysis** | Parses PDF/text resumes to extract skills, calculate ATS compatibility, and identify missing technical keywords. |
| **Portfolio Audit** | Evaluates personal portfolio URLs for mobile responsiveness, performance, design clarity, and accessibility. |
| **Project Analysis** | Performs repository architectural code audits, scoring maintainability, documentation, and folder structure. |
| **Skill Gap Analysis** | Compares current developer competencies against target engineering roles to highlight missing stack requirements. |
| **Career Readiness** | Calculates quantified readiness indices for Entry-Level, Graduate, Full-Stack, Frontend, and Backend positions. |
| **Personalized Roadmap** | Generates structured weekly and monthly milestone sprints alongside tailored project concepts. |
| **Interview Preparation** | Conducts simulated technical, HR, and project-based interview drills with automated answer evaluation. |
| **AI Career Coach** | Provides an interactive conversational guide for career transitions, code reviews, and architectural decisions. |
| **XP & Achievements** | Gamifies developer growth by awarding XP and unlockable badges for telemetry syncs and score milestones. |
| **Public Developer Profiles** | Generates shareable developer cards (`/u/[username]`) displaying verified scores, metrics, and top repositories. |
| **Notifications System** | Delivers real-time in-app alerts for score changes, roadmap progress, and unlocked achievements. |
| **Recruiter Portal** | Enables recruiters to search and filter developers by score tiers, verified skill sets, and role readiness. |
| **Admin Portal** | Displays system-wide telemetry, user activity metrics, registered accounts, and AI usage statistics. |

---

## 3. Product Highlights

![DevLeveler Dashboard Overview](stitch_reference/devleveler_overview/screen.png)

### Developer Intelligence Engine
Combines GitHub activity, resume data, project audits, and self-reported skills into a composite Developer Score. It generates a 5-axis capability radar (GitHub, Project, Skill, Resume, Deployment) alongside primary strengths and tactical gaps.

![Developer Intelligence Synthesis](stitch_reference/developer_intelligence/screen.png)

### GitHub Intelligence
Fetches public repository telemetry via GitHub API integrations. It calculates commit activity scores, repository health metrics, star/fork ratios, and language distribution graphs without blocking sign-in flows.

![GitHub Intelligence Telemetry](stitch_reference/github_intelligence/screen.png)

### Resume Intelligence
Parses uploaded resumes (`pdf-parse`), extracts structural sections (education, experience, skills, projects), and evaluates hiring manager readability alongside ATS keyword matching against market standards.

### Career Roadmap & Readiness Matrix
Translates identified skill gaps into time-bound weekly learning objectives, recommended toolchains, and hands-on project ideas designed to elevate developer scores.

![Career Readiness and Skill Matrix](stitch_reference/readiness_skills/screen.png)

### AI Career Coach
An interactive chat interface backed by the unified AI layer, configured to provide contextual architectural advice, interview strategy, and technical mentorship.

---

## 4. Tech Stack

| Layer | Technology | Purpose / Notes |
|---|---|---|
| **Framework** | Next.js `15.5.19` | App Router, Server Actions, Route Handlers, Turbopack |
| **UI Library** | React `19.1.0` | React 19 Concurrent features, Server Components |
| **Language** | TypeScript `5.x` | Strict type safety across client, server, and database |
| **Styling** | Tailwind CSS `4.0` | Modern CSS styling and utility classes |
| **Database** | PostgreSQL + Neon | Serverless relational database hosting |
| **ORM** | Prisma `6.19.3` | Schema definition, migrations, type-safe database queries |
| **Authentication** | Auth.js `v5.0.0-beta.31` | Google OAuth, GitHub OAuth, Credentials provider, JWT sessions |
| **Adapter** | `@auth/prisma-adapter` `2.11.2` | Database persistence adapter for Auth.js sessions and accounts |
| **AI Layer** | Multi-Provider Engine | Unified provider facade supporting OpenRouter, OpenAI, and Gemini |
| **Validation** | Zod `4.4.3` | Strict runtime input validation for server actions and env |
| **Visualization** | Recharts `3.8.1` | Interactive telemetry graphs, radar charts, and score trends |
| **Animations** | Motion `12.40.0` | Smooth UI transitions and interactive visual effects |
| **PDF Parser** | `pdf-parse` `2.4.5` | Server-side text extraction from uploaded resume PDFs |
| **Security & Utilities** | `bcryptjs` `3.0.3` | Password hashing for credentials-based authentication |

---

## 5. Architecture

```
                               Browser Client
                                     │
                                     ▼
                            Next.js App Router
                                     │
             ┌───────────────────────┼───────────────────────┐
             ▼                       ▼                       ▼
      Server Components       Client Components       Server Actions
             │                       │                       │
             └───────────────────────┼───────────────────────┘
                                     │
                                     ▼
                            Business Logic Layer
                           (Rate Limiting & Zod)
                                     │
             ┌───────────────────────┴───────────────────────┐
             ▼                                               ▼
         Prisma ORM                                      AI Engine
             │                                        (Provider Facade)
             ▼                                               │
    PostgreSQL (Neon)                                 ┌──────┼──────┐
                                                      ▼      ▼      ▼
                                                   Gemini  OpenAI OpenRouter
```

### Edge-Safe Auth.js v5 Architecture
To optimize cold-start latency and keep Edge runtime bundles lightweight, DevLeveler decouples Auth.js configuration across three files:

1. **`src/auth.config.ts`**: Contains lightweight, Edge-compatible callbacks, page definitions, and JWT session strategies. Imports no Node.js dependencies, Prisma, or bcrypt.
2. **`src/auth.ts`**: Executes solely in the Node.js server environment. Extends `authConfig` with Prisma database adapters, bcrypt credential authorization, and non-blocking background GitHub syncs.
3. **`src/middleware.ts`**: Mounts `authConfig` onto Next.js middleware for instant, low-latency route protection (`/dashboard/*`) on the Edge.

---

## 6. AI Architecture

DevLeveler decouples application business logic from specific AI provider SDKs using a unified provider facade (`src/lib/ai`).

```
 Server Action / Feature
            │
            ▼
   ai() Abstraction Facade (src/lib/ai/index.ts)
            │
            ▼
   Provider Registry (Gemini / OpenAI / OpenRouter)
            │
            ▼
 executeWithObservabilityAndCache()
            │
    ┌───────┴────────┐
    ▼                ▼
Cache Hit?      Cache Miss?
    │                │
    ├─► Return       ├─► Call Provider API
    │   Cached       │          │
    │   Response     │          ▼
    │                ├─► Log Token & Cost (AIUsageLog)
    │                │          │
    │                ├─► Persist to Cache (AICache)
    │                │          │
    └────────────────┴─► Return Parsed & Validated Result
```

Features request AI completion through `ai().generateContent()`. The abstraction routes requests to the configured provider (`AI_PROVIDER`), executes standard retry wrappers, parses JSON payloads using strict fallback extractors, and returns strongly-typed results.

---

## 7. AI Cost & Caching

To prevent unnecessary API spend and maintain sub-second response times for identical analyses, DevLeveler incorporates an **Observability & Smart Caching Layer**.

### Caching Mechanism (`AICache`)
- **Deterministic Key Generation**: Hashes request params (`feature`, `provider`, `model`, `userId`, `promptVersion`, `context`) using SHA-256 (`src/lib/ai/cache.ts`).
- **Two-Tier Cache Strategy**: Combines a fast in-memory Map for hot process reads with persistent PostgreSQL storage via Prisma (`AICache`).
- **Feature-Specific TTLs**:
  - `ROADMAP`: 7 Days
  - `RESUME`: 7 Days
  - `SKILL_GAP`: 3 Days
  - `PORTFOLIO`: 3 Days
  - `READINESS`: 24 Hours
  - `INTERVIEW`: 24 Hours

### Observability & Cost Accounting (`AIUsageLog`)
Every external AI call logs precise metrics into PostgreSQL:
- Input/output token usage & estimated cost calculation (`src/lib/ai/pricing.ts`).
- Execution latency in milliseconds (`latencyMs`).
- Latency status (`SUCCESS` / `FAILED`) and error codes.
- Cache hit tracking (`cacheHit`) and monetary savings calculated per request (`costSaved`).

---

## 8. Database Architecture

DevLeveler utilizes **PostgreSQL hosted on Neon** paired with **Prisma ORM**. Authorization is enforced at the application level inside Server Actions and API routes.

```
┌───────────────────┐       ┌───────────────────┐       ┌───────────────────┐
│       User        │───────│   Account/Session │───────│   GitHubProfile   │
└───────────────────┘       └───────────────────┘       └───────────────────┘
          │                           │                           │
          ├───► Resume                ├───► PortfolioAnalysis     ├───► ProjectAnalysis
          ├───► DeveloperScore        ├───► InterviewSession      ├───► SkillGap
          ├───► ReadinessAnalysis     ├───► Roadmap               ├───► Notification
          ├───► DeveloperIntelReport  ├───► UserAchievement       ├───► XPHistory
          └───► AIUsageLog            └───► AICache               └───► LinkedInAnalysis
```

### Primary Data Domains
- **Identity & Auth**: `User`, `Account`, `Session`, `VerificationToken`
- **Developer Telemetry**: `GitHubProfile`, `Resume`, `PortfolioAnalysis`, `ProjectAnalysis`, `LinkedInAnalysis`
- **Intelligence & Scoring**: `DeveloperScore`, `ScoreHistory`, `SkillGap`, `ReadinessAnalysis`, `DeveloperIntelligenceReport`
- **Growth & Guidance**: `Roadmap`, `InterviewSession`, `UserAchievement`, `XPHistory`, `Notification`
- **AI Infrastructure**: `AIUsageLog`, `AICache`

---

## 9. Security & Reliability

- **Authentication Guards**: Route protection via Edge middleware (`/dashboard/*`) combined with server-side session checks in Server Actions.
- **Input Validation**: Strict runtime schema parsing using `zod` across all forms, actions, and environment variables.
- **Sliding-Window Rate Limiting**: In-memory rate limiter (`src/lib/rate-limit.ts`) enforcing limits across AI actions (5/hr), code analyses (3/hr), auth attempts (5/15m), and profile updates (10/hr).
- **Prompt Injection Defense**: Input sanitizer (`sanitizeForAI`) strips system command prefixes, code block tokens, and limits prompt text length to 5,000 characters.
- **Sanitization Utilities**: `sanitizeText` strips HTML/Script tags, and `sanitizeUrl` enforces strict `http:`/`https:` protocols to prevent XSS and SSRF.
- **Duplicate Submission Protection**: Memory-backed cooldown tracker prevents repeated rapid server action triggers.
- **Typed Error Handling**: Centralized `safeErrorMessage` prevents internal system tracebacks or database errors from exposing to the client.

---

## 10. Performance Optimizations

- **React 19 Server Components**: Renders heavy data layouts server-side, shipping minimal JavaScript to the client.
- **Targeted Prisma Selects**: Queries extract only required column fields, minimizing database payload overhead.
- **Asynchronous Non-Blocking Tasks**: GitHub profile imports trigger asynchronously during OAuth login, redirecting the user immediately without waiting for API syncs.
- **Dual-Tier Response Caching**: In-memory fast tier bypasses DB calls for hot repetitive AI requests.
- **Lightweight Middleware**: Auth middleware executes without loading Prisma or Node-native packages on Edge routers.
- **Client Component Memoization**: React components (`React.memo`) isolate re-renders during high-frequency UI state changes.

---

## 11. Project Structure

```
DevLeveler/
├── prisma/
│   └── schema.prisma         # Relational database models (19 models)
├── public/                   # Static branding assets and images
├── src/
│   ├── actions/              # Server Actions (auth, score, resume, roadmap, etc.)
│   ├── app/                  # Next.js App Router (pages, layouts, API routes)
│   │   ├── (auth)/           # Authentication routes (/login, /signup)
│   │   ├── (dashboard)/      # Protected dashboard routes (/dashboard/*)
│   │   ├── api/              # Route Handlers (/api/auth/*)
│   │   └── u/[username]/     # Shareable public developer profiles
│   ├── components/           # Modular UI components (dashboard, landing, ui)
│   ├── lib/                  # Core services & utilities
│   │   ├── ai/               # Unified AI engine, provider registry, caching, observability
│   │   ├── env.ts            # Environment variable validation schema
│   │   ├── github.ts         # GitHub API client & telemetry extractor
│   │   ├── prisma.ts         # Global Prisma client singleton
│   │   ├── rate-limit.ts     # Sliding window rate limiter
│   │   ├── security.ts       # Text/URL sanitization & prompt protection
│   │   └── xp.ts             # Gamification XP algorithms & leveling logic
│   ├── types/                # Shared TypeScript definitions
│   ├── auth.config.ts        # Lightweight Edge-safe Auth.js config
│   ├── auth.ts               # Complete Node.js Auth.js initialization
│   └── middleware.ts         # Edge route protection middleware
├── .env.example              # Template for local environment variables
├── next.config.ts            # Next.js configuration settings
├── package.json              # Project dependencies and scripts
└── README.md                 # Project documentation
```

---

## 12. Local Development

### Prerequisites
- Node.js `20.x` or higher
- npm `10.x` or higher
- PostgreSQL instance (e.g. [Neon Serverless PostgreSQL](https://neon.tech))

### Installation & Setup

1. **Clone the repository**:
   ```bash
   git clone https://github.com/kartik-shukla2301-eng/DevLeveler.git
   cd DevLeveler
   ```

2. **Install dependencies**:
   ```bash
   npm install
   ```

3. **Configure environment variables**:
   ```bash
   cp .env.example .env.local
   ```
   *Fill in required credentials inside `.env.local`.*

4. **Synchronize database schema**:
   ```bash
   npx prisma db push
   ```

5. **Start the development server**:
   ```bash
   npm run dev
   ```
   Open [http://localhost:3000](http://localhost:3000) in your browser.

### Verification Commands
```bash
# Type check TypeScript codebase
npx tsc --noEmit

# Run ESLint check
npm run lint

# Build production bundle
npm run build
```

---

## 13. Environment Variables

| Variable | Required | Purpose |
|---|:---:|---|
| `DATABASE_URL` | **Yes** | PostgreSQL connection URL |
| `DIRECT_URL` | Optional | Direct PostgreSQL URL for Prisma migrations |
| `AUTH_SECRET` | **Yes** | Auth.js secret key for session encryption |
| `AUTH_GOOGLE_ID` | **Yes** | Google OAuth Client ID |
| `AUTH_GOOGLE_SECRET` | **Yes** | Google OAuth Client Secret |
| `GEMINI_API_KEY` | Conditional* | Google Gemini API Key |
| `OPENAI_API_KEY` | Conditional* | OpenAI API Key |
| `OPENROUTER_API_KEY` | Conditional* | OpenRouter API Key |
| `AI_PROVIDER` | Optional | Active AI provider (`gemini`, `openai`, `openrouter`) |
| `AI_MODEL` | Optional | Specific model override |
| `GITHUB_TOKEN` | Optional | Personal access token for higher GitHub API rate limits |
| `NEXT_PUBLIC_APP_URL` | **Yes** | Application base URL (default: `http://localhost:3000`) |

*\* At least one AI provider API key (`GEMINI_API_KEY`, `OPENAI_API_KEY`, or `OPENROUTER_API_KEY`) is required.*

---

## 14. Authentication

DevLeveler implements **Auth.js v5** using JWT session strategies.

### Supported Authentication Methods
1. **Google OAuth**: One-click social sign-in.
2. **GitHub OAuth**: Social sign-in with automatic background telemetry import.
3. **Credentials**: Email and password registration with `bcryptjs` password hashing (8+ chars, letter and number required).

### Production Callback URLs
When deploying to production, register these callback URLs in your OAuth app settings:
- Google OAuth: `https://devleveler.vercel.app/api/auth/callback/google`
- GitHub OAuth: `https://devleveler.vercel.app/api/auth/callback/github`

---

## 15. Deployment

DevLeveler is configured for seamless deployment on **Vercel** connected to **Neon PostgreSQL**.

- **Production URL**: [https://devleveler.vercel.app/](https://devleveler.vercel.app/)
- **Hosting Platform**: Vercel App Router Serverless Functions
- **Database**: Neon Serverless PostgreSQL

Ensure all environment variables listed in Section 13 are configured in your Vercel Project Settings prior to deployment.

---

## 16. Pricing

| Tier | Price | Features |
|---|---|---|
| **Free** | `$0` | Standard Developer Score, GitHub sync, basic resume & portfolio analysis, basic roadmap, XP & achievements. |
| **Pro** | `$3` / 6 Months | Unlimited AI analysis, AI Career Coach, AI Career Roadmaps, AI Interview Prep, advanced intelligence reports, premium themes. |
| **Early Adopter Program** | **Free Pro** | First 5 registered accounts receive 6 months of Pro access automatically. |

---

## 17. Engineering Roadmap

- [ ] Automated end-to-end testing suite (Playwright / Vitest)
- [ ] Automated CI/CD workflow pipeline via GitHub Actions
- [ ] Dedicated email notification service integration (Resend / SendGrid)
- [ ] Automated payment gateway integration (Stripe / Razorpay)
- [ ] Advanced AI cost analytics & exportable developer intelligence PDFs

---

## 18. Engineering Highlights

1. **Provider-Agnostic AI Architecture**: Abstracted provider facade allows swapping between Gemini, OpenAI, and OpenRouter without changing business actions.
2. **Edge-Safe Auth Middleware Split**: Separating auth configuration keeps the Edge middleware bundle small while running Prisma and bcrypt securely in Node runtime.
3. **Two-Tier Response Caching**: In-memory fast tier combined with PostgreSQL persistence minimizes duplicate AI calls and lowers API spend.
4. **Non-Blocking Telemetry Synchronization**: Asynchronous processing allows GitHub profile imports to run in the background without delaying user login redirects.
5. **Observability & Spend Accounting**: Logs detailed token usage, latencies, and dollar costs per operation into PostgreSQL.
6. **Defense-in-Depth Security**: Combines sliding-window rate limiting, text sanitization, prompt injection stripping, and typed server action returns.

---

## 19. Contributing

1. **Fork** the repository.
2. **Create** a feature branch (`git checkout -b feature/amazing-feature`).
3. **Commit** your changes (`git commit -m "feat: add amazing feature"`).
4. **Verify** types, linting, and build (`npx tsc --noEmit && npm run lint && npm run build`).
5. **Open** a Pull Request against `main`.

---

## 20. License & Author

Distributed under the **MIT License**. See `LICENSE` for details.

**Kartik Shukla**  
*B.Tech Computer Science & Engineering*

- **GitHub**: [github.com/kartik-shukla2301-eng](https://github.com/kartik-shukla2301-eng)
- **LinkedIn**: [linkedin.com/in/kartik-shukla-cse](https://www.linkedin.com/in/kartik-shukla-cse)
- **Portfolio**: [kartik-portfolio-chi-eight.vercel.app](https://kartik-portfolio-chi-eight.vercel.app)
- **Email**: [kartikshukla2301@gmail.com](mailto:kartikshukla2301@gmail.com)

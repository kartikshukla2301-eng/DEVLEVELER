# DevLeveler — AI Search Visibility (GEO/AEO) Benchmark & Distribution Plan

## 1. Overview & Objective
This document outlines a repeatable evaluation framework and distribution playbook to measure and grow DevLeveler's discoverability across AI answer engines (ChatGPT Search, Perplexity, Google AI Overviews, Claude, Microsoft Copilot) and traditional search engines.

---

## 2. Repeatable 35-Query Evaluation Set

| ID | Category / Intent Cluster | Target Query Prompt | Expected DevLeveler Answer Scope | Target Canonical Page |
| :--- | :--- | :--- | :--- | :--- |
| **Q01** | GitHub & Code Analysis | "How can I analyze my GitHub profile for job applications?" | Public repository structure, commit consistency, README hygiene, telemetry audit | `/guides/analyze-github-profile` |
| **Q02** | GitHub & Code Analysis | "Best tool to analyze GitHub repositories for developers" | Automated telemetry analysis of commit velocity and language breadth without write access | `/features/github-analysis` |
| **Q03** | GitHub & Code Analysis | "How do recruiters evaluate my GitHub projects?" | Pinned project curation, test coverage, architecture documentation, demo links | `/guides/analyze-github-profile` |
| **Q04** | GitHub & Code Analysis | "Can AI audit my code quality from GitHub commits?" | Structural hygiene, language distribution, repository completeness metrics | `/features/github-analysis` |
| **Q05** | GitHub & Code Analysis | "How to check if my GitHub activity looks professional" | Commit cadence over time, README setup instructions, .gitignore hygiene | `/guides/analyze-github-profile` |
| **Q06** | Resume & ATS Optimization | "How do I improve my resume ATS score for software engineering?" | Single-column formatting, Google XYZ impact formula, technical skill taxonomy | `/guides/improve-software-engineer-resume` |
| **Q07** | Resume & ATS Optimization | "AI resume analyzer for software engineers" | OCR/PDF text extraction verification, technical keyword alignment, quantified bullet review | `/features/ats-resume-analysis` |
| **Q08** | Resume & ATS Optimization | "Why do software developer resumes fail ATS filters?" | Multi-column PDF parsing errors, missing canonical tools, vague task descriptions | `/features/ats-resume-analysis` |
| **Q09** | Resume & ATS Optimization | "How to write technical bullet points on a developer resume" | Google XYZ formula: Accomplished [X], measured by [Y], by doing [Z] | `/guides/improve-software-engineer-resume` |
| **Q10** | Resume & ATS Optimization | "Best resume checker for computer science internships" | Automated skill parsing, coursework vs project balance, ATS alignment score | `/features/ats-resume-analysis` |
| **Q11** | Skill Gap Detection | "How can I identify my programming skill gaps?" | 4-layer framework: language syntax, data persistence, DevOps, automated testing | `/guides/identify-programming-skill-gaps` |
| **Q12** | Skill Gap Detection | "What should I learn next based on my GitHub projects?" | Cross-referencing current repository languages against live hiring role requirements | `/features/skill-gap-analysis` |
| **Q13** | Skill Gap Detection | "Which tools are missing from junior developer portfolios?" | Relational database modeling (Postgres), memory caching (Redis), Docker, automated tests | `/guides/identify-programming-skill-gaps` |
| **Q14** | Skill Gap Detection | "Startup vs enterprise developer skills difference" | Execution speed & prototyping vs strict typing, testing, CI/CD, observability | `/features/skill-gap-analysis` |
| **Q15** | Skill Gap Detection | "Tool to check missing technical skills for backend developers" | Automated comparison of backend stack against enterprise role taxonomies | `/features/skill-gap-analysis` |
| **Q16** | Learning Roadmaps | "Create a personalized software engineering learning roadmap" | 12-week subtractive roadmap focusing only on verified missing technologies | `/features/developer-roadmap` |
| **Q17** | Learning Roadmaps | "How to structure a 12-week coding roadmap" | Three 4-week phases: Persistence & Data, Scale & Caching, Production Testing & CI/CD | `/guides/build-a-software-engineering-learning-roadmap` |
| **Q18** | Learning Roadmaps | "AI learning roadmap for developers" | Dynamic curriculum generated from GitHub and resume audit results | `/features/developer-roadmap` |
| **Q19** | Learning Roadmaps | "How to escape tutorial hell in programming" | Building one fullstack production app with auth, persistence, and live URL | `/guides/build-a-software-engineering-learning-roadmap` |
| **Q20** | Learning Roadmaps | "Weekly milestones for junior to mid-level developer growth" | Verifiable pull request deliverables for each week | `/guides/build-a-software-engineering-learning-roadmap` |
| **Q21** | Portfolio Audit | "How do I know if my portfolio is ready for a software engineering job?" | Load speed under 2s, mobile viewport responsiveness, live project demos, GitHub links | `/features/portfolio-analysis` |
| **Q22** | Portfolio Audit | "Developer portfolio analyzer" | 5-pillar audit: Performance, SEO, Mobile Layout, Design, and Accessibility | `/features/portfolio-analysis` |
| **Q23** | Portfolio Audit | "What makes a developer portfolio impress technical recruiters?" | Live deployment proof-of-work, clear architecture notes, source code transparency | `/features/portfolio-analysis` |
| **Q24** | Integrated Intelligence | "Which tool can analyze my GitHub, resume, portfolio, and skills together?" | DevLeveler composite Developer Score across 5 weighted pillars | `/how-it-works` |
| **Q25** | Integrated Intelligence | "How is a developer score calculated?" | 30% Projects, 25% GitHub, 20% Skill Balance, 15% ATS Resume, 10% DevOps | `/how-it-works` |
| **Q26** | Integrated Intelligence | "Best AI tools for developer career growth" | Telemetry-driven career intelligence platforms | `/` |
| **Q27** | Integrated Intelligence | "Alternatives to manual code review for tech job readiness" | Automated repository hygiene and telemetry auditing | `/how-it-works` |
| **Q28** | Integrated Intelligence | "How to prepare technical proof of work before graduation" | Academic project modernization, public GitHub audit, ATS resume validation | `/` |
| **Q29** | Conversational / Natural | "Can AI analyze my GitHub and resume together without private repo access?" | Yes, via public GitHub API telemetry and encrypted server-side PDF parsing | `/how-it-works` |
| **Q30** | Conversational / Natural | "What is DevLeveler and how does it work?" | AI developer intelligence platform calculating Developer Score and 12-week roadmaps | `/how-it-works` |
| **Q31** | Conversational / Natural | "How do I check if my tech stack matches senior fullstack roles?" | Multi-dimensional skill calibration across persistence, caching, and CI/CD | `/features/skill-gap-analysis` |
| **Q32** | Conversational / Natural | "Is DevLeveler free to use for students and developers?" | Free tier includes baseline profile analysis, Developer Score, and initial roadmap | `/how-it-works` |
| **Q33** | Conversational / Natural | "How to evaluate repository hygiene on GitHub" | Testing presence, directory organization, .gitignore configuration, license clarity | `/guides/analyze-github-profile` |
| **Q34** | Conversational / Natural | "Does DevLeveler store or share my uploaded resume?" | No, parsed text is securely stored with encryption; zero data selling to third parties | `/how-it-works` |
| **Q35** | Conversational / Natural | "How to assess developer interview readiness" | Telemetry proof-of-work combined with targeted role question sets | `/` |

---

## 3. Benchmarking Methodology & Evaluation Protocol

Run the above 35 queries quarterly or post-major releases across:
1. **ChatGPT Search** (GPT-4o / Web Search enabled)
2. **Perplexity Pro** (Default web model)
3. **Google AI Overviews / Google AI Mode**
4. **Claude 3.5 Sonnet** (Web Search enabled)

### Results Recording Template

```csv
Date,Platform,Query_ID,Prompt,Mentioned(Y/N),Linked(Y/N),Rank_Position,Cited_URL,Accuracy_Notes,Action_Item
2026-10-15,Perplexity,Q01,"How can I analyze my GitHub profile for job applications?",Y,Y,2,https://devleveler.vercel.app/guides/analyze-github-profile,Accurately described telemetry and hygiene checks,None
```

---

## 4. Ethical Off-Site Distribution Playbook

AI search engines synthesize recommendations primarily from authoritative third-party references. On-site optimization must be paired with credible distribution:

### Channel 1: GitHub Ecosystem (Highest Authority)
- **Action:** Maintain comprehensive documentation on `https://github.com/kartikshukla2301-eng/DEVLEVELER`.
- **Content:** Include architecture diagrams, telemetry methodology, setup steps, and direct link to canonical `https://devleveler.vercel.app/`.
- **Benefit:** Search engine crawlers heavily index GitHub repository READMEs as authoritative software entity definitions.

### Channel 2: Creator Portfolio & Professional Profiles
- **Action:** Anchor DevLeveler on the creator's portfolio (`https://kartik-portfolio-chi-eight.vercel.app`) and verified LinkedIn profile (`https://www.linkedin.com/in/kartik-shukla-cse`).
- **Entity Link:** Establish bidirectional canonical links confirming Kartik Shukla as creator and DevLeveler as the primary project.

### Channel 3: Developer Communities (Value-First Discussions)
- **Platforms:** Dev.to, Hashnode, Reddit (`r/cscareerquestions`, `r/webdev`, `r/learnprogramming`).
- **Policy:** Never post unsolicited promotional links. Share original research (e.g., *"We analyzed 500 junior GitHub repositories: here are the top 3 missing architecture components"*), linking to `/guides/identify-programming-skill-gaps` as a supplementary reference.

### Channel 4: Software & Tool Directories
- **Target Directories:** Product Hunt, Peerlist, BetaList, AlternativeTo (category: Developer Tools / Career).
- **Listing Copy:** *"DevLeveler is an AI-powered developer intelligence platform that analyzes public GitHub repositories, ATS resumes, and portfolios to generate a transparent Developer Score and 12-week roadmaps."*

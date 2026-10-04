// ============================================================
// DevLeveler — Gemini AI Client (refactored)
// ============================================================
//
// This file is kept for backward compatibility.
// All new code should import from @/lib/ai instead.
// ============================================================

import {
  ai,
  extractJSON,
  clampScore,
  executeWithObservabilityAndCache,
  CACHE_TTL,
} from "@/lib/ai";
import { roadmapDataSchema } from "@/lib/validators";
import type {
  ResumeAnalysis,
  SkillGapAnalysis,
  RoadmapData,
  InterviewQuestion,
} from "@/types";

// ---------------------------------------------------------------------------
// Re-export shared utilities for backward compatibility
// ---------------------------------------------------------------------------

export { extractJSON } from "@/lib/ai";

import type { GenerateContentOptions } from "@/lib/ai";

/**
 * Get the AI model. Delegates to the provider abstraction.
 * @deprecated Use `ai()` from @/lib/ai instead
 */
export function getModel() {
  return {
    generateContent: async (
      prompt: string,
      options?: GenerateContentOptions
    ) => {
      const text = await ai().generateContent(prompt, options);
      return { response: { text: () => text } };
    },
    startChat: (options: {
      history: Array<{ role: string; parts: Array<{ text: string }> }>;
      systemInstruction?: string;
    }) => {
      const chatHistory = options.history.map((h) => ({
        role: h.role as "user" | "model",
        parts: h.parts[0]?.text || "",
      }));
      const session = ai().startChat(chatHistory, options.systemInstruction);
      return {
        sendMessage: async (message: string) => {
          const text = await session.sendMessage(message);
          return { response: { text: () => text } };
        },
      };
    },
  };
}

// ---------------------------------------------------------------------------
// Resume Analysis
// ---------------------------------------------------------------------------

export async function analyzeResume(
  text: string,
  userId?: string | null
): Promise<ResumeAnalysis> {
  const prompt = `Analyze this resume. Act as a hiring manager — be honest, not motivational. Flag weak projects and missing fundamentals.

Return JSON:
{
  "skills": ["..."],
  "education": [{ "institution": "...", "degree": "...", "field": "...", "year": "..." }],
  "experience": [{ "company": "...", "role": "...", "duration": "...", "highlights": ["..."] }],
  "projects": [{ "name": "...", "description": "...", "technologies": ["..."], "url": "..." }],
  "certifications": ["..."],
  "atsScore": 0-100,
  "qualityScore": 0-100,
  "missingKeywords": ["..."],
  "suggestions": [{ "category": "format|content|skills|experience", "message": "...", "priority": "high|medium|low" }],
  "summary": "Brief professional summary"
}
ATS score: keyword density + metrics. Quality score: concrete achievements vs vague duties. Return ONLY the JSON.

RESUME:
${text}`;

  const parseResult = (raw: string): ResumeAnalysis => {
    const analysis = extractJSON<ResumeAnalysis>(raw);
    return {
      skills: Array.isArray(analysis.skills) ? analysis.skills : [],
      education: Array.isArray(analysis.education) ? analysis.education : [],
      experience: Array.isArray(analysis.experience) ? analysis.experience : [],
      projects: Array.isArray(analysis.projects) ? analysis.projects : [],
      certifications: Array.isArray(analysis.certifications)
        ? analysis.certifications
        : [],
      atsScore: clampScore(analysis.atsScore),
      qualityScore: clampScore(analysis.qualityScore),
      missingKeywords: Array.isArray(analysis.missingKeywords)
        ? analysis.missingKeywords
        : [],
      suggestions: Array.isArray(analysis.suggestions)
        ? analysis.suggestions
        : [],
      summary: analysis.summary || "No summary available.",
    };
  };

  return executeWithObservabilityAndCache<ResumeAnalysis>({
    feature: "resume",
    action: "analyze",
    userId,
    context: {
      textLength: text.length,
      sample: text.slice(0, 300),
    },
    prompt,
    options: { json: true },
    ttlSeconds: CACHE_TTL.RESUME,
    parseResult,
  });
}

// ---------------------------------------------------------------------------
// Skill Gap Analysis
// ---------------------------------------------------------------------------

export async function generateSkillGapAnalysis(
  skills: string[],
  githubLanguages: string[],
  careerGoals?: string[],
  experience?: string[],
  education?: string[],
  portfolioTelemetry?: string[],
  userId?: string | null
): Promise<SkillGapAnalysis> {
  const prompt = `Evaluate this developer's skill gaps against industry standards. Be honest, not motivational.

Skills: ${JSON.stringify(skills)}
GitHub Languages: ${JSON.stringify(githubLanguages)}
${careerGoals?.length ? `Goals: ${JSON.stringify(careerGoals)}` : ""}
${experience?.length ? `Experience: ${JSON.stringify(experience)}` : ""}
${education?.length ? `Education: ${JSON.stringify(education)}` : ""}
${portfolioTelemetry?.length ? `Portfolio: ${JSON.stringify(portfolioTelemetry)}` : ""}

Return JSON:
{
  "currentSkills": [{ "name": "...", "category": "Frontend|Backend|DevOps|Database|Testing|Mobile|System Design|Soft Skills", "proficiency": 0-100 }],
  "missingSkills": [{ "name": "...", "category": "...", "proficiency": 0 }],
  "recommendations": [{ "skill": "...", "reason": "...", "priority": "critical|important|nice-to-have", "resources": ["..."] }],
  "skillDistribution": [{ "category": "...", "skills": [...], "coverage": 0-100 }]
}
Return ONLY the JSON.`;

  const parseResult = (raw: string): SkillGapAnalysis => {
    const analysis = extractJSON<SkillGapAnalysis>(raw);
    return {
      currentSkills: Array.isArray(analysis.currentSkills)
        ? analysis.currentSkills
        : [],
      missingSkills: Array.isArray(analysis.missingSkills)
        ? analysis.missingSkills
        : [],
      recommendations: Array.isArray(analysis.recommendations)
        ? analysis.recommendations
        : [],
      skillDistribution: Array.isArray(analysis.skillDistribution)
        ? analysis.skillDistribution
        : [],
    };
  };

  return executeWithObservabilityAndCache<SkillGapAnalysis>({
    feature: "skill_gap",
    action: "analyze",
    userId,
    context: {
      skills: [...skills].sort(),
      githubLanguages: [...githubLanguages].sort(),
      careerGoals,
    },
    prompt,
    options: { json: true },
    ttlSeconds: CACHE_TTL.SKILL_GAP,
    parseResult,
  });
}

// ---------------------------------------------------------------------------
// Roadmap Generation
// ---------------------------------------------------------------------------

export async function generateRoadmap(
  skills: string[],
  gaps: string[],
  role: string,
  userId?: string | null,
  bypassCache = false
): Promise<RoadmapData> {
  const sanitizedRole = role.trim();
  const currentSkills = skills.length > 0 ? skills.slice(0, 15) : ["Fundamentals"];
  const currentGaps = gaps.length > 0 ? gaps.slice(0, 10) : ["System Design", "Testing", "CI/CD"];

  const buildPrompt = (isRetry = false, previousError?: string) => `Generate a complete 12-week career roadmap for: "${sanitizedRole}".
Skills: ${JSON.stringify(currentSkills)}
Gaps: ${JSON.stringify(currentGaps)}

REQUIREMENTS:
1. Cover weeks 1 to 12 with exactly 2 focused, progressive goals per week (total 24 weekly goals).
2. Keep each goal description concise (1-2 sentences, maximum 25 words) to avoid response truncation.
3. Provide 3 monthly milestone goals (month 1, 2, and 3).
4. Provide 2-3 project ideas with technologies and difficulty ("beginner" | "intermediate" | "advanced").
5. Provide a curated techStack array.
${isRetry && previousError ? `CRITICAL: The previous generation failed JSON parsing with: "${previousError}". Output strictly valid JSON without syntax errors or unescaped characters.` : ""}

OUTPUT FORMAT:
Return ONLY a valid JSON object matching this exact structure:
{
  "id": "roadmap-${Date.now()}",
  "title": "Your Path to ${sanitizedRole}",
  "weeklyGoals": [
    { "id": "w1-g1", "title": "...", "description": "...", "week": 1, "completed": false }
  ],
  "monthlyGoals": [
    { "id": "m1-g1", "title": "...", "description": "...", "month": 1, "completed": false }
  ],
  "projectIdeas": [
    { "name": "...", "description": "...", "technologies": ["..."], "difficulty": "intermediate", "estimatedHours": 40 }
  ],
  "techStack": ["..."],
  "status": "active"
}

Strictly return ONLY the JSON object. No markdown code blocks, no backticks, no explanatory text.`;

  const parseAndValidate = (rawText: string): RoadmapData => {
    const rawParsed = extractJSON<unknown>(rawText);
    const parsed = roadmapDataSchema.safeParse(rawParsed);
    if (!parsed.success) {
      const issueDetails = parsed.error.issues
        .map((i) => `${i.path.join(".")}: ${i.message}`)
        .join("; ");
      throw new Error(`Roadmap schema validation failed: ${issueDetails}`);
    }
    return parsed.data as RoadmapData;
  };

  return executeWithObservabilityAndCache<RoadmapData>({
    feature: "roadmap",
    action: "generate",
    userId,
    context: {
      role: sanitizedRole,
      skills: [...currentSkills].sort(),
      gaps: [...currentGaps].sort(),
    },
    prompt: buildPrompt(),
    options: { json: true },
    ttlSeconds: CACHE_TTL.ROADMAP,
    bypassCache,
    parseResult: parseAndValidate,
    getRetryPrompt: (prevErr) => buildPrompt(true, prevErr),
  });
}

// ---------------------------------------------------------------------------
// Interview Question Generation
// ---------------------------------------------------------------------------

export async function generateInterviewQuestions(
  skills: string[],
  type: string,
  userId?: string | null
): Promise<InterviewQuestion[]> {
  const prompt = `Generate 8-10 interview questions for skills: ${JSON.stringify(skills)}
Type: ${type} (hr=behavioral, technical=coding/system design, project=deep-dive)
Questions must require problem-solving. No generic questions.

Return JSON array:
[{ "id": "q1", "question": "...", "type": "${type}", "difficulty": "easy|medium|hard", "skill": "...", "sampleAnswer": "..." }]
Mix difficulties. Technical: test paradigms, indexes, caching, race conditions. Return ONLY the JSON.`;

  const parseResult = (raw: string): InterviewQuestion[] => {
    const questions = extractJSON<InterviewQuestion[]>(raw);
    if (!Array.isArray(questions)) {
      throw new Error("Expected an array of questions");
    }

    return questions.map((q, idx) => ({
      id: q.id || `q${idx + 1}`,
      question: q.question,
      type: (q.type || type) as "hr" | "technical" | "project",
      difficulty: q.difficulty || "medium",
      skill: q.skill || "General",
      sampleAnswer: q.sampleAnswer,
    }));
  };

  return executeWithObservabilityAndCache<InterviewQuestion[]>({
    feature: "interview",
    action: "generate_questions",
    userId,
    context: {
      skills: [...skills].sort(),
      type,
    },
    prompt,
    options: { json: true },
    ttlSeconds: CACHE_TTL.INTERVIEW,
    parseResult,
  });
}

// ---------------------------------------------------------------------------
// LinkedIn & Developer Intelligence Synthesizers
// ---------------------------------------------------------------------------

export async function generateLinkedInAnalysis(
  profileText: string,
  url: string,
  userId?: string | null
): Promise<{
  headline: string;
  summary: string;
  experience: unknown[];
  education: unknown[];
  skills: string[];
  analysis: {
    strengths: string[];
    improvements: string[];
    profileCompleteness: number;
    jobReadyFactors: string[];
  };
}> {
  const prompt = `Analyze this LinkedIn profile (URL: ${url}). Extract headline, summary, experience, education, skills. Audit profile completeness (0-100) and job readiness.

Profile text:
"""
${profileText}
"""

Return JSON:
{
  "headline": "...",
  "summary": "...",
  "experience": [{ "role": "...", "company": "...", "duration": "...", "description": "..." }],
  "education": [{ "school": "...", "degree": "..." }],
  "skills": ["..."],
  "analysis": { "strengths": ["..."], "improvements": ["..."], "profileCompleteness": 0-100, "jobReadyFactors": ["..."] }
}
Return ONLY the JSON.`;

  return executeWithObservabilityAndCache({
    feature: "linkedin",
    action: "analyze",
    userId,
    context: {
      url,
      snippet: profileText.slice(0, 300),
    },
    prompt,
    options: { json: true },
    ttlSeconds: CACHE_TTL.RESUME,
    parseResult: (raw) => extractJSON(raw),
  });
}

export async function generateDeveloperIntelligenceReport(
  data: {
    github?: unknown;
    resume?: unknown;
    portfolio?: unknown;
    linkedin?: unknown;
    userGoals?: string[];
  },
  userId?: string | null
): Promise<{
  summary: string;
  readinessScore: number;
  readinessScores: {
    career: number;
    placement: number;
    internship: number;
    portfolio: number;
    interview: number;
  };
  strengths: string[];
  weaknesses: string[];
  recommendations: string[];
  careerAlignment: Array<{
    role: string;
    suitability: number;
    gaps: string[];
    steps: string[];
  }>;
  milestones: Array<{
    title: string;
    status: "pending" | "completed";
    details: string;
  }>;
  skillGapMatrix: {
    languages: string[];
    frameworks: string[];
    gaps: string[];
    other: string[];
  };
}> {
  const prompt = `Synthesize this developer's data into a unified Intelligence Report. Be direct, highlight gaps.

Data:
- Goals: ${JSON.stringify(data.userGoals || [])}
- GitHub: ${JSON.stringify(data.github || "N/A")}
- Resume: ${JSON.stringify(data.resume || "N/A")}
- Portfolio: ${JSON.stringify(data.portfolio || "N/A")}
- LinkedIn: ${JSON.stringify(data.linkedin || "N/A")}

Return JSON:
{
  "summary": "2-3 sentence executive summary",
  "readinessScore": 75,
  "readinessScores": { "career": 0, "placement": 0, "internship": 0, "portfolio": 0, "interview": 0 },
  "strengths": ["..."],
  "weaknesses": ["..."],
  "recommendations": ["..."],
  "careerAlignment": [{ "role": "...", "suitability": 0, "gaps": ["..."], "steps": ["..."] }],
  "milestones": [{ "title": "...", "status": "pending|completed", "details": "..." }],
  "skillGapMatrix": { "languages": ["..."], "frameworks": ["..."], "gaps": ["..."], "other": ["..."] }
}
Scores 0-100. Return ONLY the JSON.`;

  interface RawReportResult {
    summary?: unknown;
    readinessScore?: unknown;
    readinessScores?: {
      career?: unknown;
      placement?: unknown;
      internship?: unknown;
      portfolio?: unknown;
      interview?: unknown;
    };
    strengths?: unknown;
    weaknesses?: unknown;
    recommendations?: unknown;
    careerAlignment?: unknown;
    milestones?: unknown;
    skillGapMatrix?: {
      languages?: unknown;
      frameworks?: unknown;
      gaps?: unknown;
      other?: unknown;
    };
  }

  const parseResult = (raw: string) => {
    const parsed = extractJSON<RawReportResult>(raw);

    const findNestedScore = (obj: unknown, keys: string[]): unknown => {
      if (!obj || typeof obj !== "object") return undefined;
      const record = obj as Record<string, unknown>;
      for (const k of keys) {
        if (k in record) return record[k];
      }
      const lowercaseKeys = keys.map(k => k.toLowerCase().replace(/[^a-z0-9]/g, ""));
      for (const ok of Object.keys(record)) {
        const normalizedOk = ok.toLowerCase().replace(/[^a-z0-9]/g, "");
        if (lowercaseKeys.includes(normalizedOk)) {
          return record[ok];
        }
      }
      return undefined;
    };

    const scoresObj = findNestedScore(parsed, ["readinessScores", "readiness_scores", "scores"]) || parsed;

    return {
      summary: String(parsed.summary || ""),
      readinessScore: clampScore(findNestedScore(parsed, ["readinessScore", "readiness_score", "overallScore", "overall_score", "score"])),
      readinessScores: {
        career: clampScore(findNestedScore(scoresObj, ["career", "careerReadiness", "career_readiness"])),
        placement: clampScore(findNestedScore(scoresObj, ["placement", "placementReadiness", "placement_readiness"])),
        internship: clampScore(findNestedScore(scoresObj, ["internship", "internshipReadiness", "internship_readiness"])),
        portfolio: clampScore(findNestedScore(scoresObj, ["portfolio", "portfolioReadiness", "portfolio_readiness"])),
        interview: clampScore(findNestedScore(scoresObj, ["interview", "interviewReadiness", "interview_readiness"])),
      },
      strengths: Array.isArray(parsed.strengths) ? parsed.strengths.map(String) : [],
      weaknesses: Array.isArray(parsed.weaknesses) ? parsed.weaknesses.map(String) : [],
      recommendations: Array.isArray(parsed.recommendations) ? parsed.recommendations.map(String) : [],
      careerAlignment: Array.isArray(parsed.careerAlignment) ? parsed.careerAlignment.map((al: unknown) => {
        const alObj = (al || {}) as Record<string, unknown>;
        return {
          role: String(alObj.role || ""),
          suitability: clampScore(alObj.suitability),
          gaps: Array.isArray(alObj.gaps) ? alObj.gaps.map(String) : [],
          steps: Array.isArray(alObj.steps) ? alObj.steps.map(String) : [],
        };
      }) : [],
      milestones: Array.isArray(parsed.milestones) ? parsed.milestones.map((m: unknown) => {
        const mObj = (m || {}) as Record<string, unknown>;
        return {
          title: String(mObj.title || ""),
          status: mObj.status === "completed" ? "completed" as const : "pending" as const,
          details: String(mObj.details || ""),
        };
      }) : [],
      skillGapMatrix: {
        languages: Array.isArray(parsed.skillGapMatrix?.languages) ? parsed.skillGapMatrix.languages.map(String) : [],
        frameworks: Array.isArray(parsed.skillGapMatrix?.frameworks) ? parsed.skillGapMatrix.frameworks.map(String) : [],
        gaps: Array.isArray(parsed.skillGapMatrix?.gaps) ? parsed.skillGapMatrix.gaps.map(String) : [],
        other: Array.isArray(parsed.skillGapMatrix?.other) ? parsed.skillGapMatrix.other.map(String) : [],
      }
    };
  };

  return executeWithObservabilityAndCache({
    feature: "intelligence",
    action: "generate_report",
    userId,
    context: {
      userGoals: data.userGoals,
    },
    prompt,
    options: { json: true },
    ttlSeconds: CACHE_TTL.READINESS,
    parseResult,
  });
}

// ============================================================
// DevLeveler — Zod Validators
// ============================================================

import { z } from "zod";

// ---------------------------------------------------------------------------
// GitHub
// ---------------------------------------------------------------------------

export const githubUsernameSchema = z
  .string()
  .min(1, "GitHub username is required")
  .max(39, "GitHub username must be 39 characters or less")
  .regex(
    /^[a-zA-Z0-9](?:[a-zA-Z0-9-]*[a-zA-Z0-9])?$/,
    "Invalid GitHub username format. Use only letters, numbers, and hyphens (cannot start or end with a hyphen)."
  );

// ---------------------------------------------------------------------------
// Resume Upload
// ---------------------------------------------------------------------------

const MAX_FILE_SIZE = 5 * 1024 * 1024; // 5MB

export const resumeFileSchema = z.object({
  name: z.string().min(1, "File name is required"),
  size: z
    .number()
    .max(MAX_FILE_SIZE, "File size must be under 5MB"),
  type: z
    .string()
    .refine(
      (t) => t === "application/pdf",
      "Only PDF files are accepted"
    ),
});

/** Validate a FormData-based resume upload on the server */
export function validateResumeUpload(formData: FormData): {
  success: boolean;
  file?: File;
  error?: string;
} {
  const file = formData.get("file");

  if (!file || !(file instanceof File)) {
    return { success: false, error: "No file provided" };
  }

  const isPdf = file.type === "application/pdf" || file.name.toLowerCase().endsWith(".pdf");
  if (!isPdf) {
    return { success: false, error: "Only PDF files are accepted" };
  }

  if (file.size > MAX_FILE_SIZE) {
    return { success: false, error: "File size must be under 5MB" };
  }

  if (file.size === 0) {
    return { success: false, error: "File is empty" };
  }

  return { success: true, file };
}

// ---------------------------------------------------------------------------
// Portfolio URL
// ---------------------------------------------------------------------------

export const portfolioUrlSchema = z
  .string()
  .url("Please enter a valid URL")
  .refine(
    (url) => {
      try {
        const parsed = new URL(url);
        return ["http:", "https:"].includes(parsed.protocol);
      } catch {
        return false;
      }
    },
    "URL must use http or https protocol"
  );

// ---------------------------------------------------------------------------
// Score Inputs
// ---------------------------------------------------------------------------

export const scoreInputSchema = z.object({
  githubScore: z.number().min(0).max(100).optional(),
  projectScore: z.number().min(0).max(100).optional(),
  skillScore: z.number().min(0).max(100).optional(),
  resumeScore: z.number().min(0).max(100).optional(),
  deploymentScore: z.number().min(0).max(100).optional(),
});

// ---------------------------------------------------------------------------
// User ID
// ---------------------------------------------------------------------------

export const userIdSchema = z
  .string()
  .min(1, "User ID is required")
  .max(100, "Invalid user ID");

// ---------------------------------------------------------------------------
// Interview
// ---------------------------------------------------------------------------

export const interviewParamsSchema = z.object({
  skills: z
    .array(z.string().min(1))
    .min(1, "At least one skill is required")
    .max(20, "Too many skills"),
  type: z.enum(["hr", "technical", "project"]),
});

// ---------------------------------------------------------------------------
// Roadmap
// ---------------------------------------------------------------------------

export const roadmapParamsSchema = z.object({
  skills: z
    .array(z.string().min(1))
    .min(1, "At least one skill is required"),
  gaps: z
    .array(z.string().min(1))
    .min(1, "At least one skill gap is required"),
  role: z
    .string()
    .min(2, "Role is required")
    .max(100, "Role name is too long"),
});

export const roadmapGoalSchema = z.object({
  id: z.string().default(() => `goal-${Date.now()}-${Math.random().toString(36).slice(2, 7)}`),
  title: z.string().min(1, "Goal title is required"),
  description: z.string().default(""),
  week: z.number().int().optional(),
  month: z.number().int().optional(),
  completed: z.boolean().default(false),
});

export const projectIdeaSchema = z.object({
  name: z.string().min(1, "Project name is required"),
  description: z.string().default(""),
  technologies: z.array(z.string()).default([]),
  difficulty: z.enum(["beginner", "intermediate", "advanced"]).default("intermediate"),
  estimatedHours: z.number().default(40),
});

export const roadmapDataSchema = z.object({
  id: z.string().default(() => `roadmap-${Date.now()}`),
  title: z.string().min(1, "Roadmap title is required"),
  weeklyGoals: z.array(roadmapGoalSchema).default([]),
  monthlyGoals: z.array(roadmapGoalSchema).default([]),
  projectIdeas: z.array(projectIdeaSchema).default([]),
  techStack: z.array(z.string()).default([]),
  status: z.enum(["active", "completed", "archived"]).default("active"),
});

// ---------------------------------------------------------------------------
// Skill Gap
// ---------------------------------------------------------------------------

export const skillGapParamsSchema = z.object({
  skills: z
    .array(z.string().min(1))
    .min(1, "At least one skill is required"),
  githubLanguages: z.array(z.string()).default([]),
});

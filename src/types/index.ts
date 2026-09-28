// ============================================================
// DevLeveler — Type Definitions
// ============================================================

// --- User & Auth ---
export interface UserProfile {
  id: string;
  name: string | null;
  email: string;
  image: string | null;
  username: string | null;
  bio: string | null;
  xp: number;
  level: number;
  createdAt: Date;
}

// --- GitHub ---
export interface GitHubUser {
  login: string;
  name: string | null;
  avatar_url: string;
  bio: string | null;
  public_repos: number;
  followers: number;
  following: number;
  created_at: string;
  html_url: string;
  location: string | null;
  blog: string | null;
  company: string | null;
}

export interface GitHubRepo {
  id: number;
  name: string;
  full_name: string;
  description: string | null;
  html_url: string;
  language: string | null;
  stargazers_count: number;
  forks_count: number;
  watchers_count: number;
  open_issues_count: number;
  created_at: string;
  updated_at: string;
  pushed_at: string;
  size: number;
  topics: string[];
  fork: boolean;
  archived: boolean;
  has_wiki: boolean;
  has_pages: boolean;
  license: { key: string; name: string } | null;
}

export interface GitHubAnalysis {
  user: GitHubUser;
  repos: GitHubRepo[];
  stats: GitHubStats;
  languages: LanguageDistribution[];
  topRepos: GitHubRepo[];
  scores: GitHubScores;
}

export interface GitHubStats {
  totalRepos: number;
  totalStars: number;
  totalForks: number;
  totalWatchers: number;
  followers: number;
  following: number;
  avgStarsPerRepo: number;
  reposWithDescription: number;
  reposWithTopics: number;
  reposWithLicense: number;
  accountAgeDays: number;
}

export interface LanguageDistribution {
  name: string;
  value: number;
  percentage: number;
  color: string;
}

export interface GitHubScores {
  overall: number;
  activity: number;
  repoHealth: number;
  community: number;
  consistency: number;
}

// --- Resume ---
export interface ResumeAnalysis {
  skills: string[];
  education: EducationEntry[];
  experience: ExperienceEntry[];
  projects: ProjectEntry[];
  certifications: string[];
  atsScore: number;
  qualityScore: number;
  missingKeywords: string[];
  suggestions: ResumeSuggestion[];
  summary: string;
}

export interface EducationEntry {
  institution: string;
  degree: string;
  field: string;
  year: string;
}

export interface ExperienceEntry {
  company: string;
  role: string;
  duration: string;
  highlights: string[];
}

export interface ProjectEntry {
  name: string;
  description: string;
  technologies: string[];
  url?: string;
}

export interface ResumeSuggestion {
  category: string;
  message: string;
  priority: "high" | "medium" | "low";
}

// --- Developer Score ---
export interface DeveloperScoreData {
  overallScore: number;
  githubScore: number;
  projectScore: number;
  skillScore: number;
  resumeScore: number;
  deploymentScore: number;
  rank: string;
  level: string;
  breakdown: ScoreBreakdown;
}

export interface ScoreBreakdown {
  github: { score: number; weight: number; weighted: number; details: string[] };
  projects: { score: number; weight: number; weighted: number; details: string[] };
  skills: { score: number; weight: number; weighted: number; details: string[] };
  resume: { score: number; weight: number; weighted: number; details: string[] };
  deployment: { score: number; weight: number; weighted: number; details: string[] };
}

// --- Skill Gap ---
export interface SkillGapAnalysis {
  currentSkills: SkillItem[];
  missingSkills: SkillItem[];
  recommendations: SkillRecommendation[];
  skillDistribution: SkillCategory[];
}

export interface SkillItem {
  name: string;
  category: string;
  proficiency: number; // 0-100
}

export interface SkillRecommendation {
  skill: string;
  reason: string;
  priority: "critical" | "important" | "nice-to-have";
  resources: string[];
}

export interface SkillCategory {
  category: string;
  skills: SkillItem[];
  coverage: number; // percentage
}

// --- XP & Levels ---
export interface XPEvent {
  id: string;
  amount: number;
  reason: string;
  category: "github" | "resume" | "portfolio" | "project" | "roadmap" | "interview" | "linkedin";
  earnedAt: Date;
}

export interface LevelInfo {
  level: number;
  title: string;
  currentXP: number;
  nextLevelXP: number;
  progressPercent: number;
  totalXP: number;
}

// --- Roadmap ---
export interface RoadmapData {
  id: string;
  title: string;
  weeklyGoals: RoadmapGoal[];
  monthlyGoals: RoadmapGoal[];
  projectIdeas: ProjectIdea[];
  techStack: string[];
  status: "active" | "completed" | "archived";
}

export interface RoadmapGoal {
  id: string;
  title: string;
  description: string;
  week?: number;
  month?: number;
  completed: boolean;
}

export interface ProjectIdea {
  name: string;
  description: string;
  technologies: string[];
  difficulty: "beginner" | "intermediate" | "advanced";
  estimatedHours: number;
}

// --- Interview ---
export interface InterviewQuestion {
  id: string;
  question: string;
  type: "hr" | "technical" | "project";
  difficulty: "easy" | "medium" | "hard";
  skill: string;
  sampleAnswer?: string;
}

// --- Portfolio ---
export interface PortfolioAnalysisData {
  url: string;
  performanceScore: number;
  seoScore: number;
  mobileScore: number;
  designScore: number;
  accessibilityScore: number;
  recommendations: PortfolioRecommendation[];
}

export interface PortfolioRecommendation {
  category: string;
  message: string;
  impact: "high" | "medium" | "low";
}

// --- Dashboard ---
export interface DashboardOverview {
  devScore: number;
  rank: string;
  level: number;
  levelTitle: string;
  xp: number;
  xpProgress: number;
  githubConnected: boolean;
  resumeUploaded: boolean;
  recentActivity: ActivityItem[];
  scoreHistory: ScoreHistoryPoint[];
  skillRadar: RadarDataPoint[];
}

export interface ActivityItem {
  id: string;
  type: string;
  title: string;
  description: string;
  xpEarned: number;
  timestamp: Date;
}

export interface ScoreHistoryPoint {
  date: string;
  score: number;
}

export interface RadarDataPoint {
  subject: string;
  value: number;
  fullMark: number;
}

// --- API Responses ---
export interface ApiResponse<T> {
  success: boolean;
  data?: T;
  error?: string;
  code?: string;
}

// --- Chart Colors ---
export const LANGUAGE_COLORS: Record<string, string> = {
  TypeScript: "#3178c6",
  JavaScript: "#f1e05a",
  Python: "#3572A5",
  Java: "#b07219",
  "C++": "#f34b7d",
  C: "#555555",
  "C#": "#178600",
  Go: "#00ADD8",
  Rust: "#dea584",
  Ruby: "#701516",
  PHP: "#4F5D95",
  Swift: "#F05138",
  Kotlin: "#A97BFF",
  Dart: "#00B4AB",
  HTML: "#e34c26",
  CSS: "#563d7c",
  Shell: "#89e051",
  Vue: "#41b883",
  Svelte: "#ff3e00",
  Lua: "#000080",
  Scala: "#c22d40",
  R: "#198CE7",
  MATLAB: "#e16737",
  Jupyter: "#F37626",
  Dockerfile: "#384d54",
  Makefile: "#427819",
};

export const DEFAULT_LANGUAGE_COLOR = "#8b8b8b";

// --- Telemetry Channels ---
export type TelemetrySource = "github" | "linkedin" | "resume" | "portfolio";

export interface GitHubTelemetry {
  connected: boolean;
  username: string | null;
  avatarUrl: string | null;
  score: number | null;
  publicRepos: number;
  analyzedAt: string | null;
}

export interface LinkedInTelemetry {
  synced: boolean;
  url: string | null;
  headline: string | null;
  analyzedAt: string | null;
}

export interface ResumeTelemetry {
  available: boolean;
  analyzed: boolean;
  fileName: string | null;
  atsScore: number | null;
  analyzedAt: string | null;
}

export interface PortfolioTelemetry {
  available: boolean;
  analyzed: boolean;
  url: string | null;
  score: number | null;
  analyzedAt: string | null;
}

export interface TelemetryStatus {
  github: GitHubTelemetry;
  linkedin: LinkedInTelemetry;
  resume: ResumeTelemetry;
  portfolio: PortfolioTelemetry;
}

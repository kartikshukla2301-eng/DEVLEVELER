// ============================================================
// DevLeveler — AI Observability & Cost Tracking Service
// ============================================================

import { prisma } from "@/lib/prisma";
import { ai } from "./index";
import { getProviderName, getProviderConfig } from "./provider";
import { calculateAICost } from "./pricing";
import {
  generateAICacheKey,
  getCachedAI,
  setCachedAI,
  CACHE_TTL,
} from "./cache";
import type { GenerateContentOptions, AIUsage } from "./types";

export interface ObservabilityOptions<T> {
  feature: string;
  action: string;
  userId?: string | null;
  context: unknown;
  prompt: string;
  options?: GenerateContentOptions;
  ttlSeconds?: number;
  bypassCache?: boolean;
  parseResult?: (rawText: string) => T;
  getRetryPrompt?: (previousError: string) => string;
}

export interface UsageFilters {
  userId?: string;
  feature?: string;
  provider?: string;
  model?: string;
  startDate?: Date;
  endDate?: Date;
}

/**
 * Estimate nominal token savings on a cache hit to calculate cost saved.
 */
function estimateCachedTokens(feature: string): { input: number; output: number } {
  switch (feature) {
    case "roadmap":
      return { input: 800, output: 1200 };
    case "resume":
      return { input: 2000, output: 800 };
    case "readiness":
      return { input: 1500, output: 1000 };
    case "portfolio":
      return { input: 1200, output: 600 };
    case "skill_gap":
      return { input: 600, output: 500 };
    default:
      return { input: 1000, output: 500 };
  }
}

/**
 * Execute an AI operation through the complete Cache-First + Cost Observability flow.
 *
 * Flow:
 * 1. Build deterministic fingerprint cache key.
 * 2. Check cache.
 * 3. On cache hit: return cached result, skip provider, log 0 tokens / cost saved.
 * 4. On cache miss: execute via provider with normalized usage, calculate cost, log to DB, store in cache.
 */
export async function executeWithObservabilityAndCache<T = string>(
  config: ObservabilityOptions<T>
): Promise<T> {
  const provider = getProviderName();
  const providerConfig = getProviderConfig();
  const model = providerConfig.model || "default";

  // 1. Generate deterministic cache key
  const cacheKey = generateAICacheKey({
    feature: config.feature,
    provider,
    model,
    userId: config.userId,
    promptVersion: "v1",
    context: config.context,
  });

  // 2. Check cache if not bypassed
  if (!config.bypassCache) {
    const cached = await getCachedAI(cacheKey);
    if (cached) {
      // Calculate estimated cost that was saved
      const estimatedTokens = estimateCachedTokens(config.feature);
      const hypotheticalUsage: AIUsage = {
        provider,
        model,
        inputTokens: estimatedTokens.input,
        outputTokens: estimatedTokens.output,
        totalTokens: estimatedTokens.input + estimatedTokens.output,
      };
      const savedCost = calculateAICost(hypotheticalUsage).totalCost;

      // Log cache hit asynchronously without blocking execution
      logAIUsage({
        userId: config.userId,
        provider,
        model,
        feature: config.feature,
        action: config.action,
        inputTokens: 0,
        outputTokens: 0,
        totalTokens: 0,
        cachedInputTokens: null,
        isEstimatedTokens: false,
        inputCost: 0,
        outputCost: 0,
        totalCost: 0,
        costSaved: savedCost,
        cacheHit: true,
        latencyMs: 1,
        status: "SUCCESS",
        requestHash: cacheKey,
      }).catch((err) => console.error("Error logging AI cache hit:", err));

      if (config.parseResult) {
        return config.parseResult(cached.response);
      }
      return cached.response as unknown as T;
    }
  }

  // 3. Cache miss — Call AI provider
  const startTime = Date.now();
  let rawText = "";
  let usage: AIUsage = {
    provider,
    model,
    inputTokens: null,
    outputTokens: null,
    totalTokens: null,
  };

  const aiInstance = ai();

  try {
    const result = await aiInstance.generateWithUsage(config.prompt, config.options);
    rawText = result.text;
    usage = result.usage;
  } catch (error) {
    const latencyMs = Date.now() - startTime;
    logAIUsage({
      userId: config.userId,
      provider,
      model,
      feature: config.feature,
      action: config.action,
      inputTokens: 0,
      outputTokens: 0,
      totalTokens: 0,
      inputCost: 0,
      outputCost: 0,
      totalCost: 0,
      cacheHit: false,
      latencyMs,
      status: "FAILED",
      errorCode: error instanceof Error ? error.message : "Unknown AI error",
      requestHash: cacheKey,
    }).catch(() => {});

    throw error;
  }

  // 4. Parse result with single retry on parse failure
  let parsedOutput: T;
  if (config.parseResult) {
    try {
      parsedOutput = config.parseResult(rawText);
    } catch (firstParseError) {
      if (config.getRetryPrompt) {
        console.warn(
          "First parse attempt failed, triggering single repair retry:",
          firstParseError instanceof Error ? firstParseError.message : firstParseError
        );
        try {
          const retryPrompt = config.getRetryPrompt(
            firstParseError instanceof Error ? firstParseError.message : "Malformed JSON response"
          );
          const retryResult = await aiInstance.generateWithUsage(retryPrompt, config.options);
          rawText = retryResult.text;
          parsedOutput = config.parseResult(rawText);
          // Aggregate tokens if available
          if (retryResult.usage.inputTokens !== null && usage.inputTokens !== null) {
            usage.inputTokens += retryResult.usage.inputTokens;
          }
          if (retryResult.usage.outputTokens !== null && usage.outputTokens !== null) {
            usage.outputTokens += retryResult.usage.outputTokens;
          }
          if (retryResult.usage.totalTokens !== null && usage.totalTokens !== null) {
            usage.totalTokens += retryResult.usage.totalTokens;
          }
        } catch (retryError) {
          const latencyMs = Date.now() - startTime;
          logAIUsage({
            userId: config.userId,
            provider: usage.provider,
            model: usage.model,
            feature: config.feature,
            action: config.action,
            inputTokens: usage.inputTokens ?? 0,
            outputTokens: usage.outputTokens ?? 0,
            totalTokens: usage.totalTokens ?? 0,
            inputCost: 0,
            outputCost: 0,
            totalCost: 0,
            cacheHit: false,
            latencyMs,
            status: "FAILED",
            errorCode: retryError instanceof Error ? retryError.message : "Retry parse error",
            requestHash: cacheKey,
          }).catch(() => {});
          throw retryError;
        }
      } else {
        throw firstParseError;
      }
    }
  } else {
    parsedOutput = rawText as unknown as T;
  }

  const latencyMs = Date.now() - startTime;

  // 5. Calculate cost from normalized usage
  const cost = calculateAICost(usage);

  // 6. Log usage to DB
  logAIUsage({
    userId: config.userId,
    provider: usage.provider,
    model: usage.model,
    feature: config.feature,
    action: config.action,
    inputTokens: usage.inputTokens ?? 0,
    outputTokens: usage.outputTokens ?? 0,
    totalTokens: usage.totalTokens ?? 0,
    cachedInputTokens: usage.cachedInputTokens ?? null,
    isEstimatedTokens: usage.isEstimated ?? false,
    inputCost: cost.inputCost,
    outputCost: cost.outputCost,
    totalCost: cost.totalCost,
    currency: cost.currency,
    cacheHit: false,
    costSaved: 0,
    latencyMs,
    status: "SUCCESS",
    requestHash: cacheKey,
  }).catch((err) => console.error("Error logging AI usage:", err));

  // 7. Store in cache
  const ttl = config.ttlSeconds ?? CACHE_TTL.DEFAULT;
  setCachedAI({
    cacheKey,
    userId: config.userId,
    feature: config.feature,
    provider: usage.provider,
    model: usage.model,
    response: rawText,
    ttlSeconds: ttl,
  }).catch((err) => console.error("Error setting AI cache:", err));

  return parsedOutput;
}

/**
 * Persist an AI usage log entry to Prisma safely.
 */
async function logAIUsage(data: {
  userId?: string | null;
  provider: string;
  model: string;
  feature: string;
  action: string;
  inputTokens: number;
  outputTokens: number;
  totalTokens: number;
  cachedInputTokens?: number | null;
  isEstimatedTokens?: boolean;
  inputCost: number;
  outputCost: number;
  totalCost: number;
  currency?: string;
  cacheHit: boolean;
  costSaved?: number;
  latencyMs: number;
  status: string;
  errorCode?: string | null;
  requestHash?: string | null;
}): Promise<void> {
  try {
    await prisma.aIUsageLog.create({
      data: {
        userId: data.userId || null,
        provider: data.provider,
        model: data.model,
        feature: data.feature,
        action: data.action,
        inputTokens: data.inputTokens,
        outputTokens: data.outputTokens,
        totalTokens: data.totalTokens,
        cachedInputTokens: data.cachedInputTokens || null,
        isEstimatedTokens: data.isEstimatedTokens || false,
        inputCost: data.inputCost,
        outputCost: data.outputCost,
        totalCost: data.totalCost,
        currency: data.currency || "USD",
        cacheHit: data.cacheHit,
        costSaved: data.costSaved || 0,
        latencyMs: data.latencyMs,
        status: data.status,
        errorCode: data.errorCode || null,
        requestHash: data.requestHash || null,
      },
    });
  } catch (error) {
    console.error("Failed to write AIUsageLog to database:", error);
  }
}

// ============================================================
// PART 9 — AI Cost Summary Helpers
// ============================================================

function buildWhereClause(filters?: UsageFilters) {
  const where: Record<string, unknown> = {};
  if (filters?.userId) where.userId = filters.userId;
  if (filters?.feature) where.feature = filters.feature;
  if (filters?.provider) where.provider = filters.provider;
  if (filters?.model) where.model = filters.model;
  if (filters?.startDate || filters?.endDate) {
    where.createdAt = {
      ...(filters.startDate ? { gte: filters.startDate } : {}),
      ...(filters.endDate ? { lte: filters.endDate } : {}),
    };
  }
  return where;
}

/**
 * Get total AI spend (in USD) within an optional filter window.
 */
export async function getTotalAISpend(filters?: UsageFilters): Promise<number> {
  const agg = await prisma.aIUsageLog.aggregate({
    where: buildWhereClause(filters),
    _sum: { totalCost: true },
  });
  return Number((agg._sum.totalCost ?? 0).toFixed(6));
}

/**
 * Get AI spend broken down by provider.
 */
export async function getAISpendByProvider(
  filters?: UsageFilters
): Promise<Array<{ provider: string; totalCost: number; count: number }>> {
  const groups = await prisma.aIUsageLog.groupBy({
    by: ["provider"],
    where: buildWhereClause(filters),
    _sum: { totalCost: true },
    _count: { id: true },
  });
  return groups.map((g) => ({
    provider: g.provider,
    totalCost: Number((g._sum.totalCost ?? 0).toFixed(6)),
    count: g._count.id,
  }));
}

/**
 * Get AI spend broken down by model.
 */
export async function getAISpendByModel(
  filters?: UsageFilters
): Promise<Array<{ model: string; provider: string; totalCost: number; count: number }>> {
  const groups = await prisma.aIUsageLog.groupBy({
    by: ["model", "provider"],
    where: buildWhereClause(filters),
    _sum: { totalCost: true },
    _count: { id: true },
  });
  return groups.map((g) => ({
    model: g.model,
    provider: g.provider,
    totalCost: Number((g._sum.totalCost ?? 0).toFixed(6)),
    count: g._count.id,
  }));
}

/**
 * Get AI spend broken down by feature.
 */
export async function getAISpendByFeature(
  filters?: UsageFilters
): Promise<Array<{ feature: string; totalCost: number; count: number }>> {
  const groups = await prisma.aIUsageLog.groupBy({
    by: ["feature"],
    where: buildWhereClause(filters),
    _sum: { totalCost: true },
    _count: { id: true },
  });
  return groups.map((g) => ({
    feature: g.feature,
    totalCost: Number((g._sum.totalCost ?? 0).toFixed(6)),
    count: g._count.id,
  }));
}

/**
 * Get aggregated token usage across input and output.
 */
export async function getAITokenUsage(filters?: UsageFilters): Promise<{
  inputTokens: number;
  outputTokens: number;
  totalTokens: number;
}> {
  const agg = await prisma.aIUsageLog.aggregate({
    where: buildWhereClause(filters),
    _sum: {
      inputTokens: true,
      outputTokens: true,
      totalTokens: true,
    },
  });
  return {
    inputTokens: agg._sum.inputTokens ?? 0,
    outputTokens: agg._sum.outputTokens ?? 0,
    totalTokens: agg._sum.totalTokens ?? 0,
  };
}

/**
 * Get cache performance metrics (hit rate and money saved).
 */
export async function getAICacheMetrics(filters?: UsageFilters): Promise<{
  totalRequests: number;
  cacheHits: number;
  hitRatePercent: number;
  totalCostSaved: number;
}> {
  const where = buildWhereClause(filters);
  const [totalRequests, cacheHits, savingsAgg] = await Promise.all([
    prisma.aIUsageLog.count({ where }),
    prisma.aIUsageLog.count({ where: { ...where, cacheHit: true } }),
    prisma.aIUsageLog.aggregate({
      where: { ...where, cacheHit: true },
      _sum: { costSaved: true },
    }),
  ]);

  const hitRatePercent =
    totalRequests > 0 ? Number(((cacheHits / totalRequests) * 100).toFixed(2)) : 0;
  const totalCostSaved = Number((savingsAgg._sum.costSaved ?? 0).toFixed(6));

  return {
    totalRequests,
    cacheHits,
    hitRatePercent,
    totalCostSaved,
  };
}

/**
 * Get average cost per operation.
 */
export async function getAIAverageCostPerOperation(
  filters?: UsageFilters
): Promise<number> {
  const where = buildWhereClause(filters);
  const [totalCost, totalOps] = await Promise.all([
    getTotalAISpend(filters),
    prisma.aIUsageLog.count({ where: { ...where, cacheHit: false, status: "SUCCESS" } }),
  ]);
  return totalOps > 0 ? Number((totalCost / totalOps).toFixed(6)) : 0;
}

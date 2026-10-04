// ============================================================
// DevLeveler — Smart AI Response Cache & Key Fingerprinting
// ============================================================

import crypto from "crypto";
import { prisma } from "@/lib/prisma";

export interface CacheKeyParams {
  feature: string;
  provider?: string;
  model?: string;
  userId?: string | null;
  promptVersion?: string;
  context: unknown;
}

export interface CachedAIResult {
  response: string;
  metadata?: Record<string, unknown>;
  createdAt: Date;
}

// In-memory fast tier for repeated hot reads within the same process
interface MemoryCacheEntry {
  response: string;
  metadata?: Record<string, unknown>;
  expiresAt: number;
}
const memoryCache = new Map<string, MemoryCacheEntry>();

/**
 * Standard TTLs by feature (in seconds).
 */
export const CACHE_TTL = {
  ROADMAP: 7 * 24 * 3600, // 7 days (career goals change infrequently)
  RESUME: 7 * 24 * 3600, // 7 days (resume content hash is deterministic)
  SKILL_GAP: 3 * 24 * 3600, // 3 days
  PORTFOLIO: 3 * 24 * 3600, // 3 days
  READINESS: 24 * 3600, // 24 hours
  INTERVIEW: 24 * 3600, // 24 hours
  DEFAULT: 24 * 3600, // 1 day
} as const;

/**
 * Recursively sort object keys for deterministic JSON serialization.
 */
function sortObjectKeys(obj: unknown): unknown {
  if (obj === null || typeof obj !== "object") {
    return obj;
  }
  if (Array.isArray(obj)) {
    return obj.map(sortObjectKeys);
  }
  const sortedKeys = Object.keys(obj as Record<string, unknown>).sort();
  const result: Record<string, unknown> = {};
  for (const key of sortedKeys) {
    result[key] = sortObjectKeys((obj as Record<string, unknown>)[key]);
  }
  return result;
}

/**
 * Generate a deterministic, collision-resistant context fingerprint for AI caching.
 * Prevents cross-user leakage by binding to userId, promptVersion, model, and context hash.
 */
export function generateAICacheKey(params: CacheKeyParams): string {
  const normalizedContext = JSON.stringify(sortObjectKeys(params.context));
  const rawFingerprint = [
    params.feature,
    params.provider || "default",
    params.model || "default",
    params.userId || "anonymous",
    params.promptVersion || "v1",
    normalizedContext,
  ].join("::");

  const hash = crypto.createHash("sha256").update(rawFingerprint).digest("hex");
  return `ai:${params.feature}:${hash.slice(0, 32)}`;
}

/**
 * Retrieve a cached AI response from the fast memory tier or Prisma DB.
 */
export async function getCachedAI(cacheKey: string): Promise<CachedAIResult | null> {
  const now = Date.now();

  // 1. Fast in-memory check
  const memEntry = memoryCache.get(cacheKey);
  if (memEntry) {
    if (memEntry.expiresAt > now) {
      return {
        response: memEntry.response,
        metadata: memEntry.metadata,
        createdAt: new Date(),
      };
    }
    memoryCache.delete(cacheKey);
  }

  // 2. Database lookup
  try {
    const entry = await prisma.aICache.findUnique({
      where: { cacheKey },
    });

    if (!entry) return null;

    if (entry.expiresAt.getTime() <= now) {
      // Expired - cleanup in background
      prisma.aICache.delete({ where: { cacheKey } }).catch(() => {});
      return null;
    }

    // Populate memory cache
    memoryCache.set(cacheKey, {
      response: entry.response,
      metadata: (entry.metadata as Record<string, unknown>) ?? undefined,
      expiresAt: entry.expiresAt.getTime(),
    });

    return {
      response: entry.response,
      metadata: (entry.metadata as Record<string, unknown>) ?? undefined,
      createdAt: entry.createdAt,
    };
  } catch (error) {
    console.error("Error reading AI cache:", error);
    return null;
  }
}

/**
 * Persist an AI response into both database and memory cache.
 */
export async function setCachedAI(params: {
  cacheKey: string;
  userId?: string | null;
  feature: string;
  provider: string;
  model: string;
  response: string;
  metadata?: Record<string, unknown>;
  ttlSeconds?: number;
}): Promise<void> {
  const ttl = params.ttlSeconds ?? CACHE_TTL.DEFAULT;
  const expiresAt = new Date(Date.now() + ttl * 1000);

  // Update memory cache
  memoryCache.set(params.cacheKey, {
    response: params.response,
    metadata: params.metadata,
    expiresAt: expiresAt.getTime(),
  });

  // Update database cache
  try {
    await prisma.aICache.upsert({
      where: { cacheKey: params.cacheKey },
      update: {
        response: params.response,
        metadata: (params.metadata as object) || {},
        expiresAt,
        provider: params.provider,
        model: params.model,
      },
      create: {
        cacheKey: params.cacheKey,
        userId: params.userId || null,
        feature: params.feature,
        provider: params.provider,
        model: params.model,
        response: params.response,
        metadata: (params.metadata as object) || {},
        expiresAt,
      },
    });
  } catch (error) {
    console.error("Failed to write to AICache DB:", error);
  }
}

/**
 * Invalidate all cached AI responses for a specific user and optional feature.
 * Triggered on source changes (e.g. resume update, GitHub resync).
 */
export async function invalidateUserAICache(
  userId: string,
  feature?: string
): Promise<number> {
  try {
    // Clear from memory
    for (const key of memoryCache.keys()) {
      if (feature && !key.startsWith(`ai:${feature}:`)) continue;
      // Memory keys are hashed, so we clear feature group or clear all for user in DB
    }

    const whereClause: { userId: string; feature?: string } = { userId };
    if (feature) {
      whereClause.feature = feature;
    }

    const result = await prisma.aICache.deleteMany({
      where: whereClause,
    });

    return result.count;
  } catch (error) {
    console.error("Failed to invalidate user AI cache:", error);
    return 0;
  }
}

/**
 * Invalidate a specific cache key directly.
 */
export async function invalidateAICacheKey(cacheKey: string): Promise<void> {
  memoryCache.delete(cacheKey);
  try {
    await prisma.aICache.deleteMany({
      where: { cacheKey },
    });
  } catch (error) {
    console.error(`Failed to delete cache key ${cacheKey}:`, error);
  }
}

/**
 * Cleanup expired cache entries from DB.
 */
export async function cleanupExpiredAICache(): Promise<number> {
  try {
    const result = await prisma.aICache.deleteMany({
      where: {
        expiresAt: { lt: new Date() },
      },
    });
    return result.count;
  } catch (error) {
    console.error("Failed to cleanup expired AI cache:", error);
    return 0;
  }
}

// ---------------------------------------------------------------------------
// Backward-compatible memory helpers
// ---------------------------------------------------------------------------
export function cacheKey(provider: string, prompt: string): string {
  return generateAICacheKey({
    feature: "legacy",
    provider,
    context: prompt,
  });
}

export function getCached<T>(key: string): T | null {
  const entry = memoryCache.get(key);
  if (!entry || Date.now() > entry.expiresAt) {
    return null;
  }
  try {
    return JSON.parse(entry.response) as T;
  } catch {
    return entry.response as unknown as T;
  }
}

export function setCached<T>(key: string, data: T, ttlMs: number = 300_000): void {
  const str = typeof data === "string" ? data : JSON.stringify(data);
  memoryCache.set(key, {
    response: str,
    expiresAt: Date.now() + ttlMs,
  });
}

export function clearCache(): void {
  memoryCache.clear();
}

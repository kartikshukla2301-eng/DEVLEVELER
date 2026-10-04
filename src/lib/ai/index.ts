// ============================================================
// DevLeveler — AI Provider Entry Point
// ============================================================

import { registerProvider, getProvider } from "./provider";
import { GeminiProvider } from "./gemini";
import { OpenRouterProvider } from "./openrouter";
import { OpenAIProvider } from "./openai";

// ---------------------------------------------------------------------------
// Register all providers
// ---------------------------------------------------------------------------

registerProvider("gemini", () => new GeminiProvider());
registerProvider("openrouter", () => new OpenRouterProvider());
registerProvider("openai", () => new OpenAIProvider());

// Future providers can be registered here:
// registerProvider("openai", () => new OpenAIProvider());
// registerProvider("claude", () => new ClaudeProvider());
// registerProvider("deepseek", () => new DeepSeekProvider());
// registerProvider("groq", () => new GroqProvider());
// registerProvider("mistral", () => new MistralProvider());
// registerProvider("qwen", () => new QwenProvider());

// ---------------------------------------------------------------------------
// Re-exports
// ---------------------------------------------------------------------------

export { getProvider } from "./provider";
export { getProviderName, getProviderConfig } from "./provider";
export { extractJSON, clampScore, withRetry, executeWithTimeout } from "./helpers";
export {
  generateAICacheKey,
  getCachedAI,
  setCachedAI,
  invalidateUserAICache,
  invalidateAICacheKey,
  cleanupExpiredAICache,
  cacheKey,
  getCached,
  setCached,
  clearCache,
  CACHE_TTL,
} from "./cache";
export { AI_MODEL_PRICING, getModelPricing, calculateAICost } from "./pricing";
export {
  executeWithObservabilityAndCache,
  getTotalAISpend,
  getAISpendByProvider,
  getAISpendByModel,
  getAISpendByFeature,
  getAITokenUsage,
  getAICacheMetrics,
  getAIAverageCostPerOperation,
} from "./observability";
export { MODELS, DEFAULT_MODELS, getModelConfig } from "./models";
export type {
  AIProvider,
  ChatMessage,
  ChatSession,
  AIProviderName,
  GenerateContentOptions,
  AIUsage,
  AIResponse,
} from "./types";
export type { ModelPricing, CalculatedCost } from "./pricing";
export type { ObservabilityOptions, UsageFilters } from "./observability";

/**
 * Get the default AI provider instance.
 * This is the primary entry point for all AI operations.
 */
export function ai() {
  return getProvider();
}

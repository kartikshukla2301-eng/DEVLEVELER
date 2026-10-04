// ============================================================
// DevLeveler — Centralized AI Model Pricing & Cost Calculator
// ============================================================

import type { AIProviderName, AIUsage } from "./types";
import { DEFAULT_MODELS } from "./models";

export interface ModelPricing {
  inputPer1M: number;
  outputPer1M: number;
  cachedInputPer1M?: number;
  currency: string;
}

export interface CalculatedCost {
  inputCost: number;
  outputCost: number;
  totalCost: number;
  currency: string;
}

/**
 * Centralized model pricing configuration per 1 million tokens (USD).
 * Sourced directly from provider specifications and project model configs.
 */
export const AI_MODEL_PRICING: Record<string, ModelPricing> = {
  // Gemini Models
  "gemini-2.0-flash": {
    inputPer1M: 0.10,
    outputPer1M: 0.40,
    cachedInputPer1M: 0.025,
    currency: "USD",
  },
  "gemini-2.5-pro": {
    inputPer1M: 1.25,
    outputPer1M: 5.00,
    cachedInputPer1M: 0.3125,
    currency: "USD",
  },

  // OpenAI Models
  "gpt-4o": {
    inputPer1M: 5.00,
    outputPer1M: 15.00,
    cachedInputPer1M: 2.50,
    currency: "USD",
  },
  "gpt-4o-mini": {
    inputPer1M: 0.15,
    outputPer1M: 0.60,
    cachedInputPer1M: 0.075,
    currency: "USD",
  },

  // OpenRouter Models
  "openrouter/auto": {
    inputPer1M: 0.50,
    outputPer1M: 1.50,
    currency: "USD",
  },
  "meta-llama/llama-3.3-70b-instruct": {
    inputPer1M: 0.12,
    outputPer1M: 0.30,
    currency: "USD",
  },
  "deepseek/deepseek-chat": {
    inputPer1M: 0.14,
    outputPer1M: 0.28,
    cachedInputPer1M: 0.014,
    currency: "USD",
  },
  "google/gemini-2.0-flash-001": {
    inputPer1M: 0.10,
    outputPer1M: 0.40,
    currency: "USD",
  },

  // Other Providers
  "claude-sonnet-4-20250514": {
    inputPer1M: 3.00,
    outputPer1M: 15.00,
    cachedInputPer1M: 0.30,
    currency: "USD",
  },
  "deepseek-chat": {
    inputPer1M: 0.14,
    outputPer1M: 0.28,
    currency: "USD",
  },
  "llama-3.3-70b-versatile": {
    inputPer1M: 0.59,
    outputPer1M: 0.79,
    currency: "USD",
  },
  "mistral-large-latest": {
    inputPer1M: 2.00,
    outputPer1M: 6.00,
    currency: "USD",
  },
  "qwen-max": {
    inputPer1M: 1.60,
    outputPer1M: 6.40,
    currency: "USD",
  },
};

/**
 * Get pricing config for a model, falling back to provider defaults if needed.
 */
export function getModelPricing(
  provider: AIProviderName,
  model?: string
): ModelPricing {
  const modelKey = model || DEFAULT_MODELS[provider];
  if (modelKey && AI_MODEL_PRICING[modelKey]) {
    return AI_MODEL_PRICING[modelKey];
  }

  // Check with provider prefix
  const qualifiedKey = `${provider}/${modelKey}`;
  if (AI_MODEL_PRICING[qualifiedKey]) {
    return AI_MODEL_PRICING[qualifiedKey];
  }

  // Fallback default pricing for unknown models ($0.50/1M input, $1.50/1M output)
  return {
    inputPer1M: 0.50,
    outputPer1M: 1.50,
    currency: "USD",
  };
}

/**
 * Calculate the estimated cost of an AI operation from normalized token usage.
 */
export function calculateAICost(usage: AIUsage): CalculatedCost {
  const pricing = getModelPricing(usage.provider, usage.model);

  const inputTokens = usage.inputTokens ?? 0;
  const outputTokens = usage.outputTokens ?? 0;
  const cachedTokens = usage.cachedInputTokens ?? 0;

  let inputCost = 0;
  if (cachedTokens > 0 && pricing.cachedInputPer1M !== undefined) {
    const regularTokens = Math.max(0, inputTokens - cachedTokens);
    inputCost =
      (regularTokens / 1_000_000) * pricing.inputPer1M +
      (cachedTokens / 1_000_000) * pricing.cachedInputPer1M;
  } else {
    inputCost = (inputTokens / 1_000_000) * pricing.inputPer1M;
  }

  const outputCost = (outputTokens / 1_000_000) * pricing.outputPer1M;
  const totalCost = inputCost + outputCost;

  return {
    inputCost: Number(inputCost.toFixed(6)),
    outputCost: Number(outputCost.toFixed(6)),
    totalCost: Number(totalCost.toFixed(6)),
    currency: pricing.currency,
  };
}

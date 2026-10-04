// ============================================================
// DevLeveler — AI Shared Helpers
// ============================================================

/**
 * Extract JSON from an AI response that may contain markdown code blocks.
 */
export function extractJSON<T>(text: string): T {
  if (!text || typeof text !== "string") {
    throw new Error("Cannot extract JSON: input is empty or not a string");
  }

  // 1. Try stripping markdown code fences first
  const codeBlockMatch = text.match(/```(?:json)?\s*\n?([\s\S]*?)\n?```/i);
  const candidate = codeBlockMatch ? codeBlockMatch[1].trim() : text.trim();

  // 2. Direct parse attempt
  try {
    return JSON.parse(candidate) as T;
  } catch (firstErr) {
    // 3. Try to locate outermost JSON object or array bounds safely
    const firstBrace = candidate.indexOf("{");
    const lastBrace = candidate.lastIndexOf("}");
    if (firstBrace !== -1 && lastBrace > firstBrace) {
      try {
        return JSON.parse(candidate.slice(firstBrace, lastBrace + 1)) as T;
      } catch {
        // Fall through to error
      }
    }

    const firstBracket = candidate.indexOf("[");
    const lastBracket = candidate.lastIndexOf("]");
    if (firstBracket !== -1 && lastBracket > firstBracket) {
      try {
        return JSON.parse(candidate.slice(firstBracket, lastBracket + 1)) as T;
      } catch {
        // Fall through to error
      }
    }

    const detail = firstErr instanceof Error ? firstErr.message : "Malformed JSON";
    throw new Error(`Failed to parse AI response as JSON: ${detail}`);
  }
}

/**
 * Clamp a score to 0-100 range, handling various input types.
 */
export function clampScore(score: unknown): number {
  let val = 0;
  if (typeof score === "number") {
    val = score;
  } else if (typeof score === "string") {
    const cleaned = score.replace(/%/g, "").trim();
    const parsed = parseFloat(cleaned);
    if (!isNaN(parsed)) {
      val = parsed;
    }
  }
  return Math.max(0, Math.min(100, Math.round(val)));
}

/**
 * Retry an async function with exponential backoff.
 */
export async function withRetry<T>(
  fn: () => Promise<T>,
  options: { maxRetries?: number; baseDelay?: number; maxDelay?: number } = {}
): Promise<T> {
  const { maxRetries = 2, baseDelay = 1000, maxDelay = 10000 } = options;
  let lastError: Error | undefined;

  for (let attempt = 0; attempt <= maxRetries; attempt++) {
    try {
      return await fn();
    } catch (error) {
      lastError = error instanceof Error ? error : new Error(String(error));

      if (attempt < maxRetries) {
        const delay = Math.min(
          baseDelay * Math.pow(2, attempt),
          maxDelay
        );
        await new Promise((resolve) => setTimeout(resolve, delay));
      }
    }
  }

  throw lastError;
}

/**
 * Execute a prompt with timeout and retry.
 */
export async function executeWithTimeout<T>(
  fn: () => Promise<T>,
  timeoutMs: number = 30000
): Promise<T> {
  return Promise.race([
    fn(),
    new Promise<never>((_, reject) =>
      setTimeout(
        () => reject(new Error(`AI request timed out after ${timeoutMs}ms`)),
        timeoutMs
      )
    ),
  ]);
}

/**
 * Sanitize AI response text by removing common prefixes/suffixes.
 */
export function sanitizeResponse(text: string): string {
  return text
    .replace(/^```json\s*/i, "")
    .replace(/^```\s*/i, "")
    .replace(/\s*```$/i, "")
    .trim();
}

/**
 * Validate that a prompt is not empty.
 */
export function validatePrompt(prompt: string): void {
  if (!prompt || prompt.trim().length === 0) {
    throw new Error("Prompt cannot be empty");
  }
}

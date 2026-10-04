// ============================================================
// DevLeveler — OpenRouter AI Provider
// ============================================================

import type { AIProvider, ChatMessage, ChatSession, GenerateContentOptions, AIResponse, AIUsage } from "./types";
import { getProviderConfig } from "./provider";
import { DEFAULT_MODELS } from "./models";

// ---------------------------------------------------------------------------
// OpenRouter Provider Implementation
// ---------------------------------------------------------------------------

export class OpenRouterProvider implements AIProvider {
  private apiKey: string;
  private model: string;
  private baseUrl: string;

  constructor(apiKey?: string, model?: string) {
    const config = getProviderConfig();
    this.apiKey = apiKey || config.apiKey;
    if (!this.apiKey) {
      throw new Error("OPENROUTER_API_KEY is not set.");
    }
    this.model = model || config.model || DEFAULT_MODELS.openrouter;
    this.baseUrl = config.baseUrl || "https://openrouter.ai/api/v1";
  }

  private async request(
    messages: Array<{ role: string; content: string }>,
    system?: string,
    options?: GenerateContentOptions
  ): Promise<AIResponse> {
    const allMessages = [];
    if (system) {
      allMessages.push({ role: "system", content: system });
    }
    allMessages.push(...messages);

    const body: Record<string, unknown> = {
      model: this.model,
      messages: allMessages,
      temperature: 0.7,
    };

    if (options?.json) {
      body.response_format = { type: "json_object" };
    }

    const response = await fetch(`${this.baseUrl}/chat/completions`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${this.apiKey}`,
        "HTTP-Referer": process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000",
        "X-Title": "DevLeveler",
      },
      body: JSON.stringify(body),
    });

    if (!response.ok) {
      const error = await response.text();
      throw new Error(`OpenRouter API error: ${response.status} — ${error}`);
    }

    const data = await response.json();
    const text = data.choices?.[0]?.message?.content || "";
    const meta = data.usage;

    const usage: AIUsage = {
      provider: "openrouter",
      model: this.model,
      inputTokens: typeof meta?.prompt_tokens === "number" ? meta.prompt_tokens : null,
      outputTokens: typeof meta?.completion_tokens === "number" ? meta.completion_tokens : null,
      totalTokens: typeof meta?.total_tokens === "number" ? meta.total_tokens : null,
      cachedInputTokens: typeof meta?.prompt_tokens_details?.cached_tokens === "number" ? meta.prompt_tokens_details.cached_tokens : null,
      isEstimated: false,
    };

    return { text, usage };
  }

  async generateWithUsage(
    prompt: string,
    options?: GenerateContentOptions
  ): Promise<AIResponse> {
    return this.request([{ role: "user", content: prompt }], undefined, options);
  }

  async generateContent(
    prompt: string,
    options?: GenerateContentOptions
  ): Promise<string> {
    const res = await this.generateWithUsage(prompt, options);
    return res.text;
  }

  async generateWithSystem(
    systemPrompt: string,
    userPrompt: string,
    options?: GenerateContentOptions
  ): Promise<string> {
    const res = await this.request(
      [{ role: "user", content: userPrompt }],
      systemPrompt,
      options
    );
    return res.text;
  }

  startChat(
    history: ChatMessage[],
    systemInstruction?: string
  ): ChatSession {
    const messages = history.map((h) => ({
      role: h.role === "model" ? "assistant" : h.role,
      content: h.parts,
    }));

    return {
      sendMessage: async (message: string): Promise<string> => {
        const allMessages = [...messages, { role: "user", content: message }];
        const res = await this.request(allMessages, systemInstruction);
        const responseText = res.text;
        messages.push({ role: "user", content: message });
        messages.push({ role: "assistant", content: responseText });
        return responseText;
      },
    };
  }
}

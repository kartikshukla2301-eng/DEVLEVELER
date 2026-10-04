// ============================================================
// DevLeveler — Gemini AI Provider
// ============================================================

import { GoogleGenerativeAI } from "@google/generative-ai";
import type { AIProvider, ChatMessage, ChatSession, GenerateContentOptions, AIResponse, AIUsage } from "./types";
import { getProviderConfig } from "./provider";
import { DEFAULT_MODELS } from "./models";

// ---------------------------------------------------------------------------
// Gemini Provider Implementation
// ---------------------------------------------------------------------------

export class GeminiProvider implements AIProvider {
  private genAI: GoogleGenerativeAI;
  private modelName: string;

  constructor(apiKey?: string, model?: string) {
    const config = getProviderConfig();
    const key = apiKey || config.apiKey;
    if (!key) {
      throw new Error("GEMINI_API_KEY is not set.");
    }
    this.genAI = new GoogleGenerativeAI(key);
    this.modelName = model || config.model || DEFAULT_MODELS.gemini;
  }

  private getModel(options?: GenerateContentOptions) {
    return this.genAI.getGenerativeModel({
      model: this.modelName,
      generationConfig: {
        maxOutputTokens: 8192,
        ...(options?.json ? { responseMimeType: "application/json" } : {}),
      },
    });
  }

  async generateWithUsage(
    prompt: string,
    options?: GenerateContentOptions
  ): Promise<AIResponse> {
    const model = this.getModel(options);
    const result = await model.generateContent(prompt);
    const text = result.response.text();
    const meta = result.response.usageMetadata;

    const usage: AIUsage = {
      provider: "gemini",
      model: this.modelName,
      inputTokens: typeof meta?.promptTokenCount === "number" ? meta.promptTokenCount : null,
      outputTokens: typeof meta?.candidatesTokenCount === "number" ? meta.candidatesTokenCount : null,
      totalTokens: typeof meta?.totalTokenCount === "number" ? meta.totalTokenCount : null,
      cachedInputTokens: typeof meta?.cachedContentTokenCount === "number" ? meta.cachedContentTokenCount : null,
      isEstimated: false,
    };

    return { text, usage };
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
    const model = this.genAI.getGenerativeModel({
      model: this.modelName,
      systemInstruction: systemPrompt,
      generationConfig: {
        maxOutputTokens: 8192,
        ...(options?.json ? { responseMimeType: "application/json" } : {}),
      },
    });
    const result = await model.generateContent(userPrompt);
    return result.response.text();
  }

  startChat(
    history: ChatMessage[],
    systemInstruction?: string
  ): ChatSession {
    const modelParams: { model: string; systemInstruction?: string } = {
      model: this.modelName,
    };
    if (systemInstruction) {
      modelParams.systemInstruction = systemInstruction;
    }

    const model = this.genAI.getGenerativeModel(modelParams);

    const chat = model.startChat({
      history: history.map((h) => ({
        role: h.role,
        parts: [{ text: h.parts }],
      })),
    });

    return {
      sendMessage: async (message: string): Promise<string> => {
        const result = await chat.sendMessage(message);
        return result.response.text();
      },
    };
  }
}

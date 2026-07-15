import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";

const SpeakInput = z.object({
  text: z.string().min(1).max(3500),
  voice: z.string().min(1).max(64).optional(),
  format: z.enum(["mp3", "opus", "aac"]).optional(),
});

/**
 * Generate a single audio clip via the Lovable AI text-to-speech gateway.
 * Returns base64-encoded audio bytes that the client turns into a Blob URL.
 * Kept intentionally simple (one clip per call) so the audio guide can chunk
 * long exhibits paragraph-by-paragraph and stream playback naturally.
 */
export const generateSpeech = createServerFn({ method: "POST" })
  .inputValidator((v: unknown) => SpeakInput.parse(v))
  .handler(async ({ data }) => {
    const key = process.env.LOVABLE_API_KEY;
    if (!key) {
      throw new Error("LOVABLE_API_KEY is not configured for this project.");
    }

    const format = data.format ?? "mp3";
    const mime =
      format === "opus" ? "audio/ogg" : format === "aac" ? "audio/aac" : "audio/mpeg";

    const res = await fetch("https://ai.gateway.lovable.dev/v1/audio/speech", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${key}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: "openai/gpt-4o-mini-tts",
        input: data.text,
        voice: data.voice ?? "alloy",
        response_format: format,
        instructions:
          "You are a warm, calm museum audio guide. Speak clearly, unhurried, with cultured pronunciation of Algerian, Amazigh, Arabic and French names.",
      }),
    });

    if (!res.ok) {
      const body = await res.text().catch(() => "");
      if (res.status === 429) {
        throw new Error("The audio guide is temporarily busy. Please try again in a moment.");
      }
      if (res.status === 402) {
        throw new Error("Audio guide credits are exhausted. Please add credits to continue.");
      }
      throw new Error(`Audio guide failed (${res.status}) ${body.slice(0, 200)}`);
    }

    const buf = await res.arrayBuffer();
    const audio = Buffer.from(buf).toString("base64");
    return { audio, mime };
  });

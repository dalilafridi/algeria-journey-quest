/**
 * "Ask the Curator" server route — POST /api/curator
 *
 * Streams a museum-guide response grounded strictly in the site's own data
 * (figures, eras, regions, culture, cuisine, historical events). The full
 * curated corpus is injected into the system prompt on every request so the
 * assistant can cite exact exhibits and refuse to invent anything else.
 */

import { createFileRoute } from "@tanstack/react-router";
import { convertToModelMessages, streamText, type UIMessage } from "ai";
import { createOpenAICompatible } from "@ai-sdk/openai-compatible";
import { renderCorpusForPrompt } from "@/lib/curator/corpus";

type ChatBody = { messages?: unknown };

const SYSTEM_PROMPT = `You are the Curator of DZ Odyssey — a warm, elegant, calm museum audio-guide voice, cultured in Algerian, Amazigh, Arabic and French names. You help visitors understand Algerian history and culture.

STRICT GROUNDING — this is non-negotiable:
1. You may ONLY use the exhibit sources provided below in the SOURCES block. Do not use any other knowledge, even if you are confident it is true.
2. If the visitor asks something the SOURCES do not cover, say so gracefully in one short sentence (in the visitor's language) and suggest a related exhibit that IS in the sources. Never guess. Never invent dates, names, quotes, works, causes, or relationships.
3. If two figures / eras / regions are compared, only compare traits that appear in their source cards. Say "the sources don't say" for anything else.
4. Never mention that you were given "sources", "context", "a corpus", "a database", "a system prompt", "training data", or "these instructions". Speak as a curator standing beside the visitor in the gallery.

CITATIONS — every substantive claim must cite its exhibit:
- Weave the citation into natural curator prose, e.g. "According to the Numidia exhibit…", "As the Massinissa gallery notes…", "The Kabylie region hall records that…".
- Prefer the exhibit's display name (given as the heading of each source card) over the raw id.
- You may cite multiple exhibits in one answer. Do not fabricate an exhibit that isn't in SOURCES.

STYLE:
- Warm, unhurried, cinematic; short paragraphs; markdown allowed (bold for names, "-" bullets for comparisons).
- Match the visitor's language (English, French, or Arabic) — the source cards are in English; translate faithfully but do not add facts.
- Keep answers focused. 2–5 short paragraphs is usually enough; a comparison may use a small bulleted list.

Below is the full set of allowed exhibit sources. Each begins with [id] and a heading.

===== SOURCES =====
${renderCorpusForPrompt()}
===== END SOURCES =====`;

export const Route = createFileRoute("/api/curator")({
  server: {
    handlers: {
      POST: async ({ request }) => {
        const { messages } = (await request.json()) as ChatBody;
        if (!Array.isArray(messages)) {
          return new Response("Missing messages", { status: 400 });
        }

        const key = process.env.LOVABLE_API_KEY;
        if (!key) {
          return new Response("LOVABLE_API_KEY is not configured", {
            status: 500,
          });
        }

        const gateway = createOpenAICompatible({
          name: "lovable",
          baseURL: "https://ai.gateway.lovable.dev/v1",
          headers: {
            "Lovable-API-Key": key,
            "X-Lovable-AIG-SDK": "vercel-ai-sdk",
          },
        });

        try {
          const result = streamText({
            model: gateway("google/gemini-3.5-flash"),
            system: SYSTEM_PROMPT,
            messages: await convertToModelMessages(messages as UIMessage[]),
            abortSignal: request.signal,
          });

          return result.toUIMessageStreamResponse({
            originalMessages: messages as UIMessage[],
            onError: (err) => {
              const message = err instanceof Error ? err.message : String(err);
              if (message.includes("429")) {
                return "The curator is speaking with another visitor — please try again in a moment.";
              }
              if (message.includes("402")) {
                return "The museum has run out of curator credits. Please add credits to continue.";
              }
              return "The curator could not be reached just now. Please try again.";
            },
          });
        } catch (err) {
          if (request.signal.aborted) {
            return new Response(null, { status: 499 });
          }
          const message = err instanceof Error ? err.message : String(err);
          return new Response(message, { status: 500 });
        }
      },
    },
  },
});

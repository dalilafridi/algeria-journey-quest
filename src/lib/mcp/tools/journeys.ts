import { defineTool } from "@lovable.dev/mcp-js";
import { z } from "zod";
import { JOURNEYS, getJourney } from "@/lib/journeys";
import { t, type Lang } from "@/lib/i18n";

export const listJourneysTool = defineTool({
  name: "list_journeys",
  title: "List signature journeys",
  description: "List curated Signature Journeys through Algerian history (the Grand Tour and thematic paths).",
  inputSchema: { lang: z.enum(["en", "fr", "ar"]).optional() },
  annotations: { readOnlyHint: true, idempotentHint: true, openWorldHint: false },
  handler: ({ lang }) => {
    const L = (lang ?? "en") as Lang;
    const items = JOURNEYS.map((j) => ({
      id: j.id,
      title: t(j.title, L),
      tagline: t(j.tagline, L),
      minutes: j.minutes,
      stops: j.stops.length,
      grandTour: !!j.grandTour,
    }));
    return {
      content: [{ type: "text", text: JSON.stringify(items, null, 2) }],
      structuredContent: { count: items.length, items },
    };
  },
});

export const getJourneyTool = defineTool({
  name: "get_journey",
  title: "Get journey",
  description: "Return the full journey with all stops, framings, and curator commentary.",
  inputSchema: {
    id: z.string().describe("Journey id (e.g. 'grand-tour'). Use list_journeys to discover ids."),
    lang: z.enum(["en", "fr", "ar"]).optional(),
  },
  annotations: { readOnlyHint: true, idempotentHint: true, openWorldHint: false },
  handler: ({ id, lang }) => {
    const j = getJourney(id);
    if (!j) return { content: [{ type: "text", text: `No journey with id '${id}'.` }], isError: true };
    const L = (lang ?? "en") as Lang;
    const tr = (v: any) => (v == null ? undefined : t(v, L));
    const out = {
      id: j.id,
      title: tr(j.title),
      tagline: tr(j.tagline),
      overview: tr(j.overview),
      minutes: j.minutes,
      grandTour: !!j.grandTour,
      stops: j.stops.map((s: any) => ({
        kind: s.kind,
        emoji: s.emoji,
        name: tr(s.name),
        title: tr(s.title),
        summary: tr(s.summary),
        why: tr(s.why),
      })),
    };
    return { content: [{ type: "text", text: JSON.stringify(out, null, 2) }], structuredContent: out };
  },
});

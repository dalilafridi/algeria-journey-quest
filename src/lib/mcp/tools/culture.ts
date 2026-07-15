import { defineTool } from "@lovable.dev/mcp-js";
import { z } from "zod";
import { CULTURE_TOPICS, getCultureTopic } from "@/data/cultureTopics";
import { t, type Lang } from "@/lib/i18n";

export default defineTool({
  name: "list_culture_topics",
  title: "List culture topics",
  description: "List cultural exhibits (Music, Cuisine, Architecture, Languages, Literature, Festivals, Oral Traditions).",
  inputSchema: { lang: z.enum(["en", "fr", "ar"]).optional() },
  annotations: { readOnlyHint: true, idempotentHint: true, openWorldHint: false },
  handler: ({ lang }) => {
    const L = (lang ?? "en") as Lang;
    const items = CULTURE_TOPICS.map((c: any) => ({
      id: c.id,
      title: t(c.title, L),
      tagline: c.tagline ? t(c.tagline, L) : undefined,
    }));
    return {
      content: [{ type: "text", text: JSON.stringify(items, null, 2) }],
      structuredContent: { count: items.length, items },
    };
  },
});

export const getCultureTopicTool = defineTool({
  name: "get_culture_topic",
  title: "Get culture topic exhibit",
  description: "Return full cultural topic content: significance, historical context, living traditions, and curator note.",
  inputSchema: {
    id: z.string().describe("Culture topic id (e.g. 'music', 'cuisine'). Use list_culture_topics to discover ids."),
    lang: z.enum(["en", "fr", "ar"]).optional(),
  },
  annotations: { readOnlyHint: true, idempotentHint: true, openWorldHint: false },
  handler: ({ id, lang }) => {
    const topic: any = getCultureTopic(id);
    if (!topic) return { content: [{ type: "text", text: `No topic with id '${id}'.` }], isError: true };
    const L = (lang ?? "en") as Lang;
    const tr = (v: any) => (v == null ? undefined : t(v, L));
    const trArr = (arr: any[] | undefined) => arr?.map((v: any) => (typeof v === "object" && v && "en" in v ? t(v, L) : v));
    const out = {
      id: topic.id,
      title: tr(topic.title),
      tagline: tr(topic.tagline),
      significance: tr(topic.significance),
      historicalContext: tr(topic.historicalContext),
      influence: tr(topic.influence),
      curatorNote: tr(topic.curatorNote),
      traditions: Array.isArray(topic.traditions)
        ? topic.traditions.map((x: any) => ({ title: tr(x.title), description: tr(x.description) }))
        : undefined,
      stories: trArr(topic.stories),
    };
    return { content: [{ type: "text", text: JSON.stringify(out, null, 2) }], structuredContent: out };
  },
});

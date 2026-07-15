import { defineTool } from "@lovable.dev/mcp-js";
import { z } from "zod";
import { getFigure } from "@/data/figures";
import { t, type Lang } from "@/lib/i18n";

export default defineTool({
  name: "get_figure",
  title: "Get figure exhibit",
  description:
    "Return the full museum exhibit for one historical figure: story, importance, memorable fact, extended narrative, and era link.",
  inputSchema: {
    id: z.string().describe("Figure id (e.g. 'dihya', 'ben-mhidi'). Use list_figures to discover ids."),
    lang: z.enum(["en", "fr", "ar"]).optional(),
  },
  annotations: { readOnlyHint: true, idempotentHint: true, openWorldHint: false },
  handler: ({ id, lang }) => {
    const f = getFigure(id);
    if (!f) {
      return { content: [{ type: "text", text: `No figure with id '${id}'.` }], isError: true };
    }
    const L = (lang ?? "en") as Lang;
    const tr = (v: any) => (v == null ? undefined : t(v, L));
    const trArr = (arr: any[] | undefined) => arr?.map((v) => t(v, L));
    const out = {
      id: f.id,
      name: t(f.displayName, L),
      emoji: f.emoji,
      category: f.category,
      region: f.region,
      regionLabel: t(f.regionLabel, L),
      era: t(f.era, L),
      relatedEraId: f.relatedEraId,
      story: t(f.story, L),
      importance: t(f.importance, L),
      fact: t(f.fact, L),
      extended: f.extended
        ? {
            storyMode: trArr(f.extended.storyMode),
            whatHappened: trArr(f.extended.whatHappened),
            aftermath: trArr(f.extended.aftermath),
            keyLesson: tr(f.extended.keyLesson),
          }
        : undefined,
    };
    return {
      content: [{ type: "text", text: JSON.stringify(out, null, 2) }],
      structuredContent: out,
    };
  },
});

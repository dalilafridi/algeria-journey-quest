import { defineTool } from "@lovable.dev/mcp-js";
import { z } from "zod";
import { mapRegions } from "@/data/mapRegions";
import { getFigure } from "@/data/figures";
import { t, type Lang } from "@/lib/i18n";

export default defineTool({
  name: "get_region",
  title: "Get region exhibit",
  description: "Return the full region exhibit: identity, key historical facts, and connected figures.",
  inputSchema: {
    id: z.string().describe("Region id (e.g. 'kabylie', 'aures', 'sahara'). Use list_regions to discover ids."),
    lang: z.enum(["en", "fr", "ar"]).optional(),
  },
  annotations: { readOnlyHint: true, idempotentHint: true, openWorldHint: false },
  handler: ({ id, lang }) => {
    const r = mapRegions.find((x) => x.id === id);
    if (!r) return { content: [{ type: "text", text: `No region with id '${id}'.` }], isError: true };
    const L = (lang ?? "en") as Lang;
    const out = {
      id: r.id,
      name: t(r.name, L),
      emoji: r.emoji,
      focus: t(r.focus, L),
      summary: t(r.summary, L),
      eraId: r.eraId,
      facts: r.facts.map((f) => t(f, L)),
      figures: r.figureIds
        .map((fid) => {
          const f = getFigure(fid);
          return f ? { id: f.id, name: t(f.displayName, L), emoji: f.emoji } : null;
        })
        .filter(Boolean),
    };
    return {
      content: [{ type: "text", text: JSON.stringify(out, null, 2) }],
      structuredContent: out,
    };
  },
});

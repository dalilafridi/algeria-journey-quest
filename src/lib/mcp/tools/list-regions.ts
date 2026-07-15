import { defineTool } from "@lovable.dev/mcp-js";
import { z } from "zod";
import { mapRegions } from "@/data/mapRegions";
import { t, type Lang } from "@/lib/i18n";

export default defineTool({
  name: "list_regions",
  title: "List regions",
  description: "List Algerian regions covered in the atlas (Kabylie, Aurès, Sahara, etc.).",
  inputSchema: { lang: z.enum(["en", "fr", "ar"]).optional() },
  annotations: { readOnlyHint: true, idempotentHint: true, openWorldHint: false },
  handler: ({ lang }) => {
    const L = (lang ?? "en") as Lang;
    const items = mapRegions.map((r) => ({
      id: r.id,
      name: t(r.name, L),
      emoji: r.emoji,
      focus: t(r.focus, L),
      summary: t(r.summary, L),
      eraId: r.eraId,
    }));
    return {
      content: [{ type: "text", text: JSON.stringify(items, null, 2) }],
      structuredContent: { count: items.length, items },
    };
  },
});

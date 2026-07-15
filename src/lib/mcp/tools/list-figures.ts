import { defineTool } from "@lovable.dev/mcp-js";
import { z } from "zod";
import { figures } from "@/data/figures";
import { t, type Lang } from "@/lib/i18n";

const langSchema = z.enum(["en", "fr", "ar"]).optional().describe("Language for localized fields. Defaults to 'en'.");

export default defineTool({
  name: "list_figures",
  title: "List historical figures",
  description:
    "List Algerian historical figures in the museum. Optionally filter by category (e.g. ancient, roman, islamic, ottoman, colonial, revolutionary, modern, culture) or region.",
  inputSchema: {
    category: z.string().optional().describe("Filter by figure category id."),
    region: z.string().optional().describe("Filter by figure region id."),
    search: z.string().optional().describe("Case-insensitive substring match on English display name."),
    limit: z.number().int().min(1).max(200).optional().describe("Max results to return. Default 50."),
    lang: langSchema,
  },
  annotations: { readOnlyHint: true, idempotentHint: true, openWorldHint: false },
  handler: ({ category, region, search, limit, lang }) => {
    const L = (lang ?? "en") as Lang;
    const max = limit ?? 50;
    const needle = search?.toLowerCase().trim();
    const items = figures
      .filter((f) => !category || f.category === category)
      .filter((f) => !region || f.region === region)
      .filter((f) => !needle || t(f.displayName, "en").toLowerCase().includes(needle) || f.name.toLowerCase().includes(needle))
      .slice(0, max)
      .map((f) => ({
        id: f.id,
        name: t(f.displayName, L),
        emoji: f.emoji,
        category: f.category,
        region: f.region,
        era: t(f.era, L),
        summary: t(f.story, L),
      }));
    return {
      content: [{ type: "text", text: `Found ${items.length} figure(s).\n\n${JSON.stringify(items, null, 2)}` }],
      structuredContent: { count: items.length, items },
    };
  },
});

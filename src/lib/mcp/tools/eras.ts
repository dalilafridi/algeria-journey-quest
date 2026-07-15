import { defineTool } from "@lovable.dev/mcp-js";
import { z } from "zod";
import { eras } from "@/data/eras";
import { t, type Lang } from "@/lib/i18n";

export const listErasTool = defineTool({
  name: "list_eras",
  title: "List historical eras",
  description: "List the historical eras covered by the museum (Numidian, Roman, Islamic, Ottoman, Colonial, Independence, Modern).",
  inputSchema: { lang: z.enum(["en", "fr", "ar"]).optional() },
  annotations: { readOnlyHint: true, idempotentHint: true, openWorldHint: false },
  handler: ({ lang }) => {
    const L = (lang ?? "en") as Lang;
    const items = (eras as any[]).map((e) => ({
      id: e.id,
      title: t(e.title, L),
      subtitle: e.subtitle ? t(e.subtitle, L) : undefined,
      dates: e.dates ? t(e.dates, L) : undefined,
    }));
    return {
      content: [{ type: "text", text: JSON.stringify(items, null, 2) }],
      structuredContent: { count: items.length, items },
    };
  },
});

export const getEraTool = defineTool({
  name: "get_era",
  title: "Get era exhibit",
  description: "Return an era exhibit: overview, dates, and key content in the requested language.",
  inputSchema: {
    id: z.string().describe("Era id. Use list_eras to discover ids."),
    lang: z.enum(["en", "fr", "ar"]).optional(),
  },
  annotations: { readOnlyHint: true, idempotentHint: true, openWorldHint: false },
  handler: ({ id, lang }) => {
    const e: any = (eras as any[]).find((x) => x.id === id);
    if (!e) return { content: [{ type: "text", text: `No era with id '${id}'.` }], isError: true };
    const L = (lang ?? "en") as Lang;
    const tr = (v: any) => (v == null ? undefined : typeof v === "object" && "en" in v ? t(v, L) : v);
    const out: Record<string, unknown> = {};
    for (const [k, v] of Object.entries(e)) {
      if (Array.isArray(v)) {
        out[k] = v.map((x) => (x && typeof x === "object" && "en" in (x as any) ? t(x as any, L) : x));
      } else {
        out[k] = tr(v);
      }
    }
    return { content: [{ type: "text", text: JSON.stringify(out, null, 2) }], structuredContent: out as any };
  },
});

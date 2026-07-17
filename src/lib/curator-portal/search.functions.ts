/**
 * Studio Global Search (⌘K).
 *
 * Merges three sources in one call:
 *   - figure_drafts   (Studio-only; RLS restricts to Studio users)
 *   - source_records  (Studio-only)
 *   - public museum inventory (typed TS: figures, eras)
 *
 * All results are Studio-scoped links — no public URLs leak here.
 * The query does prefix + substring match on a small set of columns.
 */
import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";
import { requireSupabaseAuth } from "@/integrations/supabase/auth-middleware";
import { figures } from "@/data/figures";
import { eras } from "@/data/eras";
import type { LocalizedString } from "@/lib/i18n";

export type SearchResultKind =
  | "figure_draft"
  | "source"
  | "public_figure"
  | "public_era";

export interface SearchResult {
  kind: SearchResultKind;
  id: string;
  title: string;
  subtitle?: string;
  link: string;
  status?: string;
}

const en = (v: LocalizedString | string | undefined): string =>
  !v ? "" : typeof v === "string" ? v : (v.en ?? "");

const searchInput = z.object({
  q: z.string().trim().min(1).max(120),
  limit: z.number().int().min(1).max(30).default(20),
});

export const searchStudio = createServerFn({ method: "POST" })
  .middleware([requireSupabaseAuth])
  .inputValidator((d: unknown) => searchInput.parse(d))
  .handler(async ({ data, context }): Promise<SearchResult[]> => {
    const raw = data.q.trim();
    const q = raw.toLowerCase();
    const like = `%${raw.replace(/[%_]/g, (m) => "\\" + m)}%`;
    const sb = context.supabase;

    const [draftRes, sourceRes] = await Promise.all([
      sb.from("figure_drafts")
        .select("id, slug, name_en, name_fr, name_ar, status, updated_at")
        .or(`slug.ilike.${like},name_en.ilike.${like},name_fr.ilike.${like},name_ar.ilike.${like}`)
        .order("updated_at", { ascending: false })
        .limit(data.limit),
      sb.from("source_records")
        .select("id, title, author, publisher, status")
        .or(`title.ilike.${like},author.ilike.${like},publisher.ilike.${like},citation_text.ilike.${like}`)
        .order("updated_at", { ascending: false })
        .limit(data.limit),
    ]);

    const results: SearchResult[] = [];

    if (!draftRes.error) {
      for (const d of draftRes.data ?? []) {
        results.push({
          kind: "figure_draft",
          id: d.id as string,
          title: (d.name_en as string) || (d.slug as string),
          subtitle: [d.name_fr, d.name_ar].filter(Boolean).join(" · ") || (d.slug as string),
          link: `/curator/figures/${d.id}`,
          status: d.status as string | undefined,
        });
      }
    }
    if (!sourceRes.error) {
      for (const s of sourceRes.data ?? []) {
        results.push({
          kind: "source",
          id: s.id as string,
          title: s.title as string,
          subtitle: [s.author, s.publisher].filter(Boolean).join(" · ") || undefined,
          link: `/curator/sources/${s.id}`,
          status: s.status as string | undefined,
        });
      }
    }

    // Public inventory — cheap in-memory substring match.
    for (const f of figures) {
      const label = en(f.displayName) || f.name;
      if (label.toLowerCase().includes(q) || f.id.toLowerCase().includes(q)) {
        results.push({
          kind: "public_figure",
          id: f.id,
          title: label,
          subtitle: `Public inventory · ${f.id}`,
          link: `/curator/coverage`,
        });
        if (results.filter((r) => r.kind === "public_figure").length >= 8) break;
      }
    }
    for (const e of eras) {
      const label = en(e.title) || e.id;
      if (label.toLowerCase().includes(q) || e.id.toLowerCase().includes(q)) {
        results.push({
          kind: "public_era",
          id: e.id,
          title: label,
          subtitle: "Public inventory · era",
          link: `/curator/content`,
        });
      }
    }

    return results.slice(0, 40);
  });

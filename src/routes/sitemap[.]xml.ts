/**
 * Dynamic sitemap.xml — enumerates every published, canonical public route.
 *
 * Exclusions (per Phase 1 policy):
 *  - Studio / draft content and any /curator/* route.
 *  - Placeholder club museums (status !== "complete").
 *  - Personal / user-scoped screens: /profile, /passport.
 *  - Journey stop deep links (not addressable on their own; parent journey only).
 *  - Not-found and API-only routes.
 *  - Any legacy path that would only redirect.
 *
 * <lastmod> is intentionally omitted — the project has no per-page authoritative
 * change timestamp, and a shared "now" value would be misleading.
 */

import { createFileRoute } from "@tanstack/react-router";
import type {} from "@tanstack/react-start";

import { SITE_URL } from "@/lib/seo";
import { eras } from "@/data/eras";
import { figures } from "@/data/figures";
import { mapRegions } from "@/data/mapRegions";
import { CULTURE_TOPICS } from "@/data/cultureTopics";
import { ALL_ROWS, slugOfRow } from "@/lib/figureDiscovery";
import { JOURNEYS } from "@/lib/journeys";
import { lessons } from "@/data/lessons";
import { CLUB_MUSEUMS } from "@/data/clubs";
import { MATCH_THEATERS } from "@/data/matchTheater";

interface SitemapEntry {
  path: string;
  changefreq?: "always" | "hourly" | "daily" | "weekly" | "monthly" | "yearly" | "never";
  priority?: string;
}

function collect(): SitemapEntry[] {
  const entries: SitemapEntry[] = [
    // Museum front doors
    { path: "/", changefreq: "weekly", priority: "1.0" },
    { path: "/timeline", changefreq: "monthly", priority: "0.9" },
    { path: "/atlas", changefreq: "monthly", priority: "0.7" },
    { path: "/chronicle", changefreq: "monthly", priority: "0.7" },
    { path: "/map", changefreq: "monthly", priority: "0.8" },
    // /compare normalises its search params, so the bare path 307-redirects.
    // Advertise the resolved URL so the sitemap contains no redirects.
    { path: "/compare?kind=figures", changefreq: "monthly", priority: "0.5" },
    // Institutional pages
    { path: "/about", changefreq: "yearly", priority: "0.5" },
    { path: "/sources", changefreq: "yearly", priority: "0.5" },
    { path: "/privacy", changefreq: "yearly", priority: "0.3" },
    { path: "/terms", changefreq: "yearly", priority: "0.3" },
    { path: "/credits", changefreq: "yearly", priority: "0.3" },
    // Permanent standalone exhibits
    { path: "/mzab", changefreq: "monthly", priority: "0.9" },
    { path: "/timgad", changefreq: "monthly", priority: "0.8" },
    { path: "/tassili", changefreq: "monthly", priority: "0.8" },
    // Halls

    { path: "/figures", changefreq: "monthly", priority: "0.9" },
    { path: "/figures/quiz", changefreq: "monthly", priority: "0.6" },
    { path: "/culture", changefreq: "monthly", priority: "0.8" },
    { path: "/cuisine", changefreq: "monthly", priority: "0.7" },
    { path: "/cinema", changefreq: "monthly", priority: "0.7" },
    { path: "/words", changefreq: "monthly", priority: "0.6" },
    { path: "/moments", changefreq: "monthly", priority: "0.6" },
    { path: "/women-of-independence", changefreq: "monthly", priority: "0.8" },
    { path: "/ideas", changefreq: "monthly", priority: "0.6" },
    { path: "/lessons", changefreq: "monthly", priority: "0.7" },
    { path: "/stargazing", changefreq: "monthly", priority: "0.5" },
    { path: "/showcase", changefreq: "monthly", priority: "0.5" },
    // Football wing
    { path: "/football", changefreq: "monthly", priority: "0.9" },
    { path: "/football/lesvertes", changefreq: "monthly", priority: "0.8" },
    { path: "/clubs", changefreq: "monthly", priority: "0.7" },
  ];

  for (const e of eras) entries.push({ path: `/era/${e.id}`, changefreq: "monthly", priority: "0.8" });
  for (const e of eras) entries.push({ path: `/quiz/${e.id}`, changefreq: "monthly", priority: "0.5" });
  for (const r of mapRegions) entries.push({ path: `/region/${r.id}`, changefreq: "monthly", priority: "0.8" });
  for (const c of CULTURE_TOPICS) entries.push({ path: `/culture/${c.id}`, changefreq: "monthly", priority: "0.7" });
  for (const f of figures) entries.push({ path: `/figures/${f.id}`, changefreq: "monthly", priority: "0.7" });
  // Collection pages resolve their slug through figureDiscovery's row registry,
  // not the COLLECTIONS list, so the sitemap must enumerate the same source.
  for (const row of ALL_ROWS)
    entries.push({ path: `/figures/collection/${slugOfRow(row)}`, changefreq: "monthly", priority: "0.6" });
  for (const j of JOURNEYS) entries.push({ path: `/journeys/${j.id}`, changefreq: "monthly", priority: "0.7" });
  // Lessons are aggregated on /lessons; individual lessons don't have their own route.
  void lessons;
  // Only complete club museums are canonical. Placeholders ("coming-soon") stay
  // discoverable via /clubs but are not indexable pages of their own.
  for (const c of CLUB_MUSEUMS) {
    if (c.status === "complete") entries.push({ path: `/clubs/${c.id}`, changefreq: "monthly", priority: "0.7" });
  }
  for (const m of Object.keys(MATCH_THEATERS)) entries.push({ path: `/theater/${m}`, changefreq: "monthly", priority: "0.7" });

  // De-duplicate by path (guards against accidental double-registration).
  const seen = new Set<string>();
  return entries.filter((e) => {
    if (seen.has(e.path)) return false;
    seen.add(e.path);
    return true;
  });
}

export const Route = createFileRoute("/sitemap.xml")({
  server: {
    handlers: {
      GET: async () => {
        const entries = collect();
        const urls = entries.map((e) =>
          [
            "  <url>",
            `    <loc>${SITE_URL}${e.path}</loc>`,
            e.changefreq ? `    <changefreq>${e.changefreq}</changefreq>` : null,
            e.priority ? `    <priority>${e.priority}</priority>` : null,
            "  </url>",
          ]
            .filter(Boolean)
            .join("\n"),
        );

        const xml = [
          '<?xml version="1.0" encoding="UTF-8"?>',
          '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">',
          ...urls,
          "</urlset>",
        ].join("\n");

        return new Response(xml, {
          headers: {
            "Content-Type": "application/xml",
            "Cache-Control": "public, max-age=3600",
          },
        });
      },
    },
  },
});

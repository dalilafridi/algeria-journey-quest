/**
 * FigureExhibitCard — a single exhibition object in the Hall of Legends.
 *
 * Rendered as a framed museum artifact (engraved gold inner frame, spotlit
 * medallion portrait, era medallion marker and a parchment plaque). Shared by
 * the discovery rows, the "Refine collection" results grid and the dedicated
 * collection exhibit pages so every card in the hall is identical.
 */

import { Link } from "@tanstack/react-router";
import type { Figure } from "@/data/figures";
import { mapRegions } from "@/data/mapRegions";
import { badgeKindOf } from "@/lib/figureEras";
import { EraBadge } from "@/components/brand/EraBadge";
import { t, type Lang } from "@/lib/i18n";

/** Map a figure region id to a real region page id, when one exists. */
export const FIGURE_REGION_TO_MAP: Partial<Record<string, string>> = {
  kabylie: "kabylie",
  aures: "aures",
  algiers: "algiers",
  constantine: "constantine",
  "oran-west": "oran-west",
  "mascara-west": "oran-west",
  sahara: "sahara",
  numidia: "constantine",
};

export function FigureExhibitCard({
  figure: f,
  lang,
  accent = "var(--brand-gold)",
  /** When true the card fills its grid cell instead of a fixed scroll width. */
  fluid = false,
}: {
  figure: Figure;
  lang: Lang;
  accent?: string;
  fluid?: boolean;
}) {
  const regionMapId = FIGURE_REGION_TO_MAP[f.region];
  const region = regionMapId ? mapRegions.find((r) => r.id === regionMapId) : undefined;
  const badgeKind = badgeKindOf(f.category);

  return (
    <Link
      to="/figures/$figureId"
      params={{ figureId: f.id }}
      aria-label={t(f.displayName, lang)}
      className={`figure-exhibit group relative flex flex-col overflow-hidden rounded-[1.1rem] border border-border/70 bg-card transition-all duration-500 hover:-translate-y-1 focus-visible:-translate-y-1 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/40 ${
        fluid ? "w-full" : "snap-start shrink-0 w-[10.5rem] sm:w-[11.5rem]"
      }`}
      style={{ boxShadow: "var(--shadow-soft)" }}
    >
      {/* Portrait stage */}
      <div
        className="relative h-44 sm:h-48 overflow-hidden"
        style={{
          background:
            "linear-gradient(180deg, color-mix(in oklab, var(--accent) 14%, var(--card)) 0%, color-mix(in oklab, var(--primary) 8%, var(--card)) 100%)",
        }}
      >
        <div
          aria-hidden
          className="pointer-events-none absolute inset-2 rounded-[0.75rem] border"
          style={{
            borderColor: "color-mix(in oklab, var(--brand-gold) 38%, transparent)",
            boxShadow: "inset 0 0 0 1px color-mix(in oklab, var(--brand-gold-bright) 18%, transparent)",
          }}
        />
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0"
          style={{
            background:
              "radial-gradient(ellipse at 50% 35%, transparent 40%, color-mix(in oklab, var(--foreground) 22%, transparent) 100%)",
          }}
        />
        <div className="absolute inset-0 flex items-center justify-center">
          <div
            className="relative flex items-center justify-center w-24 h-24 sm:w-28 sm:h-28 rounded-full transition-transform duration-700 group-hover:scale-[1.06]"
            style={{
              background:
                "radial-gradient(circle at 35% 30%, color-mix(in oklab, var(--brand-gold-bright) 55%, var(--card)) 0%, color-mix(in oklab, var(--brand-gold) 30%, var(--card)) 45%, color-mix(in oklab, var(--brand-gold-deep) 28%, var(--card)) 100%)",
              boxShadow:
                "0 0 0 1px color-mix(in oklab, var(--brand-gold) 55%, transparent), inset 0 -8px 18px color-mix(in oklab, var(--foreground) 22%, transparent), 0 12px 26px -12px color-mix(in oklab, var(--foreground) 50%, transparent)",
            }}
          >
            <div
              aria-hidden
              className="absolute inset-1 rounded-full border"
              style={{ borderColor: "color-mix(in oklab, var(--background) 55%, transparent)" }}
            />
            <span
              aria-hidden
              className="relative text-4xl sm:text-[2.75rem] drop-shadow-[0_2px_6px_rgba(0,0,0,0.25)]"
              style={{ filter: "saturate(0.85)" }}
            >
              {f.emoji}
            </span>
          </div>
        </div>
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700"
          style={{
            background:
              "linear-gradient(120deg, transparent 30%, color-mix(in oklab, var(--brand-gold-bright) 22%, transparent) 50%, transparent 70%)",
          }}
        />
        {/* Era medallion marker */}
        <div className="absolute top-2.5 end-2.5">
          <EraBadge kind={badgeKind} size={28} />
        </div>
      </div>

      {/* Museum plaque */}
      <div className="relative px-3.5 pt-3 pb-4 flex-1 flex flex-col bg-parchment-card">
        <span
          aria-hidden
          className="absolute inset-x-3.5 top-0 h-px"
          style={{
            background: `linear-gradient(90deg, transparent, color-mix(in oklab, ${accent} 70%, transparent), transparent)`,
          }}
        />
        <div
          className="text-[9px] uppercase tracking-[0.18em] font-bold"
          style={{ color: "color-mix(in oklab, var(--brand-gold-deep) 80%, var(--muted-foreground))" }}
        >
          {t(f.era, lang)}
        </div>
        <h4
          className="mt-1 text-[1.05rem] leading-tight font-bold group-hover:text-primary transition-colors line-clamp-2"
          style={{ fontFamily: "Georgia, 'Times New Roman', serif", letterSpacing: "-0.005em" }}
        >
          {t(f.displayName, lang)}
        </h4>
        <div className="mt-auto pt-2.5 inline-flex items-center gap-1 text-[10.5px] text-muted-foreground">
          <span aria-hidden>◈</span>
          <span className="font-medium truncate">
            {region ? t(region.name, lang) : t(f.regionLabel, lang)}
          </span>
        </div>
      </div>
    </Link>
  );
}

export default FigureExhibitCard;

/**
 * ContinueExploring — "Continue Exploring" recommended exhibits.
 *
 * A unified discovery footer that threads an exhibit to related figures,
 * regions, eras and collections elsewhere in the museum. It renders small
 * medallion-style link cards grouped under gentle labels ("Related Figures",
 * "Related Regions", …) so a visit always points onward. Renders nothing when
 * no related exhibits are provided.
 */

import { Link } from "@tanstack/react-router";
import { CollectionEmblem } from "@/components/figures/CollectionEmblem";
import { MedallionFrame } from "@/components/brand/MedallionFrame";
import { t, useLang, type LocalizedString } from "@/lib/i18n";

export type ExploreItem =
  | { kind: "figure"; id: string; emoji: string; label: LocalizedString }
  | { kind: "region"; id: string; emoji: string; label: LocalizedString }
  | { kind: "era"; id: string; emoji: string; label: LocalizedString }
  | { kind: "culture"; id: string; emblem: string; label: LocalizedString }
  | { kind: "collection"; slug: string; emblem: string; accent?: string; label: LocalizedString };


export type ExploreGroup = {
  label: LocalizedString;
  items: ExploreItem[];
};

const HEADING: LocalizedString = {
  en: "Continue Exploring",
  fr: "Poursuivre la visite",
  ar: "واصل الاستكشاف",
};

function ItemCard({ item }: { item: ExploreItem }) {
  const lang = useLang();
  const inner = (
    <>
      {item.kind === "collection" ? (
        <CollectionEmblem emblem={item.emblem} accent={item.accent} size={44} className="shrink-0" interactive />
      ) : (
        <MedallionFrame size={44} tone="gold" inset={0.2} className="shrink-0">
          <span aria-hidden className="text-xl leading-none">
            {item.emoji}
          </span>
        </MedallionFrame>
      )}
      <span className="min-w-0 flex-1">
        <span
          className="block font-bold leading-tight group-hover:text-primary transition-colors truncate"
          style={{ fontFamily: "Georgia, 'Times New Roman', serif" }}
        >
          {t(item.label, lang)}
        </span>
      </span>
      <span aria-hidden className="ms-auto text-muted-foreground group-hover:text-primary transition-colors rtl:rotate-180">
        →
      </span>
    </>
  );

  const cls =
    "group flex items-center gap-3 rounded-2xl border bg-card p-3.5 transition hover:-translate-y-0.5 hover:border-primary/40 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/40";
  const style = { borderColor: "var(--border)", boxShadow: "var(--shadow-soft)" } as const;

  if (item.kind === "figure") {
    return (
      <Link to="/figures/$figureId" params={{ figureId: item.id }} className={cls} style={style}>
        {inner}
      </Link>
    );
  }
  if (item.kind === "era") {
    return (
      <Link to="/era/$eraId" params={{ eraId: item.id }} className={cls} style={style}>
        {inner}
      </Link>
    );
  }
  if (item.kind === "region") {
    return (
      <Link to="/map" hash={`region-${item.id}`} className={cls} style={style}>
        {inner}
      </Link>
    );
  }
  return (
    <Link to="/figures/collection/$collectionId" params={{ collectionId: item.slug }} className={cls} style={style}>
      {inner}
    </Link>
  );
}

export function ContinueExploring({
  groups,
  className,
}: {
  groups: ExploreGroup[];
  className?: string;
}) {
  const lang = useLang();
  const visible = groups.filter((g) => g.items.length > 0);
  if (visible.length === 0) return null;

  return (
    <section aria-label={t(HEADING, lang)} className={className}>
      <div className="flex items-center gap-3 mb-6">
        <h2
          className="text-2xl font-bold"
          style={{ fontFamily: "Georgia, 'Times New Roman', serif" }}
        >
          {t(HEADING, lang)}
        </h2>
        <span
          aria-hidden
          className="flex-1 h-px"
          style={{ background: "linear-gradient(90deg, color-mix(in oklab, var(--brand-gold) 55%, transparent), transparent)" }}
        />
      </div>

      <div className="space-y-5">
        {visible.map((group, gi) => (
          <div key={gi}>
            <div className="text-[10px] uppercase tracking-[0.22em] font-bold text-muted-foreground mb-2.5">
              {t(group.label, lang)}
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {group.items.map((item, ii) => (
                <ItemCard key={`${gi}-${ii}`} item={item} />
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

export const RELATED_LABELS = {
  figures: { en: "Related Figures", fr: "Figures liées", ar: "شخصيات ذات صلة" } as LocalizedString,
  regions: { en: "Related Regions", fr: "Régions liées", ar: "مناطق ذات صلة" } as LocalizedString,
  eras: { en: "Related Eras", fr: "Époques liées", ar: "حقب ذات صلة" } as LocalizedString,
  collections: { en: "Related Collections", fr: "Collections liées", ar: "مجموعات ذات صلة" } as LocalizedString,
};

export default ContinueExploring;

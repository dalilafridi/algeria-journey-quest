import { t, type Lang } from "@/lib/i18n";
import { MARKER_META, type AtlasPeriod, type MarkerKind } from "@/data/atlasPeriods";

/**
 * Museum-style side card describing an active overlay period:
 * borders + capitals + cities + sites + battles.
 */
export function HistoricalPeriodPanel({
  period,
  lang,
  onClose,
}: {
  period: AtlasPeriod;
  lang: Lang;
  onClose: () => void;
}) {
  const groups: MarkerKind[] = ["capital", "city", "site", "battle"];

  return (
    <div className="museum-card animate-float-up">
      <div className="flex items-start justify-between gap-3">
        <div className="min-w-0">
          <div
            className="mb-1 text-[10px] uppercase tracking-[0.28em] font-bold"
            style={{ color: period.color }}
          >
            Historical layer · {period.years}
          </div>
          <h2 className="text-2xl font-extrabold tracking-tight leading-tight">
            {t(period.name, lang)}
          </h2>
          <p className="mt-1 text-sm italic text-muted-foreground">
            {t(period.tagline, lang)}
          </p>
        </div>
        <button
          type="button"
          onClick={onClose}
          className="shrink-0 inline-flex h-8 w-8 items-center justify-center rounded-full border border-border bg-card text-muted-foreground hover:text-foreground hover:border-primary/40 transition"
          aria-label="Close layer"
        >
          ×
        </button>
      </div>

      <p className="mt-4 leading-relaxed text-foreground/90">
        {t(period.summary, lang)}
      </p>

      {/* Extent swatch */}
      <div className="mt-5 flex items-center gap-2 text-xs text-muted-foreground">
        <span
          aria-hidden
          className="inline-block h-3 w-6 rounded-sm border"
          style={{
            background: `${period.color}33`,
            borderColor: period.color,
            borderStyle: "dashed",
          }}
        />
        <span className="uppercase tracking-[0.18em] font-bold text-[10px]">
          Approximate extent
        </span>
      </div>

      {/* Marker groups */}
      {groups.map((kind) => {
        const items = period.markers.filter((m) => m.kind === kind);
        if (items.length === 0) return null;
        return (
          <div key={kind} className="mt-5">
            <div className="museum-eyebrow mb-2 flex items-center gap-2">
              <span aria-hidden style={{ color: period.color }}>
                {MARKER_META[kind].glyph}
              </span>
              <span>{t(MARKER_META[kind].label, lang)}</span>
              <span className="ms-auto text-[10px] text-muted-foreground/70">
                {items.length}
              </span>
            </div>
            <ul className="space-y-1">
              {items.map((m, i) => (
                <li
                  key={i}
                  className="flex items-start gap-2 rounded-lg px-2 py-1.5 border border-border/60 bg-card/50"
                >
                  <span
                    aria-hidden
                    className="mt-[3px] text-xs shrink-0"
                    style={{ color: period.color }}
                  >
                    {MARKER_META[kind].glyph}
                  </span>
                  <span className="text-sm font-semibold text-foreground truncate">
                    {t(m.name, lang)}
                  </span>
                </li>
              ))}
            </ul>
          </div>
        );
      })}
    </div>
  );
}

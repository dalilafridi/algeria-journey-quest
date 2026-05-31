/**
 * SourcesList — "Sources & Further Reading".
 *
 * Accessible, uncluttered suggestions for visitors who want to go deeper. No
 * academic apparatus — just a kind tag, a title and an optional credit line.
 * Renders nothing when there are no sources.
 */

import { SOURCE_KIND_LABEL, type CuratorSource } from "@/data/curatorContent";
import { t, useLang, type LocalizedString } from "@/lib/i18n";

const HEADING: LocalizedString = {
  en: "Sources & Further Reading",
  fr: "Sources & lectures",
  ar: "المصادر وقراءات إضافية",
};

export function SourcesList({
  sources,
  className,
}: {
  sources?: CuratorSource[];
  className?: string;
}) {
  const lang = useLang();
  if (!sources || sources.length === 0) return null;

  return (
    <section aria-label={t(HEADING, lang)} className={className}>
      <h3
        className="text-sm font-bold uppercase tracking-[0.16em] text-muted-foreground mb-3"
      >
        {t(HEADING, lang)}
      </h3>
      <ul className="space-y-2">
        {sources.map((s, i) => (
          <li
            key={i}
            className="flex items-start gap-3 rounded-xl border bg-card px-3.5 py-2.5"
            style={{ borderColor: "color-mix(in oklab, var(--brand-gold) 18%, var(--border))" }}
          >
            <span
              className="mt-0.5 shrink-0 rounded-md px-2 py-0.5 text-[10px] font-bold uppercase tracking-[0.12em]"
              style={{
                background: "color-mix(in oklab, var(--brand-gold) 14%, var(--muted))",
                color: "color-mix(in oklab, var(--brand-gold-deep) 85%, var(--foreground))",
              }}
            >
              {t(SOURCE_KIND_LABEL[s.kind], lang)}
            </span>
            <span className="min-w-0">
              <span className="block text-sm font-semibold leading-snug">{t(s.label, lang)}</span>
              {s.by && (
                <span className="block text-xs text-muted-foreground mt-0.5">{t(s.by, lang)}</span>
              )}
            </span>
          </li>
        ))}
      </ul>
    </section>
  );
}

export default SourcesList;

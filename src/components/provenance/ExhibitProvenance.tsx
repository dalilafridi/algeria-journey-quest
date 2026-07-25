/**
 * ExhibitProvenance — the reusable "Sources & Further Reading" panel.
 *
 * A calm, museum-styled disclosure that visitors can expand to trace every
 * historical statement on an exhibit back to reliable sources. Collapsed by
 * default, keyboard accessible (native <details>), RTL-friendly and
 * trilingual. Source lists are only rendered when the panel is opened, so
 * casual visitors pay no rendering cost.
 */

import { useCallback, useEffect, useId, useMemo, useRef, useState } from "react";
import { t, useLang, type Lang, type LocalizedString } from "@/lib/i18n";
import type {
  ConfidenceLevel,
  ExhibitProvenanceRecord,
  ProvenanceSource,
  SourceCategory,
} from "@/lib/provenance";
import { getExhibitProvenance } from "@/data/provenance/registry";
import { getSources } from "@/data/provenance/sources";

const HEADING: LocalizedString = {
  en: "Sources & Further Reading",
  fr: "Sources et lectures complémentaires",
  ar: "المصادر وقراءات إضافية",
};

const HINT: LocalizedString = {
  en: "Traceable citations, curator notes and further reading.",
  fr: "Références traçables, notes du conservateur et lectures.",
  ar: "استشهادات موثّقة وملاحظات القيّم وقراءات إضافية.",
};

const CATEGORY_LABEL: Record<SourceCategory, LocalizedString> = {
  primary: { en: "Primary Sources", fr: "Sources primaires", ar: "المصادر الأولية" },
  academic: { en: "Academic References", fr: "Références académiques", ar: "المراجع الأكاديمية" },
  museum: { en: "Museum Collections", fr: "Collections muséales", ar: "المجموعات المتحفية" },
  international: { en: "International Organizations", fr: "Organisations internationales", ar: "المنظمات الدولية" },
  archive: { en: "Digital Archives", fr: "Archives numériques", ar: "الأرشيفات الرقمية" },
  media: { en: "Newspapers & Press", fr: "Presse & journaux", ar: "الصحف والإعلام" },
  football: { en: "Football Records", fr: "Archives sportives", ar: "أرشيف كرة القدم" },
  further: { en: "Further Reading", fr: "Pour aller plus loin", ar: "قراءات إضافية" },
};

const CATEGORY_ORDER: SourceCategory[] = [
  "primary",
  "academic",
  "museum",
  "international",
  "archive",
  "media",
  "football",
  "further",
];

const CONFIDENCE_LABEL: Record<ConfidenceLevel, LocalizedString> = {
  verified: { en: "Verified", fr: "Vérifié", ar: "موثّق" },
  "widely-accepted": { en: "Widely Accepted", fr: "Largement admis", ar: "متّفق عليه على نطاق واسع" },
  "academic-debate": { en: "Academic Debate", fr: "Débat académique", ar: "نقاش أكاديمي" },
  traditional: { en: "Traditional Account", fr: "Récit traditionnel", ar: "رواية تقليدية" },
  legend: { en: "Legend / Oral Tradition", fr: "Légende / tradition orale", ar: "أسطورة / تقليد شفوي" },
};

const NOTE_LABEL: Record<NonNullable<import("@/lib/provenance").CuratorNote["kind"]>, LocalizedString> = {
  dates: { en: "On dates", fr: "Sur les dates", ar: "بشأن التواريخ" },
  reconstruction: { en: "Reconstruction", fr: "Reconstitution", ar: "إعادة تصور" },
  debate: { en: "Historical debate", fr: "Débat historique", ar: "نقاش تاريخي" },
  "oral-tradition": { en: "Oral tradition", fr: "Tradition orale", ar: "تقليد شفوي" },
  note: { en: "Curator note", fr: "Note du conservateur", ar: "ملاحظة القيّم" },
};

const MEDIA_HEADING: LocalizedString = {
  en: "Image credits & rights",
  fr: "Crédits et droits d'images",
  ar: "حقوق الصور والاعتمادات",
};

const LICENSE_LABEL: Record<NonNullable<import("@/lib/provenance").MediaAttribution["license"]>, LocalizedString> = {
  "public-domain": { en: "Public domain", fr: "Domaine public", ar: "ملكية عامة" },
  "cc-by": { en: "CC BY", fr: "CC BY", ar: "CC BY" },
  "cc-by-sa": { en: "CC BY-SA", fr: "CC BY-SA", ar: "CC BY-SA" },
  "cc-by-nc": { en: "CC BY-NC", fr: "CC BY-NC", ar: "CC BY-NC" },
  "fair-use": { en: "Fair use", fr: "Usage équitable", ar: "استخدام عادل" },
  editorial: { en: "Editorial", fr: "Éditorial", ar: "استخدام تحريري" },
  unknown: { en: "License unknown", fr: "Licence inconnue", ar: "الترخيص غير معروف" },
};

/** Global open event so <Cite/> can open the panel from anywhere on the page. */
const OPEN_EVENT = "dz-open-provenance";
type OpenDetail = { exhibitId: string; sourceId?: string };

export function openProvenance(exhibitId: string, sourceId?: string) {
  if (typeof window === "undefined") return;
  window.dispatchEvent(new CustomEvent<OpenDetail>(OPEN_EVENT, { detail: { exhibitId, sourceId } }));
}

export function ExhibitProvenance({
  exhibitId,
  record,
  className,
}: {
  exhibitId: string;
  record?: ExhibitProvenanceRecord;
  className?: string;
}) {
  const lang = useLang();
  const rec = record ?? getExhibitProvenance(exhibitId);
  const detailsRef = useRef<HTMLDetailsElement | null>(null);
  const [open, setOpen] = useState(false);
  const [highlightId, setHighlightId] = useState<string | null>(null);
  const headingId = useId();

  // Listen for openProvenance() calls targeting this exhibit.
  useEffect(() => {
    function onOpen(e: Event) {
      const ce = e as CustomEvent<OpenDetail>;
      if (ce.detail?.exhibitId !== exhibitId) return;
      const el = detailsRef.current;
      if (el) {
        el.open = true;
        setOpen(true);
        el.scrollIntoView({ behavior: "smooth", block: "start" });
      }
      if (ce.detail?.sourceId) {
        setHighlightId(ce.detail.sourceId);
        window.setTimeout(() => setHighlightId(null), 2400);
      }
    }
    window.addEventListener(OPEN_EVENT, onOpen);
    return () => window.removeEventListener(OPEN_EVENT, onOpen);
  }, [exhibitId]);

  const grouped = useMemo(() => (open && rec ? groupSources(rec, lang) : null), [open, rec, lang]);

  const onToggle = useCallback(() => {
    const el = detailsRef.current;
    if (el) setOpen(el.open);
  }, []);

  if (!rec) return null;

  return (
    <section
      aria-labelledby={headingId}
      className={`mx-auto w-full max-w-4xl px-4 sm:px-6 my-10 ${className ?? ""}`}
    >
      <details
        ref={detailsRef}
        onToggle={onToggle}
        className="group rounded-2xl border bg-card overflow-hidden"
        style={{
          borderColor: "color-mix(in oklab, var(--brand-gold) 22%, var(--border))",
          boxShadow: "var(--shadow-soft)",
        }}
      >
        <summary
          className="list-none cursor-pointer select-none px-5 sm:px-6 py-4 flex items-center gap-3 min-h-11"
          style={{
            background:
              "linear-gradient(180deg, color-mix(in oklab, var(--brand-gold) 8%, var(--card)), var(--card))",
          }}
        >
          <span
            aria-hidden
            className="inline-flex h-8 w-8 items-center justify-center rounded-full text-[13px] font-bold"
            style={{
              background: "color-mix(in oklab, var(--brand-gold) 18%, var(--muted))",
              color: "color-mix(in oklab, var(--brand-gold-deep) 85%, var(--foreground))",
            }}
          >
            §
          </span>
          <div className="min-w-0 flex-1">
            <h2
              id={headingId}
              className="text-[13px] sm:text-sm font-bold uppercase tracking-[0.18em] text-foreground"
            >
              {t(HEADING, lang)}
            </h2>
            <p className="text-[12px] text-muted-foreground mt-0.5 truncate">{t(HINT, lang)}</p>
          </div>
          {rec.confidence && <ConfidenceChip level={rec.confidence} lang={lang} />}
          <span
            aria-hidden
            className="ms-1 text-muted-foreground transition-transform group-open:rotate-180"
          >
            ▾
          </span>
        </summary>

        {open && grouped && (
          <div className="px-5 sm:px-6 pt-1 pb-6 space-y-6">
            {rec.intro && (
              <p className="text-[13.5px] leading-relaxed text-muted-foreground">
                {t(rec.intro, lang)}
              </p>
            )}

            {rec.notes && rec.notes.length > 0 && (
              <ul className="space-y-2">
                {rec.notes.map((n, i) => (
                  <li
                    key={i}
                    className="rounded-xl border px-3.5 py-2.5 text-[13px] leading-relaxed"
                    style={{
                      borderColor: "color-mix(in oklab, var(--brand-gold) 18%, var(--border))",
                      background: "color-mix(in oklab, var(--brand-gold) 5%, var(--card))",
                    }}
                  >
                    <span className="me-2 text-[10px] font-bold uppercase tracking-[0.16em] text-muted-foreground">
                      {t(NOTE_LABEL[n.kind ?? "note"], lang)}
                    </span>
                    <span className="text-foreground/90 italic">{t(n.body, lang)}</span>
                  </li>
                ))}
              </ul>
            )}

            {CATEGORY_ORDER.map((cat) => {
              const items = grouped.get(cat);
              if (!items || items.length === 0) return null;
              return (
                <div key={cat}>
                  <h3 className="text-[11px] font-bold uppercase tracking-[0.18em] text-muted-foreground mb-2">
                    {t(CATEGORY_LABEL[cat], lang)}
                  </h3>
                  <ul className="space-y-1.5">
                    {items.map((s) => (
                      <SourceItem
                        key={s.id}
                        source={s}
                        lang={lang}
                        highlighted={highlightId === s.id}
                      />
                    ))}
                  </ul>
                </div>
              );
            })}

            {rec.media && rec.media.length > 0 && (
              <div>
                <h3 className="text-[11px] font-bold uppercase tracking-[0.18em] text-muted-foreground mb-2">
                  {t(MEDIA_HEADING, lang)}
                </h3>
                <ul className="space-y-1.5">
                  {rec.media.map((m, i) => (
                    <li
                      key={i}
                      className="rounded-lg border bg-card px-3 py-2 text-[12.5px] leading-relaxed"
                      style={{ borderColor: "color-mix(in oklab, var(--brand-gold) 14%, var(--border))" }}
                    >
                      {m.caption && (
                        <div className="font-semibold text-foreground">{t(m.caption, lang)}</div>
                      )}
                      <div className="text-muted-foreground">
                        {[
                          m.photographer && t(m.photographer, lang),
                          m.collection && t(m.collection, lang),
                          m.license && t(LICENSE_LABEL[m.license], lang),
                        ]
                          .filter(Boolean)
                          .join(" · ")}
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        )}
      </details>
    </section>
  );
}

function SourceItem({
  source,
  lang,
  highlighted,
}: {
  source: ProvenanceSource;
  lang: Lang;
  highlighted: boolean;
}) {
  return (
    <li
      id={`src-${source.id}`}
      className="rounded-lg border bg-card px-3 py-2 flex items-start gap-3 transition-colors"
      style={{
        borderColor: highlighted
          ? "color-mix(in oklab, var(--brand-gold-deep) 55%, var(--border))"
          : "color-mix(in oklab, var(--brand-gold) 14%, var(--border))",
        background: highlighted
          ? "color-mix(in oklab, var(--brand-gold) 12%, var(--card))"
          : undefined,
      }}
    >
      {source.badge && (
        <span
          className="shrink-0 rounded-md px-2 py-0.5 text-[10px] font-bold uppercase tracking-[0.12em]"
          style={{
            background: "color-mix(in oklab, var(--brand-gold) 14%, var(--muted))",
            color: "color-mix(in oklab, var(--brand-gold-deep) 85%, var(--foreground))",
          }}
        >
          {source.badge}
        </span>
      )}
      <div className="min-w-0 flex-1">
        <div className="text-[13.5px] font-semibold leading-snug text-foreground">
          {source.url ? (
            <a
              href={source.url}
              target="_blank"
              rel="noreferrer noopener"
              className="hover:underline decoration-dotted underline-offset-2"
            >
              {t(source.title, lang)}
            </a>
          ) : (
            t(source.title, lang)
          )}
        </div>
        <div className="text-[11.5px] text-muted-foreground mt-0.5">
          {[
            source.author && t(source.author, lang),
            source.publisher && t(source.publisher, lang),
            source.archive && t(source.archive, lang),
            source.publishedAt,
          ]
            .filter(Boolean)
            .join(" · ")}
        </div>
        {source.note && (
          <div className="text-[12px] text-muted-foreground italic mt-1">{t(source.note, lang)}</div>
        )}
      </div>
    </li>
  );
}

function ConfidenceChip({ level, lang }: { level: ConfidenceLevel; lang: Lang }) {
  const style = CONFIDENCE_STYLE[level];
  return (
    <span
      className="shrink-0 rounded-full px-2.5 py-1 text-[10px] font-bold uppercase tracking-[0.14em]"
      style={style}
      aria-label={t(CONFIDENCE_LABEL[level], lang)}
      title={t(CONFIDENCE_LABEL[level], lang)}
    >
      {t(CONFIDENCE_LABEL[level], lang)}
    </span>
  );
}

const CONFIDENCE_STYLE: Record<ConfidenceLevel, React.CSSProperties> = {
  verified: {
    background: "color-mix(in oklab, var(--brand-olive, #4d6b3a) 22%, transparent)",
    color: "color-mix(in oklab, var(--brand-olive, #4d6b3a) 92%, var(--foreground))",
    border: "1px solid color-mix(in oklab, var(--brand-olive, #4d6b3a) 45%, var(--border))",
  },
  "widely-accepted": {
    background: "color-mix(in oklab, var(--brand-gold) 18%, transparent)",
    color: "color-mix(in oklab, var(--brand-gold-deep) 90%, var(--foreground))",
    border: "1px solid color-mix(in oklab, var(--brand-gold) 40%, var(--border))",
  },
  "academic-debate": {
    background: "color-mix(in oklab, var(--brand-terracotta, #b25a3c) 18%, transparent)",
    color: "color-mix(in oklab, var(--brand-terracotta, #b25a3c) 90%, var(--foreground))",
    border: "1px solid color-mix(in oklab, var(--brand-terracotta, #b25a3c) 40%, var(--border))",
  },
  traditional: {
    background: "color-mix(in oklab, var(--muted) 60%, transparent)",
    color: "var(--muted-foreground)",
    border: "1px solid var(--border)",
  },
  legend: {
    background: "color-mix(in oklab, var(--muted) 60%, transparent)",
    color: "var(--muted-foreground)",
    border: "1px solid var(--border)",
  },
};

function groupSources(rec: ExhibitProvenanceRecord, _lang: Lang) {
  const map = new Map<SourceCategory, ProvenanceSource[]>();
  for (const s of getSources(rec.sourceIds)) {
    const cat = s.category;
    const arr = map.get(cat) ?? [];
    arr.push(s);
    map.set(cat, arr);
  }
  if (rec.furtherReadingIds && rec.furtherReadingIds.length > 0) {
    const arr = map.get("further") ?? [];
    for (const s of getSources(rec.furtherReadingIds)) arr.push(s);
    map.set("further", arr);
  }
  return map;
}

export default ExhibitProvenance;

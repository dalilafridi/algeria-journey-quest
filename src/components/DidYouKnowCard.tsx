import { useMemo, useState } from "react";
import { t, tu, useLang, type LocalizedString } from "@/lib/i18n";
import { eras } from "@/data/eras";

type Props = {
  fact: LocalizedString;
};

const L = (en: string, fr: string, ar: string) => ({ en, fr, ar });

const COPY = {
  tapToExpand: L("Tap to discover", "Touchez pour découvrir", "اضغط للاكتشاف"),
  era: L("Era", "Époque", "الحقبة"),
  whyMatters: L("Why it matters", "Pourquoi c'est important", "لماذا يهمّ"),
  exploreEra: L("Explore this era", "Explorer cette époque", "استكشف هذه الحقبة"),
  close: L("Close", "Fermer", "إغلاق"),
  defaultWhy: L(
    "Small details like this stitch together the larger story of Algeria — its land, its people, and the memory passed between generations.",
    "Ces petits détails tissent ensemble la grande histoire de l'Algérie — sa terre, son peuple et la mémoire transmise entre les générations.",
    "تنسج هذه التفاصيل الصغيرة معًا الحكاية الكبرى للجزائر — أرضها وشعبها والذاكرة المتوارثة بين الأجيال.",
  ),
};

export function DidYouKnowCard({ fact }: Props) {
  const lang = useLang();
  const [open, setOpen] = useState(false);

  // Locate which era this fact belongs to (since dailyFacts = flatMap of era.facts)
  const era = useMemo(() => {
    return eras.find((e) => e.facts.some((f) => f === fact));
  }, [fact]);

  return (
    <button
      type="button"
      onClick={() => setOpen((v) => !v)}
      aria-expanded={open}
      className="group block w-full text-left rounded-3xl border border-accent/40 p-5 sm:p-6 transition-all duration-300 hover:-translate-y-0.5 hover:border-accent/70 focus:outline-none focus-visible:ring-2 focus-visible:ring-accent/60"
      style={{
        backgroundColor: "color-mix(in oklab, var(--accent) 18%, var(--card))",
        boxShadow: open ? "var(--shadow-glow)" : "var(--shadow-soft)",
      }}
    >
      <div className="flex items-start gap-3">
        <div className="text-3xl transition-transform duration-300 group-hover:scale-110" aria-hidden>
          💡
        </div>
        <div className="flex-1 min-w-0">
          <div className="flex items-center justify-between gap-2">
            <div className="text-xs font-bold uppercase tracking-wider text-accent-foreground/80">
              {tu("didYouKnow", lang)}
            </div>
            <span className="text-xs font-medium text-muted-foreground opacity-0 transition-opacity group-hover:opacity-100">
              {open ? t(COPY.close, lang) : t(COPY.tapToExpand, lang)}
            </span>
          </div>
          <p className="mt-1 text-foreground font-medium leading-relaxed">{t(fact, lang)}</p>

          <div
            className="grid transition-all duration-500 ease-out"
            style={{
              gridTemplateRows: open ? "1fr" : "0fr",
              opacity: open ? 1 : 0,
              marginTop: open ? "1rem" : 0,
            }}
          >
            <div className="overflow-hidden">
              <div className="rounded-2xl border border-border/60 bg-background/55 p-4 space-y-3">
                {era && (
                  <div>
                    <div className="text-[11px] font-bold uppercase tracking-wider text-muted-foreground">
                      {t(COPY.era, lang)}
                    </div>
                    <div className="mt-0.5 text-sm font-semibold text-foreground">
                      {t(era.title, lang)}
                      {era.period ? (
                        <span className="ml-2 text-muted-foreground font-normal">
                          · {t(era.period, lang)}
                        </span>
                      ) : null}
                    </div>
                  </div>
                )}

                <div>
                  <div className="text-[11px] font-bold uppercase tracking-wider text-muted-foreground">
                    {t(COPY.whyMatters, lang)}
                  </div>
                  <p className="mt-1 text-sm leading-relaxed text-foreground/85">
                    {era ? t(era.summary, lang) : t(COPY.defaultWhy, lang)}
                  </p>
                </div>

                {era && (
                  <a
                    href={`/era/${era.id}`}
                    className="inline-flex items-center gap-1 text-sm font-bold text-primary hover:underline"
                    onClick={(e) => e.stopPropagation()}
                  >
                    {t(COPY.exploreEra, lang)} →
                  </a>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </button>
  );
}

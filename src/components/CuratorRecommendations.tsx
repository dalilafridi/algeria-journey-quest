import { useEffect, useMemo, useState } from "react";
import { Link } from "@tanstack/react-router";
import { t, useLang, type Lang } from "@/lib/i18n";
import { getRecommendations, type RecKind, type Recommendation } from "@/lib/recommendations";

const SERIF = "Georgia, 'Times New Roman', serif";

const TXT = {
  title: {
    en: "The Curator recommends",
    fr: "Le conservateur recommande",
    ar: "يوصي أمين المتحف",
  },
  subtitle: {
    en: "Three exhibits chosen for you, based on what you just explored.",
    fr: "Trois expositions choisies pour vous, selon ce que vous venez d'explorer.",
    ar: "ثلاثة معارض مختارة لك بناءً على ما استكشفته للتو.",
  },
  kindLabel: {
    era: { en: "Era", fr: "Ère", ar: "حقبة" },
    figure: { en: "Figure", fr: "Figure", ar: "شخصية" },
    region: { en: "Region", fr: "Région", ar: "منطقة" },
    culture: { en: "Culture", fr: "Culture", ar: "ثقافة" },
  } as Record<RecKind, { en: string; fr: string; ar: string }>,
  visit: { en: "Enter exhibit", fr: "Entrer dans l'exposition", ar: "ادخل المعرض" },
};

const tri = (lang: Lang, s: { en: string; fr: string; ar: string }) =>
  lang === "fr" ? s.fr : lang === "ar" ? s.ar : s.en;

export function CuratorRecommendations({ kind, id }: { kind: RecKind; id: string }) {
  const lang = useLang();
  // Recompute after passport updates so personalization reflects the current visit.
  const [tick, setTick] = useState(0);
  useEffect(() => {
    const onUpdate = () => setTick((x) => x + 1);
    window.addEventListener("passport-updated", onUpdate);
    return () => window.removeEventListener("passport-updated", onUpdate);
  }, []);

  const recs = useMemo(() => getRecommendations(kind, id, 3), [kind, id, tick]);
  if (recs.length === 0) return null;

  return (
    <section
      aria-labelledby="curator-recs-title"
      className="relative mx-auto mt-10 max-w-6xl px-4 sm:px-6"
    >
      <div
        className="relative overflow-hidden rounded-3xl border p-6 sm:p-8"
        style={{
          background:
            "linear-gradient(180deg, color-mix(in oklab, var(--brand-gold) 6%, var(--card)) 0%, var(--card) 100%)",
          borderColor: "color-mix(in oklab, var(--brand-gold) 30%, var(--border))",
          boxShadow: "0 30px 80px -60px color-mix(in oklab, var(--brand-gold) 40%, transparent)",
        }}
      >
        <div
          aria-hidden
          className="pointer-events-none absolute inset-x-6 top-0 h-px"
          style={{
            background:
              "linear-gradient(90deg, transparent 0%, color-mix(in oklab, var(--brand-gold) 55%, transparent) 50%, transparent 100%)",
          }}
        />

        <header className="mb-5 flex items-end justify-between gap-4 flex-wrap">
          <div>
            <p
              className="text-[10px] uppercase tracking-[0.32em] font-semibold"
              style={{
                fontFamily: SERIF,
                color: "color-mix(in oklab, var(--brand-gold) 70%, var(--muted-foreground))",
              }}
            >
              Curator's note
            </p>
            <h2
              id="curator-recs-title"
              className="mt-1 text-xl sm:text-2xl font-semibold text-foreground"
              style={{ fontFamily: SERIF, letterSpacing: "0.01em" }}
            >
              {tri(lang, TXT.title)}
            </h2>
            <p className="mt-1 max-w-xl text-sm text-muted-foreground" style={{ fontFamily: SERIF }}>
              {tri(lang, TXT.subtitle)}
            </p>
          </div>
        </header>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {recs.map((rec) => (
            <RecCard key={`${rec.kind}-${rec.id}`} rec={rec} lang={lang} />
          ))}
        </div>
      </div>
    </section>
  );
}

function RecCard({ rec, lang }: { rec: Recommendation; lang: Lang }) {
  return (
    <Link
      to={rec.to}
      className="group relative flex flex-col overflow-hidden rounded-2xl border bg-card transition-all hover:-translate-y-0.5 hover:shadow-xl focus:outline-none focus-visible:ring-2"
      style={{
        borderColor: "color-mix(in oklab, var(--brand-gold) 25%, var(--border))",
      }}
    >
      {/* Illustrated top plate */}
      <div
        className="relative flex h-32 items-center justify-center overflow-hidden"
        style={{
          background:
            "radial-gradient(120% 100% at 50% 20%, color-mix(in oklab, var(--brand-gold) 22%, var(--muted)) 0%, var(--muted) 65%, var(--card) 100%)",
        }}
      >
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 opacity-40"
          style={{
            backgroundImage:
              "radial-gradient(circle at 20% 30%, color-mix(in oklab, var(--brand-gold) 40%, transparent) 0%, transparent 40%), radial-gradient(circle at 80% 70%, color-mix(in oklab, var(--brand-gold) 30%, transparent) 0%, transparent 45%)",
          }}
        />
        <Medallion emoji={rec.emoji} />
        <span
          className="absolute left-3 top-3 rounded-full border px-2 py-0.5 text-[10px] font-semibold uppercase tracking-[0.22em]"
          style={{
            borderColor: "color-mix(in oklab, var(--brand-gold) 45%, var(--border))",
            color: "color-mix(in oklab, var(--brand-gold) 55%, var(--foreground))",
            background: "color-mix(in oklab, var(--brand-gold) 8%, var(--card))",
            fontFamily: SERIF,
          }}
        >
          {tri(lang, TXT.kindLabel[rec.kind])}
        </span>
      </div>

      {/* Museum label */}
      <div className="flex flex-1 flex-col gap-2 p-4">
        <h3
          className="line-clamp-2 text-base font-semibold text-foreground"
          style={{ fontFamily: SERIF }}
        >
          {t(rec.title, lang)}
        </h3>
        <p className="line-clamp-2 text-xs text-muted-foreground">{t(rec.subtitle, lang)}</p>
        <div className="mt-auto flex items-center justify-between gap-2 pt-2">
          <span
            className="text-[10px] uppercase tracking-[0.2em] text-muted-foreground/90"
            style={{ fontFamily: SERIF }}
          >
            {t(rec.reason, lang)}
          </span>
          <span
            className="inline-flex items-center gap-1 text-[11px] font-semibold transition group-hover:gap-2"
            style={{
              color: "color-mix(in oklab, var(--brand-gold) 55%, var(--foreground))",
              fontFamily: SERIF,
            }}
          >
            {tri(lang, TXT.visit)} <span aria-hidden>→</span>
          </span>
        </div>
      </div>
    </Link>
  );
}

function Medallion({ emoji }: { emoji: string }) {
  return (
    <div
      className="relative flex h-20 w-20 items-center justify-center rounded-full"
      style={{
        background:
          "radial-gradient(circle at 30% 25%, #fff2b8 0%, #e9c15a 55%, #7a4d0c 100%)",
        boxShadow:
          "0 6px 18px -8px rgba(0,0,0,0.5), inset 0 0 0 1px rgba(255,240,190,0.6), inset 0 -6px 12px rgba(80,40,5,0.35)",
      }}
    >
      <span className="text-3xl drop-shadow-sm" aria-hidden>
        {emoji}
      </span>
    </div>
  );
}

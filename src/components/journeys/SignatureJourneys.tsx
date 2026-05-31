/**
 * SignatureJourneys — the curated-paths section.
 *
 * A Signature Journey is a guided thread through existing exhibits (figures,
 * eras, regions, culture, atlas). This section presents the entry-level Grand
 * Tour as a "start here" invitation, followed by the curated journeys as
 * collectible artifact cards. Selecting one opens the JourneyPlayer overlay —
 * no new routes, no duplicated content.
 *
 * Reused on the Homepage, the Hall of Legends and the Explore hub.
 */

import { useState } from "react";
import { CollectionEmblem } from "@/components/figures/CollectionEmblem";
import { JourneyPlayer } from "@/components/journeys/JourneyPlayer";
import { GRAND_TOUR, SIGNATURE_JOURNEYS, type Journey } from "@/lib/journeys";
import { t, useLang } from "@/lib/i18n";

const COPY = {
  eyebrow: {
    en: "Curated paths through history",
    fr: "Parcours guidés à travers l'histoire",
    ar: "مسارات منسّقة عبر التاريخ",
  },
  title: { en: "Signature Journeys", fr: "Parcours signature", ar: "رحلات مميّزة" },
  subtitle: {
    en: "Follow a story, not a menu. Each journey threads figures, eras, regions and culture into one guided walk.",
    fr: "Suivez une histoire, pas un menu. Chaque parcours relie figures, époques, régions et culture en une visite guidée.",
    ar: "اتبع قصة لا قائمة. كل رحلة تربط الشخصيات والعصور والمناطق والثقافة في جولة موجَّهة واحدة.",
  },
  newHere: { en: "New to Algeria Through Time?", fr: "Nouveau sur Algeria Through Time ?", ar: "جديد على Algeria Through Time؟" },
  takeGrandTour: { en: "Take the Grand Tour", fr: "Faire la Grande Visite", ar: "ابدأ الجولة الكبرى" },
  startJourney: { en: "Start journey", fr: "Commencer", ar: "ابدأ الرحلة" },
  minutes: (m: number, lang: "en" | "fr" | "ar") =>
    lang === "fr" ? `≈ ${m} min` : lang === "ar" ? `≈ ${m} دقيقة` : `≈ ${m} min`,
  stops: (n: number, lang: "en" | "fr" | "ar") =>
    lang === "fr" ? `${n} étapes` : lang === "ar" ? `${n} محطات` : `${n} stops`,
} as const;

export function SignatureJourneys({ className }: { className?: string }) {
  const lang = useLang();
  const [active, setActive] = useState<Journey | null>(null);

  return (
    <section
      aria-label={t(COPY.title, lang)}
      className={`mx-auto max-w-5xl px-4 ${className ?? ""}`}
    >
      {/* Heading */}
      <div className="text-center max-w-2xl mx-auto">
        <div className="text-[11px] font-bold uppercase tracking-[0.2em] text-primary">
          {t(COPY.eyebrow, lang)}
        </div>
        <h2
          className="mt-2 text-2xl sm:text-3xl font-extrabold"
          style={{ fontFamily: "Georgia, 'Times New Roman', serif" }}
        >
          {t(COPY.title, lang)}
        </h2>
        <p className="mt-3 text-sm sm:text-base text-muted-foreground leading-relaxed">
          {t(COPY.subtitle, lang)}
        </p>
      </div>

      {/* Start here — the Grand Tour */}
      <button
        type="button"
        onClick={() => setActive(GRAND_TOUR)}
        className="group mt-7 w-full text-start rounded-2xl border p-5 sm:p-6 transition-all hover:-translate-y-0.5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/40"
        style={{
          borderColor: "color-mix(in oklab, var(--brand-gold) 34%, var(--border))",
          background:
            "linear-gradient(135deg, color-mix(in oklab, var(--brand-gold) 10%, var(--card)), var(--card))",
          boxShadow: "var(--shadow-soft)",
        }}
      >
        <div className="flex items-center gap-4 sm:gap-5">
          <CollectionEmblem emblem={GRAND_TOUR.emblem} size={64} glow interactive className="shrink-0" />
          <div className="min-w-0 flex-1">
            <div className="text-[11px] font-bold uppercase tracking-[0.18em] text-muted-foreground">
              {t(COPY.newHere, lang)}
            </div>
            <h3
              className="mt-1 text-lg sm:text-xl font-extrabold"
              style={{ fontFamily: "Georgia, 'Times New Roman', serif" }}
            >
              {t(GRAND_TOUR.title, lang)}
            </h3>
            <p className="mt-1 text-sm text-muted-foreground leading-relaxed line-clamp-2">
              {t(GRAND_TOUR.tagline, lang)}
            </p>
          </div>
          <span
            className="hidden sm:inline-flex shrink-0 items-center gap-2 rounded-xl px-4 py-2.5 text-sm font-semibold text-primary-foreground transition group-hover:opacity-95"
            style={{ background: "var(--gradient-warm)" }}
            aria-hidden
          >
            {t(COPY.takeGrandTour, lang)}
            <span className="rtl:rotate-180">→</span>
          </span>
        </div>
        <span
          className="sm:hidden mt-4 flex items-center justify-center gap-2 rounded-xl px-4 py-2.5 text-sm font-semibold text-primary-foreground"
          style={{ background: "var(--gradient-warm)" }}
          aria-hidden
        >
          {t(COPY.takeGrandTour, lang)}
          <span className="rtl:rotate-180">→</span>
        </span>
      </button>

      {/* Curated journeys */}
      <div className="mt-6 grid gap-4 sm:grid-cols-2">
        {SIGNATURE_JOURNEYS.map((j) => (
          <button
            key={j.id}
            type="button"
            onClick={() => setActive(j)}
            className="group flex h-full flex-col items-start gap-3 rounded-2xl border border-border/70 bg-card p-5 text-start transition-all hover:-translate-y-0.5 hover:border-primary/40 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/40"
            style={{ boxShadow: "var(--shadow-soft)" }}
          >
            <div className="flex items-center gap-3">
              <CollectionEmblem emblem={j.emblem} size={48} className="shrink-0" />
              <div className="flex flex-wrap gap-1.5 text-[11px] font-semibold">
                <span className="px-2 py-0.5 rounded-full bg-muted text-muted-foreground">
                  {COPY.minutes(j.minutes, lang)}
                </span>
                <span className="px-2 py-0.5 rounded-full bg-muted text-muted-foreground">
                  {COPY.stops(j.stops.length, lang)}
                </span>
              </div>
            </div>
            <h3
              className="text-lg font-bold leading-tight group-hover:text-primary transition-colors"
              style={{ fontFamily: "Georgia, 'Times New Roman', serif" }}
            >
              {t(j.title, lang)}
            </h3>
            <p className="text-sm text-muted-foreground leading-relaxed line-clamp-2">
              {t(j.tagline, lang)}
            </p>
            <span className="mt-auto pt-1 inline-flex items-center gap-1.5 text-sm font-semibold text-primary">
              {COPY.startJourney[lang]}
              <span aria-hidden className="rtl:rotate-180 group-hover:translate-x-0.5 transition-transform">
                →
              </span>
            </span>
          </button>
        ))}
      </div>

      <JourneyPlayer journey={active} open={active !== null} onClose={() => setActive(null)} lang={lang} />
    </section>
  );
}

export default SignatureJourneys;

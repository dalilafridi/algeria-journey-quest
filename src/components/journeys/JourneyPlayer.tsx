/**
 * JourneyPlayer — a museum-style walkthrough of a Signature Journey.
 *
 * Presented as a full-screen exhibit panel (not a pop-up tutorial). The visitor
 * moves stop by stop through a curated sequence that threads existing exhibits —
 * figures, eras, regions, culture and the atlas — together into one story. Each
 * stop shows a chapter title, the live content pulled from the dataset, a "why
 * this matters" reflection and a link out to the full exhibit.
 *
 * Accessibility: dialog semantics, focus moves into the panel on open, Escape
 * exits, ←/→ move between stops, and motion respects prefers-reduced-motion.
 */

import { useCallback, useEffect, useRef, useState } from "react";
import { Link } from "@tanstack/react-router";
import { getFigure } from "@/data/figures";
import { mapRegions } from "@/data/mapRegions";
import { eras } from "@/data/eras";
import { MedallionFrame } from "@/components/brand/MedallionFrame";
import { AmazighSymbol } from "@/components/brand/AmazighSymbol";
import type { Journey, JourneyStop } from "@/lib/journeys";
import { t, type Lang, type LocalizedString } from "@/lib/i18n";

type Resolved = {
  emoji: string;
  name: LocalizedString;
  /** Short contextual line (era, region focus, or inline summary). */
  meta: LocalizedString;
  summary: LocalizedString;
  /** Kind label shown as the small chip. */
  kindLabel: LocalizedString;
};

const KIND_LABEL: Record<JourneyStop["kind"], LocalizedString> = {
  figure: { en: "Figure", fr: "Figure", ar: "شخصية" },
  region: { en: "Region", fr: "Région", ar: "منطقة" },
  era: { en: "Era", fr: "Époque", ar: "حقبة" },
  culture: { en: "Culture", fr: "Culture", ar: "ثقافة" },
  atlas: { en: "Atlas", fr: "Atlas", ar: "أطلس" },
};

function resolveStop(stop: JourneyStop): Resolved | null {
  if (stop.kind === "figure") {
    const f = getFigure(stop.id);
    if (!f) return null;
    return {
      emoji: f.emoji,
      name: f.displayName,
      meta: f.era,
      summary: f.story,
      kindLabel: KIND_LABEL.figure,
    };
  }
  if (stop.kind === "region") {
    const r = mapRegions.find((m) => m.id === stop.id);
    if (!r) return null;
    return {
      emoji: r.emoji,
      name: r.name,
      meta: r.focus,
      summary: r.summary,
      kindLabel: KIND_LABEL.region,
    };
  }
  if (stop.kind === "era") {
    const e = eras.find((x) => x.id === stop.id);
    if (!e) return null;
    return {
      emoji: e.emoji,
      name: e.title,
      meta: { en: e.dateRange, fr: e.dateRange, ar: e.dateRange },
      summary: e.summary,
      kindLabel: KIND_LABEL.era,
    };
  }
  // culture / atlas carry their own inline framing
  return {
    emoji: stop.emoji,
    name: stop.name,
    meta: KIND_LABEL[stop.kind],
    summary: stop.summary,
    kindLabel: KIND_LABEL[stop.kind],
  };
}

/** Link out to the relevant existing exhibit for a stop. */
function StopExhibitLink({
  stop,
  label,
  onNavigate,
}: {
  stop: JourneyStop;
  label: string;
  onNavigate: () => void;
}) {
  const cls =
    "mt-5 inline-flex items-center gap-2 text-sm font-semibold text-primary hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/40 rounded";
  const inner = (
    <>
      {label}
      <span aria-hidden className="rtl:rotate-180">
        →
      </span>
    </>
  );
  if (stop.kind === "figure") {
    return (
      <Link to="/figures/$figureId" params={{ figureId: stop.id }} onClick={onNavigate} className={cls}>
        {inner}
      </Link>
    );
  }
  if (stop.kind === "era") {
    return (
      <Link to="/era/$eraId" params={{ eraId: stop.id }} onClick={onNavigate} className={cls}>
        {inner}
      </Link>
    );
  }
  if (stop.kind === "region") {
    return (
      <Link to="/map" onClick={onNavigate} className={cls}>
        {inner}
      </Link>
    );
  }
  if (stop.kind === "culture") {
    return (
      <Link to="/culture" onClick={onNavigate} className={cls}>
        {inner}
      </Link>
    );
  }
  return (
    <Link to="/atlas" onClick={onNavigate} className={cls}>
      {inner}
    </Link>
  );
}

export function JourneyPlayer({
  journey,
  open,
  onClose,
  lang,
}: {
  journey: Journey | null;
  open: boolean;
  onClose: () => void;
  lang: Lang;
}) {
  // step: -1 = welcome screen, 0..n-1 = stops
  const [step, setStep] = useState(-1);
  const panelRef = useRef<HTMLDivElement>(null);
  const stops = journey?.stops ?? [];
  const total = stops.length;

  const next = useCallback(() => setStep((s) => Math.min(s + 1, total - 1)), [total]);
  const back = useCallback(() => setStep((s) => Math.max(s - 1, -1)), []);

  useEffect(() => {
    if (open) setStep(-1);
  }, [open, journey?.id]);

  useEffect(() => {
    if (!open) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    panelRef.current?.focus();
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      else if (e.key === "ArrowRight") next();
      else if (e.key === "ArrowLeft") back();
    };
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = prev;
      window.removeEventListener("keydown", onKey);
    };
  }, [open, onClose, next, back]);

  if (!open || !journey) return null;

  const exitLabel = lang === "fr" ? "Quitter le parcours" : lang === "ar" ? "إنهاء الرحلة" : "Exit journey";
  const nextLabel = lang === "fr" ? "Suivant" : lang === "ar" ? "التالي" : "Next";
  const backLabel = lang === "fr" ? "Retour" : lang === "ar" ? "السابق" : "Back";
  const beginLabel = lang === "fr" ? "Commencer le parcours" : lang === "ar" ? "ابدأ الرحلة" : "Start journey";
  const finishLabel = lang === "fr" ? "Terminer le parcours" : lang === "ar" ? "إنهاء الرحلة" : "Finish journey";
  const whyLabel = lang === "fr" ? "Pourquoi cela compte" : lang === "ar" ? "لماذا يهمّ هذا" : "Why this matters";
  const exhibitLabel = lang === "fr" ? "Voir l'exposition complète" : lang === "ar" ? "زيارة المعرض كاملًا" : "View full exhibit";
  const journeyTag = lang === "fr" ? "Parcours signature" : lang === "ar" ? "رحلة مميّزة" : "Signature journey";
  const minutesLabel = (m: number) =>
    lang === "fr" ? `≈ ${m} min` : lang === "ar" ? `≈ ${m} دقيقة` : `≈ ${m} min`;
  const stopsCount = (n: number) =>
    lang === "fr" ? `${n} étapes` : lang === "ar" ? `${n} محطات` : `${n} stops`;
  const stepLabel = (i: number) =>
    lang === "fr" ? `Étape ${i} sur ${total}` : lang === "ar" ? `المحطة ${i} من ${total}` : `Stop ${i} of ${total}`;

  const isWelcome = step < 0;
  const stop = isWelcome ? null : stops[step];
  const resolved = stop ? resolveStop(stop) : null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="journey-player-title"
      className="fixed inset-0 z-[60] flex items-stretch sm:items-center justify-center"
    >
      {/* Scrim */}
      <button
        type="button"
        aria-label={exitLabel}
        onClick={onClose}
        className="absolute inset-0 bg-foreground/55 backdrop-blur-[2px] motion-safe:animate-in motion-safe:fade-in motion-safe:duration-300"
      />

      {/* Exhibit panel */}
      <div
        ref={panelRef}
        tabIndex={-1}
        className="relative z-10 w-full sm:max-w-2xl sm:rounded-[1.75rem] border bg-parchment-card outline-none overflow-y-auto max-h-dvh sm:max-h-[88dvh] flex flex-col motion-safe:animate-cinematic-in"
        style={{
          borderColor: "color-mix(in oklab, var(--brand-gold) 32%, var(--border))",
          boxShadow: "var(--shadow-soft)",
        }}
      >
        {/* Engraved watermark */}
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 opacity-[0.04] text-[16rem] font-black leading-none flex items-center justify-center select-none"
          style={{ color: "var(--accent)" }}
        >
          {journey.emblem}
        </div>

        {/* Top bar */}
        <div className="relative flex items-center justify-between gap-3 px-5 sm:px-8 pt-5 pb-3 border-b border-border/60">
          <div className="inline-flex items-center gap-2 text-[11px] uppercase tracking-[0.18em] font-bold text-muted-foreground min-w-0">
            <span aria-hidden style={{ color: "var(--brand-gold-deep)" }}>
              {journey.emblem}
            </span>
            <span className="truncate">{journeyTag}</span>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="inline-flex items-center gap-1.5 rounded-full border border-border bg-card px-3 py-1.5 text-sm font-semibold text-muted-foreground hover:text-foreground hover:border-primary/40 transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/40"
          >
            <span aria-hidden>✕</span>
            <span className="hidden sm:inline">{exitLabel}</span>
          </button>
        </div>

        {/* Body */}
        <div className="relative flex-1 px-5 sm:px-8 py-6 sm:py-8">
          {isWelcome ? (
            <div className="text-center max-w-xl mx-auto">
              <div className="flex justify-center mb-5">
                <MedallionFrame size={84} tone="gold" glow animate="reveal" inset={0.22}>
                  {journey.emblem === "ⵣ" ? (
                    <AmazighSymbol size={40} glow={false} />
                  ) : (
                    <span
                      aria-hidden
                      className="leading-none select-none"
                      style={{
                        fontSize: 40,
                        color: "color-mix(in oklab, var(--brand-gold-deep) 55%, #2a1c0c)",
                      }}
                    >
                      {journey.emblem}
                    </span>
                  )}
                </MedallionFrame>
              </div>
              <h2
                id="journey-player-title"
                className="text-2xl sm:text-3xl font-extrabold leading-tight"
                style={{ fontFamily: "Georgia, 'Times New Roman', serif" }}
              >
                {t(journey.title, lang)}
              </h2>
              <div className="mt-3 flex flex-wrap items-center justify-center gap-2 text-xs font-semibold">
                <span className="px-2.5 py-1 rounded-full bg-muted text-muted-foreground">
                  {minutesLabel(journey.minutes)}
                </span>
                <span className="px-2.5 py-1 rounded-full bg-muted text-muted-foreground">
                  {stopsCount(total)}
                </span>
              </div>
              <p className="mt-4 text-base text-muted-foreground leading-relaxed">
                {t(journey.overview, lang)}
              </p>
            </div>
          ) : (
            stop &&
            resolved && (
              <div>
                <div className="flex items-center gap-2 text-[11px] uppercase tracking-[0.18em] font-bold text-muted-foreground">
                  <span aria-hidden className="inline-block w-6 h-px" style={{ background: "var(--brand-gold)" }} />
                  {stepLabel(step + 1)}
                </div>
                <h2
                  id="journey-player-title"
                  className="mt-2 text-xl sm:text-2xl font-bold"
                  style={{ fontFamily: "Georgia, 'Times New Roman', serif", color: "var(--brand-gold-deep)" }}
                >
                  {t(stop.title, lang)}
                </h2>

                {/* Plaque header: medallion + identity */}
                <div className="mt-5 flex items-center gap-4">
                  <MedallionFrame
                    size={108}
                    tone="gold"
                    glow
                    inset={0.2}
                    className="w-24 h-24 sm:w-28 sm:h-28 shrink-0"
                  >
                    <span aria-hidden className="text-5xl sm:text-6xl">
                      {resolved.emoji}
                    </span>
                  </MedallionFrame>
                  <div className="min-w-0">
                    <h3
                      className="text-2xl sm:text-3xl font-extrabold leading-tight"
                      style={{ fontFamily: "Georgia, 'Times New Roman', serif" }}
                    >
                      {t(resolved.name, lang)}
                    </h3>
                    <div className="mt-2 flex flex-wrap gap-1.5 text-xs">
                      <span className="px-2.5 py-0.5 rounded-full bg-muted text-muted-foreground font-semibold">
                        {t(resolved.kindLabel, lang)}
                      </span>
                      <span className="px-2.5 py-0.5 rounded-full bg-muted text-muted-foreground font-semibold">
                        {t(resolved.meta, lang)}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Summary pulled from the live exhibit */}
                <p className="mt-4 text-[15px] text-muted-foreground leading-relaxed">
                  {t(resolved.summary, lang)}
                </p>

                {/* Why it matters */}
                <div
                  className="mt-5 rounded-2xl border p-4"
                  style={{
                    borderColor: "color-mix(in oklab, var(--brand-gold) 28%, var(--border))",
                    background: "color-mix(in oklab, var(--brand-gold) 7%, var(--card))",
                  }}
                >
                  <div className="text-[10px] uppercase tracking-[0.16em] text-muted-foreground font-bold mb-1.5">
                    {whyLabel}
                  </div>
                  <p className="text-sm text-foreground/90 leading-relaxed">{t(stop.why, lang)}</p>
                </div>

                <StopExhibitLink stop={stop} label={exhibitLabel} onNavigate={onClose} />
              </div>
            )
          )}
        </div>

        {/* Progress dots */}
        <div className="relative flex items-center justify-center gap-1.5 px-5 pb-1" aria-hidden>
          {stops.map((s, i) => (
            <span
              key={`${s.kind}-${i}`}
              className="h-1.5 rounded-full transition-all"
              style={{
                width: i === step ? "1.5rem" : "0.375rem",
                background:
                  i === step
                    ? "var(--brand-gold-deep)"
                    : i < step
                      ? "color-mix(in oklab, var(--brand-gold) 45%, var(--border))"
                      : "var(--border)",
              }}
            />
          ))}
        </div>

        {/* Controls */}
        <div className="relative flex items-center justify-between gap-3 px-5 sm:px-8 py-4 border-t border-border/60 bg-card/60">
          <button
            type="button"
            onClick={back}
            disabled={isWelcome}
            className="inline-flex items-center gap-1.5 rounded-xl border border-border bg-card px-4 py-2.5 text-sm font-semibold transition hover:border-primary/40 disabled:opacity-40 disabled:cursor-not-allowed focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/40 min-h-11"
          >
            <span aria-hidden className="rtl:rotate-180">
              ←
            </span>
            {backLabel}
          </button>

          {step >= total - 1 && !isWelcome ? (
            <button
              type="button"
              onClick={onClose}
              className="inline-flex items-center gap-2 rounded-xl px-5 py-2.5 text-sm font-semibold text-primary-foreground transition hover:opacity-95 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/40 min-h-11"
              style={{ background: "var(--gradient-warm)" }}
            >
              {finishLabel}
              <span aria-hidden>✓</span>
            </button>
          ) : (
            <button
              type="button"
              onClick={next}
              className="inline-flex items-center gap-2 rounded-xl px-5 py-2.5 text-sm font-semibold text-primary-foreground transition hover:opacity-95 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/40 min-h-11"
              style={{ background: "var(--gradient-warm)" }}
            >
              {isWelcome ? beginLabel : nextLabel}
              <span aria-hidden className="rtl:rotate-180">
                →
              </span>
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

export default JourneyPlayer;

/**
 * GuidedTour — a curated, museum-style walkthrough of the Hall of Legends.
 *
 * Presented as a full-screen exhibit panel (not a pop-up tutorial). The visitor
 * is guided stop by stop through a chronological sequence of figures, each
 * framed as an exhibit plaque with name, era, role, a short story and a "why
 * this matters" reflection. Controls: Back, Next, Exit, View Full Story.
 *
 * Accessibility: dialog semantics, focus is moved into the panel on open,
 * Escape exits, ←/→ move between stops, and all motion respects
 * prefers-reduced-motion via Tailwind's motion-reduce utilities.
 */

import { useCallback, useEffect, useRef, useState } from "react";
import { Link } from "@tanstack/react-router";
import { getFigure, FIGURE_CATEGORIES } from "@/data/figures";
import { figureMeta } from "@/data/figureMeta";
import { collectionOf } from "@/lib/figureCollections";
import { eraOfCategory, LEGEND_ERAS } from "@/lib/figureEras";
import { EraBadge } from "@/components/brand/EraBadge";
import { HALL_TOUR } from "@/lib/figureTour";
import { t, type Lang } from "@/lib/i18n";

export function GuidedTour({
  open,
  onClose,
  lang,
}: {
  open: boolean;
  onClose: () => void;
  lang: Lang;
}) {
  // step: -1 = welcome screen, 0..n-1 = stops
  const [step, setStep] = useState(-1);
  const panelRef = useRef<HTMLDivElement>(null);
  const stops = HALL_TOUR.stops;
  const total = stops.length;

  const next = useCallback(() => setStep((s) => Math.min(s + 1, total - 1)), [total]);
  const back = useCallback(() => setStep((s) => Math.max(s - 1, -1)), []);

  // Reset to welcome whenever the tour is opened.
  useEffect(() => {
    if (open) setStep(-1);
  }, [open]);

  // Lock body scroll + keyboard controls while open.
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

  if (!open) return null;

  const exitLabel = lang === "fr" ? "Quitter la visite" : lang === "ar" ? "إنهاء الجولة" : "Exit tour";
  const nextLabel = lang === "fr" ? "Suivant" : lang === "ar" ? "التالي" : "Next";
  const backLabel = lang === "fr" ? "Retour" : lang === "ar" ? "السابق" : "Back";
  const beginLabel = lang === "fr" ? "Commencer la visite" : lang === "ar" ? "ابدأ الجولة" : "Begin the walk";
  const fullStoryLabel = lang === "fr" ? "Voir l'histoire complète" : lang === "ar" ? "القصة الكاملة" : "View full story";
  const finishLabel = lang === "fr" ? "Terminer la visite" : lang === "ar" ? "إنهاء الجولة" : "Finish the tour";
  const whyLabel = lang === "fr" ? "Pourquoi cette figure compte" : lang === "ar" ? "لماذا تهمّ هذه الشخصية" : "Why this figure matters";
  const stepLabel = (i: number) =>
    lang === "fr" ? `Étape ${i} sur ${total}` : lang === "ar" ? `المحطة ${i} من ${total}` : `Stop ${i} of ${total}`;

  const isWelcome = step < 0;
  const stop = isWelcome ? null : stops[step];
  const figure = stop ? getFigure(stop.figureId) : null;
  const era = figure ? LEGEND_ERAS.find((e) => e.id === eraOfCategory(figure.category))! : null;
  const col = figure ? collectionOf(figure.id) : null;
  const roleDef = figure ? FIGURE_CATEGORIES.find((c) => c.id === figure.category) : null;
  const fm = figure ? figureMeta[figure.id] : undefined;

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="guided-tour-title"
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
        {/* Faint engraved watermark */}
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 opacity-[0.04] text-[16rem] font-black leading-none flex items-center justify-center select-none"
          style={{ color: "var(--accent)" }}
        >
          ⵣ
        </div>

        {/* Top bar */}
        <div className="relative flex items-center justify-between gap-3 px-5 sm:px-8 pt-5 pb-3 border-b border-border/60">
          <div className="inline-flex items-center gap-2 text-[11px] uppercase tracking-[0.18em] font-bold text-muted-foreground">
            <span aria-hidden style={{ color: "var(--brand-gold-deep)" }}>❖</span>
            {lang === "fr" ? "Visite guidée" : lang === "ar" ? "جولة مُرشدة" : "Guided tour"}
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
                <div
                  className="flex items-center justify-center w-20 h-20 rounded-full"
                  style={{
                    background:
                      "radial-gradient(circle at 35% 30%, color-mix(in oklab, var(--brand-gold-bright) 55%, var(--card)) 0%, color-mix(in oklab, var(--brand-gold) 30%, var(--card)) 45%, color-mix(in oklab, var(--brand-gold-deep) 28%, var(--card)) 100%)",
                    boxShadow:
                      "0 0 0 1px color-mix(in oklab, var(--brand-gold) 55%, transparent), var(--shadow-gold-glow)",
                  }}
                >
                  <span aria-hidden className="text-4xl">ⵣ</span>
                </div>
              </div>
              <h2
                id="guided-tour-title"
                className="text-2xl sm:text-3xl font-extrabold leading-tight"
                style={{ fontFamily: "Georgia, 'Times New Roman', serif" }}
              >
                {t(HALL_TOUR.welcome.title, lang)}
              </h2>
              <p className="mt-4 text-base text-muted-foreground leading-relaxed">
                {t(HALL_TOUR.welcome.intro, lang)}
              </p>
            </div>
          ) : (
            figure &&
            era &&
            col && (
              <div>
                <div className="flex items-center gap-2 text-[11px] uppercase tracking-[0.18em] font-bold text-muted-foreground">
                  <span aria-hidden className="inline-block w-6 h-px" style={{ background: "var(--brand-gold)" }} />
                  {stepLabel(step + 1)}
                </div>
                <h2
                  id="guided-tour-title"
                  className="mt-2 text-xl sm:text-2xl font-bold"
                  style={{ fontFamily: "Georgia, 'Times New Roman', serif", color: "var(--brand-gold-deep)" }}
                >
                  {t(stop!.title, lang)}
                </h2>

                {/* Plaque header: medallion + identity */}
                <div className="mt-5 flex items-center gap-4">
                  <div
                    className="relative flex items-center justify-center w-24 h-24 sm:w-28 sm:h-28 rounded-full shrink-0"
                    style={{
                      background:
                        "radial-gradient(circle at 35% 30%, color-mix(in oklab, var(--brand-gold-bright) 55%, var(--card)) 0%, color-mix(in oklab, var(--brand-gold) 30%, var(--card)) 45%, color-mix(in oklab, var(--brand-gold-deep) 28%, var(--card)) 100%)",
                      boxShadow:
                        "0 0 0 1px color-mix(in oklab, var(--brand-gold) 55%, transparent), var(--shadow-gold-glow)",
                    }}
                  >
                    <span aria-hidden className="text-5xl sm:text-6xl">{figure.emoji}</span>
                    <div className="absolute -bottom-1 -end-1">
                      <EraBadge kind={era.badge} size={40} />
                    </div>
                  </div>
                  <div className="min-w-0">
                    <h3
                      className="text-2xl sm:text-3xl font-extrabold leading-tight"
                      style={{ fontFamily: "Georgia, 'Times New Roman', serif" }}
                    >
                      {t(figure.displayName, lang)}
                    </h3>
                    <div className="mt-2 flex flex-wrap gap-1.5 text-xs">
                      <span className="px-2.5 py-0.5 rounded-full bg-muted text-muted-foreground font-semibold">
                        {t(era.label, lang)}
                      </span>
                      {roleDef && (
                        <span className="px-2.5 py-0.5 rounded-full bg-muted text-muted-foreground font-semibold">
                          {t(roleDef.label, lang)}
                        </span>
                      )}
                    </div>
                  </div>
                </div>

                {/* Cinematic line */}
                {fm?.cinematicLine && (
                  <p
                    className="mt-5 text-lg italic text-foreground/85 leading-relaxed"
                    style={{ fontFamily: "Georgia, 'Times New Roman', serif" }}
                  >
                    “{t(fm.cinematicLine, lang)}”
                  </p>
                )}

                {/* Story */}
                <p className="mt-4 text-[15px] text-muted-foreground leading-relaxed">
                  {t(figure.story, lang)}
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
                  <p className="text-sm text-foreground/90 leading-relaxed">
                    {t(stop!.whyMatters, lang)}
                  </p>
                </div>

                <Link
                  to="/figures/$figureId"
                  params={{ figureId: figure.id }}
                  onClick={onClose}
                  className="mt-5 inline-flex items-center gap-2 text-sm font-semibold text-primary hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/40 rounded"
                >
                  {fullStoryLabel}
                  <span aria-hidden>→</span>
                </Link>
              </div>
            )
          )}
        </div>

        {/* Progress dots */}
        <div className="relative flex items-center justify-center gap-1.5 px-5 pb-1" aria-hidden>
          {stops.map((s, i) => (
            <span
              key={s.figureId}
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
            <span aria-hidden>←</span>
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
              <span aria-hidden>→</span>
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

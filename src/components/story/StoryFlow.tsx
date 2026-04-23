import { useEffect, useState } from "react";
import { t, useLang, type LocalizedString } from "@/lib/i18n";
import { saveJourneyPlace } from "@/lib/continuity";

/**
 * One cinematic scene inside a StoryFlow.
 * - title: optional short scene heading
 * - body: 1–2 short paragraphs of clear language
 * - icon: optional small emoji shown above the title
 * - guide: optional gentle narrator line shown at the top of the scene
 */
export type StoryScene = {
  icon?: string;
  title?: LocalizedString;
  body: LocalizedString;
  guide?: LocalizedString;
};

export type StoryFlowProps = {
  scenes: StoryScene[];
  /** CSS color (var or oklch). Used for a soft gradient background and accents. */
  accent?: string;
  /** Optional global title shown above the scene (e.g. topic name). */
  title?: LocalizedString;
  /** Optional readable name for Continue where you left off. */
  continuityTitle?: LocalizedString;
  /** Optional default narrator voice if a scene does not provide its own. */
  defaultGuide?: LocalizedString;
};

const LBL = {
  next: { en: "Next", fr: "Suivant", ar: "التالي" },
  prev: { en: "Previous", fr: "Précédent", ar: "السابق" },
  restart: { en: "Replay story", fr: "Rejouer le récit", ar: "إعادة القصة" },
  scene: { en: "Scene", fr: "Scène", ar: "مشهد" },
  story: { en: "Story", fr: "Récit", ar: "حكاية" },
} as const;

const slugify = (value: string) =>
  value
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "") || "story";

/**
 * StoryFlow — cinematic, guided storytelling component.
 *
 * Pacing: one scene at a time, soft fade-in, narrator voice, tiny progress dots.
 * Lightweight: pure CSS transitions, no media. Works in EN / FR / AR (RTL-safe).
 */
export function StoryFlow({ scenes, accent = "var(--secondary)", title, continuityTitle, defaultGuide }: StoryFlowProps) {
  const lang = useLang();
  const isAr = lang === "ar";
  const [step, setStep] = useState(0);
  const [hasInteracted, setHasInteracted] = useState(false);
  const [tick, setTick] = useState(0); // forces re-mount on scene change for the fade-in
  const total = scenes.length;
  const scene = scenes[Math.min(step, total - 1)];

  useEffect(() => {
    setTick((n) => n + 1);
  }, [step]);

  useEffect(() => {
    const label = continuityTitle ?? title;
    if (!label || !hasInteracted || typeof window === "undefined") return;
    const storySlug = slugify(t(label, "en"));
    const match = window.location.hash.match(new RegExp(`^#story-${storySlug}-scene-(\\d+)$`));
    if (match) {
      const nextStep = Number(match[1]) - 1;
      if (Number.isFinite(nextStep)) setStep(Math.max(0, Math.min(total - 1, nextStep)));
    }
  }, [continuityTitle, title, total]);

  useEffect(() => {
    const label = continuityTitle ?? title;
    if (!label || typeof window === "undefined") return;
    const storySlug = slugify(t(label, "en"));
    const sceneText = {
      fr: `Scène ${step + 1}`,
      en: `Scene ${step + 1}`,
      ar: `المشهد ${step + 1}`,
    };
    saveJourneyPlace({
      section: "story",
      label: typeof label === "string" ? { fr: label, en: label, ar: label } : label,
      description: sceneText,
      href: `${window.location.pathname}#story-${storySlug}-scene-${step + 1}`,
    });
  }, [continuityTitle, hasInteracted, step, title]);

  if (total === 0) return null;

  const goto = (i: number) => {
    setHasInteracted(true);
    setStep(Math.max(0, Math.min(total - 1, i)));
  };
  const isLast = step === total - 1;

  return (
    <section
      className="relative rounded-2xl border overflow-hidden"
      id={`story-${slugify(t(continuityTitle ?? title ?? LBL.story, "en"))}-scene-${step + 1}`}
      style={{
        background:
          "linear-gradient(160deg, color-mix(in oklab, " +
          accent +
          " 14%, var(--card)) 0%, var(--card) 70%)",
        borderColor: "color-mix(in oklab, " + accent + " 28%, var(--border))",
        boxShadow: "var(--shadow-soft)",
      }}
      aria-label={t(title, lang) || t(LBL.story, lang)}
    >
      {/* Header strip: tiny eyebrow + step counter */}
      <header className="flex items-center justify-between px-5 sm:px-7 pt-4">
        <span
          className="inline-flex items-center gap-1.5 text-[11px] font-bold uppercase tracking-wider"
          style={{ color: "color-mix(in oklab, " + accent + " 70%, var(--foreground))" }}
        >
          <span className="text-base leading-none" aria-hidden>📖</span>
          {title ? t(title, lang) : t(LBL.story, lang)}
        </span>
        <span className="text-[11px] font-semibold text-muted-foreground tabular-nums">
          {step + 1} / {total}
        </span>
      </header>

      {/* Scene body — re-mounts on step change so fade-in plays */}
      <div
        key={tick}
        className="px-5 sm:px-7 py-6 sm:py-8 min-h-[14rem] flex flex-col justify-center animate-fade-in"
      >
        {(scene.guide || defaultGuide) && (
          <div
            className="mb-4 flex items-start gap-2.5 text-[13px] sm:text-sm italic leading-relaxed"
            style={{ color: "color-mix(in oklab, var(--foreground) 75%, transparent)" }}
          >
            <span className="shrink-0 mt-0.5" aria-hidden>🪶</span>
            <p>{t(scene.guide ?? defaultGuide, lang)}</p>
          </div>
        )}

        {scene.icon && (
          <div className="text-3xl sm:text-4xl mb-2" aria-hidden>
            {scene.icon}
          </div>
        )}

        {scene.title && (
          <h3 className="text-xl sm:text-2xl font-extrabold tracking-tight leading-snug">
            {t(scene.title, lang)}
          </h3>
        )}

        <div className={(scene.title ? "mt-3 " : "") + "space-y-3 max-w-prose text-base sm:text-[17px] leading-relaxed text-foreground/90"}>
          {t(scene.body, lang)
            .split(/\n+/)
            .filter(Boolean)
            .slice(0, 3)
            .map((paragraph, i) => (
              <p key={i}>{paragraph}</p>
            ))}
        </div>
      </div>

      {/* Footer: dots + nav */}
      <footer className="px-5 sm:px-7 pb-5 flex items-center justify-between gap-3">
        <button
          type="button"
          onClick={() => goto(step - 1)}
          disabled={step === 0}
          className="text-sm font-semibold text-muted-foreground hover:text-foreground disabled:opacity-30 transition-colors min-h-[36px] px-1"
          aria-label={t(LBL.prev, lang)}
        >
          {isAr ? "→" : "←"} {t(LBL.prev, lang)}
        </button>

        <div className="flex items-center gap-1.5" role="tablist" aria-label={t(LBL.scene, lang)}>
          {scenes.map((_, i) => {
            const active = i === step;
            return (
              <button
                key={i}
                type="button"
                onClick={() => goto(i)}
                aria-label={`${t(LBL.scene, lang)} ${i + 1}`}
                aria-selected={active}
                role="tab"
                className="rounded-full transition-all"
                style={{
                  width: active ? 18 : 6,
                  height: 6,
                  background: active ? accent : "color-mix(in oklab, " + accent + " 25%, var(--border))",
                }}
              />
            );
          })}
        </div>

        {isLast ? (
          <button
            type="button"
            onClick={() => goto(0)}
            className="text-sm font-semibold transition-opacity hover:opacity-80 min-h-[36px] px-1"
            style={{ color: "color-mix(in oklab, " + accent + " 70%, var(--foreground))" }}
          >
            ↺ {t(LBL.restart, lang)}
          </button>
        ) : (
          <button
            type="button"
            onClick={() => goto(step + 1)}
            className="text-sm font-bold min-h-[36px] px-3 rounded-full text-primary-foreground transition-transform hover:scale-[1.02] active:scale-[0.98]"
            style={{ background: accent }}
          >
            {t(LBL.next, lang)} {isAr ? "←" : "→"}
          </button>
        )}
      </footer>
    </section>
  );
}

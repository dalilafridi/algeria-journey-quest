/**
 * MemoryMoment — an optional, emotional highlight block.
 *
 * One memorable, human line meant to create connection rather than convey
 * facts. Presented as a centred, engraved-feeling moment so it lingers.
 * Renders nothing when no moment is provided.
 */

import { t, useLang, type LocalizedString } from "@/lib/i18n";

const LABEL: LocalizedString = { en: "Memory Moment", fr: "Instant de mémoire", ar: "لحظة من الذاكرة" };

export function MemoryMoment({
  moment,
  className,
}: {
  moment?: LocalizedString;
  className?: string;
}) {
  const lang = useLang();
  if (!moment) return null;

  return (
    <figure
      aria-label={t(LABEL, lang)}
      className={`relative rounded-2xl border px-5 py-7 sm:px-8 sm:py-9 text-center overflow-hidden ${className ?? ""}`}
      style={{
        borderColor: "color-mix(in oklab, var(--brand-gold) 34%, var(--border))",
        background:
          "radial-gradient(120% 120% at 50% 0%, color-mix(in oklab, var(--brand-gold) 12%, var(--card)), var(--card))",
        boxShadow: "var(--shadow-soft)",
      }}
    >
      <span
        aria-hidden
        className="pointer-events-none absolute -top-6 left-1/2 -translate-x-1/2 text-[8rem] leading-none opacity-[0.06] select-none"
        style={{ color: "var(--brand-gold-deep)" }}
      >
        ✦
      </span>
      <div className="relative flex items-center justify-center gap-2 mb-3">
        <span aria-hidden className="h-px w-6" style={{ background: "var(--brand-gold)" }} />
        <span className="text-[10px] sm:text-[11px] font-bold uppercase tracking-[0.22em] text-muted-foreground">
          {t(LABEL, lang)}
        </span>
        <span aria-hidden className="h-px w-6" style={{ background: "var(--brand-gold)" }} />
      </div>
      <blockquote
        className="relative mx-auto max-w-2xl text-lg sm:text-xl leading-relaxed text-foreground/90"
        style={{ fontFamily: "Georgia, 'Times New Roman', serif" }}
      >
        {t(moment, lang)}
      </blockquote>
    </figure>
  );
}

export default MemoryMoment;

import { useEffect, useState } from "react";
import { useImmersion } from "@/lib/immersion";
import { useAmbience, bindAmbienceVisibility } from "@/lib/ambience";
import { useLang } from "@/lib/i18n";

/**
 * MuseumDock — a small, calm floating dock that hosts:
 *   • Museum Mode (focused reading / dimmed chrome)
 *   • Ambient atmosphere (procedural desert-air bed, off by default)
 *
 * Designed to be unobtrusive: collapses to a single round chip; expands
 * upward on click. Persists user preferences. No autoplay.
 */
export function MuseumDock() {
  const [museum, setMuseum] = useImmersion();
  const [ambient, setAmbient] = useAmbience();
  const [open, setOpen] = useState(false);
  const [mounted, setMounted] = useState(false);
  const lang = useLang();

  useEffect(() => {
    setMounted(true);
    bindAmbienceVisibility();
  }, []);

  // If ambience preference was on from previous session, do NOT auto-start
  // (browsers block autoplay anyway). Wait for explicit user gesture.

  if (!mounted) return null;

  const T = {
    museum:
      lang === "fr" ? "Mode musée" : lang === "ar" ? "وضع المتحف" : "Museum Mode",
    museumHint:
      lang === "fr"
        ? "Lecture immersive, interface apaisée"
        : lang === "ar"
          ? "قراءة غامرة، واجهة هادئة"
          : "Focused reading, calmer interface",
    ambient:
      lang === "fr" ? "Ambiance sonore" : lang === "ar" ? "أجواء صوتية" : "Ambient air",
    ambientHint:
      lang === "fr"
        ? "Souffle doux et bourdon discret"
        : lang === "ar"
          ? "نسيم خفيف وطنين هادئ"
          : "Soft wind, distant drone",
    open:
      lang === "fr" ? "Atmosphère" : lang === "ar" ? "الأجواء" : "Atmosphere",
    on: lang === "fr" ? "Activé" : lang === "ar" ? "مفعّل" : "On",
    off: lang === "fr" ? "Désactivé" : lang === "ar" ? "متوقف" : "Off",
  };

  return (
    <div
      data-museum-dock
      className="fixed z-40 bottom-[calc(env(safe-area-inset-bottom)+1rem)] right-3 sm:right-5 print:hidden"
      aria-label={T.open}
    >
      {open && (
        <div
          className="mb-2 w-[260px] rounded-2xl border border-border bg-card/95 backdrop-blur-md shadow-lg overflow-hidden animate-float-up"
          style={{ boxShadow: "var(--shadow-soft)" }}
        >
          <DockHeader label={T.open} onClose={() => setOpen(false)} />
          <DockRow
            icon="🏛️"
            label={T.museum}
            hint={T.museumHint}
            on={museum}
            onChange={setMuseum}
            onLabel={T.on}
            offLabel={T.off}
          />
          <div className="h-px bg-border/70 mx-3" />
          <DockRow
            icon="🌬️"
            label={T.ambient}
            hint={T.ambientHint}
            on={ambient}
            onChange={setAmbient}
            onLabel={T.on}
            offLabel={T.off}
          />
        </div>
      )}

      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-expanded={open}
        aria-label={T.open}
        className={
          "relative inline-flex items-center justify-center w-12 h-12 rounded-full border border-border bg-card/95 backdrop-blur-md text-foreground transition-all hover:-translate-y-0.5 " +
          (museum || ambient ? "ring-1 ring-accent/60" : "")
        }
        style={{ boxShadow: "var(--shadow-soft)" }}
      >
        <span className="text-lg leading-none" aria-hidden>
          {museum ? "🏛️" : "✦"}
        </span>
        {(museum || ambient) && (
          <span
            className="absolute -top-0.5 -right-0.5 w-2.5 h-2.5 rounded-full bg-accent border border-card"
            aria-hidden
          />
        )}
      </button>
    </div>
  );
}

function DockHeader({ label, onClose }: { label: string; onClose: () => void }) {
  return (
    <div className="flex items-center justify-between px-3.5 pt-3 pb-2">
      <span className="text-[10px] uppercase tracking-[0.22em] font-bold text-muted-foreground">
        ⵣ {label}
      </span>
      <button
        type="button"
        onClick={onClose}
        className="text-muted-foreground hover:text-foreground transition p-1 -mr-1"
        aria-label="Close"
      >
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
          <line x1="18" y1="6" x2="6" y2="18" />
          <line x1="6" y1="6" x2="18" y2="18" />
        </svg>
      </button>
    </div>
  );
}

function DockRow({
  icon,
  label,
  hint,
  on,
  onChange,
  onLabel,
  offLabel,
}: {
  icon: string;
  label: string;
  hint: string;
  on: boolean;
  onChange: (v: boolean) => void;
  onLabel: string;
  offLabel: string;
}) {
  return (
    <button
      type="button"
      onClick={() => onChange(!on)}
      className="w-full flex items-start gap-3 px-3.5 py-3 text-left hover:bg-muted/60 transition"
      aria-pressed={on}
    >
      <span className="text-xl leading-none mt-0.5" aria-hidden>
        {icon}
      </span>
      <span className="flex-1 min-w-0">
        <span className="block text-sm font-semibold text-foreground leading-tight">
          {label}
        </span>
        <span className="block text-xs text-muted-foreground mt-0.5 leading-snug">
          {hint}
        </span>
      </span>
      <span
        className={
          "shrink-0 mt-0.5 inline-flex items-center h-5 w-9 rounded-full transition-colors " +
          (on ? "bg-primary" : "bg-muted-foreground/30")
        }
        aria-hidden
      >
        <span
          className={
            "inline-block w-4 h-4 rounded-full bg-card shadow-sm transition-transform " +
            (on ? "translate-x-[18px]" : "translate-x-0.5")
          }
        />
      </span>
      <span className="sr-only">{on ? onLabel : offLabel}</span>
    </button>
  );
}

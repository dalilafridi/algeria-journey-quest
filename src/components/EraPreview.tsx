import { useMemo, useState } from "react";
import { Link } from "@tanstack/react-router";
import { Eye, Lightbulb, Quote, Sparkles, X } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogTrigger,
} from "@/components/ui/dialog";
import { eraExtras } from "@/data/eraExtras";
import { figures } from "@/data/figures";
import type { Era } from "@/data/eras";
import { t, tu, type Lang } from "@/lib/i18n";
import { isUnlocked } from "@/lib/progress";

type Props = {
  era: Era;
  image?: string;
  lang: Lang;
  className?: string;
};

const PEEK_LABEL: Record<Lang, string> = {
  en: "Peek inside",
  fr: "Entrouvrir la porte",
  ar: "ألقِ نظرة",
};

const ENTRANCE_LABEL: Record<Lang, string> = {
  en: "Exhibition preview",
  fr: "Aperçu d'exposition",
  ar: "لمحة من المعرض",
};

const FEATURED_FIGURE: Record<Lang, string> = {
  en: "Featured voice",
  fr: "Voix mise en lumière",
  ar: "صوتٌ مختار",
};

const ARTIFACT_LABEL: Record<Lang, string> = {
  en: "Curator's note",
  fr: "Note du conservateur",
  ar: "ملاحظة أمين المعرض",
};

const INSIGHT_LABEL: Record<Lang, string> = {
  en: "Did you know?",
  fr: "Le saviez-vous ?",
  ar: "هل تعلم؟",
};

const ENTER_LABEL: Record<Lang, string> = {
  en: "Enter the era",
  fr: "Entrer dans l'époque",
  ar: "ادخل الحقبة",
};

const STILL_LOCKED: Record<Lang, string> = {
  en: "Walk through the previous chapter to open this room.",
  fr: "Parcourez le chapitre précédent pour ouvrir cette salle.",
  ar: "أكمل الفصل السابق لفتح هذه القاعة.",
};

export function EraPreview({ era, image, lang, className }: Props) {
  const [open, setOpen] = useState(false);
  const extras = eraExtras[era.id];
  const unlocked = isUnlocked(era.id);

  const featuredFigure = useMemo(() => {
    const id = extras?.keyFigureIds?.[0];
    if (!id) return null;
    return figures.find((f) => f.id === id) ?? null;
  }, [extras]);

  // Stable, era-keyed pick (no jumping on each render).
  const fact = useMemo(() => {
    const pool = era.facts ?? [];
    if (pool.length === 0) return null;
    const seed = era.id.split("").reduce((acc, c) => acc + c.charCodeAt(0), 0);
    return pool[seed % pool.length];
  }, [era]);

  const note = extras?.museumNotes?.[0];
  const quote = extras?.memoryCard?.quote;
  const cinematic = extras?.cinematicLine;

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <button
          type="button"
          className={
            className ??
            "inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-[12px] font-semibold border border-border/70 bg-card/70 backdrop-blur text-foreground/80 hover:text-foreground hover:bg-card transition-colors min-h-[36px]"
          }
        >
          <Eye className="w-3.5 h-3.5 opacity-80" aria-hidden />
          <span>{PEEK_LABEL[lang]}</span>
        </button>
      </DialogTrigger>

      <DialogContent
        className="max-w-lg p-0 overflow-hidden border-border/70 bg-card/95 backdrop-blur-xl"
        style={{ boxShadow: "var(--shadow-glow), var(--shadow-soft)" }}
      >
        {/* Atmospheric image */}
        <div className="relative aspect-[16/9] overflow-hidden">
          {image ? (
            <img
              src={image}
              alt={t(era.title, lang)}
              loading="lazy"
              className="w-full h-full object-cover scale-105 animate-cinematic-in"
            />
          ) : (
            <div className="w-full h-full" style={{ background: "var(--gradient-warm)" }} />
          )}
          <div
            className="absolute inset-0 pointer-events-none"
            style={{
              background:
                "linear-gradient(180deg, color-mix(in oklab, var(--foreground) 25%, transparent) 0%, transparent 35%, color-mix(in oklab, var(--background) 92%, transparent) 100%)",
            }}
            aria-hidden
          />
          <div className="absolute top-3 start-3 inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-[0.18em] border border-white/30 bg-black/30 text-white/90 backdrop-blur">
            <span aria-hidden>ⵣ</span>
            {ENTRANCE_LABEL[lang]}
          </div>
          <button
            type="button"
            onClick={() => setOpen(false)}
            className="absolute top-3 end-3 inline-flex items-center justify-center w-9 h-9 rounded-full bg-black/35 hover:bg-black/55 backdrop-blur text-white/90 transition"
            aria-label="Close"
          >
            <X className="w-4 h-4" />
          </button>
          <div className="absolute inset-x-0 bottom-0 p-4 sm:p-5">
            <div className="text-[11px] font-semibold text-white/80 uppercase tracking-[0.18em]">
              {era.dateRange}
            </div>
            <h3
              className="mt-1 text-xl sm:text-2xl font-extrabold text-white leading-tight"
              style={{ letterSpacing: "-0.01em", textShadow: "0 2px 18px rgba(0,0,0,0.45)" }}
            >
              {t(era.title, lang)}
            </h3>
          </div>
        </div>

        {/* Body */}
        <div className="px-5 sm:px-6 pt-4 pb-5 sm:pb-6 space-y-4 max-h-[60vh] overflow-y-auto">
          {cinematic && (
            <p className="text-sm sm:text-[15px] italic text-foreground/85 leading-relaxed">
              “{t(cinematic, lang)}”
            </p>
          )}

          {featuredFigure && (
            <PreviewBlock
              icon={<Sparkles className="w-3.5 h-3.5" />}
              label={FEATURED_FIGURE[lang]}
            >
              <div className="flex items-start gap-3">
                <div
                  className="shrink-0 w-11 h-11 rounded-full flex items-center justify-center text-xl border border-border/70"
                  style={{ background: "var(--gradient-warm)" }}
                  aria-hidden
                >
                  {featuredFigure.emoji}
                </div>
                <div className="min-w-0">
                  <div className="text-sm font-bold text-foreground leading-tight">
                    {t(featuredFigure.displayName, lang)}
                  </div>
                  <p className="text-xs text-foreground/75 mt-1 leading-relaxed line-clamp-3">
                    {t(featuredFigure.importance, lang)}
                  </p>
                </div>
              </div>
            </PreviewBlock>
          )}

          {quote && (
            <PreviewBlock icon={<Quote className="w-3.5 h-3.5" />} label={ARTIFACT_LABEL[lang]}>
              <p className="text-sm text-foreground/85 italic leading-relaxed">
                “{t(quote, lang)}”
              </p>
            </PreviewBlock>
          )}

          {note && (
            <PreviewBlock
              icon={<Sparkles className="w-3.5 h-3.5" />}
              label={t(note.title, lang)}
            >
              <p className="text-sm text-foreground/80 leading-relaxed">
                {t(note.body, lang)}
              </p>
            </PreviewBlock>
          )}

          {fact && (
            <PreviewBlock icon={<Lightbulb className="w-3.5 h-3.5" />} label={INSIGHT_LABEL[lang]}>
              <p className="text-sm text-foreground/85 leading-relaxed">{t(fact, lang)}</p>
            </PreviewBlock>
          )}
        </div>

        {/* Footer */}
        <div className="px-5 sm:px-6 pb-5 sm:pb-6 pt-1 flex items-center justify-between gap-3 border-t border-border/60">
          <div className="text-[11px] text-muted-foreground italic leading-snug pr-2">
            {unlocked ? tu("journeySubtitle", lang) : STILL_LOCKED[lang]}
          </div>
          {unlocked ? (
            <Link
              to="/era/$eraId"
              params={{ eraId: era.id }}
              onClick={() => setOpen(false)}
              className="shrink-0 inline-flex items-center gap-1 px-3.5 py-2 rounded-full text-sm font-semibold bg-primary text-primary-foreground hover:opacity-90 transition-opacity min-h-[40px]"
              style={{ boxShadow: "var(--shadow-glow)" }}
            >
              {ENTER_LABEL[lang]} →
            </Link>
          ) : (
            <span className="shrink-0 inline-flex items-center gap-1 px-3.5 py-2 rounded-full text-sm font-semibold border border-border text-muted-foreground min-h-[40px]">
              {tu("locked", lang)}
            </span>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}

function PreviewBlock({
  icon,
  label,
  children,
}: {
  icon: React.ReactNode;
  label: string;
  children: React.ReactNode;
}) {
  return (
    <div className="rounded-xl border border-border/60 bg-background/60 px-4 py-3">
      <div className="flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-[0.16em] text-primary/90 mb-1.5">
        {icon}
        <span>{label}</span>
      </div>
      {children}
    </div>
  );
}

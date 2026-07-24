import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useMemo, useState } from "react";

import { Header } from "@/components/Header";
import { MedallionFrame } from "@/components/brand/MedallionFrame";
import { useLang, type Lang, type LocalizedString } from "@/lib/i18n";
import { useFootballBookmarks } from "@/lib/footballBookmarks";
import { theaterIdForFootballMatch } from "@/data/matchTheater";
import {
  AFCON_HISTORY,
  ARTIFACTS,
  CENTURY,
  COACHES,
  CULTURE_THEMES,
  FAMOUS_MATCHES,
  FLN_LEGACY,
  FLN_PLAYERS,
  FLN_TOUR,
  FOOTBALL_EXHIBITS,
  GIJON_TIMELINE,
  LEGENDS,
  NATIONAL_TEAM_MILESTONES,
  ORIGIN_CLUBS,
  ORIGIN_TIMELINE,
  STADIUMS,
  STATS,
  TROPHIES,
  WORLD_CUPS,
  type FootballExhibitId,
} from "@/data/football";

export const Route = createFileRoute("/football")({
  head: () => ({
    meta: [
      { title: "The Hall of Algerian Football — DZ Odyssey" },
      {
        name: "description",
        content:
          "A cinematic museum wing tracing Algerian football from colonial resistance and the FLN team to Gijón, the 2019 AFCON and the road to 2026.",
      },
      { property: "og:title", content: "The Hall of Algerian Football" },
      {
        property: "og:description",
        content:
          "From colonial resistance to World Cup history — a curated exhibit of Algerian football.",
      },
    ],
  }),
  component: FootballHall,
});

/* -------------------- utility -------------------- */

function tt(v: LocalizedString | undefined, lang: Lang): string {
  if (v == null) return "";
  if (typeof v === "string") return v;
  return v[lang] ?? v.en ?? "";
}

const SERIF = { fontFamily: "Georgia, 'Iowan Old Style', 'Times New Roman', serif" };

/* -------------------- Hero -------------------- */

function FootballHero({ lang }: { lang: Lang }) {
  const title = { en: "The Hall of Algerian Football", fr: "La Galerie du Football Algérien", ar: "قاعة كرة القدم الجزائرية" }[lang];
  const subtitle = {
    en: "From colonial resistance to World Cup history.",
    fr: "De la résistance coloniale à l’histoire du Mondial.",
    ar: "من مقاومة الاستعمار إلى تاريخ كأس العالم.",
  }[lang];
  const eyebrow = {
    en: "A new wing of DZ Odyssey",
    fr: "Une nouvelle aile de DZ Odyssey",
    ar: "جناح جديد من DZ Odyssey",
  }[lang];

  return (
    <section
      className="relative overflow-hidden text-foreground"
      style={{
        background:
          "radial-gradient(ellipse at 50% 20%, oklch(0.88 0.06 78 / 0.55), transparent 65%), radial-gradient(ellipse at 90% 80%, oklch(0.82 0.08 40 / 0.35), transparent 60%), var(--gradient-parchment)",
      }}
    >
      {/* Stadium haze — soft light shafts */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-40"
        style={{
          background:
            "repeating-linear-gradient(102deg, transparent 0 60px, oklch(0.55 0.08 55 / 0.05) 60px 120px)",
        }}
      />
      {/* Grass line */}
      <div
        aria-hidden
        className="pointer-events-none absolute bottom-0 left-0 right-0 h-24"
        style={{
          background:
            "linear-gradient(180deg, transparent, oklch(0.55 0.09 130 / 0.18))",
        }}
      />

      <div className="relative max-w-6xl mx-auto px-4 sm:px-6 py-16 sm:py-24 md:py-32 grid gap-10 md:grid-cols-[1.15fr_1fr] items-center">
        <div className="animate-float-up">
          <p className="text-[10px] sm:text-xs uppercase tracking-[0.28em] font-bold text-primary">
            ⵣ · {eyebrow}
          </p>
          <h1
            className="mt-4 text-4xl sm:text-5xl md:text-6xl font-bold leading-[1.05] text-foreground"
            style={SERIF}
          >
            {title}
          </h1>
          <p className="mt-5 text-lg sm:text-xl max-w-xl text-foreground/75 italic" style={SERIF}>
            {subtitle}
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <a
              href="#exhibits"
              className="inline-flex items-center gap-2 rounded-full bg-primary text-primary-foreground px-5 py-3 text-sm font-semibold transition hover:-translate-y-0.5"
              style={{ boxShadow: "var(--shadow-soft)" }}
            >
              {{ en: "Enter the museum", fr: "Entrer dans le musée", ar: "ادخل المتحف" }[lang]}
              <span aria-hidden>→</span>
            </a>
            <a
              href="#timeline"
              className="inline-flex items-center gap-2 rounded-full border border-border bg-card px-5 py-3 text-sm font-semibold text-foreground hover:bg-muted transition"
            >
              {{ en: "Century timeline", fr: "Chronologie", ar: "الخطّ الزمني" }[lang]}
            </a>
            <Link
              to="/clubs"
              className="inline-flex items-center gap-2 rounded-full border border-border bg-card px-5 py-3 text-sm font-semibold text-foreground hover:bg-muted transition"
            >
              {{ en: "Club Museums →", fr: "Musées des clubs →", ar: "متاحف الأندية ←" }[lang]}
            </Link>
          </div>

        </div>



        {/* Museum vitrine — layered artifacts */}
        <div className="relative flex items-center justify-center animate-float-up">
          <MuseumVitrine />
        </div>
      </div>
    </section>
  );
}

/**
 * MuseumVitrine — a stylised display case holding a small assembly of
 * football artifacts (aged leather ball, boots, ticket stub, whistle) set
 * against a sepia team-photograph plate. Pure SVG/CSS so it stays crisp on
 * every viewport and can be swapped for real photography later.
 */
function MuseumVitrine() {
  return (
    <div className="relative w-[300px] h-[380px] sm:w-[340px] sm:h-[420px] md:w-[360px] md:h-[440px]">
      {/* Cabinet shadow */}
      <div
        aria-hidden
        className="absolute -inset-x-4 bottom-0 h-10 rounded-full blur-2xl"
        style={{ background: "oklch(0.25 0.03 40 / 0.35)" }}
      />
      {/* Wooden plinth */}
      <div
        aria-hidden
        className="absolute inset-x-4 bottom-0 h-14 rounded-md"
        style={{
          background:
            "linear-gradient(180deg, oklch(0.42 0.05 45) 0%, oklch(0.28 0.04 40) 55%, oklch(0.20 0.03 38) 100%)",
          boxShadow:
            "0 18px 32px -18px oklch(0 0 0 / 0.55), inset 0 1px 0 oklch(0.95 0.05 80 / 0.14)",
        }}
      />
      {/* Brass plaque on plinth */}
      <div
        className="absolute bottom-3 left-1/2 -translate-x-1/2 px-3 py-1 rounded-sm text-[9.5px] uppercase tracking-[0.28em] font-bold"
        style={{
          background:
            "linear-gradient(180deg, oklch(0.86 0.12 86), oklch(0.66 0.13 72))",
          color: "oklch(0.20 0.03 40)",
          boxShadow: "inset 0 1px 0 oklch(1 0 0 / 0.4), 0 1px 2px oklch(0 0 0 / 0.3)",
        }}
      >
        Exhibit 01 · Origins
      </div>

      {/* Glass case */}
      <div
        className="absolute inset-x-0 bottom-12 top-0 rounded-t-[14px] rounded-b-md border overflow-hidden"
        style={{
          borderColor: "oklch(0.55 0.06 55 / 0.35)",
          background:
            "linear-gradient(180deg, oklch(0.94 0.04 82) 0%, oklch(0.88 0.05 76) 55%, oklch(0.78 0.06 66) 100%)",
          boxShadow:
            "inset 0 1px 0 oklch(1 0 0 / 0.5), inset 0 -18px 40px oklch(0.35 0.05 45 / 0.18), 0 24px 60px -22px oklch(0.35 0.06 55 / 0.35)",
        }}
      >
        {/* Warm museum spotlight */}
        <div
          aria-hidden
          className="pointer-events-none absolute -top-10 left-1/2 -translate-x-1/2 w-64 h-64 rounded-full blur-3xl"
          style={{ background: "oklch(0.95 0.14 82 / 0.55)" }}
        />
        {/* Sepia team photograph plate (background) */}
        <div
          aria-hidden
          className="absolute left-6 right-6 top-8 h-40 rounded-sm overflow-hidden"
          style={{
            background:
              "linear-gradient(180deg, oklch(0.72 0.06 62) 0%, oklch(0.58 0.06 55) 100%)",
            boxShadow:
              "0 6px 14px -6px oklch(0.2 0.03 40 / 0.55), inset 0 0 0 2px oklch(0.92 0.05 80 / 0.55), inset 0 0 0 3px oklch(0.35 0.04 45 / 0.35)",
          }}
        >
          <svg viewBox="0 0 200 100" className="w-full h-full" preserveAspectRatio="xMidYMid slice">
            {/* Faux vintage team photograph — silhouetted row of players */}
            <defs>
              <linearGradient id="skyPlate" x1="0" x2="0" y1="0" y2="1">
                <stop offset="0%" stopColor="oklch(0.82 0.05 74)" />
                <stop offset="100%" stopColor="oklch(0.58 0.05 55)" />
              </linearGradient>
              <linearGradient id="grainPlate" x1="0" x2="1" y1="0" y2="1">
                <stop offset="0%" stopColor="oklch(0.3 0.03 40 / 0.0)" />
                <stop offset="100%" stopColor="oklch(0.3 0.03 40 / 0.35)" />
              </linearGradient>
            </defs>
            <rect width="200" height="100" fill="url(#skyPlate)" />
            {/* Distant stand */}
            <rect x="0" y="30" width="200" height="22" fill="oklch(0.5 0.04 55 / 0.55)" />
            {/* Standing row silhouettes */}
            <g fill="oklch(0.28 0.03 40 / 0.85)">
              {[18, 40, 62, 84, 106, 128, 150, 172].map((cx) => (
                <g key={cx}>
                  <circle cx={cx} cy={54} r={4} />
                  <rect x={cx - 5} y={58} width={10} height={18} rx={2} />
                </g>
              ))}
            </g>
            {/* Kneeling row silhouettes */}
            <g fill="oklch(0.22 0.03 40 / 0.9)">
              {[28, 58, 88, 118, 148, 178].map((cx) => (
                <g key={cx}>
                  <circle cx={cx} cy={80} r={3.6} />
                  <path d={`M${cx - 4} 84 Q ${cx} 92 ${cx + 4} 84 L ${cx + 5} 96 L ${cx - 5} 96 Z`} />
                </g>
              ))}
            </g>
            {/* Grass line */}
            <rect x="0" y="94" width="200" height="6" fill="oklch(0.38 0.05 90 / 0.55)" />
            {/* Aged grain overlay */}
            <rect width="200" height="100" fill="url(#grainPlate)" />
          </svg>
        </div>

        {/* Ticket stub (upper right, tilted) */}
        <div
          aria-hidden
          className="absolute right-5 top-4 w-24 h-10 rotate-[8deg] rounded-[3px]"
          style={{
            background:
              "linear-gradient(180deg, oklch(0.94 0.04 82), oklch(0.82 0.06 72))",
            boxShadow:
              "0 4px 10px -4px oklch(0.2 0.03 40 / 0.55), inset 0 0 0 1px oklch(0.4 0.05 55 / 0.3)",
          }}
        >
          <div className="flex items-center h-full px-1.5 gap-1.5">
            <div className="text-[7px] leading-tight font-bold uppercase tracking-widest" style={{ color: "oklch(0.28 0.06 40)" }}>
              Gijón<br/>1982
            </div>
            <div className="h-full border-l border-dashed" style={{ borderColor: "oklch(0.4 0.05 55 / 0.55)" }} />
            <div className="text-[6.5px] leading-tight" style={{ color: "oklch(0.32 0.05 45)" }}>
              N°<br/>0016
            </div>
          </div>
        </div>

        {/* Pennant (upper left) */}
        <svg
          aria-hidden
          className="absolute left-3 top-3 -rotate-[10deg]"
          width="58"
          height="34"
          viewBox="0 0 58 34"
        >
          <polygon points="0,0 58,17 0,34" fill="oklch(0.55 0.16 145)" stroke="oklch(0.3 0.06 140)" strokeWidth="0.6" />
          <polygon points="0,4 46,17 0,30" fill="oklch(0.96 0.02 90)" opacity="0.9" />
          <text x="8" y="20" fontSize="8" fontWeight="700" fill="oklch(0.5 0.16 30)" fontFamily="Georgia, serif">DZ</text>
        </svg>

        {/* Aged leather football (center-left, resting on shelf) */}
        <div className="absolute left-8 bottom-16">
          <svg width="88" height="88" viewBox="0 0 100 100">
            <defs>
              <radialGradient id="leather" cx="35%" cy="30%" r="75%">
                <stop offset="0%" stopColor="oklch(0.72 0.09 55)" />
                <stop offset="55%" stopColor="oklch(0.5 0.08 45)" />
                <stop offset="100%" stopColor="oklch(0.24 0.04 38)" />
              </radialGradient>
            </defs>
            <ellipse cx="50" cy="92" rx="30" ry="4" fill="oklch(0.2 0.03 40 / 0.45)" />
            <circle cx="50" cy="50" r="42" fill="url(#leather)" />
            {/* Panel seams — classic 18-panel leather ball */}
            <g fill="none" stroke="oklch(0.18 0.03 38 / 0.8)" strokeWidth="1" strokeLinecap="round">
              <path d="M10 50 Q 50 42 90 50" />
              <path d="M10 50 Q 50 58 90 50" />
              <path d="M50 8 Q 42 50 50 92" />
              <path d="M50 8 Q 58 50 50 92" />
              <path d="M22 20 Q 50 30 78 20" opacity="0.5" />
              <path d="M22 80 Q 50 70 78 80" opacity="0.5" />
            </g>
            {/* Stitches */}
            <g stroke="oklch(0.9 0.04 82 / 0.55)" strokeWidth="0.5" strokeDasharray="1.2 1.6">
              <path d="M10 50 Q 50 42 90 50" fill="none" />
              <path d="M50 8 Q 42 50 50 92" fill="none" />
            </g>
            {/* Highlight */}
            <ellipse cx="38" cy="34" rx="10" ry="6" fill="oklch(0.95 0.03 82 / 0.35)" />
          </svg>
        </div>

        {/* Referee whistle (center-right) */}
        <svg
          aria-hidden
          className="absolute right-8 bottom-24 -rotate-[18deg]"
          width="66"
          height="40"
          viewBox="0 0 66 40"
        >
          <defs>
            <linearGradient id="brass" x1="0" x2="0" y1="0" y2="1">
              <stop offset="0%" stopColor="oklch(0.88 0.12 86)" />
              <stop offset="50%" stopColor="oklch(0.7 0.14 78)" />
              <stop offset="100%" stopColor="oklch(0.42 0.08 68)" />
            </linearGradient>
          </defs>
          {/* Cord */}
          <path d="M2 4 Q 20 -2 30 8" fill="none" stroke="oklch(0.35 0.04 40)" strokeWidth="1.2" />
          {/* Body */}
          <rect x="18" y="10" width="34" height="18" rx="4" fill="url(#brass)" stroke="oklch(0.32 0.05 55)" strokeWidth="0.6" />
          {/* Loop */}
          <circle cx="20" cy="12" r="3" fill="none" stroke="oklch(0.32 0.05 55)" strokeWidth="1" />
          {/* Mouthpiece */}
          <rect x="50" y="14" width="10" height="10" rx="2" fill="oklch(0.5 0.08 68)" stroke="oklch(0.28 0.05 50)" strokeWidth="0.5" />
          {/* Highlight */}
          <rect x="22" y="12" width="26" height="3" rx="1.5" fill="oklch(0.96 0.05 85 / 0.7)" />
        </svg>

        {/* Vintage boots (bottom, small pair) */}
        <svg
          aria-hidden
          className="absolute left-1/2 -translate-x-1/2 bottom-4"
          width="140"
          height="46"
          viewBox="0 0 140 46"
        >
          <defs>
            <linearGradient id="bootLeather" x1="0" x2="0" y1="0" y2="1">
              <stop offset="0%" stopColor="oklch(0.5 0.07 45)" />
              <stop offset="100%" stopColor="oklch(0.22 0.04 38)" />
            </linearGradient>
          </defs>
          {/* Left boot */}
          <g transform="translate(4 4)">
            <path d="M2 24 Q 4 8 22 8 L 46 8 Q 58 8 60 20 L 60 28 Q 58 32 50 32 L 8 32 Q 2 32 2 28 Z" fill="url(#bootLeather)" stroke="oklch(0.15 0.03 35)" strokeWidth="0.6" />
            {/* Laces */}
            <g stroke="oklch(0.92 0.04 82 / 0.85)" strokeWidth="0.8">
              <line x1="20" y1="12" x2="46" y2="12" />
              <line x1="20" y1="16" x2="46" y2="16" />
              <line x1="20" y1="20" x2="46" y2="20" />
              <line x1="20" y1="24" x2="46" y2="24" />
            </g>
            {/* Studs */}
            <g fill="oklch(0.15 0.02 40)">
              <circle cx="10" cy="34" r="1.4" /><circle cx="20" cy="35" r="1.4" /><circle cx="32" cy="35" r="1.4" /><circle cx="44" cy="35" r="1.4" /><circle cx="54" cy="34" r="1.4" />
            </g>
          </g>
          {/* Right boot */}
          <g transform="translate(70 6) scale(-1 1) translate(-62 0)">
            <path d="M2 24 Q 4 8 22 8 L 46 8 Q 58 8 60 20 L 60 28 Q 58 32 50 32 L 8 32 Q 2 32 2 28 Z" fill="url(#bootLeather)" stroke="oklch(0.15 0.03 35)" strokeWidth="0.6" />
            <g stroke="oklch(0.92 0.04 82 / 0.85)" strokeWidth="0.8">
              <line x1="20" y1="12" x2="46" y2="12" />
              <line x1="20" y1="16" x2="46" y2="16" />
              <line x1="20" y1="20" x2="46" y2="20" />
              <line x1="20" y1="24" x2="46" y2="24" />
            </g>
            <g fill="oklch(0.15 0.02 40)">
              <circle cx="10" cy="34" r="1.4" /><circle cx="20" cy="35" r="1.4" /><circle cx="32" cy="35" r="1.4" /><circle cx="44" cy="35" r="1.4" /><circle cx="54" cy="34" r="1.4" />
            </g>
          </g>
        </svg>

        {/* Small era plaques (right column) */}
        <div className="absolute right-3 bottom-16 flex flex-col gap-1 items-end">
          {["FLN · 1958", "Gijón · 1982", "Brasil · 2014", "USA/CAN/MEX · 2026"].map((label) => (
            <div
              key={label}
              className="px-1.5 py-0.5 rounded-[2px] text-[7.5px] uppercase tracking-[0.16em] font-bold"
              style={{
                background: "oklch(0.96 0.03 82 / 0.85)",
                color: "oklch(0.28 0.05 40)",
                boxShadow: "0 1px 2px oklch(0.2 0.03 40 / 0.25), inset 0 0 0 1px oklch(0.55 0.08 60 / 0.35)",
              }}
            >
              {label}
            </div>
          ))}
        </div>

        {/* Glass reflection sweep */}
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0"
          style={{
            background:
              "linear-gradient(115deg, oklch(1 0 0 / 0) 40%, oklch(1 0 0 / 0.18) 50%, oklch(1 0 0 / 0) 60%)",
          }}
        />
        {/* Inner frame */}
        <div
          aria-hidden
          className="pointer-events-none absolute inset-1 rounded-t-[12px] rounded-b-sm"
          style={{ boxShadow: "inset 0 0 0 1px oklch(0.55 0.08 60 / 0.35)" }}
        />
      </div>
    </div>
  );
}


/* -------------------- Section shell -------------------- */

function Section({
  id,
  emblem,
  n,
  title,
  subtitle,
  children,
}: {
  id: string;
  emblem: string;
  n: number;
  title: string;
  subtitle: string;
  children: React.ReactNode;
}) {
  return (
    <section id={id} className="scroll-mt-24 py-14 sm:py-20 border-b border-border/60">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="flex items-start gap-4 sm:gap-5">
          <MedallionFrame size={64} tone="gold" glow>
            <span className="text-2xl font-bold text-[oklch(0.2_0.05_40)]" style={SERIF} aria-hidden>
              {emblem}
            </span>
          </MedallionFrame>
          <div className="min-w-0">
            <div className="text-[10px] sm:text-xs uppercase tracking-[0.28em] font-bold text-muted-foreground">
              Exhibit {String(n).padStart(2, "0")}
            </div>
            <h2 className="mt-1 text-2xl sm:text-3xl md:text-4xl font-bold" style={SERIF}>
              {title}
            </h2>
            <p className="mt-1 text-sm sm:text-base text-muted-foreground italic max-w-2xl" style={SERIF}>
              {subtitle}
            </p>
          </div>
        </div>
        <div className="mt-8">{children}</div>
      </div>
    </section>
  );
}

function Plaque({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  return (
    <div
      className={`rounded-2xl border border-border bg-card p-5 sm:p-6 ${className}`}
      style={{ boxShadow: "var(--shadow-soft)" }}
    >
      {children}
    </div>
  );
}

function Prose({ text }: { text: string }) {
  return <p className="text-[15px] sm:text-base leading-relaxed text-foreground/85" style={SERIF}>{text}</p>;
}

/* -------------------- Origins -------------------- */

function OriginsExhibit({ lang }: { lang: Lang }) {
  return (
    <div className="grid gap-6 md:grid-cols-[1.1fr_1fr]">
      <Plaque>
        <h3 className="text-lg font-semibold mb-3" style={SERIF}>
          {{ en: "First clubs", fr: "Premiers clubs", ar: "أوّل النوادي" }[lang]}
        </h3>
        <ul className="space-y-3">
          {ORIGIN_CLUBS.map((c) => (
            <li key={c.club} className="flex gap-4 border-b border-border/60 pb-3 last:border-b-0 last:pb-0">
              <span className="shrink-0 w-14 text-right font-mono text-sm text-accent-foreground/80 font-semibold">
                {c.year}
              </span>
              <div>
                <div className="font-semibold text-foreground">{c.club}</div>
                <div className="text-xs uppercase tracking-widest text-muted-foreground">{c.city}</div>
                <div className="mt-1 text-sm text-foreground/80">{c.note}</div>
              </div>
            </li>
          ))}
        </ul>
      </Plaque>

      <Plaque>
        <h3 className="text-lg font-semibold mb-3" style={SERIF}>
          {{ en: "Colonial-era timeline", fr: "Chronologie coloniale", ar: "خطّ زمنيّ استعماريّ" }[lang]}
        </h3>
        <ol className="relative border-s-2 border-accent/40 ps-5 space-y-4">
          {ORIGIN_TIMELINE.map((t) => (
            <li key={t.year} className="relative">
              <span className="absolute -start-[27px] top-1 w-3 h-3 rounded-full bg-accent border-2 border-card" />
              <div className="font-mono text-sm text-accent-foreground font-semibold">{t.year}</div>
              <div className="text-sm text-foreground/85 mt-0.5">{tt(t.label, lang)}</div>
            </li>
          ))}
        </ol>
      </Plaque>
    </div>
  );
}

/* -------------------- National Team -------------------- */

function NationalTeamExhibit({ lang }: { lang: Lang }) {
  return (
    <ol className="relative grid gap-4 sm:grid-cols-2">
      {NATIONAL_TEAM_MILESTONES.map((m) => (
        <li key={m.date}>
          <Plaque>
            <div className="text-xs font-mono uppercase tracking-widest text-accent-foreground/80">
              {m.date}
            </div>
            <h3 className="mt-2 text-lg font-semibold" style={SERIF}>
              {tt(m.title, lang)}
            </h3>
            <p className="mt-2 text-sm text-foreground/85">{tt(m.body, lang)}</p>
          </Plaque>
        </li>
      ))}
    </ol>
  );
}

/* -------------------- FLN Team -------------------- */

function FlnExhibit({ lang }: { lang: Lang }) {
  return (
    <div className="grid gap-6 lg:grid-cols-[1fr_1.1fr]">
      <Plaque>
        <h3 className="text-lg font-semibold mb-3" style={SERIF}>
          {{ en: "Players who left it all", fr: "Ceux qui ont tout quitté", ar: "الذين تركوا كلّ شيء" }[lang]}
        </h3>
        <ul className="divide-y divide-border/60">
          {FLN_PLAYERS.map((p) => (
            <li key={p.name} className="py-2.5 flex items-baseline justify-between gap-4">
              <span className="font-semibold text-foreground">{p.name}</span>
              <span className="text-xs uppercase tracking-widest text-muted-foreground">
                ← {p.leftClub}
              </span>
            </li>
          ))}
        </ul>
        <p className="mt-4 text-sm text-foreground/85" style={SERIF}>
          {tt(FLN_LEGACY, lang)}
        </p>
      </Plaque>

      <Plaque>
        <h3 className="text-lg font-semibold mb-1" style={SERIF}>
          {{ en: "International tour", fr: "Tournée internationale", ar: "الجولة الدوليّة" }[lang]}
        </h3>
        <p className="text-xs text-muted-foreground uppercase tracking-widest mb-4">
          {{ en: "1958–1960", fr: "1958–1960", ar: "١٩٥٨–١٩٦٠" }[lang]}
        </p>
        <div className="flex flex-wrap gap-2">
          {FLN_TOUR.map((s) => (
            <span
              key={s.country}
              className="inline-flex items-center gap-2 rounded-full border border-accent/30 bg-accent/5 px-3 py-1.5 text-sm"
            >
              <span className="text-accent-foreground/80 font-mono text-xs">{s.year}</span>
              <span className="font-semibold text-foreground">{s.country}</span>
            </span>
          ))}
        </div>
      </Plaque>
    </div>
  );
}

/* -------------------- World Cup -------------------- */

function WorldCupExhibit({ lang }: { lang: Lang }) {
  const [active, setActive] = useState(2014);
  const wc = WORLD_CUPS.find((w) => w.year === active) ?? WORLD_CUPS[0];

  return (
    <div className="space-y-6">
      {/* Year selector */}
      <div className="flex flex-wrap gap-2">
        {WORLD_CUPS.map((w) => (
          <button
            key={w.year}
            onClick={() => setActive(w.year)}
            className={
              "px-4 py-2 rounded-full text-sm font-semibold transition border " +
              (w.year === active
                ? "bg-foreground text-background border-foreground shadow-sm"
                : "bg-card text-foreground border-border hover:bg-muted")
            }
          >
            {w.year}
          </button>
        ))}
      </div>

      <div className="grid gap-6 lg:grid-cols-[1.1fr_1fr]">
        <Plaque>
          <div className="flex items-baseline justify-between flex-wrap gap-2">
            <div>
              <h3 className="text-2xl font-bold" style={SERIF}>
                FIFA World Cup {wc.year}
              </h3>
              <p className="text-sm text-muted-foreground">{wc.host} · {wc.coach}</p>
            </div>
            <span className="inline-flex items-center gap-2 rounded-full border border-accent/40 bg-accent/10 px-3 py-1 text-sm font-semibold text-accent-foreground">
              {tt(wc.finish, lang)}
            </span>
          </div>
          <p className="mt-4 text-[15px] leading-relaxed text-foreground/85" style={SERIF}>
            {tt(wc.summary, lang)}
          </p>
          {wc.matches.length > 0 && (
            <ul className="mt-5 divide-y divide-border/60 rounded-xl border border-border/70 overflow-hidden">
              {wc.matches.map((m, i) => (
                <li key={i} className="grid grid-cols-[1fr_auto] items-center gap-3 px-4 py-3 bg-background/30">
                  <div>
                    <div className="font-semibold text-foreground">{m.opp}</div>
                    {m.note && <div className="text-xs text-muted-foreground">{m.note}</div>}
                  </div>
                  <div className="font-mono text-lg font-bold text-accent-foreground">{m.result}</div>
                </li>
              ))}
            </ul>
          )}
        </Plaque>

        <Plaque
          className="relative overflow-hidden"
        >
          <div
            aria-hidden
            className="absolute -top-16 -end-16 w-56 h-56 rounded-full blur-3xl opacity-40"
            style={{ background: "oklch(0.85 0.16 80 / 0.4)" }}
          />
          <div className="relative">
            <div className="text-[10px] uppercase tracking-[0.28em] font-bold text-muted-foreground">
              {{ en: "Historic moment", fr: "Instant historique", ar: "لحظة تاريخيّة" }[lang]}
            </div>
            <p className="mt-4 text-lg leading-snug text-foreground italic" style={SERIF}>
              “{tt(wc.moment, lang)}”
            </p>
          </div>
        </Plaque>
      </div>
    </div>
  );
}

/* -------------------- Gijón -------------------- */

function GijonExhibit({ lang }: { lang: Lang }) {
  return (
    <div className="grid gap-6 lg:grid-cols-[1fr_1.2fr]">
      <Plaque
        className="relative overflow-hidden"
      >
        <div className="text-[10px] uppercase tracking-[0.28em] font-bold text-muted-foreground">
          {{ en: "Match card", fr: "Fiche de match", ar: "بطاقة المباراة" }[lang]}
        </div>
        <div className="mt-4 grid grid-cols-3 items-center gap-4 text-center">
          <TeamBlock name="West Germany" flag="🇩🇪" />
          <div>
            <div className="text-4xl font-bold font-mono" style={SERIF}>1 – 0</div>
            <div className="mt-1 text-xs uppercase tracking-widest text-muted-foreground">Gijón · 25.06.1982</div>
          </div>
          <TeamBlock name="Austria" flag="🇦🇹" />
        </div>
        <div className="mt-6 rounded-xl border border-destructive/30 bg-destructive/5 p-4">
          <div className="text-[10px] uppercase tracking-widest font-bold text-destructive">
            {{ en: "Eliminated", fr: "Éliminée", ar: "مقصاة" }[lang]}
          </div>
          <div className="mt-1 text-lg font-semibold" style={SERIF}>Algeria · 🇩🇿</div>
          <p className="mt-1 text-xs text-foreground/70">
            {{
              en: "Same points as one qualifier. Better goal difference than one qualifier. Eliminated on goals scored.",
              fr: "Mêmes points qu’un qualifié. Meilleure différence qu’un qualifié. Éliminée aux buts marqués.",
              ar: "بنفس النقاط مع أحد المتأهّلَين. فارق أهداف أفضل من أحدهما. أُقصيت بفارق الأهداف المسجّلة.",
            }[lang]}
          </p>
        </div>
      </Plaque>

      <Plaque>
        <h3 className="text-lg font-semibold mb-3" style={SERIF}>
          {{ en: "Minute by minute", fr: "Minute par minute", ar: "دقيقة بدقيقة" }[lang]}
        </h3>
        <ol className="relative border-s-2 border-accent/40 ps-5 space-y-4">
          {GIJON_TIMELINE.map((t) => (
            <li key={t.time} className="relative">
              <span className="absolute -start-[27px] top-1 w-3 h-3 rounded-full bg-accent border-2 border-card" />
              <div className="font-mono text-sm text-accent-foreground font-semibold">{t.time}</div>
              <div className="text-sm text-foreground/85 mt-0.5" style={SERIF}>
                {tt(t.event, lang)}
              </div>
            </li>
          ))}
        </ol>
      </Plaque>

      {/* Match Theater — reliving the earlier upset that made Gijón matter. */}
      <div className="lg:col-span-2">
        <Link
          to="/theater/$matchId"
          params={{ matchId: "gijon-1982" }}
          className="group flex items-center justify-between gap-4 rounded-2xl border border-accent/40 bg-gradient-to-r from-accent/15 via-background/40 to-accent/10 p-4 transition hover:-translate-y-0.5 hover:border-accent"
          style={{ boxShadow: "var(--shadow-soft)" }}
        >
          <div>
            <div className="text-[10px] uppercase tracking-[0.28em] text-accent-foreground/80" style={SERIF}>
              {{ en: "Match Theater", fr: "Théâtre du match", ar: "مسرح المباراة" }[lang]}
            </div>
            <div className="mt-1 text-base font-semibold text-foreground" style={SERIF}>
              {{
                en: "Relive Algeria 2–1 West Germany · 16 June 1982",
                fr: "Revivez Algérie 2–1 RFA · 16 juin 1982",
                ar: "أعِد عيش الجزائر ٢–١ ألمانيا الغربية · ١٦ يونيو ١٩٨٢",
              }[lang]}
            </div>
            <div className="mt-0.5 text-xs text-muted-foreground">
              {{
                en: "The upset that preceded — and framed — the Shame of Gijón.",
                fr: "L'exploit qui a précédé — et éclairé — la Honte de Gijón.",
                ar: "المفاجأة التي سبقت فضيحة خيخون وأضاءت سياقها.",
              }[lang]}
            </div>
          </div>
          <span
            aria-hidden
            className="rounded-full bg-accent px-3 py-1.5 text-sm font-bold text-accent-foreground transition group-hover:translate-x-0.5"
          >
            →
          </span>
        </Link>
      </div>
    </div>
  );
}


function TeamBlock({ name, flag }: { name: string; flag: string }) {
  return (
    <div>
      <div className="text-3xl" aria-hidden>{flag}</div>
      <div className="mt-1 text-sm font-semibold text-foreground" style={SERIF}>{name}</div>
    </div>
  );
}

/* -------------------- AFCON -------------------- */

function AfconExhibit({ lang }: { lang: Lang }) {
  return (
    <div className="rounded-2xl border border-border bg-card overflow-hidden" style={{ boxShadow: "var(--shadow-soft)" }}>
      <ul className="divide-y divide-border/60">
        {AFCON_HISTORY.map((e) => (
          <li
            key={e.year}
            className={
              "grid grid-cols-[70px_1fr_auto] items-center gap-4 px-4 sm:px-6 py-3.5 transition " +
              (e.highlight ? "bg-accent/10" : "hover:bg-muted/40")
            }
          >
            <div className="font-mono text-sm font-semibold text-accent-foreground">{e.year}</div>
            <div className="min-w-0">
              <div className="font-semibold text-foreground truncate flex items-center gap-2">
                {e.highlight && <span aria-hidden>★</span>}
                {tt(e.finish, lang)}
              </div>
              {e.note && (
                <div className="text-xs text-muted-foreground truncate" style={SERIF}>
                  {tt(e.note, lang)}
                </div>
              )}
            </div>
            <div className="text-xs uppercase tracking-widest text-muted-foreground text-right">{e.host}</div>
          </li>
        ))}
      </ul>
    </div>
  );
}

/* -------------------- Legends -------------------- */

function LegendsExhibit({ lang }: { lang: Lang }) {
  const { has, toggle } = useFootballBookmarks("players");
  return (
    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
      {LEGENDS.map((l) => (
        <article
          key={l.id}
          className="group rounded-2xl border border-border bg-card p-5 transition hover:-translate-y-0.5"
          style={{ boxShadow: "var(--shadow-soft)" }}
        >
          <div className="flex items-start gap-4">
            <MedallionFrame size={54} tone="bronze">
              <span className="text-lg font-bold text-[oklch(0.98_0.03_82)]" style={SERIF}>
                {l.name.split(" ").map((n) => n[0]).slice(0, 2).join("")}
              </span>
            </MedallionFrame>
            <div className="flex-1 min-w-0">
              <h3 className="text-base font-semibold truncate" style={SERIF}>{l.name}</h3>
              <div className="text-xs text-muted-foreground truncate">
                {tt(l.position, lang)} · {l.years}
              </div>
              <div className="text-xs text-muted-foreground truncate">{l.clubs}</div>
            </div>
            <button
              type="button"
              onClick={() => toggle(l.id)}
              aria-label={has(l.id) ? "Remove bookmark" : "Bookmark player"}
              className={
                "shrink-0 inline-flex items-center justify-center w-8 h-8 rounded-full border transition " +
                (has(l.id)
                  ? "bg-accent text-accent-foreground border-accent"
                  : "border-border text-muted-foreground hover:text-foreground")
              }
            >
              {has(l.id) ? "★" : "☆"}
            </button>
          </div>
          {(l.caps || l.goals) && (
            <div className="mt-3 flex gap-3 text-xs">
              {l.caps && <span className="rounded-full bg-muted px-2 py-0.5 font-mono">{l.caps} caps</span>}
              {l.goals && <span className="rounded-full bg-muted px-2 py-0.5 font-mono">{l.goals} goals</span>}
            </div>
          )}
          <p className="mt-3 text-sm text-foreground/85" style={SERIF}>
            {tt(l.note, lang)}
          </p>
          {l.quote && (
            <p className="mt-3 text-sm italic text-foreground/70 border-s-2 border-accent/50 ps-3" style={SERIF}>
              {tt(l.quote, lang)}
            </p>
          )}
        </article>
      ))}
    </div>
  );
}

/* -------------------- Coaches -------------------- */

function CoachesExhibit({ lang }: { lang: Lang }) {
  return (
    <div className="grid gap-4 md:grid-cols-2">
      {COACHES.map((c) => (
        <Plaque key={c.id}>
          <div className="flex items-baseline justify-between gap-4 flex-wrap">
            <h3 className="text-lg font-semibold" style={SERIF}>{c.name}</h3>
            <span className="text-xs uppercase tracking-widest text-muted-foreground">{c.era}</span>
          </div>
          <p className="mt-2 text-sm text-foreground/85">{tt(c.note, lang)}</p>
          <div className="mt-3 inline-flex items-center gap-2 rounded-full border border-accent/40 bg-accent/10 px-3 py-1 text-xs font-semibold text-accent-foreground">
            🏆 {tt(c.achievement, lang)}
          </div>
        </Plaque>
      ))}
    </div>
  );
}

/* -------------------- Stadiums -------------------- */

function StadiumsExhibit({ lang }: { lang: Lang }) {
  return (
    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
      {STADIUMS.map((s) => (
        <article
          key={s.id}
          className="relative rounded-2xl border border-border bg-card overflow-hidden transition hover:-translate-y-0.5"
          style={{ boxShadow: "var(--shadow-soft)" }}
        >
          <div
            aria-hidden
            className="h-24 relative"
            style={{
              background:
                "linear-gradient(180deg, oklch(0.35 0.08 220 / 0.35), transparent 65%), repeating-linear-gradient(90deg, oklch(0.55 0.12 140 / 0.55) 0 12px, oklch(0.48 0.12 140 / 0.55) 12px 24px)",
            }}
          >
            <div className="absolute inset-x-4 bottom-2 h-6 rounded bg-[oklch(0.9_0.02_80_/_0.15)] border border-[oklch(0.9_0.02_80_/_0.25)]" />
          </div>
          <div className="p-4">
            <h3 className="text-base font-semibold" style={SERIF}>{s.name}</h3>
            <div className="text-xs uppercase tracking-widest text-muted-foreground">{s.city}</div>
            <div className="mt-2 flex gap-2 text-xs">
              <span className="rounded-full bg-muted px-2 py-0.5 font-mono">{s.capacity}</span>
              <span className="rounded-full bg-muted px-2 py-0.5 font-mono">est. {s.opened}</span>
            </div>
            <p className="mt-2 text-sm text-foreground/85">{tt(s.note, lang)}</p>
          </div>
        </article>
      ))}
    </div>
  );
}

/* -------------------- Famous Matches -------------------- */

function MatchesExhibit({ lang }: { lang: Lang }) {
  const { has, toggle } = useFootballBookmarks("matches");
  return (
    <div className="grid gap-4 md:grid-cols-2">
      {FAMOUS_MATCHES.map((m) => {
        const theaterId = theaterIdForFootballMatch(m.id);
        return (
          <article
            key={m.id}
            className="rounded-2xl border border-border bg-card p-5 transition hover:-translate-y-0.5"
            style={{ boxShadow: "var(--shadow-soft)" }}
          >
            <div className="flex items-baseline justify-between gap-3">
              <div className="min-w-0">
                <div className="text-xs uppercase tracking-widest text-muted-foreground">{m.date}</div>
                <h3 className="mt-1 text-lg font-semibold truncate" style={SERIF}>{m.title}</h3>
                <div className="text-xs text-muted-foreground">{m.venue}</div>
              </div>
              <div className="text-right">
                <div className="font-mono text-2xl font-bold text-accent-foreground" style={SERIF}>{m.score}</div>
                <button
                  type="button"
                  onClick={() => toggle(m.id)}
                  aria-label={has(m.id) ? "Unbookmark" : "Bookmark match"}
                  className={
                    "mt-1 inline-flex items-center justify-center w-8 h-8 rounded-full border transition " +
                    (has(m.id)
                      ? "bg-accent text-accent-foreground border-accent"
                      : "border-border text-muted-foreground hover:text-foreground")
                  }
                >
                  {has(m.id) ? "★" : "☆"}
                </button>
              </div>
            </div>
            <p className="mt-3 text-sm text-foreground/85" style={SERIF}>{tt(m.note, lang)}</p>
            {theaterId && (
              <Link
                to="/theater/$matchId"
                params={{ matchId: theaterId }}
                className="mt-4 inline-flex items-center gap-2 rounded-full border border-accent/50 bg-accent/10 px-3 py-1.5 text-xs font-semibold text-accent-foreground transition hover:bg-accent/20"
                style={SERIF}
              >
                {{ en: "Enter Match Theater", fr: "Entrer dans le Théâtre du match", ar: "ادخل مسرح المباراة" }[lang]}
                <span aria-hidden>→</span>
              </Link>
            )}
          </article>
        );
      })}
    </div>
  );
}

/* -------------------- Culture -------------------- */

function CultureExhibit({ lang }: { lang: Lang }) {
  return (
    <div className="grid gap-4 sm:grid-cols-2">
      {CULTURE_THEMES.map((c, i) => (
        <Plaque key={i}>
          <h3 className="text-lg font-semibold mb-2" style={SERIF}>{tt(c.title, lang)}</h3>
          <p className="text-sm text-foreground/85" style={SERIF}>{tt(c.body, lang)}</p>
        </Plaque>
      ))}
    </div>
  );
}

/* -------------------- Trophies -------------------- */

function TrophyRoom({ lang }: { lang: Lang }) {
  const [open, setOpen] = useState<string | null>(null);
  return (
    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
      {TROPHIES.map((t) => {
        const isOpen = open === t.id;
        return (
          <button
            key={t.id}
            type="button"
            onClick={() => setOpen(isOpen ? null : t.id)}
            aria-expanded={isOpen}
            className="group text-left rounded-2xl border border-border bg-card p-5 transition hover:-translate-y-0.5"
            style={{ boxShadow: "var(--shadow-soft)" }}
          >
            <div className="flex items-center gap-4">
              <MedallionFrame size={64} tone="gold" glow={isOpen}>
                <span className="text-2xl" aria-hidden>🏆</span>
              </MedallionFrame>
              <div className="min-w-0">
                <h3 className="text-base font-semibold truncate" style={SERIF}>{tt(t.name, lang)}</h3>
                <div className="text-xs uppercase tracking-widest text-muted-foreground">
                  ×{t.count} · {t.years.join(" · ")}
                </div>
              </div>
            </div>
            <div
              className={
                "grid transition-all overflow-hidden " +
                (isOpen ? "grid-rows-[1fr] opacity-100 mt-3" : "grid-rows-[0fr] opacity-0")
              }
            >
              <div className="min-h-0">
                <p className="text-sm text-foreground/85" style={SERIF}>{tt(t.detail, lang)}</p>
              </div>
            </div>
          </button>
        );
      })}
    </div>
  );
}

/* -------------------- Statistics -------------------- */

function StatsExhibit({ lang }: { lang: Lang }) {
  const topGoals = Math.max(...STATS.topScorers.map((s) => s.goals));
  const topCaps = Math.max(...STATS.mostCaps.map((s) => s.caps));
  return (
    <div className="grid gap-6 lg:grid-cols-3">
      <Plaque>
        <h3 className="text-lg font-semibold mb-3" style={SERIF}>
          {{ en: "Top scorers", fr: "Meilleurs buteurs", ar: "أفضل الهدّافين" }[lang]}
        </h3>
        <ul className="space-y-2.5">
          {STATS.topScorers.map((s) => (
            <li key={s.name}>
              <div className="flex items-baseline justify-between text-sm">
                <span className="font-semibold text-foreground">{s.name}</span>
                <span className="font-mono text-accent-foreground font-semibold">{s.goals}</span>
              </div>
              <div className="mt-1 h-1.5 rounded-full bg-muted overflow-hidden">
                <div
                  className="h-full rounded-full"
                  style={{
                    width: `${(s.goals / topGoals) * 100}%`,
                    background: "linear-gradient(90deg, oklch(0.72 0.14 72), oklch(0.9 0.13 86))",
                  }}
                />
              </div>
            </li>
          ))}
        </ul>
      </Plaque>

      <Plaque>
        <h3 className="text-lg font-semibold mb-3" style={SERIF}>
          {{ en: "Most caps", fr: "Sélections", ar: "الأكثر مشاركة" }[lang]}
        </h3>
        <ul className="space-y-2.5">
          {STATS.mostCaps.map((s) => (
            <li key={s.name}>
              <div className="flex items-baseline justify-between text-sm">
                <span className="font-semibold text-foreground">{s.name}</span>
                <span className="font-mono text-accent-foreground font-semibold">{s.caps}</span>
              </div>
              <div className="mt-1 h-1.5 rounded-full bg-muted overflow-hidden">
                <div
                  className="h-full rounded-full"
                  style={{
                    width: `${(s.caps / topCaps) * 100}%`,
                    background: "linear-gradient(90deg, oklch(0.5 0.13 150), oklch(0.72 0.14 130))",
                  }}
                />
              </div>
            </li>
          ))}
        </ul>
      </Plaque>

      <Plaque>
        <h3 className="text-lg font-semibold mb-3" style={SERIF}>
          {{ en: "Honours ledger", fr: "Palmarès", ar: "سجلّ الألقاب" }[lang]}
        </h3>
        <dl className="space-y-3 text-sm">
          <StatRow label={{ en: "World Cups", fr: "Coupes du monde", ar: "كأس العالم" }[lang]} value={STATS.worldCups} />
          <StatRow label={{ en: "AFCON titles", fr: "Titres CAN", ar: "ألقاب الكان" }[lang]} value={STATS.afconTitles} highlight />
          <StatRow label={{ en: "Arab Cup", fr: "Coupe arabe", ar: "كأس العرب" }[lang]} value={STATS.arabCups} />
          <div className="pt-2 border-t border-border/60">
            <div className="text-xs uppercase tracking-widest text-muted-foreground">
              {{ en: "Unbeaten streak", fr: "Série d’invincibilité", ar: "سلسلة اللاهزيمة" }[lang]}
            </div>
            <div className="mt-1 font-semibold" style={SERIF}>{STATS.unbeatenRun}</div>
          </div>
        </dl>
      </Plaque>
    </div>
  );
}

function StatRow({ label, value, highlight }: { label: string; value: number; highlight?: boolean }) {
  return (
    <div className="flex items-baseline justify-between">
      <dt className="text-foreground/85">{label}</dt>
      <dd className={"font-mono text-lg font-bold " + (highlight ? "text-accent-foreground" : "text-foreground")}>
        {value}
      </dd>
    </div>
  );
}

/* -------------------- Memories -------------------- */

function MemoriesExhibit({ lang }: { lang: Lang }) {
  return (
    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
      {ARTIFACTS.map((a) => (
        <Plaque key={a.id} className="text-center">
          <div className="mx-auto mb-3">
            <MedallionFrame size={72} tone="bronze" glow>
              <span className="text-3xl" aria-hidden>{a.emoji}</span>
            </MedallionFrame>
          </div>
          <h3 className="text-base font-semibold" style={SERIF}>{tt(a.title, lang)}</h3>
          <p className="mt-1 text-sm text-foreground/80" style={SERIF}>{tt(a.note, lang)}</p>
        </Plaque>
      ))}
    </div>
  );
}

/* -------------------- Timeline -------------------- */

function TimelineExhibit({ lang }: { lang: Lang }) {
  return (
    <div className="relative overflow-x-auto">
      <div
        aria-hidden
        className="absolute top-16 left-0 right-0 h-px"
        style={{ background: "linear-gradient(90deg, transparent, oklch(0.7 0.12 70 / 0.5), transparent)" }}
      />
      <ol className="flex gap-6 pb-6 pt-4 min-w-max pr-6">
        {CENTURY.map((c) => (
          <li key={c.year} className="w-56 shrink-0 relative pt-8">
            <span
              className="absolute top-14 left-1/2 -translate-x-1/2 w-3.5 h-3.5 rounded-full border-2 border-card"
              style={{ background: "oklch(0.82 0.14 78)" }}
              aria-hidden
            />
            <div className="text-center font-mono text-sm font-semibold text-accent-foreground">{c.year}</div>
            <div className="mt-2 rounded-xl border border-border bg-card p-3 text-center" style={{ boxShadow: "var(--shadow-soft)" }}>
              <div className="text-sm text-foreground/85" style={SERIF}>{tt(c.label, lang)}</div>
            </div>
          </li>
        ))}
      </ol>
    </div>
  );
}

/* -------------------- Exhibit navigator -------------------- */

function ExhibitNavigator({ lang }: { lang: Lang }) {
  return (
    <section id="exhibits" className="max-w-6xl mx-auto px-4 sm:px-6 py-12">
      <div className="mb-6">
        <div className="text-[10px] uppercase tracking-[0.28em] font-bold text-muted-foreground">
          {{ en: "The exhibits", fr: "Les salles", ar: "الصالات" }[lang]}
        </div>
        <h2 className="mt-1 text-2xl sm:text-3xl font-bold" style={SERIF}>
          {{ en: "Fifteen rooms · one national story", fr: "Quinze salles · une histoire nationale", ar: "خمس عشرة صالة · حكاية وطنيّة واحدة" }[lang]}
        </h2>
      </div>
      <ol className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
        {FOOTBALL_EXHIBITS.map((e, i) => (
          <li key={e.id}>
            <a
              href={`#${e.id}`}
              className="group flex items-center gap-4 rounded-2xl border border-border bg-card p-4 transition hover:-translate-y-0.5 hover:border-accent/50"
              style={{ boxShadow: "var(--shadow-soft)" }}
            >
              <MedallionFrame size={48} tone="gold">
                <span className="text-base font-bold text-[oklch(0.2_0.05_40)]" style={SERIF} aria-hidden>{e.emblem}</span>
              </MedallionFrame>
              <div className="min-w-0">
                <div className="text-[10px] uppercase tracking-widest text-muted-foreground font-bold">
                  {String(i + 1).padStart(2, "0")}
                </div>
                <div className="font-semibold truncate text-foreground" style={SERIF}>{tt(e.title, lang)}</div>
                <div className="text-xs text-muted-foreground truncate">{tt(e.subtitle, lang)}</div>
              </div>
              <span className="ms-auto text-muted-foreground group-hover:text-foreground transition" aria-hidden>→</span>
            </a>
          </li>
        ))}
      </ol>
    </section>
  );
}

/* -------------------- Achievement (Football Historian) -------------------- */

const FH_KEY = "dz-football-historian-visited-v1";
function useFootballHistorian() {
  const [count, setCount] = useState(0);
  useEffect(() => {
    try {
      const raw = localStorage.getItem(FH_KEY);
      const set = new Set<string>(raw ? (JSON.parse(raw) as string[]) : []);
      // Record this visit — an "explored" milestone
      set.add("visited-hall");
      localStorage.setItem(FH_KEY, JSON.stringify(Array.from(set)));
      setCount(set.size);
    } catch {
      /* noop */
    }
  }, []);
  return count;
}

function AchievementBanner({ lang }: { lang: Lang }) {
  const count = useFootballHistorian();
  if (count === 0) return null;
  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 py-6">
      <div className="rounded-2xl border border-accent/40 bg-accent/5 p-4 sm:p-5 flex items-center gap-4">
        <MedallionFrame size={56} tone="gold" glow animate="unlock">
          <span className="text-2xl" aria-hidden>⚽</span>
        </MedallionFrame>
        <div className="flex-1 min-w-0">
          <div className="text-[10px] uppercase tracking-[0.28em] font-bold text-accent-foreground">
            {{ en: "Passport stamp unlocked", fr: "Cachet de passeport débloqué", ar: "خُتم جواز المتحف" }[lang]}
          </div>
          <div className="mt-0.5 font-semibold text-foreground" style={SERIF}>
            {{ en: "Football Historian", fr: "Historien du football", ar: "مؤرّخ كرة القدم" }[lang]}
          </div>
          <div className="text-xs text-muted-foreground">
            {{
              en: "You entered the Hall of Algerian Football.",
              fr: "Vous êtes entré·e dans la Galerie du football algérien.",
              ar: "دخلتَ قاعة كرة القدم الجزائرية.",
            }[lang]}
          </div>
        </div>
      </div>
    </div>
  );
}

/* -------------------- Page -------------------- */

function FootballHall() {
  const lang = useLang();

  const exhibitRenderers = useMemo<Record<FootballExhibitId, React.ReactNode>>(
    () => ({
      origins: <OriginsExhibit lang={lang} />,
      "national-team": <NationalTeamExhibit lang={lang} />,
      "fln-team": <FlnExhibit lang={lang} />,
      "world-cup": <WorldCupExhibit lang={lang} />,
      gijon: <GijonExhibit lang={lang} />,
      afcon: <AfconExhibit lang={lang} />,
      legends: <LegendsExhibit lang={lang} />,
      coaches: <CoachesExhibit lang={lang} />,
      stadiums: <StadiumsExhibit lang={lang} />,
      matches: <MatchesExhibit lang={lang} />,
      culture: <CultureExhibit lang={lang} />,
      trophies: <TrophyRoom lang={lang} />,
      stats: <StatsExhibit lang={lang} />,
      memories: <MemoriesExhibit lang={lang} />,
      timeline: <TimelineExhibit lang={lang} />,
    }),
    [lang]
  );

  return (
    <div className="min-h-dvh bg-background">
      <Header />
      <FootballHero lang={lang} />
      <AchievementBanner lang={lang} />
      <ExhibitNavigator lang={lang} />
      <div>
        {FOOTBALL_EXHIBITS.map((e, i) => (
          <Section
            key={e.id}
            id={e.id}
            emblem={e.emblem}
            n={i + 1}
            title={tt(e.title, lang)}
            subtitle={tt(e.subtitle, lang)}
          >
            <p className="mb-6 text-[15px] sm:text-base leading-relaxed text-foreground/85 max-w-3xl" style={SERIF}>
              {tt(e.intro, lang)}
            </p>
            {exhibitRenderers[e.id]}
          </Section>
        ))}
      </div>

      {/* Closing */}
      <footer className="py-16 text-center max-w-2xl mx-auto px-4">
        <MedallionFrame size={72} tone="gold" glow>
          <span className="text-2xl" aria-hidden>⚽</span>
        </MedallionFrame>
        <p className="mt-4 text-sm text-muted-foreground italic" style={SERIF}>
          {{
            en: "This wing is a living exhibit. New matches, players and memories will be added as they happen.",
            fr: "Cette aile est un musée vivant. De nouveaux matchs, joueurs et souvenirs y entreront au fil du temps.",
            ar: "هذا الجناح متحف حيّ. ستُضاف إليه مباريات ولاعبون وذكريات جديدة مع مرور الوقت.",
          }[lang]}
        </p>
      </footer>
    </div>
  );
}

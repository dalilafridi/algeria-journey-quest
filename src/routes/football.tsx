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
      className="relative overflow-hidden text-[oklch(0.95_0.03_80)]"
      style={{
        background:
          "radial-gradient(ellipse at 50% 20%, oklch(0.28 0.05 60 / 0.55), transparent 65%), radial-gradient(ellipse at 90% 80%, oklch(0.35 0.08 30 / 0.4), transparent 60%), linear-gradient(180deg, oklch(0.14 0.02 45), oklch(0.09 0.015 40))",
      }}
    >
      {/* Stadium haze — soft light shafts */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-60"
        style={{
          background:
            "repeating-linear-gradient(102deg, transparent 0 60px, oklch(0.9 0.05 80 / 0.03) 60px 120px)",
        }}
      />
      {/* Grass line */}
      <div
        aria-hidden
        className="pointer-events-none absolute bottom-0 left-0 right-0 h-24"
        style={{
          background:
            "linear-gradient(180deg, transparent, oklch(0.35 0.09 130 / 0.35))",
        }}
      />

      <div className="relative max-w-6xl mx-auto px-4 sm:px-6 py-16 sm:py-24 md:py-32 grid gap-10 md:grid-cols-[1.15fr_1fr] items-center">
        <div className="animate-float-up">
          <p className="text-[10px] sm:text-xs uppercase tracking-[0.28em] font-bold text-[oklch(0.85_0.14_82)]">
            ⵣ · {eyebrow}
          </p>
          <h1
            className="mt-4 text-4xl sm:text-5xl md:text-6xl font-bold leading-[1.05] text-[oklch(0.96_0.04_82)]"
            style={SERIF}
          >
            {title}
          </h1>
          <p className="mt-5 text-lg sm:text-xl max-w-xl text-[oklch(0.88_0.03_85)]/85 italic" style={SERIF}>
            {subtitle}
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <a
              href="#exhibits"
              className="inline-flex items-center gap-2 rounded-full px-5 py-3 text-sm font-semibold text-[oklch(0.15_0.02_45)] transition hover:-translate-y-0.5"
              style={{
                background:
                  "linear-gradient(135deg, oklch(0.92 0.13 86), oklch(0.72 0.14 72))",
                boxShadow: "0 0 32px -8px oklch(0.85 0.16 80 / 0.55)",
              }}
            >
              {{ en: "Enter the museum", fr: "Entrer dans le musée", ar: "ادخل المتحف" }[lang]}
              <span aria-hidden>→</span>
            </a>
            <a
              href="#timeline"
              className="inline-flex items-center gap-2 rounded-full border border-[oklch(0.7_0.1_75_/_0.4)] px-5 py-3 text-sm font-semibold text-[oklch(0.92_0.06_82)] hover:bg-[oklch(1_0_0_/_0.06)] transition"
            >
              {{ en: "Century timeline", fr: "Chronologie", ar: "الخطّ الزمني" }[lang]}
            </a>
          </div>
        </div>

        {/* Display case with rotating ball */}
        <div className="relative flex items-center justify-center animate-float-up">
          <DisplayCase />
        </div>
      </div>
    </section>
  );
}

function DisplayCase() {
  return (
    <div className="relative w-[280px] h-[340px] sm:w-[320px] sm:h-[400px]">
      {/* Case pedestal */}
      <div
        aria-hidden
        className="absolute inset-x-6 bottom-0 h-16 rounded-t-md"
        style={{
          background:
            "linear-gradient(180deg, oklch(0.32 0.03 45), oklch(0.18 0.02 40))",
          boxShadow: "0 20px 40px -20px oklch(0 0 0 / 0.6)",
        }}
      />
      {/* Glass */}
      <div
        className="absolute inset-x-0 bottom-14 top-0 rounded-2xl border overflow-hidden backdrop-blur-sm"
        style={{
          borderColor: "oklch(0.85 0.14 80 / 0.35)",
          background:
            "linear-gradient(180deg, oklch(0.98 0.05 80 / 0.06), oklch(0.6 0.05 75 / 0.02) 50%, oklch(0.98 0.05 80 / 0.06))",
          boxShadow:
            "inset 0 1px 0 oklch(1 0 0 / 0.15), inset 0 -1px 0 oklch(1 0 0 / 0.05), 0 24px 60px -20px oklch(0.85 0.16 80 / 0.25)",
        }}
      >
        {/* Beam */}
        <div
          aria-hidden
          className="absolute -top-6 left-1/2 -translate-x-1/2 w-40 h-40 rounded-full blur-2xl"
          style={{ background: "oklch(0.9 0.15 85 / 0.35)" }}
        />
        {/* Ball */}
        <div className="absolute inset-0 flex items-center justify-center">
          <RotatingBall />
        </div>
        {/* Plaque */}
        <div className="absolute bottom-3 left-1/2 -translate-x-1/2 px-3 py-1 rounded-full text-[10px] uppercase tracking-[0.24em] font-bold text-[oklch(0.15_0.02_45)]"
             style={{ background: "linear-gradient(135deg, oklch(0.92 0.13 86), oklch(0.72 0.14 72))" }}>
          Exhibit 01 · Origins
        </div>
      </div>
    </div>
  );
}

function RotatingBall() {
  return (
    <div
      className="relative"
      style={{
        width: 160,
        height: 160,
        animation: "dz-ball-spin 14s linear infinite",
        filter: "drop-shadow(0 12px 24px oklch(0 0 0 / 0.55))",
      }}
    >
      <style>{`
        @keyframes dz-ball-spin {
          from { transform: rotateY(0deg) rotateX(6deg); }
          to   { transform: rotateY(360deg) rotateX(6deg); }
        }
      `}</style>
      <svg viewBox="0 0 100 100" width="100%" height="100%">
        <defs>
          <radialGradient id="ballShade" cx="35%" cy="30%" r="70%">
            <stop offset="0%" stopColor="oklch(0.98 0.02 85)" />
            <stop offset="55%" stopColor="oklch(0.88 0.02 82)" />
            <stop offset="100%" stopColor="oklch(0.35 0.03 60)" />
          </radialGradient>
        </defs>
        <circle cx="50" cy="50" r="46" fill="url(#ballShade)" />
        {/* Classic pentagons — stylised */}
        <g fill="oklch(0.18 0.02 45)" stroke="oklch(0.12 0.02 40)" strokeWidth="0.6">
          <polygon points="50,22 60,30 56,42 44,42 40,30" />
          <polygon points="24,44 34,40 40,48 34,58 26,54" />
          <polygon points="76,44 66,40 60,48 66,58 74,54" />
          <polygon points="36,66 44,64 50,72 46,80 38,76" />
          <polygon points="64,66 56,64 50,72 54,80 62,76" />
        </g>
        {/* Hex connectors — thin ink lines */}
        <g fill="none" stroke="oklch(0.2 0.02 45)" strokeWidth="0.6" opacity="0.9">
          <path d="M50 22 L50 12 M60 30 L69 24 M40 30 L31 24 M56 42 L66 40 M44 42 L34 40 M34 58 L28 66 M66 58 L72 66 M50 72 L50 82" />
        </g>
      </svg>
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
      {FAMOUS_MATCHES.map((m) => (
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
        </article>
      ))}
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

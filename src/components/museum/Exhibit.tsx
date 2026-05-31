/**
 * Museum Exhibit layout system.
 *
 * A small kit of presentational primitives that give every major detail page
 * the same "museum exhibition book opened on screen" feel:
 *
 *   - parchment canvas + two-column editorial layout on desktop
 *   - strong left story column, right overview / related panel
 *   - elegant bronze-bordered museum cards
 *   - refined section labels (eyebrows)
 *   - dark "Start / Continue" action panels
 *   - a "You will explore" stats strip
 *   - a curator tip note
 *   - a bottom contextual navigation ribbon
 *
 * These are layout-only: they reuse the existing brand tokens (parchment,
 * brand-gold, shadow-soft) and never introduce a new visual language.
 */

import type { CSSProperties, ReactNode } from "react";
import { Link } from "@tanstack/react-router";
import { t, type Lang, type LocalizedString } from "@/lib/i18n";

const SERIF = "Georgia, 'Times New Roman', serif";

/* ---------------------------------------------------------------- Shell --- */

/** Parchment page canvas. Wrap a page body (Header lives outside). */
export function ExhibitShell({ children, className }: { children: ReactNode; className?: string }) {
  return <div className={`min-h-dvh bg-parchment ${className ?? ""}`}>{children}</div>;
}

/**
 * Two-column editorial grid. Main story column on the left, overview panel on
 * the right. Stacks to a single column on mobile (panel below content).
 */
export function ExhibitGrid({
  main,
  aside,
  className,
}: {
  main: ReactNode;
  aside?: ReactNode;
  className?: string;
}) {
  return (
    <div
      className={`max-w-6xl mx-auto px-4 py-7 sm:py-9 grid gap-7 lg:gap-9 items-start ${
        aside ? "lg:grid-cols-[1fr_340px]" : ""
      } ${className ?? ""}`}
    >
      <div className="min-w-0 space-y-6">{main}</div>
      {aside ? <aside className="min-w-0 space-y-5 lg:sticky lg:top-6">{aside}</aside> : null}
    </div>
  );
}

/* --------------------------------------------------------------- Labels --- */

/** Refined section label with a small engraved marker. */
export function ExhibitEyebrow({
  children,
  icon,
  className,
}: {
  children: ReactNode;
  icon?: ReactNode;
  className?: string;
}) {
  return (
    <div
      className={`inline-flex items-center gap-2 text-[11px] font-bold uppercase tracking-[0.2em] ${
        className ?? ""
      }`}
      style={{ color: "color-mix(in oklab, var(--brand-gold-deep) 80%, var(--foreground))" }}
    >
      {icon ? (
        <span aria-hidden className="text-sm leading-none">
          {icon}
        </span>
      ) : (
        <span aria-hidden className="inline-block w-5 h-px" style={{ background: "var(--brand-gold)" }} />
      )}
      <span>{children}</span>
    </div>
  );
}

/* ----------------------------------------------------------------- Hero --- */

/** Back / breadcrumb link styled as a quiet museum label. */
export function ExhibitBack({ to, hash, params, children }: { to: string; hash?: string; params?: Record<string, string>; children: ReactNode }) {
  return (
    <Link
      // @ts-expect-error generic string route — used across many detail pages
      to={to}
      hash={hash}
      params={params}
      className="inline-flex items-center gap-1.5 text-xs uppercase tracking-[0.16em] font-semibold text-muted-foreground hover:text-foreground transition-colors py-1"
    >
      <span aria-hidden className="rtl:rotate-180">
        ←
      </span>
      {children}
    </Link>
  );
}

/* -------------------------------------------------------------- Hero row --- */

/**
 * Editorial hero: strong left story content (eyebrow, serif title, poetic
 * subtitle, metadata pills, intro) with the medallion artifact on the right.
 */
export function ExhibitHero({
  eyebrow,
  title,
  subtitle,
  pills,
  intro,
  medallion,
  back,
}: {
  eyebrow?: ReactNode;
  title: ReactNode;
  subtitle?: ReactNode;
  pills?: ReactNode;
  intro?: ReactNode;
  medallion?: ReactNode;
  back?: ReactNode;
}) {
  return (
    <header
      className="relative overflow-hidden rounded-[1.75rem] border px-5 sm:px-9 py-8 sm:py-10 animate-cinematic-in"
      style={{
        borderColor: "color-mix(in oklab, var(--brand-gold) 26%, var(--border))",
        background: "var(--gradient-parchment, linear-gradient(180deg, var(--card), var(--muted)))",
        boxShadow: "var(--shadow-soft)",
      }}
    >
      {/* subtle map / amazigh watermark */}
      <span
        aria-hidden
        className="pointer-events-none absolute -top-10 -end-6 text-[9rem] sm:text-[13rem] leading-none font-extrabold select-none"
        style={{ color: "color-mix(in oklab, var(--brand-gold) 9%, transparent)" }}
      >
        ⵣ
      </span>
      <div className="relative grid gap-6 sm:gap-8 md:grid-cols-[1fr_auto] md:items-center">
        <div className="min-w-0 text-center md:text-start">
          {back ? <div className="mb-3">{back}</div> : null}
          {eyebrow ? <div className="mb-2 flex justify-center md:justify-start">{eyebrow}</div> : null}
          <h1
            className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight leading-[1.05] text-foreground"
            style={{ fontFamily: SERIF }}
          >
            {title}
          </h1>
          {subtitle ? (
            <p
              className="mt-3 text-sm sm:text-base font-semibold uppercase tracking-[0.14em]"
              style={{ color: "color-mix(in oklab, var(--primary) 88%, var(--foreground))" }}
            >
              {subtitle}
            </p>
          ) : null}
          {pills ? (
            <div className="mt-4 flex flex-wrap gap-1.5 justify-center md:justify-start">{pills}</div>
          ) : null}
          {intro ? (
            <p className="mt-4 text-sm sm:text-base text-foreground/80 leading-relaxed max-w-2xl mx-auto md:mx-0">
              {intro}
            </p>
          ) : null}
        </div>
        {medallion ? <div className="flex justify-center md:justify-end shrink-0">{medallion}</div> : null}
      </div>
    </header>
  );
}

/** A metadata pill (time, stops, theme…). */
export function ExhibitPill({ children, icon }: { children: ReactNode; icon?: ReactNode }) {
  return (
    <span
      className="inline-flex items-center gap-1.5 rounded-full border px-3 py-1 text-xs font-semibold"
      style={{
        borderColor: "color-mix(in oklab, var(--brand-gold) 36%, var(--border))",
        background: "color-mix(in oklab, var(--brand-gold) 8%, var(--card))",
        color: "color-mix(in oklab, var(--brand-gold-deep) 85%, var(--foreground))",
      }}
    >
      {icon ? <span aria-hidden>{icon}</span> : null}
      {children}
    </span>
  );
}

/* ----------------------------------------------------------------- Card --- */

/** Bordered museum card with optional accent edge + heading. */
export function MuseumCard({
  children,
  accent,
  eyebrow,
  title,
  icon,
  className,
  style,
}: {
  children: ReactNode;
  accent?: string;
  eyebrow?: ReactNode;
  title?: ReactNode;
  icon?: ReactNode;
  className?: string;
  style?: CSSProperties;
}) {
  return (
    <section
      className={`relative rounded-2xl border bg-card/95 p-5 sm:p-6 ${className ?? ""}`}
      style={{
        borderColor: "color-mix(in oklab, var(--brand-gold) 22%, var(--border))",
        boxShadow: "var(--shadow-soft)",
        ...(accent
          ? { borderInlineStartWidth: 3, borderInlineStartColor: accent }
          : null),
        ...style,
      }}
    >
      {eyebrow ? <ExhibitEyebrow icon={icon} className="mb-2">{eyebrow}</ExhibitEyebrow> : null}
      {title ? (
        <h3
          className="text-lg sm:text-xl font-bold leading-snug text-foreground mb-2"
          style={{ fontFamily: SERIF }}
        >
          {title}
        </h3>
      ) : null}
      {children}
    </section>
  );
}

/* ------------------------------------------------------- Overview panel --- */

/** Right-side panel container (overview / related / facts). */
export function PanelCard({
  children,
  eyebrow,
  icon,
  className,
}: {
  children: ReactNode;
  eyebrow?: ReactNode;
  icon?: ReactNode;
  className?: string;
}) {
  return (
    <div
      className={`rounded-2xl border bg-card/95 p-5 ${className ?? ""}`}
      style={{
        borderColor: "color-mix(in oklab, var(--brand-gold) 24%, var(--border))",
        boxShadow: "var(--shadow-soft)",
      }}
    >
      {eyebrow ? <ExhibitEyebrow icon={icon} className="mb-3">{eyebrow}</ExhibitEyebrow> : null}
      {children}
    </div>
  );
}

/** An ordered list of stops / chapters with numbered bronze markers. */
export function OverviewStops({
  stops,
}: {
  stops: { title: ReactNode; note?: ReactNode; tag?: ReactNode; to?: string; params?: Record<string, string>; hash?: string }[];
}) {
  return (
    <ol className="relative space-y-1">
      {stops.map((s, i) => {
        const body = (
          <div className="flex items-start gap-3 rounded-xl px-2.5 py-2.5 -mx-1 transition-colors hover:bg-muted/50">
            <span
              aria-hidden
              className="shrink-0 grid place-items-center h-7 w-7 rounded-full text-[12px] font-bold"
              style={{
                background:
                  "radial-gradient(circle at 35% 28%, oklch(0.88 0.12 84), oklch(0.6 0.13 60))",
                color: "oklch(0.28 0.05 50)",
                boxShadow: "inset 0 -2px 4px oklch(0.2 0.04 45 / 0.4), 0 0 0 1px oklch(0.34 0.06 55 / 0.5)",
              }}
            >
              {i + 1}
            </span>
            <div className="min-w-0 flex-1">
              <div className="flex items-start justify-between gap-2">
                <div className="font-bold text-sm leading-snug" style={{ fontFamily: SERIF }}>
                  {s.title}
                </div>
                {s.tag ? (
                  <span className="shrink-0 mt-0.5 px-2 py-0.5 rounded-full bg-muted text-[10px] font-semibold text-muted-foreground whitespace-nowrap">
                    {s.tag}
                  </span>
                ) : null}
              </div>
              {s.note ? (
                <div className="text-xs text-muted-foreground leading-snug mt-0.5">{s.note}</div>
              ) : null}
            </div>
          </div>
        );
        return (
          <li key={i}>
            {s.to ? (
              <Link
                // @ts-expect-error generic string route
                to={s.to}
                params={s.params}
                hash={s.hash}
                className="block focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/40 rounded-xl"
              >
                {body}
              </Link>
            ) : (
              body
            )}
          </li>
        );
      })}
    </ol>
  );
}

/* --------------------------------------------------- "You will explore" --- */

export function ExploreStats({
  stats,
}: {
  stats: { value: ReactNode; label: ReactNode; icon?: ReactNode }[];
}) {
  return (
    <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
      {stats.map((s, i) => (
        <div
          key={i}
          className="rounded-xl border bg-card/80 px-3 py-3 text-center"
          style={{ borderColor: "color-mix(in oklab, var(--brand-gold) 22%, var(--border))" }}
        >
          {s.icon ? (
            <div aria-hidden className="text-lg leading-none mb-1" style={{ color: "var(--brand-gold-deep)" }}>
              {s.icon}
            </div>
          ) : null}
          <div className="text-base font-extrabold leading-none" style={{ fontFamily: SERIF }}>
            {s.value}
          </div>
          <div className="mt-1 text-[11px] text-muted-foreground leading-tight">{s.label}</div>
        </div>
      ))}
    </div>
  );
}

/* ----------------------------------------------------------- Action CTA --- */

/** Dark "Start / Continue" action panel (the brown ribbon in the reference). */
export function ActionPanel({
  eyebrow,
  title,
  subtitle,
  cta,
  seal,
}: {
  eyebrow?: ReactNode;
  title: ReactNode;
  subtitle?: ReactNode;
  cta: ReactNode;
  seal?: ReactNode;
}) {
  return (
    <div
      className="relative overflow-hidden rounded-2xl px-5 sm:px-7 py-6 sm:py-7"
      style={{
        background:
          "linear-gradient(135deg, oklch(0.26 0.035 55), oklch(0.2 0.03 50))",
        boxShadow: "var(--shadow-glow, var(--shadow-soft))",
        border: "1px solid color-mix(in oklab, var(--brand-gold) 30%, transparent)",
      }}
    >
      <div className="flex flex-col sm:flex-row items-center gap-5 text-center sm:text-start">
        {seal ? <div className="shrink-0">{seal}</div> : null}
        <div className="min-w-0 flex-1">
          {eyebrow ? (
            <div
              className="text-[11px] font-bold uppercase tracking-[0.2em]"
              style={{ color: "var(--brand-gold)" }}
            >
              {eyebrow}
            </div>
          ) : null}
          <div
            className="mt-1 text-xl sm:text-2xl font-extrabold leading-tight"
            style={{ fontFamily: SERIF, color: "oklch(0.96 0.02 85)" }}
          >
            {title}
          </div>
          {subtitle ? (
            <div className="mt-1 text-sm" style={{ color: "oklch(0.85 0.02 85 / 0.85)" }}>
              {subtitle}
            </div>
          ) : null}
        </div>
        <div className="shrink-0 w-full sm:w-auto">{cta}</div>
      </div>
    </div>
  );
}

/** The gold pill CTA used inside ActionPanel (or standalone). */
export function ActionButton({ children, ...rest }: { children: ReactNode } & React.ComponentProps<typeof Link>) {
  return (
    <Link
      {...rest}
      className="inline-flex w-full sm:w-auto items-center justify-center gap-2 rounded-xl px-6 py-3 text-sm font-bold text-primary-foreground transition hover:opacity-95 active:scale-95 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/40 min-h-12"
      style={{ background: "var(--gradient-warm)", boxShadow: "var(--shadow-glow)" }}
    >
      {children}
      <span aria-hidden className="rtl:rotate-180">
        →
      </span>
    </Link>
  );
}

/* ----------------------------------------------------------- Curator tip --- */

export function CuratorTip({ title, children }: { title?: ReactNode; children: ReactNode }) {
  return (
    <div
      className="relative overflow-hidden rounded-2xl border p-5"
      style={{
        borderColor: "color-mix(in oklab, var(--secondary) 30%, var(--border))",
        background: "color-mix(in oklab, var(--secondary) 7%, var(--card))",
      }}
    >
      <span
        aria-hidden
        className="pointer-events-none absolute -bottom-4 -end-2 text-[5rem] leading-none opacity-10 select-none"
      >
        ❖
      </span>
      <ExhibitEyebrow icon="❖" className="mb-1.5">
        {title ?? "Curator's tip"}
      </ExhibitEyebrow>
      <p className="text-sm text-foreground/80 leading-relaxed relative">{children}</p>
    </div>
  );
}

/* -------------------------------------------------- Bottom context ribbon --- */

export type RibbonKey = "figures" | "eras" | "regions" | "culture" | "atlas" | "collections" | "timeline";

const RIBBON_DEFS: Record<RibbonKey, { to: string; emoji: string; label: LocalizedString }> = {
  figures: { to: "/figures", emoji: "👤", label: { en: "Figures", fr: "Figures", ar: "شخصيات" } },
  eras: { to: "/timeline", emoji: "🏛️", label: { en: "Eras", fr: "Époques", ar: "العصور" } },
  regions: { to: "/map", emoji: "📍", label: { en: "Regions", fr: "Régions", ar: "المناطق" } },
  culture: { to: "/culture", emoji: "✦", label: { en: "Culture", fr: "Culture", ar: "الثقافة" } },
  atlas: { to: "/atlas", emoji: "🌍", label: { en: "Atlas", fr: "Atlas", ar: "الأطلس" } },
  collections: { to: "/figures", emoji: "◈", label: { en: "Collections", fr: "Collections", ar: "المجموعات" } },
  timeline: { to: "/timeline", emoji: "⏳", label: { en: "Timeline", fr: "Chronologie", ar: "الخط الزمني" } },
};

const RIBBON_TITLE: LocalizedString = {
  en: "This exhibit connects",
  fr: "Cet espace relie",
  ar: "يربط هذا المعرض",
};

/**
 * Subtle bottom ribbon showing what the page connects to. Not sticky — it sits
 * at the end of the page so it never blocks mobile content; scrolls
 * horizontally on small screens.
 */
export function ContextRibbon({
  connects,
  lang,
  className,
}: {
  connects: RibbonKey[];
  lang: Lang;
  className?: string;
}) {
  const items = Array.from(new Set(connects)).map((k) => RIBBON_DEFS[k]);
  return (
    <nav
      aria-label={t(RIBBON_TITLE, lang)}
      className={`max-w-6xl mx-auto px-4 pb-10 ${className ?? ""}`}
    >
      <div
        className="rounded-2xl border px-4 sm:px-6 py-4"
        style={{
          borderColor: "color-mix(in oklab, var(--brand-gold) 26%, var(--border))",
          background: "var(--gradient-parchment, var(--card))",
          boxShadow: "var(--shadow-soft)",
        }}
      >
        <div className="flex items-center gap-4 sm:gap-6 overflow-x-auto no-scrollbar">
          <span className="shrink-0 text-[11px] font-bold uppercase tracking-[0.16em] text-muted-foreground">
            {t(RIBBON_TITLE, lang)}
          </span>
          <div className="flex items-center gap-1.5 sm:gap-2">
            {items.map((it, i) => (
              <Link
                key={i}
                // @ts-expect-error generic string route
                to={it.to}
                className="group inline-flex shrink-0 items-center gap-2 rounded-full border border-transparent px-3 py-1.5 text-sm font-semibold transition-colors hover:border-primary/30 hover:bg-card"
                style={{ color: "color-mix(in oklab, var(--brand-gold-deep) 80%, var(--foreground))" }}
              >
                <span aria-hidden className="text-base leading-none">
                  {it.emoji}
                </span>
                {t(it.label, lang)}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </nav>
  );
}

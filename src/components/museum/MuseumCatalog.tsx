/**
 * Museum Catalog layout system.
 *
 * The app-wide "open exhibition book" architecture: a strong left story column
 * (breadcrumb → exhibit label → serif title → poetic subtitle → metadata pills
 * → narrative → exhibit cards → CTA), a right context sidebar (overview,
 * timeline, key facts, related, curator tip) and a subtle bottom context
 * ribbon. Every major detail page composes these primitives so the whole
 * museum reads as one curated catalog rather than a set of web pages.
 *
 * Layout-only: reuses existing brand tokens (parchment, brand-gold, bronze,
 * shadow-soft) and the medallion artifact system. No new visual language.
 */

import type { CSSProperties, ReactNode } from "react";
import { Link } from "@tanstack/react-router";
import { CollectionEmblem } from "@/components/figures/CollectionEmblem";
import { t, type Lang, type LocalizedString } from "@/lib/i18n";

const SERIF = "Georgia, 'Times New Roman', serif";

/* =============================================================== Page === */

/**
 * Orchestrates the full catalog page: parchment canvas, two-column editorial
 * grid (story left, context sidebar right) and an optional bottom ribbon.
 */
export function MuseumCatalogPage({
  main,
  sidebar,
  ribbon,
  className,
}: {
  main: ReactNode;
  sidebar?: ReactNode;
  ribbon?: ReactNode;
  className?: string;
}) {
  return (
    <div className={`min-h-dvh bg-parchment ${className ?? ""}`}>
      <div
        className={`max-w-6xl mx-auto px-4 py-7 sm:py-9 grid gap-7 lg:gap-9 items-start ${
          sidebar ? "lg:grid-cols-[1fr_360px]" : ""
        }`}
      >
        <MuseumMainColumn>{main}</MuseumMainColumn>
        {sidebar ? <MuseumSidebar>{sidebar}</MuseumSidebar> : null}
      </div>
      {ribbon}
    </div>
  );
}

/** Left story column. */
export function MuseumMainColumn({ children, className }: { children: ReactNode; className?: string }) {
  return <div className={`min-w-0 space-y-6 ${className ?? ""}`}>{children}</div>;
}

/** Right context sidebar — sticks below the fold on desktop, stacks on mobile. */
export function MuseumSidebar({ children, className }: { children: ReactNode; className?: string }) {
  return (
    <aside className={`min-w-0 space-y-5 lg:sticky lg:top-6 ${className ?? ""}`}>{children}</aside>
  );
}

/* ============================================================= Labels === */

/** Small uppercase exhibit label with an engraved marker. */
export function MuseumLabel({
  children,
  marker,
  className,
}: {
  children: ReactNode;
  marker?: ReactNode;
  className?: string;
}) {
  return (
    <div
      className={`inline-flex items-center gap-2 text-[11px] font-bold uppercase tracking-[0.2em] ${
        className ?? ""
      }`}
      style={{ color: "color-mix(in oklab, var(--brand-gold-deep) 82%, var(--foreground))" }}
    >
      {marker ?? (
        <span aria-hidden className="inline-block w-5 h-px" style={{ background: "var(--brand-gold)" }} />
      )}
      <span>{children}</span>
    </div>
  );
}

/** Quiet breadcrumb / back link. */
export function MuseumBack({
  to,
  params,
  hash,
  children,
}: {
  to: string;
  params?: Record<string, string>;
  hash?: string;
  children: ReactNode;
}) {
  const LinkAny = Link as unknown as React.ComponentType<Record<string, unknown>>;
  return (
    <LinkAny
      to={to}
      params={params}
      hash={hash}
      className="inline-flex items-center gap-1.5 text-xs uppercase tracking-[0.16em] font-semibold text-muted-foreground hover:text-foreground transition-colors py-1"
    >
      <span aria-hidden className="rtl:rotate-180">
        ←
      </span>
      {children}
    </LinkAny>
  );
}

/** A small soft pill chip (exhibit-label style). */
export function MuseumChip({ children }: { children: ReactNode }) {
  return (
    <span
      className="inline-flex items-center gap-1.5 rounded-full border px-3 py-1 text-[11px] font-bold uppercase tracking-[0.16em]"
      style={{
        borderColor: "color-mix(in oklab, var(--brand-gold) 40%, var(--border))",
        background: "color-mix(in oklab, var(--brand-gold) 12%, var(--card))",
        color: "color-mix(in oklab, var(--brand-gold-deep) 88%, var(--foreground))",
      }}
    >
      {children}
    </span>
  );
}

/** A metadata pill (time, stops, theme…). */
export function MuseumPill({ children, icon }: { children: ReactNode; icon?: ReactNode }) {
  return (
    <span
      className="inline-flex items-center gap-1.5 rounded-full border px-3 py-1.5 text-xs font-semibold"
      style={{
        borderColor: "color-mix(in oklab, var(--brand-gold) 32%, var(--border))",
        background: "color-mix(in oklab, var(--brand-gold) 7%, var(--card))",
        color: "color-mix(in oklab, var(--brand-gold-deep) 85%, var(--foreground))",
      }}
    >
      {icon ? <span aria-hidden>{icon}</span> : null}
      {children}
    </span>
  );
}

/* =============================================================== Hero === */

/**
 * Editorial catalog hero: left story block (label, serif title, subtitle,
 * pills, intro) with the medallion artifact on the right.
 */
export function MuseumHero({
  label,
  title,
  subtitle,
  pills,
  intro,
  medallion,
}: {
  label?: ReactNode;
  title: ReactNode;
  subtitle?: ReactNode;
  pills?: ReactNode;
  intro?: ReactNode;
  medallion?: ReactNode;
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
        className="pointer-events-none absolute -top-12 -end-8 text-[10rem] sm:text-[15rem] leading-none font-extrabold select-none"
        style={{ color: "color-mix(in oklab, var(--brand-gold) 8%, transparent)" }}
      >
        ⵣ
      </span>
      <div className="relative grid gap-6 sm:gap-8 md:grid-cols-[1fr_auto] md:items-center">
        <div className="min-w-0 text-center md:text-start">
          {label ? <div className="mb-3 flex justify-center md:justify-start">{label}</div> : null}
          <h1
            className="text-3xl sm:text-4xl lg:text-[3.25rem] font-extrabold tracking-tight leading-[1.04] text-foreground"
            style={{ fontFamily: SERIF }}
          >
            {title}
          </h1>
          {subtitle ? (
            <p
              className="mt-3 text-sm sm:text-base font-bold uppercase tracking-[0.16em]"
              style={{ color: "color-mix(in oklab, var(--brand-terracotta, var(--primary)) 90%, var(--foreground))" }}
            >
              {subtitle}
            </p>
          ) : null}
          {pills ? (
            <div className="mt-4 flex flex-wrap gap-2 justify-center md:justify-start">{pills}</div>
          ) : null}
          {intro ? (
            <p className="mt-5 text-sm sm:text-base text-foreground/80 leading-relaxed max-w-2xl mx-auto md:mx-0">
              {intro}
            </p>
          ) : null}
        </div>
        {medallion ? <div className="flex justify-center md:justify-end shrink-0">{medallion}</div> : null}
      </div>
    </header>
  );
}

/* =============================================================== Cards === */

/** A cream museum card with bronze border + optional accent edge / heading. */
export function MuseumCatalogCard({
  children,
  accent,
  eyebrow,
  title,
  marker,
  aside,
  className,
  style,
}: {
  children: ReactNode;
  accent?: string;
  eyebrow?: ReactNode;
  title?: ReactNode;
  marker?: ReactNode;
  aside?: ReactNode;
  className?: string;
  style?: CSSProperties;
}) {
  return (
    <section
      className={`relative overflow-hidden rounded-2xl border bg-card/95 p-5 sm:p-6 ${className ?? ""}`}
      style={{
        borderColor: "color-mix(in oklab, var(--brand-gold) 24%, var(--border))",
        boxShadow: "var(--shadow-soft)",
        ...(accent ? { borderInlineStartWidth: 3, borderInlineStartColor: accent } : null),
        ...style,
      }}
    >
      <div className="relative flex items-start gap-4">
        <div className="min-w-0 flex-1">
          {eyebrow ? (
            <MuseumLabel marker={marker} className="mb-2">
              {eyebrow}
            </MuseumLabel>
          ) : null}
          {title ? (
            <h3
              className="text-lg sm:text-xl font-bold leading-snug text-foreground mb-2"
              style={{ fontFamily: SERIF }}
            >
              {title}
            </h3>
          ) : null}
          {children}
        </div>
        {aside ? <div className="shrink-0 hidden sm:block">{aside}</div> : null}
      </div>
    </section>
  );
}

/* ===================================================== Overview panel === */

/** Right-sidebar panel container with a label header. */
export function MuseumOverviewPanel({
  children,
  eyebrow,
  marker,
  className,
}: {
  children: ReactNode;
  eyebrow?: ReactNode;
  marker?: ReactNode;
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
      {eyebrow ? (
        <MuseumLabel marker={marker} className="mb-3.5">
          {eyebrow}
        </MuseumLabel>
      ) : null}
      {children}
    </div>
  );
}

/* ===================================================== Timeline panel === */

export type TimelineStop = {
  title: ReactNode;
  note?: ReactNode;
  tag?: ReactNode;
  to?: string;
  params?: Record<string, string>;
  hash?: string;
  active?: boolean;
};

/**
 * Numbered "journey overview" timeline with engraved bronze markers joined by a
 * dotted thread — the right-panel stop list from the reference.
 */
export function MuseumTimelinePanel({
  eyebrow,
  marker,
  stops,
}: {
  eyebrow?: ReactNode;
  marker?: ReactNode;
  stops: TimelineStop[];
}) {
  const LinkAny = Link as unknown as React.ComponentType<Record<string, unknown>>;
  return (
    <MuseumOverviewPanel eyebrow={eyebrow} marker={marker}>
      <ol className="relative">
        {stops.map((s, i) => {
          const isLast = i === stops.length - 1;
          const body = (
            <div
              className="relative flex items-start gap-3 rounded-xl px-2 py-2.5 transition-colors hover:bg-muted/50"
              style={
                s.active
                  ? {
                      background: "color-mix(in oklab, var(--brand-gold) 10%, transparent)",
                    }
                  : undefined
              }
            >
              <div className="relative shrink-0">
                <span
                  aria-hidden
                  className="grid place-items-center h-8 w-8 rounded-full text-[13px] font-bold"
                  style={{
                    background:
                      "radial-gradient(circle at 35% 28%, oklch(0.88 0.12 84), oklch(0.58 0.13 60))",
                    color: "oklch(0.26 0.05 50)",
                    boxShadow:
                      "inset 0 -2px 4px oklch(0.2 0.04 45 / 0.4), 0 0 0 1px oklch(0.34 0.06 55 / 0.55)",
                  }}
                >
                  {i + 1}
                </span>
                {!isLast ? (
                  <span
                    aria-hidden
                    className="absolute start-1/2 -translate-x-1/2 top-8 h-[calc(100%-0.5rem)] w-px"
                    style={{
                      backgroundImage:
                        "repeating-linear-gradient(to bottom, color-mix(in oklab, var(--brand-gold) 55%, transparent) 0 3px, transparent 3px 7px)",
                    }}
                  />
                ) : null}
              </div>
              <div className="min-w-0 flex-1 pb-1">
                <div className="flex items-start justify-between gap-2">
                  <div className="font-bold text-sm leading-snug text-foreground" style={{ fontFamily: SERIF }}>
                    {s.title}
                  </div>
                  {s.tag ? (
                    <span
                      className="shrink-0 mt-0.5 px-2 py-0.5 rounded-full text-[10px] font-semibold whitespace-nowrap"
                      style={{
                        background: "color-mix(in oklab, var(--brand-gold) 12%, var(--muted))",
                        color: "color-mix(in oklab, var(--brand-gold-deep) 85%, var(--foreground))",
                      }}
                    >
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
                <LinkAny
                  to={s.to}
                  params={s.params}
                  hash={s.hash}
                  className="block focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/40 rounded-xl"
                >
                  {body}
                </LinkAny>
              ) : (
                body
              )}
            </li>
          );
        })}
      </ol>
    </MuseumOverviewPanel>
  );
}

/* ================================================= "You will explore" === */

/**
 * A grid of engraved medallion stats ("6+ Key Figures", "6 Major Eras"…).
 * Uses bronze medallion artifacts instead of flat icons.
 */
export function MuseumExploreGrid({
  stats,
}: {
  stats: { glyph: string; value: ReactNode; label: ReactNode }[];
}) {
  return (
    <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
      {stats.map((s, i) => (
        <div
          key={i}
          className="flex flex-col items-center gap-1.5 rounded-xl border bg-card/80 px-2 py-3 text-center"
          style={{ borderColor: "color-mix(in oklab, var(--brand-gold) 22%, var(--border))" }}
        >
          <CollectionEmblem emblem={s.glyph} size={34} />
          <div className="text-sm font-extrabold leading-none" style={{ fontFamily: SERIF }}>
            {s.value}
          </div>
          <div className="text-[10px] text-muted-foreground leading-tight">{s.label}</div>
        </div>
      ))}
    </div>
  );
}

/* ============================================================== Facts === */

export function MuseumFactsList({ facts }: { facts: ReactNode[] }) {
  return (
    <ul className="space-y-2.5">
      {facts.map((f, i) => (
        <li key={i} className="flex items-start gap-2.5 text-sm text-foreground/85 leading-relaxed">
          <span aria-hidden className="mt-1.5 shrink-0 h-1.5 w-1.5 rounded-full" style={{ background: "var(--brand-gold-deep)" }} />
          <span className="min-w-0">{f}</span>
        </li>
      ))}
    </ul>
  );
}

/* =============================================================== CTA === */

/** Dark "Start this journey" action band with an engraved seal. */
export function MuseumCTASection({
  eyebrow,
  title,
  subtitle,
  action,
  seal,
}: {
  eyebrow?: ReactNode;
  title: ReactNode;
  subtitle?: ReactNode;
  action: ReactNode;
  seal?: ReactNode;
}) {
  return (
    <div
      className="@container relative overflow-hidden rounded-2xl px-5 sm:px-7 py-6 sm:py-7"
      style={{
        background: "linear-gradient(135deg, oklch(0.26 0.035 55), oklch(0.19 0.03 50))",
        boxShadow: "var(--shadow-glow, var(--shadow-soft))",
        border: "1px solid color-mix(in oklab, var(--brand-gold) 30%, transparent)",
      }}
    >
      <span
        aria-hidden
        className="pointer-events-none absolute -bottom-8 -end-6 text-[8rem] leading-none select-none"
        style={{ color: "color-mix(in oklab, var(--brand-gold) 8%, transparent)" }}
      >
        ❖
      </span>
      <div className="relative flex flex-col items-center gap-4 text-center @lg:flex-row @lg:items-center @lg:gap-5 @lg:text-start">
        {seal ? <div className="shrink-0">{seal}</div> : null}
        <div className="min-w-0 flex-1">
          {eyebrow ? (
            <div className="text-[11px] font-bold uppercase tracking-[0.2em]" style={{ color: "var(--brand-gold)" }}>
              {eyebrow}
            </div>
          ) : null}
          <div
            className="mt-1 text-xl font-extrabold leading-tight"
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
        <div className="shrink-0 w-full @lg:w-auto">{action}</div>
      </div>
    </div>
  );
}

/** A gold pill button used inside MuseumCTASection. */
export function MuseumActionButton({
  children,
  onClick,
  to,
  params,
  hash,
  type = "button",
}: {
  children: ReactNode;
  onClick?: () => void;
  to?: string;
  params?: Record<string, string>;
  hash?: string;
  type?: "button" | "submit";
}) {
  const cls =
    "inline-flex w-full @lg:w-auto items-center justify-center gap-2 rounded-full px-7 py-3 text-sm font-bold text-primary-foreground transition hover:opacity-95 active:scale-95 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/40 min-h-12";
  const style = { background: "var(--gradient-warm)", boxShadow: "var(--shadow-glow)" };
  const inner = (
    <>
      {children}
      <span aria-hidden className="rtl:rotate-180">
        →
      </span>
    </>
  );
  if (to) {
    const LinkAny = Link as unknown as React.ComponentType<Record<string, unknown>>;
    return (
      <LinkAny to={to} params={params} hash={hash} className={cls} style={style}>
        {inner}
      </LinkAny>
    );
  }
  return (
    <button type={type} onClick={onClick} className={cls} style={style}>
      {inner}
    </button>
  );
}

/* ========================================================= Curator tip === */

export function MuseumCuratorTip({ title, children }: { title?: ReactNode; children: ReactNode }) {
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
      <MuseumLabel marker={<span aria-hidden>❖</span>} className="mb-1.5">
        {title ?? "Curator's tip"}
      </MuseumLabel>
      <p className="text-sm text-foreground/80 leading-relaxed relative">{children}</p>
    </div>
  );
}

/* ===================================================== Context ribbon === */

export type RibbonKey = "figures" | "eras" | "regions" | "culture" | "atlas" | "collections" | "timeline";

const RIBBON_DEFS: Record<RibbonKey, { to: string; glyph: string; label: LocalizedString }> = {
  figures: { to: "/figures", glyph: "♟", label: { en: "Figures", fr: "Figures", ar: "شخصيات" } },
  eras: { to: "/timeline", glyph: "♜", label: { en: "Eras", fr: "Époques", ar: "العصور" } },
  regions: { to: "/map", glyph: "❖", label: { en: "Regions", fr: "Régions", ar: "المناطق" } },
  culture: { to: "/culture", glyph: "✦", label: { en: "Culture", fr: "Culture", ar: "الثقافة" } },
  atlas: { to: "/atlas", glyph: "❂", label: { en: "Atlas", fr: "Atlas", ar: "الأطلس" } },
  collections: { to: "/figures", glyph: "◈", label: { en: "Collections", fr: "Collections", ar: "المجموعات" } },
  timeline: { to: "/timeline", glyph: "❧", label: { en: "Timeline", fr: "Chronologie", ar: "الخط الزمني" } },
};

const DEFAULT_RIBBON_TITLE: LocalizedString = {
  en: "This exhibit connects",
  fr: "Cet espace relie",
  ar: "يربط هذا المعرض",
};

/**
 * Subtle bottom context ribbon linking the connected halls of the museum. Not
 * sticky — sits at the end of the page so it never blocks mobile content, and
 * scrolls horizontally on small screens.
 */
export function MuseumContextRibbon({
  connects,
  lang,
  title,
  className,
}: {
  connects: RibbonKey[];
  lang: Lang;
  title?: LocalizedString;
  className?: string;
}) {
  const items = Array.from(new Set(connects)).map((k) => RIBBON_DEFS[k]);
  return (
    <nav
      aria-label={t(title ?? DEFAULT_RIBBON_TITLE, lang)}
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
            {t(title ?? DEFAULT_RIBBON_TITLE, lang)}
          </span>
          <div className="flex items-center gap-1 sm:gap-2">
            {items.map((it, i) => (
              <Link
                key={i}
                to={it.to}
                className="group inline-flex shrink-0 items-center gap-2 rounded-full border border-transparent px-3 py-1.5 text-sm font-semibold transition-colors hover:border-primary/30 hover:bg-card"
                style={{ color: "color-mix(in oklab, var(--brand-gold-deep) 80%, var(--foreground))" }}
              >
                <span
                  aria-hidden
                  className="grid place-items-center h-5 w-5 rounded-full text-[11px]"
                  style={{
                    background: "color-mix(in oklab, var(--brand-gold) 18%, transparent)",
                    color: "var(--brand-gold-deep)",
                  }}
                >
                  {it.glyph}
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

export default MuseumCatalogPage;

/**
 * MasterpieceExhibit — reusable museum-exhibit component library.
 *
 * The M'Zab Valley exhibit (`/mzab`) is the reference implementation of
 * DZ Odyssey's museum-grade layout. These components extract that layout
 * into primitives and composed sections so every future exhibit — clubs,
 * regions, eras, cultural halls — can be assembled from the same trusted
 * building blocks while keeping its own content.
 *
 * Primitives : Section · EyebrowTitle · Prose · Plaque · MuseumFrame · Figure
 * Compositions: ExhibitHero · SplitFigure · NumberedGrid · DiscoveryCards
 *              · DataStatsCard · CriteriaList · PullQuote · CollectionGrid
 *              · RelatedExhibits
 *
 * Design rules the library enforces (do not override in consumers):
 *  – Parchment / ivory / sand tones only.
 *  – Georgia-family serif for display type (SERIF).
 *  – Ⲁmazigh eyebrow glyph "ⵣ" as the museum wayfinding mark.
 *  – Sepia-framed images with vignette for archival feel.
 */

import type React from "react";
import { Link } from "@tanstack/react-router";
import { t, useLang, type Lang, type LocalizedString } from "@/lib/i18n";

/* -------------------------------------------------------------------------- */
/*  shared constants                                                          */
/* -------------------------------------------------------------------------- */

export const SERIF: React.CSSProperties = {
  fontFamily: "Georgia, 'Iowan Old Style', 'Times New Roman', serif",
};

const FRAME_SHADOW =
  "0 20px 40px -20px oklch(0.15 0.03 40 / 0.5), inset 0 0 0 1px oklch(0.55 0.06 60 / 0.3), inset 0 0 0 4px oklch(0.98 0.01 80 / 0.85)";

const HERO_FRAME_SHADOW =
  "0 30px 60px -28px oklch(0.15 0.03 40 / 0.55), 0 12px 24px -14px oklch(0.15 0.03 40 / 0.4), inset 0 0 0 1px oklch(0.55 0.06 60 / 0.35), inset 0 0 0 4px oklch(0.98 0.01 80 / 0.9)";

/* -------------------------------------------------------------------------- */
/*  primitives                                                                */
/* -------------------------------------------------------------------------- */

export type SectionTone = "parchment" | "sand" | "ivory";

export function Section({
  id,
  tone = "parchment",
  children,
  className = "",
}: {
  id?: string;
  tone?: SectionTone;
  children: React.ReactNode;
  className?: string;
}) {
  const bg =
    tone === "sand"
      ? "radial-gradient(ellipse at 50% 0%, oklch(0.9 0.05 65 / 0.35), transparent 60%), var(--gradient-parchment)"
      : tone === "ivory"
      ? "linear-gradient(180deg, oklch(0.985 0.008 80), oklch(0.97 0.014 75))"
      : "var(--gradient-parchment)";
  return (
    <section id={id} className={`relative scroll-mt-24 ${className}`} style={{ background: bg }}>
      <div className="relative max-w-6xl mx-auto px-4 sm:px-6 py-14 sm:py-20">{children}</div>
    </section>
  );
}

export function EyebrowTitle({
  eyebrow,
  title,
  glyph = "ⵣ",
  as: Tag = "h2",
}: {
  eyebrow: LocalizedString;
  title: LocalizedString;
  glyph?: string | null;
  as?: "h1" | "h2" | "h3";
}) {
  const lang = useLang();
  return (
    <header className="mb-8">
      <p className="text-[10px] sm:text-xs uppercase tracking-[0.28em] font-bold text-primary">
        {glyph ? `${glyph} · ` : ""}
        {t(eyebrow, lang)}
      </p>
      <Tag
        className="mt-3 text-3xl sm:text-4xl md:text-5xl font-bold leading-tight text-foreground"
        style={SERIF}
      >
        {t(title, lang)}
      </Tag>
    </header>
  );
}

export function Prose({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  return (
    <div
      className={`text-base sm:text-lg text-foreground/80 leading-[1.75] space-y-5 max-w-3xl ${className}`}
    >
      {children}
    </div>
  );
}

export function Plaque({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div
      className={`rounded-2xl border border-border bg-card p-6 sm:p-7 ${className}`}
      style={{ boxShadow: "var(--shadow-soft)" }}
    >
      {children}
    </div>
  );
}

export function MuseumFrame({
  children,
  hero = false,
  className = "",
}: {
  children: React.ReactNode;
  hero?: boolean;
  className?: string;
}) {
  return (
    <div
      className={`relative overflow-hidden rounded-2xl ${className}`}
      style={{ boxShadow: hero ? HERO_FRAME_SHADOW : FRAME_SHADOW }}
    >
      {children}
    </div>
  );
}

/** Standard sepia-vignetted figure with caption. */
export function Figure({
  src,
  alt,
  caption,
  width,
  height,
  priority = false,
  hero = false,
  vignette = false,
  sepia = false,
}: {
  src: string;
  alt: LocalizedString;
  caption?: LocalizedString;
  width?: number;
  height?: number;
  priority?: boolean;
  hero?: boolean;
  vignette?: boolean;
  sepia?: boolean;
}) {
  const lang = useLang();
  return (
    <figure className="relative w-full">
      <MuseumFrame hero={hero}>
        <img
          src={src}
          alt={t(alt, lang)}
          width={width}
          height={height}
          loading={priority ? "eager" : "lazy"}
          className="block w-full h-auto"
          style={sepia ? { filter: "contrast(1.03) saturate(0.98) sepia(0.05)" } : undefined}
        />
        {vignette && (
          <div
            aria-hidden
            className="pointer-events-none absolute inset-0"
            style={{
              background:
                "radial-gradient(115% 90% at 50% 50%, transparent 60%, oklch(0.18 0.03 40 / 0.35) 100%)",
            }}
          />
        )}
      </MuseumFrame>
      {caption && (
        <figcaption className="mt-3 text-xs text-muted-foreground text-center italic">
          {t(caption, lang)}
        </figcaption>
      )}
    </figure>
  );
}

/* -------------------------------------------------------------------------- */
/*  compositions                                                              */
/* -------------------------------------------------------------------------- */

/**
 * Museum hero. Supports either a hero image (image + imageAlt) or a
 * medallion/crest render slot (medallion) — never both.
 */
export function ExhibitHero({
  eyebrow,
  title,
  subtitle,
  lede,
  glyph = "ⵣ",
  image,
  imageAlt,
  imageCaption,
  medallion,
  meta,
  ctaHref,
  ctaLabel,
  backTo,
  backLabel,
  background,
}: {
  eyebrow: LocalizedString;
  title: LocalizedString;
  subtitle?: LocalizedString;
  lede?: LocalizedString;
  glyph?: string | null;
  image?: string;
  imageAlt?: LocalizedString;
  imageCaption?: LocalizedString;
  medallion?: React.ReactNode;
  meta?: React.ReactNode;
  ctaHref?: string;
  ctaLabel?: LocalizedString;
  backTo?: string;
  backLabel?: LocalizedString;
  background?: string;
}) {
  const lang = useLang();
  const bg =
    background ??
    "radial-gradient(ellipse at 50% 25%, oklch(0.92 0.05 70 / 0.4), transparent 65%), var(--gradient-parchment)";
  const showRight = Boolean(image || medallion);
  return (
    <section className="relative overflow-hidden" style={{ background: bg }}>
      <div
        className={`relative max-w-6xl mx-auto px-4 sm:px-6 py-14 sm:py-20 md:py-24 grid gap-10 items-center ${
          showRight ? "md:grid-cols-[1fr_1.2fr]" : ""
        }`}
      >
        <div>
          {eyebrow && (
            <p className="text-[10px] sm:text-xs uppercase tracking-[0.28em] font-bold text-primary">
              {glyph ? `${glyph} · ` : ""}
              {t(eyebrow, lang)}
            </p>
          )}
          <h1
            className="mt-4 text-4xl sm:text-5xl md:text-6xl font-bold leading-[1.05] text-foreground"
            style={SERIF}
          >
            {t(title, lang)}
          </h1>
          {meta && <div className="mt-2 text-sm text-muted-foreground">{meta}</div>}
          {subtitle && (
            <p className="mt-4 text-xl sm:text-2xl max-w-xl text-foreground/80 italic" style={SERIF}>
              {t(subtitle, lang)}
            </p>
          )}
          {lede && (
            <p className="mt-5 text-base sm:text-lg max-w-xl text-foreground/70 leading-[1.7]">
              {t(lede, lang)}
            </p>
          )}
          {(ctaHref || backTo) && (
            <div className="mt-7 flex flex-wrap gap-3">
              {ctaHref && (
                <a
                  href={ctaHref}
                  className="inline-flex items-center gap-2 rounded-full bg-primary text-primary-foreground px-5 py-3 text-sm font-semibold transition hover:-translate-y-0.5"
                  style={{ boxShadow: "var(--shadow-soft)" }}
                >
                  {ctaLabel ? t(ctaLabel, lang) : ""}
                  <span aria-hidden>→</span>
                </a>
              )}
              {backTo && (
                <Link
                  to={backTo as unknown as "/"}
                  className="inline-flex items-center gap-2 rounded-full border border-border bg-card px-5 py-3 text-sm font-semibold text-foreground hover:bg-muted transition"
                >
                  {backLabel ? t(backLabel, lang) : "←"}
                </Link>
              )}
            </div>
          )}
        </div>

        {image && (
          <Figure
            src={image}
            alt={imageAlt ?? title}
            caption={imageCaption}
            width={1920}
            height={1008}
            priority
            hero
            vignette
            sepia
          />
        )}
        {!image && medallion && <div className="flex justify-center md:justify-end">{medallion}</div>}
      </div>
    </section>
  );
}

/** Text on one side, figure on the other. Reverses on `mirrored`. */
export function SplitFigure({
  eyebrow,
  title,
  body,
  bullets,
  figure,
  mirrored = false,
  glyph,
}: {
  eyebrow?: LocalizedString;
  title?: LocalizedString;
  body?: LocalizedString | LocalizedString[];
  bullets?: LocalizedString[];
  figure: React.ReactNode;
  mirrored?: boolean;
  glyph?: string | null;
}) {
  const lang = useLang();
  const paragraphs = Array.isArray(body) ? body : body ? [body] : [];
  const text = (
    <div>
      {eyebrow && title && <EyebrowTitle eyebrow={eyebrow} title={title} glyph={glyph ?? undefined} />}
      {paragraphs.length > 0 && (
        <Prose>
          {paragraphs.map((p, i) => (
            <p key={i}>{t(p, lang)}</p>
          ))}
        </Prose>
      )}
      {bullets && bullets.length > 0 && (
        <ul className="mt-6 space-y-3">
          {bullets.map((b, i) => (
            <li key={i} className="flex gap-3 text-sm text-foreground/80 leading-[1.7]">
              <span aria-hidden className="mt-2 h-1.5 w-1.5 rounded-full bg-primary shrink-0" />
              <span>{t(b, lang)}</span>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
  return (
    <div className="grid gap-10 md:grid-cols-[1fr_1fr] items-start">
      {mirrored ? figure : text}
      {mirrored ? text : figure}
    </div>
  );
}

/** Numbered card grid — used for principles, ksour, engineering bullets. */
export type NumberedItem = {
  title?: LocalizedString;
  meta?: LocalizedString; // small line above title
  arabic?: string;
  body: LocalizedString;
  role?: LocalizedString;
  fact?: LocalizedString;
};

export function NumberedGrid({
  items,
  columns = 2,
  factLabel,
  as = "ol",
}: {
  items: NumberedItem[];
  columns?: 1 | 2 | 3;
  factLabel?: LocalizedString;
  as?: "ol" | "ul";
}) {
  const lang = useLang();
  const cols =
    columns === 1
      ? ""
      : columns === 3
      ? "md:grid-cols-2 xl:grid-cols-3"
      : "md:grid-cols-2";
  const List = as;
  return (
    <List className={`grid gap-6 ${cols}`} role="list">
      {items.map((k, i) => (
        <li
          key={i}
          className="rounded-2xl border border-border bg-card p-6 sm:p-7 transition hover:-translate-y-0.5"
          style={{ boxShadow: "var(--shadow-soft)" }}
        >
          <div className="flex items-baseline justify-between gap-4">
            <div>
              <p className="text-xs uppercase tracking-[0.24em] font-bold text-primary">
                {String(i + 1).padStart(2, "0")}
                {k.meta ? ` · ${t(k.meta, lang)}` : ""}
              </p>
              {k.title && (
                <h3 className="mt-2 text-2xl font-bold text-foreground" style={SERIF}>
                  {t(k.title, lang)}
                </h3>
              )}
            </div>
            {k.arabic && (
              <span
                aria-hidden
                className="text-2xl text-primary/70"
                style={{ fontFamily: "'Amiri', 'Scheherazade New', serif" }}
              >
                {k.arabic}
              </span>
            )}
          </div>
          {k.role && (
            <p className="mt-4 text-sm font-semibold text-foreground/90" style={SERIF}>
              {t(k.role, lang)}
            </p>
          )}
          <p className="mt-3 text-sm text-foreground/80 leading-[1.75]">{t(k.body, lang)}</p>
          {k.fact && (
            <p className="mt-4 pt-4 border-t border-border/60 text-xs text-muted-foreground italic">
              {factLabel ? `${t(factLabel, lang)} · ` : ""}
              {t(k.fact, lang)}
            </p>
          )}
        </li>
      ))}
    </List>
  );
}

/** "Did You Know" discovery cards with floating chip. */
export function DiscoveryCards({
  items,
  label,
  columns = 3,
}: {
  items: LocalizedString[];
  label?: LocalizedString;
  columns?: 2 | 3;
}) {
  const lang = useLang();
  const cols = columns === 3 ? "md:grid-cols-2 lg:grid-cols-3" : "md:grid-cols-2";
  return (
    <ul className={`grid gap-5 ${cols}`} role="list">
      {items.map((f, i) => (
        <li
          key={i}
          className="rounded-2xl border border-border bg-card p-6 relative"
          style={{ boxShadow: "var(--shadow-soft)" }}
        >
          <span
            aria-hidden
            className="absolute -top-3 left-5 inline-flex items-center justify-center h-7 min-w-7 px-2 rounded-full bg-primary text-primary-foreground text-[10px] uppercase tracking-[0.24em] font-bold"
          >
            {label ? t(label, lang) : "Fact"} · {String(i + 1).padStart(2, "0")}
          </span>
          <p className="mt-2 text-sm text-foreground/80 leading-[1.75]">{t(f, lang)}</p>
        </li>
      ))}
    </ul>
  );
}

/** Museum data-card with label list. */
export function DataStatsCard({
  label,
  stats,
  footer,
}: {
  label: LocalizedString;
  stats: { label: LocalizedString; value: LocalizedString }[];
  footer?: LocalizedString;
}) {
  const lang = useLang();
  return (
    <div
      className="rounded-2xl border border-border p-6 sm:p-8"
      style={{ background: "oklch(0.98 0.01 80)", boxShadow: "var(--shadow-soft)" }}
    >
      <p className="text-xs uppercase tracking-[0.24em] font-bold text-primary mb-4">
        {t(label, lang)}
      </p>
      <dl className="grid grid-cols-2 gap-x-6 gap-y-4">
        {stats.map((s, i) => (
          <div key={i}>
            <dt className="text-[11px] uppercase tracking-wider text-muted-foreground">
              {t(s.label, lang)}
            </dt>
            <dd className="text-lg font-bold text-foreground" style={SERIF}>
              {t(s.value, lang)}
            </dd>
          </div>
        ))}
      </dl>
      {footer && (
        <p className="mt-6 text-xs text-muted-foreground italic">{t(footer, lang)}</p>
      )}
    </div>
  );
}

/** UNESCO-style criteria list with code chips. */
export function CriteriaList({
  items,
}: {
  items: { code: string; body: LocalizedString }[];
}) {
  const lang = useLang();
  return (
    <ul className="mt-5 space-y-5">
      {items.map((c) => (
        <li key={c.code} className="flex gap-4">
          <span
            aria-hidden
            className="shrink-0 inline-flex items-center justify-center h-10 w-10 rounded-full border border-border text-sm font-bold text-primary"
            style={{ background: "oklch(0.98 0.01 80)", ...SERIF }}
          >
            {c.code}
          </span>
          <p className="text-sm sm:text-base text-foreground/80 leading-[1.7]">{t(c.body, lang)}</p>
        </li>
      ))}
    </ul>
  );
}

export function PullQuote({
  quote,
  attribution,
}: {
  quote: LocalizedString;
  attribution: LocalizedString;
}) {
  const lang = useLang();
  return (
    <figure
      className="mt-10 rounded-2xl border border-border bg-card p-6 sm:p-8 max-w-3xl"
      style={{ boxShadow: "var(--shadow-soft)" }}
    >
      <blockquote
        className="text-xl sm:text-2xl italic text-foreground/85 leading-[1.5]"
        style={SERIF}
      >
        {t(quote, lang)}
      </blockquote>
      <figcaption className="mt-4 text-xs uppercase tracking-[0.24em] text-primary font-bold">
        {t(attribution, lang)}
      </figcaption>
    </figure>
  );
}

/** Museum-plate collection grid. */
export type CollectionPlate = {
  src: string;
  alt: LocalizedString;
  caption: LocalizedString;
  note?: LocalizedString;
};

export function CollectionGrid({
  plates,
  plateLabel,
}: {
  plates: CollectionPlate[];
  plateLabel?: LocalizedString;
}) {
  const lang = useLang();
  return (
    <ul className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3" role="list">
      {plates.map((p, i) => (
        <li key={i} className="group">
          <figure
            className="rounded-xl overflow-hidden border border-border bg-card"
            style={{ boxShadow: "var(--shadow-soft)" }}
          >
            <img
              src={p.src}
              alt={t(p.alt, lang)}
              loading="lazy"
              className="block w-full h-52 object-cover transition duration-500 group-hover:scale-[1.02]"
            />
            <figcaption className="p-4">
              <p className="text-xs uppercase tracking-[0.22em] font-bold text-primary">
                {plateLabel ? t(plateLabel, lang) : "Plate"} {String(i + 1).padStart(2, "0")}
              </p>
              <p className="mt-1 text-sm font-semibold text-foreground" style={SERIF}>
                {t(p.caption, lang)}
              </p>
              {p.note && (
                <p className="mt-1 text-xs text-muted-foreground italic">{t(p.note, lang)}</p>
              )}
            </figcaption>
          </figure>
        </li>
      ))}
    </ul>
  );
}

/** Related-exhibits grid. `to` is passed as a router path string. */
export type RelatedExhibit = {
  to: string;
  params?: Record<string, string>;
  label: LocalizedString;
  body: LocalizedString;
};

export function RelatedExhibits({
  items,
  label,
  enterLabel,
}: {
  items: RelatedExhibit[];
  label?: LocalizedString;
  enterLabel?: LocalizedString;
}) {
  const lang = useLang();
  return (
    <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3" role="list">
      {items.map((r, i) => (
        <li key={i}>
          <Link
            to={r.to as unknown as "/"}
            params={r.params as never}
            className="block h-full rounded-2xl border border-border bg-card p-5 transition hover:-translate-y-0.5"
            style={{ boxShadow: "var(--shadow-soft)" }}
          >
            <p className="text-xs uppercase tracking-[0.22em] font-bold text-primary">
              {label ? t(label, lang) : "Related exhibit"}
            </p>
            <h3 className="mt-2 text-lg font-bold text-foreground" style={SERIF}>
              {t(r.label, lang)}
            </h3>
            <p className="mt-2 text-sm text-foreground/75 leading-[1.65]">{t(r.body, lang)}</p>
            <p className="mt-3 text-xs text-primary font-semibold">
              {enterLabel ? t(enterLabel, lang) : "Enter →"}
            </p>
          </Link>
        </li>
      ))}
    </ul>
  );
}

export type { Lang, LocalizedString };

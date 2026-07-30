/**
 * EntranceHall — the museum's opening rooms on the homepage.
 *
 * Reusable, additive sections that sit between the hero and the deeper
 * homepage content. Every section reads from `src/data/featuredExhibits.ts`
 * so adding a new flagship exhibit requires no UI edits.
 *
 * Sections exported:
 *   • <FeaturedExhibits />   — flagship grid (4–6 cards)
 *   • <ExploreByTheme />     — browse the collection by theme
 *   • <CuratorsPick />       — rotating single highlight
 *   • <LatestExhibits />     — most recently published exhibits
 */

import { Link } from "@tanstack/react-router";
import { useEffect, useMemo, useState } from "react";

import { t, useLang, type Lang } from "@/lib/i18n";
import {
  FEATURED_EXHIBITS,
  MUSEUM_THEMES,
  type ExhibitTarget,
  type FeaturedExhibit,
} from "@/data/featuredExhibits";

/* ------------------------------------------------------------------ */
/* Shared helpers                                                      */
/* ------------------------------------------------------------------ */

const CTA_ENTER = {
  en: "Enter exhibit",
  fr: "Entrer dans l'exhibition",
  ar: "ادخل المعرض",
} as const;

const CTA_ARROW = { en: "→", fr: "→", ar: "←" } as const;

/**
 * Typed <Link> for any ExhibitTarget. Kept internal so cards can be built
 * from data without leaking route strings into components.
 */
function ExhibitLink({
  target,
  className,
  children,
  ariaLabel,
}: {
  target: ExhibitTarget;
  className?: string;
  children: React.ReactNode;
  ariaLabel?: string;
}) {
  switch (target.kind) {
    case "mzab":
      return (
        <Link to="/mzab" className={className} aria-label={ariaLabel}>
          {children}
        </Link>
      );
    case "football":
      return (
        <Link to="/football" className={className} aria-label={ariaLabel}>
          {children}
        </Link>
      );
    case "region":
      return (
        <Link
          to="/region/$regionId"
          params={{ regionId: target.regionId }}
          className={className}
          aria-label={ariaLabel}
        >
          {children}
        </Link>
      );
    case "era":
      return (
        <Link
          to="/era/$eraId"
          params={{ eraId: target.eraId }}
          className={className}
          aria-label={ariaLabel}
        >
          {children}
        </Link>
      );
    case "club":
      return (
        <Link
          to="/clubs/$clubId"
          params={{ clubId: target.clubId }}
          className={className}
          aria-label={ariaLabel}
        >
          {children}
        </Link>
      );
  }
}

function SectionHeader({
  eyebrow,
  title,
  subtitle,
  align = "start",
}: {
  eyebrow: string;
  title: string;
  subtitle?: string;
  align?: "start" | "center";
}) {
  return (
    <div className={align === "center" ? "text-center max-w-2xl mx-auto" : "max-w-2xl"}>
      <div className="text-[11px] font-bold uppercase tracking-[0.2em] text-primary">
        {eyebrow}
      </div>
      <h2
        className="mt-2 text-2xl sm:text-3xl font-extrabold"
        style={{ fontFamily: "Georgia, 'Times New Roman', serif" }}
      >
        {title}
      </h2>
      {subtitle && (
        <p className="mt-3 text-sm sm:text-base text-muted-foreground leading-relaxed">
          {subtitle}
        </p>
      )}
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* 1) Featured Masterpiece Exhibits                                    */
/* ------------------------------------------------------------------ */

const FEATURED_COPY = {
  eyebrow: {
    en: "Featured exhibits",
    fr: "Expositions à l'affiche",
    ar: "معارض مختارة",
  },
  title: {
    en: "Masterpieces of the collection",
    fr: "Chefs-d'œuvre de la collection",
    ar: "روائع المجموعة",
  },
  subtitle: {
    en: "Six rooms to begin with, each one a full exhibit, told at museum pace.",
    fr: "Six salles pour commencer, chacune une exposition à part entière, racontée au rythme du musée.",
    ar: "ستّ قاعات لتبدأ منها، كلّ واحدة معرضٌ كامل يُروى بإيقاع المتحف.",
  },
};

const UNESCO_LABEL = {
  en: "UNESCO World Heritage",
  fr: "Patrimoine mondial UNESCO",
  ar: "التراث العالمي لليونسكو",
} as const;

function ExhibitCard({ exhibit, lang }: { exhibit: FeaturedExhibit; lang: Lang }) {
  return (
    <ExhibitLink
      target={exhibit.target}
      ariaLabel={t(exhibit.title, lang)}
      className="card-hover group relative flex flex-col overflow-hidden rounded-2xl border border-border bg-card/90 transition-colors hover:border-primary/40 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/40"
    >
      <div className="relative aspect-[4/3] overflow-hidden">
        <img
          src={exhibit.image}
          alt=""
          loading="lazy"
          decoding="async"
          className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-[1.03]"
        />
        <div
          className="pointer-events-none absolute inset-0"
          style={{
            background:
              "linear-gradient(180deg, transparent 45%, color-mix(in oklab, var(--background) 78%, transparent))",
          }}
          aria-hidden
        />
        <div
          className="absolute inset-x-0 top-0 h-1 opacity-70"
          style={{ background: "var(--gradient-warm)" }}
          aria-hidden
        />
        {exhibit.unesco && (
          <span className="absolute top-3 start-3 rounded-full border border-accent/40 bg-background/85 px-2.5 py-1 text-[10px] font-bold uppercase tracking-[0.14em] text-primary backdrop-blur-sm">
            {UNESCO_LABEL[lang]}
          </span>
        )}
      </div>
      <div className="flex flex-1 flex-col p-5">
        <h3
          className="text-lg font-bold tracking-tight"
          style={{ fontFamily: "Georgia, 'Times New Roman', serif" }}
        >
          {t(exhibit.title, lang)}
        </h3>
        <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
          {t(exhibit.teaser, lang)}
        </p>
        <div className="mt-4 flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.14em] text-primary opacity-80 group-hover:opacity-100 transition-opacity">
          <span>{exhibit.cta ? t(exhibit.cta, lang) : CTA_ENTER[lang]}</span>
          <span aria-hidden>{CTA_ARROW[lang]}</span>
        </div>
      </div>
    </ExhibitLink>
  );
}

/**
 * Reusable showcase grid for any list of exhibits (homepage masterpieces,
 * Museum Highlights on Explore Algeria, future collections).
 */
export function ExhibitShowcase({
  exhibits,
  eyebrow,
  title,
  subtitle,
  align = "center",
  className,
}: {
  exhibits: FeaturedExhibit[];
  eyebrow: string;
  title: string;
  subtitle?: string;
  align?: "start" | "center";
  className?: string;
}) {
  const lang = useLang();
  if (exhibits.length === 0) return null;
  return (
    <section aria-label={title} className={className}>
      <SectionHeader eyebrow={eyebrow} title={title} subtitle={subtitle} align={align} />
      <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {exhibits.map((ex) => (
          <ExhibitCard key={ex.id} exhibit={ex} lang={lang} />
        ))}
      </div>
    </section>
  );
}

export function FeaturedExhibits({ className }: { className?: string }) {
  const lang = useLang();
  return (
    <ExhibitShowcase
      exhibits={FEATURED_EXHIBITS}
      eyebrow={t(FEATURED_COPY.eyebrow, lang)}
      title={t(FEATURED_COPY.title, lang)}
      subtitle={t(FEATURED_COPY.subtitle, lang)}
      align="center"
      className={`mx-auto max-w-6xl px-4 ${className ?? ""}`}
    />
  );
}


/* ------------------------------------------------------------------ */
/* 2) Explore by theme                                                 */
/* ------------------------------------------------------------------ */

const THEME_COPY = {
  eyebrow: { en: "Explore by theme", fr: "Explorer par thème", ar: "استكشف حسب الموضوع" },
  title: {
    en: "Cross the museum by idea",
    fr: "Traverser le musée par idée",
    ar: "اعبر المتحف عبر الأفكار",
  },
  subtitle: {
    en: "Every theme threads exhibits, regions and figures around one question.",
    fr: "Chaque thème relie expositions, régions et figures autour d'une seule question.",
    ar: "كل موضوع يربط المعارض والمناطق والشخصيات حول سؤال واحد.",
  },
};

export function ExploreByTheme({ className }: { className?: string }) {
  const lang = useLang();
  return (
    <section
      aria-label={t(THEME_COPY.title, lang)}
      className={`mx-auto max-w-6xl px-4 ${className ?? ""}`}
    >
      <SectionHeader
        eyebrow={t(THEME_COPY.eyebrow, lang)}
        title={t(THEME_COPY.title, lang)}
        subtitle={t(THEME_COPY.subtitle, lang)}
      />
      <ul className="mt-6 grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4">
        {MUSEUM_THEMES.map((theme) => (
          <li key={theme.id}>
            <ThemeChip theme={theme} lang={lang} />
          </li>
        ))}
      </ul>
    </section>
  );
}

function ThemeChip({
  theme,
  lang,
}: {
  theme: (typeof MUSEUM_THEMES)[number];
  lang: Lang;
}) {
  const className =
    "card-hover group block h-full rounded-2xl border border-border bg-card/85 p-4 transition-colors hover:border-accent/60 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/40";
  const inner = (
    <>
      <div className="text-sm font-bold tracking-tight">{t(theme.title, lang)}</div>
      <div className="mt-1 text-xs text-muted-foreground leading-relaxed">
        {t(theme.hint, lang)}
      </div>
      <div className="mt-3 text-[11px] font-semibold uppercase tracking-[0.14em] text-primary opacity-70 group-hover:opacity-100 transition-opacity">
        {CTA_ARROW[lang]}
      </div>
    </>
  );
  // Themes route to a small, fixed set of known pathnames.
  switch (theme.to.pathname) {
    case "/timeline":
      return <Link to="/timeline" className={className}>{inner}</Link>;
    case "/atlas":
      return <Link to="/atlas" className={className}>{inner}</Link>;
    case "/map":
      return <Link to="/map" className={className}>{inner}</Link>;
    case "/mzab":
      return <Link to="/mzab" className={className}>{inner}</Link>;
    case "/culture":
      return <Link to="/culture" className={className}>{inner}</Link>;
    case "/cuisine":
      return <Link to="/cuisine" className={className}>{inner}</Link>;
    case "/figures":
      return <Link to="/figures" className={className}>{inner}</Link>;
    case "/football":
      return <Link to="/football" className={className}>{inner}</Link>;
    default:
      return <Link to="/" className={className}>{inner}</Link>;
  }
}

/* ------------------------------------------------------------------ */
/* 3) Curator's Pick — rotating single highlight                       */
/* ------------------------------------------------------------------ */

const PICK_COPY = {
  eyebrow: { en: "Curator's pick", fr: "Le choix du conservateur", ar: "اختيار القيّم" },
  cta: { en: "Enter this exhibit", fr: "Entrer dans cette exhibition", ar: "ادخل هذا المعرض" },
  rotates: {
    en: "A new pick surfaces each day.",
    fr: "Une nouvelle sélection remonte chaque jour.",
    ar: "يظهر اختيار جديد كل يوم.",
  },
};

export function CuratorsPick({ className }: { className?: string }) {
  const lang = useLang();
  // SSR-safe: render a stable default on server + first client render,
  // then rotate to the daily pick after mount. Prevents hydration mismatch
  // when server and client fall on different calendar days.
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);
  const pick = useMemo(() => {
    if (FEATURED_EXHIBITS.length === 0) return null;
    if (!mounted) return FEATURED_EXHIBITS[0];
    const key = new Date().toISOString().slice(0, 10);
    const seed = Number(key.replace(/-/g, "")) || 1;
    return FEATURED_EXHIBITS[seed % FEATURED_EXHIBITS.length];
  }, [mounted]);
  if (!pick) return null;

  return (
    <section
      aria-label={t(PICK_COPY.eyebrow, lang)}
      className={`mx-auto max-w-6xl px-4 ${className ?? ""}`}
    >
      <ExhibitLink
        target={pick.target}
        ariaLabel={t(pick.title, lang)}
        className="group grid gap-0 overflow-hidden rounded-3xl border border-accent/30 bg-parchment-card transition-colors hover:border-primary/40 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/40 md:grid-cols-[1.15fr_1fr]"
      >
        <div className="relative min-h-[240px] md:min-h-[360px] overflow-hidden">
          <img
            src={pick.image}
            alt=""
            loading="lazy"
            decoding="async"
            className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 group-hover:scale-[1.03]"
          />
          <div
            className="absolute inset-0"
            style={{
              background:
                "linear-gradient(90deg, transparent 40%, color-mix(in oklab, var(--background) 55%, transparent))",
            }}
            aria-hidden
          />
        </div>
        <div className="flex flex-col justify-center p-6 sm:p-8">
          <div className="text-[11px] font-bold uppercase tracking-[0.2em] text-accent-foreground/80">
            {t(PICK_COPY.eyebrow, lang)}
          </div>
          <h2
            className="mt-2 text-2xl sm:text-3xl font-extrabold leading-tight"
            style={{ fontFamily: "Georgia, 'Times New Roman', serif" }}
          >
            {t(pick.title, lang)}
          </h2>
          <p
            className="mt-3 text-base leading-relaxed text-foreground/85"
            style={{ fontFamily: "Georgia, 'Times New Roman', serif" }}
          >
            {t(pick.teaser, lang)}
          </p>
          <div className="mt-5 flex items-center gap-2 text-sm font-semibold text-primary">
            <span>{pick.cta ? t(pick.cta, lang) : t(PICK_COPY.cta, lang)}</span>
            <span aria-hidden>{CTA_ARROW[lang]}</span>
          </div>
          <div className="mt-2 text-[11px] italic text-muted-foreground/80">
            {t(PICK_COPY.rotates, lang)}
          </div>
        </div>
      </ExhibitLink>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/* 4) Latest Exhibits                                                  */
/* ------------------------------------------------------------------ */

const LATEST_COPY = {
  eyebrow: { en: "New in the museum", fr: "Nouveautés au musée", ar: "جديد في المتحف" },
  title: {
    en: "Latest exhibits",
    fr: "Dernières expositions",
    ar: "أحدث المعارض",
  },
  subtitle: {
    en: "Recently opened rooms, return often, the collection keeps growing.",
    fr: "Salles récemment ouvertes, revenez souvent, la collection grandit.",
    ar: "قاعات افتُتحت مؤخّرًا، عُدْ كثيرًا، فالمجموعة تنمو.",
  },
  openedOn: {
    en: (d: string) => `Opened ${d}`,
    fr: (d: string) => `Ouvert le ${d}`,
    ar: (d: string) => `افتُتح في ${d}`,
  },
};

function formatDate(iso: string, lang: Lang): string {
  try {
    const d = new Date(iso);
    const locale = lang === "fr" ? "fr-FR" : lang === "ar" ? "ar" : "en-US";
    return d.toLocaleDateString(locale, { year: "numeric", month: "long" });
  } catch {
    return iso;
  }
}

export function LatestExhibits({
  count = 3,
  className,
}: {
  count?: number;
  className?: string;
}) {
  const lang = useLang();
  const latest = useMemo(
    () =>
      [...FEATURED_EXHIBITS]
        .sort((a, b) => (a.publishedAt < b.publishedAt ? 1 : -1))
        .slice(0, count),
    [count],
  );

  return (
    <section
      aria-label={t(LATEST_COPY.title, lang)}
      className={`mx-auto max-w-6xl px-4 ${className ?? ""}`}
    >
      <SectionHeader
        eyebrow={t(LATEST_COPY.eyebrow, lang)}
        title={t(LATEST_COPY.title, lang)}
        subtitle={t(LATEST_COPY.subtitle, lang)}
      />
      <ul className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {latest.map((ex) => (
          <li key={ex.id}>
            <ExhibitLink
              target={ex.target}
              ariaLabel={t(ex.title, lang)}
              className="card-hover group flex items-stretch gap-4 rounded-2xl border border-border bg-card/85 p-3 transition-colors hover:border-accent/60 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/40"
            >
              <div className="relative h-24 w-28 shrink-0 overflow-hidden rounded-xl">
                <img
                  src={ex.image}
                  alt=""
                  loading="lazy"
                  decoding="async"
                  className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-[1.05]"
                />
              </div>
              <div className="flex min-w-0 flex-col justify-center">
                <div className="text-[10px] font-bold uppercase tracking-[0.16em] text-primary/80">
                  {LATEST_COPY.openedOn[lang](formatDate(ex.publishedAt, lang))}
                </div>
                <h3
                  className="mt-1 truncate text-base font-bold"
                  style={{ fontFamily: "Georgia, 'Times New Roman', serif" }}
                >
                  {t(ex.title, lang)}
                </h3>
                <p className="mt-1 line-clamp-2 text-xs leading-relaxed text-muted-foreground">
                  {t(ex.teaser, lang)}
                </p>
              </div>
            </ExhibitLink>
          </li>
        ))}
      </ul>
    </section>
  );
}

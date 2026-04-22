import { createFileRoute, Link } from "@tanstack/react-router";
import { Header } from "@/components/Header";
import { dailyFacts } from "@/data/eras";
import { t, tu, useLang } from "@/lib/i18n";
import brandCover from "@/assets/brand-cover.png";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Algeria Through Time — A Fun History Journey" },
      {
        name: "description",
        content:
          "Explore the rich history of Algeria from Numidia to independence. Learn through stories, quizzes, and badges.",
      },
      { property: "og:title", content: "Algeria Through Time" },
      {
        property: "og:description",
        content: "A playful journey through 2,000+ years of Algerian history.",
      },
    ],
  }),
  component: Home,
});

function Home() {
  const lang = useLang();
  const fact = dailyFacts[new Date().getDate() % dailyFacts.length];

  const momentsLabel =
    lang === "fr"
      ? "Mémoire & identité"
      : lang === "ar"
        ? "ذاكرة وهوية"
        : "Memory & identity";
  const momentsTitle =
    lang === "fr"
      ? "Moments qui ont façonné l'Algérie"
      : lang === "ar"
        ? "لحظات صنعت الجزائر"
        : "Moments That Shaped Algeria";
  const momentsDesc =
    lang === "fr"
      ? "Tafsut Imazighen (1980) & Décennie Noire (1990s)."
      : lang === "ar"
        ? "تافسوت إمازيغن (1980) والعشرية السوداء."
        : "Tafsut Imazighen (1980) & the Black Decade.";
  const discover =
    lang === "fr" ? "Découvrir" : lang === "ar" ? "اكتشف" : "Discover";

  const tiles = [
    {
      to: "/timeline" as const,
      icon: "📜",
      title: tu("fiveEras", lang),
      desc: tu("fiveErasDesc", lang),
      tint: "var(--primary)",
    },
    {
      to: "/timeline" as const,
      icon: "🎯",
      title: tu("funQuizzes", lang),
      desc: tu("funQuizzesDesc", lang),
      tint: "var(--accent)",
    },
    {
      to: "/figures" as const,
      icon: "👤",
      title: tu("homeFiguresTitle", lang),
      desc: tu("homeFiguresDesc", lang),
      tint: "var(--secondary)",
    },
    {
      to: "/figures/quiz" as const,
      icon: "🕵️",
      title: tu("guessTheFigure", lang),
      desc: tu("guessTheFigureDesc", lang),
      tint: "var(--primary)",
    },
  ];

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1 px-4 py-4 sm:py-6 lg:py-4 lg:overflow-hidden">
        <div className="max-w-6xl mx-auto h-full flex flex-col gap-4 lg:gap-3">
          {/* Hero — compact */}
          <section
            className="rounded-2xl px-4 py-4 sm:px-6 sm:py-5 flex items-center gap-4 sm:gap-6 animate-float-up"
            style={{
              background: "var(--gradient-hero)",
              boxShadow: "var(--shadow-soft)",
            }}
          >
            <img
              src={brandCover}
              alt="Algeria Through Time"
              className="w-20 h-20 sm:w-24 sm:h-24 lg:w-28 lg:h-28 rounded-2xl object-cover shrink-0"
              style={{ boxShadow: "var(--shadow-gold-glow)" }}
            />
            <div className="flex-1 min-w-0">
              <h1 className="text-lg sm:text-2xl lg:text-2xl font-extrabold leading-tight">
                {lang === "fr"
                  ? "L'Algérie à travers le temps"
                  : lang === "ar"
                    ? "الجزائر عبر الزمن"
                    : "Algeria Through Time"}
              </h1>
              <p className="text-xs sm:text-sm text-muted-foreground mt-1 line-clamp-2">
                {lang === "fr"
                  ? "Un voyage ludique à travers 2 000 ans d'histoire."
                  : lang === "ar"
                    ? "رحلة ممتعة عبر أكثر من 2000 سنة من التاريخ."
                    : "A playful journey through 2,000+ years of history."}
              </p>
            </div>
            <Link
              to="/timeline"
              className="hidden sm:inline-flex shrink-0 px-5 py-3 rounded-xl text-sm font-bold text-primary-foreground transition-transform hover:scale-105 active:scale-95"
              style={{
                background: "var(--gradient-warm)",
                boxShadow: "var(--shadow-glow)",
              }}
            >
              {tu("startJourney", lang)}
            </Link>
          </section>

          {/* Mobile-only Start CTA */}
          <Link
            to="/timeline"
            className="sm:hidden px-5 py-3 rounded-xl text-sm font-bold text-primary-foreground text-center transition-transform active:scale-95"
            style={{
              background: "var(--gradient-warm)",
              boxShadow: "var(--shadow-glow)",
            }}
          >
            {tu("startJourney", lang)}
          </Link>

          {/* 2x2 grid of main actions */}
          <section className="grid grid-cols-2 gap-3 lg:gap-3 lg:flex-1 lg:min-h-0">
            {tiles.map((tile) => (
              <Link
                key={tile.title}
                to={tile.to}
                className="group rounded-2xl bg-card border border-border p-4 lg:p-4 flex flex-col justify-between hover:border-primary/40 hover:-translate-y-0.5 transition relative overflow-hidden"
                style={{ boxShadow: "var(--shadow-soft)" }}
              >
                <div
                  className="absolute -right-4 -top-4 text-6xl opacity-10 select-none pointer-events-none"
                  aria-hidden
                >
                  {tile.icon}
                </div>
                <div className="relative">
                  <div
                    className="inline-flex items-center justify-center w-9 h-9 rounded-xl text-xl mb-2"
                    style={{
                      background: `color-mix(in oklab, ${tile.tint} 15%, transparent)`,
                    }}
                  >
                    {tile.icon}
                  </div>
                  <h3 className="font-bold text-sm sm:text-base leading-tight">
                    {tile.title}
                  </h3>
                  <p className="text-xs text-muted-foreground mt-1 line-clamp-2">
                    {tile.desc}
                  </p>
                </div>
                <div className="mt-2 text-xs font-semibold text-primary group-hover:underline relative">
                  →
                </div>
              </Link>
            ))}
          </section>

          {/* Full-width Moments card */}
          <Link
            to="/moments"
            className="rounded-2xl px-4 py-3 sm:px-5 sm:py-4 border border-secondary/40 hover:border-secondary transition group relative overflow-hidden flex items-center gap-3"
            style={{
              background:
                "linear-gradient(135deg, color-mix(in oklab, var(--secondary) 18%, var(--card)), var(--card))",
              boxShadow: "var(--shadow-soft)",
            }}
          >
            <div
              className="absolute -right-4 -top-4 text-6xl opacity-10 select-none pointer-events-none"
              aria-hidden
            >
              ⵣ
            </div>
            <div className="text-2xl shrink-0">🕊️</div>
            <div className="min-w-0 flex-1 relative">
              <div className="text-[10px] font-bold uppercase tracking-wider text-secondary">
                {momentsLabel}
              </div>
              <h3 className="font-bold text-sm sm:text-base leading-tight truncate">
                {momentsTitle}
              </h3>
              <p className="text-xs text-muted-foreground line-clamp-1">
                {momentsDesc}
              </p>
            </div>
            <div className="text-xs font-semibold text-secondary shrink-0 group-hover:underline relative">
              {discover} →
            </div>
          </Link>

          {/* Compact Did You Know bar */}
          <div
            className="rounded-2xl px-4 py-2.5 border border-accent/40 flex items-center gap-3"
            style={{
              backgroundColor:
                "color-mix(in oklab, var(--accent) 18%, var(--card))",
              boxShadow: "var(--shadow-soft)",
            }}
          >
            <div className="text-xl shrink-0">💡</div>
            <div className="min-w-0 flex-1">
              <span className="text-[10px] font-bold uppercase tracking-wider text-accent-foreground/80 mr-2">
                {tu("didYouKnow", lang)}
              </span>
              <span className="text-xs sm:text-sm text-foreground font-medium line-clamp-2 sm:line-clamp-1">
                {t(fact, lang)}
              </span>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

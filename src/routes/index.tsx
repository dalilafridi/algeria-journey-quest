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

  const heroTitle =
    lang === "fr"
      ? "L'Algérie à travers le temps"
      : lang === "ar"
        ? "الجزائر عبر الزمن"
        : "Algeria Through Time";
  const heroSubtitle =
    lang === "fr"
      ? "Un voyage ludique à travers 2 000 ans d'histoire — des rois numides à l'indépendance."
      : lang === "ar"
        ? "رحلة ممتعة عبر أكثر من 2000 سنة من التاريخ — من ملوك نوميديا إلى الاستقلال."
        : "A playful journey through 2,000+ years of history — from Numidian kings to independence.";

  return (
    <div className="h-screen flex flex-col overflow-hidden">
      <Header />
      <main className="flex-1 px-3 sm:px-4 py-3 lg:py-3 lg:overflow-hidden overflow-y-auto">
        <div className="max-w-6xl mx-auto h-full flex flex-col gap-3 lg:gap-3">
          {/* Hero — horizontal split: image LEFT (60%), content RIGHT (40%) */}
          <section
            className="rounded-2xl overflow-hidden animate-float-up grid grid-cols-1 lg:grid-cols-5 gap-0 lg:flex-[1.4] lg:min-h-0"
            style={{
              background: "var(--gradient-hero)",
              boxShadow: "var(--shadow-soft)",
            }}
          >
            {/* LEFT — dominant image (60% on desktop) */}
            <div className="lg:col-span-3 relative h-48 sm:h-64 lg:h-full p-3 lg:p-4">
              <img
                src={brandCover}
                alt="Algeria Through Time"
                className="w-full h-full rounded-xl object-cover"
                style={{ boxShadow: "var(--shadow-gold-glow)" }}
              />
            </div>

            {/* RIGHT — title, subtitle, CTA, badges (40% on desktop) */}
            <div className="lg:col-span-2 flex flex-col justify-center gap-3 px-4 pb-4 lg:px-5 lg:py-5">
              <div>
                <h1 className="text-xl sm:text-3xl lg:text-3xl xl:text-4xl font-extrabold leading-tight">
                  {heroTitle}
                </h1>
                <p className="text-xs sm:text-sm text-muted-foreground mt-2 line-clamp-3">
                  {heroSubtitle}
                </p>
              </div>

              <Link
                to="/timeline"
                className="inline-flex items-center justify-center px-5 py-3 rounded-xl text-sm font-bold text-primary-foreground transition-transform hover:scale-[1.02] active:scale-95 self-start"
                style={{
                  background: "var(--gradient-warm)",
                  boxShadow: "var(--shadow-glow)",
                }}
              >
                {tu("startJourney", lang)} →
              </Link>

              {/* Info badges */}
              <div className="flex flex-wrap gap-1.5 pt-1">
                <span className="px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider bg-primary/10 text-primary border border-primary/20">
                  {lang === "fr" ? "🌐 3 langues" : lang === "ar" ? "🌐 3 لغات" : "🌐 3 Languages"}
                </span>
                <span className="px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider bg-secondary/10 text-secondary border border-secondary/20">
                  {lang === "fr" ? "🏆 Niveaux & XP" : lang === "ar" ? "🏆 مستويات و XP" : "🏆 Levels & XP"}
                </span>
                <span className="px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider bg-accent/20 text-accent-foreground border border-accent/30">
                  {lang === "fr" ? "📜 5 ères" : lang === "ar" ? "📜 5 عصور" : "📜 5 Eras"}
                </span>
              </div>
            </div>
          </section>

          {/* 2x2 grid of main actions */}
          <section className="grid grid-cols-2 gap-2.5 lg:gap-2.5 lg:flex-1 lg:min-h-0">
            {tiles.map((tile) => (
              <Link
                key={tile.title}
                to={tile.to}
                className="group rounded-2xl bg-card border border-border p-3 lg:p-3 flex flex-col justify-between hover:border-primary/40 hover:-translate-y-0.5 transition relative overflow-hidden"
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
            className="rounded-2xl px-4 py-2.5 sm:px-5 sm:py-3 border border-secondary/40 hover:border-secondary transition group relative overflow-hidden flex items-center gap-3"
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
            className="rounded-2xl px-4 py-2 border border-accent/40 flex items-center gap-3"
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

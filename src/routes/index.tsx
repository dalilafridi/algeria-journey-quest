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

  return (
    <div className="min-h-screen">
      <Header />
      <main
        className="px-4 py-12 sm:py-20"
        style={{ background: "var(--gradient-hero)" }}
      >
        <div className="max-w-3xl mx-auto text-center animate-float-up">
          <div className="flex justify-center mb-6">
            <img
              src={brandCover}
              alt="Algeria Through Time"
              className="w-56 sm:w-72 h-auto rounded-3xl"
              style={{ boxShadow: "var(--shadow-gold-glow)" }}
            />
          </div>
          <Link
            to="/timeline"
            className="inline-block mt-8 px-8 py-4 rounded-2xl text-lg font-bold text-primary-foreground transition-transform hover:scale-105 active:scale-95"
            style={{ background: "var(--gradient-warm)", boxShadow: "var(--shadow-glow)" }}
          >
            {tu("startJourney", lang)}
          </Link>
        </div>
      </main>

      <section className="max-w-3xl mx-auto px-4 py-12 grid sm:grid-cols-3 gap-4">
        {[
          { icon: "📜", title: tu("fiveEras", lang), desc: tu("fiveErasDesc", lang) },
          { icon: "🎯", title: tu("funQuizzes", lang), desc: tu("funQuizzesDesc", lang) },
          { icon: "🏆", title: tu("earnBadges", lang), desc: tu("earnBadgesDesc", lang) },
        ].map((f) => (
          <div
            key={f.title}
            className="card-hover rounded-2xl bg-card p-5 text-center border border-border"
            style={{ boxShadow: "var(--shadow-soft)" }}
          >
            <div className="text-3xl mb-2">{f.icon}</div>
            <h3 className="font-bold">{f.title}</h3>
            <p className="text-sm text-muted-foreground mt-1 leading-relaxed">{f.desc}</p>
          </div>
        ))}
      </section>

      <section className="max-w-3xl mx-auto px-4 pb-4 grid sm:grid-cols-2 gap-4">
        <Link
          to="/figures"
          className="card-hover rounded-2xl bg-card p-5 border border-border hover:border-primary/40 transition-colors group"
          style={{ boxShadow: "var(--shadow-soft)" }}
        >
          <div className="text-3xl mb-2">👤</div>
          <h3 className="font-bold">{tu("homeFiguresTitle", lang)}</h3>
          <p className="text-sm text-muted-foreground">{tu("homeFiguresDesc", lang)}</p>
          <div className="mt-3 text-sm font-semibold text-primary group-hover:underline">
            {tu("exploreFigures", lang)} →
          </div>
        </Link>
        <Link
          to="/figures/quiz"
          className="card-hover rounded-2xl bg-card p-5 border border-border hover:border-primary/40 transition-colors group"
          style={{ boxShadow: "var(--shadow-soft)" }}
        >
          <div className="text-3xl mb-2">🕵️</div>
          <h3 className="font-bold">{tu("guessTheFigure", lang)}</h3>
          <p className="text-sm text-muted-foreground">{tu("guessTheFigureDesc", lang)}</p>
          <div className="mt-3 text-sm font-semibold text-primary group-hover:underline">
            {tu("startGuessQuiz", lang)} →
          </div>
        </Link>
        <Link
          to="/lessons"
          className="card-hover rounded-2xl bg-card p-5 border border-border hover:border-primary/40 transition-colors group"
          style={{ boxShadow: "var(--shadow-soft)" }}
        >
          <div className="text-3xl mb-2">⏱️</div>
          <h3 className="font-bold">{tu("oneMinuteLesson", lang)}</h3>
          <p className="text-sm text-muted-foreground">{tu("lessonsHomeDesc", lang)}</p>
          <div className="mt-3 text-sm font-semibold text-primary group-hover:underline">
            {tu("lessons", lang)} →
          </div>
        </Link>
        <Link
          to="/map"
          className="card-hover rounded-2xl bg-card p-5 border border-border hover:border-primary/40 transition-colors group"
          style={{ boxShadow: "var(--shadow-soft)" }}
        >
          <div className="text-3xl mb-2">🗺️</div>
          <h3 className="font-bold">{tu("mapExplorer", lang)}</h3>
          <p className="text-sm text-muted-foreground">{tu("mapExplorerDesc", lang)}</p>
          <div className="mt-3 text-sm font-semibold text-primary group-hover:underline">
            {tu("mapExplorer", lang)} →
          </div>
        </Link>
      </section>

      <section className="max-w-3xl mx-auto px-4 pb-4">
        <Link
          to="/moments"
          className="block rounded-2xl p-5 sm:p-6 border border-secondary/40 hover:border-secondary transition group relative overflow-hidden"
          style={{
            background:
              "linear-gradient(135deg, color-mix(in oklab, var(--secondary) 18%, var(--card)), var(--card))",
            boxShadow: "var(--shadow-soft)",
          }}
        >
          <div
            className="absolute -right-6 -top-6 text-7xl opacity-10 select-none pointer-events-none"
            aria-hidden
          >
            ⵣ
          </div>
          <div className="flex items-start gap-3 relative">
            <div className="text-3xl">🕊️</div>
            <div className="min-w-0">
              <div className="text-[11px] font-bold uppercase tracking-wider text-secondary mb-1">
                {lang === "fr"
                  ? "Mémoire & identité"
                  : lang === "ar"
                    ? "ذاكرة وهوية"
                    : "Memory & identity"}
              </div>
              <h3 className="font-bold text-lg">
                {lang === "fr"
                  ? "Moments qui ont façonné l'Algérie"
                  : lang === "ar"
                    ? "لحظات صنعت الجزائر"
                    : "Moments That Shaped Algeria"}
              </h3>
              <p className="text-sm text-muted-foreground mt-1">
                {lang === "fr"
                  ? "Tafsut Imazighen (1980) et la Décennie Noire (1990s), racontés avec douceur."
                  : lang === "ar"
                    ? "تافسوت إمازيغن (1980) والعشرية السوداء (التسعينيات)، بأسلوب لطيف."
                    : "Tafsut Imazighen (1980) and the Black Decade (1990s), told with care."}
              </p>
              <div className="mt-3 text-sm font-semibold text-secondary group-hover:underline">
                {lang === "fr"
                  ? "Découvrir"
                  : lang === "ar"
                    ? "اكتشف"
                    : "Discover"}{" "}
                →
              </div>
            </div>
          </div>
        </Link>
      </section>

      <section className="max-w-3xl mx-auto px-4 pb-16">
        <div
          className="rounded-2xl p-6 border border-accent/40"
          style={{
            background: "linear-gradient(135deg, var(--accent) / 0.15, transparent)",
            backgroundColor: "color-mix(in oklab, var(--accent) 18%, var(--card))",
            boxShadow: "var(--shadow-soft)",
          }}
        >
          <div className="flex items-start gap-3">
            <div className="text-3xl">💡</div>
            <div>
              <div className="text-xs font-bold uppercase tracking-wider text-accent-foreground/80">
                {tu("didYouKnow", lang)}
              </div>
              <p className="mt-1 text-foreground font-medium">{t(fact, lang)}</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

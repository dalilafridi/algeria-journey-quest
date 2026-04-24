import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
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
  const [showPaths, setShowPaths] = useState(false);

  const copy = {
    title: {
      en: "Explore Algeria Through Time",
      fr: "Explorez l’Algérie à travers le temps",
      ar: "اكتشف الجزائر عبر الزمن",
    },
    subtitle: {
      en: "A calm passage through memory, land, language and the people who carried them forward.",
      fr: "Un passage calme à travers la mémoire, les terres, la langue et celles et ceux qui les ont portées.",
      ar: "عبور هادئ عبر الذاكرة والأرض واللغة ومن حملوها إلى الأمام.",
    },
    regions: { en: "Discover the Regions", fr: "Découvrir les régions", ar: "اكتشف المناطق" },
    culture: { en: "Explore Culture", fr: "Explorer la culture", ar: "استكشف الثقافة" },
    choosePath: { en: "Choose your path", fr: "Choisissez votre parcours", ar: "اختر مسارك" },
    paths: [
      {
        icon: "📜",
        title: { en: "History Journey", fr: "Voyage historique", ar: "رحلة التاريخ" },
        desc: { en: "Follow the main story from education and identity to independence.", fr: "Suivez le récit principal, de l’éducation et l’identité à l’indépendance.", ar: "اتبع الحكاية الأساسية من التعليم والهوية إلى الاستقلال." },
        to: "/timeline" as const,
      },
      {
        icon: "🎬",
        title: { en: "Cultural Journey", fr: "Voyage culturel", ar: "رحلة ثقافية" },
        desc: { en: "Enter through words, cinema, music and identity.", fr: "Entrez par les paroles, le cinéma, la musique et l’identité.", ar: "ادخل عبر الكلمات والسينما والموسيقى والهوية." },
        to: "/words" as const,
      },
      {
        icon: "🏔️",
        title: { en: "Explore Algeria", fr: "Explorer l’Algérie", ar: "استكشف الجزائر" },
        desc: { en: "Travel region by region through places, figures and living memory.", fr: "Voyagez région par région à travers les lieux, les figures et la mémoire vivante.", ar: "سافر منطقةً بمنطقة عبر الأماكن والشخصيات والذاكرة الحية." },
        to: "/map" as const,
      },
    ],
  };

  return (
    <div className="min-h-screen">
      <Header />
      <main
        className="px-4 py-10 sm:py-16"
        style={{ background: "var(--gradient-hero)" }}
      >
        <div className="max-w-4xl mx-auto text-center animate-float-up">
          <div className="flex justify-center mb-6">
            <img
              src={brandCover}
              alt="Algeria Through Time"
              className="w-56 sm:w-72 h-auto rounded-3xl"
              style={{ boxShadow: "var(--shadow-gold-glow)" }}
            />
          </div>
          <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-foreground">
            {copy.title[lang]}
          </h1>
          <p className="mx-auto mt-4 text-base sm:text-lg text-foreground/80 leading-relaxed">
            {copy.subtitle[lang]}
          </p>
          <div className="mt-8 grid gap-3 sm:grid-cols-3">
            <button
              type="button"
              onClick={() => setShowPaths((v) => !v)}
              className="px-5 py-4 rounded-2xl text-base font-bold text-primary-foreground transition-transform hover:scale-[1.02] active:scale-95"
              style={{ background: "var(--gradient-warm)", boxShadow: "var(--shadow-glow)" }}
            >
              {tu("startJourney", lang)}
            </button>
            <Link
              to="/map"
              className="px-5 py-4 rounded-2xl text-base font-bold bg-card text-foreground border border-border hover:border-primary/40 transition-colors"
              style={{ boxShadow: "var(--shadow-soft)" }}
            >
              {copy.regions[lang]}
            </Link>
            <Link
              to="/words"
              className="px-5 py-4 rounded-2xl text-base font-bold bg-card/80 text-foreground border border-border hover:border-secondary/50 transition-colors"
            >
              {copy.culture[lang]}
            </Link>
          </div>

          {showPaths && (
            <section className="mt-6 text-left animate-float-up" aria-label={copy.choosePath[lang]}>
              <div className="text-center text-xs font-bold uppercase tracking-wider text-muted-foreground mb-3">
                {copy.choosePath[lang]}
              </div>
              <div className="grid gap-3 sm:grid-cols-3">
                {copy.paths.map((path) => (
                  <Link
                    key={path.to}
                    to={path.to}
                    className="rounded-2xl border border-border bg-card/90 p-4 hover:border-primary/40 transition card-hover"
                    style={{ boxShadow: "var(--shadow-soft)" }}
                  >
                    <div className="text-2xl" aria-hidden>{path.icon}</div>
                    <h2 className="mt-2 font-bold text-base">{t(path.title, lang)}</h2>
                    <p className="mt-1 text-sm text-muted-foreground leading-relaxed">{t(path.desc, lang)}</p>
                  </Link>
                ))}
              </div>
            </section>
          )}
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

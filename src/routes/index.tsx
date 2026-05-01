import { createFileRoute, Link } from "@tanstack/react-router";
import { ContinueJourneyCard } from "@/components/ContinueJourneyCard";
import { DidYouKnowCard } from "@/components/DidYouKnowCard";
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
    explore: { en: "Explore", fr: "Explorer", ar: "استكشف" },
    featuredStory: { en: "Featured Story", fr: "Récit à découvrir", ar: "قصة مختارة" },
    featuredTitle: {
      en: "A journey through memory, identity and independence",
      fr: "Un voyage entre mémoire, identité et indépendance",
      ar: "رحلة عبر الذاكرة والهوية والاستقلال",
    },
    featuredDesc: {
      en: "Begin with the main historical path, then branch into regions, figures and culture at your own pace.",
      fr: "Commencez par le parcours historique principal, puis explorez les régions, les figures et la culture à votre rythme.",
      ar: "ابدأ بالمسار التاريخي الرئيسي، ثم انتقل إلى المناطق والشخصيات والثقافة حسب وتيرتك.",
    },
    regionsPreview: { en: "Regions Preview", fr: "Aperçu des régions", ar: "لمحة عن المناطق" },
    culturePreview: { en: "Culture Preview", fr: "Aperçu culturel", ar: "لمحة ثقافية" },
    footer: {
      en: "Algeria Through Time — a calm cultural journey through land, memory and language.",
      fr: "Algeria Through Time — un voyage culturel paisible entre terres, mémoire et langue.",
      ar: "Algeria Through Time — رحلة ثقافية هادئة عبر الأرض والذاكرة واللغة.",
    },
    entries: [
      {
        icon: "📜",
        title: { en: "History", fr: "Histoire", ar: "التاريخ" },
        desc: { en: "Follow Algeria’s story through eras, moments and independence.", fr: "Suivez l’histoire de l’Algérie à travers les époques, les moments et l’indépendance.", ar: "اتبع حكاية الجزائر عبر العصور واللحظات والاستقلال." },
        to: "/timeline" as const,
      },
      {
        icon: "🏔️",
        title: { en: "Regions", fr: "Régions", ar: "المناطق" },
        desc: { en: "Travel across places, landscapes and local memory.", fr: "Parcourez les lieux, les paysages et les mémoires locales.", ar: "تنقّل بين الأماكن والمناظر والذاكرة المحلية." },
        to: "/map" as const,
      },
      {
        icon: "🎬",
        title: { en: "Culture", fr: "Culture", ar: "الثقافة" },
        desc: { en: "Enter through words, cinema, ideas and living identity.", fr: "Entrez par les mots, le cinéma, les idées et l’identité vivante.", ar: "ادخل عبر الكلمات والسينما والأفكار والهوية الحية." },
        to: "/words" as const,
      },
    ],
    regionLinks: [
      { icon: "🗺️", title: { en: "Region Explorer", fr: "Explorateur des régions", ar: "مستكشف المناطق" }, to: "/map" as const },
      { icon: "👤", title: { en: "Great Figures", fr: "Grandes figures", ar: "شخصيات بارزة" }, to: "/figures" as const },
      { icon: "🕊️", title: { en: "Shaping Moments", fr: "Moments fondateurs", ar: "لحظات مؤسسة" }, to: "/moments" as const },
    ],
    cultureLinks: [
      { icon: "💬", title: { en: "Words & Ideas", fr: "Mots & idées", ar: "كلمات وأفكار" }, to: "/words" as const },
      { icon: "🎬", title: { en: "Cinema & Film", fr: "Cinéma & film", ar: "السينما والفيلم" }, to: "/figures" as const },
      { icon: "⏱️", title: { en: "One-Minute Lessons", fr: "Leçons d’une minute", ar: "دروس دقيقة واحدة" }, to: "/lessons" as const },
    ],
  };

  return (
    <div className="min-h-screen">
      <Header />
      <main style={{ background: "var(--gradient-hero)" }}>
        <section className="px-4 pt-10 pb-8 sm:pt-16 sm:pb-10">
          <div className="mx-auto max-w-5xl text-center animate-float-up">
            <div className="flex justify-center mb-6">
              <img
                src={brandCover}
                alt="Algeria Through Time"
                className="w-44 sm:w-60 h-auto rounded-3xl"
                style={{ boxShadow: "var(--shadow-gold-glow)" }}
              />
            </div>
            <h1 className="mx-auto max-w-3xl text-3xl sm:text-5xl font-extrabold tracking-tight text-foreground">
              {copy.title[lang]}
            </h1>
            <p className="mx-auto mt-4 max-w-2xl text-base sm:text-lg text-foreground/80 leading-relaxed">
              {copy.subtitle[lang]}
            </p>
            <div className="mx-auto mt-8 flex max-w-md flex-col gap-3 sm:flex-row sm:justify-center">
              <Link
                to="/timeline"
                className="rounded-2xl px-6 py-4 text-base font-bold text-primary-foreground transition-transform hover:scale-[1.02] active:scale-95"
                style={{ background: "var(--gradient-warm)", boxShadow: "var(--shadow-glow)" }}
              >
                {tu("startJourney", lang)}
              </Link>
              <Link
                to="/map"
                className="rounded-2xl border border-border bg-card/85 px-6 py-4 text-base font-bold text-foreground transition-colors hover:border-primary/40"
                style={{ boxShadow: "var(--shadow-soft)" }}
              >
                {copy.explore[lang]}
              </Link>
            </div>
          </div>
        </section>

        <ContinueJourneyCard />

        <section className="mx-auto max-w-5xl px-4 py-8 sm:py-10">
          <div className="grid gap-4 sm:grid-cols-3">
            {copy.entries.map((entry) => (
              <Link
                key={entry.to}
                to={entry.to}
                className="card-hover rounded-2xl border border-border bg-card/90 p-5 text-center transition-colors hover:border-primary/40"
                style={{ boxShadow: "var(--shadow-soft)" }}
              >
                <div className="text-3xl" aria-hidden>{entry.icon}</div>
                <h2 className="mt-3 text-lg font-bold">{t(entry.title, lang)}</h2>
                <p className="mx-auto mt-2 text-sm leading-relaxed text-muted-foreground">{t(entry.desc, lang)}</p>
              </Link>
            ))}
          </div>
        </section>

        <section className="mx-auto max-w-5xl px-4 pb-8 sm:pb-10">
          <Link
            to="/timeline"
            className="group block overflow-hidden rounded-3xl border border-secondary/40 bg-card/90 p-6 transition-colors hover:border-secondary sm:p-8"
            style={{ boxShadow: "var(--shadow-soft)" }}
          >
            <div className="grid gap-5 sm:grid-cols-[1fr_auto] sm:items-center">
              <div>
                <div className="text-xs font-bold uppercase tracking-wider text-secondary">
                  {copy.featuredStory[lang]}
                </div>
                <h2 className="mt-2 max-w-2xl text-2xl font-extrabold sm:text-3xl">
                  {copy.featuredTitle[lang]}
                </h2>
                <p className="mt-3 text-sm leading-relaxed text-muted-foreground sm:text-base">
                  {copy.featuredDesc[lang]}
                </p>
              </div>
              <div className="flex h-20 w-20 items-center justify-center rounded-3xl bg-muted text-4xl transition-transform group-hover:scale-105" aria-hidden>
                🕊️
              </div>
            </div>
          </Link>
        </section>

        <section className="mx-auto grid max-w-5xl gap-4 px-4 pb-8 sm:grid-cols-2 sm:pb-10">
          <div className="rounded-3xl border border-border bg-card/85 p-5 sm:p-6" style={{ boxShadow: "var(--shadow-soft)" }}>
            <div className="mb-4 flex items-center justify-between gap-3">
              <h2 className="text-xl font-extrabold">{copy.regionsPreview[lang]}</h2>
              <Link to="/map" className="text-sm font-bold text-primary hover:underline">
                {copy.regions[lang]} →
              </Link>
            </div>
            <div className="grid gap-3">
              {copy.regionLinks.map((item) => (
                <Link
                  key={item.to}
                  to={item.to}
                  className="flex items-center gap-3 rounded-2xl border border-border bg-background/45 p-3 transition-colors hover:border-primary/40"
                >
                  <span className="text-2xl" aria-hidden>{item.icon}</span>
                  <span className="font-semibold">{t(item.title, lang)}</span>
                </Link>
              ))}
            </div>
          </div>

          <div className="rounded-3xl border border-border bg-card/85 p-5 sm:p-6" style={{ boxShadow: "var(--shadow-soft)" }}>
            <div className="mb-4 flex items-center justify-between gap-3">
              <h2 className="text-xl font-extrabold">{copy.culturePreview[lang]}</h2>
              <Link to="/words" className="text-sm font-bold text-primary hover:underline">
                {copy.culture[lang]} →
              </Link>
            </div>
            <div className="grid gap-3">
              {copy.cultureLinks.map((item) => (
                <Link
                  key={`${item.to}-${t(item.title, lang)}`}
                  to={item.to}
                  className="flex items-center gap-3 rounded-2xl border border-border bg-background/45 p-3 transition-colors hover:border-primary/40"
                >
                  <span className="text-2xl" aria-hidden>{item.icon}</span>
                  <span className="font-semibold">{t(item.title, lang)}</span>
                </Link>
              ))}
            </div>
          </div>
        </section>

        <section className="mx-auto max-w-5xl px-4 pb-12 sm:pb-16">
          <DidYouKnowCard fact={fact} />
        </section>
      </main>

      <footer className="border-t border-border bg-card/70 px-4 py-8 text-center">
        <p className="mx-auto max-w-2xl text-sm text-muted-foreground">{copy.footer[lang]}</p>
      </footer>
    </div>
  );
}

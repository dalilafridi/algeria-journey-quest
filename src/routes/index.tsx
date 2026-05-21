import { createFileRoute, Link } from "@tanstack/react-router";

import { DidYouKnowCard } from "@/components/DidYouKnowCard";
import { Header } from "@/components/Header";
import { dailyFacts, eras } from "@/data/eras";
import { t, tu, useLang } from "@/lib/i18n";
import brandCover from "@/assets/brand-cover.png";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Algeria Through Time — A Cinematic Journey Through Algerian History" },
      {
        name: "description",
        content:
          "A calm, museum-style passage through Algeria — its eras, regions, figures and culture, from Numidia to independence.",
      },
      { property: "og:title", content: "Algeria Through Time" },
      {
        property: "og:description",
        content: "A cinematic journey through 2,000+ years of Algerian memory.",
      },
    ],
  }),
  component: Home,
});

function Home() {
  const lang = useLang();
  // Deterministic daily pick — same all day, rotates next day.
  const todayKey = new Date().toISOString().slice(0, 10);
  const seed = Number(todayKey.replace(/-/g, "")) || Date.now();
  const todayFact = dailyFacts[seed % dailyFacts.length];
  const homepageFact = dailyFacts[(seed + 7) % dailyFacts.length];

  const copy = {
    eyebrow: {
      en: "A digital museum of Algerian memory",
      fr: "Un musée numérique de la mémoire algérienne",
      ar: "متحف رقمي للذاكرة الجزائرية",
    },
    title: {
      en: "Algeria, through time",
      fr: "L’Algérie, à travers le temps",
      ar: "الجزائر، عبر الزمن",
    },
    subtitle: {
      en: "A calm passage through memory, land, language and the people who carried them forward.",
      fr: "Un passage calme à travers la mémoire, les terres, la langue et celles et ceux qui les ont portées.",
      ar: "عبور هادئ عبر الذاكرة والأرض واللغة ومن حملوها إلى الأمام.",
    },
    startWith: {
      en: "Start with Early North Africa",
      fr: "Commencer par l’Afrique du Nord ancienne",
      ar: "ابدأ بشمال إفريقيا القديم",
    },
    explore: { en: "Explore Freely", fr: "Explorer librement", ar: "استكشف بحرية" },
    todayLabel: {
      en: "Today in Algerian memory",
      fr: "Aujourd’hui dans la mémoire algérienne",
      ar: "اليوم في الذاكرة الجزائرية",
    },
    todayHint: {
      en: "A new moment surfaces each day.",
      fr: "Un nouveau moment remonte chaque jour.",
      ar: "تطفو لحظة جديدة كلّ يوم.",
    },
    exploreJourney: {
      en: "Explore the journey",
      fr: "Explorer le parcours",
      ar: "استكشف الرحلة",
    },
    regions: { en: "Discover the regions", fr: "Découvrir les régions", ar: "اكتشف المناطق" },
    regionsTitle: { en: "Six regions, one country", fr: "Six régions, un pays", ar: "ستّ مناطق، بلد واحد" },
    beginTitle: {
      en: "Begin the journey",
      fr: "Commencer le voyage",
      ar: "ابدأ الرحلة",
    },
    beginDesc: {
      en: "Two thousand years of Algerian memory, told slowly and carefully — chapter by chapter.",
      fr: "Deux mille ans de mémoire algérienne, racontés lentement et avec soin — chapitre après chapitre.",
      ar: "ألفا عام من الذاكرة الجزائرية، تُروى بهدوء وعناية — فصلًا تلو الآخر.",
    },
    footer: {
      en: "Algeria Through Time — a calm cultural journey through land, memory and language.",
      fr: "Algeria Through Time — un voyage culturel paisible entre terres, mémoire et langue.",
      ar: "Algeria Through Time — رحلة ثقافية هادئة عبر الأرض والذاكرة واللغة.",
    },
    entries: [
      {
        icon: "📜",
        title: { en: "Journey", fr: "Parcours", ar: "الرحلة" },
        desc: {
          en: "Follow Algeria’s chapters, from ancient kingdoms to independence.",
          fr: "Suivez les chapitres de l’Algérie, des royaumes antiques à l’indépendance.",
          ar: "اتبع فصول الجزائر من الممالك القديمة إلى الاستقلال.",
        },
        to: "/timeline" as const,
      },
      {
        icon: "🏔️",
        title: { en: "Regions", fr: "Régions", ar: "المناطق" },
        desc: {
          en: "Discover the landscapes, cities and memories they carry.",
          fr: "Découvrez les paysages, les villes et les mémoires qu’ils portent.",
          ar: "اكتشف المناظر والمدن والذكريات التي تحملها.",
        },
        to: "/map" as const,
      },
      {
        icon: "🎬",
        title: { en: "Culture", fr: "Culture", ar: "الثقافة" },
        desc: {
          en: "Enter through words, cinema, cuisine, ideas and identity.",
          fr: "Entrez par les mots, le cinéma, la cuisine, les idées et l’identité.",
          ar: "ادخل عبر الكلمات والسينما والمطبخ والأفكار والهوية.",
        },
        to: "/words" as const,
      },
    ],
    regionLinks: [
      { icon: "🌿", title: { en: "Kabylie", fr: "Kabylie", ar: "القبائل" } },
      { icon: "⛰️", title: { en: "Aurès", fr: "Aurès", ar: "الأوراس" } },
      { icon: "🏛️", title: { en: "Algiers", fr: "Alger", ar: "الجزائر العاصمة" } },
      { icon: "🌉", title: { en: "Constantine", fr: "Constantine", ar: "قسنطينة" } },
      { icon: "🏜️", title: { en: "Sahara", fr: "Sahara", ar: "الصحراء" } },
      { icon: "🌊", title: { en: "Western Algeria", fr: "Algérie de l’Ouest", ar: "الغرب الجزائري" } },
    ],
  };

  // Pair "today's moment" with its likely era for context
  const factText = t(todayFact, "en").toLowerCase();
  const matchedEra =
    eras.find((e) => e.facts?.some((f) => f === todayFact)) ??
    eras.find((e) => factText.includes(t(e.title, "en").toLowerCase().split(" ")[0]));

  return (
    <div className="min-h-screen">
      <Header />
      <main>
        {/* ========= HERO — Cinematic environmental entrance ========= */}
        <section className="hero-environment" aria-label={copy.title[lang]}>
          <div className="hero-env-atlas" aria-hidden />
          <div className="hero-env-glow" aria-hidden />
          <div className="hero-env-casbah" aria-hidden />
          <div className="hero-env-seal" aria-hidden>ⵣ</div>
          <div className="hero-env-layer hero-env-mountains" aria-hidden />
          <div className="hero-env-path" aria-hidden />
          <div className="hero-env-layer hero-env-dunes" aria-hidden />
          <div className="hero-env-layer hero-env-ruins" aria-hidden />
          <div className="hero-env-grain" aria-hidden />
          <div className="hero-env-vignette" aria-hidden />

          <div className="hero-env-frame animate-cinematic-in">
            <div>
              <div className="hero-env-eyebrow">
                <span className="seal" aria-hidden>ⵣ</span>
                {copy.eyebrow[lang]}
              </div>

              <h1 className="hero-env-title">
                {lang === "en" && <>Algeria,<br /><em>through time</em></>}
                {lang === "fr" && <>L’Algérie,<br /><em>à travers le temps</em></>}
                {lang === "ar" && <>الجزائر،<br /><em>عبر الزمن</em></>}
              </h1>

              <div className="hero-env-rule" aria-hidden />

              <p className="hero-env-lede">{copy.subtitle[lang]}</p>

              <div className="hero-env-actions">
                <Link to="/timeline" className="cta-exhibition">
                  <span>{tu("startJourney", lang)}</span>
                  <span className="arrow" aria-hidden>→</span>
                </Link>
                <Link
                  to="/era/$eraId"
                  params={{ eraId: "earlynorthafrica" }}
                  className="cta-exhibition-quiet"
                >
                  {copy.startWith[lang]}
                </Link>
              </div>
            </div>

            <aside className="hero-env-placard" aria-hidden>
              <div className="placard-label">
                {lang === "fr" ? "Salle d’entrée" : lang === "ar" ? "قاعة المدخل" : "Entrance Hall"}
              </div>
              <p className="placard-quote">
                {lang === "fr"
                  ? "« Deux mille ans de mémoire — terres, langues, et celles et ceux qui les ont portées. »"
                  : lang === "ar"
                  ? "«ألفا عام من الذاكرة — أرضٌ ولغاتٌ، ومن حملوها.»"
                  : "“Two thousand years of memory — lands, languages, and the people who carried them.”"}
              </p>
              <div className="placard-attr">
                {lang === "fr"
                  ? "Exposition permanente · Numidie → Indépendance"
                  : lang === "ar"
                  ? "معرض دائم · من نوميديا إلى الاستقلال"
                  : "Permanent Exhibition · Numidia → Independence"}
              </div>
            </aside>
          </div>
        </section>



        {/* ========= TODAY IN ALGERIAN MEMORY ========= */}
        <section className="mx-auto max-w-5xl px-4 pt-10 sm:pt-12">
          <div
            className="relative overflow-hidden rounded-3xl border border-accent/30 p-6 sm:p-8 bg-parchment-card animate-fade-in"
            style={{ boxShadow: "var(--shadow-soft)" }}
          >
            <div className="absolute inset-y-0 start-0 w-1.5 bg-gradient-to-b from-accent via-primary/70 to-accent/40" aria-hidden />
            <div className="flex items-start gap-4">
              <div className="hidden sm:flex items-center justify-center shrink-0 w-12 h-12 rounded-full bg-accent/20 text-2xl" aria-hidden>
                🕯️
              </div>
              <div className="min-w-0">
                <div className="text-[11px] font-bold uppercase tracking-[0.18em] text-accent-foreground/80">
                  {copy.todayLabel[lang]}
                </div>
                <p
                  className="mt-2 text-lg sm:text-xl leading-relaxed text-foreground/90"
                  style={{ fontFamily: "Georgia, 'Times New Roman', serif" }}
                >
                  “{t(todayFact, lang)}”
                </p>
                {matchedEra && (
                  <div className="mt-3 text-xs text-muted-foreground">
                    — {t(matchedEra.title, lang)} · {matchedEra.dateRange}
                  </div>
                )}
                <div className="mt-1 text-[11px] italic text-muted-foreground/80">
                  {copy.todayHint[lang]}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ========= EXPLORE — three pillars ========= */}
        <section className="mx-auto max-w-5xl px-4 py-10 sm:py-14">
          <div className="text-center mb-6 sm:mb-8">
            <h2 className="text-2xl sm:text-3xl font-extrabold">{copy.exploreJourney[lang]}</h2>
          </div>
          <div className="grid gap-4 sm:grid-cols-3">
            {copy.entries.map((entry) => (
              <Link
                key={entry.to}
                to={entry.to}
                className="card-hover group relative overflow-hidden rounded-2xl border border-border bg-card/90 p-6 text-center transition-colors hover:border-primary/40"
                style={{ boxShadow: "var(--shadow-soft)" }}
              >
                <div
                  className="absolute inset-x-0 top-0 h-1 opacity-70"
                  style={{ background: "var(--gradient-warm)" }}
                  aria-hidden
                />
                <div className="text-4xl mt-2 transition-transform group-hover:scale-105" aria-hidden>
                  {entry.icon}
                </div>
                <h3 className="mt-4 text-lg font-bold tracking-tight">{t(entry.title, lang)}</h3>
                <p className="mx-auto mt-2 text-sm leading-relaxed text-muted-foreground">{t(entry.desc, lang)}</p>
                <div className="mt-4 text-xs font-semibold text-primary opacity-70 group-hover:opacity-100 transition-opacity">
                  →
                </div>
              </Link>
            ))}
          </div>
        </section>

        {/* ========= REGION PREVIEW STRIP ========= */}
        <section className="mx-auto max-w-5xl px-4 pb-10 sm:pb-14">
          <div className="flex items-end justify-between mb-4">
            <h2 className="text-xl sm:text-2xl font-extrabold">{copy.regionsTitle[lang]}</h2>
            <Link to="/map" className="text-sm font-semibold text-primary hover:underline">
              {copy.regions[lang]} →
            </Link>
          </div>
          <div className="-mx-4 px-4 overflow-x-auto no-scrollbar">
            <div className="flex gap-3 w-max sm:grid sm:grid-cols-3 lg:grid-cols-6 sm:w-auto sm:gap-3">
              {copy.regionLinks.map((item) => (
                <Link
                  key={item.title.en}
                  to="/map"
                  className="card-hover shrink-0 w-32 sm:w-auto rounded-2xl border border-border bg-card/85 p-4 text-center transition-colors hover:border-accent/60"
                  style={{ boxShadow: "var(--shadow-soft)" }}
                >
                  <div className="text-3xl" aria-hidden>{item.icon}</div>
                  <div className="mt-2 text-sm font-semibold leading-tight">{t(item.title, lang)}</div>
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* ========= DID YOU KNOW ========= */}
        <section className="mx-auto max-w-5xl px-4 pb-10 sm:pb-14">
          <DidYouKnowCard fact={homepageFact} />
        </section>

        {/* ========= FINAL CTA ========= */}
        <section className="relative overflow-hidden">
          <div
            className="absolute inset-0 -z-10"
            style={{
              background:
                "linear-gradient(180deg, var(--background), color-mix(in oklab, var(--accent) 14%, var(--background)))",
            }}
            aria-hidden
          />
          <div className="absolute inset-0 -z-10 bg-mosaic-soft opacity-60" aria-hidden />
          <div className="mx-auto max-w-3xl px-4 py-14 sm:py-20 text-center animate-fade-in">
            <div className="text-3xl mb-4" aria-hidden>ⵣ</div>
            <h2
              className="text-3xl sm:text-4xl font-extrabold tracking-tight"
              style={{ letterSpacing: "-0.02em" }}
            >
              {copy.beginTitle[lang]}
            </h2>
            <p className="mx-auto mt-4 max-w-xl text-base text-muted-foreground leading-relaxed">
              {copy.beginDesc[lang]}
            </p>
            <Link
              to="/timeline"
              className="inline-block mt-8 rounded-2xl px-8 py-4 text-base font-bold text-primary-foreground transition-transform hover:scale-[1.02] active:scale-95"
              style={{ background: "var(--gradient-warm)", boxShadow: "var(--shadow-glow)" }}
            >
              {tu("startJourney", lang)}
            </Link>
          </div>
        </section>
      </main>

      <footer className="border-t border-border bg-card/70 px-4 py-8 text-center">
        <p className="mx-auto max-w-2xl text-sm text-muted-foreground">{copy.footer[lang]}</p>
      </footer>
    </div>
  );
}

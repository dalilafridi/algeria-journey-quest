import { createFileRoute, Link } from "@tanstack/react-router";

import { ContinueJourneyInline } from "@/components/ContinueJourneyInline";
import { DidYouKnowCard } from "@/components/DidYouKnowCard";
import { OnThisDayCard, formatOnThisDayDate } from "@/components/OnThisDayCard";
import { useLocalOnThisDay } from "@/lib/useLocalOnThisDay";
import { SignatureJourneys } from "@/components/journeys/SignatureJourneys";
import {
  FeaturedExhibits,
  ExploreByTheme,
  CuratorsPick,
  LatestExhibits,
} from "@/components/museum/EntranceHall";
import { Header } from "@/components/Header";
import { PillarIcon } from "@/components/brand/PillarIcon";
import { RegionIcon } from "@/components/RegionIcon";
import { dailyFacts, eras, eraDateRange } from "@/data/eras";
import { t, tu, useLang } from "@/lib/i18n";
import heroBg from "@/assets/hero-bg.png";
import { pageMeta, headLang } from "@/lib/seo";
import { PAGE_META } from "@/lib/pageMetaCopy";



export const Route = createFileRoute("/")({
  head: ({ match }) =>
    pageMeta({
      lang: headLang(match),
      path: "/",
      ...PAGE_META["/"],
      image: heroBg
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
  // Visitor-local date awareness. Null during SSR and hydration, so the
  // archive wording is shown until the local calendar date is known.
  const { selection: todaySelection, exact: todayExact } = useLocalOnThisDay();

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
    onThisDayLabel: {
      en: "On this day in Algerian history",
      fr: "Ce jour-là dans l’histoire algérienne",
      ar: "في مثل هذا اليوم من تاريخ الجزائر",
    },
    archiveLabel: {
      en: "From Algerian memory",
      fr: "Dans la mémoire algérienne",
      ar: "من الذاكرة الجزائرية",
    },
    archiveHint: {
      en: "A different moment from Algeria’s history surfaces each day.",
      fr: "Un autre moment de l’histoire algérienne apparaît chaque jour.",
      ar: "تظهر كل يوم محطة مختلفة من تاريخ الجزائر.",
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
      en: "Two thousand years of Algerian memory, told slowly and carefully, chapter by chapter.",
      fr: "Deux mille ans de mémoire algérienne, racontés lentement et avec soin, chapitre après chapitre.",
      ar: "ألفا عام من الذاكرة الجزائرية، تُروى بهدوء وعناية، فصلًا تلو الآخر.",
    },
    footer: {
      en: "Algeria Through Time, a calm cultural journey through land, memory and language.",
      fr: "Algeria Through Time, un voyage culturel paisible entre terres, mémoire et langue.",
      ar: "Algeria Through Time، رحلة ثقافية هادئة عبر الأرض والذاكرة واللغة.",
    },
    entries: [
      {
        kind: "journey" as const,
        title: { en: "Journey", fr: "Parcours", ar: "الرحلة" },
        desc: {
          en: "Follow Algeria’s chapters, from ancient kingdoms to independence.",
          fr: "Suivez les chapitres de l’Algérie, des royaumes antiques à l’indépendance.",
          ar: "اتبع فصول الجزائر من الممالك القديمة إلى الاستقلال.",
        },
        to: "/timeline" as const,
      },
      {
        kind: "regions" as const,
        title: { en: "Regions", fr: "Régions", ar: "المناطق" },
        desc: {
          en: "Discover the landscapes, cities and memories they carry.",
          fr: "Découvrez les paysages, les villes et les mémoires qu’ils portent.",
          ar: "اكتشف المناظر والمدن والذكريات التي تحملها.",
        },
        to: "/map" as const,
      },
      {
        kind: "culture" as const,
        title: { en: "Culture", fr: "Culture", ar: "الثقافة" },
        desc: {
          en: "Enter through words, cinema, cuisine, ideas and identity.",
          fr: "Entrez par les mots, le cinéma, la cuisine, les idées et l’identité.",
          ar: "ادخل عبر الكلمات والسينما والمطبخ والأفكار والهوية.",
        },
        to: "/culture" as const,
      },
    ],
    regionLinks: [
      { regionId: "kabylie", title: { en: "Kabylie", fr: "Kabylie", ar: "القبائل" } },
      { regionId: "aures", title: { en: "Aurès", fr: "Aurès", ar: "الأوراس" } },
      { regionId: "algiers", title: { en: "Algiers", fr: "Alger", ar: "الجزائر العاصمة" } },
      { regionId: "constantine", title: { en: "Constantine", fr: "Constantine", ar: "قسنطينة" } },
      { regionId: "sahara", title: { en: "Sahara", fr: "Sahara", ar: "الصحراء" } },
      { regionId: "oran-west", title: { en: "Western Algeria", fr: "Algérie de l’Ouest", ar: "الغرب الجزائري" } },
    ],
  };


  // Pair "today's moment" with its likely era for context
  const factText = t(todayFact, "en").toLowerCase();
  const matchedEra =
    eras.find((e) => e.facts?.some((f) => f === todayFact)) ??
    eras.find((e) => factText.includes(t(e.title, "en").toLowerCase().split(" ")[0]));

  return (
    <div className="min-h-dvh">
      <Header />
      <main id="main" tabIndex={-1}>
        {/* ========= HERO, Cinematic environmental entrance ========= */}
        <section className="hero-environment" aria-label={copy.title[lang]}>
          <img
            src={heroBg}
            alt=""
            className="hero-env-photo"
            loading="eager"
            decoding="async"
            aria-hidden
          />
          <div className="hero-env-readability" aria-hidden />
          <div className="hero-env-parchment" aria-hidden />
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

          </div>
        </section>



        {/* ========= INLINE CONTINUATION (subtle, below hero) ========= */}
        <ContinueJourneyInline />


        {/* ========= FEATURED MASTERPIECE EXHIBITS ========= */}
        <FeaturedExhibits className="pt-10 sm:pt-14" />

        {/* ========= ON THIS DAY IN ALGERIAN HISTORY ========= */}
        <OnThisDayCard />


        {/* ========= DATE-AWARE MEMORY PANEL ========= */}
        <section className="mx-auto max-w-5xl px-4 pt-10 sm:pt-12">
          <div
            className="relative overflow-hidden rounded-3xl border border-accent/30 p-6 sm:p-8 bg-parchment-card animate-fade-in"
            style={{ boxShadow: "var(--shadow-soft)" }}
          >
            <div className="absolute inset-y-0 start-0 w-1.5 bg-gradient-to-b from-accent via-primary/70 to-accent/40" aria-hidden />
            <div className="flex items-start gap-4">
              <div className="hidden sm:flex items-center justify-center shrink-0 w-12 h-12 rounded-full bg-accent/20 text-2xl" aria-hidden>
                {todayExact ? todaySelection!.entry.medallionEmoji : "\u{1F56F}\uFE0F"}
              </div>
              <div className="min-w-0">
                <div className="text-[11px] font-bold uppercase tracking-[0.18em] text-accent-foreground/80">
                  {todayExact ? copy.onThisDayLabel[lang] : copy.archiveLabel[lang]}
                </div>
                {todayExact && (
                  <div
                    className="mt-1 text-xs uppercase tracking-[0.3em] text-muted-foreground"
                    style={{ fontFamily: "Georgia, 'Times New Roman', serif" }}
                  >
                    {formatOnThisDayDate(todaySelection!.entry, lang)}
                  </div>
                )}
                <p
                  className="mt-2 text-lg sm:text-xl leading-relaxed text-foreground/90"
                  style={{ fontFamily: "Georgia, 'Times New Roman', serif" }}
                >
                  “{todayExact ? t(todaySelection!.entry.event, lang) : t(todayFact, lang)}”
                </p>
                {todayExact ? (
                  <div className="mt-3 text-xs text-muted-foreground">
                    {t(todaySelection!.entry.figureName, lang)} · {t(todaySelection!.entry.exhibitLabel, lang)}
                  </div>
                ) : (
                  matchedEra && (
                    <div className="mt-3 text-xs text-muted-foreground">
                      {t(matchedEra.title, lang)} · {eraDateRange(matchedEra, lang)}
                    </div>
                  )
                )}
                <div className="mt-1 text-[11px] italic text-muted-foreground/80">
                  {todayExact ? copy.todayHint[lang] : copy.archiveHint[lang]}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ========= CURATOR'S PICK, rotating flagship ========= */}
        <div className="pt-10 sm:pt-14">
          <CuratorsPick />
        </div>

        {/* ========= EXPLORE, three pillars ========= */}
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
                <div className="mx-auto mt-2 w-20 h-20 flex items-center justify-center icon-glow">
                  <PillarIcon kind={entry.kind} className="w-full h-full" />
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

        {/* ========= SIGNATURE JOURNEYS ========= */}
        <SignatureJourneys className="pb-10 sm:pb-14" />

        {/* ========= EXPLORE BY THEME ========= */}
        <ExploreByTheme className="pb-10 sm:pb-14" />



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
                  key={item.regionId}
                  to="/map"
                  hash={`region-${item.regionId}`}
                  className="card-hover group shrink-0 w-32 sm:w-auto rounded-2xl border border-border bg-card/85 p-4 text-center transition-colors hover:border-accent/60"
                  style={{ boxShadow: "var(--shadow-soft)" }}
                >
                  <div className="mx-auto w-16 h-16 flex items-center justify-center icon-glow">
                    <RegionIcon regionId={item.regionId} className="w-full h-full" />
                  </div>
                  <div className="mt-2 text-sm font-semibold leading-tight">{t(item.title, lang)}</div>
                </Link>
              ))}
            </div>
          </div>
        </section>


        {/* ========= LATEST EXHIBITS ========= */}
        <LatestExhibits className="pb-10 sm:pb-14" />

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
        <section className="border-t border-border bg-card/70 px-4 py-8 text-center">
          <p className="mx-auto max-w-2xl text-sm text-muted-foreground">{copy.footer[lang]}</p>
        </section>
      </main>
    </div>
  );
}

import { createFileRoute, useNavigate, Link } from "@tanstack/react-router";
import { useCallback, useEffect, useMemo, useState } from "react";
import { useLang, t, type LocalizedString, type Lang } from "@/lib/i18n";
import { setShowcase } from "@/lib/showcase";

export const Route = createFileRoute("/showcase")({
  head: () => ({
    meta: [
      { title: "Showcase — Algeria Through Time" },
      {
        name: "description",
        content:
          "A guided cinematic journey through Algeria's eras, figures, places and culture — designed for exhibitions, classrooms and quiet contemplation.",
      },
      { property: "og:title", content: "Showcase — Algeria Through Time" },
      {
        property: "og:description",
        content:
          "Step into a curated, museum-quality walkthrough of 2,000+ years of Algerian memory.",
      },
    ],
  }),
  component: ShowcasePage,
});

// ---------- Curated cinematic stops ----------

type Stop = {
  key: string;
  eyebrow: LocalizedString;
  title: LocalizedString;
  body: LocalizedString;
  quote?: LocalizedString;
  quoteAttribution?: LocalizedString;
  era?: LocalizedString;
  /** Optional deep link to the live section in the app. */
  exploreTo?: string;
  exploreLabel?: LocalizedString;
  /** Background gradient angle in degrees — adds gentle variation. */
  angle?: number;
};

const L = (en: string, fr: string, ar: string): LocalizedString => ({ en, fr, ar });

const STOPS: Stop[] = [
  {
    key: "prelude",
    eyebrow: L("Prelude", "Prélude", "تمهيد"),
    title: L(
      "A land older than its name",
      "Une terre plus ancienne que son nom",
      "أرض أقدم من اسمها",
    ),
    body: L(
      "Before maps, before borders, before the word Algeria — there was a coastline, a desert, mountains, and the people who learned to live between them. This is a slow walk through their memory.",
      "Avant les cartes, avant les frontières, avant le mot Algérie — il y avait une côte, un désert, des montagnes, et les peuples qui ont appris à vivre entre eux. Voici une lente promenade dans leur mémoire.",
      "قبل الخرائط، قبل الحدود، قبل أن تُكتب كلمة «الجزائر» — كان هناك ساحلٌ وصحراءُ وجبالٌ، وأناسٌ تعلّموا العيش بينها. هذه نزهة هادئة في ذاكرتهم.",
    ),
    quote: L(
      "We do not inherit the land from our ancestors; we walk through it with them.",
      "Nous n'héritons pas de la terre de nos aïeux ; nous la traversons avec eux.",
      "نحن لا نرث الأرض من أجدادنا، بل نمشي فيها معهم.",
    ),
    angle: 140,
  },
  {
    key: "numidia",
    eyebrow: L("Antiquity · Numidian Kingdoms", "Antiquité · Royaumes numides", "العصور القديمة · الممالك النوميدية"),
    title: L("Massinissa and the cavalry of the plains", "Massinissa et la cavalerie des plaines", "ماسينيسا وفرسان السهول"),
    body: L(
      "In the 3rd century BCE, Numidian horsemen rode between Carthage and Rome, choosing their alliances with care. Massinissa unified rival tribes into a single kingdom that minted its own coin and welcomed grain harvests across the high plains.",
      "Au IIIᵉ siècle av. J.-C., les cavaliers numides chevauchaient entre Carthage et Rome, choisissant leurs alliances avec soin. Massinissa unifia des tribus rivales en un royaume qui frappait sa propre monnaie et accueillait les moissons des hauts plateaux.",
      "في القرن الثالث قبل الميلاد، كان الفرسان النوميديون يتنقّلون بين قرطاج وروما يختارون تحالفاتهم بعناية. وحّد ماسينيسا القبائل المتنازعة في مملكة سكّت عملتها واستقبلت حصاد الهضاب العليا.",
    ),
    era: L("c. 202 BCE", "vers 202 av. J.-C.", "نحو 202 ق.م"),
    exploreTo: "/era/numidia",
    exploreLabel: L("Enter the era", "Entrer dans l'époque", "ادخل الحقبة"),
    angle: 155,
  },
  {
    key: "roman",
    eyebrow: L("Roman Algeria", "Algérie romaine", "الجزائر الرومانية"),
    title: L("Timgad — a city drawn with a straight rule", "Timgad — une ville tracée à la règle", "تيمقاد — مدينة رسمت بالمسطرة"),
    body: L(
      "On the edge of the Aurès, Roman engineers laid out Thamugadi in perfect quadrants. Two centuries later it overflowed its own grid. Today its silent streets and library inscription still read: «Hunting, bathing, playing, laughing — this is to live.»",
      "Au pied de l'Aurès, les ingénieurs romains tracèrent Thamugadi en quadrants parfaits. Deux siècles plus tard, elle débordait de son propre plan. Aujourd'hui ses rues silencieuses et l'inscription de sa bibliothèque disent encore : « Chasser, se baigner, jouer, rire — c'est vivre. »",
      "عند سفح الأوراس، رسم المهندسون الرومان تيموقاد في مربّعات تامّة. وبعد قرنين كانت قد تجاوزت تخطيطها. ولا تزال شوارعها الصامتة ونقش مكتبتها يقولان: «الصيد والاستحمام واللعب والضحك… تلك هي الحياة».",
    ),
    era: L("100 CE", "100 ap. J.-C.", "100 م"),
    exploreTo: "/era/roman",
    exploreLabel: L("Walk Timgad", "Marcher dans Timgad", "تجوّل في تيمقاد"),
    angle: 125,
  },
  {
    key: "islamic",
    eyebrow: L("Medieval Islamic Algeria", "Algérie islamique médiévale", "الجزائر الإسلامية الوسيطة"),
    title: L("Tlemcen, the pearl of the Maghreb", "Tlemcen, la perle du Maghreb", "تلمسان، لؤلؤة المغرب"),
    body: L(
      "Mosques of onyx and cedar, scholars walking from Andalusia to Tunis, a court that welcomed Ibn Khaldun. Under the Zayyanids, Tlemcen became a quiet capital where geometry, poetry and trade were one continuous gesture.",
      "Mosquées d'onyx et de cèdre, savants venus d'Andalousie ou de Tunis, une cour qui accueillit Ibn Khaldoun. Sous les Zayyanides, Tlemcen devint une capitale paisible où géométrie, poésie et commerce ne faisaient qu'un.",
      "مساجد من المرمر والأرز، علماء يأتون من الأندلس وتونس، وبلاطٌ احتضن ابن خلدون. في عهد الزيّانيين صارت تلمسان عاصمةً هادئة تتّحد فيها الهندسة والشعر والتجارة.",
    ),
    quote: L(
      "Ink dries faster than tears, but the page remembers longer.",
      "L'encre sèche plus vite que les larmes, mais la page se souvient plus longtemps.",
      "الحبر يجفّ أسرع من الدمع، لكنّ الصفحة تذكر أطول.",
    ),
    quoteAttribution: L("Andalusian-Maghrebi proverb", "Proverbe andalou-maghrébin", "مثل أندلسي-مغاربي"),
    era: L("13th–15th c.", "XIIIᵉ–XVᵉ s.", "ق13–15"),
    exploreTo: "/era/islamic",
    exploreLabel: L("Enter the era", "Entrer dans l'époque", "ادخل الحقبة"),
    angle: 165,
  },
  {
    key: "atlas",
    eyebrow: L("Interactive Atlas", "Atlas interactif", "أطلس تفاعلي"),
    title: L("A map drawn in many hands", "Une carte tracée à plusieurs mains", "خريطة رسمتها أيادٍ كثيرة"),
    body: L(
      "Numidian, Roman, Hammadid, Zayyanid, Ottoman, French, Algerian — every era left its capital, its road, its silhouette. Our atlas keeps all of them visible, the way a museum keeps every layer of a fresco.",
      "Numide, romaine, hammadide, zayyanide, ottomane, française, algérienne — chaque époque a laissé sa capitale, sa route, sa silhouette. Notre atlas les garde toutes visibles, comme un musée conserve chaque couche d'une fresque.",
      "نوميديّة، رومانيّة، حمّاديّة، زيّانيّة، عثمانيّة، فرنسيّة، جزائريّة — تركت كلّ حقبة عاصمتها وطريقها وملامحها. أطلسنا يُبقي الجميع ظاهرين، كما يحفظ المتحف كلّ طبقة من جداريّة.",
    ),
    exploreTo: "/atlas",
    exploreLabel: L("Open the atlas", "Ouvrir l'atlas", "افتح الأطلس"),
    angle: 145,
  },
  {
    key: "emir",
    eyebrow: L("Colonial Resistance", "Résistance coloniale", "المقاومة الاستعمارية"),
    title: L("Emir Abdelkader — a state on horseback", "Émir Abdelkader — un État à cheval", "الأمير عبد القادر — دولةٌ على صهوة جواد"),
    body: L(
      "Fifteen years of resistance, a moving capital, hospitals and schools that travelled with the camp. Later exiled to Damascus, he sheltered thousands of Christians during the 1860 riots — and reminded the world that dignity has no flag.",
      "Quinze ans de résistance, une capitale mobile, des hôpitaux et des écoles qui voyageaient avec le camp. Exilé à Damas, il protégea des milliers de chrétiens lors des émeutes de 1860 — rappelant au monde que la dignité n'a pas de drapeau.",
      "خمسة عشر عامًا من المقاومة، وعاصمةٌ متنقّلة، ومستشفياتٌ ومدارس ترافق المعسكر. في منفاه بدمشق، حمى آلاف المسيحيين في أحداث 1860 — وذكّر العالم بأن الكرامة لا تحمل علماً.",
    ),
    quote: L(
      "If those who claim to be Muslims act against the Qur'an, then we, who follow the Qur'an, are the true Christians of this hour.",
      "Si ceux qui se disent musulmans agissent contre le Coran, alors nous, qui suivons le Coran, sommes les vrais chrétiens de cette heure.",
      "إن كان من يدّعون الإسلام يخالفون القرآن، فنحن أتباع القرآن مسيحيّو هذه الساعة الحقيقيّون.",
    ),
    quoteAttribution: L("Emir Abdelkader, Damascus 1860", "Émir Abdelkader, Damas 1860", "الأمير عبد القادر، دمشق 1860"),
    era: L("1832 – 1847", "1832 – 1847", "1832 – 1847"),
    exploreTo: "/figures",
    exploreLabel: L("Meet the figures", "Rencontrer les figures", "تعرّف على الأعلام"),
    angle: 135,
  },
  {
    key: "independence",
    eyebrow: L("War of Independence", "Guerre d'indépendance", "حرب الاستقلال"),
    title: L("One million and a half stars", "Un million et demi d'étoiles", "مليون ونصف نجمة"),
    body: L(
      "Between 1954 and 1962, Algeria paid a price counted in lives that the country still names star by star. Independence was not won — it was carried, on shoulders, by villagers, students, midwives, poets, and unknown men in the maquis.",
      "Entre 1954 et 1962, l'Algérie a payé un prix compté en vies que le pays continue de nommer étoile par étoile. L'indépendance n'a pas été gagnée — elle a été portée, sur des épaules, par des villageois, des étudiants, des sages-femmes, des poètes et des inconnus du maquis.",
      "بين 1954 و1962 دفعت الجزائر ثمنًا يُحصى بأرواحٍ ما زال البلد يسمّيها نجمةً نجمة. الاستقلال لم يُكسب — بل حُمل، على الأكتاف، من قرويين وطلبة وقابلاتٍ وشعراء ومجهولين في الجبال.",
    ),
    era: L("1 November 1954", "1ᵉʳ novembre 1954", "1 نوفمبر 1954"),
    exploreTo: "/era/independence",
    exploreLabel: L("Enter the era", "Entrer dans l'époque", "ادخل الحقبة"),
    angle: 160,
  },
  {
    key: "culture",
    eyebrow: L("Living Culture", "Culture vivante", "ثقافة حيّة"),
    title: L("The country that sings before it speaks", "Le pays qui chante avant de parler", "بلدٌ يغنّي قبل أن يتكلّم"),
    body: L(
      "Chaâbi from the Casbah, Andalusian nubas of Tlemcen, Raï from Oran, Kabyle voices from the mountains, the desert blues of the Sahara. To listen to Algeria is to hear a long conversation between coast and dune.",
      "Le chaâbi de la Casbah, les noubas andalouses de Tlemcen, le raï d'Oran, les voix kabyles des montagnes, le blues du désert. Écouter l'Algérie, c'est entendre une longue conversation entre la côte et la dune.",
      "الشعبي من القصبة، النوبات الأندلسيّة من تلمسان، الراي من وهران، الأصوات القبائلية من الجبال، وبلوز الصحراء. أن تُصغي إلى الجزائر هو أن تسمع حوارًا طويلًا بين الساحل والكثيب.",
    ),
    exploreTo: "/culture",
    exploreLabel: L("Walk the culture rooms", "Visiter les salles culturelles", "تجوّل في قاعات الثقافة"),
    angle: 150,
  },
  {
    key: "coda",
    eyebrow: L("Coda", "Coda", "خاتمة"),
    title: L("ⵣ — and the word continues", "ⵣ — et le mot continue", "ⵣ — والكلمة تستمر"),
    body: L(
      "A country is not a closed book; it is a hand still writing. Thank you for walking this corridor with us. Step back into the museum whenever you wish — the rooms remain open.",
      "Un pays n'est pas un livre fermé ; c'est une main qui continue d'écrire. Merci d'avoir parcouru ce couloir avec nous. Revenez quand vous le souhaitez — les salles restent ouvertes.",
      "البلد ليس كتابًا مغلقًا، بل يدٌ ما زالت تكتب. شكرًا لأنك سرت في هذا الممرّ معنا. عُد متى شئت — القاعات لا تُغلق.",
    ),
    exploreTo: "/",
    exploreLabel: L("Return to the entrance", "Revenir à l'entrée", "العودة إلى المدخل"),
    angle: 180,
  },
];

// ---------- Component ----------

function ShowcasePage() {
  const lang = useLang();
  const navigate = useNavigate();
  const [index, setIndex] = useState(0);
  const [autoplay, setAutoplay] = useState(false);
  const total = STOPS.length;
  const stop = STOPS[index];

  const T = useMemo(
    () => ({
      back: { en: "Previous", fr: "Précédent", ar: "السابق" }[lang],
      next: { en: "Next", fr: "Suivant", ar: "التالي" }[lang],
      exit: { en: "Exit showcase", fr: "Quitter la visite", ar: "إنهاء العرض" }[lang],
      play: { en: "Auto-advance", fr: "Avance automatique", ar: "تقدّم تلقائي" }[lang],
      pause: { en: "Pause", fr: "Pause", ar: "إيقاف" }[lang],
      stop: { en: "Stop", fr: "Stop", ar: "إيقاف" }[lang],
      fullscreen: { en: "Fullscreen", fr: "Plein écran", ar: "ملء الشاشة" }[lang],
      stepOf: { en: "of", fr: "sur", ar: "من" }[lang],
      keyboardHint: {
        en: "← → arrows · Space to advance · F fullscreen · Esc to exit",
        fr: "Flèches ← → · Espace pour avancer · F plein écran · Échap pour quitter",
        ar: "الأسهم ← → · المسافة للتقدّم · F ملء الشاشة · Esc للخروج",
      }[lang],
    }),
    [lang],
  );

  // Enable showcase chrome-hiding while mounted on this route.
  useEffect(() => {
    setShowcase(true);
    return () => setShowcase(false);
  }, []);

  const goNext = useCallback(() => setIndex((i) => Math.min(i + 1, total - 1)), [total]);
  const goPrev = useCallback(() => setIndex((i) => Math.max(i - 1, 0)), []);
  const exit = useCallback(() => {
    setShowcase(false);
    navigate({ to: "/" });
  }, [navigate]);

  // Keyboard navigation
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "ArrowRight" || e.key === " " || e.key === "PageDown") {
        e.preventDefault();
        goNext();
      } else if (e.key === "ArrowLeft" || e.key === "PageUp") {
        e.preventDefault();
        goPrev();
      } else if (e.key === "Escape") {
        exit();
      } else if (e.key === "f" || e.key === "F") {
        toggleFullscreen();
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [goNext, goPrev, exit]);

  // Autoplay
  useEffect(() => {
    if (!autoplay) return;
    const reduce =
      typeof window !== "undefined" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const delay = reduce ? 14000 : 11000;
    const id = window.setTimeout(() => {
      if (index < total - 1) setIndex(index + 1);
      else setAutoplay(false);
    }, delay);
    return () => window.clearTimeout(id);
  }, [autoplay, index, total]);

  const angle = stop.angle ?? 140;

  return (
    <div
      className="showcase-stage relative min-h-dvh w-full overflow-hidden"
      style={{
        background: `
          radial-gradient(ellipse at 50% 0%, color-mix(in oklab, var(--accent) 14%, transparent), transparent 55%),
          radial-gradient(ellipse at 50% 100%, color-mix(in oklab, var(--primary) 12%, transparent), transparent 60%),
          linear-gradient(${angle}deg,
            color-mix(in oklab, var(--primary) 18%, var(--background)),
            var(--background) 55%,
            color-mix(in oklab, var(--accent) 14%, var(--background)))
        `,
      }}
    >
      {/* Top bar — minimal chrome */}
      <header className="absolute top-0 inset-x-0 z-20 flex items-center justify-between px-4 sm:px-8 pt-4 sm:pt-6 print:hidden">
        <span className="museum-eyebrow text-[10px] sm:text-xs">
          ⵣ {{ en: "Showcase", fr: "Visite guidée", ar: "العرض" }[lang]}
        </span>
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={toggleFullscreen}
            className="hidden sm:inline-flex items-center gap-1.5 rounded-full border border-border/70 bg-card/60 backdrop-blur-md px-3 py-1.5 text-xs font-medium text-foreground/85 hover:bg-card transition"
            aria-label={T.fullscreen}
          >
            <FullscreenIcon /> {T.fullscreen}
          </button>
          <button
            type="button"
            onClick={exit}
            className="inline-flex items-center gap-1.5 rounded-full border border-border/70 bg-card/60 backdrop-blur-md px-3 py-1.5 text-xs font-medium text-foreground/85 hover:bg-card transition"
          >
            <CloseIcon /> {T.exit}
          </button>
        </div>
      </header>

      {/* Stage */}
      <main className="relative z-10 mx-auto flex min-h-dvh max-w-3xl flex-col justify-center px-5 sm:px-10 py-24 sm:py-28">
        <article
          key={stop.key}
          className="showcase-card animate-cinematic-in text-center"
          aria-live="polite"
        >
          <div className="museum-eyebrow justify-center text-[10px] sm:text-xs mb-5">
            {t(stop.eyebrow, lang)}
            {stop.era && (
              <>
                <span className="opacity-40 mx-2">·</span>
                <span className="opacity-80">{t(stop.era, lang)}</span>
              </>
            )}
          </div>

          <h1 className="museum-section-title text-[clamp(1.6rem,2.2vw+1rem,3.1rem)] leading-[1.12] mb-6 text-balance">
            {t(stop.title, lang)}
          </h1>

          <p className="prose-reading text-[clamp(1rem,0.5vw+0.95rem,1.18rem)] leading-[1.8] text-foreground/85 mx-auto">
            {t(stop.body, lang)}
          </p>

          {stop.quote && (
            <blockquote className="museum-quote mt-8 mx-auto text-[clamp(1.05rem,0.4vw+1rem,1.3rem)]">
              “{t(stop.quote, lang)}”
              {stop.quoteAttribution && (
                <footer className="mt-3 text-xs uppercase tracking-[0.18em] text-muted-foreground not-italic">
                  — {t(stop.quoteAttribution, lang)}
                </footer>
              )}
            </blockquote>
          )}

          {stop.exploreTo && stop.exploreLabel && (
            <div className="mt-10">
              <Link
                to={stop.exploreTo as never}
                onClick={() => setShowcase(false)}
                className="inline-flex items-center gap-2 rounded-full border border-accent/40 bg-card/70 backdrop-blur-md px-5 py-2.5 text-sm font-semibold text-foreground hover:bg-card transition shadow-[var(--shadow-soft)]"
              >
                {t(stop.exploreLabel, lang)}
                <ArrowIcon dir={lang === "ar" ? "rtl" : "ltr"} />
              </Link>
            </div>
          )}
        </article>
      </main>

      {/* Bottom controls */}
      <footer className="absolute inset-x-0 bottom-0 z-20 pb-[max(1rem,env(safe-area-inset-bottom))] print:hidden">
        <div className="mx-auto max-w-3xl px-4 sm:px-8">
          {/* Progress dots */}
          <ProgressDots total={total} index={index} onJump={setIndex} lang={lang} />

          <div className="mt-3 flex items-center justify-between gap-3">
            <button
              type="button"
              onClick={goPrev}
              disabled={index === 0}
              className="inline-flex items-center gap-1.5 rounded-full border border-border/70 bg-card/70 backdrop-blur-md px-4 py-2 text-sm font-medium text-foreground hover:bg-card transition disabled:opacity-40 disabled:cursor-not-allowed min-h-11"
              aria-label={T.back}
            >
              <ArrowIcon dir={lang === "ar" ? "ltr" : "rtl"} />
              <span className="hidden xs:inline">{T.back}</span>
            </button>

            <div className="flex items-center gap-2">
              <span className="text-xs tabular-nums text-muted-foreground tracking-wide">
                {index + 1} {T.stepOf} {total}
              </span>
              <button
                type="button"
                onClick={() => setAutoplay((v) => !v)}
                className={
                  "inline-flex items-center gap-1.5 rounded-full border px-3 py-1.5 text-xs font-medium backdrop-blur-md transition min-h-11 " +
                  (autoplay
                    ? "bg-primary text-primary-foreground border-primary/60"
                    : "border-border/70 bg-card/70 text-foreground hover:bg-card")
                }
                aria-pressed={autoplay}
                aria-label={autoplay ? T.pause : T.play}
              >
                {autoplay ? <PauseIcon /> : <PlayIcon />}
                <span className="hidden sm:inline">
                  {autoplay ? T.pause : T.play}
                </span>
              </button>
            </div>

            <button
              type="button"
              onClick={index < total - 1 ? goNext : exit}
              className="inline-flex items-center gap-1.5 rounded-full bg-primary text-primary-foreground px-4 py-2 text-sm font-semibold hover:opacity-95 transition min-h-11 shadow-[var(--shadow-soft)]"
              aria-label={T.next}
            >
              <span className="hidden xs:inline">
                {index < total - 1 ? T.next : T.exit}
              </span>
              <ArrowIcon dir={lang === "ar" ? "rtl" : "ltr"} />
            </button>
          </div>

          <p className="mt-3 text-center text-[10.5px] tracking-wide text-muted-foreground/80">
            {T.keyboardHint}
          </p>
        </div>
      </footer>

      {/* Subtle drifting watermark */}
      <span
        aria-hidden
        className="pointer-events-none absolute -bottom-10 -right-10 text-[22rem] leading-none text-foreground/[0.03] select-none museum-drift"
      >
        ⵣ
      </span>
    </div>
  );
}

// ---------- Bits ----------

function ProgressDots({
  total,
  index,
  onJump,
  lang,
}: {
  total: number;
  index: number;
  onJump: (i: number) => void;
  lang: Lang;
}) {
  const labels = {
    goto: { en: "Go to stop", fr: "Aller à l'étape", ar: "اذهب إلى المحطة" }[lang],
  };
  return (
    <div role="tablist" aria-label="Showcase stops" className="flex items-center justify-center gap-1.5">
      {Array.from({ length: total }, (_, i) => {
        const active = i === index;
        return (
          <button
            key={i}
            role="tab"
            aria-selected={active}
            aria-label={`${labels.goto} ${i + 1}`}
            onClick={() => onJump(i)}
            className={
              "h-1.5 rounded-full transition-all " +
              (active
                ? "w-8 bg-primary"
                : "w-2 bg-foreground/20 hover:bg-foreground/35")
            }
          />
        );
      })}
    </div>
  );
}

function toggleFullscreen() {
  if (typeof document === "undefined") return;
  if (!document.fullscreenElement) {
    document.documentElement.requestFullscreen?.().catch(() => {});
  } else {
    document.exitFullscreen?.().catch(() => {});
  }
}

function ArrowIcon({ dir = "ltr" }: { dir?: "ltr" | "rtl" }) {
  return (
    <svg
      width="14"
      height="14"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2.4"
      strokeLinecap="round"
      strokeLinejoin="round"
      style={{ transform: dir === "rtl" ? "scaleX(-1)" : undefined }}
      aria-hidden
    >
      <line x1="5" y1="12" x2="19" y2="12" />
      <polyline points="13 6 19 12 13 18" />
    </svg>
  );
}
function CloseIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
      <line x1="18" y1="6" x2="6" y2="18" />
      <line x1="6" y1="6" x2="18" y2="18" />
    </svg>
  );
}
function PlayIcon() {
  return (
    <svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
      <polygon points="6 4 20 12 6 20 6 4" />
    </svg>
  );
}
function PauseIcon() {
  return (
    <svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
      <rect x="6" y="5" width="4" height="14" rx="1" />
      <rect x="14" y="5" width="4" height="14" rx="1" />
    </svg>
  );
}
function FullscreenIcon() {
  return (
    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
      <polyline points="4 9 4 4 9 4" />
      <polyline points="20 9 20 4 15 4" />
      <polyline points="4 15 4 20 9 20" />
      <polyline points="20 15 20 20 15 20" />
    </svg>
  );
}

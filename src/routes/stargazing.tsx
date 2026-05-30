import { createFileRoute, Link } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { Header } from "@/components/Header";
import { useLang, t, type Lang, type Localized } from "@/lib/i18n";

export const Route = createFileRoute("/stargazing")({
  head: () => ({
    meta: [
      { title: "Amazigh Stargazing — The Sky of Our Ancestors" },
      {
        name: "description",
        content:
          "How Amazigh people read the stars for life, land, and time — Pleiades, Orion, Sirius, desert navigation and a living sky calendar.",
      },
      { property: "og:title", content: "Amazigh Stargazing — The Sky of Our Ancestors" },
      {
        property: "og:description",
        content:
          "A cinematic museum of Amazigh star knowledge: seasons, navigation and oral tradition under the desert sky.",
      },
    ],
  }),
  component: StargazingPage,
});

// ---------- Copy (FR / EN / AR) ----------
const COPY = {
  badge: { fr: "Astronomie Amazighe", en: "Amazigh Stargazing", ar: "علم الفلك الأمازيغي" },
  heroTitle: {
    fr: "Le ciel de nos ancêtres",
    en: "The Sky of Our Ancestors",
    ar: "سماءُ أجدادنا",
  },
  heroSub: {
    fr: "Comment les Amazighs lisent les étoiles pour la vie, la terre et le temps.",
    en: "How Amazigh people read the stars for life, land, and time.",
    ar: "كيف قرأ الأمازيغ النجومَ من أجل الحياة والأرض والزمن.",
  },

  starsTitle: { fr: "Savoir des étoiles", en: "Star Knowledge", ar: "معرفة النجوم" },
  starsSub: {
    fr: "Trois constellations qui ont rythmé la vie quotidienne.",
    en: "Three constellations that shaped daily life.",
    ar: "ثلاث كواكب رسمت إيقاع الحياة اليومية.",
  },

  navTitle: { fr: "Naviguer dans le désert", en: "Desert Navigation", ar: "الإبحار في الصحراء" },
  navSub: {
    fr: "Touaregs et nomades : se repérer la nuit grâce aux étoiles.",
    en: "Tuareg and nomads: finding the way at night by the stars.",
    ar: "الطوارق والرحّل: الاهتداء ليلًا بالنجوم.",
  },
  navDirection: {
    fr: "Repérage : étoile polaire et alignements pour tenir un cap droit dans la dune.",
    en: "Direction finding: the pole star and stellar alignments hold a true heading across the dunes.",
    ar: "تحديد الاتجاه: نجم القطب ومحاذاة النجوم يحفظان المسار وسط الكثبان.",
  },
  navSeason: {
    fr: "Mouvements saisonniers : le lever de certaines étoiles annonce le départ vers les pâturages.",
    en: "Seasonal movement: the rising of certain stars signals the move toward fresh pastures.",
    ar: "التنقّل الموسمي: شروق نجوم بعينها يُعلن الرحيل نحو المراعي.",
  },

  calendarTitle: { fr: "Calendrier vivant", en: "Living Calendar", ar: "تقويمٌ حيّ" },
  calendarSub: {
    fr: "Les étoiles ne sont pas regardées : elles sont écoutées comme une horloge.",
    en: "Stars are not just watched — they are read like a clock of seasons.",
    ar: "النجومُ لا تُرى فقط، بل تُقرأ كساعةٍ للفصول.",
  },

  storyTitle: { fr: "L'étoile et la mariée", en: "The Star and the Bride", ar: "النجمةُ والعروس" },
  storyBody: {
    fr: "Les anciens racontent que les Pléiades — Tislit n Itri, « la mariée des étoiles » — fuyaient un prétendant trop ardent. Le ciel devint leur abri, et chaque automne leur retour annonçait les semailles. Une histoire d'amour transmise de bouche à oreille, sous la tente, près du feu.",
    en: "The elders say the Pleiades — Tislit n Itri, “the bride of the stars” — fled a suitor too eager. The sky became her refuge, and each autumn her return announced the time to sow. A love story passed from mouth to ear, beneath the tent, beside the fire.",
    ar: "يحكي الشيوخ أنّ الثريّا — تيسليت ن إتري، «عروسُ النجوم» — هربت من خاطبٍ مُلِحّ، فآوتها السماء، وعودتها كلَّ خريفٍ تُعلن أوانَ البذر. قصّةُ حُبٍّ تُروى من فمٍ إلى أذن، تحت الخيمة، قُربَ النار.",
  },
  oralBadge: { fr: "Tradition orale", en: "Oral tradition", ar: "روايةٌ شفهيّة" },

  quizTitle: { fr: "Mini-quiz", en: "Mini Quiz", ar: "اختبارٌ قصير" },
  quizSub: {
    fr: "Trois questions pour fixer ce que vous venez de découvrir.",
    en: "Three questions to anchor what you just discovered.",
    ar: "ثلاثةُ أسئلة لتثبيت ما اكتشفته للتو.",
  },
  good: { fr: "Bonne réponse !", en: "Correct!", ar: "إجابة صحيحة!" },
  retry: { fr: "Réessayez", en: "Try again", ar: "حاول مجدّدًا" },
  backHome: { fr: "← Retour à l'accueil", en: "← Back home", ar: "← العودة للرئيسية" },
} satisfies Record<string, Localized<string>>;

// ---------- Data ----------
type Star = {
  id: string;
  name: Localized<string>;
  amazigh: string;
  meaning: Localized<string>;
  desc: Localized<string>;
};

const STARS: Star[] = [
  {
    id: "pleiades",
    name: { fr: "Les Pléiades", en: "Pleiades", ar: "الثريّا" },
    amazigh: "Tislit n Itri",
    meaning: {
      fr: "Marqueur saisonnier · agriculture",
      en: "Seasonal marker · agriculture",
      ar: "دليلٌ موسميّ · للزراعة",
    },
    desc: {
      fr: "Leur lever d'automne signalait l'ouverture des semailles ; leur disparition au printemps, le moment des moissons.",
      en: "Their autumn rising opened the planting season; their springtime fading marked the time to harvest.",
      ar: "شروقها في الخريف يُؤذِن ببدء البذر، واختفاؤها في الربيع يُعلن موسم الحصاد.",
    },
  },
  {
    id: "orion",
    name: { fr: "Orion", en: "Orion", ar: "الجبّار" },
    amazigh: "Amenzu n Yennayer",
    meaning: {
      fr: "Force, chasse, hivernage",
      en: "Strength, hunting, winter",
      ar: "القوّة والصيد والشتاء",
    },
    desc: {
      fr: "Le chasseur du ciel — gardien des nuits froides et symbole d'endurance dans les contes transmis au coin du feu.",
      en: "The hunter of the sky — guardian of cold nights and symbol of endurance in tales told around the fire.",
      ar: "صيّادُ السماء — حارسُ الليالي الباردة ورمزُ الصبر في حكاياتٍ تُروى حولَ النار.",
    },
  },
  {
    id: "sirius",
    name: { fr: "Sirius", en: "Sirius", ar: "الشِّعرى" },
    amazigh: "Itri n Uzɣal",
    meaning: { fr: "Pic de chaleur", en: "Heat peak", ar: "ذروةُ الحَرّ" },
    desc: {
      fr: "L'étoile la plus brillante annonce l'été torride : il est temps de chercher l'ombre, l'eau et la fraîcheur des oasis.",
      en: "The brightest star heralds the burning summer: time to seek shade, water and the cool of the oases.",
      ar: "ألمعُ النجوم تُؤذِن بصيفٍ لاهب: حانَ وقتُ الظلّ والماء وبرودةِ الواحات.",
    },
  },
];

type CalEvent = {
  when: Localized<string>;
  title: Localized<string>;
  detail: Localized<string>;
};

const CALENDAR: CalEvent[] = [
  {
    when: { fr: "Automne", en: "Autumn", ar: "الخريف" },
    title: { fr: "Lever des Pléiades", en: "Rising of the Pleiades", ar: "شروق الثريّا" },
    detail: { fr: "Ouverture des semailles.", en: "Planting season begins.", ar: "بداية موسم البذر." },
  },
  {
    when: { fr: "Hiver", en: "Winter", ar: "الشتاء" },
    title: { fr: "Orion au zénith", en: "Orion at zenith", ar: "الجبّار في كبد السماء" },
    detail: { fr: "Nuits longues, contes au feu.", en: "Long nights, stories by the fire.", ar: "ليالٍ طويلة وحكايات حول النار." },
  },
  {
    when: { fr: "Printemps", en: "Spring", ar: "الربيع" },
    title: { fr: "Disparition des Pléiades", en: "Pleiades fade", ar: "اختفاء الثريّا" },
    detail: { fr: "Moissons et transhumance.", en: "Harvest and transhumance.", ar: "الحصاد والترحال." },
  },
  {
    when: { fr: "Été", en: "Summer", ar: "الصيف" },
    title: { fr: "Sirius brille à l'aube", en: "Sirius shines at dawn", ar: "الشِّعرى تتلألأ فجرًا" },
    detail: { fr: "Pic de chaleur, vie aux oasis.", en: "Heat peak, life moves to oases.", ar: "ذروة الحَرّ، الحياة في الواحات." },
  },
];

type QuizItem = {
  q: Localized<string>;
  options: Localized<string>[];
  answer: number;
};

const QUIZ: QuizItem[] = [
  {
    q: {
      fr: "Quelle constellation marque le début des semailles ?",
      en: "Which constellation signals the planting season?",
      ar: "أيُّ كوكبةٍ تُعلن موسم البذر؟",
    },
    options: [
      { fr: "Orion", en: "Orion", ar: "الجبّار" },
      { fr: "Les Pléiades", en: "Pleiades", ar: "الثريّا" },
      { fr: "Sirius", en: "Sirius", ar: "الشِّعرى" },
    ],
    answer: 1,
  },
  {
    q: {
      fr: "À quoi servaient les étoiles pour les nomades ?",
      en: "What did nomads use stars for?",
      ar: "ما الذي استخدم الرحّلُ النجومَ من أجله؟",
    },
    options: [
      { fr: "Décorer les tentes", en: "To decorate tents", ar: "لتزيين الخيام" },
      { fr: "Naviguer la nuit", en: "To navigate at night", ar: "للاهتداء ليلًا" },
      { fr: "Compter le bétail", en: "To count livestock", ar: "لإحصاء الماشية" },
    ],
    answer: 1,
  },
  {
    q: {
      fr: "Quelle étoile annonce le pic de chaleur ?",
      en: "Which star marks the heat peak?",
      ar: "أيُّ نجمٍ يُؤذِن بذروة الحَرّ؟",
    },
    options: [
      { fr: "Sirius", en: "Sirius", ar: "الشِّعرى" },
      { fr: "Les Pléiades", en: "Pleiades", ar: "الثريّا" },
      { fr: "Orion", en: "Orion", ar: "الجبّار" },
    ],
    answer: 0,
  },
];

// ---------- Component ----------
function StargazingPage() {
  const lang = useLang() as Lang;

  return (
    <div className="min-h-dvh bg-background">
      <Header />

      {/* HERO */}
      <section
        className="relative overflow-hidden text-white"
        style={{
          background:
            "radial-gradient(ellipse at 50% 0%, #1a2235 0%, #0c0f1a 55%, #06080f 100%)",
        }}
      >
        {/* twinkling stars (CSS only) */}
        <StarField />
        <div className="relative max-w-4xl mx-auto px-5 sm:px-6 py-20 sm:py-28 text-center">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-white/15 bg-white/5 backdrop-blur-sm text-[11px] uppercase tracking-[0.18em] text-amber-200/90">
            <span aria-hidden className="text-amber-300">⵰ ⵣ</span>
            {t(COPY.badge, lang)}
          </div>
          <h1
            className="mt-6 text-3xl sm:text-5xl md:text-6xl font-semibold tracking-tight"
            style={{
              background:
                "linear-gradient(180deg, #FBE6B3 0%, #D4A24C 60%, #9b6b1f 100%)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundClip: "text",
            }}
          >
            {t(COPY.heroTitle, lang)}
          </h1>
          <p className="mt-4 text-sm sm:text-lg text-white/75 max-w-2xl mx-auto leading-relaxed">
            {t(COPY.heroSub, lang)}
          </p>
        </div>
      </section>

      {/* SECTION 1 — STAR KNOWLEDGE */}
      <section className="max-w-5xl mx-auto px-5 sm:px-6 py-14 sm:py-20">
        <SectionHeader title={t(COPY.starsTitle, lang)} subtitle={t(COPY.starsSub, lang)} />
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {STARS.map((s) => (
            <StarCard key={s.id} star={s} lang={lang} />
          ))}
        </div>
      </section>

      {/* SECTION 2 — DESERT NAVIGATION */}
      <section className="bg-[oklch(0.97_0.02_75)]/60 border-y border-border">
        <div className="max-w-5xl mx-auto px-5 sm:px-6 py-14 sm:py-20">
          <SectionHeader title={t(COPY.navTitle, lang)} subtitle={t(COPY.navSub, lang)} />
          <div className="grid gap-5 md:grid-cols-2 items-stretch">
            <div className="rounded-2xl border border-border bg-card p-6 sm:p-7 shadow-sm hover:shadow-md transition-shadow">
              <div className="flex items-center gap-3 mb-3">
                <CompassIcon />
                <h3 className="text-lg font-semibold text-foreground">
                  {{ fr: "Tenir un cap", en: "Holding a heading", ar: "حفظ المسار" }[lang]}
                </h3>
              </div>
              <p className="text-sm text-muted-foreground leading-relaxed">{t(COPY.navDirection, lang)}</p>
            </div>
            <div className="rounded-2xl border border-border bg-card p-6 sm:p-7 shadow-sm hover:shadow-md transition-shadow">
              <div className="flex items-center gap-3 mb-3">
                <RouteIcon />
                <h3 className="text-lg font-semibold text-foreground">
                  {{ fr: "Suivre les saisons", en: "Following the seasons", ar: "اتباع الفصول" }[lang]}
                </h3>
              </div>
              <p className="text-sm text-muted-foreground leading-relaxed">{t(COPY.navSeason, lang)}</p>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 3 — LIVING CALENDAR */}
      <section className="max-w-5xl mx-auto px-5 sm:px-6 py-14 sm:py-20">
        <SectionHeader title={t(COPY.calendarTitle, lang)} subtitle={t(COPY.calendarSub, lang)} />
        <div className="-mx-5 sm:mx-0 px-5 sm:px-0 overflow-x-auto">
          <ol className="flex gap-4 min-w-max sm:min-w-0 sm:grid sm:grid-cols-4 pb-2">
            {CALENDAR.map((c, i) => (
              <li
                key={i}
                className="w-64 sm:w-auto rounded-2xl border border-border bg-card p-5 shadow-sm hover:shadow-md hover:-translate-y-0.5 transition-all"
              >
                <div className="text-[11px] uppercase tracking-[0.18em] text-amber-700/80">
                  {t(c.when, lang)}
                </div>
                <div className="mt-2 text-base font-semibold text-foreground">
                  {t(c.title, lang)}
                </div>
                <p className="mt-1.5 text-sm text-muted-foreground leading-relaxed">
                  {t(c.detail, lang)}
                </p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* SECTION 4 — CULTURAL STORY */}
      <section className="bg-gradient-to-b from-[oklch(0.96_0.03_75)] to-background border-t border-border">
        <div className="max-w-3xl mx-auto px-5 sm:px-6 py-14 sm:py-20">
          <div className="rounded-3xl border border-amber-700/20 bg-card p-7 sm:p-10 shadow-[0_10px_40px_-20px_rgba(155,107,31,0.45)]">
            <div className="inline-flex items-center gap-2 text-[11px] uppercase tracking-[0.18em] text-amber-700">
              <span aria-hidden>✦</span>
              {t(COPY.oralBadge, lang)}
            </div>
            <h3 className="mt-3 text-2xl sm:text-3xl font-semibold tracking-tight text-foreground">
              {t(COPY.storyTitle, lang)}
            </h3>
            <p
              className="mt-4 text-[15px] sm:text-base leading-[1.85] text-foreground/85"
              style={{ fontFamily: "'Cormorant Garamond', Georgia, serif" }}
            >
              {t(COPY.storyBody, lang)}
            </p>
          </div>
        </div>
      </section>

      {/* SECTION 5 — MINI QUIZ */}
      <section className="max-w-3xl mx-auto px-5 sm:px-6 py-14 sm:py-20">
        <SectionHeader title={t(COPY.quizTitle, lang)} subtitle={t(COPY.quizSub, lang)} />
        <MiniQuiz lang={lang} />
        <div className="mt-10 text-center">
          <Link
            to="/"
            className="inline-flex items-center gap-2 text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
          >
            {t(COPY.backHome, lang)}
          </Link>
        </div>
      </section>
    </div>
  );
}

// ---------- Sub-components ----------
function SectionHeader({ title, subtitle }: { title: string; subtitle: string }) {
  return (
    <div className="text-center max-w-2xl mx-auto mb-10">
      <h2 className="text-2xl sm:text-3xl font-semibold tracking-tight text-foreground">{title}</h2>
      <p className="mt-2 text-sm sm:text-base text-muted-foreground leading-relaxed">{subtitle}</p>
      <div className="mt-4 mx-auto h-px w-16 bg-gradient-to-r from-transparent via-amber-600/60 to-transparent" />
    </div>
  );
}

function StarCard({ star, lang }: { star: Star; lang: Lang }) {
  return (
    <article
      className="group relative rounded-2xl border border-border bg-card overflow-hidden shadow-sm hover:shadow-[0_14px_40px_-20px_rgba(212,162,76,0.55)] hover:-translate-y-0.5 transition-all"
    >
      <div
        className="relative h-32 overflow-hidden"
        style={{
          background:
            "radial-gradient(ellipse at 30% 30%, #2a3450 0%, #11162a 60%, #0a0d18 100%)",
        }}
      >
        <StarField dense />
        <div className="absolute inset-0 flex items-center justify-center">
          <div
            className="w-12 h-12 rounded-full opacity-90 group-hover:opacity-100 transition-opacity"
            style={{
              background:
                "radial-gradient(circle, #FFE9B5 0%, #D4A24C 45%, transparent 70%)",
              boxShadow: "0 0 30px 6px rgba(212,162,76,0.45)",
            }}
            aria-hidden
          />
        </div>
      </div>
      <div className="p-5">
        <div className="flex items-baseline justify-between gap-3">
          <h3 className="text-base font-semibold text-foreground">{t(star.name, lang)}</h3>
          <span className="text-[11px] uppercase tracking-[0.16em] text-amber-700/80">
            {star.amazigh}
          </span>
        </div>
        <div className="mt-1 text-xs text-amber-700/90">{t(star.meaning, lang)}</div>
        <p className="mt-3 text-sm text-muted-foreground leading-relaxed">{t(star.desc, lang)}</p>
      </div>
    </article>
  );
}

function MiniQuiz({ lang }: { lang: Lang }) {
  const [picks, setPicks] = useState<Record<number, number>>({});
  const score = useMemo(
    () => QUIZ.reduce((n, q, i) => (picks[i] === q.answer ? n + 1 : n), 0),
    [picks],
  );
  return (
    <div className="space-y-5">
      {QUIZ.map((q, i) => {
        const picked = picks[i];
        const isAnswered = picked !== undefined;
        const isCorrect = picked === q.answer;
        return (
          <div key={i} className="rounded-2xl border border-border bg-card p-5 shadow-sm">
            <div className="text-sm font-semibold text-foreground">{t(q.q, lang)}</div>
            <div className="mt-3 grid gap-2 sm:grid-cols-3">
              {q.options.map((opt, oi) => {
                const selected = picked === oi;
                const correctOne = isAnswered && oi === q.answer;
                const wrongOne = isAnswered && selected && !isCorrect;
                return (
                  <button
                    key={oi}
                    type="button"
                    onClick={() => setPicks((p) => ({ ...p, [i]: oi }))}
                    className={
                      "text-left text-sm px-3 py-2.5 rounded-xl border transition-all " +
                      (correctOne
                        ? "border-emerald-500/60 bg-emerald-500/10 text-foreground"
                        : wrongOne
                          ? "border-destructive/60 bg-destructive/10 text-foreground"
                          : selected
                            ? "border-amber-600/60 bg-amber-500/10 text-foreground"
                            : "border-border bg-background hover:border-amber-600/40 hover:bg-muted/60 text-foreground")
                    }
                  >
                    {t(opt, lang)}
                  </button>
                );
              })}
            </div>
            {isAnswered && (
              <div
                className={
                  "mt-3 text-xs font-medium " +
                  (isCorrect ? "text-emerald-600" : "text-destructive")
                }
              >
                {isCorrect ? t(COPY.good, lang) : t(COPY.retry, lang)}
              </div>
            )}
          </div>
        );
      })}
      <div className="text-center text-sm text-muted-foreground">
        {{ fr: "Score", en: "Score", ar: "النتيجة" }[lang]}: {score} / {QUIZ.length}
      </div>
    </div>
  );
}

// Tiny inline icons (no extra deps)
function CompassIcon() {
  return (
    <span className="inline-flex w-9 h-9 items-center justify-center rounded-full bg-amber-500/10 text-amber-700">
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="12" r="10" />
        <polygon points="16.24 7.76 14.12 14.12 7.76 16.24 9.88 9.88 16.24 7.76" />
      </svg>
    </span>
  );
}
function RouteIcon() {
  return (
    <span className="inline-flex w-9 h-9 items-center justify-center rounded-full bg-amber-500/10 text-amber-700">
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="6" cy="19" r="3" />
        <circle cx="18" cy="5" r="3" />
        <path d="M6 16V9a4 4 0 0 1 4-4h4a4 4 0 0 1 4 4v0" />
      </svg>
    </span>
  );
}

// CSS-only twinkling star field
function StarField({ dense = false }: { dense?: boolean }) {
  // Deterministic positions so no layout flicker
  const stars = useMemo(() => {
    const count = dense ? 28 : 70;
    const seedA = dense ? 17 : 7;
    const seedB = dense ? 31 : 13;
    return Array.from({ length: count }, (_, i) => {
      const x = ((i * seedA) % 100) + ((i * 3) % 5) / 10;
      const y = ((i * seedB) % 100) + ((i * 7) % 5) / 10;
      const size = ((i * 5) % 3) + 1; // 1..3
      const delay = (i % 9) * 0.4;
      const dur = 2 + (i % 5) * 0.6;
      return { x, y, size, delay, dur };
    });
  }, [dense]);
  return (
    <div className="pointer-events-none absolute inset-0" aria-hidden>
      {stars.map((s, i) => (
        <span
          key={i}
          className="absolute rounded-full bg-white"
          style={{
            left: `${s.x}%`,
            top: `${s.y}%`,
            width: `${s.size}px`,
            height: `${s.size}px`,
            opacity: 0.35,
            boxShadow: "0 0 6px rgba(255,234,180,0.55)",
            animation: `twinkle ${s.dur}s ease-in-out ${s.delay}s infinite`,
          }}
        />
      ))}
      <style>{`
        @keyframes twinkle {
          0%, 100% { opacity: 0.18; transform: scale(0.9); }
          50%      { opacity: 0.95; transform: scale(1.15); }
        }
      `}</style>
    </div>
  );
}

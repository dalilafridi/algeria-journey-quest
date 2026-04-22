import { useEffect, useState } from "react";

export type Lang = "en" | "fr" | "ar";

export const LANGS: { code: Lang; label: string; flag: string }[] = [
  { code: "en", label: "EN", flag: "🇬🇧" },
  { code: "fr", label: "FR", flag: "🇫🇷" },
  { code: "ar", label: "AR", flag: "🇩🇿" },
];

export type Localized<T = string> = { en: T; fr: T; ar: T };

/** Anything that can be either a plain string (legacy) or a translated record. */
export type LocalizedString = string | Localized<string>;

const KEY = "algeria-history-lang-v1";
const EVT = "lang-updated";

export function getLang(): Lang {
  if (typeof window === "undefined") return "en";
  try {
    const v = localStorage.getItem(KEY) as Lang | null;
    if (v === "en" || v === "fr" || v === "ar") return v;
  } catch {
    /* noop */
  }
  // Auto-detect from navigator on first run.
  const nav = (typeof navigator !== "undefined" && navigator.language) || "en";
  if (nav.startsWith("fr")) return "fr";
  if (nav.startsWith("ar")) return "ar";
  return "en";
}

export function setLang(lang: Lang) {
  try {
    localStorage.setItem(KEY, lang);
  } catch {
    /* noop */
  }
  applyDir(lang);
  window.dispatchEvent(new Event(EVT));
}

export function applyDir(lang: Lang) {
  if (typeof document === "undefined") return;
  document.documentElement.lang = lang;
  document.documentElement.dir = lang === "ar" ? "rtl" : "ltr";
}

/** React hook returning the current language and reacting to changes. */
export function useLang(): Lang {
  const [lang, setLangState] = useState<Lang>(() => getLang());
  useEffect(() => {
    const update = () => setLangState(getLang());
    update();
    applyDir(getLang());
    window.addEventListener(EVT, update);
    window.addEventListener("storage", update);
    return () => {
      window.removeEventListener(EVT, update);
      window.removeEventListener("storage", update);
    };
  }, []);
  return lang;
}

/** Translate a LocalizedString. Falls back gracefully to English then raw value. */
export function t(value: LocalizedString | undefined, lang: Lang): string {
  if (value === undefined || value === null) return "";
  if (typeof value === "string") return value;
  return value[lang] ?? value.en ?? "";
}

/** Translate an array of LocalizedString. */
export function tArr(values: LocalizedString[] | undefined, lang: Lang): string[] {
  if (!values) return [];
  return values.map((v) => t(v, lang));
}

// ---- UI strings ----
export const ui = {
  appName: { en: "Algeria Through Time", fr: "L'Algérie à travers le temps", ar: "الجزائر عبر الزمن" },
  timeline: { en: "Timeline", fr: "Chronologie", ar: "المسار الزمني" },
  profile: { en: "Profile", fr: "Profil", ar: "الملف" },
  level: { en: "Lv", fr: "Niv", ar: "مستوى" },
  xp: { en: "XP", fr: "XP", ar: "نقاط" },
  startJourney: { en: "🚀 Start Your Journey", fr: "🚀 Commencer le voyage", ar: "🚀 ابدأ رحلتك" },
  heroSubtitle: {
    en: "From the Numidian kings to the heroes of independence — a fun, story-driven journey through 2,000+ years of history.",
    fr: "Des rois numides aux héros de l'indépendance — un voyage ludique à travers plus de 2 000 ans d'histoire.",
    ar: "من ملوك نوميديا إلى أبطال الاستقلال — رحلة ممتعة عبر أكثر من ألفي سنة من التاريخ.",
  },
  fiveEras: { en: "5 Eras", fr: "5 époques", ar: "5 حقب" },
  fiveErasDesc: { en: "From Numidia to today", fr: "De Numidie à aujourd'hui", ar: "من نوميديا إلى اليوم" },
  funQuizzes: { en: "Fun Quizzes", fr: "Quiz amusants", ar: "اختبارات ممتعة" },
  funQuizzesDesc: { en: "Test what you learn", fr: "Testez vos connaissances", ar: "اختبر معلوماتك" },
  earnBadges: { en: "Earn Badges", fr: "Gagnez des badges", ar: "اكسب الأوسمة" },
  earnBadgesDesc: { en: "Become a history hero", fr: "Devenez un héros de l'histoire", ar: "كن بطل التاريخ" },
  didYouKnow: { en: "Did you know?", fr: "Le saviez-vous ?", ar: "هل تعلم؟" },
  keyFigures: { en: "Key Figures", fr: "Personnages clés", ar: "شخصيات بارزة" },
  keyPlaces: { en: "Key Places", fr: "Lieux clés", ar: "أماكن مهمة" },
  mapOfKeyPlaces: { en: "Map of Key Places", fr: "Carte des lieux clés", ar: "خريطة الأماكن البارزة" },
  takeQuiz: { en: "🎯 Take the Quiz", fr: "🎯 Faire le quiz", ar: "🎯 ابدأ الاختبار" },
  backToTimeline: { en: "← Back to timeline", fr: "← Retour à la chronologie", ar: "← العودة للمسار" },
  backTo: { en: "← Back to", fr: "← Retour à", ar: "← العودة إلى" },
  journeyTitle: { en: "The Journey", fr: "Le voyage", ar: "الرحلة" },
  journeyDesc: {
    en: "Tap an era to explore. Complete its quiz to unlock the next!",
    fr: "Touchez une époque pour explorer. Terminez son quiz pour débloquer la suivante !",
    ar: "اضغط على حقبة لاستكشافها. أكمل الاختبار لفتح التالية!",
  },
  chapter: { en: "Chapter", fr: "Chapitre", ar: "الفصل" },
  locked: { en: "Locked", fr: "Verrouillé", ar: "مغلق" },
  finishPrev: {
    en: "Finish the previous quiz to unlock.",
    fr: "Terminez le quiz précédent pour débloquer.",
    ar: "أكمل الاختبار السابق للفتح.",
  },
  yourJourney: { en: "Your Journey", fr: "Votre parcours", ar: "رحلتك" },
  trackProgress: {
    en: "Track your progress through Algerian history.",
    fr: "Suivez votre progression à travers l'histoire algérienne.",
    ar: "تابع تقدمك في تاريخ الجزائر.",
  },
  totalXp: { en: "Total XP", fr: "XP total", ar: "إجمالي النقاط" },
  badges: { en: "Badges", fr: "Badges", ar: "الأوسمة" },
  completion: { en: "Completion", fr: "Achèvement", ar: "الإنجاز" },
  noBadges: {
    en: "No badges yet — complete a quiz with a perfect score to earn one! 🏆",
    fr: "Aucun badge pour l'instant — réussissez un quiz parfait pour en gagner un ! 🏆",
    ar: "لا أوسمة بعد — أكمل اختبارًا بنتيجة كاملة لتربح واحدًا! 🏆",
  },
  eraProgress: { en: "Era progress", fr: "Progression par époque", ar: "تقدم الحقب" },
  continueJourney: { en: "Continue your journey →", fr: "Continuer le voyage →", ar: "تابع رحلتك ←" },
  question: { en: "Question", fr: "Question", ar: "سؤال" },
  score: { en: "Score", fr: "Score", ar: "النتيجة" },
  streak: { en: "streak", fr: "série", ar: "متتالية" },
  next: { en: "Next question →", fr: "Question suivante →", ar: "السؤال التالي ←" },
  seeResults: { en: "See results 🎉", fr: "Voir les résultats 🎉", ar: "عرض النتائج 🎉" },
  perfectRun: { en: "Perfect run!", fr: "Parcours parfait !", ar: "أداء مثالي!" },
  wellDone: { en: "Well done!", fr: "Bien joué !", ar: "أحسنت!" },
  keepGoing: { en: "Keep going!", fr: "Continuez !", ar: "واصل!" },
  youScored: { en: "You scored", fr: "Vous avez obtenu", ar: "حصلت على" },
  outOf: { en: "out of", fr: "sur", ar: "من" },
  xpEarned: { en: "XP earned", fr: "XP gagnés", ar: "نقاط مكتسبة" },
  bestStreak: { en: "Best streak", fr: "Meilleure série", ar: "أفضل متتالية" },
  accuracy: { en: "Accuracy", fr: "Précision", ar: "الدقة" },
  xpSaved: { en: "XP saved to profile", fr: "XP enregistrés au profil", ar: "النقاط محفوظة" },
  badgeUnlocked: { en: "Badge unlocked", fr: "Badge débloqué", ar: "وسام جديد" },
  badgeEarned: { en: "Badge earned", fr: "Badge gagné", ar: "وسام مكتسب" },
  reviewAnswers: { en: "📖 Review answers", fr: "📖 Revoir les réponses", ar: "📖 مراجعة الإجابات" },
  hideReview: { en: "Hide review", fr: "Masquer la revue", ar: "إخفاء المراجعة" },
  newQuestions: { en: "🔁 New questions", fr: "🔁 Nouvelles questions", ar: "🔁 أسئلة جديدة" },
  yourAnswer: { en: "Your answer:", fr: "Votre réponse :", ar: "إجابتك:" },
  correctAnswer: { en: "Correct answer:", fr: "Bonne réponse :", ar: "الإجابة الصحيحة:" },
  correct: { en: "Correct", fr: "Correct", ar: "صحيح" },
  wrong: { en: "Wrong", fr: "Faux", ar: "خاطئ" },
  whoAmI: { en: "Who am I?", fr: "Qui suis-je ?", ar: "من أنا؟" },
  trueLabel: { en: "✅ True", fr: "✅ Vrai", ar: "✅ صحيح" },
  falseLabel: { en: "❌ False", fr: "❌ Faux", ar: "❌ خطأ" },
  trueShort: { en: "True", fr: "Vrai", ar: "صحيح" },
  falseShort: { en: "False", fr: "Faux", ar: "خطأ" },
  noAnswer: { en: "No answer", fr: "Pas de réponse", ar: "لا توجد إجابة" },
  orderPrompt: {
    en: "Use the arrows to put events from earliest to latest.",
    fr: "Utilisez les flèches pour ordonner du plus ancien au plus récent.",
    ar: "استخدم الأسهم لترتيب الأحداث من الأقدم إلى الأحدث.",
  },
  lockOrder: { en: "Lock in order", fr: "Valider l'ordre", ar: "تأكيد الترتيب" },
  correctOrder: { en: "Correct order:", fr: "Bon ordre :", ar: "الترتيب الصحيح:" },
  typeMcq: { en: "Multiple choice", fr: "Choix multiple", ar: "اختيار من متعدد" },
  typeTf: { en: "True or False", fr: "Vrai ou Faux", ar: "صحيح أم خطأ" },
  typeWho: { en: "Who am I?", fr: "Qui suis-je ?", ar: "من أنا؟" },
  typeOrder: { en: "Timeline order", fr: "Ordre chronologique", ar: "ترتيب زمني" },
  typeImage: { en: "Picture round", fr: "Question image", ar: "صورة" },
  difficultyEasy: { en: "Easy", fr: "Facile", ar: "سهل" },
  difficultyMedium: { en: "Medium", fr: "Moyen", ar: "متوسط" },
  difficultyHard: { en: "Hard", fr: "Difficile", ar: "صعب" },

  // Figures section
  figures: {
    en: "Figures",
    fr: "Figures",
    ar: "أعلام",
  },
  figuresTitle: {
    en: "Great Figures of Algeria",
    fr: "Grandes figures de l'histoire de l'Algérie",
    ar: "أعلام التاريخ الجزائري",
  },
  figuresSubtitle: {
    en: "A small museum of the people who shaped Algerian history — explore their stories, why they matter, and one striking fact each.",
    fr: "Un petit musée de celles et ceux qui ont façonné l'histoire algérienne — découvrez leurs histoires, leur importance et un fait marquant.",
    ar: "متحف صغير لمن صنعوا تاريخ الجزائر — اكتشف قصصهم وأهميّتهم ومعلومة لافتة عن كلّ منهم.",
  },
  searchFigures: { en: "Search a name…", fr: "Rechercher un nom…", ar: "ابحث عن اسم…" },
  filterAll: { en: "All", fr: "Tous", ar: "الكل" },
  filterEra: { en: "Era", fr: "Époque", ar: "الحقبة" },
  filterRegion: { en: "Region", fr: "Région", ar: "المنطقة" },
  noFigureMatch: {
    en: "No figure matches your filters.",
    fr: "Aucune figure ne correspond à vos filtres.",
    ar: "لا توجد شخصية تطابق بحثك.",
  },
  whyTheyMatter: { en: "Why they matter", fr: "Pourquoi cette figure compte", ar: "لماذا هذه الشخصية مهمة" },
  theirStory: { en: "Their story", fr: "Leur histoire", ar: "قصّتها" },
  oneFact: { en: "Did you know?", fr: "Le saviez-vous ?", ar: "هل تعلم؟" },
  relatedEra: { en: "Related era", fr: "Époque liée", ar: "الحقبة المرتبطة" },
  guessThisFigureCta: { en: "🕵️ Try the Guess the Figure quiz", fr: "🕵️ Essayer le quiz Devine la figure", ar: "🕵️ جرّب اختبار خمن الشخصية" },
  backToFigures: { en: "← Back to figures", fr: "← Retour aux figures", ar: "← العودة إلى الأعلام" },
  guessTheFigure: { en: "Guess the Figure", fr: "Devine la figure", ar: "خمّن الشخصية" },
  guessTheFigureDesc: {
    en: "Read the clues and pick the right person from Algerian history.",
    fr: "Lis les indices et choisis la bonne personnalité de l'histoire algérienne.",
    ar: "اقرأ الأدلّة واختر الشخصية الصحيحة من تاريخ الجزائر.",
  },
  startGuessQuiz: { en: "🚀 Start the quiz", fr: "🚀 Lancer le quiz", ar: "🚀 ابدأ الاختبار" },
  clues: { en: "Clues", fr: "Indices", ar: "الأدلّة" },
  exploreFigures: { en: "Explore figures", fr: "Explorer les figures", ar: "تصفّح الأعلام" },
  homeFiguresTitle: { en: "Great Figures", fr: "Grandes figures", ar: "أعلام كبار" },
  homeFiguresDesc: {
    en: "Meet the people behind the eras.",
    fr: "Découvrez les personnalités derrière les époques.",
    ar: "تعرّف على الشخصيات وراء الحقب.",
  },
  journeySubtitle: {
    en: "Tap an era to explore and unlock the next.",
    fr: "Touchez une époque pour explorer et débloquer la suivante.",
    ar: "اضغط على حقبة لاستكشافها وفتح التالية.",
  },
  filterAllEras: { en: "All Eras", fr: "Toutes les époques", ar: "كل الحقب" },
  filterAncient: { en: "Ancient", fr: "Antique", ar: "العصور القديمة" },
  filterIslamic: { en: "Islamic", fr: "Islamique", ar: "إسلامية" },
  filterColonial: { en: "Colonial", fr: "Coloniale", ar: "الاستعمار" },
  filterModern: { en: "Modern", fr: "Moderne", ar: "حديثة" },
  statusUnlocked: { en: "Unlocked", fr: "Débloqué", ar: "مفتوح" },
  statusNew: { en: "New", fr: "Nouveau", ar: "جديد" },
  continueBtn: { en: "Continue", fr: "Continuer", ar: "متابعة" },
  startBtn: { en: "Start", fr: "Commencer", ar: "ابدأ" },
  lockedBtn: { en: "Locked", fr: "Verrouillé", ar: "مغلق" },
  funFactsDiscovered: { en: "Fun facts discovered", fr: "Faits découverts", ar: "حقائق مكتشفة" },
  yourProgress: { en: "Your progress", fr: "Votre progression", ar: "تقدّمك" },
  erasCompleted: { en: "Eras completed", fr: "Époques terminées", ar: "حقب مكتملة" },
  quizzesCompleted: { en: "Quizzes completed", fr: "Quiz terminés", ar: "اختبارات مكتملة" },
  factsCount: { en: "Fun facts", fr: "Faits marquants", ar: "حقائق ممتعة" },

  // Brand / splash / loading
  splashTagline: {
    en: "From ancient kingdoms to modern heroes",
    fr: "Des royaumes anciens aux héros modernes",
    ar: "من الممالك القديمة إلى أبطال العصر الحديث",
  },
  loadingJourney: {
    en: "Loading your journey…",
    fr: "Chargement de votre voyage…",
    ar: "جارٍ تحميل رحلتك…",
  },
  loadingEraNumidian: { en: "Numidian Kingdoms", fr: "Royaumes numides", ar: "الممالك النوميدية" },
  loadingEraRoman: { en: "Roman Era", fr: "Époque romaine", ar: "العصر الروماني" },
  loadingEraIslamic: { en: "Islamic Era", fr: "Époque islamique", ar: "العصر الإسلامي" },
  loadingEraOttoman: { en: "Ottoman Era", fr: "Époque ottomane", ar: "العصر العثماني" },
  loadingEraFrench: { en: "French Colonial Era", fr: "Colonisation française", ar: "الاستعمار الفرنسي" },
  loadingEraIndependence: {
    en: "Independence & Modern",
    fr: "Indépendance & Moderne",
    ar: "الاستقلال والعصر الحديث",
  },

  // Lessons / Map / Reset
  lessons: { en: "Lessons", fr: "Leçons", ar: "دروس" },
  oneMinuteLesson: { en: "1-Minute Lesson", fr: "Leçon en 1 minute", ar: "درس في دقيقة" },
  mapExplorer: { en: "Map Explorer", fr: "Explorateur de carte", ar: "مستكشف الخريطة" },
  mapExplorerDesc: {
    en: "Discover history by region.",
    fr: "Découvrez l'histoire par région.",
    ar: "اكتشف التاريخ حسب المنطقة.",
  },
  lessonsHomeDesc: {
    en: "Quick lessons on key moments.",
    fr: "Leçons rapides sur les moments clés.",
    ar: "دروس سريعة عن لحظات مهمّة.",
  },
  resetQuizzes: { en: "Reset Quizzes", fr: "Réinitialiser les quiz", ar: "إعادة ضبط الاختبارات" },
  resetScoresOnly: {
    en: "Reset quiz scores only",
    fr: "Réinitialiser uniquement les scores",
    ar: "إعادة ضبط النتائج فقط",
  },
  resetAllProgress: {
    en: "Reset all quiz progress",
    fr: "Réinitialiser tout le progrès",
    ar: "إعادة ضبط كل التقدّم",
  },
  resetConfirm: {
    en: "Are you sure you want to reset your quiz progress?",
    fr: "Êtes-vous sûr de vouloir réinitialiser votre progression ?",
    ar: "هل أنت متأكد من إعادة ضبط تقدّم الاختبارات؟",
  },
  resetWarnAll: {
    en: "This will clear scores, badges, and XP. App content stays.",
    fr: "Cela effacera scores, badges et XP. Le contenu de l'app reste.",
    ar: "سيتم مسح النتائج والأوسمة ونقاط الخبرة. يبقى محتوى التطبيق.",
  },
  resetWarnScores: {
    en: "This will clear scores only. Badges and XP stay.",
    fr: "Cela effacera seulement les scores. Badges et XP restent.",
    ar: "سيتم مسح النتائج فقط. تبقى الأوسمة ونقاط الخبرة.",
  },
  cancel: { en: "Cancel", fr: "Annuler", ar: "إلغاء" },
  confirm: { en: "Confirm", fr: "Confirmer", ar: "تأكيد" },
  resetDone: { en: "Quiz progress reset.", fr: "Progression réinitialisée.", ar: "تمت إعادة الضبط." },
} satisfies Record<string, Localized<string>>;

export type UiKey = keyof typeof ui;
export function tu(key: UiKey, lang: Lang): string {
  return t(ui[key], lang);
}

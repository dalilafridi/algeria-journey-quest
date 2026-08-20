/**
 * Global museum navigation directory.
 *
 * Source of truth for the masthead (desktop) and the mobile directory drawer.
 * Every destination below points at a route that already exists in
 * src/routes. No placeholder pages, no invented paths.
 */

export type Tri = { en: string; fr: string; ar: string };

export type NavItem = {
  label: Tri;
  to: string;
  params?: Record<string, string>;
  search?: Record<string, string>;
  hash?: string;
  desc?: Tri;
};

export type NavSection = {
  id: string;
  label: Tri;
  /** Top level destination, always clickable. */
  to: string;
  items: NavItem[];
  /** Route prefixes that light up this section. */
  match: (path: string) => boolean;
  /** Two column directory when the list is long. */
  columns?: 1 | 2;
};

const L = (en: string, fr: string, ar: string): Tri => ({ en, fr, ar });

export const NAV_SECTIONS: NavSection[] = [
  {
    id: "journey",
    label: L("Begin the Journey", "Commencer la visite", "ابدأ الرحلة"),
    to: "/",
    match: (p) => p === "/" || p.startsWith("/showcase") || p.startsWith("/journeys") || p.startsWith("/profile"),
    items: [
      {
        label: L("Museum Entrance", "Entrée du musée", "مدخل المتحف"),
        to: "/",
        desc: L("Start at the entrance hall", "Commencez par le hall d'accueil", "ابدأ من قاعة الاستقبال"),
      },
      {
        label: L("Current Exhibition", "Exposition en cours", "المعرض الحالي"),
        to: "/showcase",
        desc: L("The featured exhibits of the season", "Les vitrines mises en avant", "المعروضات المميّزة"),
      },
      {
        label: L("Guided Journey", "Parcours guidé", "جولة موجهة"),
        to: "/timeline",
        desc: L("Walk the eras in order", "Parcourez les ères dans l'ordre", "تصفّح الحقب بالترتيب"),
      },
      {
        label: L("My Progress", "Ma progression", "تقدّمي"),
        to: "/profile",
        desc: L("Your visit, saved", "Votre visite, enregistrée", "زيارتك محفوظة"),
      },
    ],
  },
  {
    id: "history",
    label: L("History", "Histoire", "التاريخ"),
    to: "/timeline",
    match: (p) =>
      p.startsWith("/timeline") ||
      p.startsWith("/era") ||
      p.startsWith("/quiz") ||
      p.startsWith("/moments") ||
      p.startsWith("/chronicle") ||
      p.startsWith("/lessons") ||
      p.startsWith("/ideas") ||
      p.startsWith("/compare"),
    columns: 2,
    items: [
      {
        label: L("Timeline", "Chronologie", "الخط الزمني"),
        to: "/timeline",
        desc: L("Every era, end to end", "Toutes les ères, d'un bout à l'autre", "كل الحقب من البداية إلى النهاية"),
      },
      { label: L("Historical Moments", "Moments historiques", "لحظات تاريخية"), to: "/moments" },
      { label: L("Chronicle", "Chronique", "السجل"), to: "/chronicle" },
      { label: L("Compare Eras", "Comparer les ères", "قارن بين الحقب"), to: "/compare", search: { kind: "eras" } },
      { label: L("Lessons", "Leçons", "دروس"), to: "/lessons" },
      { label: L("Ideas and Debates", "Idées et débats", "أفكار ونقاشات"), to: "/ideas" },
    ],
  },
  {
    id: "places",
    label: L("Places", "Lieux", "الأماكن"),
    to: "/atlas",
    match: (p) => p.startsWith("/atlas") || p.startsWith("/map") || p.startsWith("/region") || p.startsWith("/mzab") || p.startsWith("/stargazing"),
    columns: 2,
    items: [
      {
        label: L("Interactive Atlas", "Atlas interactif", "الأطلس التفاعلي"),
        to: "/atlas",
        desc: L("Read the land through time", "Lire le territoire à travers le temps", "اقرأ الأرض عبر الزمن"),
      },
      { label: L("Regions", "Régions", "المناطق"), to: "/map" },
      {
        label: L("The M'Zab Valley", "La vallée du M'Zab", "وادي مزاب"),
        to: "/mzab",
        desc: L("Masterpiece exhibit", "Vitrine maîtresse", "معروض رئيسي"),
      },
      { label: L("Kabylie", "Kabylie", "منطقة القبائل"), to: "/region/$regionId", params: { regionId: "kabylie" } },
      { label: L("Algiers", "Alger", "الجزائر العاصمة"), to: "/region/$regionId", params: { regionId: "algiers" } },
      { label: L("Aurès", "Aurès", "الأوراس"), to: "/region/$regionId", params: { regionId: "aures" } },
      { label: L("Constantine", "Constantine", "قسنطينة"), to: "/region/$regionId", params: { regionId: "constantine" } },
      { label: L("Oran and the West", "Oran et l'Ouest", "وهران والغرب"), to: "/region/$regionId", params: { regionId: "oran-west" } },
      { label: L("The Sahara", "Le Sahara", "الصحراء"), to: "/region/$regionId", params: { regionId: "sahara" } },
      { label: L("Amazigh Stargazing", "Astronomie amazighe", "علم الفلك الأمازيغي"), to: "/stargazing" },
    ],
  },
  {
    id: "people",
    label: L("People", "Personnalités", "الشخصيات"),
    to: "/figures",
    match: (p) => p.startsWith("/figures") || p.startsWith("/women-of-independence"),
    items: [
      {
        label: L("Hall of Legends", "Galerie des légendes", "قاعة الأساطير"),
        to: "/figures",
        desc: L("Historical figures of Algeria", "Les figures historiques de l'Algérie", "شخصيات الجزائر التاريخية"),
      },
      {
        label: L("Women of the Revolution", "Les femmes de la Révolution", "نساء الثورة"),
        to: "/women-of-independence",
        desc: L("1954 – 1962", "1954 – 1962", "1954 – 1962"),
      },
      { label: L("Figures Quiz", "Quiz des figures", "اختبار الشخصيات"), to: "/figures/quiz" },
      { label: L("Compare Figures", "Comparer les figures", "قارن بين الشخصيات"), to: "/compare", search: { kind: "figures" } },
    ],
  },
  {
    id: "culture",
    label: L("Culture", "Culture", "الثقافة"),
    to: "/culture",
    match: (p) => p.startsWith("/culture") || p.startsWith("/cuisine") || p.startsWith("/cinema") || p.startsWith("/words"),
    columns: 2,
    items: [
      {
        label: L("Culture Hall", "Salle de la culture", "قاعة الثقافة"),
        to: "/culture",
        desc: L("The full cultural collection", "L'ensemble de la collection culturelle", "المجموعة الثقافية كاملة"),
      },
      { label: L("Cuisine", "Cuisine", "المطبخ"), to: "/cuisine" },
      { label: L("Cinema", "Cinéma", "السينما"), to: "/cinema" },
      { label: L("Music", "Musique", "الموسيقى"), to: "/culture/$topicId", params: { topicId: "music" } },
      { label: L("Words and Language", "Paroles et langue", "الكلمات واللغة"), to: "/words" },
      { label: L("Oral Traditions", "Traditions orales", "التقاليد الشفوية"), to: "/culture/$topicId", params: { topicId: "oral-traditions" } },
      { label: L("Architecture", "Architecture", "العمارة"), to: "/culture/$topicId", params: { topicId: "architecture" } },
      { label: L("Festivals", "Fêtes et festivals", "الاحتفالات"), to: "/culture/$topicId", params: { topicId: "festivals" } },
      { label: L("Literature", "Littérature", "الأدب"), to: "/culture/$topicId", params: { topicId: "literature" } },
      {
        label: L("Kabyle Jewelry", "Bijoux kabyles", "الحلي القبائلية"),
        to: "/region/$regionId",
        params: { regionId: "kabylie" },
        hash: "jewelry",
      },
    ],
  },
  {
    id: "football",
    label: L("Football", "Football", "كرة القدم"),
    to: "/football",
    match: (p) => p.startsWith("/football") || p.startsWith("/clubs") || p.startsWith("/theater"),
    columns: 2,
    items: [
      {
        label: L("Hall of Algerian Football", "Musée du football algérien", "متحف الكرة الجزائرية"),
        to: "/football",
        desc: L("The complete football museum", "L'ensemble du musée du football", "متحف كرة القدم كاملاً"),
      },
      { label: L("National Team", "Équipe nationale", "المنتخب الوطني"), to: "/football", hash: "national-team" },
      { label: L("Algeria at the World Cup", "L'Algérie en Coupe du monde", "الجزائر في كأس العالم"), to: "/football", hash: "world-cup" },
      { label: L("AFCON History", "Histoire de la CAN", "تاريخ كأس أفريقيا"), to: "/football", hash: "afcon" },
      { label: L("The FLN Team", "L'équipe du FLN", "فريق جبهة التحرير"), to: "/football", hash: "fln-team" },
      { label: L("Legends", "Légendes", "الأساطير"), to: "/football", hash: "legends" },
      { label: L("Stadiums", "Stades", "الملاعب"), to: "/football", hash: "stadiums" },
      { label: L("Gijón 1982", "Gijón 1982", "خيخون 1982"), to: "/theater/$matchId", params: { matchId: "gijon-1982" } },
      { label: L("Les Vertes, Women's Team", "Les Vertes, équipe féminine", "المنتخب الجزائري النسوي"), to: "/football/lesvertes" },
      { label: L("Club Museums", "Musées des clubs", "متاحف الأندية"), to: "/clubs" },
      { label: L("JS Kabylie", "JS Kabylie", "شبيبة القبائل"), to: "/clubs/$clubId", params: { clubId: "js-kabylie" } },
    ],
  },
  {
    id: "about",
    label: L("About", "À propos", "حول"),
    to: "/about",
    match: (p) =>
      p.startsWith("/about") || p.startsWith("/sources") || p.startsWith("/credits") || p.startsWith("/privacy") || p.startsWith("/terms"),
    items: [
      {
        label: L("About DZ Odyssey", "À propos de DZ Odyssey", "عن DZ Odyssey"),
        to: "/about",
        desc: L("The museum and its curator", "Le musée et sa curatrice", "المتحف وأمينته"),
      },
      { label: L("Sources and Editorial Method", "Sources et méthode éditoriale", "المصادر والمنهج التحريري"), to: "/sources" },
      { label: L("Credits", "Crédits", "شكر وتقدير"), to: "/credits" },
      { label: L("Corrections and Suggestions", "Corrections et suggestions", "التصويبات والاقتراحات"), to: "/about", hash: "contact-corrections" },
      { label: L("Privacy", "Confidentialité", "الخصوصية"), to: "/privacy" },
      { label: L("Terms", "Conditions d'utilisation", "شروط الاستخدام"), to: "/terms" },
    ],
  },
];

export const NAV_UI = {
  brandName: L("DZ Odyssey", "DZ Odyssey", "DZ Odyssey"),
  brandSub: L("Algeria Through Time", "L'Algérie à travers le temps", "الجزائر عبر الزمن"),
  search: L("Search", "Rechercher", "بحث"),
  language: L("Language", "Langue", "اللغة"),
  passport: L("My Passport", "Mon passeport", "جواز زيارتي"),
  menu: L("Menu", "Menu", "القائمة"),
  close: L("Close", "Fermer", "إغلاق"),
  directory: L("Museum directory", "Répertoire du musée", "دليل المتحف"),
  creatorNote: L("Creator's note", "Note de la créatrice", "كلمة المُنشئة"),
};

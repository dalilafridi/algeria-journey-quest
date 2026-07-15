import type { Localized } from "@/lib/i18n";

/**
 * "On This Day in Algerian History" — a curated calendar of moments.
 *
 * Each entry pairs a date (month/day), a historical event, a historical
 * figure alive/central to it, and a related museum exhibit (era or region).
 *
 * The card selects today's entry by exact month+day match; if no match, it
 * falls back deterministically to a rotating entry from the list so every
 * day of the year surfaces something.
 */

const L = (en: string, fr: string, ar: string): Localized<string> => ({ en, fr, ar });

export type OnThisDayEntry = {
  id: string;
  month: number; // 1–12
  day: number; // 1–31
  year: number;
  yearLabel?: string; // e.g. "148 BC" — display override
  event: Localized<string>;
  figureId: string;
  figureName: Localized<string>;
  /** Related museum exhibit — deep-link. */
  exhibit:
    | { kind: "era"; id: string }
    | { kind: "region"; id: string }
    | { kind: "figure"; id: string };
  exhibitLabel: Localized<string>;
  /** A short poetic caption for the postcard image. */
  imageCaption: Localized<string>;
  /** Emoji used inside the engraved medallion illustration. */
  medallionEmoji: string;
};

export const onThisDay: OnThisDayEntry[] = [
  {
    id: "toussaint-rouge",
    month: 11,
    day: 1,
    year: 1954,
    event: L(
      "The Toussaint Rouge — coordinated attacks announce the start of the Algerian War of Independence.",
      "La Toussaint Rouge — des attaques coordonnées annoncent le début de la guerre d'indépendance algérienne.",
      "الفاتح من نوفمبر — عمليات منسّقة تعلن انطلاق حرب التحرير الجزائرية.",
    ),
    figureId: "mostefa-ben-boulaid",
    figureName: L("Mostefa Ben Boulaïd", "Mostefa Ben Boulaïd", "مصطفى بن بولعيد"),
    exhibit: { kind: "era", id: "independence" },
    exhibitLabel: L("War of Independence exhibit", "Salle de la guerre d'indépendance", "قاعة حرب الاستقلال"),
    imageCaption: L("A candle lit at dawn.", "Une bougie allumée à l'aube.", "شمعة تُشعل عند الفجر."),
    medallionEmoji: "🕯️",
  },
  {
    id: "independence-day",
    month: 7,
    day: 5,
    year: 1962,
    event: L(
      "Algeria formally declares its independence, ending 132 years of French colonial rule.",
      "L'Algérie proclame officiellement son indépendance, mettant fin à 132 ans de domination coloniale française.",
      "الجزائر تعلن رسميًا استقلالها، منهيةً 132 عامًا من الاستعمار الفرنسي.",
    ),
    figureId: "ben-bella",
    figureName: L("Ahmed Ben Bella", "Ahmed Ben Bella", "أحمد بن بلة"),
    exhibit: { kind: "era", id: "independence" },
    exhibitLabel: L("Independence exhibit", "Salle de l'indépendance", "قاعة الاستقلال"),
    imageCaption: L("The green-white-red rises.", "Le vert-blanc-rouge s'élève.", "الأخضر والأبيض والأحمر يرتفع."),
    medallionEmoji: "🇩🇿",
  },
  {
    id: "algiers-fall-1830",
    month: 7,
    day: 5,
    year: 1830,
    event: L(
      "French forces enter the city of Algiers, beginning the colonial period.",
      "Les troupes françaises entrent dans la ville d'Alger, ouvrant la période coloniale.",
      "القوات الفرنسية تدخل مدينة الجزائر، لتبدأ الحقبة الاستعمارية.",
    ),
    figureId: "hassan-pacha",
    figureName: L("Hussein Dey", "Hussein Dey", "الداي حسين"),
    exhibit: { kind: "era", id: "french" },
    exhibitLabel: L("French Colonization exhibit", "Salle de la colonisation française", "قاعة الاستعمار الفرنسي"),
    imageCaption: L("Smoke over the Casbah.", "Fumée au-dessus de la Casbah.", "دخان يعلو القصبة."),
    medallionEmoji: "⚓",
  },
  {
    id: "setif-massacre",
    month: 5,
    day: 8,
    year: 1945,
    event: L(
      "As Europe celebrates victory, peaceful marches in Sétif, Guelma and Kherrata are met with a colonial massacre — a turning point toward the war for independence.",
      "Alors que l'Europe fête la victoire, des marches pacifiques à Sétif, Guelma et Kherrata sont réprimées dans un massacre colonial — un tournant vers la guerre d'indépendance.",
      "بينما تحتفل أوروبا بالنصر، تُقمَع مسيرات سلمية في سطيف وقالمة وخراطة بمجزرة استعمارية — نقطة تحوّل نحو حرب الاستقلال.",
    ),
    figureId: "ferhat-abbas",
    figureName: L("Ferhat Abbas", "Ferhat Abbas", "فرحات عباس"),
    exhibit: { kind: "era", id: "french" },
    exhibitLabel: L("French Colonization exhibit", "Salle de la colonisation française", "قاعة الاستعمار الفرنسي"),
    imageCaption: L("Olive branches at half-mast.", "Rameaux d'olivier en berne.", "أغصان زيتون منكّسة."),
    medallionEmoji: "🌿",
  },
  {
    id: "soummam-congress",
    month: 8,
    day: 20,
    year: 1956,
    event: L(
      "The Soummam Congress meets in Kabylie, organising the FLN and setting the political direction of the revolution.",
      "Le Congrès de la Soummam se tient en Kabylie, structurant le FLN et fixant la direction politique de la révolution.",
      "انعقاد مؤتمر الصومام في القبائل، لتنظيم جبهة التحرير الوطني وتحديد التوجّه السياسي للثورة.",
    ),
    figureId: "abane-ramdane",
    figureName: L("Abane Ramdane", "Abane Ramdane", "عبان رمضان"),
    exhibit: { kind: "region", id: "kabylie" },
    exhibitLabel: L("Kabylie regional hall", "Salle régionale de Kabylie", "قاعة القبائل الإقليمية"),
    imageCaption: L("Mountain assembly at dusk.", "Assemblée de montagne au crépuscule.", "اجتماع الجبال عند الغسق."),
    medallionEmoji: "🏔️",
  },
  {
    id: "evian-accords",
    month: 3,
    day: 18,
    year: 1962,
    event: L(
      "The Evian Accords are signed, agreeing a ceasefire and the path to Algerian independence.",
      "Les Accords d'Évian sont signés, actant un cessez-le-feu et la voie vers l'indépendance algérienne.",
      "توقيع اتفاقيات إيفيان، بإعلان وقف إطلاق النار والطريق نحو استقلال الجزائر.",
    ),
    figureId: "krim-belkacem",
    figureName: L("Krim Belkacem", "Krim Belkacem", "كريم بلقاسم"),
    exhibit: { kind: "era", id: "independence" },
    exhibitLabel: L("Independence exhibit", "Salle de l'indépendance", "قاعة الاستقلال"),
    imageCaption: L("Two pens, one horizon.", "Deux plumes, un horizon.", "قلمان وأفق واحد."),
    medallionEmoji: "🕊️",
  },
  {
    id: "berber-spring",
    month: 4,
    day: 20,
    year: 1980,
    event: L(
      "Tafsut Imazighen — the Berber Spring — begins in Kabylie, demanding recognition of the Amazigh language and identity.",
      "Tafsut Imazighen — le Printemps berbère — commence en Kabylie, exigeant la reconnaissance de la langue et de l'identité amazighes.",
      "تافسوت إيمازيغن — الربيع الأمازيغي — ينطلق في القبائل مطالبًا بالاعتراف باللغة والهوية الأمازيغية.",
    ),
    figureId: "mammeri",
    figureName: L("Mouloud Mammeri", "Mouloud Mammeri", "مولود معمري"),
    exhibit: { kind: "region", id: "kabylie" },
    exhibitLabel: L("Kabylie regional hall", "Salle régionale de Kabylie", "قاعة القبائل الإقليمية"),
    imageCaption: L("A yaz sign in the wind.", "Un signe yaz dans le vent.", "علامة ياز تراقص الريح."),
    medallionEmoji: "ⵣ",
  },
  {
    id: "abdelkader-surrender",
    month: 12,
    day: 23,
    year: 1847,
    event: L(
      "After fifteen years of resistance, Emir Abdelkader surrenders — his ethical conduct of war admired across Europe.",
      "Après quinze ans de résistance, l'Émir Abdelkader se rend — sa conduite éthique de la guerre est saluée à travers l'Europe.",
      "بعد خمسة عشر عامًا من المقاومة، يستسلم الأمير عبد القادر — وسلوكه الأخلاقي في الحرب موضع إعجاب في كل أوروبا.",
    ),
    figureId: "abdelkader",
    figureName: L("Emir Abdelkader", "Émir Abdelkader", "الأمير عبد القادر"),
    exhibit: { kind: "figure", id: "abdelkader" },
    exhibitLabel: L("Emir Abdelkader plaque", "Plaque de l'Émir Abdelkader", "لوحة الأمير عبد القادر"),
    imageCaption: L("A sabre laid down with honour.", "Un sabre déposé avec honneur.", "سيف يُوضع بشرف."),
    medallionEmoji: "🗡️",
  },
  {
    id: "battle-of-algiers",
    month: 1,
    day: 7,
    year: 1957,
    event: L(
      "The Battle of Algiers intensifies as paratroopers take control of the city, drawing worldwide attention to the Algerian cause.",
      "La bataille d'Alger s'intensifie avec la prise de la ville par les parachutistes, attirant l'attention mondiale sur la cause algérienne.",
      "معركة الجزائر تحتدم مع سيطرة المظليين على المدينة، لتلفت أنظار العالم إلى القضية الجزائرية.",
    ),
    figureId: "ali-la-pointe",
    figureName: L("Ali La Pointe", "Ali La Pointe", "علي لابوانت"),
    exhibit: { kind: "region", id: "algiers" },
    exhibitLabel: L("Algiers regional hall", "Salle régionale d'Alger", "قاعة الجزائر العاصمة الإقليمية"),
    imageCaption: L("Casbah stairs, at night.", "Escaliers de la Casbah, la nuit.", "درج القصبة ليلاً."),
    medallionEmoji: "🌙",
  },
  {
    id: "boumediene-coup",
    month: 6,
    day: 19,
    year: 1965,
    event: L(
      "Houari Boumediene assumes power, opening a new chapter of state-building and non-aligned diplomacy.",
      "Houari Boumediene prend le pouvoir, ouvrant un nouveau chapitre de construction de l'État et de diplomatie non alignée.",
      "هواري بومدين يتولى الحكم، فاتحًا فصلاً جديدًا من بناء الدولة والدبلوماسية غير المنحازة.",
    ),
    figureId: "boumediene",
    figureName: L("Houari Boumediene", "Houari Boumediene", "هواري بومدين"),
    exhibit: { kind: "era", id: "independence" },
    exhibitLabel: L("Post-Independence gallery", "Galerie post-indépendance", "قاعة ما بعد الاستقلال"),
    imageCaption: L("A young republic at work.", "Une jeune république au travail.", "جمهورية فتيّة عاملة."),
    medallionEmoji: "🏛️",
  },
  {
    id: "black-spring",
    month: 4,
    day: 18,
    year: 2001,
    event: L(
      "The Black Spring begins in Kabylie — a movement of protest and memory that transforms Amazigh cultural politics.",
      "Le Printemps noir commence en Kabylie — un mouvement de protestation et de mémoire qui transforme la politique culturelle amazighe.",
      "الربيع الأسود ينطلق في القبائل — حركة احتجاج وذاكرة تُغيّر السياسة الثقافية الأمازيغية.",
    ),
    figureId: "matoub",
    figureName: L("Matoub Lounès", "Matoub Lounès", "معتوب لوناس"),
    exhibit: { kind: "region", id: "kabylie" },
    exhibitLabel: L("Kabylie regional hall", "Salle régionale de Kabylie", "قاعة القبائل الإقليمية"),
    imageCaption: L("Black ribbons on a olive tree.", "Rubans noirs sur un olivier.", "شرائط سوداء على شجرة زيتون."),
    medallionEmoji: "🖤",
  },
  {
    id: "numidia-unified",
    month: 2,
    day: 14,
    year: -202,
    yearLabel: "202 BC",
    event: L(
      "Massinissa aligns with Rome at Zama, a turning point that will unify the Numidian kingdoms under his rule.",
      "Massinissa s'allie à Rome à Zama, un tournant qui unifiera les royaumes numides sous son autorité.",
      "ماسينيسا يتحالف مع روما في زاما، منعطفٌ سيوحّد الممالك النوميدية تحت حكمه.",
    ),
    figureId: "massinissa",
    figureName: L("Massinissa", "Massinissa", "ماسينيسا"),
    exhibit: { kind: "era", id: "numidia" },
    exhibitLabel: L("Numidia exhibit", "Salle de Numidie", "قاعة نوميديا"),
    imageCaption: L("A Numidian horseman on the ridge.", "Un cavalier numide sur la crête.", "فارس نوميدي على الحافة."),
    medallionEmoji: "🐎",
  },
  {
    id: "jugurtha-captured",
    month: 1,
    day: 1,
    year: -105,
    yearLabel: "105 BC",
    event: L(
      "Jugurtha, defiant king of Numidia, is captured — but his long resistance shakes the Roman Republic to its foundations.",
      "Jugurtha, roi rebelle de Numidie, est capturé — mais sa longue résistance ébranle les fondations de la République romaine.",
      "يوغرطة، ملك نوميديا المتمرّد، يقع في الأسر — لكن مقاومته الطويلة تهزّ أركان الجمهورية الرومانية.",
    ),
    figureId: "jugurtha",
    figureName: L("Jugurtha", "Jugurtha", "يوغرطة"),
    exhibit: { kind: "era", id: "numidia" },
    exhibitLabel: L("Numidia exhibit", "Salle de Numidie", "قاعة نوميديا"),
    imageCaption: L("Chains that history broke first.", "Chaînes que l'histoire a brisées d'abord.", "قيود كسرها التاريخ أوّلاً."),
    medallionEmoji: "⚔️",
  },
  {
    id: "dihya-stand",
    month: 9,
    day: 15,
    year: 703,
    event: L(
      "Queen Dihya (the Kahina) rallies the Aurès against the advancing Umayyad armies — a legend of Amazigh resistance is born.",
      "La reine Dihya (la Kahina) rallie les Aurès face aux armées omeyyades — une légende de la résistance amazighe naît.",
      "الملكة ديهيا (الكاهنة) توحّد الأوراس في مواجهة الجيوش الأموية — أسطورة المقاومة الأمازيغية تولد.",
    ),
    figureId: "dihya",
    figureName: L("Dihya (Kahina)", "Dihya (Kahina)", "ديهيا (الكاهنة)"),
    exhibit: { kind: "region", id: "aures" },
    exhibitLabel: L("Aurès regional hall", "Salle régionale des Aurès", "قاعة الأوراس الإقليمية"),
    imageCaption: L("A crown of thistles and wind.", "Une couronne de chardons et de vent.", "تاج من الأشواك والرياح."),
    medallionEmoji: "👑",
  },
  {
    id: "ibn-khaldun-birth",
    month: 5,
    day: 27,
    year: 1332,
    event: L(
      "Ibn Khaldun, born on this day, will spend decades in the Maghreb writing the Muqaddimah — the founding text of modern historiography and sociology.",
      "Ibn Khaldoun, né ce jour, passera des décennies au Maghreb à rédiger la Muqaddima — texte fondateur de l'historiographie et de la sociologie modernes.",
      "ابن خلدون، المولود في هذا اليوم، سيقضي عقودًا في المغرب يكتب المقدّمة — النصّ المؤسّس للتأريخ وعلم الاجتماع الحديثين.",
    ),
    figureId: "ibn-khaldun",
    figureName: L("Ibn Khaldun", "Ibn Khaldoun", "ابن خلدون"),
    exhibit: { kind: "era", id: "islamic" },
    exhibitLabel: L("Medieval Maghreb exhibit", "Salle du Maghreb médiéval", "قاعة المغرب الوسيط"),
    imageCaption: L("An open codex, patient as stone.", "Un codex ouvert, patient comme la pierre.", "مخطوطة مفتوحة، صابرة كالحجر."),
    medallionEmoji: "📜",
  },
  {
    id: "barbarossa-algiers",
    month: 10,
    day: 3,
    year: 1516,
    event: L(
      "The Barbarossa brothers arrive in Algiers, opening the Ottoman era on the Algerian coast.",
      "Les frères Barberousse arrivent à Alger, ouvrant l'époque ottomane sur la côte algérienne.",
      "الأخوان بربروس يصلان إلى الجزائر، فاتِحَين الحقبة العثمانية على الساحل الجزائري.",
    ),
    figureId: "barbarossa",
    figureName: L("Barbarossa (Hayreddin)", "Barberousse (Hayreddin)", "خير الدين بربروس"),
    exhibit: { kind: "era", id: "ottoman" },
    exhibitLabel: L("Regency of Algiers exhibit", "Salle de la Régence d'Alger", "قاعة داي الجزائر"),
    imageCaption: L("Red sails on a turquoise sea.", "Voiles rouges sur une mer turquoise.", "أشرعة حمراء فوق بحر فيروزي."),
    medallionEmoji: "⚓",
  },
  {
    id: "fatma-nsoumer",
    month: 7,
    day: 27,
    year: 1854,
    event: L(
      "Lalla Fatma N'Soumer leads a stunning defence in Kabylie, halting French colonial forces in the mountains.",
      "Lalla Fatma N'Soumer mène une défense éclatante en Kabylie, arrêtant les forces coloniales françaises dans les montagnes.",
      "لالة فاطمة نسومر تقود دفاعًا مذهلاً في القبائل، توقف القوات الاستعمارية الفرنسية في الجبال.",
    ),
    figureId: "lalla-fatma-nsoumer",
    figureName: L("Lalla Fatma N'Soumer", "Lalla Fatma N'Soumer", "لالة فاطمة نسومر"),
    exhibit: { kind: "figure", id: "lalla-fatma-nsoumer" },
    exhibitLabel: L("Lalla Fatma N'Soumer plaque", "Plaque de Lalla Fatma N'Soumer", "لوحة لالة فاطمة نسومر"),
    imageCaption: L("A veiled figure on the ridge.", "Une silhouette voilée sur la crête.", "طيف مُتشحٌ على الحافة."),
    medallionEmoji: "🏔️",
  },
  {
    id: "mokrani-revolt",
    month: 3,
    day: 16,
    year: 1871,
    event: L(
      "Cheikh El Mokrani launches the great insurrection — one of the largest anti-colonial revolts of the 19th century.",
      "Cheikh El Mokrani déclenche la grande insurrection — l'un des plus vastes soulèvements anticoloniaux du XIXe siècle.",
      "الشيخ المقراني يشعل الانتفاضة الكبرى — من أكبر الثورات المناهضة للاستعمار في القرن التاسع عشر.",
    ),
    figureId: "el-mokrani",
    figureName: L("Cheikh El Mokrani", "Cheikh El Mokrani", "الشيخ المقراني"),
    exhibit: { kind: "era", id: "french" },
    exhibitLabel: L("French Colonization exhibit", "Salle de la colonisation française", "قاعة الاستعمار الفرنسي"),
    imageCaption: L("A banner raised over the plains.", "Un étendard levé sur les plaines.", "راية تُرفع فوق السهول."),
    medallionEmoji: "🏹",
  },
  {
    id: "ben-mhidi-arrest",
    month: 2,
    day: 23,
    year: 1957,
    event: L(
      "Larbi Ben M'Hidi, one of the six historic leaders of the FLN, is arrested in Algiers — his composure under interrogation becomes legendary.",
      "Larbi Ben M'Hidi, l'un des six chefs historiques du FLN, est arrêté à Alger — son calme face aux interrogatoires devient légendaire.",
      "العربي بن مهيدي، أحد الزعماء التاريخيين الستة لجبهة التحرير، يُعتقل في الجزائر — رباطة جأشه أمام المحقّقين تصبح أسطورة.",
    ),
    figureId: "ben-mhidi",
    figureName: L("Larbi Ben M'Hidi", "Larbi Ben M'Hidi", "العربي بن مهيدي"),
    exhibit: { kind: "era", id: "independence" },
    exhibitLabel: L("War of Independence exhibit", "Salle de la guerre d'indépendance", "قاعة حرب الاستقلال"),
    imageCaption: L("A cigarette, and no fear.", "Une cigarette, et aucune peur.", "سيجارة، ولا خوف."),
    medallionEmoji: "🌟",
  },
  {
    id: "ben-badis-manifest",
    month: 5,
    day: 5,
    year: 1936,
    event: L(
      "Ibn Badis and the Association of Algerian Ulema declare: 'The Algerian people are Muslim, and to Arab-Amazigh civilisation they belong.'",
      "Ibn Badis et l'Association des oulémas algériens proclament : « Le peuple algérien est musulman, et il appartient à la civilisation arabo-amazighe. »",
      "ابن باديس وجمعية العلماء المسلمين الجزائريين يعلنون: «الشعب الجزائري مسلم، وإلى الحضارة العربية الأمازيغية ينتمي».",
    ),
    figureId: "ben-badis",
    figureName: L("Abdelhamid Ibn Badis", "Abdelhamid Ibn Badis", "عبد الحميد بن باديس"),
    exhibit: { kind: "region", id: "constantine" },
    exhibitLabel: L("Constantine regional hall", "Salle régionale de Constantine", "قاعة قسنطينة الإقليمية"),
    imageCaption: L("Ink on paper, patient as faith.", "Encre sur papier, patiente comme la foi.", "حبرٌ على ورق، صابرٌ كالإيمان."),
    medallionEmoji: "🖋️",
  },
  {
    id: "djamila-bouhired-trial",
    month: 7,
    day: 15,
    year: 1957,
    event: L(
      "Djamila Bouhired is sentenced to death by a military court — international protest turns her into a symbol of the Algerian cause.",
      "Djamila Bouhired est condamnée à mort par un tribunal militaire — les protestations internationales font d'elle un symbole de la cause algérienne.",
      "جميلة بوحيرد يحكم عليها بالإعدام أمام محكمة عسكرية — الاحتجاجات الدولية تُحوّلها إلى رمز للقضية الجزائرية.",
    ),
    figureId: "djamila-bouhired",
    figureName: L("Djamila Bouhired", "Djamila Bouhired", "جميلة بوحيرد"),
    exhibit: { kind: "region", id: "algiers" },
    exhibitLabel: L("Algiers regional hall", "Salle régionale d'Alger", "قاعة الجزائر العاصمة الإقليمية"),
    imageCaption: L("A young woman, a whole country.", "Une jeune femme, un pays entier.", "شابّة، وبلدٌ بأسره."),
    medallionEmoji: "🌹",
  },
  {
    id: "kateb-yacine",
    month: 8,
    day: 6,
    year: 1929,
    event: L(
      "Kateb Yacine is born in Constantine. His novel Nedjma will become a cornerstone of Algerian and Maghrebi literature.",
      "Kateb Yacine naît à Constantine. Son roman Nedjma deviendra une pierre angulaire de la littérature algérienne et maghrébine.",
      "كاتب ياسين يولد في قسنطينة. روايته «نجمة» ستصبح ركيزة من ركائز الأدب الجزائري والمغاربي.",
    ),
    figureId: "kateb-yacine",
    figureName: L("Kateb Yacine", "Kateb Yacine", "كاتب ياسين"),
    exhibit: { kind: "region", id: "constantine" },
    exhibitLabel: L("Constantine regional hall", "Salle régionale de Constantine", "قاعة قسنطينة الإقليمية"),
    imageCaption: L("A star with many names.", "Une étoile aux mille noms.", "نجمةٌ بأسماء كثيرة."),
    medallionEmoji: "⭐",
  },
  {
    id: "idir-avava",
    month: 10,
    day: 17,
    year: 1976,
    event: L(
      "Idir releases 'A Vava Inouva' — a Kabyle lullaby that quietly carries Amazigh song around the world.",
      "Idir sort « A Vava Inouva » — une berceuse kabyle qui, en silence, porte le chant amazigh à travers le monde.",
      "إيدير يصدر «آڤاڤا إينوڤا» — تهويدة قبائلية تحمل الأغنية الأمازيغية بهدوء إلى العالم.",
    ),
    figureId: "idir",
    figureName: L("Idir", "Idir", "إيدير"),
    exhibit: { kind: "region", id: "kabylie" },
    exhibitLabel: L("Kabylie regional hall", "Salle régionale de Kabylie", "قاعة القبائل الإقليمية"),
    imageCaption: L("A door opening onto the mountains.", "Une porte ouverte sur les montagnes.", "بابٌ يُفتح على الجبال."),
    medallionEmoji: "🎶",
  },
  {
    id: "amirouche-mission",
    month: 3,
    day: 28,
    year: 1959,
    event: L(
      "Colonel Amirouche Aït Hamouda, commander of Wilaya III, falls in combat while crossing to Tunisia to reorganise the revolution.",
      "Le colonel Amirouche Aït Hamouda, commandant de la Wilaya III, tombe au combat en traversant vers la Tunisie pour réorganiser la révolution.",
      "العقيد عميروش آيت حمودة، قائد الولاية الثالثة، يستشهد في معركة أثناء عبوره نحو تونس لإعادة تنظيم الثورة.",
    ),
    figureId: "amirouche",
    figureName: L("Colonel Amirouche", "Colonel Amirouche", "العقيد عميروش"),
    exhibit: { kind: "region", id: "kabylie" },
    exhibitLabel: L("Kabylie regional hall", "Salle régionale de Kabylie", "قاعة القبائل الإقليمية"),
    imageCaption: L("A silent salute from the peaks.", "Un salut silencieux depuis les sommets.", "تحيّةٌ صامتةٌ من القمم."),
    medallionEmoji: "🎖️",
  },
];

/**
 * Pick the entry for a given date. Exact month/day match wins;
 * otherwise a deterministic rotation ensures the card is never empty.
 */
export function pickOnThisDay(date: Date = new Date()): OnThisDayEntry {
  const m = date.getMonth() + 1;
  const d = date.getDate();
  const exact = onThisDay.find((e) => e.month === m && e.day === d);
  if (exact) return exact;
  const dayOfYear = Math.floor(
    (date.getTime() - new Date(date.getFullYear(), 0, 0).getTime()) / 86_400_000,
  );
  return onThisDay[Math.abs(dayOfYear) % onThisDay.length];
}

// Curated "Did You Know?" facts for the Algeria Through Time experience.
// These are layered on top of the era-derived facts (see eras.ts → dailyFacts).
// Each entry carries optional metadata so the card can deep-link to the
// matching figure / era / region when the user expands it.

import type { Localized } from "@/lib/i18n";

export type CuratedFactEra =
  | "ancient"
  | "numidia"
  | "roman"
  | "medieval"
  | "ottoman"
  | "colonial"
  | "war-of-independence"
  | "modern"
  | "culture";

export type CuratedFact = {
  id: string;
  text: Localized<string>;
  /** What kind of entity does this fact reference, if any? */
  relatedType?: "figure" | "region" | "event" | "era";
  /** Matching id from figures.ts / mapRegions.ts / eras.ts. */
  relatedId?: string;
  era: CuratedFactEra;
};

const L = (en: string, fr: string, ar: string): Localized<string> => ({ en, fr, ar });

export const curatedFacts: CuratedFact[] = [
  // ---------- Ancient ----------
  {
    id: "fact-tassili",
    text: L(
      "The Tassili n'Ajjer rock paintings are over 12,000 years old — among the oldest art on Earth.",
      "Les peintures rupestres du Tassili n'Ajjer ont plus de 12 000 ans — parmi les plus anciennes œuvres d'art au monde.",
      "تعود رسومات الطاسيلي ناجر إلى أكثر من 12,000 سنة — من أقدم الأعمال الفنية على وجه الأرض.",
    ),
    relatedType: "region",
    relatedId: "sahara",
    era: "ancient",
  },
  {
    id: "fact-sahara-green",
    text: L(
      "The Sahara was once a green savanna, home to lakes, elephants and the first North African herders.",
      "Le Sahara fut autrefois une savane verte, peuplée de lacs, d'éléphants et des premiers bergers nord-africains.",
      "كانت الصحراء يومًا سهبًا أخضر تسكنه البحيرات والفيلة وأوائل الرعاة في شمال إفريقيا.",
    ),
    relatedType: "region",
    relatedId: "sahara",
    era: "ancient",
  },

  // ---------- Numidia ----------
  {
    id: "fact-massinissa",
    text: L(
      "Massinissa was the first king to unify the Numidian kingdoms into a single power.",
      "Massinissa fut le premier roi à unifier les royaumes numides en une seule puissance.",
      "كان ماسينيسا أوّل ملك يوحّد الممالك النوميدية في قوّة واحدة.",
    ),
    relatedType: "figure",
    relatedId: "massinissa",
    era: "numidia",
  },
  {
    id: "fact-jugurtha",
    text: L(
      "Jugurtha resisted Rome for seven years and is remembered as a symbol of Numidian defiance.",
      "Jugurtha résista à Rome pendant sept ans et reste un symbole de la fierté numide.",
      "قاوم يوغرطة روما لسبع سنوات، ويُعدّ رمزًا للكبرياء النوميدي.",
    ),
    relatedType: "figure",
    relatedId: "jugurtha",
    era: "numidia",
  },
  {
    id: "fact-syphax",
    text: L(
      "King Syphax of the Masaesyli minted coins long before most Mediterranean kingdoms.",
      "Le roi Syphax des Masaesyles frappait monnaie bien avant la plupart des royaumes méditerranéens.",
      "سكّ الملك سيفاكس ملك الماسيسيليين عملته قبل معظم ممالك المتوسط.",
    ),
    relatedType: "figure",
    relatedId: "syphax",
    era: "numidia",
  },

  // ---------- Roman / late antiquity ----------
  {
    id: "fact-timgad",
    text: L(
      "Timgad, founded by Trajan around 100 CE, is one of the best-preserved Roman cities in the world.",
      "Timgad, fondée par Trajan vers 100 ap. J.-C., est l'une des villes romaines les mieux conservées au monde.",
      "تيمقاد، التي أسّسها تراجان نحو سنة 100م، من أفضل المدن الرومانية حفظًا في العالم.",
    ),
    relatedType: "region",
    relatedId: "aures",
    era: "roman",
  },
  {
    id: "fact-augustine",
    text: L(
      "Saint Augustine, one of Christianity's foundational thinkers, was born in Roman Numidia.",
      "Saint Augustin, l'un des penseurs fondateurs du christianisme, est né en Numidie romaine.",
      "وُلد القديس أوغسطين، أحد المؤسّسين الفكريين للمسيحية، في نوميديا الرومانية.",
    ),
    relatedType: "figure",
    relatedId: "augustine",
    era: "roman",
  },
  {
    id: "fact-apuleius",
    text: L(
      "Apuleius, author of The Golden Ass — the only Latin novel to survive complete — was Numidian.",
      "Apulée, auteur de L'Âne d'or — seul roman latin parvenu intact — était numide.",
      "كان أبوليوس، مؤلف \"الحمار الذهبي\" — الرواية اللاتينية الوحيدة التي وصلتنا كاملة — نوميديًا.",
    ),
    relatedType: "figure",
    relatedId: "apuleius",
    era: "roman",
  },
  {
    id: "fact-dihya",
    text: L(
      "Dihya, the Berber queen, led one of the last great resistances against the Arab conquest of the Maghreb.",
      "Dihya, reine berbère, mena l'une des dernières grandes résistances à la conquête arabe du Maghreb.",
      "قادت ديهيا، الملكة الأمازيغية، إحدى آخر المقاومات الكبرى ضد الفتح العربي للمغرب.",
    ),
    relatedType: "figure",
    relatedId: "dihya",
    era: "medieval",
  },

  // ---------- Medieval / Islamic ----------
  {
    id: "fact-tariq",
    text: L(
      "Gibraltar takes its name from Tariq ibn Ziyad — \"Jabal Tariq\", the mountain of Tariq.",
      "Gibraltar tire son nom de Tariq ibn Ziyad — « Jabal Tariq », la montagne de Tariq.",
      "اشتُقّ اسم جبل طارق من طارق بن زياد — \"جبل طارق\".",
    ),
    relatedType: "figure",
    relatedId: "tariq-ibn-ziyad",
    era: "medieval",
  },
  {
    id: "fact-ibn-khaldun",
    text: L(
      "Ibn Khaldun wrote much of the Muqaddimah — the founding work of sociology — while in Algeria.",
      "Ibn Khaldoun rédigea une grande partie de la Muqaddima — œuvre fondatrice de la sociologie — en Algérie.",
      "كتب ابن خلدون جزءًا كبيرًا من \"المقدّمة\" — العمل المؤسّس لعلم الاجتماع — في الجزائر.",
    ),
    relatedType: "figure",
    relatedId: "ibn-khaldun",
    era: "medieval",
  },
  {
    id: "fact-tlemcen",
    text: L(
      "Tlemcen was a major capital of learning under the Zayyanid dynasty, attracting scholars from across the Maghreb.",
      "Tlemcen fut une grande capitale du savoir sous la dynastie zayyanide, attirant des savants de tout le Maghreb.",
      "كانت تلمسان عاصمة كبرى للعلم في عهد الدولة الزيانية، تستقطب العلماء من كامل المغرب.",
    ),
    relatedType: "region",
    relatedId: "oran-west",
    era: "medieval",
  },

  // ---------- Ottoman ----------
  {
    id: "fact-barbarossa",
    text: L(
      "The Barbarossa brothers turned 16th-century Algiers into one of the most powerful ports of the Mediterranean.",
      "Les frères Barberousse firent d'Alger, au XVIe siècle, l'un des ports les plus puissants de la Méditerranée.",
      "حوّل الأخوان بربروس مدينة الجزائر في القرن السادس عشر إلى أحد أقوى موانئ المتوسط.",
    ),
    relatedType: "figure",
    relatedId: "barbarossa",
    era: "ottoman",
  },
  {
    id: "fact-casbah",
    text: L(
      "The Casbah of Algiers, shaped under Ottoman rule, is a UNESCO World Heritage site.",
      "La Casbah d'Alger, façonnée sous le règne ottoman, est inscrite au patrimoine mondial de l'UNESCO.",
      "تُعدّ قصبة الجزائر، التي تشكّلت في العهد العثماني، موقعًا للتراث العالمي لليونسكو.",
    ),
    relatedType: "region",
    relatedId: "algiers",
    era: "ottoman",
  },
  {
    id: "fact-rais-hamidou",
    text: L(
      "Raïs Hamidou, born in the Casbah, became one of the most feared admirals of the western Mediterranean.",
      "Raïs Hamidou, né dans la Casbah, devint l'un des amiraux les plus redoutés de la Méditerranée occidentale.",
      "أصبح الرايس حميدو، المولود في القصبة، من أرهب الأميرالات في غرب المتوسط.",
    ),
    relatedType: "figure",
    relatedId: "rais-hamidou",
    era: "ottoman",
  },

  // ---------- Colonial / early resistance ----------
  {
    id: "fact-abdelkader",
    text: L(
      "Emir Abdelkader built a mobile state to resist French colonization and is honored worldwide for his ethics of war.",
      "L'Émir Abdelkader bâtit un État mobile pour résister à la colonisation française et est honoré dans le monde entier pour son éthique de la guerre.",
      "أسّس الأمير عبد القادر دولة متنقّلة لمقاومة الاستعمار الفرنسي، ويُكرَّم عالميًا لأخلاقه في الحرب.",
    ),
    relatedType: "figure",
    relatedId: "abdelkader",
    era: "colonial",
  },
  {
    id: "fact-fatma-nsoumer",
    text: L(
      "Lalla Fatma N'Soumer led Kabyle resistance against the French army in the 1850s while still in her twenties.",
      "Lalla Fatma N'Soumer mena la résistance kabyle contre l'armée française dans les années 1850, alors qu'elle n'avait qu'une vingtaine d'années.",
      "قادت لالة فاطمة نسومر المقاومة القبائلية ضد الجيش الفرنسي في خمسينيات القرن التاسع عشر وهي في عشرينيّاتها.",
    ),
    relatedType: "figure",
    relatedId: "lalla-fatma-nsoumer",
    era: "colonial",
  },
  {
    id: "fact-mokrani",
    text: L(
      "The 1871 Mokrani revolt mobilized over 250 tribes — the largest uprising of colonial-era Algeria.",
      "La révolte de Mokrani en 1871 mobilisa plus de 250 tribus — le plus grand soulèvement de l'Algérie coloniale.",
      "حشدت ثورة المقراني سنة 1871 أكثر من 250 قبيلة — أكبر انتفاضة في الجزائر الاستعمارية.",
    ),
    relatedType: "figure",
    relatedId: "el-mokrani",
    era: "colonial",
  },

  // ---------- War of Independence ----------
  {
    id: "fact-toussaint",
    text: L(
      "The Algerian War of Independence began on November 1, 1954 — the night called \"Toussaint Rouge\".",
      "La guerre d'indépendance algérienne débuta le 1ᵉʳ novembre 1954 — la nuit dite « Toussaint Rouge ».",
      "اندلعت حرب التحرير الجزائرية في 1 نوفمبر 1954 — الليلة المعروفة بـ\"عيد جميع القدّيسين الأحمر\".",
    ),
    relatedType: "event",
    relatedId: "toussaint",
    era: "war-of-independence",
  },
  {
    id: "fact-djamila",
    text: L(
      "Djamila Bouhired became a global symbol of anti-colonial struggle while still a teenager.",
      "Djamila Bouhired devint un symbole mondial de la lutte anticoloniale alors qu'elle était encore adolescente.",
      "أصبحت جميلة بوحيرد رمزًا عالميًا للنضال ضد الاستعمار وهي ما تزال مراهقة.",
    ),
    relatedType: "figure",
    relatedId: "djamila-bouhired",
    era: "war-of-independence",
  },
  {
    id: "fact-evian",
    text: L(
      "The Evian Accords, signed in March 1962, opened the path to Algerian independence after 132 years of colonization.",
      "Les Accords d'Évian, signés en mars 1962, ouvrirent la voie à l'indépendance algérienne après 132 ans de colonisation.",
      "فتحت اتفاقيات إيفيان، الموقّعة في مارس 1962، الطريق نحو الاستقلال بعد 132 سنة من الاستعمار.",
    ),
    relatedType: "event",
    relatedId: "evian",
    era: "war-of-independence",
  },
  {
    id: "fact-fanon",
    text: L(
      "Frantz Fanon, born in Martinique, joined the Algerian revolution and shaped global thought on decolonization.",
      "Frantz Fanon, né en Martinique, rejoignit la révolution algérienne et façonna la pensée mondiale sur la décolonisation.",
      "انضمّ فرانز فانون، المولود في المارتينيك، إلى الثورة الجزائرية وأثّر في الفكر العالمي حول التحرّر من الاستعمار.",
    ),
    relatedType: "figure",
    relatedId: "frantz-fanon",
    era: "war-of-independence",
  },

  // ---------- Culture / oral / Amazigh ----------
  {
    id: "fact-tifinagh",
    text: L(
      "Tifinagh, the Amazigh script, descends from an alphabet used in North Africa for over 2,000 years.",
      "Le tifinagh, écriture amazighe, descend d'un alphabet utilisé en Afrique du Nord depuis plus de 2 000 ans.",
      "تنحدر التيفيناغ، الكتابة الأمازيغية، من أبجدية استُخدمت في شمال إفريقيا لأكثر من 2000 سنة.",
    ),
    relatedType: "era",
    relatedId: "earlynorthafrica",
    era: "culture",
  },
  {
    id: "fact-tamazight",
    text: L(
      "Tamazight became an official language of Algeria in 2016, recognizing centuries of oral memory.",
      "Le tamazight est devenu langue officielle de l'Algérie en 2016, reconnaissant des siècles de mémoire orale.",
      "أصبحت الأمازيغية لغةً رسمية للجزائر سنة 2016، اعترافًا بقرون من الذاكرة الشفوية.",
    ),
    relatedType: "region",
    relatedId: "kabylie",
    era: "modern",
  },
  {
    id: "fact-idir",
    text: L(
      "Idir's song \"A Vava Inouva\" was the first Kabyle song to reach a worldwide audience in the 1970s.",
      "La chanson « A Vava Inouva » d'Idir fut la première chanson kabyle à toucher un public mondial dans les années 1970.",
      "كانت أغنية \"آفافا إينوفا\" لإيدير أول أغنية قبائلية تصل إلى جمهور عالمي في سبعينيات القرن العشرين.",
    ),
    relatedType: "figure",
    relatedId: "idir",
    era: "modern",
  },
  {
    id: "fact-kateb",
    text: L(
      "Kateb Yacine's novel Nedjma is considered a foundational work of modern Algerian literature.",
      "Le roman Nedjma de Kateb Yacine est considéré comme une œuvre fondatrice de la littérature algérienne moderne.",
      "تُعدّ رواية \"نجمة\" لكاتب ياسين عملًا مؤسّسًا في الأدب الجزائري الحديث.",
    ),
    relatedType: "figure",
    relatedId: "kateb-yacine",
    era: "modern",
  },
  {
    id: "fact-assia",
    text: L(
      "Assia Djebar was the first writer from the Maghreb elected to the Académie française.",
      "Assia Djebar fut la première écrivaine du Maghreb élue à l'Académie française.",
      "كانت آسيا جبار أول كاتبة من المغرب الكبير تُنتخب في الأكاديمية الفرنسية.",
    ),
    relatedType: "figure",
    relatedId: "assia-djebar",
    era: "modern",
  },
  {
    id: "fact-fadhma",
    text: L(
      "Fadhma Aït Mansour Amrouche's memoir is one of the earliest autobiographies written by a North African woman.",
      "Le récit de Fadhma Aït Mansour Amrouche est l'une des toutes premières autobiographies écrites par une femme nord-africaine.",
      "تُعدّ مذكّرات فاضمة آث منصور عمروش من أوائل السير الذاتية التي كتبتها امرأة من شمال إفريقيا.",
    ),
    relatedType: "figure",
    relatedId: "fadhma-amrouche",
    era: "modern",
  },
  {
    id: "fact-rai",
    text: L(
      "Raï music was born in the cabarets and ports of Oran before becoming a global sound.",
      "La musique raï est née dans les cabarets et les ports d'Oran avant de devenir un son planétaire.",
      "وُلدت موسيقى الراي في ملاهي وموانئ وهران قبل أن تصبح صوتًا عالميًا.",
    ),
    relatedType: "region",
    relatedId: "oran-west",
    era: "modern",
  },
  {
    id: "fact-rachid-taha",
    text: L(
      "Rachid Taha's reinvention of \"Ya Rayah\" carried an Algerian exile song to the world's stages.",
      "La réinvention de « Ya Rayah » par Rachid Taha porta un chant d'exil algérien sur les scènes du monde entier.",
      "حملت إعادة رشيد طه لأغنية \"يا رايح\" أنشودةَ المنفى الجزائرية إلى مسارح العالم.",
    ),
    relatedType: "figure",
    relatedId: "rachid-taha",
    era: "modern",
  },
  {
    id: "fact-couscous",
    text: L(
      "Couscous, a North African staple for centuries, is inscribed on UNESCO's intangible heritage list.",
      "Le couscous, aliment de base nord-africain depuis des siècles, est inscrit au patrimoine immatériel de l'UNESCO.",
      "أُدرج الكسكس، الطبق المغاربي العريق منذ قرون، في قائمة التراث غير المادي لليونسكو.",
    ),
    relatedType: "era",
    relatedId: "earlynorthafrica",
    era: "culture",
  },
  {
    id: "fact-burnous",
    text: L(
      "The burnous, the long hooded cloak, was worn by Numidian kings long before it became a national symbol.",
      "Le burnous, longue cape à capuche, était porté par les rois numides bien avant d'en devenir un symbole national.",
      "كان البرنوس، العباءة الطويلة ذات القلنسوة، يُرتدى من قِبل ملوك نوميديا قبل أن يصبح رمزًا وطنيًا.",
    ),
    relatedType: "era",
    relatedId: "numidia",
    era: "culture",
  },

  // ---------- Modern Algeria ----------
  {
    id: "fact-hamina-palme",
    text: L(
      "Mohammed Lakhdar-Hamina won the Palme d'Or in 1975 — still the only African director to do so.",
      "Mohammed Lakhdar-Hamina remporta la Palme d'Or en 1975 — il reste le seul réalisateur africain à l'avoir obtenue.",
      "نال محمد الأخضر حامينا السعفة الذهبية سنة 1975 — وما يزال المخرج الإفريقي الوحيد الذي حقّق ذلك.",
    ),
    relatedType: "figure",
    relatedId: "mohammed-lakhdar-hamina",
    era: "modern",
  },
  {
    id: "fact-largest-africa",
    text: L(
      "Algeria is the largest country in Africa, stretching from the Mediterranean deep into the Sahara.",
      "L'Algérie est le plus grand pays d'Afrique, s'étendant de la Méditerranée jusqu'au cœur du Sahara.",
      "الجزائر أكبر بلد في إفريقيا، تمتدّ من المتوسط حتى أعماق الصحراء.",
    ),
    relatedType: "region",
    relatedId: "sahara",
    era: "modern",
  },
];

/** Just the localized text — used by DidYouKnowCard to merge into dailyFacts. */
export const curatedFactTexts: Localized<string>[] = curatedFacts.map((f) => f.text);

/** Map a fact's localized object to its curated metadata (by reference). */
export const curatedFactByText: Map<Localized<string>, CuratedFact> = new Map(
  curatedFacts.map((f) => [f.text, f]),
);

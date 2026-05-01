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
  {
    id: "massinissa",
    text: L(
      "Massinissa was the first king to unify the Numidian kingdoms.",
      "Massinissa fut le premier roi à unifier les royaumes numides.",
      "كان ماسينيسا أول ملك يوحد الممالك النوميدية.",
    ),
    relatedType: "figure",
    relatedId: "massinissa",
    era: "ancient",
  },
  {
    id: "jugurtha",
    text: L(
      "Jugurtha led a famous war against Rome to defend Numidia.",
      "Jugurtha mena une guerre célèbre contre Rome pour défendre la Numidie.",
      "قاد يوغرطة حربًا مشهورة ضد روما دفاعًا عن نوميديا.",
    ),
    relatedType: "figure",
    relatedId: "jugurtha",
    era: "ancient",
  },
  {
    id: "shoshenq",
    text: L(
      "A ruler of Berber origin founded Egypt's 22nd Dynasty.",
      "Un roi d'origine berbère fonda la 22e dynastie d'Égypte.",
      "أسس حاكم من أصل أمازيغي الأسرة الثانية والعشرين في مصر.",
    ),
    relatedType: "figure",
    relatedId: "shoshenq-i",
    era: "ancient",
  },
  {
    id: "timgad",
    text: L(
      "Timgad is one of the best-preserved Roman cities in the world.",
      "Timgad est l'une des villes romaines les mieux conservées au monde.",
      "تُعد تيمقاد من أفضل المدن الرومانية المحفوظة في العالم.",
    ),
    relatedType: "region",
    relatedId: "aures",
    era: "ancient",
  },
  {
    id: "saint_augustine",
    text: L(
      "Saint Augustine, born in Thagaste, is one of Christianity's greatest thinkers.",
      "Saint Augustin, né à Thagaste, est l'un des penseurs majeurs du christianisme.",
      "يُعد القديس أوغسطين، المولود في طاغست، من أعظم مفكري المسيحية.",
    ),
    relatedType: "figure",
    relatedId: "saint-augustine",
    era: "ancient",
  },
  {
    id: "islam_spread",
    text: L(
      "Islam spread across North Africa as early as the 7th century.",
      "L'islam s'est diffusé en Afrique du Nord dès le VIIe siècle.",
      "انتشر الإسلام في شمال إفريقيا منذ القرن السابع.",
    ),
    relatedType: "event",
    relatedId: "islamic-period",
    era: "medieval",
  },
  {
    id: "zianides",
    text: L(
      "Tlemcen was the capital of the Zianid kingdom and a major cultural center.",
      "Tlemcen fut la capitale du royaume zianide et un centre culturel majeur.",
      "كانت تلمسان عاصمة الدولة الزيانية ومركزًا ثقافيًا مهمًا.",
    ),
    relatedType: "region",
    relatedId: "western-algeria",
    era: "medieval",
  },
  {
    id: "ottoman_algiers",
    text: L(
      "Algiers was a major maritime power under the Ottoman Empire.",
      "Alger fut une puissance maritime majeure sous l'Empire ottoman.",
      "كانت الجزائر قوة بحرية كبرى خلال الحكم العثماني.",
    ),
    relatedType: "region",
    relatedId: "algiers",
    era: "ottoman",
  },
  {
    id: "casbah",
    text: L(
      "The Casbah of Algiers is a UNESCO World Heritage site.",
      "La Casbah d'Alger est classée au patrimoine mondial de l'UNESCO.",
      "تُعد قصبة الجزائر موقعًا للتراث العالمي لليونسكو.",
    ),
    relatedType: "region",
    relatedId: "algiers",
    era: "modern",
  },
  {
    id: "colonization",
    text: L(
      "Algeria was colonized by France in 1830.",
      "L'Algérie a été colonisée par la France en 1830.",
      "استعمرت فرنسا الجزائر عام 1830.",
    ),
    relatedType: "event",
    relatedId: "colonization",
    era: "colonial",
  },
  {
    id: "emir_abdelkader",
    text: L(
      "Emir Abdelkader led an organized resistance against French colonization.",
      "L'Émir Abdelkader mena une résistance organisée contre la colonisation française.",
      "قاد الأمير عبد القادر مقاومة منظمة ضد الاستعمار الفرنسي.",
    ),
    relatedType: "figure",
    relatedId: "emir-abdelkader",
    era: "colonial",
  },
  {
    id: "setif_1945",
    text: L(
      "The events of May 8, 1945 marked a turning point in the struggle for independence.",
      "Les événements du 8 mai 1945 marquèrent un tournant dans la lutte pour l'indépendance.",
      "مثّلت أحداث 8 ماي 1945 نقطة تحول في النضال من أجل الاستقلال.",
    ),
    relatedType: "event",
    relatedId: "setif-1945",
    era: "modern",
  },
  {
    id: "independence",
    text: L(
      "Algeria gained independence in 1962 after an eight-year war.",
      "L'Algérie a obtenu son indépendance en 1962 après une guerre de huit ans.",
      "حصلت الجزائر على استقلالها عام 1962 بعد حرب دامت ثماني سنوات.",
    ),
    relatedType: "event",
    relatedId: "independence",
    era: "modern",
  },
  {
    id: "tamazight",
    text: L(
      "Tamazight is an official language in Algeria.",
      "Tamazight est une langue officielle en Algérie.",
      "تُعد الأمازيغية لغة رسمية في الجزائر.",
    ),
    relatedType: "event",
    relatedId: "amazigh-identity",
    era: "modern",
  },
  {
    id: "taos_amrouche",
    text: L(
      "Taos Amrouche preserved Kabyle oral memory through songs and stories.",
      "Taos Amrouche a préservé la mémoire orale kabyle à travers chants et récits.",
      "حافظت طاوس عمروش على الذاكرة الشفوية القبائلية من خلال الغناء والحكايات.",
    ),
    relatedType: "figure",
    relatedId: "taos-amrouche",
    era: "modern",
  },
  {
    id: "jean_amrouche",
    text: L(
      "Jean Amrouche was an important intellectual voice for the Algerian cause.",
      "Jean Amrouche fut une voix intellectuelle importante de la cause algérienne.",
      "كان جان عمروش صوتًا فكريًا مهمًا للقضية الجزائرية.",
    ),
    relatedType: "figure",
    relatedId: "jean-amrouche",
    era: "modern",
  },
  {
    id: "rachid_taha",
    text: L(
      "Rachid Taha blended raï, rock, and identity in powerful music.",
      "Rachid Taha a mêlé raï, rock et identité dans une musique engagée.",
      "مزج رشيد طه بين الراي والروك والهوية في موسيقى مؤثرة.",
    ),
    relatedType: "figure",
    relatedId: "rachid-taha",
    era: "modern",
  },
  {
    id: "couscous",
    text: L(
      "Couscous is listed as UNESCO intangible cultural heritage.",
      "Le couscous est inscrit au patrimoine culturel immatériel de l'UNESCO.",
      "تم إدراج الكسكس ضمن التراث الثقافي غير المادي لليونسكو.",
    ),
    relatedType: "event",
    relatedId: "cuisine",
    era: "modern",
  },
  {
    id: "sahara",
    text: L(
      "The Sahara covers more than 80% of Algeria's territory.",
      "Le Sahara couvre plus de 80 % du territoire algérien.",
      "يغطي الصحراء أكثر من 80٪ من مساحة الجزائر.",
    ),
    relatedType: "region",
    relatedId: "sahara",
    era: "modern",
  },
  {
    id: "tassili",
    text: L(
      "Tassili n'Ajjer holds rock art dating back thousands of years.",
      "Le Tassili n'Ajjer abrite des peintures rupestres vieilles de milliers d'années.",
      "يحتوي طاسيلي ناجر على رسومات صخرية تعود لآلاف السنين.",
    ),
    relatedType: "region",
    relatedId: "sahara",
    era: "ancient",
  },
  {
    id: "hospitality",
    text: L(
      "Hospitality is a central value in Algerian culture.",
      "L'hospitalité est une valeur centrale dans la culture algérienne.",
      "تُعد الضيافة قيمة أساسية في الثقافة الجزائرية.",
    ),
    relatedType: "event",
    relatedId: "culture",
    era: "modern",
  },
  {
    id: "tea",
    text: L(
      "Mint tea is a symbol of hospitality in Algeria.",
      "Le thé à la menthe est un symbole de convivialité en Algérie.",
      "يُعد الشاي بالنعناع رمزًا للضيافة في الجزائر.",
    ),
    relatedType: "event",
    relatedId: "culture",
    era: "modern",
  },
];

/** Just the localized text — used by DidYouKnowCard to merge into dailyFacts. */
export const curatedFactTexts: Localized<string>[] = curatedFacts.map((f) => f.text);

/** Map a fact's localized object to its curated metadata (by reference). */
export const curatedFactByText: Map<Localized<string>, CuratedFact> = new Map(
  curatedFacts.map((f) => [f.text, f]),
);

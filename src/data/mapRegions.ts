import type { Localized, LocalizedString } from "@/lib/i18n";

const L = (en: string, fr: string, ar: string): Localized<string> => ({ en, fr, ar });

export type MapRegion = {
  id: string;
  name: LocalizedString;
  // Position on a 100x120 viewBox (rough silhouette of Algeria)
  cx: number;
  cy: number;
  description: LocalizedString;
  figureIds: string[];
  events: LocalizedString[];
  eraId?: string;
};

export const mapRegions: MapRegion[] = [
  {
    id: "algiers",
    name: L("Algiers", "Alger", "الجزائر العاصمة"),
    cx: 48,
    cy: 18,
    description: L(
      "Capital and historic Mediterranean port — the seat of the Regency and a stage for modern Algerian history.",
      "Capitale et port méditerranéen historique — siège de la Régence et scène de l'histoire moderne de l'Algérie.",
      "العاصمة وميناء متوسطي تاريخي — مقرّ الإيالة ومسرح للتاريخ الجزائري الحديث."
    ),
    figureIds: [],
    events: [
      L("Regency of Algiers (16th–19th c.)", "Régence d'Alger (XVIᵉ–XIXᵉ s.)", "إيالة الجزائر (ق16–ق19)"),
      L("Battle of Algiers (1956–57)", "Bataille d'Alger (1956–57)", "معركة الجزائر (1956–57)"),
    ],
  },
  {
    id: "kabylie",
    name: L("Kabylie", "Kabylie", "القبائل"),
    cx: 56,
    cy: 22,
    description: L(
      "A mountainous region rich in Berber language, music, and resistance.",
      "Une région montagneuse riche en langue, musique et résistance berbères.",
      "منطقة جبلية غنية باللغة والموسيقى والمقاومة الأمازيغية."
    ),
    figureIds: ["lalla-fatma-nsoumer", "abane-ramdane", "matoub", "idir", "ait-menguellet"],
    events: [
      L("Soummam Congress (1956)", "Congrès de la Soummam (1956)", "مؤتمر الصومام (1956)"),
      L("Tafsut Imazighen (1980)", "Tafsut Imazighen (1980)", "تافسوت إيمازيغن (1980)"),
    ],
  },
  {
    id: "constantine",
    name: L("Constantine", "Constantine", "قسنطينة"),
    cx: 70,
    cy: 24,
    description: L(
      "The ancient city of Cirta — capital of Numidia and stronghold of Ahmed Bey.",
      "L'antique cité de Cirta — capitale de la Numidie et bastion d'Ahmed Bey.",
      "مدينة سيرتا القديمة — عاصمة نوميديا ومعقل أحمد باي."
    ),
    figureIds: ["massinissa", "ahmed-bey"],
    events: [
      L("Capital of Numidia", "Capitale de la Numidie", "عاصمة نوميديا"),
      L("Resistance under Ahmed Bey (1830s)", "Résistance sous Ahmed Bey (années 1830)", "مقاومة أحمد باي (ثلاثينيات القرن 19)"),
    ],
  },
  {
    id: "aures",
    name: L("Aurès", "Aurès", "الأوراس"),
    cx: 65,
    cy: 38,
    description: L(
      "Mountains of legendary resistance — from Dihya to the first shots of November 1954.",
      "Montagnes d'une résistance légendaire — de Dihya aux premiers coups de novembre 1954.",
      "جبال المقاومة الأسطورية — من ديهيا إلى أوائل رصاصات نوفمبر 1954."
    ),
    figureIds: ["dihya"],
    events: [
      L("Dihya's resistance (7th c.)", "Résistance de Dihya (VIIᵉ s.)", "مقاومة ديهيا (ق7)"),
      L("November 1, 1954 — start of the war", "1er novembre 1954 — début de la guerre", "1 نوفمبر 1954 — اندلاع الثورة"),
    ],
  },
  {
    id: "oran-west",
    name: L("Western Algeria", "Algérie de l'Ouest", "الغرب الجزائري"),
    cx: 26,
    cy: 30,
    description: L(
      "Land of Emir Abdelkader — birthplace of the modern Algerian state idea.",
      "Terre de l'Émir Abdelkader — berceau de l'idée moderne d'État algérien.",
      "أرض الأمير عبد القادر — مهد فكرة الدولة الجزائرية الحديثة."
    ),
    figureIds: ["abdelkader"],
    events: [
      L("Resistance of Emir Abdelkader (1832–1847)", "Résistance de l'Émir Abdelkader (1832–1847)", "مقاومة الأمير عبد القادر (1832–1847)"),
    ],
  },
  {
    id: "sahara",
    name: L("Sahara", "Sahara", "الصحراء"),
    cx: 52,
    cy: 80,
    description: L(
      "Vast southern desert — home to Tuareg culture, oases, and ancient trade routes.",
      "Vaste désert du sud — terre de la culture touarègue, des oasis et des routes caravanières.",
      "الصحراء الشاسعة — موطن الثقافة الطارقية والواحات وطرق القوافل القديمة."
    ),
    figureIds: [],
    events: [
      L("Trans-Saharan trade", "Commerce transsaharien", "التجارة العابرة للصحراء"),
      L("Tassili n'Ajjer rock art", "Art rupestre du Tassili n'Ajjer", "نقوش الطاسيلي ناجر الصخرية"),
    ],
  },
];

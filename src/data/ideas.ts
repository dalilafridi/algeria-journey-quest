import type { Localized, LocalizedString } from "@/lib/i18n";

const L = (en: string, fr: string, ar: string): Localized<string> => ({ en, fr, ar });

export type IdeaFounder = {
  /** Figure ID (from src/data/figures.ts) — clicking opens the figure profile. */
  figureId: string;
  role: LocalizedString;
  description: LocalizedString;
};

export type IdeaMiniFigure = {
  id: string;
  emoji?: string;
  name: LocalizedString;
  role: LocalizedString;
};

export type IdeaTopic = {
  id: string;
  emoji: string;
  title: LocalizedString;
  /** 2–3 line short explanation. */
  summary: LocalizedString;
  /** Figure IDs (from src/data/figures.ts) associated with this idea. */
  figureIds: string[];
  /** Word IDs (from src/data/words.ts) acting as supporting quotes. */
  wordIds: string[];
  /** Optional highlighted founder card linking to an existing figure profile. */
  founder?: IdeaFounder;
  /** Optional simple mini-cards for associated figures without full profiles. */
  miniFigures?: IdeaMiniFigure[];
};

export const IDEAS: IdeaTopic[] = [
  {
    id: "plural-algeria",
    emoji: "🌿",
    title: L(
      "Plural Algeria",
      "Algérie plurielle",
      "الجزائر التعددية",
    ),
    summary: L(
      "Algeria as a diverse, multi-cultural nation — Arab, Amazigh, Mediterranean and African — held together by shared ideas rather than a single voice.",
      "L'Algérie comme nation diverse et plurielle — arabe, amazighe, méditerranéenne et africaine — unie par des idées partagées plutôt que par une voix unique.",
      "الجزائر أمّةً متنوّعة ومتعدّدة — عربية وأمازيغية ومتوسطية وأفريقية — يجمعها فكرٌ مشترك لا صوتٌ واحد.",
    ),
    figureIds: ["amar-imache"],
    wordIds: ["imache-ideas"],
  },
  {
    id: "national-identity",
    emoji: "🇩🇿",
    title: L(
      "National Identity",
      "Identité nationale",
      "الهوية الوطنية",
    ),
    summary: L(
      "Unity built through shared struggle, symbols and song — from the verses of Kassaman to the long memory of the Algerian Iliad.",
      "Une unité bâtie par la lutte partagée, les symboles et le chant — des vers de Kassaman à la longue mémoire de L'Iliade algérienne.",
      "وحدةٌ تتشكّل عبر النضال المشترك والرموز والنشيد — من أبيات «قسماً» إلى الذاكرة الطويلة في «إلياذة الجزائر».",
    ),
    figureIds: ["moufdi-zakaria", "ben-badis"],
    wordIds: ["kassaman-excerpt", "iliyadha-aljazair", "ben-badis-identity"],
  },
  {
    id: "culture-language",
    emoji: "📖",
    title: L(
      "Culture & Language",
      "Culture & langue",
      "الثقافة واللغة",
    ),
    summary: L(
      "Identity survives through what we transmit — the words, songs and stories that pass from one generation to the next.",
      "L'identité survit par ce qu'on transmet — mots, chants et récits qui passent d'une génération à l'autre.",
      "تنجو الهوية بما نُورِّثه — كلماتٍ وأغانيَ وحكاياتٍ تنتقل من جيلٍ إلى جيل.",
    ),
    figureIds: ["mammeri", "matoub", "ait-menguellet"],
    wordIds: ["mammeri-language", "mammeri-transmission", "matoub-truth"],
  },
  {
    id: "civilizational-renewal",
    emoji: "🧭",
    title: L(
      "Civilizational Renewal",
      "Renouveau civilisationnel",
      "النهضة الحضارية",
    ),
    summary: L(
      "Why do societies decline, and how do they rise again? An Algerian thinker's reflection on ideas, ethics and culture as the conditions of renewal.",
      "Pourquoi les sociétés déclinent-elles, et comment se relèvent-elles ? La réflexion d'un penseur algérien sur les idées, l'éthique et la culture comme conditions du renouveau.",
      "لماذا تنحطّ المجتمعات وكيف تنهض من جديد؟ تأمّلٌ لمفكّر جزائري في الأفكار والأخلاق والثقافة بوصفها شروط النهضة.",
    ),
    figureIds: ["malek-bennabi"],
    wordIds: ["bennabi-ideas"],
  },
  {
    id: "liberation-thought",
    emoji: "✊",
    title: L(
      "Liberation & Thought",
      "Libération & pensée",
      "التحرّر والفكر",
    ),
    summary: L(
      "Algeria as a laboratory of liberation — where each generation must discover its mission, fulfill it, or betray it.",
      "L'Algérie comme laboratoire de libération — où chaque génération doit découvrir sa mission, l'accomplir ou la trahir.",
      "الجزائر مختبرًا للتحرّر — حيث على كلّ جيلٍ أن يكتشف رسالته فيحقّقها أو يخونها.",
    ),
    figureIds: ["frantz-fanon"],
    wordIds: ["fanon-each-generation"],
  },
  {
    id: "ulama-reform",
    emoji: "🕌",
    title: L(
      "Association of Algerian Muslim Ulama",
      "Association des oulémas musulmans algériens",
      "جمعية العلماء المسلمين الجزائريين",
    ),
    summary: L(
      "Founded in 1931, a reformist movement that revived Arabic, Islamic learning and a sense of shared Algerian identity through schools, journals and study circles.",
      "Fondée en 1931, un mouvement réformiste qui fit revivre la langue arabe, le savoir islamique et un sentiment d'identité algérienne partagée à travers écoles, revues et cercles d'étude.",
      "تأسّست عام 1931، حركةٌ إصلاحية أحْيَت العربية والعلوم الإسلامية والشعور بهوية جزائرية مشتركة عبر المدارس والمجلات وحلقات الدرس.",
    ),
    figureIds: [],
    wordIds: ["ben-badis-identity"],
    founder: {
      figureId: "ben-badis",
      role: L(
        "Founder · Reformist scholar",
        "Fondateur · Savant réformiste",
        "المؤسِّس · عالِم إصلاحي",
      ),
      description: L(
        "Founder of the Association and key figure in Algerian reform and education.",
        "Fondateur de l'Association et figure clé de la réforme et de l'éducation en Algérie.",
        "مؤسِّس الجمعية وأحد أبرز رموز الإصلاح والتعليم في الجزائر.",
      ),
    },
    miniFigures: [
      {
        id: "bachir-ibrahimi",
        emoji: "📚",
        name: L("Bachir El Ibrahimi", "Bachir El Ibrahimi", "البشير الإبراهيمي"),
        role: L(
          "Successor · Scholar & writer",
          "Successeur · Savant et écrivain",
          "الخَلَف · عالم وكاتب",
        ),
      },
      {
        id: "larbi-tebessi",
        emoji: "🕯️",
        name: L("Larbi Tebessi", "Larbi Tebessi", "العربي التبسي"),
        role: L(
          "Reformist scholar · Martyr",
          "Savant réformiste · Martyr",
          "عالم إصلاحي · شهيد",
        ),
      },
    ],
  },
];

export function getIdea(id: string): IdeaTopic | undefined {
  return IDEAS.find((i) => i.id === id);
}

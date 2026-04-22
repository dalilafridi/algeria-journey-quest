import type { LocalizedString } from "@/lib/i18n";

const L = (en: string, fr: string, ar: string): LocalizedString => ({ en, fr, ar });

export type WordsQuizKind = "true-false" | "who-am-i" | "who-said";

export type WordsQuizItem = {
  /** Matches a word ID from `src/data/words.ts`. */
  wordId: string;
  kind: WordsQuizKind;
  question: LocalizedString;
  /** For T/F: ["True","False"]. Otherwise 3–4 options. */
  options: LocalizedString[];
  /** Index into `options`. */
  correctIndex: number;
  explanation: LocalizedString;
};

export const wordsQuiz: WordsQuizItem[] = [
  // ---------- National Voice ----------
  {
    wordId: "kassaman-excerpt",
    kind: "who-said",
    question: L(
      "Who wrote the words of Kassaman, Algeria's national anthem?",
      "Qui a écrit les paroles de Kassaman, l'hymne national algérien ?",
      "من كتب كلمات «قَسَمًا»، النشيد الوطني الجزائري؟",
    ),
    options: [
      L("Moufdi Zakaria", "Moufdi Zakaria", "مفدي زكريا"),
      L("Mohamed Fawzi", "Mohamed Fawzi", "محمد فوزي"),
      L("Kateb Yacine", "Kateb Yacine", "كاتب ياسين"),
      L("Mouloud Mammeri", "Mouloud Mammeri", "مولود معمري"),
    ],
    correctIndex: 0,
    explanation: L(
      "Moufdi Zakaria wrote Kassaman in Barberousse Prison in 1956. The music was composed later by Mohamed Fawzi.",
      "Moufdi Zakaria a écrit Kassaman à la prison de Barberousse en 1956. La musique fut composée plus tard par Mohamed Fawzi.",
      "كتب مفدي زكريا «قَسَمًا» في سجن بربروس سنة 1956، ولحّنه لاحقًا محمد فوزي.",
    ),
  },
  {
    wordId: "kassaman-excerpt",
    kind: "true-false",
    question: L(
      "Kassaman was written before Algerian independence.",
      "Kassaman a été écrit avant l'indépendance algérienne.",
      "كُتب «قَسَمًا» قبل استقلال الجزائر.",
    ),
    options: [
      L("True", "Vrai", "صحيح"),
      L("False", "Faux", "خطأ"),
    ],
    correctIndex: 0,
    explanation: L(
      "Yes — written in 1956 during the War of Independence, six years before independence in 1962.",
      "Oui — écrit en 1956 pendant la guerre d'indépendance, six ans avant l'indépendance de 1962.",
      "نعم — كُتب سنة 1956 خلال حرب التحرير، أي قبل الاستقلال (1962) بست سنوات.",
    ),
  },

  // ---------- Algerian Iliad ----------
  {
    wordId: "iliyadha-aljazair",
    kind: "who-said",
    question: L(
      "Who wrote Iliyadha al-Jaza'ir (The Algerian Iliad)?",
      "Qui a écrit « Iliyadha al-Jaza'ir » (L'Iliade algérienne) ?",
      "من كتب «إلياذة الجزائر»؟",
    ),
    options: [
      L("Moufdi Zakaria", "Moufdi Zakaria", "مفدي زكريا"),
      L("Kateb Yacine", "Kateb Yacine", "كاتب ياسين"),
      L("Mouloud Mammeri", "Mouloud Mammeri", "مولود معمري"),
      L("Mohamed Dib", "Mohamed Dib", "محمد ديب"),
    ],
    correctIndex: 0,
    explanation: L(
      "Moufdi Zakaria — author of both Kassaman and Iliyadha al-Jaza'ir, an epic of more than 1,000 verses.",
      "Moufdi Zakaria — auteur de Kassaman et de « Iliyadha al-Jaza'ir », une épopée de plus de 1 000 vers.",
      "مفدي زكريا — صاحب «قَسَمًا» و«إلياذة الجزائر» المؤلَّفة من أكثر من ألف بيت.",
    ),
  },
  {
    wordId: "iliyadha-aljazair",
    kind: "true-false",
    question: L(
      "The Algerian Iliad is a poem celebrating Algeria's history, identity, and unity.",
      "L'Iliade algérienne est un poème célébrant l'histoire, l'identité et l'unité de l'Algérie.",
      "«إلياذة الجزائر» قصيدة تحتفي بتاريخ الجزائر وهويتها ووحدتها.",
    ),
    options: [
      L("True", "Vrai", "صحيح"),
      L("False", "Faux", "خطأ"),
    ],
    correctIndex: 0,
    explanation: L(
      "True — more than 1,000 verses recited in 1972 to celebrate ten years of independence.",
      "Vrai — plus de 1 000 vers récités en 1972 pour célébrer dix ans d'indépendance.",
      "صحيح — أكثر من ألف بيت أُلقيت سنة 1972 احتفاءً بعشرية الاستقلال.",
    ),
  },
  {
    wordId: "iliyadha-aljazair",
    kind: "who-am-i",
    question: L(
      "I wrote Kassaman and The Algerian Iliad — who am I?",
      "J'ai écrit Kassaman et L'Iliade algérienne — qui suis-je ?",
      "كتبتُ «قَسَمًا» و«إلياذة الجزائر» — من أكون؟",
    ),
    options: [
      L("Moufdi Zakaria", "Moufdi Zakaria", "مفدي زكريا"),
      L("Frantz Fanon", "Frantz Fanon", "فرانز فانون"),
      L("Mouloud Mammeri", "Mouloud Mammeri", "مولود معمري"),
    ],
    correctIndex: 0,
    explanation: L(
      "Moufdi Zakaria — poet of the Algerian nation, from the anthem to the great epic.",
      "Moufdi Zakaria — poète de la nation algérienne, de l'hymne à la grande épopée.",
      "مفدي زكريا — شاعر الأمّة الجزائرية، من النشيد إلى الملحمة الكبرى.",
    ),
  },
  {
    wordId: "jugurtha-rome-for-sale",
    kind: "who-said",
    question: L(
      "Who said: \"Rome is a city for sale\"?",
      "Qui a dit : « Rome est une ville à vendre » ?",
      "من قال: «روما مدينةٌ للبيع»؟",
    ),
    options: [
      L("Massinissa", "Massinissa", "ماسينيسا"),
      L("Jugurtha", "Jugurtha", "يوغرطة"),
      L("Hannibal", "Hannibal", "حنبعل"),
      L("Juba I", "Juba Iᵉʳ", "يوبا الأول"),
    ],
    correctIndex: 1,
    explanation: L(
      "Jugurtha, the Numidian king, after bribing Roman senators in the 2nd century BC.",
      "Jugurtha, roi numide, après avoir corrompu des sénateurs romains au IIᵉ siècle av. J.-C.",
      "قالها يوغرطة الملك النوميدي بعد رشوته أعضاء مجلس الشيوخ الروماني في القرن الثاني قبل الميلاد.",
    ),
  },

  // ---------- Thinkers & Writers ----------
  {
    wordId: "mammeri-language",
    kind: "true-false",
    question: L(
      "Mouloud Mammeri spent his life collecting Tamazight poetry and grammar.",
      "Mouloud Mammeri a consacré sa vie à recueillir la poésie et la grammaire tamazightes.",
      "كرّس مولود معمري حياته لجمع الشعر والقواعد الأمازيغية.",
    ),
    options: [
      L("True", "Vrai", "صحيح"),
      L("False", "Faux", "خطأ"),
    ],
    correctIndex: 0,
    explanation: L(
      "True — his work helped spark the 1980 Berber Spring (Tafsut Imazighen).",
      "Vrai — son travail contribua au Printemps berbère de 1980 (Tafsut Imazighen).",
      "صحيح — أسهم عمله في إشعال الربيع الأمازيغي 1980 (تافسوت إيمازيغن).",
    ),
  },
  {
    wordId: "fanon-each-generation",
    kind: "who-said",
    question: L(
      "\"Each generation must discover its mission, fulfill it, or betray it.\" — who?",
      "« Chaque génération doit découvrir sa mission, l'accomplir ou la trahir. » — qui ?",
      "«على كلّ جيل أن يكتشف رسالته فيحقّقها أو يخونها» — من؟",
    ),
    options: [
      L("Frantz Fanon", "Frantz Fanon", "فرانز فانون"),
      L("Albert Camus", "Albert Camus", "ألبير كامو"),
      L("Mouloud Mammeri", "Mouloud Mammeri", "مولود معمري"),
      L("Kateb Yacine", "Kateb Yacine", "كاتب ياسين"),
    ],
    correctIndex: 0,
    explanation: L(
      "Frantz Fanon, in The Wretched of the Earth — written in Algeria during the war of independence.",
      "Frantz Fanon, dans Les Damnés de la Terre — écrit en Algérie pendant la guerre d'indépendance.",
      "فرانز فانون في «معذّبو الأرض» — كُتب في الجزائر إبّان حرب التحرير.",
    ),
  },

  // ---------- Cultural Expression ----------
  {
    wordId: "ait-menguellet-words",
    kind: "who-am-i",
    question: L(
      "I am a Kabyle poet-singer whose songs became a quiet form of resistance — who am I?",
      "Je suis un poète-chanteur kabyle dont les chansons sont devenues une forme tranquille de résistance — qui suis-je ?",
      "أنا شاعر ومغنٍّ قبائلي تحوّلت أغانيه إلى مقاومة هادئة — من أكون؟",
    ),
    options: [
      L("Idir", "Idir", "إيدير"),
      L("Lounès Matoub", "Lounès Matoub", "لونيس معطوب"),
      L("Lounis Aït Menguellet", "Lounis Aït Menguellet", "لونيس آيت منقلات"),
    ],
    correctIndex: 2,
    explanation: L(
      "Lounis Aït Menguellet — decades of Kabyle song turning poetry into steady, quiet resistance.",
      "Lounis Aït Menguellet — des décennies de chanson kabyle, la poésie devenue résistance tranquille.",
      "لونيس آيت منقلات — عقود من الأغنية القبائلية حوّلت الشعر إلى مقاومة هادئة وراسخة.",
    ),
  },
  {
    wordId: "matoub-truth",
    kind: "true-false",
    question: L(
      "Lounès Matoub paid with his life for defending Amazigh identity and free speech.",
      "Lounès Matoub a payé de sa vie la défense de l'identité amazighe et de la parole libre.",
      "دفع لونيس معطوب حياته ثمنًا للدفاع عن الهوية الأمازيغية وحرية الكلمة.",
    ),
    options: [
      L("True", "Vrai", "صحيح"),
      L("False", "Faux", "خطأ"),
    ],
    correctIndex: 0,
    explanation: L(
      "True — he was assassinated in 1998, becoming a symbol of resistance through song.",
      "Vrai — assassiné en 1998, il est devenu un symbole de résistance par la chanson.",
      "صحيح — اغتيل سنة 1998 وأصبح رمزًا للمقاومة عبر الأغنية.",
    ),
  },
  {
    wordId: "idir-avava",
    kind: "who-said",
    question: L(
      "Who sang \"A Vava Inouva\", the first Algerian song to travel the world in Tamazight?",
      "Qui a chanté « A Vava Inouva », la première chanson algérienne à parcourir le monde en tamazight ?",
      "من غنّى «أ فافا إينوفا»، أوّل أغنية جزائرية تجوب العالم بالأمازيغية؟",
    ),
    options: [
      L("Idir", "Idir", "إيدير"),
      L("Cheb Khaled", "Cheb Khaled", "الشاب خالد"),
      L("Warda", "Warda", "وردة"),
      L("Souad Massi", "Souad Massi", "سعاد ماسي"),
    ],
    correctIndex: 0,
    explanation: L(
      "Idir released A Vava Inouva in 1976 — a Kabyle lullaby that became a worldwide hit.",
      "Idir a sorti A Vava Inouva en 1976 — une berceuse kabyle devenue un succès mondial.",
      "أصدر إيدير «أ فافا إينوفا» سنة 1976 — تهويدة قبائلية تحوّلت إلى نجاح عالمي.",
    ),
  },
];

export function quizForWord(wordId: string): WordsQuizItem | undefined {
  return wordsQuiz.find((q) => q.wordId === wordId);
}

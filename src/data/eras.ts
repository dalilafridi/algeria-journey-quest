export type QuizQuestion = {
  question: string;
  options: string[];
  answerIndex: number;
};

export type Era = {
  id: string;
  title: string;
  dateRange: string;
  emoji: string;
  summary: string;
  figures: { name: string; note: string }[];
  places: { name: string; note: string }[];
  facts: string[];
  badge: string;
  quiz: QuizQuestion[];
};

export const eras: Era[] = [
  {
    id: "numidia",
    title: "Numidia",
    dateRange: "202 BC – 46 BC",
    emoji: "🏺",
    summary:
      "Long before modern borders existed, the Berber kingdom of Numidia rose across what is now northern Algeria. Famous for its skilled cavalry and clever kings, Numidia stood as one of North Africa's first great powers.",
    figures: [
      { name: "Massinissa", note: "First king of a united Numidia, ally of Rome." },
      { name: "Jugurtha", note: "Bold king who defied Rome in a long war." },
    ],
    places: [
      { name: "Cirta", note: "The royal capital, today's Constantine." },
      { name: "Hippo Regius", note: "Important coastal city." },
    ],
    facts: [
      "Numidian horsemen were so feared that Rome and Carthage both wanted them as allies.",
      "Massinissa lived to be over 90 and led troops into his last years.",
    ],
    badge: "Explorer of Numidia",
    quiz: [
      {
        question: "Who was the first king to unite Numidia?",
        options: ["Jugurtha", "Massinissa", "Hannibal", "Juba II"],
        answerIndex: 1,
      },
      {
        question: "What was the capital of Numidia?",
        options: ["Carthage", "Hippo", "Cirta", "Timgad"],
        answerIndex: 2,
      },
      {
        question: "Numidia was especially famous for its…",
        options: ["Navy", "Cavalry", "Pyramids", "Silk trade"],
        answerIndex: 1,
      },
    ],
  },
  {
    id: "roman",
    title: "Roman Algeria",
    dateRange: "46 BC – 430 AD",
    emoji: "🏛️",
    summary:
      "After Rome absorbed Numidia, the region became one of the empire's richest provinces. Wheat, olive oil, and grand cities flourished — and many Algerian-born thinkers helped shape Roman and Christian thought.",
    figures: [
      { name: "Saint Augustine", note: "Famous philosopher born in Thagaste." },
      { name: "Juba II", note: "Scholar-king educated in Rome." },
    ],
    places: [
      { name: "Timgad", note: "A perfectly planned Roman city, still standing." },
      { name: "Djemila", note: "Mountain city with stunning ruins." },
    ],
    facts: [
      "Timgad was built as a retirement town for Roman soldiers.",
      "North Africa was called the 'breadbasket of Rome'.",
    ],
    badge: "Roman Wanderer",
    quiz: [
      {
        question: "Which famous philosopher was born in Roman Algeria?",
        options: ["Plato", "Saint Augustine", "Cicero", "Seneca"],
        answerIndex: 1,
      },
      {
        question: "Why was North Africa vital to Rome?",
        options: ["Gold mines", "Wheat supply", "Spices", "Warships"],
        answerIndex: 1,
      },
      {
        question: "Timgad was originally built for…",
        options: ["Traders", "Retired soldiers", "Priests", "Sailors"],
        answerIndex: 1,
      },
    ],
  },
  {
    id: "islamic",
    title: "Early Islamic Algeria",
    dateRange: "7th – 16th century",
    emoji: "🕌",
    summary:
      "Islam arrived with Arab armies in the 7th century, blending with Berber culture to create powerful dynasties. Cities like Tlemcen became centers of learning, art, and trade across the Mediterranean and Sahara.",
    figures: [
      { name: "Kahina", note: "Berber warrior queen who resisted the Arab conquest." },
      { name: "Ibn Khaldun", note: "Pioneer historian who lived and wrote in Algeria." },
    ],
    places: [
      { name: "Tlemcen", note: "Jewel city of the Zayyanid dynasty." },
      { name: "Béjaïa", note: "Major port that introduced Arabic numerals to Europe." },
    ],
    facts: [
      "Ibn Khaldun is considered one of the founders of sociology.",
      "Fibonacci learned Arabic numerals in Béjaïa as a young man.",
    ],
    badge: "Scholar of the Maghreb",
    quiz: [
      {
        question: "Which queen led Berber resistance to the Arab conquest?",
        options: ["Cleopatra", "Kahina", "Zenobia", "Dihya II"],
        answerIndex: 1,
      },
      {
        question: "Ibn Khaldun is known as a pioneer of…",
        options: ["Astronomy", "Sociology", "Medicine", "Poetry"],
        answerIndex: 1,
      },
      {
        question: "Which city helped spread Arabic numerals to Europe?",
        options: ["Algiers", "Béjaïa", "Oran", "Annaba"],
        answerIndex: 1,
      },
    ],
  },
  {
    id: "french",
    title: "French Colonization",
    dateRange: "1830 – 1962",
    emoji: "⚓",
    summary:
      "In 1830, France invaded Algiers, beginning over 130 years of colonization. Algerians faced land seizures and harsh rule, but resistance — like Emir Abdelkader's — never truly stopped.",
    figures: [
      { name: "Emir Abdelkader", note: "Leader of early resistance, respected even by enemies." },
      { name: "Lalla Fatma N'Soumer", note: "Heroine who led resistance in Kabylia." },
    ],
    places: [
      { name: "Algiers", note: "The capital, taken by French forces in 1830." },
      { name: "Constantine", note: "Site of fierce battles against the conquest." },
    ],
    facts: [
      "Emir Abdelkader is honored with a statue in Damascus and even a town in the USA.",
      "Algeria was treated as part of France itself — not a typical colony.",
    ],
    badge: "Keeper of Memory",
    quiz: [
      {
        question: "When did France invade Algiers?",
        options: ["1789", "1830", "1871", "1900"],
        answerIndex: 1,
      },
      {
        question: "Who led the great early resistance against the French?",
        options: ["Ben Bella", "Abdelkader", "Boumediene", "Massinissa"],
        answerIndex: 1,
      },
      {
        question: "Lalla Fatma N'Soumer led resistance in which region?",
        options: ["Sahara", "Kabylia", "Oran", "Tlemcen"],
        answerIndex: 1,
      },
    ],
  },
  {
    id: "independence",
    title: "War of Independence",
    dateRange: "1954 – 1962",
    emoji: "🕊️",
    summary:
      "On November 1, 1954, the FLN launched a revolution that would change history. After eight years of struggle and great sacrifice, Algeria won its independence on July 5, 1962.",
    figures: [
      { name: "Larbi Ben M'hidi", note: "Heroic leader of the Battle of Algiers." },
      { name: "Djamila Bouhired", note: "Young revolutionary and symbol of resistance." },
    ],
    places: [
      { name: "Casbah of Algiers", note: "Heart of the urban resistance." },
      { name: "Aurès Mountains", note: "Where the revolution's first shots were fired." },
    ],
    facts: [
      "The revolution began with coordinated attacks on November 1, 1954 — 'Toussaint Rouge'.",
      "Independence Day is celebrated every July 5th across Algeria.",
    ],
    badge: "Champion of Liberty",
    quiz: [
      {
        question: "When did the Algerian revolution begin?",
        options: ["July 5, 1962", "November 1, 1954", "March 19, 1962", "May 8, 1945"],
        answerIndex: 1,
      },
      {
        question: "Where were the first shots of the revolution fired?",
        options: ["Algiers", "Oran", "Aurès Mountains", "Sahara"],
        answerIndex: 2,
      },
      {
        question: "When did Algeria gain independence?",
        options: ["1954", "1958", "1962", "1965"],
        answerIndex: 2,
      },
    ],
  },
];

export const dailyFacts = eras.flatMap((e) => e.facts);

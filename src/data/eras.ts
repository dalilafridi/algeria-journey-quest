export type MCQQuestion = {
  type: "mcq";
  question: string;
  options: string[];
  answerIndex: number;
};

export type TrueFalseQuestion = {
  type: "truefalse";
  statement: string;
  answer: boolean;
  explanation?: string;
};

export type WhoAmIQuestion = {
  type: "whoami";
  clues: string[]; // shown one by one or all at once
  options: string[];
  answerIndex: number;
};

export type OrderQuestion = {
  type: "order";
  prompt: string;
  // Items in CORRECT chronological order. The quiz will shuffle them.
  items: { label: string; hint?: string }[];
};

export type ImageQuestion = {
  type: "image";
  question: string;
  imageUrl?: string; // placeholder for now
  imageEmoji?: string; // fallback visual
  options: string[];
  answerIndex: number;
};

export type QuizQuestion =
  | MCQQuestion
  | TrueFalseQuestion
  | WhoAmIQuestion
  | OrderQuestion
  | ImageQuestion;

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
  quiz: QuizQuestion[]; // pool — quiz picks 5–7 at random
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
        type: "mcq",
        question: "Who was the first king to unite Numidia?",
        options: ["Jugurtha", "Massinissa", "Hannibal", "Juba II"],
        answerIndex: 1,
      },
      {
        type: "mcq",
        question: "What was the capital of Numidia?",
        options: ["Carthage", "Hippo", "Cirta", "Timgad"],
        answerIndex: 2,
      },
      {
        type: "mcq",
        question: "Numidia was especially famous for its…",
        options: ["Navy", "Cavalry", "Pyramids", "Silk trade"],
        answerIndex: 1,
      },
      {
        type: "truefalse",
        statement: "Numidia was located in what is today northern Algeria.",
        answer: true,
        explanation: "Numidia stretched across much of modern northern Algeria.",
      },
      {
        type: "truefalse",
        statement: "Massinissa was an enemy of Rome throughout his entire reign.",
        answer: false,
        explanation: "Massinissa was actually a long-time ally of Rome against Carthage.",
      },
      {
        type: "whoami",
        clues: [
          "I lived to be over 90 years old.",
          "I led the unification of my Berber kingdom.",
          "I was a famous ally of Rome.",
        ],
        options: ["Jugurtha", "Hannibal", "Massinissa", "Juba II"],
        answerIndex: 2,
      },
      {
        type: "whoami",
        clues: [
          "I defied Rome in a long, fierce war.",
          "My name is attached to a famous Roman conflict.",
          "I was eventually betrayed and captured.",
        ],
        options: ["Massinissa", "Jugurtha", "Syphax", "Juba I"],
        answerIndex: 1,
      },
      {
        type: "order",
        prompt: "Place these Numidian moments in chronological order.",
        items: [
          { label: "Massinissa unites Numidia", hint: "~202 BC" },
          { label: "Jugurthine War with Rome", hint: "112–106 BC" },
          { label: "Numidia annexed by Rome", hint: "46 BC" },
        ],
      },
      {
        type: "image",
        question: "This iconic ancient capital of Numidia is known today as…",
        imageEmoji: "🏛️",
        options: ["Algiers", "Constantine (Cirta)", "Oran", "Tlemcen"],
        answerIndex: 1,
      },
      {
        type: "mcq",
        question: "Numidia was located in what modern country?",
        options: ["Egypt", "Algeria", "Morocco", "Tunisia"],
        answerIndex: 1,
      },
      {
        type: "mcq",
        question: "What made Numidian cavalry famous?",
        options: ["Heavy armor", "Speed and mobility", "Use of elephants", "Naval tactics"],
        answerIndex: 1,
      },
      {
        type: "mcq",
        question: "Who did Massinissa ally with during the Punic Wars?",
        options: ["Carthage", "Rome", "Greece", "Egypt"],
        answerIndex: 1,
      },
      {
        type: "mcq",
        question: "What war is Jugurtha known for?",
        options: ["Punic War", "Jugurthine War", "Gallic War", "Peloponnesian War"],
        answerIndex: 1,
      },
      {
        type: "mcq",
        question: "Who defeated Jugurtha?",
        options: ["Hannibal", "Marius", "Caesar", "Alexander"],
        answerIndex: 1,
      },
      {
        type: "truefalse",
        statement: "Numidia was known for its strong navy.",
        answer: false,
        explanation: "Numidia was famous for its cavalry, not its navy.",
      },
      {
        type: "truefalse",
        statement: "Numidia was once divided into two kingdoms.",
        answer: true,
        explanation: "It was split between eastern and western kingdoms before Massinissa united it.",
      },
      {
        type: "whoami",
        clues: [
          "I was a Numidian king.",
          "I united the Berber tribes.",
          "I supported Rome against Carthage.",
        ],
        options: ["Jugurtha", "Massinissa", "Hamilcar", "Scipio"],
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
        type: "mcq",
        question: "Which famous philosopher was born in Roman Algeria?",
        options: ["Plato", "Saint Augustine", "Cicero", "Seneca"],
        answerIndex: 1,
      },
      {
        type: "mcq",
        question: "Why was North Africa vital to Rome?",
        options: ["Gold mines", "Wheat supply", "Spices", "Warships"],
        answerIndex: 1,
      },
      {
        type: "mcq",
        question: "Timgad was originally built for…",
        options: ["Traders", "Retired soldiers", "Priests", "Sailors"],
        answerIndex: 1,
      },
      {
        type: "truefalse",
        statement: "North Africa was called the 'breadbasket of Rome'.",
        answer: true,
        explanation: "Its wheat and olive oil fed much of the empire.",
      },
      {
        type: "truefalse",
        statement: "Saint Augustine was born in Italy.",
        answer: false,
        explanation: "He was born in Thagaste, in present-day Algeria.",
      },
      {
        type: "whoami",
        clues: [
          "I was born in Thagaste.",
          "My writings shaped Western Christian thought.",
          "I wrote 'Confessions'.",
        ],
        options: ["Cicero", "Saint Augustine", "Tertullian", "Juba II"],
        answerIndex: 1,
      },
      {
        type: "whoami",
        clues: [
          "I was a scholar-king educated in Rome.",
          "I ruled a kingdom near Numidia.",
          "I was married to Cleopatra Selene II.",
        ],
        options: ["Massinissa", "Jugurtha", "Juba II", "Hannibal"],
        answerIndex: 2,
      },
      {
        type: "order",
        prompt: "Order these events of Roman North Africa.",
        items: [
          { label: "Rome annexes Numidia", hint: "46 BC" },
          { label: "Timgad founded as colony", hint: "100 AD" },
          { label: "Vandals invade North Africa", hint: "429 AD" },
        ],
      },
      {
        type: "image",
        question: "This perfectly preserved Roman city in Algeria is…",
        imageEmoji: "🏛️",
        options: ["Pompeii", "Timgad", "Leptis Magna", "Carthage"],
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
        type: "mcq",
        question: "Which queen led Berber resistance to the Arab conquest?",
        options: ["Cleopatra", "Kahina", "Zenobia", "Dihya II"],
        answerIndex: 1,
      },
      {
        type: "mcq",
        question: "Ibn Khaldun is known as a pioneer of…",
        options: ["Astronomy", "Sociology", "Medicine", "Poetry"],
        answerIndex: 1,
      },
      {
        type: "mcq",
        question: "Which city helped spread Arabic numerals to Europe?",
        options: ["Algiers", "Béjaïa", "Oran", "Annaba"],
        answerIndex: 1,
      },
      {
        type: "truefalse",
        statement: "Tlemcen was a renowned center of learning under the Zayyanid dynasty.",
        answer: true,
      },
      {
        type: "truefalse",
        statement: "Islam reached North Africa in the 12th century.",
        answer: false,
        explanation: "Arab armies brought Islam to the region in the 7th century.",
      },
      {
        type: "whoami",
        clues: [
          "I was a Berber warrior queen.",
          "I led fierce resistance against invading Arab armies.",
          "Legends call me 'the prophetess'.",
        ],
        options: ["Kahina (Dihya)", "Cleopatra", "Zenobia", "Tin Hinan"],
        answerIndex: 0,
      },
      {
        type: "whoami",
        clues: [
          "I am considered a founder of sociology.",
          "I wrote the 'Muqaddimah'.",
          "I lived and wrote in the Maghreb.",
        ],
        options: ["Al-Khwarizmi", "Ibn Khaldun", "Averroes", "Ibn Battuta"],
        answerIndex: 1,
      },
      {
        type: "order",
        prompt: "Order these moments of Islamic Algeria.",
        items: [
          { label: "Arab armies arrive in the Maghreb", hint: "7th century" },
          { label: "Fibonacci learns numerals in Béjaïa", hint: "~1200" },
          { label: "Zayyanid Tlemcen flourishes", hint: "13th–15th c." },
        ],
      },
      {
        type: "image",
        question: "This North African 'jewel city' was capital of the Zayyanid dynasty.",
        imageEmoji: "🕌",
        options: ["Fez", "Tlemcen", "Kairouan", "Cordoba"],
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
        type: "mcq",
        question: "When did France invade Algiers?",
        options: ["1789", "1830", "1871", "1900"],
        answerIndex: 1,
      },
      {
        type: "mcq",
        question: "Who led the great early resistance against the French?",
        options: ["Ben Bella", "Abdelkader", "Boumediene", "Massinissa"],
        answerIndex: 1,
      },
      {
        type: "mcq",
        question: "Lalla Fatma N'Soumer led resistance in which region?",
        options: ["Sahara", "Kabylia", "Oran", "Tlemcen"],
        answerIndex: 1,
      },
      {
        type: "truefalse",
        statement: "France treated Algeria as an integral part of France, not a typical colony.",
        answer: true,
      },
      {
        type: "truefalse",
        statement: "There is a town named after Emir Abdelkader in the United States.",
        answer: true,
        explanation: "Elkader, Iowa was named in his honor in 1846.",
      },
      {
        type: "whoami",
        clues: [
          "I led the early resistance against the French invasion.",
          "Even my enemies respected my honor.",
          "A statue of me stands in Damascus.",
        ],
        options: ["Ben Bella", "Emir Abdelkader", "Boumediene", "Messali Hadj"],
        answerIndex: 1,
      },
      {
        type: "whoami",
        clues: [
          "I am a heroine of Kabylia.",
          "I led resistance against French forces in the mountains.",
          "I am sometimes called the 'Joan of Arc of Djurdjura'.",
        ],
        options: ["Djamila Bouhired", "Lalla Fatma N'Soumer", "Hassiba Ben Bouali", "Kahina"],
        answerIndex: 1,
      },
      {
        type: "order",
        prompt: "Place these colonial-era events in order.",
        items: [
          { label: "France invades Algiers", hint: "1830" },
          { label: "Resistance of Lalla Fatma N'Soumer", hint: "1850s" },
          { label: "Sétif and Guelma massacres", hint: "May 1945" },
        ],
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
        type: "mcq",
        question: "When did the Algerian revolution begin?",
        options: ["July 5, 1962", "November 1, 1954", "March 19, 1962", "May 8, 1945"],
        answerIndex: 1,
      },
      {
        type: "mcq",
        question: "Where were the first shots of the revolution fired?",
        options: ["Algiers", "Oran", "Aurès Mountains", "Sahara"],
        answerIndex: 2,
      },
      {
        type: "mcq",
        question: "When did Algeria gain independence?",
        options: ["1954", "1958", "1962", "1965"],
        answerIndex: 2,
      },
      {
        type: "truefalse",
        statement: "Algeria celebrates its Independence Day on July 5th.",
        answer: true,
      },
      {
        type: "truefalse",
        statement: "The revolution was led by a single charismatic president.",
        answer: false,
        explanation: "It was led collectively by the FLN's revolutionary council.",
      },
      {
        type: "whoami",
        clues: [
          "I was a leader of the Battle of Algiers.",
          "I was captured and killed by French forces in 1957.",
          "My calm courage became legendary.",
        ],
        options: ["Ahmed Ben Bella", "Larbi Ben M'hidi", "Houari Boumediene", "Krim Belkacem"],
        answerIndex: 1,
      },
      {
        type: "whoami",
        clues: [
          "I was a young woman fighter in the Casbah.",
          "I was arrested, tortured, and condemned to death.",
          "I became a global symbol of the revolution.",
        ],
        options: ["Hassiba Ben Bouali", "Djamila Bouhired", "Lalla Fatma N'Soumer", "Zohra Drif"],
        answerIndex: 1,
      },
      {
        type: "order",
        prompt: "Order these moments of the War of Independence.",
        items: [
          { label: "Toussaint Rouge — revolution begins", hint: "Nov 1, 1954" },
          { label: "Battle of Algiers", hint: "1956–1957" },
          { label: "Évian Accords signed", hint: "March 1962" },
          { label: "Independence Day", hint: "July 5, 1962" },
        ],
      },
    ],
  },
];

export const dailyFacts = eras.flatMap((e) => e.facts);

export type MCQQuestion = {
  type: "mcq";
  question: string;
  options: string[];
  answerIndex: number;
  explanation?: string;
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
  explanation?: string;
};

export type OrderQuestion = {
  type: "order";
  prompt: string;
  // Items in CORRECT chronological order. The quiz will shuffle them.
  items: { label: string; hint?: string }[];
  explanation?: string;
};

export type ImageQuestion = {
  type: "image";
  question: string;
  imageUrl?: string; // placeholder for now
  imageEmoji?: string; // fallback visual
  options: string[];
  answerIndex: number;
  explanation?: string;
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
      "Centuries before Algeria had a name, Berber tribes galloped across its plains on swift horses. From this world rose Numidia — a proud kingdom of clever kings and feared cavalry that helped decide the fate of empires.",
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
      "Numidian riders guided their horses with just a neck rope — no saddles, no bridles.",
      "The word 'Numidia' comes from a Greek term meaning 'nomads'.",
      "Royal Numidian tombs, like the Medracen, still rise from the Algerian plains today.",
      "Numidia minted its own coins, often stamped with the king's portrait and an elephant.",
      "Jugurtha was paraded through Rome in chains before dying in a cold prison cell.",
      "Cirta, the Numidian capital, sits on dramatic cliffs — today it is Constantine.",
    ],
    badge: "Explorer of Numidia",
    quiz: [
      {
        type: "mcq",
        question: "Who was the first king to unite Numidia?",
        options: ["Jugurtha", "Massinissa", "Hannibal", "Juba II"],
        answerIndex: 1,
        explanation: "Massinissa unified the Numidian tribes around 202 BC.",
      },
      {
        type: "mcq",
        question: "What was the capital of Numidia?",
        options: ["Carthage", "Hippo", "Cirta", "Timgad"],
        answerIndex: 2,
        explanation: "Cirta — today's Constantine — was the royal capital.",
      },
      {
        type: "mcq",
        question: "Numidia was especially famous for its…",
        options: ["Navy", "Cavalry", "Pyramids", "Silk trade"],
        answerIndex: 1,
        explanation: "Numidian horsemen were prized by both Rome and Carthage.",
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
        explanation: "Massinissa reigned over 50 years and lived past 90.",
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
        explanation: "The Jugurthine War (112–106 BC) is named after King Jugurtha.",
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
        explanation: "Ancient Cirta is modern Constantine, perched on dramatic cliffs.",
      },
      {
        type: "mcq",
        question: "Numidia was located in what modern country?",
        options: ["Egypt", "Algeria", "Morocco", "Tunisia"],
        answerIndex: 1,
        explanation: "Most of ancient Numidia sits within today's Algeria.",
      },
      {
        type: "mcq",
        question: "Numidian horsemen typically rode…",
        options: ["With heavy armor and lances", "Without saddles or bridles", "On war elephants", "In chariots"],
        answerIndex: 1,
        explanation: "They guided horses with their voice and a neck rope — light and fast.",
      },
      {
        type: "mcq",
        question: "Who did Massinissa ally with during the Punic Wars?",
        options: ["Carthage", "Rome", "Greece", "Egypt"],
        answerIndex: 1,
        explanation: "He switched to Rome and helped defeat Carthage at Zama.",
      },
      {
        type: "mcq",
        question: "What war is Jugurtha known for?",
        options: ["Punic War", "Jugurthine War", "Gallic War", "Peloponnesian War"],
        answerIndex: 1,
        explanation: "The Jugurthine War shook the Roman Republic itself.",
      },
      {
        type: "mcq",
        question: "Who defeated Jugurtha?",
        options: ["Hannibal", "Marius", "Caesar", "Alexander"],
        answerIndex: 1,
        explanation: "The Roman general Gaius Marius captured Jugurtha in 105 BC.",
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
          "I was a rival Numidian king before unification.",
          "I sided with Carthage against Rome.",
          "I was captured at the Battle of Cirta.",
        ],
        options: ["Syphax", "Hannibal", "Juba I", "Bocchus"],
        answerIndex: 0,
        explanation: "Syphax ruled western Numidia and was captured in 203 BC.",
      },
    ],
  },
  {
    id: "roman",
    title: "Roman Algeria",
    dateRange: "46 BC – 430 AD",
    emoji: "🏛️",
    summary:
      "When Rome absorbed Numidia, golden wheat fields and silver olive groves turned the region into the empire's pantry. Marble cities like Timgad and Djemila rose from the plains, and a young man from Thagaste — Augustine — would one day reshape the Western mind.",
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
      "Saint Augustine wrote his 'Confessions' — one of the first autobiographies ever.",
      "Djemila means 'the beautiful' in Arabic — and its ruins really live up to the name.",
      "Roman Algeria produced so much olive oil that giant amphorae traveled across the Mediterranean.",
      "Tipaza's seaside ruins inspired the Algerian-French writer Albert Camus centuries later.",
      "The Roman city of Lambaesis was home to the legendary Third Augustan Legion.",
    ],
    badge: "Roman Wanderer",
    quiz: [
      {
        type: "mcq",
        question: "Which famous philosopher was born in Roman Algeria?",
        options: ["Plato", "Saint Augustine", "Cicero", "Seneca"],
        answerIndex: 1,
        explanation: "Saint Augustine was born in Thagaste (modern Souk Ahras).",
      },
      {
        type: "mcq",
        question: "Why was North Africa vital to Rome?",
        options: ["Gold mines", "Wheat supply", "Spices", "Warships"],
        answerIndex: 1,
        explanation: "Its wheat fields fed the city of Rome itself.",
      },
      {
        type: "mcq",
        question: "Timgad was originally built for…",
        options: ["Traders", "Retired soldiers", "Priests", "Sailors"],
        answerIndex: 1,
        explanation: "Emperor Trajan founded it as a colony for army veterans.",
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
        explanation: "Saint Augustine of Hippo — one of history's most read authors.",
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
        explanation: "Juba II ruled Mauretania and authored many books.",
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
        explanation: "Timgad's grid streets are still visible in the desert today.",
      },
      {
        type: "mcq",
        question: "Which mountain city is famous for its stunning Roman ruins?",
        options: ["Djemila", "Algiers", "Tlemcen", "Béjaïa"],
        answerIndex: 0,
        explanation: "Djemila ('the beautiful') is a UNESCO World Heritage site.",
      },
      {
        type: "mcq",
        question: "What crop made Roman North Africa especially wealthy?",
        options: ["Rice", "Olive oil and wheat", "Tea", "Cotton"],
        answerIndex: 1,
        explanation: "Vast olive groves and wheat fields enriched the province.",
      },
      {
        type: "mcq",
        question: "Saint Augustine was born in which ancient town?",
        options: ["Thagaste", "Hippo", "Cirta", "Caesarea"],
        answerIndex: 0,
        explanation: "Thagaste is today's Souk Ahras in northeast Algeria.",
      },
      {
        type: "truefalse",
        statement: "Roman rule in Algeria ended when the Vandals invaded in the 5th century.",
        answer: true,
        explanation: "The Vandals crossed from Spain and took the region by 439 AD.",
      },
      {
        type: "truefalse",
        statement: "Juba II was known mainly as a warrior, not a scholar.",
        answer: false,
        explanation: "Juba II was famous as a scholar-king, educated in Rome.",
      },
      {
        type: "whoami",
        clues: [
          "I was a bishop in Hippo.",
          "I wrote the 'City of God'.",
          "I am a saint of the Christian church.",
        ],
        options: ["Tertullian", "Saint Augustine", "Cyprian", "Origen"],
        answerIndex: 1,
        explanation: "Saint Augustine served as bishop of Hippo Regius (Annaba).",
      },
      {
        type: "truefalse",
        statement: "The Roman city of Tipaza sits along the Mediterranean coast.",
        answer: true,
        explanation: "Tipaza's seaside ruins are a UNESCO World Heritage site.",
      },
      {
        type: "mcq",
        question: "Which legendary Roman legion was based at Lambaesis in Algeria?",
        options: ["First Italian", "Third Augustan", "Tenth Equestrian", "Fifth Macedonian"],
        answerIndex: 1,
        explanation: "The Legio III Augusta guarded Roman North Africa for centuries.",
      },
    ],
  },
  {
    id: "islamic",
    title: "Early Islamic Algeria",
    dateRange: "7th – 16th century",
    emoji: "🕌",
    summary:
      "In the 7th century, Arab horsemen crossed the desert carrying a new faith. Islam met Berber spirit, sparked dynasties, and lit up cities like Tlemcen and Béjaïa — where scholars debated, traders bargained, and a young Italian named Fibonacci first met Arabic numerals.",
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
      "Tlemcen was nicknamed 'the pearl of the Maghreb' for its mosques and madrasas.",
      "Algiers earned the nickname 'El Bahdja' — 'the joyful' — during this long era.",
      "The Great Mosque of Tlemcen, built in 1136, still stands almost unchanged today.",
      "Berber and Arab cultures slowly blended, giving Algeria its unique identity.",
      "Béjaïa exported beeswax candles to Europe — the French word 'bougie' comes from its name.",
    ],
    badge: "Scholar of the Maghreb",
    quiz: [
      {
        type: "mcq",
        question: "Which queen led Berber resistance to the Arab conquest?",
        options: ["Cleopatra", "Kahina", "Zenobia", "Dihya II"],
        answerIndex: 1,
        explanation: "Kahina (Dihya) led fierce Berber resistance in the Aurès.",
      },
      {
        type: "mcq",
        question: "Ibn Khaldun is known as a pioneer of…",
        options: ["Astronomy", "Sociology", "Medicine", "Poetry"],
        answerIndex: 1,
        explanation: "His 'Muqaddimah' laid the foundations of social science.",
      },
      {
        type: "mcq",
        question: "Which city helped spread Arabic numerals to Europe?",
        options: ["Algiers", "Béjaïa", "Oran", "Annaba"],
        answerIndex: 1,
        explanation: "Béjaïa's bustling port is where Fibonacci learned them.",
      },
      {
        type: "truefalse",
        statement: "Tlemcen was a renowned center of learning under the Zayyanid dynasty.",
        answer: true,
        explanation: "Its madrasas attracted scholars from across the Muslim world.",
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
        explanation: "Kahina (Dihya) — heroine of Berber resistance.",
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
        explanation: "Ibn Khaldun's 'Muqaddimah' is a landmark of historical thought.",
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
        explanation: "Tlemcen — a center of art, scholarship, and trade.",
      },
      {
        type: "mcq",
        question: "In which century did Arab armies first reach the Maghreb?",
        options: ["5th century", "7th century", "10th century", "13th century"],
        answerIndex: 1,
        explanation: "The conquest began in the mid-7th century AD.",
      },
      {
        type: "mcq",
        question: "Which famous European mathematician learned Arabic numerals in Béjaïa?",
        options: ["Newton", "Fibonacci", "Euclid", "Descartes"],
        answerIndex: 1,
        explanation: "Fibonacci's stay in Béjaïa changed European math forever.",
      },
      {
        type: "truefalse",
        statement: "Berber and Arab cultures blended over centuries to shape Algerian identity.",
        answer: true,
        explanation: "Centuries of exchange shaped today's Algerian culture.",
      },
      {
        type: "truefalse",
        statement: "The Zayyanid dynasty had its capital in Algiers.",
        answer: false,
        explanation: "Tlemcen was the capital of the Zayyanid dynasty.",
      },
      {
        type: "whoami",
        clues: [
          "I am a great medieval traveler from the Maghreb world.",
          "My name often appears alongside Marco Polo.",
          "I journeyed across Africa, Asia, and Europe.",
        ],
        options: ["Ibn Battuta", "Ibn Khaldun", "Al-Idrisi", "Averroes"],
        answerIndex: 0,
        explanation: "Ibn Battuta traveled some 75,000 miles in the 14th century.",
      },
      {
        type: "mcq",
        question: "Which Algerian port gave its name to the French word for 'candle'?",
        options: ["Algiers", "Oran", "Béjaïa", "Annaba"],
        answerIndex: 2,
        explanation: "Béjaïa exported beeswax candles to Europe — hence 'bougie'.",
      },
      {
        type: "truefalse",
        statement: "The Great Mosque of Tlemcen was built in the 12th century.",
        answer: true,
        explanation: "It was completed in 1136 and still stands almost unchanged.",
      },
    ],
  },
  {
    id: "french",
    title: "French Colonization",
    dateRange: "1830 – 1962",
    emoji: "⚓",
    summary:
      "On a summer day in 1830, French ships appeared off Algiers — and stayed for 132 years. Lands were taken, voices silenced, and yet resistance burned on, from Emir Abdelkader's desert campaigns to the mountain stand of Lalla Fatma N'Soumer.",
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
      "Emir Abdelkader once saved thousands of Christians from massacre in Damascus in 1860.",
      "Lalla Fatma N'Soumer was only in her twenties when she led mountain warriors against the French army.",
      "On May 8, 1945, victory celebrations in Sétif turned into one of Algeria's darkest days.",
      "French settlers were called 'pieds-noirs' — 'black feet' — and many had never seen France.",
      "By 1954, Algeria had three French départements, just like Paris or Marseille.",
    ],
    badge: "Keeper of Memory",
    quiz: [
      {
        type: "mcq",
        question: "When did France invade Algiers?",
        options: ["1789", "1830", "1871", "1900"],
        answerIndex: 1,
        explanation: "French troops landed near Algiers in June 1830.",
      },
      {
        type: "mcq",
        question: "Who led the great early resistance against the French?",
        options: ["Ben Bella", "Abdelkader", "Boumediene", "Massinissa"],
        answerIndex: 1,
        explanation: "Emir Abdelkader led a 15-year resistance from 1832.",
      },
      {
        type: "mcq",
        question: "Lalla Fatma N'Soumer led resistance in which region?",
        options: ["Sahara", "Kabylia", "Oran", "Tlemcen"],
        answerIndex: 1,
        explanation: "She rallied villages in the Djurdjura mountains of Kabylia.",
      },
      {
        type: "truefalse",
        statement: "France treated Algeria as an integral part of France, not a typical colony.",
        answer: true,
        explanation: "Algeria was officially organized into French départements.",
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
        explanation: "Emir Abdelkader — leader, scholar, and symbol of dignity.",
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
        explanation: "Lalla Fatma N'Soumer led resistance in the 1850s.",
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
      {
        type: "mcq",
        question: "Which Algerian city was the first to fall to French forces in 1830?",
        options: ["Oran", "Constantine", "Algiers", "Tlemcen"],
        answerIndex: 2,
        explanation: "Algiers fell first, opening the path to wider conquest.",
      },
      {
        type: "mcq",
        question: "What tragic event occurred on May 8, 1945 in Algeria?",
        options: [
          "Independence Day",
          "Sétif and Guelma massacres",
          "Battle of Algiers",
          "End of WWI",
        ],
        answerIndex: 1,
        explanation: "Peaceful marches were met with deadly repression.",
      },
      {
        type: "mcq",
        question: "Roughly how long did French colonization of Algeria last?",
        options: ["50 years", "80 years", "Over 130 years", "200 years"],
        answerIndex: 2,
        explanation: "From 1830 to 1962 — 132 years.",
      },
      {
        type: "truefalse",
        statement: "Emir Abdelkader eventually surrendered and lived the rest of his life in exile.",
        answer: true,
        explanation: "He spent his final years in Damascus, where he is still honored.",
      },
      {
        type: "whoami",
        clues: [
          "I founded an early Algerian nationalist movement.",
          "I am known as the 'father of Algerian nationalism'.",
          "My name is Messali…",
        ],
        options: ["Messali Hadj", "Ferhat Abbas", "Ben Bella", "Boumediene"],
        answerIndex: 0,
        explanation: "Messali Hadj founded the PPA and inspired generations.",
      },
      {
        type: "mcq",
        question: "What were the French settlers in Algeria commonly called?",
        options: ["Colons", "Pieds-noirs", "Harkis", "Zouaves"],
        answerIndex: 1,
        explanation: "'Pieds-noirs' (black feet) referred to European settlers in Algeria.",
      },
      {
        type: "truefalse",
        statement: "Lalla Fatma N'Soumer led her resistance from the Sahara desert.",
        answer: false,
        explanation: "She fought in the Djurdjura mountains of Kabylia.",
      },
      {
        type: "whoami",
        clues: [
          "I was a French soldier-emperor whose army began the conquest.",
          "My nephew later expanded French rule deep into Algeria.",
          "My name is Charles…",
        ],
        options: ["Charles X", "Napoleon III", "Louis XVI", "De Gaulle"],
        answerIndex: 0,
        explanation: "King Charles X ordered the 1830 invasion of Algiers.",
      },
      {
        type: "mcq",
        question: "By the 1950s, Algeria was officially organized into how many French départements?",
        options: ["One", "Two", "Three", "Five"],
        answerIndex: 2,
        explanation: "Algeria was divided into three French départements before independence.",
      },
    ],
  },
  {
    id: "independence",
    title: "War of Independence",
    dateRange: "1954 – 1962",
    emoji: "🕊️",
    summary:
      "Just after midnight on November 1, 1954, gunfire echoed through the Aurès Mountains — the FLN had risen. Eight years of sacrifice followed, until on July 5, 1962, Algeria stood free at last.",
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
      "The film 'The Battle of Algiers' (1966) is still studied in military academies around the world.",
      "Women fighters carried messages, weapons, and bombs through the narrow streets of the Casbah.",
      "The FLN's green-and-white flag with a red crescent and star became the symbol of free Algeria.",
      "Ahmed Ben Bella became Algeria's first president after independence in 1963.",
      "July 5 was chosen for independence — exactly 132 years after French troops landed in 1830.",
    ],
    badge: "Champion of Liberty",
    quiz: [
      {
        type: "mcq",
        question: "When did the Algerian revolution begin?",
        options: ["July 5, 1962", "November 1, 1954", "March 19, 1962", "May 8, 1945"],
        answerIndex: 1,
        explanation: "The FLN launched 'Toussaint Rouge' on November 1, 1954.",
      },
      {
        type: "mcq",
        question: "Where were the first shots of the revolution fired?",
        options: ["Algiers", "Oran", "Aurès Mountains", "Sahara"],
        answerIndex: 2,
        explanation: "The Aurès region launched the armed struggle.",
      },
      {
        type: "mcq",
        question: "When did Algeria gain independence?",
        options: ["1954", "1958", "1962", "1965"],
        answerIndex: 2,
        explanation: "Algeria became independent on July 5, 1962.",
      },
      {
        type: "truefalse",
        statement: "Algeria celebrates its Independence Day on July 5th.",
        answer: true,
        explanation: "July 5, 1962 marked the official independence.",
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
        explanation: "Larbi Ben M'hidi — a hero of the Battle of Algiers.",
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
        explanation: "Djamila Bouhired's trial drew worldwide attention.",
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
      {
        type: "mcq",
        question: "Which political movement led the Algerian War of Independence?",
        options: ["FLN", "OAS", "MNA", "PPA"],
        answerIndex: 0,
        explanation: "The Front de Libération Nationale (FLN) led the struggle.",
      },
      {
        type: "mcq",
        question: "The famous urban battle of 1956–57 took place in which city?",
        options: ["Oran", "Algiers", "Constantine", "Annaba"],
        answerIndex: 1,
        explanation: "The Battle of Algiers played out in the streets of the Casbah.",
      },
      {
        type: "mcq",
        question: "What treaty officially ended the war in March 1962?",
        options: ["Treaty of Paris", "Évian Accords", "Treaty of Algiers", "Versailles Treaty"],
        answerIndex: 1,
        explanation: "The Évian Accords paved the way for independence.",
      },
      {
        type: "truefalse",
        statement: "The Algerian War of Independence lasted roughly eight years.",
        answer: true,
        explanation: "From November 1954 to July 1962 — about 7.5 years.",
      },
      {
        type: "truefalse",
        statement: "Algeria became independent peacefully, without armed struggle.",
        answer: false,
        explanation: "Independence came after eight years of difficult armed struggle.",
      },
      {
        type: "whoami",
        clues: [
          "I became Algeria's first president after independence.",
          "I was a key FLN leader.",
          "My name is Ahmed…",
        ],
        options: ["Ahmed Ben Bella", "Houari Boumediene", "Krim Belkacem", "Ferhat Abbas"],
        answerIndex: 0,
        explanation: "Ahmed Ben Bella served as Algeria's first president.",
      },
      {
        type: "mcq",
        question: "What does 'FLN' stand for?",
        options: [
          "Front de Libération Nationale",
          "Force Libre Nationale",
          "Fédération Libre de Nationalistes",
          "Front Libéral du Nord",
        ],
        answerIndex: 0,
        explanation: "The FLN — Front de Libération Nationale — led Algeria to independence.",
      },
      {
        type: "truefalse",
        statement: "The film 'The Battle of Algiers' is still studied in military schools today.",
        answer: true,
        explanation: "Released in 1966, it is famous for its realism and political insight.",
      },
      {
        type: "whoami",
        clues: [
          "I was a young woman of the Casbah.",
          "I died in a bombing during the Battle of Algiers.",
          "My name is often paired with Djamila Bouhired's.",
        ],
        options: ["Hassiba Ben Bouali", "Lalla Fatma N'Soumer", "Zohra Drif", "Kahina"],
        answerIndex: 0,
        explanation: "Hassiba Ben Bouali died in the Casbah in 1957, age just 19.",
      },
    ],
  },
];

export const dailyFacts = eras.flatMap((e) => e.facts);

// Dev-time data validation. Logs warnings to the console if any era has fewer
// than 10 questions or any options/answerIndex pair is invalid.
import { validateEras } from "@/lib/quiz";
if (import.meta.env.DEV) {
  validateEras(eras);
}

import type { Localized, LocalizedString } from "@/lib/i18n";

const L = (en: string, fr: string, ar: string): Localized<string> => ({ en, fr, ar });

export type WordCategoryId =
  | "national-voice"
  | "classical-world"
  | "thinkers-writers"
  | "cultural-expression";

export type WordItem = {
  id: string;
  category: WordCategoryId;
  /** Short quote / excerpt — trilingual. */
  quote: LocalizedString;
  /** Author or source. */
  author: LocalizedString;
  /** Optional figure ID linking to /figures/$id. */
  figureId?: string;
  /** 1–2 lines: when, where, why this was said. */
  context: LocalizedString;
  /** 1–2 lines: what it means / why it matters today. */
  meaning: LocalizedString;
  emoji?: string;
};

export type WordCategory = {
  id: WordCategoryId;
  label: LocalizedString;
  emoji: string;
  blurb: LocalizedString;
};

export const WORD_CATEGORIES: WordCategory[] = [
  {
    id: "national-voice",
    emoji: "🇩🇿",
    label: L("National Voice", "Voix nationale", "الصوت الوطني"),
    blurb: L(
      "Words that became the heartbeat of a nation.",
      "Des mots devenus le battement de cœur d'une nation.",
      "كلمات تحوّلت إلى نبض أمة.",
    ),
  },
  {
    id: "classical-world",
    emoji: "🏛️",
    label: L("Classical World", "Monde classique", "العالم الكلاسيكي"),
    blurb: L(
      "Echoes from antiquity that still resonate today.",
      "Échos de l'Antiquité qui résonnent encore aujourd'hui.",
      "أصداء من العصور القديمة لا تزال تتردّد.",
    ),
  },
  {
    id: "thinkers-writers",
    emoji: "📚",
    label: L("Thinkers & Writers", "Penseurs & Écrivains", "المفكرون والكتّاب"),
    blurb: L(
      "Pages and ideas that shaped Algerian thought.",
      "Pages et idées qui ont façonné la pensée algérienne.",
      "صفحات وأفكار صنعت الفكر الجزائري.",
    ),
  },
  {
    id: "cultural-expression",
    emoji: "🎶",
    label: L("Cultural Expression", "Expression culturelle", "التعبير الثقافي"),
    blurb: L(
      "Songs and verses that carry memory across generations.",
      "Chansons et vers qui transmettent la mémoire à travers les générations.",
      "أغانٍ وأبيات تنقل الذاكرة عبر الأجيال.",
    ),
  },
];

export const words: WordItem[] = [
  // ---------- National Voice ----------
  {
    id: "kassaman-excerpt",
    category: "national-voice",
    emoji: "🎶",
    figureId: "moufdi-zakaria",
    quote: L(
      "We swear by the lightning that destroys, by the streams of generous blood being shed…",
      "Nous jurons par la foudre destructrice, par les flots de sang généreux versé…",
      "قَسَمًا بالنازلاتِ الماحقاتْ، والدماءِ الزاكياتِ الطاهراتْ…",
    ),
    author: L("Moufdi Zakaria — Kassaman (1956)", "Moufdi Zakaria — Kassaman (1956)", "مفدي زكريا — قَسَمًا (1956)"),
    context: L(
      "Written in Barberousse Prison during the War of Independence; later set to music and adopted as the national anthem.",
      "Écrit à la prison de Barberousse pendant la guerre d'indépendance ; mis en musique et adopté comme hymne national.",
      "كُتبت في سجن بربروس خلال حرب التحرير، ولُحّنت لاحقًا واعتُمدت نشيدًا وطنيًا.",
    ),
    meaning: L(
      "A vow of sacrifice and unity — the soul of Algerian independence in seven verses.",
      "Un serment de sacrifice et d'unité — l'âme de l'indépendance algérienne en sept strophes.",
      "قَسَم بالتضحية والوحدة — روح الاستقلال الجزائري في سبعة مقاطع.",
    ),
  },

  {
    id: "iliyadha-aljazair",
    category: "national-voice",
    emoji: "📜",
    figureId: "moufdi-zakaria",
    quote: L(
      "Algeria, O land of glory — your history is an epic written in light.",
      "Algérie, ô terre de gloire — ton histoire est une épopée écrite de lumière.",
      "الجزائرُ يا أرضَ المجدِ — تاريخُكِ ملحمةٌ كُتبت بالنور.",
    ),
    author: L(
      "Moufdi Zakaria — Iliyadha al-Jaza'ir (The Algerian Iliad)",
      "Moufdi Zakaria — Iliyadha al-Jaza'ir (L'Iliade algérienne)",
      "مفدي زكريا — إلياذة الجزائر",
    ),
    context: L(
      "An epic poem of more than 1,000 verses, recited by Moufdi Zakaria in 1972 to celebrate ten years of independence.",
      "Un poème épique de plus de 1 000 vers, récité par Moufdi Zakaria en 1972 pour célébrer les dix ans de l'indépendance.",
      "قصيدة ملحمية من أكثر من ألف بيت، ألقاها مفدي زكريا سنة 1972 احتفاءً بعشرية الاستقلال.",
    ),
    meaning: L(
      "Iliyadha al-Jaza'ir is an epic poem by Moufdi Zakaria of more than 1,000 verses celebrating Algeria's history, identity, and unity.",
      "« Iliyadha al-Jaza'ir » (L'Iliade algérienne) est un poème épique de Moufdi Zakaria de plus de 1 000 vers, célébrant l'histoire, l'identité et l'unité de l'Algérie.",
      "«إلياذة الجزائر» قصيدة ملحمية لمفدي زكريا تتكوّن من أكثر من ألف بيت، تحتفي بتاريخ الجزائر وهويتها ووحدتها.",
    ),
  },
  {
    id: "jugurtha-rome-for-sale",
    category: "classical-world",
    emoji: "🏛️",
    figureId: "jugurtha",
    quote: L(
      "Rome is a city for sale — and doomed the day she finds a buyer.",
      "Rome est une ville à vendre — et perdue le jour où elle trouvera preneur.",
      "روما مدينةٌ للبيع — وهالكةٌ يومَ تجدُ من يشتريها.",
    ),
    author: L("Jugurtha (reported by Sallust)", "Jugurtha (rapporté par Salluste)", "يوغرطة (نقلًا عن سالوست)"),
    context: L(
      "Said by the Numidian king after bribing Roman senators during his trial in the 2nd century BC.",
      "Prononcé par le roi numide après avoir corrompu des sénateurs romains lors de son procès au IIᵉ siècle av. J.-C.",
      "قالها الملك النوميدي بعد رشوته أعضاء مجلس الشيوخ الروماني خلال محاكمته في القرن الثاني قبل الميلاد.",
    ),
    meaning: L(
      "A North African voice exposing imperial corruption — defiance turned into legend.",
      "Une voix nord-africaine dénonçant la corruption impériale — un défi devenu légende.",
      "صوتٌ من شمال إفريقيا يفضح فساد الإمبراطورية — تحدٍّ تحوّل إلى أسطورة.",
    ),
  },

  // ---------- Thinkers & Writers ----------
  {
    id: "mammeri-language",
    category: "thinkers-writers",
    emoji: "📖",
    figureId: "mammeri",
    quote: L(
      "A people who lose their language lose half of themselves.",
      "Un peuple qui perd sa langue perd la moitié de lui-même.",
      "شعبٌ يفقد لغته يفقد نصفَ نفسه.",
    ),
    author: L("Mouloud Mammeri", "Mouloud Mammeri", "مولود معمري"),
    context: L(
      "Mammeri spent his life collecting Tamazight poetry and grammar — work that helped spark the 1980 Berber Spring.",
      "Mammeri consacra sa vie à recueillir la poésie et la grammaire tamazightes — un travail qui contribua au Printemps berbère de 1980.",
      "كرّس معمري حياته لجمع الشعر والقواعد الأمازيغية — عمل أسهم في إشعال الربيع الأمازيغي 1980.",
    ),
    meaning: L(
      "Language is identity. Defending it is defending who we are.",
      "La langue est une identité. La défendre, c'est défendre qui nous sommes.",
      "اللغة هويّة، والدفاع عنها دفاعٌ عمّن نكون.",
    ),
  },
  {
    id: "mammeri-mountain",
    category: "thinkers-writers",
    emoji: "⛰️",
    figureId: "mammeri",
    quote: L(
      "The mountain forgets nothing — it only waits to be heard.",
      "La montagne n'oublie rien — elle attend seulement d'être entendue.",
      "الجبلُ لا ينسى شيئًا — إنّما ينتظر من يُصغي إليه.",
    ),
    author: L("Mouloud Mammeri", "Mouloud Mammeri", "مولود معمري"),
    context: L(
      "Inspired by his fieldwork in Kabylie, gathering oral traditions before they faded.",
      "Inspiré par son travail de terrain en Kabylie, recueillant les traditions orales avant qu'elles ne disparaissent.",
      "مستوحاة من عمله الميداني في القبائل لجمع التقاليد الشفهية قبل اندثارها.",
    ),
    meaning: L(
      "Memory survives in places and people — if we take time to listen.",
      "La mémoire survit dans les lieux et les gens — à condition de prendre le temps d'écouter.",
      "الذاكرة تحيا في الأماكن والناس — إنْ منحناها وقتًا لنُصغي.",
    ),
  },
  {
    id: "fanon-each-generation",
    category: "thinkers-writers",
    emoji: "✊",
    figureId: "frantz-fanon",
    quote: L(
      "Each generation must, out of relative obscurity, discover its mission, fulfill it, or betray it.",
      "Chaque génération doit, dans une relative opacité, découvrir sa mission, l'accomplir ou la trahir.",
      "على كلّ جيلٍ أن يكتشف، في غموضٍ نسبيّ، رسالتَه، فإمّا أن يحقّقها أو يخونها.",
    ),
    author: L("Frantz Fanon — The Wretched of the Earth", "Frantz Fanon — Les Damnés de la Terre", "فرانز فانون — معذّبو الأرض"),
    context: L(
      "Written in Algeria during the war of independence — a global call to free thought and action.",
      "Écrit en Algérie pendant la guerre d'indépendance — un appel mondial à la pensée et à l'action libres.",
      "كُتب في الجزائر إبّان حرب التحرير — نداءٌ عالمي للفكر والفعل الحرّين.",
    ),
    meaning: L(
      "Freedom is not inherited — it is renewed, choice by choice, in every generation.",
      "La liberté ne s'hérite pas — elle se renouvelle, choix après choix, à chaque génération.",
      "الحريّةُ لا تُورَث — تتجدّد قرارًا بقرار، في كلّ جيلٍ من جديد.",
    ),
  },
  {
    id: "imache-ideas",
    category: "thinkers-writers",
    emoji: "🧠",
    figureId: "amar-imache",
    quote: L(
      "We must not follow men, but ideas.",
      "Il ne faut pas suivre les hommes, mais les idées.",
      "لا يجب أن نتبع الأشخاص، بل الأفكار.",
    ),
    author: L("Amar Imache", "Amar Imache", "عمار إيماش"),
    context: L(
      "A reflection by Amar Imache on politics and the importance of ideas in shaping a nation.",
      "Une réflexion d'Amar Imache sur la politique et le rôle des idées dans la construction d'une nation.",
      "تعبير عن رؤية عمار إيماش لدور الأفكار في بناء الأمة.",
    ),
    meaning: L(
      "A call to move beyond individuals and build a collective vision based on principles.",
      "Un appel à dépasser les figures individuelles pour construire une vision collective fondée sur des principes.",
      "دعوة لتجاوز الأشخاص والتركيز على المبادئ لبناء رؤية جماعية.",
    ),
  },
  {
    id: "mammeri-transmission",
    category: "thinkers-writers",
    emoji: "🪶",
    figureId: "mammeri",
    quote: L(
      "What is not transmitted is lost.",
      "Ce qui n'est pas transmis est perdu.",
      "ما لا يُنقَل يُفقَد.",
    ),
    author: L("Mouloud Mammeri", "Mouloud Mammeri", "مولود معمري"),
    context: L(
      "A guiding principle of Mammeri's work as an anthropologist gathering Tamazight poems and oral knowledge before they vanished.",
      "Un principe qui guida son travail d'anthropologue, recueillant poèmes et savoirs oraux tamazights avant qu'ils ne disparaissent.",
      "مبدأ قاد عمله الأنثروبولوجي في جمع الأشعار والمعارف الشفهية الأمازيغية قبل اندثارها.",
    ),
    meaning: L(
      "Identity survives only through transmission — language, story, gesture, song.",
      "L'identité ne survit que par la transmission — langue, récit, geste, chant.",
      "لا تنجو الهوية إلا بالنقل — لغةً وحكايةً وإشارةً ونشيدًا.",
    ),
  },
  {
    id: "bennabi-ideas",
    category: "thinkers-writers",
    emoji: "🧭",
    figureId: "malek-bennabi",
    quote: L(
      "A society does not decline because it lacks means, but because it lacks ideas.",
      "Une société ne décline pas parce qu'elle manque de moyens, mais parce qu'elle manque d'idées.",
      "لا ينحطّ المجتمع لأنه يفتقر إلى الوسائل، بل لأنه يفتقر إلى الأفكار.",
    ),
    author: L("Malek Bennabi", "Malek Bennabi", "مالك بن نبي"),
    context: L(
      "A central thesis of Bennabi's work on civilization, renewal, and the inner conditions of historical change.",
      "Thèse centrale de l'œuvre de Bennabi sur la civilisation, le renouveau et les conditions intérieures du changement historique.",
      "أطروحة محورية في فكر بن نبي حول الحضارة والنهضة والشروط الداخلية للتحوّل التاريخي.",
    ),
    meaning: L(
      "Renewal begins in the mind. Without ideas, no resources are enough.",
      "Le renouveau commence dans l'esprit. Sans idées, aucune ressource ne suffit.",
      "تبدأ النهضة في العقل. وحين تغيب الأفكار، لا تكفي أيّ موارد.",
    ),
  },
  {
    id: "ben-badis-identity",
    category: "thinkers-writers",
    emoji: "📗",
    figureId: "ben-badis",
    quote: L(
      "Islam is my religion, Arabic my language, Algeria my homeland.",
      "L'islam est ma religion, l'arabe ma langue, l'Algérie ma patrie.",
      "الإسلامُ ديني، والعربيّةُ لغتي، والجزائرُ وطني.",
    ),
    author: L("Abdelhamid Ben Badis", "Abdelhamid Ben Badis", "عبد الحميد بن باديس"),
    context: L(
      "A founding formula of the Association of Algerian Muslim Ulama, repeated in schools and journals across colonial Algeria.",
      "Formule fondatrice de l'Association des oulémas musulmans algériens, reprise dans les écoles et revues de l'Algérie coloniale.",
      "صيغة تأسيسية لجمعية العلماء المسلمين الجزائريين، رُدّدت في مدارسها ومجلاتها عبر الجزائر المستعمرَة.",
    ),
    meaning: L(
      "A simple, three-line definition of identity that many Algerians still know by heart.",
      "Une définition de l'identité en trois lignes que beaucoup d'Algériens connaissent encore par cœur.",
      "تعريفٌ مختصر للهوية في ثلاثة أسطر، لا يزال كثير من الجزائريين يحفظونه عن ظهر قلب.",
    ),
  },

  // ---------- Cultural Expression ----------
  {
    id: "ait-menguellet-words",
    category: "cultural-expression",
    emoji: "🎵",
    figureId: "ait-menguellet",
    quote: L(
      "Our words are all we have left — guard them like a flame.",
      "Nos paroles sont tout ce qu'il nous reste — gardez-les comme une flamme.",
      "كلماتُنا كلُّ ما تبقّى لنا — احرسوها كأنّها لهب.",
    ),
    author: L("Lounis Aït Menguellet", "Lounis Aït Menguellet", "لونيس آيت منقلات"),
    context: L(
      "From decades of Kabyle song — turning poetry into a quiet, steady form of resistance.",
      "Issu de décennies de chanson kabyle — la poésie devenue une forme tranquille et durable de résistance.",
      "من عقود من الأغنية القبائلية — شعرٌ تحوّل إلى مقاومة هادئة وراسخة.",
    ),
    meaning: L(
      "When freedom is hard, language and song carry it forward.",
      "Quand la liberté est difficile, la langue et la chanson la portent.",
      "حين تصعب الحرّية، تحملها اللغةُ والأغنية.",
    ),
  },
  {
    id: "matoub-truth",
    category: "cultural-expression",
    emoji: "🔥",
    figureId: "matoub",
    quote: L(
      "I would rather die standing than live on my knees.",
      "Je préfère mourir debout que vivre à genoux.",
      "أن أموتَ واقفًا خيرٌ من أن أعيش راكعًا.",
    ),
    author: L("Lounès Matoub", "Lounès Matoub", "لونيس معطوب"),
    context: L(
      "A defining line from a singer who paid with his life for defending Amazigh identity and free speech.",
      "Une phrase emblématique d'un chanteur qui paya de sa vie la défense de l'identité amazighe et de la parole libre.",
      "عبارة تختصر مسار مغنٍّ دفع حياته ثمنًا للدفاع عن الهوية الأمازيغية وحرية الكلمة.",
    ),
    meaning: L(
      "Dignity is non-negotiable — even when the price is the highest.",
      "La dignité ne se négocie pas — même au prix le plus fort.",
      "الكرامةُ لا تُساوَم — مهما كان الثمن.",
    ),
  },
  {
    id: "idir-avava",
    category: "cultural-expression",
    emoji: "🌿",
    figureId: "idir",
    quote: L(
      "A vava inouva — open the door for me, father…",
      "A vava inouva — ouvre-moi la porte, ô mon père…",
      "أ فافا إينوفا — افتح ليَ البابَ يا أبي…",
    ),
    author: L("Idir — A Vava Inouva (1976)", "Idir — A Vava Inouva (1976)", "إيدير — أ فافا إينوفا (1976)"),
    context: L(
      "A lullaby drawn from a Kabyle folk tale — the first Algerian song to travel the world in Tamazight.",
      "Une berceuse issue d'un conte kabyle — la première chanson algérienne à parcourir le monde en tamazight.",
      "تهويدة مأخوذة من حكاية قبائلية شعبية — أوّل أغنية جزائرية تجوب العالم بالأمازيغية.",
    ),
    meaning: L(
      "A whisper from home reminding the world that Tamazight is alive and beautiful.",
      "Un murmure du foyer rappelant au monde que le tamazight est vivant et beau.",
      "همسةٌ من البيت تُذكّر العالم بأنّ الأمازيغية حيّة وجميلة.",
    ),
  },
];

export const wordsByCategory = (cat: WordCategoryId) => words.filter((w) => w.category === cat);

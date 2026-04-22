import type { Localized, LocalizedString } from "@/lib/i18n";

// ---------- Types ----------

export type Difficulty = "easy" | "medium" | "hard";

type Base = { difficulty?: Difficulty };

export type MCQQuestion = Base & {
  type: "mcq";
  question: LocalizedString;
  options: LocalizedString[];
  answerIndex: number;
  explanation?: LocalizedString;
};

export type TrueFalseQuestion = Base & {
  type: "truefalse";
  statement: LocalizedString;
  answer: boolean;
  explanation?: LocalizedString;
};

export type WhoAmIQuestion = Base & {
  type: "whoami";
  clues: LocalizedString[];
  options: LocalizedString[];
  answerIndex: number;
  explanation?: LocalizedString;
};

export type OrderQuestion = Base & {
  type: "order";
  prompt: LocalizedString;
  // Items in CORRECT chronological order. The quiz will shuffle them.
  // `id` is a stable language-independent key used for answer comparison.
  items: { id: string; label: LocalizedString; hint?: LocalizedString }[];
  explanation?: LocalizedString;
};

export type ImageQuestion = Base & {
  type: "image";
  question: LocalizedString;
  imageUrl?: string;
  imageEmoji?: string;
  options: LocalizedString[];
  answerIndex: number;
  explanation?: LocalizedString;
};

export type QuizQuestion =
  | MCQQuestion
  | TrueFalseQuestion
  | WhoAmIQuestion
  | OrderQuestion
  | ImageQuestion;

export type Era = {
  id: string;
  title: LocalizedString;
  dateRange: string;
  emoji: string;
  summary: LocalizedString;
  figures: { name: LocalizedString; note: LocalizedString }[];
  places: { name: LocalizedString; note: LocalizedString }[];
  facts: LocalizedString[];
  badge: LocalizedString;
  quiz: QuizQuestion[];
};

// Helpers to keep the data file readable.
const L = (en: string, fr: string, ar: string): Localized<string> => ({ en, fr, ar });

// ---------- Data ----------

export const eras: Era[] = [
  // ============================================================
  // 1) NUMIDIA
  // ============================================================
  {
    id: "numidia",
    title: L("Numidia", "Numidie", "نوميديا"),
    dateRange: "202 BC – 46 BC",
    emoji: "🏺",
    summary: L(
      "Centuries before Algeria had a name, Berber tribes galloped across its plains on swift horses. From this world rose Numidia — a proud kingdom of clever kings and feared cavalry that helped decide the fate of empires.",
      "Bien avant que l'Algérie ne porte ce nom, des tribus berbères galopaient dans ses plaines. De ce monde naquit la Numidie — un royaume fier, aux rois rusés et à la cavalerie redoutée, qui pesa sur le destin des empires.",
      "قبل قرون من ظهور اسم الجزائر، كانت القبائل الأمازيغية تجوب سهولها على صهوات الخيل. من هذا العالم نشأت نوميديا — مملكة عريقة بملوكها الأذكياء وفرسانها الذين رهبتهم روما وقرطاج.",
    ),
    figures: [
      {
        name: L("Massinissa", "Massinissa", "ماسينيسا"),
        note: L(
          "First king of a united Numidia, ally of Rome.",
          "Premier roi d'une Numidie unifiée, allié de Rome.",
          "أول ملك لنوميديا الموحدة، حليف لروما.",
        ),
      },
      {
        name: L("Jugurtha", "Jugurtha", "يوغرطة"),
        note: L(
          "Bold king who defied Rome in a long war.",
          "Roi audacieux qui défia Rome dans une longue guerre.",
          "ملك جريء تحدى روما في حرب طويلة.",
        ),
      },
    ],
    places: [
      {
        name: L("Cirta", "Cirta", "سيرتا"),
        note: L(
          "The royal capital, today's Constantine.",
          "La capitale royale, aujourd'hui Constantine.",
          "العاصمة الملكية، قسنطينة اليوم.",
        ),
      },
      {
        name: L("Hippo Regius", "Hippone", "هيبو ريجيوس"),
        note: L("Important coastal city.", "Importante ville côtière.", "مدينة ساحلية مهمة."),
      },
    ],
    facts: [
      L(
        "Numidian horsemen were so feared that Rome and Carthage both wanted them as allies.",
        "Les cavaliers numides étaient si redoutés que Rome et Carthage les voulaient pour alliés.",
        "كان الفرسان النوميديون مرهوبي الجانب لدرجة أن روما وقرطاج تنافستا على تحالفهم.",
      ),
      L(
        "Massinissa lived to be over 90 and led troops into his last years.",
        "Massinissa vécut plus de 90 ans et mena ses troupes jusqu'à la fin.",
        "عاش ماسينيسا أكثر من 90 عامًا وظل يقود جيوشه حتى آخر أيامه.",
      ),
      L(
        "Numidian riders guided their horses with just a neck rope — no saddles, no bridles.",
        "Les Numides guidaient leurs chevaux avec une simple corde au cou — sans selle ni mors.",
        "كان الفرسان يقودون خيولهم بحبل حول الرقبة فقط — بلا سرج ولا لجام.",
      ),
      L(
        "The word 'Numidia' comes from a Greek term meaning 'nomads'.",
        "Le mot « Numidie » vient d'un terme grec signifiant « nomades ».",
        "كلمة 'نوميديا' مشتقة من اليونانية وتعني 'الرحّل'.",
      ),
      L(
        "Royal Numidian tombs, like the Medracen, still rise from the Algerian plains today.",
        "Les tombeaux royaux numides, comme le Medracen, dominent encore les plaines algériennes.",
        "لا تزال أضرحة ملوك نوميديا، كالمدغاسن، شامخة في السهول الجزائرية.",
      ),
      L(
        "Numidia minted its own coins, often stamped with the king's portrait and an elephant.",
        "La Numidie frappait sa propre monnaie, souvent à l'effigie du roi et d'un éléphant.",
        "سكّت نوميديا عملتها الخاصة، وغالبًا ما حملت صورة الملك وفيلًا.",
      ),
      L(
        "Cirta, the Numidian capital, sits on dramatic cliffs — today it is Constantine.",
        "Cirta, capitale numide, se dresse sur des falaises spectaculaires — c'est l'actuelle Constantine.",
        "تقوم سيرتا، عاصمة نوميديا، على منحدرات مهيبة، وهي قسنطينة اليوم.",
      ),
      L(
        "Numidia's legacy of horsemanship and resistance shaped North African identity for centuries.",
        "L'héritage équestre et la résistance numide ont façonné l'identité nord-africaine pendant des siècles.",
        "شكّل إرث نوميديا في الفروسية والمقاومة هوية شمال إفريقيا لقرون.",
      ),
    ],
    badge: L("Explorer of Numidia", "Explorateur de Numidie", "مستكشف نوميديا"),
    quiz: [
      {
        type: "mcq",
        difficulty: "easy",
        question: L(
          "Who was the first king to unite Numidia?",
          "Qui fut le premier roi à unifier la Numidie ?",
          "من أول ملك وحّد نوميديا؟",
        ),
        options: [
          L("Jugurtha", "Jugurtha", "يوغرطة"),
          L("Massinissa", "Massinissa", "ماسينيسا"),
          L("Hannibal", "Hannibal", "هنيبعل"),
          L("Juba II", "Juba II", "يوبا الثاني"),
        ],
        answerIndex: 1,
        explanation: L(
          "Massinissa unified the Numidian tribes around 202 BC.",
          "Massinissa a unifié les tribus numides vers 202 av. J.-C.",
          "وحّد ماسينيسا قبائل نوميديا حوالي 202 ق.م.",
        ),
      },
      {
        type: "mcq",
        difficulty: "easy",
        question: L(
          "What was the capital of Numidia?",
          "Quelle était la capitale de la Numidie ?",
          "ما هي عاصمة نوميديا؟",
        ),
        options: [
          L("Carthage", "Carthage", "قرطاج"),
          L("Hippo", "Hippone", "هيبو"),
          L("Cirta", "Cirta", "سيرتا"),
          L("Timgad", "Timgad", "تيمقاد"),
        ],
        answerIndex: 2,
        explanation: L(
          "Cirta — today's Constantine — was the royal capital.",
          "Cirta, l'actuelle Constantine, était la capitale royale.",
          "كانت سيرتا، قسنطينة اليوم، العاصمة الملكية.",
        ),
      },
      {
        type: "mcq",
        difficulty: "easy",
        question: L(
          "Numidia was especially famous for its…",
          "La Numidie était surtout célèbre pour sa…",
          "اشتهرت نوميديا خاصةً بـ…",
        ),
        options: [
          L("Navy", "Marine", "أسطولها البحري"),
          L("Cavalry", "Cavalerie", "فرسانها"),
          L("Pyramids", "Pyramides", "أهراماتها"),
          L("Silk trade", "Commerce de soie", "تجارة الحرير"),
        ],
        answerIndex: 1,
        explanation: L(
          "Numidian horsemen were prized by both Rome and Carthage.",
          "Les cavaliers numides étaient prisés par Rome et Carthage.",
          "تنافست روما وقرطاج على الفرسان النوميديين.",
        ),
      },
      {
        type: "mcq",
        difficulty: "easy",
        question: L(
          "Numidia was located in what modern country?",
          "Où se trouvait la Numidie aujourd'hui ?",
          "أين تقع نوميديا اليوم؟",
        ),
        options: [
          L("Egypt", "Égypte", "مصر"),
          L("Algeria", "Algérie", "الجزائر"),
          L("Morocco", "Maroc", "المغرب"),
          L("Tunisia", "Tunisie", "تونس"),
        ],
        answerIndex: 1,
        explanation: L(
          "Most of ancient Numidia sits within today's Algeria.",
          "L'essentiel de la Numidie antique se situe dans l'Algérie actuelle.",
          "تقع معظم نوميديا القديمة داخل الجزائر اليوم.",
        ),
      },
      {
        type: "mcq",
        difficulty: "medium",
        question: L(
          "Numidian horsemen typically rode…",
          "Les cavaliers numides montaient généralement…",
          "كان الفرسان النوميديون يركبون عادةً…",
        ),
        options: [
          L("With heavy armor and lances", "Avec armure lourde et lances", "بدروع ثقيلة ورماح"),
          L("Without saddles or bridles", "Sans selle ni mors", "بلا سرج ولا لجام"),
          L("On war elephants", "Sur des éléphants de guerre", "على فيلة الحرب"),
          L("In chariots", "En chars", "في عربات"),
        ],
        answerIndex: 1,
        explanation: L(
          "They guided horses with their voice and a neck rope — light and fast.",
          "Ils guidaient leurs chevaux par la voix et une corde au cou — légers et rapides.",
          "كانوا يوجهون الخيل بالصوت وحبل العنق — خفّة وسرعة.",
        ),
      },
      {
        type: "mcq",
        difficulty: "medium",
        question: L(
          "Who did Massinissa ally with during the Punic Wars?",
          "Avec qui Massinissa s'allia-t-il pendant les guerres puniques ?",
          "مع من تحالف ماسينيسا في الحروب البونية؟",
        ),
        options: [
          L("Carthage", "Carthage", "قرطاج"),
          L("Rome", "Rome", "روما"),
          L("Greece", "Grèce", "اليونان"),
          L("Egypt", "Égypte", "مصر"),
        ],
        answerIndex: 1,
        explanation: L(
          "He switched to Rome and helped defeat Carthage at Zama.",
          "Il rallia Rome et contribua à vaincre Carthage à Zama.",
          "انضم إلى روما وساهم في هزيمة قرطاج في معركة زاما.",
        ),
      },
      {
        type: "mcq",
        difficulty: "medium",
        question: L(
          "What war is Jugurtha known for?",
          "Pour quelle guerre Jugurtha est-il célèbre ?",
          "بأي حرب اشتهر يوغرطة؟",
        ),
        options: [
          L("Punic War", "Guerre punique", "الحرب البونية"),
          L("Jugurthine War", "Guerre de Jugurtha", "حرب يوغرطة"),
          L("Gallic War", "Guerre des Gaules", "حرب الغال"),
          L("Peloponnesian War", "Guerre du Péloponnèse", "حرب البيلوبونيز"),
        ],
        answerIndex: 1,
        explanation: L(
          "The Jugurthine War shook the Roman Republic itself.",
          "La guerre de Jugurtha ébranla la République romaine elle-même.",
          "هزّت حرب يوغرطة الجمهورية الرومانية نفسها.",
        ),
      },
      {
        type: "mcq",
        difficulty: "hard",
        question: L(
          "Who was the Roman general who finally defeated Jugurtha?",
          "Quel général romain finit par vaincre Jugurtha ?",
          "من القائد الروماني الذي هزم يوغرطة في النهاية؟",
        ),
        options: [
          L("Hannibal", "Hannibal", "هنيبعل"),
          L("Gaius Marius", "Caius Marius", "غايوس ماريوس"),
          L("Julius Caesar", "Jules César", "يوليوس قيصر"),
          L("Scipio", "Scipion", "سكيبيو"),
        ],
        answerIndex: 1,
        explanation: L(
          "Marius captured Jugurtha in 105 BC, with help from Sulla.",
          "Marius captura Jugurtha en 105 av. J.-C., avec l'aide de Sylla.",
          "أسر ماريوس يوغرطة عام 105 ق.م بمساعدة سولا.",
        ),
      },
      {
        type: "mcq",
        difficulty: "hard",
        question: L(
          "Where does the name 'Numidia' come from?",
          "D'où vient le nom « Numidie » ?",
          "من أين جاءت تسمية 'نوميديا'؟",
        ),
        options: [
          L("A Berber word for 'desert'", "Mot berbère pour « désert »", "كلمة أمازيغية للصحراء"),
          L("A Greek word meaning 'nomads'", "Mot grec pour « nomades »", "كلمة يونانية تعني 'الرحّل'"),
          L("A Latin word for 'horse'", "Mot latin pour « cheval »", "كلمة لاتينية للحصان"),
          L("A Punic word for 'kingdom'", "Mot punique pour « royaume »", "كلمة بونية للمملكة"),
        ],
        answerIndex: 1,
        explanation: L(
          "The Greeks called the region's people 'Nomades' — nomads.",
          "Les Grecs appelaient ses habitants « Nomades ».",
          "كان الإغريق يسمّون سكان المنطقة 'نومادس' أي الرحّل.",
        ),
      },
      {
        type: "truefalse",
        difficulty: "easy",
        statement: L(
          "Numidia was located in what is today northern Algeria.",
          "La Numidie se trouvait dans le nord de l'Algérie actuelle.",
          "كانت نوميديا تقع في شمال الجزائر اليوم.",
        ),
        answer: true,
        explanation: L(
          "Numidia stretched across much of modern northern Algeria.",
          "La Numidie couvrait une grande partie du nord algérien.",
          "امتدت نوميديا على معظم شمال الجزائر الحالي.",
        ),
      },
      {
        type: "truefalse",
        difficulty: "easy",
        statement: L(
          "Numidia was known for its strong navy.",
          "La Numidie était connue pour sa marine puissante.",
          "اشتهرت نوميديا بأسطولها البحري القوي.",
        ),
        answer: false,
        explanation: L(
          "Numidia was famous for its cavalry, not its navy.",
          "Elle était célèbre pour sa cavalerie, pas sa marine.",
          "اشتهرت بفرسانها لا بأسطولها.",
        ),
      },
      {
        type: "truefalse",
        difficulty: "medium",
        statement: L(
          "Massinissa was an enemy of Rome throughout his entire reign.",
          "Massinissa fut l'ennemi de Rome durant tout son règne.",
          "كان ماسينيسا عدوًا لروما طوال حكمه.",
        ),
        answer: false,
        explanation: L(
          "Massinissa was actually a long-time ally of Rome against Carthage.",
          "Il fut en réalité un allié de longue date de Rome contre Carthage.",
          "بل كان حليفًا طويل الأمد لروما ضد قرطاج.",
        ),
      },
      {
        type: "truefalse",
        difficulty: "medium",
        statement: L(
          "Numidia was once divided into two kingdoms.",
          "La Numidie fut un temps divisée en deux royaumes.",
          "كانت نوميديا منقسمة إلى مملكتين قبل توحدها.",
        ),
        answer: true,
        explanation: L(
          "It was split between eastern and western kingdoms before Massinissa united it.",
          "Elle était partagée entre un royaume oriental et un occidental avant Massinissa.",
          "كانت مقسّمة شرقية وغربية قبل أن يوحدها ماسينيسا.",
        ),
      },
      {
        type: "truefalse",
        difficulty: "hard",
        statement: L(
          "Many Numidians fought alongside Rome in major Mediterranean wars.",
          "De nombreux Numides combattirent aux côtés de Rome.",
          "قاتل كثير من النوميديين إلى جانب روما في الحروب الكبرى.",
        ),
        answer: true,
        explanation: L(
          "Numidian cavalry served as key Roman allies, especially against Carthage.",
          "La cavalerie numide fut un allié clé, surtout contre Carthage.",
          "كان الفرسان النوميديون حلفاء أساسيين لروما، خاصة ضد قرطاج.",
        ),
      },
      {
        type: "whoami",
        difficulty: "easy",
        clues: [
          L(
            "I lived to be over 90 years old.",
            "J'ai vécu plus de 90 ans.",
            "عشت أكثر من 90 سنة.",
          ),
          L(
            "I led the unification of my Berber kingdom.",
            "J'ai unifié mon royaume berbère.",
            "وحّدت مملكتي الأمازيغية.",
          ),
          L(
            "I was a famous ally of Rome.",
            "Je fus un célèbre allié de Rome.",
            "كنت حليفًا مشهورًا لروما.",
          ),
        ],
        options: [
          L("Jugurtha", "Jugurtha", "يوغرطة"),
          L("Hannibal", "Hannibal", "هنيبعل"),
          L("Massinissa", "Massinissa", "ماسينيسا"),
          L("Juba II", "Juba II", "يوبا الثاني"),
        ],
        answerIndex: 2,
        explanation: L(
          "Massinissa reigned over 50 years and lived past 90.",
          "Massinissa régna plus de 50 ans et vécut au-delà de 90.",
          "حكم ماسينيسا أكثر من 50 عامًا وعاش أكثر من 90.",
        ),
      },
      {
        type: "whoami",
        difficulty: "medium",
        clues: [
          L(
            "I defied Rome in a long, fierce war.",
            "J'ai défié Rome dans une longue guerre.",
            "تحدّيت روما في حرب طويلة وشرسة.",
          ),
          L(
            "My name is attached to a famous Roman conflict.",
            "Mon nom est lié à un célèbre conflit romain.",
            "اسمي مرتبط بصراع روماني شهير.",
          ),
          L(
            "I was eventually betrayed and captured.",
            "Je fus finalement trahi et capturé.",
            "خُنت في النهاية وأُسرت.",
          ),
        ],
        options: [
          L("Massinissa", "Massinissa", "ماسينيسا"),
          L("Jugurtha", "Jugurtha", "يوغرطة"),
          L("Syphax", "Syphax", "سيفاكس"),
          L("Juba I", "Juba Ier", "يوبا الأول"),
        ],
        answerIndex: 1,
        explanation: L(
          "The Jugurthine War (112–106 BC) is named after King Jugurtha.",
          "La guerre de Jugurtha (112–106 av. J.-C.) porte son nom.",
          "سُمّيت حرب يوغرطة (112-106 ق.م) باسمه.",
        ),
      },
      {
        type: "whoami",
        difficulty: "hard",
        clues: [
          L(
            "I was a rival Numidian king before unification.",
            "J'étais un roi numide rival avant l'unification.",
            "كنت ملكًا نوميديًا منافسًا قبل التوحيد.",
          ),
          L(
            "I sided with Carthage against Rome.",
            "Je me suis rangé du côté de Carthage contre Rome.",
            "انحزت إلى قرطاج ضد روما.",
          ),
          L(
            "I was captured at the Battle of Cirta.",
            "Je fus capturé à la bataille de Cirta.",
            "أُسرت في معركة سيرتا.",
          ),
        ],
        options: [
          L("Syphax", "Syphax", "سيفاكس"),
          L("Hannibal", "Hannibal", "هنيبعل"),
          L("Juba I", "Juba Ier", "يوبا الأول"),
          L("Bocchus", "Bocchus", "بوخوس"),
        ],
        answerIndex: 0,
        explanation: L(
          "Syphax ruled western Numidia and was captured in 203 BC.",
          "Syphax régnait sur la Numidie occidentale et fut capturé en 203 av. J.-C.",
          "حكم سيفاكس نوميديا الغربية وأُسر عام 203 ق.م.",
        ),
      },
      {
        type: "whoami",
        difficulty: "medium",
        clues: [
          L(
            "I am a massive royal tomb on the Algerian plains.",
            "Je suis un grand tombeau royal sur les plaines algériennes.",
            "أنا ضريح ملكي ضخم في سهول الجزائر.",
          ),
          L(
            "I was built for Numidian kings.",
            "J'ai été bâti pour les rois numides.",
            "بُنيتُ لملوك نوميديا.",
          ),
          L(
            "I still rise above the landscape today.",
            "Je domine encore le paysage aujourd'hui.",
            "ما زلت شامخًا حتى اليوم.",
          ),
        ],
        options: [
          L("The Medracen", "Le Medracen", "المدغاسن"),
          L("The Pyramids of Giza", "Les pyramides de Gizeh", "أهرامات الجيزة"),
          L("Petra", "Pétra", "البتراء"),
          L("Leptis Magna", "Leptis Magna", "لبدة الكبرى"),
        ],
        answerIndex: 0,
        explanation: L(
          "The Medracen is one of North Africa's oldest royal tombs.",
          "Le Medracen est l'un des plus anciens tombeaux royaux d'Afrique du Nord.",
          "المدغاسن من أقدم الأضرحة الملكية في شمال إفريقيا.",
        ),
      },
      {
        type: "order",
        difficulty: "hard",
        prompt: L(
          "Place these Numidian moments in chronological order.",
          "Placez ces moments numides dans l'ordre chronologique.",
          "رتّب هذه اللحظات النوميدية زمنيًا.",
        ),
        items: [
          {
            id: "unite",
            label: L(
              "Massinissa unites Numidia",
              "Massinissa unifie la Numidie",
              "ماسينيسا يوحّد نوميديا",
            ),
            hint: L("~202 BC", "~202 av. J.-C.", "نحو 202 ق.م"),
          },
          {
            id: "war",
            label: L(
              "Jugurthine War with Rome",
              "Guerre de Jugurtha contre Rome",
              "حرب يوغرطة ضد روما",
            ),
            hint: L("112–106 BC", "112–106 av. J.-C.", "112-106 ق.م"),
          },
          {
            id: "annex",
            label: L(
              "Numidia annexed by Rome",
              "Annexion de la Numidie par Rome",
              "ضمّ روما لنوميديا",
            ),
            hint: L("46 BC", "46 av. J.-C.", "46 ق.م"),
          },
        ],
      },
      {
        type: "image",
        difficulty: "easy",
        question: L(
          "This iconic ancient capital of Numidia is known today as…",
          "Cette ancienne capitale numide est connue aujourd'hui sous le nom de…",
          "تُعرف هذه العاصمة النوميدية القديمة اليوم باسم…",
        ),
        imageEmoji: "🏛️",
        options: [
          L("Algiers", "Alger", "الجزائر العاصمة"),
          L("Constantine (Cirta)", "Constantine (Cirta)", "قسنطينة (سيرتا)"),
          L("Oran", "Oran", "وهران"),
          L("Tlemcen", "Tlemcen", "تلمسان"),
        ],
        answerIndex: 1,
        explanation: L(
          "Ancient Cirta is modern Constantine, perched on dramatic cliffs.",
          "L'antique Cirta est l'actuelle Constantine, sur ses falaises spectaculaires.",
          "سيرتا القديمة هي قسنطينة الحالية المطلة على المنحدرات.",
        ),
      },
    ],
  },

  // ============================================================
  // 2) ROMAN ALGERIA
  // ============================================================
  {
    id: "roman",
    title: L("Roman Algeria", "Algérie romaine", "الجزائر الرومانية"),
    dateRange: "46 BC – 430 AD",
    emoji: "🏛️",
    summary: L(
      "When Rome absorbed Numidia, golden wheat fields and silver olive groves turned the region into the empire's pantry. Marble cities like Timgad and Djemila rose from the plains, and a young man from Thagaste — Augustine — would one day reshape the Western mind.",
      "Quand Rome absorba la Numidie, blé doré et oliviers argentés firent de la région le grenier de l'empire. Des cités de marbre comme Timgad et Djemila s'élevèrent, et un jeune homme de Thagaste, Augustin, transforma un jour la pensée occidentale.",
      "حين ضمّت روما نوميديا، صارت سهول القمح وأشجار الزيتون مخزن الإمبراطورية. ارتفعت مدن رخامية كتيمقاد وجميلة، ومن مدينة تاغست خرج شاب اسمه أوغسطين سيغيّر الفكر الغربي.",
    ),
    figures: [
      {
        name: L("Saint Augustine", "Saint Augustin", "القديس أوغسطين"),
        note: L(
          "Famous philosopher born in Thagaste.",
          "Célèbre philosophe né à Thagaste.",
          "فيلسوف شهير وُلد في تاغست.",
        ),
      },
      {
        name: L("Juba II", "Juba II", "يوبا الثاني"),
        note: L(
          "Scholar-king educated in Rome.",
          "Roi savant éduqué à Rome.",
          "ملك عالم تلقى تعليمه في روما.",
        ),
      },
    ],
    places: [
      {
        name: L("Timgad", "Timgad", "تيمقاد"),
        note: L(
          "A perfectly planned Roman city, still standing.",
          "Cité romaine parfaitement planifiée, toujours debout.",
          "مدينة رومانية مخططة بدقة، لا تزال قائمة.",
        ),
      },
      {
        name: L("Djemila", "Djemila", "جميلة"),
        note: L(
          "Mountain city with stunning ruins.",
          "Cité de montagne aux ruines spectaculaires.",
          "مدينة جبلية بأطلال خلابة.",
        ),
      },
    ],
    facts: [
      L(
        "Timgad was built as a retirement town for Roman soldiers.",
        "Timgad fut bâtie comme ville de retraite pour les soldats romains.",
        "بُنيت تيمقاد كمدينة تقاعد للجنود الرومان.",
      ),
      L(
        "North Africa was called the 'breadbasket of Rome'.",
        "L'Afrique du Nord était surnommée le « grenier de Rome ».",
        "كانت شمال إفريقيا تُلقّب بـ'سلة خبز روما'.",
      ),
      L(
        "Saint Augustine wrote his 'Confessions' — one of the first autobiographies ever.",
        "Saint Augustin écrivit ses « Confessions », l'une des premières autobiographies.",
        "كتب القديس أوغسطين 'الاعترافات'، من أوائل السير الذاتية في التاريخ.",
      ),
      L(
        "Djemila means 'the beautiful' in Arabic — and its ruins really live up to the name.",
        "Djemila signifie « la belle » en arabe — et ses ruines portent bien leur nom.",
        "جميلة تعني 'الحسناء' بالعربية، وأطلالها تستحق الاسم.",
      ),
      L(
        "Roman Algeria produced so much olive oil that giant amphorae traveled across the Mediterranean.",
        "L'Algérie romaine produisait tant d'huile d'olive que d'immenses amphores sillonnaient la Méditerranée.",
        "كانت الجزائر الرومانية تنتج زيتًا وفيرًا تنقله جرار ضخمة عبر المتوسط.",
      ),
      L(
        "Tipaza's seaside ruins inspired the Algerian-French writer Albert Camus.",
        "Les ruines maritimes de Tipaza ont inspiré l'écrivain Albert Camus.",
        "ألهمت أطلال تيبازة الساحلية الكاتب ألبير كامو.",
      ),
      L(
        "The Roman city of Lambaesis was home to the legendary Third Augustan Legion.",
        "Lambaesis abritait la fameuse Troisième Légion Auguste.",
        "كانت لامبيز موطن الفيلق الأوغسطي الثالث الشهير.",
      ),
      L(
        "Long Roman aqueducts carried fresh water across hills and valleys to growing cities.",
        "De longs aqueducs romains acheminaient l'eau à travers collines et vallées.",
        "نقلت قنوات رومانية طويلة الماء عبر التلال والوديان إلى المدن.",
      ),
    ],
    badge: L("Roman Wanderer", "Voyageur romain", "جوّاب الرومان"),
    quiz: [
      {
        type: "mcq",
        difficulty: "easy",
        question: L(
          "Which famous philosopher was born in Roman Algeria?",
          "Quel célèbre philosophe est né en Algérie romaine ?",
          "أي فيلسوف شهير وُلد في الجزائر الرومانية؟",
        ),
        options: [
          L("Plato", "Platon", "أفلاطون"),
          L("Saint Augustine", "Saint Augustin", "القديس أوغسطين"),
          L("Cicero", "Cicéron", "شيشرون"),
          L("Seneca", "Sénèque", "سينيكا"),
        ],
        answerIndex: 1,
        explanation: L(
          "Saint Augustine was born in Thagaste (modern Souk Ahras).",
          "Saint Augustin est né à Thagaste (Souk Ahras).",
          "وُلد أوغسطين في تاغست (سوق أهراس اليوم).",
        ),
      },
      {
        type: "mcq",
        difficulty: "easy",
        question: L(
          "Why was North Africa vital to Rome?",
          "Pourquoi l'Afrique du Nord était-elle vitale pour Rome ?",
          "لماذا كانت شمال إفريقيا مهمة لروما؟",
        ),
        options: [
          L("Gold mines", "Mines d'or", "مناجم الذهب"),
          L("Wheat supply", "Approvisionnement en blé", "إمدادات القمح"),
          L("Spices", "Épices", "البهارات"),
          L("Warships", "Navires de guerre", "السفن الحربية"),
        ],
        answerIndex: 1,
        explanation: L(
          "Its wheat fields fed the city of Rome itself.",
          "Ses champs de blé nourrissaient Rome elle-même.",
          "كانت حقول قمحها تطعم مدينة روما نفسها.",
        ),
      },
      {
        type: "mcq",
        difficulty: "easy",
        question: L(
          "Timgad was originally built for…",
          "Timgad fut bâtie à l'origine pour…",
          "بُنيت تيمقاد أصلًا من أجل…",
        ),
        options: [
          L("Traders", "Marchands", "التجار"),
          L("Retired soldiers", "Soldats à la retraite", "الجنود المتقاعدين"),
          L("Priests", "Prêtres", "الكهنة"),
          L("Sailors", "Marins", "البحارة"),
        ],
        answerIndex: 1,
        explanation: L(
          "Emperor Trajan founded it as a colony for army veterans.",
          "L'empereur Trajan la fonda comme colonie de vétérans.",
          "أسسها الإمبراطور تراجان مستعمرة لقدامى الجنود.",
        ),
      },
      {
        type: "mcq",
        difficulty: "easy",
        question: L(
          "Which mountain city is famous for its stunning Roman ruins?",
          "Quelle cité de montagne est célèbre pour ses ruines romaines ?",
          "أي مدينة جبلية تشتهر بأطلالها الرومانية الخلابة؟",
        ),
        options: [
          L("Djemila", "Djemila", "جميلة"),
          L("Algiers", "Alger", "الجزائر العاصمة"),
          L("Tlemcen", "Tlemcen", "تلمسان"),
          L("Béjaïa", "Béjaïa", "بجاية"),
        ],
        answerIndex: 0,
        explanation: L(
          "Djemila ('the beautiful') is a UNESCO World Heritage site.",
          "Djemila est inscrite au patrimoine mondial de l'UNESCO.",
          "جميلة مدرجة ضمن قائمة اليونسكو للتراث العالمي.",
        ),
      },
      {
        type: "mcq",
        difficulty: "medium",
        question: L(
          "What crops made Roman North Africa especially wealthy?",
          "Quelles cultures enrichirent l'Afrique du Nord romaine ?",
          "أي محاصيل أثرت شمال إفريقيا الرومانية؟",
        ),
        options: [
          L("Rice", "Riz", "الأرز"),
          L("Olive oil and wheat", "Huile d'olive et blé", "زيت الزيتون والقمح"),
          L("Tea", "Thé", "الشاي"),
          L("Cotton", "Coton", "القطن"),
        ],
        answerIndex: 1,
        explanation: L(
          "Vast olive groves and wheat fields enriched the province.",
          "De vastes oliveraies et champs de blé enrichirent la province.",
          "أغنت بساتين الزيتون وحقول القمح المقاطعة.",
        ),
      },
      {
        type: "mcq",
        difficulty: "medium",
        question: L(
          "Saint Augustine was born in which ancient town?",
          "Saint Augustin naquit dans quelle ville antique ?",
          "في أي مدينة قديمة وُلد القديس أوغسطين؟",
        ),
        options: [
          L("Thagaste", "Thagaste", "تاغست"),
          L("Hippo", "Hippone", "هيبو"),
          L("Cirta", "Cirta", "سيرتا"),
          L("Caesarea", "Césarée", "قيصرية"),
        ],
        answerIndex: 0,
        explanation: L(
          "Thagaste is today's Souk Ahras in northeast Algeria.",
          "Thagaste est l'actuelle Souk Ahras.",
          "تاغست هي سوق أهراس اليوم شمال شرق الجزائر.",
        ),
      },
      {
        type: "mcq",
        difficulty: "hard",
        question: L(
          "Which legendary Roman legion was based at Lambaesis in Algeria?",
          "Quelle légion romaine était basée à Lambaesis ?",
          "أي فيلق روماني شهير كان متمركزًا في لامبيز؟",
        ),
        options: [
          L("First Italian", "Première Italique", "الفيلق الإيطالي الأول"),
          L("Third Augustan", "Troisième Auguste", "الفيلق الأوغسطي الثالث"),
          L("Tenth Equestrian", "Dixième Équestre", "الفيلق الفروسي العاشر"),
          L("Fifth Macedonian", "Cinquième Macédonienne", "الفيلق المقدوني الخامس"),
        ],
        answerIndex: 1,
        explanation: L(
          "Legio III Augusta guarded Roman North Africa for centuries.",
          "La Légion III Augusta protégea l'Afrique du Nord romaine.",
          "حرس الفيلق الأوغسطي الثالث شمال إفريقيا قرونًا.",
        ),
      },
      {
        type: "mcq",
        difficulty: "hard",
        question: L(
          "Which Roman emperor was born in North Africa?",
          "Quel empereur romain est né en Afrique du Nord ?",
          "أي إمبراطور روماني وُلد في شمال إفريقيا؟",
        ),
        options: [
          L("Augustus", "Auguste", "أوغسطس"),
          L("Septimius Severus", "Septime Sévère", "سبتيموس سيفيروس"),
          L("Hadrian", "Hadrien", "هادريان"),
          L("Trajan", "Trajan", "تراجان"),
        ],
        answerIndex: 1,
        explanation: L(
          "Septimius Severus was born in Leptis Magna.",
          "Septime Sévère naquit à Leptis Magna.",
          "وُلد سبتيموس سيفيروس في لبدة الكبرى.",
        ),
      },
      {
        type: "mcq",
        difficulty: "hard",
        question: L(
          "What ended Roman rule in Algeria in the 5th century?",
          "Qu'est-ce qui mit fin à la domination romaine au Ve siècle ?",
          "ما الذي أنهى الحكم الروماني في القرن الخامس؟",
        ),
        options: [
          L("A Berber revolt", "Une révolte berbère", "ثورة أمازيغية"),
          L("The Vandal invasion", "L'invasion vandale", "غزو الفاندال"),
          L("A Persian conquest", "Une conquête perse", "فتح فارسي"),
          L("Arab armies", "Les armées arabes", "جيوش العرب"),
        ],
        answerIndex: 1,
        explanation: L(
          "The Vandals crossed from Spain and took the region by 439 AD.",
          "Les Vandales traversèrent depuis l'Espagne et prirent la région en 439.",
          "عبر الفاندال من إسبانيا واستولوا على المنطقة عام 439م.",
        ),
      },
      {
        type: "truefalse",
        difficulty: "easy",
        statement: L(
          "North Africa was called the 'breadbasket of Rome'.",
          "L'Afrique du Nord était le « grenier de Rome ».",
          "كانت شمال إفريقيا تُسمى 'سلة خبز روما'.",
        ),
        answer: true,
        explanation: L(
          "Its wheat and olive oil fed much of the empire.",
          "Son blé et son huile nourrissaient l'empire.",
          "كان قمحها وزيتها يطعمان معظم الإمبراطورية.",
        ),
      },
      {
        type: "truefalse",
        difficulty: "easy",
        statement: L(
          "Saint Augustine was born in Italy.",
          "Saint Augustin est né en Italie.",
          "وُلد القديس أوغسطين في إيطاليا.",
        ),
        answer: false,
        explanation: L(
          "He was born in Thagaste, in present-day Algeria.",
          "Il est né à Thagaste, en Algérie actuelle.",
          "بل وُلد في تاغست، في الجزائر الحالية.",
        ),
      },
      {
        type: "truefalse",
        difficulty: "medium",
        statement: L(
          "Roman cities in Algeria often followed a neat grid layout.",
          "Les villes romaines suivaient souvent un plan en damier.",
          "كانت المدن الرومانية تُبنى وفق تصميم شبكي منتظم.",
        ),
        answer: true,
        explanation: L(
          "Roman urban planning used straight streets crossing at right angles.",
          "L'urbanisme romain utilisait des rues à angle droit.",
          "اعتمد التخطيط الروماني شوارع متعامدة.",
        ),
      },
      {
        type: "truefalse",
        difficulty: "medium",
        statement: L(
          "Juba II was known mainly as a warrior, not a scholar.",
          "Juba II était surtout connu comme guerrier, pas comme savant.",
          "اشتهر يوبا الثاني محاربًا لا عالمًا.",
        ),
        answer: false,
        explanation: L(
          "Juba II was famous as a scholar-king, educated in Rome.",
          "Juba II fut un roi savant, éduqué à Rome.",
          "اشتهر يوبا الثاني ملكًا عالمًا تعلّم في روما.",
        ),
      },
      {
        type: "truefalse",
        difficulty: "hard",
        statement: L(
          "The Roman city of Tipaza sits along the Mediterranean coast.",
          "Tipaza se trouve sur la côte méditerranéenne.",
          "تقع تيبازة الرومانية على ساحل البحر المتوسط.",
        ),
        answer: true,
        explanation: L(
          "Tipaza's seaside ruins are a UNESCO World Heritage site.",
          "Les ruines de Tipaza sont au patrimoine mondial.",
          "أطلال تيبازة الساحلية مدرجة تراثًا عالميًا.",
        ),
      },
      {
        type: "whoami",
        difficulty: "easy",
        clues: [
          L("I was born in Thagaste.", "Je suis né à Thagaste.", "وُلدت في تاغست."),
          L(
            "My writings shaped Western Christian thought.",
            "Mes écrits ont façonné la pensée chrétienne.",
            "شكّلت كتاباتي الفكر المسيحي الغربي.",
          ),
          L("I wrote 'Confessions'.", "J'ai écrit les « Confessions ».", "كتبت 'الاعترافات'."),
        ],
        options: [
          L("Cicero", "Cicéron", "شيشرون"),
          L("Saint Augustine", "Saint Augustin", "القديس أوغسطين"),
          L("Tertullian", "Tertullien", "ترتليان"),
          L("Juba II", "Juba II", "يوبا الثاني"),
        ],
        answerIndex: 1,
        explanation: L(
          "Saint Augustine of Hippo — one of history's most read authors.",
          "Saint Augustin d'Hippone, l'un des auteurs les plus lus de l'histoire.",
          "القديس أوغسطين من أكثر مؤلفي التاريخ قراءةً.",
        ),
      },
      {
        type: "whoami",
        difficulty: "medium",
        clues: [
          L(
            "I was a scholar-king educated in Rome.",
            "Je fus un roi savant éduqué à Rome.",
            "كنت ملكًا عالمًا تعلّمت في روما.",
          ),
          L(
            "I ruled a kingdom near Numidia.",
            "Je régnais sur un royaume voisin de la Numidie.",
            "حكمت مملكة قرب نوميديا.",
          ),
          L(
            "I was married to Cleopatra Selene II.",
            "J'ai épousé Cléopâtre Séléné II.",
            "تزوجت كليوباترا سيليني الثانية.",
          ),
        ],
        options: [
          L("Massinissa", "Massinissa", "ماسينيسا"),
          L("Jugurtha", "Jugurtha", "يوغرطة"),
          L("Juba II", "Juba II", "يوبا الثاني"),
          L("Hannibal", "Hannibal", "هنيبعل"),
        ],
        answerIndex: 2,
        explanation: L(
          "Juba II ruled Mauretania and authored many books.",
          "Juba II régna sur la Maurétanie et écrivit beaucoup.",
          "حكم يوبا الثاني موريتانيا وألّف كتبًا كثيرة.",
        ),
      },
      {
        type: "whoami",
        difficulty: "hard",
        clues: [
          L("I was a bishop in Hippo.", "J'étais évêque d'Hippone.", "كنت أسقفًا في هيبو."),
          L(
            "I wrote the 'City of God'.",
            "J'ai écrit « La Cité de Dieu ».",
            "كتبت 'مدينة الله'.",
          ),
          L(
            "I am a saint of the Christian church.",
            "Je suis un saint chrétien.",
            "أنا قديس في الكنيسة المسيحية.",
          ),
        ],
        options: [
          L("Tertullian", "Tertullien", "ترتليان"),
          L("Saint Augustine", "Saint Augustin", "القديس أوغسطين"),
          L("Cyprian", "Cyprien", "قبريانوس"),
          L("Origen", "Origène", "أوريجين"),
        ],
        answerIndex: 1,
        explanation: L(
          "Saint Augustine served as bishop of Hippo Regius (Annaba).",
          "Saint Augustin fut évêque d'Hippone (Annaba).",
          "كان أوغسطين أسقف هيبو ريجيوس (عنابة).",
        ),
      },
      {
        type: "whoami",
        difficulty: "hard",
        clues: [
          L(
            "I was a Roman emperor born in North Africa.",
            "Je fus empereur romain né en Afrique du Nord.",
            "كنت إمبراطورًا رومانيًا وُلد في شمال إفريقيا.",
          ),
          L(
            "I expanded the empire's borders.",
            "J'ai élargi les frontières de l'empire.",
            "وسّعت حدود الإمبراطورية.",
          ),
          L(
            "My dynasty ruled Rome in the late 2nd and early 3rd century.",
            "Ma dynastie régna à la fin du IIe et au début du IIIe siècle.",
            "حكمت أسرتي روما أواخر القرن الثاني وبداية الثالث.",
          ),
        ],
        options: [
          L("Nero", "Néron", "نيرون"),
          L("Septimius Severus", "Septime Sévère", "سبتيموس سيفيروس"),
          L("Caligula", "Caligula", "كاليغولا"),
          L("Constantine", "Constantin", "قسطنطين"),
        ],
        answerIndex: 1,
        explanation: L(
          "Septimius Severus founded the Severan dynasty.",
          "Septime Sévère fonda la dynastie des Sévères.",
          "أسس سبتيموس سيفيروس الأسرة السيفيرية.",
        ),
      },
      {
        type: "order",
        difficulty: "hard",
        prompt: L(
          "Order these events of Roman North Africa.",
          "Ordonnez ces événements de l'Afrique du Nord romaine.",
          "رتّب أحداث شمال إفريقيا الرومانية.",
        ),
        items: [
          {
            id: "annex",
            label: L(
              "Rome annexes Numidia",
              "Rome annexe la Numidie",
              "روما تضمّ نوميديا",
            ),
            hint: L("46 BC", "46 av. J.-C.", "46 ق.م"),
          },
          {
            id: "timgad",
            label: L(
              "Timgad founded as colony",
              "Fondation de Timgad",
              "تأسيس تيمقاد",
            ),
            hint: L("100 AD", "100 ap. J.-C.", "100 م"),
          },
          {
            id: "vandal",
            label: L(
              "Vandals invade North Africa",
              "Les Vandales envahissent l'Afrique du Nord",
              "غزو الفاندال لشمال إفريقيا",
            ),
            hint: L("429 AD", "429 ap. J.-C.", "429 م"),
          },
        ],
      },
      {
        type: "image",
        difficulty: "easy",
        question: L(
          "This perfectly preserved Roman city in Algeria is…",
          "Cette cité romaine parfaitement préservée est…",
          "هذه المدينة الرومانية المحفوظة هي…",
        ),
        imageEmoji: "🏛️",
        options: [
          L("Pompeii", "Pompéi", "بومبي"),
          L("Timgad", "Timgad", "تيمقاد"),
          L("Leptis Magna", "Leptis Magna", "لبدة الكبرى"),
          L("Carthage", "Carthage", "قرطاج"),
        ],
        answerIndex: 1,
        explanation: L(
          "Timgad's grid streets are still visible in the desert today.",
          "Les rues en damier de Timgad sont encore visibles.",
          "لا تزال شوارع تيمقاد المتعامدة ظاهرة في الصحراء.",
        ),
      },
    ],
  },

  // ============================================================
  // 3) EARLY ISLAMIC ALGERIA
  // ============================================================
  {
    id: "islamic",
    title: L("Early Islamic Algeria", "Algérie islamique médiévale", "الجزائر الإسلامية"),
    dateRange: "7th – 16th century",
    emoji: "🕌",
    summary: L(
      "In the 7th century, Arab horsemen crossed the desert carrying a new faith. Islam met Berber spirit, sparked dynasties, and lit up cities like Tlemcen and Béjaïa — where scholars debated, traders bargained, and a young Italian named Fibonacci first met Arabic numerals.",
      "Au VIIe siècle, des cavaliers arabes traversèrent le désert avec une foi nouvelle. L'islam rencontra l'esprit berbère, fit naître des dynasties et illumina Tlemcen et Béjaïa — où Fibonacci découvrit les chiffres arabes.",
      "في القرن السابع، عبر الفرسان العرب الصحراء حاملين دينًا جديدًا. التقى الإسلام بالروح الأمازيغية، فأنشأ دولًا وأضاء مدنًا كتلمسان وبجاية، حيث تعلّم الإيطالي فيبوناتشي الأرقام العربية.",
    ),
    figures: [
      {
        name: L("Kahina (Dihya)", "Kahina (Dihya)", "الكاهنة (ديهيا)"),
        note: L(
          "Berber warrior queen who resisted the Arab conquest.",
          "Reine guerrière berbère qui résista à la conquête arabe.",
          "ملكة أمازيغية محاربة قاومت الفتح العربي.",
        ),
      },
      {
        name: L("Ibn Khaldun", "Ibn Khaldoun", "ابن خلدون"),
        note: L(
          "Pioneer historian who lived and wrote in Algeria.",
          "Historien pionnier qui vécut et écrivit en Algérie.",
          "مؤرخ رائد عاش وكتب في الجزائر.",
        ),
      },
    ],
    places: [
      {
        name: L("Tlemcen", "Tlemcen", "تلمسان"),
        note: L(
          "Jewel city of the Zayyanid dynasty.",
          "Ville-joyau de la dynastie zianide.",
          "درّة الدولة الزيانية.",
        ),
      },
      {
        name: L("Béjaïa", "Béjaïa", "بجاية"),
        note: L(
          "Major port that introduced Arabic numerals to Europe.",
          "Grand port qui apporta les chiffres arabes à l'Europe.",
          "ميناء كبير عرّف أوروبا بالأرقام العربية.",
        ),
      },
    ],
    facts: [
      L(
        "Ibn Khaldun is considered one of the founders of sociology.",
        "Ibn Khaldoun est considéré comme un fondateur de la sociologie.",
        "يُعدّ ابن خلدون من مؤسسي علم الاجتماع.",
      ),
      L(
        "Fibonacci learned Arabic numerals in Béjaïa as a young man.",
        "Fibonacci apprit les chiffres arabes à Béjaïa.",
        "تعلّم فيبوناتشي الأرقام العربية في بجاية شابًا.",
      ),
      L(
        "Tlemcen was nicknamed 'the pearl of the Maghreb'.",
        "Tlemcen était surnommée « la perle du Maghreb ».",
        "كانت تلمسان تُلقّب بـ'لؤلؤة المغرب'.",
      ),
      L(
        "Algiers earned the nickname 'El Bahdja' — 'the joyful'.",
        "Alger fut surnommée « El Bahdja », la joyeuse.",
        "عُرفت الجزائر بـ'البهجة'.",
      ),
      L(
        "The Great Mosque of Tlemcen, built in 1136, still stands almost unchanged.",
        "La Grande Mosquée de Tlemcen, de 1136, est presque intacte.",
        "لا يزال المسجد الأعظم بتلمسان (1136م) قائمًا تقريبًا كما هو.",
      ),
      L(
        "Berber and Arab cultures slowly blended into Algerian identity.",
        "Cultures berbère et arabe se sont fondues en l'identité algérienne.",
        "امتزجت الثقافتان الأمازيغية والعربية لتشكّلا الهوية الجزائرية.",
      ),
      L(
        "Béjaïa exported beeswax candles to Europe — the French word 'bougie' comes from its name.",
        "Béjaïa exportait des bougies en cire — le mot « bougie » vient de son nom.",
        "صدّرت بجاية شموع الشمع إلى أوروبا — وكلمة 'bougie' الفرنسية مشتقة من اسمها.",
      ),
      L(
        "Caravans crossed the Sahara linking Algerian markets to West African gold and salt.",
        "Les caravanes liaient l'Algérie au Sahel via l'or et le sel.",
        "ربطت القوافل الصحراوية أسواق الجزائر بذهب وملح غرب إفريقيا.",
      ),
    ],
    badge: L("Scholar of the Maghreb", "Érudit du Maghreb", "عالم المغرب"),
    quiz: [
      {
        type: "mcq",
        difficulty: "easy",
        question: L(
          "Which queen led Berber resistance to the Arab conquest?",
          "Quelle reine mena la résistance berbère ?",
          "أي ملكة قادت المقاومة الأمازيغية للفتح العربي؟",
        ),
        options: [
          L("Cleopatra", "Cléopâtre", "كليوباترا"),
          L("Kahina (Dihya)", "Kahina (Dihya)", "الكاهنة (ديهيا)"),
          L("Zenobia", "Zénobie", "زنوبيا"),
          L("Tin Hinan", "Tin Hinan", "تين هينان"),
        ],
        answerIndex: 1,
        explanation: L(
          "Kahina (Dihya) led fierce Berber resistance in the Aurès.",
          "Kahina (Dihya) résista farouchement dans les Aurès.",
          "قادت الكاهنة (ديهيا) مقاومة شرسة في الأوراس.",
        ),
      },
      {
        type: "mcq",
        difficulty: "easy",
        question: L(
          "Ibn Khaldun is known as a pioneer of…",
          "Ibn Khaldoun est un pionnier de…",
          "يُعرف ابن خلدون بأنه رائد في…",
        ),
        options: [
          L("Astronomy", "Astronomie", "علم الفلك"),
          L("Sociology", "Sociologie", "علم الاجتماع"),
          L("Medicine", "Médecine", "الطب"),
          L("Poetry", "Poésie", "الشعر"),
        ],
        answerIndex: 1,
        explanation: L(
          "His 'Muqaddimah' laid the foundations of social science.",
          "Sa « Muqaddima » fonda les sciences sociales.",
          "أسست 'مقدمته' علوم الاجتماع.",
        ),
      },
      {
        type: "mcq",
        difficulty: "easy",
        question: L(
          "Which city helped spread Arabic numerals to Europe?",
          "Quelle ville diffusa les chiffres arabes en Europe ?",
          "أي مدينة نشرت الأرقام العربية في أوروبا؟",
        ),
        options: [
          L("Algiers", "Alger", "الجزائر العاصمة"),
          L("Béjaïa", "Béjaïa", "بجاية"),
          L("Oran", "Oran", "وهران"),
          L("Annaba", "Annaba", "عنابة"),
        ],
        answerIndex: 1,
        explanation: L(
          "Béjaïa's bustling port is where Fibonacci learned them.",
          "Fibonacci les apprit dans le port animé de Béjaïa.",
          "تعلّمها فيبوناتشي في ميناء بجاية النشط.",
        ),
      },
      {
        type: "mcq",
        difficulty: "easy",
        question: L(
          "In which century did Arab armies first reach the Maghreb?",
          "À quel siècle les armées arabes arrivèrent-elles au Maghreb ?",
          "في أي قرن وصلت الجيوش العربية للمغرب؟",
        ),
        options: [
          L("5th century", "Ve siècle", "القرن الخامس"),
          L("7th century", "VIIe siècle", "القرن السابع"),
          L("10th century", "Xe siècle", "القرن العاشر"),
          L("13th century", "XIIIe siècle", "القرن الثالث عشر"),
        ],
        answerIndex: 1,
        explanation: L(
          "The conquest began in the mid-7th century AD.",
          "La conquête débuta au milieu du VIIe siècle.",
          "بدأ الفتح في منتصف القرن السابع الميلادي.",
        ),
      },
      {
        type: "mcq",
        difficulty: "medium",
        question: L(
          "Which famous European mathematician learned Arabic numerals in Béjaïa?",
          "Quel mathématicien européen apprit les chiffres arabes à Béjaïa ?",
          "أي رياضي أوروبي شهير تعلّم الأرقام العربية في بجاية؟",
        ),
        options: [
          L("Newton", "Newton", "نيوتن"),
          L("Fibonacci", "Fibonacci", "فيبوناتشي"),
          L("Euclid", "Euclide", "إقليدس"),
          L("Descartes", "Descartes", "ديكارت"),
        ],
        answerIndex: 1,
        explanation: L(
          "Fibonacci's stay in Béjaïa changed European math forever.",
          "Le séjour de Fibonacci à Béjaïa transforma les maths européennes.",
          "غيّرت إقامة فيبوناتشي في بجاية رياضيات أوروبا للأبد.",
        ),
      },
      {
        type: "mcq",
        difficulty: "medium",
        question: L(
          "Which Algerian port gave its name to the French word for 'candle'?",
          "Quel port algérien a donné son nom au mot français « bougie » ?",
          "أي ميناء جزائري أعطى اسمه للكلمة الفرنسية 'bougie'؟",
        ),
        options: [
          L("Algiers", "Alger", "الجزائر العاصمة"),
          L("Oran", "Oran", "وهران"),
          L("Béjaïa", "Béjaïa", "بجاية"),
          L("Annaba", "Annaba", "عنابة"),
        ],
        answerIndex: 2,
        explanation: L(
          "Béjaïa exported beeswax candles to Europe — hence 'bougie'.",
          "Béjaïa exportait des bougies en cire — d'où le mot.",
          "صدّرت بجاية شموع الشمع، ومن هنا جاءت الكلمة.",
        ),
      },
      {
        type: "mcq",
        difficulty: "medium",
        question: L(
          "What role did mosques play in early Islamic Algerian cities?",
          "Quel rôle jouaient les mosquées ?",
          "ما دور المساجد في مدن الجزائر الإسلامية المبكرة؟",
        ),
        options: [
          L("Only places of prayer", "Seulement la prière", "للصلاة فقط"),
          L(
            "Centers of community, learning, and law",
            "Centres de communauté, savoir et droit",
            "مراكز للمجتمع والعلم والقضاء",
          ),
          L("Royal palaces", "Palais royaux", "قصور ملكية"),
          L("Military barracks", "Casernes militaires", "ثكنات عسكرية"),
        ],
        answerIndex: 1,
        explanation: L(
          "Mosques served as schools, courts, and gathering places.",
          "Les mosquées étaient écoles, tribunaux et lieux de rencontre.",
          "كانت المساجد مدارس ومحاكم وأماكن لقاء.",
        ),
      },
      {
        type: "mcq",
        difficulty: "hard",
        question: L(
          "Which dynasty made Tlemcen its capital in the 13th century?",
          "Quelle dynastie fit de Tlemcen sa capitale au XIIIe siècle ?",
          "أي دولة جعلت تلمسان عاصمتها في القرن الثالث عشر؟",
        ),
        options: [
          L("Almohads", "Almohades", "الموحدون"),
          L("Zayyanids", "Zianides", "الزيانيون"),
          L("Fatimids", "Fatimides", "الفاطميون"),
          L("Hafsids", "Hafsides", "الحفصيون"),
        ],
        answerIndex: 1,
        explanation: L(
          "The Zayyanid (Abdalwadid) dynasty turned Tlemcen into a Maghreb jewel.",
          "Les Zianides firent de Tlemcen un joyau maghrébin.",
          "حوّل الزيانيون تلمسان إلى درّة المغرب.",
        ),
      },
      {
        type: "mcq",
        difficulty: "hard",
        question: L(
          "Which Algerian region was the heart of Kahina's resistance?",
          "Dans quelle région se trouvait le cœur de la résistance de Kahina ?",
          "أين كانت معاقل الكاهنة الرئيسية؟",
        ),
        options: [
          L("Sahara", "Sahara", "الصحراء"),
          L("Aurès Mountains", "Aurès", "جبال الأوراس"),
          L("Tlemcen", "Tlemcen", "تلمسان"),
          L("Algiers coast", "Côte d'Alger", "ساحل الجزائر"),
        ],
        answerIndex: 1,
        explanation: L(
          "Kahina rallied tribes in the Aurès Mountains.",
          "Kahina rassembla les tribus dans les Aurès.",
          "جمعت الكاهنة القبائل في جبال الأوراس.",
        ),
      },
      {
        type: "truefalse",
        difficulty: "easy",
        statement: L(
          "Tlemcen was a renowned center of learning under the Zayyanid dynasty.",
          "Tlemcen fut un centre du savoir sous les Zianides.",
          "كانت تلمسان مركز علم في عهد الزيانيين.",
        ),
        answer: true,
        explanation: L(
          "Its madrasas attracted scholars from across the Muslim world.",
          "Ses médersas attiraient des savants de tout le monde musulman.",
          "اجتذبت مدارسها علماء من كل العالم الإسلامي.",
        ),
      },
      {
        type: "truefalse",
        difficulty: "easy",
        statement: L(
          "Islam reached North Africa in the 12th century.",
          "L'islam atteignit l'Afrique du Nord au XIIe siècle.",
          "وصل الإسلام إلى شمال إفريقيا في القرن الثاني عشر.",
        ),
        answer: false,
        explanation: L(
          "Arab armies brought Islam to the region in the 7th century.",
          "Les armées arabes apportèrent l'islam au VIIe siècle.",
          "بل وصل في القرن السابع مع الجيوش العربية.",
        ),
      },
      {
        type: "truefalse",
        difficulty: "medium",
        statement: L(
          "Berber and Arab cultures blended over centuries to shape Algerian identity.",
          "Les cultures berbère et arabe se sont fondues en l'identité algérienne.",
          "امتزجت الثقافتان الأمازيغية والعربية عبر القرون.",
        ),
        answer: true,
        explanation: L(
          "Centuries of exchange shaped today's Algerian culture.",
          "Des siècles d'échanges ont façonné la culture algérienne.",
          "صنعت قرون من التبادل ثقافة الجزائر اليوم.",
        ),
      },
      {
        type: "truefalse",
        difficulty: "medium",
        statement: L(
          "The Zayyanid dynasty had its capital in Algiers.",
          "Les Zianides avaient pour capitale Alger.",
          "كانت عاصمة الزيانيين الجزائر العاصمة.",
        ),
        answer: false,
        explanation: L(
          "Tlemcen was the capital of the Zayyanid dynasty.",
          "Tlemcen était la capitale des Zianides.",
          "بل كانت تلمسان عاصمة الزيانيين.",
        ),
      },
      {
        type: "truefalse",
        difficulty: "hard",
        statement: L(
          "Trans-Saharan trade routes expanded greatly during the Islamic era.",
          "Le commerce transsaharien s'élargit fortement à l'ère islamique.",
          "توسعت طرق التجارة عبر الصحراء في العصر الإسلامي.",
        ),
        answer: true,
        explanation: L(
          "Caravans linked the Maghreb to West Africa, carrying gold, salt, and ideas.",
          "Les caravanes liaient le Maghreb à l'Afrique de l'Ouest.",
          "ربطت القوافل المغرب بغرب إفريقيا حاملةً الذهب والملح والأفكار.",
        ),
      },
      {
        type: "whoami",
        difficulty: "easy",
        clues: [
          L("I was a Berber warrior queen.", "J'étais une reine berbère.", "كنت ملكة أمازيغية محاربة."),
          L(
            "I led fierce resistance against invading Arab armies.",
            "Je résistai aux armées arabes.",
            "قاومت الجيوش العربية الغازية.",
          ),
          L(
            "Legends call me 'the prophetess'.",
            "Les légendes m'appellent « la prophétesse ».",
            "تلقّبني الأساطير بـ'الكاهنة'.",
          ),
        ],
        options: [
          L("Kahina (Dihya)", "Kahina (Dihya)", "الكاهنة (ديهيا)"),
          L("Cleopatra", "Cléopâtre", "كليوباترا"),
          L("Zenobia", "Zénobie", "زنوبيا"),
          L("Tin Hinan", "Tin Hinan", "تين هينان"),
        ],
        answerIndex: 0,
        explanation: L(
          "Kahina (Dihya) — heroine of Berber resistance.",
          "Kahina (Dihya), héroïne de la résistance berbère.",
          "الكاهنة (ديهيا) بطلة المقاومة الأمازيغية.",
        ),
      },
      {
        type: "whoami",
        difficulty: "medium",
        clues: [
          L(
            "I am considered a founder of sociology.",
            "On me considère fondateur de la sociologie.",
            "أُعتبر مؤسسًا لعلم الاجتماع.",
          ),
          L("I wrote the 'Muqaddimah'.", "J'ai écrit la « Muqaddima ».", "كتبت 'المقدمة'."),
          L(
            "I lived and wrote in the Maghreb.",
            "J'ai vécu et écrit au Maghreb.",
            "عشت وكتبت في المغرب.",
          ),
        ],
        options: [
          L("Al-Khwarizmi", "Al-Khwarizmi", "الخوارزمي"),
          L("Ibn Khaldun", "Ibn Khaldoun", "ابن خلدون"),
          L("Averroes", "Averroès", "ابن رشد"),
          L("Ibn Battuta", "Ibn Battouta", "ابن بطوطة"),
        ],
        answerIndex: 1,
        explanation: L(
          "Ibn Khaldun's 'Muqaddimah' is a landmark of historical thought.",
          "La « Muqaddima » d'Ibn Khaldoun est une œuvre majeure.",
          "تُعد 'مقدمة' ابن خلدون علامة في الفكر التاريخي.",
        ),
      },
      {
        type: "whoami",
        difficulty: "hard",
        clues: [
          L(
            "I am a great medieval traveler from the Maghreb world.",
            "Je suis un grand voyageur médiéval maghrébin.",
            "أنا رحّالة مغربي كبير في العصور الوسطى.",
          ),
          L(
            "My name often appears alongside Marco Polo.",
            "Mon nom est souvent associé à Marco Polo.",
            "كثيرًا ما يُذكر اسمي مع ماركو بولو.",
          ),
          L(
            "I journeyed across Africa, Asia, and Europe.",
            "J'ai parcouru l'Afrique, l'Asie et l'Europe.",
            "جُبت إفريقيا وآسيا وأوروبا.",
          ),
        ],
        options: [
          L("Ibn Battuta", "Ibn Battouta", "ابن بطوطة"),
          L("Ibn Khaldun", "Ibn Khaldoun", "ابن خلدون"),
          L("Al-Idrisi", "Al-Idrissi", "الإدريسي"),
          L("Averroes", "Averroès", "ابن رشد"),
        ],
        answerIndex: 0,
        explanation: L(
          "Ibn Battuta traveled some 75,000 miles in the 14th century.",
          "Ibn Battouta parcourut près de 120 000 km au XIVe siècle.",
          "قطع ابن بطوطة نحو 120 ألف كم في القرن الرابع عشر.",
        ),
      },
      {
        type: "whoami",
        difficulty: "hard",
        clues: [
          L(
            "I am a Berber dynasty that ruled from Tlemcen.",
            "Je suis une dynastie berbère régnant depuis Tlemcen.",
            "أنا أسرة أمازيغية حكمت من تلمسان.",
          ),
          L(
            "I made my capital a center of art and learning.",
            "J'ai fait de ma capitale un foyer d'art et de savoir.",
            "جعلت عاصمتي مركز فن وعلم.",
          ),
          L(
            "I flourished from the 13th to 15th centuries.",
            "J'ai prospéré du XIIIe au XVe siècle.",
            "ازدهرت من القرن 13 إلى 15.",
          ),
        ],
        options: [
          L("Zayyanids", "Zianides", "الزيانيون"),
          L("Almohads", "Almohades", "الموحدون"),
          L("Fatimids", "Fatimides", "الفاطميون"),
          L("Ottomans", "Ottomans", "العثمانيون"),
        ],
        answerIndex: 0,
        explanation: L(
          "The Zayyanid dynasty turned Tlemcen into a Maghreb jewel.",
          "Les Zianides firent de Tlemcen un joyau maghrébin.",
          "حوّل الزيانيون تلمسان إلى درّة المغرب.",
        ),
      },
      {
        type: "order",
        difficulty: "hard",
        prompt: L(
          "Order these moments of Islamic Algeria.",
          "Ordonnez ces moments de l'Algérie islamique.",
          "رتّب هذه اللحظات من الجزائر الإسلامية.",
        ),
        items: [
          {
            id: "arrive",
            label: L(
              "Arab armies arrive in the Maghreb",
              "Les armées arabes au Maghreb",
              "وصول الجيوش العربية للمغرب",
            ),
            hint: L("7th century", "VIIe siècle", "القرن السابع"),
          },
          {
            id: "fibo",
            label: L(
              "Fibonacci learns numerals in Béjaïa",
              "Fibonacci à Béjaïa",
              "فيبوناتشي يتعلم في بجاية",
            ),
            hint: L("~1200", "~1200", "نحو 1200"),
          },
          {
            id: "zayyanid",
            label: L(
              "Zayyanid Tlemcen flourishes",
              "Apogée de Tlemcen zianide",
              "ازدهار تلمسان الزيانية",
            ),
            hint: L("13th–15th c.", "XIIIe–XVe s.", "القرن 13-15"),
          },
        ],
      },
      {
        type: "image",
        difficulty: "medium",
        question: L(
          "This North African 'jewel city' was capital of the Zayyanid dynasty.",
          "Cette « ville-joyau » fut capitale des Zianides.",
          "هذه 'المدينة الدرّة' كانت عاصمة الزيانيين.",
        ),
        imageEmoji: "🕌",
        options: [
          L("Fez", "Fès", "فاس"),
          L("Tlemcen", "Tlemcen", "تلمسان"),
          L("Kairouan", "Kairouan", "القيروان"),
          L("Cordoba", "Cordoue", "قرطبة"),
        ],
        answerIndex: 1,
        explanation: L(
          "Tlemcen — a center of art, scholarship, and trade.",
          "Tlemcen — centre d'art, de savoir et de commerce.",
          "تلمسان مركز للفن والعلم والتجارة.",
        ),
      },
    ],
  },

  // ============================================================
  // 4) OTTOMAN ALGERIA
  // ============================================================
  {
    id: "ottoman",
    title: L("Ottoman Algeria", "Algérie ottomane", "الجزائر العثمانية"),
    dateRange: "1516 – 1830",
    emoji: "🛡️",
    summary: L(
      "Ottoman Algeria was a powerful regency centered in Algiers. From the 16th century to 1830, it played an important role in Mediterranean politics, trade, and warfare. Local rulers, military elites, and Ottoman influence shaped the region long before French colonization began.",
      "L'Algérie ottomane était une régence puissante centrée sur Alger. Du XVIe siècle à 1830, elle a joué un rôle important dans la politique, le commerce et les conflits en Méditerranée. Des dirigeants locaux, des élites militaires et l'influence ottomane ont façonné la région bien avant la colonisation française.",
      "كانت الجزائر العثمانية إيالة قوية مركزها مدينة الجزائر. ومن القرن السادس عشر إلى سنة 1830، لعبت دورًا مهمًا في السياسة والتجارة والصراعات في البحر الأبيض المتوسط. وقد ساهم الحكام المحليون والنخب العسكرية والتأثير العثماني في تشكيل المنطقة قبل بداية الاستعمار الفرنسي بوقت طويل.",
    ),
    figures: [
      {
        name: L("Aruj Barbarossa", "Arudj Barberousse", "عروج بربروس"),
        note: L(
          "Helped establish Ottoman power in Algeria.",
          "A contribué à instaurer la puissance ottomane en Algérie.",
          "ساهم في ترسيخ النفوذ العثماني في الجزائر.",
        ),
      },
      {
        name: L("Hayreddin Barbarossa", "Khayreddine Barberousse", "خير الدين بربروس"),
        note: L(
          "Famed Ottoman admiral linked to Algiers.",
          "Célèbre amiral ottoman lié à Alger.",
          "أمير بحر عثماني شهير ارتبط اسمه بالجزائر.",
        ),
      },
      {
        name: L("Salah Rais", "Salah Raïs", "صالح رايس"),
        note: L(
          "Bey of Algiers and bold military leader.",
          "Bey d'Alger et chef militaire audacieux.",
          "بايلربك الجزائر وقائد عسكري جريء.",
        ),
      },
      {
        name: L("Baba Ali Chaouch", "Baba Ali Chaouch", "بابا علي شاوش"),
        note: L(
          "Dey who strengthened Algiers' autonomy.",
          "Dey qui renforça l'autonomie d'Alger.",
          "داي عزّز استقلال الجزائر داخل الإيالة.",
        ),
      },
      {
        name: L("Ahmed Bey of Constantine", "Ahmed Bey de Constantine", "أحمد باي قسنطينة"),
        note: L(
          "Last great defender against French expansion in the east.",
          "Dernier grand défenseur face à l'expansion française à l'est.",
          "آخر كبار المدافعين عن الشرق في وجه التوسع الفرنسي.",
        ),
      },
    ],
    places: [
      {
        name: L("Algiers", "Alger", "مدينة الجزائر"),
        note: L(
          "Capital and political heart of the regency.",
          "Capitale et cœur politique de la régence.",
          "العاصمة وقلب الإيالة السياسي.",
        ),
      },
      {
        name: L("Constantine", "Constantine", "قسنطينة"),
        note: L(
          "Eastern stronghold ruled by powerful beys.",
          "Bastion oriental dirigé par de puissants beys.",
          "حصن شرقي حكمه باياتٌ أقوياء.",
        ),
      },
    ],
    facts: [
      L(
        "Ottoman rule in Algeria began in the early 16th century.",
        "La présence ottomane en Algérie commence au début du XVIe siècle.",
        "بدأ الحكم العثماني في الجزائر في أوائل القرن السادس عشر.",
      ),
      L(
        "Algiers became one of the most important cities in the Mediterranean.",
        "Alger devient l'une des villes les plus importantes de la Méditerranée.",
        "أصبحت مدينة الجزائر من أهم مدن البحر الأبيض المتوسط.",
      ),
      L(
        "The Barbarossa brothers helped establish Ottoman power in Algeria.",
        "Les frères Barberousse ont contribué à établir la puissance ottomane en Algérie.",
        "ساهم الأخوان بربروس في ترسيخ النفوذ العثماني في الجزائر.",
      ),
      L(
        "Algeria was governed as a regency linked to the Ottoman Empire.",
        "L'Algérie était gouvernée comme une régence liée à l'Empire ottoman.",
        "كانت الجزائر تُحكم كإيالة مرتبطة بالدولة العثمانية.",
      ),
      L(
        "Corsair activity made Algiers famous across Europe and the Mediterranean.",
        "L'activité corsaire a rendu Alger célèbre à travers l'Europe et la Méditerranée.",
        "جعل النشاط البحري مدينة الجزائر مشهورة في أوروبا والبحر المتوسط.",
      ),
      L(
        "Ahmed Bey of Constantine became one of the last major defenders against French expansion.",
        "Ahmed Bey de Constantine fut l'un des derniers grands défenseurs face à l'expansion française.",
        "كان أحمد باي قسنطينة من آخر كبار المدافعين في وجه التوسع الفرنسي.",
      ),
    ],
    badge: L("Guardian of Ottoman Algiers", "Gardien de l'Alger ottomane", "حارس الجزائر العثمانية"),
    quiz: [
      {
        type: "mcq",
        difficulty: "easy",
        question: L(
          "When did Ottoman rule begin in Algeria?",
          "Quand le règne ottoman a-t-il commencé en Algérie ?",
          "متى بدأ الحكم العثماني في الجزائر؟",
        ),
        options: [
          L("1516", "1516", "1516"),
          L("1830", "1830", "1830"),
          L("1453", "1453", "1453"),
          L("1700", "1700", "1700"),
        ],
        answerIndex: 0,
        explanation: L(
          "Ottoman influence in Algeria began in the early 16th century.",
          "L'influence ottomane en Algérie a commencé au début du XVIe siècle.",
          "بدأ النفوذ العثماني في الجزائر في أوائل القرن السادس عشر.",
        ),
      },
      {
        type: "truefalse",
        difficulty: "easy",
        statement: L(
          "Algiers became an important Mediterranean center during the Ottoman period.",
          "Alger devint un centre méditerranéen important pendant la période ottomane.",
          "أصبحت مدينة الجزائر مركزًا متوسطيًا مهمًا في العهد العثماني.",
        ),
        answer: true,
        explanation: L(
          "Algiers became a major political and maritime center during Ottoman rule.",
          "Alger devint un grand centre politique et maritime sous la domination ottomane.",
          "أصبحت الجزائر مركزًا سياسيًا وبحريًا كبيرًا في عهد العثمانيين.",
        ),
      },
      {
        type: "whoami",
        difficulty: "easy",
        clues: [
          L(
            "I was one of the Barbarossa brothers linked to Ottoman power in Algeria.",
            "J'étais l'un des frères Barberousse liés à la puissance ottomane en Algérie.",
            "كنت أحد الأخوين بربروس المرتبطَين بالنفوذ العثماني في الجزائر.",
          ),
        ],
        options: [
          L("Aruj Barbarossa", "Arudj Barberousse", "عروج بربروس"),
          L("Jugurtha", "Jugurtha", "يوغرطة"),
          L("Emir Abdelkader", "Émir Abdelkader", "الأمير عبد القادر"),
          L("Ibn Khaldun", "Ibn Khaldoun", "ابن خلدون"),
        ],
        answerIndex: 0,
        explanation: L(
          "Aruj Barbarossa helped establish Ottoman power in Algeria.",
          "Arudj Barberousse a contribué à instaurer la puissance ottomane en Algérie.",
          "ساهم عروج بربروس في ترسيخ النفوذ العثماني في الجزائر.",
        ),
      },
      {
        type: "mcq",
        difficulty: "easy",
        question: L(
          "What year did Ottoman Algeria end?",
          "En quelle année l'Algérie ottomane prit-elle fin ?",
          "في أي سنة انتهت الجزائر العثمانية؟",
        ),
        options: [
          L("1516", "1516", "1516"),
          L("1700", "1700", "1700"),
          L("1830", "1830", "1830"),
          L("1954", "1954", "1954"),
        ],
        answerIndex: 2,
        explanation: L(
          "Ottoman rule ended when France invaded Algeria in 1830.",
          "Le règne ottoman prit fin avec l'invasion française de l'Algérie en 1830.",
          "انتهى الحكم العثماني مع الغزو الفرنسي للجزائر سنة 1830.",
        ),
      },
      {
        type: "mcq",
        difficulty: "easy",
        question: L(
          "What city was the center of Ottoman Algeria?",
          "Quelle ville était le centre de l'Algérie ottomane ?",
          "ما المدينة التي كانت مركز الجزائر العثمانية؟",
        ),
        options: [
          L("Oran", "Oran", "وهران"),
          L("Constantine", "Constantine", "قسنطينة"),
          L("Algiers", "Alger", "مدينة الجزائر"),
          L("Tlemcen", "Tlemcen", "تلمسان"),
        ],
        answerIndex: 2,
        explanation: L(
          "Algiers was the capital and political center of Ottoman Algeria.",
          "Alger était la capitale et le centre politique de l'Algérie ottomane.",
          "كانت مدينة الجزائر العاصمة والمركز السياسي للجزائر العثمانية.",
        ),
      },
      {
        type: "truefalse",
        difficulty: "medium",
        statement: L(
          "Ottoman Algeria was completely isolated from Mediterranean trade.",
          "L'Algérie ottomane était totalement isolée du commerce méditerranéen.",
          "كانت الجزائر العثمانية معزولة تمامًا عن التجارة المتوسطية.",
        ),
        answer: false,
        explanation: L(
          "Ottoman Algeria was deeply connected to Mediterranean trade and conflict.",
          "L'Algérie ottomane était profondément liée au commerce et aux conflits méditerranéens.",
          "كانت الجزائر العثمانية مرتبطة بعمق بتجارة وصراعات البحر الأبيض المتوسط.",
        ),
      },
      {
        type: "whoami",
        difficulty: "medium",
        clues: [
          L(
            "I was a later defender of eastern Algeria against French conquest.",
            "Je fus un défenseur tardif de l'est de l'Algérie face à la conquête française.",
            "كنت من المدافعين المتأخرين عن شرق الجزائر في وجه الغزو الفرنسي.",
          ),
        ],
        options: [
          L("Ahmed Bey of Constantine", "Ahmed Bey de Constantine", "أحمد باي قسنطينة"),
          L("Massinissa", "Massinissa", "ماسينيسا"),
          L("Ben Bella", "Ben Bella", "بن بلة"),
          L("Didouche Mourad", "Didouche Mourad", "ديدوش مراد"),
        ],
        answerIndex: 0,
        explanation: L(
          "Ahmed Bey resisted French expansion in Constantine after 1830.",
          "Ahmed Bey résista à l'expansion française à Constantine après 1830.",
          "قاوم أحمد باي التوسع الفرنسي في قسنطينة بعد 1830.",
        ),
      },
      {
        type: "mcq",
        difficulty: "medium",
        question: L(
          "What was Ottoman Algeria often called politically?",
          "Comment l'Algérie ottomane était-elle souvent désignée politiquement ?",
          "بماذا كانت الجزائر العثمانية تُوصف سياسيًا في الغالب؟",
        ),
        options: [
          L("A republic", "Une république", "جمهورية"),
          L("A regency", "Une régence", "إيالة"),
          L("A kingdom", "Un royaume", "مملكة"),
          L("A colony", "Une colonie", "مستعمرة"),
        ],
        answerIndex: 1,
        explanation: L(
          "Ottoman Algeria was governed as a regency linked to the Ottoman Empire.",
          "L'Algérie ottomane était gouvernée comme une régence liée à l'Empire ottoman.",
          "كانت الجزائر تُحكم كإيالة مرتبطة بالدولة العثمانية.",
        ),
      },
      {
        type: "truefalse",
        difficulty: "easy",
        statement: L(
          "The Barbarossa brothers played a role in the rise of Ottoman Algeria.",
          "Les frères Barberousse ont joué un rôle dans l'essor de l'Algérie ottomane.",
          "لعب الأخوان بربروس دورًا في صعود الجزائر العثمانية.",
        ),
        answer: true,
        explanation: L(
          "The Barbarossa brothers were central to establishing Ottoman authority in Algiers.",
          "Les frères Barberousse furent centraux dans l'instauration de l'autorité ottomane à Alger.",
          "كان الأخوان بربروس محوريَّين في ترسيخ السلطة العثمانية في الجزائر.",
        ),
      },
      {
        type: "whoami",
        difficulty: "medium",
        clues: [
          L(
            "I became known across the Mediterranean through naval and military power.",
            "Je suis devenu célèbre en Méditerranée par la puissance navale et militaire.",
            "اشتهرت في البحر الأبيض المتوسط بالقوة البحرية والعسكرية.",
          ),
        ],
        options: [
          L("Hayreddin Barbarossa", "Khayreddine Barberousse", "خير الدين بربروس"),
          L("Saint Augustine", "Saint Augustin", "القديس أوغسطين"),
          L("Ferhat Abbas", "Ferhat Abbas", "فرحات عباس"),
          L("Mouloud Feraoun", "Mouloud Feraoun", "مولود فرعون"),
        ],
        answerIndex: 0,
        explanation: L(
          "Hayreddin Barbarossa became one of the most famous Ottoman naval leaders.",
          "Khayreddine Barberousse devint l'un des plus célèbres chefs navals ottomans.",
          "أصبح خير الدين بربروس من أشهر القادة البحريين العثمانيين.",
        ),
      },
      {
        type: "mcq",
        difficulty: "medium",
        question: L(
          "Why is the Ottoman era important in Algerian history?",
          "Pourquoi l'ère ottomane est-elle importante dans l'histoire algérienne ?",
          "لماذا تُعدّ الحقبة العثمانية مهمة في تاريخ الجزائر؟",
        ),
        options: [
          L(
            "It was a period with no government",
            "C'était une période sans gouvernement",
            "كانت فترة بلا حكومة",
          ),
          L(
            "It linked Algeria to Mediterranean politics and trade",
            "Elle a lié l'Algérie à la politique et au commerce méditerranéens",
            "ربطت الجزائر بسياسة وتجارة البحر الأبيض المتوسط",
          ),
          L("It ended Roman rule", "Elle a mis fin au règne romain", "أنهت الحكم الروماني"),
          L(
            "It began the War of Independence",
            "Elle a commencé la guerre d'indépendance",
            "بدأت حرب الاستقلال",
          ),
        ],
        answerIndex: 1,
        explanation: L(
          "The Ottoman era helps explain Algeria's political and strategic importance before colonization.",
          "L'ère ottomane explique l'importance politique et stratégique de l'Algérie avant la colonisation.",
          "تُساعد الحقبة العثمانية في فهم أهمية الجزائر السياسية والاستراتيجية قبل الاستعمار.",
        ),
      },
      {
        type: "truefalse",
        difficulty: "medium",
        statement: L(
          "French colonization began after an existing political order was already in place in Algeria.",
          "La colonisation française a commencé alors qu'un ordre politique existait déjà en Algérie.",
          "بدأ الاستعمار الفرنسي بينما كان هناك نظام سياسي قائم بالفعل في الجزائر.",
        ),
        answer: true,
        explanation: L(
          "France invaded an Algeria that already had institutions, rulers, and a political structure.",
          "La France envahit une Algérie qui possédait déjà des institutions, des dirigeants et une structure politique.",
          "غزت فرنسا الجزائر وكانت لها مؤسسات وحكام وبنية سياسية قائمة.",
        ),
      },
    ],
  },

  // ============================================================
  // 5) FRENCH COLONIZATION
  // ============================================================
  {
    id: "french",
    title: L("French Colonization", "Colonisation française", "الاستعمار الفرنسي"),
    dateRange: "1830 – 1962",
    emoji: "⚓",
    summary: L(
      "On a summer day in 1830, French ships appeared off Algiers — and stayed for 132 years. Lands were taken, voices silenced, and yet resistance burned on, from Emir Abdelkader's desert campaigns to the mountain stand of Lalla Fatma N'Soumer.",
      "Un jour d'été 1830, les navires français parurent devant Alger — et restèrent 132 ans. Terres confisquées, voix réduites au silence, mais la résistance perdura, de l'Émir Abdelkader à Lalla Fatma N'Soumer.",
      "في صيف 1830، ظهرت السفن الفرنسية أمام الجزائر، وبقيت 132 عامًا. صودرت الأراضي وأُسكتت الأصوات، لكن المقاومة استمرت من حملات الأمير عبد القادر إلى صمود لالة فاطمة نسومر في الجبال.",
    ),
    figures: [
      {
        name: L("Emir Abdelkader", "Émir Abdelkader", "الأمير عبد القادر"),
        note: L(
          "Leader of early resistance, respected even by enemies.",
          "Chef de la première résistance, respecté même par ses ennemis.",
          "قائد المقاومة الأولى، احترمه حتى أعداؤه.",
        ),
      },
      {
        name: L("Lalla Fatma N'Soumer", "Lalla Fatma N'Soumer", "لالة فاطمة نسومر"),
        note: L(
          "Heroine who led resistance in Kabylia.",
          "Héroïne de la résistance en Kabylie.",
          "بطلة قادت المقاومة في القبائل.",
        ),
      },
    ],
    places: [
      {
        name: L("Algiers", "Alger", "الجزائر العاصمة"),
        note: L(
          "The capital, taken by French forces in 1830.",
          "Capitale prise par les Français en 1830.",
          "العاصمة التي سقطت عام 1830.",
        ),
      },
      {
        name: L("Constantine", "Constantine", "قسنطينة"),
        note: L(
          "Site of fierce battles against the conquest.",
          "Lieu de batailles acharnées contre la conquête.",
          "موقع معارك ضارية ضد الغزو.",
        ),
      },
    ],
    facts: [
      L(
        "Emir Abdelkader is honored with a statue in Damascus and even a town in the USA.",
        "L'Émir Abdelkader a une statue à Damas et une ville à son nom aux États-Unis.",
        "للأمير عبد القادر تمثال في دمشق وبلدة باسمه في الولايات المتحدة.",
      ),
      L(
        "Algeria was treated as part of France itself — not a typical colony.",
        "L'Algérie fut traitée comme partie intégrante de la France.",
        "عُومِلت الجزائر كجزء من فرنسا لا كمستعمرة عادية.",
      ),
      L(
        "Emir Abdelkader once saved thousands of Christians from massacre in Damascus in 1860.",
        "L'Émir Abdelkader sauva des milliers de chrétiens à Damas en 1860.",
        "أنقذ الأمير عبد القادر آلاف المسيحيين من مجزرة في دمشق عام 1860.",
      ),
      L(
        "Lalla Fatma N'Soumer was only in her twenties when she led mountain warriors.",
        "Lalla Fatma N'Soumer avait à peine vingt ans à la tête de ses guerriers.",
        "كانت لالة فاطمة في العشرينات حين قادت محاربي الجبال.",
      ),
      L(
        "On May 8, 1945, victory celebrations in Sétif turned into one of Algeria's darkest days.",
        "Le 8 mai 1945, les célébrations à Sétif tournèrent au massacre.",
        "في 8 ماي 1945 تحوّلت احتفالات النصر في سطيف إلى مجزرة.",
      ),
      L(
        "French settlers were called 'pieds-noirs' — many had never seen France.",
        "Les colons français étaient appelés « pieds-noirs ».",
        "كان المستوطنون يُسمّون 'الأقدام السوداء' وكثير منهم لم يرَ فرنسا.",
      ),
      L(
        "By 1954, Algeria had three French départements, like Paris or Marseille.",
        "Vers 1954, l'Algérie comptait trois départements français.",
        "بحلول 1954 كانت الجزائر مقسّمة إلى ثلاث ولايات فرنسية.",
      ),
      L(
        "Schools under colonial rule taught mostly in French, limiting Arabic and Berber.",
        "L'école coloniale enseignait surtout en français.",
        "كانت المدارس تدرّس بالفرنسية أساسًا، وتُحجّم العربية والأمازيغية.",
      ),
    ],
    badge: L("Keeper of Memory", "Gardien de la mémoire", "حافظ الذاكرة"),
    quiz: [
      {
        type: "mcq",
        difficulty: "easy",
        question: L(
          "When did France invade Algiers?",
          "Quand la France envahit-elle Alger ?",
          "متى غزت فرنسا الجزائر؟",
        ),
        options: [
          L("1789", "1789", "1789"),
          L("1830", "1830", "1830"),
          L("1871", "1871", "1871"),
          L("1900", "1900", "1900"),
        ],
        answerIndex: 1,
        explanation: L(
          "French troops landed near Algiers in June 1830.",
          "Les troupes françaises débarquèrent près d'Alger en juin 1830.",
          "نزلت القوات الفرنسية قرب الجزائر في جوان 1830.",
        ),
      },
      {
        type: "mcq",
        difficulty: "easy",
        question: L(
          "Who led the great early resistance against the French?",
          "Qui mena la première grande résistance ?",
          "من قاد المقاومة الكبرى الأولى ضد الفرنسيين؟",
        ),
        options: [
          L("Ben Bella", "Ben Bella", "بن بلة"),
          L("Emir Abdelkader", "Émir Abdelkader", "الأمير عبد القادر"),
          L("Boumediene", "Boumediène", "بومدين"),
          L("Massinissa", "Massinissa", "ماسينيسا"),
        ],
        answerIndex: 1,
        explanation: L(
          "Emir Abdelkader led a 15-year resistance from 1832.",
          "L'Émir Abdelkader résista 15 ans à partir de 1832.",
          "قاد الأمير عبد القادر مقاومة 15 عامًا منذ 1832.",
        ),
      },
      {
        type: "mcq",
        difficulty: "easy",
        question: L(
          "Lalla Fatma N'Soumer led resistance in which region?",
          "Dans quelle région Lalla Fatma N'Soumer résista-t-elle ?",
          "في أي منطقة قاومت لالة فاطمة نسومر؟",
        ),
        options: [
          L("Sahara", "Sahara", "الصحراء"),
          L("Kabylia", "Kabylie", "القبائل"),
          L("Oran", "Oran", "وهران"),
          L("Tlemcen", "Tlemcen", "تلمسان"),
        ],
        answerIndex: 1,
        explanation: L(
          "She rallied villages in the Djurdjura mountains of Kabylia.",
          "Elle rassembla les villages du Djurdjura.",
          "حشدت قرى جبال جرجرة في القبائل.",
        ),
      },
      {
        type: "mcq",
        difficulty: "easy",
        question: L(
          "Which Algerian city was the first to fall to French forces in 1830?",
          "Quelle ville tomba la première en 1830 ?",
          "أي مدينة جزائرية سقطت أولى عام 1830؟",
        ),
        options: [
          L("Oran", "Oran", "وهران"),
          L("Constantine", "Constantine", "قسنطينة"),
          L("Algiers", "Alger", "الجزائر العاصمة"),
          L("Tlemcen", "Tlemcen", "تلمسان"),
        ],
        answerIndex: 2,
        explanation: L(
          "Algiers fell first, opening the path to wider conquest.",
          "Alger tomba la première, ouvrant la voie à la conquête.",
          "سقطت الجزائر العاصمة أولى ففُتح الطريق للغزو.",
        ),
      },
      {
        type: "mcq",
        difficulty: "medium",
        question: L(
          "What tragic event occurred on May 8, 1945 in Algeria?",
          "Quel événement tragique eut lieu le 8 mai 1945 ?",
          "ما الحدث المأساوي في 8 ماي 1945؟",
        ),
        options: [
          L("Independence Day", "Jour de l'indépendance", "يوم الاستقلال"),
          L("Sétif and Guelma massacres", "Massacres de Sétif et Guelma", "مجازر سطيف وقالمة"),
          L("Battle of Algiers", "Bataille d'Alger", "معركة الجزائر"),
          L("End of WWI", "Fin de la 1re GM", "نهاية الحرب العالمية الأولى"),
        ],
        answerIndex: 1,
        explanation: L(
          "Peaceful marches were met with deadly repression.",
          "Des marches pacifiques furent réprimées dans le sang.",
          "قُمعت مسيرات سلمية بدمويّة.",
        ),
      },
      {
        type: "mcq",
        difficulty: "medium",
        question: L(
          "Roughly how long did French colonization of Algeria last?",
          "Combien de temps dura la colonisation française ?",
          "كم استمر الاستعمار الفرنسي تقريبًا؟",
        ),
        options: [
          L("50 years", "50 ans", "50 سنة"),
          L("80 years", "80 ans", "80 سنة"),
          L("Over 130 years", "Plus de 130 ans", "أكثر من 130 سنة"),
          L("200 years", "200 ans", "200 سنة"),
        ],
        answerIndex: 2,
        explanation: L(
          "From 1830 to 1962 — 132 years.",
          "De 1830 à 1962, 132 ans.",
          "من 1830 إلى 1962 أي 132 سنة.",
        ),
      },
      {
        type: "mcq",
        difficulty: "medium",
        question: L(
          "What were the French settlers in Algeria commonly called?",
          "Comment appelait-on les colons français ?",
          "ماذا كان يُسمى المستوطنون الفرنسيون؟",
        ),
        options: [
          L("Colons", "Colons", "مستوطنون"),
          L("Pieds-noirs", "Pieds-noirs", "الأقدام السوداء"),
          L("Harkis", "Harkis", "الحركى"),
          L("Zouaves", "Zouaves", "الزواف"),
        ],
        answerIndex: 1,
        explanation: L(
          "'Pieds-noirs' referred to European settlers in Algeria.",
          "« Pieds-noirs » désignait les colons européens.",
          "كان لقب 'الأقدام السوداء' يُطلق على المستوطنين الأوروبيين.",
        ),
      },
      {
        type: "mcq",
        difficulty: "hard",
        question: L(
          "By the 1950s, Algeria was officially organized into how many French départements?",
          "En combien de départements l'Algérie était-elle divisée ?",
          "إلى كم ولاية فرنسية قُسّمت الجزائر بحلول الخمسينيات؟",
        ),
        options: [
          L("One", "Un", "واحدة"),
          L("Two", "Deux", "اثنتان"),
          L("Three", "Trois", "ثلاث"),
          L("Five", "Cinq", "خمس"),
        ],
        answerIndex: 2,
        explanation: L(
          "Algeria was divided into three French départements before independence.",
          "Trois départements français avant l'indépendance.",
          "ثلاث ولايات فرنسية قبل الاستقلال.",
        ),
      },
      {
        type: "mcq",
        difficulty: "hard",
        question: L(
          "Under colonial rule, schools in Algeria mainly taught in which language?",
          "Quelle langue enseignait surtout l'école coloniale ?",
          "بأي لغة كانت مدارس الاستعمار تدرّس أساسًا؟",
        ),
        options: [
          L("Arabic", "Arabe", "العربية"),
          L("Berber", "Berbère", "الأمازيغية"),
          L("French", "Français", "الفرنسية"),
          L("English", "Anglais", "الإنجليزية"),
        ],
        answerIndex: 2,
        explanation: L(
          "Colonial education was largely in French, limiting Arabic and Berber.",
          "L'enseignement colonial était surtout en français.",
          "كان التعليم بالفرنسية أساسًا.",
        ),
      },
      {
        type: "truefalse",
        difficulty: "easy",
        statement: L(
          "France treated Algeria as an integral part of France, not a typical colony.",
          "La France considérait l'Algérie comme partie intégrante d'elle-même.",
          "اعتبرت فرنسا الجزائر جزءًا منها لا مستعمرة عادية.",
        ),
        answer: true,
        explanation: L(
          "Algeria was officially organized into French départements.",
          "L'Algérie fut organisée en départements français.",
          "نُظّمت الجزائر رسميًا في ولايات فرنسية.",
        ),
      },
      {
        type: "truefalse",
        difficulty: "easy",
        statement: L(
          "There is a town named after Emir Abdelkader in the United States.",
          "Une ville américaine porte le nom de l'Émir Abdelkader.",
          "هناك بلدة في الولايات المتحدة سُمّيت باسم الأمير عبد القادر.",
        ),
        answer: true,
        explanation: L(
          "Elkader, Iowa was named in his honor in 1846.",
          "Elkader (Iowa) fut nommée en son honneur en 1846.",
          "سُمّيت بلدة إلكيدر بولاية أيوا تكريمًا له عام 1846.",
        ),
      },
      {
        type: "truefalse",
        difficulty: "medium",
        statement: L(
          "Lalla Fatma N'Soumer led her resistance from the Sahara desert.",
          "Lalla Fatma N'Soumer combattit dans le Sahara.",
          "قادت لالة فاطمة نسومر مقاومتها من الصحراء.",
        ),
        answer: false,
        explanation: L(
          "She fought in the Djurdjura mountains of Kabylia.",
          "Elle combattit dans le Djurdjura, en Kabylie.",
          "بل قاتلت في جبال جرجرة بمنطقة القبائل.",
        ),
      },
      {
        type: "truefalse",
        difficulty: "medium",
        statement: L(
          "Emir Abdelkader eventually surrendered and lived the rest of his life in exile.",
          "L'Émir Abdelkader finit par se rendre et vécut en exil.",
          "استسلم الأمير عبد القادر في النهاية وعاش في المنفى.",
        ),
        answer: true,
        explanation: L(
          "He spent his final years in Damascus, where he is still honored.",
          "Il passa ses dernières années à Damas.",
          "قضى آخر سنواته في دمشق حيث لا يزال مكرّمًا.",
        ),
      },
      {
        type: "truefalse",
        difficulty: "hard",
        statement: L(
          "Large amounts of farmland were taken from Algerians and given to settlers.",
          "Beaucoup de terres furent confisquées au profit des colons.",
          "صودرت أراض زراعية واسعة وأُعطيت للمستوطنين.",
        ),
        answer: true,
        explanation: L(
          "Land seizures pushed many Algerian families into poverty.",
          "Ces saisies plongèrent de nombreuses familles dans la pauvreté.",
          "أوقعت المصادرات كثيرًا من العائلات في الفقر.",
        ),
      },
      {
        type: "whoami",
        difficulty: "easy",
        clues: [
          L(
            "I led the early resistance against the French invasion.",
            "J'ai mené la première résistance contre l'invasion.",
            "قدت المقاومة الأولى ضد الغزو الفرنسي.",
          ),
          L(
            "Even my enemies respected my honor.",
            "Même mes ennemis respectaient mon honneur.",
            "حتى أعدائي احترموا شرفي.",
          ),
          L(
            "A statue of me stands in Damascus.",
            "Une statue de moi se dresse à Damas.",
            "لي تمثال في دمشق.",
          ),
        ],
        options: [
          L("Ben Bella", "Ben Bella", "بن بلة"),
          L("Emir Abdelkader", "Émir Abdelkader", "الأمير عبد القادر"),
          L("Boumediene", "Boumediène", "بومدين"),
          L("Messali Hadj", "Messali Hadj", "مصالي الحاج"),
        ],
        answerIndex: 1,
        explanation: L(
          "Emir Abdelkader — leader, scholar, and symbol of dignity.",
          "L'Émir Abdelkader, chef, savant et symbole de dignité.",
          "الأمير عبد القادر قائد وعالم ورمز للكرامة.",
        ),
      },
      {
        type: "whoami",
        difficulty: "medium",
        clues: [
          L("I am a heroine of Kabylia.", "Je suis une héroïne de Kabylie.", "أنا بطلة من القبائل."),
          L(
            "I led resistance against French forces in the mountains.",
            "Je résistai aux Français dans les montagnes.",
            "قاومت الفرنسيين في الجبال.",
          ),
          L(
            "I am sometimes called the 'Joan of Arc of Djurdjura'.",
            "On m'appelle parfois la « Jeanne d'Arc du Djurdjura ».",
            "يُلقّبني البعض بـ'جان دارك جرجرة'.",
          ),
        ],
        options: [
          L("Djamila Bouhired", "Djamila Bouhired", "جميلة بوحيرد"),
          L("Lalla Fatma N'Soumer", "Lalla Fatma N'Soumer", "لالة فاطمة نسومر"),
          L("Hassiba Ben Bouali", "Hassiba Ben Bouali", "حسيبة بن بوعلي"),
          L("Kahina", "Kahina", "الكاهنة"),
        ],
        answerIndex: 1,
        explanation: L(
          "Lalla Fatma N'Soumer led resistance in the 1850s.",
          "Lalla Fatma N'Soumer résista dans les années 1850.",
          "قادت لالة فاطمة نسومر المقاومة في الخمسينيات من القرن 19.",
        ),
      },
      {
        type: "whoami",
        difficulty: "hard",
        clues: [
          L(
            "I founded an early Algerian nationalist movement.",
            "J'ai fondé un mouvement nationaliste algérien.",
            "أسست حركة وطنية جزائرية مبكرة.",
          ),
          L(
            "I am known as the 'father of Algerian nationalism'.",
            "On m'appelle le « père du nationalisme algérien ».",
            "أُعرف بـ'أبي الوطنية الجزائرية'.",
          ),
          L("My name is Messali…", "Je m'appelle Messali…", "اسمي مصالي…"),
        ],
        options: [
          L("Messali Hadj", "Messali Hadj", "مصالي الحاج"),
          L("Ferhat Abbas", "Ferhat Abbas", "فرحات عباس"),
          L("Ben Bella", "Ben Bella", "بن بلة"),
          L("Boumediene", "Boumediène", "بومدين"),
        ],
        answerIndex: 0,
        explanation: L(
          "Messali Hadj founded the PPA and inspired generations.",
          "Messali Hadj fonda le PPA et inspira des générations.",
          "أسس مصالي الحاج حزب الشعب وألهم أجيالًا.",
        ),
      },
      {
        type: "whoami",
        difficulty: "hard",
        clues: [
          L(
            "I am a moderate Algerian leader who pushed for reform.",
            "Je suis un leader algérien modéré, partisan de réformes.",
            "أنا قائد جزائري معتدل دعا للإصلاح.",
          ),
          L(
            "I later became the first president of the provisional government in 1958.",
            "Je devins président du GPRA en 1958.",
            "صرت أول رئيس للحكومة المؤقتة عام 1958.",
          ),
          L("My name is Ferhat…", "Je m'appelle Ferhat…", "اسمي فرحات…"),
        ],
        options: [
          L("Ferhat Abbas", "Ferhat Abbas", "فرحات عباس"),
          L("Messali Hadj", "Messali Hadj", "مصالي الحاج"),
          L("Ben Bella", "Ben Bella", "بن بلة"),
          L("Boumediene", "Boumediène", "بومدين"),
        ],
        answerIndex: 0,
        explanation: L(
          "Ferhat Abbas led early political resistance and the GPRA in exile.",
          "Ferhat Abbas mena la résistance politique et le GPRA.",
          "قاد فرحات عباس المقاومة السياسية والحكومة المؤقتة.",
        ),
      },
      {
        type: "order",
        difficulty: "hard",
        prompt: L(
          "Place these colonial-era events in order.",
          "Ordonnez ces événements coloniaux.",
          "رتّب هذه الأحداث الاستعمارية.",
        ),
        items: [
          {
            id: "invade",
            label: L("France invades Algiers", "La France envahit Alger", "غزو فرنسا للجزائر"),
            hint: L("1830", "1830", "1830"),
          },
          {
            id: "fatma",
            label: L(
              "Resistance of Lalla Fatma N'Soumer",
              "Résistance de Lalla Fatma N'Soumer",
              "مقاومة لالة فاطمة نسومر",
            ),
            hint: L("1850s", "Années 1850", "خمسينيات القرن 19"),
          },
          {
            id: "setif",
            label: L(
              "Sétif and Guelma massacres",
              "Massacres de Sétif et Guelma",
              "مجازر سطيف وقالمة",
            ),
            hint: L("May 1945", "Mai 1945", "ماي 1945"),
          },
        ],
      },
    ],
  },

  // ============================================================
  // 5) WAR OF INDEPENDENCE
  // ============================================================
  {
    id: "independence",
    title: L("War of Independence", "Guerre d'indépendance", "حرب الاستقلال"),
    dateRange: "1954 – 1962",
    emoji: "🕊️",
    summary: L(
      "Just after midnight on November 1, 1954, gunfire echoed through the Aurès Mountains — the FLN had risen. Eight years of sacrifice followed, until on July 5, 1962, Algeria stood free at last.",
      "Aux premières heures du 1er novembre 1954, les coups de feu résonnèrent dans les Aurès — le FLN s'était soulevé. Huit ans de sacrifices plus tard, le 5 juillet 1962, l'Algérie devint libre.",
      "في فجر الفاتح من نوفمبر 1954، دوّى الرصاص في جبال الأوراس — انطلقت ثورة جبهة التحرير. وبعد ثماني سنوات من التضحيات، نالت الجزائر استقلالها في 5 جويلية 1962.",
    ),
    figures: [
      {
        name: L("Larbi Ben M'hidi", "Larbi Ben M'hidi", "العربي بن مهيدي"),
        note: L(
          "Heroic leader of the Battle of Algiers.",
          "Chef héroïque de la Bataille d'Alger.",
          "قائد بطولي لمعركة الجزائر.",
        ),
      },
      {
        name: L("Djamila Bouhired", "Djamila Bouhired", "جميلة بوحيرد"),
        note: L(
          "Young revolutionary and symbol of resistance.",
          "Jeune révolutionnaire, symbole de la résistance.",
          "ثورية شابة ورمز للمقاومة.",
        ),
      },
    ],
    places: [
      {
        name: L("Casbah of Algiers", "Casbah d'Alger", "قصبة الجزائر"),
        note: L(
          "Heart of the urban resistance.",
          "Cœur de la résistance urbaine.",
          "قلب المقاومة الحضرية.",
        ),
      },
      {
        name: L("Aurès Mountains", "Aurès", "جبال الأوراس"),
        note: L(
          "Where the revolution's first shots were fired.",
          "Là où la révolution éclata.",
          "حيث انطلقت رصاصات الثورة الأولى.",
        ),
      },
    ],
    facts: [
      L(
        "The revolution began with coordinated attacks on November 1, 1954 — 'Toussaint Rouge'.",
        "La révolution éclata le 1er novembre 1954 — la « Toussaint rouge ».",
        "انطلقت الثورة بهجمات منسّقة في أول نوفمبر 1954.",
      ),
      L(
        "Independence Day is celebrated every July 5th across Algeria.",
        "L'indépendance est célébrée chaque 5 juillet.",
        "يُحتفل بعيد الاستقلال كل 5 جويلية.",
      ),
      L(
        "The film 'The Battle of Algiers' (1966) is still studied in military academies.",
        "Le film « La Bataille d'Alger » est encore étudié dans les écoles militaires.",
        "لا يزال فيلم 'معركة الجزائر' يُدرَّس في كليات الحرب.",
      ),
      L(
        "Women fighters carried messages and bombs through the Casbah.",
        "Les combattantes portaient messages et bombes dans la Casbah.",
        "حملت المناضلات الرسائل والقنابل في أزقة القصبة.",
      ),
      L(
        "The FLN's green-and-white flag with a red crescent and star became Algeria's symbol.",
        "Le drapeau vert et blanc à étoile rouge devint celui de l'Algérie libre.",
        "صار العلم الأخضر والأبيض بهلال ونجمة حمراوين رمز الجزائر الحرة.",
      ),
      L(
        "Ahmed Ben Bella became Algeria's first president after independence.",
        "Ahmed Ben Bella devint le premier président.",
        "أصبح أحمد بن بلة أول رئيس للجزائر بعد الاستقلال.",
      ),
      L(
        "July 5 was chosen — exactly 132 years after French troops landed in 1830.",
        "Le 5 juillet — 132 ans jour pour jour après le débarquement français.",
        "اختير 5 جويلية بعد 132 عامًا تمامًا من الإنزال الفرنسي.",
      ),
      L(
        "The war shaped how the world thought about decolonization.",
        "La guerre changea la pensée mondiale sur la décolonisation.",
        "غيّرت الحرب نظرة العالم إلى التحرّر من الاستعمار.",
      ),
    ],
    badge: L("Champion of Liberty", "Champion de la liberté", "بطل الحرية"),
    quiz: [
      {
        type: "mcq",
        difficulty: "easy",
        question: L(
          "When did the Algerian revolution begin?",
          "Quand la révolution algérienne commença-t-elle ?",
          "متى بدأت الثورة الجزائرية؟",
        ),
        options: [
          L("July 5, 1962", "5 juillet 1962", "5 جويلية 1962"),
          L("November 1, 1954", "1er novembre 1954", "أول نوفمبر 1954"),
          L("March 19, 1962", "19 mars 1962", "19 مارس 1962"),
          L("May 8, 1945", "8 mai 1945", "8 ماي 1945"),
        ],
        answerIndex: 1,
        explanation: L(
          "The FLN launched 'Toussaint Rouge' on November 1, 1954.",
          "Le FLN lança la « Toussaint rouge ».",
          "أطلقت جبهة التحرير الثورة في أول نوفمبر 1954.",
        ),
      },
      {
        type: "mcq",
        difficulty: "easy",
        question: L(
          "Where were the first shots of the revolution fired?",
          "Où furent tirés les premiers coups de feu ?",
          "أين أُطلقت رصاصات الثورة الأولى؟",
        ),
        options: [
          L("Algiers", "Alger", "الجزائر العاصمة"),
          L("Oran", "Oran", "وهران"),
          L("Aurès Mountains", "Aurès", "جبال الأوراس"),
          L("Sahara", "Sahara", "الصحراء"),
        ],
        answerIndex: 2,
        explanation: L(
          "The Aurès region launched the armed struggle.",
          "Les Aurès lancèrent la lutte armée.",
          "انطلق الكفاح المسلح من الأوراس.",
        ),
      },
      {
        type: "mcq",
        difficulty: "easy",
        question: L(
          "When did Algeria gain independence?",
          "Quand l'Algérie devint-elle indépendante ?",
          "متى نالت الجزائر استقلالها؟",
        ),
        options: [
          L("1954", "1954", "1954"),
          L("1958", "1958", "1958"),
          L("1962", "1962", "1962"),
          L("1965", "1965", "1965"),
        ],
        answerIndex: 2,
        explanation: L(
          "Algeria became independent on July 5, 1962.",
          "L'Algérie devint indépendante le 5 juillet 1962.",
          "نالت الجزائر الاستقلال في 5 جويلية 1962.",
        ),
      },
      {
        type: "mcq",
        difficulty: "easy",
        question: L(
          "Which political movement led the Algerian War of Independence?",
          "Quel mouvement mena la guerre d'indépendance ?",
          "أي حركة سياسية قادت حرب الاستقلال؟",
        ),
        options: [
          L("FLN", "FLN", "جبهة التحرير الوطني"),
          L("OAS", "OAS", "OAS"),
          L("MNA", "MNA", "MNA"),
          L("PPA", "PPA", "PPA"),
        ],
        answerIndex: 0,
        explanation: L(
          "The Front de Libération Nationale (FLN) led the struggle.",
          "Le Front de Libération Nationale (FLN) mena la lutte.",
          "قادت جبهة التحرير الوطني (FLN) الكفاح.",
        ),
      },
      {
        type: "mcq",
        difficulty: "medium",
        question: L(
          "The famous urban battle of 1956–57 took place in which city?",
          "La célèbre bataille urbaine de 1956-57 eut lieu où ?",
          "في أي مدينة وقعت معركة 1956-1957 الشهيرة؟",
        ),
        options: [
          L("Oran", "Oran", "وهران"),
          L("Algiers", "Alger", "الجزائر العاصمة"),
          L("Constantine", "Constantine", "قسنطينة"),
          L("Annaba", "Annaba", "عنابة"),
        ],
        answerIndex: 1,
        explanation: L(
          "The Battle of Algiers played out in the streets of the Casbah.",
          "La Bataille d'Alger se déroula dans la Casbah.",
          "دارت معركة الجزائر في أزقة القصبة.",
        ),
      },
      {
        type: "mcq",
        difficulty: "medium",
        question: L(
          "What treaty officially ended the war in March 1962?",
          "Quel traité mit fin à la guerre en mars 1962 ?",
          "أي اتفاقية أنهت الحرب رسميًا في مارس 1962؟",
        ),
        options: [
          L("Treaty of Paris", "Traité de Paris", "معاهدة باريس"),
          L("Évian Accords", "Accords d'Évian", "اتفاقيات إيفيان"),
          L("Treaty of Algiers", "Traité d'Alger", "معاهدة الجزائر"),
          L("Versailles Treaty", "Traité de Versailles", "معاهدة فرساي"),
        ],
        answerIndex: 1,
        explanation: L(
          "The Évian Accords paved the way for independence.",
          "Les accords d'Évian ouvrirent la voie à l'indépendance.",
          "مهّدت اتفاقيات إيفيان للاستقلال.",
        ),
      },
      {
        type: "mcq",
        difficulty: "medium",
        question: L(
          "What does 'FLN' stand for?",
          "Que signifie « FLN » ?",
          "ماذا تعني FLN؟",
        ),
        options: [
          L(
            "Front de Libération Nationale",
            "Front de Libération Nationale",
            "جبهة التحرير الوطني",
          ),
          L("Force Libre Nationale", "Force Libre Nationale", "القوة الحرة الوطنية"),
          L(
            "Fédération Libre de Nationalistes",
            "Fédération Libre de Nationalistes",
            "اتحاد القوميين الأحرار",
          ),
          L("Front Libéral du Nord", "Front Libéral du Nord", "الجبهة الليبرالية الشمالية"),
        ],
        answerIndex: 0,
        explanation: L(
          "Front de Libération Nationale — led Algeria to independence.",
          "Front de Libération Nationale.",
          "جبهة التحرير الوطني — قادت الجزائر للاستقلال.",
        ),
      },
      {
        type: "mcq",
        difficulty: "hard",
        question: L(
          "What do the colors of the Algerian flag include?",
          "Quelles sont les couleurs du drapeau algérien ?",
          "ما ألوان العلم الجزائري؟",
        ),
        options: [
          L("Black and yellow", "Noir et jaune", "أسود وأصفر"),
          L(
            "Green, white, and a red crescent and star",
            "Vert, blanc, croissant et étoile rouges",
            "أخضر وأبيض مع هلال ونجمة حمراوين",
          ),
          L("Blue, white, and red", "Bleu, blanc, rouge", "أزرق وأبيض وأحمر"),
          L("Red and gold only", "Rouge et or", "أحمر وذهبي فقط"),
        ],
        answerIndex: 1,
        explanation: L(
          "Green and white with a red crescent and star — the flag of free Algeria.",
          "Vert et blanc, croissant et étoile rouges.",
          "أخضر وأبيض مع هلال ونجمة حمراوين، علم الجزائر الحرة.",
        ),
      },
      {
        type: "mcq",
        difficulty: "hard",
        question: L(
          "Which two world powers pressured France during the war?",
          "Quelles deux puissances pressèrent la France ?",
          "أي قوتين عالميتين ضغطتا على فرنسا خلال الحرب؟",
        ),
        options: [
          L("UK and Japan", "Royaume-Uni et Japon", "بريطانيا واليابان"),
          L("USA and USSR", "USA et URSS", "الولايات المتحدة والاتحاد السوفيتي"),
          L("China and India", "Chine et Inde", "الصين والهند"),
          L("Germany and Italy", "Allemagne et Italie", "ألمانيا وإيطاليا"),
        ],
        answerIndex: 1,
        explanation: L(
          "Cold War rivals both pressured France toward decolonization.",
          "Les rivaux de la guerre froide poussèrent à la décolonisation.",
          "ضغط قطبا الحرب الباردة على فرنسا نحو إنهاء الاستعمار.",
        ),
      },
      {
        type: "truefalse",
        difficulty: "easy",
        statement: L(
          "Algeria celebrates its Independence Day on July 5th.",
          "L'Algérie fête l'indépendance le 5 juillet.",
          "تحتفل الجزائر باستقلالها في 5 جويلية.",
        ),
        answer: true,
        explanation: L(
          "July 5, 1962 marked the official independence.",
          "Le 5 juillet 1962 est la date officielle.",
          "5 جويلية 1962 هو تاريخ الاستقلال الرسمي.",
        ),
      },
      {
        type: "truefalse",
        difficulty: "easy",
        statement: L(
          "The Algerian War of Independence lasted roughly eight years.",
          "La guerre dura environ huit ans.",
          "استمرت حرب الاستقلال نحو ثماني سنوات.",
        ),
        answer: true,
        explanation: L(
          "From November 1954 to July 1962 — about 7.5 years.",
          "De novembre 1954 à juillet 1962.",
          "من نوفمبر 1954 إلى جويلية 1962.",
        ),
      },
      {
        type: "truefalse",
        difficulty: "medium",
        statement: L(
          "The revolution was led by a single charismatic president.",
          "La révolution fut menée par un seul président charismatique.",
          "قاد الثورة رئيس كاريزمي واحد.",
        ),
        answer: false,
        explanation: L(
          "It was led collectively by the FLN's revolutionary council.",
          "Elle fut menée collectivement par le conseil du FLN.",
          "بل قادها مجلس قيادة الثورة لجبهة التحرير جماعيًا.",
        ),
      },
      {
        type: "truefalse",
        difficulty: "medium",
        statement: L(
          "Algeria became independent peacefully, without armed struggle.",
          "L'Algérie devint indépendante pacifiquement.",
          "نالت الجزائر استقلالها سلميًا بلا كفاح مسلح.",
        ),
        answer: false,
        explanation: L(
          "Independence came after eight years of difficult armed struggle.",
          "L'indépendance vint après huit ans de lutte armée.",
          "جاء الاستقلال بعد ثماني سنوات من الكفاح المسلح.",
        ),
      },
      {
        type: "truefalse",
        difficulty: "hard",
        statement: L(
          "The film 'The Battle of Algiers' is still studied in military schools today.",
          "Le film « La Bataille d'Alger » est encore étudié.",
          "لا يزال فيلم 'معركة الجزائر' يُدرّس عسكريًا.",
        ),
        answer: true,
        explanation: L(
          "Released in 1966, it is famous for its realism and political insight.",
          "Sorti en 1966, célèbre pour son réalisme.",
          "أُنتج عام 1966 واشتهر بواقعيته السياسية.",
        ),
      },
      {
        type: "whoami",
        difficulty: "easy",
        clues: [
          L(
            "I was a leader of the Battle of Algiers.",
            "J'étais un chef de la Bataille d'Alger.",
            "كنت قائدًا في معركة الجزائر.",
          ),
          L(
            "I was captured and killed by French forces in 1957.",
            "Capturé et tué par les Français en 1957.",
            "أُسرت وقُتلت على يد الفرنسيين عام 1957.",
          ),
          L(
            "My calm courage became legendary.",
            "Mon courage calme devint légendaire.",
            "صار هدوئي وشجاعتي أسطورة.",
          ),
        ],
        options: [
          L("Ahmed Ben Bella", "Ahmed Ben Bella", "أحمد بن بلة"),
          L("Larbi Ben M'hidi", "Larbi Ben M'hidi", "العربي بن مهيدي"),
          L("Houari Boumediene", "Houari Boumediène", "هواري بومدين"),
          L("Krim Belkacem", "Krim Belkacem", "كريم بلقاسم"),
        ],
        answerIndex: 1,
        explanation: L(
          "Larbi Ben M'hidi — a hero of the Battle of Algiers.",
          "Larbi Ben M'hidi, héros de la Bataille d'Alger.",
          "العربي بن مهيدي بطل معركة الجزائر.",
        ),
      },
      {
        type: "whoami",
        difficulty: "medium",
        clues: [
          L(
            "I was a young woman fighter in the Casbah.",
            "Je fus une jeune combattante de la Casbah.",
            "كنت مناضلة شابة في القصبة.",
          ),
          L(
            "I was arrested, tortured, and condemned to death.",
            "Arrêtée, torturée, condamnée à mort.",
            "اعتُقلت وعُذّبت وحُكم عليّ بالإعدام.",
          ),
          L(
            "I became a global symbol of the revolution.",
            "Je devins un symbole mondial.",
            "صرت رمزًا عالميًا للثورة.",
          ),
        ],
        options: [
          L("Hassiba Ben Bouali", "Hassiba Ben Bouali", "حسيبة بن بوعلي"),
          L("Djamila Bouhired", "Djamila Bouhired", "جميلة بوحيرد"),
          L("Lalla Fatma N'Soumer", "Lalla Fatma N'Soumer", "لالة فاطمة نسومر"),
          L("Zohra Drif", "Zohra Drif", "زهرة ظريف"),
        ],
        answerIndex: 1,
        explanation: L(
          "Djamila Bouhired's trial drew worldwide attention.",
          "Le procès de Djamila Bouhired fit le tour du monde.",
          "أثارت محاكمة جميلة بوحيرد اهتمام العالم.",
        ),
      },
      {
        type: "whoami",
        difficulty: "hard",
        clues: [
          L(
            "I became Algeria's first president after independence.",
            "Je suis devenu premier président après l'indépendance.",
            "صرت أول رئيس للجزائر بعد الاستقلال.",
          ),
          L("I was a key FLN leader.", "Je fus un dirigeant clé du FLN.", "كنت قائدًا بارزًا في الجبهة."),
          L("My name is Ahmed…", "Je m'appelle Ahmed…", "اسمي أحمد…"),
        ],
        options: [
          L("Ahmed Ben Bella", "Ahmed Ben Bella", "أحمد بن بلة"),
          L("Houari Boumediene", "Houari Boumediène", "هواري بومدين"),
          L("Krim Belkacem", "Krim Belkacem", "كريم بلقاسم"),
          L("Ferhat Abbas", "Ferhat Abbas", "فرحات عباس"),
        ],
        answerIndex: 0,
        explanation: L(
          "Ahmed Ben Bella served as Algeria's first president.",
          "Ahmed Ben Bella, premier président de l'Algérie.",
          "أحمد بن بلة أول رئيس للجزائر.",
        ),
      },
      {
        type: "whoami",
        difficulty: "hard",
        clues: [
          L("I am the political movement that led Algeria's fight.", "Je suis le mouvement qui mena la lutte.", "أنا الحركة التي قادت الكفاح."),
          L("My initials are three letters.", "Mon sigle a trois lettres.", "اختصاري ثلاثة أحرف."),
          L(
            "I launched the November 1, 1954 revolution.",
            "J'ai lancé la révolution du 1er novembre 1954.",
            "أطلقت ثورة أول نوفمبر 1954.",
          ),
        ],
        options: [
          L("MNA", "MNA", "MNA"),
          L("PPA", "PPA", "PPA"),
          L("FLN", "FLN", "FLN"),
          L("OAS", "OAS", "OAS"),
        ],
        answerIndex: 2,
        explanation: L(
          "The FLN (Front de Libération Nationale) led the independence struggle.",
          "Le FLN mena la lutte pour l'indépendance.",
          "جبهة التحرير الوطني (FLN) قادت الكفاح.",
        ),
      },
      {
        type: "order",
        difficulty: "hard",
        prompt: L(
          "Order these moments of the War of Independence.",
          "Ordonnez ces moments de la guerre.",
          "رتّب لحظات حرب الاستقلال.",
        ),
        items: [
          {
            id: "toussaint",
            label: L(
              "Toussaint Rouge — revolution begins",
              "Toussaint rouge — début de la révolution",
              "أول نوفمبر — انطلاق الثورة",
            ),
            hint: L("Nov 1, 1954", "1er nov. 1954", "1 نوفمبر 1954"),
          },
          {
            id: "battle",
            label: L("Battle of Algiers", "Bataille d'Alger", "معركة الجزائر"),
            hint: L("1956–1957", "1956-1957", "1956-1957"),
          },
          {
            id: "evian",
            label: L("Évian Accords signed", "Accords d'Évian", "اتفاقيات إيفيان"),
            hint: L("March 1962", "Mars 1962", "مارس 1962"),
          },
          {
            id: "indep",
            label: L("Independence Day", "Indépendance", "يوم الاستقلال"),
            hint: L("July 5, 1962", "5 juillet 1962", "5 جويلية 1962"),
          },
        ],
      },
    ],
  },
];

// Daily facts: read English value (Header / Home reads via t() now).
export const dailyFacts: import("@/lib/i18n").LocalizedString[] = eras.flatMap((e) => e.facts);

// Dev-time data validation.
import { validateEras } from "@/lib/quiz";
if (false) {
  validateEras(eras);
}

import type { Localized, LocalizedString } from "@/lib/i18n";

const L = (en: string, fr: string, ar: string): Localized<string> => ({ en, fr, ar });

export type LessonText = {
  simple: LocalizedString;
  deeper: LocalizedString;
};

export type Lesson = {
  id: string;
  emoji: string;
  topic: LocalizedString;
  title: LocalizedString;
  facts: LessonText[]; // 2-3 short facts/paragraphs in two modes
  whyItMatters: LessonText;
  question: LocalizedString;
  era?: string; // optional related era id
  figureId?: string; // optional related figure id
};

export const lessons: Lesson[] = [
  {
    id: "sheshonq",
    emoji: "👑",
    topic: L("Ancient kings", "Rois antiques", "الملوك القدماء"),
    title: L("Sheshonq I — A Berber Pharaoh", "Sheshonq Ier — Un pharaon berbère", "شيشنق الأول — فرعون أمازيغي"),
    facts: [
      {
        simple: L(
          "Sheshonq I was a Berber chief who became pharaoh of Egypt around 945 BCE.",
          "Sheshonq Ier était un chef berbère devenu pharaon d'Égypte vers 945 av. J.-C.",
          "كان شيشنق الأول زعيمًا أمازيغيًا أصبح فرعونًا لمصر نحو 945 ق.م."
        ),
        deeper: L(
          "Sheshonq I founded Egypt's 22nd Dynasty around 945 BCE. His family came from Libyan-Berber tribes settled in the Nile Delta.",
          "Sheshonq Ier fonda la 22ᵉ dynastie d'Égypte vers 945 av. J.-C. Sa famille venait de tribus libyo-berbères installées dans le delta du Nil.",
          "أسّس شيشنق الأول الأسرة المصرية الثانية والعشرين نحو 945 ق.م، وتنحدر عائلته من قبائل ليبية-أمازيغية استقرت في دلتا النيل."
        ),
      },
      {
        simple: L(
          "He led a famous campaign into the lands of Israel and Judah.",
          "Il mena une célèbre campagne vers les royaumes d'Israël et de Juda.",
          "قاد حملة شهيرة نحو مملكتَي إسرائيل ويهوذا."
        ),
        deeper: L(
          "His campaign in the Levant is recorded both on the walls of Karnak temple and in the Hebrew Bible (where he is called Shishak).",
          "Sa campagne au Levant est gravée sur les murs du temple de Karnak et mentionnée dans la Bible hébraïque (où il est appelé Shishaq).",
          "حملته في بلاد الشام مدوّنة على جدران معبد الكرنك ومذكورة في التوراة باسم شيشاق."
        ),
      },
    ],
    whyItMatters: {
      simple: L(
        "He shows that ancient North African peoples played a big role far beyond their region.",
        "Il montre que les peuples nord-africains anciens ont joué un grand rôle bien au-delà de leur région.",
        "يُظهر أن شعوب شمال إفريقيا القديمة لعبت دورًا كبيرًا خارج حدود منطقتها."
      ),
      deeper: L(
        "His reign reminds us that Berber influence reached the heart of the ancient world long before Numidia or Carthage.",
        "Son règne nous rappelle que l'influence berbère a atteint le cœur du monde antique bien avant la Numidie ou Carthage.",
        "يذكّرنا حكمه بأن التأثير الأمازيغي وصل إلى قلب العالم القديم قبل نوميديا وقرطاج بزمن طويل."
      ),
    },
    question: L(
      "Around what year did Sheshonq I become pharaoh?",
      "Vers quelle année Sheshonq Ier devint-il pharaon ?",
      "في أيّ عام تقريبًا أصبح شيشنق الأول فرعونًا؟"
    ),
  },
  {
    id: "numidia",
    emoji: "🐎",
    topic: L("Ancient kingdoms", "Royaumes antiques", "ممالك قديمة"),
    title: L("Numidia — A Kingdom of Horsemen", "Numidie — Un royaume de cavaliers", "نوميديا — مملكة الفرسان"),
    facts: [
      {
        simple: L(
          "Numidia was a powerful Berber kingdom in what is now northern Algeria.",
          "La Numidie était un puissant royaume berbère dans l'actuelle Algérie du nord.",
          "كانت نوميديا مملكة أمازيغية قوية في شمال الجزائر اليوم."
        ),
        deeper: L(
          "Founded around the 3rd century BCE, Numidia united eastern and western Berber tribes under a single crown, with capitals like Cirta (Constantine).",
          "Fondée vers le IIIᵉ siècle av. J.-C., la Numidie unit les tribus berbères de l'est et de l'ouest sous une même couronne, avec des capitales comme Cirta (Constantine).",
          "تأسست نحو القرن الثالث ق.م، ووحّدت قبائل البربر شرقًا وغربًا تحت تاج واحد، وكانت سيرتا (قسنطينة) من عواصمها."
        ),
      },
      {
        simple: L(
          "Its king Massinissa was famous for his cavalry and his alliance with Rome.",
          "Son roi Massinissa était célèbre pour sa cavalerie et son alliance avec Rome.",
          "اشتهر ملكها ماسينيسا بفرسانه وبتحالفه مع روما."
        ),
        deeper: L(
          "Numidian light cavalry helped decide the Battle of Zama (202 BCE) against Carthage and shaped Mediterranean history.",
          "La cavalerie légère numide contribua à décider la bataille de Zama (202 av. J.-C.) contre Carthage et marqua l'histoire méditerranéenne.",
          "ساهم سلاح الفرسان النوميدي الخفيف في حسم معركة زاما (202 ق.م) ضد قرطاج، وأثّر في تاريخ المتوسط."
        ),
      },
    ],
    whyItMatters: {
      simple: L(
        "Numidia is one of the first great Algerian states.",
        "La Numidie est l'un des premiers grands États algériens.",
        "نوميديا من أوائل الدول الكبرى في الجزائر."
      ),
      deeper: L(
        "It proves that Algeria already had organized statehood, diplomacy, and a strong identity over 2,000 years ago.",
        "Elle prouve que l'Algérie avait déjà un État organisé, une diplomatie et une identité forte il y a plus de 2 000 ans.",
        "تُثبت أنّ الجزائر كانت تمتلك دولةً منظّمة ودبلوماسيةً وهويةً واضحة قبل أكثر من ألفي سنة."
      ),
    },
    question: L(
      "Who was Numidia's most famous king?",
      "Qui fut le roi le plus célèbre de Numidie ?",
      "من هو أشهر ملوك نوميديا؟"
    ),
    figureId: "massinissa",
  },
  {
    id: "abane-ramdane",
    emoji: "🧠",
    topic: L("War of Independence", "Guerre d'indépendance", "حرب الاستقلال"),
    title: L("Abane Ramdane — The Architect", "Abane Ramdane — L'architecte", "عبان رمضان — المهندس"),
    facts: [
      {
        simple: L(
          "Abane Ramdane organized the Algerian revolution like a careful architect.",
          "Abane Ramdane a organisé la révolution algérienne comme un architecte méthodique.",
          "نظّم عبان رمضان الثورة الجزائرية كمهندسٍ دقيق."
        ),
        deeper: L(
          "He believed the revolution needed clear politics, not only fighters — and insisted on civilian leadership over the military.",
          "Pour lui, la révolution avait besoin d'une vision politique claire, pas seulement de combattants — et le pouvoir civil devait primer sur le militaire.",
          "كان يؤمن بأن الثورة تحتاج إلى رؤية سياسية واضحة لا إلى مقاتلين فقط، وأصرّ على أولوية القيادة المدنية على العسكرية."
        ),
      },
      {
        simple: L(
          "In 1956 he led the Soummam Congress, a historic meeting in Kabylie.",
          "En 1956, il dirigea le congrès de la Soummam, une réunion historique en Kabylie.",
          "عام 1956 قاد مؤتمر الصومام، اللقاء التاريخي في القبائل."
        ),
        deeper: L(
          "The Soummam Congress (Aug 1956) gave the FLN a unified structure, a national platform, and a clear chain of command.",
          "Le congrès de la Soummam (août 1956) donna au FLN une structure unifiée, une plateforme nationale et une hiérarchie claire.",
          "منح مؤتمر الصومام (أوت 1956) جبهة التحرير بنيةً موحّدة وبرنامجًا وطنيًا وقيادة واضحة."
        ),
      },
    ],
    whyItMatters: {
      simple: L(
        "Without his vision, the revolution could have stayed scattered.",
        "Sans sa vision, la révolution aurait pu rester éparpillée.",
        "لولا رؤيته، لربما بقيت الثورة مشتّتة."
      ),
      deeper: L(
        "He turned a popular uprising into an organized national project — a model still studied today.",
        "Il transforma un soulèvement populaire en projet national organisé — un modèle encore étudié aujourd'hui.",
        "حوّل انتفاضة شعبية إلى مشروع وطني منظّم، ولا يزال نموذجه يُدرَّس حتى اليوم."
      ),
    },
    question: L(
      "What congress did Abane Ramdane lead in 1956?",
      "Quel congrès Abane Ramdane dirigea-t-il en 1956 ?",
      "ما المؤتمر الذي قاده عبان رمضان عام 1956؟"
    ),
    figureId: "abane-ramdane",
  },
  {
    id: "tafsut",
    emoji: "🌱",
    topic: L("Memory & identity", "Mémoire & identité", "ذاكرة وهوية"),
    title: L("Tafsut Imazighen — The Berber Spring", "Tafsut Imazighen — Le Printemps berbère", "تافسوت إيمازيغن — الربيع الأمازيغي"),
    facts: [
      {
        simple: L(
          "In April 1980, students and citizens in Kabylie peacefully asked for the Berber language to be respected.",
          "En avril 1980, des étudiants et des citoyens de Kabylie demandèrent pacifiquement le respect de la langue berbère.",
          "في أفريل 1980، طالب طلبة ومواطنون في القبائل بسلميةٍ بالاعتراف باللغة الأمازيغية."
        ),
        deeper: L(
          "It began when a lecture by Mouloud Mammeri on ancient Berber poetry was cancelled — sparking weeks of strikes and protests for cultural rights.",
          "Tout commença par l'annulation d'une conférence de Mouloud Mammeri sur la poésie berbère ancienne — déclenchant des semaines de grèves et de manifestations pour les droits culturels.",
          "بدأ كلّ شيء بإلغاء محاضرة لمولود معمري عن الشعر الأمازيغي القديم، مما أشعل أسابيع من الإضرابات والمظاهرات من أجل الحقوق الثقافية."
        ),
      },
      {
        simple: L(
          "It was a peaceful movement for identity and dignity.",
          "Ce fut un mouvement pacifique pour l'identité et la dignité.",
          "كانت حركة سلمية من أجل الهوية والكرامة."
        ),
        deeper: L(
          "Years later it led to Tamazight being recognized as a national, then official language of Algeria.",
          "Des années plus tard, cela aboutit à la reconnaissance du tamazight comme langue nationale puis officielle de l'Algérie.",
          "وبعد سنوات، أدى ذلك إلى الاعتراف بالأمازيغية لغةً وطنية ثم رسمية للجزائر."
        ),
      },
    ],
    whyItMatters: {
      simple: L(
        "It reminded everyone that Algeria's identity has many voices.",
        "Il a rappelé à tous que l'identité algérienne a plusieurs voix.",
        "ذكّر الجميع بأن للهوية الجزائرية أصواتًا متعددة."
      ),
      deeper: L(
        "Tafsut Imazighen opened a long, peaceful path toward recognizing Algeria's Berber heritage as part of the national fabric.",
        "Tafsut Imazighen ouvrit un long chemin pacifique vers la reconnaissance de l'héritage berbère comme part du tissu national.",
        "فتحت تافسوت إيمازيغن طريقًا طويلًا وسلميًا للاعتراف بالموروث الأمازيغي جزءًا من النسيج الوطني."
      ),
    },
    question: L(
      "In which year did Tafsut Imazighen take place?",
      "En quelle année eut lieu Tafsut Imazighen ?",
      "في أيّ سنة وقعت تافسوت إيمازيغن؟"
    ),
  },
  {
    id: "black-decade",
    emoji: "🕊️",
    topic: L("Modern Algeria", "Algérie moderne", "الجزائر الحديثة"),
    title: L("The Black Decade — A Painful Memory", "La Décennie noire — Une mémoire douloureuse", "العشرية السوداء — ذاكرة مؤلمة"),
    facts: [
      {
        simple: L(
          "During the 1990s, Algeria went through a long period of violence and fear.",
          "Dans les années 1990, l'Algérie a traversé une longue période de violence et de peur.",
          "في تسعينيات القرن الماضي، عاشت الجزائر فترة طويلة من العنف والخوف."
        ),
        deeper: L(
          "After the 1992 political crisis, an armed conflict between the state and armed groups deeply affected daily life.",
          "Après la crise politique de 1992, un conflit armé entre l'État et des groupes armés a profondément marqué la vie quotidienne.",
          "بعد أزمة 1992 السياسية، أثّر نزاع مسلح بين الدولة وجماعات مسلحة في الحياة اليومية تأثيرًا عميقًا."
        ),
      },
      {
        simple: L(
          "Many ordinary people, artists, and journalists lost their lives.",
          "De nombreuses personnes ordinaires, artistes et journalistes ont perdu la vie.",
          "فقد كثير من الناس العاديين والفنانين والصحفيين حياتهم."
        ),
        deeper: L(
          "The decade left lasting wounds, but also acts of solidarity, courage, and a long process of reconciliation.",
          "La décennie laissa des blessures durables, mais aussi des actes de solidarité, de courage et un long processus de réconciliation.",
          "تركت العشرية جروحًا عميقة، لكنّها شهدت أيضًا تضامنًا وشجاعة ومسارًا طويلًا للمصالحة."
        ),
      },
    ],
    whyItMatters: {
      simple: L(
        "Remembering helps build a peaceful future.",
        "Se souvenir aide à construire un avenir paisible.",
        "التذكّر يساعد على بناء مستقبل سلمي."
      ),
      deeper: L(
        "Understanding this period with care helps young Algerians value peace, dialogue, and pluralism.",
        "Comprendre cette période avec respect aide les jeunes Algériens à valoriser la paix, le dialogue et le pluralisme.",
        "فهم هذه الفترة باحترام يساعد الشباب الجزائري على تقدير السلم والحوار والتعددية."
      ),
    },
    question: L(
      "In which decade did this period mainly take place?",
      "Au cours de quelle décennie cette période s'est-elle principalement déroulée ?",
      "في أيّ عقد وقعت هذه الفترة بشكل رئيسي؟"
    ),
  },
  {
    id: "ottoman-algeria",
    emoji: "⚓",
    topic: L("Ottoman Era", "Époque ottomane", "العهد العثماني"),
    title: L("Ottoman Algeria — Regency of Algiers", "L'Algérie ottomane — Régence d'Alger", "الجزائر العثمانية — إيالة الجزائر"),
    facts: [
      {
        simple: L(
          "From the 1500s to 1830, Algeria was a strong Mediterranean power based in Algiers.",
          "Du XVIᵉ siècle à 1830, l'Algérie fut une grande puissance méditerranéenne basée à Alger.",
          "من القرن السادس عشر إلى 1830، كانت الجزائر قوة متوسطية كبرى مركزها مدينة الجزائر."
        ),
        deeper: L(
          "Founded with Ottoman support after 1516, the Regency of Algiers governed itself largely on its own and developed a powerful navy.",
          "Fondée avec le soutien ottoman après 1516, la Régence d'Alger se gouvernait largement seule et développa une marine puissante.",
          "تأسست بدعم عثماني بعد 1516، وحكمت نفسها إلى حدّ بعيد، وطوّرت أسطولًا بحريًا قويًا."
        ),
      },
      {
        simple: L(
          "Algiers signed treaties with European countries — like a real state.",
          "Alger signait des traités avec des pays européens, comme un véritable État.",
          "كانت الجزائر توقّع معاهدات مع دول أوروبية كأي دولةٍ حقيقية."
        ),
        deeper: L(
          "European powers paid tribute to ensure safe passage; Algerian diplomacy was active across the Mediterranean.",
          "Les puissances européennes payaient un tribut pour garantir le passage ; la diplomatie algérienne était active dans toute la Méditerranée.",
          "كانت القوى الأوروبية تدفع إتاوات لضمان مرور سفنها، وكانت الدبلوماسية الجزائرية نشطة في كامل المتوسط."
        ),
      },
    ],
    whyItMatters: {
      simple: L(
        "It shows Algeria has long had its own institutions and place in the world.",
        "Cela montre que l'Algérie a depuis longtemps ses propres institutions et sa place dans le monde.",
        "يُظهر أن للجزائر مؤسساتها ومكانتها في العالم منذ زمن بعيد."
      ),
      deeper: L(
        "The Regency built a maritime, multicultural Algiers that shaped trade, law, and identity for over 300 years.",
        "La Régence bâtit un Alger maritime et multiculturel qui façonna le commerce, le droit et l'identité pendant plus de 300 ans.",
        "بنت الإيالة مدينة جزائرية بحرية متعددة الثقافات شكّلت التجارة والقانون والهوية لأكثر من 300 سنة."
      ),
    },
    question: L(
      "When did the Regency of Algiers come to an end?",
      "Quand la Régence d'Alger prit-elle fin ?",
      "متى انتهت إيالة الجزائر؟"
    ),
  },
];

export function getLesson(id: string): Lesson | undefined {
  return lessons.find((l) => l.id === id);
}

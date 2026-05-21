import type { Localized, LocalizedString } from "@/lib/i18n";

const L = (en: string, fr: string, ar: string): Localized<string> => ({ en, fr, ar });

export type MuseumNote = {
  title: LocalizedString;
  body: LocalizedString;
};

export type EraExtras = {
  /** Short cinematic intro shown under the title. */
  cinematicLine: LocalizedString;
  /** Why this era still matters today. */
  whyItMatters: LocalizedString;
  /** 2–3 short curator-style notes. */
  museumNotes: MuseumNote[];
  /** Figure IDs (from src/data/figures.ts) shown as visual cards. */
  keyFigureIds: string[];
  /** Region IDs (from src/data/mapRegions.ts) connected to this era. */
  relatedRegionIds: string[];
  /** A single, memorable takeaway. */
  memoryCard: {
    quote: LocalizedString;
    attribution?: LocalizedString;
  };
  /** Next era id for "Continue the journey". */
  nextEraId?: string;
};

export const eraExtras: Record<string, EraExtras> = {
  earlynorthafrica: {
    cinematicLine: L(
      "Long before borders, the wind of North Africa already carried names the world would learn.",
      "Bien avant les frontières, le vent d'Afrique du Nord portait déjà des noms que le monde apprendrait.",
      "قبل أن تُرسم الحدود، كانت رياح شمال إفريقيا تحمل أسماءً سيعرفها العالم.",
    ),
    whyItMatters: L(
      "This era reminds us that Algerian roots reach into the deepest layers of antiquity — and that Amazigh leaders once shaped empires far beyond their own land.",
      "Cette époque nous rappelle que les racines algériennes plongent au plus profond de l'Antiquité — et que des chefs amazighs ont façonné des empires bien au-delà de leur terre.",
      "تذكّرنا هذه الحقبة بأن جذور الجزائر تمتد في أعمق طبقات التاريخ، وأن قادةً أمازيغ صاغوا إمبراطوريات أبعد بكثير من أرضهم.",
    ),
    museumNotes: [
      {
        title: L("A people older than the maps", "Un peuple plus ancien que les cartes", "شعب أقدم من الخرائط"),
        body: L(
          "Amazigh tribes were already known across the Mediterranean and the Sahara before Carthage, before Rome.",
          "Les tribus amazighes étaient déjà connues à travers la Méditerranée et le Sahara avant Carthage, avant Rome.",
          "كانت القبائل الأمازيغية معروفة في المتوسط والصحراء قبل قرطاج وقبل روما.",
        ),
      },
      {
        title: L("A pharaoh from the west", "Un pharaon venu de l'ouest", "فرعون من الغرب"),
        body: L(
          "Sheshonq I, of Amazigh origin, founded Egypt's 22nd Dynasty — proof that North African influence reached the heart of the ancient world.",
          "Sheshonq Ier, d'origine amazighe, fonda la 22e dynastie d'Égypte — preuve que l'influence nord-africaine atteignit le cœur du monde antique.",
          "أسس شيشنق الأول، من أصل أمازيغي، الأسرة الثانية والعشرين في مصر، وهو دليل على بلوغ تأثير شمال إفريقيا قلبَ العالم القديم.",
        ),
      },
    ],
    keyFigureIds: ["massinissa", "syphax"],
    relatedRegionIds: ["constantine", "oran-west", "kabylie"],
    memoryCard: {
      quote: L(
        "Before Algeria had a name, its voice was already heard across the ancient world.",
        "Avant que l'Algérie n'ait un nom, sa voix se faisait déjà entendre dans le monde antique.",
        "قبل أن يكون للجزائر اسم، كان صوتها مسموعًا في العالم القديم.",
      ),
    },
    nextEraId: "numidia",
  },

  numidia: {
    cinematicLine: L(
      "On horseback, between Carthage and Rome, a kingdom of horsemen learned to speak in its own name.",
      "À cheval, entre Carthage et Rome, un royaume de cavaliers apprit à parler en son nom.",
      "على صهوة الخيل، بين قرطاج وروما، تعلّمت مملكةٌ من الفرسان أن تتكلم باسمها.",
    ),
    whyItMatters: L(
      "Numidia is the first time North Africa appears in history as a state of its own — with kings, coins, and an unbroken pride that still echoes in modern Algerian identity.",
      "La Numidie marque la première apparition de l'Afrique du Nord dans l'histoire comme un État à part entière — avec ses rois, sa monnaie et une fierté ininterrompue qui résonne encore dans l'identité algérienne.",
      "نوميديا أوّل ظهور لشمال إفريقيا في التاريخ بوصفه دولة قائمة بذاتها، لها ملوكها وعملتها وكبرياءٌ متّصل لا يزال صداه في الهوية الجزائرية الحديثة.",
    ),
    museumNotes: [
      {
        title: L("Massinissa, the unifier", "Massinissa, l'unificateur", "ماسينيسا الموحِّد"),
        body: L(
          "He stitched rival tribes into one kingdom and made farming a political act in a land of nomads.",
          "Il a tissé des tribus rivales en un seul royaume, et fait de l'agriculture un acte politique en terre de nomades.",
          "نسج القبائل المتنافسة في مملكة واحدة وجعل الزراعة فعلًا سياسيًا في أرض الرحّل.",
        ),
      },
      {
        title: L("Jugurtha, the defiant", "Jugurtha, le défi fait homme", "يوغرطة المتحدّي"),
        body: L(
          "His war against Rome became a legend of resistance taught to Algerian children long after the kingdom fell.",
          "Sa guerre contre Rome devint une légende de résistance enseignée aux enfants d'Algérie longtemps après la chute du royaume.",
          "صارت حربه ضد روما أسطورة مقاومة تُروى للأطفال الجزائريين بعد سقوط المملكة بزمن طويل.",
        ),
      },
    ],
    keyFigureIds: ["massinissa", "jugurtha", "syphax", "juba-i"],
    relatedRegionIds: ["constantine", "oran-west", "aures"],
    memoryCard: {
      quote: L(
        "\"A city for sale, and ready to die the day it finds a buyer.\"",
        "« Une ville à vendre, prête à mourir le jour où elle trouvera un acheteur. »",
        "«مدينةٌ تُباع، ومستعدّةٌ للموت يوم تجد مشترياً.»",
      ),
      attribution: L("Jugurtha, on Rome", "Jugurtha, à propos de Rome", "يوغرطة، عن روما"),
    },
    nextEraId: "roman",
  },

  roman: {
    cinematicLine: L(
      "Stone roads, olive presses, and a saint whose questions still open hearts.",
      "Routes de pierre, pressoirs à huile, et un saint dont les questions ouvrent encore les cœurs.",
      "طرقٌ من حجر، ومعاصر زيت، وقدّيسٌ لا تزال أسئلته تفتح القلوب.",
    ),
    whyItMatters: L(
      "Roman Africa was not only conquered — it produced thinkers, emperors and a faith tradition whose words still travel the world.",
      "L'Afrique romaine ne fut pas seulement conquise — elle produisit des penseurs, des empereurs et une tradition de foi dont les mots voyagent encore.",
      "لم تكن إفريقيا الرومانية مفتوحةً فحسب، بل أنجبت مفكّرين وأباطرة وتقليدًا روحيًا لا تزال كلماته تجوب العالم.",
    ),
    museumNotes: [
      {
        title: L("The cities of light", "Les cités de lumière", "مدن النور"),
        body: L(
          "Timgad, Djemila and Cuicul: grids of marble and law cut into the high plateaus.",
          "Timgad, Djemila et Cuicul : des damiers de marbre et de droit taillés sur les hauts plateaux.",
          "تيمقاد وجميلة وكويكول: شِبكاتٌ من الرخام والقانون نُقشت في الهضاب العليا.",
        ),
      },
      {
        title: L("Augustine of Hippo", "Augustin d'Hippone", "أوغسطين الهيبوني"),
        body: L(
          "Born in what is now Souk Ahras, his Confessions remain one of the most-read books ever written on African soil.",
          "Né dans l'actuelle Souk Ahras, ses Confessions restent l'un des livres les plus lus jamais écrits en terre africaine.",
          "وُلد في سوق أهراس الحالية، وتبقى «اعترافاته» من أكثر الكتب التي كُتبت على أرضٍ إفريقية قراءةً.",
        ),
      },
    ],
    keyFigureIds: ["augustine", "juba-ii", "septimius-severus", "apuleius"],
    relatedRegionIds: ["constantine", "oran-west", "algiers"],
    memoryCard: {
      quote: L(
        "\"Late have I loved you, beauty so ancient and so new.\"",
        "« Tard je t'ai aimée, beauté si ancienne et si nouvelle. »",
        "«متأخّرًا أحببتُكِ، يا جمالًا قديمًا وحديثًا.»",
      ),
      attribution: L("Augustine, Confessions", "Augustin, Confessions", "أوغسطين، الاعترافات"),
    },
    nextEraId: "islamic",
  },

  islamic: {
    cinematicLine: L(
      "A new alphabet, a new prayer, and a thousand years of cities, scholars and saints.",
      "Un nouvel alphabet, une nouvelle prière, et mille ans de cités, de savants et de saints.",
      "حروفٌ جديدة وصلاةٌ جديدة، وألف سنة من المدن والعلماء والأولياء.",
    ),
    whyItMatters: L(
      "From the Rustamids to the Almohads, this era wove Algeria into the great Islamic and Andalusian civilisation — its mosques, libraries and trade routes still shape what the country reads, sings and believes.",
      "Des Rostémides aux Almohades, cette époque tissa l'Algérie à la grande civilisation islamique et andalouse — ses mosquées, ses bibliothèques et ses routes commerciales façonnent encore ce que le pays lit, chante et croit.",
      "من الرستميين إلى الموحّدين، نسجت هذه الحقبة الجزائر في الحضارة الإسلامية والأندلسية الكبرى، ولا تزال مساجدها ومكتباتها وطرق تجارتها تشكّل ما يقرأه البلد ويغنّيه ويؤمن به.",
    ),
    museumNotes: [
      {
        title: L("Tahert, a city of justice", "Tahert, cité de la justice", "تاهرت، مدينة العدل"),
        body: L(
          "The Rustamid capital became a refuge for scholars and a model of austere, learned governance.",
          "La capitale rostémide devint un refuge pour les savants et un modèle de gouvernance sobre et lettrée.",
          "صارت العاصمة الرستمية ملاذًا للعلماء ونموذجًا لحكمٍ زاهد عالم.",
        ),
      },
      {
        title: L("Ibn Khaldun listens to history", "Ibn Khaldoun écoute l'histoire", "ابن خلدون يُنصت إلى التاريخ"),
        body: L(
          "From a tower in Frenda, he wrote the Muqaddimah — and invented the social science of how civilisations rise and fall.",
          "Depuis une tour à Frenda, il écrivit la Muqaddima — et inventa la science sociale de la montée et de la chute des civilisations.",
          "من برجٍ في فرندة كتب «المقدّمة»، فأسّس علم اجتماع نهوض الحضارات وسقوطها.",
        ),
      },
      {
        title: L("Tlemcen, the Andalusian sister", "Tlemcen, la sœur andalouse", "تلمسان، الأخت الأندلسية"),
        body: L(
          "Under the Zayyanids it became a capital of arts, sciences and Andalusian refugees who brought a music we still play.",
          "Sous les Zianides, elle devint une capitale des arts, des sciences et des réfugiés andalous, porteurs d'une musique encore jouée.",
          "في عهد الزيانيين صارت عاصمة للفنون والعلوم، ولاجئين أندلسيين حملوا موسيقى لا نزال نعزفها.",
        ),
      },
    ],
    keyFigureIds: ["tariq-ibn-ziyad", "ibn-khaldun", "ibn-rustam", "yaghmurasen", "sidi-boumediene"],
    relatedRegionIds: ["oran-west", "constantine", "algiers", "sahara"],
    memoryCard: {
      quote: L(
        "\"The past resembles the future more than one drop of water resembles another.\"",
        "« Le passé ressemble à l'avenir plus qu'une goutte d'eau à une autre. »",
        "«الماضي أشبه بالمستقبل من قطرة ماء بأختها.»",
      ),
      attribution: L("Ibn Khaldun, Muqaddimah", "Ibn Khaldoun, Muqaddima", "ابن خلدون، المقدّمة"),
    },
    nextEraId: "ottoman",
  },

  ottoman: {
    cinematicLine: L(
      "The Mediterranean curled around Algiers like a second wall.",
      "La Méditerranée s'enroula autour d'Alger comme une seconde muraille.",
      "التفّ المتوسط حول الجزائر كأنّه سورٌ ثانٍ.",
    ),
    whyItMatters: L(
      "For three centuries the Regency of Algiers was a Mediterranean power with its own fleet, treaties and pluralistic city life — a chapter often flattened, but full of nuance.",
      "Pendant trois siècles, la Régence d'Alger fut une puissance méditerranéenne dotée de sa propre flotte, de ses traités et d'une vie urbaine plurielle — un chapitre souvent aplati, mais plein de nuances.",
      "ظلّت إيالة الجزائر ثلاثة قرون قوّةً متوسطية ذات أسطولها ومعاهداتها وحياتها المدينية المتنوّعة، فصلٌ كثيرًا ما يُختزل وهو غنيٌّ بالتفاصيل.",
    ),
    museumNotes: [
      {
        title: L("The Casbah, a city within a city", "La Casbah, une cité dans la cité", "القصبة، مدينةٌ داخل المدينة"),
        body: L(
          "Narrow stairs, white walls, courtyards open to the sky — UNESCO heritage and lived neighbourhood at once.",
          "Escaliers étroits, murs blancs, cours ouvertes sur le ciel — patrimoine UNESCO et quartier vivant à la fois.",
          "أدراجٌ ضيّقة وجدرانٌ بيضاء وأفنيةٌ مفتوحة على السماء، تراثٌ عالمي وحيٌّ مسكون في آنٍ.",
        ),
      },
      {
        title: L("Corsairs and treaties", "Corsaires et traités", "البحّارة والمعاهدات"),
        body: L(
          "Raïs Hamidou and his peers turned the bay into a stage for diplomacy as much as for war.",
          "Raïs Hamidou et ses pairs firent de la baie une scène de diplomatie autant que de guerre.",
          "حوّل الرّيس حميدو ورفاقه الخليج إلى مسرح دبلوماسية بقدر ما كان مسرح حرب.",
        ),
      },
    ],
    keyFigureIds: ["barbarossa", "rais-hamidou", "hassan-pacha", "salah-rais"],
    relatedRegionIds: ["algiers", "oran-west", "constantine"],
    memoryCard: {
      quote: L(
        "Algiers did not look inland — it looked across the sea, and the sea answered back.",
        "Alger ne regardait pas vers l'intérieur — elle regardait la mer, et la mer lui répondait.",
        "لم تكن الجزائر تتطلّع إلى الداخل، بل إلى البحر، فكان البحر يجيبها.",
      ),
    },
    nextEraId: "french",
  },

  french: {
    cinematicLine: L(
      "A country was wounded in its language, its land, and its name — and learned to remember in three tongues.",
      "Un pays fut blessé dans sa langue, sa terre et son nom — et apprit à se souvenir en trois langues.",
      "بلدٌ جُرح في لغته وأرضه واسمه، فتعلّم أن يتذكّر بثلاث لغات.",
    ),
    whyItMatters: L(
      "132 years of colonisation reshaped land, names and families — but also forged a generation of leaders, poets and witnesses whose voices still guide the country.",
      "132 ans de colonisation ont remodelé la terre, les noms et les familles — mais ont aussi forgé une génération de chefs, de poètes et de témoins dont les voix guident encore le pays.",
      "غيّر استعمارٌ دام 132 عامًا الأرض والأسماء والعائلات، لكنّه صنع أيضًا جيلًا من القادة والشعراء والشهود لا تزال أصواتهم تهدي البلاد.",
    ),
    museumNotes: [
      {
        title: L("Resistance in the mountains", "La résistance dans les montagnes", "المقاومة في الجبال"),
        body: L(
          "From Abdelkader's emirate to Lalla Fatma N'Soumer's Kabylie, the highlands answered the conquest sentence by sentence.",
          "De l'émirat d'Abdelkader à la Kabylie de Lalla Fatma N'Soumer, les hauteurs répondirent à la conquête phrase par phrase.",
          "من إمارة عبد القادر إلى قبائل لالة فاطمة نسومر، أجابت الجبال على الغزو جملةً بجملة.",
        ),
      },
      {
        title: L("8 May 1945 — a date that did not heal", "8 mai 1945 — une date qui n'a pas guéri", "8 ماي 1945 — تاريخٌ لم يلتئم"),
        body: L(
          "The Sétif and Guelma massacres turned a celebration of peace into a generational rupture.",
          "Les massacres de Sétif et Guelma transformèrent une fête de la paix en rupture générationnelle.",
          "حوّلت مجازر سطيف وقالمة احتفال السلام إلى قطيعة بين الأجيال.",
        ),
      },
    ],
    keyFigureIds: ["abdelkader", "lalla-fatma-nsoumer", "el-mokrani", "ben-badis", "messali-hadj"],
    relatedRegionIds: ["kabylie", "oran-west", "constantine", "algiers"],
    memoryCard: {
      quote: L(
        "\"Islam is my religion, Arabic my language, Algeria my homeland.\"",
        "« L'Islam est ma religion, l'arabe ma langue, l'Algérie ma patrie. »",
        "«الإسلام ديني، والعربية لغتي، والجزائر وطني.»",
      ),
      attribution: L("Abdelhamid Ben Badis", "Abdelhamid Ben Badis", "عبد الحميد بن باديس"),
    },
    nextEraId: "independence",
  },

  independence: {
    cinematicLine: L(
      "A nation that wrote its name in fire, and is still learning to write it in peace.",
      "Une nation qui a écrit son nom dans le feu, et qui apprend encore à l'écrire dans la paix.",
      "أمّةٌ كتبت اسمها بالنار، ولا تزال تتعلّم أن تكتبه بالسلام.",
    ),
    whyItMatters: L(
      "From the first shots of 1 November 1954 to today, this is the era Algerians live inside — and the one they argue about the most.",
      "Des premiers coups de feu du 1ᵉʳ novembre 1954 à aujourd'hui, c'est l'époque dans laquelle les Algériens vivent — et celle dont ils débattent le plus.",
      "من رصاصات أوّل نوفمبر 1954 إلى اليوم، هذه هي الحقبة التي يعيش فيها الجزائريون، والأكثر إثارةً للنقاش بينهم.",
    ),
    museumNotes: [
      {
        title: L("Soummam, 1956", "Soummam, 1956", "الصومام، 1956"),
        body: L(
          "In a Kabyle valley, the revolution gave itself a constitution — and a debate about power that never quite ended.",
          "Dans une vallée kabyle, la révolution se donna une constitution — et un débat sur le pouvoir qui ne s'est jamais vraiment refermé.",
          "في وادٍ قبائلي، منحت الثورة نفسها دستورًا، ونقاشًا حول السلطة لم يُغلَق فعلًا قطّ.",
        ),
      },
      {
        title: L("5 July 1962", "5 juillet 1962", "5 جويلية 1962"),
        body: L(
          "Independence at last, exactly 132 years after the French landing — a date carried inside almost every Algerian family story.",
          "L'indépendance enfin, exactement 132 ans après le débarquement français — une date logée dans presque chaque histoire de famille algérienne.",
          "الاستقلال أخيرًا، بعد 132 سنةً بالضبط من الإنزال الفرنسي، تاريخٌ يسكن قصص العائلات الجزائرية كلّها تقريبًا.",
        ),
      },
      {
        title: L("A young, multilingual country", "Un pays jeune et multilingue", "بلدٌ شابٌّ متعدّد اللغات"),
        body: L(
          "Arabic, Tamazight and French live side by side in the same conversation — sometimes the same sentence.",
          "Arabe, tamazight et français cohabitent dans la même conversation — parfois la même phrase.",
          "تتجاور العربية وتامازيغت والفرنسية في الحديث نفسه، وأحيانًا في الجملة الواحدة.",
        ),
      },
    ],
    keyFigureIds: [
      "abane-ramdane",
      "ben-mhidi",
      "krim-belkacem",
      "hassiba-ben-bouali",
      "djamila-bouhired",
      "boumediene",
    ],
    relatedRegionIds: ["algiers", "kabylie", "aures", "constantine"],
    memoryCard: {
      quote: L(
        "\"Throw the revolution into the street, and the people will carry it.\"",
        "« Jetez la révolution dans la rue, le peuple la portera. »",
        "«ألقوا الثورة في الشارع يحملها الشعب.»",
      ),
      attribution: L("Larbi Ben M'hidi", "Larbi Ben M'hidi", "العربي بن مهيدي"),
    },
  },
};

export function getEraExtras(id: string): EraExtras | undefined {
  return eraExtras[id];
}

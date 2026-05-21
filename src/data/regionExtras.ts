import type { Localized, LocalizedString } from "@/lib/i18n";

const L = (en: string, fr: string, ar: string): Localized<string> => ({ en, fr, ar });

export type RegionCulturePillar = {
  emoji: string;
  label: LocalizedString;
  body: LocalizedString;
};

export type RegionMuseumNote = {
  title: LocalizedString;
  body: LocalizedString;
};

export type RegionExtras = {
  /** Geography in one short paragraph. */
  geography: LocalizedString;
  /** Historical significance in one short paragraph. */
  historicalSignificance: LocalizedString;
  /** Cultural importance in one short paragraph. */
  culturalImportance: LocalizedString;
  /** Era IDs (src/data/eras.ts) historically connected to this region. */
  eraIds: string[];
  /** Cultural identity pillars: architecture, music, oral, cuisine, language. */
  culturePillars: RegionCulturePillar[];
  /** 1–2 curator-style notes. */
  museumNotes: RegionMuseumNote[];
  /** Other region IDs to explore next. */
  nearbyRegionIds: string[];
  /** Closing reflection. */
  reflection: {
    quote: LocalizedString;
    attribution?: LocalizedString;
  };
};

export const regionExtras: Record<string, RegionExtras> = {
  kabylie: {
    geography: L(
      "A mountainous block in northern Algeria, between the Djurdjura range and the Mediterranean — villages perched, valleys deep, light sharp.",
      "Un massif montagneux du nord algérien, entre le Djurdjura et la Méditerranée — villages perchés, vallées profondes, lumière vive.",
      "كتلةٌ جبليّة في شمال الجزائر بين جرجرة والمتوسط، قرىً معلّقة وأودية عميقة ونورٌ حادّ.",
    ),
    historicalSignificance: L(
      "From Lalla Fatma N'Soumer's resistance to the 1956 Soummam Congress and the 1980 Berber Spring, Kabylie has been a workshop of Algerian conscience.",
      "De la résistance de Lalla Fatma N'Soumer au Congrès de la Soummam de 1956 et au Printemps berbère de 1980, la Kabylie a été l'atelier de la conscience algérienne.",
      "من مقاومة لالة فاطمة نسومر إلى مؤتمر الصومام 1956 والربيع الأمازيغي 1980، كانت القبائل ورشةً للضمير الجزائري.",
    ),
    culturalImportance: L(
      "Heart of the Tamazight language and of a poetic, musical, deeply oral culture that has shaped how the whole country speaks of memory.",
      "Cœur de la langue tamazight et d'une culture poétique, musicale, profondément orale qui a façonné la façon dont tout le pays parle de mémoire.",
      "قلب اللغة الأمازيغية وثقافةٍ شعريّة موسيقيّة شفويّة عميقة شكّلت طريقة البلد كلّه في الحديث عن الذاكرة.",
    ),
    eraIds: ["french", "independence", "islamic"],
    culturePillars: [
      {
        emoji: "🏘️",
        label: L("Architecture", "Architecture", "العمارة"),
        body: L(
          "Stone houses with tiled roofs, fountains and djemaâs — villages built to face the mountain and each other.",
          "Maisons de pierre aux toits de tuiles, fontaines et djemaâs — villages bâtis face à la montagne et les uns aux autres.",
          "بيوتٌ من الحجر بسقوفٍ من القرميد، وعيون ماء وجماعات قروية — قرى بُنيت في مواجهة الجبل وبعضها بعضًا.",
        ),
      },
      {
        emoji: "🎶",
        label: L("Music", "Musique", "موسيقى"),
        body: L(
          "Idir, Aït Menguellet, Matoub — Kabyle song is poetry sung against forgetting.",
          "Idir, Aït Menguellet, Matoub — la chanson kabyle est une poésie chantée contre l'oubli.",
          "إيدير وآيت منقلات ومعطوب — الأغنية القبائلية شعرٌ يُغنَّى ضدّ النسيان.",
        ),
      },
      {
        emoji: "🗣️",
        label: L("Oral memory", "Mémoire orale", "الذاكرة الشفوية"),
        body: L(
          "Tales (timucuha), proverbs and women's poetry carry centuries of history without a single page.",
          "Contes (timucuha), proverbes et poésie féminine portent des siècles d'histoire sans une seule page.",
          "حكايات (تيموشوها) وأمثال وشعرٌ نسائي تحمل قرونًا من التاريخ بلا صفحة واحدة.",
        ),
      },
      {
        emoji: "🍲",
        label: L("Cuisine", "Cuisine", "المطبخ"),
        body: L(
          "Couscous, berkoukes, fresh herbs and olive oil — food of the mountain, made to gather generations.",
          "Couscous, berkoukes, herbes fraîches et huile d'olive — cuisine de la montagne, faite pour réunir les générations.",
          "كسكسي وبركوكس وأعشاب طازجة وزيت زيتون — مطبخ الجبل صُنع ليجمع الأجيال.",
        ),
      },
      {
        emoji: "ⵣ",
        label: L("Language", "Langue", "اللغة"),
        body: L(
          "Tamazight, written in Tifinagh and Latin script, became an official national language of Algeria in 2016.",
          "Tamazight, écrit en tifinagh et en alphabet latin, est devenue langue officielle de l'Algérie en 2016.",
          "تامازيغت تُكتب بالتيفيناغ وبالحرف اللاتيني، وصارت لغةً وطنية رسمية في الجزائر عام 2016.",
        ),
      },
    ],
    museumNotes: [
      {
        title: L("The Soummam valley", "La vallée de la Soummam", "وادي الصومام"),
        body: L(
          "In August 1956, in a remote Kabyle village, the FLN debated and wrote the platform that would frame independence.",
          "En août 1956, dans un village kabyle isolé, le FLN débattit et rédigea la plateforme qui structura l'indépendance.",
          "في أوت 1956، وفي قريةٍ قبائلية نائية، ناقشت جبهة التحرير وكتبت المنهاج الذي أطّر الاستقلال.",
        ),
      },
    ],
    nearbyRegionIds: ["algiers", "aures", "constantine"],
    reflection: {
      quote: L(
        "The mountain remembers what the city forgets.",
        "La montagne se souvient de ce que la ville oublie.",
        "الجبل يتذكّر ما تنساه المدينة.",
      ),
      attribution: L("Kabyle proverb", "Proverbe kabyle", "مثلٌ قبائليّ"),
    },
  },

  aures: {
    geography: L(
      "A massif of high, dry mountains in eastern Algeria — pine forests, ochre canyons and villages that hide in stone.",
      "Un massif de montagnes hautes et sèches dans l'est algérien — forêts de pins, canyons ocre et villages cachés dans la pierre.",
      "كتلةٌ من جبالٍ عالية وجافّة في شرق الجزائر، غاباتُ صنوبر وأخاديد بلون المغرة وقرى تختبئ في الحجر.",
    ),
    historicalSignificance: L(
      "These mountains hid Queen Dihya in the 7th century and lit the first fires of the 1 November 1954 revolution thirteen centuries later.",
      "Ces montagnes ont abrité la reine Dihya au VIIᵉ siècle et allumé les premiers feux de la révolution du 1ᵉʳ novembre 1954 treize siècles plus tard.",
      "أوت هذه الجبال الملكة ديهيا في القرن السابع، وأشعلت أولى نيران ثورة فاتح نوفمبر 1954 بعد ثلاثة عشر قرنًا.",
    ),
    culturalImportance: L(
      "Home of the Chaoui people, who preserve a distinct Amazigh language, a tradition of horse and rifle, and a deep sense of place.",
      "Pays des Chaouis, qui préservent une langue amazighe propre, une tradition du cheval et du fusil, et un sens profond du lieu.",
      "بلاد الشاوية، يحفظون لغةً أمازيغية خاصّة، وتقليدًا للفروسية والبندقية، وارتباطًا عميقًا بالمكان.",
    ),
    eraIds: ["earlynorthafrica", "islamic", "french", "independence"],
    culturePillars: [
      {
        emoji: "🏔️",
        label: L("Landscape", "Paysage", "الطبيعة"),
        body: L(
          "Canyons of Ghoufi, balconies carved into the cliffs by Chaoui families across generations.",
          "Les balcons de Ghoufi, taillés dans les falaises par des familles chaouies au fil des générations.",
          "شُرفات غوفي المنحوتة في المنحدرات على يد العائلات الشاوية جيلًا بعد جيل.",
        ),
      },
      {
        emoji: "🎶",
        label: L("Music", "Musique", "موسيقى"),
        body: L(
          "Chaoui song, with the gasba flute and the bendir drum, carries the breath of the mountain.",
          "La chanson chaouie, portée par la flûte gasba et le bendir, transporte le souffle de la montagne.",
          "الأغنية الشاوية، بالقصبة والبندير، تحمل نَفَس الجبل.",
        ),
      },
      {
        emoji: "🛡️",
        label: L("Resistance", "Résistance", "المقاومة"),
        body: L(
          "From Dihya to Ben Boulaïd, the Aurès have always answered occupation from the high ground.",
          "De Dihya à Ben Boulaïd, les Aurès ont toujours répondu à l'occupation depuis les hauteurs.",
          "من ديهيا إلى بن بولعيد، أجابت الأوراس على الاحتلال دائمًا من الأعالي.",
        ),
      },
      {
        emoji: "🧵",
        label: L("Craft", "Artisanat", "الحِرَف"),
        body: L(
          "Wool carpets and silver jewellery patterned with geometric Amazigh symbols.",
          "Tapis de laine et bijoux d'argent ornés de symboles amazighs géométriques.",
          "زرابي صوفية ومجوهرات فضية تزخرفها رموزٌ أمازيغية هندسية.",
        ),
      },
    ],
    museumNotes: [
      {
        title: L("1 November 1954", "1ᵉʳ novembre 1954", "فاتح نوفمبر 1954"),
        body: L(
          "The first shots of the war were fired in the Aurès, by a handful of men who knew the mountain by name.",
          "Les premiers coups de feu de la guerre retentirent dans les Aurès, tirés par une poignée d'hommes qui connaissaient la montagne par cœur.",
          "أُطلقت أولى رصاصات الحرب في الأوراس على يد حفنةٍ من الرجال يعرفون الجبل بالاسم.",
        ),
      },
    ],
    nearbyRegionIds: ["constantine", "kabylie", "sahara"],
    reflection: {
      quote: L(
        "The Aurès do not shout; they wait. And when they answer, history listens.",
        "Les Aurès ne crient pas, elles attendent. Et quand elles répondent, l'histoire écoute.",
        "الأوراس لا تصرخ، تنتظر. وحين تجيب، يُنصت التاريخ.",
      ),
    },
  },

  algiers: {
    geography: L(
      "A white amphitheatre rising from the Mediterranean — a bay, a Casbah, and a long staircase down to the sea.",
      "Un amphithéâtre blanc dressé sur la Méditerranée — une baie, une Casbah, et un long escalier vers la mer.",
      "مدرّجٌ أبيض يرتفع فوق المتوسط، خليجٌ وقصبةٌ ودرجٌ طويل نحو البحر.",
    ),
    historicalSignificance: L(
      "Capital of the Regency of Algiers for three centuries, stage of the Battle of Algiers in 1956–57, and birthplace of the 5 July 1962 independence.",
      "Capitale de la Régence d'Alger pendant trois siècles, théâtre de la Bataille d'Alger en 1956-57 et lieu de l'indépendance du 5 juillet 1962.",
      "عاصمة إيالة الجزائر ثلاثة قرون، ومسرح معركة الجزائر 1956-57، ومهد استقلال 5 جويلية 1962.",
    ),
    culturalImportance: L(
      "Where chaabi music was born in the Casbah, where journalists, students and exiles still meet, and where the country negotiates its modern face.",
      "Là où le chaâbi est né dans la Casbah, où journalistes, étudiants et exilés se retrouvent encore, et où le pays négocie son visage moderne.",
      "حيث وُلد الشعبي في القصبة، وحيث يلتقي الصحفيون والطلبة والمنفيون اليوم، وحيث يتفاوض البلد على وجهه الحديث.",
    ),
    eraIds: ["ottoman", "french", "independence"],
    culturePillars: [
      {
        emoji: "🏛️",
        label: L("Casbah", "Casbah", "القصبة"),
        body: L(
          "A UNESCO World Heritage maze of white walls, courtyards and Ottoman palaces.",
          "Un labyrinthe UNESCO de murs blancs, de patios et de palais ottomans.",
          "متاهةٌ من التراث العالمي: جدرانٌ بيضاء وأفنية وقصور عثمانية.",
        ),
      },
      {
        emoji: "🎶",
        label: L("Chaabi", "Chaâbi", "الشعبي"),
        body: L(
          "El Anka's mandole turned Andalusian classics into the music of the street and the café.",
          "Le mandole d'El Anka transforma les classiques andalous en musique de la rue et du café.",
          "حوّل مندول الحاج محمد العنقا الكلاسيكيات الأندلسية إلى موسيقى الشارع والمقهى.",
        ),
      },
      {
        emoji: "📚",
        label: L("Letters", "Lettres", "الأدب"),
        body: L(
          "From Kateb Yacine to Assia Djebar, Algiers has long been a literary capital in three languages.",
          "De Kateb Yacine à Assia Djebar, Alger est depuis longtemps une capitale littéraire en trois langues.",
          "من كاتب ياسين إلى آسيا جبّار، ظلّت الجزائر العاصمة منذ زمن عاصمةً أدبيّة بثلاث لغات.",
        ),
      },
      {
        emoji: "🍽️",
        label: L("Table", "Table", "المائدة"),
        body: L(
          "Dolma, rechta and bourek — refined Ottoman-Andalusian flavours kept alive in family kitchens.",
          "Dolma, rechta et bourek — saveurs ottomano-andalouses raffinées, gardées dans les cuisines familiales.",
          "الدولمة والرّشتة والبوراك — نكهات عثمانية أندلسية راقية تحفظها مطابخ العائلات.",
        ),
      },
    ],
    museumNotes: [
      {
        title: L("5 July 1962", "5 juillet 1962", "5 جويلية 1962"),
        body: L(
          "The day a colony of 132 years became a country again — and the bay of Algiers filled with green-and-white flags.",
          "Le jour où une colonie de 132 ans redevint un pays — et où la baie d'Alger se remplit de drapeaux vert et blanc.",
          "اليوم الذي عادت فيه مستعمرة 132 سنة بلدًا — وامتلأ خليج الجزائر بالأعلام الخضراء البيضاء.",
        ),
      },
    ],
    nearbyRegionIds: ["kabylie", "constantine", "oran-west"],
    reflection: {
      quote: L(
        "Algiers the white — a city that looks at the sea and dares it to forget her.",
        "Alger la blanche — une ville qui regarde la mer et la défie de l'oublier.",
        "الجزائر البيضاء — مدينةٌ تنظر إلى البحر فتتحدّاه أن ينساها.",
      ),
    },
  },

  constantine: {
    geography: L(
      "A city built on a cliff above the Rhumel gorge, stitched together by suspended bridges that seem to float.",
      "Une ville bâtie sur une falaise au-dessus des gorges du Rhumel, cousue par des ponts suspendus qui semblent flotter.",
      "مدينةٌ مبنيّة على صخرةٍ فوق وادي الرمال، تربط بين أحيائها جسورٌ معلّقة تكاد تطفو.",
    ),
    historicalSignificance: L(
      "Ancient Cirta, capital of Numidia and Massinissa's stronghold; later renamed for the Roman emperor Constantine; later still the heart of Ahmed Bey's resistance and Ben Badis's reform.",
      "L'ancienne Cirta, capitale de Numidie et bastion de Massinissa ; renommée plus tard pour l'empereur Constantin ; foyer ensuite de la résistance d'Ahmed Bey et de la réforme de Ben Badis.",
      "سيرتا القديمة، عاصمة نوميديا ومعقل ماسينيسا، ثم سُمّيت لاحقًا باسم الإمبراطور قسنطين، وصارت بعدئذٍ قلب مقاومة أحمد باي وإصلاح ابن باديس.",
    ),
    culturalImportance: L(
      "A city of scholars and of malouf — the refined Andalusian music that survived here long after Granada fell.",
      "Une ville de savants et du malouf — la musique andalouse raffinée qui a survécu ici longtemps après la chute de Grenade.",
      "مدينةُ علماءٍ وملوف، تلك الموسيقى الأندلسية الراقية التي بقيت هنا طويلًا بعد سقوط غرناطة.",
    ),
    eraIds: ["earlynorthafrica", "numidia", "roman", "islamic", "french"],
    culturePillars: [
      {
        emoji: "🌉",
        label: L("Bridges", "Ponts", "الجسور"),
        body: L(
          "Sidi M'Cid, Sidi Rached and El-Kantara — engineering hung above a canyon, used every day.",
          "Sidi M'Cid, Sidi Rached et El-Kantara — une ingénierie suspendue au-dessus d'un canyon, empruntée chaque jour.",
          "سيدي مسيد وسيدي راشد والقنطرة، هندسةٌ معلّقة فوق وادٍ يَعبرها الناس كلّ يوم.",
        ),
      },
      {
        emoji: "🎼",
        label: L("Malouf", "Malouf", "المالوف"),
        body: L(
          "The Andalusian musical tradition preserved by Constantine's masters for generations.",
          "La tradition musicale andalouse préservée par les maîtres de Constantine depuis des générations.",
          "التقليد الموسيقي الأندلسي الذي حفظه أساتذة قسنطينة جيلًا بعد جيل.",
        ),
      },
      {
        emoji: "📖",
        label: L("Scholarship", "Savoir", "العلم"),
        body: L(
          "Ben Badis founded the Association of Algerian Muslim Scholars here in 1931.",
          "Ben Badis y fonda l'Association des oulémas musulmans algériens en 1931.",
          "أسّس ابن باديس فيها جمعية العلماء المسلمين الجزائريين عام 1931.",
        ),
      },
      {
        emoji: "🍽️",
        label: L("Table", "Table", "المائدة"),
        body: L(
          "Chakhchoukha and trida — patient, hand-rolled dishes that taste of family Friday mornings.",
          "Chakhchoukha et trida — plats patients, roulés à la main, au goût des matins de vendredi en famille.",
          "الشخشوخة والطريدة، أطباقٌ صابرة تُلَفّ يدويًا، تحمل طعم صباحات الجمعة العائلية.",
        ),
      },
    ],
    museumNotes: [
      {
        title: L("The city of the rock", "La ville du rocher", "مدينةُ الصخرة"),
        body: L(
          "For two millennia, Constantine has defended itself simply by being itself — a fortress shaped by geology.",
          "Pendant deux millénaires, Constantine s'est défendue en étant simplement elle-même — une forteresse façonnée par la géologie.",
          "طوال ألفي عام، دافعت قسنطينة عن نفسها بكونها هي فحسب — قلعةٌ صاغتها الجيولوجيا.",
        ),
      },
    ],
    nearbyRegionIds: ["aures", "kabylie", "algiers"],
    reflection: {
      quote: L(
        "A city you do not enter — you climb into.",
        "Une ville où l'on n'entre pas — on y monte.",
        "مدينةٌ لا تدخلها — بل تصعد إليها.",
      ),
    },
  },

  "oran-west": {
    geography: L(
      "A coast and a wide plain — vineyards, wheat, olive groves, and the ports of Oran, Mostaganem and Arzew.",
      "Une côte et une grande plaine — vignes, blé, oliveraies, et les ports d'Oran, Mostaganem et Arzew.",
      "ساحلٌ وسهلٌ واسع — كروم وقمح وزيتون، وموانئ وهران ومستغانم وأرزيو.",
    ),
    historicalSignificance: L(
      "Home of Emir Abdelkader's 15-year resistance, of Tlemcen the medieval capital, and of Ahmed Zabana, whose execution in 1956 set the West on fire.",
      "Pays de la résistance de 15 ans de l'Émir Abdelkader, de Tlemcen capitale médiévale, et d'Ahmed Zabana, dont l'exécution en 1956 embrasa l'Ouest.",
      "بلاد مقاومة الأمير عبد القادر خمس عشرة سنة، وتلمسان عاصمة العصور الوسطى، وأحمد زبانة الذي أشعل إعدامه عام 1956 الغرب.",
    ),
    culturalImportance: L(
      "Birthplace of raï music, of a vibrant Andalusian heritage in Tlemcen, and of a cosmopolitan port culture in Oran.",
      "Berceau du raï, d'un vibrant héritage andalou à Tlemcen, et d'une culture portuaire cosmopolite à Oran.",
      "مهد الراي، وإرثٍ أندلسي نابض في تلمسان، وثقافةٍ مينائيّة كوزموبوليتية في وهران.",
    ),
    eraIds: ["islamic", "ottoman", "french", "independence"],
    culturePillars: [
      {
        emoji: "🎤",
        label: L("Raï", "Raï", "الراي"),
        body: L(
          "From the cabarets of Oran, raï became a global voice of youth, longing and reinvention.",
          "Depuis les cabarets d'Oran, le raï est devenu une voix mondiale de la jeunesse, du désir et de la réinvention.",
          "من ملاهي وهران، صار الراي صوتًا عالميًا للشباب والشوق وإعادة الاختراع.",
        ),
      },
      {
        emoji: "🕌",
        label: L("Tlemcen", "Tlemcen", "تلمسان"),
        body: L(
          "Mosques, madrasas and Andalusian gardens — a medieval capital that hosted scholars and musicians from Granada.",
          "Mosquées, madrasas et jardins andalous — une capitale médiévale qui accueillit savants et musiciens de Grenade.",
          "مساجد ومدارس وحدائق أندلسية — عاصمةٌ من العصور الوسطى استضافت علماء غرناطة وموسيقيّيها.",
        ),
      },
      {
        emoji: "🍞",
        label: L("Table", "Table", "المائدة"),
        body: L(
          "Karantika in Oran, harira on rainy nights, fresh fish along the corniche.",
          "Karantika à Oran, harira les soirs de pluie, poisson frais sur la corniche.",
          "كرنتيكا في وهران، وحريرة في ليالي المطر، وسمكٌ طازج على الكورنيش.",
        ),
      },
      {
        emoji: "⚓",
        label: L("Sea trade", "Commerce maritime", "التجارة البحرية"),
        body: L(
          "Western ports linked Algeria to Spain, Italy and West Africa long before modern maps existed.",
          "Les ports de l'ouest reliaient l'Algérie à l'Espagne, l'Italie et l'Afrique de l'Ouest bien avant les cartes modernes.",
          "ربطت موانئ الغرب الجزائرَ بإسبانيا وإيطاليا وغرب إفريقيا قبل الخرائط الحديثة بزمن طويل.",
        ),
      },
    ],
    museumNotes: [
      {
        title: L("Abdelkader's state", "L'État d'Abdelkader", "دولة عبد القادر"),
        body: L(
          "Between 1832 and 1847, the Emir built an early-modern Algerian state with its own coinage, schools and army.",
          "Entre 1832 et 1847, l'Émir bâtit un État algérien moderne précoce, avec sa monnaie, ses écoles et son armée.",
          "بين 1832 و1847، أسّس الأمير دولةً جزائرية حديثة مبكرة بعملتها ومدارسها وجيشها.",
        ),
      },
    ],
    nearbyRegionIds: ["algiers", "sahara", "kabylie"],
    reflection: {
      quote: L(
        "The west sings what the rest of the country whispers.",
        "L'ouest chante ce que le reste du pays murmure.",
        "الغرب يُغنّي ما يهمس به سائر البلاد.",
      ),
    },
  },

  sahara: {
    geography: L(
      "About eighty percent of Algeria — dunes, hamadas, oases, and night skies so wide they teach humility.",
      "Environ quatre-vingts pour cent de l'Algérie — dunes, hamadas, oasis et ciels nocturnes si vastes qu'ils enseignent l'humilité.",
      "نحو ثمانين في المئة من الجزائر — كثبان وحمادات وواحات وسماواتُ ليلٍ شاسعة تعلّم التواضع.",
    ),
    historicalSignificance: L(
      "Crossed for centuries by trans-Saharan caravans, painted long before pyramids by the artists of Tassili n'Ajjer, and ruled in spirit by the Tuareg people of Tamasheq and Tifinagh.",
      "Traversée des siècles durant par les caravanes transsahariennes, peinte bien avant les pyramides par les artistes du Tassili n'Ajjer, et gouvernée en esprit par les Touaregs de tamasheq et tifinagh.",
      "عبرتها قوافل الصحراء الكبرى قرونًا، ورسمها فنّانو طاسيلي ناجر قبل الأهرامات بزمنٍ طويل، ويحكمها روحًا الطوارقُ بلغتهم تاماشق وكتابتهم تيفيناغ.",
    ),
    culturalImportance: L(
      "A library of rock art older than 8,000 years, oasis architectures unique in the world, and a Tuareg poetry that turns silence into language.",
      "Une bibliothèque d'art rupestre vieille de plus de 8 000 ans, des architectures d'oasis uniques au monde, et une poésie touarègue qui fait du silence une langue.",
      "مكتبةٌ من النقوش الصخرية يزيد عمرها على 8000 سنة، وعمارة واحاتٍ فريدة في العالم، وشعرٌ طارقي يحوّل الصمت إلى لغة.",
    ),
    eraIds: ["earlynorthafrica", "islamic", "french", "independence"],
    culturePillars: [
      {
        emoji: "🪨",
        label: L("Tassili rock art", "Art rupestre du Tassili", "نقوش طاسيلي"),
        body: L(
          "Hunters, dancers and lost rivers painted on stone — a Saharan past that was once green.",
          "Chasseurs, danseurs et rivières disparues peints sur la pierre — un Sahara qui fut un jour vert.",
          "صيّادون وراقصون وأنهارٌ غائبة على الحجر — صحراء كانت يومًا خضراء.",
        ),
      },
      {
        emoji: "🏚️",
        label: L("Ksour & oases", "Ksour et oasis", "القصور والواحات"),
        body: L(
          "Ghardaïa, Timimoun, Djanet — earth-built towns shaped by sun, palm and water management.",
          "Ghardaïa, Timimoun, Djanet — villes en terre façonnées par le soleil, le palmier et la gestion de l'eau.",
          "غرداية وتيميمون وجانت — مدنٌ من الطين شكّلتها الشمس والنخلة وإدارة الماء.",
        ),
      },
      {
        emoji: "ⵣ",
        label: L("Tuareg memory", "Mémoire touarègue", "الذاكرة الطارقية"),
        body: L(
          "Tamasheq and Tifinagh keep alive the legacy of queen Tin Hinan, the mother-figure of the desert.",
          "Tamasheq et tifinagh perpétuent l'héritage de la reine Tin Hinan, figure-mère du désert.",
          "تاماشق وتيفيناغ تُبقيان حيًّا إرث الملكة تين هينان، أمّ الصحراء.",
        ),
      },
      {
        emoji: "🫓",
        label: L("Desert table", "Table du désert", "مائدة الصحراء"),
        body: L(
          "Taguella, dates and mint tea — food born of long journeys and longer evenings.",
          "Taguella, dattes et thé à la menthe — cuisine née de longs voyages et de soirées plus longues encore.",
          "تاقلّة وتمر وشاي بالنعناع — مأكولاتٌ وُلدت من رحلاتٍ طويلة وأمسياتٍ أطول.",
        ),
      },
    ],
    museumNotes: [
      {
        title: L("Caravans of salt and gold", "Caravanes de sel et d'or", "قوافل الملح والذهب"),
        body: L(
          "For centuries, Algerian oases were ports of the desert, linking the Mediterranean world to Timbuktu.",
          "Pendant des siècles, les oasis algériennes furent des ports du désert, reliant le monde méditerranéen à Tombouctou.",
          "ظلّت الواحات الجزائرية قرونًا موانئ للصحراء تربط عالم المتوسط بتمبكتو.",
        ),
      },
    ],
    nearbyRegionIds: ["oran-west", "aures", "constantine"],
    reflection: {
      quote: L(
        "In the desert, even silence has a direction.",
        "Dans le désert, même le silence a une direction.",
        "في الصحراء، حتى للصمت اتّجاه.",
      ),
      attribution: L("Tuareg saying", "Parole touarègue", "قولٌ طارقي"),
    },
  },
};

export function getRegionExtras(id: string): RegionExtras | undefined {
  return regionExtras[id];
}

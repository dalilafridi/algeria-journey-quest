import type { Localized, LocalizedString } from "@/lib/i18n";

const L = (en: string, fr: string, ar: string): Localized<string> => ({ en, fr, ar });

export type MapRegion = {
  id: string;
  name: LocalizedString;
  emoji: string;
  /** 2–3 line summary. */
  summary: LocalizedString;
  /** Short focus tag (e.g., "Amazigh identity"). */
  focus: LocalizedString;
  /** 5–7 key historical facts. */
  facts: LocalizedString[];
  /** Figure IDs from src/data/figures.ts. */
  figureIds: string[];
  eraId?: string;
};

export const mapRegions: MapRegion[] = [
  {
    id: "kabylie",
    emoji: "🏔️",
    name: L("Kabylie", "Kabylie", "القبائل"),
    focus: L("Amazigh identity & culture", "Identité et culture amazighes", "الهوية والثقافة الأمازيغية"),
    summary: L(
      "A mountainous region in the north, heart of Amazigh language, music and memory.",
      "Une région montagneuse du nord, cœur de la langue, de la musique et de la mémoire amazighes.",
      "منطقة جبلية في الشمال، قلب اللغة والموسيقى والذاكرة الأمازيغية."
    ),
    facts: [
      L("Home to the Kabyle Amazigh people and the Tamazight language.", "Berceau du peuple kabyle amazigh et de la langue tamazight.", "موطن الشعب القبائلي الأمازيغي ولغة تامازيغت."),
      L("Site of the 1956 Soummam Congress, which organised the independence struggle.", "Lieu du Congrès de la Soummam (1956), qui a structuré la lutte pour l'indépendance.", "شهدت مؤتمر الصومام (1956) الذي نظّم الكفاح من أجل الاستقلال."),
      L("In 1980, Tafsut Imazighen (Berber Spring) defended Amazigh language and identity.", "En 1980, Tafsut Imazighen (Printemps berbère) a défendu la langue et l'identité amazighes.", "في 1980، دافعت تافسوت إيمازيغن (الربيع الأمازيغي) عن اللغة والهوية الأمازيغية."),
      L("Tamazight became an official national language of Algeria in 2016.", "Tamazight est devenue langue officielle de l'Algérie en 2016.", "أصبحت تامازيغت لغة وطنية رسمية في الجزائر سنة 2016."),
      L("Famous for poetry, song and a strong oral tradition.", "Célèbre pour sa poésie, sa chanson et une forte tradition orale.", "تشتهر بالشعر والأغنية وتقاليد شفهية قوية."),
      L("Lalla Fatma N'Soumer led mountain resistance against French troops in the 1850s.", "Lalla Fatma N'Soumer a mené la résistance des montagnes face aux troupes françaises dans les années 1850.", "قادت لالة فاطمة نسومر مقاومة الجبال ضد القوات الفرنسية في خمسينيات القرن 19."),
    ],
    figureIds: ["ait-menguellet", "matoub", "idir", "mammeri", "abane-ramdane", "lalla-fatma-nsoumer"],
  },
  {
    id: "aures",
    emoji: "⛰️",
    name: L("Aurès", "Aurès", "الأوراس"),
    focus: L("Cradle of the Revolution", "Berceau de la Révolution", "مهد الثورة"),
    summary: L(
      "Eastern mountains where the war of independence began on November 1, 1954.",
      "Montagnes de l'est où la guerre d'indépendance a commencé le 1er novembre 1954.",
      "جبال شرقية انطلقت منها حرب الاستقلال في 1 نوفمبر 1954."
    ),
    facts: [
      L("The first shots of the Algerian Revolution were fired here on 1 November 1954.", "Les premiers coups de feu de la Révolution algérienne y ont retenti le 1ᵉʳ novembre 1954.", "انطلقت أولى رصاصات الثورة الجزائرية من هنا في 1 نوفمبر 1954."),
      L("Mostefa Ben Boulaïd, called 'father of the revolution', led the Aurès region.", "Mostefa Ben Boulaïd, surnommé 'père de la révolution', dirigeait la région des Aurès.", "قاد مصطفى بن بولعيد، الملقّب بـ«أبو الثورة»، منطقة الأوراس."),
      L("Long ago, queen Dihya led Amazigh resistance in these mountains.", "Jadis, la reine Dihya a mené la résistance amazighe dans ces montagnes.", "قديماً، قادت الملكة ديهيا المقاومة الأمازيغية في هذه الجبال."),
      L("The Chaoui people preserve a rich Amazigh culture here.", "Les Chaouis y préservent une riche culture amazighe.", "يحافظ الشاوية هنا على ثقافة أمازيغية غنية."),
      L("Rugged terrain made the Aurès a natural shelter for fighters.", "Le relief escarpé a fait des Aurès un refuge naturel pour les combattants.", "جعلت التضاريس الوعرة من الأوراس ملاذاً طبيعياً للمقاومين."),
      L("Larbi Ben M'hidi, a key revolutionary leader, came from the east of Algeria.", "Larbi Ben M'hidi, dirigeant révolutionnaire majeur, venait de l'est de l'Algérie.", "ينحدر العربي بن مهيدي، أحد كبار قادة الثورة، من شرق الجزائر."),
    ],
    figureIds: ["mostefa-ben-boulaid", "dihya", "ben-mhidi"],
  },
  {
    id: "algiers",
    emoji: "🏛️",
    name: L("Algiers", "Alger", "الجزائر العاصمة"),
    focus: L("Capital & political heart", "Capitale et cœur politique", "العاصمة والقلب السياسي"),
    summary: L(
      "Mediterranean port and capital — the political and cultural center of the country.",
      "Port méditerranéen et capitale — centre politique et culturel du pays.",
      "ميناء متوسطي وعاصمة — المركز السياسي والثقافي للبلاد."
    ),
    facts: [
      L("Founded in antiquity, Algiers became a major Mediterranean port.", "Fondée dans l'Antiquité, Alger est devenue un grand port méditerranéen.", "تأسست في العصور القديمة وأصبحت ميناءً متوسطياً كبيراً."),
      L("From the 16th to 19th century it was the seat of the Regency of Algiers.", "Du XVIᵉ au XIXᵉ siècle, elle fut le siège de la Régence d'Alger.", "كانت من القرن 16 إلى القرن 19 مقرّ إيالة الجزائر."),
      L("The famous Casbah is a UNESCO World Heritage site.", "La célèbre Casbah est inscrite au patrimoine mondial de l'UNESCO.", "القصبة الشهيرة مصنّفة ضمن التراث العالمي لليونسكو."),
      L("The Battle of Algiers (1956–57) became a symbol of urban resistance.", "La Bataille d'Alger (1956–57) est devenue un symbole de la résistance urbaine.", "أصبحت معركة الجزائر (1956–57) رمزاً للمقاومة المدنية."),
      L("Algeria declared independence here on 5 July 1962.", "L'Algérie y a proclamé son indépendance le 5 juillet 1962.", "أعلنت الجزائر استقلالها هنا في 5 جويلية 1962."),
      L("Today it hosts the government, universities and major cultural institutions.", "Elle abrite aujourd'hui le gouvernement, les universités et les grandes institutions culturelles.", "تحتضن اليوم الحكومة والجامعات وأهم المؤسسات الثقافية."),
    ],
    figureIds: ["ferhat-abbas", "boumediene", "ali-la-pointe", "hassiba-ben-bouali"],
  },
  {
    id: "constantine",
    emoji: "🌉",
    name: L("Constantine", "Constantine", "قسنطينة"),
    focus: L("Ancient city & scholarship", "Ville antique et savoir", "مدينة عريقة وعلم"),
    summary: L(
      "An ancient city built on cliffs, known for bridges, scholars and music.",
      "Une cité antique bâtie sur des falaises, célèbre pour ses ponts, ses savants et sa musique.",
      "مدينة عريقة مبنية على الصخور، تشتهر بجسورها وعلمائها وموسيقاها."
    ),
    facts: [
      L("Known in antiquity as Cirta, capital of the Numidian kingdom.", "Connue dans l'Antiquité sous le nom de Cirta, capitale du royaume numide.", "عُرفت قديماً باسم سيرتا عاصمة المملكة النوميدية."),
      L("Renamed Constantine after the Roman emperor Constantine.", "Renommée Constantine en l'honneur de l'empereur romain Constantin.", "أُعيدت تسميتها قسنطينة نسبةً للإمبراطور الروماني قسنطين."),
      L("Famous for its dramatic gorges and suspension bridges.", "Célèbre pour ses gorges spectaculaires et ses ponts suspendus.", "تشتهر بأخاديدها المهيبة وجسورها المعلّقة."),
      L("Ahmed Bey resisted the French conquest from Constantine in the 1830s.", "Ahmed Bey a résisté à la conquête française depuis Constantine dans les années 1830.", "قاوم أحمد باي الغزو الفرنسي انطلاقاً من قسنطينة في ثلاثينيات القرن 19."),
      L("Ben Badis founded the Association of Algerian Muslim Scholars here in 1931.", "Ben Badis y a fondé l'Association des oulémas musulmans algériens en 1931.", "أسس بن باديس فيها جمعية العلماء المسلمين الجزائريين سنة 1931."),
      L("It is a center of malouf, a refined Andalusian musical tradition.", "C'est un foyer du malouf, une tradition musicale andalouse raffinée.", "تُعدّ مركزاً للمالوف، تقليد موسيقي أندلسي راقٍ."),
    ],
    figureIds: ["ahmed-bey", "massinissa"],
  },
  {
    id: "oran-west",
    emoji: "🌾",
    name: L("Western Algeria", "Algérie de l'Ouest", "الغرب الجزائري"),
    focus: L("Early resistance & trade", "Résistance précoce et commerce", "المقاومة المبكرة والتجارة"),
    summary: L(
      "Coast and plains in the west — fertile lands, busy ports, and the heart of early resistance.",
      "Côte et plaines de l'ouest — terres fertiles, ports actifs et foyer des premières résistances.",
      "ساحل وسهول في الغرب — أراضٍ خصبة وموانئ نشطة وموطن أولى المقاومات."
    ),
    facts: [
      L("Emir Abdelkader led a 15-year resistance (1832–1847) against French colonisation.", "L'Émir Abdelkader a mené une résistance de 15 ans (1832–1847) contre la colonisation française.", "قاد الأمير عبد القادر مقاومة دامت 15 سنة (1832–1847) ضد الاستعمار الفرنسي."),
      L("He built an early modern Algerian state with its own administration and army.", "Il a bâti un État algérien moderne précoce, doté d'une administration et d'une armée.", "أسّس دولة جزائرية حديثة مبكرة بإدارة وجيش خاصين."),
      L("Oran is a major port and the country's second-largest city.", "Oran est un grand port et la deuxième ville du pays.", "وهران ميناء كبير وثاني أكبر مدينة في البلاد."),
      L("The west is rich in wheat fields, vineyards and olive groves.", "L'ouest est riche en champs de blé, vignobles et oliveraies.", "الغرب غنيّ بحقول القمح والكروم والزيتون."),
      L("Tlemcen was a great medieval capital of arts, sciences and Andalusian heritage.", "Tlemcen fut une grande capitale médiévale des arts, des sciences et de l'héritage andalou.", "كانت تلمسان عاصمة عظيمة في العصور الوسطى للفنون والعلوم والإرث الأندلسي."),
      L("Ahmed Zabana, executed in 1956, became a symbol of revolutionary courage.", "Ahmed Zabana, exécuté en 1956, est devenu un symbole du courage révolutionnaire.", "أصبح أحمد زبانة، الذي أُعدم سنة 1956، رمزاً للشجاعة الثورية."),
    ],
    figureIds: ["abdelkader"],
  },
  {
    id: "sahara",
    emoji: "🐪",
    name: L("Sahara", "Sahara", "الصحراء"),
    focus: L("Vast desert, trade & Tuareg culture", "Vaste désert, commerce et culture touarègue", "صحراء شاسعة وتجارة وثقافة طارقية"),
    summary: L(
      "A vast southern desert of dunes, oases and ancient caravan routes.",
      "Un vaste désert du sud, fait de dunes, d'oasis et d'anciennes routes caravanières.",
      "صحراء جنوبية شاسعة من الكثبان والواحات وطرق القوافل القديمة."
    ),
    facts: [
      L("Covers about 80% of Algeria's territory.", "Couvre environ 80 % du territoire algérien.", "تغطي نحو 80٪ من مساحة الجزائر."),
      L("Tassili n'Ajjer holds rock art over 8,000 years old.", "Le Tassili n'Ajjer abrite des peintures rupestres vieilles de plus de 8 000 ans.", "يحتضن الطاسيلي ناجر نقوشاً صخرية يزيد عمرها على 8000 سنة."),
      L("Trans-Saharan caravans linked North Africa to West Africa for centuries.", "Les caravanes transsahariennes ont relié l'Afrique du Nord à l'Afrique de l'Ouest durant des siècles.", "ربطت قوافل عبر الصحراء شمال إفريقيا بغربها لقرون."),
      L("The Tuareg people preserve a distinct language (Tamasheq) and ancient script (Tifinagh).", "Les Touaregs préservent une langue propre (tamasheq) et une écriture ancienne (tifinagh).", "يحافظ الطوارق على لغة خاصة (تاماشق) وكتابة عريقة (تيفيناغ)."),
      L("Tin Hinan is remembered as the legendary mother-queen of the Tuareg.", "Tin Hinan est célébrée comme la reine-mère légendaire des Touaregs.", "تُذكر تين هينان بوصفها الأم-الملكة الأسطورية للطوارق."),
      L("Oases like Ghardaïa, Timimoun and Djanet shelter unique architecture and life.", "Des oasis comme Ghardaïa, Timimoun et Djanet abritent une architecture et une vie uniques.", "واحات مثل غرداية وتيميمون وجانت تحتضن عمارة وحياة فريدة."),
      L("The desert holds major reserves of oil, gas and solar potential.", "Le désert recèle d'importantes réserves de pétrole, de gaz et un grand potentiel solaire.", "تحتوي الصحراء على احتياطات مهمة من النفط والغاز وطاقة شمسية كبيرة."),
    ],
    figureIds: ["moufdi-zakaria"],
  },
];

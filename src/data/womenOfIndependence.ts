/**
 * Women of the Algerian Revolution (1954 – 1962) — foundation exhibit data.
 *
 * A single reusable, trilingual data structure so the exhibit can grow without
 * rebuilding the page. Everything the route renders is declared here: roles,
 * named figures, contextual figures (statistics), sources and the curator's
 * "living exhibit" note.
 *
 * Editorial rules for this file:
 *  - No invented quotations, ranks, titles, relationships or personal details.
 *  - Numerical findings must carry their attribution (Djamila Amrane-Minne).
 *  - Life dates are only recorded when already carried by a verified DZ Odyssey
 *    figure record or by the referenced overview source. `datesNeedSourcing`
 *    marks entries whose dates are deliberately withheld until a stronger
 *    source is added.
 *
 * FUTURE SOURCING PRIORITY (internal note, not rendered):
 *   1. Published scholarship (Amrane-Minne and later historians).
 *   2. Algerian national archives and wilaya archives.
 *   3. Museum and institutional collections.
 *   4. Recorded testimony and oral history projects.
 *   5. Family archives supplied with written permission.
 *   6. Rights-cleared historical photographs.
 */

import type { LocalizedString } from "@/lib/i18n";

const L = (en: string, fr: string, ar: string): LocalizedString => ({ en, fr, ar });

/* ------------------------------------------------------------------ types */

/** A form of participation, with the Algerian term preserved in all three languages. */
export interface ResistanceRole {
  id: string;
  /** Preserved Algerian term, identical in every language. */
  term?: string;
  heading: LocalizedString;
  /** Short definition shown on first use of the term. */
  definition?: LocalizedString;
  body: LocalizedString;
}

/** One woman recorded in the exhibit. */
export interface WomanEntry {
  id: string;
  displayName: LocalizedString;
  /** Life dates when supported by an existing verified record. */
  years?: string;
  /** One concise sentence describing her documented role. */
  role: LocalizedString;
  /** Existing internal figure route id, when a verified page already exists. */
  figureId?: string;
  /** True when the exhibit deliberately withholds dates pending stronger sourcing. */
  datesNeedSourcing?: boolean;
  /** Foundation note shown when no internal page exists yet. */
  note?: LocalizedString;
  /** Reserved for future expansion. */
  region?: string;
  oralHistoryIds?: string[];
  mediaIds?: string[];
  relatedExhibits?: string[];
}

/** An attributed statistical finding. */
export interface ContextFigure {
  value: LocalizedString;
  label: LocalizedString;
}

/* --------------------------------------------------------------- identity */

export const WOI_ROUTE = "/women-of-independence";

export const WOI_IDENTITY = {
  title: L(
    "Women of the Algerian Revolution",
    "Les femmes de la Révolution algérienne",
    "نساء الثورة الجزائرية",
  ),
  subtitle: L(
    "Their courage took many forms.",
    "Leur courage a pris de nombreuses formes.",
    "اتخذت شجاعتهن أشكالاً متعددة.",
  ),
  dateRange: "1954 – 1962",
  eyebrow: L(
    "Foundation exhibit · War of Independence",
    "Exposition fondatrice · Guerre d'indépendance",
    "معرض تأسيسي · حرب الاستقلال",
  ),
  teaser: L(
    "The many roles Algerian women held during the War of Independence, in homes, villages, hospitals, prisons, cities and the maquis.",
    "Les multiples rôles des femmes algériennes pendant la guerre d'indépendance, dans les foyers, les villages, les hôpitaux, les prisons, les villes et les maquis.",
    "الأدوار المتعددة التي أدّتها الجزائريات خلال حرب الاستقلال، في البيوت والقرى والمستشفيات والسجون والمدن والجبال.",
  ),
};

/* ---------------------------------------------------------------- opening */

export const WOI_OPENING: LocalizedString[] = [
  L(
    "The struggle for Algerian independence was carried not only across mountains and battlefields, but through homes, villages, hospitals, prisons, city streets, and hidden networks of communication. Women carried messages, gathered intelligence, treated the wounded, raised funds, prepared food and clothing, sheltered militants, transported supplies and weapons, organized communities, and, in some cases, took part directly in armed operations.",
    "La lutte pour l'indépendance algérienne ne s'est pas menée seulement dans les montagnes et sur les champs de bataille, mais aussi dans les foyers, les villages, les hôpitaux, les prisons, les rues des villes et des réseaux de communication clandestins. Des femmes ont transporté des messages, recueilli des renseignements, soigné les blessés, collecté des fonds, préparé la nourriture et les vêtements, hébergé des militants, acheminé des vivres et des armes, organisé des communautés et, dans certains cas, pris part directement à des opérations armées.",
    "لم يُخَض النضال من أجل استقلال الجزائر في الجبال وساحات القتال وحدها، بل أيضاً في البيوت والقرى والمستشفيات والسجون وشوارع المدن وشبكات الاتصال السرية. حملت النساء الرسائل، وجمعن المعلومات، وعالجن الجرحى، وجمعن الأموال، وأعددن الطعام والملابس، وآوين المناضلين، ونقلن المؤن والسلاح، ونظّمن مجتمعاتهن، وشاركن في بعض الحالات مباشرةً في عمليات مسلحة.",
  ),
  L(
    "Some became nationally recognized. Many others remained unnamed outside their families and local communities. Their experiences were not identical, but together they reveal a history of courage, sacrifice, political conviction, survival, and memory that cannot be separated from the story of Algerian independence.",
    "Certaines sont devenues des figures nationales. Beaucoup d'autres sont restées sans nom au-delà de leur famille et de leur communauté. Leurs expériences n'ont pas été identiques, mais ensemble elles révèlent une histoire de courage, de sacrifice, de conviction politique, de survie et de mémoire, indissociable du récit de l'indépendance algérienne.",
    "بعضهن صرن معروفات على المستوى الوطني، وكثيرات أخريات بقين بلا أسماء خارج عائلاتهن ومجتمعاتهن المحلية. لم تكن تجاربهن متطابقة، لكنها مجتمعةً تكشف تاريخاً من الشجاعة والتضحية والقناعة السياسية والصمود والذاكرة، لا يمكن فصله عن قصة استقلال الجزائر.",
  ),
];

/* ------------------------------------------------------- forms of resistance */

export const WOI_ROLES_HEADING = L(
  "Many forms of resistance",
  "Les multiples formes de la résistance",
  "أشكال متعددة من المقاومة",
);

export const WOI_ROLES: ResistanceRole[] = [
  {
    id: "moussebilates",
    term: "moussebilates",
    heading: L("From within the home", "Depuis l'intérieur du foyer", "من داخل البيت"),
    definition: L(
      "Moussebilates: civilian women who supported the resistance from their homes and neighbourhoods.",
      "Moussebilates : civiles qui soutenaient la résistance depuis leur foyer et leur quartier.",
      "المسبّلات: نساء مدنيات دعمن المقاومة انطلاقاً من بيوتهن وأحيائهن.",
    ),
    body: L(
      "Moussebilates formed essential networks of shelter, food, clothing, fundraising, intelligence, medical assistance and communication. Homes became places of refuge and coordination, often placing entire families at risk. Their work was less visible than armed action, but it sustained the struggle from one day to the next.",
      "Les moussebilates ont formé des réseaux essentiels d'hébergement, de nourriture, de vêtements, de collecte de fonds, de renseignement, d'aide médicale et de communication. Les foyers sont devenus des lieux de refuge et de coordination, exposant souvent des familles entières. Leur travail était moins visible que l'action armée, mais il a fait tenir la lutte d'un jour à l'autre.",
      "شكّلت المسبّلات شبكات أساسية للإيواء والغذاء والملبس وجمع الأموال والاستخبار والإسعاف الطبي والاتصال. تحوّلت البيوت إلى أماكن لجوء وتنسيق، وهو ما كان يعرّض عائلات بأكملها للخطر. كان عملهن أقل ظهوراً من العمل المسلح، لكنه أبقى النضال قائماً يوماً بعد يوم.",
    ),
  },
  {
    id: "maquisardes",
    term: "maquisardes",
    heading: L("In the maquis", "Dans le maquis", "في الجبال"),
    definition: L(
      "Maquisardes: women who lived and worked with the fighting units in the maquis, the rural strongholds of the resistance.",
      "Maquisardes : femmes qui vivaient et agissaient avec les unités combattantes du maquis, les bastions ruraux de la résistance.",
      "المجاهدات في الجبال: نساء عشن وعملن مع الوحدات المقاتلة في الجبال، معاقل المقاومة الريفية.",
    ),
    body: L(
      "Women who joined the maquis endured hunger, cold, long marches, military pressure and the constant possibility of capture or death. Some served as nurses, couriers and organizers. Their presence also challenged expectations about where women belonged and what responsibilities they could assume.",
      "Les femmes qui ont rejoint le maquis ont enduré la faim, le froid, de longues marches, la pression militaire et la possibilité constante d'être capturées ou tuées. Certaines étaient infirmières, agents de liaison ou organisatrices. Leur présence a également bousculé les attentes sur la place des femmes et sur les responsabilités qu'elles pouvaient assumer.",
      "عانت النساء اللواتي التحقن بالجبال من الجوع والبرد والمسيرات الطويلة والضغط العسكري واحتمال الأسر أو الموت في كل لحظة. عملت بعضهن ممرضات ومكلفات بالاتصال ومنظّمات. كما أن وجودهن زعزع التصورات السائدة عن مكانة المرأة وعن المسؤوليات التي يمكن أن تتحملها.",
    ),
  },
  {
    id: "fidayate",
    term: "fidayate",
    heading: L("In urban networks", "Dans les réseaux urbains", "في الشبكات الحضرية"),
    definition: L(
      "Fidayate: women who took part in clandestine armed operations in the cities.",
      "Fidayate : femmes engagées dans des opérations armées clandestines en ville.",
      "الفدائيات: نساء شاركن في عمليات مسلحة سرية داخل المدن.",
    ),
    body: L(
      "A smaller number of women participated directly in clandestine urban operations, including transporting weapons and placing explosives. Their ability to move through colonial checkpoints was used by resistance networks during the Battle of Algiers. These operations had deadly consequences and must be presented as part of the history of war, without turning violence into spectacle.",
      "Un nombre plus restreint de femmes a participé directement à des opérations urbaines clandestines, notamment le transport d'armes et la pose d'explosifs. Leur capacité à franchir les contrôles coloniaux a été utilisée par les réseaux de la résistance pendant la Bataille d'Alger. Ces opérations ont eu des conséquences meurtrières et doivent être présentées comme une part de l'histoire de la guerre, sans faire de la violence un spectacle.",
      "شارك عدد أقل من النساء مباشرةً في عمليات حضرية سرية، من بينها نقل السلاح ووضع المتفجرات. استفادت شبكات المقاومة من قدرتهن على تجاوز نقاط التفتيش الاستعمارية خلال معركة الجزائر. كانت لهذه العمليات نتائج دامية، ويجب تقديمها بوصفها جزءاً من تاريخ الحرب، من دون تحويل العنف إلى مشهد استعراضي.",
    ),
  },
  {
    id: "everyday",
    term: "moudjahidate",
    heading: L(
      "The work history rarely records",
      "Le travail que l'histoire retient rarement",
      "العمل الذي نادراً ما يسجّله التاريخ",
    ),
    definition: L(
      "Moudjahidate: the recognized women participants of the war of liberation, whatever the form their engagement took.",
      "Moudjahidate : les participantes reconnues de la guerre de libération, quelle qu'ait été la forme de leur engagement.",
      "المجاهدات: المشاركات المعترف بهن في حرب التحرير، أياً كان شكل التزامهن.",
    ),
    body: L(
      "Women carried letters, collected money, gathered information, sewed clothing, prepared medicine, shared warnings, protected children and maintained households under extraordinary pressure. Much of this work left few official records, even though it was indispensable to the survival of resistance networks.",
      "Des femmes ont porté des lettres, collecté de l'argent, recueilli des informations, cousu des vêtements, préparé des médicaments, transmis des alertes, protégé des enfants et tenu des foyers sous une pression extraordinaire. Ce travail n'a laissé que peu de traces officielles, alors qu'il était indispensable à la survie des réseaux de la résistance.",
      "حملت النساء الرسائل، وجمعن المال، والتقطن المعلومات، وخِطن الملابس، وأعددن الدواء، ونقلن التحذيرات، وحمين الأطفال، وأدَرن البيوت تحت ضغط استثنائي. لم يترك معظم هذا العمل سجلات رسمية تُذكر، رغم أنه كان لا غنى عنه لبقاء شبكات المقاومة.",
    ),
  },
];

/* --------------------------------------------------------- women to remember */

export const WOI_WOMEN_HEADING = L(
  "Women to remember",
  "Des femmes à ne pas oublier",
  "نساء لا ينبغي أن ننساها",
);

export const WOI_WOMEN: WomanEntry[] = [
  {
    id: "hassiba-ben-bouali",
    figureId: "hassiba-ben-bouali",
    displayName: L("Hassiba Ben Bouali", "Hassiba Ben Bouali", "حسيبة بن بوعلي"),
    years: "1938 – 1957",
    role: L(
      "A militant of the FLN urban network in Algiers who sheltered fighters and carried out clandestine missions in the Casbah, where she was killed in 1957.",
      "Militante du réseau urbain du FLN à Alger, elle hébergeait des combattants et menait des missions clandestines dans la Casbah, où elle fut tuée en 1957.",
      "مناضلة في الشبكة الحضرية لجبهة التحرير بالجزائر العاصمة، آوت المجاهدين ونفّذت مهامّ سرية في القصبة، حيث استُشهدت سنة 1957.",
    ),
    region: "algiers",
  },
  {
    id: "djamila-bouhired",
    figureId: "djamila-bouhired",
    displayName: L("Djamila Bouhired", "Djamila Bouhired", "جميلة بوحيرد"),
    role: L(
      "Arrested during the Battle of Algiers, she was tortured and sentenced to death, and her trial drew international attention to the Algerian cause.",
      "Arrêtée pendant la Bataille d'Alger, elle fut torturée et condamnée à mort, et son procès attira l'attention internationale sur la cause algérienne.",
      "اعتُقلت خلال معركة الجزائر، وتعرّضت للتعذيب وصدر بحقها حكم بالإعدام، ولفتت محاكمتها أنظار العالم إلى القضية الجزائرية.",
    ),
    datesNeedSourcing: true,
    region: "algiers",
  },
  {
    id: "djamila-boupacha",
    figureId: "djamila-boupacha",
    displayName: L("Djamila Boupacha", "Djamila Boupacha", "جميلة بوباشا"),
    role: L(
      "Arrested in 1960, she publicly denounced the torture she had suffered, and her case was taken up by her lawyer Gisèle Halimi and by Simone de Beauvoir.",
      "Arrêtée en 1960, elle dénonça publiquement les tortures subies, et son affaire fut portée par son avocate Gisèle Halimi et par Simone de Beauvoir.",
      "اعتُقلت سنة 1960 وندّدت علناً بما تعرّضت له من تعذيب، وتبنّت قضيتها محاميتها جيزيل حليمي والكاتبة سيمون دو بوفوار.",
    ),
    datesNeedSourcing: true,
    region: "algiers",
  },
  {
    id: "zohra-drif",
    displayName: L("Zohra Drif", "Zohra Drif", "زهرة ظريف"),
    role: L(
      "A student who joined the clandestine urban network of Algiers and took part in armed operations during the Battle of Algiers.",
      "Étudiante, elle rejoignit le réseau urbain clandestin d'Alger et participa à des opérations armées pendant la Bataille d'Alger.",
      "طالبة التحقت بالشبكة الحضرية السرية في الجزائر العاصمة وشاركت في عمليات مسلحة خلال معركة الجزائر.",
    ),
    datesNeedSourcing: true,
    note: L(
      "A dedicated DZ Odyssey page is planned. Her entry here is a foundation note based on the exhibit's overview source.",
      "Une page DZ Odyssey lui sera consacrée. Cette notice est une base établie à partir de la source générale de l'exposition.",
      "من المقرر تخصيص صفحة لها في دي زد أوديسي. هذه المادة أساس أولي مستند إلى المصدر العام للمعرض.",
    ),
    region: "algiers",
  },
  {
    id: "baya-hocine",
    displayName: L("Baya Hocine", "Baya Hocine", "باية حسين"),
    role: L(
      "A very young militant of the Algiers network, arrested during the war and sentenced to death before her sentence was commuted.",
      "Très jeune militante du réseau d'Alger, elle fut arrêtée pendant la guerre et condamnée à mort avant que sa peine ne soit commuée.",
      "مناضلة شابة جداً في شبكة الجزائر العاصمة، اعتُقلت خلال الحرب وصدر بحقها حكم بالإعدام قبل أن يُخفَّف.",
    ),
    datesNeedSourcing: true,
    note: L(
      "A dedicated DZ Odyssey page is planned. Her entry here is a foundation note based on the exhibit's overview source.",
      "Une page DZ Odyssey lui sera consacrée. Cette notice est une base établie à partir de la source générale de l'exposition.",
      "من المقرر تخصيص صفحة لها في دي زد أوديسي. هذه المادة أساس أولي مستند إلى المصدر العام للمعرض.",
    ),
    region: "algiers",
  },
  {
    id: "malika-gaid",
    displayName: L("Malika Gaïd", "Malika Gaïd", "مليكة قايد"),
    role: L(
      "A nurse who joined the maquis and was killed during the war, remembered for her medical work with the fighting units.",
      "Infirmière ayant rejoint le maquis, elle fut tuée pendant la guerre et reste connue pour son travail de soin auprès des unités combattantes.",
      "ممرضة التحقت بالجبال واستُشهدت خلال الحرب، وتُذكر بعملها الطبي إلى جانب الوحدات المقاتلة.",
    ),
    datesNeedSourcing: true,
    note: L(
      "A dedicated DZ Odyssey page is planned. Her entry here is a foundation note based on the exhibit's overview source.",
      "Une page DZ Odyssey lui sera consacrée. Cette notice est une base établie à partir de la source générale de l'exposition.",
      "من المقرر تخصيص صفحة لها في دي زد أوديسي. هذه المادة أساس أولي مستند إلى المصدر العام للمعرض.",
    ),
    region: "setif",
  },
];

/* ------------------------------------------------------ beyond famous names */

export const WOI_BEYOND = {
  heading: L(
    "Beyond the famous names",
    "Au-delà des noms célèbres",
    "أبعد من الأسماء المشهورة",
  ),
  paragraphs: [
    L(
      "The history of women in the revolution is larger than the biographies that became nationally known. Thousands participated through local networks, family homes, rural communities, medical work, intelligence, transport and political organization. Many names remain absent from public memory because their work was informal, records were incomplete, or recognition after independence was uneven.",
      "L'histoire des femmes dans la révolution dépasse les biographies devenues nationalement connues. Des milliers d'entre elles ont participé par des réseaux locaux, des foyers familiaux, des communautés rurales, le travail médical, le renseignement, le transport et l'organisation politique. Beaucoup de noms restent absents de la mémoire publique parce que leur travail était informel, les archives incomplètes ou la reconnaissance après l'indépendance inégale.",
      "تاريخ النساء في الثورة أوسع من السير التي نالت شهرة وطنية. فقد شاركت الآلاف عبر الشبكات المحلية والبيوت العائلية والمجتمعات الريفية والعمل الطبي والاستخبار والنقل والتنظيم السياسي. وتظل أسماء كثيرة غائبة عن الذاكرة العامة لأن عملهن كان غير رسمي، أو لأن السجلات ناقصة، أو لأن الاعتراف بعد الاستقلال لم يكن متكافئاً.",
    ),
    L(
      "This exhibit will grow to include more regional stories, lesser-known moudjahidate, testimonies, family archives and the women whose contributions were remembered locally but rarely entered national histories.",
      "Cette exposition s'enrichira d'histoires régionales, de moudjahidate moins connues, de témoignages, d'archives familiales et de femmes dont l'apport était rappelé localement mais entrait rarement dans les récits nationaux.",
      "سينمو هذا المعرض ليضم قصصاً جهوية أخرى، ومجاهدات أقل شهرة، وشهادات، وأرشيفات عائلية، ونساءً ظلّت إسهاماتهن محفوظة محلياً وقلّما دخلت التواريخ الوطنية.",
    ),
  ],
};

/* -------------------------------------------------------- numbers in context */

export const WOI_NUMBERS = {
  heading: L("Numbers in context", "Les chiffres dans leur contexte", "الأرقام في سياقها"),
  attribution: L(
    "Research by Djamila Amrane-Minne",
    "Recherches de Djamila Amrane-Minne",
    "أبحاث جميلة أمران مين",
  ),
  stats: [
    {
      value: L("10,949", "10 949", "10٬949"),
      label: L(
        "women militants identified by Djamila Amrane-Minne",
        "militantes recensées par Djamila Amrane-Minne",
        "مناضلة أحصتهن جميلة أمران مين",
      ),
    },
    {
      value: L("1,755", "1 755", "1٬755"),
      label: L(
        "maquisardes identified in the same research",
        "maquisardes recensées dans la même recherche",
        "مجاهدة في الجبال ضمن البحث نفسه",
      ),
    },
    {
      value: L("65", "65", "65"),
      label: L(
        "women identified as involved in violent operations",
        "femmes identifiées comme impliquées dans des opérations violentes",
        "امرأة جرى تحديدهن كمشاركات في عمليات عنيفة",
      ),
    },
    {
      value: L("74 %", "74 %", "74 %"),
      label: L(
        "of the women combatants studied were younger than 25, and 50 percent were younger than 20",
        "des combattantes étudiées avaient moins de 25 ans, et 50 % moins de 20 ans",
        "من المقاتلات المدروسات كنّ دون الخامسة والعشرين، و50 بالمئة دون العشرين",
      ),
    },
  ] as ContextFigure[],
  majority: L(
    "Moussebilates represented the large majority of the recognized women participants in the referenced research.",
    "Les moussebilates représentaient la grande majorité des participantes reconnues dans la recherche citée.",
    "شكّلت المسبّلات الغالبية العظمى من المشاركات المعترف بهن في البحث المذكور.",
  ),
  qualification: L(
    "These figures come from historical research based on available records. They should be read as documented estimates, not as a complete count of every woman who participated.",
    "Ces chiffres proviennent de recherches historiques fondées sur les archives disponibles. Ils doivent être lus comme des estimations documentées, et non comme un décompte complet de toutes les participantes.",
    "تأتي هذه الأرقام من بحث تاريخي يستند إلى السجلات المتاحة. ينبغي قراءتها بوصفها تقديرات موثّقة، لا إحصاءً كاملاً لكل امرأة شاركت.",
  ),
};

/* --------------------------------------------------------- after independence */

export const WOI_AFTER = {
  heading: L("After independence", "Après l'indépendance", "بعد الاستقلال"),
  paragraphs: [
    L(
      "Independence did not guarantee equal recognition. Women who had crossed traditional boundaries during the war often found their political participation limited afterward. Some received official recognition only decades later, while many returned to private life with little public record of what they had done or endured.",
      "L'indépendance n'a pas garanti une reconnaissance égale. Les femmes qui avaient franchi des frontières traditionnelles pendant la guerre ont souvent vu leur participation politique limitée par la suite. Certaines n'ont été officiellement reconnues que des décennies plus tard, tandis que beaucoup sont revenues à la vie privée sans trace publique de ce qu'elles avaient fait ou enduré.",
      "لم يضمن الاستقلال اعترافاً متكافئاً. فالنساء اللواتي تجاوزن الحدود التقليدية خلال الحرب وجدن غالباً مشاركتهن السياسية محدودة بعدها. نالت بعضهن اعترافاً رسمياً بعد عقود، بينما عادت كثيرات إلى الحياة الخاصة من دون سجل عام لما قمن به أو تحمّلنه.",
    ),
    L(
      "Remembering their contribution means honoring their courage while also examining how national memory was formed, whose stories were elevated, and whose stories were allowed to fade.",
      "Se souvenir de leur apport, c'est honorer leur courage tout en examinant la façon dont la mémoire nationale s'est construite, quelles histoires ont été mises en avant et lesquelles ont été laissées s'effacer.",
      "إن تذكّر إسهامهن يعني تكريم شجاعتهن، وفي الوقت نفسه فحص الكيفية التي تشكّلت بها الذاكرة الوطنية، وأي القصص جرى إعلاؤها وأيها تُرك ليخفت.",
    ),
  ],
};

/* -------------------------------------------------------------- living note */

export const WOI_GROWING = {
  heading: L("A growing exhibit", "Une exposition qui grandit", "معرض في نموّ"),
  body: L(
    "This is the beginning of a larger DZ Odyssey collection about Algerian women during the War of Independence. Future updates will add more biographies, regional histories, oral testimony, archival material and scholarly sources. Corrections, family records and suggestions for women whose stories should be included are welcome.",
    "C'est le début d'une collection DZ Odyssey plus vaste consacrée aux femmes algériennes pendant la guerre d'indépendance. Les prochaines mises à jour ajouteront des biographies, des histoires régionales, des témoignages oraux, des documents d'archives et des sources scientifiques. Les corrections, les documents de famille et les suggestions de femmes dont l'histoire mérite d'y figurer sont les bienvenus.",
    "هذه بداية مجموعة أوسع في دي زد أوديسي عن الجزائريات خلال حرب الاستقلال. ستضيف التحديثات المقبلة سيراً أخرى، وتواريخ جهوية، وشهادات شفوية، ومواد أرشيفية، ومصادر علمية. ونرحّب بالتصحيحات والوثائق العائلية واقتراح أسماء نساء تستحق قصصهن أن تُدرج.",
  ),
  cta: L(
    "Suggest a story or correction",
    "Proposer une histoire ou une correction",
    "اقترح قصة أو تصحيحاً",
  ),
  /** /about anchor with prefill parameters supported by the corrections form. */
  ctaHref:
    "/about?type=content_suggestion&from=" +
    encodeURIComponent("Women of the Algerian Revolution") +
    "&url=" +
    encodeURIComponent("/women-of-independence") +
    "#contact-corrections",
};

/* ------------------------------------------------------------ sources panel */

export const WOI_SOURCE_INTRO = L(
  "This first version rests on a single general overview source. It is a research foundation, and individual claims will be strengthened with scholarly and archival sources as the exhibit develops.",
  "Cette première version repose sur une seule source générale. Elle constitue une base de recherche, et chaque affirmation sera étayée par des sources scientifiques et archivistiques à mesure que l'exposition se développera.",
  "تستند هذه النسخة الأولى إلى مصدر عام واحد. إنها أساس بحثي، وستُدعَّم كل مقولة بمصادر علمية وأرشيفية مع تطوّر المعرض.",
);

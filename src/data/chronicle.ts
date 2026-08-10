/**
 * Chronicle data — "Algeria, Century by Century".
 *
 * The Chronicle is the narrative counterpart of the Timeline. The Timeline
 * answers "when did it happen"; the Chronicle answers "how did one Algeria
 * become the next". This file holds only the connective editorial layer:
 * one narrative per established era, the defining moments already recorded in
 * the project, the turning-point interludes and the bridges between chapters.
 *
 * Era titles, date ranges, figures, regions and exhibits are read at render
 * time from the existing data sources (eras.ts, eraExtras.ts, figures.ts,
 * mapRegions.ts). Nothing here replaces or duplicates them.
 */

import type { Localized, LocalizedString } from "@/lib/i18n";

const L = (en: string, fr: string, ar: string): Localized<string> => ({ en, fr, ar });

export type ChronicleEvent = {
  /** Negative years are BC. */
  year: number;
  /** Display date, already localized (mixed Arabic and Latin numerals stay legible). */
  date: LocalizedString;
  title: LocalizedString;
  detail: LocalizedString;
};

export type ChronicleChapter = {
  /** Existing era id. Never change these. */
  eraId: string;
  /** Narrative account of the era, two short paragraphs. */
  story: LocalizedString[];
  events: ChronicleEvent[];
  /** How this period led into the next. */
  bridge: LocalizedString;
};

export type TurningPoint = {
  id: string;
  /** Rendered after this era chapter. */
  afterEraId: string;
  date: LocalizedString;
  title: LocalizedString;
  body: LocalizedString;
};

export const IMAGE_DISCLOSURE = L(
  "Interpretive illustration created for DZ Odyssey. Not a historical photograph.",
  "Illustration interprétative créée pour DZ Odyssey. Il ne s'agit pas d'une photographie historique.",
  "رسم تفسيري أُنشئ لدي زد أوديسي. وليس صورة فوتوغرافية تاريخية.",
);

/** Alt text for each era visual anchor. */
export const ERA_IMAGE_ALT: Record<string, LocalizedString> = {
  earlynorthafrica: L(
    "Illustration of early North African horsemen and open highland country before the Numidian kingdoms.",
    "Illustration de cavaliers nord-africains anciens et de hautes plaines ouvertes avant les royaumes numides.",
    "رسم لفرسان شمال إفريقيا القدماء وسهول عالية مفتوحة قبل الممالك النوميدية.",
  ),
  numidia: L(
    "Illustration of a Numidian royal scene evoking the united kingdom of Massinissa.",
    "Illustration d'une scène royale numide évoquant le royaume unifié de Massinissa.",
    "رسم لمشهد ملكي نوميدي يستحضر مملكة ماسينيسا الموحدة.",
  ),
  roman: L(
    "Illustration of a Roman North African city with colonnaded streets, evoking Timgad and Djemila.",
    "Illustration d'une cité romaine d'Afrique du Nord aux rues à colonnades, évoquant Timgad et Djemila.",
    "رسم لمدينة رومانية في شمال إفريقيا بشوارع ذات أعمدة، يستحضر تيمقاد وجميلة.",
  ),
  islamic: L(
    "Illustration of a medieval North African city of scholarship, mosques and trade routes.",
    "Illustration d'une ville médiévale nord-africaine de savoir, de mosquées et de routes commerciales.",
    "رسم لمدينة مغاربية وسيطة للعلم والمساجد وطرق التجارة.",
  ),
  ottoman: L(
    "Illustration of the harbour and fortifications of Ottoman Algiers.",
    "Illustration du port et des fortifications d'Alger à l'époque ottomane.",
    "رسم لميناء الجزائر وتحصيناتها في العهد العثماني.",
  ),
  french: L(
    "Illustration evoking the French conquest of Algeria and the resistance that answered it.",
    "Illustration évoquant la conquête française de l'Algérie et la résistance qui lui a répondu.",
    "رسم يستحضر الغزو الفرنسي للجزائر والمقاومة التي واجهته.",
  ),
  independence: L(
    "Illustration evoking the Algerian War of Independence and the birth of the Republic.",
    "Illustration évoquant la guerre d'indépendance algérienne et la naissance de la République.",
    "رسم يستحضر حرب التحرير الجزائرية وميلاد الجمهورية.",
  ),
};

export const CHRONICLE_CHAPTERS: ChronicleChapter[] = [
  // ---------------------------------------------------------------- 1
  {
    eraId: "earlynorthafrica",
    story: [
      L(
        "Long before Algeria carried a name on any map, its highlands, coast and desert were held by Amazigh peoples who farmed, herded, traded and fought on their own terms. Rock art in the Sahara records a greener world, and the Mediterranean coast drew in Phoenician traders who founded Carthage and a chain of harbours along the shore.",
        "Bien avant que l'Algérie ne porte un nom sur une carte, ses hauts plateaux, sa côte et son désert étaient tenus par des peuples amazighs qui cultivaient, élevaient, commerçaient et combattaient selon leurs propres règles. L'art rupestre du Sahara garde la mémoire d'un monde plus vert, et la côte méditerranéenne attira des marchands phéniciens qui fondèrent Carthage et une chaîne de ports.",
        "قبل أن تحمل الجزائر اسمًا على أي خريطة بزمن طويل، كانت هضابها وسواحلها وصحراؤها بيد شعوب أمازيغية تزرع وترعى وتتاجر وتقاتل وفق قواعدها الخاصة. تحفظ الرسوم الصخرية في الصحراء ذاكرة عالم أكثر خضرة، واستقطب الساحل المتوسطي تجارًا فينيقيين أسسوا قرطاج وسلسلة من الموانئ.",
      ),
      L(
        "Contact with Carthage brought new goods, new writing and new wars. Amazigh cavalry became decisive in Mediterranean conflicts, and the tribal confederations of the interior grew wealthy and organised enough to negotiate with the great powers of the age rather than simply serve them.",
        "Le contact avec Carthage apporta de nouveaux biens, une nouvelle écriture et de nouvelles guerres. La cavalerie amazighe devint décisive dans les conflits méditerranéens, et les confédérations tribales de l'intérieur s'enrichirent et s'organisèrent assez pour négocier avec les grandes puissances de l'époque au lieu de simplement les servir.",
        "جلب الاحتكاك بقرطاج بضائع جديدة وكتابة جديدة وحروبًا جديدة. صار الفرسان الأمازيغ عنصرًا حاسمًا في صراعات المتوسط، وبلغت الاتحادات القبلية في الداخل من الثراء والتنظيم ما جعلها تفاوض القوى الكبرى في زمنها بدل أن تخدمها فحسب.",
      ),
    ],
    events: [
      {
        year: -945,
        date: L("945 BC", "945 av. J.-C.", "945 ق.م"),
        title: L("Sheshonq I rules Egypt", "Sheshonq Ier règne sur l'Égypte", "شيشنق الأول يحكم مصر"),
        detail: L(
          "A leader of Amazigh origin founds Egypt's 22nd Dynasty, a sign of how far North African influence already reached.",
          "Un chef d'origine amazighe fonde la 22e dynastie d'Égypte, signe de la portée déjà grande de l'influence nord-africaine.",
          "يؤسس قائد من أصل أمازيغي الأسرة الثانية والعشرين في مصر، دليلًا على اتساع نفوذ شمال إفريقيا مبكرًا.",
        ),
      },
      {
        year: -814,
        date: L("814 BC", "814 av. J.-C.", "814 ق.م"),
        title: L("Founding of Carthage", "Fondation de Carthage", "تأسيس قرطاج"),
        detail: L(
          "Phoenician settlers establish a city whose trade and wars would shape the whole North African coast.",
          "Des colons phéniciens fondent une cité dont le commerce et les guerres façonneront toute la côte nord-africaine.",
          "يؤسس مستوطنون فينيقيون مدينة ستشكّل تجارتها وحروبها كامل الساحل الشمال إفريقي.",
        ),
      },
    ],
    bridge: L(
      "As Carthage and Rome exhausted each other, the Amazigh confederations of the interior became the power that mattered. Out of that opening rose a kingdom with its own coinage, capital and ambitions.",
      "À mesure que Carthage et Rome s'épuisaient, les confédérations amazighes de l'intérieur devinrent la puissance qui comptait. De cette ouverture naquit un royaume doté de sa monnaie, de sa capitale et de ses ambitions.",
      "بينما استنزفت قرطاج وروما إحداهما الأخرى، صارت الاتحادات الأمازيغية في الداخل القوة الحاسمة. ومن تلك الثغرة نهضت مملكة لها عملتها وعاصمتها وطموحها.",
    ),
  },

  // ---------------------------------------------------------------- 2
  {
    eraId: "numidia",
    story: [
      L(
        "Numidia was the first Algerian state in the fullest sense: a unified kingdom with a capital at Cirta, a minted currency, an army and a foreign policy. Massinissa turned rival confederations into one realm and encouraged settled agriculture across the plains, which made the kingdom rich as well as feared.",
        "La Numidie fut le premier État algérien au sens plein : un royaume unifié, capitale à Cirta, monnaie frappée, armée et politique étrangère. Massinissa transforma des confédérations rivales en un seul royaume et encouragea l'agriculture sédentaire dans les plaines, ce qui rendit le royaume riche autant que redouté.",
        "كانت نوميديا أول دولة جزائرية بالمعنى الكامل: مملكة موحدة عاصمتها سيرتا، لها عملة مسكوكة وجيش وسياسة خارجية. حوّل ماسينيسا اتحادات متنافسة إلى مملكة واحدة وشجّع الزراعة المستقرة في السهول، فصارت المملكة غنية بقدر ما كانت مهيبة.",
      ),
      L(
        "That success placed Numidia between Rome and its own independence. Jugurtha's long war against Roman power showed both the depth of local resistance and the limits of a kingdom facing an empire that could afford to lose battles and still win the war.",
        "Ce succès plaça la Numidie entre Rome et sa propre indépendance. La longue guerre de Jugurtha contre la puissance romaine montra la profondeur de la résistance locale autant que les limites d'un royaume face à un empire capable de perdre des batailles et de gagner la guerre.",
        "وضع هذا النجاح نوميديا بين روما واستقلالها. وأظهرت حرب يوغرطة الطويلة ضد القوة الرومانية عمق المقاومة المحلية وحدود مملكة تواجه إمبراطورية تستطيع خسارة معارك وكسب الحرب.",
      ),
    ],
    events: [
      {
        year: -202,
        date: L("202 BC", "202 av. J.-C.", "202 ق.م"),
        title: L("Massinissa unites Numidia", "Massinissa unifie la Numidie", "ماسينيسا يوحّد نوميديا"),
        detail: L(
          "Rival confederations are brought under one crown, creating a lasting North African kingdom.",
          "Des confédérations rivales sont réunies sous une même couronne, créant un royaume nord-africain durable.",
          "تتوحد اتحادات متنافسة تحت تاج واحد، فتنشأ مملكة مغاربية راسخة.",
        ),
      },
      {
        year: -112,
        date: L("112 BC", "112 av. J.-C.", "112 ق.م"),
        title: L("The Jugurthine War begins", "Début de la guerre de Jugurtha", "بدء حرب يوغرطة"),
        detail: L(
          "Jugurtha resists Roman intervention for years and exposes deep corruption inside the Roman Senate.",
          "Jugurtha résiste des années à l'intervention romaine et met au jour la corruption profonde du Sénat romain.",
          "يقاوم يوغرطة التدخل الروماني سنوات ويكشف فسادًا عميقًا داخل مجلس الشيوخ الروماني.",
        ),
      },
      {
        year: -46,
        date: L("46 BC", "46 av. J.-C.", "46 ق.م"),
        title: L("Numidia is annexed", "La Numidie est annexée", "ضم نوميديا"),
        detail: L(
          "After defeat in Rome's civil wars, the kingdom is absorbed into the Roman provincial system.",
          "Après la défaite dans les guerres civiles romaines, le royaume est absorbé dans le système provincial romain.",
          "بعد الهزيمة في الحروب الأهلية الرومانية، تُدمج المملكة في النظام الإقليمي الروماني.",
        ),
      },
    ],
    bridge: L(
      "A kingdom gives way to imperial rule. Numidian cities remained, but the decisions that governed them were now taken in Rome.",
      "Un royaume cède la place à la domination impériale. Les cités numides demeurèrent, mais les décisions qui les gouvernaient se prenaient désormais à Rome.",
      "تفسح مملكة الطريق لحكم إمبراطوري. بقيت المدن النوميدية، لكن قرارات حكمها صارت تُتخذ في روما.",
    ),
  },

  // ---------------------------------------------------------------- 3
  {
    eraId: "roman",
    story: [
      L(
        "Roman rule reorganised the land around cities, roads and grain. Timgad, Djemila and Tipasa were laid out with forums, theatres and baths, and the plains of eastern Algeria became one of the granaries of the empire. Local families entered Roman public life without ceasing to be North African.",
        "La domination romaine réorganisa le pays autour des villes, des routes et du blé. Timgad, Djemila et Tipasa furent tracées avec forums, théâtres et thermes, et les plaines de l'est algérien devinrent l'un des greniers de l'empire. Des familles locales entrèrent dans la vie publique romaine sans cesser d'être nord-africaines.",
        "أعاد الحكم الروماني تنظيم البلاد حول المدن والطرق والقمح. خُططت تيمقاد وجميلة وتيبازة بساحاتها ومسارحها وحماماتها، وصارت سهول شرق الجزائر من أهراء الإمبراطورية. ودخلت عائلات محلية الحياة العامة الرومانية دون أن تكفّ عن كونها مغاربية.",
      ),
      L(
        "This was also an age of ideas. Augustine of Hippo wrote from the Algerian coast works that still shape Western thought, while revolts such as that of Tacfarinas and later religious disputes showed that imperial order was never fully accepted. When the Vandals crossed into Africa, the province was already loosening.",
        "Ce fut aussi un âge d'idées. Augustin d'Hippone écrivit depuis la côte algérienne des œuvres qui façonnent encore la pensée occidentale, tandis que des révoltes comme celle de Tacfarinas et des conflits religieux montrèrent que l'ordre impérial ne fut jamais pleinement accepté. Quand les Vandales passèrent en Afrique, la province se défaisait déjà.",
        "كان هذا أيضًا عصر أفكار. كتب أوغسطينوس الهيبوني من الساحل الجزائري أعمالًا ما تزال تشكّل الفكر الغربي، بينما أظهرت ثورات مثل ثورة تاكفاريناس والنزاعات الدينية أن النظام الإمبراطوري لم يُقبل قط قبولًا تامًا. وحين عبر الوندال إلى إفريقيا، كانت الولاية قد بدأت تتفكك.",
      ),
    ],
    events: [
      {
        year: 100,
        date: L("AD 100", "100 apr. J.-C.", "100 م"),
        title: L("Timgad is founded", "Fondation de Timgad", "تأسيس تيمقاد"),
        detail: L(
          "A planned colony in the Aurès becomes one of the best preserved Roman cities in the world.",
          "Une colonie planifiée dans les Aurès devient l'une des villes romaines les mieux conservées au monde.",
          "تصبح مستعمرة مخططة في الأوراس من أفضل المدن الرومانية حفظًا في العالم.",
        ),
      },
      {
        year: 354,
        date: L("AD 354", "354 apr. J.-C.", "354 م"),
        title: L("Birth of Augustine of Hippo", "Naissance d'Augustin d'Hippone", "مولد أوغسطينوس الهيبوني"),
        detail: L(
          "Born at Thagaste, he becomes one of the most influential thinkers of late antiquity.",
          "Né à Thagaste, il devient l'un des penseurs les plus influents de l'Antiquité tardive.",
          "وُلد في تاغاست، وصار من أكثر مفكري العصور القديمة المتأخرة تأثيرًا.",
        ),
      },
      {
        year: 430,
        date: L("AD 430", "430 apr. J.-C.", "430 م"),
        title: L("The Vandal conquest", "La conquête vandale", "الفتح الوندالي"),
        detail: L(
          "Roman authority in North Africa collapses and the province passes to new rulers.",
          "L'autorité romaine en Afrique du Nord s'effondre et la province passe à de nouveaux maîtres.",
          "تنهار السلطة الرومانية في شمال إفريقيا وتنتقل الولاية إلى حكام جدد.",
        ),
      },
    ],
    bridge: L(
      "An empire fragments and new powers emerge. Within two centuries a different civilisation would arrive from the east, carrying a language, a faith and a new political map.",
      "Un empire se fragmente et de nouvelles puissances émergent. En deux siècles, une autre civilisation viendrait de l'est, porteuse d'une langue, d'une foi et d'une nouvelle carte politique.",
      "تتفكك إمبراطورية وتظهر قوى جديدة. وخلال قرنين، ستصل حضارة مختلفة من المشرق تحمل لغة ودينًا وخريطة سياسية جديدة.",
    ),
  },

  // ---------------------------------------------------------------- 4
  {
    eraId: "islamic",
    story: [
      L(
        "The arrival of Islam changed language, law and learning across North Africa, and it met determined resistance before it was absorbed and made local. Dihya's stand in the Aurès belongs to that first century of encounter, and the memory of it survived in oral tradition long after the political outcome was settled.",
        "L'arrivée de l'islam changea la langue, le droit et le savoir en Afrique du Nord, et elle rencontra une résistance déterminée avant d'être absorbée et rendue locale. La résistance de Dihya dans les Aurès appartient à ce premier siècle de rencontre, et sa mémoire survécut dans la tradition orale bien après que le sort politique fut scellé.",
        "غيّر وصول الإسلام اللغة والقانون والعلم في شمال إفريقيا، وواجه مقاومة عنيدة قبل أن يُستوعب ويصير محليًا. وتنتمي وقفة الكاهنة في الأوراس إلى ذلك القرن الأول من اللقاء، وبقيت ذكراها في التقاليد الشفهية بعد حسم المآل السياسي بزمن طويل.",
      ),
      L(
        "What followed was not a single empire but a succession of North African dynasties, from the Rustamids of Tahert to the Fatimids, the Hammadids, the Almohads and the Zayyanids of Tlemcen. Cities became centres of scholarship and trade linking the Sahara to the Mediterranean, and thinkers such as Ibn Khaldun wrote history that is still read as method rather than chronicle.",
        "Suivit non pas un empire unique mais une succession de dynasties nord-africaines, des Rustamides de Tahert aux Fatimides, aux Hammadides, aux Almohades et aux Zianides de Tlemcen. Les villes devinrent des centres de savoir et de commerce reliant le Sahara à la Méditerranée, et des penseurs comme Ibn Khaldoun écrivirent une histoire encore lue comme méthode et non comme simple chronique.",
        "ولم يعقب ذلك إمبراطورية واحدة، بل تعاقب دول مغاربية، من الرستميين في تاهرت إلى الفاطميين والحماديين والموحدين والزيانيين في تلمسان. صارت المدن مراكز علم وتجارة تربط الصحراء بالمتوسط، وكتب مفكرون مثل ابن خلدون تاريخًا ما يزال يُقرأ منهجًا لا سردًا.",
      ),
    ],
    events: [
      {
        year: 683,
        date: L("AD 683", "683 apr. J.-C.", "683 م"),
        title: L("Dihya resists the Umayyads", "Dihya résiste aux Omeyyades", "الكاهنة تقاوم الأمويين"),
        detail: L(
          "An Amazigh queen leads the last major resistance to the eastern armies in the Aurès.",
          "Une reine amazighe mène la dernière grande résistance aux armées venues de l'est dans les Aurès.",
          "تقود ملكة أمازيغية آخر مقاومة كبرى للجيوش القادمة من المشرق في الأوراس.",
        ),
      },
      {
        year: 909,
        date: L("AD 909", "909 apr. J.-C.", "909 م"),
        title: L("The Fatimid Caliphate rises", "Essor du califat fatimide", "قيام الخلافة الفاطمية"),
        detail: L(
          "A dynasty founded in North Africa grows into a Mediterranean power centred later on Cairo.",
          "Une dynastie née en Afrique du Nord devient une puissance méditerranéenne, plus tard centrée sur Le Caire.",
          "تتحول دولة نشأت في شمال إفريقيا إلى قوة متوسطية سيصير مركزها القاهرة لاحقًا.",
        ),
      },
      {
        year: 1235,
        date: L("1235", "1235", "1235"),
        title: L("The Zayyanid kingdom of Tlemcen", "Le royaume zianide de Tlemcen", "الدولة الزيانية بتلمسان"),
        detail: L(
          "Tlemcen becomes a capital of scholarship, craft and caravan trade for nearly three centuries.",
          "Tlemcen devient une capitale du savoir, de l'artisanat et du commerce caravanier pendant près de trois siècles.",
          "تصبح تلمسان عاصمة للعلم والحرف وتجارة القوافل قرابة ثلاثة قرون.",
        ),
      },
    ],
    bridge: L(
      "By the sixteenth century these kingdoms were weakened and Spanish fleets held positions on the coast. Appeals for help brought Ottoman power into Algiers, and with it a new form of state.",
      "Au XVIe siècle, ces royaumes étaient affaiblis et des flottes espagnoles tenaient des positions sur la côte. Les appels à l'aide firent entrer la puissance ottomane à Alger, et avec elle une nouvelle forme d'État.",
      "بحلول القرن السادس عشر كانت هذه الممالك قد ضعفت، وأحكمت أساطيل إسبانية مواقع على الساحل. فجلبت نداءات الاستنجاد النفوذ العثماني إلى الجزائر، ومعه شكل جديد للدولة.",
    ),
  },

  // ---------------------------------------------------------------- 5
  {
    eraId: "ottoman",
    story: [
      L(
        "The Regency of Algiers was formally tied to the Ottoman sultan yet governed itself in practice. It kept a fleet, levied taxes, signed treaties with European states and defended a coastline that the great powers repeatedly tried to control. Algiers grew into a fortified maritime capital with its own institutions.",
        "La Régence d'Alger était formellement liée au sultan ottoman tout en se gouvernant en pratique. Elle entretenait une flotte, levait l'impôt, signait des traités avec les États européens et défendait un littoral que les grandes puissances tentèrent maintes fois de contrôler. Alger devint une capitale maritime fortifiée dotée de ses propres institutions.",
        "ارتبطت إيالة الجزائر رسميًا بالسلطان العثماني، لكنها حكمت نفسها عمليًا. كان لها أسطول، وتجبي الضرائب، وتوقّع المعاهدات مع الدول الأوروبية، وتدافع عن ساحل حاولت القوى الكبرى السيطرة عليه مرارًا. ونمت الجزائر عاصمة بحرية محصنة بمؤسساتها الخاصة.",
      ),
      L(
        "Power passed from the beylerbeys and pashas to the deys, elected by the ruling council. The Casbah, the corsair economy and the inland beyliks of Constantine, Titteri and Oran formed a working political order, but one that depended on naval strength at a moment when European navies were growing faster.",
        "Le pouvoir passa des beylerbeys et des pachas aux deys, élus par le conseil dirigeant. La Casbah, l'économie corsaire et les beyliks intérieurs de Constantine, du Titteri et d'Oran formaient un ordre politique fonctionnel, mais dépendant d'une force navale à l'heure où les marines européennes croissaient plus vite.",
        "انتقلت السلطة من البايلربايات والباشوات إلى الدايات الذين ينتخبهم الديوان. وشكّلت القصبة واقتصاد الرياس وبايليكات قسنطينة والتيطري ووهران نظامًا سياسيًا عاملًا، لكنه يقوم على قوة بحرية في زمن كانت فيه الأساطيل الأوروبية تنمو أسرع.",
      ),
    ],
    events: [
      {
        year: 1516,
        date: L("1516", "1516", "1516"),
        title: L("The Regency of Algiers is founded", "Fondation de la Régence d'Alger", "تأسيس إيالة الجزائر"),
        detail: L(
          "Algiers becomes the capital of a state that will last three centuries.",
          "Alger devient la capitale d'un État qui durera trois siècles.",
          "تصبح الجزائر عاصمة دولة ستدوم ثلاثة قرون.",
        ),
      },
      {
        year: 1671,
        date: L("1671", "1671", "1671"),
        title: L("The age of the deys begins", "Début de l'ère des deys", "بداية عصر الدايات"),
        detail: L(
          "Rule passes to leaders chosen locally, strengthening the Regency's practical independence.",
          "Le pouvoir passe à des chefs choisis localement, renforçant l'indépendance pratique de la Régence.",
          "تنتقل السلطة إلى حكام يُختارون محليًا، فيتعزز استقلال الإيالة العملي.",
        ),
      },
    ],
    bridge: L(
      "A diplomatic quarrel over unpaid debts gave France the pretext it wanted. In 1830 a fleet appeared off the coast, and three centuries of Algerian self-rule ended.",
      "Une querelle diplomatique sur des dettes impayées donna à la France le prétexte recherché. En 1830, une flotte parut au large, et trois siècles d'autonomie algérienne prirent fin.",
      "منح خلاف دبلوماسي حول ديون غير مسددة فرنسا الذريعة التي أرادتها. وفي 1830 ظهر أسطول قبالة الساحل، فانتهت ثلاثة قرون من الحكم الذاتي الجزائري.",
    ),
  },

  // ---------------------------------------------------------------- 6
  {
    eraId: "french",
    story: [
      L(
        "Colonisation was not a single event but a long conquest. Land was confiscated, populations displaced and a legal order created in which the majority of Algerians were subjects rather than citizens. Emir Abdelkader built a state in resistance, Lalla Fatma N'Soumer led the mountains of Kabylie, and El Mokrani's revolt in 1871 was followed by heavy collective punishment.",
        "La colonisation ne fut pas un événement mais une longue conquête. Les terres furent confisquées, les populations déplacées, et un ordre juridique institué où la majorité des Algériens étaient des sujets et non des citoyens. L'Émir Abdelkader bâtit un État dans la résistance, Lalla Fatma N'Soumer mena les montagnes de Kabylie, et la révolte d'El Mokrani en 1871 fut suivie de lourdes punitions collectives.",
        "لم يكن الاستعمار حدثًا واحدًا بل غزوًا طويلًا. صودرت الأراضي، وهُجّر السكان، وأُقيم نظام قانوني صار فيه أغلب الجزائريين رعايا لا مواطنين. بنى الأمير عبد القادر دولة في المقاومة، وقادت لالة فاطمة نسومر جبال القبائل، وأعقب ثورة المقراني سنة 1871 عقاب جماعي ثقيل.",
      ),
      L(
        "In the twentieth century resistance changed form. Reformers such as Ben Badis worked on language, education and identity, while Messali Hadj built the first mass nationalist movement. Algerians fought in two world wars for a France that refused them equality, and the promises made in 1944 and 1945 were not kept.",
        "Au XXe siècle, la résistance changea de forme. Des réformateurs comme Ben Badis travaillèrent la langue, l'école et l'identité, tandis que Messali Hadj bâtit le premier mouvement nationaliste de masse. Des Algériens combattirent dans deux guerres mondiales pour une France qui leur refusait l'égalité, et les promesses de 1944 et 1945 ne furent pas tenues.",
        "في القرن العشرين تغيّر شكل المقاومة. عمل مصلحون مثل ابن باديس على اللغة والتعليم والهوية، وبنى مصالي الحاج أول حركة وطنية جماهيرية. وقاتل جزائريون في حربين عالميتين من أجل فرنسا التي رفضت مساواتهم، ولم تُحترم وعود 1944 و1945.",
      ),
    ],
    events: [
      {
        year: 1830,
        date: L("1830", "1830", "1830"),
        title: L("The French invasion of Algiers", "L'invasion française d'Alger", "الغزو الفرنسي للجزائر"),
        detail: L(
          "A French expedition takes Algiers and begins more than a century of colonial rule.",
          "Une expédition française prend Alger et ouvre plus d'un siècle de domination coloniale.",
          "تستولي حملة فرنسية على الجزائر وتفتتح أكثر من قرن من الحكم الاستعماري.",
        ),
      },
      {
        year: 1847,
        date: L("1847", "1847", "1847"),
        title: L("Emir Abdelkader surrenders", "Reddition de l'Émir Abdelkader", "استسلام الأمير عبد القادر"),
        detail: L(
          "After fifteen years of organised resistance and state building, the Emir accepts terms.",
          "Après quinze ans de résistance organisée et de construction d'un État, l'Émir accepte les conditions.",
          "بعد خمسة عشر عامًا من مقاومة منظمة وبناء دولة، يقبل الأمير الشروط.",
        ),
      },
      {
        year: 1857,
        date: L("1857", "1857", "1857"),
        title: L("Lalla Fatma N'Soumer is captured", "Capture de Lalla Fatma N'Soumer", "أسر لالة فاطمة نسومر"),
        detail: L(
          "The leader of the Kabyle mountain resistance is taken after years of holding the passes.",
          "La cheffe de la résistance des montagnes kabyles est capturée après des années à tenir les cols.",
          "تُؤسر قائدة مقاومة جبال القبائل بعد سنوات من الصمود في الممرات.",
        ),
      },
      {
        year: 1945,
        date: L("8 May 1945", "8 mai 1945", "8 ماي 1945"),
        title: L("Sétif, Guelma and Kherrata", "Sétif, Guelma et Kherrata", "سطيف وقالمة وخراطة"),
        detail: L(
          "Demonstrations for the promised independence are met with mass killings, and a generation loses faith in reform.",
          "Des manifestations pour l'indépendance promise sont réprimées par des massacres, et une génération cesse de croire à la réforme.",
          "تُقابَل مظاهرات المطالبة بالاستقلال الموعود بمجازر، فتفقد جيلٌ كاملٌ ثقته في الإصلاح.",
        ),
      },
    ],
    bridge: L(
      "Colonial conquest created the conditions for resistance, and the repression of 1945 convinced many that political petitions had failed. Resistance became revolution.",
      "La conquête coloniale créa les conditions de la résistance, et la répression de 1945 convainquit beaucoup que la voie des pétitions avait échoué. La résistance devint révolution.",
      "خلق الغزو الاستعماري شروط المقاومة، وأقنع قمع 1945 كثيرين بأن طريق العرائض قد فشل. فصارت المقاومة ثورة.",
    ),
  },

  // ---------------------------------------------------------------- 7
  {
    eraId: "independence",
    story: [
      L(
        "On 1 November 1954 the FLN launched coordinated attacks and published a proclamation calling for an independent Algerian state. The war that followed was fought in the mountains, in the cities and in international assemblies, and it reached every family in the country.",
        "Le 1er novembre 1954, le FLN lança des attaques coordonnées et publia une proclamation appelant à un État algérien indépendant. La guerre qui suivit se joua dans les montagnes, dans les villes et dans les assemblées internationales, et elle atteignit chaque famille du pays.",
        "في أول نوفمبر 1954 أطلقت جبهة التحرير هجمات منسقة وأصدرت بيانًا يدعو إلى دولة جزائرية مستقلة. ودارت الحرب التي تلت في الجبال والمدن والمحافل الدولية، وبلغت كل بيت في البلاد.",
      ),
      L(
        "The Soummam Congress of 1956 gave the revolution a political structure, the Battle of Algiers brought it to the world's attention, and women carried messages, weapons and wounded at enormous risk. The Evian Accords of 1962 ended the war, and on 5 July 1962 Algeria became independent.",
        "Le Congrès de la Soummam en 1956 donna une structure politique à la révolution, la Bataille d'Alger la porta à l'attention du monde, et des femmes transportèrent messages, armes et blessés au péril de leur vie. Les Accords d'Évian de 1962 mirent fin à la guerre, et le 5 juillet 1962 l'Algérie devint indépendante.",
        "منح مؤتمر الصومام سنة 1956 الثورة بنية سياسية، ولفتت معركة الجزائر أنظار العالم إليها، وحملت النساء الرسائل والسلاح والجرحى بمخاطر هائلة. وأنهت اتفاقيات إيفيان سنة 1962 الحرب، وفي 5 جويلية 1962 نالت الجزائر استقلالها.",
      ),
    ],
    events: [
      {
        year: 1954,
        date: L("1 November 1954", "1er novembre 1954", "1 نوفمبر 1954"),
        title: L("Toussaint Rouge, the war begins", "Toussaint Rouge, début de la guerre", "الفاتح نوفمبر، انطلاق الثورة"),
        detail: L(
          "Coordinated attacks and the FLN proclamation open the War of Independence.",
          "Des attaques coordonnées et la proclamation du FLN ouvrent la guerre d'indépendance.",
          "تفتتح هجمات منسقة وبيان جبهة التحرير حرب الاستقلال.",
        ),
      },
      {
        year: 1956,
        date: L("20 August 1956", "20 août 1956", "20 أوت 1956"),
        title: L("The Soummam Congress", "Le Congrès de la Soummam", "مؤتمر الصومام"),
        detail: L(
          "Meeting in Kabylie, the revolution gives itself a political programme and a command structure.",
          "Réunie en Kabylie, la révolution se dote d'un programme politique et d'une structure de commandement.",
          "تمنح الثورة نفسها في القبائل برنامجًا سياسيًا وهيكل قيادة.",
        ),
      },
      {
        year: 1957,
        date: L("1957", "1957", "1957"),
        title: L("The Battle of Algiers", "La Bataille d'Alger", "معركة الجزائر"),
        detail: L(
          "Urban confrontation in the Casbah makes the Algerian cause impossible to ignore abroad.",
          "L'affrontement urbain dans la Casbah rend la cause algérienne impossible à ignorer à l'étranger.",
          "يجعل الصدام الحضري في القصبة القضية الجزائرية عصيّة على التجاهل في الخارج.",
        ),
      },
      {
        year: 1962,
        date: L("5 July 1962", "5 juillet 1962", "5 جويلية 1962"),
        title: L("Independence of Algeria", "Indépendance de l'Algérie", "استقلال الجزائر"),
        detail: L(
          "After the Evian Accords and a referendum, Algeria recovers its sovereignty.",
          "Après les Accords d'Évian et un référendum, l'Algérie recouvre sa souveraineté.",
          "بعد اتفاقيات إيفيان والاستفتاء، تستعيد الجزائر سيادتها.",
        ),
      },
    ],
    bridge: L(
      "Independence answered the question of sovereignty and opened every other question: how to rebuild, how to remember, and what kind of country to become.",
      "L'indépendance répondit à la question de la souveraineté et ouvrit toutes les autres : comment reconstruire, comment se souvenir, et quel pays devenir.",
      "أجاب الاستقلال عن سؤال السيادة وفتح كل الأسئلة الأخرى: كيف نعيد البناء، وكيف نتذكر، وأي بلد نصير.",
    ),
  },
];

export const TURNING_POINTS: TurningPoint[] = [
  {
    id: "rise-of-numidia",
    afterEraId: "earlynorthafrica",
    date: L("202 BC", "202 av. J.-C.", "202 ق.م"),
    title: L("The rise of Numidia", "L'essor de la Numidie", "نهوض نوميديا"),
    body: L(
      "Scattered confederations become a single kingdom with a capital, a coinage and a foreign policy. Algeria acquires the memory of having governed itself.",
      "Des confédérations dispersées deviennent un royaume unique, avec une capitale, une monnaie et une politique étrangère. L'Algérie acquiert la mémoire de s'être gouvernée elle-même.",
      "تتحول اتحادات متفرقة إلى مملكة واحدة لها عاصمة وعملة وسياسة خارجية. وتكتسب الجزائر ذاكرة أنها حكمت نفسها.",
    ),
  },
  {
    id: "roman-annexation",
    afterEraId: "numidia",
    date: L("46 BC", "46 av. J.-C.", "46 ق.م"),
    title: L("Roman annexation", "L'annexion romaine", "الضم الروماني"),
    body: L(
      "The Numidian kingdom is absorbed into the Roman provincial system. Cities, roads and grain reshape the land for the next five centuries.",
      "Le royaume numide est absorbé dans le système provincial romain. Villes, routes et blé remodèlent le pays pour cinq siècles.",
      "تُدمج المملكة النوميدية في النظام الإقليمي الروماني. وتعيد المدن والطرق والقمح تشكيل البلاد خمسة قرون.",
    ),
  },
  {
    id: "islam-and-dynasties",
    afterEraId: "roman",
    date: L("7th to 16th century", "VIIe au XVIe siècle", "القرن السابع إلى السادس عشر"),
    title: L(
      "Islam and the North African dynasties",
      "L'islam et les dynasties nord-africaines",
      "الإسلام والدول المغاربية",
    ),
    body: L(
      "A new faith, language and legal culture take root, and are then carried by dynasties born in North Africa itself, from Tahert and Bejaia to Tlemcen.",
      "Une foi, une langue et une culture juridique nouvelles s'enracinent, puis sont portées par des dynasties nées en Afrique du Nord même, de Tahert et Bejaïa à Tlemcen.",
      "يترسخ دين ولغة وثقافة قانونية جديدة، ثم تحملها دول نشأت في شمال إفريقيا نفسها، من تاهرت وبجاية إلى تلمسان.",
    ),
  },
  {
    id: "regency-of-algiers",
    afterEraId: "islamic",
    date: L("1516", "1516", "1516"),
    title: L("The Regency of Algiers", "La Régence d'Alger", "إيالة الجزائر"),
    body: L(
      "Algiers becomes the capital of a maritime state that signs treaties, levies taxes and defends the coast for three centuries.",
      "Alger devient la capitale d'un État maritime qui signe des traités, lève l'impôt et défend la côte durant trois siècles.",
      "تصبح الجزائر عاصمة دولة بحرية توقّع المعاهدات وتجبي الضرائب وتدافع عن الساحل ثلاثة قرون.",
    ),
  },
  {
    id: "invasion-1830",
    afterEraId: "ottoman",
    date: L("1830", "1830", "1830"),
    title: L("The French invasion", "L'invasion française", "الغزو الفرنسي"),
    body: L(
      "The taking of Algiers begins a colonisation that will reorganise land, law and language, and provoke resistance in every generation that follows.",
      "La prise d'Alger ouvre une colonisation qui réorganisera la terre, le droit et la langue, et suscitera une résistance à chaque génération.",
      "يفتتح سقوط الجزائر استعمارًا سيعيد تنظيم الأرض والقانون واللغة، ويثير مقاومة في كل جيل يليه.",
    ),
  },
  {
    id: "war-1954",
    afterEraId: "french",
    date: L("1 November 1954", "1er novembre 1954", "1 نوفمبر 1954"),
    title: L("The War of Independence begins", "Le début de la guerre d'indépendance", "انطلاق حرب التحرير"),
    body: L(
      "After the killings of May 1945 closed the path of reform, a coordinated uprising and a public proclamation open an eight year war.",
      "Après que les massacres de mai 1945 eurent fermé la voie de la réforme, un soulèvement coordonné et une proclamation publique ouvrent huit années de guerre.",
      "بعد أن أغلقت مجازر ماي 1945 طريق الإصلاح، يفتتح انتفاض منسق وبيان علني ثماني سنوات من الحرب.",
    ),
  },
];

/** Century markers for the chronological rail, mapped to existing era ids. */
export const RAIL_MARKERS: { id: string; label: LocalizedString; eraId: string }[] = [
  { id: "m1000bc", eraId: "earlynorthafrica", label: L("1000 BC", "1000 av. J.-C.", "1000 ق.م") },
  { id: "m500bc", eraId: "earlynorthafrica", label: L("500 BC", "500 av. J.-C.", "500 ق.م") },
  { id: "m202bc", eraId: "numidia", label: L("202 BC", "202 av. J.-C.", "202 ق.م") },
  { id: "m1ad", eraId: "roman", label: L("AD 1", "An 1", "1 م") },
  { id: "m500", eraId: "roman", label: L("500", "500", "500") },
  { id: "m1000", eraId: "islamic", label: L("1000", "1000", "1000") },
  { id: "m1500", eraId: "ottoman", label: L("1500", "1500", "1500") },
  { id: "m1830", eraId: "french", label: L("1830", "1830", "1830") },
  { id: "m1954", eraId: "independence", label: L("1954", "1954", "1954") },
  { id: "m1962", eraId: "independence", label: L("1962", "1962", "1962") },
  { id: "mtoday", eraId: "today", label: L("Today", "Aujourd'hui", "اليوم") },
];

export const CHRONICLE_UI = {
  eyebrow: L("The Living Chronicle", "La chronique vivante", "السجل الحي"),
  h1: L("Algeria, Century by Century", "L'Algérie, siècle après siècle", "الجزائر، قرنًا بعد قرن"),
  intro: L(
    "Three thousand years of kingdoms, invasions, resistance, ideas and rebirth, told as one continuous story.",
    "Trois mille ans de royaumes, d'invasions, de résistances, d'idées et de renaissances, racontés comme une seule histoire continue.",
    "ثلاثة آلاف عام من الممالك والغزوات والمقاومة والأفكار والانبعاث، تُروى قصة واحدة متصلة.",
  ),
  support: L(
    "Move through the centuries and discover how each Algeria shaped the one that followed.",
    "Parcourez les siècles et découvrez comment chaque Algérie a façonné celle qui a suivi.",
    "تنقّل عبر القرون واكتشف كيف صاغت كل جزائرٍ الجزائرَ التي تلتها.",
  ),
  begin: L("Begin the Chronicle", "Commencer la chronique", "ابدأ السجل"),
  scrollHint: L("Scroll to continue", "Faites défiler pour continuer", "واصل التمرير"),
  railTitle: L("Chronological rail", "Repère chronologique", "الشريط الزمني"),
  chapter: L("Chapter", "Chapitre", "الفصل"),
  enterExhibit: L("Enter the full exhibit", "Entrer dans l'exposition complète", "ادخل المعرض الكامل"),
  definingMoments: L("Defining moments", "Moments décisifs", "لحظات فاصلة"),
  people: L("People of the era", "Figures de l'époque", "شخصيات الحقبة"),
  places: L("Places of the era", "Lieux de l'époque", "أماكن الحقبة"),
  whatFollowed: L("What followed", "Ce qui suivit", "ما تلا ذلك"),
  turningPoint: L("Turning point", "Tournant", "منعطف"),
  jumpToEra: L("Jump to an era", "Aller à une époque", "الانتقال إلى حقبة"),
  progress: L("Chronicle progress", "Progression de la chronique", "تقدّم السجل"),
  endEyebrow: L("The story continues", "L'histoire continue", "القصة مستمرة"),
  endHeading: L(
    "The chronicle is still being written.",
    "La chronique s'écrit encore.",
    "لا يزال السجل يُكتب.",
  ),
  endBody: L(
    "Independence did not close Algeria's story. It opened a new chapter shaped by reconstruction, cultural memory, political change and the continuing question of what Algeria can become.",
    "L'indépendance n'a pas clos l'histoire de l'Algérie. Elle a ouvert un nouveau chapitre façonné par la reconstruction, la mémoire culturelle, les changements politiques et la question toujours vive de ce que l'Algérie peut devenir.",
    "لم يُغلق الاستقلال قصة الجزائر، بل فتح فصلًا جديدًا صاغته إعادة البناء والذاكرة الثقافية والتحولات السياسية والسؤال الدائم عمّا يمكن أن تصيره الجزائر.",
  ),
  endNote: L(
    "The years since have carried their own turning points, from the Berber Spring of 1980 to the October 1988 uprising and the Hirak popular movement of 2019.",
    "Les années suivantes ont eu leurs propres tournants, du Printemps berbère de 1980 au soulèvement d'octobre 1988 et au mouvement populaire Hirak de 2019.",
    "حملت السنوات التالية منعطفاتها الخاصة، من الربيع الأمازيغي سنة 1980 إلى انتفاضة أكتوبر 1988 والحراك الشعبي سنة 2019.",
  ),

  exploreTimeline: L("Explore the complete Timeline", "Explorer la chronologie complète", "استكشف الخط الزمني الكامل"),
  beginJourney: L("Begin a Guided Journey", "Commencer un parcours guidé", "ابدأ رحلة مُرشدة"),
  continueReading: L("Continue reading", "Poursuivre la lecture", "تابع القراءة"),
  skipToChapters: L("Skip to the chapters", "Aller aux chapitres", "انتقل إلى الفصول"),
};

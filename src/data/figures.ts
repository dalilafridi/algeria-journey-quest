import type { Localized, LocalizedString } from "@/lib/i18n";

// ---------- Types ----------

export type FigureCategory =
  | "ancient"
  | "early-resistance"
  | "colonial-resistance"
  | "war-of-independence"
  | "intellectuals-culture";

export type FigureRegion =
  | "numidia"
  | "kabylie"
  | "aures"
  | "constantine"
  | "mascara-west"
  | "national"
  | "maghreb-intellectual";

export type Figure = {
  id: string;
  name: string; // canonical English name (used as quiz answer + badge keys)
  displayName: LocalizedString;
  emoji: string;
  category: FigureCategory;
  region: FigureRegion;
  era: LocalizedString;
  regionLabel: LocalizedString;
  story: LocalizedString;
  importance: LocalizedString;
  fact: LocalizedString;
  // Optional link back into the eras section.
  relatedEraId?: string;
};

const L = (en: string, fr: string, ar: string): Localized<string> => ({ en, fr, ar });

// ---------- Category labels ----------

export const FIGURE_CATEGORIES: { id: FigureCategory; label: LocalizedString; emoji: string }[] = [
  {
    id: "ancient",
    label: L("Ancient / Numidia", "Antiquité / Numidie", "العصور القديمة / نوميديا"),
    emoji: "🏺",
  },
  {
    id: "early-resistance",
    label: L("Early resistance", "Résistance ancienne", "المقاومة المبكرة"),
    emoji: "🛡️",
  },
  {
    id: "colonial-resistance",
    label: L("Colonial resistance", "Résistance coloniale", "المقاومة الاستعمارية"),
    emoji: "⚔️",
  },
  {
    id: "war-of-independence",
    label: L("War of Independence", "Guerre d'indépendance", "ثورة التحرير"),
    emoji: "🕊️",
  },
  {
    id: "intellectuals-culture",
    label: L("Intellectuals & Culture", "Intellectuels & Culture", "المفكرون والثقافة"),
    emoji: "📚",
  },
];

export const FIGURE_REGIONS: { id: FigureRegion; label: LocalizedString }[] = [
  { id: "numidia", label: L("Numidia", "Numidie", "نوميديا") },
  { id: "kabylie", label: L("Kabylie", "Kabylie", "القبائل") },
  { id: "aures", label: L("Aurès", "Aurès", "الأوراس") },
  { id: "constantine", label: L("Constantine", "Constantine", "قسنطينة") },
  { id: "mascara-west", label: L("Mascara / West", "Mascara / Ouest", "معسكر / الغرب") },
  { id: "national", label: L("National / Algeria-wide", "National / Algérie", "وطني / عموم الجزائر") },
  {
    id: "maghreb-intellectual",
    label: L("Maghreb / Intellectual history", "Maghreb / Histoire intellectuelle", "المغرب / التاريخ الفكري"),
  },
];

// ---------- Bios ----------

export const figures: Figure[] = [
  {
    id: "massinissa",
    name: "Massinissa",
    displayName: L("Massinissa", "Massinissa", "ماسينيسا"),
    emoji: "👑",
    category: "ancient",
    region: "numidia",
    relatedEraId: "numidia",
    era: L("Ancient Numidia (c. 202 BC)", "Numidie antique (vers 202 av. J.-C.)", "نوميديا القديمة (نحو 202 ق.م)"),
    regionLabel: L("Numidia", "Numidie", "نوميديا"),
    story: L(
      "Born among the horsemen of the Numidian plains, Massinissa learned both diplomacy and war from a young age. Switching sides at a decisive moment in the conflict between Rome and Carthage, he united rival tribes under one crown and turned scattered chiefdoms into a stable kingdom that would shape North Africa for generations.",
      "Né parmi les cavaliers des plaines numides, Massinissa apprit très jeune la diplomatie et la guerre. En changeant de camp à un moment décisif du conflit entre Rome et Carthage, il unifia les tribus rivales sous une seule couronne et transforma des chefferies dispersées en un royaume stable qui marqua l'Afrique du Nord pour des générations.",
      "وُلد ماسينيسا بين فرسان السهول النوميدية، وتعلّم الدبلوماسية والحرب منذ صغره. وحين انحاز في لحظة فاصلة من الصراع بين روما وقرطاج، وحّد القبائل المتنافسة تحت تاج واحد، وحوّل المشيخات المتفرقة إلى مملكة مستقرة طبعت تاريخ شمال إفريقيا لأجيال.",
    ),
    importance: L(
      "He is remembered as the founding king who turned Numidia into a unified state and gave North Africa one of its earliest organized political structures.",
      "On le retient comme le roi fondateur qui fit de la Numidie un État unifié et donna à l'Afrique du Nord l'une de ses premières structures politiques organisées.",
      "يُذكر بوصفه الملك المؤسس الذي حوّل نوميديا إلى دولة موحّدة، وأعطى شمال إفريقيا واحدة من أولى بُناها السياسية المنظّمة.",
    ),
    fact: L(
      "He lived to nearly 90 and was said to ride at the head of his cavalry well into old age.",
      "Il vécut près de 90 ans et chevauchait, dit-on, à la tête de sa cavalerie jusqu'à un âge avancé.",
      "عاش قرابة التسعين، ويُقال إنه كان يقود فرسانه بنفسه حتى في شيخوخته.",
    ),
  },
  {
    id: "jugurtha",
    name: "Jugurtha",
    displayName: L("Jugurtha", "Jugurtha", "يوغرطة"),
    emoji: "🛡️",
    category: "ancient",
    region: "numidia",
    relatedEraId: "numidia",
    era: L("Numidia (c. 118–105 BC)", "Numidie (vers 118–105 av. J.-C.)", "نوميديا (نحو 118–105 ق.م)"),
    regionLabel: L("Numidia", "Numidie", "نوميديا"),
    story: L(
      "Grandson of Massinissa, Jugurtha grew up between Numidian courts and Roman camps. When Rome tried to carve up his kingdom, he fought back with bold raids, mountain ambushes and clever bribes inside the Senate itself, turning a regional rivalry into a long, embarrassing war for the empire.",
      "Petit-fils de Massinissa, Jugurtha grandit entre les cours numides et les camps romains. Lorsque Rome tenta de morceler son royaume, il riposta par des raids audacieux, des embuscades dans la montagne et de fines manœuvres jusque dans le Sénat, transformant une rivalité régionale en une longue guerre embarrassante pour l'empire.",
      "حفيد ماسينيسا، نشأ يوغرطة بين قصور نوميديا ومعسكرات روما. وحين حاولت روما تقاسم مملكته، ردّ بغارات جريئة وكمائن جبلية ودهاء بلغ مجلس الشيوخ نفسه، فحوّل صراعًا محليًا إلى حرب طويلة محرجة للإمبراطورية.",
    ),
    importance: L(
      "Captured by betrayal but never broken in spirit, he became a lasting symbol of resistance to foreign domination in North Africa.",
      "Capturé par trahison mais jamais brisé dans l'esprit, il est devenu un symbole durable de la résistance à la domination étrangère en Afrique du Nord.",
      "وقع في الأسر بالخيانة لا بالهزيمة، وبقي رمزًا خالدًا لمقاومة الهيمنة الأجنبية في شمال إفريقيا.",
    ),
    fact: L(
      "When marched in chains through Rome, he is said to have cried out: \"Rome is for sale.\"",
      "Conduit enchaîné dans Rome, il aurait lancé : « Rome est à vendre. »",
      "حين سيق مكبّلًا في شوارع روما، يُروى أنه صاح: «روما للبيع».",
    ),
  },
  {
    id: "dihya",
    name: "Dihya",
    displayName: L("Dihya (al-Kahina)", "Dihya (la Kahina)", "ديهيا (الكاهنة)"),
    emoji: "👑",
    category: "early-resistance",
    region: "aures",
    era: L("Late 7th century", "Fin du VIIe siècle", "أواخر القرن السابع الميلادي"),
    regionLabel: L("Aurès", "Aurès", "الأوراس"),
    story: L(
      "From the rugged peaks of the Aurès, Dihya led an Amazigh confederation that stood against the rapid Arab expansion across North Africa. Warrior, leader, and according to legend a seer, she rallied tribes that had little in common except a refusal to be ruled from afar.",
      "Depuis les sommets de l'Aurès, Dihya conduisit une confédération amazighe qui tint tête à l'expansion arabe en Afrique du Nord. Guerrière, cheffe, et selon la légende voyante, elle rassembla des tribus qui n'avaient en commun qu'un refus d'être gouvernées de loin.",
      "من قمم الأوراس الوعرة، قادت ديهيا تحالفًا أمازيغيًا واجه التوسّع العربي السريع في شمال إفريقيا. مقاتلة وقائدة، ويُقال إنها صاحبة رؤى، وحّدت قبائل لم يجمعها إلا رفض الحكم من بعيد.",
    ),
    importance: L(
      "She remains one of the most celebrated Amazigh figures and a powerful symbol of women's leadership in Algerian historical memory.",
      "Elle demeure l'une des figures amazighes les plus célèbres et un puissant symbole du leadership féminin dans la mémoire algérienne.",
      "تبقى واحدة من أبرز الشخصيات الأمازيغية، ورمزًا قويًا لقيادة المرأة في الذاكرة التاريخية الجزائرية.",
    ),
    fact: L(
      "Her nickname \"al-Kahina\" means \"the soothsayer\" — given by chroniclers impressed by her foresight in battle.",
      "Son surnom « al-Kahina » signifie « la devineresse », donné par des chroniqueurs frappés par sa clairvoyance au combat.",
      "لقّبها المؤرخون بـ«الكاهنة»، أي العرّافة، إعجابًا ببصيرتها في ميادين القتال.",
    ),
  },
  {
    id: "abdelkader",
    name: "Emir Abdelkader",
    displayName: L("Emir Abdelkader", "Émir Abdelkader", "الأمير عبد القادر"),
    emoji: "⚔️",
    category: "colonial-resistance",
    region: "mascara-west",
    relatedEraId: "french-colonization",
    era: L("19th century (1832–1847)", "XIXe siècle (1832–1847)", "القرن التاسع عشر (1832–1847)"),
    regionLabel: L("Mascara / West", "Mascara / Ouest", "معسكر / الغرب"),
    story: L(
      "A young scholar from a respected religious family near Mascara, Abdelkader was chosen by the western tribes to lead resistance against the French invasion. He built a small but disciplined state with its own administration, courts, and army, and waged a long war that earned the respect even of his enemies.",
      "Jeune lettré d'une famille religieuse respectée près de Mascara, Abdelkader fut choisi par les tribus de l'Ouest pour mener la résistance contre l'invasion française. Il bâtit un État modeste mais structuré, doté d'une administration, de tribunaux et d'une armée, et mena une longue guerre qui força le respect de ses adversaires.",
      "كان شابًا متعلمًا من أسرة دينية محترمة قرب معسكر، فاختارته القبائل الغربية لقيادة المقاومة ضد الغزو الفرنسي. أسّس دولة صغيرة لكنها منظّمة، لها إدارتها وقضاؤها وجيشها، وخاض حربًا طويلة فرضت احترامه حتى على خصومه.",
    ),
    importance: L(
      "He is remembered as a founder of the modern Algerian state idea and as a model of leadership combining faith, justice, and humanity, even toward prisoners of war.",
      "On le retient comme l'un des pères de l'idée d'État algérien moderne et comme un modèle de leadership alliant foi, justice et humanité, même envers les prisonniers de guerre.",
      "يُذكر بوصفه أحد مؤسسي فكرة الدولة الجزائرية الحديثة، ونموذجًا للقيادة التي تجمع الإيمان والعدل والرحمة، حتى مع الأسرى.",
    ),
    fact: L(
      "Years later, in exile in Damascus, he saved thousands of Christians during sectarian violence — an act that earned him medals from across the world.",
      "Plus tard, en exil à Damas, il sauva des milliers de chrétiens lors de violences communautaires — un acte qui lui valut des distinctions du monde entier.",
      "في منفاه بدمشق لاحقًا، أنقذ آلاف المسيحيين خلال أحداث عنف طائفي، فنال أوسمة من شتى أنحاء العالم.",
    ),
  },
  {
    id: "ahmed-bey",
    name: "Ahmed Bey",
    displayName: L("Ahmed Bey of Constantine", "Ahmed Bey de Constantine", "أحمد باي قسنطينة"),
    emoji: "🏰",
    category: "colonial-resistance",
    region: "constantine",
    relatedEraId: "french-colonization",
    era: L("Ottoman era (1826–1848)", "Époque ottomane (1826–1848)", "العهد العثماني (1826–1848)"),
    regionLabel: L("Constantine", "Constantine", "قسنطينة"),
    story: L(
      "Last Ottoman bey of Constantine, Ahmed Bey turned the cliff-top city into a stronghold of resistance after the fall of Algiers. He fought off a first French assault in 1836 and continued the struggle from the eastern mountains long after the city itself was taken.",
      "Dernier bey ottoman de Constantine, Ahmed Bey fit de la ville perchée un bastion de résistance après la chute d'Alger. Il repoussa un premier assaut français en 1836 et poursuivit la lutte depuis les montagnes de l'Est bien après la prise de la ville.",
      "آخر بايات قسنطينة العثمانيين، حوّل المدينة المُطلّة على الوادي إلى معقل مقاومة بعد سقوط الجزائر العاصمة. صدّ هجومًا فرنسيًا أوّل سنة 1836، وواصل الكفاح من جبال الشرق حتى بعد سقوط المدينة.",
    ),
    importance: L(
      "He embodied resistance in eastern Algeria and showed that the colonial conquest would face a stubborn, organized opposition far beyond the capital.",
      "Il incarna la résistance à l'est de l'Algérie et montra que la conquête coloniale rencontrerait une opposition tenace et organisée bien au-delà de la capitale.",
      "جسّد المقاومة في شرق الجزائر، وأثبت أن الغزو الاستعماري سيواجه مقاومة منظّمة وعنيدة تتجاوز العاصمة.",
    ),
    fact: L(
      "His failed defense of Constantine in 1837 still cost the French one of their highest-ranking officers in the campaign.",
      "Sa défense de Constantine en 1837, bien que perdue, coûta aux Français l'un de leurs plus hauts officiers de la campagne.",
      "رغم سقوط قسنطينة عام 1837، كلّف دفاعه عنها الجيش الفرنسي خسارة واحد من كبار قادته في الحملة.",
    ),
  },
  {
    id: "lalla-fatma-nsoumer",
    name: "Lalla Fatma N'Soumer",
    displayName: L("Lalla Fatma N'Soumer", "Lalla Fatma N'Soumer", "لالة فاطمة نسومر"),
    emoji: "🌟",
    category: "colonial-resistance",
    region: "kabylie",
    relatedEraId: "french-colonization",
    era: L("Mid-19th century (1850s)", "Milieu du XIXe siècle (années 1850)", "منتصف القرن التاسع عشر (خمسينياته)"),
    regionLabel: L("Kabylie", "Kabylie", "القبائل"),
    story: L(
      "In the villages of Kabylie, a young woman known for her piety and intelligence became the rallying voice of the mountains. As French columns pushed into the region, Lalla Fatma N'Soumer organized fighters, comforted the wounded, and helped lead resistance battles in terrain her people knew far better than any invader.",
      "Dans les villages de Kabylie, une jeune femme connue pour sa piété et son intelligence devint la voix des montagnes. Alors que les colonnes françaises s'enfonçaient dans la région, Lalla Fatma N'Soumer organisa les combattants, soigna les blessés et aida à mener des batailles dans un terrain que les siens connaissaient bien mieux que tout envahisseur.",
      "في قرى منطقة القبائل، برزت شابة عُرفت بتقواها وذكائها لتصبح صوت الجبال. ومع توغل الحملات الفرنسية، نظّمت لالة فاطمة نسومر المقاتلين، وآسَت الجرحى، وأسهمت في قيادة معارك في تضاريس يعرفها أهلها أكثر من أي غازٍ.",
    ),
    importance: L(
      "She is celebrated as a national heroine and a powerful figure of Kabyle and women's resistance in 19th-century Algeria.",
      "Elle est célébrée comme une héroïne nationale et une grande figure de la résistance kabyle et féminine de l'Algérie du XIXe siècle.",
      "تُحتفى بوصفها بطلة وطنية ورمزًا قويًا للمقاومة القبائلية والنسائية في الجزائر خلال القرن التاسع عشر.",
    ),
    fact: L(
      "She was barely in her twenties when her name began to spread across Kabyle villages as a symbol of hope.",
      "Elle avait à peine la vingtaine quand son nom commença à circuler de village en village comme un symbole d'espoir.",
      "لم تكن قد تجاوزت العشرين بكثير حين بدأ اسمها ينتقل بين القرى رمزًا للأمل.",
    ),
  },
  {
    id: "el-mokrani",
    name: "Cheikh El Mokrani",
    displayName: L("Cheikh El Mokrani", "Cheikh El Mokrani", "الشيخ المقراني"),
    emoji: "🔥",
    category: "colonial-resistance",
    region: "kabylie",
    relatedEraId: "french-colonization",
    era: L("1871 uprising", "Insurrection de 1871", "ثورة 1871"),
    regionLabel: L("Kabylie", "Kabylie", "القبائل"),
    story: L(
      "A respected leader from a noble family of the Medjana, El Mokrani rose against the French in 1871 in protest at policies that crushed local authority and impoverished the countryside. Joined by Cheikh Aheddad and the Rahmaniya brotherhood, his call drew in hundreds of thousands and shook the colony to its foundations.",
      "Chef respecté d'une grande famille de la Medjana, El Mokrani se souleva contre les Français en 1871 face à des mesures qui écrasaient les autorités locales et appauvrissaient les campagnes. Avec le cheikh Aheddad et la confrérie Rahmaniya, son appel mobilisa des centaines de milliers d'hommes et secoua la colonie en profondeur.",
      "زعيم محترم من أسرة عريقة في المجانة، ثار المقراني سنة 1871 ضد الفرنسيين رفضًا لسياسات أضعفت السلطات المحلية وأفقرت الأرياف. وبانضمام الشيخ الحداد والطريقة الرحمانية، استقطبت دعوته مئات الآلاف وزلزلت أركان المستعمرة.",
    ),
    importance: L(
      "His revolt was one of the largest uprisings against French rule in the 19th century and a key reference point for later resistance movements.",
      "Sa révolte fut l'une des plus grandes insurrections contre la domination française au XIXe siècle, et une référence pour les mouvements de résistance ultérieurs.",
      "تُعدّ ثورته من أكبر الانتفاضات ضد الاحتلال الفرنسي في القرن التاسع عشر، ومرجعًا لحركات المقاومة اللاحقة.",
    ),
    fact: L(
      "After his death in battle, his brother Boumezrag took over the revolt and kept the fight alive for months.",
      "Après sa mort au combat, son frère Boumezrag reprit la révolte et la maintint vivante pendant des mois.",
      "بعد استشهاده في المعركة، تولى أخوه بومزراق قيادة الثورة وأبقاها مشتعلة لأشهر.",
    ),
  },
  {
    id: "abane-ramdane",
    name: "Abane Ramdane",
    displayName: L("Abane Ramdane", "Abane Ramdane", "عبان رمضان"),
    emoji: "🧠",
    category: "war-of-independence",
    region: "kabylie",
    relatedEraId: "war-of-independence",
    era: L("War of Independence (1954–1957)", "Guerre d'indépendance (1954–1957)", "ثورة التحرير (1954–1957)"),
    regionLabel: L("Kabylie", "Kabylie", "القبائل"),
    story: L(
      "Sharp-minded and uncompromising, Abane Ramdane gave the young revolution something it badly needed: a clear political brain. From clandestine meetings to the historic Soummam Congress of 1956, he helped turn an armed struggle into a structured national movement with rules, priorities, and a vision of the future.",
      "Esprit aiguisé et intransigeant, Abane Ramdane donna à la jeune révolution ce qui lui manquait : un cerveau politique clair. Des réunions clandestines au Congrès historique de la Soummam en 1956, il aida à transformer une lutte armée en mouvement national structuré, avec des règles, des priorités et un projet d'avenir.",
      "بعقلٍ حادٍّ ومبدئي، أعطى عبان رمضان للثورة الفتية ما كانت تحتاجه: فكرًا سياسيًا واضحًا. ومن الاجتماعات السرية إلى مؤتمر الصومام التاريخي عام 1956، ساهم في تحويل الكفاح المسلّح إلى حركة وطنية منظّمة لها قواعدها وأولوياتها ورؤيتها للمستقبل.",
    ),
    importance: L(
      "He is remembered as the principal architect of the Soummam platform, which set the political foundations of the Algerian revolution.",
      "On le retient comme le principal architecte de la plateforme de la Soummam, qui posa les fondations politiques de la révolution algérienne.",
      "يُذكر بوصفه المهندس الأبرز لمؤتمر الصومام الذي أرسى الأسس السياسية للثورة الجزائرية.",
    ),
    fact: L(
      "He insisted on two famous principles: the priority of the political over the military, and of the interior over the exterior.",
      "Il défendait deux principes célèbres : la primauté du politique sur le militaire, et de l'intérieur sur l'extérieur.",
      "تمسّك بمبدأين شهيرين: أولوية السياسي على العسكري، وأولوية الداخل على الخارج.",
    ),
  },
  {
    id: "krim-belkacem",
    name: "Krim Belkacem",
    displayName: L("Krim Belkacem", "Krim Belkacem", "كريم بلقاسم"),
    emoji: "🤝",
    category: "war-of-independence",
    region: "kabylie",
    relatedEraId: "war-of-independence",
    era: L("War of Independence (1954–1962)", "Guerre d'indépendance (1954–1962)", "ثورة التحرير (1954–1962)"),
    regionLabel: L("Kabylie", "Kabylie", "القبائل"),
    story: L(
      "Long before November 1954, Krim Belkacem was already a wanted man in the mountains of Kabylie. As one of the historic chiefs of the FLN, he combined the toughness of a maquis fighter with the patience of a negotiator, and ended up signing the agreements that closed 132 years of colonization.",
      "Bien avant novembre 1954, Krim Belkacem était déjà recherché dans les montagnes de Kabylie. L'un des chefs historiques du FLN, il alliait la dureté du combattant des maquis à la patience du négociateur, et finit par signer les accords qui mirent fin à 132 ans de colonisation.",
      "قبل نوفمبر 1954 بسنوات، كان كريم بلقاسم مطاردًا في جبال القبائل. أحد القادة التاريخيين لجبهة التحرير، جمع بين صلابة المجاهد في الجبل وصبر المفاوض، حتى وقّع الاتفاقيات التي طوت 132 سنة من الاستعمار.",
    ),
    importance: L(
      "He is remembered as a key Soummam leader and as the principal Algerian signatory of the Évian Accords that recognized independence.",
      "On le retient comme un dirigeant clé de la Soummam et comme le principal signataire algérien des Accords d'Évian qui reconnurent l'indépendance.",
      "يُذكر بوصفه قائدًا محوريًا في الصومام، والموقّع الرئيسي عن الجزائر على اتفاقيات إيفيان التي اعترفت بالاستقلال.",
    ),
    fact: L(
      "He spent years in the maquis without ever sleeping in the same place two nights in a row.",
      "Il passa des années dans le maquis sans jamais dormir deux nuits au même endroit.",
      "أمضى سنوات في الجبل دون أن يبيت ليلتين في المكان نفسه.",
    ),
  },
  {
    id: "ben-mhidi",
    name: "Larbi Ben M'hidi",
    displayName: L("Larbi Ben M'hidi", "Larbi Ben M'hidi", "العربي بن مهيدي"),
    emoji: "🕊️",
    category: "war-of-independence",
    region: "national",
    relatedEraId: "war-of-independence",
    era: L("War of Independence (1954–1957)", "Guerre d'indépendance (1954–1957)", "ثورة التحرير (1954–1957)"),
    regionLabel: L("National / Algeria-wide", "National / Algérie", "وطني / عموم الجزائر"),
    story: L(
      "Calm, sharp, and almost ascetic in his discipline, Ben M'hidi was one of the six historic chiefs who launched the November 1954 insurrection. He led key operations in the Battle of Algiers and impressed even his interrogators with his composure during captivity.",
      "Calme, lucide et d'une discipline presque ascétique, Ben M'hidi fut l'un des six chefs historiques qui lancèrent l'insurrection de novembre 1954. Il dirigea des opérations clés dans la Bataille d'Alger et impressionna même ses interrogateurs par son sang-froid en captivité.",
      "هادئًا، حادّ الذهن، وذا انضباط يكاد يكون نُسكيًا، كان بن مهيدي أحد القادة الستة التاريخيين الذين أطلقوا ثورة نوفمبر 1954. قاد عمليات محورية في معركة الجزائر، وأبهر حتى محقّقيه برباطة جأشه في الأسر.",
    ),
    importance: L(
      "He stands as a symbol of integrity, sacrifice, and the moral force of the Algerian revolution.",
      "Il incarne l'intégrité, le sacrifice et la force morale de la révolution algérienne.",
      "يجسّد النزاهة والتضحية والقوة الأخلاقية للثورة الجزائرية.",
    ),
    fact: L(
      "Asked about \"bombs in baskets\", he is famously remembered to have answered: give us your planes, we will give you our baskets.",
      "Interrogé sur les « bombes dans des paniers », on lui prête cette réponse célèbre : donnez-nous vos avions, nous vous donnerons nos paniers.",
      "حين سُئل عن «القنابل في السلال»، يُنسب إليه الردّ الشهير: أعطونا طائراتكم، نمنحكم سلالنا.",
    ),
  },
  {
    id: "amirouche",
    name: "Colonel Amirouche",
    displayName: L("Colonel Amirouche", "Colonel Amirouche", "العقيد عميروش"),
    emoji: "🦁",
    category: "war-of-independence",
    region: "kabylie",
    relatedEraId: "war-of-independence",
    era: L("War of Independence (1954–1959)", "Guerre d'indépendance (1954–1959)", "ثورة التحرير (1954–1959)"),
    regionLabel: L("Kabylie", "Kabylie", "القبائل"),
    story: L(
      "Born in the high villages of Kabylie, Amirouche Aït Hamouda took command of Wilaya III at a brutal moment of the war. Fearless in the field and demanding with his men, he turned the Djurdjura mountains into a stronghold of organized armed struggle.",
      "Né dans les hauts villages de Kabylie, Amirouche Aït Hamouda prit la tête de la Wilaya III à un moment particulièrement dur de la guerre. Sans peur sur le terrain et exigeant avec les siens, il fit du Djurdjura un bastion de la lutte armée organisée.",
      "وُلد عميروش آيت حمودة في قرى القبائل العالية، وتولى قيادة الولاية الثالثة في مرحلة قاسية من الحرب. لا يعرف الخوف في الميدان، وصارمًا مع رفاقه، حوّل جبال جرجرة إلى معقل للكفاح المسلّح المنظّم.",
    ),
    importance: L(
      "He became a national symbol of sacrifice in the War of Independence and a legendary figure of Wilaya III.",
      "Il devint un symbole national du sacrifice durant la guerre d'indépendance et une figure légendaire de la Wilaya III.",
      "صار رمزًا وطنيًا للتضحية خلال ثورة التحرير، وشخصية أسطورية في الولاية الثالثة.",
    ),
    fact: L(
      "His remains were hidden for decades after independence and only returned to a public resting place in 1984.",
      "Sa dépouille fut cachée pendant des décennies après l'indépendance et ne fut transférée dans un lieu public qu'en 1984.",
      "ظل رفاته مخفيًا عقودًا بعد الاستقلال، ولم يُنقل إلى مقام رسمي إلا سنة 1984.",
    ),
  },
  {
    id: "ferhat-abbas",
    name: "Ferhat Abbas",
    displayName: L("Ferhat Abbas", "Ferhat Abbas", "فرحات عباس"),
    emoji: "🎩",
    category: "war-of-independence",
    region: "national",
    relatedEraId: "war-of-independence",
    era: L("National movement (1930s–1962)", "Mouvement national (années 1930–1962)", "الحركة الوطنية (الثلاثينيات–1962)"),
    regionLabel: L("National / Algeria-wide", "National / Algérie", "وطني / عموم الجزائر"),
    story: L(
      "A pharmacist trained in French universities, Ferhat Abbas began as a believer in equal rights within the colonial system. After years of broken promises, he turned to full independence, joined the FLN, and became a respected political face of the revolution abroad.",
      "Pharmacien formé dans les universités françaises, Ferhat Abbas commença en croyant à l'égalité des droits dans le cadre colonial. Après des années de promesses non tenues, il se tourna vers l'indépendance totale, rejoignit le FLN et devint à l'étranger un visage politique respecté de la révolution.",
      "صيدلي تخرّج من الجامعات الفرنسية، بدأ فرحات عباس مؤمنًا بإمكان المساواة في إطار الاستعمار. وبعد سنوات من الوعود المخلوفة، تحوّل إلى المطالبة بالاستقلال التام، والتحق بجبهة التحرير، وصار وجهًا سياسيًا محترمًا للثورة في الخارج.",
    ),
    importance: L(
      "He served as the first president of the Provisional Government of the Algerian Republic (GPRA), giving the revolution an international political voice.",
      "Il fut le premier président du Gouvernement provisoire de la République algérienne (GPRA), donnant à la révolution une voix politique internationale.",
      "شغل منصب أوّل رئيس للحكومة المؤقتة للجمهورية الجزائرية، فأعطى الثورة صوتًا سياسيًا دوليًا.",
    ),
    fact: L(
      "His 1943 \"Manifesto of the Algerian People\" became one of the founding texts of modern Algerian nationalism.",
      "Son « Manifeste du peuple algérien » de 1943 reste l'un des textes fondateurs du nationalisme algérien moderne.",
      "أصبح «بيان الشعب الجزائري» الذي أصدره عام 1943 من النصوص المؤسِّسة للحركة الوطنية الجزائرية الحديثة.",
    ),
  },
  {
    id: "ibn-khaldun",
    name: "Ibn Khaldun",
    displayName: L("Ibn Khaldun", "Ibn Khaldoun", "ابن خلدون"),
    emoji: "📜",
    category: "intellectuals-culture",
    region: "maghreb-intellectual",
    era: L("14th century", "XIVe siècle", "القرن الرابع عشر الميلادي"),
    regionLabel: L("Maghreb / Intellectual history", "Maghreb / Histoire intellectuelle", "المغرب / التاريخ الفكري"),
    story: L(
      "Diplomat, judge, and tireless traveler across the Maghreb, Ibn Khaldun observed how dynasties rise and fall and tried to explain it. From a quiet retreat in what is today western Algeria, he wrote the Muqaddimah, an introduction to history that reads like the birth of social science itself.",
      "Diplomate, juge et voyageur infatigable du Maghreb, Ibn Khaldoun observa l'ascension et la chute des dynasties et tenta de les expliquer. Depuis une retraite paisible dans l'actuelle ouest algérien, il rédigea la Muqaddima, une introduction à l'histoire qui annonce la naissance des sciences sociales.",
      "دبلوماسي وقاضٍ ورحّالة لا يكلّ في المغرب، رصد ابن خلدون كيف تنهض الدول وكيف تسقط، وحاول تفسير ذلك. ومن خلوة هادئة في غرب الجزائر اليوم، كتب «المقدمة»، مدخلًا للتاريخ يُعدّ ميلادًا لعلم الاجتماع.",
    ),
    importance: L(
      "He is recognized worldwide as a founder of historical sociology and a major figure of Maghreb and Islamic intellectual heritage.",
      "Il est reconnu dans le monde entier comme un fondateur de la sociologie historique et une grande figure du patrimoine intellectuel maghrébin et islamique.",
      "يُعدّ في العالم كله من مؤسسي علم الاجتماع التاريخي، ومن أبرز أعلام التراث الفكري المغاربي والإسلامي.",
    ),
    fact: L(
      "Much of the Muqaddimah was written at the castle of Qal'at Ibn Salama, in present-day Tiaret region.",
      "Une grande partie de la Muqaddima fut rédigée au château de Qal'at Ibn Salama, dans l'actuelle région de Tiaret.",
      "كُتب جزء كبير من «المقدمة» في قلعة بني سلامة، في منطقة تيارت اليوم.",
    ),
  },
  {
    id: "mouloud-feraoun",
    name: "Mouloud Feraoun",
    displayName: L("Mouloud Feraoun", "Mouloud Feraoun", "مولود فرعون"),
    emoji: "📖",
    category: "intellectuals-culture",
    region: "kabylie",
    era: L("20th century (1913–1962)", "XXe siècle (1913–1962)", "القرن العشرون (1913–1962)"),
    regionLabel: L("Kabylie", "Kabylie", "القبائل"),
    story: L(
      "Born in a small Kabyle village, Mouloud Feraoun became a teacher and a writer who put his world into books. With patience and tenderness, he described the daily life of his people — their poverty, their dignity, their humor — in a French that always carried the rhythm of the mountains.",
      "Né dans un petit village de Kabylie, Mouloud Feraoun devint instituteur et écrivain, et déposa son monde dans ses livres. Avec patience et tendresse, il décrivit le quotidien des siens — leur pauvreté, leur dignité, leur humour — dans un français qui gardait toujours le rythme de la montagne.",
      "وُلد مولود فرعون في قرية صغيرة بالقبائل، فصار معلمًا وكاتبًا، وأودع عالمه كتبه. بصبر وحنوّ، رسم الحياة اليومية لأهله — فقرهم وكرامتهم وفكاهتهم — بفرنسية تظلّ تحمل إيقاع الجبل.",
    ),
    importance: L(
      "He gave Algerian Berber life a literary voice and remains a beloved figure of 20th-century Algerian literature.",
      "Il donna à la vie berbère algérienne une voix littéraire et demeure une figure aimée de la littérature algérienne du XXe siècle.",
      "منح الحياة الأمازيغية الجزائرية صوتًا أدبيًا، وبقي شخصية محبوبة في الأدب الجزائري في القرن العشرين.",
    ),
    fact: L(
      "He kept a journal during the war that was published after his death and remains a key document of those years.",
      "Il tint un journal pendant la guerre, publié après sa mort, qui reste un document essentiel de ces années.",
      "أمسك بمذكّرات خلال الحرب نُشرت بعد رحيله، ولا تزال وثيقة مهمة عن تلك السنوات.",
    ),
  },
  {
    id: "assia-djebar",
    name: "Assia Djebar",
    displayName: L("Assia Djebar", "Assia Djebar", "آسيا جبار"),
    emoji: "🎬",
    category: "intellectuals-culture",
    region: "national",
    era: L("20th–21st century (1936–2015)", "XXe–XXIe siècle (1936–2015)", "القرنان العشرون والحادي والعشرون (1936–2015)"),
    regionLabel: L("National / Algeria-wide", "National / Algérie", "وطني / عموم الجزائر"),
    story: L(
      "Brilliant student, novelist, filmmaker and historian, Assia Djebar wrote Algeria from the inside — its silences, its women, its memory. She crossed languages and forms, from novels to documentary films, always returning to the voices that history had pushed aside.",
      "Brillante étudiante, romancière, cinéaste et historienne, Assia Djebar écrivit l'Algérie de l'intérieur — ses silences, ses femmes, sa mémoire. Elle traversa les langues et les formes, du roman au film documentaire, revenant toujours aux voix que l'histoire avait mises de côté.",
      "طالبة متميّزة، وروائية وسينمائية ومؤرّخة، كتبت آسيا جبار الجزائر من الداخل — صمتها، نساءها، ذاكرتها. عبرت اللغات والأشكال، من الرواية إلى الفيلم الوثائقي، عائدةً دائمًا إلى الأصوات التي أزاحها التاريخ.",
    ),
    importance: L(
      "She is one of the most important Algerian and Maghrebi writers of her generation, and the first writer from the Maghreb elected to the Académie française.",
      "Elle est l'une des écrivaines algériennes et maghrébines les plus importantes de sa génération, et la première écrivaine du Maghreb élue à l'Académie française.",
      "تُعدّ من أبرز الكاتبات الجزائريات والمغاربيات في جيلها، وأوّل كاتبة من المغرب الكبير تُنتخب في الأكاديمية الفرنسية.",
    ),
    fact: L(
      "Her real name was Fatma-Zohra Imalayène; she chose her pen name as a young writer.",
      "Son vrai nom était Fatma-Zohra Imalayène ; elle choisit son pseudonyme dès ses débuts d'écrivaine.",
      "اسمها الحقيقي فاطمة الزهراء إيمالاين، واختارت اسمها الأدبي في بداية مسيرتها.",
    ),
  },
  {
    id: "idir",
    name: "Idir",
    displayName: L("Idir", "Idir", "إيدير"),
    emoji: "🎶",
    category: "intellectuals-culture",
    region: "kabylie",
    era: L("20th–21st century (1949–2020)", "XXe–XXIe siècle (1949–2020)", "القرنان العشرون والحادي والعشرون (1949–2020)"),
    regionLabel: L("Kabylie", "Kabylie", "القبائل"),
    story: L(
      "Born in a Kabyle village and trained as a geologist, Idir stepped into a radio studio almost by accident — and stayed in the world's ear. With a soft voice, an acoustic guitar, and lullabies that came straight from his grandmother, he carried Kabyle culture to audiences far beyond Algeria.",
      "Né dans un village de Kabylie et formé comme géologue, Idir entra presque par hasard dans un studio de radio — et resta dans l'oreille du monde. Avec une voix douce, une guitare acoustique et des berceuses tout droit venues de sa grand-mère, il porta la culture kabyle bien au-delà de l'Algérie.",
      "وُلد في قرية بالقبائل ودرس الجيولوجيا، ثم دخل أستوديو الإذاعة كأنه بالصدفة، فبقي في أذن العالم. بصوت دافئ وغيتار وأغانٍ مهد ورثها عن جدّته، حمل الثقافة القبائلية إلى جمهور واسع خارج الجزائر.",
    ),
    importance: L(
      "He is a major ambassador of Kabyle and Amazigh music, who helped open North African folk traditions to a global audience.",
      "Il est un grand ambassadeur de la musique kabyle et amazighe, qui a contribué à ouvrir les traditions populaires nord-africaines à un public mondial.",
      "يُعدّ سفيرًا كبيرًا للموسيقى القبائلية والأمازيغية، وأسهم في تعريف العالم بالتراث الشعبي لشمال إفريقيا.",
    ),
    fact: L(
      "His song \"A Vava Inouva\" was translated into more than a dozen languages and broadcast across continents.",
      "Sa chanson « A Vava Inouva » fut traduite en plus d'une dizaine de langues et diffusée sur tous les continents.",
      "تُرجمت أغنيته «أ ڤاڤا إينوڤا» إلى أكثر من عشر لغات وأُذيعت في القارات كافة.",
    ),
  },
  {
    id: "matoub",
    name: "Lounès Matoub",
    displayName: L("Lounès Matoub", "Lounès Matoub", "لونيس معطوب"),
    emoji: "🎤",
    category: "intellectuals-culture",
    region: "kabylie",
    era: L("20th century (1956–1998)", "XXe siècle (1956–1998)", "القرن العشرون (1956–1998)"),
    regionLabel: L("Kabylie", "Kabylie", "القبائل"),
    story: L(
      "Singer, poet and outspoken activist, Lounès Matoub turned songs into manifestos. He celebrated Amazigh identity, defended freedom of expression, and refused to soften his words for anyone — a stance that made him both deeply loved and a target.",
      "Chanteur, poète et militant sans détours, Lounès Matoub transforma ses chansons en manifestes. Il célébra l'identité amazighe, défendit la liberté d'expression et refusa d'adoucir ses mots — une posture qui lui valut amour profond et menaces.",
      "مغنٍّ وشاعر وناشط لا يداري، حوّل لونيس معطوب أغانيه إلى بيانات. أعلى من شأن الهوية الأمازيغية، ودافع عن حرية التعبير، ورفض تليين كلماته لأحد، فكان محبوبًا وخائضًا في الخطر معًا.",
    ),
    importance: L(
      "He remains a powerful voice of Kabyle identity, secular values, and freedom of expression in Algeria.",
      "Il demeure une voix forte de l'identité kabyle, des valeurs laïques et de la liberté d'expression en Algérie.",
      "يبقى صوتًا قويًا للهوية القبائلية والقيم المدنية وحرية التعبير في الجزائر.",
    ),
    fact: L(
      "He survived a serious shooting and a kidnapping before being assassinated in 1998 — events that deeply marked Algerian society.",
      "Il survécut à une tentative d'assassinat par balles et à un enlèvement avant d'être assassiné en 1998 — des événements qui ont profondément marqué la société algérienne.",
      "نجا من إطلاق نار خطير ومن عملية اختطاف قبل اغتياله سنة 1998، في أحداث طبعت المجتمع الجزائري بعمق.",
    ),
  },
];

// ---------- Lookups ----------

export function getFigure(id: string): Figure | undefined {
  return figures.find((f) => f.id === id);
}

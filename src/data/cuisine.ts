import type { LocalizedString } from "@/lib/i18n";

const L = (en: string, fr: string, ar: string): LocalizedString => ({ en, fr, ar });

export type CuisineRegionId =
  | "kabylie"
  | "aures"
  | "algiers"
  | "constantine"
  | "western"
  | "sahara";

export type CuisineDish = {
  id: string;
  name: LocalizedString;
  description: LocalizedString;
  whenEaten?: LocalizedString;
  note?: LocalizedString;
  emoji: string;
  /** Soft warm gradient pair (oklch via CSS color-mix tokens). */
  hue: string;
};

export type CuisineRegion = {
  id: CuisineRegionId;
  name: LocalizedString;
  icon: string;
  tagline: LocalizedString;
  dishes: CuisineDish[];
};

export const cuisineRegions: CuisineRegion[] = [
  {
    id: "kabylie",
    name: L("Kabylie", "Kabylie", "بلاد القبائل"),
    icon: "🫒",
    tagline: L(
      "Olive groves, mountain herbs and slow-cooked patience.",
      "Oliveraies, herbes de montagne et patience mijotée.",
      "بساتين الزيتون وأعشاب الجبل وصبر الطهي البطيء.",
    ),
    dishes: [
      {
        id: "couscous-kabyle",
        name: L("Kabyle Couscous", "Couscous Kabyle", "كسكس قبائلي"),
        description: L(
          "Hand-rolled semolina steamed over a broth of garden vegetables, fava beans and herbs — often without meat.",
          "Semoule roulée à la main, vapeur sur un bouillon de légumes du jardin, fèves et herbes — souvent sans viande.",
          "سميد يُلفّ باليد ويُبخَّر فوق مرق من خضار البستان والفول والأعشاب — غالبًا بلا لحم.",
        ),
        whenEaten: L("Friday and family feasts", "Vendredi et fêtes de famille", "الجمعة وأعياد العائلة"),
        note: L(
          "In Kabylie, couscous is the language of welcome. The grain is rolled by hand for hours — a gesture of love that can't be rushed.",
          "En Kabylie, le couscous est la langue de l'accueil. Le grain est roulé à la main pendant des heures — un geste d'amour qui ne se presse pas.",
          "في بلاد القبائل، الكسكس لغة الترحيب. تُلفّ الحبّة باليد ساعات طويلة — لفتة حبّ لا تُستعجل.",
        ),
        emoji: "🍚",
        hue: "var(--primary)",
      },
      {
        id: "aghroum",
        name: L("Aghroum", "Aghroum", "أغروم"),
        description: L(
          "A round Kabyle bread baked on a clay griddle, eaten warm with olive oil and honey.",
          "Un pain kabyle rond cuit sur une plaque d'argile, mangé chaud avec huile d'olive et miel.",
          "خبز قبائلي مستدير يُخبَز على صاج من الطين، يُؤكل دافئًا بزيت الزيتون والعسل.",
        ),
        whenEaten: L("Morning fields and shepherd meals", "Matin aux champs et repas des bergers", "صباح الحقول وموائد الرعاة"),
        emoji: "🫓",
        hue: "var(--secondary)",
      },
      {
        id: "tikerbabine",
        name: L("Tikerbabine", "Tikerbabine", "تيكربابين"),
        description: L(
          "Semolina dumplings simmered with chickpeas, dried meat and warm Kabyle spices.",
          "Boulettes de semoule mijotées avec pois chiches, viande séchée et épices kabyles.",
          "كريات السميد تُطهى مع الحمص واللحم المجفّف وتوابل قبائليّة دافئة.",
        ),
        whenEaten: L("Cold mountain evenings", "Soirs froids de montagne", "ليالي الجبل الباردة"),
        emoji: "🥣",
        hue: "var(--accent)",
      },
    ],
  },
  {
    id: "aures",
    name: L("Aurès", "Aurès", "الأوراس"),
    icon: "🌾",
    tagline: L(
      "Wheat, barley and the bread of the high plateaus.",
      "Blé, orge et pain des hauts plateaux.",
      "القمح والشعير وخبز الهضاب العليا.",
    ),
    dishes: [
      {
        id: "chakhchoukha",
        name: L("Chakhchoukha", "Chakhchoukha", "الشخشوخة"),
        description: L(
          "Torn flatbread bathed in a tomato and lamb stew, shared from one wide plate.",
          "Galette émiettée nappée d'un ragoût d'agneau aux tomates, partagée dans un grand plat.",
          "رقاق مفتّت يُسقى بمرق الطماطم ولحم الضأن، يُؤكل من صحن واحد.",
        ),
        whenEaten: L("Celebrations and weddings", "Fêtes et mariages", "الأعراس والمناسبات"),
        note: L(
          "Sharing chakhchoukha from one plate is itself the message: we eat together, or not at all.",
          "Partager la chakhchoukha dans un seul plat est le message : on mange ensemble, sinon pas du tout.",
          "تقاسم صحن الشخشوخة هو الرسالة: نأكل معًا، أو لا نأكل.",
        ),
        emoji: "🍛",
        hue: "var(--primary)",
      },
      {
        id: "berkoukes",
        name: L("Berkoukes", "Berkoukes", "البركوكش"),
        description: L(
          "Hand-rolled pearl pasta in a fragrant broth of vegetables and herbs.",
          "Pâtes perlées roulées à la main, dans un bouillon parfumé de légumes et d'herbes.",
          "حبّات معكرونة تُلفّ باليد في مرق دافئ بالخضار والأعشاب.",
        ),
        whenEaten: L("Cold winter evenings", "Soirs d'hiver", "ليالي الشتاء الباردة"),
        emoji: "🍲",
        hue: "var(--secondary)",
      },
      {
        id: "doubara",
        name: L("Doubara", "Doubara", "الدوبارة"),
        description: L(
          "A hearty Biskra stew of chickpeas and fava beans, generously spiced and served piping hot.",
          "Un ragoût généreux de Biskra aux pois chiches et fèves, relevé d'épices et servi brûlant.",
          "طبق بسكري دافئ من الحمص والفول، متبّل بكرم ويُقدَّم ساخنًا.",
        ),
        whenEaten: L("Winter mornings in Biskra", "Matins d'hiver à Biskra", "صباحات الشتاء في بسكرة"),
        emoji: "🥘",
        hue: "var(--accent)",
      },
    ],
  },
  {
    id: "algiers",
    name: L("Algiers", "Alger", "الجزائر العاصمة"),
    icon: "🌊",
    tagline: L(
      "Sea air, Andalusian echoes and the perfume of the Casbah.",
      "Air marin, échos andalous et parfums de la Casbah.",
      "نسيم البحر وأصداء أندلسية وعبق القصبة.",
    ),
    dishes: [
      {
        id: "rechta",
        name: L("Rechta", "Rechta", "الرشتة"),
        description: L(
          "Thin handmade noodles steamed and served with a delicate chicken and chickpea sauce.",
          "Fines pâtes faites main, vapeur et sauce délicate au poulet et pois chiches.",
          "معكرونة رفيعة محضّرة باليد، تُبخَّر وتُقدّم بصلصة دجاج وحمص لطيفة.",
        ),
        whenEaten: L("Mawlid and family Fridays", "Mawlid et vendredis en famille", "المولد وجُمَع العائلة"),
        note: L(
          "Rechta is a memory dish — many Algerois first taste it on the night of Mawlid, in their grandmother's kitchen.",
          "La rechta est un plat-mémoire — beaucoup d'Algérois la goûtent pour la première fois le soir du Mawlid, chez leur grand-mère.",
          "الرشتة طبق ذاكرة — كثيرون يتذوّقونها أوّل مرّة ليلة المولد في مطبخ الجدّة.",
        ),
        emoji: "🍜",
        hue: "var(--accent)",
      },
      {
        id: "bourek",
        name: L("Bourek", "Bourek", "البوراك"),
        description: L(
          "Crisp golden rolls of thin pastry filled with meat, onion and a whisper of cinnamon.",
          "Croustillants rouleaux dorés de pâte fine, farcis de viande, oignon et soupçon de cannelle.",
          "لفائف عجين رقيقة ذهبيّة مقرمشة، محشوّة باللحم والبصل ولمسة من القرفة.",
        ),
        whenEaten: L("First bite of every Ramadan iftar", "Première bouchée de chaque iftar de Ramadan", "أوّل لقمة في إفطار رمضان"),
        emoji: "🥟",
        hue: "var(--primary)",
      },
      {
        id: "dolma",
        name: L("Dolma", "Dolma", "الدولمة"),
        description: L(
          "Vegetables — courgette, pepper, onion — gently stuffed with spiced meat and rice.",
          "Légumes — courgette, poivron, oignon — délicatement farcis de viande épicée et de riz.",
          "خضار محشوّة بلحم متبّل وأرز: كوسى وفلفل وبصل.",
        ),
        whenEaten: L("Sunday family lunch", "Déjeuner du dimanche en famille", "غداء الأحد العائلي"),
        emoji: "🫑",
        hue: "var(--secondary)",
      },
    ],
  },
  {
    id: "constantine",
    name: L("Constantine", "Constantine", "قسنطينة"),
    icon: "🌉",
    tagline: L(
      "City of bridges, of Andalusian refinement and patient sweets.",
      "Ville des ponts, du raffinement andalou et des douceurs patientes.",
      "مدينة الجسور والذوق الأندلسي والحلويات التي تُصنع على مهل.",
    ),
    dishes: [
      {
        id: "zviti",
        name: L("Zviti", "Zviti", "الزفيتي"),
        description: L(
          "A fiery Constantinois purée of grilled peppers and tomatoes, eaten with bread and olive oil.",
          "Une purée constantinoise relevée de poivrons grillés et tomates, mangée avec pain et huile d'olive.",
          "هريس قسنطيني حارّ من الفلفل المشوي والطماطم، يُؤكل بالخبز وزيت الزيتون.",
        ),
        whenEaten: L("Summer evenings", "Soirs d'été", "أمسيات الصيف"),
        emoji: "🌶️",
        hue: "var(--primary)",
      },
      {
        id: "trida",
        name: L("Trida", "Trida", "التريدة"),
        description: L(
          "Tiny squares of handmade pasta steamed and dressed with a chicken and chickpea sauce.",
          "Minuscules carrés de pâte faits main, vapeur et nappés d'une sauce au poulet et pois chiches.",
          "مربّعات صغيرة من العجين تُحضَّر باليد وتُبخَّر مع صلصة الدجاج والحمص.",
        ),
        whenEaten: L("Mawlid and feast days", "Mawlid et jours de fête", "المولد وأيام الأعياد"),
        emoji: "🍝",
        hue: "var(--accent)",
      },
      {
        id: "dolma-constantine",
        name: L("Constantine Dolma", "Dolma de Constantine", "دولمة قسنطينة"),
        description: L(
          "An Andalusian-style dolma, gently sweet, with prunes, cinnamon and tender meat.",
          "Une dolma à l'andalouse, légèrement sucrée, aux pruneaux, cannelle et viande fondante.",
          "دولمة على الطراز الأندلسي، حلوة قليلًا، بالبرقوق والقرفة واللحم الطريّ.",
        ),
        whenEaten: L("Ramadan and weddings", "Ramadan et mariages", "رمضان والأعراس"),
        emoji: "🍯",
        hue: "var(--secondary)",
      },
    ],
  },
  {
    id: "western",
    name: L("Western Algeria", "Ouest algérien", "الغرب الجزائري"),
    icon: "🌶️",
    tagline: L(
      "Bold spice, coastal fish and the warmth of Oran's tables.",
      "Épices franches, poissons de la côte et chaleur des tables oranaises.",
      "بهارات صريحة وأسماك الساحل ودفء موائد وهران.",
    ),
    dishes: [
      {
        id: "mhajeb",
        name: L("Mhajeb", "M'hajeb", "المحاجب"),
        description: L(
          "Thin folded crêpes filled with a slow-cooked tomato, onion and pepper confit.",
          "Crêpes pliées et farcies d'un confit de tomate, oignon et poivron longuement mijoté.",
          "رقائق مطوية محشوّة بصلصة الطماطم والبصل والفلفل المطبوخة على مهل.",
        ),
        whenEaten: L("Street corners and Ramadan nights", "Au coin de la rue et nuits de Ramadan", "زوايا الشارع وليالي رمضان"),
        emoji: "🫓",
        hue: "var(--secondary)",
      },
      {
        id: "harira",
        name: L("Harira", "Harira", "الحريرة"),
        description: L(
          "A velvety tomato soup with lentils, chickpeas and tender meat — fragrant with coriander.",
          "Une soupe veloutée à la tomate, lentilles, pois chiches et viande tendre — parfumée à la coriandre.",
          "حساء طماطم ناعم بالعدس والحمص واللحم الطريّ — معطَّر بالكزبرة.",
        ),
        whenEaten: L("Iftar tables in the west", "Tables d'iftar à l'ouest", "موائد الإفطار في الغرب"),
        emoji: "🥣",
        hue: "var(--primary)",
      },
      {
        id: "karantika",
        name: L("Karantika", "Karantika", "القرنطيطة"),
        description: L(
          "A golden, oven-baked chickpea flan, sliced warm and dusted with cumin.",
          "Un flan doré de pois chiches, cuit au four, tranché chaud et saupoudré de cumin.",
          "فطيرة من دقيق الحمص تُخبَز في الفرن، تُقطَّع ساخنة وتُرشّ بالكمّون.",
        ),
        whenEaten: L("Street snack in Oran", "Goûter de rue à Oran", "وجبة شارع في وهران"),
        note: L(
          "In Oran, karantika is sold from old metal trays at street corners — a humble snack that became a symbol of the city.",
          "À Oran, la karantika se vend sur de vieux plateaux de métal aux coins des rues — un en-cas humble devenu symbole de la ville.",
          "في وهران، تُباع القرنطيطة على صواني معدنيّة قديمة في زوايا الشارع — وجبة بسيطة صارت رمزًا للمدينة.",
        ),
        emoji: "🥧",
        hue: "var(--accent)",
      },
    ],
  },
  {
    id: "sahara",
    name: L("Sahara", "Sahara", "الصحراء"),
    icon: "🌴",
    tagline: L(
      "Dates, smoked grain and bread baked in the hot sand.",
      "Dattes, grains fumés et pain cuit dans le sable brûlant.",
      "التمر والحبوب المدخّنة وخبز يُطهى في الرمل الحار.",
    ),
    dishes: [
      {
        id: "taguella",
        name: L("Taguella", "Taguella", "التاقلا"),
        description: L(
          "A round Tuareg bread cooked directly under hot desert sand and embers.",
          "Un pain rond touareg cuit directement sous le sable et la braise.",
          "خبز توارقي مستدير يُطهى تحت الرمل والجمر مباشرة.",
        ),
        whenEaten: L("Around the desert fire", "Autour du feu du désert", "حول نار الصحراء"),
        note: L(
          "Cooked in the sand, broken by hand, eaten with sauce — taguella is the desert's quiet hospitality.",
          "Cuit dans le sable, rompu à la main, mangé avec une sauce — la taguella, c'est l'hospitalité silencieuse du désert.",
          "يُطهى في الرمل ويُكسَر باليد ويُؤكل بالمرق — التاقلا ضيافة الصحراء الهادئة.",
        ),
        emoji: "🍞",
        hue: "var(--primary)",
      },
      {
        id: "mechoui",
        name: L("Mechoui", "Méchoui", "المشوي"),
        description: L(
          "A whole lamb slow-roasted over open embers until the skin is crisp and the meat falls apart.",
          "Un agneau entier rôti lentement sur la braise, peau croustillante et chair fondante.",
          "خروف كامل يُشوى ببطء على الجمر حتى تصبح القشرة مقرمشة واللحم يتفكّك.",
        ),
        whenEaten: L("Great desert celebrations", "Grandes fêtes du désert", "أعياد الصحراء الكبرى"),
        emoji: "🍖",
        hue: "var(--accent)",
      },
      {
        id: "dattes",
        name: L("Deglet Nour Dates", "Dattes Deglet Nour", "تمر دڤلة نور"),
        description: L(
          "Translucent, honey-coloured dates from the oases of the south — eaten alone or with fresh milk.",
          "Dattes translucides couleur miel des oasis du sud — dégustées seules ou avec du lait frais.",
          "تمر شفّاف بلون العسل من واحات الجنوب — يُؤكل وحده أو مع حليب طازج.",
        ),
        whenEaten: L("To break the fast", "Pour rompre le jeûne", "لكسر الصيام"),
        emoji: "🌴",
        hue: "var(--secondary)",
      },
    ],
  },
];

export type CuisineSweet = {
  id: string;
  name: LocalizedString;
  description: LocalizedString;
  whenEaten?: LocalizedString;
  emoji: string;
  hue: string;
};

export const cuisineSweets: CuisineSweet[] = [
  {
    id: "makroud",
    name: L("Makroud", "Makroud", "المقروط"),
    description: L(
      "Diamond-shaped semolina cakes filled with date paste, fried gold and dipped in honey.",
      "Losanges de semoule fourrés à la pâte de dattes, frits dorés et trempés au miel.",
      "معينات من السميد محشوّة بمعجون التمر، تُقلى ذهبيّة وتُغمَس في العسل.",
    ),
    whenEaten: L("Ramadan and Eid", "Ramadan et Aïd", "رمضان والأعياد"),
    emoji: "🍯",
    hue: "var(--secondary)",
  },
  {
    id: "baklawa",
    name: L("Algerian Baklawa", "Baklawa algérienne", "البقلاوة الجزائريّة"),
    description: L(
      "Layers of fine pastry, crushed almonds and orange-blossom syrup — cut into perfect diamonds.",
      "Feuilles de pâte fine, amandes pilées et sirop à la fleur d'oranger — découpées en losanges parfaits.",
      "طبقات من العجين الرقيق واللوز المطحون وقطر ماء الزهر — تُقطَّع معينات منتظمة.",
    ),
    whenEaten: L("Weddings and Eid tables", "Mariages et tables de l'Aïd", "الأعراس وموائد العيد"),
    emoji: "🍰",
    hue: "var(--primary)",
  },
  {
    id: "kalb-el-louz",
    name: L("Kalb el Louz", "Kalb el Louz", "قلب اللوز"),
    description: L(
      "“Heart of almond” — a tender semolina cake soaked in fragrant orange-blossom syrup.",
      "« Cœur d'amande » — un gâteau de semoule fondant, imbibé de sirop à la fleur d'oranger.",
      "«قلب اللوز» — كعكة سميد طريّة مشبَعة بقطر ماء الزهر العطر.",
    ),
    whenEaten: L("Ramadan nights", "Nuits de Ramadan", "ليالي رمضان"),
    emoji: "💛",
    hue: "var(--accent)",
  },
  {
    id: "zlabia",
    name: L("Zlabia", "Zlabia", "الزلابية"),
    description: L(
      "Bright spirals of fried batter dipped in saffron-honey syrup — the colour of Ramadan evenings.",
      "Spirales dorées de pâte frite trempées dans un sirop miel-safran — la couleur des soirs de Ramadan.",
      "حلزونات ذهبيّة من العجين المقلي تُغمَس في قطر العسل والزعفران — لون أمسيات رمضان.",
    ),
    whenEaten: L("Right after iftar", "Juste après l'iftar", "بعد الإفطار مباشرة"),
    emoji: "🌀",
    hue: "var(--primary)",
  },
  {
    id: "ghribia",
    name: L("Ghribia", "Ghribia", "الغريبة"),
    description: L(
      "Melt-in-the-mouth shortbread of butter and roasted chickpea flour, crowned with an almond.",
      "Sablés fondants au beurre et farine de pois chiches grillés, couronnés d'une amande.",
      "بسكويت يذوب في الفم من الزبدة ودقيق الحمص المحمّص، تتوّجه حبّة لوز.",
    ),
    whenEaten: L("Eid mornings with coffee", "Matins de l'Aïd avec le café", "صباحات العيد مع القهوة"),
    emoji: "🥮",
    hue: "var(--secondary)",
  },
  {
    id: "tcharek",
    name: L("Tcharek", "Tcharek", "تشاراك"),
    description: L(
      "Crescent-moon pastries filled with almond paste and dusted with snowy icing sugar.",
      "Pâtisseries en croissant de lune, fourrées de pâte d'amande et saupoudrées de sucre glace.",
      "حلوى على شكل هلال محشوّة بمعجون اللوز ومرشوشة بالسكّر الناعم.",
    ),
    whenEaten: L("Eid el-Fitr", "Aïd el-Fitr", "عيد الفطر"),
    emoji: "🌙",
    hue: "var(--accent)",
  },
];

export type CuisineSceneId = "table" | "hands" | "regions" | "memory" | "today";

export const cuisineStory: {
  id: CuisineSceneId;
  icon: string;
  title: LocalizedString;
  body: LocalizedString;
}[] = [
  {
    id: "table",
    icon: "🕯️",
    title: L("The Table", "La table", "المائدة"),
    body: L(
      "It begins with a low round table, a single warm light, and a circle of hands waiting.\nIn an Algerian home, the table is not furniture. It is a meeting place — for family, for guests, for memory.",
      "Tout commence par une petite table ronde, une lumière douce, et un cercle de mains qui attendent.\nDans une maison algérienne, la table n'est pas un meuble. C'est un lieu de rencontre — pour la famille, pour l'invité, pour la mémoire.",
      "تبدأ الحكاية بمائدة دائريّة منخفضة، وضوء دافئ واحد، وحلقة من الأيدي التي تنتظر.\nفي البيت الجزائري، المائدة ليست أثاثًا. هي مكان لقاء — للعائلة، للضيف، للذاكرة.",
    ),
  },
  {
    id: "hands",
    icon: "👐",
    title: L("The Hands", "Les mains", "الأيادي"),
    body: L(
      "Before recipes, there are hands. Hands that roll couscous grain by grain, that fold m'hadjeb, that knead bread before sunrise.\nKitchens here are oral libraries — and grandmothers are the librarians.",
      "Avant les recettes, il y a les mains. Mains qui roulent le couscous grain par grain, plient le m'hadjeb, pétrissent le pain avant l'aube.\nLes cuisines ici sont des bibliothèques orales — et les grand-mères en sont les gardiennes.",
      "قبل الوصفات، توجد الأيدي. أيدٍ تلفّ الكسكس حبّةً حبّة، وتطوي المحاجب، وتعجن الخبز قبل الفجر.\nالمطابخ هنا مكتبات شفويّة — والجدّات هنّ الحارسات.",
    ),
  },
  {
    id: "regions",
    icon: "🗺️",
    title: L("The Regions", "Les régions", "المناطق"),
    body: L(
      "From the olive hills of Kabylie to the date palms of the Sahara, each region speaks its own flavour.\nWheat and barley in the Aurès. The sea in Algiers. Spice in Oran. Andalusian patience in Constantine.",
      "Des collines d'oliviers de Kabylie aux palmiers dattiers du Sahara, chaque région parle sa propre saveur.\nBlé et orge dans l'Aurès. La mer à Alger. L'épice à Oran. La patience andalouse à Constantine.",
      "من تلال الزيتون في القبائل إلى نخيل التمر في الصحراء، لكلّ منطقة لسانها وطعمها.\nالقمح والشعير في الأوراس. البحر في الجزائر. البهار في وهران. الصبر الأندلسي في قسنطينة.",
    ),
  },
  {
    id: "memory",
    icon: "📜",
    title: L("The Memory", "La mémoire", "الذاكرة"),
    body: L(
      "Some dishes carry history quietly: the chorba of a thousand Ramadan nights, the rechta of Mawlid, the couscous of every Friday.\nA flavour can return a whole childhood. A scent can carry an entire generation home.",
      "Certains plats portent l'histoire en silence : la chorba des mille soirs de Ramadan, la rechta du Mawlid, le couscous de chaque vendredi.\nUne saveur peut ramener toute une enfance. Un parfum peut faire rentrer une génération entière à la maison.",
      "بعض الأطباق تحمل التاريخ بصمت: شربة ألف ليلة من رمضان، ورشتة المولد، وكسكس كلّ جمعة.\nنكهة واحدة قد تُعيد طفولة بأكملها. ورائحة واحدة قد تُعيد جيلًا إلى البيت.",
    ),
  },
  {
    id: "today",
    icon: "🌍",
    title: L("Today", "Aujourd'hui", "اليوم"),
    body: L(
      "Today, Algerian cuisine travels — to Paris, Marseille, Montréal, the Gulf — in suitcases, in messages, in calls between mothers and daughters.\nThe recipes change a little. The meaning does not. To cook is still to remember, and to feed is still to love.",
      "Aujourd'hui, la cuisine algérienne voyage — à Paris, Marseille, Montréal, dans le Golfe — dans les valises, les messages, les appels entre mères et filles.\nLes recettes changent un peu. Le sens, non. Cuisiner, c'est encore se souvenir. Nourrir, c'est encore aimer.",
      "اليوم، يسافر المطبخ الجزائري — إلى باريس ومرسيليا ومونتريال والخليج — في الحقائب والرسائل والمكالمات بين الأمّهات والبنات.\nتتغيّر الوصفات قليلًا. ولا يتغيّر المعنى. أن تطبخ يعني أن تتذكّر، وأن تُطعم يعني أن تُحبّ.",
    ),
  },
];

export const cuisineCopy = {
  sectionTitle: L("Cuisine of Algeria", "Cuisine d'Algérie", "مطبخ الجزائر"),
  subtitle: L(
    "Where memory, culture, and taste come together",
    "Là où mémoire, culture et goût se rencontrent",
    "حيث تلتقي الذاكرة والثقافة والنكهة",
  ),
  poetic: L(
    "Some stories are not told… they are tasted.",
    "Certaines histoires ne se racontent pas… elles se goûtent.",
    "بعض القصص لا تُروى… بل تُتذوق.",
  ),
  cta: L("Explore the Cuisine", "Explorer la cuisine", "استكشف المطبخ"),
  storyTitle: L("Food & Memory", "Nourriture & mémoire", "الطعام والذاكرة"),
  regionsTitle: L("Regional Cuisine", "Cuisines régionales", "المطابخ الإقليمية"),
  regionsHint: L(
    "Tap a region to discover its dishes.",
    "Touchez une région pour découvrir ses plats.",
    "اضغط على منطقة لاكتشاف أطباقها.",
  ),
  whenEaten: L("When eaten", "Quand on le mange", "متى يُؤكل"),
  culturalNote: L("Cultural note", "Note culturelle", "ملاحظة ثقافية"),
  back: L("← Back to Culture", "← Retour à la culture", "← العودة إلى الثقافة"),
  tapToOpen: L("Tap a dish for a cultural note", "Touchez un plat pour une note culturelle", "اضغط على طبق لقراءة ملاحظة ثقافيّة"),
  sweetsTitle: L("Sweet Traditions", "Douceurs traditionnelles", "الحلويات التقليدية"),
  sweetsHint: L(
    "Pastries that crown weddings, Eid mornings and Ramadan nights.",
    "Des douceurs qui couronnent mariages, matins d'Aïd et nuits de Ramadan.",
    "حلويّات تُتوّج الأعراس وصباحات العيد وليالي رمضان.",
  ),
};

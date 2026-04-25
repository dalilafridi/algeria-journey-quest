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
        id: "berkoukes",
        name: L("Berkoukes", "Berkoukes", "البركوكش"),
        description: L(
          "Hand-rolled pearl pasta in a fragrant broth of vegetables and herbs.",
          "Pâtes perlées roulées à la main, dans un bouillon parfumé de légumes et d'herbes.",
          "حبّات معكرونة تُلفّ باليد في مرق دافئ بالخضار والأعشاب.",
        ),
        whenEaten: L("Cold winter evenings", "Soirs d'hiver", "ليالي الشتاء الباردة"),
        note: L(
          "In many homes, berkoukes is rolled by hand — a quiet ritual passed between generations.",
          "Dans de nombreuses maisons, le berkoukes est roulé à la main — un rituel transmis entre générations.",
          "في كثير من البيوت، تُلفّ حبّات البركوكش باليد — طقس هادئ يتوارثه الجيل عن الجيل.",
        ),
        emoji: "🍲",
        hue: "var(--secondary)",
      },
      {
        id: "tikourbabine",
        name: L("Tikourbabine", "Tikourbabine", "تيكوربابين"),
        description: L(
          "Semolina dumplings simmered with chickpeas and warm spices.",
          "Boulettes de semoule mijotées avec pois chiches et épices douces.",
          "كريات السميد تُطهى مع الحمص والتوابل الدافئة.",
        ),
        whenEaten: L("Family gatherings", "Repas en famille", "جمعات العائلة"),
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
        id: "mhadjeb",
        name: L("Mhadjeb", "M'hadjeb", "المحاجب"),
        description: L(
          "Thin folded crêpes filled with a slow-cooked tomato, onion and pepper confit.",
          "Crêpes pliées et farcies d'un confit de tomate, oignon et poivron longuement mijoté.",
          "رقائق مطوية محشوّة بصلصة الطماطم والبصل والفلفل المطبوخة على مهل.",
        ),
        whenEaten: L("Street corners and Ramadan", "Au coin de la rue et en Ramadan", "زوايا الشارع وليالي رمضان"),
        emoji: "🫓",
        hue: "var(--secondary)",
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
        id: "dolma",
        name: L("Dolma", "Dolma", "الدولمة"),
        description: L(
          "Vegetables — courgette, pepper, onion — gently stuffed with spiced meat and rice.",
          "Légumes — courgette, poivron, oignon — délicatement farcis de viande épicée et de riz.",
          "خضار محشوّة بلحم متبّل وأرز: كوسى وفلفل وبصل.",
        ),
        emoji: "🫑",
        hue: "var(--primary)",
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
        id: "tajine-zitoune",
        name: L("Tajine Zitoune", "Tajine Zitoune", "طاجين الزيتون"),
        description: L(
          "Chicken slow-braised with green olives, mushrooms and a touch of lemon.",
          "Poulet mijoté aux olives vertes, champignons et un trait de citron.",
          "دجاج يُطهى ببطء مع الزيتون الأخضر والفطر ولمسة من الليمون.",
        ),
        whenEaten: L("Wedding tables", "Tables de mariage", "موائد الأعراس"),
        emoji: "🫒",
        hue: "var(--secondary)",
      },
      {
        id: "djari",
        name: L("Chorba Djari", "Chorba Djari", "شربة الجاري"),
        description: L(
          "A clear, fragrant soup of fine vermicelli, chickpeas and tender meat.",
          "Une soupe claire et parfumée aux vermicelles fins, pois chiches et viande tendre.",
          "حساء صافٍ وعطري بالشعيرية الناعمة والحمص واللحم اللين.",
        ),
        whenEaten: L("Every night of Ramadan", "Chaque soir de Ramadan", "كل مساء في رمضان"),
        emoji: "🥘",
        hue: "var(--accent)",
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
        id: "couscous-tlemcen",
        name: L("Tlemcen Couscous", "Couscous de Tlemcen", "كسكس تلمسان"),
        description: L(
          "Fine semolina steamed and crowned with seven vegetables and tender lamb.",
          "Semoule fine vapeur, couronnée de sept légumes et d'agneau fondant.",
          "سميد ناعم مبخّر يُتوَّج بسبع خضروات ولحم ضأن طريّ.",
        ),
        whenEaten: L("Friday lunch", "Vendredi midi", "ظهر الجمعة"),
        note: L(
          "Couscous is older than borders. UNESCO recognised it as shared heritage of Algeria, Morocco, Tunisia and Mauritania in 2020.",
          "Le couscous est plus ancien que les frontières. L'UNESCO l'a reconnu en 2020 comme patrimoine partagé d'Algérie, du Maroc, de Tunisie et de Mauritanie.",
          "الكسكس أقدم من الحدود. اعترفت اليونسكو عام 2020 بأنّه إرث مشترك بين الجزائر والمغرب وتونس وموريتانيا.",
        ),
        emoji: "🍚",
        hue: "var(--primary)",
      },
      {
        id: "karantita",
        name: L("Karantita", "Karantita", "القرنطيطة"),
        description: L(
          "A golden, oven-baked chickpea flan, sliced warm and dusted with cumin.",
          "Un flan doré de pois chiches, cuit au four, tranché chaud et saupoudré de cumin.",
          "فطيرة من دقيق الحمص تُخبَز في الفرن، تُقطَّع ساخنة وتُرشّ بالكمّون.",
        ),
        whenEaten: L("Street snack in Oran", "Goûter de rue à Oran", "وجبة شارع في وهران"),
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
        id: "dattes",
        name: L("Deglet Nour Dates", "Dattes Deglet Nour", "تمر دڤلة نور"),
        description: L(
          "Translucent, honey-coloured dates from the oases of the south — eaten alone or with fresh milk.",
          "Dattes translucides couleur miel des oasis du sud — dégustées seules ou avec du lait frais.",
          "تمر شفّاف بلون العسل من واحات الجنوب — يُؤكل وحده أو مع حليب طازج.",
        ),
        whenEaten: L("To break the fast", "Pour rompre le jeûne", "لكسر الصيام"),
        emoji: "🌴",
        hue: "var(--accent)",
      },
    ],
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
};

import type { LocalizedString } from "@/lib/i18n";

const L = (en: string, fr: string, ar: string): LocalizedString => ({ en, fr, ar });

export type MarkerKind = "capital" | "city" | "site" | "battle";

export type AtlasMarker = {
  kind: MarkerKind;
  name: LocalizedString;
  /** viewBox 0..100 x/y (map is 100x100). */
  x: number;
  y: number;
  note?: LocalizedString;
};

export type AtlasPeriod = {
  id: string;
  name: LocalizedString;
  years: string;
  /** Short poetic subtitle. */
  tagline: LocalizedString;
  /** Extent hue used for fill + border. */
  color: string;
  /** Approximate territory polygon (SVG path, clipped to Algeria). */
  territoryPath: string;
  /** Optional link back to a related era slug. */
  relatedEraId?: string;
  markers: AtlasMarker[];
  summary: LocalizedString;
};

/**
 * Coordinates are hand-tuned to the stylized 100×100 map in atlas.tsx.
 * Territory polygons are generous and rely on the Algeria clipPath to trim.
 */
export const ATLAS_PERIODS: AtlasPeriod[] = [
  {
    id: "numidian",
    name: L("Numidian Kingdom", "Royaume numide", "المملكة النوميدية"),
    years: "~202 BCE – 46 BCE",
    tagline: L(
      "The horse-lord kingdoms of Massinissa and Jugurtha.",
      "Les royaumes cavaliers de Massinissa et Jugurtha.",
      "ممالك الفرسان لماسينيسا ويوغرطة.",
    ),
    color: "#c48b3a",
    territoryPath: "M 40 18 L 82 20 L 82 44 L 44 44 Z",
    relatedEraId: "numidia",
    markers: [
      { kind: "capital", name: L("Cirta", "Cirta", "سيرتا"), x: 65, y: 24 },
      { kind: "city", name: L("Hippo Regius", "Hippone", "هيبو ريجيوس"), x: 74, y: 21 },
      { kind: "city", name: L("Thagaste", "Thagaste", "تاغاست"), x: 71, y: 25 },
      { kind: "site", name: L("Madghacen (royal tomb)", "Madghacen (tombeau)", "مدغاسن"), x: 62, y: 30 },
      { kind: "battle", name: L("Battle of Cirta (203 BCE)", "Bataille de Cirta", "معركة سيرتا"), x: 65, y: 25 },
    ],
    summary: L(
      "Massinissa unified the Numidian confederations into a Berber kingdom stretching across today's northeast Algeria and Tunisia, minting coins and cultivating grain.",
      "Massinissa unifia les confédérations numides en un royaume berbère couvrant l'actuel nord-est de l'Algérie et la Tunisie, frappant monnaie et cultivant le blé.",
      "وحّد ماسينيسا الاتحادات النوميدية في مملكة أمازيغية امتدت على شمال شرق الجزائر وتونس، وسكّ العملة وزرع الحبوب.",
    ),
  },
  {
    id: "roman",
    name: L("Roman Algeria", "Algérie romaine", "الجزائر الرومانية"),
    years: "46 BCE – 430 CE",
    tagline: L(
      "Aqueducts, forums and olive presses along the coast.",
      "Aqueducs, forums et pressoirs à huile le long de la côte.",
      "قنوات مائية ومنتديات ومعاصر زيت على طول الساحل.",
    ),
    color: "#8b3a3a",
    territoryPath: "M 12 18 L 83 20 L 83 34 L 12 34 Z",
    relatedEraId: "roman",
    markers: [
      { kind: "capital", name: L("Caesarea (Cherchell)", "Césarée (Cherchell)", "قيصرية"), x: 39, y: 22 },
      { kind: "city", name: L("Cirta (Constantine)", "Cirta (Constantine)", "سيرتا"), x: 65, y: 24 },
      { kind: "site", name: L("Timgad", "Timgad", "تيمقاد"), x: 62, y: 30 },
      { kind: "site", name: L("Djemila (Cuicul)", "Djémila (Cuicul)", "جميلة"), x: 58, y: 26 },
      { kind: "site", name: L("Tipaza", "Tipaza", "تيبازة"), x: 40, y: 22 },
      { kind: "battle", name: L("Fall of Cirta (311)", "Chute de Cirta", "سقوط سيرتا"), x: 65, y: 24.5 },
    ],
    summary: L(
      "Rome absorbed Numidia and Mauretania Caesariensis, planting the great cities that still shape the northern skyline: Timgad, Djémila, Tipaza, Cuicul.",
      "Rome absorba la Numidie et la Maurétanie Césarienne, fondant les grandes villes qui marquent encore le nord : Timgad, Djémila, Tipaza, Cuicul.",
      "ضمّت روما نوميديا وموريطنية القيصرية، وأسّست المدن الكبرى التي لا تزال تُميّز الشمال: تيمقاد وجميلة وتيبازة.",
    ),
  },
  {
    id: "byzantine",
    name: L("Byzantine Algeria", "Algérie byzantine", "الجزائر البيزنطية"),
    years: "533 – 698",
    tagline: L(
      "A thin ribbon of Christian fortresses along the sea.",
      "Un mince ruban de forteresses chrétiennes le long de la mer.",
      "شريط رقيق من الحصون المسيحية على الساحل.",
    ),
    color: "#3a6d8b",
    territoryPath: "M 28 18 L 78 20 L 78 27 L 28 27 Z",
    markers: [
      { kind: "capital", name: L("Cirta", "Cirta", "سيرتا"), x: 65, y: 24 },
      { kind: "city", name: L("Hippo Regius", "Hippone", "هيبون"), x: 74, y: 21 },
      { kind: "site", name: L("Tipaza fortifications", "Fortifications de Tipaza", "تحصينات تيبازة"), x: 40, y: 22 },
      { kind: "site", name: L("Djemila basilica", "Basilique de Djémila", "بازيليك جميلة"), x: 58, y: 26 },
    ],
    summary: L(
      "Justinian's reconquest rebuilt walled towns along the coast, but the Byzantine hold was thin — chapels, garrisons and taxes without the depth of Rome.",
      "La reconquête de Justinien reconstruisit les villes fortifiées côtières, mais l'emprise byzantine resta ténue — chapelles, garnisons et impôts sans la profondeur de Rome.",
      "أعادت استعادة جستنيان بناء المدن المسوّرة الساحلية، لكن الحضور البيزنطي ظل رفيعًا — كنائس وحاميات وضرائب دون عمق روما.",
    ),
  },
  {
    id: "early-islamic",
    name: L("Early Islamic Algeria", "Algérie islamique ancienne", "الجزائر الإسلامية المبكرة"),
    years: "~698 – 909",
    tagline: L(
      "Umayyad and Abbasid Ifriqiya, with Rustamid Tahert in the west.",
      "L'Ifriqiya omeyyade et abbasside, avec Tahert rostémide à l'ouest.",
      "إفريقية الأموية والعباسية، مع تاهرت الرستمية غربًا.",
    ),
    color: "#4a7a4a",
    territoryPath: "M 12 18 L 84 20 L 84 48 L 12 48 Z",
    relatedEraId: "islamic",
    markers: [
      { kind: "capital", name: L("Tahert (Rustamids)", "Tahert (Rostémides)", "تاهرت"), x: 32, y: 29 },
      { kind: "capital", name: L("Kairouan (regional)", "Kairouan (régional)", "القيروان"), x: 82, y: 24 },
      { kind: "city", name: L("Tlemcen (Agadir)", "Tlemcen (Agadir)", "تلمسان"), x: 18, y: 26 },
      { kind: "city", name: L("Sedrata", "Sedrata", "سدراتة"), x: 46, y: 46 },
      { kind: "site", name: L("Great Mosque, Tlemcen", "Grande mosquée de Tlemcen", "الجامع الكبير بتلمسان"), x: 18, y: 27 },
    ],
    summary: L(
      "Islam entered through Kairouan; then local dynasties emerged — the Ibāḍī Rustamids at Tahert became a scholarly, principled counter-caliphate in the interior.",
      "L'islam entra par Kairouan ; puis des dynasties locales émergèrent — les Rostémides ibadites de Tahert formèrent un contre-califat savant et rigoriste à l'intérieur.",
      "دخل الإسلام عبر القيروان؛ ثم برزت دول محلية — أسّس الرستميون الإباضيون في تاهرت خلافة مضادّة علمية وصارمة في الداخل.",
    ),
  },
  {
    id: "zirids",
    name: L("Zirids", "Zirides", "الزيريون"),
    years: "972 – 1148",
    tagline: L("A Sanhaja Berber emirate that outlived its Fatimid patrons.", "Un émirat sanhâja qui survécut à ses parrains fatimides.", "إمارة صنهاجية أمازيغية تجاوزت رعاتها الفاطميين."),
    color: "#7a5a2a",
    territoryPath: "M 44 18 L 82 20 L 82 40 L 44 40 Z",
    markers: [
      { kind: "capital", name: L("Achir", "Achir", "أشير"), x: 48, y: 29 },
      { kind: "city", name: L("Msila", "M'Sila", "المسيلة"), x: 52, y: 32 },
      { kind: "city", name: L("Bejaia", "Béjaïa", "بجاية"), x: 52, y: 22 },
      { kind: "site", name: L("Qal'a of the Beni Hammad (proto)", "Qal'a des Béni Hammad (proto)", "قلعة بني حماد"), x: 58, y: 28 },
    ],
    summary: L(
      "Founded by the Sanhaja Berber leader Ziri ibn Manad, the Zirids ruled Ifriqiya from Kairouan and eastern Algeria under nominal Fatimid then independent authority.",
      "Fondés par Ziri ibn Manad, chef sanhâja, les Zirides gouvernèrent l'Ifriqiya depuis Kairouan et l'est algérien, sous autorité fatimide puis indépendante.",
      "أسّسها الأمير الصنهاجي زيري بن مناد، وحكم الزيريون إفريقية من القيروان وشرق الجزائر تحت السلطة الفاطمية ثم مستقلين.",
    ),
  },
  {
    id: "hammadids",
    name: L("Hammadids", "Hammadides", "الحماديون"),
    years: "1014 – 1152",
    tagline: L("A Berber emirate crowned by the citadel of Beni Hammad.", "Un émirat berbère couronné par la citadelle des Béni Hammad.", "إمارة أمازيغية توّجتها قلعة بني حماد."),
    color: "#a06428",
    territoryPath: "M 46 18 L 76 20 L 76 36 L 46 36 Z",
    markers: [
      { kind: "capital", name: L("Qal'a of the Beni Hammad", "Qal'a des Béni Hammad", "قلعة بني حماد"), x: 58, y: 28 },
      { kind: "capital", name: L("Bejaia (from 1090)", "Béjaïa (à partir de 1090)", "بجاية"), x: 52, y: 22 },
      { kind: "city", name: L("Constantine", "Constantine", "قسنطينة"), x: 65, y: 24 },
      { kind: "site", name: L("Great Mosque of the Qal'a", "Grande mosquée de la Qal'a", "الجامع الكبير بالقلعة"), x: 58, y: 28.5 },
    ],
    summary: L(
      "Breaking from the Zirids, Hammad ibn Buluggin built a mountain capital whose minaret still stands — a UNESCO site above the plains of the Hodna.",
      "Rompant avec les Zirides, Hammad ibn Buluggin fonda une capitale de montagne dont le minaret domine encore les plaines du Hodna — site UNESCO.",
      "انفصل حماد بن بلقين عن الزيريين، وشيّد عاصمة جبلية لا تزال مئذنتها قائمة فوق سهول الحضنة — من مواقع اليونسكو.",
    ),
  },
  {
    id: "almoravids",
    name: L("Almoravids", "Almoravides", "المرابطون"),
    years: "1040 – 1147",
    tagline: L("A veiled Saharan movement that reached from Senegal to Zaragoza.", "Un mouvement saharien voilé qui alla du Sénégal à Saragosse.", "حركة صحراوية ملثمة امتدت من السنغال إلى سرقسطة."),
    color: "#6a3a7a",
    territoryPath: "M 12 20 L 48 22 L 48 82 L 12 66 Z",
    markers: [
      { kind: "capital", name: L("Marrakesh (imperial)", "Marrakech (impériale)", "مراكش"), x: 8, y: 30 },
      { kind: "city", name: L("Tlemcen", "Tlemcen", "تلمسان"), x: 18, y: 26 },
      { kind: "city", name: L("Oran (founded 903, held)", "Oran", "وهران"), x: 22, y: 24 },
      { kind: "site", name: L("Tinmel roots (Sanhaja)", "Racines Tinmel (Sanhâja)", "جذور صنهاجية"), x: 35, y: 66 },
    ],
    summary: L(
      "Springing from Sanhaja Berbers of the Sahara, the Almoravid emirs unified Morocco and western Algeria and rescued Muslim Iberia at Sagrajas.",
      "Issus des Berbères sanhâja du Sahara, les émirs almoravides unifièrent le Maroc et l'ouest algérien et sauvèrent l'Ibérie musulmane à Sagrajas.",
      "انطلق المرابطون من أمازيغ صنهاجة الصحراء، ووحّدوا المغرب وغرب الجزائر وأنقذوا الأندلس في الزلاّقة.",
    ),
  },
  {
    id: "almohads",
    name: L("Almohads", "Almohades", "الموحّدون"),
    years: "1121 – 1269",
    tagline: L("A reforming Berber caliphate stretching from Tripoli to Seville.", "Un califat berbère réformateur, de Tripoli à Séville.", "خلافة أمازيغية إصلاحية من طرابلس إلى إشبيلية."),
    color: "#3a5a8b",
    territoryPath: "M 12 18 L 84 20 L 84 42 L 12 42 Z",
    markers: [
      { kind: "capital", name: L("Marrakesh (imperial)", "Marrakech (impériale)", "مراكش"), x: 8, y: 30 },
      { kind: "city", name: L("Tlemcen", "Tlemcen", "تلمسان"), x: 18, y: 26 },
      { kind: "city", name: L("Algiers", "Alger", "الجزائر"), x: 43, y: 22 },
      { kind: "city", name: L("Bejaia", "Béjaïa", "بجاية"), x: 52, y: 22 },
      { kind: "city", name: L("Constantine", "Constantine", "قسنطينة"), x: 65, y: 24 },
      { kind: "battle", name: L("Battle of Setif (1152)", "Bataille de Sétif", "معركة سطيف"), x: 58, y: 25 },
    ],
    summary: L(
      "Ibn Tumart's disciples founded a doctrinal caliphate that briefly unified the Maghreb under a single Berber authority reaching across Andalusia.",
      "Les disciples d'Ibn Tumart fondèrent un califat doctrinal qui unifia brièvement le Maghreb sous une seule autorité berbère jusqu'en Andalousie.",
      "أسّس أتباع ابن تومرت خلافة عقدية وحّدت المغرب لفترة قصيرة تحت سلطة أمازيغية واحدة امتدّت إلى الأندلس.",
    ),
  },
  {
    id: "regency",
    name: L("Regency of Algiers", "Régence d'Alger", "إيالة الجزائر"),
    years: "1516 – 1830",
    tagline: L("A Mediterranean sea-power under Ottoman suzerainty.", "Une puissance maritime méditerranéenne sous suzeraineté ottomane.", "قوّة بحرية متوسطية تحت السيادة العثمانية."),
    color: "#2a6a4a",
    territoryPath: "M 12 18 L 84 20 L 84 32 L 12 32 Z",
    relatedEraId: "ottoman",
    markers: [
      { kind: "capital", name: L("Algiers (El Djazair)", "Alger (El Djazair)", "الجزائر"), x: 43, y: 22 },
      { kind: "city", name: L("Oran", "Oran", "وهران"), x: 22, y: 24 },
      { kind: "city", name: L("Constantine", "Constantine", "قسنطينة"), x: 65, y: 24 },
      { kind: "city", name: L("Mascara", "Mascara", "معسكر"), x: 26, y: 27 },
      { kind: "site", name: L("Kasbah of Algiers", "Casbah d'Alger", "قصبة الجزائر"), x: 43, y: 21.5 },
      { kind: "battle", name: L("Naval Battle of Algiers (1541)", "Débâcle de Charles Quint", "غزوة شارل الخامس"), x: 44, y: 20.5 },
    ],
    summary: L(
      "Founded by the Barbarossa brothers, the Regency became an autonomous Ottoman province ruled by deys — its corsair fleet shook every Mediterranean court for three centuries.",
      "Fondée par les frères Barberousse, la Régence devint une province ottomane autonome dirigée par des deys — sa flotte corsaire fit trembler la Méditerranée trois siècles durant.",
      "أسّسها الإخوة بربروس، وأصبحت ولاية عثمانية مستقلّة يحكمها الدايات — أرهب أسطولها القرصاني بلاطات المتوسط ثلاثة قرون.",
    ),
  },
  {
    id: "french",
    name: L("French Colonization", "Colonisation française", "الاستعمار الفرنسي"),
    years: "1830 – 1962",
    tagline: L("132 years of settlement, dispossession and resistance.", "132 années de colonisation, de dépossession et de résistance.", "132 عامًا من الاستيطان والاستلاب والمقاومة."),
    color: "#6a2a2a",
    territoryPath: "M 12 18 L 84 20 L 82 40 L 78 68 L 60 86 L 32 84 L 15 62 L 12 32 Z",
    relatedEraId: "french",
    markers: [
      { kind: "capital", name: L("Algiers", "Alger", "الجزائر"), x: 43, y: 22 },
      { kind: "city", name: L("Oran", "Oran", "وهران"), x: 22, y: 24 },
      { kind: "city", name: L("Constantine", "Constantine", "قسنطينة"), x: 65, y: 24 },
      { kind: "site", name: L("Smala of Abd el-Kader (1843)", "Smala d'Abd el-Kader", "زمالة الأمير عبد القادر"), x: 30, y: 34 },
      { kind: "battle", name: L("Landing at Sidi Fredj (1830)", "Débarquement de Sidi Fredj", "إنزال سيدي فرج"), x: 40, y: 21 },
      { kind: "battle", name: L("Siege of Constantine (1837)", "Siège de Constantine", "حصار قسنطينة"), x: 65, y: 24.5 },
      { kind: "battle", name: L("Battle of Sidi Brahim (1845)", "Bataille de Sidi Brahim", "معركة سيدي إبراهيم"), x: 20, y: 26 },
      { kind: "battle", name: L("Sétif & Guelma massacres (1945)", "Massacres de Sétif et Guelma", "مجازر سطيف وقالمة"), x: 58, y: 25.5 },
    ],
    summary: L(
      "The French invasion in 1830 dismantled the Regency and imposed 132 years of settler colonialism, met by continuous resistance from Abd el-Kader onward.",
      "L'invasion française de 1830 démantela la Régence et imposa 132 années de colonisation de peuplement, face à une résistance ininterrompue depuis Abd el-Kader.",
      "قوّض الغزو الفرنسي 1830 الإيالة وفرض 132 عامًا من الاستيطان، قابلَتها مقاومة متواصلة منذ الأمير عبد القادر.",
    ),
  },
  {
    id: "war-of-independence",
    name: L("War of Independence", "Guerre d'indépendance", "حرب الاستقلال"),
    years: "1954 – 1962",
    tagline: L("Six Wilayas, one revolution, and the Soummam blueprint.", "Six Wilayas, une révolution, et la charte de la Soummam.", "ست ولايات وثورة واحدة وميثاق الصومام."),
    color: "#8b4a1a",
    territoryPath: "M 12 18 L 84 20 L 82 40 L 78 68 L 60 86 L 32 84 L 15 62 L 12 32 Z",
    relatedEraId: "independence",
    markers: [
      { kind: "capital", name: L("Algiers (target)", "Alger (objectif)", "الجزائر"), x: 43, y: 22 },
      { kind: "site", name: L("Wilaya I — Aurès", "Wilaya I — Aurès", "الولاية الأولى — الأوراس"), x: 62, y: 32 },
      { kind: "site", name: L("Wilaya II — North Constantinois", "Wilaya II — Nord constantinois", "الولاية الثانية"), x: 71, y: 24 },
      { kind: "site", name: L("Wilaya III — Kabylie", "Wilaya III — Kabylie", "الولاية الثالثة — القبائل"), x: 52, y: 24 },
      { kind: "site", name: L("Wilaya IV — Algérois", "Wilaya IV — Algérois", "الولاية الرابعة"), x: 42, y: 26 },
      { kind: "site", name: L("Wilaya V — Oranie", "Wilaya V — Oranie", "الولاية الخامسة"), x: 24, y: 28 },
      { kind: "site", name: L("Wilaya VI — Sahara", "Wilaya VI — Sahara", "الولاية السادسة"), x: 48, y: 56 },
      { kind: "battle", name: L("Toussaint Rouge (1 Nov 1954)", "Toussaint Rouge", "الفاتح من نوفمبر"), x: 62, y: 30 },
      { kind: "battle", name: L("Battle of Algiers (1957)", "Bataille d'Alger", "معركة الجزائر"), x: 43, y: 22 },
      { kind: "site", name: L("Soummam Congress (1956)", "Congrès de la Soummam", "مؤتمر الصومام"), x: 52, y: 24.5 },
    ],
    summary: L(
      "The FLN's armed struggle divided the country into six Wilayas; the Soummam Congress of 1956 gave the revolution its political spine. Independence came on 5 July 1962.",
      "La lutte armée du FLN divisa le pays en six Wilayas ; le Congrès de la Soummam (1956) donna à la révolution sa colonne vertébrale politique. L'indépendance vint le 5 juillet 1962.",
      "قسّم كفاح جبهة التحرير الوطني البلد إلى ست ولايات؛ ومنح مؤتمر الصومام (1956) الثورة عمودها السياسي. جاء الاستقلال في 5 يوليو 1962.",
    ),
  },
  {
    id: "modern",
    name: L("Modern Algeria", "Algérie contemporaine", "الجزائر الحديثة"),
    years: "1962 – today",
    tagline: L("An independent republic across 58 wilayas.", "Une république indépendante sur 58 wilayas.", "جمهورية مستقلّة عبر 58 ولاية."),
    color: "#2a8b6a",
    territoryPath: "M 12 18 L 84 20 L 82 40 L 78 68 L 60 86 L 32 84 L 15 62 L 12 32 Z",
    relatedEraId: "independence",
    markers: [
      { kind: "capital", name: L("Algiers", "Alger", "الجزائر"), x: 43, y: 22 },
      { kind: "city", name: L("Oran", "Oran", "وهران"), x: 22, y: 24 },
      { kind: "city", name: L("Constantine", "Constantine", "قسنطينة"), x: 65, y: 24 },
      { kind: "city", name: L("Annaba", "Annaba", "عنابة"), x: 74, y: 22 },
      { kind: "city", name: L("Tlemcen", "Tlemcen", "تلمسان"), x: 18, y: 26 },
      { kind: "city", name: L("Ghardaia", "Ghardaïa", "غرداية"), x: 45, y: 50 },
      { kind: "city", name: L("Tamanrasset", "Tamanrasset", "تمنراست"), x: 55, y: 80 },
      { kind: "site", name: L("Tassili n'Ajjer (UNESCO)", "Tassili n'Ajjer (UNESCO)", "الطاسيلي ناجر"), x: 72, y: 68 },
    ],
    summary: L(
      "The People's Democratic Republic of Algeria, largest country in Africa, spans the Mediterranean to the Sahel — from the Kasbah of Algiers to the sandstone galleries of Tassili.",
      "La République algérienne démocratique et populaire, plus grand pays d'Afrique, va de la Méditerranée au Sahel — de la Casbah d'Alger aux grès du Tassili.",
      "الجمهورية الجزائرية الديمقراطية الشعبية، أكبر بلد في إفريقيا، تمتدّ من المتوسط إلى الساحل — من قصبة الجزائر إلى نقوش الطاسيلي.",
    ),
  },
];

export const MARKER_META: Record<
  MarkerKind,
  { glyph: string; label: LocalizedString }
> = {
  capital: { glyph: "★", label: L("Capital", "Capitale", "العاصمة") },
  city: { glyph: "●", label: L("City", "Ville", "مدينة") },
  site: { glyph: "◆", label: L("Historical site", "Site historique", "موقع تاريخي") },
  battle: { glyph: "⚔", label: L("Major battle", "Bataille majeure", "معركة كبرى") },
};

export function getPeriod(id: string | null | undefined): AtlasPeriod | null {
  if (!id) return null;
  return ATLAS_PERIODS.find((p) => p.id === id) ?? null;
}

/**
 * Timgad — a permanent exhibit of DZ Odyssey.
 *
 * Built on the shared museum-exhibit library extracted from the M'Zab Valley
 * exhibit (`@/components/exhibit`): museum hero, geographic orientation with a
 * data card, long-form interpretive sections, alternating text and figure
 * blocks, UNESCO criteria panel, unexpected facts, museum collection plates,
 * "where to go next", and the provenance panel.
 *
 * Timgad already existed inside the Roman Algeria gallery as a milestone. This
 * route gives the site its own canonical exhibit; /era/roman remains the
 * broader contextual gallery and is linked as a related exhibit.
 */

import { createFileRoute, Link } from "@tanstack/react-router";
import { Header } from "@/components/Header";
import { useLang } from "@/lib/i18n";
import { t as tr } from "@/lib/i18n";
import { pageMeta, headLang } from "@/lib/seo";
import { PAGE_META } from "@/lib/pageMetaCopy";
import { ExhibitProvenance } from "@/components/provenance/ExhibitProvenance";
import {
  Section,
  EyebrowTitle,
  Prose,
  Figure,
  ExhibitHero,
  SplitFigure,
  NumberedGrid,
  DiscoveryCards,
  DataStatsCard,
  CriteriaList,
  PullQuote,
  CollectionGrid,
  RelatedExhibits,
  type NumberedItem,
  type CollectionPlate,
  type RelatedExhibit,
} from "@/components/exhibit";
import timgadHero from "@/assets/exhibit-timgad.jpg";
import romanEra from "@/assets/era-roman.jpg";
import djemilaImg from "@/assets/exhibit-djemila.jpg";
import tipasaImg from "@/assets/exhibit-tipasa.jpg";

export const Route = createFileRoute("/timgad")({
  head: ({ match }) =>
    pageMeta({
      lang: headLang(match),
      path: "/timgad",
      ...PAGE_META["/timgad"],
      image: timgadHero,
      type: "article",
    }),
  component: TimgadExhibit,
});

type Tri = { en: string; fr: string; ar: string };
const L = (en: string, fr: string, ar: string): Tri => ({ en, fr, ar });

/* ------------------------------------------------------------------ */
/*  content                                                            */
/* ------------------------------------------------------------------ */

const HERO = {
  eyebrow: L("Permanent exhibit · Aurès", "Exposition permanente · Aurès", "معرض دائم · الأوراس"),
  title: L("Timgad", "Timgad", "تيمقاد"),
  subtitle: L("A city drawn with a ruler.", "Une cité tracée à la règle.", "مدينةٌ رُسمت بالمسطرة."),
  lede: L(
    "In the year 100 CE the emperor Trajan ordered a new town for retired soldiers on the northern slope of the Aurès. Surveyors laid a perfect square on empty ground, cut two great avenues through it, and filled the rest with a chessboard of streets. Sand buried the result for more than a thousand years, which is exactly why it survives today as the clearest Roman city plan anywhere in the world.",
    "En l'an 100, l'empereur Trajan ordonna la fondation d'une ville pour soldats vétérans sur le versant nord de l'Aurès. Les arpenteurs tracèrent un carré parfait sur un terrain vide, y percèrent deux grandes avenues et remplirent le reste d'un damier de rues. Le sable recouvrit l'ensemble pendant plus de mille ans, et c'est précisément pour cette raison que Timgad offre aujourd'hui le plan de cité romaine le plus lisible au monde.",
    "في سنة 100 للميلاد أمر الإمبراطور تراجان بإنشاء مدينة لجنودٍ متقاعدين على السفح الشمالي للأوراس. رسم المساحون مربّعاً كاملاً على أرضٍ خالية، وشقّوا فيه جادّتين كبيرتين، وملأوا ما تبقّى بشبكةٍ من الشوارع. غطّى الرملُ المدينة أكثر من ألف عام، ولهذا السبب بالذات تقدّم تيمقاد اليوم أوضح مخطّط لمدينة رومانية في العالم.",
  ),
  cta: L("Enter the exhibit", "Entrer dans l'exposition", "ادخل المعرض"),
  back: L("← Return to museum", "← Retour au musée", "← عودة إلى المتحف"),
  caption: L(
    "The colonnaded decumanus of Thamugadi, looking toward the Arch of Trajan",
    "Le decumanus à colonnades de Thamugadi, vers l'arc de Trajan",
    "الجادّة المعمّدة في ثاموغادي في اتجاه قوس تراجان",
  ),
  imageAlt: L(
    "Wide view of the Roman ruins of Timgad, a paved colonnaded avenue running between low stone foundations toward a three-bay triumphal arch, mountains behind.",
    "Vue large des ruines romaines de Timgad, une avenue pavée à colonnades entre des fondations de pierre basses, menant à un arc de triomphe à trois baies, montagnes en arrière-plan.",
    "منظر واسع لأطلال تيمقاد الرومانية، جادّة مرصوفة معمّدة تمتدّ بين أساساتٍ حجرية منخفضة نحو قوس نصرٍ ثلاثي الفتحات، والجبال في الخلفية.",
  ),
};

const WHERE = {
  eyebrow: L("Where", "Où", "أين"),
  title: L("On the northern shoulder of the Aurès", "Sur l'épaule nord de l'Aurès", "على كتف الأوراس الشمالي"),
  body: L(
    "Timgad sits in the wilaya of Batna, about thirty-five kilometres east of the city of Batna, on a high plain where the Aurès massif meets the cereal country of the Hautes Plaines. The position was chosen for control rather than comfort. From here a garrison could watch the passes that lead south into the mountains, and the legionary base of Lambaesis lay a short march to the west.",
    "Timgad se trouve dans la wilaya de Batna, à environ trente-cinq kilomètres à l'est de la ville de Batna, sur un haut plateau où le massif de l'Aurès rejoint les terres céréalières des Hautes Plaines. La position fut choisie pour le contrôle plutôt que pour le confort. De là, une garnison pouvait surveiller les cols menant vers le sud dans la montagne, et la base légionnaire de Lambèse se trouvait à une courte marche à l'ouest.",
    "تقع تيمقاد في ولاية باتنة، على نحو خمسة وثلاثين كيلومتراً شرق مدينة باتنة، فوق سهلٍ مرتفع يلتقي فيه جبل الأوراس بأراضي الحبوب في الهضاب العليا. اختير الموقع للسيطرة لا للراحة. من هنا كان بإمكان الحامية مراقبة الممرّات المؤدّية جنوباً إلى الجبل، وكانت قاعدة الفيلق في لامبيز على مسيرة قصيرة غرباً.",
  ),
  stats: [
    { label: L("Roman name", "Nom romain", "الاسم الروماني"), value: L("Thamugadi", "Thamugadi", "ثاموغادي") },
    { label: L("Founded", "Fondation", "التأسيس"), value: L("100 CE", "100 apr. J.-C.", "100 م") },
    { label: L("Founder", "Fondateur", "المؤسّس"), value: L("Emperor Trajan", "L'empereur Trajan", "الإمبراطور تراجان") },
    { label: L("Original grid", "Trame d'origine", "الشبكة الأصلية"), value: L("about 355 m square", "environ 355 m de côté", "نحو 355 م لكلّ ضلع") },
    { label: L("Elevation", "Altitude", "الارتفاع"), value: L("about 1,000 m", "environ 1 000 m", "نحو 1000 م") },
    { label: L("Inscribed", "Inscription", "الإدراج"), value: L("UNESCO, 1982", "UNESCO, 1982", "اليونسكو، 1982") },
  ],
  cardLabel: L("Museum data card · Timgad", "Fiche muséale · Timgad", "بطاقة متحفية · تيمقاد"),
  cardFooter: L(
    "The founding inscription names the town Colonia Marciana Traiana Thamugadi, after Trajan and his sister Marciana. The Amazigh place name Thamugadi was there first, and it is the one that survived.",
    "L'inscription de fondation nomme la ville Colonia Marciana Traiana Thamugadi, d'après Trajan et sa sœur Marciana. Le toponyme amazigh Thamugadi était antérieur, et c'est lui qui a survécu.",
    "يسمّي نقش التأسيس المدينة كولونيا مارتسيانا تراجانا ثاموغادي، نسبةً إلى تراجان وأخته مارتسيانا. أمّا الاسم الأمازيغي ثاموغادي فكان أسبق، وهو الذي بقي.",
  ),
};

const FOUNDING = {
  eyebrow: L("Origins", "Origines", "الأصول"),
  title: L("A pension paid in city blocks", "Une retraite versée en îlots urbains", "تقاعدٌ يُدفع على شكل أحياء"),
  paragraphs: [
    L(
      "Rome had a standing problem: what to do with soldiers who had finished twenty-five years of service. Timgad was one answer. Veterans of the Third Augustan Legion, many of them recruited locally, received a house plot in a brand-new colony. They arrived as Roman citizens with land, and the town they filled was designed before any of them set foot in it.",
      "Rome avait un problème permanent : que faire des soldats ayant achevé vingt-cinq ans de service. Timgad fut une réponse. Des vétérans de la IIIe légion Auguste, souvent recrutés sur place, y reçurent une parcelle dans une colonie toute neuve. Ils arrivaient citoyens romains et propriétaires, dans une ville dessinée avant même qu'aucun d'eux n'y pose le pied.",
      "كانت لروما مشكلة دائمة: ماذا تفعل بجنودٍ أنهوا خمسة وعشرين عاماً من الخدمة. كانت تيمقاد إحدى الإجابات. حصل قدامى الفيلق الأوغسطي الثالث، وكثيرٌ منهم مجنّدون محليّاً، على قطعة أرضٍ في مستعمرة جديدة تماماً. وصلوا مواطنين رومانيين يملكون أرضاً، إلى مدينةٍ صُمّمت قبل أن تطأها أقدامهم.",
    ),
    L(
      "The people who lived there were not transplanted Italians. Inscriptions from the forum and the cemeteries are full of Amazigh names carrying Roman titles, families who spoke Punic or Libyan at home and Latin in the basilica. Timgad is a Roman city, and it is also an African city built by Africans who had learned to use Rome's tools.",
      "Ses habitants n'étaient pas des Italiens transplantés. Les inscriptions du forum et des nécropoles regorgent de noms amazighs portant des titres romains, familles qui parlaient punique ou libyque à la maison et latin à la basilique. Timgad est une cité romaine, et c'est aussi une cité africaine bâtie par des Africains qui avaient appris à se servir des outils de Rome.",
      "لم يكن سكّانها إيطاليين منقولين. نقوش الساحة والمقابر مليئة بأسماء أمازيغية تحمل ألقاباً رومانية، لعائلاتٍ تتحدّث البونيقية أو الليبية في البيت واللاتينية في البازيليكا. تيمقاد مدينة رومانية، وهي أيضاً مدينة إفريقية بناها أفارقة تعلّموا استخدام أدوات روما.",
    ),
    L(
      "Growth outran the plan within two generations. The square filled, then spilled past its own boundary in every direction, and the later quarters wander where the original streets march. That contrast, a rigid core with an improvised skirt, is one of the most useful things Timgad has to teach.",
      "La croissance déborda le plan en deux générations. Le carré se remplit, puis se répandit dans toutes les directions, et les quartiers tardifs serpentent là où les rues d'origine marchent au cordeau. Ce contraste, un noyau rigide bordé d'une frange improvisée, est l'un des enseignements les plus précieux de Timgad.",
      "تجاوز النموّ المخطّطَ خلال جيلين. امتلأ المربّع ثمّ فاض عن حدوده في كلّ اتجاه، وتعرّجت الأحياء المتأخّرة حيث تسير الشوارع الأصلية مستقيمة. هذا التباين، نواةٌ صارمة تحيط بها أطرافٌ مرتجلة، من أهمّ ما تعلّمه تيمقاد.",
    ),
  ],
};

const PLAN = {
  eyebrow: L("The plan", "Le plan", "المخطّط"),
  title: L("Two axes, one hundred and eleven blocks", "Deux axes, cent onze îlots", "محوران وأحد عشر ومئة حيّ"),
  body: [
    L(
      "The original colony is a square of roughly 355 metres a side, divided by the decumanus maximus running east to west and the cardo maximus running north to south. Where they would have crossed, the surveyors placed the forum instead, so the two great streets meet the civic heart rather than each other. The remaining space is cut into about 111 insulae, city blocks close to twenty metres square.",
      "La colonie d'origine est un carré d'environ 355 mètres de côté, divisé par le decumanus maximus d'est en ouest et le cardo maximus du nord au sud. À leur point de croisement, les arpenteurs ont placé le forum, de sorte que les deux grandes rues rencontrent le cœur civique plutôt que l'une l'autre. Le reste est découpé en environ 111 insulae, îlots d'une vingtaine de mètres de côté.",
      "المستعمرة الأصلية مربّعٌ ضلعه نحو 355 متراً، يقسمه الديكومانوس الأكبر من الشرق إلى الغرب والكاردو الأكبر من الشمال إلى الجنوب. وعند نقطة تقاطعهما وضع المساحون الساحة العامة، فصار الشارعان الكبيران يلتقيان بقلب المدينة لا ببعضهما. أمّا ما تبقّى فقُسّم إلى نحو 111 حيّاً سكنياً، أضلاعها قرابة عشرين متراً.",
    ),
    L(
      "Nothing about this is improvised. It is the standard layout of a Roman military camp, scaled up and made permanent in stone. Walk one street and you can predict every other. That legibility is why Timgad became a textbook case for the study of Roman urbanism long before it became a heritage site.",
      "Rien ici n'est improvisé. C'est le tracé standard d'un camp militaire romain, agrandi et pétrifié. Parcourez une rue et vous pouvez prévoir toutes les autres. Cette lisibilité a fait de Timgad un cas d'école de l'urbanisme romain bien avant qu'elle ne devienne un site patrimonial.",
      "لا شيء هنا مرتجل. إنّه التخطيط المعتاد لمعسكرٍ روماني، مكبَّراً ومثبَّتاً في الحجر. امشِ في شارعٍ واحد تستطع توقّع بقيّة الشوارع. هذه الوضوحية جعلت تيمقاد نموذجاً دراسياً للعمران الروماني قبل وقتٍ طويل من إدراجها موقعاً تراثياً.",
    ),
  ],
  bullets: [
    L(
      "The cardo maximus is paved in large limestone slabs still grooved by cart wheels.",
      "Le cardo maximus est pavé de grandes dalles calcaires encore marquées par les ornières des chars.",
      "الكاردو الأكبر مرصوف بألواحٍ كلسية كبيرة لا تزال تحمل أخاديد عجلات العربات.",
    ),
    L(
      "Colonnaded porticoes lined the main streets, giving shade on a plain with almost none.",
      "Des portiques à colonnades bordaient les rues principales, offrant de l'ombre sur une plaine qui en manque.",
      "كانت الأروقة المعمّدة تحفّ الشوارع الرئيسية، فتوفّر ظلّاً في سهلٍ يكاد يخلو منه.",
    ),
    L(
      "Fourteen bath complexes have been identified, an extraordinary number for a town of this size.",
      "Quatorze complexes thermaux ont été identifiés, un nombre considérable pour une ville de cette taille.",
      "جرى تحديد أربعة عشر مجمّعاً للحمّامات، وهو عددٌ استثنائي لمدينةٍ بهذا الحجم.",
    ),
    L(
      "Public latrines on the forum square still have their carved dolphin armrests in place.",
      "Les latrines publiques de la place du forum conservent leurs accoudoirs sculptés en forme de dauphins.",
      "لا تزال المراحيض العامة في ساحة الفوروم تحتفظ بمساند أذرعها المنحوتة على هيئة دلافين.",
    ),
  ],
  imageAlt: L(
    "Roman ruins across a plateau at low sun, rows of standing columns and rectangular stone foundations laid out in a regular grid.",
    "Ruines romaines sur un plateau au soleil rasant, rangées de colonnes debout et fondations de pierre rectangulaires disposées en trame régulière.",
    "أطلال رومانية على هضبة تحت شمسٍ منخفضة، صفوفٌ من الأعمدة القائمة وأساسات حجرية مستطيلة موزّعة على شبكة منتظمة.",
  ),
  imageCaption: L(
    "Roman Algeria · the grid city seen from the plateau",
    "Algérie romaine · la cité en damier vue du plateau",
    "الجزائر الرومانية · المدينة الشبكية من الهضبة",
  ),
};

const MONUMENTS: NumberedItem[] = [
  {
    title: L("The Arch of Trajan", "L'arc de Trajan", "قوس تراجان"),
    meta: L("Western gate", "Porte ouest", "البوابة الغربية"),
    body: L(
      "A sandstone arch about twelve metres high with three bays, a tall central passage for vehicles and two lower side passages for people on foot. It stands where the decumanus leaves the original square, and it became the emblem of the site.",
      "Un arc de grès d'environ douze mètres de haut à trois baies : un passage central élevé pour les véhicules, deux passages latéraux plus bas pour les piétons. Il se dresse là où le decumanus quitte le carré d'origine, et il est devenu l'emblème du site.",
      "قوسٌ من الحجر الرملي بارتفاع اثني عشر متراً تقريباً وثلاث فتحات: ممرّ مركزي مرتفع للعربات وممرّان جانبيان أخفض للمشاة. يقوم حيث يغادر الديكومانوس المربّع الأصلي، وقد صار رمز الموقع.",
    ),
    fact: L(
      "It is often called Timgad's triumphal arch, but it worked as a monumental city gate.",
      "On l'appelle souvent l'arc de triomphe de Timgad, mais il fonctionnait comme une porte urbaine monumentale.",
      "كثيراً ما يُسمّى قوس النصر في تيمقاد، لكنّه كان في الواقع بوّابة مدينةٍ ضخمة.",
    ),
  },
  {
    title: L("The theatre", "Le théâtre", "المسرح"),
    meta: L("About 168 CE", "Vers 168 apr. J.-C.", "نحو 168 م"),
    body: L(
      "Cut into a natural slope on the southern edge of the colony, the theatre seated in the region of three and a half thousand spectators, more than the original population of the town. It is still used for performances today.",
      "Adossé à une pente naturelle au sud de la colonie, le théâtre pouvait accueillir de l'ordre de trois mille cinq cents spectateurs, plus que la population initiale de la ville. Il accueille encore des représentations.",
      "نُحت المسرح في منحدرٍ طبيعي جنوب المستعمرة، وكان يتّسع لنحو ثلاثة آلاف وخمسمئة متفرّج، أي أكثر من عدد سكّان المدينة الأوائل. ولا يزال يستضيف العروض إلى اليوم.",
    ),
    fact: L(
      "A capacity larger than the population usually means the town served a wide rural hinterland.",
      "Une capacité supérieure à la population signifie en général que la ville desservait un vaste arrière-pays rural.",
      "سعةٌ تفوق عدد السكان تعني عادةً أنّ المدينة كانت تخدم ريفاً واسعاً حولها.",
    ),
  },
  {
    title: L("The library of Rogatianus", "La bibliothèque de Rogatianus", "مكتبة روغاتيانوس"),
    meta: L("Second or third century", "IIe ou IIIe siècle", "القرن الثاني أو الثالث"),
    body: L(
      "A semicircular reading hall with niches for scroll cupboards, paid for by a citizen named Marcus Julius Quintianus Flavius Rogatianus. Very few public libraries of the Roman world survive in a recognisable state, which makes this one of Timgad's rarest rooms.",
      "Une salle de lecture semi-circulaire à niches pour armoires à rouleaux, financée par un citoyen nommé Marcus Julius Quintianus Flavius Rogatianus. Très peu de bibliothèques publiques romaines subsistent sous une forme reconnaissable, ce qui en fait l'une des salles les plus rares de Timgad.",
      "قاعة قراءةٍ نصف دائرية بحُنيّاتٍ لخزائن المخطوطات، موّلها مواطن يُدعى ماركوس يوليوس كوينتيانوس فلافيوس روغاتيانوس. قليلةٌ جداً هي المكتبات العامة الرومانية التي بقيت في حالةٍ يمكن التعرّف عليها، ما يجعل هذه من أندر قاعات تيمقاد.",
    ),
  },
  {
    title: L("The forum and its inscription", "Le forum et son inscription", "الفوروم ونقشه"),
    meta: L("Civic centre", "Centre civique", "المركز المدني"),
    body: L(
      "A paved square ringed by a basilica, a council house, temples and shops, and scattered with statue bases whose inscriptions record the names of the people who paid for the city. One paving stone carries a famous scratched line about how to spend a life.",
      "Une place dallée entourée d'une basilique, d'une curie, de temples et de boutiques, parsemée de socles de statues dont les inscriptions conservent les noms de ceux qui ont financé la ville. Une dalle porte une célèbre ligne gravée sur la manière de passer sa vie.",
      "ساحةٌ مبلّطة تحيط بها بازيليكا ودار مجلسٍ ومعابد ودكاكين، وتنتشر فيها قواعد تماثيل تحفظ نقوشُها أسماء من موّلوا المدينة. وعلى إحدى بلاطاتها سطرٌ محفور شهير عن كيفية قضاء العمر.",
    ),
  },
  {
    title: L("The Christian quarter", "Le quartier chrétien", "الحيّ المسيحي"),
    meta: L("Fourth and fifth centuries", "IVe et Ve siècles", "القرنان الرابع والخامس"),
    body: L(
      "Outside the original square stand a large basilica and a baptistery with a mosaic font. Timgad was a stronghold of Donatism, the North African Christian movement that broke with Rome over the question of clergy who had yielded under persecution.",
      "Hors du carré d'origine se dressent une grande basilique et un baptistère au bassin de mosaïque. Timgad fut une place forte du donatisme, mouvement chrétien nord-africain qui rompit avec Rome sur la question des clercs ayant cédé sous la persécution.",
      "خارج المربّع الأصلي تقوم بازيليكا كبيرة ومعمودية بحوضٍ من الفسيفساء. كانت تيمقاد معقلاً للدوناتية، وهي حركة مسيحية شمال إفريقية انفصلت عن روما بسبب مسألة رجال الدين الذين تراجعوا تحت الاضطهاد.",
    ),
    fact: L(
      "Donatism was, among other things, an African church asserting its independence of judgement.",
      "Le donatisme fut, entre autres, une Église africaine affirmant son indépendance de jugement.",
      "كانت الدوناتية، من بين أمور أخرى، كنيسةً إفريقية تؤكّد استقلال حكمها.",
    ),
  },
  {
    title: L("The Byzantine fort", "Le fort byzantin", "الحصن البيزنطي"),
    meta: L("539 CE", "539 apr. J.-C.", "539 م"),
    body: L(
      "South of the town, a compact walled fortress was raised under the Byzantine general Solomon, partly out of stone quarried from the ruins of the Roman city it was meant to protect. It is the last major building phase on the site.",
      "Au sud de la ville, une forteresse compacte fut élevée sous le général byzantin Solomon, en partie avec des pierres prélevées sur les ruines de la cité romaine qu'elle devait protéger. C'est la dernière grande phase de construction du site.",
      "جنوب المدينة رُفعت قلعةٌ مسوّرة مُحكمة في عهد القائد البيزنطي سولومون، بحجارةٍ نُزع بعضها من أطلال المدينة الرومانية التي كان يفترض أن تحميها. وهي آخر مرحلة بناءٍ كبرى في الموقع.",
    ),
  },
];

const AFTERLIFE = {
  eyebrow: L("Afterlife", "Après la cité", "ما بعد المدينة"),
  title: L("Buried, forgotten, then read again", "Ensevelie, oubliée, puis relue", "مدفونة ثمّ منسيّة ثمّ مقروءة من جديد"),
  paragraphs: [
    L(
      "Vandal raids in the fifth century and Amazigh mountain revolts weakened the town. The Byzantine reoccupation gave it a garrison but not a future. After the seventh century Thamugadi ceased to be a city, and the wind did the rest, laying sand over streets, thresholds and paving stones until only the tops of columns showed.",
      "Les raids vandales du Ve siècle et les révoltes amazighes des montagnes affaiblirent la ville. La réoccupation byzantine lui donna une garnison mais pas d'avenir. Après le VIIe siècle, Thamugadi cessa d'être une cité, et le vent fit le reste, déposant le sable sur les rues, les seuils et les dallages jusqu'à ne laisser voir que le sommet des colonnes.",
      "أضعفت غارات الوندال في القرن الخامس وثورات الجبل الأمازيغية المدينة. ومنحتها إعادة الاحتلال البيزنطي حاميةً لا مستقبلاً. وبعد القرن السابع لم تعد ثاموغادي مدينة، وأتمّت الريح ما بقي، فغطّى الرملُ الشوارع والعتبات والبلاط حتى لم يظهر سوى رؤوس الأعمدة.",
    ),
    L(
      "That burial is the reason the plan is legible. Cities that stayed alive were rebuilt on top of themselves; Timgad was simply sealed. Excavation began in 1881 and continued for decades, lifting a whole street network back into daylight almost intact.",
      "Cet ensevelissement explique la lisibilité du plan. Les villes restées vivantes se sont reconstruites sur elles-mêmes ; Timgad, elle, a été scellée. Les fouilles commencées en 1881 se poursuivirent des décennies, ramenant au jour tout un réseau de rues presque intact.",
      "هذا الدفن هو سبب وضوح المخطّط. فالمدن التي بقيت حيّة أُعيد بناؤها فوق نفسها، أمّا تيمقاد فقد خُتم عليها ببساطة. بدأت الحفريات سنة 1881 واستمرّت عقوداً، فأعادت شبكة شوارع كاملة إلى النور شبه سليمة.",
    ),
    L(
      "Excavation was not neutral. It took place under colonial rule, and much of the early publication served an argument that Roman Africa was a European inheritance. Reading Timgad honestly means holding both facts at once: the archaeology is invaluable, and the frame it was first presented in was political.",
      "La fouille ne fut pas neutre. Elle eut lieu sous domination coloniale, et une grande part des premières publications servait l'idée que l'Afrique romaine était un héritage européen. Lire Timgad honnêtement suppose de tenir les deux faits ensemble : l'archéologie est précieuse, et le cadre de sa première présentation était politique.",
      "لم تكن الحفريات محايدة. جرت في ظلّ الحكم الاستعماري، وخدم كثيرٌ من المنشورات الأولى فكرةَ أنّ إفريقيا الرومانية إرثٌ أوروبي. وقراءة تيمقاد بأمانة تقتضي الجمع بين الأمرين: الأثريّات ثمينة، والإطار الذي قُدّمت فيه أوّل مرّة كان سياسياً.",
    ),
  ],
  quote: L(
    "To hunt, to bathe, to play, to laugh, that is to live.",
    "Chasser, se baigner, jouer, rire, voilà vivre.",
    "أن تصطاد، أن تستحمّ، أن تلعب، أن تضحك، تلك هي الحياة.",
  ),
  attribution: L(
    "Inscription carved on a paving stone of the forum, Timgad",
    "Inscription gravée sur une dalle du forum, Timgad",
    "نقشٌ محفور على بلاطة في فوروم تيمقاد",
  ),
};

const UNESCO = {
  eyebrow: L("World Heritage", "Patrimoine mondial", "التراث العالمي"),
  title: L("Inscribed in 1982", "Inscrite en 1982", "أُدرجت سنة 1982"),
  intro: L(
    "Timgad was added to the World Heritage List in 1982 as an outstanding example of Roman town planning. The inscribed property covers the colony, its extensions, the Byzantine fort and the surrounding archaeological zone.",
    "Timgad a été inscrite sur la Liste du patrimoine mondial en 1982 comme exemple remarquable d'urbanisme romain. Le bien inscrit couvre la colonie, ses extensions, le fort byzantin et la zone archéologique environnante.",
    "أُدرجت تيمقاد في قائمة التراث العالمي سنة 1982 بوصفها مثالاً بارزاً على التخطيط العمراني الروماني. ويشمل الموقع المُدرَج المستعمرة وامتداداتها والحصن البيزنطي والمنطقة الأثرية المحيطة.",
  ),
  criteria: [
    {
      code: "ii",
      body: L(
        "Timgad shows the exchange of urban ideas between Rome and North Africa, a military layout adapted to an African plateau and its climate.",
        "Timgad illustre l'échange d'idées urbaines entre Rome et l'Afrique du Nord, un tracé militaire adapté à un plateau africain et à son climat.",
        "تُظهر تيمقاد تبادل الأفكار العمرانية بين روما وشمال إفريقيا، تخطيطٌ عسكري كُيّف مع هضبةٍ إفريقية ومناخها.",
      ),
    },
    {
      code: "iii",
      body: L(
        "It bears exceptional testimony to the Roman colonial civilisation of the African provinces and to the communities, largely Amazigh, who lived it.",
        "Elle porte un témoignage exceptionnel sur la civilisation coloniale romaine des provinces africaines et sur les communautés, largement amazighes, qui l'ont vécue.",
        "تقدّم شهادةً استثنائية على الحضارة الاستعمارية الرومانية في المقاطعات الإفريقية وعلى المجتمعات، الأمازيغية في معظمها، التي عاشتها.",
      ),
    },
    {
      code: "iv",
      body: L(
        "The orthogonal grid, preserved almost complete, is an outstanding example of a type of urban ensemble illustrating a significant stage in human history.",
        "La trame orthogonale, conservée presque intégralement, est un exemple éminent d'ensemble urbain illustrant une étape significative de l'histoire humaine.",
        "الشبكة المتعامدة، المحفوظة شبه كاملة، مثالٌ بارز على نمطٍ عمراني يجسّد مرحلة مهمّة في تاريخ البشرية.",
      ),
    },
  ],
  panels: [
    {
      title: L("What is protected", "Ce qui est protégé", "ما هو محمي"),
      body: L(
        "The Roman colony and its later suburbs, the theatre, the forum, the arch, the library, the Christian complex, the Byzantine fort and the necropolises, together with their setting on the plateau.",
        "La colonie romaine et ses faubourgs tardifs, le théâtre, le forum, l'arc, la bibliothèque, l'ensemble chrétien, le fort byzantin et les nécropoles, avec leur cadre sur le plateau.",
        "المستعمرة الرومانية وضواحيها المتأخّرة، والمسرح والفوروم والقوس والمكتبة والمجمّع المسيحي والحصن البيزنطي والمقابر، مع محيطها على الهضبة.",
      ),
    },
    {
      title: L("The pressures", "Les pressions", "الضغوط"),
      body: L(
        "Exposed stone weathers. Frost, rain and wind erode carved surfaces, vegetation lifts paving, and visitor circulation wears the main streets. Conservation at Timgad is mostly patient maintenance rather than reconstruction.",
        "La pierre exposée s'altère. Gel, pluie et vent érodent les surfaces sculptées, la végétation soulève les dallages, et la circulation des visiteurs use les rues principales. La conservation à Timgad relève surtout de l'entretien patient plutôt que de la reconstruction.",
        "الحجر المكشوف يتعرّى. فالصقيع والمطر والريح تنخر الأسطح المنحوتة، والنبات يرفع البلاط، وحركة الزوّار تُبلي الشوارع الرئيسية. والحفاظ في تيمقاد صيانةٌ صبورة أكثر منه إعادة بناء.",
      ),
    },
  ],
};

const WHY = {
  eyebrow: L("Why it matters", "Pourquoi c'est important", "لماذا يهمّ هذا"),
  title: L("A city you can still read", "Une cité encore lisible", "مدينةٌ لا تزال تُقرأ"),
  paragraphs: [
    L(
      "Most ancient cities reach us as fragments. Timgad reaches us as a document. You can stand at the forum and see, in one turn of the head, how a Roman town organised water, worship, government, entertainment and waste. Very few places on earth allow that.",
      "La plupart des cités antiques nous parviennent en fragments. Timgad nous parvient comme un document. On peut se tenir au forum et voir, d'un seul regard circulaire, comment une ville romaine organisait l'eau, le culte, le gouvernement, le divertissement et les déchets. Très peu de lieux au monde le permettent.",
      "تصلنا معظم المدن القديمة شظايا. أمّا تيمقاد فتصلنا وثيقة. يمكنك أن تقف في الفوروم فترى بلفتة واحدة كيف نظّمت مدينةٌ رومانية الماء والعبادة والحكم والترفيه والنفايات. قليلةٌ جداً هي الأماكن التي تتيح ذلك.",
    ),
    L(
      "It also matters as Algerian history, not borrowed history. The men and women whose names are cut into these stones were from here. Rome was a framework they used, argued with, and eventually outlived, and the Aurès around the site kept its own language and its own memory throughout.",
      "Elle importe aussi comme histoire algérienne, non comme histoire empruntée. Les hommes et les femmes dont les noms sont gravés dans ces pierres étaient d'ici. Rome fut un cadre qu'ils ont utilisé, contesté et finalement dépassé, et l'Aurès alentour a conservé tout du long sa langue et sa mémoire.",
      "وهي مهمّة أيضاً بوصفها تاريخاً جزائرياً لا تاريخاً مستعاراً. فالرجال والنساء الذين حُفرت أسماؤهم في هذه الحجارة كانوا من هنا. كانت روما إطاراً استعملوه وجادلوه وتجاوزوه في النهاية، وظلّ الأوراس المحيط محتفظاً بلغته وذاكرته طوال ذلك.",
    ),
  ],
};

const FACTS = [
  L(
    "Timgad had public latrines with marble seats, running water and carved dolphin armrests, arranged so users faced one another and could talk.",
    "Timgad possédait des latrines publiques à sièges de marbre, eau courante et accoudoirs sculptés en dauphins, disposées pour que les usagers se fassent face et puissent converser.",
    "كان في تيمقاد مراحيض عامة بمقاعد رخامية ومياه جارية ومساند أذرع منحوتة على شكل دلافين، مرتّبة بحيث يواجه المستخدمون بعضهم ويستطيعون الحديث.",
  ),
  L(
    "The town had roughly one bath complex for every three hundred original inhabitants.",
    "La ville comptait environ un complexe thermal pour trois cents habitants d'origine.",
    "كان في المدينة نحو مجمّع حمّاماتٍ واحد لكلّ ثلاثمئة من سكّانها الأوائل.",
  ),
  L(
    "Its Latin name preserves an Amazigh one. Thamugadi is the older word, and the imperial titles were added in front of it.",
    "Son nom latin conserve un nom amazigh. Thamugadi est le mot le plus ancien, et les titres impériaux ont été ajoutés devant.",
    "يحفظ اسمها اللاتيني اسماً أمازيغياً. فثاموغادي هي الكلمة الأقدم، وأُضيفت الألقاب الإمبراطورية أمامها.",
  ),
  L(
    "The library of Rogatianus is one of only a handful of Roman public libraries whose plan can still be traced on the ground.",
    "La bibliothèque de Rogatianus est l'une des rares bibliothèques publiques romaines dont le plan reste lisible au sol.",
    "مكتبة روغاتيانوس من المكتبات العامة الرومانية القليلة جداً التي لا يزال مخطّطها قابلاً للتتبّع على الأرض.",
  ),
  L(
    "The Byzantine fort was partly built from stones taken out of the Roman city, so the last builders on the site were also its first quarry workers.",
    "Le fort byzantin fut en partie bâti avec des pierres prises à la cité romaine : les derniers bâtisseurs du site en furent aussi les premiers carriers.",
    "بُني الحصن البيزنطي جزئياً من حجارةٍ أُخذت من المدينة الرومانية، فكان آخر بنّائي الموقع أوّل مقلعييه أيضاً.",
  ),
  L(
    "The theatre is still in use. Concerts are held in a hall that was cut into the hillside more than eighteen centuries ago.",
    "Le théâtre sert encore. Des concerts se tiennent dans une salle taillée dans la colline il y a plus de dix-huit siècles.",
    "لا يزال المسرح مستخدماً. تُقام الحفلات في قاعةٍ نُحتت في التلّ قبل أكثر من ثمانية عشر قرناً.",
  ),
];

const COLLECTION: CollectionPlate[] = [
  {
    src: timgadHero,
    alt: HERO.imageAlt,
    caption: L("Timgad · the decumanus and the arch", "Timgad · le decumanus et l'arc", "تيمقاد · الديكومانوس والقوس"),
    note: L(
      "Interpretive illustration produced for DZ Odyssey. Not a documentary photograph.",
      "Illustration interprétative produite pour DZ Odyssey. Il ne s'agit pas d'une photographie documentaire.",
      "رسمٌ تفسيري أُنتج لدي زد أوديسي. وليس صورة فوتوغرافية توثيقية.",
    ),
  },
  {
    src: romanEra,
    alt: PLAN.imageAlt,
    caption: L("Roman Algeria · the wider province", "Algérie romaine · la province élargie", "الجزائر الرومانية · المقاطعة الأوسع"),
    note: L(
      "Interpretive illustration produced for DZ Odyssey. Not a documentary photograph.",
      "Illustration interprétative produite pour DZ Odyssey. Il ne s'agit pas d'une photographie documentaire.",
      "رسمٌ تفسيري أُنتج لدي زد أوديسي. وليس صورة فوتوغرافية توثيقية.",
    ),
  },
  {
    src: djemilaImg,
    alt: L(
      "Roman ruins on a mountain terrace, a forum square framed by columns and a triumphal arch.",
      "Ruines romaines sur une terrasse de montagne, une place de forum encadrée de colonnes et un arc de triomphe.",
      "أطلال رومانية على مصطبةٍ جبلية، ساحة فوروم تحفّها الأعمدة وقوس نصر.",
    ),
    caption: L("Djémila · the mountain comparison", "Djémila · la comparaison montagnarde", "جميلة · المقارنة الجبلية"),
    note: L(
      "Shown for comparison. Djémila adapted its plan to a ridge, where Timgad imposed a grid on flat ground. Interpretive illustration.",
      "Présentée à titre de comparaison. Djémila a adapté son plan à une crête, là où Timgad a imposé une trame sur terrain plat. Illustration interprétative.",
      "معروضة للمقارنة. كيّفت جميلة مخطّطها مع حافةٍ جبلية، بينما فرضت تيمقاد شبكةً على أرضٍ مستوية. رسمٌ تفسيري.",
    ),
  },
  {
    src: tipasaImg,
    alt: L(
      "Roman and Punic ruins on a Mediterranean shoreline, columns and low walls above the sea.",
      "Ruines romaines et puniques sur un rivage méditerranéen, colonnes et murets au-dessus de la mer.",
      "أطلال رومانية وبونية على شاطئ المتوسط، أعمدة وجدران منخفضة فوق البحر.",
    ),
    caption: L("Tipasa · the coastal comparison", "Tipasa · la comparaison côtière", "تيبازة · المقارنة الساحلية"),
    note: L(
      "Shown for comparison, a port city rather than a veterans' colony. Interpretive illustration.",
      "Présentée à titre de comparaison, cité portuaire et non colonie de vétérans. Illustration interprétative.",
      "معروضة للمقارنة، مدينة ميناءٍ لا مستعمرة قدامى محاربين. رسمٌ تفسيري.",
    ),
  },
];

const RELATED: RelatedExhibit[] = [
  {
    to: "/era/$eraId",
    params: { eraId: "roman" },
    label: L("Roman Algeria", "L'Algérie romaine", "الجزائر الرومانية"),
    body: L(
      "The province around the city, from annexation to the Vandal arrival.",
      "La province autour de la cité, de l'annexion à l'arrivée des Vandales.",
      "المقاطعة حول المدينة، من الضمّ إلى وصول الوندال.",
    ),
  },
  {
    to: "/era/$eraId",
    params: { eraId: "numidia" },
    label: L("The Numidian kingdom", "Le royaume numide", "المملكة النوميدية"),
    body: L(
      "What stood on this land before Rome drew a single straight line.",
      "Ce qui existait sur cette terre avant que Rome n'y trace la moindre ligne droite.",
      "ما كان قائماً على هذه الأرض قبل أن ترسم روما أوّل خطٍّ مستقيم.",
    ),
  },
  {
    to: "/region/$regionId",
    params: { regionId: "aures" },
    label: L("The Aurès", "Les Aurès", "الأوراس"),
    body: L(
      "The mountains that watched the city rise, and outlasted it.",
      "Les montagnes qui ont vu la cité naître, et lui ont survécu.",
      "الجبال التي شهدت نشأة المدينة وبقيت بعدها.",
    ),
  },
  {
    to: "/tassili",
    label: L("Tassili n'Ajjer", "Tassili n'Ajjer", "طاسيلي ناجّر"),
    body: L(
      "A far older record of life in Algeria, painted on Saharan sandstone.",
      "Un témoignage bien plus ancien de la vie en Algérie, peint sur le grès saharien.",
      "سجلٌّ أقدم بكثير للحياة في الجزائر، مرسومٌ على الحجر الرملي الصحراوي.",
    ),
  },
  {
    to: "/mzab",
    label: L("The M'Zab Valley", "La vallée du M'Zab", "وادي مزاب"),
    body: L(
      "Another Algerian answer to the question of how to plan a city.",
      "Une autre réponse algérienne à la question de savoir comment planifier une ville.",
      "إجابةٌ جزائرية أخرى عن سؤال كيف تُخطَّط المدينة.",
    ),
  },
  {
    to: "/timeline",
    label: L("Algeria across time", "L'Algérie à travers le temps", "الجزائر عبر الزمن"),
    body: L(
      "Place Timgad on the long timeline of the country.",
      "Situer Timgad dans la longue frise du pays.",
      "ضع تيمقاد في التسلسل الزمني الطويل للبلاد.",
    ),
  },
];

/* ------------------------------------------------------------------ */
/*  page                                                               */
/* ------------------------------------------------------------------ */

function TimgadExhibit() {
  const lang = useLang();
  return (
    <div className="min-h-dvh bg-parchment text-foreground">
      <Header />
      <main id="main" tabIndex={-1}>
        <ExhibitHero
          eyebrow={HERO.eyebrow}
          title={HERO.title}
          subtitle={HERO.subtitle}
          lede={HERO.lede}
          image={timgadHero}
          imageAlt={HERO.imageAlt}
          imageCaption={HERO.caption}
          imageMediaKind="interpretive-illustration"
          ctaHref="#where"
          ctaLabel={HERO.cta}
          backTo="/"
          backLabel={HERO.back}
        />

        <Section id="where" tone="ivory">
          <div className="grid gap-10 md:grid-cols-[1.15fr_1fr]">
            <div>
              <EyebrowTitle eyebrow={WHERE.eyebrow} title={WHERE.title} />
              <Prose>
                <p>{tr(WHERE.body, lang)}</p>
              </Prose>
            </div>
            <DataStatsCard label={WHERE.cardLabel} stats={WHERE.stats} footer={WHERE.cardFooter} />
          </div>
        </Section>

        <Section id="founding" tone="parchment">
          <EyebrowTitle eyebrow={FOUNDING.eyebrow} title={FOUNDING.title} />
          <Prose>
            {FOUNDING.paragraphs.map((p, i) => (
              <p key={i}>{tr(p, lang)}</p>
            ))}
          </Prose>
        </Section>

        <Section id="plan" tone="ivory">
          <SplitFigure
            eyebrow={PLAN.eyebrow}
            title={PLAN.title}
            body={PLAN.body}
            bullets={PLAN.bullets}
            mirrored
            figure={
              <Figure
                src={romanEra}
                alt={PLAN.imageAlt}
                caption={PLAN.imageCaption}
                mediaKind="interpretive-illustration"
                width={1600}
                height={1008}
              />
            }
          />
        </Section>

        <Section id="monuments" tone="sand">
          <EyebrowTitle
            eyebrow={L("Walking the site", "Parcourir le site", "في أرجاء الموقع")}
            title={L("Six rooms of a city", "Six salles d'une cité", "ستّ قاعاتٍ من مدينة")}
          />
          <NumberedGrid
            items={MONUMENTS}
            columns={3}
            factLabel={L("Did you know", "Le saviez-vous", "هل تعلم")}
          />
        </Section>

        <Section id="afterlife" tone="parchment">
          <EyebrowTitle eyebrow={AFTERLIFE.eyebrow} title={AFTERLIFE.title} />
          <Prose>
            {AFTERLIFE.paragraphs.map((p, i) => (
              <p key={i}>{tr(p, lang)}</p>
            ))}
          </Prose>
          <PullQuote quote={AFTERLIFE.quote} attribution={AFTERLIFE.attribution} />
        </Section>

        <Section id="unesco" tone="ivory">
          <EyebrowTitle eyebrow={UNESCO.eyebrow} title={UNESCO.title} />
          <p className="max-w-3xl text-foreground/80 text-base sm:text-lg leading-[1.75] mb-10">
            {tr(UNESCO.intro, lang)}
          </p>
          <div className="grid gap-10 md:grid-cols-[1fr_1fr]">
            <div>
              <p className="text-xs uppercase tracking-[0.24em] font-bold text-primary">
                {tr(L("Criteria of inscription", "Critères d'inscription", "معايير الإدراج"), lang)}
              </p>
              <CriteriaList items={UNESCO.criteria} />
            </div>
            <div className="space-y-6">
              {UNESCO.panels.map((b, i) => (
                <div
                  key={i}
                  className="rounded-xl border border-border bg-card p-5"
                  style={{ boxShadow: "var(--shadow-soft)" }}
                >
                  <h3 className="text-sm uppercase tracking-[0.2em] font-bold text-primary">
                    {tr(b.title, lang)}
                  </h3>
                  <p className="mt-2 text-sm text-foreground/80 leading-[1.75]">{tr(b.body, lang)}</p>
                </div>
              ))}
            </div>
          </div>
        </Section>

        <Section id="why" tone="parchment">
          <EyebrowTitle eyebrow={WHY.eyebrow} title={WHY.title} />
          <Prose>
            {WHY.paragraphs.map((p, i) => (
              <p key={i}>{tr(p, lang)}</p>
            ))}
          </Prose>
        </Section>

        <Section id="did-you-know" tone="ivory">
          <EyebrowTitle
            eyebrow={L("Did you know?", "Le saviez-vous ?", "هل تعلم؟")}
            title={L("Six things the guidebooks skip", "Six choses que les guides oublient", "ستّة أمور تتجاهلها الأدلّة")}
          />
          <DiscoveryCards items={FACTS} label={L("Fact", "Fait", "معلومة")} />
        </Section>

        <Section id="collection" tone="parchment">
          <EyebrowTitle
            eyebrow={L("Museum collection", "Collection muséale", "المجموعة المتحفية")}
            title={L("Plates and comparisons", "Planches et comparaisons", "لوحات ومقارنات")}
          />
          <p className="max-w-3xl text-foreground/75 text-sm sm:text-base leading-[1.75] mb-8">
            {tr(
              L(
                "Every plate in this exhibit is an interpretive illustration produced for DZ Odyssey, not a documentary photograph of the site. Full provenance is listed at the end of the exhibit.",
                "Chaque planche de cette exposition est une illustration interprétative produite pour DZ Odyssey, et non une photographie documentaire du site. La provenance complète figure en fin d'exposition.",
                "كلّ لوحةٍ في هذا المعرض رسمٌ تفسيري أُنتج لدي زد أوديسي، لا صورة توثيقية للموقع. ويُذكر التوثيق الكامل في آخر المعرض.",
              ),
              lang,
            )}
          </p>
          <CollectionGrid plates={COLLECTION} plateLabel={L("Plate", "Planche", "لوحة")} />
        </Section>

        <Section id="related" tone="sand">
          <EyebrowTitle
            eyebrow={L("Related exhibits", "Expositions liées", "معارض ذات صلة")}
            title={L("Where to go next in the museum", "Où poursuivre la visite", "أين تُتابع الزيارة")}
          />
          <RelatedExhibits
            items={RELATED}
            label={L("Related exhibit", "Exposition liée", "معرض ذو صلة")}
            enterLabel={L("Enter →", "Entrer →", "ادخل ←")}
          />
        </Section>

        <section className="max-w-6xl mx-auto px-4 sm:px-6 py-12">
          <ExhibitProvenance exhibitId="timgad" />
        </section>

        <footer className="border-t border-border/60 bg-card/40">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 py-8 flex flex-wrap items-center justify-between gap-4">
            <p className="text-xs text-muted-foreground italic">
              {tr(
                L(
                  "Timgad · a permanent exhibit of DZ Odyssey.",
                  "Timgad · exposition permanente de DZ Odyssey.",
                  "تيمقاد · معرضٌ دائم في دي زد أوديسي.",
                ),
                lang,
              )}
            </p>
            <Link
              to="/"
              className="inline-flex items-center gap-2 text-sm font-semibold text-foreground hover:text-primary transition"
            >
              {tr(HERO.back, lang)}
            </Link>
          </div>
        </footer>
      </main>
    </div>
  );
}

export default TimgadExhibit;

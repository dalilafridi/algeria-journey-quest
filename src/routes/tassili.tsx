/**
 * Tassili n'Ajjer — a permanent exhibit of DZ Odyssey.
 *
 * Built on the shared museum-exhibit library extracted from the M'Zab Valley
 * exhibit (`@/components/exhibit`). Before this route existed, every "Tassili"
 * card in the museum resolved to the broader Early North Africa gallery. That
 * gallery remains, and is linked here as a related exhibit, but Tassili now
 * has its own canonical page.
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
  Plaque,
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
import tassiliHero from "@/assets/exhibit-tassili.jpg";
import earlyNorthAfrica from "@/assets/era-earlynorthafrica.jpg";

export const Route = createFileRoute("/tassili")({
  head: ({ match }) =>
    pageMeta({
      lang: headLang(match),
      path: "/tassili",
      ...PAGE_META["/tassili"],
      image: tassiliHero,
      type: "article",
    }),
  component: TassiliExhibit,
});

type Tri = { en: string; fr: string; ar: string };
const L = (en: string, fr: string, ar: string): Tri => ({ en, fr, ar });

/* ------------------------------------------------------------------ */
/*  content                                                            */
/* ------------------------------------------------------------------ */

const HERO = {
  eyebrow: L("Permanent exhibit · Sahara", "Exposition permanente · Sahara", "معرض دائم · الصحراء"),
  title: L("Tassili n'Ajjer", "Tassili n'Ajjer", "طاسيلي ناجّر"),
  subtitle: L("The Sahara, before it was a desert.", "Le Sahara, avant d'être un désert.", "الصحراء قبل أن تصير صحراء."),
  lede: L(
    "On a sandstone plateau in the far south-east of Algeria, people painted and carved for roughly twelve thousand years. They drew elephants, hippopotamus, giraffe, cattle herds, dancers, chariots and finally camels. Read in order, those images are the record of a green land drying out, and of the human beings who kept living on it as it changed.",
    "Sur un plateau de grès à l'extrême sud-est de l'Algérie, des hommes ont peint et gravé pendant environ douze mille ans. Ils ont représenté des éléphants, des hippopotames, des girafes, des troupeaux, des danseurs, des chars, puis des chameaux. Lues dans l'ordre, ces images racontent l'assèchement d'une terre verte et la persistance de ceux qui ont continué d'y vivre.",
    "على هضبةٍ من الحجر الرملي في أقصى جنوب شرق الجزائر، رسم الناس ونقشوا نحو اثني عشر ألف سنة. صوّروا الفيلة وأفراس النهر والزرافات وقطعان البقر والراقصين والعربات ثمّ الجمال أخيراً. وإذا قُرئت بالترتيب كانت سجلّاً لأرضٍ خضراء تجفّ، ولبشرٍ واصلوا العيش فيها وهي تتغيّر.",
  ),
  cta: L("Enter the exhibit", "Entrer dans l'exposition", "ادخل المعرض"),
  back: L("← Return to museum", "← Retour au musée", "← عودة إلى المتحف"),
  caption: L(
    "Eroded sandstone pillars of the Tassili plateau above the sand",
    "Piliers de grès érodés du plateau du Tassili au-dessus des sables",
    "أعمدة الحجر الرملي المتآكلة في هضبة طاسيلي فوق الرمال",
  ),
  imageAlt: L(
    "A Saharan plateau of tall eroded sandstone pillars and arches rising from pale sand under a clear sky.",
    "Un plateau saharien de hauts piliers et arches de grès érodés surgissant d'un sable clair sous un ciel dégagé.",
    "هضبة صحراوية من أعمدة وأقواسٍ عالية من الحجر الرملي المتآكل تنهض من رملٍ فاتح تحت سماءٍ صافية.",
  ),
};

const WHERE = {
  eyebrow: L("Where", "Où", "أين"),
  title: L("A plateau the size of a country", "Un plateau grand comme un pays", "هضبةٌ بحجم بلد"),
  body: L(
    "Tassili n'Ajjer lies in the wilaya of Illizi, in the far south-east of Algeria, reaching toward the borders with Libya and Niger. Djanet is the gateway town. The name comes from Tamazight and is usually rendered as the plateau of the rivers, a description that made plain sense when the rivers were still running.",
    "Le Tassili n'Ajjer se situe dans la wilaya d'Illizi, à l'extrême sud-est de l'Algérie, près des frontières libyenne et nigérienne. Djanet en est la ville d'accès. Le nom vient du tamazight et se traduit généralement par le plateau des rivières, une description qui allait de soi quand les rivières coulaient encore.",
    "يقع طاسيلي ناجّر في ولاية إليزي، في أقصى جنوب شرق الجزائر، قرب الحدود مع ليبيا والنيجر. وجانت هي مدينة المدخل. الاسم أمازيغي ويُترجم عادةً بهضبة الأنهار، وهو وصفٌ كان بديهياً حين كانت الأنهار تجري.",
  ),
  stats: [
    { label: L("Wilaya", "Wilaya", "الولاية"), value: L("Illizi", "Illizi", "إليزي") },
    { label: L("Protected area", "Aire protégée", "المساحة المحميّة"), value: L("about 72,000 km²", "environ 72 000 km²", "نحو 72,000 كم²") },
    { label: L("Highest point", "Point culminant", "أعلى نقطة"), value: L("Adrar Afao, 2,158 m", "Adrar Afao, 2 158 m", "أدرار أفاو، 2158 م") },
    { label: L("Recorded images", "Images recensées", "الصور المُحصاة"), value: L("more than 15,000", "plus de 15 000", "أكثر من 15,000") },
    { label: L("Oldest works", "Œuvres les plus anciennes", "أقدم الأعمال"), value: L("about 12,000 years", "environ 12 000 ans", "نحو 12,000 سنة") },
    { label: L("Inscribed", "Inscription", "الإدراج"), value: L("UNESCO, 1982", "UNESCO, 1982", "اليونسكو، 1982") },
  ],
  cardLabel: L("Museum data card · Tassili n'Ajjer", "Fiche muséale · Tassili n'Ajjer", "بطاقة متحفية · طاسيلي ناجّر"),
  cardFooter: L(
    "The property is one of the largest World Heritage sites on earth. Walking across it takes days, and most of it has never been surveyed in detail.",
    "Le bien est l'un des plus vastes sites du patrimoine mondial. Le traverser à pied prend des jours, et la majeure partie n'a jamais été prospectée en détail.",
    "الموقع من أكبر مواقع التراث العالمي على الأرض. يستغرق عبوره سيراً أياماً، ولم يُمسح معظمه تفصيلياً قط.",
  ),
};

const STONE = {
  eyebrow: L("The rock", "La roche", "الصخر"),
  title: L("A forest made of stone", "Une forêt de pierre", "غابةٌ من حجر"),
  body: [
    L(
      "Wind and long-vanished water have cut the sandstone into columns, corridors and arches, an eroded landscape often called a rock forest. Several hundred natural arches have been counted. The same erosion that carved these shapes also produced sheltered overhangs and shallow caves, and those shelters are where almost all of the art is found.",
      "Le vent et des eaux depuis longtemps disparues ont découpé le grès en colonnes, couloirs et arches, un paysage d'érosion souvent appelé forêt de pierre. Plusieurs centaines d'arches naturelles y ont été recensées. Cette même érosion a créé des abris sous roche et des grottes peu profondes, et c'est là que se trouve presque tout l'art.",
      "نحتت الريحُ ومياهٌ اختفت منذ زمنٍ بعيد الحجرَ الرملي أعمدةً وممرّاتٍ وأقواساً، في مشهدٍ تآكلي يُسمّى غالباً غابة الحجر. وقد أُحصيت فيه مئات الأقواس الطبيعية. وأنتج التآكل نفسه ملاجئ صخرية وكهوفاً ضحلة، وفيها يوجد الفنّ كلّه تقريباً.",
    ),
    L(
      "The plateau also shelters living relics of the wetter Sahara. Small stands of the endemic Saharan cypress, Cupressus dupreziana, survive here, some of them well over a thousand years old and unable to regenerate in the present climate. They are, in a sense, another kind of record of the same change.",
      "Le plateau abrite aussi des reliques vivantes du Sahara humide. De petits peuplements du cyprès saharien endémique, Cupressus dupreziana, y subsistent, certains largement millénaires et incapables de se régénérer dans le climat actuel. Ils constituent en un sens une autre trace du même changement.",
      "تحتضن الهضبة أيضاً بقايا حيّة من الصحراء الرطبة. فما تزال فيها مجموعاتٌ صغيرة من السرو الصحراوي المتوطّن، Cupressus dupreziana، بعضها يتجاوز عمره ألف عام ولا يقدر على التجدّد في المناخ الحالي. وهي بمعنى ما سجلٌّ آخر للتغيّر نفسه.",
    ),
  ],
  bullets: [
    L(
      "The plateau is also a UNESCO biosphere reserve, recognised in 1986.",
      "Le plateau est également réserve de biosphère de l'UNESCO, reconnue en 1986.",
      "الهضبة أيضاً محميّة محيط حيوي لدى اليونسكو، اعتُرف بها سنة 1986.",
    ),
    L(
      "Its wetlands were listed under the Ramsar Convention in 2001.",
      "Ses zones humides ont été inscrites au titre de la convention de Ramsar en 2001.",
      "أُدرجت أراضيها الرطبة ضمن اتفاقية رامسار سنة 2001.",
    ),
    L(
      "The Kel Ajjer Tuareg have lived with and around the plateau for centuries and remain its principal guides.",
      "Les Touaregs Kel Ajjer vivent avec et autour du plateau depuis des siècles et en demeurent les principaux guides.",
      "يعيش طوارق كل أجّر مع الهضبة وحولها منذ قرون، وما زالوا أدلّاءها الأساسيين.",
    ),
  ],
};

const PERIODS: NumberedItem[] = [
  {
    title: L("Large wild fauna", "Grande faune sauvage", "الحيوانات البرّية الكبرى"),
    meta: L("Earliest phase", "Phase la plus ancienne", "أقدم مرحلة"),
    body: L(
      "Deeply cut engravings of elephant, rhinoceros, hippopotamus and the extinct giant buffalo, animals that require standing water and grassland. This is the Sahara of lakes and rivers, and the images are the strongest evidence that it existed.",
      "Gravures profondes d'éléphants, de rhinocéros, d'hippopotames et du buffle géant disparu, animaux qui exigent eau permanente et prairies. C'est le Sahara des lacs et des rivières, et ces images en sont la meilleure preuve.",
      "نقوشٌ عميقة لفيلةٍ ووحيد قرنٍ وأفراس نهر والجاموس العملاق المنقرض، وهي حيواناتٌ تحتاج مياهاً دائمة ومروجاً. إنّها صحراء البحيرات والأنهار، وهذه الصور أقوى دليلٍ على وجودها.",
    ),
    fact: L(
      "The extinct buffalo Syncerus antiquus gives this phase its older scholarly name, the Bubalus period.",
      "Le buffle disparu Syncerus antiquus donne à cette phase son ancien nom savant, la période du Bubalus.",
      "أعطى الجاموس المنقرض Syncerus antiquus هذه المرحلة اسمها العلمي القديم، مرحلة البوباليس.",
    ),
  },
  {
    title: L("Round Head paintings", "Peintures des Têtes Rondes", "رسوم الرؤوس المستديرة"),
    meta: L("A distinct painted tradition", "Une tradition peinte distincte", "تقليدٌ تصويري متميّز"),
    body: L(
      "Large human figures with featureless rounded heads, sometimes several metres tall, often floating or masked. The style is unlike anything around it and its meaning is genuinely unresolved. Interpretations range from ritual and masking to ancestor imagery, and none of them is settled.",
      "De grandes figures humaines à tête ronde sans traits, parfois hautes de plusieurs mètres, souvent flottantes ou masquées. Le style ne ressemble à rien d'alentour et sa signification reste réellement indéterminée. Les interprétations vont du rituel et du masque à l'imagerie des ancêtres, sans qu'aucune ne s'impose.",
      "أشكالٌ بشرية كبيرة برؤوسٍ مستديرة بلا ملامح، يبلغ بعضها أمتاراً عدّة، وكثيراً ما تبدو طائرة أو مقنّعة. الأسلوب لا يشبه ما حوله، ومعناه غير محسوم فعلاً. تتراوح التأويلات بين الطقس والقناع وصور الأسلاف، ولا يحسم أيٌّ منها المسألة.",
    ),
    fact: L(
      "Popular claims that these figures depict visitors from elsewhere have no archaeological basis.",
      "Les affirmations populaires selon lesquelles ces figures représenteraient des visiteurs venus d'ailleurs n'ont aucun fondement archéologique.",
      "الادّعاءات الشائعة بأنّ هذه الأشكال تصوّر زوّاراً من مكانٍ آخر لا أساس أثريّاً لها.",
    ),
  },
  {
    title: L("The pastoral period", "La période pastorale", "المرحلة الرعوية"),
    meta: L("Cattle herders", "Éleveurs de bovins", "رعاة البقر"),
    body: L(
      "The largest and most detailed body of work. Herds of long-horned cattle, camps, milking scenes, women grinding grain, children, dogs, dances and negotiations. This is domestic life recorded from the inside, by people who had time and reason to record it.",
      "L'ensemble le plus vaste et le plus détaillé. Troupeaux de bovins aux longues cornes, campements, scènes de traite, femmes moulant le grain, enfants, chiens, danses et palabres. C'est la vie quotidienne notée de l'intérieur, par des gens qui avaient le temps et la raison de la noter.",
      "أكبر مجموعةٍ وأكثرها تفصيلاً. قطعان بقرٍ طويلة القرون ومخيّمات ومشاهد حلبٍ ونساء يطحنّ الحبّ وأطفال وكلاب ورقصات ومجالس تفاوض. إنّها الحياة اليومية مدوّنةً من الداخل، بأيدي من امتلكوا وقتاً وسبباً لتدوينها.",
    ),
    fact: L(
      "Individual animals are painted with distinct coat patterns, as if particular cows were being portrayed.",
      "Certains animaux sont peints avec des robes distinctes, comme si des vaches précises étaient portraiturées.",
      "رُسمت بعض الحيوانات بأنماط جلدٍ مميّزة، وكأنّ بقراتٍ بعينها كانت تُرسم.",
    ),
  },
  {
    title: L("The horse period", "La période du cheval", "مرحلة الحصان"),
    meta: L("Chariots and speed", "Chars et vitesse", "العربات والسرعة"),
    body: L(
      "Horses arrive, and with them light two-wheeled chariots, drawn in a flying-gallop convention. The landscape is drying, the cattle thin out, and the images turn toward movement, weapons and long-distance travel across a hardening land.",
      "Le cheval apparaît, et avec lui le char léger à deux roues, dessiné au galop volant. Le paysage s'assèche, les bovins se raréfient, et les images se tournent vers le mouvement, les armes et les longs trajets sur une terre qui durcit.",
      "يصل الحصان، ومعه العربات الخفيفة ذات العجلتين، مرسومةً بأسلوب العدو الطائر. الأرض تجفّ، والأبقار تتناقص، وتتّجه الصور نحو الحركة والسلاح والأسفار الطويلة في أرضٍ تزداد قسوة.",
    ),
  },
  {
    title: L("The camel period", "La période du chameau", "مرحلة الجمل"),
    meta: L("The desert arrives", "Le désert s'installe", "الصحراء تحلّ"),
    body: L(
      "The camel appears late, and once it does the Sahara as we know it has arrived. The paintings become sparser and more schematic, and Tifinagh inscriptions begin to appear beside them, linking the plateau directly to the Amazigh writing still used by Tuareg communities today.",
      "Le chameau apparaît tardivement, et dès lors le Sahara que nous connaissons est en place. Les peintures se raréfient et se schématisent, et des inscriptions tifinagh commencent à les accompagner, reliant directement le plateau à l'écriture amazighe encore utilisée aujourd'hui par les communautés touarègues.",
      "يظهر الجمل متأخّراً، وبظهوره تكون الصحراء التي نعرفها قد حلّت. تصبح الرسوم أقلّ وأكثر تجريداً، وتبدأ نقوش تيفيناغ بالظهور إلى جانبها، فتربط الهضبة مباشرةً بالكتابة الأمازيغية التي ما زالت مجتمعات الطوارق تستعملها اليوم.",
    ),
    fact: L(
      "Tifinagh at Tassili is a living thread, not a dead one. The script is still written in the Algerian Sahara.",
      "Le tifinagh au Tassili est un fil vivant, non éteint. L'écriture s'emploie encore au Sahara algérien.",
      "تيفيناغ في طاسيلي خيطٌ حيّ لا ميّت. فالكتابة ما زالت تُستعمل في الصحراء الجزائرية.",
    ),
  },
];

const CLIMATE = {
  eyebrow: L("Reading the images", "Lire les images", "قراءة الصور"),
  title: L("An archive of a changing climate", "Une archive du changement climatique", "أرشيفٌ لمناخٍ متغيّر"),
  body: [
    L(
      "Set the periods side by side and a sequence appears: hippopotamus, then cattle, then horses, then camels. Each animal needs less water than the one before it. The art is not a picture gallery, it is a long environmental record kept by the people who lived through the change, one wall at a time.",
      "Placez les périodes côte à côte et une séquence apparaît : hippopotames, puis bovins, puis chevaux, puis chameaux. Chaque animal exige moins d'eau que le précédent. Cet art n'est pas une galerie de tableaux, c'est un long relevé environnemental tenu par ceux qui ont vécu le changement, paroi après paroi.",
      "ضَعْ المراحل جنباً إلى جنب فيظهر تسلسل: أفراس النهر ثمّ البقر ثمّ الخيل ثمّ الجمال. كلّ حيوانٍ يحتاج ماءً أقلّ ممّن سبقه. هذا الفنّ ليس معرض لوحات، بل سجلٌّ بيئيّ طويل دوّنه من عاشوا التغيّر، جداراً بعد جدار.",
    ),
    L(
      "Dating remains difficult and debated. Styles overlap, walls were reused, and pigment on open rock rarely yields a clean date. Most chronologies here are relative sequences supported by subject matter and technique rather than fixed calendar years, and the museum states them as such.",
      "La datation reste difficile et discutée. Les styles se recoupent, les parois ont été réutilisées, et le pigment sur roche à l'air libre livre rarement une date nette. La plupart des chronologies sont ici des séquences relatives, fondées sur les sujets et les techniques plutôt que sur des années fixes, et le musée les présente comme telles.",
      "يبقى التأريخ صعباً ومحلّ نقاش. فالأساليب تتداخل، والجدران أُعيد استعمالها، ونادراً ما تعطي الأصباغ على صخرٍ مكشوف تاريخاً نظيفاً. ومعظم التسلسلات هنا نسبية، تستند إلى الموضوع والتقنية لا إلى سنواتٍ ثابتة، والمتحف يعرضها على هذا الأساس.",
    ),
  ],
  plaqueLabel: L("Curator's qualification", "Précision du conservateur", "توضيح القيّم"),
  plaqueBody: L(
    "Figures given for the number of images and for the age of the oldest works are estimates drawn from published survey work. They should be read as orders of magnitude, not counts.",
    "Les chiffres avancés sur le nombre d'images et l'âge des œuvres les plus anciennes sont des estimations issues de travaux de prospection publiés. Ils doivent être lus comme des ordres de grandeur, non comme des comptages.",
    "الأرقام المذكورة عن عدد الصور وعن عمر أقدم الأعمال تقديراتٌ مأخوذة من أعمال مسحٍ منشورة. وينبغي قراءتها بوصفها رتباً تقريبية لا إحصاءات دقيقة.",
  ),
};

const LHOTE = {
  eyebrow: L("How the world found out", "Comment le monde l'a appris", "كيف عرف العالم"),
  title: L("The expeditions, and their footnote", "Les expéditions, et leur note de bas de page", "البعثات وحاشيتها"),
  paragraphs: [
    L(
      "Tuareg communities knew these shelters for generations. Wider attention came through survey work in the 1930s and above all through the expedition led by Henri Lhote in 1956 and 1957, which produced hundreds of full-size copies and made Tassili famous well beyond Algeria.",
      "Les communautés touarègues connaissaient ces abris depuis des générations. L'attention plus large vint des prospections des années 1930 et surtout de l'expédition menée par Henri Lhote en 1956 et 1957, qui produisit des centaines de relevés grandeur nature et rendit le Tassili célèbre bien au-delà de l'Algérie.",
      "عرفت مجتمعات الطوارق هذه الملاجئ أجيالاً. أمّا الاهتمام الأوسع فجاء من أعمال المسح في ثلاثينيات القرن العشرين، وقبل كلّ شيء من بعثة هنري لوت سنتَي 1956 و1957، التي أنتجت مئات النسخ بالحجم الطبيعي وجعلت طاسيلي مشهوراً خارج الجزائر.",
    ),
    L(
      "That work carries a caution. Copyists sometimes wetted the walls to raise the colours, and some reproductions were completed or sharpened by hand. A few of the most widely circulated images owe part of their drama to the copy rather than the original. The exhibit reports the finds and the caveat together, because both are part of the record.",
      "Ce travail appelle une réserve. Les copistes mouillaient parfois les parois pour raviver les couleurs, et certaines reproductions furent complétées ou accentuées à la main. Quelques images parmi les plus diffusées doivent une part de leur force à la copie plutôt qu'à l'original. L'exposition rapporte les découvertes et la réserve ensemble, car les deux appartiennent au dossier.",
      "يستدعي هذا العمل تحفّظاً. فقد كان الناسخون يبلّلون الجدران أحياناً لإبراز الألوان، وأُكملت بعض النسخ أو شُدّدت باليد. وبعض أشهر الصور المتداولة يدين بجزءٍ من قوّته إلى النسخة لا إلى الأصل. يعرض المعرض الاكتشافات والتحفّظ معاً، لأنّ كليهما جزءٌ من السجلّ.",
    ),
  ],
  quote: L(
    "The plateau was never lost. It was only unvisited by the people who later announced they had found it.",
    "Le plateau n'a jamais été perdu. Il n'était simplement pas visité par ceux qui ont annoncé plus tard l'avoir découvert.",
    "لم تُفقد الهضبة قطّ. لم يزرها فحسب أولئك الذين أعلنوا لاحقاً أنّهم وجدوها.",
  ),
  attribution: L("Curator's note, DZ Odyssey", "Note du conservateur, DZ Odyssey", "ملاحظة القيّم، دي زد أوديسي"),
};

const UNESCO = {
  eyebrow: L("World Heritage", "Patrimoine mondial", "التراث العالمي"),
  title: L("A mixed site, inscribed in 1982", "Un bien mixte, inscrit en 1982", "موقعٌ مختلط، أُدرج سنة 1982"),
  intro: L(
    "Tassili n'Ajjer is inscribed for both its culture and its natural landscape, one of the relatively few mixed properties on the World Heritage List. The rock art and the eroded plateau that shelters it are protected as a single thing, because neither makes sense without the other.",
    "Le Tassili n'Ajjer est inscrit à la fois pour sa culture et pour son paysage naturel, l'un des rares biens mixtes de la Liste du patrimoine mondial. L'art rupestre et le plateau érodé qui l'abrite sont protégés comme un tout, car l'un n'a pas de sens sans l'autre.",
    "أُدرج طاسيلي ناجّر لثقافته ولمشهده الطبيعي معاً، وهو من المواقع المختلطة القليلة نسبياً في قائمة التراث العالمي. ويُحمى الفنّ الصخري والهضبة المتآكلة التي تأويه بوصفهما شيئاً واحداً، لأنّ أحدهما لا معنى له بلا الآخر.",
  ),
  criteria: [
    {
      code: "i",
      body: L(
        "The paintings and engravings are recognised as a masterpiece of human creative genius.",
        "Les peintures et gravures sont reconnues comme un chef-d'œuvre du génie créateur humain.",
        "تُعدّ الرسوم والنقوش تحفةً من روائع العبقرية الإبداعية البشرية.",
      ),
    },
    {
      code: "iii",
      body: L(
        "They bear exceptional testimony to prehistoric Saharan societies and to their disappearance as the climate changed.",
        "Elles portent un témoignage exceptionnel sur les sociétés sahariennes préhistoriques et sur leur disparition avec le changement climatique.",
        "تقدّم شهادةً استثنائية على مجتمعات الصحراء ما قبل التاريخ وعلى اندثارها مع تغيّر المناخ.",
      ),
    },
    {
      code: "vii",
      body: L(
        "The eroded sandstone landscape, with its pillars and natural arches, is of outstanding natural beauty.",
        "Le paysage de grès érodé, avec ses piliers et ses arches naturelles, est d'une beauté naturelle exceptionnelle.",
        "مشهد الحجر الرملي المتآكل، بأعمدته وأقواسه الطبيعية، ذو جمالٍ طبيعي استثنائي.",
      ),
    },
    {
      code: "viii",
      body: L(
        "The formations record major stages of the earth's history and ongoing geomorphic processes in an arid environment.",
        "Les formations témoignent d'étapes majeures de l'histoire de la Terre et de processus géomorphologiques en cours en milieu aride.",
        "تسجّل التكوينات مراحل كبرى من تاريخ الأرض وعملياتٍ جيومورفولوجية جارية في بيئةٍ قاحلة.",
      ),
    },
  ],
  panels: [
    {
      title: L("What is protected", "Ce qui est protégé", "ما هو محمي"),
      body: L(
        "The rock art shelters, the sandstone landforms, the relict cypress stands, the wetlands and gueltas, and the cultural landscape of the Kel Ajjer who live with them.",
        "Les abris ornés, les formations de grès, les peuplements reliques de cyprès, les zones humides et les gueltas, et le paysage culturel des Kel Ajjer qui y vivent.",
        "الملاجئ المزيّنة بالرسوم، والتكوينات الرملية، ومجموعات السرو المتبقّية، والأراضي الرطبة والقلتات، والمشهد الثقافي لكل أجّر الذين يعيشون معها.",
      ),
    },
    {
      title: L("The pressures", "Les pressions", "الضغوط"),
      body: L(
        "Pigment fades under sun and wind-blown sand. Touching, wetting and graffiti cause direct loss, and vehicle tracks damage fragile ground. Access is regulated and accompanied, and photography without flash is the standard rule.",
        "Le pigment s'efface sous le soleil et le sable porté par le vent. Le toucher, le mouillage et les graffitis provoquent des pertes directes, et les traces de véhicules abîment des sols fragiles. L'accès est réglementé et accompagné, et la photographie sans flash est la règle.",
        "تبهت الأصباغ تحت الشمس والرمل الذي تحمله الريح. ويسبّب اللمس والتبليل والكتابة على الجدران خسائر مباشرة، وتُتلف آثار المركبات أرضاً هشّة. الوصول منظّم ومصحوب بمرافقة، والتصوير بلا وميضٍ هو القاعدة.",
      ),
    },
  ],
};

const WHY = {
  eyebrow: L("Why it matters", "Pourquoi c'est important", "لماذا يهمّ هذا"),
  title: L("The longest story Algeria tells", "Le plus long récit que raconte l'Algérie", "أطول قصّةٍ ترويها الجزائر"),
  paragraphs: [
    L(
      "Every other exhibit in this museum covers centuries. Tassili covers millennia. It pushes the human history of Algeria back past kingdoms, past writing, past agriculture in this region, to people who painted what they saw because they wanted it kept.",
      "Toutes les autres expositions de ce musée couvrent des siècles. Le Tassili couvre des millénaires. Il repousse l'histoire humaine de l'Algérie au-delà des royaumes, au-delà de l'écriture, au-delà de l'agriculture dans cette région, jusqu'à des gens qui peignaient ce qu'ils voyaient parce qu'ils voulaient le garder.",
      "تغطّي كلّ المعارض الأخرى في هذا المتحف قروناً. أمّا طاسيلي فيغطّي آلاف السنين. يدفع التاريخ الإنساني للجزائر إلى ما قبل الممالك وما قبل الكتابة وما قبل الزراعة في هذه المنطقة، إلى أناسٍ رسموا ما رأوه لأنّهم أرادوا حفظه.",
    ),
    L(
      "It also matters now. A record of a fertile land becoming a desert, written by the people it happened to, is not only an ancient document. It is the closest thing we have to a first-hand account of climate change, and it is Algerian.",
      "Il importe aussi aujourd'hui. Le récit d'une terre fertile devenue désert, écrit par ceux à qui cela est arrivé, n'est pas seulement un document ancien. C'est ce qui se rapproche le plus d'un témoignage direct sur le changement climatique, et il est algérien.",
      "وهو مهمٌّ الآن أيضاً. فسجلّ أرضٍ خصبة تتحوّل صحراء، كتبه من وقع عليهم ذلك، ليس وثيقة قديمة فحسب. إنّه أقرب ما نملك إلى شهادةٍ مباشرة عن تغيّر المناخ، وهو جزائري.",
    ),
  ],
};

const FACTS = [
  L(
    "Tassili n'Ajjer is one of the largest protected areas in the world, roughly the size of Ireland and Belgium combined.",
    "Le Tassili n'Ajjer est l'une des plus vastes aires protégées du monde, à peu près la superficie de l'Irlande et de la Belgique réunies.",
    "طاسيلي ناجّر من أكبر المناطق المحميّة في العالم، بمساحةٍ تعادل تقريباً أيرلندا وبلجيكا معاً.",
  ),
  L(
    "The Saharan cypress that grows here exists nowhere else on earth, and only a few hundred mature trees remain.",
    "Le cyprès saharien qui pousse ici n'existe nulle part ailleurs, et il n'en reste que quelques centaines d'arbres adultes.",
    "السرو الصحراوي الذي ينمو هنا لا وجود له في مكانٍ آخر على الأرض، ولم يبق منه سوى بضع مئاتٍ من الأشجار الناضجة.",
  ),
  L(
    "Some shelters carry paintings from several different periods on the same wall, thousands of years apart.",
    "Certains abris portent sur une même paroi des peintures de plusieurs périodes, séparées par des milliers d'années.",
    "تحمل بعض الملاجئ على الجدار نفسه رسوماً من مراحل مختلفة، تفصل بينها آلاف السنين.",
  ),
  L(
    "Chariots drawn in a flying gallop appear here, a convention also known from the Mediterranean world.",
    "Des chars dessinés au galop volant y figurent, convention connue aussi du monde méditerranéen.",
    "تظهر هنا عربات مرسومة بأسلوب العدو الطائر، وهو تقليدٌ معروف أيضاً في العالم المتوسطي.",
  ),
  L(
    "Tifinagh inscriptions on the rock connect the plateau to an Amazigh script that is still written today.",
    "Des inscriptions tifinagh sur la roche relient le plateau à une écriture amazighe encore en usage aujourd'hui.",
    "تربط نقوش تيفيناغ على الصخر الهضبةَ بكتابةٍ أمازيغية ما زالت تُكتب اليوم.",
  ),
  L(
    "The oldest images here predate the pyramids of Giza by roughly seven thousand years.",
    "Les images les plus anciennes précèdent les pyramides de Gizeh d'environ sept mille ans.",
    "تسبق أقدم الصور هنا أهرامات الجيزة بنحو سبعة آلاف سنة.",
  ),
];

const COLLECTION: CollectionPlate[] = [
  {
    src: tassiliHero,
    alt: HERO.imageAlt,
    caption: L("Tassili n'Ajjer · the rock forest", "Tassili n'Ajjer · la forêt de pierre", "طاسيلي ناجّر · غابة الحجر"),
    note: L(
      "Interpretive illustration produced for DZ Odyssey. Not a documentary photograph of a specific shelter.",
      "Illustration interprétative produite pour DZ Odyssey. Il ne s'agit pas d'une photographie documentaire d'un abri précis.",
      "رسمٌ تفسيري أُنتج لدي زد أوديسي. وليس صورة توثيقية لملجأٍ بعينه.",
    ),
  },
  {
    src: earlyNorthAfrica,
    alt: L(
      "Prehistoric North African landscape with early human figures and wild animals near water.",
      "Paysage nord-africain préhistorique avec figures humaines anciennes et animaux sauvages près de l'eau.",
      "مشهدٌ لشمال إفريقيا ما قبل التاريخ فيه أشكال بشرية أولى وحيوانات برّية قرب الماء.",
    ),
    caption: L("Early North Africa · the green Sahara", "Afrique du Nord ancienne · le Sahara vert", "شمال إفريقيا القديم · الصحراء الخضراء"),
    note: L(
      "Interpretive illustration produced for DZ Odyssey, showing the wetter environment the earliest images record.",
      "Illustration interprétative produite pour DZ Odyssey, montrant le milieu plus humide dont témoignent les images les plus anciennes.",
      "رسمٌ تفسيري أُنتج لدي زد أوديسي، يُظهر البيئة الأكثر رطوبة التي تشهد عليها أقدم الصور.",
    ),
  },
];

const RELATED: RelatedExhibit[] = [
  {
    to: "/era/$eraId",
    params: { eraId: "earlynorthafrica" },
    label: L("Early North Africa", "L'Afrique du Nord ancienne", "شمال إفريقيا القديم"),
    body: L(
      "The wider prehistoric gallery that gives the plateau its context.",
      "La galerie préhistorique plus large qui donne son contexte au plateau.",
      "القاعة ما قبل التاريخية الأوسع التي تمنح الهضبة سياقها.",
    ),
  },
  {
    to: "/region/$regionId",
    params: { regionId: "sahara" },
    label: L("The Sahara", "Le Sahara", "الصحراء الكبرى"),
    body: L(
      "The desert as a civilization, not a void.",
      "Le désert comme civilisation, non comme vide.",
      "الصحراء بوصفها حضارة لا فراغاً.",
    ),
  },
  {
    to: "/mzab",
    label: L("The M'Zab Valley", "La vallée du M'Zab", "وادي مزاب"),
    body: L(
      "How people later learned to build cities in the dried land.",
      "Comment on a plus tard appris à bâtir des cités sur la terre asséchée.",
      "كيف تعلّم الناس لاحقاً بناء المدن في الأرض التي جفّت.",
    ),
  },
  {
    to: "/culture/$topicId",
    params: { topicId: "languages" },
    label: L("Tamazight and Tifinagh", "Tamazight et tifinagh", "الأمازيغية وتيفيناغ"),
    body: L(
      "The script carved on these rocks is still written in Algeria.",
      "L'écriture gravée sur ces roches s'emploie encore en Algérie.",
      "الكتابة المحفورة على هذه الصخور ما زالت تُكتب في الجزائر.",
    ),
  },
  {
    to: "/stargazing",
    label: L("Saharan skies", "Ciels sahariens", "سماوات الصحراء"),
    body: L(
      "The same darkness that the painters slept under.",
      "La même obscurité sous laquelle dormaient les peintres.",
      "العتمة نفسها التي نام تحتها الرسّامون.",
    ),
  },
  {
    to: "/timeline",
    label: L("Algeria across time", "L'Algérie à travers le temps", "الجزائر عبر الزمن"),
    body: L(
      "Place Tassili at the very start of the country's timeline.",
      "Situer le Tassili tout au début de la frise du pays.",
      "ضع طاسيلي في بداية التسلسل الزمني للبلاد.",
    ),
  },
];

/* ------------------------------------------------------------------ */
/*  page                                                               */
/* ------------------------------------------------------------------ */

function TassiliExhibit() {
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
          image={tassiliHero}
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

        <Section id="stone" tone="parchment">
          <SplitFigure
            eyebrow={STONE.eyebrow}
            title={STONE.title}
            body={STONE.body}
            bullets={STONE.bullets}
            figure={
              <Figure
                src={tassiliHero}
                alt={HERO.imageAlt}
                caption={L(
                  "Sandstone pillars and arches of the plateau",
                  "Piliers et arches de grès du plateau",
                  "أعمدة وأقواس الحجر الرملي في الهضبة",
                )}
                mediaKind="interpretive-illustration"
                width={1600}
                height={1008}
              />
            }
          />
        </Section>

        <Section id="periods" tone="sand">
          <EyebrowTitle
            eyebrow={L("The painted sequence", "La séquence peinte", "التسلسل المرسوم")}
            title={L("Five ages on one wall", "Cinq âges sur une même paroi", "خمسة عصورٍ على جدارٍ واحد")}
          />
          <p className="max-w-3xl text-foreground/80 text-base sm:text-lg leading-[1.75] mb-10">
            {tr(
              L(
                "Scholars group the art of Tassili into broad stylistic phases. The boundaries between them are debated and the dates are approximate, but the order is not seriously in question, because each phase brings animals that need less water than the last.",
                "Les spécialistes regroupent l'art du Tassili en grandes phases stylistiques. Leurs limites sont discutées et les dates approximatives, mais l'ordre ne fait pas sérieusement débat, car chaque phase amène des animaux qui ont besoin de moins d'eau que la précédente.",
                "يصنّف الباحثون فنّ طاسيلي في مراحل أسلوبية عامّة. حدودها موضع نقاش وتواريخها تقريبية، لكنّ ترتيبها ليس محلّ خلافٍ جدّي، لأنّ كلّ مرحلة تأتي بحيواناتٍ تحتاج ماءً أقلّ من سابقتها.",
              ),
              lang,
            )}
          </p>
          <NumberedGrid
            items={PERIODS}
            columns={3}
            factLabel={L("Did you know", "Le saviez-vous", "هل تعلم")}
          />
        </Section>

        <Section id="climate" tone="ivory">
          <EyebrowTitle eyebrow={CLIMATE.eyebrow} title={CLIMATE.title} />
          <div className="grid gap-8 md:grid-cols-[1.35fr_1fr] items-start">
            <Prose>
              {CLIMATE.body.map((p, i) => (
                <p key={i}>{tr(p, lang)}</p>
              ))}
            </Prose>
            <Plaque>
              <div className="text-[10px] uppercase tracking-[0.28em] text-primary mb-2">
                {tr(CLIMATE.plaqueLabel, lang)}
              </div>
              <p className="text-sm sm:text-base leading-[1.7] text-foreground/80">
                {tr(CLIMATE.plaqueBody, lang)}
              </p>
            </Plaque>
          </div>
        </Section>

        <Section id="expeditions" tone="parchment">
          <EyebrowTitle eyebrow={LHOTE.eyebrow} title={LHOTE.title} />
          <Prose>
            {LHOTE.paragraphs.map((p, i) => (
              <p key={i}>{tr(p, lang)}</p>
            ))}
          </Prose>
          <PullQuote quote={LHOTE.quote} attribution={LHOTE.attribution} />
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
            title={L("Six things about the plateau", "Six choses à savoir sur le plateau", "ستّة أمور عن الهضبة")}
          />
          <DiscoveryCards items={FACTS} label={L("Fact", "Fait", "معلومة")} />
        </Section>

        <Section id="collection" tone="parchment">
          <EyebrowTitle
            eyebrow={L("Museum collection", "Collection muséale", "المجموعة المتحفية")}
            title={L("Plates", "Planches", "لوحات")}
          />
          <p className="max-w-3xl text-foreground/75 text-sm sm:text-base leading-[1.75] mb-8">
            {tr(
              L(
                "The rock art of Tassili is protected, and DZ Odyssey holds no rights-cleared photographs of the shelters. The plates below are interpretive illustrations of the landscape and the environment, clearly labelled as such. Full provenance is listed at the end of the exhibit.",
                "L'art rupestre du Tassili est protégé, et DZ Odyssey ne dispose d'aucune photographie des abris libre de droits. Les planches ci-dessous sont des illustrations interprétatives du paysage et du milieu, signalées comme telles. La provenance complète figure en fin d'exposition.",
                "الفنّ الصخري في طاسيلي محميّ، ولا تملك دي زد أوديسي صوراً للملاجئ مرخّصة الحقوق. واللوحات أدناه رسومٌ تفسيرية للمشهد والبيئة، مُعلّمة بوضوح على هذا الأساس. ويُذكر التوثيق الكامل في آخر المعرض.",
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
          <ExhibitProvenance exhibitId="tassili" />
        </section>

        <footer className="border-t border-border/60 bg-card/40">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 py-8 flex flex-wrap items-center justify-between gap-4">
            <p className="text-xs text-muted-foreground italic">
              {tr(
                L(
                  "Tassili n'Ajjer · a permanent exhibit of DZ Odyssey.",
                  "Tassili n'Ajjer · exposition permanente de DZ Odyssey.",
                  "طاسيلي ناجّر · معرضٌ دائم في دي زد أوديسي.",
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

export default TassiliExhibit;

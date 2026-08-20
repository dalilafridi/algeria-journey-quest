/**
 * The M'Zab Valley — Masterpiece Exhibit #1
 *
 * Reference implementation of the MasterpieceExhibit component library
 * (`@/components/exhibit`). Every layout primitive on this page is a shared
 * component; only the trilingual content and the curated section order are
 * owned by this file. Any future Algerian exhibit that composes from the
 * same library will inherit the museum quality of this page.
 *
 * Curated walk:
 *   Hero → Where → Origins → Five Ksour → Water → Architecture →
 *   UNESCO → Daily Life → Engineering → Influence → Did You Know →
 *   Collection → Related → Provenance.
 */

import { createFileRoute, Link } from "@tanstack/react-router";
import { Header } from "@/components/Header";
import { useLang, type Lang, type LocalizedString } from "@/lib/i18n";
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
  SERIF,
  type NumberedItem,
  type CollectionPlate,
  type RelatedExhibit,
} from "@/components/exhibit";
import { t as tr } from "@/lib/i18n";
import mzabHero from "@/assets/mzab-hero.jpg";
import mzabHouse from "@/assets/mzab-house-diagram.jpg";
import mzabKsarPlan from "@/assets/mzab-ksar-plan.jpg";
import mzabWater from "@/assets/mzab-water.jpg";
import mzabMarket from "@/assets/mzab-market.jpg";

export const Route = createFileRoute("/mzab")({
  head: ({ match }) =>
    pageMeta({
      lang: headLang(match),
      path: "/mzab",
      ...PAGE_META["/mzab"],
      image: mzabHero,
      type: "article",
    }),
  component: MzabExhibit,
});

/* ------------------------------------------------------------------ */
/*  content helpers                                                    */
/* ------------------------------------------------------------------ */

type Tri = { en: string; fr: string; ar: string };
const L = (en: string, fr: string, ar: string): Tri => ({ en, fr, ar });

/* ------------------------------------------------------------------ */
/*  content                                                            */
/* ------------------------------------------------------------------ */

const HERO = {
  eyebrow: L("Masterpiece Exhibit · Sahara", "Exposition maîtresse · Sahara", "معرض استثنائي · الصحراء"),
  title: L("The M'Zab Valley", "La Vallée du M'Zab", "وادي مزاب"),
  subtitle: L("Cities against the sun.", "Des cités face au soleil.", "مدن في وجه الشمس."),
  lede: L(
    "A thousand years ago, a refugee community walked six hundred kilometres into the Algerian Sahara and did the impossible: they built five living cities of stone, palm and light on a plateau that receives less than eighty millimetres of rain a year and every one of them is still inhabited today.",
    "Il y a mille ans, une communauté réfugiée a marché six cents kilomètres dans le Sahara algérien et a fait l'impossible : bâtir cinq cités vivantes de pierre, de palme et de lumière sur un plateau qui reçoit moins de quatre-vingts millimètres de pluie par an et chacune est encore habitée aujourd'hui.",
    "قبل ألف عام، سار مجتمع من اللاجئين ستّمئة كيلومتر داخل الصحراء الجزائرية وحقّق المستحيل: بنى خمس مدنٍ حيّة من الحجر والنخيل والنور على هضبة لا يتجاوز مطرها ثمانين ميليمتراً في السنة، وكلّها لا تزال مأهولة إلى اليوم.",
  ),
  cta: L("Enter the exhibit", "Entrer dans l'exposition", "ادخل المعرض"),
  back: L("← Return to museum", "← Retour au musée", "← عودة إلى المتحف"),
  caption: L(
    "Ghardaïa at golden hour · the pentapolis seen from the western plateau",
    "Ghardaïa à l'heure dorée · la pentapole vue du plateau ouest",
    "غرداية عند الغروب · المدن الخمس من الهضبة الغربية",
  ),
  imageAlt: L(
    "Panoramic view of the M'Zab Valley at sunset, ochre houses of Ghardaïa cascading down a rocky hillside, minaret at the summit, palm groves below.",
    "Vue panoramique de la vallée du M'Zab au coucher du soleil, les maisons ocre de Ghardaïa cascadant sur la colline rocheuse, minaret au sommet, palmeraie en contrebas.",
    "منظر بانورامي لوادي مزاب عند الغروب، بيوت غرداية بلون المغرة تنحدر على تلّةٍ صخرية، والمئذنة في القمة، وبستان النخيل في الأسفل.",
  ),
};

const WHERE = {
  eyebrow: L("Where", "Où", "أين"),
  title: L("A valley 600 km south of Algiers", "Une vallée à 600 km au sud d'Alger", "وادٍ يبعد 600 كم جنوب الجزائر"),
  body: L(
    "The M'Zab is a shallow, rock-walled valley (wadi) carved into the Chebka plateau of the northern Sahara, in the wilaya of Ghardaïa. It is not on the way to anywhere, that is the point. In the 11th century its remoteness was the safety a persecuted community was looking for. Today it is the reason five ksour survive almost intact where most other pre-modern Saharan towns have vanished.",
    "Le M'Zab est une vallée peu profonde, aux parois rocheuses, creusée dans le plateau de la Chebka au nord du Sahara, dans la wilaya de Ghardaïa. Elle n'est sur la route de rien, c'est là son secret. Au XIe siècle, cet isolement offrait la sécurité recherchée par une communauté persécutée. Aujourd'hui, c'est ce qui explique que cinq ksour subsistent presque intacts, alors que la plupart des villes sahariennes anciennes ont disparu.",
    "وادي مزاب وادٍ ضحل تحفّه جدران صخرية، محفور في هضبة الشبكة شمال الصحراء الكبرى، ضمن ولاية غرداية. لا يقع على طريق نحو مكان، وهذا سرّه. في القرن الحادي عشر مثّلت هذه العزلة الأمان الذي كان يبحث عنه مجتمع مُلاحق. واليوم بفضلها تبقى خمس قصور شبه سليمة، بينما اختفت معظم مدن الصحراء ما قبل الحديثة.",
  ),
  stats: [
    { label: L("Latitude", "Latitude", "خط العرض"), value: L("32°29′ N", "32°29′ N", "32°29′ شمالاً") },
    { label: L("Elevation", "Altitude", "الارتفاع"), value: L("480 m", "480 m", "480 م") },
    { label: L("Annual rainfall", "Pluviométrie", "الأمطار السنوية"), value: L("~ 70 mm", "~ 70 mm", "~ 70 ملم") },
    { label: L("Summer high", "Maximales d'été", "الذروة الصيفية"), value: L("45 °C", "45 °C", "45 °م") },
    { label: L("Winter low", "Minimales d'hiver", "الأدنى الشتوي"), value: L("−2 °C", "−2 °C", "−2 °م") },
    { label: L("Palms in the groves", "Palmiers", "أعداد النخيل"), value: L("~ 200,000", "~ 200 000", "~ 200,000") },
  ],
  cardLabel: L("Museum data card · M'Zab Valley", "Fiche muséale · Vallée du M'Zab", "بطاقة متحفية · وادي مزاب"),
  cardFooter: L(
    "Ghardaïa lies on the same latitude as Marrakech and El Paso, but it receives less than a third of their rainfall.",
    "Ghardaïa se situe à la latitude de Marrakech et d'El Paso, mais reçoit moins du tiers de leurs précipitations.",
    "تقع غرداية على خط عرض مرّاكش وإلباسو، لكنّها تتلقّى أقلّ من ثلث أمطارهما.",
  ),
  timeline: L(
    "First ksar founded: El Atteuf, 1012 CE · Bou Noura 1046 · Ghardaïa 1053 (largest, capital of the pentapolis) · Beni Isguen 1347 · Melika 1350. Two later foundations, Berriane and El Guerrara, extended the historical M'Zab into a heptapolis in the 17th and 18th centuries.",
    "Premier ksar fondé : El Atteuf, 1012 · Bou Noura 1046 · Ghardaïa 1053 (le plus grand, capitale de la pentapole) · Beni Isguen 1347 · Melika 1350. Deux fondations plus tardives, Berriane et El Guerrara, étendirent le M'Zab historique en heptapole aux XVIIe et XVIIIe siècles.",
    "أوّل قصر أُسّس: العطف 1012م · بونورة 1046 · غرداية 1053 (الأكبر وعاصمة الخمس) · بني يزقن 1347 · مليكة 1350. ثمّ امتدّ وادي مزاب التاريخي إلى سبع مدن بتأسيس بريان والقرارة في القرنين السابع عشر والثامن عشر.",
  ),
};

const BIRTH = {
  eyebrow: L("Origins", "Origines", "الأصول"),
  title: L("A civilization born from exile", "Une civilisation née de l'exil", "حضارة وُلدت من المنفى"),
  paragraphs: [
    L(
      "The story begins not in the desert but in Tahert (present-day Tiaret), 300 km inland from Algiers, where the Rustamid dynasty had ruled a peaceful, scholarly Ibadi imamate from 776 to 909 CE. When the Fatimid armies crushed Tahert, its Ibadi survivors, a Kharijite branch of Islam known for austere piety, strict equality and communal self-government, began a long southward retreat.",
      "L'histoire commence non dans le désert mais à Tahert (actuelle Tiaret), à 300 km d'Alger, où la dynastie rustumide dirigea un imamat ibadite paisible et savant de 776 à 909. Quand les armées fatimides écrasèrent Tahert, ses survivants ibadites, branche kharijite de l'islam réputée pour sa piété austère, son égalitarisme strict et son autogouvernement communautaire, entamèrent une longue retraite vers le sud.",
      "تبدأ الحكاية لا في الصحراء بل في تاهرت (تيارت الحالية) على بُعد 300 كم من الجزائر العاصمة، حيث حكمت الدولة الرستمية إمامةً إباضية علمية مسالمة بين 776 و909م. حين سحق الفاطميون تاهرت، بدأ الناجون الإباضيون، وهم فرع خارجي من الإسلام معروف بتقواه الصارمة، ومساواته المطلقة وحكمه المجتمعي الذاتي، انسحاباً طويلاً نحو الجنوب.",
    ),
    L(
      "They first sheltered at Sedrata, near Ouargla, until Sedrata too was destroyed in the 11th century. Only then did they choose the M'Zab: a valley so unforgiving that no rival power would follow. On 1 Muharram 402 AH (August 1012 CE), the first prayer was said at El Atteuf. The civilization the world now calls Mozabite had begun.",
      "Ils trouvèrent d'abord refuge à Sedrata, près de Ouargla, jusqu'à sa destruction au XIe siècle. C'est alors seulement qu'ils choisirent le M'Zab : une vallée si hostile qu'aucune puissance rivale ne s'y aventurerait. Le 1er Muharram 402 H (août 1012), la première prière fut prononcée à El Atteuf. La civilisation que le monde appelle aujourd'hui mozabite venait de naître.",
      "لجأوا أولاً إلى سدراتة قرب ورقلة، إلى أن دُمّرت هي الأخرى في القرن الحادي عشر. عندها فقط اختاروا وادي مزاب: وادٍ قاسٍ لا تجرؤ على متابعتهم فيه قوّة منافسة. في غرّة محرّم 402هـ (أغسطس 1012م)، رُفعت أولى الصلوات في العطف. وُلدت الحضارة التي يسميها العالم اليوم المزابية.",
    ),
    L(
      "Two forces then converted survival into prosperity. The first was the Trans-Saharan trade: Mozabite caravans linked the Mediterranean to Sub-Saharan Africa, dealing in dates, wool, silver and salt. The second was doctrine: Ibadism demands literacy, thrift, mutual aid and a strict separation between the ummah's spiritual assembly (halqa of the azzaba) and its civic affairs, a discipline that made whole towns behave like disciplined workshops.",
      "Deux forces transformèrent alors la survie en prospérité. D'abord le commerce transsaharien : les caravanes mozabites reliaient la Méditerranée à l'Afrique subsaharienne, échangeant dattes, laine, argent et sel. Ensuite la doctrine : l'ibadisme exige lettres, épargne, entraide et une stricte séparation entre l'assemblée spirituelle (halqa des azzaba) et les affaires civiles, une discipline qui a fait fonctionner des villes entières comme des ateliers organisés.",
      "ثم حوّلت قوّتان البقاء إلى ازدهار. الأولى: التجارة عبر الصحراء؛ إذ ربطت قوافل بني مزاب المتوسط بأفريقيا جنوب الصحراء، تتاجر في التمر والصوف والفضة والملح. والثانية: العقيدة؛ إذ يفرض المذهب الإباضي القراءة والاقتصاد والتكافل، ويفصل صرامةً بين المجلس الديني (حلقة العزّابة) والشأن المدني، انضباط جعل مدناً بأكملها تعمل كورش منظّمة.",
    ),
  ],
};

const KSOUR: NumberedItem[] = [
  {
    arabic: "العطف",
    title: L("El Atteuf", "El Atteuf", "العطف"),
    meta: L("1012 CE", "1012", "1012م"),
    role: L("The elder, where the first prayer was said.", "L'aîné, où fut prononcée la première prière.", "الأقدم، حيث رُفعت أولى الصلوات."),
    body: L(
      "The founding city of the pentapolis. Its Sidi Brahim mosque (13th c.) is a pure white sculpture of hand-shaped lime, a form so honest that Le Corbusier photographed it and wrote of it as a lesson.",
      "La ville fondatrice de la pentapole. Sa mosquée Sidi Brahim (XIIIe s.) est une pure sculpture de chaux façonnée à la main, une forme si sincère que Le Corbusier la photographia et l'évoqua comme une leçon.",
      "المدينة المؤسِّسة للمدن الخمس. مسجد سيدي إبراهيم (القرن 13) نحتٌ أبيض خالص من الجير المُشكَّل باليد، شكل بلغ من الصدق أن صوّره لو كوربوزييه ووصفه بالدرس.",
    ),
    fact: L("Its cemetery is older than most European cathedrals.", "Son cimetière est plus ancien que la plupart des cathédrales d'Europe.", "مقبرتها أقدم من معظم كاتدرائيات أوروبا."),
  },
  {
    arabic: "بنورة",
    title: L("Bou Noura", "Bou Noura", "بنورة"),
    meta: L("1046 CE", "1046", "1046م"),
    role: L("The luminous one, perched on a rock outcrop.", "La lumineuse, perchée sur un promontoire rocheux.", "المضيئة، على نتوء صخري."),
    body: L(
      "Built on a natural rock spur, Bou Noura's minaret still functions as an astronomical marker for prayer times, calibrated to the horizon rather than a clock.",
      "Édifiée sur un éperon rocheux, Bou Noura conserve un minaret qui sert encore de repère astronomique pour les heures de prière, calé sur l'horizon plutôt que sur l'horloge.",
      "بُنيت على نتوء صخري طبيعي، ولا تزال مئذنتها تُستعمل مِعلَماً فلكياً لمواقيت الصلاة، تُضبَط بالأفق لا بالساعة.",
    ),
    fact: L("Its name is thought to preserve a pre-Islamic Berber sun-cult toponym.", "Son nom pourrait conserver un toponyme berbère pré-islamique lié au culte solaire.", "يُرجَّح أن يحفظ اسمها توطئة أمازيغية ما قبل إسلامية مرتبطة بعبادة الشمس."),
  },
  {
    arabic: "مليكة",
    title: L("Melika", "Melika", "مليكة"),
    meta: L("1350 CE", "1350", "1350م"),
    role: L("The queen, highest of the five, watching the valley.", "La reine, la plus élevée des cinq, dominant la vallée.", "الملكة، أعلى الخمس، تراقب الوادي."),
    body: L(
      "Melika occupies the loftiest ridge and holds the necropolis of Sidi Aïssa, whose white cubic tombs form one of the most photographed landscapes of the Algerian Sahara.",
      "Melika occupe la crête la plus haute et abrite la nécropole de Sidi Aïssa, dont les tombes cubiques blanches composent l'un des paysages les plus photographiés du Sahara algérien.",
      "تحتل مليكة أعلى الحواف، وتضم مقبرة سيدي عيسى ذات القبور المكعّبة البيضاء، وهي من أكثر مشاهد الصحراء الجزائرية تصويراً.",
    ),
    fact: L("The tombs point west, aligned with sunset rather than Mecca, an Ibadi peculiarity.", "Les tombes sont orientées à l'ouest, alignées sur le coucher du soleil plutôt que sur La Mecque, une particularité ibadite.", "تتّجه القبور غرباً، محاذيةً للغروب لا للكعبة، خصوصية إباضية."),
  },
  {
    arabic: "بني يزقن",
    title: L("Beni Isguen", "Beni Isguen", "بني يزقن"),
    meta: L("1347 CE", "1347", "1347م"),
    role: L("The sacred, the guardian of Ibadi observance.", "La sacrée, gardienne de l'orthodoxie ibadite.", "المقدّسة، حارسة الإرث الإباضي."),
    body: L(
      "Beni Isguen is the strictest of the five: gates still close at sunset, photographs are limited, and every dusk its extraordinary open-air auction (the halqa) is called out one item at a time, a market ritual unchanged since the Middle Ages.",
      "Beni Isguen est la plus stricte des cinq : ses portes se ferment encore au coucher du soleil, la photographie y est limitée, et chaque soir sa halqa, une extraordinaire vente aux enchères à ciel ouvert, se tient objet par objet, rituel inchangé depuis le Moyen Âge.",
      "بني يزقن أشدّ الخمس تمسّكاً: تُغلَق أبوابها عند المغرب، ويُقيَّد التصوير، وتُقام مساءً حلقةُ بيعٍ علنية في الهواء الطلق قطعةً قطعة، طقس سوقي لم يتغيّر منذ العصور الوسطى.",
    ),
    fact: L("Beni Isguen holds one of the oldest continuously used communal libraries in the Muslim world.", "Beni Isguen conserve l'une des plus anciennes bibliothèques communautaires du monde musulman.", "تضمّ بني يزقن واحدة من أقدم المكتبات المجتمعية المستمرّة في العالم الإسلامي."),
  },
  {
    arabic: "غرداية",
    title: L("Ghardaïa", "Ghardaïa", "غرداية"),
    meta: L("1053 CE", "1053", "1053م"),
    role: L("The capital, largest, most cosmopolitan of the five.", "La capitale, la plus grande, la plus cosmopolite des cinq.", "العاصمة، الأكبر والأكثر انفتاحاً."),
    body: L(
      "Ghardaïa's great minaret rises 23 metres above the concentric spiral of the city. Its bright textile souq, the busiest in the Algerian south, still opens and closes to a horn call heard from the summit.",
      "Le grand minaret de Ghardaïa s'élève à 23 mètres au-dessus de la spirale concentrique de la ville. Son éclatant souk des tissus, le plus animé du sud algérien, ouvre et ferme encore au son d'une corne entendue depuis le sommet.",
      "ترتفع مئذنة غرداية الكبرى 23 متراً فوق حلزون المدينة المتراكز. ويفتح سوق النسيج الشهير، الأكثر حركةً في الجنوب الجزائري، ويُغلق حتى اليوم على وقع صوت بوقٍ يُسمع من القمّة.",
    ),
    fact: L("It is one of the very few pre-modern Islamic cities where the mosque was designed before the streets.", "L'une des très rares villes islamiques pré-modernes où la mosquée fut dessinée avant les rues.", "من قلّةٍ نادرة من المدن الإسلامية ما قبل الحديثة صُمِّم فيها المسجد قبل الشوارع."),
  },
];

const HEPTAPOLIS_INTRO = {
  eyebrow: L("The wider M'Zab", "Le M'Zab élargi", "وادي مزاب الموسّع"),
  title: L(
    "From pentapolis to heptapolis",
    "De la pentapole à l'heptapole",
    "من خمسِ مدنٍ إلى سبع",
  ),
  lead: L(
    "The five ksour of the valley are the M'Zab that UNESCO inscribed in 1982. But the historical M'Zab did not stop there. Two later Mozabite foundations, set apart from the wadi itself, extended the community into what Algerian geographers call the heptapolis, the seven cities of the M'Zab.",
    "Les cinq ksour de la vallée forment le M'Zab que l'UNESCO a inscrit en 1982. Mais le M'Zab historique ne s'arrête pas là. Deux fondations mozabites plus tardives, situées hors du wadi lui-même, ont étendu la communauté à ce que les géographes algériens appellent l'heptapole, les sept cités du M'Zab.",
    "المدن الخمس في الوادي هي التي أدرجتها اليونسكو عام 1982. غير أنّ وادي مزاب التاريخي لم يقف عندها؛ فقد امتدّ المجتمع المزابي بتأسيسَين لاحقَين خارج الوادي نفسه، إلى ما يُسمّيه الجغرافيون الجزائريون \"السبع مدن\" لوادي مزاب.",
  ),
  plaqueLabel: L("Editorial note", "Note éditoriale", "ملاحظة تحريرية"),
  plaqueBody: L(
    "The UNESCO World Heritage property is precisely the five original ksour, El Atteuf, Bou Noura, Melika, Beni Isguen and Ghardaïa, together with their palm groves and cemeteries. Berriane and El Guerrara are part of the broader historical and cultural M'Zab, but sit outside the inscribed property.",
    "Le bien du Patrimoine mondial est précisément constitué des cinq ksour d'origine, El Atteuf, Bou Noura, Melika, Beni Isguen et Ghardaïa, avec leurs palmeraies et leurs cimetières. Berriane et El Guerrara appartiennent au M'Zab historique et culturel élargi, mais se situent hors du bien inscrit.",
    "الموقع المُدرَج في التراث العالمي هو تحديداً القصور الخمسة الأصلية، العطف، بونورة، مليكة، بني يزقن، غرداية، مع بساتين نخيلها ومقابرها. أمّا بريان والقرارة فتنتميان إلى وادي مزاب التاريخي والثقافي الأوسع، لكنّهما خارج الموقع المُدرَج.",
  ),
};

const HEPTAPOLIS_OUTLIERS: NumberedItem[] = [
  {
    arabic: "بريان",
    title: L("Berriane", "Berriane", "بريان"),
    meta: L("Founded 1690 CE · ~45 km north of Ghardaïa", "Fondée en 1690 · ~45 km au nord de Ghardaïa", "أُسّست 1690م · نحو 45 كم شمال غرداية"),
    role: L(
      "The northern gate of the M'Zab.",
      "La porte nord du M'Zab.",
      "بوّابة وادي مزاب الشمالية.",
    ),
    body: L(
      "Berriane was founded on the northern approach to the valley as Mozabite families spread beyond the original ksour. It shares the same Ibadi institutions, the same white-and-ochre building tradition and the same palm-grove economy, but stands apart from the wadi itself, which is why UNESCO did not include it in the 1982 inscription, even though it is fully part of the M'Zab cultural region.",
      "Berriane fut fondée sur l'accès nord de la vallée, lorsque des familles mozabites essaimèrent hors des ksour d'origine. Elle partage les mêmes institutions ibadites, la même tradition bâtie blanche et ocre et la même économie de palmeraie, mais se tient à l'écart du wadi lui-même, raison pour laquelle l'UNESCO ne l'a pas incluse dans l'inscription de 1982, bien qu'elle appartienne pleinement à l'aire culturelle du M'Zab.",
      "أُسِّست بريان على المدخل الشمالي للوادي حين توسّعت العائلات المزابية خارج القصور الأصلية. تشترك معها في المؤسسات الإباضية ذاتها، وفي عمارة البيوت البيضاء والمُغرة، وفي اقتصاد الواحة، لكنّها بعيدة عن الوادي نفسه، ولذلك لم تُدرجها اليونسكو ضمن قائمة 1982، رغم انتمائها الكامل إلى الإقليم الثقافي المزابي.",
    ),
    fact: L(
      "Berriane hosts one of the largest Mozabite communities outside the valley and functions as the M'Zab's northern trading gateway.",
      "Berriane abrite l'une des plus importantes communautés mozabites hors vallée et fait office de porte commerciale nord du M'Zab.",
      "تضمّ بريان واحدة من أكبر الجاليات المزابية خارج الوادي، وتؤدّي دور البوّابة التجارية الشمالية للمزاب.",
    ),
  },
  {
    arabic: "القرارة",
    title: L("El Guerrara", "El Guerrara", "القرارة"),
    meta: L("Founded 1631 CE · ~110 km north-east of Ghardaïa", "Fondée en 1631 · ~110 km au nord-est de Ghardaïa", "أُسّست 1631م · نحو 110 كم شمال شرق غرداية"),
    role: L(
      "The eastern outpost, closest of the seven to the Sahara's caravan roads.",
      "L'avant-poste oriental, la plus proche des sept des routes caravanières sahariennes.",
      "المرابط الشرقي، أقرب السبع إلى دروب القوافل الصحراوية.",
    ),
    body: L(
      "El Guerrara was founded in the early 17th century on a distinct oasis site well east of the wadi, expanding Mozabite settlement toward the caravan tracks that linked Ouargla and the Ziban. Like Berriane, it belongs to the historical heptapolis but lies outside the UNESCO property, which is confined to the continuous cultural landscape of the five original ksour.",
      "El Guerrara fut fondée au début du XVIIe siècle sur une oasis distincte, nettement à l'est du wadi, étendant l'implantation mozabite vers les pistes caravanières reliant Ouargla et le Ziban. Comme Berriane, elle appartient à l'heptapole historique mais se trouve hors du bien UNESCO, limité au paysage culturel continu des cinq ksour d'origine.",
      "أُسِّست القرارة في مطلع القرن السابع عشر على واحة مستقلّة شرق الوادي، لتوسّع الحضور المزابي نحو دروب القوافل التي تربط ورقلة والزيبان. كبريان، تنتمي إلى السبع التاريخية لكنّها خارج موقع اليونسكو المقتصر على المشهد الثقافي المتّصل للقصور الخمسة الأصلية.",
    ),
    fact: L(
      "El Guerrara's palm grove is fed by a network of foggaras, underground galleries that tap the water table without exposing it to evaporation.",
      "La palmeraie d'El Guerrara est irriguée par des foggaras, galeries souterraines qui captent la nappe sans l'exposer à l'évaporation.",
      "تُروى واحة القرارة بشبكة فقّارات، قنواتٍ جوفية تلتقط الماء من الطبقة الحاملة دون تعريضه للتبخّر.",
    ),
  },
];


const ARCHITECTURE = {
  eyebrow: L("Architecture", "Architecture", "العمارة"),
  title: L("A city as a single organism", "Une cité comme un organisme unique", "مدينة كائنٌ واحد"),
  intro: L(
    "There is no formal architect in Ibadi tradition. There is only the community and its rules. The result is a form of urbanism that behaves less like a design and more like a living organism, where every element serves several functions at once, spiritual, climatic, social, defensive.",
    "Il n'y a pas d'architecte formel dans la tradition ibadite. Il n'y a que la communauté et ses règles. Il en résulte un urbanisme qui ressemble moins à un plan qu'à un organisme vivant, où chaque élément remplit plusieurs fonctions à la fois, spirituelle, climatique, sociale, défensive.",
    "لا يعرف التقليد الإباضي معمارياً رسمياً. هناك فقط الجماعة وقواعدها. فينشأ عمرانٌ أقرب إلى كائن حيّ منه إلى تصميم، إذ يؤدّي كلّ عنصر عدّة وظائف في آن: روحية ومناخية واجتماعية ودفاعية.",
  ),
  principles: [
    {
      title: L("The mosque at the summit", "La mosquée au sommet", "المسجد في القمّة"),
      body: L(
        "Every ksar is crowned by its mosque, never at the centre, always at the highest point. This is not aesthetic: the minaret doubles as a watchtower, a sundial, and, in flood season, a rally point audible across the wadi.",
        "Chaque ksar est couronné par sa mosquée, jamais au centre, toujours au point le plus haut. Ce n'est pas esthétique : le minaret fait aussi office de tour de guet, de cadran solaire et, en crue, de point de ralliement audible dans tout le wadi.",
        "يتوَّج كل قصر بمسجده، لا في الوسط بل في أعلى نقطة. ليس ذلك جمالياً: فالمئذنة برج مراقبة، ومزولة شمسية، وفي مواسم الفيضان نقطة نداءٍ تُسمَع في الوادي كلّه.",
      ),
    },
    {
      title: L("The concentric spiral", "La spirale concentrique", "الحلزون المتراكز"),
      body: L(
        "Streets do not follow a grid; they wind outward from the mosque like a snail shell. A stranger disorients quickly; a resident cannot get lost. The spiral also breaks the wind, forcing sand-laden gusts to lose energy at every turn.",
        "Les rues ne suivent pas de trame ; elles s'enroulent depuis la mosquée comme une coquille d'escargot. Un étranger s'y perd vite ; un habitant, jamais. La spirale brise aussi le vent, obligeant les rafales chargées de sable à s'épuiser à chaque virage.",
        "الشوارع ليست شبكيّة؛ بل تلتفّ حول المسجد كصدفة حلزون. يضيع الغريب سريعاً، ولا يضلّ الساكن أبداً. كما يكسر الحلزون الريح، فيُرغم عواصف الرمل على فقد طاقتها عند كل منعطف.",
      ),
    },
    {
      title: L("Houses folded around a courtyard", "Des maisons repliées sur une cour", "بيوت تنطوي حول فناء"),
      body: L(
        "The Mozabite house turns its back to the street. Blind whitewashed walls face outward; life happens in the west ed-dar, a central patio open to the sky, cooled at night and shaded by day. Doors are offset so that no visitor can see into the courtyard from the street, a spatial expression of the Ibadi ethic of hidden inner life.",
        "La maison mozabite tourne le dos à la rue. Vers l'extérieur, des murs aveugles chaulés ; à l'intérieur, la vie s'organise autour du west ed-dar, patio central ouvert au ciel, rafraîchi la nuit, ombré le jour. Les portes sont décalées pour qu'aucun visiteur ne puisse voir la cour depuis la rue, expression spatiale de l'éthique ibadite de la vie intérieure discrète.",
        "يُدير البيت المزابي ظهره للشارع. إلى الخارج جدرانٌ عمياء مطليّة بالجير، وإلى الداخل تنتظم الحياة حول الويسط الدار: فناء مركزيّ مفتوح على السماء، يبرد ليلاً ويُظلَّل نهاراً. والأبواب مُزاحة كي لا يرى الزائر الفناء من الشارع، تجسيدٌ فضائيٌّ للأخلاق الإباضية في ستر الحياة الداخلية.",
      ),
    },
    {
      title: L("Passive cooling before physics knew it had a name", "Un rafraîchissement passif avant que la physique le nomme", "تبريد سلبيّ قبل أن يعرف العلم اسمه"),
      body: L(
        "Walls are 40–60 cm thick, lime-washed white on the outside to bounce sunlight, and left rough inside to trap cool air. A lattice roof (chebek) shades the upper terrace while allowing hot air to rise and vent. Interior temperatures stay 10–15 °C below the outside, with no electricity, no fans, no glass.",
        "Les murs mesurent 40 à 60 cm d'épaisseur, chaulés en blanc à l'extérieur pour renvoyer la lumière, laissés bruts à l'intérieur pour piéger l'air frais. Un toit à claustra (chebek) ombre la terrasse tout en laissant l'air chaud s'évacuer. À l'intérieur, la température reste de 10 à 15 °C sous celle du dehors, sans électricité, sans ventilateur, sans vitre.",
        "تبلغ سماكة الجدران 40 إلى 60 سم، مطليّة بالجير الأبيض من الخارج لعكس الضوء، وخشنة الداخل لحبس الهواء البارد. ويظلّل سقفٌ مشبّك (شبك) السطحَ الأعلى بينما يسمح للهواء الساخن بالصعود والتصريف. تبقى الحرارة الداخلية أقلّ من الخارج بـ10 إلى 15 درجة، دون كهرباء ولا مروحة ولا زجاج.",
      ),
    },
  ] as NumberedItem[],
};

const WATER = {
  eyebrow: L("Water & the desert", "L'eau et le désert", "الماء والصحراء"),
  title: L(
    "The world's most elegant flood-control system",
    "Le plus élégant des systèmes de gestion des crues",
    "أرقى نظام في العالم لإدارة الفيضانات",
  ),
  body: L(
    "The wadi is dry for years, then floods catastrophically. In 1900 the Mozabite community, without engineers, designed a distribution system so equitable it has never had to be revised. When a flood arrives, a stone dam (tabya) slows the water; carved dividing stones (kesria) split the flow into precise fractions; and a network of channels (seguia) feeds the palm grove plot by plot, family by family. Not one drop reaches the desert unused. Modern hydrologists have measured its efficiency at over 90 %.",
    "Le wadi reste sec des années, puis déborde de façon catastrophique. Vers 1900, la communauté mozabite, sans ingénieurs, a conçu un système de partage si équitable qu'il n'a jamais eu à être révisé. Quand la crue arrive, un barrage de pierre (tabya) freine l'eau ; des pierres sculptées (kesria) la divisent en fractions précises ; un réseau de canaux (seguia) irrigue la palmeraie parcelle par parcelle, famille par famille. Pas une goutte n'atteint le désert inutilisée. Les hydrologues actuels mesurent une efficacité supérieure à 90 %.",
    "يظلّ الوادي جافّاً لسنوات ثم يفيض فيضاناً كارثيّاً. حوالي 1900، صمّم مجتمع بني مزاب، بلا مهندسين، نظام توزيع بلغ من الإنصاف أنه لم يحتَج قطّ إلى مراجعة. حين يقدم الفيضان، يبطئه سدٌّ حجريّ (تابْيا)؛ وتقسمه أحجارٌ منحوتة (كِسريا) إلى نسبٍ دقيقة؛ وتُغذّي شبكة قنوات (سواقي) البستان قطعةً قطعة وعائلةً عائلة. لا تصل قطرةٌ واحدة إلى الصحراء دون أن تُستعمل. وقاس الهيدرولوجيّون المعاصرون كفاءتَه بأكثر من 90 %.",
  ),
  bullets: [
    L(
      "The three-level palm grove: date palms on top; fruit trees (pomegranate, apricot) in the middle; vegetables (mint, chilli, tomatoes) at ground level, a stacked microclimate that halves evaporation.",
      "La palmeraie à trois étages : dattiers en haut ; arbres fruitiers (grenadier, abricotier) au milieu ; légumes (menthe, piment, tomate) au sol, un microclimat superposé qui divise l'évaporation par deux.",
      "بستان النخيل ثلاثيّ الطبقات: النخيل في الأعلى؛ فواكه (رمّان، مشمش) في الوسط؛ خضار (نعناع، فلفل، طماطم) عند الأرض، مناخٌ مصغَّر متطبِّق يخفض التبخّر إلى النصف.",
    ),
    L(
      "Communal wells (ain) with counterweight beams (chadouf) still work by hand, the ancestral gesture of the Nile Valley, preserved in the Sahara.",
      "Puits communautaires (ain) à balancier (chadouf) actionnés à la main, le geste ancestral de la vallée du Nil, conservé au Sahara.",
      "آبار مجتمعية (عين) ذات ذراع موازِنة (شادوف) تُشغَّل باليد، إشارةٌ متوارثة من وادي النيل، محفوظة في الصحراء.",
    ),
    L(
      "In 2008 a hundred-year flood destroyed hundreds of modern houses built outside the historical grid, but the old ksour, sitting exactly where the elders had placed them, took no structural damage.",
      "En 2008, une crue centennale détruisit des centaines de maisons modernes bâties hors du tracé historique, mais les vieux ksour, exactement là où les anciens les avaient placés, ne subirent aucun dommage structurel.",
      "في 2008 دمّر فيضانُ القرن مئات البيوت الحديثة المبنيّة خارج التخطيط التاريخي، أمّا القصور القديمة، حيث وضعها الأجداد بالضبط، فلم تتضرّر بنيوياً.",
    ),
  ],
  image: {
    alt: L(
      "Historic stone dam and carved flood-water dividers of the M'Zab, feeding channels into the palm grove.",
      "Barrage de pierre historique et pierres sculptées de partage des crues du M'Zab, alimentant les canaux vers la palmeraie.",
      "سدٌّ حجريّ تاريخي وأحجار منحوتة تقسّم مياه الفيضان في المزاب، تُغذّي القنوات نحو بستان النخيل.",
    ),
    caption: L(
      "The kesria distribution stones · palm grove of Ghardaïa",
      "Les pierres kesria · palmeraie de Ghardaïa",
      "أحجار الكِسريا · بستان نخيل غرداية",
    ),
  },
};

const UNESCO = {
  eyebrow: L("UNESCO", "UNESCO", "اليونسكو"),
  title: L("Why UNESCO listed the M'Zab in 1982", "Pourquoi l'UNESCO a inscrit le M'Zab en 1982", "لماذا أدرجت اليونسكو وادي مزاب عام 1982"),
  criteria: [
    {
      code: "ii",
      body: L(
        "The M'Zab exerted a considerable influence on 20th-century architecture and urbanism, from Le Corbusier and Fernand Pouillon to Hassan Fathy and André Ravéreau.",
        "Le M'Zab a exercé une influence considérable sur l'architecture et l'urbanisme du XXe siècle, de Le Corbusier et Fernand Pouillon à Hassan Fathy et André Ravéreau.",
        "أثّر وادي مزاب تأثيراً بالغاً في العمارة والعمران في القرن العشرين، من لو كوربوزييه وفرنان بويون إلى حسن فتحي وأندريه رافيرو.",
      ),
    },
    {
      code: "iii",
      body: L(
        "It bears exceptional witness to the culture of a religious minority (Ibadism) that has preserved its cohesion and traditions for a thousand years.",
        "Il porte un témoignage exceptionnel sur la culture d'une minorité religieuse (l'ibadisme) qui a préservé sa cohésion et ses traditions durant un millénaire.",
        "يشكّل شاهداً استثنائياً على ثقافة أقلّية دينية (الإباضية) حافظت على تماسكها وتقاليدها ألف عام.",
      ),
    },
    {
      code: "v",
      body: L(
        "It is an outstanding example of a traditional human settlement adapted to its environment, which has become vulnerable under the impact of irreversible change.",
        "Il constitue un exemple éminent d'établissement humain traditionnel adapté à son environnement, devenu vulnérable sous l'effet de mutations irréversibles.",
        "يمثّل مثالاً بارزاً على مستوطنة بشرية تقليدية تكيّفت مع بيئتها، وأصبحت اليوم هشّة أمام تحوّلات لا رجعة فيها.",
      ),
    },
  ],
  panels: [
    {
      title: L("Outstanding Universal Value", "Valeur universelle exceptionnelle", "القيمة العالمية الاستثنائية"),
      body: L(
        "Outstanding Universal Value: the M'Zab pentapolis is a complete and functioning example, perhaps the only surviving one, of the medieval Ibadi urban model, in which theology, hydraulics, defence and social order are drawn as one integrated diagram of a city.",
        "Valeur universelle exceptionnelle : la pentapole du M'Zab est un exemple complet et vivant, sans doute le seul qui subsiste, du modèle urbain ibadite médiéval, où théologie, hydraulique, défense et ordre social se dessinent comme un unique diagramme intégré de la cité.",
        "القيمة العالمية الاستثنائية: تُمثّل المدن الخمس نموذجاً كاملاً وحيّاً، ولعلّه الوحيد الباقي، للنموذج العمراني الإباضي في العصور الوسطى، حيث تُرسَم اللاهوت والهيدروليكا والدفاع والنظام الاجتماعي في مخطّطٍ واحد للمدينة.",
      ),
    },
    {
      title: L("Authenticity", "Authenticité", "الأصالة"),
      body: L(
        "Authenticity: houses remain built with local stone, palm-log ceilings and lime plaster. Trades are transmitted father to son. The azzaba assembly still legislates on public space.",
        "Authenticité : les maisons continuent d'être bâties en pierre locale, poutres de palmier et enduit à la chaux. Les métiers se transmettent de père en fils. L'assemblée des azzaba légifère encore sur l'espace public.",
        "الأصالة: لا تزال البيوت تُبنى من الحجر المحلي وسقوف جذوع النخل والجصّ الجيري. وتنتقل الحرف من الأب إلى الابن. ولا تزال حلقة العزّابة تُشرِّع في الفضاء العام.",
      ),
    },
    {
      title: L("Integrity", "Intégrité", "التكامل"),
      body: L(
        "Integrity: the historic cores of the five ksour, the palm groves and the traditional cemeteries all survive within a single continuous cultural landscape.",
        "Intégrité : les noyaux historiques des cinq ksour, les palmeraies et les cimetières traditionnels subsistent dans un même paysage culturel continu.",
        "التكامل: تبقى النوى التاريخية للقصور الخمسة والبساتين النخيلية والمقابر التقليدية ضمن مشهد ثقافيّ متّصل واحد.",
      ),
    },
    {
      title: L("Conservation", "Conservation", "الحفاظ"),
      body: L(
        "Since 1988 the Office de Protection et de Promotion de la Vallée du M'Zab (OPVM) has managed the site under a rigorous plan of permanent inhabitants, restricted materials, and monitored restoration, one of the earliest such institutions in the Arab world.",
        "Depuis 1988, l'Office de Protection et de Promotion de la Vallée du M'Zab (OPVM) gère le site selon un plan rigoureux d'habitat permanent, de matériaux restreints et de restauration surveillée, l'une des toutes premières institutions de ce type dans le monde arabe.",
        "منذ 1988، يُدير ديوانُ حماية وترقية وادي مزاب (OPVM) الموقع وفق خطّة صارمة للسكن الدائم والمواد المرخّصة والترميم المراقَب، من أوائل هذه المؤسسات في العالم العربي.",
      ),
    },
  ],
};

const DAILY = {
  eyebrow: L("Daily life", "Vie quotidienne", "الحياة اليومية"),
  title: L("A society that runs on assemblies, not authorities", "Une société qui fonctionne par assemblées, non par autorités", "مجتمعٌ تُديره المجالس لا السلطات"),
  paragraphs: [
    L(
      "The Mozabite day is governed by two assemblies, both older than any modern institution in Algeria. The halqa of the azzaba, a religious council of a dozen elders, watches over doctrine, education and burial. The djemaâ, a civic assembly of family heads, decides on water, land, disputes and public works. Neither has a president. Neither takes a vote, decisions are debated until a consensus is reached, however long that takes.",
      "La journée mozabite est régie par deux assemblées, plus anciennes que toute institution algérienne moderne. La halqa des azzaba, conseil religieux d'une douzaine d'anciens, veille sur la doctrine, l'enseignement et les funérailles. La djemaâ, assemblée civile des chefs de famille, tranche l'eau, la terre, les litiges et les travaux publics. Ni l'une ni l'autre n'a de président. Ni l'une ni l'autre ne vote, on débat jusqu'au consensus, aussi long soit-il.",
      "يُنظّم يومَ المزابي مجلسان، أقدم من أيّ مؤسّسة جزائرية حديثة. حلقةُ العزّابة، مجلسٌ ديني من نحو اثني عشر شيخاً، تسهر على العقيدة والتعليم والجنائز. والجماعة، مجلس مدني من كبار العائلات، تفصل في الماء والأرض والنزاعات والأشغال العامة. لا رئيسَ لأيّ منهما. ولا يُصوَّت، يُتناقش حتى يبلغ التوافق مهما طال.",
    ),
    L(
      "Trade is another pillar. The Mozabite retail merchant is a familiar figure in every Algerian city; the community's ancient system of family capital pooling (touiza) still funds shops and marriages across the diaspora. What flows back to the valley is what has kept it standing: money, but also the discipline of a people who left in order to return.",
      "Le commerce est un autre pilier. Le commerçant mozabite est une figure familière de toutes les villes d'Algérie ; l'ancien système communautaire de mise en commun des capitaux (touiza) finance encore boutiques et mariages à travers la diaspora. Ce qui revient à la vallée est ce qui l'a maintenue debout : de l'argent, mais surtout la discipline d'un peuple qui part pour revenir.",
      "التجارة ركنٌ آخر. تاجرُ التجزئة المزابي وجهٌ مألوف في كلّ مدن الجزائر؛ ولا يزال النظام العائلي الموروث لتجميع رأس المال (تويزة) يموّل المحلاّت والأعراس عبر الشتات. وما يعود إلى الوادي هو ما أبقاه قائماً: مالٌ، ولكن قبله انضباط شعبٍ يرحل ليعود.",
    ),
  ],
  crafts: [
    L("The Ghardaïa carpet, geometric, low-pile, dyed in cochineal red and henna gold, is a UNESCO-recognised living craft.", "Le tapis de Ghardaïa, géométrique, à velours ras, teint au rouge cochenille et à l'or de henné, est un artisanat vivant reconnu par l'UNESCO.", "زربية غرداية، هندسية، قصيرة الوبر، مصبوغة بأحمر القرمز وذهب الحنّاء، حرفةٌ حيّة تعترف بها اليونسكو."),
    L("Silversmithing in Beni Isguen still uses medieval filigree techniques passed on within families.", "L'orfèvrerie d'argent à Beni Isguen conserve les techniques médiévales de filigrane, transmises en famille.", "لا تزال صياغةُ الفضّة في بني يزقن تحفظ تقنيّات الفتيل من العصور الوسطى، متوارثةً داخل العائلات."),
    L("The daily market call at Beni Isguen, the halqa, sells everything, from a copper tray to a she-camel, item by item at sunset.", "L'appel quotidien du marché à Beni Isguen, la halqa, vend tout, d'un plateau en cuivre à une chamelle, objet par objet au coucher du soleil.", "نداءُ السوق اليومي في بني يزقن، الحلقة، يبيع كلّ شيء، من صينية نحاس إلى ناقة، قطعةً قطعة عند المغرب."),
    L("Hospitality is codified: any traveller who reaches a ksar at dusk is guaranteed shelter, water and a share of the evening meal, not by law, by convention older than law.", "L'hospitalité est codifiée : tout voyageur arrivant à un ksar au crépuscule est assuré d'un toit, d'eau et d'une part du repas, non par la loi, mais par une convention plus ancienne que la loi.", "الضيافة مقنَّنة: كلّ مسافر يبلغ قصراً عند الغسق يجد مأوىً وماءً ونصيباً من عشاء أهله، لا بحكم القانون بل بحكم عرفٍ أقدم من القانون."),
  ],
  image: {
    alt: L(
      "Sepia photograph of the arcaded market square of Beni Isguen, empty and bathed in Saharan light.",
      "Photographie sépia de la place du marché à arcades de Beni Isguen, vide et baignée de lumière saharienne.",
      "صورة سبيا لساحة سوق بني يزقن ذات الأروقة، خالية وتغمرها الشمس الصحراوية.",
    ),
    caption: L(
      "The covered market of Beni Isguen at midday",
      "Le marché couvert de Beni Isguen à midi",
      "السوق المسقوف في بني يزقن ظهيرةً",
    ),
  },
};

const ENGINEERING = {
  eyebrow: L("Engineering", "Ingénierie", "الهندسة"),
  title: L("Why modern architects still study the M'Zab", "Pourquoi les architectes contemporains étudient encore le M'Zab", "لماذا لا يزال المعماريّون المعاصرون يدرسون وادي مزاب"),
  bullets: [
    L(
      "Because it is a demonstration, at the scale of a whole society, that thermal comfort, water security and dense living can be achieved with almost no fossil energy.",
      "Parce qu'il démontre, à l'échelle d'une société entière, que le confort thermique, la sécurité hydrique et la densité urbaine peuvent s'obtenir presque sans énergie fossile.",
      "لأنّه يُثبت، على مقياس مجتمعٍ كامل، أن الراحة الحرارية والأمان المائي والكثافة السكّانية ممكنة بلا طاقة أحفوريّة تقريباً.",
    ),
    L(
      "Because its urban plan was designed for a climate of extremes, cold nights, brutal days, catastrophic rain, the very conditions many world cities are only now beginning to face under a warming climate.",
      "Parce que son plan urbain fut conçu pour un climat d'extrêmes, nuits froides, journées brûlantes, pluies catastrophiques, précisément les conditions auxquelles beaucoup de villes du monde commencent seulement à faire face avec le réchauffement.",
      "لأنّ مخطّطه العمراني صُمّم لمناخٍ من الأقصى، ليالٍ باردة ونهاراتٌ حارقة وأمطارٌ كارثيّة، وهي الظروف نفسها التي بدأت مدنٌ كثيرة في العالم لتوّها تواجهها مع الاحتباس الحراري.",
    ),
    L(
      "Because its construction economy is circular by default: mud plaster returns to earth, palm beams regrow every generation, and the volume of a house is limited by what a family can lift by hand.",
      "Parce que son économie de construction est par défaut circulaire : l'enduit de terre retourne au sol, les poutres de palmier repoussent à chaque génération, et le volume d'une maison est borné par ce qu'une famille peut porter à la main.",
      "لأنّ اقتصاده البنائي دائريّ افتراضاً: الطينُ يعود إلى الأرض، وجذوعُ النخيل تنبت كلّ جيل، وحجمُ البيت محكومٌ بما تستطيع عائلة حمله بيدها.",
    ),
    L(
      "Because it works. A thousand years in, five cities of thirty thousand people together still function under the same rules, in the same walls.",
      "Parce que cela fonctionne. Mille ans plus tard, cinq villes totalisant trente mille habitants vivent encore sous les mêmes règles, entre les mêmes murs.",
      "لأنّه ناجح. بعد ألفِ عام، لا تزال خمس مدنٍ يبلغ سكّانها ثلاثين ألف نسمة تعيش بالقواعد نفسها بين الجدران نفسها.",
    ),
  ] as LocalizedString[],
};

const INFLUENCE = {
  eyebrow: L("Influence", "Influence", "الأثر"),
  title: L("The lesson that travelled the world", "La leçon qui a fait le tour du monde", "الدرس الذي جاب العالم"),
  paragraphs: [
    L(
      "In 1931 Le Corbusier disembarked from a small plane at Ghardaïa. He stayed only a week. He would return to the M'Zab in his notes for the rest of his life, the whitewashed cubic house of El Atteuf appears in his sketchbooks alongside Greek temples and Andean citadels. \"An architecture that is not designed,\" he wrote, \"but inherited.\"",
      "En 1931, Le Corbusier descendit d'un petit avion à Ghardaïa. Il n'y resta qu'une semaine. Il ne cesserait ensuite de revenir au M'Zab dans ses carnets, la maison cubique blanche d'El Atteuf y voisine les temples grecs et les citadelles andines. « Une architecture qui n'est pas dessinée, écrit-il, mais héritée. »",
      "في 1931 نزل لو كوربوزييه من طائرة صغيرة في غرداية، وأقام أسبوعاً فحسب. ولكنّه لن يكفّ عن العودة إلى وادي مزاب في دفاتره، يظهر بيتُ العطف المكعّب الأبيض إلى جانب المعابد اليونانية والقلاع الأندية. كتب: «عمارةٌ لا تُصمَّم بل تُوَرَّث».",
    ),
    L(
      "The Egyptian master Hassan Fathy visited a generation later and wrote of the M'Zab as \"the finished lesson\", the built form of everything he had spent his life arguing for. The French-Algerian architect André Ravéreau moved to Ghardaïa in the 1960s and made the valley his life's study; his book \"Le M'Zab, une leçon d'architecture\" is still the reference. Fernand Pouillon's whitewashed housing estates in Algiers, still standing today, are unimaginable without it.",
      "Le maître égyptien Hassan Fathy visita une génération plus tard et parla du M'Zab comme de « la leçon achevée », la forme bâtie de tout ce qu'il avait défendu sa vie durant. L'architecte franco-algérien André Ravéreau s'installa à Ghardaïa dans les années 1960 et fit du M'Zab l'étude d'une vie ; son livre « Le M'Zab, une leçon d'architecture » reste la référence. Les cités blanchies à la chaux de Fernand Pouillon à Alger, toujours debout, seraient impensables sans lui.",
      "زار المعلّم المصري حسن فتحي بعد جيل، ووصف وادي مزاب بـ«الدرس المكتمل»، الصورة المبنيّة لكلّ ما دافع عنه طوال حياته. وانتقل المعماريّ الفرنسي-الجزائري أندريه رافيرو للعيش في غرداية في الستّينيّات، وجعل من الوادي دراسةَ عمر؛ ولا يزال كتابه «المزاب: درس في العمارة» المرجع. وأحياءُ فرنان بويون البيضاء في الجزائر العاصمة، التي لا تزال قائمة، لا يمكن تصوّرها من دونه.",
    ),
    L(
      "Today, from the Aga Khan Award to the New European Bauhaus, from Diébédo Francis Kéré in Burkina Faso to earthen-architecture programmes at MIT and ETH Zürich, the vocabulary of \"vernacular sustainability\" is unimaginable without the M'Zab. Few places on earth have taught the world so much and asked for so little in return.",
      "Aujourd'hui, du Prix Aga Khan au Nouveau Bauhaus européen, de Diébédo Francis Kéré au Burkina Faso aux programmes d'architecture de terre du MIT et de l'ETH Zurich, le vocabulaire de la « durabilité vernaculaire » est impensable sans le M'Zab. Peu de lieux au monde ont autant enseigné en demandant si peu en retour.",
      "اليوم، من جائزة الآغا خان إلى الباوهاوس الأوروبي الجديد، ومن ديبيدو فرانسيس كيري في بوركينا فاسو إلى برامج العمارة الطينية في MIT وETH زيورخ، لا يمكن تخيّل قاموس «الاستدامة العامية» دون وادي مزاب. قلّةٌ من الأماكن في الأرض علّمت العالم بهذا القدر وطلبت هذا القدر القليل مقابلَه.",
    ),
  ],
  quote: L(
    "\"The M'Zab is the built proof that one can be modern without being new.\"",
    "« Le M'Zab est la preuve bâtie qu'on peut être moderne sans être nouveau. »",
    "«وادي مزاب دليلٌ مبنيٌّ على أنّ المرء يمكن أن يكون حديثاً دون أن يكون جديداً.»",
  ),
  attribution: L(
    ", André Ravéreau, Le M'Zab, une leçon d'architecture (1981)",
    ", André Ravéreau, Le M'Zab, une leçon d'architecture (1981)",
    "، أندريه رافيرو، المزاب: درس في العمارة (1981)",
  ),
};

const FACTS: LocalizedString[] = [
  L(
    "In Beni Isguen, the muezzin's call to the last prayer of the day is also the gate-closing signal. No one enters the city after that call until dawn, a rule respected without any physical enforcement since 1347.",
    "À Beni Isguen, l'appel à la dernière prière du jour est aussi le signal de fermeture des portes. Personne n'entre après cet appel jusqu'à l'aube, une règle respectée sans aucune contrainte physique depuis 1347.",
    "في بني يزقن، نداءُ صلاة العشاء هو أيضاً إشارة إغلاق أبواب المدينة. لا يدخل أحدٌ بعده حتى الفجر، قاعدةٌ يُلتَزم بها دون إكراه ماديّ منذ 1347.",
  ),
  L(
    "The M'Zab lime, burned locally from a soft limestone called timchent, hardens rather than dissolves in floodwater. A wall built in the 12th century can shed a modern flash flood.",
    "La chaux du M'Zab, cuite localement à partir d'un calcaire tendre, le timchent, durcit au lieu de se dissoudre dans les crues. Un mur du XIIe siècle résiste encore aux crues éclair modernes.",
    "جصّ المزاب، يُحرَق محلّياً من حجرٍ جيريٍّ ليّن يسمّى تِمشنت، يتصلّد بدل أن يذوب في مياه الفيضان. جدارٌ من القرن 12 قادر على صدّ فيضانٍ خاطف حديث.",
  ),
  L(
    "There is no monument to a hero in any Mozabite city. The doctrine forbids it. The tallest thing anywhere in the pentapolis is always the minaret.",
    "Aucune ville mozabite n'abrite de monument à un héros : la doctrine l'interdit. L'objet le plus haut de la pentapole est toujours le minaret.",
    "لا يوجد نصبٌ لبطلٍ في أيّ من مدن المزاب: المذهب يمنع ذلك. أعلى ما في المدن الخمس دائماً هو المئذنة.",
  ),
  L(
    "Mozabite women wear a distinctive white veil (haïk el-mrama) with a single eye opening. It is not concealment; it is a spatial signal, a moving reminder that the streets belong to the community, and the inside of the house to the family.",
    "Les femmes mozabites portent un voile blanc distinctif (haïk el-mrama) à une seule ouverture pour l'œil. Ce n'est pas un masque, c'est un signal spatial, un rappel mouvant que la rue appartient à la communauté et l'intérieur de la maison à la famille.",
    "ترتدي المزابيّات حائكاً أبيض مميّزاً (حائك المرامة) بفتحةٍ واحدة للعين. ليست ستراً بل إشارةً فضائية، تذكيرٌ متحرّك بأنّ الشارع للجماعة وداخل البيت للعائلة.",
  ),
  L(
    "The valley grows five distinct varieties of date, including the tinicine, so sugar-dense it was once used as caravan currency all the way to Timbuktu.",
    "La vallée cultive cinq variétés distinctes de dattes, dont la tinicine, si sucrée qu'elle servit longtemps de monnaie caravanière jusqu'à Tombouctou.",
    "تزرع الوادي خمسة أصناف مميّزة من التمر، منها التِنيسين، غنيّة السكّر إلى حدّ أنها استُعملت طويلاً عملةً للقوافل حتى تمبكتو.",
  ),
  L(
    "The 2008 flood killed 33 people. In the historical ksour, which sit above the wadi bed exactly where the founders placed them a thousand years earlier, the death toll was zero.",
    "La crue de 2008 fit 33 morts. Dans les ksour historiques, situés au-dessus du lit du wadi exactement là où les fondateurs les avaient placés mille ans plus tôt, il n'y eut aucune victime.",
    "أوقع فيضان 2008 ثلاثةً وثلاثين قتيلاً. أمّا في القصور التاريخية القائمة فوق مجرى الوادي بالضبط حيث وضعها المؤسّسون قبل ألف عام، فلم يسقط أيّ قتيل.",
  ),
];

const COLLECTION: CollectionPlate[] = [
  {
    src: mzabHero,
    alt: L(
      "Panoramic view of Ghardaïa at golden hour, with palm groves in the wadi below and the minaret at the summit.",
      "Vue panoramique de Ghardaïa à l'heure dorée, avec la palmeraie dans le wadi et le minaret au sommet.",
      "منظر بانورامي لغرداية عند الغروب، مع بستان النخيل في الوادي والمئذنة في القمة.",
    ),
    caption: L("Aerial view · Ghardaïa · reconstructed", "Vue aérienne · Ghardaïa · reconstitution", "منظر جويّ · غرداية · إعادة تصوير"),
    note: L("Contemporary reconstruction based on published UNESCO documentation.", "Reconstitution contemporaine d'après la documentation UNESCO.", "إعادة تصوير معاصرة استناداً إلى وثائق اليونسكو."),
  },
  {
    src: mzabKsarPlan,
    alt: L("Sepia isometric drawing of a concentric ksar with a central minaret and outer walls.", "Dessin isométrique sépia d'un ksar concentrique avec minaret central et enceinte extérieure.", "رسمٌ إيزومتري بلون السبيا لقصرٍ متراكز بمئذنة مركزية وسور خارجي."),
    caption: L("Ksar plan · isometric study", "Plan du ksar · étude isométrique", "مخطّط القصر · دراسة إيزومترية"),
    note: L("Interpretive reconstruction created for DZ Odyssey after Ravéreau (1981). Not a surveyed architectural drawing.", "Reconstitution interprétative créée pour DZ Odyssey d'après Ravéreau (1981). Il ne s'agit pas d'un relevé architectural.", "إعادة بناء تفسيرية أُنشئت لدي زد أوديسي استنادًا إلى رافيرو (1981). وليست رفعًا معماريًا مساحيًا."),
  },
  {
    src: mzabHouse,
    alt: L("Sepia architectural cross-section of a traditional Mozabite house showing courtyard, chebek and thick walls.", "Coupe sépia d'une maison mozabite traditionnelle montrant patio, chebek et murs épais.", "مقطع معماري بلون السبيا لبيت مزابي تقليدي يُظهر الفناء والشبك والجدران السميكة."),
    caption: L("Ibadi house · sectional drawing", "Maison ibadite · coupe", "البيت الإباضي · مقطع"),
    note: L("Interpretive reconstruction created for DZ Odyssey after Donnadieu (1986). Not a surveyed architectural drawing.", "Reconstitution interprétative créée pour DZ Odyssey d'après Donnadieu (1986). Il ne s'agit pas d'un relevé architectural.", "إعادة بناء تفسيرية أُنشئت لدي زد أوديسي استنادًا إلى دونادييه (1986). وليست رفعًا معماريًا مساحيًا."),
  },
  {
    src: mzabWater,
    alt: L("Sepia archival photograph of the stone dam and carved distribution channels of the M'Zab flood system.", "Photographie sépia du barrage de pierre et des canaux sculptés du système hydraulique du M'Zab.", "صورة أرشيفية بلون السبيا للسدّ الحجري والقنوات المنحوتة لنظام مياه المزاب."),
    caption: L("Kesria · flood-water divider", "Kesria · pierre partageuse des crues", "الكِسريا · مقسّم مياه الفيضان"),
    note: L("Archival-style reconstruction, palm grove of Ghardaïa.", "Reconstitution de style archivistique, palmeraie de Ghardaïa.", "إعادة تصوير بأسلوب أرشيفي، بستان نخيل غرداية."),
  },
  {
    src: mzabMarket,
    alt: L("Sepia photograph of the arcaded market square of Beni Isguen, empty at midday.", "Photographie sépia de la place du marché à arcades de Beni Isguen, vide à midi.", "صورة سبيا لساحة سوق بني يزقن ذات الأروقة، خالية عند الظهيرة."),
    caption: L("Beni Isguen · market arcade", "Beni Isguen · arcades du marché", "بني يزقن · أروقة السوق"),
    note: L("Reference: architectural documentation, OPVM.", "Référence : documentation architecturale, OPVM.", "المرجع: توثيق معماري لديوان حماية وادي مزاب."),
  },
];

const RELATED: RelatedExhibit[] = [
  {
    to: "/region/$regionId",
    params: { regionId: "sahara" },
    label: L("The Sahara", "Le Sahara", "الصحراء الكبرى"),
    body: L("The desert as a civilization, not a void.", "Le désert comme civilisation, non comme vide.", "الصحراء بوصفها حضارة لا فراغاً."),
  },
  {
    to: "/culture/language",
    label: L("Berber & the Amazigh legacy", "Berbère et héritage amazigh", "الأمازيغية والإرث الأمازيغي"),
    body: L("The linguistic layer beneath the Ibadi city.", "La strate linguistique sous la cité ibadite.", "الطبقة اللغوية تحت المدينة الإباضية."),
  },
  {
    to: "/era/$eraId",
    params: { eraId: "islamic" },
    label: L("The Islamic era", "L'ère islamique", "العصر الإسلامي"),
    body: L("The Rustamid imamate and the age that shaped the M'Zab.", "L'imamat rustumide et l'âge qui a façonné le M'Zab.", "الإمامة الرستمية والعصر الذي شكّل وادي مزاب."),
  },
  {
    to: "/cuisine",
    label: L("Dates, cuisine & the palm grove", "Dattes, cuisine et palmeraie", "التمر والمطبخ والبستان"),
    body: L("How the M'Zab palm shaped a national kitchen.", "Comment la palmeraie du M'Zab a façonné une cuisine nationale.", "كيف شكّل نخيل المزاب مطبخاً وطنياً."),
  },
  {
    to: "/culture/music",
    label: L("Living culture", "Culture vivante", "الثقافة الحيّة"),
    body: L("The songs, crafts and rites that still fill the ksour.", "Les chants, les métiers et les rites qui animent encore les ksour.", "الأغاني والحرف والطقوس التي لا تزال تحيي القصور."),
  },
  {
    to: "/timeline",
    label: L("Algeria across time", "L'Algérie à travers le temps", "الجزائر عبر الزمن"),
    body: L("Place the M'Zab on the long timeline of the country.", "Situer le M'Zab dans la longue frise du pays.", "ضع وادي مزاب في التسلسل الزمني الطويل للبلاد."),
  },
];

/* ------------------------------------------------------------------ */
/*  page                                                               */
/* ------------------------------------------------------------------ */

function MzabExhibit() {
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
        image={mzabHero}
        imageAlt={HERO.imageAlt}
        imageCaption={HERO.caption}
        imageMediaKind="interpretive-illustration"
        ctaHref="#where"
        ctaLabel={HERO.cta}
        backTo="/"
        backLabel={HERO.back}
      />

      {/* Where */}
      <Section id="where" tone="ivory">
        <div className="grid gap-10 md:grid-cols-[1.15fr_1fr]">
          <div>
            <EyebrowTitle eyebrow={WHERE.eyebrow} title={WHERE.title} />
            <Prose>
              <p>{tr(WHERE.body, lang)}</p>
              <p className="italic text-foreground/70">{tr(WHERE.timeline, lang)}</p>
            </Prose>
          </div>
          <DataStatsCard label={WHERE.cardLabel} stats={WHERE.stats} footer={WHERE.cardFooter} />
        </div>
      </Section>

      {/* Origins */}
      <Section id="birth" tone="parchment">
        <EyebrowTitle eyebrow={BIRTH.eyebrow} title={BIRTH.title} />
        <Prose>
          {BIRTH.paragraphs.map((p, i) => (
            <p key={i}>{tr(p, lang)}</p>
          ))}
        </Prose>
      </Section>

      {/* Five Ksour */}
      <Section id="ksour" tone="sand">
        <EyebrowTitle
          eyebrow={L("The five ksour", "Les cinq ksour", "القصور الخمسة")}
          title={L("A pentapolis, not a city with suburbs", "Une pentapole, non une ville et ses faubourgs", "خمسُ مدنٍ، لا مدينة وأحياؤها")}
        />
        <p className="max-w-3xl text-foreground/80 text-base sm:text-lg leading-[1.75] mb-10">
          {tr(
            L(
              "The M'Zab is not a capital and four satellites. It is five autonomous cities that chose, a thousand years ago, to sit within sight of each other's minarets, close enough to share a valley, distant enough to preserve their own councils. Together they form a pentapolis unlike anything else in the Islamic world.",
              "Le M'Zab n'est pas une capitale et quatre satellites. Ce sont cinq cités autonomes qui ont choisi, il y a mille ans, de rester dans la vue mutuelle de leurs minarets, assez proches pour partager une vallée, assez distantes pour préserver leurs propres conseils. Ensemble elles forment une pentapole sans équivalent dans le monde islamique.",
              "وادي مزاب ليس عاصمةً وأربعة توابع. بل خمس مدنٍ مستقلّة اختارت قبل ألفِ عام أن تظلّ في مرأى مآذن بعضها البعض، قريبةً بما يكفي لتقاسم وادٍ واحد، بعيدةً بما يكفي للحفاظ على مجالسها الخاصّة. تُشكّل معاً خمسَ مدنٍ لا نظير لها في العالم الإسلامي.",
            ),
            lang,
          )}
        </p>
        <NumberedGrid
          items={KSOUR}
          columns={3}
          factLabel={L("Did you know", "Le saviez-vous", "هل تعلم")}
        />
      </Section>

      {/* Heptapolis, broader historical M'Zab (Berriane + El Guerrara) */}
      <Section id="heptapolis" tone="parchment">
        <EyebrowTitle eyebrow={HEPTAPOLIS_INTRO.eyebrow} title={HEPTAPOLIS_INTRO.title} />
        <div className="grid gap-8 md:grid-cols-[1.35fr_1fr] items-start mb-10">
          <p className="text-foreground/80 text-base sm:text-lg leading-[1.75]">
            {tr(HEPTAPOLIS_INTRO.lead, lang)}
          </p>
          <Plaque>
            <div className="text-[10px] uppercase tracking-[0.28em] text-primary mb-2">
              {tr(HEPTAPOLIS_INTRO.plaqueLabel, lang)}
            </div>
            <p className="text-sm sm:text-base leading-[1.7] text-foreground/80">
              {tr(HEPTAPOLIS_INTRO.plaqueBody, lang)}
            </p>
          </Plaque>
        </div>
        <NumberedGrid
          items={HEPTAPOLIS_OUTLIERS}
          columns={2}
          factLabel={L("Did you know", "Le saviez-vous", "هل تعلم")}
        />
      </Section>

      {/* Water */}

      <Section id="water" tone="ivory">
        <SplitFigure
          eyebrow={WATER.eyebrow}
          title={WATER.title}
          body={WATER.body}
          bullets={WATER.bullets}
          figure={
            <Figure src={mzabWater} alt={WATER.image.alt} caption={WATER.image.caption} mediaKind="interpretive-illustration" width={1600} height={1008} />
          }
        />
      </Section>

      {/* Architecture */}
      <Section id="architecture" tone="parchment">
        <EyebrowTitle eyebrow={ARCHITECTURE.eyebrow} title={ARCHITECTURE.title} />
        <Prose>
          <p>{tr(ARCHITECTURE.intro, lang)}</p>
        </Prose>
        <div className="mt-10 grid gap-8 md:grid-cols-2 items-start">
          <Figure
            src={mzabKsarPlan}
            alt={L(
              "Sepia isometric drawing of a concentric M'Zab ksar, streets spiralling around a central mosque, defensive wall and cemetery outside.",
              "Dessin isométrique sépia d'un ksar concentrique du M'Zab, rues en spirale autour d'une mosquée centrale, enceinte et cimetière extérieurs.",
              "رسم إيزومتري بلون السبيا لقصر مزاب متراكز، شوارع تلتفّ حول مسجد مركزي وسور ومقبرة في الخارج.",
            )}
            caption={L(
              "Plan of a ksar · concentric spiral around the mosque",
              "Plan d'un ksar · spirale concentrique autour de la mosquée",
              "مخطّط قصر · حلزون متراكز حول المسجد",
            )}
            width={1408}
            height={1008}
          />
          <Figure
            src={mzabHouse}
            alt={L(
              "Sepia sectional drawing of a traditional Mozabite house, courtyard (west ed-dar), shaded chebek terrace, thick lime-washed walls.",
              "Coupe sépia d'une maison mozabite traditionnelle, patio (west ed-dar), terrasse à claustra (chebek), murs épais chaulés.",
              "مقطع بلون السبيا لبيت مزابي تقليدي، الفناء (ويسط الدار)، السطح المشبّك (شبك)، الجدران السميكة المطليّة بالجير.",
            )}
            caption={L(
              "Section of an Ibadi house · courtyard, chebek, thermal walls",
              "Coupe d'une maison ibadite · patio, chebek, murs à inertie",
              "مقطع بيت إباضي · فناء، شبك، جدران حراريّة",
            )}
            width={1408}
            height={1008}
          />
        </div>
        <p className="mt-4 text-xs sm:text-sm italic text-muted-foreground max-w-3xl">
          {tr(
            L(
              "Interpretive reconstruction created for DZ Odyssey. Not a surveyed architectural drawing.",
              "Reconstitution interprétative créée pour DZ Odyssey. Il ne s'agit pas d'un relevé architectural.",
              "إعادة بناء تفسيرية أُنشئت خصيصًا لدي زد أوديسي. وليست رفعًا معماريًا مساحيًا.",
            ),
            lang,
          )}
        </p>
        <div className="mt-12">
          <NumberedGrid items={ARCHITECTURE.principles} columns={2} />
        </div>
      </Section>

      {/* UNESCO */}
      <Section id="unesco" tone="ivory">
        <EyebrowTitle eyebrow={UNESCO.eyebrow} title={UNESCO.title} />
        <p className="max-w-3xl text-foreground/80 text-base sm:text-lg leading-[1.75] mb-10">
          {tr(
            L(
              "The property inscribed on the World Heritage List in 1982 is the M'Zab pentapolis, the five original ksour of El Atteuf, Bou Noura, Melika, Beni Isguen and Ghardaïa, together with their palm groves and cemeteries. The later Mozabite foundations of Berriane and El Guerrara, described above, belong to the broader historical M'Zab but sit outside this inscription.",
              "Le bien inscrit sur la Liste du patrimoine mondial en 1982 est la pentapole du M'Zab, les cinq ksour d'origine : El Atteuf, Bou Noura, Melika, Beni Isguen et Ghardaïa, avec leurs palmeraies et leurs cimetières. Les fondations mozabites plus tardives de Berriane et d'El Guerrara, décrites plus haut, relèvent du M'Zab historique élargi mais ne font pas partie du bien inscrit.",
              "الموقع المُدرَج في قائمة التراث العالمي عام 1982 هو خمسُ مدن وادي مزاب، القصور الأصلية: العطف، بونورة، مليكة، بني يزقن، غرداية، مع بساتين نخيلها ومقابرها. أمّا تأسيسا بريان والقرارة اللاحقان، كما ذُكر أعلاه، فينتميان إلى وادي مزاب التاريخي الأوسع، لكنّهما خارج نطاق هذا الإدراج.",
            ),
            lang,
          )}
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

      {/* Daily life */}
      <Section id="daily-life" tone="parchment">
        <SplitFigure
          eyebrow={DAILY.eyebrow}
          title={DAILY.title}
          body={DAILY.paragraphs}
          figure={
            <Figure
              src={mzabMarket}
              alt={DAILY.image.alt}
              caption={DAILY.image.caption}
              mediaKind="interpretive-illustration"
              width={1600}
              height={1008}
            />
          }
        />
        <ul className="mt-10 grid gap-4 md:grid-cols-2" role="list">
          {DAILY.crafts.map((c, i) => (
            <li
              key={i}
              className="rounded-xl border border-border bg-card p-5 text-sm text-foreground/80 leading-[1.7]"
              style={{ boxShadow: "var(--shadow-soft)" }}
            >
              {tr(c, lang)}
            </li>
          ))}
        </ul>
      </Section>

      {/* Engineering */}
      <Section id="engineering" tone="sand">
        <EyebrowTitle eyebrow={ENGINEERING.eyebrow} title={ENGINEERING.title} />
        <ol className="space-y-5 max-w-3xl" role="list">
          {ENGINEERING.bullets.map((b, i) => (
            <li
              key={i}
              className="rounded-xl border border-border bg-card p-5 sm:p-6 text-base text-foreground/85 leading-[1.75]"
              style={{ boxShadow: "var(--shadow-soft)" }}
            >
              <span
                aria-hidden
                className="mr-3 text-xs uppercase tracking-[0.24em] font-bold text-primary"
              >
                {String(i + 1).padStart(2, "0")}
              </span>
              {tr(b, lang)}
            </li>
          ))}
        </ol>
      </Section>

      {/* Influence */}
      <Section id="influence" tone="parchment">
        <EyebrowTitle eyebrow={INFLUENCE.eyebrow} title={INFLUENCE.title} />
        <Prose>
          {INFLUENCE.paragraphs.map((p, i) => (
            <p key={i}>{tr(p, lang)}</p>
          ))}
        </Prose>
        <PullQuote quote={INFLUENCE.quote} attribution={INFLUENCE.attribution} />
      </Section>

      {/* Did you know */}
      <Section id="did-you-know" tone="ivory">
        <EyebrowTitle
          eyebrow={L("Did you know?", "Le saviez-vous ?", "هل تعلم؟")}
          title={L("Six things you were not expecting", "Six choses que vous n'attendiez pas", "ستّة أمور لم تكن تتوقّعها")}
        />
        <DiscoveryCards items={FACTS} label={L("Fact", "Fait", "معلومة")} />
      </Section>

      {/* Collection */}
      <Section id="collection" tone="parchment">
        <EyebrowTitle
          eyebrow={L("Museum collection", "Collection muséale", "المجموعة المتحفية")}
          title={L(
            "Photographs, drawings and archival plates",
            "Photographies, dessins et planches d'archives",
            "صور ورسوم ولوحات أرشيفية",
          )}
        />
        <p className="max-w-3xl text-foreground/75 text-sm sm:text-base leading-[1.75] mb-8">
          {tr(
            L(
              "A curated set of illustrations produced for this exhibit, drawn from published UNESCO documentation, André Ravéreau's architectural studies, and the archives of the OPVM. Each plate carries a museum-style caption; full provenance is listed at the end of the exhibit.",
              "Un ensemble d'illustrations produites pour cette exposition, à partir de la documentation UNESCO, des études architecturales d'André Ravéreau et des archives de l'OPVM. Chaque planche est accompagnée d'une légende muséale ; la provenance complète est indiquée en fin d'exposition.",
              "مجموعة مختارة من الصور والرسوم أُنتجت خصّيصاً لهذا المعرض، مستندةً إلى وثائق اليونسكو ودراسات أندريه رافيرو المعماريّة وأرشيف ديوان حماية وادي مزاب. تحمل كلّ لوحة تسمية متحفية، ويُذكر التوثيق الكامل في آخر المعرض.",
            ),
            lang,
          )}
        </p>
        <CollectionGrid plates={COLLECTION} plateLabel={L("Plate", "Planche", "لوحة")} />
      </Section>

      {/* Related exhibits */}
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

      {/* Provenance */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6 py-12">
        <ExhibitProvenance exhibitId="mzab" />
      </section>

      <footer className="border-t border-border/60 bg-card/40">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 py-8 flex flex-wrap items-center justify-between gap-4">
          <p className="text-xs text-muted-foreground italic">
            {tr(
              L(
                "The M'Zab Valley · a permanent exhibit of DZ Odyssey.",
                "La Vallée du M'Zab · exposition permanente de DZ Odyssey.",
                "وادي مزاب · معرضٌ دائم في متحف الجزائر الرحلة.",
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

// Suppress unused-lang warning under strict linters when reading no direct text
void ((_: Lang) => _);

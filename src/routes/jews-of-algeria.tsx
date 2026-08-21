/**
 * The Jews of Algeria — a standalone exhibit of DZ Odyssey.
 *
 * First, focused version. Built entirely on the shared museum-exhibit library
 * extracted from the M'Zab Valley exhibit (`@/components/exhibit`), with no
 * separate visual system. Launched text-led: DZ Odyssey holds no rights-cleared
 * historical photographs of Algerian Jewish communities, so the exhibit uses
 * restrained typographic and decorative elements only.
 */

import { createFileRoute, Link } from "@tanstack/react-router";
import { Header } from "@/components/Header";
import { useLang, t as tr } from "@/lib/i18n";
import { pageMeta, headLang } from "@/lib/seo";
import { PAGE_META } from "@/lib/pageMetaCopy";
import { ExhibitProvenance } from "@/components/provenance/ExhibitProvenance";
import {
  Section,
  EyebrowTitle,
  Prose,
  Plaque,
  ExhibitHero,
  NumberedGrid,
  DiscoveryCards,
  PullQuote,
  RelatedExhibits,
  type NumberedItem,
  type RelatedExhibit,
} from "@/components/exhibit";

export const Route = createFileRoute("/jews-of-algeria")({
  head: ({ match }) =>
    pageMeta({
      lang: headLang(match),
      path: "/jews-of-algeria",
      ...PAGE_META["/jews-of-algeria"],
      type: "article",
    }),
  component: JewsOfAlgeriaExhibit,
});

type Tri = { en: string; fr: string; ar: string };
const L = (en: string, fr: string, ar: string): Tri => ({ en, fr, ar });

/* ------------------------------------------------------------------ */
/*  content                                                            */
/* ------------------------------------------------------------------ */

const HERO = {
  eyebrow: L("Exhibit · Communities of Algeria", "Exposition · Communautés d'Algérie", "معرض · جماعات الجزائر"),
  title: L("The Jews of Algeria", "Les Juifs d'Algérie", "يهود الجزائر"),
  subtitle: L(
    "Communities, culture and memory across the centuries",
    "Communautés, culture et mémoire à travers les siècles",
    "جماعات وثقافة وذاكرة عبر القرون",
  ),
  lede: L(
    "Jewish life in Algeria stretched across many centuries and many places. Evidence establishes a long Jewish presence in North Africa, though the precise origin dates of individual Algerian communities are not always documented. What the record does show clearly is variety: different regions, languages, occupations, legal statuses and political experiences, held together by religious life and family memory rather than by a single shared story.",
    "La vie juive en Algérie s'est déployée sur de nombreux siècles et de nombreux lieux. Les sources établissent une présence juive ancienne en Afrique du Nord, mais les dates précises d'origine de chaque communauté algérienne ne sont pas toujours documentées. Ce que le dossier montre clairement, c'est la diversité : des régions, des langues, des métiers, des statuts juridiques et des expériences politiques distincts, tenus ensemble par la vie religieuse et la mémoire familiale plutôt que par un récit unique.",
    "امتدّت الحياة اليهودية في الجزائر قروناً عديدة وأماكن كثيرة. تُثبت الأدلّة حضوراً يهودياً قديماً في شمال أفريقيا، غير أنّ تواريخ نشأة كلّ جماعة جزائرية على حدة ليست موثّقة دائماً. أمّا ما يظهر بوضوح في السجلّ فهو التنوّع: مناطق ولغات ومهن وأوضاع قانونية وتجارب سياسية مختلفة، يجمعها الدين وذاكرة العائلة أكثر ممّا تجمعها حكاية واحدة.",
  ),
  cta: L("Enter the exhibit", "Entrer dans l'exposition", "ادخل المعرض"),
  back: L("← Return to museum", "← Retour au musée", "← عودة إلى المتحف"),
};

const OPENING = {
  eyebrow: L("Orientation", "Orientation", "تمهيد"),
  title: L("One country, many communities", "Un pays, plusieurs communautés", "بلدٌ واحد وجماعات كثيرة"),
  body: [
    L(
      "Algerian Jews were not a single ethnic, linguistic or political group. Some families traced themselves to long-settled North African communities, some to Amazigh-speaking regions, some to Sephardic families who arrived from Iberia after 1492, and some to later movements of merchants and scholars across the Maghreb. Coastal city communities and Saharan oasis communities lived under different conditions and often had little in common beyond religion.",
      "Les Juifs d'Algérie ne formaient pas un seul groupe ethnique, linguistique ou politique. Certaines familles se rattachaient à des communautés nord-africaines anciennement établies, d'autres à des régions de langue amazighe, d'autres encore à des familles séfarades venues de la péninsule Ibérique après 1492, d'autres enfin à des circulations plus tardives de marchands et de lettrés à travers le Maghreb. Les communautés des villes côtières et celles des oasis sahariennes vivaient dans des conditions différentes et n'avaient souvent guère en commun que la religion.",
      "لم يكن يهود الجزائر جماعة إثنية أو لغوية أو سياسية واحدة. فبعض العائلات تنتسب إلى جماعات شمال أفريقية قديمة الاستقرار، وبعضها إلى مناطق ناطقة بالأمازيغية، وبعضها إلى عائلات سفاردية وفدت من شبه الجزيرة الإيبيرية بعد 1492، وبعضها إلى حركات لاحقة لتجّار وعلماء عبر المغرب الكبير. وكانت جماعات المدن الساحلية وجماعات واحات الصحراء تعيش في ظروف مختلفة، ولا يجمع بينها في الغالب سوى الدين.",
    ),
    L(
      "This exhibit is a first version. It presents an outline rather than a full history, and it marks the difference between documented history, community tradition and questions scholars have not settled.",
      "Cette exposition est une première version. Elle propose un aperçu plutôt qu'une histoire complète, et elle distingue l'histoire documentée, la tradition communautaire et les questions que la recherche n'a pas tranchées.",
      "هذا المعرض نسخة أولى. يقدّم خطوطاً عامّة لا تاريخاً كاملاً، ويميّز بين التاريخ الموثّق والتقليد المجتمعي والمسائل التي لم يحسمها البحث.",
    ),
  ],
  plaqueLabel: L("Curator's method", "Méthode du conservateur", "منهج القيّم"),
  plaqueBody: L(
    "No population figures, quotations or testimony are given here. Where sources disagree or fall silent, this exhibit says so instead of filling the gap.",
    "Aucun chiffre de population, aucune citation ni aucun témoignage ne figurent ici. Là où les sources divergent ou se taisent, l'exposition le dit au lieu de combler le vide.",
    "لا تُذكر هنا أرقام سكانية ولا اقتباسات ولا شهادات. وحيث تختلف المصادر أو تصمت، يقول المعرض ذلك بدل ملء الفراغ.",
  ),
};

const PLACES: NumberedItem[] = [
  {
    title: L("Algiers", "Alger", "الجزائر العاصمة"),
    body: L(
      "A capital community shaped by the port, by trade with the Mediterranean, and later by the direct weight of French administration. Its institutions, schools and synagogues sat at the centre of colonial-era Jewish life in the north.",
      "Une communauté de capitale façonnée par le port, par le commerce méditerranéen, puis par le poids direct de l'administration française. Ses institutions, ses écoles et ses synagogues occupaient le centre de la vie juive du Nord à l'époque coloniale.",
      "جماعة عاصمة صاغها الميناء والتجارة المتوسطية، ثمّ ثقل الإدارة الفرنسية المباشر. وكانت مؤسّساتها ومدارسها ومعابدها في قلب الحياة اليهودية الشمالية زمن الاستعمار.",
    ),
  },
  {
    title: L("Constantine", "Constantine", "قسنطينة"),
    body: L(
      "An eastern city whose Jewish community was closely bound to Arabic language and to the city's musical life. Constantine is the clearest example of Jewish participation in a shared urban Arabic culture.",
      "Une ville de l'Est dont la communauté juive était étroitement liée à la langue arabe et à la vie musicale de la cité. Constantine offre l'exemple le plus net d'une participation juive à une culture urbaine arabe partagée.",
      "مدينة شرقية ارتبطت جماعتها اليهودية ارتباطاً وثيقاً باللغة العربية وبالحياة الموسيقية للمدينة. وقسنطينة أوضح مثال على مشاركة يهودية في ثقافة حضرية عربية مشتركة.",
    ),
  },
  {
    title: L("Oran", "Oran", "وهران"),
    body: L(
      "A western port with strong Iberian and wider Mediterranean connections, and a population reshaped repeatedly by changes of rule along that coast.",
      "Un port de l'Ouest aux fortes attaches ibériques et méditerranéennes, dont la population fut remodelée à plusieurs reprises par les changements de domination sur cette côte.",
      "ميناء غربي بصلات إيبيرية ومتوسطية قوية، أعادت تغيّرات الحكم على ذلك الساحل تشكيل سكانه مرّات.",
    ),
  },
  {
    title: L("Tlemcen", "Tlemcen", "تلمسان"),
    body: L(
      "An inland centre of learning and craft in the west, long connected to trade routes reaching south toward the Sahara and west toward Morocco.",
      "Un centre intérieur de savoir et d'artisanat à l'Ouest, longtemps relié aux routes commerciales allant vers le Sahara au sud et vers le Maroc à l'ouest.",
      "مركز داخلي للعلم والحرفة في الغرب، ارتبط طويلاً بطرق التجارة نحو الصحراء جنوباً ونحو المغرب غرباً.",
    ),
  },
  {
    title: L("The M'Zab", "Le M'Zab", "وادي مزاب"),
    body: L(
      "A Saharan community living in an Ibadi valley, with its own occupations, its own spoken usage and competing traditions about when it first settled. Scholarship does not fix an early date for it.",
      "Une communauté saharienne installée dans une vallée ibadite, avec ses métiers propres, son usage linguistique et des traditions concurrentes sur la date de son installation. La recherche ne fixe pas de date ancienne.",
      "جماعة صحراوية في وادٍ إباضي، لها مهنها ولغتها المتداولة وروايات متنافسة عن زمن استقرارها الأول. ولا يحدّد البحث لها تاريخاً مبكراً ثابتاً.",
    ),
  },
  {
    title: L("The Sahara and Touat", "Le Sahara et le Touat", "الصحراء وتوات"),
    body: L(
      "Oasis communities tied into caravan commerce, linking Touat, the M'Zab, Tlemcen and other trading centres across the desert and its northern approaches.",
      "Des communautés d'oasis inscrites dans le commerce caravanier, reliant le Touat, le M'Zab, Tlemcen et d'autres centres marchands à travers le désert et ses abords nord.",
      "جماعات واحات منخرطة في تجارة القوافل، تربط توات ووادي مزاب وتلمسان وغيرها من مراكز التجارة عبر الصحراء ومداخلها الشمالية.",
    ),
  },
];

const CULTURE = {
  eyebrow: L("Shared culture and daily life", "Culture partagée et vie quotidienne", "ثقافة مشتركة وحياة يومية"),
  title: L("Languages, work and music", "Langues, travail et musique", "لغات وعمل وموسيقى"),
  body: [
    L(
      "Most Algerian Jews spoke Arabic, and in many places a Judeo-Arabic usage of it. In some regions there were Berber-language connections, including Judeo-Berber speech. During the colonial period French entered homes and schools and became, for many families in the north, the language of instruction and administration. Hebrew remained the language of prayer and study.",
      "La plupart des Juifs d'Algérie parlaient l'arabe, et dans bien des lieux un usage judéo-arabe de cette langue. Dans certaines régions existaient des attaches berbérophones, y compris des parlers judéo-berbères. À l'époque coloniale, le français entra dans les foyers et les écoles et devint, pour beaucoup de familles du Nord, la langue de l'instruction et de l'administration. L'hébreu resta la langue de la prière et de l'étude.",
      "كان معظم يهود الجزائر يتكلّمون العربية، وفي أماكن كثيرة صيغةً يهودية عربية منها. وفي بعض المناطق كانت ثمّة صلات بالأمازيغية، منها كلامٌ يهودي أمازيغي. وفي العهد الاستعماري دخلت الفرنسية البيوت والمدارس وصارت، لدى كثير من عائلات الشمال، لغة التعليم والإدارة. أمّا العبرية فبقيت لغة الصلاة والدرس.",
    ),
    L(
      "Daily life turned on religious observance, family ritual and the calendar, and on work: crafts such as metalwork and tailoring, commerce large and small, and the community institutions that ran schools, charity and burial. In cities such as Constantine, Jewish and Muslim musicians took part together in the same Arabic musical traditions, including Arabo-Andalusian repertoire and popular urban song.",
      "La vie quotidienne s'organisait autour de la pratique religieuse, du rituel familial et du calendrier, ainsi que du travail : artisanats comme la métallurgie et la couture, commerce grand et petit, et institutions communautaires gérant écoles, entraide et sépultures. Dans des villes comme Constantine, musiciens juifs et musulmans participaient ensemble aux mêmes traditions musicales arabes, répertoire arabo-andalou et chanson urbaine populaire compris.",
      "كانت الحياة اليومية تدور على الشعائر الدينية وطقوس العائلة والتقويم، وعلى العمل: حرفٌ كالمعادن والخياطة، وتجارةٌ كبيرة وصغيرة، ومؤسّسات مجتمعية تدير المدارس والإحسان والدفن. وفي مدنٍ مثل قسنطينة شارك الموسيقيون اليهود والمسلمون معاً في التقاليد الموسيقية العربية نفسها، ومنها المتن الأندلسي والأغنية الحضرية الشعبية.",
    ),
    L(
      "Relations between Jewish and Muslim Algerians were neither uniformly harmonious nor uniformly hostile. They varied by city, by period and by circumstance, and colonial policy would later change them substantially.",
      "Les relations entre Juifs et Musulmans d'Algérie ne furent ni uniformément harmonieuses ni uniformément hostiles. Elles variaient selon les villes, les périodes et les circonstances, et la politique coloniale allait les modifier profondément.",
      "لم تكن العلاقات بين اليهود والمسلمين الجزائريين منسجمة على الدوام ولا معادية على الدوام. بل تفاوتت بحسب المدينة والحقبة والظرف، ثمّ غيّرتها السياسة الاستعمارية تغييراً عميقاً.",
    ),
  ],
};

const CREMIEUX = {
  eyebrow: L("Colonial rule", "La domination coloniale", "الحكم الاستعماري"),
  title: L("1830, and the Crémieux Decree of 1870", "1830, et le décret Crémieux de 1870", "1830 ومرسوم كريميو 1870"),
  body: [
    L(
      "France conquered Algiers in 1830 and extended its rule over the country in the decades that followed. On 24 October 1870, Decree No. 136, known as the Crémieux Decree, granted French citizenship to most indigenous Jews of northern Algeria.",
      "La France conquit Alger en 1830 et étendit sa domination sur le pays dans les décennies suivantes. Le 24 octobre 1870, le décret n° 136, dit décret Crémieux, accorda la citoyenneté française à la plupart des Juifs indigènes du nord de l'Algérie.",
      "غزت فرنسا مدينة الجزائر سنة 1830 ثمّ بسطت حكمها على البلاد في العقود التالية. وفي 24 أكتوبر 1870 منح المرسوم رقم 136، المعروف بمرسوم كريميو، الجنسية الفرنسية لمعظم يهود شمال الجزائر الأصليين.",
    ),
    L(
      "Muslim Algerians, the great majority of the population, remained colonial subjects without equivalent citizenship. Jewish communities in the Saharan territories under military administration, including the M'Zab, were not initially covered in the same way, so a legal line was also drawn inside Algerian Jewry itself.",
      "Les Algériens musulmans, très largement majoritaires, demeurèrent des sujets coloniaux sans citoyenneté équivalente. Les communautés juives des territoires sahariens sous administration militaire, dont le M'Zab, ne furent pas d'emblée concernées de la même manière, si bien qu'une frontière juridique traversa aussi le judaïsme algérien lui-même.",
      "أمّا الجزائريون المسلمون، وهم الأغلبية الساحقة، فبقوا رعايا مستعمَرين بلا جنسية مماثلة. ولم تشمل هذه الوضعية ابتداءً الجماعات اليهودية في الأقاليم الصحراوية الخاضعة للإدارة العسكرية، ومنها وادي مزاب، فرُسم خطٌّ قانوني داخل يهود الجزائر أنفسهم أيضاً.",
    ),
    L(
      "This was a decision of the French state, not a policy designed or controlled by Jewish communities. Its effect was to sort a colonised population into unequal legal categories, and it reshaped identities and relationships for generations.",
      "Ce fut une décision de l'État français, non une politique conçue ou maîtrisée par les communautés juives. Son effet fut de répartir une population colonisée en catégories juridiques inégales, et elle transforma pour des générations les identités et les relations.",
      "كان ذلك قراراً للدولة الفرنسية، لا سياسةً صاغتها الجماعات اليهودية أو تحكّمت فيها. وأثره أنّه فرز سكاناً مستعمَرين إلى فئات قانونية غير متساوية، فأعاد تشكيل الهويات والعلاقات أجيالاً.",
    ),
  ],
  plaqueLabel: L("What the decree did not do", "Ce que le décret n'a pas fait", "ما لم يفعله المرسوم"),
  plaqueBody: L(
    "Citizenship did not remove the colonial order, and it did not protect the communities that received it. Seventy years later the same state withdrew it.",
    "La citoyenneté n'a pas supprimé l'ordre colonial, et elle n'a pas protégé les communautés qui l'ont reçue. Soixante-dix ans plus tard, le même État la retirait.",
    "لم تُلغِ الجنسيةُ النظامَ الاستعماري، ولم تحمِ الجماعات التي نالتها. وبعد سبعين سنة سحبتها الدولة نفسها.",
  ),
};

const VICHY: NumberedItem[] = [
  {
    title: L("Revocation, October 1940", "Abrogation, octobre 1940", "الإلغاء، أكتوبر 1940"),
    body: L(
      "Under Vichy rule the Crémieux Decree was revoked in October 1940. Algerian Jews who had held French citizenship for seventy years lost it.",
      "Sous le régime de Vichy, le décret Crémieux fut abrogé en octobre 1940. Les Juifs d'Algérie qui détenaient la citoyenneté française depuis soixante-dix ans la perdirent.",
      "في ظلّ حكم فيشي أُلغي مرسوم كريميو في أكتوبر 1940، ففقد يهود الجزائر الجنسية الفرنسية التي حملوها سبعين سنة.",
    ),
  },
  {
    title: L("Exclusion from public life", "Exclusion de la vie publique", "الإقصاء من الحياة العامة"),
    body: L(
      "Antisemitic legislation barred Jews from public employment and from many positions in administration and the professions.",
      "La législation antisémite écarta les Juifs de l'emploi public et de nombreux postes dans l'administration et les professions.",
      "أقصت التشريعات المعادية للسامية اليهودَ عن الوظيفة العمومية وعن مناصب كثيرة في الإدارة والمهن.",
    ),
  },
  {
    title: L("Quotas and schooling", "Quotas et scolarité", "الحصص والتعليم"),
    body: L(
      "Quotas limited entry to professions such as law and medicine, and restrictions were imposed on Jewish pupils and students in schools and universities.",
      "Des quotas limitèrent l'accès à des professions comme le droit et la médecine, et des restrictions frappèrent les élèves et étudiants juifs dans les écoles et les universités.",
      "حدّت الحصص من الولوج إلى مهنٍ كالمحاماة والطبّ، وفُرضت قيود على التلاميذ والطلبة اليهود في المدارس والجامعات.",
    ),
  },
  {
    title: L("Property measures", "Mesures sur les biens", "إجراءات على الأملاك"),
    body: L(
      "Jewish-owned property and businesses were placed under state-directed administration and subject to confiscation measures.",
      "Les biens et entreprises appartenant à des Juifs furent placés sous administration dirigée par l'État et soumis à des mesures de confiscation.",
      "وُضعت الأملاك والمؤسّسات المملوكة ليهود تحت إدارة توجّهها الدولة، وخضعت لإجراءات مصادرة.",
    ),
  },
];

const VICHY_INTRO = {
  eyebrow: L("Antisemitism and Vichy rule", "Antisémitisme et régime de Vichy", "معاداة السامية وحكم فيشي"),
  title: L("A settler politics, then a state policy", "Une politique de colons, puis une politique d'État", "سياسة معمّرين ثمّ سياسة دولة"),
  intro: L(
    "Antisemitism among European settlers became a significant political force in colonial Algeria well before the Second World War, in municipal politics, in the press and in street violence. Under Vichy it became law. The measures below applied in Algeria.",
    "L'antisémitisme des colons européens devint une force politique importante en Algérie coloniale bien avant la Seconde Guerre mondiale : dans la politique municipale, dans la presse et dans la violence de rue. Sous Vichy, il devint la loi. Les mesures ci-dessous s'appliquèrent en Algérie.",
    "صارت معاداة السامية لدى المعمّرين الأوروبيين قوّة سياسية وازنة في الجزائر المستعمَرة قبل الحرب العالمية الثانية بزمن، في السياسة البلدية والصحافة وعنف الشارع. وفي عهد فيشي صارت قانوناً. والإجراءات أدناه طُبّقت في الجزائر.",
  ),
};

const DEPARTURE = {
  eyebrow: L("Independence and after", "L'indépendance et après", "الاستقلال وما بعده"),
  title: L("Departure, and what remains", "Le départ, et ce qui demeure", "الرحيل وما بقي"),
  body: [
    L(
      "The War of Independence and the end of French rule brought uncertainty, violence and competing political loyalties. Around the time of independence most Algerian Jews left, primarily for France, where citizenship had positioned many of them, while others went to Israel and to other countries.",
      "La guerre d'indépendance et la fin de la domination française apportèrent incertitude, violence et loyautés politiques concurrentes. Au moment de l'indépendance, la plupart des Juifs d'Algérie partirent, principalement vers la France, où la citoyenneté en avait placé beaucoup, tandis que d'autres gagnèrent Israël et d'autres pays.",
      "جلبت حرب الاستقلال ونهاية الحكم الفرنسي حالةً من عدم اليقين والعنف وولاءاتٍ سياسية متنازعة. وحول زمن الاستقلال غادر معظم يهود الجزائر، إلى فرنسا أساساً حيث وضعتهم الجنسية، فيما توجّه آخرون إلى إسرائيل وإلى بلدان أخرى.",
    ),
    L(
      "These departures were not identical. Some families left in fear, some in stages, some because their working lives and citizenship were already tied to France, some reluctantly and late. This exhibit does not describe them all with a single word.",
      "Ces départs ne furent pas identiques. Certaines familles partirent par peur, d'autres par étapes, d'autres parce que leur vie professionnelle et leur citoyenneté étaient déjà liées à la France, d'autres à contrecœur et tardivement. L'exposition ne les résume pas d'un seul mot.",
      "لم تكن تلك المغادرات متطابقة. فبعض العائلات رحلت خوفاً، وبعضها على مراحل، وبعضها لأنّ عملها وجنسيتها كانا مرتبطين بفرنسا أصلاً، وبعضها على مضضٍ ومتأخّراً. ولا يختزلها هذا المعرض في كلمةٍ واحدة.",
    ),
  ],
};

const REMAINS = [
  {
    label: L("Music", "Musique", "الموسيقى"),
    fact: L(
      "Arabo-Andalusian and popular urban repertoire carried on by musicians and recordings on both shores.",
      "Le répertoire arabo-andalou et urbain populaire, porté par des musiciens et des enregistrements sur les deux rives.",
      "المتن الأندلسي والأغنية الحضرية الشعبية، يحملهما الموسيقيون والتسجيلات على الضفّتين.",
    ),
  },
  {
    label: L("Food", "Cuisine", "المطبخ"),
    fact: L(
      "Dishes and holiday cooking that stayed recognisably Algerian in kitchens far from Algeria.",
      "Des plats et une cuisine de fête restés reconnaissablement algériens dans des cuisines éloignées de l'Algérie.",
      "أطباق وطبخ أعياد ظلّت جزائرية الملامح في مطابخ بعيدة عن الجزائر.",
    ),
  },
  {
    label: L("Family memory", "Mémoire familiale", "ذاكرة العائلة"),
    fact: L(
      "Names of streets and neighbourhoods, spoken phrases and household habits transmitted at home.",
      "Des noms de rues et de quartiers, des expressions et des habitudes domestiques transmis à la maison.",
      "أسماء شوارع وأحياء وعباراتٌ محكيّة وعاداتٌ بيتية تُنقل في البيت.",
    ),
  },
  {
    label: L("Synagogues and cemeteries", "Synagogues et cimetières", "المعابد والمقابر"),
    fact: L(
      "Buildings and burial grounds still standing in Algerian cities, in varying states of care.",
      "Des édifices et des lieux de sépulture encore debout dans les villes algériennes, plus ou moins entretenus.",
      "مبانٍ ومدافن ما تزال قائمة في المدن الجزائرية، بدرجات متفاوتة من العناية.",
    ),
  },
  {
    label: L("Language", "Langue", "اللغة"),
    fact: L(
      "Judeo-Arabic usage, Hebrew liturgy and Algerian Arabic vocabulary preserved within families.",
      "L'usage judéo-arabe, la liturgie hébraïque et le vocabulaire arabe algérien conservés dans les familles.",
      "الاستعمال اليهودي العربي والطقوس العبرية ومفرداتٌ من العربية الجزائرية محفوظة داخل العائلات.",
    ),
  },
  {
    label: L("Photographs and archives", "Photographies et archives", "الصور والأرشيف"),
    fact: L(
      "Community papers, images and records held today in museums and public archives.",
      "Des papiers communautaires, des images et des registres conservés aujourd'hui dans des musées et des archives publiques.",
      "أوراق مجتمعية وصور وسجلات محفوظة اليوم في متاحف وأرشيفات عمومية.",
    ),
  },
];

const WHY = {
  eyebrow: L("Why this history belongs here", "Pourquoi cette histoire est ici", "لماذا ينتمي هذا التاريخ إلى هنا"),
  title: L("A curator's statement", "Déclaration du conservateur", "كلمة القيّم"),
  quote: L(
    "The history of Algeria cannot be told completely without the Jewish communities that lived, prayed, worked, created music and built lives across the country. Remembering them does not simplify the past. It restores part of its complexity.",
    "L'histoire de l'Algérie ne peut être racontée complètement sans les communautés juives qui ont vécu, prié, travaillé, fait de la musique et bâti des vies à travers le pays. Se souvenir d'elles ne simplifie pas le passé. Cela lui rend une part de sa complexité.",
    "لا يمكن أن يُروى تاريخ الجزائر كاملاً من دون الجماعات اليهودية التي عاشت وصلّت وعملت وصنعت الموسيقى وبنت حيوات في أنحاء البلاد. وتذكّرها لا يبسّط الماضي، بل يعيد إليه جزءاً من تعقيده.",
  ),
  attribution: L("Curator's note, DZ Odyssey", "Note du conservateur, DZ Odyssey", "ملاحظة القيّم، دي زد أوديسي"),
};

const RELATED: RelatedExhibit[] = [
  {
    to: "/region/$regionId",
    params: { regionId: "algiers" },
    label: L("Algiers", "Alger", "الجزائر العاصمة"),
    body: L(
      "The capital, its port and its old city.",
      "La capitale, son port et sa vieille ville.",
      "العاصمة ومينائها ومدينتها القديمة.",
    ),
  },
  {
    to: "/region/$regionId",
    params: { regionId: "constantine" },
    label: L("Constantine", "Constantine", "قسنطينة"),
    body: L(
      "The eastern city of bridges, scholarship and song.",
      "La ville de l'Est, ses ponts, son savoir et son chant.",
      "مدينة الشرق، جسورها وعلمها وغناؤها.",
    ),
  },
  {
    to: "/region/$regionId",
    params: { regionId: "oran-west" },
    label: L("Oran and the West", "Oran et l'Ouest", "وهران والغرب"),
    body: L(
      "The western coast and its Mediterranean traffic.",
      "La côte ouest et son trafic méditerranéen.",
      "الساحل الغربي وحركته المتوسطية.",
    ),
  },
  {
    to: "/mzab",
    label: L("The M'Zab Valley", "La vallée du M'Zab", "وادي مزاب"),
    body: L(
      "The Saharan valley and its five ksour.",
      "La vallée saharienne et ses cinq ksour.",
      "الوادي الصحراوي وقصوره الخمسة.",
    ),
  },
  {
    to: "/era/$eraId",
    params: { eraId: "french" },
    label: L("French Colonial Algeria", "L'Algérie coloniale française", "الجزائر المستعمرة الفرنسية"),
    body: L(
      "1830 to 1962, the legal and political frame of this story.",
      "1830 à 1962, le cadre juridique et politique de ce récit.",
      "من 1830 إلى 1962، الإطار القانوني والسياسي لهذه الحكاية.",
    ),
  },
  {
    to: "/era/$eraId",
    params: { eraId: "independence" },
    label: L("The War of Independence", "La guerre d'indépendance", "حرب الاستقلال"),
    body: L(
      "The years that ended French rule.",
      "Les années qui mirent fin à la domination française.",
      "السنوات التي أنهت الحكم الفرنسي.",
    ),
  },
  {
    to: "/culture/$topicId",
    params: { topicId: "music" },
    label: L("Algerian music", "La musique algérienne", "الموسيقى الجزائرية"),
    body: L(
      "Arabo-Andalusian traditions and urban song.",
      "Les traditions arabo-andalouses et la chanson urbaine.",
      "التقاليد الأندلسية والأغنية الحضرية.",
    ),
  },
];

/* ------------------------------------------------------------------ */
/*  page                                                               */
/* ------------------------------------------------------------------ */

function JewsOfAlgeriaExhibit() {
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
          ctaHref="#orientation"
          ctaLabel={HERO.cta}
          backTo="/"
          backLabel={HERO.back}
          background="radial-gradient(ellipse at 50% 20%, oklch(0.92 0.04 250 / 0.35), transparent 65%), var(--gradient-parchment)"
        />

        <Section id="orientation" tone="ivory">
          <EyebrowTitle eyebrow={OPENING.eyebrow} title={OPENING.title} />
          <div className="grid gap-8 md:grid-cols-[1.35fr_1fr] items-start">
            <Prose>
              {OPENING.body.map((p, i) => (
                <p key={i}>{tr(p, lang)}</p>
              ))}
            </Prose>
            <Plaque>
              <div className="text-[10px] uppercase tracking-[0.28em] text-primary mb-2">
                {tr(OPENING.plaqueLabel, lang)}
              </div>
              <p className="text-sm sm:text-base leading-[1.7] text-foreground/80">
                {tr(OPENING.plaqueBody, lang)}
              </p>
            </Plaque>
          </div>
        </Section>

        <Section id="communities" tone="parchment">
          <EyebrowTitle
            eyebrow={L("Communities across Algeria", "Les communautés d'Algérie", "جماعات عبر الجزائر")}
            title={L("Six places, six histories", "Six lieux, six histoires", "ستّة أماكن وستّ حكايات")}
          />
          <p className="max-w-3xl text-foreground/80 text-base sm:text-lg leading-[1.75] mb-10">
            {tr(
              L(
                "Algerian Jewish communities differed by region, language, occupation, legal status and cultural history. The places below are an orientation, not a complete map.",
                "Les communautés juives d'Algérie différaient par la région, la langue, le métier, le statut juridique et l'histoire culturelle. Les lieux ci-dessous donnent un repère, non une carte complète.",
                "اختلفت الجماعات اليهودية الجزائرية بحسب المنطقة واللغة والمهنة والوضع القانوني والتاريخ الثقافي. والأماكن أدناه دليلٌ للتوجيه لا خريطة كاملة.",
              ),
              lang,
            )}
          </p>
          <NumberedGrid items={PLACES} columns={3} />
        </Section>

        <Section id="culture" tone="ivory">
          <EyebrowTitle eyebrow={CULTURE.eyebrow} title={CULTURE.title} />
          <Prose>
            {CULTURE.body.map((p, i) => (
              <p key={i}>{tr(p, lang)}</p>
            ))}
          </Prose>
        </Section>

        <Section id="cremieux" tone="parchment">
          <EyebrowTitle eyebrow={CREMIEUX.eyebrow} title={CREMIEUX.title} />
          <div className="grid gap-8 md:grid-cols-[1.35fr_1fr] items-start">
            <Prose>
              {CREMIEUX.body.map((p, i) => (
                <p key={i}>{tr(p, lang)}</p>
              ))}
            </Prose>
            <Plaque>
              <div className="text-[10px] uppercase tracking-[0.28em] text-primary mb-2">
                {tr(CREMIEUX.plaqueLabel, lang)}
              </div>
              <p className="text-sm sm:text-base leading-[1.7] text-foreground/80">
                {tr(CREMIEUX.plaqueBody, lang)}
              </p>
            </Plaque>
          </div>
        </Section>

        <Section id="vichy" tone="sand">
          <EyebrowTitle eyebrow={VICHY_INTRO.eyebrow} title={VICHY_INTRO.title} />
          <p className="max-w-3xl text-foreground/80 text-base sm:text-lg leading-[1.75] mb-10">
            {tr(VICHY_INTRO.intro, lang)}
          </p>
          <NumberedGrid items={VICHY} columns={2} />
        </Section>

        <Section id="departure" tone="ivory">
          <EyebrowTitle eyebrow={DEPARTURE.eyebrow} title={DEPARTURE.title} />
          <Prose>
            {DEPARTURE.body.map((p, i) => (
              <p key={i}>{tr(p, lang)}</p>
            ))}
          </Prose>
        </Section>

        <Section id="remains" tone="parchment">
          <EyebrowTitle
            eyebrow={L("What remains", "Ce qui demeure", "ما بقي")}
            title={L("Traces still carried", "Des traces encore portées", "آثارٌ ما تزال محمولة")}
          />
          <p className="max-w-3xl text-foreground/80 text-base sm:text-lg leading-[1.75] mb-10">
            {tr(
              L(
                "What remains is partly in Algeria and partly with the families who left, and the attachment to the country did not end with the departure.",
                "Ce qui demeure se trouve en partie en Algérie et en partie chez les familles parties, et l'attachement au pays n'a pas cessé avec le départ.",
                "ما بقي موجود جزئياً في الجزائر وجزئياً لدى العائلات التي رحلت، ولم ينقطع التعلّق بالبلد بالرحيل.",
              ),
              lang,
            )}
          </p>
          <DiscoveryCards items={REMAINS} label={L("Trace", "Trace", "أثر")} />
        </Section>

        <Section id="why" tone="ivory">
          <EyebrowTitle eyebrow={WHY.eyebrow} title={WHY.title} />
          <PullQuote quote={WHY.quote} attribution={WHY.attribution} />
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
          <ExhibitProvenance exhibitId="jews-of-algeria" />
        </section>

        <footer className="border-t border-border/60 bg-card/40">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 py-8 flex flex-wrap items-center justify-between gap-4">
            <p className="text-xs text-muted-foreground italic">
              {tr(
                L(
                  "The Jews of Algeria · an exhibit of DZ Odyssey.",
                  "Les Juifs d'Algérie · exposition de DZ Odyssey.",
                  "يهود الجزائر · معرض في دي زد أوديسي.",
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

export default JewsOfAlgeriaExhibit;

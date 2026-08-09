import type { LocalizedString } from "@/lib/i18n";

const L = (en: string, fr: string, ar: string): LocalizedString => ({ en, fr, ar });

export type WoiQuizQuestion = {
  id: string;
  question: LocalizedString;
  options: LocalizedString[];
  answerIndex: number;
  explanation: LocalizedString;
};

/** Short quiz on women's roles during the War of Independence (1954 – 1962). */
export const WOI_QUIZ: WoiQuizQuestion[] = [
  {
    id: "moussebilate",
    question: L(
      "What did the moussebilate mainly do?",
      "Quel était le rôle principal des moussebilate ?",
      "ما الدور الأساسي للمسبّلات؟",
    ),
    options: [
      L(
        "Civilian support work: shelter, food, laundry, messages and hiding fighters",
        "Un soutien civil : abri, nourriture, linge, messages et dissimulation des combattants",
        "دعم مدني: الإيواء والطعام والغسيل ونقل الرسائل وإخفاء المجاهدين",
      ),
      L(
        "Commanding regular army units in the field",
        "Commander des unités régulières sur le terrain",
        "قيادة وحدات نظامية في الميدان",
      ),
      L(
        "Negotiating the Evian Accords",
        "Négocier les accords d'Évian",
        "التفاوض على اتفاقيات إيفيان",
      ),
    ],
    answerIndex: 0,
    explanation: L(
      "The moussebilate formed the largest group of women in the struggle. Their support work in villages and neighbourhoods kept the network alive.",
      "Les moussebilate formaient le groupe de femmes le plus nombreux. Leur travail de soutien dans les villages et les quartiers maintenait le réseau en vie.",
      "شكّلت المسبّلات أكبر مجموعة نسائية في النضال، وحافظ عملهن الداعم في القرى والأحياء على استمرار الشبكة.",
    ),
  },
  {
    id: "maquisardes",
    question: L(
      "Where did the maquisardes serve?",
      "Où servaient les maquisardes ?",
      "أين خدمت المجاهدات في الجبل؟",
    ),
    options: [
      L("In the rural maquis, with the fighting units", "Dans le maquis rural, avec les unités combattantes", "في المقاومة الريفية مع الوحدات المقاتلة"),
      L("Only in French administrative offices", "Uniquement dans les bureaux administratifs français", "في المكاتب الإدارية الفرنسية فقط"),
      L("Only abroad, in diplomatic missions", "Uniquement à l'étranger, en mission diplomatique", "في الخارج فقط ضمن بعثات دبلوماسية"),
    ],
    answerIndex: 0,
    explanation: L(
      "Maquisardes lived with the units in the countryside, often as nurses, cooks, couriers and, in some cases, combatants.",
      "Les maquisardes vivaient avec les unités dans les campagnes, souvent comme infirmières, cuisinières, agents de liaison et parfois combattantes.",
      "عاشت المجاهدات مع الوحدات في الأرياف، غالباً كممرضات وطباخات وحاملات رسائل، وأحياناً مقاتلات.",
    ),
  },
  {
    id: "fidayate",
    question: L(
      "The fidayate are best known for actions in which setting?",
      "Les fidayate sont surtout connues pour des actions dans quel cadre ?",
      "بمَ اشتهرت الفدائيات أساساً؟",
    ),
    options: [
      L("Urban operations, above all in Algiers", "Des opérations urbaines, surtout à Alger", "عمليات حضرية، خاصة في الجزائر العاصمة"),
      L("Desert caravans in the deep Sahara", "Des caravanes au cœur du Sahara", "قوافل في عمق الصحراء"),
      L("Naval raids along the coast", "Des raids navals le long de la côte", "غارات بحرية على الساحل"),
    ],
    answerIndex: 0,
    explanation: L(
      "Fidayate carried out urban missions, most famously during the Battle of Algiers, moving weapons and messages through checkpoints.",
      "Les fidayate menaient des missions urbaines, notamment pendant la bataille d'Alger, transportant armes et messages à travers les barrages.",
      "نفّذت الفدائيات مهمات حضرية، أشهرها في معركة الجزائر، حيث نقلن السلاح والرسائل عبر الحواجز.",
    ),
  },
  {
    id: "share",
    question: L(
      "According to Djamila Amrane-Minne's research, roughly what share of registered women participants were rural?",
      "Selon les travaux de Djamila Amrane-Minne, quelle part des participantes recensées était rurale ?",
      "حسب أبحاث جميلة أمران مين، ما نسبة المشاركات المسجّلات من الريف تقريباً؟",
    ),
    options: [
      L("A large majority", "Une large majorité", "الأغلبية الساحقة"),
      L("Around a quarter", "Environ un quart", "نحو الربع"),
      L("Almost none", "Presque aucune", "لا أحد تقريباً"),
    ],
    answerIndex: 0,
    explanation: L(
      "Her registers show that the overwhelming majority of recorded women participants came from rural areas, not the cities.",
      "Ses registres montrent que la très grande majorité des participantes recensées venaient des zones rurales, et non des villes.",
      "تُظهر سجلاتها أن الغالبية العظمى من المشاركات المسجّلات جئن من المناطق الريفية لا من المدن.",
    ),
  },
  {
    id: "records",
    question: L(
      "Why do the official figures understate women's participation?",
      "Pourquoi les chiffres officiels sous-estiment-ils la participation des femmes ?",
      "لماذا تقلّل الأرقام الرسمية من مشاركة النساء؟",
    ),
    options: [
      L(
        "Much support work was informal and never registered",
        "Une grande part du travail de soutien était informelle et jamais enregistrée",
        "كان جزء كبير من العمل الداعم غير رسمي ولم يُسجَّل",
      ),
      L("Records were only kept after 1970", "Les registres n'ont été tenus qu'après 1970", "لم تُحفظ السجلات إلا بعد 1970"),
      L("Women were counted twice", "Les femmes étaient comptées deux fois", "أُحصيت النساء مرتين"),
    ],
    answerIndex: 0,
    explanation: L(
      "Registers recorded formal status. Daily support work in homes and villages left few traces, so the counts are a floor, not a total.",
      "Les registres consignaient un statut formel. Le soutien quotidien dans les foyers et les villages laissait peu de traces : les chiffres sont un plancher, pas un total.",
      "سجّلت القوائم الصفة الرسمية فقط، أما الدعم اليومي في البيوت والقرى فلم يترك أثراً يُذكر، لذا فالأرقام حدّ أدنى لا مجموع.",
    ),
  },
  {
    id: "after",
    question: L(
      "What happened to many women veterans after independence in 1962?",
      "Qu'est-il arrivé à de nombreuses combattantes après l'indépendance de 1962 ?",
      "ماذا حدث لكثير من المجاهدات بعد استقلال 1962؟",
    ),
    options: [
      L(
        "Their wartime roles were largely pushed out of public memory",
        "Leurs rôles de guerre ont été largement effacés de la mémoire publique",
        "غُيّبت أدوارهن الحربية إلى حدّ كبير عن الذاكرة العامة",
      ),
      L("They all entered government", "Elles sont toutes entrées au gouvernement", "دخلن جميعاً إلى الحكومة"),
      L("They were sent abroad by decree", "Elles ont été envoyées à l'étranger par décret", "أُرسلن إلى الخارج بمرسوم"),
    ],
    answerIndex: 0,
    explanation: L(
      "Recognition was uneven. Many returned to domestic life, and their contribution was recovered later through testimony and research.",
      "La reconnaissance fut inégale. Beaucoup sont revenues à la vie domestique, et leur apport a été retrouvé plus tard par le témoignage et la recherche.",
      "كان الاعتراف متفاوتاً؛ عادت كثيرات إلى الحياة المنزلية، واستُعيد إسهامهن لاحقاً عبر الشهادات والبحث.",
    ),
  },
];

import type { Localized, LocalizedString } from "@/lib/i18n";
import type { Difficulty } from "@/data/eras";
import { figures } from "@/data/figures";

const L = (en: string, fr: string, ar: string): Localized<string> => ({ en, fr, ar });

export type FigureQuizQuestion = {
  id: string;
  /** Difficulty of the clues (easy / medium / hard). */
  difficulty: Difficulty;
  /** 2–4 short clues, each trilingual. */
  clues: LocalizedString[];
  /** Multiple-choice options (full names — answer must match one of them). */
  options: LocalizedString[];
  /** Index into options for the correct answer. */
  answerIndex: number;
  /** Canonical English name of the correct figure (used for review/badges). */
  answerName: string;
  /** Short explanation. */
  explanation: LocalizedString;
};

// Helper: build options from a list of names, ensuring the correct one is included.
const opt = (name: string): LocalizedString => {
  const f = figures.find((x) => x.name === name);
  return f ? f.displayName : name;
};

const make = (
  id: string,
  difficulty: Difficulty,
  clues: LocalizedString[],
  answerName: string,
  distractors: string[],
  explanation: LocalizedString,
): FigureQuizQuestion => {
  const all = [answerName, ...distractors];
  // Shuffle is done at runtime by the quiz picker; we keep a stable order here
  // and store answerIndex against the static options array.
  const options = all.map(opt);
  return {
    id,
    difficulty,
    clues,
    options,
    answerIndex: 0,
    answerName,
    explanation,
  };
};

export const figureQuiz: FigureQuizQuestion[] = [
  // ---------- Massinissa ----------
  make(
    "massinissa-1",
    "easy",
    [
      L("I am a king of ancient Numidia.", "Je suis un roi de la Numidie antique.", "أنا ملك من نوميديا القديمة."),
      L("I unified rival Berber tribes.", "J'ai unifié des tribus berbères rivales.", "وحّدتُ القبائل الأمازيغية المتنافسة."),
      L("I allied with Rome against Carthage.", "Je me suis allié à Rome contre Carthage.", "تحالفتُ مع روما ضد قرطاج."),
    ],
    "Massinissa",
    ["Jugurtha", "Dihya", "Emir Abdelkader"],
    L(
      "Massinissa is remembered as the founding king of a unified Numidia.",
      "Massinissa est considéré comme le roi fondateur d'une Numidie unifiée.",
      "يُعدّ ماسينيسا الملك المؤسس لنوميديا الموحّدة.",
    ),
  ),
  make(
    "massinissa-2",
    "medium",
    [
      L("I lived to a very old age, riding at the head of my cavalry.", "J'ai vécu très vieux, chevauchant en tête de ma cavalerie.", "عشتُ طويلًا وكنتُ أقود فرساني بنفسي."),
      L("My grandson would later defy Rome.", "Mon petit-fils défiera plus tard Rome.", "حفيدي سيتحدّى روما لاحقًا."),
    ],
    "Massinissa",
    ["Jugurtha", "Ahmed Bey", "Ferhat Abbas"],
    L(
      "Massinissa was the grandfather of Jugurtha and famously active in old age.",
      "Massinissa était le grand-père de Jugurtha et resta actif jusqu'à un âge avancé.",
      "كان ماسينيسا جدّ يوغرطة، وظلّ نشطًا حتى شيخوخته.",
    ),
  ),

  // ---------- Jugurtha ----------
  make(
    "jugurtha-1",
    "easy",
    [
      L("I was a Numidian king.", "J'étais un roi numide.", "كنتُ ملكًا نوميديًا."),
      L("I fought a long war against Rome.", "J'ai mené une longue guerre contre Rome.", "خضتُ حربًا طويلة ضد روما."),
      L("I am a famous symbol of resistance.", "Je suis un célèbre symbole de résistance.", "أنا رمز شهير للمقاومة."),
    ],
    "Jugurtha",
    ["Massinissa", "Ahmed Bey", "Cheikh El Mokrani"],
    L(
      "Jugurtha resisted Roman expansion and became a symbol of defiance.",
      "Jugurtha résista à l'expansion romaine et devint un symbole de défi.",
      "قاوم يوغرطة التوسّع الروماني وصار رمزًا للتحدّي.",
    ),
  ),
  make(
    "jugurtha-2",
    "hard",
    [
      L("Brought to Rome in chains, I cried that the city itself was for sale.", "Conduit enchaîné dans Rome, je m'écriai que la ville était à vendre.", "حين سيقتُ مكبّلًا في روما، صحتُ أنها مدينة تُباع."),
      L("I was the grandson of a famous Numidian king.", "J'étais le petit-fils d'un célèbre roi numide.", "كنتُ حفيد ملك نوميدي شهير."),
    ],
    "Jugurtha",
    ["Massinissa", "Emir Abdelkader", "Larbi Ben M'hidi"],
    L(
      "The cry \"Rome is for sale\" is famously attributed to Jugurtha.",
      "La phrase « Rome est à vendre » est célèbre et attribuée à Jugurtha.",
      "تُنسب عبارة «روما للبيع» إلى يوغرطة.",
    ),
  ),

  // ---------- Dihya ----------
  make(
    "dihya-1",
    "easy",
    [
      L("I was an Amazigh warrior-queen.", "J'étais une reine guerrière amazighe.", "كنتُ ملكة محاربة أمازيغية."),
      L("I led resistance from the Aurès mountains.", "J'ai mené la résistance depuis les montagnes de l'Aurès.", "قُدتُ المقاومة من جبال الأوراس."),
      L("I am also called \"the soothsayer\".", "On m'appelle aussi « la devineresse ».", "يلقّبونني أيضًا بـ«الكاهنة»."),
    ],
    "Dihya",
    ["Lalla Fatma N'Soumer", "Assia Djebar", "Massinissa"],
    L(
      "Dihya, also called al-Kahina, led Amazigh resistance from the Aurès in the 7th century.",
      "Dihya, aussi appelée al-Kahina, mena la résistance amazighe depuis l'Aurès au VIIe siècle.",
      "ديهيا، الملقّبة بالكاهنة، قادت المقاومة الأمازيغية من الأوراس في القرن السابع الميلادي.",
    ),
  ),
  make(
    "dihya-2",
    "medium",
    [
      L("I resisted the early Arab expansion in North Africa.", "J'ai résisté à la première expansion arabe en Afrique du Nord.", "قاومتُ التوسّع العربي المبكر في شمال إفريقيا."),
      L("My memory is closely linked to the eastern mountains of Algeria.", "Ma mémoire est étroitement liée aux montagnes de l'est de l'Algérie.", "ترتبط ذاكرتي بجبال شرق الجزائر."),
    ],
    "Dihya",
    ["Lalla Fatma N'Soumer", "Cheikh El Mokrani", "Mouloud Feraoun"],
    L(
      "Dihya is associated with the Aurès region and Amazigh resistance to Arab armies.",
      "Dihya est associée à la région de l'Aurès et à la résistance amazighe aux armées arabes.",
      "ترتبط ديهيا بمنطقة الأوراس وبالمقاومة الأمازيغية للجيوش العربية.",
    ),
  ),

  // ---------- Emir Abdelkader ----------
  make(
    "abdelkader-1",
    "easy",
    [
      L("I led Algerian resistance in the 19th century.", "J'ai dirigé la résistance algérienne au XIXe siècle.", "قُدتُ المقاومة الجزائرية في القرن التاسع عشر."),
      L("I came from a respected religious family near Mascara.", "Je venais d'une famille religieuse respectée près de Mascara.", "أنحدر من أسرة دينية محترمة قرب معسكر."),
      L("I built a state to fight the French invasion.", "J'ai bâti un État pour combattre l'invasion française.", "أسّستُ دولة لمواجهة الغزو الفرنسي."),
    ],
    "Emir Abdelkader",
    ["Ahmed Bey", "Cheikh El Mokrani", "Krim Belkacem"],
    L(
      "Emir Abdelkader is the founder of the early Algerian resistance state against French conquest.",
      "L'Émir Abdelkader est le fondateur du premier État algérien de résistance face à la conquête française.",
      "الأمير عبد القادر هو مؤسس الدولة الجزائرية الأولى التي قاومت الغزو الفرنسي.",
    ),
  ),
  make(
    "abdelkader-2",
    "hard",
    [
      L("Years after surrender, in exile in Damascus, I saved thousands of civilians during sectarian violence.", "Des années après ma reddition, en exil à Damas, j'ai sauvé des milliers de civils lors de violences communautaires.", "بعد سنوات من استسلامي، في منفاي بدمشق، أنقذتُ آلاف المدنيين خلال أحداث طائفية."),
      L("I was both a religious leader and a military strategist.", "J'étais à la fois chef religieux et stratège militaire.", "كنتُ قائدًا دينيًا واستراتيجيًا عسكريًا في آن."),
    ],
    "Emir Abdelkader",
    ["Ahmed Bey", "Ibn Khaldun", "Ferhat Abbas"],
    L(
      "Abdelkader's rescue of Christians in Damascus is one of his most celebrated humanitarian acts.",
      "Le sauvetage des chrétiens à Damas est l'un des actes humanitaires les plus célèbres d'Abdelkader.",
      "إنقاذ الأمير عبد القادر للمسيحيين في دمشق من أبرز مواقفه الإنسانية.",
    ),
  ),

  // ---------- Ahmed Bey ----------
  make(
    "ahmed-bey-1",
    "easy",
    [
      L("I was the last Ottoman bey of Constantine.", "J'étais le dernier bey ottoman de Constantine.", "كنتُ آخر بايات قسنطينة العثمانيين."),
      L("I resisted the French in eastern Algeria.", "J'ai résisté aux Français dans l'est de l'Algérie.", "قاومتُ الفرنسيين في شرق الجزائر."),
    ],
    "Ahmed Bey",
    ["Emir Abdelkader", "Cheikh El Mokrani", "Colonel Amirouche"],
    L(
      "Ahmed Bey turned Constantine into a stronghold against the French in the 1830s.",
      "Ahmed Bey fit de Constantine un bastion face aux Français dans les années 1830.",
      "حوّل أحمد باي قسنطينة إلى معقل في وجه الفرنسيين خلال ثلاثينيات القرن التاسع عشر.",
    ),
  ),
  make(
    "ahmed-bey-2",
    "medium",
    [
      L("I repelled a first French assault in 1836.", "J'ai repoussé un premier assaut français en 1836.", "صددتُ هجومًا فرنسيًا أوّل سنة 1836."),
      L("I am closely tied to a city famous for its bridges and cliffs.", "Je suis étroitement lié à une ville célèbre pour ses ponts et ses falaises.", "أرتبط بمدينة شهيرة بجسورها وصخورها."),
    ],
    "Ahmed Bey",
    ["Emir Abdelkader", "Lalla Fatma N'Soumer", "Abane Ramdane"],
    L(
      "Ahmed Bey is associated with Constantine, known for its dramatic bridges and gorges.",
      "Ahmed Bey est associé à Constantine, célèbre pour ses ponts et ses gorges spectaculaires.",
      "يرتبط أحمد باي بقسنطينة المشهورة بجسورها ومضائقها.",
    ),
  ),

  // ---------- Lalla Fatma N'Soumer ----------
  make(
    "fatma-1",
    "easy",
    [
      L("I am a famous Algerian woman of resistance.", "Je suis une célèbre femme de la résistance algérienne.", "أنا امرأة شهيرة من المقاومة الجزائرية."),
      L("I led fighters in Kabylie against the French.", "J'ai conduit des combattants en Kabylie contre les Français.", "قُدتُ مقاتلين في القبائل ضد الفرنسيين."),
    ],
    "Lalla Fatma N'Soumer",
    ["Dihya", "Assia Djebar", "Ferhat Abbas"],
    L(
      "Lalla Fatma N'Soumer led 19th-century Kabyle resistance against the French.",
      "Lalla Fatma N'Soumer dirigea la résistance kabyle contre les Français au XIXe siècle.",
      "قادت لالة فاطمة نسومر المقاومة القبائلية ضد الفرنسيين في القرن التاسع عشر.",
    ),
  ),
  make(
    "fatma-2",
    "hard",
    [
      L("I was barely twenty when villages began to look to me for guidance.", "J'avais à peine vingt ans lorsque les villages commencèrent à se tourner vers moi.", "لم أتجاوز العشرين حين بدأت القرى تتطلّع إلى قيادتي."),
      L("I am celebrated as a national heroine of 19th-century Algeria.", "Je suis célébrée comme héroïne nationale de l'Algérie du XIXe siècle.", "تُحتفى بي بطلة وطنية في الجزائر خلال القرن التاسع عشر."),
    ],
    "Lalla Fatma N'Soumer",
    ["Dihya", "Idir", "Krim Belkacem"],
    L(
      "Lalla Fatma N'Soumer became a leading figure in Kabylie at a remarkably young age.",
      "Lalla Fatma N'Soumer devint très jeune une figure majeure en Kabylie.",
      "برزت لالة فاطمة نسومر قائدةً في القبائل وهي ما تزال شابة جدًا.",
    ),
  ),

  // ---------- El Mokrani ----------
  make(
    "mokrani-1",
    "easy",
    [
      L("I led one of the largest 19th-century revolts against French rule.", "J'ai mené l'une des plus grandes révoltes du XIXe siècle contre la France.", "قُدتُ واحدة من أكبر ثورات القرن التاسع عشر ضد فرنسا."),
      L("My uprising broke out in 1871.", "Mon insurrection éclata en 1871.", "اندلعت ثورتي سنة 1871."),
    ],
    "Cheikh El Mokrani",
    ["Emir Abdelkader", "Ahmed Bey", "Larbi Ben M'hidi"],
    L(
      "Cheikh El Mokrani led the great 1871 revolt against French colonial rule.",
      "Cheikh El Mokrani dirigea la grande révolte de 1871 contre la domination coloniale française.",
      "قاد الشيخ المقراني الثورة الكبرى عام 1871 ضد الاحتلال الفرنسي.",
    ),
  ),
  make(
    "mokrani-2",
    "medium",
    [
      L("I was joined by Cheikh Aheddad and the Rahmaniya brotherhood.", "Le cheikh Aheddad et la confrérie Rahmaniya me rejoignirent.", "انضمّ إليّ الشيخ الحداد والطريقة الرحمانية."),
      L("My family was a noble line from the Medjana region.", "Ma famille était une lignée noble de la région de la Medjana.", "كانت أسرتي من نبلاء منطقة المجانة."),
    ],
    "Cheikh El Mokrani",
    ["Emir Abdelkader", "Mouloud Feraoun", "Colonel Amirouche"],
    L(
      "El Mokrani's revolt was joined by the Rahmaniya brotherhood under Cheikh Aheddad.",
      "La révolte d'El Mokrani fut rejointe par la confrérie Rahmaniya sous le cheikh Aheddad.",
      "انضمّت الطريقة الرحمانية بقيادة الشيخ الحداد إلى ثورة المقراني.",
    ),
  ),

  // ---------- Abane Ramdane ----------
  make(
    "abane-1",
    "easy",
    [
      L("I was a key political mind of the Algerian revolution.", "J'étais un cerveau politique clé de la révolution algérienne.", "كنتُ من أبرز العقول السياسية للثورة الجزائرية."),
      L("I helped organize the Soummam Congress of 1956.", "J'ai contribué à organiser le Congrès de la Soummam en 1956.", "أسهمتُ في تنظيم مؤتمر الصومام عام 1956."),
    ],
    "Abane Ramdane",
    ["Krim Belkacem", "Ferhat Abbas", "Larbi Ben M'hidi"],
    L(
      "Abane Ramdane is remembered as the principal architect of the Soummam Congress.",
      "Abane Ramdane est considéré comme le principal architecte du Congrès de la Soummam.",
      "يُعدّ عبان رمضان المهندس الرئيسي لمؤتمر الصومام.",
    ),
  ),
  make(
    "abane-2",
    "hard",
    [
      L("I defended the priority of the political over the military.", "J'ai défendu la primauté du politique sur le militaire.", "دافعتُ عن أولوية السياسي على العسكري."),
      L("I also defended the priority of the interior over the exterior.", "J'ai aussi défendu la primauté de l'intérieur sur l'extérieur.", "ودافعتُ كذلك عن أولوية الداخل على الخارج."),
    ],
    "Abane Ramdane",
    ["Krim Belkacem", "Ferhat Abbas", "Colonel Amirouche"],
    L(
      "These two principles are central to the Soummam platform that Abane shaped.",
      "Ces deux principes sont au cœur de la plateforme de la Soummam, façonnée par Abane.",
      "يمثّل هذان المبدآن جوهر ميثاق الصومام الذي صاغه عبان.",
    ),
  ),
  make(
    "abane-3",
    "medium",
    [
      L("I was born in Azouza, a small village in Kabylie.", "Je suis né à Azouza, un petit village de Kabylie.", "وُلدتُ في قرية أزوزة الصغيرة بمنطقة القبائل."),
      L("Historians often call me 'the architect of the revolution'.", "Les historiens m'appellent souvent « l'architecte de la révolution ».", "يلقّبني المؤرخون في الغالب بـ«مهندس الثورة»."),
    ],
    "Abane Ramdane",
    ["Krim Belkacem", "Larbi Ben M'hidi", "Colonel Amirouche"],
    L(
      "Abane Ramdane is widely remembered as the architect of the Algerian revolution's political structure.",
      "Abane Ramdane est largement reconnu comme l'architecte de la structure politique de la révolution algérienne.",
      "يُعدّ عبان رمضان على نطاق واسع مهندس البنية السياسية للثورة الجزائرية.",
    ),
  ),
  make(
    "abane-4",
    "medium",
    [
      L("After years in French prisons, I was freed in 1955.", "Après des années dans les prisons françaises, j'ai été libéré en 1955.", "بعد سنوات في السجون الفرنسية، أُطلق سراحي سنة 1955."),
      L("I immediately reorganized the FLN inside Algeria.", "J'ai aussitôt réorganisé le FLN à l'intérieur de l'Algérie.", "أعدتُ فورًا تنظيم جبهة التحرير في الداخل الجزائري."),
    ],
    "Abane Ramdane",
    ["Ferhat Abbas", "Krim Belkacem", "Larbi Ben M'hidi"],
    L(
      "Abane was released in 1955 and quickly became the political organizer of the FLN inside the country.",
      "Abane fut libéré en 1955 et devint vite l'organisateur politique du FLN à l'intérieur du pays.",
      "أُفرج عن عبان سنة 1955 فأصبح سريعًا المنظّم السياسي للجبهة في الداخل.",
    ),
  ),
  make(
    "abane-5",
    "hard",
    [
      L("On 20 August 1956, I helped lead a secret congress in a Kabyle valley.", "Le 20 août 1956, j'ai aidé à diriger un congrès secret dans une vallée kabyle.", "في 20 أوت 1956 ساهمتُ في قيادة مؤتمر سرّي في وادٍ بالقبائل."),
      L("It gave the revolution written rules and national institutions.", "Il dota la révolution de règles écrites et d'institutions nationales.", "منح الثورةَ قواعد مكتوبة ومؤسسات وطنية."),
    ],
    "Abane Ramdane",
    ["Krim Belkacem", "Ferhat Abbas", "Larbi Ben M'hidi"],
    L(
      "Abane was the principal architect of the Soummam Congress (20 August 1956).",
      "Abane fut le principal architecte du Congrès de la Soummam (20 août 1956).",
      "كان عبان المهندس الرئيسي لمؤتمر الصومام (20 أوت 1956).",
    ),
  ),
  make(
    "abane-6",
    "hard",
    [
      L("At Soummam, two national bodies were created to lead the revolution.", "À la Soummam, deux organes nationaux furent créés pour diriger la révolution.", "في الصومام أُنشئت هيئتان وطنيتان لقيادة الثورة."),
      L("Their initials are CNRA and CCE.", "Leurs sigles sont CNRA et CCE.", "اختصارهما: المجلس الوطني للثورة ولجنة التنسيق والتنفيذ."),
    ],
    "Abane Ramdane",
    ["Ferhat Abbas", "Krim Belkacem", "Larbi Ben M'hidi"],
    L(
      "The Soummam Congress shaped by Abane created the CNRA (national council) and the CCE (executive coordination).",
      "Le Congrès de la Soummam, façonné par Abane, créa le CNRA (conseil national) et le CCE (coordination exécutive).",
      "أنشأ مؤتمر الصومام الذي صاغه عبان المجلسَ الوطني للثورة (CNRA) ولجنةَ التنسيق والتنفيذ (CCE).",
    ),
  ),
  make(
    "abane-7",
    "medium",
    [
      L("I believed words and ideas mattered as much as weapons.", "Je croyais que les mots et les idées comptaient autant que les armes.", "كنتُ أؤمن بأن الكلمات والأفكار لا تقلّ أهمية عن السلاح."),
      L("I died in December 1957, only 37 years old.", "Je suis mort en décembre 1957, à seulement 37 ans.", "تُوفّيتُ في ديسمبر 1957 وعمري 37 سنة فقط."),
    ],
    "Abane Ramdane",
    ["Larbi Ben M'hidi", "Colonel Amirouche", "Krim Belkacem"],
    L(
      "Abane died in late 1957 in tragic and disputed circumstances inside the revolution.",
      "Abane mourut fin 1957 dans des circonstances tragiques et disputées au sein de la révolution.",
      "تُوفّي عبان أواخر 1957 في ظروف مأساوية ومتنازع عليها داخل الثورة.",
    ),
  ),
  make(
    "abane-8",
    "hard",
    [
      L("My vision shaped the future Algerian state long after my death.", "Ma vision façonna le futur État algérien bien après ma mort.", "صاغت رؤيتي الدولة الجزائرية المستقبلية لفترة طويلة بعد وفاتي."),
      L("An airport in Béjaïa carries my name today.", "Un aéroport à Béjaïa porte aujourd'hui mon nom.", "يحمل اسمي اليوم مطارٌ في بجاية."),
    ],
    "Abane Ramdane",
    ["Krim Belkacem", "Ferhat Abbas", "Colonel Amirouche"],
    L(
      "Béjaïa's airport is named after Abane Ramdane in honor of his role as architect of the revolution.",
      "L'aéroport de Béjaïa porte le nom d'Abane Ramdane en hommage à son rôle d'architecte de la révolution.",
      "سُمّي مطار بجاية باسم عبان رمضان تخليدًا لدوره مهندسًا للثورة.",
    ),
  ),

  // ---------- Krim Belkacem ----------
  make(
    "krim-1",
    "easy",
    [
      L("I was a historic FLN leader from Kabylie.", "J'étais un chef historique du FLN, originaire de Kabylie.", "كنتُ قائدًا تاريخيًا في جبهة التحرير من القبائل."),
      L("I signed the Évian Accords for the Algerian side.", "J'ai signé les Accords d'Évian côté algérien.", "وقّعتُ اتفاقيات إيفيان عن الجانب الجزائري."),
    ],
    "Krim Belkacem",
    ["Abane Ramdane", "Larbi Ben M'hidi", "Ferhat Abbas"],
    L(
      "Krim Belkacem was the principal Algerian signatory of the Évian Accords.",
      "Krim Belkacem fut le principal signataire algérien des Accords d'Évian.",
      "كان كريم بلقاسم الموقّع الرئيسي عن الجزائر على اتفاقيات إيفيان.",
    ),
  ),
  make(
    "krim-2",
    "medium",
    [
      L("I was already in the maquis before November 1954.", "J'étais déjà dans le maquis avant novembre 1954.", "كنتُ في الجبل قبل نوفمبر 1954."),
      L("I played a major role at the Soummam Congress.", "J'ai joué un rôle majeur au Congrès de la Soummam.", "لعبتُ دورًا محوريًا في مؤتمر الصومام."),
    ],
    "Krim Belkacem",
    ["Abane Ramdane", "Colonel Amirouche", "Ahmed Bey"],
    L(
      "Krim Belkacem was a veteran maquis fighter and a Soummam leader.",
      "Krim Belkacem fut un vétéran du maquis et un dirigeant de la Soummam.",
      "كان كريم بلقاسم من قدامى مجاهدي الجبل ومن قادة الصومام.",
    ),
  ),

  // ---------- Ben M'hidi ----------
  make(
    "benmhidi-1",
    "easy",
    [
      L("I was one of the six historic chiefs of November 1954.", "J'étais l'un des six chefs historiques de novembre 1954.", "كنتُ أحد القادة الستة التاريخيين لنوفمبر 1954."),
      L("I led key operations during the Battle of Algiers.", "J'ai dirigé des opérations clés pendant la Bataille d'Alger.", "قُدتُ عمليات محورية في معركة الجزائر."),
    ],
    "Larbi Ben M'hidi",
    ["Abane Ramdane", "Krim Belkacem", "Ferhat Abbas"],
    L(
      "Ben M'hidi was a founding leader of the FLN and a central figure in the Battle of Algiers.",
      "Ben M'hidi fut un dirigeant fondateur du FLN et une figure centrale de la Bataille d'Alger.",
      "كان بن مهيدي من المؤسسين لجبهة التحرير وشخصية محورية في معركة الجزائر.",
    ),
  ),
  make(
    "benmhidi-2",
    "hard",
    [
      L("I am remembered for great composure under interrogation.", "On se souvient de mon grand sang-froid lors des interrogatoires.", "يُذكر لي رباطة جأشي في التحقيق."),
      L("A famous answer about \"baskets and planes\" is attributed to me.", "Une célèbre réponse sur « les paniers et les avions » m'est attribuée.", "تُنسب إليّ إجابة شهيرة عن «السلال والطائرات»."),
    ],
    "Larbi Ben M'hidi",
    ["Krim Belkacem", "Colonel Amirouche", "Abane Ramdane"],
    L(
      "The famous \"give us your planes, we'll give you our baskets\" answer is attributed to Ben M'hidi.",
      "La réplique « donnez-nous vos avions, nous vous donnerons nos paniers » est attribuée à Ben M'hidi.",
      "تُنسب إلى بن مهيدي عبارة «أعطونا طائراتكم نمنحكم سلالنا».",
    ),
  ),

  // ---------- Amirouche ----------
  make(
    "amirouche-1",
    "easy",
    [
      L("I was a colonel of Wilaya III in Kabylie.", "J'étais un colonel de la Wilaya III en Kabylie.", "كنتُ عقيدًا في الولاية الثالثة بالقبائل."),
      L("I am a national symbol of sacrifice in the war.", "Je suis un symbole national de sacrifice dans la guerre.", "أنا رمز وطني للتضحية في الثورة."),
    ],
    "Colonel Amirouche",
    ["Krim Belkacem", "Larbi Ben M'hidi", "Abane Ramdane"],
    L(
      "Colonel Amirouche commanded Wilaya III and remains a major war hero.",
      "Le colonel Amirouche commanda la Wilaya III et demeure un grand héros de la guerre.",
      "قاد العقيد عميروش الولاية الثالثة وبقي بطلًا كبيرًا من أبطال الثورة.",
    ),
  ),
  make(
    "amirouche-2",
    "medium",
    [
      L("My remains were hidden for decades after independence.", "Ma dépouille fut cachée pendant des décennies après l'indépendance.", "أُخفي رفاتي عقودًا بعد الاستقلال."),
      L("I led fighters in the Djurdjura mountains.", "J'ai conduit des combattants dans le Djurdjura.", "قُدتُ المقاتلين في جبال جرجرة."),
    ],
    "Colonel Amirouche",
    ["Cheikh El Mokrani", "Krim Belkacem", "Lalla Fatma N'Soumer"],
    L(
      "Amirouche fought in the Djurdjura, and the post-independence story of his remains is well known.",
      "Amirouche combattit dans le Djurdjura, et l'histoire post-indépendance de sa dépouille est bien connue.",
      "قاتل عميروش في جرجرة، وقصة رفاته بعد الاستقلال معروفة جيدًا.",
    ),
  ),

  // ---------- Ferhat Abbas ----------
  make(
    "abbas-1",
    "easy",
    [
      L("I was the first president of the GPRA.", "J'étais le premier président du GPRA.", "كنتُ أوّل رئيس للحكومة المؤقتة للجمهورية الجزائرية."),
      L("I was a pharmacist and a major nationalist leader.", "J'étais pharmacien et un grand dirigeant nationaliste.", "كنتُ صيدليًا وقائدًا وطنيًا كبيرًا."),
    ],
    "Ferhat Abbas",
    ["Krim Belkacem", "Abane Ramdane", "Larbi Ben M'hidi"],
    L(
      "Ferhat Abbas was the first president of the Provisional Government of the Algerian Republic (GPRA).",
      "Ferhat Abbas fut le premier président du Gouvernement provisoire de la République algérienne (GPRA).",
      "كان فرحات عباس أوّل رئيس للحكومة المؤقتة للجمهورية الجزائرية.",
    ),
  ),
  make(
    "abbas-2",
    "hard",
    [
      L("I authored the 1943 \"Manifesto of the Algerian People\".", "J'ai rédigé le « Manifeste du peuple algérien » en 1943.", "كتبتُ «بيان الشعب الجزائري» سنة 1943."),
      L("I shifted from demanding equal rights to demanding full independence.", "Je suis passé de la revendication d'égalité à celle d'indépendance totale.", "انتقلتُ من المطالبة بالمساواة إلى المطالبة بالاستقلال التام."),
    ],
    "Ferhat Abbas",
    ["Emir Abdelkader", "Krim Belkacem", "Ibn Khaldun"],
    L(
      "The 1943 Manifesto of the Algerian People is one of Ferhat Abbas's foundational political texts.",
      "Le Manifeste du peuple algérien de 1943 est l'un des textes politiques fondateurs de Ferhat Abbas.",
      "يُعدّ «بيان الشعب الجزائري» 1943 من النصوص السياسية المؤسِّسة عند فرحات عباس.",
    ),
  ),

  // ---------- Ibn Khaldun ----------
  make(
    "ibnkhaldun-1",
    "easy",
    [
      L("I was a 14th-century historian and thinker from the Maghreb.", "J'étais un historien et penseur du Maghreb au XIVe siècle.", "كنتُ مؤرّخًا ومفكّرًا من المغرب في القرن الرابع عشر."),
      L("I wrote a famous \"Introduction\" to history.", "J'ai écrit une célèbre « Introduction » à l'histoire.", "كتبتُ «مقدمة» شهيرة في التاريخ."),
    ],
    "Ibn Khaldun",
    ["Emir Abdelkader", "Mouloud Feraoun", "Assia Djebar"],
    L(
      "Ibn Khaldun's Muqaddimah is considered a founding work of historical sociology.",
      "La Muqaddima d'Ibn Khaldoun est considérée comme une œuvre fondatrice de la sociologie historique.",
      "تُعدّ «مقدمة» ابن خلدون من النصوص المؤسِّسة لعلم الاجتماع التاريخي.",
    ),
  ),
  make(
    "ibnkhaldun-2",
    "medium",
    [
      L("I wrote much of my main work at Qal'at Ibn Salama in present-day Tiaret region.", "J'ai écrit une grande partie de mon œuvre majeure à Qal'at Ibn Salama, dans l'actuelle région de Tiaret.", "كتبتُ معظم مؤلَّفي الكبير في قلعة بني سلامة بمنطقة تيارت اليوم."),
      L("I was diplomat and judge as well as a scholar.", "J'étais aussi diplomate et juge, en plus d'être savant.", "كنتُ دبلوماسيًا وقاضيًا إلى جانب كوني عالمًا."),
    ],
    "Ibn Khaldun",
    ["Emir Abdelkader", "Mouloud Feraoun", "Idir"],
    L(
      "Ibn Khaldun spent productive years at Qal'at Ibn Salama in today's Tiaret region.",
      "Ibn Khaldoun passa des années productives à Qal'at Ibn Salama, dans l'actuelle région de Tiaret.",
      "أمضى ابن خلدون سنوات مثمرة في قلعة بني سلامة بمنطقة تيارت الحالية.",
    ),
  ),

  // ---------- Mouloud Feraoun ----------
  make(
    "feraoun-1",
    "easy",
    [
      L("I was a teacher and a novelist from Kabylie.", "J'étais instituteur et romancier de Kabylie.", "كنتُ معلمًا وروائيًا من القبائل."),
      L("I wrote in French about the daily life of Berber villages.", "J'écrivais en français sur la vie quotidienne des villages berbères.", "كتبتُ بالفرنسية عن الحياة اليومية للقرى الأمازيغية."),
    ],
    "Mouloud Feraoun",
    ["Assia Djebar", "Idir", "Ibn Khaldun"],
    L(
      "Feraoun is famous for portraying Kabyle village life with warmth and dignity.",
      "Feraoun est connu pour avoir dépeint la vie des villages kabyles avec chaleur et dignité.",
      "اشتهر فرعون بتصويره الدافئ والكريم لحياة قرى القبائل.",
    ),
  ),
  make(
    "feraoun-2",
    "medium",
    [
      L("I kept a war journal published after my death.", "J'ai tenu un journal de guerre publié après ma mort.", "أمسكتُ بمذكّرات حرب نُشرت بعد وفاتي."),
      L("I am one of the great Algerian writers of the 20th century.", "Je suis l'un des grands écrivains algériens du XXe siècle.", "أنا من كبار الكتّاب الجزائريين في القرن العشرين."),
    ],
    "Mouloud Feraoun",
    ["Assia Djebar", "Lounès Matoub", "Ferhat Abbas"],
    L(
      "Feraoun's posthumous \"Journal\" is a key document of the war years.",
      "Le « Journal » posthume de Feraoun est un document clé sur les années de guerre.",
      "تُعدّ «يوميات» فرعون التي نُشرت بعد وفاته وثيقة مهمة عن سنوات الحرب.",
    ),
  ),

  // ---------- Assia Djebar ----------
  make(
    "djebar-1",
    "easy",
    [
      L("I was a major Algerian writer and filmmaker.", "J'étais une grande écrivaine et cinéaste algérienne.", "كنتُ كاتبة جزائرية كبيرة وسينمائية."),
      L("My work often centers on women, memory and Algerian society.", "Mon œuvre porte souvent sur les femmes, la mémoire et la société algérienne.", "تتمحور أعمالي غالبًا حول النساء والذاكرة والمجتمع الجزائري."),
    ],
    "Assia Djebar",
    ["Lalla Fatma N'Soumer", "Mouloud Feraoun", "Idir"],
    L(
      "Assia Djebar is one of the most important Algerian voices on women, memory and history.",
      "Assia Djebar est l'une des voix algériennes majeures sur les femmes, la mémoire et l'histoire.",
      "تُعدّ آسيا جبار من أبرز الأصوات الجزائرية في الكتابة عن المرأة والذاكرة والتاريخ.",
    ),
  ),
  make(
    "djebar-2",
    "hard",
    [
      L("I was the first writer from the Maghreb elected to the Académie française.", "Je fus la première écrivaine du Maghreb élue à l'Académie française.", "كنتُ أوّل كاتبة من المغرب الكبير تُنتخب في الأكاديمية الفرنسية."),
      L("My real first names were Fatma-Zohra.", "Mes vrais prénoms étaient Fatma-Zohra.", "اسمي الحقيقي فاطمة الزهراء."),
    ],
    "Assia Djebar",
    ["Mouloud Feraoun", "Lounès Matoub", "Lalla Fatma N'Soumer"],
    L(
      "Assia Djebar (Fatma-Zohra Imalayène) was the first Maghrebi writer elected to the Académie française.",
      "Assia Djebar (Fatma-Zohra Imalayène) fut la première écrivaine maghrébine élue à l'Académie française.",
      "آسيا جبار (فاطمة الزهراء إيمالاين) أوّل كاتبة مغاربية تُنتخب في الأكاديمية الفرنسية.",
    ),
  ),

  // ---------- Idir ----------
  make(
    "idir-1",
    "easy",
    [
      L("I was a Kabyle singer-songwriter known across the world.", "J'étais un auteur-compositeur kabyle connu dans le monde entier.", "كنتُ مؤلفًا ومغنيًا قبائليًا مشهورًا في العالم."),
      L("I sang lullabies inspired by my grandmother.", "J'ai chanté des berceuses inspirées de ma grand-mère.", "غنّيتُ تهويدات استلهمتها من جدّتي."),
    ],
    "Idir",
    ["Lounès Matoub", "Mouloud Feraoun", "Assia Djebar"],
    L(
      "Idir's \"A Vava Inouva\" became a global symbol of Kabyle music.",
      "« A Vava Inouva » d'Idir devint un symbole mondial de la musique kabyle.",
      "صارت أغنية «أ ڤاڤا إينوڤا» لإيدير رمزًا عالميًا للموسيقى القبائلية.",
    ),
  ),
  make(
    "idir-2",
    "medium",
    [
      L("My most famous song was translated into more than a dozen languages.", "Ma chanson la plus célèbre fut traduite en plus d'une dizaine de langues.", "تُرجمت أغنيتي الأشهر إلى أكثر من عشر لغات."),
      L("I was first trained as a geologist.", "J'ai d'abord été formé comme géologue.", "تكوّنتُ في الأصل جيولوجيًا."),
    ],
    "Idir",
    ["Lounès Matoub", "Krim Belkacem", "Mouloud Feraoun"],
    L(
      "Before music, Idir trained as a geologist; his songs later traveled the world.",
      "Avant la musique, Idir était géologue ; ses chansons firent ensuite le tour du monde.",
      "قبل الموسيقى، درس إيدير الجيولوجيا، ثم انتشرت أغانيه في أنحاء العالم.",
    ),
  ),

  // ---------- Matoub ----------
  make(
    "matoub-1",
    "easy",
    [
      L("I was a Kabyle singer, poet and outspoken activist.", "J'étais un chanteur, poète et militant kabyle sans détour.", "كنتُ مغنيًا وشاعرًا وناشطًا قبائليًا صريحًا."),
      L("I defended Amazigh identity and freedom of expression.", "J'ai défendu l'identité amazighe et la liberté d'expression.", "دافعتُ عن الهوية الأمازيغية وحرية التعبير."),
    ],
    "Lounès Matoub",
    ["Idir", "Mouloud Feraoun", "Assia Djebar"],
    L(
      "Lounès Matoub used his songs as political and cultural statements.",
      "Lounès Matoub fit de ses chansons des manifestes politiques et culturels.",
      "حوّل لونيس معطوب أغانيه إلى بيانات سياسية وثقافية.",
    ),
  ),
  make(
    "matoub-2",
    "hard",
    [
      L("I survived a serious shooting and a kidnapping before my assassination in 1998.", "J'ai survécu à un grave attentat par balles et à un enlèvement avant mon assassinat en 1998.", "نجوتُ من إطلاق نار خطير ومن اختطاف قبل اغتيالي سنة 1998."),
      L("My death deeply marked Algerian society.", "Ma mort a profondément marqué la société algérienne.", "ترك رحيلي أثرًا عميقًا في المجتمع الجزائري."),
    ],
    "Lounès Matoub",
    ["Idir", "Larbi Ben M'hidi", "Colonel Amirouche"],
    L(
      "Matoub's 1998 assassination shook Algeria and remains a powerful memory.",
      "L'assassinat de Matoub en 1998 a bouleversé l'Algérie et reste une mémoire vive.",
      "هزّ اغتيال معطوب سنة 1998 الجزائر وبقي ذكرى حيّة.",
    ),
  ),

  // ---------- Syphax ----------
  make("syphax-1", "medium",
    [
      L("I was a king of western Numidia.", "J'étais un roi de la Numidie occidentale.", "كنتُ ملكًا لنوميديا الغربية."),
      L("I was a rival of Massinissa.", "J'étais un rival de Massinissa.", "كنتُ منافسًا لماسينيسا."),
    ],
    "Syphax", ["Massinissa", "Jugurtha", "Juba I"],
    L("Syphax ruled the Masaesyli of western Numidia.", "Syphax régnait sur les Masaesyles de la Numidie occidentale.", "حكم سيفاكس المازيسيل في غرب نوميديا."),
  ),
  // ---------- Juba I ----------
  make("juba1-1", "hard",
    [
      L("I sided with Pompey in Rome's civil war.", "Je me suis rangé du côté de Pompée.", "انحزتُ إلى بومبي في الحرب الأهلية."),
      L("I chose death after defeat at Thapsus.", "J'ai préféré la mort après Thapsus.", "اخترتُ الموت بعد تابسوس."),
    ],
    "Juba I", ["Massinissa", "Jugurtha", "Tacfarinas"],
    L("Juba I was the last great king of independent Numidia.", "Juba Ier fut le dernier grand roi de Numidie indépendante.", "كان يوبا الأول آخر ملوك نوميديا المستقلة الكبار."),
  ),
  // ---------- Juba II ----------
  make("juba2-1", "medium",
    [
      L("I grew up in Rome and returned as a learned king.", "J'ai grandi à Rome et suis revenu en roi savant.", "نشأتُ في روما وعدتُ ملكًا عالمًا."),
      L("I married a daughter of Cleopatra VII.", "J'ai épousé une fille de Cléopâtre VII.", "تزوّجتُ ابنة كليوباترا السابعة."),
    ],
    "Juba II", ["Juba I", "Septimius Severus", "Massinissa"],
    L("Juba II was a scholar-king of Mauretania.", "Juba II fut un roi savant de Maurétanie.", "كان يوبا الثاني ملكًا عالمًا لموريتانيا."),
  ),
  // ---------- Tacfarinas ----------
  make("tacfarinas-1", "hard",
    [
      L("I was a former Roman auxiliary turned rebel.", "Ancien auxiliaire romain devenu rebelle.", "كنتُ جنديًا رومانيًا سابقًا، ثم ثائرًا."),
      L("I led a long guerrilla war around 17–24 AD.", "J'ai mené une longue guérilla vers 17–24 ap. J.-C.", "قُدتُ حرب عصابات طويلة نحو 17–24م."),
    ],
    "Tacfarinas", ["Juba I", "Kusayla", "Septimius Severus"],
    L("Tacfarinas led the Musulamii in a long Berber revolt against Rome.", "Tacfarinas conduisit les Musulames dans une longue révolte berbère contre Rome.", "قاد تاكفاريناس قبيلة الموسولامي في ثورة أمازيغية ضد روما."),
  ),
  // ---------- Augustine ----------
  make("augustine-1", "easy",
    [
      L("I was a bishop in Roman North Africa.", "J'étais un évêque en Afrique romaine.", "كنتُ أسقفًا في إفريقيا الرومانية."),
      L("I was born in Thagaste — today Souk Ahras.", "Je suis né à Thagaste — l'actuelle Souk Ahras.", "وُلدتُ في تاغاست، سوق أهراس اليوم."),
    ],
    "Augustine of Hippo", ["Septimius Severus", "Ibn Khaldun", "Sidi Boumediene"],
    L("Augustine of Hippo was bishop of Hippo (Annaba).", "Augustin d'Hippone fut évêque d'Hippone (Annaba).", "كان أوغسطين أسقفًا لهيبو (عنابة)."),
  ),
  // ---------- Septimius Severus ----------
  make("severus-1", "medium",
    [
      L("I was a Roman emperor born in North Africa.", "J'étais un empereur romain né en Afrique du Nord.", "كنتُ إمبراطورًا رومانيًا وُلد في شمال إفريقيا."),
      L("I greatly expanded the city of Lambaesis.", "J'agrandis considérablement Lambèse.", "وسّعتُ كثيرًا مدينة لامبيز."),
    ],
    "Septimius Severus", ["Augustine of Hippo", "Juba II", "Tacfarinas"],
    L("Septimius Severus, born in Roman Africa, became emperor.", "Septime Sévère, né en Afrique romaine, devint empereur.", "وُلد سيبتيموس سيفيروس في إفريقيا الرومانية وصار إمبراطورًا."),
  ),
  // ---------- Kusayla ----------
  make("kusayla-1", "medium",
    [
      L("I was an Amazigh chief who fought the early Arab armies.", "Chef amazigh qui combattit les premières armées arabes.", "كنتُ زعيمًا أمازيغيًا قاتل الجيوش العربية الأولى."),
      L("I briefly retook Kairouan.", "J'ai brièvement repris Kairouan.", "استعدتُ القيروان لفترة قصيرة."),
    ],
    "Kusayla", ["Dihya", "Yaghmurasen Ibn Zyan", "Ibn Khaldun"],
    L("Kusayla led an early Berber revolt against the Arab conquest.", "Koceila mena l'une des premières révoltes berbères contre la conquête arabe.", "قاد كسيلة من أوّل الثورات الأمازيغية ضد الفتح العربي."),
  ),
  // ---------- Ibn Rustam ----------
  make("rustam-1", "hard",
    [
      L("I founded a city around 776 in present-day Tiaret region.", "J'ai fondé une ville vers 776 dans la région de Tiaret.", "أسّستُ مدينة نحو 776م في منطقة تيارت."),
      L("My capital was nicknamed \"the Iraq of the Maghreb\".", "Ma capitale fut surnommée « l'Irak du Maghreb ».", "لُقّبت عاصمتي بـ«عراق المغرب»."),
    ],
    "Abd al-Rahman ibn Rustam", ["Yaghmurasen Ibn Zyan", "Sidi Boumediene", "Kusayla"],
    L("Ibn Rustam founded the Rustamid imamate at Tahert.", "Ibn Rostom fonda l'imamat rostémide de Tahert.", "أسّس ابن رستم الإمامة الرستمية في تاهرت."),
  ),
  // ---------- Yaghmurasen ----------
  make("yaghmurasen-1", "medium",
    [
      L("I founded a dynasty centered on Tlemcen in the 13th century.", "J'ai fondé une dynastie centrée sur Tlemcen au XIIIe siècle.", "أسّستُ دولة محورها تلمسان في القرن الثالث عشر."),
      L("My family ruled western Algeria for centuries.", "Ma famille régna sur l'ouest algérien pendant des siècles.", "حكمت أسرتي الغرب الجزائري قرونًا."),
    ],
    "Yaghmurasen Ibn Zyan", ["Sidi Boumediene", "Abd al-Rahman ibn Rustam", "Khayr ad-Din Barbarossa"],
    L("Yaghmurasen founded the Zayyanid dynasty of Tlemcen.", "Yaghmoracen fonda la dynastie zayyanide de Tlemcen.", "أسّس يغمراسن الدولة الزيانية في تلمسان."),
  ),
  // ---------- Sidi Boumediene ----------
  make("boumediene-saint-1", "hard",
    [
      L("I was a Sufi master who settled near Tlemcen in the 12th century.", "Maître soufi installé près de Tlemcen au XIIe siècle.", "شيخ صوفي استقرّ قرب تلمسان في القرن الثاني عشر."),
      L("My shrine in El Eubbad has drawn pilgrims for centuries.", "Mon sanctuaire à El Eubbad attire des pèlerins depuis des siècles.", "ضريحي في العباد قبلةٌ للزوّار قرونًا."),
    ],
    "Sidi Boumediene", ["Ibn Khaldun", "Abd al-Rahman ibn Rustam", "Yaghmurasen Ibn Zyan"],
    L("Sidi Boumediene is among the most venerated Maghreb saints, linked to Tlemcen.", "Sidi Boumediene est l'un des saints les plus vénérés du Maghreb, lié à Tlemcen.", "يُعدّ سيدي أبو مدين من أبرز أولياء المغرب، ويرتبط بتلمسان."),
  ),
  // ---------- Barbarossa ----------
  make("barbarossa-1", "easy",
    [
      L("I placed Algiers under Ottoman protection in the 16th century.", "Je plaçai Alger sous protection ottomane au XVIe siècle.", "وضعتُ الجزائر تحت الحماية العثمانية في القرن السادس عشر."),
      L("I became Grand Admiral of the Ottoman fleet.", "Je devins grand amiral de la flotte ottomane.", "صرتُ قبطان البحر الأكبر للأسطول العثماني."),
    ],
    "Khayr ad-Din Barbarossa", ["Raïs Hamidou", "Hassan Pacha", "Yaghmurasen Ibn Zyan"],
    L("Khayr ad-Din Barbarossa founded the Regency of Algiers.", "Khayr al-Din Barberousse fonda la Régence d'Alger.", "أسّس خير الدين بربروس إيالة الجزائر."),
  ),
  // ---------- Raïs Hamidou ----------
  make("hamidou-1", "medium",
    [
      L("I was a famous admiral of the Regency of Algiers.", "Célèbre amiral de la Régence d'Alger.", "بحّار شهير لإيالة الجزائر."),
      L("I died in 1815 in a battle against an American squadron.", "Je mourus en 1815 contre une escadre américaine.", "استُشهدتُ سنة 1815 في معركة ضد سرب أمريكي."),
    ],
    "Raïs Hamidou", ["Khayr ad-Din Barbarossa", "Hassan Pacha", "Mostefa Ben Boulaïd"],
    L("Raïs Hamidou was the most famous admiral of the late Regency.", "Raïs Hamidou fut l'amiral le plus célèbre de la fin de la Régence.", "كان الرايس حميدو أشهر بحّار في نهاية عهد الإيالة."),
  ),
  // ---------- Hassan Pacha ----------
  make("hassan-pacha-1", "hard",
    [
      L("I repelled a major Spanish expedition against Algiers in 1775.", "Je repoussai une grande expédition espagnole en 1775.", "صددتُ حملة إسبانية كبرى على الجزائر سنة 1775."),
      L("I was Dey of Algiers in the late 18th century.", "J'étais dey d'Alger à la fin du XVIIIe siècle.", "كنتُ داي الجزائر في أواخر القرن الثامن عشر."),
    ],
    "Hassan Pacha", ["Khayr ad-Din Barbarossa", "Raïs Hamidou", "Ahmed Bey"],
    L("Hassan Pacha defended Algiers from a major Spanish landing in 1775.", "Hassan Pacha défendit Alger contre un débarquement espagnol en 1775.", "دافع حسن باشا عن الجزائر ضد إنزال إسباني كبير سنة 1775."),
  ),
  // ---------- Bouamama ----------
  make("bouamama-1", "medium",
    [
      L("I led a long revolt in the southwest steppes from 1881.", "Longue révolte dans les steppes du sud-ouest dès 1881.", "ثورة طويلة في سهوب الجنوب الغربي منذ 1881."),
      L("I continued from across the Moroccan border.", "J'ai poursuivi la résistance depuis le Maroc.", "واصلتُ المقاومة من الجانب المغربي."),
    ],
    "Cheikh Bouamama", ["Cheikh El Mokrani", "Emir Abdelkader", "Lalla Fatma N'Soumer"],
    L("Cheikh Bouamama led a desert resistance against French expansion.", "Cheikh Bouamama mena une résistance du désert contre l'expansion française.", "قاد الشيخ بوعمامة مقاومة صحراوية ضد التوسّع الفرنسي."),
  ),
  // ---------- Aheddad ----------
  make("aheddad-1", "hard",
    [
      L("I led the Rahmaniya brotherhood in Kabylie.", "Je dirigeai la confrérie Rahmaniya en Kabylie.", "قُدتُ الطريقة الرحمانية في القبائل."),
      L("I joined the 1871 revolt at over 80 years old.", "Je rejoignis la révolte de 1871 à plus de 80 ans.", "التحقتُ بثورة 1871 وأنا فوق الثمانين."),
    ],
    "Cheikh Aheddad", ["Cheikh El Mokrani", "Emir Abdelkader", "Sidi Boumediene"],
    L("Cheikh Aheddad of the Rahmaniya backed the 1871 uprising.", "Cheikh Aheddad de la Rahmaniya soutint le soulèvement de 1871.", "دعم الشيخ الحدّاد من الطريقة الرحمانية انتفاضة 1871."),
  ),
  // ---------- Ben Boulaid ----------
  make("benboulaid-1", "easy",
    [
      L("I was one of the six historic chiefs of November 1954.", "L'un des six chefs historiques de novembre 1954.", "أحد القادة الستة التاريخيين لنوفمبر 1954."),
      L("I led the revolution in the Aurès.", "Je dirigeais la révolution dans les Aurès.", "قُدتُ الثورة في الأوراس."),
    ],
    "Mostefa Ben Boulaïd", ["Larbi Ben M'hidi", "Krim Belkacem", "Didouche Mourad"],
    L("Ben Boulaïd launched the war in the Aurès.", "Ben Boulaïd lança la guerre dans les Aurès.", "أطلق بن بولعيد الثورة في الأوراس."),
  ),
  // ---------- Didouche ----------
  make("didouche-1", "medium",
    [
      L("I organized the North Constantine zone in 1954.", "J'organisai la zone Nord-Constantinois en 1954.", "نظّمتُ منطقة الشمال القسنطيني سنة 1954."),
      L("I was the first historic chief to fall, in early 1955.", "Premier chef historique tombé au combat, début 1955.", "أوّل القادة التاريخيين سقوطًا، مطلع 1955."),
    ],
    "Didouche Mourad", ["Larbi Ben M'hidi", "Mostefa Ben Boulaïd", "Zighoud Youcef"],
    L("Didouche Mourad fell early in the war.", "Didouche Mourad tomba au début de la guerre.", "سقط ديدوش مراد مبكرًا في الحرب."),
  ),
  // ---------- Bitat ----------
  make("bitat-1", "hard",
    [
      L("I was one of the six historic chiefs of 1954.", "L'un des six chefs historiques de 1954.", "أحد القادة الستة التاريخيين لسنة 1954."),
      L("I spent most of the war in French prisons.", "J'ai passé l'essentiel de la guerre en prison.", "أمضيتُ معظم الحرب في السجون الفرنسية."),
    ],
    "Rabah Bitat", ["Larbi Ben M'hidi", "Krim Belkacem", "Mostefa Ben Boulaïd"],
    L("Rabah Bitat helped organize Algiers in 1954 before being arrested.", "Rabah Bitat organisa Alger en 1954 avant d'être arrêté.", "نظّم رابح بيطاط منطقة الجزائر سنة 1954 قبل أن يُعتقل."),
  ),
  // ---------- Boudiaf ----------
  make("boudiaf-1", "medium",
    [
      L("I was a historic chief of November 1954.", "Chef historique de novembre 1954.", "من القادة التاريخيين لنوفمبر 1954."),
      L("I returned from exile in 1992 to head the High Council of State.", "Je revins d'exil en 1992 à la tête du HCE.", "عدتُ من المنفى سنة 1992 لرئاسة المجلس الأعلى للدولة."),
    ],
    "Mohamed Boudiaf", ["Ahmed Ben Bella", "Hocine Aït Ahmed", "Houari Boumédiène"],
    L("Boudiaf returned in 1992 and was assassinated months later.", "Boudiaf revint en 1992 et fut assassiné quelques mois plus tard.", "عاد بوضياف سنة 1992 واغتيل بعد أشهر."),
  ),
  // ---------- Ben Bella ----------
  make("benbella-1", "easy",
    [
      L("I was the first president of independent Algeria, in 1963.", "Premier président de l'Algérie indépendante, 1963.", "أوّل رئيس للجزائر المستقلة سنة 1963."),
      L("I was a founding figure of the FLN.", "Figure fondatrice du FLN.", "من مؤسسي جبهة التحرير."),
    ],
    "Ahmed Ben Bella", ["Houari Boumédiène", "Mohamed Boudiaf", "Hocine Aït Ahmed"],
    L("Ahmed Ben Bella was independent Algeria's first president.", "Ahmed Ben Bella fut le premier président de l'Algérie indépendante.", "كان أحمد بن بلة أوّل رئيس للجزائر المستقلة."),
  ),
  // ---------- Boumediene ----------
  make("boumediene-1", "easy",
    [
      L("I led Algeria from 1965 to 1978.", "Je dirigeai l'Algérie de 1965 à 1978.", "حكمتُ الجزائر من 1965 إلى 1978."),
      L("Under my rule Algeria nationalized its hydrocarbons in 1971.", "Sous mon règne, l'Algérie nationalisa ses hydrocarbures en 1971.", "في عهدي أُمّمت المحروقات سنة 1971."),
    ],
    "Houari Boumédiène", ["Ahmed Ben Bella", "Mohamed Boudiaf", "Hocine Aït Ahmed"],
    L("Boumédiène took power in 1965 and led major state-building.", "Boumédiène prit le pouvoir en 1965.", "تولى بومدين السلطة سنة 1965 وقاد بناء الدولة."),
  ),
  // ---------- Messali Hadj ----------
  make("messali-1", "medium",
    [
      L("I am called a pioneer of modern Algerian nationalism.", "Pionnier du nationalisme algérien moderne.", "رائد الحركة الوطنية الجزائرية الحديثة."),
      L("I founded successive parties from the late 1920s.", "Je fondai des partis dès la fin des années 1920.", "أسّستُ أحزابًا منذ أواخر العشرينات."),
    ],
    "Messali Hadj", ["Ferhat Abbas", "Ahmed Ben Bella", "Hocine Aït Ahmed"],
    L("Messali Hadj was a pioneer of independence politics before the FLN.", "Messali Hadj fut un pionnier avant le FLN.", "كان مصالي الحاج رائدًا للسياسة الاستقلالية قبل جبهة التحرير."),
  ),
  // ---------- Aït Ahmed ----------
  make("ait-ahmed-1", "medium",
    [
      L("I was a historic chief of November 1954 from Kabylie.", "Chef historique de novembre 1954, de Kabylie.", "من قادة نوفمبر 1954 من القبائل."),
      L("After independence, I founded the FFS opposition party.", "Après l'indépendance, je fondai le FFS.", "بعد الاستقلال أسّستُ جبهة القوى الاشتراكية."),
    ],
    "Hocine Aït Ahmed", ["Krim Belkacem", "Ahmed Ben Bella", "Mohamed Boudiaf"],
    L("Aït Ahmed founded the FFS and remained a long-standing democratic voice.", "Aït Ahmed fonda le FFS, voix démocratique de longue date.", "أسّس آيت أحمد جبهة القوى الاشتراكية وبقي صوتًا ديمقراطيًا."),
  ),
  // ---------- Zighoud ----------
  make("zighoud-1", "medium",
    [
      L("I succeeded Didouche Mourad in the North Constantine zone.", "Je succédai à Didouche Mourad.", "خَلَفتُ ديدوش مراد في الشمال القسنطيني."),
      L("I organized the August 20, 1955 offensive.", "J'organisai l'offensive du 20 août 1955.", "نظّمتُ هجوم 20 أوت 1955."),
    ],
    "Zighoud Youcef", ["Didouche Mourad", "Larbi Ben M'hidi", "Mostefa Ben Boulaïd"],
    L("The August 20, 1955 offensive was a turning point of the revolution.", "L'offensive du 20 août 1955 fut un tournant.", "كان هجوم 20 أوت 1955 منعطفًا في الثورة."),
  ),
  // ---------- Hassiba ----------
  make("hassiba-1", "medium",
    [
      L("I was a young militant of the Battle of Algiers.", "Jeune militante de la Bataille d'Alger.", "مناضلة شابة في معركة الجزائر."),
      L("I died in 1957 in the explosion of a Casbah safehouse.", "Je mourus en 1957 dans une planque à la Casbah.", "استُشهدتُ سنة 1957 في تفجير مخبأ بالقصبة."),
    ],
    "Hassiba Ben Bouali", ["Djamila Bouhired", "Djamila Boupacha", "Lalla Fatma N'Soumer"],
    L("Hassiba Ben Bouali died alongside Ali La Pointe in 1957.", "Hassiba Ben Bouali mourut avec Ali La Pointe en 1957.", "استُشهدت حسيبة بن بوعلي مع علي لابوانت سنة 1957."),
  ),
  // ---------- Ali La Pointe ----------
  make("ali-pointe-1", "easy",
    [
      L("I led urban operations of the FLN in the Casbah.", "Je dirigeai les opérations urbaines du FLN à la Casbah.", "قُدتُ عمليات حضرية لجبهة التحرير في القصبة."),
      L("I died when paratroopers blew up my safehouse.", "Je mourus quand les paras firent sauter ma planque.", "استُشهدتُ حين فجّر المظليون مخبئي."),
    ],
    "Ali La Pointe", ["Larbi Ben M'hidi", "Hassiba Ben Bouali", "Djamila Bouhired"],
    L("Ali La Pointe was an iconic figure of the urban Battle of Algiers.", "Ali La Pointe fut emblématique de la Bataille d'Alger urbaine.", "كان علي لابوانت رمزًا في معركة الجزائر الحضرية."),
  ),
  // ---------- Djamila Bouhired ----------
  make("bouhired-1", "easy",
    [
      L("I was sentenced to death during the Battle of Algiers.", "Condamnée à mort pendant la Bataille d'Alger.", "حُكم عليّ بالإعدام خلال معركة الجزائر."),
      L("International protests helped commute my sentence.", "Des protestations internationales firent commuer ma peine.", "ساعدت الاحتجاجات الدولية في تخفيف حكمي."),
    ],
    "Djamila Bouhired", ["Hassiba Ben Bouali", "Djamila Boupacha", "Assia Djebar"],
    L("Djamila Bouhired became a global symbol of Algerian women in the revolution.", "Djamila Bouhired devint un symbole mondial.", "صارت جميلة بوحيرد رمزًا عالميًا."),
  ),
  // ---------- Boupacha ----------
  make("boupacha-1", "hard",
    [
      L("I publicly denounced torture I suffered after my 1960 arrest.", "Je dénonçai les tortures subies après 1960.", "فضحتُ علنًا التعذيب بعد اعتقالي سنة 1960."),
      L("Picasso drew my portrait in support of my case.", "Picasso dessina mon portrait pour soutenir mon affaire.", "رسم بيكاسو صورتي دعمًا لقضيتي."),
    ],
    "Djamila Boupacha", ["Djamila Bouhired", "Hassiba Ben Bouali", "Assia Djebar"],
    L("Boupacha's case helped expose torture during the war.", "L'affaire Boupacha exposa la torture pendant la guerre.", "ساعدت قضية بوباشا في كشف التعذيب."),
  ),
  // ---------- Fanon ----------
  make("fanon-1", "medium",
    [
      L("I was a Martinican-born psychiatrist who joined the Algerian revolution.", "Psychiatre né en Martinique ayant rejoint la révolution algérienne.", "طبيب نفسي وُلد في المارتينيك والتحق بالثورة الجزائرية."),
      L("I wrote \"The Wretched of the Earth\".", "J'ai écrit « Les Damnés de la terre ».", "ألّفتُ كتاب «معذّبو الأرض»."),
    ],
    "Frantz Fanon", ["Ferhat Abbas", "Mouloud Feraoun", "Kateb Yacine"],
    L("Fanon worked at Blida hospital and wrote major works on decolonization.", "Fanon exerça à Blida et écrivit sur la décolonisation.", "عمل فانون في مستشفى البليدة وكتب في التحرّر من الاستعمار."),
  ),
  // ---------- Kateb Yacine ----------
  make("kateb-1", "medium",
    [
      L("I wrote the landmark novel \"Nedjma\".", "J'ai écrit le roman « Nedjma ».", "كتبتُ رواية «نجمة»."),
      L("I called French \"a spoil of war\".", "J'ai appelé le français « un butin de guerre ».", "وصفتُ الفرنسية بأنها «غنيمة حرب»."),
    ],
    "Kateb Yacine", ["Mohammed Dib", "Mouloud Mammeri", "Mouloud Feraoun"],
    L("Kateb Yacine is a founding voice of modern Algerian literature.", "Kateb Yacine, voix fondatrice de la littérature algérienne.", "كاتب ياسين صوتٌ مؤسس للأدب الجزائري الحديث."),
  ),
  // ---------- Mammeri ----------
  make("mammeri-1", "hard",
    [
      L("I devoted my life to Berber language and oral poetry.", "Vie consacrée à la langue et à la poésie orale berbères.", "نذرتُ حياتي للأمازيغية والشعر الشفوي."),
      L("The cancellation of one of my lectures sparked the 1980 Berber Spring.", "L'annulation d'une de mes conférences déclencha le Printemps berbère de 1980.", "أشعل منع محاضرتي ربيع الأمازيغ سنة 1980."),
    ],
    "Mouloud Mammeri", ["Mouloud Feraoun", "Kateb Yacine", "Mohammed Dib"],
    L("Mammeri's research is foundational for the recognition of Tamazight.", "Les travaux de Mammeri sont fondateurs pour le tamazight.", "أبحاث معمري أساسٌ للاعتراف بالأمازيغية."),
  ),
  // ---------- Dib ----------
  make("dib-1", "medium",
    [
      L("I was born in Tlemcen and wrote an Algeria trilogy.", "Né à Tlemcen, auteur d'une trilogie sur l'Algérie.", "وُلدتُ في تلمسان وكتبتُ ثلاثية عن الجزائر."),
      L("My first novel appeared in 1952, before the war.", "Premier roman paru en 1952, avant la guerre.", "صدرت روايتي الأولى سنة 1952 قبل الحرب."),
    ],
    "Mohammed Dib", ["Kateb Yacine", "Mouloud Feraoun", "Malek Haddad"],
    L("Mohammed Dib is a founding novelist of Algerian literature in French.", "Mohammed Dib, romancier fondateur en français.", "محمد ديب من مؤسسي الرواية الجزائرية بالفرنسية."),
  ),
  // ---------- Haddad ----------
  make("haddad-1", "hard",
    [
      L("I called the French language my \"exile\".", "J'ai appelé le français mon « exil ».", "وصفتُ الفرنسية بأنها «منفاي»."),
      L("After independence I chose silence in French.", "Après l'indépendance, je choisis le silence.", "آثرتُ الصمت بالفرنسية بعد الاستقلال."),
    ],
    "Malek Haddad", ["Mohammed Dib", "Kateb Yacine", "Mouloud Feraoun"],
    L("Malek Haddad expressed the linguistic dilemma of his generation.", "Malek Haddad exprima le dilemme linguistique de sa génération.", "عبّر مالك حداد عن المعضلة اللغوية لجيله."),
  ),
  // ---------- El Hasnaoui ----------
  make("hasnaoui-1", "hard",
    [
      L("I was a Kabyle singer who lived much of my life in France.", "Chanteur kabyle ayant vécu en France.", "مغنٍّ قبائلي عاش معظم حياته في فرنسا."),
      L("My songs centered on exile, love and longing.", "Chansons d'exil, d'amour et de nostalgie.", "أغانيّ عن الغربة والحب والحنين."),
    ],
    "Cheikh El Hasnaoui", ["Idir", "Lounès Matoub", "El Hadj M'Hamed El Anka"],
    L("El Hasnaoui shaped a poetic Kabyle song of emigration.", "El Hasnaoui façonna une chanson kabyle de l'émigration.", "أرسى الشيخ الحسناوي أغنية قبائلية عن الهجرة."),
  ),
  // ---------- El Anka ----------
  make("anka-1", "easy",
    [
      L("I am considered the founding father of modern chaâbi.", "Père fondateur du chaâbi moderne.", "الأب المؤسس للشعبي الحديث."),
      L("I performed for decades in the cafés of the Casbah of Algiers.", "Décennies de chant à la Casbah d'Alger.", "غنّيتُ عقودًا في مقاهي قصبة الجزائر."),
    ],
    "El Hadj M'Hamed El Anka", ["Cheikh El Hasnaoui", "Idir", "Cheb Khaled"],
    L("El Anka is the master of Algerian chaâbi music.", "El Anka est le maître du chaâbi algérien.", "الحاج العنقا شيخ الشعبي الجزائري."),
  ),
  // ---------- Warda ----------
  make("warda-1", "easy",
    [
      L("I was a great female voice of Arabic song with Algerian roots.", "Grande voix féminine de la chanson arabe d'origine algérienne.", "من كبريات أصوات الأغنية العربية النسائية، من أصول جزائرية."),
      L("I sang patriotic songs broadcast during the war of independence.", "Chants patriotiques pendant la guerre.", "أناشيد وطنية بُثّت خلال الحرب."),
    ],
    "Warda al-Jazairia", ["Cheb Khaled", "Idir", "Assia Djebar"],
    L("Warda al-Jazairia is a great Algerian voice of Arabic song.", "Warda El Djazaïria, grande voix algérienne de la chanson arabe.", "وردة الجزائرية من كبريات أصوات الأغنية العربية."),
  ),
  // ---------- Khaled ----------
  make("khaled-1", "easy",
    [
      L("I am a famous singer from Oran.", "Célèbre chanteur d'Oran.", "مغنٍّ شهير من وهران."),
      L("I helped take raï music to a global audience.", "J'ai porté le raï à un public mondial.", "أوصلتُ الراي إلى جمهور عالمي."),
    ],
    "Cheb Khaled", ["Idir", "El Hadj M'Hamed El Anka", "Warda al-Jazairia"],
    L("Cheb Khaled is the most internationally famous voice of Algerian raï.", "Cheb Khaled est la voix la plus célèbre du raï algérien.", "الشاب خالد هو الصوت الدولي الأشهر للراي."),
  ),
  // ---------- Tassadit Yacine ----------
  make("tassadit-1", "hard",
    [
      L("I am an anthropologist focused on Berber language and oral poetry.", "Anthropologue spécialisée en langue berbère et poésie orale.", "أنثروبولوجية متخصّصة في الأمازيغية والشعر الشفوي."),
      L("My work continues the path opened by Mouloud Mammeri.", "Mon travail prolonge celui de Mouloud Mammeri.", "يمتدّ عملي على درب مولود معمري."),
    ],
    "Tassadit Yacine", ["Assia Djebar", "Mouloud Mammeri", "Mouloud Feraoun"],
    L("Tassadit Yacine is a leading scholar of Berber and women's studies.", "Tassadit Yacine, chercheuse majeure des études berbères.", "تاسعديت ياسين باحثة بارزة في الدراسات الأمازيغية."),
  ),
  // ---------- Curated additions ----------
  make("ptolemy-1", "medium",
    [
      L("My mother was Cleopatra Selene, daughter of the famous Cleopatra.", "Ma mère, Cléopâtre Séléné, était fille de la fameuse Cléopâtre.", "أمي كليوباترا سيليني، ابنة كليوباترا الشهيرة."),
      L("I was the last king of Mauretania.", "Je fus le dernier roi de Maurétanie.", "كنتُ آخر ملوك موريتانيا."),
      L("A Roman emperor had me killed for jealousy.", "Un empereur romain me fit tuer par jalousie.", "أمر إمبراطور روماني بقتلي حسدًا."),
    ],
    "Ptolemy of Mauretania", ["Juba II", "Juba I", "Massinissa"],
    L("Ptolemy was the last king of Mauretania, killed by Caligula.", "Ptolémée fut le dernier roi de Maurétanie, tué par Caligula.", "بطليموس آخر ملوك موريتانيا، قتله كاليغولا."),
  ),
  make("apuleius-1", "medium",
    [
      L("I was born in Madaurus, in today's eastern Algeria.", "Je suis né à Madaure, dans l'actuelle Algérie orientale.", "وُلدتُ في مادوروس بشرق الجزائر اليوم."),
      L("I wrote a famous Latin novel about a man turned into a donkey.", "J'ai écrit un célèbre roman latin sur un homme changé en âne.", "كتبتُ رواية لاتينية شهيرة عن رجل تحوّل إلى حمار."),
    ],
    "Apuleius of Madaurus", ["Augustine of Hippo", "Ibn Khaldun", "Septimius Severus"],
    L("Apuleius wrote The Golden Ass, the only complete surviving Latin novel.", "Apulée est l'auteur de L'Âne d'or, seul roman latin conservé entier.", "أبوليوس مؤلف «الحمار الذهبي»، الرواية اللاتينية الوحيدة المكتملة."),
  ),
  make("firmus-1", "hard",
    [
      L("I was a Berber prince from the mountains of today's Kabylie.", "J'étais un prince berbère des montagnes de l'actuelle Kabylie.", "كنتُ أميرًا أمازيغيًا من جبال القبائل اليوم."),
      L("I rose against corrupt Roman officials and was crushed by Theodosius.", "Je me suis soulevé contre des officiels romains corrompus et fus écrasé par Théodose.", "ثرتُ على ولاة رومان فاسدين وسحقتني حملة ثيودوسيوس."),
    ],
    "Firmus", ["Tacfarinas", "Jugurtha", "Massinissa"],
    L("Firmus led one of the largest revolts of late Roman Africa.", "Firmus mena l'une des plus grandes révoltes de l'Afrique romaine tardive.", "قاد فيرموس إحدى أكبر ثورات إفريقيا الرومانية المتأخرة."),
  ),
  make("tariq-1", "easy",
    [
      L("I crossed a strait in 711 and landed at a great rock.", "J'ai traversé un détroit en 711 et débarqué au pied d'un grand rocher.", "عبرتُ مضيقًا سنة 711 ونزلتُ عند صخرة عظيمة."),
      L("A famous mountain bears my name.", "Une montagne célèbre porte mon nom.", "يحمل جبل شهير اسمي."),
      L("I am said to have burned my ships after landing.", "On dit que j'ai brûlé mes navires après le débarquement.", "يُقال إنني أحرقتُ سفني بعد النزول."),
    ],
    "Tariq ibn Ziyad", ["Yusuf ibn Tashfin", "Abd al-Mu'min", "Kusayla"],
    L("Tariq ibn Ziyad led the 711 landing that began Muslim Andalusia.", "Tariq ibn Ziyad mena le débarquement de 711 qui ouvrit l'Andalousie musulmane.", "قاد طارق بن زياد نزول 711 الذي افتتح الأندلس المسلمة."),
  ),
  make("ziri-1", "hard",
    [
      L("I was a Sanhaja chief loyal to the Fatimids.", "J'étais un chef sanhadja fidèle aux Fatimides.", "كنتُ زعيمًا صنهاجيًا مواليًا للفاطميين."),
      L("I built the mountain stronghold of Ashir.", "J'ai bâti la citadelle montagnarde d'Achir.", "بنيتُ قلعة آشير في الجبال."),
    ],
    "Ziri ibn Manad", ["Buluggin ibn Ziri", "Hammad ibn Buluggin", "Yaghmurasen Ibn Zyan"],
    L("Ziri ibn Manad founded the Zirid line in the central Maghreb.", "Ziri ibn Manad fonda la lignée ziride au Maghreb central.", "أسّس زيري بن مناد السلالة الزيرية في المغرب الأوسط."),
  ),
  make("buluggin-1", "medium",
    [
      L("I governed the Maghreb for the Fatimids when they moved to Egypt.", "Je gouvernai le Maghreb pour les Fatimides après leur départ en Égypte.", "حكمتُ المغرب للفاطميين بعد رحيلهم إلى مصر."),
      L("Tradition credits me with founding medieval Algiers.", "La tradition me donne pour fondateur d'Alger médiévale.", "تنسب إليّ الرواية تأسيس الجزائر في العصر الوسيط."),
    ],
    "Buluggin ibn Ziri", ["Ziri ibn Manad", "Hammad ibn Buluggin", "Abd al-Mu'min"],
    L("Buluggin ibn Ziri is named as founder of medieval Algiers.", "Boulouggin ibn Ziri est cité comme fondateur d'Alger médiévale.", "يُذكر بلكين بن زيري بوصفه مؤسّس مدينة الجزائر في العصر الوسيط."),
  ),
  make("hammad-1", "medium",
    [
      L("I broke from my Zirid cousins and founded my own dynasty.", "Je rompis avec mes cousins zirides et fondai ma propre dynastie.", "انفصلتُ عن أبناء عمومتي الزيريين وأسّستُ سلالتي."),
      L("My mountain capital is now a UNESCO World Heritage site.", "Ma capitale de montagne est aujourd'hui au patrimoine mondial de l'UNESCO.", "عاصمتي الجبلية اليوم مدرجة في تراث اليونسكو العالمي."),
    ],
    "Hammad ibn Buluggin", ["Buluggin ibn Ziri", "Ziri ibn Manad", "Yaghmurasen Ibn Zyan"],
    L("Hammad ibn Buluggin founded the Hammadid dynasty and Qal'at Bani Hammad.", "Hammad ibn Boulouggin fonda la dynastie hammadide et la Qal'at Bani Hammad.", "أسّس حماد بن بلكين الدولة الحمادية وقلعة بني حمّاد."),
  ),
  make("yusuf-tashfin-1", "medium",
    [
      L("I led an empire from the Sahara to Andalusia.", "J'ai dirigé un empire du Sahara à l'Andalousie.", "قُدتُ إمبراطورية من الصحراء إلى الأندلس."),
      L("I founded the city of Marrakesh in 1070.", "J'ai fondé la ville de Marrakech en 1070.", "أسّستُ مدينة مرّاكش سنة 1070."),
      L("I stopped a Christian advance at the battle of Zallaqa.", "J'ai stoppé une avancée chrétienne à la bataille de Zallaqa.", "أوقفتُ زحفًا مسيحيًا في معركة الزلّاقة."),
    ],
    "Yusuf ibn Tashfin", ["Abd al-Mu'min", "Ibn Tumart", "Tariq ibn Ziyad"],
    L("Yusuf ibn Tashfin was the great Almoravid ruler and founder of Marrakesh.", "Youssef ibn Tachfine fut le grand souverain almoravide, fondateur de Marrakech.", "يوسف بن تاشفين عاهل المرابطين الكبير ومؤسّس مرّاكش."),
  ),
  make("ibn-tumart-1", "hard",
    [
      L("I returned from the east preaching strict reform and divine unity.", "Je suis revenu de l'orient prêchant une réforme stricte et l'unicité divine.", "عدتُ من المشرق داعيًا إلى إصلاح صارم والتوحيد."),
      L("I proclaimed myself the awaited Mahdi.", "Je me proclamai Mahdi attendu.", "أعلنتُ أنني المهدي المنتظر."),
    ],
    "Ibn Tumart", ["Abd al-Mu'min", "Yusuf ibn Tashfin", "Sidi Boumediene"],
    L("Ibn Tumart founded the spiritual movement that became the Almohads.", "Ibn Toumart fonda le mouvement spirituel devenu almohade.", "أسّس ابن تومرت الحركة الروحية التي صارت الموحّدين."),
  ),
  make("abd-al-mumin-1", "medium",
    [
      L("I was born near Tlemcen and became Ibn Tumart's chief disciple.", "Je suis né près de Tlemcen et devins le principal disciple d'Ibn Toumart.", "وُلدتُ قرب تلمسان وصرتُ أبرز تلاميذ ابن تومرت."),
      L("I built one of the largest empires the Maghreb has known.", "Je bâtis l'un des plus vastes empires du Maghreb.", "بنيتُ إحدى أوسع الإمبراطوريات في تاريخ المغرب."),
    ],
    "Abd al-Mu'min", ["Ibn Tumart", "Yusuf ibn Tashfin", "Yaghmurasen Ibn Zyan"],
    L("Abd al-Mu'min led the Almohads to rule from the Atlantic to Tripoli.", "Abd al-Mu'min mena les Almohades de l'Atlantique à Tripoli.", "قاد عبد المؤمن الموحّدين من الأطلسي إلى طرابلس."),
  ),
  make("aruj-1", "medium",
    [
      L("I came from the Aegean and answered Algerian calls against Spain.", "Venu de la mer Égée, j'ai répondu aux appels algériens contre l'Espagne.", "جئتُ من بحر إيجة ولبّيتُ نداء الجزائر ضد إسبانيا."),
      L("I was nicknamed Silver-Arm after losing an arm in battle.", "On me surnomma Bras-d'Argent après avoir perdu un bras au combat.", "لُقّبتُ بذي الذراع الفضية بعد أن فقدتُ ذراعي في المعركة."),
      L("My brother Khayr ad-Din continued my work in Algiers.", "Mon frère Khayr ad-Din poursuivit mon œuvre à Alger.", "تابع أخي خير الدين عملي في الجزائر."),
    ],
    "Aruj Barbarossa", ["Khayr ad-Din Barbarossa", "Salah Rais", "Raïs Hamidou"],
    L("Aruj Barbarossa took Algiers and opened the Ottoman alliance.", "Aroudj Barberousse prit Alger et ouvrit l'alliance ottomane.", "استولى عروج بربروس على الجزائر وفتح باب التحالف العثماني."),
  ),
  make("salah-rais-1", "hard",
    [
      L("As beylerbey of Algiers, I retook Bejaia from the Spanish.", "Beylerbey d'Alger, j'ai repris Bejaia aux Espagnols.", "بصفتي بايلربايْ الجزائر، استرجعتُ بجاية من الإسبان."),
      L("I led expeditions deep into the Sahara as far as Touat.", "Je menai des expéditions jusqu'au Touat, au cœur du Sahara.", "قُدتُ حملات إلى عمق الصحراء حتى توات."),
    ],
    "Salah Rais", ["Aruj Barbarossa", "Khayr ad-Din Barbarossa", "Raïs Hamidou"],
    L("Salah Rais extended Algiers's reach from the sea into the Sahara.", "Salah Raïs étendit la portée d'Alger de la mer au Sahara.", "وسّع صالح رايس نفوذ الجزائر من البحر إلى الصحراء."),
  ),
  make("baba-ali-1", "hard",
    [
      L("I took power in Algiers in 1710.", "J'ai pris le pouvoir à Alger en 1710.", "استوليتُ على السلطة في الجزائر سنة 1710."),
      L("I stopped sending the customary tribute to the Ottoman sultan.", "J'ai cessé d'envoyer le tribut habituel au sultan ottoman.", "أوقفتُ إرسال الجباية المعتادة إلى السلطان العثماني."),
    ],
    "Baba Ali Chaouch", ["Hassan Pacha", "Khayr ad-Din Barbarossa", "Salah Rais"],
    L("Baba Ali Chaouch made the Regency of Algiers nearly autonomous.", "Baba Ali Chaouch rendit la Régence d'Alger quasi autonome.", "جعل بابا علي شاوش إيالة الجزائر شبه مستقلّة."),
  ),
  make("bou-baghla-1", "hard",
    [
      L("I was a wandering shaykh nicknamed \"the man on the mule\" in Kabylie.", "J'étais un cheikh itinérant surnommé « l'homme à la mule » en Kabylie.", "كنتُ شيخًا متجوّلًا في القبائل لُقّبتُ بصاحب البغلة."),
      L("I led resistance just before Lalla Fatma N'Soumer.", "J'ai mené la résistance juste avant Lalla Fatma N'Soumer.", "قُدتُ المقاومة قُبيل لالة فاطمة نسومر."),
    ],
    "Bou Baghla", ["Cheikh El Mokrani", "Cheikh Aheddad", "Cheikh Bouamama"],
    L("Bou Baghla kept Kabyle resistance alive in the early 1850s.", "Bou Baghla maintint la résistance kabyle au début des années 1850.", "أبقى بو بغلة المقاومة في القبائل حيّة في مطلع خمسينيات القرن التاسع عشر."),
  ),
  make("ben-nacer-1", "hard",
    [
      L("I led a long revolt in the southern high plains.", "J'ai mené une longue révolte dans les hauts plateaux du sud.", "قُدتُ ثورة طويلة في الهضاب الجنوبية."),
      L("I fought alongside the Ouled Sidi Cheikh.", "J'ai combattu aux côtés des Ouled Sidi Cheikh.", "حاربتُ إلى جانب أولاد سيدي الشيخ."),
    ],
    "Ben Nacer Benchohra", ["Cheikh Bouamama", "Si El-Haoussi", "Mohamed Belkheir"],
    L("Ben Nacer Benchohra is a major figure of southern Algerian resistance.", "Ben Nacer Benchohra est une figure majeure de la résistance du sud algérien.", "بن ناصر بن شهرة من رموز المقاومة في الجنوب الجزائري."),
  ),
  make("si-haoussi-1", "hard",
    [
      L("I was a leader of the Ouled Sidi Cheikh in the western steppes.", "J'étais un chef des Ouled Sidi Cheikh dans les steppes occidentales.", "كنتُ من قادة أولاد سيدي الشيخ في السهوب الغربية."),
      L("My family's revolts tied down French forces for years.", "Les révoltes de ma famille immobilisèrent les forces françaises pendant des années.", "ظلّت ثورات عائلتي تستنزف القوات الفرنسية سنوات."),
    ],
    "Si El-Haoussi", ["Ben Nacer Benchohra", "Cheikh Bouamama", "Mohamed Belkheir"],
    L("Si El-Haoussi was a key chief of the Ouled Sidi Cheikh resistance.", "Si El-Haoussi fut un chef clé de la résistance des Ouled Sidi Cheikh.", "سي الحواسي من أبرز قادة مقاومة أولاد سيدي الشيخ."),
  ),
  make("belkheir-1", "medium",
    [
      L("I am a melhoun poet of the western Algerian high plains.", "Je suis un poète melhoun des hauts plateaux de l'ouest algérien.", "أنا شاعر ملحون من الهضاب الغربية للجزائر."),
      L("The French deported me to New Caledonia.", "Les Français me déportèrent en Nouvelle-Calédonie.", "نفاني الفرنسيون إلى كاليدونيا الجديدة."),
    ],
    "Mohamed Belkheir", ["Cheikh Bouamama", "Mouloud Feraoun", "Cheikh El Hasnaoui"],
    L("Mohamed Belkheir gave the Bouamama revolt its poetic memory.", "Mohamed Belkheir donna à la révolte de Bouamama sa mémoire poétique.", "منح محمد بلخير ثورة بوعمامة ذاكرتها الشعرية."),
  ),
  make("benkhedda-1", "medium",
    [
      L("I was a pharmacist who became a senior FLN political leader.", "Pharmacien, je devins un haut responsable politique du FLN.", "كنتُ صيدليًا وصرتُ من كبار قادة جبهة التحرير السياسيين."),
      L("I led the Provisional Government when the Évian Accords were signed.", "Je dirigeais le Gouvernement provisoire lors de la signature des accords d'Évian.", "كنتُ على رأس الحكومة المؤقتة حين وُقّعت اتفاقيات إيفيان."),
    ],
    "Benyoucef Benkhedda", ["Ferhat Abbas", "Krim Belkacem", "Mohamed Boudiaf"],
    L("Benyoucef Benkhedda led the GPRA at the time of the Évian Accords.", "Benyoucef Benkhedda dirigeait le GPRA lors des accords d'Évian.", "ترأس بن يوسف بن خدّة الحكومة المؤقتة وقت اتفاقيات إيفيان."),
  ),

  // ---------- Lounis Aït Menguellet ----------
  make(
    "ait-menguellet-1",
    "easy",
    [
      L("I am a famous Kabyle poet and singer.", "Je suis un célèbre poète et chanteur kabyle.", "أنا شاعر ومغنٍّ قبائلي شهير."),
      L("I sing in the Berber language about identity, freedom and memory.", "Je chante en langue berbère l'identité, la liberté et la mémoire.", "أغنّي بالأمازيغية عن الهوية والحرية والذاكرة."),
      L("I was born in 1950 in a village in Kabylie.", "Je suis né en 1950 dans un village de Kabylie.", "وُلدتُ سنة 1950 في قرية بمنطقة القبائل."),
    ],
    "Lounis Ait Menguellet",
    ["Idir", "Matoub Lounès", "Mouloud Feraoun"],
    L(
      "Lounis Aït Menguellet is one of the most celebrated Kabyle poet-singers, born in 1950.",
      "Lounis Aït Menguellet est l'un des plus grands poètes-chanteurs kabyles, né en 1950.",
      "لونيس آيت منقلات من أبرز الشعراء والمغنّين القبائليين، من مواليد 1950.",
    ),
  ),
  make(
    "ait-menguellet-2",
    "medium",
    [
      L("True or false: my songs are often read as long poems on Algerian society.", "Vrai ou faux : mes chansons sont souvent lues comme de longs poèmes sur la société algérienne.", "صح أم خطأ: تُقرأ أغانيّ في الغالب كقصائد طويلة عن المجتمع الجزائري."),
      L("Answer: TRUE — many albums are studied like literature.", "Réponse : VRAI — de nombreux albums sont étudiés comme de la littérature.", "الجواب: صحيح — تُدرَس كثير من ألبوماتي كأنها أدب."),
    ],
    "Lounis Ait Menguellet",
    ["Idir", "Matoub Lounès", "Assia Djebar"],
    L(
      "Aït Menguellet's songs are widely studied as poetic and philosophical texts.",
      "Les chansons d'Aït Menguellet sont largement étudiées comme des textes poétiques et philosophiques.",
      "تُدرَس أغاني آيت منقلات على نطاق واسع بوصفها نصوصًا شعرية وفلسفية.",
    ),
  ),
  make(
    "ait-menguellet-3",
    "medium",
    [
      L("Who am I? I turned the Kabyle language into a vehicle for collective reflection.", "Qui suis-je ? J'ai fait de la langue kabyle un vecteur de réflexion collective.", "من أنا؟ حوّلتُ اللغة القبائلية إلى أداة للتأمّل الجماعي."),
      L("My instrument is a simple acoustic guitar.", "Mon instrument est une simple guitare acoustique.", "آلتي قيثارة صوتية بسيطة."),
    ],
    "Lounis Ait Menguellet",
    ["Idir", "Matoub Lounès", "Cheikh El Hasnaoui"],
    L(
      "Aït Menguellet is known for his acoustic guitar and reflective Kabyle lyrics.",
      "Aït Menguellet est connu pour sa guitare acoustique et ses textes kabyles réflexifs.",
      "يُعرف آيت منقلات بقيثارته الصوتية ونصوصه القبائلية التأمّلية.",
    ),
  ),
  make(
    "ait-menguellet-4",
    "hard",
    [
      L("I am called the voice of Amazigh memory and identity.", "On m'appelle la voix de la mémoire et de l'identité amazighes.", "يلقّبونني بصوت الذاكرة والهوية الأمازيغية."),
      L("Unlike louder protest singers, my resistance is quiet, philosophical and patient.", "Contrairement à des chanteurs plus militants, ma résistance est silencieuse, philosophique et patiente.", "بخلاف مغنّين أكثر صخبًا، مقاومتي هادئة فلسفية صبورة."),
    ],
    "Lounis Ait Menguellet",
    ["Matoub Lounès", "Idir", "Krim Belkacem"],
    L(
      "Aït Menguellet embodies a quiet, philosophical form of cultural resistance, distinct from Matoub's militant tone.",
      "Aït Menguellet incarne une résistance culturelle silencieuse et philosophique, distincte du ton militant de Matoub.",
      "يجسّد آيت منقلات مقاومة ثقافية هادئة وفلسفية، تختلف عن النبرة الاحتجاجية لمعطوب.",
    ),
  ),
  make(
    "ait-menguellet-5",
    "hard",
    [
      L("True or false: I was born in the village of Ighil Bouammas in Kabylie.", "Vrai ou faux : je suis né au village d'Ighil Bouammas en Kabylie.", "صح أم خطأ: وُلدتُ في قرية إغيل بوعمّاس بمنطقة القبائل."),
      L("Answer: TRUE.", "Réponse : VRAI.", "الجواب: صحيح."),
    ],
    "Lounis Ait Menguellet",
    ["Idir", "Mouloud Feraoun", "Matoub Lounès"],
    L(
      "Aït Menguellet was indeed born in Ighil Bouammas, a small village in Kabylie.",
      "Aït Menguellet est bien né à Ighil Bouammas, un petit village de Kabylie.",
      "وُلد آيت منقلات فعلًا في إغيل بوعمّاس، قرية صغيرة بمنطقة القبائل.",
    ),
  ),
  // ---------- Moufdi Zakaria ----------
  make(
    "moufdi-zakaria-1",
    "easy",
    [
      L("I am a poet from the M'zab valley.", "Je suis un poète de la vallée du M'zab.", "أنا شاعر من وادي ميزاب."),
      L("I wrote the words of Algeria's national anthem.", "J'ai écrit les paroles de l'hymne national algérien.", "كتبتُ كلمات النشيد الوطني الجزائري."),
      L("My most famous poem begins with the word 'Kassaman'.", "Mon poème le plus célèbre commence par le mot « Kassaman ».", "أشهر قصائدي تبدأ بكلمة «قسماً»."),
    ],
    "Moufdi Zakaria",
    ["Kateb Yacine", "Mohamed Dib", "Mouloud Feraoun"],
    L(
      "Moufdi Zakaria wrote 'Kassaman', adopted as Algeria's national anthem.",
      "Moufdi Zakaria a écrit « Kassaman », adopté comme hymne national algérien.",
      "كتب مفدي زكريا «قسماً» الذي اعتُمد نشيدًا وطنيًا للجزائر.",
    ),
  ),
  make(
    "moufdi-zakaria-2",
    "medium",
    [
      L("I wrote the lyrics of 'Kassaman' in 1955.", "J'ai écrit les paroles de « Kassaman » en 1955.", "كتبتُ كلمات «قسماً» سنة 1955."),
      L("I was a prisoner of the French colonial authorities at the time.", "À l'époque, j'étais prisonnier des autorités coloniales françaises.", "كنتُ آنذاك سجينًا لدى سلطات الاحتلال الفرنسي."),
    ],
    "Moufdi Zakaria",
    ["Larbi Ben M'hidi", "Krim Belkacem", "Frantz Fanon"],
    L(
      "Zakaria wrote 'Kassaman' in 1955 while held in Barberousse prison in Algiers.",
      "Zakaria a écrit « Kassaman » en 1955 alors qu'il était détenu à la prison de Barberousse, à Alger.",
      "كتب زكريا «قسماً» سنة 1955 وهو معتقل في سجن بربروس بالجزائر العاصمة.",
    ),
  ),
  make(
    "moufdi-zakaria-3",
    "medium",
    [
      L("True or false: my poem 'Kassaman' was set to music by Egyptian composer Mohamed Fawzi.", "Vrai ou faux : mon poème « Kassaman » a été mis en musique par le compositeur égyptien Mohamed Fawzi.", "صح أم خطأ: لحّن قصيدتي «قسماً» الموسيقار المصري محمد فوزي."),
      L("Answer: TRUE.", "Réponse : VRAI.", "الجواب: صحيح."),
    ],
    "Moufdi Zakaria",
    ["Kateb Yacine", "Idir", "Warda Al-Jazairia"],
    L(
      "The melody of 'Kassaman' was indeed composed by Mohamed Fawzi, an Egyptian musician.",
      "La mélodie de « Kassaman » a bien été composée par Mohamed Fawzi, un musicien égyptien.",
      "لحن «قسماً» وضعه فعلًا الموسيقار المصري محمد فوزي.",
    ),
  ),
  make(
    "moufdi-zakaria-4",
    "hard",
    [
      L("I am called the 'Poet of the Nation'.", "On m'appelle le « poète de la nation ».", "يلقّبونني بـ«شاعر الأمة»."),
      L("Tradition says I wrote my most famous poem on a prison wall — with my own blood.", "La tradition raconte que j'ai écrit mon poème le plus célèbre sur le mur d'une prison — avec mon propre sang.", "تقول الرواية إنني كتبتُ أشهر قصائدي على جدار زنزانة بدمي."),
    ],
    "Moufdi Zakaria",
    ["Mohamed Belkheir", "Mostefa Ben Boulaïd", "Abdelhamid Ben Badis"],
    L(
      "Zakaria, the 'Poet of the Nation', is said to have written 'Kassaman' on his cell wall in his own blood.",
      "Zakaria, le « poète de la nation », aurait écrit « Kassaman » sur le mur de sa cellule avec son propre sang.",
      "يُقال إن زكريا، «شاعر الأمة»، كتب «قسماً» بدمه على جدار زنزانته.",
    ),
  ),
  make(
    "moufdi-zakaria-5",
    "hard",
    [
      L("I was born in 1908 in Beni Isguen, in the M'zab valley.", "Je suis né en 1908 à Beni Isguen, dans la vallée du M'zab.", "وُلدتُ سنة 1908 في بني يزقن بوادي ميزاب."),
      L("Beyond the anthem, I wrote epic poems celebrating Algeria's struggle and unity.", "Au-delà de l'hymne, j'ai écrit des poèmes épiques célébrant la lutte et l'unité de l'Algérie.", "إلى جانب النشيد، كتبتُ قصائد ملحمية تمجّد كفاح الجزائر ووحدتها."),
    ],
    "Moufdi Zakaria",
    ["Kateb Yacine", "Mohamed Dib", "Lounis Aït Menguellet"],
    L(
      "Born in 1908 in Beni Isguen (M'zab), Zakaria's epic poetry made him a symbol of national identity and unity.",
      "Né en 1908 à Beni Isguen (M'zab), la poésie épique de Zakaria a fait de lui un symbole de l'identité nationale et de l'unité.",
      "وُلد سنة 1908 في بني يزقن (ميزاب)، وجعلت قصائده الملحمية منه رمزًا للهوية الوطنية والوحدة.",
    ),
  ),

  // ---------- Quote-based: "Who said this?" ----------
  make(
    "quote-kassaman",
    "easy",
    [
      L(
        "Who wrote: \"We swear by the lightning that destroys, by the streams of generous blood being shed…\"?",
        "Qui a écrit : « Nous jurons par la foudre destructrice, par les flots de sang généreux versé… » ?",
        "من كتب: «قَسَمًا بالنازلاتِ الماحقاتْ، والدماءِ الزاكياتِ الطاهراتْ…»؟",
      ),
      L(
        "These are the opening words of Algeria's national anthem.",
        "Ce sont les premiers mots de l'hymne national algérien.",
        "هذه هي الكلمات الافتتاحية للنشيد الوطني الجزائري.",
      ),
    ],
    "Moufdi Zakaria",
    ["Kateb Yacine", "Mouloud Mammeri", "Frantz Fanon"],
    L(
      "These are the opening lines of 'Kassaman', written by Moufdi Zakaria in 1956.",
      "Ce sont les premiers vers de « Kassaman », écrits par Moufdi Zakaria en 1956.",
      "هي مطلع «قسماً» التي كتبها مفدي زكريا سنة 1956.",
    ),
  ),
  make(
    "quote-rome-for-sale",
    "medium",
    [
      L(
        "Who is said to have cried: \"Rome is a city for sale\"?",
        "Qui aurait lancé : « Rome est une ville à vendre » ?",
        "من قال: «روما مدينةٌ للبيع»؟",
      ),
      L(
        "He was a Numidian king brought in chains to the city he denounced.",
        "C'était un roi numide conduit enchaîné dans la ville qu'il dénonçait.",
        "كان ملكًا نوميديًا سيق مكبّلًا إلى المدينة التي ندّد بها.",
      ),
    ],
    "Jugurtha",
    ["Massinissa", "Tacfarinas", "Juba I"],
    L(
      "Sallust attributes the famous line to Jugurtha after he bribed Roman senators.",
      "Salluste attribue cette phrase célèbre à Jugurtha après qu'il eut corrompu des sénateurs romains.",
      "ينسب سالوست هذه العبارة الشهيرة إلى يوغرطة بعد رشوته أعضاء مجلس الشيوخ.",
    ),
  ),
  make(
    "quote-mammeri-language",
    "medium",
    [
      L(
        "Who wrote: \"A people who lose their language lose half of themselves\"?",
        "Qui a écrit : « Un peuple qui perd sa langue perd la moitié de lui-même » ?",
        "من قال: «شعبٌ يفقد لغته يفقد نصفَ نفسه»؟",
      ),
      L(
        "An anthropologist and novelist who spent his life saving Tamazight oral memory.",
        "Un anthropologue et romancier qui consacra sa vie à sauver la mémoire orale tamazighte.",
        "عالِم أنثروبولوجيا وروائي كرّس حياته لإنقاذ الذاكرة الشفهية الأمازيغية.",
      ),
    ],
    "Mouloud Mammeri",
    ["Mohamed Dib", "Kateb Yacine", "Assia Djebar"],
    L(
      "Mouloud Mammeri made the defense of language one of the central themes of his work.",
      "Mouloud Mammeri a fait de la défense de la langue l'un des thèmes centraux de son œuvre.",
      "جعل مولود معمري الدفاع عن اللغة من أبرز موضوعات أعماله.",
    ),
  ),
  make(
    "quote-matoub-standing",
    "easy",
    [
      L(
        "Who said: \"I would rather die standing than live on my knees\"?",
        "Qui a dit : « Je préfère mourir debout que vivre à genoux » ?",
        "من قال: «أن أموتَ واقفًا خيرٌ من أن أعيش راكعًا»؟",
      ),
      L(
        "A Kabyle singer who paid with his life for defending Amazigh identity.",
        "Un chanteur kabyle qui paya de sa vie la défense de l'identité amazighe.",
        "مغنٍّ قبائلي دفع حياته ثمنًا للدفاع عن الهوية الأمازيغية.",
      ),
    ],
    "Matoub Lounes",
    ["Idir", "Lounis Aït Menguellet", "Cheikh El Hasnaoui"],
    L(
      "Lounès Matoub embodied this defiance until his assassination in 1998.",
      "Lounès Matoub a incarné cette défiance jusqu'à son assassinat en 1998.",
      "جسّد لونيس معطوب هذا التحدّي حتى اغتياله سنة 1998.",
    ),
  ),
  make(
    "quote-idir-avava",
    "medium",
    [
      L(
        "Who sang \"A Vava Inouva\" — the lullaby that took Tamazight around the world in 1976?",
        "Qui a chanté « A Vava Inouva » — la berceuse qui fit voyager le tamazight dans le monde en 1976 ?",
        "من غنّى «أ فافا إينوفا» — التهويدة التي حملت الأمازيغية إلى العالم سنة 1976؟",
      ),
    ],
    "Idir",
    ["Matoub Lounes", "Lounis Aït Menguellet", "Warda Al-Jazairia"],
    L(
      "Idir's 'A Vava Inouva' was the first Algerian song in Tamazight to gain global success.",
      "« A Vava Inouva » d'Idir fut la première chanson algérienne en tamazight à connaître un succès mondial.",
      "كانت «أ فافا إينوفا» لإيدير أوّل أغنية جزائرية بالأمازيغية تحقّق نجاحًا عالميًا.",
    ),
  ),
  make(
    "quote-fanon-generation",
    "hard",
    [
      L(
        "Who wrote: \"Each generation must, out of relative obscurity, discover its mission, fulfill it, or betray it\"?",
        "Qui a écrit : « Chaque génération doit, dans une relative opacité, découvrir sa mission, l'accomplir ou la trahir » ?",
        "من قال: «على كلّ جيلٍ أن يكتشف، في غموضٍ نسبيّ، رسالتَه، فإمّا أن يحقّقها أو يخونها»؟",
      ),
      L(
        "From a famous book written in Algeria during the war of independence.",
        "Tiré d'un livre célèbre écrit en Algérie pendant la guerre d'indépendance.",
        "من كتاب شهير كُتب في الجزائر إبّان حرب التحرير.",
      ),
    ],
    "Frantz Fanon",
    ["Mouloud Mammeri", "Kateb Yacine", "Ferhat Abbas"],
    L(
      "From Frantz Fanon's 'The Wretched of the Earth' (1961).",
      "Extrait des « Damnés de la Terre » de Frantz Fanon (1961).",
      "من كتاب «معذّبو الأرض» لفرانز فانون (1961).",
    ),
  ),

  // ---------- Amar Imache ----------
  make(
    "imache-1",
    "easy",
    [
      L(
        "I was an early Algerian nationalist and labor activist from Kabylie.",
        "J'étais un militant nationaliste et syndical algérien, originaire de Kabylie.",
        "كنتُ من أوائل المناضلين الوطنيين والنقابيين الجزائريين، من منطقة القبائل.",
      ),
      L(
        "I took part in the Étoile nord-africaine.",
        "J'ai participé à l'Étoile nord-africaine.",
        "شاركتُ في نجم شمال أفريقيا.",
      ),
    ],
    "Amar Imache",
    ["Messali Hadj", "Ferhat Abbas", "Ahmed Ben Bella"],
    L(
      "Amar Imache was a nationalist thinker and activist of the early national movement.",
      "Amar Imache était un penseur et militant nationaliste du début du mouvement national.",
      "كان عمار إيماش مفكّرًا ومناضلًا وطنيًا في بدايات الحركة الوطنية.",
    ),
  ),
  make(
    "imache-2",
    "medium",
    [
      L(
        "I rejected the cult of the leader.",
        "Je rejetais le culte du chef.",
        "رفضتُ عبادة الزعيم.",
      ),
      L(
        "I called for a plural and democratic Algeria.",
        "J'appelais à une Algérie plurielle et démocratique.",
        "دعوتُ إلى جزائر تعددية وديمقراطية.",
      ),
    ],
    "Amar Imache",
    ["Messali Hadj", "Ahmed Ben Bella", "Ferhat Abbas"],
    L(
      "Imache advocated a plural Algeria built on social justice, democracy, and cultural diversity.",
      "Imache défendait une Algérie plurielle, fondée sur la justice sociale, la démocratie et la diversité culturelle.",
      "دافع إيماش عن جزائر تعددية تقوم على العدالة الاجتماعية والديمقراطية والتنوع الثقافي.",
    ),
  ),

  // ---------- Rachid Taha ----------
  make(
    "rachid-taha-1",
    "easy",
    [
      L(
        "I am an Algerian singer who blended raï, rock, and punk.",
        "Je suis un chanteur algérien qui a mélangé raï, rock et punk.",
        "أنا مغنٍّ جزائري مزجتُ بين الراي والروك والبانك.",
      ),
      L(
        "My songs explored exile, identity, and freedom.",
        "Mes chansons exploraient l'exil, l'identité et la liberté.",
        "تناولت أغانيّ الغربة والهوية والحرية.",
      ),
      L(
        "I am known for Ya Rayah and Rock el Casbah.",
        "Je suis connu pour Ya Rayah et Rock el Casbah.",
        "اشتهرتُ بأغنيتَي «يا رايح» و«روك القصبة».",
      ),
    ],
    "Rachid Taha",
    ["Idir", "Matoub", "Ait Menguellet"],
    L(
      "Rachid Taha is celebrated as a rebel voice of Algerian music and a key figure of the diaspora.",
      "Rachid Taha est célébré comme une voix rebelle de la musique algérienne et une figure clé de la diaspora.",
      "يُحتفى برشيد طه بوصفه صوتًا متمرّدًا في الموسيقى الجزائرية ورمزًا للمهجر.",
    ),
  ),
  make(
    "rachid-taha-2",
    "medium",
    [
      L(
        "I am often associated with Algerian diaspora culture.",
        "On m'associe souvent à la culture de la diaspora algérienne.",
        "غالبًا ما أُربط بثقافة المهجر الجزائري.",
      ),
      L(
        "Through music, I gave voice to immigrants and exiles.",
        "Par la musique, j'ai donné une voix aux immigrés et aux exilés.",
        "من خلال الموسيقى، منحتُ المهاجرين والمنفيين صوتًا.",
      ),
    ],
    "Rachid Taha",
    ["Idir", "Khaled", "Matoub"],
    L(
      "Rachid Taha often explored themes of exile, identity, and freedom.",
      "Rachid Taha a souvent exploré les thèmes de l'exil, de l'identité et de la liberté.",
      "تناول رشيد طه في الغالب موضوعات الغربة والهوية والحرية.",
    ),
  ),

  // ---------- Taos Amrouche ----------
  make(
    "taos-amrouche-1",
    "easy",
    [
      L(
        "I am a Kabyle writer and singer.",
        "Je suis une écrivaine et chanteuse kabyle.",
        "أنا كاتبة ومغنّية قبائلية.",
      ),
      L(
        "I devoted my life to preserving Kabyle oral memory.",
        "J'ai consacré ma vie à préserver la mémoire orale kabyle.",
        "كرّستُ حياتي للحفاظ على الذاكرة الشفوية القبائلية.",
      ),
      L(
        "I am the daughter of Fadhma Aït Mansour and sister of Jean Amrouche.",
        "Je suis la fille de Fadhma Aït Mansour et la sœur de Jean Amrouche.",
        "أنا ابنة فاضمة آيت منصور وشقيقة جان عمروش.",
      ),
    ],
    "Taos Amrouche",
    ["Fadhma Aït Mansour Amrouche", "Assia Djebar", "Lalla Fatma N'Soumer"],
    L(
      "Taos Amrouche helped preserve Kabyle oral memory and songs.",
      "Taos Amrouche a contribué à préserver la mémoire orale et les chants kabyles.",
      "ساهمت طاوس عمروش في الحفاظ على الذاكرة الشفوية والأغاني القبائلية.",
    ),
  ),
  make(
    "taos-amrouche-2",
    "medium",
    [
      L(
        "Through songs, stories and writing, I carried an essential part of Amazigh identity.",
        "Par mes chants, mes récits et mes écrits, j'ai porté une part essentielle de l'identité amazighe.",
        "من خلال الغناء والحكايات والكتابة، حملتُ جزءًا مهمًا من الهوية الأمازيغية.",
      ),
      L(
        "I connected literature, music, and memory.",
        "J'ai relié littérature, musique et mémoire.",
        "ربطتُ بين الأدب والموسيقى والذاكرة.",
      ),
    ],
    "Taos Amrouche",
    ["Fadhma Aït Mansour Amrouche", "Jean Amrouche", "Assia Djebar"],
    L(
      "Taos Amrouche is remembered as a transmitter of Kabyle culture across art forms.",
      "Taos Amrouche est reconnue comme une passeuse de la culture kabyle à travers plusieurs arts.",
      "تُذكر طاوس عمروش بوصفها ناقلة للثقافة القبائلية عبر فنون متعددة.",
    ),
  ),

  // ---------- Jean Amrouche ----------
  make(
    "jean-amrouche-1",
    "easy",
    [
      L(
        "I was an Algerian Kabyle writer, poet, and broadcaster.",
        "J'étais un écrivain, poète et homme de radio kabyle algérien.",
        "كنتُ كاتبًا وشاعرًا وإذاعيًا جزائريًا قبائليًا.",
      ),
      L(
        "I helped bring Algerian voices to wider audiences.",
        "J'ai contribué à porter la voix algérienne vers un plus large public.",
        "أسهمتُ في إيصال الصوت الجزائري إلى جمهور أوسع.",
      ),
    ],
    "Jean Amrouche",
    ["Rachid Taha", "Mouloud Feraoun", "Mouloud Mammeri"],
    L(
      "During the War of Independence, Jean Amrouche was mainly an intellectual and cultural voice connected to the Algerian cause.",
      "Pendant la guerre d'indépendance, Jean Amrouche fut surtout une voix intellectuelle et culturelle liée à la cause algérienne.",
      "خلال حرب التحرير، كان جان عمروش أساسًا صوتًا فكريًا وثقافيًا مرتبطًا بالقضية الجزائرية.",
    ),
  ),
  make(
    "jean-amrouche-2",
    "medium",
    [
      L(
        "I connected French-language literature with Algerian identity.",
        "J'ai relié la littérature de langue française à l'identité algérienne.",
        "ربطتُ الأدب الفرنكوفوني بالهوية الجزائرية.",
      ),
      L(
        "I am the son of Fadhma Aït Mansour and brother of Taos Amrouche.",
        "Je suis le fils de Fadhma Aït Mansour et le frère de Taos Amrouche.",
        "أنا ابن فاضمة آيت منصور وشقيق طاوس عمروش.",
      ),
    ],
    "Jean Amrouche",
    ["Taos Amrouche", "Fadhma Aït Mansour Amrouche", "Mouloud Feraoun"],
    L(
      "Jean Amrouche came from a family that carried Kabyle memory across generations.",
      "Jean Amrouche venait d'une famille qui a porté la mémoire kabyle à travers les générations.",
      "ينتمي جان عمروش إلى عائلة حملت الذاكرة القبائلية عبر الأجيال.",
    ),
  ),

  // ---------- Fadhma Aït Mansour Amrouche ----------
  make(
    "fadhma-amrouche-1",
    "easy",
    [
      L(
        "I am a Kabyle writer and keeper of oral tradition.",
        "Je suis une écrivaine kabyle et gardienne de la tradition orale.",
        "أنا كاتبة قبائلية وحارسة للتقاليد الشفوية.",
      ),
      L(
        "I am the mother of Taos and Jean Amrouche.",
        "Je suis la mère de Taos et Jean Amrouche.",
        "أنا أمّ طاوس وجان عمروش.",
      ),
    ],
    "Fadhma Aït Mansour Amrouche",
    ["Taos Amrouche", "Assia Djebar", "Lalla Fatma N'Soumer"],
    L(
      "Fadhma Aït Mansour preserved and transmitted Kabyle memory across generations.",
      "Fadhma Aït Mansour a préservé et transmis la mémoire kabyle à travers les générations.",
      "حافظت فاضمة آيت منصور على الذاكرة القبائلية ونقلتها عبر الأجيال.",
    ),
  ),
  make(
    "fadhma-amrouche-2",
    "medium",
    [
      L(
        "I am often called 'Mother of Memory'.",
        "On m'appelle souvent « Mère de la mémoire ».",
        "غالبًا ما يُطلق عليّ «أمّ الذاكرة».",
      ),
      L(
        "My life and stories nourished the work of my children.",
        "Ma vie et mes récits ont nourri l'œuvre de mes enfants.",
        "غذّت حياتي وحكاياتي أعمال أبنائي.",
      ),
    ],
    "Fadhma Aït Mansour Amrouche",
    ["Taos Amrouche", "Jean Amrouche", "Assia Djebar"],
    L(
      "Fadhma is a symbol of women as carriers of family, language, and cultural memory.",
      "Fadhma est un symbole des femmes comme porteuses de la famille, de la langue et de la mémoire culturelle.",
      "تجسّد فاضمة دور المرأة في حمل الأسرة واللغة والذاكرة الثقافية.",
    ),
  ),
];

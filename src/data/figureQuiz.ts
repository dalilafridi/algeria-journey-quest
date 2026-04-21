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
];

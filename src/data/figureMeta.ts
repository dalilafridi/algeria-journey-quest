import type { LocalizedString } from "@/lib/i18n";

const L = (en: string, fr: string, ar: string): LocalizedString => ({ en, fr, ar });

// ---------- Themes ----------

export type FigureTheme =
  | "identity"
  | "resistance"
  | "exile"
  | "oral-memory"
  | "women-heritage"
  | "literature"
  | "music"
  | "language"
  | "amazigh"
  | "independence"
  | "education"
  | "diaspora"
  | "cinema"
  | "faith"
  | "philosophy";

export const FIGURE_THEMES: Record<
  FigureTheme,
  { label: LocalizedString; emoji: string }
> = {
  identity: { label: L("Identity", "Identité", "الهوية"), emoji: "🪞" },
  resistance: { label: L("Resistance", "Résistance", "مقاومة"), emoji: "🛡️" },
  exile: { label: L("Exile", "Exil", "المنفى"), emoji: "🌊" },
  "oral-memory": { label: L("Oral memory", "Mémoire orale", "الذاكرة الشفوية"), emoji: "🗣️" },
  "women-heritage": { label: L("Women & heritage", "Femmes & patrimoine", "نساء وتراث"), emoji: "🌺" },
  literature: { label: L("Literature", "Littérature", "أدب"), emoji: "📚" },
  music: { label: L("Music", "Musique", "موسيقى"), emoji: "🎶" },
  language: { label: L("Language", "Langue", "اللغة"), emoji: "🔤" },
  amazigh: { label: L("Amazigh culture", "Culture amazighe", "الثقافة الأمازيغية"), emoji: "ⵣ" },
  independence: { label: L("Independence", "Indépendance", "الاستقلال"), emoji: "🕊️" },
  education: { label: L("Education", "Éducation", "التعليم"), emoji: "🎓" },
  diaspora: { label: L("Diaspora", "Diaspora", "المهجر"), emoji: "✈️" },
  cinema: { label: L("Cinema", "Cinéma", "سينما"), emoji: "🎬" },
  faith: { label: L("Faith & reform", "Foi & réforme", "الدين والإصلاح"), emoji: "🕌" },
  philosophy: { label: L("Philosophy", "Philosophie", "فلسفة"), emoji: "💭" },
};

// ---------- Culture links ----------

export type FigureCultureLinkKind =
  | "cuisine"
  | "cinema"
  | "words"
  | "ideas"
  | "moments"
  | "timeline"
  | "lessons";

export type FigureCultureLink = {
  kind: FigureCultureLinkKind;
  label: LocalizedString;
};

const KIND_EMOJI: Record<FigureCultureLinkKind, string> = {
  cuisine: "🍲",
  cinema: "🎬",
  words: "📜",
  ideas: "💡",
  moments: "📜",
  timeline: "🕰️",
  lessons: "📖",
};

export const cultureKindEmoji = (k: FigureCultureLinkKind) => KIND_EMOJI[k];

// ---------- Meta type ----------

export type FigureMeta = {
  cinematicLine?: LocalizedString;
  modernRelevance?: LocalizedString;
  themes?: FigureTheme[];
  relatedFigureIds?: string[];
  cultureLinks?: FigureCultureLink[];
  audioArchive?: {
    status: "planned" | "coming-soon";
    hint?: LocalizedString;
  };
};

// ---------- Curated data ----------

export const figureMeta: Record<string, FigureMeta> = {
  // ===== Antiquity =====
  massinissa: {
    cinematicLine: L("He stitched a kingdom from rival tribes.", "Il a tissé un royaume à partir de tribus rivales.", "نسج مملكة من قبائل متنافسة."),
    modernRelevance: L(
      "His Numidian state remains a reference point for Algerian sovereignty and Amazigh pride.",
      "Son État numide reste une référence pour la souveraineté algérienne et la fierté amazighe.",
      "تظل دولته النوميدية مرجعاً للسيادة الجزائرية وللاعتزاز الأمازيغي.",
    ),
    themes: ["identity", "amazigh"],
    relatedFigureIds: ["jugurtha", "syphax", "juba-i", "juba-ii"],
    cultureLinks: [
      { kind: "timeline", label: L("Numidia on the timeline", "La Numidie sur la frise", "نوميديا في الخط الزمني") },
    ],
  },
  jugurtha: {
    cinematicLine: L("He bought Rome, until Rome could no longer be bought.", "Il a acheté Rome, jusqu'à ce que Rome ne soit plus à vendre.", "اشترى روما حتى عجزت روما عن أن تُشترى."),
    modernRelevance: L(
      "A symbol of defiance against empire — quoted across Algerian schoolbooks and resistance memory.",
      "Symbole de défi face à l'empire, cité dans les manuels et la mémoire algérienne de la résistance.",
      "رمز للتحدي في وجه الإمبراطورية، حاضر في المناهج وذاكرة المقاومة الجزائرية.",
    ),
    themes: ["resistance", "identity", "amazigh"],
    relatedFigureIds: ["massinissa", "tacfarinas", "dihya"],
  },
  "juba-ii": {
    cinematicLine: L("A king who wrote as much as he ruled.", "Un roi qui écrivit autant qu'il régna.", "ملك كتب بقدر ما حكم."),
    modernRelevance: L(
      "Reminds us that North Africa was a producer of scholarship, not only a recipient of it.",
      "Rappelle que l'Afrique du Nord a produit du savoir, pas seulement reçu.",
      "تذكير بأن شمال إفريقيا كان منتجاً للمعرفة لا مستهلكاً لها فحسب.",
    ),
    themes: ["literature", "education"],
    relatedFigureIds: ["massinissa", "ptolemy-mauretania", "apuleius"],
  },
  augustine: {
    cinematicLine: L("He turned a restless life into a language for the soul.", "Il a transformé une vie inquiète en une langue pour l'âme.", "حوّل حياة قلقة إلى لغة للروح."),
    modernRelevance: L(
      "Born in what is now Souk Ahras — a constant reminder that universal thought has Algerian soil under it.",
      "Né dans l'actuelle Souk Ahras — preuve que la pensée universelle a aussi des racines algériennes.",
      "وُلد في سوق أهراس الحالية — شاهد على أن الفكر الكوني له جذور جزائرية.",
    ),
    themes: ["philosophy", "literature", "faith"],
    relatedFigureIds: ["apuleius", "ibn-khaldun"],
    cultureLinks: [
      { kind: "ideas", label: L("Ideas from North Africa", "Idées d'Afrique du Nord", "أفكار من شمال إفريقيا") },
    ],
  },

  // ===== Medieval / Islamic =====
  "tariq-ibn-ziyad": {
    cinematicLine: L("He burned the ships and gave a strait its name.", "Il brûla les navires et donna son nom à un détroit.", "أحرق السفن فحمل المضيق اسمه."),
    modernRelevance: L(
      "Anchors Algeria's place in the wider Mediterranean and Andalusian story.",
      "Ancre la place de l'Algérie dans l'histoire méditerranéenne et andalouse.",
      "يرسّخ مكانة الجزائر في الحكاية المتوسطية والأندلسية.",
    ),
    themes: ["amazigh", "faith"],
    relatedFigureIds: ["kusayla", "yusuf-ibn-tashfin"],
  },
  "ibn-khaldun": {
    cinematicLine: L("He listened to the desert and heard a science.", "Il a écouté le désert et y a entendu une science.", "أنصت إلى الصحراء فسمع منها علماً."),
    modernRelevance: L(
      "His ʿasabiyya still frames how Algerians read power, kinship, and the rise and fall of regimes.",
      "Son ʿasabiyya éclaire encore la lecture algérienne du pouvoir, du lien social et des cycles politiques.",
      "لا تزال عصبيته إطاراً لقراءة الجزائريين للسلطة والروابط الاجتماعية وصعود الأنظمة وأفولها.",
    ),
    themes: ["philosophy", "education", "literature"],
    relatedFigureIds: ["augustine", "malek-bennabi", "ben-badis"],
    cultureLinks: [
      { kind: "ideas", label: L("Ideas of asabiyya & power", "Idées : ʿasabiyya et pouvoir", "أفكار: العصبية والسلطة") },
    ],
  },

  // ===== Colonial resistance =====
  dihya: {
    cinematicLine: L("A queen who chose the highlands over surrender.", "Une reine qui choisit les hauteurs plutôt que la soumission.", "ملكة آثرت الجبال على الاستسلام."),
    modernRelevance: L(
      "Carried by Amazigh and feminist memory as a founding image of defiance.",
      "Portée par la mémoire amazighe et féministe comme image fondatrice du défi.",
      "تحملها الذاكرة الأمازيغية والنسوية بوصفها صورة مؤسِّسة للتحدي.",
    ),
    themes: ["resistance", "amazigh", "women-heritage", "identity"],
    relatedFigureIds: ["kusayla", "lalla-fatma-nsoumer", "tacfarinas"],
  },
  abdelkader: {
    cinematicLine: L("Sword in one hand, an open book in the other.", "Le sabre d'une main, un livre ouvert de l'autre.", "السيف في يد والكتاب في الأخرى."),
    modernRelevance: L(
      "Modern Algeria still claims his blend of arms, ethics, and Sufi thought as its founding posture.",
      "L'Algérie moderne revendique son alliage d'armes, d'éthique et de soufisme comme posture fondatrice.",
      "لا تزال الجزائر الحديثة ترى في مزجه بين السلاح والأخلاق والفكر الصوفي قواماً تأسيسياً لها.",
    ),
    themes: ["resistance", "faith", "philosophy", "identity"],
    relatedFigureIds: ["lalla-fatma-nsoumer", "el-mokrani", "cheikh-aheddad", "ben-badis"],
    cultureLinks: [
      { kind: "moments", label: L("Founding moments of resistance", "Moments fondateurs de la résistance", "لحظات تأسيسية في المقاومة") },
    ],
  },
  "lalla-fatma-nsoumer": {
    cinematicLine: L("The Kabyle mountain answered in her voice.", "La montagne kabyle répondit par sa voix.", "أجابت جبال القبائل بصوتها."),
    modernRelevance: L(
      "A model for women's leadership rooted in faith, land, and community — not borrowed from outside.",
      "Modèle d'un leadership féminin enraciné dans la foi, la terre et la communauté, non importé.",
      "نموذج لقيادة نسائية متجذرة في الإيمان والأرض والمجتمع، غير مستورد.",
    ),
    themes: ["resistance", "women-heritage", "amazigh", "faith"],
    relatedFigureIds: ["dihya", "abdelkader", "el-mokrani"],
  },
  "el-mokrani": {
    cinematicLine: L("He raised the standard one last time, knowing the cost.", "Il leva l'étendard une dernière fois, sachant le prix.", "رفع الراية مرة أخيرة وهو يعرف الثمن."),
    modernRelevance: L(
      "His 1871 revolt explains the dispossession that still shapes Kabyle land memory and emigration.",
      "Sa révolte de 1871 explique la dépossession qui marque encore la mémoire foncière kabyle et l'émigration.",
      "تفسر ثورته عام 1871 الاستلاب الذي لا يزال يطبع ذاكرة الأرض في القبائل والهجرة.",
    ),
    themes: ["resistance", "amazigh"],
    relatedFigureIds: ["cheikh-aheddad", "lalla-fatma-nsoumer", "abdelkader"],
  },

  // ===== War of Independence =====
  "abane-ramdane": {
    cinematicLine: L("He turned ideas into strategy.", "Il transforma les idées en stratégie.", "حوّل الأفكار إلى استراتيجية."),
    modernRelevance: L(
      "His insistence on civilian primacy and political clarity still haunts Algerian debates about power.",
      "Son exigence du primat du politique sur le militaire hante encore les débats algériens sur le pouvoir.",
      "لا يزال إصراره على أولوية السياسي على العسكري حاضراً في النقاش الجزائري حول السلطة.",
    ),
    themes: ["independence", "philosophy", "resistance"],
    relatedFigureIds: ["krim-belkacem", "ben-mhidi", "amirouche", "benyoucef-benkhedda"],
    cultureLinks: [
      { kind: "moments", label: L("Soummam Congress moment", "Congrès de la Soummam", "مؤتمر الصومام") },
    ],
  },
  "ben-mhidi": {
    cinematicLine: L("\"Throw the revolution into the street, and the people will carry it.\"", "« Jetez la révolution dans la rue, le peuple la portera. »", "«ألقوا الثورة في الشارع يحملها الشعب»."),
    modernRelevance: L(
      "His arrest and death in the Battle of Algiers remain a measure of dignity under torture.",
      "Son arrestation et sa mort lors de la Bataille d'Alger restent une mesure de dignité sous la torture.",
      "اعتقاله وموته في معركة الجزائر مقياسٌ للكرامة تحت التعذيب.",
    ),
    themes: ["independence", "resistance"],
    relatedFigureIds: ["abane-ramdane", "ali-la-pointe", "hassiba-ben-bouali", "djamila-bouhired"],
  },
  "krim-belkacem": {
    cinematicLine: L("He carried the maquis from the mountains to the negotiating table.", "Il a porté le maquis des montagnes à la table de négociation.", "حمل المقاومة من الجبال إلى طاولة المفاوضات."),
    modernRelevance: L(
      "Signed Evian — a reminder that armed struggle had to learn diplomacy to finish what it started.",
      "Signataire d'Évian — rappel que la lutte armée a dû apprendre la diplomatie pour aboutir.",
      "موقّع اتفاقيات إيفيان — تذكير بأن الكفاح المسلح كان عليه أن يتعلم الدبلوماسية ليُكمل ما بدأه.",
    ),
    themes: ["independence", "resistance"],
    relatedFigureIds: ["abane-ramdane", "ben-mhidi", "ait-ahmed"],
  },
  amirouche: {
    cinematicLine: L("A commander whose name still echoes in the Djurdjura.", "Un chef dont le nom résonne encore dans le Djurdjura.", "قائد لا يزال اسمه يتردد في جبال جرجرة."),
    modernRelevance: L(
      "His Wilaya III legacy is central to how Kabylie remembers its sacrifice in 1954–62.",
      "Son héritage de la Wilaya III est central dans la mémoire kabyle du sacrifice 1954-62.",
      "إرثه في الولاية الثالثة محوريّ في ذاكرة القبائل لتضحيات 1954-1962.",
    ),
    themes: ["independence", "resistance", "amazigh"],
    relatedFigureIds: ["abane-ramdane", "krim-belkacem", "ait-ahmed"],
  },
  "hassiba-ben-bouali": {
    cinematicLine: L("Twenty years old, and unafraid of the explosion.", "Vingt ans, et sans peur de l'explosion.", "في العشرين من عمرها، ولم تخشَ الانفجار."),
    modernRelevance: L(
      "A name Algerian girls grow up hearing — proof that the revolution was also young and female.",
      "Un nom que les jeunes Algériennes connaissent depuis l'enfance — preuve que la révolution fut aussi jeune et féminine.",
      "اسم تنشأ الفتيات الجزائريات على سماعه — دليل أن الثورة كانت أيضاً شابة وأنثوية.",
    ),
    themes: ["independence", "women-heritage", "resistance"],
    relatedFigureIds: ["djamila-bouhired", "djamila-boupacha", "ali-la-pointe", "ben-mhidi"],
  },
  "djamila-bouhired": {
    cinematicLine: L("She made a courtroom into a tribune for a nation.", "Elle fit d'un tribunal la tribune d'une nation.", "حوّلت قاعة المحكمة منبراً لأمة."),
    modernRelevance: L(
      "Her trial reframed Algerian independence as a global feminist and anti-colonial cause.",
      "Son procès a fait de l'indépendance algérienne une cause féministe et anticoloniale mondiale.",
      "حوّلت محاكمتها استقلال الجزائر إلى قضية نسوية ومناهضة للاستعمار بُعدها عالمي.",
    ),
    themes: ["women-heritage", "independence", "resistance"],
    relatedFigureIds: ["hassiba-ben-bouali", "djamila-boupacha", "frantz-fanon"],
  },

  // ===== Thought & letters =====
  "ben-badis": {
    cinematicLine: L("\"Islam is my religion, Arabic my language, Algeria my homeland.\"", "« L'Islam est ma religion, l'arabe ma langue, l'Algérie ma patrie. »", "«الإسلام ديني، والعربية لغتي، والجزائر وطني»."),
    modernRelevance: L(
      "His Ulema reform still shapes Algerian debates on schooling, language, and national identity.",
      "Sa réforme des oulémas structure encore les débats algériens sur l'école, la langue et l'identité.",
      "لا يزال إصلاح جمعية العلماء يصوغ النقاش حول التعليم واللغة والهوية في الجزائر.",
    ),
    themes: ["faith", "education", "identity", "language"],
    relatedFigureIds: ["malek-bennabi", "moufdi-zakaria", "messali-hadj"],
    cultureLinks: [
      { kind: "ideas", label: L("Ideas: language & nation", "Idées : langue et nation", "أفكار: اللغة والأمة") },
    ],
  },
  "malek-bennabi": {
    cinematicLine: L("He asked why civilisations rise — and why they consent to fall.", "Il a demandé pourquoi les civilisations s'élèvent — et pourquoi elles consentent à choir.", "تساءل لمَ تنهض الحضارات ولمَ تقبل سقوطها."),
    modernRelevance: L(
      "His idea of 'colonisability' is still cited when Algerians debate post-independence stagnation.",
      "Sa notion de « colonisabilité » est encore citée dans les débats sur la stagnation post-indépendance.",
      "لا تزال فكرته عن «القابلية للاستعمار» تُستحضر في نقاش الركود ما بعد الاستقلال.",
    ),
    themes: ["philosophy", "education", "faith"],
    relatedFigureIds: ["ben-badis", "ibn-khaldun", "frantz-fanon"],
  },
  "frantz-fanon": {
    cinematicLine: L("He diagnosed colonisation as a wound of the mind.", "Il a diagnostiqué la colonisation comme une blessure de l'esprit.", "شخّص الاستعمار جرحاً في العقل."),
    modernRelevance: L(
      "Adopted Algeria, and through Algeria gave the global South a vocabulary for liberation.",
      "Algérien d'adoption, il a offert au Sud global, par l'Algérie, un vocabulaire de libération.",
      "تبنّى الجزائر، ومنها أعطى الجنوب العالمي معجماً للتحرر.",
    ),
    themes: ["philosophy", "independence", "diaspora"],
    relatedFigureIds: ["abane-ramdane", "malek-bennabi", "djamila-bouhired"],
    cultureLinks: [
      { kind: "ideas", label: L("Ideas of decolonisation", "Idées de décolonisation", "أفكار التحرر من الاستعمار") },
    ],
  },
  "kateb-yacine": {
    cinematicLine: L("He wrote French to bury it inside Algerian memory.", "Il écrivit le français pour l'enterrer dans la mémoire algérienne.", "كتب بالفرنسية ليدفنها داخل الذاكرة الجزائرية."),
    modernRelevance: L(
      "Nedjma still shapes how Algerian writers carry a fractured language with dignity.",
      "Nedjma façonne encore la manière dont les écrivains algériens portent une langue fracturée avec dignité.",
      "لا تزال «نجمة» تشكّل كيف يحمل الكتاب الجزائريون لغة منكسرة بكرامة.",
    ),
    themes: ["literature", "language", "identity"],
    relatedFigureIds: ["mouloud-feraoun", "assia-djebar", "mammeri", "dib"],
    cultureLinks: [
      { kind: "words", label: L("Words & writers", "Mots et écrivains", "كلمات وكتّاب") },
    ],
  },
  "mouloud-feraoun": {
    cinematicLine: L("He wrote the poor son of the village into world literature.", "Il fit entrer le fils pauvre du village dans la littérature mondiale.", "أدخل ابن القرية الفقير إلى الأدب العالمي."),
    modernRelevance: L(
      "Assassinated in 1962 — a reminder that Algerian literature was paid for in blood.",
      "Assassiné en 1962 — rappel que la littérature algérienne s'est aussi payée au prix du sang.",
      "اغتيل عام 1962 — تذكير بأن الأدب الجزائري دُفع ثمنه أيضاً بالدم.",
    ),
    themes: ["literature", "amazigh", "education"],
    relatedFigureIds: ["mammeri", "dib", "kateb-yacine"],
    cultureLinks: [
      { kind: "words", label: L("Words & writers", "Mots et écrivains", "كلمات وكتّاب") },
    ],
  },
  mammeri: {
    cinematicLine: L("He saved a language by writing its grammar in time.", "Il a sauvé une langue en écrivant sa grammaire à temps.", "أنقذ لغةً بأن دوّن قواعدها في الوقت المناسب."),
    modernRelevance: L(
      "His Tamazight scholarship paved the way for the language's recognition decades later.",
      "Ses travaux en tamazight ont préparé la reconnaissance officielle de la langue.",
      "مهّدت أعماله في الأمازيغية للاعتراف الرسمي بها لاحقاً.",
    ),
    themes: ["amazigh", "language", "literature", "education"],
    relatedFigureIds: ["mouloud-feraoun", "kateb-yacine", "tassadit-yacine", "matoub"],
  },
  dib: {
    cinematicLine: L("He turned a working-class Tlemcen into a trilogy.", "Il a transformé la Tlemcen ouvrière en trilogie.", "حوّل تلمسان العمالية إلى ثلاثية."),
    modernRelevance: L(
      "His Algeria trilogy remains the first lens many readers get on pre-1954 Algerian life.",
      "Sa trilogie Algérie reste la première lecture de la vie algérienne d'avant 1954 pour beaucoup.",
      "تبقى ثلاثيته الجزائرية أول مدخل لكثير من القراء إلى حياة الجزائريين قبل 1954.",
    ),
    themes: ["literature", "identity"],
    relatedFigureIds: ["mouloud-feraoun", "kateb-yacine", "assia-djebar"],
  },
  "assia-djebar": {
    cinematicLine: L("She wrote against silence.", "Elle a écrit contre le silence.", "كتبت ضد الصمت."),
    modernRelevance: L(
      "Made Algerian women's voices an archive of their own — read across the Arab and Francophone worlds.",
      "A fait des voix de femmes algériennes une archive autonome, lue dans le monde arabe et francophone.",
      "جعلت من أصوات النساء الجزائريات أرشيفاً مستقلاً يُقرأ في العالمين العربي والفرنكوفوني.",
    ),
    themes: ["literature", "women-heritage", "language", "oral-memory"],
    relatedFigureIds: ["taos-amrouche", "kateb-yacine", "fadhma-amrouche"],
    cultureLinks: [
      { kind: "words", label: L("Words & writers", "Mots et écrivains", "كلمات وكتّاب") },
    ],
  },
  "moufdi-zakaria": {
    cinematicLine: L("He gave a country the words it sings to itself.", "Il a donné à un pays les mots qu'il se chante.", "أعطى وطناً الكلمات التي يغنّيها لنفسه."),
    modernRelevance: L(
      "Author of Kassaman — every Algerian schoolchild meets him through the national anthem.",
      "Auteur de Kassaman — tout écolier algérien le rencontre par l'hymne national.",
      "صاحب «قسماً» — يلتقيه كل تلميذ جزائري عبر النشيد الوطني.",
    ),
    themes: ["independence", "literature", "identity"],
    relatedFigureIds: ["ben-badis", "messali-hadj", "kateb-yacine"],
  },

  // ===== Amrouche family thread =====
  "taos-amrouche": {
    cinematicLine: L("Memory survived through song.", "La mémoire survécut par le chant.", "نجت الذاكرة عبر الغناء."),
    modernRelevance: L(
      "Her Berber chants are still the reference recording for Kabyle oral heritage worldwide.",
      "Ses chants berbères restent la référence enregistrée du patrimoine oral kabyle dans le monde.",
      "لا تزال أناشيدها الأمازيغية المرجع الصوتي للتراث الشفوي القبائلي عالمياً.",
    ),
    themes: ["oral-memory", "music", "women-heritage", "amazigh", "exile"],
    relatedFigureIds: ["jean-amrouche", "fadhma-amrouche", "assia-djebar", "tassadit-yacine"],
    audioArchive: {
      status: "planned",
      hint: L("Future archive of her Berber chants.", "Futur archive de ses chants berbères.", "أرشيف مستقبلي لأناشيدها الأمازيغية."),
    },
  },
  "jean-amrouche": {
    cinematicLine: L("A poet held between two shores.", "Un poète tenu entre deux rives.", "شاعرٌ معلّقٌ بين ضفّتين."),
    modernRelevance: L(
      "His radio dialogues with Gide, Mauriac and others modelled what an Algerian intellectual could be in exile.",
      "Ses dialogues radio avec Gide, Mauriac, etc. ont dessiné ce qu'un intellectuel algérien pouvait être en exil.",
      "رسمت حواراته الإذاعية مع جيد وموريا وآخرين صورة المثقف الجزائري في المنفى.",
    ),
    themes: ["exile", "literature", "identity", "diaspora"],
    relatedFigureIds: ["taos-amrouche", "fadhma-amrouche", "frantz-fanon", "kateb-yacine"],
  },
  "fadhma-amrouche": {
    cinematicLine: L("She told her life so a whole tradition could be heard.", "Elle a raconté sa vie pour qu'une tradition entière soit entendue.", "روت حياتها لتُسمَع تقليد بأكمله."),
    modernRelevance: L(
      "Her memoir is a foundational text for Kabyle women's autobiography and oral history.",
      "Ses mémoires sont un texte fondateur de l'autobiographie féminine kabyle et de l'histoire orale.",
      "مذكراتها نصّ مؤسِّس للسيرة الذاتية النسائية القبائلية وللتاريخ الشفوي.",
    ),
    themes: ["women-heritage", "oral-memory", "amazigh", "literature"],
    relatedFigureIds: ["taos-amrouche", "jean-amrouche", "assia-djebar"],
    audioArchive: {
      status: "planned",
      hint: L("Future oral-history archive.", "Futur archive d'histoire orale.", "أرشيف مستقبلي للتاريخ الشفوي."),
    },
  },

  // ===== Music & memory =====
  "el-anka": {
    cinematicLine: L("He taught the Casbah how to sing itself.", "Il a appris à la Casbah à se chanter elle-même.", "علّم القصبة أن تغنّي ذاتها."),
    modernRelevance: L(
      "Father of modern chaâbi — the soundtrack of Algiers' streets, weddings and grief, still.",
      "Père du chaâbi moderne — bande-son des rues, des mariages et du deuil à Alger, encore aujourd'hui.",
      "أبو الشعبي الحديث — موسيقى شوارع الجزائر العاصمة وأفراحها وأحزانها حتى اليوم.",
    ),
    themes: ["music", "oral-memory", "identity"],
    relatedFigureIds: ["warda", "khaled", "rachid-taha"],
    audioArchive: { status: "planned", hint: L("Future chaâbi archive.", "Futur archive de chaâbi.", "أرشيف مستقبلي للشعبي.") },
  },
  idir: {
    cinematicLine: L("A lullaby travelled out of Kabylie and circled the world.", "Une berceuse sortit de Kabylie et fit le tour du monde.", "تهويدةٌ خرجت من القبائل ودارت حول العالم."),
    modernRelevance: L(
      "A Vava Inouva opened global ears to Kabyle song without translating away its soul.",
      "« A Vava Inouva » a ouvert le monde au chant kabyle sans en trahir l'âme.",
      "فتحت «آفّافا إينوفا» آذان العالم للأغنية القبائلية دون أن تُفرّغها من روحها.",
    ),
    themes: ["music", "amazigh", "diaspora", "language"],
    relatedFigureIds: ["matoub", "ait-menguellet", "taos-amrouche"],
    audioArchive: { status: "planned" },
  },
  matoub: {
    cinematicLine: L("He sang what no one else dared say out loud.", "Il chantait ce que personne n'osait dire à voix haute.", "غنّى ما لم يجرؤ غيره على قوله جهراً."),
    modernRelevance: L(
      "His assassination still defines what it costs to defend Amazigh identity in public.",
      "Son assassinat définit encore le prix à payer pour défendre publiquement l'identité amazighe.",
      "لا يزال اغتياله يُحدِّد ثمن الدفاع علناً عن الهوية الأمازيغية.",
    ),
    themes: ["music", "amazigh", "identity", "language", "resistance"],
    relatedFigureIds: ["idir", "ait-menguellet", "mammeri"],
    audioArchive: { status: "planned" },
  },
  "ait-menguellet": {
    cinematicLine: L("A poet with a guitar, patient as a mountain.", "Un poète à la guitare, patient comme une montagne.", "شاعرٌ بقيثارة، صبور كجبل."),
    modernRelevance: L(
      "His songs are read like literature in Kabyle classrooms and homes.",
      "Ses chansons sont lues comme de la littérature dans les classes et les foyers kabyles.",
      "تُقرأ أغانيه أدباً في الصفوف والبيوت القبائلية.",
    ),
    themes: ["music", "amazigh", "literature", "language"],
    relatedFigureIds: ["idir", "matoub", "mammeri"],
    audioArchive: { status: "planned" },
  },
  warda: {
    cinematicLine: L("A voice that made an Arab world feel Algerian.", "Une voix qui rendit le monde arabe algérien.", "صوتٌ جعل العالم العربي يشعر بالجزائر."),
    modernRelevance: L(
      "Bridged Algerian song with the Cairo stage — pride of women's voice across generations.",
      "A relié la chanson algérienne à la scène du Caire — fierté féminine portée à travers les générations.",
      "ربطت الأغنية الجزائرية بمسرح القاهرة — اعتزاز بصوت المرأة عبر الأجيال.",
    ),
    themes: ["music", "women-heritage", "diaspora", "identity"],
    relatedFigureIds: ["el-anka", "khaled", "rachid-taha"],
    audioArchive: { status: "planned" },
  },
  khaled: {
    cinematicLine: L("He took raï out of Oran's bars and onto the world's stages.", "Il a sorti le raï des bars d'Oran pour le porter sur les scènes du monde.", "أخرج الراي من حانات وهران إلى مسارح العالم."),
    modernRelevance: L(
      "Made raï the default global sound of Algerian youth and diaspora identity.",
      "A fait du raï le son global par défaut de la jeunesse algérienne et de l'identité diasporique.",
      "جعل الراي الصوت العالمي الافتراضي للشباب الجزائري وهوية المهجر.",
    ),
    themes: ["music", "diaspora", "identity"],
    relatedFigureIds: ["rachid-taha", "warda", "el-anka"],
    audioArchive: { status: "planned" },
  },
  "rachid-taha": {
    cinematicLine: L("He turned exile into sound.", "Il a transformé l'exil en son.", "حوّل المنفى إلى صوت."),
    modernRelevance: L(
      "His music gave a voice to generations growing up between Algeria and France.",
      "Sa musique a donné une voix aux générations qui ont grandi entre l'Algérie et la France.",
      "أعطت موسيقاه صوتاً لأجيال نشأت بين الجزائر وفرنسا.",
    ),
    themes: ["music", "diaspora", "exile", "identity"],
    relatedFigureIds: ["khaled", "el-anka", "warda"],
    cultureLinks: [
      { kind: "cinema", label: L("Cinema of memory & migration", "Cinéma de la mémoire et de l'exil", "سينما الذاكرة والهجرة") },
    ],
    audioArchive: { status: "planned" },
  },

  // ===== Cinema =====
  "mohammed-lakhdar-hamina": {
    cinematicLine: L("The first Arab and African Palme d'Or — won with sand and wind.", "La première Palme d'Or arabe et africaine — gagnée avec du sable et du vent.", "أول سعفة ذهبية عربية وإفريقية، فاز بها بالرمل والريح."),
    modernRelevance: L(
      "Chronicle of the Years of Embers framed how the war is filmed and remembered.",
      "« Chronique des années de braise » a fixé la manière de filmer et de se souvenir de la guerre.",
      "رسّخ «وقائع سنين الجمر» طريقة تصوير الحرب وتذكّرها.",
    ),
    themes: ["cinema", "independence", "identity"],
    relatedFigureIds: ["merzak-allouache", "rachid-bouchareb", "yamina-bachir-chouikh"],
    cultureLinks: [
      { kind: "cinema", label: L("Algerian cinema", "Cinéma algérien", "السينما الجزائرية") },
    ],
  },
  "merzak-allouache": {
    cinematicLine: L("He filmed Algiers as it actually breathes.", "Il a filmé Alger telle qu'elle respire vraiment.", "صوّر الجزائر العاصمة كما تتنفّس فعلاً."),
    modernRelevance: L(
      "From Omar Gatlato to today, his camera tracks every shift of Algerian street life.",
      "D'« Omar Gatlato » à aujourd'hui, sa caméra suit chaque mue de la rue algérienne.",
      "من «عمر قتلاتو» إلى اليوم، تتعقّب كاميراته كل تحوّل في الشارع الجزائري.",
    ),
    themes: ["cinema", "identity"],
    relatedFigureIds: ["mohammed-lakhdar-hamina", "rachid-bouchareb", "lyes-salem"],
    cultureLinks: [
      { kind: "cinema", label: L("Algerian cinema", "Cinéma algérien", "السينما الجزائرية") },
    ],
  },
  "rachid-bouchareb": {
    cinematicLine: L("He put forgotten Algerian soldiers back on the world's screen.", "Il a remis les soldats algériens oubliés sur les écrans du monde.", "أعاد الجنود الجزائريين المنسيين إلى شاشات العالم."),
    modernRelevance: L(
      "Days of Glory forced France to revisit its debt to colonial soldiers — on screen and in law.",
      "« Indigènes » a obligé la France à revisiter sa dette envers les soldats coloniaux, à l'écran et dans la loi.",
      "أرغم فيلم «بلديون» فرنسا على مراجعة دينها للجنود المستعمرين، شاشةً وقانوناً.",
    ),
    themes: ["cinema", "diaspora", "identity"],
    relatedFigureIds: ["mohammed-lakhdar-hamina", "merzak-allouache", "frantz-fanon"],
  },
  "yamina-bachir-chouikh": {
    cinematicLine: L("She filmed the 1990s with the courage of those who lived them.", "Elle a filmé les années 1990 avec le courage de celles qui les ont vécues.", "صوّرت تسعينيات الجزائر بشجاعة من عاشوها."),
    modernRelevance: L(
      "Rachida is a key film for understanding women's survival during the Black Decade.",
      "« Rachida » est un film clé pour comprendre la survie des femmes pendant la décennie noire.",
      "«رشيدة» فيلم مرجعي لفهم صمود النساء خلال العشرية السوداء.",
    ),
    themes: ["cinema", "women-heritage", "resistance"],
    relatedFigureIds: ["djamila-sahraoui", "habiba-djahnine", "merzak-allouache"],
  },
};

import type { LocalizedString } from "@/lib/i18n";
import type { StoryScene } from "@/components/story/StoryFlow";

const L = (fr: string, en: string, ar: string): LocalizedString => ({ fr, en, ar });

/**
 * Cinematic story scenes for the "Moments That Shaped Algeria" page.
 * Each story is split into 3–5 short scenes — calm, child-friendly, hopeful.
 */

export const TAFSUT_SCENES: StoryScene[] = [
  {
    icon: "🪶",
    title: L("Une voix, un poème", "A voice, a poem", "صوتٌ وقصيدة"),
    guide: L(
      "Prenons un instant pour comprendre…",
      "Let's take a moment to understand…",
      "لنأخذ لحظةً لنفهم…",
    ),
    body: L(
      "En 1980, l'écrivain Mouloud Mammeri voulait raconter la beauté de la poésie kabyle ancienne. Une simple conférence, dans une grande ville d'Algérie.",
      "In 1980, the writer Mouloud Mammeri wanted to share the beauty of old Kabyle poetry. Just a small talk, in a big Algerian city.",
      "في سنة 1980، أراد الكاتب مولود معمري أن يحكي عن جمال الشعر القبائلي القديم. مجرّد محاضرة، في مدينة جزائرية كبيرة.",
    ),
  },
  {
    icon: "🚪",
    title: L("Une porte qui se ferme", "A door that closes", "بابٌ يُغلق"),
    body: L(
      "Mais sa conférence fut interdite. Beaucoup d'étudiants, surtout en Kabylie, trouvèrent cela injuste — comme si on demandait à leur langue de se taire.",
      "But the talk was cancelled. Many students, especially in Kabylie, felt this was unfair — as if their own language was being asked to stay silent.",
      "لكنّ المحاضرة مُنعت. شعر كثير من الطلبة، خاصة في منطقة القبائل، أنّ هذا ظلم — وكأنّ لغتهم يُطلب منها أن تصمت.",
    ),
  },
  {
    icon: "🤝",
    title: L("Des pas calmes dans la rue", "Calm steps in the street", "خطوات هادئة في الشارع"),
    guide: L(
      "Voici ce qui s'est passé ensuite…",
      "Here is what happened next…",
      "وهذا ما حدث بعد ذلك…",
    ),
    body: L(
      "Ils sortirent paisiblement, ensemble. Sans haine, sans cris. Juste une phrase à répéter : « Notre langue compte. Notre culture compte. »",
      "They walked out peacefully, together. No hatred, no shouting. Just one sentence to repeat: “Our language matters. Our culture matters.”",
      "خرجوا بسلام، يدًا بيد. بلا كراهية ولا صراخ. فقط جملة واحدة يُردّدونها: «لغتنا مهمّة. ثقافتنا مهمّة».",
    ),
  },
  {
    icon: "🌱",
    title: L("Un printemps qui a duré", "A spring that lasted", "ربيعٌ ظلّ حيًّا"),
    guide: L(
      "Et plus tard, des années après…",
      "And later, many years on…",
      "وبعد سنوات…",
    ),
    body: L(
      "On appela ce moment « Tafsut Imazighen », le Printemps berbère. Avec le temps, le tamazight devint langue nationale, puis langue officielle de l'Algérie.",
      "This moment was called “Tafsut Imazighen”, the Berber Spring. With time, Tamazight became a national, then official language of Algeria.",
      "سُمِّيت هذه اللحظة «تافسوت إمازيغن»، الربيع الأمازيغي. ومع الوقت، أصبحت الأمازيغية لغة وطنية، ثم لغةً رسمية للجزائر.",
    ),
  },
];

export const EDUCATION_SCENES: StoryScene[] = [
  {
    icon: "🌫️",
    title: L("Une identité sous pression", "Identity under pressure", "هويةٌ تحت الضغط"),
    guide: L(
      "Cette lutte n'était pas toujours visible…",
      "This struggle was not always visible…",
      "لم يكن هذا النضال مرئيًا دائمًا…",
    ),
    body: L(
      "Pendant la colonisation, la langue et la culture algériennes sont peu à peu mises de côté. À l'école, dans l'administration, on parle surtout français.",
      "During colonization, Algerian language and culture were slowly pushed aside. In schools and offices, French dominated everyday life.",
      "خلال فترة الاستعمار، تمّ تهميش اللغة والثقافة الجزائرية تدريجيًا. في المدارس والإدارات، كانت الفرنسية هي السائدة.",
    ),
  },
  {
    icon: "📚",
    title: L("Le savoir comme résistance", "Knowledge as resistance", "العلم وسيلةً للمقاومة"),
    guide: L(
      "Quand on ne peut pas crier, on apprend…",
      "When you cannot shout, you learn…",
      "حين لا يمكنك الصراخ، تتعلّم…",
    ),
    body: L(
      "Face à cette situation, certains choisissent le savoir comme moyen de résistance. Apprendre à lire, à écrire, à transmettre — devient un acte de courage tranquille.",
      "In response, some chose knowledge as a form of resistance. Learning to read, to write, to pass on — became a quiet act of courage.",
      "في مواجهة ذلك، اختار البعض العلم وسيلةً للمقاومة. تعلُّم القراءة والكتابة ونقل المعرفة — أصبح فعل شجاعة هادئًا.",
    ),
  },
  {
    icon: "🕌",
    title: L("Le mouvement des Ouléma", "The Ulema movement", "حركة العلماء"),
    body: L(
      "En 1931, l'Association des Oulémas musulmans algériens est fondée. Son but est simple et fort : enseigner l'arabe, transmettre la culture, et raviver le sentiment d'appartenance.\n\nDes écoles libres ouvrent partout dans le pays.",
      "In 1931, the Association of Algerian Muslim Ulema was founded. Its goal was simple and strong: teach Arabic, share culture, and rekindle a sense of belonging.\n\nFree schools opened across the country.",
      "في سنة 1931، تأسّست جمعية العلماء المسلمين الجزائريين. كان هدفها بسيطًا وقويًّا: تعليم العربية، نقل الثقافة، وإحياء الشعور بالانتماء.\n\nوفُتحت مدارس حرّة في كلّ ربوع البلاد.",
    ),
  },
  {
    icon: "👤",
    title: L("Abdelhamid Ben Badis", "Abdelhamid Ben Badis", "عبد الحميد بن باديس"),
    guide: L(
      "Derrière chaque mouvement… il y a des personnes.",
      "Behind every movement… there are people.",
      "خلف كلّ حركة… هناك أشخاص.",
    ),
    body: L(
      "Au cœur de ce mouvement, un homme : Abdelhamid Ben Badis. Enseignant, réformateur, il consacre sa vie à l'éducation et à l'éveil des consciences.\n\nDécouvre son parcours dans son profil dédié.",
      "At the heart of this movement, one man: Abdelhamid Ben Badis. A teacher and reformer, he devoted his life to education and awakening minds.\n\nExplore his journey in his dedicated profile.",
      "في قلب هذه الحركة، رجلٌ واحد: عبد الحميد بن باديس. معلّم ومصلح، كرّس حياته للتعليم وإيقاظ الوعي.\n\nاكتشف مساره في صفحته المخصّصة.",
    ),
  },
  {
    icon: "✨",
    title: L("Un message qui dure", "A message that lasts", "رسالةٌ تبقى"),
    body: L(
      "De ce mouvement nous reste une devise simple, devenue célèbre :\n\n« الإسلام ديننا، الجزائر وطننا، العربية لغتنا »\n\n« L'Islam est notre religion, l'Algérie est notre patrie, l'arabe est notre langue. »\n\nTrois mots pour dire : foi, terre, parole.",
      "From this movement, one simple motto remains, now famous:\n\n“الإسلام ديننا، الجزائر وطننا، العربية لغتنا”\n\n“Islam is our religion, Algeria is our homeland, Arabic is our language.”\n\nThree words to say: faith, land, voice.",
      "بقيت من هذه الحركة عبارة بسيطة، صارت شهيرة:\n\n«الإسلام ديننا، الجزائر وطننا، العربية لغتنا»\n\nثلاث كلمات تقول: إيمان، أرض، لسان.",
    ),
  },
  {
    icon: "🌱",
    title: L("Aujourd'hui", "Today", "اليوم"),
    guide: L(
      "Et toi, comment transmets-tu ce que tu aimes ?",
      "And you, how do you pass on what you love?",
      "وأنت، كيف تنقل ما تحبّ؟",
    ),
    body: L(
      "Aujourd'hui, cet héritage continue d'influencer l'éducation et l'identité algériennes. Apprendre, lire, parler sa langue — c'est encore une manière douce de dire qui l'on est.",
      "Today, this legacy still shapes Algerian education and identity. Learning, reading, speaking your language — is still a gentle way of saying who you are.",
      "اليوم، لا يزال هذا الإرث يؤثّر في التعليم والهوية في الجزائر. أن تتعلّم، أن تقرأ، أن تتحدّث لغتك — يبقى طريقةً لطيفة لتقول من أنت.",
    ),
  },
];

export const INDEPENDENCE_WAR_SCENES: StoryScene[] = [
  {
    icon: "🌙",
    title: L("Un pays sous contrôle", "A country under control", "بلدٌ تحت السيطرة"),
    guide: L(
      "Commençons avec calme et respect…",
      "Let’s begin with calm and respect…",
      "لنبدأ بهدوء واحترام…",
    ),
    body: L(
      "L’Algérie est sous domination coloniale depuis plus d’un siècle. Beaucoup d’Algériens vivent avec peu de droits et peu de pouvoir sur leur propre avenir.",
      "Algeria had been under colonial rule for over a century. Many Algerians lived with few rights and little power over their own future.",
      "كانت الجزائر تحت الاستعمار لأكثر من قرن. عاش كثير من الجزائريين بحقوق محدودة وبقدرة قليلة على تقرير مستقبلهم.",
    ),
  },
  {
    icon: "🕯️",
    title: L("Le désir de liberté", "The desire for freedom", "الرغبة في الحرية"),
    body: L(
      "Peu à peu, la conscience grandit. Des femmes et des hommes parlent d’égalité, d’identité et du droit de vivre libres sur leur terre.\n\nDans les villes, les villages et les montagnes, une même idée avance : l’Algérie doit choisir son destin.",
      "Little by little, awareness grew. Women and men spoke of equality, identity, and the right to live freely on their land.\n\nIn cities, villages, and mountains, one idea moved forward: Algeria should choose its own destiny.",
      "شيئًا فشيئًا، نما الوعي. تحدّث رجال ونساء عن المساواة والهوية والحق في العيش بحرية على أرضهم.\n\nفي المدن والقرى والجبال، تقدّمت فكرة واحدة: يجب أن تختار الجزائر مصيرها بنفسها.",
    ),
  },
  {
    icon: "⭐",
    title: L("1er novembre 1954", "November 1, 1954", "أول نوفمبر 1954"),
    guide: L(
      "Une date devient un repère…",
      "One date became a turning point…",
      "صار تاريخٌ واحد علامة فارقة…",
    ),
    body: L(
      "Dans la nuit du 1er novembre 1954, des actions coordonnées marquent le début de la Révolution. La résistance devient organisée et porte un message clair : indépendance.",
      "On the night of November 1, 1954, coordinated actions marked the beginning of the Revolution. Resistance became organized and carried a clear message: independence.",
      "في ليلة أول نوفمبر 1954، شكّلت عمليات منسّقة بداية الثورة. أصبحت المقاومة منظّمة وحملت رسالة واضحة: الاستقلال.",
    ),
  },
  {
    icon: "🤝",
    title: L("Un peuple uni", "A people united", "شعبٌ متّحد"),
    body: L(
      "Le FLN rassemble des Algériens de régions et de milieux différents. Des noms comme Ben M’hidi, Ben Boulaïd et Abane Ramdane rappellent cette diversité d’engagement.\n\nLa force du mouvement vient aussi de cette unité : chacun apporte ce qu’il peut.",
      "The FLN brought together Algerians from different regions and backgrounds. Names like Ben M’hidi, Ben Boulaïd, and Abane Ramdane remind us of this shared commitment.\n\nThe movement’s strength also came from unity: each person gave what they could.",
      "جمع جبهة التحرير الوطني جزائريين من مناطق وخلفيات مختلفة. وتذكّرنا أسماء مثل بن مهيدي وبن بولعيد وعبان رمضان بهذا الالتزام المشترك.\n\nجاءت قوة الحركة أيضًا من الوحدة: كلّ شخص قدّم ما استطاع.",
    ),
  },
  {
    icon: "🕊️",
    title: L("Sacrifice et courage", "Sacrifice and courage", "تضحية وشجاعة"),
    guide: L(
      "Cette partie demande de la douceur…",
      "This part asks for gentleness…",
      "هذا الجزء يحتاج إلى رفق…",
    ),
    body: L(
      "La guerre est longue et difficile. Des familles sont séparées, des villages vivent dans l’incertitude, et beaucoup portent l’espoir malgré la peur.\n\nLe courage ne signifie pas ne jamais avoir peur. Il signifie continuer à croire en la liberté.",
      "The war was long and difficult. Families were separated, villages lived with uncertainty, and many carried hope even when afraid.\n\nCourage does not mean never feeling fear. It means continuing to believe in freedom.",
      "كانت الحرب طويلة وصعبة. تفرّقت عائلات، وعاشت قرى في القلق، وحمل كثيرون الأمل رغم الخوف.\n\nالشجاعة لا تعني ألا نخاف أبدًا. بل تعني أن نستمر في الإيمان بالحرية.",
    ),
  },
  {
    icon: "🇩🇿",
    title: L("L’indépendance", "Independence", "الاستقلال"),
    body: L(
      "En 1962, l’Algérie devient indépendante. Après de longues années d’épreuves, le pays connaît un immense soulagement et une grande fierté.\n\nUne nouvelle page commence : construire, apprendre, transmettre.",
      "In 1962, Algeria became independent. After long years of hardship, the country felt deep relief and great pride.\n\nA new page began: to build, to learn, to pass on.",
      "في سنة 1962، أصبحت الجزائر مستقلة. بعد سنوات طويلة من المحن، شعر البلد براحة كبيرة وفخر عميق.\n\nبدأت صفحة جديدة: البناء، التعلّم، ونقل الذاكرة.",
    ),
  },
  {
    icon: "🌱",
    title: L("Une mémoire vivante", "A memory that lives on", "ذاكرةٌ حيّة"),
    guide: L(
      "Et aujourd’hui, que gardons-nous ?",
      "And today, what do we carry forward?",
      "واليوم، ماذا نحمل معنا؟",
    ),
    body: L(
      "Aujourd’hui, cette histoire continue de définir l’identité du pays. Elle rappelle la valeur de la liberté, de la dignité et de la solidarité.\n\nSe souvenir avec respect, c’est aussi apprendre à construire un avenir plus juste.",
      "Today, this history continues to shape the nation’s identity. It reminds us of the value of freedom, dignity, and solidarity.\n\nRemembering with respect also teaches us how to build a fairer future.",
      "اليوم، لا تزال هذه المرحلة تشكل هوية البلاد. وتذكّرنا بقيمة الحرية والكرامة والتضامن.\n\nأن نتذكّر باحترام يعني أيضًا أن نتعلّم بناء مستقبل أكثر عدلًا.",
    ),
  },
];

export const DECADE_SCENES: StoryScene[] = [
  {
    icon: "🌫️",
    title: L("Un ciel devenu lourd", "A sky that grew heavy", "سماء أثقلتها الأيام"),
    guide: L(
      "Ce chapitre est tendre. Lisons-le doucement.",
      "This chapter is tender. Let's read it softly.",
      "هذا فصلٌ حسّاس. لنقرأه بهدوء.",
    ),
    body: L(
      "Au début des années 1990, l'Algérie traversait des jours difficiles. Le pays cherchait son chemin, et beaucoup de familles avaient peur de l'inconnu.",
      "In the early 1990s, Algeria was going through hard days. The country was searching for its path, and many families felt afraid of the unknown.",
      "في بداية التسعينيات، عاشت الجزائر أيامًا صعبة. كانت البلاد تبحث عن طريقها، وشعرت عائلات كثيرة بالخوف من المجهول.",
    ),
  },
  {
    icon: "🕯️",
    title: L("Des années silencieuses", "Quiet, careful years", "سنواتٌ صامتة"),
    body: L(
      "Un long conflit commença entre l'État et certains groupes armés. La vie quotidienne devint plus prudente, plus silencieuse. Beaucoup d'Algériens ont perdu des proches.",
      "A long conflict began between the state and some armed groups. Daily life became more careful, more quiet. Many Algerians lost loved ones.",
      "بدأ نزاع طويل بين الدولة وبعض الجماعات المسلّحة. صار يوم الناس أكثر حذرًا وأقلّ ضجيجًا. وفقد كثير من الجزائريين أحبّاء لهم.",
    ),
  },
  {
    icon: "🤍",
    title: L("Des gestes plus forts que la peur", "Gestures stronger than fear", "لفتاتٌ أقوى من الخوف"),
    guide: L(
      "Et pourtant, regarde ce qui restait debout…",
      "And yet, look at what kept standing…",
      "ورغم ذلك، انظر ما الذي بقي صامدًا…",
    ),
    body: L(
      "Des enseignants continuèrent d'ouvrir les écoles. Des médecins, des artistes, des voisins veillaient les uns sur les autres. La gentillesse, jour après jour, est devenue un acte de courage.",
      "Teachers kept opening schools. Doctors, artists and neighbours watched over one another. Kindness, day by day, became an act of courage.",
      "واصل المعلمون فتح المدارس. سهر الأطباء والفنانون والجيران بعضهم على بعض. وأصبح اللطف، يومًا بعد يوم، فعل شجاعة.",
    ),
  },
  {
    icon: "🕊️",
    title: L("Le chemin vers la paix", "The road toward peace", "الطريق نحو السلام"),
    guide: L(
      "Voici comment l'espoir est revenu…",
      "Here is how hope returned…",
      "وهكذا عاد الأمل…",
    ),
    body: L(
      "Vers la fin des années 1990, l'Algérie a choisi la paix. La Concorde civile, puis la Charte pour la paix, ont aidé le pays à se relever — lentement, ensemble.",
      "Toward the end of the 1990s, Algeria chose peace. The Civil Concord, then the Charter for Peace, helped the country rise again — slowly, together.",
      "نحو نهاية التسعينيات، اختارت الجزائر السلام. ساعد ميثاق الوئام المدني ثمّ ميثاق السلم البلادَ على النهوض من جديد — برفق، معًا.",
    ),
  },
  {
    icon: "🌿",
    title: L("Se souvenir avec douceur", "Remembering, gently", "نتذكّر برفق"),
    body: L(
      "Aujourd'hui, on se souvient des familles touchées avec respect. Cette histoire nous rappelle qu'il faut protéger la paix, chaque jour, par de petits gestes.",
      "Today, we remember the families affected with respect. This story reminds us that peace must be protected every day, through small gestures.",
      "اليوم، نتذكّر العائلات المتأثّرة باحترام. وتذكّرنا هذه القصة بأنّ السلام يحتاج إلى حمايتنا كلّ يوم، بلفتات صغيرة.",
    ),
  },
];

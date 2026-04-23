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

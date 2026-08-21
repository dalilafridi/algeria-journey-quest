import type { LocalizedString } from "@/lib/i18n";

/**
 * Trilingual metadata catalogue for the public museum.
 *
 * One entry per indexable public route. Titles and descriptions are held in
 * the three museum languages so `pageMeta()` can emit a document title,
 * description and social tags that follow the visitor's active language.
 *
 * Rules for editors:
 * - Every title must be unique across the museum.
 * - Descriptions stay under roughly 160 characters where possible.
 * - No em dashes in any language.
 */
export interface PageMetaCopy {
  title: LocalizedString;
  description: LocalizedString;
}

export const PAGE_META = {
  "/": {
    title: {
      en: "DZ Odyssey, Algeria Through Time",
      fr: "DZ Odyssey, l'Algérie à travers le temps",
      ar: "دي زد أوديسي، الجزائر عبر الزمن",
    },
    description: {
      en: "A cinematic, museum-style passage through Algeria, its eras, regions, figures and culture, from Numidia to independence.",
      fr: "Une traversée muséale et cinématique de l'Algérie, de ses époques, régions, figures et cultures, de la Numidie à l'indépendance.",
      ar: "رحلة متحفية سينمائية عبر الجزائر، حِقبها ومناطقها وشخصياتها وثقافتها، من نوميديا إلى الاستقلال.",
    },
  },
  "/timeline": {
    title: {
      en: "Century Timeline, DZ Odyssey",
      fr: "Chronologie des siècles, DZ Odyssey",
      ar: "الخط الزمني للقرون، دي زد أوديسي",
    },
    description: {
      en: "Five eras of Algerian history, from Numidia and Roman North Africa to independence and the modern republic.",
      fr: "Cinq époques de l'histoire algérienne, de la Numidie et de l'Afrique romaine à l'indépendance et à la république moderne.",
      ar: "خمس حِقب من تاريخ الجزائر، من نوميديا وشمال إفريقيا الروماني إلى الاستقلال والجمهورية الحديثة.",
    },
  },
  "/atlas": {
    title: {
      en: "Historical Atlas of Algeria, DZ Odyssey",
      fr: "Atlas historique de l'Algérie, DZ Odyssey",
      ar: "الأطلس التاريخي للجزائر، دي زد أوديسي",
    },
    description: {
      en: "A hand-illustrated atlas of Algeria across the centuries, regions, periods and the people who shaped them.",
      fr: "Un atlas illustré à la main de l'Algérie à travers les siècles, ses régions, ses périodes et celles et ceux qui les ont façonnées.",
      ar: "أطلس مرسوم يدويًا للجزائر عبر القرون، مناطقها وفتراتها ومن صنعوا تاريخها.",
    },
  },
  "/map": {
    title: {
      en: "Explore Algeria, DZ Odyssey",
      fr: "Explorer l'Algérie, DZ Odyssey",
      ar: "استكشف الجزائر، دي زد أوديسي",
    },
    description: {
      en: "Explore Algeria region by region and discover the museum's flagship destinations: M'Zab, Tassili n'Ajjer, Timgad, Djémila, the Casbah of Algiers and Tipasa.",
      fr: "Explorez l'Algérie région par région et découvrez les destinations phares du musée : le M'Zab, le Tassili n'Ajjer, Timgad, Djémila, la Casbah d'Alger et Tipasa.",
      ar: "استكشف الجزائر منطقة بعد منطقة واكتشف وجهات المتحف الكبرى: وادي ميزاب، طاسيلي ناجر، تيمقاد، جميلة، قصبة الجزائر وتيبازة.",
    },
  },
  "/chronicle": {
    title: {
      en: "Algeria, Century by Century | DZ Odyssey",
      fr: "L'Algérie, siècle après siècle | DZ Odyssey",
      ar: "الجزائر، قرنًا بعد قرن | دي زد أوديسي",
    },
    description: {
      en: "Move through three thousand years of Algerian history, from early North Africa and Numidia to colonial rule, revolution and independence.",
      fr: "Parcourez trois mille ans d'histoire algérienne, de l'Afrique du Nord ancienne et de la Numidie à la colonisation, la révolution et l'indépendance.",
      ar: "تنقّل عبر ثلاثة آلاف عام من تاريخ الجزائر، من شمال إفريقيا القديم ونوميديا إلى الاستعمار والثورة والاستقلال.",
    },
  },

  "/figures": {
    title: {
      en: "Hall of Legends, Discover the People Who Shaped Algeria | DZ Odyssey",
      fr: "Le Panthéon des légendes, celles et ceux qui ont façonné l'Algérie | DZ Odyssey",
      ar: "قاعة الأساطير، من صنعوا الجزائر | دي زد أوديسي",
    },
    description: {
      en: "A cinematic, browse-first museum of Algeria's most influential historical figures, curated collections and era galleries.",
      fr: "Un musée cinématique des figures historiques les plus marquantes de l'Algérie, avec collections choisies et galeries par époque.",
      ar: "متحف سينمائي لأبرز الشخصيات التاريخية الجزائرية، مع مجموعات مختارة ومعارض حسب الحقبة.",
    },
  },
  "/figures/quiz": {
    title: {
      en: "Guess the Figure, DZ Odyssey",
      fr: "Devinez la figure, DZ Odyssey",
      ar: "خمّن الشخصية، دي زد أوديسي",
    },
    description: {
      en: "Read the clues and identify the right person from Algerian history.",
      fr: "Lisez les indices et identifiez la bonne personnalité de l'histoire algérienne.",
      ar: "اقرأ القرائن وتعرّف على الشخصية الصحيحة من تاريخ الجزائر.",
    },
  },
  "/culture": {
    title: {
      en: "Culture, A Living Algeria | DZ Odyssey",
      fr: "Culture, une Algérie vivante | DZ Odyssey",
      ar: "الثقافة، جزائر حية | دي زد أوديسي",
    },
    description: {
      en: "Wander through Algerian identity, traditions, music, cuisine, words, architecture and the long memory of Amazigh heritage.",
      fr: "Parcourez l'identité algérienne, ses traditions, sa musique, sa cuisine, ses mots, son architecture et la longue mémoire du patrimoine amazigh.",
      ar: "تجوّل في الهوية الجزائرية وتقاليدها وموسيقاها ومطبخها وكلماتها وعمارتها والذاكرة الطويلة للتراث الأمازيغي.",
    },
  },
  "/cuisine": {
    title: {
      en: "Cuisine of Algeria, DZ Odyssey",
      fr: "Cuisine d'Algérie, DZ Odyssey",
      ar: "المطبخ الجزائري، دي زد أوديسي",
    },
    description: {
      en: "A cinematic cultural journey through Algerian cuisine, couscous, chorba, rechta, dates and bread, from Kabylie to the Sahara.",
      fr: "Un voyage culturel et cinématique dans la cuisine algérienne, couscous, chorba, rechta, dattes et pain, de la Kabylie au Sahara.",
      ar: "رحلة ثقافية سينمائية في المطبخ الجزائري، الكسكس والشوربة والرشتة والتمر والخبز، من القبائل إلى الصحراء.",
    },
  },
  "/football": {
    title: {
      en: "The Hall of Algerian Football, DZ Odyssey",
      fr: "Le Hall du football algérien, DZ Odyssey",
      ar: "قاعة كرة القدم الجزائرية، دي زد أوديسي",
    },
    description: {
      en: "A cinematic museum wing tracing Algerian football from colonial resistance and the FLN team to Gijón, the 2019 AFCON and the road to 2026.",
      fr: "Une aile muséale retraçant le football algérien, de la résistance coloniale et de l'équipe du FLN à Gijón, à la CAN 2019 et à la route vers 2026.",
      ar: "جناح متحفي يروي مسار كرة القدم الجزائرية، من المقاومة الاستعمارية وفريق جبهة التحرير إلى خيخون وكأس إفريقيا 2019 والطريق نحو 2026.",
    },
  },
  "/football/lesvertes": {
    title: {
      en: "Les Vertes, Algeria's Women's National Team · DZ Odyssey",
      fr: "Les Vertes, la sélection féminine d'Algérie · DZ Odyssey",
      ar: "المنتخب الجزائري النسوي «لي فيرت» · دي زد أوديسي",
    },
    description: {
      en: "Football, resilience and a new generation representing Algeria, a permanent exhibit in the Hall of Algerian Football.",
      fr: "Football, ténacité et une nouvelle génération qui représente l'Algérie, une exposition permanente du Hall du football algérien.",
      ar: "كرة قدم وإصرار وجيل جديد يمثّل الجزائر، معرض دائم ضمن قاعة كرة القدم الجزائرية.",
    },
  },
  "/clubs": {
    title: {
      en: "Club Museums, The Hall of Algerian Football | DZ Odyssey",
      fr: "Musées des clubs, le Hall du football algérien | DZ Odyssey",
      ar: "متاحف الأندية، قاعة كرة القدم الجزائرية | دي زد أوديسي",
    },
    description: {
      en: "Curated museum wings for Algeria's great football clubs, starting with JS Kabylie.",
      fr: "Des ailes muséales consacrées aux grands clubs de football algériens, à commencer par la JS Kabylie.",
      ar: "أجنحة متحفية مخصصة لكبار أندية كرة القدم الجزائرية، بدءًا بشبيبة القبائل.",
    },
  },
  "/mzab": {
    title: {
      en: "The M'Zab Valley, Cities Against the Sun · DZ Odyssey",
      fr: "La vallée du M'Zab, des cités face au soleil · DZ Odyssey",
      ar: "وادي ميزاب، مدن في مواجهة الشمس · دي زد أوديسي",
    },
    description: {
      en: "How an Ibadi civilization built five sustainable cities in one of the harshest environments on Earth. A flagship exhibit of DZ Odyssey.",
      fr: "Comment une civilisation ibadite a bâti cinq cités durables dans l'un des milieux les plus rudes de la planète. Une exposition phare de DZ Odyssey.",
      ar: "كيف بنت حضارة إباضية خمس مدن مستدامة في واحدة من أقسى البيئات على الأرض. معرض رئيسي في دي زد أوديسي.",
    },
  },
  "/timgad": {
    title: {
      en: "Timgad, A City Drawn With a Ruler · DZ Odyssey",
      fr: "Timgad, une cité tracée à la règle · DZ Odyssey",
      ar: "تيمقاد، مدينة رُسمت بالمسطرة · دي زد أوديسي",
    },
    description: {
      en: "Founded by Trajan in 100 CE for retired legionaries, buried by sand, and recovered as the clearest Roman city plan in the world. A permanent exhibit of DZ Odyssey.",
      fr: "Fondée par Trajan en l'an 100 pour des légionnaires vétérans, ensevelie par le sable, puis retrouvée comme le plan de cité romaine le plus lisible au monde. Exposition permanente de DZ Odyssey.",
      ar: "أسّسها تراجان سنة 100 لجنودٍ متقاعدين، غمرها الرمل، ثمّ استُعيدت بوصفها أوضح مخطّط لمدينة رومانية في العالم. معرض دائم في دي زد أوديسي.",
    },
  },
  "/tassili": {
    title: {
      en: "Tassili n'Ajjer, The Painted Sahara · DZ Odyssey",
      fr: "Tassili n'Ajjer, le Sahara peint · DZ Odyssey",
      ar: "طاسيلي ناجّر، الصحراء المرسومة · دي زد أوديسي",
    },
    description: {
      en: "More than fifteen thousand paintings and engravings across a sandstone plateau, recording twelve thousand years of Saharan life and climate. A permanent exhibit of DZ Odyssey.",
      fr: "Plus de quinze mille peintures et gravures sur un plateau de grès, mémoire de douze mille ans de vie et de climat sahariens. Exposition permanente de DZ Odyssey.",
      ar: "أكثر من خمسة عشر ألف رسمٍ ونقش على هضبةٍ من الحجر الرملي، تسجّل اثني عشر ألف سنة من حياة الصحراء ومناخها. معرض دائم في دي زد أوديسي.",
    },
  },

  "/women-of-independence": {
    title: {
      en: "Women of the Algerian Revolution, 1954 to 1962 · DZ Odyssey",
      fr: "Les femmes de la Révolution algérienne, 1954 à 1962 · DZ Odyssey",
      ar: "نساء الثورة الجزائرية، 1954 إلى 1962 · دي زد أوديسي",
    },
    description: {
      en: "Moussebilates, maquisardes, fidayate and everyday resistance: the many roles Algerian women held during the War of Independence.",
      fr: "Moussebilates, maquisardes, fidayate et résistance du quotidien : les multiples rôles des femmes algériennes pendant la guerre d'indépendance.",
      ar: "المسبّلات والمجاهدات والفدائيات ومقاومة الحياة اليومية: الأدوار المتعددة للجزائريات خلال حرب الاستقلال.",
    },
  },
  "/words": {
    title: {
      en: "Words That Shaped History, DZ Odyssey",
      fr: "Paroles qui ont marqué l'histoire, DZ Odyssey",
      ar: "كلمات صنعت التاريخ، دي زد أوديسي",
    },
    description: {
      en: "Quotes, verses and song lines that shaped Algerian identity, from Kassaman to Mammeri, Aït Menguellet, Matoub and Idir.",
      fr: "Citations, vers et paroles de chansons qui ont façonné l'identité algérienne, de Kassaman à Mammeri, Aït Menguellet, Matoub et Idir.",
      ar: "اقتباسات وأبيات وكلمات أغانٍ صاغت الهوية الجزائرية، من قسمًا إلى معمري وآيت منقلات ومعطوب وإيدير.",
    },
  },
  "/moments": {
    title: {
      en: "Moments That Shaped Algeria, DZ Odyssey",
      fr: "Moments qui ont façonné l'Algérie, DZ Odyssey",
      ar: "لحظات صنعت الجزائر، دي زد أوديسي",
    },
    description: {
      en: "Pivotal chapters of modern Algerian history, told with care for young learners.",
      fr: "Des chapitres décisifs de l'histoire algérienne moderne, racontés avec soin pour les jeunes lecteurs.",
      ar: "فصول مفصلية من تاريخ الجزائر الحديث، مروية بعناية للقرّاء الصغار.",
    },
  },
  "/ideas": {
    title: {
      en: "Debates & Ideas, DZ Odyssey",
      fr: "Débats et idées, DZ Odyssey",
      ar: "نقاشات وأفكار، دي زد أوديسي",
    },
    description: {
      en: "A museum of ideas: plural Algeria, national identity, culture and language, and the thinkers behind them.",
      fr: "Un musée des idées : l'Algérie plurielle, l'identité nationale, la culture et la langue, et les penseurs qui les ont portées.",
      ar: "متحف للأفكار: الجزائر المتعددة، الهوية الوطنية، الثقافة واللغة، والمفكرون الذين حملوها.",
    },
  },
  "/cinema": {
    title: {
      en: "Algerian Cinema & Film, DZ Odyssey",
      fr: "Cinéma algérien, DZ Odyssey",
      ar: "السينما الجزائرية، دي زد أوديسي",
    },
    description: {
      en: "Featured Algerian films and a mini-quiz, memory, youth, women, society and resistance through cinema.",
      fr: "Des films algériens à l'affiche et un mini-quiz, la mémoire, la jeunesse, les femmes, la société et la résistance au cinéma.",
      ar: "أفلام جزائرية مختارة واختبار قصير، الذاكرة والشباب والنساء والمجتمع والمقاومة عبر السينما.",
    },
  },
  "/lessons": {
    title: {
      en: "1-Minute Lessons, DZ Odyssey",
      fr: "Leçons d'une minute, DZ Odyssey",
      ar: "دروس في دقيقة، دي زد أوديسي",
    },
    description: {
      en: "Quick, focused lessons on Algerian history, read a topic in about a minute.",
      fr: "Des leçons courtes et ciblées sur l'histoire algérienne, un sujet lu en une minute environ.",
      ar: "دروس قصيرة ومركّزة في التاريخ الجزائري، موضوع يُقرأ في دقيقة تقريبًا.",
    },
  },
  "/stargazing": {
    title: {
      en: "Amazigh Stargazing, The Sky of Our Ancestors | DZ Odyssey",
      fr: "Astronomie amazighe, le ciel de nos ancêtres | DZ Odyssey",
      ar: "علم النجوم الأمازيغي، سماء أجدادنا | دي زد أوديسي",
    },
    description: {
      en: "A cinematic museum of Amazigh star knowledge, seasons, navigation and oral tradition under the desert sky.",
      fr: "Un musée cinématique du savoir stellaire amazigh, saisons, orientation et tradition orale sous le ciel du désert.",
      ar: "متحف سينمائي للمعرفة النجمية الأمازيغية، الفصول والاهتداء والتقاليد الشفوية تحت سماء الصحراء.",
    },
  },
  "/compare": {
    title: {
      en: "Compare Mode, DZ Odyssey",
      fr: "Mode comparaison, DZ Odyssey",
      ar: "وضع المقارنة، دي زد أوديسي",
    },
    description: {
      en: "Place two figures, eras or regions side by side and study their timeline, geography, achievements, legacy and historical significance.",
      fr: "Placez deux figures, époques ou régions côte à côte et étudiez leur chronologie, leur géographie, leurs réalisations et leur héritage.",
      ar: "ضع شخصيتين أو حقبتين أو منطقتين جنبًا إلى جنب وادرس زمنهما وجغرافيتهما وإنجازاتهما وإرثهما.",
    },
  },
  "/showcase": {
    title: {
      en: "Showcase, DZ Odyssey",
      fr: "Vitrine, DZ Odyssey",
      ar: "الواجهة، دي زد أوديسي",
    },
    description: {
      en: "Step into a curated, museum-quality walkthrough of 2,000+ years of Algerian memory.",
      fr: "Entrez dans un parcours muséal soigné à travers plus de 2 000 ans de mémoire algérienne.",
      ar: "ادخل جولة متحفية منسّقة عبر أكثر من ألفي عام من الذاكرة الجزائرية.",
    },
  },
  "/about": {
    title: {
      en: "About DZ Odyssey and Its Founder, Dalila Fridi",
      fr: "À propos de DZ Odyssey et de sa fondatrice, Dalila Fridi",
      ar: "عن دي زد أوديسي ومؤسِّسته دليلة فريدي",
    },
    description: {
      en: "Discover why Dalila Fridi created DZ Odyssey, an independent digital museum connecting visitors with the history, people, regions and cultures of Algeria.",
      fr: "Découvrez pourquoi Dalila Fridi a créé DZ Odyssey, un musée numérique indépendant qui relie les visiteurs à l'histoire, aux personnes, aux régions et aux cultures de l'Algérie.",
      ar: "اكتشف لماذا أنشأت دليلة فريدي دي زد أوديسي، متحفًا رقميًا مستقلًا يصل الزوّار بتاريخ الجزائر وناسها ومناطقها وثقافاتها.",
    },

  },
  "/sources": {
    title: {
      en: "Sources & Editorial Method, DZ Odyssey",
      fr: "Sources et méthode éditoriale, DZ Odyssey",
      ar: "المصادر والمنهج التحريري، دي زد أوديسي",
    },
    description: {
      en: "How DZ Odyssey researches, cites and reviews its exhibits: source hierarchy, citation standards, disputed interpretations, translation review and corrections policy.",
      fr: "Comment DZ Odyssey documente, cite et relit ses expositions : hiérarchie des sources, normes de citation, interprétations débattues, relecture des traductions et corrections.",
      ar: "كيف يبحث دي زد أوديسي ويوثّق ويراجع معروضاته: تراتبية المصادر، معايير الاستشهاد، التأويلات المختلف عليها، مراجعة الترجمة وسياسة التصحيح.",
    },
  },
  "/privacy": {
    title: {
      en: "Privacy at DZ Odyssey, what the museum stores",
      fr: "Confidentialité chez DZ Odyssey, ce que le musée conserve",
      ar: "الخصوصية في دي زد أوديسي، ما يحفظه المتحف",
    },
    description: {
      en: "What DZ Odyssey stores on your device, the one cookie it sets, how Ask the Curator and the audio guide handle your text, and how to erase everything.",
      fr: "Ce que DZ Odyssey conserve sur votre appareil, le seul cookie déposé, le traitement de vos textes par le conservateur et l'audioguide, et comment tout effacer.",
      ar: "ما يحفظه دي زد أوديسي على جهازك، وملف تعريف الارتباط الوحيد، وكيف يعالج نصوصك مساعد القيّم والدليل الصوتي، وكيف تمحو كل شيء.",
    },
  },
  "/terms": {
    title: {
      en: "Terms of Use, DZ Odyssey",
      fr: "Conditions d'utilisation, DZ Odyssey",
      ar: "شروط الاستخدام، دي زد أوديسي",
    },
    description: {
      en: "The terms for visiting DZ Odyssey: educational purpose, permitted personal use, media rights, accuracy and corrections, AI answers, external links and prohibited misuse.",
      fr: "Les conditions de visite de DZ Odyssey : finalité éducative, usage personnel autorisé, droits des médias, exactitude et corrections, réponses IA, liens externes et usages interdits.",
      ar: "شروط زيارة دي زد أوديسي: الغاية التعليمية، الاستخدام الشخصي المسموح، حقوق الوسائط، الدقة والتصحيح، إجابات الذكاء الاصطناعي، الروابط الخارجية والاستخدامات الممنوعة.",
    },
  },
  "/credits": {
    title: {
      en: "Image & Media Credits, DZ Odyssey",
      fr: "Crédits images et médias, DZ Odyssey",
      ar: "اعتمادات الصور والوسائط، دي زد أوديسي",
    },
    description: {
      en: "Where the museum's visual material comes from: imagery created for DZ Odyssey, illustrative visuals, emblems, photograph credits and how to reach us about rights.",
      fr: "La provenance du matériel visuel du musée : images créées pour DZ Odyssey, visuels illustratifs, emblèmes, crédits photographiques et contact pour les droits.",
      ar: "مصدر المواد البصرية في المتحف: صور أُنشئت لدي زد أوديسي، ومشاهد توضيحية، وشعارات، واعتمادات الصور، وسبل التواصل بشأن الحقوق.",
    },
  },
  "/passport": {
    title: {
      en: "Visitor Passport, DZ Odyssey",
      fr: "Passeport du visiteur, DZ Odyssey",
      ar: "جواز الزائر، دي زد أوديسي",
    },
    description: {
      en: "Your personal DZ Odyssey museum passport, track visits, collect stamps, and export your journey.",
      fr: "Votre passeport personnel DZ Odyssey, suivez vos visites, collectez les tampons et exportez votre parcours.",
      ar: "جواز زيارتك الشخصي في دي زد أوديسي، تابع زياراتك واجمع الأختام وصدّر رحلتك.",
    },
  },
  "/profile": {
    title: {
      en: "Your Profile, DZ Odyssey",
      fr: "Votre profil, DZ Odyssey",
      ar: "ملفك الشخصي، دي زد أوديسي",
    },
    description: {
      en: "Track your XP, badges, and history journey progress.",
      fr: "Suivez vos points d'expérience, vos badges et la progression de votre parcours historique.",
      ar: "تابع نقاط خبرتك وشاراتك وتقدّم رحلتك التاريخية.",
    },
  },
} as const satisfies Record<string, PageMetaCopy>;

export type PageMetaPath = keyof typeof PAGE_META;

/** Metadata for a static public route. */
export function pageCopy(path: PageMetaPath): PageMetaCopy {
  return PAGE_META[path];
}

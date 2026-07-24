/**
 * Les Vertes — Algeria's Women's National Team.
 *
 * Museum data for the "Les Vertes" exhibit in the Hall of Algerian Football.
 * All content is trilingual (EN / FR / AR). This module is the single source
 * of truth for the exhibit and is designed to be edited from the future
 * DZ Odyssey Studio "Les Vertes" workspace without changing any route code.
 *
 * Editorial rules honoured throughout this file:
 *   • Do not fabricate dates, statistics or biographies.
 *   • Prefer verified, conservative language ("Group stage") over invented
 *     detail. Where a field is not yet verified, leave it undefined and the
 *     UI will hide it gracefully.
 *   • Player cards ship empty until the curator populates them.
 *
 * Every top-level export corresponds to a Studio-editable panel.
 */

import type { LocalizedString } from "@/lib/i18n";

/* -------------------- section publish flags -------------------- */

export type LesVertesSectionId =
  | "beginning"
  | "african-journey"
  | "breaking-barriers"
  | "players"
  | "new-generation"
  | "clubs"
  | "next-chapter";

export const LES_VERTES_PUBLISHED: Record<LesVertesSectionId, boolean> = {
  beginning: true,
  "african-journey": true,
  "breaking-barriers": true,
  players: true,
  "new-generation": true,
  clubs: true,
  "next-chapter": true,
};

/* -------------------- hero -------------------- */

export const LES_VERTES_HERO = {
  eyebrow: {
    en: "A new wing of the Hall of Algerian Football",
    fr: "Une nouvelle aile de la Galerie du football algérien",
    ar: "جناح جديد من قاعة كرة القدم الجزائرية",
  } satisfies LocalizedString,
  title: {
    en: "Les Vertes",
    fr: "Les Vertes",
    ar: "الخضراوات",
  } satisfies LocalizedString,
  subtitle: {
    en: "The Rise of Algeria's Women's National Team",
    fr: "L'essor de l'équipe nationale féminine d'Algérie",
    ar: "صعود منتخب الجزائر النسوي لكرة القدم",
  } satisfies LocalizedString,
  tagline: {
    en: "Football, resilience and a new generation representing Algeria.",
    fr: "Football, résilience et une nouvelle génération qui porte les couleurs de l'Algérie.",
    ar: "كرة القدم، الصمود، وجيل جديد يمثّل الجزائر.",
  } satisfies LocalizedString,
  intro: {
    en: "For decades, Algerian women fought for a place on the pitch, for recognition and for the opportunity to represent their country. From the early development of organized women's football to appearances at the Women's Africa Cup of Nations, Les Vertes have built a story of resilience, talent and growing ambition.",
    fr: "Pendant des décennies, les Algériennes ont lutté pour une place sur le terrain, pour la reconnaissance et pour l'opportunité de représenter leur pays. Du développement du football féminin organisé aux participations à la Coupe d'Afrique féminine, Les Vertes ont bâti une histoire de résilience, de talent et d'ambition grandissante.",
    ar: "على مدى عقود، ناضلت المرأة الجزائرية من أجل مكان في الملعب، ومن أجل الاعتراف وفرصة تمثيل بلادها. من انطلاق كرة القدم النسوية المنظّمة إلى المشاركة في كأس أمم إفريقيا للسيدات، بنَت الخضراوات قصّة من الصمود والموهبة والطموح المتنامي.",
  } satisfies LocalizedString,
  ctaLabel: {
    en: "Explore their journey",
    fr: "Découvrir leur parcours",
    ar: "استكشف رحلتهنّ",
  } satisfies LocalizedString,
};

/* -------------------- 2. The Beginning -------------------- */

export const LES_VERTES_BEGINNING = {
  title: {
    en: "The Beginning",
    fr: "Les débuts",
    ar: "البدايات",
  } satisfies LocalizedString,
  paragraphs: [
    {
      en: "Organized women's football in Algeria grew slowly and against the current. After independence, a handful of local clubs began welcoming women's sections, sustained more by the will of players and volunteer coaches than by structured investment. Training pitches were shared, kits were improvised, and matches were often played far from the spotlight.",
      fr: "Le football féminin organisé en Algérie s'est construit lentement, à contre-courant. Après l'indépendance, quelques clubs locaux ont ouvert des sections féminines, portées davantage par la volonté des joueuses et de bénévoles que par un investissement structuré. Les terrains d'entraînement étaient partagés, les équipements bricolés, et les matchs se jouaient souvent loin des projecteurs.",
      ar: "نمَت كرة القدم النسوية المنظّمة في الجزائر ببطء وضدّ التيار. بعد الاستقلال، فتحت بعض النوادي المحلية أقسامًا نسويّة بفضل إرادة اللاعبات والمدرّبين المتطوّعين أكثر من أيّ استثمار مهيكل. كانت الملاعب مشتركة، والمعدّات مرتَجَلة، والمباريات تُلعب بعيدًا عن الأضواء في الغالب.",
    },
    {
      en: "The Fédération Algérienne de Football progressively recognised a national women's team, and Algeria began competing internationally. Each appearance on the continental stage was, first, a logistical victory — proof that a national side could be assembled, prepared and sent to represent the country.",
      fr: "La Fédération algérienne de football a progressivement reconnu une sélection nationale féminine, et l'Algérie a commencé à s'aligner sur la scène internationale. Chaque apparition continentale fut d'abord une victoire logistique — la preuve qu'une équipe pouvait être réunie, préparée et envoyée représenter le pays.",
      ar: "اعترف الاتحاد الجزائري لكرة القدم تدريجيًا بمنتخب نسوي وطني، وبدأت الجزائر تنافس دوليًا. كانت كلّ مشاركة قارّية انتصارًا لوجستيًا أوّلًا — دليلًا على أنّ منتخبًا وطنيًا يمكن أن يُجمَع ويُحضَّر ويُبعَث لتمثيل البلاد.",
    },
  ] as LocalizedString[],
};

/* -------------------- 3. Their African Journey -------------------- */

export type WafconEntry = {
  id: string;
  year: number;
  host?: LocalizedString;
  stage?: LocalizedString;
  keyResult?: LocalizedString;
  note?: LocalizedString;
  source?: string;
};

/**
 * Verified continental appearances only. Additional editions may be added
 * from the Studio once sourced. "Group stage" is used conservatively where
 * Algeria did not advance beyond the first round.
 */
export const LES_VERTES_AFRICAN_JOURNEY: WafconEntry[] = [
  {
    id: "wafcon-2004",
    year: 2004,
    host: { en: "South Africa", fr: "Afrique du Sud", ar: "جنوب إفريقيا" },
    stage: { en: "Group stage", fr: "Phase de groupes", ar: "دور المجموعات" },
    note: {
      en: "One of Algeria's earliest appearances in the final tournament of the African Women's Championship.",
      fr: "L'une des premières participations de l'Algérie à la phase finale du Championnat d'Afrique féminin.",
      ar: "من أوائل مشاركات الجزائر في النهائيات القارية للسيدات.",
    },
    source: "CAF · Confédération Africaine de Football",
  },
  {
    id: "wafcon-2006",
    year: 2006,
    host: { en: "Nigeria", fr: "Nigéria", ar: "نيجيريا" },
    stage: { en: "Group stage", fr: "Phase de groupes", ar: "دور المجموعات" },
    note: {
      en: "Second consecutive appearance at the continental tournament.",
      fr: "Deuxième participation consécutive au tournoi continental.",
      ar: "مشاركة قارّية ثانية على التوالي.",
    },
    source: "CAF · Confédération Africaine de Football",
  },
  {
    id: "wafcon-2014",
    year: 2014,
    host: { en: "Namibia", fr: "Namibie", ar: "ناميبيا" },
    stage: { en: "Group stage", fr: "Phase de groupes", ar: "دور المجموعات" },
    note: {
      en: "Return to the African Women's Championship after several qualifying campaigns.",
      fr: "Retour au Championnat d'Afrique féminin après plusieurs campagnes qualificatives.",
      ar: "عودة إلى بطولة أفريقيا للسيدات بعد عدّة حملات تصفوية.",
    },
    source: "CAF · Confédération Africaine de Football",
  },
];

/* -------------------- 4. Breaking Barriers -------------------- */

export type BarrierTheme = {
  id: string;
  title: LocalizedString;
  body: LocalizedString;
};

export const LES_VERTES_BARRIERS: BarrierTheme[] = [
  {
    id: "visibility",
    title: { en: "Visibility", fr: "Visibilité", ar: "الحضور الإعلامي" },
    body: {
      en: "For years, matches were played with little media coverage. Highlights were rare and archives thin, which made every game a private effort of memory.",
      fr: "Longtemps, les matchs se jouaient sans véritable couverture médiatique. Les résumés étaient rares et les archives ténues — chaque rencontre relevait d'un travail de mémoire.",
      ar: "لسنوات طويلة، لُعبت المباريات دون تغطية إعلامية تُذكر. كانت المقاطع نادرة والأرشيف شحيحًا، فكانت كلّ مباراة عملًا خاصًّا للذاكرة.",
    },
  },
  {
    id: "resources",
    title: { en: "Resources", fr: "Moyens", ar: "الموارد" },
    body: {
      en: "Training grounds, medical staff and travel budgets rarely matched those of the men's programme. Progress came in modest, hard-won increments.",
      fr: "Terrains, staff médical et budgets de déplacement peinaient à égaler ceux du programme masculin. Les progrès sont venus par paliers modestes et difficilement acquis.",
      ar: "لم تُقارَن الملاعب والطواقم الطبية وميزانيات التنقّل بتلك المخصّصة للمنتخب الرجالي إلا نادرًا. جاء التقدّم بخطوات متواضعة انتُزعت بجهد.",
    },
  },
  {
    id: "facilities",
    title: { en: "Access to facilities", fr: "Accès aux installations", ar: "الوصول إلى المرافق" },
    body: {
      en: "Access to quality pitches and full-time coaching was uneven across regions. Many players grew up training wherever a field and a coach could be found.",
      fr: "L'accès à des terrains de qualité et à un encadrement à plein temps restait inégal selon les régions. Beaucoup de joueuses ont grandi en s'entraînant là où un terrain et un entraîneur pouvaient être trouvés.",
      ar: "ظلّ الوصول إلى ملاعب جيدة وتأطير متفرّغ متفاوتًا بحسب المناطق. ترعرعت لاعبات كثيرات وهنّ يتدرّبن حيثما توفّر ملعب ومدرّب.",
    },
  },
  {
    id: "dual-career",
    title: { en: "Dual careers", fr: "Doubles carrières", ar: "المسارات المزدوجة" },
    body: {
      en: "Balancing studies, work and international duty is a defining feature of the women's game. The players who represent Algeria almost always do so alongside a second life off the pitch.",
      fr: "Concilier études, emploi et sélection est une caractéristique du football féminin. Celles qui portent le maillot algérien le font presque toujours en parallèle d'une seconde vie hors du terrain.",
      ar: "التوفيق بين الدراسة والعمل والالتحاق بالمنتخب سمة أصيلة في الكرة النسوية. اللواتي يمثّلن الجزائر يقُمن بذلك دائمًا تقريبًا إلى جانب حياة ثانية خارج الملعب.",
    },
  },
  {
    id: "diaspora",
    title: { en: "The diaspora contribution", fr: "L'apport de la diaspora", ar: "إسهام الجالية" },
    body: {
      en: "Algerian and dual-heritage players formed in French, Belgian and other European club systems have brought professional experience into the national set-up, joining home-grown players to strengthen the squad.",
      fr: "Des joueuses algériennes et binationales formées dans les systèmes de clubs français, belges et d'autres championnats européens ont apporté leur expérience professionnelle à la sélection, aux côtés des joueuses formées au pays.",
      ar: "جلبت لاعبات جزائريات ومزدوجات الجنسية تكوَّنّ في أندية فرنسيّة وبلجيكية وأوروبية خبرة احترافية إلى صفوف المنتخب، إلى جانب اللاعبات المتخرّجات من المدارس المحلية.",
    },
  },
  {
    id: "coverage",
    title: { en: "Media coverage today", fr: "La couverture aujourd'hui", ar: "التغطية اليوم" },
    body: {
      en: "Recent seasons have brought more televised matches, more journalism, and a growing audience — a slow but real shift towards equal recognition.",
      fr: "Les dernières saisons ont apporté davantage de matchs télévisés, plus de journalisme et un public grandissant — un tournant lent mais réel vers une reconnaissance équitable.",
      ar: "شهدت المواسم الأخيرة بثّ مباريات أكثر وصحافة أوسع وجمهورًا متزايدًا — تحوّلًا بطيئًا لكنّه حقيقيّ نحو اعتراف منصف.",
    },
  },
];

/* -------------------- 5. Players to Know -------------------- */

export type PlayerCard = {
  id: string;
  fullName: string;
  photoUrl?: string;
  position?: LocalizedString;
  club?: string;
  caps?: number;
  achievement?: LocalizedString;
  biography?: LocalizedString;
  source?: string;
};

/**
 * Player cards ship intentionally empty. The Studio "Les Vertes" workspace
 * is responsible for adding verified biographies, statistics and photograph
 * credits before entries appear on the public exhibit.
 */
export const LES_VERTES_PLAYERS: PlayerCard[] = [];

/* -------------------- 6. A New Generation -------------------- */

export const LES_VERTES_NEW_GENERATION = {
  title: {
    en: "A New Generation",
    fr: "Une nouvelle génération",
    ar: "جيل جديد",
  } satisfies LocalizedString,
  paragraphs: [
    {
      en: "The current squad reflects a game in transformation. Algerian players are increasingly visible in professional leagues abroad — in France, Belgium, and beyond — bringing a full-time training culture back to the national set-up. At home, younger players are entering academies with pathways their predecessors did not have.",
      fr: "La sélection actuelle reflète un football en pleine transformation. Les joueuses algériennes sont de plus en plus visibles dans les championnats professionnels étrangers — en France, en Belgique et ailleurs — et ramènent une culture d'entraînement à plein temps au sein de la sélection. Au pays, les jeunes joueuses intègrent désormais des académies avec des parcours que leurs aînées n'ont pas connus.",
      ar: "يعكس المنتخب الحالي كرةً في تحوّل. تزداد بروز اللاعبات الجزائريّات في الدوريات الاحترافية بالخارج — فرنسا وبلجيكا وسواها — فيَحملن إلى المنتخب ثقافة تدريب متفرّغة. وفي الداخل، تلتحق اللاعبات الشابّات بأكاديميات بمسارات لم يعرفها الجيل السابق.",
    },
  ] as LocalizedString[],
  currentSquad: {
    heading: {
      en: "Current squad",
      fr: "Effectif actuel",
      ar: "التشكيلة الحالية",
    } satisfies LocalizedString,
    curatorNote: {
      en: "The current squad list is maintained from the DZ Odyssey Studio and updated after each international window.",
      fr: "La liste de l'effectif actuel est maintenue depuis le DZ Odyssey Studio et mise à jour à chaque fenêtre internationale.",
      ar: "تُدار قائمة التشكيلة الحالية من استوديو DZ Odyssey وتُحدَّث بعد كلّ نافذة دولية.",
    } satisfies LocalizedString,
    players: [] as PlayerCard[],
  },
};

/* -------------------- 7. Women's Clubs -------------------- */

export type WomensClub = {
  id: string;
  name: string;
  city?: LocalizedString;
  note?: LocalizedString;
};

/**
 * Space held for future women's club exhibits. Do not populate club histories
 * until they are researched and sourced from the Studio.
 */
export const LES_VERTES_CLUBS: WomensClub[] = [];

export const LES_VERTES_CLUBS_INTRO: LocalizedString = {
  en: "Women's club football in Algeria has quietly built the foundations of the national team. Regional championships, cup competitions and a handful of pioneering clubs have carried the game for years. Future exhibits in this hall will trace their stories one by one.",
  fr: "Le football féminin en clubs a discrètement bâti les fondations de la sélection. Championnats régionaux, coupes et quelques clubs pionniers portent le jeu depuis des années. De futurs exhibits raconteront leurs histoires une à une.",
  ar: "أرست كرة القدم النسوية للأندية في الجزائر بهدوءٍ أُسسَ المنتخب. حَملت البطولات الجهوية والكؤوس وأنديةٌ رائدة اللعبة لسنوات، وستُخصَّص لها معارض قادمة واحدةً تلو الأخرى.",
};

/* -------------------- 8. The Next Chapter -------------------- */

export const LES_VERTES_NEXT_CHAPTER = {
  title: {
    en: "The Next Chapter",
    fr: "Le prochain chapitre",
    ar: "الفصل القادم",
  } satisfies LocalizedString,
  body: {
    en: "The ambition is clear: to compete at the highest continental level, to reach a Women's Africa Cup of Nations knockout round, and to earn a first qualification for the FIFA Women's World Cup. Each generation moves the horizon a little further.",
    fr: "L'ambition est claire : peser au plus haut niveau continental, atteindre un tour à élimination directe de la CAN féminine et décrocher une première qualification à la Coupe du monde féminine. Chaque génération repousse l'horizon.",
    ar: "الطموح واضح: المنافسة في أعلى المستويات القارّية، وبلوغ دور الإقصاء في كأس أمم إفريقيا للسيدات، والتأهّل لأوّل مرّة إلى كأس العالم للسيدات. يدفع كلّ جيل الأفق أبعد قليلًا.",
  } satisfies LocalizedString,
  closingLine: {
    en: "Their history is still being written.",
    fr: "Leur histoire s'écrit encore.",
    ar: "لا تزال تُكتَب فصولُ حكايتهنّ.",
  } satisfies LocalizedString,
};

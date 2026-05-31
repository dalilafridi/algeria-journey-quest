/**
 * Signature Journeys — curated narrative paths through the museum.
 *
 * A Signature Journey is NOT new content. It is a guided thread that walks a
 * visitor through existing exhibits — figures, eras, regions, culture and the
 * atlas — in a deliberate, story-first sequence. Each stop references content
 * that already lives elsewhere in the app; the journey only adds a curated
 * chapter title and a short "why this matters" reflection so the visit feels
 * like following a story rather than browsing pages.
 */

import type { LocalizedString } from "@/lib/i18n";

const L = (en: string, fr: string, ar: string): LocalizedString => ({ en, fr, ar });

/**
 * A single stop. `figure`, `region` and `era` stops pull their portrait, name
 * and summary live from the existing datasets (single source of truth). The
 * `culture` and `atlas` stops carry their own inline framing because those
 * pages are essay-style hubs without per-item ids.
 */
export type JourneyStop =
  | {
      kind: "figure";
      id: string;
      title: LocalizedString;
      why: LocalizedString;
    }
  | {
      kind: "region";
      id: string;
      title: LocalizedString;
      why: LocalizedString;
    }
  | {
      kind: "era";
      id: string;
      title: LocalizedString;
      why: LocalizedString;
    }
  | {
      kind: "culture";
      emoji: string;
      name: LocalizedString;
      summary: LocalizedString;
      title: LocalizedString;
      why: LocalizedString;
    }
  | {
      kind: "atlas";
      emoji: string;
      name: LocalizedString;
      summary: LocalizedString;
      title: LocalizedString;
      why: LocalizedString;
    };

export type Journey = {
  id: string;
  /** Symbol engraved on the journey medallion (kept within the bronze set). */
  emblem: string;
  /** Accent token used for the journey card + player. */
  accent: string;
  /** Estimated completion time in minutes. */
  minutes: number;
  title: LocalizedString;
  /** One-line curatorial tagline shown on the card. */
  tagline: LocalizedString;
  /** Longer narrative overview shown on the journey's hero / welcome screen. */
  overview: LocalizedString;
  stops: JourneyStop[];
  /** Marks the entry-level "Grand Tour" so it can be featured separately. */
  grandTour?: boolean;
};

// ---------------------------------------------------------------------------
// Reusable inline framings for culture / atlas stops.
// ---------------------------------------------------------------------------

const CULTURE_AMAZIGH: Extract<JourneyStop, { kind: "culture" }> = {
  kind: "culture",
  emoji: "ⵣ",
  name: L("Tamazight & living identity", "Tamazight & identité vivante", "تامازيغت والهوية الحية"),
  summary: L(
    "Language, symbols and oral memory carried across millennia in the Culture hall.",
    "Langue, symboles et mémoire orale transmis à travers les millénaires, dans la salle Culture.",
    "لغة ورموز وذاكرة شفهية حُملت عبر آلاف السنين، في قاعة الثقافة.",
  ),
  title: L("Stop — A living language", "Étape — Une langue vivante", "محطة — لغة حيّة"),
  why: L(
    "Empires came and went, but the Amazigh tongue and its symbols never disappeared. Identity here is not a monument — it is something still spoken every day.",
    "Les empires sont venus et repartis, mais la langue amazighe et ses symboles n'ont jamais disparu. Ici, l'identité n'est pas un monument — c'est une parole encore vivante.",
    "جاءت الإمبراطوريات وذهبت، لكن اللسان الأمازيغي ورموزه لم تختفِ قط. الهوية هنا ليست نصبًا — بل كلامٌ ما زال يُقال كل يوم.",
  ),
};

const CULTURE_HOSPITALITY: Extract<JourneyStop, { kind: "culture" }> = {
  kind: "culture",
  emoji: "🫖",
  name: L("Hospitality & the desert table", "Hospitalité & table du désert", "الضيافة ومائدة الصحراء"),
  summary: L(
    "Tea poured three times, bread and salt before names — rituals of belonging.",
    "Le thé versé trois fois, le pain et le sel avant les noms — des rites d'appartenance.",
    "الشاي يُسكب ثلاثًا، والخبز والملح قبل الأسماء — طقوس انتماء.",
  ),
  title: L("Stop — Rituals of belonging", "Étape — Rites d'appartenance", "محطة — طقوس الانتماء"),
  why: L(
    "In a land this vast, hospitality is survival turned into grace. The way a guest is welcomed says everything about how a people sees the world.",
    "Sur une terre si vaste, l'hospitalité est la survie devenue grâce. La manière d'accueillir un hôte dit tout du regard d'un peuple sur le monde.",
    "في أرض بهذا الاتساع، الضيافة بقاءٌ تحوّل إلى لطف. وطريقة استقبال الضيف تقول كل شيء عن نظرة شعب إلى العالم.",
  ),
};

const ATLAS_EAST: Extract<JourneyStop, { kind: "atlas" }> = {
  kind: "atlas",
  emoji: "🗺️",
  name: L("Atlas — Eastern Algeria", "Atlas — Algérie de l'Est", "الأطلس — شرق الجزائر"),
  summary: L(
    "Trace the highlands of Constantine and the Aurès on the interactive map.",
    "Parcourez les hauts plateaux de Constantine et des Aurès sur la carte interactive.",
    "تتبّع هضاب قسنطينة والأوراس على الخريطة التفاعلية.",
  ),
  title: L("Stop — Walk the eastern highlands", "Étape — Les hauts plateaux de l'est", "محطة — هضاب الشرق"),
  why: L(
    "Geography is destiny here. The same mountains that sheltered ancient kings later hid the first fighters of the revolution. See where the story actually happened.",
    "Ici, la géographie est un destin. Les montagnes qui abritèrent les rois antiques cachèrent plus tard les premiers combattants de la révolution. Voyez où l'histoire a eu lieu.",
    "الجغرافيا هنا قدر. الجبال التي آوت الملوك القدماء أخفت لاحقًا أوائل مقاتلي الثورة. شاهد أين جرت القصة فعلًا.",
  ),
};

const ATLAS_SAHARA: Extract<JourneyStop, { kind: "atlas" }> = {
  kind: "atlas",
  emoji: "🧭",
  name: L("Atlas — The great Sahara", "Atlas — Le grand Sahara", "الأطلس — الصحراء الكبرى"),
  summary: L(
    "Follow the caravan routes and oases across 80% of Algeria's land.",
    "Suivez les routes caravanières et les oasis sur 80 % du territoire algérien.",
    "تتبّع طرق القوافل والواحات عبر 80٪ من مساحة الجزائر.",
  ),
  title: L("Stop — Read the desert map", "Étape — Lire la carte du désert", "محطة — قراءة خريطة الصحراء"),
  why: L(
    "The Sahara was never empty. Trade roads stitched North Africa to the Sahel, carrying gold, salt, books and faith. The map turns blank sand back into a crossroads.",
    "Le Sahara n'a jamais été vide. Les routes commerciales reliaient l'Afrique du Nord au Sahel, portant or, sel, livres et foi. La carte rend au sable son rôle de carrefour.",
    "لم تكن الصحراء فارغة قط. ربطت طرق التجارة شمال إفريقيا بالساحل حاملةً الذهب والملح والكتب والإيمان. الخريطة تعيد للرمال دورها كمُلتقى طرق.",
  ),
};

// ---------------------------------------------------------------------------
// The journeys.
// ---------------------------------------------------------------------------

export const JOURNEYS: Journey[] = [
  // 0 — START HERE: The Grand Tour
  {
    id: "grand-tour",
    grandTour: true,
    emblem: "❖",
    accent: "var(--brand-gold-deep)",
    minutes: 12,
    title: L("The Grand Tour", "La Grande Visite", "الجولة الكبرى"),
    tagline: L(
      "A 10–15 minute guided introduction to the best of the museum.",
      "Une introduction guidée de 10–15 minutes au meilleur du musée.",
      "مقدّمة موجَّهة من 10–15 دقيقة لأبرز ما في المتحف.",
    ),
    overview: L(
      "New here? Start with one unforgettable figure, one founding era, one region, one cultural ritual and one journey across the land. A short, complete first taste of Algeria through time.",
      "Nouveau ici ? Commencez par une figure inoubliable, une époque fondatrice, une région, un rite culturel et un voyage à travers le pays. Un premier aperçu court et complet de l'Algérie à travers le temps.",
      "جديد هنا؟ ابدأ بشخصية لا تُنسى، وحقبة تأسيسية، ومنطقة، وطقس ثقافي، ورحلة عبر الأرض. مذاق أول قصير وكامل للجزائر عبر الزمن.",
    ),
    stops: [
      {
        kind: "figure",
        id: "abdelkader",
        title: L("An iconic figure", "Une figure emblématique", "شخصية أيقونية"),
        why: L(
          "Emir Abdelkader is where many visitors fall in love with this story — a leader who built a state under fire and earned even his enemies' respect.",
          "L'Émir Abdelkader est l'instant où beaucoup tombent amoureux de cette histoire — un chef qui bâtit un État sous le feu et força le respect de ses ennemis.",
          "الأمير عبد القادر هو اللحظة التي يقع فيها كثيرون في حب هذه القصة — قائدٌ بنى دولة تحت النار ونال احترام أعدائه.",
        ),
      },
      {
        kind: "era",
        id: "independence",
        title: L("A defining era", "Une époque décisive", "حقبة فاصلة"),
        why: L(
          "The road to independence is the heart of modern Algerian memory — sacrifice, hope and a nation reborn.",
          "Le chemin vers l'indépendance est au cœur de la mémoire algérienne moderne — sacrifice, espoir et nation renaissante.",
          "طريق الاستقلال هو قلب الذاكرة الجزائرية الحديثة — تضحية وأمل وأمّة تُولد من جديد.",
        ),
      },
      {
        kind: "region",
        id: "kabylie",
        title: L("A region with a soul", "Une région avec une âme", "منطقة لها روح"),
        why: L(
          "Kabylie shows how land shapes people — mountains that protected a language, a music and a memory all their own.",
          "La Kabylie montre comment la terre façonne les hommes — des montagnes qui ont protégé une langue, une musique et une mémoire propres.",
          "تُظهر القبائل كيف تشكّل الأرض الناس — جبالٌ حمت لغةً وموسيقى وذاكرة خاصة بها.",
        ),
      },
      CULTURE_HOSPITALITY,
      ATLAS_EAST,
    ],
  },

  // 1 — From Massinissa to Modern Algeria
  {
    id: "massinissa-to-modern",
    emblem: "♔",
    accent: "var(--brand-gold-deep)",
    minutes: 16,
    title: L("From Massinissa to Modern Algeria", "De Massinissa à l'Algérie moderne", "من ماسينيسا إلى الجزائر الحديثة"),
    tagline: L(
      "The evolution of leadership, identity and nationhood across 2,000 years.",
      "L'évolution du pouvoir, de l'identité et de la nation sur 2 000 ans.",
      "تطوّر القيادة والهوية والدولة عبر 2000 عام.",
    ),
    overview: L(
      "One thread runs from the first unified kingdom to the modern republic: the search for a land that governs itself. Follow the leaders who carried that idea across more than two millennia.",
      "Un fil relie le premier royaume unifié à la république moderne : la quête d'une terre qui se gouverne elle-même. Suivez les chefs qui ont porté cette idée sur plus de deux millénaires.",
      "خيطٌ واحد يمتد من أول مملكة موحّدة إلى الجمهورية الحديثة: البحث عن أرض تحكم نفسها. تتبّع القادة الذين حملوا هذه الفكرة عبر أكثر من ألفي عام.",
    ),
    stops: [
      {
        kind: "figure",
        id: "massinissa",
        title: L("The first king", "Le premier roi", "الملك الأول"),
        why: L(
          "Massinissa fused scattered tribes into Numidia — the first idea of a unified land in this corner of Africa.",
          "Massinissa fondit des tribus dispersées en Numidie — la première idée d'une terre unie dans ce coin d'Afrique.",
          "وحّد ماسينيسا القبائل المتفرقة في نوميديا — أول فكرة لأرض موحّدة في هذا الركن من إفريقيا.",
        ),
      },
      {
        kind: "era",
        id: "numidia",
        title: L("The Numidian kingdoms", "Les royaumes numides", "الممالك النوميدية"),
        why: L(
          "For the first time, this land had a name, a capital and a crown of its own — the template every later state would echo.",
          "Pour la première fois, cette terre eut un nom, une capitale et une couronne — le modèle que tout État ultérieur répéterait.",
          "للمرة الأولى، صار لهذه الأرض اسمٌ وعاصمة وتاجٌ خاص — النموذج الذي ستردده كل دولة لاحقة.",
        ),
      },
      {
        kind: "figure",
        id: "abdelkader",
        title: L("The state under fire", "L'État sous le feu", "الدولة تحت النار"),
        why: L(
          "Two thousand years later, Emir Abdelkader rebuilt that idea of sovereignty against a modern empire — the bridge between old kingdoms and the fight for independence.",
          "Deux mille ans plus tard, l'Émir Abdelkader reconstruisit cette souveraineté face à un empire moderne — le pont entre anciens royaumes et lutte pour l'indépendance.",
          "بعد ألفي عام، أعاد الأمير عبد القادر بناء فكرة السيادة في وجه إمبراطورية حديثة — الجسر بين الممالك القديمة والكفاح من أجل الاستقلال.",
        ),
      },
      {
        kind: "figure",
        id: "ben-mhidi",
        title: L("The revolution's conscience", "La conscience de la révolution", "ضمير الثورة"),
        why: L(
          "Larbi Ben M'hidi turned the dream of self-rule into organised struggle. \"Throw the idea into the street,\" he said — and a generation answered.",
          "Larbi Ben M'hidi transforma le rêve d'autonomie en lutte organisée. « Jetez l'idée dans la rue », disait-il — et une génération répondit.",
          "حوّل العربي بن مهيدي حلم الحكم الذاتي إلى كفاح منظّم. «ألقوا الفكرة في الشارع»، قال — فأجاب جيل.",
        ),
      },
      {
        kind: "era",
        id: "independence",
        title: L("A nation reborn", "Une nation renaissante", "أمّة تُولد من جديد"),
        why: L(
          "1962 closed a 2,000-year arc: the land that Massinissa first unified finally governed itself again.",
          "1962 referma un arc de 2 000 ans : la terre que Massinissa unifia se gouvernait enfin de nouveau.",
          "أغلق عام 1962 قوسًا عمره 2000 عام: الأرض التي وحّدها ماسينيسا عادت أخيرًا تحكم نفسها.",
        ),
      },
      {
        kind: "figure",
        id: "ben-bella",
        title: L("The modern republic", "La république moderne", "الجمهورية الحديثة"),
        why: L(
          "Ahmed Ben Bella became independent Algeria's first president — the ancient idea of self-rule made into a modern state.",
          "Ahmed Ben Bella devint le premier président de l'Algérie indépendante — l'antique idée d'autonomie devenue État moderne.",
          "أصبح أحمد بن بلة أول رئيس للجزائر المستقلة — فكرة الحكم الذاتي القديمة صارت دولة حديثة.",
        ),
      },
    ],
  },

  // 2 — Women Who Shaped Algeria
  {
    id: "women-who-shaped-algeria",
    emblem: "❀",
    accent: "var(--brand-terracotta, var(--brand-gold))",
    minutes: 15,
    title: L("Women Who Shaped Algeria", "Les femmes qui ont façonné l'Algérie", "نساء صنعن الجزائر"),
    tagline: L(
      "Resistance, culture, education and memory — carried by women.",
      "Résistance, culture, éducation et mémoire — portées par des femmes.",
      "مقاومة وثقافة وتعليم وذاكرة — حملتها نساء.",
    ),
    overview: L(
      "From mountain queens to revolutionary fighters and Nobel-shortlisted writers, Algeria's story was shaped at every turn by women — often written out of the records they helped create. This journey puts them back at the centre.",
      "Des reines des montagnes aux combattantes de la révolution et aux écrivaines de renommée mondiale, l'histoire de l'Algérie fut façonnée à chaque tournant par des femmes — souvent effacées des archives qu'elles ont créées. Cette visite les remet au centre.",
      "من ملكات الجبال إلى مقاتلات الثورة والكاتبات العالميات، صاغت النساء قصة الجزائر عند كل منعطف — وكثيرًا ما حُذفن من السجلات التي صنعنها. هذه الرحلة تعيدهن إلى المركز.",
    ),
    stops: [
      {
        kind: "figure",
        id: "dihya",
        title: L("The warrior queen", "La reine guerrière", "الملكة المحاربة"),
        why: L(
          "From the peaks of the Aurès, Dihya led an Amazigh confederation against empire — the enduring symbol of a land that refuses to be ruled from afar.",
          "Depuis les sommets des Aurès, Dihya mena une confédération amazighe contre l'empire — symbole durable d'une terre refusant d'être gouvernée de loin.",
          "من قمم الأوراس، قادت ديهيا اتحادًا أمازيغيًا في وجه الإمبراطورية — رمزٌ خالد لأرض ترفض أن تُحكم من بعيد.",
        ),
      },
      {
        kind: "figure",
        id: "lalla-fatma-nsoumer",
        title: L("Joan of the mountains", "La Jeanne des montagnes", "جان دارك الجبال"),
        why: L(
          "Lalla Fatma N'Soumer led Kabyle resistance against French troops in the 1850s — proof that the defence of the land was never only a man's task.",
          "Lalla Fatma N'Soumer mena la résistance kabyle face aux troupes françaises dans les années 1850 — preuve que défendre la terre ne fut jamais l'affaire des seuls hommes.",
          "قادت لالة فاطمة نسومر المقاومة القبائلية ضد القوات الفرنسية في خمسينيات القرن 19 — دليلٌ أن الدفاع عن الأرض لم يكن يومًا مهمة الرجال وحدهم.",
        ),
      },
      {
        kind: "figure",
        id: "djamila-bouhired",
        title: L("The face of the revolution", "Le visage de la révolution", "وجه الثورة"),
        why: L(
          "Arrested and tortured during the Battle of Algiers, Djamila Bouhired became a global symbol of the independence struggle while still in her twenties.",
          "Arrêtée et torturée pendant la Bataille d'Alger, Djamila Bouhired devint, à peine vingtenaire, un symbole mondial de la lutte pour l'indépendance.",
          "اعتُقلت وعُذّبت خلال معركة الجزائر، فصارت جميلة بوحيرد وهي في العشرينيات رمزًا عالميًا لكفاح الاستقلال.",
        ),
      },
      {
        kind: "figure",
        id: "hassiba-ben-bouali",
        title: L("The price of freedom", "Le prix de la liberté", "ثمن الحرية"),
        why: L(
          "Hassiba Ben Bouali died at twenty in the Casbah rather than surrender — her name now carried by streets and schools across the country.",
          "Hassiba Ben Bouali mourut à vingt ans dans la Casbah plutôt que de se rendre — son nom porté aujourd'hui par des rues et des écoles dans tout le pays.",
          "ماتت حسيبة بن بوعلي في العشرين داخل القصبة رافضةً الاستسلام — واسمها اليوم على شوارع ومدارس في كل البلاد.",
        ),
      },
      CULTURE_HOSPITALITY,
      {
        kind: "figure",
        id: "assia-djebar",
        title: L("Giving silence a voice", "Donner une voix au silence", "صوتٌ للصمت"),
        why: L(
          "Assia Djebar carried the memory of silenced women into world literature — the journey does not end in war, it continues in story.",
          "Assia Djebar porta la mémoire des femmes réduites au silence dans la littérature mondiale — la visite ne s'achève pas dans la guerre, elle continue dans le récit.",
          "حملت آسيا جبار ذاكرة النساء المُسكتات إلى الأدب العالمي — لا تنتهي الرحلة بالحرب، بل تستمر في الحكاية.",
        ),
      },
    ],
  },

  // 3 — The Spirit of Resistance
  {
    id: "spirit-of-resistance",
    emblem: "⚔",
    accent: "var(--brand-gold-deep)",
    minutes: 15,
    title: L("The Spirit of Resistance", "L'esprit de résistance", "روح المقاومة"),
    tagline: L(
      "From Jugurtha to Ben M'hidi — a journey through resilience.",
      "De Jugurtha à Ben M'hidi — un voyage à travers la résilience.",
      "من يوغرطة إلى بن مهيدي — رحلة في الصمود.",
    ),
    overview: L(
      "Across every era, the same refusal returns: to be conquered, erased or ruled from elsewhere. This journey follows the unbroken thread of resistance — from an ancient king who defied Rome to the strategists of the revolution.",
      "À chaque époque revient le même refus : être conquis, effacé ou gouverné d'ailleurs. Cette visite suit le fil ininterrompu de la résistance — d'un roi antique défiant Rome aux stratèges de la révolution.",
      "في كل حقبة يعود الرفض نفسه: أن يُغزى المرء أو يُمحى أو يُحكم من الخارج. تتبّع هذه الرحلة خيط المقاومة المتصل — من ملك قديم تحدّى روما إلى مخططي الثورة.",
    ),
    stops: [
      {
        kind: "figure",
        id: "jugurtha",
        title: L("The king who defied Rome", "Le roi qui défia Rome", "الملك الذي تحدّى روما"),
        why: L(
          "Jugurtha fought the greatest power of his age to a standstill and exposed its corruption — resistance, this land's oldest reflex, begins here.",
          "Jugurtha tint tête à la plus grande puissance de son temps et révéla sa corruption — la résistance, plus vieux réflexe de cette terre, commence ici.",
          "صمد يوغرطة أمام أعظم قوة في عصره وكشف فسادها — المقاومة، أقدم غريزة في هذه الأرض، تبدأ من هنا.",
        ),
      },
      {
        kind: "figure",
        id: "dihya",
        title: L("Queen of the Aurès", "Reine des Aurès", "ملكة الأوراس"),
        why: L(
          "Centuries later Dihya rallied the mountains against another empire — the same spirit, a new century.",
          "Des siècles plus tard, Dihya souleva les montagnes contre un autre empire — le même esprit, un nouveau siècle.",
          "بعد قرون، حشدت ديهيا الجبال في وجه إمبراطورية أخرى — الروح ذاتها في قرن جديد.",
        ),
      },
      {
        kind: "figure",
        id: "abdelkader",
        title: L("Resistance with honour", "Résistance et honneur", "مقاومة بشرف"),
        why: L(
          "Emir Abdelkader showed resistance could be both fierce and just — a moral standard admired even by his enemies.",
          "L'Émir Abdelkader montra qu'une résistance pouvait être à la fois farouche et juste — une exigence morale admirée jusque chez ses ennemis.",
          "أظهر الأمير عبد القادر أن المقاومة يمكن أن تكون شرسة وعادلة معًا — معيارٌ أخلاقي أعجب به حتى أعداؤه.",
        ),
      },
      {
        kind: "figure",
        id: "el-mokrani",
        title: L("The last great revolt", "La dernière grande révolte", "آخر ثورة كبرى"),
        why: L(
          "El Mokrani's 1871 uprising was the largest revolt against colonial rule before the revolution — defeat that kept the flame alive.",
          "Le soulèvement d'El Mokrani en 1871 fut la plus grande révolte contre la colonisation avant la révolution — une défaite qui garda la flamme vivante.",
          "كانت ثورة المقراني عام 1871 أكبر انتفاضة ضد الاستعمار قبل الثورة — هزيمةٌ أبقت الجذوة حية.",
        ),
      },
      {
        kind: "region",
        id: "aures",
        title: L("Where the fire was lit", "Là où le feu fut allumé", "حيث أُشعلت النار"),
        why: L(
          "The Aurès turned rugged geography into a fortress of freedom — and on 1 November 1954, the first shots of the revolution rang out here.",
          "Les Aurès transformèrent un relief escarpé en forteresse de liberté — et le 1ᵉʳ novembre 1954, les premiers coups de feu de la révolution y retentirent.",
          "حوّل الأوراس تضاريسه الوعرة إلى حصن للحرية — وفي 1 نوفمبر 1954 انطلقت منه أولى رصاصات الثورة.",
        ),
      },
      {
        kind: "figure",
        id: "ben-mhidi",
        title: L("The idea that could not die", "L'idée qui ne pouvait mourir", "الفكرة التي لا تموت"),
        why: L(
          "Larbi Ben M'hidi gave the final chapter its conscience. Two thousand years of refusal converged in a single, unbreakable resolve.",
          "Larbi Ben M'hidi donna sa conscience au dernier chapitre. Deux mille ans de refus convergèrent en une résolution incassable.",
          "منح العربي بن مهيدي الفصل الأخير ضميره. التقت ألفا عام من الرفض في عزيمة واحدة لا تُكسر.",
        ),
      },
    ],
  },

  // 4 — Amazigh Heritage Through Time
  {
    id: "amazigh-heritage",
    emblem: "ⵣ",
    accent: "var(--brand-olive, var(--brand-gold))",
    minutes: 14,
    title: L("Amazigh Heritage Through Time", "Le patrimoine amazigh à travers le temps", "التراث الأمازيغي عبر الزمن"),
    tagline: L(
      "Language, culture, identity, symbolism and continuity.",
      "Langue, culture, identité, symbolisme et continuité.",
      "لغة وثقافة وهوية ورمزية واستمرارية.",
    ),
    overview: L(
      "Long before modern borders, the Amazigh people were already here — and they never left. This journey follows a 3,000-year continuity of language, symbols and song that survived every empire that passed through.",
      "Bien avant les frontières modernes, les Amazighs étaient déjà là — et ils ne sont jamais partis. Cette visite suit une continuité de 3 000 ans de langue, de symboles et de chant, survivant à chaque empire de passage.",
      "قبل الحدود الحديثة بزمن طويل، كان الأمازيغ هنا — ولم يرحلوا قط. تتبّع هذه الرحلة استمرارية عمرها 3000 عام من اللغة والرموز والغناء نجت من كل إمبراطورية عابرة.",
    ),
    stops: [
      {
        kind: "era",
        id: "earlynorthafrica",
        title: L("Before the borders", "Avant les frontières", "قبل الحدود"),
        why: L(
          "Amazigh leaders shaped the ancient world long before Numidia — even ruling Egypt as pharaohs. The roots run deeper than most histories admit.",
          "Des chefs amazighs façonnèrent le monde antique bien avant la Numidie — régnant même sur l'Égypte en pharaons. Les racines sont plus profondes que la plupart des récits.",
          "صاغ قادة أمازيغ العالم القديم قبل نوميديا بكثير — حتى حكموا مصر كفراعنة. الجذور أعمق مما تعترف به أغلب الروايات.",
        ),
      },
      {
        kind: "region",
        id: "kabylie",
        title: L("Mountains that kept a language", "Des montagnes gardiennes d'une langue", "جبال حفظت لغة"),
        why: L(
          "Kabylie's peaks became a vault for Tamazight, poetry and oral memory — geography protecting identity across centuries.",
          "Les sommets de Kabylie devinrent un coffre pour le tamazight, la poésie et la mémoire orale — la géographie protégeant l'identité à travers les siècles.",
          "صارت قمم القبائل خزانة لتامازيغت والشعر والذاكرة الشفهية — جغرافيا تحمي الهوية عبر القرون.",
        ),
      },
      CULTURE_AMAZIGH,
      {
        kind: "figure",
        id: "mammeri",
        title: L("The scholar of memory", "Le savant de la mémoire", "عالِم الذاكرة"),
        why: L(
          "Mouloud Mammeri rescued Amazigh poetry and grammar from disappearing — turning a spoken heritage into a written future.",
          "Mouloud Mammeri sauva la poésie et la grammaire amazighes de l'oubli — transformant un héritage oral en avenir écrit.",
          "أنقذ مولود معمري الشعر والقواعد الأمازيغية من الاندثار — محوّلًا إرثًا شفهيًا إلى مستقبل مكتوب.",
        ),
      },
      ATLAS_SAHARA,
      {
        kind: "figure",
        id: "matoub",
        title: L("The voice that refused silence", "La voix qui refusa le silence", "الصوت الذي رفض الصمت"),
        why: L(
          "Lounès Matoub turned song into resistance for language and identity — proof that Amazigh heritage is not a relic, but a living, defiant present.",
          "Lounès Matoub fit du chant une résistance pour la langue et l'identité — preuve que le patrimoine amazigh n'est pas une relique, mais un présent vivant et insoumis.",
          "حوّل لونيس معطوب الأغنية إلى مقاومة من أجل اللغة والهوية — دليلٌ أن التراث الأمازيغي ليس أثرًا، بل حاضرٌ حيّ متمرّد.",
        ),
      },
    ],
  },

  // 5 — Voices of the Sahara
  {
    id: "voices-of-the-sahara",
    emblem: "☼",
    accent: "var(--brand-gold)",
    minutes: 13,
    title: L("Voices of the Sahara", "Voix du Sahara", "أصوات الصحراء"),
    tagline: L(
      "Trade routes, caravans, Tuareg heritage, oasis life and desert memory.",
      "Routes commerciales, caravanes, héritage touareg, vie des oasis et mémoire du désert.",
      "طرق التجارة والقوافل وتراث الطوارق وحياة الواحات وذاكرة الصحراء.",
    ),
    overview: L(
      "The Sahara covers most of Algeria, yet it is the least understood. Far from empty, it was a sea of sand crossed by caravans, ruled by its own codes of hospitality and remembered in song. This journey listens to the desert.",
      "Le Sahara couvre l'essentiel de l'Algérie, et reste pourtant le moins compris. Loin d'être vide, c'était une mer de sable traversée par les caravanes, régie par ses codes d'hospitalité et gardée dans le chant. Cette visite écoute le désert.",
      "تغطي الصحراء معظم الجزائر، ومع ذلك تبقى الأقل فهمًا. بعيدةً عن الفراغ، كانت بحرًا من الرمال تعبره القوافل، تحكمه أعرافه في الضيافة، ويُحفظ في الغناء. هذه الرحلة تُصغي إلى الصحراء.",
    ),
    stops: [
      {
        kind: "region",
        id: "sahara",
        title: L("A sea of sand", "Une mer de sable", "بحر من الرمال"),
        why: L(
          "Dunes, oases and ancient caravan roads cover 80% of Algeria — the desert is not the edge of the country, it is most of it.",
          "Dunes, oasis et anciennes routes caravanières couvrent 80 % de l'Algérie — le désert n'est pas la marge du pays, il en est l'essentiel.",
          "تغطي الكثبان والواحات وطرق القوافل القديمة 80٪ من الجزائر — الصحراء ليست هامش البلاد، بل معظمها.",
        ),
      },
      ATLAS_SAHARA,
      CULTURE_HOSPITALITY,
      {
        kind: "figure",
        id: "ben-nacer-benchohra",
        title: L("Resistance in the dunes", "La résistance dans les dunes", "مقاومة في الكثبان"),
        why: L(
          "Ben Nacer Benchohra led desert resistance against colonial expansion — proof that even the open Sahara had its defenders.",
          "Ben Nacer Benchohra mena la résistance du désert face à l'expansion coloniale — preuve que même le Sahara ouvert eut ses défenseurs.",
          "قاد بن ناصر بن شهرة مقاومة الصحراء ضد التوسع الاستعماري — دليلٌ أن الصحراء المفتوحة كان لها مدافعوها.",
        ),
      },
      {
        kind: "figure",
        id: "moufdi-zakaria",
        title: L("The desert's poet", "Le poète du désert", "شاعر الصحراء"),
        why: L(
          "Born in the Mzab oasis, Moufdi Zakaria wrote Algeria's national anthem — the desert's voice became the nation's song.",
          "Né dans l'oasis du Mzab, Moufdi Zakaria écrivit l'hymne national algérien — la voix du désert devint le chant de la nation.",
          "وُلد مفدي زكريا في واحة ميزاب وكتب النشيد الوطني الجزائري — فصار صوت الصحراء نشيد الأمّة.",
        ),
      },
    ],
  },
];

export function getJourney(id: string): Journey | undefined {
  return JOURNEYS.find((j) => j.id === id);
}

/** The featured "start here" journey. */
export const GRAND_TOUR = JOURNEYS.find((j) => j.grandTour)!;

/** The curated journeys (everything except the Grand Tour). */
export const SIGNATURE_JOURNEYS = JOURNEYS.filter((j) => !j.grandTour);

/**
 * Culture topics — curated cultural exhibits.
 *
 * Each topic (Music, Cuisine, Architecture, Languages, Literature, Festivals,
 * Oral Traditions) becomes a dedicated museum exhibit rendered on the shared
 * MuseumCatalogPage template. Content is hand-authored, trilingual and
 * storytelling-first — a wall-text essay rather than an encyclopedia entry.
 */

import type { LocalizedString } from "@/lib/i18n";

const L = (en: string, fr: string, ar: string): LocalizedString => ({ en, fr, ar });

export type CultureTradition = {
  emoji: string;
  title: LocalizedString;
  body: LocalizedString;
};

export type CultureStory = {
  glyph?: string;
  title: LocalizedString;
  note: LocalizedString;
  /** Optional route link (TanStack `to`) + params. */
  to?: string;
  params?: Record<string, string>;
};

export type CultureTopic = {
  id: string;
  /** Engraved emblem glyph (kept within the bronze symbol set). */
  emblem: string;
  title: LocalizedString;
  /** Poetic one-line subtitle. */
  tagline: LocalizedString;
  /** Narrative introduction (hero intro). */
  intro: LocalizedString;
  /** Why this part of culture matters. */
  significance: LocalizedString;
  /** Where it comes from across time. */
  historicalContext: LocalizedString;
  /** Living traditions / forms within the topic. */
  traditions: CultureTradition[];
  /** How it shaped Algerian identity. */
  influence: LocalizedString;
  /** Curator's reflective note. */
  curatorNote: LocalizedString;
  /** Related stories / exhibits to wander into next. */
  relatedStories: CultureStory[];

  /* ----- sidebar connections ----- */
  regionIds: string[];
  eraIds: string[];
  figureIds: string[];
  themes: { emoji: string; label: LocalizedString }[];
  facts: LocalizedString[];
};

export const CULTURE_TOPICS: CultureTopic[] = [
  /* ============================================================ MUSIC === */
  {
    id: "music",
    emblem: "🎻",
    title: L("Music & Sound", "Musique & son", "الموسيقى والصوت"),
    tagline: L(
      "A country that thinks out loud, in melody.",
      "Un pays qui pense à voix haute, en mélodie.",
      "بلد يفكّر بصوت عالٍ، باللحن.",
    ),
    intro: L(
      "From the courtly suites of Andalusian Nuba to the defiant pulse of Raï, Algerian music is memory you can dance to — the country's oldest way of saying what cannot be written down.",
      "Des suites raffinées de la Nouba andalouse au pouls insolent du Raï, la musique algérienne est une mémoire que l'on peut danser — la plus ancienne façon du pays de dire l'indicible.",
      "من سلاسل النوبة الأندلسية الراقية إلى نبض الرّاي المتمرّد، الموسيقى الجزائرية ذاكرة يمكن أن تُرقص — أقدم طريقة للبلاد لقول ما لا يُكتب.",
    ),
    significance: L(
      "Music here is not entertainment alone; it is archive, protest and prayer. A single song can carry a region's dialect, a generation's grief and a wedding's joy in the same breath.",
      "La musique n'est pas qu'un divertissement ; elle est archive, protestation et prière. Une seule chanson peut porter le dialecte d'une région, le deuil d'une génération et la joie d'un mariage d'un même souffle.",
      "الموسيقى هنا ليست تسلية فحسب؛ بل أرشيف واحتجاج وصلاة. أغنية واحدة قد تحمل لهجة منطقة وحزن جيل وفرح عرس في نفَس واحد.",
    ),
    historicalContext: L(
      "Carried from al-Andalus by exiled Muslims and Jews, refined in Ottoman city conservatories, reborn in the cabarets of Oran and the cafés of the Casbah — each era left a sound that never fully faded.",
      "Apportée d'al-Andalus par les exilés musulmans et juifs, raffinée dans les conservatoires ottomans, renée dans les cabarets d'Oran et les cafés de la Casbah — chaque époque a laissé un son qui ne s'est jamais tout à fait éteint.",
      "حُملت من الأندلس مع المنفيين المسلمين واليهود، وصُقلت في معاهد المدن العثمانية، ووُلدت من جديد في حانات وهران ومقاهي القصبة — كل عصر ترك صوتًا لم يخبُ تمامًا.",
    ),
    traditions: [
      {
        emoji: "🎻",
        title: L("Andalusian Nuba", "Nouba andalouse", "النوبة الأندلسية"),
        body: L(
          "A courtly suite of moods carried from al-Andalus — a Mediterranean memory still rehearsed every week in the conservatories of Algiers, Tlemcen and Constantine.",
          "Une suite raffinée de modes apportée d'al-Andalus — une mémoire méditerranéenne encore répétée chaque semaine dans les conservatoires d'Alger, Tlemcen et Constantine.",
          "سلسلة مقامية راقية حُملت من الأندلس — ذاكرة متوسطية لا تزال تُعزف كل أسبوع في معاهد الجزائر وتلمسان وقسنطينة.",
        ),
      },
      {
        emoji: "🎤",
        title: L("Raï — Voice of the West", "Raï — la voix de l'Ouest", "الرّاي — صوت الغرب"),
        body: L(
          "Born in the cabarets of Oran, Raï turned everyday pain — exile, love, defiance — into pulse. Cheikha Rimitti and Khaled gave Algeria a sound the world danced to.",
          "Né dans les cabarets d'Oran, le Raï a transformé la douleur quotidienne — exil, amour, défi — en pulsation. Cheikha Rimitti et Khaled ont donné à l'Algérie un son que le monde a dansé.",
          "وُلد الرّاي في حانات وهران، فحوّل ألم اليومي — الغربة، الحب، التحدي — إلى نبض. منحت الشيخة الريميتي وخالد الجزائرَ صوتًا رقص عليه العالم.",
        ),
      },
      {
        emoji: "🪕",
        title: L("Chaabi of the Casbah", "Chaâbi de la Casbah", "الشعبي في القصبة"),
        body: L(
          "El Hadj M'Hamed El Anka tuned popular poetry to mandole and tambourine. Chaabi is the long evening of an Algerian café — patient, witty, deep.",
          "El Hadj M'Hamed El Anka a accordé la poésie populaire au mandole et au tambourin. Le Chaâbi, c'est la longue soirée d'un café algérien — patient, spirituel, profond.",
          "ضبط الحاج محمد العنقا الشعر الشعبي على الماندول والدف. الشعبي مساء طويل في مقهى جزائري — صبور، ذكي، عميق.",
        ),
      },
      {
        emoji: "ⵣ",
        title: L("Amazigh & Tuareg rhythms", "Rythmes amazighs & touaregs", "إيقاعات أمازيغية وطوارقية"),
        body: L(
          "From Idir's quiet guitar to the imzad of the Hoggar — a one-string violin played only by women — the oldest voice of this land has never stopped singing.",
          "De la guitare paisible d'Idir à l'imzad du Hoggar — vièle à une corde jouée seulement par les femmes — la plus ancienne voix de cette terre n'a jamais cessé de chanter.",
          "من غيتار إيدير الهادئ إلى إمزاد الهقار — كمان بوتر واحد لا تعزفه إلا النساء — لم يصمت يومًا أقدم صوت في هذه الأرض.",
        ),
      },
    ],
    influence: L(
      "When the language was pressed and the land seized, song kept identity alive in kitchens and exile. Today a wedding without music is unthinkable — and a protest without a chant is only half-spoken.",
      "Quand la langue fut pressée et la terre saisie, le chant a maintenu l'identité vivante dans les cuisines et l'exil. Aujourd'hui, un mariage sans musique est impensable — et une manifestation sans chant n'est qu'à moitié dite.",
      "حين كُبتت اللغة وصودرت الأرض، أبقى الغناء الهوية حيّة في المطابخ والمنفى. اليوم لا يُتصوّر عرس بلا موسيقى — ولا مظاهرة بلا هتاف إلا نصف مقولة.",
    ),
    curatorNote: L(
      "Listen for the silence between the notes. In Algerian music the pause is not empty — it is where the listener is invited to remember.",
      "Écoutez le silence entre les notes. Dans la musique algérienne, la pause n'est pas vide — c'est là que l'auditeur est invité à se souvenir.",
      "أنصت إلى الصمت بين النغمات. في الموسيقى الجزائرية ليست الوقفة فراغًا — بل هي حيث يُدعى المستمع إلى التذكّر.",
    ),
    relatedStories: [
      { glyph: "🎧", title: L("Listen archive", "Archive d'écoute", "أرشيف الاستماع"), note: L("Voices of culture", "Voix de la culture", "أصوات الثقافة"), to: "/words" },
      { glyph: "❧", title: L("Oral Traditions", "Traditions orales", "التقاليد الشفهية"), note: L("Where song begins", "Là où naît le chant", "حيث يبدأ الغناء"), to: "/culture/$topicId", params: { topicId: "oral-traditions" } },
    ],
    regionIds: ["algiers", "oran-west", "kabylie", "sahara"],
    eraIds: ["islamic", "ottoman", "independence"],
    figureIds: ["el-anka", "idir", "matoub", "ait-menguellet", "khaled", "warda"],
    themes: [
      { emoji: "🎶", label: L("Melody as memory", "Mélodie-mémoire", "اللحن ذاكرة") },
      { emoji: "✊", label: L("Song as protest", "Chant de révolte", "الغناء احتجاج") },
      { emoji: "🌍", label: L("Diaspora sound", "Son de la diaspora", "صوت المهجر") },
    ],
    facts: [
      L("Raï crossed from Oran's cabarets to world stages in the 1980s.", "Le Raï est passé des cabarets d'Oran aux scènes mondiales dans les années 1980.", "انتقل الرّاي من حانات وهران إلى مسارح العالم في الثمانينيات."),
      L("The imzad of the Hoggar is traditionally played only by women.", "L'imzad du Hoggar est traditionnellement joué seulement par les femmes.", "إمزاد الهقار تعزفه النساء فقط تقليديًا."),
      L("Andalusian Nuba survives in three city schools: Algiers, Tlemcen, Constantine.", "La Nouba andalouse survit dans trois écoles : Alger, Tlemcen, Constantine.", "تبقى النوبة الأندلسية في ثلاث مدارس: الجزائر، تلمسان، قسنطينة."),
    ],
  },

  /* ========================================================== CUISINE === */
  {
    id: "cuisine",
    emblem: "🍲",
    title: L("Cuisine & the Table", "Cuisine & la table", "المطبخ والمائدة"),
    tagline: L(
      "Where a meal is a calendar and bread is sacred.",
      "Où un repas est un calendrier et le pain est sacré.",
      "حيث الوجبة تقويم والخبز مقدّس.",
    ),
    intro: L(
      "Algerian cuisine is geography you can taste — wheat of the highlands, dates of the oasis, olives of Kabylie, spices of the souk. Every dish is a small act of belonging.",
      "La cuisine algérienne est une géographie que l'on goûte — blé des hauts plateaux, dattes de l'oasis, olives de Kabylie, épices du souk. Chaque plat est un petit acte d'appartenance.",
      "المطبخ الجزائري جغرافيا تُتذوّق — قمح الهضاب وتمر الواحة وزيتون القبائل وتوابل السوق. كل طبق فعل انتماء صغير.",
    ),
    significance: L(
      "Food here measures time and relationship. Friday couscous gathers the family; a guest is fed before they are asked their name; a fallen crumb of bread is picked up and kissed.",
      "Ici, la nourriture mesure le temps et le lien. Le couscous du vendredi rassemble la famille ; l'invité est nourri avant qu'on lui demande son nom ; une miette de pain tombée se ramasse et s'embrasse.",
      "هنا يقيس الطعام الزمن والعلاقة. كسكس الجمعة يجمع العائلة؛ يُطعَم الضيف قبل أن يُسأل اسمه؛ وكسرة خبز سقطت تُلتقط وتُقبَّل.",
    ),
    historicalContext: L(
      "Berber staples met Arab spices, Ottoman pastries and Mediterranean produce. Colonial scarcity sharpened the art of making much from little — a thrift that still flavours the modern table.",
      "Les bases berbères ont rencontré les épices arabes, les pâtisseries ottomanes et les produits méditerranéens. La pénurie coloniale a aiguisé l'art de faire beaucoup avec peu — une économie qui assaisonne encore la table moderne.",
      "التقت الأطعمة الأمازيغية بالتوابل العربية والحلويات العثمانية ومنتجات المتوسط. وشحذ شُحّ الاستعمار فنّ صنع الكثير من القليل — اقتصاد لا يزال يتبّل المائدة الحديثة.",
    ),
    traditions: [
      {
        emoji: "🍲",
        title: L("Couscous on Friday", "Le couscous du vendredi", "كسكس الجمعة"),
        body: L(
          "Friday couscous gathers the family in one motion — rolling semolina, stacking the steamer, waiting. The dish is a calendar more than a meal.",
          "Le couscous du vendredi rassemble la famille en un seul geste — rouler la semoule, dresser le couscoussier, attendre. Le plat est plus un calendrier qu'un repas.",
          "كسكس الجمعة يجمع العائلة في حركة واحدة — فتل السميد، تركيب الكسكاس، الانتظار. الطبق تقويم أكثر منه وجبة.",
        ),
      },
      {
        emoji: "🌴",
        title: L("Dates of the oasis", "Les dattes de l'oasis", "تمر الواحة"),
        body: L(
          "Deglet Nour is the 'finger of light' — fruit of three generations of patience. To break a fast with a date is to taste the desert's restraint.",
          "Deglet Nour, le « doigt de lumière » — fruit de trois générations de patience. Rompre le jeûne avec une datte, c'est goûter la retenue du désert.",
          "دقلة نور هي «إصبع النور» — ثمرة صبر ثلاثة أجيال. أن تفطر على تمرة هو أن تتذوّق صبر الصحراء.",
        ),
      },
      {
        emoji: "🌙",
        title: L("Ramadan evenings", "Les soirées du Ramadan", "ليالي رمضان"),
        body: L(
          "Streets quiet at dusk, then bloom — chorba steaming, lanterns up, neighbours louder than usual. Ramadan turns the country into one long shared table.",
          "Les rues se taisent au crépuscule, puis fleurissent — chorba fumante, lanternes allumées, voisins plus bruyants. Le Ramadan fait du pays une longue table partagée.",
          "تهدأ الشوارع عند الغروب ثم تتفتّح — شربة يتصاعد بخارها، فوانيس مضاءة، جيران أعلى صوتًا. يحوّل رمضان البلاد إلى مائدة طويلة مشتركة.",
        ),
      },
      {
        emoji: "🥖",
        title: L("Bread is sacred", "Le pain est sacré", "الخبز مقدّس"),
        body: L(
          "Kesra, matloue, baguette — a fallen crumb is picked up and kissed. Bread carries a debt to land, hands, and the women who shaped both.",
          "Kesra, matloue, baguette — une miette tombée se ramasse et s'embrasse. Le pain porte une dette envers la terre, les mains et les femmes qui ont façonné les deux.",
          "كسرة، مطلوع، بغات — كسرة سقطت تُلتقط وتُقبَّل. الخبز يحمل دينًا للأرض وللأيدي وللنساء اللواتي شكّلتهما.",
        ),
      },
    ],
    influence: L(
      "The table is where Algeria practices its deepest values — hospitality, patience, sharing. To eat together is to declare, quietly, that we belong to one another.",
      "La table est le lieu où l'Algérie pratique ses valeurs les plus profondes — hospitalité, patience, partage. Manger ensemble, c'est déclarer, en silence, que nous nous appartenons.",
      "المائدة حيث تمارس الجزائر أعمق قيمها — الكرم والصبر والمشاركة. أن نأكل معًا هو إعلان صامت بأننا ننتمي لبعضنا.",
    ),
    curatorNote: L(
      "Notice how often the recipe is never written. It lives in a grandmother's hands — a measurement of feel, not of grams. That is the real cookbook.",
      "Remarquez combien la recette n'est jamais écrite. Elle vit dans les mains d'une grand-mère — une mesure de ressenti, non de grammes. Voilà le vrai livre de cuisine.",
      "لاحظ كم نادرًا ما تُكتب الوصفة. إنها تعيش في يدَي الجدّة — مقياس إحساس لا غرامات. ذلك هو كتاب الطبخ الحقيقي.",
    ),
    relatedStories: [
      { glyph: "🍽️", title: L("Cuisine atlas", "Atlas culinaire", "أطلس المطبخ"), note: L("Dishes region by region", "Plats région par région", "أطباق منطقة بمنطقة"), to: "/cuisine" },
      { glyph: "🫖", title: L("Living Traditions", "Traditions vivantes", "تقاليد حيّة"), note: L("Tea, souks, hospitality", "Thé, souks, hospitalité", "الشاي، الأسواق، الضيافة"), to: "/culture/$topicId", params: { topicId: "festivals" } },
    ],
    regionIds: ["sahara", "kabylie", "constantine", "algiers"],
    eraIds: ["islamic", "ottoman"],
    figureIds: [],
    themes: [
      { emoji: "🤝", label: L("Hospitality", "Hospitalité", "الضيافة") },
      { emoji: "🌾", label: L("Land & harvest", "Terre & récolte", "الأرض والحصاد") },
      { emoji: "👵", label: L("Inherited hands", "Mains transmises", "أيادٍ متوارثة") },
    ],
    facts: [
      L("Couscous is UNESCO-listed intangible heritage shared across the Maghreb.", "Le couscous est un patrimoine immatériel UNESCO partagé au Maghreb.", "الكسكس تراث لا مادي مسجّل لدى اليونسكو ومشترك في المغرب الكبير."),
      L("Deglet Nour dates take years of care before a single harvest.", "Les dattes Deglet Nour exigent des années de soin avant une récolte.", "تمور دقلة نور تتطلّب سنوات من العناية قبل أول حصاد."),
      L("Chorba is the near-universal first dish at the Ramadan table.", "La chorba est le premier plat quasi universel de la table du Ramadan.", "الشربة الطبق الأول شبه الموحّد على مائدة رمضان."),
    ],
  },

  /* ===================================================== ARCHITECTURE === */
  {
    id: "architecture",
    emblem: "🏛️",
    title: L("Architecture & Space", "Architecture & espace", "العمارة والفضاء"),
    tagline: L(
      "Walls that breathe, courtyards that turn inward.",
      "Des murs qui respirent, des patios tournés vers l'intérieur.",
      "جدران تتنفّس وأفنية تلتفت إلى الداخل.",
    ),
    intro: L(
      "Algerian architecture is a dialogue between climate and intimacy — white cubes spilling toward the sea, earthen fortresses against the dunes, Roman stone reclaimed by olive trees.",
      "L'architecture algérienne est un dialogue entre climat et intimité — cubes blancs versés vers la mer, forteresses de terre contre les dunes, pierre romaine reprise par les oliviers.",
      "العمارة الجزائرية حوار بين المناخ والحميمية — مكعّبات بيضاء تنحدر نحو البحر، حصون طينية أمام الكثبان، حجر روماني استرجعه الزيتون.",
    ),
    significance: L(
      "Built space here protects an inner world. The home opens not to the street but to a courtyard — shade, fountain, family — a fortress of privacy in a public land.",
      "L'espace bâti protège ici un monde intérieur. La maison s'ouvre non sur la rue mais sur un patio — ombre, fontaine, famille — une forteresse d'intimité dans une terre publique.",
      "يحمي الفضاء المبني هنا عالمًا داخليًا. لا يفتح البيت على الشارع بل على فناء — ظلّ ونافورة وعائلة — حصن للخصوصية في أرض عامة.",
    ),
    historicalContext: L(
      "Roman grids at Djemila and Timgad, Saharan ksour of packed earth, Ottoman palaces of the Casbah, the great mosque of Tlemcen — each civilization wrote itself in stone and was quietly rewritten by the next.",
      "Damiers romains à Djemila et Timgad, ksour sahariens de terre battue, palais ottomans de la Casbah, grande mosquée de Tlemcen — chaque civilisation s'est écrite dans la pierre et fut doucement réécrite par la suivante.",
      "شبكات رومانية في جميلة وتيمقاد، قصور صحراوية من طين مدكوك، قصور عثمانية في القصبة، جامع تلمسان الكبير — كل حضارة كتبت نفسها في الحجر وأعادت كتابتها التالية بهدوء.",
    ),
    traditions: [
      {
        emoji: "🏛️",
        title: L("The Casbah of Algiers", "La Casbah d'Alger", "قصبة الجزائر"),
        body: L(
          "A vertical city of white cubes spilling toward the sea — Ottoman palaces, secret alleys, courtyards turned inward. UNESCO-listed and fiercely lived-in.",
          "Une ville verticale de cubes blancs versés vers la mer — palais ottomans, ruelles secrètes, patios tournés vers l'intérieur. Classée UNESCO et vivante avec fougue.",
          "مدينة عمودية من مكعّبات بيضاء تنحدر نحو البحر — قصور عثمانية وأزقة سرية وأفنية مفتوحة على الداخل. مصنّفة لدى اليونسكو وتعجّ بالحياة.",
        ),
      },
      {
        emoji: "🏯",
        title: L("Ksour of the Sahara", "Les ksour du Sahara", "قصور الصحراء"),
        body: L(
          "Earth fortresses raised against the dunes — Timimoun, Beni Isguen, Taghit. Walls breathe heat by day and hold the cold of night.",
          "Forteresses de terre dressées contre les dunes — Timimoun, Beni Isguen, Taghit. Les murs respirent la chaleur le jour et gardent la fraîcheur de la nuit.",
          "قصور من طين تنتصب أمام الكثبان — تيميمون، بني يزقن، تاغيت. جدران تتنفّس حرارة النهار وتحفظ برودة الليل.",
        ),
      },
      {
        emoji: "🗿",
        title: L("Roman stones of Djemila & Timgad", "Pierres romaines de Djemila & Timgad", "حجارة جميلة وتيمقاد"),
        body: L(
          "Forums, arches and theatres in the highlands — empire laid out on a grid, then quietly reclaimed by olive trees and goats.",
          "Forums, arcs et théâtres sur les hauts plateaux — l'empire dessiné en damier, puis doucement repris par les oliviers et les chèvres.",
          "ساحات وأقواس ومسارح في الهضاب — إمبراطورية مرسومة على شبكة، ثم استرجعها الزيتون والمعزى بهدوء.",
        ),
      },
      {
        emoji: "⛰️",
        title: L("Mountain villages of Kabylie", "Villages perchés de Kabylie", "قرى القبائل الجبلية"),
        body: L(
          "Stone houses crowning the ridges, paths that remember every footstep. The village is a parliament, the djemaa its open-air chamber.",
          "Maisons de pierre couronnant les crêtes, chemins qui se souviennent de chaque pas. Le village est un parlement, la djemâa sa chambre à ciel ouvert.",
          "بيوت حجرية تتوّج القمم، ودروب تتذكّر كل خطوة. القرية برلمان، والجماعة قاعتها المفتوحة على السماء.",
        ),
      },
    ],
    influence: L(
      "These spaces taught a way of living: turn the noise outward, keep the sacred within. Modern Algerian cities still argue between the open boulevard and the inward courtyard.",
      "Ces espaces ont enseigné une manière de vivre : tourner le bruit vers l'extérieur, garder le sacré à l'intérieur. Les villes algériennes modernes débattent encore entre le boulevard ouvert et le patio intérieur.",
      "علّمت هذه الفضاءات طريقة في العيش: أدِر الضجيج إلى الخارج، واحفظ المقدّس في الداخل. لا تزال المدن الجزائرية الحديثة تتجادل بين الجادة المفتوحة والفناء الداخلي.",
    ),
    curatorNote: L(
      "Walk a Casbah alley and feel the temperature drop. The architecture is doing the work of air-conditioning with nothing but geometry, shade and lime-washed stone.",
      "Parcourez une ruelle de la Casbah et sentez la température chuter. L'architecture climatise avec rien d'autre que géométrie, ombre et pierre chaulée.",
      "امشِ في زقاق بالقصبة واشعر بانخفاض الحرارة. تقوم العمارة بعمل التكييف دون شيء سوى الهندسة والظلّ والحجر المطليّ بالكلس.",
    ),
    relatedStories: [
      { glyph: "❂", title: L("Atlas of places", "Atlas des lieux", "أطلس الأماكن"), note: L("See the sites on the map", "Voir les sites sur la carte", "شاهد المواقع على الخريطة"), to: "/atlas" },
      { glyph: "❖", title: L("Regions", "Régions", "المناطق"), note: L("The land that shaped the walls", "La terre qui façonna les murs", "الأرض التي شكّلت الجدران"), to: "/map" },
    ],
    regionIds: ["algiers", "sahara", "constantine", "kabylie"],
    eraIds: ["roman", "islamic", "ottoman"],
    figureIds: [],
    themes: [
      { emoji: "🌬️", label: L("Climate wisdom", "Sagesse climatique", "حكمة المناخ") },
      { emoji: "🚪", label: L("Inward intimacy", "Intimité intérieure", "حميمية داخلية") },
      { emoji: "🪨", label: L("Layered ruins", "Ruines en couches", "أطلال متراكمة") },
    ],
    facts: [
      L("Djemila, Timgad and the Casbah are all UNESCO World Heritage sites.", "Djemila, Timgad et la Casbah sont tous classés au patrimoine mondial UNESCO.", "جميلة وتيمقاد والقصبة جميعها مواقع تراث عالمي لدى اليونسكو."),
      L("Saharan ksour are built of mud brick that self-regulates desert heat.", "Les ksour sahariens sont en briques de terre qui régulent la chaleur du désert.", "تُبنى القصور الصحراوية من طوب طيني ينظّم حرارة الصحراء."),
      L("M'zab valley towns inspired modern architects including Le Corbusier.", "Les villes du M'zab ont inspiré des architectes modernes dont Le Corbusier.", "ألهمت مدن وادي ميزاب معماريين حداثيين منهم لو كوربوزييه."),
    ],
  },

  /* ======================================================== LANGUAGES === */
  {
    id: "languages",
    emblem: "ⵣ",
    title: L("Languages & Letters", "Langues & lettres", "اللغات والحروف"),
    tagline: L(
      "Three tongues, many silences, one land.",
      "Trois langues, bien des silences, une seule terre.",
      "ثلاث ألسنة، صمت كثير، وأرض واحدة.",
    ),
    intro: L(
      "Algeria speaks in layers — Tamazight beneath everything, Arabic flowing across it, French pressed in by history, Darija mixing all three in the street. To speak here is to carry centuries at once.",
      "L'Algérie parle en couches — le tamazight sous tout, l'arabe qui le traverse, le français imprimé par l'histoire, la darija mêlant les trois dans la rue. Parler ici, c'est porter des siècles à la fois.",
      "تتحدّث الجزائر بطبقات — الأمازيغية تحت كل شيء، والعربية تجري فوقها، والفرنسية طبعها التاريخ، والدارجة تمزج الثلاث في الشارع. أن تتكلّم هنا هو أن تحمل قرونًا دفعة واحدة.",
    ),
    significance: L(
      "Language here is identity's frontline. The yaz — ⵣ — on a doorway, a proverb in Kabyle, a verse of Kassaman: each is a quiet claim about who this land belongs to.",
      "La langue est ici la ligne de front de l'identité. Le yaz — ⵣ — sur une porte, un proverbe kabyle, un vers de Kassaman : chacun est une revendication discrète sur l'appartenance de cette terre.",
      "اللغة هنا خط المواجهة الأول للهوية. اليازْ — ⵣ — على باب، مثل قبائلي، بيت من قسمًا: كل منها دعوى هادئة عن انتماء هذه الأرض.",
    ),
    historicalContext: L(
      "Tamazight predates every empire. Arabic arrived with Islam and became literature and faith. French was imposed by colonization, then turned into a weapon of anti-colonial writing. In 2016 Tamazight became an official national language.",
      "Le tamazight précède tout empire. L'arabe est venu avec l'islam et devint littérature et foi. Le français fut imposé par la colonisation, puis retourné en arme d'écriture anticoloniale. En 2016, le tamazight devint langue nationale officielle.",
      "تسبق الأمازيغية كل إمبراطورية. جاءت العربية مع الإسلام فصارت أدبًا وإيمانًا. فُرضت الفرنسية بالاستعمار ثم قُلبت سلاح كتابة مناهضة له. وفي 2016 صارت الأمازيغية لغة وطنية رسمية.",
    ),
    traditions: [
      {
        emoji: "ⵣ",
        title: L("Tamazight & the yaz", "Le tamazight & le yaz", "الأمازيغية واليازْ"),
        body: L(
          "Before Phoenicians, before Rome, the land already spoke Tamazight. The yaz ⵣ marks doorways, rugs and jewellery — the grammar of this earth.",
          "Avant les Phéniciens, avant Rome, la terre parlait déjà tamazight. Le yaz ⵣ orne portes, tapis et bijoux — la grammaire de cette terre.",
          "قبل الفينيقيين وقبل روما كانت الأرض تتحدّث الأمازيغية. اليازْ ⵣ يعلّم الأبواب والزرابي والحلي — قواعد هذه الأرض.",
        ),
      },
      {
        emoji: "📖",
        title: L("Arabic — faith & poetry", "L'arabe — foi & poésie", "العربية — إيمان وشعر"),
        body: L(
          "Arabic carried scripture, science and a vast poetry. From Ibn Khaldun's prose to the anthem Kassaman, it became the language of both prayer and nation.",
          "L'arabe a porté l'écriture, la science et une vaste poésie. De la prose d'Ibn Khaldoun à l'hymne Kassaman, il devint langue de prière et de nation.",
          "حملت العربية الكتاب والعلم وشعرًا واسعًا. من نثر ابن خلدون إلى نشيد قسمًا، صارت لغة الصلاة والوطن.",
        ),
      },
      {
        emoji: "✒️",
        title: L("French — turned against itself", "Le français — retourné", "الفرنسية — مقلوبة"),
        body: L(
          "Imposed by empire, French became the blade of writers like Kateb Yacine and Assia Djebar, who 'wrote in the language of the enemy' to tell Algeria's truth to the world.",
          "Imposé par l'empire, le français devint la lame d'écrivains comme Kateb Yacine et Assia Djebar, qui « écrivirent dans la langue de l'ennemi » pour dire la vérité de l'Algérie au monde.",
          "فُرضت الفرنسية بالإمبراطورية، فصارت نصل كتّاب كياسين وآسيا جبار، الذين «كتبوا بلغة العدو» ليقولوا حقيقة الجزائر للعالم.",
        ),
      },
      {
        emoji: "💬",
        title: L("Darija — the street mix", "La darija — le mélange de la rue", "الدارجة — مزيج الشارع"),
        body: L(
          "Everyday Algerian Arabic blends Tamazight, classical Arabic, French and Spanish into one quick, witty, untranslatable voice — the true mother tongue of the cities.",
          "L'arabe algérien du quotidien mêle tamazight, arabe classique, français et espagnol en une voix vive, spirituelle et intraduisible — la vraie langue maternelle des villes.",
          "تمزج العربية الجزائرية اليومية الأمازيغية والعربية الفصحى والفرنسية والإسبانية في صوت سريع ذكي غير قابل للترجمة — اللغة الأم الحقيقية للمدن.",
        ),
      },
    ],
    influence: L(
      "Multilingualism is not confusion here — it is range. An Algerian can pray in one language, argue in another and joke in a third, and feel wholly themselves in all of them.",
      "Le multilinguisme n'est pas confusion ici — c'est une amplitude. Un Algérien peut prier dans une langue, débattre dans une autre, plaisanter dans une troisième, et être pleinement lui-même dans toutes.",
      "تعدّد اللغات ليس تشويشًا هنا — بل سعة. يصلّي الجزائري بلغة، ويجادل بأخرى، ويمزح بثالثة، ويبقى كاملًا في كلّها.",
    ),
    curatorNote: L(
      "Listen to a single Algiers conversation and count the languages in one sentence. That switching is not a flaw — it is a four-thousand-year-old reflex.",
      "Écoutez une seule conversation algéroise et comptez les langues dans une phrase. Ce passage n'est pas un défaut — c'est un réflexe vieux de quatre mille ans.",
      "أنصت إلى حديث واحد في الجزائر العاصمة وأحصِ اللغات في جملة واحدة. هذا التنقّل ليس عيبًا — بل ردّ فعل عمره أربعة آلاف عام.",
    ),
    relatedStories: [
      { glyph: "🗣️", title: L("Words of Algeria", "Mots d'Algérie", "كلمات الجزائر"), note: L("Proverbs & phrases", "Proverbes & expressions", "أمثال وعبارات"), to: "/words" },
      { glyph: "❧", title: L("Literature", "Littérature", "الأدب"), note: L("Where language becomes art", "Quand la langue devient art", "حين تصير اللغة فنًّا"), to: "/culture/$topicId", params: { topicId: "literature" } },
    ],
    regionIds: ["kabylie", "aures", "algiers"],
    eraIds: ["earlynorthafrica", "islamic", "french"],
    figureIds: ["mammeri", "kateb-yacine", "assia-djebar", "ibn-khaldun"],
    themes: [
      { emoji: "ⵣ", label: L("Amazigh root", "Racine amazighe", "الجذر الأمازيغي") },
      { emoji: "🔀", label: L("Code-switching", "Alternance de langues", "تناوب اللغات") },
      { emoji: "🏳️", label: L("Language & rights", "Langue & droits", "اللغة والحقوق") },
    ],
    facts: [
      L("Tamazight became an official national language of Algeria in 2016.", "Le tamazight est devenu langue nationale officielle en 2016.", "صارت الأمازيغية لغة وطنية رسمية في الجزائر عام 2016."),
      L("Tifinagh, the Amazigh script, has roots over two thousand years old.", "Le tifinagh, écriture amazighe, a des racines de plus de deux mille ans.", "للتيفيناغ، الأبجدية الأمازيغية، جذور تتجاوز ألفي عام."),
      L("Many landmark Algerian novels were written in French to reach the world.", "De nombreux romans algériens majeurs furent écrits en français pour atteindre le monde.", "كُتبت روايات جزائرية كبرى بالفرنسية لتصل إلى العالم."),
    ],
  },

  /* ======================================================= LITERATURE === */
  {
    id: "literature",
    emblem: "❧",
    title: L("Literature & Poetry", "Littérature & poésie", "الأدب والشعر"),
    tagline: L(
      "A nation that wrote itself into being.",
      "Une nation qui s'est écrite pour exister.",
      "أمّة كتبت نفسها لتوجد.",
    ),
    intro: L(
      "Algerian literature is an act of survival — from Augustine's Confessions to Kateb Yacine's Nedjma, writers turned wounds into pages and gave a silenced people a voice the world could read.",
      "La littérature algérienne est un acte de survie — des Confessions d'Augustin à Nedjma de Kateb Yacine, les écrivains ont transformé les blessures en pages et donné à un peuple réduit au silence une voix lisible par le monde.",
      "الأدب الجزائري فعل بقاء — من اعترافات أوغسطين إلى نجمة كاتب ياسين، حوّل الكتّاب الجراح إلى صفحات ومنحوا شعبًا مُسكتًا صوتًا يقرؤه العالم.",
    ),
    significance: L(
      "Here the book is a battlefield and a memorial. When archives were burned and history rewritten by others, novels and poems kept the true record — names, villages, griefs that no decree could erase.",
      "Ici le livre est champ de bataille et mémorial. Quand les archives brûlaient et que l'histoire était réécrite par d'autres, romans et poèmes gardaient le vrai registre — noms, villages, deuils qu'aucun décret n'effaçait.",
      "هنا الكتاب ساحة معركة ونصب تذكاري. حين أُحرقت الأرشيفات وأعاد آخرون كتابة التاريخ، حفظت الروايات والقصائد السجلّ الحقيقي — أسماء وقرى وأحزانًا لا يمحوها مرسوم.",
    ),
    historicalContext: L(
      "Roman-era Latin (Augustine, Apuleius), centuries of Arabic poetry and Ibn Khaldun's history, oral Amazigh verse, then a blaze of 20th-century writing in French and Arabic that carried the independence struggle onto the world's bookshelves.",
      "Latin de l'époque romaine (Augustin, Apulée), des siècles de poésie arabe et l'histoire d'Ibn Khaldoun, vers amazighs oraux, puis un embrasement d'écriture du XXe siècle en français et en arabe portant la lutte d'indépendance sur les rayons du monde.",
      "لاتينية العصر الروماني (أوغسطين، أبوليوس)، وقرون من الشعر العربي وتاريخ ابن خلدون، وشعر أمازيغي شفهي، ثم توهّج كتابة القرن العشرين بالفرنسية والعربية حملت كفاح الاستقلال إلى رفوف العالم.",
    ),
    traditions: [
      {
        emoji: "🌟",
        title: L("Kateb Yacine — Nedjma", "Kateb Yacine — Nedjma", "كاتب ياسين — نجمة"),
        body: L(
          "The 1956 novel whose fractured, circling structure became the modern Algerian epic — Nedjma the woman is also Algeria itself, beautiful and unattainable.",
          "Le roman de 1956 dont la structure fracturée et circulaire devint l'épopée algérienne moderne — Nedjma la femme est aussi l'Algérie, belle et inatteignable.",
          "رواية 1956 التي صارت بنيتها المتشظّية الدائرية الملحمة الجزائرية الحديثة — نجمة المرأة هي الجزائر، جميلة وبعيدة المنال.",
        ),
      },
      {
        emoji: "✍️",
        title: L("Assia Djebar — women's voices", "Assia Djebar — voix de femmes", "آسيا جبار — أصوات النساء"),
        body: L(
          "First Maghrebi woman in the Académie française, she gave voice to the women erased from official history — their resistance, their language, their silence.",
          "Première Maghrébine à l'Académie française, elle a donné voix aux femmes effacées de l'histoire officielle — leur résistance, leur langue, leur silence.",
          "أول مغاربية في الأكاديمية الفرنسية، منحت صوتًا للنساء الممحوّات من التاريخ الرسمي — مقاومتهنّ ولغتهنّ وصمتهنّ.",
        ),
      },
      {
        emoji: "🏔️",
        title: L("Feraoun & Mammeri — Kabyle life", "Feraoun & Mammeri — la vie kabyle", "فرعون ومعمري — حياة القبائل"),
        body: L(
          "Mouloud Feraoun and Mouloud Mammeri wrote the dignity of mountain villages into literature — and Feraoun was assassinated days before independence.",
          "Mouloud Feraoun et Mouloud Mammeri ont inscrit la dignité des villages de montagne dans la littérature — et Feraoun fut assassiné quelques jours avant l'indépendance.",
          "كتب مولود فرعون ومولود معمري كرامة القرى الجبلية في الأدب — واغتيل فرعون قبل الاستقلال بأيام.",
        ),
      },
      {
        emoji: "🎶",
        title: L("Moufdi Zakaria — Kassaman", "Moufdi Zakaria — Kassaman", "مفدي زكريا — قسمًا"),
        body: L(
          "The poet who, imprisoned, wrote the words of the national anthem on his cell wall. Poetry here did not describe the revolution — it helped declare it.",
          "Le poète qui, emprisonné, écrivit les paroles de l'hymne national sur le mur de sa cellule. La poésie ici n'a pas décrit la révolution — elle a aidé à la déclarer.",
          "الشاعر الذي كتب، وهو سجين، كلمات النشيد الوطني على جدار زنزانته. لم يصف الشعر هنا الثورة — بل ساعد على إعلانها.",
        ),
      },
    ],
    influence: L(
      "Algerian writers proved that a colonized people could master the colonizer's language and turn it into testimony. Their books remain required reading from Algiers to Paris to the wider Francophone and Arab worlds.",
      "Les écrivains algériens ont prouvé qu'un peuple colonisé pouvait maîtriser la langue du colon et la changer en témoignage. Leurs livres restent des lectures essentielles d'Alger à Paris et au-delà.",
      "أثبت الكتّاب الجزائريون أن شعبًا مستعمَرًا يمكنه إتقان لغة المستعمِر وتحويلها إلى شهادة. وتبقى كتبهم قراءة أساسية من الجزائر إلى باريس وأبعد.",
    ),
    curatorNote: L(
      "Read these works knowing many were written in danger — in cells, in exile, under censorship. The calm of the prose hides the cost of writing it.",
      "Lisez ces œuvres en sachant que beaucoup furent écrites dans le danger — en cellule, en exil, sous la censure. Le calme de la prose cache le prix de son écriture.",
      "اقرأ هذه الأعمال عالمًا أن كثيرًا منها كُتب في خطر — في الزنازين والمنفى وتحت الرقابة. هدوء النثر يخفي ثمن كتابته.",
    ),
    relatedStories: [
      { glyph: "♟", title: L("The writers", "Les écrivains", "الكتّاب"), note: L("Meet the figures", "Rencontrer les figures", "تعرّف إلى الشخصيات"), to: "/figures" },
      { glyph: "ⵣ", title: L("Languages", "Langues", "اللغات"), note: L("The tongues they wrote in", "Les langues de leur écriture", "اللغات التي كتبوا بها"), to: "/culture/$topicId", params: { topicId: "languages" } },
    ],
    regionIds: ["kabylie", "constantine", "algiers"],
    eraIds: ["islamic", "french", "independence"],
    figureIds: ["kateb-yacine", "assia-djebar", "mouloud-feraoun", "mammeri", "ibn-khaldun"],
    themes: [
      { emoji: "📚", label: L("Memory as record", "Mémoire-archive", "الذاكرة سجلّ") },
      { emoji: "✊", label: L("Writing & resistance", "Écriture & résistance", "الكتابة والمقاومة") },
      { emoji: "🌐", label: L("Reaching the world", "Atteindre le monde", "الوصول إلى العالم") },
    ],
    facts: [
      L("Assia Djebar was elected to the Académie française in 2005.", "Assia Djebar fut élue à l'Académie française en 2005.", "انتُخبت آسيا جبار في الأكاديمية الفرنسية عام 2005."),
      L("Saint Augustine, born at Thagaste, wrote the Confessions in the 4th century.", "Saint Augustin, né à Thagaste, écrivit les Confessions au IVe siècle.", "كتب القديس أوغسطين، المولود في تاغاست، الاعترافات في القرن الرابع."),
      L("Kateb Yacine's Nedjma (1956) is a cornerstone of Maghrebi literature.", "Nedjma (1956) de Kateb Yacine est une pierre angulaire de la littérature maghrébine.", "نجمة (1956) لكاتب ياسين حجر أساس في الأدب المغاربي."),
    ],
  },

  /* ======================================================== FESTIVALS === */
  {
    id: "festivals",
    emblem: "💒",
    title: L("Festivals & Rituals", "Fêtes & rituels", "الأعياد والطقوس"),
    tagline: L(
      "The slow ceremonies of belonging.",
      "Les lentes cérémonies de l'appartenance.",
      "مراسم الانتماء البطيئة.",
    ),
    intro: L(
      "Algerian celebration unfolds over days, not hours — henna and ululations at a wedding, the agrarian new year of Yennayer, the shared dusk of Ramadan. To celebrate here is to take time on purpose.",
      "La fête algérienne se déroule sur des jours, non des heures — henné et youyous d'un mariage, nouvel an agraire de Yennayer, crépuscule partagé du Ramadan. Célébrer ici, c'est prendre le temps volontairement.",
      "يمتدّ الاحتفال الجزائري أيامًا لا ساعات — حنّاء وزغاريد في عرس، رأس السنة الفلاحية يناير، غروب رمضان المشترك. أن تحتفل هنا هو أن تأخذ الوقت عمدًا.",
    ),
    significance: L(
      "Rituals stitch the individual into the community. A wedding, a birth, a harvest, a feast — each is a public promise that no one here belongs only to themselves.",
      "Les rituels cousent l'individu à la communauté. Un mariage, une naissance, une récolte, une fête — chacun est une promesse publique que nul ici n'appartient qu'à soi.",
      "تخيط الطقوس الفرد بالجماعة. عرس، ولادة، حصاد، وليمة — كل منها وعد علني بأن لا أحد هنا يخصّ نفسه وحده.",
    ),
    historicalContext: L(
      "Yennayer marks an Amazigh calendar older than Rome. Islamic feasts layered onto agrarian rhythms; saints' moussems drew pilgrims to shrines; weddings preserved embroidery, song and dialect handed between generations.",
      "Yennayer marque un calendrier amazigh plus ancien que Rome. Les fêtes islamiques se sont superposées aux rythmes agraires ; les moussems de saints attiraient les pèlerins ; les mariages préservaient broderie, chant et dialecte transmis entre générations.",
      "يحتفي يناير بتقويم أمازيغي أقدم من روما. تراكبت الأعياد الإسلامية على الإيقاعات الفلاحية؛ وجذبت مواسم الأولياء الحجّاج؛ وحفظت الأعراس التطريز والغناء واللهجة المتوارثة.",
    ),
    traditions: [
      {
        emoji: "💒",
        title: L("Seven nights of wedding", "Sept nuits de noces", "سبع ليالٍ للعرس"),
        body: L(
          "Traditional weddings unfold over days — henna, processions, ululations, embroidered dresses passed between generations. The ceremony is a slow act of belonging.",
          "Les mariages traditionnels s'étirent sur plusieurs jours — henné, cortèges, youyous, robes brodées transmises de génération en génération. La cérémonie est un lent acte d'appartenance.",
          "تمتدّ الأعراس التقليدية أيامًا — حنّاء وزفّة وزغاريد وفساتين مطرّزة تتوارث من جيل إلى جيل. والعرس فعل انتماء بطيء.",
        ),
      },
      {
        emoji: "🌱",
        title: L("Yennayer — Amazigh new year", "Yennayer — nouvel an amazigh", "يناير — رأس السنة الأمازيغية"),
        body: L(
          "Celebrated on 12 January, Yennayer opens the agrarian year with a great family meal — a calendar older than every empire that came after.",
          "Célébré le 12 janvier, Yennayer ouvre l'année agraire par un grand repas familial — un calendrier plus ancien que tous les empires venus après.",
          "يُحتفل به في 12 يناير، يفتح يناير السنة الفلاحية بمائدة عائلية كبيرة — تقويم أقدم من كل الإمبراطوريات اللاحقة.",
        ),
      },
      {
        emoji: "🕌",
        title: L("Souk days", "Les jours de souk", "أيام السوق"),
        body: L(
          "Weekly markets keep towns breathing — spices, wool, olives, news and gossip. The souk is Algeria's oldest social network.",
          "Les marchés hebdomadaires font respirer les villes — épices, laine, olives, nouvelles et rumeurs. Le souk est le plus ancien réseau social d'Algérie.",
          "تحفظ الأسواق الأسبوعية أنفاس المدن — توابل وصوف وزيتون وأخبار وقيل وقال. السوق أقدم شبكة اجتماعية في الجزائر.",
        ),
      },
      {
        emoji: "🌙",
        title: L("Ramadan & the Eids", "Ramadan & les Aïd", "رمضان والأعياد"),
        body: L(
          "A month of fasting that becomes a month of gathering — and the two Eids that close and crown the calendar with sweets, new clothes and visits.",
          "Un mois de jeûne qui devient un mois de rassemblement — et les deux Aïd qui ferment et couronnent le calendrier de douceurs, vêtements neufs et visites.",
          "شهر صيام يصير شهر اجتماع — والعيدان اللذان يختمان التقويم ويتوّجانه بالحلوى والثياب الجديدة والزيارات.",
        ),
      },
    ],
    influence: L(
      "These rhythms keep Algeria collective in an age of individualism. The wedding, the Eid, the souk and Yennayer remain the country's true national calendar — felt long before any state holiday.",
      "Ces rythmes maintiennent l'Algérie collective à l'ère de l'individualisme. Le mariage, l'Aïd, le souk et Yennayer restent le vrai calendrier national — ressenti bien avant tout jour férié officiel.",
      "تُبقي هذه الإيقاعات الجزائر جماعية في عصر الفردانية. يبقى العرس والعيد والسوق ويناير التقويم الوطني الحقيقي — يُحَسّ قبل أي عطلة رسمية.",
    ),
    curatorNote: L(
      "Note how every celebration centres on food and patience. The slowness is the message: belonging cannot be rushed.",
      "Remarquez comme chaque fête tourne autour de la nourriture et de la patience. La lenteur est le message : l'appartenance ne se précipite pas.",
      "لاحظ كيف يدور كل احتفال حول الطعام والصبر. البطء هو الرسالة: لا يمكن استعجال الانتماء.",
    ),
    relatedStories: [
      { glyph: "🍲", title: L("Cuisine & the Table", "Cuisine & la table", "المطبخ والمائدة"), note: L("The feast behind the feast", "Le festin derrière la fête", "الوليمة وراء العيد"), to: "/culture/$topicId", params: { topicId: "cuisine" } },
      { glyph: "❖", title: L("Regions", "Régions", "المناطق"), note: L("Where each ritual lives", "Où vit chaque rituel", "حيث يعيش كل طقس"), to: "/map" },
    ],
    regionIds: ["sahara", "kabylie", "constantine", "algiers"],
    eraIds: ["earlynorthafrica", "islamic", "ottoman"],
    figureIds: [],
    themes: [
      { emoji: "🤝", label: L("Community bonds", "Liens communautaires", "روابط الجماعة") },
      { emoji: "🌱", label: L("Agrarian time", "Temps agraire", "زمن فلاحي") },
      { emoji: "🧵", label: L("Inherited crafts", "Artisanats hérités", "حِرف متوارثة") },
    ],
    facts: [
      L("Yennayer (12 January) is now a recognized national holiday in Algeria.", "Yennayer (12 janvier) est désormais un jour férié national reconnu.", "يناير (12 يناير) صار عطلة وطنية معترفًا بها في الجزائر."),
      L("Traditional weddings can span several days of distinct ceremonies.", "Les mariages traditionnels peuvent s'étendre sur plusieurs jours de cérémonies.", "قد تمتدّ الأعراس التقليدية على عدة أيام من مراسم متمايزة."),
      L("Saints' moussems still draw seasonal pilgrimages across the country.", "Les moussems de saints attirent encore des pèlerinages saisonniers.", "لا تزال مواسم الأولياء تجذب حجّات موسمية عبر البلاد."),
    ],
  },

  /* ================================================== ORAL TRADITIONS === */
  {
    id: "oral-traditions",
    emblem: "🎙️",
    title: L("Oral Traditions", "Traditions orales", "التقاليد الشفهية"),
    tagline: L(
      "Before screens, there was the circle.",
      "Avant les écrans, il y avait le cercle.",
      "قبل الشاشات، كانت الحلقة.",
    ),
    intro: L(
      "Long before the printing press, Algeria carried its history on the tongue — the halqa storyteller, the Kabyle proverb, the desert poet, the grandmother's bedtime epic. Memory here is a living, spoken thing.",
      "Bien avant l'imprimerie, l'Algérie portait son histoire sur la langue — le conteur de la halqa, le proverbe kabyle, le poète du désert, l'épopée du soir d'une grand-mère. Ici, la mémoire est vivante et parlée.",
      "قبل المطبعة بزمن طويل، حملت الجزائر تاريخها على اللسان — حكواتي الحلقة، المثل القبائلي، شاعر الصحراء، ملحمة الجدّة قبل النوم. الذاكرة هنا حيّة منطوقة.",
    ),
    significance: L(
      "Oral tradition is the country's deepest archive — the one no empire could burn. Proverbs encode law, songs encode lineage, tales encode morality. To forget the spoken word is to lose what was never written.",
      "La tradition orale est l'archive la plus profonde du pays — celle qu'aucun empire n'a pu brûler. Les proverbes codent la loi, les chants la lignée, les contes la morale. Oublier la parole, c'est perdre ce qui ne fut jamais écrit.",
      "التقاليد الشفهية أعمق أرشيف للبلاد — الذي لم تستطع إمبراطورية حرقه. تُشفِّر الأمثال القانون، والأغاني النسب، والحكايات الأخلاق. ونسيان المنطوق هو فقدان ما لم يُكتب قط.",
    ),
    historicalContext: L(
      "From pre-Roman Amazigh bards to the medieval halqa of the market square, to the Amrouche family who first wrote down Kabyle songs in the 20th century — each generation entrusted the next with words held in memory alone.",
      "Des bardes amazighs pré-romains à la halqa médiévale de la place du marché, jusqu'à la famille Amrouche qui transcrivit la première les chants kabyles au XXe siècle — chaque génération a confié à la suivante des mots gardés de mémoire.",
      "من شعراء الأمازيغ قبل الرومان إلى حلقة العصور الوسطى في ساحة السوق، وصولًا إلى عائلة عمروش التي دوّنت أول مرة الأغاني القبائلية في القرن العشرين — أوكلت كل جيلٍ التاليَ بكلمات محفوظة في الذاكرة.",
    ),
    traditions: [
      {
        emoji: "🎙️",
        title: L("The storyteller's circle", "Le cercle du conteur", "حلقة الحكواتي"),
        body: L(
          "The halqa — a circle in a square where a storyteller summoned saints, sultans and tricksters from memory alone, holding a crowd for hours with only a voice.",
          "La halqa — un cercle sur une place où un conteur convoquait saints, sultans et filous de mémoire seule, tenant une foule des heures avec une seule voix.",
          "الحلقة — دائرة في ساحة يستحضر فيها الحكواتي الأولياء والسلاطين والمحتالين من الذاكرة وحدها، ممسكًا بجمهور ساعات بصوت واحد.",
        ),
      },
      {
        emoji: "🗣️",
        title: L("Proverbs as law", "Les proverbes comme loi", "الأمثال قانونًا"),
        body: L(
          "'Awal d wagur' — the word is a moon that watches over life. Kabyle and Saharan proverbs carry ethics, warning and wit in a single breath.",
          "« Awal d wagur » — la parole est une lune qui veille sur la vie. Les proverbes kabyles et sahariens portent éthique, avertissement et esprit d'un même souffle.",
          "«أوال د واݣور» — الكلمة قمر يسهر على الحياة. تحمل الأمثال القبائلية والصحراوية الأخلاق والتحذير والذكاء في نفَس واحد.",
        ),
      },
      {
        emoji: "🪕",
        title: L("Desert & mountain poets", "Poètes du désert & de la montagne", "شعراء الصحراء والجبل"),
        body: L(
          "Mohamed Belkheir and the bards of the steppe sang resistance and longing in melhoun verse — news, history and protest delivered as song.",
          "Mohamed Belkheir et les bardes de la steppe chantaient résistance et nostalgie en vers melhoun — nouvelles, histoire et protestation livrées en chanson.",
          "غنّى محمد بلخير وشعراء السهوب المقاومة والحنين بالملحون — أخبار وتاريخ واحتجاج تُروى غناءً.",
        ),
      },
      {
        emoji: "👵",
        title: L("The Amrouche thread", "Le fil Amrouche", "خيط عمروش"),
        body: L(
          "Fadhma, Taos and Jean Amrouche carried Kabyle oral song from a mother's memory onto the page and the recording — saving a vanishing world.",
          "Fadhma, Taos et Jean Amrouche ont porté le chant oral kabyle de la mémoire d'une mère vers la page et l'enregistrement — sauvant un monde en train de disparaître.",
          "حملت فاطمة وتاوس وجان عمروش الأغنية القبائلية الشفهية من ذاكرة أمّ إلى الصفحة والتسجيل — منقذين عالمًا آيلًا للزوال.",
        ),
      },
    ],
    influence: L(
      "Oral tradition shaped how Algerians still argue, teach and remember — by story rather than statute, by proverb rather than paragraph. The spoken word remains the country's most trusted witness.",
      "La tradition orale a façonné la manière dont les Algériens débattent, enseignent et se souviennent — par le récit plus que par la loi, par le proverbe plus que par le paragraphe. La parole reste le témoin le plus fiable du pays.",
      "صاغت التقاليد الشفهية كيف لا يزال الجزائريون يجادلون ويعلّمون ويتذكّرون — بالحكاية لا بالنص، وبالمثل لا بالفقرة. ويبقى المنطوق أوثق شهود البلاد.",
    ),
    curatorNote: L(
      "Every recording in this museum began as breath. When you listen, remember you are hearing a relay race of voices reaching back thousands of years.",
      "Chaque enregistrement de ce musée a commencé par un souffle. En écoutant, souvenez-vous que vous entendez une course de relais de voix remontant des millénaires.",
      "كل تسجيل في هذا المتحف بدأ نفَسًا. حين تنصت، تذكّر أنك تسمع سباق تتابع من الأصوات يمتدّ آلاف السنين.",
    ),
    relatedStories: [
      { glyph: "🎻", title: L("Music & Sound", "Musique & son", "الموسيقى والصوت"), note: L("Where the voice becomes song", "Quand la voix devient chant", "حين يصير الصوت غناءً"), to: "/culture/$topicId", params: { topicId: "music" } },
      { glyph: "🗣️", title: L("Words of Algeria", "Mots d'Algérie", "كلمات الجزائر"), note: L("Proverbs archive", "Archive de proverbes", "أرشيف الأمثال"), to: "/words" },
    ],
    regionIds: ["kabylie", "sahara", "aures"],
    eraIds: ["earlynorthafrica", "islamic"],
    figureIds: ["taos-amrouche", "jean-amrouche", "fadhma-amrouche", "mohamed-belkheir", "mammeri"],
    themes: [
      { emoji: "🧠", label: L("Memory keepers", "Gardiens de mémoire", "حفظة الذاكرة") },
      { emoji: "🪶", label: L("Spoken history", "Histoire parlée", "تاريخ منطوق") },
      { emoji: "🔁", label: L("Generational relay", "Relais générationnel", "تتابع الأجيال") },
    ],
    facts: [
      L("The halqa storytelling tradition is recognized as intangible heritage.", "La tradition de conte de la halqa est reconnue patrimoine immatériel.", "تقليد سرد الحلقة معترف به تراثًا لا ماديًا."),
      L("The Amrouche family first transcribed Kabyle oral songs in the 20th century.", "La famille Amrouche transcrivit la première les chants kabyles au XXe siècle.", "دوّنت عائلة عمروش أول مرة الأغاني القبائلية في القرن العشرين."),
      L("Melhoun is a sung poetic form used for history, love and resistance.", "Le melhoun est une forme poétique chantée d'histoire, d'amour et de résistance.", "الملحون شكل شعري مغنّى للتاريخ والحب والمقاومة."),
    ],
  },
];

export function getCultureTopic(id: string): CultureTopic | undefined {
  return CULTURE_TOPICS.find((t) => t.id === id);
}

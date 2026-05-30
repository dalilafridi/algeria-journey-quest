import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect } from "react";
import { Header } from "@/components/Header";
import { t, useLang, type Localized, type LocalizedString } from "@/lib/i18n";
import { saveJourneyPlace } from "@/lib/continuity";
import { AmazighSymbol } from "@/components/brand/AmazighSymbol";

const L = (en: string, fr: string, ar: string): Localized<string> => ({ en, fr, ar });

/* ------------------------------------------------------------------ */
/* Content — curated cultural threads. Intentionally inlined so the   */
/* whole hub reads as one composed essay rather than a data dump.     */
/* ------------------------------------------------------------------ */

type Tradition = { emoji: string; title: LocalizedString; body: LocalizedString };

const TRADITIONS: Tradition[] = [
  {
    emoji: "🫖",
    title: L("The Three Glasses of Tea", "Les trois verres de thé", "أكواب الشاي الثلاثة"),
    body: L(
      "In the Sahara, tea is poured three times — bitter as life, gentle as love, sweet as death. To share it is to share time itself.",
      "Au Sahara, le thé est servi trois fois — amer comme la vie, doux comme l'amour, sucré comme la mort. Le partager, c'est partager le temps lui-même.",
      "في الصحراء، يُسكب الشاي ثلاث مرات — مرّ كالحياة، لطيف كالحب، حلو كالممات. ومشاركته مشاركة للزمن ذاته.",
    ),
  },
  {
    emoji: "🤝",
    title: L("Hospitality as Doctrine", "L'hospitalité comme doctrine", "الضيافة عقيدة"),
    body: L(
      "A guest is a blessing before they are a person. From a Kabyle home to a Targui camp, bread, salt and shelter are offered before names are exchanged.",
      "L'invité est une bénédiction avant d'être une personne. D'un foyer kabyle à un campement targui, on offre pain, sel et abri avant même les prénoms.",
      "الضيف بركة قبل أن يكون شخصًا. من بيت قبائلي إلى مضارب الطوارق، يُقدَّم الخبز والملح والمأوى قبل تبادل الأسماء.",
    ),
  },
  {
    emoji: "🕌",
    title: L("Souk Days", "Les jours de souk", "أيام السوق"),
    body: L(
      "Weekly markets keep towns breathing. Spices, wool, olives, news, gossip and gossip about news — the souk is Algeria's oldest social network.",
      "Les marchés hebdomadaires font respirer les villes. Épices, laine, olives, nouvelles, rumeurs et rumeurs sur les nouvelles — le souk est le plus ancien réseau social d'Algérie.",
      "تحفظ الأسواق الأسبوعية أنفاس المدن. توابل وصوف وزيتون وأخبار وقيل وقال حول الأخبار — السوق هو أقدم شبكة اجتماعية في الجزائر.",
    ),
  },
  {
    emoji: "💒",
    title: L("Seven Nights of Wedding", "Sept nuits de noces", "سبع ليال للعرس"),
    body: L(
      "Traditional weddings unfold over days — henna, processions, ululations, embroidered dresses passed between generations. The ceremony is a slow act of belonging.",
      "Les mariages traditionnels s'étirent sur plusieurs jours — henné, cortèges, youyous, robes brodées transmises de génération en génération. La cérémonie est un lent acte d'appartenance.",
      "تمتدّ الأعراس التقليدية أيامًا — حنّاء وزفّة وزغاريد وفساتين مطرّزة تتوارث من جيل إلى جيل. والعرس فعل انتماء بطيء.",
    ),
  },
  {
    emoji: "🎙️",
    title: L("The Storyteller's Circle", "Le cercle du conteur", "حلقة الحكواتي"),
    body: L(
      "Before screens, there was the halqa — a circle in a square where a storyteller summoned saints, sultans and tricksters from memory alone.",
      "Avant les écrans, il y avait la halqa — un cercle sur une place où un conteur convoquait saints, sultans et filous de mémoire seule.",
      "قبل الشاشات كانت الحلقة — دائرة في ساحة يستحضر فيها الحكواتي الأولياء والسلاطين والمحتالين من الذاكرة وحدها.",
    ),
  },
  {
    emoji: "🧶",
    title: L("Hands That Remember", "Les mains qui se souviennent", "أيادٍ تتذكّر"),
    body: L(
      "Berber rugs, Constantine embroidery, copper from the Casbah — every craft is a written language whose letters are knots, threads and hammer-strikes.",
      "Tapis berbères, broderies constantinoises, cuivre de la Casbah — chaque artisanat est une langue écrite dont les lettres sont nœuds, fils et coups de marteau.",
      "زرابي أمازيغية وتطريز قسنطيني ونحاس القصبة — كل حرفة لغة مكتوبة حروفها عُقد وخيوط وضربات مطرقة.",
    ),
  },
];

type MusicTradition = {
  emoji: string;
  title: LocalizedString;
  region: LocalizedString;
  body: LocalizedString;
};

const MUSIC: MusicTradition[] = [
  {
    emoji: "🎻",
    title: L("Andalusian Nuba", "Nouba andalouse", "النوبة الأندلسية"),
    region: L("Algiers · Tlemcen · Constantine", "Alger · Tlemcen · Constantine", "الجزائر · تلمسان · قسنطينة"),
    body: L(
      "Carried from al-Andalus by exiled Muslims and Jews, the Nuba is a courtly suite of moods — a Mediterranean memory still rehearsed every week in city conservatories.",
      "Apportée d'al-Andalus par les exilés musulmans et juifs, la Nouba est une suite raffinée de modes — une mémoire méditerranéenne encore répétée chaque semaine dans les conservatoires.",
      "حُملت من الأندلس مع المنفيين المسلمين واليهود، النوبة سلسلة مقامية راقية — ذاكرة متوسطية لا تزال تُعزف كل أسبوع في معاهد المدن.",
    ),
  },
  {
    emoji: "🎤",
    title: L("Raï — Voice of the West", "Raï — la voix de l'Ouest", "الرّاي — صوت الغرب"),
    region: L("Oran & the western coast", "Oran et la côte ouest", "وهران والساحل الغربي"),
    body: L(
      "Born in the cabarets of Oran, Raï turned everyday pain — exile, love, defiance — into pulse. Cheikha Rimitti and Khaled gave Algeria a sound the world danced to.",
      "Né dans les cabarets d'Oran, le Raï a transformé la douleur quotidienne — exil, amour, défi — en pulsation. Cheikha Rimitti et Khaled ont donné à l'Algérie un son que le monde a dansé.",
      "وُلد الرّاي في حانات وهران، فحوّل ألم اليومي — الغربة، الحب، التحدي — إلى نبض. منحت الشيخة الريميتي وخالد الجزائرَ صوتًا رقص عليه العالم.",
    ),
  },
  {
    emoji: "🪕",
    title: L("Chaabi of the Casbah", "Chaâbi de la Casbah", "الشعبي في القصبة"),
    region: L("Algiers", "Alger", "الجزائر العاصمة"),
    body: L(
      "El Hadj M'Hamed El Anka took popular poetry and tuned it to mandole and tambourine. Chaabi is the long evening of an Algerian café — patient, witty, deep.",
      "El Hadj M'Hamed El Anka a accordé la poésie populaire au mandole et au tambourin. Le Chaâbi, c'est la longue soirée d'un café algérien — patient, spirituel, profond.",
      "أخذ الحاج محمد العنقا الشعر الشعبي وضبطه على الماندول والدف. الشعبي هو مساء طويل في مقهى جزائري — صبور، ذكي، عميق.",
    ),
  },
  {
    emoji: "🐪",
    title: L("Tuareg Tinde & Imzad", "Tinde et Imzad touaregs", "تندي وإمزاد الطوارق"),
    region: L("Hoggar & Tassili", "Hoggar et Tassili", "الهقار وطاسيلي"),
    body: L(
      "The imzad — a one-string violin played only by women — and the tinde drum carry desert nights into history. Music here is conversation between dunes and stars.",
      "L'imzad — vièle à une corde jouée seulement par les femmes — et le tambour tinde portent les nuits du désert dans l'histoire. Ici, la musique dialogue avec les dunes et les étoiles.",
      "الإمزاد — كمان بوتر واحد لا تعزفه إلا النساء — وطبل التندي يحملان ليالي الصحراء إلى التاريخ. الموسيقى هنا حوار بين الكثبان والنجوم.",
    ),
  },
  {
    emoji: "ⵣ",
    title: L("Amazigh Rhythms", "Rythmes amazighs", "إيقاعات أمازيغية"),
    region: L("Kabylie · Aurès · Mzab", "Kabylie · Aurès · Mzab", "القبائل · الأوراس · ميزاب"),
    body: L(
      "From Idir's quiet guitar to the brass of the Aurès, Amazigh music is a steady reminder: the oldest voice of this land has never stopped singing.",
      "De la guitare paisible d'Idir aux cuivres des Aurès, la musique amazighe rappelle sans cesse : la plus ancienne voix de cette terre n'a jamais cessé de chanter.",
      "من غيتار إيدير الهادئ إلى نحاسيات الأوراس، الموسيقى الأمازيغية تذكير ثابت: لم يصمت يومًا أقدم صوت في هذه الأرض.",
    ),
  },
];

type Ritual = { emoji: string; title: LocalizedString; body: LocalizedString };

const CUISINE_RITUALS: Ritual[] = [
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
    title: L("Dates of the Oasis", "Les dattes de l'oasis", "تمر الواحة"),
    body: L(
      "Deglet Nour is the 'finger of light' — fruit of three generations of patience. To break a fast with a date is to taste the desert's restraint.",
      "Deglet Nour, le « doigt de lumière » — fruit de trois générations de patience. Rompre le jeûne avec une datte, c'est goûter la retenue du désert.",
      "دقلة نور هي «إصبع النور» — ثمرة صبر ثلاثة أجيال. أن تفطر على تمرة هو أن تتذوّق صبر الصحراء.",
    ),
  },
  {
    emoji: "🌙",
    title: L("Ramadan Evenings", "Les soirées du Ramadan", "ليالي رمضان"),
    body: L(
      "Streets quiet at dusk, then bloom — chorba steaming, lanterns up, neighbours louder than usual. Ramadan turns the country into one long shared table.",
      "Les rues se taisent au crépuscule, puis fleurissent — chorba fumante, lanternes allumées, voisins plus bruyants qu'à l'ordinaire. Le Ramadan fait du pays une longue table partagée.",
      "تهدأ الشوارع عند الغروب ثم تتفتّح — شربة تتصاعد بخارها، فوانيس مضاءة، جيران أعلى صوتًا من المعتاد. يحوّل رمضان البلاد إلى مائدة طويلة مشتركة.",
    ),
  },
  {
    emoji: "☕",
    title: L("Coffeehouse Hours", "Les heures du café", "ساعات المقهى"),
    body: L(
      "An Algerian café is a parliament without rules. A coffee buys an afternoon of dominoes, politics and the careful art of doing nothing well.",
      "Un café algérien est un parlement sans règles. Une tasse achète un après-midi de dominos, de politique et l'art soigné de bien ne rien faire.",
      "المقهى الجزائري برلمان بلا قواعد. فنجان قهوة يشتري ظهيرة من الدومينو والسياسة وفنّ ألا تفعل شيئًا بإتقان.",
    ),
  },
  {
    emoji: "🥖",
    title: L("Bread Is Sacred", "Le pain est sacré", "الخبز مقدّس"),
    body: L(
      "Kesra, matlouε, baguette française — a fallen crumb is picked up and kissed. Bread carries a debt to land, hands, and the women who shaped both.",
      "Kesra, matlouε, baguette française — une miette tombée se ramasse et s'embrasse. Le pain porte une dette envers la terre, les mains et les femmes qui ont façonné les deux.",
      "كسرة، مطلوع، بغات فرنسية — كسرة سقطت تُلتقط وتُقبَّل. الخبز يحمل دينًا للأرض وللأيدي وللنساء اللواتي شكّلتهما.",
    ),
  },
];

type Word = { quote: LocalizedString; source: LocalizedString };

const WORDS: Word[] = [
  {
    quote: L(
      "Awal d wagur — d uchedhad af tudert.",
      "« La parole est lune — elle veille sur la vie. »",
      "«الكلمة قمر يسهر على الحياة.»",
    ),
    source: L("Kabyle proverb", "Proverbe kabyle", "مثل قبائلي"),
  },
  {
    quote: L(
      "“My country, I love you above all the lands.”",
      "« Mon pays, je t'aime au-dessus de toutes les terres. »",
      "«بلادي أحبّكِ فوق كل البلاد.»",
    ),
    source: L("Moufdi Zakaria, Kassaman", "Moufdi Zakaria, Kassaman", "مفدي زكريا، قسمًا"),
  },
  {
    quote: L(
      "“He who has no past, has no present.”",
      "« Qui n'a pas de passé n'a pas de présent. »",
      "«من لا ماضي له لا حاضر له.»",
    ),
    source: L("Algerian proverb", "Proverbe algérien", "مثل جزائري"),
  },
  {
    quote: L(
      "“We are children of the same earth, even when the sky changes.”",
      "« Nous sommes enfants de la même terre, même quand le ciel change. »",
      "«نحن أبناء الأرض ذاتها حتى وإن تغيّرت السماء.»",
    ),
    source: L("Saharan saying", "Dicton saharien", "قول صحراوي"),
  },
];

type Place = { emoji: string; title: LocalizedString; body: LocalizedString };

const ARCHITECTURE: Place[] = [
  {
    emoji: "🏛️",
    title: L("The Casbah of Algiers", "La Casbah d'Alger", "قصبة الجزائر"),
    body: L(
      "A vertical city of white cubes spilling toward the sea. Ottoman palaces, secret alleys, courtyards turned inward — a fortress of intimacy.",
      "Une ville verticale de cubes blancs versés vers la mer. Palais ottomans, ruelles secrètes, patios tournés vers l'intérieur — une forteresse d'intimité.",
      "مدينة عمودية من مكعّبات بيضاء تنحدر نحو البحر. قصور عثمانية وأزقة سرية وأفنية مفتوحة على الداخل — حصن للحميمية.",
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
    title: L("Roman Stones of Djemila & Timgad", "Pierres romaines de Djemila et Timgad", "حجارة جميلة وتيمقاد الرومانية"),
    body: L(
      "Forums, arches and theatres in the highlands — empire laid out on a grid, then quietly reclaimed by olive trees and goats.",
      "Forums, arcs et théâtres sur les hauts plateaux — l'empire dessiné en damier, puis doucement repris par les oliviers et les chèvres.",
      "ساحات وأقواس ومسارح في الهضاب — إمبراطورية مرسومة على شبكة، ثم استرجعها الزيتون والمعزى بهدوء.",
    ),
  },
  {
    emoji: "🕌",
    title: L("Mosques & Inner Courtyards", "Mosquées et patios intérieurs", "المساجد والأفنية الداخلية"),
    body: L(
      "From the Great Mosque of Tlemcen to the smallest village zawiya, sacred space in Algeria turns inward — toward fountain, shade, prayer.",
      "De la Grande Mosquée de Tlemcen à la plus petite zaouïa de village, l'espace sacré algérien se tourne vers l'intérieur — fontaine, ombre, prière.",
      "من جامع تلمسان الكبير إلى أصغر زاوية قروية، يلتفّ الفضاء المقدّس في الجزائر نحو الداخل — نافورة، ظلّ، صلاة.",
    ),
  },
  {
    emoji: "⛰️",
    title: L("Mountain Villages of Kabylie", "Villages perchés de Kabylie", "قرى القبائل الجبلية"),
    body: L(
      "Stone houses crowning the ridges, paths that remember every footstep. The village is a parliament, the djemâa its open-air chamber.",
      "Maisons de pierre couronnant les crêtes, chemins qui se souviennent de chaque pas. Le village est un parlement, la djemâa sa chambre à ciel ouvert.",
      "بيوت حجرية تتوّج القمم، ودروب تتذكّر كل خطوة. القرية برلمان، والجماعة قاعتها المفتوحة على السماء.",
    ),
  },
];

type MiniLesson = {
  emoji: string;
  question: LocalizedString;
  answer: LocalizedString;
};

const MINI_LESSONS: MiniLesson[] = [
  {
    emoji: "🫖",
    question: L("Why is tea symbolic?", "Pourquoi le thé est-il symbolique ?", "لماذا الشاي رمز؟"),
    answer: L(
      "Time. To accept tea is to accept slowness — three rounds, two hours, one conversation that matters.",
      "Le temps. Accepter le thé, c'est accepter la lenteur — trois tournées, deux heures, une conversation qui compte.",
      "إنه الوقت. قبول الشاي قبول للبطء — ثلاث جولات، ساعتان، وحديث واحد يستحق.",
    ),
  },
  {
    emoji: "🏛️",
    question: L("What is the Casbah?", "Qu'est-ce que la Casbah ?", "ما هي القصبة؟"),
    answer: L(
      "An Ottoman-era citadel-quarter above Algiers — UNESCO-listed, fiercely lived-in, a vertical labyrinth of memory.",
      "Une citadelle-quartier d'époque ottomane au-dessus d'Alger — classée UNESCO, vivante avec fougue, labyrinthe vertical de mémoire.",
      "حيّ-قلعة من العهد العثماني فوق الجزائر — مصنّف لدى اليونسكو، يعجّ بالحياة، متاهة عمودية من الذاكرة.",
    ),
  },
  {
    emoji: "🌴",
    question: L("Why are dates important?", "Pourquoi les dattes comptent-elles ?", "لماذا التمر مهم؟"),
    answer: L(
      "They are the desert's contract with humans: a tree planted today feeds your grandchildren. Sweetness as long-term thinking.",
      "Elles sont le contrat du désert avec l'humain : un arbre planté aujourd'hui nourrit vos petits-enfants. La douceur comme pensée à long terme.",
      "إنها عقد الصحراء مع الإنسان: شجرة تُغرس اليوم تُطعم أحفادك. حلاوة بوصفها تفكيرًا بعيد المدى.",
    ),
  },
  {
    emoji: "🏯",
    question: L("What is a ksar?", "Qu'est-ce qu'un ksar ?", "ما هو القصر؟"),
    answer: L(
      "A fortified earthen village of the Sahara — granary, mosque and homes folded into a single climate-clever organism.",
      "Un village fortifié en terre du Sahara — grenier, mosquée et habitations pliés en un même organisme intelligent face au climat.",
      "قرية صحراوية محصّنة من الطين — مخزن وجامع ومساكن مطوية في كائن واحد ذكي مناخيًا.",
    ),
  },
  {
    emoji: "🏜️",
    question: L("Why does the Sahara shape identity?", "Pourquoi le Sahara façonne-t-il l'identité ?", "لماذا تصوغ الصحراء الهوية؟"),
    answer: L(
      "It teaches restraint, hospitality and patience — virtues that travel north with every caravan and stay.",
      "Il enseigne la retenue, l'hospitalité et la patience — vertus qui remontent au nord avec chaque caravane et y demeurent.",
      "تعلّم التحفّظ والكرم والصبر — فضائل تصعد شمالًا مع كل قافلة وتستقرّ.",
    ),
  },
];

type IdentityEra = { dot: string; era: LocalizedString; body: LocalizedString };

const IDENTITY_TIMELINE: IdentityEra[] = [
  {
    dot: "ⵣ",
    era: L("Amazigh roots", "Racines amazighes", "الجذور الأمازيغية"),
    body: L(
      "Before any empire spoke to this land, the land already spoke Tamazight. The yaz — ⵣ — is the signature beneath every later layer.",
      "Avant qu'aucun empire ne parle à cette terre, la terre parlait déjà tamazight. Le yaz — ⵣ — est la signature sous toutes les couches qui suivront.",
      "قبل أن تخاطب أيّ إمبراطورية هذه الأرض، كانت الأرض تتحدّث الأمازيغية. اليازْ — ⵣ — توقيع تحت كل الطبقات اللاحقة.",
    ),
  },
  {
    dot: "🏛️",
    era: L("Numidia & Rome", "Numidie et Rome", "نوميديا وروما"),
    body: L(
      "Cities of stone, kings of cavalry, a Berber pope. Algeria becomes a Mediterranean argument.",
      "Cités de pierre, rois cavaliers, un pape berbère. L'Algérie devient une discussion méditerranéenne.",
      "مدن من حجر، ملوك فرسان، وبابا أمازيغي. تصير الجزائر جدالًا متوسطيًا.",
    ),
  },
  {
    dot: "☪️",
    era: L("Islamic centuries", "Siècles islamiques", "القرون الإسلامية"),
    body: L(
      "Arabic flows into Tamazight, mosques rise beside marabouts, the country learns to be both Maghrebi and universal.",
      "L'arabe se mêle au tamazight, les mosquées s'élèvent près des marabouts, le pays apprend à être à la fois maghrébin et universel.",
      "تمتزج العربية بالأمازيغية، وترتفع المساجد قرب الأضرحة، وتتعلّم البلاد أن تكون مغاربية وكونية في آن.",
    ),
  },
  {
    dot: "⚓",
    era: L("Ottoman Algiers", "Alger ottomane", "الجزائر العثمانية"),
    body: L(
      "A city-state on the Mediterranean — corsairs, embassies, Andalusian refugees, courtyards opening on the sea.",
      "Une cité-État méditerranéenne — corsaires, ambassades, réfugiés andalous, patios ouverts sur la mer.",
      "دولة مدينة متوسطية — قراصنة وسفارات ولاجئون أندلسيون وأفنية تطلّ على البحر.",
    ),
  },
  {
    dot: "🕯️",
    era: L("Colonial fracture", "Fracture coloniale", "كسر الاستعمار"),
    body: L(
      "Land seized, language pressed, identity wounded — and quietly preserved in kitchens, songs and grandmothers' tongues.",
      "Terres saisies, langue pressée, identité blessée — et discrètement préservée dans les cuisines, les chansons, la langue des grands-mères.",
      "أرض مصادرة، لغة مكبوتة، هوية مجروحة — وحُفظت بهدوء في المطابخ والأغاني وألسنة الجدّات.",
    ),
  },
  {
    dot: "🇩🇿",
    era: L("Independence & today", "Indépendance et aujourd'hui", "الاستقلال واليوم"),
    body: L(
      "A nation re-stitched from its layers — Arabic, Tamazight, French; sea, mountain, desert; memory and modern noise.",
      "Une nation recousue à partir de ses couches — arabe, tamazight, français ; mer, montagne, désert ; mémoire et bruit moderne.",
      "أمّة أُعيد خياطتها من طبقاتها — العربية والأمازيغية والفرنسية، بحر وجبل وصحراء، ذاكرة وضجيج حديث.",
    ),
  },
];

/* ------------------------------------------------------------------ */
/* Route                                                              */
/* ------------------------------------------------------------------ */

export const Route = createFileRoute("/culture")({
  head: () => ({
    meta: [
      { title: "Culture — A Living Algeria" },
      {
        name: "description",
        content:
          "A museum-style exploration of Algerian culture: traditions, music, cuisine, words, architecture and the long memory of Amazigh heritage.",
      },
      { property: "og:title", content: "Culture — A Living Algeria" },
      {
        property: "og:description",
        content: "Wander through Algerian identity — traditions, music, cuisine, words and architecture.",
      },
    ],
  }),
  component: CulturePage,
});

function CulturePage() {
  const lang = useLang();

  useEffect(() => {
    saveJourneyPlace({
      section: "regions",
      label: L("Culture — A Living Algeria", "Culture — une Algérie vivante", "الثقافة — جزائر حيّة"),
      description: L(
        "Traditions, music, cuisine, words and architecture",
        "Traditions, musique, cuisine, mots et architecture",
        "تقاليد، موسيقى، مطبخ، كلمات، عمارة",
      ),
      href: "/culture",
    });
  }, []);

  const C = {
    eyebrow: L("A living Algeria", "Une Algérie vivante", "جزائر حيّة")[lang],
    title: L("The Culture", "La Culture", "الثقافة")[lang],
    intro: L(
      "Not a list of customs — a long sentence written by sea, mountain and desert, in three languages and many silences. Wander slowly.",
      "Pas une liste de coutumes — une longue phrase écrite par la mer, la montagne et le désert, en trois langues et bien des silences. Avancez lentement.",
      "ليست قائمة عادات — بل جملة طويلة كتبها البحر والجبل والصحراء، بثلاث لغات وكثير من الصمت. تجوّل بهدوء.",
    )[lang],

    contents: L("In this hall", "Dans cette salle", "في هذه القاعة")[lang],
    traditions: L("Living Traditions", "Traditions vivantes", "تقاليد حيّة")[lang],
    music: L("Music & Oral Memory", "Musique & mémoire orale", "الموسيقى والذاكرة الشفهية")[lang],
    cuisine: L("Cuisine & Daily Rituals", "Cuisine & rituels quotidiens", "المطبخ والطقوس اليومية")[lang],
    words: L("Words of Algeria", "Mots d'Algérie", "كلمات الجزائر")[lang],
    architecture: L("Architecture & Spaces", "Architecture & espaces", "العمارة والفضاءات")[lang],
    minute: L("One-Minute Lessons", "Leçons d'une minute", "دروس الدقيقة")[lang],
    identity: L("Identity Through Time", "L'identité à travers le temps", "الهوية عبر الزمن")[lang],
    amazigh: L("Amazigh Heritage", "Héritage amazigh", "التراث الأمازيغي")[lang],

    moreWords: L("Open the full Words archive", "Ouvrir l'archive des mots", "افتح أرشيف الكلمات")[lang],
    moreCuisine: L("Open the cuisine atlas", "Ouvrir l'atlas culinaire", "افتح أطلس المطبخ")[lang],
    moreLessons: L("Open the lessons hall", "Ouvrir la salle des leçons", "افتح قاعة الدروس")[lang],

    amazighBody: L(
      "Before Phoenicians, before Rome, before any later name — there was Tamazight. The yaz ⵣ marks doorways, rugs, jewellery and skin. It is not nostalgia; it is the grammar of this land.",
      "Avant les Phéniciens, avant Rome, avant tout nom plus tardif — il y avait le tamazight. Le yaz ⵣ orne portes, tapis, bijoux et peau. Ce n'est pas de la nostalgie ; c'est la grammaire de cette terre.",
      "قبل الفينيقيين، قبل روما، قبل كل اسم لاحق — كانت الأمازيغية. اليازْ ⵣ يعلّم الأبواب والزرابي والحلي والجلد. ليست حنينًا، بل قواعد لهذه الأرض.",
    )[lang],
  };

  const sections = [
    { id: "traditions", label: C.traditions },
    { id: "music", label: C.music },
    { id: "cuisine", label: C.cuisine },
    { id: "words", label: C.words },
    { id: "architecture", label: C.architecture },
    { id: "minute", label: C.minute },
    { id: "identity", label: C.identity },
    { id: "amazigh", label: C.amazigh },
  ];

  return (
    <div className="min-h-dvh">
      <Header />

      {/* Hero */}
      <section className="museum-hero">
        <div
          aria-hidden
          className="absolute inset-0 pointer-events-none opacity-[0.05] text-[16rem] sm:text-[22rem] font-black leading-none flex items-center justify-center select-none"
          style={{ color: "var(--accent)" }}
        >
          ⵣ
        </div>
        <div className="relative max-w-3xl mx-auto px-4 py-14 sm:py-20 text-center animate-cinematic-in">
          <span className="museum-eyebrow">
            <span aria-hidden>✦</span> {C.eyebrow}
          </span>
          <h1 className="mt-4 text-4xl sm:text-5xl lg:text-6xl">{C.title}</h1>
          <p className="mt-5 max-w-2xl mx-auto text-base sm:text-lg leading-relaxed text-muted-foreground">
            {C.intro}
          </p>
        </div>
      </section>

      <main className="max-w-5xl mx-auto px-4 py-10 sm:py-14 museum-stack-lg">
        {/* Contents */}
        <nav aria-label={C.contents}>
          <div className="museum-eyebrow mb-3">{C.contents}</div>
          <div className="flex flex-wrap gap-1.5">
            {sections.map((s) => (
              <a
                key={s.id}
                href={`#${s.id}`}
                className="px-3 py-1.5 rounded-full text-xs font-semibold bg-card border border-border text-muted-foreground hover:text-foreground hover:border-primary/40 transition"
              >
                {s.label}
              </a>
            ))}
          </div>
        </nav>

        {/* 1. Living traditions */}
        <Section id="traditions" eyebrow="01" title={C.traditions}>
          <div className="grid sm:grid-cols-2 gap-4">
            {TRADITIONS.map((tr, i) => (
              <article key={i} className="museum-card">
                <div className="flex items-start gap-3">
                  <div className="text-3xl leading-none">{tr.emoji}</div>
                  <div className="flex-1 min-w-0">
                    <h3 className="text-lg font-bold tracking-tight">{t(tr.title, lang)}</h3>
                    <p className="mt-2 text-sm leading-relaxed text-foreground/85">{t(tr.body, lang)}</p>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </Section>

        {/* 2. Music & oral memory */}
        <Section id="music" eyebrow="02" title={C.music}>
          <div className="grid sm:grid-cols-2 gap-4">
            {MUSIC.map((m, i) => (
              <article key={i} className="museum-card">
                <div className="flex items-start gap-3">
                  <div className="text-3xl leading-none">{m.emoji}</div>
                  <div className="flex-1 min-w-0">
                    <h3 className="text-lg font-bold tracking-tight">{t(m.title, lang)}</h3>
                    <div className="mt-1 text-[11px] uppercase tracking-[0.18em] font-bold text-accent-foreground">
                      {t(m.region, lang)}
                    </div>
                    <p className="mt-2 text-sm leading-relaxed text-foreground/85">{t(m.body, lang)}</p>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </Section>

        {/* 3. Cuisine & daily rituals */}
        <Section id="cuisine" eyebrow="03" title={C.cuisine}>
          <div className="grid sm:grid-cols-2 gap-4">
            {CUISINE_RITUALS.map((r, i) => (
              <article key={i} className="museum-card">
                <div className="flex items-start gap-3">
                  <div className="text-3xl leading-none">{r.emoji}</div>
                  <div className="flex-1 min-w-0">
                    <h3 className="text-lg font-bold tracking-tight">{t(r.title, lang)}</h3>
                    <p className="mt-2 text-sm leading-relaxed text-foreground/85">{t(r.body, lang)}</p>
                  </div>
                </div>
              </article>
            ))}
          </div>
          <FooterLink to="/cuisine" label={C.moreCuisine} />
        </Section>

        {/* 4. Words of Algeria */}
        <Section id="words" eyebrow="04" title={C.words}>
          <div className="grid sm:grid-cols-2 gap-4">
            {WORDS.map((w, i) => (
              <blockquote
                key={i}
                className="museum-pullquote museum-card !pt-6"
              >
                <p className="text-lg leading-snug">{t(w.quote, lang)}</p>
                <footer className="mt-3 text-xs uppercase tracking-[0.18em] font-bold text-muted-foreground not-italic">
                  — {t(w.source, lang)}
                </footer>
              </blockquote>
            ))}
          </div>
          <FooterLink to="/words" label={C.moreWords} />
        </Section>

        {/* 5. Architecture & spaces */}
        <Section id="architecture" eyebrow="05" title={C.architecture}>
          <div className="grid sm:grid-cols-2 gap-4">
            {ARCHITECTURE.map((p, i) => (
              <article key={i} className="museum-card">
                <div className="flex items-start gap-3">
                  <div className="text-3xl leading-none">{p.emoji}</div>
                  <div className="flex-1 min-w-0">
                    <h3 className="text-lg font-bold tracking-tight">{t(p.title, lang)}</h3>
                    <p className="mt-2 text-sm leading-relaxed text-foreground/85">{t(p.body, lang)}</p>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </Section>

        {/* 6. One-minute lessons */}
        <Section id="minute" eyebrow="06" title={C.minute}>
          <div className="grid sm:grid-cols-2 gap-3">
            {MINI_LESSONS.map((l, i) => (
              <details
                key={i}
                className="museum-card group cursor-pointer [&_summary::-webkit-details-marker]:hidden"
              >
                <summary className="flex items-start gap-3 list-none">
                  <div className="text-2xl leading-none">{l.emoji}</div>
                  <div className="flex-1 min-w-0">
                    <h3 className="text-base font-bold tracking-tight">{t(l.question, lang)}</h3>
                    <div className="mt-1 text-[11px] uppercase tracking-[0.18em] font-bold text-muted-foreground">
                      {lang === "fr" ? "Toucher pour révéler" : lang === "ar" ? "اضغط للكشف" : "Tap to reveal"}
                    </div>
                  </div>
                  <span
                    className="ml-2 text-muted-foreground transition-transform group-open:rotate-45"
                    aria-hidden
                  >
                    +
                  </span>
                </summary>
                <p className="mt-3 ps-9 text-sm leading-relaxed text-foreground/85">{t(l.answer, lang)}</p>
              </details>
            ))}
          </div>
          <FooterLink to="/lessons" label={C.moreLessons} />
        </Section>

        {/* 7. Identity through time */}
        <Section id="identity" eyebrow="07" title={C.identity}>
          <ol className="relative border-s border-border ps-6 space-y-6">
            {IDENTITY_TIMELINE.map((step, i) => (
              <li key={i} className="relative">
                <span
                  className="absolute -start-[34px] top-0 grid place-items-center w-7 h-7 rounded-full bg-card border border-border text-sm"
                  aria-hidden
                >
                  {step.dot}
                </span>
                <h3 className="text-lg font-bold tracking-tight">{t(step.era, lang)}</h3>
                <p className="mt-1.5 text-sm leading-relaxed text-foreground/85">{t(step.body, lang)}</p>
              </li>
            ))}
          </ol>
        </Section>

        {/* 8. Amazigh heritage */}
        <Section id="amazigh" eyebrow="08" title={C.amazigh}>
          <div className="museum-card flex flex-col sm:flex-row items-center gap-6">
            <div className="shrink-0">
              <AmazighSymbol size={88} />
            </div>
            <div>
              <p className="text-base leading-relaxed text-foreground/90">{C.amazighBody}</p>
              <div className="mt-4 flex flex-wrap gap-1.5">
                {["ⴰ", "ⵎ", "ⴰ", "ⵣ", "ⵉ", "ⵖ"].map((g, i) => (
                  <span
                    key={i}
                    className="w-9 h-9 grid place-items-center rounded-md border border-border bg-muted/40 text-lg"
                    aria-hidden
                  >
                    {g}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </Section>

        {/* Closing note */}
        <p className="museum-note text-center max-w-xl mx-auto">
          {lang === "fr"
            ? "La culture n'est pas un musée fermé — c'est une conversation que vous venez de rejoindre."
            : lang === "ar"
              ? "الثقافة ليست متحفًا مغلقًا — بل حوار للتوّ انضممتَ إليه."
              : "Culture is not a closed museum — it is a conversation you have just joined."}
        </p>
      </main>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* Subcomponents                                                      */
/* ------------------------------------------------------------------ */

function Section({
  id, eyebrow, title, children,
}: {
  id: string;
  eyebrow: string;
  title: string;
  children: React.ReactNode;
}) {
  return (
    <section id={id} className="scroll-mt-24 museum-stack">
      <header>
        <div className="museum-eyebrow">{eyebrow}</div>
        <h2 className="museum-section-title mt-1">{title}</h2>
      </header>
      {children}
    </section>
  );
}

function FooterLink({ to, label }: { to: "/words" | "/cuisine" | "/lessons"; label: string }) {
  return (
    <div className="mt-2">
      <Link
        to={to}
        className="inline-flex items-center gap-2 text-sm font-semibold text-primary hover:opacity-80 transition"
      >
        {label}
        <span aria-hidden>→</span>
      </Link>
    </div>
  );
}

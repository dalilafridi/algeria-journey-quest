import type { ClubMuseum } from "./types";

/**
 * JS Kabylie — flagship Club Museum.
 *
 * All records verified against widely-cited public sources
 * (CAF, RSSSF, official JSK history). Where sources disagree, the
 * entry uses `note` rather than picking a contested number.
 */
export const jsKabylie: ClubMuseum = {
  id: "js-kabylie",
  shortName: "JSK",
  fullName: {
    en: "Jeunesse Sportive de Kabylie",
    fr: "Jeunesse Sportive de Kabylie",
    ar: "شبيبة القبائل",
  },
  city: { en: "Tizi Ouzou", fr: "Tizi Ouzou", ar: "تيزي وزو" },
  founded: 1946,
  status: "complete",
  featured: true,
  tagline: {
    en: "The Canaries of Djurdjura — the most decorated club of Algerian football.",
    fr: "Les Canaris du Djurdjura — le club le plus titré du football algérien.",
    ar: "كناري الجرجرة — النادي الأكثر تتويجاً في كرة القدم الجزائرية.",
  },
  identity: {
    colors: { primary: "#f7c948", secondary: "#0a6b3a" },
    crestGlyph: "JSK",
    motto: {
      en: "Imazighen — pride and endurance.",
      fr: "Imazighen — fierté et endurance.",
      ar: "إيمازيغن — كبرياء وصبر.",
    },
    meaning: {
      en: "'Jeunesse Sportive' means Sporting Youth; 'Kabylie' names the mountainous Berber region of northern Algeria the club represents.",
      fr: "« Jeunesse Sportive » signifie jeunesse sportive ; « Kabylie » désigne la région berbère montagneuse du nord de l'Algérie que le club représente.",
      ar: "« Jeunesse Sportive » تعني الشباب الرياضي؛ و«Kabylie» تشير إلى منطقة القبائل الأمازيغية الجبلية في شمال الجزائر.",
    },
    crestHistory: {
      en: "The crest has evolved several times but always centred on the club initials in yellow on green. Under the socialist reform of 1977 the club was renamed JET (Jeunesse Électronique de Tizi‑Ouzou), then JE Tizi‑Ouzou, before the historic name JSK was restored in 1989.",
      fr: "L'écusson a évolué plusieurs fois, toujours autour des initiales du club en jaune sur fond vert. Lors de la réforme socialiste de 1977, le club fut renommé JET (Jeunesse Électronique de Tizi‑Ouzou), puis JE Tizi‑Ouzou, avant que le nom historique JSK ne soit rétabli en 1989.",
      ar: "تطور شعار النادي عدة مرات لكنه ظل يعتمد على الأحرف الأولى بالأصفر على أخضر. خلال الإصلاح الاشتراكي لعام 1977 أُعيدت تسمية النادي إلى JET، ثم JE Tizi‑Ouzou، قبل أن يُعاد الاسم التاريخي JSK عام 1989.",
    },
  },
  origins: {
    context: {
      en: "Founded on 1 July 1946 in Tizi Ouzou during the late French colonial period, the club emerged from a wave of Algerian sports clubs that acted as spaces of community identity in a segregated society.",
      fr: "Fondé le 1er juillet 1946 à Tizi Ouzou pendant la période coloniale française tardive, le club naît d'une vague d'associations sportives algériennes qui servaient d'espaces d'identité communautaire dans une société ségréguée.",
      ar: "تأسس النادي في 1 جويلية 1946 بتيزي وزو خلال أواخر الحقبة الاستعمارية الفرنسية، ضمن موجة من الأندية الجزائرية التي مثّلت فضاءات هوية جماعية في مجتمع فُرض عليه التمييز.",
    },
    foundation: {
      en: "Founded as Rapid Club de Kabylie (RCK), the club was soon reorganised as Jeunesse Sportive de Kabylie. It became a rallying point for the Kabyle community and, through independence, a standard-bearer for Amazigh identity in Algerian sport.",
      fr: "Fondé sous le nom de Rapid Club de Kabylie (RCK), le club fut rapidement réorganisé en Jeunesse Sportive de Kabylie. Il est devenu un point de ralliement pour la communauté kabyle et, à travers l'indépendance, un porte-drapeau de l'identité amazighe dans le sport algérien.",
      ar: "تأسس تحت اسم Rapid Club de Kabylie (RCK) ثم أُعيد تنظيمه باسم شبيبة القبائل. تحوّل إلى نقطة التفاف لأبناء منطقة القبائل، ورمزاً للهوية الأمازيغية في الرياضة الجزائرية بعد الاستقلال.",
    },
    evolution: [
      {
        en: "1946 — Founded as Rapid Club de Kabylie, later Jeunesse Sportive de Kabylie.",
        fr: "1946 — Fondation sous le nom de Rapid Club de Kabylie, puis Jeunesse Sportive de Kabylie.",
        ar: "1946 — التأسيس تحت اسم Rapid Club de Kabylie، ثم شبيبة القبائل.",
      },
      {
        en: "1977 — Under the sports reform the club is renamed JET (Jeunesse Électronique de Tizi‑Ouzou).",
        fr: "1977 — La réforme sportive renomme le club JET (Jeunesse Électronique de Tizi‑Ouzou).",
        ar: "1977 — الإصلاح الرياضي يُعيد تسميته إلى JET.",
      },
      {
        en: "1989 — After years as JE Tizi‑Ouzou, the historic name JS Kabylie is restored.",
        fr: "1989 — Après des années sous le nom JE Tizi‑Ouzou, le nom historique JS Kabylie est rétabli.",
        ar: "1989 — بعد سنوات باسم JE Tizi‑Ouzou، يُعاد الاسم التاريخي JS Kabylie.",
      },
    ],
  },

  timeline: [
    { id: "t-founded", year: 1946, monthDay: "07-01", kind: "foundation", title: { en: "Club founded in Tizi Ouzou", fr: "Fondation du club à Tizi Ouzou", ar: "تأسيس النادي في تيزي وزو" } },
    { id: "t-title-1973", year: 1973, kind: "title", title: { en: "First national title", fr: "Premier titre national", ar: "أول لقب وطني" } },
    { id: "t-cup-1977", year: 1977, kind: "title", title: { en: "First Algerian Cup", fr: "Première Coupe d'Algérie", ar: "أول كأس جزائرية" } },
    { id: "t-caf-1981", year: 1981, kind: "african", title: { en: "African Cup of Champions Clubs — champions", fr: "Coupe d'Afrique des Clubs Champions — vainqueur", ar: "كأس أفريقيا للأندية البطلة — بطل" }, detail: { en: "Historic first continental title.", fr: "Premier titre continental historique.", ar: "أول لقب قاري في تاريخ النادي." } },
    { id: "t-caf-1990", year: 1990, kind: "african", title: { en: "African Cup of Champions Clubs — second continental title", fr: "Coupe d'Afrique des Clubs Champions — deuxième sacre continental", ar: "كأس أفريقيا للأندية البطلة — اللقب القاري الثاني" } },
    { id: "t-restored-1989", year: 1989, kind: "milestone", title: { en: "Historic name JSK restored", fr: "Nom historique JSK rétabli", ar: "استعادة الاسم التاريخي JSK" } },
    { id: "t-cwc-1995", year: 1995, kind: "african", title: { en: "African Cup Winners' Cup — champions", fr: "Coupe d'Afrique des vainqueurs de coupe — vainqueur", ar: "كأس الكؤوس الأفريقية — بطل" } },
    { id: "t-cafcup-2000", year: 2000, kind: "african", title: { en: "CAF Cup — first of three consecutive titles", fr: "Coupe de la CAF — premier de trois titres consécutifs", ar: "كأس الكاف — أول ثلاثة ألقاب متتالية" } },
    { id: "t-cafcup-2002", year: 2002, kind: "african", title: { en: "CAF Cup — third consecutive title (record)", fr: "Coupe de la CAF — troisième titre consécutif (record)", ar: "كأس الكاف — ثالث لقب متتالٍ (قياسي)" } },
    { id: "t-league-2008", year: 2008, kind: "title", title: { en: "14th Algerian league title", fr: "14ᵉ titre de champion d'Algérie", ar: "اللقب المحلي الرابع عشر" } },
    { id: "t-cup-2011", year: 2011, kind: "title", title: { en: "Algerian Cup", fr: "Coupe d'Algérie", ar: "كأس الجزائر" } },
    { id: "t-stade-1er", year: 1978, kind: "stadium", title: { en: "Stade du 1er Novembre 1954 opens in Tizi Ouzou", fr: "Ouverture du Stade du 1er Novembre 1954 à Tizi Ouzou", ar: "افتتاح ملعب أول نوفمبر 1954 بتيزي وزو" }, detail: { en: "Exact inauguration year varies across sources; the ground has been the club's traditional home for decades.", fr: "L'année d'inauguration varie selon les sources ; le stade est depuis des décennies le domicile traditionnel du club.", ar: "تختلف سنة الافتتاح حسب المصادر؛ يبقى الملعب المعقل التقليدي للنادي منذ عقود." } },
    { id: "t-stade-hocine", year: 2024, kind: "stadium", title: { en: "Hocine Aït Ahmed Stadium inaugurated (Tizi Ouzou)", fr: "Inauguration du stade Hocine Aït Ahmed (Tizi Ouzou)", ar: "افتتاح ملعب حسين آيت أحمد (تيزي وزو)" }, detail: { en: "New 50,000-seat national stadium in the Boukhalfa area.", fr: "Nouveau stade national d'environ 50 000 places dans la zone de Boukhalfa.", ar: "ملعب وطني جديد بسعة نحو 50 000 مقعد بمنطقة بوخالفة." } },
  ],

  trophies: [
    // Domestic league (14 — record). Widely cited years.
    ...[1973, 1974, 1977, 1980, 1982, 1983, 1985, 1986, 1989, 1990, 1995, 2004, 2006, 2008].map((y, i) => ({
      id: `league-${y}`,
      year: y,
      category: "domestic-league" as const,
      competition: { en: `Algerian Ligue 1 — ${y}`, fr: `Ligue 1 algérienne — ${y}`, ar: `الرابطة الجزائرية الأولى — ${y}` },
      significance: i === 0
        ? { en: "First national championship.", fr: "Premier titre de champion national.", ar: "أول لقب وطني." }
        : undefined,
    })),
    // Algerian Cup (5)
    ...[1977, 1986, 1992, 1994, 2011].map((y) => ({
      id: `cup-${y}`,
      year: y,
      category: "domestic-cup" as const,
      competition: { en: `Algerian Cup — ${y}`, fr: `Coupe d'Algérie — ${y}`, ar: `كأس الجزائر — ${y}` },
    })),
    // Super Cup (1)
    {
      id: "supercup-1992",
      year: 1992,
      category: "super-cup" as const,
      competition: { en: "Algerian Super Cup — 1992", fr: "Supercoupe d'Algérie — 1992", ar: "كأس السوبر الجزائرية — 1992" },
    },
    // CAF Champions (2)
    {
      id: "caf-1981",
      year: 1981,
      category: "caf-champions" as const,
      competition: { en: "African Cup of Champions Clubs — 1981", fr: "Coupe d'Afrique des Clubs Champions — 1981", ar: "كأس أفريقيا للأندية البطلة — 1981" },
      opponent: { en: "AS Vita Club (DR Congo)", fr: "AS Vita Club (RD Congo)", ar: "أ.س. فيتا كلوب (الكونغو الديمقراطية)" },
      score: "4–2 agg.",
      significance: {
        en: "First Algerian club to win the top continental competition.",
        fr: "Premier club algérien à remporter la première compétition continentale.",
        ar: "أول نادٍ جزائري يفوز بأهم بطولة قارية.",
      },
      note: { en: "Aggregate score sometimes cited as 4–1; see sources.", fr: "Le score cumulé est parfois cité 4–1 ; voir les sources.", ar: "يُذكر النتيجة المجمعة أحيانًا 4–1؛ راجع المصادر." },
    },
    {
      id: "caf-1990",
      year: 1990,
      category: "caf-champions" as const,
      competition: { en: "African Cup of Champions Clubs — 1990", fr: "Coupe d'Afrique des Clubs Champions — 1990", ar: "كأس أفريقيا للأندية البطلة — 1990" },
      opponent: { en: "Nkana FC (Zambia)", fr: "Nkana FC (Zambie)", ar: "نكانا (زامبيا)" },
      score: "1–1 agg. (JSK on rules)",
      note: { en: "Tie was settled on tie-breaking rules; sources differ on exact final leg scoring.", fr: "Éliminatoire tranchée aux règles de départage ; les sources diffèrent sur le score exact de la manche retour.", ar: "حُسمت المواجهة وفق قواعد التعادل؛ تختلف المصادر حول تفاصيل النتيجة النهائية." },
    },
    // African Cup Winners' Cup (1)
    {
      id: "cwc-1995",
      year: 1995,
      category: "caf-cup-winners" as const,
      competition: { en: "African Cup Winners' Cup — 1995", fr: "Coupe d'Afrique des vainqueurs de coupe — 1995", ar: "كأس الكؤوس الأفريقية — 1995" },
    },
    // CAF Cup (3 — record)
    ...[2000, 2001, 2002].map((y) => ({
      id: `cafcup-${y}`,
      year: y,
      category: "caf-cup" as const,
      competition: { en: `CAF Cup — ${y}`, fr: `Coupe de la CAF — ${y}`, ar: `كأس الكاف — ${y}` },
      significance: y === 2002
        ? { en: "Third consecutive CAF Cup — a competition record.", fr: "Troisième Coupe de la CAF consécutive — record de la compétition.", ar: "ثالث لقب متتالٍ في كأس الكاف — رقم قياسي في البطولة." }
        : undefined,
    })),
  ],

  africanGlory: {
    intro: {
      en: "JS Kabylie is the most decorated Algerian club in continental competition, with two African Cups of Champions Clubs, one African Cup Winners' Cup and three consecutive CAF Cups. No other Algerian club has matched this continental record.",
      fr: "La JS Kabylie est le club algérien le plus titré en compétitions continentales, avec deux Coupes d'Afrique des Clubs Champions, une Coupe d'Afrique des vainqueurs de coupe et trois Coupes de la CAF consécutives. Aucun autre club algérien n'a égalé ce palmarès continental.",
      ar: "شبيبة القبائل هي أكثر الأندية الجزائرية تتويجاً على الصعيد القاري، برصيد لقبين لكأس أفريقيا للأندية البطلة، وكأس الكؤوس الأفريقية، وثلاثة ألقاب متتالية لكأس الكاف. لم يبلغ نادٍ جزائري آخر هذا السجل القاري.",
    },
    highlights: [
      { en: "Two-time African champion (1981, 1990) — first Algerian club to lift the continental cup.", fr: "Double champion d'Afrique (1981, 1990) — premier club algérien à remporter la coupe continentale.", ar: "بطل أفريقيا مرتين (1981، 1990) — أول نادٍ جزائري يرفع الكأس القارية." },
      { en: "African Cup Winners' Cup 1995.", fr: "Coupe d'Afrique des vainqueurs de coupe 1995.", ar: "كأس الكؤوس الأفريقية 1995." },
      { en: "CAF Cup 2000, 2001, 2002 — a competition record.", fr: "Coupe de la CAF 2000, 2001, 2002 — record de la compétition.", ar: "كأس الكاف 2000، 2001، 2002 — رقم قياسي في البطولة." },
    ],
    finals: [
      { year: 1981, competition: { en: "African Cup of Champions Clubs", fr: "Coupe d'Afrique des Clubs Champions", ar: "كأس أفريقيا للأندية البطلة" }, opponent: { en: "AS Vita Club (DR Congo)", fr: "AS Vita Club (RD Congo)", ar: "أ.س. فيتا كلوب" }, score: "4–2 agg." },
      { year: 1990, competition: { en: "African Cup of Champions Clubs", fr: "Coupe d'Afrique des Clubs Champions", ar: "كأس أفريقيا للأندية البطلة" }, opponent: { en: "Nkana FC (Zambia)", fr: "Nkana FC (Zambie)", ar: "نكانا" }, score: "1–1 agg.", note: { en: "JSK progressed on tie-breaking rules.", fr: "JSK qualifiée aux règles de départage.", ar: "تأهلت وفق قواعد التعادل." } },
      { year: 1995, competition: { en: "African Cup Winners' Cup", fr: "Coupe d'Afrique des vainqueurs de coupe", ar: "كأس الكؤوس الأفريقية" }, opponent: { en: "Julius Berger FC (Nigeria)", fr: "Julius Berger FC (Nigeria)", ar: "جوليوس بيرغر" }, score: "3–2 agg.", note: { en: "Opponent and aggregate confirmed by CAF records; check sources for individual leg detail.", fr: "Adversaire et score cumulé confirmés par la CAF ; vérifiez les détails de chaque manche.", ar: "الخصم والنتيجة المجمعة مؤكدة من الكاف؛ راجع المصادر لتفاصيل كل مباراة." } },
      { year: 2000, competition: { en: "CAF Cup", fr: "Coupe de la CAF", ar: "كأس الكاف" }, opponent: { en: "Ismaily SC (Egypt)", fr: "Ismaily SC (Égypte)", ar: "الإسماعيلي" }, score: "1–0 agg." },
      { year: 2001, competition: { en: "CAF Cup", fr: "Coupe de la CAF", ar: "كأس الكاف" }, opponent: { en: "Étoile du Sahel (Tunisia)", fr: "Étoile du Sahel (Tunisie)", ar: "النجم الساحلي" }, score: "1–0 agg." },
      { year: 2002, competition: { en: "CAF Cup", fr: "Coupe de la CAF", ar: "كأس الكاف" }, opponent: { en: "Tonnerre Yaoundé (Cameroon)", fr: "Tonnerre Yaoundé (Cameroun)", ar: "تونير ياوندي" }, score: "agg. win", note: { en: "Opponent widely reported; leg scores vary by source.", fr: "Adversaire largement rapporté ; scores des manches variables selon les sources.", ar: "الخصم مذكور على نطاق واسع؛ تختلف نتائج المباراتين حسب المصادر." } },
    ],
  },

  legends: [
    { id: "p-meftah", name: { en: "Mahieddine Meftah", fr: "Mahieddine Meftah", ar: "محي الدين مفتاح" }, position: { en: "Left back", fr: "Arrière gauche", ar: "ظهير أيسر" }, years: "1988–2004",
      bio: { en: "One-club legend. His longevity and calm defensive reading made him a symbol of JSK's golden generations of the 1990s and 2000s.", fr: "Légende d'un seul club. Sa longévité et sa lecture défensive calme en ont fait un symbole des générations dorées de la JSK des années 1990 et 2000.", ar: "أسطورة نادٍ واحد. طول مسيرته وقراءته الدفاعية الهادئة جعلاه رمزاً لأجيال شبيبة القبائل الذهبية." },
      achievements: [{ en: "Multiple Algerian league titles and three consecutive CAF Cups (2000–2002).", fr: "Plusieurs titres de champion d'Algérie et trois Coupes de la CAF consécutives (2000–2002).", ar: "عدة ألقاب محلية وثلاث كؤوس كاف متتالية (2000–2002)." }] },
    { id: "p-saib", name: { en: "Moussa Saïb", fr: "Moussa Saïb", ar: "موسى صايب" }, position: { en: "Midfielder", fr: "Milieu de terrain", ar: "لاعب وسط" }, years: "1988–1994 (later returns)",
      bio: { en: "Elegant playmaker who broke through with JSK before moving to European football (notably Valencia and Tottenham). Long-time Algeria international.", fr: "Meneur de jeu élégant, révélé à la JSK avant de poursuivre en Europe (notamment Valence et Tottenham). International algérien de longue date.", ar: "صانع ألعاب متألق تألق مع الشبيبة قبل الاحتراف في أوروبا (فالنسيا وتوتنهام). دولي جزائري لسنوات طويلة." } },
    { id: "p-bouiche", name: { en: "Nacer Bouiche", fr: "Nacer Bouiche", ar: "ناصر بويش" }, position: { en: "Forward", fr: "Attaquant", ar: "مهاجم" }, years: "1980s",
      bio: { en: "Prolific striker of JSK's 1980s dynasty and a fixture of the Algeria national team, part of the 1986 World Cup squad.", fr: "Attaquant prolifique de la dynastie JSK des années 1980 et pilier de la sélection algérienne, membre de l'effectif du Mondial 1986.", ar: "مهاجم غزير الإنتاج في سلالة الشبيبة الثمانينية وعمود ثابت في المنتخب الجزائري ضمن تشكيلة مونديال 1986." } },
    { id: "p-menad", name: { en: "Djamel Menad", fr: "Djamel Menad", ar: "جمال مناد" }, position: { en: "Forward", fr: "Attaquant", ar: "مهاجم" }, years: "late 1980s–1990s",
      bio: { en: "Powerful forward and Algeria international; top scorer of the 1990 Africa Cup of Nations won by Algeria on home soil.", fr: "Attaquant puissant et international algérien ; meilleur buteur de la CAN 1990 remportée par l'Algérie à domicile.", ar: "مهاجم قوي ودولي جزائري؛ هدّاف كأس أفريقيا 1990 التي فازت بها الجزائر على أرضها." } },
    { id: "p-fergani", name: { en: "Ali Fergani", fr: "Ali Fergani", ar: "علي فرقاني" }, position: { en: "Midfielder / Captain", fr: "Milieu / Capitaine", ar: "لاعب وسط / قائد" }, years: "1970s–1980s",
      bio: { en: "Long-serving captain of the 1970s–80s golden era and captain of Algeria at the 1982 World Cup.", fr: "Capitaine emblématique de l'ère dorée des années 1970–80 et capitaine de l'Algérie au Mondial 1982.", ar: "قائد جيل الشبيبة الذهبي في السبعينيات والثمانينيات وقائد المنتخب الجزائري في مونديال 1982." } },
    { id: "p-oudjani", name: { en: "Chérif Oudjani", fr: "Chérif Oudjani", ar: "شريف وجاني" }, position: { en: "Forward", fr: "Attaquant", ar: "مهاجم" }, years: "late 1980s–1990s",
      bio: { en: "Scored the decisive goal in the 1990 African Cup of Champions Clubs run and helped Algeria win the 1990 Africa Cup of Nations.", fr: "Auteur du but décisif dans le parcours de la Coupe d'Afrique des Clubs Champions 1990 et champion d'Afrique des nations 1990 avec l'Algérie.", ar: "صاحب الهدف الحاسم في مشوار كأس أفريقيا للأندية البطلة 1990 وبطل أفريقيا مع المنتخب سنة 1990." } },
  ],

  coaches: [
    { id: "c-khalef", name: { en: "Mahieddine Khalef", fr: "Mahieddine Khalef", ar: "محي الدين خلف" }, years: "1970s–1980s (multiple spells)",
      bio: { en: "The architect of JSK's golden era. Built a disciplined, technically refined side that dominated Algerian football and lifted the 1981 African Cup of Champions Clubs.", fr: "L'architecte de l'ère dorée de la JSK. A bâti une équipe disciplinée et techniquement raffinée qui a dominé le football algérien et remporté la Coupe d'Afrique des Clubs Champions 1981.", ar: "مهندس العصر الذهبي للشبيبة. بنى فريقاً منظماً ومتقن الأداء هيمن على الكرة الجزائرية وتوّج بكأس أفريقيا للأندية البطلة 1981." },
      philosophy: { en: "Collective possession, positional discipline, home-grown identity.", fr: "Possession collective, discipline de poste, identité formée au club.", ar: "استحواذ جماعي، انضباط تكتيكي، وهوية مصنوعة داخل النادي." },
      achievements: [{ en: "Multiple Algerian league titles; 1981 African Cup of Champions Clubs.", fr: "Plusieurs titres de champion d'Algérie ; Coupe d'Afrique des Clubs Champions 1981.", ar: "عدة ألقاب محلية؛ كأس أفريقيا للأندية البطلة 1981." }] },
    { id: "c-lemoui", name: { en: "Kamel Lemoui", fr: "Kamel Lemoui", ar: "كمال لموي" }, years: "1980s (spells)",
      bio: { en: "Continued Khalef's tactical school through the 1980s title runs.", fr: "A poursuivi l'école tactique de Khalef durant les campagnes titrées des années 1980.", ar: "واصل مدرسة خلف التكتيكية في حقبة الثمانينيات." } },
  ],

  historicMatches: [
    { id: "hm-caf-1981", year: 1981, title: { en: "African Cup of Champions Clubs Final 1981 vs AS Vita Club", fr: "Finale de la Coupe d'Afrique des Clubs Champions 1981 vs AS Vita Club", ar: "نهائي كأس أفريقيا للأندية البطلة 1981 أمام أ.س. فيتا" },
      summary: { en: "JSK's historic first continental title, taken over two legs against DR Congo's AS Vita Club.", fr: "Premier titre continental historique de la JSK, remporté en deux manches contre l'AS Vita Club de RD Congo.", ar: "أول لقب قاري تاريخي للشبيبة، انتُزع من فيتا كلوب الكونغولي في مباراتين." } },
    { id: "hm-caf-1990", year: 1990, title: { en: "African Cup of Champions Clubs Final 1990 vs Nkana", fr: "Finale de la Coupe d'Afrique des Clubs Champions 1990 vs Nkana", ar: "نهائي كأس أفريقيا للأندية البطلة 1990 أمام نكانا" },
      summary: { en: "Second continental crown, decided on tie-breaking rules against Zambia's Nkana FC.", fr: "Deuxième sacre continental, décidé aux règles de départage contre les Zambiens de Nkana.", ar: "لقب قاري ثانٍ حُسم بقواعد التعادل أمام نكانا الزامبي." } },
    { id: "hm-cafcup-2002", year: 2002, title: { en: "CAF Cup Final 2002 — third consecutive title", fr: "Finale de la Coupe de la CAF 2002 — troisième titre consécutif", ar: "نهائي كأس الكاف 2002 — ثالث لقب متتالٍ" },
      summary: { en: "Completed an unprecedented three-in-a-row in the CAF Cup, a competition record.", fr: "Un triplé inédit en Coupe de la CAF, record de la compétition.", ar: "إنجاز ثلاثية غير مسبوقة في كأس الكاف، رقم قياسي في البطولة." } },
  ],

  stadiums: [
    { id: "s-1er-nov", name: { en: "Stade du 1er Novembre 1954", fr: "Stade du 1er Novembre 1954", ar: "ملعب أول نوفمبر 1954" }, city: { en: "Tizi Ouzou", fr: "Tizi Ouzou", ar: "تيزي وزو" }, capacity: "~20,000", built: "late 1970s",
      bio: { en: "The historic home of JS Kabylie for decades. Named after the date of the outbreak of the Algerian War of Independence, the ground has hosted every era of the club's success.", fr: "Le domicile historique de la JS Kabylie pendant des décennies. Nommé d'après la date du déclenchement de la Guerre d'indépendance algérienne, il a accueilli toutes les époques du succès du club.", ar: "المعقل التاريخي لشبيبة القبائل لعقود. سُمّي على تاريخ اندلاع حرب التحرير الجزائرية، واحتضن كل حقبات مجد النادي." },
      historicMatches: [{ en: "Home legs of the 1981 and 1990 African Cup of Champions Clubs runs.", fr: "Manches à domicile des campagnes 1981 et 1990 de la Coupe d'Afrique des Clubs Champions.", ar: "مباريات الذهاب/الإياب في مشواري 1981 و1990 القاريَين." }] },
    { id: "s-hocine", name: { en: "Hocine Aït Ahmed Stadium", fr: "Stade Hocine Aït Ahmed", ar: "ملعب حسين آيت أحمد" }, city: { en: "Tizi Ouzou (Boukhalfa)", fr: "Tizi Ouzou (Boukhalfa)", ar: "تيزي وزو (بوخالفة)" }, capacity: "~50,000", built: "2010s–2020s",
      bio: { en: "A new national stadium in the Boukhalfa area, named after Hocine Aït Ahmed, the historic leader from Kabylie. Inaugurated in the 2020s and expected to become a modern home for major JSK and Algeria fixtures.", fr: "Nouveau stade national dans la zone de Boukhalfa, nommé d'après Hocine Aït Ahmed, figure historique de Kabylie. Inauguré dans les années 2020, il est appelé à devenir un domicile moderne pour les grands rendez-vous de la JSK et de l'Algérie.", ar: "ملعب وطني جديد بمنطقة بوخالفة، سُمّي على اسم حسين آيت أحمد الزعيم التاريخي من منطقة القبائل. افتُتح في العقد الثاني من الألفية الثالثة ومرشح ليكون معقلاً حديثاً لأهم مباريات الشبيبة والمنتخب." } },
  ],

  culture: {
    intro: {
      en: "JSK's supporters — from the terraces of Tizi Ouzou to the Kabyle diaspora — turn every match day into a celebration of Amazigh identity, memory and endurance.",
      fr: "Les supporters de la JSK — des tribunes de Tizi Ouzou à la diaspora kabyle — font de chaque jour de match une célébration de l'identité, de la mémoire et de la ténacité amazighes.",
      ar: "جماهير الشبيبة — من مدرجات تيزي وزو إلى الشتات القبائلي — تحوّل كل يوم مباراة إلى احتفاء بالهوية والذاكرة والصبر الأمازيغي.",
    },
    entries: [
      { id: "cu-anthem", title: { en: "Yellow-and-green sea", fr: "Marée jaune et verte", ar: "موجة صفراء وخضراء" }, body: { en: "Home stands are a wall of yellow and green flags, scarves and tifos, often carrying the Amazigh letter ⵣ (yaz).", fr: "Les tribunes à domicile forment un mur de drapeaux, d'écharpes et de tifos jaunes et verts, portant souvent la lettre amazighe ⵣ (yaz).", ar: "تتحول المدرجات في المباريات المنزلية إلى جدار من الأعلام والأوشحة والتيفوهات الصفراء والخضراء، تحمل غالباً حرف ⵣ (ياز) الأمازيغي." } },
      { id: "cu-chants", title: { en: "Chants in Kabyle", fr: "Chants en kabyle", ar: "أهازيج بالقبائلية" }, body: { en: "Traditional and contemporary Kabyle songs are woven into the terrace repertoire, giving JSK a distinctive musical identity.", fr: "Chants kabyles traditionnels et contemporains s'entrelacent dans le répertoire des tribunes, donnant à la JSK une identité musicale singulière.", ar: "تمتزج الأغاني القبائلية التقليدية والمعاصرة في ذخيرة المدرجات، ما يمنح الشبيبة هوية موسيقية فريدة." } },
      { id: "cu-diaspora", title: { en: "A global following", fr: "Une communauté mondiale", ar: "جمهور عالمي" }, body: { en: "The Kabyle diaspora in France, Canada and beyond keeps JSK visible far from Tizi Ouzou, gathering to watch African finals wherever they live.", fr: "La diaspora kabyle en France, au Canada et ailleurs entretient la visibilité de la JSK loin de Tizi Ouzou, se réunissant pour suivre les finales africaines.", ar: "يُبقي الشتات القبائلي في فرنسا وكندا وسواهما اسم الشبيبة حاضراً بعيداً عن تيزي وزو، عبر التجمعات لمتابعة النهائيات الأفريقية." } },
    ],
  },

  jerseys: [
    { id: "j-1970s", decade: "1970s", title: { en: "Founding-era classic", fr: "Classique des débuts", ar: "كلاسيكية البدايات" }, colors: { primary: "#f7c948", secondary: "#0a6b3a" }, notes: { en: "Yellow shirt, green shorts. The look worn as the club won its first national titles.", fr: "Maillot jaune, short vert. La tenue portée lors des premiers titres nationaux.", ar: "قميص أصفر وسروال أخضر. الطاقم الذي رافق أول الألقاب المحلية." } },
    { id: "j-1980s", decade: "1980s", title: { en: "African champions era", fr: "Ère des champions d'Afrique", ar: "حقبة أبطال أفريقيا" }, colors: { primary: "#f7c948", secondary: "#0a6b3a" }, notes: { en: "Worn during the 1981 continental triumph and the 1980s league dynasty.", fr: "Portée lors du triomphe continental 1981 et de la dynastie des années 1980.", ar: "ارتُدي خلال التتويج القاري 1981 وسلالة الثمانينيات المحلية." } },
    { id: "j-1990s", decade: "1990s", title: { en: "Restored JSK badge", fr: "Retour du blason JSK", ar: "عودة شعار JSK" }, colors: { primary: "#f7c948", secondary: "#0a6b3a" }, notes: { en: "Following the 1989 return of the JSK name, the crest is redesigned around the classic yellow-and-green identity.", fr: "Après le retour du nom JSK en 1989, l'écusson est redessiné autour de l'identité classique jaune et verte.", ar: "بعد عودة اسم JSK عام 1989، أُعيد تصميم الشعار حول الهوية الكلاسيكية الصفراء والخضراء." } },
    { id: "j-2000s", decade: "2000s", title: { en: "CAF Cup three-peat kit", fr: "Maillot du triplé Coupe de la CAF", ar: "قميص ثلاثية كأس الكاف" }, colors: { primary: "#f7c948", secondary: "#0a6b3a" }, notes: { en: "Worn during the 2000, 2001 and 2002 CAF Cup runs.", fr: "Porté lors des campagnes Coupe de la CAF 2000, 2001 et 2002.", ar: "ارتُدي خلال ثلاثية كأس الكاف 2000 و2001 و2002." } },
    { id: "j-modern", decade: "2010s–2020s", title: { en: "Modern era", fr: "Ère moderne", ar: "الحقبة الحديثة" }, colors: { primary: "#f7c948", secondary: "#0a6b3a" }, notes: { en: "Contemporary technical fabrics; the yellow-and-green identity is preserved intact.", fr: "Tissus techniques contemporains ; l'identité jaune et verte est intégralement préservée.", ar: "أقمشة تقنية معاصرة مع الحفاظ على الهوية الصفراء والخضراء بالكامل." } },
  ],

  archive: [
    { id: "ar-caf-1981", kind: "programme", title: { en: "African Champions 1981 — commemorative programme", fr: "Champion d'Afrique 1981 — programme commémoratif", ar: "بطل أفريقيا 1981 — كتيّب تذكاري" }, year: 1981, description: { en: "Programme booklet marking JSK's first African Cup of Champions Clubs.", fr: "Programme marquant la première Coupe d'Afrique des Clubs Champions de la JSK.", ar: "كتيّب تذكاري لأول تتويج قاري للشبيبة." }, source: { en: "Reference: CAF and Algerian press archives.", fr: "Référence : archives CAF et presse algérienne.", ar: "المرجع: أرشيف الكاف والصحافة الجزائرية." } },
    { id: "ar-cafcup-2002", kind: "newspaper", title: { en: "CAF Cup three-peat — 2002 front pages", fr: "Triplé Coupe de la CAF — Unes de 2002", ar: "ثلاثية كأس الكاف — عناوين 2002" }, year: 2002, description: { en: "Algerian sports press coverage of the record third consecutive CAF Cup.", fr: "Couverture de la presse sportive algérienne du troisième sacre consécutif en Coupe de la CAF.", ar: "تغطية الصحافة الرياضية الجزائرية للقب الثالث المتتالي في كأس الكاف." } },
    { id: "ar-stade", kind: "photograph", title: { en: "Stade du 1er Novembre 1954 — full house", fr: "Stade du 1er Novembre 1954 — plein à craquer", ar: "ملعب أول نوفمبر 1954 — ملعب ممتلئ" }, description: { en: "Archival photograph of the home ground during a major continental match night.", fr: "Photographie d'archives du stade lors d'une grande soirée continentale.", ar: "صورة أرشيفية للملعب في ليلة قارية كبرى." } },
    { id: "ar-tifo", kind: "photograph", title: { en: "Yellow-and-green tifo", fr: "Tifo jaune et vert", ar: "تيفو أصفر وأخضر" }, description: { en: "Supporters' choreography combining the JSK colours and the Amazigh letter ⵣ.", fr: "Chorégraphie des supporters combinant les couleurs de la JSK et la lettre amazighe ⵣ.", ar: "لوحة جماهيرية تجمع بين ألوان الشبيبة وحرف ⵣ الأمازيغي." } },
    { id: "ar-1946", kind: "memorabilia", title: { en: "1946 founding pennant (reproduction)", fr: "Fanion de fondation 1946 (reproduction)", ar: "شارة التأسيس 1946 (نسخة تذكارية)" }, year: 1946, description: { en: "Reproduction pennant marking the club's foundation year.", fr: "Fanion reproduction marquant l'année de fondation du club.", ar: "شارة تذكارية تخلّد سنة تأسيس النادي." } },
  ],

  stats: {
    intro: {
      en: "Verified honours totals. Individual appearance and goal records vary across sources; only totals confirmed by widely-cited references are shown.",
      fr: "Palmarès officiels vérifiés. Les statistiques individuelles d'apparitions et de buts varient selon les sources ; seuls les totaux confirmés par des références largement citées sont affichés.",
      ar: "الأرقام مؤكدة للألقاب. تختلف مصادر الإحصاءات الفردية للمشاركات والأهداف؛ لا يُعرض إلا ما أكّدته مراجع واسعة الاعتماد.",
    },
    records: [
      { id: "st-league", label: { en: "Algerian league titles", fr: "Titres de champion d'Algérie", ar: "ألقاب الدوري الجزائري" }, value: { en: "14 (record)", fr: "14 (record)", ar: "14 (رقم قياسي)" } },
      { id: "st-cup", label: { en: "Algerian Cup", fr: "Coupe d'Algérie", ar: "كأس الجزائر" }, value: { en: "5", fr: "5", ar: "5" } },
      { id: "st-caf-cl", label: { en: "African Cup of Champions Clubs", fr: "Coupe d'Afrique des Clubs Champions", ar: "كأس أفريقيا للأندية البطلة" }, value: { en: "2 (1981, 1990)", fr: "2 (1981, 1990)", ar: "2 (1981، 1990)" } },
      { id: "st-cwc", label: { en: "African Cup Winners' Cup", fr: "Coupe d'Afrique des vainqueurs de coupe", ar: "كأس الكؤوس الأفريقية" }, value: { en: "1 (1995)", fr: "1 (1995)", ar: "1 (1995)" } },
      { id: "st-cafcup", label: { en: "CAF Cup", fr: "Coupe de la CAF", ar: "كأس الكاف" }, value: { en: "3 (2000, 2001, 2002) — competition record", fr: "3 (2000, 2001, 2002) — record de la compétition", ar: "3 (2000، 2001، 2002) — رقم قياسي في البطولة" } },
      { id: "st-supercup", label: { en: "Algerian Super Cup", fr: "Supercoupe d'Algérie", ar: "كأس السوبر الجزائرية" }, value: { en: "1 (1992)", fr: "1 (1992)", ar: "1 (1992)" } },
      { id: "st-continental-total", label: { en: "Total major continental trophies", fr: "Total des trophées continentaux majeurs", ar: "إجمالي الألقاب القارية الكبرى" }, value: { en: "6 (most of any Algerian club)", fr: "6 (le plus grand total pour un club algérien)", ar: "6 (الأعلى بين الأندية الجزائرية)" } },
    ],
  },

  quiz: [
    { id: "q1", q: { en: "In what year was JS Kabylie founded?", fr: "En quelle année la JS Kabylie a-t-elle été fondée ?", ar: "في أي سنة تأسست شبيبة القبائل؟" }, choices: [
      { en: "1932", fr: "1932", ar: "1932" }, { en: "1946", fr: "1946", ar: "1946" }, { en: "1962", fr: "1962", ar: "1962" }, { en: "1977", fr: "1977", ar: "1977" }
    ], answerIndex: 1, explain: { en: "The club was founded on 1 July 1946 in Tizi Ouzou.", fr: "Le club a été fondé le 1er juillet 1946 à Tizi Ouzou.", ar: "تأسس النادي في 1 جويلية 1946 بتيزي وزو." } },
    { id: "q2", q: { en: "How many African Cup of Champions Clubs has JSK won?", fr: "Combien de Coupes d'Afrique des Clubs Champions la JSK a-t-elle remportées ?", ar: "كم مرة فازت شبيبة القبائل بكأس أفريقيا للأندية البطلة؟" }, choices: [
      { en: "1", fr: "1", ar: "1" }, { en: "2", fr: "2", ar: "2" }, { en: "3", fr: "3", ar: "3" }, { en: "4", fr: "4", ar: "4" }
    ], answerIndex: 1, explain: { en: "Two — 1981 and 1990.", fr: "Deux — 1981 et 1990.", ar: "مرتان — 1981 و1990." } },
    { id: "q3", q: { en: "Which CAF Cup years form JSK's record three-peat?", fr: "Quelles années de Coupe de la CAF forment le triplé record de la JSK ?", ar: "أي سنوات كأس الكاف تشكّل ثلاثية الشبيبة القياسية؟" }, choices: [
      { en: "1998–2000", fr: "1998–2000", ar: "1998–2000" }, { en: "2000–2002", fr: "2000–2002", ar: "2000–2002" }, { en: "2001–2003", fr: "2001–2003", ar: "2001–2003" }, { en: "2003–2005", fr: "2003–2005", ar: "2003–2005" }
    ], answerIndex: 1 },
    { id: "q4", q: { en: "What name did the club carry between 1977 and 1989?", fr: "Quel nom le club portait-il entre 1977 et 1989 ?", ar: "ما الاسم الذي حمله النادي بين 1977 و1989؟" }, choices: [
      { en: "USK Tizi Ouzou", fr: "USK Tizi Ouzou", ar: "USK تيزي وزو" }, { en: "JE Tizi‑Ouzou / JET", fr: "JE Tizi‑Ouzou / JET", ar: "JE Tizi‑Ouzou / JET" }, { en: "MC Tizi Ouzou", fr: "MC Tizi Ouzou", ar: "MC تيزي وزو" }, { en: "AS Kabylie", fr: "AS Kabylie", ar: "AS Kabylie" }
    ], answerIndex: 1, explain: { en: "The 1977 reform renamed the club JET / JE Tizi‑Ouzou until the JSK name was restored in 1989.", fr: "La réforme de 1977 renomma le club JET / JE Tizi‑Ouzou jusqu'au rétablissement du nom JSK en 1989.", ar: "أعادت إصلاحات 1977 تسميته إلى JET / JE Tizi‑Ouzou حتى استعادة اسم JSK عام 1989." } },
    { id: "q5", q: { en: "Which stadium is the historic home of JSK?", fr: "Quel stade est le domicile historique de la JSK ?", ar: "أي ملعب هو المعقل التاريخي للشبيبة؟" }, choices: [
      { en: "Stade du 5 Juillet", fr: "Stade du 5 Juillet", ar: "ملعب 5 جويلية" }, { en: "Stade du 1er Novembre 1954", fr: "Stade du 1er Novembre 1954", ar: "ملعب أول نوفمبر 1954" }, { en: "Stade Mustapha Tchaker", fr: "Stade Mustapha Tchaker", ar: "ملعب مصطفى تشاكر" }, { en: "Stade 19 Mai 1956", fr: "Stade 19 Mai 1956", ar: "ملعب 19 ماي 1956" }
    ], answerIndex: 1 },
  ],

  sources: [
    { en: "Confédération Africaine de Football (CAF) — club honours and continental competition archives.", fr: "Confédération Africaine de Football (CAF) — palmarès du club et archives des compétitions continentales.", ar: "الاتحاد الأفريقي لكرة القدم (الكاف) — سجلات الألقاب والمنافسات القارية." },
    { en: "RSSSF (Rec.Sport.Soccer Statistics Foundation) — Algerian league and cup archives.", fr: "RSSSF — archives de la Ligue et de la Coupe d'Algérie.", ar: "RSSSF — أرشيف الدوري والكأس الجزائريين." },
    { en: "Official JS Kabylie communications and Algerian press coverage (Liberté, El Watan, El Heddaf).", fr: "Communications officielles de la JS Kabylie et presse algérienne (Liberté, El Watan, El Heddaf).", ar: "بلاغات نادي شبيبة القبائل الرسمية وصحافة جزائرية (ليبرتي، الوطن، الهدّاف)." },
    { en: "Where individual leg scores of continental finals differ between sources, the entry is marked with a note.", fr: "Lorsque les scores des manches de finales continentales diffèrent selon les sources, l'entrée est marquée d'une note.", ar: "عند اختلاف مصادر النتائج الجزئية للنهائيات القارية، تُدرج ملاحظة توضيحية." },
  ],
};

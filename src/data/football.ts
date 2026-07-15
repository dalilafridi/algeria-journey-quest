/**
 * The Hall of Algerian Football — museum data.
 *
 * Kept as a single, curated source of truth for every exhibit in the wing:
 * origins, national team, FLN team, World Cups, AFCON, legends, coaches,
 * stadiums, famous matches, culture, trophies, statistics, and memorabilia.
 *
 * All fields are optional-friendly so the route degrades gracefully if the
 * curator later trims a section. Copy is trilingual where it matters most
 * (headings, subtitles); long-form paragraphs stay in English for brevity —
 * consistent with the rest of the museum's copy authoring pattern.
 */

import type { LocalizedString } from "@/lib/i18n";

export type FootballExhibitId =
  | "origins"
  | "national-team"
  | "fln-team"
  | "world-cup"
  | "gijon"
  | "afcon"
  | "legends"
  | "coaches"
  | "stadiums"
  | "matches"
  | "culture"
  | "trophies"
  | "stats"
  | "memories"
  | "timeline";

export type FootballExhibit = {
  id: FootballExhibitId;
  emblem: string; // single-glyph engraving for the medallion
  title: LocalizedString;
  subtitle: LocalizedString;
  intro: LocalizedString;
};

export const FOOTBALL_EXHIBITS: FootballExhibit[] = [
  {
    id: "origins",
    emblem: "⚔",
    title: { en: "Origins", fr: "Origines", ar: "الأصول" },
    subtitle: {
      en: "Football, colonial rule, and quiet resistance",
      fr: "Le football, la colonisation et une résistance discrète",
      ar: "كرة القدم، الاستعمار، ومقاومة هادئة",
    },
    intro: {
      en: "Football arrived in Algeria in the early 1900s carried by French settlers and sailors along the Mediterranean coast. Within two decades it had slipped its colonial frame — Muslim clubs stitched their own crests, their own colours, and their own quiet politics.",
      fr: "Le football arrive en Algérie au début du XXᵉ siècle, porté par les colons et les marins français le long du littoral. En deux décennies, il échappe à son cadre colonial — les clubs musulmans brodent leurs propres écussons, leurs couleurs et une politique discrète.",
      ar: "وصلت كرة القدم إلى الجزائر في مطلع القرن العشرين مع المستوطنين والبحّارة الفرنسيين على طول الساحل المتوسطي. خلال عقدين أفلتت من إطارها الاستعماري لتُنسج ألوان النوادي المسلمة وشاراتها.",
    },
  },
  {
    id: "national-team",
    emblem: "★",
    title: { en: "Birth of the National Team", fr: "Naissance de la sélection", ar: "ميلاد المنتخب" },
    subtitle: {
      en: "1962–1963 · a nation puts on its first jersey",
      fr: "1962–1963 · une nation enfile son premier maillot",
      ar: "١٩٦٢–١٩٦٣ · أمّة ترتدي أول قميص لها",
    },
    intro: {
      en: "In the year of independence, Algeria assembled its first officially sanctioned national team. The green-and-white took the pitch as a young republic still finding its borders on paper — and its identity in front of a stadium full of witnesses.",
      fr: "L’année de l’indépendance, l’Algérie assemble sa première équipe nationale officielle. Le vert-et-blanc entre en scène tandis que la jeune république se cherche encore, sur le papier comme devant des tribunes pleines.",
      ar: "في عام الاستقلال، جمعت الجزائر أوّل منتخب وطني معترف به رسميًا. دخل الأخضر والأبيض الملعب بينما لا تزال الجمهورية الفتيّة ترسم حدودها على الورق وهويتها أمام جمهور شاهد.",
    },
  },
  {
    id: "fln-team",
    emblem: "✦",
    title: { en: "The FLN Team", fr: "L’Équipe du FLN", ar: "منتخب جبهة التحرير" },
    subtitle: {
      en: "1958–1962 · the football team that fought for a country",
      fr: "1958–1962 · l’équipe qui a joué pour un pays à naître",
      ar: "١٩٥٨–١٩٦٢ · فريق كرة قدم في خدمة وطن يولد",
    },
    intro: {
      en: "In April 1958 nine professional players walked out of French clubs at the peak of their careers and boarded a train for Tunis. There, under the FLN’s green banner, they became a football team, a diplomatic mission and a moving symbol — all at once.",
      fr: "En avril 1958, neuf professionnels quittent leurs clubs français au sommet de leur carrière et prennent le train pour Tunis. Sous la bannière verte du FLN, ils deviennent à la fois équipe, mission diplomatique et symbole itinérant.",
      ar: "في أفريل ١٩٥٨ غادر تسعة محترفين أنديتهم الفرنسية في أوج مسيرتهم وامتطوا قطارًا إلى تونس. تحت الراية الخضراء لجبهة التحرير صاروا فريقًا وبعثة دبلوماسية ورمزًا متنقّلًا في آنٍ واحد.",
    },
  },
  {
    id: "world-cup",
    emblem: "◈",
    title: { en: "Algeria at the World Cup", fr: "L’Algérie en Coupe du monde", ar: "الجزائر في كأس العالم" },
    subtitle: {
      en: "1982 · 1986 · 2010 · 2014 · 2026",
      fr: "1982 · 1986 · 2010 · 2014 · 2026",
      ar: "١٩٨٢ · ١٩٨٦ · ٢٠١٠ · ٢٠١٤ · ٢٠٢٦",
    },
    intro: {
      en: "Five appearances, one continent held in suspense. Algeria’s World Cup story runs from the shock of Gijón to the sixteenth minute of Porto Alegre — a full arc of ambition, heartbreak, and hard-won respect.",
      fr: "Cinq participations, un continent en apnée. L’histoire mondiale de l’Algérie va du choc de Gijón à la seizième minute de Porto Alegre — un arc entier d’ambition, de peine et de respect gagné.",
      ar: "خمس مشاركات وقارّة حابسة أنفاسها. تمتد قصة الجزائر في المونديال من صدمة خيخون إلى الدقيقة السادسة عشرة في بورتو أليغري — قوسٌ كامل من الطموح والألم والاحترام المكتسب.",
    },
  },
  {
    id: "gijon",
    emblem: "◇",
    title: { en: "The Shame of Gijón", fr: "La Honte de Gijón", ar: "فضيحة خيخون" },
    subtitle: {
      en: "25 June 1982 · why football finals now play simultaneously",
      fr: "25 juin 1982 · pourquoi les derniers matchs de poule se jouent en même temps",
      ar: "٢٥ جوان ١٩٨٢ · لماذا تُلعب المباريات الأخيرة في وقت واحد",
    },
    intro: {
      en: "On the final day of Group 2, West Germany and Austria knew exactly which scoreline would eliminate Algeria — and played to it. The world watched a match without a contest. FIFA’s response would reshape every group stage that followed.",
      fr: "Le dernier jour du groupe 2, la RFA et l’Autriche connaissent exactement le score qui éliminera l’Algérie — et le jouent. Le monde regarde un match sans opposition. La réponse de la FIFA redessinera toutes les phases de groupes à venir.",
      ar: "في اليوم الأخير من المجموعة الثانية، عرفت ألمانيا الغربية والنمسا النتيجة التي تُقصي الجزائر — ولعبتاها. تابع العالم مباراة بلا منافسة. جواب الفيفا سيُعيد رسم كل دور مجموعات لاحق.",
    },
  },
  {
    id: "afcon",
    emblem: "♛",
    title: { en: "AFCON History", fr: "Histoire de la CAN", ar: "تاريخ كأس أمم إفريقيا" },
    subtitle: {
      en: "Two stars · nineteen tournaments · one continental home",
      fr: "Deux étoiles · dix-neuf tournois · un continent-maison",
      ar: "نجمتان · تسعة عشر عرسًا · قارّة واحدة",
    },
    intro: {
      en: "The Africa Cup of Nations is where Algeria plays as itself. From the golden generation of 1990 in Algiers to Belmadi’s champions in Cairo, the AFCON tells a longer, more familiar story than any World Cup ever could.",
      fr: "La Coupe d’Afrique des Nations est la scène naturelle de l’Algérie. De la génération dorée de 1990 à Alger aux champions de Belmadi au Caire, la CAN raconte une histoire plus longue et plus intime que n’importe quel Mondial.",
      ar: "كأس أمم إفريقيا هو المسرح الطبيعي للجزائر. من جيل ١٩٩٠ الذهبي في الجزائر إلى أبطال بلماضي في القاهرة، تروي «الكان» قصّة أطول وأكثر ألفة من أي مونديال.",
    },
  },
  {
    id: "legends",
    emblem: "❖",
    title: { en: "Hall of Legends", fr: "Panthéon", ar: "قاعة الأساطير" },
    subtitle: {
      en: "The players who wrote the anthem",
      fr: "Les joueurs qui ont écrit l’hymne",
      ar: "اللاعبون الذين كتبوا النشيد",
    },
    intro: {
      en: "A gallery of the players whose gestures, goals and gravity became national memory — from Mekhloufi’s exile to Mahrez’s corner-kick in Cotonou.",
      fr: "Une galerie des joueurs dont les gestes, les buts et la présence sont devenus mémoire nationale — de l’exil de Mekhloufi au corner de Mahrez à Cotonou.",
      ar: "معرض للاعبين تحوّلت لمساتهم وأهدافهم وحضورهم إلى ذاكرة وطنية — من منفى مخلوفي إلى ركنيّة محرز في كوتونو.",
    },
  },
  {
    id: "coaches",
    emblem: "▲",
    title: { en: "Greatest Coaches", fr: "Grands entraîneurs", ar: "أعظم المدرّبين" },
    subtitle: {
      en: "The tacticians who shaped the green shirt",
      fr: "Les tacticiens qui ont façonné le maillot vert",
      ar: "مهندسو القميص الأخضر",
    },
    intro: {
      en: "From Kermali’s calm continental blueprint to Belmadi’s unbeaten run, the men on the touchline have carried as much of the story as the men on the pitch.",
      fr: "De la sérénité continentale de Kermali à la série d’invincibilité de Belmadi, les hommes du banc ont porté autant l’histoire que ceux du terrain.",
      ar: "من هدوء كرمالي القاري إلى سلسلة بلماضي التي لا تُقهر، حمل رجال المقاعد نصيبهم من الحكاية بقدر ما حمله رجال الميدان.",
    },
  },
  {
    id: "stadiums",
    emblem: "▣",
    title: { en: "Iconic Stadiums", fr: "Stades emblématiques", ar: "ملاعب أيقونية" },
    subtitle: {
      en: "Concrete cathedrals of Algerian football",
      fr: "Cathédrales de béton du football algérien",
      ar: "كاتدرائيات إسمنتيّة لكرة القدم الجزائرية",
    },
    intro: {
      en: "Every anthem, every trophy lift, every last-minute equaliser is remembered by the stones that heard it first.",
      fr: "Chaque hymne, chaque trophée levé, chaque égalisation à la dernière seconde est gardé par les pierres qui l’ont entendu en premier.",
      ar: "كلّ نشيد، كلّ لقب مرفوع، كلّ هدف تعادل في الرمق الأخير تحفظه الحجارة التي سمعته أوّلًا.",
    },
  },
  {
    id: "matches",
    emblem: "✕",
    title: { en: "Famous Matches", fr: "Matchs légendaires", ar: "مباريات خالدة" },
    subtitle: {
      en: "Ninety minutes that changed a country",
      fr: "Quatre-vingt-dix minutes qui ont changé un pays",
      ar: "تسعون دقيقة غيّرت وطنًا",
    },
    intro: {
      en: "A handful of games that no Algerian will describe with statistics alone — the scoreline is always followed by where you were when it happened.",
      fr: "Quelques matchs qu’aucun Algérien ne décrit avec de simples chiffres — le score est toujours suivi de « j’étais où quand c’est arrivé ».",
      ar: "حفنة مباريات لا يصفها جزائريّ بالأرقام وحدها — النتيجة تتبعها دائمًا عبارة «أين كنتَ حين وقع ذلك؟».",
    },
  },
  {
    id: "culture",
    emblem: "♪",
    title: { en: "Football Culture", fr: "Culture footballistique", ar: "ثقافة كرة القدم" },
    subtitle: {
      en: "Streets, chants, derbies, identity",
      fr: "Rues, chants, derbys, identité",
      ar: "الشوارع، الأهازيج، الديربيات، الهويّة",
    },
    intro: {
      en: "In Algeria the game lives outside the stadium too — in the cracked concrete of Bab El-Oued, in Kabyle drums, in ultras chants that travel across the Mediterranean and come back as protest anthems.",
      fr: "En Algérie le jeu vit aussi hors du stade — dans le béton fissuré de Bab El-Oued, dans les tambours kabyles, dans les chants d’ultras qui traversent la Méditerranée et reviennent en hymnes de rue.",
      ar: "في الجزائر تحيا اللعبة خارج الملعب أيضًا — في إسمنت باب الوادي المتشقّق، في طبول القبائل، في أهازيج الأولتراس التي تعبر المتوسط لتعود أناشيدَ شارعٍ.",
    },
  },
  {
    id: "trophies",
    emblem: "♕",
    title: { en: "Trophy Room", fr: "Salle des trophées", ar: "قاعة الألقاب" },
    subtitle: {
      en: "Silver, bronze, and the weight of continents",
      fr: "Argent, bronze, et le poids des continents",
      ar: "فضّة وبرونز وثقل القارّات",
    },
    intro: {
      en: "Hover a plaque to hear its story. Every trophy in this room was won under a different generation’s pressure — and remembered by all of them.",
      fr: "Approchez une plaque pour entendre son histoire. Chaque trophée exposé a été gagné sous la pression d’une génération — et gardé en mémoire par toutes les autres.",
      ar: "اقترب من اللوحة لتسمع قصّتها. كلّ كأس في هذه القاعة رُفع تحت ضغط جيل — واحتفظت به الأجيال كلّها.",
    },
  },
  {
    id: "stats",
    emblem: "∎",
    title: { en: "Statistics Center", fr: "Centre statistique", ar: "مركز الإحصاء" },
    subtitle: {
      en: "The numbers behind the anthem",
      fr: "Les chiffres derrière l’hymne",
      ar: "الأرقام خلف النشيد",
    },
    intro: {
      en: "Appearances, goals, qualification runs — the quiet ledger of a national side told in figures.",
      fr: "Sélections, buts, campagnes de qualification — le registre discret d’une sélection raconté en chiffres.",
      ar: "المشاركات، الأهداف، حملات التصفيات — سجلّ هادئ لمنتخب رُوي بالأرقام.",
    },
  },
  {
    id: "memories",
    emblem: "◉",
    title: { en: "Hall of Memories", fr: "Salle des souvenirs", ar: "قاعة الذكريات" },
    subtitle: {
      en: "Jerseys, tickets, and things that survived the match",
      fr: "Maillots, billets et objets qui ont survécu au match",
      ar: "قمصان، تذاكر، وأشياء نجت من المباراة",
    },
    intro: {
      en: "The small artifacts that never make the highlights reel — but that families kept in a drawer for forty years anyway.",
      fr: "Les petits objets qui n’entrent jamais dans les résumés — mais que les familles ont gardés au tiroir pendant quarante ans.",
      ar: "أشياء صغيرة لا تدخل ملخّصات المباريات — لكنّ العائلات احتفظت بها في الأدراج أربعين عامًا.",
    },
  },
  {
    id: "timeline",
    emblem: "⟶",
    title: { en: "Timeline", fr: "Chronologie", ar: "الخطّ الزمني" },
    subtitle: {
      en: "Scroll a century of Algerian football",
      fr: "Faire défiler un siècle de football algérien",
      ar: "تصفّح قرنًا من كرة القدم الجزائرية",
    },
    intro: {
      en: "One horizontal ribbon. Every era, tournament and figure in this hall placed where it belongs in the story.",
      fr: "Un ruban horizontal. Chaque époque, tournoi et figure de cette aile placés là où ils appartiennent au récit.",
      ar: "شريط أفقيّ واحد. كلّ حقبة وبطولة وشخصيّة في هذه القاعة، في مكانها من الحكاية.",
    },
  },
];

/* ---------- 1. Origins ---------- */

export type OriginClub = { year: number; club: string; city: string; note: string };

export const ORIGIN_CLUBS: OriginClub[] = [
  { year: 1897, club: "Club des Joyeusetés d’Oran", city: "Oran", note: "One of the first football-adjacent clubs on the coast, still European in composition." },
  { year: 1907, club: "Club Athlétique Liberté d’Oran", city: "Oran", note: "Early codified football under French league rules." },
  { year: 1921, club: "Mouloudia Club d’Alger (MCA)", city: "Algiers", note: "Founded by Muslim youth — green and red, the first Algerian-identified colours." },
  { year: 1926, club: "Union Sportive Musulmane de Blida (USMB)", city: "Blida", note: "‘Musulmane’ in the name — an open declaration of identity under colonial rule." },
  { year: 1927, club: "Union Sportive de la Médina d’Alger (USMA)", city: "Algiers", note: "Born in the Casbah; would become one of the great derby names." },
  { year: 1932, club: "Widad Athletic Club Tlemcen (WATL)", city: "Tlemcen", note: "One of the great western clubs; nursed generations of national players." },
  { year: 1936, club: "Jeunesse Sportive Kabylie (JSK)", city: "Tizi Ouzou", note: "Founded in the mountains — later Africa’s most-titled club." },
];

export const ORIGIN_TIMELINE: { year: string; label: LocalizedString }[] = [
  { year: "1897", label: { en: "First codified clubs form on the Oran coast.", fr: "Premiers clubs codifiés sur le littoral oranais.", ar: "أوّل النوادي المنظّمة على ساحل وهران." } },
  { year: "1921", label: { en: "Mouloudia founded in Algiers — the first Muslim-identified club.", fr: "Fondation du Mouloudia à Alger — premier club à identité musulmane.", ar: "تأسيس مولودية الجزائر — أوّل نادٍ بهويّة مسلمة." } },
  { year: "1928", label: { en: "The colonial authorities require a quota of ‘European’ players per team — clubs quietly defy it.", fr: "Les autorités imposent un quota de joueurs « européens » par équipe — les clubs le défient discrètement.", ar: "تفرض السلطات حصّة من اللاعبين «الأوروبيين» في كلّ فريق — والنوادي تتحدّاها بهدوء." } },
  { year: "1956", label: { en: "The FLN calls on Algerian players to leave French clubs.", fr: "Le FLN appelle les joueurs algériens à quitter les clubs français.", ar: "جبهة التحرير تدعو اللاعبين الجزائريين إلى مغادرة الأندية الفرنسية." } },
];

/* ---------- 2. National team ---------- */

export const NATIONAL_TEAM_MILESTONES: { date: string; title: LocalizedString; body: LocalizedString }[] = [
  {
    date: "5 July 1962",
    title: { en: "Independence", fr: "Indépendance", ar: "الاستقلال" },
    body: { en: "Algeria becomes independent. A football federation is one of the first sporting bodies to be officially constituted.", fr: "L’Algérie devient indépendante. Une fédération de football fait partie des premières institutions sportives créées.", ar: "تنال الجزائر استقلالها. الاتحاد الجزائري لكرة القدم من أوائل الهيئات الرياضية التي تُنشأ رسميًا." },
  },
  {
    date: "1 January 1963",
    title: { en: "First official match", fr: "Premier match officiel", ar: "أوّل مباراة رسميّة" },
    body: { en: "The green-and-white play Bulgaria in Algiers. A modest scoreline, an enormous line to enter the stadium.", fr: "Le vert-et-blanc affronte la Bulgarie à Alger. Score modeste, file gigantesque à l’entrée.", ar: "الأخضر والأبيض يواجه بلغاريا في الجزائر. نتيجة متواضعة وطابور طويل أمام الملعب." },
  },
  {
    date: "1964",
    title: { en: "First African campaign", fr: "Première campagne africaine", ar: "أوّل مشوار إفريقي" },
    body: { en: "Algeria enters CAF competitions and begins the long apprenticeship that will lead to the 1980s.", fr: "L’Algérie s’engage dans les compétitions de la CAF et commence l’apprentissage qui mène aux années 1980.", ar: "دخول الجزائر إلى مسابقات الكاف وبدء التدرّج الذي يقود إلى الثمانينيات." },
  },
  {
    date: "1968",
    title: { en: "First qualification effort", fr: "Première tentative de qualification", ar: "أوّل محاولة تأهّل" },
    body: { en: "Algeria enters World Cup qualifying for the first time. It will take another fourteen years to actually get there.", fr: "L’Algérie s’inscrit pour la première fois aux qualifications du Mondial. Il faudra encore quatorze ans.", ar: "أوّل تسجيل للجزائر في تصفيات المونديال. سيتطلّب الأمر أربعة عشر عامًا للوصول فعلًا." },
  },
];

/* ---------- 3. FLN Team ---------- */

export type FlnPlayer = { name: string; leftClub: string };
export const FLN_PLAYERS: FlnPlayer[] = [
  { name: "Rachid Mekhloufi", leftClub: "AS Saint-Étienne" },
  { name: "Mustapha Zitouni", leftClub: "AS Monaco" },
  { name: "Abdelaziz Ben Tifour", leftClub: "AS Monaco" },
  { name: "Mokhtar Arribi", leftClub: "SCO Angers" },
  { name: "Abderrahmane Boubekeur", leftClub: "AS Monaco" },
  { name: "Abdelhamid Zouba", leftClub: "OGC Nice" },
  { name: "Amar Rouaï", leftClub: "AS Angers" },
  { name: "Saïd Brahimi", leftClub: "Toulouse FC" },
  { name: "Hamid Kermali", leftClub: "Olympique Lyonnais" },
];

export const FLN_TOUR: { country: string; year: string }[] = [
  { country: "Tunisia", year: "1958" },
  { country: "Morocco", year: "1958" },
  { country: "Libya", year: "1958" },
  { country: "Egypt (UAR)", year: "1958–59" },
  { country: "Iraq", year: "1959" },
  { country: "Jordan", year: "1959" },
  { country: "Yugoslavia", year: "1959" },
  { country: "USSR", year: "1959" },
  { country: "Bulgaria", year: "1959" },
  { country: "Poland", year: "1959" },
  { country: "Hungary", year: "1959" },
  { country: "East Germany (GDR)", year: "1959" },
  { country: "Czechoslovakia", year: "1959" },
  { country: "China", year: "1959" },
  { country: "North Vietnam", year: "1960" },
];

export const FLN_LEGACY: LocalizedString = {
  en: "In four years the FLN team played close to eighty matches on four continents. FIFA refused to recognise any of them. Every player who left France sacrificed a European career at its peak — several never played professionally again. In 1963 they walked back into a free Algeria and became its first national team.",
  fr: "En quatre ans, l’équipe du FLN dispute près de quatre-vingts matchs sur quatre continents. La FIFA refuse de les reconnaître. Chaque joueur ayant quitté la France a sacrifié une carrière européenne à son sommet — plusieurs ne rejoueront jamais professionnellement. En 1963, ils rentrent dans une Algérie libre et deviennent sa première sélection.",
  ar: "خلال أربع سنوات لعب فريق جبهة التحرير قرابة ثمانين مباراة في أربع قارات. رفض الفيفا الاعتراف بأيّ منها. ضحّى كلّ لاعب غادر فرنسا بمسيرة أوروبية في أوجها — ولم يعد بعضهم إلى الاحتراف. عاد الفريق سنة ١٩٦٣ إلى جزائر حرّة ليكون أوّل منتخب لها.",
};

/* ---------- 4. World Cup ---------- */

export type WorldCupEdition = {
  year: number;
  host: string;
  coach: string;
  finish: LocalizedString;
  summary: LocalizedString;
  matches: { opp: string; result: string; note?: string }[];
  moment: LocalizedString;
};

export const WORLD_CUPS: WorldCupEdition[] = [
  {
    year: 1982,
    host: "Spain",
    coach: "Rachid Mekhloufi & Mahieddine Khalef",
    finish: { en: "Group stage", fr: "Phase de groupes", ar: "دور المجموعات" },
    summary: {
      en: "Algeria arrived as first-timers. Against West Germany they announced themselves to the world; against Chile, Salah Assad danced through defenders; against Austria they fell short. Then came Gijón.",
      fr: "L’Algérie débarque en novice. Face à la RFA elle se révèle au monde ; face au Chili, Salah Assad danse dans la défense ; face à l’Autriche elle s’incline. Puis vient Gijón.",
      ar: "وصلت الجزائر لأوّل مرّة. أمام ألمانيا الغربية أعلنت عن نفسها للعالم؛ أمام تشيلي رقص صلاح عصّاد بين المدافعين؛ وأمام النمسا انهزمت. ثمّ جاءت خيخون.",
    },
    matches: [
      { opp: "West Germany", result: "2–1", note: "Belloumi seals a historic upset" },
      { opp: "Austria", result: "0–2" },
      { opp: "Chile", result: "3–2", note: "Assad brace" },
    ],
    moment: {
      en: "Belloumi’s goal, 68th minute, against Rummenigge’s Germany — one of the great World Cup upsets.",
      fr: "But de Belloumi à la 68ᵉ face à la RFA de Rummenigge — l’un des grands exploits mondiaux.",
      ar: "هدف بلومي في الدقيقة ٦٨ في مرمى ألمانيا رومينيغه — من أعظم مفاجآت المونديال.",
    },
  },
  {
    year: 1986,
    host: "Mexico",
    coach: "Rabah Saâdane",
    finish: { en: "Group stage", fr: "Phase de groupes", ar: "دور المجموعات" },
    summary: {
      en: "A tougher tournament: a young side struggled with altitude, refereeing decisions and the weight of 1982 hanging over them.",
      fr: "Un tournoi plus rude : une jeune équipe compose avec l’altitude, l’arbitrage et le poids de 1982.",
      ar: "بطولة أقسى: منتخب فتيّ يواجه الارتفاع والتحكيم وظلّ ١٩٨٢.",
    },
    matches: [
      { opp: "Northern Ireland", result: "1–1" },
      { opp: "Brazil", result: "0–1" },
      { opp: "Spain", result: "0–3" },
    ],
    moment: {
      en: "Zidane Djamel’s equaliser against Northern Ireland — Algeria’s first ever World Cup point.",
      fr: "L’égalisation contre l’Irlande du Nord — premier point de l’Algérie en Coupe du monde.",
      ar: "التعادل أمام إيرلندا الشمالية — أوّل نقطة للجزائر في المونديال.",
    },
  },
  {
    year: 2010,
    host: "South Africa",
    coach: "Rabah Saâdane",
    finish: { en: "Group stage", fr: "Phase de groupes", ar: "دور المجموعات" },
    summary: {
      en: "Twenty-four years of waiting ended in Johannesburg. A defensive, disciplined side held England to a draw at Cape Town, but couldn’t find the goal that would carry them further.",
      fr: "Vingt-quatre ans d’attente se referment à Johannesburg. Une équipe défensive tient l’Angleterre au Cap, sans trouver le but qui la ferait passer.",
      ar: "انتهت أربع وعشرون عامًا من الانتظار في جوهانسبرغ. منتخب دفاعي يفرض التعادل على إنكلترا في كايب تاون دون أن يجد الهدف الذي يمرّره.",
    },
    matches: [
      { opp: "Slovenia", result: "0–1" },
      { opp: "England", result: "0–0", note: "A goalless but proud draw" },
      { opp: "USA", result: "0–1" },
    ],
    moment: {
      en: "M’Bolhi’s clean sheet against England — a defiant, disciplined night.",
      fr: "Le clean sheet de M’Bolhi contre l’Angleterre — une nuit disciplinée et fière.",
      ar: "شباك مبولحي النظيفة أمام إنكلترا — ليلة انضباط وكبرياء.",
    },
  },
  {
    year: 2014,
    host: "Brazil",
    coach: "Vahid Halilhodžić",
    finish: { en: "Round of 16", fr: "Huitièmes de finale", ar: "دور الـ١٦" },
    summary: {
      en: "Algeria’s finest World Cup. A 4–2 win over South Korea, a point against Russia, a knockout tie against Germany that ended in extra time — Porto Alegre knew it had seen a special side.",
      fr: "Le plus beau Mondial algérien. Une victoire 4–2 sur la Corée du Sud, un point face à la Russie, un huitième contre l’Allemagne joué jusqu’en prolongations.",
      ar: "أجمل مونديال جزائريّ. فوز ٤–٢ على كوريا الجنوبية، نقطة أمام روسيا، ثمن نهائي أمام ألمانيا امتدّ إلى الوقت الإضافي.",
    },
    matches: [
      { opp: "Belgium", result: "1–2" },
      { opp: "South Korea", result: "4–2", note: "Slimani, Halliche, Djabou, Brahimi" },
      { opp: "Russia", result: "1–1", note: "Slimani equaliser — qualification confirmed" },
      { opp: "Germany", result: "1–2 aet", note: "Round of 16 · Djabou scores in extra time" },
    ],
    moment: {
      en: "Slimani rises in the 60th minute against Russia — Algeria are in the last sixteen for the first time.",
      fr: "Slimani s’élève à la 60ᵉ face à la Russie — l’Algérie est en huitièmes pour la première fois.",
      ar: "سليماني يرتفع في الدقيقة ٦٠ أمام روسيا — الجزائر في الدور الثاني لأوّل مرّة.",
    },
  },
  {
    year: 2026,
    host: "USA · Canada · Mexico",
    coach: "TBD",
    finish: { en: "To be written", fr: "À écrire", ar: "لم تُكتب بعد" },
    summary: {
      en: "The next chapter of the story. This display will fill itself as the qualification campaign unfolds.",
      fr: "Le prochain chapitre. Cet emplacement se remplira au fil de la campagne de qualification.",
      ar: "الفصل التالي من الحكاية. ستمتلئ هذه الخانة مع تقدّم مشوار التصفيات.",
    },
    matches: [],
    moment: {
      en: "Held for the moment the whistle blows.",
      fr: "Réservé pour l’instant du coup d’envoi.",
      ar: "مُخصَّصة للحظة صافرة البداية.",
    },
  },
];

/* ---------- 5. Gijón ---------- */

export const GIJON_TIMELINE: { time: string; event: LocalizedString }[] = [
  { time: "16:15", event: { en: "Kick-off. Both sides know Algeria has already finished its group with two wins.", fr: "Coup d’envoi. Chacun sait que l’Algérie a fini son groupe sur deux victoires.", ar: "صافرة البداية. الجميع يعلم أنّ الجزائر أنهت مبارياتها بفوزين." } },
  { time: "10'", event: { en: "Horst Hrubesch heads Germany 1–0 up. Austria only needs to lose by fewer than two goals to qualify with Germany.", fr: "Hrubesch place la RFA en tête 1–0. L’Autriche n’a besoin que d’une défaite par moins de deux buts.", ar: "هروبيش يسجّل ١–٠ لألمانيا. النمسا لا تحتاج إلّا إلى خسارة بأقلّ من هدفَين." } },
  { time: "20'–89'", event: { en: "The match slows to a walking pace. No shots, no tackles, no pressing. Spanish commentators fall silent.", fr: "Le match s’étire au ralenti. Aucun tir, aucun tacle, aucun pressing. Les commentateurs espagnols se taisent.", ar: "تسير المباراة بخطى المشي. لا تسديدات ولا تدخّلات ولا ضغط. المعلّقون الإسبان يصمتون." } },
  { time: "FT", event: { en: "1–0. Both sides qualify. Algeria is eliminated with the same number of points and a better goal difference than one of the sides on the pitch.", fr: "1–0. Les deux équipes passent. L’Algérie est éliminée à égalité de points et avec une meilleure différence de buts qu’une des équipes sur le terrain.", ar: "١–٠. تأهّل الفريقان. تُقصى الجزائر بالتساوي في النقاط وبفارق أهداف أفضل من إحدى المنتخبَين على الميدان." } },
  { time: "1986", event: { en: "FIFA rules that all final group-stage matches must now kick off simultaneously — the direct legacy of Gijón.", fr: "La FIFA impose que les derniers matchs de poule se jouent en même temps — héritage direct de Gijón.", ar: "تُقرّر الفيفا أن تُقام كلّ المباريات الأخيرة في المجموعات في وقت واحد — الإرث المباشر لخيخون." } },
];

/* ---------- 6. AFCON ---------- */

export type AfconEntry = {
  year: number;
  host: string;
  finish: LocalizedString;
  note?: LocalizedString;
  highlight?: boolean;
};

export const AFCON_HISTORY: AfconEntry[] = [
  { year: 1968, host: "Ethiopia", finish: { en: "4th place", fr: "4ᵉ place", ar: "المركز الرابع" } },
  { year: 1980, host: "Nigeria", finish: { en: "Runners-up", fr: "Finaliste", ar: "الوصيف" }, note: { en: "First continental final.", fr: "Première finale continentale.", ar: "أوّل نهائي قارّي." } },
  { year: 1982, host: "Libya", finish: { en: "Third", fr: "Troisième", ar: "الثالث" } },
  { year: 1984, host: "Côte d’Ivoire", finish: { en: "Third", fr: "Troisième", ar: "الثالث" } },
  { year: 1988, host: "Morocco", finish: { en: "Third", fr: "Troisième", ar: "الثالث" } },
  { year: 1990, host: "Algeria", finish: { en: "Champions", fr: "Champions", ar: "الأبطال" }, note: { en: "First title, on home soil, in front of Algiers.", fr: "Premier titre, à domicile, devant Alger.", ar: "أوّل لقب، في الديار، أمام الجزائر العاصمة." }, highlight: true },
  { year: 2000, host: "Ghana/Nigeria", finish: { en: "Quarter-finals", fr: "Quarts", ar: "ربع النهائي" } },
  { year: 2002, host: "Mali", finish: { en: "Group stage", fr: "Poules", ar: "المجموعات" } },
  { year: 2004, host: "Tunisia", finish: { en: "Quarter-finals", fr: "Quarts", ar: "ربع النهائي" } },
  { year: 2010, host: "Angola", finish: { en: "Fourth", fr: "Quatrième", ar: "الرابع" } },
  { year: 2013, host: "South Africa", finish: { en: "Group stage", fr: "Poules", ar: "المجموعات" } },
  { year: 2015, host: "Equatorial Guinea", finish: { en: "Quarter-finals", fr: "Quarts", ar: "ربع النهائي" } },
  { year: 2017, host: "Gabon", finish: { en: "Group stage", fr: "Poules", ar: "المجموعات" } },
  { year: 2019, host: "Egypt", finish: { en: "Champions", fr: "Champions", ar: "الأبطال" }, note: { en: "Second star. Belmadi’s side, Mahrez’s tournament.", fr: "Deuxième étoile. La sélection de Belmadi, le tournoi de Mahrez.", ar: "النجمة الثانية. منتخب بلماضي، بطولة محرز." }, highlight: true },
  { year: 2021, host: "Cameroon", finish: { en: "Group stage", fr: "Poules", ar: "المجموعات" }, note: { en: "Defending champions eliminated early — a hard hangover.", fr: "Champions sortants éliminés tôt — dure gueule de bois.", ar: "الأبطال يودّعون مبكرًا — صحوة قاسية." } },
  { year: 2023, host: "Côte d’Ivoire", finish: { en: "Group stage", fr: "Poules", ar: "المجموعات" } },
];

/* ---------- 7. Legends ---------- */

export type FootballLegend = {
  id: string;
  name: string;
  years: string;
  position: LocalizedString;
  clubs: string;
  caps?: string;
  goals?: string;
  note: LocalizedString;
  quote?: LocalizedString;
};

export const LEGENDS: FootballLegend[] = [
  {
    id: "mekhloufi",
    name: "Rachid Mekhloufi",
    years: "1936–",
    position: { en: "Forward", fr: "Attaquant", ar: "مهاجم" },
    clubs: "AS Saint-Étienne · FLN",
    note: { en: "Left Saint-Étienne at the peak of his career to join the FLN team. Later coached the national side.", fr: "Quitte Saint-Étienne au sommet pour rejoindre le FLN. Sélectionneur plus tard.", ar: "غادر سانت إتيان في أوج مسيرته للالتحاق بفريق جبهة التحرير. ثم درّب المنتخب." },
    quote: { en: "\"We played for a country that did not yet exist on any map.\"", fr: "« Nous jouions pour un pays qui n’existait encore sur aucune carte. »", ar: "«لعبنا لبلد لم يكن بعد على أيّ خارطة.»" },
  },
  {
    id: "belloumi",
    name: "Lakhdar Belloumi",
    years: "1958–",
    position: { en: "Midfielder", fr: "Milieu", ar: "لاعب وسط" },
    clubs: "GCR Mascara · MCO",
    caps: "100+",
    note: { en: "African Footballer of the Year 1981. Scored the winner against West Germany at the 1982 World Cup.", fr: "Ballon d’or africain 1981. Auteur du but vainqueur face à la RFA en 1982.", ar: "الكرة الذهبية الإفريقية ١٩٨١. صاحب هدف الفوز أمام ألمانيا الغربية ١٩٨٢." },
  },
  {
    id: "madjer",
    name: "Rabah Madjer",
    years: "1958–",
    position: { en: "Forward", fr: "Attaquant", ar: "مهاجم" },
    clubs: "NAHD · Racing Paris · Porto",
    note: { en: "Backheel goal against Bayern in the 1987 European Cup final. Algerian icon abroad; national coach later.", fr: "Talonnade contre le Bayern en finale 1987. Icône algérienne à l’étranger.", ar: "هدف الكعب الشهير أمام بايرن في نهائي ١٩٨٧. أيقونة جزائرية في الخارج." },
  },
  {
    id: "assad",
    name: "Salah Assad",
    years: "1958–",
    position: { en: "Winger", fr: "Ailier", ar: "جناح" },
    clubs: "JS Kabylie · Paris FC · Mulhouse",
    note: { en: "Brace against Chile in 1982 — the dancer of Gijón, before the shame.", fr: "Doublé face au Chili en 1982 — le danseur de Gijón, avant la honte.", ar: "ثنائيّة أمام تشيلي في ١٩٨٢ — راقص خيخون قبل الفضيحة." },
  },
  {
    id: "bencheikh",
    name: "Ali Bencheikh",
    years: "1953–",
    position: { en: "Midfielder", fr: "Milieu", ar: "لاعب وسط" },
    clubs: "MC Alger · JS Kabylie",
    note: { en: "Elegant creator of the late 70s and 80s national side.", fr: "Meneur élégant de la sélection des années 70-80.", ar: "صانع لعب أنيق لمنتخب أواخر السبعينات والثمانينات." },
  },
  {
    id: "dahleb",
    name: "Mustapha Dahleb",
    years: "1952–",
    position: { en: "Attacking midfielder", fr: "Meneur", ar: "صانع لعب" },
    clubs: "Paris Saint-Germain",
    note: { en: "PSG icon — first Algerian star of the French Ligue 1. Chose Algeria over France for the 1982 World Cup.", fr: "Icône du PSG — première star algérienne de Ligue 1. Choisit l’Algérie plutôt que la France en 1982.", ar: "أيقونة سان جيرمان — أوّل نجم جزائري في الليغ ١. اختار الجزائر على فرنسا في ١٩٨٢." },
  },
  {
    id: "cerbah",
    name: "Mehdi Cerbah",
    years: "1953–",
    position: { en: "Goalkeeper", fr: "Gardien", ar: "حارس مرمى" },
    clubs: "JS Kabylie",
    note: { en: "Goalkeeper of the 1982 World Cup side. Calm, tall, decisive.", fr: "Gardien du Mondial 1982. Calme, grand, décisif.", ar: "حارس منتخب مونديال ١٩٨٢. هادئ، طويل، حاسم." },
  },
  {
    id: "mahrez",
    name: "Riyad Mahrez",
    years: "1991–",
    position: { en: "Winger", fr: "Ailier", ar: "جناح" },
    clubs: "Leicester · Manchester City · Al-Ahli",
    caps: "90+",
    note: { en: "Free-kick against Nigeria in the 2019 AFCON semi-final. Premier League title, Champions League title, and a second continental star.", fr: "Coup franc contre le Nigeria en demi-finale de la CAN 2019. Titres en Premier League et en Ligue des champions.", ar: "ركلة حرّة أمام نيجيريا في نصف نهائي ٢٠١٩. ألقاب البريميرليغ ودوري الأبطال." },
  },
  {
    id: "slimani",
    name: "Islam Slimani",
    years: "1988–",
    position: { en: "Striker", fr: "Attaquant", ar: "مهاجم" },
    clubs: "CR Belouizdad · Sporting CP · Leicester",
    caps: "90+",
    goals: "45+",
    note: { en: "All-time top scorer for Algeria. The header against Russia in 2014, the goals across every AFCON since.", fr: "Meilleur buteur de l’histoire de la sélection. La tête face à la Russie en 2014.", ar: "الهدّاف التاريخي للمنتخب. رأسيّة روسيا ٢٠١٤ وأهداف كلّ الكانات منذ." },
  },
  {
    id: "brahimi",
    name: "Yacine Brahimi",
    years: "1990–",
    position: { en: "Attacking midfielder", fr: "Milieu offensif", ar: "لاعب وسط هجومي" },
    clubs: "Granada · Porto · Al-Rayyan",
    note: { en: "Hat-trick against South Korea at the 2014 World Cup contributor. Dribbler, silent leader.", fr: "Contributeur du match référence face à la Corée en 2014. Dribbleur, leader discret.", ar: "من صنّاع مباراة كوريا المرجعيّة ٢٠١٤. مراوغ وقائد صامت." },
  },
  {
    id: "bouhelal",
    name: "Djamel Zidane",
    years: "1955–",
    position: { en: "Midfielder", fr: "Milieu", ar: "لاعب وسط" },
    clubs: "MC Alger",
    note: { en: "Scored Algeria’s first ever World Cup point (Mexico 1986, vs Northern Ireland).", fr: "Auteur du premier point mondial algérien (1986, face à l’Irlande du Nord).", ar: "صاحب أوّل نقطة مونديالية للجزائر (١٩٨٦ أمام إيرلندا الشمالية)." },
  },
  {
    id: "feghouli",
    name: "Sofiane Feghouli",
    years: "1989–",
    position: { en: "Winger", fr: "Ailier", ar: "جناح" },
    clubs: "Valencia · West Ham · Galatasaray",
    note: { en: "Opened the scoring at Brazil 2014 against Belgium — quiet metronome of the 2019 champions.", fr: "Ouvre le score face à la Belgique en 2014. Métronome discret des champions 2019.", ar: "افتتح التسجيل أمام بلجيكا ٢٠١٤. متحكّم هادئ في بطل ٢٠١٩." },
  },
];

/* ---------- 8. Coaches ---------- */

export type FootballCoach = {
  id: string;
  name: string;
  era: string;
  note: LocalizedString;
  achievement: LocalizedString;
};

export const COACHES: FootballCoach[] = [
  {
    id: "kermali",
    name: "Abdelhamid Kermali",
    era: "1988–1990",
    note: { en: "Coached the 1990 AFCON winners at home. Quiet architect of the golden generation.", fr: "Sélectionneur de la CAN 1990 gagnée à domicile. Architecte discret d’une génération dorée.", ar: "مدرّب أبطال «الكان» ١٩٩٠ في الديار. المهندس الهادئ للجيل الذهبي." },
    achievement: { en: "AFCON Champion 1990", fr: "Champion CAN 1990", ar: "بطل «الكان» ١٩٩٠" },
  },
  {
    id: "saadane",
    name: "Rabah Saâdane",
    era: "1981 · 1985–1986 · 1999 · 2003 · 2007–2010",
    note: { en: "Five spells with the national team, spanning three World Cups and thirty years of Algerian football.", fr: "Cinq passages en sélection, trois Mondiaux, trente ans de football algérien.", ar: "خمس فترات مع المنتخب، ثلاثة مونادِيل، وثلاثون عامًا من كرة القدم الجزائرية." },
    achievement: { en: "World Cup qualification 1986 & 2010", fr: "Qualifications au Mondial 1986 et 2010", ar: "التأهّل إلى مونديال ١٩٨٦ و٢٠١٠" },
  },
  {
    id: "halilhodzic",
    name: "Vahid Halilhodžić",
    era: "2011–2014",
    note: { en: "Bosnian tactician who forged the Brazil 2014 side — direct, physical, ruthless.", fr: "Tacticien bosnien qui forge la sélection du Brésil 2014 — directe, physique, tranchante.", ar: "مدرّب بوسنيّ صاغ منتخب مونديال ٢٠١٤ — مباشر وبدنيّ وحاسم." },
    achievement: { en: "Round of 16 · World Cup 2014", fr: "Huitièmes de finale · Mondial 2014", ar: "دور الـ١٦ · مونديال ٢٠١٤" },
  },
  {
    id: "belmadi",
    name: "Djamel Belmadi",
    era: "2018–2022",
    note: { en: "Player-turned-coach who ended a 29-year continental drought in Cairo and led a 35-match unbeaten run.", fr: "Joueur devenu sélectionneur — met fin à 29 ans de disette continentale au Caire et signe une série de 35 matchs sans défaite.", ar: "لاعبٌ صار مدرّبًا؛ أنهى ٢٩ سنة من الجفاف القارّي في القاهرة، وقاد سلسلة ٣٥ مباراة دون هزيمة." },
    achievement: { en: "AFCON Champion 2019 · Arab Cup 2021", fr: "Champion CAN 2019 · Coupe arabe 2021", ar: "بطل «الكان» ٢٠١٩ · كأس العرب ٢٠٢١" },
  },
  {
    id: "leekens",
    name: "Georges Leekens",
    era: "2003 · 2016–2017",
    note: { en: "Belgian coach called twice to steady the ship after difficult periods.", fr: "Sélectionneur belge appelé à deux reprises pour stabiliser la sélection.", ar: "مدرّب بلجيكيّ استُدعي مرّتَين لتثبيت المنتخب في مراحل صعبة." },
    achievement: { en: "AFCON qualification 2017", fr: "Qualification CAN 2017", ar: "التأهّل إلى «الكان» ٢٠١٧" },
  },
];

/* ---------- 9. Stadiums ---------- */

export type Stadium = {
  id: string;
  name: string;
  city: string;
  capacity: string;
  opened: string;
  note: LocalizedString;
};

export const STADIUMS: Stadium[] = [
  {
    id: "5-juillet",
    name: "Stade 5 Juillet 1962",
    city: "Algiers",
    capacity: "64,000",
    opened: "1972",
    note: { en: "The national coliseum. Named after independence day. Home of every anthem that matters.", fr: "Le colisée national. Nommé d’après la fête de l’indépendance. Foyer de tous les hymnes qui comptent.", ar: "الملعب الوطني الأكبر. يحمل تاريخ الاستقلال. مسرح كلّ نشيدٍ ذي معنى." },
  },
  {
    id: "tchaker",
    name: "Stade Mustapha Tchaker",
    city: "Blida",
    capacity: "35,000",
    opened: "1978",
    note: { en: "The fortress of the national team through the 2010s. Unbeaten for years.", fr: "Forteresse de la sélection dans les années 2010. Invaincue longtemps.", ar: "قلعة المنتخب في العشرية ٢٠١٠. لم يُهزَم فيها لسنوات." },
  },
  {
    id: "mandela",
    name: "Nelson Mandela Stadium",
    city: "Baraki (Algiers)",
    capacity: "40,000",
    opened: "2024",
    note: { en: "A modern arena for a new decade. First national home built for the streaming era.", fr: "Une arène moderne pour une nouvelle décennie.", ar: "ساحة حديثة لعقدٍ جديد." },
  },
  {
    id: "constantine",
    name: "Stade Chahid Hamlaoui",
    city: "Constantine",
    capacity: "42,000",
    opened: "1970",
    note: { en: "The eastern heart of Algerian football, home to CS Constantine.", fr: "Le cœur oriental du football algérien, antre du CSC.", ar: "قلب كرة القدم الشرقيّ، ملعب شباب قسنطينة." },
  },
  {
    id: "oran",
    name: "Stade Miloud Hadefi",
    city: "Oran",
    capacity: "40,000",
    opened: "2021",
    note: { en: "The Mediterranean stadium built for the 2022 Games — Oran’s new pride.", fr: "Le stade méditerranéen construit pour les Jeux 2022 — fierté d’Oran.", ar: "الملعب المتوسّطي الذي بُني لدورة ٢٠٢٢ — فخر وهران." },
  },
];

/* ---------- 10. Famous matches ---------- */

export type FamousMatch = {
  id: string;
  date: string;
  title: string;
  score: string;
  venue: string;
  note: LocalizedString;
};

export const FAMOUS_MATCHES: FamousMatch[] = [
  {
    id: "algeria-germany-1982",
    date: "16 June 1982",
    title: "Algeria vs West Germany",
    score: "2 – 1",
    venue: "El Molinón, Gijón",
    note: { en: "The upset that shook the World Cup. Madjer opened, Belloumi sealed. Rummenigge’s Germany humbled by a first-time African side.", fr: "L’exploit qui secoue le Mondial. Madjer ouvre, Belloumi conclut. L’Allemagne humiliée par une équipe africaine débutante.", ar: "المفاجأة التي هزّت المونديال. ماجر افتتح وبلومي حسم. ألمانيا رومينيغه أمام منتخب إفريقي مبتدئ." },
  },
  {
    id: "algeria-chile-1982",
    date: "24 June 1982",
    title: "Algeria vs Chile",
    score: "3 – 2",
    venue: "Riazor, Oviedo",
    note: { en: "Salah Assad’s brace lifts Algeria to the edge of qualification — before Gijón takes it away.", fr: "Le doublé de Salah Assad porte l’Algérie au bord de la qualification — avant que Gijón ne la retire.", ar: "ثنائيّة صلاح عصّاد ترفع الجزائر إلى حافة التأهّل — قبل أن تسلبه خيخون." },
  },
  {
    id: "algeria-egypt-1989",
    date: "17 November 1989",
    title: "Algeria vs Egypt (World Cup qualifier)",
    score: "0 – 0",
    venue: "5 Juillet, Algiers",
    note: { en: "A goalless night that sent Algeria to Italia 90 qualification territory — and one of the most watched matches in the country’s history.", fr: "Un 0-0 qui envoie l’Algérie vers la qualification à Italia 90 — un des matchs les plus regardés du pays.", ar: "تعادل سلبيّ أرسل الجزائر نحو التأهّل إلى إيطاليا ٩٠ — من أكثر المباريات مشاهدةً في تاريخ البلاد." },
  },
  {
    id: "algeria-korea-2014",
    date: "22 June 2014",
    title: "Algeria vs South Korea",
    score: "4 – 2",
    venue: "Estádio Beira-Rio, Porto Alegre",
    note: { en: "The most fluent Algerian performance ever seen at a World Cup. Slimani, Halliche, Djabou, Brahimi.", fr: "La plus belle performance algérienne en Coupe du monde. Slimani, Halliche, Djabou, Brahimi.", ar: "أفضل أداء جزائريّ في مونديال. سليماني، حليش، جابو، براهيمي." },
  },
  {
    id: "algeria-germany-2014",
    date: "30 June 2014",
    title: "Algeria vs Germany (R16)",
    score: "1 – 2 aet",
    venue: "Beira-Rio, Porto Alegre",
    note: { en: "Ninety minutes of stalemate against the future World Champions. Djabou’s goal came too late, but Porto Alegre stood up.", fr: "90 minutes d’équilibre face aux futurs champions du monde. Le but de Djabou arrive trop tard, mais Porto Alegre se lève.", ar: "٩٠ دقيقة من التوازن أمام أبطال العالم القادمين. هدف جابو تأخّر، لكنّ بورتو أليغري وقف." },
  },
  {
    id: "afcon-final-2019",
    date: "19 July 2019",
    title: "Algeria vs Senegal (AFCON Final)",
    score: "1 – 0",
    venue: "Cairo International Stadium",
    note: { en: "Bounedjah’s deflected shot after 79 seconds. Twenty-nine years of drought end in Cairo.", fr: "La frappe déviée de Bounedjah après 79 secondes. 29 ans de disette prennent fin au Caire.", ar: "تسديدة بونجاح المرتدّة بعد ٧٩ ثانية. تسع وعشرون سنة من الجفاف تنتهي في القاهرة." },
  },
];

/* ---------- 11. Culture ---------- */

export const CULTURE_THEMES: { title: LocalizedString; body: LocalizedString }[] = [
  {
    title: { en: "Street football", fr: "Football de rue", ar: "كرة الشارع" },
    body: { en: "The narrow alleys of Bab El-Oued, El Harrach and Belcourt where every Algerian footballer’s first move was invented.", fr: "Les ruelles de Bab El-Oued, El Harrach et Belcourt où chaque geste de footballeur algérien a commencé.", ar: "أزقّة باب الوادي والحرّاش وبلكور حيث وُلدت أوّل لمسة لكلّ لاعب جزائريّ." },
  },
  {
    title: { en: "The derbies", fr: "Les derbys", ar: "الديربيات" },
    body: { en: "MCA vs USMA in Algiers, MCO vs ASMO in Oran, JSK vs USMA nationwide — each match carries its own century.", fr: "MCA-USMA à Alger, MCO-ASMO à Oran, JSK-USMA en national — chaque match porte son siècle.", ar: "مولودية الجزائر × إتحاد العاصمة، مولودية وهران × جمعية وهران، شبيبة القبائل × إتحاد العاصمة على الصعيد الوطني — لكلّ منها قرنه." },
  },
  {
    title: { en: "Ultras & chants", fr: "Ultras & chants", ar: "الأولتراس والأهازيج" },
    body: { en: "‘La Casa d’el Mouradia’, born on the terraces, became a soundtrack of the 2019 Hirak movement.", fr: "« La Casa d’el Mouradia », née dans les virages, devient la bande-son du Hirak de 2019.", ar: "«لا كازا ديل مرادية»، وُلدت في المدرّجات، فصارت شارة حراك ٢٠١٩." },
  },
  {
    title: { en: "Football & identity", fr: "Football et identité", ar: "الكرة والهويّة" },
    body: { en: "Green shirts in diaspora cafés, radios turned up in olive groves, the day after big matches often quieter than the match itself.", fr: "Maillots verts dans les cafés de la diaspora, radios poussées à fond dans les oliveraies, lendemains parfois plus calmes que le match.", ar: "قمصان خضراء في مقاهي المهجر، مذاييع تعلو في بساتين الزيتون، وغدُ المباراة أهدأ أحيانًا من المباراة نفسها." },
  },
];

/* ---------- 12. Trophies ---------- */

export type Trophy = {
  id: string;
  name: LocalizedString;
  count: number;
  years: string[];
  detail: LocalizedString;
};

export const TROPHIES: Trophy[] = [
  {
    id: "afcon",
    name: { en: "Africa Cup of Nations", fr: "Coupe d’Afrique des Nations", ar: "كأس أمم إفريقيا" },
    count: 2,
    years: ["1990", "2019"],
    detail: { en: "The two continental stars on the crest.", fr: "Les deux étoiles continentales de l’écusson.", ar: "النجمتان القاريّتان فوق الشعار." },
  },
  {
    id: "arab",
    name: { en: "FIFA Arab Cup", fr: "Coupe arabe FIFA", ar: "كأس العرب" },
    count: 1,
    years: ["2021"],
    detail: { en: "Won in Qatar with a squad drawn entirely from the domestic league.", fr: "Gagnée au Qatar avec un effectif entièrement local.", ar: "فازت الجزائر بها في قطر بتشكيلة محلّية بالكامل." },
  },
  {
    id: "arab-nations",
    name: { en: "Pan Arab Games (football)", fr: "Jeux panarabes (football)", ar: "الألعاب العربية" },
    count: 2,
    years: ["1975", "2011"],
    detail: { en: "Regional dominance across two very different generations.", fr: "Domination régionale sur deux générations.", ar: "هيمنة إقليمية عبر جيلَين مختلفَين." },
  },
  {
    id: "mediterranean",
    name: { en: "Mediterranean Games (football)", fr: "Jeux méditerranéens (football)", ar: "ألعاب البحر الأبيض المتوسّط" },
    count: 1,
    years: ["1975"],
    detail: { en: "Won in Algiers, in front of the newly-built 5 Juillet stadium.", fr: "Gagnée à Alger, devant le tout neuf 5 Juillet.", ar: "فازت بها في الجزائر أمام ملعب ٥ جويلية حديث البناء." },
  },
  {
    id: "afro-asian",
    name: { en: "Afro-Asian Cup of Nations", fr: "Coupe afro-asiatique", ar: "الكأس الإفريقية الآسيوية" },
    count: 1,
    years: ["1991"],
    detail: { en: "The dessert of the golden generation.", fr: "Le dessert de la génération dorée.", ar: "حلوى الجيل الذهبي." },
  },
];

/* ---------- 13. Statistics ---------- */

export const STATS = {
  topScorers: [
    { name: "Islam Slimani", goals: 45 },
    { name: "Abdelhafid Tasfaout", goals: 36 },
    { name: "Rabah Madjer", goals: 30 },
    { name: "Lakhdar Belloumi", goals: 28 },
    { name: "Baghdad Bounedjah", goals: 25 },
    { name: "Hillel Soudani", goals: 25 },
  ],
  mostCaps: [
    { name: "Islam Slimani", caps: 98 },
    { name: "Lakhdar Belloumi", caps: 100 },
    { name: "Madjid Bougherra", caps: 74 },
    { name: "Aïssa Mandi", caps: 90 },
    { name: "Riyad Mahrez", caps: 96 },
    { name: "Sofiane Feghouli", caps: 84 },
  ],
  worldCups: 5,
  afconTitles: 2,
  arabCups: 1,
  unbeatenRun: "35 matches (2018–2022) — Belmadi era",
};

/* ---------- 14. Memories ---------- */

export type Artifact = {
  id: string;
  emoji: string;
  title: LocalizedString;
  note: LocalizedString;
};

export const ARTIFACTS: Artifact[] = [
  { id: "1982-jersey", emoji: "👕", title: { en: "1982 Home Jersey", fr: "Maillot domicile 1982", ar: "قميص ١٩٨٢" }, note: { en: "Green shirt with a modest white collar. Le Coq Sportif.", fr: "Maillot vert au col blanc. Le Coq Sportif.", ar: "قميص أخضر بياقة بيضاء. لو كوك سبورتيف." } },
  { id: "1990-trophy-ticket", emoji: "🎟️", title: { en: "1990 AFCON Final ticket", fr: "Billet finale CAN 1990", ar: "تذكرة نهائي كان ٩٠" }, note: { en: "Algiers, 16 March 1990. General admission, 5 dinars.", fr: "Alger, 16 mars 1990. Populaire, 5 DA.", ar: "الجزائر، ١٦ مارس ١٩٩٠. مدرّج شعبيّ بخمسة دنانير." } },
  { id: "2014-boots", emoji: "👟", title: { en: "Slimani’s boots — Brazil 2014", fr: "Crampons de Slimani — Brésil 2014", ar: "حذاء سليماني — البرازيل ٢٠١٤" }, note: { en: "Worn during the header against Russia.", fr: "Portés lors de la tête face à la Russie.", ar: "استُخدم في رأسيّة روسيا." } },
  { id: "2019-medal", emoji: "🏅", title: { en: "2019 AFCON winner’s medal", fr: "Médaille CAN 2019", ar: "ميدالية بطل الكان ٢٠١٩" }, note: { en: "Awarded in Cairo, 19 July 2019.", fr: "Remise au Caire, 19 juillet 2019.", ar: "سُلّمت في القاهرة، ١٩ جويلية ٢٠١٩." } },
  { id: "1958-photo", emoji: "🖼️", title: { en: "FLN team portrait — Tunis 1958", fr: "Portrait du FLN — Tunis 1958", ar: "صورة فريق جبهة التحرير — تونس ١٩٥٨" }, note: { en: "Nine men, one shirt, a country still to come.", fr: "Neuf hommes, un maillot, un pays à venir.", ar: "تسعة رجال، قميص واحد، وطن قادم." } },
  { id: "2014-ball", emoji: "⚽", title: { en: "Match ball — Algeria 4-2 South Korea", fr: "Ballon du match Algérie 4-2 Corée", ar: "كرة مباراة الجزائر × كوريا" }, note: { en: "Brazuca, Porto Alegre.", fr: "Brazuca, Porto Alegre.", ar: "برازوكا، بورتو أليغري." } },
  { id: "programme-1990", emoji: "📓", title: { en: "1990 AFCON programme", fr: "Programme CAN 1990", ar: "برنامج الكان ١٩٩٠" }, note: { en: "Line-ups, coach interviews, and the anthem lyrics printed in three languages.", fr: "Compositions, entretiens et paroles de l’hymne en trois langues.", ar: "تشكيلات ومقابلات وكلمات النشيد بثلاث لغات." } },
];

/* ---------- 15. Timeline ---------- */

export const CENTURY: { year: number; label: LocalizedString }[] = [
  { year: 1921, label: { en: "Mouloudia founded", fr: "Naissance du Mouloudia", ar: "تأسيس المولودية" } },
  { year: 1927, label: { en: "USM Alger founded", fr: "Naissance de l’USMA", ar: "تأسيس اتحاد العاصمة" } },
  { year: 1956, label: { en: "FLN calls players home", fr: "Le FLN rappelle les joueurs", ar: "نداء جبهة التحرير للاعبين" } },
  { year: 1958, label: { en: "The FLN team is formed", fr: "Formation de l’équipe du FLN", ar: "تأسيس فريق جبهة التحرير" } },
  { year: 1962, label: { en: "Independence", fr: "Indépendance", ar: "الاستقلال" } },
  { year: 1963, label: { en: "First official national team match", fr: "Premier match officiel", ar: "أوّل مباراة رسميّة" } },
  { year: 1975, label: { en: "Mediterranean Games gold", fr: "Or aux Jeux méditerranéens", ar: "ذهب البحر الأبيض المتوسّط" } },
  { year: 1980, label: { en: "First AFCON final", fr: "Première finale de la CAN", ar: "أوّل نهائي كان" } },
  { year: 1982, label: { en: "World Cup debut · Algeria 2-1 West Germany", fr: "Débuts au Mondial · Algérie 2-1 RFA", ar: "الظهور الأوّل في المونديال · ٢–١ ألمانيا" } },
  { year: 1986, label: { en: "Second consecutive World Cup", fr: "Deuxième Mondial consécutif", ar: "مونديال ثانٍ متتالٍ" } },
  { year: 1990, label: { en: "AFCON Champions on home soil", fr: "Champions d’Afrique à domicile", ar: "أبطال إفريقيا في الديار" } },
  { year: 2010, label: { en: "Return to the World Cup", fr: "Retour au Mondial", ar: "العودة إلى المونديال" } },
  { year: 2014, label: { en: "Round of 16 in Brazil", fr: "Huitièmes au Brésil", ar: "الدور الثاني في البرازيل" } },
  { year: 2019, label: { en: "Second continental star", fr: "Deuxième étoile continentale", ar: "النجمة القارّية الثانية" } },
  { year: 2021, label: { en: "Arab Cup Champions in Qatar", fr: "Champions de la Coupe arabe au Qatar", ar: "أبطال كأس العرب في قطر" } },
  { year: 2026, label: { en: "Next chapter — North American World Cup", fr: "Prochain chapitre — Mondial nord-américain", ar: "الفصل القادم — المونديال في أمريكا الشمالية" } },
];

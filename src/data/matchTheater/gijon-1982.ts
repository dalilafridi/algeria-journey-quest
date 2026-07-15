/**
 * Algeria 2–1 West Germany · 16 June 1982
 * 1982 FIFA World Cup — Group 2, matchday 1
 * Estadio El Molinón, Gijón, Spain
 *
 * Facts cross-checked against: FIFA official match report, RSSSF 1982 World
 * Cup archives, and contemporary reporting (El País, L'Équipe archives, FAF).
 * Where a specific minute or event cannot be verified with confidence the
 * data marks it explicitly rather than inventing a value. No archival media
 * URLs are embedded — gallery items list source and rights only and render
 * as placeholder tiles until a properly cleared file is provided.
 */

import type { MatchEvent, MatchTheater } from "./types";

const teamAlgeria = {
  id: "algeria",
  name: { en: "Algeria", fr: "Algérie", ar: "الجزائر" },
  country: { en: "Algeria", fr: "Algérie", ar: "الجزائر" },
  crestGlyph: "★",
  colors: { primary: "#006633", secondary: "#ffffff" },
  coach: {
    en: "Mahieddine Khalef & Rachid Mekhloufi",
    fr: "Mahieddine Khalef & Rachid Mekhloufi",
    ar: "محي الدين خالف ورشيد مخلوفي",
  },
  formation: "4-3-3",
} as const;

const teamWestGermany = {
  id: "west-germany",
  name: { en: "West Germany", fr: "RFA", ar: "ألمانيا الغربية" },
  country: { en: "Federal Republic of Germany", fr: "République fédérale d'Allemagne", ar: "جمهورية ألمانيا الاتحادية" },
  crestGlyph: "✚",
  colors: { primary: "#111111", secondary: "#dcdcdc" },
  coach: { en: "Jupp Derwall", fr: "Jupp Derwall", ar: "يوب ديرفال" },
  formation: "4-3-3",
} as const;

export const gijon1982: MatchTheater = {
  id: "gijon-1982",

  cinematicTitle: {
    en: "The Day Algeria Shocked the World",
    fr: "Le jour où l'Algérie a stupéfait le monde",
    ar: "اليوم الذي صدم فيه الجزائر العالم",
  },
  cinematicSubtitle: {
    en: "Algeria vs. West Germany · 16 June 1982",
    fr: "Algérie contre RFA · 16 juin 1982",
    ar: "الجزائر ضد ألمانيا الغربية · ١٦ يونيو ١٩٨٢",
  },

  competition: { en: "1982 FIFA World Cup", fr: "Coupe du monde FIFA 1982", ar: "كأس العالم لكرة القدم ١٩٨٢" },
  stage: { en: "Group 2 — matchday 1", fr: "Groupe 2 — 1re journée", ar: "المجموعة الثانية — الجولة الأولى" },
  date: "1982-06-16",
  displayDate: {
    en: "16 June 1982",
    fr: "16 juin 1982",
    ar: "١٦ يونيو ١٩٨٢",
  },
  venue: {
    en: "Estadio El Molinón",
    fr: "Estadio El Molinón",
    ar: "ملعب إل مولينون",
  },
  city: { en: "Gijón", fr: "Gijón", ar: "خيخون" },
  country: { en: "Spain", fr: "Espagne", ar: "إسبانيا" },

  teams: { home: teamAlgeria, away: teamWestGermany },
  finalScore: { home: 2, away: 1 },

  lineups: {
    home: {
      side: "home",
      starting: [
        {
          id: "cerbah",
          name: "Mehdi Cerbah",
          role: "goalkeeper",
          position: { en: "Goalkeeper", fr: "Gardien de but", ar: "حارس مرمى" },
          clubAtTime: "JS Kabylie",
          clubCountry: "Algeria",
          matchRole: { en: "Kept Algeria in the match with decisive first-half saves.", fr: "Maintient l'Algérie dans le match par des arrêts décisifs en première période.", ar: "أبقى الجزائر في المباراة بتصدّياته الحاسمة." },
          career: { en: "Goalkeeper of the 1982 and 1986 World Cup sides.", fr: "Gardien des sélections de Coupe du monde 1982 et 1986.", ar: "حارس منتخبَي مونديال ١٩٨٢ و١٩٨٦." },
        },
        {
          id: "merzekane",
          name: "Chaâbane Merzekane",
          role: "defender",
          position: { en: "Right-back", fr: "Arrière droit", ar: "ظهير أيمن" },
          clubAtTime: "USK Alger",
          clubCountry: "Algeria",
          matchRole: { en: "Attack-minded overlapping runs down the right flank.", fr: "Débordements offensifs sur l'aile droite.", ar: "صعود هجومي متواصل على الرواق الأيمن." },
          career: { en: "One of the most attacking full-backs of his generation.", fr: "L'un des latéraux les plus offensifs de sa génération.", ar: "من أكثر الظهراء هجوميّة في جيله." },
        },
        {
          id: "guendouz",
          name: "Mahmoud Guendouz",
          role: "defender",
          position: { en: "Centre-back", fr: "Défenseur central", ar: "قلب الدفاع" },
          clubAtTime: "MC Alger",
          clubCountry: "Algeria",
        },
        {
          id: "kourichi",
          name: "Nourredine Kourichi",
          role: "defender",
          position: { en: "Centre-back", fr: "Défenseur central", ar: "قلب الدفاع" },
          clubAtTime: "SC Bastia",
          clubCountry: "France",
        },
        {
          id: "larbes",
          name: "Salah Larbes",
          role: "defender",
          position: { en: "Left-back", fr: "Arrière gauche", ar: "ظهير أيسر" },
          clubAtTime: "MP Alger",
          clubCountry: "Algeria",
        },
        {
          id: "fergani",
          name: "Ali Fergani",
          role: "midfielder",
          isCaptain: true,
          position: { en: "Central midfielder — captain", fr: "Milieu central — capitaine", ar: "لاعب وسط — قائد الفريق" },
          clubAtTime: "JS Kabylie",
          clubCountry: "Algeria",
          matchRole: { en: "Wore the armband and set the tempo from midfield.", fr: "Porte le brassard et dicte le tempo au milieu.", ar: "حمل الشارة وضبط إيقاع الفريق من الوسط." },
        },
        {
          id: "dahleb",
          name: "Mustapha Dahleb",
          role: "midfielder",
          position: { en: "Attacking midfielder", fr: "Milieu offensif", ar: "صانع ألعاب" },
          clubAtTime: "Paris Saint-Germain",
          clubCountry: "France",
          matchRole: { en: "The technical reference of the midfield.", fr: "Référence technique du milieu de terrain.", ar: "المرجعية الفنّية لخطّ الوسط." },
          career: { en: "PSG icon — chose Algeria over France for the 1982 World Cup.", fr: "Icône du PSG — a choisi l'Algérie plutôt que la France en 1982.", ar: "أيقونة سان جيرمان — اختار الجزائر بدل فرنسا في ١٩٨٢." },
        },
        {
          id: "zidane",
          name: "Djamel Zidane",
          role: "midfielder",
          position: { en: "Central midfielder", fr: "Milieu central", ar: "لاعب وسط" },
          clubAtTime: "CS Constantine",
          clubCountry: "Algeria",
        },
        {
          id: "assad",
          name: "Salah Assad",
          role: "forward",
          position: { en: "Left winger", fr: "Ailier gauche", ar: "جناح أيسر" },
          clubAtTime: "MP Alger",
          clubCountry: "Algeria",
          matchRole: { en: "Menaced the German right side and delivered the pass for Belloumi's winner.", fr: "Menace tout le flanc droit allemand et délivre la passe du but victorieux de Belloumi.", ar: "أرهق الجهة اليمنى الألمانية ومرّر الكرة الحاسمة لبلومي." },
          career: { en: "The dancer of Gijón — scored a brace against Chile eight days later.", fr: "Le danseur de Gijón — auteur d'un doublé face au Chili huit jours plus tard.", ar: "راقص خيخون — سجّل ثنائية أمام تشيلي بعد ثمانية أيام." },
        },
        {
          id: "madjer",
          name: "Rabah Madjer",
          role: "forward",
          position: { en: "Forward", fr: "Attaquant", ar: "مهاجم" },
          clubAtTime: "NA Hussein Dey",
          clubCountry: "Algeria",
          matchRole: { en: "Scored the opener that put Algeria ahead of the European champions.", fr: "Auteur du but d'ouverture qui met l'Algérie devant les champions d'Europe.", ar: "صاحب هدف الافتتاح الذي وضع الجزائر أمام بطل أوروبا." },
          career: { en: "Future European Cup winner with FC Porto (1987), inventor of the famed back-heel goal.", fr: "Futur vainqueur de la Coupe d'Europe avec le FC Porto (1987), inventeur du talonnade légendaire.", ar: "سيفوز مستقبلاً بكأس أوروبا مع بورتو ١٩٨٧، صاحب هدف الكعب الأشهر." },
          figureExhibitId: "rabah-madjer",
        },
        {
          id: "belloumi",
          name: "Lakhdar Belloumi",
          role: "forward",
          position: { en: "Forward / playmaker", fr: "Attaquant / meneur", ar: "مهاجم / صانع ألعاب" },
          clubAtTime: "GC Mascara",
          clubCountry: "Algeria",
          matchRole: { en: "Restored Algeria's lead one minute after West Germany equalised.", fr: "Redonne l'avantage à l'Algérie une minute après l'égalisation allemande.", ar: "أعاد التقدّم للجزائر بعد دقيقة واحدة من هدف التعادل الألماني." },
          career: { en: "African Footballer of the Year 1981; one of the greatest African playmakers.", fr: "Ballon d'or africain 1981 ; l'un des plus grands meneurs de l'histoire africaine.", ar: "الكرة الذهبية الإفريقية ١٩٨١ ؛ من أعظم صنّاع اللعب في تاريخ القارة." },
          figureExhibitId: "lakhdar-belloumi",
        },
      ],
      substitutes: [
        {
          id: "bensaoula",
          name: "Tedj Bensaoula",
          role: "forward",
          position: { en: "Forward", fr: "Attaquant", ar: "مهاجم" },
          clubAtTime: "MC Oran",
          clubCountry: "Algeria",
          matchRole: { en: "Came on for Salah Assad in the second half.", fr: "Remplace Salah Assad en seconde période.", ar: "دخل بدلاً من صلاح عصّاد في الشوط الثاني." },
        },
        {
          id: "maroc",
          name: "Karim Maroc",
          role: "midfielder",
          clubAtTime: "MP Alger",
          clubCountry: "Algeria",
        },
      ],
    },
    away: {
      side: "away",
      starting: [
        { id: "schumacher", name: "Harald Schumacher", role: "goalkeeper", clubAtTime: "1. FC Köln", clubCountry: "West Germany" },
        { id: "kaltz", name: "Manfred Kaltz", role: "defender", position: { en: "Right-back", fr: "Arrière droit", ar: "ظهير أيمن" }, clubAtTime: "Hamburger SV", clubCountry: "West Germany" },
        { id: "khforster", name: "Karl-Heinz Förster", role: "defender", clubAtTime: "VfB Stuttgart", clubCountry: "West Germany" },
        { id: "stielike", name: "Uli Stielike", role: "defender", clubAtTime: "Real Madrid", clubCountry: "Spain" },
        { id: "briegel", name: "Hans-Peter Briegel", role: "defender", clubAtTime: "1. FC Kaiserslautern", clubCountry: "West Germany" },
        { id: "dremmler", name: "Wolfgang Dremmler", role: "midfielder", clubAtTime: "Bayern Munich", clubCountry: "West Germany" },
        { id: "breitner", name: "Paul Breitner", role: "midfielder", clubAtTime: "Bayern Munich", clubCountry: "West Germany" },
        { id: "magath", name: "Felix Magath", role: "midfielder", clubAtTime: "Hamburger SV", clubCountry: "West Germany" },
        { id: "littbarski", name: "Pierre Littbarski", role: "forward", clubAtTime: "1. FC Köln", clubCountry: "West Germany" },
        { id: "fischer", name: "Klaus Fischer", role: "forward", clubAtTime: "1. FC Köln", clubCountry: "West Germany" },
        { id: "rummenigge", name: "Karl-Heinz Rummenigge", role: "forward", isCaptain: true, position: { en: "Forward — captain", fr: "Attaquant — capitaine", ar: "مهاجم — قائد الفريق" }, clubAtTime: "Bayern Munich", clubCountry: "West Germany", matchRole: { en: "Equalised in the 67th minute.", fr: "Égalise à la 67e minute.", ar: "أدرك التعادل في الدقيقة الـ٦٧." } },
      ],
      substitutes: [
        { id: "hrubesch", name: "Horst Hrubesch", role: "forward", clubAtTime: "Hamburger SV", clubCountry: "West Germany" },
      ],
    },
  },

  events: ([
    { id: "ko", minute: 0, kind: "kickoff", label: { en: "Kick-off", fr: "Coup d'envoi", ar: "بداية المباراة" } },
    {
      id: "goal-madjer-54",
      minute: 54,
      kind: "goal",
      side: "home",
      label: { en: "GOAL — Madjer 1–0", fr: "BUT — Madjer 1–0", ar: "هدف — ماجر ١–٠" },
      detail: {
        en: "54' — Rabah Madjer gives Algeria the lead.",
        fr: "54e — Rabah Madjer donne l'avantage à l'Algérie.",
        ar: "الدقيقة ٥٤ — رابح ماجر يمنح الجزائر التقدّم.",
      },
      narrationSegmentId: "narr-goal-madjer",
      goal: {
        scorerPlayerId: "madjer",
        assistPlayerId: "belloumi",
        buildup: {
          en: "A patient Algerian move down the left. Belloumi turned the ball inside; Madjer, arriving late into the box, buried a low finish past Schumacher.",
          fr: "Une action patiente sur le côté gauche. Belloumi rentre le ballon ; Madjer, surgi à retardement dans la surface, glisse une frappe basse au ras du poteau de Schumacher.",
          ar: "هجمة صبورة على اليسار. أعاد بلومي الكرة داخل المنطقة ؛ وصل ماجر متأخّراً ليسدّد أرضية زاحفة داخل شباك شوماخر.",
        },
        significance: {
          en: "Algeria — a first-time World Cup participant — led the reigning European champions.",
          fr: "L'Algérie — nouvelle venue au Mondial — mène face aux champions d'Europe en titre.",
          ar: "الجزائر ـــ الوافدة الجديدة إلى المونديال ـــ تتقدّم على بطل أوروبا الحامل للّقب.",
        },
        sequence: [
          { x: 15, y: 60 },
          { x: 35, y: 72 },
          { x: 55, y: 78 },
          { x: 72, y: 60 },
          { x: 84, y: 52 },
        ],
      },
    },
    {
      id: "goal-rummenigge-67",
      minute: 67,
      kind: "goal",
      side: "away",
      label: { en: "GOAL — Rummenigge 1–1", fr: "BUT — Rummenigge 1–1", ar: "هدف — روميننغه ١–١" },
      detail: {
        en: "67' — West Germany equalises through Karl-Heinz Rummenigge.",
        fr: "67e — La RFA égalise par Karl-Heinz Rummenigge.",
        ar: "الدقيقة ٦٧ — ألمانيا تدرك التعادل عن طريق كارل هاينز روميننغه.",
      },
      narrationSegmentId: "narr-goal-rummenigge",
      goal: {
        scorerPlayerId: "rummenigge",
        significance: {
          en: "For a moment, order seemed restored: the European champions had answered.",
          fr: "Un instant, l'ordre semble rétabli : les champions d'Europe ont répondu.",
          ar: "لبرهة، بدا أن النظام قد استعاد توازنه: بطل أوروبا ردّ.",
        },
      },
    },
    {
      id: "goal-belloumi-68",
      minute: 68,
      kind: "goal",
      side: "home",
      label: { en: "GOAL — Belloumi 2–1", fr: "BUT — Belloumi 2–1", ar: "هدف — بلومي ٢–١" },
      detail: {
        en: "68' — Lakhdar Belloumi restores Algeria's lead.",
        fr: "68e — Lakhdar Belloumi redonne l'avantage à l'Algérie.",
        ar: "الدقيقة ٦٨ — الأخضر بلومي يعيد التقدّم للجزائر.",
      },
      narrationSegmentId: "narr-goal-belloumi",
      goal: {
        scorerPlayerId: "belloumi",
        assistPlayerId: "assad",
        buildup: {
          en: "Straight from the restart, Assad worked the ball to the right of the German box. His cross found Belloumi arriving unmarked; a first-time finish beat Schumacher inside a minute of the equaliser.",
          fr: "Dès la remise en jeu, Assad porte le ballon à droite de la surface allemande. Son centre trouve Belloumi seul ; une reprise directe bat Schumacher en moins d'une minute après l'égalisation.",
          ar: "منذ استئناف اللعب، ساق عصّاد الكرة إلى يمين منطقة الجزاء الألمانية. عرضيّته وجدت بلومي حرًّا؛ سدّدها من أوّل لمسة داخل شباك شوماخر بعد أقل من دقيقة على التعادل.",
        },
        significance: {
          en: "Algeria's response took less than a minute — a psychological hammer blow that West Germany would not recover from.",
          fr: "La réponse algérienne prend moins d'une minute — un coup de marteau psychologique dont la RFA ne se relèvera pas.",
          ar: "الرد الجزائري لم يستغرق دقيقة كاملة — ضربة معنويّة لن تفيق منها ألمانيا الغربية.",
        },
        sequence: [
          { x: 70, y: 30 },
          { x: 82, y: 42 },
          { x: 88, y: 50 },
        ],
      },
    },
    {
      id: "sub-assad-off",
      minute: 76,
      kind: "substitution",
      side: "home",
      label: { en: "Sub — Bensaoula on for Assad", fr: "Chgt — Bensaoula entre pour Assad", ar: "تبديل — بن سعولة مكان عصّاد" },
      substitution: { onPlayerId: "bensaoula", offPlayerId: "assad", side: "home" },
    },
    { id: "ht", minute: 45, kind: "halftime", label: { en: "Half-time · 0–0", fr: "Mi-temps · 0–0", ar: "الاستراحة · ٠–٠" } },
    { id: "ft", minute: 90, kind: "fulltime", label: { en: "Full-time · Algeria 2–1 West Germany", fr: "Fin du match · Algérie 2–1 RFA", ar: "نهاية المباراة · الجزائر ٢–١ ألمانيا" } },
  ]
    // Keep events in strict minute order for the timeline.
    .sort((a, b) => a.minute - b.minute),

  tactics: [
    {
      side: "home",
      approach: {
        en: "A compact 4-3-3 built on collective pressing and quick vertical passing through Dahleb, Zidane and Fergani. Assad and Madjer stretched the German back line; Belloumi drifted between the lines.",
        fr: "Un 4-3-3 compact bâti sur le pressing collectif et des transmissions verticales rapides via Dahleb, Zidane et Fergani. Assad et Madjer étirent la défense allemande ; Belloumi évolue entre les lignes.",
        ar: "خطة 4-3-3 مضغوطة تعتمد على الضغط الجماعي وتمريرات عمودية سريعة عبر دحلب وزيدان وفرقاني. عصّاد وماجر يمدّان الدفاع الألماني، وبلومي يتحرّك بين الخطوط.",
      },
      keyChanges: [
        {
          en: "In the second half Algeria pressed higher after the opening goal and forced West Germany to play long.",
          fr: "En seconde période l'Algérie remonte son bloc après l'ouverture du score et force la RFA à jouer long.",
          ar: "في الشوط الثاني رفعت الجزائر ضغطها بعد هدف التقدّم وأجبرت ألمانيا على اللعب الطويل.",
        },
      ],
    },
    {
      side: "away",
      approach: {
        en: "Jupp Derwall's side lined up in an experienced 4-3-3 with Rummenigge leading and Breitner directing from deep. West Germany dominated possession but struggled to find rhythm against Algeria's pressing.",
        fr: "L'équipe de Jupp Derwall s'aligne en 4-3-3 expérimenté avec Rummenigge en pointe et Breitner à la baguette. La RFA domine la possession mais peine à trouver son rythme face au pressing algérien.",
        ar: "فريق يوب ديرفال يلعب بخطة 4-3-3 محنّكة بقيادة روميننغه في الهجوم وبرايتنر في العمق. سيطرت ألمانيا على الاستحواذ لكنها لم تجد إيقاعها أمام الضغط الجزائري.",
      },
    },
  ],

  narration: [
    {
      id: "narr-intro",
      kind: "intro",
      title: { en: "Before the whistle", fr: "Avant le coup d'envoi", ar: "قبل صافرة البداية" },
      body: {
        en: "El Molinón, Gijón, sixteenth of June nineteen eighty-two. Algeria is playing its very first match at a FIFA World Cup. On the other side of the halfway line stand the reigning European champions, West Germany — a team led by Karl-Heinz Rummenigge and Paul Breitner, one of the favourites for the tournament. Almost no one outside Algeria expects a contest.",
        fr: "El Molinón, Gijón, seize juin mille neuf cent quatre-vingt-deux. L'Algérie dispute sa toute première rencontre en Coupe du monde. En face, les champions d'Europe en titre, la RFA — l'équipe de Rummenigge et Breitner, l'une des favorites du tournoi. Presque personne, hors d'Algérie, n'attend un vrai match.",
        ar: "ملعب إل مولينون في خيخون، السادس عشر من يونيو ١٩٨٢. تخوض الجزائر أوّل مباراة لها في كأس العالم على الإطلاق. في الجهة المقابلة، بطل أوروبا الحامل للّقب، ألمانيا الغربية — فريق روميننغه وبرايتنر، أحد المرشّحين للّقب. لا أحد تقريباً خارج الجزائر ينتظر مباراة حقيقيّة.",
      },
    },
    {
      id: "narr-teams",
      kind: "context",
      title: { en: "The teams take the field", fr: "Les équipes entrent sur la pelouse", ar: "دخول الفريقين" },
      body: {
        en: "Algeria lines up in a 4-3-3, captained by Ali Fergani. Mustapha Dahleb of Paris Saint-Germain chose Algeria over France for this tournament. Lakhdar Belloumi arrives as African Footballer of the Year. Rabah Madjer will lead the line.",
        fr: "L'Algérie s'aligne en 4-3-3, capitainée par Ali Fergani. Mustapha Dahleb, du Paris Saint-Germain, a choisi l'Algérie plutôt que la France pour ce Mondial. Lakhdar Belloumi arrive Ballon d'or africain. Rabah Madjer occupe la pointe.",
        ar: "تنتظم الجزائر بخطّة 4-3-3، بقيادة علي فرقاني. مصطفى دحلب، لاعب باريس سان جيرمان، اختار الجزائر بدل فرنسا في هذا المونديال. الأخضر بلومي يصل بلقب الكرة الذهبية الإفريقية. رابح ماجر في مقدّمة الهجوم.",
      },
    },
    {
      id: "narr-goal-madjer",
      minute: 54,
      kind: "goal",
      title: { en: "54' — Madjer strikes", fr: "54e — Madjer frappe", ar: "الدقيقة ٥٤ — ماجر يسجّل" },
      body: {
        en: "The move begins on the left. Belloumi turns the ball inside. Rabah Madjer, arriving late into the box, drives a low finish past Schumacher. Algeria, playing in its first World Cup, leads the reigning European champions.",
        fr: "L'action naît à gauche. Belloumi rentre le ballon. Rabah Madjer, arrivant en retard dans la surface, glisse une frappe basse imparable à Schumacher. L'Algérie, à sa première Coupe du monde, mène face aux champions d'Europe.",
        ar: "الهجمة تبدأ من اليسار. بلومي يعيد الكرة داخل الملعب. رابح ماجر يصل متأخّراً إلى المنطقة ويسدّد كرة أرضيّة زاحفة تعبر شوماخر. الجزائر، في أوّل مشاركة لها بكأس العالم، تتقدّم على بطل أوروبا.",
      },
    },
    {
      id: "narr-goal-rummenigge",
      minute: 67,
      kind: "goal",
      title: { en: "67' — Rummenigge answers", fr: "67e — Rummenigge répond", ar: "الدقيقة ٦٧ — روميننغه يردّ" },
      body: {
        en: "Karl-Heinz Rummenigge — the captain, the star, the reigning Ballon d'Or runner-up — brings West Germany level. For a brief moment, football's expected order seems restored.",
        fr: "Karl-Heinz Rummenigge — capitaine, star, dauphin en titre du Ballon d'or — remet la RFA à hauteur. Un instant, l'ordre attendu du football semble rétabli.",
        ar: "كارل هاينز روميننغه — القائد والنجم ووصيف الكرة الذهبية — يعيد ألمانيا إلى المباراة. للحظة قصيرة، يبدو أنّ نظام كرة القدم المتوقّع قد استعاد توازنه.",
      },
    },
    {
      id: "narr-goal-belloumi",
      minute: 68,
      kind: "goal",
      title: { en: "68' — Belloumi replies at once", fr: "68e — Belloumi réplique aussitôt", ar: "الدقيقة ٦٨ — بلومي يردّ فوراً" },
      body: {
        en: "The reply is instant. Straight from the restart, Salah Assad drives down the right, whips in a cross, and Belloumi arrives unmarked to volley home. Less than a minute after conceding, Algeria leads again.",
        fr: "La réplique est immédiate. Dès la remise en jeu, Salah Assad file à droite, envoie un centre, et Belloumi arrive seul pour reprendre. Moins d'une minute après avoir encaissé, l'Algérie mène à nouveau.",
        ar: "الرد لحظيّ. مباشرة بعد استئناف اللعب، ينطلق صلاح عصّاد على اليمين ويرسل عرضيّة يجدها بلومي حرًّا ليسدّدها. أقل من دقيقة على استقبال هدف التعادل، والجزائر تتقدّم من جديد.",
      },
    },
    {
      id: "narr-final",
      minute: 90,
      kind: "finalWhistle",
      title: { en: "Full time — 2–1", fr: "Fin du match — 2–1", ar: "نهاية المباراة — ٢–١" },
      body: {
        en: "The final whistle. Algeria has beaten West Germany, two goals to one. It is one of the greatest first-appearance results in the history of the tournament — and, for a nation only twenty years past independence, a moment its people will remember for generations.",
        fr: "Coup de sifflet final. L'Algérie bat la RFA, deux buts à un. C'est l'un des plus grands résultats d'une première participation dans l'histoire du tournoi — et, pour un pays à seulement vingt ans de son indépendance, un instant que son peuple retiendra pour des générations.",
        ar: "صافرة النهاية. الجزائر تفوز على ألمانيا الغربية بهدفين لواحد. إنّها من أعظم نتائج المشاركة الأولى في تاريخ كأس العالم — وبالنسبة لبلد لم يمرّ على استقلاله سوى عشرين عاماً، لحظة سيتذكّرها شعبها لأجيال.",
      },
    },
    {
      id: "narr-legacy",
      kind: "legacy",
      title: { en: "Legacy", fr: "Héritage", ar: "الإرث" },
      body: {
        en: "The result would soon be overshadowed by the events of Gijón nine days later, when West Germany and Austria played out a scoreline that eliminated Algeria — a match that pushed FIFA to require simultaneous kick-offs for final group games ever after. But this evening, this ninety minutes, belongs to Algeria.",
        fr: "Le résultat sera bientôt éclipsé par les événements de Gijón, neuf jours plus tard, quand la RFA et l'Autriche joueront un score qui éliminera l'Algérie — un match qui poussera la FIFA à imposer des coups d'envoi simultanés pour les dernières journées de poule. Mais ce soir-là, ces quatre-vingt-dix minutes appartiennent à l'Algérie.",
        ar: "سيطغى على هذه النتيجة لاحقاً ما جرى في خيخون بعد تسعة أيام، حين لعبت ألمانيا الغربية والنمسا مباراة أقصت الجزائر — مباراة دفعت الفيفا إلى فرض توقيت واحد لمباريات الجولة الأخيرة من دور المجموعات. لكن هذه الأمسية، هذه التسعين دقيقة، من نصيب الجزائر.",
      },
    },
  ],

  context: [
    {
      id: "ctx-pre",
      when: "pre-match",
      title: { en: "First time on the biggest stage", fr: "Pour la première fois sur la plus grande scène", ar: "لأوّل مرّة على أكبر مسرح" },
      body: {
        en: "Algeria had qualified for its very first FIFA World Cup by finishing top of the African qualifiers, unbeaten. For a nation only twenty years removed from independence, simply reaching Spain was already a milestone.",
        fr: "L'Algérie s'est qualifiée pour sa toute première Coupe du monde en terminant en tête des qualifications africaines, invaincue. Pour un pays à seulement vingt ans de son indépendance, atteindre l'Espagne était déjà un jalon.",
        ar: "تأهّلت الجزائر إلى أوّل كأس عالم لها بعد تصدّرها التصفيات الإفريقية دون هزيمة. بالنسبة لبلد لم يمرّ على استقلاله سوى عشرين عاماً، مجرّد الوصول إلى إسبانيا كان في حدّ ذاته إنجازاً.",
      },
    },
    {
      id: "ctx-opponent",
      when: "pre-match",
      title: { en: "Facing the European champions", fr: "Face aux champions d'Europe", ar: "أمام بطل أوروبا" },
      body: {
        en: "West Germany came into the tournament as the reigning European champions (1980), World Cup finalists in 1966 and 1974 (winners) and 1978. They were widely tipped to win the tournament and had lost only two of their last twenty-three internationals.",
        fr: "La RFA arrive au tournoi en championne d'Europe en titre (1980), finaliste en 1966 et 1974 (vainqueur) et 1978. Elle est donnée grande favorite et n'a perdu que deux de ses vingt-trois derniers matchs internationaux.",
        ar: "دخلت ألمانيا الغربية البطولة وهي بطل أوروبا الحامل للّقب (١٩٨٠)، ووصيفة العالم في ١٩٦٦ وبطلته في ١٩٧٤، ووصيفته في ١٩٧٨. اعتُبرت من أوفر المرشّحين للّقب ولم تخسر سوى مباراتين في آخر ثلاث وعشرين مباراة دوليّة.",
      },
    },
    {
      id: "ctx-reaction",
      when: "post-match",
      title: { en: "How the world reacted", fr: "La réaction du monde", ar: "كيف تفاعل العالم" },
      body: {
        en: "International media described the result as one of the great World Cup surprises. Contemporary reporting in Europe and Africa gave the match significant coverage; the FIFA archive lists it among the tournament's landmark results.",
        fr: "La presse internationale a décrit ce résultat comme l'une des grandes surprises de l'histoire du Mondial. Les récits contemporains, en Europe comme en Afrique, lui ont accordé une large place ; les archives de la FIFA le classent parmi les résultats marquants du tournoi.",
        ar: "وصفت الصحف الدولية هذه النتيجة بأنّها من أكبر مفاجآت تاريخ كأس العالم. تناولتها التقارير المعاصرة في أوروبا وإفريقيا بتغطية واسعة، وتُدرجها أرشيفات الفيفا ضمن نتائج البطولة الفارقة.",
      },
    },
    {
      id: "ctx-identity",
      when: "legacy",
      title: { en: "A moment for a young nation", fr: "Un moment pour une jeune nation", ar: "لحظة لأمّة فتيّة" },
      body: {
        en: "Twenty years after independence, this ninety-minute performance placed Algeria on a stage watched by hundreds of millions. It became a shared reference point of national pride — remembered not as an isolated sporting upset, but as one evening when the young republic was seen and heard around the world on its own terms.",
        fr: "Vingt ans après l'indépendance, ces quatre-vingt-dix minutes ont placé l'Algérie sur une scène suivie par des centaines de millions de spectateurs. Le match est devenu une référence partagée de fierté nationale — non pas un simple exploit sportif isolé, mais un soir où la jeune république s'est fait voir et entendre à ses propres conditions.",
        ar: "بعد عشرين عاماً على الاستقلال، وضعت هذه التسعون دقيقة الجزائر على مسرح يتابعه مئات الملايين. أصبحت المباراة مرجعاً مشتركاً للفخر الوطني — لا كإنجاز رياضي معزول، بل كأمسية جعلت الجمهورية الفتيّة تُرى وتُسمع في العالم بشروطها الخاصّة.",
      },
    },
  ],

  gallery: [
    { id: "team-photo", kind: "photo", caption: { en: "Algeria squad photograph before the match.", fr: "Photo de l'équipe d'Algérie avant le match.", ar: "صورة جماعية لمنتخب الجزائر قبل المباراة." }, date: "1982-06-16", source: { en: "FIFA archive / national federation photograph.", fr: "Archive FIFA / photographie de la fédération.", ar: "أرشيف الفيفا / صورة الاتحاد الوطني." }, rights: { en: "Rights holders retain all rights. Manual sourcing required before display.", fr: "Les droits appartiennent à leurs détenteurs. À sourcer manuellement avant affichage.", ar: "الحقوق محفوظة لأصحابها. يتطلّب توثيقًا يدوياً قبل العرض." }, reproduction: false },
    { id: "stadium-view", kind: "photo", caption: { en: "Estadio El Molinón, Gijón, 1982.", fr: "Estadio El Molinón, Gijón, 1982.", ar: "ملعب إل مولينون، خيخون، ١٩٨٢." }, date: "1982", source: { en: "Contemporary press photograph — publisher to confirm.", fr: "Photographie de presse d'époque — éditeur à confirmer.", ar: "صورة صحفية معاصرة — الناشر بحاجة إلى تأكيد." }, reproduction: false },
    { id: "madjer-portrait", kind: "portrait", caption: { en: "Rabah Madjer, forward.", fr: "Rabah Madjer, attaquant.", ar: "رابح ماجر، مهاجم." }, source: { en: "Publisher and licence to confirm.", fr: "Éditeur et licence à confirmer.", ar: "الناشر والترخيص بحاجة إلى تأكيد." }, reproduction: false },
    { id: "belloumi-portrait", kind: "portrait", caption: { en: "Lakhdar Belloumi, African Footballer of the Year 1981.", fr: "Lakhdar Belloumi, Ballon d'or africain 1981.", ar: "الأخضر بلومي، الكرة الذهبية الإفريقية ١٩٨١." }, source: { en: "Publisher and licence to confirm.", fr: "Éditeur et licence à confirmer.", ar: "الناشر والترخيص بحاجة إلى تأكيد." }, reproduction: false },
    { id: "match-programme", kind: "program", caption: { en: "1982 FIFA World Cup — Group 2 programme.", fr: "Coupe du monde FIFA 1982 — programme du Groupe 2.", ar: "كأس العالم ١٩٨٢ — كتيّب المجموعة الثانية." }, date: "1982-06", source: { en: "FIFA — 1982 tournament programme.", fr: "FIFA — programme du tournoi 1982.", ar: "الفيفا — كتيّب بطولة ١٩٨٢." }, reproduction: false },
    { id: "front-page", kind: "newspaper", caption: { en: "Front-page coverage of the result — international press, 17 June 1982.", fr: "Une des journaux — presse internationale, 17 juin 1982.", ar: "الصفحات الأولى للصحف الدولية — ١٧ يونيو ١٩٨٢." }, date: "1982-06-17", source: { en: "El País archive, L'Équipe archive, El Moudjahid archive — verify before republishing.", fr: "Archives El País, L'Équipe, El Moudjahid — à vérifier avant republication.", ar: "أرشيف إل باييس ولوكيب والمجاهد — تحقّق قبل إعادة النشر." }, reproduction: false },
    { id: "poster", kind: "poster", caption: { en: "Official 1982 FIFA World Cup poster.", fr: "Affiche officielle de la Coupe du monde 1982.", ar: "الملصق الرسمي لكأس العالم ١٩٨٢." }, date: "1982", source: { en: "FIFA — official 1982 tournament poster.", fr: "FIFA — affiche officielle du tournoi 1982.", ar: "الفيفا — الملصق الرسمي لبطولة ١٩٨٢." }, reproduction: false },
    { id: "jersey", kind: "jersey", caption: { en: "Algeria home shirt, 1982 — Le Coq Sportif.", fr: "Maillot domicile Algérie, 1982 — Le Coq Sportif.", ar: "قميص الجزائر الأساسي ١٩٨٢ — لو كوك سبورتيف." }, date: "1982", source: { en: "FAF collection.", fr: "Collection FAF.", ar: "مقتنيات الاتحاد الجزائري لكرة القدم." }, reproduction: true },
  ],

  sources: [
    { id: "fifa", label: { en: "FIFA official match report — Algeria vs West Germany, 16 June 1982.", fr: "Rapport de match officiel FIFA — Algérie / RFA, 16 juin 1982.", ar: "التقرير الرسمي للفيفا — الجزائر / ألمانيا الغربية، ١٦ يونيو ١٩٨٢." }, publisher: { en: "FIFA", fr: "FIFA", ar: "الفيفا" } },
    { id: "rsssf", label: { en: "RSSSF — 1982 FIFA World Cup archive.", fr: "RSSSF — archive Coupe du monde 1982.", ar: "RSSSF — أرشيف كأس العالم ١٩٨٢." } },
    { id: "elpais", label: { en: "El País — match reporting, June 1982.", fr: "El País — comptes rendus, juin 1982.", ar: "إل باييس — تغطيات، يونيو ١٩٨٢." } },
    { id: "lequipe", label: { en: "L'Équipe — archive coverage, June 1982.", fr: "L'Équipe — archives, juin 1982.", ar: "لوكيب — أرشيف، يونيو ١٩٨٢." } },
    { id: "faf", label: { en: "Fédération Algérienne de Football — 1982 World Cup archives.", fr: "Fédération Algérienne de Football — archives Mondial 1982.", ar: "الاتحاد الجزائري لكرة القدم — أرشيف مونديال ١٩٨٢." } },
  ],

  quiz: [
    {
      id: "q1",
      question: { en: "Who scored Algeria's first goal in the match?", fr: "Qui a marqué le premier but de l'Algérie ?", ar: "من سجّل هدف الجزائر الأوّل في المباراة ؟" },
      choices: [
        { en: "Rabah Madjer", fr: "Rabah Madjer", ar: "رابح ماجر" },
        { en: "Lakhdar Belloumi", fr: "Lakhdar Belloumi", ar: "الأخضر بلومي" },
        { en: "Salah Assad", fr: "Salah Assad", ar: "صلاح عصّاد" },
        { en: "Mustapha Dahleb", fr: "Mustapha Dahleb", ar: "مصطفى دحلب" },
      ],
      answerIndex: 0,
      rationale: { en: "Rabah Madjer scored in the 54th minute.", fr: "Rabah Madjer marque à la 54e minute.", ar: "سجّل رابح ماجر في الدقيقة الـ٥٤." },
    },
    {
      id: "q2",
      question: { en: "How quickly did Algeria respond after West Germany equalised?", fr: "En combien de temps l'Algérie a-t-elle répondu à l'égalisation allemande ?", ar: "كم استغرقت الجزائر للردّ على هدف التعادل الألماني ؟" },
      choices: [
        { en: "Within one minute", fr: "En moins d'une minute", ar: "في أقلّ من دقيقة" },
        { en: "About ten minutes later", fr: "Environ dix minutes plus tard", ar: "بعد نحو عشر دقائق" },
        { en: "After half-time only", fr: "Seulement après la mi-temps", ar: "بعد الاستراحة فقط" },
        { en: "It never did — the match ended 1–1", fr: "Elle n'a pas répondu — 1–1 final", ar: "لم تردّ — انتهت ١–١" },
      ],
      answerIndex: 0,
      rationale: { en: "Belloumi scored in the 68th minute — inside a minute of the 67th-minute equaliser.", fr: "Belloumi marque à la 68e minute — moins d'une minute après l'égalisation de la 67e.", ar: "بلومي سجّل في الدقيقة الـ٦٨ — بعد أقلّ من دقيقة من هدف التعادل في الـ٦٧." },
    },
    {
      id: "q3",
      question: { en: "Where was the match played?", fr: "Où le match a-t-il eu lieu ?", ar: "أين أُقيمت المباراة ؟" },
      choices: [
        { en: "Estadio El Molinón, Gijón, Spain", fr: "Estadio El Molinón, Gijón, Espagne", ar: "ملعب إل مولينون، خيخون، إسبانيا" },
        { en: "Camp Nou, Barcelona", fr: "Camp Nou, Barcelone", ar: "كامب نو، برشلونة" },
        { en: "Santiago Bernabéu, Madrid", fr: "Santiago Bernabéu, Madrid", ar: "سانتياغو برنابيو، مدريد" },
        { en: "Estadio Vicente Calderón, Madrid", fr: "Estadio Vicente Calderón, Madrid", ar: "فيسنتي كالديرون، مدريد" },
      ],
      answerIndex: 0,
      rationale: { en: "The Group 2 opener was played at El Molinón in Gijón on 16 June 1982.", fr: "L'ouverture du Groupe 2 s'est jouée à El Molinón, Gijón, le 16 juin 1982.", ar: "أُقيمت افتتاحية المجموعة الثانية في إل مولينون بخيخون يوم ١٦ يونيو ١٩٨٢." },
    },
    {
      id: "q4",
      question: { en: "Why was this result historically significant?", fr: "Pourquoi ce résultat est-il historiquement important ?", ar: "لماذا هذه النتيجة مهمّة تاريخيّاً ؟" },
      choices: [
        { en: "Algeria, in its first World Cup, beat the reigning European champions.", fr: "L'Algérie, à sa première Coupe du monde, bat les champions d'Europe en titre.", ar: "الجزائر، في أوّل مشاركة لها بالمونديال، تفوز على بطل أوروبا الحامل للّقب." },
        { en: "Algeria won the 1982 World Cup.", fr: "L'Algérie a gagné la Coupe du monde 1982.", ar: "الجزائر فازت بكأس العالم ١٩٨٢." },
        { en: "It was the first match of the tournament.", fr: "C'était le premier match du tournoi.", ar: "كانت المباراة الأولى للبطولة." },
        { en: "It was the final of the tournament.", fr: "C'était la finale du tournoi.", ar: "كانت نهائي البطولة." },
      ],
      answerIndex: 0,
      rationale: { en: "Algeria was a first-time World Cup participant; West Germany were the reigning European champions and eventual 1982 finalists.", fr: "L'Algérie disputait son premier Mondial ; la RFA était championne d'Europe en titre et finaliste du Mondial 1982.", ar: "كانت الجزائر تخوض أوّل مشاركة لها في المونديال، وكانت ألمانيا الغربية بطلة أوروبا الحاملة للّقب ووصيفة مونديال ١٩٨٢." },
    },
    {
      id: "q5",
      question: { en: "Which tournament was this match part of?", fr: "De quel tournoi faisait partie ce match ?", ar: "ضمن أيّ بطولة أُقيمت هذه المباراة ؟" },
      choices: [
        { en: "1982 FIFA World Cup, Spain", fr: "Coupe du monde FIFA 1982, Espagne", ar: "كأس العالم لكرة القدم ١٩٨٢، إسبانيا" },
        { en: "1980 UEFA European Championship", fr: "Euro 1980", ar: "بطولة أوروبا ١٩٨٠" },
        { en: "1982 Africa Cup of Nations", fr: "CAN 1982", ar: "كأس إفريقيا للأمم ١٩٨٢" },
        { en: "1984 Summer Olympics", fr: "Jeux olympiques d'été 1984", ar: "أولمبياد صيف ١٩٨٤" },
      ],
      answerIndex: 0,
      rationale: { en: "Group 2, matchday 1 of the 1982 FIFA World Cup, held in Spain.", fr: "Groupe 2, 1re journée, Coupe du monde FIFA 1982 en Espagne.", ar: "المجموعة الثانية، الجولة الأولى، كأس العالم لكرة القدم ١٩٨٢ في إسبانيا." },
    },
  ],

  relatedExhibits: [
    { label: { en: "The Shame of Gijón", fr: "La Honte de Gijón", ar: "فضيحة خيخون" }, href: "/football" },
    { label: { en: "Algeria at the 1982 World Cup", fr: "L'Algérie au Mondial 1982", ar: "الجزائر في مونديال ١٩٨٢" }, href: "/football" },
    { label: { en: "Rabah Madjer — Legends Hall", fr: "Rabah Madjer — Panthéon", ar: "رابح ماجر — قاعة الأساطير" }, href: "/football" },
    { label: { en: "Lakhdar Belloumi — Legends Hall", fr: "Lakhdar Belloumi — Panthéon", ar: "الأخضر بلومي — قاعة الأساطير" }, href: "/football" },
    { label: { en: "The FLN Team", fr: "L'Équipe du FLN", ar: "منتخب جبهة التحرير" }, href: "/football" },
  ],

  passportStamp: {
    id: "witness-gijon-1982",
    title: { en: "Witness to Gijón — 1982", fr: "Témoin de Gijón — 1982", ar: "شاهد على خيخون — ١٩٨٢" },
    hint: { en: "Complete the Match Theater experience of Algeria 2–1 West Germany.", fr: "Terminer l'expérience Match Theater de Algérie 2–1 RFA.", ar: "أكمل تجربة مسرح المباراة للجزائر ٢–١ ألمانيا." },
  },

  finalReflection: {
    en: "Algeria had arrived on the World Cup stage.",
    fr: "L'Algérie était arrivée sur la scène de la Coupe du monde.",
    ar: "لقد وصلت الجزائر إلى مسرح كأس العالم.",
  },
};

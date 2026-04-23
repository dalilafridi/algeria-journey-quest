import type { LocalizedString } from "@/lib/i18n";

const L = (en: string, fr: string, ar: string): LocalizedString => ({ en, fr, ar });

export type CinemaTheme = "identity" | "resistance" | "youth" | "memory" | "women" | "society";

export type FeaturedFilm = {
  id: string;
  title: LocalizedString;
  year: number;
  description: LocalizedString;
  theme: CinemaTheme;
  director?: LocalizedString;
};

export type CinemaQuizQuestion = {
  id: string;
  prompt: LocalizedString;
  options: LocalizedString[];
  answerIndex: number;
  explanation: LocalizedString;
};

export const cinemaThemeLabels: Record<CinemaTheme, LocalizedString> = {
  identity: L("Identity", "Identité", "الهوية"),
  resistance: L("Resistance", "Résistance", "المقاومة"),
  youth: L("Youth", "Jeunesse", "الشباب"),
  memory: L("Memory", "Mémoire", "الذاكرة"),
  women: L("Women", "Femmes", "النساء"),
  society: L("Society", "Société", "المجتمع"),
};

export const featuredFilms: FeaturedFilm[] = [
  {
    id: "battle-of-algiers",
    title: L("The Battle of Algiers", "La Bataille d'Alger", "معركة الجزائر"),
    year: 1966,
    director: L("Gillo Pontecorvo", "Gillo Pontecorvo", "جيلو بونتيكورفو"),
    theme: "resistance",
    description: L(
      "A landmark film about the struggle for independence in Algiers, told with a documentary-like urgency and a focus on collective experience.",
      "Un film majeur sur la lutte pour l'indépendance à Alger, porté par une force proche du documentaire et par l'expérience collective.",
      "فيلم بارز عن الكفاح من أجل الاستقلال في الجزائر العاصمة، بأسلوب قريب من الوثائقي وتركيز على التجربة الجماعية.",
    ),
  },
  {
    id: "chronicle-years-fire",
    title: L("Chronicle of the Years of Fire", "Chronique des années de braise", "وقائع سنين الجمر"),
    year: 1975,
    director: L("Mohammed Lakhdar-Hamina", "Mohammed Lakhdar-Hamina", "محمد الأخضر حمينة"),
    theme: "memory",
    description: L(
      "An epic journey through hardship, awakening and national memory before independence, remembered as a milestone of Algerian cinema.",
      "Une fresque sur les épreuves, l'éveil et la mémoire nationale avant l'indépendance, devenue un jalon du cinéma algérien.",
      "ملحمة عن المعاناة والوعي والذاكرة الوطنية قبل الاستقلال، وتُعد محطة مهمة في السينما الجزائرية.",
    ),
  },
  {
    id: "omar-gatlato",
    title: L("Omar Gatlato", "Omar Gatlato", "عمر قتلاتو"),
    year: 1976,
    director: L("Merzak Allouache", "Merzak Allouache", "مرزاق علواش"),
    theme: "youth",
    description: L(
      "A lively portrait of urban youth in post-independence Algiers, balancing humor, music and questions of identity.",
      "Un portrait vivant de la jeunesse urbaine dans l'Alger d'après l'indépendance, entre humour, musique et questions d'identité.",
      "صورة حيوية لشباب المدينة في الجزائر بعد الاستقلال، تمزج الفكاهة والموسيقى وأسئلة الهوية.",
    ),
  },
  {
    id: "bab-el-oued-city",
    title: L("Bab El-Oued City", "Bab El-Oued City", "باب الواد سيتي"),
    year: 1994,
    director: L("Merzak Allouache", "Merzak Allouache", "مرزاق علواش"),
    theme: "society",
    description: L(
      "A tense yet human look at daily life, public space and social pressure in an Algiers neighborhood.",
      "Un regard tendu mais humain sur le quotidien, l'espace public et les pressions sociales dans un quartier d'Alger.",
      "نظرة إنسانية ومتوترة إلى الحياة اليومية والفضاء العام والضغط الاجتماعي في حي من أحياء الجزائر العاصمة.",
    ),
  },
  {
    id: "rachida",
    title: L("Rachida", "Rachida", "رشيدة"),
    year: 2002,
    director: L("Yamina Bachir-Chouikh", "Yamina Bachir-Chouikh", "يمينة بشير شويخ"),
    theme: "women",
    description: L(
      "A respectful story of a teacher's courage and resilience, centered on education, dignity and the lives of women.",
      "L'histoire respectueuse du courage et de la résilience d'une enseignante, centrée sur l'éducation, la dignité et la vie des femmes.",
      "حكاية محترمة عن شجاعة معلمة وصمودها، تتمحور حول التعليم والكرامة وحياة النساء.",
    ),
  },
  {
    id: "barakat",
    title: L("Barakat!", "Barakat!", "بركات!"),
    year: 2006,
    director: L("Djamila Sahraoui", "Djamila Sahraoui", "جميلة صحراوي"),
    theme: "women",
    description: L(
      "A grounded film about two women moving through uncertainty with courage, care and moral clarity.",
      "Un film ancré dans le réel sur deux femmes qui traversent l'incertitude avec courage, soin et clarté morale.",
      "فيلم واقعي عن امرأتين تعبران القلق بالشجاعة والرعاية والوضوح الأخلاقي.",
    ),
  },
  {
    id: "outside-the-law",
    title: L("Outside the Law", "Hors-la-loi", "خارجون عن القانون"),
    year: 2010,
    director: L("Rachid Bouchareb", "Rachid Bouchareb", "رشيد بوشارب"),
    theme: "memory",
    description: L(
      "A family story shaped by colonial history, migration and the long echo of Algeria's struggle for independence.",
      "Une histoire familiale marquée par l'histoire coloniale, la migration et l'écho durable de la lutte pour l'indépendance.",
      "حكاية عائلية تشكّلت بالتاريخ الاستعماري والهجرة وصدى النضال من أجل الاستقلال.",
    ),
  },
  {
    id: "papicha",
    title: L("Papicha", "Papicha", "بابيشا"),
    year: 2019,
    theme: "identity",
    description: L(
      "A coming-of-age story about creativity, friendship and young women's search for self-expression.",
      "Un récit d'apprentissage sur la créativité, l'amitié et la quête d'expression de jeunes femmes.",
      "حكاية نضج عن الإبداع والصداقة وسعي الشابات للتعبير عن الذات.",
    ),
  },
];

export const cinemaQuiz: CinemaQuizQuestion[] = [
  {
    id: "director-omar-gatlato",
    prompt: L("Who directed Omar Gatlato?", "Qui a réalisé Omar Gatlato ?", "من أخرج فيلم عمر قتلاتو؟"),
    options: [L("Merzak Allouache", "Merzak Allouache", "مرزاق علواش"), L("Rachid Bouchareb", "Rachid Bouchareb", "رشيد بوشارب"), L("Djamila Sahraoui", "Djamila Sahraoui", "جميلة صحراوي")],
    answerIndex: 0,
    explanation: L("Omar Gatlato is one of Merzak Allouache's best-known films about urban youth.", "Omar Gatlato est l'un des films les plus connus de Merzak Allouache sur la jeunesse urbaine.", "عمر قتلاتو من أشهر أفلام مرزاق علواش عن شباب المدينة."),
  },
  {
    id: "theme-rachida",
    prompt: L("What theme does Rachida strongly explore?", "Quel thème Rachida explore-t-il fortement ?", "ما الموضوع الذي يستكشفه فيلم رشيدة بوضوح؟"),
    options: [L("Women", "Femmes", "النساء"), L("Ancient trade", "Commerce antique", "التجارة القديمة"), L("Sea travel", "Voyage maritime", "السفر البحري")],
    answerIndex: 0,
    explanation: L("Rachida centers a woman's courage, education and resilience.", "Rachida met au centre le courage, l'éducation et la résilience d'une femme.", "يركز رشيدة على شجاعة امرأة والتعليم والصمود."),
  },
  {
    id: "tf-chronicle",
    prompt: L("True or false: Chronicle of the Years of Fire is linked to national memory.", "Vrai ou faux : Chronique des années de braise est lié à la mémoire nationale.", "صح أم خطأ: يرتبط فيلم وقائع سنين الجمر بالذاكرة الوطنية."),
    options: [L("True", "Vrai", "صحيح"), L("False", "Faux", "خطأ")],
    answerIndex: 0,
    explanation: L("The film is widely remembered as an epic of Algeria's path toward independence.", "Le film est largement retenu comme une fresque du chemin de l'Algérie vers l'indépendance.", "يُذكر الفيلم كملحمة عن مسار الجزائر نحو الاستقلال."),
  },
];
import type { LocalizedString } from "@/lib/i18n";

const L = (en: string, fr: string, ar: string): LocalizedString => ({ en, fr, ar });

export type FigureExtras = {
  /** Short "Did you know?" blurb. */
  didYouKnow?: LocalizedString;
  /** Key works, songs, books, monuments, places linked to the figure. */
  keyPlacesAndWorks?: { emoji: string; label: LocalizedString; note?: LocalizedString }[];
  /** Long-form museum narrative sections (heading + paragraphs). */
  narrativeSections?: { heading: LocalizedString; body: LocalizedString[] }[];
  /** Optional related-region panel linking the figure to a region exhibit. */
  regionPanel?: {
    heading: LocalizedString;
    body: LocalizedString;
    regionId: string;
    linkLabel: LocalizedString;
    localityLabel?: LocalizedString;
  };
  /** Optional related historical event panel (figure to event link). */
  eventPanel?: {
    heading: LocalizedString;
    body: LocalizedString;
    dateLabel?: LocalizedString;
    /** Route path of the exhibit that tells the event. */
    to: string;
    /** Optional in-page anchor on that exhibit. */
    hash?: string;
    linkLabel: LocalizedString;
  };
};


export const figureExtras: Record<string, FigureExtras> = {
  "mohammed-arkoun": {
    didYouKnow: L(
      "Kabyle was Arkoun's mother tongue, while French and Arabic became the languages of his teaching and scholarship. He often described this passage between languages as part of his method.",
      "Le kabyle était la langue maternelle d'Arkoun, tandis que le français et l'arabe devinrent les langues de son enseignement et de ses recherches. Il décrivait souvent ce passage entre les langues comme faisant partie de sa méthode.",
      "كانت القبائلية لغة أركون الأم، فيما صارت الفرنسية والعربية لغتي تدريسه وبحثه. وقد وصف هذا العبور بين اللغات بأنه جزء من منهجه.",
    ),
    narrativeSections: [
      {
        heading: L("From Ath Yenni to the Sorbonne", "D\u2019Ath Yenni \u00e0 la Sorbonne", "\u0645\u0646 \u0622\u062b \u064a\u0646\u064a \u0625\u0644\u0649 \u0627\u0644\u0633\u0648\u0631\u0628\u0648\u0646"),
        body: [
          L(
            "Arkoun was born on 1 February 1928 in Taourirt Mimoun, a Kabyle-speaking village in Ath Yenni, Kabylie. His early life placed him at the meeting point of several languages and cultural worlds. Kabyle was his mother tongue, while French and Arabic became central to his education and scholarship.",
            "Arkoun na\u00eet le 1er f\u00e9vrier 1928 \u00e0 Taourirt Mimoun, village kabylophone d\u2019Ath Yenni, en Kabylie. Ses premi\u00e8res ann\u00e9es le placent au croisement de plusieurs langues et de plusieurs mondes culturels. Le kabyle est sa langue maternelle, tandis que le fran\u00e7ais et l\u2019arabe deviennent essentiels \u00e0 sa formation et \u00e0 ses travaux.",
            "\u0648\u064f\u0644\u062f \u0623\u0631\u0643\u0648\u0646 \u0641\u064a \u0627\u0644\u0623\u0648\u0644 \u0645\u0646 \u0641\u0628\u0631\u0627\u064a\u0631 1928 \u0641\u064a \u062a\u0627\u0648\u0631\u064a\u0631\u062a \u0645\u064a\u0645\u0648\u0646\u060c \u0648\u0647\u064a \u0642\u0631\u064a\u0629 \u0646\u0627\u0637\u0642\u0629 \u0628\u0627\u0644\u0642\u0628\u0627\u0626\u0644\u064a\u0629 \u0641\u064a \u0622\u062b \u064a\u0646\u064a \u0628\u0645\u0646\u0637\u0642\u0629 \u0627\u0644\u0642\u0628\u0627\u0626\u0644. \u0648\u0636\u0639\u062a\u0647 \u0633\u0646\u0648\u0627\u062a\u0647 \u0627\u0644\u0623\u0648\u0644\u0649 \u0639\u0646\u062f \u0645\u0644\u062a\u0642\u0649 \u0644\u063a\u0627\u062a \u0648\u0639\u0648\u0627\u0644\u0645 \u062b\u0642\u0627\u0641\u064a\u0629 \u0645\u062a\u0639\u062f\u062f\u0629\u061b \u0641\u0627\u0644\u0642\u0628\u0627\u0626\u0644\u064a\u0629 \u0644\u063a\u062a\u0647 \u0627\u0644\u0623\u0645\u060c \u0641\u064a\u0645\u0627 \u063a\u062f\u062a \u0627\u0644\u0641\u0631\u0646\u0633\u064a\u0629 \u0648\u0627\u0644\u0639\u0631\u0628\u064a\u0629 \u0645\u062d\u0648\u0631 \u062a\u0639\u0644\u064a\u0645\u0647 \u0648\u0628\u062d\u062b\u0647.",
          ),
          L(
            "He studied literature at the University of Algiers and continued his education at the Sorbonne in Paris. He earned the agr\u00e9gation in Arabic language and literature in 1956 and completed a doctorate in 1968. His early scholarship focused on the philosopher and historian Ibn Miskawayh and the humanist traditions of classical Islamic thought.",
            "Il \u00e9tudie la litt\u00e9rature \u00e0 l\u2019Universit\u00e9 d\u2019Alger, puis poursuit sa formation \u00e0 la Sorbonne, \u00e0 Paris. Il obtient l\u2019agr\u00e9gation de langue et litt\u00e9rature arabes en 1956 et ach\u00e8ve un doctorat en 1968. Ses premiers travaux portent sur le philosophe et historien Ibn Miskawayh et sur les traditions humanistes de la pens\u00e9e islamique classique.",
            "\u062f\u0631\u0633 \u0627\u0644\u0623\u062f\u0628 \u0641\u064a \u062c\u0627\u0645\u0639\u0629 \u0627\u0644\u062c\u0632\u0627\u0626\u0631\u060c \u062b\u0645 \u0648\u0627\u0635\u0644 \u062f\u0631\u0627\u0633\u062a\u0647 \u0641\u064a \u0627\u0644\u0633\u0648\u0631\u0628\u0648\u0646 \u0628\u0628\u0627\u0631\u064a\u0633. \u0646\u0627\u0644 \u0634\u0647\u0627\u062f\u0629 \u0627\u0644\u062a\u0628\u0631\u064a\u0632 \u0641\u064a \u0627\u0644\u0644\u063a\u0629 \u0627\u0644\u0639\u0631\u0628\u064a\u0629 \u0648\u0622\u062f\u0627\u0628\u0647\u0627 \u0633\u0646\u0629 1956\u060c \u0648\u0623\u0646\u062c\u0632 \u0627\u0644\u062f\u0643\u062a\u0648\u0631\u0627\u0647 \u0633\u0646\u0629 1968. \u0648\u0627\u0646\u0635\u0628\u0651\u062a \u0623\u0628\u062d\u0627\u062b\u0647 \u0627\u0644\u0623\u0648\u0644\u0649 \u0639\u0644\u0649 \u0627\u0644\u0641\u064a\u0644\u0633\u0648\u0641 \u0648\u0627\u0644\u0645\u0624\u0631\u062e \u0627\u0628\u0646 \u0645\u0633\u0643\u0648\u064a\u0647 \u0648\u0639\u0644\u0649 \u0627\u0644\u062a\u0642\u0627\u0644\u064a\u062f \u0627\u0644\u0625\u0646\u0633\u0627\u0646\u064a\u0629 \u0641\u064a \u0627\u0644\u0641\u0643\u0631 \u0627\u0644\u0625\u0633\u0644\u0627\u0645\u064a \u0627\u0644\u0643\u0644\u0627\u0633\u064a\u0643\u064a.",
          ),
          L(
            "Arkoun later taught at institutions including Lyon II, Paris VIII and the Sorbonne Nouvelle. He also served as a visiting professor and researcher at universities and institutes across Europe and the United States.",
            "Arkoun enseigne ensuite dans plusieurs institutions, dont Lyon II, Paris VIII et la Sorbonne Nouvelle. Il est \u00e9galement professeur invit\u00e9 et chercheur dans des universit\u00e9s et instituts en Europe et aux \u00c9tats-Unis.",
            "\u062f\u0631\u0651\u0633 \u0623\u0631\u0643\u0648\u0646 \u0644\u0627\u062d\u0642\u064b\u0627 \u0641\u064a \u0645\u0624\u0633\u0633\u0627\u062a \u0645\u0646\u0647\u0627 \u0644\u064a\u0648\u0646 \u0627\u0644\u062b\u0627\u0646\u064a\u0629 \u0648\u0628\u0627\u0631\u064a\u0633 \u0627\u0644\u062b\u0627\u0645\u0646\u0629 \u0648\u0627\u0644\u0633\u0648\u0631\u0628\u0648\u0646 \u0627\u0644\u062c\u062f\u064a\u062f\u0629\u060c \u0643\u0645\u0627 \u0639\u0645\u0644 \u0623\u0633\u062a\u0627\u0630\u064b\u0627 \u0632\u0627\u0626\u0631\u064b\u0627 \u0648\u0628\u0627\u062d\u062b\u064b\u0627 \u0641\u064a \u062c\u0627\u0645\u0639\u0627\u062a \u0648\u0645\u0639\u0627\u0647\u062f \u0641\u064a \u0623\u0648\u0631\u0648\u0628\u0627 \u0648\u0627\u0644\u0648\u0644\u0627\u064a\u0627\u062a \u0627\u0644\u0645\u062a\u062d\u062f\u0629.",
          ),
        ],
      },
      {
        heading: L("Rethinking Islamic thought", "Repenser la pens\u00e9e islamique", "\u0625\u0639\u0627\u062f\u0629 \u0627\u0644\u062a\u0641\u0643\u064a\u0631 \u0641\u064a \u0627\u0644\u0641\u0643\u0631 \u0627\u0644\u0625\u0633\u0644\u0627\u0645\u064a"),
        body: [
          L(
            "Arkoun\u2019s central project was a critique of Islamic reason. He wanted scholars and societies to examine how religious knowledge had been constructed, which interpretations had gained authority, and which voices or possibilities had been excluded.",
            "Le projet central d\u2019Arkoun fut une critique de la raison islamique. Il souhaitait que les chercheurs et les soci\u00e9t\u00e9s examinent comment le savoir religieux avait \u00e9t\u00e9 construit, quelles interpr\u00e9tations avaient acquis autorit\u00e9, et quelles voix ou possibilit\u00e9s avaient \u00e9t\u00e9 exclues.",
            "\u0643\u0627\u0646 \u0645\u0634\u0631\u0648\u0639 \u0623\u0631\u0643\u0648\u0646 \u0627\u0644\u0645\u0631\u0643\u0632\u064a \u0646\u0642\u062f \u0627\u0644\u0639\u0642\u0644 \u0627\u0644\u0625\u0633\u0644\u0627\u0645\u064a. \u0641\u0642\u062f \u0623\u0631\u0627\u062f \u0645\u0646 \u0627\u0644\u0628\u0627\u062d\u062b\u064a\u0646 \u0648\u0627\u0644\u0645\u062c\u062a\u0645\u0639\u0627\u062a \u0623\u0646 \u064a\u0646\u0638\u0631\u0648\u0627 \u0641\u064a \u0643\u064a\u0641\u064a\u0629 \u0628\u0646\u0627\u0621 \u0627\u0644\u0645\u0639\u0631\u0641\u0629 \u0627\u0644\u062f\u064a\u0646\u064a\u0629\u060c \u0648\u0641\u064a \u0627\u0644\u062a\u0623\u0648\u064a\u0644\u0627\u062a \u0627\u0644\u062a\u064a \u0627\u0643\u062a\u0633\u0628\u062a \u0633\u0644\u0637\u0629\u060c \u0648\u0641\u064a \u0627\u0644\u0623\u0635\u0648\u0627\u062a \u0648\u0627\u0644\u0625\u0645\u0643\u0627\u0646\u0627\u062a \u0627\u0644\u062a\u064a \u0627\u0633\u062a\u064f\u0628\u0639\u062f\u062a.",
          ),
          L(
            "His purpose was not simply to reject tradition. He sought to study it historically, recover its intellectual diversity and create room for renewed interpretation. He argued that Islamic thought could engage modern knowledge without being reduced either to rigid dogma or to outside stereotypes about Islam.",
            "Son but n\u2019\u00e9tait pas de rejeter la tradition. Il cherchait \u00e0 l\u2019\u00e9tudier historiquement, \u00e0 en retrouver la diversit\u00e9 intellectuelle et \u00e0 ouvrir un espace pour une interpr\u00e9tation renouvel\u00e9e. Selon lui, la pens\u00e9e islamique pouvait dialoguer avec les savoirs modernes sans se r\u00e9duire ni \u00e0 un dogme rigide ni aux st\u00e9r\u00e9otypes ext\u00e9rieurs sur l\u2019islam.",
            "\u0644\u0645 \u064a\u0643\u0646 \u0647\u062f\u0641\u0647 \u0631\u0641\u0636 \u0627\u0644\u062a\u0642\u0644\u064a\u062f\u060c \u0628\u0644 \u062f\u0631\u0627\u0633\u062a\u0647 \u062a\u0627\u0631\u064a\u062e\u064a\u064b\u0627 \u0648\u0627\u0633\u062a\u0639\u0627\u062f\u0629 \u062a\u0646\u0648\u0651\u0639\u0647 \u0627\u0644\u0641\u0643\u0631\u064a \u0648\u0641\u062a\u062d \u0645\u062c\u0627\u0644 \u0644\u062a\u0623\u0648\u064a\u0644 \u0645\u062a\u062c\u062f\u062f. \u0648\u0631\u0623\u0649 \u0623\u0646 \u0627\u0644\u0641\u0643\u0631 \u0627\u0644\u0625\u0633\u0644\u0627\u0645\u064a \u0642\u0627\u062f\u0631 \u0639\u0644\u0649 \u0645\u062d\u0627\u0648\u0631\u0629 \u0627\u0644\u0645\u0639\u0631\u0641\u0629 \u0627\u0644\u062d\u062f\u064a\u062b\u0629 \u062f\u0648\u0646 \u0623\u0646 \u064a\u064f\u062e\u062a\u0632\u0644 \u0641\u064a \u062f\u0648\u063a\u0645\u0627 \u062c\u0627\u0645\u062f\u0629 \u0623\u0648 \u0641\u064a \u0635\u0648\u0631 \u0646\u0645\u0637\u064a\u0629 \u062e\u0627\u0631\u062c\u064a\u0629 \u0639\u0646 \u0627\u0644\u0625\u0633\u0644\u0627\u0645.",
          ),
        ],
      },
      {
        heading: L("Applied Islamology", "Islamologie appliqu\u00e9e", "\u0627\u0644\u0625\u0633\u0644\u0627\u0645\u064a\u0627\u062a \u0627\u0644\u062a\u0637\u0628\u064a\u0642\u064a\u0629"),
        body: [
          L(
            "Arkoun used the expression \u201capplied Islamology\u201d for an interdisciplinary approach to studying Islam. Rather than examining religious texts in isolation, he considered history, language, politics, society, collective memory and the institutions that shape what communities are permitted to think and say.",
            "Arkoun employait l\u2019expression \u00ab islamologie appliqu\u00e9e \u00bb pour d\u00e9signer une approche interdisciplinaire de l\u2019\u00e9tude de l\u2019islam. Plut\u00f4t que d\u2019examiner les textes religieux isol\u00e9ment, il prenait en compte l\u2019histoire, la langue, la politique, la soci\u00e9t\u00e9, la m\u00e9moire collective et les institutions qui d\u00e9terminent ce que les communaut\u00e9s peuvent penser et dire.",
            "\u0627\u0633\u062a\u062e\u062f\u0645 \u0623\u0631\u0643\u0648\u0646 \u0639\u0628\u0627\u0631\u0629 \u00ab\u0627\u0644\u0625\u0633\u0644\u0627\u0645\u064a\u0627\u062a \u0627\u0644\u062a\u0637\u0628\u064a\u0642\u064a\u0629\u00bb \u0644\u0644\u062f\u0644\u0627\u0644\u0629 \u0639\u0644\u0649 \u0645\u0642\u0627\u0631\u0628\u0629 \u0639\u0627\u0628\u0631\u0629 \u0644\u0644\u062a\u062e\u0635\u0635\u0627\u062a \u0641\u064a \u062f\u0631\u0627\u0633\u0629 \u0627\u0644\u0625\u0633\u0644\u0627\u0645. \u0641\u0628\u062f\u0644 \u062f\u0631\u0627\u0633\u0629 \u0627\u0644\u0646\u0635\u0648\u0635 \u0627\u0644\u062f\u064a\u0646\u064a\u0629 \u0645\u0639\u0632\u0648\u0644\u0629\u060c \u0623\u062e\u0630 \u0628\u0639\u064a\u0646 \u0627\u0644\u0627\u0639\u062a\u0628\u0627\u0631 \u0627\u0644\u062a\u0627\u0631\u064a\u062e \u0648\u0627\u0644\u0644\u063a\u0629 \u0648\u0627\u0644\u0633\u064a\u0627\u0633\u0629 \u0648\u0627\u0644\u0645\u062c\u062a\u0645\u0639 \u0648\u0627\u0644\u0630\u0627\u0643\u0631\u0629 \u0627\u0644\u062c\u0645\u0627\u0639\u064a\u0629 \u0648\u0627\u0644\u0645\u0624\u0633\u0633\u0627\u062a \u0627\u0644\u062a\u064a \u062a\u062d\u062f\u062f \u0645\u0627 \u064a\u064f\u0633\u0645\u062d \u0644\u0644\u0645\u062c\u062a\u0645\u0639\u0627\u062a \u0628\u0627\u0644\u062a\u0641\u0643\u064a\u0631 \u0641\u064a\u0647 \u0648\u0642\u0648\u0644\u0647.",
          ),
          L(
            "This approach brought together methods from history, anthropology, linguistics, philosophy, discourse analysis and other human sciences. It also asked scholars to question assumptions produced both inside Muslim societies and within Western scholarship about Islam.",
            "Cette approche r\u00e9unissait des m\u00e9thodes venues de l\u2019histoire, de l\u2019anthropologie, de la linguistique, de la philosophie, de l\u2019analyse du discours et d\u2019autres sciences humaines. Elle invitait aussi les chercheurs \u00e0 interroger les pr\u00e9suppos\u00e9s produits aussi bien dans les soci\u00e9t\u00e9s musulmanes que dans les \u00e9tudes occidentales sur l\u2019islam.",
            "\u062c\u0645\u0639\u062a \u0647\u0630\u0647 \u0627\u0644\u0645\u0642\u0627\u0631\u0628\u0629 \u0645\u0646\u0627\u0647\u062c \u0627\u0644\u062a\u0627\u0631\u064a\u062e \u0648\u0627\u0644\u0623\u0646\u062b\u0631\u0648\u0628\u0648\u0644\u0648\u062c\u064a\u0627 \u0648\u0627\u0644\u0644\u0633\u0627\u0646\u064a\u0627\u062a \u0648\u0627\u0644\u0641\u0644\u0633\u0641\u0629 \u0648\u062a\u062d\u0644\u064a\u0644 \u0627\u0644\u062e\u0637\u0627\u0628 \u0648\u063a\u064a\u0631\u0647\u0627 \u0645\u0646 \u0627\u0644\u0639\u0644\u0648\u0645 \u0627\u0644\u0625\u0646\u0633\u0627\u0646\u064a\u0629\u060c \u0648\u062f\u0639\u062a \u0627\u0644\u0628\u0627\u062d\u062b\u064a\u0646 \u0625\u0644\u0649 \u0645\u0633\u0627\u0621\u0644\u0629 \u0627\u0644\u0645\u0633\u0644\u0651\u0645\u0627\u062a \u0627\u0644\u0645\u0646\u062a\u064e\u062c\u0629 \u062f\u0627\u062e\u0644 \u0627\u0644\u0645\u062c\u062a\u0645\u0639\u0627\u062a \u0627\u0644\u0625\u0633\u0644\u0627\u0645\u064a\u0629 \u0648\u062f\u0627\u062e\u0644 \u0627\u0644\u062f\u0631\u0627\u0633\u0627\u062a \u0627\u0644\u063a\u0631\u0628\u064a\u0629 \u0639\u0646 \u0627\u0644\u0625\u0633\u0644\u0627\u0645 \u0639\u0644\u0649 \u062d\u062f \u0633\u0648\u0627\u0621.",
          ),
        ],
      },
      {
        heading: L("The unthought and the unthinkable", "L\u2019impens\u00e9 et l\u2019impensable", "\u0627\u0644\u0644\u0627\u0645\u0641\u0643\u0651\u0631 \u0641\u064a\u0647 \u0648\u0627\u0644\u0645\u0633\u062a\u062d\u064a\u0644 \u0627\u0644\u062a\u0641\u0643\u064a\u0631 \u0641\u064a\u0647"),
        body: [
          L(
            "One of Arkoun\u2019s most important ideas concerned the \u201cunthought\u201d and the \u201cunthinkable.\u201d The unthought refers to questions, interpretations and historical possibilities that a culture has neglected or abandoned. The unthinkable describes what political, religious or intellectual authority places beyond legitimate discussion.",
            "L\u2019une des id\u00e9es majeures d\u2019Arkoun concerne \u00ab l\u2019impens\u00e9 \u00bb et \u00ab l\u2019impensable \u00bb. L\u2019impens\u00e9 d\u00e9signe les questions, les interpr\u00e9tations et les possibilit\u00e9s historiques qu\u2019une culture a n\u00e9glig\u00e9es ou abandonn\u00e9es. L\u2019impensable d\u00e9crit ce que l\u2019autorit\u00e9 politique, religieuse ou intellectuelle place hors du d\u00e9bat l\u00e9gitime.",
            "\u0645\u0646 \u0623\u0647\u0645 \u0623\u0641\u0643\u0627\u0631 \u0623\u0631\u0643\u0648\u0646 \u0645\u0641\u0647\u0648\u0645\u0627 \u00ab\u0627\u0644\u0644\u0627\u0645\u0641\u0643\u0651\u0631 \u0641\u064a\u0647\u00bb \u0648\u00ab\u0627\u0644\u0645\u0633\u062a\u062d\u064a\u0644 \u0627\u0644\u062a\u0641\u0643\u064a\u0631 \u0641\u064a\u0647\u00bb. \u0641\u0627\u0644\u0623\u0648\u0644 \u064a\u062d\u064a\u0644 \u0639\u0644\u0649 \u0623\u0633\u0626\u0644\u0629 \u0648\u062a\u0623\u0648\u064a\u0644\u0627\u062a \u0648\u0625\u0645\u0643\u0627\u0646\u0627\u062a \u062a\u0627\u0631\u064a\u062e\u064a\u0629 \u0623\u0647\u0645\u0644\u062a\u0647\u0627 \u062b\u0642\u0627\u0641\u0629 \u0645\u0627 \u0623\u0648 \u062a\u062e\u0644\u0651\u062a \u0639\u0646\u0647\u0627\u060c \u0648\u0627\u0644\u062b\u0627\u0646\u064a \u064a\u0635\u0641 \u0645\u0627 \u062a\u0636\u0639\u0647 \u0627\u0644\u0633\u0644\u0637\u0629 \u0627\u0644\u0633\u064a\u0627\u0633\u064a\u0629 \u0623\u0648 \u0627\u0644\u062f\u064a\u0646\u064a\u0629 \u0623\u0648 \u0627\u0644\u0641\u0643\u0631\u064a\u0629 \u062e\u0627\u0631\u062c \u062f\u0627\u0626\u0631\u0629 \u0627\u0644\u0646\u0642\u0627\u0634 \u0627\u0644\u0645\u0634\u0631\u0648\u0639.",
          ),
          L(
            "Arkoun believed that recovering these excluded possibilities could reveal the plurality that had always existed within Islamic history. Critical inquiry, for him, was a way to resist both ideological certainty and the narrowing of collective memory.",
            "Arkoun estimait que retrouver ces possibilit\u00e9s exclues pouvait r\u00e9v\u00e9ler la pluralit\u00e9 qui a toujours exist\u00e9 dans l\u2019histoire islamique. L\u2019enqu\u00eate critique \u00e9tait pour lui une mani\u00e8re de r\u00e9sister \u00e0 la certitude id\u00e9ologique comme au r\u00e9tr\u00e9cissement de la m\u00e9moire collective.",
            "\u0631\u0623\u0649 \u0623\u0631\u0643\u0648\u0646 \u0623\u0646 \u0627\u0633\u062a\u0639\u0627\u062f\u0629 \u0647\u0630\u0647 \u0627\u0644\u0625\u0645\u0643\u0627\u0646\u0627\u062a \u0627\u0644\u0645\u0633\u062a\u0628\u0639\u062f\u0629 \u062a\u0643\u0634\u0641 \u0627\u0644\u062a\u0639\u062f\u062f\u064a\u0629 \u0627\u0644\u062a\u064a \u0638\u0644\u0651\u062a \u0642\u0627\u0626\u0645\u0629 \u062f\u0627\u0626\u0645\u064b\u0627 \u062f\u0627\u062e\u0644 \u0627\u0644\u062a\u0627\u0631\u064a\u062e \u0627\u0644\u0625\u0633\u0644\u0627\u0645\u064a\u060c \u0648\u0623\u0646 \u0627\u0644\u0628\u062d\u062b \u0627\u0644\u0646\u0642\u062f\u064a \u0648\u0633\u064a\u0644\u0629 \u0644\u0645\u0642\u0627\u0648\u0645\u0629 \u0627\u0644\u064a\u0642\u064a\u0646 \u0627\u0644\u0623\u064a\u062f\u064a\u0648\u0644\u0648\u062c\u064a \u0648\u0627\u0646\u062d\u0633\u0627\u0631 \u0627\u0644\u0630\u0627\u0643\u0631\u0629 \u0627\u0644\u062c\u0645\u0627\u0639\u064a\u0629 \u0645\u0639\u064b\u0627.",
          ),
        ],
      },
      {
        heading: L("Humanism and plurality", "Humanisme et pluralit\u00e9", "\u0627\u0644\u0646\u0632\u0639\u0629 \u0627\u0644\u0625\u0646\u0633\u0627\u0646\u064a\u0629 \u0648\u0627\u0644\u062a\u0639\u062f\u062f\u064a\u0629"),
        body: [
          L(
            "Humanism occupied an important place in Arkoun\u2019s work. His study of classical Islamic intellectual history challenged the idea that humanist inquiry belonged exclusively to Europe. He explored how reason, ethics, philosophy and religious thought had interacted within Muslim societies.",
            "L\u2019humanisme occupe une place importante dans l\u2019\u0153uvre d\u2019Arkoun. Son \u00e9tude de l\u2019histoire intellectuelle de l\u2019islam classique conteste l\u2019id\u00e9e que la d\u00e9marche humaniste appartiendrait exclusivement \u00e0 l\u2019Europe. Il explore la mani\u00e8re dont la raison, l\u2019\u00e9thique, la philosophie et la pens\u00e9e religieuse ont dialogu\u00e9 au sein des soci\u00e9t\u00e9s musulmanes.",
            "\u0627\u062d\u062a\u0644\u062a \u0627\u0644\u0646\u0632\u0639\u0629 \u0627\u0644\u0625\u0646\u0633\u0627\u0646\u064a\u0629 \u0645\u0643\u0627\u0646\u0629 \u0645\u0647\u0645\u0629 \u0641\u064a \u0623\u0639\u0645\u0627\u0644 \u0623\u0631\u0643\u0648\u0646. \u0641\u0642\u062f \u062a\u062d\u062f\u0651\u062a \u062f\u0631\u0627\u0633\u062a\u0647 \u0644\u0644\u062a\u0627\u0631\u064a\u062e \u0627\u0644\u0641\u0643\u0631\u064a \u0627\u0644\u0625\u0633\u0644\u0627\u0645\u064a \u0627\u0644\u0643\u0644\u0627\u0633\u064a\u0643\u064a \u0641\u0643\u0631\u0629 \u0623\u0646 \u0627\u0644\u0646\u0632\u0639\u0629 \u0627\u0644\u0625\u0646\u0633\u0627\u0646\u064a\u0629 \u062d\u0643\u0631 \u0639\u0644\u0649 \u0623\u0648\u0631\u0648\u0628\u0627\u060c \u0648\u0628\u062d\u062b \u0643\u064a\u0641 \u062a\u0641\u0627\u0639\u0644 \u0627\u0644\u0639\u0642\u0644 \u0648\u0627\u0644\u0623\u062e\u0644\u0627\u0642 \u0648\u0627\u0644\u0641\u0644\u0633\u0641\u0629 \u0648\u0627\u0644\u0641\u0643\u0631 \u0627\u0644\u062f\u064a\u0646\u064a \u062f\u0627\u062e\u0644 \u0627\u0644\u0645\u062c\u062a\u0645\u0639\u0627\u062a \u0627\u0644\u0625\u0633\u0644\u0627\u0645\u064a\u0629.",
          ),
          L(
            "He also called for dialogue across Islam, Europe and the Mediterranean. His work resisted simple divisions between East and West, faith and reason, or tradition and modernity. He preferred a critical space in which several histories and meanings could be examined together.",
            "Il appelait aussi au dialogue entre l\u2019islam, l\u2019Europe et la M\u00e9diterran\u00e9e. Son \u0153uvre r\u00e9siste aux partages simples entre Orient et Occident, foi et raison, tradition et modernit\u00e9. Il pr\u00e9f\u00e9rait un espace critique o\u00f9 plusieurs histoires et plusieurs sens pouvaient \u00eatre examin\u00e9s ensemble.",
            "\u062f\u0639\u0627 \u0643\u0630\u0644\u0643 \u0625\u0644\u0649 \u0627\u0644\u062d\u0648\u0627\u0631 \u0628\u064a\u0646 \u0627\u0644\u0625\u0633\u0644\u0627\u0645 \u0648\u0623\u0648\u0631\u0648\u0628\u0627 \u0648\u0627\u0644\u0645\u062a\u0648\u0633\u0637\u060c \u0648\u0642\u0627\u0648\u0645\u062a \u0623\u0639\u0645\u0627\u0644\u0647 \u0627\u0644\u062a\u0642\u0633\u064a\u0645\u0627\u062a \u0627\u0644\u0628\u0633\u064a\u0637\u0629 \u0628\u064a\u0646 \u0627\u0644\u0634\u0631\u0642 \u0648\u0627\u0644\u063a\u0631\u0628\u060c \u0648\u0627\u0644\u0625\u064a\u0645\u0627\u0646 \u0648\u0627\u0644\u0639\u0642\u0644\u060c \u0648\u0627\u0644\u062a\u0642\u0644\u064a\u062f \u0648\u0627\u0644\u062d\u062f\u0627\u062b\u0629. \u0648\u0641\u0636\u0651\u0644 \u0641\u0636\u0627\u0621\u064b \u0646\u0642\u062f\u064a\u064b\u0627 \u062a\u064f\u062f\u0631\u0633 \u0641\u064a\u0647 \u062a\u0648\u0627\u0631\u064a\u062e \u0648\u0645\u0639\u0627\u0646\u064d \u0645\u062a\u0639\u062f\u062f\u0629 \u0645\u0639\u064b\u0627.",
          ),
        ],
      },
      {
        heading: L("A legacy of critical inquiry", "Un h\u00e9ritage d\u2019enqu\u00eate critique", "\u0625\u0631\u062b \u0645\u0646 \u0627\u0644\u0628\u062d\u062b \u0627\u0644\u0646\u0642\u062f\u064a"),
        body: [
          L(
            "Arkoun\u2019s work influenced debates about Islamic reform, secularism, humanism, historical criticism and relations between Muslim societies and Europe. His ideas were also contested, and the complexity of his language sometimes limited their reach beyond academic circles.",
            "L\u2019\u0153uvre d\u2019Arkoun a nourri les d\u00e9bats sur la r\u00e9forme en islam, la la\u00efcit\u00e9, l\u2019humanisme, la critique historique et les relations entre les soci\u00e9t\u00e9s musulmanes et l\u2019Europe. Ses id\u00e9es furent aussi contest\u00e9es, et la complexit\u00e9 de sa langue a parfois limit\u00e9 leur port\u00e9e hors des cercles universitaires.",
            "\u0623\u062b\u0651\u0631\u062a \u0623\u0639\u0645\u0627\u0644 \u0623\u0631\u0643\u0648\u0646 \u0641\u064a \u0627\u0644\u0646\u0642\u0627\u0634\u0627\u062a \u062d\u0648\u0644 \u0627\u0644\u0625\u0635\u0644\u0627\u062d \u0627\u0644\u0625\u0633\u0644\u0627\u0645\u064a \u0648\u0627\u0644\u0639\u0644\u0645\u0627\u0646\u064a\u0629 \u0648\u0627\u0644\u0646\u0632\u0639\u0629 \u0627\u0644\u0625\u0646\u0633\u0627\u0646\u064a\u0629 \u0648\u0627\u0644\u0646\u0642\u062f \u0627\u0644\u062a\u0627\u0631\u064a\u062e\u064a \u0648\u0627\u0644\u0639\u0644\u0627\u0642\u0627\u062a \u0628\u064a\u0646 \u0627\u0644\u0645\u062c\u062a\u0645\u0639\u0627\u062a \u0627\u0644\u0625\u0633\u0644\u0627\u0645\u064a\u0629 \u0648\u0623\u0648\u0631\u0648\u0628\u0627. \u0648\u0642\u062f \u0644\u0642\u064a\u062a \u0623\u0641\u0643\u0627\u0631\u0647 \u0627\u0639\u062a\u0631\u0627\u0636\u0627\u062a \u0623\u064a\u0636\u064b\u0627\u060c \u0643\u0645\u0627 \u062d\u062f\u0651 \u062a\u0639\u0642\u064a\u062f \u0644\u063a\u062a\u0647 \u0623\u062d\u064a\u0627\u0646\u064b\u0627 \u0645\u0646 \u0627\u0646\u062a\u0634\u0627\u0631\u0647\u0627 \u062e\u0627\u0631\u062c \u0627\u0644\u0623\u0648\u0633\u0627\u0637 \u0627\u0644\u0623\u0643\u0627\u062f\u064a\u0645\u064a\u0629.",
          ),
          L(
            "His lasting contribution lies in the questions he insisted on asking: Who defines legitimate knowledge? Which parts of history are forgotten? What becomes impossible to discuss? And how can a tradition remain alive if it is placed beyond critical inquiry?",
            "Sa contribution durable tient aux questions qu\u2019il n\u2019a cess\u00e9 de poser : qui d\u00e9finit le savoir l\u00e9gitime ? Quelles parts de l\u2019histoire sont oubli\u00e9es ? Qu\u2019est-ce qui devient impossible \u00e0 discuter ? Et comment une tradition peut-elle rester vivante si elle est plac\u00e9e hors de l\u2019enqu\u00eate critique ?",
            "\u062a\u0643\u0645\u0646 \u0645\u0633\u0627\u0647\u0645\u062a\u0647 \u0627\u0644\u0628\u0627\u0642\u064a\u0629 \u0641\u064a \u0627\u0644\u0623\u0633\u0626\u0644\u0629 \u0627\u0644\u062a\u064a \u0623\u0644\u062d\u0651 \u0639\u0644\u0649 \u0637\u0631\u062d\u0647\u0627: \u0645\u0646 \u064a\u062d\u062f\u0651\u062f \u0627\u0644\u0645\u0639\u0631\u0641\u0629 \u0627\u0644\u0645\u0634\u0631\u0648\u0639\u061f \u0648\u0623\u064a\u0651\u0629 \u0623\u062c\u0632\u0627\u0621 \u0645\u0646 \u0627\u0644\u062a\u0627\u0631\u064a\u062e \u062a\u064f\u0646\u0633\u0649\u061f \u0648\u0645\u0627 \u0627\u0644\u0630\u064a \u064a\u063a\u062f\u0648 \u0645\u0646\u0627\u0642\u0634\u062a\u0647 \u0645\u0633\u062a\u062d\u064a\u0644\u0629\u061f \u0648\u0643\u064a\u0641 \u064a\u0628\u0642\u0649 \u062a\u0642\u0644\u064a\u062f \u062d\u064a\u064b\u0627 \u0625\u0630\u0627 \u0648\u064f\u0636\u0639 \u062e\u0627\u0631\u062c \u062f\u0627\u0626\u0631\u0629 \u0627\u0644\u0628\u062d\u062b \u0627\u0644\u0646\u0642\u062f\u064a\u061f",
          ),
        ],
      },
    ],
    keyPlacesAndWorks: [
      {
        emoji: "\u25c6",
        label: L("Lectures du Coran (1982)", "Lectures du Coran (1982)", "Lectures du Coran (1982)"),
        note: L("French-language edition.", "\u00c9dition en langue fran\u00e7aise.", "\u0637\u0628\u0639\u0629 \u0628\u0627\u0644\u0644\u063a\u0629 \u0627\u0644\u0641\u0631\u0646\u0633\u064a\u0629."),
      },
      {
        emoji: "\u25c6",
        label: L("Pour une critique de la raison islamique (1984)", "Pour une critique de la raison islamique (1984)", "Pour une critique de la raison islamique (1984)"),
        note: L("French-language edition.", "\u00c9dition en langue fran\u00e7aise.", "\u0637\u0628\u0639\u0629 \u0628\u0627\u0644\u0644\u063a\u0629 \u0627\u0644\u0641\u0631\u0646\u0633\u064a\u0629."),
      },
      {
        emoji: "\u25c6",
        label: L("Rethinking Islam: Common Questions, Uncommon Answers (1994)", "Rethinking Islam: Common Questions, Uncommon Answers (1994)", "Rethinking Islam: Common Questions, Uncommon Answers (1994)"),
        note: L("English-language edition.", "\u00c9dition en langue anglaise.", "\u0637\u0628\u0639\u0629 \u0628\u0627\u0644\u0644\u063a\u0629 \u0627\u0644\u0625\u0646\u062c\u0644\u064a\u0632\u064a\u0629."),
      },
      {
        emoji: "\u25c6",
        label: L("The Unthought in Contemporary Islamic Thought (2002)", "The Unthought in Contemporary Islamic Thought (2002)", "The Unthought in Contemporary Islamic Thought (2002)"),
        note: L("English-language edition.", "\u00c9dition en langue anglaise.", "\u0637\u0628\u0639\u0629 \u0628\u0627\u0644\u0644\u063a\u0629 \u0627\u0644\u0625\u0646\u062c\u0644\u064a\u0632\u064a\u0629."),
      },
      {
        emoji: "\u25c6",
        label: L("Combats pour l\u2019Humanisme en contextes islamiques (2002)", "Combats pour l\u2019Humanisme en contextes islamiques (2002)", "Combats pour l\u2019Humanisme en contextes islamiques (2002)"),
        note: L("French-language edition.", "\u00c9dition en langue fran\u00e7aise.", "\u0637\u0628\u0639\u0629 \u0628\u0627\u0644\u0644\u063a\u0629 \u0627\u0644\u0641\u0631\u0646\u0633\u064a\u0629."),
      },
      {
        emoji: "\u25c6",
        label: L("Islam: To Reform or to Subvert (2006)", "Islam: To Reform or to Subvert (2006)", "Islam: To Reform or to Subvert (2006)"),
        note: L("English-language edition.", "\u00c9dition en langue anglaise.", "\u0637\u0628\u0639\u0629 \u0628\u0627\u0644\u0644\u063a\u0629 \u0627\u0644\u0625\u0646\u062c\u0644\u064a\u0632\u064a\u0629."),
      },
    ],
    regionPanel: {
      regionId: "kabylie",
      heading: L("Rooted in Ath Yenni", "Enracin\u00e9 \u00e0 Ath Yenni", "\u062c\u0630\u0648\u0631\u0647 \u0641\u064a \u0622\u062b \u064a\u0646\u064a"),
      localityLabel: L("Ath Yenni", "Ath Yenni", "\u0622\u062b \u064a\u0646\u064a"),
      body: L(
        "Born in Taourirt Mimoun in Ath Yenni and raised with Kabyle as his first language, Arkoun carried the experience of crossing languages and cultural worlds into his scholarship. His intellectual journey connects Ath Yenni and Kabylie to international debates about Islam, modernity, identity and humanism.",
        "N\u00e9 \u00e0 Taourirt Mimoun, \u00e0 Ath Yenni, et ayant grandi avec le kabyle comme premi\u00e8re langue, Arkoun a int\u00e9gr\u00e9 \u00e0 ses recherches l\u2019exp\u00e9rience du passage entre plusieurs langues et univers culturels. Son parcours intellectuel relie Ath Yenni et la Kabylie aux d\u00e9bats internationaux sur l\u2019islam, la modernit\u00e9, l\u2019identit\u00e9 et l\u2019humanisme.",
        "\u0648\u064f\u0644\u062f \u0645\u062d\u0645\u062f \u0623\u0631\u0643\u0648\u0646 \u0641\u064a \u062a\u0627\u0648\u0631\u064a\u0631\u062a \u0645\u064a\u0645\u0648\u0646 \u0628\u0622\u062b \u064a\u0646\u064a\u060c \u0648\u0646\u0634\u0623 \u0648\u0627\u0644\u0642\u0628\u0627\u0626\u0644\u064a\u0629 \u0644\u063a\u062a\u0647 \u0627\u0644\u0623\u0648\u0644\u0649. \u0648\u0642\u062f \u062d\u0645\u0644 \u062a\u062c\u0631\u0628\u0629 \u0627\u0644\u0639\u0628\u0648\u0631 \u0628\u064a\u0646 \u0627\u0644\u0644\u063a\u0627\u062a \u0648\u0627\u0644\u0639\u0648\u0627\u0644\u0645 \u0627\u0644\u062b\u0642\u0627\u0641\u064a\u0629 \u0625\u0644\u0649 \u0645\u0633\u064a\u0631\u062a\u0647 \u0627\u0644\u0641\u0643\u0631\u064a\u0629. \u0648\u064a\u0631\u0628\u0637 \u0645\u0633\u0627\u0631\u0647 \u0628\u064a\u0646 \u0622\u062b \u064a\u0646\u064a \u0648\u0645\u0646\u0637\u0642\u0629 \u0627\u0644\u0642\u0628\u0627\u0626\u0644 \u0648\u0627\u0644\u0646\u0642\u0627\u0634\u0627\u062a \u0627\u0644\u062f\u0648\u0644\u064a\u0629 \u062d\u0648\u0644 \u0627\u0644\u0625\u0633\u0644\u0627\u0645 \u0648\u0627\u0644\u062d\u062f\u0627\u062b\u0629 \u0648\u0627\u0644\u0647\u0648\u064a\u0629 \u0648\u0627\u0644\u0625\u0646\u0633\u0627\u0646\u064a\u0629.",
      ),
      linkLabel: L("Visit the Kabylie region", "D\u00e9couvrir la r\u00e9gion de Kabylie", "\u0632\u0631 \u0645\u0646\u0637\u0642\u0629 \u0627\u0644\u0642\u0628\u0627\u0626\u0644"),
    },
  },

  "moufdi-zakaria": {
    didYouKnow: L(
      "Tradition says Moufdi Zakaria wrote 'Kassaman' on the wall of his prison cell in Barberousse, with his own blood, in April 1956.",
      "La tradition rapporte que Moufdi Zakaria aurait écrit « Kassaman » sur le mur de sa cellule à Barberousse, avec son propre sang, en avril 1956.",
      "تقول الرواية إن مفدي زكريا كتب «قسماً» على جدار زنزانته بسجن بربروس بدمه، في أفريل 1956.",
    ),
    keyPlacesAndWorks: [
      {
        emoji: "🎶",
        label: L("Kassaman, National Anthem", "Kassaman, hymne national", "قسماً، النشيد الوطني"),
        note: L(
          "Lyrics written in 1956; music by Mohamed Fawzi; adopted at independence in 1962.",
          "Paroles écrites en 1956 ; musique de Mohamed Fawzi ; adopté à l'indépendance en 1962.",
          "كُتبت كلماته سنة 1956، ولحّنه محمد فوزي، واعتُمد نشيدًا وطنيًا عند الاستقلال سنة 1962.",
        ),
      },
      {
        emoji: "📜",
        label: L("Iliyadha al-Jaza'ir (The Algerian Iliad)", "L'Iliade algérienne", "إلياذة الجزائر"),
        note: L(
          "An epic poem of over 1,000 verses celebrating Algeria's history and unity.",
          "Un poème épique de plus de 1 000 vers célébrant l'histoire et l'unité de l'Algérie.",
          "ملحمة شعرية تضمّ أكثر من ألف بيت، تحتفي بتاريخ الجزائر ووحدتها.",
        ),
      },
      {
        emoji: "🏚️",
        label: L("Barberousse Prison, Algiers", "Prison de Barberousse, Alger", "سجن بربروس، الجزائر العاصمة"),
        note: L(
          "Place where 'Kassaman' was composed during his imprisonment.",
          "Lieu où « Kassaman » a été composé durant son emprisonnement.",
          "المكان الذي كُتب فيه «قسماً» خلال فترة اعتقاله.",
        ),
      },
      {
        emoji: "🏜️",
        label: L("Beni Isguen, M'zab Valley", "Beni Isguen, vallée du M'zab", "بني يزقن، وادي ميزاب"),
        note: L(
          "His birthplace in 1908, a town famed for its Mozabite heritage.",
          "Sa ville natale en 1908, célèbre pour son patrimoine mozabite.",
          "مسقط رأسه سنة 1908، مدينة مشهورة بإرثها الميزابي.",
        ),
      },
      {
        emoji: "📚",
        label: L("Al-Lahab al-Muqaddas (The Sacred Flame)", "Al-Lahab al-Muqaddas (La Flamme sacrée)", "اللهب المقدّس"),
        note: L(
          "A celebrated collection of his nationalist poetry.",
          "Recueil célèbre de sa poésie nationaliste.",
          "ديوان شهير من شعره الوطني.",
        ),
      },
    ],
  },

  mammeri: {
    didYouKnow: L(
      "The University of Tizi Ouzou carries his name, as does a major cultural centre in the same city.",
      "L'université de Tizi Ouzou porte son nom, tout comme une importante maison de la culture de la même ville.",
      "تحمل جامعة تيزي وزو اسمه، وكذلك دار ثقافة كبرى في المدينة نفسها.",
    ),
    narrativeSections: [
      {
        heading: L(
          "From Taourirt Mimoun to a life of learning",
          "De Taourirt Mimoun \u00e0 une vie consacr\u00e9e au savoir",
          "\u0645\u0646 \u062a\u0627\u0648\u0631\u064a\u0631\u062a \u0645\u064a\u0645\u0648\u0646 \u0625\u0644\u0649 \u062d\u064a\u0627\u0629 \u0643\u0631\u0651\u0633\u0647\u0627 \u0644\u0644\u0645\u0639\u0631\u0641\u0629",
        ),
        body: [
          L(
            "Mouloud Mammeri was born on 28 December 1917 in Taourirt Mimoun, a village in Ath Yenni, Kabylie. He attended primary school in his home region before continuing part of his education in Rabat, Algiers and Paris.",
            "Mouloud Mammeri est n\u00e9 le 28 d\u00e9cembre 1917 \u00e0 Taourirt Mimoun, un village d'Ath Yenni, en Kabylie. Il fr\u00e9quenta l'\u00e9cole primaire dans sa r\u00e9gion natale avant de poursuivre une partie de sa formation \u00e0 Rabat, \u00e0 Alger et \u00e0 Paris.",
            "\u0648\u064f\u0644\u062f \u0645\u0648\u0644\u0648\u062f \u0645\u0639\u0645\u0631\u064a \u0641\u064a 28 \u062f\u064a\u0633\u0645\u0628\u0631 1917 \u0641\u064a \u062a\u0627\u0648\u0631\u064a\u0631\u062a \u0645\u064a\u0645\u0648\u0646\u060c \u0648\u0647\u064a \u0642\u0631\u064a\u0629 \u0641\u064a \u0622\u062b \u064a\u0646\u064a \u0628\u0645\u0646\u0637\u0642\u0629 \u0627\u0644\u0642\u0628\u0627\u0626\u0644. \u062f\u0631\u0633 \u0627\u0644\u0645\u0631\u062d\u0644\u0629 \u0627\u0644\u0627\u0628\u062a\u062f\u0627\u0626\u064a\u0629 \u0641\u064a \u0645\u0646\u0637\u0642\u062a\u0647\u060c \u062b\u0645 \u0648\u0627\u0635\u0644 \u062c\u0632\u0621\u064b\u0627 \u0645\u0646 \u062a\u0639\u0644\u064a\u0645\u0647 \u0641\u064a \u0627\u0644\u0631\u0628\u0627\u0637 \u0648\u0627\u0644\u062c\u0632\u0627\u0626\u0631 \u0627\u0644\u0639\u0627\u0635\u0645\u0629 \u0648\u0628\u0627\u0631\u064a\u0633.",
          ),
          L(
            "His education exposed him to several languages, literary traditions and intellectual environments. During the Second World War, he was conscripted and later participated in Allied campaigns in Europe. After the war, he returned to Algeria and worked as a teacher.",
            "Sa formation le mit en contact avec plusieurs langues, traditions litt\u00e9raires et milieux intellectuels. Pendant la Seconde Guerre mondiale, il fut mobilis\u00e9 et participa ensuite aux campagnes alli\u00e9es en Europe. Apr\u00e8s la guerre, il revint en Alg\u00e9rie et exer\u00e7a comme enseignant.",
            "\u0623\u062a\u0627\u062d \u0644\u0647 \u062a\u0639\u0644\u064a\u0645\u0647 \u0627\u0644\u0627\u062d\u062a\u0643\u0627\u0643 \u0628\u0644\u063a\u0627\u062a \u0648\u062a\u0642\u0627\u0644\u064a\u062f \u0623\u062f\u0628\u064a\u0629 \u0648\u0623\u0648\u0633\u0627\u0637 \u0641\u0643\u0631\u064a\u0629 \u0645\u062a\u0639\u062f\u062f\u0629. \u0648\u062e\u0644\u0627\u0644 \u0627\u0644\u062d\u0631\u0628 \u0627\u0644\u0639\u0627\u0644\u0645\u064a\u0629 \u0627\u0644\u062b\u0627\u0646\u064a\u0629 \u062c\u064f\u0646\u0651\u062f\u060c \u062b\u0645 \u0634\u0627\u0631\u0643 \u0641\u064a \u062d\u0645\u0644\u0627\u062a \u0627\u0644\u062d\u0644\u0641\u0627\u0621 \u0641\u064a \u0623\u0648\u0631\u0648\u0628\u0627. \u0648\u0628\u0639\u062f \u0627\u0644\u062d\u0631\u0628 \u0639\u0627\u062f \u0625\u0644\u0649 \u0627\u0644\u062c\u0632\u0627\u0626\u0631 \u0648\u0639\u0645\u0644 \u0645\u062f\u0631\u0651\u0633\u064b\u0627.",
          ),
          L(
            "In 1952, he published his first novel, La Colline oubli\u00e9e. His career would eventually bring together fiction, teaching, linguistics, anthropology and the study of Amazigh oral heritage.",
            "En 1952, il publia son premier roman, La Colline oubli\u00e9e. Sa carri\u00e8re allait r\u00e9unir la fiction, l'enseignement, la linguistique, l'anthropologie et l'\u00e9tude du patrimoine oral amazigh.",
            "\u0641\u064a \u0633\u0646\u0629 1952 \u0646\u0634\u0631 \u0631\u0648\u0627\u064a\u062a\u0647 \u0627\u0644\u0623\u0648\u0644\u0649 La Colline oubli\u00e9e. \u0648\u0642\u062f \u062c\u0645\u0639 \u0645\u0633\u0627\u0631\u0647 \u0644\u0627\u062d\u0642\u064b\u0627 \u0628\u064a\u0646 \u0627\u0644\u0631\u0648\u0627\u064a\u0629 \u0648\u0627\u0644\u062a\u062f\u0631\u064a\u0633 \u0648\u0627\u0644\u0644\u0633\u0627\u0646\u064a\u0627\u062a \u0648\u0627\u0644\u0623\u0646\u062b\u0631\u0648\u0628\u0648\u0644\u0648\u062c\u064a\u0627 \u0648\u062f\u0631\u0627\u0633\u0629 \u0627\u0644\u062a\u0631\u0627\u062b \u0627\u0644\u0634\u0641\u0648\u064a \u0627\u0644\u0623\u0645\u0627\u0632\u064a\u063a\u064a.",
          ),
        ],
      },
      {
        heading: L("Writing Algeria", "\u00c9crire l'Alg\u00e9rie", "\u0643\u062a\u0627\u0628\u0629 \u0627\u0644\u062c\u0632\u0627\u0626\u0631"),
        body: [
          L(
            "Mammeri's novels explored the pressures experienced by individuals and communities during periods of social and political change. His characters confront questions of belonging, inequality, war, tradition, personal responsibility and the disruption of established ways of life.",
            "Les romans de Mammeri explorent les pressions v\u00e9cues par les individus et les communaut\u00e9s durant les p\u00e9riodes de changement social et politique. Ses personnages affrontent des questions d'appartenance, d'in\u00e9galit\u00e9, de guerre, de tradition, de responsabilit\u00e9 personnelle et de bouleversement des modes de vie \u00e9tablis.",
            "\u062a\u0633\u062a\u0643\u0634\u0641 \u0631\u0648\u0627\u064a\u0627\u062a \u0645\u0639\u0645\u0631\u064a \u0627\u0644\u0636\u063a\u0648\u0637 \u0627\u0644\u062a\u064a \u0639\u0627\u0634\u0647\u0627 \u0627\u0644\u0623\u0641\u0631\u0627\u062f \u0648\u0627\u0644\u062c\u0645\u0627\u0639\u0627\u062a \u0641\u064a \u0641\u062a\u0631\u0627\u062a \u0627\u0644\u062a\u062d\u0648\u0644 \u0627\u0644\u0627\u062c\u062a\u0645\u0627\u0639\u064a \u0648\u0627\u0644\u0633\u064a\u0627\u0633\u064a\u060c \u0625\u0630 \u062a\u0648\u0627\u062c\u0647 \u0634\u062e\u0635\u064a\u0627\u062a\u0647 \u0623\u0633\u0626\u0644\u0629 \u0627\u0644\u0627\u0646\u062a\u0645\u0627\u0621 \u0648\u0627\u0644\u0644\u0627\u0645\u0633\u0627\u0648\u0627\u0629 \u0648\u0627\u0644\u062d\u0631\u0628 \u0648\u0627\u0644\u062a\u0642\u0644\u064a\u062f \u0648\u0627\u0644\u0645\u0633\u0624\u0648\u0644\u064a\u0629 \u0627\u0644\u0641\u0631\u062f\u064a\u0629 \u0648\u0627\u0636\u0637\u0631\u0627\u0628 \u0623\u0646\u0645\u0627\u0637 \u0627\u0644\u062d\u064a\u0627\u0629 \u0627\u0644\u0631\u0627\u0633\u062e\u0629.",
          ),
          L(
            "La Colline oubli\u00e9e, published in 1952, portrayed life within a Kabyle community. Le Sommeil du juste examined injustice, disillusionment and the contradictions of the colonial order. L'Opium et le B\u00e2ton placed its story within the Algerian War of Independence, while La Travers\u00e9e reflected on tensions and disappointments following independence.",
            "La Colline oubli\u00e9e, parue en 1952, d\u00e9peint la vie au sein d'une communaut\u00e9 kabyle. Le Sommeil du juste examine l'injustice, la d\u00e9sillusion et les contradictions de l'ordre colonial. L'Opium et le B\u00e2ton situe son r\u00e9cit dans la guerre d'ind\u00e9pendance alg\u00e9rienne, tandis que La Travers\u00e9e revient sur les tensions et les d\u00e9ceptions de l'apr\u00e8s-ind\u00e9pendance.",
            "\u0635\u0648\u0631\u062a La Colline oubli\u00e9e \u0627\u0644\u0635\u0627\u062f\u0631\u0629 \u0633\u0646\u0629 1952 \u0627\u0644\u062d\u064a\u0627\u0629 \u062f\u0627\u062e\u0644 \u0645\u062c\u062a\u0645\u0639 \u0642\u0628\u0627\u0626\u0644\u064a\u060c \u0648\u062a\u0646\u0627\u0648\u0644\u062a Le Sommeil du juste \u0627\u0644\u0638\u0644\u0645 \u0648\u062e\u064a\u0628\u0629 \u0627\u0644\u0623\u0645\u0644 \u0648\u062a\u0646\u0627\u0642\u0636\u0627\u062a \u0627\u0644\u0646\u0638\u0627\u0645 \u0627\u0644\u0627\u0633\u062a\u0639\u0645\u0627\u0631\u064a\u060c \u0641\u064a\u0645\u0627 \u062f\u0627\u0631\u062a L'Opium et le B\u00e2ton \u0641\u064a \u0632\u0645\u0646 \u062d\u0631\u0628 \u0627\u0644\u062a\u062d\u0631\u064a\u0631\u060c \u0648\u062a\u0623\u0645\u0644\u062a La Travers\u00e9e \u0641\u064a \u062a\u0648\u062a\u0631\u0627\u062a \u0645\u0627 \u0628\u0639\u062f \u0627\u0644\u0627\u0633\u062a\u0642\u0644\u0627\u0644 \u0648\u062e\u064a\u0628\u0627\u062a\u0647.",
          ),
          L(
            "His fiction should be presented as literature, not as a literal historical record. It offers perspectives shaped by characters, narrative choices and the author's artistic vision.",
            "Son \u0153uvre romanesque doit \u00eatre pr\u00e9sent\u00e9e comme de la litt\u00e9rature, et non comme un compte rendu historique litt\u00e9ral. Elle propose des perspectives fa\u00e7onn\u00e9es par les personnages, les choix narratifs et la vision artistique de l'auteur.",
            "\u062a\u064f\u0642\u062f\u0651\u0645 \u0623\u0639\u0645\u0627\u0644\u0647 \u0627\u0644\u0631\u0648\u0627\u0626\u064a\u0629 \u0628\u0648\u0635\u0641\u0647\u0627 \u0623\u062f\u0628\u064b\u0627 \u0644\u0627 \u0633\u062c\u0644\u0627\u064b \u062a\u0627\u0631\u064a\u062e\u064a\u064b\u0627 \u062d\u0631\u0641\u064a\u064b\u0627\u060c \u0625\u0630 \u062a\u0642\u062f\u0651\u0645 \u0631\u0624\u0649 \u062a\u0635\u0648\u063a\u0647\u0627 \u0627\u0644\u0634\u062e\u0635\u064a\u0627\u062a \u0648\u0627\u0644\u062e\u064a\u0627\u0631\u0627\u062a \u0627\u0644\u0633\u0631\u062f\u064a\u0629 \u0648\u0631\u0624\u064a\u0629 \u0627\u0644\u0643\u0627\u062a\u0628 \u0627\u0644\u0641\u0646\u064a\u0629.",
          ),
        ],
      },
      {
        heading: L(
          "Language, memory and oral tradition",
          "Langue, m\u00e9moire et tradition orale",
          "\u0627\u0644\u0644\u063a\u0629 \u0648\u0627\u0644\u0630\u0627\u0643\u0631\u0629 \u0648\u0627\u0644\u062a\u0631\u0627\u062b \u0627\u0644\u0634\u0641\u0647\u064a",
        ),
        body: [
          L(
            "Mammeri devoted a major part of his scholarship to the Tamazight language and Amazigh oral literature. He studied grammar, developed teaching and reference materials, and collected poetry, stories and forms of oral expression.",
            "Mammeri consacra une grande part de ses recherches \u00e0 la langue tamazight et \u00e0 la litt\u00e9rature orale amazighe. Il \u00e9tudia la grammaire, \u00e9labora des outils d'enseignement et de r\u00e9f\u00e9rence, et recueillit po\u00e8mes, r\u00e9cits et formes d'expression orale.",
            "\u0643\u0631\u0651\u0633 \u0645\u0639\u0645\u0631\u064a \u062c\u0632\u0621\u064b\u0627 \u0643\u0628\u064a\u0631\u064b\u0627 \u0645\u0646 \u0623\u0628\u062d\u0627\u062b\u0647 \u0644\u0644\u063a\u0629 \u0627\u0644\u0623\u0645\u0627\u0632\u064a\u063a\u064a\u0629 \u0648\u0627\u0644\u0623\u062f\u0628 \u0627\u0644\u0634\u0641\u0648\u064a \u0627\u0644\u0623\u0645\u0627\u0632\u064a\u063a\u064a\u060c \u0641\u062f\u0631\u0633 \u0627\u0644\u0642\u0648\u0627\u0639\u062f\u060c \u0648\u0623\u0639\u062f\u0651 \u0645\u0648\u0627\u062f \u0644\u0644\u062a\u0639\u0644\u064a\u0645 \u0648\u0627\u0644\u0645\u0631\u0627\u062c\u0639\u060c \u0648\u062c\u0645\u0639 \u0627\u0644\u0634\u0639\u0631 \u0648\u0627\u0644\u062d\u0643\u0627\u064a\u0627\u062a \u0648\u0623\u0634\u0643\u0627\u0644 \u0627\u0644\u062a\u0639\u0628\u064a\u0631 \u0627\u0644\u0634\u0641\u0648\u064a.",
          ),
          L(
            "His work on the poetry of Si Mohand ou Mhand helped preserve and introduce an important Kabyle poetic tradition to wider audiences. He also documented ancient Kabyle poetry and the Ahellil of Gourara, a poetic and musical tradition of southwestern Algeria.",
            "Ses travaux sur la po\u00e9sie de Si Mohand ou Mhand ont contribu\u00e9 \u00e0 pr\u00e9server et \u00e0 faire conna\u00eetre une tradition po\u00e9tique kabyle majeure. Il documenta \u00e9galement la po\u00e9sie kabyle ancienne et l'Ahellil du Gourara, tradition po\u00e9tique et musicale du sud-ouest alg\u00e9rien.",
            "\u0623\u0633\u0647\u0645 \u0639\u0645\u0644\u0647 \u0639\u0644\u0649 \u0634\u0639\u0631 \u0633\u064a \u0645\u062d\u0646\u062f \u0623\u0648 \u0645\u062d\u0646\u062f \u0641\u064a \u062d\u0641\u0638 \u062a\u0642\u0644\u064a\u062f \u0634\u0639\u0631\u064a \u0642\u0628\u0627\u0626\u0644\u064a \u0645\u0647\u0645 \u0648\u0627\u0644\u062a\u0639\u0631\u064a\u0641 \u0628\u0647 \u0644\u062f\u0649 \u062c\u0645\u0647\u0648\u0631 \u0623\u0648\u0633\u0639\u060c \u0643\u0645\u0627 \u0648\u062b\u0651\u0642 \u0627\u0644\u0634\u0639\u0631 \u0627\u0644\u0642\u0628\u0627\u0626\u0644\u064a \u0627\u0644\u0642\u062f\u064a\u0645 \u0648\u0623\u0647\u0644\u0651\u064a\u0644 \u063a\u0648\u0631\u0627\u0631\u0629\u060c \u0648\u0647\u0648 \u062a\u0642\u0644\u064a\u062f \u0634\u0639\u0631\u064a \u0648\u0645\u0648\u0633\u064a\u0642\u064a \u0641\u064a \u062c\u0646\u0648\u0628 \u063a\u0631\u0628 \u0627\u0644\u062c\u0632\u0627\u0626\u0631.",
          ),
          L(
            "For Mammeri, oral literature was not a lesser form of culture. It was a living archive through which communities carried language, memory, knowledge and historical experience across generations.",
            "Pour Mammeri, la litt\u00e9rature orale n'\u00e9tait pas une forme mineure de culture. C'\u00e9tait une archive vivante par laquelle les communaut\u00e9s transmettaient la langue, la m\u00e9moire, le savoir et l'exp\u00e9rience historique de g\u00e9n\u00e9ration en g\u00e9n\u00e9ration.",
            "\u0644\u0645 \u064a\u0643\u0646 \u0627\u0644\u0623\u062f\u0628 \u0627\u0644\u0634\u0641\u0648\u064a \u0641\u064a \u0646\u0638\u0631 \u0645\u0639\u0645\u0631\u064a \u0634\u0643\u0644\u064b\u0627 \u0623\u062f\u0646\u0649 \u0645\u0646 \u0627\u0644\u062b\u0642\u0627\u0641\u0629\u060c \u0628\u0644 \u0623\u0631\u0634\u064a\u0641\u064b\u0627 \u062d\u064a\u064b\u0627 \u062a\u062d\u0645\u0644 \u0628\u0647 \u0627\u0644\u062c\u0645\u0627\u0639\u0627\u062a \u0644\u063a\u062a\u0647\u0627 \u0648\u0630\u0627\u0643\u0631\u062a\u0647\u0627 \u0648\u0645\u0639\u0627\u0631\u0641\u0647\u0627 \u0648\u062a\u062c\u0631\u0628\u062a\u0647\u0627 \u0627\u0644\u062a\u0627\u0631\u064a\u062e\u064a\u0629 \u0639\u0628\u0631 \u0627\u0644\u0623\u062c\u064a\u0627\u0644.",
          ),
        ],
      },
      {
        heading: L(
          "The lecture that was forbidden",
          "La conf\u00e9rence interdite",
          "\u0627\u0644\u0645\u062d\u0627\u0636\u0631\u0629 \u0627\u0644\u062a\u064a \u0645\u064f\u0646\u0639\u062a",
        ),
        body: [
          L(
            "In March 1980, Mouloud Mammeri was scheduled to deliver a lecture at the University of Tizi Ouzou about ancient Kabyle poetry. The authorities prevented the lecture from taking place.",
            "En mars 1980, Mouloud Mammeri devait donner une conf\u00e9rence \u00e0 l'universit\u00e9 de Tizi Ouzou sur la po\u00e9sie kabyle ancienne. Les autorit\u00e9s emp\u00each\u00e8rent la tenue de cette conf\u00e9rence.",
            "\u0641\u064a \u0645\u0627\u0631\u0633 1980 \u0643\u0627\u0646 \u0645\u0642\u0631\u0631\u064b\u0627 \u0623\u0646 \u064a\u0644\u0642\u064a \u0645\u0648\u0644\u0648\u062f \u0645\u0639\u0645\u0631\u064a \u0645\u062d\u0627\u0636\u0631\u0629 \u0641\u064a \u062c\u0627\u0645\u0639\u0629 \u062a\u064a\u0632\u064a \u0648\u0632\u0648 \u0639\u0646 \u0627\u0644\u0634\u0639\u0631 \u0627\u0644\u0642\u0628\u0627\u0626\u0644\u064a \u0627\u0644\u0642\u062f\u064a\u0645\u060c \u0644\u0643\u0646 \u0627\u0644\u0633\u0644\u0637\u0627\u062a \u062d\u0627\u0644\u062a \u062f\u0648\u0646 \u0627\u0646\u0639\u0642\u0627\u062f\u0647\u0627.",
          ),
          L(
            "The cancellation was followed by protests involving students, cultural activists and other members of the population. The mobilization expanded into broader demands for recognition of Amazigh language, culture and identity, as well as greater freedom of expression. These events became known as the Berber Spring, or Tafsut Imazighen.",
            "L'annulation fut suivie de manifestations rassemblant \u00e9tudiants, militants culturels et autres habitants. La mobilisation s'\u00e9largit \u00e0 des revendications plus vastes de reconnaissance de la langue, de la culture et de l'identit\u00e9 amazighes, ainsi que d'une plus grande libert\u00e9 d'expression. Ces \u00e9v\u00e9nements furent connus sous le nom de Printemps berb\u00e8re, ou Tafsut Imazighen.",
            "\u0623\u0639\u0642\u0628\u062a \u0627\u0644\u0645\u0646\u0639 \u0627\u062d\u062a\u062c\u0627\u062c\u0627\u062a \u0634\u0627\u0631\u0643 \u0641\u064a\u0647\u0627 \u0637\u0644\u0628\u0629 \u0648\u0646\u0627\u0634\u0637\u0648\u0646 \u062b\u0642\u0627\u0641\u064a\u0648\u0646 \u0648\u0641\u0626\u0627\u062a \u0623\u062e\u0631\u0649 \u0645\u0646 \u0627\u0644\u0633\u0643\u0627\u0646\u060c \u0648\u0627\u062a\u0651\u0633\u0639\u062a \u0627\u0644\u062d\u0631\u0643\u0629 \u0644\u062a\u0634\u0645\u0644 \u0645\u0637\u0627\u0644\u0628 \u0623\u0648\u0633\u0639 \u0628\u0627\u0644\u0627\u0639\u062a\u0631\u0627\u0641 \u0628\u0627\u0644\u0644\u063a\u0629 \u0627\u0644\u0623\u0645\u0627\u0632\u064a\u063a\u064a\u0629 \u0648\u0627\u0644\u062b\u0642\u0627\u0641\u0629 \u0627\u0644\u0623\u0645\u0627\u0632\u064a\u063a\u064a\u0629 \u0648\u0627\u0644\u0647\u0648\u064a\u0629\u060c \u0648\u0628\u0645\u0632\u064a\u062f \u0645\u0646 \u062d\u0631\u064a\u0629 \u0627\u0644\u062a\u0639\u0628\u064a\u0631. \u0648\u0639\u064f\u0631\u0641\u062a \u0647\u0630\u0647 \u0627\u0644\u0623\u062d\u062f\u0627\u062b \u0628\u0627\u0644\u0631\u0628\u064a\u0639 \u0627\u0644\u0623\u0645\u0627\u0632\u064a\u063a\u064a\u060c \u0623\u0648 \u062a\u0627\u0641\u0633\u0648\u062a \u0625\u064a\u0645\u0627\u0632\u064a\u063a\u0646.",
          ),
          L(
            "Mammeri did not single-handedly create the Berber Spring. The movement emerged from deeper and longstanding political, cultural and linguistic grievances. The prohibition of his lecture became one of its defining catalysts and symbols.",
            "Mammeri n'a pas cr\u00e9\u00e9 \u00e0 lui seul le Printemps berb\u00e8re. Le mouvement est n\u00e9 de revendications politiques, culturelles et linguistiques plus profondes et plus anciennes. L'interdiction de sa conf\u00e9rence en devint l'un des catalyseurs et des symboles d\u00e9terminants.",
            "\u0644\u0645 \u064a\u0635\u0646\u0639 \u0645\u0639\u0645\u0631\u064a \u0648\u062d\u062f\u0647 \u0627\u0644\u0631\u0628\u064a\u0639 \u0627\u0644\u0623\u0645\u0627\u0632\u064a\u063a\u064a\u061b \u0641\u0642\u062f \u0646\u0634\u0623\u062a \u0627\u0644\u062d\u0631\u0643\u0629 \u0645\u0646 \u0645\u0637\u0627\u0644\u0628 \u0633\u064a\u0627\u0633\u064a\u0629 \u0648\u062b\u0642\u0627\u0641\u064a\u0629 \u0648\u0644\u063a\u0648\u064a\u0629 \u0623\u0639\u0645\u0642 \u0648\u0623\u0642\u062f\u0645\u060c \u0648\u0635\u0627\u0631 \u0645\u0646\u0639 \u0645\u062d\u0627\u0636\u0631\u062a\u0647 \u0623\u062d\u062f \u0645\u062d\u0641\u0632\u0627\u062a\u0647\u0627 \u0648\u0631\u0645\u0648\u0632\u0647\u0627 \u0627\u0644\u0641\u0627\u0631\u0642\u0629.",
          ),
        ],
      },
      {
        heading: L(
          "Building a field of study",
          "Construire un champ de recherche",
          "\u0628\u0646\u0627\u0621 \u0645\u062c\u0627\u0644 \u0644\u0644\u062f\u0631\u0627\u0633\u0629 \u0648\u0627\u0644\u0628\u062d\u062b",
        ),
        body: [
          L(
            "From 1969 to 1980, Mammeri directed Algeria's Centre de recherches anthropologiques, pr\u00e9historiques et ethnographiques, commonly known as CRAPE. His research crossed anthropology, linguistics, literature and oral history.",
            "De 1969 \u00e0 1980, Mammeri dirigea le Centre de recherches anthropologiques, pr\u00e9historiques et ethnographiques d'Alg\u00e9rie, connu sous le nom de CRAPE. Ses recherches croisaient anthropologie, linguistique, litt\u00e9rature et histoire orale.",
            "\u0645\u0646 1969 \u0625\u0644\u0649 1980 \u0623\u062f\u0627\u0631 \u0645\u0639\u0645\u0631\u064a \u0645\u0631\u0643\u0632 \u0627\u0644\u0628\u062d\u0648\u062b \u0627\u0644\u0623\u0646\u062b\u0631\u0648\u0628\u0648\u0644\u0648\u062c\u064a\u0629 \u0648\u0645\u0627 \u0642\u0628\u0644 \u0627\u0644\u062a\u0627\u0631\u064a\u062e\u064a\u0629 \u0648\u0627\u0644\u0625\u062b\u0646\u0648\u063a\u0631\u0627\u0641\u064a\u0629 \u0641\u064a \u0627\u0644\u062c\u0632\u0627\u0626\u0631\u060c \u0627\u0644\u0645\u0639\u0631\u0648\u0641 \u0628\u0640 CRAPE\u060c \u0648\u062a\u0642\u0627\u0637\u0639\u062a \u0623\u0628\u062d\u0627\u062b\u0647 \u0628\u064a\u0646 \u0627\u0644\u0623\u0646\u062b\u0631\u0648\u0628\u0648\u0644\u0648\u062c\u064a\u0627 \u0648\u0627\u0644\u0644\u0633\u0627\u0646\u064a\u0627\u062a \u0648\u0627\u0644\u0623\u062f\u0628 \u0648\u0627\u0644\u062a\u0627\u0631\u064a\u062e \u0627\u0644\u0634\u0641\u0648\u064a.",
          ),
          L(
            "In Paris, he later helped establish the Centre d'\u00e9tudes et de recherches amazighes and the journal Awal. These initiatives created spaces for research, publication and discussion devoted to Amazigh language, society and culture.",
            "\u00c0 Paris, il contribua ensuite \u00e0 la cr\u00e9ation du Centre d'\u00e9tudes et de recherches amazighes et de la revue Awal. Ces initiatives ouvrirent des espaces de recherche, de publication et de discussion consacr\u00e9s \u00e0 la langue, \u00e0 la soci\u00e9t\u00e9 et \u00e0 la culture amazighes.",
            "\u0648\u0641\u064a \u0628\u0627\u0631\u064a\u0633 \u0623\u0633\u0647\u0645 \u0644\u0627\u062d\u0642\u064b\u0627 \u0641\u064a \u062a\u0623\u0633\u064a\u0633 \u0645\u0631\u0643\u0632 \u0627\u0644\u062f\u0631\u0627\u0633\u0627\u062a \u0648\u0627\u0644\u0628\u062d\u0648\u062b \u0627\u0644\u0623\u0645\u0627\u0632\u064a\u063a\u064a\u0629 \u0648\u0645\u062c\u0644\u0629 Awal\u060c \u0648\u0623\u062a\u0627\u062d\u062a \u0647\u0630\u0647 \u0627\u0644\u0645\u0628\u0627\u062f\u0631\u0627\u062a \u0641\u0636\u0627\u0621\u0627\u062a \u0644\u0644\u0628\u062d\u062b \u0648\u0627\u0644\u0646\u0634\u0631 \u0648\u0627\u0644\u0646\u0642\u0627\u0634 \u062d\u0648\u0644 \u0627\u0644\u0644\u063a\u0629 \u0627\u0644\u0623\u0645\u0627\u0632\u064a\u063a\u064a\u0629 \u0648\u0627\u0644\u0645\u062c\u062a\u0645\u0639 \u0648\u0627\u0644\u062b\u0642\u0627\u0641\u0629 \u0627\u0644\u0623\u0645\u0627\u0632\u064a\u063a\u064a\u0629.",
          ),
          L(
            "His scholarship connected local knowledge, oral testimony and academic research. It helped future generations of researchers approach Amazigh cultural traditions as serious fields of intellectual inquiry.",
            "Ses travaux reliaient savoirs locaux, t\u00e9moignages oraux et recherche universitaire. Ils ont aid\u00e9 les g\u00e9n\u00e9rations suivantes de chercheurs \u00e0 aborder les traditions culturelles amazighes comme de v\u00e9ritables champs d'investigation intellectuelle.",
            "\u0631\u0628\u0637\u062a \u0623\u0628\u062d\u0627\u062b\u0647 \u0628\u064a\u0646 \u0627\u0644\u0645\u0639\u0631\u0641\u0629 \u0627\u0644\u0645\u062d\u0644\u064a\u0629 \u0648\u0627\u0644\u0634\u0647\u0627\u062f\u0629 \u0627\u0644\u0634\u0641\u0648\u064a\u0629 \u0648\u0627\u0644\u0628\u062d\u062b \u0627\u0644\u0623\u0643\u0627\u062f\u064a\u0645\u064a\u060c \u0648\u0633\u0627\u0639\u062f\u062a \u0623\u062c\u064a\u0627\u0644\u064b\u0627 \u0644\u0627\u062d\u0642\u0629 \u0645\u0646 \u0627\u0644\u0628\u0627\u062d\u062b\u064a\u0646 \u0639\u0644\u0649 \u0645\u0642\u0627\u0631\u0628\u0629 \u0627\u0644\u062a\u0642\u0627\u0644\u064a\u062f \u0627\u0644\u062b\u0642\u0627\u0641\u064a\u0629 \u0627\u0644\u0623\u0645\u0627\u0632\u064a\u063a\u064a\u0629 \u0628\u0648\u0635\u0641\u0647\u0627 \u0645\u062c\u0627\u0644 \u0628\u062d\u062b \u062c\u0627\u062f\u064b\u0627.",
          ),
        ],
      },
      {
        heading: L("A final journey", "Un dernier voyage", "\u0627\u0644\u0631\u062d\u0644\u0629 \u0627\u0644\u0623\u062e\u064a\u0631\u0629"),
        body: [
          L(
            "Mouloud Mammeri died on 26 February 1989 in a road accident near A\u00efn Defla while returning to Algeria from a symposium in Oujda, Morocco.",
            "Mouloud Mammeri mourut le 26 f\u00e9vrier 1989 dans un accident de la route pr\u00e8s d'A\u00efn Defla, alors qu'il rentrait en Alg\u00e9rie apr\u00e8s un colloque \u00e0 Oujda, au Maroc.",
            "\u062a\u0648\u0641\u064a \u0645\u0648\u0644\u0648\u062f \u0645\u0639\u0645\u0631\u064a \u0641\u064a 26 \u0641\u0628\u0631\u0627\u064a\u0631 1989 \u0641\u064a \u062d\u0627\u062f\u062b \u0637\u0631\u064a\u0642 \u0642\u0631\u0628 \u0639\u064a\u0646 \u0627\u0644\u062f\u0641\u0644\u0649 \u0648\u0647\u0648 \u0639\u0627\u0626\u062f \u0625\u0644\u0649 \u0627\u0644\u062c\u0632\u0627\u0626\u0631 \u0645\u0646 \u0646\u062f\u0648\u0629 \u0641\u064a \u0648\u062c\u062f\u0629 \u0628\u0627\u0644\u0645\u063a\u0631\u0628.",
          ),
          L(
            "His death was followed by a large public funeral. The scale of the gathering reflected the place he had come to occupy in Algerian cultural and intellectual life, particularly among people committed to Amazigh language, literature and identity.",
            "Ses fun\u00e9railles furent suivies par une foule nombreuse. L'ampleur du rassemblement refl\u00e9tait la place qu'il avait prise dans la vie culturelle et intellectuelle alg\u00e9rienne, en particulier parmi ceux qui \u0153uvraient pour la langue, la litt\u00e9rature et l'identit\u00e9 amazighes.",
            "\u0623\u0639\u0642\u0628\u062a \u0648\u0641\u0627\u062a\u0647 \u062c\u0646\u0627\u0632\u0629 \u0634\u0639\u0628\u064a\u0629 \u0643\u0628\u064a\u0631\u0629\u060c \u0639\u0643\u0633 \u062d\u062c\u0645\u0647\u0627 \u0627\u0644\u0645\u0643\u0627\u0646\u0629 \u0627\u0644\u062a\u064a \u0628\u0644\u063a\u0647\u0627 \u0641\u064a \u0627\u0644\u062d\u064a\u0627\u0629 \u0627\u0644\u062b\u0642\u0627\u0641\u064a\u0629 \u0648\u0627\u0644\u0641\u0643\u0631\u064a\u0629 \u0627\u0644\u062c\u0632\u0627\u0626\u0631\u064a\u0629\u060c \u0648\u0644\u0627 \u0633\u064a\u0645\u0627 \u0644\u062f\u0649 \u0627\u0644\u0645\u0647\u062a\u0645\u064a\u0646 \u0628\u0627\u0644\u0644\u063a\u0629 \u0648\u0627\u0644\u0623\u062f\u0628 \u0648\u0627\u0644\u0647\u0648\u064a\u0629 \u0627\u0644\u0623\u0645\u0627\u0632\u064a\u063a\u064a\u0629.",
          ),
        ],
      },
      {
        heading: L(
          "A language carried forward",
          "Une langue transmise",
          "\u0644\u063a\u0629 \u062a\u062a\u0648\u0627\u0635\u0644 \u0639\u0628\u0631 \u0627\u0644\u0623\u062c\u064a\u0627\u0644",
        ),
        body: [
          L(
            "Mouloud Mammeri left a legacy extending across literature, anthropology, linguistics and cultural preservation. His novels remain part of Algerian literary history, while his research continues to shape the study and teaching of the Tamazight language and Amazigh oral traditions.",
            "Mouloud Mammeri a laiss\u00e9 un h\u00e9ritage qui traverse la litt\u00e9rature, l'anthropologie, la linguistique et la pr\u00e9servation culturelle. Ses romans appartiennent \u00e0 l'histoire litt\u00e9raire alg\u00e9rienne, tandis que ses recherches continuent de fa\u00e7onner l'\u00e9tude et l'enseignement de la langue tamazight et des traditions orales amazighes.",
            "\u062a\u0631\u0643 \u0645\u0648\u0644\u0648\u062f \u0645\u0639\u0645\u0631\u064a \u0625\u0631\u062b\u064b\u0627 \u064a\u0645\u062a\u062f \u0639\u0628\u0631 \u0627\u0644\u0623\u062f\u0628 \u0648\u0627\u0644\u0623\u0646\u062b\u0631\u0648\u0628\u0648\u0644\u0648\u062c\u064a\u0627 \u0648\u0627\u0644\u0644\u0633\u0627\u0646\u064a\u0627\u062a \u0648\u062d\u0641\u0638 \u0627\u0644\u062b\u0642\u0627\u0641\u0629. \u0641\u0631\u0648\u0627\u064a\u0627\u062a\u0647 \u062c\u0632\u0621 \u0645\u0646 \u062a\u0627\u0631\u064a\u062e \u0627\u0644\u0623\u062f\u0628 \u0627\u0644\u062c\u0632\u0627\u0626\u0631\u064a\u060c \u0648\u0623\u0628\u062d\u0627\u062b\u0647 \u0644\u0627 \u062a\u0632\u0627\u0644 \u062a\u0648\u062c\u0651\u0647 \u062f\u0631\u0627\u0633\u0629 \u0627\u0644\u0644\u063a\u0629 \u0627\u0644\u0623\u0645\u0627\u0632\u064a\u063a\u064a\u0629 \u0648\u0627\u0644\u062a\u0642\u0627\u0644\u064a\u062f \u0627\u0644\u0634\u0641\u0648\u064a\u0629 \u0627\u0644\u0623\u0645\u0627\u0632\u064a\u063a\u064a\u0629 \u0648\u062a\u062f\u0631\u064a\u0633\u0647\u0627.",
          ),
          L(
            "The University of Tizi Ouzou bears his name, as does an important cultural center in the city. His memory is also closely connected to the Berber Spring and to the continuing effort to give Amazigh language and culture their full place in Algerian public life.",
            "L'universit\u00e9 de Tizi Ouzou porte son nom, tout comme un important centre culturel de la ville. Sa m\u00e9moire reste \u00e9troitement li\u00e9e au Printemps berb\u00e8re et \u00e0 l'effort continu pour donner \u00e0 la langue et \u00e0 la culture amazighes toute leur place dans la vie publique alg\u00e9rienne.",
            "\u062a\u062d\u0645\u0644 \u062c\u0627\u0645\u0639\u0629 \u062a\u064a\u0632\u064a \u0648\u0632\u0648 \u0627\u0633\u0645\u0647\u060c \u0648\u0643\u0630\u0644\u0643 \u0645\u0631\u0643\u0632 \u062b\u0642\u0627\u0641\u064a \u0645\u0647\u0645 \u0641\u064a \u0627\u0644\u0645\u062f\u064a\u0646\u0629\u060c \u0648\u062a\u0631\u062a\u0628\u0637 \u0630\u0643\u0631\u0627\u0647 \u0627\u0631\u062a\u0628\u0627\u0637\u064b\u0627 \u0648\u062b\u064a\u0642\u064b\u0627 \u0628\u0627\u0644\u0631\u0628\u064a\u0639 \u0627\u0644\u0623\u0645\u0627\u0632\u064a\u063a\u064a \u0648\u0628\u0627\u0644\u062c\u0647\u062f \u0627\u0644\u0645\u062a\u0648\u0627\u0635\u0644 \u0644\u0645\u0646\u062d \u0627\u0644\u0644\u063a\u0629 \u0648\u0627\u0644\u062b\u0642\u0627\u0641\u0629 \u0627\u0644\u0623\u0645\u0627\u0632\u064a\u063a\u064a\u062a\u064a\u0646 \u0645\u0643\u0627\u0646\u062a\u0647\u0645\u0627 \u0627\u0644\u0643\u0627\u0645\u0644\u0629 \u0641\u064a \u0627\u0644\u062d\u064a\u0627\u0629 \u0627\u0644\u0639\u0627\u0645\u0629 \u0641\u064a \u0627\u0644\u062c\u0632\u0627\u0626\u0631.",
          ),
          L(
            "His work reminds us that preserving a language involves more than recording words. It also means carrying stories, poetry, knowledge and ways of understanding the world from one generation to the next.",
            "Son \u0153uvre rappelle que pr\u00e9server une langue ne se limite pas \u00e0 enregistrer des mots. C'est aussi transmettre des r\u00e9cits, de la po\u00e9sie, des savoirs et des mani\u00e8res de comprendre le monde d'une g\u00e9n\u00e9ration \u00e0 l'autre.",
            "\u064a\u0630\u0643\u0651\u0631\u0646\u0627 \u0639\u0645\u0644\u0647 \u0628\u0623\u0646 \u062d\u0641\u0638 \u0627\u0644\u0644\u063a\u0629 \u0644\u0627 \u064a\u0642\u062a\u0635\u0631 \u0639\u0644\u0649 \u062a\u062f\u0648\u064a\u0646 \u0627\u0644\u0643\u0644\u0645\u0627\u062a\u060c \u0628\u0644 \u064a\u0639\u0646\u064a \u0623\u064a\u0636\u064b\u0627 \u0646\u0642\u0644 \u0627\u0644\u062d\u0643\u0627\u064a\u0627\u062a \u0648\u0627\u0644\u0634\u0639\u0631 \u0648\u0627\u0644\u0645\u0639\u0631\u0641\u0629 \u0648\u0637\u0631\u0627\u0626\u0642 \u0641\u0647\u0645 \u0627\u0644\u0639\u0627\u0644\u0645 \u0645\u0646 \u062c\u064a\u0644 \u0625\u0644\u0649 \u062c\u064a\u0644.",
          ),
        ],
      },
    ],
    keyPlacesAndWorks: [
      {
        emoji: "\u25c6",
        label: L("La Colline oubli\u00e9e (1952)", "La Colline oubli\u00e9e (1952)", "La Colline oubli\u00e9e (1952)"),
        note: L("Novel.", "Roman.", "\u0631\u0648\u0627\u064a\u0629."),
      },
      {
        emoji: "\u25c6",
        label: L("Le Sommeil du juste (1955)", "Le Sommeil du juste (1955)", "Le Sommeil du juste (1955)"),
        note: L("Novel.", "Roman.", "\u0631\u0648\u0627\u064a\u0629."),
      },
      {
        emoji: "\u25c6",
        label: L("L'Opium et le B\u00e2ton (1965)", "L'Opium et le B\u00e2ton (1965)", "L'Opium et le B\u00e2ton (1965)"),
        note: L("Novel.", "Roman.", "\u0631\u0648\u0627\u064a\u0629."),
      },
      {
        emoji: "\u25c6",
        label: L("La Travers\u00e9e (1982)", "La Travers\u00e9e (1982)", "La Travers\u00e9e (1982)"),
        note: L("Novel.", "Roman.", "\u0631\u0648\u0627\u064a\u0629."),
      },
      {
        emoji: "\u2726",
        label: L("Les Isefra de Si Mohand ou Mhand (1969)", "Les Isefra de Si Mohand ou Mhand (1969)", "Les Isefra de Si Mohand ou Mhand (1969)"),
        note: L(
          "Collected Kabyle poetry with French translation.",
          "Recueil de po\u00e9sie kabyle avec traduction fran\u00e7aise.",
          "\u062c\u0645\u0639 \u0644\u0644\u0634\u0639\u0631 \u0627\u0644\u0642\u0628\u0627\u0626\u0644\u064a \u0645\u0639 \u062a\u0631\u062c\u0645\u0629 \u0641\u0631\u0646\u0633\u064a\u0629.",
        ),
      },
      {
        emoji: "\u2726",
        label: L("Po\u00e8mes kabyles anciens (1980)", "Po\u00e8mes kabyles anciens (1980)", "Po\u00e8mes kabyles anciens (1980)"),
        note: L("Anthology of ancient Kabyle poetry.", "Anthologie de po\u00e9sie kabyle ancienne.", "\u0645\u062e\u062a\u0627\u0631\u0627\u062a \u0645\u0646 \u0627\u0644\u0634\u0639\u0631 \u0627\u0644\u0642\u0628\u0627\u0626\u0644\u064a \u0627\u0644\u0642\u062f\u064a\u0645."),
      },
      {
        emoji: "\u2726",
        label: L("Taje\u1e5b\u1e5bumt n Tmazi\u0263t", "Taje\u1e5b\u1e5bumt n Tmazi\u0263t", "Taje\u1e5b\u1e5bumt n Tmazi\u0263t"),
        note: L("Grammar of the Tamazight language.", "Grammaire de la langue tamazight.", "\u0642\u0648\u0627\u0639\u062f \u0627\u0644\u0644\u063a\u0629 \u0627\u0644\u0623\u0645\u0627\u0632\u064a\u063a\u064a\u0629."),
      },
      {
        emoji: "\u2726",
        label: L(
          "Amawal Tamazight-Fran\u00e7ais et Fran\u00e7ais-Tamazight",
          "Amawal Tamazight-Fran\u00e7ais et Fran\u00e7ais-Tamazight",
          "Amawal Tamazight-Fran\u00e7ais et Fran\u00e7ais-Tamazight",
        ),
        note: L("Lexicon.", "Lexique.", "\u0645\u0639\u062c\u0645."),
      },
      {
        emoji: "\u2726",
        label: L("Pr\u00e9cis de grammaire berb\u00e8re (kabyle), 1987", "Pr\u00e9cis de grammaire berb\u00e8re (kabyle), 1987", "Pr\u00e9cis de grammaire berb\u00e8re (kabyle), 1987"),
        note: L("Linguistic reference work.", "Ouvrage de r\u00e9f\u00e9rence linguistique.", "\u0645\u0631\u062c\u0639 \u0644\u063a\u0648\u064a."),
      },
      {
        emoji: "\u2726",
        label: L("L'Ahellil du Gourara (1984)", "L'Ahellil du Gourara (1984)", "L'Ahellil du Gourara (1984)"),
        note: L(
          "Study of a poetic and musical tradition of southwestern Algeria.",
          "\u00c9tude d'une tradition po\u00e9tique et musicale du sud-ouest alg\u00e9rien.",
          "\u062f\u0631\u0627\u0633\u0629 \u0644\u062a\u0642\u0644\u064a\u062f \u0634\u0639\u0631\u064a \u0648\u0645\u0648\u0633\u064a\u0642\u064a \u0641\u064a \u062c\u0646\u0648\u0628 \u063a\u0631\u0628 \u0627\u0644\u062c\u0632\u0627\u0626\u0631.",
        ),
      },
      {
        emoji: "\u25c7",
        label: L("Le Foehn", "Le Foehn", "Le Foehn"),
        note: L("Theatre.", "Th\u00e9\u00e2tre.", "\u0645\u0633\u0631\u062d."),
      },
      {
        emoji: "\u25c7",
        label: L("Le Banquet", "Le Banquet", "Le Banquet"),
        note: L("Theatre.", "Th\u00e9\u00e2tre.", "\u0645\u0633\u0631\u062d."),
      },
      {
        emoji: "\u25c7",
        label: L("La Cit\u00e9 du soleil", "La Cit\u00e9 du soleil", "La Cit\u00e9 du soleil"),
        note: L("Theatre.", "Th\u00e9\u00e2tre.", "\u0645\u0633\u0631\u062d."),
      },
    ],
    regionPanel: {
      regionId: "kabylie",
      heading: L("Rooted in Taourirt Mimoun", "Enracin\u00e9 \u00e0 Taourirt Mimoun", "\u062c\u0630\u0648\u0631\u0647 \u0641\u064a \u062a\u0627\u0648\u0631\u064a\u0631\u062a \u0645\u064a\u0645\u0648\u0646"),
      localityLabel: L("Taourirt Mimoun, Ath Yenni", "Taourirt Mimoun, Ath Yenni", "\u062a\u0627\u0648\u0631\u064a\u0631\u062a \u0645\u064a\u0645\u0648\u0646\u060c \u0622\u062b \u064a\u0646\u064a"),
      body: L(
        "Born in Taourirt Mimoun in Ath Yenni, Mouloud Mammeri drew deeply from the language, oral memory and cultural life of Kabylie. From this foundation, he created work that reached readers and researchers across Algeria and beyond.",
        "N\u00e9 \u00e0 Taourirt Mimoun, \u00e0 Ath Yenni, Mouloud Mammeri a puis\u00e9 profond\u00e9ment dans la langue, la m\u00e9moire orale et la vie culturelle de la Kabylie. \u00c0 partir de cet enracinement, il a cr\u00e9\u00e9 une \u0153uvre qui a touch\u00e9 des lecteurs et des chercheurs en Alg\u00e9rie et au-del\u00e0.",
        "\u0648\u064f\u0644\u062f \u0645\u0648\u0644\u0648\u062f \u0645\u0639\u0645\u0631\u064a \u0641\u064a \u062a\u0627\u0648\u0631\u064a\u0631\u062a \u0645\u064a\u0645\u0648\u0646 \u0628\u0622\u062b \u064a\u0646\u064a\u060c \u0648\u0627\u0633\u062a\u0645\u062f \u0627\u0644\u0643\u062b\u064a\u0631 \u0645\u0646 \u0623\u0639\u0645\u0627\u0644\u0647 \u0645\u0646 \u0644\u063a\u0629 \u0645\u0646\u0637\u0642\u0629 \u0627\u0644\u0642\u0628\u0627\u0626\u0644 \u0648\u0630\u0627\u0643\u0631\u062a\u0647\u0627 \u0627\u0644\u0634\u0641\u0648\u064a\u0629 \u0648\u062d\u064a\u0627\u062a\u0647\u0627 \u0627\u0644\u062b\u0642\u0627\u0641\u064a\u0629. \u0648\u0645\u0646 \u0647\u0630\u0647 \u0627\u0644\u062c\u0630\u0648\u0631\u060c \u0642\u062f\u0651\u0645 \u0625\u0646\u062a\u0627\u062c\u064b\u0627 \u0648\u0635\u0644 \u0625\u0644\u0649 \u0627\u0644\u0642\u0631\u0627\u0621 \u0648\u0627\u0644\u0628\u0627\u062d\u062b\u064a\u0646 \u0641\u064a \u0627\u0644\u062c\u0632\u0627\u0626\u0631 \u0648\u062e\u0627\u0631\u062c\u0647\u0627.",
      ),
      linkLabel: L("Visit the Kabylie region", "D\u00e9couvrir la r\u00e9gion de Kabylie", "\u0632\u0631 \u0645\u0646\u0637\u0642\u0629 \u0627\u0644\u0642\u0628\u0627\u0626\u0644"),
    },
    eventPanel: {
      to: "/moments",
      hash: "tafsut",
      dateLabel: L("April 1980", "Avril 1980", "أفريل 1980"),
      heading: L(
        "Related event: the Berber Spring",
        "Événement lié : le Printemps berbère",
        "حدث مرتبط: الربيع الأمازيغي",
      ),
      body: L(
        "The lecture on ancient Kabyle poetry that Mouloud Mammeri was to give at the University of Tizi Ouzou was prohibited in March 1980. The ban set off the student demonstrations known as Tafsut Imazighen, the Berber Spring, a turning point in the recognition of Tamazight.",
        "La conférence sur la poésie kabyle ancienne que Mouloud Mammeri devait donner à l'université de Tizi Ouzou fut interdite en mars 1980. Cette interdiction déclencha les manifestations étudiantes connues sous le nom de Tafsut Imazighen, le Printemps berbère, un tournant dans la reconnaissance de la langue tamazight.",
        "مُنعت في مارس 1980 المحاضرة التي كان مولود معمري سيلقيها عن الشعر القبائلي القديم في جامعة تيزي وزو. وأشعل هذا المنع مظاهرات طلابية عُرفت بتافسوت إيمازيغن، الربيع الأمازيغي، وهي منعطف في الاعتراف باللغة الأمازيغية.",
      ),
      linkLabel: L(
        "Open the Berber Spring exhibit",
        "Ouvrir l'exposition du Printemps berbère",
        "افتح معرض الربيع الأمازيغي",
      ),
    },
  },

};

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
};

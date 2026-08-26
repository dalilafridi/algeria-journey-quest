/**
 * Shared source registry — every citation used across DZ Odyssey lives here
 * exactly once. Exhibits reference sources by id via the provenance registry.
 *
 * Adding a new source: append an entry with a stable id, a fine-grained
 * `kind`, and the display `category` that controls grouping in the panel.
 */

import type { ProvenanceSource } from "@/lib/provenance";
import type { LocalizedString } from "@/lib/i18n";

const L = (en: string, fr: string, ar: string): LocalizedString => ({ en, fr, ar });

const S = <T extends ProvenanceSource>(s: T) => s;

export const SOURCES: readonly ProvenanceSource[] = [
  // Constitutional status of Tamazight
  S({
    id: "constitution-dz-tamazight",
    kind: "official",
    category: "archive",
    title: L(
      "Constitution of the People's Democratic Republic of Algeria, articles on national and official languages",
      "Constitution de la République algérienne démocratique et populaire, articles sur les langues nationale et officielle",
      "دستور الجمهورية الجزائرية الديمقراطية الشعبية، المواد المتعلقة باللغتين الوطنية والرسمية",
    ),
    publisher: L(
      "Journal officiel de la République algérienne",
      "Journal officiel de la République algérienne",
      "الجريدة الرسمية للجمهورية الجزائرية",
    ),
    url: "https://www.joradp.dz/HFR/Index.htm",
    language: "fr",
    note: L(
      "Basis for the two milestones cited on this page: Tamazight recognized as a national language by the 2002 constitutional revision, then as an official language by the 2016 revision.",
      "Base des deux jalons cités sur cette page : le tamazight reconnu langue nationale par la révision constitutionnelle de 2002, puis langue officielle par celle de 2016.",
      "أساس المعلمين المذكورين في هذه الصفحة: الاعتراف بالأمازيغية لغة وطنية في تعديل 2002، ثم لغة رسمية في تعديل 2016.",
    ),
  }),

  // Azouaou Mammeri
  S({
    id: "wikipedia-azouaou-mammeri",
    kind: "web",
    category: "further",
    title: L("Azouaou Mammeri", "Azouaou Mammeri", "أزواو معمري"),
    publisher: L("Wikipedia, English edition", "Wikipédia, édition anglaise", "ويكيبيديا، النسخة الإنجليزية"),
    url: "https://en.wikipedia.org/wiki/Azouaou_Mammeri",
    language: "en",
    note: L(
      "Used as the initial biographical overview and starting bibliography.",
      "Utilisé comme aperçu biographique initial et point de départ bibliographique.",
      "استُخدم كنظرة أولية على سيرته ونقطة انطلاق للمراجع.",
    ),
  }),
  S({
    id: "idref-azouaou-mammeri",
    kind: "official",
    category: "archive",
    title: L(
      "Mammeri, Azouaou (1890-1954)",
      "Mammeri, Azouaou (1890-1954)",
      "معمري، أزواو (1890-1954)",
    ),
    publisher: L("IdRef, authority records", "IdRef, référentiel d'autorités", "إيدرِف، السجلات الاستنادية"),
    url: "https://www.idref.fr/",
    language: "fr",
    note: L(
      "Authority record used for identity and date comparison. It gives 1890 as the birth year.",
      "Notice d'autorité utilisée pour comparer identité et dates. Elle indique 1890 comme année de naissance.",
      "سجل استنادي استُخدم لمقارنة الهوية والتواريخ، ويذكر 1890 سنةً للميلاد.",
    ),
  }),
  S({
    id: "leonore-azouaou-mammeri",
    kind: "official",
    category: "archive",
    title: L(
      "Azouaou Mammeri file, reference 19800035/28/3577",
      "Dossier Azouaou Mammeri, cote 19800035/28/3577",
      "ملف أزواو معمري، المرجع 19800035/28/3577",
    ),
    publisher: L(
      "Archives nationales de France, Léonore database",
      "Archives nationales de France, base Léonore",
      "الأرشيف الوطني الفرنسي، قاعدة ليونور",
    ),
    url: "https://www.leonore.archives-nationales.culture.gouv.fr/",
    language: "fr",
    note: L(
      "Archival Legion of Honour file, cited for the alternative 1892 birth year. Full file content requires manual review.",
      "Dossier d'archives de la Légion d'honneur, cité pour l'année de naissance alternative 1892. Le contenu complet demande une consultation manuelle.",
      "ملف أرشيفي لوسام جوقة الشرف، يُستشهد به لسنة الميلاد البديلة 1892. ويحتاج المحتوى الكامل إلى مراجعة يدوية.",
    ),
  }),
  S({
    id: "cma-azouaou-mammeri-koranic-school",
    kind: "official",
    category: "archive",
    title: L(
      "Interior of a Koranic School, collection record",
      "Intérieur d'une école coranique, notice de collection",
      "داخل مدرسة قرآنية، سجل المجموعة",
    ),
    publisher: L("Cleveland Museum of Art", "Cleveland Museum of Art", "متحف كليفلاند للفنون"),
    url: "https://www.clevelandart.org/art/collection/search?search=Mammeri",
    language: "en",
    note: L(
      "Museum catalog record for a painting by Azouaou Mammeri. Image reuse rights not yet verified, so no reproduction is displayed.",
      "Notice de catalogue pour un tableau d'Azouaou Mammeri. Les droits de réutilisation de l'image ne sont pas vérifiés, aucune reproduction n'est affichée.",
      "سجل فهرسة متحفي للوحة لأزواو معمري. لم يتم التحقق من حقوق إعادة استخدام الصورة، لذلك لا تُعرض أي نسخة.",
    ),
  }),
  S({
    id: "benjamin-mammeri-racim",
    kind: "book",
    category: "academic",
    title: L(
      "Colonial Tutelage to Nationalist Affirmation: Mammeri and Racim, Painters of the Maghreb",
      "Colonial Tutelage to Nationalist Affirmation: Mammeri and Racim, Painters of the Maghreb",
      "من الوصاية الاستعمارية إلى التأكيد الوطني: معمري وراسم، رسامان من المغرب الكبير",
    ),
    author: L("Roger Benjamin", "Roger Benjamin", "روجر بنجامين"),
    publisher: L(
      "In Orientalism's Interlocutors, Duke University Press, 2002",
      "Dans Orientalism's Interlocutors, Duke University Press, 2002",
      "ضمن Orientalism's Interlocutors، منشورات جامعة ديوك، 2002",
    ),
    url: "https://doi.org/10.1515/9780822383857-005",
    language: "en",
    note: L(
      "Academic study of colonial art context, training, exhibitions and critical interpretation. Consulted at reference level; full chapter requires manual review.",
      "Étude universitaire du contexte artistique colonial, de la formation, des expositions et de l'interprétation critique. Consultée au niveau référence ; le chapitre complet demande une lecture manuelle.",
      "دراسة أكاديمية للسياق الفني الاستعماري والتكوين والمعارض والتأويل النقدي. أُخذت على مستوى المرجع، ويحتاج الفصل كاملًا إلى مراجعة يدوية.",
    ),
  }),
  // \u2500\u2500\u2500 Mouloud Mammeri \u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500
  S({
    id: "wikipedia-mouloud-mammeri",
    kind: "web",
    category: "further",
    title: L("Mouloud Mammeri", "Mouloud Mammeri", "مولود معمري"),
    publisher: L("Wikipedia, English edition", "Wikipédia, édition anglaise", "ويكيبيديا، النسخة الإنجليزية"),
    url: "https://en.wikipedia.org/wiki/Mouloud_Mammeri",
    language: "en",
    note: L(
      "Used as an initial biographical overview and starting bibliography.",
      "Utilisé comme aperçu biographique initial et point de départ bibliographique.",
      "استُخدم كنظرة أولية على سيرته ونقطة انطلاق للمراجع.",
    ),
  }),
  // \u2500\u2500\u2500 Mohammed Arkoun \u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500
  S({
    id: "wikipedia-mohammed-arkoun",
    kind: "web",
    category: "further",
    title: L("Mohammed Arkoun", "Mohammed Arkoun", "\u0645\u062d\u0645\u062f \u0623\u0631\u0643\u0648\u0646"),
    publisher: L("Wikipedia, English edition", "Wikipedia, \u00e9dition anglaise", "\u0648\u064a\u0643\u064a\u0628\u064a\u062f\u064a\u0627\u060c \u0627\u0644\u0646\u0633\u062e\u0629 \u0627\u0644\u0625\u0646\u062c\u0644\u064a\u0632\u064a\u0629"),
    url: "https://en.wikipedia.org/wiki/Mohammed_Arkoun",
    language: "en",
    note: L(
      "Used as the initial biographical overview.",
      "Utilis\u00e9 comme aper\u00e7u biographique initial.",
      "\u0627\u0633\u062a\u064f\u062e\u062f\u0645 \u0643\u0625\u0637\u0627\u0631 \u0633\u064a\u0631\u064a \u0623\u0648\u0644\u064a.",
    ),
  }),
  S({
    id: "gifford-mohammed-arkoun",
    kind: "official",
    category: "academic",
    title: L("Mohammed Arkoun", "Mohammed Arkoun", "\u0645\u062d\u0645\u062f \u0623\u0631\u0643\u0648\u0646"),
    publisher: L("The Gifford Lectures", "The Gifford Lectures", "\u0645\u062d\u0627\u0636\u0631\u0627\u062a \u062c\u064a\u0641\u0648\u0631\u062f"),
    url: "https://giffordarchives.org/lecturers/mohammed-arkoun",
    language: "en",
    note: L(
      "Academic biography and lecture record.",
      "Biographie universitaire et relev\u00e9 des conf\u00e9rences.",
      "\u0633\u064a\u0631\u0629 \u0623\u0643\u0627\u062f\u064a\u0645\u064a\u0629 \u0648\u0633\u062c\u0644 \u0644\u0644\u0645\u062d\u0627\u0636\u0631\u0627\u062a.",
    ),
  }),
  S({
    id: "qantara-arkoun-critic",
    kind: "article",
    category: "media",
    title: L(
      "Mohammed Arkoun: A Modern Critic of Islamic Reason",
      "Mohammed Arkoun : un critique moderne de la raison islamique",
      "\u0645\u062d\u0645\u062f \u0623\u0631\u0643\u0648\u0646: \u0646\u0627\u0642\u062f \u062d\u062f\u064a\u062b \u0644\u0644\u0639\u0642\u0644 \u0627\u0644\u0625\u0633\u0644\u0627\u0645\u064a",
    ),
    author: L("Burhan Schawi", "Burhan Schawi", "\u0628\u0631\u0647\u0627\u0646 \u0634\u0627\u0648\u064a"),
    publisher: L("Qantara", "Qantara", "\u0642\u0646\u0637\u0631\u0629"),
    url: "https://qantara.de/en/article/mohammed-arkoun-modern-critic-islamic-reason",
    publishedAt: "2007-04-13",
    language: "en",
  }),
  S({
    id: "qantara-arkoun-obituary",
    kind: "article",
    category: "media",
    title: L(
      "A Pioneer of Modern Critical Islam Studies",
      "Un pionnier des \u00e9tudes critiques modernes sur l\u2019islam",
      "\u0631\u0627\u0626\u062f \u0641\u064a \u0627\u0644\u062f\u0631\u0627\u0633\u0627\u062a \u0627\u0644\u0625\u0633\u0644\u0627\u0645\u064a\u0629 \u0627\u0644\u0646\u0642\u062f\u064a\u0629 \u0627\u0644\u062d\u062f\u064a\u062b\u0629",
    ),
    author: L("Ursula G\u00fcnther", "Ursula G\u00fcnther", "\u0623\u0648\u0631\u0633\u0648\u0644\u0627 \u063a\u0648\u0646\u062b\u0631"),
    publisher: L("Qantara", "Qantara", "\u0642\u0646\u0637\u0631\u0629"),
    url: "https://qantara.de/en/article/obituary-mohammed-arkoun-pioneer-modern-critical-islam-studies",
    publishedAt: "2010-09-21",
    language: "en",
  }),

  // ─── Women of the Algerian Revolution ─────────────────────────────────
  S({
    id: "wikipedia-femmes-guerre-algerie",
    kind: "web",
    category: "further",
    title: L(
      "Femmes algériennes pendant la guerre d'Algérie",
      "Femmes algériennes pendant la guerre d'Algérie",
      "النساء الجزائريات خلال حرب الجزائر",
    ),
    publisher: L("Wikipédia, French edition", "Wikipédia, édition française", "ويكيبيديا، النسخة الفرنسية"),
    url: "https://fr.wikipedia.org/wiki/Femmes_alg%C3%A9riennes_pendant_la_guerre_d%27Alg%C3%A9rie",
    language: "fr",
    note: L(
      "Used as a starting research overview, including the statistical findings attributed to the historian Djamila Amrane-Minne. Individual claims will be strengthened with scholarly and archival sources as the exhibit develops.",
      "Utilisé comme aperçu de recherche initial, y compris les données statistiques attribuées à l'historienne Djamila Amrane-Minne. Chaque affirmation sera étayée par des sources scientifiques et archivistiques à mesure que l'exposition se développera.",
      "استُخدم كإطار بحثي أولي، بما في ذلك المعطيات الإحصائية المنسوبة إلى المؤرخة جميلة أمران مين. وستُدعَّم كل مقولة بمصادر علمية وأرشيفية مع تطوّر المعرض.",
    ),
  }),
  // ─── International organizations ──────────────────────────────────────
  S({
    id: "unesco-timgad",
    kind: "official",
    category: "international",
    title: L(
      "Timgad — UNESCO World Heritage Centre",
      "Timgad — Centre du patrimoine mondial UNESCO",
      "تيمقاد — مركز التراث العالمي لليونسكو",
    ),
    publisher: L("UNESCO", "UNESCO", "اليونسكو"),
    url: "https://whc.unesco.org/en/list/194/",
    language: "en",
    badge: "UNESCO",
  }),
  S({
    id: "unesco-djemila",
    kind: "official",
    category: "international",
    title: L(
      "Djémila — UNESCO World Heritage Centre",
      "Djémila — Centre du patrimoine mondial UNESCO",
      "جميلة — مركز التراث العالمي لليونسكو",
    ),
    publisher: L("UNESCO", "UNESCO", "اليونسكو"),
    url: "https://whc.unesco.org/en/list/191/",
    badge: "UNESCO",
  }),
  S({
    id: "unesco-kasbah",
    kind: "official",
    category: "international",
    title: L(
      "Kasbah of Algiers — UNESCO World Heritage Centre",
      "Casbah d'Alger — Centre du patrimoine mondial UNESCO",
      "قصبة الجزائر — مركز التراث العالمي لليونسكو",
    ),
    publisher: L("UNESCO", "UNESCO", "اليونسكو"),
    url: "https://whc.unesco.org/en/list/565/",
    badge: "UNESCO",
  }),
  S({
    id: "unesco-tassili",
    kind: "official",
    category: "international",
    title: L(
      "Tassili n'Ajjer — UNESCO World Heritage Centre",
      "Tassili n'Ajjer — Centre du patrimoine mondial UNESCO",
      "الطاسيلي ناجر — مركز التراث العالمي لليونسكو",
    ),
    publisher: L("UNESCO", "UNESCO", "اليونسكو"),
    url: "https://whc.unesco.org/en/list/179/",
    badge: "UNESCO",
  }),
  S({
    id: "unesco-mab-tassili",
    kind: "official",
    category: "international",
    title: L(
      "Tassili N'Ajjer, UNESCO Man and the Biosphere Programme",
      "Tassili N'Ajjer, Programme sur l'homme et la biosphère (UNESCO)",
      "طاسيلي ناجر، برنامج الإنسان والمحيط الحيوي لليونسكو",
    ),
    publisher: L("UNESCO", "UNESCO", "اليونسكو"),
    url: "https://www.unesco.org/en/mab/tassili-najjer",
    badge: "UNESCO",
  }),
  S({
    id: "unesco-ich-imzad",
    kind: "official",
    category: "international",
    title: L(
      "Practices and knowledge linked to the Imzad of the Tuareg communities of Algeria, Mali and Niger",
      "Pratiques et savoirs liés à l'imzad des communautés touarègues d'Algérie, du Mali et du Niger",
      "الممارسات والمعارف المرتبطة بالإمزاد لدى مجتمعات الطوارق في الجزائر ومالي والنيجر",
    ),
    publisher: L(
      "UNESCO Intangible Cultural Heritage",
      "Patrimoine culturel immatériel, UNESCO",
      "التراث الثقافي غير المادي، اليونسكو",
    ),
    url: "https://ich.unesco.org/en/RL/practices-and-knowledge-linked-to-the-imzad-of-the-tuareg-communities-of-algeria-mali-and-niger-00891",
    badge: "UNESCO",
  }),
  S({
    id: "unesco-ich-sebeiba",
    kind: "official",
    category: "international",
    title: L(
      "Ritual and ceremonies of Sebeïba in the oasis of Djanet, Algeria",
      "Rituel et cérémonies de la Sebeïba dans l'oasis de Djanet, Algérie",
      "طقوس واحتفالات السبيبة في واحة جانت، الجزائر",
    ),
    publisher: L(
      "UNESCO Intangible Cultural Heritage",
      "Patrimoine culturel immatériel, UNESCO",
      "التراث الثقافي غير المادي، اليونسكو",
    ),
    url: "https://ich.unesco.org/en/RL/ritual-and-ceremonies-of-sebeiba-in-the-oasis-of-djanet-algeria-00665",
    badge: "UNESCO",
  }),
  S({
    id: "met-sahel-empires",
    kind: "web",
    category: "museum",
    title: L(
      "Sahel: Art and Empires on the Shores of the Sahara",
      "Sahel : art et empires aux rives du Sahara",
      "الساحل: الفن والإمبراطوريات على ضفاف الصحراء",
    ),
    publisher: L(
      "The Metropolitan Museum of Art",
      "The Metropolitan Museum of Art",
      "متحف متروبوليتان للفنون",
    ),
    url: "https://www.metmuseum.org/exhibitions/sahel-art-empire-sahara/exhibition-objects",
    badge: "The Met",
  }),


  // ─── Academic references ──────────────────────────────────────────────
  S({
    id: "britannica-numidia",
    kind: "web",
    category: "academic",
    title: L("Numidia — Encyclopædia Britannica", "Numidie — Encyclopædia Britannica", "نوميديا — الموسوعة البريطانية"),
    publisher: L("Encyclopædia Britannica", "Encyclopædia Britannica", "الموسوعة البريطانية"),
    url: "https://www.britannica.com/place/Numidia",
    badge: "Britannica",
  }),
  S({
    id: "britannica-massinissa",
    kind: "web",
    category: "academic",
    title: L("Masinissa, king of Numidia — Britannica", "Massinissa, roi de Numidie — Britannica", "ماسينيسا ملك نوميديا — الموسوعة البريطانية"),
    publisher: L("Encyclopædia Britannica", "Encyclopædia Britannica", "الموسوعة البريطانية"),
    url: "https://www.britannica.com/biography/Masinissa",
    badge: "Britannica",
  }),
  S({
    id: "brett-fentress-berbers",
    kind: "book",
    category: "academic",
    title: L("The Berbers", "Les Berbères", "الأمازيغ"),
    author: L("Michael Brett & Elizabeth Fentress", "Michael Brett et Elizabeth Fentress", "مايكل بريت وإليزابيث فنتريس"),
    publisher: L("Blackwell (Peoples of Africa series)", "Blackwell (série Peoples of Africa)", "بلاكويل"),
    publishedAt: "1996",
    badge: "Blackwell",
  }),
  S({
    id: "ruedy-modern-algeria",
    kind: "book",
    category: "academic",
    title: L(
      "Modern Algeria: The Origins and Development of a Nation",
      "L'Algérie moderne : origines et développement d'une nation",
      "الجزائر الحديثة: أصول وتطور أمة",
    ),
    author: L("John Ruedy", "John Ruedy", "جون رويدي"),
    publisher: L("Indiana University Press", "Indiana University Press", "مطبعة جامعة إنديانا"),
    publishedAt: "2005",
    badge: "Indiana UP",
  }),
  S({
    id: "stora-histoire-algerie",
    kind: "book",
    category: "academic",
    title: L(
      "Histoire de l'Algérie coloniale (1830–1954)",
      "Histoire de l'Algérie coloniale (1830–1954)",
      "تاريخ الجزائر المستعمرة (1830–1954)",
    ),
    author: L("Benjamin Stora", "Benjamin Stora", "بنجامين ستورا"),
    publisher: L("La Découverte", "La Découverte", "لا ديكوفيرت"),
    publishedAt: "2004",
    badge: "La Découverte",
  }),
  S({
    id: "camps-encyclopedie-berbere",
    kind: "journal",
    category: "academic",
    title: L("Encyclopédie berbère", "Encyclopédie berbère", "الموسوعة الأمازيغية"),
    author: L("Gabriel Camps (dir.)", "Gabriel Camps (dir.)", "غابرييل كامبس"),
    publisher: L("Édisud / OpenEdition", "Édisud / OpenEdition", "إيديسود / أوبن إيديشن"),
    url: "https://journals.openedition.org/encyclopedieberbere/",
    badge: "OpenEdition",
  }),
  S({
    id: "horne-savage-war",
    kind: "book",
    category: "academic",
    title: L(
      "A Savage War of Peace: Algeria 1954–1962",
      "Une guerre sauvage : Algérie 1954–1962",
      "حرب السلام الوحشية: الجزائر 1954–1962",
    ),
    author: L("Alistair Horne", "Alistair Horne", "أليستر هورن"),
    publisher: L("New York Review Books", "New York Review Books", "نيويورك ريفيو بوكس"),
    publishedAt: "1977",
  }),

  // ─── Museum collections ───────────────────────────────────────────────
  S({
    id: "bardo-algiers",
    kind: "museum",
    category: "museum",
    title: L("Musée national du Bardo — Algiers", "Musée national du Bardo — Alger", "المتحف الوطني للباردو — الجزائر"),
    publisher: L("Ministère de la Culture", "Ministère de la Culture", "وزارة الثقافة"),
    badge: "Bardo",
  }),
  S({
    id: "cirta-constantine",
    kind: "museum",
    category: "museum",
    title: L("Musée public national Cirta", "Musée public national Cirta", "متحف سيرتا الوطني العمومي"),
    archive: L("Constantine, Algeria", "Constantine, Algérie", "قسنطينة، الجزائر"),
    badge: "Cirta",
  }),
  S({
    id: "louvre-north-africa",
    kind: "museum",
    category: "museum",
    title: L(
      "Département des Antiquités — Musée du Louvre",
      "Département des Antiquités — Musée du Louvre",
      "قسم الآثار — متحف اللوفر",
    ),
    publisher: L("Musée du Louvre", "Musée du Louvre", "متحف اللوفر"),
    url: "https://collections.louvre.fr/",
    badge: "Louvre",
  }),

  // ─── Primary sources / archives ───────────────────────────────────────
  S({
    id: "anom-aix",
    kind: "archive",
    category: "primary",
    title: L(
      "Archives nationales d'outre-mer (ANOM)",
      "Archives nationales d'outre-mer (ANOM)",
      "الأرشيف الوطني لما وراء البحار (ANOM)",
    ),
    archive: L("Aix-en-Provence, France", "Aix-en-Provence, France", "إكس أون بروفانس، فرنسا"),
    url: "https://www.archivesnationales.culture.gouv.fr/anom/",
    badge: "ANOM",
  }),
  S({
    id: "bnf-gallica",
    kind: "archive",
    category: "archive",
    title: L("Gallica — Bibliothèque nationale de France", "Gallica — Bibliothèque nationale de France", "غاليكا — المكتبة الوطنية الفرنسية"),
    publisher: L("BnF", "BnF", "المكتبة الوطنية الفرنسية"),
    url: "https://gallica.bnf.fr/",
    badge: "BnF",
  }),
  S({
    id: "bnalgerie",
    kind: "archive",
    category: "archive",
    title: L(
      "Bibliothèque nationale d'Algérie",
      "Bibliothèque nationale d'Algérie",
      "المكتبة الوطنية الجزائرية",
    ),
    publisher: L("République algérienne", "République algérienne", "الجمهورية الجزائرية"),
    url: "https://www.bnalgerie.dz/",
    badge: "BNA",
  }),
  S({
    id: "ibn-khaldun-muqaddimah",
    kind: "book",
    category: "primary",
    title: L("The Muqaddimah", "Al-Muqaddima (Prolégomènes)", "المقدمة"),
    author: L("Ibn Khaldūn", "Ibn Khaldoun", "ابن خلدون"),
    publishedAt: "1377",
  }),

  // ─── Media / newspapers ───────────────────────────────────────────────
  S({
    id: "el-moudjahid",
    kind: "newspaper",
    category: "media",
    title: L("El Moudjahid — archival editions", "El Moudjahid — éditions d'archives", "المجاهد — الأعداد الأرشيفية"),
    publisher: L("El Moudjahid", "El Moudjahid", "المجاهد"),
    url: "https://www.elmoudjahid.dz/",
  }),
  S({
    id: "aps-algerie-presse-service",
    kind: "newspaper",
    category: "media",
    title: L("Algérie Presse Service (APS)", "Algérie Presse Service (APS)", "وكالة الأنباء الجزائرية"),
    publisher: L("APS", "APS", "وكالة الأنباء الجزائرية"),
    url: "https://www.aps.dz/",
  }),
  S({
    id: "le-monde-archives",
    kind: "newspaper",
    category: "media",
    title: L("Le Monde — archives", "Le Monde — archives", "لوموند — الأرشيف"),
    publisher: L("Le Monde", "Le Monde", "لوموند"),
    url: "https://www.lemonde.fr/",
  }),

  // ─── Football ─────────────────────────────────────────────────────────
  S({
    id: "fifa-com",
    kind: "official",
    category: "football",
    title: L("FIFA — Official records & tournaments", "FIFA — Archives officielles et tournois", "الفيفا — السجلات والبطولات الرسمية"),
    publisher: L("Fédération Internationale de Football Association", "Fédération Internationale de Football Association", "الاتحاد الدولي لكرة القدم"),
    url: "https://www.fifa.com/",
    badge: "FIFA",
  }),
  S({
    id: "caf-online",
    kind: "official",
    category: "football",
    title: L("CAF — Confederation of African Football", "CAF — Confédération africaine de football", "الكاف — الاتحاد الأفريقي لكرة القدم"),
    publisher: L("CAF", "CAF", "الكاف"),
    url: "https://www.cafonline.com/",
    badge: "CAF",
  }),
  S({
    id: "faf-dz",
    kind: "official",
    category: "football",
    title: L("Fédération Algérienne de Football", "Fédération Algérienne de Football", "الاتحادية الجزائرية لكرة القدم"),
    publisher: L("FAF", "FAF", "الفاف"),
    url: "https://www.faf.dz/",
    badge: "FAF",
  }),
  S({
    id: "rsssf",
    kind: "database",
    category: "football",
    title: L("RSSSF — Rec.Sport.Soccer Statistics Foundation", "RSSSF — Rec.Sport.Soccer Statistics Foundation", "مؤسسة إحصائيات كرة القدم"),
    publisher: L("RSSSF", "RSSSF", "RSSSF"),
    url: "https://www.rsssf.org/",
    badge: "RSSSF",
  }),
  S({
    id: "jsk-club-archives",
    kind: "archive",
    category: "football",
    title: L("JS Kabylie — Club archives & communiqués", "JSK — Archives et communiqués du club", "شبيبة القبائل — أرشيف النادي وبياناته"),
    publisher: L("JS Kabylie", "JS Kabylie", "شبيبة القبائل"),
    badge: "JSK",
  }),
  S({
    id: "fln-team-history",
    kind: "book",
    category: "football",
    title: L(
      "L'équipe FLN de football (1958–1962) — histoire et joueurs",
      "L'équipe FLN de football (1958–1962) — histoire et joueurs",
      "منتخب جبهة التحرير الوطني لكرة القدم (1958–1962)",
    ),
    author: L("Various historians", "Divers historiens", "باحثون"),
    publisher: L("El Moudjahid & FAF archives", "Archives El Moudjahid & FAF", "أرشيف المجاهد والفاف"),
  }),
  S({
    id: "cafonline-wafcon",
    kind: "official",
    category: "football",
    title: L("Women's Africa Cup of Nations — CAF", "Coupe d'Afrique féminine — CAF", "كأس أمم أفريقيا للسيدات — الكاف"),
    publisher: L("CAF", "CAF", "الكاف"),
    url: "https://www.cafonline.com/womens-africa-cup-of-nations/",
    badge: "CAF",
  }),

  // ─── Cuisine / culture ────────────────────────────────────────────────
  S({
    id: "unesco-couscous",
    kind: "official",
    category: "international",
    title: L(
      "Couscous — Intangible Cultural Heritage of Humanity (UNESCO 2020)",
      "Couscous — Patrimoine culturel immatériel (UNESCO 2020)",
      "الكسكسي — التراث الثقافي غير المادي لليونسكو (2020)",
    ),
    publisher: L("UNESCO", "UNESCO", "اليونسكو"),
    url: "https://ich.unesco.org/en/RL/couscous-01602",
    publishedAt: "2020",
    badge: "UNESCO",
  }),

  // ─── Further reading / general ────────────────────────────────────────
  S({
    id: "further-mcdougall-algeria",
    kind: "book",
    category: "further",
    title: L("A History of Algeria", "Histoire de l'Algérie", "تاريخ الجزائر"),
    author: L("James McDougall", "James McDougall", "جيمس ماكدوغال"),
    publisher: L("Cambridge University Press", "Cambridge University Press", "مطبعة جامعة كامبريدج"),
    publishedAt: "2017",
    badge: "Cambridge",
  }),
  S({
    id: "further-shatzmiller-berbers",
    kind: "book",
    category: "further",
    title: L("The Berbers and the Islamic State", "Les Berbères et l'État islamique", "الأمازيغ والدولة الإسلامية"),
    author: L("Maya Shatzmiller", "Maya Shatzmiller", "مايا شاتزميلر"),
    publisher: L("Markus Wiener", "Markus Wiener", "ماركوس فينر"),
    publishedAt: "2000",
  }),

  // ─── M'Zab Valley exhibit ─────────────────────────────────────────────
  S({
    id: "unesco-mzab",
    kind: "official",
    category: "international",
    title: L(
      "M'Zab Valley — UNESCO World Heritage Centre",
      "Vallée du M'Zab — Centre du patrimoine mondial UNESCO",
      "وادي مزاب — مركز التراث العالمي لليونسكو",
    ),
    publisher: L("UNESCO", "UNESCO", "اليونسكو"),
    url: "https://whc.unesco.org/en/list/188/",
    publishedAt: "1982",
    badge: "UNESCO",
    note: L(
      "Inscribed 1982 (criteria ii, iii, v) — an intact 10th-century Ibadi urban ensemble that still functions as a living city.",
      "Inscrite en 1982 (critères ii, iii, v) — ensemble urbain ibadite du Xe siècle, toujours habité.",
      "أُدرج عام 1982 (المعايير ii و iii و v) — منظومة عمرانية إباضية من القرن العاشر لا تزال مأهولة.",
    ),
  }),
  S({
    id: "ravereau-mzab",
    kind: "book",
    category: "academic",
    title: L(
      "Le M'Zab, une leçon d'architecture",
      "Le M'Zab, une leçon d'architecture",
      "المزاب: درس في العمارة",
    ),
    author: L("André Ravéreau", "André Ravéreau", "أندريه رافيرو"),
    publisher: L("Sindbad / Actes Sud", "Sindbad / Actes Sud", "سندباد / أكت سود"),
    publishedAt: "1981",
    badge: "Ravéreau",
    note: L(
      "The canonical architectural study of the M'Zab, prefaced by Hassan Fathy — the reference work for climatic and communal design of the ksour.",
      "L'étude architecturale de référence, préfacée par Hassan Fathy — analyse du dessin climatique et communautaire des ksour.",
      "المرجع المعماري الأساسي، بمقدمة حسن فتحي — تحليل للتصميم المناخي والمجتمعي للقصور.",
    ),
  }),
  S({
    id: "donnadieu-habiter-desert",
    kind: "book",
    category: "academic",
    title: L(
      "Habiter le désert : les maisons mozabites",
      "Habiter le désert : les maisons mozabites",
      "سكن الصحراء: بيوت المزاب",
    ),
    author: L(
      "Catherine & Pierre Donnadieu, Hubert Didillon",
      "Catherine et Pierre Donnadieu, Hubert Didillon",
      "كاثرين وبيير دونادييه، هوبير ديديّون",
    ),
    publisher: L("Mardaga", "Mardaga", "مارداغا"),
    publishedAt: "1986",
  }),
  S({
    id: "corbusier-oeuvre-complete",
    kind: "book",
    category: "further",
    title: L(
      "Le Corbusier — Œuvre complète (Sahara notebooks & M'Zab studies)",
      "Le Corbusier — Œuvre complète (carnets sahariens et études du M'Zab)",
      "لو كوربوزييه — الأعمال الكاملة (دفاتر الصحراء ودراسات المزاب)",
    ),
    author: L("Le Corbusier", "Le Corbusier", "لو كوربوزييه"),
    publisher: L("Éditions Girsberger / Birkhäuser", "Éditions Girsberger / Birkhäuser", "غيرسبرغر / بيركهاوزر"),
    publishedAt: "1931–1957",
    note: L(
      "Le Corbusier travelled to Ghardaïa in 1931 and repeatedly cited the M'Zab as a lesson in rational, humane urbanism.",
      "Le Corbusier se rend à Ghardaïa en 1931 et cite à plusieurs reprises le M'Zab comme leçon d'urbanisme rationnel et humain.",
      "زار لو كوربوزييه غرداية عام 1931 واستشهد بالمزاب مراراً كدرس في العمران العقلاني والإنساني.",
    ),
  }),
  S({
    id: "opvm-ghardaia",
    kind: "official",
    category: "archive",
    title: L(
      "Office de Protection et de Promotion de la Vallée du M'Zab (OPVM)",
      "Office de Protection et de Promotion de la Vallée du M'Zab (OPVM)",
      "ديوان حماية والترقية لوادي مزاب",
    ),
    publisher: L("Ministry of Culture, Algeria", "Ministère de la Culture, Algérie", "وزارة الثقافة، الجزائر"),
    url: "https://www.opvm.dz/",
    language: "fr",
    note: L(
      "The Algerian public body responsible for the conservation, documentation and interpretation of the M'Zab Valley since 1988.",
      "L'établissement public algérien chargé de la conservation, de la documentation et de la valorisation de la vallée depuis 1988.",
      "المؤسسة العمومية الجزائرية المكلفة بحماية الوادي وتوثيقه والتعريف به منذ 1988.",
    ),
  }),
  S({
    id: "aghlabid-chronicles-ibadi",
    kind: "book",
    category: "academic",
    title: L(
      "The Ibāḍī Tradition and the Making of the Rustamid Imamate",
      "La tradition ibadite et la formation de l'imamat rustumide",
      "التقليد الإباضي وتشكّل الإمامة الرستمية",
    ),
    author: L("Virginie Prevost", "Virginie Prevost", "فيرجيني بريفوست"),
    publisher: L("Peeters", "Peeters", "بيترز"),
    publishedAt: "2010",
  }),
  S({
    id: "getty-earthen-mzab",
    kind: "article",
    category: "international",
    title: L(
      "Conserving Earthen Architecture — M'Zab Case Study",
      "Conserver l'architecture de terre — étude de cas du M'Zab",
      "حفظ العمارة الطينية — دراسة حالة المزاب",
    ),
    publisher: L("Getty Conservation Institute", "Getty Conservation Institute", "معهد غيتي للحفظ"),
    url: "https://www.getty.edu/conservation/",
    badge: "Getty",
  }),
  S({
    id: "mahj-judaisme",
    kind: "museum",
    category: "museum",
    title: L(
      "Mus\u00e9e d'Art et d'Histoire du Juda\u00efsme",
      "Mus\u00e9e d'art et d'histoire du Juda\u00efsme",
      "\u0645\u062a\u062d\u0641 \u0641\u0646 \u0648\u062a\u0627\u0631\u064a\u062e \u0627\u0644\u064a\u0647\u0648\u062f\u064a\u0629",
    ),
    publisher: L("mahJ, Paris", "mahJ, Paris", "\u0645\u062a\u062d\u0641 mahJ\u060c \u0628\u0627\u0631\u064a\u0633"),
    url: "https://www.mahj.org/",
    language: "fr",
    badge: "mahJ",
    note: L(
      "Museum collections documenting North African Jewish material culture, ritual objects, dress and community life.",
      "Collections mus\u00e9ales documentant la culture mat\u00e9rielle juive nord-africaine, les objets rituels, le costume et la vie communautaire.",
      "\u0645\u062c\u0645\u0648\u0639\u0627\u062a \u0645\u062a\u062d\u0641\u064a\u0629 \u062a\u0648\u062b\u0651\u0642 \u0627\u0644\u062b\u0642\u0627\u0641\u0629 \u0627\u0644\u0645\u0627\u062f\u064a\u0629 \u0627\u0644\u064a\u0647\u0648\u062f\u064a\u0629 \u0641\u064a \u0634\u0645\u0627\u0644 \u0623\u0641\u0631\u064a\u0642\u064a\u0627 \u0648\u0623\u062f\u0648\u0627\u062a\u0647\u0627 \u0627\u0644\u0637\u0642\u0633\u064a\u0629 \u0648\u0644\u0628\u0627\u0633\u0647\u0627 \u0648\u062d\u064a\u0627\u062a\u0647\u0627 \u0627\u0644\u062c\u0645\u0627\u0639\u064a\u0629.",
    ),
  }),
  S({
    id: "ushmm-prewar-maghreb",
    kind: "museum",
    category: "museum",
    title: L(
      "United States Holocaust Memorial Museum, prewar Maghreb",
      "United States Holocaust Memorial Museum, Maghreb d'avant-guerre",
      "\u0645\u062a\u062d\u0641 \u0630\u0643\u0631\u0649 \u0627\u0644\u0647\u0648\u0644\u0648\u0643\u0648\u0633\u062a \u0627\u0644\u0623\u0645\u0631\u064a\u0643\u064a\u060c \u0627\u0644\u0645\u063a\u0631\u0628 \u0642\u0628\u0644 \u0627\u0644\u062d\u0631\u0628",
    ),
    publisher: L(
      "Holocaust Encyclopedia",
      "Encyclop\u00e9die de l'Holocauste",
      "\u0645\u0648\u0633\u0648\u0639\u0629 \u0627\u0644\u0647\u0648\u0644\u0648\u0643\u0648\u0633\u062a",
    ),
    url: "https://encyclopedia.ushmm.org/content/en/article/jews-of-the-maghreb-on-the-eve-of-world-war-ii",
    language: "en",
    badge: "USHMM",
    note: L(
      "Overview of Jewish communities across the Maghreb before the Second World War.",
      "Panorama des communaut\u00e9s juives du Maghreb avant la Seconde Guerre mondiale.",
      "\u0639\u0631\u0636 \u0639\u0627\u0645 \u0644\u0644\u062c\u0645\u0627\u0639\u0627\u062a \u0627\u0644\u064a\u0647\u0648\u062f\u064a\u0629 \u0641\u064a \u0627\u0644\u0645\u063a\u0631\u0628 \u0627\u0644\u0643\u0628\u064a\u0631 \u0642\u0628\u0644 \u0627\u0644\u062d\u0631\u0628 \u0627\u0644\u0639\u0627\u0644\u0645\u064a\u0629 \u0627\u0644\u062b\u0627\u0646\u064a\u0629.",
    ),
  }),
  S({
    id: "ushmm-algeria",
    kind: "museum",
    category: "museum",
    title: L(
      "United States Holocaust Memorial Museum, Vichy legislation",
      "United States Holocaust Memorial Museum, l\u00e9gislation de Vichy",
      "\u0645\u062a\u062d\u0641 \u0630\u0643\u0631\u0649 \u0627\u0644\u0647\u0648\u0644\u0648\u0643\u0648\u0633\u062a \u0627\u0644\u0623\u0645\u0631\u064a\u0643\u064a\u060c \u062a\u0634\u0631\u064a\u0639\u0627\u062a \u0641\u064a\u0634\u064a",
    ),
    publisher: L(
      "Holocaust Encyclopedia",
      "Encyclop\u00e9die de l'Holocauste",
      "\u0645\u0648\u0633\u0648\u0639\u0629 \u0627\u0644\u0647\u0648\u0644\u0648\u0643\u0648\u0633\u062a",
    ),
    url: "https://encyclopedia.ushmm.org/content/en/article/anti-jewish-legislation-in-north-africa",
    language: "en",
    badge: "USHMM",
    note: L(
      "Institutional reference for the revocation of the Cr\u00e9mieux Decree and the antisemitic measures applied in Algeria under Vichy rule.",
      "R\u00e9f\u00e9rence institutionnelle sur l'abrogation du d\u00e9cret Cr\u00e9mieux et les mesures antis\u00e9mites appliqu\u00e9es en Alg\u00e9rie sous Vichy.",
      "\u0645\u0631\u062c\u0639 \u0645\u0624\u0633\u0651\u0633\u064a \u0644\u0625\u0644\u063a\u0627\u0621 \u0645\u0631\u0633\u0648\u0645 \u0643\u0631\u064a\u0645\u064a\u0648 \u0648\u0644\u0644\u0625\u062c\u0631\u0627\u0621\u0627\u062a \u0627\u0644\u0645\u0639\u0627\u062f\u064a\u0629 \u0644\u0644\u0633\u0627\u0645\u064a\u0629 \u0641\u064a \u0627\u0644\u062c\u0632\u0627\u0626\u0631 \u0632\u0645\u0646 \u0641\u064a\u0634\u064a.",
    ),
  }),
  S({
    id: "encyclopedie-berbere-juifs",
    kind: "journal",
    category: "academic",
    title: L(
      "Encyclop\u00e9die berb\u00e8re, Jews of the Maghreb",
      "Encyclop\u00e9die berb\u00e8re, Juifs du Maghreb",
      "\u0627\u0644\u0645\u0648\u0633\u0648\u0639\u0629 \u0627\u0644\u0623\u0645\u0627\u0632\u064a\u063a\u064a\u0629\u060c \u064a\u0647\u0648\u062f \u0627\u0644\u0645\u063a\u0631\u0628 \u0627\u0644\u0643\u0628\u064a\u0631",
    ),
    publisher: L("Encyclop\u00e9die berb\u00e8re, OpenEdition Journals", "Encyclop\u00e9die berb\u00e8re, OpenEdition Journals", "\u0627\u0644\u0645\u0648\u0633\u0648\u0639\u0629 \u0627\u0644\u0623\u0645\u0627\u0632\u064a\u063a\u064a\u0629"),
    url: "https://journals.openedition.org/encyclopedieberbere/?s=Juifs+Maghreb",
    language: "fr",
    badge: "EB",
    note: L(
      "Scholarly reference on Jewish presence in the Maghreb, regional distribution, Judeo-Arabic and Judeo-Berber usage, and the limits of the documentary record.",
      "R\u00e9f\u00e9rence savante sur la pr\u00e9sence juive au Maghreb, la r\u00e9partition r\u00e9gionale, les usages jud\u00e9o-arabes et jud\u00e9o-berb\u00e8res, et les limites de la documentation.",
      "\u0645\u0631\u062c\u0639 \u0623\u0643\u0627\u062f\u064a\u0645\u064a \u0639\u0646 \u0627\u0644\u062d\u0636\u0648\u0631 \u0627\u0644\u064a\u0647\u0648\u062f\u064a \u0641\u064a \u0627\u0644\u0645\u063a\u0631\u0628 \u0627\u0644\u0643\u0628\u064a\u0631 \u0648\u062a\u0648\u0632\u0651\u0639\u0647 \u0648\u0644\u063a\u0627\u062a\u0647 \u0648\u062d\u062f\u0648\u062f \u0627\u0644\u062a\u0648\u062b\u064a\u0642.",
    ),
  }),
  S({
    id: "encyclopedie-berbere-juifs-mzab",
    kind: "journal",
    category: "academic",
    title: L(
      "Encyclop\u00e9die berb\u00e8re, Jews of the M'Zab",
      "Encyclop\u00e9die berb\u00e8re, Juifs du M'Zab",
      "\u0627\u0644\u0645\u0648\u0633\u0648\u0639\u0629 \u0627\u0644\u0623\u0645\u0627\u0632\u064a\u063a\u064a\u0629\u060c \u064a\u0647\u0648\u062f \u0648\u0627\u062f\u064a \u0645\u0632\u0627\u0628",
    ),
    publisher: L("Encyclop\u00e9die berb\u00e8re, OpenEdition Journals", "Encyclop\u00e9die berb\u00e8re, OpenEdition Journals", "\u0627\u0644\u0645\u0648\u0633\u0648\u0639\u0629 \u0627\u0644\u0623\u0645\u0627\u0632\u064a\u063a\u064a\u0629"),
    url: "https://journals.openedition.org/encyclopedieberbere/?s=Juifs+Mzab",
    language: "fr",
    badge: "EB",
    note: L(
      "Reference for the Jewish community of Gharda\u00efa and the M'Zab, its local traditions of origin and its distinct legal status under military administration.",
      "R\u00e9f\u00e9rence sur la communaut\u00e9 juive de Gharda\u00efa et du M'Zab, ses traditions d'origine locales et son statut juridique distinct sous administration militaire.",
      "\u0645\u0631\u062c\u0639 \u0639\u0646 \u0627\u0644\u062c\u0645\u0627\u0639\u0629 \u0627\u0644\u064a\u0647\u0648\u062f\u064a\u0629 \u0641\u064a \u063a\u0631\u062f\u0627\u064a\u0629 \u0648\u0648\u0627\u062f\u064a \u0645\u0632\u0627\u0628 \u0648\u062a\u0642\u0627\u0644\u064a\u062f\u0647\u0627 \u0648\u0648\u0636\u0639\u0647\u0627 \u0627\u0644\u0642\u0627\u0646\u0648\u0646\u064a \u0627\u0644\u0645\u062a\u0645\u064a\u0651\u0632.",
    ),
  }),
  S({
    id: "encyclopedie-berbere-juifs-sahara",
    kind: "journal",
    category: "academic",
    title: L(
      "Encyclop\u00e9die berb\u00e8re, Jews of the Sahara",
      "Encyclop\u00e9die berb\u00e8re, Juifs du Sahara",
      "\u0627\u0644\u0645\u0648\u0633\u0648\u0639\u0629 \u0627\u0644\u0623\u0645\u0627\u0632\u064a\u063a\u064a\u0629\u060c \u064a\u0647\u0648\u062f \u0627\u0644\u0635\u062d\u0631\u0627\u0621",
    ),
    publisher: L("Encyclop\u00e9die berb\u00e8re, OpenEdition Journals", "Encyclop\u00e9die berb\u00e8re, OpenEdition Journals", "\u0627\u0644\u0645\u0648\u0633\u0648\u0639\u0629 \u0627\u0644\u0623\u0645\u0627\u0632\u064a\u063a\u064a\u0629"),
    url: "https://journals.openedition.org/encyclopedieberbere/?s=Juifs+Sahara",
    language: "fr",
    badge: "EB",
    note: L(
      "Reference for Saharan oasis communities and their place in caravan commerce across Touat, the M'Zab and the desert routes.",
      "R\u00e9f\u00e9rence sur les communaut\u00e9s des oasis sahariennes et leur place dans le commerce caravanier du Touat, du M'Zab et des routes du d\u00e9sert.",
      "\u0645\u0631\u062c\u0639 \u0639\u0646 \u062c\u0645\u0627\u0639\u0627\u062a \u0627\u0644\u0648\u0627\u062d\u0627\u062a \u0627\u0644\u0635\u062d\u0631\u0627\u0648\u064a\u0629 \u0648\u0645\u0648\u0642\u0639\u0647\u0627 \u0641\u064a \u0627\u0644\u062a\u062c\u0627\u0631\u0629 \u0627\u0644\u0642\u0648\u0627\u0641\u0644\u064a\u0629.",
    ),
  }),
  S({
    id: "archives-nationales-fr-algerie",
    kind: "archive",
    category: "archive",
    title: L(
      "French National Archives, Cr\u00e9mieux Decree",
      "Archives nationales de France, d\u00e9cret Cr\u00e9mieux",
      "\u0627\u0644\u0623\u0631\u0634\u064a\u0641 \u0627\u0644\u0648\u0637\u0646\u064a \u0627\u0644\u0641\u0631\u0646\u0633\u064a\u060c \u0645\u0631\u0633\u0648\u0645 \u0643\u0631\u064a\u0645\u064a\u0648",
    ),
    publisher: L("Archives nationales de France", "Archives nationales de France", "\u0627\u0644\u0623\u0631\u0634\u064a\u0641 \u0627\u0644\u0648\u0637\u0646\u064a \u0627\u0644\u0641\u0631\u0646\u0633\u064a"),
    url: "https://www.archives-nationales.culture.gouv.fr/",
    language: "fr",
    badge: "AN",
    note: L(
      "Primary documentary basis for Decree No. 136 of 24 October 1870 and for the legal categories imposed on the population of colonial Algeria.",
      "Base documentaire primaire pour le d\u00e9cret n\u00b0 136 du 24 octobre 1870 et pour les cat\u00e9gories juridiques impos\u00e9es \u00e0 la population de l'Alg\u00e9rie coloniale.",
      "\u0627\u0644\u0623\u0633\u0627\u0633 \u0627\u0644\u0648\u062b\u0627\u0626\u0642\u064a \u0627\u0644\u0623\u0648\u0644\u064a \u0644\u0644\u0645\u0631\u0633\u0648\u0645 \u0631\u0642\u0645 136 \u0627\u0644\u0635\u0627\u062f\u0631 \u0641\u064a 24 \u0623\u0643\u062a\u0648\u0628\u0631 1870 \u0648\u0644\u0644\u0641\u0626\u0627\u062a \u0627\u0644\u0642\u0627\u0646\u0648\u0646\u064a\u0629 \u0627\u0644\u0645\u0641\u0631\u0648\u0636\u0629 \u0641\u064a \u0627\u0644\u062c\u0632\u0627\u0626\u0631 \u0627\u0644\u0645\u0633\u062a\u0639\u0645\u064e\u0631\u0629.",
    ),
  }),

  // ─── Jewish music of Algeria ──────────────────────────────────────
  S({
    id: "iemj-chants-juifs-algerie",
    kind: "museum",
    category: "museum",
    title: L(
      "Institut Européen des Musiques Juives, Songs by Jews from Algeria",
      "Institut Européen des Musiques Juives, Chants des Juifs d'Algérie",
      "المعهد الأوروبي للموسيقى اليهودية، أغاني يهود الجزائر",
    ),
    publisher: L(
      "Institut Européen des Musiques Juives",
      "Institut Européen des Musiques Juives",
      "المعهد الأوروبي للموسيقى اليهودية",
    ),
    url: "https://www.iemj.org/en/chants-des-juifs-dalgerie-1/",
    language: "mixed",
    badge: "IEMJ",
    note: L(
      "Institutional collection documenting the Judeo-Arabic song repertoires of Algeria.",
      "Collection institutionnelle documentant les répertoires de la chanson judéo-arabe d'Algérie.",
      "مجموعة مؤسسية توثق متون الأغنية اليهودية العربية في الجزائر.",
    ),
  }),
  S({
    id: "iemj-musique-juifs-maghreb",
    kind: "museum",
    category: "museum",
    title: L(
      "Institut Européen des Musiques Juives, The Music of the Jews of the Maghreb",
      "Institut Européen des Musiques Juives, La musique des Juifs du Maghreb",
      "المعهد الأوروبي للموسيقى اليهودية، موسيقى يهود المغرب الكبير",
    ),
    publisher: L(
      "Institut Européen des Musiques Juives",
      "Institut Européen des Musiques Juives",
      "المعهد الأوروبي للموسيقى اليهودية",
    ),
    url: "https://www.iemj.org/en/discover/guided-tours/la-musique-des-juifs-du-maghreb/",
    language: "mixed",
    badge: "IEMJ",
    note: L(
      "Guided overview of Maghrebi Jewish musical traditions and their shared repertoires.",
      "Parcours guidé sur les traditions musicales juives du Maghreb et leurs répertoires partagés.",
      "جولة تعريفية بالتقاليد الموسيقية اليهودية المغاربية ومتونها المشتركة.",
    ),
  }),
  S({
    id: "iemj-cheikh-raymond",
    kind: "museum",
    category: "museum",
    title: L(
      "Institut Européen des Musiques Juives, Cheikh Raymond (1912-1961)",
      "Institut Européen des Musiques Juives, Cheikh Raymond (1912-1961)",
      "المعهد الأوروبي للموسيقى اليهودية، الشيخ ريموند (1912-1961)",
    ),
    publisher: L(
      "Institut Européen des Musiques Juives",
      "Institut Européen des Musiques Juives",
      "المعهد الأوروبي للموسيقى اليهودية",
    ),
    url: "https://www.iemj.org/en/cheikh-raymond-1912-1961/",
    language: "mixed",
    badge: "IEMJ",
    note: L(
      "Biographical record for the Constantine malouf master Raymond Leyris.",
      "Notice biographique du maître du malouf constantinois Raymond Leyris.",
      "ترجمة لسيرة معلّم المالوف القسنطيني ريمون لايريس.",
    ),
  }),
  S({
    id: "iemj-salim-halali",
    kind: "museum",
    category: "museum",
    title: L(
      "Institut Européen des Musiques Juives, Salim Halali (1920-2005)",
      "Institut Européen des Musiques Juives, Salim Halali (1920-2005)",
      "المعهد الأوروبي للموسيقى اليهودية، سليم الهلالي (1920-2005)",
    ),
    publisher: L(
      "Institut Européen des Musiques Juives",
      "Institut Européen des Musiques Juives",
      "المعهد الأوروبي للموسيقى اليهودية",
    ),
    url: "https://www.iemj.org/en/halali-salim-1920-2005/",
    language: "mixed",
    badge: "IEMJ",
    note: L(
      "Biographical record for the Annaba-born singer Salim Halali.",
      "Notice biographique du chanteur né à Annaba Salim Halali.",
      "ترجمة لسيرة المغني المولود في عنابة سليم الهلالي.",
    ),
  }),
  S({
    id: "iemj-maurice-el-medioni",
    kind: "museum",
    category: "museum",
    title: L(
      "Institut Européen des Musiques Juives, Maurice El Médioni (1928-2024)",
      "Institut Européen des Musiques Juives, Maurice El Médioni (1928-2024)",
      "المعهد الأوروبي للموسيقى اليهودية، موريس المديوني (1928-2024)",
    ),
    publisher: L(
      "Institut Européen des Musiques Juives",
      "Institut Européen des Musiques Juives",
      "المعهد الأوروبي للموسيقى اليهودية",
    ),
    url: "https://www.iemj.org/en/el-medioni-maurice-1928-2024/",
    language: "mixed",
    badge: "IEMJ",
    note: L(
      "Biographical record for the Oran pianist Maurice El Médioni.",
      "Notice biographique du pianiste oranais Maurice El Médioni.",
      "ترجمة لسيرة عازف البيانو الوهراني موريس المديوني.",
    ),
  }),
  S({
    id: "jwa-sultana-daoud",
    kind: "article",
    category: "academic",
    title: L(
      "Jewish Women's Archive, Birth of Sultana Daoud",
      "Jewish Women's Archive, Naissance de Sultana Daoud",
      "أرشيف النساء اليهوديات، ميلاد سلطانة داود",
    ),
    publisher: L("Jewish Women's Archive", "Jewish Women's Archive", "أرشيف النساء اليهوديات"),
    url: "https://jwa.org/thisweek/apr/25/1915/birth-sultana-daoud",
    language: "en",
    badge: "JWA",
    note: L(
      "Reference note on the birth in Tiaret and career of Sultana Daoud, known as Reinette l'Oranaise.",
      "Notice de référence sur la naissance à Tiaret et la carrière de Sultana Daoud, dite Reinette l'Oranaise.",
      "مرجع حول ميلاد سلطانة داود في تيارت ومسيرتها الفنية، المعروفة برينات الوهرانية.",
    ),
  }),
];


const byId = new Map(SOURCES.map((s) => [s.id, s]));

export function getSource(id: string): ProvenanceSource | undefined {
  return byId.get(id);
}

export function getSources(ids: readonly string[]): ProvenanceSource[] {
  const out: ProvenanceSource[] = [];
  for (const id of ids) {
    const s = byId.get(id);
    if (s) out.push(s);
  }
  return out;
}

export function totalSources(): number {
  return SOURCES.length;
}

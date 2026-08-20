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

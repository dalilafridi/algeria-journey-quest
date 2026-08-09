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

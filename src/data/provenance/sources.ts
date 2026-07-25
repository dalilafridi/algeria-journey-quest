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

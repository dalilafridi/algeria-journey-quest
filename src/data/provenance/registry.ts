/**
 * Exhibit → provenance registry.
 *
 * A single flat map keyed by a canonical exhibit id:
 *   figure:<id>, era:<id>, region:<id>, club:<id>, culture:<id>,
 *   match:<id>, cuisine, timeline, football, football-lesvertes.
 *
 * Sources are referenced by id only. Add or extend a record here — never
 * duplicate the underlying `ProvenanceSource` entries.
 */

import type { ExhibitProvenanceRecord } from "@/lib/provenance";
import { SOURCES, getSource } from "@/data/provenance/sources";

const R = <T extends ExhibitProvenanceRecord>(r: T) => r;

const T = {
  intro: {
    en: "Every historical statement on this page is traceable to the reliable sources listed below.",
    fr: "Chaque affirmation historique de cette page est traçable aux sources fiables listées ci-dessous.",
    ar: "كلّ ادّعاء تاريخي في هذه الصفحة يمكن تتبّعه إلى المصادر الموثوقة المدرجة أدناه.",
  },
  datesVary: {
    en: "Dates and place names vary slightly between historical sources; we follow the mainstream scholarly consensus.",
    fr: "Les dates et toponymes varient légèrement selon les sources ; nous suivons le consensus universitaire dominant.",
    ar: "تتباين التواريخ والأسماء قليلاً بين المصادر التاريخية؛ نتبع الإجماع العلمي السائد.",
  },
  oralTradition: {
    en: "Elements of this account are preserved through oral tradition and are marked as such.",
    fr: "Des éléments de ce récit sont transmis par tradition orale et signalés comme tels.",
    ar: "بعض عناصر هذه الرواية محفوظة عبر التقليد الشفهي ومُشار إليها بذلك.",
  },
} as const;

/* eslint-disable-next-line @typescript-eslint/no-explicit-any */
export const EXHIBIT_PROVENANCE: Record<string, ExhibitProvenanceRecord> = {
  // ─── Standalone exhibits ────────────────────────────────────────────
  "women-of-independence": R({
    sourceIds: ["wikipedia-femmes-guerre-algerie"],
    confidence: "widely-accepted",
    intro: T.intro,
    notes: [
      {
        kind: "note",
        body: {
          en: "This is a foundation exhibit built on a single general overview source. Statistics are attributed to the research of Djamila Amrane-Minne and should be read as documented estimates. Scholarly, archival and testimony sources will be added as the exhibit grows.",
          fr: "Il s'agit d'une exposition fondatrice reposant sur une seule source générale. Les statistiques sont attribuées aux recherches de Djamila Amrane-Minne et doivent être lues comme des estimations documentées. Des sources scientifiques, archivistiques et testimoniales seront ajoutées à mesure que l'exposition grandira.",
          ar: "هذا معرض تأسيسي يقوم على مصدر عام واحد. تُنسب الإحصاءات إلى أبحاث جميلة أمران مين وينبغي قراءتها بوصفها تقديرات موثّقة. وستُضاف مصادر علمية وأرشيفية وشهادات مع نموّ المعرض.",
        },
      },
    ],
  }),
  // ─── Historical figures ─────────────────────────────────────────────
  "figure:mammeri": R({
    sourceIds: ["wikipedia-mouloud-mammeri"],
    confidence: "widely-accepted",
    intro: T.intro,
  }),
  "figure:azouaou-mammeri": R({
    sourceIds: [
      "idref-azouaou-mammeri",
      "leonore-azouaou-mammeri",
      "cma-azouaou-mammeri-koranic-school",
      "benjamin-mammeri-racim",
      "wikipedia-azouaou-mammeri",
    ],
    confidence: "widely-accepted",
    intro: T.intro,
    notes: [
      {
        kind: "dates",
        body: {
          en: "Birth year is disputed. An authority record gives 1890 while a French archival file gives 1892, so both are shown and neither is presented as settled. Media status: no public portrait or artwork used pending image-rights verification.",
          fr: "L'année de naissance est disputée. Une notice d'autorité indique 1890 tandis qu'un dossier d'archives français indique 1892 : les deux sont affichées et aucune n'est présentée comme acquise. Statut des images : aucun portrait ni œuvre publiés, en attente de vérification des droits.",
          ar: "سنة الميلاد محل خلاف. فسجل استنادي يذكر 1890 وملف أرشيفي فرنسي يذكر 1892، ولذلك يُعرض التاريخان معًا دون ترجيح. وضع الصور: لا تُعرض أي صورة شخصية أو عمل فني بانتظار التحقق من الحقوق.",
        },
      },
    ],
  }),
  "figure:mohammed-arkoun": R({
    sourceIds: [
      "gifford-mohammed-arkoun",
      "qantara-arkoun-critic",
      "qantara-arkoun-obituary",
      "wikipedia-mohammed-arkoun",
    ],
    confidence: "widely-accepted",
    intro: T.intro,
  }),
  "figure:massinissa": R({
    sourceIds: ["britannica-massinissa", "britannica-numidia", "brett-fentress-berbers", "camps-encyclopedie-berbere"],
    confidence: "widely-accepted",
    intro: T.intro,
    notes: [{ kind: "dates", body: T.datesVary }],
    furtherReadingIds: ["further-mcdougall-algeria"],
  }),
  "figure:jugurtha": R({
    sourceIds: ["britannica-numidia", "brett-fentress-berbers", "camps-encyclopedie-berbere"],
    confidence: "widely-accepted",
  }),
  "figure:dihya": R({
    sourceIds: ["camps-encyclopedie-berbere", "brett-fentress-berbers", "ibn-khaldun-muqaddimah"],
    confidence: "academic-debate",
    intro: T.intro,
    notes: [
      {
        kind: "debate",
        body: {
          en: "Dihya's life is documented largely through medieval Arab chroniclers writing centuries after her death; details of her origin, faith and death remain debated among historians.",
          fr: "La vie de Dihya nous est essentiellement connue par des chroniqueurs arabes médiévaux écrivant plusieurs siècles après sa mort ; ses origines, sa foi et sa mort restent débattues.",
          ar: "تُعرف حياة ديهيا أساساً من المؤرخين العرب في العصور الوسطى الذين كتبوا بعد قرون من وفاتها؛ ولا تزال أصولها وعقيدتها ووفاتها موضع نقاش.",
        },
      },
    ],
  }),
  "figure:kahina": R({
    sourceIds: ["camps-encyclopedie-berbere", "brett-fentress-berbers", "ibn-khaldun-muqaddimah"],
    confidence: "traditional",
    notes: [{ kind: "oral-tradition", body: T.oralTradition }],
  }),
  "figure:abdelkader": R({
    sourceIds: ["ruedy-modern-algeria", "stora-histoire-algerie", "anom-aix", "bnf-gallica"],
    confidence: "verified",
  }),
  "figure:ibn-khaldun": R({
    sourceIds: ["ibn-khaldun-muqaddimah", "further-shatzmiller-berbers"],
    confidence: "verified",
  }),
  "figure:ben-mhidi": R({
    sourceIds: ["horne-savage-war", "stora-histoire-algerie", "el-moudjahid"],
    confidence: "verified",
  }),
  "figure:abane-ramdane": R({
    sourceIds: ["horne-savage-war", "stora-histoire-algerie"],
    confidence: "verified",
  }),
  "figure:lalla-fatma-nsoumer": R({
    sourceIds: ["stora-histoire-algerie", "camps-encyclopedie-berbere", "anom-aix"],
    confidence: "widely-accepted",
  }),
  "figure:el-mokrani": R({
    sourceIds: ["stora-histoire-algerie", "anom-aix", "bnf-gallica"],
    confidence: "verified",
  }),
  "figure:krim-belkacem": R({
    sourceIds: ["horne-savage-war", "stora-histoire-algerie"],
    confidence: "verified",
  }),
  "figure:ferhat-abbas": R({
    sourceIds: ["stora-histoire-algerie", "ruedy-modern-algeria"],
    confidence: "verified",
  }),
  "figure:mouloud-feraoun": R({
    sourceIds: ["bnf-gallica", "stora-histoire-algerie"],
    confidence: "verified",
  }),
  "figure:assia-djebar": R({
    sourceIds: ["bnf-gallica", "le-monde-archives"],
    confidence: "verified",
  }),
  "figure:syphax": R({
    sourceIds: ["britannica-numidia", "brett-fentress-berbers"],
    confidence: "widely-accepted",
  }),

  // ─── Eras ───────────────────────────────────────────────────────────
  "era:earlynorthafrica": R({
    sourceIds: ["camps-encyclopedie-berbere", "brett-fentress-berbers", "unesco-tassili"],
    confidence: "widely-accepted",
    notes: [{ kind: "dates", body: T.datesVary }],
  }),
  "era:numidia": R({
    sourceIds: ["britannica-numidia", "brett-fentress-berbers", "cirta-constantine", "camps-encyclopedie-berbere"],
    confidence: "widely-accepted",
    intro: T.intro,
  }),
  "era:roman": R({
    sourceIds: ["unesco-timgad", "unesco-djemila", "louvre-north-africa", "brett-fentress-berbers"],
    confidence: "verified",
    intro: T.intro,
  }),
  "era:islamic": R({
    sourceIds: ["ibn-khaldun-muqaddimah", "further-shatzmiller-berbers", "brett-fentress-berbers"],
    confidence: "widely-accepted",
  }),
  "era:ottoman": R({
    sourceIds: ["ruedy-modern-algeria", "bnf-gallica", "further-mcdougall-algeria"],
    confidence: "widely-accepted",
  }),
  "era:french": R({
    sourceIds: ["stora-histoire-algerie", "ruedy-modern-algeria", "anom-aix", "bnf-gallica"],
    confidence: "verified",
    intro: T.intro,
  }),
  "era:independence": R({
    sourceIds: ["horne-savage-war", "stora-histoire-algerie", "el-moudjahid", "aps-algerie-presse-service"],
    confidence: "verified",
    furtherReadingIds: ["further-mcdougall-algeria"],
  }),

  // ─── Regions ────────────────────────────────────────────────────────
  "region:kabylie": R({
    sourceIds: ["camps-encyclopedie-berbere", "brett-fentress-berbers", "constitution-dz-tamazight", "further-shatzmiller-berbers"],
    confidence: "widely-accepted",
  }),
  "region:algiers": R({
    sourceIds: ["unesco-kasbah", "stora-histoire-algerie", "bnf-gallica"],
    confidence: "verified",
  }),
  "region:constantine": R({
    sourceIds: ["cirta-constantine", "britannica-numidia", "brett-fentress-berbers"],
    confidence: "widely-accepted",
  }),
  "region:aures": R({
    sourceIds: ["camps-encyclopedie-berbere", "horne-savage-war"],
    confidence: "widely-accepted",
  }),
  "region:oran-west": R({
    sourceIds: ["ruedy-modern-algeria", "bnf-gallica"],
    confidence: "widely-accepted",
  }),
  "region:numidia": R({
    sourceIds: ["britannica-numidia", "cirta-constantine", "brett-fentress-berbers"],
    confidence: "widely-accepted",
  }),
  "region:sahara": R({
    sourceIds: ["unesco-tassili", "camps-encyclopedie-berbere"],
    confidence: "widely-accepted",
  }),

  // ─── Clubs ──────────────────────────────────────────────────────────
  "club:js-kabylie": R({
    sourceIds: ["jsk-club-archives", "faf-dz", "caf-online", "aps-algerie-presse-service", "el-moudjahid"],
    confidence: "verified",
    intro: {
      en: "JSK results, honours and dates are cross-checked against club archives, the Algerian FA (FAF), CAF records and contemporary press.",
      fr: "Les résultats, titres et dates du JSK sont recoupés avec les archives du club, la FAF, la CAF et la presse d'époque.",
      ar: "تُوثَّق نتائج شبيبة القبائل وألقابها وتواريخها بمقارنتها مع أرشيف النادي والفاف والكاف والصحافة المعاصرة.",
    },
  }),

  // ─── Football (hall) ────────────────────────────────────────────────
  football: R({
    sourceIds: ["fifa-com", "caf-online", "faf-dz", "rsssf", "fln-team-history", "el-moudjahid"],
    confidence: "verified",
    intro: {
      en: "Match results, squads and tournament records are cross-checked against FIFA, CAF, the Algerian FA (FAF) and RSSSF.",
      fr: "Résultats, effectifs et palmarès sont recoupés avec la FIFA, la CAF, la FAF et RSSSF.",
      ar: "تُتحقَّق النتائج والتشكيلات والسجلات بمقارنتها مع الفيفا والكاف والفاف وRSSSF.",
    },
  }),
  "football-lesvertes": R({
    sourceIds: ["cafonline-wafcon", "faf-dz", "fifa-com", "aps-algerie-presse-service"],
    confidence: "widely-accepted",
    intro: {
      en: "The women's national team's history is documented through CAF (WAFCON records), the FAF, FIFA and the Algerian Press Service.",
      fr: "L'histoire des Vertes est documentée via la CAF (CAN féminine), la FAF, la FIFA et l'APS.",
      ar: "يُوثَّق تاريخ المنتخب الوطني للسيدات عبر الكاف (كأس أفريقيا للسيدات) والفاف والفيفا ووكالة الأنباء الجزائرية.",
    },
  }),

  // ─── Culture / cuisine / timeline ───────────────────────────────────
  cuisine: R({
    sourceIds: ["unesco-couscous", "bardo-algiers", "camps-encyclopedie-berbere"],
    confidence: "verified",
    intro: {
      en: "Recipes and cultural notes draw on UNESCO's intangible heritage records, the Bardo Museum, and the Encyclopédie berbère.",
      fr: "Les recettes et notes culturelles s'appuient sur l'UNESCO (patrimoine immatériel), le musée du Bardo et l'Encyclopédie berbère.",
      ar: "تستند الوصفات والملاحظات الثقافية إلى سجلات التراث غير المادي لليونسكو ومتحف الباردو والموسوعة الأمازيغية.",
    },
  }),
  timeline: R({
    sourceIds: [
      "britannica-numidia",
      "brett-fentress-berbers",
      "ruedy-modern-algeria",
      "stora-histoire-algerie",
      "horne-savage-war",
      "unesco-timgad",
    ],
    confidence: "widely-accepted",
    notes: [{ kind: "dates", body: T.datesVary }],
    furtherReadingIds: ["further-mcdougall-algeria", "further-shatzmiller-berbers"],
  }),
  "culture:music": R({
    sourceIds: ["bardo-algiers", "bnalgerie", "camps-encyclopedie-berbere"],
    confidence: "widely-accepted",
  }),
  "culture:literature": R({
    sourceIds: ["bnf-gallica", "bnalgerie", "camps-encyclopedie-berbere"],
    confidence: "widely-accepted",
  }),
  "culture:cinema": R({
    sourceIds: ["bnf-gallica", "le-monde-archives", "aps-algerie-presse-service"],
    confidence: "widely-accepted",
  }),
  "culture:language": R({
    sourceIds: ["camps-encyclopedie-berbere", "constitution-dz-tamazight", "further-shatzmiller-berbers"],
    confidence: "widely-accepted",
  }),
  "culture:cuisine": R({
    sourceIds: ["unesco-couscous", "bardo-algiers"],
    confidence: "verified",
  }),

  // ─── M'Zab Valley flagship exhibit ──────────────────────────────────
  timgad: R({
    sourceIds: ["unesco-timgad"],
    confidence: "verified",
    intro: {
      en: "The exhibit follows the UNESCO World Heritage record for Timgad, together with standard published accounts of the Roman colony of Thamugadi.",
      fr: "L'exposition suit la fiche du patrimoine mondial (UNESCO) consacrée à Timgad, ainsi que les études publiées de référence sur la colonie romaine de Thamugadi.",
      ar: "يعتمد المعرض على سجل التراث العالمي لليونسكو الخاص بتيمقاد، وعلى الدراسات المنشورة المرجعية حول المستعمرة الرومانية ثاموغادي.",
    },
  }),
  tassili: R({
    sourceIds: ["unesco-tassili"],
    confidence: "widely-accepted",
    intro: {
      en: "The exhibit follows the UNESCO World Heritage record for Tassili n'Ajjer. Dates and image counts are published estimates, and the stylistic phases are relative sequences rather than fixed calendar periods.",
      fr: "L'exposition suit la fiche du patrimoine mondial (UNESCO) consacrée au Tassili n'Ajjer. Les dates et le nombre d'images sont des estimations publiées, et les phases stylistiques constituent des séquences relatives plutôt que des périodes calendaires fixes.",
      ar: "يعتمد المعرض على سجل التراث العالمي لليونسكو الخاص بطاسيلي ناجّر. والتواريخ وأعداد الصور تقديرات منشورة، والمراحل الأسلوبية تسلسلات نسبية لا فترات زمنية ثابتة.",
    },
  }),
  mzab: R({

    sourceIds: [
      "unesco-mzab",
      "ravereau-mzab",
      "donnadieu-habiter-desert",
      "opvm-ghardaia",
      "aghlabid-chronicles-ibadi",
      "getty-earthen-mzab",
    ],
    confidence: "verified",
    intro: {
      en: "The exhibit draws on the UNESCO World Heritage record, André Ravéreau's canonical architectural study, and Algerian conservation archives.",
      fr: "L'exposition s'appuie sur la fiche du patrimoine mondial (UNESCO), l'étude architecturale de référence d'André Ravéreau et les archives algériennes de conservation.",
      ar: "يعتمد المعرض على سجل التراث العالمي لليونسكو، والدراسة المعمارية المرجعية لأندريه رافيرو، وأرشيفات الحفاظ الجزائرية.",
    },
    furtherReadingIds: ["corbusier-oeuvre-complete", "further-mcdougall-algeria"],
  }),
};

export function getExhibitProvenance(exhibitId: string): ExhibitProvenanceRecord | undefined {
  return EXHIBIT_PROVENANCE[exhibitId];
}

export function totalExhibitsWithProvenance(): number {
  return Object.keys(EXHIBIT_PROVENANCE).length;
}

// Validate registry integrity in dev — every id must exist in SOURCES.
if (import.meta.env?.DEV) {
  const allIds = new Set(SOURCES.map((s) => s.id));
  for (const [key, rec] of Object.entries(EXHIBIT_PROVENANCE)) {
    for (const id of [...rec.sourceIds, ...(rec.furtherReadingIds ?? [])]) {
      if (!allIds.has(id)) {
        // eslint-disable-next-line no-console
        console.warn(`[provenance] ${key} references unknown source "${id}"`);
      }
    }
  }
  // touch getSource to keep the import used
  void getSource;
}

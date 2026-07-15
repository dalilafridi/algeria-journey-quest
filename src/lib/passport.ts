import { useEffect } from "react";
import { eras } from "@/data/eras";
import { figures } from "@/data/figures";
import { mapRegions } from "@/data/mapRegions";
import { getProgress } from "@/lib/progress";
import { t, type LocalizedString } from "@/lib/i18n";

const KEY = "algeria-passport-v1";

export type VisitKind = "era" | "figure" | "region" | "culture";

export type PassportState = {
  visits: Record<VisitKind, string[]>;
  stamps: string[]; // stamp ids ever unlocked
  issuedAt: string; // ISO date of first visit
  visitorId: string; // short random code
  visitorName?: string;
};

const empty = (): PassportState => ({
  visits: { era: [], figure: [], region: [], culture: [] },
  stamps: [],
  issuedAt: new Date().toISOString(),
  visitorId: genId(),
});

function genId() {
  const s = Math.random().toString(36).slice(2, 8).toUpperCase();
  return `DZ-${s}`;
}

export function getPassport(): PassportState {
  if (typeof window === "undefined") return empty();
  try {
    const raw = localStorage.getItem(KEY);
    if (!raw) return empty();
    const p = JSON.parse(raw) as Partial<PassportState>;
    const base = empty();
    return {
      ...base,
      ...p,
      visits: { ...base.visits, ...(p.visits ?? {}) },
      stamps: p.stamps ?? [],
    };
  } catch {
    return empty();
  }
}

export function savePassport(p: PassportState) {
  try {
    localStorage.setItem(KEY, JSON.stringify(p));
    window.dispatchEvent(new Event("passport-updated"));
  } catch {
    /* noop */
  }
}

export function setVisitorName(name: string) {
  const p = getPassport();
  p.visitorName = name.trim().slice(0, 40) || undefined;
  savePassport(p);
}

export function recordVisit(kind: VisitKind, id: string) {
  if (typeof window === "undefined" || !id) return;
  const p = getPassport();
  if (p.visits[kind].includes(id)) return;
  p.visits[kind] = [...p.visits[kind], id];
  // recompute stamps
  const newStamps = computeStamps(p).map((s) => s.id);
  for (const s of newStamps) {
    if (!p.stamps.includes(s)) p.stamps.push(s);
  }
  savePassport(p);
}

export function useVisit(kind: VisitKind, id: string | undefined) {
  useEffect(() => {
    if (!id) return;
    recordVisit(kind, id);
  }, [kind, id]);
}

// ---------- Stamps ----------

export type Stamp = {
  id: string;
  title: LocalizedString;
  hint: LocalizedString;
  earned: boolean;
  progress: number; // 0..1
};

const CATEGORY_STAMPS: { catId: string; catLabel: LocalizedString }[] = [
  { catId: "ancient", catLabel: { en: "Roman Algeria Scholar", fr: "Érudit de l'Algérie romaine", ar: "باحث في الجزائر الرومانية" } },
];

export function computeStamps(state?: PassportState): Stamp[] {
  const p = state ?? getPassport();
  const progress = getProgress();

  const eraIds = eras.map((e) => e.id);
  const regionIds = mapRegions.map((r) => r.id);
  const visitedEras = p.visits.era.filter((id) => eraIds.includes(id));
  const visitedRegions = p.visits.region.filter((id) => regionIds.includes(id));
  const visitedFigures = p.visits.figure.length;
  const visitedCulture = p.visits.culture.length;
  const passedEras = eraIds.filter((id) => {
    const c = progress.completed[id];
    return c && c.total ? c.bestScore / c.total >= 0.6 : false;
  });

  const stamps: Stamp[] = [];

  // Era completion stamps (one per era)
  for (const era of eras) {
    const passed = passedEras.includes(era.id);
    stamps.push({
      id: `era-complete-${era.id}`,
      title: {
        en: `Completed ${era.title.en}`,
        fr: `Terminé : ${era.title.fr}`,
        ar: `أتممت: ${era.title.ar}`,
      },
      hint: {
        en: "Pass the era quiz",
        fr: "Réussir le quiz de l'ère",
        ar: "اجتز اختبار الحقبة",
      },
      earned: passed,
      progress: passed ? 1 : 0,
    });
  }

  // Region exploration stamps
  for (const region of mapRegions) {
    const seen = visitedRegions.includes(region.id);
    stamps.push({
      id: `region-visit-${region.id}`,
      title: {
        en: `Explored ${region.name.en}`,
        fr: `Exploré : ${region.name.fr}`,
        ar: `استكشفت: ${region.name.ar}`,
      },
      hint: {
        en: "Visit the region exhibit",
        fr: "Visiter l'exposition de la région",
        ar: "زر معرض المنطقة",
      },
      earned: seen,
      progress: seen ? 1 : 0,
    });
  }

  // Milestone stamps
  const milestones: {
    id: string;
    title: LocalizedString;
    hint: LocalizedString;
    total: number;
    current: number;
  }[] = [
    {
      id: "eras-all",
      title: { en: "Grand Tour of Time", fr: "Grand tour du temps", ar: "الجولة الكبرى للزمن" },
      hint: { en: "Visit every era", fr: "Visiter toutes les ères", ar: "زر جميع الحقب" },
      total: eras.length,
      current: visitedEras.length,
    },
    {
      id: "regions-all",
      title: { en: "Wanderer of the Provinces", fr: "Voyageur des provinces", ar: "جوّاب الولايات" },
      hint: { en: "Explore every region", fr: "Explorer toutes les régions", ar: "استكشف كل المناطق" },
      total: mapRegions.length,
      current: visitedRegions.length,
    },
    {
      id: "figures-10",
      title: { en: "Hall of Legends — Initiate", fr: "Panthéon — Initié", ar: "قاعة الأساطير — مبتدئ" },
      hint: { en: "View 10 historical figures", fr: "Voir 10 figures historiques", ar: "شاهد 10 شخصيات تاريخية" },
      total: 10,
      current: visitedFigures,
    },
    {
      id: "figures-25",
      title: { en: "Hall of Legends — Master", fr: "Panthéon — Maître", ar: "قاعة الأساطير — سيد" },
      hint: { en: "View 25 historical figures", fr: "Voir 25 figures historiques", ar: "شاهد 25 شخصية تاريخية" },
      total: 25,
      current: visitedFigures,
    },
    {
      id: "culture-5",
      title: { en: "Culture Connoisseur", fr: "Connaisseur de la culture", ar: "خبير في الثقافة" },
      hint: { en: "Read 5 culture exhibits", fr: "Lire 5 expositions culturelles", ar: "اقرأ 5 معارض ثقافية" },
      total: 5,
      current: visitedCulture,
    },
    {
      id: "museum-complete",
      title: { en: "Curator's Circle", fr: "Cercle du conservateur", ar: "دائرة أمين المتحف" },
      hint: { en: "Complete every era quiz", fr: "Terminer tous les quiz d'ère", ar: "أكمل جميع اختبارات الحقب" },
      total: eras.length,
      current: passedEras.length,
    },
  ];

  for (const m of milestones) {
    const earned = m.current >= m.total;
    stamps.push({
      id: m.id,
      title: m.title,
      hint: m.hint,
      earned,
      progress: Math.min(1, m.total > 0 ? m.current / m.total : 0),
    });
  }

  // Voidremove unused reference
  void CATEGORY_STAMPS;

  return stamps;
}

export function getPassportSummary() {
  const p = getPassport();
  const progress = getProgress();
  const stamps = computeStamps(p);
  const earned = stamps.filter((s) => s.earned).length;
  const quizzes = Object.values(progress.completed).length;
  return {
    passport: p,
    stamps,
    counts: {
      eras: p.visits.era.length,
      regions: p.visits.region.length,
      figures: p.visits.figure.length,
      culture: p.visits.culture.length,
      quizzes,
      stampsEarned: earned,
      stampsTotal: stamps.length,
      xp: progress.xp,
    },
  };
}

import { toast } from "sonner";
import { t, type Lang, type LocalizedString } from "@/lib/i18n";

const KEY = "algeria-discoveries-v1";

type Kind = "region" | "dish" | "figure";

type Store = {
  region: string[];
  dish: string[];
  figure: string[];
  milestones: string[];
};

function read(): Store {
  if (typeof window === "undefined")
    return { region: [], dish: [], figure: [], milestones: [] };
  try {
    const raw = localStorage.getItem(KEY);
    if (!raw) return { region: [], dish: [], figure: [], milestones: [] };
    const p = JSON.parse(raw) as Partial<Store>;
    return {
      region: p.region ?? [],
      dish: p.dish ?? [],
      figure: p.figure ?? [],
      milestones: p.milestones ?? [],
    };
  } catch {
    return { region: [], dish: [], figure: [], milestones: [] };
  }
}

function write(s: Store) {
  try {
    localStorage.setItem(KEY, JSON.stringify(s));
  } catch {
    /* noop */
  }
}

const DISCOVERED: Record<Kind, LocalizedString> = {
  region: { en: "You discovered", fr: "Vous avez découvert", ar: "اكتشفت" },
  dish: { en: "You tasted", fr: "Vous avez goûté", ar: "تذوّقت" },
  figure: { en: "You met", fr: "Vous avez rencontré", ar: "تعرّفت على" },
};

const MILESTONES: { count: number; key: string; kind: Kind; msg: LocalizedString }[] = [
  {
    count: 3,
    key: "regions-3",
    kind: "region",
    msg: { en: "You explored 3 regions ✦", fr: "Vous avez exploré 3 régions ✦", ar: "استكشفت 3 مناطق ✦" },
  },
  {
    count: 5,
    key: "dishes-5",
    kind: "dish",
    msg: { en: "5 dishes discovered ✦", fr: "5 plats découverts ✦", ar: "5 أطباق مكتشفة ✦" },
  },
];

export function discover(
  kind: Kind,
  id: string,
  label: LocalizedString,
  lang: Lang,
) {
  if (typeof window === "undefined") return;
  const s = read();
  if (s[kind].includes(id)) return;
  s[kind] = [...s[kind], id];

  toast(`${t(DISCOVERED[kind], lang)} ${t(label, lang)}`, {
    duration: 2200,
  });

  for (const m of MILESTONES) {
    if (m.kind === kind && s[kind].length === m.count && !s.milestones.includes(m.key)) {
      s.milestones = [...s.milestones, m.key];
      // small delayed milestone toast
      window.setTimeout(() => {
        toast.success(t(m.msg, lang), { duration: 2600 });
      }, 700);
    }
  }
  write(s);
}

export function getDiscoveryCounts() {
  const s = read();
  return { regions: s.region.length, dishes: s.dish.length, figures: s.figure.length };
}

import type { ListenItem } from "@/components/ListenCard";

const L = (en: string, fr: string, ar: string) => ({ en, fr, ar });

/**
 * Listen & Feel — culturally significant audio.
 * Kept intentionally tiny. New entries (Idir, Aït Menguellet, Matoub, spoken quotes)
 * can be added here later, then surfaced via ListenCard at the right place.
 *
 * Source: public-domain recording hosted on Wikimedia Commons.
 */
export const LISTEN: Record<string, ListenItem> = {
  kassaman: {
    id: "kassaman",
    emoji: "🎶",
    title: L("Kassaman — National Anthem", "Kassaman — hymne national", "قَسَمًا — النشيد الوطني"),
    description: L(
      "The national anthem of Algeria, written during the War of Independence.",
      "L'hymne national algérien, écrit pendant la guerre d'indépendance.",
      "النشيد الوطني الجزائري، كُتب خلال حرب التحرير.",
    ),
    src: "https://upload.wikimedia.org/wikipedia/commons/3/3a/Kassaman_instrumental.ogg",
  },
};

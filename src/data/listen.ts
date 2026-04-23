import type { ListenItem } from "@/components/ListenCard";

const L = (en: string, fr: string, ar: string) => ({ en, fr, ar });

/**
 * Listen & Feel — culturally significant audio.
 * Uses an embedded YouTube player for reliability.
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
    // High-quality, embeddable rendition of Kassaman.
    youtubeId: "63AgK0YcFDA",
  },
};

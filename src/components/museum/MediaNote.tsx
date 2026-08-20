/**
 * MediaNote — the discreet disclosure line the museum places beneath a visual
 * that is not a documentary photograph.
 *
 * The Credits page promises that interpretive imagery is labelled as
 * illustrative inside the galleries. This component is how that promise is
 * kept, so the wording stays identical everywhere and stays trilingual.
 */

import { t, useLang, type LocalizedString } from "@/lib/i18n";
import type { MediaType } from "@/data/mediaRegistry";

const NOTES: Partial<Record<MediaType, LocalizedString>> = {
  "interpretive-illustration": {
    en: "Illustration created for DZ Odyssey. Not a historical photograph.",
    fr: "Illustration réalisée pour DZ Odyssey. Ce n'est pas une photographie historique.",
    ar: "رسم توضيحي أُنجز خصيصاً لـ DZ Odyssey، وليس صورة تاريخية.",
  },
  "interpretive-reconstruction": {
    en: "Interpretive reconstruction created for DZ Odyssey. Not a surveyed architectural record.",
    fr: "Reconstitution interprétative réalisée pour DZ Odyssey. Ce n'est pas un relevé architectural.",
    ar: "إعادة بناء تفسيرية أُنجزت لـ DZ Odyssey، وليست مسحاً معمارياً موثقاً.",
  },
  "decorative-artwork": {
    en: "Decorative artwork created for DZ Odyssey.",
    fr: "Œuvre décorative réalisée pour DZ Odyssey.",
    ar: "عمل زخرفي أُنجز لـ DZ Odyssey.",
  },
};

/** Localized disclosure text for a media type, or null when none is needed. */
export function mediaNoteText(kind: MediaType): LocalizedString | null {
  return NOTES[kind] ?? null;
}

export function MediaNote({ kind, className }: { kind: MediaType; className?: string }) {
  const lang = useLang();
  const note = NOTES[kind];
  if (!note) return null;
  return (
    <p className={`mt-2 text-[11px] leading-relaxed text-muted-foreground/90 italic ${className ?? ""}`}>
      {t(note, lang)}
    </p>
  );
}

export default MediaNote;

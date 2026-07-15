/**
 * ArchivalGallery — grid of archival items. Every tile carries caption,
 * date, source and rights. Tiles without a cleared media URL render as
 * "Archive placeholder — awaiting sourced material" and are never opened
 * in a lightbox. Reproductions/recreations are always badged as such.
 */

import { useLang, type LocalizedString } from "@/lib/i18n";
import type { ArchivalItem, MatchTheater } from "@/data/matchTheater/types";
import { THEATER_SERIF as SERIF } from "./TheaterShell";

const T = {
  heading: { en: "Archival gallery", fr: "Galerie archivistique", ar: "المعرض الأرشيفي" },
  awaiting: {
    en: "Archive placeholder — awaiting sourced material.",
    fr: "Emplacement d'archive — en attente de matériel sourcé.",
    ar: "مكان أرشيفي — بانتظار مادّة موثّقة.",
  },
  reproduction: {
    en: "Reproduction / recreation",
    fr: "Reproduction / recréation",
    ar: "إعادة إنتاج / إعادة تصوير",
  },
  source: { en: "Source", fr: "Source", ar: "المصدر" },
  rights: { en: "Rights", fr: "Droits", ar: "الحقوق" },
  kind: {
    photo: { en: "Photograph", fr: "Photographie", ar: "صورة" },
    portrait: { en: "Portrait", fr: "Portrait", ar: "بورتريه" },
    program: { en: "Programme", fr: "Programme", ar: "كتيّب" },
    ticket: { en: "Ticket", fr: "Billet", ar: "تذكرة" },
    newspaper: { en: "Newspaper", fr: "Journal", ar: "صحيفة" },
    jersey: { en: "Jersey", fr: "Maillot", ar: "قميص" },
    poster: { en: "Poster", fr: "Affiche", ar: "ملصق" },
    video: { en: "Video", fr: "Vidéo", ar: "فيديو" },
  } as Record<ArchivalItem["kind"], LocalizedString>,
} as const;

function tt(v: LocalizedString | undefined, lang: "en" | "fr" | "ar"): string {
  if (!v) return "";
  return typeof v === "string" ? v : (v[lang] ?? v.en);
}

export function ArchivalGallery({ match }: { match: MatchTheater }) {
  const lang = useLang();
  if (match.gallery.length === 0) return null;
  return (
    <section className="mx-auto mt-8 w-full max-w-5xl px-4 sm:px-6" style={SERIF}>
      <div className="mb-3 text-[10px] uppercase tracking-[0.28em] text-[#c9a24a]">
        {T.heading[lang]}
      </div>
      <ul className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
        {match.gallery.map((item) => (
          <li
            key={item.id}
            className="flex flex-col overflow-hidden rounded-2xl border border-white/15 bg-black/40 text-white"
          >
            <div className="relative aspect-[4/3] w-full bg-gradient-to-br from-[#132a20] via-[#0a1913] to-black">
              {item.url ? (
                <img
                  src={item.url}
                  alt={tt(item.caption, lang)}
                  loading="lazy"
                  className="h-full w-full object-cover"
                />
              ) : (
                <div className="flex h-full w-full items-center justify-center p-4 text-center text-[11px] uppercase tracking-widest text-white/55">
                  {T.awaiting[lang]}
                </div>
              )}
              {item.reproduction && (
                <span className="absolute right-2 top-2 rounded bg-[#c9a24a]/85 px-1.5 py-0.5 text-[9px] font-bold uppercase tracking-widest text-black">
                  {T.reproduction[lang]}
                </span>
              )}
              <span className="absolute left-2 top-2 rounded bg-black/60 px-1.5 py-0.5 text-[9px] font-bold uppercase tracking-widest text-white/85">
                {tt(T.kind[item.kind], lang)}
              </span>
            </div>
            <div className="flex-1 p-3">
              <p className="text-sm text-white/90">{tt(item.caption, lang)}</p>
              {item.date && (
                <p className="mt-1 text-[11px] text-white/50">{item.date}</p>
              )}
              <p className="mt-2 text-[11px] text-white/60">
                {T.source[lang]}: {tt(item.source, lang)}
              </p>
              {item.rights && (
                <p className="mt-1 text-[11px] text-white/50">
                  {T.rights[lang]}: {tt(item.rights, lang)}
                </p>
              )}
            </div>
          </li>
        ))}
      </ul>
    </section>
  );
}

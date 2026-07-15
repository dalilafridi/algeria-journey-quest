/**
 * TheaterActions — bookmark + share strip shown at the top of the explore
 * view. Reuses the existing Football bookmarks bucket ("matches") so the
 * bookmark shows up alongside the Famous Matches favourites in the wing.
 */

import { useState } from "react";
import { toast } from "sonner";

import { useLang, type Lang, type LocalizedString } from "@/lib/i18n";
import { useFootballBookmarks } from "@/lib/footballBookmarks";
import type { MatchTheater } from "@/data/matchTheater/types";
import { THEATER_SERIF as SERIF } from "./TheaterShell";

const T = {
  bookmark: { en: "Bookmark match", fr: "Ajouter aux favoris", ar: "أضف إلى المفضّلة" },
  bookmarked: { en: "Bookmarked", fr: "Ajouté aux favoris", ar: "في المفضّلة" },
  share: { en: "Share match card", fr: "Partager la carte du match", ar: "شارِك بطاقة المباراة" },
  copied: { en: "Match link copied", fr: "Lien du match copié", ar: "تمّ نسخ رابط المباراة" },
  addToCollection: {
    en: "Added to My Collection",
    fr: "Ajouté à Ma Collection",
    ar: "تمت الإضافة إلى مجموعتي",
  },
} as const;

function tt(v: LocalizedString | undefined, lang: Lang): string {
  if (!v) return "";
  return typeof v === "string" ? v : (v[lang] ?? v.en);
}

export function TheaterActions({ match }: { match: MatchTheater }) {
  const lang = useLang();
  const { has, toggle } = useFootballBookmarks("matches");
  // Reuse the theater id itself as a bookmark key so it's stable and
  // discoverable from the Football wing.
  const bookmarkKey = `theater:${match.id}`;
  const bookmarked = has(bookmarkKey);
  const [sharing, setSharing] = useState(false);

  const handleShare = async () => {
    if (sharing) return;
    setSharing(true);
    const url =
      typeof window !== "undefined"
        ? `${window.location.origin}/theater/${match.id}`
        : `/theater/${match.id}`;
    const shareData: ShareData = {
      title: tt(match.cinematicTitle, lang),
      text: tt(match.cinematicSubtitle, lang),
      url,
    };
    try {
      if (typeof navigator !== "undefined" && navigator.share) {
        await navigator.share(shareData);
      } else if (typeof navigator !== "undefined" && navigator.clipboard) {
        await navigator.clipboard.writeText(url);
        toast.success(T.copied[lang]);
      }
    } catch {
      /* user cancelled share sheet */
    } finally {
      setSharing(false);
    }
  };

  return (
    <div
      className="mx-auto mt-6 flex w-full max-w-4xl flex-wrap items-center gap-2 px-4 sm:px-6"
      style={SERIF}
    >
      <button
        type="button"
        onClick={() => {
          toggle(bookmarkKey);
          if (!bookmarked) toast.success(T.addToCollection[lang]);
        }}
        aria-pressed={bookmarked}
        className={
          "rounded-full border px-3 py-1.5 text-xs font-semibold transition focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#c9a24a] " +
          (bookmarked
            ? "border-[#c9a24a] bg-[#c9a24a]/15 text-[#f6dfa0]"
            : "border-white/25 bg-white/5 text-white/85 hover:bg-white/10")
        }
      >
        {bookmarked ? "★ " : "☆ "}
        {bookmarked ? T.bookmarked[lang] : T.bookmark[lang]}
      </button>
      <button
        type="button"
        onClick={handleShare}
        className="rounded-full border border-white/25 bg-white/5 px-3 py-1.5 text-xs font-semibold text-white/85 transition hover:bg-white/10"
      >
        ↗ {T.share[lang]}
      </button>
    </div>
  );
}

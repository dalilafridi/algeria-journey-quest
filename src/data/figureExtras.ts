import type { LocalizedString } from "@/lib/i18n";

const L = (en: string, fr: string, ar: string): LocalizedString => ({ en, fr, ar });

export type FigureExtras = {
  /** Short "Did you know?" blurb. */
  didYouKnow?: LocalizedString;
  /** Key works, songs, books, monuments, places linked to the figure. */
  keyPlacesAndWorks?: { emoji: string; label: LocalizedString; note?: LocalizedString }[];
};

export const figureExtras: Record<string, FigureExtras> = {
  "moufdi-zakaria": {
    didYouKnow: L(
      "Tradition says Moufdi Zakaria wrote 'Kassaman' on the wall of his prison cell in Barberousse — with his own blood — in April 1956.",
      "La tradition rapporte que Moufdi Zakaria aurait écrit « Kassaman » sur le mur de sa cellule à Barberousse — avec son propre sang — en avril 1956.",
      "تقول الرواية إن مفدي زكريا كتب «قسماً» على جدار زنزانته بسجن بربروس بدمه، في أفريل 1956.",
    ),
    keyPlacesAndWorks: [
      {
        emoji: "🎶",
        label: L("Kassaman — National Anthem", "Kassaman — hymne national", "قسماً — النشيد الوطني"),
        note: L(
          "Lyrics written in 1956; music by Mohamed Fawzi; adopted at independence in 1962.",
          "Paroles écrites en 1956 ; musique de Mohamed Fawzi ; adopté à l'indépendance en 1962.",
          "كُتبت كلماته سنة 1956، ولحّنه محمد فوزي، واعتُمد نشيدًا وطنيًا عند الاستقلال سنة 1962.",
        ),
      },
      {
        emoji: "📜",
        label: L("Iliyadha al-Jaza'ir (The Algerian Iliad)", "L'Iliade algérienne", "إلياذة الجزائر"),
        note: L(
          "An epic poem of over 1,000 verses celebrating Algeria's history and unity.",
          "Un poème épique de plus de 1 000 vers célébrant l'histoire et l'unité de l'Algérie.",
          "ملحمة شعرية تضمّ أكثر من ألف بيت، تحتفي بتاريخ الجزائر ووحدتها.",
        ),
      },
      {
        emoji: "🏚️",
        label: L("Barberousse Prison, Algiers", "Prison de Barberousse, Alger", "سجن بربروس، الجزائر العاصمة"),
        note: L(
          "Place where 'Kassaman' was composed during his imprisonment.",
          "Lieu où « Kassaman » a été composé durant son emprisonnement.",
          "المكان الذي كُتب فيه «قسماً» خلال فترة اعتقاله.",
        ),
      },
      {
        emoji: "🏜️",
        label: L("Beni Isguen, M'zab Valley", "Beni Isguen, vallée du M'zab", "بني يزقن، وادي ميزاب"),
        note: L(
          "His birthplace in 1908 — a town famed for its Mozabite heritage.",
          "Sa ville natale en 1908 — célèbre pour son patrimoine mozabite.",
          "مسقط رأسه سنة 1908 — مدينة مشهورة بإرثها الميزابي.",
        ),
      },
      {
        emoji: "📚",
        label: L("Al-Lahab al-Muqaddas (The Sacred Flame)", "Al-Lahab al-Muqaddas (La Flamme sacrée)", "اللهب المقدّس"),
        note: L(
          "A celebrated collection of his nationalist poetry.",
          "Recueil célèbre de sa poésie nationaliste.",
          "ديوان شهير من شعره الوطني.",
        ),
      },
    ],
  },
};

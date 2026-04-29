import type { LocalizedString } from "@/lib/i18n";

const L = (en: string, fr: string, ar: string): LocalizedString => ({ en, fr, ar });

/** Cinematic 1–2 sentence intro shown before region detail content. */
export const regionIntros: Record<string, LocalizedString> = {
  kabylie: L(
    "Between mountains and memory… a language survived.",
    "Entre montagnes et mémoire… une langue a survécu.",
    "بين الجبال والذاكرة… بقيت لغةٌ حيّة.",
  ),
  aures: L(
    "Where the wind still carries the first shots of November.",
    "Là où le vent porte encore les premiers coups de novembre.",
    "حيث ما زالت الريح تحمل صدى رصاصات نوفمبر الأولى.",
  ),
  algiers: L(
    "A white city, turned toward the sea — and toward freedom.",
    "Une ville blanche, tournée vers la mer — et vers la liberté.",
    "مدينةٌ بيضاء، تنظر إلى البحر… وإلى الحرّية.",
  ),
  constantine: L(
    "A city suspended on stone, where bridges teach patience.",
    "Une ville suspendue sur la pierre, où les ponts enseignent la patience.",
    "مدينةٌ معلّقة على الصخر، تعلّمنا جسورها الصبر.",
  ),
  "oran-west": L(
    "Open plains, open ports — and a horizon that hums in raï.",
    "Plaines et ports ouverts — et un horizon qui chante en raï.",
    "سهولٌ مفتوحة، وموانئ مفتوحة، وأفقٌ يهمس بالراي.",
  ),
  sahara: L(
    "Beyond the dunes, an older silence keeps its stars.",
    "Au-delà des dunes, un silence plus ancien garde ses étoiles.",
    "وراء الكثبان، صمتٌ أقدم يحتفظ بنجومه.",
  ),
};

/** One-sentence emotional memory line attached to a dish (by dish id). */
export const dishMemoryLines: Record<string, LocalizedString> = {
  "couscous-kabyle": L(
    "A dish that gathers generations around one table.",
    "Un plat qui rassemble les générations autour d'une seule table.",
    "طبقٌ يجمع الأجيال حول مائدة واحدة.",
  ),
  rechta: L(
    "The taste of Mawlid evenings, kept in a grandmother's pot.",
    "Le goût des soirs de Mawlid, gardé dans la marmite d'une grand-mère.",
    "طعم ليالي المولد، محفوظ في قِدر الجدّة.",
  ),
  bourek: L(
    "The first crunch of every Ramadan iftar.",
    "Le premier croquant de chaque iftar de Ramadan.",
    "أوّل قرمشة في كلّ إفطار رمضان.",
  ),
  chakhchoukha: L(
    "Shared from one plate — because we eat together, or not at all.",
    "Partagée dans un seul plat — car on mange ensemble, sinon pas du tout.",
    "تُؤكل من صحن واحد — فإمّا نأكل معًا، أو لا نأكل.",
  ),
  trida: L(
    "Tiny squares of patience, rolled for those we love.",
    "De minuscules carrés de patience, roulés pour ceux qu'on aime.",
    "مربّعاتٌ صغيرة من الصبر، تُلفّ لمن نحبّ.",
  ),
  taguella: L(
    "Bread of the sand — broken by hand, shared by fire.",
    "Pain du sable — rompu à la main, partagé près du feu.",
    "خبز الرمل — يُكسَر باليد ويُقتسم حول النار.",
  ),
  karantika: L(
    "Sold on a metal tray — Oran's humble crown.",
    "Vendue sur un plateau de métal — l'humble couronne d'Oran.",
    "تُباع على صينيّة معدنيّة — تاج وهران المتواضع.",
  ),
  zviti: L(
    "A fire that warms Bousaâda's evenings.",
    "Un feu qui réchauffe les soirs de Bousaâda.",
    "نارٌ تُدفئ أمسيات بوسعادة.",
  ),
};

export const cinematicCopy = {
  cinematicLabel: L("A cinematic introduction", "Une introduction cinématographique", "تقديمٌ سينمائي"),
  memoryLabel: L("A memory", "Un souvenir", "ذكرى"),
};

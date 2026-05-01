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
    "Where the first flames of resistance rose from the mountains.",
    "Là où les premières flammes de la résistance s'élevèrent des montagnes.",
    "حيث اشتعلت أولى شرارات المقاومة من الجبال.",
  ),
  algiers: L(
    "A city between sea and power, where history meets the present.",
    "Une ville entre mer et pouvoir, où l'histoire rencontre le présent.",
    "مدينةٌ بين البحر والسلطة، حيث يلتقي التاريخ بالحاضر.",
  ),
  constantine: L(
    "A city suspended between sky and stone.",
    "Une ville suspendue entre ciel et pierre.",
    "مدينةٌ معلّقة بين السماء والحجر.",
  ),
  "oran-west": L(
    "Where trade, resistance, and culture shaped the west.",
    "Où le commerce, la résistance et la culture ont façonné l'ouest.",
    "حيث صاغت التجارة والمقاومة والثقافة الغرب.",
  ),
  sahara: L(
    "An endless horizon where silence speaks.",
    "Un horizon sans fin où le silence parle.",
    "أفقٌ لا نهاية له، حيث يتحدّث الصمت.",
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

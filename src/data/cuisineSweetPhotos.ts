/**
 * Photographs used by the Sweet Traditions cards on /cuisine.
 *
 * Every image is a locally stored, optimized copy of a freely licensed
 * photograph from Wikimedia Commons. Nothing is hotlinked. Each record carries
 * the named creator (the repository is never credited as the photographer),
 * the exact licence with its canonical link, the Commons file page, and a note
 * about the modification applied (all of them were cropped to 4:3 and resized,
 * with no colour grading, filters, overlays or added text).
 */

import type { LocalizedString } from "@/lib/i18n";

import makrout1200 from "@/assets/cuisine/makrout-1200.webp";
import makrout600 from "@/assets/cuisine/makrout-600.webp";
import baklawa1200 from "@/assets/cuisine/baklawa-1200.webp";
import baklawa600 from "@/assets/cuisine/baklawa-600.webp";
import kalb1200 from "@/assets/cuisine/kalb-el-louz-1200.webp";
import kalb600 from "@/assets/cuisine/kalb-el-louz-600.webp";
import zlabia1200 from "@/assets/cuisine/zlabia-1200.webp";
import zlabia600 from "@/assets/cuisine/zlabia-600.webp";
import ghribia1200 from "@/assets/cuisine/ghribia-1200.webp";
import ghribia600 from "@/assets/cuisine/ghribia-600.webp";
import tcharek1200 from "@/assets/cuisine/tcharek-1200.webp";
import tcharek600 from "@/assets/cuisine/tcharek-600.webp";

const L = (en: string, fr: string, ar: string): LocalizedString => ({ en, fr, ar });

export interface SweetPhoto {
  /** Matches the id of the entry in `cuisineSweets`. */
  id: string;
  src: string;
  srcSmall: string;
  width: number;
  height: number;
  /** CSS object-position tuned to keep the pastry shape fully readable. */
  objectPosition: string;
  alt: LocalizedString;
  /** Named creator. Never the repository. */
  creator: string;
  /** Commons file page. */
  filePage: string;
  license: string;
  licenseUrl: string;
  modification: LocalizedString;
}

const CROPPED = L(
  "Cropped to a 4:3 frame and resized. No colour correction.",
  "Recadrée au format 4:3 et redimensionnée. Aucune correction colorimétrique.",
  "اقتُصّت بنسبة 4:3 وأُعيد تحجيمها، دون أي تعديل للألوان.",
);

export const CUISINE_SWEET_PHOTOS: SweetPhoto[] = [
  {
    id: "makrout",
    src: makrout1200,
    srcSmall: makrout600,
    width: 1200,
    height: 900,
    objectPosition: "50% 50%",
    alt: L(
      "Diamond-shaped Algerian Makrout pastries filled with date paste.",
      "Losanges de Makrout algérien fourrés à la pâte de dattes.",
      "حلوى المقروط الجزائري على شكل معينات محشوّة بمعجون التمر.",
    ),
    creator: "Waran18",
    filePage: "https://commons.wikimedia.org/wiki/File:Makroud_alg%C3%A9rie.jpg",
    license: "CC BY-SA 3.0",
    licenseUrl: "https://creativecommons.org/licenses/by-sa/3.0/",
    modification: CROPPED,
  },
  {
    id: "baklawa",
    src: baklawa1200,
    srcSmall: baklawa600,
    width: 1200,
    height: 900,
    objectPosition: "50% 50%",
    alt: L(
      "Diamond-shaped Algerian Baklawa arranged on a serving plate.",
      "Baklawa algérienne en losanges disposée sur un plat de service.",
      "بقلاوة جزائرية على شكل معينات مرتّبة في صحن للتقديم.",
    ),
    creator: "Wicanto",
    filePage: "https://commons.wikimedia.org/wiki/File:Baklawa_alg%C3%A9rienne.jpg",
    license: "CC BY-SA 4.0",
    licenseUrl: "https://creativecommons.org/licenses/by-sa/4.0/",
    modification: CROPPED,
  },
  {
    id: "kalb-el-louz",
    src: kalb1200,
    srcSmall: kalb600,
    width: 1200,
    height: 900,
    objectPosition: "50% 50%",
    alt: L(
      "Golden pieces of Kalb el Louz decorated with almonds.",
      "Parts dorées de Kalb el Louz décorées d'amandes.",
      "قطع ذهبية من قلب اللوز مزيّنة بحبّات اللوز.",
    ),
    creator: "Adonit",
    filePage: "https://commons.wikimedia.org/wiki/File:Kalb-el-louz.jpg",
    license: "Copyrighted free use",
    licenseUrl: "https://commons.wikimedia.org/wiki/Template:Copyrighted_free_use",
    modification: CROPPED,
  },
  {
    id: "zlabia",
    src: zlabia1200,
    srcSmall: zlabia600,
    width: 1200,
    height: 900,
    objectPosition: "50% 45%",
    alt: L(
      "Bright golden spiral-shaped Algerian Zlabia coated in syrup.",
      "Zlabia algérienne en spirales dorées et brillantes, nappée de sirop.",
      "زلابية جزائرية حلزونية لامعة مغموسة في القطر.",
    ),
    creator: "فيروز روزي",
    filePage: "https://commons.wikimedia.org/wiki/File:Zlabia_alg%C3%A9rienne.jpg",
    license: "CC BY-SA 4.0",
    licenseUrl: "https://creativecommons.org/licenses/by-sa/4.0/",
    modification: CROPPED,
  },
  {
    id: "ghribia",
    src: ghribia1200,
    srcSmall: ghribia600,
    width: 1200,
    height: 900,
    objectPosition: "50% 50%",
    alt: L(
      "Traditional Algerian Ghribia cookies arranged together.",
      "Sablés Ghribia algériens traditionnels disposés côte à côte.",
      "حلوى الغريبة الجزائرية التقليدية مرتّبة معاً.",
    ),
    creator: "وهراني",
    filePage: "https://commons.wikimedia.org/wiki/File:Ghribia_(algerian_cookie).jpg",
    license: "CC BY-SA 4.0",
    licenseUrl: "https://creativecommons.org/licenses/by-sa/4.0/",
    modification: CROPPED,
  },
  {
    id: "tcharek",
    src: tcharek1200,
    srcSmall: tcharek600,
    width: 1200,
    height: 900,
    objectPosition: "50% 45%",
    alt: L(
      "Crescent-shaped Algerian Tcharek pastries filled with almonds.",
      "Pâtisseries Tcharek algériennes en croissant, fourrées aux amandes.",
      "حلوى التشاراك الجزائرية على شكل هلال محشوّة باللوز.",
    ),
    creator: "Terrum3",
    filePage: "https://commons.wikimedia.org/wiki/File:Tcharek_el_ariane_(algerian_pastry).jpg",
    license: "CC BY-SA 4.0",
    licenseUrl: "https://creativecommons.org/licenses/by-sa/4.0/",
    modification: CROPPED,
  },
];

export function sweetPhoto(id: string): SweetPhoto | undefined {
  return CUISINE_SWEET_PHOTOS.find((p) => p.id === id);
}

export default CUISINE_SWEET_PHOTOS;

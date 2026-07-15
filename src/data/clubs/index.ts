/**
 * Club Museums registry.
 *
 * Register additional clubs by dropping a data file into src/data/clubs/
 * and importing it here. Placeholders (status "coming-soon") only require
 * identity + tagline; full sections are shown when status is "complete".
 */

import type { ClubMuseum } from "./types";
import { jsKabylie } from "./jskabylie";

const placeholder = (
  id: string,
  shortName: string,
  fullName: ClubMuseum["fullName"],
  city: ClubMuseum["city"],
  founded: number,
  colors: { primary: string; secondary: string },
  tagline: ClubMuseum["tagline"]
): ClubMuseum => ({
  id,
  shortName,
  fullName,
  city,
  founded,
  status: "coming-soon",
  tagline,
  identity: { colors, crestGlyph: shortName },
});

export const CLUB_MUSEUMS: ClubMuseum[] = [
  jsKabylie,
  placeholder(
    "mc-alger",
    "MCA",
    { en: "Mouloudia Club d'Alger", fr: "Mouloudia Club d'Alger", ar: "مولودية الجزائر" },
    { en: "Algiers", fr: "Alger", ar: "الجزائر" },
    1921,
    { primary: "#137a3f", secondary: "#c81c25" },
    { en: "The oldest Algerian Muslim club — Le Doyen.", fr: "Le plus ancien club algérien musulman — Le Doyen.", ar: "أعرق نادٍ جزائري مسلم — العميد." }
  ),
  placeholder(
    "es-setif",
    "ESS",
    { en: "Entente Sportive de Sétif", fr: "Entente Sportive de Sétif", ar: "وفاق سطيف" },
    { en: "Sétif", fr: "Sétif", ar: "سطيف" },
    1958,
    { primary: "#000000", secondary: "#f2c53d" },
    { en: "The Black Eagles of the Hauts Plateaux.", fr: "Les Aigles noirs des Hauts Plateaux.", ar: "نسور الهضاب العليا." }
  ),
  placeholder(
    "usm-alger",
    "USMA",
    { en: "Union Sportive de la Médina d'Alger", fr: "Union Sportive de la Médina d'Alger", ar: "اتحاد العاصمة" },
    { en: "Algiers", fr: "Alger", ar: "الجزائر" },
    1937,
    { primary: "#c81c25", secondary: "#0a0a0a" },
    { en: "The red-and-black of Soustara.", fr: "Le rouge et noir de Soustara.", ar: "أحمر وأسود سوسطارة." }
  ),
  placeholder(
    "cr-belouizdad",
    "CRB",
    { en: "Chabab Riadhi Belouizdad", fr: "Chabab Riadhi Belouizdad", ar: "شباب بلوزداد" },
    { en: "Algiers", fr: "Alger", ar: "الجزائر" },
    1962,
    { primary: "#c81c25", secondary: "#f2f2f2" },
    { en: "The pride of Belcourt.", fr: "La fierté de Belcourt.", ar: "فخر بلكور." }
  ),
  placeholder(
    "mc-oran",
    "MCO",
    { en: "Mouloudia Club d'Oran", fr: "Mouloudia Club d'Oran", ar: "مولودية وهران" },
    { en: "Oran", fr: "Oran", ar: "وهران" },
    1946,
    { primary: "#c81c25", secondary: "#f2f2f2" },
    { en: "El Hamri — heart of Oran football.", fr: "El Hamri — cœur du football oranais.", ar: "الحمري — قلب كرة وهران." }
  ),
  placeholder(
    "paradou-ac",
    "PAC",
    { en: "Paradou Athletic Club", fr: "Paradou Athletic Club", ar: "نادي بارادو" },
    { en: "Algiers", fr: "Alger", ar: "الجزائر" },
    1994,
    { primary: "#f2c53d", secondary: "#1e3a8a" },
    { en: "The academy that revived Algerian youth football.", fr: "L'académie qui a relancé la formation algérienne.", ar: "الأكاديمية التي أعادت الحياة لكرة الشباب الجزائرية." }
  ),
];

export function getClubMuseum(id: string): ClubMuseum | undefined {
  return CLUB_MUSEUMS.find((c) => c.id === id);
}

export function listClubMuseums(): ClubMuseum[] {
  return CLUB_MUSEUMS;
}

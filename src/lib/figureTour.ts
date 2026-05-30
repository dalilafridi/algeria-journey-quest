/**
 * Guided Exhibit Tour — a curated museum walkthrough of the Hall of Legends.
 *
 * The tour is NOT a tutorial. It is a thoughtful, chronological sequence of
 * "stops", each highlighting one figure that anchors a chapter of Algeria's
 * story — from ancient Numidia to modern memory. Each stop carries a curated
 * chapter title plus a "why this figure matters" line; the rest of the panel
 * (name, era, role, story, portrait) is pulled live from the figure data so
 * there is a single source of truth.
 */

import type { LocalizedString } from "@/lib/i18n";

const L = (en: string, fr: string, ar: string): LocalizedString => ({ en, fr, ar });

export type TourStop = {
  /** Figure highlighted at this stop (must exist in the figures dataset). */
  figureId: string;
  /** Curated chapter title for the stop. */
  title: LocalizedString;
  /** Short museum-style "why this figure matters" reflection. */
  whyMatters: LocalizedString;
};

export type GuidedTourDef = {
  welcome: {
    title: LocalizedString;
    intro: LocalizedString;
  };
  stops: TourStop[];
};

export const HALL_TOUR: GuidedTourDef = {
  welcome: {
    title: L(
      "Welcome to the Hall of Legends",
      "Bienvenue au Panthéon des Légendes",
      "مرحبًا بكم في قاعة العظماء",
    ),
    intro: L(
      "This guided walk follows Algeria's story through six who shaped it — kings and queens, scholars and rebels, poets and witnesses. Move at your own pace. Each stop pauses on one life and why it still matters.",
      "Cette visite guidée suit l'histoire de l'Algérie à travers six destins — rois et reines, savants et rebelles, poètes et témoins. Avancez à votre rythme. Chaque étape s'arrête sur une vie et sur ce qu'elle nous dit encore.",
      "تتبع هذه الجولة المُرشدة قصة الجزائر عبر ستة صنعوها — ملوكٌ وملكات، علماءُ وثوار، شعراءُ وشهود. تقدّم على مهلك. تتوقف كل محطة عند حياة واحدة ولماذا لا تزال مهمة.",
    ),
  },
  stops: [
    {
      figureId: "massinissa",
      title: L("Stop 1 — Ancient Foundations", "Étape 1 — Fondations antiques", "المحطة 1 — الأسس القديمة"),
      whyMatters: L(
        "Before there was a nation, there was a kingdom. Massinissa turned scattered tribes into Numidia — the first idea of a unified land in this corner of Africa.",
        "Avant la nation, il y eut un royaume. Massinissa fit de tribus dispersées la Numidie — la première idée d'une terre unie dans ce coin d'Afrique.",
        "قبل أن تكون أمّة، كانت هناك مملكة. وحّد ماسينيسا القبائل المتفرقة في نوميديا — أول فكرة لأرض موحّدة في هذا الركن من إفريقيا.",
      ),
    },
    {
      figureId: "dihya",
      title: L("Stop 2 — Kingdoms & Resistance", "Étape 2 — Royaumes & résistance", "المحطة 2 — الممالك والمقاومة"),
      whyMatters: L(
        "From the peaks of the Aurès, Dihya led an Amazigh confederation against empire. She is the enduring symbol of a land that refuses to be ruled from afar.",
        "Depuis les sommets des Aurès, Dihya mena une confédération amazighe contre l'empire. Elle reste le symbole d'une terre qui refuse d'être gouvernée de loin.",
        "من قمم الأوراس، قادت ديهيا اتحادًا أمازيغيًا في وجه الإمبراطورية. تبقى رمزًا لأرض ترفض أن تُحكم من بعيد.",
      ),
    },
    {
      figureId: "ibn-khaldun",
      title: L("Stop 3 — Scholarship & Culture", "Étape 3 — Savoir & culture", "المحطة 3 — العلم والثقافة"),
      whyMatters: L(
        "Ibn Khaldun watched how empires rise and fall and gave the world a way of thinking about history itself — a mind formed in the Maghreb that still shapes scholarship today.",
        "Ibn Khaldoun observa la montée et la chute des empires et offrit au monde une manière de penser l'histoire elle-même — un esprit formé au Maghreb qui inspire encore le savoir.",
        "تأمّل ابن خلدون صعود الإمبراطوريات وسقوطها، فمنح العالم طريقة في التفكير في التاريخ نفسه — عقلٌ تشكّل في المغرب ولا يزال يُلهم العلم اليوم.",
      ),
    },
    {
      figureId: "abdelkader",
      title: L("Stop 4 — Colonial Resistance", "Étape 4 — Résistance coloniale", "المحطة 4 — المقاومة الاستعمارية"),
      whyMatters: L(
        "Emir Abdelkader built a state under fire and fought with honour even his enemies admired. He is the bridge between old kingdoms and the modern struggle for independence.",
        "L'Émir Abdelkader bâtit un État sous le feu et combattit avec un honneur que même ses ennemis admiraient. Il est le pont entre les anciens royaumes et la lutte moderne pour l'indépendance.",
        "بنى الأمير عبد القادر دولة تحت النار وقاتل بشرفٍ أعجب به حتى أعداؤه. إنه الجسر بين الممالك القديمة والكفاح الحديث من أجل الاستقلال.",
      ),
    },
    {
      figureId: "ben-mhidi",
      title: L("Stop 5 — War of Independence", "Étape 5 — Guerre d'indépendance", "المحطة 5 — حرب الاستقلال"),
      whyMatters: L(
        "Larbi Ben M'hidi gave the revolution its conscience. \"Throw the idea into the street,\" he said — and a generation answered with their lives.",
        "Larbi Ben M'hidi donna à la révolution sa conscience. « Jetez l'idée dans la rue », disait-il — et une génération répondit de sa vie.",
        "منح العربي بن مهيدي الثورة ضميرها. «ألقوا الفكرة في الشارع»، قال — فأجاب جيلٌ بأرواحه.",
      ),
    },
    {
      figureId: "assia-djebar",
      title: L("Stop 6 — Modern Memory", "Étape 6 — Mémoire moderne", "المحطة 6 — الذاكرة الحديثة"),
      whyMatters: L(
        "Assia Djebar gave silenced women a voice and carried Algeria's memory into world literature. The hall does not end in war — it continues in story.",
        "Assia Djebar donna une voix aux femmes réduites au silence et porta la mémoire de l'Algérie dans la littérature mondiale. Le panthéon ne s'achève pas dans la guerre — il continue dans le récit.",
        "منحت آسيا جبار صوتًا للنساء المُسكتات وحملت ذاكرة الجزائر إلى الأدب العالمي. لا تنتهي القاعة بالحرب — بل تستمر في الحكاية.",
      ),
    },
  ],
};

/**
 * Regional collectible emblems — engraved bronze museum medallions.
 *
 * Each region is rendered as a carved relief artifact coin (aged bronze,
 * gold highlights, laurel/beaded rim) belonging to the same curated
 * collection as the era medallions. These are artifacts, not UI icons.
 */

import kabylie from "@/assets/emblems/region-kabylie.png";
import aures from "@/assets/emblems/region-aures.png";
import algiers from "@/assets/emblems/region-algiers.png";
import constantine from "@/assets/emblems/region-constantine.png";
import sahara from "@/assets/emblems/region-sahara.png";
import oranWest from "@/assets/emblems/region-oran-west.png";

type RegionIconProps = {
  regionId: string;
  className?: string;
};

const EMBLEMS: Record<string, { src: string; label: string }> = {
  kabylie: { src: kabylie, label: "Kabylie emblem" },
  aures: { src: aures, label: "Aurès emblem" },
  algiers: { src: algiers, label: "Algiers emblem" },
  constantine: { src: constantine, label: "Constantine emblem" },
  "oran-west": { src: oranWest, label: "Western Algeria emblem" },
  sahara: { src: sahara, label: "Sahara emblem" },
};

export function RegionIcon({ regionId, className = "" }: RegionIconProps) {
  const emblem = EMBLEMS[regionId] ?? EMBLEMS.kabylie;
  return (
    <img
      src={emblem.src}
      alt={emblem.label}
      loading="lazy"
      width={1024}
      height={1024}
      className={`object-contain ${className}`}
      draggable={false}
    />
  );
}

export default RegionIcon;

/**
 * Home journey gateway emblems — engraved bronze museum medallions.
 *
 * The three gateways (journey, regions, culture) are rendered as carved
 * relief artifact coins from the same curated collection as the era and
 * region medallions. Artifacts, not UI icons.
 */

import journey from "@/assets/emblems/pillar-journey.png";
import regions from "@/assets/emblems/pillar-regions.png";
import culture from "@/assets/emblems/pillar-culture.png";

type PillarKind = "journey" | "regions" | "culture";

type Props = {
  kind: PillarKind;
  className?: string;
};

const EMBLEMS: Record<PillarKind, { src: string; label: string }> = {
  journey: { src: journey, label: "Journey emblem" },
  regions: { src: regions, label: "Regions emblem" },
  culture: { src: culture, label: "Culture emblem" },
};

export function PillarIcon({ kind, className = "" }: Props) {
  const emblem = EMBLEMS[kind];
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

export default PillarIcon;

import type { LucideIcon } from "lucide-react";
import { Crown, BookOpen, Moon, Landmark, Swords, Flag, Lock } from "lucide-react";
import { AmazighSymbol } from "./AmazighSymbol";

export type EraBadgeKind =
  | "numidian"
  | "roman"
  | "islamic"
  | "ottoman"
  | "french"
  | "independence";

type Tier = "gold" | "silver" | "bronze";

const ICONS: Record<EraBadgeKind, LucideIcon> = {
  numidian: Crown,
  roman: BookOpen,
  islamic: Moon,
  ottoman: Landmark,
  french: Swords,
  independence: Flag,
};

const TIER_BG: Record<Tier, string> = {
  gold: "var(--gradient-brand-gold)",
  silver: "linear-gradient(135deg, oklch(0.95 0.01 90), oklch(0.78 0.01 90) 60%, oklch(0.6 0.01 90))",
  bronze: "linear-gradient(135deg, oklch(0.78 0.1 60), oklch(0.55 0.11 55) 60%, oklch(0.38 0.07 50))",
};

type Props = {
  kind: EraBadgeKind;
  /** When false the badge is shown desaturated/locked. */
  unlocked?: boolean;
  /** Visual tier. Defaults: numidian/independence -> gold, otherwise silver. */
  tier?: Tier;
  size?: number;
  /** Adds the unlock burst animation. */
  animate?: boolean;
  className?: string;
  label?: string;
};

export function EraBadge({
  kind,
  unlocked = true,
  tier,
  size = 88,
  animate = false,
  className,
  label,
}: Props) {
  const Icon = ICONS[kind];
  const resolvedTier: Tier =
    tier ?? (kind === "numidian" || kind === "independence" ? "gold" : "silver");
  const ringColor =
    resolvedTier === "gold"
      ? "oklch(0.82 0.14 78)"
      : resolvedTier === "silver"
        ? "oklch(0.78 0.01 90)"
        : "oklch(0.55 0.11 55)";

  return (
    <div
      className={`relative inline-flex flex-col items-center ${
        animate ? "animate-badge-unlock" : ""
      } ${className ?? ""}`}
      style={{ width: size }}
      aria-label={label ?? kind}
    >
      <div
        className={`relative rounded-full flex items-center justify-center transition-all ${
          unlocked ? "" : "grayscale opacity-60"
        }`}
        style={{
          width: size,
          height: size,
          background: TIER_BG[resolvedTier],
          boxShadow: unlocked
            ? `0 0 0 3px oklch(0.16 0.02 50), 0 0 0 4px ${ringColor}, 0 8px 22px -6px oklch(0.1 0.02 50 / 0.55)`
            : "0 0 0 3px oklch(0.16 0.02 50), 0 0 0 4px oklch(0.5 0 0 / 0.4)",
        }}
      >
        {/* Inner disc */}
        <div
          className="absolute inset-2 rounded-full flex items-center justify-center"
          style={{
            background:
              "radial-gradient(circle at 35% 30%, oklch(1 0 0 / 0.35), transparent 55%), oklch(0.18 0.03 55)",
          }}
        >
          {unlocked ? (
            <Icon
              style={{ color: "oklch(0.92 0.12 85)" }}
              size={Math.round(size * 0.38)}
              strokeWidth={1.8}
            />
          ) : (
            <Lock
              style={{ color: "oklch(0.7 0.02 80)" }}
              size={Math.round(size * 0.32)}
            />
          )}
        </div>
        {/* Tiny Amazigh symbol watermark */}
        <div
          className="absolute -bottom-1 -end-1 rounded-full p-1"
          style={{
            background: "oklch(0.16 0.02 50)",
            boxShadow: "0 0 0 2px " + ringColor,
          }}
        >
          <AmazighSymbol size={Math.round(size * 0.22)} glow={false} />
        </div>
      </div>
      {label ? (
        <div
          className="mt-2 text-[10px] font-bold uppercase tracking-wider text-center"
          style={{ color: "oklch(0.85 0.06 80)" }}
        >
          {label}
        </div>
      ) : null}
    </div>
  );
}

export default EraBadge;

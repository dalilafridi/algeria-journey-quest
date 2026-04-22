/**
 * Amazigh (Berber) "yaz" symbol — ⵣ
 * Rendered as crisp SVG so it scales to any size and accepts a glow.
 */
type Props = {
  size?: number | string;
  className?: string;
  glow?: boolean;
  title?: string;
};

export function AmazighSymbol({ size = 96, className, glow = true, title = "Amazigh symbol" }: Props) {
  return (
    <svg
      viewBox="0 0 100 100"
      width={size}
      height={size}
      role="img"
      aria-label={title}
      className={`${glow ? "animate-gold-pulse" : ""} ${className ?? ""}`}
    >
      <defs>
        <linearGradient id="amazigh-gold" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="oklch(0.95 0.18 88)" />
          <stop offset="55%" stopColor="oklch(0.82 0.14 78)" />
          <stop offset="100%" stopColor="oklch(0.55 0.12 55)" />
        </linearGradient>
      </defs>
      {/* Stylized yaz: bottom curve + central vertical + arms */}
      <g
        fill="none"
        stroke="url(#amazigh-gold)"
        strokeWidth="11"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        {/* Bottom open arc */}
        <path d="M18 66 Q50 92 82 66" />
        {/* Central vertical bar */}
        <path d="M50 18 L50 66" />
        {/* Top arms */}
        <path d="M28 24 L50 36" />
        <path d="M72 24 L50 36" />
      </g>
    </svg>
  );
}

export default AmazighSymbol;

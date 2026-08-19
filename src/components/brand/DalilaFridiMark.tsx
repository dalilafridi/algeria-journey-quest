/**
 * Personal creator mark for the museum's creator. Pairs the approved DF
 * monogram with the live text "Dalila Fridi". The name stays selectable HTML
 * text; the monogram is decorative beside it.
 */
import monogram from "@/assets/dalila-fridi-monogram.png.asset.json";
import { cn } from "@/lib/utils";

const NAME = "Dalila Fridi";

type Size = "inline" | "footer" | "about" | "profile";

// Heights are set inline: a global `img { height: auto }` rule sits outside
// Tailwind's utilities layer and would otherwise win over height utilities.
const MARK_HEIGHT: Record<Size, number> = {
  inline: 26,
  footer: 28,
  about: 56,
  profile: 64,
};

/** Just the monogram image, no name beside it. */
export function DalilaFridiMonogram({
  size = "inline",
  decorative = true,
  className,
}: {
  size?: Size;
  decorative?: boolean;
  className?: string;
}) {
  return (
    <img
      src={monogram.url}
      alt={decorative ? "" : "DF monogram of Dalila Fridi"}
      aria-hidden={decorative || undefined}
      className={cn("w-auto max-w-full shrink-0 object-contain", className)}
      style={{ height: MARK_HEIGHT[size], width: "auto" }}
      loading="lazy"
      decoding="async"
    />
  );
}

/**
 * Monogram plus the visible name. `stackOnMobile` places the monogram above
 * the name on very narrow screens, used by the larger About presentation.
 */
export function DalilaFridiMark({
  size = "inline",
  stackOnMobile = false,
  nameClassName,
  className,
}: {
  size?: Size;
  stackOnMobile?: boolean;
  nameClassName?: string;
  className?: string;
}) {
  return (
    <span
      className={cn(
        "inline-flex min-w-0 items-center gap-2 align-middle",
        stackOnMobile && "flex-col gap-3 sm:flex-row sm:gap-4",
        className,
      )}
    >
      <DalilaFridiMonogram size={size} />
      <span className={cn("min-w-0", nameClassName)}>{NAME}</span>
    </span>
  );
}

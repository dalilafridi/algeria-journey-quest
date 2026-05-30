/**
 * LoadingScreen — thin wrapper over the museum's MedallionLoader so existing
 * call sites keep working while the loading experience uses the engraved
 * medallion artifact (no spinners, no generic loaders).
 */
import { MedallionLoader } from "@/components/brand/MedallionLoader";

type Props = {
  /** Optional fixed progress 0–100. If omitted, a smooth simulated progress runs. */
  progress?: number;
  /** When true, the loader is rendered inline (not full-screen). */
  inline?: boolean;
};

export function LoadingScreen({ progress, inline = false }: Props) {
  return <MedallionLoader progress={progress} inline={inline} size={inline ? 108 : 140} />;
}

export default LoadingScreen;

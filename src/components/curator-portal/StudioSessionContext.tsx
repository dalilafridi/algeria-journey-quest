import { createContext, useContext, type ReactNode } from "react";
import type { AppRole } from "@/lib/curator-portal/permissions";

export interface StudioSession {
  userId: string;
  email: string | null;
  roles: AppRole[];
  displayName: string | null;
  preferredLanguage: string;
}

const Ctx = createContext<StudioSession | null>(null);

export function StudioSessionProvider({ value, children }: { value: StudioSession; children: ReactNode }) {
  return <Ctx.Provider value={value}>{children}</Ctx.Provider>;
}

export function useStudioSession(): StudioSession {
  const v = useContext(Ctx);
  if (!v) throw new Error("useStudioSession must be used inside StudioSessionProvider");
  return v;
}

"use client";

import { usePathname } from "next/navigation";
import { isBareRoute } from "@/lib/bare-routes";

/* Hides site chrome (footer) on the full-screen /welcome country picker and
   on the internal /leads inbox. */
export function HideOnWelcome({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  if (isBareRoute(pathname)) return null;
  return <>{children}</>;
}

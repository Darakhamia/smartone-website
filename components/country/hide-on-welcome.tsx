"use client";

import { usePathname } from "next/navigation";

/* Hides site chrome (footer) on the full-screen /welcome country picker. */
export function HideOnWelcome({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  if (pathname === "/welcome") return null;
  return <>{children}</>;
}

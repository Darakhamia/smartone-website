"use client";

import { useCallback, useEffect, useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import { useCountry } from "@/components/country/country-context";
import { WelcomeScreen } from "@/components/country/welcome-screen";
import { COUNTRY_COOKIE, DEFAULT_COUNTRY_CODE, getCountry } from "@/lib/countries";

/* First-visit region picker, shown as a dismissable overlay rather than a
   redirect – so every page still serves real, indexable content to crawlers
   while the visitor is choosing. It appears only when no country cookie is set.
   Dismissing keeps the visitor on the default region; they can switch any time
   from the footer.

   It renders the same full-screen WelcomeScreen as the /welcome route. It used
   to be a small card holding the bare picker, which meant the version nearly
   every visitor saw was the plain one and the designed one was the version
   almost nobody reached. */
export function RegionGate() {
  const pathname = usePathname();
  const router = useRouter();
  const { enter } = useCountry();
  const [show, setShow] = useState(false);

  /* Re-read the cookie on every route change, not just on mount. Picking a
     country on /welcome writes the cookie and then navigates; the layout never
     remounts, so a mount-only check would leave `show` true and pop the picker
     over the page the visitor just landed on. */
  useEffect(() => {
    const hasCountry = document.cookie.split("; ").some((c) => c.startsWith(`${COUNTRY_COOKIE}=`));
    // eslint-disable-next-line react-hooks/set-state-in-effect -- client-only: cookies aren't readable during render
    setShow(!hasCountry);
  }, [pathname]);

  // Dismiss = accept the default region and stop asking.
  const dismiss = useCallback(() => {
    const c = getCountry(DEFAULT_COUNTRY_CODE);
    enter(DEFAULT_COUNTRY_CODE, c.languages[0]);
    setShow(false);
  }, [enter]);

  const open = show && pathname !== "/welcome";

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") dismiss();
    };
    window.addEventListener("keydown", onKey);
    // the page behind is covered – don't let it scroll under the picker
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = prev;
    };
  }, [open, dismiss]);

  if (!open) return null;

  // A real choice was made: re-render server components with the new cookie.
  const complete = () => {
    setShow(false);
    router.refresh();
  };

  return (
    <div className="anim-fade-up fixed inset-0 z-[80] overflow-y-auto bg-white" role="dialog" aria-modal="true">
      <WelcomeScreen onComplete={complete} onDismiss={dismiss} />
    </div>
  );
}

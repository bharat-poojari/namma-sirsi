"use client";

import type Lenis from "lenis";

let lenis: Lenis | null = null;

export function setLenis(l: Lenis | null) {
  lenis = l;
}

export function scrollToId(id: string) {
  const el = document.getElementById(id);
  if (!el) return;
  const reduced = document.documentElement.dataset.motion === "reduce";
  if (lenis && !reduced) lenis.scrollTo(el, { duration: 2.2, offset: 0 });
  else el.scrollIntoView({ behavior: reduced ? "auto" : "smooth", block: "start" });
}

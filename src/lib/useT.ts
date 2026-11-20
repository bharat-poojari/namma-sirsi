"use client";

import { useUI } from "./store";
import type { L } from "@/data/content";

/** Returns a translator for bilingual strings plus the active language. */
export function useT() {
  const lang = useUI((s) => s.lang);
  return { lang, t: (l: L) => l[lang] };
}

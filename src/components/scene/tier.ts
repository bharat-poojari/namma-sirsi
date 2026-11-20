"use client";

import { useEffect, useState } from "react";

export type Tier = "high" | "mid" | "low";

function detect(): Tier {
  if (typeof window === "undefined") return "mid";
  const w = window.innerWidth;
  const cores = navigator.hardwareConcurrency || 4;
  const mem = (navigator as Navigator & { deviceMemory?: number }).deviceMemory ?? 4;
  const coarse = window.matchMedia?.("(pointer: coarse)").matches;
  if (w < 640 || (coarse && (cores <= 4 || mem <= 3))) return "low";
  if (w < 1100 || coarse || cores <= 4 || mem <= 4) return "mid";
  return "high";
}

export function useTier(): Tier {
  const [tier, setTier] = useState<Tier>(detect);
  useEffect(() => {
    let frame = 0;
    const update = () => {
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(() => setTier(detect()));
    };
    const pointer = window.matchMedia("(pointer: coarse)");
    window.addEventListener("resize", update, { passive: true });
    window.addEventListener("orientationchange", update, { passive: true });
    pointer.addEventListener("change", update);
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("resize", update);
      window.removeEventListener("orientationchange", update);
      pointer.removeEventListener("change", update);
    };
  }, []);
  return tier;
}

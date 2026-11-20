"use client";

import { create } from "zustand";

export type Lang = "en" | "kn";

/** Mutable per-frame scroll state. Read inside useFrame — never subscribe React to it. */
export const scrollState = {
  /** 0..1 raw journey progress across all chapters */
  p: 0,
  /** smoothed progress used by the camera and lighting */
  smooth: 0,
  /** active chapter index (float) */
  chapter: 0,
};

type UI = {
  lang: Lang;
  setLang: (l: Lang) => void;
  reducedMotion: boolean;
  setReducedMotion: (v: boolean) => void;
  activeChapter: number;
  setActiveChapter: (i: number) => void;
  /** landmark selected in the 3D scene (a PLACES id) */
  selected: string | null;
  select: (id: string | null) => void;
  sceneReady: boolean;
  setSceneReady: (v: boolean) => void;
  menuOpen: boolean;
  setMenuOpen: (v: boolean) => void;
};

export const useUI = create<UI>((set) => ({
  lang: "en",
  setLang: (lang) => {
    try {
      localStorage.setItem("namma-sirsi-lang", lang);
    } catch {}
    set({ lang });
  },
  reducedMotion: false,
  setReducedMotion: (reducedMotion) => {
    try {
      localStorage.setItem("namma-sirsi-motion", reducedMotion ? "reduce" : "full");
    } catch {}
    set({ reducedMotion });
  },
  activeChapter: 0,
  setActiveChapter: (activeChapter) => set({ activeChapter }),
  selected: null,
  select: (selected) => set({ selected }),
  sceneReady: false,
  setSceneReady: (sceneReady) => set({ sceneReady }),
  menuOpen: false,
  setMenuOpen: (menuOpen) => set({ menuOpen }),
}));

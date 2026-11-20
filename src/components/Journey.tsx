"use client";

import dynamic from "next/dynamic";
import { useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Lenis from "lenis";
import { CHAPTERS } from "@/data/content";
import { scrollState, useUI } from "@/lib/store";
import { setLenis } from "@/lib/scroll";

const SceneCanvas = dynamic(() => import("./scene/SceneCanvas"), { ssr: false });

/**
 * Owns scrolling: smooth scroll (Lenis, synced to ScrollTrigger), the journey
 * progress that drives the 3D camera, and the scroll-linked text reveals.
 */
export default function Journey({ children }: { children: React.ReactNode }) {
  const reduced = useUI((s) => s.reducedMotion);
  const lang = useUI((s) => s.lang);
  const sceneReady = useUI((s) => s.sceneReady);

  // restore preferences
  useEffect(() => {
    const ui = useUI.getState();
    try {
      const l = localStorage.getItem("namma-sirsi-lang");
      if (l === "kn" || l === "en") ui.setLang(l);
      else if (navigator.language?.toLowerCase().startsWith("kn")) ui.setLang("kn");
      const m = localStorage.getItem("namma-sirsi-motion");
      const sys = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      useUI.setState({ reducedMotion: m ? m === "reduce" : sys });
    } catch {}
  }, []);

  useEffect(() => {
    document.documentElement.lang = lang === "kn" ? "kn" : "en";
  }, [lang]);

  useEffect(() => {
    document.documentElement.dataset.motion = reduced ? "reduce" : "full";
  }, [reduced]);

  useEffect(() => {
    if (sceneReady) return;
    const timer = window.setTimeout(() => useUI.getState().setSceneReady(true), 2200);
    return () => window.clearTimeout(timer);
  }, [sceneReady]);

  // scrolling, journey progress, reveals
  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    let lenis: Lenis | null = null;
    let tick: ((t: number) => void) | null = null;

    if (!reduced) {
      lenis = new Lenis({ lerp: 0.075, smoothWheel: true, wheelMultiplier: 0.84 });
      setLenis(lenis);
      lenis.on("scroll", ScrollTrigger.update);
      tick = (t: number) => lenis!.raf(t * 1000);
      gsap.ticker.add(tick);
      gsap.ticker.lagSmoothing(0);
    }

    const chapters = Array.from(document.querySelectorAll<HTMLElement>("[data-chapter]"));
    const N = CHAPTERS.length;
    let last = -1;
    const progress = () => {
      const vh = window.innerHeight;
      let p = 0;
      let active = 0;
      const first = chapters[0];
      if (!first) return;
      const centre = vh * 0.5;
      let found = false;
      for (let i = 0; i < chapters.length; i++) {
        const r = chapters[i].getBoundingClientRect();
        if (i === 0 && r.bottom > centre) {
          const span = Math.max(1, r.height - vh);
          p = (Math.min(1, Math.max(0, -r.top / span))) / N;
          active = 0;
          found = true;
          break;
        }
        if (r.top <= centre && r.bottom > centre) {
          const local = (centre - r.top) / r.height;
          p = (i + local) / N;
          active = i;
          found = true;
          break;
        }
      }
      if (!found) {
        p = 1;
        active = N - 1;
      }
      scrollState.p = Math.min(1, Math.max(0, p));
      scrollState.chapter = active;
      if (active !== last) {
        last = active;
        useUI.getState().setActiveChapter(active);
      }
    };
    gsap.ticker.add(progress);

    const ctx = gsap.context(() => {
      if (!reduced) {
        gsap.utils.toArray<HTMLElement>("[data-reveal]").forEach((el) => {
          gsap.fromTo(
            el,
            { y: 46, opacity: 0 },
            {
              y: 0,
              opacity: 1,
              duration: 1.1,
              ease: "power3.out",
              scrollTrigger: { trigger: el, start: "top 88%", toggleActions: "play none none reverse" },
            },
          );
        });
        gsap.utils.toArray<HTMLElement>("[data-ghost]").forEach((el) => {
          gsap.fromTo(
            el,
            { yPercent: 8 },
            {
              yPercent: -12,
              ease: "none",
              scrollTrigger: { trigger: el.parentElement, start: "top bottom", end: "bottom top", scrub: true },
            },
          );
        });
        // pinned opening: the title lifts away as the camera starts to move
        const hero = document.querySelector<HTMLElement>("[data-hero-inner]");
        if (hero) {
          gsap
            .timeline({
              scrollTrigger: {
                trigger: hero,
                start: "top top",
                end: "+=90%",
                pin: true,
                scrub: 0.6,
                anticipatePin: 1,
              },
            })
            .to("[data-hero-title]", { yPercent: -18, scale: 1.12, opacity: 0.0, ease: "none" }, 0)
            .to("[data-hero-sub]", { opacity: 0, y: -30, ease: "none" }, 0)
            .to("[data-hero-scroll]", { opacity: 0, ease: "none" }, 0);
          gsap.from("[data-hero-title] .word > span", {
            yPercent: 110,
            duration: 1.5,
            ease: "power4.out",
            stagger: 0.14,
            delay: 0.5,
          });
        }
        // closing sequence: pinned identity statement
        const id = document.querySelector<HTMLElement>("[data-identity-inner]");
        if (id) {
          gsap.fromTo(
            "[data-identity-title]",
            { scale: 0.88, opacity: 0.2 },
            {
              scale: 1,
              opacity: 1,
              ease: "none",
              scrollTrigger: { trigger: id, start: "top 80%", end: "top 20%", scrub: true },
            },
          );
        }
      }
    });

    const refresh = () => ScrollTrigger.refresh();
    window.addEventListener("load", refresh);
    const ro = new ResizeObserver(() => ScrollTrigger.refresh());
    ro.observe(document.body);

    return () => {
      window.removeEventListener("load", refresh);
      ro.disconnect();
      ctx.revert();
      gsap.ticker.remove(progress);
      if (tick) gsap.ticker.remove(tick);
      lenis?.destroy();
      setLenis(null);
    };
  }, [reduced, lang]);

  return (
    <>
      <div className="scene-wrap" aria-hidden="true">
        <SceneCanvas />
        <div className="scene-vignette" />
      </div>
      <div className="page">{children}</div>
    </>
  );
}

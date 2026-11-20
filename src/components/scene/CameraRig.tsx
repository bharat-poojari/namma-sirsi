"use client";

import { useFrame } from "@react-three/fiber";
import { useMemo, useRef } from "react";
import * as THREE from "three";
import { LANDMARKS, STOPS, smoothstep } from "@/lib/world";
import { scrollState, useUI } from "@/lib/store";
import { terrainHeight } from "./Terrain";

const posV = new THREE.Vector3();
const lookV = new THREE.Vector3();
const orbitPos = new THREE.Vector3();
const orbitLook = new THREE.Vector3();

/** +1 = subject sits left of centre (panel on the right), -1 = subject right of centre. */
const SHIFT = [0, 1, -1, 1, -1, 1, -1, 1, 0, 0];

export function CameraRig() {
  const curves = useMemo(() => {
    const p = new THREE.CatmullRomCurve3(
      STOPS.map((s) => new THREE.Vector3(...s.pos)),
      false,
      "centripetal",
    );
    const l = new THREE.CatmullRomCurve3(
      STOPS.map((s) => new THREE.Vector3(...s.look)),
      false,
      "centripetal",
    );
    return { p, l };
  }, []);
  const focusW = useRef(0);
  const shift = useRef(0);
  const orbitA = useRef(0);

  useFrame((state, dt) => {
    const ui = useUI.getState();
    const reduced = ui.reducedMotion;
    const cam = state.camera as THREE.PerspectiveCamera;

    // ease the journey toward the scroll target
    const frameDt = Math.min(dt, 0.05);
    const k = reduced ? 1 : 1 - Math.exp(-frameDt * 2.8);
    scrollState.smooth += (scrollState.p - scrollState.smooth) * k;
    const p = Math.min(1, Math.max(0, scrollState.smooth));

    // locate segment between stops; ease within it so the camera lingers at each stop
    let i = 0;
    while (i < STOPS.length - 2 && p > STOPS[i + 1].p) i++;
    const a = STOPS[i],
      b = STOPS[i + 1];
    const local = Math.min(1, Math.max(0, (p - a.p) / (b.p - a.p)));
    const eased = local * local * local * (local * (local * 6 - 15) + 10);
    const u = (i + eased) / (STOPS.length - 1);
    curves.p.getPoint(u, posV);
    curves.l.getPoint(u, lookV);

    const t = state.clock.elapsedTime;
    if (!reduced) {
      posV.x += Math.sin(t * 0.16) * 0.35;
      posV.y += Math.sin(t * 0.24) * 0.2;
      posV.z += Math.cos(t * 0.13) * 0.25;
    }

    // focus orbit around a selected landmark
    const target = ui.selected ? 1 : 0;
    focusW.current += (target - focusW.current) * (reduced ? 1 : 1 - Math.exp(-dt * 2.6));
    const lm = ui.selected ? LANDMARKS.find((l) => l.id === ui.selected) : undefined;
    if (lm) {
      if (!reduced) orbitA.current += frameDt * 0.1;
      const ground = terrainHeight(lm.pos[0], lm.pos[1]);
      const ang = orbitA.current + 0.9;
      orbitPos.set(
        lm.pos[0] + Math.cos(ang) * lm.focus.r,
        ground + lm.focus.h,
        lm.pos[1] + Math.sin(ang) * lm.focus.r,
      );
      orbitLook.set(lm.pos[0], ground + lm.focus.h * 0.45, lm.pos[1]);
    }
    const w = smoothstep(0, 1, focusW.current);
    if (w > 0.001 && lm) {
      posV.lerp(orbitPos, w);
      lookV.lerp(orbitLook, w);
    }

    // keep the camera above the ground
    const floor = terrainHeight(posV.x, posV.z) + 2.2;
    if (posV.y < floor) posV.y = floor;

    cam.position.copy(posV);
    cam.lookAt(lookV);
    const aspect = state.size.width / state.size.height;

    // slide the framing sideways so the scene's subject lands beside the text panel
    const N = SHIFT.length;
    const f = Math.min(N - 1, Math.max(0, p * N - 0.5));
    const i0 = Math.floor(f);
    const i1 = Math.min(N - 1, i0 + 1);
    const ts = f - i0;
    const shiftEase = ts * ts * ts * (ts * (ts * 6 - 15) + 10);
    const shiftTarget = ui.selected ? 0 : (SHIFT[i0] + (SHIFT[i1] - SHIFT[i0]) * shiftEase) * (aspect > 1.15 ? 0.2 : 0);
    shift.current += (shiftTarget - shift.current) * (reduced ? 1 : 1 - Math.exp(-frameDt * 2.6));
    const W = state.size.width,
      Hh = state.size.height;
    cam.setViewOffset(W, Hh, shift.current * W, 0, W, Hh);

    const fov = aspect < 0.8 ? 66 : aspect < 1.2 ? 56 : 48;
    if (Math.abs(cam.fov - fov) > 0.01) {
      cam.fov = fov;
      cam.updateProjectionMatrix();
    }
  });
  return null;
}

import { createNoise2D } from "simplex-noise";

/**
 * A stylised model of the Western Ghats around Sirsi.
 * 1 world unit ≈ 0.5 km horizontally; vertical relief is exaggerated.
 * +x = east (toward Banavasi), +z = south (toward Unchalli), west is the coast.
 * Landmark positions are indicative, derived from published coordinates where
 * available (Sirsi, Banavasi, Unchalli, Sahasralinga, Sonda); Yana is placed by
 * its description (west of Sirsi toward Kumta). Not to scale.
 */

export function mulberry32(seed: number) {
  let a = seed >>> 0;
  return () => {
    a |= 0;
    a = (a + 0x6d2b79f5) | 0;
    let t = Math.imul(a ^ (a >>> 15), 1 | a);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

const noise = createNoise2D(mulberry32(1688));

const clamp = (v: number, a = 0, b = 1) => Math.min(b, Math.max(a, v));
export const smoothstep = (a: number, b: number, x: number) => {
  const t = clamp((x - a) / (b - a));
  return t * t * (3 - 2 * t);
};

function fbm(x: number, z: number, oct = 4) {
  let amp = 1,
    f = 1,
    sum = 0,
    norm = 0;
  for (let i = 0; i < oct; i++) {
    sum += noise(x * f, z * f) * amp;
    norm += amp;
    amp *= 0.5;
    f *= 2.03;
  }
  return sum / norm;
}

function ridged(x: number, z: number, oct = 3) {
  let amp = 1,
    f = 1,
    sum = 0,
    norm = 0;
  for (let i = 0; i < oct; i++) {
    const n = 1 - Math.abs(noise(x * f, z * f));
    sum += n * n * amp;
    norm += amp;
    amp *= 0.5;
    f *= 2.1;
  }
  return sum / norm;
}

export type V2 = [number, number];

export const SIZE = 250;
export const HALF = SIZE / 2;

export const RIVERS: Record<string, V2[]> = {
  // Aghanashini rises near Sirsi and runs west to the sea, dropping at Unchalli.
  aghanashini: [
    [2, 4],
    [-4, 14],
    [-12, 28],
    [-19, 40],
    [-19, 47],
    [-26, 58],
    [-48, 70],
    [-80, 76],
    [-125, 82],
  ],
  // Varada passes Banavasi.
  varada: [
    [34, 70],
    [38, 40],
    [39, 19],
    [43, -12],
    [48, -50],
    [52, -125],
  ],
  // Shalmala, with the lingas at Sahasralinga.
  shalmala: [
    [-36, -60],
    [-18, -38],
    [-6, -22],
    [10, -12],
    [26, -4],
  ],
};

export const RIVER_WIDTH: Record<string, number> = { aghanashini: 0.55, varada: 0.85, shalmala: 0.48 };
const CARVE: Record<string, [number, number]> = {
  aghanashini: [5.5, 6],
  varada: [3.2, 9],
  shalmala: [3, 5],
};

function distToPolyline(x: number, z: number, pts: V2[]) {
  let best = Infinity;
  for (let i = 0; i < pts.length - 1; i++) {
    const [ax, az] = pts[i];
    const [bx, bz] = pts[i + 1];
    const abx = bx - ax,
      abz = bz - az;
    const t = clamp(((x - ax) * abx + (z - az) * abz) / (abx * abx + abz * abz));
    const px = ax + abx * t,
      pz = az + abz * t;
    const d = Math.hypot(x - px, z - pz);
    if (d < best) best = d;
  }
  return best;
}

export const FALLS: V2 = [-19, 47];

export const SITES = {
  sirsi: { pos: [0, 0] as V2, r: 9 },
  banavasi: { pos: [39, 19] as V2, r: 7 },
  sahasralinga: { pos: [-6, -22] as V2, r: 5 },
  sonda: { pos: [-13, -29] as V2, r: 5 },
  yana: { pos: [-62, 12] as V2, r: 5 },
} as const;

function profile(x: number) {
  // west→east cross-section: coast, Ghats crest near x=-55, Sirsi plateau, eastern plains
  const crest = 22 * Math.exp(-(((x + 56) / 30) ** 2));
  const rise = 10 * smoothstep(-125, -25, x);
  const east = -4 * smoothstep(10, 95, x);
  return 2 + crest + rise + east;
}

function rawHeight(x: number, z: number) {
  const rugged = 0.55 + 0.45 * smoothstep(40, -40, x); // more rugged toward the Ghats
  let h = profile(x);
  h += fbm(x * 0.012 + 3, z * 0.012 - 7, 3) * 5;
  h += (ridged(x * 0.028, z * 0.028, 4) - 0.5) * 16 * rugged;
  h += fbm(x * 0.09, z * 0.09, 3) * 1.6;
  h += (ridged(x * 0.085 + 17, z * 0.085 - 23, 2) - 0.5) * 1.4 * rugged;
  h += fbm(x * 0.22 - 8, z * 0.22 + 13, 2) * 0.45;
  // waterfall step at Unchalli: terrain south of the falls drops
  const fx = (x - FALLS[0]) / 17;
  h -= 15 * smoothstep(44, 47.8, z) * Math.exp(-fx * fx);
  return h;
}

const siteBase: Record<string, number> = {};
for (const [k, s] of Object.entries(SITES)) siteBase[k] = rawHeight(s.pos[0], s.pos[1]);

export function heightAt(x: number, z: number) {
  let h = rawHeight(x, z);
  for (const [k, s] of Object.entries(SITES)) {
    const d = Math.hypot(x - s.pos[0], z - s.pos[1]);
    if (d < s.r * 2.2) h += (siteBase[k] - h) * smoothstep(s.r * 2.2, s.r * 0.7, d);
  }
  for (const [name, pts] of Object.entries(RIVERS)) {
    const [depth, w] = CARVE[name];
    const d = distToPolyline(x, z, pts);
    h -= depth * Math.exp(-((d / w) ** 2));
  }
  // coastal edge falls away to sea level
  h -= 6 * smoothstep(-105, -HALF, x);
  return h;
}

export function riverDistance(x: number, z: number) {
  let d = Infinity;
  for (const pts of Object.values(RIVERS)) d = Math.min(d, distToPolyline(x, z, pts));
  return d;
}

export function slopeAt(x: number, z: number) {
  const e = 0.8;
  const dx = heightAt(x + e, z) - heightAt(x - e, z);
  const dz = heightAt(x, z + e) - heightAt(x, z - e);
  return Math.hypot(dx, dz) / (2 * e);
}

export function lateriteMask(x: number, z: number) {
  return noise(x * 0.05 + 40, z * 0.05 - 12);
}

export function densityMask(x: number, z: number) {
  return noise(x * 0.035 - 9, z * 0.035 + 21);
}

/** Points sampled along a river, on the terrain, with spacing in world units. */
export function sampleRiver(name: string, step = 0.7) {
  const pts = RIVERS[name];
  const out: { x: number; z: number; y: number }[] = [];
  for (let i = 0; i < pts.length - 1; i++) {
    const [ax, az] = pts[i];
    const [bx, bz] = pts[i + 1];
    const len = Math.hypot(bx - ax, bz - az);
    const n = Math.max(1, Math.round(len / step));
    for (let k = 0; k < n; k++) {
      const t = k / n;
      const x = ax + (bx - ax) * t;
      const z = az + (bz - az) * t;
      out.push({ x, z, y: heightAt(x, z) });
    }
  }
  const [lx, lz] = pts[pts.length - 1];
  out.push({ x: lx, z: lz, y: heightAt(lx, lz) });
  return out;
}

export type Landmark = {
  id: string; // PLACES id
  pos: V2;
  /** camera orbit radius & height when focused */
  focus: { r: number; h: number };
};

export const LANDMARKS: Landmark[] = [
  { id: "marikamba", pos: SITES.sirsi.pos, focus: { r: 14, h: 7 } },
  { id: "sahasralinga", pos: SITES.sahasralinga.pos, focus: { r: 11, h: 6 } },
  { id: "sonda", pos: SITES.sonda.pos, focus: { r: 11, h: 6 } },
  { id: "banavasi", pos: SITES.banavasi.pos, focus: { r: 13, h: 7 } },
  { id: "unchalli", pos: FALLS, focus: { r: 24, h: 9 } },
  { id: "yana", pos: SITES.yana.pos, focus: { r: 26, h: 9 } },
];

export type Stop = {
  /** journey progress where the camera should be at this stop */
  p: number;
  pos: [number, number, number];
  look: [number, number, number];
};

const H = (x: number, z: number) => heightAt(x, z);

/** Camera path. Heights are relative to the terrain at the look target. */
export const STOPS: Stop[] = [
  // 01 Arrival — high dawn view east over the Ghats
  { p: 0.0, pos: [-118, 52, 108], look: [-30, 14, 20] },
  { p: 0.07, pos: [-92, 40, 84], look: [-20, 12, 8] },
  // 02 Discover — the Sirsi plateau, topographic overview
  { p: 0.15, pos: [16, 58, 62], look: [0, H(0, 0), 2] },
  // 03 Sacred — Marikamba, Sahasralinga/Sonda, Banavasi
  { p: 0.22, pos: [9, H(0, 0) + 8, 17], look: [0, H(0, 0) + 3, 0] },
  { p: 0.255, pos: [-2, H(-6, -22) + 8, -9], look: [-7, H(-6, -22) + 1, -24] },
  { p: 0.29, pos: [27, H(39, 19) + 11, 34], look: [39, H(39, 19) + 3, 19] },
  // 04 Into the Wild — down the Aghanashini to Unchalli
  { p: 0.335, pos: [-6, H(-14, 30) + 8, 20], look: [-16, H(-19, 42) + 2, 40] },
  { p: 0.385, pos: [-19, H(-19, 66) + 6, 78], look: [-19, H(-19, 46) + 8, 46] },
  // 05 Culture — back to town at dusk
  { p: 0.45, pos: [-12, H(0, 0) + 10, 20], look: [0, H(0, 0) + 4, 0] },
  // 06 Taste — over the areca gardens
  { p: 0.55, pos: [14, H(14, 8) + 4.5, 20], look: [8, H(8, 0) + 3, 2] },
  // 07 People — golden afternoon on the plantation
  { p: 0.65, pos: [28, H(28, 30) + 9, 44], look: [18, H(18, 20) + 3, 18] },
  // 08 Beyond — blue hour at Yana
  { p: 0.75, pos: [-40, H(-62, 12) + 14, 40], look: [-62, H(-62, 12) + 8, 12] },
  // 09 Explore — high clear overview
  { p: 0.85, pos: [-8, 92, 74], look: [-6, 6, 6] },
  // 10 Identity — rise into sunrise
  { p: 1.0, pos: [20, 40, 120], look: [-18, 18, -6] },
];

export type Mood = {
  top: string;
  horizon: string;
  fog: string;
  sun: string;
  sunIntensity: number;
  ambient: string;
  ambientIntensity: number;
  sunDir: [number, number, number];
  night: number; // 0..1 stars + lanterns
  fogDensity: number;
  mist: number; // mist opacity
  glow: number; // landmark emissive boost
};

/** One mood per chapter, blended by journey progress. */
export const MOODS: Mood[] = [
  { top: "#172b3b", horizon: "#d8b99c", fog: "#b5a493", sun: "#f2d5ae", sunIntensity: 2.2, ambient: "#81909b", ambientIntensity: 0.55, sunDir: [-0.7, 0.32, -0.4], night: 0.0, fogDensity: 0.0065, mist: 0.5, glow: 0.35 },
  { top: "#315269", horizon: "#d3dfd8", fog: "#aebbb4", sun: "#f4ead3", sunIntensity: 2.2, ambient: "#8a9b9e", ambientIntensity: 0.7, sunDir: [-0.4, 0.7, 0.3], night: 0.0, fogDensity: 0.0058, mist: 0.4, glow: 0.25 },
  { top: "#345c70", horizon: "#e5d7b7", fog: "#b9c0a8", sun: "#f1dfbd", sunIntensity: 2.35, ambient: "#9aa391", ambientIntensity: 0.68, sunDir: [-0.5, 0.55, 0.45], night: 0.0, fogDensity: 0.0062, mist: 0.36, glow: 0.65 },
  { top: "#18382f", horizon: "#88a394", fog: "#718b7c", sun: "#d9e5cd", sunIntensity: 1.35, ambient: "#688675", ambientIntensity: 0.78, sunDir: [-0.2, 0.8, 0.2], night: 0.0, fogDensity: 0.0095, mist: 0.72, glow: 0.25 },
  { top: "#0c1020", horizon: "#604454", fog: "#383143", sun: "#e8a779", sunIntensity: 0.72, ambient: "#505075", ambientIntensity: 0.48, sunDir: [0.5, 0.12, 0.5], night: 1.0, fogDensity: 0.0078, mist: 0.3, glow: 1.15 },
  { top: "#2a211b", horizon: "#cc9364", fog: "#8f6c52", sun: "#f0ba7e", sunIntensity: 1.75, ambient: "#92775f", ambientIntensity: 0.58, sunDir: [0.6, 0.22, 0.2], night: 0.15, fogDensity: 0.007, mist: 0.28, glow: 0.8 },
  { top: "#365b70", horizon: "#e7d49e", fog: "#c5b78d", sun: "#f2d594", sunIntensity: 2.45, ambient: "#a19d7f", ambientIntensity: 0.62, sunDir: [0.55, 0.4, 0.5], night: 0.0, fogDensity: 0.0056, mist: 0.28, glow: 0.35 },
  { top: "#111b32", horizon: "#526c8d", fog: "#3d5068", sun: "#a5b7df", sunIntensity: 0.82, ambient: "#556b91", ambientIntensity: 0.62, sunDir: [-0.4, 0.2, -0.5], night: 0.45, fogDensity: 0.008, mist: 0.65, glow: 1.0 },
  { top: "#346b91", horizon: "#d8e6df", fog: "#c4d2cb", sun: "#f4efdf", sunIntensity: 2.3, ambient: "#a3b6b8", ambientIntensity: 0.78, sunDir: [-0.3, 0.9, 0.2], night: 0.0, fogDensity: 0.0038, mist: 0.18, glow: 0.4 },
  { top: "#233f63", horizon: "#e7c39f", fog: "#c9aa8e", sun: "#f2d0a6", sunIntensity: 2.5, ambient: "#a18e82", ambientIntensity: 0.68, sunDir: [-0.8, 0.28, -0.3], night: 0.0, fogDensity: 0.0062, mist: 0.46, glow: 0.75 },
];

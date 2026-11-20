"use client";

import { Html } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import { useEffect, useMemo, useRef } from "react";
import * as THREE from "three";
import { createNoise2D } from "simplex-noise";
import { FALLS, LANDMARKS, SITES, mulberry32 } from "@/lib/world";
import { PLACES } from "@/data/content";
import { scrollState, useUI } from "@/lib/store";
import { live } from "./Atmosphere";
import { terrainHeight } from "./Terrain";
import { useTier } from "./tier";

/* ---------- shared glowing materials ---------- */

const glowMats: { mat: THREE.MeshStandardMaterial; base: number }[] = [];
function useGlow(color: string, base = 1.2) {
  const mat = useMemo(() => {
    const m = new THREE.MeshStandardMaterial({
      color: "#2b1d12",
      emissive: new THREE.Color(color),
      emissiveIntensity: base,
      roughness: 0.6,
    });
    glowMats.push({ mat: m, base });
    return m;
  }, [color, base]);
  return mat;
}

function GlowDriver() {
  useFrame(() => {
    const g = 0.45 + live.glow;
    for (const { mat, base } of glowMats) mat.emissiveIntensity = base * g;
  });
  return null;
}

const stone = { color: "#b9a98c", roughness: 0.95 } as const;
const cream = { color: "#ead9b5", roughness: 0.95 } as const;

function Block(props: {
  p: [number, number, number];
  s: [number, number, number];
  c?: string;
  r?: [number, number, number];
}) {
  return (
    <mesh position={props.p} scale={props.s} rotation={props.r}>
      <boxGeometry />
      <meshStandardMaterial color={props.c ?? "#ead9b5"} roughness={0.95} />
    </mesh>
  );
}

function Hip({ p, r, h, c, rot = Math.PI / 4 }: { p: [number, number, number]; r: number; h: number; c: string; rot?: number }) {
  return (
    <mesh position={p} rotation={[0, rot, 0]}>
      <coneGeometry args={[r, h, 4]} />
      <meshStandardMaterial color={c} roughness={0.85} flatShading />
    </mesh>
  );
}

/* ---------- Marikamba temple, town, ratha ---------- */

function Marikamba() {
  const lamp = useGlow("#ffb25a", 1.4);
  const gold = useGlow("#ffd36b", 1.2);
  return (
    <group>
      {/* plinth + courtyard */}
      <Block p={[0, 0.2, 0]} s={[7.4, 0.4, 6.2]} c="#b9a98c" />
      {[-3.4, 3.4].map((x) => (
        <Block key={x} p={[x, 0.75, 0]} s={[0.25, 0.7, 6]} c="#e6d4ac" />
      ))}
      <Block p={[0, 0.75, -2.9]} s={[6.8, 0.7, 0.25]} c="#e6d4ac" />
      {/* sanctum hall */}
      <Block p={[0, 1.5, -0.6]} s={[3.4, 1.8, 2.8]} c="#ead9b5" />
      {/* blue façade with doorway */}
      <Block p={[0, 1.75, 1.0]} s={[4.4, 2.3, 0.35]} c="#3a6db3" />
      <Block p={[0, 1.35, 1.2]} s={[1.0, 1.5, 0.2]} c="#1b1209" />
      {[-1.7, -0.85, 0.85, 1.7].map((x) => (
        <Block key={x} p={[x, 3.05, 1.0]} s={[0.4, 0.3, 0.35]} c="#f0e3c1" />
      ))}
      {/* tiled roofs */}
      <Hip p={[0, 3.35, -0.6]} r={2.8} h={1.35} c="#b4532a" />
      <Hip p={[0, 4.35, -0.6]} r={1.7} h={1.1} c="#a24a26" />
      <mesh position={[0, 5.1, -0.6]} material={gold}>
        <sphereGeometry args={[0.2, 12, 8]} />
      </mesh>
      {/* lamps */}
      {[
        [-3.4, 1.4],
        [3.4, 1.4],
        [-3.4, -2.8],
        [3.4, -2.8],
      ].map(([x, z]) => (
        <group key={`${x}${z}`} position={[x, 0.4, z]}>
          <mesh position={[0, 0.5, 0]}>
            <cylinderGeometry args={[0.05, 0.06, 1.0, 6]} />
            <meshStandardMaterial color="#3a2a1a" />
          </mesh>
          <mesh position={[0, 1.1, 0]} material={lamp}>
            <sphereGeometry args={[0.16, 10, 8]} />
          </mesh>
        </group>
      ))}
    </group>
  );
}

function Ratha() {
  const cloth = ["#c2362b", "#e0a02a", "#c2362b", "#e0a02a"];
  const flag = useGlow("#ff8a3c", 0.8);
  return (
    <group position={[0, 0, 5.6]}>
      <Block p={[0, 0.45, 0]} s={[2.2, 0.5, 1.8]} c="#5a3a22" />
      {[-0.9, 0.9].map((x) =>
        [-0.6, 0.6].map((z) => (
          <mesh key={`${x}${z}`} position={[x, 0.4, z]} rotation={[0, 0, Math.PI / 2]}>
            <cylinderGeometry args={[0.38, 0.38, 0.14, 12]} />
            <meshStandardMaterial color="#3a2616" roughness={0.9} />
          </mesh>
        )),
      )}
      {cloth.map((c, i) => (
        <group key={i}>
          <Block p={[0, 1.0 + i * 0.75, 0]} s={[1.7 - i * 0.28, 0.7, 1.4 - i * 0.22]} c={c} />
          <Hip p={[0, 1.42 + i * 0.75, 0]} r={1.15 - i * 0.2} h={0.32} c="#6b4426" />
        </group>
      ))}
      <mesh position={[0, 4.4, 0]} material={flag}>
        <coneGeometry args={[0.18, 0.7, 6]} />
      </mesh>
    </group>
  );
}

function Town() {
  const walls = useRef<THREE.InstancedMesh>(null);
  const roofs = useRef<THREE.InstancedMesh>(null);
  const tier = useTier();
  const count = tier === "low" ? 28 : 48;
  const data = useMemo(() => {
    const rnd = mulberry32(88);
    const out: { x: number; z: number; w: number; d: number; h: number; r: number; tone: number }[] = [];
    let g = 0;
    while (out.length < count && g++ < 3000) {
      const a = rnd() * Math.PI * 2;
      const r = 7 + Math.pow(rnd(), 0.8) * 8;
      const x = Math.cos(a) * r;
      const z = Math.sin(a) * r;
      if (Math.hypot(x, z - 5.6) < 3.2) continue;
      if (out.some((o) => Math.hypot(o.x - x, o.z - z) < 1.9)) continue;
      out.push({ x, z, w: 1.1 + rnd() * 0.9, d: 1.1 + rnd() * 0.8, h: 0.9 + rnd() * 0.9, r: rnd() * Math.PI, tone: rnd() });
    }
    return out;
  }, [count]);
  useEffect(() => {
    const w = walls.current,
      r = roofs.current;
    if (!w || !r) return;
    const o = new THREE.Object3D();
    const c = new THREE.Color();
    data.forEach((b, i) => {
      const y = terrainHeight(SITES.sirsi.pos[0] + b.x, SITES.sirsi.pos[1] + b.z);
      o.position.set(b.x, y + b.h / 2, b.z);
      o.rotation.set(0, b.r, 0);
      o.scale.set(b.w, b.h, b.d);
      o.updateMatrix();
      w.setMatrixAt(i, o.matrix);
      c.setHSL(0.09 + b.tone * 0.03, 0.3, 0.8 - b.tone * 0.15);
      w.setColorAt(i, c);
      o.position.set(b.x, y + b.h + 0.34, b.z);
      o.scale.set(b.w * 0.95, 0.7, b.d * 0.95);
      o.updateMatrix();
      r.setMatrixAt(i, o.matrix);
      c.setHSL(0.04 + b.tone * 0.02, 0.6, 0.34 + b.tone * 0.08);
      r.setColorAt(i, c);
    });
    w.instanceMatrix.needsUpdate = r.instanceMatrix.needsUpdate = true;
    if (w.instanceColor) w.instanceColor.needsUpdate = true;
    if (r.instanceColor) r.instanceColor.needsUpdate = true;
  }, [data]);
  return (
    <group>
      <instancedMesh ref={walls} args={[undefined, undefined, data.length]} frustumCulled={false}>
        <boxGeometry />
        <meshStandardMaterial roughness={0.95} />
      </instancedMesh>
      <instancedMesh ref={roofs} args={[undefined, undefined, data.length]} frustumCulled={false}>
        <coneGeometry args={[0.78, 1, 4]} />
        <meshStandardMaterial roughness={0.85} flatShading />
      </instancedMesh>
    </group>
  );
}

/* ---------- Sahasralinga: lingas along the Shalmala ---------- */

function Sahasralinga() {
  const glow = useGlow("#ffcf80", 0.5);
  const items = useMemo(() => {
    const rnd = mulberry32(55);
    return Array.from({ length: 22 }, (_, i) => {
      const t = i / 21;
      return {
        x: -4.8 + t * 9.6 + (rnd() - 0.5) * 1.2,
        z: -1.3 + Math.sin(t * 5) * 1.6 + (rnd() - 0.5) * 1.6,
        s: 0.55 + rnd() * 0.45,
        nandi: rnd() > 0.78,
      };
    });
  }, []);
  return (
    <group>
      {items.map((it, i) => (
        <group key={i} position={[it.x, 0.02, it.z]} scale={it.s}>
          <mesh position={[0, 0.07, 0]}>
            <boxGeometry args={[0.7, 0.14, 0.7]} />
            <meshStandardMaterial color="#6f6c64" roughness={1} />
          </mesh>
          <mesh position={[0, 0.34, 0]} material={glow}>
            <cylinderGeometry args={[0.13, 0.15, 0.4, 10]} />
          </mesh>
          <mesh position={[0, 0.54, 0]} material={glow}>
            <sphereGeometry args={[0.13, 10, 8]} />
          </mesh>
          {it.nandi && (
            <group position={[0.55, 0.1, 0]}>
              <mesh position={[0, 0.14, 0]}>
                <boxGeometry args={[0.42, 0.24, 0.26]} />
                <meshStandardMaterial color="#8a877d" roughness={1} />
              </mesh>
              <mesh position={[0.26, 0.3, 0]}>
                <sphereGeometry args={[0.12, 8, 6]} />
                <meshStandardMaterial color="#8a877d" roughness={1} />
              </mesh>
            </group>
          )}
        </group>
      ))}
    </group>
  );
}

/* ---------- Sonda: mathas and a Jain tower ---------- */

function Sonda() {
  return (
    <group>
      {[
        [-1.8, 0.4, 1.6, 1.0, 0.9],
        [0.4, -0.4, 1.4, 0.9, 1.0],
        [2.2, 0.9, 1.1, 1.2, 0.8],
      ].map(([x, z, w, d, h], i) => (
        <group key={i} position={[x, 0, z]}>
          <Block p={[0, h / 2, 0]} s={[w, h, d]} c="#efe3c8" />
          <mesh position={[0, h + 0.38, 0]} rotation={[0, Math.PI / 4, 0]} scale={[w * 0.78, 1, d * 0.78]}>
            <coneGeometry args={[0.9, 0.8, 4]} />
            <meshStandardMaterial color="#a24a26" roughness={0.85} flatShading />
          </mesh>
        </group>
      ))}
      <group position={[-0.2, 0, -2.4]}>
        <Block p={[0, 0.2, 0]} s={[1.6, 0.4, 1.6]} c="#e8e3da" />
        {[0, 1, 2].map((i) => (
          <Block key={i} p={[0, 0.7 + i * 0.5, 0]} s={[1.2 - i * 0.28, 0.5, 1.2 - i * 0.28]} c="#f2eee6" />
        ))}
        <Hip p={[0, 2.2, 0]} r={0.35} h={0.5} c="#d7d2c6" />
      </group>
    </group>
  );
}

/* ---------- Banavasi: Madhukeshwara temple ---------- */

function Banavasi() {
  const honey = useGlow("#ffc361", 1.0);
  return (
    <group>
      {[0, 1, 2].map((i) => (
        <Block key={i} p={[0, 0.15 + i * 0.3, 0]} s={[7.2 - i * 0.9, 0.3, 5.6 - i * 0.7]} c="#bfa57a" />
      ))}
      {/* mandapa */}
      <Block p={[0, 1.55, 1.0]} s={[4.2, 1.3, 2.8]} c="#c9a46a" />
      {[-1.8, -0.6, 0.6, 1.8].map((x) => (
        <mesh key={x} position={[x, 1.05, 2.6]}>
          <cylinderGeometry args={[0.13, 0.15, 1.2, 8]} />
          <meshStandardMaterial color="#d6b37a" roughness={0.9} />
        </mesh>
      ))}
      <Block p={[0, 2.35, 1.0]} s={[4.5, 0.25, 3.1]} c="#bfa57a" />
      {/* shikhara */}
      {Array.from({ length: 6 }, (_, i) => (
        <Block key={i} p={[0, 1.8 + i * 0.62, -1.3]} s={[2.9 - i * 0.42, 0.62, 2.9 - i * 0.42]} c={i % 2 ? "#cfae74" : "#c29c62"} />
      ))}
      <mesh position={[0, 5.7, -1.3]} material={honey}>
        <sphereGeometry args={[0.26, 12, 8]} />
      </mesh>
      {/* Nandi */}
      <group position={[0, 0.9, 4.1]}>
        <Block p={[0, 0.2, 0]} s={[1.1, 0.4, 0.9]} c="#bfa57a" />
        <mesh position={[0, 0.7, 0]}>
          <boxGeometry args={[0.9, 0.55, 0.5]} />
          <meshStandardMaterial color="#2a2623" roughness={0.7} />
        </mesh>
        <mesh position={[0, 0.95, 0.4]}>
          <sphereGeometry args={[0.26, 10, 8]} />
          <meshStandardMaterial color="#2a2623" roughness={0.7} />
        </mesh>
      </group>
    </group>
  );
}

/* ---------- Yana: karst limestone spires ---------- */

function spire(r: number, h: number, seed: number) {
  const noise = createNoise2D(mulberry32(seed));
  const g = new THREE.ConeGeometry(r, h, 18, 34, true);
  const p = g.attributes.position as THREE.BufferAttribute;
  for (let i = 0; i < p.count; i++) {
    const x = p.getX(i),
      y = p.getY(i),
      z = p.getZ(i);
    const a = Math.atan2(z, x);
    const t = (y + h / 2) / h; // 0 bottom → 1 top
    const n = noise(Math.cos(a) * 1.6 + y * 0.35, Math.sin(a) * 1.6 + y * 0.35);
    const k = 1 + n * 0.22 * (1 - t * 0.5);
    // vertical fluting and a slightly bulging mid-section
    const flute = 1 + 0.07 * Math.sin(a * 7 + y * 0.6);
    const bulge = 1 + 0.18 * Math.sin(Math.min(1, t * 1.6) * Math.PI * 0.5);
    p.setXYZ(i, x * k * flute * bulge, y, z * k * flute * bulge);
  }
  g.computeVertexNormals();
  return g;
}

function Yana() {
  const g1 = useMemo(() => spire(4.2, 13, 1), []);
  const g2 = useMemo(() => spire(3.3, 10, 2), []);
  const outcrops = useMemo(() => {
    const rnd = mulberry32(6);
    return Array.from({ length: 7 }, () => ({
      x: (rnd() - 0.5) * 14,
      z: (rnd() - 0.5) * 10,
      s: 1 + rnd() * 1.6,
      r: rnd() * 3,
    }));
  }, []);
  const mat = <meshStandardMaterial color="#1f1d1e" roughness={0.9} flatShading side={THREE.DoubleSide} />;
  return (
    <group>
      <mesh geometry={g1} position={[-2.2, 6.5, 0]}>
        {mat}
      </mesh>
      <mesh geometry={g2} position={[3.4, 5, 1.2]}>
        {mat}
      </mesh>
      {outcrops.map((o, i) => (
        <mesh key={i} position={[o.x, o.s * 0.4, o.z]} rotation={[0, o.r, 0]} scale={[o.s, o.s * 1.4, o.s]}>
          <dodecahedronGeometry args={[1, 0]} />
          <meshStandardMaterial color="#2a2829" roughness={1} flatShading />
        </mesh>
      ))}
    </group>
  );
}

/* ---------- annotation pins ---------- */

/** Where each chapter's text panel sits, so pins can stay in the open half. */
const PANEL_SIDE = ["none", "right", "left", "right", "left", "right", "left", "right", "full", "center"] as const;

function Pin({ id, position }: { id: string; position: [number, number, number] }) {
  const lang = useUI((s) => s.lang);
  const select = useUI((s) => s.select);
  const selected = useUI((s) => s.selected);
  const place = PLACES.find((p) => p.id === id);
  const el = useRef<HTMLDivElement>(null);
  const vec = useMemo(() => new THREE.Vector3(...position), [position]);
  const ndc = useMemo(() => new THREE.Vector3(), []);
  useFrame((state) => {
    if (!el.current) return;
    const d = state.camera.position.distanceTo(vec);
    el.current.dataset.near = d < 70 ? "1" : "0";
    // keep pins out of the half of the screen the text panels occupy
    ndc.copy(vec).project(state.camera);
    const sx = (ndc.x + 1) / 2;
    const sy = (1 - ndc.y) / 2;
    const side = PANEL_SIDE[Math.min(PANEL_SIDE.length - 1, scrollState.chapter)];
    const behind = ndc.z > 1 || ndc.z < -1;
    const freeHalfHeading =
      (side === "right" && sx <= 0.54) || (side === "left" && sx >= 0.46) ? sy > 0.12 && sy < 0.6 : false;
    const hide =
      useUI.getState().selected === id
        ? false
        : behind ||
          freeHalfHeading ||
          side === "full" ||
          (side === "right" && sx > 0.46) ||
          (side === "left" && sx < 0.54) ||
          (side === "center" && sx > 0.22 && sx < 0.78 && sy > 0.5);
    el.current.dataset.hide = hide ? "1" : "0";
  });
  if (!place) return null;
  const name = place.name[lang];
  return (
    <Html position={position} center zIndexRange={[30, 0]} style={{ pointerEvents: "none" }}>
      <div ref={el} className="pin" data-active={selected === id ? "1" : "0"}>
        <button
          type="button"
          aria-label={name}
          aria-pressed={selected === id}
          onClick={() => select(selected === id ? null : id)}
          className="pin__btn"
        >
          <span className="pin__dot" />
          <span className="pin__label">{name}</span>
        </button>
      </div>
    </Html>
  );
}

export function Landmarks() {
  const placed = useMemo(() => {
    const at = (x: number, z: number): [number, number, number] => [x, terrainHeight(x, z), z];
    return {
      sirsi: at(...SITES.sirsi.pos),
      banavasi: at(...SITES.banavasi.pos),
      sahasralinga: at(...SITES.sahasralinga.pos),
      sonda: at(...SITES.sonda.pos),
      yana: at(...SITES.yana.pos),
      falls: [FALLS[0], terrainHeight(FALLS[0], FALLS[1] - 2) + 1, FALLS[1]] as [number, number, number],
    };
  }, []);

  const pinPos = (id: string): [number, number, number] => {
    const lm = LANDMARKS.find((l) => l.id === id)!;
    const y =
      id === "unchalli"
        ? placed.falls[1] + 5
        : id === "yana"
          ? placed.yana[1] + 16
          : id === "banavasi"
            ? placed.banavasi[1] + 8
            : id === "marikamba"
              ? placed.sirsi[1] + 7
              : terrainHeight(lm.pos[0], lm.pos[1]) + 4;
    return [lm.pos[0], y, lm.pos[1]];
  };

  return (
    <group>
      <GlowDriver />
      <group position={placed.sirsi}>
        <Marikamba />
        <Ratha />
      </group>
      <Town />
      <group position={placed.sahasralinga}>
        <Sahasralinga />
      </group>
      <group position={placed.sonda}>
        <Sonda />
      </group>
      <group position={placed.banavasi}>
        <Banavasi />
      </group>
      <group position={placed.yana}>
        <Yana />
      </group>
      {LANDMARKS.map((l) => (
        <Pin key={l.id} id={l.id} position={pinPos(l.id)} />
      ))}
    </group>
  );
}

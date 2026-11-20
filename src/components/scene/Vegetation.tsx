"use client";

import { useEffect, useMemo, useRef } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";
import { mergeGeometries, mergeVertices } from "three/examples/jsm/utils/BufferGeometryUtils.js";
import { createNoise3D } from "simplex-noise";
import { SITES, densityMask, mulberry32, riverDistance, slopeAt } from "@/lib/world";
import { terrainHeight } from "./Terrain";
import { useTier } from "./tier";
import { live } from "./Atmosphere";

const dummy = new THREE.Object3D();
const col = new THREE.Color();
const forestWindTime = { value: 0 };
const arecaWindTime = { value: 0 };

function windMaterial(
  amplitude: number,
  form: "canopy" | "frond" | "trunk",
  time: { value: number },
  color = "#ffffff",
) {
  const material = new THREE.MeshStandardMaterial({
    color,
    roughness: form === "frond" ? 0.88 : 0.94,
    side: form === "frond" ? THREE.DoubleSide : THREE.FrontSide,
  });
  material.onBeforeCompile = (shader) => {
    shader.uniforms.uWindTime = time;
    shader.vertexShader = shader.vertexShader
      .replace("#include <common>", "#include <common>\nuniform float uWindTime;")
      .replace(
        "#include <begin_vertex>",
        `#include <begin_vertex>
float windPhase = uWindTime * 0.55;
#ifdef USE_INSTANCING
windPhase += instanceMatrix[3].x * 0.035 + instanceMatrix[3].z * 0.041;
#endif
${
  form === "canopy"
    ? `float windWeight = clamp(position.y + 0.25, 0.0, 1.3);
transformed.x += sin(windPhase) * ${amplitude.toFixed(3)} * windWeight;
transformed.z += cos(windPhase * 0.8) * ${ (amplitude * 0.35).toFixed(3) } * windWeight;`
    : form === "frond"
      ? `float windWeight = max(position.x, 0.0);
transformed.z += sin(windPhase + position.x * 0.72) * ${amplitude.toFixed(3)} * windWeight;
transformed.y += cos(windPhase + position.x * 0.52) * ${ (amplitude * 0.28).toFixed(3) } * windWeight;`
      : `float windWeight = position.y + 0.5;
transformed.x += sin(windPhase) * ${amplitude.toFixed(3)} * windWeight;`
}`,
      );
  };
  material.customProgramCacheKey = () => `wind-${form}-${amplitude}`;
  return material;
}

function nearSite(x: number, z: number, pad = 1.4) {
  for (const s of Object.values(SITES)) {
    if (Math.hypot(x - s.pos[0], z - s.pos[1]) < s.r * pad) return true;
  }
  return false;
}

function canopyGeometry() {
  const n3 = createNoise3D(mulberry32(404));
  const lobes = [
    [0, 0, 0, 0.74, 0.78, 0.76],
    [0.48, 0.06, 0.08, 0.52, 0.58, 0.54],
    [-0.46, 0.04, 0.1, 0.55, 0.62, 0.56],
    [0.06, 0.09, 0.48, 0.54, 0.6, 0.5],
    [-0.08, 0.08, -0.46, 0.53, 0.58, 0.55],
  ].map(([x, y, z, sx, sy, sz]) => {
    const g = new THREE.IcosahedronGeometry(1, 2);
    const matrix = new THREE.Matrix4().compose(
      new THREE.Vector3(x, y, z),
      new THREE.Quaternion(),
      new THREE.Vector3(sx, sy, sz),
    );
    g.applyMatrix4(matrix);
    g.deleteAttribute("normal");
    g.deleteAttribute("uv");
    return g;
  });
  const g = mergeVertices(mergeGeometries(lobes, false)!);
  lobes.forEach((lobe) => lobe.dispose());
  const p = g.attributes.position as THREE.BufferAttribute;
  const v = new THREE.Vector3();
  for (let i = 0; i < p.count; i++) {
    v.fromBufferAttribute(p, i);
    const k = 1 + n3(v.x * 1.7, v.y * 1.7, v.z * 1.7) * 0.18 + n3(v.x * 4, v.y * 4, v.z * 4) * 0.05;
    v.multiplyScalar(k);
    v.y *= 0.88;
    p.setXYZ(i, v.x, v.y, v.z);
  }
  g.computeVertexNormals();
  return g;
}

function frondGeometry() {
  const positions: number[] = [];
  const indices: number[] = [];

  const addTriangle = (a: THREE.Vector3, b: THREE.Vector3, c: THREE.Vector3) => {
    const start = positions.length / 3;
    positions.push(a.x, a.y, a.z, b.x, b.y, b.z, c.x, c.y, c.z);
    indices.push(start, start + 1, start + 2);
  };

  const length = 2.15;
  const spine: THREE.Vector3[] = [];
  for (let i = 0; i <= 16; i++) {
    const t = i / 16;
    spine.push(new THREE.Vector3(length * t, 0.15 + 0.8 * Math.sin(Math.PI * t) - 0.45 * t, 0));
    if (i > 0) {
      const a = spine[i - 1];
      const b = spine[i];
      addTriangle(
        new THREE.Vector3(a.x, a.y, -0.025),
        new THREE.Vector3(b.x, b.y, -0.025),
        new THREE.Vector3(a.x, a.y, 0.025),
      );
      addTriangle(
        new THREE.Vector3(a.x, a.y, 0.025),
        new THREE.Vector3(b.x, b.y, -0.025),
        new THREE.Vector3(b.x, b.y, 0.025),
      );
    }
  }

  for (let i = 2; i < 15; i++) {
    const t = i / 16;
    const base = spine[i];
    const leafletLength = 0.32 + Math.sin(Math.PI * t) * 0.48;
    for (const side of [-1, 1]) {
      const root = new THREE.Vector3(base.x, base.y, 0);
      const shoulder = new THREE.Vector3(base.x - leafletLength * 0.22, base.y + 0.04, side * leafletLength * 0.52);
      const tip = new THREE.Vector3(base.x - leafletLength * 0.62, base.y - 0.1, side * leafletLength);
      const mid = new THREE.Vector3(base.x - leafletLength * 0.38, base.y - 0.04, side * leafletLength * 0.72);
      addTriangle(root, shoulder, mid);
      addTriangle(shoulder, tip, mid);
    }
  }

  const geometry = new THREE.BufferGeometry();
  geometry.setAttribute("position", new THREE.Float32BufferAttribute(positions, 3));
  geometry.setIndex(indices);
  geometry.computeVertexNormals();
  return geometry;
}

/** Canopy trees across the Ghats, denser and darker toward the west. */
function Forest() {
  const tier = useTier();
  const target = tier === "high" ? 5200 : tier === "mid" ? 3200 : 1600;
  const canopy = useRef<THREE.InstancedMesh>(null);
  const trunks = useRef<THREE.InstancedMesh>(null);
  const geo = useMemo(() => canopyGeometry(), []);
  const canopyMaterial = useMemo(() => windMaterial(0.035, "canopy", forestWindTime), []);
  const trunkMaterial = useMemo(() => windMaterial(0.012, "trunk", forestWindTime, "#72583c"), []);
  useFrame(() => {
    forestWindTime.value = live.time;
  });

  const data = useMemo(() => {
    const rnd = mulberry32(2026);
    const out: { x: number; y: number; z: number; s: number; h: number; c: number }[] = [];
    let tries = 0;
    while (out.length < target && tries < target * 14) {
      tries++;
      const x = (rnd() - 0.5) * 235;
      const z = (rnd() - 0.5) * 235;
      if (nearSite(x, z)) continue;
      const y = terrainHeight(x, z);
      if (y < 0.9) continue;
      const sl = slopeAt(x, z);
      if (sl > 0.9) continue;
      if (riverDistance(x, z) < 2.2) continue;
      // forest is thicker in the Ghats (west) and thinner on the open plateau
      const west = Math.min(1, Math.max(0, (20 - x) / 90));
      const d = 0.5 + 0.5 * densityMask(x, z);
      if (rnd() > 0.25 + 0.75 * west * d + 0.1) continue;
      out.push({
        x,
        y,
        z,
        s: 0.75 + rnd() * 1.1 + west * 0.45,
        h: 2 + rnd() * 2.4 + west * 1.6,
        c: rnd(),
      });
    }
    return out;
  }, [target]);

  useEffect(() => {
    const crowns = canopy.current;
    const stems = trunks.current;
    if (!crowns || !stems) return;
    data.forEach((t, i) => {
      dummy.position.set(t.x, t.y + t.h * 0.43, t.z);
      dummy.rotation.set(0, t.c * 6.28, (t.c - 0.5) * 0.08);
      dummy.scale.set(t.s * 0.1, t.h, t.s * 0.1);
      dummy.updateMatrix();
      stems.setMatrixAt(i, dummy.matrix);
      col.setHSL(0.08 + t.c * 0.035, 0.28 + t.c * 0.12, 0.18 + t.c * 0.1);
      stems.setColorAt(i, col);

      dummy.position.set(t.x, t.y + t.h * 0.82, t.z);
      dummy.scale.set(t.s, t.s * (0.9 + t.c * 0.2), t.s);
      dummy.updateMatrix();
      crowns.setMatrixAt(i, dummy.matrix);
      col.setHSL(0.3 + t.c * 0.06, 0.45 + t.c * 0.2, 0.17 + t.c * 0.1);
      crowns.setColorAt(i, col);
    });
    crowns.instanceMatrix.needsUpdate = true;
    stems.instanceMatrix.needsUpdate = true;
    if (crowns.instanceColor) crowns.instanceColor.needsUpdate = true;
    if (stems.instanceColor) stems.instanceColor.needsUpdate = true;
  }, [data]);

  return (
    <group>
      <instancedMesh
        ref={trunks}
        args={[undefined, undefined, data.length]}
        material={trunkMaterial}
        frustumCulled={false}
        castShadow
      >
        <cylinderGeometry args={[0.65, 1, 1, 6]} />
      </instancedMesh>
      <instancedMesh
        ref={canopy}
        args={[geo, undefined, data.length]}
        material={canopyMaterial}
        frustumCulled={false}
        castShadow
      >
      </instancedMesh>
    </group>
  );
}

/** Areca palms: tall, slender, grown in tight gardens on the valley floors. */
function ArecaGroves() {
  const tier = useTier();
  const target = tier === "high" ? 1400 : tier === "mid" ? 900 : 420;
  const trunks = useRef<THREE.InstancedMesh>(null);
  const fronds = useRef<THREE.InstancedMesh>(null);
  const frondGeo = useMemo(() => frondGeometry(), []);
  const trunkMaterial = useMemo(() => windMaterial(0.016, "trunk", arecaWindTime, "#b9ab86"), []);
  const frondMaterial = useMemo(() => windMaterial(0.052, "frond", arecaWindTime), []);
  const frondsPerPalm = 8;
  useFrame(() => {
    arecaWindTime.value = live.time;
  });

  const data = useMemo(() => {
    const rnd = mulberry32(14);
    const out: { x: number; y: number; z: number; h: number; r: number }[] = [];
    // garden centres around Sirsi and the nearby valleys
    const centres: [number, number, number][] = [
      [12, 8, 10],
      [-4, 16, 9],
      [18, -6, 9],
      [-14, -4, 8],
      [26, 26, 8],
      [8, 30, 8],
      [30, -2, 7],
      [-2, -14, 7],
    ];
    let guard = 0;
    while (out.length < target && guard < target * 30) {
      guard++;
      const [cx, cz, cr] = centres[Math.floor(rnd() * centres.length)];
      const a = rnd() * Math.PI * 2;
      const r = Math.sqrt(rnd()) * cr;
      const x = cx + Math.cos(a) * r;
      const z = cz + Math.sin(a) * r;
      if (Math.hypot(x, z) < 6.5) continue; // keep the temple square clear
      if (nearSite(x, z, 1.0) && Math.hypot(x - SITES.banavasi.pos[0], z - SITES.banavasi.pos[1]) < 8) continue;
      if (riverDistance(x, z) < 1.8) continue;
      if (slopeAt(x, z) > 0.5) continue;
      const y = terrainHeight(x, z);
      // gardens are planted in a loose grid
      const gx = Math.round(x / 0.95) * 0.95 + (rnd() - 0.5) * 0.12;
      const gz = Math.round(z / 0.95) * 0.95 + (rnd() - 0.5) * 0.12;
      out.push({ x: gx, y: terrainHeight(gx, gz) || y, z: gz, h: 3 + rnd() * 1.8, r: rnd() });
    }
    return out;
  }, [target]);

  useEffect(() => {
    const t = trunks.current,
      f = fronds.current;
    if (!t || !f) return;
    data.forEach((p, i) => {
      dummy.position.set(p.x, p.y + p.h / 2, p.z);
      dummy.rotation.set((p.r - 0.5) * 0.06, 0, (p.r - 0.5) * 0.06);
      dummy.scale.set(1, p.h, 1);
      dummy.updateMatrix();
      t.setMatrixAt(i, dummy.matrix);
      for (let j = 0; j < frondsPerPalm; j++) {
        const index = i * frondsPerPalm + j;
        dummy.position.set(p.x, p.y + p.h - 0.12, p.z);
        dummy.rotation.set(0, (j / frondsPerPalm) * Math.PI * 2 + p.r * 0.5, 0);
        const spread = 0.78 + p.r * 0.35;
        dummy.scale.set(spread, spread, spread);
        dummy.updateMatrix();
        f.setMatrixAt(index, dummy.matrix);
        col.setHSL(0.28 + p.r * 0.045, 0.52, 0.22 + p.r * 0.1);
        f.setColorAt(index, col);
      }
    });
    t.instanceMatrix.needsUpdate = true;
    f.instanceMatrix.needsUpdate = true;
    if (f.instanceColor) f.instanceColor.needsUpdate = true;
  }, [data]);

  return (
    <group>
      <instancedMesh
        ref={trunks}
        args={[undefined, undefined, data.length]}
        material={trunkMaterial}
        frustumCulled={false}
      >
        <cylinderGeometry args={[0.07, 0.1, 1, 5]} />
      </instancedMesh>
      <instancedMesh
        ref={fronds}
        args={[frondGeo, undefined, data.length * frondsPerPalm]}
        material={frondMaterial}
        frustumCulled={false}
        castShadow
      >
      </instancedMesh>
    </group>
  );
}

export function Vegetation() {
  return (
    <>
      <Forest />
      <ArecaGroves />
    </>
  );
}

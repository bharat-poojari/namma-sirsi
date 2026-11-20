"use client";

import { useMemo } from "react";
import * as THREE from "three";
import { createNoise2D } from "simplex-noise";
import {
  HALF,
  SIZE,
  heightAt,
  lateriteMask,
  mulberry32,
  riverDistance,
  smoothstep,
} from "@/lib/world";
import { useTier } from "./tier";

const C = (hex: string) => new THREE.Color(hex);
const deep = C("#1b4a2b");
const mid = C("#2f6d3d");
const light = C("#4d8044");
const ridge = C("#587f62");
const paddy = C("#8fa650");
const laterite = C("#9a5836");
const rock = C("#6f685d");
const sand = C("#c9ba8c");
const tmp = new THREE.Color();

function surfaceMaps() {
  const size = 512;
  const noise = createNoise2D(mulberry32(318));
  const colorData = new Uint8Array(size * size * 4);
  const roughnessData = new Uint8Array(size * size * 4);

  for (let y = 0; y < size; y++) {
    for (let x = 0; x < size; x++) {
      const wx = ((x / size) - 0.5) * SIZE;
      const wz = ((y / size) - 0.5) * SIZE;
      const grain =
        noise(wx * 0.075, wz * 0.075) * 0.48 +
        noise(wx * 0.28, wz * 0.28) * 0.34 +
        noise(wx * 0.9, wz * 0.9) * 0.18;
      const i = (y * size + x) * 4;
      const color = Math.round(246 + grain * 9);
      const roughness = Math.round(232 + grain * 20);
      colorData[i] = color;
      colorData[i + 1] = color;
      colorData[i + 2] = color;
      colorData[i + 3] = 255;
      roughnessData[i] = roughness;
      roughnessData[i + 1] = roughness;
      roughnessData[i + 2] = roughness;
      roughnessData[i + 3] = 255;
    }
  }

  const makeTexture = (data: Uint8Array) => {
    const texture = new THREE.DataTexture(data, size, size, THREE.RGBAFormat);
    texture.wrapS = THREE.ClampToEdgeWrapping;
    texture.wrapT = THREE.ClampToEdgeWrapping;
    texture.magFilter = THREE.LinearFilter;
    texture.minFilter = THREE.LinearMipmapLinearFilter;
    texture.generateMipmaps = true;
    texture.anisotropy = 4;
    texture.needsUpdate = true;
    return texture;
  };

  const color = makeTexture(colorData);
  color.colorSpace = THREE.SRGBColorSpace;
  return { color, roughness: makeTexture(roughnessData) };
}

function edgeTarget(x: number) {
  return x < -95 ? -3 : 2.5;
}

export function terrainHeight(x: number, z: number) {
  let h = heightAt(x, z);
  // blend the outer rim into the flat base so the world dissolves into fog
  const edge = smoothstep(HALF - 48, HALF - 6, Math.max(Math.abs(z), Math.abs(x)));
  h += (edgeTarget(x) - h) * edge;
  return h;
}

export function Terrain() {
  const tier = useTier();
  const seg = tier === "high" ? 280 : tier === "mid" ? 210 : 145;
  const maps = useMemo(() => surfaceMaps(), []);

  const geometry = useMemo(() => {
    const g = new THREE.PlaneGeometry(SIZE, SIZE, seg, seg);
    g.rotateX(-Math.PI / 2);
    const pos = g.attributes.position as THREE.BufferAttribute;
    const n = pos.count;
    const heights = new Float32Array(n);
    for (let i = 0; i < n; i++) {
      const y = terrainHeight(pos.getX(i), pos.getZ(i));
      heights[i] = y;
      pos.setY(i, y);
    }
    g.computeVertexNormals();
    const normals = g.attributes.normal as THREE.BufferAttribute;
    const colors = new Float32Array(n * 3);
    const rnd = mulberry32(9);
    for (let i = 0; i < n; i++) {
      const x = pos.getX(i),
        z = pos.getZ(i),
        y = heights[i];
      const slope = 1 - normals.getY(i); // 0 flat → 1 vertical
      const rd = riverDistance(x, z);

      tmp.copy(deep).lerp(mid, smoothstep(0, 16, y));
      tmp.lerp(light, smoothstep(10, 22, y) * 0.55);
      // paddy fields on gentle ground beside rivers
      const pm = (1 - smoothstep(2, 9, rd)) * (1 - smoothstep(0.04, 0.22, slope)) * (1 - smoothstep(8, 15, y));
      tmp.lerp(paddy, pm * 0.85);
      // exposed laterite on the plateau
      const lm = smoothstep(0.22, 0.6, lateriteMask(x, z)) * (1 - smoothstep(0.05, 0.25, slope)) * smoothstep(7, 11, y);
      tmp.lerp(laterite, lm * 0.7);
      // ridge mist tint
      tmp.lerp(ridge, smoothstep(21, 30, y) * 0.5);
      // rock on steep faces
      tmp.lerp(rock, smoothstep(0.12, 0.36, slope));
      // sand at the coast
      tmp.lerp(sand, 1 - smoothstep(0.2, 1.6, y));
      const v = 0.97 + rnd() * 0.06;
      colors[i * 3] = tmp.r * v;
      colors[i * 3 + 1] = tmp.g * v;
      colors[i * 3 + 2] = tmp.b * v;
    }
    g.setAttribute("color", new THREE.BufferAttribute(colors, 3));
    return g;
  }, [seg]);

  return (
    <group>
      <mesh geometry={geometry} receiveShadow>
        <meshStandardMaterial
          vertexColors
          map={maps.color}
          roughnessMap={maps.roughness}
          roughness={1}
          metalness={0}
        />
      </mesh>
      {/* flat land beyond the rim, fogged into the horizon */}
      <mesh position={[560, 2.4, 0]} rotation={[-Math.PI / 2, 0, 0]}>
        <planeGeometry args={[1000, 1400]} />
        <meshStandardMaterial color="#27502f" roughness={1} />
      </mesh>
      <mesh position={[0, 2.35, 700]} rotation={[-Math.PI / 2, 0, 0]}>
        <planeGeometry args={[1400, 900]} />
        <meshStandardMaterial color="#27502f" roughness={1} />
      </mesh>
      <mesh position={[0, 2.35, -700]} rotation={[-Math.PI / 2, 0, 0]}>
        <planeGeometry args={[1400, 900]} />
        <meshStandardMaterial color="#27502f" roughness={1} />
      </mesh>
      {/* the Arabian Sea to the west */}
      <mesh position={[-640, 0, 0]} rotation={[-Math.PI / 2, 0, 0]}>
        <planeGeometry args={[1000, 1400]} />
        <meshStandardMaterial color="#2a6f8c" roughness={0.25} metalness={0.1} />
      </mesh>
    </group>
  );
}

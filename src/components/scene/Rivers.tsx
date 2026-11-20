"use client";

import { useFrame } from "@react-three/fiber";
import { useMemo, useRef } from "react";
import * as THREE from "three";
import { FALLS, RIVERS, RIVER_WIDTH, mulberry32, smoothstep } from "@/lib/world";
import { live } from "./Atmosphere";
import { terrainHeight } from "./Terrain";
import { useTier } from "./tier";

const riverVert = /* glsl */ `
attribute float aFall;
varying vec2 vUv; varying vec3 vWp; varying float vDist; varying float vFall;
void main(){
  vUv = uv;
  vFall = aFall;
  vec4 wp = modelMatrix * vec4(position,1.0);
  vWp = wp.xyz;
  vec4 mv = viewMatrix * wp;
  vDist = -mv.z;
  gl_Position = projectionMatrix * mv;
}`;

const riverFrag = /* glsl */ `
varying vec2 vUv; varying vec3 vWp; varying float vDist; varying float vFall;
uniform float uTime; uniform vec3 uFog; uniform float uFogD; uniform vec3 uSun; uniform float uLight;
void main(){
  float fall = smoothstep(0.05, 0.95, vFall);
  float speed = mix(1.6, 7.0, fall);
  float s1 = sin(vUv.y*5.5 - uTime*speed + sin(vUv.x*11.0)*1.6);
  float s2 = sin(vUv.y*13.0 - uTime*speed*1.3 + vUv.x*7.0);
  float streak = 0.5 + 0.25*s1 + 0.25*s2;
  vec3 deepC = vec3(0.025,0.12,0.15);
  vec3 shallow = vec3(0.12,0.34,0.36);
  vec3 col = mix(deepC, shallow, streak);
  float edge = smoothstep(0.0, 0.06, vUv.x) * (1.0 - smoothstep(0.94, 1.0, vUv.x));
  col = mix(vec3(0.58,0.72,0.69), col, edge);
  // whitewater: vertical streaks that fall faster than they spread
  float st = 0.5 + 0.5*sin(vUv.x*38.0 + sin(vUv.y*3.0)*2.0);
  float st2 = 0.5 + 0.5*sin(vUv.x*91.0 - vUv.y*2.0 + uTime*0.3);
  float ww = clamp(0.35 + 0.45*st*st + 0.3*st2*streak, 0.0, 1.0);
  col = mix(col, vec3(0.93,0.97,1.0), fall * ww);
  col *= uLight;
  col += uSun * 0.06 * pow(streak, 3.0);
  float f = 1.0 - exp(-uFogD*uFogD*vDist*vDist);
  col = mix(col, uFog, clamp(f,0.0,1.0));
  gl_FragColor = vec4(col, mix(0.96, 0.62, fall));
  #include <tonemapping_fragment>
  #include <colorspace_fragment>
}`;

function ribbon(name: string) {
  const curve = new THREE.CatmullRomCurve3(
    RIVERS[name].map(([x, z]) => new THREE.Vector3(x, 0, z)),
    false,
    "centripetal",
  );
  const pts = curve
    .getSpacedPoints(Math.ceil(curve.getLength() / 0.45))
    .map(({ x, z }) => ({ x, z }));
  const baseW = RIVER_WIDTH[name];
  const verts: number[] = [];
  const uvs: number[] = [];
  const falls: number[] = [];
  const idx: number[] = [];
  let len = 0;
  for (let i = 0; i < pts.length; i++) {
    const a = pts[Math.max(0, i - 1)];
    const b = pts[Math.min(pts.length - 1, i + 1)];
    let tx = b.x - a.x,
      tz = b.z - a.z;
    const tl = Math.hypot(tx, tz) || 1;
    tx /= tl;
    tz /= tl;
    const nx = -tz,
      nz = tx;
    if (i > 0) len += Math.hypot(pts[i].x - pts[i - 1].x, pts[i].z - pts[i - 1].z);
    // widen downstream
    const w = baseW * (0.8 + 0.5 * (i / pts.length));
    const p = pts[i];
    // the ribbon hugs the terrain on each side so it follows steps and the falls
    const yC = terrainHeight(p.x, p.z) + 0.32;
    const yL = yC + THREE.MathUtils.clamp(terrainHeight(p.x + nx * w, p.z + nz * w) + 0.32 - yC, -0.16, 0.24);
    const yR = yC + THREE.MathUtils.clamp(terrainHeight(p.x - nx * w, p.z - nz * w) + 0.32 - yC, -0.16, 0.24);
    const fall =
      name === "aghanashini"
        ? smoothstep(42.8, 44.5, p.z) *
          (1 - smoothstep(47.8, 49.5, p.z)) *
          Math.exp(-(((p.x + 19) / 4.5) ** 2))
        : 0;
    verts.push(p.x + nx * w, yL, p.z + nz * w, p.x - nx * w, yR, p.z - nz * w);
    uvs.push(0, len * 0.35, 1, len * 0.35);
    falls.push(fall, fall);
    if (i < pts.length - 1) {
      const k = i * 2;
      idx.push(k, k + 1, k + 2, k + 1, k + 3, k + 2);
    }
  }
  const g = new THREE.BufferGeometry();
  g.setAttribute("position", new THREE.Float32BufferAttribute(verts, 3));
  g.setAttribute("uv", new THREE.Float32BufferAttribute(uvs, 2));
  g.setAttribute("aFall", new THREE.Float32BufferAttribute(falls, 1));
  g.setIndex(idx);
  g.computeVertexNormals();
  return g;
}

function waterfallCurtain() {
  const across = 12;
  const down = 40;
  const topZ = 44.3;
  const bottomZ = 48.2;
  const verts: number[] = [];
  const uvs: number[] = [];
  const falls: number[] = [];
  const indices: number[] = [];

  for (let j = 0; j <= down; j++) {
    const t = j / down;
    const z = topZ + (bottomZ - topZ) * t;
    const width = 1.55 * (0.78 + 0.22 * Math.sin(Math.PI * t));
    const centerX = FALLS[0] + Math.sin(Math.PI * t) * 0.2;
    for (let i = 0; i <= across; i++) {
      const u = i / across;
      const x = centerX + (u - 0.5) * width;
      const top = terrainHeight(x, topZ) + 0.32;
      const bottom = terrainHeight(x, bottomZ) + 0.32;
      const ripple = Math.sin(u * Math.PI * 8 + t * Math.PI * 2) * 0.035;
      verts.push(x, THREE.MathUtils.lerp(top, bottom, t) + ripple, z);
      uvs.push(u, t * 5);
      falls.push(1);
      if (j < down && i < across) {
        const k = j * (across + 1) + i;
        indices.push(k, k + across + 1, k + 1, k + 1, k + across + 1, k + across + 2);
      }
    }
  }

  const geometry = new THREE.BufferGeometry();
  geometry.setAttribute("position", new THREE.Float32BufferAttribute(verts, 3));
  geometry.setAttribute("uv", new THREE.Float32BufferAttribute(uvs, 2));
  geometry.setAttribute("aFall", new THREE.Float32BufferAttribute(falls, 1));
  geometry.setIndex(indices);
  geometry.computeVertexNormals();
  return geometry;
}

const sprayVert = /* glsl */ `
attribute float aPhase;
uniform float uTime; uniform float uPx; uniform float uRise;
varying float vA;
void main(){
  float t = fract(uTime*0.35 + aPhase);
  vec3 p = position;
  p.x += sin(aPhase*40.0 + uTime)*0.9*t + (aPhase-0.5)*2.4;
  p.y += t*uRise;
  p.z += cos(aPhase*31.0 + uTime*0.8)*0.9*t + 0.8*t;
  vec4 mv = modelViewMatrix * vec4(p,1.0);
  gl_Position = projectionMatrix * mv;
  gl_PointSize = (1.2 + t*4.0) * uPx / max(1.0,-mv.z);
  vA = (1.0 - t) * smoothstep(0.0, 0.08, t);
}`;
const sprayFrag = /* glsl */ `
varying float vA; uniform vec3 uColor;
void main(){
  float d = length(gl_PointCoord-0.5);
  float a = smoothstep(0.5,0.0,d) * vA * 0.5;
  if(a<0.005) discard;
  gl_FragColor = vec4(uColor, a);
  #include <colorspace_fragment>
}`;

function Spray() {
  const tier = useTier();
  const n = tier === "high" ? 220 : 110;
  const { geo, mat } = useMemo(() => {
    const rnd = mulberry32(31);
    const pos = new Float32Array(n * 3);
    const ph = new Float32Array(n);
    const [fx, fz] = FALLS;
    const baseY = terrainHeight(fx, fz + 5) + 0.4;
    for (let i = 0; i < n; i++) {
      pos[i * 3] = fx + (rnd() - 0.5) * 2.2;
      pos[i * 3 + 1] = baseY;
      pos[i * 3 + 2] = fz + 4.2 + rnd() * 1.4;
      ph[i] = rnd();
    }
    const geo = new THREE.BufferGeometry();
    geo.setAttribute("position", new THREE.BufferAttribute(pos, 3));
    geo.setAttribute("aPhase", new THREE.BufferAttribute(ph, 1));
    const mat = new THREE.ShaderMaterial({
      vertexShader: sprayVert,
      fragmentShader: sprayFrag,
      transparent: true,
      depthWrite: false,
      uniforms: {
        uTime: { value: 0 },
        uPx: { value: 400 },
        uRise: { value: 5 },
        uColor: { value: new THREE.Color("#eef6f8") },
      },
    });
    return { geo, mat };
  }, [n]);
  const matRef = useRef(mat);
  useFrame((state) => {
    matRef.current.uniforms.uTime.value = live.time;
    matRef.current.uniforms.uPx.value = state.gl.domElement.height * 0.9;
  });
  return <points geometry={geo} material={mat} frustumCulled={false} />;
}

export function Rivers() {
  const mats = useMemo(() => {
    const make = () =>
      new THREE.ShaderMaterial({
        vertexShader: riverVert,
        fragmentShader: riverFrag,
        transparent: true,
        polygonOffset: true,
        polygonOffsetFactor: -4,
        polygonOffsetUnits: -4,
        side: THREE.DoubleSide,
        uniforms: {
          uTime: { value: 0 },
          uFog: { value: new THREE.Color() },
          uFogD: { value: 0.008 },
          uSun: { value: new THREE.Color() },
          uLight: { value: 1 },
        },
      });
    return Object.keys(RIVERS).map((k) => ({ name: k, mat: make(), geo: ribbon(k) }));
  }, []);
  const matsRef = useRef(mats);
  const waterfall = useMemo(() => waterfallCurtain(), []);

  useFrame(() => {
    for (const { mat } of matsRef.current) {
      const u = mat.uniforms;
      u.uTime.value = live.time;
      u.uFog.value.copy(live.fog);
      u.uFogD.value = live.fogDensity;
      u.uSun.value.copy(live.sun);
      u.uLight.value = 0.45 + live.sunIntensity * 0.2 + live.ambientIntensity * 0.2;
    }
  });

  return (
    <group>
      {mats.map(({ name, mat, geo }) => (
        <mesh key={name} geometry={geo} material={mat} renderOrder={2} frustumCulled={false} />
      ))}
      <mesh
        geometry={waterfall}
        material={mats.find(({ name }) => name === "aghanashini")?.mat}
        renderOrder={3}
        frustumCulled={false}
      />
      <Spray />
    </group>
  );
}

"use client";

import { useFrame, useThree } from "@react-three/fiber";
import { useEffect, useMemo, useRef } from "react";
import * as THREE from "three";
import { MOODS, heightAt, mulberry32, smoothstep } from "@/lib/world";
import { scrollState, useUI } from "@/lib/store";
import { useTier } from "./tier";

/** Live, blended atmosphere state. Read-only for everything except MoodDriver. */
export const live = {
  top: new THREE.Color(),
  horizon: new THREE.Color(),
  fog: new THREE.Color(),
  sun: new THREE.Color(),
  ambient: new THREE.Color(),
  sunIntensity: 2,
  ambientIntensity: 0.6,
  sunDir: new THREE.Vector3(-0.5, 0.6, 0.2),
  night: 0,
  fogDensity: 0.008,
  mist: 0.5,
  glow: 0.5,
  time: 0,
};

const MC = MOODS.map((m) => ({
  top: new THREE.Color(m.top),
  horizon: new THREE.Color(m.horizon),
  fog: new THREE.Color(m.fog),
  sun: new THREE.Color(m.sun),
  ambient: new THREE.Color(m.ambient),
  dir: new THREE.Vector3(...m.sunDir).normalize(),
}));

const tmpDir = new THREE.Vector3();

export function MoodDriver() {
  const scene = useThree((s) => s.scene);
  useFrame((state) => {
    const reduced = useUI.getState().reducedMotion;
    const n = MOODS.length;
    const f = Math.min(n - 1, Math.max(0, scrollState.smooth * n - 0.5));
    const i0 = Math.floor(f);
    const i1 = Math.min(n - 1, i0 + 1);
    const t = f - i0;
    const a = MOODS[i0],
      b = MOODS[i1];
    const A = MC[i0],
      B = MC[i1];
    live.top.copy(A.top).lerp(B.top, t);
    live.horizon.copy(A.horizon).lerp(B.horizon, t);
    live.fog.copy(A.fog).lerp(B.fog, t);
    live.sun.copy(A.sun).lerp(B.sun, t);
    live.ambient.copy(A.ambient).lerp(B.ambient, t);
    tmpDir.copy(A.dir).lerp(B.dir, t).normalize();
    live.sunDir.copy(tmpDir);
    const L = (x: number, y: number) => x + (y - x) * t;
    live.sunIntensity = L(a.sunIntensity, b.sunIntensity);
    live.ambientIntensity = L(a.ambientIntensity, b.ambientIntensity);
    live.night = L(a.night, b.night);
    live.fogDensity = L(a.fogDensity, b.fogDensity);
    live.mist = L(a.mist, b.mist);
    live.glow = L(a.glow, b.glow);
    live.time = reduced ? 0 : state.clock.elapsedTime;

    if (scene.fog instanceof THREE.FogExp2) {
      scene.fog.color.copy(live.fog);
      scene.fog.density = live.fogDensity;
    }
    scene.background = null;
  });
  return null;
}

export function Lights() {
  const sun = useRef<THREE.DirectionalLight>(null);
  const hemi = useRef<THREE.HemisphereLight>(null);
  const tier = useTier();
  const shadows = tier !== "low";
  useFrame(() => {
    if (sun.current) {
      sun.current.color.copy(live.sun);
      sun.current.intensity = live.sunIntensity * 0.72;
      sun.current.position.copy(live.sunDir).multiplyScalar(120);
    }
    if (hemi.current) {
      hemi.current.color.copy(live.horizon).lerp(live.ambient, 0.5);
      hemi.current.groundColor.copy(live.fog).multiplyScalar(0.35);
      hemi.current.intensity = live.ambientIntensity * 0.82;
    }
  });
  return (
    <>
      <hemisphereLight ref={hemi} />
      <directionalLight
        ref={sun}
        castShadow={shadows}
        shadow-mapSize-width={tier === "high" ? 2048 : 1024}
        shadow-mapSize-height={tier === "high" ? 2048 : 1024}
        shadow-camera-near={1}
        shadow-camera-far={300}
        shadow-camera-left={-140}
        shadow-camera-right={140}
        shadow-camera-top={140}
        shadow-camera-bottom={-140}
        shadow-bias={-0.00015}
        shadow-normalBias={0.04}
        shadow-radius={3}
      />
    </>
  );
}

const skyVert = /* glsl */ `
varying vec3 vDir;
void main(){
  vDir = normalize(position);
  vec4 mv = modelViewMatrix * vec4(position,1.0);
  gl_Position = projectionMatrix * mv;
  gl_Position.z = gl_Position.w * 0.9999;
}`;

const skyFrag = /* glsl */ `
varying vec3 vDir;
uniform vec3 uTop; uniform vec3 uHorizon; uniform vec3 uFog; uniform vec3 uSun; uniform vec3 uSunDir;
uniform float uNight; uniform float uTime;
float hash(vec3 p){ p = fract(p*0.3183099+.1); p*=17.0; return fract(p.x*p.y*p.z*(p.x+p.y+p.z)); }
float hash2(vec2 p){ return fract(sin(dot(p,vec2(127.1,311.7)))*43758.5453); }
float noise2(vec2 p){
  vec2 i=floor(p), f=fract(p);
  f=f*f*(3.0-2.0*f);
  return mix(mix(hash2(i),hash2(i+vec2(1.0,0.0)),f.x),
             mix(hash2(i+vec2(0.0,1.0)),hash2(i+vec2(1.0,1.0)),f.x),f.y);
}
void main(){
  vec3 d = normalize(vDir);
  float h = d.y;
  float up = pow(clamp(h * 0.92 + 0.08,0.0,1.0), 0.62);
  vec3 col = mix(uHorizon, uTop, up);
  float haze = 1.0 - smoothstep(-0.06, 0.22, h);
  col = mix(col, uFog, haze * 0.48);
  float s = max(dot(d, normalize(uSunDir)),0.0);
  float sunHaze = pow(s, 10.0) * haze;
  col = mix(col, uSun, sunHaze * 0.12);
  col += uSun * (pow(s, 48.0)*0.18 + pow(s, 720.0)*0.75);
  vec2 cloudUv = d.xz / max(0.22, h + 0.45) * 4.2;
  cloudUv += vec2(uTime * 0.004, uTime * 0.0015);
  float cloud = noise2(cloudUv) * 0.72 + noise2(cloudUv * 1.9 + 12.7) * 0.28;
  float cloudMask = smoothstep(0.57, 0.78, cloud) * (1.0 - smoothstep(0.18, 0.72, h));
  col = mix(col, mix(uFog, uHorizon, 0.28), cloudMask * 0.13);
  // stars
  vec3 g = floor(d*260.0);
  float st = step(0.9965, hash(g));
  float tw = 0.6 + 0.4*sin(uTime*2.0 + hash(g+3.0)*30.0);
  col += vec3(0.9,0.95,1.0) * st * tw * uNight * smoothstep(0.02,0.35,h);
  gl_FragColor = vec4(col,1.0);
  #include <tonemapping_fragment>
  #include <colorspace_fragment>
}`;

export function Sky() {
  const mesh = useRef<THREE.Mesh>(null);
  const mat = useMemo(
    () =>
      new THREE.ShaderMaterial({
        vertexShader: skyVert,
        fragmentShader: skyFrag,
        side: THREE.BackSide,
        depthWrite: false,
        fog: false,
        uniforms: {
          uTop: { value: new THREE.Color() },
          uHorizon: { value: new THREE.Color() },
          uFog: { value: new THREE.Color() },
          uSun: { value: new THREE.Color() },
          uSunDir: { value: new THREE.Vector3() },
          uNight: { value: 0 },
          uTime: { value: 0 },
        },
      }),
    [],
  );
  useFrame((state) => {
    const u = mat.uniforms;
    u.uTop.value.copy(live.top);
    u.uHorizon.value.copy(live.horizon);
    u.uFog.value.copy(live.fog);
    u.uSun.value.copy(live.sun);
    u.uSunDir.value.copy(live.sunDir);
    u.uNight.value = live.night;
    u.uTime.value = live.time;
    mesh.current?.position.copy(state.camera.position);
  });
  return (
    <mesh ref={mesh} material={mat} renderOrder={-10} frustumCulled={false}>
      <sphereGeometry args={[600, 32, 20]} />
    </mesh>
  );
}

function softSprite() {
  const c = document.createElement("canvas");
  c.width = c.height = 128;
  const g = c.getContext("2d")!;
  const grad = g.createRadialGradient(64, 64, 0, 64, 64, 64);
  grad.addColorStop(0, "rgba(255,255,255,0.9)");
  grad.addColorStop(0.45, "rgba(255,255,255,0.35)");
  grad.addColorStop(1, "rgba(255,255,255,0)");
  g.fillStyle = grad;
  g.fillRect(0, 0, 128, 128);
  const t = new THREE.CanvasTexture(c);
  t.colorSpace = THREE.SRGBColorSpace;
  return t;
}

/** Drifting mist banks hugging the terrain. */
export function Mist() {
  const tier = useTier();
  const count = tier === "high" ? 420 : tier === "mid" ? 260 : 140;
  const ref = useRef<THREE.Points>(null);
  const { geo, speeds, baseY, baseZ, phases } = useMemo(() => {
    const rnd = mulberry32(77);
    const pos = new Float32Array(count * 3);
    const speeds = new Float32Array(count);
    const baseY = new Float32Array(count);
    const baseZ = new Float32Array(count);
    const phases = new Float32Array(count);
    for (let i = 0; i < count; i++) {
      const x = (rnd() - 0.5) * 230;
      const z = (rnd() - 0.5) * 230;
      pos[i * 3] = x;
      pos[i * 3 + 1] = Math.max(1, heightAt(x, z)) + 1.5 + rnd() * 5;
      pos[i * 3 + 2] = z;
      speeds[i] = 0.25 + rnd() * 0.5;
      baseY[i] = pos[i * 3 + 1];
      baseZ[i] = z;
      phases[i] = rnd() * Math.PI * 2;
    }
    const geo = new THREE.BufferGeometry();
    geo.setAttribute("position", new THREE.BufferAttribute(pos, 3));
    return { geo, speeds, baseY, baseZ, phases };
  }, [count]);
  const tex = useMemo(() => softSprite(), []);
  const mat = useRef<THREE.PointsMaterial>(null);

  useEffect(() => () => tex.dispose(), [tex]);

  useFrame((_, dt) => {
    const reduced = useUI.getState().reducedMotion;
    if (mat.current) {
      mat.current.opacity = 0.3 * live.mist;
      mat.current.color.copy(live.fog).lerp(live.horizon, 0.5).multiplyScalar(1.15);
    }
    if (reduced || !ref.current) return;
    const p = geo.attributes.position as THREE.BufferAttribute;
    const a = p.array as Float32Array;
    const time = live.time;
    for (let i = 0; i < count; i++) {
      a[i * 3] += speeds[i] * dt * 0.65;
      if (a[i * 3] > 125) a[i * 3] = -125;
      a[i * 3 + 1] = baseY[i] + Math.sin(time * 0.12 + phases[i]) * 0.24;
      a[i * 3 + 2] = baseZ[i] + Math.cos(time * 0.08 + phases[i]) * 0.55;
    }
    p.needsUpdate = true;
  });

  return (
    <points ref={ref} geometry={geo} frustumCulled={false}>
      <pointsMaterial
        ref={mat}
        map={tex}
        size={tier === "high" ? 26 : 22}
        sizeAttenuation
        transparent
        depthWrite={false}
        opacity={0.3}
      />
    </points>
  );
}

const glowVert = /* glsl */ `
attribute float aPhase; attribute float aSize;
uniform float uTime; uniform float uPx; uniform float uWander;
varying float vTw;
void main(){
  vec3 p = position;
  p.x += sin(uTime*0.4 + aPhase*6.2831)*uWander;
  p.y += sin(uTime*0.6 + aPhase*11.0)*uWander*0.6;
  p.z += cos(uTime*0.35 + aPhase*8.0)*uWander;
  vec4 mv = modelViewMatrix * vec4(p,1.0);
  gl_Position = projectionMatrix * mv;
  gl_PointSize = aSize * uPx / max(1.0,-mv.z);
  vTw = 0.55 + 0.45*sin(uTime*(1.5+aPhase*2.0) + aPhase*40.0);
}`;
const glowFrag = /* glsl */ `
uniform vec3 uColor; uniform float uIntensity;
varying float vTw;
void main(){
  vec2 c = gl_PointCoord - 0.5;
  float d = length(c);
  float a = smoothstep(0.5,0.0,d);
  a = pow(a,1.8) * vTw * uIntensity;
  if(a < 0.01) discard;
  gl_FragColor = vec4(uColor * (1.0 + a), a);
  #include <colorspace_fragment>
}`;

type GlowProps = {
  points: Float32Array; // x,y,z triplets
  color: string;
  size: number;
  wander?: number;
  seed?: number;
  intensity: () => number;
};

function GlowPoints({ points, color, size, wander = 1, seed = 1, intensity }: GlowProps) {
  const { geo, mat } = useMemo(() => {
    const n = points.length / 3;
    const rnd = mulberry32(seed);
    const phase = new Float32Array(n);
    const sz = new Float32Array(n);
    for (let i = 0; i < n; i++) {
      phase[i] = rnd();
      sz[i] = size * (0.6 + rnd() * 0.8);
    }
    const geo = new THREE.BufferGeometry();
    geo.setAttribute("position", new THREE.BufferAttribute(points, 3));
    geo.setAttribute("aPhase", new THREE.BufferAttribute(phase, 1));
    geo.setAttribute("aSize", new THREE.BufferAttribute(sz, 1));
    const mat = new THREE.ShaderMaterial({
      vertexShader: glowVert,
      fragmentShader: glowFrag,
      transparent: true,
      depthWrite: false,
      blending: THREE.AdditiveBlending,
      uniforms: {
        uTime: { value: 0 },
        uPx: { value: 300 },
        uWander: { value: wander },
        uColor: { value: new THREE.Color(color) },
        uIntensity: { value: 0 },
      },
    });
    return { geo, mat };
  }, [points, color, size, wander, seed]);

  useFrame((state) => {
    const gl = state.gl;
    const h = gl.domElement.height;
    mat.uniforms.uPx.value = h * 0.9;
    mat.uniforms.uTime.value = live.time;
    mat.uniforms.uIntensity.value = intensity();
  });
  return <points geometry={geo} material={mat} frustumCulled={false} />;
}

/** Fireflies and pollen drifting through the forest; stronger at dusk. */
export function Fireflies() {
  const tier = useTier();
  const n = tier === "high" ? 420 : tier === "mid" ? 260 : 120;
  const points = useMemo(() => {
    const rnd = mulberry32(5);
    const a = new Float32Array(n * 3);
    for (let i = 0; i < n; i++) {
      const ang = rnd() * Math.PI * 2;
      const r = 4 + Math.pow(rnd(), 0.7) * 70;
      const x = Math.cos(ang) * r - 8;
      const z = Math.sin(ang) * r + 10;
      a[i * 3] = x;
      a[i * 3 + 1] = heightAt(x, z) + 1 + rnd() * 5;
      a[i * 3 + 2] = z;
    }
    return a;
  }, [n]);
  return (
    <GlowPoints
      points={points}
      color="#ffd98a"
      size={0.55}
      wander={1.4}
      seed={11}
      intensity={() => 0.5 + live.night * 0.9}
    />
  );
}

/** Festival lanterns strung over Sirsi town, brightest at night. */
export function Lanterns() {
  const points = useMemo(() => {
    const rnd = mulberry32(21);
    const out: number[] = [];
    // three arcs of strung lights radiating from the temple square
    for (let s = 0; s < 6; s++) {
      const ang = (s / 6) * Math.PI * 2 + 0.4;
      for (let k = 0; k < 18; k++) {
        const r = 4 + k * 0.75;
        const x = Math.cos(ang) * r;
        const z = Math.sin(ang) * r;
        const sag = Math.sin((k / 17) * Math.PI) * 0.6;
        out.push(x, heightAt(x, z) + 3.6 - sag + (rnd() - 0.5) * 0.1, z);
      }
    }
    return new Float32Array(out);
  }, []);
  return (
    <GlowPoints
      points={points}
      color="#ff9d4a"
      size={1.5}
      wander={0.06}
      seed={3}
      intensity={() => 0.15 + live.night * 1.5 + smoothstep(0.45, 0.6, scrollState.smooth) * 0.0}
    />
  );
}

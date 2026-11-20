"use client";

import { Canvas, useFrame } from "@react-three/fiber";
import { Bloom, EffectComposer, GodRays, N8AO, ToneMapping, Vignette } from "@react-three/postprocessing";
import { ToneMappingMode } from "postprocessing";
import { Suspense, useEffect, useRef, useState } from "react";
import * as THREE from "three";
import { useUI } from "@/lib/store";
import { Fireflies, Lanterns, Lights, live, MoodDriver, Mist, Sky } from "./Atmosphere";
import { CameraRig } from "./CameraRig";
import { Landmarks } from "./Landmarks";
import { Rivers } from "./Rivers";
import { Terrain } from "./Terrain";
import { useTier, type Tier } from "./tier";
import { Vegetation } from "./Vegetation";

const rayTint = new THREE.Color("#fff3dd");

function ReadySignal() {
  const set = useUI((s) => s.setSceneReady);
  useEffect(() => {
    // give shaders one frame to compile before revealing
    let secondFrame = 0;
    const firstFrame = requestAnimationFrame(() => {
      secondFrame = requestAnimationFrame(() => set(true));
    });
    return () => {
      cancelAnimationFrame(firstFrame);
      cancelAnimationFrame(secondFrame);
    };
  }, [set]);
  return null;
}

function SceneFallback() {
  const setSceneReady = useUI((s) => s.setSceneReady);
  useEffect(() => setSceneReady(true), [setSceneReady]);
  return <div className="scene-fallback" />;
}

function Scene({ post, tier }: { post: boolean; tier: Tier }) {
  const [sun, setSun] = useState<THREE.Mesh | null>(null);
  const sunMaterial = useRef<THREE.MeshBasicMaterial>(null);
  useFrame((state) => {
    if (sun) sun.position.copy(state.camera.position).addScaledVector(live.sunDir, 360);
    if (sunMaterial.current) {
      sunMaterial.current.color.copy(live.sun).lerp(rayTint, 0.65);
      sunMaterial.current.opacity = 0.2 * (1 - live.night);
    }
  });

  return (
    <>
      <fogExp2 attach="fog" args={["#a8c0b4", 0.0085]} />
      <MoodDriver />
      <Sky />
      {tier === "high" && (
        <mesh ref={setSun} frustumCulled={false}>
          <sphereGeometry args={[1.1, 16, 16]} />
          <meshBasicMaterial
            ref={sunMaterial}
            color="#fff3dd"
            toneMapped={false}
            transparent
            depthWrite={false}
          />
        </mesh>
      )}
      <Lights />
      <CameraRig />
      <Terrain />
      <Rivers />
      <Vegetation />
      <Landmarks />
      <Mist />
      <Fireflies />
      <Lanterns />
      {post && (
        <EffectComposer multisampling={0} enableNormalPass={false}>
          {tier === "high" && sun && (
            <GodRays
              sun={sun}
              samples={40}
              density={0.45}
              decay={0.96}
              weight={0.08}
              exposure={0.12}
              clampMax={0.35}
              blur
              resolutionScale={0.5}
            />
          )}
          <N8AO
            aoRadius={1.4}
            intensity={0.9}
            quality={tier === "high" ? "medium" : "performance"}
            halfRes={tier !== "high"}
          />
          <Bloom mipmapBlur intensity={0.22} luminanceThreshold={0.92} luminanceSmoothing={0.2} />
          <Vignette offset={0.3} darkness={0.36} />
          <ToneMapping mode={ToneMappingMode.ACES_FILMIC} />
        </EffectComposer>
      )}
      <ReadySignal />
    </>
  );
}

function DprGovernor({ tier }: { tier: Tier }) {
  const slowTime = useRef(0);
  const steadyTime = useRef(0);
  const maxDpr = tier === "high" ? 1.75 : tier === "mid" ? 1.4 : 1.15;

  useFrame((state, dt) => {
    const currentDpr = state.viewport.dpr;
    const elapsed = Math.min(dt, 0.1);
    if (dt > 0.034) {
      slowTime.current += elapsed;
      steadyTime.current = 0;
      if (slowTime.current >= 1.5) {
        if (currentDpr > 1) state.setDpr(Math.max(1, Number((currentDpr - 0.1).toFixed(2))));
        slowTime.current = 0;
      }
      return;
    }

    slowTime.current = 0;
    steadyTime.current += elapsed;
    if (steadyTime.current >= 8) {
      if (currentDpr < maxDpr) state.setDpr(Math.min(maxDpr, Number((currentDpr + 0.05).toFixed(2))));
      steadyTime.current = 0;
    }
  });
  return null;
}

export default function SceneCanvas() {
  const tier = useTier();
  const post = tier !== "low";
  const maxDpr = tier === "high" ? 1.75 : tier === "mid" ? 1.4 : 1.15;
  return (
    <Canvas
      className="scene-canvas"
      fallback={<SceneFallback />}
      shadows={tier === "low" ? false : tier === "high" ? "variance" : "percentage"}
      dpr={[1, maxDpr]}
      camera={{ fov: 48, near: 0.3, far: 1400, position: [-118, 52, 108] }}
      gl={{
        antialias: !post,
        powerPreference: "high-performance",
        toneMapping: post ? THREE.NoToneMapping : THREE.ACESFilmicToneMapping,
        toneMappingExposure: 1.0,
      }}
      aria-hidden="true"
    >
      <Suspense fallback={null}>
        <Scene post={post} tier={tier} />
        <DprGovernor tier={tier} />
      </Suspense>
    </Canvas>
  );
}

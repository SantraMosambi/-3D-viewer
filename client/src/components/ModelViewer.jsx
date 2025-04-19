"use client";
import { useEffect, useState } from "react";
import { Canvas, useLoader } from "@react-three/fiber";
import { OrbitControls, Stage } from "@react-three/drei";
import { STLLoader } from "three-stdlib";
import { Suspense } from "react";

function STLModel({ url }) {
  const geometry = useLoader(STLLoader, url);

  return (
    <mesh geometry={geometry} scale={0.5}>
      <meshStandardMaterial color={"#2194ce"} />
    </mesh>
  );
}

export default function ModelViewer({ url }) {
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  if (!isClient) return null; // Prevent SSR mismatch

  return (
    <Canvas camera={{ position: [0, 0, 100], fov: 45 }}>
      <ambientLight intensity={0.5} />
      <Suspense fallback={null}>
        <Stage>
          <STLModel url={url} />
        </Stage>
        <OrbitControls />
      </Suspense>
    </Canvas>
  );
}

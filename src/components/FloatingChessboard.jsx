import React, { useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Float, OrbitControls } from "@react-three/drei";
import * as THREE from "three";

function Chessboard() {
  const boardRef = useRef();
  useFrame(() => {
    if (boardRef.current) {
      boardRef.current.rotation.y += 0.002;
    }
  });

  const tiles = [];
  const boardSize = 8;
  const tileSize = 1;
  const boardTotalSize = boardSize * tileSize;

  // Generate tiles
  for (let x = 0; x < boardSize; x++) {
    for (let z = 0; z < boardSize; z++) {
      const isWhite = (x + z) % 2 === 0;
      tiles.push(
        <mesh
          key={`${x}-${z}`}
          position={[
            x - boardSize / 2 + 0.5,
            0.16, // slightly raised from base
            z - boardSize / 2 + 0.5,
          ]}
          castShadow
          receiveShadow
        >
          <boxGeometry args={[tileSize, 0.1, tileSize]} />
          <meshStandardMaterial
            color={isWhite ? "#AF3E3E" : "#FFDCDC"}
            metalness={0.2}
            roughness={0.7}
          />
        </mesh>
      );
    }
  }

  return (
    <group ref={boardRef}>
      {/* Wooden base */}
      <mesh position={[0, 0, 0]} receiveShadow castShadow>
        <boxGeometry args={[boardTotalSize + 1, 0.3, boardTotalSize + 1]} />
        <meshStandardMaterial color="#8B4513" roughness={0.9} />
      </mesh>

      {/* All tiles */}
      {tiles}
    </group>
  );
}

export default function FloatingChessboard() {
  return (
    <div style={{  width: "100%", height: "100px" }}>
      <Canvas camera={{ position: [-10, 8, -8], fov: 45 }} shadows>
        <ambientLight intensity={0.5} />
        <directionalLight
          position={[10, 30, -15]}
          intensity={1}
          
        />
        <Float floatIntensity={0.1} speed={10}>
          <Chessboard />
        </Float>
        <OrbitControls enableZoom={false} />
      </Canvas>
    </div>
  );
}

import React, { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

export const KatanaModel = ({ isIntro, introProgress }) => {
  const groupRef = useRef();
  const bladeRef = useRef();

  useFrame((state, delta) => {
    if (groupRef.current) {
      if (isIntro) {
        // Intro camera movement / blade rotation along length
        groupRef.current.rotation.y = introProgress * Math.PI * 2;
        groupRef.current.rotation.z = Math.sin(introProgress * Math.PI) * 0.2;
      } else {
        // Idle floating slow rotation
        groupRef.current.rotation.y += delta * 0.3;
        groupRef.current.position.y = Math.sin(state.clock.elapsedTime * 1.5) * 0.1;
      }
    }
  });

  return (
    <group ref={groupRef} position={[0, 0, 0]} rotation={[0.2, 0.4, -0.4]}>
      {/* 3D KATANA BLADE */}
      <mesh ref={bladeRef} position={[0, 2.5, 0]}>
        <boxGeometry args={[0.08, 4.8, 0.3]} />
        <meshStandardMaterial
          color="#E2E8F0"
          metalness={0.95}
          roughness={0.1}
          emissive="#FF2A55"
          emissiveIntensity={0.25}
        />
      </mesh>

      {/* KATANA HAMON EDGE (Glowing Red Blade Line) */}
      <mesh position={[0.045, 2.5, 0]}>
        <boxGeometry args={[0.01, 4.75, 0.29]} />
        <meshBasicMaterial color="#FF2A55" />
      </mesh>

      {/* KATANA TSUBA (GUARD) */}
      <mesh position={[0, 0.05, 0]} rotation={[Math.PI / 2, 0, 0]}>
        <cylinderGeometry args={[0.4, 0.4, 0.06, 32]} />
        <meshStandardMaterial color="#1E1B2E" metalness={0.8} roughness={0.3} />
      </mesh>

      {/* KATANA TSUKA (HILT) */}
      <mesh position={[0, -0.8, 0]}>
        <cylinderGeometry args={[0.12, 0.14, 1.6, 16]} />
        <meshStandardMaterial color="#8B0000" roughness={0.7} />
      </mesh>

      {/* KATANA KASHIRA (POMMEL) */}
      <mesh position={[0, -1.65, 0]}>
        <sphereGeometry args={[0.15, 16, 16]} />
        <meshStandardMaterial color="#FFD700" metalness={0.9} roughness={0.2} />
      </mesh>
    </group>
  );
};

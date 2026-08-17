import React, { useRef, useState } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Float, Sparkles } from '@react-three/drei';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';
import { SectionBackground } from '../SectionBackground';
import { backgrounds } from '../../data/backgrounds';

// Central 3D Sculpture Component (Floating Katana Tsuba Guard & Orbital Ring Structure)
const Central3DSculpture = ({ hoveredIndex, pointerX, pointerY }) => {
  const outerRingRef = useRef();
  const innerRingRef = useRef();
  const bladeArcRef = useRef();

  useFrame((state, delta) => {
    const t = state.clock.getElapsedTime();

    if (outerRingRef.current) {
      outerRingRef.current.rotation.z += delta * 0.25;
      outerRingRef.current.rotation.y = Math.sin(t * 0.5) * 0.15;
    }

    if (innerRingRef.current) {
      innerRingRef.current.rotation.z -= delta * 0.35;
      innerRingRef.current.rotation.x = Math.cos(t * 0.7) * 0.2;
    }

    if (bladeArcRef.current) {
      bladeArcRef.current.rotation.z = Math.sin(t * 0.8) * 0.3 - 0.2;
      bladeArcRef.current.rotation.y += delta * 0.4;
    }

    // React to hovered track index
    if (hoveredIndex !== null && outerRingRef.current) {
      const targetZ = hoveredIndex * (Math.PI / 3);
      outerRingRef.current.rotation.z += (targetZ - outerRingRef.current.rotation.z) * 0.05;
    }
  });

  return (
    <group position={[1.5, 0, 0]} scale={[1.15, 1.15, 1.15]}>
      {/* Outer Orbital Sculptural Ring */}
      <group ref={outerRingRef}>
        <mesh>
          <torusGeometry args={[2.2, 0.04, 16, 100]} />
          <meshStandardMaterial
            color="#FFD700"
            metalness={0.95}
            roughness={0.2}
          />
        </mesh>
      </group>

      {/* Inner Katana Tsuba Guard Structure */}
      <group ref={innerRingRef}>
        <mesh>
          <torusGeometry args={[1.5, 0.07, 16, 80]} />
          <meshStandardMaterial
            color="#641F1A"
            metalness={0.8}
            roughness={0.3}
          />
        </mesh>

        <mesh position={[0, 0, 0]} rotation={[Math.PI / 2, 0, 0]}>
          <cylinderGeometry args={[0.4, 0.4, 0.05, 24]} />
          <meshStandardMaterial color="#271814" metalness={0.9} roughness={0.2} />
        </mesh>
      </group>

      {/* Metallic Katana Blade Arc */}
      <group ref={bladeArcRef}>
        <mesh position={[0, 0, 0.1]} rotation={[0, 0, Math.PI / 4]}>
          <boxGeometry args={[3.2, 0.06, 0.015]} />
          <meshStandardMaterial
            color="#ECECEC"
            metalness={0.96}
            roughness={0.15}
          />
        </mesh>
      </group>
    </group>
  );
};

// WebGL Scene Container
const Tracks3DScene = ({ hoveredIndex, mouseXVal, mouseYVal }) => {
  return (
    <Canvas
      camera={{ position: [0, 0, 5.8], fov: 45 }}
      className="absolute inset-0 w-full h-full pointer-events-none z-2"
      gl={{ antialias: true, alpha: true }}
    >
      <ambientLight intensity={0.95} />
      <directionalLight position={[4, 7, 5]} intensity={2.2} color="#FFF5E0" />
      <pointLight position={[-3, 2, 3]} intensity={1.5} color="#641F1A" />
      <pointLight position={[3, -2, 3]} intensity={1.8} color="#FFD700" />

      {/* Central 3D Sculpture */}
      <Float speed={1.2} rotationIntensity={0.15} floatIntensity={0.25}>
        <Central3DSculpture hoveredIndex={hoveredIndex} pointerX={mouseXVal} pointerY={mouseYVal} />
      </Float>

      {/* Sakura Sparkles */}
      <Sparkles count={30} scale={7} size={2.2} speed={0.4} color="#FFD700" opacity={0.65} />
      <Sparkles count={20} scale={9} size={1.8} speed={0.5} color="#641F1A" opacity={0.55} />
    </Canvas>
  );
};

// 6 Track Names Constellation Data
const trackItems = [
  { id: '01', title: 'Healthcare', depthZ: 25, position: 'top-12 left-4 sm:left-10' },
  { id: '02', title: 'Artificial Intelligence & Machine Learning', depthZ: 55, position: 'top-20 right-10 sm:right-32' },
  { id: '03', title: 'Web3 & Blockchain', depthZ: 30, position: 'top-[42%] left-2 sm:left-14' },
  { id: '04', title: 'Sustainability', depthZ: 65, position: 'top-[46%] right-8 sm:right-28' },
  { id: '05', title: 'Internet of Things (IoT)', depthZ: 40, position: 'bottom-12 left-6 sm:left-20' },
  { id: '06', title: 'Open Innovation', depthZ: 50, position: 'bottom-8 right-12 sm:right-36' },
];

export const Tracks3DHub = () => {
  const containerRef = useRef(null);
  const [hoveredIdx, setHoveredIdx] = useState(null);

  // Mouse Pointer Parallax
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const rotateX = useSpring(useTransform(mouseY, [-0.5, 0.5], [3, -3]), { stiffness: 150, damping: 20 });
  const rotateY = useSpring(useTransform(mouseX, [-0.5, 0.5], [-4, 4]), { stiffness: 150, damping: 20 });

  const handleMouseMove = (e) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    mouseX.set(x);
    mouseY.set(y);
  };

  return (
    <section
      id="tracks"
      ref={containerRef}
      onMouseMove={handleMouseMove}
      style={{ height: 'clamp(520px, 68vh, 650px)' }}
      className="relative my-4 px-4 sm:px-8 overflow-hidden select-none flex items-center justify-center"
    >
      {/* TRACKS BACKGROUND: 04_fantasy_waterfall_realm.png */}
      <SectionBackground
        src={backgrounds.tracks}
        alt="Fantasy Waterfall Realm Tracks Atmosphere"
        overlayOpacity={0.06}
      />

      {/* Local Cream Readability Vignette */}
      <div
        className="absolute inset-y-0 left-0 w-full sm:w-[60%] pointer-events-none z-1"
        style={{
          background: 'radial-gradient(ellipse at left center, rgba(255,248,230,0.94) 0%, rgba(255,248,230,0.65) 45%, rgba(255,248,230,0) 80%)',
        }}
      />

      {/* WebGL 3D Scene */}
      <Tracks3DScene hoveredIndex={hoveredIdx} mouseXVal={mouseX.get()} mouseYVal={mouseY.get()} />

      {/* 3D TRACK CONSTELLATION COMPOSITION CONTAINER */}
      <motion.div
        style={{ rotateX, rotateY, transformStyle: 'preserve-3d' }}
        className="relative z-10 max-w-7xl mx-auto w-full h-full"
      >
        {/* COMPACT MINIMAL SECTION TITLE: TRACKS */}
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4 }}
          className="absolute top-4 left-4 sm:left-10 z-30 flex items-center space-x-2"
        >
          <span className="font-display font-extrabold text-xl sm:text-2xl text-[#641F1A] tracking-wider uppercase">
            TRACKS
          </span>
          <div className="h-0.5 w-12 bg-[#641F1A]" />
        </motion.div>

        {/* 6 ASYMMETRIC FLOATING SPATIAL TRACK NAMES (NO CARDS, NO DESCRIPTIONS) */}
        <div className="absolute inset-0 z-20 pointer-events-none">
          {trackItems.map((track, idx) => {
            const isHovered = hoveredIdx === idx;
            const isOtherHovered = hoveredIdx !== null && !isHovered;

            return (
              <motion.div
                key={track.id}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: idx * 0.07 }}
                onMouseEnter={() => setHoveredIdx(idx)}
                onMouseLeave={() => setHoveredIdx(null)}
                style={{
                  transform: `translateZ(${isHovered ? track.depthZ + 35 : isOtherHovered ? track.depthZ - 15 : track.depthZ}px)`,
                }}
                className={`absolute ${track.position} pointer-events-auto cursor-pointer transition-all duration-300 group`}
              >
                <div className="flex items-baseline space-x-2">
                  <span className="font-mono text-xs sm:text-sm font-black text-[#641F1A] opacity-75">
                    {track.id}
                  </span>
                  <h3
                    className={`font-display font-extrabold text-xl sm:text-3xl tracking-tight transition-all duration-300 ${
                      isHovered
                        ? 'text-[#641F1A] scale-105'
                        : 'text-[#271814] group-hover:text-[#641F1A]'
                    }`}
                    style={{
                      textShadow: isHovered
                        ? '0 4px 14px rgba(255,255,255,0.95)'
                        : '0 2px 8px rgba(255,255,255,0.85)',
                    }}
                  >
                    {track.title}
                  </h3>
                </div>
              </motion.div>
            );
          })}
        </div>
      </motion.div>
    </section>
  );
};

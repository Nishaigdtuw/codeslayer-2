import React, { useRef, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Float, Sparkles, MeshReflectorMaterial } from '@react-three/drei';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';
import * as THREE from 'three';
import { SectionBackground } from './SectionBackground';
import { backgrounds } from '../data/backgrounds';

// 3D Suspended Katana Blade Component
const Suspended3DKatana = ({ pointerX, pointerY }) => {
  const bladeRef = useRef();

  useFrame((state, delta) => {
    if (bladeRef.current) {
      bladeRef.current.rotation.y += delta * 0.4;
      bladeRef.current.rotation.z = Math.sin(state.clock.getElapsedTime() * 0.8) * 0.05 - 0.2;
      bladeRef.current.position.y = Math.sin(state.clock.getElapsedTime() * 1.5) * 0.15;
      
      // Pointer interactive tilt
      bladeRef.current.rotation.x = pointerY * 0.2;
    }
  });

  return (
    <group ref={bladeRef} position={[0, 0.2, 0]} scale={[1.2, 1.2, 1.2]}>
      {/* Katana Blade Metallic Geometry */}
      <mesh position={[0, 0, 0]} rotation={[0, 0, Math.PI / 4]}>
        <boxGeometry args={[4.2, 0.08, 0.02]} />
        <meshStandardMaterial
          color="#E0E0E0"
          metalness={0.95}
          roughness={0.15}
          envMapIntensity={2.5}
        />
      </mesh>

      {/* Katana Edge Glow Highlight */}
      <mesh position={[0, 0.04, 0.001]} rotation={[0, 0, Math.PI / 4]}>
        <boxGeometry args={[4.22, 0.02, 0.025]} />
        <meshBasicMaterial color="#FFD700" />
      </mesh>

      {/* Tsuba (Handguard) */}
      <mesh position={[-1.2, 0, 0]} rotation={[0, Math.PI / 2, 0]}>
        <cylinderGeometry args={[0.25, 0.25, 0.04, 16]} />
        <meshStandardMaterial color="#B8860B" metalness={0.9} roughness={0.3} />
      </mesh>

      {/* Tsuka (Handle) */}
      <mesh position={[-1.8, 0, 0]} rotation={[0, 0, Math.PI / 4]}>
        <cylinderGeometry args={[0.09, 0.09, 1.1, 12]} />
        <meshStandardMaterial color="#8B0000" roughness={0.6} />
      </mesh>
    </group>
  );
};

// 3D Ceremonial Monolith / Scroll for Round 01
const Round01Monolith = () => {
  const meshRef = useRef();

  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.y = Math.sin(state.clock.getElapsedTime() * 0.6) * 0.08 - 0.2;
      meshRef.current.position.y = Math.sin(state.clock.getElapsedTime() * 1.2) * 0.1 - 0.2;
    }
  });

  return (
    <Float speed={1.5} rotationIntensity={0.2} floatIntensity={0.4}>
      <group ref={meshRef} position={[-3.2, 0.2, 0.5]} scale={[0.9, 0.9, 0.9]}>
        {/* Ancient Stone / Parchment Slab */}
        <mesh castShadow receiveShadow>
          <boxGeometry args={[2.2, 3.4, 0.15]} />
          <meshStandardMaterial
            color="#2A2421"
            roughness={0.7}
            metalness={0.2}
          />
        </mesh>

        {/* Embossed Crimson Border Accent */}
        <mesh position={[0, 0, 0.08]}>
          <boxGeometry args={[2.05, 3.25, 0.02]} />
          <meshStandardMaterial color="#8B0000" roughness={0.5} />
        </mesh>
      </group>
    </Float>
  );
};

// 3D Illuminated Shrine Gate Monument for Round 02
const Round02Monument = () => {
  const groupRef = useRef();

  useFrame((state) => {
    if (groupRef.current) {
      groupRef.current.rotation.y = Math.sin(state.clock.getElapsedTime() * 0.5) * 0.06 + 0.15;
    }
  });

  return (
    <Float speed={1.2} rotationIntensity={0.15} floatIntensity={0.3}>
      <group ref={groupRef} position={[3.2, -0.1, -0.5]} scale={[1.1, 1.1, 1.1]}>
        {/* Torii Gate Columns */}
        <mesh position={[-1.2, 0, 0]}>
          <cylinderGeometry args={[0.12, 0.15, 3.8, 16]} />
          <meshStandardMaterial color="#B22222" roughness={0.4} />
        </mesh>

        <mesh position={[1.2, 0, 0]}>
          <cylinderGeometry args={[0.12, 0.15, 3.8, 16]} />
          <meshStandardMaterial color="#B22222" roughness={0.4} />
        </mesh>

        {/* Top Crossbar */}
        <mesh position={[0, 1.8, 0]}>
          <boxGeometry args={[3.2, 0.25, 0.25]} />
          <meshStandardMaterial color="#1A1A1A" roughness={0.3} />
        </mesh>

        {/* Gold Emblem Center */}
        <mesh position={[0, 1.3, 0.1]}>
          <cylinderGeometry args={[0.3, 0.3, 0.05, 24]} rotation={[Math.PI / 2, 0, 0]} />
          <meshStandardMaterial color="#FFD700" metalness={0.9} roughness={0.2} />
        </mesh>
      </group>
    </Float>
  );
};

// Main Scene WebGL Canvas Component
const SwordChamber3DScene = ({ mouseXVal, mouseYVal }) => {
  return (
    <Canvas
      camera={{ position: [0, 0, 6.5], fov: 45 }}
      className="absolute inset-0 w-full h-full pointer-events-none z-1"
      gl={{ antialias: true, alpha: true }}
    >
      <ambientLight intensity={0.7} />
      <directionalLight position={[5, 8, 5]} intensity={1.8} color="#FFF8E7" castShadow />
      <pointLight position={[-4, 2, 3]} intensity={1.2} color="#FF2A55" />
      <pointLight position={[4, -1, 2]} intensity={1.5} color="#FFD700" />

      {/* 3D Chamber Objects */}
      <Round01Monolith />
      <Suspended3DKatana pointerX={mouseXVal} pointerY={mouseYVal} />
      <Round02Monument />

      {/* Gold & Crimson Floating Particles */}
      <Sparkles count={45} scale={8} size={2.5} speed={0.4} color="#FFD700" opacity={0.7} />
      <Sparkles count={30} scale={10} size={2} speed={0.6} color="#FF2A55" opacity={0.6} />

      {/* Reflective Ground Floor */}
      <mesh position={[0, -2.5, 0]} rotation={[-Math.PI / 2, 0, 0]}>
        <planeGeometry args={[20, 20]} />
        <MeshReflectorMaterial
          blur={[300, 100]}
          resolution={512}
          mirror={0.4}
          mixBlur={0.8}
          mixStrength={1.5}
          roughness={0.6}
          depthScale={1.2}
          minDepthThreshold={0.4}
          maxDepthThreshold={1.4}
          color="#151012"
          metalness={0.5}
        />
      </mesh>
    </Canvas>
  );
};

export const SelectionTrial3D = () => {
  const containerRef = useRef(null);

  // Mouse Parallax Values for 2.5D Depth
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const rotateX = useSpring(useTransform(mouseY, [-0.5, 0.5], [5, -5]), { stiffness: 150, damping: 20 });
  const rotateY = useSpring(useTransform(mouseX, [-0.5, 0.5], [-6, 6]), { stiffness: 150, damping: 20 });

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
      id="ppt-round"
      ref={containerRef}
      onMouseMove={handleMouseMove}
      className="relative min-h-[90vh] sm:min-h-screen py-12 sm:py-16 px-4 sm:px-8 overflow-hidden flex flex-col justify-center select-none"
    >
      {/* 1. BACKGROUND ARTWORK (Custom User Katana Torii Image) */}
      <SectionBackground
        src={backgrounds.trial}
        alt="Katana Torii Chamber Background"
        overlayOpacity={0.08}
      />

      {/* Atmospheric Vignette Overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/15 to-black/50 pointer-events-none z-0" />

      {/* 2. REAL 3D THREE.JS WEBGL CHAMBER SCENE */}
      <SwordChamber3DScene mouseXVal={mouseX.get()} mouseYVal={mouseY.get()} />

      {/* 3. ENGRAVED EDITORIAL TYPOGRAPHY COMPOSITION (NO UI CARDS) */}
      <motion.div
        style={{ rotateX, rotateY, transformStyle: 'preserve-3d' }}
        className="relative z-10 max-w-7xl mx-auto w-full my-auto"
      >
        {/* TOP EDITORIAL SECTION HEADER */}
        <motion.div
          initial={{ opacity: 0, y: -15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-left mb-6"
        >
          <div className="katana-divider mb-4" />
          <span className="font-mono text-xs uppercase tracking-[0.3em] text-pink-300 font-bold px-3.5 py-1 bg-black/40 border border-pink-400/40 rounded-full backdrop-blur-sm shadow-md">
            SWORD SEAL CHAMBER • RITUAL OF SELECTION & FINALE
          </span>
        </motion.div>

        {/* SPATIAL 3D ENGRAVED LAYOUT (ROUND 01 LEFT, KATANA CENTER, ROUND 02 RIGHT) */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-center min-h-[500px]">
          
          {/* ==================================================
              ROUND 01 — FLOATING MONOLITH / SEAL (LEFT)
          ================================================== */}
          <motion.div
            initial={{ opacity: 0, x: -40, scale: 0.95 }}
            whileInView={{ opacity: 1, x: 0, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="md:col-span-5 text-left relative py-4"
          >
            {/* ENGRAVED WATERMARK: 01 */}
            <span className="absolute -top-16 -left-8 font-display font-black text-[10rem] sm:text-[15rem] text-pink-400/15 pointer-events-none select-none z-0">
              01
            </span>

            <div className="relative z-10 space-y-4">
              <div className="flex items-center space-x-2 font-mono text-xs text-pink-300 font-bold tracking-widest uppercase">
                <span className="w-2.5 h-2.5 rounded-full bg-crimson-bright animate-ping" />
                <span>ROUND 01 • SACRED SEAL</span>
              </div>

              <h3 className="font-display font-black text-4xl sm:text-7xl text-white tracking-tight leading-none drop-shadow-[0_8px_24px_rgba(0,0,0,1)]">
                PPT <br />
                <span className="text-pink-400 text-glow-white">SUBMISSION</span>
              </h3>

              <div className="pt-6 border-t border-pink-500/30 flex items-center space-x-5">
                <div className="font-display font-black text-6xl sm:text-8xl text-yellow-300 tracking-tighter drop-shadow-[0_4px_16px_rgba(0,0,0,1)]">
                  10
                </div>

                <div className="flex flex-col font-mono text-xs sm:text-sm font-black tracking-widest uppercase leading-none text-left">
                  <span className="text-pink-300 font-bold">DEADLINE</span>
                  <span className="text-white text-base sm:text-xl font-extrabold mt-1.5">OCTOBER 2026</span>
                </div>
              </div>
            </div>
          </motion.div>

          {/* SPATIAL CENTER SPACE FOR SUSPENDED KATANA BLADE */}
          <div className="hidden md:block md:col-span-2 text-center relative pointer-events-none">
            <div className="w-px h-32 bg-gradient-to-b from-transparent via-yellow-400/50 to-transparent mx-auto" />
          </div>

          {/* ==================================================
              ROUND 02 — ILLUMINATED MONUMENT / SHRINE (RIGHT)
          ================================================== */}
          <motion.div
            initial={{ opacity: 0, x: 40, scale: 0.95 }}
            whileInView={{ opacity: 1, x: 0, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="md:col-span-5 text-left relative py-4 md:mt-12"
          >
            {/* ENGRAVED WATERMARK: 02 */}
            <span className="absolute -top-16 -left-8 font-display font-black text-[10rem] sm:text-[15rem] text-yellow-400/15 pointer-events-none select-none z-0">
              02
            </span>

            <div className="relative z-10 space-y-4">
              <div className="flex items-center space-x-2 font-mono text-xs text-yellow-300 font-bold tracking-widest uppercase">
                <span className="w-2.5 h-2.5 rounded-full bg-yellow-400 shadow-[0_0_10px_#FFD700]" />
                <span>ROUND 02 • THE ARRIVAL</span>
              </div>

              <h3 className="font-display font-black text-4xl sm:text-7xl text-white tracking-tight leading-none drop-shadow-[0_8px_24px_rgba(0,0,0,1)]">
                GRAND <br />
                <span className="text-yellow-400 text-glow-white">FINALE</span>
              </h3>

              <div className="space-y-4 pt-6 border-t border-yellow-500/40">
                <div className="flex items-center space-x-4">
                  <div className="font-display font-black text-5xl sm:text-7xl text-yellow-300 tracking-tighter drop-shadow-[0_4px_16px_rgba(0,0,0,1)] flex items-center">
                    <span>24</span>
                    <span className="text-crimson-bright mx-1.5 sm:mx-2 font-mono text-3xl sm:text-5xl">—</span>
                    <span>25</span>
                  </div>

                  <div className="flex flex-col font-mono text-xs sm:text-sm font-black tracking-widest uppercase leading-none text-left">
                    <span className="text-yellow-400 font-bold">OCTOBER</span>
                    <span className="text-gray-200 mt-1.5">2026</span>
                  </div>
                </div>

                <div className="flex flex-wrap items-center gap-3 text-xs font-mono font-bold text-gray-100 pt-1">
                  <div className="flex items-center space-x-1.5 px-3.5 py-1 bg-yellow-500/20 border border-yellow-400/50 rounded text-yellow-300 shadow-md">
                    <span>📍 NIT DELHI</span>
                  </div>

                  <div className="flex items-center space-x-1.5 px-3.5 py-1 bg-crimson-600/30 border border-crimson-bright/50 rounded text-crimson-bright shadow-md">
                    <span>⚡ 36 HOURS</span>
                  </div>
                </div>
              </div>

            </div>
          </motion.div>

        </div>

      </motion.div>
    </section>
  );
};

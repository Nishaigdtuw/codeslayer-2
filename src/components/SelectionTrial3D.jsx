import React, { useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Float, Sparkles } from '@react-three/drei';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';
import { SectionBackground } from './SectionBackground';
import { backgrounds } from '../data/backgrounds';

// 3D Floating Katana for Camera Pass-By Effect
const CameraPassBy3DKatana = ({ pointerX, pointerY }) => {
  const katanaGroupRef = useRef();

  useFrame((state, delta) => {
    if (katanaGroupRef.current) {
      // Gentle floating rotation
      katanaGroupRef.current.rotation.z = Math.sin(state.clock.getElapsedTime() * 0.7) * 0.12 - 0.35;
      katanaGroupRef.current.rotation.y += delta * 0.3;
      katanaGroupRef.current.position.y = Math.sin(state.clock.getElapsedTime() * 1.2) * 0.18;
      
      // Mouse tilt interactivity
      katanaGroupRef.current.rotation.x = pointerY * 0.25;
    }
  });

  return (
    <group ref={katanaGroupRef} position={[0, 0, 1.2]} scale={[1.15, 1.15, 1.15]}>
      {/* 3D Katana Blade Metallic Geometry */}
      <mesh position={[0, 0, 0]} rotation={[0, 0, Math.PI / 4]}>
        <boxGeometry args={[4.4, 0.09, 0.02]} />
        <meshStandardMaterial
          color="#E8E8E8"
          metalness={0.95}
          roughness={0.15}
          envMapIntensity={2.5}
        />
      </mesh>

      {/* Gold Edge Highlight */}
      <mesh position={[0, 0.045, 0.001]} rotation={[0, 0, Math.PI / 4]}>
        <boxGeometry args={[4.42, 0.025, 0.025]} />
        <meshBasicMaterial color="#FFD700" />
      </mesh>

      {/* Tsuba (Handguard) */}
      <mesh position={[-1.25, 0, 0]} rotation={[0, Math.PI / 2, 0]}>
        <cylinderGeometry args={[0.26, 0.26, 0.04, 16]} />
        <meshStandardMaterial color="#8F2F26" metalness={0.8} roughness={0.3} />
      </mesh>

      {/* Tsuka (Handle) */}
      <mesh position={[-1.85, 0, 0]} rotation={[0, 0, Math.PI / 4]}>
        <cylinderGeometry args={[0.095, 0.095, 1.15, 12]} />
        <meshStandardMaterial color="#641F1A" roughness={0.6} />
      </mesh>
    </group>
  );
};

// Spiraling Vertical Sakura Vortex Particles
const VerticalSakuraVortex = () => {
  const petals = Array.from({ length: 22 }, (_, i) => ({
    id: i,
    left: `${15 + Math.random() * 70}%`,
    delay: Math.random() * 5,
    duration: 6 + Math.random() * 6,
    scale: 0.5 + Math.random() * 0.7,
  }));

  return (
    <div className="absolute inset-0 pointer-events-none z-20 overflow-hidden">
      {petals.map((p) => (
        <motion.div
          key={p.id}
          initial={{ y: '-10%', x: 0, rotate: 0, opacity: 0 }}
          animate={{
            y: '120vh',
            x: [0, 45, -30, 40],
            rotate: [0, 240, 480],
            opacity: [0, 0.9, 0.9, 0],
          }}
          transition={{
            duration: p.duration,
            repeat: Infinity,
            delay: p.delay,
            ease: 'linear',
          }}
          style={{ left: p.left, scale: p.scale }}
          className="absolute w-4 h-5 bg-gradient-to-br from-rose-300 via-pink-400 to-rose-600 rounded-full opacity-80 filter blur-[0.3px] shadow-[0_0_10px_rgba(225,29,72,0.6)]"
        />
      ))}
    </div>
  );
};

// WebGL Scene Container
const Vertical3DScene = ({ mouseXVal, mouseYVal }) => {
  return (
    <Canvas
      camera={{ position: [0, 0, 6.2], fov: 45 }}
      className="absolute inset-0 w-full h-full pointer-events-none z-2"
      gl={{ antialias: true, alpha: true }}
    >
      <ambientLight intensity={0.9} />
      <directionalLight position={[4, 7, 5]} intensity={2.0} color="#FFF5E0" />
      <pointLight position={[-3, 2, 3]} intensity={1.5} color="#8F2F26" />
      <pointLight position={[3, -2, 3]} intensity={1.8} color="#FFD700" />

      {/* Floating Katana Pass-By Object */}
      <Float speed={1.4} rotationIntensity={0.2} floatIntensity={0.3}>
        <CameraPassBy3DKatana pointerX={mouseXVal} pointerY={mouseYVal} />
      </Float>

      {/* Sparkles */}
      <Sparkles count={40} scale={9} size={2.5} speed={0.4} color="#FFD700" opacity={0.65} />
      <Sparkles count={30} scale={11} size={2.0} speed={0.5} color="#641F1A" opacity={0.55} />
    </Canvas>
  );
};

export const SelectionTrial3D = () => {
  const containerRef = useRef(null);

  // Mouse Pointer Parallax
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const rotateX = useSpring(useTransform(mouseY, [-0.5, 0.5], [4, -4]), { stiffness: 150, damping: 20 });
  const rotateY = useSpring(useTransform(mouseX, [-0.5, 0.5], [-5, 5]), { stiffness: 150, damping: 20 });

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
      className="relative min-h-[115vh] sm:min-h-[125vh] py-16 sm:py-20 px-4 sm:px-8 overflow-hidden flex flex-col justify-between select-none"
    >
      {/* 1. APPROVED BACKGROUND ARTWORK (Custom User Katana Torii Image) */}
      <SectionBackground
        src={backgrounds.trial}
        alt="Katana Torii Custom Environment"
        overlayOpacity={0.06}
      />

      {/* Soft Local Readability Vignettes (Deep Charcoal/Burgundy Contrast) */}
      <div className="absolute inset-0 bg-gradient-to-b from-amber-50/20 via-transparent to-amber-900/30 pointer-events-none z-0" />

      {/* Vertical Sakura Vortex */}
      <VerticalSakuraVortex />

      {/* 2. WebGL 3D Katana Pass-By Scene */}
      <Vertical3DScene mouseXVal={mouseX.get()} mouseYVal={mouseY.get()} />

      {/* 3. VERTICAL 3D EDITORIAL POSTER LAYOUT (NO CARDS, NO BOXES) */}
      <motion.div
        style={{ rotateX, rotateY, transformStyle: 'preserve-3d' }}
        className="relative z-10 max-w-5xl mx-auto w-full my-auto flex flex-col justify-between space-y-16 sm:space-y-24"
      >
        
        {/* ==================================================
            MOMENT 1: ROUND 01 — TOP EDITORIAL COMPOSITION (TOP 40%)
        ================================================== */}
        <motion.div
          initial={{ opacity: 0, y: -30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="relative text-left max-w-2xl"
        >
          {/* DIMENSIONAL CARVED 3D NUMERAL: 01 */}
          <span className="absolute -top-16 -left-6 font-display font-black text-[11rem] sm:text-[17rem] text-[#641F1A]/15 pointer-events-none select-none z-0 tracking-tighter">
            01
          </span>

          <div className="relative z-10 space-y-3">
            {/* EDITORIAL HEADER MARKER */}
            <div className="flex items-center space-x-2 font-mono text-xs text-[#8F2F26] font-bold tracking-widest uppercase">
              <span className="w-2.5 h-2.5 rounded-full bg-[#8F2F26] animate-pulse" />
              <span>ROUND 01 • STAGE ONE</span>
            </div>

            {/* MAIN TITLE — DEEP CHARCOAL & BURGUNDY HIGH READABILITY */}
            <h3 className="font-display font-black text-4xl sm:text-7xl text-[#2A1814] tracking-tight leading-none drop-shadow-[0_2px_12px_rgba(255,255,255,0.8)]">
              PPT <br />
              <span className="text-[#641F1A]">SUBMISSION</span>
            </h3>

            {/* DEADLINE COMPOSITION */}
            <div className="pt-4 border-t border-[#8F2F26]/30 flex items-center space-x-5">
              <div className="font-display font-black text-5xl sm:text-7xl text-[#8F2F26] tracking-tighter drop-shadow-[0_2px_8px_rgba(255,255,255,0.8)]">
                10
              </div>

              <div className="flex flex-col font-mono text-xs sm:text-sm font-black tracking-widest uppercase leading-none text-left">
                <span className="text-[#8F2F26]">DEADLINE</span>
                <span className="text-[#2A1814] text-base sm:text-xl font-extrabold mt-1">OCTOBER 2026</span>
              </div>
            </div>
          </div>
        </motion.div>

        {/* ==================================================
            MOMENT 2: CENTER SPATIAL TRANSITION / KATANA VORTEX PASS
        ================================================== */}
        <div className="relative py-4 text-center pointer-events-none">
          <div className="w-px h-24 bg-gradient-to-b from-[#8F2F26]/40 via-[#FFD700] to-[#641F1A]/40 mx-auto" />
          <span className="font-mono text-[10px] uppercase tracking-[0.4em] text-[#641F1A] font-extrabold block mt-2">
            DESCENT TO FINALE
          </span>
        </div>

        {/* ==================================================
            MOMENT 3: ROUND 02 — LOWER FINALE ARRIVAL (LOWER 45%)
        ================================================== */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="relative text-right max-w-2xl ml-auto"
        >
          {/* DIMENSIONAL GOLD/BURGUNDY 3D NUMERAL: 02 */}
          <span className="absolute -top-16 -right-6 font-display font-black text-[11rem] sm:text-[17rem] text-[#8F2F26]/15 pointer-events-none select-none z-0 tracking-tighter">
            02
          </span>

          <div className="relative z-10 space-y-3">
            {/* EDITORIAL HEADER MARKER */}
            <div className="flex items-center justify-end space-x-2 font-mono text-xs text-[#8F2F26] font-bold tracking-widest uppercase">
              <span>ROUND 02 • THE DESTINATION</span>
              <span className="w-2.5 h-2.5 rounded-full bg-[#FFD700] shadow-[0_0_10px_#FFD700]" />
            </div>

            {/* MAIN TITLE — HERO GRAND FINALE */}
            <h3 className="font-display font-black text-4xl sm:text-7xl text-[#2A1814] tracking-tight leading-none drop-shadow-[0_2px_12px_rgba(255,255,255,0.8)]">
              GRAND <br />
              <span className="text-[#641F1A]">FINALE</span>
            </h3>

            {/* POSTER DATE COMPOSITION: 24 — 25 */}
            <div className="space-y-4 pt-4 border-t border-[#8F2F26]/30 flex flex-col items-end">
              <div className="flex items-center space-x-4">
                <div className="font-display font-black text-5xl sm:text-7xl text-[#8F2F26] tracking-tighter drop-shadow-[0_2px_8px_rgba(255,255,255,0.8)] flex items-center">
                  <span>24</span>
                  <span className="text-[#641F1A] mx-2 font-mono text-3xl sm:text-5xl">—</span>
                  <span>25</span>
                </div>

                <div className="flex flex-col font-mono text-xs sm:text-sm font-black tracking-widest uppercase leading-none text-right">
                  <span className="text-[#8F2F26]">OCTOBER</span>
                  <span className="text-[#2A1814] mt-1">2026</span>
                </div>
              </div>

              {/* DESTINATION LOCATION STAMP & DURATION */}
              <div className="flex flex-wrap items-center justify-end gap-3 text-xs font-mono font-bold pt-1">
                <div className="px-3.5 py-1 bg-[#641F1A]/10 border border-[#641F1A]/40 rounded text-[#641F1A] font-black shadow-sm">
                  <span>📍 NIT DELHI</span>
                </div>

                <div className="px-3.5 py-1 bg-[#8F2F26]/10 border border-[#8F2F26]/40 rounded text-[#8F2F26] font-black shadow-sm">
                  <span>⚡ 36 HOURS</span>
                </div>
              </div>
            </div>

          </div>
        </motion.div>

      </motion.div>
    </section>
  );
};

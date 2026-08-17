import React, { useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Float, Sparkles } from '@react-three/drei';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';
import { SectionBackground } from './SectionBackground';
import { backgrounds } from '../data/backgrounds';

// 3D Floating Katana for Center/Right Stage Overlap
const CameraPassBy3DKatana = ({ pointerX, pointerY }) => {
  const katanaGroupRef = useRef();

  useFrame((state, delta) => {
    if (katanaGroupRef.current) {
      katanaGroupRef.current.rotation.z = Math.sin(state.clock.getElapsedTime() * 0.8) * 0.1 - 0.35;
      katanaGroupRef.current.rotation.y += delta * 0.35;
      katanaGroupRef.current.position.y = Math.sin(state.clock.getElapsedTime() * 1.4) * 0.1;
      
      // Pointer interactive tilt
      katanaGroupRef.current.rotation.x = pointerY * 0.2;
    }
  });

  return (
    <group ref={katanaGroupRef} position={[1.2, 0, 1.1]} scale={[1.15, 1.15, 1.15]}>
      {/* 3D Katana Blade Metallic Geometry */}
      <mesh position={[0, 0, 0]} rotation={[0, 0, Math.PI / 4]}>
        <boxGeometry args={[4.2, 0.08, 0.02]} />
        <meshStandardMaterial
          color="#E8E8E8"
          metalness={0.95}
          roughness={0.15}
          envMapIntensity={2.5}
        />
      </mesh>

      {/* Gold Edge Highlight */}
      <mesh position={[0, 0.04, 0.001]} rotation={[0, 0, Math.PI / 4]}>
        <boxGeometry args={[4.22, 0.02, 0.025]} />
        <meshBasicMaterial color="#FFD700" />
      </mesh>

      {/* Tsuba (Handguard) */}
      <mesh position={[-1.2, 0, 0]} rotation={[0, Math.PI / 2, 0]}>
        <cylinderGeometry args={[0.25, 0.25, 0.04, 16]} />
        <meshStandardMaterial color="#8C2924" metalness={0.8} roughness={0.3} />
      </mesh>

      {/* Tsuka (Handle) */}
      <mesh position={[-1.8, 0, 0]} rotation={[0, 0, Math.PI / 4]}>
        <cylinderGeometry args={[0.09, 0.09, 1.1, 12]} />
        <meshStandardMaterial color="#541A18" roughness={0.6} />
      </mesh>
    </group>
  );
};

// Compact Sakura Vortex Particles
const CompactSakuraVortex = () => {
  const petals = Array.from({ length: 16 }, (_, i) => ({
    id: i,
    left: `${20 + Math.random() * 70}%`,
    delay: Math.random() * 3.5,
    duration: 4 + Math.random() * 4,
    scale: 0.5 + Math.random() * 0.5,
  }));

  return (
    <div className="absolute inset-0 pointer-events-none z-20 overflow-hidden">
      {petals.map((p) => (
        <motion.div
          key={p.id}
          initial={{ y: '-10%', x: 0, rotate: 0, opacity: 0 }}
          animate={{
            y: '650px',
            x: [0, 30, -20, 25],
            rotate: [0, 240, 480],
            opacity: [0, 0.85, 0.85, 0],
          }}
          transition={{
            duration: p.duration,
            repeat: Infinity,
            delay: p.delay,
            ease: 'linear',
          }}
          style={{ left: p.left, scale: p.scale }}
          className="absolute w-3.5 h-4.5 bg-gradient-to-br from-rose-300 via-pink-400 to-rose-600 rounded-full opacity-80 filter blur-[0.3px] shadow-[0_0_8px_rgba(225,29,72,0.6)]"
        />
      ))}
    </div>
  );
};

// WebGL Scene Container
const Vertical3DScene = ({ mouseXVal, mouseYVal }) => {
  return (
    <Canvas
      camera={{ position: [0, 0, 5.8], fov: 45 }}
      className="absolute inset-0 w-full h-full pointer-events-none z-2"
      gl={{ antialias: true, alpha: true }}
    >
      <ambientLight intensity={0.9} />
      <directionalLight position={[4, 7, 5]} intensity={2.0} color="#FFF5E0" />
      <pointLight position={[-3, 2, 3]} intensity={1.5} color="#8C2924" />
      <pointLight position={[3, -2, 3]} intensity={1.8} color="#FFD700" />

      {/* Floating Katana Pass-By Object */}
      <Float speed={1.4} rotationIntensity={0.2} floatIntensity={0.3}>
        <CameraPassBy3DKatana pointerX={mouseXVal} pointerY={mouseYVal} />
      </Float>

      {/* Sparkles */}
      <Sparkles count={30} scale={7} size={2.2} speed={0.4} color="#FFD700" opacity={0.65} />
      <Sparkles count={20} scale={9} size={1.8} speed={0.5} color="#541A18" opacity={0.55} />
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
      className="relative h-[580px] sm:h-[600px] my-4 px-4 sm:px-8 overflow-hidden flex items-center justify-center select-none"
    >
      {/* 1. APPROVED BACKGROUND ARTWORK (Custom User Katana Torii Image) */}
      <SectionBackground
        src={backgrounds.trial}
        alt="Katana Torii Custom Environment"
        overlayOpacity={0.05}
      />

      {/* LOCAL CREAM READABILITY FIELD (ONLY ON THE LEFT 50%, RIGHT ARTWORK REMAINS CLEAR) */}
      <div
        className="absolute inset-y-0 left-0 w-full sm:w-[55%] pointer-events-none z-1"
        style={{
          background: 'radial-gradient(ellipse at left center, rgba(255,248,230,0.92) 0%, rgba(255,248,230,0.60) 45%, rgba(255,248,230,0) 80%)',
        }}
      />

      {/* Compact Sakura Vortex */}
      <CompactSakuraVortex />

      {/* 2. WebGL 3D Katana Pass-By Scene */}
      <Vertical3DScene mouseXVal={mouseX.get()} mouseYVal={mouseY.get()} />

      {/* 3. CONCENTRATED LEFT-ALIGNED POSTER STAGE COMPOSITION (~600PX) */}
      <motion.div
        style={{ rotateX, rotateY, transformStyle: 'preserve-3d' }}
        className="relative z-10 max-w-7xl mx-auto w-full h-full"
      >
        
        {/* TOP CATEGORY MARKER (LEFT-ALIGNED) */}
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4 }}
          className="absolute top-4 left-2 sm:left-8 z-30"
        >
          <div className="katana-divider mb-1.5" />
          <span className="font-mono text-[10px] sm:text-xs uppercase tracking-[0.25em] text-[#541A18] font-black px-3 py-0.5 bg-amber-100/60 border border-[#8C2924]/40 rounded-full backdrop-blur-sm shadow-sm">
            SELECTION TRIAL & FINALE • 01 & 02
          </span>
        </motion.div>

        {/* ==================================================
            ROUND 01 — LEFT SIDE (LEFT ~7%, TOP 10–38%)
        ================================================== */}
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="absolute top-12 sm:top-14 left-2 sm:left-[7%] max-w-md sm:max-w-xl text-left z-30"
        >
          {/* DIMENSIONAL 3D WATERMARK 01 (BEHIND TEXT AT 20% OPACITY) */}
          <span className="absolute -top-8 -left-4 font-display font-black text-8xl sm:text-[11rem] text-[#541A18]/20 pointer-events-none select-none z-0 tracking-tighter">
            01
          </span>

          <div className="relative z-10 space-y-1">
            {/* EDITORIAL HEADER MARKER */}
            <div className="flex items-center space-x-2 font-mono text-[10px] sm:text-[11px] text-[#8C2924] font-black tracking-widest uppercase">
              <span className="w-2.5 h-2.5 rounded-full bg-[#8C2924] animate-pulse" />
              <span>ROUND 01</span>
            </div>

            {/* MAIN TITLE — DEEP BURGUNDY & CHARCOAL 100% OPAQUE */}
            <h3
              className="font-display font-extrabold text-3xl sm:text-5xl text-[#241713] tracking-tight leading-[0.95] opacity-100"
              style={{ textShadow: '0 2px 10px rgba(255,255,255,0.85)' }}
            >
              PPT <br />
              <span className="text-[#541A18]">SUBMISSION</span>
            </h3>

            {/* DEADLINE COMPOSITION */}
            <div className="pt-1.5 border-t border-[#8C2924]/40 flex items-center space-x-3">
              <div
                className="font-display font-black text-3xl sm:text-5xl text-[#8C2924] tracking-tighter opacity-100"
                style={{ textShadow: '0 2px 6px rgba(255,255,255,0.85)' }}
              >
                10
              </div>

              <div className="flex flex-col font-mono text-[10px] sm:text-[11px] font-black tracking-widest uppercase leading-none text-left">
                <span className="text-[#8C2924] opacity-100">DEADLINE</span>
                <span
                  className="text-[#241713] text-xs sm:text-base font-extrabold mt-0.5 opacity-100"
                  style={{ textShadow: '0 1px 4px rgba(255,255,255,0.85)' }}
                >
                  OCTOBER 2026
                </span>
              </div>
            </div>
          </div>
        </motion.div>

        {/* ==================================================
            ROUND 02 — INDENTED LEFT SIDE (LEFT ~18%, BOTTOM 58–94%)
        ================================================== */}
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.15 }}
          className="absolute bottom-6 sm:bottom-8 left-6 sm:left-[18%] max-w-md sm:max-w-xl text-left z-30"
        >
          {/* DIMENSIONAL 3D WATERMARK 02 (BEHIND TEXT AT 20% OPACITY) */}
          <span className="absolute -top-8 -left-4 font-display font-black text-8xl sm:text-[11rem] text-[#8C2924]/20 pointer-events-none select-none z-0 tracking-tighter">
            02
          </span>

          <div className="relative z-10 space-y-1">
            {/* EDITORIAL HEADER MARKER */}
            <div className="flex items-center space-x-2 font-mono text-[10px] sm:text-[11px] text-[#8C2924] font-black tracking-widest uppercase">
              <span className="w-2.5 h-2.5 rounded-full bg-[#FFD700] shadow-[0_0_8px_#FFD700]" />
              <span>ROUND 02 • DESTINATION</span>
            </div>

            {/* HERO MAIN TITLE — GRAND FINALE (DESKTOP 52-72PX, 100% OPAQUE) */}
            <h3
              className="font-display font-extrabold text-3xl sm:text-6xl text-[#241713] tracking-tight leading-[0.95] opacity-100"
              style={{ textShadow: '0 2px 10px rgba(255,255,255,0.85)' }}
            >
              GRAND <br />
              <span className="text-[#541A18]">FINALE</span>
            </h3>

            {/* POSTER DATE COMPOSITION & LOCATION STAMP */}
            <div className="space-y-1.5 pt-1.5 border-t border-[#8C2924]/40 flex flex-col items-start">
              <div className="flex items-center space-x-3">
                <div
                  className="font-display font-black text-3xl sm:text-5xl text-[#8C2924] tracking-tighter opacity-100 flex items-center"
                  style={{ textShadow: '0 2px 6px rgba(255,255,255,0.85)' }}
                >
                  <span>24</span>
                  <span className="text-[#541A18] mx-1 font-mono text-xl sm:text-3xl">—</span>
                  <span>25</span>
                </div>

                <div className="flex flex-col font-mono text-[10px] sm:text-[11px] font-black tracking-widest uppercase leading-none text-left">
                  <span className="text-[#8C2924] opacity-100">OCTOBER</span>
                  <span className="text-[#241713] mt-0.5 opacity-100">2026</span>
                </div>
              </div>

              {/* LOCATION STAMP & DURATION ON THE LEFT */}
              <div className="flex flex-wrap items-center gap-1.5 text-[10px] sm:text-[11px] font-mono font-black pt-0.5">
                <div className="px-2.5 py-0.5 bg-amber-100/70 border border-[#541A18]/50 rounded text-[#541A18] font-black shadow-sm">
                  <span>📍 NIT DELHI</span>
                </div>

                <div className="px-2.5 py-0.5 bg-rose-100/70 border border-[#8C2924]/50 rounded text-[#8C2924] font-black shadow-sm">
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

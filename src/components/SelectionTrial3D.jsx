import React, { useRef } from 'react';
import { Canvas } from '@react-three/fiber';
import { Sparkles } from '@react-three/drei';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';
import { SectionBackground } from './SectionBackground';
import { backgrounds } from '../data/backgrounds';

// Floating Sakura Trajectory Particles
const RightSakuraArc = () => {
  const petals = Array.from({ length: 20 }, (_, i) => ({
    id: i,
    left: `${45 + Math.random() * 50}%`,
    delay: Math.random() * 3.5,
    duration: 4.2 + Math.random() * 4,
    scale: 0.45 + Math.random() * 0.55,
  }));

  return (
    <div className="absolute inset-0 pointer-events-none z-20 overflow-hidden">
      {petals.map((p) => (
        <motion.div
          key={p.id}
          initial={{ y: '-10%', x: 0, rotate: 0, opacity: 0 }}
          animate={{
            y: '740px',
            x: [0, 35, -20, 30],
            rotate: [0, 260, 520],
            opacity: [0, 0.9, 0.9, 0],
          }}
          transition={{
            duration: p.duration,
            repeat: Infinity,
            delay: p.delay,
            ease: 'linear',
          }}
          style={{ left: p.left, scale: p.scale }}
          className="absolute w-3.5 h-4.5 bg-gradient-to-br from-rose-300 via-pink-400 to-rose-600 rounded-full opacity-85 filter blur-[0.2px] shadow-[0_0_8px_rgba(225,29,72,0.6)]"
        />
      ))}
    </div>
  );
};

// WebGL Scene Container (Sparkles & Atmosphere ONLY, NO 3D Sword Meshes)
const Vertical3DScene = () => {
  return (
    <Canvas
      camera={{ position: [0, 0, 5.8], fov: 45 }}
      className="absolute inset-0 w-full h-full pointer-events-none z-2"
      gl={{ antialias: true, alpha: true }}
    >
      <ambientLight intensity={0.95} />
      <directionalLight position={[4, 7, 5]} intensity={1.8} color="#FFF5E0" />
      <pointLight position={[-3, 2, 3]} intensity={1.2} color="#4D1917" />
      <pointLight position={[3, -2, 3]} intensity={1.5} color="#FFD700" />

      {/* Ambient Atmospheric Sparkles (Right Side Visual Atmosphere) */}
      <Sparkles count={32} scale={7} size={2.2} speed={0.4} color="#FFD700" opacity={0.7} />
      <Sparkles count={22} scale={9} size={1.8} speed={0.5} color="#4D1917" opacity={0.6} />
    </Canvas>
  );
};

export const SelectionTrial3D = () => {
  const containerRef = useRef(null);

  // Subtle Mouse Pointer Parallax for Content Stage
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const rotateX = useSpring(useTransform(mouseY, [-0.5, 0.5], [1.5, -1.5]), { stiffness: 150, damping: 20 });
  const rotateY = useSpring(useTransform(mouseX, [-0.5, 0.5], [-2, 2]), { stiffness: 150, damping: 20 });

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
      style={{ height: 'clamp(680px, 78vh, 760px)' }}
      className="relative my-4 overflow-hidden select-none flex items-center justify-center"
    >
      {/* Hide site-wide BattleMapNav when hovering/scrolling this section via CSS */}
      <style>{`
        #ppt-round:hover ~ aside,
        body:has(#ppt-round:hover) aside {
          opacity: 0.15;
          pointer-events: none;
        }
      `}</style>

      {/* 1. APPROVED BACKGROUND ARTWORK (Contains background Katana artwork) */}
      <SectionBackground
        src={backgrounds.trial}
        alt="Katana Torii Custom Environment"
        overlayOpacity={0.04}
      />

      {/* 2. LOCAL CREAM READABILITY FIELD (LEFT CONTENT ONLY, NO VISIBLE BOX EDGE) */}
      <div
        className="absolute inset-y-0 left-0 w-full md:w-[56%] pointer-events-none z-1"
        style={{
          background: 'linear-gradient(to right, rgba(255,248,230,0.96) 0%, rgba(255,248,230,0.75) 30%, rgba(255,248,230,0.18) 50%, transparent 64%)',
        }}
      />

      {/* 3. Sakura Trajectory Particles */}
      <RightSakuraArc />

      {/* 4. WebGL Atmosphere Scene */}
      <Vertical3DScene />

      {/* 5. MASTER GRID STAGE: LEFT 47% (TIMELINE + INFO) | RIGHT 53% (BACKGROUND ARTWORK) */}
      <motion.div
        style={{ rotateX, rotateY, transformStyle: 'preserve-3d' }}
        className="relative z-10 w-full h-full max-w-[1440px] mx-auto grid grid-cols-1 md:grid-cols-[47%_53%]"
      >
        
        {/* ==================================================
            LEFT 47% COLUMN: VERTICAL BLADE TIMELINE & INFORMATION
        ================================================== */}
        <div className="relative h-full flex flex-col justify-between py-10 sm:py-12 pl-[clamp(35px,6vw,100px)] pr-4 z-10">
          
          {/* METALLIC KATANA SPINE TIMELINE (RUNNING DOWN LEFT FROM ROUND 01 NODE TO ROUND 02 NODE) */}
          <div className="absolute top-12 bottom-12 left-[clamp(20px,3.5vw,55px)] w-[2.5px] pointer-events-none z-0">
            {/* Round 01 Sword-Guard Diamond Node (Top) */}
            <div className="absolute -top-3 -left-[5px] w-3.5 h-3.5 bg-[#4D1917] border-2 border-[#FFD700] transform rotate-45 shadow-[0_0_8px_#FFD700] z-10 flex items-center justify-center">
              <div className="w-1 h-1 bg-[#FFF5E0]" />
            </div>

            {/* Metallic Katana Edge Spine */}
            <div className="w-full h-full bg-gradient-to-b from-[#4D1917] via-[#FFD700] via-[#B87333] to-[#4D1917] rounded-full shadow-[0_0_6px_rgba(255,215,0,0.7)]" />
            
            {/* Warm Metallic Light Sweep Motion Traveling Down Timeline */}
            <motion.div
              initial={{ y: '0%' }}
              animate={{ y: ['0%', '100%', '0%'] }}
              transition={{ duration: 4.5, repeat: Infinity, ease: 'easeInOut' }}
              className="absolute top-0 left-0 w-full h-14 bg-gradient-to-b from-transparent via-[#FFF5E0] to-transparent shadow-[0_0_10px_#FFF5E0]"
            />

            {/* Round 02 Ceremonial Diamond Node (Bottom) */}
            <div className="absolute -bottom-3 -left-[6px] w-4 h-4 bg-[#2B1714] border-2 border-[#FFD700] transform rotate-45 shadow-[0_0_10px_#FFD700] z-10 flex items-center justify-center">
              <div className="w-1.5 h-1.5 bg-[#4D1917]" />
            </div>
          </div>

          {/* ==================================================
              ROUND 01 COMPOSITION (TOP 10% → 38%)
          ================================================== */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.15 }}
            className="relative text-left space-y-1.5 z-10 pt-2"
          >
            {/* CUSTOM ROUND 01 EDITORIAL INSIGNIA */}
            <div className="relative flex items-center space-x-3 mb-1">
              <div className="absolute -left-2 top-1/2 w-16 h-0.5 bg-gradient-to-r from-[#4D1917] to-transparent transform -rotate-12 pointer-events-none z-0" />
              
              <span className="font-display font-black text-5xl sm:text-6xl text-[#2B1714] drop-shadow-[0_2px_4px_rgba(255,255,255,0.9)] relative z-10">
                01
              </span>
              <div className="h-6 w-0.5 bg-[#4D1917]/70 z-10" />
              <div className="flex flex-col font-mono text-[10px] sm:text-[11px] font-black tracking-widest text-[#4D1917] leading-none uppercase z-10">
                <span>ROUND</span>
                <span>ONE</span>
              </div>
              <span className="w-4 h-4 rounded-sm bg-[#4D1917] border border-[#FFD700] text-[8px] flex items-center justify-center text-[#FFD700] font-black shadow-sm z-10">
                印
              </span>
            </div>

            {/* MAIN TITLE — SERIF/DISPLAY TYPOGRAPHY 100% OPAQUE */}
            <h3
              className="font-display font-extrabold text-3xl sm:text-5xl text-[#2B1714] tracking-tight leading-[0.95] opacity-100"
              style={{ textShadow: '0 2px 10px rgba(255,255,255,0.9)' }}
            >
              PPT <br />
              <span className="text-[#4D1917]">SUBMISSION</span>
            </h3>

            {/* EDITORIAL DATE DESIGN */}
            <div className="pt-2 border-t border-[#4D1917]/40 flex items-center space-x-3">
              <div
                className="font-display font-black text-4xl sm:text-6xl text-[#4D1917] tracking-tighter opacity-100"
                style={{ textShadow: '0 2px 6px rgba(255,255,255,0.9)' }}
              >
                10
              </div>

              <div className="flex flex-col font-mono text-[10px] sm:text-[11px] font-black tracking-widest uppercase leading-none text-left">
                <span className="text-[#4D1917] font-extrabold opacity-100">DEADLINE</span>
                <span
                  className="text-[#2B1714] text-xs sm:text-base font-extrabold mt-0.5 opacity-100"
                  style={{ textShadow: '0 1px 4px rgba(255,255,255,0.9)' }}
                >
                  OCTOBER 2026
                </span>
              </div>
            </div>
          </motion.div>

          {/* ==================================================
              ATMOSPHERIC MIDDLE GAP (38% → 55%)
              Controlled vertical transition space with light motion
          ================================================== */}
          <div className="relative my-2 py-4 pointer-events-none flex items-center space-x-2 pl-4 opacity-75">
            <motion.div
              animate={{ opacity: [0.4, 0.9, 0.4] }}
              transition={{ duration: 2.5, repeat: Infinity, ease: 'easeInOut' }}
              className="text-[#FFD700] text-xs"
            >
              ✦
            </motion.div>
            <div className="h-[1px] w-12 bg-gradient-to-r from-[#4D1917]/40 to-transparent" />
          </div>

          {/* ==================================================
              ROUND 02 COMPOSITION (TOP 55% → 92%)
          ================================================== */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.75 }}
            className="relative text-left space-y-1.5 z-10 pl-2 sm:pl-4 pb-2"
          >
            {/* CUSTOM ROUND 02 SPECIAL INSIGNIA */}
            <div className="relative flex items-center space-x-3 mb-1">
              <div className="absolute -left-3 top-1/2 -translate-y-1/2 w-14 h-14 rounded-full border border-[#4D1917]/30 pointer-events-none z-0" />
              
              <span className="font-display font-black text-5xl sm:text-7xl text-[#4D1917] drop-shadow-[0_2px_4px_rgba(255,255,255,0.9)] relative z-10">
                02
              </span>
              <div className="h-7 w-0.5 bg-[#FFD700]/80 z-10" />
              <div className="flex flex-col font-mono text-[10px] sm:text-[11px] font-black tracking-widest text-[#4D1917] leading-none uppercase z-10">
                <span>ROUND</span>
                <span>FINALE</span>
              </div>
              <span className="w-2.5 h-2.5 bg-[#FFD700] transform rotate-45 shadow-[0_0_6px_#FFD700] z-10" />
              <span className="w-4 h-4 rounded-sm bg-[#2B1714] border border-[#FFD700] text-[8px] flex items-center justify-center text-[#FFD700] font-black shadow-sm z-10">
                印
              </span>
            </div>

            {/* HERO MAIN TITLE — GRAND FINALE */}
            <h3
              className="font-display font-extrabold text-3xl sm:text-6xl text-[#2B1714] tracking-tight leading-[0.95] opacity-100"
              style={{ textShadow: '0 2px 10px rgba(255,255,255,0.9)' }}
            >
              GRAND <br />
              <span className="text-[#4D1917]">FINALE</span>
            </h3>

            {/* EDITORIAL DATE & METADATA LINE */}
            <div className="space-y-2 pt-2 border-t border-[#4D1917]/40 flex flex-col items-start">
              <div className="flex items-center space-x-3">
                <div
                  className="font-display font-black text-3xl sm:text-5xl text-[#4D1917] tracking-tighter opacity-100 flex items-center"
                  style={{ textShadow: '0 2px 6px rgba(255,255,255,0.9)' }}
                >
                  <span>24</span>
                  <span className="text-[#2B1714] mx-1 font-mono text-xl sm:text-3xl">—</span>
                  <span>25</span>
                </div>

                <div className="flex flex-col font-mono text-[10px] sm:text-[11px] font-black tracking-widest uppercase leading-none text-left">
                  <span className="text-[#4D1917] opacity-100">OCTOBER</span>
                  <span className="text-[#2B1714] mt-0.5 opacity-100">2026</span>
                </div>
              </div>

              {/* PURE METADATA LINE (NO BUTTON CARDS OR BOUNDED BOXES) */}
              <div className="flex items-center space-x-2 text-[11px] sm:text-xs font-mono font-black text-[#2B1714] pt-0.5">
                <span>NIT DELHI</span>
                <span className="text-[#FFD700]">◆</span>
                <span className="text-[#4D1917]">36 HOURS</span>
              </div>
            </div>

          </motion.div>

        </div>

        {/* ==================================================
            RIGHT 53% COLUMN: CLEAN BACKGROUND ARTWORK SPACE
        ================================================== */}
        <div className="hidden md:block relative h-full pointer-events-none">
          {/* Unobscured right side showing clean background Katana artwork */}
        </div>

      </motion.div>
    </section>
  );
};

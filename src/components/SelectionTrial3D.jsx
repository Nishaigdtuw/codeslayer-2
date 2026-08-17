import React, { useRef } from 'react';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';
import { SectionBackground } from './SectionBackground';
import { backgrounds } from '../data/backgrounds';

// Directional Sakura Petals Component for Rounds Section
const MapSakuraPetals = () => {
  const petals = Array.from({ length: 16 }, (_, i) => ({
    id: i,
    left: `${Math.random() * 100}%`,
    delay: Math.random() * 4,
    duration: 5 + Math.random() * 5,
    scale: 0.6 + Math.random() * 0.6,
  }));

  return (
    <div className="absolute inset-0 pointer-events-none z-10 overflow-hidden">
      {petals.map((p) => (
        <motion.div
          key={p.id}
          initial={{ y: '-10%', x: 0, rotate: 0, opacity: 0 }}
          animate={{
            y: '110vh',
            x: [0, 35, 10, 45],
            rotate: [0, 180, 360],
            opacity: [0, 0.85, 0.85, 0],
          }}
          transition={{
            duration: p.duration,
            repeat: Infinity,
            delay: p.delay,
            ease: 'linear',
          }}
          style={{ left: p.left, scale: p.scale }}
          className="absolute w-3.5 h-4.5 bg-gradient-to-br from-pink-300 via-pink-400 to-rose-500 rounded-full opacity-80 filter blur-[0.3px] shadow-[0_0_8px_rgba(244,114,182,0.8)]"
        />
      ))}
    </div>
  );
};

export const SelectionTrial3D = () => {
  const containerRef = useRef(null);

  // Mouse Parallax Values for 2.5D Depth
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const rotateX = useSpring(useTransform(mouseY, [-0.5, 0.5], [6, -6]), { stiffness: 180, damping: 20 });
  const rotateY = useSpring(useTransform(mouseX, [-0.5, 0.5], [-8, 8]), { stiffness: 180, damping: 20 });

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
      className="relative min-h-screen py-16 sm:py-24 px-4 sm:px-8 overflow-hidden flex flex-col justify-center select-none"
    >
      {/* 1. BACKGROUND ENVIRONMENT: 03_torii_cherry_blossom.png?v=cream2 */}
      <SectionBackground
        src={backgrounds.trial}
        alt="Torii Cherry Blossom Cinematic Map"
        overlayOpacity={0.08}
      />

      {/* Atmospheric Central Readability Vignette */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/35 via-black/10 to-black/40 pointer-events-none z-0" />

      {/* Directional Sakura Petals */}
      <MapSakuraPetals />

      {/* 2. MIDGROUND: SIGNATURE KATANA ENERGY SLASH TRAIL & ANIMATED SWORD ROUTE */}
      <svg className="absolute inset-0 w-full h-full pointer-events-none z-2 hidden md:block overflow-visible">
        <defs>
          <linearGradient id="katanaSlashGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#E60033" stopOpacity="0.9" />
            <stop offset="40%" stopColor="#FF2A55" stopOpacity="1" />
            <stop offset="70%" stopColor="#FFD700" stopOpacity="1" />
            <stop offset="100%" stopColor="#E60033" stopOpacity="0.9" />
          </linearGradient>
          <filter id="katanaGlow">
            <feGaussianBlur stdDeviation="4" result="coloredBlur" />
            <feMerge>
              <feMergeNode in="coloredBlur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>

        {/* Curving Katana Energy Trail Line */}
        <motion.path
          d="M 240 280 C 420 380, 560 440, 800 520"
          fill="none"
          stroke="url(#katanaSlashGrad)"
          strokeWidth="4"
          filter="url(#katanaGlow)"
          initial={{ pathLength: 0, opacity: 0 }}
          whileInView={{ pathLength: 1, opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1.4, ease: 'easeInOut' }}
        />

        {/* Animated Blade Spark Particle travelling along path */}
        <motion.circle
          r="6"
          fill="#FFD700"
          filter="url(#katanaGlow)"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: [0, 1, 1, 0] }}
          viewport={{ once: true }}
          transition={{ duration: 1.4, ease: 'easeInOut' }}
        >
          <animateMotion
            path="M 240 280 C 420 380, 560 440, 800 520"
            dur="1.4s"
            repeatCount="1"
            fill="freeze"
          />
        </motion.circle>
      </svg>

      {/* Mobile Vertical Katana Trail SVG */}
      <svg className="absolute inset-0 w-full h-full pointer-events-none z-2 md:hidden overflow-visible opacity-70">
        <motion.path
          d="M 120 220 C 180 340, 140 440, 220 580"
          fill="none"
          stroke="url(#katanaSlashGrad)"
          strokeWidth="3.5"
          initial={{ pathLength: 0 }}
          whileInView={{ pathLength: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1.2 }}
        />
      </svg>

      {/* 3. INFORMATION PLANE — 2.5D PARALLAX TYPOGRAPHY COMPOSITION (NO CARDS) */}
      <motion.div
        style={{ rotateX, rotateY, transformStyle: 'preserve-3d' }}
        className="relative z-10 max-w-7xl mx-auto w-full my-auto"
      >
        {/* TOP COMPACT CATEGORY HEADER */}
        <motion.div
          initial={{ opacity: 0, y: -15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-left mb-6"
        >
          <div className="katana-divider mb-4" />
          <span className="font-mono text-xs uppercase tracking-[0.3em] text-pink-300 font-bold px-3 py-1 bg-black/40 border border-pink-400/40 rounded-full inline-block backdrop-blur-sm shadow-md">
            PATH TO THE FINALE • CHECKPOINT 01 → 02
          </span>
        </motion.div>

        {/* UNIFIED ASYMMETRIC MAP COMPOSITION (NO BOXES, NO CARDS) */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-12 items-center">
          
          {/* ==================================================
              ROUND 01 — THE FIRST GATE (LEFT SIDE / UNCONTAINED)
          ================================================== */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="md:col-span-6 lg:col-span-5 text-left relative py-4"
          >
            {/* OVERSIZED ENVIRONMENTAL WATERMARK: 01 */}
            <span className="absolute -top-12 -left-6 font-display font-black text-9xl sm:text-[14rem] text-pink-400/10 pointer-events-none select-none z-0">
              01
            </span>

            <div className="relative z-10 space-y-3">
              {/* VERTICAL JAPANESE BRUSH MARKER & SMALL LABEL */}
              <div className="flex items-center space-x-2 font-mono text-xs text-pink-300 font-bold tracking-widest uppercase">
                <span className="w-2 h-2 rounded-full bg-crimson-bright animate-ping" />
                <span>ROUND 01</span>
              </div>

              {/* MAIN HEADING — INK MASK REVEAL */}
              <h3 className="font-display font-black text-4xl sm:text-7xl text-white tracking-tight leading-none drop-shadow-[0_8px_24px_rgba(0,0,0,1)]">
                PPT <br />
                <span className="text-pink-400 text-glow-white">SUBMISSION</span>
              </h3>

              {/* DEADLINE COMPOSITION */}
              <div className="pt-4 flex items-center space-x-4">
                <div className="font-display font-black text-6xl sm:text-8xl text-yellow-300 tracking-tighter drop-shadow-[0_4px_16px_rgba(0,0,0,1)]">
                  10
                </div>
                <div className="flex flex-col font-mono text-xs sm:text-sm font-black tracking-widest uppercase leading-none border-l-2 border-pink-400/60 pl-3 text-left">
                  <span className="text-pink-300 font-bold">DEADLINE</span>
                  <span className="text-white text-base sm:text-xl font-extrabold mt-1">OCTOBER 2026</span>
                </div>
              </div>
            </div>
          </motion.div>

          {/* SPATIAL CENTER GAP FOR KATANA ENERGY SLASH */}
          <div className="hidden md:block md:col-span-1" />

          {/* ==================================================
              ROUND 02 — THE GRAND FINALE DESTINATION (RIGHT SIDE)
          ================================================== */}
          <motion.div
            initial={{ opacity: 0, x: 50, scale: 0.95 }}
            whileInView={{ opacity: 1, x: 0, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="md:col-span-5 lg:col-span-6 text-left relative py-4 md:mt-16"
          >
            {/* OVERSIZED ENVIRONMENTAL WATERMARK: 02 */}
            <span className="absolute -top-12 -left-6 font-display font-black text-9xl sm:text-[14rem] text-yellow-400/10 pointer-events-none select-none z-0">
              02
            </span>

            <div className="relative z-10 space-y-3">
              {/* SMALL DESTINATION LABEL */}
              <div className="flex items-center space-x-2 font-mono text-xs text-yellow-300 font-bold tracking-widest uppercase">
                <span className="w-2 h-2 rounded-full bg-yellow-400 shadow-[0_0_10px_#FFD700]" />
                <span>ROUND 02 • THE ARRIVAL</span>
              </div>

              {/* MAIN HEADING */}
              <h3 className="font-display font-black text-4xl sm:text-7xl text-white tracking-tight leading-none drop-shadow-[0_8px_24px_rgba(0,0,0,1)]">
                GRAND <br />
                <span className="text-yellow-400 text-glow-white">FINALE</span>
              </h3>

              {/* DATES & VENUE DESTINATION STAMP */}
              <div className="space-y-3 pt-4">
                <div className="flex items-center space-x-4">
                  <div className="font-display font-black text-5xl sm:text-7xl text-yellow-300 tracking-tighter drop-shadow-[0_4px_16px_rgba(0,0,0,1)]">
                    24–25
                  </div>
                  <div className="flex flex-col font-mono text-xs sm:text-sm font-black tracking-widest uppercase leading-tight text-left">
                    <span className="text-yellow-400 font-bold">OCTOBER</span>
                    <span className="text-gray-200 mt-1">2026</span>
                  </div>
                </div>

                {/* DESTINATION STAMPS */}
                <div className="flex flex-wrap items-center gap-3 text-xs font-mono font-bold text-gray-100 pt-2">
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

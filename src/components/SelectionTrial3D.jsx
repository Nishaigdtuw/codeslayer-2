import React, { useRef } from 'react';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';
import { backgrounds } from '../data/backgrounds';

// Floating Sakura Petals crossing panel boundaries
const FoldingSakuraPetals = () => {
  const petals = Array.from({ length: 14 }, (_, i) => ({
    id: i,
    left: `${Math.random() * 100}%`,
    delay: Math.random() * 4,
    duration: 5 + Math.random() * 5,
    scale: 0.6 + Math.random() * 0.6,
  }));

  return (
    <div className="absolute inset-0 pointer-events-none z-20 overflow-hidden">
      {petals.map((p) => (
        <motion.div
          key={p.id}
          initial={{ y: '-10%', x: 0, rotate: 0, opacity: 0 }}
          animate={{
            y: '105vh',
            x: [0, 30, -15, 25],
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

  // 3D Pointer Interaction for Folding Panels
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const rotateYBase = useSpring(useTransform(mouseX, [-0.5, 0.5], [-4, 4]), { stiffness: 150, damping: 20 });
  const rotateXBase = useSpring(useTransform(mouseY, [-0.5, 0.5], [3, -3]), { stiffness: 150, damping: 20 });

  const handleMouseMove = (e) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    mouseX.set(x);
    mouseY.set(y);
  };

  const totalPanels = 6;
  const panels = Array.from({ length: totalPanels }, (_, idx) => idx);

  return (
    <section
      id="ppt-round"
      ref={containerRef}
      onMouseMove={handleMouseMove}
      className="relative min-h-[90vh] sm:min-h-screen py-12 sm:py-16 px-4 sm:px-8 overflow-hidden flex flex-col justify-center select-none"
    >
      {/* Central Readability Vignette */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/10 to-black/45 pointer-events-none z-0" />

      {/* Sakura Petals */}
      <FoldingSakuraPetals />

      <div className="relative z-10 max-w-7xl mx-auto w-full my-auto">
        
        {/* TOP EDITORIAL HEADER */}
        <motion.div
          initial={{ opacity: 0, y: -15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-left mb-6"
        >
          <div className="katana-divider mb-4" />
          <div className="flex items-center space-x-3">
            <span className="font-mono text-xs uppercase tracking-[0.3em] text-pink-300 font-bold px-3 py-1 bg-black/40 border border-pink-400/40 rounded-full backdrop-blur-sm shadow-md">
              EXHIBITION SCREEN • 01 & 02
            </span>
            <span className="font-mono text-[10px] text-yellow-300 font-bold uppercase tracking-widest hidden sm:inline-block">
              FOLDING BATTLE ARTWORK
            </span>
          </div>
        </motion.div>

        {/* ==================================================
            THE FOLDING BATTLE SCREEN (6 VERTICAL 3D SHOJI PANELS)
        ================================================== */}
        <div className="relative w-full min-h-[600px] sm:min-h-[680px] flex items-center justify-center perspective-[1200px]">
          
          {/* 6 VERTICAL 3D FOLDING PANELS FORMING ONE CONTINUOUS ARTWORK */}
          <div className="absolute inset-0 grid grid-cols-6 gap-1 sm:gap-2 h-full z-0 transform-style-3d">
            {panels.map((panelIdx) => {
              const isEven = panelIdx % 2 === 0;
              const panelRotateY = isEven ? 3 : -3;

              return (
                <motion.div
                  key={panelIdx}
                  initial={{ rotateY: isEven ? 25 : -25, opacity: 0, z: -100 }}
                  whileInView={{ rotateY: panelRotateY, opacity: 1, z: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.9, delay: panelIdx * 0.08, ease: 'easeOut' }}
                  style={{
                    rotateY: rotateYBase,
                    rotateX: rotateXBase,
                  }}
                  className="relative h-full overflow-hidden border-x border-amber-900/30 shadow-2xl rounded-sm transform-style-3d bg-black/20"
                >
                  {/* CONTINUOUS BACKGROUND CROPPED ACROSS THIS SPECIFIC PANEL */}
                  <div
                    className="absolute inset-0 w-[600%] h-full bg-cover bg-center pointer-events-none filter contrast-105 brightness-95"
                    style={{
                      backgroundImage: `url(${backgrounds.trial})`,
                      left: `-${panelIdx * 100}%`,
                    }}
                  />

                  {/* Panel Overlay & Fold Shadow Edge */}
                  <div className="absolute inset-0 bg-black/15 pointer-events-none" />
                  <div className="absolute inset-y-0 right-0 w-3 bg-gradient-to-l from-black/40 to-transparent pointer-events-none" />
                  <div className="absolute inset-y-0 left-0 w-3 bg-gradient-to-r from-black/40 to-transparent pointer-events-none" />
                </motion.div>
              );
            })}
          </div>

          {/* ARTISTIC DIAGONAL KATANA BLADE CROSSING THE CENTER OF PANELS (NOT A BUTTON) */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8, rotate: -25 }}
            whileInView={{ opacity: 0.85, scale: 1, rotate: -22 }}
            viewport={{ once: true }}
            transition={{ duration: 1.2, delay: 0.5 }}
            className="absolute z-10 w-full sm:w-[110%] h-1 bg-gradient-to-r from-transparent via-crimson-bright to-transparent shadow-[0_0_20px_#FF2A55] pointer-events-none transform -rotate-12 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
          >
            <div className="absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2 w-4 h-4 rounded-full bg-yellow-300 shadow-[0_0_15px_#FFD700] animate-ping opacity-75" />
          </motion.div>

          {/* MAIN UNIFIED EDITORIAL TYPOGRAPHY LAYOUT OVER THE FOLDING ARTWORK */}
          <div className="relative z-10 w-full h-full grid grid-cols-1 md:grid-cols-12 gap-8 items-center p-6 sm:p-12">
            
            {/* ==================================================
                LEFT HALF: ROUND 01 ART DIRECTION (UNCONTAINED)
            ================================================== */}
            <motion.div
              initial={{ opacity: 0, x: -40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="md:col-span-6 text-left relative py-4"
            >
              {/* ENORMOUS BACKGROUND NUMERAL: 01 */}
              <span className="absolute -top-16 -left-8 font-display font-black text-[10rem] sm:text-[16rem] text-pink-400/15 pointer-events-none select-none z-0">
                01
              </span>

              <div className="relative z-10 space-y-4">
                {/* SMALL EDITORIAL LABEL */}
                <div className="flex items-center space-x-2 font-mono text-xs text-pink-300 font-bold tracking-widest uppercase">
                  <span className="w-2.5 h-2.5 rounded-full bg-crimson-bright animate-pulse" />
                  <span>ROUND 01 • ONLINE</span>
                </div>

                {/* ELEGANT DISPLAY TITLE */}
                <h3 className="font-display font-black text-4xl sm:text-7xl text-white tracking-tight leading-none drop-shadow-[0_8px_24px_rgba(0,0,0,1)]">
                  PPT <br />
                  <span className="text-pink-400 text-glow-white">SUBMISSION</span>
                </h3>

                {/* DEADLINE WITH JAPANESE RED SEAL MARK */}
                <div className="pt-6 border-t border-pink-500/30 flex items-center space-x-5">
                  <div className="font-display font-black text-6xl sm:text-8xl text-yellow-300 tracking-tighter drop-shadow-[0_4px_16px_rgba(0,0,0,1)] flex items-baseline">
                    <span>10</span>
                  </div>

                  <div className="flex flex-col font-mono text-xs sm:text-sm font-black tracking-widest uppercase leading-none text-left">
                    <div className="flex items-center space-x-2">
                      <span className="text-pink-300 font-bold">DEADLINE</span>
                      <span className="w-4 h-4 rounded bg-red-600 border border-yellow-300 text-[8px] flex items-center justify-center text-yellow-300 font-black shadow-sm">
                        印
                      </span>
                    </div>
                    <span className="text-white text-base sm:text-xl font-extrabold mt-1.5">OCTOBER 2026</span>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* CENTER SPATIAL TENSION GAP */}
            <div className="hidden md:block md:col-span-1" />

            {/* ==================================================
                RIGHT HALF: ROUND 02 ART DIRECTION (GRAND FINALE)
            ================================================== */}
            <motion.div
              initial={{ opacity: 0, x: 40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.6 }}
              className="md:col-span-5 text-left relative py-4 md:mt-12"
            >
              {/* ENORMOUS BACKGROUND NUMERAL: 02 */}
              <span className="absolute -top-16 -left-8 font-display font-black text-[10rem] sm:text-[16rem] text-yellow-400/15 pointer-events-none select-none z-0">
                02
              </span>

              <div className="relative z-10 space-y-4">
                {/* SMALL EDITORIAL LABEL */}
                <div className="flex items-center space-x-2 font-mono text-xs text-yellow-300 font-bold tracking-widest uppercase">
                  <span className="w-2.5 h-2.5 rounded-full bg-yellow-400 shadow-[0_0_10px_#FFD700]" />
                  <span>ROUND 02 • OFFLINE FINALE</span>
                </div>

                {/* ELEGANT DISPLAY TITLE */}
                <h3 className="font-display font-black text-4xl sm:text-7xl text-white tracking-tight leading-none drop-shadow-[0_8px_24px_rgba(0,0,0,1)]">
                  GRAND <br />
                  <span className="text-yellow-400 text-glow-white">FINALE</span>
                </h3>

                {/* POSTER DATE COMPOSITION: 24 — 25 */}
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

                  {/* DESTINATION STAMPS */}
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

        </div>

      </div>
    </section>
  );
};

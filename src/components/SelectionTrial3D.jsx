import React from 'react';
import { motion } from 'framer-motion';
import { SectionBackground } from './SectionBackground';
import { backgrounds } from '../data/backgrounds';
import { MapPin, Clock, FileText, Trophy } from 'lucide-react';

export const SelectionTrial3D = () => {
  return (
    <section id="ppt-round" className="relative min-h-screen py-16 sm:py-20 px-4 sm:px-8 overflow-hidden flex flex-col justify-center select-none">
      
      {/* BACKGROUND: 03_torii_cherry_blossom.png?v=cream2 */}
      <SectionBackground
        src={backgrounds.trial}
        alt="Torii Cherry Blossom Two Gates Journey"
        overlayOpacity={0.08}
      />

      {/* Atmospheric Central Readability Vignette */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-black/10 to-black/35 pointer-events-none z-0" />

      {/* ANIMATED GLOWING KATANA PATH CONNECTING ROUND 01 TO ROUND 02 IN ONE VIEWPORT */}
      <svg className="absolute inset-0 w-full h-full pointer-events-none z-1 hidden md:block opacity-60">
        <defs>
          <linearGradient id="pathGradientCompact" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#FF2A55" stopOpacity="0.9" />
            <stop offset="50%" stopColor="#FFD700" stopOpacity="1" />
            <stop offset="100%" stopColor="#FF2A55" stopOpacity="0.9" />
          </linearGradient>
        </defs>
        <motion.path
          d="M 280 260 C 450 340, 550 420, 780 500"
          fill="none"
          stroke="url(#pathGradientCompact)"
          strokeWidth="3"
          strokeDasharray="6 6"
          initial={{ pathLength: 0, opacity: 0 }}
          whileInView={{ pathLength: 1, opacity: 0.8 }}
          viewport={{ once: true }}
          transition={{ duration: 1.2, ease: 'easeInOut' }}
        />
      </svg>

      <div className="relative z-10 max-w-7xl mx-auto w-full my-auto py-4">
        
        {/* SECTION CATEGORY HEADER */}
        <motion.div
          initial={{ opacity: 0, y: -15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-left mb-8"
        >
          <div className="katana-divider mb-4" />
          <span className="font-mono text-xs uppercase tracking-[0.3em] text-pink-300 font-bold px-3 py-1 bg-black/40 border border-pink-400/40 rounded-full inline-block backdrop-blur-sm shadow-md">
            THE TWO GATES • SELECTION & FINALE
          </span>
        </motion.div>

        {/* BOTH ROUNDS IN ONE COMPACT DIAGONAL COMPOSITION */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 sm:gap-12 items-center">
          
          {/* ==================================================
              ROUND 01 — THE FIRST GATE (UPPER LEFT)
          ================================================== */}
          <motion.div
            initial={{ opacity: 0, x: -40, y: 20 }}
            whileInView={{ opacity: 1, x: 0, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="md:col-span-6 lg:col-span-5 relative text-left p-6 sm:p-8 rounded-xl bg-black/15 border border-pink-400/30 backdrop-blur-sm shadow-2xl group overflow-hidden"
          >
            {/* OVERSIZED WATERMARK: 01 */}
            <span className="absolute -top-8 -right-4 font-display font-black text-8xl sm:text-9xl text-pink-500/10 pointer-events-none select-none">
              01
            </span>

            {/* SMALL LABEL */}
            <div className="flex items-center space-x-2 font-mono text-xs text-pink-300 font-bold tracking-widest uppercase mb-3">
              <FileText className="w-4 h-4 text-pink-400" />
              <span>ROUND 01</span>
            </div>

            {/* MAIN HEADING */}
            <h3 className="font-display font-black text-3xl sm:text-5xl text-white tracking-tight leading-none mb-4 drop-shadow-[0_6px_24px_rgba(0,0,0,1)]">
              PPT <br />
              <span className="text-pink-400 text-glow-white">SUBMISSION</span>
            </h3>

            {/* DEADLINE COMPOSITION */}
            <div className="pt-4 border-t border-pink-500/30 flex items-center space-x-4">
              <div className="font-display font-black text-5xl sm:text-7xl text-yellow-300 tracking-tighter drop-shadow-[0_4px_16px_rgba(0,0,0,1)]">
                10
              </div>
              <div className="flex flex-col font-mono text-xs sm:text-sm font-black tracking-widest uppercase leading-tight text-left">
                <span className="text-pink-300 font-bold">DEADLINE</span>
                <span className="text-white text-sm sm:text-lg font-extrabold">OCTOBER 2026</span>
              </div>
            </div>
          </motion.div>

          {/* SPATIAL GAP */}
          <div className="hidden md:block md:col-span-1" />

          {/* ==================================================
              ROUND 02 — THE FINAL GATE (LOWER RIGHT)
          ================================================== */}
          <motion.div
            initial={{ opacity: 0, x: 40, y: 20 }}
            whileInView={{ opacity: 1, x: 0, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.15 }}
            className="md:col-span-5 lg:col-span-6 relative text-left p-6 sm:p-8 rounded-xl bg-black/25 border-2 border-yellow-400/60 backdrop-blur-sm shadow-[0_0_40px_rgba(234,179,8,0.25)] group overflow-hidden md:mt-12"
          >
            {/* OVERSIZED WATERMARK: 02 */}
            <span className="absolute -top-8 -right-4 font-display font-black text-8xl sm:text-9xl text-yellow-400/10 pointer-events-none select-none">
              02
            </span>

            {/* SMALL LABEL */}
            <div className="flex items-center space-x-2 font-mono text-xs text-yellow-300 font-bold tracking-widest uppercase mb-3">
              <Trophy className="w-4 h-4 text-yellow-400 animate-pulse" />
              <span>ROUND 02 • THE ARRIVAL</span>
            </div>

            {/* MAIN HEADING */}
            <h3 className="font-display font-black text-3xl sm:text-5xl text-white tracking-tight leading-none mb-4 drop-shadow-[0_6px_24px_rgba(0,0,0,1)]">
              GRAND <br />
              <span className="text-yellow-400 text-glow-white">FINALE</span>
            </h3>

            {/* DATES & VENUE POSTER COMPOSITION */}
            <div className="space-y-3 pt-4 border-t border-yellow-500/40">
              
              <div className="flex items-center space-x-4">
                <div className="font-display font-black text-4xl sm:text-6xl text-yellow-300 tracking-tighter drop-shadow-[0_4px_16px_rgba(0,0,0,1)]">
                  24–25
                </div>
                <div className="flex flex-col font-mono text-xs sm:text-sm font-black tracking-widest uppercase leading-tight text-left">
                  <span className="text-yellow-400 font-bold">OCTOBER</span>
                  <span className="text-gray-200">2026</span>
                </div>
              </div>

              <div className="flex flex-wrap items-center gap-3 text-xs font-mono font-bold text-gray-100 pt-1">
                <div className="flex items-center space-x-1.5 px-3 py-1 bg-yellow-500/20 border border-yellow-400/40 rounded-md">
                  <MapPin className="w-4 h-4 text-amber-400" />
                  <span>NIT DELHI</span>
                </div>

                <div className="flex items-center space-x-1.5 px-3 py-1 bg-crimson-600/30 border border-crimson-bright/40 rounded-md text-crimson-bright">
                  <Clock className="w-4 h-4 text-crimson-bright" />
                  <span>36 HOURS</span>
                </div>
              </div>

            </div>
          </motion.div>

        </div>

      </div>
    </section>
  );
};

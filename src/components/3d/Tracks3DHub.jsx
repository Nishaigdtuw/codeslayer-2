import React, { useRef, useState } from 'react';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';
import { SectionBackground } from '../SectionBackground';
import { backgrounds } from '../../data/backgrounds';

// Data for the 6 Tracks inside the LEFT 50% Half (2 x 3 Asymmetric Layout)
const leftTrackItems = [
  {
    id: '01',
    title: 'HEALTHCARE',
    sizeClass: 'text-xl sm:text-2xl font-extrabold',
    subText: null,
  },
  {
    id: '02',
    title: 'ARTIFICIAL INTELLIGENCE\n& MACHINE LEARNING',
    sizeClass: 'text-lg sm:text-xl font-black leading-tight',
    subText: null,
  },
  {
    id: '03',
    title: 'WEB3 & BLOCKCHAIN',
    sizeClass: 'text-xl sm:text-2xl font-extrabold',
    subText: null,
  },
  {
    id: '04',
    title: 'SUSTAINABILITY',
    sizeClass: 'text-xl sm:text-3xl font-black',
    subText: null,
  },
  {
    id: '05',
    title: 'INTERNET OF THINGS',
    sizeClass: 'text-lg sm:text-2xl font-extrabold',
    subText: '(IoT)',
  },
  {
    id: '06',
    title: 'OPEN INNOVATION',
    sizeClass: 'text-xl sm:text-3xl font-black',
    subText: null,
  },
];

export const Tracks3DHub = () => {
  const containerRef = useRef(null);
  const [hoveredIdx, setHoveredIdx] = useState(null);

  // Mouse Pointer Parallax for Content Stage
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
      id="tracks"
      ref={containerRef}
      onMouseMove={handleMouseMove}
      style={{ height: 'clamp(550px, 68vh, 620px)' }}
      className="relative my-4 overflow-hidden select-none flex items-center justify-center"
    >
      {/* Hide site-wide BattleMapNav when hovering/scrolling this section via CSS */}
      <style>{`
        #tracks:hover ~ aside,
        body:has(#tracks:hover) aside {
          opacity: 0.15;
          pointer-events: none;
        }
      `}</style>

      {/* 1. APPROVED BACKGROUND ARTWORK (Existing Demon Slayer Waterfall Background) */}
      <SectionBackground
        src={backgrounds.tracks}
        alt="Fantasy Waterfall Realm Tracks Atmosphere"
        overlayOpacity={0.04}
      />

      {/* 2. LOCAL CREAM READABILITY FIELD (STRICTLY BEHIND LEFT 52% CONTENT AREA) */}
      <div
        className="absolute inset-y-0 left-0 w-full md:w-[55%] pointer-events-none z-1"
        style={{
          background: 'linear-gradient(to right, rgba(255,248,230,0.97) 0%, rgba(255,248,230,0.78) 40%, rgba(255,248,230,0.22) 75%, transparent 100%)',
        }}
      />

      {/* 3. MASTER STAGE GRID: LEFT 50% (ALL SIX TRACKS) | RIGHT 50% (BACKGROUND ARTWORK ONLY) */}
      <motion.div
        style={{ rotateX, rotateY, transformStyle: 'preserve-3d' }}
        className="relative z-10 w-full h-full max-w-[1440px] mx-auto grid grid-cols-1 md:grid-cols-[52%_48%] items-center px-4 sm:px-10"
      >
        
        {/* ==================================================
            LEFT 52% COLUMN: TRACKS HEADER + ALL 6 TRACKS (2 x 3 EDITORIAL GRID)
            ZERO DECORATIVE 3D OBJECTS / ZERO CARDS / ZERO ICONS
        ================================================== */}
        <div className="relative w-full h-full flex flex-col justify-between py-8 sm:py-10 z-10">
          
          {/* TRACKS HEADER */}
          <motion.div
            initial={{ opacity: 0, x: -15 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4 }}
            className="flex items-center space-x-3 mb-2"
          >
            <span className="font-display font-black text-2xl sm:text-3xl text-[#4D1917] tracking-widest uppercase">
              TRACKS
            </span>
            <div className="h-[2px] w-16 bg-gradient-to-r from-[#4D1917] via-[#FFD700] to-transparent" />
            <span className="w-4 h-4 rounded-sm bg-[#4D1917] border border-[#FFD700] text-[9px] flex items-center justify-center text-[#FFD700] font-black shadow-sm">
              印
            </span>
          </motion.div>

          {/* 2 x 3 ASYMMETRIC TYPOGRAPHY GRID CONTAINING ALL 6 TRACKS */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 sm:gap-x-8 gap-y-6 sm:gap-y-8 my-auto">
            {leftTrackItems.map((track, idx) => {
              const isHovered = hoveredIdx === idx;
              const isOtherHovered = hoveredIdx !== null && !isHovered;

              return (
                <motion.div
                  key={track.id}
                  initial={{ opacity: 0, y: 15 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: idx * 0.07 }}
                  onMouseEnter={() => setHoveredIdx(idx)}
                  onMouseLeave={() => setHoveredIdx(null)}
                  style={{
                    transform: `translateZ(${isHovered ? 25 : isOtherHovered ? -8 : 0}px)`,
                  }}
                  className="relative cursor-pointer group transition-all duration-300 flex flex-col justify-start text-left"
                >
                  {/* NUMBER + TRACK TITLE */}
                  <div className="flex flex-col space-y-1">
                    {/* NUMBER ACCENT */}
                    <div className="flex items-center space-x-1.5 font-mono text-xs sm:text-sm font-black text-[#4D1917]">
                      <span>{track.id}</span>
                      <span className="text-[#FFD700]">/</span>
                    </div>

                    {/* TRACK TITLE */}
                    <h3
                      className={`font-display tracking-tight transition-all duration-300 whitespace-pre-line ${track.sizeClass} ${
                        isHovered ? 'text-[#4D1917] scale-[1.03]' : 'text-[#261512] group-hover:text-[#4D1917]'
                      }`}
                      style={{
                        textShadow: '0 2px 8px rgba(255,255,255,0.9)',
                      }}
                    >
                      {track.title}
                    </h3>

                    {/* SUBTEXT (e.g. (IoT)) */}
                    {track.subText && (
                      <span className="font-mono text-xs font-black text-[#4D1917] mt-0.5">
                        {track.subText}
                      </span>
                    )}
                  </div>

                  {/* HOVER UNDERLINE / SLASH REVEAL */}
                  <motion.div
                    initial={{ scaleX: 0 }}
                    animate={{ scaleX: isHovered ? 1 : 0 }}
                    transition={{ duration: 0.25 }}
                    className="h-[2px] w-3/4 bg-gradient-to-r from-[#4D1917] via-[#FFD700] to-transparent mt-1.5 origin-left"
                  />
                </motion.div>
              );
            })}
          </div>

        </div>

        {/* ==================================================
            RIGHT 48% COLUMN: UNOBSCURED BACKGROUND ARTWORK ONLY
            ZERO TRACK NAMES / ZERO 3D DECORATIVE OBJECTS
        ================================================== */}
        <div className="hidden md:block relative h-full pointer-events-none">
          {/* Unobscured right half displaying only the existing background artwork */}
        </div>

      </motion.div>
    </section>
  );
};

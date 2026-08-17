import React, { useRef, useState } from 'react';
import { Canvas } from '@react-three/fiber';
import { Sparkles } from '@react-three/drei';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';
import { SectionBackground } from '../SectionBackground';
import { backgrounds } from '../../data/backgrounds';

// Atmospheric WebGL Sparkles Canvas (NO 3D Objects / NO Swords / NO Circles)
const AtmosphereSparklesScene = () => {
  return (
    <Canvas
      camera={{ position: [0, 0, 5.8], fov: 45 }}
      className="absolute inset-0 w-full h-full pointer-events-none z-2"
      gl={{ antialias: true, alpha: true }}
    >
      <ambientLight intensity={0.95} />
      <Sparkles count={30} scale={7} size={2.0} speed={0.4} color="#FFD700" opacity={0.65} />
      <Sparkles count={20} scale={9} size={1.6} speed={0.5} color="#451817" opacity={0.55} />
    </Canvas>
  );
};

// Data for "3D SCATTERED TRACK TYPOGRAPHY" Spatial Layout
const scatteredTracks = [
  {
    id: '01',
    numFormat: 'prefix', // 01 / TITLE
    title: 'HEALTHCARE',
    sizeClass: 'text-2xl sm:text-4xl',
    depthZ: 25,
    positionClass: 'top-[14%] left-[6%] sm:left-[10%]',
    revealDelay: 0.15,
  },
  {
    id: '02',
    numFormat: 'suffix', // TITLE / 02
    title: 'ARTIFICIAL INTELLIGENCE\n& MACHINE LEARNING',
    sizeClass: 'text-2xl sm:text-4xl font-black text-left sm:text-right',
    depthZ: 55,
    positionClass: 'top-[12%] right-[5%] sm:right-[8%]',
    revealDelay: 0.05,
  },
  {
    id: '03',
    numFormat: 'block', // 03 over TITLE
    title: 'WEB3 & BLOCKCHAIN',
    sizeClass: 'text-xl sm:text-3xl font-bold',
    depthZ: 30,
    positionClass: 'top-[42%] left-[4%] sm:left-[8%]',
    revealDelay: 0.25,
  },
  {
    id: '04',
    numFormat: 'suffix',
    title: 'SUSTAINABILITY',
    sizeClass: 'text-3xl sm:text-5xl font-black',
    depthZ: 65,
    positionClass: 'top-[40%] right-[6%] sm:right-[12%]',
    revealDelay: 0.35,
  },
  {
    id: '05',
    numFormat: 'prefix',
    title: 'INTERNET OF THINGS (IoT)',
    sizeClass: 'text-xl sm:text-3xl font-bold',
    depthZ: 35,
    positionClass: 'bottom-[12%] left-[8%] sm:left-[14%]',
    revealDelay: 0.45,
  },
  {
    id: '06',
    numFormat: 'suffix',
    title: 'OPEN INNOVATION',
    sizeClass: 'text-3xl sm:text-5xl font-black',
    depthZ: 50,
    positionClass: 'bottom-[10%] right-[8%] sm:right-[10%]',
    revealDelay: 0.20,
  },
];

export const Tracks3DHub = () => {
  const containerRef = useRef(null);
  const [hoveredIdx, setHoveredIdx] = useState(null);

  // Mouse Pointer Parallax for Spatial Typography
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const rotateX = useSpring(useTransform(mouseY, [-0.5, 0.5], [2.5, -2.5]), { stiffness: 150, damping: 20 });
  const rotateY = useSpring(useTransform(mouseX, [-0.5, 0.5], [-3.5, 3.5]), { stiffness: 150, damping: 20 });

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
      style={{ height: 'clamp(560px, 70vh, 680px)' }}
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

      {/* 1. APPROVED BACKGROUND ARTWORK (Contains background waterfall realm image) */}
      <SectionBackground
        src={backgrounds.tracks}
        alt="Fantasy Waterfall Realm Tracks Atmosphere"
        overlayOpacity={0.04}
      />

      {/* 2. ATMOSPHERIC SPARKLES CANVAS (NO 3D OBJECTS) */}
      <AtmosphereSparklesScene />

      {/* 3. SPATIAL TYPOGRAPHY CANVAS STAGE */}
      <motion.div
        style={{ rotateX, rotateY, transformStyle: 'preserve-3d' }}
        className="relative z-10 w-full h-full max-w-[1440px] mx-auto px-4"
      >
        
        {/* COMPACT MINIMAL TITLE: TRACKS */}
        <motion.div
          initial={{ opacity: 0, x: -15 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4 }}
          className="absolute top-4 left-6 sm:left-12 z-30 flex items-center space-x-3 pointer-events-none"
        >
          <span className="font-display font-black text-xl sm:text-2xl text-[#451817] tracking-widest uppercase">
            TRACKS
          </span>
          <div className="h-[2px] w-14 bg-gradient-to-r from-[#451817] via-[#FFD700] to-transparent" />
          <span className="w-3.5 h-3.5 rounded-sm bg-[#451817] border border-[#FFD700] text-[8px] flex items-center justify-center text-[#FFD700] font-black shadow-sm">
            印
          </span>
        </motion.div>

        {/* 4. 3D SCATTERED TRACK TYPOGRAPHY (ASYNCHRONOUS NON-GRID POSITIONS) */}
        <div className="absolute inset-0 z-20 pointer-events-none">
          {scatteredTracks.map((track, idx) => {
            const isHovered = hoveredIdx === idx;
            const isOtherHovered = hoveredIdx !== null && !isHovered;

            return (
              <motion.div
                key={track.id}
                initial={{ opacity: 0, scale: 0.88 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: track.revealDelay }}
                onMouseEnter={() => setHoveredIdx(idx)}
                onMouseLeave={() => setHoveredIdx(null)}
                style={{
                  transform: `translateZ(${isHovered ? track.depthZ + 35 : isOtherHovered ? track.depthZ - 12 : track.depthZ}px)`,
                }}
                className={`absolute ${track.positionClass} pointer-events-auto cursor-pointer transition-all duration-300 group`}
              >
                {/* RADIAL ATMOSPHERIC FOCUS FIELD (APPEARS BEHIND HOVERED TRACK ONLY - NO CARDS OR RECTANGULAR BOXES) */}
                {isHovered && (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.7 }}
                    animate={{ opacity: 1, scale: 1.15 }}
                    exit={{ opacity: 0 }}
                    className="absolute -inset-8 -z-10 rounded-full pointer-events-none filter blur-xl"
                    style={{
                      background: 'radial-gradient(circle at center, rgba(255,245,220,0.85) 0%, rgba(255,245,220,0.40) 50%, transparent 80%)',
                    }}
                  />
                )}

                {/* LOCAL SOFT READABILITY FIELD */}
                <div
                  className="absolute -inset-3 -z-20 pointer-events-none rounded-2xl transition-opacity duration-300"
                  style={{
                    background: 'radial-gradient(ellipse at center, rgba(255,248,230,0.90) 0%, rgba(255,248,230,0.50) 65%, transparent 100%)',
                  }}
                />

                {/* TYPOGRAPHY COMPOSITION */}
                <div className="relative flex flex-col justify-center">
                  
                  {/* PREFIX NUMBER FORMAT */}
                  {track.numFormat === 'prefix' && (
                    <div className="flex items-baseline space-x-2 sm:space-x-3">
                      <div className="flex items-center space-x-1 font-mono text-xs sm:text-sm font-black text-[#451817]">
                        <span>{track.id}</span>
                        <span className="text-[#FFD700]">/</span>
                      </div>
                      <h3
                        className={`font-display tracking-tight transition-all duration-300 whitespace-nowrap ${track.sizeClass} ${
                          isHovered ? 'text-[#451817] scale-105' : 'text-[#261512] group-hover:text-[#451817]'
                        }`}
                        style={{
                          textShadow: isHovered
                            ? '0 6px 16px rgba(255,255,255,0.95)'
                            : '0 2px 8px rgba(255,255,255,0.85)',
                        }}
                      >
                        {track.title}
                      </h3>
                    </div>
                  )}

                  {/* SUFFIX NUMBER FORMAT */}
                  {track.numFormat === 'suffix' && (
                    <div className="flex items-baseline space-x-2 sm:space-x-3">
                      <h3
                        className={`font-display tracking-tight transition-all duration-300 whitespace-pre-line ${track.sizeClass} ${
                          isHovered ? 'text-[#451817] scale-105' : 'text-[#261512] group-hover:text-[#451817]'
                        }`}
                        style={{
                          textShadow: isHovered
                            ? '0 6px 16px rgba(255,255,255,0.95)'
                            : '0 2px 8px rgba(255,255,255,0.85)',
                        }}
                      >
                        {track.title}
                      </h3>
                      <div className="flex items-center space-x-1 font-mono text-xs sm:text-sm font-black text-[#451817]">
                        <span className="text-[#FFD700]">/</span>
                        <span>{track.id}</span>
                      </div>
                    </div>
                  )}

                  {/* BLOCK NUMBER FORMAT */}
                  {track.numFormat === 'block' && (
                    <div className="flex flex-col items-start space-y-0.5">
                      <div className="flex items-center space-x-1 font-mono text-xs sm:text-sm font-black text-[#451817]">
                        <span>{track.id}</span>
                        <span className="w-6 h-[1.5px] bg-[#FFD700]" />
                      </div>
                      <h3
                        className={`font-display tracking-tight transition-all duration-300 whitespace-nowrap ${track.sizeClass} ${
                          isHovered ? 'text-[#451817] scale-105' : 'text-[#261512] group-hover:text-[#451817]'
                        }`}
                        style={{
                          textShadow: isHovered
                            ? '0 6px 16px rgba(255,255,255,0.95)'
                            : '0 2px 8px rgba(255,255,255,0.85)',
                        }}
                      >
                        {track.title}
                      </h3>
                    </div>
                  )}

                  {/* KATANA SLASH ACCENT ON HOVER */}
                  {isHovered && (
                    <motion.div
                      initial={{ scaleX: 0, opacity: 0 }}
                      animate={{ scaleX: 1, opacity: 1 }}
                      transition={{ duration: 0.25 }}
                      className="h-[2px] w-full bg-gradient-to-r from-[#451817] via-[#FFD700] to-transparent mt-1 origin-left"
                    />
                  )}

                </div>
              </motion.div>
            );
          })}
        </div>

      </motion.div>
    </section>
  );
};

import React, { useRef, useState } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Float, Sparkles } from '@react-three/drei';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';
import { SectionBackground } from '../SectionBackground';
import { backgrounds } from '../../data/backgrounds';

// Partial 3D Katana Detail for Right Side (32–38% Width)
const RightPartialKatana = ({ pointerX, pointerY }) => {
  const katanaRef = useRef();

  useFrame((state, delta) => {
    const t = state.clock.getElapsedTime();
    if (katanaRef.current) {
      katanaRef.current.rotation.z = Math.sin(t * 0.7) * 0.05 - 0.42;
      katanaRef.current.rotation.y = Math.cos(t * 0.5) * 0.06 + 0.30;
      katanaRef.current.position.y = Math.sin(t * 1.0) * 0.05;

      katanaRef.current.rotation.x = pointerY * 0.05;
      katanaGroupRef.current.rotation.y = pointerX * 0.05;
    }
  });

  const katanaGroupRef = useRef();

  return (
    <group ref={katanaGroupRef} position={[2.1, 0, 1.2]} scale={[1.3, 1.3, 1.3]}>
      <group ref={katanaRef}>
        {/* Steel Blade */}
        <mesh position={[0, 0, 0]} rotation={[0, 0, Math.PI / 4]}>
          <boxGeometry args={[4.2, 0.07, 0.016]} />
          <meshStandardMaterial
            color="#ECECEC"
            metalness={0.96}
            roughness={0.12}
            envMapIntensity={3.0}
          />
        </mesh>

        {/* Gold Edge */}
        <mesh position={[0, 0.036, 0.001]} rotation={[0, 0, Math.PI / 4]}>
          <boxGeometry args={[4.22, 0.016, 0.018]} />
          <meshBasicMaterial color="#FFD700" />
        </mesh>

        {/* Tsuba Handguard */}
        <mesh position={[-1.2, 0, 0]} rotation={[0, Math.PI / 2, 0]}>
          <cylinderGeometry args={[0.22, 0.22, 0.03, 24]} />
          <meshStandardMaterial color="#6B221F" metalness={0.85} roughness={0.25} />
        </mesh>

        {/* Handle with Burgundy Wrap */}
        <mesh position={[-1.8, 0, 0]} rotation={[0, 0, Math.PI / 4]}>
          <cylinderGeometry args={[0.08, 0.08, 1.1, 16]} />
          <meshStandardMaterial color="#2B1714" roughness={0.7} />
        </mesh>
      </group>
    </group>
  );
};

// WebGL Scene Container
const Tracks3DScene = ({ mouseXVal, mouseYVal }) => {
  return (
    <Canvas
      camera={{ position: [0, 0, 5.8], fov: 45 }}
      className="absolute inset-0 w-full h-full pointer-events-none z-2"
      gl={{ antialias: true, alpha: true }}
    >
      <ambientLight intensity={0.95} />
      <directionalLight position={[4, 7, 5]} intensity={2.2} color="#FFF5E0" />
      <pointLight position={[-3, 2, 3]} intensity={1.4} color="#4D1917" />
      <pointLight position={[3, -2, 3]} intensity={1.8} color="#FFD700" />

      <Float speed={1.2} rotationIntensity={0.15} floatIntensity={0.25}>
        <RightPartialKatana pointerX={mouseXVal} pointerY={mouseYVal} />
      </Float>

      <Sparkles count={25} scale={7} size={2.0} speed={0.4} color="#FFD700" opacity={0.65} />
      <Sparkles count={18} scale={9} size={1.6} speed={0.5} color="#4D1917" opacity={0.55} />
    </Canvas>
  );
};

// Data for "THE SIX CUTS" Angled Typographic Strips
const trackStrips = [
  {
    id: '01',
    title: 'HEALTHCARE',
    depthZ: 20,
    offsetX: 'ml-0 sm:ml-2',
    slashAngle: '-rotate-1',
  },
  {
    id: '02',
    title: 'ARTIFICIAL INTELLIGENCE & MACHINE LEARNING',
    depthZ: 45,
    offsetX: 'ml-4 sm:ml-12',
    slashAngle: 'rotate-1',
  },
  {
    id: '03',
    title: 'WEB3 & BLOCKCHAIN',
    depthZ: 30,
    offsetX: 'ml-1 sm:ml-4',
    slashAngle: '-rotate-1',
  },
  {
    id: '04',
    title: 'SUSTAINABILITY',
    depthZ: 60,
    offsetX: 'ml-6 sm:ml-16',
    slashAngle: 'rotate-1',
  },
  {
    id: '05',
    title: 'INTERNET OF THINGS (IoT)',
    depthZ: 35,
    offsetX: 'ml-2 sm:ml-8',
    slashAngle: '-rotate-1',
  },
  {
    id: '06',
    title: 'OPEN INNOVATION',
    depthZ: 50,
    offsetX: 'ml-0 sm:ml-3',
    slashAngle: 'rotate-1',
  },
];

export const Tracks3DHub = () => {
  const containerRef = useRef(null);
  const [hoveredIdx, setHoveredIdx] = useState(null);

  // Mouse Pointer Parallax
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const rotateX = useSpring(useTransform(mouseY, [-0.5, 0.5], [2, -2]), { stiffness: 150, damping: 20 });
  const rotateY = useSpring(useTransform(mouseX, [-0.5, 0.5], [-3, 3]), { stiffness: 150, damping: 20 });

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
      style={{ height: 'clamp(560px, 72vh, 680px)' }}
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

      {/* APPROVED BACKGROUND ARTWORK */}
      <SectionBackground
        src={backgrounds.tracks}
        alt="Fantasy Waterfall Realm Tracks Atmosphere"
        overlayOpacity={0.05}
      />

      {/* LOCAL CREAM READABILITY FIELD (STRICTLY ON LEFT 65%, NO VISIBLE BOX EDGE) */}
      <div
        className="absolute inset-y-0 left-0 w-full md:w-[66%] pointer-events-none z-1"
        style={{
          background: 'linear-gradient(to right, rgba(255,248,232,0.96) 0%, rgba(255,248,232,0.72) 40%, rgba(255,248,232,0.20) 65%, transparent 80%)',
        }}
      />

      {/* WebGL 3D Scene */}
      <Tracks3DScene hoveredIndex={hoveredIdx} mouseXVal={mouseX.get()} mouseYVal={mouseY.get()} />

      {/* MASTER LAYOUT STAGE: LEFT 65% (THE SIX CUTS) | RIGHT 35% (ARTWORK) */}
      <motion.div
        style={{ rotateX, rotateY, transformStyle: 'preserve-3d' }}
        className="relative z-10 w-full h-full max-w-[1440px] mx-auto grid grid-cols-1 md:grid-cols-[65%_35%] items-center px-4 sm:px-10"
      >
        
        {/* ==================================================
            LEFT 65% COLUMN: "THE SIX CUTS" TYPOGRAPHIC STRIPS
        ================================================== */}
        <div className="relative w-full py-4 space-y-2 z-10">
          
          {/* COMPACT MINIMAL TITLE: TRACKS */}
          <motion.div
            initial={{ opacity: 0, x: -15 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4 }}
            className="flex items-center space-x-3 mb-3 pl-2"
          >
            <span className="font-display font-black text-xl sm:text-2xl text-[#4D1917] tracking-widest uppercase">
              TRACKS
            </span>
            <div className="h-[2px] w-16 bg-gradient-to-r from-[#4D1917] via-[#FFD700] to-transparent" />
            <span className="w-3.5 h-3.5 rounded-sm bg-[#4D1917] border border-[#FFD700] text-[8px] flex items-center justify-center text-[#FFD700] font-black shadow-sm">
              印
            </span>
          </motion.div>

          {/* THE SIX KATANA-CUT ANGLED STRIPS */}
          <div className="space-y-2.5">
            {trackStrips.map((strip, idx) => {
              const isHovered = hoveredIdx === idx;
              const isOtherHovered = hoveredIdx !== null && !isHovered;

              return (
                <motion.div
                  key={strip.id}
                  initial={{ opacity: 0, x: idx % 2 === 0 ? -30 : 30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: idx * 0.08 }}
                  onMouseEnter={() => setHoveredIdx(idx)}
                  onMouseLeave={() => setHoveredIdx(null)}
                  style={{
                    transform: `translateZ(${isHovered ? strip.depthZ + 30 : isOtherHovered ? strip.depthZ - 10 : strip.depthZ}px)`,
                  }}
                  className={`relative ${strip.offsetX} ${strip.slashAngle} cursor-pointer transition-all duration-300 group max-w-2xl`}
                >
                  {/* KATANA SLASH RIBBON CONTAINER (NO ROUNDED CARDS, SHARP CUT ENDS) */}
                  <div
                    className={`relative px-4 py-2.5 sm:py-3 transition-all duration-300 flex items-center justify-between ${
                      isHovered
                        ? 'bg-[#FFF9EA] border-l-4 border-l-[#FFD700] shadow-[0_8px_25px_rgba(77,25,23,0.18)] translate-x-3 scale-[1.02]'
                        : 'bg-[#FFF5E0]/80 hover:bg-[#FFF9EA] border-l-2 border-l-[#4D1917]/40 shadow-[0_4px_12px_rgba(0,0,0,0.06)]'
                    }`}
                    style={{
                      clipPath: 'polygon(0% 0%, 98% 0%, 100% 100%, 0% 100%)',
                    }}
                  >
                    {/* Metallic Hairline Accent */}
                    <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-[#FFD700] via-[#4D1917]/30 to-transparent" />

                    {/* Strip Left Content */}
                    <div className="flex items-baseline space-x-3 sm:space-x-5">
                      <span className="font-mono text-xs sm:text-sm font-black text-[#4D1917] tracking-wider opacity-85">
                        {strip.id}
                      </span>

                      <h3
                        className={`font-display font-extrabold text-base sm:text-xl lg:text-2xl tracking-tight leading-none transition-colors duration-300 ${
                          isHovered ? 'text-[#4D1917]' : 'text-[#2B1714] group-hover:text-[#4D1917]'
                        }`}
                        style={{
                          textShadow: '0 1px 4px rgba(255,255,255,0.9)',
                        }}
                      >
                        {strip.title}
                      </h3>
                    </div>

                    {/* Katana Slash Symbol on Hover */}
                    <div className="flex items-center space-x-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pl-4">
                      <span className="text-[#FFD700] text-xs">◆</span>
                      <div className="w-8 h-[1.5px] bg-[#4D1917]" />
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>

        </div>

        {/* ==================================================
            RIGHT 35% COLUMN: VISUAL ARTWORK & PARTIAL KATANA
        ================================================== */}
        <div className="hidden md:block relative h-full pointer-events-none">
          {/* Right side background atmosphere & 3D katana blade */}
        </div>

      </motion.div>
    </section>
  );
};

import React, { useState, useEffect, useRef } from 'react';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';
import { SectionBackground } from '../SectionBackground';
import { OrganiserLogos } from '../OrganiserLogos';
import { eventConfig } from '../../data/eventConfig';
import { backgrounds } from '../../data/backgrounds';
import { Ticket, Compass, Flame, MapPin, Calendar } from 'lucide-react';

// Drifting Sakura Petal Particle Component (Hero Only)
const HeroSakuraPetals = () => {
  const petals = Array.from({ length: 18 }, (_, i) => ({
    id: i,
    left: `${Math.random() * 100}%`,
    delay: Math.random() * 5,
    duration: 6 + Math.random() * 6,
    scale: 0.5 + Math.random() * 0.7,
  }));

  return (
    <div className="absolute inset-0 pointer-events-none z-10 overflow-hidden">
      {petals.map((p) => (
        <motion.div
          key={p.id}
          initial={{ y: '-10%', x: 0, rotate: 0, opacity: 0 }}
          animate={{
            y: '110vh',
            x: [0, 25, -20, 15],
            rotate: [0, 180, 360],
            opacity: [0, 0.8, 0.8, 0],
          }}
          transition={{
            duration: p.duration,
            repeat: Infinity,
            delay: p.delay,
            ease: 'linear',
          }}
          style={{ left: p.left, scale: p.scale }}
          className="absolute w-3 h-4 bg-gradient-to-br from-pink-300 via-pink-400 to-rose-500 rounded-full opacity-80 filter blur-[0.3px] shadow-[0_0_6px_rgba(244,114,182,0.8)]"
        />
      ))}
    </div>
  );
};

export const ExplosiveHero3D = () => {
  const [timeLeft, setTimeLeft] = useState({ days: 68, hours: 14, mins: 32, secs: 8 });
  const [slashTriggered, setSlashTriggered] = useState(false);
  const containerRef = useRef(null);

  // Mouse 3D Tilt Values
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const rotateX = useSpring(useTransform(mouseY, [-0.5, 0.5], [10, -10]), { stiffness: 200, damping: 20 });
  const rotateY = useSpring(useTransform(mouseX, [-0.5, 0.5], [-12, 12]), { stiffness: 200, damping: 20 });

  const handleMouseMove = (e) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    mouseX.set(x);
    mouseY.set(y);
  };

  // Trigger initial slash reveal after 400ms
  useEffect(() => {
    const timer = setTimeout(() => {
      setSlashTriggered(true);
    }, 400);
    return () => clearTimeout(timer);
  }, []);

  // Countdown timer tick
  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev.secs > 0) return { ...prev, secs: prev.secs - 1 };
        return { ...prev, secs: 59, mins: (prev.mins || 59) - 1 };
      });
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const titleLetters = ['C', 'O', 'D', 'E', 'S', 'L', 'A', 'Y', 'E', 'R'];

  return (
    <section
      id="hero"
      ref={containerRef}
      onMouseMove={handleMouseMove}
      className="relative w-full min-h-screen overflow-hidden flex flex-col justify-between pt-24 pb-12 select-none"
    >
      {/* 1. FULL-VIEWPORT HERO BACKGROUND (01_sunrise_samurai.png?v=cream2) */}
      <motion.div
        className="absolute inset-0 z-0 pointer-events-none overflow-hidden"
        animate={{
          scale: [1, 1.04, 1],
          x: [0, -8, 0],
          y: [0, -5, 0],
        }}
        transition={{
          duration: 18,
          repeat: Infinity,
          repeatType: 'mirror',
          ease: 'easeInOut',
        }}
      >
        <SectionBackground
          src={backgrounds.hero}
          alt="Sunrise Samurai Hero Atmosphere"
          overlayOpacity={0.08}
        />
      </motion.div>

      {/* 2. FOREGROUND SAKURA PETALS & ATMOSPHERIC FOG */}
      <HeroSakuraPetals />

      {/* Subtle Central Readability Vignette */}
      <div className="absolute inset-0 bg-gradient-to-r from-black/45 via-black/15 to-transparent pointer-events-none z-1" />

      {/* 3. HERO SLASH REVEAL ANIMATION OVERLAY */}
      {slashTriggered && (
        <motion.div
          initial={{ scaleX: 0, opacity: 1 }}
          animate={{ scaleX: [0, 1, 0], opacity: [1, 1, 0] }}
          transition={{ duration: 0.5, ease: 'easeOut' }}
          className="absolute top-1/2 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-yellow-300 to-transparent z-30 shadow-[0_0_30px_#FFD700] pointer-events-none transform -rotate-12"
        />
      )}

      {/* MAIN HERO CONTENT COMPOSITION */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-8 w-full flex-grow flex flex-col justify-between">
        
        {/* TOP ROW: PRESENTATIONAL ORGANISER LOGOS (NO LINKS, NO COUNTERS, NO AUDIO) */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 1.9 }}
          className="flex justify-start sm:justify-center"
        >
          <OrganiserLogos />
        </motion.div>

        {/* MIDDLE CINEMATIC ASYMMETRIC TYPOGRAPHY & DETAILS COMPOSITION */}
        <div className="my-auto grid grid-cols-1 lg:grid-cols-12 gap-8 items-center pt-4 pb-6">
          
          {/* LEFT 7 COLUMNS: MONUMENTAL TITLE & TIMING */}
          <motion.div
            style={{ rotateX, rotateY, transformStyle: 'preserve-3d' }}
            className="lg:col-span-8 text-left space-y-4"
          >
            {/* 36-HOUR HACKATHON BADGE */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 1.2 }}
              className="inline-flex items-center space-x-2 px-4 py-1.5 rounded-lg bg-black/40 border border-yellow-400/60 text-yellow-300 font-mono text-xs sm:text-sm font-black uppercase tracking-widest shadow-[0_0_20px_rgba(234,179,8,0.5)] backdrop-blur-sm"
            >
              <Flame className="w-4 h-4 text-yellow-400 animate-bounce" />
              <span>36-HOUR NATIONAL HACKATHON</span>
            </motion.div>

            {/* CUSTOM HERO TITLE COMPOSITION: CODESLAYER 2.0 */}
            <div className="relative py-2 flex items-center flex-wrap overflow-visible">
              
              {/* Metallic Light Sweep Reflection Layer */}
              <div className="relative flex items-center space-x-0.5 sm:space-x-1">
                {titleLetters.map((char, idx) => (
                  <motion.span
                    key={idx}
                    initial={{ opacity: 0, y: 40, rotateX: 45 }}
                    animate={{ opacity: 1, y: 0, rotateX: 0 }}
                    transition={{ duration: 0.5, delay: 0.55 + idx * 0.04 }}
                    className="font-display font-black text-6xl sm:text-8xl md:text-9xl text-white tracking-tight leading-none drop-shadow-[0_8px_24px_rgba(0,0,0,1)] inline-block relative group"
                  >
                    {char}
                    {/* Metallic Light Streak */}
                    <span className="absolute inset-0 bg-gradient-to-r from-transparent via-yellow-200/40 to-transparent bg-[length:200%_100%] opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none" />
                  </motion.span>
                ))}
              </div>

              {/* JAPANESE RED SEAL MARK: 2.0 */}
              <motion.div
                initial={{ scale: 2, opacity: 0, rotate: -20 }}
                animate={{ scale: 1, opacity: 1, rotate: -6 }}
                transition={{ type: 'spring', stiffness: 250, damping: 15, delay: 0.9 }}
                className="ml-4 px-3.5 py-1 rounded-md bg-gradient-to-br from-crimson-600 via-red-600 to-crimson-bright border-2 border-yellow-300 text-yellow-300 font-mono text-2xl sm:text-4xl font-black shadow-[0_0_30px_rgba(230,0,51,0.9)] drop-shadow-[0_4px_12px_rgba(0,0,0,1)] tracking-widest uppercase inline-block -rotate-6"
              >
                2.0
              </motion.div>
            </div>

            {/* POSTER DATE & VENUE COMPOSITION */}
            <div className="flex flex-wrap items-center gap-6 pt-2">
              
              {/* Poster Date Arrangement */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 1.45 }}
                className="flex items-center space-x-3 text-left"
              >
                <div className="font-display font-black text-4xl sm:text-6xl text-yellow-300 tracking-tighter drop-shadow-[0_4px_16px_rgba(0,0,0,1)] flex items-center">
                  <Calendar className="w-8 h-8 text-yellow-400 mr-2" />
                  <span>24–25</span>
                </div>
                <div className="flex flex-col font-mono text-xs sm:text-sm font-black text-gray-100 tracking-widest uppercase leading-none border-l-2 border-yellow-400/60 pl-3">
                  <span className="text-yellow-400 font-bold">OCTOBER</span>
                  <span className="text-gray-300">2026</span>
                </div>
              </motion.div>

              <div className="hidden sm:block w-px h-10 bg-yellow-500/30" />

              {/* Venue Label */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 1.65 }}
                className="text-left"
              >
                <span className="font-mono text-[10px] uppercase tracking-widest text-amber-400 font-bold block">
                  VENUE & HOST
                </span>
                <div className="font-display font-black text-xl sm:text-3xl text-white tracking-wide flex items-center drop-shadow-[0_4px_12px_rgba(0,0,0,1)]">
                  <MapPin className="w-6 h-6 text-amber-400 mr-1.5" />
                  <span>NIT DELHI</span>
                </div>
              </motion.div>

            </div>

            {/* ACTION CTA — ANGULAR BLADE INSPIRED */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: 2.4 }}
              className="pt-4 flex flex-wrap gap-4"
            >
              <a
                href={eventConfig.links.registration}
                target="_blank"
                rel="noopener noreferrer"
                className="px-8 py-4 rounded-xl font-black text-sm text-black bg-gradient-to-r from-yellow-400 via-amber-400 to-yellow-500 border border-yellow-200 shadow-[0_0_30px_rgba(234,179,8,0.8)] hover:shadow-[0_0_50px_rgba(250,204,21,1)] hover:scale-105 transition-all duration-300 uppercase tracking-wider flex items-center space-x-2"
              >
                <Ticket className="w-5 h-5 text-black" />
                <span>REGISTER NOW</span>
              </a>

              <a
                href="#tracks"
                className="px-8 py-4 rounded-xl font-bold text-sm text-white bg-black/40 border border-yellow-400/60 hover:border-yellow-400 transition-all flex items-center space-x-2 uppercase tracking-wider shadow-lg backdrop-blur-sm hover:scale-105"
              >
                <Compass className="w-5 h-5 text-yellow-400" />
                <span>EXPLORE TRACKS</span>
              </a>
            </motion.div>

          </motion.div>

        </div>

        {/* BOTTOM ROW: INTEGRATED DIGITAL COUNTDOWN TIMER WITH INCREASED VERTICAL SPACING (Point 6, 21, 22) */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 2.1 }}
          className="mt-10 sm:mt-14 max-w-xl mx-auto w-full p-4 sm:p-5 rounded-xl bg-black/35 border border-yellow-400/40 shadow-2xl backdrop-blur-sm"
        >
          <div className="text-[10px] font-mono tracking-widest text-yellow-300 font-bold uppercase mb-2 text-center">
            TIME REMAINING UNTIL IGNITION
          </div>

          <div className="grid grid-cols-4 gap-2 text-center font-mono font-black text-2xl sm:text-4xl text-white">
            <div>
              <span className="drop-shadow-[0_4px_12px_rgba(0,0,0,1)]">{String(timeLeft.days).padStart(3, '0')}</span>
              <span className="block text-[9px] font-normal text-gray-300 uppercase tracking-widest mt-1">DAYS</span>
            </div>
            <div className="border-l border-yellow-500/20">
              <span className="drop-shadow-[0_4px_12px_rgba(0,0,0,1)]">{String(timeLeft.hours).padStart(2, '0')}</span>
              <span className="block text-[9px] font-normal text-gray-300 uppercase tracking-widest mt-1">HOURS</span>
            </div>
            <div className="border-l border-yellow-500/20">
              <span className="drop-shadow-[0_4px_12px_rgba(0,0,0,1)]">{String(timeLeft.mins).padStart(2, '0')}</span>
              <span className="block text-[9px] font-normal text-gray-300 uppercase tracking-widest mt-1">MIN</span>
            </div>
            <div className="border-l border-yellow-500/20">
              <span className="drop-shadow-[0_4px_12px_rgba(0,0,0,1)]">{String(timeLeft.secs).padStart(2, '0')}</span>
              <span className="block text-[9px] font-normal text-gray-300 uppercase tracking-widest mt-1">SEC</span>
            </div>
          </div>

          {/* Thin Katana Progress Line */}
          <div className="w-full h-1 bg-gray-800 rounded-full mt-3 overflow-hidden relative">
            <motion.div
              className="h-full bg-gradient-to-r from-yellow-400 to-crimson-bright shadow-[0_0_10px_#FFD700]"
              animate={{ width: ['0%', '100%'] }}
              transition={{ duration: 60, repeat: Infinity, ease: 'linear' }}
            />
          </div>
        </motion.div>

      </div>
    </section>
  );
};

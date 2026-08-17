import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ParallaxBackground } from '../ParallaxBackground';
import { OrganiserLogos } from '../OrganiserLogos';
import { eventConfig } from '../../data/eventConfig';
import { backgrounds } from '../../data/backgrounds';
import { soundEngine } from '../../utils/audio';
import { Ticket, Compass, Flame, FastForward } from 'lucide-react';

export const ExplosiveHero3D = () => {
  const [step, setStep] = useState(10); // Default to 10 for instant crisp visual rendering of background 01_sunrise_samurai.png
  const [timeLeft, setTimeLeft] = useState({ days: 68, hours: 14, mins: 32, secs: 8 });

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

  const skipIntro = () => {
    soundEngine.playKatanaSlash();
    setStep(10);
  };

  const titleLetters = ['C', 'O', 'D', 'E', 'S', 'L', 'A', 'Y', 'E', 'R'];

  return (
    <section id="hero" className="relative w-full h-screen overflow-hidden bg-[#0B0B0E] flex flex-col justify-between">
      
      {/* HERO BACKGROUND: 01_sunrise_samurai.png (RENDERED UNCONDITIONALLY) */}
      <ParallaxBackground
        imageSrc={backgrounds.hero}
        altText="Sunrise Samurai Hero Atmosphere"
        overlayOpacity={0.10}
      />

      {/* HERO MAIN CONTENT */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-8 pt-32 pb-12 flex-grow flex flex-col justify-between text-center">
        
        {/* Top Organiser Logos */}
        <div className="flex justify-center">
          <OrganiserLogos />
        </div>

        {/* Title & Date Reveal */}
        <div className="my-auto space-y-4">
          
          {/* HIGH CONTRAST PILL BADGE */}
          <div className="inline-flex items-center space-x-2 px-6 py-2.5 rounded-full bg-black/90 border-2 border-yellow-400 text-yellow-300 font-mono text-xs sm:text-sm font-black uppercase tracking-widest shadow-[0_0_30px_rgba(234,179,8,0.9)] drop-shadow-[0_4px_12px_rgba(0,0,0,1)]">
            <Flame className="w-5 h-5 text-yellow-400 animate-bounce" />
            <span>36-HOUR NATIONAL HACKATHON</span>
          </div>

          {/* Staggered Flying Letters: C O D E S L A Y E R */}
          <div className="flex justify-center items-center gap-1 sm:gap-2 my-2 overflow-hidden py-4">
            {titleLetters.map((char, idx) => (
              <motion.span
                key={idx}
                initial={{ opacity: 1, z: 0, y: 0 }}
                className="font-display text-5xl sm:text-9xl font-black text-white tracking-tight leading-none drop-shadow-[0_6px_24px_rgba(0,0,0,1)] inline-block"
              >
                {char}
              </motion.span>
            ))}

            {/* 3D 2.0 Badge */}
            <motion.span
              initial={{ rotateY: 0, scale: 1, opacity: 1 }}
              className="font-mono text-3xl sm:text-5xl text-yellow-400 ml-2 font-black inline-block"
            >
              2.0
            </motion.span>
          </div>

          {/* Tagline Reveal */}
          <p className="font-mono text-xs sm:text-base font-bold text-crimson-bright tracking-[0.3em] uppercase drop-shadow-md">
            CODE • BUILD • SLAY
          </p>

          {/* Date & NIT Delhi Reveal */}
          <p className="font-display text-xl sm:text-3xl font-extrabold text-yellow-300 tracking-wider drop-shadow-[0_4px_16px_rgba(0,0,0,1)]">
            # 24 — 25 OCTOBER 2026 • NIT DELHI
          </p>

          <div className="max-w-2xl mx-auto p-4 rounded-2xl bg-black/80 border border-crimson-500/50 backdrop-blur-md">
            <p className="text-white text-sm sm:text-base font-medium leading-relaxed drop-shadow-md">
              Online PPT Selection Trial followed by an intense 36-hour offline hackathon at National Institute of Technology Delhi.
            </p>
          </div>

          {/* Action CTAs */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
            <a
              href={eventConfig.links.registration}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => soundEngine.playKatanaSlash()}
              className="w-full sm:w-auto px-8 py-4 rounded-xl font-black text-sm text-white bg-gradient-to-r from-crimson-600 via-crimson-500 to-crimson-bright border border-crimson-bright/50 shadow-[0_0_30px_rgba(230,0,51,0.7)] hover:shadow-[0_0_50px_rgba(255,42,85,1)] hover:scale-105 transition-all sword-slash-container uppercase tracking-wider flex items-center justify-center space-x-2"
            >
              <Ticket className="w-5 h-5 text-white" />
              <span>CLAIM BATTLE PASS</span>
            </a>

            <a
              href="#tracks"
              onClick={() => soundEngine.playClick()}
              className="w-full sm:w-auto px-8 py-4 rounded-xl font-bold text-sm text-white bg-black/80 border-2 border-yellow-400/80 hover:border-yellow-400 transition-all flex items-center justify-center space-x-2 uppercase tracking-wider shadow-lg"
            >
              <Compass className="w-5 h-5 text-yellow-400" />
              <span>CHOOSE BATTLEFIELD</span>
            </a>
          </div>
        </div>

        {/* Demon Countdown Timer Bar */}
        <div className="max-w-xl mx-auto w-full p-4 rounded-2xl bg-black/90 border border-crimson-500/50 shadow-2xl backdrop-blur-md">
          <div className="text-[10px] font-mono tracking-widest text-yellow-400 font-bold uppercase mb-2">
            TIME REMAINING UNTIL HACKATHON IGNITION
          </div>
          <div className="grid grid-cols-4 gap-2 text-center font-mono font-black text-xl sm:text-3xl text-white">
            <div>
              <span>{String(timeLeft.days).padStart(3, '0')}</span>
              <span className="block text-[9px] font-normal text-gray-300 uppercase">DAYS</span>
            </div>
            <div>
              <span>{String(timeLeft.hours).padStart(2, '0')}</span>
              <span className="block text-[9px] font-normal text-gray-300 uppercase">HOURS</span>
            </div>
            <div>
              <span>{String(timeLeft.mins).padStart(2, '0')}</span>
              <span className="block text-[9px] font-normal text-gray-300 uppercase">MINS</span>
            </div>
            <div>
              <span>{String(timeLeft.secs).padStart(2, '0')}</span>
              <span className="block text-[9px] font-normal text-gray-300 uppercase">SECS</span>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
};

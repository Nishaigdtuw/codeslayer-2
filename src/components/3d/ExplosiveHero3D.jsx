import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ParallaxBackground } from '../ParallaxBackground';
import { OrganiserLogos } from '../OrganiserLogos';
import { eventConfig } from '../../data/eventConfig';
import { soundEngine } from '../../utils/audio';
import { Ticket, Compass, Flame, FastForward } from 'lucide-react';

export const ExplosiveHero3D = () => {
  const [step, setStep] = useState(0); // 0: black, 1: reflection, 2: rotate & moon, 3: katana slash impact, 4: image split, 5: camera pass-through, 6: CODESLAYER letters, 7: 2.0 rotate, 8: tagline, 9: date & venue reveal, 10: complete
  const [timeLeft, setTimeLeft] = useState({ days: 68, hours: 14, mins: 32, secs: 8 });

  useEffect(() => {
    const sequence = [
      { t: 300, s: 1 },   // 0.30s metallic blade reflection
      { t: 700, s: 2 },   // 0.70s blade rotate & red moon fade
      { t: 1000, s: 3 },  // 1.00s HUGE KATANA SLASH IMPACT FLASH
      { t: 1150, s: 4 },  // 1.15s black screen splits into 3D image planes
      { t: 1450, s: 5 },  // 1.45s camera rushes THROUGH slash opening
      { t: 1700, s: 6 },  // 1.70s CODESLAYER letters fly from Z-depth
      { t: 2200, s: 7 },  // 2.20s 3D 2.0 rotates into position
      { t: 2450, s: 8 },  // 2.45s second streak reveals tagline
      { t: 2700, s: 9 },  // 2.70s date & NIT DELHI reveal
      { t: 3400, s: 10 }, // 3.40s complete, CTAs & Navbar active
    ];

    const timers = sequence.map(({ t, s }) =>
      setTimeout(() => {
        setStep(s);
        if (s === 3 || s === 8) soundEngine.playKatanaSlash();
      }, t)
    );

    return () => timers.forEach(clearTimeout);
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

  const skipIntro = () => {
    soundEngine.playKatanaSlash();
    setStep(10);
  };

  const titleLetters = ['C', 'O', 'D', 'E', 'S', 'L', 'A', 'Y', 'E', 'R'];

  return (
    <section id="hero" className="relative w-full h-screen overflow-hidden bg-[#0B0B0E] flex flex-col justify-between">
      
      {/* FULL-BLEED USER UPLOADED HASHIRA PILLARS BACKGROUND (REVEALED AFTER SLASH) */}
      {step >= 4 && (
        <ParallaxBackground
          imageSrc="/assets/hashira-pillars.jpg"
          altText="Hashira Pillars Standing Together Atmosphere"
          overlayOpacity={0.25}
        />
      )}

      {/* 0.00s–3.40s INSANE OPENING CHOREOGRAPHY OVERLAY */}
      <AnimatePresence>
        {step < 10 && (
          <div className="absolute inset-0 z-30 pointer-events-auto flex flex-col items-center justify-center overflow-hidden">
            
            {/* Step 0–3: Black Screen */}
            {step < 4 && <div className="absolute inset-0 bg-black" />}

            {/* Step 1: Blade Reflection */}
            {step === 1 && (
              <motion.div
                initial={{ opacity: 0, scaleY: 0 }}
                animate={{ opacity: 1, scaleY: 1 }}
                className="w-1.5 h-80 bg-gradient-to-b from-transparent via-slate-100 to-transparent shadow-[0_0_40px_#FFFFFF]"
              />
            )}

            {/* Step 2: Blade Rotation & Red Moon */}
            {step === 2 && (
              <div className="relative flex items-center justify-center">
                <motion.div
                  initial={{ opacity: 0, scale: 0.5 }}
                  animate={{ opacity: 0.8, scale: 1 }}
                  transition={{ duration: 0.3 }}
                  className="w-64 h-64 rounded-full bg-crimson-bright/40 filter blur-3xl"
                />
                <motion.div
                  initial={{ rotate: -45, scale: 0.8 }}
                  animate={{ rotate: 0, scale: 1.1 }}
                  className="w-2 h-96 bg-gradient-to-b from-slate-200 via-white to-crimson-bright shadow-[0_0_50px_#FF2A55]"
                />
              </div>
            )}

            {/* Step 3: HUGE Katana Slash Impact Flash & RGB Split */}
            {step === 3 && (
              <>
                <motion.div
                  initial={{ opacity: 1 }}
                  animate={{ opacity: [1, 0] }}
                  transition={{ duration: 0.1 }}
                  className="absolute inset-0 bg-white"
                />
                <motion.div
                  initial={{ scaleX: 0 }}
                  animate={{ scaleX: 1.8 }}
                  transition={{ duration: 0.15 }}
                  className="w-[180vw] h-8 bg-gradient-to-r from-transparent via-crimson-bright to-transparent transform -rotate-45 shadow-[0_0_80px_#FF2A55]"
                />
              </>
            )}

            {/* Step 4 & 5: 3D Image Planes Split & Camera Pass-Through */}
            {(step === 4 || step === 5) && (
              <div className="absolute inset-0 flex flex-col pointer-events-none">
                <motion.div
                  initial={{ y: 0, z: 0 }}
                  animate={{ y: '-50vh', z: -200 }}
                  transition={{ duration: 0.4 }}
                  className="h-1/2 w-full bg-black border-b-2 border-crimson-bright shadow-2xl"
                />
                <motion.div
                  initial={{ y: 0, z: 0 }}
                  animate={{ y: '50vh', z: 200 }}
                  transition={{ duration: 0.4 }}
                  className="h-1/2 w-full bg-black border-t-2 border-crimson-bright shadow-2xl"
                />
              </div>
            )}

            <button
              onClick={skipIntro}
              className="absolute bottom-12 px-6 py-2.5 rounded-full bg-black/90 border-2 border-yellow-400/80 text-xs font-mono text-yellow-300 flex items-center space-x-2 shadow-[0_0_20px_rgba(234,179,8,0.8)] z-40"
            >
              <span>SKIP INTRO</span>
              <FastForward className="w-4 h-4 text-yellow-400" />
            </button>
          </div>
        )}
      </AnimatePresence>

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
                initial={{ opacity: 0, z: -300, y: (idx % 2 === 0 ? 50 : -50) }}
                animate={{
                  opacity: step >= 6 ? 1 : 0,
                  z: step >= 6 ? 0 : -300,
                  y: step >= 6 ? 0 : (idx % 2 === 0 ? 50 : -50)
                }}
                transition={{ duration: 0.4, delay: idx * 0.04 }}
                className="font-display text-5xl sm:text-9xl font-black text-white tracking-tight leading-none drop-shadow-[0_6px_24px_rgba(0,0,0,1)] inline-block"
              >
                {char}
              </motion.span>
            ))}

            {/* Huge 3D 2.0 Rotate in */}
            <motion.span
              initial={{ rotateY: 180, scale: 0.2, opacity: 0 }}
              animate={{
                rotateY: step >= 7 ? 0 : 180,
                scale: step >= 7 ? 1 : 0.2,
                opacity: step >= 7 ? 1 : 0
              }}
              transition={{ type: 'spring', stiffness: 200, damping: 15 }}
              className="font-mono text-3xl sm:text-5xl text-yellow-400 ml-2 font-black inline-block"
            >
              2.0
            </motion.span>
          </div>

          {/* Tagline Reveal */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: step >= 8 ? 1 : 0, y: step >= 8 ? 0 : 20 }}
            className="font-mono text-xs sm:text-base font-bold text-crimson-bright tracking-[0.3em] uppercase drop-shadow-md"
          >
            CODE • BUILD • SLAY
          </motion.p>

          {/* Date & NIT Delhi Reveal */}
          <motion.p
            initial={{ y: 30, opacity: 0 }}
            animate={{ y: step >= 9 ? 0 : 30, opacity: step >= 9 ? 1 : 0 }}
            transition={{ duration: 0.5 }}
            className="font-display text-xl sm:text-3xl font-extrabold text-yellow-300 tracking-wider drop-shadow-[0_4px_16px_rgba(0,0,0,1)]"
          >
            # 24 — 25 OCTOBER 2026 • NIT DELHI
          </motion.p>

          <div className="max-w-2xl mx-auto p-4 rounded-2xl bg-black/90 border border-crimson-500/50 backdrop-blur-md">
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

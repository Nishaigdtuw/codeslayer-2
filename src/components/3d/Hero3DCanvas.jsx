import React, { useState, useEffect } from 'react';
import { Canvas } from '@react-three/fiber';
import { Float, Sparkles, Text } from '@react-three/drei';
import { motion, AnimatePresence } from 'framer-motion';
import { KatanaModel } from './KatanaModel';
import { OrganiserLogos } from '../OrganiserLogos';
import { eventConfig } from '../../data/eventConfig';
import { soundEngine } from '../../utils/audio';
import { Ticket, Compass, Flame, FastForward } from 'lucide-react';

export const Hero3DCanvas = () => {
  const [isIntro, setIsIntro] = useState(true);
  const [introProgress, setIntroProgress] = useState(0);
  const [timeLeft, setTimeLeft] = useState({ days: 68, hours: 14, mins: 32, secs: 8 });

  // 2.5s Opening Sequence Timer
  useEffect(() => {
    let start = performance.now();
    const duration = 2500;

    const animateIntro = (now) => {
      const elapsed = now - start;
      const progress = Math.min(elapsed / duration, 1);
      setIntroProgress(progress);

      if (progress < 1 && isIntro) {
        requestAnimationFrame(animateIntro);
      } else if (isIntro) {
        setIsIntro(false);
        soundEngine.playKatanaSlash();
      }
    };

    const req = requestAnimationFrame(animateIntro);
    return () => cancelAnimationFrame(req);
  }, []);

  // Demon Countdown Timer Tick
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
    setIsIntro(false);
  };

  return (
    <section id="hero" className="relative w-full h-screen overflow-hidden bg-[#0B0B0E] flex flex-col justify-between">
      
      {/* 3D WebGL Canvas Layer */}
      <div className="absolute inset-0 z-0">
        <Canvas camera={{ position: [0, 0, 7], fov: 50 }}>
          {/* Lighting */}
          <ambientLight intensity={0.4} />
          <directionalLight position={[5, 5, 5]} intensity={1.5} color="#FF2A55" />
          <pointLight position={[-5, -3, 2]} intensity={2} color="#FFD700" />

          {/* 3D Katana Blade Model */}
          <Float speed={1.5} rotationIntensity={0.2} floatIntensity={0.4}>
            <KatanaModel isIntro={isIntro} introProgress={introProgress} />
          </Float>

          {/* Spatial 3D Floating Particles & Embers */}
          <Sparkles count={120} scale={10} size={4} speed={0.4} color="#FF2A55" />
          <Sparkles count={60} scale={8} size={3} speed={0.6} color="#FFD700" />

          {/* Spatial 3D Extruded Date Text Fly-Through */}
          {!isIntro && (
            <group position={[0, -2, -2]}>
              <Text
                font="/fonts/Outfit-Bold.ttf"
                fontSize={0.8}
                color="#FF2A55"
                anchorX="center"
                anchorY="middle"
              >
                24 - 25 OCT 2026
              </Text>
            </group>
          )}
        </Canvas>
      </div>

      {/* Background Realm Image Atmosphere Fallback */}
      <div className="absolute inset-0 z-[1] pointer-events-none">
        <img
          src="/assets/hero-bg.png"
          alt="Blood Moon Castle Atmosphere"
          className="w-full h-full object-cover filter contrast-125 brightness-50 opacity-30"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-[#0B0B0E]/80 via-transparent to-[#0B0B0E]" />
      </div>

      {/* Opening Intro Katana Slash Overlay */}
      <AnimatePresence>
        {isIntro && (
          <motion.div
            exit={{ opacity: 0, scale: 1.1 }}
            transition={{ duration: 0.4 }}
            className="absolute inset-0 z-30 bg-black/90 flex flex-col items-center justify-center pointer-events-auto"
          >
            <div className="relative text-center px-4">
              <motion.div
                initial={{ scaleX: 0 }}
                animate={{ scaleX: introProgress }}
                className="w-48 h-1 bg-crimson-bright mx-auto mb-6 shadow-[0_0_20px_#FF2A55]"
              />
              <span className="font-mono text-xs text-red-400 uppercase tracking-[0.3em] block mb-2">
                DRAWING THE BLADE...
              </span>
              <h1 className="font-display text-4xl sm:text-6xl font-black text-white tracking-widest">
                CODE<span className="text-crimson-bright text-glow-crimson">SLAYER</span> 2.0
              </h1>

              <button
                onClick={skipIntro}
                className="mt-8 inline-flex items-center space-x-2 px-5 py-2 rounded-full bg-crimson-950/60 border border-crimson-bright/40 text-xs font-mono text-white hover:bg-crimson-800 transition-colors"
              >
                <span>SKIP INTRO</span>
                <FastForward className="w-3.5 h-3.5 text-crimson-bright" />
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Hero Foreground Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-8 pt-32 pb-12 flex-grow flex flex-col justify-between text-center">
        
        {/* Top Organiser Logos Strip */}
        <div className="flex justify-center">
          <OrganiserLogos />
        </div>

        {/* Main Title & Poster Typography */}
        <div className="my-auto space-y-4">
          <div className="inline-flex items-center space-x-2 px-4 py-1.5 rounded-full bg-crimson-500/20 border border-crimson-bright/40 text-red-300 font-mono text-xs uppercase tracking-widest">
            <Flame className="w-4 h-4 text-crimson-bright animate-bounce" />
            <span>36-HOUR NATIONAL HACKATHON</span>
          </div>

          <h1 className="font-display text-5xl sm:text-9xl font-black text-white tracking-tight leading-none drop-shadow-2xl">
            CODE<span className="text-crimson-bright text-glow-crimson">SLAYER</span> <span className="font-mono text-3xl sm:text-5xl text-yellow-400">2.0</span>
          </h1>

          <p className="font-display text-xl sm:text-3xl font-extrabold text-slate-200 tracking-wider">
            # 24 — 25 OCTOBER 2026 • NIT DELHI
          </p>

          <p className="text-gray-300 text-sm sm:text-lg max-w-2xl mx-auto font-light leading-relaxed">
            Online PPT Selection Trial followed by an intense 36-hour offline hackathon at National Institute of Technology Delhi.
          </p>

          {/* Action Buttons */}
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
              className="w-full sm:w-auto px-8 py-4 rounded-xl font-bold text-sm text-gray-200 bg-surface/80 border border-crimson-500/30 hover:border-crimson-bright hover:text-white transition-all flex items-center justify-center space-x-2 uppercase tracking-wider"
            >
              <Compass className="w-5 h-5 text-crimson-bright" />
              <span>CHOOSE BATTLEFIELD</span>
            </a>
          </div>
        </div>

        {/* Demon Countdown Timer Bar */}
        <div className="max-w-xl mx-auto w-full p-4 rounded-2xl bg-anime-glass border border-crimson-500/30">
          <div className="text-[10px] font-mono tracking-widest text-crimson-bright uppercase mb-2">
            TIME REMAINING UNTIL HACKATHON IGNITION
          </div>
          <div className="grid grid-cols-4 gap-2 text-center font-mono font-black text-xl sm:text-3xl text-white">
            <div>
              <span>{String(timeLeft.days).padStart(3, '0')}</span>
              <span className="block text-[9px] font-normal text-gray-400 uppercase">DAYS</span>
            </div>
            <div>
              <span>{String(timeLeft.hours).padStart(2, '0')}</span>
              <span className="block text-[9px] font-normal text-gray-400 uppercase">HOURS</span>
            </div>
            <div>
              <span>{String(timeLeft.mins).padStart(2, '0')}</span>
              <span className="block text-[9px] font-normal text-gray-400 uppercase">MINS</span>
            </div>
            <div>
              <span>{String(timeLeft.secs).padStart(2, '0')}</span>
              <span className="block text-[9px] font-normal text-gray-400 uppercase">SECS</span>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
};

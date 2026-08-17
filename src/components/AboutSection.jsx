import React from 'react';
import { motion } from 'framer-motion';
import { SectionBackground } from './SectionBackground';
import { backgrounds } from '../data/backgrounds';

export const AboutSection = () => {
  return (
    <section id="about" className="relative min-h-screen py-32 px-4 sm:px-8 overflow-hidden flex flex-col justify-center">
      
      {/* VISUAL HERO BACKGROUND: 02_bamboo_forest.png */}
      <SectionBackground
        src={backgrounds.about}
        alt="Bright Moonlit Bamboo Forest Atmosphere"
        overlayOpacity={0.10}
      />

      {/* Local Text Readability Gradient on Left */}
      <div className="absolute left-0 top-0 bottom-0 w-full sm:w-2/3 bg-gradient-to-r from-black/40 via-black/15 to-transparent pointer-events-none z-0" />

      <div className="relative z-10 max-w-7xl mx-auto w-full">
        <div className="katana-divider mb-16" />

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* LEFT GIANT EDITORIAL TYPOGRAPHY # 36 HOURS */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="lg:col-span-5 text-left p-6 sm:p-8 rounded-xl bg-black/15 border border-emerald-400/30 backdrop-blur-sm shadow-2xl"
          >
            <span className="font-mono text-xs uppercase tracking-[0.3em] text-emerald-300 font-bold px-4 py-1.5 bg-emerald-950/60 border border-emerald-400/40 rounded-full inline-block mb-4">
              REALM 02 • THE BATTLE
            </span>

            <div className="font-display font-black text-7xl sm:text-9xl text-white tracking-tight leading-none my-4 drop-shadow-[0_6px_24px_rgba(0,0,0,1)]">
              # <span className="text-emerald-400 text-glow-white">36</span>
              <span className="block text-4xl sm:text-6xl text-emerald-300 drop-shadow-md">HOURS</span>
            </div>

            <p className="font-mono text-sm text-emerald-300 font-bold tracking-widest uppercase drop-shadow-md">
              OF UNINTERRUPTED CREATION & CODE
            </p>
          </motion.div>

          {/* RIGHT EDITORIAL TEXT & INTEGRATED METRICS */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="lg:col-span-7 space-y-6 text-left p-6 sm:p-8 rounded-xl bg-black/15 border border-emerald-400/30 backdrop-blur-sm shadow-2xl"
          >
            <h2 className="font-display text-4xl sm:text-6xl font-black text-white tracking-tight leading-tight drop-shadow-[0_4px_16px_rgba(0,0,0,1)]">
              ENTER THE <span className="text-emerald-400 text-glow-white">BATTLEFIELD</span> OF INNOVATION
            </h2>

            <p className="text-white text-base sm:text-xl font-medium leading-relaxed drop-shadow-[0_2px_8px_rgba(0,0,0,0.9)]">
              CodeSlayer 2.0 is not a standard hackathon. Organised by <strong className="text-emerald-300 font-bold">DevSphereIndia</strong> in association with <strong className="text-emerald-300 font-bold">NIT Delhi</strong>, it is a high-stakes arena where 500+ top developers compete across 6 breathing style domains.
            </p>

            {/* INTEGRATED METRICS */}
            <div className="grid grid-cols-3 gap-6 pt-6 border-t border-emerald-500/30">
              <div>
                <div className="font-display font-black text-3xl sm:text-5xl text-white drop-shadow-[0_4px_12px_rgba(0,0,0,1)]">6</div>
                <span className="font-mono text-[10px] sm:text-xs text-emerald-300 font-bold uppercase tracking-widest block drop-shadow-md">
                  REALM TRACKS
                </span>
              </div>

              <div>
                <div className="font-display font-black text-3xl sm:text-5xl text-white drop-shadow-[0_4px_12px_rgba(0,0,0,1)]">36</div>
                <span className="font-mono text-[10px] sm:text-xs text-crimson-bright font-bold uppercase tracking-widest block drop-shadow-md">
                  BUILDING HOURS
                </span>
              </div>

              <div>
                <div className="font-display font-black text-3xl sm:text-5xl text-white drop-shadow-[0_4px_12px_rgba(0,0,0,1)]">1</div>
                <span className="font-mono text-[10px] sm:text-xs text-yellow-300 font-bold uppercase tracking-widest block drop-shadow-md">
                  NIT DELHI ARENA
                </span>
              </div>
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
};

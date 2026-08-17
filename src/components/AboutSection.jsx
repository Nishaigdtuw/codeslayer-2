import React from 'react';
import { motion } from 'framer-motion';
import { SectionBackground } from './SectionBackground';
import { backgrounds } from '../data/backgrounds';

export const AboutSection = () => {
  return (
    <section id="about" className="relative py-16 sm:py-24 px-4 sm:px-8 overflow-hidden select-none">
      
      {/* VISUAL HERO BACKGROUND: 02_bamboo_forest.png?v=cream2 */}
      <SectionBackground
        src={backgrounds.about}
        alt="Bright Moonlit Bamboo Forest Atmosphere"
        overlayOpacity={0.08}
      />

      {/* Subtle Local Text Readability Gradient */}
      <div className="absolute left-0 top-0 bottom-0 w-full sm:w-2/3 bg-gradient-to-r from-black/45 via-black/15 to-transparent pointer-events-none z-0" />

      <div className="relative z-10 max-w-5xl mx-auto w-full text-left">
        
        {/* Thin Katana Divider Line */}
        <div className="katana-divider mb-8" />

        {/* Small Label */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="font-mono text-xs uppercase tracking-[0.3em] text-emerald-300 font-bold mb-3 flex items-center space-x-2"
        >
          <span className="px-3 py-1 bg-black/40 border border-emerald-400/40 rounded-full backdrop-blur-sm shadow-md">
            02 / ABOUT
          </span>
        </motion.div>

        {/* Main Heading: ABOUT CODESLAYER 2.0 */}
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="font-display text-3xl sm:text-5xl font-black text-white tracking-tight leading-tight mb-6 drop-shadow-[0_4px_16px_rgba(0,0,0,1)]"
        >
          ABOUT <span className="text-emerald-400 text-glow-white">CODESLAYER 2.0</span>
        </motion.h2>

        {/* Exact Content Paragraph — DIRECTLY OVER ARTWORK */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="text-white text-base sm:text-lg font-medium leading-relaxed max-w-3xl drop-shadow-[0_2px_10px_rgba(0,0,0,0.9)]"
        >
          CodeSlayer 2.0 is the second edition of CodeSlayer, a 36-hour hackathon by DevSphereIndia, bringing student developers and innovators together at NIT Delhi on 24–25 October 2026. Building on the first edition, CodeSlayer returns with a bigger platform for teams to build, compete, and showcase their work.
        </motion.p>

      </div>
    </section>
  );
};

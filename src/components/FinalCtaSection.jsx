import React from 'react';
import { motion } from 'framer-motion';
import { SectionBackground } from './SectionBackground';
import { eventConfig } from '../data/eventConfig';
import { backgrounds } from '../data/backgrounds';
import { soundEngine } from '../utils/audio';
import { Ticket, Sparkles, MapPin, Calendar } from 'lucide-react';

export const FinalCtaSection = () => {
  return (
    <section className="relative min-h-screen py-32 px-4 sm:px-8 overflow-hidden flex flex-col justify-center">
      
      {/* FINAL CTA BACKGROUND: 09_sunrise_cliff_samurai.png */}
      <SectionBackground
        src={backgrounds.finalCTA}
        alt="Sunrise Cliff Samurai Final CTA Atmosphere"
        overlayOpacity={0.10}
      />

      <div className="relative z-10 max-w-5xl mx-auto text-center flex flex-col items-center py-12 w-full">
        
        {/* Section Pill Badge */}
        <motion.span
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="font-mono text-xs uppercase tracking-[0.3em] text-yellow-300 font-bold px-4 py-2 bg-black/80 border border-yellow-400/50 rounded-full inline-block mb-6 shadow-lg backdrop-blur-md"
        >
          SCENE 09 • THE FINAL CALL TO ARMS
        </motion.span>

        <motion.h2
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="font-display text-5xl sm:text-9xl font-black text-white tracking-tight leading-none mb-6 drop-shadow-[0_6px_24px_rgba(0,0,0,1)]"
        >
          READY TO <span className="text-yellow-400 text-glow-white">ENTER?</span>
        </motion.h2>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="inline-flex items-center space-x-2 px-6 py-2.5 rounded-full bg-black/80 border-2 border-yellow-400 text-yellow-300 font-mono text-xs sm:text-sm font-black uppercase tracking-widest mb-8 shadow-[0_0_30px_rgba(234,179,8,0.9)] backdrop-blur-md"
        >
          <Sparkles className="w-5 h-5 text-yellow-400 animate-spin" />
          <span>REGISTRATIONS: 20 AUGUST – 6 OCTOBER 2026</span>
        </motion.div>

        {/* Venue & Dates Box */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="max-w-xl mx-auto p-6 rounded-3xl bg-black/65 border-2 border-amber-500/60 backdrop-blur-md shadow-2xl space-y-3 mb-10 text-left"
        >
          <div className="flex items-center space-x-3 text-white font-bold text-sm sm:text-base">
            <Calendar className="w-5 h-5 text-yellow-400 flex-shrink-0" />
            <span>24–25 October 2026 (36-Hour Offline Finale)</span>
          </div>
          <div className="flex items-center space-x-3 text-gray-200 font-medium text-xs sm:text-sm">
            <MapPin className="w-5 h-5 text-amber-400 flex-shrink-0" />
            <span>National Institute of Technology (NIT) Delhi</span>
          </div>
        </motion.div>

        {/* Monumental REGISTER NOW CTA */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="flex flex-col items-center"
        >
          <a
            href={eventConfig.links.registration}
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => soundEngine.playKatanaSlash()}
            className="px-12 py-6 rounded-2xl font-black text-xl text-black bg-gradient-to-r from-amber-500 via-yellow-400 to-amber-500 border-2 border-yellow-300 shadow-[0_0_60px_rgba(234,179,8,0.9)] hover:shadow-[0_0_90px_rgba(250,204,21,1)] hover:scale-105 transition-all flex items-center space-x-3 sword-slash-container uppercase tracking-wider"
          >
            <Ticket className="w-7 h-7 text-black" />
            <span>REGISTER NOW</span>
          </a>

          <p className="font-mono text-xs text-gray-300 mt-4 tracking-wider">
            Registration closes 6 October 2026 • Free of Cost
          </p>
        </motion.div>

      </div>
    </section>
  );
};

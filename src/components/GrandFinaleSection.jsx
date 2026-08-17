import React from 'react';
import { motion } from 'framer-motion';
import { eventConfig } from '../data/eventConfig';
import { soundEngine } from '../utils/audio';
import { BattlePassTicket3D } from './BattlePassTicket3D';
import { DrawBladeInteraction } from './DrawBladeInteraction';
import { MapPin, Calendar, Clock, Compass } from 'lucide-react';

export const GrandFinaleSection = () => {
  return (
    <section id="finale" className="py-28 px-4 sm:px-8 relative z-20 overflow-hidden bg-[#0B0B0E]">
      
      {/* Background Graphic Artwork */}
      <div className="absolute inset-0 z-0">
        <img
          src="/assets/nit-delhi.png"
          alt="NIT Delhi Battlefield Campus"
          className="w-full h-full object-cover filter contrast-125 brightness-60 opacity-40"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-[#0B0B0E] via-transparent to-[#0B0B0E]" />
      </div>

      <div className="relative z-10 max-w-6xl mx-auto text-center">
        <div className="katana-divider mb-16" />

        {/* Coordinates Reveal Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="space-y-3 mb-10"
        >
          <span className="font-mono text-xs uppercase tracking-[0.3em] text-crimson-bright font-bold px-3.5 py-1.5 bg-crimson-500/20 border border-crimson-bright/40 rounded-full inline-flex items-center gap-2">
            <Compass className="w-4 h-4 animate-spin" />
            THE COORDINATES HAVE BEEN REVEALED
          </span>

          {/* Animated Red Line Vector Map Pointer */}
          <div className="w-full max-w-md mx-auto my-4 h-0.5 bg-gray-800 relative overflow-hidden">
            <motion.div
              initial={{ scaleX: 0 }}
              whileInView={{ scaleX: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 1, ease: 'easeInOut' }}
              className="h-full bg-gradient-to-r from-transparent via-crimson-bright to-transparent shadow-[0_0_15px_#FF2A55]"
            />
          </div>

          <h2 className="font-display text-5xl sm:text-8xl font-black text-white tracking-tight leading-none">
            NIT <span className="text-crimson-bright text-glow-crimson">DELHI</span>
          </h2>
          <p className="font-mono text-sm sm:text-lg text-red-400 font-bold tracking-[0.2em] uppercase mt-2">
            24–25 OCTOBER 2026 • 36-HOUR OFFLINE GRAND FINALE
          </p>
        </motion.div>

        <p className="text-gray-300 text-base sm:text-xl font-light leading-relaxed max-w-2xl mx-auto mb-12">
          Shortlisted finalist teams will gather at National Institute of Technology (NIT) Delhi for 36 continuous hours of building, expert mentorship, debugging, innovation, and direct pitch presentations.
        </p>

        {/* Interactive Unsheathe Katana Slider Challenge */}
        <DrawBladeInteraction />

        {/* Interactive 3D Japanese Train / Hackathon Ticket Pass */}
        <BattlePassTicket3D />

      </div>
    </section>
  );
};

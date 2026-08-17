import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { eventConfig } from '../data/eventConfig';
import { soundEngine } from '../utils/audio';
import { SponsorModal } from './SponsorModal';
import { Handshake, Plus } from 'lucide-react';

export const SponsorsSection = () => {
  const [modalOpen, setModalOpen] = useState(false);

  return (
    <section id="sponsors" className="py-24 px-4 sm:px-8 relative z-20 max-w-7xl mx-auto">
      <div className="katana-divider mb-16" />

      <div className="text-center max-w-3xl mx-auto mb-16">
        <span className="text-crimson-bright font-mono text-xs uppercase tracking-widest px-3 py-1 bg-crimson-500/10 border border-crimson-bright/30 rounded-lg">
          Official Ecosystem
        </span>
        <h2 className="font-display text-4xl sm:text-6xl font-extrabold text-white mt-4 tracking-tight">
          Powered by <span className="text-crimson-bright text-glow-crimson">Allies</span>
        </h2>
        <p className="text-gray-300 text-base sm:text-lg mt-3">
          Our industry partners empowering the next generation of builders.
        </p>
      </div>

      {/* Tiered Sponsor Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 mb-12">
        {eventConfig.sponsors.map((sp, idx) => (
          <motion.div
            key={sp.tier + idx}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, delay: idx * 0.1 }}
            onMouseEnter={() => soundEngine.playClick()}
            className="p-6 rounded-2xl bg-anime-glass border border-crimson-500/20 hover:border-crimson-bright transition-all group interactive-card text-center flex flex-col justify-between"
          >
            <div>
              <span className="font-mono text-[10px] uppercase font-bold text-crimson-bright px-2.5 py-1 bg-crimson-500/20 rounded border border-crimson-bright/30">
                {sp.tier}
              </span>
              
              <div className="my-6 p-6 rounded-xl bg-surface/80 border border-gray-800 flex items-center justify-center font-display text-xl font-bold text-gray-300 group-hover:text-white group-hover:border-crimson-500/50 transition-colors">
                {sp.logo}
              </div>
            </div>

            <p className="text-xs font-mono text-gray-400">{sp.desc}</p>
          </motion.div>
        ))}
      </div>

      {/* Become a Sponsor CTA Bar */}
      <div className="p-8 rounded-3xl bg-gradient-to-r from-crimson-950/60 via-surface to-crimson-950/60 border border-crimson-bright/40 flex flex-col sm:flex-row items-center justify-between gap-6 text-center sm:text-left">
        <div>
          <h3 className="font-display text-2xl font-bold text-white">Want to partner with CodeSlayer 2.0?</h3>
          <p className="text-sm text-gray-300 mt-1">Sponsor tracks, provide cloud bounties, or mentor top hackers.</p>
        </div>
        <button
          onClick={() => {
            soundEngine.playKatanaSlash();
            setModalOpen(true);
          }}
          className="px-8 py-4 rounded-xl font-bold text-sm text-white bg-gradient-to-r from-crimson-600 to-crimson-bright shadow-[0_0_20px_rgba(230,0,51,0.5)] hover:shadow-[0_0_35px_rgba(255,42,85,0.8)] hover:scale-105 transition-all flex items-center space-x-2 sword-slash-container shrink-0"
        >
          <Handshake className="w-4 h-4" />
          <span>Become a Sponsor</span>
        </button>
      </div>

      <SponsorModal isOpen={modalOpen} onClose={() => setModalOpen(false)} />
    </section>
  );
};

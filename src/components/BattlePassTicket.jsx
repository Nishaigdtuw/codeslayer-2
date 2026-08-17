import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { eventConfig } from '../data/eventConfig';
import { soundEngine } from '../utils/audio';
import { Ticket, MapPin, Calendar, Clock, Flame, Shield, ArrowRight } from 'lucide-react';

export const BattlePassTicket = () => {
  const [rotate, setRotate] = useState({ x: 0, y: 0 });

  const handleMouseMove = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;
    setRotate({ x: -y / 15, y: x / 15 });
  };

  const handleMouseLeave = () => {
    setRotate({ x: 0, y: 0 });
  };

  return (
    <div className="w-full max-w-2xl mx-auto my-12 perspective-1000">
      <motion.div
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        animate={{ rotateX: rotate.x, rotateY: rotate.y }}
        transition={{ type: 'spring', stiffness: 300, damping: 20 }}
        className="relative rounded-3xl bg-gradient-to-r from-[#181524] via-[#121118] to-[#181524] border-2 border-crimson-bright p-6 sm:p-8 shadow-[0_0_50px_rgba(230,0,51,0.4)] overflow-hidden cursor-pointer group"
      >
        {/* Japanese Hanko Seal Background Watermark */}
        <div className="absolute -right-8 -bottom-8 w-48 h-48 rounded-full border-4 border-crimson-bright/20 flex items-center justify-center font-display font-black text-crimson-bright/10 text-6xl rotate-12 pointer-events-none select-none">
          勝 斬
        </div>

        {/* Perforated Ticket Side Notches */}
        <div className="absolute top-1/2 -left-4 w-8 h-8 rounded-full bg-[#0B0B0E] border-r-2 border-crimson-bright transform -translate-y-1/2" />
        <div className="absolute top-1/2 -right-4 w-8 h-8 rounded-full bg-[#0B0B0E] border-l-2 border-crimson-bright transform -translate-y-1/2" />

        {/* Ticket Header */}
        <div className="flex items-center justify-between pb-4 border-b border-dashed border-crimson-bright/40 mb-6 px-4">
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 rounded-lg bg-crimson-600 flex items-center justify-center text-white font-bold">
              <Flame className="w-5 h-5" />
            </div>
            <div>
              <span className="font-display font-black text-lg text-white tracking-widest">CODESLAYER 2.0</span>
              <p className="text-[9px] font-mono text-gray-400 uppercase tracking-widest -mt-1">
                OFFICIAL BATTLE PASS
              </p>
            </div>
          </div>

          <span className="font-mono text-xs text-crimson-bright font-bold px-3 py-1 bg-crimson-500/20 rounded border border-crimson-bright/30">
            PASS #2026-FINAL
          </span>
        </div>

        {/* Ticket Content Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 px-4 mb-6 text-left">
          <div>
            <span className="font-mono text-[10px] text-gray-400 uppercase tracking-widest block mb-1">DATE</span>
            <p className="font-display font-bold text-white text-sm sm:text-base flex items-center gap-1.5">
              <Calendar className="w-4 h-4 text-crimson-bright" />
              24–25 OCT 2026
            </p>
          </div>

          <div>
            <span className="font-mono text-[10px] text-gray-400 uppercase tracking-widest block mb-1">LOCATION</span>
            <p className="font-display font-bold text-white text-sm sm:text-base flex items-center gap-1.5">
              <MapPin className="w-4 h-4 text-crimson-bright" />
              NIT DELHI
            </p>
          </div>

          <div>
            <span className="font-mono text-[10px] text-gray-400 uppercase tracking-widest block mb-1">DURATION</span>
            <p className="font-display font-bold text-white text-sm sm:text-base flex items-center gap-1.5">
              <Clock className="w-4 h-4 text-crimson-bright" />
              36 HOURS
            </p>
          </div>
        </div>

        {/* Ticket Footer Bar & CTA */}
        <div className="pt-4 border-t border-dashed border-crimson-bright/40 flex flex-col sm:flex-row items-center justify-between gap-4 px-4">
          <div className="text-left">
            <span className="font-mono text-[9px] text-gray-400 uppercase tracking-widest">ORGANISED BY</span>
            <p className="font-display font-bold text-xs text-white">DevSphereIndia</p>
          </div>

          <a
            href={eventConfig.links.registration}
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => soundEngine.playKatanaSlash()}
            className="w-full sm:w-auto px-6 py-3 rounded-xl bg-gradient-to-r from-crimson-600 to-crimson-bright font-bold text-xs text-white shadow-[0_0_20px_rgba(230,0,51,0.6)] group-hover:scale-105 transition-all flex items-center justify-center space-x-2 sword-slash-container"
          >
            <Ticket className="w-4 h-4" />
            <span>CLAIM YOUR BATTLE PASS</span>
            <ArrowRight className="w-4 h-4" />
          </a>
        </div>
      </motion.div>
    </div>
  );
};

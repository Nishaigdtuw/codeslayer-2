import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { eventConfig } from '../data/eventConfig';
import { soundEngine } from '../utils/audio';
import { Ticket, Flame, MapPin, Calendar, CheckCircle2 } from 'lucide-react';

export const BattlePassTicket3D = () => {
  const [flipped, setFlipped] = useState(false);
  const [rot, setRot] = useState({ x: 0, y: 0 });

  const handleMouseMove = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;
    setRot({ x: -y * 0.05, y: x * 0.05 });
  };

  const handleMouseLeave = () => {
    setRot({ x: 0, y: 0 });
  };

  return (
    <div className="w-full max-w-xl mx-auto my-12 perspective-1000">
      <motion.div
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        onClick={() => {
          soundEngine.playClick();
          setFlipped(!flipped);
        }}
        animate={{
          rotateX: rot.x,
          rotateY: flipped ? 180 + rot.y : rot.y,
        }}
        transition={{ type: 'spring', stiffness: 400, damping: 30 }}
        className="w-full h-80 rounded-3xl bg-gradient-to-r from-[#1c121e] via-[#120e18] to-[#1c121e] border-2 border-crimson-bright/60 shadow-[0_0_50px_rgba(230,0,51,0.5)] p-6 cursor-pointer relative overflow-hidden flex flex-col justify-between text-left transform-style-3d interactive-card"
      >
        {/* Japanese Perforated Ticket Notches */}
        <div className="absolute top-1/2 -left-4 w-8 h-8 rounded-full bg-[#0B0B0E] border-2 border-crimson-bright/60 transform -translate-y-1/2" />
        <div className="absolute top-1/2 -right-4 w-8 h-8 rounded-full bg-[#0B0B0E] border-2 border-crimson-bright/60 transform -translate-y-1/2" />

        {/* FRONT SIDE */}
        <div className={`h-full flex flex-col justify-between ${flipped ? 'opacity-0' : 'opacity-100'} transition-opacity duration-300`}>
          <div className="flex items-center justify-between border-b border-gray-800 pb-4">
            <div className="flex items-center space-x-2">
              <Flame className="w-6 h-6 text-crimson-bright animate-bounce" />
              <span className="font-display font-black text-xl text-white tracking-widest">
                CODESLAYER 2.0
              </span>
            </div>
            <span className="font-mono text-[10px] text-yellow-400 font-bold px-2.5 py-1 bg-yellow-500/20 border border-yellow-500/40 rounded-full uppercase">
              VIP BATTLE PASS
            </span>
          </div>

          <div className="my-auto space-y-2 py-4">
            <div className="flex items-center space-x-3 text-gray-200">
              <Calendar className="w-5 h-5 text-crimson-bright" />
              <span className="font-mono text-sm font-bold">24–25 OCTOBER 2026</span>
            </div>
            <div className="flex items-center space-x-3 text-gray-200">
              <MapPin className="w-5 h-5 text-crimson-bright" />
              <span className="font-mono text-sm font-bold">NIT DELHI (OFFLINE FINALE)</span>
            </div>
          </div>

          <div className="flex items-center justify-between border-t border-gray-800 pt-4 text-xs font-mono text-gray-400">
            <span>ORGANISED BY DEVSPHEREINDIA</span>
            <span className="text-crimson-bright underline">CLICK TO FLIP TICKET 🔄</span>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { soundEngine } from '../utils/audio';
import { eventConfig } from '../data/eventConfig';
import { Ticket, Flame, Sparkles } from 'lucide-react';
import confetti from 'canvas-confetti';

export const DrawBladeInteraction = () => {
  const [sliderVal, setSliderVal] = useState(0);
  const [isDrawn, setIsDrawn] = useState(false);

  const handleSliderChange = (e) => {
    const val = Number(e.target.value);
    setSliderVal(val);

    if (val >= 98 && !isDrawn) {
      setIsDrawn(true);
      soundEngine.playKatanaSlash();
      confetti({
        particleCount: 120,
        spread: 80,
        origin: { y: 0.7 },
        colors: ['#FF2A55', '#FFD700', '#E60033']
      });
    }
  };

  return (
    <div className="w-full max-w-xl mx-auto p-8 rounded-3xl bg-anime-glass border-2 border-crimson-bright/40 shadow-[0_0_40px_rgba(230,0,51,0.4)] text-center relative overflow-hidden my-12">
      
      {!isDrawn ? (
        <div className="space-y-4">
          <div className="inline-flex items-center space-x-2 px-3.5 py-1 rounded-full bg-crimson-500/20 border border-crimson-bright/40 text-crimson-bright font-mono text-xs uppercase tracking-widest">
            <Flame className="w-4 h-4 text-crimson-bright animate-bounce" />
            <span>INTERACTIVE BLADE CHALLENGE</span>
          </div>

          <h3 className="font-display text-2xl font-black text-white">DRAW THE BLADE</h3>
          <p className="text-xs text-gray-300 font-light">
            Drag the katana handle to unsheathe the blade and activate registration.
          </p>

          {/* Katana Unsheathe Slider */}
          <div className="relative w-full h-12 bg-surface rounded-full p-2 border border-gray-800 flex items-center">
            {/* Progress Fill Line */}
            <div
              className="absolute left-2 top-2 bottom-2 bg-gradient-to-r from-crimson-600 to-crimson-bright rounded-full shadow-[0_0_15px_#FF2A55]"
              style={{ width: `${Math.max(sliderVal, 5)}%` }}
            />

            <input
              type="range"
              min="0"
              max="100"
              value={sliderVal}
              onChange={handleSliderChange}
              className="absolute inset-0 opacity-0 cursor-pointer w-full h-full z-20"
            />

            <div className="w-full flex justify-between px-4 text-[10px] font-mono text-gray-400 pointer-events-none z-10">
              <span>UNSHEATHE ⚔️</span>
              <span>{sliderVal}%</span>
            </div>
          </div>
        </div>
      ) : (
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          className="space-y-6"
        >
          <div className="inline-flex items-center space-x-2 px-4 py-1.5 rounded-full bg-yellow-500/20 border border-yellow-400 text-yellow-300 font-mono text-xs font-bold tracking-widest uppercase">
            <Sparkles className="w-4 h-4 text-yellow-300 animate-spin" />
            <span>YOU'RE READY FOR BATTLE</span>
          </div>

          <h3 className="font-display text-4xl font-black text-white tracking-tight">
            THE BLADE IS <span className="text-crimson-bright text-glow-crimson">UNSHEATHED</span>
          </h3>

          <a
            href={eventConfig.links.registration}
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => soundEngine.playKatanaSlash()}
            className="inline-flex items-center justify-center px-10 py-5 rounded-2xl font-black text-lg text-white bg-gradient-to-r from-crimson-600 via-crimson-bright to-crimson-600 border-2 border-crimson-bright shadow-[0_0_50px_rgba(230,0,51,0.9)] hover:shadow-[0_0_80px_rgba(255,42,85,1)] hover:scale-105 transition-all sword-slash-container uppercase tracking-wider space-x-3"
          >
            <Ticket className="w-6 h-6 text-white" />
            <span>ENTER THE BATTLE</span>
          </a>
        </motion.div>
      )}

    </div>
  );
};

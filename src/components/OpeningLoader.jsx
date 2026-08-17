import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export const OpeningLoader = ({ onComplete }) => {
  const [stage, setStage] = useState(0);

  useEffect(() => {
    // Stage 1: Line appears
    const timer1 = setTimeout(() => setStage(1), 300);
    // Stage 2: Text reveal
    const timer2 = setTimeout(() => setStage(2), 800);
    // Stage 3: Slash across screen
    const timer3 = setTimeout(() => setStage(3), 1400);
    // Complete loader
    const timer4 = setTimeout(() => {
      if (onComplete) onComplete();
    }, 1900);

    return () => {
      clearTimeout(timer1);
      clearTimeout(timer2);
      clearTimeout(timer3);
      clearTimeout(timer4);
    };
  }, [onComplete]);

  return (
    <motion.div
      initial={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
      className="fixed inset-0 z-50 bg-[#0B0B0E] flex flex-col items-center justify-center overflow-hidden"
    >
      {/* Central Blade Spark Line */}
      <AnimatePresence>
        {stage >= 1 && (
          <motion.div
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ duration: 0.5, ease: 'easeOut' }}
            className="w-48 h-0.5 bg-gradient-to-r from-transparent via-crimson-bright to-transparent shadow-[0_0_20px_#FF2A55] mb-6"
          />
        )}
      </AnimatePresence>

      {/* Main Brand Reveal */}
      <div className="relative overflow-hidden text-center">
        {stage >= 2 && (
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.4 }}
            className="flex items-center space-x-3 font-display tracking-widest text-4xl sm:text-6xl font-black text-white"
          >
            <span className="text-glow-white">CODE</span>
            <span className="text-crimson-bright text-glow-crimson">SLAYER</span>
            <span className="bg-gradient-to-r from-crimson-500 to-crimson-bright px-3 py-1 text-2xl sm:text-4xl rounded border border-crimson-bright/40 shadow-lg text-white">
              2.0
            </span>
          </motion.div>
        )}
      </div>

      {/* Subtitle */}
      {stage >= 2 && (
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="text-xs sm:text-sm font-mono tracking-[0.3em] text-red-400 mt-3 uppercase"
        >
          DevSphere India Hackathon
        </motion.p>
      )}

      {/* Dynamic Red Katana Slash Overlay */}
      {stage === 3 && (
        <motion.div
          initial={{ scaleX: 0, opacity: 1 }}
          animate={{ scaleX: 1, opacity: 0.9 }}
          transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
          className="absolute inset-0 bg-gradient-to-r from-transparent via-crimson-bright to-transparent transform -rotate-12 h-2 top-1/2 shadow-[0_0_40px_#FF2A55]"
        />
      )}
    </motion.div>
  );
};

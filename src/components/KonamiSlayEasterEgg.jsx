import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { soundEngine } from '../utils/audio';
import confetti from 'canvas-confetti';
import { Flame, Zap } from 'lucide-react';

export const KonamiSlayEasterEgg = () => {
  const [keyBuffer, setKeyBuffer] = useState('');
  const [demonModeActive, setDemonModeActive] = useState(false);

  useEffect(() => {
    const handleKeyDown = (e) => {
      const char = e.key.toUpperCase();
      if (/^[A-Z]$/.test(char)) {
        setKeyBuffer((prev) => {
          const updated = (prev + char).slice(-4);
          if (updated === 'SLAY') {
            triggerDemonMode();
          }
          return updated;
        });
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  const triggerDemonMode = () => {
    soundEngine.playFlameBurst();
    setDemonModeActive(true);

    confetti({
      particleCount: 150,
      spread: 100,
      origin: { y: 0.2 },
      colors: ['#FF2A55', '#E60033', '#FFD700', '#8B0000']
    });

    setTimeout(() => {
      setDemonModeActive(false);
    }, 10000);
  };

  return (
    <AnimatePresence>
      {demonModeActive && (
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.8 }}
          className="fixed top-24 left-1/2 transform -translate-x-1/2 z-50 pointer-events-none"
        >
          <div className="px-8 py-3 rounded-2xl bg-gradient-to-r from-crimson-600 via-amber-500 to-crimson-600 border-2 border-yellow-400 shadow-[0_0_50px_rgba(255,42,85,0.9)] flex items-center space-x-3 text-white font-display font-black text-lg tracking-widest uppercase">
            <Flame className="w-6 h-6 text-yellow-300 animate-bounce" />
            <span className="text-glow-white">DEMON MODE ACTIVATED</span>
            <Zap className="w-6 h-6 text-yellow-300 animate-spin" />
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

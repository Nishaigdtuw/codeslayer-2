import React from 'react';
import { motion } from 'framer-motion';

export const TransitionManager = ({ activeTransition = null }) => {
  if (!activeTransition) return null;

  switch (activeTransition) {
    case 'slash-split':
      return (
        <div className="fixed inset-0 z-50 pointer-events-none flex items-center justify-center overflow-hidden">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: [0, 1, 0] }}
            transition={{ duration: 0.15 }}
            className="absolute inset-0 bg-white"
          />
          <motion.div
            initial={{ scaleX: 0 }}
            animate={{ scaleX: [0, 1.6, 0] }}
            transition={{ duration: 0.4, ease: 'easeInOut' }}
            className="w-[160vw] h-6 bg-gradient-to-r from-transparent via-crimson-bright to-transparent transform -rotate-45 shadow-[0_0_60px_#FF2A55]"
          />
        </div>
      );

    case 'ink-smoke':
      return (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: [0, 0.95, 0] }}
          transition={{ duration: 0.6 }}
          className="fixed inset-0 z-50 pointer-events-none bg-[#0B0B0E]/95 backdrop-blur-xl"
        />
      );

    case 'portal-warp':
      return (
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: [0.8, 1.4, 1], opacity: [0, 1, 0] }}
          transition={{ duration: 0.5 }}
          className="fixed inset-0 z-50 pointer-events-none border-8 border-purple-500/80 rounded-full shadow-[0_0_100px_#8A2BE2]"
        />
      );

    case 'fragment':
      return (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: [0, 0.8, 0] }}
          transition={{ duration: 0.4 }}
          className="fixed inset-0 z-50 pointer-events-none bg-black"
        />
      );

    default:
      return null;
  }
};

import React from 'react';
import { motion } from 'framer-motion';

export const RealmTransition = ({ variant = 'slash', active = false }) => {
  if (!active) return null;

  if (variant === 'slash') {
    return (
      <div className="fixed inset-0 z-50 pointer-events-none flex items-center justify-center overflow-hidden">
        {/* White/Red Impact Flash */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: [0, 1, 0] }}
          transition={{ duration: 0.15 }}
          className="absolute inset-0 bg-white"
        />
        {/* Diagonal Katana Slash Streak */}
        <motion.div
          initial={{ scaleX: 0 }}
          animate={{ scaleX: [0, 1.5, 0] }}
          transition={{ duration: 0.4, ease: 'easeInOut' }}
          className="w-[150vw] h-4 bg-gradient-to-r from-transparent via-crimson-bright to-transparent transform -rotate-45 shadow-[0_0_50px_#FF2A55]"
        />
      </div>
    );
  }

  if (variant === 'smoke') {
    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: [0, 0.95, 0] }}
        transition={{ duration: 0.6 }}
        className="fixed inset-0 z-50 pointer-events-none bg-[#0B0B0E]/95 backdrop-blur-xl"
      />
    );
  }

  return null;
};

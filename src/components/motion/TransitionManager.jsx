import React from 'react';
import { motion } from 'framer-motion';
import { backgrounds } from '../../data/backgrounds';

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
            className="absolute inset-0 bg-cover bg-center filter contrast-125 brightness-110"
            style={{ backgroundImage: `url(${backgrounds.transitionSlash})` }}
          />
          <motion.div
            initial={{ scaleX: 0 }}
            animate={{ scaleX: [0, 1.8, 0] }}
            transition={{ duration: 0.4, ease: 'easeInOut' }}
            className="w-[180vw] h-8 bg-gradient-to-r from-transparent via-yellow-400 to-transparent transform -rotate-45 shadow-[0_0_80px_#FFD700]"
          />
        </div>
      );

    case 'portal-warp':
      return (
        <div className="fixed inset-0 z-50 pointer-events-none flex items-center justify-center overflow-hidden">
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: [0.8, 1.5, 1], opacity: [0, 1, 0] }}
            transition={{ duration: 0.5 }}
            className="absolute inset-0 bg-cover bg-center filter contrast-125"
            style={{ backgroundImage: `url(${backgrounds.transitionPortal})` }}
          />
          <motion.div
            initial={{ scale: 0.5, opacity: 0 }}
            animate={{ scale: [0.5, 2, 0], opacity: [0, 1, 0] }}
            transition={{ duration: 0.5 }}
            className="w-96 h-96 rounded-full border-8 border-cyan-400 shadow-[0_0_120px_#06B6D4]"
          />
        </div>
      );

    case 'castle-flythrough':
      return (
        <motion.div
          initial={{ opacity: 0, scale: 1 }}
          animate={{ opacity: [0, 1, 0], scale: [1, 1.2, 1] }}
          transition={{ duration: 0.6 }}
          className="fixed inset-0 z-50 pointer-events-none bg-cover bg-center filter contrast-110"
          style={{ backgroundImage: `url(${backgrounds.transitionCastle})` }}
        />
      );

    default:
      return null;
  }
};

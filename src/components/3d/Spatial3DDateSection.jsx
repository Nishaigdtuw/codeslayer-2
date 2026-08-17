import React from 'react';
import { motion } from 'framer-motion';
import { ParallaxBackground } from '../ParallaxBackground';
import { Compass } from 'lucide-react';

export const Spatial3DDateSection = () => {
  return (
    <section className="py-32 px-4 sm:px-8 relative z-20 overflow-hidden bg-[#070709] min-h-[80vh] flex flex-col justify-center items-center text-center">
      
      {/* FULL-BLEED USER UPLOADED ZENITSU LIGHTNING EYE FOCUS BACKGROUND */}
      <ParallaxBackground
        imageSrc="/assets/zenitsu-eye.jpg"
        altText="Zenitsu Lightning Eye Focus"
        overlayOpacity={0.25}
      />

      <div className="relative z-10 max-w-5xl mx-auto space-y-12">
        <span className="font-mono text-xs uppercase tracking-[0.4em] text-yellow-400 font-bold px-4 py-2 bg-yellow-500/20 border border-yellow-500/40 rounded-full inline-flex items-center gap-2">
          <Compass className="w-4 h-4 animate-spin text-yellow-300" />
          SPATIAL DATE SEQUENCE
        </span>

        {/* 3D Extruded Numbers Sequence */}
        <div className="flex flex-col md:flex-row items-center justify-center gap-6 font-display font-black text-7xl sm:text-9xl text-white tracking-tighter">
          
          <motion.div
            initial={{ z: -300, opacity: 0, rotateY: -30 }}
            whileInView={{ z: 0, opacity: 1, rotateY: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="text-yellow-400 text-glow-white transform-style-3d"
          >
            24
          </motion.div>

          <motion.div
            initial={{ y: -50, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-2xl sm:text-4xl text-gray-500 font-mono"
          >
            —
          </motion.div>

          <motion.div
            initial={{ z: -300, opacity: 0, rotateY: 30 }}
            whileInView={{ z: 0, opacity: 1, rotateY: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="text-amber-400 text-glow-white transform-style-3d"
          >
            25
          </motion.div>

          <motion.div
            initial={{ scale: 0, opacity: 0 }}
            whileInView={{ scale: 1, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.5 }}
            className="font-mono text-3xl sm:text-5xl text-yellow-300 tracking-widest uppercase"
          >
            OCT 2026
          </motion.div>
        </div>

        {/* Particle Transformation into NIT DELHI */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.7 }}
          className="space-y-4 pt-8 border-t border-gray-800"
        >
          <p className="font-mono text-xs text-gray-300 uppercase tracking-widest">
            COORDINATES LOCKED AT NATIONAL INSTITUTE OF TECHNOLOGY DELHI
          </p>
          <h2 className="font-display text-5xl sm:text-8xl font-black text-white tracking-tight">
            NIT <span className="text-yellow-400 text-glow-white">DELHI</span>
          </h2>
          <p className="font-mono text-sm sm:text-base text-amber-300 font-bold tracking-widest uppercase">
            36-HOUR OFFLINE GRAND FINALE ARENA
          </p>
        </motion.div>
      </div>

    </section>
  );
};

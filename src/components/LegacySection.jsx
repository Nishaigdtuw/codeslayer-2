import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { eventConfig } from '../data/eventConfig';
import { soundEngine } from '../utils/audio';
import { ParallaxBackground } from './ParallaxBackground';
import { X, Maximize2 } from 'lucide-react';

export const LegacySection = () => {
  const [selectedPhoto, setSelectedPhoto] = useState(null);

  const legacyData = eventConfig.legacy;

  return (
    <section id="legacy" className="py-28 px-4 sm:px-8 relative z-20 overflow-hidden bg-[#070709]">
      
      {/* FULL-BLEED USER UPLOADED YORIICHI SUN SLASH BACKGROUND */}
      <ParallaxBackground
        imageSrc="/assets/yoriichi-sun.jpg"
        altText="CodeSlayer 1.0 Legacy Atmosphere"
        overlayOpacity={0.25}
      />

      <div className="katana-divider mb-16 relative z-10" />

      {/* Documentary Header */}
      <div className="relative z-10 text-center max-w-4xl mx-auto mb-16">
        <span className="font-mono text-xs uppercase tracking-[0.3em] text-red-500 font-bold px-3.5 py-1.5 bg-red-950/80 border border-red-500/40 rounded-full">
          DOCUMENTARY FOOTAGE
        </span>
        <h2 className="font-display text-4xl sm:text-7xl font-black text-white mt-4 tracking-tight">
          BEFORE THE LEGEND, <br />
          <span className="text-crimson-bright text-glow-crimson">THERE WAS A FIRST BATTLE.</span>
        </h2>
        <p className="text-gray-200 text-base sm:text-xl font-light mt-4">
          {legacyData.subtitle}
        </p>
      </div>

      {/* 10K+ REGISTRATIONS & 65 TEAMS MOSAIC METRICS MOMENT */}
      <div className="relative z-10 max-w-6xl mx-auto my-16 grid grid-cols-1 md:grid-cols-2 gap-8 text-left">
        
        {/* 10K+ REGISTRATIONS */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="p-8 rounded-3xl bg-[#0B0B0E]/90 border-2 border-crimson-500/40 shadow-[0_0_50px_rgba(230,0,51,0.4)] backdrop-blur-md relative overflow-hidden"
        >
          <div className="font-display font-black text-6xl sm:text-8xl text-crimson-bright text-glow-crimson mb-2">
            10K+
          </div>
          <span className="font-mono text-sm font-bold text-white uppercase tracking-widest block mb-2">
            STUDENT REGISTRATIONS
          </span>
          <p className="text-xs text-gray-300 font-light leading-relaxed">
            Hackers from 150+ universities across India applied to compete in CodeSlayer 1.0.
          </p>
        </motion.div>

        {/* 65 TEAMS SELECTED */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="p-8 rounded-3xl bg-[#0B0B0E]/90 border-2 border-yellow-500/40 shadow-[0_0_50px_rgba(234,179,8,0.4)] backdrop-blur-md relative overflow-hidden"
        >
          <div className="font-display font-black text-6xl sm:text-8xl text-yellow-400 text-glow-white mb-2">
            65
          </div>
          <span className="font-mono text-sm font-bold text-white uppercase tracking-widest block mb-2">
            TEAMS SELECTED TO BATTLEFIELD
          </span>
          <p className="text-xs text-gray-300 font-light leading-relaxed">
            The elite shortlisted teams who entered the 36-hour offline arena at NIT Delhi.
          </p>
        </motion.div>

      </div>

      {/* DOCUMENTARY PHOTO GALLERY WALL (FLAT CARDS REMOVED -> REPLACED WITH FLOATING 3D MOSAIC) */}
      <div className="relative z-10 max-w-6xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {legacyData.gallery.map((photo, idx) => (
          <motion.div
            key={photo.src}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: idx * 0.1 }}
            onClick={() => {
              soundEngine.playClick();
              setSelectedPhoto(photo);
            }}
            whileHover={{ scale: 1.05, rotate: idx % 2 === 0 ? 2 : -2 }}
            className="rounded-2xl overflow-hidden border-2 border-crimson-bright/40 shadow-2xl cursor-pointer relative group interactive-card"
          >
            <div className="h-64 overflow-hidden relative">
              <img
                src={photo.src}
                alt={photo.caption}
                className="w-full h-full object-cover filter contrast-125 brightness-95 group-hover:scale-110 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-60 group-hover:opacity-30 transition-opacity" />
              <div className="absolute top-3 right-3 p-2 rounded-full bg-black/70 text-white opacity-0 group-hover:opacity-100 transition-opacity">
                <Maximize2 className="w-4 h-4 text-crimson-bright" />
              </div>
            </div>

            <div className="p-4 text-left bg-[#0B0B0E]/90 backdrop-blur-md">
              <span className="font-mono text-[10px] text-crimson-bright font-bold uppercase tracking-widest block mb-1">
                {photo.timestamp}
              </span>
              <p className="text-xs text-white font-bold">{photo.caption}</p>
            </div>
          </motion.div>
        ))}
      </div>

      {/* LIGHTBOX PHOTO MODAL */}
      <AnimatePresence>
        {selectedPhoto && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelectedPhoto(null)}
            className="fixed inset-0 z-50 bg-black/95 backdrop-blur-2xl p-4 flex items-center justify-center cursor-pointer"
          >
            <motion.div
              initial={{ scale: 0.9 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.9 }}
              className="max-w-4xl w-full rounded-3xl overflow-hidden bg-surface border-2 border-crimson-bright/40 shadow-2xl p-4 text-left relative"
            >
              <button
                onClick={() => setSelectedPhoto(null)}
                className="absolute top-6 right-6 p-3 rounded-full bg-black/70 text-white hover:bg-crimson-600 transition-colors z-10"
              >
                <X className="w-6 h-6" />
              </button>

              <img
                src={selectedPhoto.src}
                alt={selectedPhoto.caption}
                className="w-full h-[70vh] object-contain rounded-2xl mb-4"
              />

              <div className="px-4 pb-2">
                <span className="font-mono text-xs text-crimson-bright font-bold uppercase tracking-widest block mb-1">
                  {selectedPhoto.timestamp}
                </span>
                <p className="text-base text-white font-bold">{selectedPhoto.caption}</p>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { eventConfig } from '../data/eventConfig';
import { soundEngine } from '../utils/audio';
import { ParallaxBackground } from './ParallaxBackground';
import { Maximize2, X } from 'lucide-react';

export const CompactLegacySection = () => {
  const [selectedPhoto, setSelectedPhoto] = useState(null);
  const legacyData = eventConfig.legacy;

  return (
    <section id="legacy" className="py-24 px-4 sm:px-8 relative z-20 overflow-hidden bg-[#070709]">
      
      {/* FULL-BLEED BACKGROUND */}
      <ParallaxBackground
        imageSrc="/backgrounds/yoriichi-sun.jpg"
        altText="Previous Edition Atmosphere"
        overlayOpacity={0.25}
      />

      <div className="relative z-10 max-w-7xl mx-auto">
        
        {/* Header */}
        <div className="flex flex-col sm:flex-row items-center justify-between mb-12 p-8 rounded-3xl bg-black/95 border-2 border-crimson-500/70 shadow-2xl backdrop-blur-2xl text-left">
          <div>
            <span className="font-mono text-xs uppercase tracking-[0.3em] text-yellow-300 font-bold px-3.5 py-1.5 bg-red-950/90 border border-yellow-400/50 rounded-full inline-block mb-3">
              SCENE 06 • PREVIOUS EDITION
            </span>
            <h2 className="font-display text-4xl sm:text-6xl font-black text-white tracking-tight">
              CODESLAYER <span className="text-crimson-bright">1.0</span> PROOF
            </h2>
          </div>

          {/* Compact Stats */}
          <div className="flex items-center space-x-6 mt-6 sm:mt-0">
            <div className="text-center sm:text-right">
              <div className="font-display font-black text-4xl sm:text-5xl text-yellow-400">10K+</div>
              <span className="font-mono text-[10px] text-gray-300 font-bold uppercase tracking-widest block">REGISTRATIONS</span>
            </div>
            <div className="w-px h-10 bg-gray-700" />
            <div className="text-center sm:text-right">
              <div className="font-display font-black text-4xl sm:text-5xl text-crimson-bright">65</div>
              <span className="font-mono text-[10px] text-gray-300 font-bold uppercase tracking-widest block">TEAMS SELECTED</span>
            </div>
          </div>
        </div>

        {/* Compact Real Photography Strip */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {legacyData.gallery.map((photo, idx) => (
            <motion.div
              key={photo.src}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: idx * 0.1 }}
              onClick={() => {
                soundEngine.playClick();
                setSelectedPhoto(photo);
              }}
              whileHover={{ scale: 1.04 }}
              className="rounded-2xl overflow-hidden border-2 border-crimson-500/40 shadow-2xl cursor-pointer relative group bg-black/90 text-left"
            >
              <div className="h-56 overflow-hidden relative">
                <img
                  src={photo.src}
                  alt={photo.caption}
                  className="w-full h-full object-cover filter contrast-125 brightness-95 group-hover:scale-110 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-60 group-hover:opacity-30 transition-opacity" />
                <div className="absolute top-3 right-3 p-2 rounded-full bg-black/70 text-white opacity-0 group-hover:opacity-100 transition-opacity">
                  <Maximize2 className="w-4 h-4 text-yellow-400" />
                </div>
              </div>

              <div className="p-4 bg-black/95 backdrop-blur-md">
                <span className="font-mono text-[10px] text-yellow-400 font-bold uppercase tracking-widest block mb-1">
                  {photo.timestamp}
                </span>
                <p className="text-xs text-white font-bold">{photo.caption}</p>
              </div>
            </motion.div>
          ))}
        </div>

      </div>

      {/* Lightbox Modal */}
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
              className="max-w-4xl w-full rounded-3xl overflow-hidden bg-black border-2 border-yellow-400 shadow-2xl p-4 text-left relative"
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
                <span className="font-mono text-xs text-yellow-400 font-bold uppercase tracking-widest block mb-1">
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

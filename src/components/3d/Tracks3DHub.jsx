import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ParallaxBackground } from '../ParallaxBackground';
import { eventConfig } from '../../data/eventConfig';
import { soundEngine } from '../../utils/audio';
import { Activity, Cpu, ShieldAlert, Leaf, Wifi, Zap, X, ChevronRight } from 'lucide-react';

const iconMap = {
  Activity: Activity,
  Cpu: Cpu,
  ShieldAlert: ShieldAlert,
  Leaf: Leaf,
  Wifi: Wifi,
  Zap: Zap,
};

export const Tracks3DHub = () => {
  const [activeTrack, setActiveTrack] = useState(null);
  const [hoveredIdx, setHoveredIdx] = useState(null);

  return (
    <section id="tracks" className="py-32 px-4 sm:px-8 relative z-20 overflow-hidden bg-[#070709]">
      
      {/* FULL-BLEED USER UPLOADED NEZUKO INK BACKGROUND */}
      <ParallaxBackground
        imageSrc="/assets/nezuko-ink.jpg"
        altText="3D Breathing Realm Tracks Atmosphere"
        overlayOpacity={0.25}
      />

      <div className="relative z-10 max-w-7xl mx-auto">
        
        {/* Section Header IN HIGH CONTRAST PANEL requested by user */}
        <div className="text-center max-w-4xl mx-auto mb-16 p-8 rounded-3xl bg-black/95 border-2 border-crimson-500/70 shadow-2xl backdrop-blur-2xl">
          <span className="font-mono text-xs uppercase tracking-[0.3em] text-yellow-300 font-bold px-4 py-2 bg-red-950/90 border border-yellow-400/50 rounded-full inline-block mb-4">
            REALM 03 • 3D GATEWAY PORTALS
          </span>

          <h2 className="font-display text-4xl sm:text-7xl font-black text-white tracking-tight leading-tight drop-shadow-md">
            CHOOSE YOUR <span className="text-crimson-bright text-glow-crimson">BREATHING REALM</span>
          </h2>

          <p className="text-yellow-300 text-sm sm:text-lg font-bold mt-4 p-3 rounded-xl bg-crimson-950/80 border border-crimson-bright/40 shadow-sm">
            Hover over each gateway portal to activate its elemental domain.
          </p>
        </div>

        {/* 6 3D WebGL Gateway Portals Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {eventConfig.tracks.map((track, idx) => {
            const IconComponent = iconMap[track.icon] || Zap;
            const isHovered = hoveredIdx === idx;

            return (
              <motion.div
                key={track.id}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: idx * 0.1 }}
                onMouseEnter={() => {
                  soundEngine.playFlameBurst();
                  setHoveredIdx(idx);
                }}
                onMouseLeave={() => setHoveredIdx(null)}
                onClick={() => {
                  soundEngine.playKatanaSlash();
                  setActiveTrack(track);
                }}
                whileHover={{ scale: 1.04, y: -6 }}
                className={`p-8 rounded-3xl bg-black/95 border-2 ${
                  isHovered ? 'border-yellow-400 shadow-[0_0_40px_rgba(234,179,8,0.7)]' : 'border-crimson-500/40 shadow-2xl'
                } backdrop-blur-xl transition-all duration-300 cursor-pointer relative group text-left flex flex-col justify-between h-96 interactive-card`}
              >
                {/* 3D Portal Gateway Ring */}
                <div className="absolute top-6 right-6">
                  <div
                    className={`w-14 h-14 rounded-full flex items-center justify-center border-2 ${
                      isHovered ? 'border-yellow-400 bg-yellow-400/20 text-yellow-300 animate-spin-slow' : 'border-crimson-500/50 bg-crimson-950/50 text-crimson-bright'
                    } transition-all`}
                  >
                    <IconComponent className="w-7 h-7" />
                  </div>
                </div>

                <div>
                  <span className="font-mono text-xs text-yellow-300 font-bold uppercase tracking-widest block mb-2">
                    {track.tag}
                  </span>
                  <h3 className="font-display font-black text-2xl sm:text-3xl text-white mb-1 group-hover:text-yellow-300 transition-colors drop-shadow-md">
                    {track.title}
                  </h3>
                  <p className="font-mono text-xs text-crimson-bright font-bold uppercase tracking-wider mb-4">
                    {track.subtitle}
                  </p>
                  <p className="text-gray-200 text-xs sm:text-sm font-medium leading-relaxed line-clamp-3">
                    {track.description}
                  </p>
                </div>

                <div className="pt-4 border-t border-gray-800 flex items-center justify-between">
                  <span className="font-mono text-[10px] text-gray-300 font-bold uppercase tracking-wider">
                    {track.element}
                  </span>
                  <div className="flex items-center space-x-1 text-xs font-black text-yellow-400 group-hover:translate-x-1 transition-transform">
                    <span>EXPLORE REALM</span>
                    <ChevronRight className="w-4 h-4" />
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>

      </div>

      {/* TRACK DETAILS MODAL */}
      <AnimatePresence>
        {activeTrack && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setActiveTrack(null)}
            className="fixed inset-0 z-50 bg-black/95 backdrop-blur-2xl p-4 flex items-center justify-center cursor-pointer"
          >
            <motion.div
              initial={{ scale: 0.9, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, y: 20 }}
              className="max-w-2xl w-full rounded-3xl bg-black border-2 border-yellow-400 shadow-2xl p-8 text-left relative"
            >
              <button
                onClick={() => setActiveTrack(null)}
                className="absolute top-6 right-6 p-3 rounded-full bg-surface text-white hover:bg-crimson-600 transition-colors"
              >
                <X className="w-6 h-6" />
              </button>

              <span className="font-mono text-xs text-yellow-300 font-bold uppercase tracking-widest block mb-2">
                {activeTrack.tag}
              </span>
              <h3 className="font-display font-black text-3xl sm:text-5xl text-white mb-2">
                {activeTrack.title}
              </h3>
              <p className="font-mono text-sm text-crimson-bright font-bold uppercase tracking-wider mb-6">
                {activeTrack.subtitle}
              </p>

              <p className="text-gray-200 text-sm sm:text-base font-medium leading-relaxed mb-6">
                {activeTrack.description}
              </p>

              <h4 className="font-mono text-xs text-yellow-400 font-bold uppercase tracking-widest mb-3">
                INSPIRATION PROJECT IDEAS
              </h4>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-8">
                {activeTrack.ideas.map((idea) => (
                  <div key={idea} className="p-3 rounded-xl bg-surface border border-gray-800 text-xs font-bold text-white">
                    ⚡ {idea}
                  </div>
                ))}
              </div>

              <a
                href={eventConfig.links.registration}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => soundEngine.playKatanaSlash()}
                className="w-full py-4 rounded-xl font-black text-sm text-black bg-yellow-400 hover:bg-yellow-300 transition-all flex items-center justify-center uppercase tracking-wider shadow-lg"
              >
                BUILD IN THIS REALM
              </a>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};

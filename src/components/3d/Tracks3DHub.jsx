import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { SectionBackground } from '../SectionBackground';
import { eventConfig } from '../../data/eventConfig';
import { backgrounds } from '../../data/backgrounds';
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
    <section id="tracks" className="relative min-h-screen py-32 px-4 sm:px-8 overflow-hidden flex flex-col justify-center">
      
      {/* TRACKS BACKGROUND: 04_fantasy_waterfall_realm.png */}
      <SectionBackground
        src={backgrounds.tracks}
        alt="Fantasy Waterfall Realm Tracks Atmosphere"
        overlayOpacity={0.10}
      />

      <div className="relative z-10 max-w-7xl mx-auto w-full">
        
        {/* Section Header */}
        <div className="text-center max-w-4xl mx-auto mb-16 p-6 rounded-xl bg-black/15 border border-cyan-400/30 backdrop-blur-sm shadow-2xl">
          <span className="font-mono text-xs uppercase tracking-[0.3em] text-cyan-300 font-bold px-4 py-1.5 bg-cyan-950/60 border border-cyan-400/40 rounded-full inline-block mb-4">
            REALM 03 • 3D SPATIAL GATEWAY PORTALS
          </span>

          <h2 className="font-display text-4xl sm:text-7xl font-black text-white tracking-tight leading-tight drop-shadow-[0_6px_24px_rgba(0,0,0,1)]">
            CHOOSE YOUR <span className="text-cyan-400 text-glow-white">BREATHING REALM</span>
          </h2>

          <p className="text-cyan-300 text-sm sm:text-lg font-bold mt-4 p-2 rounded-lg bg-cyan-950/50 border border-cyan-400/30 shadow-sm drop-shadow-md">
            Hover over each gateway portal to activate its elemental domain.
          </p>
        </div>

        {/* 6 3D Spatial Gateway Portals Grid */}
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
                whileHover={{ scale: 1.05, y: -8 }}
                className={`p-8 rounded-xl bg-black/20 border-2 ${
                  isHovered ? 'border-cyan-400 shadow-[0_0_50px_rgba(6,182,212,0.8)]' : 'border-cyan-500/40 shadow-2xl'
                } backdrop-blur-sm transition-all duration-300 cursor-pointer relative group text-left flex flex-col justify-between h-96 interactive-card`}
              >
                {/* 3D Portal Gateway Ring */}
                <div className="absolute top-6 right-6">
                  <div
                    className={`w-14 h-14 rounded-full flex items-center justify-center border-2 ${
                      isHovered ? 'border-cyan-400 bg-cyan-400/20 text-cyan-300 animate-spin-slow' : 'border-cyan-500/50 bg-cyan-950/50 text-cyan-400'
                    } transition-all`}
                  >
                    <IconComponent className="w-7 h-7" />
                  </div>
                </div>

                <div>
                  <span className="font-mono text-xs text-cyan-300 font-bold uppercase tracking-widest block mb-2">
                    {track.tag}
                  </span>
                  <h3 className="font-display font-black text-2xl sm:text-3xl text-white mb-1 group-hover:text-cyan-300 transition-colors drop-shadow-[0_4px_12px_rgba(0,0,0,1)]">
                    {track.title}
                  </h3>
                  <p className="font-mono text-xs text-cyan-400 font-bold uppercase tracking-wider mb-4">
                    {track.subtitle}
                  </p>
                  <p className="text-gray-100 text-xs sm:text-sm font-medium leading-relaxed line-clamp-3 drop-shadow-sm">
                    {track.description}
                  </p>
                </div>

                <div className="pt-4 border-t border-cyan-500/30 flex items-center justify-between">
                  <span className="font-mono text-[10px] text-gray-200 font-bold uppercase tracking-wider">
                    {track.element}
                  </span>
                  <div className="flex items-center space-x-1 text-xs font-black text-cyan-400 group-hover:translate-x-1 transition-transform">
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
            className="fixed inset-0 z-50 bg-black/85 backdrop-blur-md p-4 flex items-center justify-center cursor-pointer"
          >
            <motion.div
              initial={{ scale: 0.9, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, y: 20 }}
              className="max-w-2xl w-full rounded-xl bg-black/90 border-2 border-cyan-400 shadow-2xl p-8 text-left relative"
            >
              <button
                onClick={() => setActiveTrack(null)}
                className="absolute top-6 right-6 p-3 rounded-full bg-surface text-white hover:bg-crimson-600 transition-colors"
              >
                <X className="w-6 h-6" />
              </button>

              <span className="font-mono text-xs text-cyan-300 font-bold uppercase tracking-widest block mb-2">
                {activeTrack.tag}
              </span>
              <h3 className="font-display font-black text-3xl sm:text-5xl text-white mb-2">
                {activeTrack.title}
              </h3>
              <p className="font-mono text-sm text-cyan-400 font-bold uppercase tracking-wider mb-6">
                {activeTrack.subtitle}
              </p>

              <p className="text-gray-200 text-sm sm:text-base font-medium leading-relaxed mb-6">
                {activeTrack.description}
              </p>

              <h4 className="font-mono text-xs text-cyan-300 font-bold uppercase tracking-widest mb-3">
                INSPIRATION PROJECT IDEAS
              </h4>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-8">
                {activeTrack.ideas.map((idea) => (
                  <div key={idea} className="p-3 rounded-lg bg-surface border border-gray-800 text-xs font-bold text-white">
                    ⚡ {idea}
                  </div>
                ))}
              </div>

              <a
                href={eventConfig.links.registration}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => soundEngine.playKatanaSlash()}
                className="w-full py-4 rounded-lg font-black text-sm text-black bg-cyan-400 hover:bg-cyan-300 transition-all flex items-center justify-center uppercase tracking-wider shadow-lg"
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

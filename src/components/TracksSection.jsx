import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { eventConfig } from '../data/eventConfig';
import { soundEngine } from '../utils/audio';
import { BreathingSelector } from './BreathingSelector';
import { Activity, Cpu, ShieldAlert, Leaf, Wifi, Zap, ArrowRight, X } from 'lucide-react';

const iconMap = { Activity, Cpu, ShieldAlert, Leaf, Wifi, Zap };

export const TracksSection = () => {
  const [activeTrackId, setActiveTrackId] = useState(eventConfig.tracks[0].id);
  const [selectedModalTrack, setSelectedModalTrack] = useState(null);

  return (
    <section id="tracks" className="py-28 px-4 sm:px-8 relative z-20 overflow-hidden bg-[#0B0B0E]">
      
      <div className="max-w-7xl mx-auto">
        <div className="katana-divider mb-16" />

        <div className="text-center max-w-3xl mx-auto mb-12">
          <span className="font-mono text-xs uppercase tracking-[0.3em] text-crimson-bright font-bold px-3.5 py-1.5 bg-crimson-500/20 border border-crimson-bright/40 rounded-full">
            BREATHING REALMS
          </span>
          <h2 className="font-display text-4xl sm:text-7xl font-black text-white mt-4 tracking-tight">
            CHOOSE YOUR <span className="text-crimson-bright text-glow-crimson">BATTLEFIELD</span>
          </h2>
          <p className="text-gray-300 text-base sm:text-xl font-light mt-3">
            Six distinct breathing realms. Hover a blade slice to unleash its elemental domain.
          </p>
        </div>

        {/* Interactive Breathing Style Selector Quiz */}
        <BreathingSelector />

        {/* DESKTOP: 6 Horizontal Expanding Vertical Slices Layout */}
        <div className="hidden lg:flex h-[32rem] gap-3 w-full my-12">
          {eventConfig.tracks.map((track) => {
            const IconComp = iconMap[track.icon] || Zap;
            const isExpanded = activeTrackId === track.id;

            return (
              <motion.div
                key={track.id}
                onMouseEnter={() => {
                  soundEngine.playClick();
                  setActiveTrackId(track.id);
                }}
                onClick={() => {
                  soundEngine.playKatanaSlash();
                  setSelectedModalTrack(track);
                }}
                animate={{ flex: isExpanded ? 3.5 : 1 }}
                transition={{ type: 'spring', stiffness: 200, damping: 25 }}
                className={`relative rounded-3xl overflow-hidden border-2 transition-all cursor-pointer p-6 flex flex-col justify-between ${
                  isExpanded
                    ? 'border-crimson-bright shadow-[0_0_40px_rgba(230,0,51,0.5)] bg-gradient-to-b from-[#181524] to-[#0B0B0E]'
                    : 'border-crimson-500/20 bg-surface/80 hover:border-crimson-bright/60'
                }`}
              >
                {/* Track Vertical Title Header */}
                <div className="flex items-center justify-between z-10">
                  <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-crimson-500 to-crimson-700 flex items-center justify-center text-white shadow-lg shrink-0">
                    <IconComp className="w-6 h-6" />
                  </div>
                  <span className="font-mono text-[10px] font-bold text-crimson-bright uppercase px-2 py-0.5 bg-crimson-500/20 rounded border border-crimson-bright/30">
                    {track.tag}
                  </span>
                </div>

                {/* Collapsed State Vertical Label */}
                {!isExpanded && (
                  <div className="flex items-center justify-center my-auto">
                    <span className="font-display font-black text-xl text-gray-300 tracking-widest uppercase transform -rotate-90 whitespace-nowrap">
                      {track.title}
                    </span>
                  </div>
                )}

                {/* Expanded State Rich Content */}
                {isExpanded && (
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3 }}
                    className="z-10 text-left my-auto space-y-4"
                  >
                    <span className="font-mono text-xs text-red-400 font-bold uppercase tracking-widest">
                      {track.subtitle}
                    </span>
                    <h3 className="font-display text-4xl font-black text-white">{track.title}</h3>
                    <p className="text-gray-300 text-sm leading-relaxed max-w-md">{track.description}</p>
                    
                    <div className="p-3 rounded-xl bg-surface/90 border border-gray-800 text-xs font-mono text-crimson-bright flex items-center gap-2">
                      <Zap className="w-4 h-4 text-yellow-400 animate-pulse" />
                      <span>ELEMENTAL POWER: {track.element}</span>
                    </div>
                  </motion.div>
                )}

                {/* Card Footer CTA */}
                {isExpanded && (
                  <div className="flex items-center justify-between pt-4 border-t border-gray-800 text-xs font-mono text-crimson-bright z-10">
                    <span>CLICK TO EXPLORE FOCUS AREAS</span>
                    <ArrowRight className="w-4 h-4" />
                  </div>
                )}
              </motion.div>
            );
          })}
        </div>

        {/* MOBILE: Full-Width Vertical Cards Stack */}
        <div className="flex lg:hidden flex-col gap-6 my-8">
          {eventConfig.tracks.map((track) => {
            const IconComp = iconMap[track.icon] || Zap;

            return (
              <div
                key={track.id}
                onClick={() => {
                  soundEngine.playKatanaSlash();
                  setSelectedModalTrack(track);
                }}
                className="p-6 rounded-3xl bg-anime-glass border-2 border-crimson-500/40 hover:border-crimson-bright text-left interactive-card"
              >
                <div className="flex items-center justify-between mb-4">
                  <div className="w-10 h-10 rounded-xl bg-crimson-600 flex items-center justify-center text-white">
                    <IconComp className="w-5 h-5" />
                  </div>
                  <span className="font-mono text-[10px] text-crimson-bright font-bold px-2 py-0.5 bg-crimson-500/20 rounded border border-crimson-bright/30">
                    {track.tag}
                  </span>
                </div>

                <h3 className="font-display text-2xl font-bold text-white mb-1">{track.title}</h3>
                <p className="font-mono text-xs text-red-400 mb-3">{track.subtitle}</p>
                <p className="text-gray-300 text-xs leading-relaxed mb-4">{track.description}</p>

                <div className="flex items-center justify-between text-xs font-mono text-crimson-bright pt-3 border-t border-gray-800">
                  <span>Explore Focus Areas</span>
                  <ArrowRight className="w-4 h-4" />
                </div>
              </div>
            );
          })}
        </div>

      </div>

      {/* Track Detail Modal */}
      <AnimatePresence>
        {selectedModalTrack && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              className="relative max-w-xl w-full bg-[#0B0B0E] border-2 border-crimson-bright rounded-3xl p-6 sm:p-8 shadow-[0_0_50px_rgba(230,0,51,0.5)] text-left"
            >
              <div className="flex items-center justify-between pb-4 border-b border-crimson-500/30 mb-6">
                <div>
                  <span className="font-mono text-xs text-crimson-bright uppercase tracking-widest px-2.5 py-1 bg-crimson-500/20 rounded border border-crimson-bright/30">
                    {selectedModalTrack.tag}
                  </span>
                  <h3 className="font-display text-3xl font-extrabold text-white mt-2">
                    {selectedModalTrack.title}
                  </h3>
                  <p className="font-mono text-xs text-red-400 mt-0.5">{selectedModalTrack.subtitle}</p>
                </div>
                <button
                  onClick={() => setSelectedModalTrack(null)}
                  className="p-2 rounded-xl bg-surface border border-crimson-500/40 text-gray-300 hover:text-white"
                >
                  <X className="w-6 h-6" />
                </button>
              </div>

              <p className="text-gray-300 text-sm leading-relaxed mb-6">
                {selectedModalTrack.description}
              </p>

              <h4 className="font-mono text-xs uppercase tracking-widest text-gray-400 mb-3">SUGGESTED FOCUS AREAS</h4>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-6">
                {selectedModalTrack.ideas.map((idea) => (
                  <div key={idea} className="p-3 rounded-xl bg-surface border border-gray-800 text-xs text-gray-200">
                    ⚡ {idea}
                  </div>
                ))}
              </div>

              <button
                onClick={() => {
                  setSelectedModalTrack(null);
                  document.querySelector('#ppt-round')?.scrollIntoView({ behavior: 'smooth' });
                }}
                className="w-full py-3.5 rounded-xl bg-gradient-to-r from-crimson-600 to-crimson-bright text-white font-bold text-xs shadow-lg sword-slash-container"
              >
                SUBMIT IDEA FOR {selectedModalTrack.title.toUpperCase()} →
              </button>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
};

import React from 'react';
import { motion } from 'framer-motion';
import { ParallaxBackground } from './ParallaxBackground';
import { eventConfig } from '../data/eventConfig';
import { Calendar, MapPin, Flag, CheckCircle2 } from 'lucide-react';

export const TimelineSection = () => {
  return (
    <section id="timeline" className="py-32 px-4 sm:px-8 relative z-20 overflow-hidden bg-[#070709]">
      
      {/* FULL-BLEED SUNSET MOUNTAIN ROAD BACKGROUND */}
      <ParallaxBackground
        imageSrc="/backgrounds/yoriichi-sun.jpg"
        altText="Timeline Journey Atmosphere"
        overlayOpacity={0.25}
      />

      <div className="relative z-10 max-w-7xl mx-auto">
        
        {/* Section Header */}
        <div className="text-center max-w-4xl mx-auto mb-16 p-8 rounded-3xl bg-black/95 border-2 border-crimson-500/70 shadow-2xl backdrop-blur-2xl">
          <span className="font-mono text-xs uppercase tracking-[0.3em] text-yellow-300 font-bold px-4 py-2 bg-red-950/90 border border-yellow-400/50 rounded-full inline-block mb-4">
            SCENE 05 • THE BATTLE ROAD
          </span>

          <h2 className="font-display text-4xl sm:text-7xl font-black text-white tracking-tight leading-tight">
            KEY DATES & <span className="text-yellow-400 text-glow-white">MILESTONES</span>
          </h2>
          <p className="text-gray-200 text-sm sm:text-lg font-bold mt-2">
            20 August 2026 → 24–25 October 2026 at NIT Delhi
          </p>
        </div>

        {/* Timeline Horizontal / Vertical Steps Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {eventConfig.timeline.map((item, idx) => (
            <motion.div
              key={item.date}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: idx * 0.1 }}
              className="p-6 rounded-3xl bg-black/95 border-2 border-yellow-400/50 shadow-2xl backdrop-blur-xl text-left flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between mb-4">
                  <span className="font-mono text-xs text-yellow-300 font-bold uppercase tracking-widest px-3 py-1 bg-yellow-500/20 border border-yellow-400/40 rounded-full">
                    PHASE 0{idx + 1}
                  </span>
                  <Calendar className="w-5 h-5 text-crimson-bright" />
                </div>

                <div className="font-display font-black text-2xl text-white mb-2">
                  {item.date}
                </div>

                <h3 className="font-mono font-bold text-sm text-yellow-400 uppercase tracking-wider mb-2">
                  {item.title}
                </h3>

                <p className="text-gray-200 text-xs font-medium leading-relaxed">
                  {item.desc}
                </p>
              </div>

              <div className="pt-4 mt-6 border-t border-gray-800 flex items-center space-x-2 text-[10px] font-mono text-gray-400 font-bold uppercase">
                <CheckCircle2 className="w-3.5 h-3.5 text-yellow-400" />
                <span>MILESTONE LOCKED</span>
              </div>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
};

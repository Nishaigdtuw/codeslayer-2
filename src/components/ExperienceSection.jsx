import React from 'react';
import { motion } from 'framer-motion';
import { eventConfig } from '../data/eventConfig';
import { soundEngine } from '../utils/audio';
import { Users, Coffee, Globe, Mic } from 'lucide-react';

const iconMap = { Users, Coffee, Globe, Mic };

export const ExperienceSection = () => {
  return (
    <section className="py-20 px-4 sm:px-8 relative z-20 overflow-hidden bg-[#0B0B0E]">
      <div className="max-w-6xl mx-auto">
        
        {/* Section Header */}
        <div className="text-center mb-8">
          <span className="font-mono text-xs uppercase tracking-[0.3em] text-crimson-bright font-bold px-3 py-1 bg-crimson-500/20 border border-crimson-bright/40 rounded-full">
            THE ARENA VIBE
          </span>
          <h2 className="font-display text-3xl sm:text-5xl font-black text-white mt-3">
            INSIDE THE <span className="text-crimson-bright text-glow-crimson">36 HOURS</span>
          </h2>
        </div>

        {/* Compact Horizontal Ticker Strip */}
        <div className="w-full py-3 bg-surface/80 border-y border-crimson-500/30 overflow-hidden my-6">
          <div className="flex whitespace-nowrap animate-marquee font-mono text-xs font-bold text-crimson-bright tracking-widest gap-8">
            {eventConfig.experiencesTicker.map((item, idx) => (
              <span key={item + idx} className="flex items-center gap-3">
                <span>{item}</span>
                <span className="text-gray-600">✦</span>
              </span>
            ))}
          </div>
        </div>

        {/* 4 Compact Highlight Blocks Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 mt-8 text-left">
          {eventConfig.experiencesHighlights.map((exp, idx) => {
            const IconComponent = iconMap[exp.icon] || Users;

            return (
              <motion.div
                key={exp.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: idx * 0.1 }}
                onMouseEnter={() => soundEngine.playClick()}
                className="p-5 rounded-2xl bg-anime-glass border border-crimson-500/30 hover:border-crimson-bright transition-all group interactive-card"
              >
                <div className="w-10 h-10 rounded-xl bg-crimson-500/20 border border-crimson-bright/40 flex items-center justify-center text-crimson-bright mb-3 group-hover:scale-110 group-hover:bg-crimson-600 group-hover:text-white transition-all">
                  <IconComponent className="w-5 h-5" />
                </div>
                <h3 className="font-display font-bold text-base text-white mb-1 group-hover:text-crimson-bright transition-colors">
                  {exp.title}
                </h3>
                <p className="text-gray-400 text-xs leading-relaxed">{exp.desc}</p>
              </motion.div>
            );
          })}
        </div>

      </div>
    </section>
  );
};

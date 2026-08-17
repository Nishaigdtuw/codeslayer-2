import React from 'react';
import { motion } from 'framer-motion';
import { eventConfig } from '../data/eventConfig';
import { soundEngine } from '../utils/audio';
import { Clock, Flame } from 'lucide-react';

export const TimeTunnel36Hours = () => {
  const timeline = eventConfig.storyline36Hours;

  return (
    <section id="timeline" className="py-28 px-4 sm:px-8 relative z-20 overflow-hidden bg-[#0B0B0E]">
      <div className="katana-divider mb-16" />

      <div className="text-center max-w-3xl mx-auto mb-16">
        <span className="font-mono text-xs uppercase tracking-[0.3em] text-crimson-bright font-bold px-3.5 py-1.5 bg-crimson-500/20 border border-crimson-bright/40 rounded-full">
          36-HOUR VISUAL TIME TUNNEL
        </span>
        <h2 className="font-display text-4xl sm:text-7xl font-black text-white mt-4 tracking-tight">
          INSIDE THE <span className="text-crimson-bright text-glow-crimson">36 HOURS</span>
        </h2>
        <p className="text-gray-300 text-base sm:text-xl font-light mt-3">
          From repo initialization at sunrise to final live pitches before the jury.
        </p>
      </div>

      {/* Horizontal Scroll Time Tunnel Container */}
      <div className="max-w-7xl mx-auto overflow-x-auto pb-8 scrollbar-thin scrollbar-thumb-crimson-bright">
        <div className="flex space-x-6 min-w-max px-4">
          {timeline.map((step, idx) => (
            <motion.div
              key={step.time}
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: idx * 0.1 }}
              onMouseEnter={() => soundEngine.playClick()}
              whileHover={{ y: -8, scale: 1.03 }}
              className="w-72 p-6 rounded-3xl bg-anime-glass border-2 border-crimson-500/30 hover:border-crimson-bright text-left flex flex-col justify-between h-72 relative overflow-hidden interactive-card"
            >
              <div className="flex items-center justify-between">
                <span className="font-mono text-2xl font-black text-crimson-bright text-glow-crimson">
                  {step.time}
                </span>
                <Flame className="w-5 h-5 text-crimson-bright animate-bounce" />
              </div>

              <div className="my-auto">
                <h3 className="font-display text-xl font-bold text-white mb-2">{step.title}</h3>
                <p className="text-xs text-gray-300 font-light leading-relaxed">{step.desc}</p>
              </div>

              <div className="w-full h-1 bg-surface rounded-full overflow-hidden border border-gray-800">
                <div
                  className="h-full bg-gradient-to-r from-crimson-600 to-crimson-bright"
                  style={{ width: `${((idx + 1) / timeline.length) * 100}%` }}
                />
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

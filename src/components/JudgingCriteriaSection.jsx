import React from 'react';
import { motion } from 'framer-motion';
import { eventConfig } from '../data/eventConfig';
import { soundEngine } from '../utils/audio';

export const JudgingCriteriaSection = () => {
  const metricsList = eventConfig.judgingMetrics || [];

  return (
    <section className="py-24 px-4 sm:px-8 relative z-20 max-w-7xl mx-auto">
      <div className="katana-divider mb-16" />

      <div className="text-center max-w-3xl mx-auto mb-16">
        <span className="text-crimson-bright font-mono text-xs uppercase tracking-widest px-3 py-1 bg-crimson-500/10 border border-crimson-bright/30 rounded-lg">
          Evaluation Matrix
        </span>
        <h2 className="font-display text-4xl sm:text-6xl font-extrabold text-white mt-4 tracking-tight">
          Judging <span className="text-crimson-bright text-glow-crimson">Criteria</span>
        </h2>
        <p className="text-gray-300 text-base sm:text-lg mt-3">
          How your battlefield project will be scored by the jury panel.
        </p>
      </div>

      {/* Grid of Judging Metrics with Animated Gauges */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {metricsList.map((item, idx) => (
          <motion.div
            key={item.metric}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: idx * 0.1 }}
            onMouseEnter={() => soundEngine.playClick()}
            className="p-8 rounded-3xl bg-anime-glass border border-crimson-500/30 hover:border-crimson-bright transition-all group interactive-card"
          >
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-display text-xl font-bold text-white group-hover:text-crimson-bright transition-colors">
                {item.metric}
              </h3>
              <span className="font-mono text-xl font-extrabold text-crimson-bright text-glow-crimson">
                {item.score}%
              </span>
            </div>

            {/* Animated Progress Bar */}
            <div className="w-full h-3 bg-surface rounded-full overflow-hidden border border-gray-800 mb-4 p-0.5">
              <motion.div
                initial={{ width: 0 }}
                whileInView={{ width: `${item.score}%` }}
                viewport={{ once: true }}
                transition={{ duration: 1, ease: 'easeOut', delay: idx * 0.1 }}
                className="h-full rounded-full bg-gradient-to-r from-crimson-600 via-crimson-bright to-red-400 shadow-[0_0_15px_#FF2A55]"
              />
            </div>

            <p className="text-xs text-gray-400 leading-relaxed font-light">{item.desc}</p>
          </motion.div>
        ))}
      </div>
    </section>
  );
};

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { eventConfig } from '../data/eventConfig';
import { soundEngine } from '../utils/audio';
import { ChevronDown, ShieldAlert, AlertCircle } from 'lucide-react';

export const RulesSection = () => {
  const [openIndex, setOpenIndex] = useState(null);

  const toggleAccordion = (idx) => {
    soundEngine.playClick();
    setOpenIndex(openIndex === idx ? null : idx);
  };

  const rulesList = eventConfig.rules || [];

  return (
    <section id="rules" className="py-24 px-4 sm:px-8 relative z-20 max-w-5xl mx-auto">
      <div className="katana-divider mb-16" />

      <div className="text-center max-w-3xl mx-auto mb-12">
        <span className="text-crimson-bright font-mono text-xs uppercase tracking-widest px-3 py-1 bg-crimson-500/10 border border-crimson-bright/30 rounded-lg">
          Code of Conduct & Guidelines
        </span>
        <h2 className="font-display text-4xl sm:text-6xl font-extrabold text-white mt-4 tracking-tight">
          Rules of <span className="text-crimson-bright text-glow-crimson">Engagement</span>
        </h2>
        <p className="text-gray-300 text-base sm:text-lg mt-3">
          Every battle requires honor, discipline, and sportsmanship.
        </p>
      </div>

      {/* Disclaimer Notice */}
      <div className="p-4 rounded-xl bg-crimson-500/10 border border-crimson-bright/30 mb-8 flex items-center space-x-3 text-xs sm:text-sm text-red-300 font-mono">
        <AlertCircle className="w-5 h-5 text-crimson-bright shrink-0" />
        <span>Note: Detailed rules & submission guidelines will be finalized before registrations open on 20 August 2026.</span>
      </div>

      {/* Accordion List */}
      <div className="space-y-4">
        {rulesList.map((rule, idx) => {
          const isOpen = openIndex === idx;

          return (
            <div
              key={rule.title}
              className="rounded-2xl bg-anime-glass border border-crimson-500/30 overflow-hidden transition-all"
            >
              <button
                onClick={() => toggleAccordion(idx)}
                className="w-full p-6 text-left flex items-center justify-between font-display text-lg font-bold text-white hover:text-crimson-bright transition-colors"
              >
                <div className="flex items-center space-x-3">
                  <ShieldAlert className="w-5 h-5 text-crimson-bright shrink-0" />
                  <span>{rule.title}</span>
                </div>
                <ChevronDown className={`w-5 h-5 text-crimson-bright transform transition-transform duration-300 ${
                  isOpen ? 'rotate-180' : ''
                }`} />
              </button>

              <AnimatePresence>
                {isOpen && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    exit={{ opacity: 0, height: 0 }}
                    transition={{ duration: 0.3 }}
                    className="px-6 pb-6 text-sm text-gray-300 font-light leading-relaxed border-t border-gray-800/60 pt-4"
                  >
                    {rule.content}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          );
        })}
      </div>
    </section>
  );
};

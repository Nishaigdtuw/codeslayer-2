import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { SectionBackground } from './SectionBackground';
import { eventConfig } from '../data/eventConfig';
import { backgrounds } from '../data/backgrounds';
import { soundEngine } from '../utils/audio';
import { ChevronDown, HelpCircle } from 'lucide-react';

export const FaqSection = () => {
  const [openIdx, setOpenIdx] = useState(null);

  const toggleFaq = (idx) => {
    soundEngine.playClick();
    setOpenIdx(openIdx === idx ? null : idx);
  };

  return (
    <section id="faq" className="relative min-h-screen py-32 px-4 sm:px-8 overflow-hidden flex flex-col justify-center">
      
      {/* FAQ BACKGROUND: 08_moonlit_sakura_courtyard.png */}
      <SectionBackground
        src={backgrounds.faq}
        alt="Moonlit Sakura Courtyard FAQ Atmosphere"
        overlayOpacity={0.10}
      />

      <div className="relative z-10 max-w-4xl mx-auto w-full">
        
        {/* Section Header — DIRECT UNCONTAINED TYPOGRAPHY */}
        <div className="text-center max-w-3xl mx-auto mb-16 p-6 rounded-xl bg-black/15 border border-pink-400/30 backdrop-blur-sm shadow-2xl">
          <span className="font-mono text-xs uppercase tracking-[0.3em] text-pink-300 font-bold px-4 py-1.5 bg-pink-950/60 border border-pink-400/40 rounded-full inline-block mb-4">
            SCENE 08 • FREQUENTLY ASKED QUESTIONS
          </span>

          <h2 className="font-display text-4xl sm:text-7xl font-black text-white tracking-tight leading-tight drop-shadow-[0_6px_24px_rgba(0,0,0,1)]">
            CLEAR YOUR <span className="text-pink-400 text-glow-white">DOUBTS</span>
          </h2>
          <p className="text-gray-100 text-sm sm:text-base font-bold mt-2 drop-shadow-md">
            Everything you need to know about CodeSlayer 2.0
          </p>
        </div>

        {/* Translucent Glass Accordions */}
        <div className="space-y-4">
          {eventConfig.faqs.map((faq, idx) => {
            const isOpen = openIdx === idx;

            return (
              <motion.div
                key={faq.q}
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: idx * 0.05 }}
                className="rounded-xl bg-black/20 border border-pink-400/30 backdrop-blur-md overflow-hidden shadow-2xl text-left"
              >
                <button
                  onClick={() => toggleFaq(idx)}
                  className="w-full p-6 flex items-center justify-between text-left hover:bg-pink-500/10 transition-colors"
                >
                  <div className="flex items-center space-x-3 pr-4">
                    <HelpCircle className="w-5 h-5 text-pink-400 flex-shrink-0" />
                    <span className="font-display font-bold text-base sm:text-lg text-white drop-shadow-md">
                      {faq.q}
                    </span>
                  </div>
                  <ChevronDown
                    className={`w-5 h-5 text-pink-400 transition-transform duration-300 flex-shrink-0 ${
                      isOpen ? 'transform rotate-180' : ''
                    }`}
                  />
                </button>

                <AnimatePresence>
                  {isOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.25 }}
                      className="overflow-hidden"
                    >
                      <div className="p-6 pt-0 border-t border-pink-500/20 text-gray-100 text-xs sm:text-sm font-medium leading-relaxed drop-shadow-sm">
                        {faq.a}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            );
          })}
        </div>

      </div>
    </section>
  );
};

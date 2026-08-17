import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { soundEngine } from '../utils/audio';
import { Activity, Cpu, ShieldAlert, Leaf, Wifi, Zap, Sparkles } from 'lucide-react';

export const BreathingSelector = () => {
  const [selectedDomain, setSelectedDomain] = useState(null);

  const symbols = [
    { id: 'ai-ml', name: 'AI & ML', title: 'Cognitive Flame', icon: Cpu, color: 'hover:border-amber-500 hover:shadow-[0_0_25px_rgba(245,158,11,0.5)]' },
    { id: 'healthcare', name: 'Healthcare', title: 'Vitality Breath', icon: Activity, color: 'hover:border-rose-500 hover:shadow-[0_0_25px_rgba(244,63,94,0.5)]' },
    { id: 'web3', name: 'Web3 & Chain', title: 'Immutable Seal', icon: ShieldAlert, color: 'hover:border-purple-500 hover:shadow-[0_0_25px_rgba(168,85,247,0.5)]' },
    { id: 'sustainability', name: 'Sustainability', title: 'Sun Breathing', icon: Leaf, color: 'hover:border-emerald-500 hover:shadow-[0_0_25px_rgba(16,185,129,0.5)]' },
    { id: 'iot', name: 'IoT Hardware', title: 'Lightning Form', icon: Wifi, color: 'hover:border-orange-500 hover:shadow-[0_0_25px_rgba(249,115,22,0.5)]' },
    { id: 'open-innovation', name: 'Open Innovation', title: 'Unrestricted Blade', icon: Zap, color: 'hover:border-indigo-500 hover:shadow-[0_0_25px_rgba(99,102,241,0.5)]' },
  ];

  const handleSelect = (sym) => {
    soundEngine.playKatanaSlash();
    setSelectedDomain(sym);
  };

  return (
    <div className="w-full max-w-4xl mx-auto my-12 p-8 rounded-3xl bg-anime-glass border border-crimson-500/30 text-center relative overflow-hidden">
      <span className="font-mono text-xs text-crimson-bright font-bold uppercase tracking-widest px-3 py-1 bg-crimson-500/20 rounded-full border border-crimson-bright/30">
        Exploratory Assessment
      </span>

      <h3 className="font-display text-2xl sm:text-4xl font-black text-white mt-3 mb-2">
        WHAT WILL YOU <span className="text-crimson-bright text-glow-crimson">BUILD WITH?</span>
      </h3>
      <p className="text-gray-400 text-xs sm:text-sm font-mono mb-8">
        Tap a breathing style symbol below to reveal your recommended battlefield domain.
      </p>

      {/* 6 Symbol Buttons */}
      <div className="grid grid-cols-3 sm:grid-cols-6 gap-4 mb-6">
        {symbols.map((sym) => {
          const IconComponent = sym.icon;
          const isSelected = selectedDomain?.id === sym.id;

          return (
            <motion.button
              key={sym.id}
              whileHover={{ scale: 1.08 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => handleSelect(sym)}
              className={`p-4 rounded-2xl bg-surface border transition-all duration-300 flex flex-col items-center justify-center space-y-2 ${sym.color} ${
                isSelected
                  ? 'border-crimson-bright bg-crimson-900/40 shadow-[0_0_30px_#FF2A55]'
                  : 'border-gray-800'
              }`}
            >
              <IconComponent className={`w-7 h-7 ${isSelected ? 'text-crimson-bright animate-bounce' : 'text-gray-300'}`} />
              <span className="font-mono text-[10px] font-bold text-gray-300 tracking-wider uppercase">
                {sym.name}
              </span>
            </motion.button>
          );
        })}
      </div>

      {/* Selection Reveal Banner */}
      <AnimatePresence>
        {selectedDomain && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="p-4 rounded-xl bg-gradient-to-r from-crimson-950 via-surface to-crimson-950 border border-crimson-bright/50 flex flex-col sm:flex-row items-center justify-between gap-3 text-center sm:text-left"
          >
            <div className="flex items-center space-x-3">
              <Sparkles className="w-5 h-5 text-yellow-400 animate-spin" />
              <div>
                <span className="font-mono text-[10px] text-gray-400 uppercase tracking-widest">MATCHED BREATHER DOMAIN</span>
                <p className="font-display font-bold text-white text-lg">
                  YOUR BATTLEFIELD: <span className="text-crimson-bright text-glow-crimson">{selectedDomain.name.toUpperCase()}</span>
                </p>
              </div>
            </div>

            <button
              onClick={() => {
                soundEngine.playKatanaSlash();
                document.querySelector('#tracks')?.scrollIntoView({ behavior: 'smooth' });
              }}
              className="px-4 py-2 rounded-lg bg-crimson-600 text-white font-mono text-xs font-bold hover:bg-crimson-bright transition-colors sword-slash-container"
            >
              VIEW {selectedDomain.name.toUpperCase()} TRACK →
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

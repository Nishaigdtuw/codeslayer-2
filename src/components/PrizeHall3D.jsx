import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { eventConfig } from '../data/eventConfig';
import { soundEngine } from '../utils/audio';
import { Crown, Medal, Award, Sparkles, Check, Flame } from 'lucide-react';

export const PrizeHall3D = () => {
  const [hoveredSeal, setHoveredSeal] = useState(null);

  const mainPrizes = eventConfig.prizes.mainPodium;

  return (
    <section id="prizes" className="py-28 px-4 sm:px-8 relative z-20 overflow-hidden bg-[#0B0B0E]">
      {/* Realm Scene Background Image — Japanese Ceremonial Imperial Hall */}
      <div className="absolute inset-0 z-0">
        <img
          src="/assets/ceremonial-prizes-bg.png"
          alt="Ceremonial Prize Hall"
          className="w-full h-full object-cover filter contrast-125 brightness-75 opacity-40"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-[#0B0B0E] via-transparent to-[#0B0B0E]" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto">
        <div className="katana-divider mb-16" />

        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="font-mono text-xs uppercase tracking-[0.3em] text-yellow-400 font-bold px-3.5 py-1.5 bg-yellow-500/20 border border-yellow-500/40 rounded-full">
            VICTORY REWARDS
          </span>
          <h2 className="font-display text-4xl sm:text-7xl font-black text-white mt-4 tracking-tight">
            HALL OF <span className="text-yellow-400 text-glow-white">VICTORY</span>
          </h2>
          <p className="text-gray-300 text-base sm:text-xl font-light mt-3">
            {eventConfig.prizes.statusNote}
          </p>

          {/* Total Cash Rewards Badge Banner */}
          <div className="inline-flex items-center space-x-2 my-6 px-6 py-2.5 rounded-2xl bg-gradient-to-r from-amber-600 via-yellow-500 to-amber-600 text-black font-display font-black text-xl sm:text-2xl shadow-[0_0_40px_rgba(234,179,8,0.7)]">
            <Sparkles className="w-6 h-6 fill-current animate-spin" />
            <span>{eventConfig.prizes.totalCashPool}</span>
          </div>
        </div>

        {/* 3D RISING PODIUM COMPOSITION */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-end max-w-5xl mx-auto my-16">
          
          {/* #02 RUNNER-UP */}
          <motion.div
            initial={{ opacity: 0, y: 60 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            onMouseEnter={() => soundEngine.playClick()}
            className="order-2 md:order-1 p-8 rounded-3xl bg-anime-glass border-2 border-slate-400/60 shadow-[0_0_30px_rgba(148,163,184,0.3)] flex flex-col justify-between text-left h-[26rem] interactive-card"
          >
            <div>
              <div className="flex items-center justify-between mb-4">
                <span className="font-mono text-3xl font-black text-slate-300">02</span>
                <Medal className="w-8 h-8 text-slate-300" />
              </div>
              <span className="font-mono text-xs font-bold text-slate-400 tracking-widest block uppercase">RUNNER-UP</span>
              <h3 className="font-display text-2xl font-bold text-white mt-1 mb-3">{mainPrizes[1].title}</h3>
              <div className="font-display font-black text-4xl text-slate-200 text-glow-white mb-6">
                {mainPrizes[1].cash}
              </div>
              
              <div className="space-y-2">
                {mainPrizes[1].perks.map((perk) => (
                  <div key={perk} className="flex items-center space-x-2 text-xs text-gray-300">
                    <Check className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                    <span>{perk}</span>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>

          {/* #01 GRAND CHAMPION (Center Tallest Podium) */}
          <motion.div
            initial={{ opacity: 0, y: 80 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            onMouseEnter={() => soundEngine.playClick()}
            className="order-1 md:order-2 p-8 rounded-3xl bg-gradient-to-b from-[#1c1827] via-[#121118] to-[#1c1827] border-4 border-yellow-400 shadow-[0_0_60px_rgba(234,179,8,0.7)] flex flex-col justify-between text-left h-[30rem] scale-105 z-20 relative interactive-card"
          >
            <div className="absolute -top-5 left-1/2 transform -translate-x-1/2 bg-gradient-to-r from-yellow-400 via-amber-500 to-yellow-400 text-black font-extrabold text-xs px-5 py-1.5 rounded-full uppercase tracking-widest shadow-lg flex items-center gap-1.5">
              <Crown className="w-4 h-4 fill-current" />
              GRAND CHAMPION
            </div>

            <div>
              <div className="flex items-center justify-between mt-2 mb-4">
                <span className="font-mono text-4xl font-black text-yellow-400 text-glow-white">01</span>
                <Crown className="w-10 h-10 text-yellow-400 animate-bounce" />
              </div>
              <span className="font-mono text-xs font-bold text-yellow-400 tracking-widest block uppercase">FIRST PLACE</span>
              <h3 className="font-display text-3xl font-extrabold text-white mt-1 mb-3">{mainPrizes[0].title}</h3>
              <div className="font-display font-black text-5xl text-yellow-400 text-glow-white mb-6">
                {mainPrizes[0].cash}
              </div>

              <div className="space-y-2.5">
                {mainPrizes[0].perks.map((perk) => (
                  <div key={perk} className="flex items-center space-x-2 text-xs text-gray-200 font-medium">
                    <Check className="w-4 h-4 text-yellow-400 shrink-0" />
                    <span>{perk}</span>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>

          {/* #03 SECOND RUNNER-UP */}
          <motion.div
            initial={{ opacity: 0, y: 60 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.3 }}
            onMouseEnter={() => soundEngine.playClick()}
            className="order-3 p-8 rounded-3xl bg-anime-glass border-2 border-amber-700/60 shadow-[0_0_30px_rgba(180,83,9,0.3)] flex flex-col justify-between text-left h-[26rem] interactive-card"
          >
            <div>
              <div className="flex items-center justify-between mb-4">
                <span className="font-mono text-3xl font-black text-amber-500">03</span>
                <Award className="w-8 h-8 text-amber-500" />
              </div>
              <span className="font-mono text-xs font-bold text-amber-500 tracking-widest block uppercase">SECOND RUNNER-UP</span>
              <h3 className="font-display text-2xl font-bold text-white mt-1 mb-3">{mainPrizes[2].title}</h3>
              <div className="font-display font-black text-4xl text-amber-400 text-glow-white mb-6">
                {mainPrizes[2].cash}
              </div>

              <div className="space-y-2">
                {mainPrizes[2].perks.map((perk) => (
                  <div key={perk} className="flex items-center space-x-2 text-xs text-gray-300">
                    <Check className="w-3.5 h-3.5 text-amber-500 shrink-0" />
                    <span>{perk}</span>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>

        </div>

        {/* Japanese Hanko Stamp Emblem Badges */}
        <div className="mt-20">
          <h3 className="font-display text-2xl sm:text-3xl font-bold text-white mb-8 text-center flex items-center justify-center gap-2">
            <Flame className="w-6 h-6 text-crimson-bright" />
            SPECIAL TITLES & CATEGORY EMBLEMS
          </h3>

          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4">
            {eventConfig.prizes.specialTitles.map((sp) => {
              const isHovered = hoveredSeal === sp.category;

              return (
                <motion.div
                  key={sp.category}
                  onMouseEnter={() => {
                    soundEngine.playClick();
                    setHoveredSeal(sp.category);
                  }}
                  onMouseLeave={() => setHoveredSeal(null)}
                  whileHover={{ scale: 1.05, rotate: 2 }}
                  className={`p-5 rounded-2xl bg-surface/90 border-2 transition-all cursor-pointer text-center relative overflow-hidden ${
                    isHovered
                      ? 'border-crimson-bright shadow-[0_0_25px_#FF2A55] bg-crimson-950/40'
                      : 'border-gray-800'
                  }`}
                >
                  <div className="w-12 h-12 rounded-full border-2 border-crimson-bright/40 mx-auto flex items-center justify-center font-display font-black text-crimson-bright text-xs mb-3 shadow-inner">
                    印
                  </div>

                  <span className="font-display font-bold text-xs text-white block mb-1">
                    {sp.category}
                  </span>

                  <span className="font-mono text-sm font-black text-crimson-bright text-glow-crimson block">
                    {sp.reward}
                  </span>
                </motion.div>
              );
            })}
          </div>
        </div>

      </div>
    </section>
  );
};

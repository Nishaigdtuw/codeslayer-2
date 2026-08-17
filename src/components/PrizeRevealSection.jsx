import React from 'react';
import { motion } from 'framer-motion';
import { ParallaxBackground } from './ParallaxBackground';
import { soundEngine } from '../utils/audio';
import { Lock, Sparkles, ShieldCheck } from 'lucide-react';

export const PrizeRevealSection = () => {
  return (
    <section id="prizes" className="py-32 px-4 sm:px-8 relative z-20 overflow-hidden bg-[#070709]">
      
      {/* FULL-BLEED CEREMONIAL TEMPLE BACKGROUND */}
      <ParallaxBackground
        imageSrc="/backgrounds/ceremonial-prizes-bg.png"
        altText="Ceremonial Prize Atmosphere"
        overlayOpacity={0.25}
      />

      <div className="relative z-10 max-w-5xl mx-auto text-center flex flex-col items-center">
        
        {/* Section Pill Badge */}
        <span className="font-mono text-xs uppercase tracking-[0.3em] text-yellow-300 font-bold px-4 py-2 bg-black/90 border border-yellow-400/50 rounded-full inline-block mb-6 shadow-lg">
          SCENE 07 • THE SEALED REWARD
        </span>

        {/* Sealed Glowing Crest Object */}
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          whileInView={{ scale: 1, opacity: 1 }}
          viewport={{ once: true }}
          transition={{ type: 'spring', stiffness: 150, damping: 15 }}
          onClick={() => soundEngine.playFlameBurst()}
          whileHover={{ scale: 1.08, rotate: 2 }}
          className="w-32 h-32 sm:w-40 sm:h-40 rounded-full bg-black/90 border-4 border-yellow-400 flex items-center justify-center shadow-[0_0_60px_rgba(234,179,8,0.8)] cursor-pointer relative mb-8 group"
        >
          <Lock className="w-14 h-14 text-yellow-400 group-hover:scale-110 transition-transform" />
          <div className="absolute inset-0 rounded-full border-2 border-dashed border-yellow-300 animate-spin-slow opacity-60" />
        </motion.div>

        {/* Heading */}
        <h2 className="font-display text-5xl sm:text-8xl font-black text-white tracking-tight leading-none mb-3 drop-shadow-[0_6px_24px_rgba(0,0,0,1)]">
          PRIZE <span className="text-yellow-400 text-glow-white">POOL</span>
        </h2>

        <div className="font-display font-black text-2xl sm:text-4xl text-crimson-bright uppercase tracking-wider mb-6 drop-shadow-md">
          REVEALING SOON
        </div>

        {/* Supporting Copy */}
        <div className="max-w-xl mx-auto p-6 rounded-3xl bg-black/90 border-2 border-yellow-400/50 backdrop-blur-xl shadow-2xl space-y-3">
          <p className="text-yellow-300 font-mono text-sm sm:text-base font-bold tracking-widest uppercase">
            "THE REWARDS REMAIN SEALED. FOR NOW."
          </p>
          <p className="text-gray-200 text-xs sm:text-sm font-medium leading-relaxed">
            The ultimate prize distribution will be unveiled as the battlefield date approaches. Only the strongest builds will claim the crown.
          </p>
          
          <div className="inline-flex items-center space-x-2 px-4 py-1.5 rounded-full bg-yellow-500/20 border border-yellow-400/40 text-yellow-300 font-mono text-xs uppercase tracking-widest pt-2">
            <Sparkles className="w-4 h-4 text-yellow-300 animate-spin" />
            <span>STAY TUNED FOR ANNOUNCEMENT</span>
          </div>
        </div>

      </div>
    </section>
  );
};

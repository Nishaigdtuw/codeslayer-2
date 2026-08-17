import React from 'react';
import { motion } from 'framer-motion';
import { UserPlus, FileText, Swords, ArrowRight } from 'lucide-react';
import { soundEngine } from '../utils/audio';

export const EventFormatSection = () => {
  const stages = [
    {
      step: 'STAGE 01',
      title: 'Register',
      date: '20 August – 6 October 2026',
      icon: UserPlus,
      desc: 'Form your team of 2 to 4 hackers and register on the official portal before the deadline.',
      badge: 'Registrations Open',
      highlight: false,
    },
    {
      step: 'STAGE 02',
      title: 'PPT Submission',
      date: 'Deadline: 6 October 2026',
      icon: FileText,
      desc: 'Submit a concise pitch deck detailing Problem Statement, Solution, Innovation, Tech Stack, Execution & Impact.',
      badge: 'Online Selection Trial',
      highlight: true,
    },
    {
      step: 'STAGE 03',
      title: 'Grand Finale',
      date: '24–25 October 2026',
      icon: Swords,
      desc: 'Shortlisted finalist teams gather at NIT Delhi for 36 continuous hours of building and competing.',
      badge: 'Offline Battlefield (NIT Delhi)',
      highlight: false,
    },
  ];

  return (
    <section className="py-24 px-4 sm:px-8 relative z-20 max-w-7xl mx-auto">
      <div className="text-center max-w-3xl mx-auto mb-16">
        <span className="text-crimson-bright font-mono text-xs uppercase tracking-widest px-3 py-1 bg-crimson-500/10 border border-crimson-bright/30 rounded-lg">
          Flow of Battle
        </span>
        <h2 className="font-display text-4xl sm:text-6xl font-extrabold text-white mt-4 tracking-tight">
          Your Path to the <span className="text-crimson-bright text-glow-crimson">Battlefield</span>
        </h2>
        <p className="text-gray-300 text-base sm:text-lg mt-3">
          Follow the three stages to claim your place in the 36-hour offline finale.
        </p>
      </div>

      {/* 3-Stage Connected Path Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 relative">
        {/* Animated Connecting Line behind stages on desktop */}
        <div className="hidden md:block absolute top-1/2 left-0 right-0 h-1 bg-gradient-to-r from-crimson-600 via-crimson-bright to-crimson-600 transform -translate-y-1/2 z-0 opacity-40" />

        {stages.map((stage, idx) => {
          const IconComponent = stage.icon;
          return (
            <motion.div
              key={stage.step}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: idx * 0.2 }}
              onMouseEnter={() => soundEngine.playClick()}
              className={`relative z-10 p-8 rounded-3xl bg-anime-glass border ${
                stage.highlight
                  ? 'border-crimson-bright shadow-[0_0_35px_rgba(230,0,51,0.4)] scale-105'
                  : 'border-crimson-500/30 hover:border-crimson-bright/70'
              } transition-all duration-300 flex flex-col justify-between interactive-card`}
            >
              <div>
                <div className="flex items-center justify-between mb-6">
                  <span className="font-mono text-xs font-bold tracking-widest text-crimson-bright px-3 py-1 bg-crimson-500/20 rounded-full border border-crimson-bright/30">
                    {stage.step}
                  </span>
                  <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-crimson-500 to-crimson-700 flex items-center justify-center text-white shadow-lg">
                    <IconComponent className="w-6 h-6" />
                  </div>
                </div>

                <h3 className="font-display text-2xl font-bold text-white mb-2">{stage.title}</h3>
                <p className="font-mono text-xs text-red-400 font-semibold mb-4">{stage.date}</p>
                <p className="text-gray-300 text-sm leading-relaxed mb-6">{stage.desc}</p>
              </div>

              <div className="pt-4 border-t border-gray-800 flex items-center justify-between text-xs font-mono text-gray-400">
                <span>{stage.badge}</span>
                {idx < 2 && <ArrowRight className="w-4 h-4 text-crimson-bright hidden md:block" />}
              </div>
            </motion.div>
          );
        })}
      </div>
    </section>
  );
};

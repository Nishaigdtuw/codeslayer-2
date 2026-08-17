import React from 'react';
import { motion } from 'framer-motion';
import { soundEngine } from '../utils/audio';
import { GraduationCap, Code, Palette, Rocket, Compass, Sparkles } from 'lucide-react';

export const ParticipationSection = () => {
  const participants = [
    { title: 'College Students', icon: GraduationCap, desc: 'Undergraduates, postgraduates & diploma candidates across all streams.' },
    { title: 'Developers & Coders', icon: Code, desc: 'Frontend, backend, mobile, AI & full-stack software engineers.' },
    { title: 'Designers & UI/UX', icon: Palette, desc: 'Product thinkers, UI designers & creative visual artists.' },
    { title: 'Innovators & Founders', icon: Rocket, desc: 'Visionaries with bold real-world problem-solving ideas.' },
    { title: 'Beginners & First-Timers', icon: Compass, desc: 'Passionate learners eager to build their very first hackathon project.' },
    { title: 'Seasoned Hackers', icon: Sparkles, desc: 'Hackathon veterans ready to push tech boundaries.' },
  ];

  return (
    <section className="py-24 px-4 sm:px-8 relative z-20 max-w-7xl mx-auto">
      <div className="katana-divider mb-16" />

      <div className="text-center max-w-3xl mx-auto mb-16">
        <span className="text-crimson-bright font-mono text-xs uppercase tracking-widest px-3 py-1 bg-crimson-500/10 border border-crimson-bright/30 rounded-lg">
          Battle Eligibility
        </span>
        <h2 className="font-display text-4xl sm:text-6xl font-extrabold text-white mt-4 tracking-tight">
          Who Can <span className="text-crimson-bright text-glow-crimson">Enter?</span>
        </h2>
        <p className="text-gray-300 text-base sm:text-lg mt-3">
          Whether this is your first hackathon or your tenth, if you're ready to build — the battlefield is open.
        </p>
      </div>

      {/* Grid of Participant Types */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {participants.map((p, idx) => {
          const IconComp = p.icon;
          return (
            <motion.div
              key={p.title}
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: idx * 0.1 }}
              onMouseEnter={() => soundEngine.playClick()}
              className="p-6 rounded-2xl bg-anime-glass border border-crimson-500/20 hover:border-crimson-bright transition-all group interactive-card"
            >
              <div className="w-12 h-12 rounded-xl bg-crimson-500/20 border border-crimson-bright/40 flex items-center justify-center text-crimson-bright mb-4 group-hover:scale-110 group-hover:bg-crimson-600 group-hover:text-white transition-all">
                <IconComp className="w-6 h-6" />
              </div>
              <h3 className="font-display font-bold text-lg text-white mb-2 group-hover:text-crimson-bright transition-colors">
                {p.title}
              </h3>
              <p className="text-xs text-gray-400 leading-relaxed">{p.desc}</p>
            </motion.div>
          );
        })}
      </div>
    </section>
  );
};

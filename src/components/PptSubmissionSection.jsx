import React from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { eventConfig } from '../data/eventConfig';
import { soundEngine } from '../utils/audio';
import { FileCheck, Download, ExternalLink, Calendar, CheckCircle2 } from 'lucide-react';

export const PptSubmissionSection = () => {
  const { scrollYProgress } = useScroll();
  const swordY = useTransform(scrollYProgress, [0.2, 0.5], [-50, 100]);

  return (
    <section id="ppt-round" className="py-28 px-4 sm:px-8 relative z-20 overflow-hidden bg-[#0B0B0E]">
      {/* Realm Background Image — Torii Gate & Ancient Temple */}
      <div className="absolute inset-0 z-0">
        <img
          src="/assets/selection-trial-bg.png"
          alt="Selection Trial Torii Gate"
          className="w-full h-full object-cover filter contrast-125 brightness-60 opacity-50"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-[#0B0B0E] via-transparent to-[#0B0B0E]" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto">
        <div className="katana-divider mb-16" />

        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="font-mono text-xs uppercase tracking-[0.3em] text-crimson-bright font-bold px-3.5 py-1.5 bg-crimson-500/20 border border-crimson-bright/40 rounded-full">
            ROUND 01 EVALUATION
          </span>
          <h2 className="font-display text-4xl sm:text-7xl font-black text-white mt-4 tracking-tight">
            THE SELECTION <span className="text-crimson-bright text-glow-crimson">TRIAL</span>
          </h2>
          <p className="text-gray-300 text-base sm:text-xl font-light mt-3">
            Before entering the final battlefield, every team must prove the strength of their idea.
          </p>
        </div>

        {/* Center Giant Vertical Katana Sword & Split Stage Layout */}
        <div className="relative grid grid-cols-1 lg:grid-cols-12 gap-8 items-center min-h-[30rem]">
          
          {/* Scroll-Controlled Vertical Katana Sword Line down center */}
          <motion.div
            style={{ y: swordY }}
            className="hidden lg:flex absolute left-1/2 top-0 bottom-0 transform -translate-x-1/2 z-20 flex-col items-center pointer-events-none"
          >
            <div className="w-4 h-8 bg-crimson-bright rounded-t shadow-[0_0_20px_#FF2A55]" />
            <div className="w-1 flex-grow bg-gradient-to-b from-crimson-bright via-crimson-600 to-transparent shadow-[0_0_15px_#FF2A55]" />
            <div className="w-0 h-0 border-l-4 border-l-transparent border-r-4 border-r-transparent border-t-8 border-t-crimson-bright" />
          </motion.div>

          {/* Left Column: Stage 01 Register */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="lg:col-span-5 p-8 rounded-3xl bg-anime-glass border-2 border-crimson-500/40 shadow-xl flex flex-col justify-between text-left"
          >
            <div>
              <span className="font-mono text-xs text-crimson-bright font-bold tracking-widest uppercase">STAGE 01</span>
              <h3 className="font-display text-3xl font-extrabold text-white mt-1 mb-2">REGISTER YOUR TEAM</h3>
              <p className="font-mono text-sm text-red-400 font-bold mb-4">20 AUG → 06 OCT 2026</p>
              <p className="text-gray-300 text-sm leading-relaxed mb-6">
                Build your team of 2 to 4 hackers and register on Unstop to enter the trial.
              </p>
            </div>

            <a
              href={eventConfig.links.registration}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => soundEngine.playKatanaSlash()}
              className="py-3.5 px-6 rounded-xl bg-crimson-600 hover:bg-crimson-bright text-white font-bold text-sm shadow-lg flex items-center justify-center space-x-2 sword-slash-container"
            >
              <span>REGISTER NOW</span>
              <ExternalLink className="w-4 h-4" />
            </a>
          </motion.div>

          {/* Center Column Spacer */}
          <div className="hidden lg:block lg:col-span-2" />

          {/* Right Column: Stage 02 Submit Your PPT */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="lg:col-span-5 p-8 rounded-3xl bg-anime-glass border-2 border-crimson-bright shadow-[0_0_35px_rgba(230,0,51,0.4)] flex flex-col justify-between text-left"
          >
            <div>
              <span className="font-mono text-xs text-crimson-bright font-bold tracking-widest uppercase">STAGE 02</span>
              <h3 className="font-display text-3xl font-extrabold text-white mt-1 mb-2">SUBMIT YOUR PPT</h3>
              <p className="font-mono text-sm text-yellow-400 font-bold mb-4">DEADLINE — 06 OCT 2026</p>
              <p className="text-gray-300 text-sm leading-relaxed mb-6">
                Submit a concise pitch deck detailing your problem, solution, tech stack, execution, and expected impact.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-3">
              <a
                href={eventConfig.links.pptSubmission}
                onClick={() => soundEngine.playKatanaSlash()}
                className="flex-1 py-3.5 px-4 rounded-xl bg-gradient-to-r from-crimson-600 to-crimson-bright text-white font-bold text-xs shadow-lg text-center flex items-center justify-center space-x-1 sword-slash-container"
              >
                <span>SUBMIT PPT</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
              <a
                href={eventConfig.links.pptGuidelines}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => soundEngine.playClick()}
                className="flex-1 py-3.5 px-4 rounded-xl bg-surface border border-gray-700 text-gray-200 font-bold text-xs text-center hover:border-crimson-bright flex items-center justify-center space-x-1"
              >
                <Download className="w-3.5 h-3.5 text-crimson-bright" />
                <span>PPT TEMPLATE</span>
              </a>
            </div>
          </motion.div>

        </div>

        {/* Floating Requirement Labels */}
        <div className="mt-16 text-center">
          <p className="font-mono text-xs text-gray-400 uppercase tracking-widest mb-6">
            MANDATORY PPT PITCH DECK REQUIREMENTS
          </p>

          <div className="flex flex-wrap items-center justify-center gap-3">
            {eventConfig.pptRequirements.map((req) => (
              <div
                key={req.title}
                className="px-4 py-2 rounded-xl bg-surface/80 border border-crimson-500/30 hover:border-crimson-bright transition-colors flex items-center space-x-2 text-xs font-mono font-bold text-gray-200"
              >
                <CheckCircle2 className="w-4 h-4 text-crimson-bright shrink-0" />
                <span>{req.title}</span>
              </div>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
};

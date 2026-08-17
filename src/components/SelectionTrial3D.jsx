import React from 'react';
import { motion } from 'framer-motion';
import { SectionBackground } from './SectionBackground';
import { eventConfig } from '../data/eventConfig';
import { backgrounds } from '../data/backgrounds';
import { soundEngine } from '../utils/audio';
import { Scroll, Download, FileText, CheckCircle2 } from 'lucide-react';

export const SelectionTrial3D = () => {
  return (
    <section id="ppt-round" className="relative min-h-screen py-28 px-4 sm:px-8 overflow-hidden flex flex-col justify-center">
      
      {/* SELECTION TRIAL BACKGROUND: 03_torii_cherry_blossom.png */}
      <SectionBackground
        src={backgrounds.trial}
        alt="Torii Cherry Blossom Selection Trial Atmosphere"
        overlayOpacity={0.10}
      />

      {/* Subtle Central Readability Gradient */}
      <div className="absolute inset-0 bg-radial-vignette opacity-40 pointer-events-none z-0" />

      <div className="relative z-10 max-w-7xl mx-auto w-full">
        
        {/* Section Header — DIRECTLY OVER IMAGERY WITH TEXT SHADOW */}
        <div className="text-center max-w-4xl mx-auto mb-16 p-6 rounded-xl bg-black/15 border border-pink-400/30 backdrop-blur-sm shadow-2xl">
          <span className="font-mono text-xs uppercase tracking-[0.3em] text-pink-300 font-bold px-4 py-1.5 bg-pink-950/60 border border-pink-400/40 rounded-full inline-block mb-4">
            ROUND 1 • ONLINE SELECTION TRIAL
          </span>

          <h2 className="font-display text-4xl sm:text-7xl font-black text-white tracking-tight leading-tight drop-shadow-[0_6px_24px_rgba(0,0,0,1)]">
            SUBMIT YOUR PITCH. <br />
            <span className="text-pink-400 text-glow-white">UNLOCK THE BATTLEFIELD.</span>
          </h2>

          <p className="text-white text-base sm:text-xl font-bold mt-4 p-3 rounded-lg bg-pink-950/40 border border-pink-400/30 shadow-md drop-shadow-md">
            Only 65 teams will earn their ticket to the 36-hour battlefield at NIT Delhi.
          </p>
        </div>

        {/* Floating Action Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
          
          {/* Scroll 1: Registration Window */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="p-8 rounded-xl bg-black/20 border border-crimson-500/50 shadow-2xl backdrop-blur-sm relative group text-left"
          >
            <div className="flex items-center space-x-3 mb-4">
              <div className="p-3 rounded-xl bg-crimson-600/30 text-crimson-bright border border-crimson-bright/40">
                <Scroll className="w-6 h-6" />
              </div>
              <div>
                <span className="font-mono text-xs text-yellow-300 font-bold uppercase tracking-widest block">STEP 01</span>
                <h3 className="font-display font-black text-2xl text-white drop-shadow-md">REGISTRATION WINDOW</h3>
              </div>
            </div>

            <p className="text-gray-100 text-sm font-medium mb-6 drop-shadow-sm">
              Form your team of 2–4 members and register on Unstop before the final portal seal closes.
            </p>

            <div className="p-3 rounded-lg bg-red-950/50 border border-red-500/40 font-mono text-xs text-yellow-300 font-bold space-y-1 mb-6">
              <div>OPENS: 20 AUGUST 2026</div>
              <div>CLOSES: 06 OCTOBER 2026</div>
            </div>

            <a
              href={eventConfig.links.registration}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => soundEngine.playKatanaSlash()}
              className="w-full py-4 rounded-lg font-black text-sm text-white bg-gradient-to-r from-crimson-600 to-crimson-bright hover:scale-102 transition-all flex items-center justify-center space-x-2 uppercase tracking-wider shadow-lg"
            >
              <span>REGISTER ON UNSTOP</span>
            </a>
          </motion.div>

          {/* Scroll 2: PPT Submission */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="p-8 rounded-xl bg-black/20 border border-yellow-400/50 shadow-2xl backdrop-blur-sm relative group text-left"
          >
            <div className="flex items-center space-x-3 mb-4">
              <div className="p-3 rounded-xl bg-yellow-500/30 text-yellow-400 border border-yellow-400/40">
                <FileText className="w-6 h-6" />
              </div>
              <div>
                <span className="font-mono text-xs text-yellow-300 font-bold uppercase tracking-widest block">STEP 02</span>
                <h3 className="font-display font-black text-2xl text-white drop-shadow-md">PPT SUBMISSION</h3>
              </div>
            </div>

            <p className="text-gray-100 text-sm font-medium mb-6 drop-shadow-sm">
              Submit your idea deck adhering to the required 6-slide architecture guidelines.
            </p>

            <div className="p-3 rounded-lg bg-yellow-950/50 border border-yellow-500/40 font-mono text-xs text-yellow-300 font-bold space-y-1 mb-6">
              <div>DEADLINE: 06 OCTOBER 2026</div>
              <div>FORMAT: PDF / GOOGLE SLIDES</div>
            </div>

            <a
              href={eventConfig.links.pptGuidelines}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => soundEngine.playClick()}
              className="w-full py-4 rounded-lg font-black text-sm text-black bg-yellow-400 hover:bg-yellow-300 transition-all flex items-center justify-center space-x-2 uppercase tracking-wider shadow-lg"
            >
              <Download className="w-4 h-4 text-black" />
              <span>DOWNLOAD OFFICIAL TEMPLATE</span>
            </a>
          </motion.div>

        </div>

        {/* REQUIRED PPT SLIDE ARCHITECTURE PANEL */}
        <div className="p-6 sm:p-10 rounded-xl bg-black/20 border border-pink-400/40 shadow-2xl backdrop-blur-sm text-left">
          
          <h3 className="font-display font-black text-2xl sm:text-4xl text-white tracking-tight mb-2 drop-shadow-[0_4px_16px_rgba(0,0,0,1)]">
            REQUIRED PPT SLIDE <span className="text-pink-400">ARCHITECTURE</span>
          </h3>
          <p className="text-gray-100 text-sm sm:text-base font-medium mb-8 drop-shadow-sm">
            Your Round 1 presentation deck must clearly cover the following 6 pillars:
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {eventConfig.pptRequirements.map((req, idx) => (
              <div
                key={req.title}
                className="p-5 rounded-lg bg-black/30 border border-pink-500/30 hover:border-pink-400 transition-colors backdrop-blur-sm"
              >
                <div className="flex items-center space-x-2 font-mono text-xs text-pink-300 font-bold mb-2">
                  <CheckCircle2 className="w-4 h-4 text-pink-400" />
                  <span>SLIDE 0{idx + 1}</span>
                </div>
                <h4 className="font-display font-bold text-base text-white mb-1 drop-shadow-md">{req.title}</h4>
                <p className="text-xs text-gray-200 font-medium leading-relaxed">{req.desc}</p>
              </div>
            ))}
          </div>

        </div>

      </div>
    </section>
  );
};

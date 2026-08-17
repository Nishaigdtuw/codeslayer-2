import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { eventConfig } from '../data/eventConfig';
import { soundEngine } from '../utils/audio';
import { OrganiserLogos } from './OrganiserLogos';
import { Calendar, MapPin, ChevronDown, Ticket, Compass } from 'lucide-react';

export const HeroSection = () => {
  const [timeLeft, setTimeLeft] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 });

  useEffect(() => {
    const targetDate = new Date(eventConfig.dates.finalRoundTargetISO).getTime();

    const updateCountdown = () => {
      const now = new Date().getTime();
      const difference = targetDate - now;

      if (difference > 0) {
        setTimeLeft({
          days: Math.floor(difference / (1000 * 60 * 60 * 24)),
          hours: Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
          minutes: Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60)),
          seconds: Math.floor((difference % (1000 * 60)) / 1000),
        });
      } else {
        setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 });
      }
    };

    updateCountdown();
    const interval = setInterval(updateCountdown, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <section id="hero" className="relative min-h-screen flex flex-col justify-between pt-28 pb-12 px-4 sm:px-8 overflow-hidden bg-[#0B0B0E]">
      {/* Background Graphic Artwork & Dark Vignette Overlays */}
      <div className="absolute inset-0 z-0">
        <img
          src="/assets/hero-bg.png"
          alt="CodeSlayer Blood Moon Realm"
          className="w-full h-full object-cover object-center opacity-45 scale-105 transform filter contrast-125 brightness-90"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#0B0B0E] via-[#0B0B0E]/60 to-transparent" />
        <div className="absolute inset-0 bg-radial-gradient from-transparent via-[#0B0B0E]/80 to-[#0B0B0E]" />
      </div>

      {/* Main Hero Content */}
      <div className="relative z-20 max-w-6xl mx-auto w-full text-center flex flex-col items-center my-auto">
        
        {/* Subtitle Badge */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="inline-flex items-center space-x-2 px-4 py-1.5 rounded-full bg-crimson-500/20 border border-crimson-bright/40 text-red-300 text-xs sm:text-sm font-mono uppercase tracking-[0.25em] mb-6 shadow-[0_0_15px_rgba(230,0,51,0.4)]"
        >
          <span>REALM OF THE CODESLAYER</span>
          <span className="w-1.5 h-1.5 rounded-full bg-crimson-bright animate-ping" />
        </motion.div>

        {/* Oversized Cinematic Brand Heading */}
        <div className="relative mb-4">
          <motion.div
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[125%] h-4 bg-gradient-to-r from-transparent via-crimson-bright to-transparent -rotate-2 opacity-80 blur-[2px]"
          />

          <motion.h1
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="font-display text-6xl sm:text-8xl md:text-[10rem] font-black tracking-tight text-white drop-shadow-2xl leading-none"
          >
            CODESLAYER <span className="text-crimson-bright text-glow-crimson">2.0</span>
          </motion.h1>
        </div>

        {/* Subtitles & Tagline */}
        <motion.p
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="font-mono text-xl sm:text-3xl text-crimson-bright font-bold tracking-[0.2em] mb-2 text-glow-crimson uppercase"
        >
          {eventConfig.tagline}
        </motion.p>

        <motion.p
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="text-gray-300 text-lg sm:text-2xl font-light tracking-wide max-w-2xl mb-10"
        >
          {eventConfig.subtitle}
        </motion.p>

        {/* Custom Event Poster Date & Venue Typography */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, delay: 0.7 }}
          className="my-6 p-6 rounded-3xl bg-anime-glass border-2 border-crimson-bright/40 shadow-[0_0_35px_rgba(230,0,51,0.3)] max-w-xl w-full"
        >
          <span className="font-mono text-[10px] tracking-[0.3em] text-crimson-bright font-bold uppercase block mb-2">
            THE FINAL BATTLE ANNOUNCEMENT
          </span>

          <div className="flex items-center justify-center space-x-6 my-2">
            {/* Giant Poster Date Numbers */}
            <div className="flex items-baseline space-x-2 font-display text-5xl sm:text-7xl font-black text-white text-glow-white">
              <span>24</span>
              <span className="text-crimson-bright">—25</span>
            </div>

            {/* Vertical Month & Year */}
            <div className="text-left font-mono border-l-2 border-crimson-bright/60 pl-4 py-1">
              <span className="block font-black text-xl sm:text-2xl text-crimson-bright tracking-wider leading-none">OCT</span>
              <span className="block font-bold text-sm text-gray-300 tracking-widest mt-0.5">2026</span>
            </div>
          </div>

          <div className="katana-divider my-4" />

          {/* Location & Offline Finale Stamp */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3 font-mono text-xs sm:text-sm text-gray-200">
            <div className="flex items-center space-x-1.5 text-white font-bold">
              <MapPin className="w-4 h-4 text-crimson-bright" />
              <span>LOCATION: NIT DELHI</span>
            </div>
            <span className="hidden sm:inline text-crimson-bright">•</span>
            <span className="text-red-300 font-semibold uppercase">36-Hour Offline Finale</span>
          </div>
        </motion.div>

        {/* Demon Timer / Battle Timer Bar */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.8 }}
          className="w-full max-w-xl my-6 p-4 rounded-2xl bg-surface/90 border border-crimson-500/40 shadow-lg relative overflow-hidden"
        >
          {/* Katana Progress Line Background */}
          <div className="absolute bottom-0 left-0 h-1 bg-gradient-to-r from-crimson-600 via-crimson-bright to-crimson-600 w-full shadow-[0_0_10px_#FF2A55]" />

          <span className="font-mono text-[10px] tracking-[0.2em] text-gray-400 uppercase block mb-1">
            THE BATTLE BEGINS IN
          </span>

          <div className="font-mono text-2xl sm:text-4xl font-extrabold text-white text-glow-white tracking-widest flex items-center justify-center space-x-2">
            <span>{String(timeLeft.days).padStart(3, '0')}</span>
            <span className="text-crimson-bright">:</span>
            <span>{String(timeLeft.hours).padStart(2, '0')}</span>
            <span className="text-crimson-bright">:</span>
            <span>{String(timeLeft.minutes).padStart(2, '0')}</span>
            <span className="text-crimson-bright">:</span>
            <span className="text-crimson-bright animate-pulse">{String(timeLeft.seconds).padStart(2, '0')}</span>
          </div>
          <div className="flex justify-center gap-8 font-mono text-[9px] text-gray-400 mt-1 uppercase tracking-widest">
            <span>DAYS</span>
            <span>HRS</span>
            <span>MIN</span>
            <span>SEC</span>
          </div>
        </motion.div>

        {/* Primary & Secondary Action CTAs */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.9 }}
          className="flex flex-col sm:flex-row items-center gap-4 w-full sm:w-auto mt-4"
        >
          <a
            href={eventConfig.links.registration}
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => soundEngine.playKatanaSlash()}
            className="w-full sm:w-auto px-10 py-4 rounded-2xl font-black text-base text-white bg-gradient-to-r from-crimson-600 via-crimson-bright to-crimson-600 border border-crimson-bright shadow-[0_0_30px_rgba(230,0,51,0.7)] hover:shadow-[0_0_50px_rgba(255,42,85,1)] hover:scale-105 transition-all duration-300 flex items-center justify-center space-x-2 sword-slash-container"
          >
            <Ticket className="w-5 h-5 text-white" />
            <span>CLAIM BATTLE PASS</span>
          </a>

          <a
            href="#tracks"
            onClick={(e) => {
              soundEngine.playClick();
              e.preventDefault();
              document.querySelector('#tracks')?.scrollIntoView({ behavior: 'smooth' });
            }}
            className="w-full sm:w-auto px-8 py-4 rounded-2xl font-bold text-base text-gray-200 bg-surface/80 border border-gray-700 hover:border-crimson-bright hover:text-white transition-all flex items-center justify-center space-x-2"
          >
            <Compass className="w-5 h-5 text-crimson-bright" />
            <span>CHOOSE BATTLEFIELD</span>
          </a>
        </motion.div>

        {/* Clean Institutional Organiser Logos Strip */}
        <OrganiserLogos />
      </div>

      {/* Scroll Down Indicator */}
      <div
        className="relative z-20 flex flex-col items-center justify-center mt-6 cursor-pointer"
        onClick={() => {
          soundEngine.playClick();
          document.querySelector('#about')?.scrollIntoView({ behavior: 'smooth' });
        }}
      >
        <span className="text-[10px] font-mono tracking-[0.3em] text-gray-400 mb-1 uppercase hover:text-crimson-bright transition-colors">
          SCROLL TO ENTER THE REALMS
        </span>
        <ChevronDown className="w-5 h-5 text-crimson-bright animate-bounce" />
      </div>
    </section>
  );
};

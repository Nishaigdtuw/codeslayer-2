import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { eventConfig } from '../data/eventConfig';
import { soundEngine } from '../utils/audio';
import { Menu, X, Volume2, VolumeX, Ticket } from 'lucide-react';
import confetti from 'canvas-confetti';

export const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [logoClickCount, setLogoClickCount] = useState(0);
  const [soundMuted, setSoundMuted] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 40);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Home', href: '#hero' },
    { name: 'About', href: '#about' },
    { name: 'Trial (Round 1)', href: '#ppt-round' },
    { name: 'Tracks', href: '#tracks' },
    { name: 'Timeline', href: '#timeline' },
    { name: 'Previous Edition', href: '#legacy' },
    { name: 'Prizes', href: '#prizes' },
    { name: 'FAQ', href: '#faq' },
  ];

  const handleLogoClick = () => {
    soundEngine.playClick();
    const newCount = logoClickCount + 1;
    setLogoClickCount(newCount);

    if (newCount >= 5) {
      soundEngine.playFlameBurst();
      confetti({
        particleCount: 120,
        spread: 80,
        origin: { y: 0.1 },
        colors: ['#FF2A55', '#E60033', '#FFD700', '#8B0000']
      });
      setLogoClickCount(0);
    }
  };

  const toggleSound = () => {
    soundEngine.enabled = !soundEngine.enabled;
    setSoundMuted(!soundEngine.enabled);
  };

  const handleNavClick = (e, href) => {
    soundEngine.playKatanaSlash();
    setMobileMenuOpen(false);
    const element = document.querySelector(href);
    if (element) {
      e.preventDefault();
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-40 px-4 sm:px-8 py-4 transition-all duration-300">
      <nav
        className={`max-w-7xl mx-auto rounded-2xl transition-all duration-300 px-4 sm:px-6 py-3 flex items-center justify-between ${
          scrolled
            ? 'bg-black/95 backdrop-blur-md border border-crimson-500/40 shadow-[0_4px_30px_rgba(230,0,51,0.35)]'
            : 'bg-black/80 backdrop-blur-md border border-gray-800'
        }`}
      >
        {/* Brand Logo with Official DevSphereIndia Flower Icon */}
        <div
          onClick={handleLogoClick}
          className="flex items-center space-x-3 cursor-pointer group select-none"
          title="Click 5 times to unleash flame breathing!"
        >
          <div className="relative flex items-center justify-center group-hover:scale-105 transition-transform">
            <img
              src="/assets/devsphere-logo.png"
              alt="DevSphereIndia Official Logo"
              className="h-9 w-auto object-contain filter drop-shadow-[0_0_10px_rgba(138,43,226,0.8)]"
            />
            {logoClickCount > 0 && (
              <span className="absolute -top-2 -right-2 bg-yellow-400 text-black font-bold text-[10px] w-4 h-4 rounded-full flex items-center justify-center">
                {logoClickCount}
              </span>
            )}
          </div>
          <div>
            <div className="font-display font-black text-xl sm:text-2xl text-white tracking-wider flex items-center gap-1.5">
              <span>CODE</span>
              <span className="text-crimson-bright text-glow-crimson">SLAYER</span>
              <span className="text-xs px-1.5 py-0.5 bg-crimson-500/30 text-red-300 border border-crimson-bright/40 rounded font-mono">
                2.0
              </span>
            </div>
            <p className="text-[9px] font-mono tracking-widest text-yellow-400 -mt-1 uppercase font-bold">
              Organised by DevSphereIndia
            </p>
          </div>
        </div>

        {/* Desktop Navigation Links */}
        <div className="hidden lg:flex items-center space-x-5 text-xs font-bold">
          {navLinks.map((link) => (
            <a
              key={link.name}
              href={link.href}
              onClick={(e) => handleNavClick(e, link.href)}
              className="text-white hover:text-yellow-400 transition-colors relative py-1 uppercase tracking-wider drop-shadow-md"
            >
              {link.name}
              <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-yellow-400 group-hover:w-full transition-all duration-300 shadow-[0_0_8px_#FFD700]" />
            </a>
          ))}
        </div>

        {/* Action Controls & Register CTA */}
        <div className="hidden md:flex items-center space-x-3">
          <button
            onClick={toggleSound}
            className="p-2 rounded-xl bg-black/90 border border-crimson-500/30 text-gray-200 hover:text-crimson-bright transition-all"
            title={soundMuted ? 'Unmute Sound Effects' : 'Mute Sound Effects'}
          >
            {soundMuted ? <VolumeX className="w-5 h-5 text-gray-500" /> : <Volume2 className="w-5 h-5 text-crimson-bright animate-pulse" />}
          </button>

          <a
            href={eventConfig.links.registration}
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => soundEngine.playKatanaSlash()}
            className="relative inline-flex items-center justify-center px-5 py-2 rounded-xl font-black text-xs text-white bg-gradient-to-r from-crimson-600 via-crimson-500 to-crimson-bright border border-crimson-bright/50 shadow-[0_0_20px_rgba(230,0,51,0.5)] hover:shadow-[0_0_35px_rgba(255,42,85,0.8)] hover:scale-105 transition-all duration-300 sword-slash-container uppercase tracking-wider"
          >
            <Ticket className="w-4 h-4 mr-1.5 text-white" />
            REGISTER NOW
          </a>
        </div>

        {/* Mobile Hamburger Toggle */}
        <div className="flex lg:hidden items-center space-x-2">
          <button
            onClick={toggleSound}
            className="p-2 rounded-lg bg-black/90 border border-crimson-500/30 text-gray-200"
          >
            {soundMuted ? <VolumeX className="w-4 h-4 text-gray-500" /> : <Volume2 className="w-4 h-4 text-crimson-bright" />}
          </button>
          <button
            onClick={() => {
              soundEngine.playClick();
              setMobileMenuOpen(!mobileMenuOpen);
            }}
            className="p-2 rounded-xl bg-crimson-500/20 border border-crimson-bright/40 text-white"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </nav>

      {/* Mobile Menu Drawer */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.2 }}
            className="lg:hidden mt-3 max-w-7xl mx-auto bg-black/95 border border-crimson-500/40 rounded-2xl p-6 backdrop-blur-xl shadow-2xl"
          >
            <div className="flex flex-col space-y-4">
              {navLinks.map((link) => (
                <a
                  key={link.name}
                  href={link.href}
                  onClick={(e) => handleNavClick(e, link.href)}
                  className="text-white hover:text-yellow-400 font-bold text-base border-b border-gray-800/60 pb-2 flex items-center justify-between"
                >
                  <span>{link.name}</span>
                  <span className="text-yellow-400 text-xs">⚔️</span>
                </a>
              ))}
              <a
                href={eventConfig.links.registration}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => {
                  soundEngine.playKatanaSlash();
                  setMobileMenuOpen(false);
                }}
                className="w-full text-center mt-4 py-3 rounded-xl bg-gradient-to-r from-crimson-600 to-crimson-bright font-black text-white shadow-lg uppercase text-xs tracking-wider"
              >
                REGISTER NOW
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};

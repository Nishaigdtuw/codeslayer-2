import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { eventConfig } from '../data/eventConfig';
import { Menu, X, Ticket } from 'lucide-react';

export const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

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

  const handleNavClick = (e, href) => {
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
            ? 'bg-black/85 backdrop-blur-md border border-yellow-400/40 shadow-[0_4px_30px_rgba(234,179,8,0.2)]'
            : 'bg-black/40 backdrop-blur-md border border-white/10'
        }`}
      >
        {/* Brand Logo with Official DevSphereIndia Flower Icon — NO CLICK COUNTER */}
        <a
          href="#hero"
          onClick={(e) => handleNavClick(e, '#hero')}
          className="flex items-center space-x-3 group select-none cursor-pointer"
        >
          <div className="relative flex items-center justify-center group-hover:scale-105 transition-transform">
            <img
              src="/assets/devsphere-logo.png"
              alt="DevSphereIndia Official Logo"
              className="h-8 sm:h-9 w-auto object-contain filter drop-shadow-[0_0_10px_rgba(138,43,226,0.8)]"
            />
          </div>
          <div>
            <div className="font-display font-black text-xl sm:text-2xl text-white tracking-wider flex items-center gap-1.5">
              <span>CODE</span>
              <span className="text-crimson-bright text-glow-crimson">SLAYER</span>
              <span className="text-xs px-1.5 py-0.5 bg-yellow-500/30 text-yellow-300 border border-yellow-400/40 rounded font-mono">
                2.0
              </span>
            </div>
            <p className="text-[9px] font-mono tracking-widest text-yellow-400 -mt-1 uppercase font-bold">
              Organised by DevSphereIndia
            </p>
          </div>
        </a>

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

        {/* Action Controls & Register CTA — NO AUDIO TOGGLE */}
        <div className="hidden md:flex items-center space-x-3">
          <a
            href={eventConfig.links.registration}
            target="_blank"
            rel="noopener noreferrer"
            className="relative inline-flex items-center justify-center px-5 py-2.5 rounded-xl font-black text-xs text-black bg-gradient-to-r from-yellow-400 via-amber-400 to-yellow-500 border border-yellow-300 shadow-[0_0_20px_rgba(234,179,8,0.5)] hover:shadow-[0_0_35px_rgba(250,204,21,0.8)] hover:scale-105 transition-all duration-300 uppercase tracking-wider"
          >
            <Ticket className="w-4 h-4 mr-1.5 text-black" />
            REGISTER NOW
          </a>
        </div>

        {/* Mobile Hamburger Toggle */}
        <div className="flex lg:hidden items-center space-x-2">
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2 rounded-xl bg-yellow-500/20 border border-yellow-400/40 text-white"
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
            className="lg:hidden mt-3 max-w-7xl mx-auto bg-black/90 border border-yellow-400/40 rounded-2xl p-6 backdrop-blur-xl shadow-2xl"
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
                onClick={() => setMobileMenuOpen(false)}
                className="w-full text-center mt-4 py-3 rounded-xl bg-gradient-to-r from-yellow-400 to-amber-500 font-black text-black shadow-lg uppercase text-xs tracking-wider"
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

export default Navbar;

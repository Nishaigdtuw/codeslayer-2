import React from 'react';
import { eventConfig } from '../data/eventConfig';
import { soundEngine } from '../utils/audio';
import { Flame, Mail, ArrowUp } from 'lucide-react';

const InstagramIcon = (props) => (
  <svg viewBox="0 0 24 24" width="20" height="20" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round" {...props}>
    <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
    <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
  </svg>
);

const LinkedinIcon = (props) => (
  <svg viewBox="0 0 24 24" width="20" height="20" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round" {...props}>
    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path>
    <rect x="2" y="9" width="4" height="12"></rect>
    <circle cx="4" cy="4" r="2"></circle>
  </svg>
);

export const Footer = () => {
  const scrollToTop = () => {
    soundEngine.playClick();
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="relative z-20 border-t border-crimson-500/30 bg-[#0B0B0E] pt-16 pb-12 px-4 sm:px-8 text-left">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-12 gap-12 mb-12">
        
        {/* Brand Info */}
        <div className="md:col-span-5 space-y-4">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-crimson-500 to-crimson-700 flex items-center justify-center text-white border border-crimson-bright/40 shadow-lg">
              <Flame className="w-6 h-6" />
            </div>
            <div className="font-display font-black text-2xl text-white tracking-wider">
              <span>CODE</span>
              <span className="text-crimson-bright text-glow-crimson">SLAYER</span>
              <span className="text-xs px-1.5 py-0.5 bg-crimson-500/30 text-red-300 border border-crimson-bright/40 rounded font-mono ml-1">
                2.0
              </span>
            </div>
          </div>

          <p className="text-gray-400 text-sm leading-relaxed max-w-sm">
            Organised by <strong className="text-white">{eventConfig.organiser}</strong>. A premier 36-hour Demon Slayer-inspired national hackathon hosted at NIT Delhi.
          </p>

          <p className="font-mono text-xs text-crimson-bright italic">
            "Built for builders who refuse to stop."
          </p>
        </div>

        {/* Quick Links */}
        <div className="md:col-span-3 space-y-3">
          <h4 className="font-mono text-xs uppercase tracking-widest text-white font-bold mb-4">Quick Navigation</h4>
          <ul className="space-y-2 text-sm text-gray-400">
            {[
              { name: 'Trial (Round 1)', href: '#ppt-round' },
              { name: 'Tracks', href: '#tracks' },
              { name: 'Legacy', href: '#legacy' },
              { name: 'Finale', href: '#finale' },
              { name: 'Rewards', href: '#prizes' },
              { name: 'Rules', href: '#rules' },
              { name: 'FAQ', href: '#faq' },
            ].map((item) => (
              <li key={item.name}>
                <a
                  href={item.href}
                  onClick={() => soundEngine.playClick()}
                  className="hover:text-crimson-bright transition-colors"
                >
                  {item.name}
                </a>
              </li>
            ))}
          </ul>
        </div>

        {/* Social Links & Contact */}
        <div className="md:col-span-4 space-y-4">
          <h4 className="font-mono text-xs uppercase tracking-widest text-white font-bold mb-4">Connect with DevSphereIndia</h4>
          <div className="flex items-center space-x-3">
            <a
              href={eventConfig.links.instagram}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => soundEngine.playClick()}
              className="p-3 rounded-xl bg-surface border border-crimson-500/30 text-gray-300 hover:text-white hover:border-crimson-bright transition-all"
              title="Instagram"
            >
              <InstagramIcon className="text-crimson-bright" />
            </a>
            <a
              href={eventConfig.links.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => soundEngine.playClick()}
              className="p-3 rounded-xl bg-surface border border-crimson-500/30 text-gray-300 hover:text-white hover:border-crimson-bright transition-all"
              title="LinkedIn"
            >
              <LinkedinIcon className="text-crimson-bright" />
            </a>
            <a
              href={`mailto:${eventConfig.links.email}`}
              onClick={() => soundEngine.playClick()}
              className="p-3 rounded-xl bg-surface border border-crimson-500/30 text-gray-300 hover:text-white hover:border-crimson-bright transition-all"
              title="Email Us"
            >
              <Mail className="w-5 h-5 text-crimson-bright" />
            </a>
          </div>
          <p className="text-xs font-mono text-gray-400">Contact: {eventConfig.links.email}</p>
        </div>
      </div>

      {/* Footer Bottom Bar */}
      <div className="max-w-7xl mx-auto pt-8 border-t border-gray-800 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-mono text-gray-500">
        <p>© 2026 DevSphereIndia. All Rights Reserved.</p>

        <button
          onClick={scrollToTop}
          className="flex items-center space-x-2 text-gray-400 hover:text-crimson-bright transition-colors"
        >
          <span>BACK TO TOP</span>
          <ArrowUp className="w-4 h-4" />
        </button>
      </div>
    </footer>
  );
};

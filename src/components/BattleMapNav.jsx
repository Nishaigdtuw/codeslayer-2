import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { soundEngine } from '../utils/audio';

export const BattleMapNav = () => {
  const [activeSection, setActiveSection] = useState('01');

  const nodes = [
    { id: '01', name: 'CALLING', href: '#hero' },
    { id: '02', name: 'TRIAL', href: '#ppt-round' },
    { id: '03', name: 'TRACKS', href: '#tracks' },
    { id: '04', name: 'LEGACY', href: '#legacy' },
    { id: '05', name: 'FINALE', href: '#finale' },
    { id: '06', name: 'REWARDS', href: '#prizes' },
    { id: '07', name: 'ALLIES', href: '#sponsors' },
  ];

  useEffect(() => {
    const handleScroll = () => {
      const scrollPos = window.scrollY + 250;

      nodes.forEach((node) => {
        const el = document.querySelector(node.href);
        if (el) {
          const top = el.offsetTop;
          const height = el.offsetHeight;
          if (scrollPos >= top && scrollPos < top + height) {
            setActiveSection(node.id);
          }
        }
      });
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleClick = (e, href, id) => {
    e.preventDefault();
    soundEngine.playKatanaSlash();
    setActiveSection(id);
    const target = document.querySelector(href);
    if (target) {
      target.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <aside className="hidden xl:flex fixed right-6 top-1/2 transform -translate-y-1/2 z-40 flex-col items-center select-none">
      {/* Sword Hilt Visual Top */}
      <div className="w-2 h-4 bg-crimson-bright rounded-t shadow-[0_0_10px_#FF2A55]" />

      {/* Vertical Katana Blade Navigation Spine */}
      <div className="relative w-0.5 bg-gradient-to-b from-crimson-bright via-crimson-600 to-gray-800 my-1 py-3 flex flex-col items-center space-y-6">
        {nodes.map((node) => {
          const isActive = activeSection === node.id;

          return (
            <div key={node.id} className="relative flex items-center group">
              {/* Node Bullet Point */}
              <button
                onClick={(e) => handleClick(e, node.href, node.id)}
                className={`w-3.5 h-3.5 rounded-full border-2 transition-all duration-300 ${
                  isActive
                    ? 'bg-crimson-bright border-white shadow-[0_0_15px_#FF2A55] scale-125'
                    : 'bg-[#0B0B0E] border-gray-600 hover:border-crimson-bright'
                }`}
              />

              {/* Hover / Active Label Banner */}
              <div
                className={`absolute right-6 px-2.5 py-1 rounded bg-[#0B0B0E]/90 border border-crimson-bright/40 backdrop-blur whitespace-nowrap pointer-events-none transition-all duration-300 ${
                  isActive
                    ? 'opacity-100 translate-x-0'
                    : 'opacity-0 translate-x-2 group-hover:opacity-100 group-hover:translate-x-0'
                }`}
              >
                <span className="font-mono text-[10px] text-crimson-bright font-bold mr-1.5">{node.id}</span>
                <span className="font-display text-xs text-white tracking-widest">{node.name}</span>
              </div>
            </div>
          );
        })}
      </div>

      {/* Sword Point Bottom */}
      <div className="w-0 h-0 border-l-[3px] border-l-transparent border-r-[3px] border-r-transparent border-t-[8px] border-t-crimson-bright shadow-[0_0_10px_#FF2A55]" />
    </aside>
  );
};

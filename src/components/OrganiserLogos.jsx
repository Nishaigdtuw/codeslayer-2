import React from 'react';
import { soundEngine } from '../utils/audio';

export const OrganiserLogos = () => {
  return (
    <div className="flex flex-col sm:flex-row items-center justify-center gap-6 py-4 px-6 rounded-2xl bg-black/85 border border-crimson-500/40 backdrop-blur-md shadow-2xl my-4">
      {/* Primary Organiser: DevSphereIndia Official Logo */}
      <a
        href="https://devsphere.in"
        target="_blank"
        rel="noopener noreferrer"
        onClick={() => soundEngine.playClick()}
        className="flex items-center space-x-3 group hover:scale-105 transition-transform"
      >
        <img
          src="/assets/devsphere-logo.png"
          alt="DevSphereIndia Official Logo"
          className="h-10 w-auto object-contain filter drop-shadow-[0_0_10px_rgba(138,43,226,0.8)]"
        />
        <div className="text-left">
          <span className="font-mono text-[9px] uppercase tracking-widest text-yellow-400 font-bold block -mb-0.5">
            ORGANISED BY
          </span>
          <span className="font-display font-black text-lg text-white group-hover:text-purple-400 transition-colors">
            DevSphereIndia
          </span>
        </div>
      </a>

      <div className="hidden sm:block w-px h-8 bg-gray-800" />

      {/* Institutional Partner: NIT Delhi Official Emblem */}
      <a
        href="https://nitdelhi.ac.in"
        target="_blank"
        rel="noopener noreferrer"
        onClick={() => soundEngine.playClick()}
        className="flex items-center space-x-3 group hover:scale-105 transition-transform"
      >
        <img
          src="/assets/nit-delhi-logo.png"
          alt="NIT Delhi Official Logo"
          className="h-10 w-auto object-contain bg-white rounded-lg p-0.5 filter drop-shadow-[0_0_10px_rgba(255,255,255,0.6)]"
        />
        <div className="text-left">
          <span className="font-mono text-[9px] uppercase tracking-widest text-gray-300 font-bold block -mb-0.5">
            VENUE & HOST
          </span>
          <span className="font-display font-bold text-sm text-gray-100 group-hover:text-white transition-colors">
            NIT Delhi
          </span>
        </div>
      </a>
    </div>
  );
};

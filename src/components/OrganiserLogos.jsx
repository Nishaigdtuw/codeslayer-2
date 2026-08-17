import React from 'react';

export const OrganiserLogos = () => {
  return (
    <div className="flex flex-col sm:flex-row items-center justify-center gap-6 py-2 px-4 rounded-xl bg-black/20 border border-yellow-400/30 backdrop-blur-sm shadow-lg my-2 select-none">
      {/* Primary Organiser: DevSphereIndia Official Logo — PRESENTATIONAL ONLY */}
      <div className="flex items-center space-x-3">
        <img
          src="/assets/devsphere-logo.png"
          alt="DevSphereIndia Official Logo"
          className="h-8 w-auto object-contain filter drop-shadow-[0_0_10px_rgba(138,43,226,0.8)]"
        />
        <div className="text-left">
          <span className="font-mono text-[9px] uppercase tracking-widest text-yellow-300 font-bold block -mb-0.5">
            ORGANISED BY
          </span>
          <span className="font-display font-black text-sm sm:text-base text-white tracking-wide">
            DevSphereIndia
          </span>
        </div>
      </div>

      <div className="hidden sm:block w-px h-6 bg-yellow-500/30" />

      {/* Institutional Partner: NIT Delhi Official Emblem — PRESENTATIONAL ONLY */}
      <div className="flex items-center space-x-3">
        <img
          src="/assets/nit-delhi-logo.png"
          alt="NIT Delhi Official Logo"
          className="h-8 w-auto object-contain bg-white/90 rounded p-0.5 filter drop-shadow-[0_0_10px_rgba(255,255,255,0.6)]"
        />
        <div className="text-left">
          <span className="font-mono text-[9px] uppercase tracking-widest text-gray-300 font-bold block -mb-0.5">
            VENUE & HOST
          </span>
          <span className="font-display font-bold text-xs sm:text-sm text-gray-100">
            NIT Delhi
          </span>
        </div>
      </div>
    </div>
  );
};

export default OrganiserLogos;

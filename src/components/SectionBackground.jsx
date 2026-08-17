import React from 'react';

export const SectionBackground = ({ src, alt = 'Section Background Atmosphere', overlayOpacity = 0.15 }) => {
  return (
    <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none select-none">
      <img
        src={src}
        alt={alt}
        className="absolute inset-0 w-full h-full object-cover object-center filter contrast-105 brightness-100"
      />
      {/* Light, non-obscuring overlay for legibility while keeping artwork brightly visible */}
      <div
        className="absolute inset-0 bg-black"
        style={{ opacity: overlayOpacity }}
      />
    </div>
  );
};

export default SectionBackground;

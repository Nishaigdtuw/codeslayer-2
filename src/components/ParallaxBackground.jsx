import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

export const ParallaxBackground = ({ imageSrc, altText = 'Background Realm', overlayOpacity = 0.2 }) => {
  const [tilt, setTilt] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e) => {
      const { innerWidth: w, innerHeight: h } = window;
      const x = (e.clientX / w - 0.5);
      const y = (e.clientY / h - 0.5);
      setTilt({ x, y });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none select-none z-0">
      {/* Background Layer (translate ±4px) */}
      <motion.div
        className="absolute -inset-10 bg-cover bg-center filter contrast-105 brightness-100"
        style={{
          backgroundImage: `url(${imageSrc})`,
          transform: `scale(1.12) translate3d(${tilt.x * -4}px, ${tilt.y * -4}px, 0px)`,
        }}
        transition={{ type: 'spring', stiffness: 120, damping: 25 }}
      />

      {/* Midground Parallax Layer (translate ±8px) */}
      <motion.div
        className="absolute inset-0 bg-radial-vignette opacity-30"
        style={{
          transform: `translate3d(${tilt.x * -8}px, ${tilt.y * -8}px, 0px)`,
        }}
      />

      {/* Light Overlay (kept light 15-25% as requested) */}
      <div
        className="absolute inset-0 bg-[#0B0B0E]"
        style={{ opacity: overlayOpacity }}
      />
    </div>
  );
};

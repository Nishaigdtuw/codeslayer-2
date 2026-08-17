import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

export const ParallaxBackground = ({ imageSrc, altText = "Atmosphere", overlayOpacity = 0.25 }) => {
  const [tilt, setTilt] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e) => {
      const { clientX, clientY } = e;
      const x = (clientX / window.innerWidth - 0.5) * 15;
      const y = (clientY / window.innerHeight - 0.5) * 15;
      setTilt({ x, y });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  return (
    <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
      {/* Parallax Image Layer */}
      <motion.div
        animate={{
          x: tilt.x,
          y: tilt.y,
        }}
        transition={{ type: 'spring', stiffness: 150, damping: 25 }}
        className="w-full h-full scale-110"
      >
        <img
          src={imageSrc}
          alt={altText}
          className="w-full h-full object-cover filter contrast-125 brightness-90 transition-transform duration-700"
        />
      </motion.div>

      {/* Light Readability Overlay (Max 25%) */}
      <div
        className="absolute inset-0 bg-gradient-to-b from-[#0B0B0E]/70 via-transparent to-[#0B0B0E]/80"
        style={{ opacity: overlayOpacity }}
      />
    </div>
  );
};

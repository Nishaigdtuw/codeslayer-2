import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

export const BackgroundPlane = ({ imageSrc, altText = 'Background Realm', overlayOpacity = 0.2 }) => {
  const [tilt, setTilt] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e) => {
      const { innerWidth: w, innerHeight: h } = window;
      const x = (e.clientX / w - 0.5) * 15;
      const y = (e.clientY / h - 0.5) * 15;
      setTilt({ x, y });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none select-none z-0">
      {/* Back Depth Plane */}
      <motion.div
        className="absolute -inset-10 bg-cover bg-center filter contrast-110 brightness-95"
        style={{
          backgroundImage: `url(${imageSrc})`,
          transform: `scale(1.15) translate3d(${tilt.x * 0.5}px, ${tilt.y * 0.5}px, 0px)`,
        }}
        transition={{ type: 'spring', stiffness: 100, damping: 30 }}
      />

      {/* Light Overlay for text legibility without obscuring artwork */}
      <div
        className="absolute inset-0 bg-[#0B0B0E]"
        style={{ opacity: overlayOpacity }}
      />

      {/* Atmospheric Radial Vignette */}
      <div className="absolute inset-0 bg-radial-vignette opacity-50" />
    </div>
  );
};

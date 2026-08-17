import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

export const ParallaxBackground = ({ imageSrc, altText = 'Background Realm', overlayOpacity = 0.15 }) => {
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
      {/* Crisp Visible Background Image Layer */}
      <motion.div
        className="absolute -inset-10 bg-cover bg-center filter contrast-105 brightness-100"
        style={{
          backgroundImage: `url(${imageSrc})`,
          transform: `scale(1.10) translate3d(${tilt.x * -4}px, ${tilt.y * -4}px, 0px)`,
        }}
        transition={{ type: 'spring', stiffness: 120, damping: 25 }}
      />

      {/* Light Overlay (kept to 15% so image artwork is brightly & clearly visible) */}
      <div
        className="absolute inset-0 bg-[#0B0B0E]"
        style={{ opacity: overlayOpacity }}
      />
    </div>
  );
};

import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

export const CustomCursor = () => {
  const [position, setPosition] = useState({ x: -100, y: -100 });
  const [isHovered, setIsHovered] = useState(false);
  const [isTouchDevice, setIsTouchDevice] = useState(false);

  useEffect(() => {
    // Detect touch device
    if (window.matchMedia('(pointer: coarse)').matches) {
      setIsTouchDevice(true);
      return;
    }

    const handleMouseMove = (e) => {
      setPosition({ x: e.clientX, y: e.clientY });
    };

    const handleMouseOver = (e) => {
      const target = e.target;
      if (
        target.tagName === 'BUTTON' ||
        target.tagName === 'A' ||
        target.closest('button') ||
        target.closest('a') ||
        target.getAttribute('role') === 'button' ||
        target.classList.contains('cursor-pointer') ||
        target.closest('.interactive-card')
      ) {
        setIsHovered(true);
      } else {
        setIsHovered(false);
      }
    };

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mouseover', handleMouseOver);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseover', handleMouseOver);
    };
  }, []);

  if (isTouchDevice) return null;

  return (
    <>
      {/* Inner Red Glowing Pointer Dot */}
      <motion.div
        className="fixed top-0 left-0 w-3 h-3 bg-crimson-bright rounded-full pointer-events-none z-50 mix-blend-screen shadow-[0_0_12px_#FF2A55]"
        animate={{
          x: position.x - 6,
          y: position.y - 6,
          scale: isHovered ? 1.8 : 1,
        }}
        transition={{ type: 'spring', stiffness: 800, damping: 35, mass: 0.1 }}
      />

      {/* Outer Katana Spirit Trailing Halo Ring */}
      <motion.div
        className="fixed top-0 left-0 w-8 h-8 border border-crimson-500/70 rounded-full pointer-events-none z-50 shadow-[0_0_20px_rgba(230,0,51,0.5)]"
        animate={{
          x: position.x - 16,
          y: position.y - 16,
          scale: isHovered ? 1.9 : 1,
          borderColor: isHovered ? '#FF2A55' : 'rgba(230, 0, 51, 0.6)',
          backgroundColor: isHovered ? 'rgba(230, 0, 51, 0.15)' : 'transparent',
        }}
        transition={{ type: 'spring', stiffness: 300, damping: 25, mass: 0.2 }}
      />
    </>
  );
};

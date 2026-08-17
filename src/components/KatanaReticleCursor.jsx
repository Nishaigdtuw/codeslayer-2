import React, { useEffect, useState, useRef } from 'react';
import { motion } from 'framer-motion';

export const KatanaReticleCursor = () => {
  const [pos, setPos] = useState({ x: -100, y: -100 });
  const [isHovered, setIsHovered] = useState(false);
  const [isClicking, setIsClicking] = useState(false);
  const [isTouch, setIsTouch] = useState(false);
  const [sparks, setSparks] = useState([]);
  
  const lastPos = useRef({ x: -100, y: -100 });

  useEffect(() => {
    if (window.matchMedia('(pointer: coarse)').matches) {
      setIsTouch(true);
      return;
    }

    const handleMouseMove = (e) => {
      const { clientX: x, clientY: y } = e;
      setPos({ x, y });

      // Calculate pointer velocity for spark trails
      const dx = x - lastPos.current.x;
      const dy = y - lastPos.current.y;
      const speed = Math.sqrt(dx * dx + dy * dy);

      if (speed > 5) {
        const newSpark = {
          id: Math.random(),
          x,
          y,
          size: Math.min(speed * 0.2, 6),
          angle: Math.atan2(dy, dx),
          speed,
        };

        setSparks((prev) => [...prev.slice(-12), newSpark]);
      }

      lastPos.current = { x, y };
    };

    const handleMouseDown = () => {
      setIsClicking(true);
      setTimeout(() => setIsClicking(false), 120);
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
    window.addEventListener('mousedown', handleMouseDown);
    window.addEventListener('mouseover', handleMouseOver);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mousedown', handleMouseDown);
      window.removeEventListener('mouseover', handleMouseOver);
    };
  }, []);

  // Clear old sparks periodically
  useEffect(() => {
    const timer = setInterval(() => {
      setSparks((prev) => prev.slice(1));
    }, 60);
    return () => clearInterval(timer);
  }, []);

  if (isTouch) return null;

  return (
    <>
      {/* Velocity Spark Trails */}
      {sparks.map((spark) => (
        <motion.div
          key={spark.id}
          initial={{ opacity: 0.9, scale: 1 }}
          animate={{ opacity: 0, scale: 0.2 }}
          transition={{ duration: 0.3 }}
          className="fixed top-0 left-0 bg-crimson-bright rounded-full pointer-events-none z-50 shadow-[0_0_10px_#FF2A55]"
          style={{
            left: `${spark.x}px`,
            top: `${spark.y}px`,
            width: `${spark.size}px`,
            height: `${spark.size}px`,
          }}
        />
      ))}

      {/* Katana Reticle Pointer */}
      <motion.div
        className="fixed top-0 left-0 pointer-events-none z-50 mix-blend-screen"
        animate={{
          x: pos.x - 12,
          y: pos.y - 12,
          scale: isClicking ? 1.5 : isHovered ? 1.3 : 1,
        }}
        transition={{ type: 'spring', stiffness: 900, damping: 35, mass: 0.1 }}
      >
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
          {/* Central Sharp Blade Crosshair Tip */}
          <path
            d="M12 2L14 10L22 12L14 14L12 22L10 14L2 12L10 10L12 2Z"
            fill={isHovered ? '#FF2A55' : '#E60033'}
            stroke="#FFFFFF"
            strokeWidth="1.2"
            className="filter drop-shadow-[0_0_8px_#FF2A55]"
          />
          {/* Inner Glowing Spark Core */}
          <circle cx="12" cy="12" r="2" fill="#FFD700" />
        </svg>

        {/* 100ms Katana Click Slash Streak */}
        {isClicking && (
          <motion.div
            initial={{ scaleX: 0, opacity: 1 }}
            animate={{ scaleX: 1, opacity: 0 }}
            transition={{ duration: 0.12 }}
            className="absolute top-1/2 left-1/2 w-16 h-1 bg-gradient-to-r from-white via-crimson-bright to-transparent transform -translate-x-1/2 -translate-y-1/2 -rotate-45 shadow-[0_0_15px_#FF2A55]"
          />
        )}
      </motion.div>
    </>
  );
};

import React, { useEffect, useState, useRef } from 'react';
import { motion } from 'framer-motion';

export const KatanaBladePointer = () => {
  const [pos, setPos] = useState({ x: -100, y: -100 });
  const [isHovered, setIsHovered] = useState(false);
  const [isClicking, setIsClicking] = useState(false);
  const [angle, setAngle] = useState(0);
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

      const dx = x - lastPos.current.x;
      const dy = y - lastPos.current.y;
      const speed = Math.sqrt(dx * dx + dy * dy);

      if (speed > 2) {
        setAngle(Math.atan2(dy, dx) * (180 / Math.PI));

        if (speed > 5) {
          const newSpark = {
            id: Math.random(),
            x,
            y,
            size: Math.min(speed * 0.25, 8),
          };
          setSparks((prev) => [...prev.slice(-15), newSpark]);
        }
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

  useEffect(() => {
    const timer = setInterval(() => {
      setSparks((prev) => prev.slice(1));
    }, 50);
    return () => clearInterval(timer);
  }, []);

  if (isTouch) return null;

  return (
    <>
      {/* Spark Trail */}
      {sparks.map((spark) => (
        <motion.div
          key={spark.id}
          initial={{ opacity: 1, scale: 1 }}
          animate={{ opacity: 0, scale: 0.1 }}
          transition={{ duration: 0.25 }}
          className="fixed top-0 left-0 bg-crimson-bright rounded-full pointer-events-none z-50 shadow-[0_0_10px_#FF2A55]"
          style={{
            left: `${spark.x}px`,
            top: `${spark.y}px`,
            width: `${spark.size}px`,
            height: `${spark.size}px`,
          }}
        />
      ))}

      {/* Katana Dual Shard Pointer */}
      <motion.div
        className="fixed top-0 left-0 pointer-events-none z-50 mix-blend-screen"
        animate={{
          x: pos.x - 12,
          y: pos.y - 12,
          rotate: angle,
          scale: isClicking ? 1.4 : isHovered ? 1.25 : 1,
        }}
        transition={{ type: 'spring', stiffness: 900, damping: 35, mass: 0.1 }}
      >
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
          <path
            d="M4 4L12 10L6 16L4 4Z"
            fill={isHovered ? '#FF2A55' : '#E60033'}
            stroke="#FFFFFF"
            strokeWidth="1.2"
            className="filter drop-shadow-[0_0_8px_#FF2A55]"
          />
          <path
            d="M20 20L12 14L18 8L20 20Z"
            fill={isHovered ? '#FF2A55' : '#E60033'}
            stroke="#FFFFFF"
            strokeWidth="1.2"
            className="filter drop-shadow-[0_0_8px_#FF2A55]"
          />
          {isHovered && (
            <line x1="6" y1="16" x2="18" y2="8" stroke="#FFD700" strokeWidth="2" />
          )}
        </svg>

        {isClicking && (
          <motion.div
            initial={{ scaleX: 0, opacity: 1 }}
            animate={{ scaleX: 1.2, opacity: 0 }}
            transition={{ duration: 0.12 }}
            className="absolute top-1/2 left-1/2 w-20 h-1 bg-gradient-to-r from-white via-crimson-bright to-transparent transform -translate-x-1/2 -translate-y-1/2 -rotate-45 shadow-[0_0_20px_#FF2A55]"
          />
        )}
      </motion.div>
    </>
  );
};

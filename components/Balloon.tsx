'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

interface BalloonProps {
  color: 'rose' | 'purple' | 'gold' | 'pink';
  delay: number;
}

const colorMap = {
  rose: '#f43f5e',
  purple: '#8b5cf6',
  gold: '#f59e0b',
  pink: '#ec4899',
};

export function Balloon({ color, delay }: BalloonProps) {
  const balloonColor = colorMap[color];
  const [windowDimensions, setWindowDimensions] = useState({
    width: 800,
    height: 600
  });

  useEffect(() => {
    setWindowDimensions({
      width: window.innerWidth,
      height: window.innerHeight
    });
  }, []);
  
  return (
    <motion.div
      className="absolute pointer-events-none"
      initial={{ 
        y: windowDimensions.height + 100,
        x: Math.random() * windowDimensions.width,
        opacity: 0
      }}
      animate={{
        y: -200,
        x: Math.random() * windowDimensions.width * 0.8,
        opacity: [0, 1, 1, 0],
        rotate: [0, 10, -10, 0]
      }}
      transition={{
        duration: 15,
        delay,
        repeat: Infinity,
        repeatDelay: 5,
        ease: "easeInOut"
      }}
    >
      <div className="relative">
        {/* Balloon */}
        <div
          className="w-12 h-16 rounded-full shadow-lg"
          style={{ backgroundColor: balloonColor }}
        />
        
        {/* String */}
        <div 
          className="absolute top-full left-1/2 w-0.5 h-20 transform -translate-x-1/2"
          style={{ backgroundColor: balloonColor, opacity: 0.6 }}
        />
        
        {/* Highlight */}
        <div 
          className="absolute top-2 left-3 w-3 h-4 bg-white rounded-full opacity-30"
        />
      </div>
    </motion.div>
  );
}
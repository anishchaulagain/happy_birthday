'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

interface CountdownTimerProps {
  targetDate: string;
  onComplete?: () => void;
}

interface TimeLeft {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
}

export function CountdownTimer({ targetDate, onComplete }: CountdownTimerProps) {
  const getTimeLeft = (): TimeLeft => {
    const now = Date.now();
    const target = new Date(targetDate).getTime();
    const diff = target - now;

    if (diff <= 0) {
      return { days: 0, hours: 0, minutes: 0, seconds: 0 };
    }

    return {
      days: Math.floor(diff / (1000 * 60 * 60 * 24)),
      hours: Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
      minutes: Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60)),
      seconds: Math.floor((diff % (1000 * 60)) / 1000),
    };
  };

  const [timeLeft, setTimeLeft] = useState<TimeLeft>(getTimeLeft);
  const [isOver, setIsOver] = useState(false);

  useEffect(() => {
    const timer = setInterval(() => {
      const newTime = getTimeLeft();
      setTimeLeft(newTime);

      if (
        newTime.days === 0 &&
        newTime.hours === 0 &&
        newTime.minutes === 0 &&
        newTime.seconds === 0
      ) {
        setIsOver(true);
        if (onComplete) onComplete();
        clearInterval(timer);
      }
    }, 1000);

    return () => clearInterval(timer);
  }, [targetDate]);

  if (isOver) {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.95 }}
        transition={{ duration: 1, ease: "easeInOut" }}
        className="bg-white/90 backdrop-blur-md rounded-2xl p-6 shadow-xl border border-pink-200 text-center"
      >
        <motion.h2
          initial={{ scale: 0, rotate: -10, opacity: 0 }}
          animate={{ scale: 1, rotate: 0, opacity: 1 }}
          transition={{ type: "spring", stiffness: 200, damping: 12 }}
          className="text-3xl md:text-4xl font-extrabold text-pink-600"
        >
          🥳 Ta-da! My Fav Person's Birthday is Here 🎂
        </motion.h2>
      </motion.div>
    );
  }

  return (
    <div className="bg-white/70 backdrop-blur-md rounded-2xl p-6 shadow-xl border border-rose-100">
      <motion.h2
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="font-handwriting text-2xl md:text-3xl text-gray-800 text-center mb-6"
      >
        Time until your special day ✨
      </motion.h2>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {[
          { label: 'Days', value: timeLeft.days, color: 'rose' },
          { label: 'Hours', value: timeLeft.hours, color: 'purple' },
          { label: 'Minutes', value: timeLeft.minutes, color: 'gold' },
          { label: 'Seconds', value: timeLeft.seconds, color: 'pink' },
        ].map((unit, i) => (
          <motion.div
            key={unit.label}
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: i * 0.1, duration: 0.5 }}
            className={`
              text-center p-4 rounded-xl shadow-lg transform hover:scale-105 transition-transform duration-300
              ${unit.color === 'rose' ? 'bg-rose-100 border-2 border-rose-200' : ''}
              ${unit.color === 'purple' ? 'bg-purple-100 border-2 border-purple-200' : ''}
              ${unit.color === 'gold' ? 'bg-yellow-100 border-2 border-yellow-200' : ''}
              ${unit.color === 'pink' ? 'bg-pink-100 border-2 border-pink-200' : ''}
            `}
          >
            <motion.div
              key={unit.value}
              initial={{ y: -20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.3 }}
              className={`
                text-3xl md:text-4xl font-bold mb-2
                ${unit.color === 'rose' ? 'text-rose-600' : ''}
                ${unit.color === 'purple' ? 'text-purple-600' : ''}
                ${unit.color === 'gold' ? 'text-yellow-600' : ''}
                ${unit.color === 'pink' ? 'text-pink-600' : ''}
              `}
            >
              {unit.value.toString().padStart(2, '0')}
            </motion.div>
            <div className="text-sm font-medium text-gray-600 uppercase tracking-wide">
              {unit.label}
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}

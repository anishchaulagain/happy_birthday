'use client';

import { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Volume2, VolumeX } from 'lucide-react';

export function MusicToggle() {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(true);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    // Check user preference from localStorage
    const musicPreference = localStorage.getItem('musicEnabled');
    if (musicPreference === 'true') {
      setIsMuted(false);
    }

    // Create audio element with online URL
    audioRef.current = new Audio(
      'https://res.cloudinary.com/dv9s1kiz2/video/upload/v1759249281/Happy_Birthday_Dipika_oyqjux.mp3'
      // replace with your Happy Birthday mp3 URL
    );
    audioRef.current.loop = true;
    audioRef.current.volume = 0.3;
  }, []);

  const toggleMusic = async () => {
    if (!audioRef.current) return;

    try {
      if (isMuted) {
        await audioRef.current.play();
        setIsPlaying(true);
        setIsMuted(false);
        localStorage.setItem('musicEnabled', 'true');
      } else {
        audioRef.current.pause();
        setIsPlaying(false);
        setIsMuted(true);
        localStorage.setItem('musicEnabled', 'false');
      }
    } catch (error) {
      console.log('Audio play failed:', error);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ delay: 1, duration: 0.5 }}
      className="fixed top-20 right-4 z-40"
    >
      <Button
        onClick={toggleMusic}
        variant={isMuted ? "outline" : "default"}
        size="sm"
        className={`
          rounded-full w-12 h-12 p-0 shadow-lg transition-all duration-300 hover:scale-110
          ${!isMuted
            ? 'bg-rose-500 hover:bg-rose-600 text-white animate-pulse-glow'
            : 'bg-white hover:bg-rose-50 text-gray-600 border-2 border-rose-200'
          }
        `}
      >
        {isMuted ? (
          <VolumeX className="h-5 w-5" />
        ) : (
          <Volume2 className="h-5 w-5" />
        )}
      </Button>

      {!isMuted && (
        <motion.div
          animate={{ scale: [1, 1.2, 1] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          className="absolute -top-1 -right-1 w-4 h-4 bg-green-400 rounded-full"
        />
      )}
    </motion.div>
  );
}

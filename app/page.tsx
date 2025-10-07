'use client';

import { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import Confetti from 'react-confetti';
import { Balloon } from '@/components/Balloon';
import { CountdownTimer } from '@/components/CountdownTimer';
import { Navigation } from '@/components/Navigation';
import { Button } from '@/components/ui/button';
import { Sparkles, Volume2, VolumeX } from 'lucide-react';
import GalleryPage from './gallery/page';
import { EasterEggHunter } from '@/components/EasterEggHunter';
import FunPage from './fun/page';
import PhotoBooth from '@/components/PhotoBooth';
import JourneyPage from './journey/page';

export default function Home() {
  const [showConfetti, setShowConfetti] = useState(false);
  const [windowDimensions, setWindowDimensions] = useState({ width: 0, height: 0 });
  const [isUnlocked, setIsUnlocked] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [audioReady, setAudioReady] = useState(false);

  const audioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    const updateWindowDimensions = () => {
      setWindowDimensions({ width: window.innerWidth, height: window.innerHeight });
    };
    updateWindowDimensions();
    window.addEventListener('resize', updateWindowDimensions);

    // Initialize audio element
    const audio = new Audio(
      'https://res.cloudinary.com/dv9s1kiz2/video/upload/v1759249281/Happy_Birthday_Dipika_oyqjux.mp3'
    );
    audio.loop = true;
    audio.volume = 0.3;
    audioRef.current = audio;
    setAudioReady(true);

    return () => {
      window.removeEventListener('resize', updateWindowDimensions);
      audio.pause();
    };
  }, []);

  const handleSurpriseClick = async () => {
    setShowConfetti(true);
    setTimeout(() => setShowConfetti(false), 5000);

    // Play music if available
    if (audioReady && audioRef.current) {
      try {
        await audioRef.current.play();
        setIsPlaying(true);
      } catch (error) {
        console.log('Autoplay blocked:', error);
      }
    }
  };

  const toggleMusic = async () => {
    if (!audioRef.current) return;
    try {
      if (isPlaying) {
        audioRef.current.pause();
        setIsPlaying(false);
      } else {
        await audioRef.current.play();
        setIsPlaying(true);
      }
    } catch (error) {
      console.log('Audio play failed:', error);
    }
  };

  return (
    <>
      <Navigation />
      <EasterEggHunter />

      {showConfetti && (
        <Confetti
          width={windowDimensions.width}
          height={windowDimensions.height}
          recycle={false}
          numberOfPieces={200}
          colors={['#f43f5e', '#f59e0b', '#8b5cf6', '#06b6d4', '#10b981']}
        />
      )}

      {/* Background */}
      <div className="fixed inset-0 -z-10 overflow-hidden">
        <div
          className="parallax absolute inset-0 bg-gradient-to-br from-rose-100 via-pink-100 to-purple-100"
          style={{ transform: 'translateZ(0)' }}
        />
        <div className="absolute inset-0 bg-[url('https://images.pexels.com/photos/1157255/pexels-photo-1157255.jpeg')] bg-cover bg-center opacity-10" />
      </div>

      {/* Balloons */}
      <div className="fixed inset-0 pointer-events-none -z-5">
        <Balloon color="rose" delay={0} />
        <Balloon color="purple" delay={1} />
        <Balloon color="gold" delay={2} />
        <Balloon color="pink" delay={0.5} />
      </div>

      {/* Main Section */}
      <main className="relative min-h-screen flex items-center justify-center px-4 mt-20">
        <div className="max-w-4xl mx-auto text-center space-y-8">
          {/* Intro */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="space-y-6"
          >
            <motion.div
              animate={{ scale: [1, 1.05, 1], rotate: [0, 1, -1, 0] }}
              transition={{ duration: 4, repeat: Infinity }}
              className="text-6xl md:text-8xl"
            >
              🎂
            </motion.div>

            <h1 className="font-handwriting text-4xl md:text-6xl lg:text-7xl text-rose-600">
              Hey Baby😘,<br />
              <span className="text-purple-600">Happy Birthday!</span>
            </h1>

            <p className="text-lg md:text-xl text-gray-700 max-w-2xl mx-auto leading-relaxed">
              I made this little corner of the internet just for you.
              It's our story, our memories, and a celebration of another year
              of having you light up my world. Ready for your surprise?
            </p>
          </motion.div>

          {/* Countdown */}
          <CountdownTimer targetDate="2025-09-10" onComplete={() => setIsUnlocked(true)} />

          {/* Surprise Button + Music Toggle */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.2, duration: 0.6 }}
            className="flex flex-col sm:flex-row gap-4 justify-center items-center"
          >
            <div className="relative flex items-center gap-3">
              <Button
                onClick={handleSurpriseClick}
                className="group bg-rose-500 hover:bg-rose-600 text-white px-8 py-3 rounded-full text-lg font-medium transition-all duration-300 transform hover:scale-105 hover:shadow-lg animate-pulse-glow"
              >
                <Sparkles className="mr-2 h-5 w-5 group-hover:animate-spin" />
                Surprise Me!
              </Button>

              {/* Animated Play/Pause Toggle beside it */}
              {audioReady && (
                <motion.button
                  onClick={toggleMusic}
                  whileTap={{ scale: 0.9 }}
                  animate={{ rotate: isPlaying ? [0, 10, -10, 0] : 0 }}
                  transition={{ duration: 0.6, repeat: isPlaying ? Infinity : 0 }}
                  className={`p-3 rounded-full shadow-md border-2 transition-all duration-300 ${
                    isPlaying
                      ? 'bg-rose-500 text-white border-rose-400 hover:bg-rose-600'
                      : 'bg-white text-gray-600 border-gray-300 hover:bg-rose-50'
                  }`}
                >
                  {isPlaying ? (
                    <Volume2 className="h-5 w-5 animate-pulse" />
                  ) : (
                    <VolumeX className="h-5 w-5" />
                  )}
                </motion.button>
              )}
            </div>
          </motion.div>
        </div>
      </main>

      {isUnlocked ? (
        <>
        <JourneyPage/>
          <FunPage />
          <GalleryPage />
          <PhotoBooth />
        </>
      ) : (
        <div className="text-center py-12 text-gray-600">
          🔒 Content will unlock on the special day!
        </div>
      )}
    </>
  );
}

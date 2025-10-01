'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import Confetti from 'react-confetti';
import { Balloon } from '@/components/Balloon';
import { CountdownTimer } from '@/components/CountdownTimer';
import { MusicToggle } from '@/components/MusicToggle';
import { Navigation } from '@/components/Navigation';
import { Button } from '@/components/ui/button';
import { Heart, Gift, Sparkles } from 'lucide-react';
import JourneyPage from './journey/page';
import MessagesPage from './messages/page';
import GalleryPage from './gallery/page';
import { EasterEggHunter } from '@/components/EasterEggHunter';
import { SpinWheel } from '@/components/SpinWheel';
import { ScratchCard } from '@/components/ScratchCard';
import FunPage from './fun/page';
import PhotoBooth from '@/components/PhotoBooth';



export default function Home() {
  const [showConfetti, setShowConfetti] = useState(false);
  const [windowDimensions, setWindowDimensions] = useState({ width: 0, height: 0 });
  const [hasTriggeredSurprise, setHasTriggeredSurprise] = useState(false);
  const [isUnlocked, setIsUnlocked] = useState(false);

  useEffect(() => {
    const updateWindowDimensions = () => {
      setWindowDimensions({ width: window.innerWidth, height: window.innerHeight });
    };

    updateWindowDimensions();
    window.addEventListener('resize', updateWindowDimensions);

    // Check if surprise has been triggered before
    const surpriseTriggered = localStorage.getItem('surpriseTriggered');
    if (!surpriseTriggered) {
      setTimeout(() => {
        setShowConfetti(true);
        setHasTriggeredSurprise(true);
        localStorage.setItem('surpriseTriggered', 'true');
        setTimeout(() => setShowConfetti(false), 5000);
      }, 1000);
    }

    return () => window.removeEventListener('resize', updateWindowDimensions);
  }, []);

  const handleSurpriseClick = () => {
    setShowConfetti(true);
    setTimeout(() => setShowConfetti(false), 5000);
  };

  return (
    <>
      <Navigation />
      <MusicToggle />
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

      {/* Background with parallax effect */}
      <div className="fixed inset-0 -z-10 overflow-hidden">
        <div
          className="parallax absolute inset-0 bg-gradient-to-br from-rose-100 via-pink-100 to-purple-100"
          style={{ transform: 'translateZ(0)' }}
        />
        <div className="absolute inset-0 bg-[url('https://images.pexels.com/photos/1157255/pexels-photo-1157255.jpeg')] bg-cover bg-center opacity-10" />
      </div>

      {/* Floating balloons */}
      <div className="fixed inset-0 pointer-events-none -z-5">
        <Balloon color="rose" delay={0} />
        <Balloon color="purple" delay={1} />
        <Balloon color="gold" delay={2} />
        <Balloon color="pink" delay={0.5} />
      </div>

      <main className="relative min-h-screen flex items-center justify-center px-4 mt-20">
        <div className="max-w-4xl mx-auto text-center space-y-8">

          {/* Heartfelt Intro */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="space-y-6 "
          >
            <motion.div
              animate={{
                scale: [1, 1.05, 1],
                rotate: [0, 1, -1, 0]
              }}
              transition={{
                duration: 4,
                ease: "easeInOut",
                repeat: Infinity,
                repeatDelay: 3
              }}
              className="text-6xl md:text-8xl"
            >
              🎂
            </motion.div>

            <h1 className="font-handwriting text-4xl md:text-6xl lg:text-7xl text-rose-600 leading-tight">
              Hey Baby😘,
              <br />
              <span className="text-purple-600">Happy Birthday!</span>
            </h1>

            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5, duration: 0.8 }}
              className="text-lg md:text-xl text-gray-700 max-w-2xl mx-auto leading-relaxed"
            >
              I made this little corner of the internet just for you.
              It's our story, our memories, and a celebration of another year
              of having you light up my world. Ready for your surprise?
            </motion.p>
          </motion.div>

          {/* Countdown Timer */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.8, duration: 0.6 }}
          >
            <CountdownTimer targetDate="2025-09-10" onComplete={() => setIsUnlocked(true)} />
          </motion.div>

          {/* CTA Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.2, duration: 0.6 }}
            className="flex flex-col sm:flex-row gap-4 justify-center items-center"
          >
            <Button
              onClick={handleSurpriseClick}
              className="group bg-rose-500 hover:bg-rose-600 text-white px-8 py-3 rounded-full text-lg font-medium transition-all duration-300 transform hover:scale-105 hover:shadow-lg animate-pulse-glow"
            >
              <Sparkles className="mr-2 h-5 w-5 group-hover:animate-spin" />
              Surprise Me!
            </Button>

            {/* <Button
              variant="outline"
              className="group border-2 border-purple-300 text-purple-600 hover:bg-purple-50 px-8 py-3 rounded-full text-lg font-medium transition-all duration-300 transform hover:scale-105"
              onClick={() => document.getElementById('journey')?.scrollIntoView({ behavior: 'smooth' })}
            >
              <Heart className="mr-2 h-5 w-5 group-hover:text-rose-500 transition-colors" />
              Our Story
            </Button>

            <Button
              variant="outline"
              className="group border-2 border-gold-400 text-gold-600 hover:bg-gold-50 px-8 py-3 rounded-full text-lg font-medium transition-all duration-300 transform hover:scale-105"
              onClick={() => document.getElementById('wishlist')?.scrollIntoView({ behavior: 'smooth' })}
            >
              <Gift className="mr-2 h-5 w-5 group-hover:text-gold-500 transition-colors" />
              Wishlist
            </Button> */}
          </motion.div>

          {/* Scroll indicator */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 2, duration: 0.8 }}
            className="absolute bottom-8 left-1/2 transform -translate-x-1/2 "
          >
            <motion.div
              animate={{ y: [0, 10, 0] }}
              transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
              className="text-gray-400 text-sm  flex-col items-center gap-2 hidden sm:flex"
            >
              <span>Scroll for more magic</span>
              <div className="w-6 h-10 border-2 border-gray-300 rounded-full flex justify-center">
                <div className="w-1 h-3 bg-gray-400 rounded-full mt-2 animate-bounce" />
              </div>
            </motion.div>
          </motion.div>
        </div>

      </main>
      {isUnlocked ? (
        <>
        <FunPage/>
        {/* <ScratchCard/> */}
          <JourneyPage />
          {/* <MessagesPage /> */}
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
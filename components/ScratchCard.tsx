'use client';

import { useState, useRef, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { RefreshCw, Heart, Gift, Sparkles, ExternalLink } from 'lucide-react';

interface ScratchCardContent {
  id: number;
  type: 'love_note' | 'surprise_link' | 'memory' | 'coupon' | 'photo';
  title: string;
  content: string;
  image?: string;
  link?: string;
  icon: React.ReactNode;
  bgColor: string;
}

const scratchCardContents: ScratchCardContent[] = [
  {
    id: 1,
    type: 'love_note',
    title: 'I love you because...',
    content: 'You make ordinary moments feel like magic. Your laugh is my favorite sound, and your smile lights up my entire world. Every day with you is a gift I never want to unwrap completely because I want it to last forever. 💕',
    icon: <Heart className="w-6 h-6 text-rose-500" />,
    bgColor: 'from-rose-100 to-pink-100'
  },
  {
    id: 2,
    type: 'surprise_link',
    title: 'Special Surprise Awaits!',
    content: 'I\'ve prepared something extra special for you! Click the link below to discover your surprise...',
    link: 'https://example.com/surprise',
    icon: <Gift className="w-6 h-6 text-purple-500" />,
    bgColor: 'from-purple-100 to-indigo-100'
  },
  {
    id: 3,
    type: 'memory',
    title: 'Our Sweet Memory',
    content: 'Remember that rainy Tuesday when we danced in the kitchen while dinner was cooking? You were wearing my oversized sweater, and we slow danced to no music at all. That\'s when I knew - this is what happiness feels like. 🌧️💃',
    icon: <Sparkles className="w-6 h-6 text-gold-500" />,
    bgColor: 'from-yellow-100 to-orange-100'
  },
  {
    id: 4,
    type: 'coupon',
    title: 'Love Coupon Unlocked!',
    content: 'This coupon is good for: One (1) breakfast in bed, prepared with extra love and served with unlimited cuddles. Valid any day, any time. Present this message to redeem! 🥞☕',
    icon: <Heart className="w-6 h-6 text-pink-500" />,
    bgColor: 'from-pink-100 to-rose-100'
  },
  {
    id: 5,
    type: 'photo',
    title: 'Hidden Photo Memory',
    content: 'A secret photo from our adventures together - the one where you\'re laughing so hard you can barely stand. This moment perfectly captures your beautiful, infectious joy! 📸',
    image: 'https://images.pexels.com/photos/1024993/pexels-photo-1024993.jpeg?auto=compress&cs=tinysrgb&w=400',
    icon: <Sparkles className="w-6 h-6 text-blue-500" />,
    bgColor: 'from-blue-100 to-cyan-100'
  },
  {
    id: 6,
    type: 'love_note',
    title: 'Another reason I adore you...',
    content: 'You have this incredible way of making everyone around you feel special and loved. Your kindness is like sunshine - it brightens everything it touches. I\'m so lucky to be the one who gets to love you every single day. ☀️',
    icon: <Heart className="w-6 h-6 text-orange-500" />,
    bgColor: 'from-orange-100 to-yellow-100'
  }
];

export function ScratchCard() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [isScratching, setIsScratching] = useState(false);
  const [scratchPercentage, setScratchPercentage] = useState(0);
  const [isRevealed, setIsRevealed] = useState(false);
  const [currentCard, setCurrentCard] = useState(0);
  const [hasStartedScratching, setHasStartedScratching] = useState(false);

  const initializeCanvas = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Set canvas size
    const rect = canvas.getBoundingClientRect();
    canvas.width = rect.width * window.devicePixelRatio;
    canvas.height = rect.height * window.devicePixelRatio;
    ctx.scale(window.devicePixelRatio, window.devicePixelRatio);

    // Create scratch-off surface
    const gradient = ctx.createLinearGradient(0, 0, rect.width, rect.height);
    gradient.addColorStop(0, '#f3f4f6');
    gradient.addColorStop(0.5, '#e5e7eb');
    gradient.addColorStop(1, '#d1d5db');
    
    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, rect.width, rect.height);

    // Add scratch-off text
    ctx.fillStyle = '#6b7280';
    ctx.font = 'bold 18px Inter, sans-serif';
    ctx.textAlign = 'center';
    ctx.fillText('Scratch to reveal', rect.width / 2, rect.height / 2 - 10);
    ctx.font = '14px Inter, sans-serif';
    ctx.fillText('your surprise! 💝', rect.width / 2, rect.height / 2 + 15);

    // Add sparkle effects
    ctx.fillStyle = '#f59e0b';
    for (let i = 0; i < 8; i++) {
      const x = Math.random() * rect.width;
      const y = Math.random() * rect.height;
      ctx.beginPath();
      ctx.arc(x, y, 2, 0, Math.PI * 2);
      ctx.fill();
    }
  }, []);

  useEffect(() => {
    initializeCanvas();
    
    const handleResize = () => {
      if (!isRevealed) {
        initializeCanvas();
      }
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [initializeCanvas, isRevealed, currentCard]);

  const scratch = useCallback((clientX: number, clientY: number) => {
    const canvas = canvasRef.current;
    if (!canvas || isRevealed) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const rect = canvas.getBoundingClientRect();
    const x = clientX - rect.left;
    const y = clientY - rect.top;

    ctx.globalCompositeOperation = 'destination-out';
    ctx.beginPath();
    ctx.arc(x, y, 20, 0, Math.PI * 2);
    ctx.fill();

    // Calculate scratch percentage
    const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
    const pixels = imageData.data;
    let transparentPixels = 0;

    for (let i = 3; i < pixels.length; i += 4) {
      if (pixels[i] === 0) {
        transparentPixels++;
      }
    }

    const percentage = (transparentPixels / (pixels.length / 4)) * 100;
    setScratchPercentage(percentage);

    if (percentage > 60 && !isRevealed) {
      setIsRevealed(true);
    }
  }, [isRevealed]);

  const handleMouseDown = (e: React.MouseEvent) => {
    setIsScratching(true);
    setHasStartedScratching(true);
    scratch(e.clientX, e.clientY);
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (isScratching) {
      scratch(e.clientX, e.clientY);
    }
  };

  const handleMouseUp = () => {
    setIsScratching(false);
  };

  const handleTouchStart = (e: React.TouchEvent) => {
    e.preventDefault();
    setIsScratching(true);
    setHasStartedScratching(true);
    const touch = e.touches[0];
    scratch(touch.clientX, touch.clientY);
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    e.preventDefault();
    if (isScratching) {
      const touch = e.touches[0];
      scratch(touch.clientX, touch.clientY);
    }
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    e.preventDefault();
    setIsScratching(false);
  };

  const resetCard = () => {
    setIsRevealed(false);
    setScratchPercentage(0);
    setHasStartedScratching(false);
    setCurrentCard((prev) => (prev + 1) % scratchCardContents.length);
    setTimeout(initializeCanvas, 100);
  };

  const currentContent = scratchCardContents[currentCard];

  return (
    <div className="max-w-md mx-auto space-y-6">
      <Card className="bg-white/90 backdrop-blur-sm border-2 border-rose-100 shadow-xl">
        <CardHeader>
          <CardTitle className="text-center font-handwriting text-2xl text-rose-600">
            Scratch Card Surprise 🎁
          </CardTitle>
          <p className="text-center text-gray-600 text-sm">
            Use your finger or mouse to scratch and reveal your surprise!
          </p>
        </CardHeader>
        <CardContent>
          <div className="relative">
            {/* Hidden content */}
            <div className={`absolute inset-0 p-6 rounded-lg bg-gradient-to-br ${currentContent.bgColor} flex flex-col items-center justify-center text-center space-y-4`}>
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: isRevealed ? 1 : 0 }}
                transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
              >
                {currentContent.icon}
              </motion.div>
              
              <motion.h3
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: isRevealed ? 1 : 0, y: isRevealed ? 0 : 20 }}
                transition={{ delay: 0.3 }}
                className="font-handwriting text-xl text-gray-800"
              >
                {currentContent.title}
              </motion.h3>
              
              {currentContent.image && (
                <motion.img
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: isRevealed ? 1 : 0, scale: isRevealed ? 1 : 0.8 }}
                  transition={{ delay: 0.4 }}
                  src={currentContent.image}
                  alt="Surprise memory"
                  className="w-32 h-24 object-cover rounded-lg shadow-md"
                />
              )}
              
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: isRevealed ? 1 : 0, y: isRevealed ? 0 : 20 }}
                transition={{ delay: 0.5 }}
                className="text-gray-700 text-sm leading-relaxed"
              >
                {currentContent.content}
              </motion.p>
              
              {currentContent.link && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: isRevealed ? 1 : 0, y: isRevealed ? 0 : 20 }}
                  transition={{ delay: 0.6 }}
                >
                  <Button
                    onClick={() => window.open(currentContent.link, '_blank')}
                    className="bg-rose-500 hover:bg-rose-600 text-white text-sm"
                  >
                    Open Surprise
                    <ExternalLink className="w-4 h-4 ml-1" />
                  </Button>
                </motion.div>
              )}
            </div>

            {/* Scratch canvas */}
            <canvas
              ref={canvasRef}
              className={`w-full h-64 rounded-lg cursor-pointer transition-opacity duration-300 ${
                isRevealed ? 'opacity-0 pointer-events-none' : 'opacity-100'
              }`}
              onMouseDown={handleMouseDown}
              onMouseMove={handleMouseMove}
              onMouseUp={handleMouseUp}
              onMouseLeave={handleMouseUp}
              onTouchStart={handleTouchStart}
              onTouchMove={handleTouchMove}
              onTouchEnd={handleTouchEnd}
            />
          </div>

          {/* Progress indicator */}
          {hasStartedScratching && !isRevealed && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="mt-4"
            >
              <div className="w-full bg-gray-200 rounded-full h-2">
                <motion.div
                  className="bg-rose-500 h-2 rounded-full transition-all duration-300"
                  style={{ width: `${scratchPercentage}%` }}
                />
              </div>
              <p className="text-center text-xs text-gray-500 mt-1">
                {Math.round(scratchPercentage)}% revealed
              </p>
            </motion.div>
          )}

          {/* Reset button */}
          <div className="flex justify-center mt-6">
            <Button
              onClick={resetCard}
              variant="outline"
              className="border-rose-200 text-rose-600 hover:bg-rose-50"
            >
              <RefreshCw className="w-4 h-4 mr-2" />
              New Scratch Card
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Celebration animation */}
      <AnimatePresence>
        {isRevealed && (
          <motion.div
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0 }}
            className="text-center"
          >
            <motion.div
              animate={{ rotate: [0, 10, -10, 0] }}
              transition={{ duration: 0.5, repeat: 2 }}
              className="text-4xl mb-2"
            >
              🎉
            </motion.div>
            <p className="text-rose-600 font-medium">
              Surprise revealed! 💕
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
'use client';

import { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { RotateCcw, Gift, Music, Camera, Heart, Sparkles, X } from 'lucide-react';

interface WheelSegment {
    id: number;
    label: string;
    color: string;
    icon: React.ReactNode;
    content: {
        type: 'photo' | 'joke' | 'song' | 'gift' | 'memory' | 'coupon';
        title: string;
        description: string;
        image?: string;
        link?: string;
    };
}

const wheelSegments: WheelSegment[] = [
    {
        id: 1,
        label: "Memory Photo",
        color: "#f43f5e",
        icon: <Camera className="w-4 h-4" />,
        content: {
            type: 'photo',
            title: "Our First Date Memory",
            description: "Remember how nervous we both were? You kept playing with your hair, and I couldn't stop smiling. Best first date ever! 💕",
            image: "https://images.pexels.com/photos/1024870/pexels-photo-1024870.jpeg?auto=compress&cs=tinysrgb&w=400"
        }
    },
    {
        id: 2,
        label: "Inside Joke",
        color: "#8b5cf6",
        icon: <Sparkles className="w-4 h-4" />,
        content: {
            type: 'joke',
            title: "The Great Pizza Debate",
            description: "You: 'Pineapple belongs on pizza!' Me: 'That's illegal!' Us now: Ordering half pineapple, half normal like the compromise champions we are 🍕😂"
        }
    },
    {
        id: 3,
        label: "Song Link",
        color: "#f59e0b",
        icon: <Music className="w-4 h-4" />,
        content: {
            type: 'song',
            title: "Our Song",
            description: "The song that was playing when we first danced in the kitchen at 2 AM. Every time I hear it, I fall in love with you all over again 🎵",
            link: "https://open.spotify.com/track/example"
        }
    },
    {
        id: 4,
        label: "Mini Gift Hint",
        color: "#06b6d4",
        icon: <Gift className="w-4 h-4" />,
        content: {
            type: 'gift',
            title: "Birthday Surprise Clue",
            description: "It's something you've mentioned wanting, it's small enough to hide, and it sparkles just like your eyes when you smile ✨💎"
        }
    },
    {
        id: 5,
        label: "Sweet Memory",
        color: "#10b981",
        icon: <Heart className="w-4 h-4" />,
        content: {
            type: 'memory',
            title: "Rainy Day Magic",
            description: "That day it poured and we got completely soaked running to the car. Instead of being upset, you started dancing in the rain. That's when I knew you were magic ☔💃"
        }
    },
    {
        id: 6,
        label: "Love Coupon",
        color: "#ec4899",
        icon: <Heart className="w-4 h-4" />,
        content: {
            type: 'coupon',
            title: "Redeemable Hug Coupon",
            description: "Good for one (1) extra long, extra warm, extra loving hug. No expiration date. Can be redeemed anytime, anywhere. Side effects may include excessive happiness 🫂💕"
        }
    }
];

export function SpinWheel() {
    const [isSpinning, setIsSpinning] = useState(false);
    const [rotation, setRotation] = useState(0);
    const [selectedSegment, setSelectedSegment] = useState<WheelSegment | null>(null);
    const [showResult, setShowResult] = useState(false);
    const wheelRef = useRef<HTMLDivElement>(null);

    const spinWheel = () => {
        if (isSpinning) return;

        setIsSpinning(true);
        setShowResult(false);

        // Random spin between 3-6 full rotations plus random segment
        const spins = 3 + Math.random() * 3;
        const segmentAngle = 360 / wheelSegments.length;
        const randomSegment = Math.floor(Math.random() * wheelSegments.length);
        const finalRotation = rotation + (spins * 360) + (randomSegment * segmentAngle);

        setRotation(finalRotation);

        setTimeout(() => {
            setIsSpinning(false);
            setSelectedSegment(wheelSegments[randomSegment]);
            setShowResult(true);
        }, 3000);
    };

    const resetWheel = () => {
        setRotation(0);
        setSelectedSegment(null);
        setShowResult(false);
    };

    return (
        <div className="flex flex-col items-center space-y-8">
            <Card className="bg-white/90 backdrop-blur-sm border-2 border-rose-100 shadow-xl">
                <CardHeader>
                    <CardTitle className="text-center font-handwriting text-3xl text-rose-600">
                        Wheel of Surprises 🎡
                    </CardTitle>
                    <p className="text-center text-gray-600">
                        Spin the wheel for a sweet surprise just for you!
                    </p>
                </CardHeader>
                <CardContent className="flex flex-col items-center space-y-6">
                    {/* Wheel Container */}
                    <div className="relative">
                        {/* Pointer */}
                        <div className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-2 z-10">
                            <div className="w-0 h-0 border-l-4 border-r-4 border-b-8 border-l-transparent border-r-transparent border-b-rose-500" />
                        </div>

                        {/* Wheel */}
                        <motion.div
                            ref={wheelRef}
                            className="relative w-64 h-64 sm:w-72 sm:h-72 md:w-80 md:h-80 rounded-full border-8 border-white shadow-2xl overflow-hidden"
                            animate={{ rotate: rotation }}
                            transition={{
                                duration: isSpinning ? 3 : 0,
                                ease: isSpinning ? "easeOut" : "linear"
                            }}
                        >
                            {wheelSegments.map((segment, index) => {
                                const angle = (360 / wheelSegments.length) * index;
                                const nextAngle = (360 / wheelSegments.length) * (index + 1);

                                return (
                                    <div
                                        key={segment.id}
                                        className="absolute inset-0 flex items-center justify-center text-white font-medium text-sm"
                                        style={{
                                            background: `conic-gradient(from ${angle}deg, ${segment.color} 0deg, ${segment.color} ${360 / wheelSegments.length}deg, transparent ${360 / wheelSegments.length}deg)`,
                                            clipPath: `polygon(50% 50%, ${50 + 50 * Math.cos((angle - 90) * Math.PI / 180)}% ${50 + 50 * Math.sin((angle - 90) * Math.PI / 180)}%, ${50 + 50 * Math.cos((nextAngle - 90) * Math.PI / 180)}% ${50 + 50 * Math.sin((nextAngle - 90) * Math.PI / 180)}%)`
                                        }}
                                    >
                                        <div
                                            className="flex flex-col items-center gap-1 text-center px-2"
                                            style={{
                                                transform: `rotate(${angle + (360 / wheelSegments.length) / 2}deg)`,
                                                transformOrigin: 'center'
                                            }}
                                        >
                                            {segment.icon}
                                            <span className="text-xs leading-tight">{segment.label}</span>
                                        </div>
                                    </div>
                                );
                            })}

                            {/* Center circle */}
                            <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-16 h-16 bg-white rounded-full shadow-lg flex items-center justify-center">
                                <Sparkles className="w-8 h-8 text-rose-500" />
                            </div>
                        </motion.div>
                    </div>

                    {/* Controls */}
                    <div className="flex gap-4">
                        <Button
                            onClick={spinWheel}
                            disabled={isSpinning}
                            className="bg-rose-500 hover:bg-rose-600 text-white px-8 py-3 rounded-full font-medium transition-all duration-300 transform hover:scale-105 disabled:opacity-50"
                        >
                            {isSpinning ? (
                                <motion.div
                                    animate={{ rotate: 360 }}
                                    transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                                    className="w-5 h-5 border-2 border-white border-t-transparent rounded-full mr-2"
                                />
                            ) : (
                                <RotateCcw className="w-5 h-5 mr-2" />
                            )}
                            {isSpinning ? 'Spinning...' : 'Spin the Wheel!'}
                        </Button>

                        <Button
                            onClick={resetWheel}
                            variant="outline"
                            className="border-rose-200 text-rose-600 hover:bg-rose-50"
                        >
                            Reset
                        </Button>
                    </div>
                </CardContent>
            </Card>

            {/* Result Modal */}
            <AnimatePresence>
                {showResult && selectedSegment && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4"
                        onClick={() => setShowResult(false)}
                    >
                        <motion.div
                            initial={{ scale: 0.8, opacity: 0, y: 50 }}
                            animate={{ scale: 1, opacity: 1, y: 0 }}
                            exit={{ scale: 0.8, opacity: 0, y: 50 }}
                            className="bg-white rounded-2xl max-w-md w-full shadow-2xl"
                            onClick={(e) => e.stopPropagation()}
                        >
                            <div className="p-6">
                                <div className="flex items-center justify-between mb-4">
                                    <div className="flex items-center gap-2">
                                        <div
                                            className="w-6 h-6 rounded-full flex items-center justify-center text-white"
                                            style={{ backgroundColor: selectedSegment.color }}
                                        >
                                            {selectedSegment.icon}
                                        </div>
                                        <h3 className="font-handwriting text-xl text-rose-600">
                                            {selectedSegment.content.title}
                                        </h3>
                                    </div>
                                    <Button
                                        variant="ghost"
                                        size="sm"
                                        onClick={() => setShowResult(false)}
                                        className="rounded-full"
                                    >
                                        <X className="w-4 h-4" />
                                    </Button>
                                </div>

                                {selectedSegment.content.image && (
                                    <img
                                        src={selectedSegment.content.image}
                                        alt={selectedSegment.content.title}
                                        className="w-full h-48 object-cover rounded-lg mb-4"
                                    />
                                )}

                                <p className="text-gray-700 leading-relaxed mb-4">
                                    {selectedSegment.content.description}
                                </p>

                                {selectedSegment.content.link && (
                                    <Button
                                        onClick={() => window.open(selectedSegment.content.link, '_blank')}
                                        className="w-full bg-rose-500 hover:bg-rose-600 text-white"
                                    >
                                        Listen Now 🎵
                                    </Button>
                                )}

                                {selectedSegment.content.type === 'coupon' && (
                                    <div className="bg-rose-50 border-2 border-dashed border-rose-300 rounded-lg p-4 text-center">
                                        <p className="text-rose-600 font-medium">
                                            💝 This coupon is now active! 💝
                                        </p>
                                    </div>
                                )}
                            </div>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
}
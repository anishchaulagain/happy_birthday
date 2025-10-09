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
        type: 'photo' | 'joke' | 'song' | 'gift' | 'memory' | 'coupon' | 'video';
        title: string;
        description: string;
        image?: string;
        link?: string;
        video?: string;
    };
}

const wheelSegments: WheelSegment[] = [
    {
        id: 1,
        label: "Birthday Asirbad",
        color: "#f43f5e",
        icon: <Camera className="w-4 h-4" />,
        content: {
            type: 'photo',
            title: "Birthday Asirbad",
            description: "Mero baby, Sadhai gyani hunu, vaneko mannu, ra tmle mageko sabai kura pura hos. ILYSM 💕",
            image: "https://res.cloudinary.com/dv9s1kiz2/image/upload/v1760017543/WhatsApp_Image_2025-10-09_at_19.29.37_fa0dac16_swdyrg.jpg"
        }
    },
    {
        id: 2,
        label: "Informative Spin",
        color: "#8b5cf6",
        icon: <Sparkles className="w-4 h-4" />,
        content: {
            type: 'joke',
            title: "Right side ko bottom corner bata geet off hunxa la",
            description: "Yo chai aheley 2025-10-09 ko 8:02 ma tha paye ki geet off garna vanera icon banauna birsechu. Spin garda yo ayo vane chai tya tala right ma birthday geet off garna milne option xa hai. Ani hattar ma banako, tei vayera spin garda eutai patak patak aauna sakxa. There are around 7 special things hai. Gift chai chocolate diyesi😂"
        }
    },
    {
        id: 3,
        label: "Fun Video",
        color: "#f59e0b",
        icon: <Music className="w-4 h-4" />,
        content: {
            type: 'video',
            title: "Random Capture at Nalagadi",
            description: "Eti cute video banayesi jhadaga ne vayo paxi 🎵",
            link: "https://res.cloudinary.com/dv9s1kiz2/video/upload/v1760019042/WhatsApp_Video_2025-10-09_at_19.54.44_ab18bd25_sx04uj.mp4"
        }
    },
    {
        id: 4,
        label: "Mini Gift Hint",
        color: "#06b6d4",
        icon: <Gift className="w-4 h-4" />,
        content: {
            type: 'gift',
            title: "A little Surprise",
            description: "We're going somewhere after your exam. Hint: We’ll be chasing a golden glow and a silver farewell… just follow me.✨💎"
        }
    },

    {
        id: 5,
        label: "Love Coupon",
        color: "#ec4899",
        icon: <Heart className="w-4 h-4" />,
        content: {
            type: 'coupon',
            title: "Redeemable Hug Coupon",
            description: "Good for one extra long, extra warm, extra loving hug. No expiration date. Can be redeemed anytime, anywhere. Side effects may include excessive happiness 🫂💕"
        }
    },
    {
        id: 6,
        label: " Himalayan Java Unofficial Date",
        color: "#f59e0b",
        icon: <Music className="w-4 h-4" />,
        content: {
            type: 'video',
            title: "First Jhut bolera lageko Unofficial Date",
            description: "Hamro First Unofficial Date🤭 All thanks to mero sathi bhai ✨",
            link: "https://res.cloudinary.com/dv9s1kiz2/video/upload/v1760016973/WhatsApp_Video_2025-10-09_at_19.20.35_d0ca9962_vulzia.mp4"
        }
    },
    {
        id: 7,
        label: "First Visit to Kritipur Pul",
        color: "#f59e0b",
        icon: <Music className="w-4 h-4" />,
        content: {
            type: 'video',
            title: "Random Capture at Nalagadi",
            description: "Remember this day? First Visit to Kritipur ko pul, teo pani gala ma tape tasera🤦",
            link: "https://res.cloudinary.com/dv9s1kiz2/video/upload/v1760016204/WhatsApp_Video_2025-10-09_at_19.06.56_64f293d7_otj6kn.mp4"
        }
    },
    {
        id: 8,
        label: "First Shadow Pic Together",
        color: "#f43f5e",
        icon: <Camera className="w-4 h-4" />,
        content: {
            type: 'photo',
            title: "Shadow Pic Together",
            description: "Hamro cute shadow pic, but mero sathi samaj ma jaggu sanga khiceko vanera halla faileko thyo yo snap le garda🤦",
            image: "https://res.cloudinary.com/dv9s1kiz2/image/upload/v1760021665/WhatsApp_Image_2025-10-09_at_20.38.34_8eb62275_hghmuq.jpg"
        }
    },
    
    
];

export function SpinWheel() {
    const [isSpinning, setIsSpinning] = useState(false);
    const [rotation, setRotation] = useState(0);
    const [selectedSegment, setSelectedSegment] = useState<WheelSegment | null>(null);
    const [showResult, setShowResult] = useState(false);
    const wheelRef = useRef<HTMLDivElement>(null);

    const [currentIndex, setCurrentIndex] = useState(0);

    const spinWheel = () => {
        if (isSpinning) return;

        setIsSpinning(true);
        setShowResult(false);

        const segmentAngle = 360 / wheelSegments.length;
        const nextIndex = (currentIndex + 1) % wheelSegments.length;

        // Calculate the rotation needed to reach the next segment
        const finalRotation = rotation + (360 - (nextIndex * segmentAngle)) + 360 * 3; // 3 full spins

        setRotation(finalRotation);

        setTimeout(() => {
            setIsSpinning(false);
            setSelectedSegment(wheelSegments[nextIndex]);
            setShowResult(true);
            setCurrentIndex(nextIndex);
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

                                {
                                    selectedSegment.content.image && selectedSegment.content.type !== 'video' && (
                                        <img
                                            src={selectedSegment.content.image}
                                            alt={selectedSegment.content.title}
                                            className="w-full h-96 sm:h-[400px] md:h-[500px] object-cover rounded-lg mb-4"
                                        />
                                    )
                                }

                                {selectedSegment.content.type === 'video' && selectedSegment.content.link && (
                                    <video
                                        src={selectedSegment.content.link}
                                        className="w-full h-[500px] sm:h-[600px] md:h-[700px] object-cover rounded-lg mb-4"
                                        autoPlay
                                        muted
                                        controls
                                        playsInline
                                    />
                                )}

                                <p className="text-gray-700 leading-relaxed mb-4">
                                    {selectedSegment.content.description}
                                </p>

                                {/* {selectedSegment.content.link && (
                                    <Button
                                        onClick={() => window.open(selectedSegment.content.link, '_blank')}
                                        className="w-full bg-rose-500 hover:bg-rose-600 text-white"
                                    >
                                        Listen Now 🎵
                                    </Button>
                                )} */}

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
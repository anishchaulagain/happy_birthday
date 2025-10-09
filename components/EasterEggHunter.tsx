'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Heart, Star, Flower, X, Gift, Camera } from 'lucide-react';

interface EasterEgg {
    id: string;
    icon: React.ReactNode;
    position: { top?: string; bottom?: string; left?: string; right?: string };
    note: string;
    type: 'heart' | 'star' | 'flower';
}

const easterEggs: EasterEgg[] = [
    {
        id: 'heart1',
        icon: <Heart className="w-4 h-4 text-rose-400" />,
        position: { top: '20%', right: '5%' },
        note: "I always wish your all dream come true baby. 💕",
        type: 'heart'
    },
    {
        id: 'heart2',
        icon: <Heart className="w-4 h-4 text-rose-400" />,
        position: { bottom: '30%', left: '3%' },
        note: "That time you leaned on my shoulder during the movie... Though malai movie ko name last ma tha vayo ayo haha, but it was very amazing because you looked so peaceful 😴 Btw still thankful to you for the surprise.",
        type: 'heart'
    },
    {
        id: 'heart3',
        icon: <Heart className="w-4 h-4 text-rose-400" />,
        position: { top: '60%', right: '8%' },
        note: "I love how you wear my hoodie though jadoo jsto dekhithiyo🤭 and dada ko jacket was too awesome 👕",
        type: 'heart'
    },
    {
        id: 'star1',
        icon: <Star className="w-4 h-4 text-yellow-400" />,
        position: { top: '40%', left: '2%' },
        note: "Birthday Eve mai risaidira. Sorry mero galti thyo🥺 ✨",
        type: 'star'
    },
    {
        id: 'flower1',
        icon: <Flower className="w-4 h-4 text-pink-400" />,
        position: { top: '80%', left: '5%' },
        note: "October 10 ma birthday parinjel mero 10/10 baddie, else 11/10 baddie🌸",
        type: 'flower'
    }
];

const secretPhotos = [
    {
        id: 1,
        src: "https://res.cloudinary.com/dv9s1kiz2/image/upload/v1760017056/Screenshot_2025-08-12_234759_as0twq.png",
        caption: "Best Video Call Ever. Google meet ma kun chai couple video call garxan hola🤡  📸"
    },
    // {
    //     id: 2,
    //     src: "https://res.cloudinary.com/dv9s1kiz2/video/upload/v1760016204/WhatsApp_Video_2025-10-09_at_19.06.56_64f293d7_otj6kn.mp4",
    //     caption: "Remember this day? First Visit to Kritipur ko pul, teo pani gala ma tape tasera🤦"
    // },
    {
        id: 2,
        src: "https://res.cloudinary.com/dv9s1kiz2/video/upload/v1760023280/WhatsApp_Video_2025-10-09_at_21.05.49_7d9fc229_dnbpns.mp4",
        caption: "Hamro First Unofficial Date🤭 All thanks to mero sathi bhai, Yo chai front view hehe✨"
    },

];

export function EasterEggHunter() {
    const [foundEggs, setFoundEggs] = useState<Set<string>>(new Set());
    const [activeNote, setActiveNote] = useState<EasterEgg | null>(null);
    const [showSecretAlbum, setShowSecretAlbum] = useState(false);
    const [currentSecretPhoto, setCurrentSecretPhoto] = useState(0);

    useEffect(() => {
        const saved = localStorage.getItem('foundEasterEggs');
        if (saved) {
            setFoundEggs(new Set(JSON.parse(saved)));
        }
    }, []);

    const handleEggClick = (egg: EasterEgg) => {
        const newFound = new Set(foundEggs);
        newFound.add(egg.id);
        setFoundEggs(newFound);
        setActiveNote(egg);
        localStorage.setItem(
            'foundEasterEggs',
            JSON.stringify(Array.from(newFound))
        );

        // Check if all hearts are found
        const heartsFound = easterEggs.filter(e => e.type === 'heart' && newFound.has(e.id)).length;
        if (heartsFound === 3 && !showSecretAlbum) {
            setTimeout(() => {
                setShowSecretAlbum(true);
            }, 2000);
        }
    };

    const heartsFound = easterEggs.filter(e => e.type === 'heart' && foundEggs.has(e.id)).length;

    return (
        <>
            {/* Easter Egg Icons */}
            {easterEggs.map((egg) => (
                <motion.button
                    key={egg.id}
                    className="fixed z-30 p-2 rounded-full bg-white/80 backdrop-blur-sm shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-110"
                    style={egg.position}
                    onClick={() => handleEggClick(egg)}
                    initial={{ scale: 0, opacity: 0 }}
                    animate={{
                        scale: foundEggs.has(egg.id) ? 0 : 1,
                        opacity: foundEggs.has(egg.id) ? 0 : 1
                    }}
                    whileHover={{ scale: 1.2 }}
                    whileTap={{ scale: 0.9 }}
                >
                    {egg.icon}
                </motion.button>
            ))}

            {/* Progress Indicator */}
            {heartsFound > 0 && heartsFound < 3 && (
                <motion.div
                    initial={{ opacity: 0, y: 50 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="fixed bottom-4 left-1/2 transform -translate-x-1/2 z-40"
                >
                    <Card className="bg-white/90 backdrop-blur-sm border-rose-200">
                        <CardContent className="p-3 text-center">
                            <p className="text-sm text-gray-600">
                                💕 {heartsFound}/3 hearts found - Keep looking for a surprise!
                            </p>
                        </CardContent>
                    </Card>
                </motion.div>
            )}

            {/* Love Note Modal */}
            <AnimatePresence>
                {activeNote && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4"
                        onClick={() => setActiveNote(null)}
                    >
                        <motion.div
                            initial={{ scale: 0.8, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            exit={{ scale: 0.8, opacity: 0 }}
                            className="bg-white rounded-2xl max-w-md w-full p-6 shadow-2xl"
                            onClick={(e) => e.stopPropagation()}
                        >
                            <div className="flex items-center justify-between mb-4">
                                <div className="flex items-center gap-2">
                                    {activeNote.icon}
                                    <h3 className="font-handwriting text-xl text-rose-600">Love Note</h3>
                                </div>
                                <Button
                                    variant="ghost"
                                    size="sm"
                                    onClick={() => setActiveNote(null)}
                                    className="rounded-full"
                                >
                                    <X className="w-4 h-4" />
                                </Button>
                            </div>
                            <p className="text-gray-700 leading-relaxed">
                                {activeNote.note}
                            </p>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* Secret Album Unlock */}
            <AnimatePresence>
                {showSecretAlbum && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4"
                        onClick={() => setShowSecretAlbum(false)}
                    >
                        <motion.div
                            initial={{ scale: 0.8, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            exit={{ scale: 0.8, opacity: 0 }}
                            className="bg-white rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-auto"
                            onClick={(e) => e.stopPropagation()}
                        >
                            <div className="p-6">
                                <div className="flex items-center justify-between mb-6">
                                    <div className="flex items-center gap-2">
                                        <Camera className="w-6 h-6 text-rose-500" />
                                        <h2 className="font-handwriting text-2xl text-rose-600">
                                            Secret Photo Album Unlocked! 🎉
                                        </h2>
                                    </div>
                                    <Button
                                        variant="ghost"
                                        size="sm"
                                        onClick={() => setShowSecretAlbum(false)}
                                        className="rounded-full"
                                    >
                                        <X className="w-5 h-5" />
                                    </Button>
                                </div>

                                <div className="space-y-4">


                                    <div className="relative">
                                        {secretPhotos[currentSecretPhoto].src.endsWith('.mp4') ? (
                                            <video
                                                src={secretPhotos[currentSecretPhoto].src}
                                                className="w-full h-64 object-cover rounded-lg"
                                                controls
                                                autoPlay
                                                loop
                                                muted
                                            />
                                        ) : (
                                            <img
                                                src={secretPhotos[currentSecretPhoto].src}
                                                alt="Secret photo"
                                                className="w-full h-64 object-cover rounded-lg"
                                            />
                                        )}
                                        <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent rounded-lg" />
                                        <p className="absolute bottom-4 left-4 right-4 text-white text-sm">
                                            {secretPhotos[currentSecretPhoto].caption}
                                        </p>
                                    </div>

                                    <div className="flex justify-center gap-2 mt-4">
                                        {secretPhotos.map((_, index) => (
                                            <button
                                                key={index}
                                                onClick={() => setCurrentSecretPhoto(index)}
                                                className={`w-3 h-3 rounded-full transition-all ${index === currentSecretPhoto
                                                    ? 'bg-rose-500 w-8'
                                                    : 'bg-gray-300 hover:bg-rose-300'
                                                    }`}
                                            />
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    );
}
'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { Navigation } from '@/components/Navigation';
import { MusicToggle } from '@/components/MusicToggle';
import { PhotoGallery } from '@/components/PhotoGallery';
import { GiftPuzzle } from '@/components/GiftPuzzle';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Camera, Gift } from 'lucide-react';

export default function GalleryPage() {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  return (
    <>
      
      <main className="min-h-screen bg-none pt-20">
        <div className="max-w-7xl mx-auto px-4 py-12">
          <motion.div
            ref={ref}
            initial={{ opacity: 0, y: 50 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8 }}
            className="text-center mb-12"
          >
            <h1 className="font-handwriting text-5xl md:text-6xl text-rose-600 mb-6">
              Our Memories & Surprises
            </h1>
            <p className="text-xl text-gray-700 max-w-2xl mx-auto">
              A collection of our beautiful moments together, plus a special puzzle 
              to unlock your birthday surprises! 🎁
            </p>
          </motion.div>

          <Tabs defaultValue="gallery" className="w-full">
            <TabsList className="grid w-full grid-cols-2 max-w-md mx-auto mb-8">
              <TabsTrigger value="gallery" className="flex items-center gap-2">
                <Camera className="w-4 h-4" />
                Photo Gallery
              </TabsTrigger>
              <TabsTrigger value="puzzle" className="flex items-center gap-2">
                <Gift className="w-4 h-4" />
                Gift Puzzle
              </TabsTrigger>
            </TabsList>
            
            <TabsContent value="gallery">
              <PhotoGallery />
            </TabsContent>
            
            <TabsContent value="puzzle">
              <GiftPuzzle />
            </TabsContent>
          </Tabs>
        </div>
      </main>
    </>
  );
}
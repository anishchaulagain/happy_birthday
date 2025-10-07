'use client';

import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { Navigation } from '@/components/Navigation';
import { MusicToggle } from '@/components/MusicToggle';
import { Timeline } from '@/components/Timeline';
import { LoveJourneyMap } from '@/components/LoveJourneyMap';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Clock, Map } from 'lucide-react';

export default function JourneyPage() {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  return (
    <>
      <Navigation />
      <MusicToggle />
      
      <main className="min-h-screen bg-none pt-20">
        <div className="max-w-6xl mx-auto px-4 py-12">
          <motion.div
            ref={ref}
            initial={{ opacity: 0, y: 50 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <h1 className="font-handwriting text-5xl md:text-6xl text-rose-600 mb-6">
              Our Beautiful Journey
            </h1>
            <p className="text-xl text-gray-700 max-w-2xl mx-auto">
              Every moment with you has been a gift. Here's our story, 
              told through time and the places we've been together.
            </p>
          </motion.div>

                <LoveJourneyMap />
        </div>
      </main>
    </>
  );
}
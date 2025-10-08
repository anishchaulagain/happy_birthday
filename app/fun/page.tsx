'use client';

import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { Navigation } from '@/components/Navigation';
import { MusicToggle } from '@/components/MusicToggle';
import { SpinWheel } from '@/components/SpinWheel';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { RotateCcw, Heart, Sparkles } from 'lucide-react';
import PhotoBooth from '@/components/PhotoBooth';


export default function FunPage() {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  return (
    <>
    
      
      <main className="min-h-screen bg-none pt-20">
        <div className="max-w-4xl mx-auto px-4 py-12">
          <motion.div
            ref={ref}
            initial={{ opacity: 0, y: 50 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8 }}
            className="text-center mb-12"
          >
            <h1 className="font-handwriting text-5xl md:text-6xl text-rose-600 mb-6">
              Fun & Games
            </h1>
            <p className="text-xl text-gray-700 max-w-2xl mx-auto">
              Some playful surprises and interactive fun, because every birthday 
              needs a little magic and laughter! ✨
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.5, duration: 0.6 }}
          >
            <SpinWheel/>
           
          </motion.div>

          {/* <Tabs defaultValue="wheel" className="w-full">
            <TabsList className="grid w-full grid-cols-2 max-w-md mx-auto mb-8">
              <TabsTrigger value="wheel" className="flex items-center gap-2">
                <RotateCcw className="w-4 h-4" />
                Spin the Wheel
              </TabsTrigger>
              <TabsTrigger value="quiz" className="flex items-center gap-2">
                <Heart className="w-4 h-4" />
                Love Quiz
              </TabsTrigger>
            </TabsList>
            
            <TabsContent value="wheel">
              <SpinWheel />
            </TabsContent>
            
            <TabsContent value="quiz">
              <div className="text-center py-12">
                <Sparkles className="w-16 h-16 text-rose-400 mx-auto mb-4" />
                <h3 className="font-handwriting text-2xl text-rose-600 mb-4">
                  Love Quiz Coming Soon!
                </h3>
                <p className="text-gray-600">
                  A fun quiz about our relationship is in the works. 
                  For now, enjoy the wheel of surprises! 💕
                </p>
              </div>
            </TabsContent>
          </Tabs> */}
        </div>
      </main>
    </>
  );
}
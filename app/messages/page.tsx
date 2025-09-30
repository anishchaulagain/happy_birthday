'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Navigation } from '@/components/Navigation';
import { MusicToggle } from '@/components/MusicToggle';
import { MessageForm } from '@/components/MessageForm';
import { MessageCarousel } from '@/components/MessageCarousel';
import { useInView } from 'react-intersection-observer';

export default function MessagesPage() {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  return (
    <>
    
      
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
              Birthday Messages
            </h1>
            <p className="text-xl text-gray-700 max-w-2xl mx-auto">
              Leave a sweet message for the birthday girl! 
              Your words will make her day even more special.
            </p>
          </motion.div>

          {/* <div className="grid lg:grid-cols-2 gap-12 items-start"> */}
          <div className='max-w-7xl mx-auto'>
           
            <MessageCarousel />
          </div>
        </div>
      </main>
    </>
  );
}
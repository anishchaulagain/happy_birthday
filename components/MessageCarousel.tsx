'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { ChevronLeft, ChevronRight, Heart } from 'lucide-react';

interface Message {
  id: number;
  name: string;
  message: string;
  timestamp: string;
  likes: number;
  approved: boolean;
}

const sampleMessages: Message[] = [
  {
    id: 1,
    name: "Sarah",
    message: "Happy birthday to the most amazing person! Hope your day is filled with love, laughter, and all your favorite things. You deserve the world! 🎂✨",
    timestamp: new Date().toISOString(),
    likes: 5,
    approved: true,
  },
  {
    id: 2,
    name: "Mom",
    message: "My dear daughter, watching you grow into the incredible person you are today has been my greatest joy. Happy birthday, sweetheart! 💕",
    timestamp: new Date().toISOString(),
    likes: 12,
    approved: true,
  },
  {
    id: 3,
    name: "Emma & Jake",
    message: "Another year of being fabulous! Thanks for being such an incredible friend. Can't wait to celebrate with you! 🎉🥳",
    timestamp: new Date().toISOString(),
    likes: 8,
    approved: true,
  },
];

export function MessageCarousel() {
  const [messages, setMessages] = useState<Message[]>(sampleMessages);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);

  useEffect(() => {
    // Load messages from localStorage
    const savedMessages = localStorage.getItem('birthdayMessages');
    if (savedMessages) {
      const parsedMessages = JSON.parse(savedMessages);
      setMessages([...sampleMessages, ...parsedMessages.filter((m: Message) => m.approved)]);
    }
  }, []);

  useEffect(() => {
    if (!isAutoPlaying) return;
    
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % messages.length);
    }, 4000);

    return () => clearInterval(interval);
  }, [messages.length, isAutoPlaying]);

  const handleLike = (messageId: number) => {
    setMessages(prev => 
      prev.map(msg => 
        msg.id === messageId 
          ? { ...msg, likes: msg.likes + 1 }
          : msg
      )
    );
  };

  const nextMessage = () => {
    setCurrentIndex((prev) => (prev + 1) % messages.length);
    setIsAutoPlaying(false);
  };

  const prevMessage = () => {
    setCurrentIndex((prev) => (prev - 1 + messages.length) % messages.length);
    setIsAutoPlaying(false);
  };

  if (messages.length === 0) {
    return (
      <motion.div
        initial={{ opacity: 0, x: 50 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.8 }}
        className="text-center py-12"
      >
        <div className="text-6xl mb-4">💌</div>
        <h3 className="text-xl font-medium text-gray-600 mb-2">
          No messages yet!
        </h3>
        <p className="text-gray-500">
          Be the first to send a birthday message!
        </p>
      </motion.div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, x: 50 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.8 }}
      className="space-y-6"
    >
      <div className="text-center">
        <h3 className="font-handwriting text-2xl text-rose-600 mb-2">
          Messages of Love
        </h3>
        <p className="text-gray-600">
          {messages.length} loving message{messages.length !== 1 ? 's' : ''}
        </p>
      </div>

      <div className="relative">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentIndex}
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -50 }}
            transition={{ duration: 0.5 }}
          >
            <Card className="bg-white/90 backdrop-blur-sm border-2 border-rose-100 shadow-lg">
              <CardContent className="p-6">
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <h4 className="font-medium text-gray-800 text-lg">
                      {messages[currentIndex].name}
                    </h4>
                    <p className="text-sm text-gray-500">
                      {new Date(messages[currentIndex].timestamp).toLocaleDateString()}
                    </p>
                  </div>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => handleLike(messages[currentIndex].id)}
                    className="group hover:bg-rose-50 transition-colors"
                  >
                    <Heart className="w-4 h-4 mr-1 group-hover:text-rose-500 group-hover:fill-current transition-all" />
                    <span className="text-sm">{messages[currentIndex].likes}</span>
                  </Button>
                </div>
                
                <p className="text-gray-700 leading-relaxed text-lg">
                  {messages[currentIndex].message}
                </p>
              </CardContent>
            </Card>
          </motion.div>
        </AnimatePresence>

        {messages.length > 1 && (
          <>
            <Button
              variant="outline"
              size="sm"
              onClick={prevMessage}
              className="absolute left-0 top-1/2 transform -translate-y-1/2 -translate-x-4 rounded-full w-10 h-10 p-0 bg-white shadow-lg hover:bg-rose-50 border-rose-200"
            >
              <ChevronLeft className="w-5 h-5" />
            </Button>
            
            <Button
              variant="outline"
              size="sm"
              onClick={nextMessage}
              className="absolute right-0 top-1/2 transform -translate-y-1/2 translate-x-4 rounded-full w-10 h-10 p-0 bg-white shadow-lg hover:bg-rose-50 border-rose-200"
            >
              <ChevronRight className="w-5 h-5" />
            </Button>
          </>
        )}
      </div>

      {messages.length > 1 && (
        <div className="flex justify-center space-x-2">
          {messages.map((_, index) => (
            <button
              key={index}
              onClick={() => {
                setCurrentIndex(index);
                setIsAutoPlaying(false);
              }}
              className={`w-2 h-2 rounded-full transition-all duration-300 ${
                index === currentIndex 
                  ? 'bg-rose-500 w-8' 
                  : 'bg-rose-200 hover:bg-rose-300'
              }`}
            />
          ))}
        </div>
      )}
    </motion.div>
  );
}
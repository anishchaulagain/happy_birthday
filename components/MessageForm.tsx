'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Heart, Send, CircleCheck as CheckCircle } from 'lucide-react';

const messageSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters'),
  message: z.string().min(10, 'Message must be at least 10 characters'),
  email: z.string().email('Please enter a valid email').optional().or(z.literal('')),
});

type MessageFormData = z.infer<typeof messageSchema>;

export function MessageForm() {
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<MessageFormData>({
    resolver: zodResolver(messageSchema),
  });

  const onSubmit = async (data: MessageFormData) => {
    setIsLoading(true);
    
    // Simulate API call - replace with actual Supabase integration
    try {
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Store message in localStorage for demo (replace with Supabase)
      const messages = JSON.parse(localStorage.getItem('birthdayMessages') || '[]');
      const newMessage = {
        id: Date.now(),
        ...data,
        timestamp: new Date().toISOString(),
        approved: true, // Auto-approve for demo
        likes: 0,
      };
      messages.push(newMessage);
      localStorage.setItem('birthdayMessages', JSON.stringify(messages));
      
      setIsSubmitted(true);
      reset();
      
      setTimeout(() => {
        setIsSubmitted(false);
      }, 3000);
    } catch (error) {
      console.error('Error submitting message:', error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, x: -50 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.8 }}
    >
      <Card className="bg-white/80 backdrop-blur-sm border-2 border-rose-100 shadow-xl">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 font-handwriting text-2xl text-rose-600">
            <Heart className="w-6 h-6" />
            Send Your Love
          </CardTitle>
        </CardHeader>
        <CardContent>
          {isSubmitted ? (
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              className="text-center py-8"
            >
              <CheckCircle className="w-16 h-16 text-green-500 mx-auto mb-4" />
              <h3 className="text-xl font-medium text-gray-800 mb-2">
                Message Sent! 💕
              </h3>
              <p className="text-gray-600">
                Your sweet message has been added to the celebration!
              </p>
            </motion.div>
          ) : (
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
              <div>
                <Label htmlFor="name" className="text-gray-700 font-medium">
                  Your Name *
                </Label>
                <Input
                  id="name"
                  {...register('name')}
                  placeholder="Enter your name"
                  className="mt-1 border-rose-200 focus:border-rose-400 focus:ring-rose-400"
                />
                {errors.name && (
                  <p className="text-rose-500 text-sm mt-1">{errors.name.message}</p>
                )}
              </div>

              <div>
                <Label htmlFor="email" className="text-gray-700 font-medium">
                  Email (optional)
                </Label>
                <Input
                  id="email"
                  type="email"
                  {...register('email')}
                  placeholder="your@email.com"
                  className="mt-1 border-rose-200 focus:border-rose-400 focus:ring-rose-400"
                />
                {errors.email && (
                  <p className="text-rose-500 text-sm mt-1">{errors.email.message}</p>
                )}
              </div>

              <div>
                <Label htmlFor="message" className="text-gray-700 font-medium">
                  Birthday Message *
                </Label>
                <Textarea
                  id="message"
                  {...register('message')}
                  placeholder="Share your birthday wishes, memories, or just say happy birthday! ✨"
                  rows={5}
                  className="mt-1 border-rose-200 focus:border-rose-400 focus:ring-rose-400 resize-none"
                />
                {errors.message && (
                  <p className="text-rose-500 text-sm mt-1">{errors.message.message}</p>
                )}
              </div>

              <Button
                type="submit"
                disabled={isLoading}
                className="w-full bg-rose-500 hover:bg-rose-600 text-white py-3 rounded-xl font-medium transition-all duration-300 transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isLoading ? (
                  <motion.div
                    animate={{ rotate: 360 }}
                    transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                    className="w-5 h-5 border-2 border-white border-t-transparent rounded-full mr-2"
                  />
                ) : (
                  <Send className="w-5 h-5 mr-2" />
                )}
                {isLoading ? 'Sending...' : 'Send Message'}
              </Button>
            </form>
          )}
        </CardContent>
      </Card>
    </motion.div>
  );
}
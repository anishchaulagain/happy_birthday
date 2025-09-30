'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Gift, Heart, Sparkles, Lock, Clock as Unlock, Star, ShoppingBag, ExternalLink } from 'lucide-react';

interface Gift {
  id: number;
  name: string;
  description: string;
  image: string;
  price: string;
  link: string;
  category: string;
  isSpecial?: boolean;
}

const gifts: Gift[] = [
  {
    id: 1,
    name: "Silk Pajama Set",
    description: "Luxurious silk pajamas in your favorite blush pink color",
    image: "https://images.pexels.com/photos/7679720/pexels-photo-7679720.jpeg?auto=compress&cs=tinysrgb&w=400",
    price: "$89",
    link: "#",
    category: "Fashion",
  },
  {
    id: 2,
    name: "Personalized Star Map",
    description: "A custom star map of the night we first met",
    image: "https://images.pexels.com/photos/1252890/pexels-photo-1252890.jpeg?auto=compress&cs=tinysrgb&w=400",
    price: "$45",
    link: "#",
    category: "Personalized",
    isSpecial: true,
  },
  {
    id: 3,
    name: "Skincare Gift Set",
    description: "Premium skincare set from your favorite brand",
    image: "https://images.pexels.com/photos/3685530/pexels-photo-3685530.jpeg?auto=compress&cs=tinysrgb&w=400",
    price: "$125",
    link: "#",
    category: "Beauty",
  },
  {
    id: 4,
    name: "Weekend Getaway",
    description: "A surprise weekend trip to that cozy cabin you loved",
    image: "https://images.pexels.com/photos/1029604/pexels-photo-1029604.jpeg?auto=compress&cs=tinysrgb&w=400",
    price: "Surprise!",
    link: "#",
    category: "Experience",
    isSpecial: true,
  },
  {
    id: 5,
    name: "Jewelry Box",
    description: "Elegant jewelry box with your initials engraved",
    image: "https://images.pexels.com/photos/1927574/pexels-photo-1927574.jpeg?auto=compress&cs=tinysrgb&w=400",
    price: "$67",
    link: "#",
    category: "Accessories",
  },
  {
    id: 6,
    name: "Cooking Class for Two",
    description: "Learn to make pasta together at that Italian place",
    image: "https://images.pexels.com/photos/4253302/pexels-photo-4253302.jpeg?auto=compress&cs=tinysrgb&w=400",
    price: "$150",
    link: "#",
    category: "Experience",
  },
];

const puzzleQuestions = [
  {
    question: "What's the name of the coffee shop where we first met?",
    answer: "brew",
    hint: "It rhymes with 'new' and starts with 'b'"
  },
  {
    question: "What month did we go on our first vacation together?",
    answer: "june",
    hint: "It's the month when summer officially begins"
  },
  {
    question: "What's your favorite flower that I always get you?",
    answer: "roses",
    hint: "They're red and symbolize love"
  },
  {
    question: "What's the pet name I call you most often?",
    answer: "beautiful",
    hint: "It's what you are, inside and out"
  }
];

export function GiftPuzzle() {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [userAnswer, setUserAnswer] = useState('');
  const [isUnlocked, setIsUnlocked] = useState(false);
  const [showHint, setShowHint] = useState(false);
  const [attempts, setAttempts] = useState(0);
  const [solvedQuestions, setSolvedQuestions] = useState<number[]>([]);
  const [showCelebration, setShowCelebration] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const correctAnswer = puzzleQuestions[currentQuestion].answer.toLowerCase();
    const userInput = userAnswer.toLowerCase().trim();

    if (userInput === correctAnswer) {
      const newSolved = [...solvedQuestions, currentQuestion];
      setSolvedQuestions(newSolved);
      
      if (newSolved.length === puzzleQuestions.length) {
        setIsUnlocked(true);
        setShowCelebration(true);
        setTimeout(() => setShowCelebration(false), 3000);
      } else {
        setCurrentQuestion(currentQuestion + 1);
      }
      
      setUserAnswer('');
      setShowHint(false);
      setAttempts(0);
    } else {
      setAttempts(attempts + 1);
      if (attempts >= 1) {
        setShowHint(true);
      }
    }
  };

  const resetPuzzle = () => {
    setCurrentQuestion(0);
    setUserAnswer('');
    setIsUnlocked(false);
    setShowHint(false);
    setAttempts(0);
    setSolvedQuestions([]);
  };

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      {/* Puzzle Section */}
      {!isUnlocked ? (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center"
        >
          <Card className="bg-white/80 backdrop-blur-sm border-2 border-rose-100 shadow-xl">
            <CardHeader>
              <CardTitle className="flex items-center justify-center gap-2 font-handwriting text-3xl text-rose-600">
                <Lock className="w-8 h-8" />
                Unlock Your Gifts
              </CardTitle>
              <p className="text-gray-600">
                Answer these questions about us to reveal your birthday surprises! 💝
              </p>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* Progress */}
              <div className="flex justify-center gap-2 mb-6">
                {puzzleQuestions.map((_, index) => (
                  <div
                    key={index}
                    className={`w-4 h-4 rounded-full transition-colors ${
                      solvedQuestions.includes(index)
                        ? 'bg-green-500'
                        : index === currentQuestion
                        ? 'bg-rose-500'
                        : 'bg-gray-200'
                    }`}
                  />
                ))}
              </div>

              {/* Current Question */}
              <div className="space-y-4">
                <h3 className="text-xl font-medium text-gray-800">
                  Question {currentQuestion + 1} of {puzzleQuestions.length}
                </h3>
                <p className="text-lg text-gray-700">
                  {puzzleQuestions[currentQuestion].question}
                </p>

                <form onSubmit={handleSubmit} className="space-y-4">
                  <Input
                    value={userAnswer}
                    onChange={(e) => setUserAnswer(e.target.value)}
                    placeholder="Type your answer here..."
                    className="text-center text-lg border-rose-200 focus:border-rose-400"
                  />
                  
                  {showHint && (
                    <motion.div
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="bg-yellow-50 border border-yellow-200 rounded-lg p-3"
                    >
                      <p className="text-yellow-800 text-sm">
                        💡 Hint: {puzzleQuestions[currentQuestion].hint}
                      </p>
                    </motion.div>
                  )}

                  <Button
                    type="submit"
                    className="bg-rose-500 hover:bg-rose-600 text-white px-8 py-2 rounded-full"
                    disabled={!userAnswer.trim()}
                  >
                    Submit Answer
                  </Button>
                </form>

                {attempts > 0 && !showHint && (
                  <p className="text-sm text-gray-500">
                    Try again! ({attempts} attempt{attempts !== 1 ? 's' : ''})
                  </p>
                )}
              </div>
            </CardContent>
          </Card>
        </motion.div>
      ) : (
        /* Unlocked Gifts */
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          className="space-y-8"
        >
          {/* Celebration */}
          <AnimatePresence>
            {showCelebration && (
              <motion.div
                initial={{ opacity: 0, y: -50 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -50 }}
                className="text-center py-8"
              >
                <div className="text-6xl mb-4">🎉</div>
                <h2 className="font-handwriting text-4xl text-rose-600 mb-2">
                  Congratulations!
                </h2>
                <p className="text-xl text-gray-700">
                  You've unlocked all your birthday gifts! 🎁
                </p>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Unlocked Header */}
          <div className="text-center">
            <div className="flex items-center justify-center gap-2 mb-4">
              <Unlock className="w-8 h-8 text-green-500" />
              <h2 className="font-handwriting text-4xl text-rose-600">
                Your Birthday Gifts
              </h2>
            </div>
            <p className="text-lg text-gray-700">
              Here are all the special surprises I've picked out just for you! 💕
            </p>
          </div>

          {/* Gifts Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {gifts.map((gift, index) => (
              <motion.div
                key={gift.id}
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                <Card className="group h-full bg-white/90 backdrop-blur-sm border-2 border-rose-100 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2">
                  <div className="relative overflow-hidden rounded-t-lg">
                    <img
                      src={gift.image}
                      alt={gift.name}
                      className="w-full h-48 object-cover transition-transform duration-300 group-hover:scale-110"
                    />
                    {gift.isSpecial && (
                      <Badge className="absolute top-3 right-3 bg-gold-500 text-white">
                        <Star className="w-3 h-3 mr-1" />
                        Special
                      </Badge>
                    )}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                  </div>
                  
                  <CardContent className="p-6">
                    <div className="space-y-3">
                      <div className="flex items-start justify-between">
                        <h3 className="font-medium text-lg text-gray-800">
                          {gift.name}
                        </h3>
                        <Badge variant="outline" className="text-xs">
                          {gift.category}
                        </Badge>
                      </div>
                      
                      <p className="text-gray-600 text-sm leading-relaxed">
                        {gift.description}
                      </p>
                      
                      <div className="flex items-center justify-between pt-2">
                        <span className="text-lg font-semibold text-rose-600">
                          {gift.price}
                        </span>
                        <Button
                          variant="outline"
                          size="sm"
                          className="group/btn hover:bg-rose-50 border-rose-200"
                          onClick={() => window.open(gift.link, '_blank')}
                        >
                          <ShoppingBag className="w-4 h-4 mr-1 group-hover/btn:text-rose-500" />
                          View Gift
                          <ExternalLink className="w-3 h-3 ml-1" />
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>

          {/* Reset Button */}
          <div className="text-center pt-8">
            <Button
              variant="outline"
              onClick={resetPuzzle}
              className="border-rose-200 text-rose-600 hover:bg-rose-50"
            >
              <Lock className="w-4 h-4 mr-2" />
              Lock Gifts Again
            </Button>
          </div>
        </motion.div>
      )}
    </div>
  );
}
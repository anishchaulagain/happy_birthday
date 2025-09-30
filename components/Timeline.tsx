'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Heart, MapPin, Calendar } from 'lucide-react';

interface TimelineItem {
  id: number;
  date: string;
  title: string;
  description: string;
  image: string;
  location: string;
  details: string;
}

const timelineData: TimelineItem[] = [
  {
    id: 1,
    date: "January 15, 2023",
    title: "First Met",
    description: "The day you walked into my life and everything changed",
    image: "https://images.pexels.com/photos/1024993/pexels-photo-1024993.jpeg?auto=compress&cs=tinysrgb&w=800",
    location: "Coffee Shop Downtown",
    details: "I still remember how nervous I was when I first saw you. You were reading a book and looked so peaceful. When you smiled at me, I knew my life would never be the same."
  },
  {
    id: 2,
    date: "February 14, 2023",
    title: "First Valentine's Day",
    description: "Our first official date and the beginning of forever",
    image: "https://images.pexels.com/photos/1024870/pexels-photo-1024870.jpeg?auto=compress&cs=tinysrgb&w=800",
    location: "Italian Restaurant",
    details: "You wore that stunning red dress and I could barely string together a sentence. We talked for hours about everything and nothing. That's when I realized I was falling in love."
  },
  {
    id: 3,
    date: "June 20, 2023",
    title: "First Trip Together",
    description: "Our magical weekend getaway by the ocean",
    image: "https://images.pexels.com/photos/1024960/pexels-photo-1024960.jpeg?auto=compress&cs=tinysrgb&w=800",
    location: "Seaside Resort",
    details: "Watching the sunrise with you on the beach, I knew I wanted to share every sunrise and sunset for the rest of my life. You looked so beautiful with the ocean breeze in your hair."
  },
  {
    id: 4,
    date: "September 10, 2023",
    title: "Moving In Together",
    description: "When we decided to build our home together",
    image: "https://images.pexels.com/photos/1024980/pexels-photo-1024980.jpeg?auto=compress&cs=tinysrgb&w=800",
    location: "Our First Apartment",
    details: "Surrounded by boxes and chaos, but it felt like the most natural thing in the world. Coming home to you every day has been my greatest joy."
  }
];

export function Timeline() {
  const [selectedItem, setSelectedItem] = useState<TimelineItem | null>(null);

  return (
    <div className="relative">
      {/* Timeline line */}
      <div className="absolute left-8 md:left-1/2 top-0 bottom-0 w-0.5 bg-gradient-to-b from-rose-300 via-purple-300 to-gold-300 transform md:-translate-x-1/2" />

      <div className="space-y-12">
        {timelineData.map((item, index) => {
          const [ref, inView] = useInView({
            triggerOnce: true,
            threshold: 0.3,
          });

          const isEven = index % 2 === 0;

          return (
            <motion.div
              key={item.id}
              ref={ref}
              initial={{ opacity: 0, x: isEven ? -50 : 50 }}
              animate={inView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.8, delay: index * 0.2 }}
              className={`relative flex items-center ${
                isEven ? 'md:flex-row' : 'md:flex-row-reverse'
              }`}
            >
              {/* Timeline node */}
              <div className="absolute left-8 md:left-1/2 w-4 h-4 bg-rose-500 rounded-full border-4 border-white shadow-lg transform -translate-x-1/2 z-10">
                <motion.div
                  animate={{ scale: [1, 1.2, 1] }}
                  transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                  className="w-full h-full bg-rose-500 rounded-full"
                />
              </div>

              {/* Content */}
              <div className={`w-full md:w-5/12 ml-16 md:ml-0 ${!isEven ? 'md:mr-16' : ''}`}>
                <Card 
                  className="group cursor-pointer hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 bg-white/80 backdrop-blur-sm border-2 border-rose-100 hover:border-rose-300"
                  onClick={() => setSelectedItem(item)}
                >
                  <CardContent className="p-0">
                    <div className="relative overflow-hidden rounded-t-lg">
                      <img
                        src={item.image}
                        alt={item.title}
                        className="w-full h-48 object-cover transition-transform duration-300 group-hover:scale-110"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
                      <Badge className="absolute top-4 right-4 bg-rose-500 text-white">
                        <Calendar className="w-3 h-3 mr-1" />
                        {new Date(item.date).toLocaleDateString()}
                      </Badge>
                    </div>
                    
                    <div className="p-6">
                      <h3 className="font-handwriting text-2xl text-rose-600 mb-2">
                        {item.title}
                      </h3>
                      <p className="text-gray-700 mb-3">
                        {item.description}
                      </p>
                      <div className="flex items-center text-sm text-gray-500">
                        <MapPin className="w-4 h-4 mr-1" />
                        {item.location}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </motion.div>
          );
        })}
      </div>

      {/* Modal for detailed view */}
      {selectedItem && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4"
          onClick={() => setSelectedItem(null)}
        >
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="bg-white rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-auto"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="relative">
              <img
                src={selectedItem.image}
                alt={selectedItem.title}
                className="w-full h-64 object-cover rounded-t-2xl"
              />
              <button
                onClick={() => setSelectedItem(null)}
                className="absolute top-4 right-4 w-8 h-8 bg-white/90 rounded-full flex items-center justify-center text-gray-600 hover:bg-white transition-colors"
              >
                ×
              </button>
            </div>
            
            <div className="p-8">
              <div className="flex items-center gap-4 mb-6">
                <Heart className="w-6 h-6 text-rose-500" />
                <h2 className="font-handwriting text-3xl text-rose-600">
                  {selectedItem.title}
                </h2>
              </div>
              
              <div className="space-y-4">
                <div className="flex items-center text-gray-600">
                  <Calendar className="w-5 h-5 mr-2" />
                  {selectedItem.date}
                </div>
                
                <div className="flex items-center text-gray-600">
                  <MapPin className="w-5 h-5 mr-2" />
                  {selectedItem.location}
                </div>
                
                <p className="text-gray-800 leading-relaxed text-lg">
                  {selectedItem.details}
                </p>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </div>
  );
}
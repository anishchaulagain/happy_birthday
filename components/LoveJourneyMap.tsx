'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { X, MapPin, Calendar, Heart, Navigation, Maximize2 } from 'lucide-react';

interface MapLocation {
  id: number;
  name: string;
  coordinates: { x: number; y: number }; // Percentage-based positioning
  date: string;
  category: 'coffee' | 'walk' | 'temple' | 'lake' | 'adventure' | 'evening' | 'nature' | 'viewpoint' | 'festival';
  photo: string;
  memory: string;
  description: string;
  color: string;
}

const mapLocations: MapLocation[] = [
  {
    id: 1,
    name: "Bhaktapur Himalayan Java",
    coordinates: { x: 28, y: 45 },
    date: "March 5, 2024",
    category: "coffee",
    photo: "https://images.pexels.com/photos/302899/pexels-photo-302899.jpeg?auto=compress&cs=tinysrgb&w=600",
    memory: "Evening Coffee Date",
    description: "You ordered a caramel latte, I took a mocha, and we watched Bhaktapur slowly light up as the sun went down. ☕✨",
    color: "#f97316"
  },
  {
    id: 2,
    name: "Gundu",
    coordinates: { x: 50, y: 42 },
    date: "April 20, 2024",
    category: "walk",
    photo: "https://images.pexels.com/photos/210186/pexels-photo-210186.jpeg?auto=compress&cs=tinysrgb&w=600",
    memory: "Peaceful Walk Together",
    description: "A quiet walk through the fields of Gundu. Just us, the breeze, and the sound of rustling leaves. 🌾💫",
    color: "#22c55e"
  },
  {
    id: 3,
    name: "Pilot Baba",
    coordinates: { x: 60, y: 38 },
    date: "May 12, 2024",
    category: "temple",
    photo: "https://images.pexels.com/photos/161931/temple-asia-nepal-161931.jpeg?auto=compress&cs=tinysrgb&w=600",
    memory: "Temple Visit",
    description: "You laughed when I struggled to climb the stairs. The view from the top was worth every step — so were you. 🏞️❤️",
    color: "#3b82f6"
  },
  {
    id: 4,
    name: "Siddhapokhari",
    coordinates: { x: 42, y: 55 },
    date: "June 30, 2024",
    category: "lake",
    photo: "https://images.pexels.com/photos/417173/pexels-photo-417173.jpeg?auto=compress&cs=tinysrgb&w=600",
    memory: "Evening by the Water",
    description: "We sat by the edge, talking about everything and nothing. The reflection on the water looked calmer than my heart. 💧💙",
    color: "#06b6d4"
  },
  {
    id: 5,
    name: "Buchacho Gadi",
    coordinates: { x: 68, y: 50 },
    date: "July 15, 2024",
    category: "adventure",
    photo: "https://images.pexels.com/photos/2166553/pexels-photo-2166553.jpeg?auto=compress&cs=tinysrgb&w=600",
    memory: "Mini Adventure",
    description: "We climbed the old walls pretending to be explorers. You said it felt like a fairytale, and I silently agreed. 🏰💞",
    color: "#a855f7"
  },
  {
    id: 6,
    name: "Kritipur Pul",
    coordinates: { x: 34, y: 62 },
    date: "August 21, 2024",
    category: "evening",
    photo: "https://images.pexels.com/photos/239520/pexels-photo-239520.jpeg?auto=compress&cs=tinysrgb&w=600",
    memory: "Rainy Evening",
    description: "We stood under the bridge, sharing an umbrella and a secret or two. The city lights blurred with the rain. 🌧️💜",
    color: "#9333ea"
  },
  {
    id: 7,
    name: "Nala",
    coordinates: { x: 25, y: 68 },
    date: "September 2, 2024",
    category: "temple",
    photo: "https://images.pexels.com/photos/2082109/pexels-photo-2082109.jpeg?auto=compress&cs=tinysrgb&w=600",
    memory: "Short Trip",
    description: "The temple bells, the sound of laughter, and your favorite snacks — simple joys, perfect day. 🔔😊",
    color: "#eab308"
  },
  {
    id: 8,
    name: "Manjushree Park",
    coordinates: { x: 55, y: 65 },
    date: "October 10, 2024",
    category: "nature",
    photo: "https://images.pexels.com/photos/325044/pexels-photo-325044.jpeg?auto=compress&cs=tinysrgb&w=600",
    memory: "Cave Adventure",
    description: "You screamed when a bat flew past us — then laughed like it was the funniest thing ever. I couldn’t stop smiling. 🦇😂",
    color: "#10b981"
  },
  {
    id: 9,
    name: "Nagarkot Bridge",
    coordinates: { x: 65, y: 70 },
    date: "November 14, 2024",
    category: "viewpoint",
    photo: "https://images.pexels.com/photos/3408744/pexels-photo-3408744.jpeg?auto=compress&cs=tinysrgb&w=600",
    memory: "Sunrise Together",
    description: "We waited in the cold for the first light — and it was worth it. The world turned golden, just like your smile. 🌄💛",
    color: "#f59e0b"
  },
  {
    id: 10,
    name: "Nilbarahi Mandir",
    coordinates: { x: 40, y: 75 },
    date: "December 22, 2024",
    category: "festival",
    photo: "https://images.pexels.com/photos/208739/pexels-photo-208739.jpeg?auto=compress&cs=tinysrgb&w=600",
    memory: "Cultural Visit",
    description: "The temple was full of life and music. You danced a little, and I swear everyone else disappeared for a moment. 🎶💃",
    color: "#ef4444"
  }
];

const categoryIcons = {
  coffee: '☕',
  walk: '🚶‍♀️',
  temple: '🛕',
  lake: '💧',
  adventure: '🏰',
  evening: '🌆',
  nature: '🌿',
  viewpoint: '🌄',
  festival: '🎉'
};

const categoryLabels = {
  coffee: 'Coffee Date',
  walk: 'Evening Walk',
  temple: 'Temple Visit',
  lake: 'Lakeside Moment',
  adventure: 'Adventure Day',
  evening: 'Rainy Evening',
  nature: 'Nature Trip',
  viewpoint: 'Viewpoint',
  festival: 'Festival Visit'
};

export function LoveJourneyMap() {
  const [selectedLocation, setSelectedLocation] = useState<MapLocation | null>(null);
  const [activePin, setActivePin] = useState<number | null>(null);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [animatingTo, setAnimatingTo] = useState<number | null>(null);

  const handlePinClick = (location: MapLocation) => {
    setAnimatingTo(location.id);
    setTimeout(() => {
      setSelectedLocation(location);
      setActivePin(location.id);
      setAnimatingTo(null);
    }, 300);
  };

  const closeModal = () => {
    setSelectedLocation(null);
    setActivePin(null);
  };

  const navigateToNext = () => {
    if (!selectedLocation) return;
    const currentIndex = mapLocations.findIndex(loc => loc.id === selectedLocation.id);
    const nextIndex = (currentIndex + 1) % mapLocations.length;
    const nextLocation = mapLocations[nextIndex];

    setAnimatingTo(nextLocation.id);
    setTimeout(() => {
      setSelectedLocation(nextLocation);
      setActivePin(nextLocation.id);
      setAnimatingTo(null);
    }, 300);
  };

  const navigateToPrev = () => {
    if (!selectedLocation) return;
    const currentIndex = mapLocations.findIndex(loc => loc.id === selectedLocation.id);
    const prevIndex = (currentIndex - 1 + mapLocations.length) % mapLocations.length;
    const prevLocation = mapLocations[prevIndex];

    setAnimatingTo(prevLocation.id);
    setTimeout(() => {
      setSelectedLocation(prevLocation);
      setActivePin(prevLocation.id);
      setAnimatingTo(null);
    }, 300);
  };

  return (
    <div className="space-y-8">
      {/* Map Header */}
      <div className="text-center space-y-4">
        <h2 className="font-handwriting text-3xl text-rose-600">
          Our Love Journey Map 🗺️
        </h2>
        <p className="text-gray-600 max-w-2xl mx-auto">
          Every pin marks a special place in our story. Click on any location to relive
          those beautiful memories we've created together.
        </p>
      </div>

      {/* Legend */}
      <div className="flex flex-wrap justify-center gap-3 mb-6">
        {Object.entries(categoryLabels).map(([key, label]) => (
          <Badge key={key} variant="outline" className="flex items-center gap-1">
            <span>{categoryIcons[key as keyof typeof categoryIcons]}</span>
            {label}
          </Badge>
        ))}
      </div>

      {/* Interactive Map */}
      <Card className={`relative  overflow-hidden bg-gradient-to-br from-blue-50 to-green-50 border-2 border-rose-100 shadow-xl transition-all duration-300 ${isFullscreen ? 'fixed inset-4 z-50' : 'aspect-[4/3] max-w-4xl mx-auto'
        }`}>
        <CardContent className="p-0 h-full relative">
          {/* Map Background */}
          <div className="absolute inset-0 bg-gradient-to-br from-blue-100 via-green-50 to-yellow-50">
            {/* Decorative map elements */}
            <div className="absolute inset-0 opacity-20">
              {/* Rivers/paths */}
              <svg className="w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none">
                <path
                  d="M10,80 Q30,60 50,70 T90,50"
                  stroke="#06b6d4"
                  strokeWidth="0.5"
                  fill="none"
                  opacity="0.6"
                />
                <path
                  d="M20,20 Q40,40 60,30 T85,45"
                  stroke="#10b981"
                  strokeWidth="0.3"
                  fill="none"
                  opacity="0.4"
                />
              </svg>
            </div>
          </div>

          {/* Fullscreen Toggle */}
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setIsFullscreen(!isFullscreen)}
            className="absolute top-4 right-4 z-10 bg-white/80 backdrop-blur-sm hover:bg-white/90"
          >
            <Maximize2 className="w-4 h-4" />
          </Button>

          {/* Map Pins */}
          {mapLocations.map((location, index) => (
            <motion.button
              key={location.id}
              className="absolute transform -translate-x-1/2 -translate-y-1/2 z-20"
              style={{
                left: `${location.coordinates.x}%`,
                top: `${location.coordinates.y}%`,
              }}
              onClick={() => handlePinClick(location)}
              initial={{ scale: 0, opacity: 0 }}
              animate={{
                scale: activePin === location.id ? 1.3 : 1,
                opacity: 1,
                y: animatingTo === location.id ? -10 : 0
              }}
              transition={{
                delay: index * 0.1,
                duration: 0.3,
                type: "spring",
                stiffness: 200
              }}
              whileHover={{ scale: 1.2, y: -5 }}
              whileTap={{ scale: 0.9 }}
            >
              <div className="relative">
                {/* Pin Shadow */}
                <div
                  className="absolute top-8 left-1/2 transform -translate-x-1/2 w-4 h-2 rounded-full opacity-30 blur-sm"
                  style={{ backgroundColor: location.color }}
                />

                {/* Pin */}
                <div
                  className="w-8 h-8 rounded-full border-3 border-white shadow-lg flex items-center justify-center text-white text-sm font-bold relative"
                  style={{ backgroundColor: location.color }}
                >
                  {categoryIcons[location.category]}

                  {/* Pulse animation for active pin */}
                  {activePin === location.id && (
                    <motion.div
                      className="absolute inset-0 rounded-full border-2"
                      style={{ borderColor: location.color }}
                      animate={{ scale: [1, 1.5, 1], opacity: [1, 0, 1] }}
                      transition={{ duration: 2, repeat: Infinity }}
                    />
                  )}
                </div>

                {/* Pin Pointer */}
                <div
                  className="absolute top-6 left-1/2 transform -translate-x-1/2 w-0 h-0 border-l-2 border-r-2 border-t-4 border-l-transparent border-r-transparent"
                  style={{ borderTopColor: location.color }}
                />

                {/* Location Label */}
                <div className="absolute top-10 left-1/2 transform -translate-x-1/2 whitespace-nowrap">
                  <div className="bg-white/90 backdrop-blur-sm px-2 py-1 rounded-md shadow-sm text-xs font-medium text-gray-700 border">
                    {location.name}
                  </div>
                </div>
              </div>
            </motion.button>
          ))}

          {/* Connection Lines */}
          <svg className="absolute inset-0 w-full h-full pointer-events-none z-10">
            {mapLocations.map((location, index) => {
              if (index === mapLocations.length - 1) return null;
              const nextLocation = mapLocations[index + 1];

              return (
                <motion.line
                  key={`line-${location.id}`}
                  x1={`${location.coordinates.x}%`}
                  y1={`${location.coordinates.y}%`}
                  x2={`${nextLocation.coordinates.x}%`}
                  y2={`${nextLocation.coordinates.y}%`}
                  stroke="#f43f5e"
                  strokeWidth="2"
                  strokeDasharray="5,5"
                  opacity="0.4"
                  initial={{ pathLength: 0 }}
                  animate={{ pathLength: 1 }}
                  transition={{ delay: (index + 1) * 0.2, duration: 0.8 }}
                />
              );
            })}
          </svg>
        </CardContent>
      </Card>

      {/* Location Details Modal */}
      <AnimatePresence>
        {selectedLocation && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4"
            onClick={closeModal}
          >
            <motion.div
              initial={{ scale: 0.8, opacity: 0, y: 50 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.8, opacity: 0, y: 50 }}
              className="bg-white rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-auto shadow-2xl"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="relative">
                {/* Header Image */}
                <div className="relative h-64 overflow-hidden rounded-t-2xl">
                  <img
                    src={selectedLocation.photo}
                    alt={selectedLocation.memory}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />

                  {/* Close Button */}
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={closeModal}
                    className="absolute top-4 right-4 text-white hover:bg-white/20 rounded-full"
                  >
                    <X className="w-5 h-5" />
                  </Button>

                  {/* Category Badge */}
                  <Badge
                    className="absolute top-4 left-4 text-white border-white/30"
                    style={{ backgroundColor: selectedLocation.color }}
                  >
                    <span className="mr-1">{categoryIcons[selectedLocation.category]}</span>
                    {categoryLabels[selectedLocation.category]}
                  </Badge>
                </div>

                {/* Content */}
                <div className="p-8">
                  <div className="space-y-6">
                    {/* Title and Date */}
                    <div className="space-y-2">
                      <h2 className="font-handwriting text-3xl text-rose-600">
                        {selectedLocation.memory}
                      </h2>
                      <div className="flex items-center gap-4 text-gray-600">
                        <div className="flex items-center gap-1">
                          <Calendar className="w-4 h-4" />
                          {selectedLocation.date}
                        </div>
                        <div className="flex items-center gap-1">
                          <MapPin className="w-4 h-4" />
                          {selectedLocation.name}
                        </div>
                      </div>
                    </div>

                    {/* Description */}
                    <p className="text-gray-700 leading-relaxed text-lg">
                      {selectedLocation.description}
                    </p>

                    {/* Navigation */}
                    <div className="flex items-center justify-between pt-4 border-t border-gray-100">
                      <Button
                        variant="outline"
                        onClick={navigateToPrev}
                        className="flex items-center gap-2"
                      >
                        <Navigation className="w-4 h-4 rotate-180" />
                        Previous
                      </Button>

                      <div className="flex items-center gap-1">
                        <Heart className="w-4 h-4 text-rose-500" />
                        <span className="text-sm text-gray-500">
                          {mapLocations.findIndex(loc => loc.id === selectedLocation.id) + 1} of {mapLocations.length}
                        </span>
                      </div>

                      <Button
                        variant="outline"
                        onClick={navigateToNext}
                        className="flex items-center gap-2"
                      >
                        Next
                        <Navigation className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
              
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
'use client';

import { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { Button } from '@/components/ui/button';
import { X, ChevronLeft, ChevronRight, Heart, Download } from 'lucide-react';

interface Photo {
  id: number;
  src: string;
  alt: string;
  caption: string;
  date: string;
  location: string;
  width: number;
  height: number;
}

const photos: Photo[] = [
  {
    id: 1,
    src: "https://images.pexels.com/photos/1024993/pexels-photo-1024993.jpeg?auto=compress&cs=tinysrgb&w=800",
    alt: "Beautiful sunset moment",
    caption: "That perfect sunset on our first trip together",
    date: "June 2023",
    location: "Beach Resort",
    width: 800,
    height: 600,
  },
  {
    id: 2,
    src: "https://images.pexels.com/photos/1024870/pexels-photo-1024870.jpeg?auto=compress&cs=tinysrgb&w=600",
    alt: "Romantic dinner",
    caption: "Our anniversary dinner - you looked absolutely stunning",
    date: "February 2024",
    location: "Downtown Restaurant",
    width: 600,
    height: 800,
  },
  {
    id: 3,
    src: "https://images.pexels.com/photos/1024960/pexels-photo-1024960.jpeg?auto=compress&cs=tinysrgb&w=700",
    alt: "Adventure together",
    caption: "Exploring new places with my favorite person",
    date: "August 2023",
    location: "Mountain Trail",
    width: 700,
    height: 500,
  },
  {
    id: 4,
    src: "https://images.pexels.com/photos/1024980/pexels-photo-1024980.jpeg?auto=compress&cs=tinysrgb&w=600",
    alt: "Cozy moments",
    caption: "Lazy Sunday mornings are the best with you",
    date: "October 2023",
    location: "Our Home",
    width: 600,
    height: 900,
  },
  {
    id: 5,
    src: "https://images.pexels.com/photos/1157255/pexels-photo-1157255.jpeg?auto=compress&cs=tinysrgb&w=800",
    alt: "Celebration time",
    caption: "Celebrating your achievements - so proud of you!",
    date: "December 2023",
    location: "City Center",
    width: 800,
    height: 600,
  },
  {
    id: 6,
    src: "https://images.pexels.com/photos/1024876/pexels-photo-1024876.jpeg?auto=compress&cs=tinysrgb&w=500",
    alt: "Sweet moments",
    caption: "Your smile lights up my entire world",
    date: "March 2024",
    location: "Park",
    width: 500,
    height: 700,
  },
];

export function PhotoGallery() {
  const [selectedPhoto, setSelectedPhoto] = useState<Photo | null>(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [likedPhotos, setLikedPhotos] = useState<Set<number>>(new Set());
  const [loadedImages, setLoadedImages] = useState<Set<number>>(new Set());

  const handleImageLoad = (photoId: number) => {
    setLoadedImages((prev:any) => new Set([...prev, photoId]));
  };

  const openLightbox = (photo: Photo) => {
    setSelectedPhoto(photo);
    setCurrentIndex(photos.findIndex(p => p.id === photo.id));
  };

  const closeLightbox = () => {
    setSelectedPhoto(null);
  };

  const nextPhoto = useCallback(() => {
    const nextIndex = (currentIndex + 1) % photos.length;
    setCurrentIndex(nextIndex);
    setSelectedPhoto(photos[nextIndex]);
  }, [currentIndex]);

  const prevPhoto = useCallback(() => {
    const prevIndex = (currentIndex - 1 + photos.length) % photos.length;
    setCurrentIndex(prevIndex);
    setSelectedPhoto(photos[prevIndex]);
  }, [currentIndex]);

  const toggleLike = (photoId: number) => {
    setLikedPhotos(prev => {
      const newLiked = new Set(prev);
      if (newLiked.has(photoId)) {
        newLiked.delete(photoId);
      } else {
        newLiked.add(photoId);
      }
      return newLiked;
    });
  };

  // Keyboard navigation
  useEffect(() => {
    const handleKeyPress = (e: KeyboardEvent) => {
      if (!selectedPhoto) return;
      
      switch (e.key) {
        case 'Escape':
          closeLightbox();
          break;
        case 'ArrowLeft':
          prevPhoto();
          break;
        case 'ArrowRight':
          nextPhoto();
          break;
      }
    };

    window.addEventListener('keydown', handleKeyPress);
    return () => window.removeEventListener('keydown', handleKeyPress);
  }, [selectedPhoto, nextPhoto, prevPhoto]);

  // Touch/swipe support
  const [touchStart, setTouchStart] = useState<number | null>(null);
  const [touchEnd, setTouchEnd] = useState<number | null>(null);

  const minSwipeDistance = 50;

  const onTouchStart = (e: React.TouchEvent) => {
    setTouchEnd(null);
    setTouchStart(e.targetTouches[0].clientX);
  };

  const onTouchMove = (e: React.TouchEvent) => {
    setTouchEnd(e.targetTouches[0].clientX);
  };

  const onTouchEnd = () => {
    if (!touchStart || !touchEnd) return;
    
    const distance = touchStart - touchEnd;
    const isLeftSwipe = distance > minSwipeDistance;
    const isRightSwipe = distance < -minSwipeDistance;

    if (isLeftSwipe) {
      nextPhoto();
    } else if (isRightSwipe) {
      prevPhoto();
    }
  };

  return (
    <div className="space-y-8">
      {/* Masonry Grid */}
      <div className="columns-1 md:columns-2 lg:columns-3 xl:columns-4 gap-4 space-y-4">
        {photos.map((photo, index) => {
          const [ref, inView] = useInView({
            triggerOnce: true,
            threshold: 0.1,
          });

          return (
            <motion.div
              key={photo.id}
              ref={ref}
              initial={{ opacity: 0, y: 50 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="break-inside-avoid mb-4"
            >
              <div className="group relative bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2">
                <div className="relative overflow-hidden">
                  {!loadedImages.has(photo.id) && (
                    <div className="absolute inset-0 bg-gray-200 animate-pulse" />
                  )}
                  <img
                    src={photo.src}
                    alt={photo.alt}
                    className={`w-full h-auto cursor-pointer transition-transform duration-300 group-hover:scale-105 ${
                      loadedImages.has(photo.id) ? 'opacity-100' : 'opacity-0'
                    }`}
                    onClick={() => openLightbox(photo)}
                    onLoad={() => handleImageLoad(photo.id)}
                    loading="lazy"
                  />
                  
                  {/* Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <div className="absolute bottom-4 left-4 right-4">
                      <p className="text-white text-sm font-medium mb-1">
                        {photo.caption}
                      </p>
                      <p className="text-white/80 text-xs">
                        {photo.date} • {photo.location}
                      </p>
                    </div>
                  </div>

                  {/* Like button */}
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={(e) => {
                      e.stopPropagation();
                      toggleLike(photo.id);
                    }}
                    className="absolute top-4 right-4 w-10 h-10 rounded-full bg-white/90 hover:bg-white opacity-0 group-hover:opacity-100 transition-all duration-300"
                  >
                    <Heart 
                      className={`w-5 h-5 transition-colors ${
                        likedPhotos.has(photo.id) 
                          ? 'text-rose-500 fill-current' 
                          : 'text-gray-600'
                      }`} 
                    />
                  </Button>
                </div>
              </div>
            </motion.div>
          );
        })}
      </div>

      {/* Lightbox */}
      <AnimatePresence>
        {selectedPhoto && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/90 backdrop-blur-sm z-50 flex items-center justify-center p-4"
            onClick={closeLightbox}
            onTouchStart={onTouchStart}
            onTouchMove={onTouchMove}
            onTouchEnd={onTouchEnd}
          >
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              className="relative max-w-4xl max-h-[90vh] w-full"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Close button */}
              <Button
                variant="ghost"
                size="sm"
                onClick={closeLightbox}
                className="absolute -top-12 right-0 text-white hover:bg-white/20 z-10"
              >
                <X className="w-6 h-6" />
              </Button>

              {/* Navigation buttons */}
              <Button
                variant="ghost"
                size="sm"
                onClick={prevPhoto}
                className="absolute left-4 top-1/2 transform -translate-y-1/2 text-white hover:bg-white/20 z-10"
              >
                <ChevronLeft className="w-8 h-8" />
              </Button>

              <Button
                variant="ghost"
                size="sm"
                onClick={nextPhoto}
                className="absolute right-4 top-1/2 transform -translate-y-1/2 text-white hover:bg-white/20 z-10"
              >
                <ChevronRight className="w-8 h-8" />
              </Button>

              {/* Image */}
              <div className="relative">
                <img
                  src={selectedPhoto.src}
                  alt={selectedPhoto.alt}
                  className="w-full h-auto max-h-[70vh] object-contain rounded-lg"
                />
                
                {/* Caption */}
                <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-6 rounded-b-lg">
                  <h3 className="text-white text-lg font-medium mb-2">
                    {selectedPhoto.caption}
                  </h3>
                  <div className="flex items-center justify-between text-white/80 text-sm">
                    <span>{selectedPhoto.date} • {selectedPhoto.location}</span>
                    <div className="flex items-center gap-4">
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => toggleLike(selectedPhoto.id)}
                        className="text-white hover:bg-white/20"
                      >
                        <Heart 
                          className={`w-5 h-5 mr-1 ${
                            likedPhotos.has(selectedPhoto.id) 
                              ? 'text-rose-400 fill-current' 
                              : 'text-white'
                          }`} 
                        />
                        {likedPhotos.has(selectedPhoto.id) ? 'Loved' : 'Love'}
                      </Button>
                    </div>
                  </div>
                </div>
              </div>

              {/* Image counter */}
              <div className="absolute -bottom-12 left-1/2 transform -translate-x-1/2 text-white text-sm">
                {currentIndex + 1} of {photos.length}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
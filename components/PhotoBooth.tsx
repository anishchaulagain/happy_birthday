import React, { useState, useRef, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Camera, Download, Share2, RotateCcw, Heart, Sparkles, X, MessageCircle } from 'lucide-react';

interface Filter {
  id: string;
  name: string;
  icon: React.ReactNode;
  overlays: Array<{
    type: 'heart' | 'balloon' | 'sparkle' | 'text' | 'frame';
    content?: string;
    position: { x: number; y: number };
    size: number;
    color: string;
    rotation?: number;
  }>;
}

const filters: Filter[] = [
  {
    id: 'hearts',
    name: 'Love Hearts',
    icon: <Heart className="w-4 h-4" />,
    overlays: [
      { type: 'heart', position: { x: 15, y: 20 }, size: 30, color: '#f43f5e', rotation: -15 },
      { type: 'heart', position: { x: 75, y: 15 }, size: 25, color: '#ec4899', rotation: 20 },
      { type: 'heart', position: { x: 85, y: 70 }, size: 35, color: '#f43f5e', rotation: -10 },
      { type: 'heart', position: { x: 10, y: 75 }, size: 28, color: '#be185d' },
      { type: 'text', content: 'Happy Birthday Beautiful! 💕', position: { x: 50, y: 90 }, size: 16, color: '#f43f5e' }
    ]
  },
  {
    id: 'balloons',
    name: 'Party Balloons',
    icon: <div className="w-4 h-4 rounded-full bg-rose-400" />,
    overlays: [
      { type: 'balloon', position: { x: 20, y: 10 }, size: 40, color: '#f43f5e' },
      { type: 'balloon', position: { x: 40, y: 5 }, size: 35, color: '#8b5cf6' },
      { type: 'balloon', position: { x: 60, y: 8 }, size: 38, color: '#f59e0b' },
      { type: 'balloon', position: { x: 80, y: 12 }, size: 33, color: '#ec4899' },
      { type: 'text', content: 'Birthday Girl! 🎂', position: { x: 50, y: 85 }, size: 18, color: '#8b5cf6' }
    ]
  },
  {
    id: 'sparkles',
    name: 'Magic Sparkles',
    icon: <Sparkles className="w-4 h-4" />,
    overlays: [
      { type: 'sparkle', position: { x: 25, y: 25 }, size: 20, color: '#f59e0b', rotation: 45 },
      { type: 'sparkle', position: { x: 70, y: 20 }, size: 25, color: '#f43f5e', rotation: -30 },
      { type: 'sparkle', position: { x: 15, y: 60 }, size: 18, color: '#8b5cf6', rotation: 60 },
      { type: 'sparkle', position: { x: 80, y: 65 }, size: 22, color: '#06b6d4', rotation: -45 },
      { type: 'sparkle', position: { x: 50, y: 40 }, size: 15, color: '#10b981', rotation: 90 },
      { type: 'text', content: 'You\'re Magical! ✨', position: { x: 50, y: 90 }, size: 16, color: '#f59e0b' }
    ]
  },
  {
    id: 'frame',
    name: 'Love Frame',
    icon: <div className="w-4 h-4 border-2 border-rose-400 rounded" />,
    overlays: [
      { type: 'frame', position: { x: 50, y: 50 }, size: 90, color: '#f43f5e' },
      { type: 'heart', position: { x: 50, y: 15 }, size: 25, color: '#f43f5e' },
      { type: 'text', content: 'My Beautiful Birthday Girl', position: { x: 50, y: 92 }, size: 14, color: '#f43f5e' }
    ]
  },
  {
    id: 'cake',
    name: 'Birthday Cake',
    icon: <div className="w-4 h-4">🎂</div>,
    overlays: [
      { type: 'text', content: '🎂', position: { x: 50, y: 15 }, size: 50, color: '#f43f5e' },
      { type: 'sparkle', position: { x: 30, y: 10 }, size: 20, color: '#f59e0b', rotation: 45 },
      { type: 'sparkle', position: { x: 70, y: 10 }, size: 20, color: '#f59e0b', rotation: -45 },
      { type: 'text', content: 'Make a Wish! 🎉', position: { x: 50, y: 88 }, size: 18, color: '#ec4899' }
    ]
  },
  {
    id: 'crown',
    name: 'Birthday Queen',
    icon: <div className="w-4 h-4">👑</div>,
    overlays: [
      { type: 'text', content: '👑', position: { x: 50, y: 12 }, size: 45, color: '#f59e0b' },
      { type: 'sparkle', position: { x: 25, y: 10 }, size: 18, color: '#f59e0b', rotation: 30 },
      { type: 'sparkle', position: { x: 75, y: 10 }, size: 18, color: '#f59e0b', rotation: -30 },
      { type: 'text', content: 'Birthday Queen 👸', position: { x: 50, y: 90 }, size: 17, color: '#f59e0b' }
    ]
  },
  {
    id: 'confetti',
    name: 'Confetti Party',
    icon: <div className="w-4 h-4">🎊</div>,
    overlays: [
      { type: 'text', content: '🎊', position: { x: 15, y: 15 }, size: 30, color: '#ec4899', rotation: -20 },
      { type: 'text', content: '🎉', position: { x: 85, y: 20 }, size: 35, color: '#8b5cf6', rotation: 20 },
      { type: 'text', content: '🎈', position: { x: 10, y: 70 }, size: 28, color: '#f43f5e', rotation: -15 },
      { type: 'text', content: '🎁', position: { x: 88, y: 75 }, size: 32, color: '#06b6d4', rotation: 15 },
      { type: 'sparkle', position: { x: 30, y: 40 }, size: 15, color: '#f59e0b', rotation: 45 },
      { type: 'sparkle', position: { x: 70, y: 45 }, size: 15, color: '#ec4899', rotation: -45 },
      { type: 'text', content: 'Party Time! 🥳', position: { x: 50, y: 88 }, size: 16, color: '#8b5cf6' }
    ]
  },
  {
    id: 'princess',
    name: 'Princess Vibes',
    icon: <div className="w-4 h-4">💖</div>,
    overlays: [
      { type: 'text', content: '👑', position: { x: 50, y: 10 }, size: 40, color: '#f59e0b' },
      { type: 'heart', position: { x: 20, y: 25 }, size: 25, color: '#ec4899', rotation: -20 },
      { type: 'heart', position: { x: 80, y: 25 }, size: 25, color: '#ec4899', rotation: 20 },
      { type: 'sparkle', position: { x: 15, y: 50 }, size: 18, color: '#f59e0b', rotation: 30 },
      { type: 'sparkle', position: { x: 85, y: 50 }, size: 18, color: '#f59e0b', rotation: -30 },
      { type: 'text', content: '✨ Birthday Princess ✨', position: { x: 50, y: 90 }, size: 16, color: '#ec4899' }
    ]
  }
];

export default function PhotoBooth() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [isActive, setIsActive] = useState(false);
  const [selectedFilter, setSelectedFilter] = useState<Filter>(filters[0]);
  const [capturedPhoto, setCapturedPhoto] = useState<string | null>(null);
  const [isCapturing, setIsCapturing] = useState(false);
  const [facingMode, setFacingMode] = useState<'user' | 'environment'>('user');
  const [error, setError] = useState<string | null>(null);
  const [beautifyMode, setBeautifyMode] = useState(true);

  const startCamera = useCallback(async () => {
    try {
      setError(null);
      const stream = await navigator.mediaDevices.getUserMedia({
        video: { 
          facingMode,
          width: { ideal: 640 },
          height: { ideal: 480 }
        },
        audio: false
      });
      
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
        setIsActive(true);
      }
    } catch (err) {
      console.error('Error accessing camera:', err);
      setError('Unable to access camera. Please check permissions.');
    }
  }, [facingMode]);

  const stopCamera = useCallback(() => {
    if (videoRef.current?.srcObject) {
      const stream = videoRef.current.srcObject as MediaStream;
      stream.getTracks().forEach(track => track.stop());
      videoRef.current.srcObject = null;
    }
    setIsActive(false);
  }, []);

  const applyBeautifyFilter = (ctx: CanvasRenderingContext2D, width: number, height: number) => {
    // Get image data
    const imageData = ctx.getImageData(0, 0, width, height);
    const data = imageData.data;

    // Apply skin smoothing effect
    const tempCanvas = document.createElement('canvas');
    tempCanvas.width = width;
    tempCanvas.height = height;
    const tempCtx = tempCanvas.getContext('2d');
    if (!tempCtx) return;

    tempCtx.putImageData(imageData, 0, 0);

    // Apply slight blur for smoothing
    ctx.filter = 'blur(1.5px) brightness(1.05) contrast(0.95)';
    ctx.drawImage(tempCanvas, 0, 0);
    ctx.filter = 'none';

    // Brighten and enhance
    const enhancedData = ctx.getImageData(0, 0, width, height);
    const enhanced = enhancedData.data;

    for (let i = 0; i < enhanced.length; i += 4) {
      // Slight warmth and brightness
      enhanced[i] = Math.min(255, enhanced[i] * 1.03); // Red
      enhanced[i + 1] = Math.min(255, enhanced[i + 1] * 1.01); // Green
      enhanced[i + 2] = Math.min(255, enhanced[i + 2] * 0.98); // Blue (slightly reduce blue for warmth)
    }

    ctx.putImageData(enhancedData, 0, 0);
  };

  const capturePhoto = useCallback(() => {
    if (!videoRef.current || !canvasRef.current) return;

    setIsCapturing(true);
    const video = videoRef.current;
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');

    if (!ctx) return;

    // Set canvas size to match video
    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;

    // Draw video frame
    ctx.drawImage(video, 0, 0);

    // Apply beautify filter if enabled
    if (beautifyMode) {
      applyBeautifyFilter(ctx, canvas.width, canvas.height);
    }

    // Apply selected filter overlays
    selectedFilter.overlays.forEach(overlay => {
      const x = (overlay.position.x / 100) * canvas.width;
      const y = (overlay.position.y / 100) * canvas.height;
      const size = (overlay.size / 100) * Math.min(canvas.width, canvas.height);

      ctx.save();
      ctx.translate(x, y);
      if (overlay.rotation) {
        ctx.rotate((overlay.rotation * Math.PI) / 180);
      }

      switch (overlay.type) {
        case 'heart':
          drawHeart(ctx, 0, 0, size, overlay.color);
          break;
        case 'balloon':
          drawBalloon(ctx, 0, 0, size, overlay.color);
          break;
        case 'sparkle':
          drawSparkle(ctx, 0, 0, size, overlay.color);
          break;
        case 'text':
          drawText(ctx, overlay.content || '', 0, 0, size, overlay.color);
          break;
        case 'frame':
          drawFrame(ctx, 0, 0, size, overlay.color, canvas.width, canvas.height);
          break;
      }
      ctx.restore();
    });

    // Convert to data URL
    const photoData = canvas.toDataURL('image/png');
    setCapturedPhoto(photoData);
    setIsCapturing(false);
  }, [selectedFilter, beautifyMode]);

  const drawHeart = (ctx: CanvasRenderingContext2D, x: number, y: number, size: number, color: string) => {
    ctx.fillStyle = color;
    ctx.beginPath();
    const topCurveHeight = size * 0.3;
    ctx.moveTo(x, y + topCurveHeight);
    ctx.bezierCurveTo(x, y, x - size / 2, y, x - size / 2, y + topCurveHeight);
    ctx.bezierCurveTo(x - size / 2, y + (size + topCurveHeight) / 2, x, y + (size + topCurveHeight) / 2, x, y + size);
    ctx.bezierCurveTo(x, y + (size + topCurveHeight) / 2, x + size / 2, y + (size + topCurveHeight) / 2, x + size / 2, y + topCurveHeight);
    ctx.bezierCurveTo(x + size / 2, y, x, y, x, y + topCurveHeight);
    ctx.fill();
  };

  const drawBalloon = (ctx: CanvasRenderingContext2D, x: number, y: number, size: number, color: string) => {
    // Balloon body
    ctx.fillStyle = color;
    ctx.beginPath();
    ctx.ellipse(x, y, size * 0.4, size * 0.5, 0, 0, Math.PI * 2);
    ctx.fill();
    
    // Balloon string
    ctx.strokeStyle = color;
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.moveTo(x, y + size * 0.5);
    ctx.lineTo(x, y + size);
    ctx.stroke();
    
    // Highlight
    ctx.fillStyle = 'rgba(255, 255, 255, 0.3)';
    ctx.beginPath();
    ctx.ellipse(x - size * 0.15, y - size * 0.15, size * 0.1, size * 0.15, 0, 0, Math.PI * 2);
    ctx.fill();
  };

  const drawSparkle = (ctx: CanvasRenderingContext2D, x: number, y: number, size: number, color: string) => {
    ctx.fillStyle = color;
    ctx.strokeStyle = color;
    ctx.lineWidth = 3;
    
    // Draw sparkle as a star
    ctx.beginPath();
    ctx.moveTo(x, y - size / 2);
    ctx.lineTo(x, y + size / 2);
    ctx.moveTo(x - size / 2, y);
    ctx.lineTo(x + size / 2, y);
    ctx.moveTo(x - size / 3, y - size / 3);
    ctx.lineTo(x + size / 3, y + size / 3);
    ctx.moveTo(x + size / 3, y - size / 3);
    ctx.lineTo(x - size / 3, y + size / 3);
    ctx.stroke();
  };

  const drawText = (ctx: CanvasRenderingContext2D, text: string, x: number, y: number, size: number, color: string) => {
    ctx.fillStyle = color;
    ctx.font = `bold ${size}px Arial, sans-serif`;
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    
    // Add text shadow
    ctx.shadowColor = 'rgba(0, 0, 0, 0.3)';
    ctx.shadowBlur = 4;
    ctx.shadowOffsetX = 2;
    ctx.shadowOffsetY = 2;
    
    ctx.fillText(text, x, y);
    
    // Reset shadow
    ctx.shadowColor = 'transparent';
    ctx.shadowBlur = 0;
    ctx.shadowOffsetX = 0;
    ctx.shadowOffsetY = 0;
  };

  const drawFrame = (ctx: CanvasRenderingContext2D, x: number, y: number, size: number, color: string, canvasWidth: number, canvasHeight: number) => {
    const frameWidth = (size / 100) * canvasWidth;
    const frameHeight = (size / 100) * canvasHeight;
    const thickness = 20;
    
    ctx.strokeStyle = color;
    ctx.lineWidth = thickness;
    ctx.setLineDash([]);
    
    // Draw decorative frame
    const frameX = (canvasWidth - frameWidth) / 2;
    const frameY = (canvasHeight - frameHeight) / 2;
    
    ctx.strokeRect(frameX, frameY, frameWidth, frameHeight);
    
    // Add corner decorations
    const cornerSize = 30;
    ctx.fillStyle = color;
    
    // Top corners
    drawHeart(ctx, frameX - cornerSize/2, frameY - cornerSize/2, cornerSize/2, color);
    drawHeart(ctx, frameX + frameWidth - cornerSize/2, frameY - cornerSize/2, cornerSize/2, color);
    
    // Bottom corners
    drawHeart(ctx, frameX - cornerSize/2, frameY + frameHeight - cornerSize/2, cornerSize/2, color);
    drawHeart(ctx, frameX + frameWidth - cornerSize/2, frameY + frameHeight - cornerSize/2, cornerSize/2, color);
  };

  const downloadPhoto = () => {
    if (!capturedPhoto) return;
    
    const link = document.createElement('a');
    link.download = `birthday-selfie-${Date.now()}.png`;
    link.href = capturedPhoto;
    link.click();
  };

  const shareViaWhatsApp = () => {
    if (!capturedPhoto) return;
    
    // Create a message for WhatsApp
    const message = encodeURIComponent("Look at this cute birthday selfie I took! 📸💕");
    const whatsappUrl = `https://wa.me/?text=${message}`;
    
    // Open WhatsApp
    window.open(whatsappUrl, '_blank');
    
    // Also trigger download so they can attach the image
    downloadPhoto();
  };

  const resetPhoto = () => {
    setCapturedPhoto(null);
  };

  const switchCamera = () => {
    setFacingMode(prev => prev === 'user' ? 'environment' : 'user');
    if (isActive) {
      stopCamera();
      setTimeout(startCamera, 100);
    }
  };

  useEffect(() => {
    return () => {
      stopCamera();
    };
  }, [stopCamera]);

  return (
    <div className="max-w-2xl mx-auto space-y-6 p-4">
      <Card className="bg-white/90 backdrop-blur-sm border-2 border-rose-100 shadow-xl">
        <CardHeader>
          <CardTitle className="text-center text-3xl text-rose-600">
            Photo Booth Fun 📸
          </CardTitle>
          <p className="text-center text-gray-600">
            Take a cute selfie with fun birthday filters and share it!
          </p>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Camera View or Captured Photo */}
          <div className="relative aspect-[4/3] bg-gray-100 rounded-xl overflow-hidden">
            {capturedPhoto ? (
              <motion.div
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                className="relative w-full h-full"
              >
                <img
                  src={capturedPhoto}
                  alt="Captured selfie"
                  className="w-full h-full object-cover"
                />
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={resetPhoto}
                  className="absolute top-4 right-4 bg-white/80 hover:bg-white/90 rounded-full"
                >
                  <X className="w-4 h-4" />
                </Button>
              </motion.div>
            ) : (
              <>
                <video
                  ref={videoRef}
                  autoPlay
                  playsInline
                  muted
                  className="w-full h-full object-cover"
                />
                <canvas
                  ref={canvasRef}
                  className="hidden"
                />
                
                {/* Filter Preview Overlay */}
                {isActive && (
                  <div className="absolute inset-0 pointer-events-none">
                    {selectedFilter.overlays.map((overlay, index) => (
                      <motion.div
                        key={index}
                        className="absolute"
                        style={{
                          left: `${overlay.position.x}%`,
                          top: `${overlay.position.y}%`,
                          transform: `translate(-50%, -50%) rotate(${overlay.rotation || 0}deg)`,
                        }}
                        initial={{ scale: 0, opacity: 0 }}
                        animate={{ scale: 1, opacity: 0.8 }}
                        transition={{ delay: index * 0.1 }}
                      >
                        {overlay.type === 'heart' && (
                          <Heart 
                            className="text-rose-500" 
                            style={{ 
                              width: `${overlay.size}px`, 
                              height: `${overlay.size}px`,
                              color: overlay.color,
                              fill: overlay.color
                            }} 
                          />
                        )}
                        {overlay.type === 'sparkle' && (
                          <Sparkles 
                            className="text-yellow-500" 
                            style={{ 
                              width: `${overlay.size}px`, 
                              height: `${overlay.size}px`,
                              color: overlay.color
                            }} 
                          />
                        )}
                        {overlay.type === 'text' && (
                          <span 
                            className="font-bold text-center whitespace-nowrap"
                            style={{ 
                              fontSize: `${overlay.size}px`,
                              color: overlay.color,
                              textShadow: '2px 2px 4px rgba(0,0,0,0.3)'
                            }}
                          >
                            {overlay.content}
                          </span>
                        )}
                      </motion.div>
                    ))}
                  </div>
                )}
                
                {error && (
                  <div className="absolute inset-0 flex items-center justify-center bg-gray-100">
                    <div className="text-center space-y-2">
                      <Camera className="w-12 h-12 text-gray-400 mx-auto" />
                      <p className="text-gray-600 text-sm">{error}</p>
                    </div>
                  </div>
                )}
              </>
            )}
          </div>

          {/* Filter Selection */}
          {!capturedPhoto && (
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <h3 className="font-medium text-gray-800">Choose a Filter</h3>
                <Button
                  variant={beautifyMode ? "default" : "outline"}
                  size="sm"
                  onClick={() => setBeautifyMode(!beautifyMode)}
                  className={`flex items-center gap-2 ${
                    beautifyMode 
                      ? 'bg-pink-500 hover:bg-pink-600 text-white' 
                      : 'border-pink-200 text-pink-600 hover:bg-pink-50'
                  }`}
                >
                  <Sparkles className="w-3 h-3" />
                  <span className="text-xs">Beautify</span>
                </Button>
              </div>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                {filters.map((filter) => (
                  <Button
                    key={filter.id}
                    variant={selectedFilter.id === filter.id ? "default" : "outline"}
                    size="sm"
                    onClick={() => setSelectedFilter(filter)}
                    className={`flex items-center gap-2 ${
                      selectedFilter.id === filter.id 
                        ? 'bg-rose-500 hover:bg-rose-600 text-white' 
                        : 'border-rose-200 text-rose-600 hover:bg-rose-50'
                    }`}
                  >
                    {filter.icon}
                    <span className="text-xs">{filter.name}</span>
                  </Button>
                ))}
              </div>
            </div>
          )}

          {/* Controls */}
          <div className="flex justify-center gap-4 flex-wrap">
            {!isActive && !capturedPhoto ? (
              <Button
                onClick={startCamera}
                className="bg-rose-500 hover:bg-rose-600 text-white px-6 py-3 rounded-full"
              >
                <Camera className="w-5 h-5 mr-2" />
                Start Camera
              </Button>
            ) : capturedPhoto ? (
              <div className="flex gap-3 flex-wrap justify-center">
                <Button
                  onClick={downloadPhoto}
                  variant="outline"
                  className="border-rose-200 text-rose-600 hover:bg-rose-50"
                >
                  <Download className="w-4 h-4 mr-2" />
                  Download
                </Button>
                <Button
                  onClick={shareViaWhatsApp}
                  className="bg-green-500 hover:bg-green-600 text-white"
                >
                  <MessageCircle className="w-4 h-4 mr-2" />
                  Share via WhatsApp
                </Button>
                <Button
                  onClick={resetPhoto}
                  variant="outline"
                  className="border-gray-300 text-gray-600 hover:bg-gray-50"
                >
                  <RotateCcw className="w-4 h-4 mr-2" />
                  Take Another
                </Button>
              </div>
            ) : (
              <div className="flex gap-3 flex-wrap justify-center">
                <Button
                  onClick={capturePhoto}
                  disabled={isCapturing}
                  className="bg-rose-500 hover:bg-rose-600 text-white px-8 py-3 rounded-full"
                >
                  {isCapturing ? (
                    <motion.div
                      animate={{ rotate: 360 }}
                      transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                      className="w-5 h-5 border-2 border-white border-t-transparent rounded-full mr-2"
                    />
                  ) : (
                    <Camera className="w-5 h-5 mr-2" />
                  )}
                  {isCapturing ? 'Capturing...' : 'Take Photo'}
                </Button>
                <Button
                  onClick={switchCamera}
                  variant="outline"
                  className="border-rose-200 text-rose-600 hover:bg-rose-50"
                >
                  <RotateCcw className="w-4 h-4" />
                </Button>
                <Button
                  onClick={stopCamera}
                  variant="outline"
                  className="border-gray-300 text-gray-600 hover:bg-gray-50"
                >
                  Stop
                </Button>
              </div>
            )}
          </div>

          {/* Instructions */}
          <div className="text-center text-sm text-gray-500 space-y-1">
            <p>📸 Take a cute selfie with birthday filters!</p>
            <p>💕 Share your photo via WhatsApp to spread the birthday joy!</p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
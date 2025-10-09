import React, { useState, useRef, useEffect } from 'react';
import { Camera, Download, Send, Sparkles, Heart, Star } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';

const BirthdayPhotoBooth = () => {
  const [stream, setStream] = useState<MediaStream | null>(null);
  const [capturedImage, setCapturedImage] = useState<string | null>(null);
  const [selectedEffect, setSelectedEffect] = useState<'confetti' | 'hearts' | 'stars'>('confetti');
  const [showCamera, setShowCamera] = useState(false);
  const [error, setError] = useState('');
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  // IMPORTANT: Replace with your WhatsApp number in international format (without + or -)
  // Example: For +1-234-567-8900, use '12345678900'
  const whatsappNumber = '9779876543210'; // UPDATE THIS!

  useEffect(() => {
    return () => {
      stopCamera();
    };
  }, []);

  const stopCamera = () => {
    if (stream) {
      stream.getTracks().forEach(track => track.stop());
      setStream(null);
    }
  };

  const startCamera = async () => {
    try {
      setError('');
      const mediaStream = await navigator.mediaDevices.getUserMedia({ 
        video: { 
          facingMode: 'user',
          width: { ideal: 1280 },
          height: { ideal: 720 }
        },
        audio: false 
      });
      setStream(mediaStream);
      setShowCamera(true);
      
      setTimeout(() => {
        if (videoRef.current) {
          videoRef.current.srcObject = mediaStream;
        }
      }, 100);
    } catch (err) {
      console.error('Error accessing camera:', err);
      setError('Unable to access camera. Please allow camera permissions and try again.');
    }
  };

  const capturePhoto = () => {
    const video = videoRef.current;
    const canvas = canvasRef.current;
    
    if (!video || !canvas) {
      setError('Camera not ready. Please try again.');
      return;
    }

    canvas.width = video.videoWidth || 640;
    canvas.height = video.videoHeight || 480;
    const ctx = canvas.getContext('2d');
    
    if (!ctx) return;

    ctx.save();
    ctx.scale(-1, 1);
    ctx.drawImage(video, -canvas.width, 0, canvas.width, canvas.height);
    ctx.restore();
    
    addEffects(ctx, canvas.width, canvas.height);
    
    const imageData = canvas.toDataURL('image/png');
    setCapturedImage(imageData);
    
    stopCamera();
    setShowCamera(false);
  };

  const addEffects = (ctx: CanvasRenderingContext2D, width: number, height: number) => {
    // Add decorative elements first (behind text)
    ctx.font = `${Math.floor(width / 25)}px Arial`;
    
    if (selectedEffect === 'hearts') {
      const hearts = ['💕', '💖', '💗', '💝', '❤️'];
      for (let i = 0; i < 20; i++) {
        const emoji = hearts[Math.floor(Math.random() * hearts.length)];
        const x = Math.random() * width;
        const y = Math.random() * height;
        const size = 20 + Math.random() * 20;
        ctx.font = `${size}px Arial`;
        ctx.fillText(emoji, x, y);
      }
    } else if (selectedEffect === 'stars') {
      const stars = ['⭐', '✨', '🌟', '💫', '⭐'];
      for (let i = 0; i < 25; i++) {
        const emoji = stars[Math.floor(Math.random() * stars.length)];
        const x = Math.random() * width;
        const y = Math.random() * height;
        const size = 18 + Math.random() * 22;
        ctx.font = `${size}px Arial`;
        ctx.fillText(emoji, x, y);
      }
    } else if (selectedEffect === 'confetti') {
      const confetti = ['🎉', '🎊', '🎈', '✨', '🎁', '🎀', '🌸'];
      for (let i = 0; i < 30; i++) {
        const emoji = confetti[Math.floor(Math.random() * confetti.length)];
        const x = Math.random() * width;
        const y = Math.random() * height;
        const size = 20 + Math.random() * 25;
        ctx.font = `${size}px Arial`;
        ctx.fillText(emoji, x, y);
      }
    }

    // Add sparkles around the edges
    ctx.font = `${Math.floor(width / 30)}px Arial`;
    for (let i = 0; i < 15; i++) {
      const isTop = Math.random() > 0.5;
      const x = Math.random() * width;
      const y = isTop ? Math.random() * 100 : height - Math.random() * 100;
      ctx.fillText('✨', x, y);
    }

    // Add handwritten text overlay with fancy styling
    const fontSize = Math.floor(width / 15);
    ctx.font = `italic ${fontSize}px Brush Script MT, cursive`;
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    
    const text = "It's my birthday!";
    const x = width / 2;
    const y = height - 60;
    
    // Add glow effect
    ctx.shadowColor = 'rgba(255, 255, 255, 0.8)';
    ctx.shadowBlur = 15;
    
    // Multiple stroke layers for depth
    ctx.lineWidth = 8;
    ctx.strokeStyle = '#ffffff';
    ctx.strokeText(text, x, y);
    
    ctx.lineWidth = 6;
    ctx.strokeStyle = '#ffe6f0';
    ctx.strokeText(text, x, y);
    
    // Main text with gradient effect
    const gradient = ctx.createLinearGradient(0, y - fontSize / 2, 0, y + fontSize / 2);
    gradient.addColorStop(0, '#ff1493');
    gradient.addColorStop(0.5, '#ff69b4');
    gradient.addColorStop(1, '#ff1493');
    ctx.fillStyle = gradient;
    ctx.fillText(text, x, y);
    
    // Reset shadow
    ctx.shadowColor = 'transparent';
    ctx.shadowBlur = 0;
    
    // Add decorative elements around text
    const decorSize = Math.floor(fontSize * 0.8);
    ctx.font = `${decorSize}px Arial`;
    ctx.fillText('🎂', x - fontSize * 4, y);
    ctx.fillText('🎉', x + fontSize * 4, y);
  };

  const downloadImage = () => {
    if (capturedImage) {
      const link = document.createElement('a');
      link.download = `birthday-selfie-${Date.now()}.png`;
      link.href = capturedImage;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    }
  };

  const sendToBoyfriend = () => {
    const message = "Look at my birthday selfie! 🎂💕";
    const url = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(message)}`;
    window.open(url, '_blank');
  };

  const retakePhoto = () => {
    setCapturedImage(null);
    setError('');
    startCamera();
  };

  const Confetti = () => {
    const confettiPieces = Array.from({ length: 50 }, (_, i) => {
      const colors = ['bg-pink-400', 'bg-purple-400', 'bg-yellow-400', 'bg-blue-400', 'bg-red-400', 'bg-green-400'];
      const left = Math.random() * 100;
      const delay = Math.random() * 5;
      const duration = 3 + Math.random() * 2;
      
      return (
        <div
          key={i}
          className={`absolute w-2 h-2 ${colors[i % colors.length]} rounded-full`}
          style={{
            left: `${left}%`,
            top: '-20px',
            animation: `fall ${duration}s linear infinite`,
            animationDelay: `${delay}s`,
          }}
        />
      );
    });
    
    return <>{confettiPieces}</>;
  };

  return (
    <div className="min-h-screen bg-none flex items-center justify-center p-4 relative overflow-hidden">
      <style>{`
        @keyframes fall {
          0% {
            transform: translateY(-20px) rotate(0deg);
            opacity: 1;
          }
          100% {
            transform: translateY(100vh) rotate(360deg);
            opacity: 0;
          }
        }
        @keyframes float {
          0%, 100% {
            transform: translateY(0px);
          }
          50% {
            transform: translateY(-20px);
          }
        }
        @keyframes pulse {
          0%, 100% {
            transform: scale(1);
          }
          50% {
            transform: scale(1.05);
          }
        }
      `}</style>

      <Confetti />

      <Card className="w-full max-w-2xl shadow-2xl bg-white/95 backdrop-blur-sm z-10" style={{ animation: 'pulse 2s ease-in-out infinite' }}>
        <CardContent className="p-6 sm:p-8">
          {error && (
            <div className="mb-4 p-4 bg-red-100 border border-red-400 text-red-700 rounded-lg">
              {error}
            </div>
          )}

          {!showCamera && !capturedImage && (
            <div className="text-center space-y-6">
              <div className="space-y-3">
                <h1 className="text-4xl sm:text-6xl font-bold bg-gradient-to-r from-pink-600 to-purple-600 bg-clip-text text-transparent" style={{ fontFamily: 'cursive', animation: 'float 3s ease-in-out infinite' }}>
                  🎂 Happy Birthday! 🎉
                </h1>
                <p className="text-lg sm:text-xl text-gray-700 font-medium">
                  Capture your beautiful birthday smile!
                </p>
              </div>

              <div className="space-y-4">
                <p className="text-base sm:text-lg text-gray-600 font-medium">Choose your effect:</p>
                <div className="flex justify-center gap-3 flex-wrap">
                  <Button
                    variant={selectedEffect === 'confetti' ? 'default' : 'outline'}
                    onClick={() => setSelectedEffect('confetti')}
                    className="gap-2"
                    size="lg"
                  >
                    <Sparkles className="w-4 h-4" />
                    Confetti
                  </Button>
                  <Button
                    variant={selectedEffect === 'hearts' ? 'default' : 'outline'}
                    onClick={() => setSelectedEffect('hearts')}
                    className="gap-2"
                    size="lg"
                  >
                    <Heart className="w-4 h-4" />
                    Hearts
                  </Button>
                  <Button
                    variant={selectedEffect === 'stars' ? 'default' : 'outline'}
                    onClick={() => setSelectedEffect('stars')}
                    className="gap-2"
                    size="lg"
                  >
                    <Star className="w-4 h-4" />
                    Stars
                  </Button>
                </div>
              </div>

              <Button
                size="lg"
                onClick={startCamera}
                className="gap-2 bg-gradient-to-r from-pink-500 to-purple-600 hover:from-pink-600 hover:to-purple-700 text-white px-8 py-6 text-lg font-semibold w-full sm:w-auto"
              >
                <Camera className="w-6 h-6" />
                Open Camera
              </Button>
            </div>
          )}

          {showCamera && !capturedImage && (
            <div className="space-y-4">
              <h2 className="text-2xl font-bold text-center text-gray-800 mb-4" style={{ fontFamily: 'cursive' }}>
                Strike a pose! ✨
              </h2>
              <div className="relative rounded-xl overflow-hidden bg-black shadow-xl">
                <video
                  ref={videoRef}
                  autoPlay
                  playsInline
                  muted
                  className="w-full h-auto"
                  style={{ transform: 'scaleX(-1)' }}
                />
              </div>
              <Button
                size="lg"
                onClick={capturePhoto}
                className="w-full gap-2 bg-gradient-to-r from-pink-500 to-purple-600 hover:from-pink-600 hover:to-purple-700 text-white py-6 text-lg font-semibold"
              >
                <Camera className="w-6 h-6" />
                Capture Photo
              </Button>
            </div>
          )}

          {capturedImage && (
            <div className="space-y-6">
              <div className="text-center">
                <h2 className="text-3xl font-bold bg-gradient-to-r from-pink-600 to-purple-600 bg-clip-text text-transparent mb-2" style={{ fontFamily: 'cursive' }}>
                  You Look Gorgeous! 💕
                </h2>
                <p className="text-gray-600">Send this to your boyfriend!</p>
              </div>
              
              <div className="rounded-xl overflow-hidden shadow-2xl">
                <img
                  src={capturedImage}
                  alt="Birthday selfie"
                  className="w-full h-auto"
                />
              </div>

              <div className="space-y-3">
                <Button
                  size="lg"
                  onClick={sendToBoyfriend}
                  className="w-full gap-2 bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 text-white py-6 text-lg font-semibold"
                >
                  <Send className="w-5 h-5" />
                  Send to Your Boyfriend 💕
                </Button>
                
                <div className="grid grid-cols-2 gap-3">
                  <Button
                    size="lg"
                    onClick={downloadImage}
                    variant="outline"
                    className="gap-2 py-6"
                  >
                    <Download className="w-5 h-5" />
                    Download
                  </Button>
                  
                  <Button
                    size="lg"
                    onClick={retakePhoto}
                    variant="outline"
                    className="gap-2 py-6"
                  >
                    <Camera className="w-5 h-5" />
                    Retake
                  </Button>
                </div>
              </div>
            </div>
          )}

          <canvas ref={canvasRef} className="hidden" />
        </CardContent>
      </Card>
    </div>
  );
};

export default BirthdayPhotoBooth;
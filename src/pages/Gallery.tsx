import React, { useState, useEffect, useRef, useCallback } from 'react';
import { Search, ArrowUp, Share2 } from 'lucide-react';
import { supabase } from '../lib/supabase';
import Header from '../components/Header';
 
interface Artwork {
  id: string;
  title: string;
  description: string;
  image_url: string;
  category: string;
  medium: string;
  likes: number;
  is_featured: boolean;
}

export default function Gallery() {
  const [artworks, setArtworks] = useState<Artwork[]>([]);
  const [selectedArtwork, setSelectedArtwork] = useState<Artwork | null>(null);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [showBackToTop, setShowBackToTop] = useState(false);
  const observerRef = useRef<IntersectionObserver | null>(null);
  const lastArtworkRef = useRef<HTMLDivElement | null>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const setupCanvas = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const particles: Array<{
      x: number;
      y: number;
      size: number;
      speedX: number;
      speedY: number;
      opacity: number;
      isBlack: boolean;
    }> = [];

    for (let i = 0; i < 100; i++) {
      particles.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        size: Math.random() * 3 + 1,
        speedX: (Math.random() - 0.5) * 0.5,
        speedY: (Math.random() - 0.5) * 0.5,
        opacity: Math.random(),
        isBlack: i < 40,
      });
    }

    function animate() {
      ctx.fillStyle = 'rgba(10, 3, 20, 0.15)';
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      const time = Date.now() * 0.001;
      const centerX = canvas.width / 2;
      const centerY = canvas.height / 2;

      for (let i = 0; i < 36; i++) {
        const angle = (i / 36) * Math.PI * 2;
        const radius = 150 + Math.sin(time * 1.5 + i * 0.3) * 100;
        const x = centerX + Math.cos(angle) * radius;
        const y = centerY + Math.sin(angle) * radius;
        
        ctx.beginPath();
        ctx.moveTo(x, y);
        
        const controlRadius1 = radius + Math.sin(time * 2 + i) * 50;
        const controlRadius2 = radius + Math.cos(time * 1.5 + i) * 60;
        
        ctx.bezierCurveTo(
          centerX + Math.cos(angle + 1) * controlRadius1,
          centerY + Math.sin(angle + 1) * controlRadius1,
          centerX + Math.cos(angle + 2) * controlRadius2,
          centerY + Math.sin(angle + 2) * controlRadius2,
          centerX + Math.cos(angle + Math.PI / 12) * radius,
          centerY + Math.sin(angle + Math.PI / 12) * radius
        );
        
        const hue = (angle * 180 / Math.PI + time * 30) % 360;
        ctx.strokeStyle = `hsl(${hue}, 70%, 70%)`;
        ctx.lineWidth = 3;
        ctx.shadowColor = `hsl(${hue}, 80%, 60%)`;
        ctx.shadowBlur = 20;
        ctx.stroke();
        
        if (i % 4 === 0) {
          ctx.beginPath();
          ctx.moveTo(x, y);
          ctx.lineTo(
            x + Math.cos(angle + time) * 30,
            y + Math.sin(angle + time) * 30
          );
          ctx.strokeStyle = 'rgba(0, 0, 0, 0.5)';
          ctx.lineWidth = 2.5;
          ctx.stroke();
        }
        
        if (i % 3 === 0) {
          ctx.beginPath();
          ctx.moveTo(x, y);
          const shadowLength = 40 + Math.sin(time) * 20;
          ctx.lineTo(
            x + Math.cos(angle - time) * shadowLength,
            y + Math.sin(angle - time) * shadowLength
          );
          ctx.strokeStyle = 'rgba(0, 0, 0, 0.2)';
          ctx.lineWidth = 1;
          ctx.stroke();
        }
      }
      
      particles.forEach((particle) => {
        particle.x += particle.speedX;
        particle.y += particle.speedY;
        particle.opacity = particle.opacity > 1 ? 0 : particle.opacity + 0.01;

        if (particle.x < 0) particle.x = canvas.width;
        if (particle.x > canvas.width) particle.x = 0;
        if (particle.y < 0) particle.y = canvas.height;
        if (particle.y > canvas.height) particle.y = 0;

        ctx.beginPath();
        ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
        if (particle.isBlack) {
          ctx.fillStyle = `rgba(0, 0, 0, ${particle.opacity * 0.8})`;
          ctx.shadowColor = 'rgba(0, 0, 0, 0.7)';
        } else {
          ctx.fillStyle = `rgba(147, 51, 234, ${particle.opacity})`;
          ctx.shadowColor = 'rgba(147, 51, 234, 0.8)';
        }
        ctx.shadowBlur = particle.isBlack ? 15 : 10;
        ctx.fill();
      });

      requestAnimationFrame(animate);
    }

    animate();

    const handleResize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    setupCanvas();
  }, [setupCanvas]);

  useEffect(() => {
    const fetchArtworks = async () => {
      const { data, error } = await supabase
        .from('artworks')
        .select('*')
        .filter('image_url', 'ilike', '%supabase.co%')
        .order('created_at', { ascending: false });

      if (error) {
        console.error('Error fetching artworks:', error);
        return;
      }

      setArtworks(data);
      setLoading(false);
    };

    fetchArtworks();
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      setShowBackToTop(window.scrollY > 500);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const filteredArtworks = artworks.filter(artwork => {
    const matchesSearch = artwork.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         artwork.description.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesSearch;
  });

  const shareArtwork = async (artwork: Artwork) => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: artwork.title,
          text: artwork.description,
          url: window.location.href,
        });
      } catch (err) {
        console.error('Error sharing:', err);
      }
    }
  };

  return (
    <div className="min-h-screen">
      <canvas
        ref={canvasRef}
        className="fixed inset-0 w-full h-full -z-10"
        style={{ background: 'linear-gradient(to bottom, #1a0b2e, #2a1b3e)' }}
      />
      <Header />
      
      {/* Hero Section */}
      <div className="pt-32 pb-16 px-4 text-center text-white">
        <h1 className="text-4xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-purple-500 via-pink-500 to-purple-500 text-transparent bg-clip-text animate-gradient psychedelic-text">
          Drift Through My Vivid Wonderland
        </h1>
        <p className="max-w-2xl mx-auto text-lg text-gray-300 mb-12">
          Step into a realm where imagination knows no bounds. Each piece tells a story,
          waiting to dance with your soul and spark your own creative journey.
        </p>

        {/* Search and Filter */}
        <div className="max-w-4xl mx-auto flex flex-col md:flex-row gap-4 mb-12">
          <div className="relative flex-1">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-purple-400" />
            <input
              type="text"
              placeholder="Search artworks..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-12 pr-4 py-3 rounded-full bg-white/10 border border-purple-500/30 text-white placeholder-gray-400 focus:outline-none focus:border-purple-500 transition-colors"
            />
          </div>
        </div>
      </div>

      {/* Gallery Grid */}
      <div className="container mx-auto px-4 pb-16">
        <div className="columns-1 md:columns-2 lg:columns-3 gap-8">
          {filteredArtworks.map((artwork, index) => (
            <div key={artwork.id} ref={index === filteredArtworks.length - 1 ? lastArtworkRef : null} className="break-inside-avoid mb-8">
              <div className="relative group cursor-pointer rounded-2xl overflow-hidden border-2 border-purple-500/30 shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-[1.02]" onClick={() => setSelectedArtwork(artwork)}>
                <img src={artwork.image_url} alt={artwork.title} className="w-full h-auto" loading="lazy" />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Lightbox */}
      {selectedArtwork && (
        <div
          className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center p-4"
          onClick={() => setSelectedArtwork(null)}
        >
          <div
            className="max-w-4xl w-full bg-white rounded-2xl overflow-hidden shadow-2xl"
            onClick={e => e.stopPropagation()}
          >
            <img
              src={selectedArtwork.image_url}
              alt={selectedArtwork.title}
              className="w-full h-auto"
            />
            <div className="p-8">
              <h2 className="text-2xl font-bold text-purple-900 mb-4">
                {selectedArtwork.title}
              </h2>
              <p className="text-purple-700 mb-6">{selectedArtwork.description}</p>
              <div className="flex items-center justify-between">
                <span className="text-purple-600">{selectedArtwork.medium}</span>
                <button
                  onClick={() => shareArtwork(selectedArtwork)}
                  className="px-6 py-2 bg-purple-600 hover:bg-purple-700 rounded-full text-white flex items-center space-x-2 transition-colors"
                >
                  <Share2 size={18} />
                  <span>Share</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Back to Top Button */}
      {showBackToTop && (
        <button
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          className="fixed bottom-8 right-8 p-4 bg-purple-600/80 hover:bg-purple-700 backdrop-blur-sm text-white rounded-full shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-110"
        >
          <ArrowUp size={24} />
        </button>
      )}
    </div>
  );
}
import React, { useRef, useEffect, useCallback } from 'react';
import { Mail } from 'lucide-react';
import Header from '../components/Header';
import NewsletterForm from '../components/NewsletterForm';

export default function Store() {
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

  return (
    <div className="min-h-screen text-white">
      <canvas
        ref={canvasRef}
        className="fixed inset-0 w-full h-full -z-10"
        style={{ background: 'linear-gradient(to bottom, #1a0b2e, #2a1b3e)' }}
      />
      <Header />
      
      <div className="pt-32 pb-16 px-4">
        <div className="container mx-auto max-w-4xl text-center">
          <div className="bg-white/5 backdrop-blur-lg rounded-3xl p-8 md:p-12 border border-purple-500/20 shadow-2xl">
            <h1 className="text-4xl md:text-6xl font-bold mb-8 bg-gradient-to-r from-purple-500 via-pink-500 to-purple-500 text-transparent bg-clip-text animate-gradient psychedelic-text">
              Coming Soon to Our Cosmic Shop
            </h1>
            
            <p className="text-xl md:text-2xl text-gray-300 mb-12">
              While we're busy weaving our kaleidoscopic storefront, if you're already spellbound by this psychedelic realm, drop us a note below and we'll treat you to exclusive early-bird wonders and new ethereal creations
            </p>

            <div className="max-w-xl mx-auto">
              <NewsletterForm />
            </div>

            <div className="mt-12 flex items-center justify-center">
              <span className="inline-flex items-center gap-2 text-purple-400">
                <Mail className="animate-pulse" size={20} />
                <span>Be the first to know when we launch</span>
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
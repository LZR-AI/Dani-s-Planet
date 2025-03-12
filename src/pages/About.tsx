import React, { useRef, useEffect, useCallback } from 'react';
import { Palette, Heart } from 'lucide-react';
import Header from '../components/Header';

export default function About() {
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
        <div className="container mx-auto max-w-4xl">
          <div className="bg-white/5 backdrop-blur-lg rounded-3xl p-8 md:p-12 border border-purple-500/20 shadow-2xl">
            <div className="grid md:grid-cols-2 gap-8 items-center mb-12">
              <div className="relative group">
                <div className="absolute inset-0 bg-gradient-to-r from-purple-500/30 to-pink-500/30 rounded-2xl transform rotate-6 scale-105 transition-transform group-hover:rotate-3"></div>
                <img
                  src="https://sshrqjjozepszwesrtio.supabase.co/storage/v1/object/sign/about-me/Dani%20drawing.jpg?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1cmwiOiJhYm91dC1tZS9EYW5pIGRyYXdpbmcuanBnIiwiaWF0IjoxNzQxODIwMDc3LCJleHAiOjIwNTcxODAwNzd9.VNZxNbPMQDRHJyV2dHXNt33grCyu76ZFR1smBpla-ak"
                  alt="Dani Rasgauski"
                  className="relative rounded-2xl shadow-2xl transform transition-transform group-hover:scale-105"
                />
              </div>
              
              <div>
                <h1 className="text-4xl font-bold mb-6 bg-gradient-to-r from-purple-500 via-pink-500 to-purple-500 text-transparent bg-clip-text animate-gradient">
                  Meet Dani Rasgauski
                </h1>
                <p className="text-lg text-gray-300 mb-6">
                  A visionary watercolor artist whose expressive mind transforms blank canvases into vibrant portals of imagination. With an innate understanding of color that borders on the supernatural, Dani weaves dreams into reality through her enchanting artwork.
                </p>
                <div className="flex items-center gap-3 text-purple-400 mb-6">
                  <Palette className="w-6 h-6" />
                  <span className="text-sm">Watercolor Virtuoso</span>
                </div>
              </div>
            </div>

            <div className="space-y-8">
              <div className="bg-white/5 rounded-2xl p-6 backdrop-blur-sm">
                <h2 className="text-2xl font-semibold mb-4 text-purple-300">The Color Whisperer</h2>
                <p className="text-gray-300">
                  Dani's profound comprehension of color theory isn't just technical—it's intuitive. Her pieces dance with hues that shouldn't work together but somehow create harmonies that feel both otherworldly and deeply familiar. Each brushstroke is a deliberate journey through the spectrum, creating depth and emotion that resonates with viewers on a visceral level.
                </p>
              </div>

              <div className="bg-white/5 rounded-2xl p-6 backdrop-blur-sm">
                <h2 className="text-2xl font-semibold mb-4 text-purple-300">Expressive Vision</h2>
                <p className="text-gray-300">
                  What sets Dani apart is her ability to translate complex emotions and abstract concepts into visual poetry. Her expressive mind doesn't just see the world—it reimagines it through a kaleidoscope of possibilities. Each piece tells a story that unfolds differently for every viewer, creating a unique dialogue between art and observer.
                </p>
              </div>

              <div className="bg-white/5 rounded-2xl p-6 backdrop-blur-sm">
                <h2 className="text-2xl font-semibold mb-4 text-purple-300">Watercolor Mastery</h2>
                <p className="text-gray-300">
                  Working primarily in watercolor, Dani has mastered the delicate balance between control and chaos. She embraces the medium's unpredictable nature, guiding it to create ethereal effects that bring her visions to life. Her technique combines traditional methods with innovative approaches, pushing the boundaries of what watercolor can achieve.
                </p>
              </div>
            </div>

            <div className="mt-12 text-center">
              <div className="inline-flex items-center gap-2 text-purple-400">
                <Heart className="w-5 h-5 animate-pulse" />
                <span className="text-sm">Creating magic with every brushstroke</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
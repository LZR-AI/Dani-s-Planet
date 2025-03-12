import React, { useEffect, useRef } from 'react';
import { Star, Sparkles } from 'lucide-react';
import Header from './components/Header';
import NewsletterForm from './components/NewsletterForm';

function App() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
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
        isBlack: i < 40, // Increased number of black particles
      });
    }

    function animate() {
      ctx.fillStyle = 'rgba(10, 3, 20, 0.15)';
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      const time = Date.now() * 0.001;
      const centerX = canvas.width / 2;
      const centerY = canvas.height / 2;

      // Draw multiple layers of waves
      for (let i = 0; i < 36; i++) {
        const angle = (i / 36) * Math.PI * 2;
        const radius = 150 + Math.sin(time * 1.5 + i * 0.3) * 100;
        const x = centerX + Math.cos(angle) * radius;
        const y = centerY + Math.sin(angle) * radius;
        
        ctx.beginPath();
        ctx.moveTo(x, y);
        
        // Create flowing bezier curves
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
        
        // Add glow effect
        // Create pastel rainbow effect
        const hue = (angle * 180 / Math.PI + time * 30) % 360;
        ctx.strokeStyle = `hsl(${hue}, 70%, 70%)`;
        ctx.lineWidth = 3;
        ctx.shadowColor = `hsl(${hue}, 80%, 60%)`;
        ctx.shadowBlur = 20;
        ctx.stroke();
        
        // More frequent black accent lines
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
        
        // Additional black shadow lines
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

  return (
    <>
      <canvas
        ref={canvasRef}
        className="fixed inset-0 w-full h-full -z-10"
        style={{ background: 'linear-gradient(to bottom, #1a0b2e, #2a1b3e)' }}
      />
      <div className="min-h-screen text-white">
        <Header />
        
        {/* Hero Section */}
        <section className="pt-32 pb-16 px-4">
          <div className="container mx-auto text-center">
            <h1 className="text-4xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-purple-500 via-pink-500 to-purple-500 text-transparent bg-clip-text animate-gradient psychedelic-text">
              Dani's Planet
            </h1>
            
            <div className="flex flex-col md:flex-row items-center justify-center gap-6 mb-16">
              <a href="/gallery" className="group px-8 py-3 bg-purple-600 hover:bg-purple-700 rounded-full text-white flex items-center space-x-3 transition-all transform hover:scale-105">
                <Star className="w-5 h-5 group-hover:animate-spin" />
                <span>Explore the Gallery</span>
              </a>
              <a href="/store" className="group px-8 py-3 bg-pink-600 hover:bg-pink-700 rounded-full text-white flex items-center space-x-3 transition-all transform hover:scale-105">
                <Sparkles className="w-5 h-5 group-hover:animate-pulse" />
                <span>Shop Art Prints</span>
              </a>
            </div>

            {/* Featured Art Preview */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
              {[
                'https://sshrqjjozepszwesrtio.supabase.co/storage/v1/object/sign/artwork/Halloween.jpg?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1cmwiOiJhcnR3b3JrL0hhbGxvd2Vlbi5qcGciLCJpYXQiOjE3NDE4MjAzOTEsImV4cCI6MjA1NzE4MDM5MX0.RlZXeePJa7OUQCa3Z7a3rQTf35HotlXkCxe4MSIiDH4',
                'https://sshrqjjozepszwesrtio.supabase.co/storage/v1/object/sign/artwork/Rainbow%20skull.jpg?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1cmwiOiJhcnR3b3JrL1JhaW5ib3cgc2t1bGwuanBnIiwiaWF0IjoxNzQxODIwMzcyLCJleHAiOjIwNTcxODAzNzJ9.AVAeG78zVc2AhJQJQVZIqSsQxeYKs4QmyGYc70fIgpQ',
                'https://sshrqjjozepszwesrtio.supabase.co/storage/v1/object/sign/artwork/butternt%20squash.jpg?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1cmwiOiJhcnR3b3JrL2J1dHRlcm50IHNxdWFzaC5qcGciLCJpYXQiOjE3NDE4MjAzNDIsImV4cCI6MjA1NzE4MDM0Mn0.ny1ASvkhlPml7Lr0ukSAI7QazZ6BB1Qcv1TRwaa0dVw',
              ].map((src, index) => (
                <div
                  key={index}
                  className="relative group overflow-hidden rounded-lg aspect-square"
                >
                  <img
                    src={src}
                    alt={['Halloween watercolor', 'Rainbow skull watercolor', 'Butternut squash watercolor'][index]}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-6">
                    <span className="text-white text-lg font-medium">
                      View Artwork
                    </span>
                  </div>
                </div>
              ))}
            </div>

            {/* Newsletter Section */}
            <div className="max-w-2xl mx-auto text-center">
              <h2 className="text-2xl md:text-3xl font-bold mb-4">
                Climb into our wagon of wonder—enter your email and let our charming updates whisk you away!
              </h2>
              <NewsletterForm />
            </div>
          </div>
        </section>
      </div>
    </>
  );
}

export default App;

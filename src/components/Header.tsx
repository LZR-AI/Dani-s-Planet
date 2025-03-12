import React from 'react';
import { Menu, X, Palette, ShoppingBag, Info, Mail } from 'lucide-react';
import { useState } from 'react';

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <header className="fixed w-full top-0 z-50 bg-purple-900/30 backdrop-blur-md border-b border-purple-500/20">
      <nav className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <a href="/" className="relative flex items-center text-2xl font-bold">
            <img 
              src="https://sshrqjjozepszwesrtio.supabase.co/storage/v1/object/sign/logo.vector-graphics/danis%20plant.png?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1cmwiOiJsb2dvLnZlY3Rvci1ncmFwaGljcy9kYW5pcyBwbGFudC5wbmciLCJpYXQiOjE3NDE4MTU1OTYsImV4cCI6MjA1NzE3NTU5Nn0.rxEwFLy_v_dLwCxWkLVhA6YxGeOH-_X9qryCLAH_SO0"
              alt="Dani's Planet Logo"
              className="absolute -left-3 w-[4.2rem] aspect-square object-contain"
            />
            <span className="bg-gradient-to-r from-purple-500 to-pink-500 text-transparent bg-clip-text hover:from-purple-400 hover:to-pink-400 transition-all ml-14">
              Dani's Planet
            </span>
          </a>
          
          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            <NavLink href="/gallery" icon={<Palette size={18} />} text="Gallery" />
            <NavLink href="/store" icon={<ShoppingBag size={18} />} text="Store" />
            <NavLink href="/about" icon={<Info size={18} />} text="About" />
            <a
              href="/subscribe"
              className="px-6 py-2 bg-purple-600 hover:bg-purple-700 rounded-full text-white flex items-center space-x-2 transition-all transform hover:scale-105"
            >
              <Mail size={18} />
              <span>Subscribe</span>
            </a>
          </div>

          {/* Mobile Menu Button */}
          <button 
            className="md:hidden text-white"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div 
            className="md:hidden absolute top-full left-0 w-full border-b border-purple-500/20"
            style={{
              background: `url('https://sshrqjjozepszwesrtio.supabase.co/storage/v1/object/sign/artwork/light%20and%20dark.jpg?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1cmwiOiJhcnR3b3JrL2xpZ2h0IGFuZCBkYXJrLmpwZyIsImlhdCI6MTc0MTgyMDcwNywiZXhwIjoyMDU3MTgwNzA3fQ.hAIBiCp3EnINIizRzUt21hsZQcDDYnG5UcBKXcqlzI4') center/cover no-repeat`,
              backgroundColor: 'rgba(0, 0, 0, 0.85)',
              backgroundBlendMode: 'overlay'
            }}
          >
            <div className="flex flex-col space-y-4 p-4">
              <MobileNavLink href="/gallery" icon={<Palette size={18} />} text="Gallery" />
              <MobileNavLink href="/store" icon={<ShoppingBag size={18} />} text="Store" />
              <MobileNavLink href="/about" icon={<Info size={18} />} text="About" />
              <a
                href="/subscribe"
                className="w-full px-6 py-2 bg-purple-600 hover:bg-purple-700 rounded-full text-white flex items-center justify-center space-x-2"
              >
                <Mail size={18} />
                <span>Subscribe</span>
              </a>
            </div>
          </div>
        )}
      </nav>
    </header>
  );
}

function NavLink({ href, icon, text }: { href: string; icon: React.ReactNode; text: string }) {
  return (
    <a 
      href={href}
      className="text-gray-300 hover:text-white flex items-center space-x-2 transition-colors"
    >
      {icon}
      <span>{text}</span>
    </a>
  );
}

function MobileNavLink({ href, icon, text }: { href: string; icon: React.ReactNode; text: string }) {
  return (
    <a 
      href={href}
      className="text-gray-300 hover:text-white flex items-center space-x-2 p-2 rounded-lg transition-colors"
    >
      {icon}
      <span>{text}</span>
    </a>
  );
}
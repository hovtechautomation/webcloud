'use client';

import { MessageCircle } from 'lucide-react';
import { useState, useEffect } from 'react';

interface FloatingWhatsAppProps {
  whatsapp: string;
}

export default function FloatingWhatsApp({ whatsapp }: FloatingWhatsAppProps) {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      // Show after scrolling down 300px on mobile
      setVisible(window.scrollY > 300);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    // Check initial position
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <a
      href={`https://wa.me/${whatsapp}?text=${encodeURIComponent('Halo, saya ingin berkonsultasi mengenai project otomasi.')}`}
      target="_blank"
      rel="noopener noreferrer"
      className="fixed bottom-6 right-4 z-40 md:hidden"
      aria-label="Chat via WhatsApp"
      style={{
        opacity: visible ? 1 : 0,
        transform: visible ? 'translateY(0)' : 'translateY(20px)',
        transition: 'opacity 0.3s ease, transform 0.3s ease',
        pointerEvents: visible ? 'auto' : 'none',
      }}
    >
      <div className="relative group">
        {/* Pulse ring animation */}
        <span className="absolute inset-0 rounded-full bg-green-500 animate-ping opacity-20" />
        <span className="absolute inset-0 rounded-full bg-green-500 animate-pulse opacity-10" />
        <div className="relative bg-green-500 hover:bg-green-600 text-white w-14 h-14 rounded-full shadow-lg shadow-green-500/30 flex items-center justify-center transition-all active:scale-95">
          <MessageCircle className="w-6 h-6" />
        </div>
        {/* Tooltip */}
        <div className="absolute bottom-full right-0 mb-2 bg-slate-900 text-white text-xs font-medium px-3 py-2 rounded-lg whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
          Chat WhatsApp
          <div className="absolute top-full right-4 w-0 h-0 border-l-4 border-r-4 border-t-4 border-transparent border-t-slate-900" />
        </div>
      </div>
    </a>
  );
}

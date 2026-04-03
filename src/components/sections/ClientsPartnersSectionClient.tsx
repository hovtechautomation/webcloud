'use client';

import { useRef, useEffect, useState, useCallback } from 'react';
import Image from 'next/image';
import { ChevronLeft, ChevronRight } from 'lucide-react';

interface ClientItem {
  _id: string;
  name: string;
  logoUrl?: string;
}

export default function ClientsPartnersSectionClient({ clients }: { clients: ClientItem[] }) {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);

  const checkScroll = useCallback(() => {
    const el = scrollRef.current;
    if (!el) return;
    setCanScrollLeft(el.scrollLeft > 5);
    setCanScrollRight(el.scrollLeft < el.scrollWidth - el.clientWidth - 5);
  }, []);

  useEffect(() => {
    const el = scrollRef.current;
    if (!el) return;
    const timer = setTimeout(() => checkScroll(), 100);
    el.addEventListener('scroll', checkScroll, { passive: true });
    const resizeObserver = new ResizeObserver(checkScroll);
    resizeObserver.observe(el);
    return () => {
      clearTimeout(timer);
      el.removeEventListener('scroll', checkScroll);
      resizeObserver.disconnect();
    };
  }, [checkScroll]);

  const scroll = (direction: 'left' | 'right') => {
    const el = scrollRef.current;
    if (!el) return;
    const scrollAmount = el.clientWidth * 0.65;
    el.scrollBy({
      left: direction === 'left' ? -scrollAmount : scrollAmount,
      behavior: 'smooth',
    });
  };

  useEffect(() => {
    const el = scrollRef.current;
    if (!el || clients.length <= 4) return;
    const interval = setInterval(() => {
      if (!el) return;
      const maxScroll = el.scrollWidth - el.clientWidth;
      if (el.scrollLeft >= maxScroll - 5) {
        el.scrollTo({ left: 0, behavior: 'smooth' });
      } else {
        el.scrollBy({ left: el.clientWidth * 0.5, behavior: 'smooth' });
      }
    }, 3000);
    return () => clearInterval(interval);
  }, [clients.length]);

  if (clients.length === 0) return null;

  return (
    <section className="py-12 sm:py-16 md:py-20 bg-white overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-8 sm:mb-12">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-slate-900 mb-3 sm:mb-4">
            Klien &amp; Partner Kami
          </h2>
          <p className="text-slate-600 max-w-2xl mx-auto text-sm sm:text-base px-4">
            Dipercaya oleh perusahaan-perusahaan terkemuka di Indonesia
          </p>
        </div>
      </div>

      <div className="relative">
        <div className="absolute left-0 top-0 bottom-0 w-8 sm:w-16 bg-gradient-to-r from-white to-transparent z-10 pointer-events-none" />
        <div className="absolute right-0 top-0 bottom-0 w-8 sm:w-16 bg-gradient-to-l from-white to-transparent z-10 pointer-events-none" />

        <div
          ref={scrollRef}
          className="flex gap-4 sm:gap-6 lg:gap-8 overflow-x-auto scroll-smooth px-8 sm:px-12 lg:px-20 py-2"
          style={{
            scrollbarWidth: 'none',
            msOverflowStyle: 'none',
            WebkitOverflowScrolling: 'touch',
          }}
        >
          {clients.map((client) => (
            <div
              key={client._id}
              className="flex-shrink-0 flex flex-col items-center justify-center w-[130px] sm:w-[170px] lg:w-[190px] py-4 sm:py-5 bg-slate-50/80 rounded-xl sm:rounded-2xl border border-slate-100/80 hover:border-orange-200 hover:shadow-md transition-all duration-200 select-none"
            >
              {client.logoUrl ? (
                <div className="relative w-16 h-16 sm:w-20 sm:h-20 lg:w-24 lg:h-24 mb-2 sm:mb-3">
                  <Image
                    src={client.logoUrl}
                    alt={client.name}
                    fill
                    className="object-contain"
                    sizes="96px"
                  />
                </div>
              ) : (
                <div className="w-16 h-16 sm:w-20 sm:h-20 lg:w-24 lg:h-24 mb-2 sm:mb-3 bg-gradient-to-br from-orange-100 to-orange-200 rounded-lg sm:rounded-xl flex items-center justify-center">
                  <span className="text-xl sm:text-2xl lg:text-3xl font-bold text-orange-600">
                    {client.name.charAt(0)}
                  </span>
                </div>
              )}
              <p className="text-[11px] sm:text-xs lg:text-sm font-medium text-slate-600 text-center line-clamp-2 px-1">
                {client.name}
              </p>
            </div>
          ))}
        </div>

        <button
          onClick={() => scroll('left')}
          className={`hidden md:flex absolute left-1 lg:left-3 top-1/2 -translate-y-1/2 w-9 h-9 lg:w-10 lg:h-10 bg-white border border-slate-200 rounded-full shadow-md items-center justify-center hover:bg-slate-50 hover:shadow-lg transition-all z-20 ${canScrollLeft ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}
          aria-label="Scroll left"
        >
          <ChevronLeft className="w-4 h-4 lg:w-5 lg:h-5 text-slate-600" />
        </button>
        <button
          onClick={() => scroll('right')}
          className={`hidden md:flex absolute right-1 lg:right-3 top-1/2 -translate-y-1/2 w-9 h-9 lg:w-10 lg:h-10 bg-white border border-slate-200 rounded-full shadow-md items-center justify-center hover:bg-slate-50 hover:shadow-lg transition-all z-20 ${canScrollRight ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}
          aria-label="Scroll right"
        >
          <ChevronRight className="w-4 h-4 lg:w-5 lg:h-5 text-slate-600" />
        </button>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-8 sm:mt-12">
        <div className="flex flex-wrap justify-center gap-3 sm:gap-4 lg:gap-6 items-center">
          {[
            { icon: '🛡️', label: 'Terpercaya & Berpengalaman', bg: 'bg-green-50 border-green-100', text: 'text-green-700' },
            { icon: '👥', label: 'Tim Profesional', bg: 'bg-blue-50 border-blue-100', text: 'text-blue-700' },
            { icon: '⚡', label: 'Solusi Teknologi Modern', bg: 'bg-orange-50 border-orange-100', text: 'text-orange-700' },
          ].map((badge) => (
            <div
              key={badge.label}
              className={`flex items-center gap-2 px-3 py-2 sm:px-5 sm:py-2.5 ${badge.bg} rounded-full border text-xs sm:text-sm font-medium ${badge.text}`}
            >
              <span className="text-sm sm:text-base">{badge.icon}</span>
              <span>{badge.label}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

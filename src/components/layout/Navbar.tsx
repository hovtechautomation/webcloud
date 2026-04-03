'use client';

import Link from 'next/link';
import Image from 'next/image';
import { MessageCircle, Menu, X } from 'lucide-react';
import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetTrigger, SheetOverlay } from '@/components/ui/sheet';
import { cn } from '@/lib/utils';

interface NavbarProps {
  logo?: string;
  companyName?: string;
  tagline?: string;
  whatsapp?: string;
}

export default function Navbar({
  logo = '/favicon.jpg',
  companyName = 'HOVTECH',
  tagline = 'Automation',
  whatsapp = '6285733118439',
}: NavbarProps) {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    if (open) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [open]);

  const navLinks = [
    { href: '/profile', label: 'Profil' },
    { href: '/services', label: 'Layanan' },
    { href: '/portfolio', label: 'Portofolio' },
    { href: '/products', label: 'Produk' },
    { href: '/artikel', label: 'Artikel' },
    { href: '/contact', label: 'Kontak' },
  ];

  return (
    <nav
      className={cn(
        'sticky top-0 z-50 bg-white/90 backdrop-blur-md border-b border-slate-200/80 transition-shadow duration-300',
        scrolled && 'shadow-sm'
      )}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-14 sm:h-16 items-center">
          {/* Logo - Better touch target on mobile */}
          <Link href="/" className="flex items-center gap-2 min-h-[44px]">
            <Image
              src={logo}
              alt={`${companyName} Logo`}
              width={36}
              height={36}
              className="h-8 w-8 sm:h-10 sm:w-10 object-contain rounded-full"
              priority
            />
            <div className="flex flex-col">
              <span className="font-bold text-base sm:text-lg leading-none tracking-tight text-slate-900">
                {companyName}
              </span>
              <span className="text-[9px] sm:text-[10px] font-medium text-slate-500 tracking-widest uppercase">
                {tagline}
              </span>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-6 lg:gap-8">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-sm font-medium text-slate-600 hover:text-orange-600 transition-colors"
              >
                {link.label}
              </Link>
            ))}
            <a
              href={`https://wa.me/${whatsapp}`}
              target="_blank"
              rel="noopener noreferrer"
            >
              <Button className="bg-orange-600 hover:bg-orange-700 rounded-full gap-2 text-sm">
                <MessageCircle className="w-4 h-4" />
                Hubungi Kami
              </Button>
            </a>
          </div>

          {/* Mobile Navigation - Improved Sheet */}
          <Sheet open={open} onOpenChange={setOpen}>
            <SheetTrigger asChild className="md:hidden">
              <Button
                variant="ghost"
                size="icon"
                className="min-h-[44px] min-w-[44px]"
                aria-label="Open navigation menu"
              >
                <Menu className="h-5 w-5" />
              </Button>
            </SheetTrigger>
            <SheetContent
              side="right"
              className="w-[280px] sm:w-[320px] p-0 pt-0"
            >
              {/* Mobile Menu Header */}
              <div className="bg-slate-900 p-6 pt-8 pb-8">
                <Link
                  href="/"
                  className="flex items-center gap-2"
                  onClick={() => setOpen(false)}
                >
                  <Image
                    src={logo}
                    alt={`${companyName} Logo`}
                    width={32}
                    height={32}
                    className="h-8 w-8 object-contain rounded-full"
                  />
                  <div className="flex flex-col">
                    <span className="font-bold text-base leading-none tracking-tight text-white">
                      {companyName}
                    </span>
                    <span className="text-[9px] font-medium text-slate-400 tracking-widest uppercase">
                      {tagline}
                    </span>
                  </div>
                </Link>
              </div>

              {/* Mobile Nav Links - Better tap targets */}
              <div className="p-4">
                <div className="flex flex-col gap-1">
                  {navLinks.map((link) => (
                    <Link
                      key={link.href}
                      href={link.href}
                      className="text-base font-medium text-slate-700 hover:text-orange-600 hover:bg-orange-50 transition-colors rounded-xl px-4 py-3 min-h-[48px] flex items-center"
                      onClick={() => setOpen(false)}
                    >
                      {link.label}
                    </Link>
                  ))}
                </div>

                {/* Mobile WhatsApp CTA */}
                <div className="mt-4 pt-4 border-t border-slate-100">
                  <a
                    href={`https://wa.me/${whatsapp}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block"
                    onClick={() => setOpen(false)}
                  >
                    <Button className="w-full bg-green-600 hover:bg-green-700 rounded-xl gap-2 h-12 text-sm font-semibold">
                      <MessageCircle className="w-5 h-5" />
                      Hubungi via WhatsApp
                    </Button>
                  </a>
                </div>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </nav>
  );
}

'use client';

import Link from 'next/link';
import Image from 'next/image';
import { Instagram, Facebook, Phone } from 'lucide-react';

interface FooterProps {
  logo?: string;
  companyName?: string;
  tagline?: string;
  instagram?: string;
  facebook?: string;
  whatsapp?: string;
  year?: number;
}

export default function Footer({
  logo = '/favicon.jpg',
  companyName = 'HOVTECH',
  tagline = 'Automation',
  instagram,
  facebook,
  whatsapp,
  year,
}: FooterProps) {
  const currentYear = year || new Date().getFullYear();

  const navLinks = [
    { href: '/profile', label: 'Profil' },
    { href: '/services', label: 'Layanan' },
    { href: '/portfolio', label: 'Portofolio' },
    { href: '/products', label: 'Produk' },
    { href: '/artikel', label: 'Artikel' },
    { href: '/contact', label: 'Kontak' },
  ];

  return (
    <footer className="bg-white border-t border-slate-200 pt-10 sm:pt-16 pb-6 sm:pb-8 mt-auto">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Main Footer Content */}
        <div className="flex flex-col sm:flex-row justify-between items-center sm:items-start gap-6 mb-8 sm:mb-12">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2 flex-shrink-0">
            <Image
              src={logo}
              alt={`${companyName} Logo`}
              width={32}
              height={32}
              className="h-8 w-8 object-contain rounded-full"
            />
            <div className="flex flex-col">
              <span className="font-bold text-sm sm:text-base leading-none tracking-tight text-slate-900">
                {companyName}
              </span>
              <span className="text-[8px] sm:text-[9px] font-medium text-slate-500 tracking-widest uppercase">
                {tagline}
              </span>
            </div>
          </Link>

          {/* Navigation Links */}
          <div className="grid grid-cols-3 gap-x-6 gap-y-2 text-xs sm:text-sm font-medium text-slate-500 sm:flex sm:flex-wrap sm:justify-center sm:gap-x-6 sm:gap-y-2">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="hover:text-orange-600 transition-colors py-1 text-center sm:text-left"
              >
                {link.label}
              </Link>
            ))}
          </div>

          {/* Social Links */}
          <div className="flex gap-3">
            {whatsapp && (
              <a
                href={`https://wa.me/${whatsapp}`}
                target="_blank"
                rel="noopener noreferrer"
                className="p-2.5 rounded-full bg-slate-100 hover:bg-green-100 text-slate-600 hover:text-green-600 transition-colors min-w-[44px] min-h-[44px] flex items-center justify-center"
                aria-label="WhatsApp"
              >
                <Phone className="w-5 h-5" />
              </a>
            )}
            {instagram && (
              <a
                href={instagram}
                target="_blank"
                rel="noopener noreferrer"
                className="p-2.5 rounded-full bg-slate-100 hover:bg-orange-100 text-slate-600 hover:text-orange-600 transition-colors min-w-[44px] min-h-[44px] flex items-center justify-center"
                aria-label="Instagram"
              >
                <Instagram className="w-5 h-5" />
              </a>
            )}
            {facebook && (
              <a
                href={facebook}
                target="_blank"
                rel="noopener noreferrer"
                className="p-2.5 rounded-full bg-slate-100 hover:bg-blue-100 text-slate-600 hover:text-blue-600 transition-colors min-w-[44px] min-h-[44px] flex items-center justify-center"
                aria-label="Facebook"
              >
                <Facebook className="w-5 h-5" />
              </a>
            )}
          </div>
        </div>

        {/* Copyright */}
        <div className="border-t border-slate-100 pt-6 flex flex-col sm:flex-row justify-between items-center gap-3">
          <p className="text-slate-400 text-[11px] sm:text-xs text-center sm:text-left">
            &copy; {currentYear} PT Hovtech Automation Indonesia. All rights reserved.
          </p>
          <p className="text-slate-400 text-[11px] sm:text-xs text-center">
            Jemur Wonosari, Surabaya, Indonesia
          </p>
        </div>
      </div>
    </footer>
  );
}

'use client';

import { MapPin, MessageCircle, Mail, Instagram, Facebook } from 'lucide-react';
import { Button } from '@/components/ui/button';
import ContactForm from '@/components/forms/ContactForm';

interface ContactSectionProps {
  title?: string;
  highlight?: string;
  description?: string;
  address?: string;
  whatsapp?: string;
  email?: string;
  instagram?: string;
  facebook?: string;
}

export default function ContactSection({
  title = 'Siap Memulai',
  highlight = 'Project',
  description = 'Diskusikan kebutuhan otomasi Anda dengan tim ahli kami. Kami siap memberikan solusi terbaik.',
  address = 'Jemur Wonosari Kec Wonocolo Surabaya, Indonesia 60237',
  whatsapp = '6285733118439',
  email = 'info@hovtechautomation.com',
  instagram = 'https://instagram.com/hovtech.id',
  facebook = 'https://www.facebook.com/mohrifqi17',
}: ContactSectionProps) {
  return (
    <section id="contact" className="py-12 sm:py-16 md:py-24 bg-slate-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-2xl md:rounded-[2rem] p-5 sm:p-8 md:p-12 lg:p-16 shadow-sm border border-slate-100">
          {/* Section Header */}
          <div className="text-center mb-8 sm:mb-12">
            <span className="inline-block px-3 py-1 bg-orange-100 text-orange-600 rounded-full text-[10px] sm:text-xs font-bold uppercase tracking-wider mb-4">
              Hubungi Kami
            </span>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-slate-900 mb-3 sm:mb-4">
              {title}{' '}
              <span className="text-orange-600">{highlight}</span> Anda?
            </h2>
            <p className="text-slate-500 text-sm sm:text-base max-w-xl mx-auto px-4">
              {description}
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 sm:gap-12 lg:gap-16">
            {/* Left Column - Contact Info */}
            <div className="flex flex-col justify-center space-y-5 sm:space-y-6">
              {/* Address */}
              <a
                href={`https://maps.google.com/?q=${encodeURIComponent(address)}`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-start gap-3 sm:gap-4 group"
              >
                <div className="p-2.5 sm:p-3 bg-orange-50 rounded-xl flex-shrink-0 min-w-[44px] min-h-[44px] flex items-center justify-center">
                  <MapPin className="w-5 h-5 sm:w-6 sm:h-6 text-orange-600" />
                </div>
                <div>
                  <h4 className="font-bold text-slate-900 text-sm sm:text-base">Lokasi Workshop</h4>
                  <p className="text-slate-500 text-xs sm:text-sm leading-relaxed">{address}</p>
                </div>
              </a>

              {/* WhatsApp */}
              <a
                href={`https://wa.me/${whatsapp}`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-start gap-3 sm:gap-4 group"
              >
                <div className="p-2.5 sm:p-3 bg-green-50 rounded-xl flex-shrink-0 min-w-[44px] min-h-[44px] flex items-center justify-center">
                  <MessageCircle className="w-5 h-5 sm:w-6 sm:h-6 text-green-600" />
                </div>
                <div>
                  <h4 className="font-bold text-slate-900 text-sm sm:text-base">WhatsApp</h4>
                  <p className="text-green-600 font-medium text-xs sm:text-sm">
                    +{whatsapp.replace(/(\d{2})(\d{3})(\d{4})(\d{4})/, '$1 $2-$3-$4')}
                  </p>
                </div>
              </a>

              {/* Email */}
              <a
                href={`mailto:${email}`}
                className="flex items-start gap-3 sm:gap-4 group"
              >
                <div className="p-2.5 sm:p-3 bg-blue-50 rounded-xl flex-shrink-0 min-w-[44px] min-h-[44px] flex items-center justify-center">
                  <Mail className="w-5 h-5 sm:w-6 sm:h-6 text-blue-600" />
                </div>
                <div>
                  <h4 className="font-bold text-slate-900 text-sm sm:text-base">Email</h4>
                  <p className="text-blue-600 font-medium text-xs sm:text-sm">{email}</p>
                </div>
              </a>

              {/* Mobile Quick Contact */}
              <div className="flex gap-3 lg:hidden pt-2">
                <a href={`https://wa.me/${whatsapp}`} target="_blank" rel="noopener noreferrer" className="flex-1">
                  <Button className="w-full bg-green-600 hover:bg-green-700 rounded-xl gap-2 h-11 text-sm font-semibold">
                    <MessageCircle className="w-4 h-4" />WhatsApp
                  </Button>
                </a>
                <a href={`mailto:${email}`} className="flex-1">
                  <Button variant="outline" className="w-full rounded-xl gap-2 h-11 text-sm">
                    <Mail className="w-4 h-4" />Email
                  </Button>
                </a>
              </div>

              {/* Social Media */}
              <div className="pt-6 sm:pt-8">
                <p className="text-xs sm:text-sm font-bold text-slate-400 uppercase tracking-wider mb-3 sm:mb-4">Ikuti Kami</p>
                <div className="flex items-center gap-3 sm:gap-4">
                  <a href={instagram} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2.5 px-4 sm:px-5 py-2.5 bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white rounded-xl transition-all min-w-[44px] min-h-[44px]">
                    <Instagram className="w-4 h-4 sm:w-5 sm:h-5" />
                    <span className="text-xs sm:text-sm font-semibold">Instagram</span>
                  </a>
                  <a href={facebook} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2.5 px-4 sm:px-5 py-2.5 bg-blue-600 hover:bg-blue-700 text-white rounded-xl transition-all min-w-[44px] min-h-[44px]">
                    <Facebook className="w-4 h-4 sm:w-5 sm:h-5" />
                    <span className="text-xs sm:text-sm font-semibold">Facebook</span>
                  </a>
                </div>
              </div>
            </div>

            {/* Right Column - Contact Form (reuses shared component) */}
            <div className="bg-white rounded-xl sm:rounded-2xl p-5 sm:p-6 md:p-8 shadow-xl shadow-slate-200/50 border border-slate-100">
              <h3 className="text-lg sm:text-xl md:text-2xl font-bold text-slate-900 mb-1 sm:mb-2">Kirim Pesan</h3>
              <p className="text-slate-500 mb-5 sm:mb-8 text-xs sm:text-sm">Punya pertanyaan atau butuh penawaran? Pesan akan langsung dikirim ke email kami.</p>
              <ContactForm />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

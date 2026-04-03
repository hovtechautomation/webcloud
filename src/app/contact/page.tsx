import { Metadata } from 'next';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import FloatingWhatsApp from '@/components/layout/FloatingWhatsApp';
import Link from 'next/link';
import { ArrowLeft, MessageCircle, Mail, Instagram, Facebook } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { getFirstEntry, CONTENT_TYPES, getAssetUrl } from '@/lib/contentful';
import ContactForm from '@/components/forms/ContactForm';

export const metadata: Metadata = {
  title: 'Hubungi Kami',
  description: 'Punya pertanyaan atau ingin berdiskusi tentang project? Tim kami siap membantu Anda.',
};

export const dynamic = 'force-dynamic';
export const revalidate = 0;

const defaultCompanyInfo = {
  name: 'HOVTECH', tagline: 'Automation & IoT', logo: null,
  whatsapp: '6285733118439', email: 'info@hovtech.id',
  address: 'Jemur Wonosari Kec Wonocolo Surabaya, Indonesia 60237',
  phone: '+62 857-3311-8439', instagram: 'https://instagram.com/hovtech.id',
  facebook: 'https://www.facebook.com/mohrifqi17',
};

async function getCompanyInfo() {
  try {
    const entry = await getFirstEntry(CONTENT_TYPES.COMPANY_INFO);
    if (entry && entry.fields) {
      return {
        ...defaultCompanyInfo,
        name: (entry.fields.name as string) || defaultCompanyInfo.name,
        tagline: (entry.fields.tagline as string) || defaultCompanyInfo.tagline,
        logo: entry.fields.logo,
        whatsapp: (entry.fields.whatsapp as string) || defaultCompanyInfo.whatsapp,
        email: (entry.fields.email as string) || defaultCompanyInfo.email,
        address: (entry.fields.address as string) || defaultCompanyInfo.address,
        phone: (entry.fields.phone as string) || defaultCompanyInfo.phone,
        instagram: (entry.fields.instagram as string) || defaultCompanyInfo.instagram,
        facebook: (entry.fields.facebook as string) || defaultCompanyInfo.facebook,
      };
    }
    return defaultCompanyInfo;
  } catch { return defaultCompanyInfo; }
}

export default async function ContactPage() {
  const companyInfo = await getCompanyInfo();

  const contactInfo = [
    { icon: '📍', title: 'Alamat', content: companyInfo.address, link: `https://maps.google.com/?q=${encodeURIComponent(companyInfo.address)}` },
    { icon: '📱', title: 'WhatsApp', content: companyInfo.phone, link: `https://wa.me/${companyInfo.whatsapp}` },
    { icon: '✉️', title: 'Email', content: companyInfo.email, link: `mailto:${companyInfo.email}` },
    { icon: '🕐', title: 'Jam Operasional', content: 'Senin - Jumat: 08:00 - 17:00 WIB', link: null },
  ];

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 font-sans text-slate-900">
      <Navbar logo={getAssetUrl(companyInfo.logo)} companyName={companyInfo.name} tagline={companyInfo.tagline} whatsapp={companyInfo.whatsapp} />

      <main className="flex-1">
        <section className="bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 py-12 sm:py-16 md:py-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <Link href="/" className="inline-flex items-center gap-2 text-slate-400 hover:text-orange-500 transition-colors mb-4 sm:mb-6 text-sm">
              <ArrowLeft className="w-4 h-4" /> Kembali ke Beranda
            </Link>
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-3 sm:mb-4">Hubungi Kami</h1>
            <p className="text-slate-300 text-sm sm:text-base md:text-lg max-w-2xl">Punya pertanyaan atau ingin berdiskusi tentang project? Tim kami siap membantu.</p>
          </div>
        </section>

        <section className="py-12 sm:py-16 md:py-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 sm:gap-12">
              {/* Contact Info */}
              <div>
                <h2 className="text-xl sm:text-2xl font-bold text-slate-900 mb-6 sm:mb-8">Informasi Kontak</h2>
                <div className="space-y-5 sm:space-y-6">
                  {contactInfo.map((item, index) => (
                    <div key={index}>
                      <h3 className="font-semibold text-slate-900 mb-1 text-sm sm:text-base">{item.icon} {item.title}</h3>
                      {item.link ? (
                        <a href={item.link} target="_blank" rel="noopener noreferrer" className="text-slate-600 hover:text-orange-600 transition-colors text-xs sm:text-sm">{item.content}</a>
                      ) : (
                        <p className="text-slate-600 text-xs sm:text-sm">{item.content}</p>
                      )}
                    </div>
                  ))}
                </div>
                <div className="mt-8 sm:mt-10 flex flex-wrap gap-3 sm:gap-4">
                  <a href={`https://wa.me/${companyInfo.whatsapp}`} target="_blank" rel="noopener noreferrer">
                    <Button className="bg-green-600 hover:bg-green-700 rounded-full gap-2 text-sm sm:text-base h-11 sm:h-auto">
                      <MessageCircle className="w-4 h-4" />WhatsApp
                    </Button>
                  </a>
                  <a href={`mailto:${companyInfo.email}`}>
                    <Button variant="outline" className="rounded-full gap-2 text-sm sm:text-base h-11 sm:h-auto">
                      <Mail className="w-4 h-4" />Email
                    </Button>
                  </a>
                </div>

                {/* Social Media */}
                <div className="mt-8 pt-6 border-t border-slate-200">
                  <p className="text-xs sm:text-sm font-bold text-slate-400 uppercase tracking-wider mb-3 sm:mb-4">Ikuti Kami</p>
                  <div className="flex items-center gap-3 sm:gap-4">
                    <a
                      href={companyInfo.instagram}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-2.5 px-4 sm:px-5 py-2.5 bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white rounded-xl transition-all min-w-[44px] min-h-[44px]"
                    >
                      <Instagram className="w-4 h-4 sm:w-5 sm:h-5" />
                      <span className="text-xs sm:text-sm font-semibold">Instagram</span>
                    </a>
                    <a
                      href={companyInfo.facebook}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-2.5 px-4 sm:px-5 py-2.5 bg-blue-600 hover:bg-blue-700 text-white rounded-xl transition-all min-w-[44px] min-h-[44px]"
                    >
                      <Facebook className="w-4 h-4 sm:w-5 sm:h-5" />
                      <span className="text-xs sm:text-sm font-semibold">Facebook</span>
                    </a>
                  </div>
                </div>
              </div>

              {/* Contact Form */}
              <div className="bg-white rounded-xl sm:rounded-2xl p-5 sm:p-6 md:p-8 border border-slate-100 shadow-sm">
                <h2 className="text-xl sm:text-2xl font-bold text-slate-900 mb-5 sm:mb-6">Kirim Pesan</h2>
                <ContactForm />
              </div>
            </div>
          </div>
        </section>

        {/* Map */}
        <section className="py-10 sm:py-12 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-xl sm:text-2xl font-bold text-slate-900 mb-5 sm:mb-6 text-center">Lokasi Kami</h2>
            <div className="aspect-video rounded-xl sm:rounded-2xl overflow-hidden bg-slate-100">
              <iframe src={`https://www.google.com/maps/embed/v1/place?key=AIzaSyBFw0Qbyq9zTFTd-tUY6dZWTgaQzuU17R8&q=${encodeURIComponent(companyInfo.address)}`} width="100%" height="100%" style={{ border: 0 }} allowFullScreen loading="lazy" referrerPolicy="no-referrer-when-downgrade" className="rounded-xl sm:rounded-2xl" />
            </div>
          </div>
        </section>
      </main>

      <Footer logo={getAssetUrl(companyInfo.logo)} companyName={companyInfo.name} tagline={companyInfo.tagline} instagram={companyInfo.instagram} />
      <FloatingWhatsApp whatsapp={companyInfo.whatsapp} />
    </div>
  );
}

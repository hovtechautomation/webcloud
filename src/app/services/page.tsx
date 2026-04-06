import { Metadata } from 'next';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import FloatingWhatsApp from '@/components/layout/FloatingWhatsApp';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowLeft, CheckCircle, MessageCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { getCompanyInfo } from '@/lib/company';
import { getEntries, CONTENT_TYPES, getAssetUrl, getFirstImageUrl } from '@/lib/contentful';

export const metadata: Metadata = {
  title: 'Layanan',
  description: 'Solusi lengkap untuk kebutuhan otomasi, IoT, dan pengembangan sistem industri Anda.',
};

export const revalidate = 3600;

const defaultServices = [
  { _id: '1', title: 'PLC & Microcontroller', description: 'Pemrograman PLC, SCADA, HMI, dan Microcontroller untuk otomasi industri.', imageUrl: 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&q=80&w=800&h=600', features: ['Pemrograman PLC', 'HMI/SCADA', 'Microcontroller', 'Integrasi sistem'], order: 1 },
  { _id: '2', title: 'PCB & Hardware Design', description: 'Jasa desain dan pembuatan PCB kustom sesuai kebutuhan project Anda.', imageUrl: 'https://images.unsplash.com/photo-1517077304055-6e89abbf09b0?auto=format&fit=crop&q=80&w=800&h=600', features: ['Desain PCB', 'Schematic design', 'Prototyping'], order: 2 },
  { _id: '3', title: 'IoT & Smart Systems', description: 'Integrasi sistem IoT untuk monitoring dan kontrol jarak jauh.', imageUrl: 'https://images.unsplash.com/photo-1558346490-a72e53ae2d4f?auto=format&fit=crop&q=80&w=800&h=600', features: ['Sensor integration', 'Cloud platform', 'Dashboard analytics'], order: 3 },
  { _id: '4', title: 'Prototyping & Mass Production', description: 'Jasa pembuatan prototipe perangkat elektronik kustom hingga produksi massal.', imageUrl: 'https://images.unsplash.com/photo-1581092160562-40aa08e78837?auto=format&fit=crop&q=80&w=800&h=600', features: ['Rapid prototyping', '3D printing', 'Quality control'], order: 4 },
  { _id: '5', title: 'Software Development', description: 'Pengembangan aplikasi custom untuk kebutuhan industri.', imageUrl: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&q=80&w=800&h=600', features: ['Desktop app', 'Web application', 'Mobile app'], order: 5 },
  { _id: '6', title: 'Consulting & Training', description: 'Konsultasi teknis dan pelatihan untuk tim engineering.', imageUrl: 'https://images.unsplash.com/photo-1524178232363-1fb2b075b655?auto=format&fit=crop&q=80&w=800&h=600', features: ['Technical consulting', 'Training', 'Documentation'], order: 6 },
];

async function getServices() {
  try {
    const entries = await getEntries(CONTENT_TYPES.SERVICE, { order: 'fields.order' });
    if (entries.length > 0) {
      return entries.map((item: any) => ({
        _id: item.sys.id,
        title: (item.fields.title as string) || '',
        description: (item.fields.description as string) || '',
        imageUrl: getFirstImageUrl(item.fields.image) || 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&q=80&w=800&h=600',
        icon: (item.fields.icon as string) || undefined,
        features: (item.fields.features as string[]) || [],
        order: (item.fields.order as number) || 0,
      }));
    }
    return defaultServices;
  } catch { return defaultServices; }
}

export default async function ServicesPage() {
  const companyInfo = await getCompanyInfo();
  const services = await getServices();

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 font-sans text-slate-900">
      <Navbar logo={getAssetUrl(companyInfo.logo)} companyName={companyInfo.name} tagline={companyInfo.tagline} whatsapp={companyInfo.whatsapp} />

      <main className="flex-1">
        <section className="bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 py-12 sm:py-16 md:py-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <Link href="/" className="inline-flex items-center gap-2 text-slate-400 hover:text-orange-500 transition-colors mb-4 sm:mb-6 text-sm">
              <ArrowLeft className="w-4 h-4" /> Kembali ke Beranda
            </Link>
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-3 sm:mb-4">Layanan Kami</h1>
            <p className="text-slate-300 text-sm sm:text-base md:text-lg max-w-2xl">Solusi lengkap untuk kebutuhan otomasi, IoT, dan pengembangan sistem industri Anda.</p>
          </div>
        </section>

        <section className="py-12 sm:py-16 md:py-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="space-y-12 sm:space-y-16 md:space-y-20">
              {services.map((service, index) => (
                <div key={service._id} className={`grid grid-cols-1 lg:grid-cols-2 gap-8 sm:gap-10 lg:gap-12 items-center ${index % 2 === 1 ? 'lg:[&>*:first-child]:order-2' : ''}`}>
                  <div>
                    <div className="aspect-video overflow-hidden rounded-xl sm:rounded-2xl relative">
                      <Image src={service.imageUrl} alt={service.title} fill className="object-cover" sizes="(max-width: 1024px) 100vw, 50vw" />
                    </div>
                  </div>
                  <div>
                    <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-slate-900 mb-3 sm:mb-4">{service.title}</h2>
                    <p className="text-slate-600 leading-relaxed mb-5 sm:mb-6 text-sm sm:text-base">{service.description}</p>
                    {service.features && service.features.length > 0 && (
                      <ul className="space-y-2 sm:space-y-3 mb-5 sm:mb-6">
                        {service.features.map((feature, idx) => (
                          <li key={idx} className="flex items-start gap-2 sm:gap-3">
                            <CheckCircle className="w-4 h-4 sm:w-5 sm:h-5 text-orange-600 flex-shrink-0 mt-0.5" />
                            <span className="text-slate-700 text-sm sm:text-base">{feature}</span>
                          </li>
                        ))}
                      </ul>
                    )}
                    <a href={`https://wa.me/${companyInfo.whatsapp}`} target="_blank" rel="noopener noreferrer">
                      <Button className="bg-orange-600 hover:bg-orange-700 rounded-full gap-2 text-sm sm:text-base">
                        <MessageCircle className="w-4 h-4" /> Konsultasi Gratis
                      </Button>
                    </a>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="py-12 sm:py-16 md:py-20 bg-slate-900">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-3 sm:mb-4">Butuh Layanan Khusus?</h2>
            <p className="text-slate-400 max-w-2xl mx-auto mb-6 sm:mb-8 text-sm sm:text-base">Hubungi kami untuk mendiskusikan kebutuhan spesifik Anda.</p>
            <a href={`https://wa.me/${companyInfo.whatsapp}`} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 px-6 sm:px-8 py-3 sm:py-4 bg-orange-600 hover:bg-orange-700 text-white font-semibold rounded-full transition-colors text-sm sm:text-base">
              <MessageCircle className="w-5 h-5" /> Hubungi Kami
            </a>
          </div>
        </section>
      </main>

      <Footer logo={getAssetUrl(companyInfo.logo)} companyName={companyInfo.name} tagline={companyInfo.tagline} instagram={companyInfo.instagram} />
      <FloatingWhatsApp whatsapp={companyInfo.whatsapp} />
    </div>
  );
}

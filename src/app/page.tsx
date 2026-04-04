import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import FloatingWhatsApp from '@/components/layout/FloatingWhatsApp';
import HeroSection from '@/components/sections/HeroSection';
import ProfileSection from '@/components/sections/ProfileSection';
import ServicesSection, { type Service } from '@/components/sections/ServicesSection';
import WhyChooseUsSection from '@/components/sections/WhyChooseUsSection';
import ContactSection from '@/components/sections/ContactSection';
import ClientsPartnersSection from '@/components/sections/ClientsPartnersSection';
import ArticlesSection from '@/components/sections/ArticlesSection';
import { getFirstEntry, getEntries, CONTENT_TYPES, getAssetUrl, getFirstImageUrl } from '@/lib/contentful';

export const dynamic = 'force-dynamic';
export const revalidate = 0;

const defaultCompanyInfo = {
  name: 'HOVTECH',
  tagline: 'Automation & IoT',
  description: 'PT Hovtech Automation Indonesia adalah perusahaan yang bergerak di bidang solusi otomasi industri dan Internet of Things (IoT). Kami menyediakan layanan pemrograman PLC, SCADA, HMI, desain PCB, serta integrasi sistem IoT untuk berbagai kebutuhan industri.',
  logo: null,
  whatsapp: '6285733118439',
  email: 'info@hovtech.id',
  address: 'Jemur Wonosari Kec Wonocolo Surabaya, Indonesia 60237',
  instagram: 'https://instagram.com/hovtech.id',
  facebook: 'https://www.facebook.com/mohrifqi17',
  projectCount: 50,
  clientCount: 50,
  teamSize: 25,
  visi: 'Menjadi perusahaan teknologi terdepan di Indonesia dalam menyediakan solusi otomasi industri dan IoT yang inovatif dan terpercaya.',
  misi: 'Memberikan solusi teknologi yang efisien, handal, dan mudah diimplementasikan untuk meningkatkan produktivitas industri Indonesia.',
  phone: '+62 857-3311-8439',
};

async function getCompanyInfo() {
  try {
    const entry = await getFirstEntry(CONTENT_TYPES.COMPANY_INFO);
    if (entry && entry.fields) {
      return {
        name: (entry.fields.name as string) || defaultCompanyInfo.name,
        tagline: (entry.fields.tagline as string) || defaultCompanyInfo.tagline,
        description: (entry.fields.description as string) || defaultCompanyInfo.description,
        logo: entry.fields.logo,
        whatsapp: (entry.fields.whatsapp as string) || defaultCompanyInfo.whatsapp,
        email: (entry.fields.email as string) || defaultCompanyInfo.email,
        address: (entry.fields.address as string) || defaultCompanyInfo.address,
        instagram: (entry.fields.instagram as string) || defaultCompanyInfo.instagram,
        facebook: (entry.fields.facebook as string) || defaultCompanyInfo.facebook,
        projectCount: (entry.fields.projectCount as number) ?? defaultCompanyInfo.projectCount,
        clientCount: (entry.fields.clientCount as number) ?? defaultCompanyInfo.clientCount,
        teamSize: (entry.fields.teamSize as number) ?? defaultCompanyInfo.teamSize,
        visi: (entry.fields.visi as string) || defaultCompanyInfo.visi,
        misi: (entry.fields.misi as string) || defaultCompanyInfo.misi,
        phone: (entry.fields.phone as string) || defaultCompanyInfo.phone,
      };
    }
    return defaultCompanyInfo;
  } catch {
    return defaultCompanyInfo;
  }
}

const defaultServices: Service[] = [
  {
    _id: '1',
    title: 'PLC & Microcontroller',
    description: 'Pemrograman PLC, SCADA, HMI, dan Microcontroller untuk otomasi industri.',
    imageUrl: 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&q=80&w=800&h=600',
    features: ['Pemrograman PLC', 'HMI/SCADA', 'Microcontroller', 'Integrasi sistem'],
    order: 1,
  },
  {
    _id: '2',
    title: 'PCB & Hardware Design',
    description: 'Jasa desain dan pembuatan PCB kustom sesuai kebutuhan project Anda.',
    imageUrl: 'https://images.unsplash.com/photo-1517077304055-6e89abbf09b0?auto=format&fit=crop&q=80&w=800&h=600',
    features: ['Desain PCB', 'Schematic design', 'Prototyping'],
    order: 2,
  },
  {
    _id: '3',
    title: 'IoT & Smart Systems',
    description: 'Integrasi sistem IoT untuk monitoring dan kontrol jarak jauh.',
    imageUrl: 'https://images.unsplash.com/photo-1558346490-a72e53ae2d4f?auto=format&fit=crop&q=80&w=800&h=600',
    features: ['Sensor integration', 'Cloud platform', 'Dashboard analytics'],
    order: 3,
  },
  {
    _id: '4',
    title: 'Prototyping & Production',
    description: 'Jasa pembuatan prototipe perangkat elektronik kustom hingga produksi massal.',
    imageUrl: 'https://images.unsplash.com/photo-1581092160562-40aa08e78837?auto=format&fit=crop&q=80&w=800&h=600',
    features: ['Rapid prototyping', '3D printing', 'Quality control'],
    order: 4,
  },
];

async function getServices(): Promise<Service[]> {
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
  } catch {
    return defaultServices;
  }
}

export default async function Home() {
  const companyInfo = await getCompanyInfo();
  const services = await getServices();

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 font-sans text-slate-900">
      <Navbar
        logo={getAssetUrl(companyInfo.logo)}
        companyName={companyInfo.name}
        tagline={companyInfo.tagline}
        whatsapp={companyInfo.whatsapp}
      />

      <main className="flex-1">
        <HeroSection
          title="Solusi Otomasi Industri"
          description={companyInfo.description}
          badge={companyInfo.name}
          whatsapp={companyInfo.whatsapp}
        />

        <ProfileSection
          projectCount={companyInfo.projectCount}
          visi={companyInfo.visi}
          misi={companyInfo.misi}
        />

        <ServicesSection services={services} />

        <ClientsPartnersSection />

        <ArticlesSection />

        <WhyChooseUsSection whatsapp={companyInfo.whatsapp} />

        <ContactSection
          address={companyInfo.address}
          whatsapp={companyInfo.whatsapp}
          email={companyInfo.email}
          instagram={companyInfo.instagram}
          facebook={companyInfo.facebook}
        />
      </main>

      <Footer
        logo={getAssetUrl(companyInfo.logo)}
        companyName={companyInfo.name}
        tagline={companyInfo.tagline}
        instagram={companyInfo.instagram}
      />

      <FloatingWhatsApp whatsapp={companyInfo.whatsapp} />
    </div>
  );
}

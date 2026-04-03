import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import FloatingWhatsApp from '@/components/layout/FloatingWhatsApp';
import HeroSection from '@/components/sections/HeroSection';
import ProfileSection from '@/components/sections/ProfileSection';
import ServicesSection from '@/components/sections/ServicesSection';
import WhyChooseUsSection from '@/components/sections/WhyChooseUsSection';
import ContactSection from '@/components/sections/ContactSection';
import ClientsPartnersSection from '@/components/sections/ClientsPartnersSection';
import ArticlesSection from '@/components/sections/ArticlesSection';
import { getFirstEntry, CONTENT_TYPES, getAssetUrl } from '@/lib/contentful';

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

export default async function Home() {
  const companyInfo = await getCompanyInfo();

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

        <ServicesSection />

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

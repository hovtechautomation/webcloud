import { Metadata } from 'next';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';
import PortfolioListClient from '@/components/clients/PortfolioListClient';
import { getCompanyInfo } from '@/lib/company';
import { getEntries, CONTENT_TYPES, getAssetUrl } from '@/lib/contentful';

export const metadata: Metadata = { title: 'Portofolio', description: 'Lihat berbagai proyek otomasi industri dan IoT yang telah kami kerjakan.' };
// Cloudflare Edge: ISR — revalidate every 5 minutes
export const revalidate = 300;

const defaultPortfolios = [
  { _id: '1', title: 'Sistem Otomasi Pabrik', slug: 'sistem-otomasi-pabrik', excerpt: 'Implementasi sistem otomasi pabrik dengan PLC dan SCADA untuk monitoring real-time.', category: 'PLC & SCADA', imageUrl: 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&q=80&w=800&h=600', location: 'Surabaya', year: 2023 },
  { _id: '2', title: 'Smart Greenhouse', slug: 'smart-greenhouse', excerpt: 'Sistem monitoring dan kontrol otomatis untuk greenhouse dengan sensor IoT.', category: 'IoT', imageUrl: 'https://images.unsplash.com/photo-1558346490-a72e53ae2d4f?auto=format&fit=crop&q=80&w=800&h=600', location: 'Malang', year: 2023 },
  { _id: '3', title: 'PCB Controller Industrial', slug: 'pcb-controller-industrial', excerpt: 'Desain dan produksi PCB controller untuk aplikasi industri.', category: 'PCB Design', imageUrl: 'https://images.unsplash.com/photo-1517077304055-6e89abbf09b0?auto=format&fit=crop&q=80&w=800&h=600', location: 'Gresik', year: 2022 },
  { _id: '4', title: 'Robot Arm Automation', slug: 'robot-arm-automation', excerpt: 'Pengembangan robot arm dengan mikrokontroler untuk assembly line.', category: 'Microcontroller', imageUrl: 'https://images.unsplash.com/photo-1581092160562-40aa08e78837?auto=format&fit=crop&q=80&w=800&h=600', location: 'Sidoarjo', year: 2022 },
  { _id: '5', title: 'Energy Monitoring System', slug: 'energy-monitoring-system', excerpt: 'Sistem monitoring energi berbasis IoT untuk efisiensi pabrik.', category: 'IoT', imageUrl: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&q=80&w=800&h=600', location: 'Jakarta', year: 2023 },
  { _id: '6', title: 'Water Treatment Automation', slug: 'water-treatment-automation', excerpt: 'Otomasi sistem water treatment dengan kontrol PLC terintegrasi.', category: 'PLC & SCADA', imageUrl: 'https://images.unsplash.com/photo-1585771724684-38269d6639fd?auto=format&fit=crop&q=80&w=800&h=600', location: 'Surabaya', year: 2021 },
];

async function getPortfolios() {
  try {
    const entries = await getEntries(CONTENT_TYPES.PORTFOLIO, { order: '-fields.year' });
    if (entries.length > 0) return entries.map((item: any) => ({ _id: item.sys.id, title: (item.fields.title as string) || '', slug: (item.fields.slug as string) || '', excerpt: (item.fields.excerpt as string) || '', category: (item.fields.category as string) || '', imageUrl: getAssetUrl(item.fields.image), location: (item.fields.location as string) || '', year: (item.fields.year as number) || new Date().getFullYear() }));
    return defaultPortfolios;
  } catch { return defaultPortfolios; }
}

export default async function PortfolioPage() {
  const companyInfo = await getCompanyInfo();
  const portfolios = await getPortfolios();
  const categories = ['Semua', ...new Set(portfolios.map((p) => p.category).filter(Boolean))];

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 font-sans text-slate-900">
      <Navbar logo={getAssetUrl(companyInfo.logo)} companyName={companyInfo.name} tagline={companyInfo.tagline} whatsapp={companyInfo.whatsapp} />
      <main className="flex-1">
        <section className="bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 py-12 sm:py-16 md:py-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <Link href="/" className="inline-flex items-center gap-2 text-slate-400 hover:text-orange-500 transition-colors mb-4 sm:mb-6 text-sm"><ArrowLeft className="w-4 h-4" /> Kembali ke Beranda</Link>
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-3 sm:mb-4">Portofolio</h1>
            <p className="text-slate-300 text-sm sm:text-base md:text-lg max-w-2xl">Lihat berbagai project yang telah kami kerjakan.</p>
          </div>
        </section>
        <PortfolioListClient portfolios={portfolios} categories={categories} />
      </main>
      <Footer logo={getAssetUrl(companyInfo.logo)} companyName={companyInfo.name} tagline={companyInfo.tagline} instagram={companyInfo.instagram} facebook={companyInfo.facebook} whatsapp={companyInfo.whatsapp} />
    </div>
  );
}

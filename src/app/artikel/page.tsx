import { Metadata } from 'next';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import FloatingWhatsApp from '@/components/layout/FloatingWhatsApp';
import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';
import ArticleListClient from '@/components/clients/ArticleListClient';
import { getFirstEntry, getEntries, CONTENT_TYPES, getAssetUrl } from '@/lib/contentful';

export const metadata: Metadata = { title: 'Artikel', description: 'Baca artikel terbaru seputar otomasi industri, IoT, tips & trik, dan kegiatan HOVTECH.' };
export const dynamic = 'force-dynamic';
export const revalidate = 0;

const defaultArticles = [
  { _id: '1', title: 'HOVTECH Raih Sertifikasi ISO 9001:2015', slug: 'hovtech-raih-sertifikasi-iso-9001-2015', excerpt: 'PT Hovtech Automation Indonesia berhasil meraih sertifikasi ISO 9001:2015.', imageUrl: 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&q=80&w=800&h=600', category: 'Berita', publishedAt: '2024-01-15', featured: true },
  { _id: '2', title: 'Tips Memilih PLC yang Tepat untuk Industri', slug: 'tips-memilih-plc-yang-tepat', excerpt: 'Panduan lengkap memilih PLC sesuai kebutuhan industri Anda.', imageUrl: 'https://images.unsplash.com/photo-1558346490-a72e53ae2d4f?auto=format&fit=crop&q=80&w=800&h=600', category: 'Tips & Trik', publishedAt: '2024-01-10', featured: false },
  { _id: '3', title: 'Gathering Tim HOVTECH 2024', slug: 'gathering-tim-hovtech-2024', excerpt: 'Kegiatan gathering tahunan tim HOVTECH untuk mempererat kebersamaan.', imageUrl: 'https://images.unsplash.com/photo-1517077304055-6e89abbf09b0?auto=format&fit=crop&q=80&w=800&h=600', category: 'Kegiatan', publishedAt: '2024-01-05', featured: true },
  { _id: '4', title: 'Implementasi IoT di Industri 4.0', slug: 'implementasi-iot-di-industri-4', excerpt: 'Bagaimana IoT mengubah wajah industri modern.', imageUrl: 'https://images.unsplash.com/photo-1581092160562-40aa08e78837?auto=format&fit=crop&q=80&w=800&h=600', category: 'Tips & Trik', publishedAt: '2023-12-20', featured: false },
  { _id: '5', title: 'Workshop Otomasi Industri', slug: 'workshop-otomasi-industri', excerpt: 'HOVTECH mengadakan workshop otomasi industri untuk mahasiswa teknik.', imageUrl: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&q=80&w=800&h=600', category: 'Kegiatan', publishedAt: '2023-12-15', featured: false },
  { _id: '6', title: 'Proyek SCADA Terbesar HOVTECH', slug: 'proyek-scada-terbesar-hovtech', excerpt: 'HOVTECH berhasil menyelesaikan proyek SCADA terbesar di Jawa Timur.', imageUrl: 'https://images.unsplash.com/photo-1585771724684-38269d6639fd?auto=format&fit=crop&q=80&w=800&h=600', category: 'Berita', publishedAt: '2023-12-10', featured: true },
];

const defaultCompany = { name: 'HOVTECH', tagline: 'Automation & IoT', logo: null, whatsapp: '6285733118439', instagram: 'https://instagram.com/hovtech.id' };

async function getCompanyInfo() {
  try {
    const entry = await getFirstEntry(CONTENT_TYPES.COMPANY_INFO);
    if (entry?.fields) return { ...defaultCompany, name: (entry.fields.name as string) || defaultCompany.name, tagline: (entry.fields.tagline as string) || defaultCompany.tagline, logo: entry.fields.logo, whatsapp: (entry.fields.whatsapp as string) || defaultCompany.whatsapp, instagram: (entry.fields.instagram as string) || defaultCompany.instagram };
    return defaultCompany;
  } catch { return defaultCompany; }
}

async function getArticles() {
  try {
    const entries = await getEntries(CONTENT_TYPES.ARTICLE, { order: '-fields.publishedAt' });
    if (entries.length > 0) return entries.map((item: any) => ({ _id: item.sys.id, title: (item.fields.title as string) || '', slug: (item.fields.slug as string) || '', excerpt: (item.fields.excerpt as string) || '', imageUrl: getAssetUrl(item.fields.image), category: (item.fields.category as string) || '', publishedAt: (item.fields.publishedAt as string) || item.sys.createdAt, featured: (item.fields.featured as boolean) || false }));
    return defaultArticles;
  } catch { return defaultArticles; }
}

export default async function ArtikelPage() {
  const companyInfo = await getCompanyInfo();
  const articles = await getArticles();
  const categories = ['Semua', ...new Set(articles.map((a) => a.category).filter(Boolean))];

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 font-sans text-slate-900">
      <Navbar logo={getAssetUrl(companyInfo.logo)} companyName={companyInfo.name} tagline={companyInfo.tagline} whatsapp={companyInfo.whatsapp} />
      <main className="flex-1">
        <section className="bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 py-12 sm:py-16 md:py-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <Link href="/" className="inline-flex items-center gap-2 text-slate-400 hover:text-orange-500 transition-colors mb-4 sm:mb-6 text-sm"><ArrowLeft className="w-4 h-4" /> Kembali ke Beranda</Link>
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-3 sm:mb-4">Artikel</h1>
            <p className="text-slate-300 text-sm sm:text-base md:text-lg max-w-2xl">Update terbaru, tips & trik, dan kegiatan HOVTECH.</p>
          </div>
        </section>
        <ArticleListClient articles={articles} categories={categories} />
      </main>
      <Footer logo={getAssetUrl(companyInfo.logo)} companyName={companyInfo.name} tagline={companyInfo.tagline} instagram={companyInfo.instagram} />
      <FloatingWhatsApp whatsapp={companyInfo.whatsapp} />
    </div>
  );
}

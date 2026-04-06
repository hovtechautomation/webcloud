import { Metadata } from 'next';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';
import ProductListClient from '@/components/clients/ProductListClient';
import { getCompanyInfo } from '@/lib/company';
import { getEntries, CONTENT_TYPES, getAssetUrl } from '@/lib/contentful';

export const metadata: Metadata = { title: 'Produk', description: 'Temukan berbagai produk otomasi industri, PLC, IoT Gateway, dan sensor.' };
export const dynamic = 'force-dynamic';
export const revalidate = 0;

const defaultProducts = [
  { _id: '1', name: 'PLC Controller HVT-100', slug: 'plc-controller-hvt-100', description: 'PLC controller dengan 16 I/O digital.', price: 'Rp 2.500.000', category: 'PLC', imageUrl: 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&q=80&w=800&h=600', features: ['16 I/O Digital', 'Modbus RTU/TCP', 'Garansi 2 Tahun'] },
  { _id: '2', name: 'IoT Gateway HVT-GW01', slug: 'iot-gateway-hvt-gw01', description: 'Gateway IoT untuk industri dengan konektivitas lengkap.', price: 'Rp 1.800.000', category: 'IoT', imageUrl: 'https://images.unsplash.com/photo-1558346490-a72e53ae2d4f?auto=format&fit=crop&q=80&w=800&h=600', features: ['WiFi & Ethernet', 'MQTT', 'Edge Computing'] },
  { _id: '3', name: 'Sensor Suhu Industrial', slug: 'sensor-suhu-industrial', description: 'Sensor suhu PT100 untuk aplikasi industri.', price: 'Rp 450.000', category: 'Sensor', imageUrl: 'https://images.unsplash.com/photo-1517077304055-6e89abbf09b0?auto=format&fit=crop&q=80&w=800&h=600', features: ['PT100', '4-20mA Output', 'IP65 Rating'] },
];

async function getProducts() {
  try {
    const entries = await getEntries(CONTENT_TYPES.PRODUCT, { order: 'fields.name' });
    if (entries.length > 0) return entries.map((item: any) => ({ _id: item.sys.id, name: (item.fields.name as string) || '', slug: (item.fields.slug as string) || '', description: (item.fields.description as string) || '', price: (item.fields.price as string) || '', category: (item.fields.category as string) || '', imageUrl: getAssetUrl(item.fields.image), features: (item.fields.features as string[]) || [] }));
    return defaultProducts;
  } catch { return defaultProducts; }
}

export default async function ProductsPage() {
  const companyInfo = await getCompanyInfo();
  const products = await getProducts();
  const categories = ['Semua', ...new Set(products.map((p) => p.category).filter(Boolean))];

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 font-sans text-slate-900">
      <Navbar logo={getAssetUrl(companyInfo.logo)} companyName={companyInfo.name} tagline={companyInfo.tagline} whatsapp={companyInfo.whatsapp} />
      <main className="flex-1">
        <section className="bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 py-12 sm:py-16 md:py-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <Link href="/" className="inline-flex items-center gap-2 text-slate-400 hover:text-orange-500 transition-colors mb-4 sm:mb-6 text-sm"><ArrowLeft className="w-4 h-4" /> Kembali ke Beranda</Link>
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-3 sm:mb-4">Produk</h1>
            <p className="text-slate-300 text-sm sm:text-base md:text-lg max-w-2xl">Temukan berbagai produk untuk kebutuhan industri Anda.</p>
          </div>
        </section>
        <ProductListClient products={products} categories={categories} whatsapp={companyInfo.whatsapp} />
      </main>
      <Footer logo={getAssetUrl(companyInfo.logo)} companyName={companyInfo.name} tagline={companyInfo.tagline} instagram={companyInfo.instagram} facebook={companyInfo.facebook} whatsapp={companyInfo.whatsapp} />
    </div>
  );
}

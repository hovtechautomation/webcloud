import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import FloatingWhatsApp from '@/components/layout/FloatingWhatsApp';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowLeft, MessageCircle, Package, FileText } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { getEntryBySlug, CONTENT_TYPES, getAssetUrl, getGalleryUrls, getFirstImageUrl } from '@/lib/contentful';
import RichTextRenderer from '@/components/ui/rich-text-renderer';

export const revalidate = 3600;

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const entry = await getEntryBySlug(CONTENT_TYPES.PRODUCT, slug);
  if (!entry?.fields) return {};
  const fields = entry.fields as any;
  const name = (fields.name as string) || 'Produk';
  const description = (fields.description as string) || '';
  const imageUrl = getFirstImageUrl(fields.image);
  return {
    title: `${name} | HOVTECH Produk`,
    description: description,
    openGraph: { title: `${name} | HOVTECH`, description, ...(imageUrl && { images: [{ url: imageUrl }] }) },
  };
}

const defaultCompany = { name: 'HOVTECH', tagline: 'Automation & IoT', logo: null, whatsapp: '6285733118439', instagram: 'https://instagram.com/hovtech.id' };

export default async function ProductDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const entry = await getEntryBySlug(CONTENT_TYPES.PRODUCT, slug);

  if (!entry?.fields) notFound();

  const fields = entry.fields as any;
  const companyInfo = defaultCompany;
  const name = (fields.name as string) || '';
  const category = (fields.category as string) || '';
  const description = (fields.description as string) || '';
  const content = fields.content || null; // RichText
  const price = (fields.price as string) || '';
  const imageUrl = getFirstImageUrl(fields.image);
  const galleryUrls = getGalleryUrls(fields.gallery);
  const features = (fields.features as string[]) || [];

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 font-sans text-slate-900">
      <Navbar logo={getAssetUrl(companyInfo.logo)} companyName={companyInfo.name} tagline={companyInfo.tagline} whatsapp={companyInfo.whatsapp} />
      <main className="flex-1">
        {/* Hero Section */}
        <section className="bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 py-12 sm:py-16 md:py-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <Link href="/products" className="inline-flex items-center gap-2 text-slate-400 hover:text-orange-500 transition-colors mb-4 sm:mb-6 text-sm"><ArrowLeft className="w-4 h-4" /> Kembali ke Produk</Link>
            {category && <span className="inline-block px-3 py-1 bg-orange-500/20 text-orange-500 text-xs font-bold rounded-full mb-3 sm:mb-4">{category}</span>}
            <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-2 sm:mb-4">{name}</h1>
            {price && <p className="text-xl sm:text-2xl font-bold text-orange-500 mb-3 sm:mb-4">{price}</p>}
            {description && (
              <p className="text-slate-300 text-sm sm:text-base max-w-3xl leading-relaxed">{description}</p>
            )}
          </div>
        </section>

        {/* Content Section */}
        <section className="py-10 sm:py-12 md:py-16">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            {imageUrl && (
              <div className="aspect-square rounded-xl sm:rounded-2xl overflow-hidden bg-slate-100 mb-8 sm:mb-10 relative">
                <Image src={imageUrl} alt={name} fill className="object-cover" sizes="(max-width: 768px) 100vw, 896px" priority />
              </div>
            )}

            {/* RichText Content */}
            {content && (
              <div className="mb-8 sm:mb-10">
                <RichTextRenderer document={content} />
              </div>
            )}

            {/* Features */}
            {features.length > 0 && (
              <div className="mb-8 sm:mb-10">
                <h2 className="text-xl sm:text-2xl font-bold text-slate-900 mb-4 flex items-center gap-2">
                  <Package className="w-5 h-5 text-orange-600" /> Fitur Produk
                </h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
                  {features.map((f, i) => (
                    <div key={i} className="flex items-start gap-3 p-3 sm:p-4 bg-white rounded-xl border border-slate-100">
                      <div className="w-2 h-2 bg-orange-500 rounded-full flex-shrink-0 mt-1.5" />
                      <span className="text-sm sm:text-base text-slate-700">{f}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Gallery */}
            {galleryUrls.length > 0 && (
              <div className="mb-8 sm:mb-10">
                <h2 className="text-xl sm:text-2xl font-bold text-slate-900 mb-4 sm:mb-6 flex items-center gap-2">
                  <FileText className="w-5 h-5 text-orange-600" /> Galeri Produk
                </h2>
                <div className="flex gap-3 sm:gap-4 overflow-x-auto pb-4 snap-x snap-mandatory scrollbar-thin -mx-4 px-4 sm:mx-0 sm:px-0">
                  {galleryUrls.map((url, i) => (
                    <div key={i} className="flex-shrink-0 w-48 sm:w-56 md:w-64 aspect-square rounded-xl overflow-hidden bg-slate-100 relative snap-start">
                      <Image src={url} alt={`${name} - ${i + 1}`} fill className="object-cover hover:scale-105 transition-transform duration-300" sizes="256px" />
                    </div>
                  ))}
                </div>
                <p className="text-xs text-slate-400 mt-2 text-center sm:text-left">Geser ke kanan untuk melihat lebih banyak &rarr;</p>
              </div>
            )}

            {/* CTA */}
            <div className="text-center">
              <a href={`https://wa.me/${companyInfo.whatsapp}?text=${encodeURIComponent(`Halo, saya tertarik dengan produk ${name}${price ? ` (${price})` : ''}.`)}`} target="_blank" rel="noopener noreferrer">
                <Button className="bg-green-600 hover:bg-green-700 rounded-full gap-2 text-sm sm:text-base h-12"><MessageCircle className="w-4 h-4" /> Pesan via WhatsApp</Button>
              </a>
            </div>
          </div>
        </section>
      </main>
      <Footer logo={getAssetUrl(companyInfo.logo)} companyName={companyInfo.name} tagline={companyInfo.tagline} instagram={companyInfo.instagram} />
      <FloatingWhatsApp whatsapp={companyInfo.whatsapp} />
    </div>
  );
}

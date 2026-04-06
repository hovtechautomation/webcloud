import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import FloatingWhatsApp from '@/components/layout/FloatingWhatsApp';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowLeft, MapPin, Calendar, MessageCircle, FileText } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { getEntryBySlug, CONTENT_TYPES, getAssetUrl, getGalleryUrls, getFirstImageUrl } from '@/lib/contentful';
import { getCompanyInfo } from '@/lib/company';
import RichTextRenderer from '@/components/ui/rich-text-renderer';

export const dynamic = 'force-dynamic';
export const revalidate = 0;

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const entry = await getEntryBySlug(CONTENT_TYPES.PORTFOLIO, slug);
  if (!entry?.fields) return {};
  const fields = entry.fields as any;
  const title = (fields.title as string) || 'Portofolio';
  const excerpt = (fields.excerpt as string) || '';
  const imageUrl = getFirstImageUrl(fields.image);
  return {
    title: `${title} | HOVTECH Portofolio`,
    description: excerpt,
    openGraph: { title: `${title} | HOVTECH`, description: excerpt, ...(imageUrl && { images: [{ url: imageUrl }] }) },
  };
}

export default async function PortfolioDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const entry = await getEntryBySlug(CONTENT_TYPES.PORTFOLIO, slug);

  if (!entry?.fields) notFound();

  const fields = entry.fields as any;
  const companyInfo = await getCompanyInfo();
  const title = (fields.title as string) || '';
  const category = (fields.category as string) || '';
  const excerpt = (fields.excerpt as string) || '';
  const content = fields.content || null; // RichText
  const location = (fields.location as string) || '';
  const year = (fields.year as number) || null;
  const imageUrl = getFirstImageUrl(fields.image);
  const galleryUrls = getGalleryUrls(fields.gallery);

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 font-sans text-slate-900">
      <Navbar logo={getAssetUrl(companyInfo.logo)} companyName={companyInfo.name} tagline={companyInfo.tagline} whatsapp={companyInfo.whatsapp} />
      <main className="flex-1">
        {/* Hero Section */}
        <section className="bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 py-12 sm:py-16 md:py-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <Link href="/portfolio" className="inline-flex items-center gap-2 text-slate-400 hover:text-orange-500 transition-colors mb-4 sm:mb-6 text-sm"><ArrowLeft className="w-4 h-4" /> Kembali ke Portofolio</Link>
            {category && <span className="inline-block px-3 py-1 bg-orange-500/20 text-orange-500 text-xs font-bold rounded-full mb-3 sm:mb-4">{category}</span>}
            <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-3 sm:mb-4">{title}</h1>
            <div className="flex flex-wrap gap-3 sm:gap-4 text-xs sm:text-sm text-slate-400">
              {location && <span className="flex items-center gap-1"><MapPin className="w-3.5 h-3.5" /> {location}</span>}
              {year && <span className="flex items-center gap-1"><Calendar className="w-3.5 h-3.5" /> {year}</span>}
            </div>
            {excerpt && (
              <p className="mt-4 sm:mt-6 text-slate-300 text-sm sm:text-base max-w-3xl leading-relaxed">{excerpt}</p>
            )}
          </div>
        </section>

        {/* Content Section */}
        <section className="py-10 sm:py-12 md:py-16">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            {imageUrl && (
              <div className="aspect-square rounded-xl sm:rounded-2xl overflow-hidden bg-slate-100 mb-8 sm:mb-10 relative">
                <Image src={imageUrl} alt={title} fill className="object-cover" sizes="(max-width: 768px) 100vw, 768px" priority />
              </div>
            )}

            {/* RichText Content */}
            {content && (
              <div className="mb-8 sm:mb-10">
                <RichTextRenderer document={content} />
              </div>
            )}

            {/* Gallery */}
            {galleryUrls.length > 0 && (
              <div className="mb-8 sm:mb-10">
                <h2 className="text-xl sm:text-2xl font-bold text-slate-900 mb-4 sm:mb-6 flex items-center gap-2">
                  <FileText className="w-5 h-5 text-orange-600" /> Galeri
                </h2>
                <div className="flex gap-3 sm:gap-4 overflow-x-auto pb-4 snap-x snap-mandatory scrollbar-thin -mx-4 px-4 sm:mx-0 sm:px-0">
                  {galleryUrls.map((url, i) => (
                    <div key={i} className="flex-shrink-0 w-48 sm:w-56 md:w-64 aspect-square rounded-xl overflow-hidden bg-slate-100 relative snap-start">
                      <Image src={url} alt={`${title} - ${i + 1}`} fill className="object-cover hover:scale-105 transition-transform duration-300" sizes="256px" />
                    </div>
                  ))}
                </div>
                <p className="text-xs text-slate-400 mt-2 text-center sm:text-left">Geser ke kanan untuk melihat lebih banyak &rarr;</p>
              </div>
            )}

            {/* CTA */}
            <div className="mt-8 sm:mt-10 text-center">
              <a href={`https://wa.me/${companyInfo.whatsapp}?text=${encodeURIComponent(`Halo, saya tertarik dengan project ${title}.`)}`} target="_blank" rel="noopener noreferrer">
                <Button className="bg-orange-600 hover:bg-orange-700 rounded-full gap-2 text-sm sm:text-base"><MessageCircle className="w-4 h-4" /> Tanya Project Ini</Button>
              </a>
            </div>
          </div>
        </section>
      </main>
      <Footer logo={getAssetUrl(companyInfo.logo)} companyName={companyInfo.name} tagline={companyInfo.tagline} instagram={companyInfo.instagram} facebook={companyInfo.facebook} whatsapp={companyInfo.whatsapp} />
      <FloatingWhatsApp whatsapp={companyInfo.whatsapp} />
    </div>
  );
}

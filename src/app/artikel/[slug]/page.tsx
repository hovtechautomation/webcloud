import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import FloatingWhatsApp from '@/components/layout/FloatingWhatsApp';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowLeft, Calendar, User, MessageCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { getEntryBySlug, CONTENT_TYPES, getAssetUrl } from '@/lib/contentful';

export const dynamic = 'force-dynamic';
export const revalidate = 0;

const defaultCompany = { name: 'HOVTECH', tagline: 'Automation & IoT', logo: null, whatsapp: '6285733118439', instagram: 'https://instagram.com/hovtech.id' };

export default async function ArtikelDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const entry = await getEntryBySlug(CONTENT_TYPES.ARTICLE, slug);

  if (!entry?.fields) notFound();

  const fields = entry.fields as any;
  const companyInfo = defaultCompany;
  const title = (fields.title as string) || '';
  const category = (fields.category as string) || '';
  const content = (fields.content as string) || (fields.description as string) || '';
  const imageUrl = getAssetUrl(fields.image);
  const author = (fields.author as string) || 'HOVTECH Team';
  const publishedAt = (fields.publishedAt as string) || entry.sys.createdAt;

  const formatDate = (d: string) => new Date(d).toLocaleDateString('id-ID', { day: 'numeric', month: 'long', year: 'numeric' });

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 font-sans text-slate-900">
      <Navbar logo={getAssetUrl(companyInfo.logo)} companyName={companyInfo.name} tagline={companyInfo.tagline} whatsapp={companyInfo.whatsapp} />
      <main className="flex-1">
        <section className="bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 py-12 sm:py-16 md:py-20">
          <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
            <Link href="/artikel" className="inline-flex items-center gap-2 text-slate-400 hover:text-orange-500 transition-colors mb-4 sm:mb-6 text-sm"><ArrowLeft className="w-4 h-4" /> Kembali ke Artikel</Link>
            {category && <span className="inline-block px-3 py-1 bg-orange-500/20 text-orange-500 text-xs font-bold rounded-full mb-3 sm:mb-4">{category}</span>}
            <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-4 sm:mb-6 leading-tight">{title}</h1>
            <div className="flex flex-wrap gap-3 sm:gap-4 text-xs sm:text-sm text-slate-400">
              <span className="flex items-center gap-1.5"><Calendar className="w-3.5 h-3.5" /> {formatDate(publishedAt)}</span>
              <span className="flex items-center gap-1.5"><User className="w-3.5 h-3.5" /> {author}</span>
            </div>
          </div>
        </section>

        <section className="py-8 sm:py-10 md:py-16">
          <article className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
            {imageUrl && (
              <div className="aspect-video rounded-xl sm:rounded-2xl overflow-hidden bg-slate-100 mb-8 sm:mb-10 relative">
                <Image src={imageUrl} alt={title} fill className="object-cover" sizes="(max-width: 768px) 100vw, 768px" priority />
              </div>
            )}

            {content && (
              <div className="prose prose-slate max-w-none text-sm sm:text-base leading-relaxed text-slate-700 whitespace-pre-line mb-8 sm:mb-10">
                {content}
              </div>
            )}

            <div className="border-t border-slate-200 pt-6 sm:pt-8 text-center">
              <p className="text-slate-500 text-sm mb-4">Tertarik dengan topik ini? Diskusikan dengan tim ahli kami.</p>
              <a href={`https://wa.me/${companyInfo.whatsapp}?text=${encodeURIComponent(`Halo, saya tertarik dengan artikel "${title}".`)}`} target="_blank" rel="noopener noreferrer">
                <Button className="bg-green-600 hover:bg-green-700 rounded-full gap-2 text-sm sm:text-base h-12"><MessageCircle className="w-4 h-4" /> Tanya via WhatsApp</Button>
              </a>
            </div>
          </article>
        </section>
      </main>
      <Footer logo={getAssetUrl(companyInfo.logo)} companyName={companyInfo.name} tagline={companyInfo.tagline} instagram={companyInfo.instagram} />
      <FloatingWhatsApp whatsapp={companyInfo.whatsapp} />
    </div>
  );
}

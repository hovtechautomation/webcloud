import Image from 'next/image';
import Link from 'next/link';
import { Calendar, ArrowRight } from 'lucide-react';
import { getEntries, CONTENT_TYPES, getAssetUrl } from '@/lib/contentful';

const defaultArticles = [
  {
    _id: '1',
    title: 'HOVTECH Raih Sertifikasi ISO 9001:2015',
    slug: 'hovtech-raih-sertifikasi-iso-9001-2015',
    excerpt: 'PT Hovtech Automation Indonesia berhasil meraih sertifikasi ISO 9001:2015.',
    imageUrl: 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&q=80&w=800&h=600',
    category: 'Berita',
    publishedAt: '2024-01-15',
  },
  {
    _id: '2',
    title: 'Tips Memilih PLC yang Tepat untuk Industri',
    slug: 'tips-memilih-plc-yang-tepat',
    excerpt: 'Panduan lengkap memilih PLC sesuai kebutuhan industri Anda.',
    imageUrl: 'https://images.unsplash.com/photo-1558346490-a72e53ae2d4f?auto=format&fit=crop&q=80&w=800&h=600',
    category: 'Tips & Trik',
    publishedAt: '2024-01-10',
  },
  {
    _id: '3',
    title: 'Gathering Tim HOVTECH 2024',
    slug: 'gathering-tim-hovtech-2024',
    excerpt: 'Kegiatan gathering tahunan tim HOVTECH untuk mempererat kebersamaan.',
    imageUrl: 'https://images.unsplash.com/photo-1517077304055-6e89abbf09b0?auto=format&fit=crop&q=80&w=800&h=600',
    category: 'Kegiatan',
    publishedAt: '2024-01-05',
  },
];

async function getFeaturedArticles() {
  try {
    const entries = await getEntries(CONTENT_TYPES.ARTICLE, {
      limit: 3,
      order: '-fields.publishedAt',
      'fields.featured': true,
    });

    if (entries.length > 0) {
      return entries.map((item: any) => ({
        _id: item.sys.id,
        title: (item.fields.title as string) || '',
        slug: (item.fields.slug as string) || '',
        excerpt: (item.fields.excerpt as string) || '',
        imageUrl: getAssetUrl(item.fields.image),
        category: (item.fields.category as string) || '',
        publishedAt: (item.fields.publishedAt as string) || item.sys.createdAt,
      }));
    }

    const allEntries = await getEntries(CONTENT_TYPES.ARTICLE, { limit: 3, order: '-fields.publishedAt' });
    if (allEntries.length > 0) {
      return allEntries.map((item: any) => ({
        _id: item.sys.id,
        title: (item.fields.title as string) || '',
        slug: (item.fields.slug as string) || '',
        excerpt: (item.fields.excerpt as string) || '',
        imageUrl: getAssetUrl(item.fields.image),
        category: (item.fields.category as string) || '',
        publishedAt: (item.fields.publishedAt as string) || item.sys.createdAt,
      }));
    }
    return defaultArticles;
  } catch {
    return defaultArticles;
  }
}

export default async function ArticlesSection() {
  const articles = await getFeaturedArticles();

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('id-ID', {
      day: 'numeric',
      month: 'long',
      year: 'numeric',
    });
  };

  return (
    <section className="py-12 sm:py-16 md:py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-10 sm:mb-16">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-slate-900 mb-3 sm:mb-4">
            Artikel Terbaru
          </h2>
          <p className="text-slate-600 max-w-2xl mx-auto text-sm sm:text-base px-4">
            Update terbaru, tips & trik, dan kegiatan HOVTECH.
          </p>
        </div>

        {/* Articles Grid - 1 col mobile, 3 col desktop */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 sm:gap-8 mb-8 sm:mb-12">
          {articles.map((item) => (
            <Link
              key={item._id}
              href={`/artikel/${item.slug}`}
              className="group bg-white rounded-xl sm:rounded-2xl overflow-hidden border border-slate-100 hover:shadow-xl transition-all"
            >
              <div className="aspect-video overflow-hidden relative">
                {item.imageUrl ? (
                  <Image
                    src={item.imageUrl}
                    alt={item.title}
                    fill
                    className="object-cover group-hover:scale-110 transition-transform duration-500"
                    sizes="(max-width: 640px) 100vw, (max-width: 768px) 50vw, 33vw"
                  />
                ) : (
                  <div className="w-full h-full bg-gradient-to-br from-slate-200 to-slate-300 flex items-center justify-center">
                    <span className="text-3xl sm:text-4xl font-bold text-slate-400">
                      {item.title.charAt(0)}
                    </span>
                  </div>
                )}
                {item.category && (
                  <div className="absolute top-3 left-3 sm:top-4 sm:left-4">
                    <span className="px-2.5 py-1 sm:px-3 sm:py-1 bg-orange-600 text-white text-[10px] sm:text-xs font-medium rounded-full">
                      {item.category}
                    </span>
                  </div>
                )}
              </div>
              <div className="p-4 sm:p-6">
                <div className="flex items-center gap-2 text-[11px] sm:text-xs text-slate-500 mb-2 sm:mb-3">
                  <Calendar className="w-3 h-3" />
                  <span>{formatDate(item.publishedAt)}</span>
                </div>
                <h3 className="text-base sm:text-lg font-bold mb-1.5 sm:mb-2 text-slate-900 group-hover:text-orange-600 transition-colors line-clamp-2">
                  {item.title}
                </h3>
                <p className="text-slate-600 text-xs sm:text-sm leading-relaxed line-clamp-2 sm:line-clamp-3 mb-3 sm:mb-4">
                  {item.excerpt}
                </p>
                <div className="flex items-center gap-2 text-orange-600 text-xs sm:text-sm font-medium group-hover:gap-3 transition-all">
                  Baca Selengkapnya
                  <ArrowRight className="w-3 h-3 sm:w-4 sm:h-4" />
                </div>
              </div>
            </Link>
          ))}
        </div>

        {/* View All Button */}
        <div className="text-center">
          <Link
            href="/artikel"
            className="inline-flex items-center gap-2 px-6 sm:px-8 py-2.5 sm:py-3 bg-slate-900 hover:bg-slate-800 text-white font-semibold rounded-full transition-colors text-sm sm:text-base"
          >
            Lihat Semua Artikel
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </section>
  );
}

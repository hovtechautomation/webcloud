'use client';

import Image from 'next/image';
import Link from 'next/link';
import FilterableGrid from '@/components/ui/FilterableGrid';
import { Calendar, ArrowRight } from 'lucide-react';

interface Article { _id: string; title: string; slug: string; excerpt: string; category: string; imageUrl?: string; publishedAt: string; featured?: boolean; }

export default function ArticleListClient({ articles, categories }: { articles: Article[]; categories: string[] }) {
  const formatDate = (d: string) => new Date(d).toLocaleDateString('id-ID', { day: 'numeric', month: 'long', year: 'numeric' });

  return (
    <FilterableGrid
      items={articles}
      categories={categories}
      searchPlaceholder="Cari artikel..."
      emptyMessage="Tidak ada artikel ditemukan."
    >
      {(item) => (
        <Link key={item._id} href={`/artikel/${item.slug}`} className="group bg-white rounded-xl sm:rounded-2xl overflow-hidden border border-slate-100 hover:shadow-xl transition-all">
          <div className="aspect-video overflow-hidden relative">
            {item.imageUrl ? (
              <Image src={item.imageUrl} alt={item.title} fill className="object-cover group-hover:scale-110 transition-transform duration-500" sizes="(max-width: 640px) 100vw, (max-width: 768px) 50vw, 33vw" />
            ) : (
              <div className="w-full h-full bg-gradient-to-br from-slate-200 to-slate-300 flex items-center justify-center"><span className="text-3xl sm:text-4xl font-bold text-slate-400">{item.title.charAt(0)}</span></div>
            )}
            {item.category && <div className="absolute top-3 left-3 sm:top-4 sm:left-4"><span className="px-2.5 py-1 sm:px-3 sm:py-1 bg-orange-600 text-white text-[10px] sm:text-xs font-medium rounded-full">{item.category}</span></div>}
          </div>
          <div className="p-4 sm:p-6">
            <div className="flex items-center gap-2 text-[11px] sm:text-xs text-slate-500 mb-2 sm:mb-3"><Calendar className="w-3 h-3" /><span>{formatDate(item.publishedAt)}</span></div>
            <h3 className="text-base sm:text-lg font-bold mb-1.5 text-slate-900 group-hover:text-orange-600 transition-colors line-clamp-2">{item.title}</h3>
            <p className="text-slate-600 text-xs sm:text-sm leading-relaxed line-clamp-2 sm:line-clamp-3 mb-3 sm:mb-4">{item.excerpt}</p>
            <div className="flex items-center gap-2 text-orange-600 text-xs sm:text-sm font-medium group-hover:gap-3 transition-all">Baca Selengkapnya <ArrowRight className="w-3 h-3 sm:w-4 sm:h-4" /></div>
          </div>
        </Link>
      )}
    </FilterableGrid>
  );
}

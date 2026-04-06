'use client';

import Image from 'next/image';
import Link from 'next/link';
import FilterableGrid from '@/components/ui/FilterableGrid';

interface Portfolio {
  _id: string; title: string; slug: string; excerpt: string; category: string; imageUrl?: string; location?: string; year?: number;
}

export default function PortfolioListClient({ portfolios, categories }: { portfolios: Portfolio[]; categories: string[] }) {
  return (
    <FilterableGrid
      items={portfolios}
      categories={categories}
      searchPlaceholder="Cari proyek..."
      emptyMessage="Tidak ada proyek ditemukan."
    >
      {(item) => (
        <Link key={item._id} href={`/portfolio/${item.slug}`} className="group bg-white rounded-xl sm:rounded-2xl overflow-hidden border border-slate-100 hover:shadow-xl transition-all">
          <div className="aspect-video overflow-hidden relative">
            {item.imageUrl ? (
              <Image src={item.imageUrl} alt={item.title} fill className="object-cover group-hover:scale-110 transition-transform duration-500" sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw" />
            ) : (
              <div className="w-full h-full bg-gradient-to-br from-slate-200 to-slate-300 flex items-center justify-center"><span className="text-3xl sm:text-4xl font-bold text-slate-400">{item.title.charAt(0)}</span></div>
            )}
            {item.category && <div className="absolute top-3 left-3 sm:top-4 sm:left-4"><span className="px-2.5 py-1 sm:px-3 sm:py-1 bg-orange-600 text-white text-[10px] sm:text-xs font-medium rounded-full">{item.category}</span></div>}
          </div>
          <div className="p-4 sm:p-6">
            <h3 className="text-base sm:text-lg font-bold mb-1.5 text-slate-900 group-hover:text-orange-600 transition-colors">{item.title}</h3>
            <p className="text-slate-600 text-xs sm:text-sm leading-relaxed line-clamp-2">{item.excerpt}</p>
            {(item.location || item.year) && (
              <div className="mt-3 sm:mt-4 pt-3 sm:pt-4 border-t border-slate-100 flex items-center justify-between text-[11px] sm:text-xs text-slate-500">
                {item.location && <span>📍 {item.location}</span>}
                {item.year && <span>{item.year}</span>}
              </div>
            )}
          </div>
        </Link>
      )}
    </FilterableGrid>
  );
}

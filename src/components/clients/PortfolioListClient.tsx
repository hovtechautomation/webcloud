'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useState } from 'react';

interface Portfolio {
  _id: string; title: string; slug: string; excerpt: string; category: string; imageUrl?: string; location?: string; year?: number;
}

export default function PortfolioListClient({ portfolios, categories }: { portfolios: Portfolio[]; categories: string[] }) {
  const [activeCategory, setActiveCategory] = useState('Semua');
  const [searchQuery, setSearchQuery] = useState('');
  const filtered = portfolios.filter((p) => {
    const matchCat = activeCategory === 'Semua' || p.category === activeCategory;
    const matchSearch = p.title.toLowerCase().includes(searchQuery.toLowerCase()) || p.excerpt.toLowerCase().includes(searchQuery.toLowerCase());
    return matchCat && matchSearch;
  });

  return (
    <>
      <section className="py-6 sm:py-8 bg-white border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-4 sm:mb-6">
            <div className="relative max-w-md mx-auto">
              <input type="text" placeholder="Cari proyek..." value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} className="w-full px-4 py-2.5 sm:py-3 pl-10 sm:pl-12 rounded-xl border border-slate-200 focus:border-orange-500 focus:ring-2 focus:ring-orange-200 outline-none text-sm" />
              <svg className="absolute left-3 sm:left-4 top-1/2 -translate-y-1/2 w-4 h-4 sm:w-5 sm:h-5 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" /></svg>
            </div>
          </div>
          <div className="flex flex-wrap gap-2 sm:gap-3 justify-center">
            {categories.map((cat) => (
              <button key={cat} onClick={() => setActiveCategory(cat)} className={`px-3 py-1.5 sm:px-4 sm:py-2 rounded-full text-xs sm:text-sm font-medium transition-colors ${activeCategory === cat ? 'bg-orange-600 text-white' : 'bg-slate-100 text-slate-600 hover:bg-orange-100 hover:text-orange-600'}`}>{cat}</button>
            ))}
          </div>
        </div>
      </section>
      <section className="py-10 sm:py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {filtered.length === 0 ? (
            <div className="text-center py-16"><p className="text-slate-500">Tidak ada proyek ditemukan.</p></div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6 lg:gap-8">
              {filtered.map((item) => (
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
              ))}
            </div>
          )}
        </div>
      </section>
    </>
  );
}
